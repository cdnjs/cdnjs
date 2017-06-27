require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        throw TypeError('Uncaught, unspecified "error" event.');
      }
      return false;
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],2:[function(require,module,exports){
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
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],3:[function(require,module,exports){
(function (process,global){
(function(global) {
  'use strict';
  if (global.$traceurRuntime) {
    return;
  }
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $Object.defineProperties;
  var $defineProperty = $Object.defineProperty;
  var $freeze = $Object.freeze;
  var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $Object.getOwnPropertyNames;
  var $keys = $Object.keys;
  var $hasOwnProperty = $Object.prototype.hasOwnProperty;
  var $toString = $Object.prototype.toString;
  var $preventExtensions = Object.preventExtensions;
  var $seal = Object.seal;
  var $isExtensible = Object.isExtensible;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var types = {
    void: function voidType() {},
    any: function any() {},
    string: function string() {},
    number: function number() {},
    boolean: function boolean() {}
  };
  var method = nonEnum;
  var counter = 0;
  function newUniqueString() {
    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
  }
  var symbolInternalProperty = newUniqueString();
  var symbolDescriptionProperty = newUniqueString();
  var symbolDataProperty = newUniqueString();
  var symbolValues = $create(null);
  var privateNames = $create(null);
  function createPrivateName() {
    var s = newUniqueString();
    privateNames[s] = true;
    return s;
  }
  function isSymbol(symbol) {
    return typeof symbol === 'object' && symbol instanceof SymbolValue;
  }
  function typeOf(v) {
    if (isSymbol(v))
      return 'symbol';
    return typeof v;
  }
  function Symbol(description) {
    var value = new SymbolValue(description);
    if (!(this instanceof Symbol))
      return value;
    throw new TypeError('Symbol cannot be new\'ed');
  }
  $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(Symbol.prototype, 'toString', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    var desc = symbolValue[symbolDescriptionProperty];
    if (desc === undefined)
      desc = '';
    return 'Symbol(' + desc + ')';
  }));
  $defineProperty(Symbol.prototype, 'valueOf', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    return symbolValue;
  }));
  function SymbolValue(description) {
    var key = newUniqueString();
    $defineProperty(this, symbolDataProperty, {value: this});
    $defineProperty(this, symbolInternalProperty, {value: key});
    $defineProperty(this, symbolDescriptionProperty, {value: description});
    freeze(this);
    symbolValues[key] = this;
  }
  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(SymbolValue.prototype, 'toString', {
    value: Symbol.prototype.toString,
    enumerable: false
  });
  $defineProperty(SymbolValue.prototype, 'valueOf', {
    value: Symbol.prototype.valueOf,
    enumerable: false
  });
  var hashProperty = createPrivateName();
  var hashPropertyDescriptor = {value: undefined};
  var hashObjectProperties = {
    hash: {value: undefined},
    self: {value: undefined}
  };
  var hashCounter = 0;
  function getOwnHashObject(object) {
    var hashObject = object[hashProperty];
    if (hashObject && hashObject.self === object)
      return hashObject;
    if ($isExtensible(object)) {
      hashObjectProperties.hash.value = hashCounter++;
      hashObjectProperties.self.value = object;
      hashPropertyDescriptor.value = $create(null, hashObjectProperties);
      $defineProperty(object, hashProperty, hashPropertyDescriptor);
      return hashPropertyDescriptor.value;
    }
    return undefined;
  }
  function freeze(object) {
    getOwnHashObject(object);
    return $freeze.apply(this, arguments);
  }
  function preventExtensions(object) {
    getOwnHashObject(object);
    return $preventExtensions.apply(this, arguments);
  }
  function seal(object) {
    getOwnHashObject(object);
    return $seal.apply(this, arguments);
  }
  Symbol.iterator = Symbol();
  freeze(SymbolValue.prototype);
  function toProperty(name) {
    if (isSymbol(name))
      return name[symbolInternalProperty];
    return name;
  }
  function getOwnPropertyNames(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (!symbolValues[name] && !privateNames[name])
        rv.push(name);
    }
    return rv;
  }
  function getOwnPropertyDescriptor(object, name) {
    return $getOwnPropertyDescriptor(object, toProperty(name));
  }
  function getOwnPropertySymbols(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var symbol = symbolValues[names[i]];
      if (symbol)
        rv.push(symbol);
    }
    return rv;
  }
  function hasOwnProperty(name) {
    return $hasOwnProperty.call(this, toProperty(name));
  }
  function getOption(name) {
    return global.traceur && global.traceur.options[name];
  }
  function setProperty(object, name, value) {
    var sym,
        desc;
    if (isSymbol(name)) {
      sym = name;
      name = name[symbolInternalProperty];
    }
    object[name] = value;
    if (sym && (desc = $getOwnPropertyDescriptor(object, name)))
      $defineProperty(object, name, {enumerable: false});
    return value;
  }
  function defineProperty(object, name, descriptor) {
    if (isSymbol(name)) {
      if (descriptor.enumerable) {
        descriptor = $create(descriptor, {enumerable: {value: false}});
      }
      name = name[symbolInternalProperty];
    }
    $defineProperty(object, name, descriptor);
    return object;
  }
  function polyfillObject(Object) {
    $defineProperty(Object, 'defineProperty', {value: defineProperty});
    $defineProperty(Object, 'getOwnPropertyNames', {value: getOwnPropertyNames});
    $defineProperty(Object, 'getOwnPropertyDescriptor', {value: getOwnPropertyDescriptor});
    $defineProperty(Object.prototype, 'hasOwnProperty', {value: hasOwnProperty});
    $defineProperty(Object, 'freeze', {value: freeze});
    $defineProperty(Object, 'preventExtensions', {value: preventExtensions});
    $defineProperty(Object, 'seal', {value: seal});
    Object.getOwnPropertySymbols = getOwnPropertySymbols;
  }
  function exportStar(object) {
    for (var i = 1; i < arguments.length; i++) {
      var names = $getOwnPropertyNames(arguments[i]);
      for (var j = 0; j < names.length; j++) {
        var name = names[j];
        if (privateNames[name])
          continue;
        (function(mod, name) {
          $defineProperty(object, name, {
            get: function() {
              return mod[name];
            },
            enumerable: true
          });
        })(arguments[i], names[j]);
      }
    }
    return object;
  }
  function isObject(x) {
    return x != null && (typeof x === 'object' || typeof x === 'function');
  }
  function toObject(x) {
    if (x == null)
      throw $TypeError();
    return $Object(x);
  }
  function assertObject(x) {
    if (!isObject(x))
      throw $TypeError(x + ' is not an Object');
    return x;
  }
  function setupGlobals(global) {
    global.Symbol = Symbol;
    polyfillObject(global.Object);
  }
  setupGlobals(global);
  global.$traceurRuntime = {
    assertObject: assertObject,
    createPrivateName: createPrivateName,
    exportStar: exportStar,
    getOwnHashObject: getOwnHashObject,
    privateNames: privateNames,
    setProperty: setProperty,
    setupGlobals: setupGlobals,
    toObject: toObject,
    toProperty: toProperty,
    type: types,
    typeof: typeOf,
    defineProperties: $defineProperties,
    defineProperty: $defineProperty,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    getOwnPropertyNames: $getOwnPropertyNames,
    keys: $keys
  };
})(typeof global !== 'undefined' ? global : this);
(function() {
  'use strict';
  var toObject = $traceurRuntime.toObject;
  function spread() {
    var rv = [],
        k = 0;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = toObject(arguments[i]);
      for (var j = 0; j < valueToSpread.length; j++) {
        rv[k++] = valueToSpread[j];
      }
    }
    return rv;
  }
  $traceurRuntime.spread = spread;
})();
(function() {
  'use strict';
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $getOwnPropertyDescriptor = $traceurRuntime.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $traceurRuntime.getOwnPropertyNames;
  var $getPrototypeOf = Object.getPrototypeOf;
  function superDescriptor(homeObject, name) {
    var proto = $getPrototypeOf(homeObject);
    do {
      var result = $getOwnPropertyDescriptor(proto, name);
      if (result)
        return result;
      proto = $getPrototypeOf(proto);
    } while (proto);
    return undefined;
  }
  function superCall(self, homeObject, name, args) {
    return superGet(self, homeObject, name).apply(self, args);
  }
  function superGet(self, homeObject, name) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      if (!descriptor.get)
        return descriptor.value;
      return descriptor.get.call(self);
    }
    return undefined;
  }
  function superSet(self, homeObject, name, value) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor && descriptor.set) {
      descriptor.set.call(self, value);
      return value;
    }
    throw $TypeError("super has no setter '" + name + "'.");
  }
  function getDescriptors(object) {
    var descriptors = {},
        name,
        names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      descriptors[name] = $getOwnPropertyDescriptor(object, name);
    }
    return descriptors;
  }
  function createClass(ctor, object, staticObject, superClass) {
    $defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
    } else {
      ctor.prototype = object;
    }
    $defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return $defineProperties(ctor, getDescriptors(staticObject));
  }
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
    }
    if (superClass === null)
      return null;
    throw new $TypeError();
  }
  function defaultSuperCall(self, homeObject, args) {
    if ($getPrototypeOf(homeObject) !== null)
      superCall(self, homeObject, 'constructor', args);
  }
  $traceurRuntime.createClass = createClass;
  $traceurRuntime.defaultSuperCall = defaultSuperCall;
  $traceurRuntime.superCall = superCall;
  $traceurRuntime.superGet = superGet;
  $traceurRuntime.superSet = superSet;
})();
(function() {
  'use strict';
  var createPrivateName = $traceurRuntime.createPrivateName;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $create = Object.create;
  var $TypeError = TypeError;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var ST_NEWBORN = 0;
  var ST_EXECUTING = 1;
  var ST_SUSPENDED = 2;
  var ST_CLOSED = 3;
  var END_STATE = -2;
  var RETHROW_STATE = -3;
  function getInternalError(state) {
    return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
  }
  function GeneratorContext() {
    this.state = 0;
    this.GState = ST_NEWBORN;
    this.storedException = undefined;
    this.finallyFallThrough = undefined;
    this.sent_ = undefined;
    this.returnValue = undefined;
    this.tryStack_ = [];
  }
  GeneratorContext.prototype = {
    pushTry: function(catchState, finallyState) {
      if (finallyState !== null) {
        var finallyFallThrough = null;
        for (var i = this.tryStack_.length - 1; i >= 0; i--) {
          if (this.tryStack_[i].catch !== undefined) {
            finallyFallThrough = this.tryStack_[i].catch;
            break;
          }
        }
        if (finallyFallThrough === null)
          finallyFallThrough = RETHROW_STATE;
        this.tryStack_.push({
          finally: finallyState,
          finallyFallThrough: finallyFallThrough
        });
      }
      if (catchState !== null) {
        this.tryStack_.push({catch: catchState});
      }
    },
    popTry: function() {
      this.tryStack_.pop();
    },
    get sent() {
      this.maybeThrow();
      return this.sent_;
    },
    set sent(v) {
      this.sent_ = v;
    },
    get sentIgnoreThrow() {
      return this.sent_;
    },
    maybeThrow: function() {
      if (this.action === 'throw') {
        this.action = 'next';
        throw this.sent_;
      }
    },
    end: function() {
      switch (this.state) {
        case END_STATE:
          return this;
        case RETHROW_STATE:
          throw this.storedException;
        default:
          throw getInternalError(this.state);
      }
    },
    handleException: function(ex) {
      this.GState = ST_CLOSED;
      this.state = END_STATE;
      throw ex;
    }
  };
  function nextOrThrow(ctx, moveNext, action, x) {
    switch (ctx.GState) {
      case ST_EXECUTING:
        throw new Error(("\"" + action + "\" on executing generator"));
      case ST_CLOSED:
        if (action == 'next') {
          return {
            value: undefined,
            done: true
          };
        }
        throw new Error(("\"" + action + "\" on closed generator"));
      case ST_NEWBORN:
        if (action === 'throw') {
          ctx.GState = ST_CLOSED;
          throw x;
        }
        if (x !== undefined)
          throw $TypeError('Sent value to newborn generator');
      case ST_SUSPENDED:
        ctx.GState = ST_EXECUTING;
        ctx.action = action;
        ctx.sent = x;
        var value = moveNext(ctx);
        var done = value === ctx;
        if (done)
          value = ctx.returnValue;
        ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
        return {
          value: value,
          done: done
        };
    }
  }
  var ctxName = createPrivateName();
  var moveNextName = createPrivateName();
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  $defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
  GeneratorFunctionPrototype.prototype = {
    constructor: GeneratorFunctionPrototype,
    next: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'next', v);
    },
    throw: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'throw', v);
    }
  };
  $defineProperties(GeneratorFunctionPrototype.prototype, {
    constructor: {enumerable: false},
    next: {enumerable: false},
    throw: {enumerable: false}
  });
  Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function() {
    return this;
  }));
  function createGeneratorInstance(innerFunction, functionObject, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new GeneratorContext();
    var object = $create(functionObject.prototype);
    object[ctxName] = ctx;
    object[moveNextName] = moveNext;
    return object;
  }
  function initGeneratorFunction(functionObject) {
    functionObject.prototype = $create(GeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = GeneratorFunctionPrototype;
    return functionObject;
  }
  function AsyncFunctionContext() {
    GeneratorContext.call(this);
    this.err = undefined;
    var ctx = this;
    ctx.result = new Promise(function(resolve, reject) {
      ctx.resolve = resolve;
      ctx.reject = reject;
    });
  }
  AsyncFunctionContext.prototype = $create(GeneratorContext.prototype);
  AsyncFunctionContext.prototype.end = function() {
    switch (this.state) {
      case END_STATE:
        this.resolve(this.returnValue);
        break;
      case RETHROW_STATE:
        this.reject(this.storedException);
        break;
      default:
        this.reject(getInternalError(this.state));
    }
  };
  AsyncFunctionContext.prototype.handleException = function() {
    this.state = RETHROW_STATE;
  };
  function asyncWrap(innerFunction, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new AsyncFunctionContext();
    ctx.createCallback = function(newState) {
      return function(value) {
        ctx.state = newState;
        ctx.value = value;
        moveNext(ctx);
      };
    };
    ctx.errback = function(err) {
      handleCatch(ctx, err);
      moveNext(ctx);
    };
    moveNext(ctx);
    return ctx.result;
  }
  function getMoveNext(innerFunction, self) {
    return function(ctx) {
      while (true) {
        try {
          return innerFunction.call(self, ctx);
        } catch (ex) {
          handleCatch(ctx, ex);
        }
      }
    };
  }
  function handleCatch(ctx, ex) {
    ctx.storedException = ex;
    var last = ctx.tryStack_[ctx.tryStack_.length - 1];
    if (!last) {
      ctx.handleException(ex);
      return;
    }
    ctx.state = last.catch !== undefined ? last.catch : last.finally;
    if (last.finallyFallThrough !== undefined)
      ctx.finallyFallThrough = last.finallyFallThrough;
  }
  $traceurRuntime.asyncWrap = asyncWrap;
  $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
  $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
})();
(function() {
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }
    if (opt_domain) {
      out.push('//');
      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }
      out.push(opt_domain);
      if (opt_port) {
        out.push(':', opt_port);
      }
    }
    if (opt_path) {
      out.push(opt_path);
    }
    if (opt_queryData) {
      out.push('?', opt_queryData);
    }
    if (opt_fragment) {
      out.push('#', opt_fragment);
    }
    return out.join('');
  }
  ;
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
  var ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  };
  function split(uri) {
    return (uri.match(splitRe));
  }
  function removeDotSegments(path) {
    if (path === '/')
      return '/';
    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }
    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }
      if (out.length === 0)
        out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
  }
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
    path = removeDotSegments(path);
    parts[ComponentIndex.PATH] = path;
    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
  }
  function canonicalizeUrl(url) {
    var parts = split(url);
    return joinAndCanonicalizePath(parts);
  }
  function resolveUrl(base, url) {
    var parts = split(url);
    var baseParts = split(base);
    if (parts[ComponentIndex.SCHEME]) {
      return joinAndCanonicalizePath(parts);
    } else {
      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
    }
    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
      if (!parts[i]) {
        parts[i] = baseParts[i];
      }
    }
    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }
    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }
  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;
})();
(function(global) {
  'use strict';
  var $__2 = $traceurRuntime.assertObject($traceurRuntime),
      canonicalizeUrl = $__2.canonicalizeUrl,
      resolveUrl = $__2.resolveUrl,
      isAbsolute = $__2.isAbsolute;
  var moduleInstantiators = Object.create(null);
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';
  var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  };
  ($traceurRuntime.createClass)(UncoatedModuleEntry, {}, {});
  var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
    $traceurRuntime.superCall(this, $UncoatedModuleInstantiator.prototype, "constructor", [url, null]);
    this.func = func;
  };
  var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
  ($traceurRuntime.createClass)(UncoatedModuleInstantiator, {getUncoatedModule: function() {
      if (this.value_)
        return this.value_;
      return this.value_ = this.func.call(global);
    }}, {}, UncoatedModuleEntry);
  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  }
  ;
  var moduleInstances = Object.create(null);
  var liveModuleSentinel = {};
  function Module(uncoatedModule) {
    var isLive = arguments[1];
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach((function(name) {
      var getter,
          value;
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        if (descr.get)
          getter = descr.get;
      }
      if (!getter) {
        value = uncoatedModule[name];
        getter = function() {
          return value;
        };
      }
      Object.defineProperty(coatedModule, name, {
        get: getter,
        enumerable: true
      });
    }));
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }
  var ModuleStore = {
    normalize: function(name, refererName, refererAddress) {
      if (typeof name !== "string")
        throw new TypeError("module name must be a string, not " + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if (/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },
    get: function(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;
      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },
    set: function(normalizedName, module) {
      normalizedName = String(normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, (function() {
        return module;
      }));
      moduleInstances[normalizedName] = module;
    },
    get baseURL() {
      return baseURL;
    },
    set baseURL(v) {
      baseURL = String(v);
    },
    registerModule: function(name, func) {
      var normalizedName = ModuleStore.normalize(name);
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
    },
    bundleStore: Object.create(null),
    register: function(name, deps, func) {
      if (!deps || !deps.length && !func.length) {
        this.registerModule(name, func);
      } else {
        this.bundleStore[name] = {
          deps: deps,
          execute: function() {
            var $__0 = arguments;
            var depMap = {};
            deps.forEach((function(dep, index) {
              return depMap[dep] = $__0[index];
            }));
            var registryEntry = func.call(this, depMap);
            registryEntry.execute.call(this);
            return registryEntry.exports;
          }
        };
      }
    },
    getAnonymousModule: function(func) {
      return new Module(func.call(global), liveModuleSentinel);
    },
    getForTesting: function(name) {
      var $__0 = this;
      if (!this.testingPrefix_) {
        Object.keys(moduleInstances).some((function(key) {
          var m = /(traceur@[^\/]*\/)/.exec(key);
          if (m) {
            $__0.testingPrefix_ = m[1];
            return true;
          }
        }));
      }
      return this.get(this.testingPrefix_ + name);
    }
  };
  ModuleStore.set('@traceur/src/runtime/ModuleStore', new Module({ModuleStore: ModuleStore}));
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
  };
  $traceurRuntime.ModuleStore = ModuleStore;
  global.System = {
    register: ModuleStore.register.bind(ModuleStore),
    get: ModuleStore.get,
    set: ModuleStore.set,
    normalize: ModuleStore.normalize
  };
  $traceurRuntime.getModuleImpl = function(name) {
    var instantiator = getUncoatedModuleInstantiator(name);
    return instantiator && instantiator.getUncoatedModule();
  };
})(typeof global !== 'undefined' ? global : this);
System.register("traceur-runtime@0.0.42/src/runtime/polyfills/utils", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.42/src/runtime/polyfills/utils";
  var toObject = $traceurRuntime.toObject;
  function toUint32(x) {
    return x | 0;
  }
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function isCallable(x) {
    return typeof x === 'function';
  }
  function toInteger(x) {
    x = +x;
    if (isNaN(x))
      return 0;
    if (!isFinite(x) || x === 0)
      return x;
    return x > 0 ? Math.floor(x) : Math.ceil(x);
  }
  var MAX_SAFE_LENGTH = Math.pow(2, 53) - 1;
  function toLength(x) {
    var len = toInteger(x);
    return len < 0 ? 0 : Math.min(len, MAX_SAFE_LENGTH);
  }
  return {
    get toObject() {
      return toObject;
    },
    get toUint32() {
      return toUint32;
    },
    get isObject() {
      return isObject;
    },
    get isCallable() {
      return isCallable;
    },
    get toInteger() {
      return toInteger;
    },
    get toLength() {
      return toLength;
    }
  };
});
System.register("traceur-runtime@0.0.42/src/runtime/polyfills/Array", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.42/src/runtime/polyfills/Array";
  var $__3 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.42/src/runtime/polyfills/utils")),
      toInteger = $__3.toInteger,
      toLength = $__3.toLength,
      toObject = $__3.toObject,
      isCallable = $__3.isCallable;
  function fill(value) {
    var start = arguments[1] !== (void 0) ? arguments[1] : 0;
    var end = arguments[2];
    var object = toObject(this);
    var len = toLength(object.length);
    var fillStart = toInteger(start);
    var fillEnd = end !== undefined ? toInteger(end) : len;
    fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
    fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
    while (fillStart < fillEnd) {
      object[fillStart] = value;
      fillStart++;
    }
    return object;
  }
  function find(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg);
  }
  function findIndex(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg, true);
  }
  function findHelper(self, predicate) {
    var thisArg = arguments[2];
    var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
    var object = toObject(self);
    var len = toLength(object.length);
    if (!isCallable(predicate)) {
      throw TypeError();
    }
    for (var i = 0; i < len; i++) {
      if (i in object) {
        var value = object[i];
        if (predicate.call(thisArg, value, i, object)) {
          return returnIndex ? i : value;
        }
      }
    }
    return returnIndex ? -1 : undefined;
  }
  return {
    get fill() {
      return fill;
    },
    get find() {
      return find;
    },
    get findIndex() {
      return findIndex;
    }
  };
});
System.register("traceur-runtime@0.0.42/src/runtime/polyfills/ArrayIterator", [], function() {
  "use strict";
  var $__5;
  var __moduleName = "traceur-runtime@0.0.42/src/runtime/polyfills/ArrayIterator";
  var $__6 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.42/src/runtime/polyfills/utils")),
      toObject = $__6.toObject,
      toUint32 = $__6.toUint32;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function ArrayIterator() {};
  ($traceurRuntime.createClass)(ArrayIterator, ($__5 = {}, Object.defineProperty($__5, "next", {
    value: function() {
      var iterator = toObject(this);
      var array = iterator.iteratorObject_;
      if (!array) {
        throw new TypeError('Object is not an ArrayIterator');
      }
      var index = iterator.arrayIteratorNextIndex_;
      var itemKind = iterator.arrayIterationKind_;
      var length = toUint32(array.length);
      if (index >= length) {
        iterator.arrayIteratorNextIndex_ = Infinity;
        return createIteratorResultObject(undefined, true);
      }
      iterator.arrayIteratorNextIndex_ = index + 1;
      if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
        return createIteratorResultObject(array[index], false);
      if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
        return createIteratorResultObject([index, array[index]], false);
      return createIteratorResultObject(index, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__5, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__5), {});
  function createArrayIterator(array, kind) {
    var object = toObject(array);
    var iterator = new ArrayIterator;
    iterator.iteratorObject_ = object;
    iterator.arrayIteratorNextIndex_ = 0;
    iterator.arrayIterationKind_ = kind;
    return iterator;
  }
  function createIteratorResultObject(value, done) {
    return {
      value: value,
      done: done
    };
  }
  function entries() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
  }
  function keys() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
  }
  function values() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
  }
  return {
    get entries() {
      return entries;
    },
    get keys() {
      return keys;
    },
    get values() {
      return values;
    }
  };
});
System.register("traceur-runtime@0.0.42/src/runtime/polyfills/Map", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.42/src/runtime/polyfills/Map";
  var isObject = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.42/src/runtime/polyfills/utils")).isObject;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  var deletedSentinel = {};
  function lookupIndex(map, key) {
    if (isObject(key)) {
      var hashObject = getOwnHashObject(key);
      return hashObject && map.objectIndex_[hashObject.hash];
    }
    if (typeof key === 'string')
      return map.stringIndex_[key];
    return map.primitiveIndex_[key];
  }
  function initMap(map) {
    map.entries_ = [];
    map.objectIndex_ = Object.create(null);
    map.stringIndex_ = Object.create(null);
    map.primitiveIndex_ = Object.create(null);
    map.deletedCount_ = 0;
  }
  var Map = function Map() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError("Constructor Map requires 'new'");
    if ($hasOwnProperty.call(this, 'entries_')) {
      throw new TypeError("Map can not be reentrantly initialised");
    }
    initMap(this);
    if (iterable !== null && iterable !== undefined) {
      var iter = iterable[Symbol.iterator];
      if (iter !== undefined) {
        for (var $__8 = iterable[Symbol.iterator](),
            $__9; !($__9 = $__8.next()).done; ) {
          var $__10 = $traceurRuntime.assertObject($__9.value),
              key = $__10[0],
              value = $__10[1];
          {
            this.set(key, value);
          }
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Map, {
    get size() {
      return this.entries_.length / 2 - this.deletedCount_;
    },
    get: function(key) {
      var index = lookupIndex(this, key);
      if (index !== undefined)
        return this.entries_[index + 1];
    },
    set: function(key, value) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index = lookupIndex(this, key);
      if (index !== undefined) {
        this.entries_[index + 1] = value;
      } else {
        index = this.entries_.length;
        this.entries_[index] = key;
        this.entries_[index + 1] = value;
        if (objectMode) {
          var hashObject = getOwnHashObject(key);
          var hash = hashObject.hash;
          this.objectIndex_[hash] = index;
        } else if (stringMode) {
          this.stringIndex_[key] = index;
        } else {
          this.primitiveIndex_[key] = index;
        }
      }
      return this;
    },
    has: function(key) {
      return lookupIndex(this, key) !== undefined;
    },
    delete: function(key) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index;
      var hash;
      if (objectMode) {
        var hashObject = getOwnHashObject(key);
        if (hashObject) {
          index = this.objectIndex_[hash = hashObject.hash];
          delete this.objectIndex_[hash];
        }
      } else if (stringMode) {
        index = this.stringIndex_[key];
        delete this.stringIndex_[key];
      } else {
        index = this.primitiveIndex_[key];
        delete this.primitiveIndex_[key];
      }
      if (index !== undefined) {
        this.entries_[index] = deletedSentinel;
        this.entries_[index + 1] = undefined;
        this.deletedCount_++;
      }
    },
    clear: function() {
      initMap(this);
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      for (var i = 0,
          len = this.entries_.length; i < len; i += 2) {
        var key = this.entries_[i];
        var value = this.entries_[i + 1];
        if (key === deletedSentinel)
          continue;
        callbackFn.call(thisArg, value, key, this);
      }
    }
  }, {});
  return {get Map() {
      return Map;
    }};
});
System.register("traceur-runtime@0.0.42/src/runtime/polyfills/Object", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.42/src/runtime/polyfills/Object";
  var $__11 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.42/src/runtime/polyfills/utils")),
      toInteger = $__11.toInteger,
      toLength = $__11.toLength,
      toObject = $__11.toObject,
      isCallable = $__11.isCallable;
  var $__11 = $traceurRuntime.assertObject($traceurRuntime),
      defineProperty = $__11.defineProperty,
      getOwnPropertyDescriptor = $__11.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__11.getOwnPropertyNames,
      keys = $__11.keys,
      privateNames = $__11.privateNames;
  function is(left, right) {
    if (left === right)
      return left !== 0 || 1 / left === 1 / right;
    return left !== left && right !== right;
  }
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      var props = keys(source);
      var p,
          length = props.length;
      for (p = 0; p < length; p++) {
        var name = props[p];
        if (privateNames[name])
          continue;
        target[name] = source[name];
      }
    }
    return target;
  }
  function mixin(target, source) {
    var props = getOwnPropertyNames(source);
    var p,
        descriptor,
        length = props.length;
    for (p = 0; p < length; p++) {
      var name = props[p];
      if (privateNames[name])
        continue;
      descriptor = getOwnPropertyDescriptor(source, props[p]);
      defineProperty(target, props[p], descriptor);
    }
    return target;
  }
  return {
    get is() {
      return is;
    },
    get assign() {
      return assign;
    },
    get mixin() {
      return mixin;
    }
  };
});
System.register("traceur-runtime@0.0.42/node_modules/rsvp/lib/rsvp/asap", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.42/node_modules/rsvp/lib/rsvp/asap";
  var $__default = function asap(callback, arg) {
    var length = queue.push([callback, arg]);
    if (length === 1) {
      scheduleFlush();
    }
  };
  var browserGlobal = (typeof window !== 'undefined') ? window : {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  function useNextTick() {
    return function() {
      process.nextTick(flush);
    };
  }
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function() {
      node.data = (iterations = ++iterations % 2);
    };
  }
  function useSetTimeout() {
    return function() {
      setTimeout(flush, 1);
    };
  }
  var queue = [];
  function flush() {
    for (var i = 0; i < queue.length; i++) {
      var tuple = queue[i];
      var callback = tuple[0],
          arg = tuple[1];
      callback(arg);
    }
    queue = [];
  }
  var scheduleFlush;
  if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
System.register("traceur-runtime@0.0.42/src/runtime/polyfills/Promise", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.42/src/runtime/polyfills/Promise";
  var async = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.42/node_modules/rsvp/lib/rsvp/asap")).default;
  var promiseRaw = {};
  function isPromise(x) {
    return x && typeof x === 'object' && x.status_ !== undefined;
  }
  function idResolveHandler(x) {
    return x;
  }
  function idRejectHandler(x) {
    throw x;
  }
  function chain(promise) {
    var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
    var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
    var deferred = getDeferred(promise.constructor);
    switch (promise.status_) {
      case undefined:
        throw TypeError;
      case 0:
        promise.onResolve_.push(onResolve, deferred);
        promise.onReject_.push(onReject, deferred);
        break;
      case +1:
        promiseEnqueue(promise.value_, [onResolve, deferred]);
        break;
      case -1:
        promiseEnqueue(promise.value_, [onReject, deferred]);
        break;
    }
    return deferred.promise;
  }
  function getDeferred(C) {
    if (this === $Promise) {
      var promise = promiseInit(new $Promise(promiseRaw));
      return {
        promise: promise,
        resolve: (function(x) {
          promiseResolve(promise, x);
        }),
        reject: (function(r) {
          promiseReject(promise, r);
        })
      };
    } else {
      var result = {};
      result.promise = new C((function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
      }));
      return result;
    }
  }
  function promiseSet(promise, status, value, onResolve, onReject) {
    promise.status_ = status;
    promise.value_ = value;
    promise.onResolve_ = onResolve;
    promise.onReject_ = onReject;
    return promise;
  }
  function promiseInit(promise) {
    return promiseSet(promise, 0, undefined, [], []);
  }
  var Promise = function Promise(resolver) {
    if (resolver === promiseRaw)
      return;
    if (typeof resolver !== 'function')
      throw new TypeError;
    var promise = promiseInit(this);
    try {
      resolver((function(x) {
        promiseResolve(promise, x);
      }), (function(r) {
        promiseReject(promise, r);
      }));
    } catch (e) {
      promiseReject(promise, e);
    }
  };
  ($traceurRuntime.createClass)(Promise, {
    catch: function(onReject) {
      return this.then(undefined, onReject);
    },
    then: function(onResolve, onReject) {
      if (typeof onResolve !== 'function')
        onResolve = idResolveHandler;
      if (typeof onReject !== 'function')
        onReject = idRejectHandler;
      var that = this;
      var constructor = this.constructor;
      return chain(this, function(x) {
        x = promiseCoerce(constructor, x);
        return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
      }, onReject);
    }
  }, {
    resolve: function(x) {
      if (this === $Promise) {
        return promiseSet(new $Promise(promiseRaw), +1, x);
      } else {
        return new this(function(resolve, reject) {
          resolve(x);
        });
      }
    },
    reject: function(r) {
      if (this === $Promise) {
        return promiseSet(new $Promise(promiseRaw), -1, r);
      } else {
        return new this((function(resolve, reject) {
          reject(r);
        }));
      }
    },
    cast: function(x) {
      if (x instanceof this)
        return x;
      if (isPromise(x)) {
        var result = getDeferred(this);
        chain(x, result.resolve, result.reject);
        return result.promise;
      }
      return this.resolve(x);
    },
    all: function(values) {
      var deferred = getDeferred(this);
      var resolutions = [];
      try {
        var count = values.length;
        if (count === 0) {
          deferred.resolve(resolutions);
        } else {
          for (var i = 0; i < values.length; i++) {
            this.resolve(values[i]).then(function(i, x) {
              resolutions[i] = x;
              if (--count === 0)
                deferred.resolve(resolutions);
            }.bind(undefined, i), (function(r) {
              deferred.reject(r);
            }));
          }
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    },
    race: function(values) {
      var deferred = getDeferred(this);
      try {
        for (var i = 0; i < values.length; i++) {
          this.resolve(values[i]).then((function(x) {
            deferred.resolve(x);
          }), (function(r) {
            deferred.reject(r);
          }));
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    }
  });
  var $Promise = Promise;
  var $PromiseReject = $Promise.reject;
  function promiseResolve(promise, x) {
    promiseDone(promise, +1, x, promise.onResolve_);
  }
  function promiseReject(promise, r) {
    promiseDone(promise, -1, r, promise.onReject_);
  }
  function promiseDone(promise, status, value, reactions) {
    if (promise.status_ !== 0)
      return;
    promiseEnqueue(value, reactions);
    promiseSet(promise, status, value);
  }
  function promiseEnqueue(value, tasks) {
    async((function() {
      for (var i = 0; i < tasks.length; i += 2) {
        promiseHandle(value, tasks[i], tasks[i + 1]);
      }
    }));
  }
  function promiseHandle(value, handler, deferred) {
    try {
      var result = handler(value);
      if (result === deferred.promise)
        throw new TypeError;
      else if (isPromise(result))
        chain(result, deferred.resolve, deferred.reject);
      else
        deferred.resolve(result);
    } catch (e) {
      try {
        deferred.reject(e);
      } catch (e) {}
    }
  }
  var thenableSymbol = '@@thenable';
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function promiseCoerce(constructor, x) {
    if (!isPromise(x) && isObject(x)) {
      var then;
      try {
        then = x.then;
      } catch (r) {
        var promise = $PromiseReject.call(constructor, r);
        x[thenableSymbol] = promise;
        return promise;
      }
      if (typeof then === 'function') {
        var p = x[thenableSymbol];
        if (p) {
          return p;
        } else {
          var deferred = getDeferred(constructor);
          x[thenableSymbol] = deferred.promise;
          try {
            then.call(x, deferred.resolve, deferred.reject);
          } catch (r) {
            deferred.reject(r);
          }
          return deferred.promise;
        }
      }
    }
    return x;
  }
  return {get Promise() {
      return Promise;
    }};
});
System.register("traceur-runtime@0.0.42/src/runtime/polyfills/String", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.42/src/runtime/polyfills/String";
  var $toString = Object.prototype.toString;
  var $indexOf = String.prototype.indexOf;
  var $lastIndexOf = String.prototype.lastIndexOf;
  function startsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) == start;
  }
  function endsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var pos = stringLength;
    if (arguments.length > 1) {
      var position = arguments[1];
      if (position !== undefined) {
        pos = position ? Number(position) : 0;
        if (isNaN(pos)) {
          pos = 0;
        }
      }
    }
    var end = Math.min(Math.max(pos, 0), stringLength);
    var start = end - searchLength;
    if (start < 0) {
      return false;
    }
    return $lastIndexOf.call(string, searchString, start) == start;
  }
  function contains(search) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) != -1;
  }
  function repeat(count) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var n = count ? Number(count) : 0;
    if (isNaN(n)) {
      n = 0;
    }
    if (n < 0 || n == Infinity) {
      throw RangeError();
    }
    if (n == 0) {
      return '';
    }
    var result = '';
    while (n--) {
      result += string;
    }
    return result;
  }
  function codePointAt(position) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var size = string.length;
    var index = position ? Number(position) : 0;
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0 || index >= size) {
      return undefined;
    }
    var first = string.charCodeAt(index);
    var second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }
  function raw(callsite) {
    var raw = callsite.raw;
    var len = raw.length >>> 0;
    if (len === 0)
      return '';
    var s = '';
    var i = 0;
    while (true) {
      s += raw[i];
      if (i + 1 === len)
        return s;
      s += arguments[++i];
    }
  }
  function fromCodePoint() {
    var codeUnits = [];
    var floor = Math.floor;
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return '';
    }
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
    }
    return String.fromCharCode.apply(null, codeUnits);
  }
  return {
    get startsWith() {
      return startsWith;
    },
    get endsWith() {
      return endsWith;
    },
    get contains() {
      return contains;
    },
    get repeat() {
      return repeat;
    },
    get codePointAt() {
      return codePointAt;
    },
    get raw() {
      return raw;
    },
    get fromCodePoint() {
      return fromCodePoint;
    }
  };
});
System.register("traceur-runtime@0.0.42/src/runtime/polyfills/polyfills", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.42/src/runtime/polyfills/polyfills";
  var Map = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.42/src/runtime/polyfills/Map")).Map;
  var Promise = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.42/src/runtime/polyfills/Promise")).Promise;
  var $__14 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.42/src/runtime/polyfills/String")),
      codePointAt = $__14.codePointAt,
      contains = $__14.contains,
      endsWith = $__14.endsWith,
      fromCodePoint = $__14.fromCodePoint,
      repeat = $__14.repeat,
      raw = $__14.raw,
      startsWith = $__14.startsWith;
  var $__14 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.42/src/runtime/polyfills/Array")),
      fill = $__14.fill,
      find = $__14.find,
      findIndex = $__14.findIndex;
  var $__14 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.42/src/runtime/polyfills/ArrayIterator")),
      entries = $__14.entries,
      keys = $__14.keys,
      values = $__14.values;
  var $__14 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.42/src/runtime/polyfills/Object")),
      assign = $__14.assign,
      is = $__14.is,
      mixin = $__14.mixin;
  function maybeDefineMethod(object, name, value) {
    if (!(name in object)) {
      Object.defineProperty(object, name, {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
      });
    }
  }
  function maybeAddFunctions(object, functions) {
    for (var i = 0; i < functions.length; i += 2) {
      var name = functions[i];
      var value = functions[i + 1];
      maybeDefineMethod(object, name, value);
    }
  }
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  function polyfillCollections(global) {
    if (!global.Map)
      global.Map = Map;
  }
  function polyfillString(String) {
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'contains', contains, 'endsWith', endsWith, 'startsWith', startsWith, 'repeat', repeat]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
  }
  function polyfillArray(Array, Symbol) {
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    if (Symbol && Symbol.iterator) {
      Object.defineProperty(Array.prototype, Symbol.iterator, {
        value: values,
        configurable: true,
        enumerable: false,
        writable: true
      });
    }
  }
  function polyfillObject(Object) {
    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
  }
  function polyfill(global) {
    polyfillPromise(global);
    polyfillCollections(global);
    polyfillString(global.String);
    polyfillArray(global.Array, global.Symbol);
    polyfillObject(global.Object);
  }
  polyfill(this);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
    polyfill(global);
  };
  return {};
});
System.register("traceur-runtime@0.0.42/src/runtime/polyfill-import", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.42/src/runtime/polyfill-import";
  var $__16 = $traceurRuntime.assertObject(System.get("traceur-runtime@0.0.42/src/runtime/polyfills/polyfills"));
  return {};
});
System.get("traceur-runtime@0.0.42/src/runtime/polyfill-import" + '');

}).call(this,require("FWaASH"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"FWaASH":2}],4:[function(require,module,exports){
(function (global){
//! moment.js
//! version : 2.8.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {
    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = '2.8.1',
        // the global-scope this is NOT the global object in Node.js
        globalScope = typeof global !== 'undefined' ? global : this,
        oldGlobalMoment,
        round = Math.round,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for locale config files
        locales = {},

        // extra moment internal properties (plugins register props here)
        momentProperties = [],

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        parseTokenOrdinal = /\d{1,2}/,

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            Q : 'quarter',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // default relative time thresholds
        relativeTimeThresholds = {
            s: 45,  // seconds to minute
            m: 45,  // minutes to hour
            h: 22,  // hours to day
            d: 26,  // days to month
            M: 11   // months to year
        },

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.localeData().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.localeData().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.localeData().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.localeData().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.localeData().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        deprecations = {},

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    // Pick the first defined of two or three arguments. dfl comes from
    // default.
    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2: return a != null ? a : b;
            case 3: return a != null ? a : b != null ? b : c;
            default: throw new Error('Implement me');
        }
    }

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function printMsg(msg) {
        if (moment.suppressDeprecationWarnings === false &&
                typeof console !== 'undefined' && console.warn) {
            console.warn("Deprecation warning: " + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function () {
            if (firstTime) {
                printMsg(msg);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true;
        }
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.localeData().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Locale() {
    }

    // Moment prototype object
    function Moment(config, skipOverflow) {
        if (skipOverflow !== false) {
            checkOverflow(config);
        }
        copyConfig(this, config);
        this._d = new Date(+config._d);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = moment.localeData();

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }

        if (b.hasOwnProperty('toString')) {
            a.toString = b.toString;
        }

        if (b.hasOwnProperty('valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = from._pf;
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = makeAs(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, "moment()." + name  + "(period, number) is deprecated. Please use moment()." + name + "(number, period).");
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = moment.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this;
        };
    }

    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return Object.prototype.toString.call(input) === '[object Date]' ||
            input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (inputObject.hasOwnProperty(prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment._locale[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment._locale, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0;
            }
        }
        return m._isValid;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && hasModule) {
            try {
                oldLocale = moment.locale();
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we want to undo that for lazy loaded locales
                moment.locale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function makeAs(input, model) {
        return model._isUTC ? moment(input).zone(model._offset || 0) :
            moment(input).local();
    }

    /************************************
        Locale
    ************************************/


    extend(Locale.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment.utc([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : 'h:mm A',
            L : 'MM/DD/YYYY',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY LT',
            LLLL : 'dddd, MMMM D, YYYY LT'
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },

        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },

        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace('%d', number);
        },
        _ordinal : '%d',

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'Q':
            return parseTokenOneDigit;
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) {
                return parseTokenOneDigit;
            }
            /* falls through */
        case 'SS':
            if (strict) {
                return parseTokenTwoDigits;
            }
            /* falls through */
        case 'SSS':
            if (strict) {
                return parseTokenThreeDigits;
            }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return config._locale._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        case 'Do':
            return parseTokenOrdinal;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        string = string || '';
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // QUARTER
        case 'Q':
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = config._locale.monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        case 'Do' :
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(input, 10));
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = config._locale.isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        // WEEKDAY - human
        case 'dd':
        case 'ddd':
        case 'dddd':
            a = config._locale.weekdaysParse(input);
            // if we didn't get a weekday name, mark the date as invalid
            if (a != null) {
                config._w = config._w || {};
                config._w['d'] = a;
            } else {
                config._pf.invalidWeekday = input;
            }
            break;
        // WEEK, WEEK DAY - numeric
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gggg':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = toInt(input);
            }
            break;
        case 'gg':
        case 'GG':
            config._w = config._w || {};
            config._w[token] = moment.parseTwoDigitYear(input);
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        // Apply timezone offset from input. The actual zone can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);
        }
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }

        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function parseISO(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be "T" or undefined
                    config._f = isoDates[i][0] + (match[6] || ' ');
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += 'Z';
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i, matched;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromConfig(config);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, locale) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = locale.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = moment.duration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            years = round(duration.as('y')),

            args = seconds < relativeTimeThresholds.s && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < relativeTimeThresholds.m && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < relativeTimeThresholds.h && ['hh', hours] ||
                days === 1 && ['d'] ||
                days < relativeTimeThresholds.d && ['dd', days] ||
                months === 1 && ['M'] ||
                months < relativeTimeThresholds.M && ['MM', months] ||
                years === 1 && ['y'] || ['yy', years];

        args[2] = withoutSuffix;
        args[3] = +posNegDuration > 0;
        args[4] = locale;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || moment.localeData(config._l);

        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (moment.isMoment(input)) {
            return new Moment(input, true);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === "boolean") {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = locale;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    moment.suppressDeprecationWarnings = false;

    moment.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i);
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    moment.min = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    };

    moment.max = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    };

    // creating with utc
    moment.utc = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === "boolean") {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso,
            diffRes;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        } else if (typeof duration === 'object' &&
                ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && input.hasOwnProperty('_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // constant that refers to the ISO standard
    moment.ISO_8601 = function () {};

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    moment.momentProperties = momentProperties;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function allows you to set a threshold for relative time strings
    moment.relativeTimeThreshold = function (threshold, limit) {
        if (relativeTimeThresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return relativeTimeThresholds[threshold];
        }
        relativeTimeThresholds[threshold] = limit;
        return true;
    };

    moment.lang = deprecate(
        "moment.lang is deprecated. Use moment.locale instead.",
        function (key, value) {
            return moment.locale(key, value);
        }
    );

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    moment.locale = function (key, values) {
        var data;
        if (key) {
            if (typeof(values) !== "undefined") {
                data = moment.defineLocale(key, values);
            }
            else {
                data = moment.localeData(key);
            }

            if (data) {
                moment.duration._locale = moment._locale = data;
            }
        }

        return moment._locale._abbr;
    };

    moment.defineLocale = function (name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);

            // backwards compat for now: also set the locale
            moment.locale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    };

    moment.langData = deprecate(
        "moment.langData is deprecated. Use moment.localeData instead.",
        function (key) {
            return moment.localeData(key);
        }
    );

    // returns locale data
    moment.localeData = function (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return moment._locale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null &&  obj.hasOwnProperty('_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };

    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().locale('en').format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {
            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function (keepLocalTime) {
            return this.zone(0, keepLocalTime);
        },

        local : function (keepLocalTime) {
            if (this._isUTC) {
                this.zone(0, keepLocalTime);
                this._isUTC = false;

                if (keepLocalTime) {
                    this.add(this._d.getTimezoneOffset(), 'm');
                }
            }
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.localeData().postformat(output);
        },

        add : createAdder(1, 'add'),

        subtract : createAdder(-1, 'subtract'),

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                output += ((this - moment(this).startOf('month')) -
                        (that - moment(that).startOf('month'))) / diff;
                // same as above but with zones, to negate all dst
                output -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function (time) {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're zone'd or not.
            var now = time || moment(),
                sod = makeAs(now, this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.localeData().calendar(format, this));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, 'd');
            } else {
                return day;
            }
        },

        month : makeAccessor('Month', true),

        startOf : function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            // quarters are also special
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = units || 'ms';
            return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);
        },

        min: deprecate(
                 'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
                 function (other) {
                     other = moment.apply(null, arguments);
                     return other < this ? this : other;
                 }
         ),

        max: deprecate(
                'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
                function (other) {
                    other = moment.apply(null, arguments);
                    return other > this ? this : other;
                }
        ),

        // keepLocalTime = true means only change the timezone, without
        // affecting the local hour. So 5:31:26 +0300 --[zone(2, true)]-->
        // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist int zone
        // +0200, so we adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        zone : function (input, keepLocalTime) {
            var offset = this._offset || 0,
                localAdjust;
            if (input != null) {
                if (typeof input === 'string') {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = this._d.getTimezoneOffset();
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.subtract(localAdjust, 'm');
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this,
                                moment.duration(offset - input, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
            } else {
                return this._isUTC ? offset : this._d.getTimezoneOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? 'UTC' : '';
        },

        zoneName : function () {
            return this._isUTC ? 'Coordinated Universal Time' : '';
        },

        parseZone : function () {
            if (this._tzm) {
                this.zone(this._tzm);
            } else if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
        },

        quarter : function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        week : function (input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, 'd');
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        isoWeeksInYear : function () {
            return weeksInYear(this.year(), 1, 4);
        },

        weeksInYear : function () {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a locale key, it will set the locale for this
        // instance.  Otherwise, it will return the locale configuration
        // variables for this instance.
        locale : function (key) {
            if (key === undefined) {
                return this._locale._abbr;
            } else {
                this._locale = moment.localeData(key);
                return this;
            }
        },

        lang : deprecate(
            "moment().lang() is deprecated. Use moment().localeData() instead.",
            function (key) {
                if (key === undefined) {
                    return this.localeData();
                } else {
                    this._locale = moment.localeData(key);
                    return this;
                }
            }
        ),

        localeData : function () {
            return this._locale;
        }
    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(),
                daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }

    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    // moment.fn.month is defined separately
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    function daysToYears (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        return days * 400 / 146097;
    }

    function yearsToDays (years) {
        // years * 365 + absRound(years / 4) -
        //     absRound(years / 100) + absRound(years / 400);
        return years * 146097 / 400;
    }

    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years = 0;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);

            // Accurately convert days to years, assume start from year 0.
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));

            // 30 days to a month
            // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
            months += absRound(days / 30);
            days %= 30;

            // 12 months -> 1 year
            years += absRound(months / 12);
            months %= 12;

            data.days = days;
            data.months = months;
            data.years = years;
        },

        abs : function () {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);

            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);

            return this;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());

            if (withSuffix) {
                output = this.localeData().pastFuture(+this, output);
            }

            return this.localeData().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            var days, months;
            units = normalizeUnits(units);

            days = this._days + this._milliseconds / 864e5;
            if (units === 'month' || units === 'year') {
                months = this._months + daysToYears(days) * 12;
                return units === 'month' ? months : months / 12;
            } else {
                days += yearsToDays(this._months / 12);
                switch (units) {
                    case 'week': return days / 7;
                    case 'day': return days;
                    case 'hour': return days * 24;
                    case 'minute': return days * 24 * 60;
                    case 'second': return days * 24 * 60 * 60;
                    case 'millisecond': return days * 24 * 60 * 60 * 1000;
                    default: throw new Error('Unknown unit ' + units);
                }
            }
        },

        lang : moment.fn.lang,
        locale : moment.fn.locale,

        toIsoString : deprecate(
            "toIsoString() is deprecated. Please use toISOString() instead " +
            "(notice the capitals)",
            function () {
                return this.toISOString();
            }
        ),

        toISOString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        },

        localeData : function () {
            return this._locale;
        }
    });

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationGetter(i.toLowerCase());
        }
    }

    moment.duration.fn.asMilliseconds = function () {
        return this.as('ms');
    };
    moment.duration.fn.asSeconds = function () {
        return this.as('s');
    };
    moment.duration.fn.asMinutes = function () {
        return this.as('m');
    };
    moment.duration.fn.asHours = function () {
        return this.as('h');
    };
    moment.duration.fn.asDays = function () {
        return this.as('d');
    };
    moment.duration.fn.asWeeks = function () {
        return this.as('weeks');
    };
    moment.duration.fn.asMonths = function () {
        return this.as('M');
    };
    moment.duration.fn.asYears = function () {
        return this.as('y');
    };

    /************************************
        Default Locale
    ************************************/


    // Set default locale, other locale will inherit from English.
    moment.locale('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LOCALES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(shouldDeprecate) {
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate(
                    'Accessing Moment through the global scope is ' +
                    'deprecated, and will be removed in an upcoming ' +
                    'release.',
                    moment);
        } else {
            globalScope.moment = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === 'function' && define.amd) {
        define('moment', function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

var shimvis = true
var change = null
var hidden = null

module.exports = Visibility

if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden'
  change = 'visibilitychange'
} else
if (typeof document.mozHidden !== 'undefined') {
  hidden = 'mozHidden'
  change = 'mozvisibilitychange'
} else
if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden'
  change = 'webkitvisibilitychange'
} else
if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden'
  change = 'webkitvisibilitychange'
}

inherits(Visibility, EventEmitter)
function Visibility() {
  if (!(this instanceof Visibility)) return new Visibility
  var self = this

  EventEmitter.call(this)
  this.supported = !!hidden

  if (this.supported) {
    document.addEventListener(change, function() {
      var visible = !document[hidden]
      self.emit('change', visible)
      self.emit(visible ? 'show' : 'hide')
    }, false)
  } else {
    document.addEventListener('focusout', function() {
      self.emit('change', false)
      self.emit('hide')
      shimvis = false
    }, false)
    document.addEventListener('focusin', function() {
      self.emit('change', true)
      self.emit('show')
      shimvis = true
    }, false)
  }

  window.addEventListener('unload', function() {
    self.emit('exit')
  }, false)
}

Visibility.prototype.hidden = function() {
  return this.supported ? !!document[hidden] : !shimvis
}
Visibility.prototype.visible = function() {
  return this.supported ? !document[hidden] : shimvis
}

},{"events":1,"inherits":6}],6:[function(require,module,exports){
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

},{}],"base_object":[function(require,module,exports){
module.exports=require('2HNVgz');
},{}],"2HNVgz":[function(require,module,exports){
"use strict";
var _ = require('underscore');
var extend = require('./utils').extend;
var Events = require('./events');
var pluginOptions = ['container'];
var BaseObject = function BaseObject(options) {
  this.uniqueId = _.uniqueId('o');
  options || (options = {});
  _.extend(this, _.pick(options, pluginOptions));
  if (this.initialize) {
    this.initialize.apply(this, arguments);
  }
};
($traceurRuntime.createClass)(BaseObject, {}, {}, Events);
BaseObject.extend = extend;
module.exports = BaseObject;


},{"./events":9,"./utils":18,"underscore":"ZKusGn"}],9:[function(require,module,exports){
(function (global){
"use strict";
var _ = require('underscore');
var Log = require('../plugins/log');
var slice = Array.prototype.slice;
var Events = function Events() {};
($traceurRuntime.createClass)(Events, {
  on: function(name, callback, context) {
    if (!eventsApi(this, 'on', name, [callback, context]) || !callback)
      return this;
    this._events || (this._events = {});
    var events = this._events[name] || (this._events[name] = []);
    events.push({
      callback: callback,
      context: context,
      ctx: context || this
    });
    return this;
  },
  once: function(name, callback, context) {
    if (!eventsApi(this, 'once', name, [callback, context]) || !callback)
      return this;
    var self = this;
    var once = _.once(function() {
      self.off(name, once);
      callback.apply(this, arguments);
    });
    once._callback = callback;
    return this.on(name, once, context);
  },
  off: function(name, callback, context) {
    var retain,
        ev,
        events,
        names,
        i,
        l,
        j,
        k;
    if (!this._events || !eventsApi(this, 'off', name, [callback, context]))
      return this;
    if (!name && !callback && !context) {
      this._events = void 0;
      return this;
    }
    names = name ? [name] : _.keys(this._events);
    for (i = 0, l = names.length; i < l; i++) {
      name = names[i];
      events = this._events[name];
      if (events) {
        this._events[name] = retain = [];
        if (callback || context) {
          for (j = 0, k = events.length; j < k; j++) {
            ev = events[j];
            if ((callback && callback !== ev.callback && callback !== ev.callback._callback) || (context && context !== ev.context)) {
              retain.push(ev);
            }
          }
        }
        if (!retain.length)
          delete this._events[name];
      }
    }
    return this;
  },
  trigger: function(name) {
    var klass = arguments[arguments.length - 1];
    if (global.DEBUG) {
      if (Log.BLACKLIST.indexOf(name) < 0)
        Log.info(klass, 'event ' + name + ' triggered');
    }
    if (!this._events)
      return this;
    var args = slice.call(arguments, 1);
    if (!eventsApi(this, 'trigger', name, args))
      return this;
    var events = this._events[name];
    var allEvents = this._events.all;
    if (events)
      triggerEvents(events, args);
    if (allEvents)
      triggerEvents(allEvents, arguments);
    return this;
  },
  stopListening: function(obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo)
      return this;
    var remove = !name && !callback;
    if (!callback && typeof name === 'object')
      callback = this;
    if (obj)
      (listeningTo = {})[obj._listenId] = obj;
    for (var id in listeningTo) {
      obj = listeningTo[id];
      obj.off(name, callback, this);
      if (remove || _.isEmpty(obj._events))
        delete this._listeningTo[id];
    }
    return this;
  }
}, {});
var eventSplitter = /\s+/;
var eventsApi = function(obj, action, name, rest) {
  if (!name)
    return true;
  if (typeof name === 'object') {
    for (var key in name) {
      obj[action].apply(obj, [key, name[key]].concat(rest));
    }
    return false;
  }
  if (eventSplitter.test(name)) {
    var names = name.split(eventSplitter);
    for (var i = 0,
        l = names.length; i < l; i++) {
      obj[action].apply(obj, [names[i]].concat(rest));
    }
    return false;
  }
  return true;
};
var triggerEvents = function(events, args) {
  var ev,
      i = -1,
      l = events.length,
      a1 = args[0],
      a2 = args[1],
      a3 = args[2];
  switch (args.length) {
    case 0:
      while (++i < l)
        (ev = events[i]).callback.call(ev.ctx);
      return;
    case 1:
      while (++i < l)
        (ev = events[i]).callback.call(ev.ctx, a1);
      return;
    case 2:
      while (++i < l)
        (ev = events[i]).callback.call(ev.ctx, a1, a2);
      return;
    case 3:
      while (++i < l)
        (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
      return;
    default:
      while (++i < l)
        (ev = events[i]).callback.apply(ev.ctx, args);
      return;
  }
};
var listenMethods = {
  listenTo: 'on',
  listenToOnce: 'once'
};
_.each(listenMethods, function(implementation, method) {
  Events.prototype[method] = function(obj, name, callback) {
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
    listeningTo[id] = obj;
    if (!callback && typeof name === 'object')
      callback = this;
    obj[implementation](name, callback, this);
    return this;
  };
});
module.exports = Events;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../plugins/log":43,"underscore":"ZKusGn"}],10:[function(require,module,exports){
"use strict";
var _ = require('underscore');
module.exports = {
  'media_control': _.template('<div class="media-control-layer" data-controls>  <% var renderBar = function(name) { %>      <div class="bar-container" data-<%= name %>>        <div class="bar-background" data-<%= name %>>          <div class="bar-fill-1" data-<%= name %>></div>          <div class="bar-fill-2" data-<%= name %>></div>        </div>        <div class="bar-scrubber" data-<%= name %>>          <div class="bar-scrubber-icon" data-<%= name %>></div>        </div>      </div>  <% }; %>  <% var renderDrawer = function(name, renderContent) { %>      <div class="drawer-container" data-<%= name %>>        <div class="drawer-icon-container" data-<%= name %>>          <div class="drawer-icon media-control-icon" data-<%= name %>></div>          <span class="drawer-text" data-<%= name %>></span>        </div>        <% renderContent(name); %>      </div>  <% }; %>  <% var renderIndicator = function(name) { %>      <div class="media-control-indicator" data-<%= name %>></div>  <% }; %>  <% var renderButton = function(name) { %>      <button class="media-control-button media-control-icon" data-<%= name %>></button>  <% }; %>  <% var render = function(settings) {      _.each(settings, function(setting) {        if(setting === "seekbar") {          renderBar(setting);        } else if (setting === "volume") {          renderDrawer(setting, renderBar);        } else if (setting === "duration" || setting === "position") {          renderIndicator(setting);        } else {          renderButton(setting);        }      });    }; %>  <% if (settings.left && settings.left.length) { %>  <div class="media-control-left-panel" data-media-control>    <% render(settings.left); %>  </div>  <% } %>  <% if (settings.right && settings.right.length) { %>  <div class="media-control-right-panel" data-media-control>    <% render(settings.right); %>  </div>  <% } %>  <% if (settings.default && settings.default.length) { %>  <div class="media-control-center-panel" data-media-control>    <% render(settings.default); %>  </div>  <% } %></div>'),
  'flash_vod': _.template('  <param name="movie" value="<%= swfPath %>">  <param name="quality" value="autohigh">  <param name="swliveconnect" value="true">  <param name="allowScriptAccess" value="always">  <param name="bgcolor" value="#001122">  <param name="allowFullScreen" value="false">  <param name="wmode" value="gpu">  <param name="tabindex" value="1">  <param name=FlashVars value="playbackId=<%= playbackId %>" />  <embed    type="application/x-shockwave-flash"    disabled="disabled"    tabindex="-1"    enablecontextmenu="false"    allowScriptAccess="always"    quality="autohight"    pluginspage="http://www.macromedia.com/go/getflashplayer"    wmode="gpu"    swliveconnect="true"    type="application/x-shockwave-flash"    allowfullscreen="false"    bgcolor="#000000"    FlashVars="playbackId=<%= playbackId %>"    src="<%= swfPath %>">  </embed>'),
  'hls': _.template('  <param name="movie" value="<%= swfPath %>?inline=1">  <param name="quality" value="autohigh">  <param name="swliveconnect" value="true">  <param name="allowScriptAccess" value="always">  <param name="bgcolor" value="#001122">  <param name="allowFullScreen" value="false">  <param name="wmode" value="transparent">  <param name="tabindex" value="1">  <param name=FlashVars value="playbackId=<%= playbackId %>" />  <embed    type="application/x-shockwave-flash"    tabindex="1"    enablecontextmenu="false"    allowScriptAccess="always"    quality="autohigh"    pluginspage="http://www.macromedia.com/go/getflashplayer"    wmode="transparent"    swliveconnect="true"    type="application/x-shockwave-flash"    allowfullscreen="false"    bgcolor="#000000"    FlashVars="playbackId=<%= playbackId %>"    src="<%= swfPath %>">  </embed>'),
  'poster': _.template('<img class="poster-background" data-poster src="" /><div class="play-wrapper" data-poster>  <span class="poster-icon play" data-poster /></div>'),
  'spinner_loading': _.template('<div data-spinner-container class="spin-container1">  <div data-circle1></div>  <div data-circle2></div>  <div data-circle3></div>  <div data-circle4></div></div><div data-spinner-container class="spin-container2">  <div data-circle1></div>  <div data-circle2></div>  <div data-circle3></div>  <div data-circle4></div></div><div data-spinner-container class="spin-container3">  <div data-circle1></div>  <div data-circle2></div>  <div data-circle3></div>  <div data-circle4></div></div>'),
  'spinner_three_bounce': _.template('<div data-bounce1></div><div data-bounce2></div><div data-bounce3></div>'),
  'watermark': _.template('<div data-watermark data-watermark-<%=position %>><img src="<%= imageUrl %>"></div>'),
  CSS: {
    'container': '[data-container]{position:absolute;background-color:#000;height:100%;width:100%}',
    'core': '[data-player] *{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;margin:0;padding:0;border:0;font-style:normal;font-weight:400;text-align:center;font-size:100%;color:#000;font-family:"lucida grande",tahoma,verdana,arial,sans-serif;text-shadow:0 0 0;box-sizing:border-box}[data-player] * a,[data-player] * abbr,[data-player] * acronym,[data-player] * address,[data-player] * applet,[data-player] * article,[data-player] * aside,[data-player] * audio,[data-player] * b,[data-player] * big,[data-player] * blockquote,[data-player] * canvas,[data-player] * caption,[data-player] * center,[data-player] * cite,[data-player] * code,[data-player] * dd,[data-player] * del,[data-player] * details,[data-player] * dfn,[data-player] * div,[data-player] * dl,[data-player] * dt,[data-player] * em,[data-player] * embed,[data-player] * fieldset,[data-player] * figcaption,[data-player] * figure,[data-player] * footer,[data-player] * form,[data-player] * h1,[data-player] * h2,[data-player] * h3,[data-player] * h4,[data-player] * h5,[data-player] * h6,[data-player] * header,[data-player] * hgroup,[data-player] * i,[data-player] * iframe,[data-player] * img,[data-player] * ins,[data-player] * kbd,[data-player] * label,[data-player] * legend,[data-player] * li,[data-player] * mark,[data-player] * menu,[data-player] * nav,[data-player] * object,[data-player] * ol,[data-player] * output,[data-player] * p,[data-player] * pre,[data-player] * q,[data-player] * ruby,[data-player] * s,[data-player] * samp,[data-player] * section,[data-player] * small,[data-player] * span,[data-player] * strike,[data-player] * strong,[data-player] * sub,[data-player] * summary,[data-player] * sup,[data-player] * table,[data-player] * tbody,[data-player] * td,[data-player] * tfoot,[data-player] * th,[data-player] * thead,[data-player] * time,[data-player] * tr,[data-player] * tt,[data-player] * u,[data-player] * ul,[data-player] * var,[data-player] * video{margin:0;padding:0;border:0;font:inherit;font-size:100%;vertical-align:baseline}[data-player] * table{border-collapse:collapse;border-spacing:0}[data-player] * caption,[data-player] * td,[data-player] * th{text-align:left;font-weight:400;vertical-align:middle}[data-player] * blockquote,[data-player] * q{quotes:none}[data-player] * blockquote:after,[data-player] * blockquote:before,[data-player] * q:after,[data-player] * q:before{content:"";content:none}[data-player] * a img{border:none}[data-player]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0);position:relative;margin:0;height:594px;width:1055px;text-align:center;overflow:hidden}[data-player].fullscreen{width:100%;height:100%}[data-player].nocursor{cursor:none}',
    'media_control': '@font-face{font-family:Player;src:url(assets/Player-Regular.eot);src:url(assets/Player-Regular.eot?#iefix) format("embedded-opentype"),url(assets/Player-Regular.ttf) format("truetype"),url(assets/Player-Regular.svg#player) format("svg")}.media-control[data-media-control]{position:absolute;background-color:rgba(2,2,2,.5);border-radius:0;bottom:0;left:0;right:0;margin-left:auto;margin-right:auto;max-width:100%;min-width:60%;height:40px;z-index:9999;-webkit-transition:all .4s ease-out;-moz-transition:all .4s ease-out;-ms-transition:all .4s ease-out;-o-transition:all .4s ease-out;transition:all .4s ease-out}.media-control[data-media-control] .media-control-icon{font-family:Player;font-weight:400;font-style:normal;font-size:26px;line-height:32px;letter-spacing:0;speak:none;color:#fff;vertical-align:middle;text-align:left;padding:0 6px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.media-control[data-media-control].media-control-hide{bottom:-40px}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls]{position:relative;top:10%;height:80%;vertical-align:middle}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-left-panel[data-media-control]{position:absolute;top:0;left:5px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-center-panel[data-media-control]{height:100%;text-align:center;line-height:32px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-right-panel[data-media-control]{position:absolute;top:0;right:5px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button{background-color:transparent;border:0;margin:0 8px;cursor:pointer;display:inline-block}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button:focus{outline:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]{float:left;width:32px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]:before{content:"\\e001"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]{float:left;width:32px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]:before{content:"\\e002"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]{float:left;width:32px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]:before{content:"\\e003"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]{float:right;background-color:transparent;border:0;width:32px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]:before{content:"\\e006"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]{cursor:default;float:right;background-color:transparent;border:0;width:32px;height:100%;opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]:before{content:"\\e007"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]{float:left;width:32px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]:before{content:"\\e001"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].playing:before{content:"\\e002"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].paused:before{content:"\\e001"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]{float:left;width:32px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]:before{content:"\\e001"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].playing:before{content:"\\e003"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].stopped:before{content:"\\e001"}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration],.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{display:inline-block;font-size:13px;color:#fff;cursor:default;line-height:32px;position:relative}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]:before{content:"/";margin-right:3px}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]{position:absolute;top:-20px;left:0;display:inline-block;vertical-align:middle;width:100%;height:32px;cursor:pointer}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar]{width:100%;height:8px;position:relative;top:12px;background-color:#6f6f6f;overflow:hidden}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-1[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#bebebe;-webkit-transition:all .1s ease-out;-moz-transition:all .1s ease-out;-ms-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#fff;-webkit-transition:all .1s ease-out;-moz-transition:all .1s ease-out;-ms-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{position:absolute;top:6px;left:0;width:20px;height:20px;opacity:1;-webkit-transition:all .1s ease-out;-moz-transition:all .1s ease-out;-ms-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] .bar-scrubber-icon[data-seekbar]{position:absolute;left:3px;top:3px;width:14px;height:14px;border-radius:6px;border:1px solid #6f6f6f;background-color:#fff}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume]{float:right;display:inline-block;width:32px;height:32px;cursor:pointer}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume]{position:absolute;bottom:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]{background-color:transparent;border:0;width:32px;height:32px}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:before{content:"\\e004"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:before{content:"\\e005"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume]{width:32px;height:88px;position:absolute;bottom:40px;background:rgba(2,2,2,.5);border-radius:4px;-webkit-transition:all .2s ease-out;-moz-transition:all .2s ease-out;-ms-transition:all .2s ease-out;-o-transition:all .2s ease-out;transition:all .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume].volume-bar-hide{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-background[data-volume]{margin-left:12px;background:#6f6f6f;border-radius:4px;width:8px;height:72px;position:relative;top:8px;overflow:hidden}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-background[data-volume] .bar-fill-1[data-volume]{position:absolute;bottom:0;background:#fff;width:100%;height:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-scrubber[data-volume]{position:absolute;bottom:40%;left:6px;width:20px;height:20px}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .bar-scrubber[data-volume] .bar-scrubber-icon[data-volume]{position:absolute;left:4px;top:4px;width:12px;height:12px;border-radius:6px;border:1px solid #6f6f6f;background-color:#fff}',
    'flash_vod': '[data-flash-vod]{position:absolute;height:100%;width:100%;background-color:#000;display:block;pointer-events:none}',
    'hls': '[data-hls]{position:absolute;height:100%;width:100%;background-color:#000;display:block;pointer-events:none}',
    'html5_video': '[data-html5-video]{position:absolute;height:100%;width:100%;display:block}',
    'pip': '.pip-loading[data-pip]{left:25px;top:15px;position:relative;float:left;z-index:3001;color:#fff}.pip-transition[data-pip]{-webkit-transition:all .4s ease-out;-moz-transition:all .4s ease-out;-ms-transition:all .4s ease-out;-o-transition:all .4s ease-out;transition:all .4s ease-out}.master-container[data-pip]{cursor:default;width:100%;height:100%;font-size:100%;position:absolute;bottom:0;right:0;border:none}.pip-container[data-pip]{cursor:pointer;width:24%;height:24%;font-size:24%;z-index:2000;position:absolute;right:23px;bottom:23px;border-width:2px;border-radius:3px;border-style:solid;border-color:rgba(255,255,255,.25);background-clip:padding-box;-webkit-background-clip:padding-box}.pip-container[data-pip].over-media-control{bottom:63px}',
    'poster': '@font-face{font-family:Player;src:url(assets/Player-Regular.eot);src:url(assets/Player-Regular.eot?#iefix) format("embedded-opentype"),url(assets/Player-Regular.ttf) format("truetype"),url(assets/Player-Regular.svg#player) format("svg")}.player-poster[data-poster]{cursor:pointer;position:absolute;height:100%;width:100%;z-index:998;top:0}.player-poster[data-poster] .poster-background[data-poster]{width:100%;height:100%}.player-poster[data-poster] .play-wrapper[data-poster]{position:absolute;overflow:hidden;width:100%;height:20%;line-height:100%;font-size:20%;top:50%;margin-top:-5%;text-align:center}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]{font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#fff;opacity:.75}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster].play[data-poster]:before{content:"\\e001"}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]:hover{opacity:1}',
    'spinner_loading': 'div[data-spinner]{width:50px;height:50px;position:relative;margin-left:auto;margin-right:auto;right:0;left:0;z-index:999;top:45%}.spin-container1>div,.spin-container2>div,.spin-container3>div{width:13px;height:13px;background-color:#fff;border-radius:100%;position:absolute;-webkit-animation:bouncedelay 1.2s infinite ease-in-out;animation:bouncedelay 1.2s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}[data-spinner] [data-spinner-container]{position:absolute;width:100%;height:100%}.spin-container2{-webkit-transform:rotateZ(45deg);transform:rotateZ(45deg)}.spin-container3{-webkit-transform:rotateZ(90deg);transform:rotateZ(90deg)}[data-circle1]{top:0;left:0}[data-circle2]{top:0;right:0}[data-circle3]{right:0;bottom:0}[data-circle4]{left:0;bottom:0}.spin-container2 [data-circle1]{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.spin-container3 [data-circle1]{-webkit-animation-delay:-1s;animation-delay:-1s}.spin-container1 [data-circle2]{-webkit-animation-delay:-.9s;animation-delay:-.9s}.spin-container2 [data-circle2]{-webkit-animation-delay:-.8s;animation-delay:-.8s}.spin-container3 [data-circle2]{-webkit-animation-delay:-.7s;animation-delay:-.7s}.spin-container1 [data-circle3]{-webkit-animation-delay:-.6s;animation-delay:-.6s}.spin-container2 [data-circle3]{-webkit-animation-delay:-.5s;animation-delay:-.5s}.spin-container3 [data-circle3]{-webkit-animation-delay:-.4s;animation-delay:-.4s}.spin-container1 [data-circle4]{-webkit-animation-delay:-.3s;animation-delay:-.3s}.spin-container2 [data-circle4]{-webkit-animation-delay:-.2s;animation-delay:-.2s}.spin-container3 [data-circle4]{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes bouncedelay{0%,100%,80%{transform:scale(0);-webkit-transform:scale(0)}40%{transform:scale(1);-webkit-transform:scale(1)}}',
    'spinner_three_bounce': '.spinner-three-bounce[data-spinner]{position:absolute;margin:0 auto;width:70px;text-align:center;z-index:10;top:47%;left:0;right:0}.spinner-three-bounce[data-spinner]>div{width:18px;height:18px;background-color:#FFF;border-radius:100%;display:inline-block;-webkit-animation:bouncedelay 1.4s infinite ease-in-out;-moz-animation:bouncedelay 1.4s infinite ease-in-out;-o-animation:bouncedelay 1.4s infinite ease-in-out;animation:bouncedelay 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both}.spinner-three-bounce[data-spinner] [data-bounce1]{-webkit-animation-delay:-.32s;animation-delay:-.32s}.spinner-three-bounce[data-spinner] [data-bounce2]{-webkit-animation-delay:-.16s;animation-delay:-.16s}@-webkit-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);-moz-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);-moz-transform:scale(1);transform:scale(1)}}@-moz-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);-moz-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);-moz-transform:scale(1);transform:scale(1)}}@-ms-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);-moz-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);-moz-transform:scale(1);transform:scale(1)}}@keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);-moz-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);-moz-transform:scale(1);transform:scale(1)}}',
    'watermark': '[data-watermark]{position:absolute;margin:100px auto 0;width:70px;text-align:center;z-index:10}[data-watermark-bottom-left]{bottom:10px;left:10px}[data-watermark-bottom-right]{bottom:10px;right:42px}[data-watermark-top-left]{top:-95px;left:10px}[data-watermark-top-right]{top:-95px;right:37px}'
  }
};


},{"underscore":"ZKusGn"}],11:[function(require,module,exports){
"use strict";
var PluginMixin = require('./plugin_mixin');
var BaseObject = require('./base_object');
var Plugin = BaseObject.extend(PluginMixin).extend({});
module.exports = Plugin;


},{"./base_object":"2HNVgz","./plugin_mixin":12}],12:[function(require,module,exports){
"use strict";
var PluginMixin = {
  initialize: function() {
    this.bindEvents();
  },
  enable: function() {
    this.bindEvents();
  },
  disable: function() {
    this.stopListening();
  }
};
module.exports = PluginMixin;


},{}],13:[function(require,module,exports){
"use strict";
var $ = require('jquery');
var _ = require('underscore');
var JST = require('./jst');
var Styler = {getStyleFor: function(name, options) {
    options = options || {};
    return $('<style></style>').html(_.template(JST.CSS[name])(options));
  }};
module.exports = Styler;


},{"./jst":10,"jquery":"HlZQrA","underscore":"ZKusGn"}],"8lqCAT":[function(require,module,exports){
"use strict";
var $ = require('jquery');
var _ = require('underscore');
var extend = require('./utils').extend;
var BaseObject = require('./base_object');
var delegateEventSplitter = /^(\S+)\s*(.*)$/;
var viewOptions = ['container', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];
var UIObject = function UIObject(options) {
  this.cid = _.uniqueId('c');
  this._ensureElement();
  $traceurRuntime.superCall(this, $UIObject.prototype, "constructor", [options]);
  this.delegateEvents();
};
var $UIObject = UIObject;
($traceurRuntime.createClass)(UIObject, {
  get tagName() {
    return 'div';
  },
  $: function(selector) {
    return this.$el.find(selector);
  },
  initialize: function() {},
  render: function() {
    return this;
  },
  remove: function() {
    this.$el.remove();
    this.stopListening();
    return this;
  },
  setElement: function(element, delegate) {
    if (this.$el)
      this.undelegateEvents();
    this.$el = element instanceof $ ? element : $(element);
    this.el = this.$el[0];
    if (delegate !== false)
      this.delegateEvents();
    return this;
  },
  delegateEvents: function(events) {
    if (!(events || (events = _.result(this, 'events'))))
      return this;
    this.undelegateEvents();
    for (var key in events) {
      var method = events[key];
      if (!_.isFunction(method))
        method = this[events[key]];
      if (!method)
        continue;
      var match = key.match(delegateEventSplitter);
      var eventName = match[1],
          selector = match[2];
      method = _.bind(method, this);
      eventName += '.delegateEvents' + this.cid;
      if (selector === '') {
        this.$el.on(eventName, method);
      } else {
        this.$el.on(eventName, selector, method);
      }
    }
    return this;
  },
  undelegateEvents: function() {
    this.$el.off('.delegateEvents' + this.cid);
    return this;
  },
  _ensureElement: function() {
    if (!this.el) {
      var attrs = _.extend({}, _.result(this, 'attributes'));
      if (this.id)
        attrs.id = _.result(this, 'id');
      if (this.className)
        attrs['class'] = _.result(this, 'className');
      var $el = $('<' + _.result(this, 'tagName') + '>').attr(attrs);
      this.setElement($el, false);
    } else {
      this.setElement(_.result(this, 'el'), false);
    }
  }
}, {}, BaseObject);
UIObject.extend = extend;
module.exports = UIObject;


},{"./base_object":"2HNVgz","./utils":18,"jquery":"HlZQrA","underscore":"ZKusGn"}],"ui_object":[function(require,module,exports){
module.exports=require('8lqCAT');
},{}],"ui_plugin":[function(require,module,exports){
module.exports=require('Z7u8cr');
},{}],"Z7u8cr":[function(require,module,exports){
"use strict";
var PluginMixin = require('./plugin_mixin');
var UIObject = require('./ui_object');
var extend = require('./utils').extend;
var _ = require('underscore');
var UIPlugin = function UIPlugin() {
  $traceurRuntime.defaultSuperCall(this, $UIPlugin.prototype, arguments);
};
var $UIPlugin = UIPlugin;
($traceurRuntime.createClass)(UIPlugin, {
  get type() {
    return 'ui';
  },
  enable: function() {
    $UIPlugin.super('enable').call(this);
    this.$el.show();
  },
  disable: function() {
    $UIPlugin.super('disable').call(this);
    this.$el.hide();
  },
  bindEvents: function() {}
}, {}, UIObject);
_.extend(UIPlugin.prototype, PluginMixin);
UIPlugin.extend = extend;
module.exports = UIPlugin;


},{"./plugin_mixin":12,"./ui_object":"8lqCAT","./utils":18,"underscore":"ZKusGn"}],18:[function(require,module,exports){
"use strict";
var _ = require('underscore');
var Moment = require('moment');
var extend = function(protoProps, staticProps) {
  var parent = this;
  var child;
  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function() {
      return parent.apply(this, arguments);
    };
  }
  _.extend(child, parent, staticProps);
  var Surrogate = function() {
    this.constructor = child;
  };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();
  if (protoProps)
    _.extend(child.prototype, protoProps);
  child.__super__ = parent.prototype;
  child.super = function(name) {
    return parent.prototype[name];
  };
  child.prototype.getClass = function() {
    return child;
  };
  return child;
};
var zeroPad = function(number, size) {
  return (new Array(size + 1 - number.toString().length)).join('0') + number;
};
var formatTime = function(time, showMillis) {
  var duration = Moment.duration(time * 1000);
  var str = zeroPad(duration.seconds(), 2);
  if (duration.hours()) {
    str = zeroPad(duration.minutes(), 2) + ':' + str;
    str = duration.hours() + ':' + str;
  } else {
    str = duration.minutes() + ':' + str;
  }
  if (showMillis)
    str += '.' + duration.milliseconds();
  return str;
};
var Fullscreen = {
  isFullscreen: function() {
    return document.webkitIsFullScreen || document.mozFullScreen;
  },
  requestFullscreen: function(el) {
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
  },
  cancelFullscreen: function() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};
module.exports = {
  extend: extend,
  zeroPad: zeroPad,
  formatTime: formatTime,
  Fullscreen: Fullscreen
};


},{"moment":4,"underscore":"ZKusGn"}],19:[function(require,module,exports){
"use strict";
var UIObject = require('../../base/ui_object');
var Styler = require('../../base/styler');
var _ = require('underscore');
var Container = function Container() {
  $traceurRuntime.defaultSuperCall(this, $Container.prototype, arguments);
};
var $Container = Container;
($traceurRuntime.createClass)(Container, {
  get name() {
    return 'Container';
  },
  get attributes() {
    return {'data-container': ''};
  },
  get events() {
    return {'click': 'clicked'};
  },
  initialize: function(options) {
    this.playback = options.playback;
    this.settings = this.playback.settings;
    this.listenTo(this.playback, 'playback:progress', this.progress);
    this.listenTo(this.playback, 'playback:timeupdate', this.timeUpdated);
    this.listenTo(this.playback, 'playback:ready', this.ready);
    this.listenTo(this.playback, 'playback:buffering', this.buffering);
    this.listenTo(this.playback, 'playback:bufferfull', this.bufferfull);
    this.listenTo(this.playback, 'playback:settingsupdate', this.settingsUpdate);
    this.listenTo(this.playback, 'playback:loadedmetadata', this.loadedMetadata);
    this.listenTo(this.playback, 'playback:highdefinitionupdate', this.highDefinitionUpdate);
    this.listenTo(this.playback, 'playback:mediacontrol:disable', this.disableMediaControl);
    this.listenTo(this.playback, 'playback:mediacontrol:enable', this.enableMediaControl);
    this.listenTo(this.playback, 'playback:ended', this.ended);
    this.listenTo(this.playback, 'playback:play', this.playing);
    this.isReady = false;
    this.mediaControlDisabled = false;
    this.plugins = [this.playback];
  },
  with: function(klass) {
    _.extend(this, klass);
    return this;
  },
  destroy: function() {
    this.trigger('container:destroyed', this, this.name);
    this.playback.destroy();
    this.$el.remove();
  },
  setStyle: function(style) {
    this.$el.css(style);
  },
  animate: function(style, duration) {
    return this.$el.animate(style, duration).promise();
  },
  ready: function() {
    this.isReady = true;
    this.trigger('container:ready', this.name);
  },
  isPlaying: function() {
    return this.playback.isPlaying();
  },
  error: function(errorObj) {
    this.trigger('container:error', errorObj, this.name);
  },
  loadedMetadata: function(duration) {
    this.trigger('container:loadedmetadata', duration);
  },
  timeUpdated: function(position, duration) {
    this.trigger('container:timeupdate', position, duration, this.name);
  },
  progress: function(startPosition, endPosition, duration) {
    this.trigger('container:progress', startPosition, endPosition, duration, this.name);
  },
  playing: function() {
    this.trigger('container:play', this.name);
  },
  play: function() {
    this.playback.play();
  },
  stop: function() {
    this.trigger('container:stop', this.name);
    this.playback.stop();
  },
  pause: function() {
    this.trigger('container:pause', this.name);
    this.playback.pause();
  },
  ended: function() {
    this.trigger('container:ended', this, this.name);
  },
  clicked: function() {
    this.trigger('container:click', this, this.name);
  },
  setCurrentTime: function(time) {
    this.trigger('container:seek', time, this.name);
    this.playback.seek(time);
  },
  setVolume: function(value) {
    this.trigger('container:volume', value, this.name);
    this.playback.volume(value);
  },
  requestFullscreen: function() {
    this.trigger('container:fullscreen', this.name);
  },
  buffering: function() {
    this.trigger('container:state:buffering', this.name);
  },
  bufferfull: function() {
    this.trigger('container:state:bufferfull', this.name);
  },
  addPlugin: function(plugin) {
    this.plugins.push(plugin);
  },
  hasPlugin: function(name) {
    return !!this.getPlugin(name);
  },
  getPlugin: function(name) {
    return _(this.plugins).find(function(plugin) {
      return plugin.name === name;
    });
  },
  settingsUpdate: function() {
    this.settings = this.playback.settings;
    this.trigger('container:settingsupdate');
  },
  highDefinitionUpdate: function() {
    this.trigger('container:highdefinitionupdate');
  },
  isHighDefinitionInUse: function() {
    return this.playback.isHighDefinition();
  },
  disableMediaControl: function() {
    this.mediaControlDisabled = true;
    this.trigger('container:mediacontrol:disable');
  },
  enableMediaControl: function() {
    this.mediaControlDisabled = false;
    this.trigger('container:mediacontrol:enable');
  },
  render: function() {
    var style = Styler.getStyleFor('container');
    this.$el.append(style);
    this.$el.append(this.playback.render().el);
    return this;
  }
}, {}, UIObject);
;
module.exports = Container;


},{"../../base/styler":13,"../../base/ui_object":"8lqCAT","underscore":"ZKusGn"}],20:[function(require,module,exports){
"use strict";
module.exports = require('./container');


},{"./container":19}],21:[function(require,module,exports){
"use strict";
var _ = require('underscore');
var BaseObject = require('../../base/base_object');
var Container = require('../container');
var $ = require('jquery');
var ContainerFactory = function ContainerFactory() {
  $traceurRuntime.defaultSuperCall(this, $ContainerFactory.prototype, arguments);
};
var $ContainerFactory = ContainerFactory;
($traceurRuntime.createClass)(ContainerFactory, {
  initialize: function(params, loader) {
    this.params = params;
    this.loader = loader;
  },
  createContainers: function() {
    return $.Deferred(function(promise) {
      promise.resolve(_.map(this.params.sources, function(source) {
        return this.createContainer(source);
      }, this));
    }.bind(this));
  },
  findPlaybackPlugin: function(source) {
    return _.find(this.loader.playbackPlugins, (function(p) {
      return p.canPlay("" + source);
    }), this);
  },
  createContainer: function(source) {
    var playbackPlugin = this.findPlaybackPlugin(source);
    var params = _.extend({}, this.params, {
      src: source,
      autoPlay: !!this.params.autoPlay
    });
    var playback = new playbackPlugin(params);
    var container = new Container({playback: playback});
    var defer = $.Deferred();
    defer.promise(container);
    this.addContainerPlugins(container, source);
    this.listenToOnce(container, 'container:ready', (function() {
      return defer.resolve(container);
    }));
    return container;
  },
  addContainerPlugins: function(container, source) {
    _.each(this.loader.containerPlugins, function(plugin) {
      var params = _.extend(this.params, {
        container: container,
        src: source
      });
      container.addPlugin(new plugin(params));
    }, this);
  }
}, {}, BaseObject);
;
module.exports = ContainerFactory;


},{"../../base/base_object":"2HNVgz","../container":20,"jquery":"HlZQrA","underscore":"ZKusGn"}],22:[function(require,module,exports){
"use strict";
module.exports = require('./container_factory');


},{"./container_factory":21}],23:[function(require,module,exports){
"use strict";
var _ = require('underscore');
var $ = require('jquery');
var UIObject = require('../../base/ui_object');
var ContainerFactory = require('../container_factory');
var Fullscreen = require('../../base/utils').Fullscreen;
var Loader = require('../loader');
var Styler = require('../../base/styler');
var MediaControl = require('../media_control');
var Core = function Core() {
  $traceurRuntime.defaultSuperCall(this, $Core.prototype, arguments);
};
var $Core = Core;
($traceurRuntime.createClass)(Core, {
  get events() {
    return {
      'webkitfullscreenchange': 'exit',
      'mousemove': 'showMediaControl',
      'mouseleave': 'hideMediaControl'
    };
  },
  get attributes() {
    return {'data-player': ''};
  },
  initialize: function(params) {
    var $__0 = this;
    this.defer = $.Deferred();
    this.defer.promise(this);
    this.plugins = [];
    this.containers = [];
    this.params = params;
    this.params.displayType || (this.params.displayType = 'pip');
    this.parentElement = params.parentElement;
    this.loader = new Loader(params);
    this.containerFactory = new ContainerFactory(params, this.loader);
    this.containerFactory.createContainers().then((function(containers) {
      return $__0.setupContainers(containers);
    })).then((function(containers) {
      return $__0.resolveOnContainersReady(containers);
    }));
    this.updateSize();
    document.addEventListener('mozfullscreenchange', (function() {
      return $__0.exit();
    }));
    $(window).resize((function() {
      return $__0.updateSize();
    }));
  },
  updateSize: function() {
    if (Fullscreen.isFullscreen()) {
      this.$el.addClass('fullscreen');
      this.$el.removeAttr('style');
    } else {
      var width = 0;
      var height = 0;
      if (this.params.stretchWidth && this.params.stretchHeight && this.params.stretchWidth <= window.innerWidth && this.params.stretchHeight <= (window.innerHeight * 0.73)) {
        width = this.params.stretchWidth;
        height = this.params.stretchHeight;
      } else {
        width = this.params.width || width;
        height = this.params.height || height;
      }
      if (width > 0) {
        this.$el.css({width: width});
      }
      if (height > 0) {
        this.$el.css({height: height});
      }
      this.$el.removeClass('fullscreen');
    }
  },
  resolveOnContainersReady: function(containers) {
    var $__0 = this;
    $.when.apply($, containers).done((function() {
      return $__0.defer.resolve($__0);
    }));
  },
  addPlugin: function(plugin) {
    this.plugins.push(plugin);
  },
  hasPlugin: function(name) {
    return !!this.getPlugin(name);
  },
  getPlugin: function(name) {
    return _(this.plugins).find((function(plugin) {
      return plugin.name === name;
    }));
  },
  load: function(sources) {
    var $__0 = this;
    sources = _.isString(sources) ? [sources] : sources;
    _(this.containers).each((function(container) {
      return container.destroy();
    }));
    this.containerFactory.params = _(this.params).extend({sources: sources});
    this.containerFactory.createContainers().then((function(containers) {
      return $__0.setupContainers(containers);
    }));
  },
  destroy: function() {
    _(this.containers).each((function(container) {
      return container.destroy();
    }));
    this.$el.remove();
  },
  exit: function() {
    this.updateSize();
    this.mediaControl.show();
  },
  setMediaControlContainer: function(container) {
    this.mediaControl.setContainer(container);
    this.mediaControl.render();
  },
  disableMediaControl: function() {
    this.mediaControl.disable();
    this.$el.removeClass('nocursor');
  },
  enableMediaControl: function() {
    this.mediaControl.enable();
  },
  removeContainer: function(container) {
    console.log('container being removed');
    this.stopListening(container);
    this.containers = _.without(this.containers, container);
  },
  appendContainer: function(container) {
    this.listenTo(container, 'container:destroyed', this.removeContainer);
    this.el.appendChild(container.render().el);
    this.containers.push(container);
  },
  prependContainer: function(container) {
    this.listenTo(container, 'container:destroyed', this.removeContainer);
    this.$el.append(container.render().el);
    this.containers.unshift(container);
  },
  setupContainers: function(containers) {
    _.map(containers, this.appendContainer, this);
    this.setupMediaControl(this.getCurrentContainer());
    this.render();
    this.$el.appendTo(this.parentElement);
    return containers;
  },
  createContainer: function(source) {
    var container = this.containerFactory.createContainer(source);
    this.appendContainer(container);
    return container;
  },
  setupMediaControl: function(container) {
    var params = _.extend({container: container}, this.params);
    if (this.mediaControl) {
      this.mediaControl.setContainer(container);
    } else {
      this.mediaControl = new MediaControl(_.extend({container: container}, this.params));
      this.listenTo(this.mediaControl, 'mediacontrol:fullscreen', this.toggleFullscreen);
      this.listenTo(this.mediaControl, 'mediacontrol:show', this.onMediaControlShow.bind(this, true));
      this.listenTo(this.mediaControl, 'mediacontrol:hide', this.onMediaControlShow.bind(this, false));
    }
  },
  getCurrentContainer: function() {
    return this.containers[0];
  },
  toggleFullscreen: function() {
    if (!Fullscreen.isFullscreen()) {
      Fullscreen.requestFullscreen(this.el);
      this.$el.addClass('fullscreen');
    } else {
      Fullscreen.cancelFullscreen();
      this.$el.removeClass('fullscreen nocursor');
    }
    this.mediaControl.show();
  },
  showMediaControl: function(event) {
    this.mediaControl.show(event);
  },
  hideMediaControl: function(event) {
    this.mediaControl.hide(event);
  },
  onMediaControlShow: function(showing) {
    if (showing)
      this.$el.removeClass('nocursor');
    else if (Fullscreen.isFullscreen())
      this.$el.addClass('nocursor');
  },
  render: function() {
    var $__0 = this;
    var style = Styler.getStyleFor('core');
    this.$el.append(style);
    this.$el.append(this.mediaControl.render().el);
    this.$el.ready((function() {
      $__0.params.width = $__0.params.width || $__0.$el.width();
      $__0.params.height = $__0.params.height || $__0.$el.height();
      $__0.updateSize();
    }));
    return this;
  }
}, {}, UIObject);
module.exports = Core;


},{"../../base/styler":13,"../../base/ui_object":"8lqCAT","../../base/utils":18,"../container_factory":22,"../loader":27,"../media_control":29,"jquery":"HlZQrA","underscore":"ZKusGn"}],24:[function(require,module,exports){
"use strict";
module.exports = require('./core');


},{"./core":23}],25:[function(require,module,exports){
"use strict";
var _ = require('underscore');
var BaseObject = require('../../base/base_object');
var Core = require('../core');
var CoreFactory = BaseObject.extend({
  initialize: function(player, loader) {
    this.player = player;
    this.params = player.params;
    this.loader = loader;
  },
  create: function() {
    this.core = new Core(this.params);
    this.core.then(this.addCorePlugins.bind(this));
    return this.core;
  },
  addCorePlugins: function() {
    _.each(this.loader.globalPlugins, function(Plugin) {
      var plugin = new Plugin(this.core);
      this.core.addPlugin(plugin);
      this.setupExternalInterface(plugin);
    }, this);
    return this.core;
  },
  setupExternalInterface: function(plugin) {
    _.each(plugin.getExternalInterface(), function(value, key) {
      this.player[key] = value.bind(plugin);
    }, this);
  }
});
module.exports = CoreFactory;


},{"../../base/base_object":"2HNVgz","../core":24,"underscore":"ZKusGn"}],26:[function(require,module,exports){
"use strict";
module.exports = require('./core_factory');


},{"./core_factory":25}],27:[function(require,module,exports){
"use strict";
module.exports = require('./loader');


},{"./loader":28}],28:[function(require,module,exports){
"use strict";
var BaseObject = require('../../base/base_object');
var _ = require('underscore');
var HTML5VideoPlaybackPlugin = require('../../playbacks/html5_video');
var FlashVideoPlaybackPlugin = require('../../playbacks/flash_vod');
var HTML5AudioPlaybackPlugin = require('../../playbacks/html5_audio');
var HLSVideoPlaybackPlugin = require('../../playbacks/hls');
var SpinnerThreeBouncePlugin = require('../../plugins/spinner_three_bounce');
var StatsPlugin = require('../../plugins/stats');
var WaterMarkPlugin = require('../../plugins/watermark');
var PosterPlugin = require('../../plugins/poster');
var PipPlugin = require('../../plugins/pip');
var Sequence = require('../../plugins/sequence');
var Loader = BaseObject.extend({
  displayPlugins: {
    'sequence': Sequence,
    'pip': PipPlugin
  },
  initialize: function(params) {
    this.params = params;
    this.playbackPlugins = [FlashVideoPlaybackPlugin, HTML5VideoPlaybackPlugin, HTML5AudioPlaybackPlugin, HLSVideoPlaybackPlugin];
    this.containerPlugins = [SpinnerThreeBouncePlugin, WaterMarkPlugin, PosterPlugin, StatsPlugin];
    this.globalPlugins = [this.displayPlugins[this.params.displayType]];
    this.addExternalPlugins(params.plugins || []);
  },
  addExternalPlugins: function(plugins) {
    if (plugins.playback) {
      this.playbackPlugins = plugins.playback.concat(this.playbackPlugins);
    }
    if (plugins.container) {
      this.containerPlugins = plugins.container.concat(this.containerPlugins);
    }
    if (plugins.core) {
      this.globalPlugins = plugins.core.concat(this.globalPlugins);
    }
  },
  getPlugin: function(name) {
    return _.find(_.union(this.containerPlugins, this.playbackPlugins, this.globalPlugins), function(plugin) {
      return plugin.prototype.name === name;
    });
  }
});
module.exports = Loader;


},{"../../base/base_object":"2HNVgz","../../playbacks/flash_vod":34,"../../playbacks/hls":36,"../../playbacks/html5_audio":38,"../../playbacks/html5_video":40,"../../plugins/pip":45,"../../plugins/poster":47,"../../plugins/sequence":49,"../../plugins/spinner_three_bounce":52,"../../plugins/stats":54,"../../plugins/watermark":57,"underscore":"ZKusGn"}],29:[function(require,module,exports){
"use strict";
module.exports = require('./media_control');


},{"./media_control":30}],30:[function(require,module,exports){
"use strict";
var _ = require('underscore');
var $ = require('jquery');
var JST = require('../../base/jst');
var Styler = require('../../base/styler');
var UIObject = require('../../base/ui_object');
var Utils = require('../../base/utils');
var MediaControl = function MediaControl() {
  $traceurRuntime.defaultSuperCall(this, $MediaControl.prototype, arguments);
};
var $MediaControl = MediaControl;
($traceurRuntime.createClass)(MediaControl, {
  get name() {
    return 'MediaControl';
  },
  get attributes() {
    return {
      class: 'media-control',
      'data-media-control': ''
    };
  },
  get events() {
    return {
      'click [data-play]': 'play',
      'click [data-pause]': 'pause',
      'click [data-playpause]': 'togglePlayPause',
      'click [data-stop]': 'stop',
      'click [data-playstop]': 'togglePlayStop',
      'click [data-fullscreen]': 'toggleFullscreen',
      'click [data-seekbar]': 'seek',
      'click .bar-background[data-volume]': 'volume',
      'click .drawer-icon[data-volume]': 'toggleMute',
      'mouseover .drawer-container[data-volume]': 'showVolumeBar',
      'mouseleave .drawer-container[data-volume]': 'hideVolumeBar',
      'mousedown .bar-scrubber[data-seekbar]': 'startSeekDrag',
      'mousedown .bar-scrubber[data-volume]': 'startVolumeDrag',
      'mouseenter .media-control-layer[data-controls]': 'setKeepVisible',
      'mouseleave .media-control-layer[data-controls]': 'resetKeepVisible'
    };
  },
  get template() {
    return JST.media_control;
  },
  initialize: function(params) {
    var $__0 = this;
    this.params = params;
    this.container = params.container;
    this.keepVisible = false;
    this.addEventListeners();
    this.defaultSettings = {
      left: ['play', 'stop', 'pause'],
      right: ['volume'],
      default: ['position', 'seekbar', 'duration']
    };
    this.disabled = false;
    if (this.container.mediaControlDisabled || this.params.chromeless)
      this.disable();
    this.currentVolume = 100;
    $(document).bind('mouseup', (function(event) {
      return $__0.stopDrag(event);
    }));
    $(document).bind('mousemove', (function(event) {
      return $__0.updateDrag(event);
    }));
  },
  addEventListeners: function() {
    this.listenTo(this.container, 'container:play', this.changeTogglePlay);
    this.listenTo(this.container, 'container:playing', this.changeTogglePlay);
    this.listenTo(this.container, 'container:timeupdate', this.updateSeekBar);
    this.listenTo(this.container, 'container:progress', this.updateProgressBar);
    this.listenTo(this.container, 'container:settingsupdate', this.settingsUpdate);
    this.listenTo(this.container, 'container:highdefinitionupdate', this.highDefinitionUpdate);
    this.listenTo(this.container, 'container:mediacontrol:disable', this.disable);
    this.listenTo(this.container, 'container:mediacontrol:enable', this.enable);
    this.listenTo(this.container, 'container:ended', this.ended);
  },
  disable: function() {
    this.disabled = true;
    this.hide();
    this.$el.hide();
  },
  enable: function() {
    if (this.params.chromeless)
      return;
    this.disabled = false;
    this.show();
  },
  play: function() {
    this.container.play();
  },
  pause: function() {
    this.container.pause();
  },
  stop: function() {
    this.container.stop();
  },
  changeTogglePlay: function() {
    if (this.container.isPlaying()) {
      this.$playPauseToggle.removeClass('paused').addClass('playing');
      this.$playStopToggle.removeClass('stopped').addClass('playing');
    } else {
      this.$playPauseToggle.removeClass('playing').addClass('paused');
      this.$playStopToggle.removeClass('playing').addClass('stopped');
    }
  },
  onKeyDown: function(event) {
    if (event.keyCode === 32)
      this.togglePlayPause();
  },
  togglePlayPause: function() {
    if (this.container.isPlaying()) {
      this.container.pause();
    } else {
      this.container.play();
    }
    this.changeTogglePlay();
  },
  togglePlayStop: function() {
    if (this.container.isPlaying()) {
      this.container.stop();
    } else {
      this.container.play();
    }
    this.changeTogglePlay();
  },
  startSeekDrag: function(event) {
    this.draggingSeekBar = true;
    if (event) {
      event.preventDefault();
    }
  },
  startVolumeDrag: function(event) {
    this.draggingVolumeBar = true;
    if (event) {
      event.preventDefault();
    }
  },
  stopDrag: function(event) {
    if (this.draggingSeekBar) {
      this.seek(event);
    }
    this.draggingSeekBar = false;
    this.draggingVolumeBar = false;
  },
  updateDrag: function(event) {
    if (event) {
      event.preventDefault();
    }
    if (this.draggingSeekBar) {
      var offsetX = event.pageX - this.$seekBarContainer.offset().left;
      var pos = offsetX / this.$seekBarContainer.width() * 100;
      pos = Math.min(100, Math.max(pos, 0));
      this.setSeekPercentage(pos);
    } else if (this.draggingVolumeBar) {
      this.volume(event);
    }
  },
  volume: function(event) {
    var offsetY = event.pageY - this.$volumeBarContainer.offset().top;
    this.currentVolume = (1 - (offsetY / this.$volumeBarContainer.height())) * 100;
    this.currentVolume = Math.min(100, Math.max(this.currentVolume, 0));
    this.container.setVolume(this.currentVolume);
    this.setVolumeLevel(this.currentVolume);
  },
  toggleMute: function() {
    if (!!this.mute) {
      this.container.setVolume(this.currentVolume);
      this.setVolumeLevel(this.currentVolume);
      this.mute = false;
    } else {
      this.container.setVolume(0);
      this.setVolumeLevel(0);
      this.mute = true;
    }
  },
  toggleFullscreen: function() {
    this.trigger('mediacontrol:fullscreen', this.name);
  },
  setContainer: function(container) {
    this.stopListening(this.container);
    this.container = container;
    this.changeTogglePlay();
    this.addEventListeners();
    this.settingsUpdate();
    this.container.setVolume(this.currentVolume);
    if (this.container.mediaControlDisabled)
      this.disable();
  },
  showVolumeBar: function() {
    if (this.hideVolumeId) {
      clearTimeout(this.hideVolumeId);
    }
    this.$volumeBarContainer.show();
    this.$volumeBarContainer.removeClass('volume-bar-hide');
  },
  hideVolumeBar: function() {
    var $__0 = this;
    if (!this.$volumeBarContainer)
      return;
    if (this.hideVolumeId) {
      clearTimeout(this.hideVolumeId);
    }
    this.hideVolumeId = setTimeout((function() {
      $__0.$volumeBarContainer.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', (function() {
        $__0.$volumeBarContainer.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        $__0.$volumeBarContainer.hide();
      }));
      $__0.$volumeBarContainer.addClass('volume-bar-hide');
    }), 750);
  },
  ended: function() {
    this.changeTogglePlay();
  },
  updateProgressBar: function(startPosition, endPosition, duration) {
    var loadedStart = startPosition / duration * 100;
    var loadedEnd = endPosition / duration * 100;
    this.$seekBarLoaded.css({
      left: loadedStart + '%',
      width: (loadedEnd - loadedStart) + '%'
    });
  },
  updateSeekBar: function(position, duration) {
    if (this.draggingSeekBar)
      return;
    var seekbarValue = (100 / duration) * position;
    this.setSeekPercentage(seekbarValue);
    this.$('[data-position]').html(Utils.formatTime(position));
    this.$('[data-duration]').html(Utils.formatTime(duration));
  },
  seek: function(event) {
    var offsetX = event.pageX - this.$seekBarContainer.offset().left;
    var pos = offsetX / this.$seekBarContainer.width() * 100;
    pos = Math.min(100, Math.max(pos, 0));
    this.container.setCurrentTime(pos);
  },
  setKeepVisible: function() {
    this.keepVisible = true;
  },
  resetKeepVisible: function() {
    this.keepVisible = false;
  },
  show: function(event) {
    var $__0 = this;
    if (this.disabled)
      return;
    var timeout = 2000;
    if (!event || (event.clientX !== this.lastMouseX && event.clientY !== this.lastMouseY) || navigator.userAgent.match(/firefox/i)) {
      if (this.hideId) {
        clearTimeout(this.hideId);
      }
      this.$el.show();
      this.trigger('mediacontrol:show', this.name);
      this.$el.removeClass('media-control-hide');
      this.hideId = setTimeout((function() {
        return $__0.hide();
      }), timeout);
      if (event) {
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
      }
    }
  },
  hide: function() {
    var $__0 = this;
    var timeout = 2000;
    if (this.hideId) {
      clearTimeout(this.hideId);
    }
    if (this.keepVisible || this.draggingVolumeBar || this.draggingSeekBar) {
      this.hideId = setTimeout((function() {
        return $__0.hide();
      }), timeout);
    } else {
      if (this.$volumeBarContainer) {
        this.$volumeBarContainer.hide();
      }
      this.trigger('mediacontrol:hide', this.name);
      this.$el.addClass('media-control-hide');
    }
  },
  settingsUpdate: function() {
    this.render();
  },
  highDefinitionUpdate: function() {
    var $element = this.$el.find('button[data-hd]');
    $element.removeClass('enabled');
    if (this.container.isHighDefinitionInUse()) {
      $element.addClass('enabled');
    }
  },
  createCachedElements: function() {
    this.$playPauseToggle = this.$el.find('button.media-control-button[data-playpause]');
    this.$playStopToggle = this.$el.find('button.media-control-button[data-playstop]');
    this.$seekBarContainer = this.$el.find('.bar-container[data-seekbar]');
    this.$seekBarLoaded = this.$el.find('.bar-fill-1[data-seekbar]');
    this.$seekBarPosition = this.$el.find('.bar-fill-2[data-seekbar]');
    this.$seekBarScrubber = this.$el.find('.bar-scrubber[data-seekbar]');
    this.$volumeBarContainer = this.$el.find('.bar-container[data-volume]');
    this.$volumeBarBackground = this.$el.find('.bar-background[data-volume]');
    this.$volumeBarFill = this.$el.find('.bar-fill-1[data-volume]');
    this.$volumeBarScrubber = this.$el.find('.bar-scrubber[data-volume]');
    this.$volumeIcon = this.$el.find('.drawer-icon[data-volume]');
  },
  setVolumeLevel: function(value) {
    var containerHeight = this.$volumeBarContainer.height();
    var barHeight = this.$volumeBarBackground.height();
    var offset = (containerHeight - barHeight) / 2.0;
    var pos = barHeight * value / 100.0 - this.$volumeBarScrubber.height() / 2.0 + offset;
    this.$volumeBarFill.css({height: value + '%'});
    this.$volumeBarScrubber.css({bottom: pos});
    if (value > 0) {
      this.$volumeIcon.removeClass('muted');
    } else {
      this.$volumeIcon.addClass('muted');
    }
  },
  setSeekPercentage: function(value) {
    var pos = this.$seekBarContainer.width() * value / 100.0 - this.$seekBarScrubber.width() / 2.0;
    this.$seekBarPosition.css({width: value + '%'});
    this.$seekBarScrubber.css({left: pos});
  },
  bindKeyEvents: function() {
    var $__0 = this;
    if (this.keydownHandlerFn) {
      $(document).unbind('keydown', this.keydownHandlerFn);
    } else {
      this.keydownHandlerFn = (function(event) {
        return $__0.onKeyDown(event);
      });
    }
    if (this.$playPauseToggle.length > 0) {
      $(document).bind('keydown', this.keydownHandlerFn);
    }
  },
  render: function() {
    var $__0 = this;
    var timeout = 1000;
    var style = Styler.getStyleFor('media_control');
    var settings = _.isEmpty(this.container.settings) ? this.defaultSettings : this.container.settings;
    this.$el.html(this.template({settings: settings}));
    this.$el.append(style);
    this.createCachedElements();
    this.$playPauseToggle.addClass('paused');
    this.$playStopToggle.addClass('stopped');
    this.currentVolume = this.currentVolume || 100;
    this.$volumeBarContainer.hide();
    if (this.params.autoPlay) {
      this.togglePlayPause();
      this.togglePlayStop();
    }
    this.changeTogglePlay();
    this.hideId = setTimeout((function() {
      return $__0.hide();
    }), timeout);
    if (this.disabled)
      this.hide();
    this.$el.ready((function() {
      $__0.setVolumeLevel($__0.currentVolume);
      $__0.setSeekPercentage(0);
      $__0.bindKeyEvents();
    }));
    return this;
  }
}, {}, UIObject);
module.exports = MediaControl;


},{"../../base/jst":10,"../../base/styler":13,"../../base/ui_object":"8lqCAT","../../base/utils":18,"jquery":"HlZQrA","underscore":"ZKusGn"}],31:[function(require,module,exports){
"use strict";
var Events = require('../base/events');
var events = new Events();
var Mediator = function Mediator() {};
($traceurRuntime.createClass)(Mediator, {}, {});
Mediator.on = function(name, callback, context) {
  events.on(name, callback, context);
  return;
};
Mediator.once = function(name, callback, context) {
  events.once(name, callback, context);
  return;
};
Mediator.off = function(name, callback, context) {
  events.off(name, callback, context);
  return;
};
Mediator.trigger = function(name, opts) {
  events.trigger(name, opts);
  return;
};
Mediator.stopListening = function(obj, name, callback) {
  events.stopListening(obj, name, callback);
  return;
};
module.exports = Mediator;


},{"../base/events":9}],32:[function(require,module,exports){
(function (global){
"use strict";
var BaseObject = require('./base/base_object');
var CoreFactory = require('./components/core_factory');
var Loader = require('./components/loader');
var Mediator = require('./components/mediator');
var Player = function Player() {
  $traceurRuntime.defaultSuperCall(this, $Player.prototype, arguments);
};
var $Player = Player;
($traceurRuntime.createClass)(Player, {
  initialize: function(params) {
    window.p = this;
    params.displayType || (params.displayType = 'pip');
    this.params = params;
    this.loader = new Loader(this.params);
    this.coreFactory = new CoreFactory(this, this.loader);
  },
  attachTo: function(element) {
    this.params.parentElement = element;
    this.core = this.coreFactory.create();
  },
  load: function(sources) {
    this.core.load(sources);
  },
  destroy: function() {
    this.core.destroy();
  }
}, {}, BaseObject);
global.DEBUG = false;
window.WP3 = {
  Player: Player,
  Mediator: Mediator
};
module.exports = window.WP3;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./base/base_object":"2HNVgz","./components/core_factory":26,"./components/loader":27,"./components/mediator":31}],33:[function(require,module,exports){
"use strict";
var UIObject = require('../../base/ui_object');
var Styler = require('../../base/styler');
var JST = require('../../base/jst');
var Mediator = require('../../components/mediator');
var _ = require('underscore');
var $ = require('jquery');
var objectIE = '<object type="application/x-shockwave-flash" id="<%= cid %>" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" data-flash-vod=""><param name="movie" value="<%= swfPath %>"> <param name="quality" value="autohigh"> <param name="swliveconnect" value="true"> <param name="allowScriptAccess" value="always"> <param name="bgcolor" value="#001122"> <param name="allowFullScreen" value="false"> <param name="wmode" value="gpu"> <param name="tabindex" value="1"> </object>';
var FlashVOD = function FlashVOD() {
  $traceurRuntime.defaultSuperCall(this, $FlashVOD.prototype, arguments);
};
var $FlashVOD = FlashVOD;
($traceurRuntime.createClass)(FlashVOD, {
  get name() {
    return 'flash_vod';
  },
  get tagName() {
    return 'object';
  },
  get template() {
    return JST.flash_vod;
  },
  initialize: function(options) {
    $traceurRuntime.superCall(this, $FlashVOD.prototype, "initialize", [options]);
    this.src = options.src;
    this.swfPath = options.swfPath || "assets/Player.swf";
    this.autoPlay = options.autoPlay;
    this.settings = {
      left: ["playpause", "position", "duration"],
      default: ["seekbar"],
      right: ["fullscreen", "volume"]
    };
    this.isReady = false;
    this.addListeners();
  },
  safe: function(fn) {
    if (this.el.getState && this.el.getDuration && this.el.getPosition && this.el.getBytesLoaded && this.el.getBytesTotal) {
      return fn.apply(this);
    }
  },
  bootstrap: function() {
    this.el.width = "100%";
    this.el.height = "100%";
    this.isReady = true;
    this.trigger('playback:ready', this.name);
    this.currentState = "IDLE";
    this.autoPlay && this.play();
    $('<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" />').insertAfter(this.$el);
  },
  setupFirefox: function() {
    var $el = this.$('embed');
    $el.attr('data-flash-vod', '');
    this.setElement($el[0]);
  },
  getPlaybackType: function() {
    return "vod";
  },
  updateTime: function() {
    var $__0 = this;
    this.safe((function() {
      $__0.trigger('playback:timeupdate', $__0.el.getPosition(), $__0.el.getDuration(), $__0.name);
    }));
  },
  addListeners: function() {
    var $__0 = this;
    Mediator.on(this.uniqueId + ':progress', (function() {
      return $__0.progress();
    }));
    Mediator.on(this.uniqueId + ':timeupdate', (function() {
      return $__0.updateTime();
    }));
    Mediator.on(this.uniqueId + ':statechanged', (function() {
      return $__0.checkState();
    }));
    Mediator.on(this.uniqueId + ':flashready', (function() {
      return $__0.bootstrap();
    }));
  },
  stopListening: function() {
    $traceurRuntime.superCall(this, $FlashVOD.prototype, "stopListening", []);
    Mediator.off(this.uniqueId + ':progress');
    Mediator.off(this.uniqueId + ':timeupdate');
    Mediator.off(this.uniqueId + ':statechanged');
  },
  checkState: function() {
    var $__0 = this;
    this.safe((function() {
      if ($__0.currentState !== "PLAYING_BUFFERING" && $__0.el.getState() === "PLAYING_BUFFERING") {
        $__0.trigger('playback:buffering', $__0.name);
        $__0.currentState = "PLAYING_BUFFERING";
      } else if ($__0.currentState === "PLAYING_BUFFERING" && $__0.el.getState() === "PLAYING") {
        $__0.trigger('playback:bufferfull', $__0.name);
        $__0.currentState = "PLAYING";
      } else if ($__0.el.getState() === "IDLE") {
        $__0.currentState = "IDLE";
      } else if ($__0.el.getState() === "ENDED") {
        $__0.trigger('playback:ended', $__0.name);
        $__0.trigger('playback:timeupdate', 0, $__0.el.getDuration(), $__0.name);
        $__0.currentState = "ENDED";
      }
    }));
  },
  progress: function() {
    var $__0 = this;
    this.safe((function() {
      if ($__0.currentState !== "IDLE" && $__0.currentState !== "ENDED") {
        $__0.trigger('playback:progress', 0, $__0.el.getBytesLoaded(), $__0.el.getBytesTotal(), $__0.name);
      }
    }));
  },
  firstPlay: function() {
    var $__0 = this;
    this.safe((function() {
      $__0.currentState = "PLAYING";
      $__0.el.playerPlay($__0.src);
    }));
  },
  play: function() {
    var $__0 = this;
    this.safe((function() {
      if ($__0.el.getState() === 'PAUSED') {
        $__0.currentState = "PLAYING";
        $__0.el.playerResume();
      } else if ($__0.el.getState() !== 'PLAYING') {
        $__0.firstPlay();
      }
      $__0.trigger('playback:play', $__0.name);
    }));
  },
  volume: function(value) {
    var $__0 = this;
    this.safe((function() {
      $__0.el.playerVolume(value);
    }));
  },
  pause: function() {
    var $__0 = this;
    this.safe((function() {
      $__0.currentState = "PAUSED";
      $__0.el.playerPause();
    }));
  },
  stop: function() {
    var $__0 = this;
    this.safe((function() {
      $__0.el.playerStop();
      $__0.trigger('playback:timeupdate', 0, $__0.name);
    }));
  },
  isPlaying: function() {
    return !!(this.isReady && this.currentState == "PLAYING");
  },
  getDuration: function() {
    var $__0 = this;
    return this.safe((function() {
      return $__0.el.getDuration();
    }));
  },
  seek: function(time) {
    var $__0 = this;
    this.safe((function() {
      var seekTo = $__0.el.getDuration() * (time / 100);
      $__0.el.playerSeek(seekTo);
      $__0.trigger('playback:timeupdate', seekTo, $__0.el.getDuration(), $__0.name);
      if ($__0.currentState == "PAUSED") {
        $__0.pause();
      }
    }));
  },
  destroy: function() {
    clearInterval(this.bootstrapId);
    this.stopListening();
    this.$el.remove();
  },
  setupIE: function() {
    this.setElement($(_.template(objectIE)({
      cid: this.cid,
      swfPath: this.swfPath
    })));
  },
  render: function() {
    var style = Styler.getStyleFor(this.name);
    this.$el.html(this.template({
      cid: this.cid,
      swfPath: this.swfPath,
      playbackId: this.uniqueId
    }));
    if (navigator.userAgent.match(/firefox/i)) {
      this.setupFirefox();
    } else if (window.ActiveXObject) {
      this.setupIE();
    }
    this.$el.append(style);
    return this;
  }
}, {}, UIObject);
FlashVOD.canPlay = function(resource) {
  if (navigator.userAgent.match(/firefox/i) || window.ActiveXObject) {
    return _.isString(resource) && !!resource.match(/(.*).(mp4|mov|f4v|3gpp|3gp)/);
  } else {
    return _.isString(resource) && !!resource.match(/(.*).(mov|f4v|3gpp|3gp)/);
  }
};
module.exports = FlashVOD;


},{"../../base/jst":10,"../../base/styler":13,"../../base/ui_object":"8lqCAT","../../components/mediator":31,"jquery":"HlZQrA","underscore":"ZKusGn"}],34:[function(require,module,exports){
"use strict";
module.exports = require('./flash_vod');


},{"./flash_vod":33}],35:[function(require,module,exports){
"use strict";
var UIPlugin = require('../../base/ui_plugin');
var Styler = require('../../base/styler');
var JST = require('../../base/jst');
var _ = require("underscore");
var Mediator = require('../../components/mediator');
var Visibility = require('visibility');
var objectIE = '<object type="application/x-shockwave-flash" id="<%= cid %>" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" data-hls=""><param name="movie" value="<%= swfPath %>"> <param name="quality" value="autohigh"> <param name="swliveconnect" value="true"> <param name="allowScriptAccess" value="always"> <param name="bgcolor" value="#001122"> <param name="allowFullScreen" value="false"> <param name="wmode" value="transparent"> <param name="tabindex" value="1"> </object>';
var HLS = function HLS() {
  $traceurRuntime.defaultSuperCall(this, $HLS.prototype, arguments);
};
var $HLS = HLS;
($traceurRuntime.createClass)(HLS, {
  get name() {
    return 'hls';
  },
  get tagName() {
    return 'object';
  },
  get template() {
    return JST.hls;
  },
  get attributes() {
    return {
      'data-hls': '',
      'type': 'application/x-shockwave-flash'
    };
  },
  initialize: function(options) {
    $traceurRuntime.superCall(this, $HLS.prototype, "initialize", [options]);
    this.src = options.src;
    this.swfPath = options.swfPath || "assets/HLSPlayer.swf";
    this.setupBrowser();
    this.setupVisibility();
    this.highDefinition = false;
    this.autoPlay = options.autoPlay;
    this.defaultSettings = {
      left: ["playstop"],
      default: [],
      right: ["fullscreen", "volume", "hd"]
    };
    this.settings = _.extend({}, this.defaultSettings);
    this.addListeners();
  },
  setupBrowser: function() {
    this.isLegacyIE = window.ActiveXObject;
    this.isChrome = navigator.userAgent.match(/chrome/i);
    this.isFirefox = navigator.userAgent.match(/firefox/i);
    this.isSafari = navigator.userAgent.match(/safari/i);
  },
  setupVisibility: function() {
    var $__0 = this;
    this.visibility = new Visibility();
    this.visibility.on('show', (function() {
      return $__0.visibleCallback();
    }));
    this.visibility.on('hide', (function() {
      return $__0.hiddenCallback();
    }));
  },
  addListeners: function() {
    var $__0 = this;
    Mediator.on(this.uniqueId + ':flashready', (function() {
      return $__0.bootstrap();
    }));
    Mediator.on(this.uniqueId + ':timeupdate', (function(params) {
      return $__0.updateTime(params);
    }));
    Mediator.on(this.uniqueId + ':playbackstate', (function(params) {
      return $__0.setPlaybackState(params);
    }));
    Mediator.on(this.uniqueId + ':highdefinition', (function(params) {
      return $__0.updateHighDefinition(params);
    }));
  },
  stopListening: function() {
    $traceurRuntime.superCall(this, $HLS.prototype, "stopListening", []);
    Mediator.off(this.uniqueId + ':flashready');
    Mediator.off(this.uniqueId + ':timeupdate');
    Mediator.off(this.uniqueId + ':playbackstate');
    Mediator.off(this.uniqueId + ':highdefinition');
  },
  safe: function(fn) {
    if (this.el.globoGetState && this.el.globoGetDuration && this.el.globoGetPosition && this.el.globoPlayerSmoothSetLevel && this.el.globoPlayerSetflushLiveURLCache) {
      return fn.apply(this);
    }
  },
  hiddenCallback: function() {
    var $__0 = this;
    this.hiddenId = this.safe((function() {
      return setTimeout((function() {
        return $__0.el.globoPlayerSmoothSetLevel(0);
      }), 10000);
    }));
  },
  visibleCallback: function() {
    var $__0 = this;
    this.safe((function() {
      if ($__0.hiddenId) {
        clearTimeout($__0.hiddenId);
      }
      if (!$__0.el.globoGetAutoLevel()) {
        $__0.el.globoPlayerSmoothSetLevel(-1);
      }
    }));
  },
  bootstrap: function() {
    this.el.width = "100%";
    this.el.height = "100%";
    this.trigger('playback:ready', this.name);
    this.currentState = "IDLE";
    this.el.globoPlayerSetflushLiveURLCache(true);
    this.autoPlay && this.play();
  },
  updateHighDefinition: function(params) {
    this.highDefinition = params.isHD;
    this.trigger('playback:highdefinitionupdate');
  },
  updateTime: function(params) {
    var $__0 = this;
    return this.safe((function() {
      var previousDvrEnabled = $__0.dvrEnabled;
      $__0.dvrEnabled = ($__0.playbackType === 'live' && params.duration > 240);
      var duration = $__0.getDuration();
      if ($__0.playbackType === 'live') {
        var position = $__0.el.globoGetPosition();
        if (position >= duration) {
          position = duration;
        }
        $__0.trigger('playback:timeupdate', position, duration, $__0.name);
      } else {
        $__0.trigger('playback:timeupdate', $__0.el.globoGetPosition(), duration, $__0.name);
      }
      if ($__0.dvrEnabled != previousDvrEnabled) {
        $__0.updateSettings();
      }
    }));
  },
  play: function() {
    var $__0 = this;
    this.safe((function() {
      if ($__0.el.currentState === 'PAUSED') {
        $__0.el.globoPlayerResume();
      } else {
        $__0.firstPlay();
      }
      $__0.trigger('playback:play', $__0.name);
    }));
  },
  getPlaybackType: function() {
    if (this.playbackType)
      return this.playbackType;
    return null;
  },
  getCurrentBitrate: function() {
    return this.safe(function() {
      var currentLevel = this.getLevels()[this.el.globoGetLevel()];
      return currentLevel.bitrate;
    });
  },
  getLastProgramDate: function() {
    var programDate = this.el.globoGetLastProgramDate();
    return programDate - 1.08e+7;
  },
  isHighDefinition: function() {
    return this.highDefinition;
  },
  getLevels: function() {
    var $__0 = this;
    return this.safe((function() {
      if (!$__0.levels || $__0.levels.length === 0) {
        $__0.levels = $__0.el.globoGetLevels();
      }
      return $__0.levels;
    }));
  },
  setPlaybackState: function(params) {
    if (params.state === "PLAYING_BUFFERING" && this.el.globoGetbufferLength() < 1 && this.currentState !== "PLAYING_BUFFERING") {
      this.trigger('playback:buffering', this.name);
    } else if (params.state === "PLAYING" && this.currentState === "PLAYING_BUFFERING") {
      this.trigger('playback:bufferfull', this.name);
    } else if (params.state === "IDLE") {
      this.trigger('playback:ended', this.name);
      this.trigger('playback:timeupdate', 0, this.el.globoGetDuration(), this.name);
    }
    this.currentState = params.state;
    this.updatePlaybackType();
  },
  updatePlaybackType: function() {
    var $__0 = this;
    this.safe((function() {
      if (!$__0.playbackType) {
        $__0.playbackType = $__0.el.globoGetType();
        if ($__0.playbackType) {
          $__0.playbackType = $__0.playbackType.toLowerCase();
          $__0.updateSettings();
        }
      }
    }));
  },
  firstPlay: function() {
    var $__0 = this;
    this.safe((function() {
      $__0.el.globoPlayerLoad($__0.src);
      $__0.el.globoPlayerPlay();
    }));
  },
  volume: function(value) {
    var $__0 = this;
    this.safe((function() {
      $__0.el.globoPlayerVolume(value);
    }));
  },
  pause: function() {
    var $__0 = this;
    this.safe((function() {
      $__0.el.globoPlayerPause();
    }));
  },
  stop: function() {
    var $__0 = this;
    this.safe((function() {
      $__0.el.globoPlayerStop();
      $__0.trigger('playback:timeupdate', 0, $__0.name);
    }));
  },
  isPlaying: function() {
    var $__0 = this;
    return this.safe((function() {
      if ($__0.currentState)
        return !!($__0.currentState.match(/playing/i));
      return false;
    }));
  },
  getDuration: function() {
    var $__0 = this;
    return this.safe((function() {
      var duration = $__0.el.globoGetDuration();
      if ($__0.playbackType === 'live') {
        duration = duration - 10;
      }
      return duration;
    }));
  },
  seek: function(time) {
    var $__0 = this;
    this.safe((function() {
      if (time < 0) {
        $__0.el.globoPlayerSeek(time);
      } else {
        var duration = $__0.getDuration();
        time = duration * time / 100;
        if ($__0.playbackType === 'live' && duration - time < 2)
          time = -1;
        $__0.el.globoPlayerSeek(time);
      }
    }));
  },
  isPip: function(pipStatus) {
    if (pipStatus == true && this.getCurrentBitrate() > 750000) {
      this.el.globoPlayerSetStageScaleMode("exactFit");
      this.el.globoPlayerSmoothSetLevel(2);
    } else if (!this.el.globoGetAutoLevel()) {
      this.el.globoPlayerSetStageScaleMode("noScale");
      this.el.globoPlayerSetLevel(-1);
    }
  },
  timeUpdate: function(time, duration) {
    this.trigger('playback:timeupdate', time, duration, this.name);
  },
  destroy: function() {
    this.stopListening();
    this.$el.remove();
  },
  setupFirefox: function() {
    var $el = this.$('embed');
    $el.attr('data-hls', '');
    this.setElement($el[0]);
  },
  setupIE: function() {
    this.setElement($(_.template(objectIE)({
      cid: this.cid,
      swfPath: this.swfPath
    })));
  },
  updateSettings: function() {
    this.settings = _.extend({}, this.defaultSettings);
    if (this.playbackType === "vod" || this.dvrEnabled) {
      this.settings.left = ["playpause", "position", "duration"];
      this.settings.default = ["seekbar"];
    }
    this.trigger('playback:settingsupdate', this.name);
  },
  render: function() {
    var style = Styler.getStyleFor(this.name);
    this.$el.html(this.template({
      cid: this.cid,
      swfPath: this.swfPath,
      playbackId: this.uniqueId
    }));
    this.$el.append(style);
    this.el.id = this.cid;
    if (this.isFirefox) {
      this.setupFirefox();
    } else if (this.isLegacyIE) {
      this.setupIE();
    }
    return this;
  }
}, {}, UIPlugin);
HLS.canPlay = function(resource) {
  return !!resource.match(/^http(.*).m3u8/);
};
module.exports = HLS;


},{"../../base/jst":10,"../../base/styler":13,"../../base/ui_plugin":"Z7u8cr","../../components/mediator":31,"underscore":"ZKusGn","visibility":5}],36:[function(require,module,exports){
"use strict";
module.exports = require('./hls');


},{"./hls":35}],37:[function(require,module,exports){
"use strict";
var UIPlugin = require('../../base/ui_plugin');
var HTML5Audio = function HTML5Audio() {
  $traceurRuntime.defaultSuperCall(this, $HTML5Audio.prototype, arguments);
};
var $HTML5Audio = HTML5Audio;
($traceurRuntime.createClass)(HTML5Audio, {
  get name() {
    return 'html5_audio';
  },
  get type() {
    return 'playback';
  },
  get tagName() {
    return 'audio';
  },
  get events() {
    return {
      'timeupdate': 'timeUpdated',
      'ended': 'ended'
    };
  },
  initialize: function(options) {
    this.el.src = options.src;
    this.render();
  },
  setContainer: function() {
    this.container.settings = {
      left: ['playpause'],
      right: ['volume'],
      default: ['position', 'seekbar', 'duration']
    };
    this.render();
    this.params.autoPlay && this.play();
  },
  bindEvents: function() {
    this.listenTo(this.container, 'container:play', this.play);
    this.listenTo(this.container, 'container:pause', this.pause);
    this.listenTo(this.container, 'container:seek', this.seek);
    this.listenTo(this.container, 'container:volume', this.volume);
    this.listenTo(this.container, 'container:stop', this.stop);
  },
  play: function() {
    this.el.play();
  },
  pause: function() {
    this.el.pause();
  },
  stop: function() {
    this.pause();
    this.el.currentTime = 0;
  },
  volume: function(value) {
    this.el.volume = value / 100;
  },
  mute: function() {
    this.el.volume = 0;
  },
  unmute: function() {
    this.el.volume = 1;
  },
  isMuted: function() {
    return !!this.el.volume;
  },
  ended: function() {
    this.trigger('container:timeupdate', 0);
  },
  seek: function(seekBarValue) {
    var time = this.el.duration * (seekBarValue / 100);
    this.el.currentTime = time;
  },
  getCurrentTime: function() {
    return this.el.currentTime;
  },
  getDuration: function() {
    return this.el.duration;
  },
  timeUpdated: function() {
    this.container.timeUpdated(this.el.currentTime, this.el.duration);
  },
  render: function() {
    this.container.$el.append(this.el);
    return this;
  }
}, {}, UIPlugin);
HTML5Audio.canPlay = function(resource) {
  return !!resource.match(/(.*).mp3/);
};
module.exports = HTML5Audio;


},{"../../base/ui_plugin":"Z7u8cr"}],38:[function(require,module,exports){
"use strict";
module.exports = require('./html5_audio');


},{"./html5_audio":37}],39:[function(require,module,exports){
"use strict";
var UIPlugin = require('../../base/ui_plugin');
var Styler = require('../../base/styler');
var HTML5Video = function HTML5Video() {
  $traceurRuntime.defaultSuperCall(this, $HTML5Video.prototype, arguments);
};
var $HTML5Video = HTML5Video;
($traceurRuntime.createClass)(HTML5Video, {
  get name() {
    return 'html5_video';
  },
  get type() {
    return 'playback';
  },
  get tagName() {
    return 'video';
  },
  get attributes() {
    return {'data-html5-video': ''};
  },
  get events() {
    return {
      'timeupdate': 'timeUpdated',
      'progress': 'progress',
      'ended': 'ended',
      'playing': 'playing',
      'stalled': 'buffering',
      'waiting': 'buffering',
      'canplaythrough': 'bufferFull',
      'loadedmetadata': 'loadedMetadata'
    };
  },
  initialize: function(options) {
    this.options = options;
    this.src = options.src;
    this.el.src = options.src;
    this.el.loop = options.loop;
    this.settings = {
      left: ['playpause', 'position', 'duration'],
      right: ['fullscreen', 'volume'],
      default: ['seekbar']
    };
  },
  loadedMetadata: function(e) {
    this.trigger('playback:loadedmetadata', e.target.duration);
  },
  play: function() {
    this.el.play();
  },
  pause: function() {
    this.el.pause();
  },
  stop: function() {
    this.pause();
    if (this.el.readyState !== 0) {
      this.el.currentTime = 0;
    }
  },
  volume: function(value) {
    this.el.volume = value / 100;
  },
  mute: function() {
    this.el.volume = 0;
  },
  unmute: function() {
    this.el.volume = 1;
  },
  isMuted: function() {
    return !!this.el.volume;
  },
  isPlaying: function() {
    return !this.el.paused && !this.el.ended;
  },
  ended: function() {
    this.trigger('playback:ended', this.name);
    this.trigger('playback:timeupdate', 0, this.el.duration, this.name);
  },
  buffering: function() {
    this.trigger('playback:buffering', this.name);
  },
  bufferFull: function() {
    this.trigger('playback:bufferfull', this.name);
  },
  destroy: function() {
    this.stop();
    this.el.src = '';
    this.$el.remove();
  },
  seek: function(seekBarValue) {
    var time = this.el.duration * (seekBarValue / 100);
    this.el.currentTime = time;
  },
  getCurrentTime: function() {
    return this.el.currentTime;
  },
  getDuration: function() {
    return this.el.duration;
  },
  timeUpdated: function() {
    this.trigger('playback:timeupdate', this.el.currentTime, this.el.duration, this.name);
  },
  progress: function() {
    if (!this.el.buffered.length)
      return;
    var bufferedPos = 0;
    for (var i = 0; i < this.el.buffered.length; i++) {
      if (this.el.currentTime >= this.el.buffered.start(i) && this.el.currentTime <= this.el.buffered.end(i)) {
        bufferedPos = i;
        break;
      }
    }
    this.trigger('playback:progress', this.el.buffered.start(bufferedPos), this.el.buffered.end(bufferedPos), this.el.duration, this.name);
  },
  playing: function() {
    this.trigger('playback:play', this.name);
  },
  render: function() {
    var style = Styler.getStyleFor(this.name);
    this.$el.append(style);
    this.trigger('playback:ready', this.name);
    this.options.autoPlay && this.play();
    return this;
  }
}, {}, UIPlugin);
HTML5Video.canPlay = function(resource) {
  return !!resource.match(/(.*).mp4/);
};
module.exports = HTML5Video;


},{"../../base/styler":13,"../../base/ui_plugin":"Z7u8cr"}],40:[function(require,module,exports){
"use strict";
module.exports = require('./html5_video');


},{"./html5_video":39}],41:[function(require,module,exports){
"use strict";
module.exports = require('./loading');


},{"./loading":42}],42:[function(require,module,exports){
"use strict";
var UIObject = require('../../base/ui_object');
var _ = require('underscore');
var defaultImage = "data:image/gif;base64,R0lGODlhGQAZAPMAAP////f39+/v7+bm5t7e3tbW1szMzMXFxb29vbW1ta2traWlpZmZmYyMjISEhHNzcyH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCAAQACwAAAAAGQAZAAAFjCAkjiTkPE6pqssyPvBIECu5MIwLwY881yMcQ8QTzX5AiNBVPNJWiUQQt4sdSU9IQsEV3XA8p/Gq5XKlOB3k6kSKzN1aOzvaxldiYBToHhX+gAVJa3OBgINzBIZ/iHMqfSWQkWR4lFh5lZiOlGxtY0iJeZpZnTSWdJc/paiZn5+sqU+ckpM+pLBJlishACH5BAUIABAALAAAAAAUAA4AAAVRICSOJLQwS6lCSTIy8Og4aqIoLgQz4/PQpZtCtBP5fiqhq+g4jgqEkVAXc4oK2ILIhts1fc8sFnLLQb4qsXbFFrPfkDEcQqjbo3P6vZ7X7/shACH5BAUIABAALAEAAAAXAAsAAAVQICSOZKIkZKoSxai847KoY2G30KuMDDPTkJtIJ+r5gEEhcWFckZSw5sgBIVgJoltBx+yJHI+H43pN4iBdCDgsFpGxQHaYOiIj2fQVnAZOhQAAIfkEBQgAEAAsBQAAABQADgAABUogJI5FOZ4oRJCmmCQpIa9QWYyKAqOzaIs5Xaz3SwRTIqLpOFqcZgSbUQhhWJ2jnisHWVivyNQXHEaNy0gvuvxoux1rkXseh8zdIQAh+QQFCAAQACwLAAAADgAUAAAFSyAhQmRpQiJRFsWJjiTbmmksn7U80+NdJqSUjpRQKIArFqRoPLogTSPS1Zw+i08XY8tdPLngL3jrcjyypofagYao3+ysGd6mtyHxEAAh+QQFCAAQACwOAAEACwAXAAAFTiAkEoRonmR5jukKperamgVLikVetnlf074fMOeCEIsihXKZOC2fzqeiKVowkBCGdlHUerkQx+MBsX7DY4foDBmTTWD0GOlWF9NIh/0UAgAh+QQFCAAQACwLAAUADgAUAAAFTiAkjiRElCihoqPqnukLxysr1vZY7HzB9rwf0FdKJHIjhfKYUzqZowWDAUk4FceHVspYiJ4Q7QMypY6YYgjXTEqTp962dgQvudVx+RgZAgAh+QQFCAAQACwFAAsAFAAOAAAFUSAkjuRInChRrmKKsqt7wmRR0LRt46uul4+HY5RQKCC+ncgRfDCeRUVC5Bs1IU8GxHgc3ZbBYRYSna6u2KeIax4xhaLxWrpyDONqUaJNW+RpIQAh+QQFCAAQACwBAA4AFwALAAAFUiAkio4zniJBoKPzvOyoquhrx+lMu/YDMYzFqECE6FQ8H2QBZCiexKJxBimNmpCnAhI9rVBNRvbJ7eJ+QJFWFP2ymEE1mS2NLYTyLf3MSigSfCEAIfkEBQgAEAAsAAALABQADgAABU6g84wkZJ7oSa5pa66lK5/LMrsLo9+p7vOmnI8BUSgSJ4ISJSRCEkZFYapc0mymKGRagFRl0ON26v22tONumTBIhZHppBWVgMdN8xm3FQIAIfkEBQgAEAAsAAAFAA4AFAAABUsgBDmOaJ6i86woqq5P2ZowO6fwfZLtwvzAGXAoHP50p0QCmVA4dc7orBldFq5JKeR6JXhFShMX4iW0uAXyFzVWm09oUfmclq915RAAIfkECQgAEAAsAAAAABkAGQAABVwgJI5kaZ6j46Bs6TzP2s7wM9OwfI/LMtY7HmMoesGCkMVw6MshRUvik6SUTqm+Z0LB7V674OsWrLiaCgWzCI1Ws9vTd5tAR75F9Lo9jdeb8wRqEHmCgIKDgYdmIQA7";
var Loading = function Loading() {
  $traceurRuntime.defaultSuperCall(this, $Loading.prototype, arguments);
};
var $Loading = Loading;
($traceurRuntime.createClass)(Loading, {
  get template() {
    return _.template('<img src=<%= base64Image %> <h3> <%= message %> </h3>');
  },
  get defaultImage() {
    return defaultImage;
  },
  initialize: function(options) {
    this.message = options.message || '';
    this.base64Image = options.base64Image || this.defaultImage;
    this.customStyle = options.style || {};
  },
  show: function() {
    return this.$el.show().promise();
  },
  hide: function() {
    return this.$el.hide().promise();
  },
  render: function() {
    this.$el.css(this.customStyle);
    this.$el.html(this.template({
      base64Image: this.base64Image,
      message: this.message
    }));
    this.$el.hide();
    return this;
  }
}, {}, UIObject);
module.exports = Loading;


},{"../../base/ui_object":"8lqCAT","underscore":"ZKusGn"}],43:[function(require,module,exports){
"use strict";
module.exports = require('./log');


},{"./log":44}],44:[function(require,module,exports){
"use strict";
var BaseObject = require('../../base/base_object');
var $ = require('jquery');
var BOLD = 'font-weight: bold; font-size: 13px;';
var INFO = 'color: green;' + BOLD;
var DEBUG = 'color: #222;' + BOLD;
var ERROR = 'color: red;' + BOLD;
var DEFAULT = '';
$(document).keydown(function(e) {
  if (e.ctrlKey && e.shiftKey && e.keyCode === 68) {
    window.DEBUG = !window.DEBUG;
  }
});
var Log = function(klass) {
  this.klass = klass || 'Logger';
};
Log.info = function(klass, msg) {
  console.log('%s %cINFO%c [%s] %s', (new Date()).toLocaleTimeString(), INFO, DEFAULT, klass, msg);
};
Log.error = function(klass, msg) {
  console.log('%s %cINFO%c [%s] %s', (new Date()).toLocaleTimeString(), INFO, DEFAULT, klass, msg);
};
Log.BLACKLIST = ['mediacontrol:show', 'mediacontrol:hide', 'playback:timeupdate', 'playback:progress', 'container:hover', 'container:timeupdate', 'container:progress'];
Log.prototype = {
  log: function(msg) {
    this.info(msg);
  },
  info: function(msg) {
    console.log('%s %cINFO%c [%s] %s', (new Date()).toLocaleTimeString(), INFO, DEFAULT, this.klass, msg);
  },
  error: function(msg) {
    console.log('%s %cERROR%c [%s] %s', (new Date()).toLocaleTimeString(), ERROR, DEFAULT, this.klass, msg);
  }
};
module.exports = Log;


},{"../../base/base_object":"2HNVgz","jquery":"HlZQrA"}],45:[function(require,module,exports){
"use strict";
module.exports = require('./pip');


},{"./pip":46}],46:[function(require,module,exports){
"use strict";
var BaseObject = require('../../base/base_object');
var Styler = require('../../base/styler');
var $ = require("jquery");
var _ = require('underscore');
var Loading = require('../loading');
var PipPlugin = function PipPlugin() {
  $traceurRuntime.defaultSuperCall(this, $PipPlugin.prototype, arguments);
};
var $PipPlugin = PipPlugin;
($traceurRuntime.createClass)(PipPlugin, {
  get name() {
    return 'pip';
  },
  initialize: function(core) {
    this.core = core;
    this.addListeners();
    this.loading = new Loading({message: 'Carregando...'});
    this.core.$el.append(this.loading.render().el);
    var style = Styler.getStyleFor('pip');
    this.core.$el.append(style);
    this.loading.$el.attr('data-pip', '');
    this.loading.$el.addClass('pip-loading');
    this.setupContainers();
  },
  getExternalInterface: function() {
    return {
      addPip: this.addPip,
      discardPip: this.discardPip,
      addMaster: this.addMaster,
      addMasterContainer: this.addMasterContainer,
      changeMaster: this.changeMaster,
      pipToMaster: this.pipToMaster,
      hasPip: this.hasPip
    };
  },
  addListeners: function() {
    this.listenTo(this.core.mediaControl, 'mediacontrol:show', this.onMediaControlShow);
    this.listenTo(this.core.mediaControl, 'mediacontrol:hide', this.onMediaControlHide);
  },
  setupContainers: function() {
    this.masterContainer = this.core.containers[0];
    this.setMasterStyle(this.masterContainer, false);
    this.core.mediaControl.setContainer(this.masterContainer);
    this.core.mediaControl.render();
    if (this.core.containers.length === 2) {
      this.pipContainer = this.core.containers[1];
      this.setPipStyle(this.pipContainer, false);
      this.masterContainer.play();
      this.pipContainer.play();
      this.pipContainer.setVolume(0);
      this.pipContainer.trigger("container:pip", true);
      this.listenToPipClick();
    }
  },
  hasPip: function() {
    return !!this.pipContainer;
  },
  addPip: function(source) {
    this.stopListening(this.pipContainer);
    this.discardPip();
    this.core.createContainer(source).then(this.addPipCallback.bind(this));
  },
  addPipCallback: function(container) {
    this.pipContainer = _(container).isArray() ? container[0] : container;
    this.onContainerReady();
    if (this.core.params.onPipLoaded)
      this.core.params.onPipLoaded(this.pipContainer.playback.src);
  },
  onContainerReady: function() {
    this.pipContainer.setVolume(0);
    this.setPipStyle(this.pipContainer);
    this.pipContainer.play();
    this.stopListening(this.pipContainer);
    this.listenToPipClick();
    this.listenTo(this.pipContainer, "container:ended", this.discardPip);
    this.pipContainer.trigger("container:pip", true);
  },
  discardPip: function() {
    if (this.pipContainer) {
      this.stopListening(this.pipContainer);
      this.discardContainer(this.pipContainer);
      this.pipContainer = undefined;
    }
  },
  discardMaster: function() {
    if (this.masterContainer) {
      this.stopListening(this.masterContainer);
      this.discardContainer(this.masterContainer);
      this.masterContainer = undefined;
    }
  },
  setMasterContainer: function(container) {
    this.discardContainer(this.masterContainer);
    this.masterContainer = container;
    this.setMasterStyle(this.masterContainer);
    this.listenTo(this.masterContainer, "container:ended", this.pipToMaster);
    this.masterContainer.play();
  },
  addMaster: function(source) {
    if (this.masterContainer) {
      this.loading.show();
      this.stopListening(this.masterContainer);
      this.tmpContainer = this.masterContainer;
      this.tmpContainer.setStyle({'z-index': 2000});
      this.core.createContainer(source).then(this.addMasterCallback.bind(this));
    }
  },
  addMasterContainer: function(container) {
    if (this.masterContainer) {
      this.tmpContainer = this.masterContainer;
      this.tmpContainer.setStyle({'z-index': 2000});
      this.addMasterCallback(container);
    }
  },
  addMasterCallback: function(container) {
    this.masterContainer = container;
    if (this.pipContainer) {
      this.discardPip();
    }
    this.pipContainer = this.tmpContainer;
    this.setPipStyle(this.pipContainer);
    this.setMasterStyle(this.masterContainer);
    this.masterContainer.play();
    this.animateMasterToPip();
    this.tmpContainer = undefined;
    this.pipContainer.setVolume(0);
  },
  animateMasterToPip: function() {
    var $__0 = this;
    this.loading.hide();
    this.listenTo(this.masterContainer, "container:ended", this.pipToMaster);
    this.pipContainer.$el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', (function() {
      $__0.pipContainer.trigger("container:pip", true);
      if ($__0.core.params.onMasterLoaded) {
        $__0.core.params.onMasterLoaded($__0.masterContainer.getSource());
      }
    }));
    this.setPipStyle(this.pipContainer);
    this.core.mediaControl.setContainer(this.masterContainer);
    this.listenToPipClick();
  },
  changeMaster: function(source) {
    if (this.masterContainer) {
      this.stopListening(this.masterContainer);
      this.tmpContainer = this.masterContainer;
      this.tmpContainer.setStyle({'z-index': 2000});
      this.core.createContainer(source).then(this.changeMasterCallback.bind(this));
    }
  },
  changeMasterCallback: function(container) {
    this.masterContainer.destroy();
    this.masterContainer = container;
    this.masterContainer.play();
    this.tmpContainer = undefined;
    this.setMasterStyle(this.masterContainer);
    this.listenTo(this.masterContainer, "container:ended", this.pipToMaster);
    this.core.mediaControl.setContainer(this.masterContainer);
    if (this.core.params.onMasterLoaded)
      this.core.params.onMasterLoaded(this.masterContainer.playback.params.src);
  },
  listenToPipClick: function() {
    if (this.pipContainer) {
      this.stopListening(this.pipContainer);
      this.listenTo(this.pipContainer, "container:click", this.pipToMaster.bind(this));
    }
  },
  discardContainer: function(container) {
    container.destroy();
  },
  pipToMaster: function() {
    var $__0 = this;
    this.stopListening(this.masterContainer);
    this.stopListening(this.pipContainer, "container:click");
    if (this.pipContainer) {
      this.pipContainer.setStyle({'z-index': 998});
      this.setMasterStyle(this.pipContainer);
      this.pipContainer.$el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', (function() {
        $__0.pipContainer.$el.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        $__0.pipToMasterCallback();
      }));
    }
    return this;
  },
  pipToMasterCallback: function() {
    this.discardMaster();
    this.pipContainer.setVolume(100);
    this.pipContainer.trigger("container:pip", false);
    this.pipContainer.play();
    this.masterContainer = this.pipContainer;
    this.masterContainer.setStyle({"z-index": 20});
    this.pipContainer = undefined;
    this.core.mediaControl.setContainer(this.masterContainer);
    this.core.enableMediaControl();
    if (this.core.params.onPipToMaster)
      this.core.params.onPipToMaster(this.masterContainer.playback.params.src);
  },
  onMediaControlShow: function() {
    if (this.pipContainer) {
      this.pipContainer.$el.addClass('pip-transition over-media-control');
    }
  },
  onMediaControlHide: function() {
    this.masterContainer.$el.removeClass('over-media-control');
    if (this.pipContainer) {
      this.pipContainer.$el.addClass('pip-transition');
      this.pipContainer.$el.removeClass('over-media-control');
    }
  },
  setAnimatedTransition: function(container, animated) {
    if (animated) {
      container.$el.addClass('pip-transition');
    } else {
      container.$el.removeClass('pip-transition');
    }
  },
  setPipStyle: function(container) {
    var animated = arguments[1] !== (void 0) ? arguments[1] : true;
    this.setAnimatedTransition(container, animated);
    container.$el.attr('data-pip', '');
    container.$el.addClass('pip-container');
    container.$el.removeClass('over-media-control master-container');
  },
  setMasterStyle: function(container) {
    var animated = arguments[1] !== (void 0) ? arguments[1] : true;
    this.setAnimatedTransition(container, animated);
    container.$el.attr('data-pip', '');
    container.$el.addClass('master-container');
    container.$el.removeClass('over-media-control pip-container');
  }
}, {}, BaseObject);
module.exports = PipPlugin;


},{"../../base/base_object":"2HNVgz","../../base/styler":13,"../loading":41,"jquery":"HlZQrA","underscore":"ZKusGn"}],47:[function(require,module,exports){
"use strict";
module.exports = require('./poster');


},{"./poster":48}],48:[function(require,module,exports){
"use strict";
var UIPlugin = require('../../base/ui_plugin');
var Styler = require('../../base/styler');
var JST = require('../../base/jst');
var $ = require('jquery');
var PosterPlugin = function PosterPlugin() {
  $traceurRuntime.defaultSuperCall(this, $PosterPlugin.prototype, arguments);
};
var $PosterPlugin = PosterPlugin;
($traceurRuntime.createClass)(PosterPlugin, {
  get name() {
    return 'poster';
  },
  get template() {
    return JST.poster;
  },
  get attributes() {
    return {
      'class': 'player-poster',
      'data-poster': ''
    };
  },
  get events() {
    return {'click': 'clicked'};
  },
  initialize: function(options) {
    $traceurRuntime.superCall(this, $PosterPlugin.prototype, "initialize", [options]);
    if (options.disableControlsOnPoster === undefined)
      options.disableControlsOnPoster = true;
    this.options = options;
    if (this.options.disableControlsOnPoster)
      this.container.disableMediaControl();
    this.render();
  },
  bindEvents: function() {
    this.listenTo(this.container, 'container:state:buffering', this.onBuffering);
    this.listenTo(this.container, 'container:play', this.onPlay);
    this.listenTo(this.container, 'container:stop', this.onStop);
    this.listenTo(this.container, 'container:ended', this.onStop);
    this.listenTo(this.container, 'container:pip', this.onPipStateChanged);
  },
  onBuffering: function() {
    this.hidePlayButton();
  },
  onPlay: function() {
    this.$el.hide();
    if (this.options.disableControlsOnPoster) {
      this.container.enableMediaControl();
    }
  },
  onStop: function() {
    this.$el.show();
    if (this.options.disableControlsOnPoster) {
      this.container.disableMediaControl();
    }
    if (!this.options.hidePlayButton) {
      this.showPlayButton();
    }
  },
  onPipStateChanged: function(isPip) {
    this.$el.css({fontSize: this.$el.height()});
    if (!this.options.hidePlayButton) {
      this.showPlayButton();
    }
  },
  hidePlayButton: function() {
    this.$playButton.hide();
  },
  showPlayButton: function() {
    this.$el.css({fontSize: this.$el.height()});
    this.$playButton.show();
  },
  clicked: function() {
    this.container.play();
  },
  render: function() {
    var $__0 = this;
    var style = Styler.getStyleFor(this.name);
    this.$el.html(this.template());
    this.$el.append(style);
    this.container.$el.append(this.el);
    this.$el.ready((function() {
      $__0.$el.css({fontSize: $__0.options.height || $__0.$el.height()});
    }));
    var imgEl = this.$el.find('img')[0];
    imgEl.src = this.options.poster || 'assets/default.png';
    this.$playButton = $(this.$el.find('.play-wrapper'));
    if (this.options.hidePlayButton)
      this.$playButton.hide();
    return this;
  }
}, {}, UIPlugin);
module.exports = PosterPlugin;


},{"../../base/jst":10,"../../base/styler":13,"../../base/ui_plugin":"Z7u8cr","jquery":"HlZQrA"}],49:[function(require,module,exports){
"use strict";
module.exports = require('./sequence');


},{"./sequence":50}],50:[function(require,module,exports){
"use strict";
var BaseObject = require('../../base/base_object');
var SequenceContainer = require('./sequence_container');
var _ = require('underscore');
var Utils = require('../../base/utils');
var Sequence = BaseObject.extend({
  initialize: function(core) {
    this.core = core;
    this.sequenceContainer = new SequenceContainer(this.core.containers);
    this.core.mediaControl.setContainer(this.sequenceContainer);
  },
  getExternalInterface: function() {
    return {};
  }
});
module.exports = Sequence;


},{"../../base/base_object":"2HNVgz","../../base/utils":18,"./sequence_container":51,"underscore":"ZKusGn"}],51:[function(require,module,exports){
"use strict";
var BaseObject = require('../../base/base_object');
var _ = require('underscore');
var SequenceContainer = BaseObject.extend({
  name: 'SequenceContainer',
  initialize: function(containers) {
    this.containers = containers;
    this.plugins = [];
    this.containersRange = [];
    this.currentContainer = 0;
    this.checkpoint = 0;
    this.duration = 0;
    _.each(this.containers, this._setupContainers, this);
    this.containersToSetup = this.containers.length;
    this._bindChildEvents(this.getCurrentContainer());
    this.getCurrentContainer().$el.show();
    this.settings = this.getCurrentContainer().settings;
  },
  _bindChildEvents: function(container) {
    this.listenTo(container, 'container:ended', this.playNextContainer);
    this.listenTo(container, 'container:timeupdate', this.timeUpdateProxy);
    this.listenTo(container, 'container:progress', this.progressProxy);
  },
  _setupContainers: function(container) {
    container.$el.hide();
    this._injectInChildPlugins(container.plugins);
    this.listenTo(container, 'container:loadedmetadata', this._setupDuration);
  },
  _injectInChildPlugins: function(plugins) {
    _.each(plugins, function(plugin) {
      plugin.stopListening();
      plugin.container = this;
      plugin.bindEvents();
    }, this);
  },
  _setupDuration: function(duration) {
    this.duration += duration;
    this.trigger('container:timeupdate', 0, this.duration);
    if (--this.containersToSetup === 0) {
      this._setupSeek();
    }
  },
  _setupSeek: function() {
    _.each(this.containers, function(container) {
      var containerDuration = container.playback.getDuration();
      var totalPercent = (containerDuration * 100) / this.duration;
      this.containersRange.push(totalPercent);
    }, this);
  },
  getPlaybackType: function() {
    return this.getCurrentContainer().getPlaybackType();
  },
  length: function() {
    return this.containers.length;
  },
  playNextContainer: function() {
    this.getCurrentContainer().$el.hide();
    this.stopListening(this.getCurrentContainer());
    var nextContainer = this.getNextContainer();
    this.trigger('container:next', this.currentContainer);
    this._bindChildEvents(nextContainer);
    if (this.currentContainer === 0) {
      this.checkpoint = 0;
      nextContainer.$el.show();
      this.trigger('container:ended');
      nextContainer.stop();
    } else {
      nextContainer.play();
      this.trigger('container:play');
      this.trigger('container:settingsupdate');
      this.trigger('container:timeupdate', this.checkpoint, this.duration);
      nextContainer.$el.show();
    }
  },
  timeUpdateProxy: function(position, duration) {
    this.trigger('container:timeupdate', position + this.checkpoint, this.duration, this.name);
  },
  progressProxy: function(startPosition, endPosition, duration) {
    this.trigger('container:progress', startPosition, endPosition, this.duration, this.name);
  },
  getCurrentContainer: function() {
    return this.containers[this.currentContainer];
  },
  getNextContainer: function() {
    this.checkpoint += this.getCurrentContainer().playback.getDuration();
    this.currentContainer = ++this.currentContainer % this.containers.length;
    var nextContainer = this.containers[this.currentContainer];
    this.settings = nextContainer.settings;
    return nextContainer;
  },
  play: function() {
    this.getCurrentContainer().playback.play();
    this.trigger('container:play', this.name);
  },
  setVolume: function(value) {
    this.trigger('container:volume', value, this.name);
    this.getCurrentContainer().setVolume(value);
  },
  pause: function() {
    this.getCurrentContainer().pause();
    this.trigger('container:pause', this.name);
  },
  stop: function() {
    this.getCurrentContainer().stop();
    this.trigger('container:stop', this.name);
  },
  playing: function() {
    this.trigger('container:playing', this.name);
  },
  progress: function(startPosition, endPosition, duration) {
    this.trigger('container:progress', startPosition, endPosition, duration);
  },
  _matchContainerIndex: function(percent) {
    var total = 0;
    for (var i = 0,
        l = this.containers.length; i < l; i++) {
      total += this.containersRange[i];
      if (total >= percent) {
        return i;
      }
    }
    return this.containers.length - 1;
  },
  jumpToContainer: function(index) {
    if (index === 0) {
      this.seekToContainer(index, 0);
    } else {
      var value = _.reduce(this.containersRange.slice(0, index), function(total, percent) {
        return total + percent;
      });
      this.seekToContainer(index, value);
    }
  },
  setCurrentTime: function(time) {
    var containerIndex = this._matchContainerIndex(time);
    this.seekToContainer(containerIndex, time);
  },
  seekToContainer: function(containerIndex, time) {
    if (containerIndex === 0) {
      this.checkpoint = 0;
    } else {
      var slice = this.containers.slice(0, containerIndex);
      this.checkpoint = _.reduce(slice, function(duration, container) {
        return duration + container.playback.getDuration();
      }, 0);
      var pastRange = _.reduce(this.containersRange.slice(0, containerIndex), function(total, percent) {
        return percent + total;
      }, 0);
      time = time - pastRange;
    }
    var containerSeek = time * 100 / this.containersRange[containerIndex];
    var currentContainer = this.getCurrentContainer();
    currentContainer.$el.hide();
    this.stopListening(currentContainer);
    currentContainer.stop();
    this.currentContainer = containerIndex;
    var newContainer = this.containers[containerIndex];
    this.listenTo(newContainer, 'container:ended', this.playNextContainer);
    this.listenTo(newContainer, 'container:timeupdate', this.timeUpdateProxy);
    this.listenTo(newContainer, 'container:progress', this.progressProxy);
    newContainer.play();
    this.trigger('container:settingsupdate');
    this.trigger('container:play');
    newContainer.setCurrentTime(containerSeek);
    newContainer.$el.show();
  },
  settingsUpdate: function() {
    this.settings = this.getCurrentContainer().settings;
    this.trigger('container:settingsupdate');
  },
  isPlaying: function() {
    return this.getCurrentContainer().isPlaying();
  },
  render: function() {
    this.el = _.map(this.containers, function(container) {
      return container.render().el;
    });
    return this;
  }
});
module.exports = SequenceContainer;


},{"../../base/base_object":"2HNVgz","underscore":"ZKusGn"}],52:[function(require,module,exports){
"use strict";
module.exports = require('./spinner_three_bounce');


},{"./spinner_three_bounce":53}],53:[function(require,module,exports){
"use strict";
var UIPlugin = require('../../base/ui_plugin');
var Styler = require('../../base/styler');
var JST = require('../../base/jst');
var SpinnerThreeBouncePlugin = UIPlugin.extend({
  name: 'spinner_three_bounce',
  attributes: {
    'data-spinner': '',
    'class': 'spinner-three-bounce'
  },
  initialize: function(options) {
    SpinnerThreeBouncePlugin.super('initialize').call(this, options);
    this.template = JST[this.name];
    this.listenTo(this.container, 'container:state:buffering', this.onBuffering);
    this.listenTo(this.container, 'container:state:bufferfull', this.onBufferFull);
    this.listenTo(this.container, 'container:stop', this.onStop);
    this.render();
  },
  onBuffering: function() {
    this.$el.show();
  },
  onBufferFull: function() {
    this.$el.hide();
  },
  onStop: function() {
    this.$el.hide();
  },
  render: function() {
    this.$el.hide();
    this.$el.html(this.template());
    var style = Styler.getStyleFor(this.name);
    this.container.$el.append(style);
    this.container.$el.append(this.$el);
    return this;
  }
});
module.exports = SpinnerThreeBouncePlugin;


},{"../../base/jst":10,"../../base/styler":13,"../../base/ui_plugin":"Z7u8cr"}],54:[function(require,module,exports){
"use strict";
module.exports = require('./stats');


},{"./stats":55}],55:[function(require,module,exports){
"use strict";
var Plugin = require('../../base/plugin');
var StatsEvents = require('./stats_events');
var $ = require("jquery");
var StatsPlugin = Plugin.extend({
  name: 'stats',
  type: 'stats',
  initialize: function(options) {
    StatsPlugin.super('initialize').call(this, options);
    this.container.with(StatsEvents);
    this.setInitialAttrs();
    this.reportInterval = options.reportInterval || 5000;
    this.state = "IDLE";
  },
  bindEvents: function() {
    this.listenTo(this.container, 'container:play', this.onPlay);
    this.listenTo(this.container, 'container:stop', this.onStop);
    this.listenTo(this.container, 'container:destroyed', this.onStop);
    this.listenTo(this.container, 'container:setreportinterval', this.setReportInterval);
    this.listenTo(this.container, 'container:state:buffering', this.onBuffering);
    this.listenTo(this.container, 'container:state:bufferfull', this.onBufferFull);
    this.listenTo(this.container, 'container:stats:add', this.onStatsAdd);
    this.listenTo(this.container.playback, 'playback:stats:add', this.onStatsAdd);
  },
  setReportInterval: function(reportInterval) {
    this.reportInterval = reportInterval;
  },
  setInitialAttrs: function() {
    this.firstPlay = true;
    this.startupTime = 0;
    this.rebufferingTime = 0;
    this.watchingTime = 0;
    this.rebuffers = 0;
    this.externalMetrics = {};
  },
  onPlay: function() {
    this.state = "PLAYING";
    this.watchingTimeInit = Date.now();
    this.intervalId = setInterval(this.report.bind(this), this.reportInterval);
  },
  onStop: function() {
    clearInterval(this.intervalId);
    this.state = "STOPPED";
  },
  onBuffering: function() {
    if (this.firstPlay) {
      this.startupTimeInit = Date.now();
    } else {
      this.rebufferingTimeInit = Date.now();
    }
    this.state = "BUFFERING";
    this.rebuffers++;
  },
  onBufferFull: function() {
    if (this.state !== "BUFFERING")
      return;
    if (this.firstPlay) {
      this.firstPlay = false;
      this.startupTime = Date.now() - this.startupTimeInit;
      this.watchingTimeInit = Date.now();
    } else {
      this.rebufferingTime += this.getRebufferingTime();
    }
    this.rebufferingTimeInit = undefined;
    this.state = "PLAYING";
  },
  getRebufferingTime: function() {
    return Date.now() - this.rebufferingTimeInit;
  },
  getWatchingTime: function() {
    var totalTime = (Date.now() - this.watchingTimeInit);
    return totalTime - this.rebufferingTime - this.startupTime;
  },
  isRebuffering: function() {
    return !!this.rebufferingTimeInit;
  },
  onStatsAdd: function(metric) {
    $.extend(this.externalMetrics, metric);
  },
  getStats: function() {
    var metrics = {
      startupTime: this.startupTime,
      rebuffers: this.rebuffers,
      rebufferingTime: this.isRebuffering() ? this.rebufferingTime + this.getRebufferingTime() : this.rebufferingTime,
      watchingTime: this.isRebuffering() ? this.getWatchingTime() - this.getRebufferingTime() : this.getWatchingTime()
    };
    $.extend(metrics, this.externalMetrics);
    return metrics;
  },
  report: function() {
    this.container.statsReport(this.getStats());
  }
});
module.exports = StatsPlugin;


},{"../../base/plugin":11,"./stats_events":56,"jquery":"HlZQrA"}],56:[function(require,module,exports){
"use strict";
var StatsEvents = {
  statsAdd: function(metric) {
    this.trigger('container:stats:add', metric);
  },
  statsReport: function(metrics) {
    this.trigger('container:stats:report', metrics);
  }
};
module.exports = StatsEvents;


},{}],57:[function(require,module,exports){
"use strict";
module.exports = require('./watermark');


},{"./watermark":58}],58:[function(require,module,exports){
"use strict";
var UIPlugin = require('../../base/ui_plugin');
var Styler = require('../../base/styler');
var JST = require('../../base/jst');
var WaterMarkPlugin = function WaterMarkPlugin() {
  $traceurRuntime.defaultSuperCall(this, $WaterMarkPlugin.prototype, arguments);
};
var $WaterMarkPlugin = WaterMarkPlugin;
($traceurRuntime.createClass)(WaterMarkPlugin, {
  get name() {
    return 'watermark';
  },
  get type() {
    return 'ui';
  },
  initialize: function(options) {
    $traceurRuntime.superCall(this, $WaterMarkPlugin.prototype, "initialize", [options]);
    this.template = JST[this.name];
    this.position = options.position || "bottom-right";
    this.imageUrl = options.watermark || 'assets/watermark.png';
    this.render();
  },
  bindEvents: function() {
    this.listenTo(this.container, 'container:play', this.onPlay);
    this.listenTo(this.container, 'container:stop', this.onStop);
    this.listenTo(this.container, 'container:pip', this.onPip);
  },
  onPlay: function() {
    if (!this.hidden)
      this.$el.show();
  },
  onStop: function() {
    this.$el.hide();
  },
  onPip: function(isPip) {
    this.hidden = !!isPip;
    if (isPip) {
      this.$el.hide();
    } else {
      this.$el.show();
    }
  },
  render: function() {
    this.$el.hide();
    var templateOptions = {
      position: this.position,
      imageUrl: this.imageUrl
    };
    this.$el.html(this.template(templateOptions));
    var style = Styler.getStyleFor(this.name);
    this.container.$el.append(style);
    this.container.$el.append(this.$el);
    return this;
  }
}, {}, UIPlugin);
module.exports = WaterMarkPlugin;


},{"../../base/jst":10,"../../base/styler":13,"../../base/ui_plugin":"Z7u8cr"}]},{},[3,32])