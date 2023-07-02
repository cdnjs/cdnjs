/*! indexeddbshim - v12.0.0 - 6/7/2023 */

(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function _defineAccessor(type, obj, key, fn) {
    var desc = {
      configurable: !0,
      enumerable: !0
    };
    return desc[type] = fn, Object.defineProperty(obj, key, desc);
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2$1(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function _typeof$2(obj) {
    "@babel/helpers - typeof";

    return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof$2(obj);
  }
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
  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
    }
  }
  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty$1(obj, key, value) {
    key = _toPropertyKey$1(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
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
      _construct = Reflect.construct.bind();
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
  function _slicedToArray$1(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }
  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey$1(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  function _typeof$1(obj) {
    "@babel/helpers - typeof";

    return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof$1(obj);
  }

  /* eslint-disable n/no-sync -- Want sync naming */
  /* eslint-disable no-restricted-syntax -- Instanceof checks */
  /* eslint-disable unicorn/no-this-assignment -- TS */

  /**
   * @typedef {number} Integer
   */

  /**
   * @callback InvokeCurrentListeners
   * @param {AllListeners} listeners
   * @param {EventWithProps} eventCopy
   * @param {string} type
   * @param {boolean} [checkOnListeners]
   * @returns {boolean}
   */

  /**
   * @typedef {{
   *   defaultSync?: boolean,
   *   extraProperties?: string[],
   *   legacyOutputDidListenersThrowFlag?: boolean
   * }} CustomOptions
   */
  /**
   * @typedef {{
   *   __legacyOutputDidListenersThrowError: unknown,
   *   target: EventTarget & {
   *     invokeCurrentListeners: InvokeCurrentListeners,
   *     _earlyListeners: AllListeners,
   *     _listeners: AllListeners,
   *     _lateListeners: AllListeners,
   *     _defaultListeners: AllListeners
   *   },
   *   composed: boolean,
   *   currentTarget: EventTarget,
   *   eventPhase: 0|1|2|3
   *   defaultPrevented: boolean,
   *   type: string,
   *   bubbles: boolean,
   *   cancelable: boolean,
   *   isTrusted: boolean,
   *   timeStamp: Integer,
   *   initEvent: (type: string, bubbles: boolean, cancelable: boolean) => void,
   *   preventDefault: () => void,
   *   composedPath: () => void,
   *   detail: any,
   *   initCustomEvent: (
   *     type: string, canBubble: boolean, cancelable: boolean,
   *     detail: any
   *   ) => void
   * }} EventWithProps
   */

  // Todo: Switch to ES6 classes

  var phases = {
    NONE: 0,
    CAPTURING_PHASE: 1,
    AT_TARGET: 2,
    BUBBLING_PHASE: 3
  };
  var ShimDOMException$1 = typeof DOMException === 'undefined'
  // Todo: Better polyfill (if even needed here)
  /* eslint-disable no-shadow -- Polyfill */
  // eslint-disable-next-line operator-linebreak -- TS/JSDoc needs
  ?
  /**
   * @param {string} msg
   * @param {string} name
   * @returns {Error}
   */
  function DOMException(msg, name) {
    // No need for `toString` as same as for `Error`
    /* eslint-enable no-shadow -- Polyfill */
    var err = new Error(msg);
    err.name = name;
    return err;
  } : DOMException;
  var ev = new WeakMap();
  var evCfg = new WeakMap();

  // Todo: Set _ev argument outside of this function

  /* eslint-disable func-name-matching -- Shim vs. Polyfill */
  /* eslint-disable no-shadow -- Polyfilling */
  /**
  * We use an adapter class rather than a proxy not only for compatibility
  * but also since we have to clone native event properties anyways in order
  * to properly set `target`, etc.
  * The regular DOM method `dispatchEvent` won't work with this polyfill as
  * it expects a native event.
  * @class
  * @param {string} type
  */
  var ShimEvent = /** @type {unknown} */function Event(type) {
    var _this = this;
    /* eslint-enable func-name-matching -- Shim vs. Polyfill */
    /* eslint-enable no-shadow -- Polyfilling */
    // For WebIDL checks of function's `length`, we check `arguments` for the optional arguments
    // @ts-expect-error
    this[Symbol.toStringTag] = 'Event';
    this.toString = function () {
      return '[object Event]';
    };
    // eslint-disable-next-line prefer-rest-params -- Don't want to change signature
    var _arguments = Array.prototype.slice.call(arguments),
      evInit = _arguments[1],
      _ev = _arguments[2];
    if (!arguments.length) {
      throw new TypeError("Failed to construct 'Event': 1 argument required, but only 0 present.");
    }
    evInit = evInit || {};
    _ev = _ev || {};

    /** @type {EventWithProps} */
    var _evCfg = {};
    if ('composed' in evInit) {
      _evCfg.composed = evInit.composed;
    }

    // _evCfg.isTrusted = true; // We are not always using this for user-created events
    // _evCfg.timeStamp = new Date().valueOf(); // This is no longer a timestamp, but monotonic (elapsed?)

    ev.set(this, _ev);
    evCfg.set(this, _evCfg);
    var that = /** @type {unknown} */this;
    /** @type {ShimEvent} */
    that.initEvent(type, evInit.bubbles, evInit.cancelable);
    ['target', 'currentTarget', 'eventPhase', 'defaultPrevented'].forEach(function (pr) {
      var prop = /** @type {"target"|"currentTarget"|"eventPhase"|"defaultPrevented"} */
      pr;
      Object.defineProperty(_this, prop, {
        get: function get() {
          return (/* prop in _evCfg && */_evCfg[prop] !== undefined ? _evCfg[prop] : prop in _ev ? _ev[prop] :
            // Defaults
            prop === 'eventPhase' ? 0 : prop === 'defaultPrevented' ? false : null
          );
        }
      });
    });
    var props = [
    // Event
    'type', 'bubbles', 'cancelable',
    // Defaults to false
    'isTrusted', 'timeStamp', 'initEvent',
    // Other event properties (not used by our code)
    'composedPath', 'composed'];
    if (this.toString() === '[object CustomEvent]') {
      props.push('detail', 'initCustomEvent');
    }
    Object.defineProperties(this, props.reduce(function (obj, pr) {
      var prop =
      /**
       * @type {"type"|"bubbles"|"cancelable"|"isTrusted"|
       *   "timeStamp"|"initEvent"|"composedPath"|"composed"|
       *   "detail"|"initCustomEvent"
       * }
       */
      pr;
      obj[prop] = {
        get: function get() {
          return prop in _evCfg ? _evCfg[prop] : prop in _ev ? _ev[prop] : ['bubbles', 'cancelable', 'composed'].includes(prop) ? false : undefined;
        }
      };
      return obj;
    }, /** @type {{[key: string]: any}} */{}));
  };

  // @ts-expect-error Casting doesn't work
  ShimEvent.prototype.preventDefault = function () {
    // @ts-expect-error Needed for exporting
    if (!(this instanceof ShimEvent)) {
      throw new TypeError('Illegal invocation');
    }
    var _ev = ev.get(this);
    var _evCfg = evCfg.get(this);
    if (this.cancelable && !_evCfg._passive) {
      _evCfg.defaultPrevented = true;
      if (typeof _ev.preventDefault === 'function') {
        // Prevent any predefined defaults
        _ev.preventDefault();
      }
    }
  };

  // @ts-expect-error Casting doesn't work
  ShimEvent.prototype.stopImmediatePropagation = function () {
    var _evCfg = evCfg.get(this);
    _evCfg._stopImmediatePropagation = true;
  };

  // @ts-expect-error Casting doesn't work
  ShimEvent.prototype.stopPropagation = function () {
    var _evCfg = evCfg.get(this);
    _evCfg._stopPropagation = true;
  };

  // @ts-expect-error Casting doesn't work
  ShimEvent.prototype.initEvent = function (type, bubbles, cancelable) {
    // Chrome currently has function length 1 only but WebIDL says 3
    // const bubbles = arguments[1];
    // const cancelable = arguments[2];
    var _evCfg = evCfg.get(this);
    if (_evCfg._dispatched) {
      return;
    }
    Object.defineProperty(this, 'type', {
      enumerable: true,
      configurable: true,
      get: function get() {
        return type;
      }
    });
    Object.defineProperty(this, 'bubbles', {
      enumerable: true,
      configurable: true,
      get: function get() {
        return bubbles;
      }
    });
    Object.defineProperty(this, 'cancelable', {
      enumerable: true,
      configurable: true,
      get: function get() {
        return cancelable;
      }
    });
    _evCfg.type = type;
    if (bubbles !== undefined) {
      _evCfg.bubbles = bubbles;
    }
    if (cancelable !== undefined) {
      _evCfg.cancelable = cancelable;
    }
  };
  ['type', 'target', 'currentTarget'].forEach(function (prop) {
    // @ts-expect-error Casting doesn't work
    Object.defineProperty(ShimEvent.prototype, prop, {
      enumerable: true,
      configurable: true,
      get: function get() {
        throw new TypeError('Illegal invocation');
      }
    });
  });
  ['eventPhase', 'defaultPrevented', 'bubbles', 'cancelable', 'timeStamp'].forEach(function (prop) {
    // @ts-expect-error Casting doesn't work
    Object.defineProperty(ShimEvent.prototype, prop, {
      enumerable: true,
      configurable: true,
      get: function get() {
        throw new TypeError('Illegal invocation');
      }
    });
  });
  ['NONE', 'CAPTURING_PHASE', 'AT_TARGET', 'BUBBLING_PHASE'].forEach(function (prop, i) {
    Object.defineProperty(ShimEvent, prop, {
      enumerable: true,
      writable: false,
      value: i
    });
    // @ts-expect-error Casting doesn't work
    Object.defineProperty(ShimEvent.prototype, prop, {
      writable: false,
      value: i
    });
  });
  // @ts-expect-error Casting doesn't work
  ShimEvent[Symbol.toStringTag] = 'Function';

  // @ts-expect-error Casting doesn't work
  ShimEvent.prototype[Symbol.toStringTag] = 'EventPrototype';
  Object.defineProperty(ShimEvent, 'prototype', {
    writable: false
  });

  /* eslint-disable func-name-matching -- Polyfill */
  /* eslint-disable no-shadow -- Polyfill */
  /**
   * @class
   * @param {string} type
   */
  var ShimCustomEvent = /** @type {unknown} */function CustomEvent(type) {
    /* eslint-enable func-name-matching -- Polyfill */
    /* eslint-enable no-shadow -- Polyfill */

    // eslint-disable-next-line prefer-rest-params -- Keep signature
    var _arguments2 = Array.prototype.slice.call(arguments),
      evInit = _arguments2[1],
      _ev = _arguments2[2];
    // @ts-expect-error Casting doesn't work
    ShimEvent.call(this, type, evInit, _ev);
    // @ts-expect-error
    this[Symbol.toStringTag] = 'CustomEvent';
    this.toString = function () {
      return '[object CustomEvent]';
    };
    // var _evCfg = evCfg.get(this);
    evInit = evInit || {};
    // @ts-ignore
    this.initCustomEvent(type, evInit.bubbles, evInit.cancelable, 'detail' in evInit ? evInit.detail : null);
  };
  // @ts-expect-error Casting doesn't work
  Object.defineProperty(ShimCustomEvent.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: ShimCustomEvent
  });
  // @ts-expect-error Casting doesn't work
  ShimCustomEvent.prototype.initCustomEvent = function (type, bubbles, cancelable, detail) {
    // @ts-expect-error Needed for exporting
    if (!(this instanceof ShimCustomEvent)) {
      throw new TypeError('Illegal invocation');
    }
    var _evCfg = evCfg.get(this);
    // @ts-expect-error Casting doesn't work
    ShimCustomEvent.call(this, type, {
      bubbles: bubbles,
      cancelable: cancelable,
      detail: detail
      // eslint-disable-next-line prefer-rest-params -- Keep signature
    }, arguments[4]);
    if (_evCfg._dispatched) {
      return;
    }
    if (detail !== undefined) {
      _evCfg.detail = detail;
    }
    Object.defineProperty(this, 'detail', {
      get: function get() {
        return _evCfg.detail;
      }
    });
  };
  // @ts-expect-error Casting doesn't work
  ShimCustomEvent[Symbol.toStringTag] = 'Function';
  // @ts-expect-error Casting doesn't work
  ShimCustomEvent.prototype[Symbol.toStringTag] = 'CustomEventPrototype';

  // @ts-expect-error Casting doesn't work
  Object.defineProperty(ShimCustomEvent.prototype, 'detail', {
    enumerable: true,
    configurable: true,
    get: function get() {
      throw new TypeError('Illegal invocation');
    }
  });
  Object.defineProperty(ShimCustomEvent, 'prototype', {
    writable: false
  });

  /**
   *
   * @param {EventWithProps} e
   * @returns {EventWithProps}
   */
  function copyEvent(e) {
    var bubbles = e.bubbles,
      cancelable = e.cancelable,
      detail = e.detail,
      type = e.type;
    if ('detail' in e) {
      // @ts-expect-error Casting doesn't work
      return new ShimCustomEvent(type, {
        bubbles: bubbles,
        cancelable: cancelable,
        detail: detail
      }, e);
    }
    // @ts-expect-error Casting doesn't work
    return new ShimEvent(type, {
      bubbles: bubbles,
      cancelable: cancelable
    }, e);
  }

  /**
  * @typedef {object} ListenerOptions
  * @property {boolean} [once] Remove listener after invoking once
  * @property {boolean} [passive] Don't allow `preventDefault`
  * @property {boolean} [capture] Use `_children` and set `eventPhase`
  */

  /**
  * @typedef {object} ListenerAndOptions
  * @property {Listener} listener
  * @property {ListenerOptions} options
  */

  /**
  * @typedef {object} ListenerInfo
  * @property {ListenerAndOptions[]} listenersByTypeOptions
  * @property {ListenerOptions} options
  * @property {ListenerAndOptions[]} listenersByType
  */

  /**
  * @callback Listener
  * @param {EventWithProps} e
  * @returns {boolean}
  */

  /**
   * Keys are event types.
   * @typedef {{[key: string]: Listener[]}} Listeners
   */

  /**
   * @typedef {{
   *   [type: string]: ListenerAndOptions[]
   * }} AllListeners
   */

  /**
   *
   * @param {AllListeners} listeners
   * @param {string} type
   * @param {boolean|ListenerOptions} options
   * @returns {ListenerInfo}
   */
  function getListenersOptions(listeners, type, options) {
    var listenersByType = listeners[type];
    if (listenersByType === undefined) listeners[type] = listenersByType = [];
    var opts = typeof options === 'boolean' ? {
      capture: options
    } : options || {};
    var stringifiedOptions = JSON.stringify(opts);
    var listenersByTypeOptions = listenersByType.filter(function (obj) {
      return stringifiedOptions === JSON.stringify(obj.options);
    });
    return {
      listenersByTypeOptions: listenersByTypeOptions,
      options: opts,
      listenersByType: listenersByType
    };
  }
  var methods = {
    /**
     * @param {AllListeners} listeners
     * @param {Listener} listener
     * @param {string} type
     * @param {boolean|ListenerOptions} options
     * @returns {void}
     */
    addListener: function addListener(listeners, listener, type, options) {
      var listenersOptions = getListenersOptions(listeners, type, options);
      var listenersByTypeOptions = listenersOptions.listenersByTypeOptions;
      options = listenersOptions.options;
      var listenersByType = listenersOptions.listenersByType;
      if (listenersByTypeOptions.some(function (l) {
        return l.listener === listener;
      })) return;
      listenersByType.push({
        listener: listener,
        options: options
      });
    },
    /**
     * @param {AllListeners} listeners
     * @param {Listener} listener
     * @param {string} type
     * @param {boolean|ListenerOptions} options
     * @returns {void}
     */
    removeListener: function removeListener(listeners, listener, type, options) {
      var listenersOptions = getListenersOptions(listeners, type, options);
      var listenersByType = listenersOptions.listenersByType;
      var stringifiedOptions = JSON.stringify(listenersOptions.options);
      listenersByType.some(function (l, i) {
        if (l.listener === listener && stringifiedOptions === JSON.stringify(l.options)) {
          listenersByType.splice(i, 1);
          if (!listenersByType.length) delete listeners[type];
          return true;
        }
        return false;
      });
    },
    /**
     *
     * @param {AllListeners} listeners
     * @param {Listener} listener
     * @param {string} type
     * @param {boolean|ListenerOptions} options
     * @returns {boolean}
     */
    hasListener: function hasListener(listeners, listener, type, options) {
      var listenersOptions = getListenersOptions(listeners, type, options);
      var listenersByTypeOptions = listenersOptions.listenersByTypeOptions;
      return listenersByTypeOptions.some(function (l) {
        return l.listener === listener;
      });
    }
  };

  /* eslint-disable no-shadow -- Polyfill */
  /**
   * @class
   */
  function EventTarget() {
    /* eslint-enable no-shadow -- Polyfill */
    throw new TypeError('Illegal constructor');
  }

  /**
   * @typedef {"addEarlyEventListener"|"removeEarlyEventListener"|"hasEarlyEventListener"|
   *   "addEventListener"|"removeEventListener"|"hasEventListener"|
   *   "addLateEventListener"|"removeLateEventListener"|"hasLateEventListener"|
   *   "addDefaultEventListener"|"removeDefaultEventListener"|"hasDefaultEventListener"
   * } ListenerName
   */
  Object.assign(EventTarget.prototype, ['Early', '', 'Late', 'Default'].reduce(function ( /** @type {{[key: string]: Function}} */
  obj, listenerType) {
    ['add', 'remove', 'has'].forEach(function (method) {
      var mainMethod = /** @type {ListenerName} */method + listenerType + 'EventListener';
      /**
       * @param {string} type
       * @param {Listener|{handleEvent: Listener}} listener
       * @this {EventTarget & {
       *   _earlyListeners: AllListeners,
       *   _listeners: AllListeners,
       *   _lateListeners: AllListeners,
       *   _defaultListeners: AllListeners,
       * }}
       * @returns {boolean|void}
       */
      obj[mainMethod] = function (type, listener) {
        // eslint-disable-next-line prefer-rest-params -- Keep signature
        var options = arguments[2]; // We keep the listener `length` as per WebIDL
        if (arguments.length < 2) throw new TypeError('2 or more arguments required');
        if (typeof type !== 'string') {
          // @ts-expect-error It's ok to construct
          throw new ShimDOMException$1('UNSPECIFIED_EVENT_TYPE_ERR', 'UNSPECIFIED_EVENT_TYPE_ERR');
        }
        try {
          // As per code such as the following, handleEvent may throw,
          //  but is uncaught
          // https://github.com/web-platform-tests/wpt/blob/master/IndexedDB/fire-error-event-exception.html#L54-L56
          if ('handleEvent' in listener && listener.handleEvent.bind) {
            listener = listener.handleEvent.bind(listener);
          }
        } catch (err) {
          // eslint-disable-next-line no-console -- Feedback to user
          console.log('Uncaught `handleEvent` error', err);
        }
        var arrStr = /** @type {"_earlyListeners"|"_listeners"|"_lateListeners"|"_defaultListeners"} */
        '_' + listenerType.toLowerCase() + (listenerType === '' ? 'l' : 'L') + 'isteners';
        if (!this[arrStr]) {
          Object.defineProperty(this, arrStr, {
            value: {}
          });
        }
        var meth = /** @type {"addListener"|"removeListener"|"hasListener"} */
        method + 'Listener';
        return methods[meth](this[arrStr], /** @type {Listener} */listener, type, options);
      };
    });
    return obj;
  }, {}));
  Object.assign(EventTarget.prototype, {
    _legacyOutputDidListenersThrowCheck: undefined,
    /**
     * @param {CustomOptions} customOptions
     * @this {EventTarget.prototype}
     * @returns {void}
     */
    __setOptions: function __setOptions(customOptions) {
      customOptions = customOptions || {};
      // Todo: Make into event properties?
      this._defaultSync = customOptions.defaultSync;
      this._extraProperties = customOptions.extraProperties || [];
      if (customOptions.legacyOutputDidListenersThrowFlag) {
        // IndexedDB
        this._legacyOutputDidListenersThrowCheck = true;
        this._extraProperties.push('__legacyOutputDidListenersThrowError');
      }
    },
    /**
     * @param {ShimEvent} e
     * @this {EventTarget & {
     *   _dispatchEvent: (e: ShimEvent|ShimCustomEvent, setTarget: boolean) => boolean,
    * }}
     * @returns {boolean}
     */
    dispatchEvent: function dispatchEvent(e) {
      return this._dispatchEvent(e, true);
    },
    /**
     * @param {EventWithProps} e
     * @param {boolean} setTarget
     * @this {EventTarget.prototype & {
     *   _earlyListeners: AllListeners,
     *   _listeners: AllListeners,
     *   _lateListeners: AllListeners,
     *   _defaultListeners: AllListeners,
     * }}
     * @returns {boolean}
     */
    _dispatchEvent: function _dispatchEvent(e, setTarget) {
      var _this2 = this;
      ['early', '', 'late', 'default'].forEach(function (listenerType) {
        var arrStr = /** @type {"_earlyListeners"|"_listeners"|"_lateListeners"|"_defaultListeners"} */
        '_' + listenerType + (listenerType === '' ? 'l' : 'L') + 'isteners';
        if (!_this2[arrStr]) {
          Object.defineProperty(_this2, arrStr, {
            value: {}
          });
        }
      });
      var _evCfg = evCfg.get(e);
      if (_evCfg && setTarget && _evCfg._dispatched) {
        // @ts-expect-error It's ok to construct
        throw new ShimDOMException$1('The object is in an invalid state.', 'InvalidStateError');
      }

      /** @type {EventWithProps} */
      var eventCopy;
      if (_evCfg) {
        eventCopy = e;
      } else {
        eventCopy = copyEvent(e);
        _evCfg = evCfg.get(eventCopy);
        _evCfg._dispatched = true;

        /** @type {string[]} */
        this._extraProperties.forEach(function (prop) {
          if (prop in e) {
            /** @type {{[key: string]: any}} */eventCopy[prop] = /** @type {{[key: string]: any}} */e[prop]; // Todo: Put internal to `ShimEvent`?
          }
        });
      }

      var _eventCopy = eventCopy,
        type = _eventCopy.type;

      /**
       *
       * @returns {void}
       */
      function finishEventDispatch() {
        _evCfg.eventPhase = phases.NONE;
        _evCfg.currentTarget = null;
        delete _evCfg._children;
      }
      /**
       *
       * @returns {void}
       */
      function invokeDefaults() {
        // Ignore stopPropagation from defaults
        _evCfg._stopImmediatePropagation = undefined;
        _evCfg._stopPropagation = undefined;
        // We check here for whether we should invoke since may have changed since timeout (if late listener prevented default)
        if (!eventCopy.defaultPrevented || !_evCfg.cancelable) {
          // 2nd check should be redundant
          _evCfg.eventPhase = phases.AT_TARGET; // Temporarily set before we invoke default listeners
          eventCopy.target.invokeCurrentListeners(eventCopy.target._defaultListeners, eventCopy, type);
        }
        finishEventDispatch();
      }
      var continueEventDispatch = function continueEventDispatch() {
        // Ignore stop propagation of user now
        _evCfg._stopImmediatePropagation = undefined;
        _evCfg._stopPropagation = undefined;
        if (!_this2._defaultSync) {
          setTimeout(invokeDefaults, 0);
        } else invokeDefaults();
        _evCfg.eventPhase = phases.AT_TARGET; // Temporarily set before we invoke late listeners
        // Sync default might have stopped
        if (!_evCfg._stopPropagation) {
          _evCfg._stopImmediatePropagation = undefined;
          _evCfg._stopPropagation = undefined;
          // We could allow stopPropagation by only executing upon (_evCfg._stopPropagation)
          eventCopy.target.invokeCurrentListeners(eventCopy.target._lateListeners, eventCopy, type);
        }
        finishEventDispatch();
        return !eventCopy.defaultPrevented;
      };
      if (setTarget) _evCfg.target = this;
      switch ('eventPhase' in eventCopy && eventCopy.eventPhase) {
        case phases.CAPTURING_PHASE:
          {
            if (_evCfg._stopPropagation) {
              return continueEventDispatch();
            }
            this.invokeCurrentListeners(this._listeners, eventCopy, type);
            var child = _evCfg._children && _evCfg._children.length && _evCfg._children.pop();
            if (!child || child === eventCopy.target) {
              _evCfg.eventPhase = phases.AT_TARGET;
            }
            if (child) child._defaultSync = this._defaultSync;
            return (child || this)._dispatchEvent(eventCopy, false);
          }
        case phases.AT_TARGET:
          if (_evCfg._stopPropagation) {
            return continueEventDispatch();
          }
          this.invokeCurrentListeners(this._listeners, eventCopy, type, true);
          if (!_evCfg.bubbles) {
            return continueEventDispatch();
          }
          _evCfg.eventPhase = phases.BUBBLING_PHASE;
          return this._dispatchEvent(eventCopy, false);
        case phases.BUBBLING_PHASE:
          {
            if (_evCfg._stopPropagation) {
              return continueEventDispatch();
            }
            var parent = this.__getParent && this.__getParent();
            if (!parent) {
              return continueEventDispatch();
            }
            parent.invokeCurrentListeners(parent._listeners, eventCopy, type, true);
            parent._defaultSync = this._defaultSync;
            return parent._dispatchEvent(eventCopy, false);
          }
        case phases.NONE:
        default:
          {
            _evCfg.eventPhase = phases.AT_TARGET; // Temporarily set before we invoke early listeners
            this.invokeCurrentListeners(this._earlyListeners, eventCopy, type);
            if (!('__getParent' in this)) {
              _evCfg.eventPhase = phases.AT_TARGET;
              return this._dispatchEvent(eventCopy, false);
            }

            /* eslint-disable consistent-this -- Readability */
            var par = this;
            var root_ = this;
            /* eslint-enable consistent-this -- Readability */
            while (par.__getParent && (par = par.__getParent()) !== null) {
              if (!_evCfg._children) {
                _evCfg._children = [];
              }
              _evCfg._children.push(root_);
              root_ = par;
            }
            root_._defaultSync = this._defaultSync;
            _evCfg.eventPhase = phases.CAPTURING_PHASE;
            return root_._dispatchEvent(eventCopy, false);
          }
      }
    },
    /**
     * @type {InvokeCurrentListeners}
     * @this {EventTarget.prototype & {[key: string]: Listener}}
     */
    invokeCurrentListeners: function invokeCurrentListeners(listeners, eventCopy, type, checkOnListeners) {
      var _this3 = this;
      var _evCfg = evCfg.get(eventCopy);
      _evCfg.currentTarget = this;
      var listOpts = getListenersOptions(listeners, type, {});
      // eslint-disable-next-line unicorn/prefer-spread -- Performance?
      var listenersByType = listOpts.listenersByType.concat();
      var dummyIPos = listenersByType.length ? 1 : 0;
      listenersByType.some(function (listenerObj, i) {
        var onListener = checkOnListeners ? _this3['on' + type] : null;
        if (_evCfg._stopImmediatePropagation) return true;
        if (i === dummyIPos && typeof onListener === 'function') {
          // We don't splice this in as could be overwritten; executes here per
          //    https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-attributes:event-handlers-14
          _this3.tryCatch(eventCopy, function () {
            var ret = onListener.call(eventCopy.currentTarget, eventCopy);
            if (ret === false) {
              eventCopy.preventDefault();
            }
          });
        }
        var options = listenerObj.options;
        var once = options.once,
          passive = options.passive,
          capture = options.capture;
        _evCfg._passive = passive;
        if (capture && eventCopy.target !== eventCopy.currentTarget && eventCopy.eventPhase === phases.CAPTURING_PHASE || eventCopy.eventPhase === phases.AT_TARGET || !capture && eventCopy.target !== eventCopy.currentTarget && eventCopy.eventPhase === phases.BUBBLING_PHASE) {
          var listener = listenerObj.listener;
          _this3.tryCatch(eventCopy, function () {
            listener.call(eventCopy.currentTarget, eventCopy);
          });
          if (once) {
            _this3.removeEventListener(type, listener, options);
          }
        }
        return false;
      });
      this.tryCatch(eventCopy, function () {
        var onListener = checkOnListeners ? _this3['on' + type] : null;
        if (typeof onListener === 'function' && listenersByType.length < 2) {
          var ret = onListener.call(eventCopy.currentTarget, eventCopy); // Won't have executed if too short
          if (ret === false) {
            eventCopy.preventDefault();
          }
        }
      });
      return !eventCopy.defaultPrevented;
    },
    /* eslint-disable promise/prefer-await-to-callbacks -- Try-catch */
    /**
     * @param {EventWithProps} evt
     * @param {() => void} cb
     * @returns {void}
     */
    tryCatch: function tryCatch(evt, cb) {
      /* eslint-enable promise/prefer-await-to-callbacks -- Try-catch */
      try {
        // Per MDN: Exceptions thrown by event handlers are reported
        //    as uncaught exceptions; the event handlers run on a nested
        //    callstack: they block the caller until they complete, but
        //    exceptions do not propagate to the caller.
        // eslint-disable-next-line promise/prefer-await-to-callbacks, n/callback-return --  Try-catch
        cb();
      } catch (err) {
        this.triggerErrorEvent(err, evt);
      }
    },
    /**
     * @param {unknown} err
     * @param {EventWithProps} evt
     * @returns {void}
     */
    triggerErrorEvent: function triggerErrorEvent(err, evt) {
      var error = err;
      if (typeof err === 'string') {
        error = new Error('Uncaught exception: ' + err);
      }
      var triggerGlobalErrorEvent;
      var useNodeImpl = false;
      if (typeof window === 'undefined' || typeof ErrorEvent === 'undefined' || window && (typeof window === "undefined" ? "undefined" : _typeof$1(window)) === 'object' && !window.dispatchEvent) {
        useNodeImpl = true;
        triggerGlobalErrorEvent = function triggerGlobalErrorEvent() {
          setTimeout(function () {
            // Node won't be able to catch in this way if we throw in the main thread
            // console.log(err); // Should we auto-log for user?
            throw error; // Let user listen to `process.on('uncaughtException', (err) => {});`
          });
        };
      } else {
        triggerGlobalErrorEvent = function triggerGlobalErrorEvent() {
          // See https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
          //     and https://github.com/w3c/IndexedDB/issues/49

          // Note that a regular Event will properly trigger
          //     `window.addEventListener('error')` handlers, but it will not trigger
          //     `window.onerror` as per https://html.spec.whatwg.org/multipage/webappapis.html#handler-onerror
          // Note also that the following line won't handle `window.addEventListener` handlers
          //        if (window.onerror) window.onerror(error.message, err.fileName, err.lineNumber, error.columnNumber, error);

          // `ErrorEvent` properly triggers `window.onerror` and `window.addEventListener('error')` handlers
          var errEv = new ErrorEvent('error', {
            error: err,
            message: /** @type {Error} */error.message || '',
            // We can't get the actually useful user's values!
            filename: /** @type {Error & {fileName: string}} */error.fileName || '',
            lineno: /** @type {Error & {lineNumber: Integer}} */error.lineNumber || 0,
            colno: /** @type {Error & {columnNumber: Integer}} */error.columnNumber || 0
          });
          window.dispatchEvent(errEv);
          // console.log(err); // Should we auto-log for user?
        };
      }

      // Todo: This really should always run here but as we can't set the global
      //     `window` (e.g., using jsdom) since `setGlobalVars` becomes unable to
      //     shim `indexedDB` in such a case currently (apparently due to
      //     <https://github.com/axemclion/IndexedDBShim/issues/280>), we can't
      //     avoid the above Node implementation (which, while providing some
      //     fallback mechanism, is unstable)
      if (!useNodeImpl || !this._legacyOutputDidListenersThrowCheck) triggerGlobalErrorEvent();

      // See https://dom.spec.whatwg.org/#concept-event-listener-inner-invoke and
      //    https://github.com/w3c/IndexedDB/issues/140 (also https://github.com/w3c/IndexedDB/issues/49 )
      if (this._legacyOutputDidListenersThrowCheck) {
        evt.__legacyOutputDidListenersThrowError = error;
      }
    }
  });
  EventTarget.prototype[Symbol.toStringTag] = 'EventTargetPrototype';
  Object.defineProperty(EventTarget, 'prototype', {
    writable: false
  });
  var ShimEventTarget = EventTarget;
  var EventTargetFactory = {
    /**
     * @param {CustomOptions} customOptions
     * @returns {EventTarget}
     */
    createInstance: function createInstance(customOptions) {
      /* eslint-disable func-name-matching -- Shim vs. Polyfill */
      /* eslint-disable no-shadow -- Polyfill */
      /**
       * @class
       * @this {typeof ShimEventTarget.prototype}
       */
      var ET = /** @type {unknown} */function EventTarget() {
        /* eslint-enable no-shadow -- Polyfill */
        /* eslint-enable func-name-matching -- Shim vs. Polyfill */
        this.__setOptions(customOptions);
      };
      // @ts-expect-error Casting doesn't work
      ET.prototype = ShimEventTarget.prototype;
      // @ts-expect-error Casting doesn't work
      return new ET();
    }
  };
  EventTarget.ShimEvent = ShimEvent;
  EventTarget.ShimCustomEvent = ShimCustomEvent;
  EventTarget.ShimDOMException = ShimDOMException$1;
  EventTarget.ShimEventTarget = EventTarget;
  EventTarget.EventTargetFactory = EventTargetFactory;

  /**
   * @returns {void}
   */
  function setPrototypeOfCustomEvent() {
    // TODO: IDL needs but reported as slow!
    Object.setPrototypeOf(ShimCustomEvent, /** @type {object} */ShimEvent);
    // @ts-expect-error How to overcome?
    Object.setPrototypeOf(ShimCustomEvent.prototype, ShimEvent.prototype);
  }

  /* eslint-disable jsdoc/valid-types -- https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser/issues/147 */
  /**
   * @typedef {T[keyof T]} ValueOf<T>
   * @template T
   */
  /* eslint-enable jsdoc/valid-types -- https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser/issues/147 */

  /**
   * @typedef {{unlink: (path: string, cb: import('fs').NoParamCallback) => void}} FSApi
   */

  /**
   * @typedef {{
   *   DEBUG: boolean,
   *   cacheDatabaseInstances: boolean,
   *   autoName: boolean,
   *   fullIDLSupport: boolean,
   *   checkOrigin: boolean,
   *   cursorPreloadPackSize: number,
   *   UnicodeIDStart: string,
   *   UnicodeIDContinue: string,
   *   registerSCA: (
   *     preset: import('typeson').Preset
   *   ) => import('typeson').Preset,
   *   avoidAutoShim: boolean,
   *   win: {
   *     openDatabase: (name: string, version: string, displayName: string, estimatedSize: number) => import('websql-configurable').default
   *   },
   *   DEFAULT_DB_SIZE: number,
   *   useSQLiteIndexes: boolean,
   *   fs: FSApi,
   *   addNonIDBGlobals: boolean,
   *   replaceNonIDBGlobals: boolean,
   *   escapeDatabaseName: (name: string) => string,
   *   unescapeDatabaseName: (name: string) => string,
   *   databaseCharacterEscapeList: string|false,
   *   databaseNameLengthLimit: number|false,
   *   escapeNFDForDatabaseNames: boolean,
   *   addSQLiteExtension: boolean,
   *   memoryDatabase: string,
   *   deleteDatabaseFiles: boolean,
   *   databaseBasePath: string,
   *   sysDatabaseBasePath: string,
   *   sqlBusyTimeout: number,
   *   sqlTrace: () => void,
   *   sqlProfile: () => void,
   *   createIndexes: boolean
   * }} ConfigValues
   */

  /**
   * @typedef {ValueOf<ConfigValues>} ConfigValue
   */

  /** @type {{[key: string]: ConfigValue}} */
  var map = {};
  var CFG = /** @type {ConfigValues} */{};

  /**
   * @typedef {keyof ConfigValues} KeyofConfigValues
   */

  /**
   * @typedef {KeyofConfigValues[]} Config
   */

  /** @type {Config} */
  [
  // Boolean for verbose reporting
  'DEBUG',
  // Effectively defaults to false (ignored unless `true`)

  // Boolean (effectively defaults to true) on whether to cache WebSQL
  //  `openDatabase` instances
  'cacheDatabaseInstances',
  // Boolean on whether to auto-name databases (based on an
  //   auto-increment) when the empty string is supplied; useful with
  //   `memoryDatabase`; defaults to `false` which means the empty string
  //   will be used as the (valid) database name
  'autoName',
  // Determines whether the slow-performing `Object.setPrototypeOf`
  //    calls required for full WebIDL compliance will be used. Probably
  //    only needed for testing or environments where full introspection
  //    on class relationships is required; see
  //    http://stackoverflow.com/questions/41927589/rationales-consequences-of-webidl-class-inheritance-requirements
  'fullIDLSupport',
  // Effectively defaults to false (ignored unless `true`)

  // Boolean on whether to perform origin checks in `IDBFactory` methods
  // Effectively defaults to `true` (must be set to `false` to cancel checks)
  'checkOrigin',
  // Used by `IDBCursor` continue methods for number of records to cache;
  //  Defaults to 100
  'cursorPreloadPackSize',
  // See optional API (`shimIndexedDB.__setUnicodeIdentifiers`);
  //    or just use the Unicode builds which invoke this method
  //    automatically using the large, fully spec-compliant, regular
  //    expression strings of `src/UnicodeIdentifiers.js`)
  // In the non-Unicode builds, defaults to /[$A-Z_a-z]/
  'UnicodeIDStart',
  // In the non-Unicode builds, defaults to /[$0-9A-Z_a-z]/
  'UnicodeIDContinue',
  // Used by SCA.js for optional restructuring of typeson-registry
  //   Structured Cloning Algorithm; should only be needed for ensuring data
  //   created in 3.* versions of IndexedDBShim continue to work; see the
  //   library `typeson-registry-sca-reverter` to get a function to do this
  'registerSCA',
  // BROWSER-SPECIFIC CONFIG
  'avoidAutoShim',
  // Where WebSQL is detected but where `indexedDB` is
  //    missing or poor support is known (non-Chrome Android or
  //    non-Safari iOS9), the shim will be auto-applied without
  //   `shimIndexedDB.__useShim()`. Set this to `true` to avoid forcing
  //    the shim for such cases.

  // -----------SQL CONFIG----------
  // Object (`window` in the browser) on which there may be an
  //  `openDatabase` method (if any) for WebSQL. (The browser
  //  throws if attempting to call `openDatabase` without the window
  //  so this is why the config doesn't just allow the function.)
  // Defaults to `window` or `self` in browser builds or
  //  a singleton object with the `openDatabase` method set to
  //  the "websql" package in Node.
  'win',
  // For internal `openDatabase` calls made by `IDBFactory` methods;
  //  per the WebSQL spec, "User agents are expected to use the display name
  //  and the estimated database size to optimize the user experience.
  //  For example, a user agent could use the estimated size to suggest an
  //  initial quota to the user. This allows a site that is aware that it
  //  will try to use hundreds of megabytes to declare this upfront, instead
  //  of the user agent prompting the user for permission to increase the
  //  quota every five megabytes."
  // Defaults to (4 * 1024 * 1024) or (25 * 1024 * 1024) in Safari
  'DEFAULT_DB_SIZE',
  // Whether to create indexes on SQLite tables (and also whether to try
  //   dropping)
  // Effectively defaults to `false` (ignored unless `true`)
  'useSQLiteIndexes',
  // NODE-IMPINGING SETTINGS (created for sake of limitations in Node
  //    or desktop file system implementation but applied by default in
  //    browser for parity)

  // File system module with `unlink` to remove deleted database files
  'fs',
  // Used when setting global shims to determine whether to try to add
  //   other globals shimmed by the library (`ShimDOMException`,
  //   `ShimDOMStringList`, `ShimEvent`, `ShimCustomEvent`, `ShimEventTarget`)
  // Effectively defaults to `false` (ignored unless `true`)
  'addNonIDBGlobals',
  // Used when setting global shims to determine whether to try to overwrite
  //   other globals shimmed by the library (`DOMException`, `DOMStringList`,
  //   `Event`, `CustomEvent`, `EventTarget`)
  // Effectively defaults to `false` (ignored unless `true`)
  'replaceNonIDBGlobals',
  // Overcoming limitations with node-sqlite3/storing database name on
  //   file systems
  // https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words
  // Defaults to prefixing database with `D_`, escaping
  //   `databaseCharacterEscapeList`, escaping NUL, and
  //   escaping upper case letters, as well as enforcing
  //   `databaseNameLengthLimit`
  'escapeDatabaseName',
  // Not used internally; usable as a convenience method
  'unescapeDatabaseName',
  // Defaults to global regex representing the following
  //   (characters nevertheless commonly reserved in modern,
  //   Unicode-supporting systems): 0x00-0x1F 0x7F " * / : < > ? \ |
  'databaseCharacterEscapeList',
  // Defaults to 254 (shortest typical modern file length limit)
  'databaseNameLengthLimit',
  // Boolean defaulting to true on whether to escape NFD-escaping
  //   characters to avoid clashes on MacOS which performs NFD on files
  'escapeNFDForDatabaseNames',
  // Boolean on whether to add the `.sqlite` extension to file names;
  //   defaults to `true`
  'addSQLiteExtension',
  // Various types of in-memory databases that can auto-delete
  ['memoryDatabase',
  /**
   * @param {string} val
   * @throws {TypeError}
   * @returns {void}
   */
  function (val) {
    if (!/^(?::memory:|file::memory:(\?(?:[\0-"\$-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?(#(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?)?$/.test( /** @type {string} */val)) {
      throw new TypeError('`memoryDatabase` must be the empty string, ":memory:", or a ' + '"file::memory:[?queryString][#hash] URL".');
    }
  }],
  // NODE-SPECIFIC CONFIG
  // Boolean on whether to delete the database file itself after
  //   `deleteDatabase`; defaults to `true` as the database will be empty
  'deleteDatabaseFiles', 'databaseBasePath', 'sysDatabaseBasePath',
  // NODE-SPECIFIC WEBSQL CONFIG
  'sqlBusyTimeout',
  // Defaults to 1000
  'sqlTrace',
  // Callback not used by default
  'sqlProfile',
  // Callback not used by default

  'createIndexes'].forEach(function (prop) {
    /** @type {(val: any) => void} */
    var validator;
    if (Array.isArray(prop)) {
      var _prop = prop;
      var _prop2 = _slicedToArray$1(_prop, 2);
      prop = _prop2[0];
      validator = _prop2[1];
    }
    Object.defineProperty(CFG, prop, {
      get: function get() {
        return map[prop];
      },
      set: function set(val) {
        if (validator) {
          validator(val);
        }
        map[prop] = val;
      }
    });
  });

  // @ts-nocheck

  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }
  var regex = /[\xC0-\xC5\xC7-\xCF\xD1-\xD6\xD9-\xDD\xE0-\xE5\xE7-\xEF\xF1-\xF6\xF9-\xFD\xFF-\u010F\u0112-\u0125\u0128-\u0130\u0134-\u0137\u0139-\u013E\u0143-\u0148\u014C-\u0151\u0154-\u0165\u0168-\u017E\u01A0\u01A1\u01AF\u01B0\u01CD-\u01DC\u01DE-\u01E3\u01E6-\u01F0\u01F4\u01F5\u01F8-\u021B\u021E\u021F\u0226-\u0233\u0344\u0385\u0386\u0388-\u038A\u038C\u038E-\u0390\u03AA-\u03B0\u03CA-\u03CE\u03D3\u03D4\u0400\u0401\u0403\u0407\u040C-\u040E\u0419\u0439\u0450\u0451\u0453\u0457\u045C-\u045E\u0476\u0477\u04C1\u04C2\u04D0-\u04D3\u04D6\u04D7\u04DA-\u04DF\u04E2-\u04E7\u04EA-\u04F5\u04F8\u04F9\u0622-\u0626\u06C0\u06C2\u06D3\u0929\u0931\u0934\u0958-\u095F\u09CB\u09CC\u09DC\u09DD\u09DF\u0A33\u0A36\u0A59-\u0A5B\u0A5E\u0B48\u0B4B\u0B4C\u0B5C\u0B5D\u0B94\u0BCA-\u0BCC\u0C48\u0CC0\u0CC7\u0CC8\u0CCA\u0CCB\u0D4A-\u0D4C\u0DDA\u0DDC-\u0DDE\u0F43\u0F4D\u0F52\u0F57\u0F5C\u0F69\u0F73\u0F75\u0F76\u0F78\u0F81\u0F93\u0F9D\u0FA2\u0FA7\u0FAC\u0FB9\u1026\u1B06\u1B08\u1B0A\u1B0C\u1B0E\u1B12\u1B3B\u1B3D\u1B40\u1B41\u1B43\u1E00-\u1E99\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FC1-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEE\u1FF2-\u1FF4\u1FF6-\u1FFC\u212B\u219A\u219B\u21AE\u21CD-\u21CF\u2204\u2209\u220C\u2224\u2226\u2241\u2244\u2247\u2249\u2260\u2262\u226D-\u2271\u2274\u2275\u2278\u2279\u2280\u2281\u2284\u2285\u2288\u2289\u22AC-\u22AF\u22E0-\u22E3\u22EA-\u22ED\u2ADC\u304C\u304E\u3050\u3052\u3054\u3056\u3058\u305A\u305C\u305E\u3060\u3062\u3065\u3067\u3069\u3070\u3071\u3073\u3074\u3076\u3077\u3079\u307A\u307C\u307D\u3094\u309E\u30AC\u30AE\u30B0\u30B2\u30B4\u30B6\u30B8\u30BA\u30BC\u30BE\u30C0\u30C2\u30C5\u30C7\u30C9\u30D0\u30D1\u30D3\u30D4\u30D6\u30D7\u30D9\u30DA\u30DC\u30DD\u30F4\u30F7-\u30FA\u30FE\uAC00-\uD7A3\uFB1D\uFB1F\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4E]|\uD804[\uDC9A\uDC9C\uDCAB\uDD2E\uDD2F\uDF4B\uDF4C]|\uD805[\uDCBB\uDCBC\uDCBE\uDDBA\uDDBB]|\uD806\uDD38|\uD834[\uDD5E-\uDD64\uDDBB-\uDDC0]/;
  var regex$1 = /*@__PURE__*/getDefaultExportFromCjs(regex);

  /**
   * @typedef {number} Integer
   */

  /**
   * @param {string} arg
   * @returns {string}
   */
  function escapeUnmatchedSurrogates(arg) {
    // http://stackoverflow.com/a/6701665/271577
    return arg.replaceAll(/((?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])))(?!(?:(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))|(^|(?:[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))((?:(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g, function (_, unmatchedHighSurrogate, precedingLow, unmatchedLowSurrogate) {
      // Could add a corresponding surrogate for compatibility with `node-sqlite3`: http://bugs.python.org/issue12569 and http://stackoverflow.com/a/6701665/271577
      //   but Chrome having problems
      if (unmatchedHighSurrogate) {
        return '^2' + unmatchedHighSurrogate.codePointAt().toString(16).padStart(4, '0');
      }
      return (precedingLow || '') + '^3' + unmatchedLowSurrogate.codePointAt().toString(16).padStart(4, '0');
    });
  }

  /**
   * @param {string} arg
   * @returns {string}
   */
  function escapeNameForSQLiteIdentifier(arg) {
    // http://stackoverflow.com/a/6701665/271577
    return '_' +
    // Prevent empty string
    escapeUnmatchedSurrogates(arg.replaceAll('^', '^^') // Escape our escape
    // http://www.sqlite.org/src/tktview?name=57c971fc74
    .replaceAll('\0', '^0')
    // We need to avoid identifiers being treated as duplicates based on SQLite's ASCII-only case-insensitive table and column names
    // (For SQL in general, however, see http://stackoverflow.com/a/17215009/271577
    // See also https://www.sqlite.org/faq.html#q18 re: Unicode (non-ASCII) case-insensitive not working
    .replaceAll(/([A-Z])/g, '^$1'));
  }

  /**
   * The escaping of unmatched surrogates was needed by Chrome but not Node.
   * @param {string} arg
   * @returns {string}
   */
  function escapeSQLiteStatement(arg) {
    return escapeUnmatchedSurrogates(arg.replaceAll('^', '^^').replaceAll('\0', '^0'));
  }

  /**
   * @param {string} arg
   * @returns {string}
   */
  function unescapeSQLiteResponse(arg) {
    return unescapeUnmatchedSurrogates(arg).replaceAll(/(\^+)0/g, function (_, esc) {
      return esc.length % 2 ? esc.slice(1) + '\0' : _;
    }).replaceAll('^^', '^');
  }

  /**
   * @param {string} arg
   * @returns {string}
   */
  function sqlEscape(arg) {
    // https://www.sqlite.org/lang_keywords.html
    // http://stackoverflow.com/a/6701665/271577
    // There is no need to escape ', `, or [], as
    //   we should always be within double quotes
    // NUL should have already been stripped
    return arg.replaceAll('"', '""');
  }

  /**
   * @param {string} arg
   * @returns {string}
   */
  function sqlQuote(arg) {
    return '"' + sqlEscape(arg) + '"';
  }

  /**
   * @param {string} db
   * @throws {Error}
   * @returns {string}
   */
  function escapeDatabaseNameForSQLAndFiles(db) {
    if (CFG.escapeDatabaseName) {
      // We at least ensure NUL is escaped by default, but we need to still
      //   handle empty string and possibly also length (potentially
      //   throwing if too long), escaping casing (including Unicode?),
      //   and escaping special characters depending on file system
      return CFG.escapeDatabaseName(escapeSQLiteStatement(db));
    }
    db = 'D' + escapeNameForSQLiteIdentifier(db);
    if (CFG.escapeNFDForDatabaseNames !== false) {
      // ES6 copying of regex with different flags
      db = db.replaceAll(new RegExp(regex$1, 'gu'), function (expandable) {
        return '^4' + /** @type {Integer} */expandable.codePointAt(0).toString(16).padStart(6, '0');
      });
    }
    if (CFG.databaseCharacterEscapeList !== false) {
      db = db.replace(CFG.databaseCharacterEscapeList ? new RegExp(CFG.databaseCharacterEscapeList, 'gu') : /[\0-\x1F"\*\/:<>\?\\\|\x7F]/g,
      // eslint-disable-line no-control-regex
      function (n0) {
        // eslint-disable-next-line unicorn/prefer-code-point -- Switch to `codePointAt`?
        return '^1' + n0.charCodeAt(0).toString(16).padStart(2, '0');
      });
    }
    if (CFG.databaseNameLengthLimit !== false && db.length >= (CFG.databaseNameLengthLimit || 254) - (CFG.addSQLiteExtension !== false ? 7 /* '.sqlite'.length */ : 0)) {
      throw new Error('Unexpectedly long database name supplied; length limit required for Node compatibility; passed length: ' + db.length + '; length limit setting: ' + (CFG.databaseNameLengthLimit || 254) + '.');
    }
    return db + (CFG.addSQLiteExtension !== false ? '.sqlite' : ''); // Shouldn't have quoting (do we even need NUL/case escaping here?)
  }

  /**
   * @param {string} arg
   * @returns {string}
   */
  function unescapeUnmatchedSurrogates(arg) {
    return arg.replaceAll(/(\^+)3(d[0-9a-f]{3})/g, function (_, esc, lowSurr) {
      return esc.length % 2 ? esc.slice(1) + String.fromCodePoint(Number.parseInt(lowSurr, 16)) : _;
    }).replaceAll(/(\^+)2(d[0-9a-f]{3})/g, function (_, esc, highSurr) {
      return esc.length % 2 ? esc.slice(1) + String.fromCodePoint(Number.parseInt(highSurr, 16)) : _;
    });
  }

  /**
   * @param {string} store
   * @returns {string}
   */
  function escapeStoreNameForSQL(store) {
    return sqlQuote('S' + escapeNameForSQLiteIdentifier(store));
  }

  /**
   * @param {string} index
   * @returns {string}
   */
  function escapeIndexNameForSQL(index) {
    return sqlQuote('I' + escapeNameForSQLiteIdentifier(index));
  }

  /**
   * @param {string} index
   * @returns {string}
   */
  function escapeIndexNameForSQLKeyColumn(index) {
    return 'I' + escapeNameForSQLiteIdentifier(index);
  }

  /**
   * @param {string} str
   * @returns {string}
   */
  function sqlLIKEEscape(str) {
    // https://www.sqlite.org/lang_expr.html#like
    return sqlEscape(str).replaceAll('^', '^^');
  }

  /**
   * @typedef {Function} AnyClass
   */

  // Babel doesn't seem to provide a means of using the `instanceof` operator with Symbol.hasInstance (yet?)
  /**
   *
   * @param {AnyValue} obj
   * @param {AnyClass} Clss
   * @returns {boolean}
   */
  function instanceOf(obj, Clss) {
    return Clss[Symbol.hasInstance](obj);
  }

  /**
   *
   * @param {AnyValue} obj
   * @returns {obj is object}
   */
  function isObj(obj) {
    return obj !== null && _typeof$2(obj) === 'object';
  }

  /**
   *
   * @param {object} obj
   * @returns {boolean}
   */
  function isDate(obj) {
    return isObj(obj) && 'getDate' in obj && typeof obj.getDate === 'function';
  }

  /**
   *
   * @param {object} obj
   * @returns {boolean}
   */
  function isBlob(obj) {
    return isObj(obj) && 'size' in obj && typeof obj.size === 'number' && 'slice' in obj && typeof obj.slice === 'function' && !('lastModified' in obj);
  }

  /**
   *
   * @param {object} obj
   * @returns {boolean}
   */
  function isFile(obj) {
    return isObj(obj) && 'name' in obj && typeof obj.name === 'string' && 'slice' in obj && typeof obj.slice === 'function' && 'lastModified' in obj;
  }

  /**
   *
   * @param {AnyValue} obj
   * @returns {boolean}
   */
  function isBinary(obj) {
    return isObj(obj) && 'byteLength' in obj && typeof obj.byteLength === 'number' && ('slice' in obj && typeof obj.slice === 'function' ||
    // `TypedArray` (view on buffer) or `ArrayBuffer`
    'getFloat64' in obj && typeof obj.getFloat64 === 'function' // `DataView` (view on buffer)
    );
  }

  /**
   *
   * @param {AnyValue} obj
   * @returns {boolean}
   */
  function isIterable(obj) {
    return isObj(obj) && Symbol.iterator in obj && typeof obj[Symbol.iterator] === 'function';
  }

  /**
   *
   * @param {object} obj
   * @param {string[]} props
   * @returns {void}
   */
  function defineOuterInterface(obj, props) {
    props.forEach(function (prop) {
      var _o;
      var o = (_o = {}, _defineAccessor("get", _o, prop, function () {
        throw new TypeError('Illegal invocation');
      }), _defineAccessor("set", _o, prop, function (val) {
        throw new TypeError('Illegal invocation');
      }), _o);
      var desc = /** @type {PropertyDescriptor} */
      Object.getOwnPropertyDescriptor(o, prop);
      Object.defineProperty(obj, prop, desc);
    });
  }

  /**
   *
   * @param {object} obj
   * @param {string[]} props
   * @returns {void}
   */
  function defineReadonlyOuterInterface(obj, props) {
    props.forEach(function (prop) {
      var o = _defineAccessor("get", {}, prop, function () {
        throw new TypeError('Illegal invocation');
      });
      var desc = /** @type {PropertyDescriptor} */
      Object.getOwnPropertyDescriptor(o, prop);
      Object.defineProperty(obj, prop, desc);
    });
  }

  /**
   *
   * @param {object & {
   *   [key: string]: any
   * }} obj
   * @param {string[]} listeners
   * @returns {void}
   */
  function defineListenerProperties(obj, listeners) {
    listeners = typeof listeners === 'string' ? [listeners] : listeners;
    listeners.forEach(function (listener) {
      var _o3;
      var o = (_o3 = {}, _defineAccessor("get", _o3, listener, function () {
        return obj['__' + listener];
      }), _defineAccessor("set", _o3, listener, function (val) {
        obj['__' + listener] = val;
      }), _o3);
      var desc = /** @type {PropertyDescriptor} */
      Object.getOwnPropertyDescriptor(o, listener);
      // desc.enumerable = true; // Default
      // desc.configurable = true; // Default // Needed by support.js in W3C IndexedDB tests (for openListeners)
      Object.defineProperty(obj, listener, desc);
    });
    listeners.forEach(function (l) {
      obj[l] = null;
    });
  }

  /**
   *
   * @param {object} obj
   * @param {string|string[]} props
   * @param {null|{
   *   [key: string]: any
   * }} getter
   * @returns {void}
   */
  function defineReadonlyProperties(obj, props) {
    var getter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    props = typeof props === 'string' ? [props] : props;
    props.forEach(function (prop) {
      var o;
      if (getter && prop in getter) {
        o = getter[prop];
      } else {
        Object.defineProperty(obj, '__' + prop, {
          enumerable: false,
          configurable: false,
          writable: true
        });
        // We must resort to this to get "get <name>" as
        //   the function `name` for proper IDL
        o = _defineAccessor("get", {}, prop, function () {
          return this['__' + prop];
        });
      }
      var desc = /** @type {PropertyDescriptor} */
      Object.getOwnPropertyDescriptor(o, prop);
      // desc.enumerable = true; // Default
      // desc.configurable = true; // Default
      Object.defineProperty(obj, prop, desc);
    });
  }

  /**
   *
   * @param {string} item
   * @returns {boolean}
   */
  function isIdentifier(item) {
    // For load-time and run-time performance, we don't provide the complete regular
    //   expression for identifiers, but these can be passed in, using the expressions
    //   found at https://gist.github.com/brettz9/b4cd6821d990daa023b2e604de371407
    // ID_Start (includes Other_ID_Start)
    var UnicodeIDStart = CFG.UnicodeIDStart || '[$A-Z_a-z]';
    // ID_Continue (includes Other_ID_Continue)
    var UnicodeIDContinue = CFG.UnicodeIDContinue || '[$0-9A-Z_a-z]';
    var IdentifierStart = '(?:' + UnicodeIDStart + '|[$_])';
    var IdentifierPart = '(?:' + UnicodeIDContinue + "|[$_\u200C\u200D])";
    return new RegExp('^' + IdentifierStart + IdentifierPart + '*$', 'u').test(item);
  }

  /**
   *
   * @param {string|string[]} keyPathString
   * @returns {boolean}
   */
  function isValidKeyPathString(keyPathString) {
    return typeof keyPathString === 'string' && (keyPathString === '' || isIdentifier(keyPathString) || keyPathString.split('.').every(function (pathComponent) {
      return isIdentifier(pathComponent);
    }));
  }

  /**
   *
   * @param {string|string[]} keyPath
   * @returns {boolean}
   */
  function isValidKeyPath(keyPath) {
    return isValidKeyPathString(keyPath) || Array.isArray(keyPath) && Boolean(keyPath.length) &&
    // Convert array from sparse to dense http://www.2ality.com/2012/06/dense-arrays.html
    // See also https://heycam.github.io/webidl/#idl-DOMString
    _toConsumableArray(keyPath).every(function (pathComponent) {
      return isValidKeyPathString(pathComponent);
    });
  }

  /**
   * @param {number} number
   * @param {"unsigned long long"|"unsigned long"} type
   * @throws {Error|TypeError}
   * @returns {number}
   */
  function enforceRange(number, type) {
    number = Math.floor(Number(number));
    var max, min;
    switch (type) {
      case 'unsigned long long':
        {
          max = 0x1FFFFFFFFFFFFF; // 2^53 - 1
          min = 0;
          break;
        }
      case 'unsigned long':
        {
          max = 0xFFFFFFFF; // 2^32 - 1
          min = 0;
          break;
        }
      default:
        throw new Error('Unrecognized type supplied to enforceRange');
    }
    if (!Number.isFinite(number) || number > max || number < min) {
      throw new TypeError('Invalid range: ' + number);
    }
    return number;
  }

  /**
   * @typedef {any} AnyValue
   */

  /**
   * @param {AnyValue} v
   * @param {boolean} [treatNullAs]
   * @returns {string}
   */
  function convertToDOMString(v, treatNullAs) {
    return v === null && treatNullAs ? '' : ToString(v);
  }

  /**
   * @param {AnyValue} o
   * @returns {string}
   */
  function ToString(o) {
    // Todo: See `es-abstract/es7`
    // `String()` will not throw with Symbols
    return '' + o; // eslint-disable-line no-implicit-coercion
  }

  /**
   *
   * @param {AnyValue} val
   * @returns {string|string[]}
   */
  function convertToSequenceDOMString(val) {
    // Per <https://heycam.github.io/webidl/#idl-sequence>, converting to a sequence works with iterables
    if (isIterable(val)) {
      // We don't want conversion to array to convert primitives
      // Per <https://heycam.github.io/webidl/#es-DOMString>, converting to a `DOMString` to be via `ToString`: https://tc39.github.io/ecma262/#sec-tostring
      return _toConsumableArray(val).map(function (item) {
        return ToString(item);
      });
    }
    return ToString(val);
  }

  /**
   * @param {AnyValue} v
   * @returns {v is null|undefined}
   */
  function isNullish(v) {
    return v === null || v === undefined;
  }

  /**
   * @typedef {Error} DebuggingError
   */

  /**
   *
   * @param {string} type
   * @param {DebuggingError|null} [debug]
   * @param {EventInit} [evInit]
   * @returns {Event & {
   *   __legacyOutputDidListenersThrowError?: boolean
   * }}
   */
  function createEvent(type, debug, evInit) {
    // @ts-expect-error It's ok
    var ev = new ShimEvent(type, evInit);
    ev.debug = debug;
    return ev;
  }

  // We don't add within polyfill repo as might not always be the desired implementation
  Object.defineProperty(ShimEvent, Symbol.hasInstance, {
    /**
     * @typedef {any} AnyValue
     */
    value:
    /**
     * @param {AnyValue} obj
     * @returns {boolean}
     */
    function value(obj) {
      return isObj(obj) && 'target' in obj && 'bubbles' in obj && typeof obj.bubbles === 'boolean';
    }
  });

  var readonlyProperties$6 = ['oldVersion', 'newVersion'];

  /**
   * Babel apparently having a problem adding `hasInstance` to a class,
   * so we are redefining as a function.
   * @class
   * @param {string} type
   */
  function IDBVersionChangeEvent(type /* , eventInitDict */) {
    // eventInitDict is a IDBVersionChangeEventInit (but is not defined as a global)
    // @ts-expect-error It's passing only one!
    ShimEvent.call(this, type);
    this[Symbol.toStringTag] = 'IDBVersionChangeEvent';
    this.toString = function () {
      return '[object IDBVersionChangeEvent]';
    };
    // eslint-disable-next-line prefer-rest-params
    this.__eventInitDict = arguments[1] || {};
  }

  // @ts-expect-error It's ok
  IDBVersionChangeEvent.prototype = Object.create(ShimEvent.prototype);
  IDBVersionChangeEvent.prototype[Symbol.toStringTag] = 'IDBVersionChangeEventPrototype';

  /**
   * @typedef {number} Integer
   */

  readonlyProperties$6.forEach(function (prop) {
    // Ensure for proper interface testing that "get <name>" is the function name
    var o = _defineAccessor("get", {}, prop, function () {
      if (!(this instanceof IDBVersionChangeEvent)) {
        throw new TypeError('Illegal invocation');
      }
      return this.__eventInitDict && this.__eventInitDict[prop] || (prop === 'oldVersion' ? 0 : null);
    });
    var desc = /** @type {PropertyDescriptor} */
    Object.getOwnPropertyDescriptor(o, prop);
    // desc.enumerable = true; // Default
    // desc.configurable = true; // Default
    Object.defineProperty(IDBVersionChangeEvent.prototype, prop, desc);
  });
  Object.defineProperty(IDBVersionChangeEvent, Symbol.hasInstance, {
    /**
     * @typedef {any} AnyValue
     */
    value:
    /**
     * @param {AnyValue} obj
     * @returns {boolean}
     */
    function value(obj) {
      return isObj(obj) && 'oldVersion' in obj && 'defaultPrevented' in obj && typeof obj.defaultPrevented === 'boolean';
    }
  });
  Object.defineProperty(IDBVersionChangeEvent.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: IDBVersionChangeEvent
  });
  Object.defineProperty(IDBVersionChangeEvent, 'prototype', {
    writable: false
  });

  /**
   * Creates a native DOMException, for browsers that support it.
   * @param {string} name
   * @param {string} message
   * @returns {DOMException}
   */
  function createNativeDOMException(name, message) {
    // @ts-expect-error It's ok
    return new DOMException.prototype.constructor(message, name || 'DOMException');
  }

  // From web-platform-tests testharness.js name_code_map (though not in new spec)

  /**
   * @typedef {"IndexSizeError"|"HierarchyRequestError"|"WrongDocumentError"|
   * "InvalidCharacterError"|"NoModificationAllowedError"|"NotFoundError"|
   * "NotSupportedError"|"InUseAttributeError"|"InvalidStateError"|
   * "SyntaxError"|"InvalidModificationError"|"NamespaceError"|
   * "InvalidAccessError"|"TypeMismatchError"|"SecurityError"|
   * "NetworkError"|"AbortError"|"URLMismatchError"|"QuotaExceededError"|
   * "TimeoutError"|"InvalidNodeTypeError"|"DataCloneError"|"EncodingError"|
   * "NotReadableError"|"UnknownError"|"ConstraintError"|"DataError"|
   * "TransactionInactiveError"|"ReadOnlyError"|"VersionError"|
   * "OperationError"|"NotAllowedError"} Code
   */

  var codes = {
    IndexSizeError: 1,
    HierarchyRequestError: 3,
    WrongDocumentError: 4,
    InvalidCharacterError: 5,
    NoModificationAllowedError: 7,
    NotFoundError: 8,
    NotSupportedError: 9,
    InUseAttributeError: 10,
    InvalidStateError: 11,
    SyntaxError: 12,
    InvalidModificationError: 13,
    NamespaceError: 14,
    InvalidAccessError: 15,
    TypeMismatchError: 17,
    SecurityError: 18,
    NetworkError: 19,
    AbortError: 20,
    URLMismatchError: 21,
    QuotaExceededError: 22,
    TimeoutError: 23,
    InvalidNodeTypeError: 24,
    DataCloneError: 25,
    EncodingError: 0,
    NotReadableError: 0,
    UnknownError: 0,
    ConstraintError: 0,
    DataError: 0,
    TransactionInactiveError: 0,
    ReadOnlyError: 0,
    VersionError: 0,
    OperationError: 0,
    NotAllowedError: 0
  };

  /**
   * @typedef {"INDEX_SIZE_ERR"|"DOMSTRING_SIZE_ERR"|"HIERARCHY_REQUEST_ERR"|
   * "WRONG_DOCUMENT_ERR"|"INVALID_CHARACTER_ERR"|"NO_DATA_ALLOWED_ERR"|
   * "NO_MODIFICATION_ALLOWED_ERR"|"NOT_FOUND_ERR"|"NOT_SUPPORTED_ERR"|
   * "INUSE_ATTRIBUTE_ERR"|"INVALID_STATE_ERR"|"SYNTAX_ERR"|
   * "INVALID_MODIFICATION_ERR"|"NAMESPACE_ERR"|"INVALID_ACCESS_ERR"|
   * "VALIDATION_ERR"|"TYPE_MISMATCH_ERR"|"SECURITY_ERR"|"NETWORK_ERR"|
   * "ABORT_ERR"|"URL_MISMATCH_ERR"|"QUOTA_EXCEEDED_ERR"|"TIMEOUT_ERR"|
   * "INVALID_NODE_TYPE_ERR"|"DATA_CLONE_ERR"} LegacyCode
   */

  var legacyCodes = {
    INDEX_SIZE_ERR: 1,
    DOMSTRING_SIZE_ERR: 2,
    HIERARCHY_REQUEST_ERR: 3,
    WRONG_DOCUMENT_ERR: 4,
    INVALID_CHARACTER_ERR: 5,
    NO_DATA_ALLOWED_ERR: 6,
    NO_MODIFICATION_ALLOWED_ERR: 7,
    NOT_FOUND_ERR: 8,
    NOT_SUPPORTED_ERR: 9,
    INUSE_ATTRIBUTE_ERR: 10,
    INVALID_STATE_ERR: 11,
    SYNTAX_ERR: 12,
    INVALID_MODIFICATION_ERR: 13,
    NAMESPACE_ERR: 14,
    INVALID_ACCESS_ERR: 15,
    VALIDATION_ERR: 16,
    TYPE_MISMATCH_ERR: 17,
    SECURITY_ERR: 18,
    NETWORK_ERR: 19,
    ABORT_ERR: 20,
    URL_MISMATCH_ERR: 21,
    QUOTA_EXCEEDED_ERR: 22,
    TIMEOUT_ERR: 23,
    INVALID_NODE_TYPE_ERR: 24,
    DATA_CLONE_ERR: 25
  };

  /**
   *
   * @returns {typeof DOMException}
   */
  function createNonNativeDOMExceptionClass() {
    /**
     * @param {string|undefined} message
     * @param {Code|LegacyCode} name
     * @returns {void}
     */
    function DOMException(message, name) {
      // const err = Error.prototype.constructor.call(this, message); // Any use to this? Won't set this.message
      this[Symbol.toStringTag] = 'DOMException';
      this._code = name in codes ? codes[/** @type {Code} */name] : legacyCodes[/** @type {LegacyCode} */name] || 0;
      this._name = name || 'Error';
      // We avoid `String()` in this next line as it converts Symbols
      this._message = message === undefined ? '' : '' + message; // eslint-disable-line no-implicit-coercion
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: this._code
      });
      if (name !== undefined) {
        Object.defineProperty(this, 'name', {
          configurable: true,
          enumerable: true,
          writable: true,
          value: this._name
        });
      }
      if (message !== undefined) {
        Object.defineProperty(this, 'message', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: this._message
        });
      }
    }

    // Necessary for W3C tests which complains if `DOMException` has properties on its "own" prototype

    // class DummyDOMException extends Error {}; // Sometimes causing problems in Node
    /* eslint-disable func-name-matching */
    /**
     * @class
     */
    var DummyDOMException = function DOMException() {/* */};
    /* eslint-enable func-name-matching */
    DummyDOMException.prototype = Object.create(Error.prototype); // Intended for subclassing
    /** @type {const} */
    ['name', 'message'].forEach(function (prop) {
      Object.defineProperty(DummyDOMException.prototype, prop, {
        enumerable: true,
        /**
         * @this {DOMException}
         * @returns {string}
         */
        get: function get() {
          if (!(this instanceof DOMException ||
          // @ts-expect-error Just checking
          this instanceof DummyDOMException ||
          // @ts-expect-error Just checking
          this instanceof Error)) {
            throw new TypeError('Illegal invocation');
          }
          return this[prop === 'name' ? '_name' : '_message'];
        }
      });
    });
    // DOMException uses the same `toString` as `Error`
    Object.defineProperty(DummyDOMException.prototype, 'code', {
      configurable: true,
      enumerable: true,
      get: function get() {
        throw new TypeError('Illegal invocation');
      }
    });
    // @ts-expect-error It's ok
    DOMException.prototype = new DummyDOMException();
    DOMException.prototype[Symbol.toStringTag] = 'DOMExceptionPrototype';
    Object.defineProperty(DOMException, 'prototype', {
      writable: false
    });
    var keys = Object.keys(codes);

    /** @type {(keyof codes)[]} */
    keys.forEach(function (codeName) {
      Object.defineProperty(DOMException.prototype, codeName, {
        enumerable: true,
        configurable: false,
        value: codes[codeName]
      });
      Object.defineProperty(DOMException, codeName, {
        enumerable: true,
        configurable: false,
        value: codes[codeName]
      });
    });
    /** @type {(keyof legacyCodes)[]} */
    Object.keys(legacyCodes).forEach(function (codeName) {
      Object.defineProperty(DOMException.prototype, codeName, {
        enumerable: true,
        configurable: false,
        value: legacyCodes[codeName]
      });
      Object.defineProperty(DOMException, codeName, {
        enumerable: true,
        configurable: false,
        value: legacyCodes[codeName]
      });
    });
    Object.defineProperty(DOMException.prototype, 'constructor', {
      writable: true,
      configurable: true,
      enumerable: false,
      value: DOMException
    });

    // @ts-expect-error We don't need all its properties
    return DOMException;
  }
  var ShimNonNativeDOMException = createNonNativeDOMExceptionClass();

  /**
   * Creates a generic Error object.
   * @param {string} name
   * @param {string} message
   * @returns {Error}
   */
  function createNonNativeDOMException(name, message) {
    return new ShimNonNativeDOMException(message, name);
  }

  /**
   * @typedef {{
   *   message: string|DOMString
   * }} ErrorLike
   */

  /**
   * Logs detailed error information to the console.
   * @param {string} name
   * @param {string} message
   * @param {string|ErrorLike|boolean|null} [error]
   * @returns {void}
   */
  function logError(name, message, error) {
    if (CFG.DEBUG) {
      var msg = error && _typeof$2(error) === 'object' && error.message ? error.message : /** @type {string} */error;
      var method = typeof console.error === 'function' ? 'error' : 'log';
      console[method](name + ': ' + message + '. ' + (msg || ''));
      console.trace && console.trace();
    }
  }

  /**
   * @typedef {any} ArbitraryValue
   */

  /**
   * @param {ArbitraryValue} obj
   * @returns {boolean}
   */
  function isErrorOrDOMErrorOrDOMException(obj) {
    return obj && _typeof$2(obj) === 'object' &&
    // We don't use util.isObj here as mutual dependency causing problems in Babel with browser
    typeof obj.name === 'string';
  }

  /**
   * Finds the error argument.  This is useful because some WebSQL callbacks
   * pass the error as the first argument, and some pass it as the second
   * argument.
   * @param {(Error|{message?: string, name?: string}|any)[]} args
   * @returns {Error|DOMException|undefined}
   */
  function findError(args) {
    var err;
    if (args) {
      if (args.length === 1) {
        return args[0];
      }
      var _iterator = _createForOfIteratorHelper(args),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var arg = _step.value;
          if (isErrorOrDOMErrorOrDOMException(arg)) {
            return arg;
          }
          if (arg && typeof arg.message === 'string') {
            err = arg;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return err;
  }

  /**
   *
   * @param {SQLError} webSQLErr
   * @returns {(DOMException|Error) & {
   *   sqlError: SQLError
   * }}
   */
  function webSQLErrback(webSQLErr) {
    var name, message;
    switch (webSQLErr.code) {
      case 4:
        {
          // SQLError.QUOTA_ERR
          name = 'QuotaExceededError';
          message = 'The operation failed because there was not enough ' + 'remaining storage space, or the storage quota was reached ' + 'and the user declined to give more space to the database.';
          break;
        }
      /*
      // Should a WebSQL timeout treat as IndexedDB `TransactionInactiveError` or `UnknownError`?
      case 7: { // SQLError.TIMEOUT_ERR
          // All transaction errors abort later, so no need to mark inactive
          name = 'TransactionInactiveError';
          message = 'A request was placed against a transaction which is currently not active, or which is finished (Internal SQL Timeout).';
          break;
      }
      */
      default:
        {
          name = 'UnknownError';
          message = 'The operation failed for reasons unrelated to the database itself and not covered by any other errors.';
          break;
        }
    }
    message += ' (' + webSQLErr.message + ')--(' + webSQLErr.code + ')';
    var err =
    /**
     * @type {(Error | DOMException) & {
     *   sqlError: SQLError
     * }}
     */
    createDOMException(name, message);
    err.sqlError = webSQLErr;
    return err;
  }
  var test,
    useNativeDOMException = false;

  // Test whether we can use the browser's native DOMException class
  try {
    test = createNativeDOMException('test name', 'test message');
    if (isErrorOrDOMErrorOrDOMException(test) && test.name === 'test name' && test.message === 'test message') {
      // Native DOMException works as expected
      useNativeDOMException = true;
    }
  } catch (e) {}
  var createDOMException = useNativeDOMException
  // eslint-disable-next-line operator-linebreak -- Need JSDoc
  ?
  /**
  * @param {string} name
  * @param {string} message
  * @param {ErrorLike} [error]
  * @returns {DOMException}
  */
  function (name, message, error) {
    logError(name, message, error);
    return createNativeDOMException(name, message);
  }
  // eslint-disable-next-line operator-linebreak -- Need JSDoc
  :
  /**
  * @param {string} name
  * @param {string} message
  * @param {ErrorLike} [error]
  * @returns {Error}
  */
  function (name, message, error) {
    logError(name, message, error);
    return createNonNativeDOMException(name, message);
  };
  var ShimDOMException = useNativeDOMException ? DOMException : ShimNonNativeDOMException;

  var listeners$2 = ['onsuccess', 'onerror'];
  var readonlyProperties$5 = ['source', 'transaction', 'readyState'];
  var doneFlagGetters = ['result', 'error'];

  /**
   * The IDBRequest Object that is returns for all async calls.
   * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#request-api
   * @class
   */
  function IDBRequest() {
    throw new TypeError('Illegal constructor');
  }

  /**
   * @typedef {IDBRequest & EventTarget & import('eventtargeter').ShimEventTarget & {
   *   transaction: import('./IDBTransaction.js').IDBTransactionFull,
   *   __done: boolean,
   *   __result: import('./IDBDatabase.js').IDBDatabaseFull|undefined,
   *   __error: null|DOMException|Error,
   *   __source: null|import('./IDBDatabase.js').IDBDatabaseFull|
   *     import('./IDBObjectStore.js').IDBObjectStoreFull|
   *     import('./IDBIndex.js').IDBIndexFull,
   *   __transaction: undefined|null|
   *     import('./IDBTransaction.js').IDBTransactionFull,
   *   addLateEventListener: (ev: string, listener: (e: Event & {
   *     __legacyOutputDidListenersThrowError: boolean
   *   }) => void) => void
   *   addDefaultEventListener: (ev: string, listener: (e: Event & {
   *     __legacyOutputDidListenersThrowError: boolean
   *   }) => void) => void
   * }} IDBRequestFull
   */

  /* eslint-disable func-name-matching -- Polyfill */
  /**
   * @class
   * @this {IDBRequestFull}
   */
  IDBRequest.__super = function IDBRequest() {
    var _this = this;
    // @ts-expect-error It's ok
    this[Symbol.toStringTag] = 'IDBRequest';
    // @ts-expect-error Part of `ShimEventTarget`
    this.__setOptions({
      legacyOutputDidListenersThrowFlag: true // Event hook for IndexedB
    });

    doneFlagGetters.forEach(function (prop) {
      Object.defineProperty(_this, '__' + prop, {
        enumerable: false,
        configurable: false,
        writable: true
      });
      Object.defineProperty(_this, prop, {
        enumerable: true,
        configurable: true,
        get: function get() {
          if (!this.__done) {
            throw createDOMException('InvalidStateError', "Can't get " + prop + '; the request is still pending.');
          }
          return this['__' + prop];
        }
      });
    });
    defineReadonlyProperties(this, readonlyProperties$5, {
      readyState: {
        /**
         * @this {IDBRequestFull}
         * @returns {"done"|"pending"}
         */
        get readyState() {
          return this.__done ? 'done' : 'pending';
        }
      }
    });
    defineListenerProperties(this, listeners$2);
    this.__result = undefined;
    this.__error = this.__source = this.__transaction = null;
    this.__done = false;
  };
  /* eslint-enable func-name-matching -- Polyfill */

  /**
   * @returns {IDBRequestFull}
   */
  IDBRequest.__createInstance = function () {
    // @ts-expect-error Casting this causes other errors
    return new IDBRequest.__super();
  };

  // @ts-expect-error It's ok
  IDBRequest.prototype = EventTargetFactory.createInstance({
    extraProperties: ['debug']
  });
  IDBRequest.prototype[Symbol.toStringTag] = 'IDBRequestPrototype';

  /**
   * @this {IDBRequestFull}
   * @returns {import('./IDBTransaction.js').IDBTransactionFull|null|undefined}
   */
  IDBRequest.prototype.__getParent = function () {
    if (this.toString() === '[object IDBOpenDBRequest]') {
      return null;
    }
    return this.__transaction;
  };

  // Illegal invocations
  defineReadonlyOuterInterface(IDBRequest.prototype, readonlyProperties$5);
  defineReadonlyOuterInterface(IDBRequest.prototype, doneFlagGetters);
  defineOuterInterface(IDBRequest.prototype, listeners$2);
  Object.defineProperty(IDBRequest.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: IDBRequest
  });
  IDBRequest.__super.prototype = IDBRequest.prototype;
  Object.defineProperty(IDBRequest, 'prototype', {
    writable: false
  });
  var openListeners = ['onblocked', 'onupgradeneeded'];

  /**
   * @typedef {IDBRequestFull & IDBOpenDBRequest & {}} IDBOpenDBRequestFull
   */

  /**
   * The IDBOpenDBRequest called when a database is opened.
   * @class
   */
  function IDBOpenDBRequest() {
    throw new TypeError('Illegal constructor');
  }

  // @ts-expect-error It's ok
  IDBOpenDBRequest.prototype = Object.create(IDBRequest.prototype);
  Object.defineProperty(IDBOpenDBRequest.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: IDBOpenDBRequest
  });
  var IDBOpenDBRequestAlias = IDBOpenDBRequest;
  /**
   * @returns {IDBRequestFull & IDBOpenDBRequest}
   */
  IDBOpenDBRequest.__createInstance = function () {
    /**
     * @class
     * @this {IDBOpenDBRequestFull}
     */
    function IDBOpenDBRequest() {
      IDBRequest.__super.call(this);

      // @ts-expect-error It's ok
      this[Symbol.toStringTag] = 'IDBOpenDBRequest';
      // @ts-expect-error It's ok
      this.__setOptions({
        legacyOutputDidListenersThrowFlag: true,
        // Event hook for IndexedB
        extraProperties: ['oldVersion', 'newVersion', 'debug']
      }); // Ensure EventTarget preserves our properties
      defineListenerProperties(this, openListeners);
    }
    IDBOpenDBRequest.prototype = IDBOpenDBRequestAlias.prototype;

    // @ts-expect-error It's ok
    return new IDBOpenDBRequest();
  };
  defineOuterInterface(IDBOpenDBRequest.prototype, openListeners);
  IDBOpenDBRequest.prototype[Symbol.toStringTag] = 'IDBOpenDBRequestPrototype';
  Object.defineProperty(IDBOpenDBRequest, 'prototype', {
    writable: false
  });

  /* eslint-disable promise/prefer-await-to-callbacks -- Needed for API */
  /* eslint-disable promise/catch-or-return, n/callback-return,
      promise/always-return -- Not needed */
  /* eslint-disable unicorn/no-this-assignment -- Clarity */
  // Since [immediate](https://github.com/calvinmetcalf/immediate) is
  //   not doing the trick for our WebSQL transactions (at least in Node),
  //   we are forced to make the promises run fully synchronously.

  // Todo: Use ES6 classes

  /**
   * @typedef {any} ArbitraryValue
   */

  /**
   * @callback Resolve
   * @param {ArbitraryValue} val
   * @returns {void}
   */
  /**
   * @callback Reject
   * @param {ArbitraryValue} reason
   * @returns {void}
   */
  /**
   * @callback Settle
   * @returns {void}
   */

  /**
   * @callback ResolveReject
   * @param {Resolve} resolve
   * @param {Reject} reject
   * @returns {void}
   */

  /**
   * @callback OnFulfilled
   * @param {ArbitraryValue} resolve
   * @returns {void}
   */

  /**
   * @typedef {[(Settle|Resolve)[], (Settle|Reject)[]]} Callbacks
   */

  /**
   *
   * @param {PromiseLike<ArbitraryValue>} p
   * @returns {boolean}
   */
  function isPromise(p) {
    return p && typeof p.then === 'function';
  }
  /**
   *
   * @param {PromiseLike<ArbitraryValue>} prom
   * @param {(err: Error) => void} reject
   * @returns {void}
   */
  function addReject(prom, reject) {
    // Use this style for sake of non-Promise thenables (e.g., jQuery Deferred)
    prom.then(null, reject);
  }

  // States
  var PENDING = 2,
    FULFILLED = 0,
    // We later abuse these as array indices
    REJECTED = 1;

  /**
   * @class
   * @param {(
   *   resolve: (value: ArbitraryValue | PromiseLike<ArbitraryValue>) => void,
   *   reject: (reason?: any) => void
   * ) => void} fn
   */
  function SyncPromise(fn) {
    var that = this;
    // Value, this will be set to either a resolved value or rejected reason
    that.v = 0;
    // State of the promise
    that.s = PENDING;
    // Callbacks c[0] is fulfillment and c[1] contains rejection callbacks
    /** @type {Callbacks|null} */
    that.c = [[], []];
    /**
     *
     * @param {ArbitraryValue} val
     * @param {0|1} state
     * @returns {void}
     */
    function transist(val, state) {
      that.v = val;
      that.s = state;

      // console.log('state', state);
      /** @type {Callbacks} */
      that.c[state].forEach(function (func) {
        func(val);
      });
      // Release memory, but if no handlers have been added, as we
      //   assume that we will resolve/reject (truly) synchronously
      //   and thus we avoid flagging checks about whether we've
      //   already resolved/rejected.
      if ( /** @type {Callbacks} */that.c[state].length) {
        that.c = null;
      }
    }

    /** @type {Resolve} */
    function resolve(val) {
      if (!that.c) ; else if (isPromise(val)) {
        addReject(val.then(resolve), reject);
      } else {
        transist(val, FULFILLED);
      }
    }

    /** @type {Reject} */
    function reject(reason) {
      if (!that.c) ; else if (isPromise(reason)) {
        addReject(reason.then(reject), reject);
      } else {
        transist(reason, REJECTED);
      }
    }
    try {
      fn(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  /* eslint-disable unicorn/no-thenable -- Promise API */
  /**
   * @param {((value: ArbitraryValue) => ArbitraryValue)|null|undefined} [cb]
   * @param {(reason: any) => PromiseLike<never>} [errBack]
   * @returns {SyncPromise}
   */
  SyncPromise.prototype.then = function (cb, errBack) {
    /* eslint-enable unicorn/no-thenable -- Promise API */
    var that = this;
    return new SyncPromise( /** @type {ResolveReject} */
    function (resolve, reject) {
      var rej = typeof errBack === 'function' ? errBack : reject;

      /** @type {Settle} */
      function settle() {
        try {
          resolve(cb ? cb(that.v) : that.v);
        } catch (e) {
          rej(e);
        }
      }
      if (that.s === FULFILLED) {
        settle();
      } else if (that.s === REJECTED) {
        rej(that.v);
      } else {
        /** @type {Callbacks} */that.c[FULFILLED].push(settle);
        /** @type {Callbacks} */
        that.c[REJECTED].push(rej);
      }
    });
  };

  /**
   * @param {(reason: any) => PromiseLike<never>|null|undefined} cb
   * @returns {SyncPromise}
   */
  SyncPromise.prototype["catch"] = function (cb) {
    var that = this;
    return new SyncPromise( /** @type {ResolveReject} */
    function (resolve, reject) {
      /**
       * @returns {void}
       */
      function settle() {
        try {
          resolve(cb(that.v));
        } catch (e) {
          reject(e);
        }
      }
      if (that.s === REJECTED) {
        settle();
      } else if (that.s === FULFILLED) {
        resolve(that.v);
      } else {
        /** @type {Callbacks} */that.c[REJECTED].push(settle);
        /** @type {Callbacks} */
        that.c[FULFILLED].push(resolve);
      }
    });
  };

  /**
   * @param {unknown[]|[]} promises
   * @returns {SyncPromise}
   */
  SyncPromise.all = function (promises) {
    return new SyncPromise( /** @type {ResolveReject} */
    function (resolve, reject) {
      var l = promises.length;
      /** @type {ArbitraryValue[]} */
      var newPromises = [];
      if (!l) {
        resolve(newPromises);
        return;
      }
      promises.forEach(function (p, i) {
        if (isPromise( /** @type {PromiseLike<any>} */p)) {
          addReject( /** @type {PromiseLike<any>} */p.then( /** @type {OnFulfilled} */
          function (res) {
            newPromises[i] = res;
            --l || resolve(newPromises);
          }), reject);
        } else {
          newPromises[i] = p;
          --l || resolve(promises);
        }
      });
    });
  };

  /**
   * @param {unknown[]|[]} promises
   * @returns {SyncPromise}
   */
  SyncPromise.race = function (promises) {
    var resolved = false;
    return new SyncPromise( /** @type {ResolveReject} */
    function (resolve, reject) {
      promises.some(function (p, i) {
        if (isPromise( /** @type {PromiseLike<any>} */p)) {
          addReject( /** @type {PromiseLike<any>} */p.then( /** @type {OnFulfilled} */
          function (res) {
            if (resolved) {
              return;
            }
            resolve(res);
            resolved = true;
          }), reject);
          return false;
        }
        resolve(p);
        resolved = true;
        return true;
      });
    });
  };

  /**
   * @param {ArbitraryValue} val
   * @returns {SyncPromise}
   */
  SyncPromise.resolve = function (val) {
    return new SyncPromise( /** @type {ResolveReject} */
    function (resolve, reject) {
      resolve(val);
    });
  };

  /**
   * @param {ArbitraryValue} val
   * @returns {SyncPromise}
   */
  SyncPromise.reject = function (val) {
    return new SyncPromise( /** @type {ResolveReject} */
    function (resolve, reject) {
      reject(val);
    });
  };

  /**
   * Compares two keys.
   * @param {import('./Key.js').Key} first
   * @param {import('./Key.js').Key} second
   * @returns {0|1|-1}
   */
  function cmp(first, second) {
    var encodedKey1 = /** @type {string} */_encode(first);
    var encodedKey2 = /** @type {string} */_encode(second);
    var result = encodedKey1 > encodedKey2 ? 1 : encodedKey1 === encodedKey2 ? 0 : -1;
    if (CFG.DEBUG) {
      // verify that the keys encoded correctly
      var decodedKey1 = _decode(encodedKey1);
      var decodedKey2 = _decode(encodedKey2);
      if (_typeof$2(first) === 'object') {
        first = JSON.stringify(first);
        decodedKey1 = JSON.stringify(decodedKey1);
      }
      if (_typeof$2(second) === 'object') {
        second = JSON.stringify(second);
        decodedKey2 = JSON.stringify(decodedKey2);
      }

      // Encoding/decoding mismatches are usually due to a loss of
      //   floating-point precision
      if (decodedKey1 !== first) {
        console.warn(first + ' was incorrectly encoded as ' + decodedKey1);
      }
      if (decodedKey2 !== second) {
        console.warn(second + ' was incorrectly encoded as ' + decodedKey2);
      }
    }
    return result;
  }

  /**
   * @typedef {NodeJS.TypedArray|DataView} ArrayBufferView
   */

  /**
   * @typedef {ArrayBufferView|ArrayBuffer} BufferSource
   */

  /**
   * @typedef {"number"|"date"|"string"|"binary"|"array"} KeyType
   */

  /**
   * @typedef {any} Value
   */

  /**
   * @typedef {any} Key
   * @todo Specify possible value more precisely
   */

  /**
   * @typedef {KeyPath[]} KeyPathArray
   */
  /**
   * @typedef {string|KeyPathArray} KeyPath
   */

  /**
  * @typedef {object} KeyValueObject
  * @property {KeyType|"NaN"|"null"|"undefined"|"boolean"|"object"|"symbol"|
  *   "function"|"bigint"} type If not `KeyType`, indicates invalid value
  * @property {Value} [value]
  * @property {boolean} [invalid]
  * @property {string} [message]
  * @todo Specify acceptable `value` more precisely
  */

  /**
   * @typedef {number|string|Date|ArrayBuffer} ValueTypePrimitive
   */
  /**
   * @typedef {ValueType[]} ValueTypeArray
   */
  /**
   * @typedef {ValueTypePrimitive|ValueTypeArray} ValueType
   */

  /**
   * Encodes the keys based on their types. This is required to maintain collations
   * We leave space for future keys.
   * @type {{[key: string]: Integer|string}}
   */
  var keyTypeToEncodedChar = {
    invalid: 100,
    number: 200,
    date: 300,
    string: 400,
    binary: 500,
    array: 600
  };
  var keyTypes = /** @type {(KeyType|"invalid")[]} */Object.keys(keyTypeToEncodedChar);
  keyTypes.forEach(function (k) {
    keyTypeToEncodedChar[k] = String.fromCodePoint( /** @type {number} */keyTypeToEncodedChar[k]);
  });
  var encodedCharToKeyType = keyTypes.reduce(function (o, k) {
    o[keyTypeToEncodedChar[k]] = k;
    return o;
  }, /** @type {{[key: string]: KeyType|"invalid"}} */{});

  /**
   * The sign values for numbers, ordered from least to greatest.
   *  - "negativeInfinity": Sorts below all other values.
   *  - "bigNegative": Negative values less than or equal to negative one.
   *  - "smallNegative": Negative values between negative one and zero, noninclusive.
   *  - "smallPositive": Positive values between zero and one, including zero but not one.
   *  - "largePositive": Positive values greater than or equal to one.
   *  - "positiveInfinity": Sorts above all other values.
   */
  var signValues = ['negativeInfinity', 'bigNegative', 'smallNegative', 'smallPositive', 'bigPositive', 'positiveInfinity'];

  /**
   * @typedef {any} AnyValue
   */

  var types = {
    invalid: {
      /**
       * @param {AnyValue} _key
       * @returns {string}
       */
      encode: function encode(_key) {
        return keyTypeToEncodedChar.invalid + '-';
      },
      /**
       * @param {string} _key
       * @returns {undefined}
       */
      decode: function decode(_key) {
        return undefined;
      }
    },
    // Numbers are represented in a lexically sortable base-32 sign-exponent-mantissa
    // notation.
    //
    // sign: takes a value between zero and five, inclusive. Represents infinite cases
    //     and the signs of both the exponent and the fractional part of the number.
    // exponent: padded to two base-32 digits, represented by the 32's compliment in the
    //     "smallPositive" and "bigNegative" cases to ensure proper lexical sorting.
    // mantissa: also called the fractional part. Normed 11-digit base-32 representation.
    //     Represented by the 32's compliment in the "smallNegative" and "bigNegative"
    //     cases to ensure proper lexical sorting.
    number: {
      // The encode step checks for six numeric cases and generates 14-digit encoded
      // sign-exponent-mantissa strings.
      /**
       * @param {number} key
       * @returns {string}
       */
      encode: function encode(key) {
        var key32 = key === Number.MIN_VALUE
        // Mocha test `IDBFactory/cmp-spec.js` exposed problem for some
        //   Node (and Chrome) versions with `Number.MIN_VALUE` being treated
        //   as 0
        // https://stackoverflow.com/questions/43305403/number-min-value-and-tostring
        ? '0.' + '0'.repeat(214) + '2' : Math.abs(key).toString(32);
        // Get the index of the decimal.
        var decimalIndex = key32.indexOf('.');
        // Remove the decimal.
        key32 = decimalIndex !== -1 ? key32.replace('.', '') : key32;
        // Get the index of the first significant digit.
        var significantDigitIndex = key32.search(/(?:[\0-\/1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/);
        // Truncate leading zeros.
        key32 = key32.slice(significantDigitIndex);
        var sign, exponent, mantissa;

        // Finite cases:
        if (Number.isFinite(Number(key))) {
          // Negative cases:
          if (key < 0) {
            // Negative exponent case:
            if (key > -1) {
              sign = signValues.indexOf('smallNegative');
              exponent = padBase32Exponent(significantDigitIndex);
              mantissa = flipBase32(padBase32Mantissa(key32));
              // Non-negative exponent case:
            } else {
              sign = signValues.indexOf('bigNegative');
              exponent = flipBase32(padBase32Exponent(decimalIndex !== -1 ? decimalIndex : key32.length));
              mantissa = flipBase32(padBase32Mantissa(key32));
            }
            // Non-negative cases:
            // Negative exponent case:
          } else if (key < 1) {
            sign = signValues.indexOf('smallPositive');
            exponent = flipBase32(padBase32Exponent(significantDigitIndex));
            mantissa = padBase32Mantissa(key32);
            // Non-negative exponent case:
          } else {
            sign = signValues.indexOf('bigPositive');
            exponent = padBase32Exponent(decimalIndex !== -1 ? decimalIndex : key32.length);
            mantissa = padBase32Mantissa(key32);
          }
          // Infinite cases:
        } else {
          exponent = zeros(2);
          mantissa = zeros(11);
          sign = signValues.indexOf(key > 0 ? 'positiveInfinity' : 'negativeInfinity');
        }
        return keyTypeToEncodedChar.number + '-' + sign + exponent + mantissa;
      },
      // The decode step must interpret the sign, reflip values encoded as the 32's complements,
      // apply signs to the exponent and mantissa, do the base-32 power operation, and return
      // the original JavaScript number values.
      /**
       * @param {string} key
       * @returns {number}
       */
      decode: function decode(key) {
        var sign = Number(key.slice(2, 3));
        var exponent = key.slice(3, 5);
        var mantissa = key.slice(5, 16);
        switch (signValues[sign]) {
          case 'negativeInfinity':
            return Number.NEGATIVE_INFINITY;
          case 'positiveInfinity':
            return Number.POSITIVE_INFINITY;
          case 'bigPositive':
            return pow32(mantissa, exponent);
          case 'smallPositive':
            exponent = negate(flipBase32(exponent));
            return pow32(mantissa, exponent);
          case 'smallNegative':
            exponent = negate(exponent);
            mantissa = flipBase32(mantissa);
            return -pow32(mantissa, exponent);
          case 'bigNegative':
            exponent = flipBase32(exponent);
            mantissa = flipBase32(mantissa);
            return -pow32(mantissa, exponent);
          default:
            throw new Error('Invalid number.');
        }
      }
    },
    // Strings are encoded as JSON strings (with quotes and unicode characters escaped).
    //
    // If the strings are in an array, then some extra encoding is done to make sorting work correctly:
    // Since we can't force all strings to be the same length, we need to ensure that characters line-up properly
    // for sorting, while also accounting for the extra characters that are added when the array itself is encoded as JSON.
    // To do this, each character of the string is prepended with a dash ("-"), and a space is added to the end of the string.
    // This effectively doubles the size of every string, but it ensures that when two arrays of strings are compared,
    // the indexes of each string's characters line up with each other.
    string: {
      /**
       * @param {string} key
       * @param {boolean} [inArray]
       * @returns {string}
       */
      encode: function encode(key, inArray) {
        if (inArray) {
          // prepend each character with a dash, and append a space to the end
          key = key.replaceAll(/((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g, '-$1') + ' ';
        }
        return keyTypeToEncodedChar.string + '-' + key;
      },
      /**
       * @param {string} key
       * @param {boolean} [inArray]
       * @returns {string}
       */
      decode: function decode(key, inArray) {
        key = key.slice(2);
        if (inArray) {
          // remove the space at the end, and the dash before each character
          key = key.slice(0, -1).replaceAll(/\x2D((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g, '$1');
        }
        return key;
      }
    },
    // Arrays are encoded as JSON strings.
    // An extra, value is added to each array during encoding to make
    //  empty arrays sort correctly.
    array: {
      /**
       * @param {ValueTypeArray} key
       * @returns {string}
       */
      encode: function encode(key) {
        var encoded = [];
        var _iterator = _createForOfIteratorHelper(key.entries()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray$1(_step.value, 2),
              i = _step$value[0],
              item = _step$value[1];
            var encodedItem = _encode(item, true); // encode the array item
            encoded[i] = encodedItem;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        encoded.push(keyTypeToEncodedChar.invalid + '-'); // append an extra item, so empty arrays sort correctly
        return keyTypeToEncodedChar.array + '-' + JSON.stringify(encoded);
      },
      /**
       * @param {string} key
       * @returns {ValueTypeArray}
       */
      decode: function decode(key) {
        var decoded = JSON.parse(key.slice(2));
        decoded.pop(); // remove the extra item
        for (var i = 0; i < decoded.length; i++) {
          var item = decoded[i];
          var decodedItem = _decode(item, true); // decode the item
          decoded[i] = decodedItem;
        }
        return decoded;
      }
    },
    // Dates are encoded as ISO 8601 strings, in UTC time zone.
    date: {
      /**
       * @param {Date} key
       * @returns {string}
       */
      encode: function encode(key) {
        return keyTypeToEncodedChar.date + '-' + key.toJSON();
      },
      /**
       * @param {string} key
       * @returns {Date}
       */
      decode: function decode(key) {
        return new Date(key.slice(2));
      }
    },
    binary: {
      // `ArrayBuffer`/Views on buffers (`TypedArray` or `DataView`)
      /**
       * @param {BufferSource} key
       * @returns {string}
       */
      encode: function encode(key) {
        return keyTypeToEncodedChar.binary + '-' + (key.byteLength ? _toConsumableArray(getCopyBytesHeldByBufferSource(key)).map(function (b) {
          return String(b).padStart(3, '0');
        }) // e.g., '255,005,254,000,001,033'
        : '');
      },
      /**
       * @param {string} key
       * @returns {ArrayBuffer}
       */
      decode: function decode(key) {
        // Set the entries in buffer's [[ArrayBufferData]] to those in `value`
        var k = key.slice(2);
        var arr = k.length ? k.split(',').map(function (s) {
          return Number.parseInt(s);
        }) : [];
        var buffer = new ArrayBuffer(arr.length);
        var uint8 = new Uint8Array(buffer);
        uint8.set(arr);
        return buffer;
      }
    }
  };

  /**
   * Return a padded base-32 exponent value.
   * @param {number} n
   * @returns {string}
   */
  function padBase32Exponent(n) {
    var exp = n.toString(32);
    return exp.length === 1 ? '0' + exp : exp;
  }

  /**
   * Return a padded base-32 mantissa.
   * @param {string} s
   * @returns {string}
   */
  function padBase32Mantissa(s) {
    return (s + zeros(11)).slice(0, 11);
  }

  /**
   * Flips each digit of a base-32 encoded string.
   * @param {string} encoded
   * @returns {string}
   */
  function flipBase32(encoded) {
    var flipped = '';
    var _iterator2 = _createForOfIteratorHelper(encoded),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var ch = _step2.value;
        flipped += (31 - Number.parseInt(ch, 32)).toString(32);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return flipped;
  }

  /**
   * Base-32 power function.
   * RESEARCH: This function does not precisely decode floats because it performs
   * floating point arithmetic to recover values. But can the original values be
   * recovered exactly?
   * Someone may have already figured out a good way to store JavaScript floats as
   * binary strings and convert back. Barring a better method, however, one route
   * may be to generate decimal strings that `parseFloat` decodes predictably.
   * @param {string} mantissa
   * @param {string} exponent
   * @returns {number}
   */
  function pow32(mantissa, exponent) {
    var exp = Number.parseInt(exponent, 32);
    if (exp < 0) {
      return roundToPrecision(Number.parseInt(mantissa, 32) * Math.pow(32, exp - 10));
    }
    if (exp < 11) {
      var whole = mantissa.slice(0, exp);
      var wholeNum = Number.parseInt(whole, 32);
      var fraction = mantissa.slice(exp);
      var fractionNum = Number.parseInt(fraction, 32) * Math.pow(32, exp - 11);
      return roundToPrecision(wholeNum + fractionNum);
    }
    var expansion = mantissa + zeros(exp - 11);
    return Number.parseInt(expansion, 32);
  }

  /**
   * @typedef {number} Float
   */

  /**
   * @param {Float} num
   * @param {Float} [precision]
   * @returns {Float}
   */
  function roundToPrecision(num) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
    return Number.parseFloat(num.toPrecision(precision));
  }

  /**
   * Returns a string of n zeros.
   * @param {number} n
   * @returns {string}
   */
  function zeros(n) {
    return '0'.repeat(n);
  }

  /**
   * Negates numeric strings.
   * @param {string} s
   * @returns {string}
   */
  function negate(s) {
    return '-' + s;
  }

  /**
   * @param {Key} key
   * @returns {KeyType|"invalid"}
   */
  function getKeyType(key) {
    if (Array.isArray(key)) return 'array';
    if (isDate(key)) return 'date';
    if (isBinary(key)) return 'binary';
    var keyType = _typeof$2(key);
    return ['string', 'number'].includes(keyType) ? /** @type {"string"|"number"} */keyType : 'invalid';
  }

  /**
   * Keys must be strings, numbers (besides `NaN`), Dates (if value is not
   *   `NaN`), binary objects or Arrays.
   * @param {Value} input The key input
   * @param {Value[]|null|undefined} [seen] An array of already seen keys
   * @returns {KeyValueObject}
   */
  function convertValueToKey(input, seen) {
    return convertValueToKeyValueDecoded(input, seen, false, true);
  }

  /**
  * Currently not in use.
  * @param {Value} input
  * @returns {KeyValueObject}
  */
  function convertValueToMultiEntryKey(input) {
    return convertValueToKeyValueDecoded(input, null, true, true);
  }

  /**
   *
   * @param {BufferSource} O
   * @throws {TypeError}
   * @see https://heycam.github.io/webidl/#ref-for-dfn-get-buffer-source-copy-2
   * @returns {Uint8Array}
   */
  function getCopyBytesHeldByBufferSource(O) {
    var offset = 0;
    var length = 0;
    if (ArrayBuffer.isView(O)) {
      // Has [[ViewedArrayBuffer]] internal slot
      var arrayBuffer = O.buffer;
      if (arrayBuffer === undefined) {
        throw new TypeError('Could not copy the bytes held by a buffer source as the buffer was undefined.');
      }
      offset = O.byteOffset; // [[ByteOffset]] (will also throw as desired if detached)
      length = O.byteLength; // [[ByteLength]] (will also throw as desired if detached)
    } else {
      length = O.byteLength; // [[ArrayBufferByteLength]] on ArrayBuffer (will also throw as desired if detached)
    }
    // const octets = new Uint8Array(input);
    // const octets = types.binary.decode(types.binary.encode(input));
    return new Uint8Array(
    // Should allow DataView
    /** @type {ArrayBuffer} */
    'buffer' in O && O.buffer || O, offset, length);
  }

  /**
  * Shortcut utility to avoid returning full keys from `convertValueToKey`
  *   and subsequent need to process in calling code unless `fullKeys` is
  *   set; may throw.
  * @param {Value} input
  * @param {Value[]|null} [seen]
  * @param {boolean} [multiEntry]
  * @param {boolean} [fullKeys]
  * @throws {TypeError} See `getCopyBytesHeldByBufferSource`
  * @todo Document other allowable `input`
  * @returns {KeyValueObject}
  */
  function convertValueToKeyValueDecoded(input, seen, multiEntry, fullKeys) {
    seen = seen || [];
    if (seen.includes(input)) {
      return {
        type: 'array',
        invalid: true,
        message: 'An array key cannot be circular'
      };
    }
    var type = getKeyType(input);
    var ret = {
      type: type,
      value: input
    };
    switch (type) {
      case 'number':
        {
          if (Number.isNaN(input)) {
            // List as 'NaN' type for convenience of consumers in reporting errors
            return {
              type: 'NaN',
              invalid: true
            };
          }

          // https://github.com/w3c/IndexedDB/issues/375
          // https://github.com/w3c/IndexedDB/pull/386
          if (Object.is(input, -0)) {
            return {
              type: type,
              value: 0
            };
          }
          return (/** @type {{type: KeyType; value: Value}} */ret
          );
        }
      case 'string':
        {
          return (/** @type {{type: KeyType; value: Value}} */ret
          );
        }
      case 'binary':
        {
          // May throw (if detached)
          // Get a copy of the bytes held by the buffer source
          // https://heycam.github.io/webidl/#ref-for-dfn-get-buffer-source-copy-2
          var octets = getCopyBytesHeldByBufferSource( /** @type {BufferSource} */input);
          return {
            type: 'binary',
            value: octets
          };
        }
      case 'array':
        {
          // May throw (from binary)
          var arr = /** @type {Array<any>} */input;
          var len = arr.length;
          seen.push(input);

          /** @type {(KeyValueObject|Value)[]} */
          var keys = [];
          var _loop = function _loop() {
            // We cannot iterate here with array extras as we must ensure sparse arrays are invalidated
            if (!multiEntry && !Object.hasOwn(arr, i)) {
              return {
                v: {
                  type: type,
                  invalid: true,
                  message: 'Does not have own index property'
                }
              };
            }
            try {
              var entry = arr[i];
              var key = convertValueToKeyValueDecoded(entry, seen, false, fullKeys); // Though steps do not list rethrowing, the next is returnifabrupt when not multiEntry
              if (key.invalid) {
                if (multiEntry) {
                  return "continue";
                }
                return {
                  v: {
                    type: type,
                    invalid: true,
                    message: 'Bad array entry value-to-key conversion'
                  }
                };
              }
              if (!multiEntry || !fullKeys && keys.every(function (k) {
                return cmp(k, key.value) !== 0;
              }) || fullKeys && keys.every(function (k) {
                return cmp(k, key) !== 0;
              })) {
                keys.push(fullKeys ? key : key.value);
              }
            } catch (err) {
              if (!multiEntry) {
                throw err;
              }
            }
          };
          for (var i = 0; i < len; i++) {
            var _ret = _loop();
            if (_ret === "continue") continue;
            if (_typeof$2(_ret) === "object") return _ret.v;
          }
          return {
            type: type,
            value: keys
          };
        }
      case 'date':
        {
          var date = /** @type {Date} */input;
          if (!Number.isNaN(date.getTime())) {
            return fullKeys ? {
              type: type,
              value: date.getTime()
            } : {
              type: type,
              value: new Date(date.getTime())
            };
          }
          return {
            type: type,
            invalid: true,
            message: 'Not a valid date'
          };
          // Falls through
        }
      case 'invalid':
      default:
        {
          // Other `typeof` types which are not valid keys:
          //    'undefined', 'boolean', 'object' (including `null`), 'symbol', 'function'
          var _type = input === null ? 'null' : _typeof$2(input); // Convert `null` for convenience of consumers in reporting errors
          return {
            type: _type,
            invalid: true,
            message: 'Not a valid key; type ' + _type
          };
        }
    }
  }

  /**
   *
   * @param {Key} key
   * @param {boolean} [fullKeys]
   * @returns {KeyValueObject}
   * @todo Document other allowable `key`?
   */
  function convertValueToMultiEntryKeyDecoded(key, fullKeys) {
    return convertValueToKeyValueDecoded(key, null, true, fullKeys);
  }

  /**
  * An internal utility.
  * @param {Value} input
  * @param {Value[]|null|undefined} [seen]
  * @throws {DOMException} `DataError`
  * @returns {KeyValueObject}
  */
  function convertValueToKeyRethrowingAndIfInvalid(input, seen) {
    var key = convertValueToKey(input, seen);
    if (key.invalid) {
      throw createDOMException('DataError', key.message || 'Not a valid key; type: ' + key.type);
    }
    return key;
  }

  /**
   *
   * @param {Value} value
   * @param {KeyPath} keyPath
   * @param {boolean} multiEntry
   * @returns {KeyValueObject|KeyPathEvaluateValue}
   * @todo Document other possible return?
   */
  function extractKeyFromValueUsingKeyPath(value, keyPath, multiEntry) {
    return extractKeyValueDecodedFromValueUsingKeyPath(value, keyPath, multiEntry, true);
  }
  /**
  * Not currently in use.
  * @param {Value} value
  * @param {KeyPath} keyPath
  * @param {boolean} multiEntry
  * @returns {KeyPathEvaluateValue}
  */
  function evaluateKeyPathOnValue(value, keyPath, multiEntry) {
    return evaluateKeyPathOnValueToDecodedValue(value, keyPath);
  }

  /**
  * May throw, return `{failure: true}` (e.g., non-object on keyPath resolution)
  *    or `{invalid: true}` (e.g., `NaN`).
  * @param {Value} value
  * @param {KeyPath} keyPath
  * @param {boolean} [multiEntry]
  * @param {boolean} [fullKeys]
  * @returns {KeyValueObject|KeyPathEvaluateValue}
  * @todo Document other possible return?
  */
  function extractKeyValueDecodedFromValueUsingKeyPath(value, keyPath, multiEntry, fullKeys) {
    var r = evaluateKeyPathOnValueToDecodedValue(value, keyPath);
    if (r.failure) {
      return r;
    }
    if (!multiEntry) {
      return convertValueToKeyValueDecoded(r.value, null, false, fullKeys);
    }
    return convertValueToMultiEntryKeyDecoded(r.value, fullKeys);
  }

  /**
   * Unused?
   * @typedef {object} KeyPathEvaluateFailure
   * @property {boolean} failure
   */

  /**
   * @typedef {KeyPathEvaluateValueValue[]} KeyPathEvaluateValueValueArray
   */

  /**
   * @typedef {undefined|number|string|Date|object|KeyPathEvaluateValueValueArray} KeyPathEvaluateValueValue
   */

  /**
   * @typedef {object} KeyPathEvaluateValue
   * @property {KeyPathEvaluateValueValue} [value]
   * @property {boolean} [failure]
   */

  /**
   * Returns the value of an inline key based on a key path (wrapped in an
   *   object with key `value`) or `{failure: true}`
   * @param {Value} value
   * @param {KeyPath} keyPath
   * @param {boolean} [multiEntry]
   * @param {boolean} [fullKeys]
   * @returns {KeyPathEvaluateValue}
   */
  function evaluateKeyPathOnValueToDecodedValue(value, keyPath, multiEntry, fullKeys) {
    if (Array.isArray(keyPath)) {
      /** @type {KeyPathEvaluateValueValueArray} */
      var result = [];
      return keyPath.some(function (item) {
        var key = evaluateKeyPathOnValueToDecodedValue(value, item);
        if (key.failure) {
          return true;
        }
        result.push(key.value);
        return false;
      }) ? {
        failure: true
      } : {
        value: result
      };
    }
    if (keyPath === '') {
      return {
        value: value
      };
    }
    var identifiers = keyPath.split('.');
    return identifiers.some(function (idntfr, i) {
      if (idntfr === 'length' && (typeof value === 'string' || Array.isArray(value))) {
        value = value.length;
      } else if (isBlob(value)) {
        switch (idntfr) {
          case 'size':
          case 'type':
            value = /** @type {Blob} */value[idntfr];
            break;
        }
      } else if (isFile(value)) {
        switch (idntfr) {
          case 'name':
          case 'lastModified':
            value = /** @type {File} */value[idntfr];
            break;
          case 'lastModifiedDate':
            value = new Date( /** @type {File} */value.lastModified);
            break;
        }
      } else if (!isObj(value) || !Object.hasOwn(value, idntfr)) {
        return true;
      } else {
        value = /** @type {{[key: string]: KeyPathEvaluateValueValue}} */value[idntfr];
        return value === undefined;
      }
      return false;
    }) ? {
      failure: true
    } : {
      value: value
    };
  }

  /**
   * Sets the inline key value.
   * @param {{[key: string]: AnyValue}} value
   * @param {Key} key
   * @param {string} keyPath
   * @returns {void}
   */
  function injectKeyIntoValueUsingKeyPath(value, key, keyPath) {
    var identifiers = keyPath.split('.');
    var last = identifiers.pop();
    identifiers.forEach(function (identifier) {
      var hop = Object.hasOwn(value, identifier);
      if (!hop) {
        value[identifier] = {};
      }
      value = value[identifier];
    });
    value[/** @type {string} */last] = key; // key is already a `keyValue` in our processing so no need to convert
  }

  /**
   *
   * @param {Value} value
   * @param {string} keyPath
   * @see https://github.com/w3c/IndexedDB/pull/146
   * @returns {boolean}
   */
  function checkKeyCouldBeInjectedIntoValue(value, keyPath) {
    var identifiers = keyPath.split('.');
    identifiers.pop();
    var _iterator3 = _createForOfIteratorHelper(identifiers),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var identifier = _step3.value;
        if (!isObj(value)) {
          return false;
        }
        var hop = Object.hasOwn(value, identifier);
        if (!hop) {
          return true;
        }
        value = /** @type {{[key: string]: Value}} */value[identifier];
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return isObj(value);
  }

  /**
   *
   * @param {Key} key
   * @param {import('./IDBKeyRange.js').IDBKeyRangeFull} range
   * @param {boolean} [checkCached]
   * @returns {boolean}
   */
  function isKeyInRange(key, range, checkCached) {
    var lowerMatch = range.lower === undefined;
    var upperMatch = range.upper === undefined;
    var encodedKey = _encode(key, true);
    var lower = checkCached ? range.__lowerCached : _encode(range.lower, true);
    var upper = checkCached ? range.__upperCached : _encode(range.upper, true);
    if (!lowerMatch && (range.lowerOpen && encodedKey !== null && lower !== null && encodedKey > lower || !range.lowerOpen && (!encodedKey && !lower || encodedKey !== null && lower !== null && encodedKey >= lower))) {
      lowerMatch = true;
    }
    if (!upperMatch && (range.upperOpen && encodedKey !== null && upper !== null && encodedKey < upper || !range.upperOpen && (!encodedKey && !upper || encodedKey !== null && upper !== null && encodedKey <= upper))) {
      upperMatch = true;
    }
    return lowerMatch && upperMatch;
  }

  /**
   * Determines whether an index entry matches a multi-entry key value.
   * @param {string} encodedEntry     The entry value (already encoded)
   * @param {string} encodedKey       The full index key (already encoded)
   * @returns {boolean}
   */
  function isMultiEntryMatch(encodedEntry, encodedKey) {
    var keyType = encodedCharToKeyType[encodedKey.slice(0, 1)];
    if (keyType === 'array') {
      return encodedKey.indexOf(encodedEntry) > 1;
    }
    return encodedKey === encodedEntry;
  }

  /**
   *
   * @param {Key} keyEntry
   * @param {import('./IDBKeyRange.js').IDBKeyRangeFull|undefined} range
   * @returns {Key[]}
   */
  function findMultiEntryMatches(keyEntry, range) {
    var matches = [];
    if (Array.isArray(keyEntry)) {
      var _iterator4 = _createForOfIteratorHelper(keyEntry),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var key = _step4.value;
          if (Array.isArray(key)) {
            if (range && range.lower === range.upper) {
              continue;
            }
            if (key.length === 1) {
              key = key[0];
            } else {
              var nested = findMultiEntryMatches(key, range);
              if (nested.length > 0) {
                matches.push(key);
              }
              continue;
            }
          }
          if (isNullish(range) || isKeyInRange(key, range, true)) {
            matches.push(key);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    } else if (isNullish(range) || isKeyInRange(keyEntry, range, true)) {
      matches.push(keyEntry);
    }
    return matches;
  }

  /**
  * Not currently in use but keeping for spec parity.
  * @param {Key} key
  * @throws {Error} Upon a "bad key"
  * @returns {ValueType}
  */
  function convertKeyToValue(key) {
    var type = key.type,
      value = key.value;
    switch (type) {
      case 'number':
      case 'string':
        {
          return value;
        }
      case 'array':
        {
          var array = [];
          var len = value.length;
          var index = 0;
          while (index < len) {
            var entry = convertKeyToValue(value[index]);
            array[index] = entry;
            index++;
          }
          return array;
        }
      case 'date':
        {
          return new Date(value);
        }
      case 'binary':
        {
          var _len = value.length;
          var buffer = new ArrayBuffer(_len);
          // Set the entries in buffer's [[ArrayBufferData]] to those in `value`
          var uint8 = new Uint8Array(buffer, value.byteOffset || 0, value.byteLength);
          uint8.set(value);
          return buffer;
        }
      case 'invalid':
      default:
        throw new Error('Bad key');
    }
  }

  /**
   *
   * @param {Key} key
   * @param {boolean} [inArray]
   * @returns {string|null}
   */
  function _encode(key, inArray) {
    // Bad keys like `null`, `object`, `boolean`, 'function', 'symbol' should not be passed here due to prior validation
    if (key === undefined) {
      return null;
    }
    // array, date, number, string, binary (should already have detected "invalid")
    return types[getKeyType(key)].encode(key, inArray);
  }

  /**
   *
   * @param {Key} key
   * @param {boolean} [inArray]
   * @throws {Error} Invalid number
   * @returns {undefined|ValueType}
   */
  function _decode(key, inArray) {
    if (typeof key !== 'string') {
      return undefined;
    }
    return types[encodedCharToKeyType[key.slice(0, 1)]].decode(key, inArray);
  }

  /**
   *
   * @param {Key} key
   * @param {boolean} [inArray]
   * @returns {undefined|ValueType}
   */
  function roundTrip(key, inArray) {
    return _decode(_encode(key, inArray), inArray);
  }
  var MAX_ALLOWED_CURRENT_NUMBER = 9007199254740992; // 2 ^ 53 (Also equal to `Number.MAX_SAFE_INTEGER + 1`)

  /**
   * @typedef {number} Integer
   */

  /**
   * @callback CurrentNumberCallback
   * @param {Integer} cn The current number
   * @returns {void}
   */

  /**
  * @callback SQLFailureCallback
  * @param {DOMException|Error} exception
  * @returns {void}
  */

  /**
   *
   * @param {SQLTransaction} tx
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {CurrentNumberCallback} func
   * @param {SQLFailureCallback} sqlFailCb
   * @returns {void}
   */
  function getCurrentNumber(tx, store, func, sqlFailCb) {
    tx.executeSql('SELECT "currNum" FROM __sys__ WHERE "name" = ?', [escapeSQLiteStatement(store.__currentName)], function (tx, data) {
      if (data.rows.length !== 1) {
        func(1);
      } else {
        func(data.rows.item(0).currNum);
      }
    }, function (tx, error) {
      sqlFailCb(createDOMException('DataError', 'Could not get the auto increment value for key', error));
      return true;
    });
  }

  /**
   *
   * @param {SQLTransaction} tx
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {Integer} num
   * @param {CurrentNumberCallback} successCb
   * @param {SQLFailureCallback} failCb
   * @returns {void}
   */
  function assignCurrentNumber(tx, store, num, successCb, failCb) {
    var sql = 'UPDATE __sys__ SET "currNum" = ? WHERE "name" = ?';
    var sqlValues = [num, escapeSQLiteStatement(store.__currentName)];
    CFG.DEBUG && console.log(sql, sqlValues);
    tx.executeSql(sql, sqlValues, function (tx, data) {
      successCb(num);
    }, function (tx, err) {
      failCb(createDOMException('UnknownError', 'Could not set the auto increment value for key', err));
      return true;
    });
  }

  /**
   * Bump up the auto-inc counter if the key path-resolved value is valid
   *   (greater than old value and >=1) OR if a manually passed in key is
   *   valid (numeric and >= 1) and >= any primaryKey.
   * @param {SQLTransaction} tx
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {Integer} num
   * @param {CurrentNumberCallback} successCb
   * @param {SQLFailureCallback} failCb
   * @returns {void}
   */
  function setCurrentNumber(tx, store, num, successCb, failCb) {
    num = num === MAX_ALLOWED_CURRENT_NUMBER ? num + 2 // Since incrementing by one will have no effect in JavaScript on this unsafe max, we represent the max as a number incremented by two. The getting of the current number is never returned to the user and is only used in safe comparisons, so it is safe for us to represent it in this manner
    : num + 1;
    return assignCurrentNumber(tx, store, num, successCb, failCb);
  }

  /**
   * @callback KeyForStoreCallback
   * @param {"failure"|null} arg1
   * @param {Integer} [arg2]
   * @param {Integer} [arg3]
   * @returns {void}
   */

  /**
   *
   * @param {SQLTransaction} tx
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {KeyForStoreCallback} cb
   * @param {SQLFailureCallback} sqlFailCb
   * @returns {void}
   */
  function generateKeyForStore(tx, store, cb, sqlFailCb) {
    getCurrentNumber(tx, store, function (key) {
      if (key > MAX_ALLOWED_CURRENT_NUMBER) {
        // 2 ^ 53 (See <https://github.com/w3c/IndexedDB/issues/147>)
        cb('failure'); // eslint-disable-line n/no-callback-literal
        return;
      }
      // Increment current number by 1 (we cannot leverage SQLite's
      //  autoincrement (and decrement when not needed), as decrementing
      //  will be overwritten/ignored upon the next insert)
      setCurrentNumber(tx, store, key, function () {
        cb(null, key, key);
      }, sqlFailCb);
    }, sqlFailCb);
  }

  // Fractional or numbers exceeding the max do not get changed in the result
  //     per https://github.com/w3c/IndexedDB/issues/147
  //     so we do not return a key
  /**
   *
   * @param {SQLTransaction} tx
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {import('./Key.js').Key} key
   * @param {(num?: Integer) => void} successCb
   * @param {SQLFailureCallback} sqlFailCb
   * @returns {void}
   */
  function possiblyUpdateKeyGenerator(tx, store, key, successCb, sqlFailCb) {
    // Per https://github.com/w3c/IndexedDB/issues/147 , non-finite numbers
    //   (or numbers larger than the max) are now to have the explicit effect of
    //   setting the current number (up to the max), so we do not optimize them
    //   out here
    if (typeof key !== 'number' || key < 1) {
      // Optimize with no need to get the current number
      // Auto-increment attempted with a bad key;
      //   we are not to change the current number, but the steps don't call for failure
      // Numbers < 1 are optimized out as they will never be greater than the current number which must be at least 1
      successCb();
    } else {
      // If auto-increment and the keyPath item is a valid numeric key, get the old auto-increment to compare if the new is higher
      //  to determine which to use and whether to update the current number
      getCurrentNumber(tx, store, function (cn) {
        var value = Math.floor(Math.min(key, MAX_ALLOWED_CURRENT_NUMBER));
        var useNewKeyForAutoInc = value >= cn;
        if (useNewKeyForAutoInc) {
          setCurrentNumber(tx, store, value, function () {
            successCb(cn); // Supply old current number in case needs to be reverted
          }, sqlFailCb);
        } else {
          // Not updated
          successCb();
        }
      }, sqlFailCb);
    }
  }

  var Key = /*#__PURE__*/Object.freeze({
    __proto__: null,
    assignCurrentNumber: assignCurrentNumber,
    checkKeyCouldBeInjectedIntoValue: checkKeyCouldBeInjectedIntoValue,
    convertKeyToValue: convertKeyToValue,
    convertValueToKey: convertValueToKey,
    convertValueToKeyRethrowingAndIfInvalid: convertValueToKeyRethrowingAndIfInvalid,
    convertValueToKeyValueDecoded: convertValueToKeyValueDecoded,
    convertValueToMultiEntryKey: convertValueToMultiEntryKey,
    convertValueToMultiEntryKeyDecoded: convertValueToMultiEntryKeyDecoded,
    decode: _decode,
    encode: _encode,
    evaluateKeyPathOnValue: evaluateKeyPathOnValue,
    extractKeyFromValueUsingKeyPath: extractKeyFromValueUsingKeyPath,
    extractKeyValueDecodedFromValueUsingKeyPath: extractKeyValueDecodedFromValueUsingKeyPath,
    findMultiEntryMatches: findMultiEntryMatches,
    generateKeyForStore: generateKeyForStore,
    injectKeyIntoValueUsingKeyPath: injectKeyIntoValueUsingKeyPath,
    isKeyInRange: isKeyInRange,
    isMultiEntryMatch: isMultiEntryMatch,
    possiblyUpdateKeyGenerator: possiblyUpdateKeyGenerator,
    roundTrip: roundTrip
  });

  var readonlyProperties$4 = /** @type {const} */['lower', 'upper', 'lowerOpen', 'upperOpen'];

  /**
   * @typedef {globalThis.IDBKeyRange & {
  *   __lowerCached: string|null|false,
  *   __upperCached: string|null|false,
  *   __lowerOpen: boolean,
  * }} IDBKeyRangeFull
  */

  /**
   * The IndexedDB KeyRange object.
   * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#dfn-key-range
   * @throws {TypeError}
   * @class
   */
  function IDBKeyRange() {
    this.__lowerOpen = false;
    this.__upperOpen = false;
    throw new TypeError('Illegal constructor');
  }
  var IDBKeyRangeAlias = IDBKeyRange;

  /**
   * @param {import('./Key.js').Key|null} lower
   * @param {import('./Key.js').Key|null} upper
   * @param {boolean} lowerOpen
   * @param {boolean} upperOpen
   * @returns {import('./IDBKeyRange.js').IDBKeyRangeFull}
   */
  IDBKeyRange.__createInstance = function (lower, upper, lowerOpen, upperOpen) {
    /**
     * @class
     */
    function IDBKeyRange() {
      this[Symbol.toStringTag] = 'IDBKeyRange';
      if (lower === undefined && upper === undefined) {
        throw createDOMException('DataError', 'Both arguments to the key range method cannot be undefined');
      }
      var lowerConverted, upperConverted;
      if (lower !== undefined) {
        lowerConverted = roundTrip(lower); // Todo: does this make the "conversions" redundant
        convertValueToKeyRethrowingAndIfInvalid(lower);
      }
      if (upper !== undefined) {
        upperConverted = roundTrip(upper); // Todo: does this make the "conversions" redundant
        convertValueToKeyRethrowingAndIfInvalid(upper);
      }
      if (lower !== undefined && upper !== undefined && lower !== upper) {
        if ( /** @type {string} */_encode(lower) > /** @type {string} */_encode(upper)) {
          throw createDOMException('DataError', '`lower` must not be greater than `upper` argument in `bound()` call.');
        }
      }
      this.__lower = lowerConverted;
      this.__upper = upperConverted;
      this.__lowerOpen = Boolean(lowerOpen);
      this.__upperOpen = Boolean(upperOpen);
    }
    IDBKeyRange.prototype = IDBKeyRangeAlias.prototype;

    // @ts-expect-error Properties added by `defineProperty/ies`
    return new IDBKeyRange();
  };

  /**
   * @param {import('./Key.js').Key} key
   * @this {IDBKeyRangeFull}
   * @returns {boolean}
   */
  IDBKeyRange.prototype.includes = function (key) {
    // We can't do a regular instanceof check as it will create a loop given our hasInstance implementation
    if (!isObj(this) || typeof this.__lowerOpen !== 'boolean') {
      throw new TypeError('Illegal invocation');
    }
    if (!arguments.length) {
      throw new TypeError('IDBKeyRange.includes requires a key argument');
    }
    convertValueToKeyRethrowingAndIfInvalid(key);
    return isKeyInRange(key, this);
  };

  /**
   * @param {import('./Key.js').Value} value
   * @returns {import('./IDBKeyRange.js').IDBKeyRangeFull}
   */
  IDBKeyRange.only = function (value) {
    if (!arguments.length) {
      throw new TypeError('IDBKeyRange.only requires a value argument');
    }
    return IDBKeyRange.__createInstance(value, value, false, false);
  };

  /**
   * @param {import('./Key.js').Value} value
   * @returns {globalThis.IDBKeyRange}
   */
  IDBKeyRange.lowerBound = function (value /*, open */) {
    if (!arguments.length) {
      throw new TypeError('IDBKeyRange.lowerBound requires a value argument');
    }
    // eslint-disable-next-line prefer-rest-params
    return IDBKeyRange.__createInstance(value, undefined, arguments[1], true);
  };

  /**
   * @param {import('./Key.js').Value} value
   * @returns {globalThis.IDBKeyRange}
   */
  IDBKeyRange.upperBound = function (value /*, open */) {
    if (!arguments.length) {
      throw new TypeError('IDBKeyRange.upperBound requires a value argument');
    }
    // eslint-disable-next-line prefer-rest-params
    return IDBKeyRange.__createInstance(undefined, value, true, arguments[1]);
  };

  /**
   * @param {import('./Key.js').Value} lower
   * @param {import('./Key.js').Value} upper
   * @returns {globalThis.IDBKeyRange}
   */
  IDBKeyRange.bound = function (lower, upper /* , lowerOpen, upperOpen */) {
    if (arguments.length <= 1) {
      throw new TypeError('IDBKeyRange.bound requires lower and upper arguments');
    }
    // eslint-disable-next-line prefer-rest-params
    return IDBKeyRange.__createInstance(lower, upper, arguments[2], arguments[3]);
  };
  IDBKeyRange.prototype[Symbol.toStringTag] = 'IDBKeyRangePrototype';
  readonlyProperties$4.forEach(function (prop) {
    Object.defineProperty(IDBKeyRange.prototype, '__' + prop, {
      enumerable: false,
      configurable: false,
      writable: true
    });
    // Ensure for proper interface testing that "get <name>" is the function name
    var o = _defineAccessor("get", {}, prop, function () {
      // We can't do a regular instanceof check as it will create a loop given our hasInstance implementation
      if (!isObj(this) || typeof this.__lowerOpen !== 'boolean') {
        throw new TypeError('Illegal invocation');
      }
      return this['__' + prop];
    });
    var desc = /** @type {PropertyDescriptor} */
    Object.getOwnPropertyDescriptor(o, prop);
    // desc.enumerable = true; // Default
    // desc.configurable = true; // Default
    Object.defineProperty(IDBKeyRange.prototype, prop, desc);
  });
  Object.defineProperty(IDBKeyRange, Symbol.hasInstance, {
    value:
    /**
     * @param {object} obj
     * @returns {boolean}
     */
    function value(obj) {
      return isObj(obj) && 'upper' in obj && 'lowerOpen' in obj && typeof obj.lowerOpen === 'boolean';
    }
  });
  Object.defineProperty(IDBKeyRange, 'prototype', {
    writable: false
  });

  /**
   * @param {IDBKeyRangeFull|undefined} range
   * @param {string} quotedKeyColumnName
   * @param {string[]} sql
   * @param {string[]} sqlValues
   * @param {boolean} [addAnd]
   * @param {boolean} [checkCached]
   * @returns {void}
   */
  function setSQLForKeyRange(range, quotedKeyColumnName, sql, sqlValues, addAnd, checkCached) {
    if (range && (range.lower !== undefined || range.upper !== undefined)) {
      if (addAnd) sql.push('AND');
      var encodedLowerKey, encodedUpperKey;
      var hasLower = range.lower !== undefined;
      var hasUpper = range.upper !== undefined;
      if (hasLower) {
        encodedLowerKey = checkCached ? range.__lowerCached : _encode(range.lower);
      }
      if (hasUpper) {
        encodedUpperKey = checkCached ? range.__upperCached : _encode(range.upper);
      }
      if (hasLower) {
        sqlValues.push(escapeSQLiteStatement( /** @type {string} */encodedLowerKey));
        if (hasUpper && encodedLowerKey === encodedUpperKey && !range.lowerOpen && !range.upperOpen) {
          sql.push(quotedKeyColumnName, '=', '?');
          return;
        }
        sql.push(quotedKeyColumnName, range.lowerOpen ? '>' : '>=', '?');
      }
      hasLower && hasUpper && sql.push('AND');
      if (hasUpper) {
        sql.push(quotedKeyColumnName, range.upperOpen ? '<' : '<=', '?');
        sqlValues.push(escapeSQLiteStatement( /** @type {string} */encodedUpperKey));
      }
    }
  }

  /**
   * @param {import('./Key.js').Value} value
   * @param {boolean} [nullDisallowed]
   * @throws {DOMException}
   * @returns {import('./IDBKeyRange.js').IDBKeyRangeFull|undefined}
   */
  function convertValueToKeyRange(value, nullDisallowed) {
    if (instanceOf(value, IDBKeyRange)) {
      // We still need to validate IDBKeyRange-like objects (the above check is based on loose duck-typing)
      if (value.toString() !== '[object IDBKeyRange]') {
        return IDBKeyRange.__createInstance(value.lower, value.upper, value.lowerOpen, value.upperOpen);
      }
      return value;
    }
    if (isNullish(value)) {
      if (nullDisallowed) {
        throw createDOMException('DataError', 'No key or range was specified');
      }
      return undefined; // Represents unbounded
    }

    convertValueToKeyRethrowingAndIfInvalid(value);
    return IDBKeyRange.only(value);
  }

  var _DOMStringList$protot;
  /**
   * @typedef {number} Integer
   */

  /**
   * @typedef {{
   *   _items: string[],
   *   _length: Integer,
   *   [key: number]: string,
   *   addIndexes: () => void,
   *   sortList: () => string[],
   *   push: (item: string) => void,
   *   clone: () => DOMStringListFull,
   *   contains: (str: string) => boolean,
   *   indexOf: (str: string) => Integer,
   *   splice: (index: Integer, howmany: Integer, ...args: any) => void
   *   length: Integer
   * }} DOMStringListFull
   */

  var cleanInterface = false;
  var testObject = {
    test: true
  };
  // Test whether Object.defineProperty really works.
  if (Object.defineProperty) {
    try {
      Object.defineProperty(testObject, 'test', {
        enumerable: false
      });
      if (testObject.test) {
        cleanInterface = true;
      }
    } catch (e) {
      // Object.defineProperty does not work as intended.
    }
  }

  /**
   * Shim the DOMStringList object.
   * @throws {TypeError}
   * @class
   */
  var DOMStringList = function DOMStringList() {
    /** @type {string[]} */
    this._items = [];
    /** @type {Integer} */
    this._length = 0;
    throw new TypeError('Illegal constructor');
  };

  // @ts-expect-error It's ok
  DOMStringList.prototype = (_DOMStringList$protot = {
    constructor: DOMStringList,
    // Interface.
    /**
     * @param {string} str
     * @returns {boolean}
     */
    contains: function contains(str) {
      if (!arguments.length) {
        throw new TypeError('DOMStringList.contains must be supplied a value');
      }
      return this._items.includes(str);
    },
    /**
     * @param {number} key
     * @returns {string|null}
     */
    item: function item(key) {
      if (!arguments.length) {
        throw new TypeError('DOMStringList.item must be supplied a value');
      }
      if (key < 0 || key >= this.length || !Number.isInteger(key)) {
        return null;
      }
      return this._items[key];
    },
    // Helpers. Should only be used internally.
    /**
     * @returns {DOMStringListFull}
     */
    clone: function clone() {
      var stringList = DOMStringList.__createInstance();
      stringList._items = this._items.slice();
      stringList._length = this.length;
      stringList.addIndexes();
      return stringList;
    },
    /**
     * @this {DOMStringListFull}
     * @returns {void}
     */
    addIndexes: function addIndexes() {
      for (var i = 0; i < this._items.length; i++) {
        this[i] = this._items[i];
      }
    },
    /**
     * @this {DOMStringListFull}
     * @returns {string[]}
     */
    sortList: function sortList() {
      // http://w3c.github.io/IndexedDB/#sorted-list
      // https://tc39.github.io/ecma262/#sec-abstract-relational-comparison
      this._items.sort();
      this.addIndexes();
      return this._items;
    },
    /**
     * @param {(value: string, i: Integer, arr: string[]) => void} cb
     * @param {object} thisArg
     * @returns {void}
     */
    forEach: function forEach(cb, thisArg) {
      // eslint-disable-next-line unicorn/no-array-callback-reference, unicorn/no-array-method-this-argument
      this._items.forEach(cb, thisArg);
    },
    /**
     * @param {(value: string, i: Integer, arr: string[]) => any[]} cb
     * @param {object} thisArg
     * @returns {any[]}
     */
    map: function map(cb, thisArg) {
      // eslint-disable-next-line unicorn/no-array-callback-reference, unicorn/no-array-method-this-argument
      return this._items.map(cb, thisArg);
    },
    /**
     * @param {string} str
     * @returns {Integer}
     */
    indexOf: function indexOf(str) {
      return this._items.indexOf(str);
    },
    /**
     * @param {string} item
     * @this {DOMStringListFull}
     * @returns {void}
     */
    push: function push(item) {
      this._items.push(item);
      this._length++;
      this.sortList();
    },
    /**
     * @typedef {any} AnyArgs
     */
    /**
     * @param {[index: Integer, howmany: Integer, ...args: any]} args
     * @this {DOMStringListFull}
     * @returns {void}
     */
    splice: function splice() {
      var _this$_items;
      (_this$_items = this._items).splice.apply(_this$_items, arguments);
      this._length = this._items.length;
      for (var i in this) {
        if (i === String(Number.parseInt(i))) {
          delete this[i];
        }
      }
      this.sortList();
    }
  }, _defineProperty$1(_DOMStringList$protot, Symbol.toStringTag, 'DOMStringListPrototype'), _defineProperty$1(_DOMStringList$protot, Symbol.iterator, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var i;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          i = 0;
        case 1:
          if (!(i < this._items.length)) {
            _context.next = 6;
            break;
          }
          _context.next = 4;
          return this._items[i++];
        case 4:
          _context.next = 1;
          break;
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  })), _DOMStringList$protot);

  /**
   * @typedef {any} AnyValue
   */
  Object.defineProperty(DOMStringList, Symbol.hasInstance, {
    /**
     * @param {AnyValue} obj
     * @returns {boolean}
     */
    value: function value(obj) {
      return Object.prototype.toString.call(obj) === 'DOMStringListPrototype';
    }
  });
  var DOMStringListAlias = DOMStringList;
  Object.defineProperty(DOMStringList, '__createInstance', {
    /**
     * @returns {DOMStringListFull}
     */
    value: function value() {
      /**
       * @class
       * @this {DOMStringList}
       */
      var DOMStringList = function DOMStringList() {
        this.toString = function () {
          return '[object DOMStringList]';
        };
        // Internal functions on the prototype have been made non-enumerable below.
        Object.defineProperty(this, 'length', {
          enumerable: true,
          get: function get() {
            return this._length;
          }
        });
        this._items = /** @type {string[]} */[];
        this._length = 0;
      };
      DOMStringList.prototype = DOMStringListAlias.prototype;
      return (/** @type {DOMStringListFull} */new DOMStringList()
      );
    }
  });
  if (cleanInterface) {
    Object.defineProperty(DOMStringList, 'prototype', {
      writable: false
    });
    var nonenumerableReadonly = ['addIndexes', 'sortList', 'forEach', 'map', 'indexOf', 'push', 'splice', 'constructor', '__createInstance'];
    nonenumerableReadonly.forEach(function (nonenumerableReadonly) {
      Object.defineProperty(DOMStringList.prototype, nonenumerableReadonly, {
        enumerable: false
      });
    });

    // Illegal invocations
    // @ts-expect-error No return value
    Object.defineProperty(DOMStringList.prototype, 'length', {
      configurable: true,
      enumerable: true,
      get: function get() {
        throw new TypeError('Illegal invocation');
      }
    });
    var nonenumerableWritable = ['_items', '_length'];
    nonenumerableWritable.forEach(function (nonenumerableWritable) {
      Object.defineProperty(DOMStringList.prototype, nonenumerableWritable, {
        enumerable: false,
        writable: true
      });
    });
  }

  var uniqueID = 0;
  var listeners$1 = ['onabort', 'oncomplete', 'onerror'];
  var readonlyProperties$3 = ['objectStoreNames', 'mode', 'db', 'error'];

  /**
   * @typedef {number} Integer
   */

  /**
   * @typedef {{
   *   op: SQLCallback,
   *   args: ObjectArray,
   *   req: import('./IDBRequest.js').IDBRequestFull|null
   * }} RequestInfo
   */

  /**
   * @typedef {EventTarget & {
   *   mode: "readonly"|"readwrite"|"versionchange",
   *   db: import('./IDBDatabase.js').IDBDatabaseFull,
   *   on__abort: () => void,
   *   on__complete: () => void,
   *   on__beforecomplete: (ev: Event & {
   *     complete: () => void
   *   }) => void,
   *   on__preabort: () => void,
   *   __abortTransaction: (err: Error|DOMException|null) => void,
   *   __executeRequests: () => void,
   *   __tx: SQLTransaction,
   *   __id: Integer,
   *   __active: boolean,
   *   __running: boolean,
   *   __errored: boolean,
   *   __requests: RequestInfo[],
   *   __db: import('./IDBDatabase.js').IDBDatabaseFull,
   *   __mode: string,
   *   __error: null|DOMException|Error,
   *   __objectStoreNames: import('./DOMStringList.js').DOMStringListFull,
   *   __storeHandles: {
   *     [key: string]: import('./IDBObjectStore.js').IDBObjectStoreFull
   *   },
   *   __requestsFinished: boolean,
   *   __transFinishedCb: (err: boolean, cb: ((bool?: boolean) => void)) => void,
   *   __transactionEndCallback: () => void,
   *   __transactionFinished: boolean,
   *   __completed: boolean,
   *   __internal: boolean,
   *   __abortFinished: boolean,
   *   __createRequest: (
   *     source: import('./IDBDatabase.js').IDBDatabaseFull|
   *       import('./IDBObjectStore.js').IDBObjectStoreFull|
   *       import('./IDBIndex.js').IDBIndexFull|
   *       import('./IDBCursor.js').IDBCursorFull
   *   ) => import('./IDBRequest.js').IDBRequestFull,
   *   __pushToQueue: (
   *     request: import('./IDBRequest.js').IDBRequestFull|null,
   *     callback: SQLCallback,
   *     args?: ObjectArray
   *   ) => void,
   *   __assertActive: () => void,
   *   __addNonRequestToTransactionQueue: (
   *     callback: SQLCallback,
   *     args?: ObjectArray
   *   ) => void
   *   __addToTransactionQueue: (
   *     callback: SQLCallback,
   *     args: ObjectArray|undefined,
   *     source: import('./IDBDatabase.js').IDBDatabaseFull|
   *       import('./IDBObjectStore.js').IDBObjectStoreFull|
   *       import('./IDBIndex.js').IDBIndexFull|
   *       import('./IDBCursor.js').IDBCursorFull
   *   ) => import('./IDBRequest.js').IDBRequestFull
   *   __assertWritable: () => void,
   * }} IDBTransactionFull
   */

  /**
   * The IndexedDB Transaction.
   * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBTransaction
   * @class
   */
  function IDBTransaction() {
    throw new TypeError('Illegal constructor');
  }
  var IDBTransactionAlias = IDBTransaction;
  /**
   * @param {import('./IDBDatabase.js').IDBDatabaseFull} db
   * @param {import('./DOMStringList.js').DOMStringListFull} storeNames
   * @param {string} mode
   * @returns {IDBTransactionFull}
   */
  IDBTransaction.__createInstance = function (db, storeNames, mode) {
    /**
     * @class
     * @this {IDBTransactionFull}
     */
    function IDBTransaction() {
      var _this = this;
      var me = this;
      // @ts-expect-error It's ok
      me[Symbol.toStringTag] = 'IDBTransaction';
      defineReadonlyProperties(me, readonlyProperties$3);
      me.__id = ++uniqueID; // for debugging simultaneous transactions
      me.__active = true;
      me.__running = false;
      me.__errored = false;
      me.__requests = [];
      me.__objectStoreNames = storeNames;
      me.__mode = mode;
      me.__db = db;
      me.__error = null;
      // @ts-expect-error Part of `ShimEventTarget`
      me.__setOptions({
        legacyOutputDidListenersThrowFlag: true // Event hook for IndexedB
      });

      readonlyProperties$3.forEach(function (readonlyProp) {
        Object.defineProperty(_this, readonlyProp, {
          configurable: true
        });
      });
      defineListenerProperties(this, listeners$1);
      me.__storeHandles = {};

      // Kick off the transaction as soon as all synchronous code is done
      setTimeout(function () {
        me.__executeRequests();
      }, 0);
    }
    IDBTransaction.prototype = IDBTransactionAlias.prototype;

    // @ts-expect-error It's ok
    return new IDBTransaction();
  };

  // @ts-expect-error It's ok
  IDBTransaction.prototype = EventTargetFactory.createInstance({
    defaultSync: true,
    // Ensure EventTarget preserves our properties
    extraProperties: ['complete']
  });

  /**
   *
   * @param {boolean} err
   * @param {(bool: boolean) => void} cb
   * @returns {void}
   */
  IDBTransaction.prototype.__transFinishedCb = function (err, cb) {
    cb(Boolean(err));
  };
  /**
   * @this {IDBTransactionFull}
   * @returns {void}
   */
  IDBTransaction.prototype.__executeRequests = function () {
    var me = this;
    if (me.__running) {
      CFG.DEBUG && console.log('Looks like the request set is already running', me.mode);
      return;
    }
    me.__running = true;
    me.db.__db[me.mode === 'readonly' ? 'readTransaction' : 'transaction'](
    // `readTransaction` is optimized, at least in `node-websql`
    function executeRequests(tx) {
      me.__tx = tx;
      /** @type {RequestInfo} */
      var q,
        i = -1;

      /**
       * @typedef {any} IDBRequestResult
       */

      /**
       * @param {IDBRequestResult} [result]
       * @param {import('./IDBRequest.js').IDBRequestFull} [req]
       * @returns {void}
       */
      function success(result, req) {
        if (me.__errored || me.__requestsFinished) {
          // We've already called "onerror", "onabort", or thrown within the transaction, so don't do it again.
          return;
        }
        if (req) {
          q.req = req; // Need to do this in case of cursors
        }

        if (!q.req) {
          // TS guard
          return;
        }
        if (q.req.__done) {
          // Avoid continuing with aborted requests
          return;
        }
        q.req.__done = true;
        q.req.__result = result;
        q.req.__error = null;
        me.__active = true;
        var e = createEvent('success');
        q.req.dispatchEvent(e);
        // Do not set __active flag to false yet: https://github.com/w3c/IndexedDB/issues/87
        if (e.__legacyOutputDidListenersThrowError) {
          logError('Error', 'An error occurred in a success handler attached to request chain', e.__legacyOutputDidListenersThrowError); // We do nothing else with this error as per spec
          // me.__active = false;
          me.__abortTransaction(createDOMException('AbortError', 'A request was aborted (in user handler after success).'));
          return;
        }
        executeNextRequest();
      }

      /**
       * @param {[tx: SQLTransaction|DOMException|Error|SQLError, err?: SQLError]} args
       * @returns {void}
       */
      function error() {
        if (me.__errored || me.__requestsFinished) {
          // We've already called "onerror", "onabort", or thrown within
          //  the transaction, so don't do it again.
          return;
        }
        if (q.req && q.req.__done) {
          // Avoid continuing with aborted requests
          return;
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var err = /** @type {Error|DOMException} */findError(args);
        if (!q.req) {
          me.__abortTransaction(err);
          return;
        }

        // Fire an error event for the current IDBRequest
        q.req.__done = true;
        q.req.__error = err;
        q.req.__result = undefined; // Must be undefined if an error per `result` getter
        q.req.addLateEventListener('error', function (e) {
          if (e.cancelable && e.defaultPrevented && !e.__legacyOutputDidListenersThrowError) {
            executeNextRequest();
          }
        });
        q.req.addDefaultEventListener('error', function () {
          if (!q.req) {
            // TS guard
            return;
          }
          me.__abortTransaction(q.req.__error);
        });
        me.__active = true;
        var e = createEvent('error', err, {
          bubbles: true,
          cancelable: true
        });
        q.req.dispatchEvent(e);
        // Do not set __active flag to false yet: https://github.com/w3c/IndexedDB/issues/87
        if (e.__legacyOutputDidListenersThrowError) {
          logError('Error', 'An error occurred in an error handler attached to request chain', e.__legacyOutputDidListenersThrowError); // We do nothing else with this error as per spec
          e.preventDefault(); // Prevent 'error' default as steps indicate we should abort with `AbortError` even without cancellation
          me.__abortTransaction(createDOMException('AbortError', 'A request was aborted (in user handler after error).'));
        }
      }

      /**
       * @returns {void}
       */
      function executeNextRequest() {
        if (me.__errored || me.__requestsFinished) {
          // We've already called "onerror", "onabort", or thrown within the transaction, so don't do it again.
          return;
        }
        i++;
        if (i >= me.__requests.length) {
          // All requests in the transaction are done
          me.__requests = [];
          if (me.__active) {
            requestsFinished();
          }
        } else {
          try {
            q = me.__requests[i];
            if (!q.req) {
              q.op(tx, q.args, executeNextRequest, error);
              return;
            }
            if (q.req.__done) {
              // Avoid continuing with aborted requests
              return;
            }
            q.op(tx, q.args, success, error, executeNextRequest);
          } catch (e) {
            error( /** @type {Error} */e);
          }
        }
      }
      executeNextRequest();
    }, function webSQLError(webSQLErr) {
      // @ts-expect-error It's ok
      if (webSQLErr === true) {
        // Not a genuine SQL error
        return;
      }
      var err = webSQLErrback( /** @type {SQLError} */webSQLErr);
      me.__abortTransaction(err);
    }, function () {
      // For Node, we don't need to try running here as we can keep
      //   the transaction running long enough to rollback (in the
      //   next (non-standard) callback for this transaction call)
      if (me.__transFinishedCb !== IDBTransaction.prototype.__transFinishedCb) {
        // Node
        return;
      }
      if (!me.__transactionEndCallback && !me.__requestsFinished) {
        me.__transactionFinished = true;
        return;
      }
      if (me.__transactionEndCallback && !me.__completed) {
        me.__transFinishedCb(me.__errored, me.__transactionEndCallback);
      }
    }, function (currentTask, err, done, rollback, commit) {
      if (currentTask.readOnly || err) {
        return true;
      }
      me.__transFinishedCb = function (err, cb) {
        if (err) {
          rollback(err, cb);
        } else {
          commit(cb);
        }
      };
      if (me.__transactionEndCallback && !me.__completed) {
        me.__transFinishedCb(me.__errored, me.__transactionEndCallback);
      }
      return false;
    });

    /**
     * @returns {void}
     */
    function requestsFinished() {
      me.__active = false;
      me.__requestsFinished = true;

      /**
       * @throws {Error}
       * @returns {void}
       */
      function complete() {
        me.__completed = true;
        CFG.DEBUG && console.log('Transaction completed');
        var evt = createEvent('complete');
        try {
          me.__internal = true;
          me.dispatchEvent(evt);
          me.__internal = false;
          me.dispatchEvent(createEvent('__complete'));
        } catch (e) {
          me.__internal = false;
          // An error occurred in the "oncomplete" handler.
          // It's too late to call "onerror" or "onabort". Throw a global error instead.
          // (this may seem odd/bad, but it's how all native IndexedDB implementations work)
          me.__errored = true;
          throw e;
        } finally {
          me.__storeHandles = {};
        }
      }
      if (me.mode === 'readwrite') {
        if (me.__transactionFinished) {
          complete();
          return;
        }
        me.__transactionEndCallback = complete;
        return;
      }
      if (me.mode === 'readonly') {
        complete();
        return;
      }
      var ev = /** @type {Event & {complete: () => void}} */
      createEvent('__beforecomplete');
      ev.complete = complete;
      me.dispatchEvent(ev);
    }
  };

  /**
   * Creates a new IDBRequest for the transaction.
   * NOTE: The transaction is not queued until you call {@link IDBTransaction#__pushToQueue}.
   * @param {import('./IDBDatabase.js').IDBDatabaseFull} source
   * @this {IDBTransactionFull}
   * @returns {IDBRequest}
   */
  IDBTransaction.prototype.__createRequest = function (source) {
    var me = this;
    var request = IDBRequest.__createInstance();
    request.__source = source !== undefined ? source : me.db;
    request.__transaction = me;
    return request;
  };

  /**
   * @typedef {(
   *   tx: SQLTransaction,
   *   args: ObjectArray,
   *   success: (result?: any, req?: import('./IDBRequest.js').IDBRequestFull) => void,
   *   error: (tx: SQLTransaction|Error|DOMException|SQLError, err?: SQLError) => void,
   *   executeNextRequest?: () => void
   * ) => void} SQLCallback
   */

  /**
   * Adds a callback function to the transaction queue.
   * @param {SQLCallback} callback
   * @param {ObjectArray} args
   * @param {import('./IDBDatabase.js').IDBDatabaseFull|
   *   import('./IDBObjectStore.js').IDBObjectStoreFull|
   *   import('./IDBIndex.js').IDBIndexFull} source
   * @this {IDBTransactionFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBTransaction.prototype.__addToTransactionQueue = function (callback, args, source) {
    var request = this.__createRequest(source);
    this.__pushToQueue(request, callback, args);
    return request;
  };

  /**
   * Adds a callback function to the transaction queue without generating a
   *   request.
   * @param {SQLCallback} callback
   * @param {ObjectArray} args
   * @this {IDBTransactionFull}
   * @returns {void}
   */
  IDBTransaction.prototype.__addNonRequestToTransactionQueue = function (callback, args) {
    this.__pushToQueue(null, callback, args);
  };

  /**
   * Adds an IDBRequest to the transaction queue.
   * @param {import('./IDBRequest.js').IDBRequestFull|null} request
   * @param {SQLCallback} callback
   * @param {ObjectArray} args
   * @this {IDBTransactionFull}
   * @returns {void}
   */
  IDBTransaction.prototype.__pushToQueue = function (request, callback, args) {
    this.__assertActive();
    this.__requests.push({
      op: callback,
      args: args,
      req: request
    });
  };

  /**
   * @throws {DOMException}
   * @returns {void}
   */
  IDBTransaction.prototype.__assertActive = function () {
    if (!this.__active) {
      throw createDOMException('TransactionInactiveError', 'A request was placed against a transaction which is currently not active, or which is finished');
    }
  };

  /**
   * @throws {DOMException}
   * @this {IDBTransactionFull}
   * @returns {void}
   */
  IDBTransaction.prototype.__assertWritable = function () {
    if (this.mode === 'readonly') {
      throw createDOMException('ReadOnlyError', 'The transaction is read only');
    }
  };

  /**
   * @this {IDBTransactionFull}
   * @returns {void}
   */
  IDBTransaction.prototype.__assertVersionChange = function () {
    IDBTransaction.__assertVersionChange(this);
  };

  /**
   * Returns the specified object store.
   * @param {string} objectStoreName
   * @this {IDBTransactionFull}
   * @returns {IDBObjectStore}
   */
  IDBTransaction.prototype.objectStore = function (objectStoreName) {
    var me = this;
    if (!(me instanceof IDBTransaction)) {
      throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
      throw new TypeError('No object store name was specified');
    }
    IDBTransaction.__assertNotFinished(me);
    if (me.__objectStoreNames.indexOf(objectStoreName) === -1) {
      // eslint-disable-line unicorn/prefer-includes
      throw createDOMException('NotFoundError', objectStoreName + ' is not participating in this transaction');
    }
    var store = me.db.__objectStores[objectStoreName];
    if (!store) {
      throw createDOMException('NotFoundError', objectStoreName + ' does not exist in ' + me.db.name);
    }
    if (!me.__storeHandles[objectStoreName] ||
    // These latter conditions are to allow store
    //   recreation to create new clone object
    me.__storeHandles[objectStoreName].__pendingDelete || me.__storeHandles[objectStoreName].__deleted) {
      me.__storeHandles[objectStoreName] = IDBObjectStore.__clone(store, me);
    }
    return me.__storeHandles[objectStoreName];
  };

  /**
   *
   * @param {Error|DOMException|null} err
   * @this {IDBTransactionFull}
   * @returns {void}
   */
  IDBTransaction.prototype.__abortTransaction = function (err) {
    var me = this;
    logError('Error', 'An error occurred in a transaction', err);
    if (me.__errored) {
      // We've already called "onerror", "onabort", or thrown, so don't do it again.
      return;
    }
    me.__errored = true;
    if (me.mode === 'versionchange') {
      // Steps for aborting an upgrade transaction
      me.db.__version = me.db.__oldVersion;
      me.db.__objectStoreNames = me.db.__oldObjectStoreNames;
      me.__objectStoreNames = me.db.__oldObjectStoreNames;
      Object.values(me.db.__objectStores).concat(Object.values(me.__storeHandles)).forEach(function (store) {
        // Store was already created so we restore to name before the rename
        if ('__pendingName' in store && me.db.__oldObjectStoreNames.indexOf(store.__pendingName) > -1 // eslint-disable-line unicorn/prefer-includes
        ) {
          store.__name = store.__originalName;
        }
        store.__indexNames = store.__oldIndexNames;
        delete store.__pendingDelete;
        Object.values(store.__indexes).concat(Object.values(store.__indexHandles)).forEach(function (index) {
          // Index was already created so we restore to name before the rename
          if ('__pendingName' in index && store.__oldIndexNames.indexOf(index.__pendingName) > -1 // eslint-disable-line unicorn/prefer-includes
          ) {
            index.__name = index.__originalName;
          }
          delete index.__pendingDelete;
        });
      });
    }
    me.__active = false; // Setting here and in requestsFinished for https://github.com/w3c/IndexedDB/issues/87

    if (err !== null) {
      me.__error = err;
    }
    if (me.__requestsFinished) {
      // The transaction has already completed, so we can't call "onerror" or "onabort".
      // So throw the error instead.
      setTimeout(function () {
        throw err;
      }, 0);
    }

    /**
     * @param {SQLTransaction|null} [tx]
     * @param {SQLResultSet|SQLError|{code: 0}} [errOrResult]
     * @returns {void}
     */
    function abort(tx, errOrResult) {
      if (!tx) {
        CFG.DEBUG && console.log('Rollback not possible due to missing transaction', me);
      } else if (errOrResult && 'code' in errOrResult && typeof errOrResult.code === 'number') {
        CFG.DEBUG && console.log('Rollback erred; feature is probably not supported as per WebSQL', me);
      } else {
        CFG.DEBUG && console.log('Rollback succeeded', me);
      }
      me.dispatchEvent(createEvent('__preabort'));
      me.__requests.filter(function (q, i, arr) {
        // eslint-disable-line promise/no-promise-in-callback
        return q.req && !q.req.__done && [i, -1].includes(arr.map(function (q) {
          return q.req;
        }).lastIndexOf(q.req));
      }).reduce(function (promises, q) {
        // We reduce to a chain of promises to be queued in order, so we cannot
        //  use `Promise.all`, and I'm unsure whether `setTimeout` currently
        //  behaves first-in-first-out with the same timeout so we could
        //  just use a `forEach`.
        return promises.then(function () {
          if (!q.req) {
            // TS guard
            throw new Error('Missing request');
          }
          q.req.__done = true;
          q.req.__result = undefined;
          q.req.__error = createDOMException('AbortError', 'A request was aborted (an unfinished request).');
          var reqEvt = createEvent('error', q.req.__error, {
            bubbles: true,
            cancelable: true
          });
          return new SyncPromise( /** @type {() => void} */
          function (resolve) {
            setTimeout(function () {
              if (!q.req) {
                // TS guard
                throw new Error('Missing request');
              }
              q.req.dispatchEvent(reqEvt); // No need to catch errors
              resolve();
            });
          });
        });
      }, SyncPromise.resolve(undefined)).then(function () {
        // Also works when there are no pending requests
        var evt = createEvent('abort', err, {
          bubbles: true,
          cancelable: false
        });
        setTimeout(function () {
          me.__abortFinished = true;
          me.dispatchEvent(evt);
          me.__storeHandles = {};
          me.dispatchEvent(createEvent('__abort'));
        });
        return undefined;
      })["catch"](function (err) {
        console.log('Abort error');
        throw err;
      });
    }
    me.__transFinishedCb(true, function (rollback) {
      if (rollback && me.__tx) {
        // Not supported in standard SQL (and WebSQL errors should
        //   rollback automatically), but for Node.js, etc., we give chance for
        //   manual aborts which would otherwise not work.
        if (me.mode === 'readwrite') {
          if (me.__transactionFinished) {
            abort();
            return;
          }
          me.__transactionEndCallback = abort;
          return;
        }
        try {
          me.__tx.executeSql('ROLLBACK', [], abort, /** @type {SQLStatementErrorCallback} */abort); // Not working in some circumstances, even in Node
        } catch (err) {
          // Browser errs when transaction has ended and since it most likely already erred here,
          //   we call to abort
          abort();
        }
      } else {
        abort(null, {
          code: 0
        });
      }
    });
  };

  /**
   * @this {IDBTransactionFull}
   * @returns {void}
   */
  IDBTransaction.prototype.abort = function () {
    var me = this;
    if (!(me instanceof IDBTransaction)) {
      throw new TypeError('Illegal invocation');
    }
    CFG.DEBUG && console.log('The transaction was aborted', me);
    IDBTransaction.__assertNotFinished(me);
    me.__abortTransaction(null);
  };
  IDBTransaction.prototype[Symbol.toStringTag] = 'IDBTransactionPrototype';

  /**
   *
   * @param {IDBTransactionFull|undefined} tx
   * @returns {void}
   */
  IDBTransaction.__assertVersionChange = function (tx) {
    if (!tx || tx.mode !== 'versionchange') {
      throw createDOMException('InvalidStateError', 'Not a version transaction');
    }
  };
  /**
   *
   * @param {IDBTransactionFull} tx
   * @throws {DOMException}
   * @returns {void}
   */
  IDBTransaction.__assertNotVersionChange = function (tx) {
    if (tx && tx.mode === 'versionchange') {
      throw createDOMException('InvalidStateError', 'Cannot be called during a version transaction');
    }
  };

  /**
   *
   * @param {IDBTransactionFull|undefined} tx
   * @throws {DOMException}
   * @returns {void}
   */
  IDBTransaction.__assertNotFinished = function (tx) {
    if (!tx || tx.__completed || tx.__abortFinished || tx.__errored) {
      throw createDOMException('InvalidStateError', 'Transaction finished by commit or abort');
    }
  };

  // object store methods behave differently: see https://github.com/w3c/IndexedDB/issues/192
  /**
   *
   * @param {IDBTransactionFull} tx
   * @returns {void}
   */
  IDBTransaction.__assertNotFinishedObjectStoreMethod = function (tx) {
    try {
      IDBTransaction.__assertNotFinished(tx);
    } catch (err) {
      if (tx && !tx.__completed && !tx.__abortFinished) {
        throw createDOMException('TransactionInactiveError', 'A request was placed against a transaction which is currently not active, or which is finished');
      }
      throw err;
    }
  };

  /**
   *
   * @param {IDBTransactionFull|undefined} tx
   * @throws {DOMException}
   * @returns {void}
   */
  IDBTransaction.__assertActive = function (tx) {
    if (!tx || !tx.__active) {
      throw createDOMException('TransactionInactiveError', 'A request was placed against a transaction which is currently not active, or which is finished');
    }
  };

  /**
  * Used by our `EventTarget.prototype` library to implement bubbling/capturing.
   * @this {IDBTransactionFull}
  * @returns {import('./IDBDatabase.js').IDBDatabaseFull}
  */
  IDBTransaction.prototype.__getParent = function () {
    return this.db;
  };
  defineOuterInterface(IDBTransaction.prototype, listeners$1);
  defineReadonlyOuterInterface(IDBTransaction.prototype, readonlyProperties$3);
  Object.defineProperty(IDBTransaction.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: IDBTransaction
  });
  Object.defineProperty(IDBTransaction, 'prototype', {
    writable: false
  });

  function ownKeys(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), r.push.apply(r, n);
    }
    return r;
  }
  function _objectSpread2(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = null != arguments[t] ? arguments[t] : {};
      t % 2 ? ownKeys(Object(r), !0).forEach(function (t) {
        _defineProperty(e, t, r[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys(Object(r)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
      });
    }
    return e;
  }
  function _typeof(e) {
    return _typeof = "function" == typeof Symbol && "symbol" == _typeof$2(Symbol.iterator) ? function (e) {
      return _typeof$2(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof$2(e);
    }, _typeof(e);
  }
  function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, _toPropertyKey(n.key), n);
    }
  }
  function _createClass(e, t, r) {
    return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, t, r) {
    return (t = _toPropertyKey(t)) in e ? Object.defineProperty(e, t, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = r, e;
  }
  function _slicedToArray(e, t) {
    return function _arrayWithHoles(e) {
      if (Array.isArray(e)) return e;
    }(e) || function _iterableToArrayLimit(e, t) {
      var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
      if (null != r) {
        var n,
          o,
          a,
          i,
          c = [],
          s = !0,
          u = !1;
        try {
          if (a = (r = r.call(e)).next, 0 === t) {
            if (Object(r) !== r) return;
            s = !1;
          } else for (; !(s = (n = a.call(r)).done) && (c.push(n.value), c.length !== t); s = !0);
        } catch (e) {
          u = !0, o = e;
        } finally {
          try {
            if (!s && null != r["return"] && (i = r["return"](), Object(i) !== i)) return;
          } finally {
            if (u) throw o;
          }
        }
        return c;
      }
    }(e, t) || _unsupportedIterableToArray(e, t) || function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function _unsupportedIterableToArray(e, t) {
    if (e) {
      if ("string" == typeof e) return _arrayLikeToArray(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _arrayLikeToArray(e, t) : void 0;
    }
  }
  function _arrayLikeToArray(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  function _toPropertyKey(e) {
    var t = function _toPrimitive(e, t) {
      if ("object" != _typeof$2(e) || null === e) return e;
      var r = e[Symbol.toPrimitive];
      if (void 0 !== r) {
        var n = r.call(e, t || "default");
        if ("object" != _typeof$2(n)) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t ? String : Number)(e);
    }(e, "string");
    return "symbol" == _typeof$2(t) ? t : String(t);
  }
  var e = _createClass(function TypesonPromise(e) {
    _classCallCheck(this, TypesonPromise), this.p = new Promise(e);
  });
  e.__typeson__type__ = "TypesonPromise", "undefined" != typeof Symbol && Object.defineProperty(e.prototype, Symbol.toStringTag, {
    get: function get() {
      return "TypesonPromise";
    }
  }), e.prototype.then = function (t, r) {
    var n = this;
    return new e(function (e, o) {
      n.p.then(function (r) {
        e(t ? t(r) : r);
      })["catch"](function (e) {
        return r ? r(e) : Promise.reject(e);
      }).then(e, o);
    });
  }, e.prototype["catch"] = function (e) {
    return this.then(function () {}, e);
  }, e.resolve = function (t) {
    return new e(function (e) {
      e(t);
    });
  }, e.reject = function (t) {
    return new e(function (e, r) {
      r(t);
    });
  }, e.all = function (t) {
    return new e(function (e, r) {
      Promise.all(t.map(function (e) {
        return null != e && e.constructor && "__typeson__type__" in e.constructor && "TypesonPromise" === e.constructor.__typeson__type__ ? e.p : e;
      })).then(e, r);
    });
  }, e.race = function (t) {
    return new e(function (e, r) {
      Promise.race(t.map(function (e) {
        return null != e && e.constructor && "__typeson__type__" in e.constructor && "TypesonPromise" === e.constructor.__typeson__type__ ? e.p : e;
      })).then(e, r);
    });
  }, e.allSettled = function (t) {
    return new e(function (e, r) {
      Promise.allSettled(t.map(function (e) {
        return null != e && e.constructor && "__typeson__type__" in e.constructor && "TypesonPromise" === e.constructor.__typeson__type__ ? e.p : e;
      })).then(e, r);
    });
  };
  var t = Object.hasOwn,
    r = Object.getPrototypeOf;
  function isThenable(e, t) {
    return isObject(e) && "function" == typeof e.then && (!t || "function" == typeof e["catch"]);
  }
  function toStringTag(e) {
    return Object.prototype.toString.call(e).slice(8, -1);
  }
  function hasConstructorOf(e, n) {
    if (!e || "object" !== _typeof(e)) return !1;
    var o = r(e);
    if (!o) return null === n;
    var a = t(o, "constructor") && o.constructor;
    return "function" != typeof a ? null === n : n === a || null !== n && Function.prototype.toString.call(a) === Function.prototype.toString.call(n) || "function" == typeof n && "string" == typeof a.__typeson__type__ && a.__typeson__type__ === n.__typeson__type__;
  }
  function isPlainObject(e) {
    return !(!e || "Object" !== toStringTag(e)) && (!r(e) || hasConstructorOf(e, Object));
  }
  function isUserObject(e) {
    if (!e || "Object" !== toStringTag(e)) return !1;
    var t = r(e);
    return !t || hasConstructorOf(e, Object) || isUserObject(t);
  }
  function isObject(e) {
    return null !== e && "object" === _typeof(e);
  }
  function escapeKeyPathComponent(e) {
    return e.replace(/''/g, "''''").replace(/^$/, "''").replace(/~/g, "~0").replace(/\./g, "~1");
  }
  function unescapeKeyPathComponent(e) {
    return e.replace(/~1/g, ".").replace(/~0/g, "~").replace(/^''$/, "").replace(/''''/g, "''");
  }
  function getByKeyPath(e, t) {
    if ("" === t) return e;
    if (null === e || "object" !== _typeof(e)) throw new TypeError("Unexpected non-object type");
    var r = t.indexOf(".");
    if (r > -1) {
      var n = e[unescapeKeyPathComponent(t.slice(0, r))];
      return void 0 === n ? void 0 : getByKeyPath(n, t.slice(r + 1));
    }
    return e[unescapeKeyPathComponent(t)];
  }
  function setAtKeyPath(e, t, r) {
    if ("" === t) return r;
    if (!e || "object" !== _typeof(e)) throw new TypeError("Unexpected non-object type");
    var n = t.indexOf(".");
    return n > -1 ? setAtKeyPath(e[unescapeKeyPathComponent(t.slice(0, n))], t.slice(n + 1), r) : (e[unescapeKeyPathComponent(t)] = r, e);
  }
  function getJSONType(e) {
    return null === e ? "null" : Array.isArray(e) ? "array" : _typeof(e);
  }
  function _await(e, t, r) {
    return r ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
  }
  var n = Object.keys,
    o = Object.hasOwn,
    a = Array.isArray,
    i = ["type", "replaced", "iterateIn", "iterateUnsetNumeric", "addLength"];
  function _async(e) {
    return function () {
      for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
      try {
        return Promise.resolve(e.apply(this, t));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
  function nestedPathsFirst(e, t) {
    var r, n;
    if ("" === e.keypath) return -1;
    var o = null !== (r = e.keypath.match(/\./g)) && void 0 !== r ? r : 0,
      a = null !== (n = t.keypath.match(/\./g)) && void 0 !== n ? n : 0;
    return o && (o = o.length), a && (a = a.length), o > a ? -1 : o < a ? 1 : e.keypath < t.keypath ? -1 : e.keypath > t.keypath ? 1 : 0;
  }
  var c = function () {
      function Typeson(e) {
        _classCallCheck(this, Typeson), this.options = e, this.plainObjectReplacers = [], this.nonplainObjectReplacers = [], this.revivers = {}, this.types = {};
      }
      return _createClass(Typeson, [{
        key: "stringify",
        value: function stringify(e, t, r, n) {
          n = _objectSpread2(_objectSpread2(_objectSpread2({}, this.options), n), {}, {
            stringification: !0
          });
          var o = this.encapsulate(e, null, n);
          return a(o) ? JSON.stringify(o[0], t, r) : o.then(function (e) {
            return JSON.stringify(e, t, r);
          });
        }
      }, {
        key: "stringifySync",
        value: function stringifySync(e, t, r, n) {
          return this.stringify(e, t, r, _objectSpread2(_objectSpread2({
            throwOnBadSyncType: !0
          }, n), {}, {
            sync: !0
          }));
        }
      }, {
        key: "stringifyAsync",
        value: function stringifyAsync(e, t, r, n) {
          return this.stringify(e, t, r, _objectSpread2(_objectSpread2({
            throwOnBadSyncType: !0
          }, n), {}, {
            sync: !1
          }));
        }
      }, {
        key: "parse",
        value: function parse(e, t, r) {
          return r = _objectSpread2(_objectSpread2(_objectSpread2({}, this.options), r), {}, {
            parse: !0
          }), this.revive(JSON.parse(e, t), r);
        }
      }, {
        key: "parseSync",
        value: function parseSync(e, t, r) {
          return this.parse(e, t, _objectSpread2(_objectSpread2({
            throwOnBadSyncType: !0
          }, r), {}, {
            sync: !0
          }));
        }
      }, {
        key: "parseAsync",
        value: function parseAsync(e, t, r) {
          return this.parse(e, t, _objectSpread2(_objectSpread2({
            throwOnBadSyncType: !0
          }, r), {}, {
            sync: !1
          }));
        }
      }, {
        key: "specialTypeNames",
        value: function specialTypeNames(e, t) {
          var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return r.returnTypeNames = !0, this.encapsulate(e, t, r);
        }
      }, {
        key: "rootTypeName",
        value: function rootTypeName(e, t) {
          var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return r.iterateNone = !0, this.encapsulate(e, t, r);
        }
      }, {
        key: "encapsulate",
        value: function encapsulate(t, r, c) {
          var s = this,
            u = _objectSpread2(_objectSpread2({
              sync: !0
            }, this.options), c),
            l = u.sync,
            f = {},
            y = [],
            p = [],
            d = [],
            v = !("cyclic" in u) || u.cyclic,
            b = u.encapsulateObserver,
            h = function finish(e) {
              var t = Object.values(f);
              if (u.iterateNone) return t.length ? t[0] : getJSONType(e);
              if (t.length) {
                if (u.returnTypeNames) return function _toConsumableArray(e) {
                  return function _arrayWithoutHoles(e) {
                    if (Array.isArray(e)) return _arrayLikeToArray(e);
                  }(e) || function _iterableToArray(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
                  }(e) || _unsupportedIterableToArray(e) || function _nonIterableSpread() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                  }();
                }(new Set(t));
                e && isPlainObject(e) && !o(e, "$types") ? e.$types = f : e = {
                  $: e,
                  $types: {
                    $: f
                  }
                };
              } else isObject(e) && o(e, "$types") && (e = {
                $: e,
                $types: !0
              });
              return !u.returnTypeNames && e;
            },
            g = _async(function (t, r) {
              return _await(Promise.all(r.map(function (e) {
                return e[1].p;
              })), function (n) {
                return _await(Promise.all(n.map(_async(function (n) {
                  var o = !1,
                    a = [],
                    i = _slicedToArray(r.splice(0, 1), 1),
                    c = _slicedToArray(i[0], 7),
                    s = c[0],
                    u = c[2],
                    l = c[3],
                    f = c[4],
                    y = c[5],
                    p = c[6],
                    d = _(s, n, u, l, a, !0, p),
                    v = hasConstructorOf(d, e);
                  return function _invoke(e, t) {
                    var r = e();
                    return r && r.then ? r.then(t) : t(r);
                  }(function () {
                    if (s && v) return _await(d.p, function (e) {
                      f[y] = e;
                      var r = g(t, a);
                      return o = !0, r;
                    });
                  }, function (e) {
                    return o ? e : (s ? f[y] = d : t = v ? d.p : d, g(t, a));
                  });
                }))), function () {
                  return t;
                });
              });
            }),
            m = function _adaptBuiltinStateObjectProperties(e, t, r) {
              Object.assign(e, t);
              var n = i.map(function (t) {
                var r = e[t];
                return delete e[t], r;
              });
              r(), i.forEach(function (t, r) {
                e[t] = n[r];
              });
            },
            _ = function _encapsulate(t, r, i, c, l, d, v) {
              var h,
                g = {},
                _ = _typeof(r),
                w = b ? function (n) {
                  var o,
                    a = null !== (o = null != v ? v : c.type) && void 0 !== o ? o : getJSONType(r);
                  b(Object.assign(null != n ? n : g, {
                    keypath: t,
                    value: r,
                    cyclic: i,
                    stateObj: c,
                    promisesData: l,
                    resolvingTypesonPromise: d,
                    awaitingTypesonPromise: hasConstructorOf(r, e)
                  }, {
                    type: a
                  }));
                } : null;
              if (["string", "boolean", "number", "undefined"].includes(_)) return void 0 === r || Number.isNaN(r) || r === Number.NEGATIVE_INFINITY || r === Number.POSITIVE_INFINITY || 0 === r ? (h = c.replaced ? r : O(t, r, c, l, !1, d, w)) !== r && (g = {
                replaced: h
              }) : h = r, w && w(), h;
              if (null === r) return w && w(), r;
              if (i && !c.iterateIn && !c.iterateUnsetNumeric && r && "object" === _typeof(r)) {
                var A = y.indexOf(r);
                if (!(A < 0)) return f[t] = "#", w && w({
                  cyclicKeypath: p[A]
                }), "#" + p[A];
                !0 === i && (y.push(r), p.push(t));
              }
              var S,
                j,
                T = isPlainObject(r),
                I = a(r),
                N = (T || I) && (!s.plainObjectReplacers.length || c.replaced) || c.iterateIn ? r : O(t, r, c, l, T || I, null, w);
              if (N !== r ? (h = N, g = {
                replaced: N
              }) : "" === t && hasConstructorOf(r, e) ? (l.push([t, r, i, c, void 0, void 0, c.type]), h = r) : I && "object" !== c.iterateIn || "array" === c.iterateIn ? (S = new Array(r.length), g = {
                clone: S
              }) : (["function", "symbol"].includes(_typeof(r)) || "toJSON" in r || hasConstructorOf(r, e) || hasConstructorOf(r, Promise) || hasConstructorOf(r, ArrayBuffer)) && !T && "object" !== c.iterateIn ? h = r : (S = {}, c.addLength && (S.length = r.length), g = {
                clone: S
              }), w && w(), u.iterateNone) return null !== (j = S) && void 0 !== j ? j : h;
              if (!S) return h;
              if (c.iterateIn) {
                var P = function _loop(n) {
                  var a = {
                    ownKeys: o(r, n)
                  };
                  m(c, a, function () {
                    var o = t + (t ? "." : "") + escapeKeyPathComponent(n),
                      a = _encapsulate(o, r[n], Boolean(i), c, l, d);
                    hasConstructorOf(a, e) ? l.push([o, a, Boolean(i), c, S, n, c.type]) : void 0 !== a && (S[n] = a);
                  });
                };
                for (var E in r) P(E);
                w && w({
                  endIterateIn: !0,
                  end: !0
                });
              } else n(r).forEach(function (n) {
                var o = t + (t ? "." : "") + escapeKeyPathComponent(n);
                m(c, {
                  ownKeys: !0
                }, function () {
                  var t = _encapsulate(o, r[n], Boolean(i), c, l, d);
                  hasConstructorOf(t, e) ? l.push([o, t, Boolean(i), c, S, n, c.type]) : void 0 !== t && (S[n] = t);
                });
              }), w && w({
                endIterateOwn: !0,
                end: !0
              });
              if (c.iterateUnsetNumeric) {
                for (var C = r.length, x = function _loop2(n) {
                    if (!(n in r)) {
                      var o = "".concat(t).concat(t ? "." : "").concat(n);
                      m(c, {
                        ownKeys: !1
                      }, function () {
                        var t = _encapsulate(o, void 0, Boolean(i), c, l, d);
                        hasConstructorOf(t, e) ? l.push([o, t, Boolean(i), c, S, n, c.type]) : void 0 !== t && (S[n] = t);
                      });
                    }
                  }, k = 0; k < C; k++) x(k);
                w && w({
                  endIterateUnsetNumeric: !0,
                  end: !0
                });
              }
              return S;
            },
            O = function replace(e, t, r, n, o, a, i) {
              for (var c = o ? s.plainObjectReplacers : s.nonplainObjectReplacers, u = c.length; u--;) {
                var y = c[u];
                if (y.test(t, r)) {
                  var p = y.type;
                  if (s.revivers[p]) {
                    var d = f[e];
                    f[e] = d ? [p].concat(d) : p;
                  }
                  if (Object.assign(r, {
                    type: p,
                    replaced: !0
                  }), (l || !y.replaceAsync) && !y.replace) return i && i({
                    typeDetected: !0
                  }), _(e, t, v && "readonly", r, n, a, p);
                  i && i({
                    replacing: !0
                  });
                  var b = void 0;
                  if (l || !y.replaceAsync) {
                    if (void 0 === y.replace) throw new TypeError("Missing replacer");
                    b = y.replace(t, r);
                  } else b = y.replaceAsync(t, r);
                  return _(e, b, v && "readonly", r, n, a, p);
                }
              }
              return t;
            },
            w = _("", t, v, null != r ? r : {}, d);
          if (d.length) return l && u.throwOnBadSyncType ? function () {
            throw new TypeError("Sync method requested but async result obtained");
          }() : Promise.resolve(g(w, d)).then(h);
          if (!l && u.throwOnBadSyncType) throw new TypeError("Async method requested but sync result obtained");
          return u.stringification && l ? [h(w)] : l ? h(w) : Promise.resolve(h(w));
        }
      }, {
        key: "encapsulateSync",
        value: function encapsulateSync(e, t, r) {
          return this.encapsulate(e, t, _objectSpread2(_objectSpread2({
            throwOnBadSyncType: !0
          }, r), {}, {
            sync: !0
          }));
        }
      }, {
        key: "encapsulateAsync",
        value: function encapsulateAsync(e, t, r) {
          return this.encapsulate(e, t, _objectSpread2(_objectSpread2({
            throwOnBadSyncType: !0
          }, r), {}, {
            sync: !1
          }));
        }
      }, {
        key: "revive",
        value: function revive(t, r) {
          var o = this,
            i = _objectSpread2(_objectSpread2({
              sync: !0
            }, this.options), r),
            c = i.sync;
          function finishRevival(e) {
            if (c) return e;
            if (i.throwOnBadSyncType) throw new TypeError("Async method requested but sync result obtained");
            return Promise.resolve(e);
          }
          if (!t || "object" !== _typeof(t) || Array.isArray(t)) return finishRevival(t);
          var u = t.$types;
          if (!0 === u) return finishRevival(t.$);
          if (!u || "object" !== _typeof(u) || Array.isArray(u)) return finishRevival(t);
          var l = [],
            f = {},
            y = !0;
          u.$ && isPlainObject(u.$) && (t = t.$, u = u.$, y = !1);
          var p = function executeReviver(e, t) {
              var r,
                n = _slicedToArray(null !== (r = o.revivers[e]) && void 0 !== r ? r : [], 1)[0];
              if (!n) throw new Error("Unregistered type: " + e);
              if (c && !("revive" in n)) return t;
              if (!c && n.reviveAsync) return n.reviveAsync(t, f);
              if (n.revive) return n.revive(t, f);
              throw new Error("Missing reviver");
            },
            d = [];
          function checkUndefined(e) {
            return hasConstructorOf(e, s) ? void 0 : e;
          }
          var v,
            b = function revivePlainObjects() {
              var r = [];
              if (!u) throw new Error("Found bad `types`");
              if (Object.entries(u).forEach(function (e) {
                var t = _slicedToArray(e, 2),
                  n = t[0],
                  a = t[1];
                "#" !== a && [].concat(a).forEach(function (e) {
                  var t;
                  _slicedToArray(null !== (t = o.revivers[e]) && void 0 !== t ? t : [null, {}], 2)[1].plain && (r.push({
                    keypath: n,
                    type: e
                  }), delete u[n]);
                });
              }), r.length) return r.sort(nestedPathsFirst).reduce(function reducer(r, n) {
                var o = n.keypath,
                  a = n.type;
                if (isThenable(r)) return r.then(function (e) {
                  return reducer(e, {
                    keypath: o,
                    type: a
                  });
                });
                var i = getByKeyPath(t, o);
                if (hasConstructorOf(i = p(a, i), e)) return i.then(function (e) {
                  var r = setAtKeyPath(t, o, e);
                  r === e && (t = r);
                });
                var c = setAtKeyPath(t, o, i);
                c === i && (t = c);
              }, void 0);
            }();
          return hasConstructorOf(b, e) ? v = b.then(function () {
            return t;
          }) : (v = function _revive(t, r, o, i, c) {
            if (!y || "$types" !== t) {
              var f = u[t],
                v = a(r);
              if (v || isPlainObject(r)) {
                var b = v ? new Array(r.length) : {};
                for (n(r).forEach(function (n) {
                  var a = _revive(t + (t ? "." : "") + escapeKeyPathComponent(n), r[n], null != o ? o : b, b, n),
                    i = function set(e) {
                      return hasConstructorOf(e, s) ? b[n] = void 0 : void 0 !== e && (b[n] = e), e;
                    };
                  hasConstructorOf(a, e) ? d.push(a.then(function (e) {
                    return i(e);
                  })) : i(a);
                }), r = b; l.length;) {
                  var h = _slicedToArray(l[0], 4),
                    g = h[0],
                    m = h[1],
                    _ = h[2],
                    O = h[3],
                    w = getByKeyPath(g, m);
                  if (void 0 === w) break;
                  _[O] = w, l.splice(0, 1);
                }
              }
              if (!f) return r;
              if ("#" === f) {
                var A = getByKeyPath(o, r.slice(1));
                return void 0 === A && l.push([o, r.slice(1), i, c]), A;
              }
              return [].concat(f).reduce(function reducer(t, r) {
                if (hasConstructorOf(t, e)) return t.then(function (e) {
                  return reducer(e, r);
                });
                if ("string" != typeof r) throw new TypeError("Bad type JSON");
                return p(r, t);
              }, r);
            }
          }("", t, null), d.length && (v = e.resolve(v).then(function (t) {
            return e.all([t].concat(d));
          }).then(function (e) {
            return _slicedToArray(e, 1)[0];
          }))), isThenable(v) ? c && i.throwOnBadSyncType ? function () {
            throw new TypeError("Sync method requested but async result obtained");
          }() : hasConstructorOf(v, e) ? v.p.then(checkUndefined) : v : !c && i.throwOnBadSyncType ? function () {
            throw new TypeError("Async method requested but sync result obtained");
          }() : c ? checkUndefined(v) : Promise.resolve(checkUndefined(v));
        }
      }, {
        key: "reviveSync",
        value: function reviveSync(e, t) {
          return this.revive(e, _objectSpread2(_objectSpread2({
            throwOnBadSyncType: !0
          }, t), {}, {
            sync: !0
          }));
        }
      }, {
        key: "reviveAsync",
        value: function reviveAsync(e, t) {
          return this.revive(e, _objectSpread2(_objectSpread2({
            throwOnBadSyncType: !0
          }, t), {}, {
            sync: !1
          }));
        }
      }, {
        key: "register",
        value: function register(e, t) {
          var r = this,
            o = null != t ? t : {},
            i = function R(e) {
              a(e) ? e.forEach(function (e) {
                return R(e);
              }) : n(e).forEach(function (t) {
                var n;
                if ("#" === t) throw new TypeError("# cannot be used as a type name as it is reserved for cyclic objects");
                if (u.includes(t)) throw new TypeError("Plain JSON object types are reserved as type names");
                var i = e[t],
                  c = i && "function" != typeof i && !Array.isArray(i) && i.testPlainObjects ? r.plainObjectReplacers : r.nonplainObjectReplacers,
                  s = c.filter(function (e) {
                    return e.type === t;
                  });
                if (s.length && (c.splice(c.indexOf(s[0]), 1), delete r.revivers[t], delete r.types[t]), "function" == typeof i) {
                  var l = i;
                  i = {
                    test: function test(e) {
                      return e && e.constructor === l;
                    },
                    replace: function replace(e) {
                      return _objectSpread2({}, e);
                    },
                    revive: function revive(e) {
                      return Object.assign(Object.create(l.prototype), e);
                    }
                  };
                } else if (a(i)) {
                  var f = _slicedToArray(i, 3);
                  i = {
                    test: f[0],
                    replace: f[1],
                    revive: f[2]
                  };
                }
                if (null !== (n = i) && void 0 !== n && n.test) {
                  var y = {
                    type: t,
                    test: i.test.bind(i)
                  };
                  i.replace && (y.replace = i.replace.bind(i)), i.replaceAsync && (y.replaceAsync = i.replaceAsync.bind(i));
                  var p = "number" == typeof o.fallback ? o.fallback : o.fallback ? 0 : Number.POSITIVE_INFINITY;
                  if (i.testPlainObjects ? r.plainObjectReplacers.splice(p, 0, y) : r.nonplainObjectReplacers.splice(p, 0, y), i.revive || i.reviveAsync) {
                    var d = {};
                    i.revive && (d.revive = i.revive.bind(i)), i.reviveAsync && (d.reviveAsync = i.reviveAsync.bind(i)), r.revivers[t] = [d, {
                      plain: i.testPlainObjects
                    }];
                  }
                  r.types[t] = i;
                }
              });
            };
          return [].concat(e).forEach(function (e) {
            return i(e);
          }), this;
        }
      }]), Typeson;
    }(),
    s = _createClass(function Undefined() {
      _classCallCheck(this, Undefined);
    });
  s.__typeson__type__ = "TypesonUndefined";
  for (var u = ["null", "boolean", "number", "string", "array", "object"], l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", f = new Uint8Array(256), y = 0; y < 64; y++) f[l.codePointAt(y)] = y;
  var p = function encode(e, t, r) {
      null == r && (r = e.byteLength);
      for (var n = new Uint8Array(e, t || 0, r), o = n.length, a = "", i = 0; i < o; i += 3) a += l[n[i] >> 2], a += l[(3 & n[i]) << 4 | n[i + 1] >> 4], a += l[(15 & n[i + 1]) << 2 | n[i + 2] >> 6], a += l[63 & n[i + 2]];
      return o % 3 == 2 ? a = a.slice(0, -1) + "=" : o % 3 == 1 && (a = a.slice(0, -2) + "=="), a;
    },
    d = function decode(e) {
      var t = e.length;
      if (t % 4) throw new Error("Bad base64 length: not divisible by four");
      var r,
        n,
        o,
        a,
        i = .75 * e.length,
        c = 0;
      "=" === e[e.length - 1] && (i--, "=" === e[e.length - 2] && i--);
      for (var s = new ArrayBuffer(i), u = new Uint8Array(s), l = 0; l < t; l += 4) r = f[e.codePointAt(l)], n = f[e.codePointAt(l + 1)], o = f[e.codePointAt(l + 2)], a = f[e.codePointAt(l + 3)], u[c++] = r << 2 | n >> 4, u[c++] = (15 & n) << 4 | o >> 2, u[c++] = (3 & o) << 6 | 63 & a;
      return s;
    };
  var v = {
      arraybuffer: {
        test: function test(e) {
          return "ArrayBuffer" === toStringTag(e);
        },
        replace: function replace(e, t) {
          t.buffers || (t.buffers = []);
          var r = t.buffers.indexOf(e);
          return r > -1 ? {
            index: r
          } : (t.buffers.push(e), p(e));
        },
        revive: function revive(e, t) {
          if (t.buffers || (t.buffers = []), "object" == _typeof$2(e)) return t.buffers[e.index];
          var r = d(e);
          return t.buffers.push(r), r;
        }
      }
    },
    b = {
      bigintObject: {
        test: function test(e) {
          return "object" == _typeof$2(e) && hasConstructorOf(e, BigInt);
        },
        replace: String,
        revive: function revive(e) {
          return new Object(BigInt(e));
        }
      }
    },
    h = {
      bigint: {
        test: function test(e) {
          return "bigint" == typeof e;
        },
        replace: String,
        revive: function revive(e) {
          return BigInt(e);
        }
      }
    };
  function string2arraybuffer(e) {
    var t = new Uint8Array(e.length);
    for (var _r = 0; _r < e.length; _r++) t[_r] = e.charCodeAt(_r);
    return t.buffer;
  }
  var g = {
    blob: {
      test: function test(e) {
        return "Blob" === toStringTag(e);
      },
      replace: function replace(e) {
        var t = new XMLHttpRequest();
        if (t.overrideMimeType("text/plain; charset=x-user-defined"), t.open("GET", URL.createObjectURL(e), !1), t.send(), 200 !== t.status && 0 !== t.status) throw new Error("Bad Blob access: " + t.status);
        return {
          type: e.type,
          stringContents: t.responseText
        };
      },
      revive: function revive(e) {
        var t = e.type,
          r = e.stringContents;
        return new Blob([string2arraybuffer(r)], {
          type: t
        });
      },
      replaceAsync: function replaceAsync(t) {
        return new e(function (e, r) {
          var n = new FileReader();
          n.addEventListener("load", function () {
            e({
              type: t.type,
              stringContents: n.result
            });
          }), n.addEventListener("error", function () {
            r(n.error);
          }), n.readAsBinaryString(t);
        });
      }
    }
  };
  var O = {
      cryptokey: {
        test: function test(e) {
          return "CryptoKey" === toStringTag(e) && e.extractable;
        },
        replaceAsync: function replaceAsync(t) {
          return new e( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e, r) {
              var n;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return crypto.subtle.exportKey("jwk", t);
                  case 3:
                    n = _context.sent;
                    _context.next = 9;
                    break;
                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context["catch"](0);
                    return _context.abrupt("return", void r(_context.t0));
                  case 9:
                    e({
                      jwk: n,
                      algorithm: t.algorithm,
                      usages: t.usages
                    });
                  case 10:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 6]]);
            }));
            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }());
        },
        revive: function revive(e) {
          var t = e.jwk,
            r = e.algorithm,
            n = e.usages;
          return crypto.subtle.importKey("jwk", t, r, !0, n);
        }
      }
    },
    w = {
      dataview: {
        test: function test(e) {
          return "DataView" === toStringTag(e);
        },
        replace: function replace(_ref2, n) {
          var e = _ref2.buffer,
            t = _ref2.byteOffset,
            r = _ref2.byteLength;
          n.buffers || (n.buffers = []);
          var o = n.buffers.indexOf(e);
          return o > -1 ? {
            index: o,
            byteOffset: t,
            byteLength: r
          } : (n.buffers.push(e), {
            encoded: p(e),
            byteOffset: t,
            byteLength: r
          });
        },
        revive: function revive(e, t) {
          t.buffers || (t.buffers = []);
          var r = e.byteOffset,
            n = e.byteLength,
            o = e.encoded,
            a = e.index;
          var i;
          return "index" in e ? i = t.buffers[a] : (i = d(o), t.buffers.push(i)), new DataView(i, r, n);
        }
      }
    },
    A = {
      date: {
        test: function test(e) {
          return "Date" === toStringTag(e);
        },
        replace: function replace(e) {
          var t = e.getTime();
          return Number.isNaN(t) ? "NaN" : t;
        },
        revive: function revive(e) {
          return "NaN" === e ? new Date(Number.NaN) : new Date(e);
        }
      }
    },
    S = {
      error: {
        test: function test(e) {
          return "Error" === toStringTag(e);
        },
        replace: function replace(_ref3) {
          var e = _ref3.name,
            t = _ref3.message,
            r = _ref3.cause,
            n = _ref3.stack,
            o = _ref3.fileName,
            a = _ref3.lineNumber,
            i = _ref3.columnNumber;
          return {
            name: e,
            message: t,
            cause: r,
            stack: n,
            fileName: o,
            lineNumber: a,
            columnNumber: i
          };
        },
        revive: function revive(e) {
          var t = new Error(e.message);
          return t.name = e.name, t.cause = e.cause, t.stack = e.stack, t.fileName = e.fileName, t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
        }
      }
    },
    j = {};
  function create$2(e) {
    j[e.name.toLowerCase()] = {
      test: function test(t) {
        return hasConstructorOf(t, e);
      },
      replace: function replace(_ref4) {
        var e = _ref4.name,
          t = _ref4.message,
          r = _ref4.cause,
          n = _ref4.stack,
          o = _ref4.fileName,
          a = _ref4.lineNumber,
          i = _ref4.columnNumber,
          c = _ref4.errors;
        return {
          name: e,
          message: t,
          cause: r,
          stack: n,
          fileName: o,
          lineNumber: a,
          columnNumber: i,
          errors: c
        };
      },
      revive: function revive(t) {
        var r = "undefined" != typeof AggregateError && e === AggregateError,
          n = r ? new e(t.errors, t.message) : new e(t.message);
        return n.name = t.name, n.cause = t.cause, n.stack = t.stack, n.fileName = t.fileName, n.lineNumber = t.lineNumber, n.columnNumber = t.columnNumber, r && (n.errors = t.errors), n;
      }
    };
  }
  [TypeError, RangeError, SyntaxError, ReferenceError, EvalError, URIError].forEach(function (e) {
    return create$2(e);
  }), "undefined" != typeof AggregateError && create$2(AggregateError), "function" == typeof InternalError && create$2(InternalError);
  var T = {
      file: {
        test: function test(e) {
          return "File" === toStringTag(e);
        },
        replace: function replace(e) {
          var t = new XMLHttpRequest();
          if (t.overrideMimeType("text/plain; charset=x-user-defined"), t.open("GET", URL.createObjectURL(e), !1), t.send(), 200 !== t.status && 0 !== t.status) throw new Error("Bad File access: " + t.status);
          return {
            type: e.type,
            stringContents: t.responseText,
            name: e.name,
            lastModified: e.lastModified
          };
        },
        revive: function revive(_ref5) {
          var e = _ref5.name,
            t = _ref5.type,
            r = _ref5.stringContents,
            n = _ref5.lastModified;
          return new File([string2arraybuffer(r)], e, {
            type: t,
            lastModified: n
          });
        },
        replaceAsync: function replaceAsync(t) {
          return new e(function (e, r) {
            var n = new FileReader();
            n.addEventListener("load", function () {
              e({
                type: t.type,
                stringContents: n.result,
                name: t.name,
                lastModified: t.lastModified
              });
            }), n.addEventListener("error", function () {
              r(n.error);
            }), n.readAsBinaryString(t);
          });
        }
      }
    },
    I = {
      file: T.file,
      filelist: {
        test: function test(e) {
          return "FileList" === toStringTag(e);
        },
        replace: function replace(e) {
          var t = [];
          for (var _r2 = 0; _r2 < e.length; _r2++) t[_r2] = e.item(_r2);
          return t;
        },
        revive: function revive(e) {
          var FileList = /*#__PURE__*/function (_Symbol$toStringTag) {
            function FileList() {
              _classCallCheck$1(this, FileList);
              this._files = arguments[0], this.length = this._files.length;
            }
            _createClass$1(FileList, [{
              key: "item",
              value: function item(e) {
                return this._files[e];
              }
            }, {
              key: _Symbol$toStringTag,
              get: function get() {
                return "FileList";
              }
            }]);
            return FileList;
          }(Symbol.toStringTag);
          return new FileList(e);
        }
      }
    },
    N = {
      imagebitmap: {
        test: function test(e) {
          return "ImageBitmap" === toStringTag(e) || e && e.dataset && "ImageBitmap" === e.dataset.toStringTag;
        },
        replace: function replace(e) {
          var t = document.createElement("canvas");
          return t.getContext("2d").drawImage(e, 0, 0), t.toDataURL();
        },
        revive: function revive(e) {
          var t = document.createElement("canvas"),
            r = t.getContext("2d"),
            n = document.createElement("img");
          return n.addEventListener("load", function () {
            r.drawImage(n, 0, 0);
          }), n.src = e, t;
        },
        reviveAsync: function reviveAsync(t) {
          var r = document.createElement("canvas"),
            n = r.getContext("2d"),
            o = document.createElement("img");
          return o.addEventListener("load", function () {
            n.drawImage(o, 0, 0);
          }), o.src = t, new e( /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e, t) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    _context2.t0 = e;
                    _context2.next = 4;
                    return createImageBitmap(r);
                  case 4:
                    _context2.t1 = _context2.sent;
                    (0, _context2.t0)(_context2.t1);
                    _context2.next = 11;
                    break;
                  case 8:
                    _context2.prev = 8;
                    _context2.t2 = _context2["catch"](0);
                    t(_context2.t2);
                  case 11:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[0, 8]]);
            }));
            return function (_x3, _x4) {
              return _ref6.apply(this, arguments);
            };
          }());
        }
      }
    },
    P = {
      imagedata: {
        test: function test(e) {
          return "ImageData" === toStringTag(e);
        },
        replace: function replace(e) {
          return {
            array: _toConsumableArray(e.data),
            width: e.width,
            height: e.height
          };
        },
        revive: function revive(e) {
          return new ImageData(new Uint8ClampedArray(e.array), e.width, e.height);
        }
      }
    },
    E = {
      infinity: {
        test: function test(e) {
          return e === Number.POSITIVE_INFINITY;
        },
        replace: function replace(e) {
          return "Infinity";
        },
        revive: function revive(e) {
          return Number.POSITIVE_INFINITY;
        }
      }
    },
    C = {
      test: function test(e) {
        return hasConstructorOf(e, Intl.Collator);
      },
      replace: function replace(e) {
        return e.resolvedOptions();
      },
      revive: function revive(e) {
        return new Intl.Collator(e.locale, e);
      }
    },
    x = {
      IntlCollator: C,
      IntlDateTimeFormat: {
        test: function test(e) {
          return hasConstructorOf(e, Intl.DateTimeFormat);
        },
        replace: function replace(e) {
          return e.resolvedOptions();
        },
        revive: function revive(e) {
          return new Intl.DateTimeFormat(e.locale, e);
        }
      },
      IntlNumberFormat: {
        test: function test(e) {
          return hasConstructorOf(e, Intl.NumberFormat);
        },
        replace: function replace(e) {
          return e.resolvedOptions();
        },
        revive: function revive(e) {
          return new Intl.NumberFormat(e.locale, e);
        }
      }
    },
    k = {
      map: {
        test: function test(e) {
          return "Map" === toStringTag(e);
        },
        replace: function replace(e) {
          return _toConsumableArray(e.entries());
        },
        revive: function revive(e) {
          return new Map(e);
        }
      }
    },
    B = {
      nan: {
        test: function test(e) {
          return Number.isNaN(e);
        },
        replace: function replace(e) {
          return "NaN";
        },
        revive: function revive(e) {
          return Number.NaN;
        }
      }
    },
    U = {
      negativeInfinity: {
        test: function test(e) {
          return e === Number.NEGATIVE_INFINITY;
        },
        replace: function replace(e) {
          return "-Infinity";
        },
        revive: function revive(e) {
          return Number.NEGATIVE_INFINITY;
        }
      }
    },
    K = {
      negativeZero: {
        test: function test(e) {
          return Object.is(e, -0);
        },
        replace: function replace(e) {
          return 0;
        },
        revive: function revive(e) {
          return -0;
        }
      }
    },
    F = {
      StringObject: {
        test: function test(e) {
          return "String" === toStringTag(e) && "object" == _typeof$2(e);
        },
        replace: String,
        revive: function revive(e) {
          return new String(e);
        }
      },
      BooleanObject: {
        test: function test(e) {
          return "Boolean" === toStringTag(e) && "object" == _typeof$2(e);
        },
        replace: Boolean,
        revive: function revive(e) {
          return new Boolean(e);
        }
      },
      NumberObject: {
        test: function test(e) {
          return "Number" === toStringTag(e) && "object" == _typeof$2(e);
        },
        replace: Number,
        revive: function revive(e) {
          return new Number(e);
        }
      }
    },
    M = {
      regexp: {
        test: function test(e) {
          return "RegExp" === toStringTag(e);
        },
        replace: function replace(e) {
          return {
            source: e.source,
            flags: (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "")
          };
        },
        revive: function revive(_ref7) {
          var e = _ref7.source,
            t = _ref7.flags;
          return new RegExp(e, t);
        }
      }
    },
    J = {
      set: {
        test: function test(e) {
          return "Set" === toStringTag(e);
        },
        replace: function replace(e) {
          return _toConsumableArray(e.values());
        },
        revive: function revive(e) {
          return new Set(e);
        }
      }
    },
    V = {};
  "function" == typeof Int8Array && [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array].concat(_toConsumableArray("function" == typeof BigInt64Array ? [BigInt64Array, BigUint64Array] : [])).forEach(function (e) {
    return function create$1(e) {
      var t = e.name;
      V[t.toLowerCase()] = {
        test: function test(e) {
          return toStringTag(e) === t;
        },
        replace: function replace(e) {
          return (0 === e.byteOffset && e.byteLength === e.buffer.byteLength ? e : e.slice(0)).buffer;
        },
        revive: function revive(t) {
          return "ArrayBuffer" === toStringTag(t) ? new e(t) : t;
        }
      };
    }(e);
  });
  var Y = {};
  "function" == typeof Int8Array && [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array].concat(_toConsumableArray("function" == typeof BigInt64Array ? [BigInt64Array, BigUint64Array] : [])).forEach(function (e) {
    return function create(e) {
      var t = e.name;
      Y[t.toLowerCase()] = {
        test: function test(e) {
          return toStringTag(e) === t;
        },
        replace: function replace(_ref8, n) {
          var e = _ref8.buffer,
            t = _ref8.byteOffset,
            r = _ref8.length;
          n.buffers || (n.buffers = []);
          var o = n.buffers.indexOf(e);
          return o > -1 ? {
            index: o,
            byteOffset: t,
            length: r
          } : (n.buffers.push(e), {
            encoded: p(e),
            byteOffset: t,
            length: r
          });
        },
        revive: function revive(t, r) {
          r.buffers || (r.buffers = []);
          var n = t.byteOffset,
            o = t.length,
            a = t.encoded,
            i = t.index;
          var c;
          return "index" in t ? c = r.buffers[i] : (c = d(a), r.buffers.push(c)), new e(c, n, o);
        }
      };
    }(e);
  });
  var q = {
      undef: {
        test: function test(e, t) {
          return void 0 === e && (t.ownKeys || !("ownKeys" in t));
        },
        replace: function replace(e) {
          return 0;
        },
        revive: function revive(e) {
          return new s();
        }
      }
    },
    W = {
      userObject: {
        test: function test(e, t) {
          return isUserObject(e);
        },
        replace: function replace(e) {
          return _objectSpread2$1({}, e);
        },
        revive: function revive(e) {
          return e;
        }
      }
    },
    G = [{
      arrayNonindexKeys: {
        testPlainObjects: !0,
        test: function test(e, t) {
          return !!Array.isArray(e) && (Object.keys(e).some(function (e) {
            return String(Number.parseInt(e)) !== e;
          }) && (t.iterateIn = "object", t.addLength = !0), !0);
        },
        replace: function replace(e, t) {
          return t.iterateUnsetNumeric = !0, e;
        },
        revive: function revive(e) {
          if (Array.isArray(e)) return e;
          var t = [];
          return Object.entries(e).forEach(function (_ref9) {
            var _ref10 = _slicedToArray$1(_ref9, 2),
              e = _ref10[0],
              r = _ref10[1];
            t[e] = r;
          }), t;
        }
      }
    }, {
      sparseUndefined: {
        test: function test(e, t) {
          return void 0 === e && !1 === t.ownKeys;
        },
        replace: function replace(e) {
          return 0;
        },
        revive: function revive(e) {}
      }
    }],
    H = [B, E, U, K],
    ee = [W, q, G, F, H, A, M, P, N, T, I, g, S, j].concat("function" == typeof Map ? k : [], "function" == typeof Set ? J : [], "function" == typeof ArrayBuffer ? v : [], "function" == typeof Uint8Array ? Y : [], "function" == typeof DataView ? w : [], "undefined" != typeof Intl ? x : [], "undefined" != typeof crypto ? O : [], "undefined" != typeof BigInt ? [h, b] : []),
    te = ee.concat({
      checkDataCloneException: {
        test: function test(e) {
          var t = {}.toString.call(e).slice(8, -1);
          if (["symbol", "function"].includes(_typeof$2(e)) || ["Arguments", "Module", "Error", "Promise", "WeakMap", "WeakSet", "Event", "MessageChannel"].includes(t) || e && "object" == _typeof$2(e) && "number" == typeof e.nodeType && "function" == typeof e.insertBefore) throw new DOMException("The object cannot be cloned.", "DataCloneError");
          return !1;
        }
      }
    });

  // See: http://stackoverflow.com/questions/42170826/categories-for-rejection-by-the-structured-cloning-algorithm

  var typeson = new c().register(te);

  /**
   * @param {(preset: import('typeson-registry').Preset) =>
   *   import('typeson-registry').Preset} func
   * @returns {void}
   */
  function register(func) {
    typeson = new c().register(func(te));
  }

  /**
   * We are keeping the callback approach for now in case we wish to reexpose
   * `Blob`, `File`, `FileList` asynchronously (though in such a case, we
   * should probably refactor as a Promise).
   * @param {AnyValue} obj
   * @param {(str: string) => void} [func]
   * @throws {Error}
   * @returns {string}
   */
  function encode(obj, func) {
    var ret;
    try {
      // eslint-disable-next-line n/no-sync
      ret = typeson.stringifySync(obj);
    } catch (err) {
      // SCA in typeson-registry using `DOMException` which is not defined (e.g., in Node)
      if (hasConstructorOf(err, ReferenceError) ||
      // SCA in typeson-registry threw a cloning error and we are in a
      //   supporting environment (e.g., the browser) where `ShimDOMException` is
      //   an alias for `DOMException`; if typeson-registry ever uses our shim
      //   to throw, we can use this condition alone.
      hasConstructorOf(err, ShimDOMException)) {
        throw createDOMException('DataCloneError', 'The object cannot be cloned.');
      }
      // We should rethrow non-cloning exceptions like from
      //  throwing getters (as in the W3C test, key-conversion-exceptions.htm)
      throw err;
    }
    if (func) {
      func(ret);
    }
    return ret;
  }

  /**
   * @typedef {any} AnyValue
   */

  /**
   * @param {string} obj
   * @returns {AnyValue}
   */
  function decode(obj) {
    return typeson.parse(obj);
  }

  /**
   * @param {AnyValue} val
   * @returns {AnyValue}
   */
  function clone(val) {
    // We don't return the intermediate `encode` as we'll need to reencode
    //   the clone as it may differ
    return decode(encode(val));
  }

  var Sca = /*#__PURE__*/Object.freeze({
    __proto__: null,
    clone: clone,
    decode: decode,
    encode: encode,
    register: register
  });

  var readonlyProperties$2 = ['objectStore', 'keyPath', 'multiEntry', 'unique'];

  /**
   * @typedef {number} Integer
   */

  /**
   * @typedef {{
   *   columnName: string,
   *   keyPath: import('./Key.js').KeyPath,
   *   optionalParams: {
   *     unique: boolean,
   *     multiEntry: boolean
   *   }
   *   deleted?: boolean,
   *   __deleted?: boolean,
   *   cursors?: import('./IDBCursor.js').IDBCursorWithValueFull[],
   * }} IDBIndexProperties
   */

  /**
   * IDB Index.
   * @see http://www.w3.org/TR/IndexedDB/#idl-def-IDBIndex
   * @class
   */
  function IDBIndex() {
    throw new TypeError('Illegal constructor');
  }
  var IDBIndexAlias = IDBIndex;

  /**
   * @typedef {IDBIndex & {
   *   name: string,
   *   keyPath: import('./Key.js').KeyPath,
   *   multiEntry: boolean,
   *   unique: boolean,
   *   objectStore: import('./IDBObjectStore.js').IDBObjectStoreFull,
   *   __pendingCreate?: boolean,
   *   __deleted?: boolean,
   *   __originalName: string,
   *   __currentName: string,
   *   __pendingName?: string,
   *   __pendingDelete?: boolean,
   *   __name: string,
   *   __multiEntry: boolean,
   *   __unique: boolean,
   *   __objectStore: import('./IDBObjectStore.js').IDBObjectStoreFull,
   *   __keyPath: import('./Key.js').KeyPath,
   *   __recreated?: boolean
   * }} IDBIndexFull
   */

  /**
   *
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {IDBIndexProperties} indexProperties
   * @returns {IDBIndexFull}
   */
  IDBIndex.__createInstance = function (store, indexProperties) {
    /**
     * @class
     * @this {IDBIndexFull}
     */
    function IDBIndex() {
      var me = this;
      // @ts-expect-error It's ok
      me[Symbol.toStringTag] = 'IDBIndex';
      defineReadonlyProperties(me, readonlyProperties$2);
      me.__objectStore = store;
      me.__name = me.__originalName = indexProperties.columnName;
      me.__keyPath = Array.isArray(indexProperties.keyPath) ? indexProperties.keyPath.slice() : indexProperties.keyPath;
      var optionalParams = indexProperties.optionalParams;
      me.__multiEntry = Boolean(optionalParams && optionalParams.multiEntry);
      me.__unique = Boolean(optionalParams && optionalParams.unique);
      me.__deleted = Boolean(indexProperties.__deleted);
      me.__objectStore.__cursors = indexProperties.cursors || [];
      Object.defineProperty(me, '__currentName', {
        /**
         * @this {IDBIndexFull}
         * @returns {string}
         */
        get: function get() {
          return '__pendingName' in me ? /** @type {string} */me.__pendingName : me.name;
        }
      });
      Object.defineProperty(me, 'name', {
        enumerable: false,
        configurable: false,
        /**
         * @this {IDBIndexFull}
         * @returns {string}
         */
        get: function get() {
          return this.__name;
        },
        /**
         * @param {string} newName
         * @this {IDBIndexFull}
         * @returns {void}
         */
        set: function set(newName) {
          var me = this;
          newName = convertToDOMString(newName);
          var oldName = me.name;
          IDBTransaction.__assertVersionChange(me.objectStore.transaction);
          IDBTransaction.__assertActive(me.objectStore.transaction);
          IDBIndexAlias.__invalidStateIfDeleted(me);
          IDBObjectStore.__invalidStateIfDeleted(me);
          if (newName === oldName) {
            return;
          }
          if (me.objectStore.__indexes[newName] && !me.objectStore.__indexes[newName].__deleted && !me.objectStore.__indexes[newName].__pendingDelete) {
            throw createDOMException('ConstraintError', 'Index "' + newName + '" already exists on ' + me.objectStore.__currentName);
          }
          me.__name = newName;
          var objectStore = me.objectStore;
          delete objectStore.__indexes[oldName];
          objectStore.__indexes[newName] = me;
          objectStore.indexNames.splice(objectStore.indexNames.indexOf(oldName), 1, newName);
          var storeHandle = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */objectStore.transaction.__storeHandles[objectStore.name];
          var oldIndexHandle = storeHandle.__indexHandles[oldName];
          oldIndexHandle.__name = newName; // Fix old references
          storeHandle.__indexHandles[newName] = oldIndexHandle; // Ensure new reference accessible
          me.__pendingName = oldName;
          var colInfoToPreserveArr = [['key', 'BLOB ' + (objectStore.autoIncrement ? 'UNIQUE, inc INTEGER PRIMARY KEY AUTOINCREMENT' : 'PRIMARY KEY')], ['value', 'BLOB']].concat(
          // @ts-expect-error Has numeric indexes instead of iterator
          _toConsumableArray(objectStore.indexNames).filter(function (indexName) {
            return indexName !== newName;
          }).map(function (indexName) {
            return [escapeIndexNameForSQL(indexName), 'BLOB'];
          }));
          me.__renameIndex(objectStore, oldName, newName, colInfoToPreserveArr, function (tx, success) {
            IDBIndexAlias.__updateIndexList(store, tx, function (store) {
              delete storeHandle.__pendingName;
              success(store);
            });
          });
        }
      });
    }
    IDBIndex.prototype = IDBIndexAlias.prototype;

    // @ts-expect-error It's ok
    return new IDBIndex();
  };

  /**
   *
   * @param {IDBIndexFull} index
   * @param {string} [msg]
   * @throws {DOMException}
   * @returns {void}
   */
  IDBIndex.__invalidStateIfDeleted = function (index, msg) {
    if (index.__deleted || index.__pendingDelete || index.__pendingCreate && index.objectStore.transaction && index.objectStore.transaction.__errored) {
      throw createDOMException('InvalidStateError', msg || 'This index has been deleted');
    }
  };

  /**
   * Clones an IDBIndex instance for a different IDBObjectStore instance.
   * @param {IDBIndexFull} index
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @returns {IDBIndexFull}
   */
  IDBIndex.__clone = function (index, store) {
    var idx = IDBIndex.__createInstance(store, {
      columnName: index.name,
      keyPath: index.keyPath,
      optionalParams: {
        multiEntry: index.multiEntry,
        unique: index.unique
      }
    });
    /** @type {const} */
    ['__pendingCreate', '__pendingDelete', '__deleted', '__originalName', '__recreated'].forEach(function (p) {
      // @ts-expect-error Why is this type "never"?
      idx[p] = index[p];
    });
    return idx;
  };

  /**
   * Creates a new index on an object store.
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {IDBIndexFull} index
   * @returns {void}
   */
  IDBIndex.__createIndex = function (store, index) {
    var indexName = index.name;
    var storeName = store.__currentName;
    var idx = store.__indexes[indexName];
    index.__pendingCreate = true;

    // Add the index to the IDBObjectStore
    store.indexNames.push(indexName);
    store.__indexes[indexName] = index; // We add to indexes as needs to be available, e.g., if there is a subsequent deleteIndex call

    var indexHandle = store.__indexHandles[indexName];
    if (!indexHandle || index.__pendingDelete || index.__deleted || indexHandle.__pendingDelete || indexHandle.__deleted) {
      indexHandle = store.__indexHandles[indexName] = IDBIndex.__clone(index, store);
    }

    // Create the index in WebSQL
    var transaction = store.transaction;
    /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    transaction.__addNonRequestToTransactionQueue(function createIndex(tx, args, success, failure) {
      var columnExists = idx && (idx.__deleted || idx.__recreated); // This check must occur here rather than earlier as properties may not have been set yet otherwise

      /** @type {{[key: string]: boolean}} */
      var indexValues = {};

      /**
       * @param {SQLTransaction} tx
       * @param {SQLError} err
       * @returns {void}
       */
      function error(tx, err) {
        failure(createDOMException('UnknownError', 'Could not create index "' + indexName + '"' + err.code + '::' + err.message, err));
      }

      /**
       * @param {SQLTransaction} tx
       * @returns {void}
       */
      function applyIndex(tx) {
        // Update the object store's index list
        IDBIndex.__updateIndexList(store, tx, function () {
          // Add index entries for all existing records
          tx.executeSql('SELECT "key", "value" FROM ' + escapeStoreNameForSQL(storeName), [], function (tx, data) {
            CFG.DEBUG && console.log('Adding existing ' + storeName + ' records to the ' + indexName + ' index');
            addIndexEntry(0);

            /**
             * @param {Integer} i
             * @returns {void}
             */
            function addIndexEntry(i) {
              if (i < data.rows.length) {
                try {
                  var value = decode(unescapeSQLiteResponse(data.rows.item(i).value));
                  var indexKey = extractKeyValueDecodedFromValueUsingKeyPath(value, index.keyPath, index.multiEntry); // Todo: Do we need this stricter error checking?
                  if ('invalid' in indexKey && indexKey.invalid || 'failure' in indexKey && indexKey.failure) {
                    // Todo: Do we need invalid checks and should we instead treat these as being duplicates?
                    throw new Error('Go to catch; ignore bad indexKey');
                  }
                  var indexKeyStr = /** @type {string} */
                  _encode(indexKey.value, index.multiEntry);
                  if (index.unique) {
                    if (indexValues[indexKeyStr]) {
                      indexValues = {};
                      failure(createDOMException('ConstraintError', 'Duplicate values already exist within the store'));
                      return;
                    }
                    indexValues[indexKeyStr] = true;
                  }
                  tx.executeSql('UPDATE ' + escapeStoreNameForSQL(storeName) + ' SET ' + escapeIndexNameForSQL(indexName) + ' = ? WHERE "key" = ?', [escapeSQLiteStatement(indexKeyStr), data.rows.item(i).key], function (tx, data) {
                    addIndexEntry(i + 1);
                  }, /** @type {SQLStatementErrorCallback} */error);
                } catch (e) {
                  // Not a valid value to insert into index, so just continue
                  addIndexEntry(i + 1);
                }
              } else {
                delete index.__pendingCreate;
                delete indexHandle.__pendingCreate;
                if (index.__deleted) {
                  delete index.__deleted;
                  delete indexHandle.__deleted;
                  index.__recreated = true;
                  indexHandle.__recreated = true;
                }
                indexValues = {};
                success(store);
              }
            }
          }, /** @type {SQLStatementErrorCallback} */error);
        }, /** @type {SQLStatementErrorCallback} */error);
      }
      var escapedStoreNameSQL = escapeStoreNameForSQL(storeName);
      var escapedIndexNameSQL = escapeIndexNameForSQL(index.name);

      /**
       * @param {SQLTransaction} tx
       * @returns {void}
       */
      function addIndexSQL(tx) {
        if (!CFG.useSQLiteIndexes) {
          applyIndex(tx);
          return;
        }
        tx.executeSql('CREATE INDEX IF NOT EXISTS "' +
        // The escaped index name must be unique among indexes in the whole database;
        //    so we prefix with store name; as prefixed, will also not conflict with
        //    index on `key`
        // Avoid quotes and separate with special escape sequence
        escapedStoreNameSQL.slice(1, -1) + '^5' + escapedIndexNameSQL.slice(1, -1) + '" ON ' + escapedStoreNameSQL + '(' + escapedIndexNameSQL + ')', [], applyIndex, /** @type {SQLStatementErrorCallback} */error);
      }
      if (columnExists) {
        // For a previously existing index, just update the index entries in the existing column;
        //   no need to add SQLite index to it either as should already exist
        applyIndex(tx);
      } else {
        // For a new index, add a new column to the object store, then apply the index
        var sql = ['ALTER TABLE', escapedStoreNameSQL, 'ADD', escapedIndexNameSQL, 'BLOB'].join(' ');
        CFG.DEBUG && console.log(sql);
        tx.executeSql(sql, [], addIndexSQL, /** @type {SQLStatementErrorCallback} */error);
      }
    });
  };

  /**
   * Deletes an index from an object store.
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {IDBIndexFull} index
   * @returns {void}
   */
  IDBIndex.__deleteIndex = function (store, index) {
    // Remove the index from the IDBObjectStore
    index.__pendingDelete = true;
    var indexHandle = store.__indexHandles[index.name];
    if (indexHandle) {
      indexHandle.__pendingDelete = true;
    }
    store.indexNames.splice(store.indexNames.indexOf(index.name), 1);

    // Remove the index in WebSQL
    var transaction = store.transaction;
    /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    transaction.__addNonRequestToTransactionQueue(function deleteIndex(tx, args, success, failure) {
      /**
       * @param {SQLTransaction} tx
       * @param {SQLError} err
       * @returns {void}
       */
      function error(tx, err) {
        failure(createDOMException('UnknownError', 'Could not delete index "' + index.name + '"', err));
      }

      /**
       * @returns {void}
       */
      function finishDeleteIndex() {
        // Update the object store's index list
        IDBIndex.__updateIndexList(store, tx, function (store) {
          delete index.__pendingDelete;
          delete index.__recreated;
          index.__deleted = true;
          if (indexHandle) {
            indexHandle.__deleted = true;
            delete indexHandle.__pendingDelete;
          }
          success(store);
        }, /** @type {SQLStatementErrorCallback} */error);
      }
      if (!CFG.useSQLiteIndexes) {
        finishDeleteIndex();
        return;
      }
      tx.executeSql('DROP INDEX IF EXISTS ' + sqlQuote(escapeStoreNameForSQL(store.name).slice(1, -1) + '^5' + escapeIndexNameForSQL(index.name).slice(1, -1)), [], finishDeleteIndex, /** @type {SQLStatementErrorCallback} */error);
    });
  };

  /**
   * @typedef {{[key: string]: IDBIndexProperties}} IndexList
   */

  /**
   * Updates index list for the given object store.
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {SQLTransaction} tx
   * @param {(store: IDBObjectStore) => void} success
   * @param {(
   *   tx: SQLTransaction,
   *   err: SQLError
   * ) => boolean} [failure]
   * @returns {void}
   */
  IDBIndex.__updateIndexList = function (store, tx, success, failure) {
    /** @type {IndexList} **/
    var indexList = {};
    for (var i = 0; i < store.indexNames.length; i++) {
      var idx = store.__indexes[store.indexNames[i]];
      indexList[idx.name] = {
        columnName: idx.name,
        keyPath: idx.keyPath,
        optionalParams: {
          unique: idx.unique,
          multiEntry: idx.multiEntry
        },
        deleted: Boolean(idx.__deleted)
      };
    }
    CFG.DEBUG && console.log('Updating the index list for ' + store.__currentName, indexList);
    tx.executeSql('UPDATE __sys__ SET "indexList" = ? WHERE "name" = ?', [JSON.stringify(indexList), escapeSQLiteStatement(store.__currentName)], function () {
      success(store);
    }, /** @type {SQLStatementErrorCallback} */failure);
  };

  /**
   * @typedef {any|IDBKeyRange} Query
   */

  /**
   * Retrieves index data for the given key.
   * @param {Query} range
   * @param {"value"|"key"|"count"} opType
   * @param {boolean} nullDisallowed
   * @param {number} [count]
   * @this {IDBIndexFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBIndex.prototype.__fetchIndexData = function (range, opType, nullDisallowed, count) {
    var me = this;
    if (count !== undefined) {
      count = enforceRange(count, 'unsigned long');
    }
    IDBIndex.__invalidStateIfDeleted(me);
    IDBObjectStore.__invalidStateIfDeleted(me.objectStore);
    if (me.objectStore.__deleted) {
      throw createDOMException('InvalidStateError', "This index's object store has been deleted");
    }
    IDBTransaction.__assertActive(me.objectStore.transaction);
    if (nullDisallowed && isNullish(range)) {
      throw createDOMException('DataError', 'No key or range was specified');
    }
    var fetchArgs = buildFetchIndexDataSQL(nullDisallowed, me, range, opType, false);
    return (/** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.objectStore.transaction.__addToTransactionQueue(function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        executeFetchIndexData.apply(void 0, [count].concat(_toConsumableArray(fetchArgs), args));
      }, undefined, me)
    );
  };

  /**
   * Opens a cursor over the given key range.
   * @this {IDBIndexFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBIndex.prototype.openCursor = function /* query, direction */
  () {
    var me = this;
    // eslint-disable-next-line prefer-rest-params
    var _arguments = Array.prototype.slice.call(arguments),
      query = _arguments[0],
      direction = _arguments[1];
    var cursor = IDBCursorWithValue.__createInstance(query, direction, me.objectStore, me, escapeIndexNameForSQLKeyColumn(me.name), 'value');
    me.__objectStore.__cursors.push(cursor);
    return cursor.__request;
  };

  /**
   * Opens a cursor over the given key range.  The cursor only includes key values, not data.
   * @this {IDBIndexFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBIndex.prototype.openKeyCursor = function /* query, direction */
  () {
    var me = this;
    // eslint-disable-next-line prefer-rest-params
    var _arguments2 = Array.prototype.slice.call(arguments),
      query = _arguments2[0],
      direction = _arguments2[1];
    var cursor = IDBCursor.__createInstance(query, direction, me.objectStore, me, escapeIndexNameForSQLKeyColumn(me.name), 'key');
    me.__objectStore.__cursors.push(cursor);
    return cursor.__request;
  };

  /**
   *
   * @param {Query} query
   * @throws {TypeError}
   * @this {IDBIndexFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBIndex.prototype.get = function (query) {
    if (!arguments.length) {
      // Per https://heycam.github.io/webidl/
      throw new TypeError('A parameter was missing for `IDBIndex.get`.');
    }
    return this.__fetchIndexData(query, 'value', true);
  };

  /**
   *
   * @param {Query} query
   * @throws {TypeError}
   * @this {IDBIndexFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBIndex.prototype.getKey = function (query) {
    if (!arguments.length) {
      // Per https://heycam.github.io/webidl/
      throw new TypeError('A parameter was missing for `IDBIndex.getKey`.');
    }
    return this.__fetchIndexData(query, 'key', true);
  };

  /**
   * @this {IDBIndexFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBIndex.prototype.getAll = function /* query, count */
  () {
    // eslint-disable-next-line prefer-rest-params
    var _arguments3 = Array.prototype.slice.call(arguments),
      query = _arguments3[0],
      count = _arguments3[1];
    return this.__fetchIndexData(query, 'value', false, count);
  };

  /**
   * @this {IDBIndexFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBIndex.prototype.getAllKeys = function /* query, count */
  () {
    // eslint-disable-next-line prefer-rest-params
    var _arguments4 = Array.prototype.slice.call(arguments),
      query = _arguments4[0],
      count = _arguments4[1];
    return this.__fetchIndexData(query, 'key', false, count);
  };

  /**
   * @this {IDBIndexFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBIndex.prototype.count = function /* query */
  () {
    var me = this;
    // eslint-disable-next-line prefer-rest-params
    var query = arguments[0];
    // With the exception of needing to check whether the index has been
    //  deleted, we could, for greater spec parity (if not accuracy),
    //  just call:
    //  `return me.__objectStore.count(query);`

    if (instanceOf(query, IDBKeyRange)) {
      // Todo: Do we need this block?
      // We don't need to add to cursors array since has the count parameter which won't cache
      return IDBCursorWithValue.__createInstance(query, 'next', me.objectStore, me, escapeIndexNameForSQLKeyColumn(me.name), 'value', true).__request;
    }
    return me.__fetchIndexData(query, 'count', false);
  };

  /**
   *
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {string} oldName
   * @param {string} newName
   * @param {string[][]} colInfoToPreserveArr
   * @param {null|((
   *   tx: SQLTransaction,
   *   success: ((store: IDBObjectStore) => void)
   * ) => void)} cb
   * @this {IDBIndexFull}
   * @returns {void}
   */
  IDBIndex.prototype.__renameIndex = function (store, oldName, newName) {
    var colInfoToPreserveArr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var cb = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var newNameType = 'BLOB';
    var storeName = store.__currentName;
    var escapedStoreNameSQL = escapeStoreNameForSQL(storeName);
    var escapedNewIndexNameSQL = escapeIndexNameForSQL(newName);
    var escapedTmpStoreNameSQL = sqlQuote('tmp_' + escapeStoreNameForSQL(storeName).slice(1, -1));
    var colNamesToPreserve = colInfoToPreserveArr.map(function (colInfo) {
      return colInfo[0];
    });
    var colInfoToPreserve = colInfoToPreserveArr.map(function (colInfo) {
      return colInfo.join(' ');
    });
    var listColInfoToPreserve = colInfoToPreserve.length ? colInfoToPreserve.join(', ') + ', ' : '';
    var listColsToPreserve = colNamesToPreserve.length ? colNamesToPreserve.join(', ') + ', ' : '';

    // We could adapt the approach at http://stackoverflow.com/a/8430746/271577
    //    to make the approach reusable without passing column names, but it is a bit fragile
    /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    store.transaction.__addNonRequestToTransactionQueue(function renameIndex(tx, args, success, error) {
      /**
       * @param {SQLTransaction} tx
       * @param {SQLError} err
       * @returns {void}
       */
      function sqlError(tx, err) {
        error(err);
      }
      /**
       * @returns {void}
       */
      function finish() {
        if (cb) {
          cb(tx, success);
          return;
        }
        success();
      }
      // See https://www.sqlite.org/lang_altertable.html#otheralter
      // We don't query for indexes as we already have the info
      // This approach has the advantage of auto-deleting indexes via the DROP TABLE
      var sql = 'CREATE TABLE ' + escapedTmpStoreNameSQL + '(' + listColInfoToPreserve + escapedNewIndexNameSQL + ' ' + newNameType + ')';
      CFG.DEBUG && console.log(sql);
      tx.executeSql(sql, [], function () {
        var sql = 'INSERT INTO ' + escapedTmpStoreNameSQL + '(' + listColsToPreserve + escapedNewIndexNameSQL + ') SELECT ' + listColsToPreserve + escapeIndexNameForSQL(oldName) + ' FROM ' + escapedStoreNameSQL;
        CFG.DEBUG && console.log(sql);
        tx.executeSql(sql, [], function () {
          var sql = 'DROP TABLE ' + escapedStoreNameSQL;
          CFG.DEBUG && console.log(sql);
          tx.executeSql(sql, [], function () {
            var sql = 'ALTER TABLE ' + escapedTmpStoreNameSQL + ' RENAME TO ' + escapedStoreNameSQL;
            CFG.DEBUG && console.log(sql);
            tx.executeSql(sql, [], function (tx, data) {
              if (!CFG.useSQLiteIndexes) {
                finish();
                return;
              }
              var indexCreations = colNamesToPreserve.slice(2) // Doing `key` separately and no need for index on `value`
              .map(function (escapedIndexNameSQL) {
                return new SyncPromise(function (resolve, reject) {
                  var escapedIndexToRecreate = sqlQuote(escapedStoreNameSQL.slice(1, -1) + '^5' + escapedIndexNameSQL.slice(1, -1));
                  // const sql = 'DROP INDEX IF EXISTS ' + escapedIndexToRecreate;
                  // CFG.DEBUG && console.log(sql);
                  // tx.executeSql(sql, [], function () {
                  var sql = 'CREATE INDEX ' + escapedIndexToRecreate + ' ON ' + escapedStoreNameSQL + '(' + escapedIndexNameSQL + ')';
                  CFG.DEBUG && console.log(sql);
                  tx.executeSql(sql, [], resolve, /* eslint-disable no-extra-parens -- TS */
                  /** @type {SQLStatementErrorCallback} */
                  function (tx, err) {
                    reject(err);
                  }
                  /* eslint-enable no-extra-parens -- TS */);
                  // }, function (tx, err) {
                  //    reject(err);
                  // });
                });
              });

              indexCreations.push(new SyncPromise(function (resolve, reject) {
                var escapedIndexToRecreate = sqlQuote('sk_' + escapedStoreNameSQL.slice(1, -1));
                // Chrome erring here if not dropped first; Node does not
                var sql = 'DROP INDEX IF EXISTS ' + escapedIndexToRecreate;
                CFG.DEBUG && console.log(sql);
                tx.executeSql(sql, [], function () {
                  var sql = 'CREATE INDEX ' + escapedIndexToRecreate + ' ON ' + escapedStoreNameSQL + '("key")';
                  CFG.DEBUG && console.log(sql);
                  tx.executeSql(sql, [], resolve, /* eslint-disable no-extra-parens -- TS */
                  /** @type {SQLStatementErrorCallback} */
                  function (tx, err) {
                    /* eslint-enable no-extra-parens -- TS */
                    reject(err);
                  });
                }, /* eslint-disable no-extra-parens -- TS */
                /** @type {SQLStatementErrorCallback} */
                function (tx, err) {
                  /* eslint-enable no-extra-parens -- TS */
                  reject(err);
                });
              }));
              SyncPromise.all(indexCreations).then(finish, /** @type {(reason: any) => PromiseLike<never>} */
              error)["catch"](function (err) {
                console.log('Index rename error');
                throw err;
              });
            }, /** @type {SQLStatementErrorCallback} */sqlError);
          }, /** @type {SQLStatementErrorCallback} */sqlError);
        }, /** @type {SQLStatementErrorCallback} */sqlError);
      }, /** @type {SQLStatementErrorCallback} */sqlError);
    });
  };

  /**
   * @typedef {any} AnyValue
   */

  Object.defineProperty(IDBIndex, Symbol.hasInstance, {
    /**
     * @param {AnyValue} obj
     * @returns {boolean}
     */
    value: function value(obj) {
      return isObj(obj) && 'openCursor' in obj && typeof obj.openCursor === 'function' && 'multiEntry' in obj && typeof obj.multiEntry === 'boolean';
    }
  });
  defineReadonlyOuterInterface(IDBIndex.prototype, readonlyProperties$2);
  defineOuterInterface(IDBIndex.prototype, ['name']);
  IDBIndex.prototype[Symbol.toStringTag] = 'IDBIndexPrototype';
  Object.defineProperty(IDBIndex, 'prototype', {
    writable: false
  });

  /**
   * @param {number|null} count
   * @param {boolean} unboundedDisallowed
   * @param {IDBIndexFull} index
   * @param {boolean} hasKey
   * @param {import('./Key.js').Value|import('./Key.js').Key} range
   * @param {"value"|"key"|"count"} opType
   * @param {boolean} multiChecks
   * @param {string[]} sql
   * @param {string[]} sqlValues
   * @param {SQLTransaction} tx
   * @param {null|undefined} args
   * @param {(result: number|undefined|[]|AnyValue|AnyValue[]) => void} success
   * @param {(tx: SQLTransaction, err: SQLError) => void} error
   * @returns {void}
   */
  function executeFetchIndexData(count, unboundedDisallowed, index, hasKey, range, opType, multiChecks, sql, sqlValues, tx, args, success, error) {
    if (unboundedDisallowed) {
      count = 1;
    }
    if (count) {
      sql.push('LIMIT', String(count));
    }
    var isCount = opType === 'count';
    CFG.DEBUG && console.log('Trying to fetch data for Index', sql.join(' '), sqlValues);
    tx.executeSql(sql.join(' '), sqlValues, function (tx, data) {
      var records = [];
      var recordCount = 0;
      var decode$1 = isCount ? function () {/* */} : opType === 'key'
      // eslint-disable-next-line operator-linebreak -- JSDoc
      ?
      /**
       * @param {{
       *   key: string
       * }} record
       * @returns {import('./Key.js').ValueType|undefined}
       */
      function (record) {
        // Key.convertValueToKey(record.key); // Already validated before storage
        return _decode(unescapeSQLiteResponse(record.key));
      }
      // eslint-disable-next-line operator-linebreak -- JSDoc
      :
      /**
       * @param {{
       *   value: string
       * }} record
       * @returns {AnyValue}
       */
      function (record) {
        // when opType is value
        return decode(unescapeSQLiteResponse(record.value));
      };
      if (index.multiEntry) {
        var escapedIndexNameForKeyCol = escapeIndexNameForSQLKeyColumn(index.name);
        var encodedKey = _encode(range, index.multiEntry);
        var _loop = function _loop() {
          var row = data.rows.item(i);
          var rowKey = /** @type {import('./Key.js').ValueTypeArray} */
          _decode(row[escapedIndexNameForKeyCol]);
          var record;
          if (hasKey && (multiChecks && range.some(
          /**
           * @param {string} check
           * @returns {boolean}
           */
          function (check) {
            return rowKey.includes(check);
          }) ||
          // More precise than our SQL
          isMultiEntryMatch( /** @type {string} */
          encodedKey, row[escapedIndexNameForKeyCol]))) {
            recordCount++;
            record = row;
          } else if (!hasKey && !multiChecks) {
            if (rowKey !== undefined) {
              recordCount += Array.isArray(rowKey) ? rowKey.length : 1;
              record = row;
            }
          }
          if (record) {
            records.push(decode$1(record));
            if (unboundedDisallowed) {
              return "break";
            }
          }
        };
        for (var i = 0; i < data.rows.length; i++) {
          var _ret = _loop();
          if (_ret === "break") break;
        }
      } else {
        for (var _i = 0; _i < data.rows.length; _i++) {
          var record = data.rows.item(_i);
          if (record) {
            records.push(decode$1(record));
          }
        }
        recordCount = records.length;
      }
      if (isCount) {
        success(recordCount);
      } else if (recordCount === 0) {
        success(unboundedDisallowed ? undefined : []);
      } else {
        success(unboundedDisallowed ? records[0] : records);
      }
    }, /** @type {SQLStatementErrorCallback} */error);
  }

  /**
   * @param {boolean} nullDisallowed
   * @param {IDBIndexFull} index
   * @param {import('./Key.js').Value|import('./Key.js').Key} range
   * @param {"value"|"key"|"count"} opType
   * @param {boolean} multiChecks
   * @returns {[
   *   nullDisallowed: boolean,
   *   index: IDBIndexFull,
   *   hasRange: boolean,
   *   range: import('./Key.js').Value|import('./Key.js').Key,
   *   opType: "value"|"key"|"count",
   *   multiChecks: boolean,
   *   sql: string[],
   *   sqlValues: string[]
   * ]}
   */
  function buildFetchIndexDataSQL(nullDisallowed, index, range, opType, multiChecks) {
    var hasRange = nullDisallowed || !isNullish(range);
    var col = opType === 'count' ? 'key' : opType; // It doesn't matter which column we use for 'count' as long as it is valid
    var sql = ['SELECT', sqlQuote(col) + (index.multiEntry ? ', ' + escapeIndexNameForSQL(index.name) : ''), 'FROM', escapeStoreNameForSQL(index.objectStore.__currentName), 'WHERE', escapeIndexNameForSQL(index.name), 'NOT NULL'];

    /** @type {string[]} */
    var sqlValues = [];
    if (hasRange) {
      if (multiChecks) {
        sql.push('AND (');
        /** @type {import('./Key.js').KeyPathArray} */
        range.forEach(function (innerKey, i) {
          if (i > 0) sql.push('OR');
          sql.push(escapeIndexNameForSQL(index.name), "LIKE ? ESCAPE '^' ");
          sqlValues.push('%' + sqlLIKEEscape( /** @type {string} */_encode(innerKey, index.multiEntry)) + '%');
        });
        sql.push(')');
      } else if (index.multiEntry) {
        sql.push('AND', escapeIndexNameForSQL(index.name), "LIKE ? ESCAPE '^'");
        sqlValues.push('%' + sqlLIKEEscape( /** @type {string} */_encode(range, index.multiEntry)) + '%');
      } else {
        var convertedRange = convertValueToKeyRange(range, nullDisallowed);
        setSQLForKeyRange(convertedRange, escapeIndexNameForSQL(index.name), sql, sqlValues, true, false);
      }
    }
    return [nullDisallowed, index, hasRange, range, opType, multiChecks, sql, sqlValues];
  }

  var readonlyProperties$1 = ['keyPath', 'indexNames', 'transaction', 'autoIncrement'];

  /**
   * @typedef {number} Integer
   */

  /**
   * IndexedDB Object Store.
   * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBObjectStore
   * @class
   */
  function IDBObjectStore() {
    throw new TypeError('Illegal constructor');
  }
  var IDBObjectStoreAlias = IDBObjectStore;

  /**
   * @typedef {IDBObjectStore & {
   *   name: string,
   *   keyPath: import('./Key.js').KeyPath,
   *   transaction?: import('./IDBTransaction.js').IDBTransactionFull,
   *   indexNames: import('./DOMStringList.js').DOMStringListFull,
   *   autoIncrement: boolean,
   *   __autoIncrement: boolean,
   *   __indexes: {[key: string]: import('./IDBIndex.js').IDBIndexFull},
   *   __indexHandles: {[key: string]: import('./IDBIndex.js').IDBIndexFull},
   *   __indexNames: import('./DOMStringList.js').DOMStringListFull,
   *   __oldIndexNames: import('./DOMStringList.js').DOMStringListFull,
   *   __transaction?: import('./IDBTransaction.js').IDBTransactionFull,
   *   __name: string,
   *   __keyPath: import('./Key.js').KeyPath,
   *   __originalName: string,
   *   __currentName: string,
   *   __pendingName?: string,
   *   __pendingDelete?: boolean,
   *   __pendingCreate?: boolean,
   *   __deleted?: boolean,
   *   __cursors: (
   *     import('./IDBCursor.js').IDBCursorFull|
   *     import('./IDBCursor.js').IDBCursorWithValueFull
   *   )[],
   *   __idbdb: import('./IDBDatabase.js').IDBDatabaseFull,
   * }} IDBObjectStoreFull
   */

  /**
   *
   * @param {import('./IDBDatabase.js').IDBObjectStoreProperties} storeProperties
   * @param {import('./IDBTransaction.js').IDBTransactionFull} [transaction]
   * @returns {IDBObjectStoreFull}
   */
  IDBObjectStore.__createInstance = function (storeProperties, transaction) {
    /**
     * @class
     * @this {IDBObjectStoreFull}
     */
    function IDBObjectStore() {
      var me = this;
      // @ts-expect-error It's ok
      me[Symbol.toStringTag] = 'IDBObjectStore';
      defineReadonlyProperties(this, readonlyProperties$1);
      me.__name = me.__originalName = storeProperties.name;
      me.__keyPath = Array.isArray(storeProperties.keyPath) ? storeProperties.keyPath.slice() : storeProperties.keyPath;
      me.__transaction = transaction;
      me.__idbdb = storeProperties.idbdb;
      me.__cursors = storeProperties.cursors || [];

      // autoInc is numeric (0/1) on WinPhone
      me.__autoIncrement = Boolean(storeProperties.autoInc);
      me.__indexes = {};
      me.__indexHandles = {};
      me.__indexNames = DOMStringList.__createInstance();
      var indexList = storeProperties.indexList;
      for (var indexName in indexList) {
        if (Object.hasOwn(indexList, indexName)) {
          var index = IDBIndex.__createInstance(me, indexList[indexName]);
          me.__indexes[index.name] = index;
          if (!index.__deleted) {
            me.indexNames.push(index.name);
          }
        }
      }
      me.__oldIndexNames = me.indexNames.clone();
      Object.defineProperty(this, '__currentName', {
        get: function get() {
          return '__pendingName' in this ? this.__pendingName : this.name;
        }
      });
      Object.defineProperty(this, 'name', {
        enumerable: false,
        configurable: false,
        /**
         * @this {IDBObjectStoreFull}
         * @returns {string}
         */
        get: function get() {
          return this.__name;
        },
        /**
         * @param {string} name
         * @this {IDBObjectStoreFull}
         * @returns {void}
         */
        set: function set(name) {
          var me = this;
          name = convertToDOMString(name);
          var oldName = me.name;
          IDBObjectStoreAlias.__invalidStateIfDeleted(me);
          IDBTransaction.__assertVersionChange(me.transaction);
          IDBTransaction.__assertActive(me.transaction);
          if (oldName === name) {
            return;
          }
          if (me.__idbdb.__objectStores[name] && !me.__idbdb.__objectStores[name].__pendingDelete) {
            throw createDOMException('ConstraintError', 'Object store "' + name + '" already exists in ' + me.__idbdb.name);
          }
          me.__name = name;
          var oldStore = me.__idbdb.__objectStores[oldName];
          oldStore.__name = name; // Fix old references
          me.__idbdb.__objectStores[name] = oldStore; // Ensure new reference accessible
          delete me.__idbdb.__objectStores[oldName]; // Ensure won't be found

          me.__idbdb.objectStoreNames.splice(me.__idbdb.objectStoreNames.indexOf(oldName), 1, name);
          var oldHandle = /** @type {IDBObjectStoreFull} */
          /** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.transaction.__storeHandles[oldName];
          oldHandle.__name = name; // Fix old references
          /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
          me.transaction.__storeHandles[name] = oldHandle; // Ensure new reference accessible

          me.__pendingName = oldName;
          var sql = 'UPDATE __sys__ SET "name" = ? WHERE "name" = ?';
          var sqlValues = [escapeSQLiteStatement(name), escapeSQLiteStatement(oldName)];
          CFG.DEBUG && console.log(sql, sqlValues);
          /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
          me.transaction.__addNonRequestToTransactionQueue(function objectStoreClear(tx, args, success, error) {
            tx.executeSql(sql, sqlValues, function (tx, data) {
              // This SQL preserves indexes per https://www.sqlite.org/lang_altertable.html
              var sql = 'ALTER TABLE ' + escapeStoreNameForSQL(oldName) + ' RENAME TO ' + escapeStoreNameForSQL(name);
              CFG.DEBUG && console.log(sql);
              tx.executeSql(sql, [], function (tx, data) {
                delete me.__pendingName;
                success();
              });
            }, function (tx, err) {
              error(err);
              return true;
            });
          });
        }
      });
    }
    IDBObjectStore.prototype = IDBObjectStoreAlias.prototype;

    // @ts-expect-error It's ok
    return new IDBObjectStore();
  };

  /**
   * Clones an IDBObjectStore instance for a different IDBTransaction instance.
   * @param {IDBObjectStoreFull} store
   * @param {import('./IDBTransaction.js').IDBTransactionFull} transaction
   * @returns {IDBObjectStoreFull}
   */
  IDBObjectStore.__clone = function (store, transaction) {
    var newStore = IDBObjectStore.__createInstance({
      name: store.__currentName,
      keyPath: Array.isArray(store.keyPath) ? store.keyPath.slice() : store.keyPath,
      autoInc: store.autoIncrement,
      indexList: {},
      idbdb: store.__idbdb,
      cursors: store.__cursors
    }, transaction);

    /** @type {const} */
    ['__indexes', '__indexNames', '__oldIndexNames', '__deleted', '__pendingDelete', '__pendingCreate', '__originalName'].forEach(function (p) {
      // @ts-expect-error It's ok
      newStore[p] = store[p];
    });
    return newStore;
  };

  /**
   *
   * @param {IDBObjectStoreFull|import('./IDBIndex.js').IDBIndexFull} store
   * @param {string} [msg]
   * @throws {DOMException}
   * @returns {void}
   */
  IDBObjectStore.__invalidStateIfDeleted = function (store, msg) {
    if (store.__deleted || store.__pendingDelete || store.__pendingCreate && 'transaction' in store && store.transaction && store.transaction.__errored) {
      throw createDOMException('InvalidStateError', msg || 'This store has been deleted');
    }
  };

  /**
   * Creates a new object store in the database.
   * @param {import('./IDBDatabase.js').IDBDatabaseFull} db
   * @param {IDBObjectStoreFull} store
   * @returns {IDBObjectStore}
   */
  IDBObjectStore.__createObjectStore = function (db, store) {
    // Add the object store to the IDBDatabase
    var storeName = store.__currentName;
    store.__pendingCreate = true;
    db.__objectStores[storeName] = store;
    db.objectStoreNames.push(storeName);

    // Add the object store to WebSQL
    var transaction = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    db.__versionTransaction;
    var storeHandles = transaction.__storeHandles;
    if (!storeHandles[storeName] ||
    // These latter conditions are to allow store
    //   recreation to create new clone object
    storeHandles[storeName].__pendingDelete || storeHandles[storeName].__deleted) {
      storeHandles[storeName] = IDBObjectStore.__clone(store, transaction);
    }
    transaction.__addNonRequestToTransactionQueue(function createObjectStore(tx, args, success, failure) {
      /**
       * @param {SQLTransaction} tx
       * @param {SQLError} [err]
       * @returns {boolean}
       */
      function error(tx, err) {
        CFG.DEBUG && console.log(err);
        failure(createDOMException('UnknownError', 'Could not create object store "' + storeName + '"', err));
        return true;
      }
      var escapedStoreNameSQL = escapeStoreNameForSQL(storeName);
      // key INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE
      var sql = ['CREATE TABLE', escapedStoreNameSQL, '(key BLOB', store.autoIncrement ? 'UNIQUE, inc INTEGER PRIMARY KEY AUTOINCREMENT' : 'PRIMARY KEY', ', value BLOB)'].join(' ');
      CFG.DEBUG && console.log(sql);
      tx.executeSql(sql, [], function (tx, data) {
        /**
         * @returns {void}
         */
        function insertStoreInfo() {
          var encodedKeyPath = JSON.stringify(store.keyPath);
          tx.executeSql('INSERT INTO __sys__ VALUES (?,?,?,?,?)', [escapeSQLiteStatement(storeName), encodedKeyPath,
          // For why converting here, see comment and following
          //  discussion at:
          //  https://github.com/axemclion/IndexedDBShim/issues/313#issuecomment-590086778
          Number(store.autoIncrement), '{}', 1], function () {
            delete store.__pendingCreate;
            delete store.__deleted;
            success(store);
          }, error);
        }
        if (!CFG.useSQLiteIndexes) {
          insertStoreInfo();
          return;
        }
        tx.executeSql('CREATE INDEX IF NOT EXISTS ' + sqlQuote('sk_' + escapedStoreNameSQL.slice(1, -1)) + ' ON ' + escapedStoreNameSQL + '("key")', [], insertStoreInfo, error);
      }, error);
    });
    return storeHandles[storeName];
  };

  /**
   * Deletes an object store from the database.
   * @param {import('./IDBDatabase.js').IDBDatabaseFull} db
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @returns {void}
   */
  IDBObjectStore.__deleteObjectStore = function (db, store) {
    // Remove the object store from the IDBDatabase
    store.__pendingDelete = true;
    // We don't delete the other index holders in case need reversion
    store.__indexNames = DOMStringList.__createInstance();
    db.objectStoreNames.splice(db.objectStoreNames.indexOf(store.__currentName), 1);
    var storeHandle = db.__versionTransaction.__storeHandles[store.__currentName];
    if (storeHandle) {
      storeHandle.__indexNames = DOMStringList.__createInstance();
      storeHandle.__pendingDelete = true;
    }

    // Remove the object store from WebSQL
    var transaction = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    db.__versionTransaction;
    transaction.__addNonRequestToTransactionQueue(function deleteObjectStore(tx, args, success, failure) {
      /**
       * @param {SQLTransaction} tx
       * @param {SQLError} [err]
       * @returns {boolean}
       */
      function error(tx, err) {
        CFG.DEBUG && console.log(err);
        failure(createDOMException('UnknownError', 'Could not delete ObjectStore', err));
        return true;
      }
      tx.executeSql('SELECT "name" FROM __sys__ WHERE "name" = ?', [escapeSQLiteStatement(store.__currentName)], function (tx, data) {
        if (data.rows.length > 0) {
          tx.executeSql('DROP TABLE ' + escapeStoreNameForSQL(store.__currentName), [], function () {
            tx.executeSql('DELETE FROM __sys__ WHERE "name" = ?', [escapeSQLiteStatement(store.__currentName)], function () {
              delete store.__pendingDelete;
              store.__deleted = true;
              if (storeHandle) {
                delete storeHandle.__pendingDelete;
                storeHandle.__deleted = true;
              }
              success();
            }, error);
          }, error);
        }
      });
    });
  };

  /**
   * @typedef {[import('./Key.js').Key, import('./Key.js').Value]} KeyValueArray
   */

  // Todo: Although we may end up needing to do cloning genuinely asynchronously (for Blobs and FileLists),
  //   and we'll want to ensure the queue starts up synchronously, we nevertheless do the cloning
  //   before entering the queue and its callback since the encoding we do is preceded by validation
  //   which we must do synchronously anyways. If we reimplement Blobs and FileLists asynchronously,
  //   we can detect these types (though validating synchronously as possible) and once entering the
  //   queue callback, ensure they load before triggering success or failure (perhaps by returning and
  //   a `SyncPromise` from the `Sca.clone` operation and later detecting and ensuring it is resolved
  //   before continuing).
  /**
   * Determines whether the given inline or out-of-line key is valid,
   *   according to the object store's schema.
   * @param {import('./Key.js').Value} value Used for inline keys
   * @param {import('./Key.js').Key} key Used for out-of-line keys
   * @param {boolean} cursorUpdate
   * @throws {DOMException}
   * @this {IDBObjectStoreFull}
   * @returns {KeyValueArray}
   */
  IDBObjectStore.prototype.__validateKeyAndValueAndCloneValue = function (value, key, cursorUpdate) {
    var me = this;
    if (me.keyPath !== null) {
      if (key !== undefined) {
        throw createDOMException('DataError', 'The object store uses in-line keys and the key parameter was provided');
      }
      // Todo Binary: Avoid blobs loading async to ensure cloning (and errors therein)
      //   occurs sync; then can make cloning and this method without callbacks (except where ok
      //   to be async)
      var _clonedValue = clone(value);
      key = extractKeyValueDecodedFromValueUsingKeyPath(_clonedValue, me.keyPath); // May throw so "rethrow"
      if (key.invalid) {
        throw createDOMException('DataError', 'KeyPath was specified, but key was invalid.');
      }
      if (key.failure) {
        if (!cursorUpdate) {
          if (!me.autoIncrement) {
            throw createDOMException('DataError', 'Could not evaluate a key from keyPath and there is no key generator');
          }
          // Todo: Could the keyPath not be an array?
          if (!checkKeyCouldBeInjectedIntoValue(_clonedValue, /** @type {string} */me.keyPath)) {
            throw createDOMException('DataError', 'A key could not be injected into a value');
          }
          // A key will be generated
          return [undefined, _clonedValue];
        }
        throw createDOMException('DataError', 'Could not evaluate a key from keyPath');
      }
      // An `IDBCursor.update` call will also throw if not equal to the cursor’s effective key
      return [key.value, _clonedValue];
    }
    if (key === undefined) {
      if (!me.autoIncrement) {
        throw createDOMException('DataError', 'The object store uses out-of-line keys and has no key generator and the key parameter was not provided.');
      }
      // A key will be generated
      key = undefined;
    } else {
      convertValueToKeyRethrowingAndIfInvalid(key);
    }
    var clonedValue = clone(value);
    return [key, clonedValue];
  };

  /**
   * From the store properties and object, extracts the value for the key in
   *   the object store
   * If the table has auto increment, get the current number (unless it has
   *   a keyPath leading to a valid but non-numeric or < 1 key).
   * @param {SQLTransaction} tx
   * @param {import('./Key.js').Value} value
   * @param {import('./Key.js').Key} key
   * @param {(key: import('./Key.js').Key, cn?: Integer) => void} success
   * @param {import('./Key.js').SQLFailureCallback} failCb
   * @this {IDBObjectStoreFull}
   * @returns {void}
   */
  IDBObjectStore.prototype.__deriveKey = function (tx, value, key, success, failCb) {
    var me = this;

    // Only run if cloning is needed
    /**
     * @param {Integer} [oldCn]
     * @returns {void}
     */
    function keyCloneThenSuccess(oldCn) {
      // We want to return the original key, so we don't need to accept an argument here
      encode(key, function (key) {
        key = decode(key);
        success(key, oldCn);
      });
    }
    if (me.autoIncrement) {
      // If auto-increment and no valid primaryKey found on the keyPath, get and set the new value, and use
      if (key === undefined) {
        generateKeyForStore(tx, me, function (failure, key, oldCn) {
          if (failure) {
            failCb(createDOMException('ConstraintError', 'The key generator\'s current number has reached the maximum safe integer limit'));
            return;
          }
          if (me.keyPath !== null) {
            // Should not throw now as checked earlier
            // Todo: Could this not be an array here?
            injectKeyIntoValueUsingKeyPath(value, key, /** @type {string} */me.keyPath);
          }
          success(key, oldCn);
        }, failCb);
      } else {
        possiblyUpdateKeyGenerator(tx, me, key, keyCloneThenSuccess, failCb);
      }
      // Not auto-increment
    } else {
      keyCloneThenSuccess();
    }
  };

  /**
   *
   * @param {SQLTransaction} tx
   * @param {string} encoded
   * @param {import('./Key.js').Value} value
   * @param {import('./Key.js').Key|Integer} clonedKeyOrCurrentNumber
   * @param {Integer|undefined} oldCn
   * @param {(
   *   clonedKeyOrCurrentNumber: import('./Key.js').Key|Integer
   * ) => void} success
   * @param {(err: Error|DOMException) => void} error
   * @this {IDBObjectStoreFull}
   * @returns {SyncPromise}
   */
  IDBObjectStore.prototype.__insertData = function (tx, encoded, value, clonedKeyOrCurrentNumber, oldCn, success, error) {
    var me = this;
    // The `ConstraintError` to occur for `add` upon a duplicate will occur naturally in attempting an insert
    // We process the index information first as it will stored in the same table as the store
    /** @type {{[key: string]: string}} */
    var paramMap = {};
    var indexPromises = Object.keys(
    // We do not iterate `indexNames` as those can be modified synchronously (e.g.,
    //   `deleteIndex` could, by its synchronous removal from `indexNames`, prevent
    //   iteration here of an index though per IndexedDB test
    //   `idbobjectstore_createIndex4-deleteIndex-event_order.js`, `createIndex`
    //   should be allowed to first fail even in such a case).
    me.__indexes).map(function (indexName) {
      // While this may sometimes resolve sync and sometimes async, the
      //   idea is to avoid, where possible, unnecessary delays (and
      //   consuming code ought to only see a difference in the browser
      //   where we can't control the transaction timeout anyways).
      return new SyncPromise(function (resolve, reject) {
        var index = me.__indexes[indexName];
        if (
        // `createIndex` was called synchronously after the current insertion was added to
        //  the transaction queue so although it was added to `__indexes`, it is not yet
        //  ready to be checked here for the insertion as it will be when running the
        //  `createIndex` operation (e.g., if two items with the same key were added and
        //  *then* a unique index was created, it should not continue to err and abort
        //  yet, as we're still handling the insertions which must be processed (e.g., to
        //  add duplicates which then cause a unique index to fail))
        index.__pendingCreate ||
        // If already deleted (and not just slated for deletion (by `__pendingDelete`
        //  after this add), we avoid checks
        index.__deleted) {
          resolve(undefined);
          return;
        }
        /**
         * @type {import('./Key.js').KeyValueObject|
         *   import('./Key.js').KeyPathEvaluateValue}
         */
        var indexKey;
        try {
          indexKey = extractKeyValueDecodedFromValueUsingKeyPath(value, index.keyPath, index.multiEntry); // Add as necessary to this and skip past this index if exceptions here)
          if ('invalid' in indexKey && indexKey.invalid || 'failure' in indexKey && indexKey.failure) {
            throw new Error('Go to catch');
          }
        } catch (err) {
          resolve(undefined);
          return;
        }
        indexKey = indexKey.value;
        /**
         * @param {import('./IDBIndex.js').IDBIndexFull} index
         * @returns {void}
         */
        function setIndexInfo(index) {
          if (indexKey === undefined) {
            return;
          }
          paramMap[index.__currentName] = /** @type {string} */
          _encode(indexKey, index.multiEntry);
        }
        if (index.unique) {
          var multiCheck = index.multiEntry && Array.isArray(indexKey);
          var fetchArgs = buildFetchIndexDataSQL(true, index, indexKey, 'key', multiCheck);
          executeFetchIndexData.apply(void 0, [null].concat(_toConsumableArray(fetchArgs), [tx, null, function success(key) {
            if (key === undefined) {
              setIndexInfo(index);
              resolve(undefined);
              return;
            }
            reject(createDOMException('ConstraintError', 'Index already contains a record equal to ' + (multiCheck ? 'one of the subkeys of' : '') + '`indexKey`'));
          }, reject]));
        } else {
          setIndexInfo(index);
          resolve(undefined);
        }
      });
    });
    return SyncPromise.all(indexPromises).then(function () {
      var sqlStart = ['INSERT INTO', escapeStoreNameForSQL(me.__currentName), '('];
      var sqlEnd = [' VALUES ('];
      var insertSqlValues = [];
      if (clonedKeyOrCurrentNumber !== undefined) {
        // Key.convertValueToKey(primaryKey); // Already run
        sqlStart.push(sqlQuote('key'), ',');
        sqlEnd.push('?,');
        insertSqlValues.push(escapeSQLiteStatement( /** @type {string} */_encode(clonedKeyOrCurrentNumber)));
      }
      Object.entries(paramMap).forEach(function (_ref) {
        var _ref2 = _slicedToArray$1(_ref, 2),
          key = _ref2[0],
          stmt = _ref2[1];
        sqlStart.push(escapeIndexNameForSQL(key) + ',');
        sqlEnd.push('?,');
        insertSqlValues.push(escapeSQLiteStatement(stmt));
      });
      // removing the trailing comma
      sqlStart.push(sqlQuote('value') + ' )');
      sqlEnd.push('?)');
      insertSqlValues.push(escapeSQLiteStatement(encoded));
      var insertSql = sqlStart.join(' ') + sqlEnd.join(' ');
      CFG.DEBUG && console.log('SQL for adding', insertSql, insertSqlValues);
      tx.executeSql(insertSql, insertSqlValues, function (tx, data) {
        success(clonedKeyOrCurrentNumber);
      }, function (tx, err) {
        // Should occur for `add` operation
        error(createDOMException('ConstraintError', /** @type {string} */err.message, err));
        return true;
      });
      return undefined;
    })["catch"](function (err) {
      /**
       * @returns {void}
       */
      function fail() {
        // Todo: Add a different error object here if `assignCurrentNumber`
        //  fails in reverting?
        error(err);
      }
      if (typeof oldCn === 'number') {
        assignCurrentNumber(tx, me, oldCn, fail, fail);
        return null;
      }
      fail();
      return null;
    });
  };

  /**
   *
   * @param {import('./Key.js').Value} value
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBObjectStore.prototype.add = function (value /* , key */) {
    var me = this;
    // eslint-disable-next-line prefer-rest-params
    var key = arguments[1];
    if (!(me instanceof IDBObjectStore)) {
      throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
      throw new TypeError('No value was specified');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    IDBTransaction.__assertActive(me.transaction);
    /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    me.transaction.__assertWritable();
    var request = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.transaction.__createRequest(me);
    var _me$__validateKeyAndV = me.__validateKeyAndValueAndCloneValue(value, key, false),
      _me$__validateKeyAndV2 = _slicedToArray$1(_me$__validateKeyAndV, 2),
      ky = _me$__validateKeyAndV2[0],
      clonedValue = _me$__validateKeyAndV2[1];
    IDBObjectStore.__storingRecordObjectStore(request, me, true, clonedValue, true, ky);
    return request;
  };

  /**
   *
   * @param {import('./Key.js').Value} value
   * @throws {TypeError}
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBObjectStore.prototype.put = function (value /*, key */) {
    var me = this;
    // eslint-disable-next-line prefer-rest-params
    var key = arguments[1];
    if (!(me instanceof IDBObjectStore)) {
      throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
      throw new TypeError('No value was specified');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    IDBTransaction.__assertActive(me.transaction);
    /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    me.transaction.__assertWritable();
    var request = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.transaction.__createRequest(me);
    var _me$__validateKeyAndV3 = me.__validateKeyAndValueAndCloneValue(value, key, false),
      _me$__validateKeyAndV4 = _slicedToArray$1(_me$__validateKeyAndV3, 2),
      ky = _me$__validateKeyAndV4[0],
      clonedValue = _me$__validateKeyAndV4[1];
    IDBObjectStore.__storingRecordObjectStore(request, me, true, clonedValue, false, ky);
    return request;
  };

  /**
   *
   * @param {SQLTransaction} tx
   * @param {import('./Key.js').Key} key
   * @param {(tx: SQLTransaction) => void} cb
   * @param {(err: SQLError) => void} error
   * @this {IDBObjectStoreFull}
   * @returns {void}
   */
  IDBObjectStore.prototype.__overwrite = function (tx, key, cb, error) {
    var me = this;
    // First try to delete if the record exists
    // Key.convertValueToKey(key); // Already run
    var sql = 'DELETE FROM ' + escapeStoreNameForSQL(me.__currentName) + ' WHERE "key" = ?';
    var encodedKey = /** @type {string} */_encode(key);
    tx.executeSql(sql, [escapeSQLiteStatement(encodedKey)], function (tx, data) {
      CFG.DEBUG && console.log('Did the row with the', key, 'exist?', data.rowsAffected);
      cb(tx);
    }, function (tx, err) {
      error(err);
      return true;
    });
  };

  /**
   *
   * @param {import('./IDBRequest.js').IDBRequestFull} request
   * @param {IDBObjectStoreFull} store
   * @param {boolean} invalidateCache
   * @param {import('./Key.js').Value} value
   * @param {boolean} noOverwrite
   * @returns {void}
   */
  IDBObjectStore.__storingRecordObjectStore = function (request, store, invalidateCache, value, noOverwrite /* , key */) {
    // eslint-disable-next-line prefer-rest-params
    var key = arguments[5];
    /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    store.transaction.__pushToQueue(request, function (tx, args, success, error) {
      store.__deriveKey(tx, value, key, function (clonedKeyOrCurrentNumber, oldCn) {
        encode(value, function (encoded) {
          /**
           * @param {SQLTransaction} tx
           * @returns {void}
           */
          function insert(tx) {
            store.__insertData(tx, encoded, value, clonedKeyOrCurrentNumber, oldCn, function () {
              if (invalidateCache) {
                store.__cursors.forEach(function (cursor) {
                  cursor.__invalidateCache();
                });
              }
              success.apply(void 0, arguments);
            }, error);
          }
          if (!noOverwrite) {
            store.__overwrite(tx, clonedKeyOrCurrentNumber, insert, error);
            return;
          }
          insert(tx);
        });
      }, error);
    });
  };

  /**
   *
   * @param {import('./Key.js').Value} query
   * @param {boolean} [getKey]
   * @param {boolean} [getAll]
   * @param {Integer} [count]
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBObjectStore.prototype.__get = function (query, getKey, getAll, count) {
    var me = this;
    if (count !== undefined) {
      count = enforceRange(count, 'unsigned long');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    IDBTransaction.__assertActive(me.transaction);
    var range = convertValueToKeyRange(query, !getAll);
    var col = getKey ? 'key' : 'value';
    var sql = ['SELECT', sqlQuote(col), 'FROM', escapeStoreNameForSQL(me.__currentName)];
    /** @type {string[]} */
    var sqlValues = [];
    if (range !== undefined) {
      sql.push('WHERE');
      setSQLForKeyRange(range, sqlQuote('key'), sql, sqlValues);
    }
    if (!getAll) {
      count = 1;
    }
    if (count) {
      if (!Number.isFinite(count)) {
        throw new TypeError('The count parameter must be a finite number');
      }
      sql.push('LIMIT', String(count));
    }
    var sqlStr = sql.join(' ');
    return (/** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.transaction.__addToTransactionQueue(function objectStoreGet(tx, args, success, error) {
        CFG.DEBUG && console.log('Fetching', me.__currentName, sqlValues);
        tx.executeSql(sqlStr, sqlValues, function (tx, data) {
          CFG.DEBUG && console.log('Fetched data', data);
          var ret;
          try {
            // Opera can't deal with the try-catch here.
            if (data.rows.length === 0) {
              if (getAll) {
                success([]);
              } else {
                success();
              }
              return;
            }
            ret = [];
            if (getKey) {
              for (var i = 0; i < data.rows.length; i++) {
                // Key.convertValueToKey(data.rows.item(i).key); // Already validated before storage
                ret.push(_decode(unescapeSQLiteResponse(data.rows.item(i).key), false));
              }
            } else {
              for (var _i = 0; _i < data.rows.length; _i++) {
                ret.push(decode(unescapeSQLiteResponse(data.rows.item(_i).value)));
              }
            }
            if (!getAll) {
              ret = ret[0];
            }
          } catch (e) {
            // If no result is returned, or error occurs when parsing JSON
            CFG.DEBUG && console.log(e);
          }
          success(ret);
        }, function (tx, err) {
          error(err);
          return true;
        });
      }, undefined, me)
    );
  };

  /**
   *
   * @param {import('./Key.js').Value} query
   * @throws {TypeError}
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBObjectStore.prototype.get = function (query) {
    if (!arguments.length) {
      throw new TypeError('A parameter was missing for `IDBObjectStore.get`.');
    }
    return this.__get(query);
  };

  /**
   *
   * @param {import('./Key.js').Value} query
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBObjectStore.prototype.getKey = function (query) {
    if (!arguments.length) {
      throw new TypeError('A parameter was missing for `IDBObjectStore.getKey`.');
    }
    return this.__get(query, true);
  };

  /**
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBObjectStore.prototype.getAll = function /* query, count */
  () {
    // eslint-disable-next-line prefer-rest-params
    var _arguments = Array.prototype.slice.call(arguments),
      query = _arguments[0],
      count = _arguments[1];
    return this.__get(query, false, true, count);
  };

  /**
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBObjectStore.prototype.getAllKeys = function /* query, count */
  () {
    // eslint-disable-next-line prefer-rest-params
    var _arguments2 = Array.prototype.slice.call(arguments),
      query = _arguments2[0],
      count = _arguments2[1];
    return this.__get(query, true, true, count);
  };

  /**
   *
   * @param {import('./Key.js').Value} query
   * @throws {TypeError}
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBObjectStore.prototype["delete"] = function (query) {
    var me = this;
    if (!(this instanceof IDBObjectStore)) {
      throw new TypeError('Illegal invocation');
    }
    if (!arguments.length) {
      throw new TypeError('A parameter was missing for `IDBObjectStore.delete`.');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    IDBTransaction.__assertActive(me.transaction);
    /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    me.transaction.__assertWritable();
    var range = convertValueToKeyRange(query, true);
    var sqlArr = ['DELETE FROM', escapeStoreNameForSQL(me.__currentName), 'WHERE'];
    /** @type {string[]} */
    var sqlValues = [];
    setSQLForKeyRange(range, sqlQuote('key'), sqlArr, sqlValues);
    var sql = sqlArr.join(' ');
    return (/** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.transaction.__addToTransactionQueue(function objectStoreDelete(tx, args, success, error) {
        CFG.DEBUG && console.log('Deleting', me.__currentName, sqlValues);
        tx.executeSql(sql, sqlValues, function (tx, data) {
          CFG.DEBUG && console.log('Deleted from database', data.rowsAffected);
          me.__cursors.forEach(function (cursor) {
            cursor.__invalidateCache(); // Delete
          });

          success();
        }, function (tx, err) {
          error(err);
          return true;
        });
      }, undefined, me)
    );
  };

  /**
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBObjectStore.prototype.clear = function () {
    var me = this;
    if (!(this instanceof IDBObjectStore)) {
      throw new TypeError('Illegal invocation');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    IDBTransaction.__assertActive(me.transaction);
    /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    me.transaction.__assertWritable();
    return (/** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.transaction.__addToTransactionQueue(function objectStoreClear(tx, args, success, error) {
        tx.executeSql('DELETE FROM ' + escapeStoreNameForSQL(me.__currentName), [], function (tx, data) {
          CFG.DEBUG && console.log('Cleared all records from database', data.rowsAffected);
          me.__cursors.forEach(function (cursor) {
            cursor.__invalidateCache(); // Clear
          });

          success();
        }, function (tx, err) {
          error(err);
          return true;
        });
      }, undefined, me)
    );
  };

  /**
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBObjectStore.prototype.count = function /* query */
  () {
    var me = this;
    // eslint-disable-next-line prefer-rest-params
    var query = arguments[0];
    if (!(me instanceof IDBObjectStore)) {
      throw new TypeError('Illegal invocation');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    IDBTransaction.__assertActive(me.transaction);

    // We don't need to add to cursors array since has the count parameter which won't cache
    return IDBCursorWithValue.__createInstance(query, 'next', me, me, 'key', 'value', true).__request;
  };

  /**
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBObjectStore.prototype.openCursor = function /* query, direction */
  () {
    var me = this;
    // eslint-disable-next-line prefer-rest-params
    var _arguments3 = Array.prototype.slice.call(arguments),
      query = _arguments3[0],
      direction = _arguments3[1];
    if (!(me instanceof IDBObjectStore)) {
      throw new TypeError('Illegal invocation');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    var cursor = IDBCursorWithValue.__createInstance(query, direction, me, me, 'key', 'value');
    me.__cursors.push(cursor);
    return cursor.__request;
  };

  /**
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBRequest.js').IDBRequestFull}
   */
  IDBObjectStore.prototype.openKeyCursor = function /* query, direction */
  () {
    var me = this;
    if (!(me instanceof IDBObjectStore)) {
      throw new TypeError('Illegal invocation');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    // eslint-disable-next-line prefer-rest-params
    var _arguments4 = Array.prototype.slice.call(arguments),
      query = _arguments4[0],
      direction = _arguments4[1];
    var cursor = IDBCursor.__createInstance(query, direction, me, me, 'key', 'key');
    me.__cursors.push(cursor);
    return cursor.__request;
  };

  /**
   *
   * @param {string} indexName
   * @this {IDBObjectStoreFull}
   * @returns {import('./IDBIndex.js').IDBIndexFull}
   */
  IDBObjectStore.prototype.index = function (indexName) {
    var me = this;
    if (!(me instanceof IDBObjectStore)) {
      throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
      throw new TypeError('No index name was specified');
    }
    IDBObjectStore.__invalidStateIfDeleted(me);
    IDBTransaction.__assertNotFinished(me.transaction);
    var index = me.__indexes[indexName];
    if (!index || index.__deleted) {
      throw createDOMException('NotFoundError', 'Index "' + indexName + '" does not exist on ' + me.__currentName);
    }
    if (!me.__indexHandles[indexName] || me.__indexes[indexName].__pendingDelete || me.__indexes[indexName].__deleted) {
      me.__indexHandles[indexName] = IDBIndex.__clone(index, me);
    }
    return me.__indexHandles[indexName];
  };

  /**
   * Creates a new index on the object store.
   * @param {string} indexName
   * @param {string|string[]} keyPath
   * @this {IDBObjectStoreFull}
   * @returns {IDBIndex}
   */
  IDBObjectStore.prototype.createIndex = function (indexName, keyPath /* , optionalParameters */) {
    var me = this;
    // eslint-disable-next-line prefer-rest-params
    var optionalParameters = arguments[2];
    if (!(me instanceof IDBObjectStore)) {
      throw new TypeError('Illegal invocation');
    }
    indexName = String(indexName); // W3C test within IDBObjectStore.js seems to accept string conversion
    if (arguments.length === 0) {
      throw new TypeError('No index name was specified');
    }
    if (arguments.length === 1) {
      throw new TypeError('No key path was specified');
    }
    IDBTransaction.__assertVersionChange(me.transaction);
    IDBObjectStore.__invalidStateIfDeleted(me);
    IDBTransaction.__assertActive(me.transaction);
    if (me.__indexes[indexName] && !me.__indexes[indexName].__deleted && !me.__indexes[indexName].__pendingDelete) {
      throw createDOMException('ConstraintError', 'Index "' + indexName + '" already exists on ' + me.__currentName);
    }
    keyPath = convertToSequenceDOMString(keyPath);
    if (!isValidKeyPath(keyPath)) {
      throw createDOMException('SyntaxError', 'A valid keyPath must be supplied');
    }
    if (Array.isArray(keyPath) && optionalParameters && optionalParameters.multiEntry) {
      throw createDOMException('InvalidAccessError', 'The keyPath argument was an array and the multiEntry option is true.');
    }
    optionalParameters = optionalParameters || {};
    /** @type {import('./IDBIndex.js').IDBIndexProperties} */
    var indexProperties = {
      columnName: indexName,
      keyPath: keyPath,
      optionalParams: {
        unique: Boolean(optionalParameters.unique),
        multiEntry: Boolean(optionalParameters.multiEntry)
      }
    };
    var index = IDBIndex.__createInstance(me, indexProperties);
    IDBIndex.__createIndex(me, index);
    return index;
  };

  /**
   *
   * @param {string} name
   * @this {IDBObjectStoreFull}
   * @returns {void}
   */
  IDBObjectStore.prototype.deleteIndex = function (name) {
    var me = this;
    if (!(me instanceof IDBObjectStore)) {
      throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
      throw new TypeError('No index name was specified');
    }
    IDBTransaction.__assertVersionChange(me.transaction);
    IDBObjectStore.__invalidStateIfDeleted(me);
    IDBTransaction.__assertActive(me.transaction);
    var index = me.__indexes[name];
    if (!index) {
      throw createDOMException('NotFoundError', 'Index "' + name + '" does not exist on ' + me.__currentName);
    }
    IDBIndex.__deleteIndex(me, index);
  };
  defineReadonlyOuterInterface(IDBObjectStore.prototype, readonlyProperties$1);
  defineOuterInterface(IDBObjectStore.prototype, ['name']);
  IDBObjectStore.prototype[Symbol.toStringTag] = 'IDBObjectStorePrototype';
  Object.defineProperty(IDBObjectStore, 'prototype', {
    writable: false
  });

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

  // resolves . and .. elements in a path array with directory names there
  // must be no slashes, empty elements, or device names (c:\) in the array
  // (so also no leading and trailing slashes - it does not distinguish
  // relative and absolute paths)
  function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === '.') {
        parts.splice(i, 1);
      } else if (last === '..') {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (; up--; up) {
        parts.unshift('..');
      }
    }
    return parts;
  }

  // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  var splitPath = function splitPath(filename) {
    return splitPathRe.exec(filename).slice(1);
  };

  // path.resolve([from ...], to)
  // posix version
  function resolve() {
    var resolvedPath = '',
      resolvedAbsolute = false;
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? arguments[i] : '/';

      // Skip empty and invalid entries
      if (typeof path !== 'string') {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }
      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
      return !!p;
    }), !resolvedAbsolute).join('/');
    return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
  }

  // path.normalize(path)
  // posix version
  function normalize(path) {
    var isPathAbsolute = isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

    // Normalize the path
    path = normalizeArray(filter(path.split('/'), function (p) {
      return !!p;
    }), !isPathAbsolute).join('/');
    if (!path && !isPathAbsolute) {
      path = '.';
    }
    if (path && trailingSlash) {
      path += '/';
    }
    return (isPathAbsolute ? '/' : '') + path;
  }

  // posix version
  function isAbsolute(path) {
    return path.charAt(0) === '/';
  }

  // posix version
  function join() {
    var paths = Array.prototype.slice.call(arguments, 0);
    return normalize(filter(paths, function (p, index) {
      if (typeof p !== 'string') {
        throw new TypeError('Arguments to path.join must be strings');
      }
      return p;
    }).join('/'));
  }

  // path.relative(from, to)
  // posix version
  function relative(from, to) {
    from = resolve(from).substr(1);
    to = resolve(to).substr(1);
    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== '') break;
      }
      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== '') break;
      }
      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }
    var fromParts = trim(from.split('/'));
    var toParts = trim(to.split('/'));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }
    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..');
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join('/');
  }
  var sep = '/';
  var delimiter = ':';
  function dirname(path) {
    var result = splitPath(path),
      root = result[0],
      dir = result[1];
    if (!root && !dir) {
      // No dirname whatsoever
      return '.';
    }
    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }
    return root + dir;
  }
  function basename(path, ext) {
    var f = splitPath(path)[2];
    // TODO: make this comparison case-insensitive on windows?
    if (ext && f.substr(-1 * ext.length) === ext) {
      f = f.substr(0, f.length - ext.length);
    }
    return f;
  }
  function extname(path) {
    return splitPath(path)[3];
  }
  var path = {
    extname: extname,
    basename: basename,
    dirname: dirname,
    sep: sep,
    delimiter: delimiter,
    relative: relative,
    join: join,
    isAbsolute: isAbsolute,
    normalize: normalize,
    resolve: resolve
  };
  function filter(xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
  }

  // String.prototype.substr - negative index don't work in IE8
  var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
    return str.substr(start, len);
  } : function (str, start, len) {
    if (start < 0) start = str.length + start;
    return str.substr(start, len);
  };

  var listeners = ['onabort', 'onclose', 'onerror', 'onversionchange'];
  var readonlyProperties = ['name', 'version', 'objectStoreNames'];

  /**
   * @typedef {{
   *   name: string,
   *   keyPath: import('./Key.js').KeyPath,
   *   autoInc: boolean,
   *   indexList: {[key: string]: import('./IDBIndex.js').IDBIndexProperties},
   *   idbdb: IDBDatabaseFull,
   *   cursors?: (import('./IDBCursor.js').IDBCursorFull|
   *     import('./IDBCursor.js').IDBCursorWithValueFull)[],
   * }} IDBObjectStoreProperties
   */

  /**
   * IDB Database Object.
   * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#database-interface
   * @class
   */
  function IDBDatabase() {
    this.__versionTransaction = null;
    this.__objectStores = null;
    throw new TypeError('Illegal constructor');
  }
  var IDBDatabaseAlias = IDBDatabase;

  /**
   * @typedef {number} Integer
   */

  /**
   * @typedef {IDBDatabase & EventTarget & {
   *   createObjectStore: (storeName: string) => IDBObjectStore,
   *   deleteObjectStore: (storeName: string) => void,
   *   close: () => void,
   *   transaction: (storeNames: string|string[], mode: string) => IDBTransaction,
   *   throwIfUpgradeTransactionNull: () => void,
   *   objectStoreNames: import('./DOMStringList.js').DOMStringListFull,
   *   name: string,
   *   __forceClose: (msg: string) => void,
   *   __db: import('websql-configurable/lib/websql/WebSQLDatabase.js').default,
   *   __oldVersion: Integer,
   *   __version: Integer,
   *   __name: string,
   *   __upgradeTransaction: null|import('./IDBTransaction.js').IDBTransactionFull,
   *   __versionTransaction: import('./IDBTransaction.js').IDBTransactionFull,
   *   __transactions: import('./IDBTransaction.js').IDBTransactionFull[],
   *   __objectStores: {[key: string]: IDBObjectStore},
   *   __objectStoreNames: import('./DOMStringList.js').DOMStringListFull,
   *   __oldObjectStoreNames: import('./DOMStringList.js').DOMStringListFull,
   *   __unblocking: {
   *     check: () => void
   *   }
   * }} IDBDatabaseFull
   */

  /**
   * @param {import('websql-configurable').default} db
   * @param {string} name
   * @param {Integer} oldVersion
   * @param {Integer} version
   * @param {SQLResultSet} storeProperties
   * @returns {IDBDatabaseFull}
   */
  IDBDatabase.__createInstance = function (db, name, oldVersion, version, storeProperties) {
    /**
     * @class
     * @this {IDBDatabaseFull}
     */
    function IDBDatabase() {
      var _this = this;
      // @ts-expect-error It's ok
      this[Symbol.toStringTag] = 'IDBDatabase';
      defineReadonlyProperties(this, readonlyProperties);
      this.__db = db;
      this.__closePending = false;
      this.__oldVersion = oldVersion;
      this.__version = version;
      this.__name = name;
      this.__upgradeTransaction = null;
      defineListenerProperties(this, listeners);
      // @ts-expect-error Part of `ShimEventTarget`
      this.__setOptions({
        legacyOutputDidListenersThrowFlag: true // Event hook for IndexedB
      });

      this.__transactions = [];

      /** @type {{[key: string]: IDBObjectStore}} */
      this.__objectStores = {};
      this.__objectStoreNames = DOMStringList.__createInstance();

      /**
       * @type {IDBObjectStoreProperties}
       */
      var itemCopy = {};
      var _loop = function _loop() {
        var item = storeProperties.rows.item(i);
        // Safari implements `item` getter return object's properties
        //  as readonly, so we copy all its properties (except our
        //  custom `currNum` which we don't need) onto a new object
        itemCopy.name = item.name;
        itemCopy.keyPath = JSON.parse(item.keyPath);
        // Though `autoInc` is coming from the database as a NUMERIC
        // type (how SQLite stores BOOLEAN set in CREATE TABLE),
        // and should thus be parsed into a number here (0 or 1),
        // `IDBObjectStore.__createInstance` will convert to a boolean
        // when setting the store's `autoIncrement`.
        /** @type {const} */
        ['autoInc', 'indexList'].forEach(function (prop) {
          itemCopy[prop] = JSON.parse(item[prop]);
        });
        itemCopy.idbdb = _this;
        var store = IDBObjectStore.__createInstance(itemCopy);
        _this.__objectStores[store.name] = store;
        _this.objectStoreNames.push(store.name);
      };
      for (var i = 0; i < storeProperties.rows.length; i++) {
        _loop();
      }
      this.__oldObjectStoreNames = this.objectStoreNames.clone();
    }
    IDBDatabase.prototype = IDBDatabaseAlias.prototype;

    // @ts-expect-error It's ok
    return new IDBDatabase();
  };

  // @ts-expect-error It's ok
  IDBDatabase.prototype = EventTargetFactory.createInstance();
  IDBDatabase.prototype[Symbol.toStringTag] = 'IDBDatabasePrototype';

  /**
   * Creates a new object store.
   * @param {string} storeName
   * @this {IDBDatabaseFull}
   * @returns {IDBObjectStore}
   */
  IDBDatabase.prototype.createObjectStore = function (storeName /* , createOptions */) {
    // eslint-disable-next-line prefer-rest-params
    var createOptions = arguments[1];
    storeName = String(storeName); // W3C test within IDBObjectStore.js seems to accept string conversion
    if (!(this instanceof IDBDatabase)) {
      throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
      throw new TypeError('No object store name was specified');
    }
    IDBTransaction.__assertVersionChange(this.__versionTransaction); // this.__versionTransaction may not exist if called mistakenly by user in onsuccess
    this.throwIfUpgradeTransactionNull();
    IDBTransaction.__assertActive(this.__versionTransaction);
    createOptions = _objectSpread2$1({}, createOptions);
    var _createOptions = createOptions,
      keyPath = _createOptions.keyPath;
    keyPath = keyPath === undefined ? null : convertToSequenceDOMString(keyPath);
    if (keyPath !== null && !isValidKeyPath(keyPath)) {
      throw createDOMException('SyntaxError', 'The keyPath argument contains an invalid key path.');
    }
    if (this.__objectStores[storeName] && !this.__objectStores[storeName].__pendingDelete) {
      throw createDOMException('ConstraintError', 'Object store "' + storeName + '" already exists in ' + this.name);
    }
    var autoInc = createOptions.autoIncrement;
    if (autoInc && (keyPath === '' || Array.isArray(keyPath))) {
      throw createDOMException('InvalidAccessError', 'With autoIncrement set, the keyPath argument must not be an array or empty string.');
    }

    /** @type {IDBObjectStoreProperties} */
    var storeProperties = {
      name: storeName,
      keyPath: keyPath,
      autoInc: autoInc,
      indexList: {},
      idbdb: this
    };
    var store = IDBObjectStore.__createInstance(storeProperties, this.__versionTransaction);
    return IDBObjectStore.__createObjectStore(this, store);
  };

  /**
   * Deletes an object store.
   * @param {string} storeName
   * @throws {TypeError|DOMException}
   * @this {IDBDatabaseFull}
   * @returns {void}
   */
  IDBDatabase.prototype.deleteObjectStore = function (storeName) {
    if (!(this instanceof IDBDatabase)) {
      throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
      throw new TypeError('No object store name was specified');
    }
    IDBTransaction.__assertVersionChange(this.__versionTransaction);
    this.throwIfUpgradeTransactionNull();
    IDBTransaction.__assertActive(this.__versionTransaction);
    var store = this.__objectStores[storeName];
    if (!store) {
      throw createDOMException('NotFoundError', 'Object store "' + storeName + '" does not exist in ' + this.name);
    }
    IDBObjectStore.__deleteObjectStore(this, store);
  };

  /**
   * @throws {TypeError}
   * @this {IDBDatabaseFull}
   * @returns {void}
   */
  IDBDatabase.prototype.close = function () {
    if (!(this instanceof IDBDatabase)) {
      throw new TypeError('Illegal invocation');
    }
    this.__closePending = true;
    if (this.__unblocking) {
      this.__unblocking.check();
    }
  };

  /**
   * Starts a new transaction.
   * @param {string|string[]} storeNames
   * @this {IDBDatabaseFull}
   * @returns {import('./IDBTransaction.js').IDBTransactionFull}
   */
  IDBDatabase.prototype.transaction = function (storeNames /* , mode */) {
    var _this2 = this;
    if (arguments.length === 0) {
      throw new TypeError('You must supply a valid `storeNames` to `IDBDatabase.transaction`');
    }
    // eslint-disable-next-line prefer-rest-params
    var mode = arguments[1];
    storeNames = isIterable(storeNames)
    // Creating new array also ensures sequence is passed by value: https://heycam.github.io/webidl/#idl-sequence
    ? _toConsumableArray(new Set(
    // to be unique
    convertToSequenceDOMString(storeNames) // iterables have `ToString` applied (and we convert to array for convenience)
    )).sort() // must be sorted
    : [convertToDOMString(storeNames)];

    /* (function () {
        throw new TypeError('You must supply a valid `storeNames` to `IDBDatabase.transaction`');
    }())); */

    // Since SQLite (at least node-websql and definitely WebSQL) requires
    //   locking of the whole database, to allow simultaneous readwrite
    //   operations on transactions without overlapping stores, we'd probably
    //   need to save the stores in separate databases (we could also consider
    //   prioritizing readonly but not starving readwrite).
    // Even for readonly transactions, due to [issue 17](https://github.com/nolanlawson/node-websql/issues/17),
    //   we're not currently actually running the SQL requests in parallel.
    mode = mode || 'readonly';
    IDBTransaction.__assertNotVersionChange(this.__versionTransaction);
    if (this.__closePending) {
      throw createDOMException('InvalidStateError', 'An attempt was made to start a new transaction on a database connection that is not open');
    }
    var objectStoreNames = DOMStringList.__createInstance();
    storeNames.forEach(function (storeName) {
      if (!_this2.objectStoreNames.contains(storeName)) {
        throw createDOMException('NotFoundError', 'The "' + storeName + '" object store does not exist');
      }
      objectStoreNames.push(storeName);
    });
    if (storeNames.length === 0) {
      throw createDOMException('InvalidAccessError', 'No valid object store names were specified');
    }
    if (mode !== 'readonly' && mode !== 'readwrite') {
      throw new TypeError('Invalid transaction mode: ' + mode);
    }

    // Do not set transaction state to "inactive" yet (will be set after
    //   timeout on creating transaction instance):
    //   https://github.com/w3c/IndexedDB/issues/87
    var trans = IDBTransaction.__createInstance(this, objectStoreNames, mode);
    this.__transactions.push(trans);
    return trans;
  };

  /**
   * @see https://github.com/w3c/IndexedDB/issues/192
   * @throws {DOMException}
   * @this {IDBDatabaseFull}
   * @returns {void}
   */
  IDBDatabase.prototype.throwIfUpgradeTransactionNull = function () {
    if (this.__upgradeTransaction === null) {
      throw createDOMException('InvalidStateError', 'No upgrade transaction associated with database.');
    }
  };

  // Todo __forceClose: Add tests for `__forceClose`
  /**
   *
   * @param {string} msg
   * @this {IDBDatabaseFull}
   * @returns {void}
   */
  IDBDatabase.prototype.__forceClose = function (msg) {
    var me = this;
    me.close();
    var ct = 0;
    me.__transactions.forEach(function (trans) {
      trans.on__abort = function () {
        ct++;
        if (ct === me.__transactions.length) {
          // Todo __forceClose: unblock any pending `upgradeneeded` or `deleteDatabase` calls
          var evt = createEvent('close');
          setTimeout(function () {
            me.dispatchEvent(evt);
          });
        }
      };
      trans.__abortTransaction(createDOMException('AbortError', 'The connection was force-closed: ' + (msg || '')));
    });
  };
  defineOuterInterface(IDBDatabase.prototype, listeners);
  defineReadonlyOuterInterface(IDBDatabase.prototype, readonlyProperties);
  Object.defineProperty(IDBDatabase.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: IDBDatabase
  });
  Object.defineProperty(IDBDatabase, 'prototype', {
    writable: false
  });

  /**
   * @typedef {number} Integer
   */

  /**
   * @callback DatabaseDeleted
   * @returns {void}
   */

  /** @type {import('./CFG.js').FSApi} */
  var fs;

  /**
   * @param {import('./CFG.js').FSApi} _fs
   * @returns {void}
   */
  var setFS = function setFS(_fs) {
    fs = _fs;
  };

  /**
   * @returns {string}
   */
  var getOrigin = function getOrigin() {
    return (typeof location === "undefined" ? "undefined" : _typeof$2(location)) !== 'object' || !location ? 'null' : location.origin;
  };
  var hasNullOrigin = function hasNullOrigin() {
    return CFG.checkOrigin !== false && getOrigin() === 'null';
  };

  // Todo: This really should be process and tab-independent so the
  //  origin could vary; in the browser, this might be through a
  //  `SharedWorker`

  /**
   * @type {{
   *   [key: string]: {
   *     [key: string]: {
   *       req: import('./IDBRequest.js').IDBOpenDBRequestFull,
   *       cb: (req: import('./IDBRequest.js').IDBRequestFull) => void,
   *     }[]
   *   }
   * }}
   */
  var connectionQueue = {};

  /**
   * @param {string} name
   * @param {string} origin
   * @returns {void}
   */
  function processNextInConnectionQueue(name) {
    var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getOrigin();
    var queueItems = connectionQueue[origin][name];
    if (!queueItems[0]) {
      // Nothing left to process
      return;
    }
    var _queueItems$ = queueItems[0],
      req = _queueItems$.req,
      cb = _queueItems$.cb; // Keep in queue to prevent continuation

    /**
     * @returns {void}
     */
    function removeFromQueue() {
      queueItems.shift();
      processNextInConnectionQueue(name, origin);
    }
    req.addEventListener('success', removeFromQueue);
    req.addEventListener('error', removeFromQueue);
    cb(req);
  }

  /* eslint-disable default-param-last */
  /**
   * @param {import('./IDBRequest.js').IDBOpenDBRequestFull} req
   * @param {string} name
   * @param {string} origin
   * @param {(req: import('./IDBRequest.js').IDBOpenDBRequestFull) => void} cb
   * @returns {void}
   */
  function addRequestToConnectionQueue(req, name) {
    var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getOrigin();
    var cb = arguments.length > 3 ? arguments[3] : undefined;
    /* eslint-enable default-param-last */
    if (!connectionQueue[origin][name]) {
      connectionQueue[origin][name] = [];
    }
    connectionQueue[origin][name].push({
      req: req,
      cb: cb
    });
    if (connectionQueue[origin][name].length === 1) {
      // If there are no items in the queue, we have to start it
      processNextInConnectionQueue(name, origin);
    }
  }

  /**
   * @param {import('./IDBDatabase.js').IDBDatabaseFull[]} openConnections
   * @param {import('./IDBRequest.js').IDBRequestFull} req
   * @param {Integer} oldVersion
   * @param {Integer|null} newVersion
   * @returns {SyncPromise}
   */
  function triggerAnyVersionChangeAndBlockedEvents(openConnections, req, oldVersion, newVersion) {
    // Todo: For Node (and in browser using service workers if available?) the
    //    connections ought to involve those in any process; should also
    //    auto-close if unloading

    /**
     * @param {IDBDatabase} connection
     * @returns {boolean|undefined}
     */
    var connectionIsClosed = function connectionIsClosed(connection) {
      return connection.__closePending;
    };
    var connectionsClosed = function connectionsClosed() {
      return openConnections.every(function (conn) {
        return connectionIsClosed(conn);
      });
    };
    return openConnections.reduce(function (promises, entry) {
      if (connectionIsClosed(entry)) {
        return promises;
      }
      return promises.then(function () {
        if (connectionIsClosed(entry)) {
          // Prior onversionchange must have caused this connection to be closed
          return undefined;
        }
        var e = /** @type {Event & IDBVersionChangeEvent} */
        new IDBVersionChangeEvent('versionchange', {
          oldVersion: oldVersion,
          newVersion: newVersion
        });
        return new SyncPromise(function (resolve) {
          setTimeout(function () {
            entry.dispatchEvent(e); // No need to catch errors
            resolve(undefined);
          });
        });
      });
    }, SyncPromise.resolve(undefined)).then(function () {
      if (connectionsClosed()) {
        return undefined;
      }
      return new SyncPromise(function (resolve) {
        var unblocking = {
          check: function check() {
            if (connectionsClosed()) {
              resolve(undefined);
            }
          }
        };
        var e = /** @type {Event & IDBVersionChangeEvent} */
        new IDBVersionChangeEvent('blocked', {
          oldVersion: oldVersion,
          newVersion: newVersion
        });
        setTimeout(function () {
          req.dispatchEvent(e); // No need to catch errors
          if (!connectionsClosed()) {
            openConnections.forEach(function (connection) {
              if (!connectionIsClosed(connection)) {
                connection.__unblocking = unblocking;
              }
            });
          } else {
            resolve(undefined);
          }
        });
      });
    });
  }

  /**
   * @typedef {import('websql-configurable/lib/websql/WebSQLDatabase.js').default & {
   *   _db: {
   *     _db: {
   *       close: (errBack: (err: Error) => void) => void
   *     }
   *   }
   * }} DatabaseFull
   */

  /**
   * @type {{
   *   [key: string]: {
   *     [key: string]: DatabaseFull
   *   }
   * }}
   */
  var websqlDBCache = {};

  /** @type {import('websql-configurable/lib/websql/WebSQLDatabase.js').default} */
  var sysdb;
  var nameCounter = 0;

  /**
   * @param {string} name
   * @returns {Integer}
   */
  function getLatestCachedWebSQLVersion(name) {
    return Object.keys(websqlDBCache[name]).map(Number).reduce(function (prev, curr) {
      return curr > prev ? curr : prev;
    }, 0);
  }

  /**
   * @param {string} name
   * @returns {DatabaseFull}
   */
  function getLatestCachedWebSQLDB(name) {
    return websqlDBCache[name] && websqlDBCache[name][getLatestCachedWebSQLVersion(name)];
  }

  /**
   * @param {OpenDatabase} __openDatabase
   * @param {string} name
   * @param {string} escapedDatabaseName
   * @param {DatabaseDeleted} databaseDeleted
   * @param {(tx: SQLTransaction|Error|SQLError, err?: SQLError) => boolean} dbError
   * @returns {void}
   */
  function cleanupDatabaseResources(__openDatabase, name, escapedDatabaseName, databaseDeleted, dbError) {
    var useMemoryDatabase = typeof CFG.memoryDatabase === 'string';
    if (useMemoryDatabase) {
      var latestSQLiteDBCached = websqlDBCache[name] ? getLatestCachedWebSQLDB(name) : null;
      if (!latestSQLiteDBCached) {
        console.warn('Could not find a memory database instance to delete.');
        databaseDeleted();
        return;
      }
      var _sqliteDB = latestSQLiteDBCached._db && latestSQLiteDBCached._db._db;
      if (!_sqliteDB || !_sqliteDB.close) {
        console.error('The `openDatabase` implementation does not have the expected `._db._db.close` method for closing the database');
        return;
      }
      _sqliteDB.close(
      /**
       * @param {Error} err
       * @returns {void}
       */
      function (err) {
        if (err) {
          console.warn('Error closing (destroying) memory database');
          return;
        }
        databaseDeleted();
      });
      return;
    }
    if (fs && CFG.deleteDatabaseFiles !== false) {
      fs.unlink(path.join(CFG.databaseBasePath || '', escapedDatabaseName), function (err) {
        if (err && err.code !== 'ENOENT') {
          // Ignore if file is already deleted
          dbError({
            code: 0,
            message: 'Error removing database file: ' + escapedDatabaseName + ' ' + err
          });
          return;
        }
        databaseDeleted();
      });
      return;
    }
    var sqliteDB = __openDatabase(path.join(CFG.databaseBasePath || '', escapedDatabaseName), '1', name, CFG.DEFAULT_DB_SIZE);
    sqliteDB.transaction(function (tx) {
      tx.executeSql('SELECT "name" FROM __sys__', [], function (tx, data) {
        var tables = data.rows;
        (function deleteTables(i) {
          if (i >= tables.length) {
            // If all tables are deleted, delete the housekeeping tables
            tx.executeSql('DROP TABLE IF EXISTS __sys__', [], function () {
              databaseDeleted();
            }, dbError);
          } else {
            // Delete all tables in this database, maintained in the sys table
            tx.executeSql('DROP TABLE ' + escapeStoreNameForSQL(unescapeSQLiteResponse(
            // Avoid double-escaping
            tables.item(i).name)), [], function () {
              deleteTables(i + 1);
            }, function () {
              deleteTables(i + 1);
              return true;
            });
          }
        })(0);
      }, function (e) {
        // __sys__ table does not exist, but that does not mean delete did not happen
        databaseDeleted();
        return true;
      });
    });
  }

  /**
   * @callback CreateSysDBSuccessCallback
   * @returns {void}
   */

  /**
   * Creates the sysDB to keep track of version numbers for databases.
   * @param {OpenDatabase} __openDatabase
   * @param {CreateSysDBSuccessCallback} success
   * @param {(tx: SQLTransaction|SQLError|Error, err?: SQLError) => void} failure
   * @returns {void}
   */
  function createSysDB(__openDatabase, success, failure) {
    /**
     *
     * @param {boolean|SQLTransaction|SQLError} tx
     * @param {SQLError} [err]
     * @returns {void}
     */
    function sysDbCreateError(tx, err) {
      var er = webSQLErrback( /** @type {SQLError} */err || tx);
      CFG.DEBUG && console.log('Error in sysdb transaction - when creating dbVersions', err);
      failure(er);
    }
    if (sysdb) {
      success();
    } else {
      sysdb = __openDatabase(typeof CFG.memoryDatabase === 'string' ? CFG.memoryDatabase : path.join(typeof CFG.sysDatabaseBasePath === 'string' ? CFG.sysDatabaseBasePath : CFG.databaseBasePath || '', '__sysdb__' + (CFG.addSQLiteExtension !== false ? '.sqlite' : '')), '1', 'System Database', CFG.DEFAULT_DB_SIZE);
      sysdb.transaction(function (systx) {
        systx.executeSql('CREATE TABLE IF NOT EXISTS dbVersions (name BLOB, version INT);', [], function (systx) {
          if (!CFG.useSQLiteIndexes) {
            success();
            return;
          }
          systx.executeSql('CREATE INDEX IF NOT EXISTS dbvname ON dbVersions(name)', [], success, /** @type {SQLStatementErrorCallback} */sysDbCreateError);
        }, /** @type {SQLStatementErrorCallback} */sysDbCreateError);
      }, sysDbCreateError);
    }
  }

  /**
   * IDBFactory Class.
   * @see https://w3c.github.io/IndexedDB/#idl-def-IDBFactory
   * @class
   */
  function IDBFactory() {
    throw new TypeError('Illegal constructor');
  }

  /**
   * @typedef {(
   *   name: string, version: string, displayName: string, estimatedSize: number
   * ) => import('websql-configurable/lib/websql/WebSQLDatabase.js').default} OpenDatabase
   */

  /**
   * @typedef {globalThis.IDBFactory & {
   *   __openDatabase: OpenDatabase,
   *   __connections: {
   *     [key: string]: import('./IDBDatabase.js').IDBDatabaseFull[]
   *   }
  * }} IDBFactoryFull
   */

  var IDBFactoryAlias = IDBFactory;
  /**
   * @returns {IDBFactoryFull}
   */
  IDBFactory.__createInstance = function () {
    /**
     * @class
     */
    function IDBFactory() {
      this[Symbol.toStringTag] = 'IDBFactory';
      this.__connections = {};
    }
    IDBFactory.prototype = IDBFactoryAlias.prototype;

    // @ts-expect-error It's ok
    return new IDBFactory();
  };

  /**
   * The IndexedDB Method to create a new database and return the DB.
   * @param {string} name
   * @this {IDBFactoryFull}
   * @throws {TypeError} Illegal invocation or no arguments (for database name)
   * @returns {IDBOpenDBRequest}
   */
  IDBFactory.prototype.open = function (name /* , version */) {
    var me = this;
    if (!(me instanceof IDBFactory)) {
      throw new TypeError('Illegal invocation');
    }
    // eslint-disable-next-line prefer-rest-params
    var version = arguments[1];
    if (arguments.length === 0) {
      throw new TypeError('Database name is required');
    }
    if (version !== undefined) {
      version = enforceRange(version, 'unsigned long long');
      if (version === 0) {
        throw new TypeError('Version cannot be 0');
      }
    }
    if (hasNullOrigin()) {
      throw createDOMException('SecurityError', 'Cannot open an IndexedDB database from an opaque origin.');
    }
    var req = IDBOpenDBRequest.__createInstance();
    var calledDbCreateError = false;
    if (CFG.autoName && name === '') {
      name = 'autoNamedDatabase_' + nameCounter++;
    }
    name = String(name); // cast to a string
    var sqlSafeName = escapeSQLiteStatement(name);
    var useMemoryDatabase = typeof CFG.memoryDatabase === 'string';
    var useDatabaseCache = CFG.cacheDatabaseInstances !== false || useMemoryDatabase;

    /** @type {string} */
    var escapedDatabaseName;
    // eslint-disable-next-line no-useless-catch
    try {
      escapedDatabaseName = escapeDatabaseNameForSQLAndFiles(name);
      // eslint-disable-next-line sonarjs/no-useless-catch
    } catch (err) {
      throw err; // new TypeError('You have supplied a database name which does not match the currently supported configuration, possibly due to a length limit enforced for Node compatibility.');
    }

    /**
     *
     * @param {SQLTransaction|Error|SQLError} tx
     * @param {SQLError} [err]
     * @returns {boolean}
     */
    function dbCreateError(tx, err) {
      if (calledDbCreateError) {
        return true;
      }
      var er = err ? webSQLErrback(err) : /** @type {Error} */tx;
      calledDbCreateError = true;
      // Re: why bubbling here (and how cancelable is only really relevant for `window.onerror`) see: https://github.com/w3c/IndexedDB/issues/86
      var evt = createEvent('error', er, {
        bubbles: true,
        cancelable: true
      });
      req.__done = true;
      req.__error = er;
      req.__result = undefined; // Must be undefined if an error per `result` getter
      req.dispatchEvent(evt);
      return true;
    }

    /**
     *
     * @param {SQLTransaction} tx
     * @param {DatabaseFull} db
     * @param {Integer} oldVersion
     * @returns {void}
     */
    function setupDatabase(tx, db, oldVersion) {
      tx.executeSql('SELECT "name", "keyPath", "autoInc", "indexList" FROM __sys__', [], function (tx, data) {
        /**
         * @returns {void}
         */
        function finishRequest() {
          req.__result = connection;
          req.__done = true;
        }
        var connection = IDBDatabase.__createInstance(db, name, oldVersion, version, data);
        if (!me.__connections[name]) {
          me.__connections[name] = [];
        }
        me.__connections[name].push(connection);
        if (oldVersion < version) {
          var openConnections = me.__connections[name].slice(0, -1);
          triggerAnyVersionChangeAndBlockedEvents(openConnections, req, oldVersion, version).then(function () {
            // DB Upgrade in progress
            /**
             *
             * @param {SQLTransaction} systx
             * @param {boolean|SQLError|DOMException|Error} err
             * @param {(tx?: SQLTransaction|SQLError, err?: SQLError|SQLResultSet) => boolean} cb
             * @returns {void}
             */
            var sysdbFinishedCb = function sysdbFinishedCb(systx, err, cb) {
              if (err) {
                try {
                  systx.executeSql('ROLLBACK', [], cb, cb);
                } catch (er) {
                  // Browser may fail with expired transaction above so
                  //     no choice but to manually revert
                  sysdb.transaction(function (systx) {
                    /**
                     *
                     * @param {string} msg
                     * @throws {Error}
                     * @returns {never}
                     */
                    function reportError(msg) {
                      throw new Error('Unable to roll back upgrade transaction!' + (msg || ''));
                    }

                    // Attempt to revert
                    if (oldVersion === 0) {
                      systx.executeSql('DELETE FROM dbVersions WHERE "name" = ?', [sqlSafeName], function () {
                        // @ts-expect-error Force to work
                        cb(reportError); // eslint-disable-line promise/no-callback-in-promise
                      },
                      // @ts-expect-error Force to work
                      reportError);
                    } else {
                      systx.executeSql('UPDATE dbVersions SET "version" = ? WHERE "name" = ?', [oldVersion, sqlSafeName], cb,
                      // @ts-expect-error Force to work
                      reportError);
                    }
                  });
                }
                return;
              }
              // In browser, should auto-commit
              cb(); // eslint-disable-line promise/no-callback-in-promise
            };

            sysdb.transaction(function (systx) {
              /**
               * @returns {void}
               */
              function versionSet() {
                var e = /** @type {import('eventtargeter').EventWithProps & Event & IDBVersionChangeEvent} */
                new IDBVersionChangeEvent('upgradeneeded', {
                  oldVersion: oldVersion,
                  newVersion: version
                });
                req.__result = connection;
                connection.__upgradeTransaction = req.__transaction = req.__result.__versionTransaction = IDBTransaction.__createInstance(req.__result, req.__result.objectStoreNames, 'versionchange');
                req.__done = true;
                req.transaction.__addNonRequestToTransactionQueue(function onupgradeneeded(tx, args, finished, error) {
                  req.dispatchEvent(e);
                  if (e.__legacyOutputDidListenersThrowError) {
                    logError('Error', 'An error occurred in an upgradeneeded handler attached to request chain', /** @type {Error} */e.__legacyOutputDidListenersThrowError); // We do nothing else with this error as per spec
                    req.transaction.__abortTransaction(createDOMException('AbortError', 'A request was aborted.'));
                    return;
                  }
                  finished();
                });
                req.transaction.on__beforecomplete = function (ev) {
                  connection.__upgradeTransaction = null;
                  /** @type {import('./IDBDatabase.js').IDBDatabaseFull} */
                  req.__result.__versionTransaction = null;
                  sysdbFinishedCb(systx, false, function () {
                    req.transaction.__transFinishedCb(false, function () {
                      ev.complete();
                      req.__transaction = null;
                    });
                    return true;
                  });
                };
                req.transaction.on__preabort = function () {
                  connection.__upgradeTransaction = null;
                  // We ensure any cache is deleted before any request error events fire and try to reopen
                  if (useDatabaseCache) {
                    if (name in websqlDBCache) {
                      delete websqlDBCache[name][version];
                    }
                  }
                };
                req.transaction.on__abort = function () {
                  req.__transaction = null;
                  // `readyState` and `result` will be reset anyways by `dbCreateError` but we follow spec.
                  req.__result = undefined;
                  req.__done = false;
                  connection.close();
                  setTimeout(function () {
                    var err = createDOMException('AbortError', 'The upgrade transaction was aborted.');
                    sysdbFinishedCb(systx, err, function (reportError) {
                      if (oldVersion === 0) {
                        cleanupDatabaseResources(me.__openDatabase, name, escapedDatabaseName, dbCreateError.bind(null, err),
                        // @ts-expect-error It's ok
                        reportError || dbCreateError);
                        return true;
                      }
                      dbCreateError(err);
                      return true;
                    });
                  });
                };
                req.transaction.on__complete = function () {
                  if ( /** @type {import('./IDBDatabase.js').IDBDatabaseFull} */req.__result.__closePending) {
                    req.__transaction = null;
                    var err = createDOMException('AbortError', 'The connection has been closed.');
                    dbCreateError(err);
                    return;
                  }
                  // Since this is running directly after `IDBTransaction.complete`,
                  //   there should be a new task. However, while increasing the
                  //   timeout 1ms in `IDBTransaction.__executeRequests` can allow
                  //   `IDBOpenDBRequest.onsuccess` to trigger faster than a new
                  //   transaction as required by "transaction-create_in_versionchange" in
                  //   w3c/Transaction.js (though still on a timeout separate from this
                  //   preceding `IDBTransaction.oncomplete`), this causes a race condition
                  //   somehow with old transactions (e.g., for the Mocha test,
                  //   in `IDBObjectStore.deleteIndex`, "should delete an index that was
                  //   created in a previous transaction").
                  // setTimeout(() => {

                  finishRequest();
                  req.__transaction = null;
                  var e = createEvent('success');
                  req.dispatchEvent(e);
                  // });
                };
              }

              if (oldVersion === 0) {
                systx.executeSql('INSERT INTO dbVersions VALUES (?,?)', [sqlSafeName, version], versionSet, dbCreateError);
              } else {
                systx.executeSql('UPDATE dbVersions SET "version" = ? WHERE "name" = ?', [version, sqlSafeName], versionSet, dbCreateError);
              }
            }, dbCreateError, undefined, function (currentTask, err, done, rollback, commit) {
              if (currentTask.readOnly || err) {
                return true;
              }
              sysdbFinishedCb = function sysdbFinishedCb(systx, err, cb) {
                if (err) {
                  rollback(err, cb);
                } else {
                  commit(cb);
                }
              };
              return false;
            });
            return undefined;
          })["catch"](function (err) {
            console.log('Error within `triggerAnyVersionChangeAndBlockedEvents`');
            throw err;
          });
        } else {
          finishRequest();
          var e = createEvent('success');
          req.dispatchEvent(e);
        }
      }, dbCreateError);
    }

    /**
     *
     * @param {Integer} oldVersion
     * @returns {void}
     */
    function openDB(oldVersion) {
      /** @type {DatabaseFull} */
      var db;
      if ((useMemoryDatabase || useDatabaseCache) && name in websqlDBCache && websqlDBCache[name][version]) {
        db = websqlDBCache[name][version];
      } else {
        db = me.__openDatabase(useMemoryDatabase ? CFG.memoryDatabase : path.join(CFG.databaseBasePath || '', escapedDatabaseName), '1', name, CFG.DEFAULT_DB_SIZE);
        if (useDatabaseCache) {
          if (!(name in websqlDBCache)) {
            websqlDBCache[name] = {};
          }
          websqlDBCache[name][version] = db;
        }
      }
      if (version === undefined) {
        version = oldVersion || 1;
      }
      if (oldVersion > version) {
        var err = createDOMException('VersionError', 'An attempt was made to open a database using a lower version than the existing version.', version);
        if (useDatabaseCache) {
          setTimeout(function () {
            dbCreateError(err);
          });
        } else {
          dbCreateError(err);
        }
        return;
      }
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS __sys__ (name BLOB, keyPath BLOB, autoInc BOOLEAN, indexList BLOB, currNum INTEGER)', [], function () {
          /**
           * @returns {void}
           */
          function setup() {
            setupDatabase(tx, db, oldVersion);
          }
          if (!CFG.createIndexes) {
            setup();
            return;
          }
          tx.executeSql('CREATE INDEX IF NOT EXISTS sysname ON __sys__(name)', [], setup, dbCreateError);
        }, /** @type {SQLStatementErrorCallback} */dbCreateError);
      }, dbCreateError);
    }
    addRequestToConnectionQueue(req, name, /* origin */undefined, function (req) {
      var latestCachedVersion;
      if (useDatabaseCache) {
        if (!(name in websqlDBCache)) {
          websqlDBCache[name] = {};
        }
        latestCachedVersion = getLatestCachedWebSQLVersion(name);
      }
      if (latestCachedVersion) {
        openDB(latestCachedVersion);
      } else {
        createSysDB(me.__openDatabase, function () {
          sysdb.readTransaction(function (sysReadTx) {
            sysReadTx.executeSql('SELECT "version" FROM dbVersions WHERE "name" = ?', [sqlSafeName], function (sysReadTx, data) {
              if (data.rows.length === 0) {
                // Database with this name does not exist
                openDB(0);
              } else {
                openDB(data.rows.item(0).version);
              }
            }, dbCreateError);
          }, dbCreateError);
        }, dbCreateError);
      }
    });
    return req;
  };

  /**
   * Deletes a database.
   * @param {string} name
   * @this {IDBFactoryFull}
   * @returns {IDBOpenDBRequest}
   */
  IDBFactory.prototype.deleteDatabase = function (name) {
    var me = this;
    if (!(me instanceof IDBFactory)) {
      throw new TypeError('Illegal invocation');
    }
    if (arguments.length === 0) {
      throw new TypeError('Database name is required');
    }
    if (hasNullOrigin()) {
      throw createDOMException('SecurityError', 'Cannot delete an IndexedDB database from an opaque origin.');
    }
    name = String(name); // cast to a string
    var sqlSafeName = escapeSQLiteStatement(name);

    /** @type {string} */
    var escapedDatabaseName;
    // eslint-disable-next-line no-useless-catch
    try {
      escapedDatabaseName = escapeDatabaseNameForSQLAndFiles(name);
      // eslint-disable-next-line sonarjs/no-useless-catch
    } catch (err) {
      throw err; // throw new TypeError('You have supplied a database name which does not match the currently supported configuration, possibly due to a length limit enforced for Node compatibility.');
    }

    var useMemoryDatabase = typeof CFG.memoryDatabase === 'string';
    var useDatabaseCache = CFG.cacheDatabaseInstances !== false || useMemoryDatabase;
    var req = IDBOpenDBRequest.__createInstance();
    var calledDBError = false;
    var version = 0;

    /**
     *
     * @param {boolean} err
     * @param {(erred?: boolean) => void} cb
     * @returns {void}
     */
    var sysdbFinishedCbDelete = function sysdbFinishedCbDelete(err, cb) {
      cb(err);
    };

    // Although the spec has no specific conditions where an error
    //  may occur in `deleteDatabase`, it does provide for
    //  `UnknownError` as we may require upon a SQL deletion error
    /**
     *
     * @param {SQLTransaction|SQLError|Error} tx
     * @param {SQLError|boolean} [err]
     * @returns {boolean}
     */
    function dbError(tx, err) {
      if (calledDBError || err === true) {
        return true;
      }
      var er = webSQLErrback( /** @type {SQLError} */err || tx);
      sysdbFinishedCbDelete(true, function () {
        req.__done = true;
        req.__error = er;
        req.__result = undefined; // Must be undefined if an error per `result` getter
        // Re: why bubbling here (and how cancelable is only really relevant for `window.onerror`) see: https://github.com/w3c/IndexedDB/issues/86
        var e = createEvent('error', er, {
          bubbles: true,
          cancelable: true
        });
        req.dispatchEvent(e);
        calledDBError = true;
      });
      return true;
    }
    addRequestToConnectionQueue(req, name, /* origin */undefined, function (req) {
      createSysDB(me.__openDatabase, function () {
        // function callback (cb) { cb(); }
        // callback(function () {

        /**
         * @returns {void}
         */
        function completeDatabaseDelete() {
          req.__result = undefined;
          req.__done = true;
          var e = /** @type {Event & IDBVersionChangeEvent} */
          new IDBVersionChangeEvent('success', {
            oldVersion: version,
            newVersion: null
          });
          req.dispatchEvent(e);
        }

        /** @type {DatabaseDeleted} */
        function databaseDeleted() {
          sysdbFinishedCbDelete(false, function () {
            if (useDatabaseCache && name in websqlDBCache) {
              delete websqlDBCache[name]; // New calls will treat as though never existed
            }

            delete me.__connections[name];
            completeDatabaseDelete();
          });
        }
        sysdb.readTransaction(function (sysReadTx) {
          sysReadTx.executeSql('SELECT "version" FROM dbVersions WHERE "name" = ?', [sqlSafeName], function (sysReadTx, data) {
            if (data.rows.length === 0) {
              completeDatabaseDelete();
              return undefined;
            }
            var _data$rows$item = data.rows.item(0);
            version = _data$rows$item.version;
            var openConnections = me.__connections[name] || [];
            triggerAnyVersionChangeAndBlockedEvents(openConnections, req, version, null).then(function () {
              // eslint-disable-line promise/catch-or-return
              // Since we need two databases which can't be in a single transaction, we
              //  do this deleting from `dbVersions` first since the `__sys__` deleting
              //  only impacts file memory whereas this one is critical for avoiding it
              //  being found via `open` or `databases`; however, we will
              //  avoid committing anyways until all deletions are made and rollback the
              //  `dbVersions` change if they fail
              sysdb.transaction(function (systx) {
                systx.executeSql('DELETE FROM dbVersions WHERE "name" = ? ', [sqlSafeName], function () {
                  // Todo: We should also check whether `dbVersions` is empty and if so, delete upon
                  //    `deleteDatabaseFiles` config. We also ought to do this when aborting (see
                  //    above code with `DELETE FROM dbVersions`)
                  cleanupDatabaseResources(me.__openDatabase, name, escapedDatabaseName, databaseDeleted, dbError);
                }, dbError);
              }, dbError, undefined, function (currentTask, err, done, rollback, commit) {
                if (currentTask.readOnly || err) {
                  return true;
                }
                sysdbFinishedCbDelete = function sysdbFinishedCbDelete(err, cb) {
                  if (err) {
                    rollback(err, cb);
                  } else {
                    commit(cb);
                  }
                };
                return false;
              });
              return undefined;
              // @ts-expect-error It's ok
            }, dbError);
            return undefined;
          }, dbError);
        });
      }, dbError);
    });
    return req;
  };

  /**
   *
   * @param {import('./Key.js').Key} key1
   * @param {import('./Key.js').Key} key2
   * @throws {TypeError}
   * @returns {0|1|-1}
   */
  IDBFactory.prototype.cmp = function (key1, key2) {
    if (!(this instanceof IDBFactory)) {
      throw new TypeError('Illegal invocation');
    }
    if (arguments.length < 2) {
      throw new TypeError('You must provide two keys to be compared');
    }
    // We use encoding facilities already built for proper sorting;
    //   the following "conversions" are for validation only
    convertValueToKeyRethrowingAndIfInvalid(key1);
    convertValueToKeyRethrowingAndIfInvalid(key2);
    return cmp(key1, key2);
  };

  /**
  * May return outdated information if a database has since been deleted.
  * @see https://github.com/w3c/IndexedDB/pull/240/files
  * @this {IDBFactoryFull}
  * @returns {Promise<{
  *   name: string,
  *   version: Integer
  * }[]>}
  */
  IDBFactory.prototype.databases = function () {
    var me = this;
    var calledDbCreateError = false;
    return new Promise(function (resolve, reject) {
      // eslint-disable-line promise/avoid-new
      if (!(me instanceof IDBFactory)) {
        throw new TypeError('Illegal invocation');
      }
      if (hasNullOrigin()) {
        throw createDOMException('SecurityError', 'Cannot get IndexedDB database names from an opaque origin.');
      }
      /**
       *
       * @param {true|SQLTransaction|SQLError|DOMException|Error} tx
       * @param {SQLError|DOMException|Error} [err]
       * @returns {boolean}
       */
      function dbGetDatabaseNamesError(tx, err) {
        if (calledDbCreateError) {
          return true;
        }
        var er = err ? webSQLErrback( /** @type {SQLError} */err) : tx;
        calledDbCreateError = true;
        reject(er);
        return true;
      }
      createSysDB(me.__openDatabase, function () {
        sysdb.readTransaction(function (sysReadTx) {
          sysReadTx.executeSql('SELECT "name", "version" FROM dbVersions', [], function (sysReadTx, data) {
            var dbNames = [];
            for (var i = 0; i < data.rows.length; i++) {
              var _data$rows$item2 = data.rows.item(i),
                name = _data$rows$item2.name,
                version = _data$rows$item2.version;
              dbNames.push({
                name: unescapeSQLiteResponse(name),
                version: version
              });
            }
            resolve(dbNames);
          }, dbGetDatabaseNamesError);
        }, dbGetDatabaseNamesError);
      }, dbGetDatabaseNamesError);
    });
  };

  /**
  * @todo forceClose: Test
  * This is provided to facilitate unit-testing of the
  *  closing of a database connection with a forced flag:
  * <http://w3c.github.io/IndexedDB/#steps-for-closing-a-database-connection>
  * @param {string} dbName
  * @param {Integer} connIdx
  * @param {string} msg
  * @throws {TypeError}
  * @this {IDBFactoryFull}
  * @returns {void}
  */
  IDBFactory.prototype.__forceClose = function (dbName, connIdx, msg) {
    var me = this;
    /**
     *
     * @param {import('./IDBDatabase.js').IDBDatabaseFull} conn
     * @returns {void}
     */
    function forceClose(conn) {
      conn.__forceClose(msg);
    }
    if (isNullish(dbName)) {
      Object.values(me.__connections).forEach(function (conn) {
        // @ts-expect-error It's ok
        forceClose(conn);
      });
    } else if (!me.__connections[dbName]) {
      console.log('No database connections with that name to force close');
    } else if (isNullish(connIdx)) {
      me.__connections[dbName].forEach(function (conn) {
        forceClose(conn);
      });
    } else if (!Number.isInteger(connIdx) || connIdx < 0 || connIdx > me.__connections[dbName].length - 1) {
      throw new TypeError('If providing an argument, __forceClose must be called with a ' + 'numeric index to indicate a specific connection to lose');
    } else {
      forceClose(me.__connections[dbName][connIdx]);
    }
  };

  /**
   *
   * @param {string} [origin]
   * @returns {void}
   */
  IDBFactory.prototype.__setConnectionQueueOrigin = function () {
    var origin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getOrigin();
    connectionQueue[origin] = {};
  };
  IDBFactory.prototype[Symbol.toStringTag] = 'IDBFactoryPrototype';
  Object.defineProperty(IDBFactory, 'prototype', {
    writable: false
  });
  var shimIndexedDB = IDBFactory.__createInstance();

  /**
   * @typedef {number} Integer
   */

  /**
   * @typedef {IDBCursor & {
   *   primaryKey: import('./Key.js').Key,
   *   key:  import('./Key.js').Key,
   *   direction: string,
   *   source: import('./IDBObjectStore.js').IDBObjectStoreFull|
   *     import('./IDBIndex.js').IDBIndexFull,
   *   __request: import('./IDBRequest.js').IDBRequestFull,
   *   __advanceCount: Integer|undefined,
   *   __indexSource: boolean,
   *   __key: import('./Key.js').Key,
   *   __primaryKey: import('./Key.js').Key,
   *   __value: import('./Key.js').Value,
   *   __store: import('./IDBObjectStore.js').IDBObjectStoreFull,
   *   __range: import('./IDBKeyRange.js').IDBKeyRangeFull|undefined,
   *   __keyColumnName: string,
   *   __valueColumnName: string,
   *   __keyOnly: boolean,
   *   __valueDecoder: {
   *     decode: (str: string) => any,
   *   },
   *   __count: boolean,
   *   __prefetchedIndex: Integer,
   *   __prefetchedData: null|SQLResultSetRowList|{
   *     data: RowItemNonNull[],
   *     length: Integer,
   *     item: (index: Integer) => RowItemNonNull
   *   },
   *   __multiEntryIndex: boolean,
   *   __unique: boolean,
   *   __sqlDirection: "DESC"|"ASC",
   *   __matchedKeys: {[key: string]: true},
   *   __invalidateCache: () => void
   * }} IDBCursorFull
   */

  /**
   * @typedef {IDBCursorFull & {
   *   __request: import('./IDBRequest.js').IDBRequestFull,
   * }} IDBCursorWithValueFull
   */

  /**
   * @class
   */
  function IDBCursor() {
    throw new TypeError('Illegal constructor');
  }
  var IDBCursorAlias = IDBCursor;

  /* eslint-disable func-name-matching */
  /**
   * The IndexedDB Cursor Object.
   * @see http://dvcs.w3.org/hg/IndexedDB/raw-file/tip/Overview.html#idl-def-IDBCursor
   * @param {IDBKeyRange} query
   * @param {string} direction
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull|
   *   import('./IDBIndex.js').IDBIndexFull} source
   * @param {string} keyColumnName
   * @param {string} valueColumnName
   * @param {boolean} count
   * @this {IDBCursorFull}
   * @returns {void}
   */
  IDBCursor.__super = function IDBCursor(query, direction, store, source, keyColumnName, valueColumnName, count) {
    /* eslint-enable func-name-matching */
    // @ts-expect-error Should be ok
    this[Symbol.toStringTag] = 'IDBCursor';
    defineReadonlyProperties(this, ['key', 'primaryKey', 'request']);
    IDBObjectStore.__invalidStateIfDeleted(store);
    this.__indexSource = instanceOf(source, IDBIndex);
    if (this.__indexSource) {
      IDBIndex.__invalidStateIfDeleted( /** @type {import('./IDBIndex.js').IDBIndexFull} */source);
    }
    IDBTransaction.__assertActive(store.transaction);
    var range = convertValueToKeyRange(query);
    if (direction !== undefined && !['next', 'prev', 'nextunique', 'prevunique'].includes(direction)) {
      throw new TypeError(direction + 'is not a valid cursor direction');
    }
    Object.defineProperties(this, {
      // Babel is not respecting default writable false here, so make explicit
      source: {
        writable: false,
        value: source
      },
      direction: {
        writable: false,
        value: direction || 'next'
      }
    });
    this.__key = undefined;
    this.__primaryKey = undefined;
    this.__store = store;
    this.__range = range;
    this.__request = IDBRequest.__createInstance();
    this.__request.__source = source;
    this.__request.__transaction = this.__store.transaction;
    this.__keyColumnName = keyColumnName;
    this.__valueColumnName = valueColumnName;
    this.__keyOnly = valueColumnName === 'key';
    this.__valueDecoder = this.__keyOnly ? Key : Sca;
    this.__count = count;
    this.__prefetchedIndex = -1;
    this.__multiEntryIndex = this.__indexSource ? 'multiEntry' in source && source.multiEntry : false;
    this.__unique = this.direction.includes('unique');
    this.__sqlDirection = ['prev', 'prevunique'].includes(this.direction) ? 'DESC' : 'ASC';
    if (range !== undefined) {
      // Encode the key range and cache the encoded values, so we don't have to re-encode them over and over
      range.__lowerCached = range.lower !== undefined && _encode(range.lower, this.__multiEntryIndex);
      range.__upperCached = range.upper !== undefined && _encode(range.upper, this.__multiEntryIndex);
    }
    this.__gotValue = true;
    this["continue"]();
  };

  /**
   *
   * @param {...any} args
   * @returns {IDBCursorFull}
   */
  IDBCursor.__createInstance = function () {
    var IDBCursor = IDBCursorAlias.__super;
    IDBCursor.prototype = IDBCursorAlias.prototype;

    // @ts-expect-error It's ok
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _construct(IDBCursor, args);
  };

  /**
   *
   * @param {...any} args
   * @this {IDBCursorFull}
   * @returns {void}
   */
  IDBCursor.prototype.__find = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (this.__multiEntryIndex) {
      var key = args[0],
        primaryKey = args[1],
        tx = args[2],
        success = args[3],
        error = args[4];
      this.__findMultiEntry(key, primaryKey, tx, success, error);
    } else {
      var _key3 = args[0],
        _primaryKey = args[1],
        _tx = args[2],
        _success = args[3],
        _error = args[4],
        recordsToLoad = args[5];
      this.__findBasic(_key3, _primaryKey, _tx, _success, _error, recordsToLoad);
    }
  };

  /**
   * @typedef {(
   *   k: import('./Key.js').Key,
   *   val: import('./Key.js').Value,
   *   primKey: import('./Key.js').Key
   * ) => void} KeySuccess
   */

  /**
   * @typedef {(tx: SQLTransaction|Error|DOMException|SQLError, err?: SQLError) => void} FindError
   */

  /**
   *
   * @param {undefined|import('./Key.js').Key} key
   * @param {undefined|import('./Key.js').Key} primaryKey
   * @param {SQLTransaction} tx
   * @param {KeySuccess} success
   * @param {FindError} error
   * @param {Integer|undefined} recordsToLoad
   * @this {IDBCursorFull}
   * @returns {void}
   */
  IDBCursor.prototype.__findBasic = function (key, primaryKey, tx, success, error, recordsToLoad) {
    var continueCall = recordsToLoad !== undefined;
    recordsToLoad = recordsToLoad || 1;
    var me = this;
    var quotedKeyColumnName = sqlQuote(me.__keyColumnName);
    var quotedKey = sqlQuote('key');
    var sql = ['SELECT * FROM', escapeStoreNameForSQL(me.__store.__currentName)];

    /** @type {string[]} */
    var sqlValues = [];
    sql.push('WHERE', quotedKeyColumnName, 'NOT NULL');
    setSQLForKeyRange(me.__range, quotedKeyColumnName, sql, sqlValues, true, true);

    // Determine the ORDER BY direction based on the cursor.
    var direction = me.__sqlDirection;
    var op = direction === 'ASC' ? '>' : '<';
    if (primaryKey !== undefined) {
      sql.push('AND', quotedKey, op + '= ?');
      // Key.convertValueToKey(primaryKey); // Already checked by `continuePrimaryKey`
      sqlValues.push( /** @type {string} */_encode(primaryKey));
    }
    if (key !== undefined) {
      sql.push('AND', quotedKeyColumnName, op + '= ?');
      // Key.convertValueToKey(key); // Already checked by `continue` or `continuePrimaryKey`
      sqlValues.push( /** @type {string} */_encode(key));
    } else if (continueCall && me.__key !== undefined) {
      sql.push('AND', quotedKeyColumnName, op + ' ?');
      // Key.convertValueToKey(me.__key); // Already checked when stored
      sqlValues.push( /** @type {string} */_encode(me.__key));
    }
    if (!me.__count) {
      // 1. Sort by key
      sql.push('ORDER BY', quotedKeyColumnName, direction);
      if (me.__keyColumnName !== 'key') {
        // Avoid adding 'key' twice
        if (!me.__unique) {
          // 2. Sort by primaryKey (if defined and not unique)
          // 3. Sort by position (if defined)
          sql.push(',', quotedKey, direction);
        } else if (me.direction === 'prevunique') {
          // Sort by first record with key matching
          sql.push(',', quotedKey, 'ASC');
        }
      }
      if (!me.__unique && me.__indexSource) {
        // 4. Sort by object store position (if defined and not unique)
        sql.push(',', sqlQuote(me.__valueColumnName), direction);
      }
      sql.push('LIMIT', String(recordsToLoad));
    }
    var sqlStr = sql.join(' ');
    CFG.DEBUG && console.log(sqlStr, sqlValues);
    tx.executeSql(sqlStr, sqlValues, function (tx, data) {
      if (me.__count) {
        success(undefined, data.rows.length, undefined);
      } else if (data.rows.length > 1) {
        me.__prefetchedIndex = 0;
        me.__prefetchedData = data.rows;
        CFG.DEBUG && console.log('Preloaded ' + me.__prefetchedData.length + ' records for cursor');
        me.__decode(data.rows.item(0), success);
      } else if (data.rows.length === 1) {
        me.__decode(data.rows.item(0), success);
      } else {
        CFG.DEBUG && console.log('Reached end of cursors');
        success(undefined, undefined, undefined);
      }
    }, function (tx, err) {
      CFG.DEBUG && console.log('Could not execute Cursor.continue', sqlStr, sqlValues);
      error(err);
      return true;
    });
  };
  var leftBracketRegex = /\[/g;

  /**
   *
   * @param {undefined|import('./Key.js').Key} key
   * @param {undefined|import('./Key.js').Key} primaryKey
   * @param {SQLTransaction} tx
   * @param {KeySuccess} success
   * @param {FindError} error
   * @this {IDBCursorFull}
   * @returns {void}
   */
  IDBCursor.prototype.__findMultiEntry = function (key, primaryKey, tx, success, error) {
    var me = this;
    if (me.__prefetchedData && me.__prefetchedData.length === me.__prefetchedIndex) {
      CFG.DEBUG && console.log('Reached end of multiEntry cursor');
      success(undefined, undefined, undefined);
      return;
    }
    var quotedKeyColumnName = sqlQuote(me.__keyColumnName);
    var sql = ['SELECT * FROM', escapeStoreNameForSQL(me.__store.__currentName)];
    /** @type {string[]} */
    var sqlValues = [];
    sql.push('WHERE', quotedKeyColumnName, 'NOT NULL');
    if (me.__range && me.__range.lower !== undefined && Array.isArray(me.__range.upper)) {
      if (me.__range.upper.indexOf(me.__range.lower) === 0) {
        sql.push('AND', quotedKeyColumnName, "LIKE ? ESCAPE '^'");
        sqlValues.push('%' + sqlLIKEEscape( /** @type {string} */me.__range.__lowerCached.slice(0, -1)) + '%');
      }
    }

    // Determine the ORDER BY direction based on the cursor.
    var direction = me.__sqlDirection;
    var op = direction === 'ASC' ? '>' : '<';
    var quotedKey = sqlQuote('key');
    if (primaryKey !== undefined) {
      sql.push('AND', quotedKey, op + '= ?');
      // Key.convertValueToKey(primaryKey); // Already checked by `continuePrimaryKey`
      sqlValues.push( /** @type {string} */_encode(primaryKey));
    }
    if (key !== undefined) {
      sql.push('AND', quotedKeyColumnName, op + '= ?');
      // Key.convertValueToKey(key); // Already checked by `continue` or `continuePrimaryKey`
      sqlValues.push( /** @type {string} */_encode(key));
    } else if (me.__key !== undefined) {
      sql.push('AND', quotedKeyColumnName, op + ' ?');
      // Key.convertValueToKey(me.__key); // Already checked when entered
      sqlValues.push( /** @type {string} */_encode(me.__key));
    }
    if (!me.__count) {
      // 1. Sort by key
      sql.push('ORDER BY', quotedKeyColumnName, direction);

      // 2. Sort by primaryKey (if defined and not unique)
      if (!me.__unique && me.__keyColumnName !== 'key') {
        // Avoid adding 'key' twice
        sql.push(',', sqlQuote('key'), direction);
      }

      // 3. Sort by position (if defined)

      if (!me.__unique && me.__indexSource) {
        // 4. Sort by object store position (if defined and not unique)
        sql.push(',', sqlQuote(me.__valueColumnName), direction);
      }
    }
    var sqlStr = sql.join(' ');
    CFG.DEBUG && console.log(sqlStr, sqlValues);
    tx.executeSql(sqlStr, sqlValues, function (tx, data) {
      if (data.rows.length > 0) {
        if (me.__count) {
          // Avoid caching and other processing below
          var ct = 0;
          for (var i = 0; i < data.rows.length; i++) {
            var rowItem = data.rows.item(i);
            var rowKey = _decode(rowItem[me.__keyColumnName], true);
            var matches = findMultiEntryMatches(rowKey, me.__range);
            ct += matches.length;
          }
          success(undefined, ct, undefined);
          return;
        }
        var rows = [];
        for (var _i = 0; _i < data.rows.length; _i++) {
          var _rowItem = data.rows.item(_i);
          var _rowKey = _decode(_rowItem[me.__keyColumnName], true);
          var _matches = findMultiEntryMatches(_rowKey, me.__range);
          var _iterator = _createForOfIteratorHelper(_matches),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var matchingKey = _step.value;
              /**
               * @type {RowItemNonNull}
               */
              var clone = {
                matchingKey: /** @type {string} */
                _encode(matchingKey, true),
                key: _rowItem.key
              };
              clone[me.__keyColumnName] = _rowItem[me.__keyColumnName];
              clone[me.__valueColumnName] = _rowItem[me.__valueColumnName];
              rows.push(clone);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        var reverse = me.direction.indexOf('prev') === 0;
        rows.sort(function (a, b) {
          if (a.matchingKey.replaceAll(leftBracketRegex, 'z') < b.matchingKey.replaceAll(leftBracketRegex, 'z')) {
            return reverse ? 1 : -1;
          }
          if (a.matchingKey.replaceAll(leftBracketRegex, 'z') > b.matchingKey.replaceAll(leftBracketRegex, 'z')) {
            return reverse ? -1 : 1;
          }
          if (a.key < b.key) {
            return me.direction === 'prev' ? 1 : -1;
          }
          if (a.key > b.key) {
            return me.direction === 'prev' ? -1 : 1;
          }
          return 0;
        });
        if (rows.length > 1) {
          me.__prefetchedIndex = 0;
          me.__prefetchedData = {
            data: rows,
            length: rows.length,
            /**
             * @param {Integer} index
             * @returns {RowItemNonNull}
             */
            item: function item(index) {
              return this.data[index];
            }
          };
          CFG.DEBUG && console.log('Preloaded ' + me.__prefetchedData.length + ' records for multiEntry cursor');
          me.__decode(rows[0], success);
        } else if (rows.length === 1) {
          CFG.DEBUG && console.log('Reached end of multiEntry cursor');
          me.__decode(rows[0], success);
        } else {
          CFG.DEBUG && console.log('Reached end of multiEntry cursor');
          success(undefined, undefined, undefined);
        }
      } else {
        CFG.DEBUG && console.log('Reached end of multiEntry cursor');
        success(undefined, undefined, undefined);
      }
    }, function (tx, err) {
      CFG.DEBUG && console.log('Could not execute Cursor.continue', sqlStr, sqlValues);
      error(err);
      return true;
    });
  };

  /**
   * @typedef {any} StructuredCloneValue
   */

  /**
   * @typedef {any} IndexedDBKey
   */

  /**
  * @callback SuccessArg
  * @param {StructuredCloneValue} value
  * @param {import('./IDBRequest.js').IDBRequestFull} req
  * @returns {void}
  */

  /**
  * @callback SuccessCallback
  * @param {IndexedDBKey} key
  * @param {StructuredCloneValue} value
  * @param {IndexedDBKey} primaryKey
  * @returns {void}
  */

  /**
   * Creates an "onsuccess" callback.
   * @param {SuccessArg} success
   * @this {IDBCursorFull}
   * @returns {SuccessCallback}
   */
  IDBCursor.prototype.__onsuccess = function (success) {
    var me = this;
    return function (key, value, primaryKey) {
      if (me.__count) {
        success(value, me.__request);
      } else {
        if (key !== undefined) {
          me.__gotValue = true;
        }
        me.__key = key === undefined ? null : key;
        me.__primaryKey = primaryKey === undefined ? null : primaryKey;
        me.__value = value === undefined ? null : value;
        var result = key === undefined ? null : me;
        success(result, me.__request);
      }
    };
  };

  /**
   * @typedef {{
  *   matchingKey: string,
  *   key: string,
  *   [k: string]: string
  * }} RowItemNonNull
  */

  /**
   *
   * @param {RowItemNonNull} rowItem
   * @param {(
   *   key: import('./Key.js').Key,
   *   val: import('./Key.js').Value,
   *   primaryKey: import('./Key.js').Key,
   *   encKey?: string
   * ) => void} callback
   * @this {IDBCursorFull}
   * @returns {void}
   */
  IDBCursor.prototype.__decode = function (rowItem, callback) {
    var me = this;
    if (me.__multiEntryIndex && me.__unique) {
      if (!me.__matchedKeys) {
        me.__matchedKeys = {};
      }
      if (me.__matchedKeys[rowItem.matchingKey]) {
        callback(undefined, undefined, undefined);
        return;
      }
      me.__matchedKeys[rowItem.matchingKey] = true;
    }
    var encKey = unescapeSQLiteResponse(me.__multiEntryIndex ? rowItem.matchingKey : rowItem[me.__keyColumnName]);
    var encVal = unescapeSQLiteResponse(rowItem[me.__valueColumnName]);
    var encPrimaryKey = unescapeSQLiteResponse(rowItem.key);
    var key = _decode(encKey, me.__multiEntryIndex);
    var val = me.__valueDecoder.decode(encVal);
    var primaryKey = _decode(encPrimaryKey);
    callback(key, val, primaryKey, encKey /*, encVal, encPrimaryKey */);
  };

  /**
   * @this {IDBCursorFull}
   * @returns {void}
   */
  IDBCursor.prototype.__sourceOrEffectiveObjStoreDeleted = function () {
    IDBObjectStore.__invalidStateIfDeleted(this.__store, "The cursor's effective object store has been deleted");
    if (this.__indexSource) {
      IDBIndex.__invalidStateIfDeleted( /** @type {import('./IDBIndex.js').IDBIndexFull} */this.source, "The cursor's index source has been deleted");
    }
  };

  /**
   * @this {IDBCursorFull}
   * @returns {void}
   */
  IDBCursor.prototype.__invalidateCache = function () {
    // @ts-expect-error Why is this not being found?
    this.__prefetchedData = null;
  };

  /**
   *
   * @param {import('./Key.js').Key} [key]
   * @param {boolean} [advanceContinue]
   * @this {IDBCursorFull}
   * @returns {void}
   */
  IDBCursor.prototype.__continue = function (key, advanceContinue) {
    var me = this;
    var advanceState = me.__advanceCount !== undefined;
    IDBTransaction.__assertActive(me.__store.transaction);
    me.__sourceOrEffectiveObjStoreDeleted();
    if (!me.__gotValue && !advanceContinue) {
      throw createDOMException('InvalidStateError', 'The cursor is being iterated or has iterated past its end.');
    }
    if (key !== undefined) {
      convertValueToKeyRethrowingAndIfInvalid(key);
      var cmpResult = cmp(key, me.key);
      if (cmpResult === 0 || me.direction.includes('next') && cmpResult === -1 || me.direction.includes('prev') && cmpResult === 1) {
        throw createDOMException('DataError', 'Cannot ' + (advanceState ? 'advance' : 'continue') + ' the cursor in an unexpected direction');
      }
    }
    this.__continueFinish(key, undefined, advanceState);
  };

  /**
   *
   * @param {import('./Key.js').Key} key
   * @param {import('./Key.js').Key} primaryKey
   * @param {boolean} advanceState
   * @this {IDBCursorFull}
   * @returns {void}
   */
  IDBCursor.prototype.__continueFinish = function (key, primaryKey, advanceState) {
    var me = this;
    var recordsToPreloadOnContinue = me.__advanceCount || CFG.cursorPreloadPackSize || 100;
    me.__gotValue = false;
    me.__request.__done = false;

    /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    me.__store.transaction.__pushToQueue(me.__request, function cursorContinue(tx, args, success, error, executeNextRequest) {
      /**
       * @param {import('./Key.js').Key} k
       * @param {import('./Key.js').Value} val
       * @param {import('./Key.js').Key} primKey
       * @returns {void}
       */
      function triggerSuccess(k, val, primKey) {
        if (advanceState) {
          if (me.__advanceCount && me.__advanceCount >= 2 && k !== undefined) {
            me.__advanceCount--;
            me.__key = k;
            me.__continue(undefined, true);
            /** @type {() => void} */
            executeNextRequest(); // We don't call success yet but do need to advance the transaction queue
            return;
          }
          me.__advanceCount = undefined;
        }
        me.__onsuccess(success)(k, val, primKey);
      }
      if (me.__prefetchedData) {
        // We have pre-loaded data for the cursor
        me.__prefetchedIndex++;
        if (me.__prefetchedIndex < me.__prefetchedData.length) {
          me.__decode(me.__prefetchedData.item(me.__prefetchedIndex), function (k, val, primKey, encKey) {
            /**
             * @returns {void}
             */
            function checkKey() {
              var cmpResult = Number(key === undefined) || cmp(k, key);
              if (cmpResult > 0 || cmpResult === 0 && (me.__unique || primaryKey === undefined || cmp(primKey, primaryKey) >= 0)) {
                triggerSuccess(k, val, primKey);
                return;
              }
              cursorContinue(tx, args, success, error);
            }
            if (me.__unique && !me.__multiEntryIndex && encKey === _encode(me.key, me.__multiEntryIndex)) {
              cursorContinue(tx, args, success, error);
              return;
            }
            checkKey();
          });
          return;
        }
      }

      // No (or not enough) pre-fetched data, do query
      me.__find(key, primaryKey, tx, triggerSuccess, /** @type {FindError} */
      function () {
        me.__advanceCount = undefined;
        for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
          args[_key4] = arguments[_key4];
        }
        var t = args[0],
          err = args[1];
        error(t, err);
      }, recordsToPreloadOnContinue);
    });
  };

  /**
   * @this {IDBCursorFull}
   * @returns {void}
   */
  IDBCursor.prototype["continue"] = function /* key */
  () {
    // eslint-disable-next-line prefer-rest-params
    this.__continue(arguments[0]);
  };

  /**
   *
   * @param {import('./Key.js').Key} key
   * @param {import('./Key.js').Key} primaryKey
   * @this {IDBCursorFull}
   * @returns {void}
   */
  IDBCursor.prototype.continuePrimaryKey = function (key, primaryKey) {
    var me = this;
    IDBTransaction.__assertActive(me.__store.transaction);
    me.__sourceOrEffectiveObjStoreDeleted();
    if (!me.__indexSource) {
      throw createDOMException('InvalidAccessError', '`continuePrimaryKey` may only be called on an index source.');
    }
    if (!['next', 'prev'].includes(me.direction)) {
      throw createDOMException('InvalidAccessError', '`continuePrimaryKey` may not be called with unique cursors.');
    }
    if (!me.__gotValue) {
      throw createDOMException('InvalidStateError', 'The cursor is being iterated or has iterated past its end.');
    }
    convertValueToKeyRethrowingAndIfInvalid(key);
    convertValueToKeyRethrowingAndIfInvalid(primaryKey);
    var cmpResult = cmp(key, me.key);
    if (me.direction === 'next' && cmpResult === -1 || me.direction === 'prev' && cmpResult === 1) {
      throw createDOMException('DataError', 'Cannot continue the cursor in an unexpected direction');
    }

    /**
     * @returns {void}
     */
    function noErrors() {
      me.__continueFinish(key, primaryKey, false);
    }
    if (cmpResult === 0) {
      encode(primaryKey, function (encPrimaryKey) {
        encode(me.primaryKey, function (encObjectStorePos) {
          if (encPrimaryKey === encObjectStorePos || me.direction === 'next' && encPrimaryKey < encObjectStorePos || me.direction === 'prev' && encPrimaryKey > encObjectStorePos) {
            throw createDOMException('DataError', 'Cannot continue the cursor in an unexpected direction');
          }
          noErrors();
        });
      });
    } else {
      noErrors();
    }
  };

  /**
   *
   * @param {Integer} count
   * @this {IDBCursorFull}
   * @returns {void}
   */
  IDBCursor.prototype.advance = function (count) {
    var me = this;
    count = enforceRange(count, 'unsigned long');
    if (count === 0) {
      throw new TypeError('Calling advance() with count argument 0');
    }
    if (me.__gotValue) {
      // Only set the count if not running in error (otherwise will override earlier good advance calls)
      me.__advanceCount = count;
    }
    me.__continue();
  };

  /**
   * @typedef {any} AnyValue
   */

  /**
   *
   * @param {AnyValue} valueToUpdate
   * @this {IDBCursorFull}
   * @returns {IDBRequest}
   */
  IDBCursor.prototype.update = function (valueToUpdate) {
    var me = this;
    if (!arguments.length) throw new TypeError('A value must be passed to update()');
    IDBTransaction.__assertActive(me.__store.transaction);
    /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    me.__store.transaction.__assertWritable();
    me.__sourceOrEffectiveObjStoreDeleted();
    if (!me.__gotValue) {
      throw createDOMException('InvalidStateError', 'The cursor is being iterated or has iterated past its end.');
    }
    if (me.__keyOnly) {
      throw createDOMException('InvalidStateError', 'This cursor method cannot be called when the key only flag has been set.');
    }
    var request = /** @type {import('./IDBTransaction.js').IDBTransactionFull} */me.__store.transaction.__createRequest(me);
    var key = me.primaryKey;

    /**
     * @param {import('./Key.js').Value} clonedValue
     * @returns {void}
     */
    function addToQueue(clonedValue) {
      // We set the `invalidateCache` argument to `false` since the old value shouldn't be accessed
      IDBObjectStore.__storingRecordObjectStore(request, me.__store, false, clonedValue, false, key);
    }
    if (me.__store.keyPath !== null) {
      var _me$__store$__validat = me.__store.__validateKeyAndValueAndCloneValue(valueToUpdate, undefined, true),
        _me$__store$__validat2 = _slicedToArray$1(_me$__store$__validat, 2),
        evaluatedKey = _me$__store$__validat2[0],
        clonedValue = _me$__store$__validat2[1];
      if (cmp(me.primaryKey, evaluatedKey) !== 0) {
        throw createDOMException('DataError', 'The key of the supplied value to `update` is not equal to the cursor\'s effective key');
      }
      addToQueue(clonedValue);
    } else {
      var _clonedValue = clone(valueToUpdate);
      addToQueue(_clonedValue);
    }
    return request;
  };

  /**
   * @this {IDBCursorFull}
   * @returns {IDBRequest}
   */
  IDBCursor.prototype["delete"] = function () {
    var me = this;
    IDBTransaction.__assertActive(me.__store.transaction);
    /** @type {import('./IDBTransaction.js').IDBTransactionFull} */
    me.__store.transaction.__assertWritable();
    me.__sourceOrEffectiveObjStoreDeleted();
    if (!me.__gotValue) {
      throw createDOMException('InvalidStateError', 'The cursor is being iterated or has iterated past its end.');
    }
    if (me.__keyOnly) {
      throw createDOMException('InvalidStateError', 'This cursor method cannot be called when the key only flag has been set.');
    }
    return (/** @type {import('./IDBTransaction.js').IDBTransactionFull} */this.__store.transaction.__addToTransactionQueue(function cursorDelete(tx, args, success, error) {
        me.__find(undefined, undefined, tx, /** @type {KeySuccess} */
        function (key, value, primaryKey) {
          var sql = 'DELETE FROM  ' + escapeStoreNameForSQL(me.__store.__currentName) + ' WHERE "key" = ?';
          CFG.DEBUG && console.log(sql, key, primaryKey);
          // Key.convertValueToKey(primaryKey); // Already checked when entered
          tx.executeSql(sql, [escapeSQLiteStatement( /** @type {string} */_encode(primaryKey))], function (tx, data) {
            if (data.rowsAffected === 1) {
              // We don't invalidate the cache (as we don't access it anymore
              //    and it will set the index off)
              success(undefined);
            } else {
              // @ts-expect-error Apparently ok
              error('No rows with key found' + key);
            }
          }, function (tx, data) {
            error(data);
            return true;
          });
        }, error);
      }, undefined, me)
    );
  };
  IDBCursor.prototype[Symbol.toStringTag] = 'IDBCursorPrototype';
  defineReadonlyOuterInterface(IDBCursor.prototype, ['source', 'direction', 'key', 'primaryKey', 'request']);
  Object.defineProperty(IDBCursor, 'prototype', {
    writable: false
  });

  /**
   * @class
   */
  function IDBCursorWithValue() {
    throw new TypeError('Illegal constructor');
  }

  // @ts-expect-error It's ok
  IDBCursorWithValue.prototype = Object.create(IDBCursor.prototype);
  Object.defineProperty(IDBCursorWithValue.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: IDBCursorWithValue
  });
  var IDBCursorWithValueAlias = IDBCursorWithValue;
  /**
   *
   * @param {...any} args
   * @returns {IDBCursorWithValueFull}
   */
  IDBCursorWithValue.__createInstance = function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
      args[_key5] = arguments[_key5];
    }
    /**
     * @class
     * @this {IDBCursorWithValueFull}
     */
    function IDBCursorWithValue() {
      var query = args[0],
        direction = args[1],
        store = args[2],
        source = args[3],
        keyColumnName = args[4],
        valueColumnName = args[5],
        count = args[6];
      IDBCursor.__super.call(this, query, direction, store, source, keyColumnName, valueColumnName, count);
      // @ts-expect-error It's ok
      this[Symbol.toStringTag] = 'IDBCursorWithValue';
      defineReadonlyProperties(this, 'value');
    }
    IDBCursorWithValue.prototype = IDBCursorWithValueAlias.prototype;

    // @ts-expect-error It's ok
    return new IDBCursorWithValue();
  };
  defineReadonlyOuterInterface(IDBCursorWithValue.prototype, ['value']);
  IDBCursorWithValue.prototype[Symbol.toStringTag] = 'IDBCursorWithValuePrototype';
  Object.defineProperty(IDBCursorWithValue, 'prototype', {
    writable: false
  });

  /**
   * @typedef {any} AnyValue
   */

  /**
   * @callback SetConfig
   * @param {import('./CFG.js').KeyofConfigValues|
   *   Partial<import('./CFG.js').ConfigValues>} prop
   * @param {AnyValue} [val]
   * @throws {Error}
   * @returns {void}
   */

  /** @type {SetConfig} */
  function setConfig(prop, val) {
    if (prop && _typeof$2(prop) === 'object') {
      Object.entries(prop).forEach(function (_ref) {
        var _ref2 = _slicedToArray$1(_ref, 2),
          p = _ref2[0],
          val = _ref2[1];
        setConfig( /** @type {import('./CFG.js').KeyofConfigValues} */
        p, val);
      });
      return;
    }
    if (!(prop in CFG)) {
      throw new Error(prop + ' is not a valid configuration property');
    }
    // @ts-expect-error Should not be `never` here!
    CFG[prop] = val;
    if (prop === 'registerSCA' && typeof val === 'function') {
      register(
      /**
       * @type {(
       *   preset: import('typeson').Preset
       * ) => import('typeson').Preset}
       */
      val);
    }
  }

  /**
   * @typedef {(
   *   prop: import('./CFG.js').KeyofConfigValues
   * ) => import('../src/CFG.js').ConfigValue} GetConfig
   */

  /**
   * @typedef {(cfg: {
   *   UnicodeIDStart: string,
   *   UnicodeIDContinue: string
   * }) => void} SetUnicodeIdentifiers
   */

  /**
   * @typedef {(IDBFactory|object) & {
   *     __useShim: () => void,
   *     __debug: (val: boolean) => void,
   *     __setConfig: SetConfig,
   *     __getConfig: GetConfig,
   *     __setUnicodeIdentifiers: SetUnicodeIdentifiers,
   *     __setConnectionQueueOrigin: (origin?: string) => void
   *   }} ShimIndexedDB
   */

  /**
   * @typedef {number} Integer
   */

  /**
   * @typedef {(typeof globalThis|object) & {
   *   indexedDB?: Partial<IDBFactory>,
   *   IDBFactory: typeof IDBFactory,
   *   IDBOpenDBRequest: typeof IDBOpenDBRequest,
   *   IDBRequest: typeof IDBRequest,
   *   IDBCursorWithValue: typeof IDBCursorWithValue,
   *   IDBCursor: typeof IDBCursor,
   *   IDBDatabase: typeof IDBDatabase,
   *   IDBTransaction: typeof IDBTransaction,
   *   IDBKeyRange: typeof IDBKeyRange,
   *   shimIndexedDB?: ShimIndexedDB
   * }} ShimmedObject
   */

  /**
   *
   * @param {ShimmedObject} [idb]
   * @param {import('./CFG.js').ConfigValues} [initialConfig]
   * @returns {ShimmedObject}
   */
  function setGlobalVars(idb, initialConfig) {
    if (initialConfig) {
      setConfig(initialConfig);
    }
    var IDB = idb || globalThis || {};
    /**
     * @typedef {any} AnyClass
     */
    /**
     * @typedef {any} AnyValue
     */
    /**
     * @typedef {Function} AnyFunction
     */
    /**
     * @param {string} name
     * @param {AnyClass} value
     * @param {PropertyDescriptor & {
     *   shimNS?: object
     * }|undefined} [propDesc]
     * @returns {void}
     */
    function shim(name, value, propDesc) {
      if (!propDesc || !Object.defineProperty) {
        try {
          // Try setting the property. This will fail if the property is read-only.
          // @ts-expect-error It's ok
          IDB[name] = value;
        } catch (e) {
          console.log(e);
        }
      }
      if (
      // @ts-expect-error It's ok
      IDB[name] !== value && Object.defineProperty) {
        // Setting a read-only property failed, so try re-defining the property
        try {
          var desc = propDesc || {};
          if (!('get' in desc)) {
            if (!('value' in desc)) {
              desc.value = value;
            }
            if (!('writable' in desc)) {
              desc.writable = true;
            }
          } else {
            var o = _defineAccessor("get", {}, name, function () {
              return (/** @type {AnyFunction} */ /** @type {PropertyDescriptor} */propDesc.get.call(this)
              );
            });
            desc = /** @type {PropertyDescriptor} */
            Object.getOwnPropertyDescriptor(o, name);
          }
          Object.defineProperty(IDB, name, desc);
        } catch (e) {
          // With `indexedDB`, PhantomJS fails here and below but
          //  not above, while Chrome is reverse (and Firefox doesn't
          //  get here since no WebSQL to use for shimming)
        }
      }

      // @ts-expect-error It's ok
      if (IDB[name] !== value) {
        typeof console !== 'undefined' && console.warn && console.warn('Unable to shim ' + name);
      }
    }
    if (CFG.win.openDatabase !== undefined) {
      shim('shimIndexedDB', shimIndexedDB, {
        enumerable: false,
        configurable: true
      });
    }
    if ('shimIndexedDB' in IDB && IDB.shimIndexedDB) {
      IDB.shimIndexedDB.__useShim = function () {
        /**
         *
         * @param {"Shim"|""} [prefix]
         * @returns {void}
         */
        function setNonIDBGlobals() {
          var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          shim(prefix + 'DOMException', ShimDOMException);
          shim(prefix + 'DOMStringList', DOMStringList, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: DOMStringList
          });
          shim(prefix + 'Event', ShimEvent, {
            configurable: true,
            writable: true,
            value: ShimEvent,
            enumerable: false
          });
          shim(prefix + 'CustomEvent', ShimCustomEvent, {
            configurable: true,
            writable: true,
            value: ShimCustomEvent,
            enumerable: false
          });
          shim(prefix + 'EventTarget', EventTarget, {
            configurable: true,
            writable: true,
            value: EventTarget,
            enumerable: false
          });
        }
        var shimIDBFactory = IDBFactory;
        if (CFG.win.openDatabase !== undefined) {
          shimIndexedDB.__openDatabase = CFG.win.openDatabase.bind(CFG.win); // We cache here in case the function is overwritten later as by the IndexedDB support promises tests
          // Polyfill ALL of IndexedDB, using WebSQL
          shim('indexedDB', shimIndexedDB, {
            enumerable: true,
            configurable: true,
            get: function get() {
              if (this !== IDB && !isNullish(this) && !this.shimNS) {
                // Latter is hack for test environment
                throw new TypeError('Illegal invocation');
              }
              return shimIndexedDB;
            }
          });
          /** @type {[string, any][]} */
          [['IDBFactory', shimIDBFactory], ['IDBDatabase', IDBDatabase], ['IDBObjectStore', IDBObjectStore], ['IDBIndex', IDBIndex], ['IDBTransaction', IDBTransaction], ['IDBCursor', IDBCursor], ['IDBCursorWithValue', IDBCursorWithValue], ['IDBKeyRange', IDBKeyRange], ['IDBRequest', IDBRequest], ['IDBOpenDBRequest', IDBOpenDBRequest], ['IDBVersionChangeEvent', IDBVersionChangeEvent]].forEach(function (_ref3) {
            var _ref4 = _slicedToArray$1(_ref3, 2),
              prop = _ref4[0],
              obj = _ref4[1];
            shim(prop, obj, {
              enumerable: false,
              configurable: true
            });
          });
          // For Node environments
          if (CFG.fs) {
            setFS(CFG.fs);
          }
          if (CFG.fullIDLSupport) {
            // Slow per MDN so off by default! Though apparently needed for WebIDL: http://stackoverflow.com/questions/41927589/rationales-consequences-of-webidl-class-inheritance-requirements

            Object.setPrototypeOf(IDB.IDBOpenDBRequest, IDB.IDBRequest);
            Object.setPrototypeOf(IDB.IDBCursorWithValue, IDB.IDBCursor);
            Object.setPrototypeOf(IDBDatabase, EventTarget);
            Object.setPrototypeOf(IDBRequest, EventTarget);
            Object.setPrototypeOf(IDBTransaction, EventTarget);
            Object.setPrototypeOf(IDBVersionChangeEvent, ShimEvent);
            Object.setPrototypeOf(ShimDOMException, Error);
            Object.setPrototypeOf(ShimDOMException.prototype, Error.prototype);
            setPrototypeOfCustomEvent();
          }
          if (IDB.indexedDB && !IDB.indexedDB.toString().includes('[native code]')) {
            if (CFG.addNonIDBGlobals) {
              // As `DOMStringList` exists per IDL (and Chrome) in the global
              //   thread (but not in workers), we prefix the name to avoid
              //   shadowing or conflicts
              setNonIDBGlobals('Shim');
            }
            if (CFG.replaceNonIDBGlobals) {
              setNonIDBGlobals();
            }
          }
          /* istanbul ignore next -- TS guard */
          if (!IDB.shimIndexedDB) {
            return;
          }
          IDB.shimIndexedDB.__setConnectionQueueOrigin();
        }
      };
      IDB.shimIndexedDB.__debug = function (val) {
        CFG.DEBUG = val;
      };
      IDB.shimIndexedDB.__setConfig = setConfig;

      /** @type {GetConfig} */
      IDB.shimIndexedDB.__getConfig = function (prop) {
        if (!(prop in CFG)) {
          throw new Error(prop + ' is not a valid configuration property');
        }
        return CFG[prop];
      };

      /** @type {SetUnicodeIdentifiers} */
      IDB.shimIndexedDB.__setUnicodeIdentifiers = function (_ref5) {
        var UnicodeIDStart = _ref5.UnicodeIDStart,
          UnicodeIDContinue = _ref5.UnicodeIDContinue;
        setConfig({
          UnicodeIDStart: UnicodeIDStart,
          UnicodeIDContinue: UnicodeIDContinue
        });
      };
    } else {
      // We no-op the harmless set-up properties and methods with a warning; the `IDBFactory` methods,
      //    however (including our non-standard methods), are not stubbed as they ought
      //    to fail earlier rather than potentially having side effects.
      IDB.shimIndexedDB = /** @type {ShimIndexedDB} */{};
      /** @type {const} */
      ['__useShim', '__debug', '__setConfig', '__getConfig', '__setUnicodeIdentifiers'].forEach(function (prop) {
        /** @type {ShimIndexedDB} */IDB.shimIndexedDB[prop] = /** @type {() => any} */function () {
          console.warn('This browser does not have WebSQL to shim.');
        };
      });
    }

    // Workaround to prevent an error in Firefox
    if (!('indexedDB' in IDB) && typeof window !== 'undefined') {
      // 2nd condition avoids problems in Node
      IDB.indexedDB = /** @type {IDBFactory} */IDB.indexedDB || 'webkitIndexedDB' in IDB && IDB.webkitIndexedDB || 'mozIndexedDB' in IDB && IDB.mozIndexedDB || 'oIndexedDB' in IDB && IDB.oIndexedDB || 'msIndexedDB' in IDB && IDB.msIndexedDB;
    }

    // Detect browsers with known IndexedDB issues (e.g. Android pre-4.4)
    var poorIndexedDbSupport = false;
    if (typeof navigator !== 'undefined' &&
    // Not apparently defined in React Native
    navigator.userAgent && (
    // Ignore Node or other environments
    // Bad non-Chrome Android support
    /Android (?:2|3|4\.[0-3])/.test(navigator.userAgent) && !navigator.userAgent.includes('Chrome') ||
    // Bad non-Safari iOS9 support (see <https://github.com/axemclion/IndexedDBShim/issues/252>)
    (!navigator.userAgent.includes('Safari') || navigator.userAgent.includes('Chrome')) &&
    // Exclude genuine Safari: http://stackoverflow.com/a/7768006/271577
    // Detect iOS: http://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885
    // and detect version 9: http://stackoverflow.com/a/26363560/271577
    /(iPad|iPhone|iPod)(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])* o[s\u017F] 9_/i.test(navigator.userAgent) && !('MSStream' in window) // But avoid IE11
    )) {
      poorIndexedDbSupport = true;
    }
    if (!CFG.DEFAULT_DB_SIZE) {
      CFG.DEFAULT_DB_SIZE = (
      // Safari currently requires larger size: (We don't need a larger size for Node as node-websql doesn't use this info)
      // https://github.com/axemclion/IndexedDBShim/issues/41
      // https://github.com/axemclion/IndexedDBShim/issues/115
      typeof navigator !== 'undefined' &&
      // React Native
      navigator.userAgent && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome') ? 25 : 4) * 1024 * 1024;
    }
    if (!CFG.avoidAutoShim && (!IDB.indexedDB || poorIndexedDbSupport) && CFG.win.openDatabase !== undefined) {
      IDB.shimIndexedDB.__useShim();
    } else {
      IDB.IDBDatabase = IDB.IDBDatabase || 'webkitIDBDatabase' in IDB && IDB.webkitIDBDatabase;
      IDB.IDBTransaction = IDB.IDBTransaction || 'webkitIDBTransaction' in IDB && IDB.webkitIDBTransaction || {};
      IDB.IDBCursor = IDB.IDBCursor || 'webkitIDBCursor' in IDB && IDB.webkitIDBCursor;
      IDB.IDBKeyRange = IDB.IDBKeyRange || 'webkitIDBKeyRange' in IDB && IDB.webkitIDBKeyRange;
    }
    return (/** @type {ShimmedObject} */IDB
    );
  }

  /* eslint-env browser, worker */
  CFG.win = typeof window !== 'undefined' ? window : self; // For Web Workers
  setGlobalVars();

}));
//# sourceMappingURL=indexeddbshim.js.map
