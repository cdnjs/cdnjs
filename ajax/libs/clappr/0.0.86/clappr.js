require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";
var Player = require('./components/player');
var IframePlayer = require('./components/iframe_player');
var Mediator = require('mediator');
var version = require('../package.json').version;
global.DEBUG = false;
window.Clappr = {
  Player: Player,
  Mediator: Mediator,
  IframePlayer: IframePlayer
};
window.Clappr.version = version;
module.exports = window.Clappr;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../package.json":6,"./components/iframe_player":17,"./components/player":21,"mediator":"mediator"}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
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
};

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
  function checkObjectCoercible(argument) {
    if (argument == null) {
      throw new TypeError('Value cannot be converted to an Object');
    }
    return argument;
  }
  function setupGlobals(global) {
    global.Symbol = Symbol;
    global.Reflect = global.Reflect || {};
    global.Reflect.global = global.Reflect.global || global;
    polyfillObject(global.Object);
  }
  setupGlobals(global);
  global.$traceurRuntime = {
    createPrivateName: createPrivateName,
    exportStar: exportStar,
    getOwnHashObject: getOwnHashObject,
    privateNames: privateNames,
    setProperty: setProperty,
    setupGlobals: setupGlobals,
    toObject: toObject,
    isObject: isObject,
    toProperty: toProperty,
    type: types,
    typeof: typeOf,
    checkObjectCoercible: checkObjectCoercible,
    hasOwnProperty: function(o, p) {
      return hasOwnProperty.call(o, p);
    },
    defineProperties: $defineProperties,
    defineProperty: $defineProperty,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    getOwnPropertyNames: $getOwnPropertyNames,
    keys: $keys
  };
})(typeof global !== 'undefined' ? global : this);
(function() {
  'use strict';
  function spread() {
    var rv = [],
        j = 0,
        iterResult;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = $traceurRuntime.checkObjectCoercible(arguments[i]);
      if (typeof valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)] !== 'function') {
        throw new TypeError('Cannot spread non-iterable object.');
      }
      var iter = valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)]();
      while (!(iterResult = iter.next()).done) {
        rv[j++] = iterResult.value;
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
      throw new $TypeError('super prototype must be an Object or null');
    }
    if (superClass === null)
      return null;
    throw new $TypeError(("Super expression must either be null or a function, not " + typeof superClass + "."));
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
        throw x;
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
  var $__2 = $traceurRuntime,
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
  var ModuleEvaluationError = function ModuleEvaluationError(erroneousModuleName, cause) {
    this.message = this.constructor.name + ': ' + this.stripCause(cause) + ' in ' + erroneousModuleName;
    if (!(cause instanceof $ModuleEvaluationError) && cause.stack)
      this.stack = this.stripStack(cause.stack);
    else
      this.stack = '';
  };
  var $ModuleEvaluationError = ModuleEvaluationError;
  ($traceurRuntime.createClass)(ModuleEvaluationError, {
    stripError: function(message) {
      return message.replace(/.*Error:/, this.constructor.name + ':');
    },
    stripCause: function(cause) {
      if (!cause)
        return '';
      if (!cause.message)
        return cause + '';
      return this.stripError(cause.message);
    },
    loadedBy: function(moduleName) {
      this.stack += '\n loaded by ' + moduleName;
    },
    stripStack: function(causeStack) {
      var stack = [];
      causeStack.split('\n').some((function(frame) {
        if (/UncoatedModuleInstantiator/.test(frame))
          return true;
        stack.push(frame);
      }));
      stack[0] = this.stripError(stack[0]);
      return stack.join('\n');
    }
  }, {}, Error);
  var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
    $traceurRuntime.superCall(this, $UncoatedModuleInstantiator.prototype, "constructor", [url, null]);
    this.func = func;
  };
  var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
  ($traceurRuntime.createClass)(UncoatedModuleInstantiator, {getUncoatedModule: function() {
      if (this.value_)
        return this.value_;
      try {
        return this.value_ = this.func.call(global);
      } catch (ex) {
        if (ex instanceof ModuleEvaluationError) {
          ex.loadedBy(this.url);
          throw ex;
        }
        throw new ModuleEvaluationError(this.url, ex);
      }
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
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/utils", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/utils";
  var $ceil = Math.ceil;
  var $floor = Math.floor;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $pow = Math.pow;
  var $min = Math.min;
  var toObject = $traceurRuntime.toObject;
  function toUint32(x) {
    return x >>> 0;
  }
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function isCallable(x) {
    return typeof x === 'function';
  }
  function isNumber(x) {
    return typeof x === 'number';
  }
  function toInteger(x) {
    x = +x;
    if ($isNaN(x))
      return 0;
    if (x === 0 || !$isFinite(x))
      return x;
    return x > 0 ? $floor(x) : $ceil(x);
  }
  var MAX_SAFE_LENGTH = $pow(2, 53) - 1;
  function toLength(x) {
    var len = toInteger(x);
    return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
  }
  function checkIterable(x) {
    return !isObject(x) ? undefined : x[Symbol.iterator];
  }
  function isConstructor(x) {
    return isCallable(x);
  }
  function createIteratorResultObject(value, done) {
    return {
      value: value,
      done: done
    };
  }
  function maybeDefine(object, name, descr) {
    if (!(name in object)) {
      Object.defineProperty(object, name, descr);
    }
  }
  function maybeDefineMethod(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  function maybeDefineConst(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  function maybeAddFunctions(object, functions) {
    for (var i = 0; i < functions.length; i += 2) {
      var name = functions[i];
      var value = functions[i + 1];
      maybeDefineMethod(object, name, value);
    }
  }
  function maybeAddConsts(object, consts) {
    for (var i = 0; i < consts.length; i += 2) {
      var name = consts[i];
      var value = consts[i + 1];
      maybeDefineConst(object, name, value);
    }
  }
  function maybeAddIterator(object, func, Symbol) {
    if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
      return;
    if (object['@@iterator'])
      func = object['@@iterator'];
    Object.defineProperty(object, Symbol.iterator, {
      value: func,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  var polyfills = [];
  function registerPolyfill(func) {
    polyfills.push(func);
  }
  function polyfillAll(global) {
    polyfills.forEach((function(f) {
      return f(global);
    }));
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
    get isNumber() {
      return isNumber;
    },
    get toInteger() {
      return toInteger;
    },
    get toLength() {
      return toLength;
    },
    get checkIterable() {
      return checkIterable;
    },
    get isConstructor() {
      return isConstructor;
    },
    get createIteratorResultObject() {
      return createIteratorResultObject;
    },
    get maybeDefine() {
      return maybeDefine;
    },
    get maybeDefineMethod() {
      return maybeDefineMethod;
    },
    get maybeDefineConst() {
      return maybeDefineConst;
    },
    get maybeAddFunctions() {
      return maybeAddFunctions;
    },
    get maybeAddConsts() {
      return maybeAddConsts;
    },
    get maybeAddIterator() {
      return maybeAddIterator;
    },
    get registerPolyfill() {
      return registerPolyfill;
    },
    get polyfillAll() {
      return polyfillAll;
    }
  };
});
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Map", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Map";
  var $__3 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      isObject = $__3.isObject,
      maybeAddIterator = $__3.maybeAddIterator,
      registerPolyfill = $__3.registerPolyfill;
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
      throw new TypeError('Map called on incompatible type');
    if ($hasOwnProperty.call(this, 'entries_')) {
      throw new TypeError('Map can not be reentrantly initialised');
    }
    initMap(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__5 = iterable[Symbol.iterator](),
          $__6; !($__6 = $__5.next()).done; ) {
        var $__7 = $__6.value,
            key = $__7[0],
            value = $__7[1];
        {
          this.set(key, value);
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
        return true;
      }
      return false;
    },
    clear: function() {
      initMap(this);
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      for (var i = 0; i < this.entries_.length; i += 2) {
        var key = this.entries_[i];
        var value = this.entries_[i + 1];
        if (key === deletedSentinel)
          continue;
        callbackFn.call(thisArg, value, key, this);
      }
    },
    entries: $traceurRuntime.initGeneratorFunction(function $__8() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return [key, value];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__8, this);
    }),
    keys: $traceurRuntime.initGeneratorFunction(function $__9() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return key;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__9, this);
    }),
    values: $traceurRuntime.initGeneratorFunction(function $__10() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return value;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__10, this);
    })
  }, {});
  Object.defineProperty(Map.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Map.prototype.entries
  });
  function polyfillMap(global) {
    var $__7 = global,
        Object = $__7.Object,
        Symbol = $__7.Symbol;
    if (!global.Map)
      global.Map = Map;
    var mapPrototype = global.Map.prototype;
    if (mapPrototype.entries) {
      maybeAddIterator(mapPrototype, mapPrototype.entries, Symbol);
      maybeAddIterator(Object.getPrototypeOf(new global.Map().entries()), function() {
        return this;
      }, Symbol);
    }
  }
  registerPolyfill(polyfillMap);
  return {
    get Map() {
      return Map;
    },
    get polyfillMap() {
      return polyfillMap;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Map" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Set", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Set";
  var $__11 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      isObject = $__11.isObject,
      maybeAddIterator = $__11.maybeAddIterator,
      registerPolyfill = $__11.registerPolyfill;
  var Map = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Map").Map;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  function initSet(set) {
    set.map_ = new Map();
  }
  var Set = function Set() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError('Set called on incompatible type');
    if ($hasOwnProperty.call(this, 'map_')) {
      throw new TypeError('Set can not be reentrantly initialised');
    }
    initSet(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__15 = iterable[Symbol.iterator](),
          $__16; !($__16 = $__15.next()).done; ) {
        var item = $__16.value;
        {
          this.add(item);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Set, {
    get size() {
      return this.map_.size;
    },
    has: function(key) {
      return this.map_.has(key);
    },
    add: function(key) {
      this.map_.set(key, key);
      return this;
    },
    delete: function(key) {
      return this.map_.delete(key);
    },
    clear: function() {
      return this.map_.clear();
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      var $__13 = this;
      return this.map_.forEach((function(value, key) {
        callbackFn.call(thisArg, key, key, $__13);
      }));
    },
    values: $traceurRuntime.initGeneratorFunction(function $__18() {
      var $__19,
          $__20;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__19 = this.map_.keys()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__20 = $__19[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__20.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__20.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__20.value;
            default:
              return $ctx.end();
          }
      }, $__18, this);
    }),
    entries: $traceurRuntime.initGeneratorFunction(function $__21() {
      var $__22,
          $__23;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__22 = this.map_.entries()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__23 = $__22[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__23.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__23.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__23.value;
            default:
              return $ctx.end();
          }
      }, $__21, this);
    })
  }, {});
  Object.defineProperty(Set.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  Object.defineProperty(Set.prototype, 'keys', {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  function polyfillSet(global) {
    var $__17 = global,
        Object = $__17.Object,
        Symbol = $__17.Symbol;
    if (!global.Set)
      global.Set = Set;
    var setPrototype = global.Set.prototype;
    if (setPrototype.values) {
      maybeAddIterator(setPrototype, setPrototype.values, Symbol);
      maybeAddIterator(Object.getPrototypeOf(new global.Set().values()), function() {
        return this;
      }, Symbol);
    }
  }
  registerPolyfill(polyfillSet);
  return {
    get Set() {
      return Set;
    },
    get polyfillSet() {
      return polyfillSet;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Set" + '');
System.register("traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap";
  var len = 0;
  function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    if (len === 2) {
      scheduleFlush();
    }
  }
  var $__default = asap;
  var browserGlobal = (typeof window !== 'undefined') ? window : {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
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
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function() {
      channel.port2.postMessage(0);
    };
  }
  function useSetTimeout() {
    return function() {
      setTimeout(flush, 1);
    };
  }
  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];
      callback(arg);
      queue[i] = undefined;
      queue[i + 1] = undefined;
    }
    len = 0;
  }
  var scheduleFlush;
  if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Promise", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Promise";
  var async = System.get("traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap").default;
  var registerPolyfill = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils").registerPolyfill;
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
        if (isPromise(x)) {
          return x;
        }
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
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  registerPolyfill(polyfillPromise);
  return {
    get Promise() {
      return Promise;
    },
    get polyfillPromise() {
      return polyfillPromise;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Promise" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator", [], function() {
  "use strict";
  var $__29;
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator";
  var $__27 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      createIteratorResultObject = $__27.createIteratorResultObject,
      isObject = $__27.isObject;
  var $__30 = $traceurRuntime,
      hasOwnProperty = $__30.hasOwnProperty,
      toProperty = $__30.toProperty;
  var iteratedString = Symbol('iteratedString');
  var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
  var StringIterator = function StringIterator() {};
  ($traceurRuntime.createClass)(StringIterator, ($__29 = {}, Object.defineProperty($__29, "next", {
    value: function() {
      var o = this;
      if (!isObject(o) || !hasOwnProperty(o, iteratedString)) {
        throw new TypeError('this must be a StringIterator object');
      }
      var s = o[toProperty(iteratedString)];
      if (s === undefined) {
        return createIteratorResultObject(undefined, true);
      }
      var position = o[toProperty(stringIteratorNextIndex)];
      var len = s.length;
      if (position >= len) {
        o[toProperty(iteratedString)] = undefined;
        return createIteratorResultObject(undefined, true);
      }
      var first = s.charCodeAt(position);
      var resultString;
      if (first < 0xD800 || first > 0xDBFF || position + 1 === len) {
        resultString = String.fromCharCode(first);
      } else {
        var second = s.charCodeAt(position + 1);
        if (second < 0xDC00 || second > 0xDFFF) {
          resultString = String.fromCharCode(first);
        } else {
          resultString = String.fromCharCode(first) + String.fromCharCode(second);
        }
      }
      o[toProperty(stringIteratorNextIndex)] = position + resultString.length;
      return createIteratorResultObject(resultString, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__29, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__29), {});
  function createStringIterator(string) {
    var s = String(string);
    var iterator = Object.create(StringIterator.prototype);
    iterator[toProperty(iteratedString)] = s;
    iterator[toProperty(stringIteratorNextIndex)] = 0;
    return iterator;
  }
  return {get createStringIterator() {
      return createStringIterator;
    }};
});
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/String", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/String";
  var createStringIterator = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator").createStringIterator;
  var $__32 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      maybeAddFunctions = $__32.maybeAddFunctions,
      maybeAddIterator = $__32.maybeAddIterator,
      registerPolyfill = $__32.registerPolyfill;
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
  function stringPrototypeIterator() {
    var o = $traceurRuntime.checkObjectCoercible(this);
    var s = String(o);
    return createStringIterator(s);
  }
  function polyfillString(global) {
    var String = global.String;
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'contains', contains, 'endsWith', endsWith, 'startsWith', startsWith, 'repeat', repeat]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
    maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
  }
  registerPolyfill(polyfillString);
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
    },
    get stringPrototypeIterator() {
      return stringPrototypeIterator;
    },
    get polyfillString() {
      return polyfillString;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/String" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator", [], function() {
  "use strict";
  var $__36;
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator";
  var $__34 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      toObject = $__34.toObject,
      toUint32 = $__34.toUint32,
      createIteratorResultObject = $__34.createIteratorResultObject;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function ArrayIterator() {};
  ($traceurRuntime.createClass)(ArrayIterator, ($__36 = {}, Object.defineProperty($__36, "next", {
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
  }), Object.defineProperty($__36, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__36), {});
  function createArrayIterator(array, kind) {
    var object = toObject(array);
    var iterator = new ArrayIterator;
    iterator.iteratorObject_ = object;
    iterator.arrayIteratorNextIndex_ = 0;
    iterator.arrayIterationKind_ = kind;
    return iterator;
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
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Array", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Array";
  var $__37 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator"),
      entries = $__37.entries,
      keys = $__37.keys,
      values = $__37.values;
  var $__38 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      checkIterable = $__38.checkIterable,
      isCallable = $__38.isCallable,
      isConstructor = $__38.isConstructor,
      maybeAddFunctions = $__38.maybeAddFunctions,
      maybeAddIterator = $__38.maybeAddIterator,
      registerPolyfill = $__38.registerPolyfill,
      toInteger = $__38.toInteger,
      toLength = $__38.toLength,
      toObject = $__38.toObject;
  function from(arrLike) {
    var mapFn = arguments[1];
    var thisArg = arguments[2];
    var C = this;
    var items = toObject(arrLike);
    var mapping = mapFn !== undefined;
    var k = 0;
    var arr,
        len;
    if (mapping && !isCallable(mapFn)) {
      throw TypeError();
    }
    if (checkIterable(items)) {
      arr = isConstructor(C) ? new C() : [];
      for (var $__39 = items[Symbol.iterator](),
          $__40; !($__40 = $__39.next()).done; ) {
        var item = $__40.value;
        {
          if (mapping) {
            arr[k] = mapFn.call(thisArg, item, k);
          } else {
            arr[k] = item;
          }
          k++;
        }
      }
      arr.length = k;
      return arr;
    }
    len = toLength(items.length);
    arr = isConstructor(C) ? new C(len) : new Array(len);
    for (; k < len; k++) {
      if (mapping) {
        arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
      } else {
        arr[k] = items[k];
      }
    }
    arr.length = len;
    return arr;
  }
  function of() {
    for (var items = [],
        $__41 = 0; $__41 < arguments.length; $__41++)
      items[$__41] = arguments[$__41];
    var C = this;
    var len = items.length;
    var arr = isConstructor(C) ? new C(len) : new Array(len);
    for (var k = 0; k < len; k++) {
      arr[k] = items[k];
    }
    arr.length = len;
    return arr;
  }
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
  function polyfillArray(global) {
    var $__42 = global,
        Array = $__42.Array,
        Object = $__42.Object,
        Symbol = $__42.Symbol;
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    maybeAddFunctions(Array, ['from', from, 'of', of]);
    maybeAddIterator(Array.prototype, values, Symbol);
    maybeAddIterator(Object.getPrototypeOf([].values()), function() {
      return this;
    }, Symbol);
  }
  registerPolyfill(polyfillArray);
  return {
    get from() {
      return from;
    },
    get of() {
      return of;
    },
    get fill() {
      return fill;
    },
    get find() {
      return find;
    },
    get findIndex() {
      return findIndex;
    },
    get polyfillArray() {
      return polyfillArray;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Array" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Object", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Object";
  var $__43 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      maybeAddFunctions = $__43.maybeAddFunctions,
      registerPolyfill = $__43.registerPolyfill;
  var $__44 = $traceurRuntime,
      defineProperty = $__44.defineProperty,
      getOwnPropertyDescriptor = $__44.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__44.getOwnPropertyNames,
      keys = $__44.keys,
      privateNames = $__44.privateNames;
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
  function polyfillObject(global) {
    var Object = global.Object;
    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
  }
  registerPolyfill(polyfillObject);
  return {
    get is() {
      return is;
    },
    get assign() {
      return assign;
    },
    get mixin() {
      return mixin;
    },
    get polyfillObject() {
      return polyfillObject;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Object" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Number", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Number";
  var $__46 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      isNumber = $__46.isNumber,
      maybeAddConsts = $__46.maybeAddConsts,
      maybeAddFunctions = $__46.maybeAddFunctions,
      registerPolyfill = $__46.registerPolyfill,
      toInteger = $__46.toInteger;
  var $abs = Math.abs;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
  var EPSILON = Math.pow(2, -52);
  function NumberIsFinite(number) {
    return isNumber(number) && $isFinite(number);
  }
  ;
  function isInteger(number) {
    return NumberIsFinite(number) && toInteger(number) === number;
  }
  function NumberIsNaN(number) {
    return isNumber(number) && $isNaN(number);
  }
  ;
  function isSafeInteger(number) {
    if (NumberIsFinite(number)) {
      var integral = toInteger(number);
      if (integral === number)
        return $abs(integral) <= MAX_SAFE_INTEGER;
    }
    return false;
  }
  function polyfillNumber(global) {
    var Number = global.Number;
    maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
    maybeAddFunctions(Number, ['isFinite', NumberIsFinite, 'isInteger', isInteger, 'isNaN', NumberIsNaN, 'isSafeInteger', isSafeInteger]);
  }
  registerPolyfill(polyfillNumber);
  return {
    get MAX_SAFE_INTEGER() {
      return MAX_SAFE_INTEGER;
    },
    get MIN_SAFE_INTEGER() {
      return MIN_SAFE_INTEGER;
    },
    get EPSILON() {
      return EPSILON;
    },
    get isFinite() {
      return NumberIsFinite;
    },
    get isInteger() {
      return isInteger;
    },
    get isNaN() {
      return NumberIsNaN;
    },
    get isSafeInteger() {
      return isSafeInteger;
    },
    get polyfillNumber() {
      return polyfillNumber;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Number" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/polyfills", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/polyfills";
  var polyfillAll = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils").polyfillAll;
  polyfillAll(this);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
    polyfillAll(global);
  };
  return {};
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/polyfills" + '');

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":2}],4:[function(require,module,exports){
/*global define:false */
/**
 * Copyright 2013 Craig Campbell
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
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.4.6
 * @url craig.is/killing/mice
 */
(function(window, document, undefined) {

    /**
     * mapping of special keycodes to their corresponding keys
     *
     * everything in this dictionary cannot use keypress events
     * so it has to be here to map to the correct keycodes for
     * keyup/keydown events
     *
     * @type {Object}
     */
    var _MAP = {
            8: 'backspace',
            9: 'tab',
            13: 'enter',
            16: 'shift',
            17: 'ctrl',
            18: 'alt',
            20: 'capslock',
            27: 'esc',
            32: 'space',
            33: 'pageup',
            34: 'pagedown',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            45: 'ins',
            46: 'del',
            91: 'meta',
            93: 'meta',
            224: 'meta'
        },

        /**
         * mapping for special characters so they can support
         *
         * this dictionary is only used incase you want to bind a
         * keyup or keydown event to one of these keys
         *
         * @type {Object}
         */
        _KEYCODE_MAP = {
            106: '*',
            107: '+',
            109: '-',
            110: '.',
            111 : '/',
            186: ';',
            187: '=',
            188: ',',
            189: '-',
            190: '.',
            191: '/',
            192: '`',
            219: '[',
            220: '\\',
            221: ']',
            222: '\''
        },

        /**
         * this is a mapping of keys that require shift on a US keypad
         * back to the non shift equivelents
         *
         * this is so you can use keyup events with these keys
         *
         * note that this will only work reliably on US keyboards
         *
         * @type {Object}
         */
        _SHIFT_MAP = {
            '~': '`',
            '!': '1',
            '@': '2',
            '#': '3',
            '$': '4',
            '%': '5',
            '^': '6',
            '&': '7',
            '*': '8',
            '(': '9',
            ')': '0',
            '_': '-',
            '+': '=',
            ':': ';',
            '\"': '\'',
            '<': ',',
            '>': '.',
            '?': '/',
            '|': '\\'
        },

        /**
         * this is a list of special strings you can use to map
         * to modifier keys when you specify your keyboard shortcuts
         *
         * @type {Object}
         */
        _SPECIAL_ALIASES = {
            'option': 'alt',
            'command': 'meta',
            'return': 'enter',
            'escape': 'esc',
            'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
        },

        /**
         * variable to store the flipped version of _MAP from above
         * needed to check if we should use keypress or not when no action
         * is specified
         *
         * @type {Object|undefined}
         */
        _REVERSE_MAP,

        /**
         * a list of all the callbacks setup via Mousetrap.bind()
         *
         * @type {Object}
         */
        _callbacks = {},

        /**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */
        _directMap = {},

        /**
         * keeps track of what level each sequence is at since multiple
         * sequences can start out with the same sequence
         *
         * @type {Object}
         */
        _sequenceLevels = {},

        /**
         * variable to store the setTimeout call
         *
         * @type {null|number}
         */
        _resetTimer,

        /**
         * temporary state where we will ignore the next keyup
         *
         * @type {boolean|string}
         */
        _ignoreNextKeyup = false,

        /**
         * temporary state where we will ignore the next keypress
         *
         * @type {boolean}
         */
        _ignoreNextKeypress = false,

        /**
         * are we currently inside of a sequence?
         * type of action ("keyup" or "keydown" or "keypress") or false
         *
         * @type {boolean|string}
         */
        _nextExpectedAction = false;

    /**
     * loop through the f keys, f1 to f19 and add them to the map
     * programatically
     */
    for (var i = 1; i < 20; ++i) {
        _MAP[111 + i] = 'f' + i;
    }

    /**
     * loop through to map numbers on the numeric keypad
     */
    for (i = 0; i <= 9; ++i) {
        _MAP[i + 96] = i;
    }

    /**
     * cross browser add event method
     *
     * @param {Element|HTMLDocument} object
     * @param {string} type
     * @param {Function} callback
     * @returns void
     */
    function _addEvent(object, type, callback) {
        if (object.addEventListener) {
            object.addEventListener(type, callback, false);
            return;
        }

        object.attachEvent('on' + type, callback);
    }

    /**
     * takes the event and returns the key character
     *
     * @param {Event} e
     * @return {string}
     */
    function _characterFromEvent(e) {

        // for keypress events we should return the character as is
        if (e.type == 'keypress') {
            var character = String.fromCharCode(e.which);

            // if the shift key is not pressed then it is safe to assume
            // that we want the character to be lowercase.  this means if
            // you accidentally have caps lock on then your key bindings
            // will continue to work
            //
            // the only side effect that might not be desired is if you
            // bind something like 'A' cause you want to trigger an
            // event when capital A is pressed caps lock will no longer
            // trigger the event.  shift+a will though.
            if (!e.shiftKey) {
                character = character.toLowerCase();
            }

            return character;
        }

        // for non keypress events the special maps are needed
        if (_MAP[e.which]) {
            return _MAP[e.which];
        }

        if (_KEYCODE_MAP[e.which]) {
            return _KEYCODE_MAP[e.which];
        }

        // if it is not in the special map

        // with keydown and keyup events the character seems to always
        // come in as an uppercase character whether you are pressing shift
        // or not.  we should make sure it is always lowercase for comparisons
        return String.fromCharCode(e.which).toLowerCase();
    }

    /**
     * checks if two arrays are equal
     *
     * @param {Array} modifiers1
     * @param {Array} modifiers2
     * @returns {boolean}
     */
    function _modifiersMatch(modifiers1, modifiers2) {
        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
    }

    /**
     * resets all sequence counters except for the ones passed in
     *
     * @param {Object} doNotReset
     * @returns void
     */
    function _resetSequences(doNotReset) {
        doNotReset = doNotReset || {};

        var activeSequences = false,
            key;

        for (key in _sequenceLevels) {
            if (doNotReset[key]) {
                activeSequences = true;
                continue;
            }
            _sequenceLevels[key] = 0;
        }

        if (!activeSequences) {
            _nextExpectedAction = false;
        }
    }

    /**
     * finds all callbacks that match based on the keycode, modifiers,
     * and action
     *
     * @param {string} character
     * @param {Array} modifiers
     * @param {Event|Object} e
     * @param {string=} sequenceName - name of the sequence we are looking for
     * @param {string=} combination
     * @param {number=} level
     * @returns {Array}
     */
    function _getMatches(character, modifiers, e, sequenceName, combination, level) {
        var i,
            callback,
            matches = [],
            action = e.type;

        // if there are no events related to this keycode
        if (!_callbacks[character]) {
            return [];
        }

        // if a modifier key is coming up on its own we should allow it
        if (action == 'keyup' && _isModifier(character)) {
            modifiers = [character];
        }

        // loop through all callbacks for the key that was pressed
        // and see if any of them match
        for (i = 0; i < _callbacks[character].length; ++i) {
            callback = _callbacks[character][i];

            // if a sequence name is not specified, but this is a sequence at
            // the wrong level then move onto the next match
            if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                continue;
            }

            // if the action we are looking for doesn't match the action we got
            // then we should keep going
            if (action != callback.action) {
                continue;
            }

            // if this is a keypress event and the meta key and control key
            // are not pressed that means that we need to only look at the
            // character, otherwise check the modifiers as well
            //
            // chrome will not fire a keypress if meta or control is down
            // safari will fire a keypress if meta or meta+shift is down
            // firefox will fire a keypress if meta or control is down
            if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {

                // when you bind a combination or sequence a second time it
                // should overwrite the first one.  if a sequenceName or
                // combination is specified in this call it does just that
                //
                // @todo make deleting its own method?
                var deleteCombo = !sequenceName && callback.combo == combination;
                var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                if (deleteCombo || deleteSequence) {
                    _callbacks[character].splice(i, 1);
                }

                matches.push(callback);
            }
        }

        return matches;
    }

    /**
     * takes a key event and figures out what the modifiers are
     *
     * @param {Event} e
     * @returns {Array}
     */
    function _eventModifiers(e) {
        var modifiers = [];

        if (e.shiftKey) {
            modifiers.push('shift');
        }

        if (e.altKey) {
            modifiers.push('alt');
        }

        if (e.ctrlKey) {
            modifiers.push('ctrl');
        }

        if (e.metaKey) {
            modifiers.push('meta');
        }

        return modifiers;
    }

    /**
     * prevents default for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault();
            return;
        }

        e.returnValue = false;
    }

    /**
     * stops propogation for this event
     *
     * @param {Event} e
     * @returns void
     */
    function _stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
            return;
        }

        e.cancelBubble = true;
    }

    /**
     * actually calls the callback function
     *
     * if your callback function returns false this will use the jquery
     * convention - prevent default and stop propogation on the event
     *
     * @param {Function} callback
     * @param {Event} e
     * @returns void
     */
    function _fireCallback(callback, e, combo, sequence) {

        // if this event should not happen stop here
        if (Mousetrap.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
            return;
        }

        if (callback(e, combo) === false) {
            _preventDefault(e);
            _stopPropagation(e);
        }
    }

    /**
     * handles a character key event
     *
     * @param {string} character
     * @param {Array} modifiers
     * @param {Event} e
     * @returns void
     */
    function _handleKey(character, modifiers, e) {
        var callbacks = _getMatches(character, modifiers, e),
            i,
            doNotReset = {},
            maxLevel = 0,
            processedSequenceCallback = false;

        // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
        for (i = 0; i < callbacks.length; ++i) {
            if (callbacks[i].seq) {
                maxLevel = Math.max(maxLevel, callbacks[i].level);
            }
        }

        // loop through matching callbacks for this key event
        for (i = 0; i < callbacks.length; ++i) {

            // fire for all sequence callbacks
            // this is because if for example you have multiple sequences
            // bound such as "g i" and "g t" they both need to fire the
            // callback for matching g cause otherwise you can only ever
            // match the first one
            if (callbacks[i].seq) {

                // only fire callbacks for the maxLevel to prevent
                // subsequences from also firing
                //
                // for example 'a option b' should not cause 'option b' to fire
                // even though 'option b' is part of the other sequence
                //
                // any sequences that do not match here will be discarded
                // below by the _resetSequences call
                if (callbacks[i].level != maxLevel) {
                    continue;
                }

                processedSequenceCallback = true;

                // keep a list of which sequences were matches for later
                doNotReset[callbacks[i].seq] = 1;
                _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
                continue;
            }

            // if there were no sequence matches but we are still here
            // that means this is a regular match so we should fire that
            if (!processedSequenceCallback) {
                _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
            }
        }

        // if the key you pressed matches the type of sequence without
        // being a modifier (ie "keyup" or "keypress") then we should
        // reset all sequences that were not matched by this event
        //
        // this is so, for example, if you have the sequence "h a t" and you
        // type "h e a r t" it does not match.  in this case the "e" will
        // cause the sequence to reset
        //
        // modifier keys are ignored because you can have a sequence
        // that contains modifiers such as "enter ctrl+space" and in most
        // cases the modifier key will be pressed before the next key
        //
        // also if you have a sequence such as "ctrl+b a" then pressing the
        // "b" key will trigger a "keypress" and a "keydown"
        //
        // the "keydown" is expected when there is a modifier, but the
        // "keypress" ends up matching the _nextExpectedAction since it occurs
        // after and that causes the sequence to reset
        //
        // we ignore keypresses in a sequence that directly follow a keydown
        // for the same character
        var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
        if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
            _resetSequences(doNotReset);
        }

        _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
    }

    /**
     * handles a keydown event
     *
     * @param {Event} e
     * @returns void
     */
    function _handleKeyEvent(e) {

        // normalize e.which for key events
        // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
        if (typeof e.which !== 'number') {
            e.which = e.keyCode;
        }

        var character = _characterFromEvent(e);

        // no character found then stop
        if (!character) {
            return;
        }

        // need to use === for the character check because the character can be 0
        if (e.type == 'keyup' && _ignoreNextKeyup === character) {
            _ignoreNextKeyup = false;
            return;
        }

        Mousetrap.handleKey(character, _eventModifiers(e), e);
    }

    /**
     * determines if the keycode specified is a modifier key or not
     *
     * @param {string} key
     * @returns {boolean}
     */
    function _isModifier(key) {
        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
    }

    /**
     * called to set a 1 second timeout on the specified sequence
     *
     * this is so after each key press in the sequence you have 1 second
     * to press the next key before you have to start over
     *
     * @returns void
     */
    function _resetSequenceTimer() {
        clearTimeout(_resetTimer);
        _resetTimer = setTimeout(_resetSequences, 1000);
    }

    /**
     * reverses the map lookup so that we can look for specific keys
     * to see what can and can't use keypress
     *
     * @return {Object}
     */
    function _getReverseMap() {
        if (!_REVERSE_MAP) {
            _REVERSE_MAP = {};
            for (var key in _MAP) {

                // pull out the numeric keypad from here cause keypress should
                // be able to detect the keys from the character
                if (key > 95 && key < 112) {
                    continue;
                }

                if (_MAP.hasOwnProperty(key)) {
                    _REVERSE_MAP[_MAP[key]] = key;
                }
            }
        }
        return _REVERSE_MAP;
    }

    /**
     * picks the best action based on the key combination
     *
     * @param {string} key - character for key
     * @param {Array} modifiers
     * @param {string=} action passed in
     */
    function _pickBestAction(key, modifiers, action) {

        // if no action was picked in we should try to pick the one
        // that we think would work best for this key
        if (!action) {
            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
        }

        // modifier keys don't work as expected with keypress,
        // switch to keydown
        if (action == 'keypress' && modifiers.length) {
            action = 'keydown';
        }

        return action;
    }

    /**
     * binds a key sequence to an event
     *
     * @param {string} combo - combo specified in bind call
     * @param {Array} keys
     * @param {Function} callback
     * @param {string=} action
     * @returns void
     */
    function _bindSequence(combo, keys, callback, action) {

        // start off by adding a sequence level record for this combination
        // and setting the level to 0
        _sequenceLevels[combo] = 0;

        /**
         * callback to increase the sequence level for this sequence and reset
         * all other sequences that were active
         *
         * @param {string} nextAction
         * @returns {Function}
         */
        function _increaseSequence(nextAction) {
            return function() {
                _nextExpectedAction = nextAction;
                ++_sequenceLevels[combo];
                _resetSequenceTimer();
            };
        }

        /**
         * wraps the specified callback inside of another function in order
         * to reset all sequence counters as soon as this sequence is done
         *
         * @param {Event} e
         * @returns void
         */
        function _callbackAndReset(e) {
            _fireCallback(callback, e, combo);

            // we should ignore the next key up if the action is key down
            // or keypress.  this is so if you finish a sequence and
            // release the key the final key will not trigger a keyup
            if (action !== 'keyup') {
                _ignoreNextKeyup = _characterFromEvent(e);
            }

            // weird race condition if a sequence ends with the key
            // another sequence begins with
            setTimeout(_resetSequences, 10);
        }

        // loop through keys one at a time and bind the appropriate callback
        // function.  for any key leading up to the final one it should
        // increase the sequence. after the final, it should reset all sequences
        //
        // if an action is specified in the original bind call then that will
        // be used throughout.  otherwise we will pass the action that the
        // next key in the sequence should match.  this allows a sequence
        // to mix and match keypress and keydown events depending on which
        // ones are better suited to the key provided
        for (var i = 0; i < keys.length; ++i) {
            var isFinal = i + 1 === keys.length;
            var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
            _bindSingle(keys[i], wrappedCallback, action, combo, i);
        }
    }

    /**
     * Converts from a string key combination to an array
     *
     * @param  {string} combination like "command+shift+l"
     * @return {Array}
     */
    function _keysFromString(combination) {
        if (combination === '+') {
            return ['+'];
        }

        return combination.split('+');
    }

    /**
     * Gets info for a specific key combination
     *
     * @param  {string} combination key combination ("command+s" or "a" or "*")
     * @param  {string=} action
     * @returns {Object}
     */
    function _getKeyInfo(combination, action) {
        var keys,
            key,
            i,
            modifiers = [];

        // take the keys from this pattern and figure out what the actual
        // pattern is all about
        keys = _keysFromString(combination);

        for (i = 0; i < keys.length; ++i) {
            key = keys[i];

            // normalize key names
            if (_SPECIAL_ALIASES[key]) {
                key = _SPECIAL_ALIASES[key];
            }

            // if this is not a keypress event then we should
            // be smart about using shift keys
            // this will only work for US keyboards however
            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
                key = _SHIFT_MAP[key];
                modifiers.push('shift');
            }

            // if this key is a modifier then add it to the list of modifiers
            if (_isModifier(key)) {
                modifiers.push(key);
            }
        }

        // depending on what the key combination is
        // we will try to pick the best event for it
        action = _pickBestAction(key, modifiers, action);

        return {
            key: key,
            modifiers: modifiers,
            action: action
        };
    }

    /**
     * binds a single keyboard combination
     *
     * @param {string} combination
     * @param {Function} callback
     * @param {string=} action
     * @param {string=} sequenceName - name of sequence if part of sequence
     * @param {number=} level - what part of the sequence the command is
     * @returns void
     */
    function _bindSingle(combination, callback, action, sequenceName, level) {

        // store a direct mapped reference for use with Mousetrap.trigger
        _directMap[combination + ':' + action] = callback;

        // make sure multiple spaces in a row become a single space
        combination = combination.replace(/\s+/g, ' ');

        var sequence = combination.split(' '),
            info;

        // if this pattern is a sequence of keys then run through this method
        // to reprocess each pattern one key at a time
        if (sequence.length > 1) {
            _bindSequence(combination, sequence, callback, action);
            return;
        }

        info = _getKeyInfo(combination, action);

        // make sure to initialize array if this is the first time
        // a callback is added for this key
        _callbacks[info.key] = _callbacks[info.key] || [];

        // remove an existing match if there is one
        _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);

        // add this call back to the array
        // if it is a sequence put it at the beginning
        // if not put it at the end
        //
        // this is important because the way these are processed expects
        // the sequence ones to come first
        _callbacks[info.key][sequenceName ? 'unshift' : 'push']({
            callback: callback,
            modifiers: info.modifiers,
            action: info.action,
            seq: sequenceName,
            level: level,
            combo: combination
        });
    }

    /**
     * binds multiple combinations to the same callback
     *
     * @param {Array} combinations
     * @param {Function} callback
     * @param {string|undefined} action
     * @returns void
     */
    function _bindMultiple(combinations, callback, action) {
        for (var i = 0; i < combinations.length; ++i) {
            _bindSingle(combinations[i], callback, action);
        }
    }

    // start!
    _addEvent(document, 'keypress', _handleKeyEvent);
    _addEvent(document, 'keydown', _handleKeyEvent);
    _addEvent(document, 'keyup', _handleKeyEvent);

    var Mousetrap = {

        /**
         * binds an event to mousetrap
         *
         * can be a single key, a combination of keys separated with +,
         * an array of keys, or a sequence of keys separated by spaces
         *
         * be sure to list the modifier keys first to make sure that the
         * correct key ends up getting bound (the last key in the pattern)
         *
         * @param {string|Array} keys
         * @param {Function} callback
         * @param {string=} action - 'keypress', 'keydown', or 'keyup'
         * @returns void
         */
        bind: function(keys, callback, action) {
            keys = keys instanceof Array ? keys : [keys];
            _bindMultiple(keys, callback, action);
            return this;
        },

        /**
         * unbinds an event to mousetrap
         *
         * the unbinding sets the callback function of the specified key combo
         * to an empty function and deletes the corresponding key in the
         * _directMap dict.
         *
         * TODO: actually remove this from the _callbacks dictionary instead
         * of binding an empty function
         *
         * the keycombo+action has to be exactly the same as
         * it was defined in the bind method
         *
         * @param {string|Array} keys
         * @param {string} action
         * @returns void
         */
        unbind: function(keys, action) {
            return Mousetrap.bind(keys, function() {}, action);
        },

        /**
         * triggers an event that has already been bound
         *
         * @param {string} keys
         * @param {string=} action
         * @returns void
         */
        trigger: function(keys, action) {
            if (_directMap[keys + ':' + action]) {
                _directMap[keys + ':' + action]({}, keys);
            }
            return this;
        },

        /**
         * resets the library back to its initial state.  this is useful
         * if you want to clear out the current keyboard shortcuts and bind
         * new ones - for example if you switch to another page
         *
         * @returns void
         */
        reset: function() {
            _callbacks = {};
            _directMap = {};
            return this;
        },

       /**
        * should we stop this event before firing off callbacks
        *
        * @param {Event} e
        * @param {Element} element
        * @return {boolean}
        */
        stopCallback: function(e, element) {

            // if the element has the class "mousetrap" then no need to stop
            if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
                return false;
            }

            // stop for input, select, and textarea
            return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
        },

        /**
         * exposes _handleKey publicly so it can be overwritten by extensions
         */
        handleKey: _handleKey
    };

    // expose mousetrap to the global object
    window.Mousetrap = Mousetrap;

    // expose mousetrap as an AMD module
    if (typeof define === 'function' && define.amd) {
        define(Mousetrap);
    }
}) (window, document);

},{}],5:[function(require,module,exports){
(function( factory ) {
	if (typeof define !== 'undefined' && define.amd) {
		define([], factory);
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = factory();
	} else {
		window.scrollMonitor = factory();
	}
})(function() {

	var scrollTop = function() {
		return window.pageYOffset ||
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
	};

	var exports = {};

	var watchers = [];

	var VISIBILITYCHANGE = 'visibilityChange';
	var ENTERVIEWPORT = 'enterViewport';
	var FULLYENTERVIEWPORT = 'fullyEnterViewport';
	var EXITVIEWPORT = 'exitViewport';
	var PARTIALLYEXITVIEWPORT = 'partiallyExitViewport';
	var LOCATIONCHANGE = 'locationChange';
	var STATECHANGE = 'stateChange';

	var eventTypes = [
		VISIBILITYCHANGE,
		ENTERVIEWPORT,
		FULLYENTERVIEWPORT,
		EXITVIEWPORT,
		PARTIALLYEXITVIEWPORT,
		LOCATIONCHANGE,
		STATECHANGE
	];

	var defaultOffsets = {top: 0, bottom: 0};

	var getViewportHeight = function() {
		return window.innerHeight || document.documentElement.clientHeight;
	};

	var getDocumentHeight = function() {
		// jQuery approach
		// whichever is greatest
		return Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.documentElement.clientHeight
		);
	};

	exports.viewportTop = null;
	exports.viewportBottom = null;
	exports.documentHeight = null;
	exports.viewportHeight = getViewportHeight();

	var previousDocumentHeight;
	var latestEvent;

	var calculateViewportI;
	function calculateViewport() {
		exports.viewportTop = scrollTop();
		exports.viewportBottom = exports.viewportTop + exports.viewportHeight;
		exports.documentHeight = getDocumentHeight();
		if (exports.documentHeight !== previousDocumentHeight) {
			calculateViewportI = watchers.length;
			while( calculateViewportI-- ) {
				watchers[calculateViewportI].recalculateLocation();
			}
			previousDocumentHeight = exports.documentHeight;
		}
	}

	function recalculateWatchLocationsAndTrigger() {
		exports.viewportHeight = getViewportHeight();
		calculateViewport();
		updateAndTriggerWatchers();
	}

	var recalculateAndTriggerTimer;
	function debouncedRecalcuateAndTrigger() {
		clearTimeout(recalculateAndTriggerTimer);
		recalculateAndTriggerTimer = setTimeout( recalculateWatchLocationsAndTrigger, 100 );
	}

	var updateAndTriggerWatchersI;
	function updateAndTriggerWatchers() {
		// update all watchers then trigger the events so one can rely on another being up to date.
		updateAndTriggerWatchersI = watchers.length;
		while( updateAndTriggerWatchersI-- ) {
			watchers[updateAndTriggerWatchersI].update();
		}

		updateAndTriggerWatchersI = watchers.length;
		while( updateAndTriggerWatchersI-- ) {
			watchers[updateAndTriggerWatchersI].triggerCallbacks();
		}

	}

	function ElementWatcher( watchItem, offsets ) {
		var self = this;

		this.watchItem = watchItem;

		if (!offsets) {
			this.offsets = defaultOffsets;
		} else if (offsets === +offsets) {
			this.offsets = {top: offsets, bottom: offsets};
		} else {
			this.offsets = {
				top: offsets.top || defaultOffsets.top,
				bottom: offsets.bottom || defaultOffsets.bottom
			};
		}

		this.callbacks = {}; // {callback: function, isOne: true }

		for (var i = 0, j = eventTypes.length; i < j; i++) {
			self.callbacks[eventTypes[i]] = [];
		}

		this.locked = false;

		var wasInViewport;
		var wasFullyInViewport;
		var wasAboveViewport;
		var wasBelowViewport;

		var listenerToTriggerListI;
		var listener;
		function triggerCallbackArray( listeners ) {
			if (listeners.length === 0) {
				return;
			}
			listenerToTriggerListI = listeners.length;
			while( listenerToTriggerListI-- ) {
				listener = listeners[listenerToTriggerListI];
				listener.callback.call( self, latestEvent );
				if (listener.isOne) {
					listeners.splice(listenerToTriggerListI, 1);
				}
			}
		}
		this.triggerCallbacks = function triggerCallbacks() {

			if (this.isInViewport && !wasInViewport) {
				triggerCallbackArray( this.callbacks[ENTERVIEWPORT] );
			}
			if (this.isFullyInViewport && !wasFullyInViewport) {
				triggerCallbackArray( this.callbacks[FULLYENTERVIEWPORT] );
			}


			if (this.isAboveViewport !== wasAboveViewport &&
				this.isBelowViewport !== wasBelowViewport) {

				triggerCallbackArray( this.callbacks[VISIBILITYCHANGE] );

				// if you skip completely past this element
				if (!wasFullyInViewport && !this.isFullyInViewport) {
					triggerCallbackArray( this.callbacks[FULLYENTERVIEWPORT] );
					triggerCallbackArray( this.callbacks[PARTIALLYEXITVIEWPORT] );
				}
				if (!wasInViewport && !this.isInViewport) {
					triggerCallbackArray( this.callbacks[ENTERVIEWPORT] );
					triggerCallbackArray( this.callbacks[EXITVIEWPORT] );
				}
			}

			if (!this.isFullyInViewport && wasFullyInViewport) {
				triggerCallbackArray( this.callbacks[PARTIALLYEXITVIEWPORT] );
			}
			if (!this.isInViewport && wasInViewport) {
				triggerCallbackArray( this.callbacks[EXITVIEWPORT] );
			}
			if (this.isInViewport !== wasInViewport) {
				triggerCallbackArray( this.callbacks[VISIBILITYCHANGE] );
			}
			switch( true ) {
				case wasInViewport !== this.isInViewport:
				case wasFullyInViewport !== this.isFullyInViewport:
				case wasAboveViewport !== this.isAboveViewport:
				case wasBelowViewport !== this.isBelowViewport:
					triggerCallbackArray( this.callbacks[STATECHANGE] );
			}

			wasInViewport = this.isInViewport;
			wasFullyInViewport = this.isFullyInViewport;
			wasAboveViewport = this.isAboveViewport;
			wasBelowViewport = this.isBelowViewport;

		};

		this.recalculateLocation = function() {
			if (this.locked) {
				return;
			}
			var previousTop = this.top;
			var previousBottom = this.bottom;
			if (this.watchItem.nodeName) { // a dom element
				var cachedDisplay = this.watchItem.style.display;
				if (cachedDisplay === 'none') {
					this.watchItem.style.display = '';
				}

				var boundingRect = this.watchItem.getBoundingClientRect();
				this.top = boundingRect.top + exports.viewportTop;
				this.bottom = boundingRect.bottom + exports.viewportTop;

				if (cachedDisplay === 'none') {
					this.watchItem.style.display = cachedDisplay;
				}

			} else if (this.watchItem === +this.watchItem) { // number
				if (this.watchItem > 0) {
					this.top = this.bottom = this.watchItem;
				} else {
					this.top = this.bottom = exports.documentHeight - this.watchItem;
				}

			} else { // an object with a top and bottom property
				this.top = this.watchItem.top;
				this.bottom = this.watchItem.bottom;
			}

			this.top -= this.offsets.top;
			this.bottom += this.offsets.bottom;
			this.height = this.bottom - this.top;

			if ( (previousTop !== undefined || previousBottom !== undefined) && (this.top !== previousTop || this.bottom !== previousBottom) ) {
				triggerCallbackArray( this.callbacks[LOCATIONCHANGE] );
			}
		};

		this.recalculateLocation();
		this.update();

		wasInViewport = this.isInViewport;
		wasFullyInViewport = this.isFullyInViewport;
		wasAboveViewport = this.isAboveViewport;
		wasBelowViewport = this.isBelowViewport;
	}

	ElementWatcher.prototype = {
		on: function( event, callback, isOne ) {

			// trigger the event if it applies to the element right now.
			switch( true ) {
				case event === VISIBILITYCHANGE && !this.isInViewport && this.isAboveViewport:
				case event === ENTERVIEWPORT && this.isInViewport:
				case event === FULLYENTERVIEWPORT && this.isFullyInViewport:
				case event === EXITVIEWPORT && this.isAboveViewport && !this.isInViewport:
				case event === PARTIALLYEXITVIEWPORT && this.isAboveViewport:
					callback.call( this, latestEvent );
					if (isOne) {
						return;
					}
			}

			if (this.callbacks[event]) {
				this.callbacks[event].push({callback: callback, isOne: isOne||false});
			} else {
				throw new Error('Tried to add a scroll monitor listener of type '+event+'. Your options are: '+eventTypes.join(', '));
			}
		},
		off: function( event, callback ) {
			if (this.callbacks[event]) {
				for (var i = 0, item; item = this.callbacks[event][i]; i++) {
					if (item.callback === callback) {
						this.callbacks[event].splice(i, 1);
						break;
					}
				}
			} else {
				throw new Error('Tried to remove a scroll monitor listener of type '+event+'. Your options are: '+eventTypes.join(', '));
			}
		},
		one: function( event, callback ) {
			this.on( event, callback, true);
		},
		recalculateSize: function() {
			this.height = this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom;
			this.bottom = this.top + this.height;
		},
		update: function() {
			this.isAboveViewport = this.top < exports.viewportTop;
			this.isBelowViewport = this.bottom > exports.viewportBottom;

			this.isInViewport = (this.top <= exports.viewportBottom && this.bottom >= exports.viewportTop);
			this.isFullyInViewport = (this.top >= exports.viewportTop && this.bottom <= exports.viewportBottom) ||
								 (this.isAboveViewport && this.isBelowViewport);

		},
		destroy: function() {
			var index = watchers.indexOf(this),
				self  = this;
			watchers.splice(index, 1);
			for (var i = 0, j = eventTypes.length; i < j; i++) {
				self.callbacks[eventTypes[i]].length = 0;
			}
		},
		// prevent recalculating the element location
		lock: function() {
			this.locked = true;
		},
		unlock: function() {
			this.locked = false;
		}
	};

	var eventHandlerFactory = function (type) {
		return function( callback, isOne ) {
			this.on.call(this, type, callback, isOne);
		};
	};

	for (var i = 0, j = eventTypes.length; i < j; i++) {
		var type =  eventTypes[i];
		ElementWatcher.prototype[type] = eventHandlerFactory(type);
	}

	try {
		calculateViewport();
	} catch (e) {
		try {
			window.$(calculateViewport);
		} catch (e) {
			throw new Error('If you must put scrollMonitor in the <head>, you must use jQuery.');
		}
	}

	function scrollMonitorListener(event) {
		latestEvent = event;
		calculateViewport();
		updateAndTriggerWatchers();
	}

	if (window.addEventListener) {
		window.addEventListener('scroll', scrollMonitorListener);
		window.addEventListener('resize', debouncedRecalcuateAndTrigger);
	} else {
		// Old IE support
		window.attachEvent('onscroll', scrollMonitorListener);
		window.attachEvent('onresize', debouncedRecalcuateAndTrigger);
	}

	exports.beget = exports.create = function( element, offsets ) {
		if (typeof element === 'string') {
			element = document.querySelector(element);
		} else if (element && element.length > 0) {
			element = element[0];
		}

		var watcher = new ElementWatcher( element, offsets );
		watchers.push(watcher);
		watcher.update();
		return watcher;
	};

	exports.update = function() {
		latestEvent = null;
		calculateViewport();
		updateAndTriggerWatchers();
	};
	exports.recalculateLocations = function() {
		exports.documentHeight = 0;
		exports.update();
	};

	return exports;
});

},{}],6:[function(require,module,exports){
module.exports={
  "name": "clappr",
  "version": "0.0.86",
  "description": "An extensible media player for the web",
  "main": "dist/clappr.min.js",
  "scripts": {
    "test": "./node_modules/.bin/gulp release && ./node_modules/.bin/karma start --single-run --browsers Firefox"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com:globocom/clappr.git"
  },
  "author": "Globo.com",
  "license": "BSD",
  "bugs": {
    "url": "https://github.com/globocom/clappr/issues"
  },
  "browser": {
    "zepto": "clappr-zepto"
  },
  "homepage": "https://github.com/globocom/clappr",
  "devDependencies": {
    "browserify": "^8.0.3",
    "chai": "1.10.0",
    "compass-mixins": "0.12.3",
    "dotenv": "^0.4.0",
    "es6ify": "~1.4.0",
    "exorcist": "^0.1.6",
    "express": "^4.6.1",
    "express-alias": "0.4.0",
    "glob": "^4.0.2",
    "gulp": "^3.8.1",
    "clappr-zepto": "0.0.3",
    "gulp-compressor": "^0.1.0",
    "gulp-jshint": "1.9.0",
    "gulp-livereload": "^2.1.0",
    "gulp-minify-css": "~0.3.5",
    "gulp-rename": "^1.2.0",
    "gulp-sass": "1.0.0",
    "gulp-streamify": "0.0.5",
    "gulp-uglify": "^1.0.1",
    "gulp-util": "3.0.1",
    "karma": "^0.12.17",
    "karma-browserify": "^1.0.0",
    "karma-chai": "^0.1.0",
    "karma-chrome-launcher": "^0.1.4",
    "karma-cli": "0.0.4",
    "karma-firefox-launcher": "^0.1.3",
    "karma-jasmine": "^0.2.2",
    "karma-jquery": "^0.1.0",
    "karma-mocha": "^0.1.4",
    "karma-safari-launcher": "^0.1.1",
    "karma-sinon": "^1.0.3",
    "karma-sinon-chai": "^0.2.0",
    "mkdirp": "^0.5.0",
    "s3": "^4.1.1",
    "scp": "0.0.3",
    "sinon": "^1.10.2",
    "traceur": "0.0.72",
    "vinyl-source-stream": "^1.0.0",
    "vinyl-transform": "0.0.1",
    "watchify": "^2.0.0",
    "yargs": "1.3.3"
  },
  "dependencies": {
    "underscore": "1.7.0",
    "mousetrap": "^1.4.6",
    "scrollmonitor": "^1.0.8"
  }
}

},{}],7:[function(require,module,exports){
"use strict";
var _ = require('underscore');
module.exports = {
  'media_control': _.template('<div class="media-control-background" data-background></div><div class="media-control-layer" data-controls><% var renderBar=function(name) { %><div class="bar-container" data-<%= name %>><div class="bar-background" data-<%= name %>><div class="bar-fill-1" data-<%= name %>></div><div class="bar-fill-2" data-<%= name %>></div><div class="bar-hover" data-<%= name %>></div></div><div class="bar-scrubber" data-<%= name %>><div class="bar-scrubber-icon" data-<%= name %>></div></div></div><% }; %><% var renderSegmentedBar=function(name, segments) { segments=segments || 10; %><div class="bar-container" data-<%= name %>><% for (var i = 0; i < segments; i++) { %><div class="segmented-bar-element" data-<%= name %>></div><% } %></div><% }; %><% var renderDrawer=function(name, renderContent) { %><div class="drawer-container" data-<%= name %>><div class="drawer-icon-container" data-<%= name %>><div class="drawer-icon media-control-icon" data-<%= name %>></div><span class="drawer-text" data-<%= name %>></span></div><% renderContent(name); %></div><% }; %><% var renderIndicator=function(name) { %><div class="media-control-indicator" data-<%= name %>></div><% }; %><% var renderButton=function(name) { %><button class="media-control-button media-control-icon" data-<%= name %>></button><% }; %><% var templates={ bar: renderBar, segmentedBar: renderSegmentedBar, }; var render=function(settingsList) { _.each(settingsList, function(setting) { if(setting === "seekbar") { renderBar(setting); } else if (setting === "volume") { renderDrawer(setting, settings.volumeBarTemplate ? templates[settings.volumeBarTemplate] : function(name) { return renderSegmentedBar(name); }); } else if (setting === "duration" || setting=== "position") { renderIndicator(setting); } else { renderButton(setting); } }); }; %><% if (settings.default && settings.default.length) { %><div class="media-control-center-panel" data-media-control><% render(settings.default); %></div><% } %><% if (settings.left && settings.left.length) { %><div class="media-control-left-panel" data-media-control><% render(settings.left); %></div><% } %><% if (settings.right && settings.right.length) { %><div class="media-control-right-panel" data-media-control><% render(settings.right); %></div><% } %></div>'),
  'seek_time': _.template('<span data-seek-time></span>'),
  'flash': _.template('<param name="movie" value="<%= swfPath %>"><param name="quality" value="autohigh"><param name="swliveconnect" value="true"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#001122"><param name="allowFullScreen" value="false"><param name="wmode" value="transparent"><param name="tabindex" value="1"><param name=FlashVars value="playbackId=<%= playbackId %>" /><embed type="application/x-shockwave-flash" disabled tabindex="-1" enablecontextmenu="false" allowScriptAccess="always" quality="autohight" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent" swliveconnect="true" type="application/x-shockwave-flash" allowfullscreen="false" bgcolor="#000000" FlashVars="playbackId=<%= playbackId %>" src="<%= swfPath %>"></embed>'),
  'hls': _.template('<param name="movie" value="<%= swfPath %>?inline=1"><param name="quality" value="autohigh"><param name="swliveconnect" value="true"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#001122"><param name="allowFullScreen" value="false"><param name="wmode" value="transparent"><param name="tabindex" value="1"><param name=FlashVars value="playbackId=<%= playbackId %>" /><embed type="application/x-shockwave-flash" tabindex="1" enablecontextmenu="false" allowScriptAccess="always" quality="autohigh" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent" swliveconnect="true" type="application/x-shockwave-flash" allowfullscreen="false" bgcolor="#000000" FlashVars="playbackId=<%= playbackId %>" src="<%= swfPath %>" width="100%" height="100%"></embed>'),
  'html5_video': _.template('<source src="<%=src%>" type="<%=type%>">'),
  'no_op': _.template('<p data-no-op-msg>Something went wrong :(</p>'),
  'background_button': _.template('<div class="background-button-wrapper" data-background-button><button class="background-button-icon" data-background-button></button></div>'),
  'dvr_controls': _.template('<div class="live-info">LIVE</div><button class="live-button">BACK TO LIVE</button>'),
  'poster': _.template('<div class="play-wrapper" data-poster><span class="poster-icon play" data-poster/></div>'),
  'spinner_three_bounce': _.template('<div data-bounce1></div><div data-bounce2></div><div data-bounce3></div>'),
  'watermark': _.template('<div data-watermark data-watermark-<%=position %>><img src="<%= imageUrl %>"></div>'),
  CSS: {
    'container': '.container[data-container]{position:absolute;background-color:#000;height:100%;width:100%}.container[data-container].pointer-enabled{cursor:pointer}',
    'core': '[data-player]{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0);position:relative;margin:0;padding:0;border:0;font-style:normal;font-weight:400;text-align:center;overflow:hidden;font-size:100%;font-family:"lucida grande",tahoma,verdana,arial,sans-serif;text-shadow:0 0 0;box-sizing:border-box}[data-player] a,[data-player] abbr,[data-player] acronym,[data-player] address,[data-player] applet,[data-player] article,[data-player] aside,[data-player] audio,[data-player] b,[data-player] big,[data-player] blockquote,[data-player] canvas,[data-player] caption,[data-player] center,[data-player] cite,[data-player] code,[data-player] dd,[data-player] del,[data-player] details,[data-player] dfn,[data-player] div,[data-player] dl,[data-player] dt,[data-player] em,[data-player] embed,[data-player] fieldset,[data-player] figcaption,[data-player] figure,[data-player] footer,[data-player] form,[data-player] h1,[data-player] h2,[data-player] h3,[data-player] h4,[data-player] h5,[data-player] h6,[data-player] header,[data-player] hgroup,[data-player] i,[data-player] iframe,[data-player] img,[data-player] ins,[data-player] kbd,[data-player] label,[data-player] legend,[data-player] li,[data-player] mark,[data-player] menu,[data-player] nav,[data-player] object,[data-player] ol,[data-player] output,[data-player] p,[data-player] pre,[data-player] q,[data-player] ruby,[data-player] s,[data-player] samp,[data-player] section,[data-player] small,[data-player] span,[data-player] strike,[data-player] strong,[data-player] sub,[data-player] summary,[data-player] sup,[data-player] table,[data-player] tbody,[data-player] td,[data-player] tfoot,[data-player] th,[data-player] thead,[data-player] time,[data-player] tr,[data-player] tt,[data-player] u,[data-player] ul,[data-player] var,[data-player] video{margin:0;padding:0;border:0;font:inherit;font-size:100%;vertical-align:baseline}[data-player] table{border-collapse:collapse;border-spacing:0}[data-player] caption,[data-player] td,[data-player] th{text-align:left;font-weight:400;vertical-align:middle}[data-player] blockquote,[data-player] q{quotes:none}[data-player] blockquote:after,[data-player] blockquote:before,[data-player] q:after,[data-player] q:before{content:"";content:none}[data-player] a img{border:none}[data-player] *{max-width:initial;box-sizing:inherit;float:initial}[data-player].fullscreen{width:100%;height:100%}[data-player].nocursor{cursor:none}[data-player] .clappr-style{display:none!important}@media screen{[data-player]{opacity:.99}}',
    'media_control': '@font-face{font-family:Player;src:url(http://cdn.clappr.io/latest/assets/Player-Regular.eot);src:url(http://cdn.clappr.io/latest/assets/Player-Regular.eot?#iefix) format("embedded-opentype"),url(http://cdn.clappr.io/latest/assets/Player-Regular.ttf) format("truetype"),url(http://cdn.clappr.io/latest/assets/Player-Regular.svg#player) format("svg")}.media-control-notransition{-webkit-transition:none!important;-webkit-transition-delay:0s;-moz-transition:none!important;-o-transition:none!important;transition:none!important}.media-control[data-media-control]{position:absolute;width:100%;height:100%;z-index:9999;pointer-events:none}.media-control[data-media-control].dragging{pointer-events:auto;cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control].dragging *{cursor:-webkit-grabbing!important;cursor:grabbing!important}.media-control[data-media-control] .media-control-background[data-background]{position:absolute;height:40%;width:100%;bottom:0;background-image:-owg(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-webkit(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-moz(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:-o(linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9)));background-image:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.9));-webkit-transition:opacity .6s;-webkit-transition-delay:ease-out;-moz-transition:opacity .6s ease-out;-o-transition:opacity .6s ease-out;transition:opacity .6s ease-out}.media-control[data-media-control] .media-control-icon{font-family:Player;font-weight:400;font-style:normal;font-size:26px;line-height:32px;letter-spacing:0;speak:none;color:#fff;opacity:.5;vertical-align:middle;text-align:left;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.media-control[data-media-control] .media-control-icon:hover{color:#fff;opacity:.75;text-shadow:rgba(255,255,255,.8) 0 0 5px}.media-control[data-media-control].media-control-hide .media-control-background[data-background]{opacity:0}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls]{bottom:-50px}.media-control[data-media-control].media-control-hide .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls]{position:absolute;bottom:7px;width:100%;height:32px;vertical-align:middle;pointer-events:auto;-webkit-transition:bottom .4s;-webkit-transition-delay:ease-out;-moz-transition:bottom .4s ease-out;-o-transition:bottom .4s ease-out;transition:bottom .4s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-left-panel[data-media-control]{position:absolute;top:0;left:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-center-panel[data-media-control]{height:100%;text-align:center;line-height:32px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-right-panel[data-media-control]{position:absolute;top:0;right:4px;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button{background-color:transparent;border:0;margin:0 6px;padding:0;cursor:pointer;display:inline-block}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button:focus{outline:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-play]:before{content:"\\e001"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-pause]:before{content:"\\e002"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-stop]:before{content:"\\e003"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]{float:right;background-color:transparent;border:0;height:100%}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen]:before{content:"\\e006"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-fullscreen].shrink:before{content:"\\e007"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]{cursor:default;float:right;background-color:transparent;border:0;height:100%;opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator]:before{content:"\\e008"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-hd-indicator].enabled:hover{opacity:1;text-shadow:none}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]:before{content:"\\e001"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].playing:before{content:"\\e002"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause].paused:before{content:"\\e001"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]{float:left;height:100%;font-size:20px}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop]:before{content:"\\e001"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].playing:before{content:"\\e003"}.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playstop].stopped:before{content:"\\e001"}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration],.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{display:inline-block;font-size:10px;color:#fff;cursor:default;line-height:32px;position:relative}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-position]{margin-left:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]{color:rgba(255,255,255,.5);margin-right:6px}.media-control[data-media-control] .media-control-layer[data-controls] .media-control-indicator[data-duration]:before{content:"|";margin:0 3px}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]{position:absolute;top:-20px;left:0;display:inline-block;vertical-align:middle;width:100%;height:25px;cursor:pointer}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar]{width:100%;height:1px;position:relative;top:12px;background-color:#666}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-1[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#c2c2c2;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{position:absolute;top:0;left:0;width:0;height:100%;background-color:#005aff;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0;position:absolute;top:-3px;width:5px;height:7px;background-color:rgba(255,255,255,.5);-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar]:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled{cursor:default}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar].seek-disabled:hover .bar-background[data-seekbar] .bar-hover[data-seekbar]{opacity:0}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar]{position:absolute;top:2px;left:0;width:20px;height:20px;opacity:1;-webkit-transition:all .1s;-webkit-transition-delay:ease-out;-moz-transition:all .1s ease-out;-o-transition:all .1s ease-out;transition:all .1s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-scrubber[data-seekbar] .bar-scrubber-icon[data-seekbar]{position:absolute;left:6px;top:6px;width:8px;height:8px;border-radius:10px;box-shadow:0 0 0 6px rgba(255,255,255,.2);background-color:#fff}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume]{float:right;display:inline-block;height:32px;cursor:pointer;margin:0 6px;box-sizing:border-box}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume]{float:left;bottom:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]{background-color:transparent;border:0;box-sizing:content-box;width:16px;height:32px;margin-right:6px;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:hover{opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume]:before{content:"\\e004"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted{opacity:.5}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:hover{opacity:.7}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .drawer-icon-container[data-volume] .drawer-icon[data-volume].muted:before{content:"\\e005"}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume]{float:left;position:relative;top:6px;width:42px;height:18px;padding:3px 0;overflow:hidden;-webkit-transition:width .2s;-webkit-transition-delay:ease-out;-moz-transition:width .2s ease-out;-o-transition:width .2s ease-out;transition:width .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]{float:left;width:4px;padding-left:2px;height:12px;opacity:.5;-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;-webkit-transition:-webkit-transform .2s;-webkit-transition-delay:ease-out;-moz-transition:-moz-transform .2s ease-out;-o-transition:-o-transform .2s ease-out;transition:transform .2s ease-out}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume].fill{-webkit-box-shadow:inset 2px 0 0 #fff;-moz-box-shadow:inset 2px 0 0 #fff;-ms-box-shadow:inset 2px 0 0 #fff;-o-box-shadow:inset 2px 0 0 #fff;box-shadow:inset 2px 0 0 #fff;opacity:1}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:nth-of-type(1){padding-left:0}.media-control[data-media-control] .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume] .segmented-bar-element[data-volume]:hover{-webkit-transform:scaleY(1.5);-moz-transform:scaleY(1.5);-ms-transform:scaleY(1.5);-o-transform:scaleY(1.5);transform:scaleY(1.5)}.media-control[data-media-control].w320 .media-control-layer[data-controls] .drawer-container[data-volume] .bar-container[data-volume].volume-bar-hide{height:12px;top:9px;padding:0;width:0}',
    'seek_time': '.seek-time[data-seek-time]{position:absolute;width:auto;height:20px;line-height:20px;bottom:55px;background-color:rgba(2,2,2,.5);z-index:9999;-webkit-transition:opacity .1s;-webkit-transition-delay:ease;-moz-transition:opacity .1s ease;-o-transition:opacity .1s ease;transition:opacity .1s ease}.seek-time[data-seek-time].hidden[data-seek-time]{opacity:0}.seek-time[data-seek-time] span[data-seek-time]{position:relative;color:#fff;font-size:10px;padding-left:7px;padding-right:7px}',
    'flash': '[data-flash]{position:absolute;height:100%;width:100%;background-color:#000;display:block;pointer-events:none}',
    'hls': '[data-hls]{position:absolute;height:100%;width:100%;background-color:#000;display:block;pointer-events:none;top:0}',
    'html5_video': '[data-html5-video]{position:absolute;height:100%;width:100%;display:block}',
    'html_img': '[data-html-img]{max-width:100%;max-height:100%}',
    'no_op': '[data-no-op]{z-index:1000;position:absolute;background-color:#222;height:100%;width:100%}[data-no-op] p[data-no-op-msg]{position:relative;font-size:25px;top:50%;color:#fff}',
    'background_button': '.background-button[data-background-button]{font-family:Player;position:absolute;height:100%;width:100%;background-color:rgba(0,0,0,.2);pointer-events:none;-webkit-transition:all .4s;-webkit-transition-delay:ease-out;-moz-transition:all .4s ease-out;-o-transition:all .4s ease-out;transition:all .4s ease-out}.background-button[data-background-button].hide{background-color:transparent}.background-button[data-background-button].hide .background-button-wrapper[data-background-button]{opacity:0}.background-button[data-background-button] .background-button-wrapper[data-background-button]{position:absolute;overflow:hidden;width:100%;height:25%;line-height:100%;font-size:25%;top:50%;text-align:center}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button]{cursor:pointer;pointer-events:auto;font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;color:#fff;opacity:.75;border:0;outline:0;background-color:transparent;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button]:hover{opacity:1;text-shadow:rgba(255,255,255,.8) 0 0 15px}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playing:before{content:"\\e002"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].notplaying:before{content:"\\e001"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playstop.playing:before{content:"\\e003"}.background-button[data-background-button] .background-button-wrapper[data-background-button] .background-button-icon[data-background-button].playstop.notplaying:before{content:"\\e001"}.media-control.media-control-hide[data-media-control] .background-button[data-background-button]{opacity:0}',
    'dvr_controls': '@import url(http://fonts.googleapis.com/css?family=Roboto);.dvr-controls[data-dvr-controls]{display:inline-block;float:left;color:#fff;line-height:32px;font-size:10px;font-weight:700;margin-left:6px}.dvr-controls[data-dvr-controls] .live-info{cursor:default;font-family:Roboto,"Open Sans",Arial,sans-serif}.dvr-controls[data-dvr-controls] .live-info:before{content:"";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#ff0101}.dvr-controls[data-dvr-controls] .live-info.disabled{opacity:.3}.dvr-controls[data-dvr-controls] .live-info.disabled:before{background-color:#fff}.dvr-controls[data-dvr-controls] .live-button{cursor:pointer;outline:0;display:none;border:0;color:#fff;background-color:transparent;height:32px;padding:0;opacity:.7;font-family:Roboto,"Open Sans",Arial,sans-serif;-webkit-transition:all .1s;-webkit-transition-delay:ease;-moz-transition:all .1s ease;-o-transition:all .1s ease;transition:all .1s ease}.dvr-controls[data-dvr-controls] .live-button:before{content:"";display:inline-block;position:relative;width:7px;height:7px;border-radius:3.5px;margin-right:3.5px;background-color:#fff}.dvr-controls[data-dvr-controls] .live-button:hover{opacity:1;text-shadow:rgba(255,255,255,.75) 0 0 5px}.dvr .dvr-controls[data-dvr-controls] .live-info{display:none}.dvr .dvr-controls[data-dvr-controls] .live-button{display:block}.dvr.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#005aff}.media-control.live[data-media-control] .media-control-layer[data-controls] .bar-container[data-seekbar] .bar-background[data-seekbar] .bar-fill-2[data-seekbar]{background-color:#ff0101}.seek-time[data-seek-time] span[data-duration]{position:relative;color:rgba(255,255,255,.5);font-size:10px;padding-right:7px}.seek-time[data-seek-time] span[data-duration]:before{content:"|";margin-right:7px}',
    'poster': '@font-face{font-family:Player;src:url(http://cdn.clappr.io/latest/assets/Player-Regular.eot);src:url(http://cdn.clappr.io/latest/assets/Player-Regular.eot?#iefix) format("embedded-opentype"),url(http://cdn.clappr.io/latest/assets/Player-Regular.ttf) format("truetype"),url(http://cdn.clappr.io/latest/assets/Player-Regular.svg#player) format("svg")}.player-poster[data-poster]{cursor:pointer;position:absolute;height:100%;width:100%;z-index:998;top:0}.player-poster[data-poster] .poster-background[data-poster]{width:100%;height:100%}.player-poster[data-poster] .play-wrapper[data-poster]{position:absolute;width:100%;height:25%;line-height:100%;font-size:25%;top:50%;text-align:center}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]{font-family:Player;font-weight:400;font-style:normal;line-height:1;letter-spacing:0;speak:none;color:#fff;opacity:.75;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-transition:opacity text-shadow;-webkit-transition-delay:.1s;-moz-transition:opacity text-shadow .1s;-o-transition:opacity text-shadow .1s;transition:opacity text-shadow .1s ease}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster].play[data-poster]:before{content:"\\e001"}.player-poster[data-poster] .play-wrapper[data-poster] .poster-icon[data-poster]:hover{opacity:1;text-shadow:rgba(255,255,255,.8) 0 0 15px}',
    'spinner_three_bounce': '.spinner-three-bounce[data-spinner]{position:absolute;margin:0 auto;width:70px;text-align:center;z-index:999;top:47%;left:0;right:0}.spinner-three-bounce[data-spinner]>div{width:18px;height:18px;background-color:#FFF;border-radius:100%;display:inline-block;-webkit-animation:bouncedelay 1.4s infinite ease-in-out;-moz-animation:bouncedelay 1.4s infinite ease-in-out;-ms-animation:bouncedelay 1.4s infinite ease-in-out;-o-animation:bouncedelay 1.4s infinite ease-in-out;animation:bouncedelay 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both}.spinner-three-bounce[data-spinner] [data-bounce1],.spinner-three-bounce[data-spinner] [data-bounce2]{-webkit-animation-delay:-.32s;-moz-animation-delay:-.32s;-ms-animation-delay:-.32s;-o-animation-delay:-.32s;animation-delay:-.32s}@-moz-keyframes bouncedelay{0%,100%,80%{-moz-transform:scale(0);transform:scale(0)}40%{-moz-transform:scale(1);transform:scale(1)}}@-webkit-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@-o-keyframes bouncedelay{0%,100%,80%{-o-transform:scale(0);transform:scale(0)}40%{-o-transform:scale(1);transform:scale(1)}}@-ms-keyframes bouncedelay{0%,100%,80%{-ms-transform:scale(0);transform:scale(0)}40%{-ms-transform:scale(1);transform:scale(1)}}@keyframes bouncedelay{0%,100%,80%{transform:scale(0)}40%{transform:scale(1)}}',
    'watermark': '[data-watermark]{position:absolute;margin:100px auto 0;width:70px;text-align:center;z-index:10}[data-watermark-bottom-left]{bottom:10px;left:10px}[data-watermark-bottom-right]{bottom:10px;right:42px}[data-watermark-top-left]{top:-95px;left:10px}[data-watermark-top-right]{top:-95px;right:37px}'
  }
};


},{"underscore":"underscore"}],8:[function(require,module,exports){
"use strict";
var $ = require('zepto');
var _ = require('underscore');
var JST = require('./jst');
var Styler = {getStyleFor: function(name, options) {
    options = options || {};
    return $('<style class="clappr-style"></style>').html(_.template(JST.CSS[name])(options))[0];
  }};
module.exports = Styler;


},{"./jst":7,"underscore":"underscore","zepto":"zepto"}],9:[function(require,module,exports){
"use strict";
var _ = require('underscore');
var Browser = require('browser');
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
var formatTime = function(time) {
  time = time * 1000;
  time = parseInt(time / 1000);
  var seconds = time % 60;
  time = parseInt(time / 60);
  var minutes = time % 60;
  time = parseInt(time / 60);
  var hours = time % 24;
  var out = "";
  if (hours && hours > 0)
    out += ("0" + hours).slice(-2) + ":";
  out += ("0" + minutes).slice(-2) + ":";
  out += ("0" + seconds).slice(-2);
  return out.trim();
};
var Fullscreen = {
  isFullscreen: function() {
    return document.webkitIsFullScreen || document.mozFullScreen || !!document.msFullscreenElement || window.iframeFullScreen;
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
var Config = function Config() {};
($traceurRuntime.createClass)(Config, {}, {
  _defaultConfig: function() {
    return {volume: {
        value: 100,
        parse: parseInt
      }};
  },
  _defaultValueFor: function(key) {
    try {
      return this._defaultConfig()[key]['parse'](this._defaultConfig()[key]['value']);
    } catch (e) {
      return undefined;
    }
  },
  _create_keyspace: function(key) {
    return 'clappr.' + document.domain + '.' + key;
  },
  restore: function(key) {
    if (Browser.hasLocalstorage && localStorage[this._create_keyspace(key)]) {
      return this._defaultConfig()[key]['parse'](localStorage[this._create_keyspace(key)]);
    }
    return this._defaultValueFor(key);
  },
  persist: function(key, value) {
    if (Browser.hasLocalstorage) {
      try {
        localStorage[this._create_keyspace(key)] = value;
        return true;
      } catch (e) {
        return false;
      }
    }
  }
});
var seekStringToSeconds = function(url) {
  var elements = _.rest(_.compact(url.match(/t=([0-9]*)h?([0-9]*)m?([0-9]*)s/))).reverse();
  var seconds = 0;
  var factor = 1;
  _.each(elements, function(el) {
    seconds += (parseInt(el) * factor);
    factor = factor * 60;
  }, this);
  return seconds;
};
module.exports = {
  extend: extend,
  formatTime: formatTime,
  Fullscreen: Fullscreen,
  Config: Config,
  seekStringToSeconds: seekStringToSeconds
};


},{"browser":"browser","underscore":"underscore"}],10:[function(require,module,exports){
"use strict";
var UIObject = require('ui_object');
var Styler = require('../../base/styler');
var _ = require('underscore');
var Events = require('events');
var Container = function Container(options) {
  $traceurRuntime.superCall(this, $Container.prototype, "constructor", [options]);
  this.playback = options.playback;
  this.settings = this.playback.settings;
  this.isReady = false;
  this.mediaControlDisabled = false;
  this.plugins = [this.playback];
  this.bindEvents();
};
var $Container = Container;
($traceurRuntime.createClass)(Container, {
  get name() {
    return 'Container';
  },
  get attributes() {
    return {
      class: 'container',
      'data-container': ''
    };
  },
  get events() {
    return {'click': 'clicked'};
  },
  bindEvents: function() {
    this.listenTo(this.playback, Events.PLAYBACK_PROGRESS, this.progress);
    this.listenTo(this.playback, Events.PLAYBACK_TIMEUPDATE, this.timeUpdated);
    this.listenTo(this.playback, Events.PLAYBACK_READY, this.ready);
    this.listenTo(this.playback, Events.PLAYBACK_BUFFERING, this.buffering);
    this.listenTo(this.playback, Events.PLAYBACK_BUFFERFULL, this.bufferfull);
    this.listenTo(this.playback, Events.PLAYBACK_SETTINGSUPDATE, this.settingsUpdate);
    this.listenTo(this.playback, Events.PLAYBACK_LOADEDMETADATA, this.loadedMetadata);
    this.listenTo(this.playback, Events.PLAYBACK_HIGHDEFINITIONUPDATE, this.highDefinitionUpdate);
    this.listenTo(this.playback, Events.PLAYBACK_BITRATE, this.updateBitrate);
    this.listenTo(this.playback, Events.PLAYBACK_PLAYBACKSTATE, this.playbackStateChanged);
    this.listenTo(this.playback, Events.PLAYBACK_DVR, this.playbackDvrStateChanged);
    this.listenTo(this.playback, Events.PLAYBACK_MEDIACONTROL_DISABLE, this.disableMediaControl);
    this.listenTo(this.playback, Events.PLAYBACK_MEDIACONTROL_ENABLE, this.enableMediaControl);
    this.listenTo(this.playback, Events.PLAYBACK_ENDED, this.ended);
    this.listenTo(this.playback, Events.PLAYBACK_PLAY, this.playing);
    this.listenTo(this.playback, Events.PLAYBACK_ERROR, this.error);
  },
  with: function(klass) {
    _.extend(this, klass);
    return this;
  },
  playbackStateChanged: function() {
    this.trigger(Events.CONTAINER_PLAYBACKSTATE);
  },
  playbackDvrStateChanged: function(dvrInUse) {
    this.settings = this.playback.settings;
    this.dvrInUse = dvrInUse;
    this.trigger(Events.CONTAINER_PLAYBACKDVRSTATECHANGED, dvrInUse);
  },
  updateBitrate: function(newBitrate) {
    this.trigger(Events.CONTAINER_BITRATE, newBitrate);
  },
  statsReport: function(metrics) {
    this.trigger(Events.CONTAINER_STATS_REPORT, metrics);
  },
  getPlaybackType: function() {
    return this.playback.getPlaybackType();
  },
  isDvrEnabled: function() {
    return !!this.playback.dvrEnabled;
  },
  isDvrInUse: function() {
    return !!this.dvrInUse;
  },
  destroy: function() {
    this.trigger(Events.CONTAINER_DESTROYED, this, this.name);
    this.playback.destroy();
    _(this.plugins).each((function(plugin) {
      return plugin.destroy();
    }));
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
    this.trigger(Events.CONTAINER_READY, this.name);
  },
  isPlaying: function() {
    return this.playback.isPlaying();
  },
  getDuration: function() {
    return this.playback.getDuration();
  },
  error: function(errorObj) {
    this.$el.append(errorObj.render().el);
    this.trigger(Events.CONTAINER_ERROR, {
      error: errorObj,
      container: this
    }, this.name);
  },
  loadedMetadata: function(duration) {
    this.trigger(Events.CONTAINER_LOADEDMETADATA, duration);
  },
  timeUpdated: function(position, duration) {
    this.trigger(Events.CONTAINER_TIMEUPDATE, position, duration, this.name);
  },
  progress: function(startPosition, endPosition, duration) {
    this.trigger(Events.CONTAINER_PROGRESS, startPosition, endPosition, duration, this.name);
  },
  playing: function() {
    this.trigger(Events.CONTAINER_PLAY, this.name);
  },
  play: function() {
    this.playback.play();
  },
  stop: function() {
    this.trigger(Events.CONTAINER_STOP, this.name);
    this.playback.stop();
  },
  pause: function() {
    this.trigger(Events.CONTAINER_PAUSE, this.name);
    this.playback.pause();
  },
  ended: function() {
    this.trigger(Events.CONTAINER_ENDED, this, this.name);
  },
  clicked: function() {
    this.trigger(Events.CONTAINER_CLICK, this, this.name);
  },
  setCurrentTime: function(time) {
    this.trigger(Events.CONTAINER_SEEK, time, this.name);
    this.playback.seek(time);
  },
  setVolume: function(value) {
    this.trigger(Events.CONTAINER_VOLUME, value, this.name);
    this.playback.volume(value);
  },
  fullscreen: function() {
    this.trigger(Events.CONTAINER_FULLSCREEN, this.name);
  },
  buffering: function() {
    this.trigger(Events.CONTAINER_STATE_BUFFERING, this.name);
  },
  bufferfull: function() {
    this.trigger(Events.CONTAINER_STATE_BUFFERFULL, this.name);
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
    this.trigger(Events.CONTAINER_SETTINGSUPDATE);
  },
  highDefinitionUpdate: function() {
    this.trigger(Events.CONTAINER_HIGHDEFINITIONUPDATE);
  },
  isHighDefinitionInUse: function() {
    return this.playback.isHighDefinitionInUse();
  },
  disableMediaControl: function() {
    this.mediaControlDisabled = true;
    this.trigger(Events.CONTAINER_MEDIACONTROL_DISABLE);
  },
  enableMediaControl: function() {
    this.mediaControlDisabled = false;
    this.trigger(Events.CONTAINER_MEDIACONTROL_ENABLE);
  },
  render: function() {
    var style = Styler.getStyleFor('container');
    this.$el.append(style);
    this.$el.append(this.playback.render().el);
    return this;
  }
}, {}, UIObject);
module.exports = Container;


},{"../../base/styler":8,"events":"events","ui_object":"ui_object","underscore":"underscore"}],11:[function(require,module,exports){
"use strict";
var _ = require('underscore');
var BaseObject = require('base_object');
var Container = require('container');
var $ = require('zepto');
var Events = require('events');
var ContainerFactory = function ContainerFactory(options, loader) {
  $traceurRuntime.superCall(this, $ContainerFactory.prototype, "constructor", [options]);
  this.options = options;
  this.loader = loader;
};
var $ContainerFactory = ContainerFactory;
($traceurRuntime.createClass)(ContainerFactory, {
  createContainers: function() {
    var $__0 = this;
    return $.Deferred((function(promise) {
      promise.resolve(_.map($__0.options.sources, (function(source) {
        return $__0.createContainer(source);
      }), $__0));
    }));
  },
  findPlaybackPlugin: function(source) {
    return _.find(this.loader.playbackPlugins, (function(p) {
      return p.canPlay(source.toString());
    }), this);
  },
  createContainer: function(source) {
    var playbackPlugin = this.findPlaybackPlugin(source);
    var options = _.extend({}, this.options, {
      src: source,
      autoPlay: !!this.options.autoPlay
    });
    var playback = new playbackPlugin(options);
    var container = new Container({playback: playback});
    var defer = $.Deferred();
    defer.promise(container);
    this.addContainerPlugins(container, source);
    this.listenToOnce(container, Events.CONTAINER_READY, (function() {
      return defer.resolve(container);
    }));
    return container;
  },
  addContainerPlugins: function(container, source) {
    _.each(this.loader.containerPlugins, function(Plugin) {
      var options = _.extend(this.options, {
        container: container,
        src: source
      });
      container.addPlugin(new Plugin(options));
    }, this);
  }
}, {}, BaseObject);
module.exports = ContainerFactory;


},{"base_object":"base_object","container":"container","events":"events","underscore":"underscore","zepto":"zepto"}],12:[function(require,module,exports){
"use strict";
module.exports = require('./container_factory');


},{"./container_factory":11}],13:[function(require,module,exports){
"use strict";
var _ = require('underscore');
var $ = require('zepto');
var UIObject = require('ui_object');
var ContainerFactory = require('../container_factory');
var Fullscreen = require('../../base/utils').Fullscreen;
var Styler = require('../../base/styler');
var MediaControl = require('media_control');
var PlayerInfo = require('player_info');
var Mediator = require('mediator');
var Events = require('events');
var Core = function Core(options) {
  var $__0 = this;
  $traceurRuntime.superCall(this, $Core.prototype, "constructor", [options]);
  PlayerInfo.options = options;
  this.options = options;
  this.plugins = [];
  this.containers = [];
  this.createContainers(options);
  $(document).bind('fullscreenchange', (function() {
    return $__0.exit();
  }));
  $(document).bind('MSFullscreenChange', (function() {
    return $__0.exit();
  }));
  $(document).bind('mozfullscreenchange', (function() {
    return $__0.exit();
  }));
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
  createContainers: function(options) {
    var $__0 = this;
    this.defer = $.Deferred();
    this.defer.promise(this);
    this.containerFactory = new ContainerFactory(options, options.loader);
    this.containerFactory.createContainers().then((function(containers) {
      return $__0.setupContainers(containers);
    })).then((function(containers) {
      return $__0.resolveOnContainersReady(containers);
    }));
  },
  updateSize: function() {
    if (Fullscreen.isFullscreen()) {
      this.setFullscreen();
    } else {
      this.setPlayerSize();
    }
    Mediator.trigger(Events.PLAYER_RESIZE);
  },
  setFullscreen: function() {
    this.$el.addClass('fullscreen');
    this.$el.removeAttr('style');
    PlayerInfo.previousSize = PlayerInfo.currentSize;
    PlayerInfo.currentSize = {
      width: $(window).width(),
      height: $(window).height()
    };
  },
  setPlayerSize: function() {
    this.$el.removeClass('fullscreen');
    PlayerInfo.currentSize = PlayerInfo.previousSize;
    PlayerInfo.previousSize = {
      width: $(window).width(),
      height: $(window).height()
    };
    this.resize(PlayerInfo.currentSize);
  },
  resize: function(options) {
    var size = _.pick(options, 'width', 'height');
    this.el.style.height = (size.height + "px");
    this.el.style.width = (size.width + "px");
    PlayerInfo.previousSize = PlayerInfo.currentSize;
    PlayerInfo.currentSize = size;
    Mediator.trigger(Events.PLAYER_RESIZE);
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
    sources = _.isArray(sources) ? sources : [sources.toString()];
    _(this.containers).each((function(container) {
      return container.destroy();
    }));
    this.containerFactory.options = _(this.options).extend({sources: sources});
    this.containerFactory.createContainers().then((function(containers) {
      $__0.setupContainers(containers);
    }));
  },
  destroy: function() {
    _(this.containers).each((function(container) {
      return container.destroy();
    }));
    _(this.plugins).each((function(plugin) {
      return plugin.destroy();
    }));
    this.$el.remove();
    this.mediaControl.destroy();
    $(document).unbind('fullscreenchange');
    $(document).unbind('MSFullscreenChange');
    $(document).unbind('mozfullscreenchange');
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
    this.stopListening(container);
    this.containers = _.without(this.containers, container);
  },
  appendContainer: function(container) {
    this.listenTo(container, Events.CONTAINER_DESTROYED, this.removeContainer);
    this.el.appendChild(container.render().el);
    this.containers.push(container);
  },
  setupContainers: function(containers) {
    _.map(containers, this.appendContainer, this);
    this.setupMediaControl(this.getCurrentContainer());
    this.render();
    this.$el.appendTo(this.options.parentElement);
    return containers;
  },
  createContainer: function(source) {
    var container = this.containerFactory.createContainer(source);
    this.appendContainer(container);
    return container;
  },
  setupMediaControl: function(container) {
    if (this.mediaControl) {
      this.mediaControl.setContainer(container);
    } else {
      this.mediaControl = this.createMediaControl(_.extend({container: container}, this.options));
      this.listenTo(this.mediaControl, Events.MEDIACONTROL_FULLSCREEN, this.toggleFullscreen);
      this.listenTo(this.mediaControl, Events.MEDIACONTROL_SHOW, this.onMediaControlShow.bind(this, true));
      this.listenTo(this.mediaControl, Events.MEDIACONTROL_HIDE, this.onMediaControlShow.bind(this, false));
    }
  },
  createMediaControl: function(options) {
    if (options.mediacontrol && options.mediacontrol.external) {
      return new options.mediacontrol.external(options);
    } else {
      return new MediaControl(options);
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
    var style = Styler.getStyleFor('core');
    this.$el.append(style);
    this.$el.append(this.mediaControl.render().el);
    this.options.width = this.options.width || this.$el.width();
    this.options.height = this.options.height || this.$el.height();
    PlayerInfo.previousSize = PlayerInfo.currentSize = _.pick(this.options, 'width', 'height');
    this.updateSize();
    return this;
  }
}, {}, UIObject);
module.exports = Core;


},{"../../base/styler":8,"../../base/utils":9,"../container_factory":12,"events":"events","media_control":"media_control","mediator":"mediator","player_info":"player_info","ui_object":"ui_object","underscore":"underscore","zepto":"zepto"}],14:[function(require,module,exports){
"use strict";
var _ = require('underscore');
var BaseObject = require('base_object');
var Core = require('core');
var CoreFactory = function CoreFactory(player, loader) {
  this.player = player;
  this.options = player.options;
  this.loader = loader;
  this.options.loader = this.loader;
};
($traceurRuntime.createClass)(CoreFactory, {
  create: function() {
    this.core = new Core(this.options);
    this.core.then(this.addCorePlugins.bind(this));
    return this.core;
  },
  addCorePlugins: function() {
    _.each(this.loader.corePlugins, function(Plugin) {
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
}, {}, BaseObject);
module.exports = CoreFactory;


},{"base_object":"base_object","core":"core","underscore":"underscore"}],15:[function(require,module,exports){
"use strict";
module.exports = require('./core_factory');


},{"./core_factory":14}],16:[function(require,module,exports){
"use strict";
var BaseObject = require('base_object');
var $ = require('zepto');
var Player = require('../player');
var IframePlayer = function IframePlayer(options) {
  $traceurRuntime.superCall(this, $IframePlayer.prototype, "constructor", [options]);
  this.options = options;
  this.createIframe();
};
var $IframePlayer = IframePlayer;
($traceurRuntime.createClass)(IframePlayer, {
  createIframe: function() {
    this.iframe = document.createElement("iframe");
    this.iframe.setAttribute("frameborder", 0);
    this.iframe.setAttribute("id", this.uniqueId);
    this.iframe.setAttribute("allowfullscreen", true);
    this.iframe.setAttribute("scrolling", "no");
    this.iframe.setAttribute("src", "http://cdn.clappr.io/latest/assets/iframe.htm" + this.buildQueryString());
    this.iframe.setAttribute('width', this.options.width);
    this.iframe.setAttribute('height', this.options.height);
  },
  attachTo: function(element) {
    element.appendChild(this.iframe);
  },
  addEventListeners: function() {
    var $__0 = this;
    this.iframe.contentWindow.addEventListener("fullscreenchange", (function() {
      return $__0.updateSize();
    }));
    this.iframe.contentWindow.addEventListener("webkitfullscreenchange", (function() {
      return $__0.updateSize();
    }));
    this.iframe.contentWindow.addEventListener("mozfullscreenchange", (function() {
      return $__0.updateSize();
    }));
  },
  buildQueryString: function() {
    var result = "";
    for (var param in this.options) {
      result += !!result ? "&" : "?";
      result += encodeURIComponent(param) + "=" + encodeURIComponent(this.options[param]);
    }
    return result;
  }
}, {}, BaseObject);
module.exports = IframePlayer;


},{"../player":21,"base_object":"base_object","zepto":"zepto"}],17:[function(require,module,exports){
"use strict";
module.exports = require('./iframe_player');


},{"./iframe_player":16}],18:[function(require,module,exports){
"use strict";
module.exports = require('./loader');


},{"./loader":19}],19:[function(require,module,exports){
"use strict";
var BaseObject = require('base_object');
var _ = require('underscore');
var PlayerInfo = require('player_info');
var HTML5VideoPlayback = require('html5_video');
var FlashVideoPlayback = require('flash');
var HTML5AudioPlayback = require('html5_audio');
var HLSVideoPlayback = require('hls');
var HTMLImgPlayback = require('html_img');
var NoOp = require('../../playbacks/no_op');
var SpinnerThreeBouncePlugin = require('../../plugins/spinner_three_bounce');
var StatsPlugin = require('../../plugins/stats');
var WaterMarkPlugin = require('../../plugins/watermark');
var PosterPlugin = require('poster');
var GoogleAnalyticsPlugin = require('../../plugins/google_analytics');
var ClickToPausePlugin = require('../../plugins/click_to_pause');
var BackgroundButton = require('../../plugins/background_button');
var DVRControls = require('../../plugins/dvr_controls');
var Loader = function Loader(externalPlugins) {
  $traceurRuntime.superCall(this, $Loader.prototype, "constructor", []);
  this.playbackPlugins = [FlashVideoPlayback, HTML5VideoPlayback, HTML5AudioPlayback, HLSVideoPlayback, HTMLImgPlayback, NoOp];
  this.containerPlugins = [SpinnerThreeBouncePlugin, WaterMarkPlugin, PosterPlugin, StatsPlugin, GoogleAnalyticsPlugin, ClickToPausePlugin];
  this.corePlugins = [BackgroundButton, DVRControls];
  if (externalPlugins) {
    this.addExternalPlugins(externalPlugins);
  }
};
var $Loader = Loader;
($traceurRuntime.createClass)(Loader, {
  addExternalPlugins: function(plugins) {
    var pluginName = function(plugin) {
      return plugin.prototype.name;
    };
    if (plugins.playback) {
      this.playbackPlugins = _.uniq(plugins.playback.concat(this.playbackPlugins), pluginName);
    }
    if (plugins.container) {
      this.containerPlugins = _.uniq(plugins.container.concat(this.containerPlugins), pluginName);
    }
    if (plugins.core) {
      this.corePlugins = _.uniq(plugins.core.concat(this.corePlugins), pluginName);
    }
    PlayerInfo.playbackPlugins = this.playbackPlugins;
  },
  getPlugin: function(name) {
    var allPlugins = _.union(this.containerPlugins, this.playbackPlugins, this.corePlugins);
    return _.find(allPlugins, function(plugin) {
      return plugin.prototype.name === name;
    });
  }
}, {}, BaseObject);
module.exports = Loader;


},{"../../playbacks/no_op":29,"../../plugins/background_button":32,"../../plugins/click_to_pause":34,"../../plugins/dvr_controls":36,"../../plugins/google_analytics":38,"../../plugins/spinner_three_bounce":42,"../../plugins/stats":44,"../../plugins/watermark":46,"base_object":"base_object","flash":"flash","hls":"hls","html5_audio":"html5_audio","html5_video":"html5_video","html_img":"html_img","player_info":"player_info","poster":"poster","underscore":"underscore"}],20:[function(require,module,exports){
"use strict";
var _ = require('underscore');
var $ = require('zepto');
var JST = require('../../base/jst');
var Styler = require('../../base/styler');
var UIObject = require('ui_object');
var Utils = require('../../base/utils');
var SeekTime = require('../seek_time');
var Mediator = require('mediator');
var PlayerInfo = require('player_info');
var Events = require('events');
require('mousetrap');
var MediaControl = function MediaControl(options) {
  var $__0 = this;
  $traceurRuntime.superCall(this, $MediaControl.prototype, "constructor", [options]);
  this.seekTime = new SeekTime(this);
  this.options = options;
  this.mute = this.options.mute;
  this.persistConfig = this.options.persistConfig;
  this.container = options.container;
  var initialVolume = (this.persistConfig) ? Utils.Config.restore("volume") : 100;
  this.setVolume(this.mute ? 0 : initialVolume);
  this.keepVisible = false;
  this.addEventListeners();
  this.settings = {
    left: ['play', 'stop', 'pause'],
    right: ['volume'],
    default: ['position', 'seekbar', 'duration']
  };
  this.settings = _.isEmpty(this.container.settings) ? this.settings : this.container.settings;
  this.disabled = false;
  if (this.container.mediaControlDisabled || this.options.chromeless) {
    this.disable();
  }
  $(document).bind('mouseup', (function(event) {
    return $__0.stopDrag(event);
  }));
  $(document).bind('mousemove', (function(event) {
    return $__0.updateDrag(event);
  }));
  Mediator.on(Events.PLAYER_RESIZE, (function() {
    return $__0.playerResize();
  }));
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
      'click .bar-container[data-seekbar]': 'seek',
      'click .bar-container[data-volume]': 'volume',
      'click .drawer-icon[data-volume]': 'toggleMute',
      'mouseenter .drawer-container[data-volume]': 'showVolumeBar',
      'mouseleave .drawer-container[data-volume]': 'hideVolumeBar',
      'mousedown .bar-scrubber[data-volume]': 'startVolumeDrag',
      'mousedown .bar-scrubber[data-seekbar]': 'startSeekDrag',
      'mousemove .bar-container[data-seekbar]': 'mousemoveOnSeekBar',
      'mouseleave .bar-container[data-seekbar]': 'mouseleaveOnSeekBar',
      'mouseenter .media-control-layer[data-controls]': 'setKeepVisible',
      'mouseleave .media-control-layer[data-controls]': 'resetKeepVisible'
    };
  },
  get template() {
    return JST.media_control;
  },
  addEventListeners: function() {
    this.listenTo(this.container, Events.CONTAINER_PLAY, this.changeTogglePlay);
    this.listenTo(this.container, Events.CONTAINER_TIMEUPDATE, this.updateSeekBar);
    this.listenTo(this.container, Events.CONTAINER_PROGRESS, this.updateProgressBar);
    this.listenTo(this.container, Events.CONTAINER_SETTINGSUPDATE, this.settingsUpdate);
    this.listenTo(this.container, Events.CONTAINER_PLAYBACKDVRSTATECHANGED, this.settingsUpdate);
    this.listenTo(this.container, Events.CONTAINER_HIGHDEFINITIONUPDATE, this.highDefinitionUpdate);
    this.listenTo(this.container, Events.CONTAINER_MEDIACONTROL_DISABLE, this.disable);
    this.listenTo(this.container, Events.CONTAINER_MEDIACONTROL_ENABLE, this.enable);
    this.listenTo(this.container, Events.CONTAINER_ENDED, this.ended);
  },
  disable: function() {
    this.disabled = true;
    this.hide();
    this.$el.hide();
  },
  enable: function() {
    if (this.options.chromeless)
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
      this.trigger(Events.MEDIACONTROL_PLAYING);
    } else {
      this.$playPauseToggle.removeClass('playing').addClass('paused');
      this.$playStopToggle.removeClass('playing').addClass('stopped');
      this.trigger(Events.MEDIACONTROL_NOTPLAYING);
    }
  },
  mousemoveOnSeekBar: function(event) {
    if (this.container.settings.seekEnabled) {
      var offsetX = event.pageX - this.$seekBarContainer.offset().left - (this.$seekBarHover.width() / 2);
      this.$seekBarHover.css({left: offsetX});
    }
    this.trigger(Events.MEDIACONTROL_MOUSEMOVE_SEEKBAR, event);
  },
  mouseleaveOnSeekBar: function(event) {
    this.trigger(Events.MEDIACONTROL_MOUSELEAVE_SEEKBAR, event);
  },
  playerResize: function() {
    if (Utils.Fullscreen.isFullscreen()) {
      this.$fullscreenToggle.addClass('shrink');
    } else {
      this.$fullscreenToggle.removeClass('shrink');
    }
    this.$el.removeClass('w320');
    if (PlayerInfo.currentSize.width <= 320) {
      this.$el.addClass('w320');
    }
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
    if (!this.container.settings.seekEnabled)
      return;
    this.draggingSeekBar = true;
    this.$el.addClass('dragging');
    this.$seekBarLoaded.addClass('media-control-notransition');
    this.$seekBarPosition.addClass('media-control-notransition');
    this.$seekBarScrubber.addClass('media-control-notransition');
    if (event) {
      event.preventDefault();
    }
  },
  startVolumeDrag: function(event) {
    this.draggingVolumeBar = true;
    this.$el.addClass('dragging');
    if (event) {
      event.preventDefault();
    }
  },
  stopDrag: function(event) {
    if (this.draggingSeekBar) {
      this.seek(event);
    }
    this.$el.removeClass('dragging');
    this.$seekBarLoaded.removeClass('media-control-notransition');
    this.$seekBarPosition.removeClass('media-control-notransition');
    this.$seekBarScrubber.removeClass('media-control-notransition dragging');
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
    var offsetY = event.pageX - this.$volumeBarContainer.offset().left;
    var volumeFromUI = (offsetY / this.$volumeBarContainer.width()) * 100;
    this.setVolume(volumeFromUI);
  },
  toggleMute: function() {
    if (this.mute) {
      if (this.currentVolume <= 0) {
        this.currentVolume = 100;
      }
      this.setVolume(this.currentVolume);
    } else {
      this.setVolume(0);
    }
  },
  setVolume: function(value) {
    this.currentVolume = Math.min(100, Math.max(value, 0));
    this.container.setVolume(this.currentVolume);
    this.setVolumeLevel(this.currentVolume);
    this.mute = this.currentVolume === 0;
    this.persistConfig && Utils.Config.persist("volume", this.currentVolume);
  },
  toggleFullscreen: function() {
    this.trigger(Events.MEDIACONTROL_FULLSCREEN, this.name);
    this.container.fullscreen();
    this.resetKeepVisible();
  },
  setContainer: function(container) {
    this.stopListening(this.container);
    this.container = container;
    this.changeTogglePlay();
    this.addEventListeners();
    this.settingsUpdate();
    this.container.trigger(Events.CONTAINER_PLAYBACKDVRSTATECHANGED, this.container.isDvrInUse());
    this.setVolume(this.currentVolume);
    if (this.container.mediaControlDisabled) {
      this.disable();
    }
    this.trigger(Events.MEDIACONTROL_CONTAINERCHANGED);
  },
  showVolumeBar: function() {
    if (this.hideVolumeId) {
      clearTimeout(this.hideVolumeId);
    }
    this.$volumeBarContainer.removeClass('volume-bar-hide');
  },
  hideVolumeBar: function() {
    var $__0 = this;
    var timeout = 400;
    if (!this.$volumeBarContainer)
      return;
    if (this.draggingVolumeBar) {
      this.hideVolumeId = setTimeout((function() {
        return $__0.hideVolumeBar();
      }), timeout);
    } else {
      if (this.hideVolumeId) {
        clearTimeout(this.hideVolumeId);
      }
      this.hideVolumeId = setTimeout((function() {
        return $__0.$volumeBarContainer.addClass('volume-bar-hide');
      }), timeout);
    }
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
    if (position < 0)
      position = duration;
    this.$seekBarPosition.removeClass('media-control-notransition');
    this.$seekBarScrubber.removeClass('media-control-notransition');
    var seekbarValue = (100 / duration) * position;
    this.setSeekPercentage(seekbarValue);
    this.$('[data-position]').html(Utils.formatTime(position));
    this.$('[data-duration]').html(Utils.formatTime(duration));
  },
  seek: function(event) {
    if (!this.container.settings.seekEnabled)
      return;
    var offsetX = event.pageX - this.$seekBarContainer.offset().left;
    var pos = offsetX / this.$seekBarContainer.width() * 100;
    pos = Math.min(100, Math.max(pos, 0));
    this.container.setCurrentTime(pos);
    this.setSeekPercentage(pos);
    return false;
  },
  setKeepVisible: function() {
    this.keepVisible = true;
  },
  resetKeepVisible: function() {
    this.keepVisible = false;
  },
  isVisible: function() {
    return !this.$el.hasClass('media-control-hide');
  },
  show: function(event) {
    var $__0 = this;
    if (this.disabled || this.container.getPlaybackType() === null)
      return;
    var timeout = 2000;
    if (!event || (event.clientX !== this.lastMouseX && event.clientY !== this.lastMouseY) || navigator.userAgent.match(/firefox/i)) {
      clearTimeout(this.hideId);
      this.$el.show();
      this.trigger(Events.MEDIACONTROL_SHOW, this.name);
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
    clearTimeout(this.hideId);
    if (!this.isVisible() || this.options.hideMediaControl === false)
      return;
    if (this.keepVisible || this.draggingSeekBar || this.draggingVolumeBar) {
      this.hideId = setTimeout((function() {
        return $__0.hide();
      }), timeout);
    } else {
      this.trigger(Events.MEDIACONTROL_HIDE, this.name);
      this.$el.addClass('media-control-hide');
      this.hideVolumeBar();
    }
  },
  settingsUpdate: function() {
    if (this.container.getPlaybackType() !== null && !_.isEmpty(this.container.settings)) {
      this.settings = this.container.settings;
      this.render();
      this.enable();
    } else {
      this.disable();
    }
  },
  highDefinitionUpdate: function() {
    if (this.container.isHighDefinitionInUse()) {
      this.$el.find('button[data-hd-indicator]').addClass("enabled");
    } else {
      this.$el.find('button[data-hd-indicator]').removeClass("enabled");
    }
  },
  createCachedElements: function() {
    this.$playPauseToggle = this.$el.find('button.media-control-button[data-playpause]');
    this.$playStopToggle = this.$el.find('button.media-control-button[data-playstop]');
    this.$fullscreenToggle = this.$el.find('button.media-control-button[data-fullscreen]');
    this.$seekBarContainer = this.$el.find('.bar-container[data-seekbar]');
    this.$seekBarLoaded = this.$el.find('.bar-fill-1[data-seekbar]');
    this.$seekBarPosition = this.$el.find('.bar-fill-2[data-seekbar]');
    this.$seekBarScrubber = this.$el.find('.bar-scrubber[data-seekbar]');
    this.$seekBarHover = this.$el.find('.bar-hover[data-seekbar]');
    this.$volumeBarContainer = this.$el.find('.bar-container[data-volume]');
    this.$volumeIcon = this.$el.find('.drawer-icon[data-volume]');
  },
  setVolumeLevel: function(value) {
    var $__0 = this;
    if (!this.container.isReady || !this.$volumeBarContainer) {
      this.listenToOnce(this.container, Events.CONTAINER_READY, (function() {
        return $__0.setVolumeLevel(value);
      }));
    } else {
      this.$volumeBarContainer.find('.segmented-bar-element').removeClass('fill');
      var item = Math.ceil(value / 10.0);
      this.$volumeBarContainer.find('.segmented-bar-element').slice(0, item).addClass('fill');
      if (value > 0) {
        this.$volumeIcon.removeClass('muted');
      } else {
        this.$volumeIcon.addClass('muted');
      }
    }
  },
  setSeekPercentage: function(value) {
    if (value > 100)
      return;
    var pos = this.$seekBarContainer.width() * value / 100.0 - (this.$seekBarScrubber.width() / 2.0);
    this.currentSeekPercentage = value;
    this.$seekBarPosition.css({width: value + '%'});
    this.$seekBarScrubber.css({left: pos});
  },
  bindKeyEvents: function() {
    var $__0 = this;
    Mousetrap.bind(['space'], (function() {
      return $__0.togglePlayPause();
    }));
  },
  unbindKeyEvents: function() {
    Mousetrap.unbind('space');
  },
  parseColors: function() {
    if (this.options.mediacontrol) {
      var buttonsColor = this.options.mediacontrol.buttons;
      var seekbarColor = this.options.mediacontrol.seekbar;
      this.$el.find('.bar-fill-2[data-seekbar]').css('background-color', seekbarColor);
      this.$el.find('[data-media-control] > .media-control-icon, .drawer-icon').css('color', buttonsColor);
      this.$el.find('.segmented-bar-element[data-volume]').css('boxShadow', "inset 2px 0 0 " + buttonsColor);
    }
  },
  render: function() {
    var $__0 = this;
    var timeout = 1000;
    var style = Styler.getStyleFor('media_control');
    this.$el.html(this.template({settings: this.settings}));
    this.$el.append(style);
    this.createCachedElements();
    this.$playPauseToggle.addClass('paused');
    this.$playStopToggle.addClass('stopped');
    this.changeTogglePlay();
    this.hideId = setTimeout((function() {
      return $__0.hide();
    }), timeout);
    if (this.disabled) {
      this.hide();
    }
    this.$seekBarPosition.addClass('media-control-notransition');
    this.$seekBarScrubber.addClass('media-control-notransition');
    if (!this.currentSeekPercentage) {
      this.currentSeekPercentage = 0;
    }
    this.setSeekPercentage(this.currentSeekPercentage);
    this.$el.ready((function() {
      if (!$__0.container.settings.seekEnabled) {
        $__0.$seekBarContainer.addClass('seek-disabled');
      }
      $__0.setVolume($__0.currentVolume);
      $__0.bindKeyEvents();
      $__0.hideVolumeBar();
    }));
    this.parseColors();
    this.seekTime.render();
    this.trigger(Events.MEDIACONTROL_RENDERED);
    return this;
  },
  destroy: function() {
    $(document).unbind('mouseup');
    $(document).unbind('mousemove');
    this.unbindKeyEvents();
  }
}, {}, UIObject);
module.exports = MediaControl;


},{"../../base/jst":7,"../../base/styler":8,"../../base/utils":9,"../seek_time":22,"events":"events","mediator":"mediator","mousetrap":4,"player_info":"player_info","ui_object":"ui_object","underscore":"underscore","zepto":"zepto"}],21:[function(require,module,exports){
"use strict";
var BaseObject = require('base_object');
var CoreFactory = require('./core_factory');
var Loader = require('./loader');
var _ = require('underscore');
var ScrollMonitor = require('scrollmonitor');
var PlayerInfo = require('player_info');
var Player = function Player(options) {
  $traceurRuntime.superCall(this, $Player.prototype, "constructor", [options]);
  window.p = this;
  var defaultOptions = {
    persistConfig: true,
    width: 640,
    height: 360
  };
  this.options = _.extend(defaultOptions, options);
  this.options.sources = this.normalizeSources(options);
  this.loader = new Loader(this.options.plugins || {});
  this.coreFactory = new CoreFactory(this, this.loader);
  PlayerInfo.currentSize = {
    width: options.width,
    height: options.height
  };
  if (this.options.parentId) {
    this.setParentId(this.options.parentId);
  }
};
var $Player = Player;
($traceurRuntime.createClass)(Player, {
  setParentId: function(parentId) {
    var el = document.querySelector(parentId);
    if (el) {
      this.attachTo(el);
    }
  },
  attachTo: function(element) {
    this.options.parentElement = element;
    this.core = this.coreFactory.create();
    if (this.options.autoPlayVisible) {
      this.bindAutoPlayVisible(this.options.autoPlayVisible);
    }
  },
  bindAutoPlayVisible: function(option) {
    var $__0 = this;
    this.elementWatcher = ScrollMonitor.create(this.core.$el);
    if (option === 'full') {
      this.elementWatcher.fullyEnterViewport((function() {
        return $__0.enterViewport();
      }));
    } else if (option === 'partial') {
      this.elementWatcher.enterViewport((function() {
        return $__0.enterViewport();
      }));
    }
  },
  enterViewport: function() {
    if (this.elementWatcher.top !== 0 && !this.isPlaying()) {
      this.play();
    }
  },
  normalizeSources: function(options) {
    var sources = _.compact(_.flatten([options.source, options.sources]));
    return _.isEmpty(sources) ? ['no.op'] : sources;
  },
  resize: function(size) {
    this.core.resize(size);
  },
  load: function(sources) {
    this.core.load(sources);
  },
  destroy: function() {
    this.core.destroy();
  },
  play: function() {
    this.core.mediaControl.container.play();
  },
  pause: function() {
    this.core.mediaControl.container.pause();
  },
  stop: function() {
    this.core.mediaControl.container.stop();
  },
  seek: function(time) {
    this.core.mediaControl.container.setCurrentTime(time);
  },
  setVolume: function(volume) {
    this.core.mediaControl.container.setVolume(volume);
  },
  mute: function() {
    this.core.mediaControl.container.setVolume(0);
  },
  unmute: function() {
    this.core.mediaControl.container.setVolume(100);
  },
  isPlaying: function() {
    return this.core.mediaControl.container.isPlaying();
  }
}, {}, BaseObject);
module.exports = Player;


},{"./core_factory":15,"./loader":18,"base_object":"base_object","player_info":"player_info","scrollmonitor":5,"underscore":"underscore"}],22:[function(require,module,exports){
"use strict";
module.exports = require('./seek_time');


},{"./seek_time":23}],23:[function(require,module,exports){
"use strict";
var UIObject = require('ui_object');
var Styler = require('../../base/styler');
var JST = require('../../base/jst');
var formatTime = require('../../base/utils').formatTime;
var Events = require('events');
var SeekTime = function SeekTime(mediaControl) {
  $traceurRuntime.superCall(this, $SeekTime.prototype, "constructor", []);
  this.mediaControl = mediaControl;
  this.addEventListeners();
};
var $SeekTime = SeekTime;
($traceurRuntime.createClass)(SeekTime, {
  get name() {
    return 'seek_time';
  },
  get template() {
    return JST.seek_time;
  },
  get attributes() {
    return {
      'class': 'seek-time hidden',
      'data-seek-time': ''
    };
  },
  addEventListeners: function() {
    this.listenTo(this.mediaControl, Events.MEDIACONTROL_MOUSEMOVE_SEEKBAR, this.showTime);
    this.listenTo(this.mediaControl, Events.MEDIACONTROL_MOUSELEAVE_SEEKBAR, this.hideTime);
  },
  showTime: function(event) {
    var offset = event.pageX - this.mediaControl.$seekBarContainer.offset().left;
    var timePosition = Math.min(100, Math.max((offset) / this.mediaControl.$seekBarContainer.width() * 100, 0));
    var pointerPosition = event.pageX - this.mediaControl.$el.offset().left - (this.$el.width() / 2);
    pointerPosition = Math.min(Math.max(0, pointerPosition), this.mediaControl.$el.width() - this.$el.width());
    var currentTime = timePosition * this.mediaControl.container.getDuration() / 100;
    var options = {
      timestamp: currentTime,
      formattedTime: formatTime(currentTime),
      pointerPosition: pointerPosition
    };
    this.update(options);
  },
  hideTime: function() {
    this.$el.addClass('hidden');
    this.$el.css('left', '-100%');
  },
  update: function(options) {
    if (this.mediaControl.container.getPlaybackType() === 'vod' || this.mediaControl.container.isDvrInUse()) {
      this.$el.find('[data-seek-time]').text(options.formattedTime);
      this.$el.css('left', options.pointerPosition);
      this.$el.removeClass('hidden');
    }
  },
  render: function() {
    var style = Styler.getStyleFor(this.name);
    this.$el.html(this.template());
    this.$el.append(style);
    this.mediaControl.$el.append(this.el);
  }
}, {}, UIObject);
module.exports = SeekTime;


},{"../../base/jst":7,"../../base/styler":8,"../../base/utils":9,"events":"events","ui_object":"ui_object"}],24:[function(require,module,exports){
"use strict";
var Playback = require('playback');
var Styler = require('../../base/styler');
var JST = require('../../base/jst');
var Mediator = require('mediator');
var _ = require('underscore');
var $ = require('zepto');
var Browser = require('browser');
var seekStringToSeconds = require('../../base/utils').seekStringToSeconds;
var Events = require('events');
require('mousetrap');
var objectIE = '<object type="application/x-shockwave-flash" id="<%= cid %>" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" data-flash-vod=""><param name="movie" value="<%= swfPath %>"> <param name="quality" value="autohigh"> <param name="swliveconnect" value="true"> <param name="allowScriptAccess" value="always"> <param name="bgcolor" value="#001122"> <param name="allowFullScreen" value="false"> <param name="wmode" value="gpu"> <param name="tabindex" value="1"> <param name=FlashVars value="playbackId=<%= playbackId %>" /> </object>';
var Flash = function Flash(options) {
  $traceurRuntime.superCall(this, $Flash.prototype, "constructor", [options]);
  this.src = options.src;
  this.defaultBaseSwfPath = "http://cdn.clappr.io/" + Clappr.version + "/assets/";
  this.swfPath = (options.swfBasePath || this.defaultBaseSwfPath) + "Player.swf";
  this.autoPlay = options.autoPlay;
  this.settings = {default: ['seekbar']};
  this.settings.left = ["playpause", "position", "duration"];
  this.settings.right = ["fullscreen", "volume"];
  this.settings.seekEnabled = true;
  this.isReady = false;
  this.addListeners();
};
var $Flash = Flash;
($traceurRuntime.createClass)(Flash, {
  get name() {
    return 'flash';
  },
  get tagName() {
    return 'object';
  },
  get template() {
    return JST.flash;
  },
  bootstrap: function() {
    this.el.width = "100%";
    this.el.height = "100%";
    this.isReady = true;
    if (this.currentState === 'PLAYING') {
      this.firstPlay();
    } else {
      this.currentState = "IDLE";
      this.autoPlay && this.play();
    }
    $('<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" />').insertAfter(this.$el);
    this.trigger(Events.PLAYBACK_READY, this.name);
  },
  getPlaybackType: function() {
    return 'vod';
  },
  setupFirefox: function() {
    var $el = this.$('embed');
    $el.attr('data-flash', '');
    this.setElement($el[0]);
  },
  isHighDefinitionInUse: function() {
    return false;
  },
  updateTime: function() {
    this.trigger(Events.PLAYBACK_TIMEUPDATE, this.el.getPosition(), this.el.getDuration(), this.name);
  },
  addListeners: function() {
    Mediator.on(this.uniqueId + ':progress', this.progress, this);
    Mediator.on(this.uniqueId + ':timeupdate', this.updateTime, this);
    Mediator.on(this.uniqueId + ':statechanged', this.checkState, this);
    Mediator.on(this.uniqueId + ':flashready', this.bootstrap, this);
    _.each(_.range(1, 10), function(i) {
      var $__0 = this;
      Mousetrap.bind([i.toString()], (function() {
        return $__0.seek(i * 10);
      }));
    }.bind(this));
  },
  stopListening: function() {
    $traceurRuntime.superCall(this, $Flash.prototype, "stopListening", []);
    Mediator.off(this.uniqueId + ':progress');
    Mediator.off(this.uniqueId + ':timeupdate');
    Mediator.off(this.uniqueId + ':statechanged');
    Mediator.off(this.uniqueId + ':flashready');
    _.each(_.range(1, 10), function(i) {
      var $__0 = this;
      Mousetrap.unbind([i.toString()], (function() {
        return $__0.seek(i * 10);
      }));
    }.bind(this));
  },
  checkState: function() {
    if (this.currentState === "PAUSED") {
      return;
    } else if (this.currentState !== "PLAYING_BUFFERING" && this.el.getState() === "PLAYING_BUFFERING") {
      this.trigger(Events.PLAYBACK_BUFFERING, this.name);
      this.currentState = "PLAYING_BUFFERING";
    } else if (this.el.getState() === "PLAYING") {
      this.trigger(Events.PLAYBACK_BUFFERFULL, this.name);
      this.currentState = "PLAYING";
    } else if (this.el.getState() === "IDLE") {
      this.currentState = "IDLE";
    } else if (this.el.getState() === "ENDED") {
      this.trigger(Events.PLAYBACK_ENDED, this.name);
      this.trigger(Events.PLAYBACK_TIMEUPDATE, 0, this.el.getDuration(), this.name);
      this.currentState = "ENDED";
    }
  },
  progress: function() {
    if (this.currentState !== "IDLE" && this.currentState !== "ENDED") {
      this.trigger(Events.PLAYBACK_PROGRESS, 0, this.el.getBytesLoaded(), this.el.getBytesTotal(), this.name);
    }
  },
  firstPlay: function() {
    var $__0 = this;
    if (this.el.playerPlay) {
      this.el.playerPlay(this.src);
      this.listenToOnce(this, Events.PLAYBACK_BUFFERFULL, (function() {
        return $__0.checkInitialSeek();
      }));
      this.currentState = "PLAYING";
    } else {
      this.listenToOnce(this, Events.PLAYBACK_READY, this.firstPlay);
    }
  },
  checkInitialSeek: function() {
    var seekTime = seekStringToSeconds(window.location.href);
    if (seekTime !== 0) {
      this.seekSeconds(seekTime);
    }
  },
  play: function() {
    if (this.el.getState() === 'PAUSED' || this.el.getState() === 'PLAYING_BUFFERING') {
      this.currentState = "PLAYING";
      this.el.playerResume();
    } else if (this.el.getState() !== 'PLAYING') {
      this.firstPlay();
    }
    this.trigger(Events.PLAYBACK_PLAY, this.name);
  },
  volume: function(value) {
    var $__0 = this;
    if (this.isReady) {
      this.el.playerVolume(value);
    } else {
      this.listenToOnce(this, Events.PLAYBACK_BUFFERFULL, (function() {
        return $__0.volume(value);
      }));
    }
  },
  pause: function() {
    this.currentState = "PAUSED";
    this.el.playerPause();
  },
  stop: function() {
    this.el.playerStop();
    this.trigger(Events.PLAYBACK_TIMEUPDATE, 0, this.name);
  },
  isPlaying: function() {
    return !!(this.isReady && this.currentState.indexOf("PLAYING") > -1);
  },
  getDuration: function() {
    return this.el.getDuration();
  },
  seek: function(seekBarValue) {
    var seekTo = this.el.getDuration() * (seekBarValue / 100);
    this.seekSeconds(seekTo);
  },
  seekSeconds: function(seekTo) {
    this.el.playerSeek(seekTo);
    this.trigger(Events.PLAYBACK_TIMEUPDATE, seekTo, this.el.getDuration(), this.name);
    if (this.currentState === "PAUSED") {
      this.el.playerPause();
    }
  },
  destroy: function() {
    clearInterval(this.bootstrapId);
    this.stopListening();
    this.$el.remove();
  },
  setupIE: function() {
    this.setElement($(_.template(objectIE)({
      cid: this.cid,
      swfPath: this.swfPath,
      playbackId: this.uniqueId
    })));
  },
  render: function() {
    var style = Styler.getStyleFor(this.name);
    this.$el.html(this.template({
      cid: this.cid,
      swfPath: this.swfPath,
      playbackId: this.uniqueId
    }));
    if (Browser.isFirefox) {
      this.setupFirefox();
    } else if (Browser.isLegacyIE) {
      this.setupIE();
    }
    this.$el.append(style);
    return this;
  }
}, {}, Playback);
Flash.canPlay = function(resource) {
  if ((!Browser.isMobile && Browser.isFirefox) || Browser.isLegacyIE) {
    return _.isString(resource) && !!resource.match(/(.*)\.(mp4|mov|f4v|3gpp|3gp)/);
  } else {
    return _.isString(resource) && !!resource.match(/(.*)\.(mov|f4v|3gpp|3gp)/);
  }
};
module.exports = Flash;


},{"../../base/jst":7,"../../base/styler":8,"../../base/utils":9,"browser":"browser","events":"events","mediator":"mediator","mousetrap":4,"playback":"playback","underscore":"underscore","zepto":"zepto"}],25:[function(require,module,exports){
"use strict";
var Playback = require('playback');
var JST = require('../../base/jst');
var _ = require("underscore");
var Mediator = require('mediator');
var Browser = require('browser');
var Events = require('events');
var objectIE = '<object type="application/x-shockwave-flash" id="<%= cid %>" class="hls-playback" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" data-hls="" width="100%" height="100%"><param name="movie" value="<%= swfPath %>"> <param name="quality" value="autohigh"> <param name="swliveconnect" value="true"> <param name="allowScriptAccess" value="always"> <param name="bgcolor" value="#001122"> <param name="allowFullScreen" value="false"> <param name="wmode" value="transparent"> <param name="tabindex" value="1"> <param name=FlashVars value="playbackId=<%= playbackId %>" /> </object>';
var HLS = function HLS(options) {
  $traceurRuntime.superCall(this, $HLS.prototype, "constructor", [options]);
  this.src = options.src;
  this.defaultBaseSwfPath = "http://cdn.clappr.io/" + Clappr.version + "/assets/";
  this.swfPath = (options.swfBasePath || this.defaultBaseSwfPath) + "HLSPlayer.swf";
  this.flushLiveURLCache = (options.flushLiveURLCache === undefined) ? true : options.flushLiveURLCache;
  this.capLevelToStage = (options.capLevelToStage === undefined) ? false : options.capLevelToStage;
  this.highDefinition = false;
  this.autoPlay = options.autoPlay;
  this.defaultSettings = {
    left: ["playstop"],
    default: ['seekbar'],
    right: ["fullscreen", "volume", "hd-indicator"],
    seekEnabled: false
  };
  this.settings = _.extend({}, this.defaultSettings);
  this.playbackType = 'live';
  this.addListeners();
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
      'class': 'hls-playback',
      'data-hls': '',
      'type': 'application/x-shockwave-flash',
      'width': '100%',
      'height': '100%'
    };
  },
  addListeners: function() {
    var $__0 = this;
    Mediator.on(this.uniqueId + ':flashready', (function() {
      return $__0.bootstrap();
    }));
    Mediator.on(this.uniqueId + ':timeupdate', (function() {
      return $__0.updateTime();
    }));
    Mediator.on(this.uniqueId + ':playbackstate', (function(state) {
      return $__0.setPlaybackState(state);
    }));
    Mediator.on(this.uniqueId + ':highdefinition', (function(isHD) {
      return $__0.updateHighDefinition(isHD);
    }));
    Mediator.on(this.uniqueId + ':playbackerror', (function() {
      return $__0.flashPlaybackError();
    }));
  },
  stopListening: function() {
    $traceurRuntime.superCall(this, $HLS.prototype, "stopListening", []);
    Mediator.off(this.uniqueId + ':flashready');
    Mediator.off(this.uniqueId + ':timeupdate');
    Mediator.off(this.uniqueId + ':playbackstate');
    Mediator.off(this.uniqueId + ':highdefinition');
    Mediator.off(this.uniqueId + ':playbackerror');
  },
  bootstrap: function() {
    this.el.width = "100%";
    this.el.height = "100%";
    this.isReady = true;
    this.trigger(Events.PLAYBACK_READY, this.name);
    this.currentState = "IDLE";
    this.setFlashSettings();
    this.autoPlay && this.play();
  },
  setFlashSettings: function() {
    this.el.globoPlayerSetflushLiveURLCache(this.flushLiveURLCache);
    this.el.globoPlayerCapLeveltoStage(this.capLevelToStage);
    this.el.globoPlayerSetmaxBufferLength(0);
  },
  updateHighDefinition: function(isHD) {
    this.highDefinition = (isHD === "true");
    this.trigger(Events.PLAYBACK_HIGHDEFINITIONUPDATE);
    this.trigger(Events.PLAYBACK_BITRATE, {'bitrate': this.getCurrentBitrate()});
  },
  updateTime: function() {
    var duration = this.getDuration();
    var position = Math.min(Math.max(this.el.globoGetPosition(), 0), duration);
    var previousDVRStatus = this.dvrEnabled;
    var livePlayback = (this.playbackType === 'live');
    this.dvrEnabled = (livePlayback && duration > 240);
    if (duration === 100 || livePlayback === undefined) {
      return;
    }
    if (this.dvrEnabled !== previousDVRStatus) {
      this.updateSettings();
      this.trigger(Events.PLAYBACK_SETTINGSUPDATE, this.name);
    }
    if (livePlayback && (!this.dvrEnabled || !this.dvrInUse)) {
      position = duration;
    }
    this.trigger(Events.PLAYBACK_TIMEUPDATE, position, duration, this.name);
  },
  play: function() {
    if (this.currentState === 'PAUSED') {
      this.el.globoPlayerResume();
    } else if (this.currentState !== "PLAYING") {
      this.firstPlay();
    }
    this.trigger(Events.PLAYBACK_PLAY, this.name);
  },
  getPlaybackType: function() {
    return this.playbackType ? this.playbackType : null;
  },
  getCurrentBitrate: function() {
    var currentLevel = this.getLevels()[this.el.globoGetLevel()];
    return currentLevel.bitrate;
  },
  getLastProgramDate: function() {
    var programDate = this.el.globoGetLastProgramDate();
    return programDate - 1.08e+7;
  },
  isHighDefinitionInUse: function() {
    return this.highDefinition;
  },
  getLevels: function() {
    if (!this.levels || this.levels.length === 0) {
      this.levels = this.el.globoGetLevels();
    }
    return this.levels;
  },
  setPlaybackState: function(state) {
    var bufferLength = this.el.globoGetbufferLength();
    if (state === "PLAYING_BUFFERING" && bufferLength < 1) {
      this.trigger(Events.PLAYBACK_BUFFERING, this.name);
      this.updateCurrentState(state);
    } else if (state === "PLAYING") {
      if (_.contains(["PLAYING_BUFFERING", "PAUSED", "IDLE"], this.currentState)) {
        this.trigger(Events.PLAYBACK_BUFFERFULL, this.name);
        this.updateCurrentState(state);
      }
    } else if (state === "PAUSED") {
      this.updateCurrentState(state);
    } else if (state === "IDLE") {
      this.trigger(Events.PLAYBACK_ENDED, this.name);
      this.trigger(Events.PLAYBACK_TIMEUPDATE, 0, this.el.globoGetDuration(), this.name);
      this.updateCurrentState(state);
    }
    this.lastBufferLength = bufferLength;
  },
  updateCurrentState: function(state) {
    this.currentState = state;
    this.updatePlaybackType();
  },
  updatePlaybackType: function() {
    this.playbackType = this.el.globoGetType();
    if (this.playbackType) {
      this.playbackType = this.playbackType.toLowerCase();
      if (this.playbackType === 'vod') {
        this.startReportingProgress();
      } else {
        this.stopReportingProgress();
      }
    }
    this.trigger(Events.PLAYBACK_PLAYBACKSTATE);
  },
  startReportingProgress: function() {
    if (!this.reportingProgress) {
      this.reportingProgress = true;
      Mediator.on(this.uniqueId + ':fragmentloaded', this.onFragmentLoaded);
    }
  },
  stopReportingProgress: function() {
    Mediator.off(this.uniqueId + ':fragmentloaded', this.onFragmentLoaded, this);
  },
  onFragmentLoaded: function() {
    var buffered = this.el.globoGetPosition() + this.el.globoGetbufferLength();
    this.trigger(Events.PLAYBACK_PROGRESS, this.el.globoGetPosition(), buffered, this.getDuration(), this.name);
  },
  firstPlay: function() {
    this.setFlashSettings();
    this.el.globoPlayerLoad(this.src);
    this.el.globoPlayerPlay();
  },
  volume: function(value) {
    var $__0 = this;
    if (this.isReady) {
      this.el.globoPlayerVolume(value);
    } else {
      this.listenToOnce(this, Events.PLAYBACK_BUFFERFULL, (function() {
        return $__0.volume(value);
      }));
    }
  },
  pause: function() {
    if (this.playbackType !== 'live' || this.dvrEnabled) {
      this.el.globoPlayerPause();
      if (this.playbackType === 'live' && this.dvrEnabled) {
        this.updateDvr(true);
      }
    }
  },
  stop: function() {
    this.el.globoPlayerStop();
    this.trigger(Events.PLAYBACK_TIMEUPDATE, 0, this.name);
  },
  isPlaying: function() {
    if (this.currentState) {
      return !!(this.currentState.match(/playing/i));
    }
    return false;
  },
  getDuration: function() {
    var duration = this.el.globoGetDuration();
    if (this.playbackType === 'live') {
      duration = duration - 10;
    }
    return duration;
  },
  seek: function(time) {
    var duration = this.getDuration();
    if (time > 0) {
      time = duration * time / 100;
    }
    if (this.playbackType === 'live') {
      var dvrInUse = (time >= 0 && duration - time > 5);
      if (!dvrInUse) {
        time = -1;
      }
      this.updateDvr(dvrInUse);
    }
    this.el.globoPlayerSeek(time);
    this.trigger(Events.PLAYBACK_TIMEUPDATE, time, duration, this.name);
  },
  updateDvr: function(dvrInUse) {
    var previousDvrInUse = !!this.dvrInUse;
    this.dvrInUse = dvrInUse;
    if (this.dvrInUse !== previousDvrInUse) {
      this.updateSettings();
      this.trigger(Events.PLAYBACK_DVR, this.dvrInUse);
      this.trigger(Events.PLAYBACK_STATS_ADD, {'dvr': this.dvrInUse});
    }
  },
  flashPlaybackError: function() {
    this.trigger(Events.PLAYBACK_STOP);
  },
  timeUpdate: function(time, duration) {
    this.trigger(Events.PLAYBACK_TIMEUPDATE, time, duration, this.name);
  },
  destroy: function() {
    this.stopListening();
    this.$el.remove();
  },
  setupFirefox: function() {
    var $el = this.$('embed');
    $el.attr('data-hls', '');
    this.setElement($el);
  },
  setupIE: function() {
    this.setElement($(_.template(objectIE)({
      cid: this.cid,
      swfPath: this.swfPath,
      playbackId: this.uniqueId
    })));
  },
  updateSettings: function() {
    this.settings = _.extend({}, this.defaultSettings);
    if (this.playbackType === "vod" || this.dvrInUse) {
      this.settings.left = ["playpause", "position", "duration"];
      this.settings.seekEnabled = true;
    } else if (this.dvrEnabled) {
      this.settings.left = ["playpause"];
      this.settings.seekEnabled = true;
    } else {
      this.settings.seekEnabled = false;
    }
  },
  setElement: function(element) {
    this.$el = element;
    this.el = element[0];
  },
  render: function() {
    if (Browser.isLegacyIE) {
      this.setupIE();
    } else {
      this.$el.html(this.template({
        cid: this.cid,
        swfPath: this.swfPath,
        playbackId: this.uniqueId
      }));
      if (Browser.isFirefox) {
        this.setupFirefox();
      } else if (Browser.isIE) {
        this.$('embed').remove();
      }
    }
    this.el.id = this.cid;
    return this;
  }
}, {}, Playback);
HLS.canPlay = function(resource) {
  return !!resource.match(/^http(.*).m3u8?/);
};
module.exports = HLS;


},{"../../base/jst":7,"browser":"browser","events":"events","mediator":"mediator","playback":"playback","underscore":"underscore"}],26:[function(require,module,exports){
"use strict";
var Playback = require('playback');
var Events = require('events');
var HTML5Audio = function HTML5Audio(params) {
  $traceurRuntime.superCall(this, $HTML5Audio.prototype, "constructor", [params]);
  this.el.src = params.src;
  this.settings = {
    left: ['playpause', 'position', 'duration'],
    right: ['fullscreen', 'volume'],
    default: ['seekbar']
  };
  this.render();
  params.autoPlay && this.play();
};
var $HTML5Audio = HTML5Audio;
($traceurRuntime.createClass)(HTML5Audio, {
  get name() {
    return 'html5_audio';
  },
  get tagName() {
    return 'audio';
  },
  get events() {
    return {
      'timeupdate': 'timeUpdated',
      'ended': 'ended',
      'canplaythrough': 'bufferFull'
    };
  },
  bindEvents: function() {
    this.listenTo(this.container, Events.CONTAINER_PLAY, this.play);
    this.listenTo(this.container, Events.CONTAINER_PAUSE, this.pause);
    this.listenTo(this.container, Events.CONTAINER_SEEK, this.seek);
    this.listenTo(this.container, Events.CONTAINER_VOLUME, this.volume);
    this.listenTo(this.container, Events.CONTAINER_STOP, this.stop);
  },
  getPlaybackType: function() {
    return "aod";
  },
  play: function() {
    this.el.play();
    this.trigger(Events.PLAYBACK_PLAY);
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
    this.trigger(Events.CONTAINER_TIMEUPDATE, 0);
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
  isPlaying: function() {
    return !this.el.paused && !this.el.ended;
  },
  timeUpdated: function() {
    this.trigger(Events.PLAYBACK_TIMEUPDATE, this.el.currentTime, this.el.duration, this.name);
  },
  bufferFull: function() {
    this.trigger(Events.PLAYBACK_TIMEUPDATE, this.el.currentTime, this.el.duration, this.name);
    this.trigger(Events.PLAYBACK_BUFFERFULL);
  },
  render: function() {
    this.trigger(Events.PLAYBACK_READY, this.name);
    return this;
  }
}, {}, Playback);
HTML5Audio.canPlay = function(resource) {
  return !!resource.match(/(.*).mp3/);
};
module.exports = HTML5Audio;


},{"events":"events","playback":"playback"}],27:[function(require,module,exports){
(function (process){
"use strict";
var Playback = require('playback');
var JST = require('../../base/jst');
var Styler = require('../../base/styler');
var Browser = require('browser');
var seekStringToSeconds = require('../../base/utils').seekStringToSeconds;
var Events = require('events');
var _ = require('underscore');
require('mousetrap');
var HTML5Video = function HTML5Video(options) {
  $traceurRuntime.superCall(this, $HTML5Video.prototype, "constructor", [options]);
  this.options = options;
  this.src = options.src;
  this.el.src = options.src;
  this.el.loop = options.loop;
  this.firstBuffer = true;
  this.isHLS = (this.src.indexOf('m3u8') > -1);
  this.settings = {default: ['seekbar']};
  if (this.isHLS && Browser.isSafari) {
    this.settings.left = ["playstop"];
    this.settings.right = ["fullscreen", "volume"];
  } else {
    this.el.preload = options.preload ? options.preload : 'metadata';
    this.settings.left = ["playpause", "position", "duration"];
    this.settings.right = ["fullscreen", "volume"];
    this.settings.seekEnabled = true;
  }
  this.bindEvents();
};
var $HTML5Video = HTML5Video;
($traceurRuntime.createClass)(HTML5Video, {
  get name() {
    return 'html5_video';
  },
  get tagName() {
    return 'video';
  },
  get template() {
    return JST.html5_video;
  },
  get attributes() {
    return {'data-html5-video': ''};
  },
  get events() {
    return {
      'timeupdate': 'timeUpdated',
      'progress': 'progress',
      'ended': 'ended',
      'stalled': 'stalled',
      'waiting': 'waiting',
      'canplaythrough': 'bufferFull',
      'loadedmetadata': 'loadedMetadata'
    };
  },
  bindEvents: function() {
    _.each(_.range(1, 10), function(i) {
      var $__0 = this;
      Mousetrap.bind([i.toString()], (function() {
        return $__0.seek(i * 10);
      }));
    }.bind(this));
  },
  loadedMetadata: function(e) {
    this.trigger(Events.PLAYBACK_LOADEDMETADATA, e.target.duration);
    this.trigger(Events.PLAYBACK_SETTINGSUPDATE);
    this.checkInitialSeek();
  },
  getPlaybackType: function() {
    return this.isHLS && _.contains([0, undefined, Infinity], this.el.duration) ? 'live' : 'vod';
  },
  isHighDefinitionInUse: function() {
    return false;
  },
  play: function() {
    this.el.play();
    this.trigger(Events.PLAYBACK_PLAY);
    if (this.isHLS) {
      this.trigger(Events.PLAYBACK_TIMEUPDATE, 1, 1, this.name);
    }
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
    this.trigger(Events.PLAYBACK_ENDED, this.name);
    this.trigger(Events.PLAYBACK_TIMEUPDATE, 0, this.el.duration, this.name);
  },
  stalled: function() {
    if (this.getPlaybackType() === 'vod' && this.el.readyState < this.el.HAVE_FUTURE_DATA) {
      this.trigger(Events.PLAYBACK_BUFFERING, this.name);
    }
  },
  waiting: function() {
    if (this.el.readyState < this.el.HAVE_FUTURE_DATA) {
      this.trigger(Events.PLAYBACK_BUFFERING, this.name);
    }
  },
  bufferFull: function() {
    if (this.options.poster && this.firstBuffer) {
      this.firstBuffer = false;
      if (!this.isPlaying()) {
        this.el.poster = this.options.poster;
      }
    } else {
      this.el.poster = '';
    }
    this.trigger(Events.PLAYBACK_BUFFERFULL, this.name);
  },
  destroy: function() {
    this.stop();
    this.el.src = '';
    this.$el.remove();
  },
  seek: function(seekBarValue) {
    var time = this.el.duration * (seekBarValue / 100);
    this.seekSeconds(time);
  },
  seekSeconds: function(time) {
    this.el.currentTime = time;
  },
  checkInitialSeek: function() {
    var seekTime = seekStringToSeconds(window.location.href);
    this.seekSeconds(seekTime);
  },
  getCurrentTime: function() {
    return this.el.currentTime;
  },
  getDuration: function() {
    return this.el.duration;
  },
  timeUpdated: function() {
    if (this.getPlaybackType() !== 'live') {
      this.trigger(Events.PLAYBACK_TIMEUPDATE, this.el.currentTime, this.el.duration, this.name);
    }
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
    this.trigger(Events.PLAYBACK_PROGRESS, this.el.buffered.start(bufferedPos), this.el.buffered.end(bufferedPos), this.el.duration, this.name);
  },
  typeFor: function(src) {
    return (src.indexOf('.m3u8') > 0) ? 'application/vnd.apple.mpegurl' : 'video/mp4';
  },
  render: function() {
    var $__0 = this;
    var style = Styler.getStyleFor(this.name);
    this.$el.html(this.template({
      src: this.src,
      type: this.typeFor(this.src)
    }));
    this.$el.append(style);
    this.trigger(Events.PLAYBACK_READY, this.name);
    process.nextTick((function() {
      return $__0.options.autoPlay && $__0.play();
    }));
    return this;
  }
}, {}, Playback);
HTML5Video.canPlay = function(resource) {
  var mimetypes = {
    'mp4': _.map(["avc1.42E01E", "avc1.58A01E", "avc1.4D401E", "avc1.64001E", "mp4v.20.8", "mp4v.20.240"], function(codec) {
      return 'video/mp4; codecs=' + codec + ', mp4a.40.2';
    }),
    'ogg': ['video/ogg; codecs="theora, vorbis"', 'video/ogg; codecs="dirac"', 'video/ogg; codecs="theora, speex"'],
    '3gpp': ['video/3gpp; codecs="mp4v.20.8, samr"'],
    'webm': ['video/webm; codecs="vp8, vorbis"'],
    'mkv': ['video/x-matroska; codecs="theora, vorbis"'],
    'm3u8': ['application/x-mpegURL']
  };
  mimetypes['ogv'] = mimetypes['ogg'];
  mimetypes['3gp'] = mimetypes['3gpp'];
  var extension = resource.split('?')[0].match(/.*\.(.*)$/)[1];
  if (_.has(mimetypes, extension)) {
    var v = document.createElement('video');
    return !!_.find(mimetypes[extension], function(ext) {
      return !!v.canPlayType(ext).replace(/no/, '');
    });
  }
  return false;
};
module.exports = HTML5Video;


}).call(this,require('_process'))

},{"../../base/jst":7,"../../base/styler":8,"../../base/utils":9,"_process":2,"browser":"browser","events":"events","mousetrap":4,"playback":"playback","underscore":"underscore"}],28:[function(require,module,exports){
"use strict";
var Playback = require('playback');
var Styler = require('../../base/styler');
var JST = require('../../base/jst');
var Events = require('events');
var HTMLImg = function HTMLImg(params) {
  $traceurRuntime.superCall(this, $HTMLImg.prototype, "constructor", [params]);
  this.el.src = params.src;
  setTimeout(function() {
    this.trigger(Events.PLAYBACK_BUFFERFULL, this.name);
  }.bind(this), 1);
};
var $HTMLImg = HTMLImg;
($traceurRuntime.createClass)(HTMLImg, {
  get name() {
    return 'html_img';
  },
  get tagName() {
    return 'img';
  },
  get attributes() {
    return {'data-html-img': ''};
  },
  getPlaybackType: function() {
    return null;
  },
  render: function() {
    var style = Styler.getStyleFor(this.name);
    this.$el.append(style);
    return this;
  }
}, {}, Playback);
HTMLImg.canPlay = function(resource) {
  return !!resource.match(/(.*).(png|jpg|jpeg|gif|bmp)/);
};
module.exports = HTMLImg;


},{"../../base/jst":7,"../../base/styler":8,"events":"events","playback":"playback"}],29:[function(require,module,exports){
"use strict";
module.exports = require('./no_op');


},{"./no_op":30}],30:[function(require,module,exports){
"use strict";
var Playback = require('playback');
var JST = require('../../base/jst');
var Styler = require('../../base/styler');
var NoOp = function NoOp(options) {
  $traceurRuntime.superCall(this, $NoOp.prototype, "constructor", [options]);
};
var $NoOp = NoOp;
($traceurRuntime.createClass)(NoOp, {
  get name() {
    return 'no_op';
  },
  get template() {
    return JST.no_op;
  },
  get attributes() {
    return {'data-no-op': ''};
  },
  render: function() {
    var style = Styler.getStyleFor(this.name);
    this.$el.html(this.template());
    this.$el.append(style);
    return this;
  }
}, {}, Playback);
NoOp.canPlay = (function(source) {
  return true;
});
module.exports = NoOp;


},{"../../base/jst":7,"../../base/styler":8,"playback":"playback"}],31:[function(require,module,exports){
(function (process){
"use strict";
var UICorePlugin = require('ui_core_plugin');
var JST = require('../../base/jst');
var Styler = require('../../base/styler');
var Events = require('events');
var Browser = require('browser');
var Mediator = require('mediator');
var PlayerInfo = require('player_info');
var BackgroundButton = function BackgroundButton(core) {
  $traceurRuntime.superCall(this, $BackgroundButton.prototype, "constructor", [core]);
  this.core = core;
  this.settingsUpdate();
};
var $BackgroundButton = BackgroundButton;
($traceurRuntime.createClass)(BackgroundButton, {
  get template() {
    return JST.background_button;
  },
  get name() {
    return 'background_button';
  },
  get attributes() {
    return {
      'class': 'background-button',
      'data-background-button': ''
    };
  },
  get events() {
    return {'click .background-button-icon': 'click'};
  },
  bindEvents: function() {
    this.listenTo(this.core.mediaControl.container, Events.CONTAINER_STATE_BUFFERING, this.hide);
    this.listenTo(this.core.mediaControl.container, Events.CONTAINER_STATE_BUFFERFULL, this.show);
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_RENDERED, this.settingsUpdate);
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_SHOW, this.updateSize);
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_PLAYING, this.playing);
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_NOTPLAYING, this.notplaying);
    Mediator.on(Events.PLAYER_RESIZE, this.updateSize, this);
  },
  stopListening: function() {
    $traceurRuntime.superCall(this, $BackgroundButton.prototype, "stopListening", []);
    Mediator.off(Events.PLAYER_RESIZE, this.updateSize, this);
  },
  settingsUpdate: function() {
    this.stopListening();
    if (this.shouldRender()) {
      this.render();
      this.bindEvents();
      if (this.core.mediaControl.container.isPlaying()) {
        this.playing();
      } else {
        this.notplaying();
      }
    } else {
      this.$el.remove();
      this.$playPauseButton.show();
      this.$playStopButton.show();
      this.listenTo(this.core.mediaControl.container, Events.CONTAINER_SETTINGSUPDATE, this.settingsUpdate);
      this.listenTo(this.core.mediaControl.container, Events.CONTAINER_PLAYBACKDVRSTATECHANGED, this.settingsUpdate);
      this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED, this.settingsUpdate);
    }
  },
  shouldRender: function() {
    var useBackgroundButton = (this.core.options.useBackgroundButton === undefined && Browser.isMobile) || !!this.core.options.useBackgroundButton;
    return useBackgroundButton && (this.core.mediaControl.$el.find('[data-playstop]').length > 0 || this.core.mediaControl.$el.find('[data-playpause]').length > 0);
  },
  click: function() {
    this.core.mediaControl.show();
    if (this.shouldStop) {
      this.core.mediaControl.togglePlayStop();
    } else {
      this.core.mediaControl.togglePlayPause();
    }
  },
  show: function() {
    this.$el.removeClass('hide');
  },
  hide: function() {
    this.$el.addClass('hide');
  },
  enable: function() {
    this.stopListening();
    $traceurRuntime.superCall(this, $BackgroundButton.prototype, "enable", []);
    this.settingsUpdate();
  },
  disable: function() {
    $traceurRuntime.superCall(this, $BackgroundButton.prototype, "disable", []);
    this.$playPauseButton.show();
    this.$playStopButton.show();
  },
  playing: function() {
    this.$buttonIcon.removeClass('notplaying').addClass('playing');
  },
  notplaying: function() {
    this.$buttonIcon.removeClass('playing').addClass('notplaying');
  },
  getExternalInterface: function() {},
  updateSize: function() {
    if (!this.$el)
      return;
    var height = PlayerInfo.currentSize ? PlayerInfo.currentSize.height : this.$el.height();
    this.$el.css({fontSize: height});
    this.$buttonWrapper.css({marginTop: -(this.$buttonWrapper.height() / 2)});
  },
  render: function() {
    var $__0 = this;
    var style = Styler.getStyleFor(this.name);
    this.$el.html(this.template());
    this.$el.append(style);
    this.$playPauseButton = this.core.mediaControl.$el.find('[data-playpause]');
    this.$playStopButton = this.core.mediaControl.$el.find('[data-playstop]');
    this.$buttonWrapper = this.$el.find('.background-button-wrapper[data-background-button]');
    this.$buttonIcon = this.$el.find('.background-button-icon[data-background-button]');
    this.shouldStop = this.$playStopButton.length > 0;
    this.$el.insertBefore(this.core.mediaControl.$el.find('.media-control-layer[data-controls]'));
    this.$el.click((function() {
      return $__0.click($__0.$el);
    }));
    process.nextTick((function() {
      return $__0.updateSize();
    }));
    if (this.core.options.useBackgroundButton) {
      this.$playPauseButton.hide();
      this.$playStopButton.hide();
    }
    if (this.shouldStop) {
      this.$buttonIcon.addClass('playstop');
    }
    if (this.core.mediaControl.isVisible()) {
      this.show();
    }
    return this;
  }
}, {}, UICorePlugin);
module.exports = BackgroundButton;


}).call(this,require('_process'))

},{"../../base/jst":7,"../../base/styler":8,"_process":2,"browser":"browser","events":"events","mediator":"mediator","player_info":"player_info","ui_core_plugin":"ui_core_plugin"}],32:[function(require,module,exports){
"use strict";
module.exports = require('./background_button');


},{"./background_button":31}],33:[function(require,module,exports){
"use strict";
var ContainerPlugin = require('container_plugin');
var Events = require('events');
var ClickToPausePlugin = function ClickToPausePlugin() {
  $traceurRuntime.defaultSuperCall(this, $ClickToPausePlugin.prototype, arguments);
};
var $ClickToPausePlugin = ClickToPausePlugin;
($traceurRuntime.createClass)(ClickToPausePlugin, {
  get name() {
    return 'click_to_pause';
  },
  bindEvents: function() {
    this.listenTo(this.container, Events.CONTAINER_CLICK, this.click);
    this.listenTo(this.container, Events.CONTAINER_SETTINGSUPDATE, this.settingsUpdate);
  },
  click: function() {
    if (this.container.getPlaybackType() !== 'live' || this.container.isDvrEnabled()) {
      if (this.container.isPlaying()) {
        this.container.pause();
      } else {
        this.container.play();
      }
    }
  },
  settingsUpdate: function() {
    this.container.$el.removeClass('pointer-enabled');
    if (this.container.getPlaybackType() !== 'live' || this.container.isDvrEnabled()) {
      this.container.$el.addClass('pointer-enabled');
    }
  }
}, {}, ContainerPlugin);
module.exports = ClickToPausePlugin;


},{"container_plugin":"container_plugin","events":"events"}],34:[function(require,module,exports){
"use strict";
module.exports = require('./click_to_pause');


},{"./click_to_pause":33}],35:[function(require,module,exports){
"use strict";
var UICorePlugin = require('ui_core_plugin');
var JST = require('../../base/jst');
var Styler = require('../../base/styler');
var Events = require('events');
var DVRControls = function DVRControls(core) {
  $traceurRuntime.superCall(this, $DVRControls.prototype, "constructor", [core]);
  this.core = core;
  this.settingsUpdate();
};
var $DVRControls = DVRControls;
($traceurRuntime.createClass)(DVRControls, {
  get template() {
    return JST.dvr_controls;
  },
  get name() {
    return 'dvr_controls';
  },
  get events() {
    return {'click .live-button': 'click'};
  },
  get attributes() {
    return {
      'class': 'dvr-controls',
      'data-dvr-controls': ''
    };
  },
  bindEvents: function() {
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_RENDERED, this.settingsUpdate);
    this.listenTo(this.core.mediaControl.container, Events.CONTAINER_PLAYBACKDVRSTATECHANGED, this.dvrChanged);
  },
  dvrChanged: function(dvrEnabled) {
    this.settingsUpdate();
    this.core.mediaControl.$el.addClass('live');
    if (dvrEnabled) {
      this.core.mediaControl.$el.addClass('dvr');
      this.core.mediaControl.$el.find('.media-control-indicator[data-position], .media-control-indicator[data-duration]').hide();
    } else {
      this.core.mediaControl.$el.removeClass('dvr');
    }
  },
  click: function() {
    if (!this.core.mediaControl.container.isPlaying()) {
      this.core.mediaControl.container.play();
    }
    if (this.core.mediaControl.$el.hasClass('dvr')) {
      this.core.mediaControl.container.setCurrentTime(-1);
    }
  },
  settingsUpdate: function() {
    var $__0 = this;
    this.stopListening();
    if (this.shouldRender()) {
      this.render();
      this.$el.click((function() {
        return $__0.click();
      }));
    }
    this.bindEvents();
  },
  shouldRender: function() {
    var useDvrControls = this.core.options.useDvrControls === undefined || !!this.core.options.useDvrControls;
    return useDvrControls && this.core.mediaControl.container.getPlaybackType() === 'live';
  },
  render: function() {
    var style = Styler.getStyleFor(this.name);
    this.$el.html(this.template());
    this.$el.append(style);
    if (this.shouldRender()) {
      this.core.mediaControl.$el.addClass('live');
      this.core.mediaControl.$('.media-control-left-panel[data-media-control]').append(this.$el);
      if (this.$duration) {
        this.$duration.remove();
      }
      this.$duration = $('<span data-duration></span>');
      this.core.mediaControl.seekTime.$el.append(this.$duration);
    }
    return this;
  }
}, {}, UICorePlugin);
module.exports = DVRControls;


},{"../../base/jst":7,"../../base/styler":8,"events":"events","ui_core_plugin":"ui_core_plugin"}],36:[function(require,module,exports){
"use strict";
module.exports = require('./dvr_controls');


},{"./dvr_controls":35}],37:[function(require,module,exports){
"use strict";
var ContainerPlugin = require('container_plugin');
var Events = require('events');
var GoogleAnalytics = function GoogleAnalytics(options) {
  $traceurRuntime.superCall(this, $GoogleAnalytics.prototype, "constructor", [options]);
  if (options.gaAccount) {
    this.embedScript();
    this.account = options.gaAccount;
    this.trackerName = options.gaTrackerName + "." || 'Clappr.';
    this.currentHDState = undefined;
  }
};
var $GoogleAnalytics = GoogleAnalytics;
($traceurRuntime.createClass)(GoogleAnalytics, {
  get name() {
    return 'google_analytics';
  },
  embedScript: function() {
    var $__0 = this;
    if (!window._gat) {
      var script = document.createElement('script');
      script.setAttribute("type", "text/javascript");
      script.setAttribute("async", "async");
      script.setAttribute("src", "http://www.google-analytics.com/ga.js");
      script.onload = (function() {
        return $__0.addEventListeners();
      });
      document.body.appendChild(script);
    } else {
      this.addEventListeners();
    }
  },
  addEventListeners: function() {
    var $__0 = this;
    this.listenTo(this.container, Events.CONTAINER_PLAY, this.onPlay);
    this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop);
    this.listenTo(this.container, Events.CONTAINER_PAUSE, this.onPause);
    this.listenTo(this.container, Events.CONTAINER_ENDED, this.onEnded);
    this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering);
    this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferFull);
    this.listenTo(this.container, Events.CONTAINER_ENDED, this.onEnded);
    this.listenTo(this.container, Events.CONTAINER_ERROR, this.onError);
    this.listenTo(this.container, Events.CONTAINER_PLAYBACKSTATE, this.onPlaybackChanged);
    this.listenTo(this.container, Events.CONTAINER_VOLUME, (function(event) {
      return $__0.onVolumeChanged(event);
    }));
    this.listenTo(this.container, Events.CONTAINER_SEEK, (function(event) {
      return $__0.onSeek(event);
    }));
    this.listenTo(this.container, Events.CONTAINER_FULL_SCREEN, this.onFullscreen);
    this.listenTo(this.container, Events.CONTAINER_HIGHDEFINITIONUPDATE, this.onHD);
    this.listenTo(this.container.playback, Events.PLAYBACK_DVR, this.onDVR);
    _gaq.push([this.trackerName + '_setAccount', this.account]);
  },
  onPlay: function() {
    this.push(["Video", "Play", this.container.playback.src]);
  },
  onStop: function() {
    this.push(["Video", "Stop", this.container.playback.src]);
  },
  onEnded: function() {
    this.push(["Video", "Ended", this.container.playback.src]);
  },
  onBuffering: function() {
    this.push(["Video", "Buffering", this.container.playback.src]);
  },
  onBufferFull: function() {
    this.push(["Video", "Bufferfull", this.container.playback.src]);
  },
  onError: function() {
    this.push(["Video", "Error", this.container.playback.src]);
  },
  onHD: function() {
    var status = this.container.isHighDefinitionInUse() ? "ON" : "OFF";
    if (status !== this.currentHDState) {
      this.currentHDState = status;
      this.push(["Video", "HD - " + status, this.container.playback.src]);
    }
  },
  onPlaybackChanged: function() {
    var type = this.container.getPlaybackType();
    if (type !== null) {
      this.push(["Video", "Playback Type - " + type, this.container.playback.src]);
    }
  },
  onDVR: function() {
    var status = this.container.isHighDefinitionInUse();
    this.push(["Interaction", "DVR - " + status, this.container.playback.src]);
  },
  onPause: function() {
    this.push(["Video", "Pause", this.container.playback.src]);
  },
  onSeek: function() {
    this.push(["Video", "Seek", this.container.playback.src]);
  },
  onVolumeChanged: function() {
    this.push(["Interaction", "Volume", this.container.playback.src]);
  },
  onFullscreen: function() {
    this.push(["Interaction", "Fullscreen", this.container.playback.src]);
  },
  push: function(array) {
    var res = [this.trackerName + "_trackEvent"].concat(array);
    _gaq.push(res);
  }
}, {}, ContainerPlugin);
module.exports = GoogleAnalytics;


},{"container_plugin":"container_plugin","events":"events"}],38:[function(require,module,exports){
"use strict";
module.exports = require('./google_analytics');


},{"./google_analytics":37}],39:[function(require,module,exports){
"use strict";
module.exports = require('./log');


},{"./log":40}],40:[function(require,module,exports){
"use strict";
var _ = require('underscore');
require('mousetrap');
var Log = function Log() {
  var $__0 = this;
  Mousetrap.bind(['ctrl+shift+d'], (function() {
    return $__0.onOff();
  }));
  this.BLACKLIST = ['playback:timeupdate', 'playback:progress', 'container:hover', 'container:timeupdate', 'container:progress'];
};
($traceurRuntime.createClass)(Log, {
  info: function(klass, message) {
    this.log(klass, 'info', message);
  },
  warn: function(klass, message) {
    this.log(klass, 'warn', message);
  },
  debug: function(klass, message) {
    this.log(klass, 'debug', message);
  },
  onOff: function() {
    window.DEBUG = !window.DEBUG;
    if (window.DEBUG) {
      console.log('log enabled');
    } else {
      console.log('log disabled');
    }
  },
  log: function(klass, level, message) {
    if (!window.DEBUG || _.contains(this.BLACKLIST, message))
      return;
    var color;
    if (level === 'warn') {
      color = '#FF8000';
    } else if (level === 'info') {
      color = '#006600';
    } else if (level === 'error') {
      color = '#FF0000';
    }
    console.log("%c [" + klass + "] [" + level + "] " + message, 'color: ' + color);
  }
}, {});
Log.getInstance = function() {
  if (this._instance === undefined) {
    this._instance = new this();
  }
  return this._instance;
};
module.exports = Log;


},{"mousetrap":4,"underscore":"underscore"}],41:[function(require,module,exports){
(function (process){
"use strict";
var UIContainerPlugin = require('ui_container_plugin');
var Styler = require('../../base/styler');
var JST = require('../../base/jst');
var Events = require('events');
var Mediator = require('mediator');
var PlayerInfo = require('player_info');
var $ = require('zepto');
var _ = require('underscore');
var PosterPlugin = function PosterPlugin(options) {
  $traceurRuntime.superCall(this, $PosterPlugin.prototype, "constructor", [options]);
  this.options = options;
  _.defaults(this.options, {disableControlsOnPoster: true});
  if (this.options.disableControlsOnPoster) {
    this.container.disableMediaControl();
  }
  this.render();
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
  bindEvents: function() {
    this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering);
    this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferfull);
    this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop);
    this.listenTo(this.container, Events.CONTAINER_ENDED, this.onStop);
    Mediator.on(Events.PLAYER_RESIZE, this.updateSize, this);
  },
  stopListening: function() {
    $traceurRuntime.superCall(this, $PosterPlugin.prototype, "stopListening", []);
    Mediator.off(Events.PLAYER_RESIZE, this.updateSize, this);
  },
  onBuffering: function() {
    this.hidePlayButton();
  },
  onBufferfull: function() {
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
  hidePlayButton: function() {
    this.$playButton.hide();
  },
  showPlayButton: function() {
    this.$playButton.show();
    this.updateSize();
  },
  clicked: function() {
    this.container.play();
    return false;
  },
  updateSize: function() {
    if (!this.$el)
      return;
    var height = PlayerInfo.currentSize ? PlayerInfo.currentSize.height : this.$el.height();
    this.$el.css({fontSize: height});
    if (this.$playWrapper.is(':visible')) {
      this.$playWrapper.css({marginTop: -(this.$playWrapper.height() / 2)});
      if (!this.options.hidePlayButton) {
        this.$playButton.show();
      }
    } else {
      this.$playButton.hide();
    }
  },
  render: function() {
    var $__0 = this;
    var style = Styler.getStyleFor(this.name);
    this.$el.html(this.template());
    this.$el.append(style);
    this.$playButton = this.$el.find('.poster-icon');
    this.$playWrapper = this.$el.find('.play-wrapper');
    if (this.options.poster !== undefined) {
      var imgEl = $('<img data-poster class="poster-background"></img>');
      imgEl.attr('src', this.options.poster);
      this.$el.prepend(imgEl);
    }
    this.container.$el.append(this.el);
    if (!!this.options.hidePlayButton) {
      this.hidePlayButton();
    }
    process.nextTick((function() {
      return $__0.updateSize();
    }));
    return this;
  }
}, {}, UIContainerPlugin);
module.exports = PosterPlugin;


}).call(this,require('_process'))

},{"../../base/jst":7,"../../base/styler":8,"_process":2,"events":"events","mediator":"mediator","player_info":"player_info","ui_container_plugin":"ui_container_plugin","underscore":"underscore","zepto":"zepto"}],42:[function(require,module,exports){
"use strict";
module.exports = require('./spinner_three_bounce');


},{"./spinner_three_bounce":43}],43:[function(require,module,exports){
"use strict";
var UIContainerPlugin = require('ui_container_plugin');
var Styler = require('../../base/styler');
var JST = require('../../base/jst');
var Events = require('events');
var SpinnerThreeBouncePlugin = function SpinnerThreeBouncePlugin(options) {
  $traceurRuntime.superCall(this, $SpinnerThreeBouncePlugin.prototype, "constructor", [options]);
  this.template = JST.spinner_three_bounce;
  this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering);
  this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferFull);
  this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop);
  this.render();
};
var $SpinnerThreeBouncePlugin = SpinnerThreeBouncePlugin;
($traceurRuntime.createClass)(SpinnerThreeBouncePlugin, {
  get name() {
    return 'spinner';
  },
  get attributes() {
    return {
      'data-spinner': '',
      'class': 'spinner-three-bounce'
    };
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
    this.$el.html(this.template());
    var style = Styler.getStyleFor('spinner_three_bounce');
    this.container.$el.append(style);
    this.container.$el.append(this.$el);
    this.$el.hide();
    return this;
  }
}, {}, UIContainerPlugin);
module.exports = SpinnerThreeBouncePlugin;


},{"../../base/jst":7,"../../base/styler":8,"events":"events","ui_container_plugin":"ui_container_plugin"}],44:[function(require,module,exports){
"use strict";
module.exports = require('./stats');


},{"./stats":45}],45:[function(require,module,exports){
"use strict";
var ContainerPlugin = require('container_plugin');
var $ = require("zepto");
var Events = require('events');
var StatsPlugin = function StatsPlugin(options) {
  $traceurRuntime.superCall(this, $StatsPlugin.prototype, "constructor", [options]);
  this.setInitialAttrs();
  this.reportInterval = options.reportInterval || 5000;
  this.state = "IDLE";
};
var $StatsPlugin = StatsPlugin;
($traceurRuntime.createClass)(StatsPlugin, {
  get name() {
    return 'stats';
  },
  bindEvents: function() {
    this.listenTo(this.container.playback, Events.PLAYBACK_PLAY, this.onPlay);
    this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop);
    this.listenTo(this.container, Events.CONTAINER_DESTROYED, this.onStop);
    this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering);
    this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferFull);
    this.listenTo(this.container, Events.CONTAINER_STATS_ADD, this.onStatsAdd);
    this.listenTo(this.container, Events.CONTAINER_BITRATE, this.onStatsAdd);
    this.listenTo(this.container.playback, Events.PLAYBACK_STATS_ADD, this.onStatsAdd);
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
    if (!this.intervalId) {
      this.intervalId = setInterval(this.report.bind(this), this.reportInterval);
    }
  },
  onStop: function() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
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
    if (this.firstPlay && !!this.startupTimeInit) {
      this.firstPlay = false;
      this.startupTime = Date.now() - this.startupTimeInit;
      this.watchingTimeInit = Date.now();
    } else if (!!this.rebufferingTimeInit) {
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
    return totalTime - this.rebufferingTime;
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
}, {}, ContainerPlugin);
module.exports = StatsPlugin;


},{"container_plugin":"container_plugin","events":"events","zepto":"zepto"}],46:[function(require,module,exports){
"use strict";
module.exports = require('./watermark');


},{"./watermark":47}],47:[function(require,module,exports){
"use strict";
var UIContainerPlugin = require('ui_container_plugin');
var Styler = require('../../base/styler');
var JST = require('../../base/jst');
var Events = require('events');
var WaterMarkPlugin = function WaterMarkPlugin(options) {
  $traceurRuntime.superCall(this, $WaterMarkPlugin.prototype, "constructor", [options]);
  this.template = JST[this.name];
  this.position = options.position || "bottom-right";
  if (options.watermark) {
    this.imageUrl = options.watermark;
    this.render();
  } else {
    this.$el.remove();
  }
};
var $WaterMarkPlugin = WaterMarkPlugin;
($traceurRuntime.createClass)(WaterMarkPlugin, {
  get name() {
    return 'watermark';
  },
  bindEvents: function() {
    this.listenTo(this.container, Events.CONTAINER_PLAY, this.onPlay);
    this.listenTo(this.container, Events.CONTAINER_STOP, this.onStop);
  },
  onPlay: function() {
    if (!this.hidden)
      this.$el.show();
  },
  onStop: function() {
    this.$el.hide();
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
}, {}, UIContainerPlugin);
module.exports = WaterMarkPlugin;


},{"../../base/jst":7,"../../base/styler":8,"events":"events","ui_container_plugin":"ui_container_plugin"}],"base_object":[function(require,module,exports){
"use strict";
var _ = require('underscore');
var extend = require('./utils').extend;
var Events = require('events');
var pluginOptions = ['container'];
var BaseObject = function BaseObject(options) {
  this.uniqueId = _.uniqueId('o');
  options || (options = {});
  _.extend(this, _.pick(options, pluginOptions));
};
($traceurRuntime.createClass)(BaseObject, {}, {}, Events);
BaseObject.extend = extend;
module.exports = BaseObject;


},{"./utils":9,"events":"events","underscore":"underscore"}],"browser":[function(require,module,exports){
"use strict";
var Browser = function Browser() {};
($traceurRuntime.createClass)(Browser, {}, {});
var hasLocalstorage = function() {
  try {
    localStorage.setItem('clappr', 'clappr');
    localStorage.removeItem('clappr');
    return true;
  } catch (e) {
    return false;
  }
};
Browser.isSafari = (!!navigator.userAgent.match(/safari/i) && navigator.userAgent.indexOf('Chrome') === -1);
Browser.isChrome = !!(navigator.userAgent.match(/chrome/i));
Browser.isFirefox = !!(navigator.userAgent.match(/firefox/i));
Browser.isLegacyIE = !!(window.ActiveXObject);
Browser.isIE = Browser.isLegacyIE || !!(navigator.userAgent.match(/trident.*rv:1\d/i));
Browser.isIE11 = !!(navigator.userAgent.match(/trident.*rv:11/i));
Browser.isMobile = !!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent));
Browser.isWin8App = !!(/MSAppHost/i.test(navigator.userAgent));
Browser.isWiiU = !!(/WiiU/i.test(navigator.userAgent));
Browser.isPS4 = !!(/PlayStation 4/i.test(navigator.userAgent));
Browser.hasLocalstorage = hasLocalstorage();
module.exports = Browser;


},{}],"container_plugin":[function(require,module,exports){
"use strict";
var BaseObject = require('base_object');
var ContainerPlugin = function ContainerPlugin(options) {
  $traceurRuntime.superCall(this, $ContainerPlugin.prototype, "constructor", [options]);
  this.bindEvents();
};
var $ContainerPlugin = ContainerPlugin;
($traceurRuntime.createClass)(ContainerPlugin, {
  enable: function() {
    this.bindEvents();
  },
  disable: function() {
    this.stopListening();
  },
  bindEvents: function() {},
  destroy: function() {
    this.stopListening();
  }
}, {}, BaseObject);
module.exports = ContainerPlugin;


},{"base_object":"base_object"}],"container":[function(require,module,exports){
"use strict";
module.exports = require('./container');


},{"./container":10}],"core_plugin":[function(require,module,exports){
"use strict";
var BaseObject = require('base_object');
var CorePlugin = function CorePlugin(core) {
  $traceurRuntime.superCall(this, $CorePlugin.prototype, "constructor", [core]);
  this.core = core;
};
var $CorePlugin = CorePlugin;
($traceurRuntime.createClass)(CorePlugin, {
  getExternalInterface: function() {
    return {};
  },
  destroy: function() {}
}, {}, BaseObject);
module.exports = CorePlugin;


},{"base_object":"base_object"}],"core":[function(require,module,exports){
"use strict";
module.exports = require('./core');


},{"./core":13}],"events":[function(require,module,exports){
"use strict";
var _ = require('underscore');
var Log = require('../plugins/log').getInstance();
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
    Log.info(klass, name);
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
Events.PLAYER_RESIZE = 'player:resize';
Events.PLAYBACK_PROGRESS = 'playback:progress';
Events.PLAYBACK_TIMEUPDATE = 'playback:timeupdate';
Events.PLAYBACK_READY = 'playback:ready';
Events.PLAYBACK_BUFFERING = 'playback:buffering';
Events.PLAYBACK_BUFFERFULL = 'playback:bufferfull';
Events.PLAYBACK_SETTINGSUPDATE = 'playback:settingsupdate';
Events.PLAYBACK_LOADEDMETADATA = 'playback:loadedmetadata';
Events.PLAYBACK_HIGHDEFINITIONUPDATE = 'playback:highdefinitionupdate';
Events.PLAYBACK_BITRATE = 'playback:bitrate';
Events.PLAYBACK_PLAYBACKSTATE = 'playback:playbackstate';
Events.PLAYBACK_DVR = 'playback:dvr';
Events.PLAYBACK_MEDIACONTROL_DISABLE = 'playback:mediacontrol:disable';
Events.PLAYBACK_MEDIACONTROL_ENABLE = 'playback:mediacontrol:enable';
Events.PLAYBACK_ENDED = 'playback:ended';
Events.PLAYBACK_PLAY = 'playback:play';
Events.PLAYBACK_ERROR = 'playback:error';
Events.PLAYBACK_STATS_ADD = 'playback:stats:add';
Events.CONTAINER_PLAYBACKSTATE = 'container:playbackstate';
Events.CONTAINER_PLAYBACKDVRSTATECHANGED = 'container:dvr';
Events.CONTAINER_BITRATE = 'container:bitrate';
Events.CONTAINER_STATS_REPORT = 'container:stats:report';
Events.CONTAINER_DESTROYED = 'container:destroyed';
Events.CONTAINER_READY = 'container:ready';
Events.CONTAINER_ERROR = 'container:error';
Events.CONTAINER_LOADEDMETADATA = 'container:loadedmetadata';
Events.CONTAINER_TIMEUPDATE = 'container:timeupdate';
Events.CONTAINER_PROGRESS = 'container:progress';
Events.CONTAINER_PLAY = 'container:play';
Events.CONTAINER_STOP = 'container:stop';
Events.CONTAINER_PAUSE = 'container:pause';
Events.CONTAINER_ENDED = 'container:ended';
Events.CONTAINER_CLICK = 'container:click';
Events.CONTAINER_SEEK = 'container:seek';
Events.CONTAINER_VOLUME = 'container:volume';
Events.CONTAINER_FULLSCREEN = 'container:fullscreen';
Events.CONTAINER_STATE_BUFFERING = 'container:state:buffering';
Events.CONTAINER_STATE_BUFFERFULL = 'container:state:bufferfull';
Events.CONTAINER_SETTINGSUPDATE = 'container:settingsupdate';
Events.CONTAINER_HIGHDEFINITIONUPDATE = 'container:highdefinitionupdate';
Events.CONTAINER_MEDIACONTROL_DISABLE = 'container:mediacontrol:disable';
Events.CONTAINER_MEDIACONTROL_ENABLE = 'container:mediacontrol:enable';
Events.CONTAINER_STATS_ADD = 'container:stats:add';
Events.MEDIACONTROL_RENDERED = 'mediacontrol:rendered';
Events.MEDIACONTROL_FULLSCREEN = 'mediacontrol:fullscreen';
Events.MEDIACONTROL_SHOW = 'mediacontrol:show';
Events.MEDIACONTROL_HIDE = 'mediacontrol:hide';
Events.MEDIACONTROL_MOUSEMOVE_SEEKBAR = 'mediacontrol:mousemove:seekbar';
Events.MEDIACONTROL_MOUSELEAVE_SEEKBAR = 'mediacontrol:mouseleave:seekbar';
Events.MEDIACONTROL_PLAYING = 'mediacontrol:playing';
Events.MEDIACONTROL_NOTPLAYING = 'mediacontrol:notplaying';
Events.MEDIACONTROL_CONTAINERCHANGED = 'mediacontrol:containerchanged';
module.exports = Events;


},{"../plugins/log":39,"underscore":"underscore"}],"flash":[function(require,module,exports){
"use strict";
module.exports = require('./flash');


},{"./flash":24}],"hls":[function(require,module,exports){
"use strict";
module.exports = require('./hls');


},{"./hls":25}],"html5_audio":[function(require,module,exports){
"use strict";
module.exports = require('./html5_audio');


},{"./html5_audio":26}],"html5_video":[function(require,module,exports){
"use strict";
module.exports = require('./html5_video');


},{"./html5_video":27}],"html_img":[function(require,module,exports){
"use strict";
module.exports = require('./html_img');


},{"./html_img":28}],"media_control":[function(require,module,exports){
"use strict";
module.exports = require('./media_control');


},{"./media_control":20}],"mediator":[function(require,module,exports){
"use strict";
var Events = require('events');
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


},{"events":"events"}],"playback":[function(require,module,exports){
"use strict";
var UIObject = require('ui_object');
var Playback = function Playback(options) {
  $traceurRuntime.superCall(this, $Playback.prototype, "constructor", [options]);
  this.settings = {};
};
var $Playback = Playback;
($traceurRuntime.createClass)(Playback, {
  play: function() {},
  pause: function() {},
  stop: function() {},
  seek: function(time) {},
  getDuration: function() {
    return 0;
  },
  isPlaying: function() {
    return false;
  },
  getPlaybackType: function() {
    return 'no_op';
  },
  isHighDefinitionInUse: function() {
    return false;
  },
  volume: function(value) {},
  destroy: function() {
    this.$el.remove();
  }
}, {}, UIObject);
Playback.canPlay = (function(source) {
  return false;
});
module.exports = Playback;


},{"ui_object":"ui_object"}],"player_info":[function(require,module,exports){
"use strict";
var PlayerInfo = {
  options: {},
  playbackPlugins: [],
  currentSize: {
    width: 0,
    height: 0
  }
};
module.exports = PlayerInfo;


},{}],"poster":[function(require,module,exports){
"use strict";
module.exports = require('./poster');


},{"./poster":41}],"ui_container_plugin":[function(require,module,exports){
"use strict";
var UIObject = require('ui_object');
var UIContainerPlugin = function UIContainerPlugin(options) {
  $traceurRuntime.superCall(this, $UIContainerPlugin.prototype, "constructor", [options]);
  this.enabled = true;
  this.bindEvents();
};
var $UIContainerPlugin = UIContainerPlugin;
($traceurRuntime.createClass)(UIContainerPlugin, {
  enable: function() {
    this.bindEvents();
    this.$el.show();
    this.enabled = true;
  },
  disable: function() {
    this.stopListening();
    this.$el.hide();
    this.enabled = false;
  },
  bindEvents: function() {},
  destroy: function() {
    this.remove();
  }
}, {}, UIObject);
module.exports = UIContainerPlugin;


},{"ui_object":"ui_object"}],"ui_core_plugin":[function(require,module,exports){
"use strict";
var UIObject = require('ui_object');
var UICorePlugin = function UICorePlugin(core) {
  $traceurRuntime.superCall(this, $UICorePlugin.prototype, "constructor", [core]);
  this.core = core;
  this.enabled = true;
  this.bindEvents();
  this.render();
};
var $UICorePlugin = UICorePlugin;
($traceurRuntime.createClass)(UICorePlugin, {
  bindEvents: function() {},
  getExternalInterface: function() {
    return {};
  },
  enable: function() {
    this.bindEvents();
    this.$el.show();
    this.enabled = true;
  },
  disable: function() {
    this.stopListening();
    this.$el.hide();
    this.enabled = false;
  },
  destroy: function() {
    this.remove();
  },
  render: function() {
    this.$el.html(this.template());
    this.$el.append(this.styler.getStyleFor(this.name));
    this.core.$el.append(this.el);
    return this;
  }
}, {}, UIObject);
module.exports = UICorePlugin;


},{"ui_object":"ui_object"}],"ui_object":[function(require,module,exports){
"use strict";
var $ = require('zepto');
var _ = require('underscore');
var extend = require('./utils').extend;
var BaseObject = require('base_object');
var delegateEventSplitter = /^(\S+)\s*(.*)$/;
var UIObject = function UIObject(options) {
  $traceurRuntime.superCall(this, $UIObject.prototype, "constructor", [options]);
  this.cid = _.uniqueId('c');
  this._ensureElement();
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


},{"./utils":9,"base_object":"base_object","underscore":"underscore","zepto":"zepto"}],"underscore":[function(require,module,exports){
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],"zepto":[function(require,module,exports){
/* Zepto v1.1.4-76-g2bd5d7a - zepto event ajax callbacks deferred touch selector - zeptojs.com/license */
var Zepto=function(){function D(t){return null==t?String(t):j[S.call(t)]||"object"}function L(t){return"function"==D(t)}function k(t){return null!=t&&t==t.window}function Z(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function $(t){return"object"==D(t)}function F(t){return $(t)&&!k(t)&&Object.getPrototypeOf(t)==Object.prototype}function R(t){return"number"==typeof t.length}function q(t){return s.call(t,function(t){return null!=t})}function W(t){return t.length>0?n.fn.concat.apply([],t):t}function z(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function H(t){return t in c?c[t]:c[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function _(t,e){return"number"!=typeof e||l[z(t)]?e:e+"px"}function I(t){var e,n;return f[t]||(e=u.createElement(t),u.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),f[t]=n),f[t]}function U(t){return"children"in t?a.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function X(t,e){var n,i=t?t.length:0;for(n=0;i>n;n++)this[n]=t[n];this.length=i,this.selector=e||""}function B(n,i,r){for(e in i)r&&(F(i[e])||A(i[e]))?(F(i[e])&&!F(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function V(t,e){return null==e?n(t):n(t).filter(e)}function Y(t,e,n,i){return L(e)?e.call(t,n,i):e}function J(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function G(e,n){var i=e.className||"",r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function K(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?n.parseJSON(t):t):t}catch(e){return t}}function Q(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)Q(t.childNodes[n],e)}var t,e,n,i,N,P,r=[],o=r.concat,s=r.filter,a=r.slice,u=window.document,f={},c={},l={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},h=/^\s*<(\w+|!)[^>]*>/,p=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,d=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,m=/^(?:body|html)$/i,g=/([A-Z])/g,v=["val","css","html","text","data","width","height","offset"],y=["after","prepend","before","append"],w=u.createElement("table"),x=u.createElement("tr"),b={tr:u.createElement("tbody"),tbody:w,thead:w,tfoot:w,td:x,th:x,"*":u.createElement("div")},E=/complete|loaded|interactive/,T=/^[\w-]*$/,j={},S=j.toString,C={},O=u.createElement("div"),M={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return C.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~C.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},N=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},C.fragment=function(e,i,r){var o,s,f;return p.test(e)&&(o=n(u.createElement(RegExp.$1))),o||(e.replace&&(e=e.replace(d,"<$1></$2>")),i===t&&(i=h.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,o=n.each(a.call(f.childNodes),function(){f.removeChild(this)})),F(r)&&(s=n(o),n.each(r,function(t,e){v.indexOf(t)>-1?s[t](e):s.attr(t,e)})),o},C.Z=function(t,e){return new X(t,e)},C.isZ=function(t){return t instanceof C.Z},C.init=function(e,i){var r;if(!e)return C.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&h.test(e))r=C.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=C.qsa(u,e)}else{if(L(e))return n(u).ready(e);if(C.isZ(e))return e;if(A(e))r=q(e);else if($(e))r=[e],e=null;else if(h.test(e))r=C.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=C.qsa(u,e)}}return C.Z(r,e)},n=function(t,e){return C.init(t,e)},n.extend=function(t){var e,n=a.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},C.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],o=i||r?e.slice(1):e,s=T.test(o);return t.getElementById&&s&&i?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:a.call(s&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=u.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=D,n.isFunction=L,n.isWindow=k,n.isArray=A,n.isPlainObject=F,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=N,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.noop=function(){},n.map=function(t,e){var n,r,o,i=[];if(R(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return W(i)},n.each=function(t,e){var n,i;if(R(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={constructor:C.Z,length:0,forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,splice:r.splice,indexOf:r.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=C.isZ(e)?e.toArray():e;return o.apply(C.isZ(this)?this.toArray():this,n)},map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(a.apply(this,arguments))},ready:function(t){return E.test(u.readyState)&&u.body?t(n):u.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?a.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return L(t)?this.not(this.not(t)):n(s.call(this,function(e){return C.matches(e,t)}))},add:function(t,e){return n(P(this.concat(n(t,e))))},is:function(t){return this.length>0&&C.matches(this[0],t)},not:function(e){var i=[];if(L(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):R(e)&&L(e.item)?a.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return $(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!$(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!$(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(C.qsa(this[0],t)):this.map(function(){return C.qsa(this,t)}):n()},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:C.matches(i,t));)i=i!==e&&!Z(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!Z(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return V(e,t)},parent:function(t){return V(P(this.pluck("parentNode")),t)},children:function(t){return V(this.map(function(){return U(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||a.call(this.childNodes)})},siblings:function(t){return V(this.map(function(t,e){return s.call(U(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=L(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=L(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(Y(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=Y(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if($(n))for(e in n)J(this,e,n[e]);else J(this,n,Y(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){J(this,t)},this)})},prop:function(t,e){return t=M[t]||t,1 in arguments?this.each(function(n){this[t]=Y(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(g,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?K(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=Y(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=Y(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r,o=this[0];if(!o)return;if(r=getComputedStyle(o,""),"string"==typeof t)return o.style[N(t)]||r.getPropertyValue(t);if(A(t)){var s={};return n.each(t,function(t,e){s[e]=o.style[N(e)]||r.getPropertyValue(e)}),s}}var a="";if("string"==D(t))i||0===i?a=z(t)+":"+_(t,i):this.each(function(){this.style.removeProperty(z(t))});else for(e in t)t[e]||0===t[e]?a+=z(e)+":"+_(e,t[e])+";":this.each(function(){this.style.removeProperty(z(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(G(t))},H(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var r=G(this),o=Y(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&G(this,r+(r?" ":"")+i.join(" "))}}):this},removeClass:function(e){return this.each(function(n){if("className"in this){if(e===t)return G(this,"");i=G(this),Y(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(H(t)," ")}),G(this,i.trim())}})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=Y(this,e,r,G(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=m.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||u.body;t&&!m.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?k(s)?s["inner"+i]:Z(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,Y(this,r,t,s[e]()))})}}),y.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=D(e),"object"==t||"array"==t||null==e?e:C.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null;var f=n.contains(u.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,a),f&&Q(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),C.Z.prototype=X.prototype=n.fn,C.uniq=P,C.deserializeValue=K,n.zepto=C,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=T(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function T(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=w,r&&r.apply(i,arguments)},e[n]=x}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=w)),e}function j(t){var e,i={originalEvent:t};for(e in t)b.test(e)||t[e]===n||(i[e]=t[e]);return T(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var w=function(){return!0},x=function(){return!1},b=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(u===n||a===!1)&&(u=a,a=n),u===!1&&(u=x),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(j(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=x),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):T(e),e._args=n,this.each(function(){e.type in f&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=j(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),T(n)}}(Zepto),function(t){function h(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function p(t,e,i,r){return t.global?h(e||n,i,r):void 0}function d(e){e.global&&0===t.active++&&p(e,null,"ajaxStart")}function m(e){e.global&&!--t.active&&p(e,null,"ajaxStop")}function g(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||p(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void p(e,n,"ajaxSend",[t,e])}function v(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),p(n,r,"ajaxSuccess",[e,n,t]),w(o,e,n)}function y(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),p(i,o,"ajaxError",[n,i,t||e]),w(e,n,i)}function w(t,e,n){var i=n.context;n.complete.call(i,e,t),p(n,i,"ajaxComplete",[e,n]),m(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function E(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function T(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=E(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function C(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?C(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/,l=n.createElement("a");l.href=window.location.href,t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?v(f[0],l,i,r):y(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),g(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var a,u,o=t.extend({},e||{}),s=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===o[i]&&(o[i]=t.ajaxSettings[i]);d(o),o.crossDomain||(a=n.createElement("a"),a.href=o.url,a.href=a.href,o.crossDomain=l.protocol+"//"+l.host!=a.protocol+"//"+a.host),o.url||(o.url=window.location.toString()),(u=o.url.indexOf("#"))>-1&&(o.url=o.url.slice(0,u)),T(o);var f=o.dataType,h=/\?.+=\?/.test(o.url);if(h&&(f="jsonp"),o.cache!==!1&&(e&&e.cache===!0||"script"!=f&&"jsonp"!=f)||(o.url=E(o.url,"_="+Date.now())),"jsonp"==f)return h||(o.url=E(o.url,o.jsonp?o.jsonp+"=?":o.jsonp===!1?"":"callback=?")),t.ajaxJSONP(o,s);var N,p=o.accepts[f],m={},w=function(t,e){m[t.toLowerCase()]=[t,e]},j=/^([\w-]+:)\/\//.test(o.url)?RegExp.$1:window.location.protocol,S=o.xhr(),C=S.setRequestHeader;if(s&&s.promise(S),o.crossDomain||w("X-Requested-With","XMLHttpRequest"),w("Accept",p||"*/*"),(p=o.mimeType||p)&&(p.indexOf(",")>-1&&(p=p.split(",",2)[0]),S.overrideMimeType&&S.overrideMimeType(p)),(o.contentType||o.contentType!==!1&&o.data&&"GET"!=o.type.toUpperCase())&&w("Content-Type",o.contentType||"application/x-www-form-urlencoded"),o.headers)for(r in o.headers)w(r,o.headers[r]);if(S.setRequestHeader=w,S.onreadystatechange=function(){if(4==S.readyState){S.onreadystatechange=x,clearTimeout(N);var e,n=!1;if(S.status>=200&&S.status<300||304==S.status||0==S.status&&"file:"==j){f=f||b(o.mimeType||S.getResponseHeader("content-type")),e=S.responseText;try{"script"==f?(1,eval)(e):"xml"==f?e=S.responseXML:"json"==f&&(e=c.test(e)?null:t.parseJSON(e))}catch(i){n=i}n?y(n,"parsererror",S,o,s):v(e,S,o,s)}else y(S.statusText||null,S.status?"error":"abort",S,o,s)}},g(S,o)===!1)return S.abort(),y(null,"abort",S,o,s),S;if(o.xhrFields)for(r in o.xhrFields)S[r]=o.xhrFields[r];var P="async"in o?o.async:!0;S.open(o.type,o.url,P,o.username,o.password);for(r in m)C.apply(S,m[r]);return o.timeout>0&&(N=setTimeout(function(){S.onreadystatechange=x,S.abort(),y(null,"timeout",S,o,s)},o.timeout)),S.send(o.data?o.data:null),S},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var S=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(S(e)+"="+S(n))},C(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.Callbacks=function(e){e=t.extend({},e);var n,i,r,o,s,a,u=[],f=!e.once&&[],c=function(t){for(n=e.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}r=!1,u&&(f?f.length&&c(f.shift()):n?u.length=0:l.disable())},l={add:function(){if(u){var i=u.length,a=function(n){t.each(n,function(t,n){"function"==typeof n?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!=typeof n&&a(n)})};a(arguments),r?s=u.length:n&&(o=i,c(n))}return this},remove:function(){return u&&t.each(arguments,function(e,n){for(var i;(i=t.inArray(n,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(e){return!(!u||!(e?t.inArray(e,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=f=n=void 0,this},disabled:function(){return!u},lock:function(){return f=void 0,n||l.disable(),this},locked:function(){return!f},fireWith:function(t,e){return!u||i&&!f||(e=e||[],e=[t,e.slice?e.slice():e],r?f.push(e):c(e)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!i}};return l}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(e){return null!=e?t.extend(e,o):o}},s={};return t.each(i,function(t,e){var n=e[2],a=e[3];o[e[1]]=n.add,a&&n.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[e[0]]=function(){return s[e[0]+"With"](this===s?o:this,arguments),this},s[e[0]+"With"]=n.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var f,c,l,r=e.call(arguments),o=r.length,s=0,a=1!==o||i&&t.isFunction(i.promise)?o:0,u=1===a?i:n(),h=function(t,n,i){return function(r){n[t]=this,i[t]=arguments.length>1?e.call(arguments):r,i===f?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(o>1)for(f=new Array(o),c=new Array(o),l=new Array(o);o>s;++s)r[s]&&t.isFunction(r[s].promise)?r[s].promise().done(h(s,l,r)).fail(u.reject).progress(h(s,c,f)):--a;return a||u.resolveWith(l,r),u.promise()},t.Deferred=n}(Zepto),function(t){function u(t,e,n,i){return Math.abs(t-e)>=Math.abs(n-i)?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function f(){o=null,e.last&&(e.el.trigger("longTap"),e={})}function c(){o&&clearTimeout(o),o=null}function l(){n&&clearTimeout(n),i&&clearTimeout(i),r&&clearTimeout(r),o&&clearTimeout(o),n=i=r=o=null,e={}}function h(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function p(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}var n,i,r,o,a,e={},s=750;t(document).ready(function(){var d,m,y,w,g=0,v=0;"MSGesture"in window&&(a=new MSGesture,a.target=document.body),t(document).bind("MSGestureEnd",function(t){var n=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;n&&(e.el.trigger("swipe"),e.el.trigger("swipe"+n))}).on("touchstart MSPointerDown pointerdown",function(i){(!(w=p(i,"down"))||h(i))&&(y=w?i:i.touches[0],i.touches&&1===i.touches.length&&e.x2&&(e.x2=void 0,e.y2=void 0),d=Date.now(),m=d-(e.last||d),e.el=t("tagName"in y.target?y.target:y.target.parentNode),n&&clearTimeout(n),e.x1=y.pageX,e.y1=y.pageY,m>0&&250>=m&&(e.isDoubleTap=!0),e.last=d,o=setTimeout(f,s),a&&w&&a.addPointer(i.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){(!(w=p(t,"move"))||h(t))&&(y=w?t:t.touches[0],c(),e.x2=y.pageX,e.y2=y.pageY,g+=Math.abs(e.x1-e.x2),v+=Math.abs(e.y1-e.y2))}).on("touchend MSPointerUp pointerup",function(o){(!(w=p(o,"up"))||h(o))&&(c(),e.x2&&Math.abs(e.x1-e.x2)>30||e.y2&&Math.abs(e.y1-e.y2)>30?r=setTimeout(function(){e.el.trigger("swipe"),e.el.trigger("swipe"+u(e.x1,e.x2,e.y1,e.y2)),e={}},0):"last"in e&&(30>g&&30>v?i=setTimeout(function(){var i=t.Event("tap");i.cancelTouch=l,e.el.trigger(i),e.isDoubleTap?(e.el&&e.el.trigger("doubleTap"),e={}):n=setTimeout(function(){n=null,e.el&&e.el.trigger("singleTap"),e={}},250)},0):e={}),g=v=0)}).on("touchcancel MSPointerCancel pointercancel",l),t(window).on("scroll",l)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(t){return this.on(e,t)}})}(Zepto),function(t){function r(e){return e=t(e),!(!e.width()&&!e.height())&&"none"!==e.css("display")}function f(t,e){t=t.replace(/=#\]/g,'="#"]');var n,i,r=s.exec(t);if(r&&r[2]in o&&(n=o[r[2]],i=r[3],t=r[1],i)){var a=Number(i);i=isNaN(a)?i.replace(/^["']|["']$/g,""):a}return e(t,n,i)}var e=t.zepto,n=e.qsa,i=e.matches,o=t.expr[":"]={visible:function(){return r(this)?this:void 0},hidden:function(){return r(this)?void 0:this},selected:function(){return this.selected?this:void 0},checked:function(){return this.checked?this:void 0},parent:function(){return this.parentNode},first:function(t){return 0===t?this:void 0},last:function(t,e){return t===e.length-1?this:void 0},eq:function(t,e,n){return t===n?this:void 0},contains:function(e,n,i){return t(this).text().indexOf(i)>-1?this:void 0},has:function(t,n,i){return e.qsa(this,i).length?this:void 0}},s=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),a=/^\s*>/,u="Zepto"+ +new Date;e.qsa=function(i,r){return f(r,function(o,s,f){try{var c;!o&&s?o="*":a.test(o)&&(c=t(i).addClass(u),o="."+u+" "+o);var l=n(i,o)}catch(h){throw console.error("error performing selector: %o",r),h}finally{c&&c.removeClass(u)}return s?e.uniq(t.map(l,function(t,e){return s.call(t,e,l,f)})):l})},e.matches=function(t,e){return f(e,function(e,n,r){return!(e&&!i(t,e)||n&&n.call(t,null,r)!==t)})}}(Zepto);
module.exports = Zepto;

},{}]},{},[3,1])


//# sourceMappingURL=clappr.map