import { KJUR, KEYUTIL, b64tohex, X509, hextob64u } from 'jsrsasign';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.
var nopLogger = {
  debug: function debug() {
    return undefined;
  },
  info: function info() {
    return undefined;
  },
  warn: function warn() {
    return undefined;
  },
  error: function error() {
    return undefined;
  }
};
var NONE = 0;
var ERROR = 1;
var WARN = 2;
var INFO = 3;
var DEBUG = 4;
var logger;
var level;
var Log = /*#__PURE__*/function () {
  function Log() {}

  Log.reset = function reset() {
    level = INFO;
    logger = nopLogger;
  };

  Log.debug = function debug() {
    if (level >= DEBUG) {
      var _logger;

      (_logger = logger).debug.apply(_logger, arguments);
    }
  };

  Log.info = function info() {
    if (level >= INFO) {
      var _logger2;

      (_logger2 = logger).info.apply(_logger2, arguments);
    }
  };

  Log.warn = function warn() {
    if (level >= WARN) {
      var _logger3;

      (_logger3 = logger).warn.apply(_logger3, arguments);
    }
  };

  Log.error = function error() {
    if (level >= ERROR) {
      var _logger4;

      (_logger4 = logger).error.apply(_logger4, arguments);
    }
  };

  _createClass(Log, null, [{
    key: "NONE",
    get: function get() {
      return NONE;
    }
  }, {
    key: "ERROR",
    get: function get() {
      return ERROR;
    }
  }, {
    key: "WARN",
    get: function get() {
      return WARN;
    }
  }, {
    key: "INFO",
    get: function get() {
      return INFO;
    }
  }, {
    key: "DEBUG",
    get: function get() {
      return DEBUG;
    }
  }, {
    key: "level",
    get: function get() {
      return level;
    },
    set: function set(value) {
      if (NONE > value || value > DEBUG) {
        throw new Error("Invalid log level");
      }

      level = value;
    }
  }, {
    key: "logger",
    get: function get() {
      return logger;
    },
    set: function set(value) {
      logger = value;
    }
  }]);

  return Log;
}();
Log.reset();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var Event = /*#__PURE__*/function () {
  function Event(name) {
    this._name = void 0;
    this._callbacks = void 0;
    this._name = name;
    this._callbacks = [];
  }

  var _proto = Event.prototype;

  _proto.addHandler = function addHandler(cb) {
    this._callbacks.push(cb);
  };

  _proto.removeHandler = function removeHandler(cb) {
    var idx = this._callbacks.findIndex(function (item) {
      return item === cb;
    });

    if (idx >= 0) {
      this._callbacks.splice(idx, 1);
    }
  };

  _proto.raise = function raise() {
    Log.debug("Event: Raising event: " + this._name);

    for (var i = 0; i < this._callbacks.length; i++) {
      var _this$_callbacks;

      void (_this$_callbacks = this._callbacks)[i].apply(_this$_callbacks, arguments);
    }
  };

  return Event;
}();

var DefaultTimerDurationInSeconds = 5; // seconds

var g_timer = {
  setInterval: function setInterval(cb, duration) {
    return window.setInterval(cb, duration);
  },
  clearInterval: function clearInterval(handle) {
    return window.clearInterval(handle);
  }
};
var Timer = /*#__PURE__*/function (_Event) {
  _inheritsLoose(Timer, _Event);

  function Timer(name) {
    var _this;

    _this = _Event.call(this, name) || this;
    _this._timer = void 0;
    _this._timerHandle = void 0;
    _this._expiration = void 0;
    _this._timer = g_timer;
    _this._timerHandle = null;
    _this._expiration = 0;
    return _this;
  } // get the time


  Timer.getEpochTime = function getEpochTime() {
    return Math.floor(Date.now() / 1000);
  };

  var _proto = Timer.prototype;

  _proto.init = function init(durationInSeconds) {
    if (durationInSeconds <= 0) {
      durationInSeconds = 1;
    }

    durationInSeconds = Math.floor(durationInSeconds);
    var expiration = Timer.getEpochTime() + durationInSeconds;

    if (this.expiration === expiration && this._timerHandle) {
      // no need to reinitialize to same expiration, so bail out
      Log.debug("Timer.init timer " + this._name + " skipping initialization since already initialized for expiration:", this.expiration);
      return;
    }

    this.cancel();
    Log.debug("Timer.init timer " + this._name + " for duration:", durationInSeconds);
    this._expiration = expiration; // we're using a fairly short timer and then checking the expiration in the
    // callback to handle scenarios where the browser device sleeps, and then
    // the timers end up getting delayed.

    var timerDurationInSeconds = DefaultTimerDurationInSeconds;

    if (durationInSeconds < timerDurationInSeconds) {
      timerDurationInSeconds = durationInSeconds;
    }

    this._timerHandle = this._timer.setInterval(this._callback.bind(this), timerDurationInSeconds * 1000);
  };

  _proto.cancel = function cancel() {
    if (this._timerHandle) {
      Log.debug("Timer.cancel: ", this._name);

      this._timer.clearInterval(this._timerHandle);

      this._timerHandle = null;
    }
  };

  _proto._callback = function _callback() {
    var diff = this._expiration - Timer.getEpochTime();
    Log.debug("Timer.callback; " + this._name + " timer expires in:", diff);

    if (this._expiration <= Timer.getEpochTime()) {
      this.cancel();

      _Event.prototype.raise.call(this);
    }
  };

  _createClass(Timer, [{
    key: "expiration",
    get: function get() {
      return this._expiration;
    }
  }]);

  return Timer;
}(Event);

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var AllowedSigningAlgs = ["RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512"];
var JoseUtil = /*#__PURE__*/function () {
  function JoseUtil() {}

  JoseUtil.parseJwt = function parseJwt(jwt) {
    Log.debug("JoseUtil.parseJwt");

    try {
      var token = KJUR.jws.JWS.parse(jwt);
      return {
        header: token.headerObj,
        payload: token.payloadObj
      };
    } catch (err) {
      Log.error(err instanceof Error ? err.message : err);
      return null;
    }
  };

  JoseUtil.validateJwt = function validateJwt(jwt, key, issuer, audience, clockSkew, now, timeInsensitive) {
    if (timeInsensitive === void 0) {
      timeInsensitive = false;
    }

    Log.debug("JoseUtil.validateJwt");

    try {
      if (key.kty === "RSA") {
        if (key.e && key.n) {
          key = KEYUTIL.getKey(key);
        } else if (key.x5c && key.x5c.length) {
          var hex = b64tohex(key.x5c[0]);
          key = X509.getPublicKeyFromCertHex(hex);
        } else {
          Log.error("JoseUtil.validateJwt: RSA key missing key material", key);
          throw new Error("RSA key missing key material");
        }
      } else if (key.kty === "EC") {
        if (key.crv && key.x && key.y) {
          key = KEYUTIL.getKey(key);
        } else {
          Log.error("JoseUtil.validateJwt: EC key missing key material", key);
          throw new Error("EC key missing key material");
        }
      } else {
        Log.error("JoseUtil.validateJwt: Unsupported key type", key && key.kty);
        throw new Error("Unsupported key type: " + (key ? String(key.kty) : "undefined"));
      }

      return JoseUtil._validateJwt(jwt, key, issuer, audience, clockSkew, now, timeInsensitive);
    } catch (err) {
      Log.error(err instanceof Error ? err.message : err);
      throw err;
    }
  };

  JoseUtil.validateJwtAttributes = function validateJwtAttributes(jwt, issuer, audience, clockSkew, now, timeInsensitive) {
    if (timeInsensitive === void 0) {
      timeInsensitive = false;
    }

    if (!now) {
      now = Timer.getEpochTime();
    }

    var parsedJwt = JoseUtil.parseJwt(jwt);

    if (!parsedJwt || !parsedJwt.payload) {
      throw new Error("Failed to parse token");
    }

    var payload = parsedJwt.payload;

    if (!payload.iss) {
      Log.error("JoseUtil._validateJwt: issuer was not provided");
      throw new Error("issuer was not provided");
    }

    if (payload.iss !== issuer) {
      Log.error("JoseUtil._validateJwt: Invalid issuer in token", payload.iss);
      throw new Error("Invalid issuer in token: " + String(payload.iss));
    }

    if (!payload.aud) {
      Log.error("JoseUtil._validateJwt: aud was not provided");
      throw new Error("aud was not provided");
    }

    var validAudience = payload.aud === audience || Array.isArray(payload.aud) && payload.aud.indexOf(audience) >= 0;

    if (!validAudience) {
      Log.error("JoseUtil._validateJwt: Invalid audience in token", payload.aud);
      throw new Error("Invalid audience in token: " + String(payload.aud));
    }

    if (payload.azp && payload.azp !== audience) {
      Log.error("JoseUtil._validateJwt: Invalid azp in token", payload.azp);
      throw new Error("Invalid azp in token: " + String(payload.azp));
    }

    if (!timeInsensitive) {
      var lowerNow = now + clockSkew;
      var upperNow = now - clockSkew;

      if (!payload.iat) {
        Log.error("JoseUtil._validateJwt: iat was not provided");
        throw new Error("iat was not provided");
      }

      if (lowerNow < payload.iat) {
        Log.error("JoseUtil._validateJwt: iat is in the future", payload.iat);
        throw new Error("iat is in the future: " + String(payload.iat));
      }

      if (payload.nbf && lowerNow < payload.nbf) {
        Log.error("JoseUtil._validateJwt: nbf is in the future", payload.nbf);
        throw new Error("nbf is in the future: " + String(payload.nbf));
      }

      if (!payload.exp) {
        Log.error("JoseUtil._validateJwt: exp was not provided");
        throw new Error("exp was not provided");
      }

      if (payload.exp < upperNow) {
        Log.error("JoseUtil._validateJwt: exp is in the past", payload.exp);
        throw new Error("exp is in the past: " + String(payload.exp));
      }
    }

    return payload;
  };

  JoseUtil._validateJwt = function _validateJwt(jwt, key, issuer, audience, clockSkew, now, timeInsensitive) {
    if (timeInsensitive === void 0) {
      timeInsensitive = false;
    }

    var payload = JoseUtil.validateJwtAttributes(jwt, issuer, audience, clockSkew, now, timeInsensitive);
    var isValid;

    try {
      isValid = KJUR.jws.JWS.verify(jwt, key, AllowedSigningAlgs);
    } catch (err) {
      Log.error(err instanceof Error ? err.message : err);
      throw new Error("signature validation failed");
    }

    if (!isValid) {
      Log.error("JoseUtil._validateJwt: signature validation failed");
      throw new Error("signature validation failed");
    }

    return payload;
  };

  JoseUtil.hashString = function hashString(value, alg) {
    try {
      return KJUR.crypto.Util.hashString(value, alg);
    } catch (err) {
      Log.error(err);
      throw err;
    }
  };

  JoseUtil.hexToBase64Url = function hexToBase64Url(value) {
    try {
      return hextob64u(value);
    } catch (err) {
      Log.error(err);
      throw err;
    }
  };

  return JoseUtil;
}();

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/restrict-plus-operands */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/**
 * Generates RFC4122 version 4 guid ()
 */
// @ts-ignore
var crypto = typeof window !== "undefined" ? window.crypto || window.msCrypto : undefined;

function _cryptoUuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  });
}

function _uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ Math.random() * 16 >> c / 4).toString(16);
  });
}

function random() {
  var hasRandomValues = crypto && Object.prototype.hasOwnProperty.call(crypto, "getRandomValues");
  var uuid = hasRandomValues ? _cryptoUuidv4 : _uuidv4;
  return uuid().replace(/-/g, "");
}

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var UrlUtility = /*#__PURE__*/function () {
  function UrlUtility() {}

  UrlUtility.addQueryParam = function addQueryParam(url, name, value) {
    if (url.indexOf("?") < 0) {
      url += "?";
    }

    if (url[url.length - 1] !== "?") {
      url += "&";
    }

    url += encodeURIComponent(name);
    url += "=";
    url += encodeURIComponent(value);
    return url;
  };

  UrlUtility.parseUrlFragment = function parseUrlFragment(value, delimiter) {
    if (delimiter === void 0) {
      delimiter = "#";
    }

    if (!value) {
      value = location.href;
    }

    var idx = value.lastIndexOf(delimiter);

    if (idx >= 0) {
      value = value.substr(idx + 1);
    }

    if (delimiter === "?") {
      // if we're doing query, then strip off hash fragment before we parse
      idx = value.indexOf("#");

      if (idx >= 0) {
        value = value.substr(0, idx);
      }
    }

    var params = {};
    var regex = /([^&=]+)=([^&]*)/g;
    var m;
    var counter = 0;

    while ((m = regex.exec(value)) !== null) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2].replace(/\+/g, " "));

      if (counter++ > 50) {
        Log.error("UrlUtility.parseUrlFragment: response exceeded expected number of parameters", value);
        return {
          error: "Response exceeded expected number of parameters"
        };
      }
    }

    return params;
  };

  return UrlUtility;
}();

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire();
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var WebStorageStateStore = /*#__PURE__*/function () {
  function WebStorageStateStore(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$prefix = _ref.prefix,
        prefix = _ref$prefix === void 0 ? "oidc." : _ref$prefix,
        _ref$store = _ref.store,
        store = _ref$store === void 0 ? localStorage : _ref$store;

    this._store = void 0;
    this._prefix = void 0;
    this._store = store;
    this._prefix = prefix;
  }

  var _proto = WebStorageStateStore.prototype;

  _proto.set = function set(key, value) {
    Log.debug("WebStorageStateStore.set", key);
    key = this._prefix + key;

    this._store.setItem(key, value);

    return Promise.resolve();
  };

  _proto.get = function get(key) {
    Log.debug("WebStorageStateStore.get", key);
    key = this._prefix + key;

    var item = this._store.getItem(key);

    return Promise.resolve(item);
  };

  _proto.remove = function remove(key) {
    Log.debug("WebStorageStateStore.remove", key);
    key = this._prefix + key;

    var item = this._store.getItem(key);

    this._store.removeItem(key);

    return Promise.resolve(item);
  };

  _proto.getAllKeys = function getAllKeys() {
    Log.debug("WebStorageStateStore.getAllKeys");
    var keys = [];

    for (var index = 0; index < this._store.length; index++) {
      var key = this._store.key(index);

      if (key && key.indexOf(this._prefix) === 0) {
        keys.push(key.substr(this._prefix.length));
      }
    }

    return Promise.resolve(keys);
  };

  return WebStorageStateStore;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var DefaultResponseType = "code";
var DefaultScope = "openid";
var DefaultClientAuthentication = "client_secret_post"; // The default value must be client_secret_basic, as explained in https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication

var DefaultStaleStateAgeInSeconds = 60 * 15; // seconds

var DefaultClockSkewInSeconds = 60 * 5;
var OidcClientSettingsStore = // metadata
// client config
// optional protocol params
// behavior flags
// extra
function OidcClientSettingsStore(_ref) {
  var authority = _ref.authority,
      metadataUrl = _ref.metadataUrl,
      metadata = _ref.metadata,
      signingKeys = _ref.signingKeys,
      metadataSeed = _ref.metadataSeed,
      client_id = _ref.client_id,
      client_secret = _ref.client_secret,
      _ref$response_type = _ref.response_type,
      response_type = _ref$response_type === void 0 ? DefaultResponseType : _ref$response_type,
      _ref$scope = _ref.scope,
      scope = _ref$scope === void 0 ? DefaultScope : _ref$scope,
      redirect_uri = _ref.redirect_uri,
      post_logout_redirect_uri = _ref.post_logout_redirect_uri,
      _ref$client_authentic = _ref.client_authentication,
      client_authentication = _ref$client_authentic === void 0 ? DefaultClientAuthentication : _ref$client_authentic,
      prompt = _ref.prompt,
      display = _ref.display,
      max_age = _ref.max_age,
      ui_locales = _ref.ui_locales,
      acr_values = _ref.acr_values,
      resource = _ref.resource,
      response_mode = _ref.response_mode,
      _ref$filterProtocolCl = _ref.filterProtocolClaims,
      filterProtocolClaims = _ref$filterProtocolCl === void 0 ? true : _ref$filterProtocolCl,
      _ref$loadUserInfo = _ref.loadUserInfo,
      loadUserInfo = _ref$loadUserInfo === void 0 ? true : _ref$loadUserInfo,
      _ref$staleStateAgeInS = _ref.staleStateAgeInSeconds,
      staleStateAgeInSeconds = _ref$staleStateAgeInS === void 0 ? DefaultStaleStateAgeInSeconds : _ref$staleStateAgeInS,
      _ref$clockSkewInSecon = _ref.clockSkewInSeconds,
      clockSkewInSeconds = _ref$clockSkewInSecon === void 0 ? DefaultClockSkewInSeconds : _ref$clockSkewInSecon,
      _ref$userInfoJwtIssue = _ref.userInfoJwtIssuer,
      userInfoJwtIssuer = _ref$userInfoJwtIssue === void 0 ? "OP" : _ref$userInfoJwtIssue,
      _ref$mergeClaims = _ref.mergeClaims,
      mergeClaims = _ref$mergeClaims === void 0 ? false : _ref$mergeClaims,
      _ref$stateStore = _ref.stateStore,
      stateStore = _ref$stateStore === void 0 ? new WebStorageStateStore() : _ref$stateStore,
      _ref$extraQueryParams = _ref.extraQueryParams,
      extraQueryParams = _ref$extraQueryParams === void 0 ? {} : _ref$extraQueryParams,
      _ref$extraTokenParams = _ref.extraTokenParams,
      extraTokenParams = _ref$extraTokenParams === void 0 ? {} : _ref$extraTokenParams;
  this.authority = void 0;
  this.metadataUrl = void 0;
  this.metadata = void 0;
  this.metadataSeed = void 0;
  this.signingKeys = void 0;
  this.client_id = void 0;
  this.client_secret = void 0;
  this.response_type = void 0;
  this.scope = void 0;
  this.redirect_uri = void 0;
  this.post_logout_redirect_uri = void 0;
  this.client_authentication = void 0;
  this.prompt = void 0;
  this.display = void 0;
  this.max_age = void 0;
  this.ui_locales = void 0;
  this.acr_values = void 0;
  this.resource = void 0;
  this.response_mode = void 0;
  this.filterProtocolClaims = void 0;
  this.loadUserInfo = void 0;
  this.staleStateAgeInSeconds = void 0;
  this.clockSkewInSeconds = void 0;
  this.userInfoJwtIssuer = void 0;
  this.mergeClaims = void 0;
  this.stateStore = void 0;
  this.extraQueryParams = void 0;
  this.extraTokenParams = void 0;
  this.authority = authority;
  this.metadataUrl = metadataUrl;
  this.metadata = metadata;
  this.metadataSeed = metadataSeed;
  this.signingKeys = signingKeys;
  this.client_id = client_id;
  this.client_secret = client_secret;
  this.response_type = response_type;
  this.scope = scope;
  this.redirect_uri = redirect_uri;
  this.post_logout_redirect_uri = post_logout_redirect_uri;
  this.client_authentication = client_authentication;
  this.prompt = prompt;
  this.display = display;
  this.max_age = max_age;
  this.ui_locales = ui_locales;
  this.acr_values = acr_values;
  this.resource = resource;
  this.response_mode = response_mode;
  this.filterProtocolClaims = !!filterProtocolClaims;
  this.loadUserInfo = !!loadUserInfo;
  this.staleStateAgeInSeconds = staleStateAgeInSeconds;
  this.clockSkewInSeconds = clockSkewInSeconds;
  this.userInfoJwtIssuer = userInfoJwtIssuer;
  this.mergeClaims = !!mergeClaims;
  this.stateStore = stateStore;
  this.extraQueryParams = extraQueryParams;
  this.extraTokenParams = extraTokenParams;
};

var JsonService = /*#__PURE__*/function () {
  function JsonService(additionalContentTypes, jwtHandler) {
    if (additionalContentTypes === void 0) {
      additionalContentTypes = [];
    }

    if (jwtHandler === void 0) {
      jwtHandler = null;
    }

    this._contentTypes = void 0;
    this._jwtHandler = void 0;
    this._contentTypes = additionalContentTypes.slice();

    this._contentTypes.push("application/json");

    if (jwtHandler) {
      this._contentTypes.push("application/jwt");
    }

    this._jwtHandler = jwtHandler;
  }

  var _proto = JsonService.prototype;

  _proto.getJson = /*#__PURE__*/function () {
    var _getJson = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(url, token) {
      var headers, response, allowedContentTypes, jwtHandler, contentType, found, text, json;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (url) {
                _context.next = 3;
                break;
              }

              Log.error("JsonService.getJson: No url passed");
              throw new Error("url");

            case 3:
              headers = {};

              if (token) {
                Log.debug("JsonService.getJson: token passed, setting Authorization header");
                headers["Authorization"] = "Bearer " + token;
              }

              _context.prev = 5;
              Log.debug("JsonService.getJson, url: ", url);
              _context.next = 9;
              return fetch(url, {
                method: "GET",
                headers: headers
              });

            case 9:
              response = _context.sent;
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](5);
              Log.error("JsonService.getJson: network error");
              throw new Error("Network Error");

            case 16:
              allowedContentTypes = this._contentTypes;
              jwtHandler = this._jwtHandler;
              Log.debug("JsonService.getJson: HTTP response received, status", response.status);

              if (!(response.status === 200)) {
                _context.next = 43;
                break;
              }

              contentType = response.headers.get("Content-Type");

              if (!contentType) {
                _context.next = 42;
                break;
              }

              found = allowedContentTypes.find(function (item) {
                return contentType.startsWith(item);
              });

              if (!(found === "application/jwt")) {
                _context.next = 30;
                break;
              }

              _context.next = 26;
              return response.text();

            case 26:
              text = _context.sent;
              _context.next = 29;
              return jwtHandler(text);

            case 29:
              return _context.abrupt("return", _context.sent);

            case 30:
              if (!found) {
                _context.next = 42;
                break;
              }

              _context.prev = 31;
              _context.next = 34;
              return response.json();

            case 34:
              json = _context.sent;
              return _context.abrupt("return", json);

            case 38:
              _context.prev = 38;
              _context.t1 = _context["catch"](31);
              Log.error("JsonService.getJson: Error parsing JSON response", _context.t1 instanceof Error ? _context.t1.message : _context.t1);
              throw _context.t1;

            case 42:
              throw new Error("Invalid response Content-Type: " + (contentType != null ? contentType : "undefined") + ", from URL: " + url);

            case 43:
              throw new Error(response.statusText + " (" + response.status.toString() + ")");

            case 44:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[5, 12], [31, 38]]);
    }));

    function getJson(_x, _x2) {
      return _getJson.apply(this, arguments);
    }

    return getJson;
  }();

  _proto.postForm = /*#__PURE__*/function () {
    var _postForm = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(url, payload, basicAuth) {
      var headers, body, key, value, response, allowedContentTypes, contentType, found, json, _contentType, _found, _json;

      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (url) {
                _context2.next = 3;
                break;
              }

              Log.error("JsonService.postForm: No url passed");
              throw new Error("url");

            case 3:
              headers = {
                "Content-Type": "application/x-www-form-urlencoded"
              };

              if (basicAuth !== undefined) {
                headers["Authorization"] = "Basic " + btoa(basicAuth);
              }

              body = new URLSearchParams();

              for (key in payload) {
                value = payload[key];

                if (value) {
                  body.set(key, value);
                }
              }

              _context2.prev = 7;
              Log.debug("JsonService.postForm, url: ", url);
              _context2.next = 11;
              return fetch(url, {
                method: "POST",
                headers: headers,
                body: body
              });

            case 11:
              response = _context2.sent;
              _context2.next = 18;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](7);
              Log.error("JsonService.postForm: network error");
              throw new Error("Network Error");

            case 18:
              allowedContentTypes = this._contentTypes;
              Log.debug("JsonService.postForm: HTTP response received, status", response.status);

              if (!(response.status === 200)) {
                _context2.next = 39;
                break;
              }

              contentType = response.headers.get("Content-Type");

              if (!contentType) {
                _context2.next = 36;
                break;
              }

              found = allowedContentTypes.find(function (item) {
                return contentType.startsWith(item);
              });

              if (!found) {
                _context2.next = 36;
                break;
              }

              _context2.prev = 25;
              _context2.next = 28;
              return response.json();

            case 28:
              json = _context2.sent;
              return _context2.abrupt("return", json);

            case 32:
              _context2.prev = 32;
              _context2.t1 = _context2["catch"](25);
              Log.error("JsonService.postForm: Error parsing JSON response", _context2.t1 instanceof Error ? _context2.t1.message : _context2.t1);
              throw _context2.t1;

            case 36:
              throw new Error("Invalid response Content-Type: " + (contentType != null ? contentType : "undefined") + ", from URL: " + url);

            case 39:
              if (!(response.status === 400)) {
                _context2.next = 59;
                break;
              }

              _contentType = response.headers.get("Content-Type");

              if (!_contentType) {
                _context2.next = 58;
                break;
              }

              _found = allowedContentTypes.find(function (item) {
                return _contentType.startsWith(item);
              });

              if (!_found) {
                _context2.next = 58;
                break;
              }

              _context2.prev = 44;
              _context2.next = 47;
              return response.json();

            case 47:
              _json = _context2.sent;

              if (!(_json && _json.error)) {
                _context2.next = 51;
                break;
              }

              Log.error("JsonService.postForm: Error from server: ", _json.error);
              throw new Error(payload.error);

            case 51:
              return _context2.abrupt("return", _json);

            case 54:
              _context2.prev = 54;
              _context2.t2 = _context2["catch"](44);
              Log.error("JsonService.postForm: Error parsing JSON response", _context2.t2 instanceof Error ? _context2.t2.message : _context2.t2);
              throw _context2.t2;

            case 58:
              throw new Error("Invalid response Content-Type: " + (_contentType != null ? _contentType : "undefined") + ", from URL: " + url);

            case 59:
              throw new Error(response.statusText + " (" + response.status.toString() + ")");

            case 60:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[7, 14], [25, 32], [44, 54]]);
    }));

    function postForm(_x3, _x4, _x5) {
      return _postForm.apply(this, arguments);
    }

    return postForm;
  }();

  return JsonService;
}();

var UserInfoService = /*#__PURE__*/function () {
  function UserInfoService(settings, metadataService) {
    this._settings = void 0;
    this._jsonService = void 0;
    this._metadataService = void 0;
    this._settings = settings;
    this._jsonService = new JsonService(undefined, this._getClaimsFromJwt.bind(this));
    this._metadataService = metadataService;
  }

  var _proto = UserInfoService.prototype;

  _proto.getClaims = /*#__PURE__*/function () {
    var _getClaims = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(token) {
      var url, claims;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (token) {
                _context.next = 3;
                break;
              }

              Log.error("UserInfoService.getClaims: No token passed");
              throw new Error("A token is required");

            case 3:
              _context.next = 5;
              return this._metadataService.getUserInfoEndpoint();

            case 5:
              url = _context.sent;
              Log.debug("UserInfoService.getClaims: received userinfo url", url);
              _context.next = 9;
              return this._jsonService.getJson(url, token);

            case 9:
              claims = _context.sent;
              Log.debug("UserInfoService.getClaims: claims received", claims);
              return _context.abrupt("return", claims);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getClaims(_x) {
      return _getClaims.apply(this, arguments);
    }

    return getClaims;
  }();

  _proto._getClaimsFromJwt = /*#__PURE__*/function () {
    var _getClaimsFromJwt2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(responseText) {
      var jwt, header, payload, issuer, keys, key, _keys$filter$, audience, clockSkewInSeconds;

      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              jwt = JoseUtil.parseJwt(responseText);

              if (!(!jwt || !jwt.header || !jwt.payload)) {
                _context2.next = 5;
                break;
              }

              Log.error("UserInfoService._getClaimsFromJwt: Failed to parse JWT", jwt);
              throw new Error("Failed to parse id_token");

            case 5:
              header = jwt.header;
              payload = jwt.payload;
              _context2.t0 = this._settings.userInfoJwtIssuer;
              _context2.next = _context2.t0 === "OP" ? 10 : _context2.t0 === "ANY" ? 14 : 16;
              break;

            case 10:
              _context2.next = 12;
              return this._metadataService.getIssuer();

            case 12:
              issuer = _context2.sent;
              return _context2.abrupt("break", 18);

            case 14:
              issuer = payload.iss;
              return _context2.abrupt("break", 18);

            case 16:
              issuer = this._settings.userInfoJwtIssuer;
              return _context2.abrupt("break", 18);

            case 18:
              Log.debug("UserInfoService._getClaimsFromJwt: Received issuer:" + issuer);
              _context2.next = 21;
              return this._metadataService.getSigningKeys();

            case 21:
              keys = _context2.sent;

              if (keys) {
                _context2.next = 25;
                break;
              }

              Log.error("UserInfoService._getClaimsFromJwt: No signing keys from metadata");
              throw new Error("No signing keys from metadata");

            case 25:
              Log.debug("UserInfoService._getClaimsFromJwt: Received signing keys");

              if (!header.kid) {
                _context2.next = 30;
                break;
              }

              key = (_keys$filter$ = keys.filter(function (key) {
                return key.kid === header.kid;
              })[0]) != null ? _keys$filter$ : null;
              _context2.next = 35;
              break;

            case 30:
              keys = this._filterByAlg(keys, jwt.header.alg);

              if (!(keys.length !== 1)) {
                _context2.next = 34;
                break;
              }

              Log.error("UserInfoService._getClaimsFromJwt: No kid found in id_token and more than one key found in metadata");
              throw new Error("No kid found in id_token and more than one key found in metadata");

            case 34:
              // kid is mandatory only when there are multiple keys in the referenced JWK Set document
              // see http://openid.net/specs/openid-connect-core-1_0.html#Signing
              key = keys[0];

            case 35:
              if (key) {
                _context2.next = 38;
                break;
              }

              Log.error("UserInfoService._getClaimsFromJwt: No key matching kid or alg found in signing keys");
              throw new Error("No key matching kid or alg found in signing keys");

            case 38:
              audience = this._settings.client_id;
              clockSkewInSeconds = this._settings.clockSkewInSeconds;
              Log.debug("UserInfoService._getClaimsFromJwt: Validaing JWT; using clock skew (in seconds) of: ", clockSkewInSeconds);
              JoseUtil.validateJwt(responseText, key, issuer, audience, clockSkewInSeconds, undefined, true);
              Log.debug("UserInfoService._getClaimsFromJwt: JWT validation successful");
              return _context2.abrupt("return", payload);

            case 46:
              _context2.prev = 46;
              _context2.t1 = _context2["catch"](0);
              Log.error("UserInfoService._getClaimsFromJwt: Error parsing JWT response", _context2.t1 instanceof Error ? _context2.t1.message : _context2.t1);
              throw _context2.t1;

            case 50:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 46]]);
    }));

    function _getClaimsFromJwt(_x2) {
      return _getClaimsFromJwt2.apply(this, arguments);
    }

    return _getClaimsFromJwt;
  }();

  _proto._filterByAlg = function _filterByAlg(keys, alg) {
    var kty = null;

    if (alg.startsWith("RS")) {
      kty = "RSA";
    } else if (alg.startsWith("PS")) {
      kty = "PS";
    } else if (alg.startsWith("ES")) {
      kty = "EC";
    } else {
      Log.debug("UserInfoService._filterByAlg: alg not supported: ", alg);
      return [];
    }

    Log.debug("UserInfoService._filterByAlg: Looking for keys that match kty: ", kty);
    keys = keys.filter(function (key) {
      return key.kty === kty;
    });
    Log.debug("UserInfoService._filterByAlg: Number of keys that match kty: ", kty, keys.length);
    return keys;
  };

  return UserInfoService;
}();

var TokenClient = /*#__PURE__*/function () {
  function TokenClient(settings, metadataService) {
    this._settings = void 0;
    this._jsonService = void 0;
    this._metadataService = void 0;
    this._settings = settings;
    this._jsonService = new JsonService();
    this._metadataService = metadataService;
  }

  var _proto = TokenClient.prototype;

  _proto.exchangeCode = /*#__PURE__*/function () {
    var _exchangeCode = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(args) {
      var client_authentication, basicAuth, url, response;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              args = Object.assign({}, args);
              args.grant_type = args.grant_type || "authorization_code";
              args.client_id = args.client_id || this._settings.client_id;
              args.client_secret = args.client_secret || this._settings.client_secret;
              args.redirect_uri = args.redirect_uri || this._settings.redirect_uri;
              client_authentication = this._settings.client_authentication;

              if (args.client_id) {
                _context.next = 9;
                break;
              }

              Log.error("TokenClient.exchangeCode: No client_id passed");
              throw new Error("A client_id is required");

            case 9:
              if (args.redirect_uri) {
                _context.next = 12;
                break;
              }

              Log.error("TokenClient.exchangeCode: No redirect_uri passed");
              throw new Error("A redirect_uri is required");

            case 12:
              if (args.code) {
                _context.next = 15;
                break;
              }

              Log.error("TokenClient.exchangeCode: No code passed");
              throw new Error("A code is required");

            case 15:
              if (args.code_verifier) {
                _context.next = 18;
                break;
              }

              Log.error("TokenClient.exchangeCode: No code_verifier passed");
              throw new Error("A code_verifier is required");

            case 18:
              // Sending the client credentials using the Basic Auth method
              basicAuth = undefined;

              if (!(client_authentication == "client_secret_basic")) {
                _context.next = 26;
                break;
              }

              if (args.client_secret) {
                _context.next = 23;
                break;
              }

              Log.error("TokenClient.exchangeCode: No client_secret passed");
              throw new Error("A client_secret is required");

            case 23:
              basicAuth = args.client_id + ":" + args.client_secret;
              delete args.client_id;
              delete args.client_secret;

            case 26:
              _context.next = 28;
              return this._metadataService.getTokenEndpoint(false);

            case 28:
              url = _context.sent;
              Log.debug("TokenClient.exchangeCode: Received token endpoint");
              _context.next = 32;
              return this._jsonService.postForm(url, args, basicAuth);

            case 32:
              response = _context.sent;
              Log.debug("TokenClient.exchangeCode: response received");
              return _context.abrupt("return", response);

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function exchangeCode(_x) {
      return _exchangeCode.apply(this, arguments);
    }

    return exchangeCode;
  }();

  _proto.exchangeRefreshToken = /*#__PURE__*/function () {
    var _exchangeRefreshToken = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(args) {
      var client_authentication, basicAuth, url, response;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              args = Object.assign({}, args);
              args.grant_type = args.grant_type || "refresh_token";
              args.client_id = args.client_id || this._settings.client_id;
              args.client_secret = args.client_secret || this._settings.client_secret;
              client_authentication = this._settings.client_authentication;

              if (args.refresh_token) {
                _context2.next = 8;
                break;
              }

              Log.error("TokenClient.exchangeRefreshToken: No refresh_token passed");
              throw new Error("A refresh_token is required");

            case 8:
              if (args.client_id) {
                _context2.next = 11;
                break;
              }

              Log.error("TokenClient.exchangeRefreshToken: No client_id passed");
              throw new Error("A client_id is required");

            case 11:
              // Sending the client credentials using the Basic Auth method
              basicAuth = undefined;

              if (!(client_authentication == "client_secret_basic")) {
                _context2.next = 19;
                break;
              }

              if (args.client_secret) {
                _context2.next = 16;
                break;
              }

              Log.error("TokenClient.exchangeCode: No client_secret passed");
              throw new Error("A client_secret is required");

            case 16:
              basicAuth = args.client_id + ":" + args.client_secret;
              delete args.client_id;
              delete args.client_secret;

            case 19:
              _context2.next = 21;
              return this._metadataService.getTokenEndpoint(false);

            case 21:
              url = _context2.sent;
              Log.debug("TokenClient.exchangeRefreshToken: Received token endpoint");
              _context2.next = 25;
              return this._jsonService.postForm(url, args, basicAuth);

            case 25:
              response = _context2.sent;
              Log.debug("TokenClient.exchangeRefreshToken: response received");
              return _context2.abrupt("return", response);

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function exchangeRefreshToken(_x2) {
      return _exchangeRefreshToken.apply(this, arguments);
    }

    return exchangeRefreshToken;
  }();

  return TokenClient;
}();

var ErrorResponse = /*#__PURE__*/function (_Error) {
  _inheritsLoose(ErrorResponse, _Error);

  function ErrorResponse(args) {
    var _this;

    if (!args.error) {
      Log.error("No error passed to ErrorResponse");
      throw new Error("error");
    }

    _this = _Error.call(this, args.error_description || args.error) || this;
    _this.name = void 0;
    _this.error = void 0;
    _this.error_description = void 0;
    _this.error_uri = void 0;
    _this.state = void 0;
    _this.session_state = void 0;
    _this.name = "ErrorResponse";
    _this.error = args.error;
    _this.error_description = args.error_description;
    _this.error_uri = args.error_uri;
    _this.state = args.state;
    _this.session_state = args.session_state;
    return _this;
  }

  return ErrorResponse;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var ProtocolClaims = ["nonce", "at_hash", "iat", "nbf", "exp", "aud", "iss", "c_hash"];
var ResponseValidator = /*#__PURE__*/function () {
  function ResponseValidator(settings, metadataService) {
    this._settings = void 0;
    this._metadataService = void 0;
    this._userInfoService = void 0;
    this._tokenClient = void 0;
    this._settings = settings;
    this._metadataService = metadataService;
    this._userInfoService = new UserInfoService(this._settings, metadataService);
    this._tokenClient = new TokenClient(this._settings, metadataService);
  }

  var _proto = ResponseValidator.prototype;

  _proto.validateSigninResponse = /*#__PURE__*/function () {
    var _validateSigninResponse = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(state, response) {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Log.debug("ResponseValidator.validateSigninResponse");
              response = this._processSigninParams(state, response);
              Log.debug("ResponseValidator.validateSigninResponse: state processed");
              _context.next = 5;
              return this._validateTokens(state, response);

            case 5:
              response = _context.sent;
              Log.debug("ResponseValidator.validateSigninResponse: tokens validated");
              _context.next = 9;
              return this._processClaims(state, response);

            case 9:
              response = _context.sent;
              Log.debug("ResponseValidator.validateSigninResponse: claims processed");
              return _context.abrupt("return", response);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function validateSigninResponse(_x, _x2) {
      return _validateSigninResponse.apply(this, arguments);
    }

    return validateSigninResponse;
  }();

  _proto.validateSignoutResponse = function validateSignoutResponse(state, response) {
    if (state.id !== response.state) {
      Log.error("ResponseValidator.validateSignoutResponse: State does not match");
      throw new Error("State does not match");
    } // now that we know the state matches, take the stored data
    // and set it into the response so callers can get their state
    // this is important for both success & error outcomes


    Log.debug("ResponseValidator.validateSignoutResponse: state validated");
    response.state = state.data;

    if (response.error) {
      Log.warn("ResponseValidator.validateSignoutResponse: Response was error", response.error);
      throw new ErrorResponse(response);
    }

    return response;
  };

  _proto._processSigninParams = function _processSigninParams(state, response) {
    if (state.id !== response.state) {
      Log.error("ResponseValidator._processSigninParams: State does not match");
      throw new Error("State does not match");
    }

    if (!state.client_id) {
      Log.error("ResponseValidator._processSigninParams: No client_id on state");
      throw new Error("No client_id on state");
    }

    if (!state.authority) {
      Log.error("ResponseValidator._processSigninParams: No authority on state");
      throw new Error("No authority on state");
    } // ensure we're using the correct authority


    if (this._settings.authority !== state.authority) {
      Log.error("ResponseValidator._processSigninParams: authority mismatch on settings vs. signin state");
      throw new Error("authority mismatch on settings vs. signin state");
    }

    if (this._settings.client_id && this._settings.client_id !== state.client_id) {
      Log.error("ResponseValidator._processSigninParams: client_id mismatch on settings vs. signin state");
      throw new Error("client_id mismatch on settings vs. signin state");
    } // now that we know the state matches, take the stored data
    // and set it into the response so callers can get their state
    // this is important for both success & error outcomes


    Log.debug("ResponseValidator._processSigninParams: state validated");
    response.state = state.data;

    if (response.error) {
      Log.warn("ResponseValidator._processSigninParams: Response was error", response.error);
      throw new ErrorResponse(response);
    }

    if (state.nonce && !response.id_token) {
      Log.error("ResponseValidator._processSigninParams: Expecting id_token in response");
      throw new Error("No id_token in response");
    }

    if (!state.nonce && response.id_token) {
      Log.error("ResponseValidator._processSigninParams: Not expecting id_token in response");
      throw new Error("Unexpected id_token in response");
    }

    if (state.code_verifier && !response.code) {
      Log.error("ResponseValidator._processSigninParams: Expecting code in response");
      throw new Error("No code in response");
    }

    if (!state.code_verifier && response.code) {
      Log.error("ResponseValidator._processSigninParams: Not expecting code in response");
      throw new Error("Unexpected code in response");
    }

    if (!response.scope) {
      // if there's no scope on the response, then assume all scopes granted (per-spec) and copy over scopes from original request
      response.scope = state.scope;
    }

    return response;
  };

  _proto._processClaims = /*#__PURE__*/function () {
    var _processClaims2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(state, response) {
      var claims;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!response.isOpenIdConnect) {
                _context2.next = 20;
                break;
              }

              Log.debug("ResponseValidator._processClaims: response is OIDC, processing claims");
              response.profile = this._filterProtocolClaims(response.profile);

              if (!(state.skipUserInfo !== true && this._settings.loadUserInfo && response.access_token)) {
                _context2.next = 17;
                break;
              }

              Log.debug("ResponseValidator._processClaims: loading user info");
              _context2.next = 7;
              return this._userInfoService.getClaims(response.access_token);

            case 7:
              claims = _context2.sent;
              Log.debug("ResponseValidator._processClaims: user info claims received from user info endpoint");

              if (!(claims.sub !== response.profile.sub)) {
                _context2.next = 12;
                break;
              }

              Log.error("ResponseValidator._processClaims: sub from user info endpoint does not match sub in id_token");
              throw new Error("sub from user info endpoint does not match sub in id_token");

            case 12:
              response.profile = this._mergeClaims(response.profile, claims);
              Log.debug("ResponseValidator._processClaims: user info claims received, updated profile:", response.profile);
              return _context2.abrupt("return", response);

            case 17:
              Log.debug("ResponseValidator._processClaims: not loading user info");

            case 18:
              _context2.next = 21;
              break;

            case 20:
              Log.debug("ResponseValidator._processClaims: response is not OIDC, not processing claims");

            case 21:
              return _context2.abrupt("return", response);

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function _processClaims(_x3, _x4) {
      return _processClaims2.apply(this, arguments);
    }

    return _processClaims;
  }();

  _proto._mergeClaims = function _mergeClaims(claims1, claims2) {
    var result = Object.assign({}, claims1);

    for (var name in claims2) {
      var values = claims2[name];

      if (!Array.isArray(values)) {
        values = [values];
      }

      for (var i = 0; i < values.length; i++) {
        var value = values[i];

        if (!result[name]) {
          result[name] = value;
        } else if (Array.isArray(result[name])) {
          if (result[name].indexOf(value) < 0) {
            result[name].push(value);
          }
        } else if (result[name] !== value) {
          if (typeof value === "object" && this._settings.mergeClaims) {
            result[name] = this._mergeClaims(result[name], value);
          } else {
            result[name] = [result[name], value];
          }
        }
      }
    }

    return result;
  };

  _proto._filterProtocolClaims = function _filterProtocolClaims(claims) {
    Log.debug("ResponseValidator._filterProtocolClaims, incoming claims:", claims);
    var result = Object.assign({}, claims);

    if (this._settings.filterProtocolClaims) {
      ProtocolClaims.forEach(function (type) {
        delete result[type];
      });
      Log.debug("ResponseValidator._filterProtocolClaims: protocol claims filtered", result);
    } else {
      Log.debug("ResponseValidator._filterProtocolClaims: protocol claims not filtered");
    }

    return result;
  };

  _proto._validateTokens = /*#__PURE__*/function () {
    var _validateTokens2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(state, response) {
      var access_token;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!response.code) {
                _context3.next = 3;
                break;
              }

              Log.debug("ResponseValidator._validateTokens: Validating code");
              return _context3.abrupt("return", this._processCode(state, response));

            case 3:
              if (!response.id_token) {
                _context3.next = 13;
                break;
              }

              if (!response.access_token) {
                _context3.next = 11;
                break;
              }

              Log.debug("ResponseValidator._validateTokens: Validating id_token and access_token");
              access_token = response.access_token;
              _context3.next = 9;
              return this._validateIdToken(state, response, response.id_token);

            case 9:
              response = _context3.sent;
              return _context3.abrupt("return", this._validateAccessToken(response, access_token));

            case 11:
              Log.debug("ResponseValidator._validateTokens: Validating id_token");
              return _context3.abrupt("return", this._validateIdToken(state, response, response.id_token));

            case 13:
              Log.debug("ResponseValidator._validateTokens: No code to process or id_token to validate");
              return _context3.abrupt("return", response);

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _validateTokens(_x5, _x6) {
      return _validateTokens2.apply(this, arguments);
    }

    return _validateTokens;
  }();

  _proto._processCode = /*#__PURE__*/function () {
    var _processCode2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(state, response) {
      var request, tokenResponse;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              request = {
                client_id: state.client_id,
                client_secret: state.client_secret,
                code: response.code,
                redirect_uri: state.redirect_uri,
                code_verifier: state.code_verifier || ""
              };

              if (state.extraTokenParams && typeof state.extraTokenParams === "object") {
                Object.assign(request, state.extraTokenParams);
              }

              _context4.next = 4;
              return this._tokenClient.exchangeCode(request);

            case 4:
              tokenResponse = _context4.sent;
              // merge
              response.error = tokenResponse.error || response.error;
              response.error_description = tokenResponse.error_description || response.error_description;
              response.error_uri = tokenResponse.error_uri || response.error_uri;
              response.id_token = tokenResponse.id_token || response.id_token;
              response.session_state = tokenResponse.session_state || response.session_state;
              response.access_token = tokenResponse.access_token || response.access_token;
              response.token_type = tokenResponse.token_type || response.token_type;
              response.scope = tokenResponse.scope || response.scope;
              response.expires_in = parseInt(tokenResponse.expires_in) || response.expires_in;

              if (!response.id_token) {
                _context4.next = 17;
                break;
              }

              Log.debug("ResponseValidator._processCode: token response successful, processing id_token");
              return _context4.abrupt("return", this._validateIdTokenAttributes(state, response, response.id_token));

            case 17:
              Log.debug("ResponseValidator._processCode: token response successful, returning response");
              return _context4.abrupt("return", response);

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function _processCode(_x7, _x8) {
      return _processCode2.apply(this, arguments);
    }

    return _processCode;
  }();

  _proto._validateIdTokenAttributes = /*#__PURE__*/function () {
    var _validateIdTokenAttributes2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(state, response, id_token) {
      var issuer, audience, clockSkewInSeconds, now, payload;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this._metadataService.getIssuer();

            case 2:
              issuer = _context5.sent;
              audience = state.client_id;
              clockSkewInSeconds = this._settings.clockSkewInSeconds;
              Log.debug("ResponseValidator._validateIdTokenAttributes: Validaing JWT attributes; using clock skew (in seconds) of: ", clockSkewInSeconds);
              now = Timer.getEpochTime();
              _context5.next = 9;
              return JoseUtil.validateJwtAttributes(id_token, issuer, audience, clockSkewInSeconds, now);

            case 9:
              payload = _context5.sent;

              if (!(state.nonce && state.nonce !== payload.nonce)) {
                _context5.next = 13;
                break;
              }

              Log.error("ResponseValidator._validateIdTokenAttributes: Invalid nonce in id_token");
              throw new Error("Invalid nonce in id_token");

            case 13:
              if (payload.sub) {
                _context5.next = 16;
                break;
              }

              Log.error("ResponseValidator._validateIdTokenAttributes: No sub present in id_token");
              throw new Error("No sub present in id_token");

            case 16:
              response.profile = payload;
              return _context5.abrupt("return", response);

            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function _validateIdTokenAttributes(_x9, _x10, _x11) {
      return _validateIdTokenAttributes2.apply(this, arguments);
    }

    return _validateIdTokenAttributes;
  }();

  _proto._getSigningKeyForJwt = /*#__PURE__*/function () {
    var _getSigningKeyForJwt2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(jwt) {
      var keys, kid, _keys$filter$, key;

      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this._metadataService.getSigningKeys();

            case 2:
              keys = _context6.sent;

              if (keys) {
                _context6.next = 6;
                break;
              }

              Log.error("ResponseValidator._getSigningKeyForJwt: No signing keys from metadata");
              throw new Error("No signing keys from metadata");

            case 6:
              Log.debug("ResponseValidator._getSigningKeyForJwt: Received signing keys");
              kid = jwt.header.kid;

              if (!kid) {
                _context6.next = 11;
                break;
              }

              key = (_keys$filter$ = keys.filter(function (key) {
                return key.kid === kid;
              })[0]) != null ? _keys$filter$ : null;
              return _context6.abrupt("return", key);

            case 11:
              keys = this._filterByAlg(keys, jwt.header.alg);

              if (!(keys.length !== 1)) {
                _context6.next = 15;
                break;
              }

              Log.error("ResponseValidator._getSigningKeyForJwt: No kid found in id_token and more than one key found in metadata");
              return _context6.abrupt("return", null);

            case 15:
              return _context6.abrupt("return", keys[0]);

            case 16:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function _getSigningKeyForJwt(_x12) {
      return _getSigningKeyForJwt2.apply(this, arguments);
    }

    return _getSigningKeyForJwt;
  }();

  _proto._getSigningKeyForJwtWithSingleRetry = /*#__PURE__*/function () {
    var _getSigningKeyForJwtWithSingleRetry2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(jwt) {
      var key;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this._getSigningKeyForJwt(jwt);

            case 2:
              key = _context7.sent;

              if (!key) {
                _context7.next = 5;
                break;
              }

              return _context7.abrupt("return", key);

            case 5:
              // Refreshing signingKeys if no suitable verification key is present for given jwt header.
              // set to undefined, to trigger network call to jwks_uri.
              this._metadataService.resetSigningKeys();

              return _context7.abrupt("return", this._getSigningKeyForJwt(jwt));

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function _getSigningKeyForJwtWithSingleRetry(_x13) {
      return _getSigningKeyForJwtWithSingleRetry2.apply(this, arguments);
    }

    return _getSigningKeyForJwtWithSingleRetry;
  }();

  _proto._validateIdToken = /*#__PURE__*/function () {
    var _validateIdToken2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(state, response, id_token) {
      var jwt, payload, issuer, key, audience, clockSkewInSeconds;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (state.nonce) {
                _context8.next = 3;
                break;
              }

              Log.error("ResponseValidator._validateIdToken: No nonce on state");
              throw new Error("No nonce on state");

            case 3:
              jwt = JoseUtil.parseJwt(id_token);

              if (!(!jwt || !jwt.header || !jwt.payload)) {
                _context8.next = 7;
                break;
              }

              Log.error("ResponseValidator._validateIdToken: Failed to parse id_token", jwt);
              throw new Error("Failed to parse id_token");

            case 7:
              payload = jwt.payload;

              if (!(state.nonce !== payload.nonce)) {
                _context8.next = 11;
                break;
              }

              Log.error("ResponseValidator._validateIdToken: Invalid nonce in id_token");
              throw new Error("Invalid nonce in id_token");

            case 11:
              _context8.next = 13;
              return this._metadataService.getIssuer();

            case 13:
              issuer = _context8.sent;
              Log.debug("ResponseValidator._validateIdToken: Received issuer");
              _context8.next = 17;
              return this._getSigningKeyForJwtWithSingleRetry(jwt);

            case 17:
              key = _context8.sent;

              if (key) {
                _context8.next = 21;
                break;
              }

              Log.error("ResponseValidator._validateIdToken: No key matching kid or alg found in signing keys");
              throw new Error("No key matching kid or alg found in signing keys");

            case 21:
              audience = state.client_id;
              clockSkewInSeconds = this._settings.clockSkewInSeconds;
              Log.debug("ResponseValidator._validateIdToken: Validaing JWT; using clock skew (in seconds) of: ", clockSkewInSeconds);
              JoseUtil.validateJwt(id_token, key, issuer, audience, clockSkewInSeconds);
              Log.debug("ResponseValidator._validateIdToken: JWT validation successful");

              if (payload.sub) {
                _context8.next = 29;
                break;
              }

              Log.error("ResponseValidator._validateIdToken: No sub present in id_token");
              throw new Error("No sub present in id_token");

            case 29:
              response.profile = payload;
              return _context8.abrupt("return", response);

            case 31:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function _validateIdToken(_x14, _x15, _x16) {
      return _validateIdToken2.apply(this, arguments);
    }

    return _validateIdToken;
  }();

  _proto._filterByAlg = function _filterByAlg(keys, alg) {
    var kty = null;

    if (alg.startsWith("RS")) {
      kty = "RSA";
    } else if (alg.startsWith("PS")) {
      kty = "PS";
    } else if (alg.startsWith("ES")) {
      kty = "EC";
    } else {
      Log.debug("ResponseValidator._filterByAlg: alg not supported: ", alg);
      return [];
    }

    Log.debug("ResponseValidator._filterByAlg: Looking for keys that match kty: ", kty);
    keys = keys.filter(function (key) {
      return key.kty === kty;
    });
    Log.debug("ResponseValidator._filterByAlg: Number of keys that match kty: ", kty, keys.length);
    return keys;
  };

  _proto._validateAccessToken = function _validateAccessToken(response, access_token) {
    if (!response.profile) {
      Log.error("ResponseValidator._validateAccessToken: No profile loaded from id_token");
      throw new Error("No profile loaded from id_token");
    }

    if (!response.profile.at_hash) {
      Log.error("ResponseValidator._validateAccessToken: No at_hash in id_token");
      throw new Error("No at_hash in id_token");
    }

    if (!response.id_token) {
      Log.error("ResponseValidator._validateAccessToken: No id_token");
      throw new Error("No id_token");
    }

    var jwt = JoseUtil.parseJwt(response.id_token);

    if (!jwt || !jwt.header) {
      Log.error("ResponseValidator._validateAccessToken: Failed to parse id_token", jwt);
      throw new Error("Failed to parse id_token");
    }

    var hashAlg = jwt.header.alg;

    if (!hashAlg || hashAlg.length !== 5) {
      Log.error("ResponseValidator._validateAccessToken: Unsupported alg:", hashAlg);
      throw new Error("Unsupported alg: " + String(hashAlg));
    }

    var hashBitsString = hashAlg.substr(2, 3);

    if (!hashBitsString) {
      Log.error("ResponseValidator._validateAccessToken: Unsupported alg:", hashAlg, hashBitsString);
      throw new Error("Unsupported alg: " + String(hashAlg));
    }

    var hashBits = parseInt(hashBitsString);

    if (hashBits !== 256 && hashBits !== 384 && hashBits !== 512) {
      Log.error("ResponseValidator._validateAccessToken: Unsupported alg:", hashAlg, hashBits);
      throw new Error("Unsupported alg: " + String(hashAlg));
    }

    var sha = "sha" + hashBits.toString();
    var hash = JoseUtil.hashString(access_token, sha);

    if (!hash) {
      Log.error("ResponseValidator._validateAccessToken: access_token hash failed:", sha);
      throw new Error("Failed to validate at_hash");
    }

    var left = hash.substr(0, hash.length / 2);
    var left_b64u = JoseUtil.hexToBase64Url(left);

    if (left_b64u !== response.profile.at_hash) {
      Log.error("ResponseValidator._validateAccessToken: Failed to validate at_hash", left_b64u, response.profile.at_hash);
      throw new Error("Failed to validate at_hash");
    }

    Log.debug("ResponseValidator._validateAccessToken: success");
    return response;
  };

  return ResponseValidator;
}();

var OidcMetadataUrlPath = ".well-known/openid-configuration";
var MetadataService = /*#__PURE__*/function () {
  // cache
  function MetadataService(settings) {
    this._settings = void 0;
    this._jsonService = void 0;
    this._metadataUrl = void 0;
    this._signingKeys = void 0;
    this._metadata = void 0;
    this._settings = settings;
    this._jsonService = new JsonService(["application/jwk-set+json"]);
    this._metadataUrl = null;

    if (this._settings.metadataUrl) {
      this._metadataUrl = this._settings.metadataUrl;
    } else if (this._settings.authority) {
      this._metadataUrl = this._settings.authority;

      if (this._metadataUrl[this._metadataUrl.length - 1] !== "/") {
        this._metadataUrl += "/";
      }

      this._metadataUrl += OidcMetadataUrlPath;
    }

    this._signingKeys = null;

    if (this._settings.signingKeys) {
      Log.debug("MetadataService.ctor: Using signingKeys from settings");
      this._signingKeys = this._settings.signingKeys;
    }

    this._metadata = null;

    if (this._settings.metadata) {
      Log.debug("MetadataService.ctor: Using metadata from settings");
      this._metadata = this._settings.metadata;
    }
  }

  var _proto = MetadataService.prototype;

  _proto.resetSigningKeys = function resetSigningKeys() {
    this._signingKeys = null;
  };

  _proto.getMetadata = /*#__PURE__*/function () {
    var _getMetadata = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var metadata, seed;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this._metadata) {
                _context.next = 3;
                break;
              }

              Log.debug("MetadataService.getMetadata: Returning metadata from cache");
              return _context.abrupt("return", this._metadata);

            case 3:
              if (this._metadataUrl) {
                _context.next = 6;
                break;
              }

              Log.error("MetadataService.getMetadata: No authority or metadataUrl configured on settings");
              throw new Error("No authority or metadataUrl configured on settings");

            case 6:
              Log.debug("MetadataService.getMetadata: getting metadata from", this._metadataUrl);
              _context.next = 9;
              return this._jsonService.getJson(this._metadataUrl);

            case 9:
              metadata = _context.sent;
              Log.debug("MetadataService.getMetadata: json received");
              seed = this._settings.metadataSeed || {};
              this._metadata = Object.assign({}, seed, metadata);
              return _context.abrupt("return", this._metadata);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getMetadata() {
      return _getMetadata.apply(this, arguments);
    }

    return getMetadata;
  }();

  _proto.getIssuer = function getIssuer() {
    return this._getMetadataProperty("issuer");
  };

  _proto.getAuthorizationEndpoint = function getAuthorizationEndpoint() {
    return this._getMetadataProperty("authorization_endpoint");
  };

  _proto.getUserInfoEndpoint = function getUserInfoEndpoint() {
    return this._getMetadataProperty("userinfo_endpoint");
  };

  _proto.getTokenEndpoint = function getTokenEndpoint(optional) {
    if (optional === void 0) {
      optional = true;
    }

    return this._getMetadataProperty("token_endpoint", optional);
  };

  _proto.getCheckSessionIframe = function getCheckSessionIframe() {
    return this._getMetadataProperty("check_session_iframe", true);
  };

  _proto.getEndSessionEndpoint = function getEndSessionEndpoint() {
    return this._getMetadataProperty("end_session_endpoint", true);
  };

  _proto.getRevocationEndpoint = function getRevocationEndpoint() {
    return this._getMetadataProperty("revocation_endpoint", true);
  };

  _proto.getKeysEndpoint = function getKeysEndpoint(optional) {
    if (optional === void 0) {
      optional = true;
    }

    return this._getMetadataProperty("jwks_uri", optional);
  };

  _proto._getMetadataProperty = /*#__PURE__*/function () {
    var _getMetadataProperty2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(name, optional) {
      var metadata;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (optional === void 0) {
                optional = false;
              }

              Log.debug("MetadataService.getMetadataProperty for: " + name);
              _context2.next = 4;
              return this.getMetadata();

            case 4:
              metadata = _context2.sent;
              Log.debug("MetadataService.getMetadataProperty: metadata recieved");

              if (!(metadata[name] === undefined)) {
                _context2.next = 12;
                break;
              }

              if (!(optional === true)) {
                _context2.next = 10;
                break;
              }

              Log.warn("MetadataService.getMetadataProperty: Metadata does not contain optional property " + name);
              return _context2.abrupt("return", undefined);

            case 10:
              Log.error("MetadataService.getMetadataProperty: Metadata does not contain property " + name);
              throw new Error("Metadata does not contain property " + name);

            case 12:
              return _context2.abrupt("return", metadata[name]);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function _getMetadataProperty(_x, _x2) {
      return _getMetadataProperty2.apply(this, arguments);
    }

    return _getMetadataProperty;
  }();

  _proto.getSigningKeys = /*#__PURE__*/function () {
    var _getSigningKeys = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
      var jwks_uri, keySet;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this._signingKeys) {
                _context3.next = 3;
                break;
              }

              Log.debug("MetadataService.getSigningKeys: Returning signingKeys from cache");
              return _context3.abrupt("return", this._signingKeys);

            case 3:
              _context3.next = 5;
              return this.getKeysEndpoint(false);

            case 5:
              jwks_uri = _context3.sent;
              Log.debug("MetadataService.getSigningKeys: jwks_uri received", jwks_uri);
              _context3.next = 9;
              return this._jsonService.getJson(jwks_uri);

            case 9:
              keySet = _context3.sent;
              Log.debug("MetadataService.getSigningKeys: key set received", keySet);

              if (keySet.keys) {
                _context3.next = 14;
                break;
              }

              Log.error("MetadataService.getSigningKeys: Missing keys on keyset");
              throw new Error("Missing keys on keyset");

            case 14:
              this._signingKeys = keySet.keys;
              return _context3.abrupt("return", this._signingKeys);

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getSigningKeys() {
      return _getSigningKeys.apply(this, arguments);
    }

    return getSigningKeys;
  }();

  return MetadataService;
}();

var State = /*#__PURE__*/function () {
  function State(args) {
    this.id = void 0;
    this.data = void 0;
    this.created = void 0;
    this.request_type = void 0;
    this.id = args.id || random();
    this.data = args.data;

    if (args.created && args.created > 0) {
      this.created = args.created;
    } else {
      this.created = Timer.getEpochTime();
    }

    this.request_type = args.request_type;
  }

  var _proto = State.prototype;

  _proto.toStorageString = function toStorageString() {
    Log.debug("State.toStorageString");
    return JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type
    });
  };

  State.fromStorageString = function fromStorageString(storageString) {
    Log.debug("State.fromStorageString");
    return new State(JSON.parse(storageString));
  };

  State.clearStaleState = /*#__PURE__*/function () {
    var _clearStaleState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(storage, age) {
      var cutoff, keys, i, key, item, remove, state;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              cutoff = Timer.getEpochTime() - age;
              _context.next = 3;
              return storage.getAllKeys();

            case 3:
              keys = _context.sent;
              Log.debug("State.clearStaleState: got keys", keys);
              i = 0;

            case 6:
              if (!(i < keys.length)) {
                _context.next = 17;
                break;
              }

              key = keys[i];
              _context.next = 10;
              return storage.get(key);

            case 10:
              item = _context.sent;
              remove = false;

              if (item) {
                try {
                  state = State.fromStorageString(item);
                  Log.debug("State.clearStaleState: got item from key: ", key, state.created);

                  if (state.created <= cutoff) {
                    remove = true;
                  }
                } catch (err) {
                  Log.error("State.clearStaleState: Error parsing state for key", key, err instanceof Error ? err.message : err);
                  remove = true;
                }
              } else {
                Log.debug("State.clearStaleState: no item in storage for key: ", key);
                remove = true;
              }

              if (remove) {
                Log.debug("State.clearStaleState: removed item for key: ", key);
                void storage.remove(key);
              }

            case 14:
              i++;
              _context.next = 6;
              break;

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function clearStaleState(_x, _x2) {
      return _clearStaleState.apply(this, arguments);
    }

    return clearStaleState;
  }();

  return State;
}();

var SigninState = /*#__PURE__*/function (_State) {
  _inheritsLoose(SigninState, _State);

  // isOidc
  // isCode
  // to ensure state still matches settings
  function SigninState(args) {
    var _this;

    _this = _State.call(this, args) || this;
    _this.nonce = void 0;
    _this.code_verifier = void 0;
    _this.code_challenge = void 0;
    _this.authority = void 0;
    _this.client_id = void 0;
    _this.redirect_uri = void 0;
    _this.scope = void 0;
    _this.client_secret = void 0;
    _this.extraTokenParams = void 0;
    _this.response_mode = void 0;
    _this.skipUserInfo = void 0;

    if (args.nonce === true) {
      _this.nonce = random();
    } else if (args.nonce) {
      _this.nonce = args.nonce;
    }

    if (args.code_verifier === true) {
      // random() produces 32 length
      _this.code_verifier = random() + random() + random();
    } else if (args.code_verifier) {
      _this.code_verifier = args.code_verifier;
    }

    if (_this.code_verifier) {
      var hash = JoseUtil.hashString(_this.code_verifier, "SHA256");
      _this.code_challenge = JoseUtil.hexToBase64Url(hash);
    }

    _this.authority = args.authority;
    _this.client_id = args.client_id;
    _this.redirect_uri = args.redirect_uri;
    _this.scope = args.scope;
    _this.client_secret = args.client_secret;
    _this.extraTokenParams = args.extraTokenParams;
    _this.response_mode = args.response_mode;
    _this.skipUserInfo = args.skipUserInfo;
    return _this;
  }

  var _proto = SigninState.prototype;

  _proto.toStorageString = function toStorageString() {
    Log.debug("SigninState.toStorageString");
    return JSON.stringify({
      id: this.id,
      data: this.data,
      created: this.created,
      request_type: this.request_type,
      nonce: this.nonce,
      code_verifier: this.code_verifier,
      authority: this.authority,
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      scope: this.scope,
      client_secret: this.client_secret,
      extraTokenParams: this.extraTokenParams,
      response_mode: this.response_mode,
      skipUserInfo: this.skipUserInfo
    });
  };

  SigninState.fromStorageString = function fromStorageString(storageString) {
    Log.debug("SigninState.fromStorageString");
    var data = JSON.parse(storageString);
    return new SigninState(data);
  };

  return SigninState;
}(State);

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var SigninRequest = /*#__PURE__*/function () {
  function SigninRequest(_ref) {
    var url = _ref.url,
        authority = _ref.authority,
        client_id = _ref.client_id,
        redirect_uri = _ref.redirect_uri,
        response_type = _ref.response_type,
        scope = _ref.scope,
        data = _ref.data,
        prompt = _ref.prompt,
        display = _ref.display,
        max_age = _ref.max_age,
        ui_locales = _ref.ui_locales,
        id_token_hint = _ref.id_token_hint,
        login_hint = _ref.login_hint,
        acr_values = _ref.acr_values,
        resource = _ref.resource,
        response_mode = _ref.response_mode,
        request = _ref.request,
        request_uri = _ref.request_uri,
        extraQueryParams = _ref.extraQueryParams,
        request_type = _ref.request_type,
        client_secret = _ref.client_secret,
        extraTokenParams = _ref.extraTokenParams,
        skipUserInfo = _ref.skipUserInfo;
    this.url = void 0;
    this.state = void 0;

    if (!url) {
      Log.error("SigninRequest.ctor: No url passed");
      throw new Error("url");
    }

    if (!client_id) {
      Log.error("SigninRequest.ctor: No client_id passed");
      throw new Error("client_id");
    }

    if (!redirect_uri) {
      Log.error("SigninRequest.ctor: No redirect_uri passed");
      throw new Error("redirect_uri");
    }

    if (!response_type) {
      Log.error("SigninRequest.ctor: No response_type passed");
      throw new Error("response_type");
    }

    if (!scope) {
      Log.error("SigninRequest.ctor: No scope passed");
      throw new Error("scope");
    }

    if (!authority) {
      Log.error("SigninRequest.ctor: No authority passed");
      throw new Error("authority");
    }

    var isOidc = SigninRequest.isOidc(response_type);
    var isCode = SigninRequest.isCode(response_type);

    if (!response_mode) {
      response_mode = isCode ? "query" : undefined;
    }

    this.state = new SigninState({
      data: data,
      request_type: request_type,
      nonce: isOidc,
      code_verifier: isCode,
      client_id: client_id,
      authority: authority,
      redirect_uri: redirect_uri,
      response_mode: response_mode,
      client_secret: client_secret,
      scope: scope,
      extraTokenParams: extraTokenParams,
      skipUserInfo: skipUserInfo
    });
    url = UrlUtility.addQueryParam(url, "client_id", client_id);
    url = UrlUtility.addQueryParam(url, "redirect_uri", redirect_uri);
    url = UrlUtility.addQueryParam(url, "response_type", response_type);
    url = UrlUtility.addQueryParam(url, "scope", scope);
    url = UrlUtility.addQueryParam(url, "state", this.state.id);

    if (this.state.nonce) {
      url = UrlUtility.addQueryParam(url, "nonce", this.state.nonce);
    }

    if (this.state.code_challenge) {
      url = UrlUtility.addQueryParam(url, "code_challenge", this.state.code_challenge);
      url = UrlUtility.addQueryParam(url, "code_challenge_method", "S256");
    }

    var optional = {
      prompt: prompt,
      display: display,
      max_age: max_age,
      ui_locales: ui_locales,
      id_token_hint: id_token_hint,
      login_hint: login_hint,
      acr_values: acr_values,
      resource: resource,
      request: request,
      request_uri: request_uri,
      response_mode: response_mode
    };

    for (var key in optional) {
      if (optional[key]) {
        url = UrlUtility.addQueryParam(url, key, optional[key]);
      }
    }

    for (var _key in extraQueryParams) {
      url = UrlUtility.addQueryParam(url, _key, extraQueryParams[_key]);
    }

    this.url = url;
  }

  SigninRequest.isOidc = function isOidc(response_type) {
    var result = response_type.split(/\s+/g).filter(function (item) {
      return item === "id_token";
    });
    return !!result[0];
  };

  SigninRequest.isOAuth = function isOAuth(response_type) {
    var result = response_type.split(/\s+/g).filter(function (item) {
      return item === "token";
    });
    return !!result[0];
  };

  SigninRequest.isCode = function isCode(response_type) {
    var result = response_type.split(/\s+/g).filter(function (item) {
      return item === "code";
    });
    return !!result[0];
  };

  return SigninRequest;
}();

var OidcScope = "openid";
var SigninResponse = /*#__PURE__*/function () {
  // updated by ResponseValidator
  // updated by ResponseValidator
  // updated by ResponseValidator
  // set by ResponseValidator
  function SigninResponse(url, delimiter) {
    if (delimiter === void 0) {
      delimiter = "#";
    }

    this.code = void 0;
    this.state = void 0;
    this.error = void 0;
    this.error_description = void 0;
    this.error_uri = void 0;
    this.id_token = void 0;
    this.session_state = void 0;
    this.access_token = void 0;
    this.token_type = void 0;
    this.scope = void 0;
    this.expires_at = void 0;
    this.profile = void 0;
    var values = UrlUtility.parseUrlFragment(url, delimiter);
    this.error = values.error;
    this.error_description = values.error_description;
    this.error_uri = values.error_uri;
    this.code = values.code;
    this.state = values.state;
    this.id_token = values.id_token;
    this.session_state = values.session_state;
    this.access_token = values.access_token;
    this.token_type = values.token_type;
    this.scope = values.scope;
    this.expires_in = parseInt(values.expires_in);
    this.profile = undefined;
  }

  _createClass(SigninResponse, [{
    key: "expires_in",
    get: function get() {
      if (this.expires_at) {
        var now = Timer.getEpochTime();
        return this.expires_at - now;
      }

      return undefined;
    },
    set: function set(value) {
      if (value && value > 0) {
        var expires_in = Math.floor(value);
        var now = Timer.getEpochTime();
        this.expires_at = now + expires_in;
      }
    }
  }, {
    key: "expired",
    get: function get() {
      var expires_in = this.expires_in;

      if (expires_in !== undefined) {
        return expires_in <= 0;
      }

      return undefined;
    }
  }, {
    key: "scopes",
    get: function get() {
      return (this.scope || "").split(" ");
    }
  }, {
    key: "isOpenIdConnect",
    get: function get() {
      return this.scopes.indexOf(OidcScope) >= 0 || !!this.id_token;
    }
  }]);

  return SigninResponse;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var SignoutRequest = function SignoutRequest(_ref) {
  var url = _ref.url,
      id_token_hint = _ref.id_token_hint,
      post_logout_redirect_uri = _ref.post_logout_redirect_uri,
      data = _ref.data,
      extraQueryParams = _ref.extraQueryParams,
      request_type = _ref.request_type;
  this.url = void 0;
  this.state = void 0;

  if (!url) {
    Log.error("SignoutRequest.ctor: No url passed");
    throw new Error("url");
  }

  if (id_token_hint) {
    url = UrlUtility.addQueryParam(url, "id_token_hint", id_token_hint);
  }

  if (post_logout_redirect_uri) {
    url = UrlUtility.addQueryParam(url, "post_logout_redirect_uri", post_logout_redirect_uri);

    if (data) {
      this.state = new State({
        data: data,
        request_type: request_type
      });
      url = UrlUtility.addQueryParam(url, "state", this.state.id);
    }
  }

  for (var key in extraQueryParams) {
    url = UrlUtility.addQueryParam(url, key, extraQueryParams[key]);
  }

  this.url = url;
};

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var SignoutResponse = function SignoutResponse(url) {
  this.error = void 0;
  this.error_description = void 0;
  this.error_uri = void 0;
  this.state = void 0;
  var values = UrlUtility.parseUrlFragment(url, "?");
  this.error = values.error;
  this.error_description = values.error_description;
  this.error_uri = values.error_uri;
  this.state = values.state;
};

var OidcClient = /*#__PURE__*/function () {
  function OidcClient(settings) {
    this.settings = void 0;
    this.metadataService = void 0;
    this._validator = void 0;
    this.settings = new OidcClientSettingsStore(settings);
    this.metadataService = new MetadataService(this.settings);
    this._validator = new ResponseValidator(this.settings, this.metadataService);
  }

  var _proto = OidcClient.prototype;

  _proto.createSigninRequest = /*#__PURE__*/function () {
    var _createSigninRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(_ref) {
      var response_type, scope, redirect_uri, data, state, prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values, resource, request, request_uri, response_mode, extraQueryParams, extraTokenParams, request_type, skipUserInfo, url, signinRequest, signinState;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              response_type = _ref.response_type, scope = _ref.scope, redirect_uri = _ref.redirect_uri, data = _ref.data, state = _ref.state, prompt = _ref.prompt, display = _ref.display, max_age = _ref.max_age, ui_locales = _ref.ui_locales, id_token_hint = _ref.id_token_hint, login_hint = _ref.login_hint, acr_values = _ref.acr_values, resource = _ref.resource, request = _ref.request, request_uri = _ref.request_uri, response_mode = _ref.response_mode, extraQueryParams = _ref.extraQueryParams, extraTokenParams = _ref.extraTokenParams, request_type = _ref.request_type, skipUserInfo = _ref.skipUserInfo;
              Log.debug("OidcClient.createSigninRequest");
              response_type = response_type || this.settings.response_type;
              scope = scope || this.settings.scope;
              redirect_uri = redirect_uri || this.settings.redirect_uri; // id_token_hint, login_hint aren't allowed on _settings

              prompt = prompt || this.settings.prompt;
              display = display || this.settings.display;
              max_age = max_age || this.settings.max_age;
              ui_locales = ui_locales || this.settings.ui_locales;
              acr_values = acr_values || this.settings.acr_values;
              resource = resource || this.settings.resource;
              response_mode = response_mode || this.settings.response_mode;
              extraQueryParams = extraQueryParams || this.settings.extraQueryParams;
              extraTokenParams = extraTokenParams || this.settings.extraTokenParams;

              if (!(SigninRequest.isCode(response_type) && response_type !== "code")) {
                _context.next = 16;
                break;
              }

              throw new Error("OpenID Connect hybrid flow is not supported");

            case 16:
              _context.next = 18;
              return this.metadataService.getAuthorizationEndpoint();

            case 18:
              url = _context.sent;
              Log.debug("OidcClient.createSigninRequest: Received authorization endpoint", url);
              signinRequest = new SigninRequest({
                url: url,
                authority: this.settings.authority,
                client_id: this.settings.client_id,
                redirect_uri: redirect_uri,
                response_type: response_type,
                scope: scope,
                data: data || state,
                prompt: prompt,
                display: display,
                max_age: max_age,
                ui_locales: ui_locales,
                id_token_hint: id_token_hint,
                login_hint: login_hint,
                acr_values: acr_values,
                resource: resource,
                request: request,
                request_uri: request_uri,
                extraQueryParams: extraQueryParams,
                extraTokenParams: extraTokenParams,
                request_type: request_type,
                response_mode: response_mode,
                client_secret: this.settings.client_secret,
                skipUserInfo: skipUserInfo
              });
              signinState = signinRequest.state;
              _context.next = 24;
              return this.settings.stateStore.set(signinState.id, signinState.toStorageString());

            case 24:
              return _context.abrupt("return", signinRequest);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createSigninRequest(_x) {
      return _createSigninRequest.apply(this, arguments);
    }

    return createSigninRequest;
  }();

  _proto.readSigninResponseState = /*#__PURE__*/function () {
    var _readSigninResponseState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(url, removeState) {
      var useQuery, delimiter, response, stateStore, stateApi, storedStateString, state;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (removeState === void 0) {
                removeState = false;
              }

              Log.debug("OidcClient.readSigninResponseState");
              useQuery = this.settings.response_mode === "query" || !this.settings.response_mode && this.settings.response_type && SigninRequest.isCode(this.settings.response_type);
              delimiter = useQuery ? "?" : "#";
              response = new SigninResponse(url, delimiter);

              if (response.state) {
                _context2.next = 8;
                break;
              }

              Log.error("OidcClient.readSigninResponseState: No state in response");
              throw new Error("No state in response");

            case 8:
              stateStore = this.settings.stateStore;
              stateApi = removeState ? stateStore.remove.bind(stateStore) : stateStore.get.bind(stateStore);
              _context2.next = 12;
              return stateApi(response.state);

            case 12:
              storedStateString = _context2.sent;

              if (storedStateString) {
                _context2.next = 16;
                break;
              }

              Log.error("OidcClient.readSigninResponseState: No matching state found in storage");
              throw new Error("No matching state found in storage");

            case 16:
              state = SigninState.fromStorageString(storedStateString);
              return _context2.abrupt("return", {
                state: state,
                response: response
              });

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function readSigninResponseState(_x2, _x3) {
      return _readSigninResponseState.apply(this, arguments);
    }

    return readSigninResponseState;
  }();

  _proto.processSigninResponse = /*#__PURE__*/function () {
    var _processSigninResponse = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(url) {
      var _yield$this$readSigni, state, response;

      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              Log.debug("OidcClient.processSigninResponse");
              _context3.next = 3;
              return this.readSigninResponseState(url, true);

            case 3:
              _yield$this$readSigni = _context3.sent;
              state = _yield$this$readSigni.state;
              response = _yield$this$readSigni.response;
              Log.debug("OidcClient.processSigninResponse: Received state from storage; validating response");
              return _context3.abrupt("return", this._validator.validateSigninResponse(state, response));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function processSigninResponse(_x4) {
      return _processSigninResponse.apply(this, arguments);
    }

    return processSigninResponse;
  }();

  _proto.createSignoutRequest = /*#__PURE__*/function () {
    var _createSignoutRequest = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(_temp) {
      var _ref2, id_token_hint, data, state, post_logout_redirect_uri, extraQueryParams, request_type, url, request, signoutState;

      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _ref2 = _temp === void 0 ? {} : _temp, id_token_hint = _ref2.id_token_hint, data = _ref2.data, state = _ref2.state, post_logout_redirect_uri = _ref2.post_logout_redirect_uri, extraQueryParams = _ref2.extraQueryParams, request_type = _ref2.request_type;
              Log.debug("OidcClient.createSignoutRequest");
              post_logout_redirect_uri = post_logout_redirect_uri || this.settings.post_logout_redirect_uri;
              extraQueryParams = extraQueryParams || this.settings.extraQueryParams;
              _context4.next = 6;
              return this.metadataService.getEndSessionEndpoint();

            case 6:
              url = _context4.sent;

              if (url) {
                _context4.next = 10;
                break;
              }

              Log.error("OidcClient.createSignoutRequest: No end session endpoint url returned");
              throw new Error("no end session endpoint");

            case 10:
              Log.debug("OidcClient.createSignoutRequest: Received end session endpoint", url);
              request = new SignoutRequest({
                url: url,
                id_token_hint: id_token_hint,
                post_logout_redirect_uri: post_logout_redirect_uri,
                data: data || state,
                extraQueryParams: extraQueryParams,
                request_type: request_type
              });
              signoutState = request.state;

              if (!signoutState) {
                _context4.next = 17;
                break;
              }

              Log.debug("OidcClient.createSignoutRequest: Signout request has state to persist");
              _context4.next = 17;
              return this.settings.stateStore.set(signoutState.id, signoutState.toStorageString());

            case 17:
              return _context4.abrupt("return", request);

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function createSignoutRequest(_x5) {
      return _createSignoutRequest.apply(this, arguments);
    }

    return createSignoutRequest;
  }();

  _proto.readSignoutResponseState = /*#__PURE__*/function () {
    var _readSignoutResponseState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(url, removeState) {
      var response, stateKey, stateStore, stateApi, storedStateString, state;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (removeState === void 0) {
                removeState = false;
              }

              Log.debug("OidcClient.readSignoutResponseState");
              response = new SignoutResponse(url);

              if (response.state) {
                _context5.next = 9;
                break;
              }

              Log.debug("OidcClient.readSignoutResponseState: No state in response");

              if (!response.error) {
                _context5.next = 8;
                break;
              }

              Log.warn("OidcClient.readSignoutResponseState: Response was error: ", response.error);
              throw new ErrorResponse(response);

            case 8:
              return _context5.abrupt("return", {
                state: undefined,
                response: response
              });

            case 9:
              stateKey = response.state;
              stateStore = this.settings.stateStore;
              stateApi = removeState ? stateStore.remove.bind(stateStore) : stateStore.get.bind(stateStore);
              _context5.next = 14;
              return stateApi(stateKey);

            case 14:
              storedStateString = _context5.sent;

              if (storedStateString) {
                _context5.next = 18;
                break;
              }

              Log.error("OidcClient.readSignoutResponseState: No matching state found in storage");
              throw new Error("No matching state found in storage");

            case 18:
              state = State.fromStorageString(storedStateString);
              return _context5.abrupt("return", {
                state: state,
                response: response
              });

            case 20:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function readSignoutResponseState(_x6, _x7) {
      return _readSignoutResponseState.apply(this, arguments);
    }

    return readSignoutResponseState;
  }();

  _proto.processSignoutResponse = /*#__PURE__*/function () {
    var _processSignoutResponse = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(url) {
      var _yield$this$readSigno, state, response;

      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              Log.debug("OidcClient.processSignoutResponse");
              _context6.next = 3;
              return this.readSignoutResponseState(url, true);

            case 3:
              _yield$this$readSigno = _context6.sent;
              state = _yield$this$readSigno.state;
              response = _yield$this$readSigno.response;

              if (!state) {
                _context6.next = 9;
                break;
              }

              Log.debug("OidcClient.processSignoutResponse: Received state from storage; validating response");
              return _context6.abrupt("return", this._validator.validateSignoutResponse(state, response));

            case 9:
              Log.debug("OidcClient.processSignoutResponse: No state from storage; skipping validating response");
              return _context6.abrupt("return", response);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function processSignoutResponse(_x8) {
      return _processSignoutResponse.apply(this, arguments);
    }

    return processSignoutResponse;
  }();

  _proto.clearStaleState = function clearStaleState() {
    Log.debug("OidcClient.clearStaleState");
    return State.clearStaleState(this.settings.stateStore, this.settings.staleStateAgeInSeconds);
  };

  return OidcClient;
}();

var InMemoryWebStorage = /*#__PURE__*/function () {
  function InMemoryWebStorage() {
    this._data = void 0;
    this._data = {};
  }

  var _proto = InMemoryWebStorage.prototype;

  _proto.clear = function clear() {
    Log.debug("InMemoryWebStorage.clear");
    this._data = {};
  };

  _proto.getItem = function getItem(key) {
    Log.debug("InMemoryWebStorage.getItem", key);
    return this._data[key];
  };

  _proto.setItem = function setItem(key, value) {
    Log.debug("InMemoryWebStorage.setItem", key);
    this._data[key] = value;
  };

  _proto.removeItem = function removeItem(key) {
    Log.debug("InMemoryWebStorage.removeItem", key);
    delete this._data[key];
  };

  _proto.key = function key(index) {
    return Object.getOwnPropertyNames(this._data)[index];
  };

  _createClass(InMemoryWebStorage, [{
    key: "length",
    get: function get() {
      return Object.getOwnPropertyNames(this._data).length;
    }
  }]);

  return InMemoryWebStorage;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var DefaultTimeoutInSeconds = 10;
var IFrameWindow = /*#__PURE__*/function () {
  function IFrameWindow() {
    var _this = this;

    this._promise = void 0;
    this._resolve = void 0;
    this._reject = void 0;
    this._boundMessageEvent = void 0;
    this._frame = void 0;
    this._timer = void 0;
    this._promise = new Promise(function (resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
    this._boundMessageEvent = this._message.bind(this);
    window.addEventListener("message", this._boundMessageEvent, false);
    this._frame = window.document.createElement("iframe"); // shotgun approach

    this._frame.style.visibility = "hidden";
    this._frame.style.position = "absolute";
    this._frame.width = "0";
    this._frame.height = "0";
    window.document.body.appendChild(this._frame);
    this._timer = null;
  }

  var _proto = IFrameWindow.prototype;

  _proto.navigate = function navigate(params) {
    if (!params || !params.url) {
      this._error("No url provided");
    } else if (!this._frame) {
      this._error("No _frame, already closed");
    } else {
      var timeoutInSeconds = params.silentRequestTimeoutInSeconds || DefaultTimeoutInSeconds;
      Log.debug("IFrameWindow.navigate: Using timeout of:", timeoutInSeconds);
      this._timer = window.setTimeout(this._timeout.bind(this), timeoutInSeconds * 1000);
      this._frame.src = params.url;
    }

    return this._promise;
  };

  _proto._success = function _success(data) {
    this._cleanup();

    Log.debug("IFrameWindow: Successful response from frame window");

    this._resolve(data);
  };

  _proto._error = function _error(message) {
    this._cleanup();

    Log.error(message);

    this._reject(new Error(message));
  };

  _proto.close = function close() {
    this._cleanup();
  };

  _proto._cleanup = function _cleanup() {
    Log.debug("IFrameWindow: cleanup");

    if (this._timer) {
      window.clearTimeout(this._timer);
    }

    if (this._boundMessageEvent) {
      window.removeEventListener("message", this._boundMessageEvent, false);
    }

    if (this._frame) {
      window.document.body.removeChild(this._frame);
    }

    this._timer = null;
    this._boundMessageEvent = null;
    this._frame = null;
  };

  _proto._timeout = function _timeout() {
    Log.debug("IFrameWindow.timeout");

    this._error("Frame window timed out");
  };

  _proto._message = function _message(e) {
    Log.debug("IFrameWindow.message");
    var origin = location.protocol + "//" + location.host;

    if (this._timer && this._frame && e.origin === origin && e.source === this._frame.contentWindow && typeof e.data === "string" && (e.data.startsWith("http://") || e.data.startsWith("https://"))) {
      var url = e.data;

      if (url) {
        this._success({
          url: url
        });
      } else {
        this._error("Invalid response from frame");
      }
    }
  };

  IFrameWindow.notifyParent = function notifyParent(url) {
    Log.debug("IFrameWindow.notifyParent");
    url = url || window.location.href;

    if (url) {
      Log.debug("IFrameWindow.notifyParent: posting url message to parent");
      window.parent.postMessage(url, location.protocol + "//" + location.host);
    }
  };

  return IFrameWindow;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var IFrameNavigator = /*#__PURE__*/function () {
  function IFrameNavigator() {}

  var _proto = IFrameNavigator.prototype;

  _proto.prepare = function prepare() {
    var frame = new IFrameWindow();
    return Promise.resolve(frame);
  };

  _proto.callback = function callback(url) {
    Log.debug("IFrameNavigator.callback");

    try {
      IFrameWindow.notifyParent(url);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return IFrameNavigator;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var CheckForPopupClosedInterval = 500;
var DefaultPopupFeatures = "location=no,toolbar=no,width=500,height=500,left=100,top=100;"; //const DefaultPopupFeatures = 'location=no,toolbar=no,width=500,height=500,left=100,top=100;resizable=yes';

var DefaultPopupTarget = "_blank";
var PopupWindow = /*#__PURE__*/function () {
  function PopupWindow(params) {
    var _this = this;

    this._promise = void 0;
    this._resolve = void 0;
    this._reject = void 0;
    this._popup = void 0;
    this._checkForPopupClosedTimer = void 0;
    this._id = void 0;
    this._promise = new Promise(function (resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });
    var target = params.popupWindowTarget || DefaultPopupTarget;
    var features = params.popupWindowFeatures || DefaultPopupFeatures;
    this._popup = window.open("", target, features);
    this._checkForPopupClosedTimer = null;

    if (this._popup) {
      Log.debug("PopupWindow.ctor: popup successfully created");
      this._checkForPopupClosedTimer = window.setInterval(this._checkForPopupClosed.bind(this), CheckForPopupClosedInterval);
    }
  }

  var _proto = PopupWindow.prototype;

  _proto.navigate = function navigate(params) {
    if (!this._popup) {
      this._error("PopupWindow.navigate: Error opening popup window");
    } else if (!params || !params.url) {
      this._error("PopupWindow.navigate: no url provided");

      this._error("No url provided");
    } else {
      Log.debug("PopupWindow.navigate: Setting URL in popup");
      this._id = params.id;

      if (this._id) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        window["popupCallback_" + params.id] = this._callback.bind(this);
      }

      this._popup.focus();

      this._popup.window.location[params.redirectMethod || "assign"](params.url);
    }

    return this._promise;
  };

  _proto._success = function _success(data) {
    Log.debug("PopupWindow.callback: Successful response from popup window");

    this._cleanup();

    this._resolve(data);
  };

  _proto._error = function _error(message) {
    Log.error("PopupWindow.error: ", message);

    this._cleanup();

    this._reject(new Error(message));
  };

  _proto.close = function close() {
    this._cleanup(false);
  };

  _proto._cleanup = function _cleanup(keepOpen) {
    Log.debug("PopupWindow.cleanup"); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    window.clearInterval(this._checkForPopupClosedTimer);
    this._checkForPopupClosedTimer = null; // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands

    delete window["popupCallback_" + this._id];

    if (this._popup && !keepOpen) {
      this._popup.close();
    }

    this._popup = null;
  };

  _proto._checkForPopupClosed = function _checkForPopupClosed() {
    if (!this._popup || this._popup.closed) {
      this._error("Popup window closed");
    }
  };

  _proto._callback = function _callback(url, keepOpen) {
    this._cleanup(keepOpen);

    if (url) {
      Log.debug("PopupWindow.callback success");

      this._success({
        url: url
      });
    } else {
      Log.debug("PopupWindow.callback: Invalid response from popup");

      this._error("Invalid response from popup");
    }
  };

  PopupWindow.notifyOpener = function notifyOpener(url, keepOpen, delimiter) {
    if (window.opener) {
      url = url || window.location.href;

      if (url) {
        var data = UrlUtility.parseUrlFragment(url, delimiter);

        if (data.state) {
          var name = "popupCallback_" + data.state; // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore

          var callback = window.opener[name];

          if (callback) {
            Log.debug("PopupWindow.notifyOpener: passing url message to opener");
            callback(url, keepOpen);
          } else {
            Log.warn("PopupWindow.notifyOpener: no matching callback found on opener");
          }
        } else {
          Log.warn("PopupWindow.notifyOpener: no state found in response url");
        }
      }
    } else {
      Log.warn("PopupWindow.notifyOpener: no window.opener. Can't complete notification.");
    }
  };

  return PopupWindow;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var PopupNavigator = /*#__PURE__*/function () {
  function PopupNavigator() {}

  var _proto = PopupNavigator.prototype;

  _proto.prepare = function prepare(params) {
    var popup = new PopupWindow(params);
    return Promise.resolve(popup);
  };

  _proto.callback = function callback(url, keepOpen, delimiter) {
    Log.debug("PopupNavigator.callback");

    try {
      PopupWindow.notifyOpener(url, keepOpen, delimiter);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return PopupNavigator;
}();

var RedirectNavigator = /*#__PURE__*/function () {
  function RedirectNavigator() {}

  var _proto = RedirectNavigator.prototype;

  _proto.prepare = function prepare() {
    return Promise.resolve(this);
  };

  _proto.navigate = function navigate(params) {
    if (!params || !params.url) {
      Log.error("RedirectNavigator.navigate: No url provided");
      throw new Error("No url provided");
    }

    window.location[params.redirectMethod || "assign"](params.url);
    return Promise.resolve();
  };

  _proto.close = function close() {
    Log.warn("Function not implemented");
  };

  _createClass(RedirectNavigator, [{
    key: "url",
    get: function get() {
      return window.location.href;
    }
  }]);

  return RedirectNavigator;
}();

var DefaultAccessTokenExpiringNotificationTimeInSeconds = 60;
var DefaultCheckSessionIntervalInSeconds = 2;
var UserManagerSettingsStore = /*#__PURE__*/function (_OidcClientSettingsSt) {
  _inheritsLoose(UserManagerSettingsStore, _OidcClientSettingsSt);

  function UserManagerSettingsStore(args) {
    var _this;

    var popup_redirect_uri = args.popup_redirect_uri,
        popup_post_logout_redirect_uri = args.popup_post_logout_redirect_uri,
        popupWindowFeatures = args.popupWindowFeatures,
        popupWindowTarget = args.popupWindowTarget,
        redirectMethod = args.redirectMethod,
        silent_redirect_uri = args.silent_redirect_uri,
        silentRequestTimeoutInSeconds = args.silentRequestTimeoutInSeconds,
        _args$automaticSilent = args.automaticSilentRenew,
        automaticSilentRenew = _args$automaticSilent === void 0 ? true : _args$automaticSilent,
        _args$validateSubOnSi = args.validateSubOnSilentRenew,
        validateSubOnSilentRenew = _args$validateSubOnSi === void 0 ? true : _args$validateSubOnSi,
        _args$includeIdTokenI = args.includeIdTokenInSilentRenew,
        includeIdTokenInSilentRenew = _args$includeIdTokenI === void 0 ? false : _args$includeIdTokenI,
        _args$monitorSession = args.monitorSession,
        monitorSession = _args$monitorSession === void 0 ? false : _args$monitorSession,
        _args$monitorAnonymou = args.monitorAnonymousSession,
        monitorAnonymousSession = _args$monitorAnonymou === void 0 ? false : _args$monitorAnonymou,
        _args$checkSessionInt = args.checkSessionIntervalInSeconds,
        checkSessionIntervalInSeconds = _args$checkSessionInt === void 0 ? DefaultCheckSessionIntervalInSeconds : _args$checkSessionInt,
        query_status_response_type = args.query_status_response_type,
        _args$stopCheckSessio = args.stopCheckSessionOnError,
        stopCheckSessionOnError = _args$stopCheckSessio === void 0 ? true : _args$stopCheckSessio,
        _args$revokeAccessTok = args.revokeAccessTokenOnSignout,
        revokeAccessTokenOnSignout = _args$revokeAccessTok === void 0 ? false : _args$revokeAccessTok,
        _args$accessTokenExpi = args.accessTokenExpiringNotificationTimeInSeconds,
        accessTokenExpiringNotificationTimeInSeconds = _args$accessTokenExpi === void 0 ? DefaultAccessTokenExpiringNotificationTimeInSeconds : _args$accessTokenExpi,
        _args$userStore = args.userStore,
        userStore = _args$userStore === void 0 ? new WebStorageStateStore({
      store: sessionStorage
    }) : _args$userStore;
    _this = _OidcClientSettingsSt.call(this, args) || this;
    _this.popup_redirect_uri = void 0;
    _this.popup_post_logout_redirect_uri = void 0;
    _this.popupWindowFeatures = void 0;
    _this.popupWindowTarget = void 0;
    _this.redirectMethod = void 0;
    _this.silent_redirect_uri = void 0;
    _this.silentRequestTimeoutInSeconds = void 0;
    _this.automaticSilentRenew = void 0;
    _this.validateSubOnSilentRenew = void 0;
    _this.includeIdTokenInSilentRenew = void 0;
    _this.monitorSession = void 0;
    _this.monitorAnonymousSession = void 0;
    _this.checkSessionIntervalInSeconds = void 0;
    _this.query_status_response_type = void 0;
    _this.stopCheckSessionOnError = void 0;
    _this.revokeAccessTokenOnSignout = void 0;
    _this.accessTokenExpiringNotificationTimeInSeconds = void 0;
    _this.userStore = void 0;
    _this.popup_redirect_uri = popup_redirect_uri;
    _this.popup_post_logout_redirect_uri = popup_post_logout_redirect_uri;
    _this.popupWindowFeatures = popupWindowFeatures;
    _this.popupWindowTarget = popupWindowTarget;
    _this.redirectMethod = redirectMethod;
    _this.silent_redirect_uri = silent_redirect_uri;
    _this.silentRequestTimeoutInSeconds = silentRequestTimeoutInSeconds;
    _this.automaticSilentRenew = automaticSilentRenew;
    _this.validateSubOnSilentRenew = validateSubOnSilentRenew;
    _this.includeIdTokenInSilentRenew = includeIdTokenInSilentRenew;
    _this.monitorSession = monitorSession;
    _this.monitorAnonymousSession = monitorAnonymousSession;
    _this.checkSessionIntervalInSeconds = checkSessionIntervalInSeconds;
    _this.stopCheckSessionOnError = stopCheckSessionOnError;

    if (query_status_response_type) {
      _this.query_status_response_type = query_status_response_type;
    } else if (args && args.response_type) {
      _this.query_status_response_type = SigninRequest.isOidc(args.response_type) ? "id_token" : "code";
    } else {
      _this.query_status_response_type = "id_token";
    }

    _this.revokeAccessTokenOnSignout = revokeAccessTokenOnSignout;
    _this.accessTokenExpiringNotificationTimeInSeconds = accessTokenExpiringNotificationTimeInSeconds;
    _this.userStore = userStore;
    return _this;
  }

  return UserManagerSettingsStore;
}(OidcClientSettingsStore);

var User = /*#__PURE__*/function () {
  function User(_ref) {
    var id_token = _ref.id_token,
        session_state = _ref.session_state,
        access_token = _ref.access_token,
        refresh_token = _ref.refresh_token,
        token_type = _ref.token_type,
        scope = _ref.scope,
        profile = _ref.profile,
        expires_at = _ref.expires_at,
        state = _ref.state;
    this.id_token = void 0;
    this.session_state = void 0;
    this.access_token = void 0;
    this.refresh_token = void 0;
    this.token_type = void 0;
    this.scope = void 0;
    this.profile = void 0;
    this.state = void 0;
    this.expires_at = void 0;
    this.id_token = id_token;
    this.session_state = session_state;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.token_type = token_type;
    this.scope = scope;
    this.profile = profile;
    this.state = state;
    this.expires_at = expires_at;
  }

  var _proto = User.prototype;

  _proto.toStorageString = function toStorageString() {
    Log.debug("User.toStorageString");
    return JSON.stringify({
      id_token: this.id_token,
      session_state: this.session_state,
      access_token: this.access_token,
      refresh_token: this.refresh_token,
      token_type: this.token_type,
      scope: this.scope,
      profile: this.profile,
      expires_at: this.expires_at
    });
  };

  User.fromStorageString = function fromStorageString(storageString) {
    Log.debug("User.fromStorageString");
    return new User(JSON.parse(storageString));
  };

  _createClass(User, [{
    key: "expires_in",
    get: function get() {
      if (this.expires_at) {
        var now = Timer.getEpochTime();
        return this.expires_at - now;
      }

      return undefined;
    },
    set: function set(value) {
      if (value && value > 0) {
        var expires_in = Math.floor(value);
        var now = Timer.getEpochTime();
        this.expires_at = now + expires_in;
      }
    }
  }, {
    key: "expired",
    get: function get() {
      var expires_in = this.expires_in;

      if (expires_in !== undefined) {
        return expires_in <= 0;
      }

      return undefined;
    }
  }, {
    key: "scopes",
    get: function get() {
      return (this.scope || "").split(" ");
    }
  }]);

  return User;
}();

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
var AccessTokenEvents = /*#__PURE__*/function () {
  function AccessTokenEvents(_ref) {
    var expiringNotificationTimeInSeconds = _ref.expiringNotificationTimeInSeconds;
    this._expiringNotificationTimeInSeconds = void 0;
    this._expiringTimer = void 0;
    this._expiredTimer = void 0;
    this._expiringNotificationTimeInSeconds = expiringNotificationTimeInSeconds;
    this._expiringTimer = new Timer("Access token expiring");
    this._expiredTimer = new Timer("Access token expired");
  }

  var _proto = AccessTokenEvents.prototype;

  _proto.load = function load(container) {
    // only register events if there's an access token and it has an expiration
    if (container.access_token && container.expires_in !== undefined) {
      var duration = container.expires_in;
      Log.debug("AccessTokenEvents.load: access token present, remaining duration:", duration);

      if (duration > 0) {
        // only register expiring if we still have time
        var expiring = duration - this._expiringNotificationTimeInSeconds;

        if (expiring <= 0) {
          expiring = 1;
        }

        Log.debug("AccessTokenEvents.load: registering expiring timer in:", expiring);

        this._expiringTimer.init(expiring);
      } else {
        Log.debug("AccessTokenEvents.load: canceling existing expiring timer becase we're past expiration.");

        this._expiringTimer.cancel();
      } // if it's negative, it will still fire


      var expired = duration + 1;
      Log.debug("AccessTokenEvents.load: registering expired timer in:", expired);

      this._expiredTimer.init(expired);
    } else {
      this._expiringTimer.cancel();

      this._expiredTimer.cancel();
    }
  };

  _proto.unload = function unload() {
    Log.debug("AccessTokenEvents.unload: canceling existing access token timers");

    this._expiringTimer.cancel();

    this._expiredTimer.cancel();
  };

  _proto.addAccessTokenExpiring = function addAccessTokenExpiring(cb) {
    this._expiringTimer.addHandler(cb);
  };

  _proto.removeAccessTokenExpiring = function removeAccessTokenExpiring(cb) {
    this._expiringTimer.removeHandler(cb);
  };

  _proto.addAccessTokenExpired = function addAccessTokenExpired(cb) {
    this._expiredTimer.addHandler(cb);
  };

  _proto.removeAccessTokenExpired = function removeAccessTokenExpired(cb) {
    this._expiredTimer.removeHandler(cb);
  };

  return AccessTokenEvents;
}();

var UserManagerEvents = /*#__PURE__*/function (_AccessTokenEvents) {
  _inheritsLoose(UserManagerEvents, _AccessTokenEvents);

  function UserManagerEvents(settings) {
    var _this;

    _this = _AccessTokenEvents.call(this, {
      expiringNotificationTimeInSeconds: settings.accessTokenExpiringNotificationTimeInSeconds
    }) || this;
    _this._userLoaded = void 0;
    _this._userUnloaded = void 0;
    _this._silentRenewError = void 0;
    _this._userSignedIn = void 0;
    _this._userSignedOut = void 0;
    _this._userSessionChanged = void 0;
    _this._userLoaded = new Event("User loaded");
    _this._userUnloaded = new Event("User unloaded");
    _this._silentRenewError = new Event("Silent renew error");
    _this._userSignedIn = new Event("User signed in");
    _this._userSignedOut = new Event("User signed out");
    _this._userSessionChanged = new Event("User session changed");
    return _this;
  }

  var _proto = UserManagerEvents.prototype;

  _proto.load = function load(user, raiseEvent) {
    if (raiseEvent === void 0) {
      raiseEvent = true;
    }

    Log.debug("UserManagerEvents.load");

    _AccessTokenEvents.prototype.load.call(this, user);

    if (raiseEvent) {
      this._userLoaded.raise(user);
    }
  };

  _proto.unload = function unload() {
    Log.debug("UserManagerEvents.unload");

    _AccessTokenEvents.prototype.unload.call(this);

    this._userUnloaded.raise();
  };

  _proto.addUserLoaded = function addUserLoaded(cb) {
    this._userLoaded.addHandler(cb);
  };

  _proto.removeUserLoaded = function removeUserLoaded(cb) {
    this._userLoaded.removeHandler(cb);
  };

  _proto.addUserUnloaded = function addUserUnloaded(cb) {
    this._userUnloaded.addHandler(cb);
  };

  _proto.removeUserUnloaded = function removeUserUnloaded(cb) {
    this._userUnloaded.removeHandler(cb);
  };

  _proto.addSilentRenewError = function addSilentRenewError(cb) {
    this._silentRenewError.addHandler(cb);
  };

  _proto.removeSilentRenewError = function removeSilentRenewError(cb) {
    this._silentRenewError.removeHandler(cb);
  };

  _proto._raiseSilentRenewError = function _raiseSilentRenewError(e) {
    Log.debug("UserManagerEvents._raiseSilentRenewError", e.message);

    this._silentRenewError.raise(e);
  };

  _proto.addUserSignedIn = function addUserSignedIn(cb) {
    this._userSignedIn.addHandler(cb);
  };

  _proto.removeUserSignedIn = function removeUserSignedIn(cb) {
    this._userSignedIn.removeHandler(cb);
  };

  _proto._raiseUserSignedIn = function _raiseUserSignedIn() {
    Log.debug("UserManagerEvents._raiseUserSignedIn");

    this._userSignedIn.raise();
  };

  _proto.addUserSignedOut = function addUserSignedOut(cb) {
    this._userSignedOut.addHandler(cb);
  };

  _proto.removeUserSignedOut = function removeUserSignedOut(cb) {
    this._userSignedOut.removeHandler(cb);
  };

  _proto._raiseUserSignedOut = function _raiseUserSignedOut() {
    Log.debug("UserManagerEvents._raiseUserSignedOut");

    this._userSignedOut.raise();
  };

  _proto.addUserSessionChanged = function addUserSessionChanged(cb) {
    this._userSessionChanged.addHandler(cb);
  };

  _proto.removeUserSessionChanged = function removeUserSessionChanged(cb) {
    this._userSessionChanged.removeHandler(cb);
  };

  _proto._raiseUserSessionChanged = function _raiseUserSessionChanged() {
    Log.debug("UserManagerEvents._raiseUserSessionChanged");

    this._userSessionChanged.raise();
  };

  return UserManagerEvents;
}(AccessTokenEvents);

var SilentRenewService = /*#__PURE__*/function () {
  function SilentRenewService(userManager) {
    this._userManager = void 0;
    this._callback = void 0;
    this._userManager = userManager;
    this._callback = null;
  }

  var _proto = SilentRenewService.prototype;

  _proto.start = /*#__PURE__*/function () {
    var _start = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this._callback) {
                _context.next = 11;
                break;
              }

              this._callback = this._tokenExpiring.bind(this);

              this._userManager.events.addAccessTokenExpiring(this._callback); // this will trigger loading of the user so the expiring events can be initialized


              _context.prev = 3;
              _context.next = 6;
              return this._userManager.getUser();

            case 6:
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](3);
              // catch to suppress errors since we're in a ctor
              Log.error("SilentRenewService.start: Error from getUser:", _context.t0 instanceof Error ? _context.t0.message : _context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 8]]);
    }));

    function start() {
      return _start.apply(this, arguments);
    }

    return start;
  }();

  _proto.stop = function stop() {
    if (this._callback) {
      this._userManager.events.removeAccessTokenExpiring(this._callback);

      this._callback = null;
    }
  };

  _proto._tokenExpiring = /*#__PURE__*/function () {
    var _tokenExpiring2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this._userManager.signinSilent();

            case 3:
              Log.debug("SilentRenewService._tokenExpiring: Silent token renewal successful");
              _context2.next = 10;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              Log.error("SilentRenewService._tokenExpiring: Error from signinSilent:", _context2.t0 instanceof Error ? _context2.t0.message : _context2.t0);

              this._userManager.events._raiseSilentRenewError(_context2.t0 instanceof Error ? _context2.t0 : new Error("Silent renew failed"));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 6]]);
    }));

    function _tokenExpiring() {
      return _tokenExpiring2.apply(this, arguments);
    }

    return _tokenExpiring;
  }();

  return SilentRenewService;
}();

var CheckSessionIFrame = /*#__PURE__*/function () {
  function CheckSessionIFrame(callback, client_id, url, intervalInSeconds, stopOnError) {
    this._callback = void 0;
    this._client_id = void 0;
    this._intervalInSeconds = void 0;
    this._stopOnError = void 0;
    this._frame_origin = void 0;
    this._frame = void 0;
    this._boundMessageEvent = void 0;
    this._timer = void 0;
    this._session_state = void 0;
    this._callback = callback;
    this._client_id = client_id;
    this._intervalInSeconds = intervalInSeconds;
    this._stopOnError = stopOnError;
    var idx = url.indexOf("/", url.indexOf("//") + 2);
    this._frame_origin = url.substr(0, idx);
    this._frame = window.document.createElement("iframe"); // shotgun approach

    this._frame.style.visibility = "hidden";
    this._frame.style.position = "absolute";
    this._frame.style.display = "none";
    this._frame.width = "0";
    this._frame.height = "0";
    this._frame.src = url;
    this._boundMessageEvent = null;
    this._timer = null;
    this._session_state = null;
  }

  var _proto = CheckSessionIFrame.prototype;

  _proto.load = function load() {
    var _this = this;

    return new Promise(function (resolve) {
      _this._frame.onload = function () {
        resolve();
      };

      window.document.body.appendChild(_this._frame);
      _this._boundMessageEvent = _this._message.bind(_this);
      window.addEventListener("message", _this._boundMessageEvent, false);
    });
  };

  _proto._message = /*#__PURE__*/function () {
    var _message2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(e) {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(e.origin === this._frame_origin && e.source === this._frame.contentWindow)) {
                _context.next = 14;
                break;
              }

              if (!(e.data === "error")) {
                _context.next = 6;
                break;
              }

              Log.error("CheckSessionIFrame: error message from check session op iframe");

              if (this._stopOnError) {
                this.stop();
              }

              _context.next = 14;
              break;

            case 6:
              if (!(e.data === "changed")) {
                _context.next = 13;
                break;
              }

              Log.debug("CheckSessionIFrame: changed message from check session op iframe");
              this.stop();
              _context.next = 11;
              return this._callback();

            case 11:
              _context.next = 14;
              break;

            case 13:
              Log.debug("CheckSessionIFrame: " + e.data + " message from check session op iframe");

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function _message(_x) {
      return _message2.apply(this, arguments);
    }

    return _message;
  }();

  _proto.start = function start(session_state) {
    var _this2 = this;

    if (this._session_state === session_state) {
      return;
    }

    Log.debug("CheckSessionIFrame.start");
    this.stop();
    this._session_state = session_state;

    var send = function send() {
      if (!_this2._frame.contentWindow || !_this2._session_state) {
        return;
      }

      _this2._frame.contentWindow.postMessage(_this2._client_id + " " + _this2._session_state, _this2._frame_origin);
    }; // trigger now


    send(); // and setup timer

    this._timer = window.setInterval(send, this._intervalInSeconds * 1000);
  };

  _proto.stop = function stop() {
    this._session_state = null;

    if (this._timer) {
      Log.debug("CheckSessionIFrame.stop");
      window.clearInterval(this._timer);
      this._timer = null;
    }
  };

  return CheckSessionIFrame;
}();

var SessionMonitor = /*#__PURE__*/function () {
  function SessionMonitor(userManager) {
    this._userManager = void 0;
    this._timer = void 0;
    this._sub = void 0;
    this._sid = void 0;
    this._checkSessionIFrame = void 0;

    if (!userManager) {
      Log.error("SessionMonitor.ctor: No user manager passed to SessionMonitor");
      throw new Error("userManager");
    }

    this._userManager = userManager;
    this._timer = g_timer;

    this._userManager.events.addUserLoaded(this._start.bind(this));

    this._userManager.events.addUserUnloaded(this._stop.bind(this));

    Promise.resolve(this._init())["catch"](function (err) {
      // catch to suppress errors since we're in a ctor
      Log.error("SessionMonitor ctor: error:", err.message);
    });
  }

  var _proto = SessionMonitor.prototype;

  _proto._init = /*#__PURE__*/function () {
    var _init2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var user, session, tmpUser;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._userManager.getUser();

            case 2:
              user = _context.sent;

              if (!user) {
                _context.next = 7;
                break;
              }

              void this._start(user);
              _context.next = 12;
              break;

            case 7:
              if (!this._userManager.settings.monitorAnonymousSession) {
                _context.next = 12;
                break;
              }

              _context.next = 10;
              return this._userManager.querySessionStatus();

            case 10:
              session = _context.sent;

              if (session) {
                tmpUser = {
                  session_state: session.session_state,
                  profile: session.sub && session.sid ? {
                    sub: session.sub,
                    sid: session.sid
                  } : null
                };
                void this._start(tmpUser);
              }

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function _init() {
      return _init2.apply(this, arguments);
    }

    return _init;
  }();

  _proto._start = /*#__PURE__*/function () {
    var _start2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(user) {
      var session_state, url, client_id, intervalInSeconds, stopOnError, checkSessionIFrame;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              session_state = user.session_state;

              if (session_state) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return");

            case 3:
              if (user.profile) {
                this._sub = user.profile.sub;
                this._sid = user.profile.sid;
                Log.debug("SessionMonitor._start: session_state:", session_state, ", sub:", this._sub);
              } else {
                this._sub = undefined;
                this._sid = undefined;
                Log.debug("SessionMonitor._start: session_state:", session_state, ", anonymous user");
              }

              if (!this._checkSessionIFrame) {
                _context2.next = 7;
                break;
              }

              this._checkSessionIFrame.start(session_state);

              return _context2.abrupt("return");

            case 7:
              _context2.prev = 7;
              _context2.next = 10;
              return this._userManager.metadataService.getCheckSessionIframe();

            case 10:
              url = _context2.sent;

              if (!url) {
                _context2.next = 23;
                break;
              }

              Log.debug("SessionMonitor._start: Initializing check session iframe");
              client_id = this._userManager.settings.client_id;
              intervalInSeconds = this._userManager.settings.checkSessionIntervalInSeconds;
              stopOnError = this._userManager.settings.stopCheckSessionOnError;
              checkSessionIFrame = new CheckSessionIFrame(this._callback.bind(this), client_id, url, intervalInSeconds, stopOnError);
              _context2.next = 19;
              return checkSessionIFrame.load();

            case 19:
              this._checkSessionIFrame = checkSessionIFrame;
              checkSessionIFrame.start(session_state);
              _context2.next = 24;
              break;

            case 23:
              Log.warn("SessionMonitor._start: No check session iframe found in the metadata");

            case 24:
              _context2.next = 29;
              break;

            case 26:
              _context2.prev = 26;
              _context2.t0 = _context2["catch"](7);
              // catch to suppress errors since we're in non-promise callback
              Log.error("SessionMonitor._start: Error from getCheckSessionIframe:", _context2.t0 instanceof Error ? _context2.t0.message : _context2.t0);

            case 29:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[7, 26]]);
    }));

    function _start(_x) {
      return _start2.apply(this, arguments);
    }

    return _start;
  }();

  _proto._stop = function _stop() {
    var _this = this;

    this._sub = undefined;
    this._sid = undefined;

    if (this._checkSessionIFrame) {
      Log.debug("SessionMonitor._stop");

      this._checkSessionIFrame.stop();
    }

    if (this._userManager.settings.monitorAnonymousSession) {
      // using a timer to delay re-initialization to avoid race conditions during signout
      // TODO rewrite to use promise correctly
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      var timerHandle = this._timer.setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
        var session, tmpUser;
        return runtime_1.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this._timer.clearInterval(timerHandle);

                _context3.prev = 1;
                _context3.next = 4;
                return _this._userManager.querySessionStatus();

              case 4:
                session = _context3.sent;
                tmpUser = {
                  session_state: session.session_state,
                  profile: session.sub && session.sid ? {
                    sub: session.sub,
                    sid: session.sid
                  } : null
                };
                void _this._start(tmpUser);
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](1);
                // catch to suppress errors since we're in a callback
                Log.error("SessionMonitor: error from querySessionStatus:", _context3.t0 instanceof Error ? _context3.t0.message : _context3.t0);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 9]]);
      })), 1000);
    }
  };

  _proto._callback = /*#__PURE__*/function () {
    var _callback2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4() {
      var session, raiseEvent;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return this._userManager.querySessionStatus();

            case 3:
              session = _context4.sent;
              raiseEvent = true;

              if (session && this._checkSessionIFrame) {
                if (session.sub === this._sub) {
                  raiseEvent = false;

                  this._checkSessionIFrame.start(session.session_state);

                  if (session.sid === this._sid) {
                    Log.debug("SessionMonitor._callback: Same sub still logged in at OP, restarting check session iframe; session_state:", session.session_state);
                  } else {
                    Log.debug("SessionMonitor._callback: Same sub still logged in at OP, session state has changed, restarting check session iframe; session_state:", session.session_state);

                    this._userManager.events._raiseUserSessionChanged();
                  }
                } else {
                  Log.debug("SessionMonitor._callback: Different subject signed into OP:", session.sub);
                }
              } else {
                Log.debug("SessionMonitor._callback: Subject no longer signed into OP");
              }

              if (raiseEvent) {
                if (this._sub) {
                  Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed out event");

                  this._userManager.events._raiseUserSignedOut();
                } else {
                  Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed in event");

                  this._userManager.events._raiseUserSignedIn();
                }
              }

              _context4.next = 12;
              break;

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);

              if (this._sub) {
                Log.debug("SessionMonitor._callback: Error calling queryCurrentSigninSession; raising signed out event", _context4.t0 instanceof Error ? _context4.t0.message : _context4.t0);

                this._userManager.events._raiseUserSignedOut();
              }

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 9]]);
    }));

    function _callback() {
      return _callback2.apply(this, arguments);
    }

    return _callback;
  }();

  return SessionMonitor;
}();

var AccessTokenTypeHint = "access_token";
var RefreshTokenTypeHint = "refresh_token";
var TokenRevocationClient = /*#__PURE__*/function () {
  function TokenRevocationClient(settings, metadataService) {
    this._settings = void 0;
    this._metadataService = void 0;
    this._settings = settings;
    this._metadataService = metadataService;
  }

  var _proto = TokenRevocationClient.prototype;

  _proto.revoke = /*#__PURE__*/function () {
    var _revoke2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(token, required, type) {
      var url, client_id, client_secret;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (type === void 0) {
                type = "access_token";
              }

              if (token) {
                _context.next = 4;
                break;
              }

              Log.error("TokenRevocationClient.revoke: No token provided");
              throw new Error("No token provided.");

            case 4:
              if (!(type !== AccessTokenTypeHint && type != RefreshTokenTypeHint)) {
                _context.next = 7;
                break;
              }

              Log.error("TokenRevocationClient.revoke: Invalid token type");
              throw new Error("Invalid token type.");

            case 7:
              _context.next = 9;
              return this._metadataService.getRevocationEndpoint();

            case 9:
              url = _context.sent;

              if (url) {
                _context.next = 15;
                break;
              }

              if (!required) {
                _context.next = 14;
                break;
              }

              Log.error("TokenRevocationClient.revoke: Revocation not supported");
              throw new Error("Revocation not supported");

            case 14:
              return _context.abrupt("return");

            case 15:
              Log.debug("TokenRevocationClient.revoke: Revoking " + type);
              client_id = this._settings.client_id;
              client_secret = this._settings.client_secret;
              return _context.abrupt("return", this._revoke(url, client_id, client_secret, token, type));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function revoke(_x, _x2, _x3) {
      return _revoke2.apply(this, arguments);
    }

    return revoke;
  }();

  _proto._revoke = /*#__PURE__*/function () {
    var _revoke3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(url, client_id, client_secret, token, type) {
      var headers, body, response;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              headers = {
                "Content-Type": "application/x-www-form-urlencoded"
              };
              body = new URLSearchParams();
              body.set("client_id", client_id);

              if (client_secret) {
                body.set("client_secret", client_secret);
              }

              body.set("token_type_hint", type);
              body.set("token", token);
              _context2.prev = 6;
              Log.debug("TokenRevocationClient.revoke, url: ", url);
              _context2.next = 10;
              return fetch(url, {
                method: "POST",
                headers: headers,
                body: body
              });

            case 10:
              response = _context2.sent;
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](6);
              Log.error("TokenRevocationClient.revoke: network error");
              throw new Error("Network Error");

            case 17:
              Log.debug("TokenRevocationClient.revoke: HTTP response received, status", response.status);

              if (!(response.status !== 200)) {
                _context2.next = 20;
                break;
              }

              throw new Error(response.statusText + " (" + response.status.toString() + ")");

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[6, 13]]);
    }));

    function _revoke(_x4, _x5, _x6, _x7, _x8) {
      return _revoke3.apply(this, arguments);
    }

    return _revoke;
  }();

  return TokenRevocationClient;
}();

var UserManager = /*#__PURE__*/function () {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function UserManager(settings) {
    this.settings = void 0;
    this._client = void 0;
    this._redirectNavigator = void 0;
    this._popupNavigator = void 0;
    this._iframeNavigator = void 0;
    this._events = void 0;
    this._silentRenewService = void 0;
    this._sessionMonitor = void 0;
    this._tokenRevocationClient = void 0;
    this._tokenClient = void 0;
    this.settings = new UserManagerSettingsStore(settings);
    this._client = new OidcClient(settings);
    this._redirectNavigator = new RedirectNavigator();
    this._popupNavigator = new PopupNavigator();
    this._iframeNavigator = new IFrameNavigator();
    this._events = new UserManagerEvents(this.settings);
    this._silentRenewService = new SilentRenewService(this); // order is important for the following properties; these services depend upon the events.

    if (this.settings.automaticSilentRenew) {
      Log.debug("UserManager.ctor: automaticSilentRenew is configured, setting up silent renew");
      this.startSilentRenew();
    }

    this._sessionMonitor = null;

    if (this.settings.monitorSession) {
      Log.debug("UserManager.ctor: monitorSession is configured, setting up session monitor");
      this._sessionMonitor = new SessionMonitor(this);
    }

    this._tokenRevocationClient = new TokenRevocationClient(this.settings, this.metadataService);
    this._tokenClient = new TokenClient(this.settings, this.metadataService);
  }

  var _proto = UserManager.prototype;

  _proto.getUser = /*#__PURE__*/function () {
    var _getUser = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var user;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._loadUser();

            case 2:
              user = _context.sent;

              if (!user) {
                _context.next = 7;
                break;
              }

              Log.info("UserManager.getUser: user loaded");

              this._events.load(user, false);

              return _context.abrupt("return", user);

            case 7:
              Log.info("UserManager.getUser: user not found in storage");
              return _context.abrupt("return", null);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getUser() {
      return _getUser.apply(this, arguments);
    }

    return getUser;
  }();

  _proto.removeUser = /*#__PURE__*/function () {
    var _removeUser = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.storeUser(null);

            case 2:
              Log.info("UserManager.removeUser: user removed from storage");

              this._events.unload();

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function removeUser() {
      return _removeUser.apply(this, arguments);
    }

    return removeUser;
  }();

  _proto.signinRedirect = /*#__PURE__*/function () {
    var _signinRedirect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
      var args;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              args = {
                request_type: "si:r"
              };
              _context3.next = 3;
              return this._signinStart(args, this._redirectNavigator, {
                redirectMethod: this.settings.redirectMethod
              });

            case 3:
              Log.info("UserManager.signinRedirect: successful");

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function signinRedirect() {
      return _signinRedirect.apply(this, arguments);
    }

    return signinRedirect;
  }();

  _proto.signinRedirectCallback = /*#__PURE__*/function () {
    var _signinRedirectCallback = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(url) {
      var user;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this._signinEnd(url || this._redirectNavigator.url);

            case 2:
              user = _context4.sent;

              if (user.profile && user.profile.sub) {
                Log.info("UserManager.signinRedirectCallback: successful, signed in sub: ", user.profile.sub);
              } else {
                Log.info("UserManager.signinRedirectCallback: no sub");
              }

              return _context4.abrupt("return", user);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function signinRedirectCallback(_x) {
      return _signinRedirectCallback.apply(this, arguments);
    }

    return signinRedirectCallback;
  }();

  _proto.signinPopup = /*#__PURE__*/function () {
    var _signinPopup = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5() {
      var url, args, user;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              url = this.settings.popup_redirect_uri || this.settings.redirect_uri;

              if (url) {
                _context5.next = 4;
                break;
              }

              Log.error("UserManager.signinPopup: No popup_redirect_uri or redirect_uri configured");
              throw new Error("No popup_redirect_uri or redirect_uri configured");

            case 4:
              args = {
                request_type: "si:p",
                redirect_uri: url,
                display: "popup"
              };
              _context5.next = 7;
              return this._signin(args, this._popupNavigator, {
                startUrl: url,
                popupWindowFeatures: this.settings.popupWindowFeatures,
                popupWindowTarget: this.settings.popupWindowTarget,
                redirectMethod: this.settings.redirectMethod
              });

            case 7:
              user = _context5.sent;

              if (user) {
                if (user.profile && user.profile.sub) {
                  Log.info("UserManager.signinPopup: signinPopup successful, signed in sub: ", user.profile.sub);
                } else {
                  Log.info("UserManager.signinPopup: no sub");
                }
              }

              return _context5.abrupt("return", user);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function signinPopup() {
      return _signinPopup.apply(this, arguments);
    }

    return signinPopup;
  }();

  _proto.signinPopupCallback = /*#__PURE__*/function () {
    var _signinPopupCallback = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(url) {
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return this._signinCallback(url, this._popupNavigator);

            case 3:
              Log.info("UserManager.signinPopupCallback: successful");
              _context6.next = 9;
              break;

            case 6:
              _context6.prev = 6;
              _context6.t0 = _context6["catch"](0);
              Log.error("UserManager.signinPopupCallback error", _context6.t0 instanceof Error ? _context6.t0.message : _context6.t0);

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[0, 6]]);
    }));

    function signinPopupCallback(_x2) {
      return _signinPopupCallback.apply(this, arguments);
    }

    return signinPopupCallback;
  }();

  _proto.signinSilent = /*#__PURE__*/function () {
    var _signinSilent = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7() {
      var user, args;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this._loadUser();

            case 2:
              user = _context7.sent;

              if (!(user && user.refresh_token)) {
                _context7.next = 5;
                break;
              }

              return _context7.abrupt("return", this._useRefreshToken(user));

            case 5:
              args = {
                request_type: "si:s",
                id_token_hint: this.settings.includeIdTokenInSilentRenew && user ? user.id_token : undefined
              };

              if (user && this.settings.validateSubOnSilentRenew) {
                Log.debug("UserManager.signinSilent, subject prior to silent renew: ", user.profile.sub);
                args.current_sub = user.profile.sub;
              }

              return _context7.abrupt("return", this._signinSilentIframe(args));

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function signinSilent() {
      return _signinSilent.apply(this, arguments);
    }

    return signinSilent;
  }();

  _proto._useRefreshToken = /*#__PURE__*/function () {
    var _useRefreshToken2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(user) {
      var args, result;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              args = {
                refresh_token: user.refresh_token || ""
              };
              _context8.next = 3;
              return this._tokenClient.exchangeRefreshToken(args);

            case 3:
              result = _context8.sent;

              if (result) {
                _context8.next = 7;
                break;
              }

              Log.error("UserManager._useRefreshToken: No response returned from token endpoint");
              throw new Error("No response returned from token endpoint");

            case 7:
              if (result.access_token) {
                _context8.next = 10;
                break;
              }

              Log.error("UserManager._useRefreshToken: No access token returned from token endpoint");
              throw new Error("No access token returned from token endpoint");

            case 10:
              if (!result.id_token) {
                _context8.next = 13;
                break;
              }

              _context8.next = 13;
              return this._validateIdTokenFromTokenRefreshToken(user.profile, result.id_token);

            case 13:
              Log.debug("UserManager._useRefreshToken: refresh token response success");
              user.id_token = result.id_token || user.id_token;
              user.access_token = result.access_token || user.access_token;
              user.refresh_token = result.refresh_token || user.refresh_token;
              user.expires_in = result.expires_in;
              _context8.next = 20;
              return this.storeUser(user);

            case 20:
              this._events.load(user);

              return _context8.abrupt("return", user);

            case 22:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function _useRefreshToken(_x3) {
      return _useRefreshToken2.apply(this, arguments);
    }

    return _useRefreshToken;
  }();

  _proto._validateIdTokenFromTokenRefreshToken = /*#__PURE__*/function () {
    var _validateIdTokenFromTokenRefreshToken2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(profile, id_token) {
      var issuer, now, payload;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return this.metadataService.getIssuer();

            case 2:
              issuer = _context9.sent;
              now = Timer.getEpochTime();
              _context9.next = 6;
              return JoseUtil.validateJwtAttributes(id_token, issuer, this.settings.client_id, this.settings.clockSkewInSeconds, now);

            case 6:
              payload = _context9.sent;

              if (payload) {
                _context9.next = 10;
                break;
              }

              Log.error("UserManager._validateIdTokenFromTokenRefreshToken: Failed to validate id_token");
              throw new Error("Failed to validate id_token");

            case 10:
              if (!(payload.sub !== profile.sub)) {
                _context9.next = 13;
                break;
              }

              Log.error("UserManager._validateIdTokenFromTokenRefreshToken: sub in id_token does not match current sub");
              throw new Error("sub in id_token does not match current sub");

            case 13:
              if (!(payload.auth_time && payload.auth_time !== profile.auth_time)) {
                _context9.next = 16;
                break;
              }

              Log.error("UserManager._validateIdTokenFromTokenRefreshToken: auth_time in id_token does not match original auth_time");
              throw new Error("auth_time in id_token does not match original auth_time");

            case 16:
              if (!(payload.azp && payload.azp !== profile.azp)) {
                _context9.next = 19;
                break;
              }

              Log.error("UserManager._validateIdTokenFromTokenRefreshToken: azp in id_token does not match original azp");
              throw new Error("azp in id_token does not match original azp");

            case 19:
              if (!(!payload.azp && profile.azp)) {
                _context9.next = 22;
                break;
              }

              Log.error("UserManager._validateIdTokenFromTokenRefreshToken: azp not in id_token, but present in original id_token");
              throw new Error("azp not in id_token, but present in original id_token");

            case 22:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function _validateIdTokenFromTokenRefreshToken(_x4, _x5) {
      return _validateIdTokenFromTokenRefreshToken2.apply(this, arguments);
    }

    return _validateIdTokenFromTokenRefreshToken;
  }();

  _proto._signinSilentIframe = /*#__PURE__*/function () {
    var _signinSilentIframe2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(args) {
      var url, user;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              url = args.redirect_uri || this.settings.silent_redirect_uri || this.settings.redirect_uri;

              if (url) {
                _context10.next = 4;
                break;
              }

              Log.error("UserManager.signinSilent: No silent_redirect_uri configured");
              throw new Error("No silent_redirect_uri configured");

            case 4:
              args.redirect_uri = url;
              args.prompt = args.prompt || "none";
              _context10.next = 8;
              return this._signin(args, this._iframeNavigator, {
                startUrl: url,
                silentRequestTimeoutInSeconds: this.settings.silentRequestTimeoutInSeconds
              });

            case 8:
              user = _context10.sent;

              if (user) {
                if (user.profile && user.profile.sub) {
                  Log.info("UserManager.signinSilent: successful, signed in sub: ", user.profile.sub);
                } else {
                  Log.info("UserManager.signinSilent: no sub");
                }
              }

              return _context10.abrupt("return", user);

            case 11:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function _signinSilentIframe(_x6) {
      return _signinSilentIframe2.apply(this, arguments);
    }

    return _signinSilentIframe;
  }();

  _proto.signinSilentCallback = /*#__PURE__*/function () {
    var _signinSilentCallback = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(url) {
      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this._signinCallback(url, this._iframeNavigator);

            case 2:
              Log.info("UserManager.signinSilentCallback: successful");

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function signinSilentCallback(_x7) {
      return _signinSilentCallback.apply(this, arguments);
    }

    return signinSilentCallback;
  }();

  _proto.signinCallback = /*#__PURE__*/function () {
    var _signinCallback2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(url) {
      var _yield$this$_client$r, state;

      return runtime_1.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return this._client.readSigninResponseState(url);

            case 2:
              _yield$this$_client$r = _context12.sent;
              state = _yield$this$_client$r.state;

              if (!(state.request_type === "si:r")) {
                _context12.next = 6;
                break;
              }

              return _context12.abrupt("return", this.signinRedirectCallback(url));

            case 6:
              if (!(state.request_type === "si:p")) {
                _context12.next = 10;
                break;
              }

              _context12.next = 9;
              return this.signinPopupCallback(url);

            case 9:
              return _context12.abrupt("return", null);

            case 10:
              if (!(state.request_type === "si:s")) {
                _context12.next = 14;
                break;
              }

              _context12.next = 13;
              return this.signinSilentCallback(url);

            case 13:
              return _context12.abrupt("return", null);

            case 14:
              throw new Error("invalid response_type in state");

            case 15:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function signinCallback(_x8) {
      return _signinCallback2.apply(this, arguments);
    }

    return signinCallback;
  }();

  _proto.signoutCallback = /*#__PURE__*/function () {
    var _signoutCallback = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee13(url, keepOpen) {
      var _yield$this$_client$r2, state;

      return runtime_1.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (keepOpen === void 0) {
                keepOpen = false;
              }

              _context13.next = 3;
              return this._client.readSignoutResponseState(url);

            case 3:
              _yield$this$_client$r2 = _context13.sent;
              state = _yield$this$_client$r2.state;

              if (!state) {
                _context13.next = 13;
                break;
              }

              if (!(state.request_type === "so:r")) {
                _context13.next = 9;
                break;
              }

              _context13.next = 9;
              return this.signoutRedirectCallback(url);

            case 9:
              if (!(state.request_type === "so:p")) {
                _context13.next = 12;
                break;
              }

              _context13.next = 12;
              return this.signoutPopupCallback(url, keepOpen);

            case 12:
              throw new Error("invalid response_type in state");

            case 13:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function signoutCallback(_x9, _x10) {
      return _signoutCallback.apply(this, arguments);
    }

    return signoutCallback;
  }();

  _proto.querySessionStatus = /*#__PURE__*/function () {
    var _querySessionStatus = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee14() {
      var url, args, navResponse, signinResponse;
      return runtime_1.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              url = this.settings.silent_redirect_uri || this.settings.redirect_uri;

              if (url) {
                _context14.next = 4;
                break;
              }

              Log.error("UserManager.querySessionStatus: No silent_redirect_uri configured");
              throw new Error("No silent_redirect_uri configured");

            case 4:
              args = {
                request_type: "si:s",
                redirect_uri: url,
                prompt: "none",
                response_type: this.settings.query_status_response_type,
                scope: "openid",
                skipUserInfo: true
              };
              _context14.next = 7;
              return this._signinStart(args, this._iframeNavigator, {
                startUrl: url,
                silentRequestTimeoutInSeconds: this.settings.silentRequestTimeoutInSeconds,
                redirectMethod: this.settings.redirectMethod
              });

            case 7:
              navResponse = _context14.sent;
              _context14.prev = 8;
              _context14.next = 11;
              return this._client.processSigninResponse(navResponse.url);

            case 11:
              signinResponse = _context14.sent;
              Log.debug("UserManager.querySessionStatus: got signin response");

              if (!(signinResponse.session_state && signinResponse.profile.sub)) {
                _context14.next = 16;
                break;
              }

              Log.info("UserManager.querySessionStatus: querySessionStatus success for sub: ", signinResponse.profile.sub);
              return _context14.abrupt("return", {
                session_state: signinResponse.session_state,
                sub: signinResponse.profile.sub,
                sid: signinResponse.profile.sid
              });

            case 16:
              Log.info("querySessionStatus successful, user not authenticated");
              return _context14.abrupt("return", null);

            case 20:
              _context14.prev = 20;
              _context14.t0 = _context14["catch"](8);

              if (!(this.settings.monitorAnonymousSession && _context14.t0 instanceof ErrorResponse && _context14.t0.session_state)) {
                _context14.next = 26;
                break;
              }

              if (!(_context14.t0.message == "login_required" || _context14.t0.message == "consent_required" || _context14.t0.message == "interaction_required" || _context14.t0.message == "account_selection_required")) {
                _context14.next = 26;
                break;
              }

              Log.info("UserManager.querySessionStatus: querySessionStatus success for anonymous user");
              return _context14.abrupt("return", {
                session_state: _context14.t0.session_state
              });

            case 26:
              throw _context14.t0;

            case 27:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this, [[8, 20]]);
    }));

    function querySessionStatus() {
      return _querySessionStatus.apply(this, arguments);
    }

    return querySessionStatus;
  }();

  _proto._signin = /*#__PURE__*/function () {
    var _signin2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee15(args, navigator, navigatorParams) {
      var navResponse;
      return runtime_1.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return this._signinStart(args, navigator, navigatorParams);

            case 2:
              navResponse = _context15.sent;
              return _context15.abrupt("return", this._signinEnd(navResponse.url, args));

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function _signin(_x11, _x12, _x13) {
      return _signin2.apply(this, arguments);
    }

    return _signin;
  }();

  _proto._signinStart = /*#__PURE__*/function () {
    var _signinStart2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee16(args, navigator, navigatorParams) {
      var handle, signinRequest;
      return runtime_1.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return navigator.prepare(navigatorParams);

            case 2:
              handle = _context16.sent;
              Log.debug("UserManager._signinStart: got navigator window handle");
              _context16.prev = 4;
              _context16.next = 7;
              return this._client.createSigninRequest(args);

            case 7:
              signinRequest = _context16.sent;
              Log.debug("UserManager._signinStart: got signin request");
              navigatorParams.url = signinRequest.url;
              navigatorParams.id = signinRequest.state.id;
              return _context16.abrupt("return", handle.navigate(navigatorParams));

            case 14:
              _context16.prev = 14;
              _context16.t0 = _context16["catch"](4);
              Log.debug("UserManager._signinStart: Error after preparing navigator, closing navigator window");
              handle.close();
              throw _context16.t0;

            case 19:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this, [[4, 14]]);
    }));

    function _signinStart(_x14, _x15, _x16) {
      return _signinStart2.apply(this, arguments);
    }

    return _signinStart;
  }();

  _proto._signinEnd = /*#__PURE__*/function () {
    var _signinEnd2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee17(url, args) {
      var signinResponse, user;
      return runtime_1.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              if (args === void 0) {
                args = {};
              }

              _context17.next = 3;
              return this._client.processSigninResponse(url);

            case 3:
              signinResponse = _context17.sent;
              Log.debug("UserManager._signinEnd: got signin response");
              user = new User(signinResponse);

              if (!args.current_sub) {
                _context17.next = 13;
                break;
              }

              if (!(args.current_sub !== user.profile.sub)) {
                _context17.next = 12;
                break;
              }

              Log.debug("UserManager._signinEnd: current user does not match user returned from signin. sub from signin: ", user.profile.sub);
              throw new Error("login_required");

            case 12:
              Log.debug("UserManager._signinEnd: current user matches user returned from signin");

            case 13:
              _context17.next = 15;
              return this.storeUser(user);

            case 15:
              Log.debug("UserManager._signinEnd: user stored");

              this._events.load(user);

              return _context17.abrupt("return", user);

            case 18:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    function _signinEnd(_x17, _x18) {
      return _signinEnd2.apply(this, arguments);
    }

    return _signinEnd;
  }();

  _proto._signinCallback = function _signinCallback(url, navigator) {
    Log.debug("UserManager._signinCallback");
    var useQuery = this.settings.response_mode === "query" || !this.settings.response_mode && SigninRequest.isCode(this.settings.response_type);
    var delimiter = useQuery ? "?" : "#";
    return navigator.callback(url, false, delimiter);
  };

  _proto.signoutRedirect = /*#__PURE__*/function () {
    var _signoutRedirect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee18() {
      var args, postLogoutRedirectUri;
      return runtime_1.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              args = {
                request_type: "so:r"
              };
              postLogoutRedirectUri = this.settings.post_logout_redirect_uri;

              if (postLogoutRedirectUri) {
                args.post_logout_redirect_uri = postLogoutRedirectUri;
              }

              _context18.next = 5;
              return this._signoutStart(args, this._redirectNavigator);

            case 5:
              Log.info("UserManager.signoutRedirect: successful");

            case 6:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, this);
    }));

    function signoutRedirect() {
      return _signoutRedirect.apply(this, arguments);
    }

    return signoutRedirect;
  }();

  _proto.signoutRedirectCallback = /*#__PURE__*/function () {
    var _signoutRedirectCallback = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee19(url) {
      var response;
      return runtime_1.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return this._signoutEnd(url || this._redirectNavigator.url);

            case 2:
              response = _context19.sent;
              Log.info("UserManager.signoutRedirectCallback: successful");
              return _context19.abrupt("return", response);

            case 5:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, this);
    }));

    function signoutRedirectCallback(_x19) {
      return _signoutRedirectCallback.apply(this, arguments);
    }

    return signoutRedirectCallback;
  }();

  _proto.signoutPopup = /*#__PURE__*/function () {
    var _signoutPopup = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee20() {
      var url, args;
      return runtime_1.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              url = this.settings.popup_post_logout_redirect_uri || this.settings.post_logout_redirect_uri;
              args = {
                request_type: "so:p",
                post_logout_redirect_uri: url
              };

              if (args.post_logout_redirect_uri) {
                // we're putting a dummy entry in here because we
                // need a unique id from the state for notification
                // to the parent window, which is necessary if we
                // plan to return back to the client after signout
                // and so we can close the popup after signout
                args.state = args.state || {};
              }

              _context20.next = 5;
              return this._signout(args, this._popupNavigator, {
                startUrl: url,
                popupWindowFeatures: this.settings.popupWindowFeatures,
                popupWindowTarget: this.settings.popupWindowTarget
              });

            case 5:
              Log.info("UserManager.signoutPopup: successful");

            case 6:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, this);
    }));

    function signoutPopup() {
      return _signoutPopup.apply(this, arguments);
    }

    return signoutPopup;
  }();

  _proto.signoutPopupCallback = /*#__PURE__*/function () {
    var _signoutPopupCallback = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee21(url, keepOpen) {
      var delimiter;
      return runtime_1.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              if (typeof keepOpen === "undefined" && typeof url === "boolean") {
                keepOpen = url;
                url = null;
              }

              delimiter = "?";
              _context21.next = 4;
              return this._popupNavigator.callback(url, keepOpen, delimiter);

            case 4:
              Log.info("UserManager.signoutPopupCallback: successful");

            case 5:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21, this);
    }));

    function signoutPopupCallback(_x20, _x21) {
      return _signoutPopupCallback.apply(this, arguments);
    }

    return signoutPopupCallback;
  }();

  _proto._signout = /*#__PURE__*/function () {
    var _signout2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee22(args, navigator, navigatorParams) {
      var navResponse;
      return runtime_1.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return this._signoutStart(args, navigator, navigatorParams);

            case 2:
              navResponse = _context22.sent;
              return _context22.abrupt("return", this._signoutEnd(navResponse.url));

            case 4:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22, this);
    }));

    function _signout(_x22, _x23, _x24) {
      return _signout2.apply(this, arguments);
    }

    return _signout;
  }();

  _proto._signoutStart = /*#__PURE__*/function () {
    var _signoutStart2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee23(args, navigator, navigatorParams) {
      var handle, user, id_token, signoutRequest;
      return runtime_1.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              if (args === void 0) {
                args = {};
              }

              if (navigatorParams === void 0) {
                navigatorParams = {};
              }

              _context23.next = 4;
              return navigator.prepare(navigatorParams);

            case 4:
              handle = _context23.sent;
              Log.debug("UserManager._signoutStart: got navigator window handle");
              _context23.prev = 6;
              _context23.next = 9;
              return this._loadUser();

            case 9:
              user = _context23.sent;
              Log.debug("UserManager._signoutStart: loaded current user from storage");

              if (!this.settings.revokeAccessTokenOnSignout) {
                _context23.next = 14;
                break;
              }

              _context23.next = 14;
              return this._revokeInternal(user);

            case 14:
              id_token = args.id_token_hint || user && user.id_token;

              if (id_token) {
                Log.debug("UserManager._signoutStart: Setting id_token into signout request");
                args.id_token_hint = id_token;
              }

              _context23.next = 18;
              return this.removeUser();

            case 18:
              Log.debug("UserManager._signoutStart: user removed, creating signout request");
              _context23.next = 21;
              return this._client.createSignoutRequest(args);

            case 21:
              signoutRequest = _context23.sent;
              Log.debug("UserManager._signoutStart: got signout request");
              navigatorParams.url = signoutRequest.url;

              if (signoutRequest.state) {
                navigatorParams.id = signoutRequest.state.id;
              }

              return _context23.abrupt("return", handle.navigate(navigatorParams));

            case 28:
              _context23.prev = 28;
              _context23.t0 = _context23["catch"](6);
              Log.debug("UserManager._signoutStart: Error after preparing navigator, closing navigator window");
              handle.close();
              throw _context23.t0;

            case 33:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23, this, [[6, 28]]);
    }));

    function _signoutStart(_x25, _x26, _x27) {
      return _signoutStart2.apply(this, arguments);
    }

    return _signoutStart;
  }();

  _proto._signoutEnd = /*#__PURE__*/function () {
    var _signoutEnd2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee24(url) {
      var signoutResponse;
      return runtime_1.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return this._client.processSignoutResponse(url);

            case 2:
              signoutResponse = _context24.sent;
              Log.debug("UserManager._signoutEnd: got signout response");
              return _context24.abrupt("return", signoutResponse);

            case 5:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24, this);
    }));

    function _signoutEnd(_x28) {
      return _signoutEnd2.apply(this, arguments);
    }

    return _signoutEnd;
  }();

  _proto.revokeAccessToken = /*#__PURE__*/function () {
    var _revokeAccessToken = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee25() {
      var user, success;
      return runtime_1.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return this._loadUser();

            case 2:
              user = _context25.sent;
              _context25.next = 5;
              return this._revokeInternal(user, true);

            case 5:
              success = _context25.sent;

              if (!(success && user)) {
                _context25.next = 16;
                break;
              }

              Log.debug("UserManager.revokeAccessToken: removing token properties from user and re-storing");
              user.access_token = "";
              user.refresh_token = "";
              user.expires_at = 0;
              user.token_type = "";
              _context25.next = 14;
              return this.storeUser(user);

            case 14:
              Log.debug("UserManager.revokeAccessToken: user stored");

              this._events.load(user);

            case 16:
              Log.info("UserManager.revokeAccessToken: access token revoked successfully");

            case 17:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25, this);
    }));

    function revokeAccessToken() {
      return _revokeAccessToken.apply(this, arguments);
    }

    return revokeAccessToken;
  }();

  _proto._revokeInternal = /*#__PURE__*/function () {
    var _revokeInternal2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee26(user, required) {
      var access_token, refresh_token, atSuccess, rtSuccess;
      return runtime_1.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              if (required === void 0) {
                required = false;
              }

              if (!user) {
                _context26.next = 12;
                break;
              }

              access_token = user.access_token;
              refresh_token = user.refresh_token;
              _context26.next = 6;
              return this._revokeAccessTokenInternal(access_token, required);

            case 6:
              atSuccess = _context26.sent;
              _context26.next = 9;
              return this._revokeRefreshTokenInternal(refresh_token, required);

            case 9:
              rtSuccess = _context26.sent;

              if (!atSuccess && !rtSuccess) {
                Log.debug("UserManager.revokeAccessToken: no need to revoke due to no token(s), or JWT format");
              }

              return _context26.abrupt("return", atSuccess || rtSuccess);

            case 12:
              return _context26.abrupt("return", false);

            case 13:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26, this);
    }));

    function _revokeInternal(_x29, _x30) {
      return _revokeInternal2.apply(this, arguments);
    }

    return _revokeInternal;
  }();

  _proto._revokeAccessTokenInternal = /*#__PURE__*/function () {
    var _revokeAccessTokenInternal2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee27(access_token, required) {
      return runtime_1.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              if (!(!access_token || access_token.includes("."))) {
                _context27.next = 2;
                break;
              }

              return _context27.abrupt("return", false);

            case 2:
              _context27.next = 4;
              return this._tokenRevocationClient.revoke(access_token, required);

            case 4:
              return _context27.abrupt("return", true);

            case 5:
            case "end":
              return _context27.stop();
          }
        }
      }, _callee27, this);
    }));

    function _revokeAccessTokenInternal(_x31, _x32) {
      return _revokeAccessTokenInternal2.apply(this, arguments);
    }

    return _revokeAccessTokenInternal;
  }();

  _proto._revokeRefreshTokenInternal = /*#__PURE__*/function () {
    var _revokeRefreshTokenInternal2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee28(refresh_token, required) {
      return runtime_1.wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              if (refresh_token) {
                _context28.next = 2;
                break;
              }

              return _context28.abrupt("return", false);

            case 2:
              _context28.next = 4;
              return this._tokenRevocationClient.revoke(refresh_token, required, "refresh_token");

            case 4:
              return _context28.abrupt("return", true);

            case 5:
            case "end":
              return _context28.stop();
          }
        }
      }, _callee28, this);
    }));

    function _revokeRefreshTokenInternal(_x33, _x34) {
      return _revokeRefreshTokenInternal2.apply(this, arguments);
    }

    return _revokeRefreshTokenInternal;
  }();

  _proto.startSilentRenew = function startSilentRenew() {
    void this._silentRenewService.start();
  };

  _proto.stopSilentRenew = function stopSilentRenew() {
    this._silentRenewService.stop();
  };

  _proto._loadUser = /*#__PURE__*/function () {
    var _loadUser2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee29() {
      var storageString;
      return runtime_1.wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              _context29.next = 2;
              return this.settings.userStore.get(this._userStoreKey);

            case 2:
              storageString = _context29.sent;

              if (!storageString) {
                _context29.next = 6;
                break;
              }

              Log.debug("UserManager._loadUser: user storageString loaded");
              return _context29.abrupt("return", User.fromStorageString(storageString));

            case 6:
              Log.debug("UserManager._loadUser: no user storageString");
              return _context29.abrupt("return", null);

            case 8:
            case "end":
              return _context29.stop();
          }
        }
      }, _callee29, this);
    }));

    function _loadUser() {
      return _loadUser2.apply(this, arguments);
    }

    return _loadUser;
  }();

  _proto.storeUser = /*#__PURE__*/function () {
    var _storeUser = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee30(user) {
      var storageString;
      return runtime_1.wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              if (!user) {
                _context30.next = 7;
                break;
              }

              Log.debug("UserManager.storeUser: storing user");
              storageString = user.toStorageString();
              _context30.next = 5;
              return this.settings.userStore.set(this._userStoreKey, storageString);

            case 5:
              _context30.next = 10;
              break;

            case 7:
              Log.debug("storeUser.storeUser: removing user");
              _context30.next = 10;
              return this.settings.userStore.remove(this._userStoreKey);

            case 10:
            case "end":
              return _context30.stop();
          }
        }
      }, _callee30, this);
    }));

    function storeUser(_x35) {
      return _storeUser.apply(this, arguments);
    }

    return storeUser;
  }();

  _proto.clearStaleState = /*#__PURE__*/function () {
    var _clearStaleState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee31() {
      return runtime_1.wrap(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              _context31.next = 2;
              return this._client.clearStaleState();

            case 2:
            case "end":
              return _context31.stop();
          }
        }
      }, _callee31, this);
    }));

    function clearStaleState() {
      return _clearStaleState.apply(this, arguments);
    }

    return clearStaleState;
  }();

  _createClass(UserManager, [{
    key: "events",
    get: function get() {
      return this._events;
    }
  }, {
    key: "metadataService",
    get: function get() {
      return this._client.metadataService;
    }
  }, {
    key: "_userStoreKey",
    get: function get() {
      return "user:" + this.settings.authority + ":" + this.settings.client_id;
    }
  }]);

  return UserManager;
}();

var Version = "2.0.0-alpha2";

export { AccessTokenEvents, CheckSessionIFrame, InMemoryWebStorage, Log, MetadataService, OidcClient, SessionMonitor, TokenRevocationClient, User, UserManager, Version, WebStorageStateStore };
//# sourceMappingURL=oidc-client-ts.esm.js.map
