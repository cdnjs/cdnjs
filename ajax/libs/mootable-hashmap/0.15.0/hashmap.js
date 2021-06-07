(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Mootable = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
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
        it = o[Symbol.iterator]();
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  createCommonjsModule(function (module) {
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

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$1 =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var path = global$1;

  var hasOwnProperty = {}.hasOwnProperty;

  var has$1 = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var document$1 = global$1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty$1 = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$6 = descriptors ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$6
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global$1, key, value);
    } catch (error) {
      global$1[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store$1 = global$1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store$1;

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.10.1',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var toString$1 = {}.toString;

  var classofRaw = function (it) {
    return toString$1.call(it).slice(8, -1);
  };

  var engineIsNode = classofRaw(global$1.process) == 'process';

  var aFunction$1 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global$1[namespace])
      : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global$1.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] + match[1];
  } else if (engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // eslint-disable-next-line es/no-symbol -- required for testing
    return !Symbol.sham &&
      // Chrome 38 Symbol has incorrect toString conversion
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      (engineIsNode ? engineV8Version === 38 : engineV8Version > 37 && engineV8Version < 41);
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var useSymbolAsUid = nativeSymbol
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore$1 = shared('wks');
  var Symbol$1 = global$1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!has$1(WellKnownSymbolsStore$1, name) || !(nativeSymbol || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      if (nativeSymbol && has$1(Symbol$1, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
      }
    } return WellKnownSymbolsStore$1[name];
  };

  var f$5 = wellKnownSymbol;

  var wellKnownSymbolWrapped = {
  	f: f$5
  };

  var defineProperty$5 = objectDefineProperty.f;

  var defineWellKnownSymbol = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!has$1(Symbol, NAME)) defineProperty$5(Symbol, NAME, {
      value: wellKnownSymbolWrapped.f(NAME)
    });
  };

  // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator
  defineWellKnownSymbol('iterator');

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var ceil = Math.ceil;
  var floor$1 = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
  };

  var min$2 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min$2(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max$2 = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max$2(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$3 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$3(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$3(false)
  };

  var hiddenKeys$1 = {};

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has$1(hiddenKeys$1, key) && has$1(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has$1(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  var keys$2 = shared('keys');

  var sharedKey = function (key) {
    return keys$2[key] || (keys$2[key] = uid(key));
  };

  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      /* global ActiveXObject -- old IE */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys$1[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype$1 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap$1 = global$1.WeakMap;

  var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

  var WeakMap = global$1.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store = sharedStore.state || (sharedStore.state = new WeakMap());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys$1[STATE] = true;
    set = function (it, metadata) {
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has$1(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return has$1(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$4 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$1;

  var objectPropertyIsEnumerable = {
  	f: f$4
  };

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$3 = descriptors ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (has$1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$3
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(String).split('String');

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$1(value, 'name')) {
        createNonEnumerableProperty(value, 'name', key);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }
    if (O === global$1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
  });
  });

  var hiddenKeys = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  var f$2 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys);
  };

  var objectGetOwnPropertyNames = {
  	f: f$2
  };

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  var f$1 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$1
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has$1(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$1;
    } else if (STATIC) {
      target = global$1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO = sharedKey('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
    O = toObject(O);
    if (has$1(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype$1 : null;
  };

  var ITERATOR$5 = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  var returnThis$2 = function () { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if (!has$1(IteratorPrototype$2, ITERATOR$5)) {
    createNonEnumerableProperty(IteratorPrototype$2, ITERATOR$5, returnThis$2);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$4 = objectDefineProperty.f;



  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has$1(it = STATIC ? it : it.prototype, TO_STRING_TAG$3)) {
      defineProperty$4(it, TO_STRING_TAG$3, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis$1 = function () { return this; };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var aPossiblePrototype = function (it) {
    if (!isObject(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  /* eslint-disable no-proto -- safe */

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var IteratorPrototype = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$4 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$4]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
            createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
      createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
    }
    iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$4 = internalState.set;
  var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState$4(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated), // target
      index: 0,                          // next index
      kind: kind                         // kind
    });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$2(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  iterators.Arguments = iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
  }

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$2 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
  };

  var charAt = stringMultibyte.charAt;



  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$3 = internalState.set;
  var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState$3(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$1(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  var ITERATOR$3 = wellKnownSymbol('iterator');
  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var ArrayValues = es_array_iterator.values;

  for (var COLLECTION_NAME$1 in domIterables) {
    var Collection$1 = global$1[COLLECTION_NAME$1];
    var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
    if (CollectionPrototype$1) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1[ITERATOR$3] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$3, ArrayValues);
      } catch (error) {
        CollectionPrototype$1[ITERATOR$3] = ArrayValues;
      }
      if (!CollectionPrototype$1[TO_STRING_TAG]) {
        createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG, COLLECTION_NAME$1);
      }
      if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
        }
      }
    }
  }

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  /* eslint-disable es/no-object-getownpropertynames -- safe */

  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;

  var toString = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return windowNames.slice();
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var f = function getOwnPropertyNames(it) {
    return windowNames && toString.call(it) == '[object Window]'
      ? getWindowNames(it)
      : $getOwnPropertyNames$1(toIndexedObject(it));
  };

  var objectGetOwnPropertyNamesExternal = {
  	f: f
  };

  var aFunction = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var SPECIES$3 = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push.call(target, value); // filterOut
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6),
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod$1(7)
  };

  var $forEach$1 = arrayIteration.forEach;

  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
  var setInternalState$2 = internalState.set;
  var getInternalState = internalState.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$1.Symbol;
  var $stringify = getBuiltIn('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var nativeDefineProperty = objectDefineProperty.f;
  var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = objectPropertyIsEnumerable.f;
  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared('wks');
  var QObject = global$1.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = descriptors && fails(function () {
    return objectCreate(nativeDefineProperty({}, 'a', {
      get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
    nativeDefineProperty(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
      nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty;

  var wrap = function (tag, description) {
    var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE]);
    setInternalState$2(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!descriptors) symbol.description = description;
    return symbol;
  };

  var isSymbol = useSymbolAsUid ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return Object(it) instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject(O);
    var key = toPrimitive(P, true);
    anObject(Attributes);
    if (has$1(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has$1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has$1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject(O);
    var properties = toIndexedObject(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach$1(keys, function (key) {
      if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPrimitive(V, true);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (this === ObjectPrototype && has$1(AllSymbols, P) && !has$1(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has$1(this, P) || !has$1(AllSymbols, P) || has$1(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPrimitive(P, true);
    if (it === ObjectPrototype && has$1(AllSymbols, key) && !has$1(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);
    if (descriptor && has$1(AllSymbols, key) && !(has$1(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (!has$1(AllSymbols, key) && !has$1(hiddenKeys$1, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (has$1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$1(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if (!nativeSymbol) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
      var tag = uid(description);
      var setter = function (value) {
        if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
        if (has$1(this, HIDDEN) && has$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };
      if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };

    redefine($Symbol[PROTOTYPE], 'toString', function toString() {
      return getInternalState(this).tag;
    });

    redefine($Symbol, 'withoutSetter', function (description) {
      return wrap(uid(description), description);
    });

    objectPropertyIsEnumerable.f = $propertyIsEnumerable;
    objectDefineProperty.f = $defineProperty;
    objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
    objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

    wellKnownSymbolWrapped.f = function (name) {
      return wrap(wellKnownSymbol(name), name);
    };

    if (descriptors) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
      {
        redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
      }
    }
  }

  _export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
    Symbol: $Symbol
  });

  $forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol(name);
  });

  _export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function (key) {
      var string = String(key);
      if (has$1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
      if (has$1(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });

  _export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });

  _export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  _export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return objectGetOwnPropertySymbols.f(toObject(it));
    }
  });

  // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify
  if ($stringify) {
    var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
      var symbol = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      return $stringify([symbol]) != '[null]'
        // WebKit converts symbol values to JSON as null
        || $stringify({ a: symbol }) != '{}'
        // V8 throws on boxed symbols
        || $stringify(Object(symbol)) != '{}';
    });

    _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;
        while (arguments.length > index) args.push(arguments[index++]);
        $replacer = replacer;
        if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
        if (!isArray(replacer)) replacer = function (key, value) {
          if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return $stringify.apply(null, args);
      }
    });
  }

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
    createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  }
  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag($Symbol, SYMBOL);

  hiddenKeys$1[HIDDEN] = true;

  var defineProperty$3 = objectDefineProperty.f;


  var NativeSymbol = global$1.Symbol;

  if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
    // Safari 12 bug
    NativeSymbol().description !== undefined
  )) {
    var EmptyStringDescriptionStore = {};
    // wrap Symbol constructor for correct work with undefined description
    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
      var result = this instanceof SymbolWrapper
        ? new NativeSymbol(description)
        // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
        : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };
    copyConstructorProperties(SymbolWrapper, NativeSymbol);
    var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
    symbolPrototype.constructor = SymbolWrapper;

    var symbolToString = symbolPrototype.toString;
    var native = String(NativeSymbol('test')) == 'Symbol(test)';
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    defineProperty$3(symbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        var symbol = isObject(this) ? this.valueOf() : this;
        var string = symbolToString.call(symbol);
        if (has$1(EmptyStringDescriptionStore, symbol)) return '';
        var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });

    _export({ global: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var $forEach = arrayIteration.forEach;


  var STRICT_METHOD = arrayMethodIsStrict('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  for (var COLLECTION_NAME in domIterables) {
    var Collection = global$1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
      createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
    } catch (error) {
      CollectionPrototype.forEach = arrayForEach;
    }
  }

  var SPECIES$2 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$2] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $map = arrayIteration.map;


  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('splice');

  var max$1 = Math.max;
  var min = Math.min;
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject(this);
      var len = toLength(O.length);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min(max$1(toInteger(deleteCount), 0), len - actualStart);
      }
      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
        throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      O.length = len - actualDeleteCount + insertCount;
      return A;
    }
  });

  var $find = arrayIteration.find;


  var FIND = 'find';
  var SKIPS_HOLES$1 = true;

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  _export({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  var $findIndex = arrayIteration.findIndex;


  var FIND_INDEX = 'findIndex';
  var SKIPS_HOLES = true;

  // Shouldn't skip holes
  if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findindex
  _export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND_INDEX);

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

  var SPECIES$1 = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$1];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  // `SameValue` abstract operation
  // https://tc39.es/ecma262/#sec-samevalue
  // eslint-disable-next-line es/no-object-is -- safe
  var sameValue = Object.is || function is(x, y) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };

  // `Object.is` method
  // https://tc39.es/ecma262/#sec-object.is
  _export({ target: 'Object', stat: true }, {
    is: sameValue
  });

  // `Number.isNaN` method
  // https://tc39.es/ecma262/#sec-number.isnan
  _export({ target: 'Number', stat: true }, {
    isNaN: function isNaN(number) {
      // eslint-disable-next-line no-self-compare -- NaN check
      return number != number;
    }
  });

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      objectSetPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) == 'function' &&
      NewTarget !== Wrapper &&
      isObject(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  // a string of all valid unicode whitespaces
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod = function (TYPE) {
    return function ($this) {
      var string = String(requireObjectCoercible($this));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod(3)
  };

  var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var defineProperty$2 = objectDefineProperty.f;
  var trim = stringTrim.trim;

  var NUMBER = 'Number';
  var NativeNumber = global$1[NUMBER];
  var NumberPrototype = NativeNumber.prototype;

  // Opera ~12 has broken Object#toString
  var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

  // `ToNumber` abstract operation
  // https://tc39.es/ecma262/#sec-tonumber
  var toNumber = function (argument) {
    var it = toPrimitive(argument, false);
    var first, third, radix, maxCode, digits, length, index, code;
    if (typeof it == 'string' && it.length > 2) {
      it = trim(it);
      first = it.charCodeAt(0);
      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
          case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
          default: return +it;
        }
        digits = it.slice(2);
        length = digits.length;
        for (index = 0; index < length; index++) {
          code = digits.charCodeAt(index);
          // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        } return parseInt(digits, radix);
      }
    } return +it;
  };

  // `Number` constructor
  // https://tc39.es/ecma262/#sec-number-constructor
  if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
    var NumberWrapper = function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var dummy = this;
      return dummy instanceof NumberWrapper
        // check on 1..constructor(foo) case
        && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
          ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
    };
    for (var keys$1 = descriptors ? getOwnPropertyNames$1(NativeNumber) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES2015 (in case, if modules with ES2015 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' +
      // ESNext
      'fromString,range'
    ).split(','), j = 0, key; keys$1.length > j; j++) {
      if (has$1(NativeNumber, key = keys$1[j]) && !has$1(NumberWrapper, key)) {
        defineProperty$2(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    redefine(global$1, NUMBER, NumberWrapper);
  }

  /**
   * Utils - Utility functions
   * @namespace Mootable.Utils
   * @author Jack Moxley <https://github.com/jackmoxley>
   * @version 0.15.0
   * Homepage: https://github.com/mootable/hashmap
   */

  /**
   * Is the passed value not null and a function
   * @param func
   * @returns {boolean}
   */
  function isFunction(func) {
    return !!(func && func.constructor && func.call && func.apply);
  }
  /**
   * Is the passed object iterable
   * @param iterable
   * @return {boolean}
   */

  function isIterable(iterable) {
    return !!(iterable && isFunction(iterable[Symbol.iterator]));
  }
  /**
   * Is the passed value not null and a string
   * @param str
   * @returns {boolean}
   */

  function isString(str) {
    // jshint ignore:line
    return !!(str && (typeof str === 'string' || str instanceof String));
  }
  /**
   * sameValueZero is the equality method used by Map, Array, Set etc.
   * The only difference between === and sameValueZero is that NaN counts as equal on sameValueZero
   * @see {@link https://262.ecma-international.org/6.0/#sec-samevaluezero saveValueZero}
   * @param x - the first object to compare
   * @param y - the second object to compare
   * @returns {boolean} - if they are equals according to {@link https://262.ecma-international.org/6.0/#sec-samevaluezero ECMA Spec for Same Value Zero}
   */

  function sameValueZero(x, y) {
    return x === y || Number.isNaN(x) && Number.isNaN(y);
  }
  /**
   * The strict Equals method <code>===</code>.
   * Simply does a strict equality comparison <code>===</code> against 2 values
   * @see {@link https://262.ecma-international.org/6.0/#sec-strict-equality-comparison strictEquals}
   * @param x - the first object to compare
   * @param y - the second object to compare
   * @returns {boolean} - if they are equals according to {@link https://262.ecma-international.org/6.0/#sec-strict-equality-comparison ECMA Spec for Strict Equality}
   */

  function strictEquals(x, y) {
    return x === y;
  }

  var globalIsFinite = global$1.isFinite;

  // `Number.isFinite` method
  // https://tc39.es/ecma262/#sec-number.isfinite
  // eslint-disable-next-line es/no-number-isfinite -- safe
  var numberIsFinite = Number.isFinite || function isFinite(it) {
    return typeof it == 'number' && globalIsFinite(it);
  };

  // `Number.isFinite` method
  // https://tc39.es/ecma262/#sec-number.isfinite
  _export({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

  var floor = Math.floor;

  // `Number.isInteger` method implementation
  // https://tc39.es/ecma262/#sec-number.isinteger
  var isInteger = function isInteger(it) {
    return !isObject(it) && isFinite(it) && floor(it) === it;
  };

  var abs = Math.abs;

  // `Number.isSafeInteger` method
  // https://tc39.es/ecma262/#sec-number.issafeinteger
  _export({ target: 'Number', stat: true }, {
    isSafeInteger: function isSafeInteger(number) {
      return isInteger(number) && abs(number) <= 0x1FFFFFFFFFFFFF;
    }
  });

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var TO_STRING = 'toString';
  var RegExpPrototype$1 = RegExp.prototype;
  var nativeToString = RegExpPrototype$1[TO_STRING];

  var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  var MATCH$1 = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
  // so we use an intermediate function.
  function RE(s, f) {
    return RegExp(s, f);
  }

  var UNSUPPORTED_Y$2 = fails(function () {
    // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
    var re = RE('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  var BROKEN_CARET = fails(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = RE('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var regexpStickyHelpers = {
  	UNSUPPORTED_Y: UNSUPPORTED_Y$2,
  	BROKEN_CARET: BROKEN_CARET
  };

  var SPECIES = wellKnownSymbol('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES]) {
      defineProperty(Constructor, SPECIES, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var defineProperty$1 = objectDefineProperty.f;
  var getOwnPropertyNames = objectGetOwnPropertyNames.f;





  var setInternalState$1 = internalState.set;



  var MATCH = wellKnownSymbol('match');
  var NativeRegExp = global$1.RegExp;
  var RegExpPrototype = NativeRegExp.prototype;
  var re1 = /a/g;
  var re2 = /a/g;

  // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;

  var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;

  var FORCED$1 = descriptors && isForced_1('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y$1 || fails(function () {
    re2[MATCH] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  })));

  // `RegExp` constructor
  // https://tc39.es/ecma262/#sec-regexp-constructor
  if (FORCED$1) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = this instanceof RegExpWrapper;
      var patternIsRegExp = isRegexp(pattern);
      var flagsAreUndefined = flags === undefined;
      var sticky;

      if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
        return pattern;
      }

      if (CORRECT_NEW) {
        if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
      } else if (pattern instanceof RegExpWrapper) {
        if (flagsAreUndefined) flags = regexpFlags.call(pattern);
        pattern = pattern.source;
      }

      if (UNSUPPORTED_Y$1) {
        sticky = !!flags && flags.indexOf('y') > -1;
        if (sticky) flags = flags.replace(/y/g, '');
      }

      var result = inheritIfRequired(
        CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
        thisIsRegExp ? this : RegExpPrototype,
        RegExpWrapper
      );

      if (UNSUPPORTED_Y$1 && sticky) setInternalState$1(result, { sticky: sticky });

      return result;
    };
    var proxy = function (key) {
      key in RegExpWrapper || defineProperty$1(RegExpWrapper, key, {
        configurable: true,
        get: function () { return NativeRegExp[key]; },
        set: function (it) { NativeRegExp[key] = it; }
      });
    };
    var keys = getOwnPropertyNames(NativeRegExp);
    var index = 0;
    while (keys.length > index) proxy(keys[index++]);
    RegExpPrototype.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype;
    redefine(global$1, 'RegExp', RegExpWrapper);
  }

  // https://tc39.es/ecma262/#sec-get-regexp-@@species
  setSpecies('RegExp');

  var nativeExec = RegExp.prototype.exec;
  var nativeReplace = shared('native-string-replace', String.prototype.replace);

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;
      var sticky = UNSUPPORTED_Y && re.sticky;
      var flags = regexpFlags.call(re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = flags.replace('y', '');
        if (flags.indexOf('g') === -1) {
          flags += 'g';
        }

        strCopy = String(str).slice(re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var regexpExec = patchedExec;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  _export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
    exec: regexpExec
  });

  var freezing = !fails(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var internalMetadata = createCommonjsModule(function (module) {
  var defineProperty = objectDefineProperty.f;



  var METADATA = uid('meta');
  var id = 0;

  // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty(it, METADATA, { value: {
      objectID: 'O' + ++id, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!has$1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
    // return object ID
    } return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!has$1(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
    // return the store of weak collections IDs
    } return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (freezing && meta.REQUIRED && isExtensible(it) && !has$1(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = module.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };

  hiddenKeys$1[METADATA] = true;
  });

  var onFreeze = internalMetadata.onFreeze;

  // eslint-disable-next-line es/no-object-freeze -- safe
  var $freeze = Object.freeze;
  var FAILS_ON_PRIMITIVES = fails(function () { $freeze(1); });

  // `Object.freeze` method
  // https://tc39.es/ecma262/#sec-object.freeze
  _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !freezing }, {
    freeze: function freeze(it) {
      return $freeze && isObject(it) ? $freeze(onFreeze(it)) : it;
    }
  });

  /**
   * Option - a class to get round nullable fields.
   * @namespace Mootable.Option
   * @author Jack Moxley <https://github.com/jackmoxley>
   * @version 0.15.0
   * Homepage: https://github.com/mootable/hashmap
   */

  /**
   * A representation of a value, that might be or might not be null.
   * - Options are immutable, once set, it can't be changed.
   * - Options are iterable
   *   - If using a for loop.
   *     - If it has a value the loop will execute just once.
   *     - If it doesn't have a value the loop will not execute
   * @example <caption>iterating over some</caption>
   * const opt = Option.some("hello");
   * for (value of opt) {
   *    // loops once.
   *    console.log(opt);
   * }
   * console.log("world");
   * // logs - hello\nworld
   * @example <caption>iterating over none</caption>
   * const opt = Option.none;
   * for (value of opt) {
   *   // does not loop.
   *    console.log(opt);
   * }
   * console.log("world");
   * // logs - world
   */
  var Option = /*#__PURE__*/function () {
    /**
     * Usage of this constructor should generally be avoided,
     * - instead use the some or none method on Option,
     * - or the some or none exported functions provided with this javascript file.
     * This constructor makes the Option immutable and inextensible.
     * @see none
     * @see some
     * @param has - whether it contains a value or not.
     * @param value - the value to set
     */
    function Option(has, value) {
      _classCallCheck(this, Option);

      this.has = has;
      this.value = value;
      Object.freeze(this);
    }
    /**
     * A constant representation of an Option with nothing in it:
     * <code>{value:undefined,has:false}</code>
     * @example <caption>create an option using none</caption>
     * const option = Option.none;
     * // option.has === false
     * // option.value === undefined
     * // option.size === 0
     * @type {Option}
     */


    _createClass(Option, [{
      key: "size",
      get:
      /**
       * Return the size of this option.
       *  - 1 if it has a value
       *  - 0 if it doesn't
       * @return {number}
       */
      function get() {
        return this.has ? 1 : 0;
      }
      /**
       * When called with a value returns an Option object of the form:
       * <code>{value:value,has:true}</code>
       * Even if a value is not provided it still counts as existing, this is different from other libraries,
       * we are effectively saying, null and undefined count as valid values.
       * @example <caption>create an option using some</caption>
       * const myValue = 'hello';
       * const option = Option.some(myValue);
       * // option.has === true
       * // option.value === 'hello'
       * // option.size === 1
       * @param value - the value
       * @return {Option} - the option in the form <code>{value:value,has:true}</code>
       */

    }, {
      key: Symbol.iterator,
      value:
      /*#__PURE__*/

      /**
       * Provides an iterable for the Option
       * If using a for loop.
       * - If it has a value the loop will execute just once.
       * - If it doesn't have a value the loop will not execute
       * @example <caption>iterating over some</caption>
       * const opt = Option.some("hello");
       * for (value of opt) {
       *    // loops once.
       *    console.log(opt);
       * }
       * console.log("world");
       * // logs - hello\nworld
       * @example <caption>iterating over none</caption>
       * const opt = Option.none;
       * for (value of opt) {
       *   // does not loop.
       *    console.log(opt);
       * }
       * console.log("world");
       * // logs - world
       * @return {Generator<*, void, *>}
       */
      regeneratorRuntime.mark(function value() {
        return regeneratorRuntime.wrap(function value$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.has) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this.value;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, value, this);
      })
    }], [{
      key: "none",
      get: function get() {
        return none;
      }
    }, {
      key: "some",
      value: function some(value) {
        return _some(value);
      }
    }]);

    return Option;
  }();
  /**
   * A function that when called with a value returns an Option object of the form:
   * <code>{value:value,has:true}</code>
   * Even if a value is not provided it still counts as existing, this is different from other libraries,
   * we are effectively saying as null and undefined count as valid values.
   * @example  <caption>create an option using some</caption>
   * const myValue = 'hello';
   * const option = some(myValue);
   * // option.has === true
   * // option.value === 'hello'
   * // option.size === 1
   * @type {function(*=): Option}
   */

  var _some = function _some(value) {
    return new Option(true, value);
  };
  var none = new Option(false, undefined);

  /**
   * Hash - Hash functions
   * @namespace Mootable.Hash
   * @author Jack Moxley <https://github.com/jackmoxley>
   * @version 0.15.0
   * Homepage: https://github.com/mootable/hashmap
   */

  /**
   * Modified Murmur3 hash generator, with capped lengths.
   * This is NOT a cryptographic hash, this hash is designed to create as even a spread across a 32bit integer as is possible.
   * @see {@link https://github.com/aappleby/smhasher|MurmurHash specification on Github}
   * @see {@link https://en.wikipedia.org/wiki/MurmurHash|MurmurHash on Wikipedia}
   * @param key the string being hashed
   * @param len the max limit on the number of characters to hash
   * @param seed an optional random seed, or previous hash value to continue hashing against.
   * @returns {number} the hash
   */

  function hash(key) {
    var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var seed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    len = len > 0 ? Math.min(len, key.length) : key.length;
    seed |= 0;
    var remaining = len & 1;
    var doubleBytes = len - remaining;
    var hash = seed,
        k = 0,
        i = 0;

    while (i < doubleBytes) {
      k = key.charCodeAt(i++) & 0xffff | (key.charCodeAt(i++) & 0xffff) << 16;
      k *= 0xcc9e2d51;
      k = k << 15 | k >>> 17;
      k *= 0x1b873593;
      hash ^= k;
      hash = hash << 13 | hash >>> 19;
      hash *= 5;
      hash += 0xe6546b64;
    }

    if (remaining) {
      k ^= key.charCodeAt(i) & 0xffff;
      k *= 0xcc9e2d51;
      k = k << 15 | k >>> 17;
      k *= 0x1b873593;
      hash ^= k;
    }

    hash ^= len;
    hash ^= hash >>> 16;
    hash *= 0x85ebca6b;
    hash ^= hash >>> 13;
    hash *= 0xc2b2ae35;
    hash ^= hash >>> 16;
    return hash | 0;
  }
  /**
   * Given any object return back a hashcode
   * - If the key is undefined, null, false, NaN, infinite etc then it will be assigned a hash of 0.
   * - If it is a primitive such as string, number bigint it either take the numeric value, or the string value, and hash that.
   * - if it is a function, symbol or regex it hashes their string values.
   * - if it is a date, it uses the time value as the hash.
   * Otherwise
   * - If it has a hashCode function it will execute it, passing the key as the first and only argument. It will call this function again on its result.
   * - If it has a hashCode attribute it will call this function on it.
   * - If it can't do any of the above, it will assign a randomly generated hashcode, to the key using a hidden property.
   *
   * As with all hashmaps, there is a contractual equivalence between hashcode and equals methods,
   * in that any object that equals another, should produce the same hashcode.
   *
   * @param {*} key - the key to get the hash code from
   * @return {number} - the hash code.
   */

  function hashCodeFor(key) {
    var keyType = _typeof(key);

    switch (keyType) {
      case 'undefined':
        return 0;

      case 'boolean':
        return key ? 1 : 0;

      case 'string':
        return hash(key);

      case 'number':
        if (!Number.isFinite(key)) {
          return 0;
        }

        if (Number.isSafeInteger(key)) {
          return key | 0;
        }

        return hash(key.toString());

      case 'bigint':
      case 'symbol':
      case 'function':
        return hash(key.toString());

      case 'object':
      default:
        {
          if (key === null) {
            return 0;
          }

          if (key.hashCode) {
            if (isFunction(key.hashCode)) {
              return hashCodeFor(key.hashCode(key));
            }

            return hashCodeFor(key.hashCode);
          } // Regexes and Dates we treat like primitives.


          if (key instanceof Date) {
            return key.getTime();
          }

          if (key instanceof RegExp) {
            return hash(key.toString());
          } // Options we work on the values.


          if (key instanceof Option) {
            if (key.has) {
              return 31 * hashCodeFor(key.value);
            }

            return 0;
          } // Hash of Last Resort, ensure we don't consider any objects on the prototype chain.


          if (key.hasOwnProperty('_mootable_hashCode')) {
            // its our special number, but just in case someone has done something a bit weird with it.
            // Object equality at this point means that only this key instance can be used to fetch the value.
            return hashCodeFor(key._mootable_hashCode);
          }

          var hashCode = HASH_COUNTER++; // unenumerable, unwritable, unconfigurable

          Object.defineProperty(key, '_mootable_hashCode', {
            value: hashCode
          });
          return hashCode;
        }
    }
  }
  /**
   * an internal counter for managing unhashable objects.
   * @private
   * @ignore
   * @type {number}
   */

  var HASH_COUNTER = 0;
  /**
   * Given a key, produce an equals method that fits the hashcode contract.
   * - In almost all cases it will return with ECMASpec sameValueZero method. As is the case with native map, set and array.
   * - If it is a regex, it compares the type, and the string values.
   * - If it is a date, it compares the type, and the time values.
   * - If it is an option, it compares if they both have values, and then the values.
   * - If it has an equals function and that equals function when comapring 2 keys, return true. then it will use that.
   *   - The function can either be in the form <code>key.equals(other)</code>, or <code>key.equals(other,key)</code> in the case of static-like functions.
   *
   * The expectation and requirement is this key will always be the first argument to the method, the behaviour maybe unexpected if parameters are reversed.
   *
   * As with all hashmaps, there is a contractual equivalence between hashcode and equals methods,
   * in that any object that equals another, should produce the same hashcode.
   *
   * @param {*} key - the key to get the hash code from
   * @return {(function(*, *): boolean)} - an equals function for 2 keys.
   */

  function equalsFor(key) {
    // Regexes and Dates we treat like primitives.
    switch (_typeof(key)) {
      case 'object':
        if (key) {
          if (key instanceof RegExp) {
            return function (me, them) {
              if (them instanceof RegExp) {
                return me.toString() === them.toString();
              }

              return false;
            };
          } else if (key instanceof Date) {
            return function (me, them) {
              if (them instanceof Date) {
                return me.getTime() === them.getTime();
              }

              return false;
            };
          } else if (key instanceof Option) {
            if (key.has) {
              var valueEquals = equalsFor(key.value);
              return function (me, them) {
                if (them.has) {
                  return valueEquals(me.value, them.value);
                }

                return false;
              };
            } else {
              return function (me, them) {
                return !them.has;
              };
            }
          } else if (isFunction(key.equals)) {
            return function (me, them) {
              return me.equals(them, me);
            };
          }
        }

        return strictEquals;

      case 'number':
      case 'bigint':
        return sameValueZero;

      default:
        return strictEquals;
    }
  }
  /**
   * Given any object return back a hashcode
   * - If the key is undefined, null, false, NaN, infinite etc then it will be assigned a hash of 0.
   * - If it is a primitive such as string, number bigint it either take the numeric value, or the string value, and hash that.
   * - if it is a function, symbol or regex it hashes their string values.
   * - if it is a date, it uses the time value as the hash.
   * Otherwise
   * - If it has a hashCode function it will execute it, passing the key as the first and only argument. It will call this function again on its result.
   * - If it has a hashCode attribute it will call this function on it.
   * - If it can't do any of the above, it will assign a randomly generated hashcode, to the key using a hidden property.
   *
   * As with all hashmaps, there is a contractual equivalence between hashcode and equals methods,
   * in that any object that equals another, should produce the same hashcode.
   *
   * @param {*} key - the key to get the hash code from
   * @return {{hash: number, equals: function}} - the hash code and equals function.
   */

  function equalsAndHash(key) {
    var toSetOn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (toSetOn.hash) {
      if (toSetOn.equals) {
        return toSetOn;
      }

      toSetOn.equals = equalsFor(key);
      return toSetOn;
    } else if (toSetOn.equals) {
      toSetOn.hash = hashCodeFor(key);
      return toSetOn;
    }

    var keyType = _typeof(key);

    switch (keyType) {
      case 'undefined':
        toSetOn.hash = 0;
        toSetOn.equals = strictEquals;
        return toSetOn;

      case 'boolean':
        toSetOn.hash = key ? 1 : 0;
        toSetOn.equals = strictEquals;
        return toSetOn;

      case 'string':
        toSetOn.hash = hash(key);
        toSetOn.equals = strictEquals;
        return toSetOn;

      case 'number':
        if (!Number.isFinite(key)) {
          toSetOn.hash = 0;
          toSetOn.equals = sameValueZero;
          return toSetOn;
        }

        if (Number.isSafeInteger(key)) {
          toSetOn.hash = key | 0;
          toSetOn.equals = sameValueZero;
          return toSetOn;
        }

        toSetOn.hash = hash(key.toString());
        toSetOn.equals = sameValueZero;
        return toSetOn;

      case 'bigint':
        toSetOn.hash = hash(key.toString());
        toSetOn.equals = sameValueZero;
        return toSetOn;

      case 'symbol':
      case 'function':
        toSetOn.hash = hash(key.toString());
        toSetOn.equals = strictEquals;
        return toSetOn;

      case 'object':
      default:
        {
          if (key === null) {
            toSetOn.hash = 0;
            toSetOn.equals = strictEquals;
            return toSetOn;
          }

          toSetOn.equals = equalsFor(key);

          if (key.hashCode) {
            if (isFunction(key.hashCode)) {
              toSetOn.hash = hashCodeFor(key.hashCode(key));
              return toSetOn;
            } else {
              toSetOn.hash = hashCodeFor(key.hashCode);
              return toSetOn;
            }
          } // Regexes and Dates we treat like primitives.


          if (key instanceof Date) {
            toSetOn.hash = key.getTime();
            return toSetOn;
          }

          if (key instanceof RegExp) {
            toSetOn.hash = hash(key.toString());
            return toSetOn;
          } // Options we work on the values.


          if (key instanceof Option) {
            if (key.has) {
              toSetOn.hash = 31 * hashCodeFor(key.value);
              return toSetOn;
            }

            toSetOn.hash = 0;
            return toSetOn;
          } // Hash of Last Resort, ensure we don't consider any objects on the prototype chain.


          if (key.hasOwnProperty('_mootable_hashCode')) {
            // its our special number, but just in case someone has done something a bit weird with it.
            // Object equality at this point means that only this key instance can be used to fetch the value.
            toSetOn.hash = hashCodeFor(key._mootable_hashCode);
            return toSetOn;
          }

          var hashCode = HASH_COUNTER++; // unenumerable, unwritable, unconfigurable

          Object.defineProperty(key, '_mootable_hashCode', {
            value: hashCode
          });
          toSetOn.hash = hashCode;
          return toSetOn;
        }
    }
  }

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export({ target: 'Array', proto: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var iteratorClose = function (iterator) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return anObject(returnMethod.call(iterator)).value;
    }
  };

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
  };

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
  };

  var ITERATOR$1 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$1]
      || it['@@iterator']
      || iterators[classof(it)];
  };

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      result = new C();
      for (;!(step = next.call(iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = toLength(O.length);
      result = new C(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var ITERATOR = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: arrayFrom
  });

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && result instanceof Result) return result;
        } return new Result(false);
      }
      iterator = iterFn.call(iterable);
    }

    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator);
        throw error;
      }
      if (typeof result == 'object' && result && result instanceof Result) return result;
    } return new Result(false);
  };

  var anInstance = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    } return it;
  };

  var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$1[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var nativeMethod = NativePrototype[KEY];
      redefine(NativePrototype, KEY,
        KEY == 'add' ? function add(value) {
          nativeMethod.call(this, value === 0 ? 0 : value);
          return this;
        } : KEY == 'delete' ? function (key) {
          return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'get' ? function get(key) {
          return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
        } : KEY == 'has' ? function has(key) {
          return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
        } : function set(key, value) {
          nativeMethod.call(this, key === 0 ? 0 : key, value);
          return this;
        }
      );
    };

    var REPLACE = isForced_1(
      CONSTRUCTOR_NAME,
      typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
        new NativeConstructor().entries().next();
      }))
    );

    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      internalMetadata.REQUIRED = true;
    } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new NativeConstructor();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
          var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
          if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    _export({ global: true, forced: Constructor != NativeConstructor }, exported);

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var redefineAll = function (target, src, options) {
    for (var key in src) redefine(target, key, src[key], options);
    return target;
  };

  var defineProperty = objectDefineProperty.f;








  var fastKey = internalMetadata.fastKey;


  var setInternalState = internalState.set;
  var internalStateGetterFor = internalState.getterFor;

  var collectionStrong = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState(that, {
          type: CONSTRUCTOR_NAME,
          index: objectCreate(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!descriptors) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
        // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (descriptors) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        } return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (descriptors) state.size = 0;
          else that.size = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (descriptors) state.size--;
            else that.size--;
          } return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;
          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });

      redefineAll(C.prototype, IS_MAP ? {
        // 23.1.3.6 Map.prototype.get(key)
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // 23.1.3.9 Map.prototype.set(key, value)
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // 23.2.3.1 Set.prototype.add(value)
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (descriptors) defineProperty(C.prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return C;
    },
    setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last;
        // revert to the last existing entry
        while (entry && entry.removed) entry = entry.previous;
        // get next entry
        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return { value: undefined, done: true };
        }
        // return step by kind
        if (kind == 'keys') return { value: entry.key, done: false };
        if (kind == 'values') return { value: entry.value, done: false };
        return { value: [entry.key, entry.value], done: false };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // add [@@species], 23.1.2.2, 23.2.2.2
      setSpecies(CONSTRUCTOR_NAME);
    }
  };

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  collection('Map', function (init) {
    return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  // `Set` constructor
  // https://tc39.es/ecma262/#sec-set-objects
  collection('Set', function (init) {
    return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
  }, collectionStrong);

  /**
   * HashMap - HashMap Implementation for JavaScript
   * @namespace Mootable
   * @author Jack Moxley <https://github.com/jackmoxley>
   * @version 0.15.0
   * Homepage: https://github.com/mootable/hashmap
   */

  /**
   * The base class for the Map Implementations, and the Higher Order Functions for Maps
   * @example <caption>Create a MapIterable from a Map.</caption>
   * const myMap = new Map();
   * const mapIterable = MapIterable.from(myMap);
   * @example <caption>Create a MapIterable from a Set.</caption>
   * const mySet = new Set();
   * // sets wrapped in a map iterable must have a value of an Array matching [key,value]
   * mySet.add(["key", "value"]);
   * const mapIterable = MapIterable.from(mySet);
   * @example <caption>Create a MapIterable from an Array.</caption>
   * // arrays wrapped in a map iterable must have be an array of arrays matching [key,value]
   * const myArray = [["key", "value"]];
   * const mapIterable = MapIterable.from(myArray);
   * @example <caption>Create a MapIterable from an Iterable.</caption>
   * // iterables wrapped in a map iterable must yield arrays matching [key,value],
   * // any object that implements *[Symbol.iterator]() or [Symbol.iterator]()
   * // can be used as long as they follow that contract.
   * const myIterable = {
   *     *[Symbol.iterator]() {
   *         yield ["key1", "value1"];
   *         yield ["key2", "value2"];
   *         yield ["key3", "value3"];
   *     }
   * }
   * const mapIterable = MapIterable.from(myIterable);
   * @example <caption>Create a MapIterable from a Mootable HashMap.</caption>
   * // all Mootable HashMaps extend MapIterable, no need to wrap with the MapIterable.from() function.
   * const mapIterable = new HashMap();
   * @example <caption>Create a MapIterable from a Mootable LinkedHashMap.</caption>
   * // all Mootable LinkedHashMaps extend MapIterable, no need to wrap with the MapIterable.from() function.
   * const mapIterable = new LinkedHashMap();
   * @abstract
   */

  var MapIterable = /*#__PURE__*/function () {
    function MapIterable() {
      _classCallCheck(this, MapIterable);
    }

    _createClass(MapIterable, [{
      key: "size",
      get:
      /**
       * Returns the number of elements returned by this Map Iterable. If filter is used in the method chain, it is forced to iterate over all the elements, and will be slower. Otherwise even with concatenation, it just queries the base collection size.
       * @example <caption>Return the size of this mapIterable.</caption>
       * const myMap = new Map();
       * // sets 2 values, and replaces 1 of them
       * myMap.set("key1","val1").set("key2","val2").set("key2","val2a");
       * const mapIterable = MapIterable.from(myMap);
       * // returns 2
       * const theSize = mapIterable.size;
       * @returns {number} the total number of elements in this MapIterable
       */
      function get() {
        var accumulator = 0;

        var _iterator = _createForOfIteratorHelper(this),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) // jshint ignore:line
          {
            var i = _step.value;
            accumulator++;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return accumulator;
      }
      /**
       * Wraps any class that iterates with <code>[key,value]</code> pairs and provides higher order chained functions.
       *
       * @example <caption>Create a MapIterable from a Map.</caption>
       * const myMap = new Map();
       * const mapIterable = MapIterable.from(myMap);
       * @example <caption>Create a MapIterable from a Set.</caption>
       * const mySet = new Set();
       * // sets wrapped in a map iterable must have a value of an Array matching [key,value]
       * mySet.add(["key", "value"]);
       * const mapIterable = MapIterable.from(mySet);
       * @example <caption>Create a MapIterable from an Array.</caption>
       * // arrays wrapped in a map iterable must have be an array of arrays matching [key,value]
       * const myArray = [["key", "value"]];
       * const mapIterable = MapIterable.from(myArray);
       * @example <caption>Create a MapIterable from an Iterable.</caption>
       * // iterables wrapped in a map iterable must yield arrays matching [key,value],
       * // any object that implements *[Symbol.iterator]() or [Symbol.iterator]()
       * // can be used as long as they follow that contract.
       * const myIterable = {
       *     *[Symbol.iterator]() {
       *         yield ["key1", "value1"];
       *         yield ["key2", "value2"];
       *         yield ["key3", "value3"];
       *     }
       * }
       * const mapIterable = MapIterable.from(myIterable);
       * @example <caption>Create a MapIterable from a Mootable HashMap.</caption>
       * // all Mootable HashMaps extend MapIterable, no need to wrap with the MapIterable.from function. If you do it will just return it back.
       * const mapIterable = new HashMap();
       * @example <caption>Create a MapIterable from a Mootable LinkedHashMap.</caption>
       * // all Mootable LinkedHashMaps extend MapIterable, no need to wrap with the MapIterable.from() function.If you do it will just return it back.
       * const mapIterable = new LinkedHashMap();
       * @param {(Set.<Array.<key,value>>|Map|Array.<Array.<key,value>>|Iterator.<Array.<key,value>>|SetIterable.<Array.<key,value>>)} mapIterable the map to wrap
       * @return {MapIterable} the wrapped Map.
       */

    }, {
      key: "filter",
      value:
      /**
       * Test each element of the map to see if it matches and return
       *  - true if the key and value match.
       *  - false if it doesn't.
       * @example <caption>Only match keys divisible by 2</caption>
       * const myMatchPredicate = (value, key) => key % 2 === 0;
       * @example <caption>Only match values which are equal to another key in the map</caption>
       * const myMatchPredicate = (value, key, mapIterable) => mapIterable.has(value);
       * @example <caption>An alternative implementation, (but potentially slower, and assumes no undefined value)</caption>
       * const myMatchPredicate = (value, key, mapIterable) => mapIterable.indexOf(key) !== undefined;
       * @callback MapIterable#MatchesPredicate
       * @param {*} [value] - the entry value.
       * @param {*} [key] - the entry key
       * @param {MapIterable} [iterable] - the calling Map Iterable.
       * @return {boolean} a value that coerces to true if it matches, or to false otherwise.
       */

      /**
       * Test each element of the map and only include entries where the <code>MatchesPredicate</code> returns true.
       * @example <caption>Only match keys which are odd numbered.</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const filteredIterable = hashmap.filter((value,key) => key % 2 !== 0);
       * filteredIterable.forEach((value) => console.log(value));
       * // will log to the console:
       * // value1
       * // value3
       * @param {MapIterable#MatchesPredicate} [filterPredicate=(value, key, iterable) => true] - if the provided function returns <code>false</code>, that entry is excluded.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>filterPredicate</code>
       * @returns {MapIterable} an iterable that allows you to iterate key value pairs.
       */
      function filter() {
        var filterPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
        return new MapFilter(this, filterPredicate, ctx);
      }
      /**
       * For Each Function
       * A callback to execute on every <code>[key,value]</code> pair of this map iterable.
       * @example <caption>log the keys and values</caption>
       * const forEachFunction = (value, key) => console.log(key,value)
       * @callback MapIterable#ForEachCallback
       * @param {*} [value] - the entry value.
       * @param {*} [key] - the entry key
       * @param {MapIterable|SetIterable} [iterable] - the calling Map Iterable.
       */

      /**
       * Execute the provided callback on every <code>[key,value]</code> pair of this map iterable.
       * @example <caption>Log all the keys and values.</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * mapIterable.forEach((value) => console.log(key, value));
       * // will log to the console:
       * // 1 value1
       * // 2 value2
       * // 3 value3
       * @param {MapIterable#ForEachCallback} [forEachCallback=(value, key, iterable) => {}]
       * @param {*} [ctx=this] Value to use as <code>this</code> when executing <code>forEachCallback</code>
       * @returns {MapIterable} an iterable that allows you to iterate key value pairs.
       */

    }, {
      key: "forEach",
      value: function forEach() {
        var forEachCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        var _iterator2 = _createForOfIteratorHelper(this),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _slicedToArray(_step2.value, 2),
                key = _step2$value[0],
                value = _step2$value[1];

            forEachCallback.call(ctx, value, key, this);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return this;
      }
      /**
       * Fills the provided collector, or an array if none provided, and fills it with the values of this {@link MapIterable}. Then return the collector.
       * The original collector, with the exception of arrays, will be modified as we call functions directly against it.
       *
       * A collector will be resolved in this order:
       *  - {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}
       *    - a new array is created and passed back with the filled values, and the original is not changed.
       *  - Object with a function <code>.set</code>.
       *    - such as {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map Map}, {@link HashMap} or {@link LinkedHashMap}
       *    - it will call <code>set(key,value)</code> for every entry, if the value already exists for that key it is typically overridden. The original is modified.
       *  - Object with a function <code>.add</code>
       *    - such as {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set Set}
       *    - it will call <code>add([key,value])</code> for every entry, so that a <code>[key,value]</code> pair is added to the collection. The original is modified.
       *  - {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object Object}
       *    - It will call <code>obj[key] = value</code> for every entry, so that a property of <code>key</code> has a value of <code>value</code> set on it. The original is modified.
       *
       * @example <caption>Collect to a new {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const myArray = mapIterable.collect();
       * // myArray === [[1,'value1'],[2,'value2'],[3,'value3']]:
       * @example <caption>Collect with an empty existing {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const oldArray = [];
       * const newArray = mapIterable.collect(oldArray);
       * // newArray === [[1,'value1'],[2,'value2'],[3,'value3']]
       * // oldArray === []
       * @example <caption>Collect with an existing {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array} with values</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const oldArray = [[2,'someOtherValue']];
       * const newArray = mapIterable.collect(oldArray);
       * // newArray === [[2,'someOtherValue'],[1,'value1'],[2,'value2'],[3,'value3']]
       * // oldArray === [[2,'someOtherValue']]
       * @example <caption>Collect to an existing {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array} with values, modifying the old array.</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const array  = [[2,'someOtherValue']];
       * array.push(mapIterable.collect())
       * // array === [[2,'someOtherValue'],[1,'value1'],[2,'value2'],[3,'value3']]
       * @example <caption>Collect to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set Set}</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const oldSet = new Set().add('willRemain');
       * const newSet = mapIterable.collect(oldSet);
       * // oldSet === newSet === ['willRemain',[1,'value1'],[2,'value2'],[3,'value3']]
       * @example <caption>Collect to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map Map}</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const oldMap = new Map().set(2,'willBeOverwritten').set(5,'willRemain');
       * const newMap = mapIterable.collect(oldMap);
       * // oldMap === newMap === [[2,'value2'],[5,'willRemain'],[1,'value1'],[3,'value3']]
       * @example <caption>Collect to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object Object}</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const oldObject = {'1','willBeOverridden'};
       * const newObject = mapIterable.collect(oldObject);
       * // oldObject === newObject === {'1': 'value1', '2': 'value2', '3': 'value3'}
       * @param {(Array|Set|Map|HashMap|LinkedHashMap|Object)} [collector=[]] the collection to fill
       * @returns {(Array|Set|Map|HashMap|LinkedHashMap|Object)} The collector that was passed in.
       */

    }, {
      key: "collect",
      value: function collect() {
        var collector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (Array.isArray(collector)) {
          if (collector.length) {
            return collector.concat(Array.from(this));
          }

          return Array.from(this);
        } else if (isFunction(collector.set)) {
          var _iterator3 = _createForOfIteratorHelper(this),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _step3$value = _slicedToArray(_step3.value, 2),
                  key = _step3$value[0],
                  value = _step3$value[1];

              collector.set(key, value);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        } else if (isFunction(collector.add)) {
          var _iterator4 = _createForOfIteratorHelper(this),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var entry = _step4.value;
              collector.add(entry);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        } else {
          var _iterator5 = _createForOfIteratorHelper(this),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var _step5$value = _slicedToArray(_step5.value, 2),
                  _key = _step5$value[0],
                  _value = _step5$value[1];

              collector[_key] = _value;
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }

        return collector;
      }
      /**
       * Test to see if ALL elements pass the test implemented by the passed <code>MatchesPredicate</code>.
       * - if any element does not match, returns false
       * - if all elements match, returns true.
       * - if no elements match, returns false.
       * - if the iterable is empty, returns true. (irrespective of the predicate)
       * - if no predicate is provided, returns true.
       *
       * @example <caption>Do all values start with value. (yes)</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const everyResult = hashmap.every((value) => value.startsWith('value'));
       * // everyResult === true
       * @example <caption>Do all values start with value. (no)</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'doesntStart'],[3,'value3']]);
       * const everyResult = hashmap.every((value) => value.startsWith('value'));
       * // everyResult === false
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every|Array.every}
       * @param {MapIterable#MatchesPredicate} [everyPredicate=(value, key, iterable) => true] - if the provided function returns <code>false</code>, at any point the <code>every()</code> function returns false.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>everyPredicate</code>
       * @returns {boolean} true if all elements match, false if one or more elements fails to match.
       */

    }, {
      key: "every",
      value: function every() {
        var everyPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        var _iterator6 = _createForOfIteratorHelper(this),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _step6$value = _slicedToArray(_step6.value, 2),
                key = _step6$value[0],
                value = _step6$value[1];

            if (!everyPredicate.call(ctx, value, key, this)) {
              return false;
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        return true;
      }
      /**
       * Test to see if ANY element pass the test implemented by the passed <code>MatchesPredicate</code>.
       * - if any element matches, returns true.
       * - if all elements match returns true.
       * - if no elements match returns false.
       * - if the iterable is empty, returns true.
       * - if no predicate is provided, returns true.
       *
       * @example <caption>Do any values start with value. (yes all of them)</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const someResult = hashmap.some((value) => value.startsWith('value'));
       * // someResult === true
       * @example <caption>Do any values start with value. (yes 2 of them)</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'doesntStart'],[3,'value3']]);
       * const someResult = hashmap.some((value) => value.startsWith('value'));
       * // someResult === true
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some|Array.some}
       * @param {MapIterable#MatchesPredicate} [somePredicate=(value, key, iterable) => true] - the predicate to identify if we have a match.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>somePredicate</code>
       * @returns {boolean} - true if all elements match, false if one or more elements fails to match.
       */

    }, {
      key: "some",
      value: function some() {
        var somePredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        var _iterator7 = _createForOfIteratorHelper(this),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _step7$value = _slicedToArray(_step7.value, 2),
                key = _step7$value[0],
                value = _step7$value[1];

            if (somePredicate.call(ctx, value, key, this)) {
              return true;
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }

        return false;
      }
      /**
       * Find the first value in the map which passes the provided <code>MatchesPredicate</code>.
       * - return the first <code>value</code> from the <code>[key,value]</code> pair that matches
       * - if no elements match, it returns undefined.
       * - if no predicate is defined, will return the first value it finds.
       * @example <caption>Find a value</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const findResult = hashmap.find((value) => value.endsWith('ue2'));
       * // findResult === 'value2'
       * @example <caption>Can't find a value</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const findResult = hashmap.find((value) => value.startsWith('something'));
       * // findResult === undefined
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find|Array.find}
       * @param {MapIterable#MatchesPredicate} [findPredicate=(value, key, iterable) => value] - the predicate to identify if we have a match.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>findPredicate</code>
       * @returns {*} - the value of the element that matches.
       */

    }, {
      key: "find",
      value: function find() {
        var findPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        var _iterator8 = _createForOfIteratorHelper(this),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var _step8$value = _slicedToArray(_step8.value, 2),
                key = _step8$value[0],
                value = _step8$value[1];

            if (findPredicate.call(ctx, value, key, this)) {
              return value;
            }
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }

        return undefined;
      }
      /**
       * Find the first value in the key which passes the provided  <code>MatchesPredicate</code>.
       * - return the first <code>key</code> from the <code>[key,value]</code> pair that matches
       * - if no elements match, it returns undefined.
       * - if no predicate is defined, will return the first key it finds.
       *
       * @example <caption>Find a key</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const findIndexResult = hashmap.findIndex((value) => value.endsWith('ue2'));
       * // findIndexResult === 2
       * @example <caption>Can't find a key</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const findIndexResult = hashmap.findIndex((value) => value.startsWith('something'));
       * // findIndexResult === undefined
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex|Array.findIndex}
       * @param {MapIterable#MatchesPredicate} [findIndexPredicate=(value, key, iterable) => key] - the predicate to identify if we have a match.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>findIndexPredicate</code>
       * @returns {*} - the key of the element that matches..
       */

    }, {
      key: "findIndex",
      value: function findIndex() {
        var findIndexPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (value, key) {
          return key;
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        var _iterator9 = _createForOfIteratorHelper(this),
            _step9;

        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var _step9$value = _slicedToArray(_step9.value, 2),
                key = _step9$value[0],
                value = _step9$value[1];

            if (findIndexPredicate.call(ctx, value, key, this)) {
              return key;
            }
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }

        return undefined;
      }
      /**
       * Find the first key in the map whose value is <code>===</code> to the provided value.
       * - return the first <code>key</code> from the <code>[key,value]</code> pair that matches
       * - if no elements match, it returns undefined.
       * - it is legitimate for values to be null or undefined, and if set, will find a key.
       *
       * Values are not indexed, this is potentially an expensive operation.
       *
       * @example <caption>Find the key for a value</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const indexOfResult = hashmap.indexOf('value2');
       * // indexOfResult === 2
       * @example <caption>what is the key of a non existent value</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const indexOfResult = hashmap.indexOf('something');
       * // indexOfResult === undefined
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf|Array.indexOf}
       * @param {*} valueToCheck - the value we use to === against the entries value to identify if we have a match.
       * @returns {*} - the key of the element that matches..
       */

    }, {
      key: "indexOf",
      value: function indexOf(valueToCheck) {
        var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : equalsFor(valueToCheck);

        var _iterator10 = _createForOfIteratorHelper(this),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var _step10$value = _slicedToArray(_step10.value, 2),
                key = _step10$value[0],
                value = _step10$value[1];

            if (equals(valueToCheck, value)) {
              return key;
            }
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }

        return undefined;
      }
      /**
       * Does the map have this key.
       * If backed by a Map or HashMap, or in fact any collection that implements the <code>.has(key)</code> function, then it will utilize that, otherwise it will iterate across the collection.
       * - return true if the <code>key</code> matches a <code>[key,value]</code> pair.
       * - if no elements match, it returns false.
       * - it is legitimate for keys to be null or undefined, and if set, will return true
       *
       * Maps typically index keys, and so is generally a fast operation.
       * @example <caption>>Does this contain a key that is there</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const hasResult = hashmap.has(1);
       * // hasResult === true
       * @example <caption>Does this contain a key that isn't there</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const hasResult = hashmap.has(4);
       * // hasResult === false
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has|Map.has}
       * @param {*} key - the key we use to === against the entries key to identify if we have a match.
       * @returns {boolean} - if it holds the key or not.
       */

    }, {
      key: "has",
      value: function has(key) {
        var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : equalsFor(key);
        return this.some(function (_, otherKey) {
          return equals(otherKey, key);
        });
      }
      /**
       * Get a value from the map using this key.
       * If backed by a Map or HashMap, or in fact any collection that implements the <code>.get(key)</code> function, then it will utilize that, otherwise it will iterate across the collection.
       * - return the first <code>value</code> from the <code>[key,value]</code> pair that matches
       * - if no elements match, it returns undefined.
       * - it is legitimate for keys to be null or undefined, and if set, will find a value.
       * - if a map is earlier on in the chain, the value, will be mapped along the way.
       *   - However there is no way to reverse map the key, as we do the fetch, which means the key has to be the same as the one in the original collection.
       *
       * Maps typically index keys, and so is generally a fast operation.
       * @example <caption>>What is the value for a key</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const getResult = hashmap.get(1);
       * // getResult === 'value1'
       * @example <caption>What is the value for a key that isn't there</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const getResult = hashmap.get(4);
       * // getResult === undefined
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get|Map.get}
       * @param {*} key - the key we use to === against the entries key to identify if we have a match.
       * @returns {*} - the value of the element that matches.
       */

    }, {
      key: "get",
      value: function get(key) {
        var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : equalsFor(key);
        return this.find(function (value, otherKey) {
          return equals(key, otherKey);
        });
      }
      /**
       * Get a value from the map using this as an optional. This is effectively a combination of calling has and get at the same time.
       * If backed by a Map or HashMap, or in fact any collection that implements the <code>.optionalGet(key)</code> function, then it will utilize that, otherwise depending on the existence of has and get functions it may iterate across the collection.
       * - return the first <code>value</code> from the <code>[key,value]</code> pair that matches
       * - if no elements match, it returns undefined.
       * - it is legitimate for keys to be null or undefined, and if set, will find a value.
       * - if a map is earlier on in the chain, the value, will be mapped along the way.
       *   - However there is no way to reverse map the key, as we do the fetch, which means the key has to be the same as the one in the original collection.
       *
       * Maps typically index keys, and so is generally a fast operation.
       * @example <caption>>What is the value for a key</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const getResult = hashmap.get(1);
       * // getResult === 'value1'
       * @example <caption>What is the value for a key that isn't there</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const getResult = hashmap.get(4);
       * // getResult === undefined
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get|Map.get}
       * @param {*} key - the key we use to === against the entries key to identify if we have a match.
       * @returns {{has: boolean, value:*}} - an optional result.
       */

    }, {
      key: "optionalGet",
      value: function optionalGet(key) {
        var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : equalsFor(key);
        var found = false;
        var val = this.find(function (value, otherKey) {
          if (equals(key, otherKey)) {
            found = true;
            return true;
          }

          return false;
        });

        if (found) {
          return _some(val);
        }

        return none;
      }
      /**
       * Reduce Function
       * A callback to accumulate values from the Map Iterables <code>[key,value]</code> into a single value.
       * if initial value is <code>undefined</code> or <code>null</code>, unlike Array.reduce,
       * no error occurs, and it is imply passed as the accumulator value
       *
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce|Array.reduce}
       * @example <caption>add all the keys</caption>
       * const reduceFunction = (accumulator, value, key) => accumulator+key
       * @callback MapIterable#ReduceFunction
       * @param {*} [accumulator] - the value from the last execution of this function.
       * @param {*} [value] - the entry value.
       * @param {*} [key] - the entry key
       * @param {MapIterable} [iterable] - the calling Map Iterable.
       * @return {*} [accumulator] - the value to pass to the next time this function is called or the final return value.
       */

      /**
       * Iterate through the map iterable reducing it to a single value.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce|Array.reduce}
       * @example <caption>add all the keys</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const reduceResult = hashmap.reduce((accumulator, value, key) => accumulator+key, 0);
       * // reduceResult === 6
       * @example <caption>add all the values into one string in reverse order</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const reduceResult = hashmap.reduce((accumulator, value) => value+accumulator, '');
       * // reduceResult === 'value3value2value1'
       * @param {MapIterable#ReduceFunction} [reduceFunction=(accumulator, value, key, iterable) => true] - the predicate to identify if we have a match.
       * @param {*} [initialValue] the initial value to start on the reduce.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
       * @returns {*} - the final accumulated value.
       */

    }, {
      key: "reduce",
      value: function reduce() {
        var reduceFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (accumulator, value) {
          return value;
        };
        var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var ctx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
        var accumulator = initialValue;

        var _iterator11 = _createForOfIteratorHelper(this),
            _step11;

        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var _step11$value = _slicedToArray(_step11.value, 2),
                key = _step11$value[0],
                value = _step11$value[1];

            accumulator = reduceFunction.call(ctx, accumulator, value, key, this);
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }

        return accumulator;
      }
      /**
       * Map Function
       * A callback that takes a <code>[key,value]</code> and the current iterable, and returns a mapped value.
       * How this mapped value is used depends on the calling function.
       *  - mapKeys the key is transformed to the returned value
       *  - mapValues the value is transformed to the returned value
       *  - mapEntries the value should be of the form [key, value] and transforms each accordingly
       *  - map the MapIterable is turned into a SetIterable, and this returned value is the resultant entry.
       *
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|Array.map}
       * @example <caption>swap key and value</caption>
       * const mapEntriesFunction = ( value, key) => [value, key];
       * // the typical response is [key, value]
       * @callback MapIterable#MapFunction
       * @param {*} [value] - the entry value.
       * @param {*} [key] - the entry key
       * @param {MapIterable} [iterable] - the calling Map Iterable.
       * @return {*} [mappedValue] - the mapped value to return.
       */

      /**
       * For every entry, use the mapKeyFunction to transform the existing key.
       * This does not modify the original collection, and execution is deferred until it is fetched.
       * @example <caption>add one to all the keys and turn them into strings</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const mappedKeysIterable = hashmap.mapKeys((value, key) => 'k'+(key+1));
       * const mappedKeysArray = mappedKeysIterable.collect();
       * // mappedKeysArray === [['k2','value1'],['k3','value2'],['k4','value3']]
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|Array.map}
       * @param {MapIterable#MapFunction} [mapKeyFunction=(value, key, iterable) => key] - the function that transforms the key.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
       * @returns {MapIterable} an iterable that allows you to iterate key value pairs.
       */

    }, {
      key: "mapKeys",
      value: function mapKeys() {
        var mapKeyFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (value, key) {
          return key;
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
        return new MapKeyMapper(this, mapKeyFunction, ctx);
      }
      /**
       * For every entry, use the mapValueFunction to transform the existing value.
       * This does not modify the original collection, and execution is deferred until it is fetched.
       * @example <caption>prepend the values with the keys</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const mappedValuesIterable = hashmap.mapValues((value, key) => key + value);
       * const mappedValuesArray = mappedValuesIterable.collect();
       * // mappedValuesArray === [['1','1value1'],[2,'2value2'],[3,'3value3']]
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|Array.map}
       * @param {MapIterable#MapFunction} [mapValueFunction=(value, key, iterable) => value] - the function that transforms the value.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
       * @returns {MapIterable} an iterable that allows you to iterate key value pairs.
       */

    }, {
      key: "mapValues",
      value: function mapValues() {
        var mapValueFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (value) {
          return value;
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
        return new MapValueMapper(this, mapValueFunction, ctx);
      }
      /**
       * For every entry, use the mapEntryFunction to transform the existing value and existing key.
       * This does not modify the original collection, and execution is deferred until it is fetched.
       * - If one Function is provided
       *   - The function MUST return an array with at least 2 entries, the first entry is the key, the second is the value.
       *   - if the parameter is not an array or a function a TypeError is thrown.
       * - If an array of Functions is provided
       *   - The first function, (if defined), modifies the key. It needs only return the key. see {@link MapIterable#mapKeys mapKeys}
       *   - the second function, (if defined), modifies the value. see {@link MapIterable#mapValues mapValues}
       *   - if both the first and second values in the array are not functions a TypeError is thrown.
       * - In both cases will return {@link MapIterable}
       * @example <caption>swap the keys and the values</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const mapEntriesIterable = hashmap.mapEntries((value, key) => [value,key])
       * const mapEntriesArray = mapEntriesIterable.collect();
       * // mapEntriesArray === [['value1',1],['value2',2],['value3',3]]
       * @example <caption>swap the keys and the values with 2 functions</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const mapEntriesIterable = hashmap.mapEntries([(value) => value,(value, key) => key])
       * const mapEntriesArray = mapEntriesIterable.collect();
       * // mapEntriesArray === [['value1',1],['value2',2],['value3',3]]
       * @example <caption>modify just the keys</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * // Notice we are passing an array of one function.
       * const mapEntriesIterable = hashmap.mapEntries([(value, key) => value])
       * const mapEntriesArray = mapEntriesIterable.collect();
       * // mapEntriesArray === [['value1','value1'],['value2','value2'],['value2','value2']]
       * @example <caption>modify just the values</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * // Notice we are passing an array of two, but have only defined the last as a function.
       * const mapEntriesIterable = hashmap.mapEntries([undefined,(value, key) => key])
       * const mapEntriesArray = mapEntriesIterable.collect();
       * // mapEntriesArray === [[1,1],[2,2],[3,3]]
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|Array.map}
       * @param {MapIterable#MapFunction|Array.<MapIterable#MapFunction,MapIterable#MapFunction>} [mapEntryFunction=(value, key, iterable) => [key, value]] - the function that transforms the key and value.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
       * @returns {MapIterable} an iterable that allows you to iterate key value pairs.
       * @throws {TypeError} if at least one function is not provided.
       */

    }, {
      key: "mapEntries",
      value: function mapEntries() {
        var mapEntryFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (value, key) {
          return [key, value];
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        if (Array.isArray(mapEntryFunction)) {
          if (mapEntryFunction.length === 1 && isFunction(mapEntryFunction[0])) {
            // we are just mapping keys
            return this.mapKeys(mapEntryFunction[0], ctx);
          } else if (mapEntryFunction.length > 1) {
            if (isFunction(mapEntryFunction[0])) {
              if (isFunction(mapEntryFunction[1])) {
                // We don't chain, as we don't want the transformed value or key, to appear in either functions as arguments.
                var joinedFunction = function joinedFunction(value, key, iterable) {
                  return [mapEntryFunction[0].call(ctx, value, key, iterable), mapEntryFunction[1].call(ctx, value, key, iterable)];
                };

                return new MapEntryMapper(this, joinedFunction, this);
              } else {
                // we are just mapping keys
                return this.mapKeys(mapEntryFunction[0], ctx);
              }
            } else if (isFunction(mapEntryFunction[1])) {
              // we are just mapping values
              return this.mapValues(mapEntryFunction[1], ctx);
            }
          }
        } else if (isFunction(mapEntryFunction)) {
          return new MapEntryMapper(this, mapEntryFunction, ctx);
        } // we aren't mapping, lets give the developer a hint as to what the problem is


        throw new TypeError('MapIterable.mapEntries expects a function or an array of functions');
      }
      /**
       * For every entry, use the mapFunction to transform the existing value and existing key.
       * - If one Function is provided, we are transforming the map into a set.
       *   - The function can return any value. This is the equivalent of turning the MapIterable into a SetIterable.
       *   - if the parameter is not an array or a function a TypeError is thrown.
       *   - Will return a {@link SetIterable}
       * - If an array of Functions is provided, we are transforming the map into another map. see {@link MapIterable#mapEntries mapEntries}
       *   - The first function, (if defined), modifies the key. It needs only return the key. see {@link MapIterable#mapKeys mapKeys}
       *   - the second function, (if defined), modifies the value. see {@link MapIterable#mapKeys mapValues}
       *   - if both the first and second values in the array are not functions a TypeError is thrown.
       *   - Will return a {@link MapIterable}.
       * @example <caption>return just values</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const setIterable = hashmap.map((value, key) => value)
       * const mapArray = setIterable.collect();
       * // mapArray === ['value1','value2','value3']
       * // setIterable instanceof SetIterable
       * @example <caption>swap the keys and the values</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const setIterable = hashmap.map((value, key) => [value,key])
       * const mapArray = setIterable.collect();
       * // mapArray === [['value1',1],['value2',2],['value3',3]]
       * // setIterable instanceof SetIterable
       * @example <caption>swap the keys and the values with 2 functions</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const mapIterable = hashmap.map([(value) => value,(value, key) => key])
       * const mapArray = mapIterable.collect();
       * // mapArray === [['value1',1],['value2',2],['value3',3]]
       * // mapIterable instanceof MapIterable
       * @example <caption>modify just the keys</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * // Notice we are passing an array of one function.
       * const mapIterable = hashmap.map([(value, key) => value])
       * const mapArray = mapIterable.collect();
       * // mapArray === [['value1','value1'],['value2','value2'],['value2','value2']]
       * // mapIterable instanceof MapIterable
       * @example <caption>modify just the values</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * // Notice we are passing an array of two, but have only defined the last as a function.
       * const mapIterable = hashmap.map([undefined,(value, key) => key])
       * const mapArray = mapIterable.collect();
       * // mapArray === [[1,1],[2,2],[3,3]]
       * // mapIterable instanceof MapIterable
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|Array.map}
       * @param {MapIterable#MapFunction|Array.<MapIterable#MapFunction,MapIterable#MapFunction>} [mapFunction=(value, key, iterable) => [key, value]] - the function that transforms the key and value.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
       * @returns {SetIterable|MapIterable} an iterable that allows you to iterate single entries in a set, or an iterable that allows you to iterate a map.
       * @throws {TypeError} if at least one function is not provided.
       */

    }, {
      key: "map",
      value: function map() {
        var mapFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (value, key) {
          return [key, value];
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        if (Array.isArray(mapFunction)) {
          return this.mapEntries(mapFunction, ctx);
        }

        if (isFunction(mapFunction)) {
          return new MapMapper(this, mapFunction, ctx);
        }

        throw new TypeError('MapIterable.map expects a function or an array of functions');
      }
      /**
       * Return a SetIterable or MapIterable which is a concatenation of this and the provided iterable.
       * - If the provided value is a MapIterable or a Map then the returned iterable is a MapIterable.
       * - Otherwise since we have no idea if it will return key value pairs we return a SetIterable.
       *   - If you know the container stores [key,value] pairs and want to return a MapIterable, use {@link MapIterable#concatMap concatMap}
       * This is based on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat Array.concat} it does not modify the original iterables, and returns a new one.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat|Array.concat}
       * @example <caption>concatenate 2 maps</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const hashmap2 = new LinkedHashMap([[1,'value1a'],[2,'value2a'],[3,'value3a']]);
       * const mapIterable = hashmap.concat(hashmap2);
       * // Notice how the keys are repeated, any unique constraints are gone.
       * // mapIterable === [[1,'value1'],[2,'value2'],[3,'value3'],[1,'value1a'],[2,'value2a'],[3,'value3a']]
       * // mapIterable instanceof MapIterable
       * @example <caption>concatenate an array</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const array = ['hello','world'];
       * const setIterable = hashmap.concat(array);
       * // Notice how we have key value pairs and strings mixed.
       * // setIterable === [[1,'value1'],[2,'value2'],[3,'value3'],'hello','world']
       * // setIterable instanceof SetIterable
       * @param {(Array|Set|Map|HashMap|LinkedHashMap)} otherIterable the iterable to concat to this one.
       * @return {SetIterable|MapIterable} the new iterable to return
       */

    }, {
      key: "concat",
      value: function concat(otherIterable) {
        if (otherIterable) {
          if (otherIterable instanceof MapIterable || otherIterable instanceof Map) {
            return this.concatMap(otherIterable);
          }

          return new SetConcat(this, SetIterable.from(otherIterable));
        }

        return this;
      }
      /**
       * Return a MapIterable which is a concatenation of this and the provided iterable.
       * - If the provided value is a MapIterable or a Map then the returned iterable is a MapIterable.
       * - Otherwise the iterable MUST return [key,value] pairs
       *
       * @example <caption>concatenate 2 maps</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const hashmap2 = new LinkedHashMap([[1,'value1a'],[2,'value2a'],[3,'value3a']]);
       * const mapIterable = hashmap.concatMap(hashmap2);
       * // Notice how the keys are repeated, any unique constraints are gone.
       * // mapIterable === [[1,'value1'],[2,'value2'],[3,'value3'],[1,'value1a'],[2,'value2a'],[3,'value3a']]
       * // mapIterable instanceof MapIterable
       * @example <caption>concatenate an array</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const array = [[1,'hello'],[3,'world']];
       * const mapIterable = hashmap.concatMap(array);
       * // Notice how everything is a key value pair.
       * // mapIterable === [[1,'value1'],[2,'value2'],[3,'value3'],[1,'hello'],[3,'world']]
       * // mapIterable instanceof MapIterable
       * @param {(Array.<Array.<key,value>>|Set.<Array.<key,value>>|Map|HashMap|LinkedHashMap)} otherMapIterable the iterable to concat to this one, has to return [key,value] pairs
       * @return {MapIterable} the new iterable to return
       */

    }, {
      key: "concatMap",
      value: function concatMap(otherMapIterable) {
        if (otherMapIterable) {
          return new MapConcat(this, MapIterable.from(otherMapIterable));
        }

        return this;
      }
      /**
       * Return a SetIterable which is just the keys in this map.
       * @example <caption>collect all the keys</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const keysIterable = hashmap.keys();
       * // keysIterable instanceof SetIterable
       * const keys = keysIterable.collect();
       * // keys === [1,2,3]
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys keys}
       * @return {SetIterable} the keys as a set iterable.
       */

    }, {
      key: "keys",
      value: function keys() {
        return new EntryToKeyMapper(this);
      }
      /**
       * Return a SetIterable which is just the values in this map.
       * @example <caption>collect all the values</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const valuesIterable = hashmap.values();
       * // valuesIterable instanceof SetIterable
       * const values = valuesIterable.collect();
       * // values === ['value1','value2','value3']
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values values}
       * @return {SetIterable} the values as a set iterable.
       */

    }, {
      key: "values",
      value: function values() {
        return new EntryToValueMapper(this);
      }
      /**
       * Return a MapIterable which is the entries in this map, this is just a short hand for the [Symbol.Iterator]() implementation
       * @example <caption>collect all the entries</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const entriesIterable = hashmap.entries();
       * // entriesIterable instanceof MapIterable
       * const entries = entriesIterable.collect();
       * // entries === [[1,'value1'],[2,'value2'],[3,'value3']]
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries entries}
       * @return {MapIterable}
       */

    }, {
      key: "entries",
      value: function entries() {
        return this;
      }
    }], [{
      key: "from",
      value: function from(mapIterable) {
        if (mapIterable instanceof MapIterable) {
          return mapIterable;
        }

        return new MapIterableWrapper(mapIterable);
      }
    }]);

    return MapIterable;
  }();
  /**
   * The base class for the Set Implementations, and the Higher Order Functions for Sets, many Map functions result in SetIterables
   *
   * @example <caption>Create a SetIterable from a Map.</caption>
   * const myMap = new Map();
   * // iterating over a setIterable backed by a map, will yield [key,value] arrays.
   * const setIterable = SetIterable.from(myMap);
   * @example <caption>Create a SetIterable from a Set.</caption>
   * const mySet = new Set();
   * const setIterable = SetIterable.from(mySet);
   * @example <caption>Create a SetIterable from an Array.</caption>
   * const setIterable = SetIterable.from([]);
   * @example <caption>Create a SetIterable from an Iterable.</caption>
   * // any object that implements *[Symbol.iterator]() or [Symbol.iterator]() can be used.
   * const myIterable = {
   *     *[Symbol.iterator]() {
   *         yield "value1";
   *         yield "value2";
   *         yield "value3";
   *     }
   * }
   * const setIterable = SetIterable.from(myIterable);
   * @example <caption>Create a SetIterable from a Mootable HashMap.</caption>
   * // iterating over a SetIterable backed by a map, will yield [key,value] arrays.
   * const setIterable =  SetIterable.from(new HashMap());
   * @example <caption>Create a SetIterable from a Mootable LinkedHashMap.</caption>
   * // iterating over a SetIterable backed by a map, will yield [key,value] arrays.
   * const setIterable =  SetIterable.from(new LinkedHashMap());
   * @abstract
   */

  var SetIterable = /*#__PURE__*/function () {
    function SetIterable() {
      _classCallCheck(this, SetIterable);
    }

    _createClass(SetIterable, [{
      key: "size",
      get:
      /**
       * Returns the number of elements returned by this Set Iterable. If filter is used in the method chain, it is forced to iterate over all the elements, and will be slower. Otherwise even with concatenation, it just queries the base collection size.
       * @returns {number}
       */
      function get() {
        var accumulator = 0;

        var _iterator12 = _createForOfIteratorHelper(this),
            _step12;

        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) // jshint ignore:line
          {
            var i = _step12.value;
            accumulator++;
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }

        return accumulator;
      }
      /**
       * Wraps any class that iterates any value and provides higher order chained functions.
         * @example <caption>Create a SetIterable from a Map.</caption>
       * const myMap = new Map();
       * // iterating over a set, will yield [key,value] arrays.
       * const setIterable = SetIterable.from(myMap);
       * @example <caption>Create a SetIterable from a Set.</caption>
       * const mySet = new Set();
       * const setIterable = SetIterable.from(mySet);
       * @example <caption>Create a SetIterable from an Array.</caption>
       * const setIterable = SetIterable.from([]);
       * @example <caption>Create a SetIterable from an Iterable.</caption>
       * // any object that implements *[Symbol.iterator]() or [Symbol.iterator]() can be used.
       * const myIterable = {
       *     *[Symbol.iterator]() {
       *         yield "value1";
       *         yield "value2";
       *         yield "value3";
       *     }
       * }
       * const setIterable = SetIterable.from(myIterable);
       * @example <caption>Create a SetIterable from a Mootable HashMap.</caption>
       * // iterating over a SetIterable backed by a map, will yield [key,value] arrays.
       * const setIterable =  SetIterable.from(new HashMap());
       * @example <caption>Create a SetIterable from a Mootable LinkedHashMap.</caption>
       * // iterating over a SetIterable backed by a map, will yield [key,value] arrays.
       * const setIterable =  SetIterable.from(new LinkedHashMap());
       * @param {(Set|Map|Array|Iterator)} setIterable the set to wrap
       * @return {SetIterable} the wrapped Set.
       */

    }, {
      key: "filter",
      value:
      /**
       * Test each element of the set and only include entries where the <code>MatchesPredicate</code> returns true.
       * @example <caption>Only match values which are odd numbered.</caption>
       * const hashmap = SetIterable.from([1,2,3]);
       * const filteredIterable = hashmap.filter((value) => value % 2 !== 0);
       * filteredIterable.forEach((value) => console.log(value));
       * // will log to the console:
       * // 1
       * // 3
       * @param {MapIterable#MatchesPredicate} [filterPredicate=(value, key, setIterable) => true] - if the provided function returns <code>false</code>, that entry is excluded.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>filterPredicate</code>
       * @returns {SetIterable} - an iterable that allows you to iterate values.
       */
      function filter() {
        var filterPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
        return new SetFilter(this, filterPredicate, ctx);
      }
      /**
       * Execute the provided callback on every <code>value</code> of this set iterable.
       * @example <caption>Log all the  values.</caption>
       * const set = new Set().add('value1').add('value2').add('value3');
       * const setIterable = SetIterable.from(set);
       * mapIterable.forEach((value) => console.log(value));
       * // will log to the console:
       * // value1
       * // value2
       * // value3
       * @param {MapIterable#ForEachCallback} [forEachCallback=(value, key, iterable) => {}]
       * @param {*} [ctx=this] Value to use as <code>this</code> when executing <code>forEachCallback</code>
       * @returns {SetIterable} - an iterable that allows you to iterate on values.
       */

    }, {
      key: "forEach",
      value: function forEach() {
        var forEachCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        var _iterator13 = _createForOfIteratorHelper(this),
            _step13;

        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var value = _step13.value;
            forEachCallback.call(ctx, value, value, this);
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
      }
      /**
       * Fills the provided collector, or an array if none provided, and fills it with the values of this {@link MapIterable}. Then return the collector.
       * The original collector, with the exception of arrays, will be modified as we call functions directly against it.
       *
       * A collector will be resolved in this order:
       *  - {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}
       *    - a new array is created and passed back with the filled values, and the original is not changed.
       *  - Object with a function <code>.set</code>.
       *    - such as {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map Map}, {@link HashMap} or {@link LinkedHashMap}
       *    - it will call <code>set(key,value)</code> for every entry, if the value already exists for that key it is typically overridden. The original is modified.
       *  - Object with a function <code>.add</code>
       *    - such as {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set Set}
       *    - it will call <code>add([key,value])</code> for every entry, so that a <code>[key,value]</code> pair is added to the collection. The original is modified.
       *  - {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object Object}
       *    - It will call <code>obj[key] = value</code> for every entry, so that a property of <code>key</code> has a value of <code>value</code> set on it. The original is modified.
       *
       * @example <caption>Collect to a new {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const myArray = mapIterable.collect();
       * // myArray === [[1,'value1'],[2,'value2'],[3,'value3']]:
       * @example <caption>Collect with an empty existing {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const oldArray = [];
       * const newArray = mapIterable.collect(oldArray);
       * // newArray === [[1,'value1'],[2,'value2'],[3,'value3']]
       * // oldArray === []
       * @example <caption>Collect with an existing {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array} with values</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const oldArray = [[2,'someOtherValue']];
       * const newArray = mapIterable.collect(oldArray);
       * // newArray === [[2,'someOtherValue'],[1,'value1'],[2,'value2'],[3,'value3']]
       * // oldArray === [[2,'someOtherValue']]
       * @example <caption>Collect to an existing {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array} with values, modifying the old array.</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const array  = [[2,'someOtherValue']];
       * array.push(mapIterable.collect())
       * // array === [[2,'someOtherValue'],[1,'value1'],[2,'value2'],[3,'value3']]
       * @example <caption>Collect to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set Set}</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const oldSet = new Set().add('willRemain');
       * const newSet = mapIterable.collect(oldSet);
       * // oldSet === newSet === ['willRemain',[1,'value1'],[2,'value2'],[3,'value3']]
       * @example <caption>Collect to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map Map}</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const oldMap = new Map().set(2,'willBeOverwritten').set(5,'willRemain');
       * const newMap = mapIterable.collect(oldMap);
       * // oldMap === newMap === [[2,'value2'],[5,'willRemain'],[1,'value1'],[3,'value3']]
       * @example <caption>Collect to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object Object}</caption>
       * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const oldObject = {'1','willBeOverridden'};
       * const newObject = mapIterable.collect(oldObject);
       * // oldObject === newObject === {'1': 'value1', '2': 'value2', '3': 'value3'}
       * @param {(Array|Set|Map|HashMap|LinkedHashMap|Object)} [collector=[]] the collection to fill
       * @returns {(Array|Set|Map|HashMap|LinkedHashMap|Object)} The collector that was passed in.
       */

    }, {
      key: "collect",
      value: function collect() {
        var collector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (Array.isArray(collector)) {
          if (collector.length) {
            return collector.concat(Array.from(this));
          }

          return Array.from(this);
        } else if (isFunction(collector.add)) {
          var _iterator14 = _createForOfIteratorHelper(this),
              _step14;

          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var entry = _step14.value;
              collector.add(entry);
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }
        } else if (isFunction(collector.set)) {
          var _iterator15 = _createForOfIteratorHelper(this),
              _step15;

          try {
            for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
              var _entry = _step15.value;
              collector.set(_entry);
            }
          } catch (err) {
            _iterator15.e(err);
          } finally {
            _iterator15.f();
          }
        }

        return collector;
      }
      /**
       * Iterate through the set iterable reducing it to a single value.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce|Array.reduce}
       * @example <caption>add all the values</caption>
       * const set = new Set().add(1).add(2).add(3);
       * const setIterable = SetIterable.from(set);
       * const reduceResult = setIterable.reduce((accumulator, value) => accumulator+value, 0);
       * // reduceResult === 6
       * @example <caption>add all the values into one string in reverse order</caption>
       * const set = new Set().add('value1').add('value2').add('value3');
       * const setIterable = SetIterable.from(set);
       * const reduceResult = setIterable.reduce((accumulator, value) => value+accumulator, '');
       * // reduceResult === 'value3value2value1'
       * @param {MapIterable#ReduceFunction} [reduceFunction=(accumulator, value, key, iterable) => true] - the predicate to identify if we have a match.
       * @param {*} [initialValue] the initial value to start on the reduce.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
       * @returns {*} - the final accumulated value.
       */

    }, {
      key: "reduce",
      value: function reduce() {
        var reduceFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (accumulator, value) {
          return value;
        };
        var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var ctx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
        var accumulator = initialValue;

        var _iterator16 = _createForOfIteratorHelper(this),
            _step16;

        try {
          for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
            var value = _step16.value;
            accumulator = reduceFunction.call(ctx, accumulator, value, value, this);
          }
        } catch (err) {
          _iterator16.e(err);
        } finally {
          _iterator16.f();
        }

        return accumulator;
      }
      /**
       * Test to see if ALL values pass the test implemented by the passed <code>MatchesPredicate</code>.
       * - if any value does not match, returns false
       * - if all values match, returns true.
       * - if no values match, returns false.
       * - if the iterable is empty, returns true. (irrespective of the predicate)
       * - if no predicate is provided, returns true.
       *
       * @example <caption>Do all values start with value. (yes)</caption>
       * const set = new Set().add('value1').add('value2').add('value3');
       * const setIterable = SetIterable.from(set);
       * const everyResult = setIterable.every((value) => value.startsWith('value'));
       * // everyResult === true
       * @example <caption>Do all values start with value. (no)</caption>
       * const set = new Set().add('value1').add('doesntStart').add('value3');
       * const setIterable = SetIterable.from(set);
       * const everyResult = setIterable.every((value) => value.startsWith('value'));
       * // everyResult === false
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every|Array.every}
       * @param {MapIterable#MatchesPredicate} [everyPredicate=(value, key, iterable) => true] - if the provided function returns <code>false</code>, at any point the <code>every()</code> function returns false.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>everyPredicate</code>
       * @returns {boolean} true if all elements match, false if one or more elements fails to match.
       */

    }, {
      key: "every",
      value: function every() {
        var everyPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        var _iterator17 = _createForOfIteratorHelper(this),
            _step17;

        try {
          for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
            var value = _step17.value;

            if (!everyPredicate.call(ctx, value, value, this)) {
              return false;
            }
          }
        } catch (err) {
          _iterator17.e(err);
        } finally {
          _iterator17.f();
        }

        return true;
      }
      /**
       * Test to see if ANY value pass the test implemented by the passed <code>MatchesPredicate</code>.
       * - if any value matches, returns true.
       * - if all values match returns true.
       * - if no values match returns false.
       * - if the iterable is empty, returns true.
       * - if no predicate is provided, returns true.
       *
       * @example <caption>Do any values start with value. (yes all of them)</caption>
       * const set = new Set().add('value1').add('value2').add('value3');
       * const setIterable = SetIterable.from(set);
       * const someResult = setIterable.some((value) => value.startsWith('value'));
       * // someResult === true
       * @example <caption>Do any values start with value. (yes 2 of them)</caption>
       * const set = new Set().add('value1').add('doesntStart').add('value3');
       * const setIterable = SetIterable.from(set);
       * const someResult = setIterable.some((value) => value.startsWith('value'));
       * // someResult === true
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some|Array.some}
       * @param {MapIterable#MatchesPredicate} [somePredicate=(value, key, iterable) => true] - the predicate to identify if we have a match.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>somePredicate</code>
       * @returns {boolean} - true if all values match, false if one or more values fails to match.
       */

    }, {
      key: "some",
      value: function some() {
        var somePredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        var _iterator18 = _createForOfIteratorHelper(this),
            _step18;

        try {
          for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
            var value = _step18.value;

            if (somePredicate.call(ctx, value, this)) {
              return true;
            }
          }
        } catch (err) {
          _iterator18.e(err);
        } finally {
          _iterator18.f();
        }

        return false;
      }
      /**
       * Does the set have this value.
       * If backed by a Set, or in fact any collection that implements the <code>.has(key)</code> function, then it will utilize that, otherwise it will iterate across the collection.
       * If backed by a Map or HashMap, then it will match [key,value] pairs not keys.
       * - return true if the <code>value</code> matches.
       * - if no values match, it returns false.
       * - it is legitimate for values to be null or undefined, and if added, will return true
       *
       * Sets typically index values, and so is generally a fast operation. However if it backed by a map, then this will be slow as it will be matching entries not keys.
       * @example <caption>Does this contain a value that is there</caption>
       * const set = new Set().add('value1').add('value2').add('value3');
       * const setIterable = SetIterable.from(set);
       * const hasResult = setIterable.has('value2');
       * // hasResult === true
       * @example <caption>Does this contain a value that isn't there</caption>
       * const set = new Set().add(1).add(2).add(3);
       * const setIterable = SetIterable.from(set);
       * const hasResult = setIterable.has(4);
       * // hasResult === false
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has|Map.has}
       * @param {*} value - the value we use to === against the entries key to identify if we have a match.
       * @param {function} [equals] - if using an array, marks how deep we go through to test equality.
       * @returns {boolean} - if it holds the key or not.
       */

    }, {
      key: "has",
      value: function has(value) {
        var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : equalsFor(value);
        return this.some(function (otherValue) {
          return equals(otherValue, value);
        });
      }
      /**
       * Find the first value in the set which passes the provided <code>MatchesPredicate</code>.
       * - return the first <code>value</code> that matches
       * - if no value matches, it returns undefined.
       * - if no predicate is defined, will return the first value it finds.
       * @example <caption>Find a value</caption>
       * const set = new Set().add('value1').add('value2').add('value3');
       * const setIterable = SetIterable.from(set);
       * const findResult = setIterable.find((value) => value.endsWith('ue2'));
       * // findResult === 'value2'
       * @example <caption>Can't find a value</caption>
       * const set = new Set().add('value1').add('value2').add('value3');
       * const setIterable = SetIterable.from(set);
       * const findResult = setIterable.find((value) => value.startsWith('something'));
       * // findResult === undefined
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find|Array.find}
       * @param {MapIterable#MatchesPredicate} [findPredicate=(value, key, iterable) => value] - the predicate to identify if we have a match.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>findPredicate</code>
       * @returns {*} - the value that matches.
       */

    }, {
      key: "find",
      value: function find() {
        var findPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        var _iterator19 = _createForOfIteratorHelper(this),
            _step19;

        try {
          for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
            var value = _step19.value;

            if (findPredicate.call(ctx, value, value, this)) {
              return value;
            }
          }
        } catch (err) {
          _iterator19.e(err);
        } finally {
          _iterator19.f();
        }

        return undefined;
      }
      /**
       * For every entry, use the mapFunction to transform the existing value.
       *   - Will return a {@link SetIterable}
       * @example <caption>return just values with 'ish' on the end</caption>
       * const set = new Set().add('value1').add('value2').add('value3');
       * const setIterable = SetIterable.from(set);
       * const mapped = setIterable.map((value, key) => value+'ish');
       * const mapArray = mapped.collect();
       * // mapArray === ['value1ish','value2ish','value3ish']
       * // mapped instanceof SetIterable
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|Array.map}
       * @param {MapIterable#MapFunction} [mapFunction=(value, key, iterable) =>value] - the function that transforms the value.
       * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
       * @returns {SetIterable} an iterable that allows you to iterate single entries in the mapped set
       */

    }, {
      key: "map",
      value: function map() {
        var mapFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (value) {
          return value;
        };
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
        return new SetMapper(this, mapFunction, ctx);
      }
      /**
       * Return a SetIterable which is a concatenation of this and the provided iterable.
       * This is based on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat Array.concat} it does not modify the original iterables, and returns a new one.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat|Array.concat}
       * @example <caption>concatenate 2 sets</caption>
       * const set1 = new Set(['value1','value2','value3']);
       * const set2 = new Set(['value1a','value2a','value3a']);
       * const setIterable = SetIterable.from(set1).concat(set2);
       * // Notice how any unique constraints are gone.
       * // setIterable === ['value1','value2','value3','value1a','value2a'],'value3a']
       * // setIterable instanceof SetIterable
       * @example <caption>concatenate an array</caption>
       * const set = new Set(['value1','value2','value3']);
       * const array = ['hello','world'];
       * const setIterable = SetIterable.from(set).concat(array);
       * // setIterable === ['value1','value2','value3','hello','world']
       * // setIterable instanceof SetIterable
       * @param {(Array|Set|Map|HashMap|LinkedHashMap)} otherIterable the iterable to concat to this one.
       * @return {SetIterable} the new iterable to return
       */

    }, {
      key: "concat",
      value: function concat() {
        var otherIterable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return new SetConcat(this, SetIterable.from(otherIterable));
      }
      /**
       * Return a SetIterable which is basically this SetIterable.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values values}
       * @return {SetIterable} the values as a set iterable.
       */

    }, {
      key: "values",
      value: function values() {
        return this;
      }
      /**
       * Return a SetIterable which is basically this SetIterable.
       * Behaves the same way as the JS Set Object in that it just returns values
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys keys}
       * @return {SetIterable} the values as a set iterable.
       */

    }, {
      key: "keys",
      value: function keys() {
        return this;
      }
      /**
       * Return a MapIterable which are a value pair, returns [value,value]
       * @example <caption>collect all the entries</caption>
       * const set = new Set([1,2,3]);
       * const entriesIterable = SetIterable.from(set).entries();
       * // entriesIterable instanceof MapIterable
       * const entries = entriesIterable.collect();
       * // entries === [[1,1],[2,'2],[3,3]]
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries entries}
       * @return {MapIterable}
       */

    }, {
      key: "entries",
      value: function entries() {
        return MapIterable.from(this.map(function (value) {
          return [value, value];
        }));
      }
    }], [{
      key: "from",
      value: function from(setIterable) {
        if (setIterable instanceof SetIterable) {
          return setIterable;
        }

        return new SetIterableWrapper(setIterable);
      }
    }]);

    return SetIterable;
  }();
  /**
   * @extends SetIterable
   * @private
   */

  var SetIterableWrapper = /*#__PURE__*/function (_SetIterable) {
    _inherits(SetIterableWrapper, _SetIterable);

    var _super = _createSuper(SetIterableWrapper);

    function SetIterableWrapper(iterable, ctx) {
      var _this;

      _classCallCheck(this, SetIterableWrapper);

      _this = _super.call(this);
      _this.iterable = iterable;
      _this.ctx = ctx ? ctx : iterable;
      return _this;
    }

    _createClass(SetIterableWrapper, [{
      key: "size",
      get: function get() {
        return this.iterable.length ? this.iterable.length : this.iterable.size ? this.iterable.size : _get(_getPrototypeOf(SetIterableWrapper.prototype), "size", this);
      }
    }, {
      key: "has",
      value: function has(value) {
        var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : equalsFor(value);

        // if is a map iterable then we want to return the entry not the key. otherwise we can shortcut
        if (this.iterable instanceof Set || this.iterable instanceof SetIterable) {
          return this.iterable.has(value, equals);
        }

        return _get(_getPrototypeOf(SetIterableWrapper.prototype), "has", this).call(this, value, equals);
      }
    }, {
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        return regeneratorRuntime.wrap(function value$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.delegateYield(this.iterable, "t0", 1);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, value, this);
      })
    }]);

    return SetIterableWrapper;
  }(SetIterable);
  /**
   * @extends MapIterable
   * @private
   */


  var MapIterableWrapper = /*#__PURE__*/function (_MapIterable) {
    _inherits(MapIterableWrapper, _MapIterable);

    var _super2 = _createSuper(MapIterableWrapper);

    function MapIterableWrapper(iterable, ctx) {
      var _this2;

      _classCallCheck(this, MapIterableWrapper);

      _this2 = _super2.call(this);
      _this2.iterable = iterable;
      _this2.ctx = ctx ? ctx : iterable;
      return _this2;
    }

    _createClass(MapIterableWrapper, [{
      key: "size",
      get: function get() {
        return this.iterable.length ? this.iterable.length : this.iterable.size ? this.iterable.size : _get(_getPrototypeOf(MapIterableWrapper.prototype), "size", this);
      }
    }, {
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        return regeneratorRuntime.wrap(function value$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.delegateYield(this.iterable, "t0", 1);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, value, this);
      })
    }, {
      key: "has",
      value: function has(key) {
        return this.optionalGet(key).has;
      }
    }, {
      key: "optionalGet",
      value: function optionalGet(key) {
        if (isFunction(this.iterable.optionalGet)) {
          return this.iterable.optionalGet(key);
        }

        if (isFunction(this.iterable.has)) {
          if (this.iterable.has(key)) {
            if (isFunction(this.iterable.get)) {
              _some(this.iterable.get(key));
            }

            return _some(_get(_getPrototypeOf(MapIterableWrapper.prototype), "get", this).call(this, key));
          }

          return none;
        }

        return _get(_getPrototypeOf(MapIterableWrapper.prototype), "optionalGet", this).call(this, key);
      }
    }, {
      key: "get",
      value: function get(key) {
        return this.optionalGet(key).value;
      }
    }]);

    return MapIterableWrapper;
  }(MapIterable);
  /**
   * @extends MapIterableWrapper
   * @private
   */


  var MapFilter = /*#__PURE__*/function (_MapIterableWrapper) {
    _inherits(MapFilter, _MapIterableWrapper);

    var _super3 = _createSuper(MapFilter);

    function MapFilter(iterable, filterPredicate, ctx) {
      var _this3;

      _classCallCheck(this, MapFilter);

      _this3 = _super3.call(this, iterable, ctx);
      _this3.filterPredicate = filterPredicate;
      return _this3;
    }

    _createClass(MapFilter, [{
      key: "size",
      get: function get() {
        var accumulator = 0;

        var _iterator20 = _createForOfIteratorHelper(this),
            _step20;

        try {
          for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) // jshint ignore:line
          {
            var i = _step20.value;
            accumulator++;
          }
        } catch (err) {
          _iterator20.e(err);
        } finally {
          _iterator20.f();
        }

        return accumulator;
      }
    }, {
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator21, _step21, _step21$value, key, _value2;

        return regeneratorRuntime.wrap(function value$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _iterator21 = _createForOfIteratorHelper(this.iterable);
                _context3.prev = 1;

                _iterator21.s();

              case 3:
                if ((_step21 = _iterator21.n()).done) {
                  _context3.next = 10;
                  break;
                }

                _step21$value = _slicedToArray(_step21.value, 2), key = _step21$value[0], _value2 = _step21$value[1];

                if (!this.filterPredicate.call(this.ctx, _value2, key, this)) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 8;
                return [key, _value2];

              case 8:
                _context3.next = 3;
                break;

              case 10:
                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](1);

                _iterator21.e(_context3.t0);

              case 15:
                _context3.prev = 15;

                _iterator21.f();

                return _context3.finish(15);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, value, this, [[1, 12, 15, 18]]);
      })
    }, {
      key: "optionalGet",
      value: function optionalGet(key) {
        var opt = _get(_getPrototypeOf(MapFilter.prototype), "optionalGet", this).call(this, key);

        if (opt.has && !this.filterPredicate.call(this.ctx, opt.value, key, this)) {
          return none;
        }

        return opt;
      }
    }, {
      key: "has",
      value: function has(key) {
        return this.optionalGet(key).has;
      }
    }, {
      key: "get",
      value: function get(key) {
        return this.optionalGet(key).value;
      }
    }]);

    return MapFilter;
  }(MapIterableWrapper);
  /**
   * @extends MapIterableWrapper
   * @private
   */


  var MapKeyMapper = /*#__PURE__*/function (_MapIterableWrapper2) {
    _inherits(MapKeyMapper, _MapIterableWrapper2);

    var _super4 = _createSuper(MapKeyMapper);

    function MapKeyMapper(iterable, mapFunction, ctx) {
      var _this4;

      _classCallCheck(this, MapKeyMapper);

      _this4 = _super4.call(this, iterable, ctx);
      _this4.mapFunction = mapFunction;
      return _this4;
    }

    _createClass(MapKeyMapper, [{
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator22, _step22, _step22$value, key, _value3;

        return regeneratorRuntime.wrap(function value$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _iterator22 = _createForOfIteratorHelper(this.iterable);
                _context4.prev = 1;

                _iterator22.s();

              case 3:
                if ((_step22 = _iterator22.n()).done) {
                  _context4.next = 9;
                  break;
                }

                _step22$value = _slicedToArray(_step22.value, 2), key = _step22$value[0], _value3 = _step22$value[1];
                _context4.next = 7;
                return [this.mapFunction.call(this.ctx, _value3, key, this), _value3];

              case 7:
                _context4.next = 3;
                break;

              case 9:
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](1);

                _iterator22.e(_context4.t0);

              case 14:
                _context4.prev = 14;

                _iterator22.f();

                return _context4.finish(14);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, value, this, [[1, 11, 14, 17]]);
      })
    }]);

    return MapKeyMapper;
  }(MapIterableWrapper);
  /**
   * @extends MapIterableWrapper
   * @private
   */


  var MapValueMapper = /*#__PURE__*/function (_MapIterableWrapper3) {
    _inherits(MapValueMapper, _MapIterableWrapper3);

    var _super5 = _createSuper(MapValueMapper);

    function MapValueMapper(iterable, mapFunction, ctx) {
      var _this5;

      _classCallCheck(this, MapValueMapper);

      _this5 = _super5.call(this, iterable, ctx);
      _this5.mapFunction = mapFunction;
      return _this5;
    }

    _createClass(MapValueMapper, [{
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator23, _step23, _step23$value, key, _value4;

        return regeneratorRuntime.wrap(function value$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _iterator23 = _createForOfIteratorHelper(this.iterable);
                _context5.prev = 1;

                _iterator23.s();

              case 3:
                if ((_step23 = _iterator23.n()).done) {
                  _context5.next = 9;
                  break;
                }

                _step23$value = _slicedToArray(_step23.value, 2), key = _step23$value[0], _value4 = _step23$value[1];
                _context5.next = 7;
                return [key, this.mapFunction.call(this.ctx, _value4, key, this)];

              case 7:
                _context5.next = 3;
                break;

              case 9:
                _context5.next = 14;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](1);

                _iterator23.e(_context5.t0);

              case 14:
                _context5.prev = 14;

                _iterator23.f();

                return _context5.finish(14);

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, value, this, [[1, 11, 14, 17]]);
      })
    }, {
      key: "optionalGet",
      value: function optionalGet(key) {
        var opt = _get(_getPrototypeOf(MapValueMapper.prototype), "optionalGet", this).call(this, key);

        if (opt.has) {
          return _some(this.mapFunction.call(this.ctx, opt.value, key, this));
        }

        return opt;
      }
    }]);

    return MapValueMapper;
  }(MapIterableWrapper);
  /**
   * @extends MapIterableWrapper
   * @private
   */


  var MapEntryMapper = /*#__PURE__*/function (_MapIterableWrapper4) {
    _inherits(MapEntryMapper, _MapIterableWrapper4);

    var _super6 = _createSuper(MapEntryMapper);

    function MapEntryMapper(iterable, mapFunction, ctx) {
      var _this6;

      _classCallCheck(this, MapEntryMapper);

      _this6 = _super6.call(this, iterable, ctx);
      _this6.mapFunction = mapFunction;
      return _this6;
    }

    _createClass(MapEntryMapper, [{
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator24, _step24, _step24$value, key, _value5, _this$mapFunction$cal, _this$mapFunction$cal2, newKey, newValue;

        return regeneratorRuntime.wrap(function value$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _iterator24 = _createForOfIteratorHelper(this.iterable);
                _context6.prev = 1;

                _iterator24.s();

              case 3:
                if ((_step24 = _iterator24.n()).done) {
                  _context6.next = 10;
                  break;
                }

                _step24$value = _slicedToArray(_step24.value, 2), key = _step24$value[0], _value5 = _step24$value[1];
                _this$mapFunction$cal = this.mapFunction.call(this.ctx, _value5, key, this), _this$mapFunction$cal2 = _slicedToArray(_this$mapFunction$cal, 2), newKey = _this$mapFunction$cal2[0], newValue = _this$mapFunction$cal2[1];
                _context6.next = 8;
                return [newKey, newValue];

              case 8:
                _context6.next = 3;
                break;

              case 10:
                _context6.next = 15;
                break;

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](1);

                _iterator24.e(_context6.t0);

              case 15:
                _context6.prev = 15;

                _iterator24.f();

                return _context6.finish(15);

              case 18:
              case "end":
                return _context6.stop();
            }
          }
        }, value, this, [[1, 12, 15, 18]]);
      })
    }, {
      key: "get",
      value: function get(key) {
        if (this.iterable.has(key)) {
          var _value6 = this.iterable.get(key);

          return this.mapFunction.call(this.ctx, _value6, key, this)[1];
        }

        return undefined;
      }
    }]);

    return MapEntryMapper;
  }(MapIterableWrapper);
  /**
   * @extends MapIterable
   * @private
   */


  var MapConcat = /*#__PURE__*/function (_MapIterable2) {
    _inherits(MapConcat, _MapIterable2);

    var _super7 = _createSuper(MapConcat);

    function MapConcat(iterable, otherIterable) {
      var _this7;

      _classCallCheck(this, MapConcat);

      _this7 = _super7.call(this);
      _this7.iterable = iterable;
      _this7.otherIterable = otherIterable;
      return _this7;
    }

    _createClass(MapConcat, [{
      key: "size",
      get: function get() {
        return this.iterable.size + this.otherIterable.size;
      }
    }, {
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        return regeneratorRuntime.wrap(function value$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.delegateYield(this.iterable, "t0", 1);

              case 1:
                return _context7.delegateYield(this.otherIterable, "t1", 2);

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, value, this);
      })
    }, {
      key: "optionalGet",
      value: function optionalGet(key) {
        var opt = this.iterable.optionalGet(key);
        return opt.has ? opt : this.otherIterable.optionalGet(key);
      }
    }, {
      key: "has",
      value: function has(key) {
        return this.optionalGet(key).has;
      }
    }, {
      key: "get",
      value: function get(key) {
        return this.optionalGet(key).value;
      }
    }]);

    return MapConcat;
  }(MapIterable);
  /**
   * @extends SetIterable
   * @private
   */


  var SetConcat = /*#__PURE__*/function (_SetIterable2) {
    _inherits(SetConcat, _SetIterable2);

    var _super8 = _createSuper(SetConcat);

    function SetConcat(iterable, otherIterable) {
      var _this8;

      _classCallCheck(this, SetConcat);

      _this8 = _super8.call(this);
      _this8.iterable = iterable;
      _this8.otherIterable = otherIterable;
      return _this8;
    }

    _createClass(SetConcat, [{
      key: "size",
      get: function get() {
        return this.iterable.size + this.otherIterable.size;
      }
    }, {
      key: "has",
      value: function has(value) {
        var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : equalsFor(value);
        return this.iterable.has(value, equals) || this.otherIterable.has(value, equals);
      }
    }, {
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        return regeneratorRuntime.wrap(function value$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.delegateYield(this.iterable, "t0", 1);

              case 1:
                return _context8.delegateYield(this.otherIterable, "t1", 2);

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, value, this);
      })
    }]);

    return SetConcat;
  }(SetIterable);
  /**
   * @extends SetIterableWrapper
   * @private
   */


  var EntryToValueMapper = /*#__PURE__*/function (_SetIterableWrapper) {
    _inherits(EntryToValueMapper, _SetIterableWrapper);

    var _super9 = _createSuper(EntryToValueMapper);

    function EntryToValueMapper(iterable) {
      _classCallCheck(this, EntryToValueMapper);

      return _super9.call(this, iterable);
    }

    _createClass(EntryToValueMapper, [{
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator25, _step25, _step25$value, _value7;

        return regeneratorRuntime.wrap(function value$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _iterator25 = _createForOfIteratorHelper(this.iterable);
                _context9.prev = 1;

                _iterator25.s();

              case 3:
                if ((_step25 = _iterator25.n()).done) {
                  _context9.next = 9;
                  break;
                }

                _step25$value = _slicedToArray(_step25.value, 2), _value7 = _step25$value[1];
                _context9.next = 7;
                return _value7;

              case 7:
                _context9.next = 3;
                break;

              case 9:
                _context9.next = 14;
                break;

              case 11:
                _context9.prev = 11;
                _context9.t0 = _context9["catch"](1);

                _iterator25.e(_context9.t0);

              case 14:
                _context9.prev = 14;

                _iterator25.f();

                return _context9.finish(14);

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, value, this, [[1, 11, 14, 17]]);
      })
    }, {
      key: "has",
      value: function has(value) {
        var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : equalsFor(value);

        if (Array.isArray(value)) {
          return this.iterable.some(function (otherValue) {
            return equals(value, otherValue);
          });
        } else {
          return this.iterable.some(function (otherValue) {
            return equals(value, otherValue);
          });
        }
      }
    }]);

    return EntryToValueMapper;
  }(SetIterableWrapper);
  /**
   * @extends SetIterableWrapper
   * @private
   */


  var EntryToKeyMapper = /*#__PURE__*/function (_SetIterableWrapper2) {
    _inherits(EntryToKeyMapper, _SetIterableWrapper2);

    var _super10 = _createSuper(EntryToKeyMapper);

    function EntryToKeyMapper(iterable) {
      _classCallCheck(this, EntryToKeyMapper);

      return _super10.call(this, iterable);
    }

    _createClass(EntryToKeyMapper, [{
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator26, _step26, _step26$value, key;

        return regeneratorRuntime.wrap(function value$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _iterator26 = _createForOfIteratorHelper(this.iterable);
                _context10.prev = 1;

                _iterator26.s();

              case 3:
                if ((_step26 = _iterator26.n()).done) {
                  _context10.next = 9;
                  break;
                }

                _step26$value = _slicedToArray(_step26.value, 1), key = _step26$value[0];
                _context10.next = 7;
                return key;

              case 7:
                _context10.next = 3;
                break;

              case 9:
                _context10.next = 14;
                break;

              case 11:
                _context10.prev = 11;
                _context10.t0 = _context10["catch"](1);

                _iterator26.e(_context10.t0);

              case 14:
                _context10.prev = 14;

                _iterator26.f();

                return _context10.finish(14);

              case 17:
              case "end":
                return _context10.stop();
            }
          }
        }, value, this, [[1, 11, 14, 17]]);
      })
    }, {
      key: "has",
      value: function has(key) {
        return this.iterable.optionalGet(key).has;
      }
    }]);

    return EntryToKeyMapper;
  }(SetIterableWrapper);
  /**
   * @extends SetIterableWrapper
   * @private
   */


  var MapMapper = /*#__PURE__*/function (_SetIterableWrapper3) {
    _inherits(MapMapper, _SetIterableWrapper3);

    var _super11 = _createSuper(MapMapper);

    function MapMapper(iterable, mapFunction, ctx) {
      var _this9;

      _classCallCheck(this, MapMapper);

      _this9 = _super11.call(this, iterable, ctx);
      _this9.mapFunction = mapFunction;
      return _this9;
    }

    _createClass(MapMapper, [{
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator27, _step27, _step27$value, key, _value8;

        return regeneratorRuntime.wrap(function value$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _iterator27 = _createForOfIteratorHelper(this.iterable);
                _context11.prev = 1;

                _iterator27.s();

              case 3:
                if ((_step27 = _iterator27.n()).done) {
                  _context11.next = 9;
                  break;
                }

                _step27$value = _slicedToArray(_step27.value, 2), key = _step27$value[0], _value8 = _step27$value[1];
                _context11.next = 7;
                return this.mapFunction.call(this.ctx, _value8, key, this);

              case 7:
                _context11.next = 3;
                break;

              case 9:
                _context11.next = 14;
                break;

              case 11:
                _context11.prev = 11;
                _context11.t0 = _context11["catch"](1);

                _iterator27.e(_context11.t0);

              case 14:
                _context11.prev = 14;

                _iterator27.f();

                return _context11.finish(14);

              case 17:
              case "end":
                return _context11.stop();
            }
          }
        }, value, this, [[1, 11, 14, 17]]);
      })
      /**
       * Only ever used for the Map function that produces a SetIterable.
       * @param value
       * @param equals
       * @return {boolean}
       */

    }, {
      key: "has",
      value: function has(value) {
        var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : equalsFor(value);
        return this.some(function (otherValue) {
          return equals(value, otherValue);
        });
      }
    }]);

    return MapMapper;
  }(SetIterableWrapper);
  /**
   * @extends SetIterableWrapper
   * @private
   */


  var SetMapper = /*#__PURE__*/function (_SetIterableWrapper4) {
    _inherits(SetMapper, _SetIterableWrapper4);

    var _super12 = _createSuper(SetMapper);

    function SetMapper(iterable, mapFunction, ctx) {
      var _this10;

      _classCallCheck(this, SetMapper);

      _this10 = _super12.call(this, iterable, ctx);
      _this10.mapFunction = mapFunction;
      return _this10;
    }

    _createClass(SetMapper, [{
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator28, _step28, _value9;

        return regeneratorRuntime.wrap(function value$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _iterator28 = _createForOfIteratorHelper(this.iterable);
                _context12.prev = 1;

                _iterator28.s();

              case 3:
                if ((_step28 = _iterator28.n()).done) {
                  _context12.next = 9;
                  break;
                }

                _value9 = _step28.value;
                _context12.next = 7;
                return this.mapFunction.call(this.ctx, _value9, _value9, this);

              case 7:
                _context12.next = 3;
                break;

              case 9:
                _context12.next = 14;
                break;

              case 11:
                _context12.prev = 11;
                _context12.t0 = _context12["catch"](1);

                _iterator28.e(_context12.t0);

              case 14:
                _context12.prev = 14;

                _iterator28.f();

                return _context12.finish(14);

              case 17:
              case "end":
                return _context12.stop();
            }
          }
        }, value, this, [[1, 11, 14, 17]]);
      })
    }, {
      key: "has",
      value: function has(value) {
        var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : equalsFor(value);
        return this.some(function (otherValue) {
          return equals(value, otherValue);
        });
      }
    }]);

    return SetMapper;
  }(SetIterableWrapper);
  /**
   * @extends SetIterableWrapper
   * @private
   */


  var SetFilter = /*#__PURE__*/function (_SetIterableWrapper5) {
    _inherits(SetFilter, _SetIterableWrapper5);

    var _super13 = _createSuper(SetFilter);

    function SetFilter(iterable, filterPredicate, ctx) {
      var _this11;

      _classCallCheck(this, SetFilter);

      _this11 = _super13.call(this, iterable, ctx);
      _this11.filterPredicate = filterPredicate;
      return _this11;
    }

    _createClass(SetFilter, [{
      key: "size",
      get: function get() {
        var accumulator = 0;

        var _iterator29 = _createForOfIteratorHelper(this),
            _step29;

        try {
          for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) // jshint ignore:line
          {
            var i = _step29.value;
            accumulator++;
          }
        } catch (err) {
          _iterator29.e(err);
        } finally {
          _iterator29.f();
        }

        return accumulator;
      }
    }, {
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator30, _step30, _value10;

        return regeneratorRuntime.wrap(function value$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _iterator30 = _createForOfIteratorHelper(this.iterable);
                _context13.prev = 1;

                _iterator30.s();

              case 3:
                if ((_step30 = _iterator30.n()).done) {
                  _context13.next = 10;
                  break;
                }

                _value10 = _step30.value;

                if (!this.filterPredicate.call(this.ctx, _value10, _value10, this)) {
                  _context13.next = 8;
                  break;
                }

                _context13.next = 8;
                return _value10;

              case 8:
                _context13.next = 3;
                break;

              case 10:
                _context13.next = 15;
                break;

              case 12:
                _context13.prev = 12;
                _context13.t0 = _context13["catch"](1);

                _iterator30.e(_context13.t0);

              case 15:
                _context13.prev = 15;

                _iterator30.f();

                return _context13.finish(15);

              case 18:
              case "end":
                return _context13.stop();
            }
          }
        }, value, this, [[1, 12, 15, 18]]);
      })
    }, {
      key: "has",
      value: function has(value) {
        var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : equalsFor(value);

        if (this.iterable.has(value, equals)) {
          return this.filterPredicate.call(this.ctx, value, value, this);
        }

        return false;
      }
    }]);

    return SetFilter;
  }(SetIterableWrapper);

  var SHIFT = 7;
  var WIDTH = 1 << SHIFT;
  var MASK = WIDTH - 1;
  var DEPTH = 5;
  var SHIFT_HAMT = 5;
  var WIDTH_HAMT = 1 << SHIFT_HAMT;
  var MASK_HAMT = WIDTH_HAMT - 1;
  var DEPTH_HAMT = DEPTH - 1;
  var SHIFT_HAMT_1 = SHIFT_HAMT + SHIFT;
  /**
   * HashMap - HashMap Implementation for JavaScript
   * @namespace Mootable
   * @author Jack Moxley <https://github.com/jackmoxley>
   * @version 0.15.0
   * Homepage: https://github.com/mootable/hashmap
   */

  /**
   * This HashMap is backed by a hashtrie, and can be tuned to specific use cases.
   * @extends {MapIterable}
   */

  var HashMap = /*#__PURE__*/function (_MapIterable) {
    _inherits(HashMap, _MapIterable);

    var _super = _createSuper(HashMap);

    /**
     * This HashMap is backed by a hashtrie, and can be tuned to specific use cases.
     * - `new HashMap()` creates an empty hashmap
     * - `new HashMap(copy:Iterable)` creates a hashmap which is a copy of the provided iterable.
     *   1) `copy` either
     *      - an object that provides a forEach function with the same signature as `Map.forEach`, such as `Map` or this `HashMap` and `LinkedHashMap`
     *      - or a 2 dimensional key-value array, e.g. `[['key1','val1'], ['key2','val2']]`.
     * @param {(Map|HashMap|LinkedHashMap|Iterable.<Array.<key,value>>)} [copy]
     */
    function HashMap(copy) {
      var _this;

      _classCallCheck(this, HashMap);

      _this = _super.call(this);

      _this.clear();

      if (copy && (copy[Symbol.iterator] || copy.forEach)) {
        _this.copy(copy);
      }

      return _this;
    }

    _createClass(HashMap, [{
      key: "size",
      get: function get() {
        return this.length;
      }
    }, {
      key: "__createContainer",
      value: function __createContainer(hash) {
        return new Container(this, hash);
      }
    }, {
      key: "has",
      value: function has(key) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        equalsAndHash(key, options);
        return this.buckets.has(key, options, 0);
      }
    }, {
      key: "get",
      value: function get(key) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        equalsAndHash(key, options);
        return this.buckets.get(key, options, 0);
      } // noinspection JSCheckFunctionSignatures

    }, {
      key: "optionalGet",
      value: function optionalGet(key) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        equalsAndHash(key, options);
        return this.buckets.optionalGet(key, options, 0);
      }
      /**
       * Sets a value onto this map, using the key as its reference.
       *
       * @param {*} key - the key we want to key our value to
       * @param {*} value - the value we are setting
       * @return {HashMap}
       */

    }, {
      key: "set",
      value: function set(key, value) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        equalsAndHash(key, options);
        this.buckets.set(key, value, options, 0);
        this.length = this.buckets.size;
        return this;
      }
      /**
       *
       * @param {Map|HashMap|LinkedHashMap|MapIterable|SetIterable.<Array.<key,value>>|Iterator.<Array.<key,value>>|Array.<Array.<key,value>>} other - the iterable to copy
       * @return {HashMap} this hashmap, with the values copied to it.
       * @throws {TypeError} if the provided object other is null or not iterable.
       */

    }, {
      key: "copy",
      value: function copy(other) {
        var map = this;

        if (isIterable(other)) {
          var _iterator = _createForOfIteratorHelper(other),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _slicedToArray(_step.value, 2),
                  key = _step$value[0],
                  value = _step$value[1];

              map.set(key, value);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return this;
        } else if (isFunction(other.entries)) {
          var _iterator2 = _createForOfIteratorHelper(other.entries()),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _step2$value = _slicedToArray(_step2.value, 2),
                  _key = _step2$value[0],
                  _value = _step2$value[1];

              map.set(_key, _value);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          return this;
        } else if (isFunction(other.forEach)) {
          other.forEach(function (value, key) {
            map.set(key, value);
          });
          return this;
        }

        throw new TypeError('HashMap.copy expects an object which is iterable or has a forEach function on it');
      }
      /**
       * Makes a copy of this hashmap and returns a new one.
       * @return {HashMap}
       */

    }, {
      key: "clone",
      value: function clone() {
        return new HashMap(this);
      }
      /**
       * Deletes an entry from this hashmap, using the provided key
       * @param key
       * @return {HashMap}
       */

    }, {
      key: "delete",
      value: function _delete(key) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        equalsAndHash(key, options);

        if (this.buckets.delete(key, options, 0)) {
          this.length = this.buckets.size;
        }

        return this;
      }
      /**
       * clears the data from this hashmap.
       * @return {HashMap}
       */

    }, {
      key: "clear",
      value: function clear() {
        this.buckets = new HashBuckets(this);
        this.length = 0;
        return this;
      }
    }, {
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator3, _step3, entry;

        return regeneratorRuntime.wrap(function value$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iterator3 = _createForOfIteratorHelper(this.buckets);
                _context.prev = 1;

                _iterator3.s();

              case 3:
                if ((_step3 = _iterator3.n()).done) {
                  _context.next = 9;
                  break;
                }

                entry = _step3.value;
                _context.next = 7;
                return entry;

              case 7:
                _context.next = 3;
                break;

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);

                _iterator3.e(_context.t0);

              case 14:
                _context.prev = 14;

                _iterator3.f();

                return _context.finish(14);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, value, this, [[1, 11, 14, 17]]);
      })
    }, {
      key: "reverse",
      value: /*#__PURE__*/regeneratorRuntime.mark(function reverse() {
        var _iterator4, _step4, entry;

        return regeneratorRuntime.wrap(function reverse$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _iterator4 = _createForOfIteratorHelper(this.buckets.reverse());
                _context2.prev = 1;

                _iterator4.s();

              case 3:
                if ((_step4 = _iterator4.n()).done) {
                  _context2.next = 9;
                  break;
                }

                entry = _step4.value;
                _context2.next = 7;
                return entry;

              case 7:
                _context2.next = 3;
                break;

              case 9:
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](1);

                _iterator4.e(_context2.t0);

              case 14:
                _context2.prev = 14;

                _iterator4.f();

                return _context2.finish(14);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, reverse, this, [[1, 11, 14, 17]]);
      })
    }]);

    return HashMap;
  }(MapIterable);
  /**
   * @private
   */

  var HashBuckets = /*#__PURE__*/function () {
    function HashBuckets(map) {
      _classCallCheck(this, HashBuckets);

      this.map = map;
      this.clear();
    }

    _createClass(HashBuckets, [{
      key: "hashConflicts",
      value: function hashConflicts() {
        return false;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.buckets = [];
        this.size = 0;
      }
    }, {
      key: "bucketFor",
      value: function bucketFor(hash) {
        var idx = this.indexFor(hash);

        if (idx < this.buckets.length) {
          return this.buckets[idx];
        }

        return undefined;
      }
    }, {
      key: "indexFor",
      value: function indexFor(hash) {
        return hash >>> SHIFT & MASK;
      }
    }, {
      key: "set",
      value: function set(key, value, options) {
        var hash = options.hash;
        var idx = this.indexFor(hash);
        var bucket = this.buckets[idx];

        if (!bucket) {
          bucket = this.map.__createContainer(hash);
          bucket.createEntry(key, value);
          this.buckets[idx] = bucket;
          this.size += 1;
          return true;
        } else if (bucket.hashConflicts(hash)) {
          bucket = new HamtBuckets(this.map, DEPTH_HAMT, SHIFT_HAMT_1).replacing(bucket);
          this.buckets[idx] = bucket;
        }

        if (bucket.set(key, value, options)) {
          this.size += 1;
          return true;
        }

        return false;
      }
    }, {
      key: "emplace",
      value: function emplace(key, handler, options) {
        var hash = options.hash;
        var idx = this.indexFor(hash);
        var bucket = this.buckets[idx];

        if (!bucket) {
          bucket = this.map.__createContainer(hash);
          this.buckets[idx] = bucket;
        } else if (bucket.hashConflicts(hash)) {
          bucket = new HamtBuckets(this.map, DEPTH_HAMT, SHIFT_HAMT_1).replacing(bucket);
          this.buckets[idx] = bucket;
        }

        var response = bucket.emplace(key, handler, options);

        if (response.resized) {
          this.size += 1;
        }

        return response;
      }
    }, {
      key: "delete",
      value: function _delete(key, options) {
        var hash = options.hash;
        var idx = this.indexFor(hash);
        var bucket = this.buckets[idx];

        if (bucket) {
          var deleted = bucket.delete(key, options);

          if (deleted) {
            // if (bucket.size === 0) {
            //     this.buckets[idx] = undefined;
            // }
            this.size -= 1;
            return true;
          }
        }

        return false;
      }
    }, {
      key: "get",
      value: function get(key, options) {
        var hash = options.hash;
        var bucket = this.bucketFor(hash);

        if (bucket) {
          return bucket.get(key, options);
        }

        return undefined;
      }
    }, {
      key: "optionalGet",
      value: function optionalGet(key, options) {
        var hash = options.hash;
        var bucket = this.bucketFor(hash);

        if (bucket) {
          return bucket.optionalGet(key, options);
        }

        return none;
      }
    }, {
      key: "has",
      value: function has(key, options) {
        var hash = options.hash;
        var bucket = this.bucketFor(hash);

        if (bucket) {
          return bucket.has(key, options);
        }

        return false;
      }
    }, {
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator5, _step5, bucket, _iterator6, _step6, entry;

        return regeneratorRuntime.wrap(function value$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _iterator5 = _createForOfIteratorHelper(this.buckets);
                _context3.prev = 1;

                _iterator5.s();

              case 3:
                if ((_step5 = _iterator5.n()).done) {
                  _context3.next = 25;
                  break;
                }

                bucket = _step5.value;

                if (!bucket) {
                  _context3.next = 23;
                  break;
                }

                _iterator6 = _createForOfIteratorHelper(bucket);
                _context3.prev = 7;

                _iterator6.s();

              case 9:
                if ((_step6 = _iterator6.n()).done) {
                  _context3.next = 15;
                  break;
                }

                entry = _step6.value;
                _context3.next = 13;
                return entry;

              case 13:
                _context3.next = 9;
                break;

              case 15:
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](7);

                _iterator6.e(_context3.t0);

              case 20:
                _context3.prev = 20;

                _iterator6.f();

                return _context3.finish(20);

              case 23:
                _context3.next = 3;
                break;

              case 25:
                _context3.next = 30;
                break;

              case 27:
                _context3.prev = 27;
                _context3.t1 = _context3["catch"](1);

                _iterator5.e(_context3.t1);

              case 30:
                _context3.prev = 30;

                _iterator5.f();

                return _context3.finish(30);

              case 33:
              case "end":
                return _context3.stop();
            }
          }
        }, value, this, [[1, 27, 30, 33], [7, 17, 20, 23]]);
      })
    }, {
      key: "reverse",
      value: /*#__PURE__*/regeneratorRuntime.mark(function reverse() {
        var idx, bucket, _iterator7, _step7, entry;

        return regeneratorRuntime.wrap(function reverse$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                idx = this.buckets.length - 1;

              case 1:
                if (!(idx >= 0)) {
                  _context4.next = 24;
                  break;
                }

                bucket = this.buckets[idx];

                if (!bucket) {
                  _context4.next = 21;
                  break;
                }

                _iterator7 = _createForOfIteratorHelper(bucket.reverse());
                _context4.prev = 5;

                _iterator7.s();

              case 7:
                if ((_step7 = _iterator7.n()).done) {
                  _context4.next = 13;
                  break;
                }

                entry = _step7.value;
                _context4.next = 11;
                return entry;

              case 11:
                _context4.next = 7;
                break;

              case 13:
                _context4.next = 18;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](5);

                _iterator7.e(_context4.t0);

              case 18:
                _context4.prev = 18;

                _iterator7.f();

                return _context4.finish(18);

              case 21:
                idx--;
                _context4.next = 1;
                break;

              case 24:
              case "end":
                return _context4.stop();
            }
          }
        }, reverse, this, [[5, 15, 18, 21]]);
      })
    }]);

    return HashBuckets;
  }();
  /**
   * @private
   */

  var HamtBuckets = /*#__PURE__*/function (_HashBuckets) {
    _inherits(HamtBuckets, _HashBuckets);

    var _super2 = _createSuper(HamtBuckets);

    function HamtBuckets(map, depth, shift) {
      var _this2;

      _classCallCheck(this, HamtBuckets);

      _this2 = _super2.call(this, map);
      _this2.depth = depth;
      _this2.shift = shift;
      return _this2;
    }

    _createClass(HamtBuckets, [{
      key: "clear",
      value: function clear() {
        this.size = 0;
        this.buckets = [];
        this.idxFlags = 0;
      }
    }, {
      key: "indexFor",
      value: function indexFor(hash) {
        var idxFlags = this.idxFlags;
        var hashIdx = hash >>> this.shift & MASK_HAMT;
        var flag = 1 << hashIdx;
        return hammingWeight(idxFlags & flag - 1);
      }
    }, {
      key: "bucketFor",
      value: function bucketFor(hash) {
        var idxFlags = this.idxFlags;
        var hashIdx = hash >>> this.shift & MASK_HAMT;
        var flag = 1 << hashIdx;
        var idx = hammingWeight(idxFlags & flag - 1);

        if (idxFlags & flag) {
          return this.buckets[idx];
        }

        return undefined;
      }
    }, {
      key: "replacing",
      value: function replacing(oldBucket) {
        var new_flag = 1 << (oldBucket.hash >>> this.shift & MASK_HAMT);
        this.idxFlags |= new_flag; // shift the old bucket up a level. no need to splice its always going to be the first item.

        this.buckets[0] = oldBucket;
        this.size = oldBucket.size;
        return this;
      }
    }, {
      key: "set",
      value: function set(key, value, options) {
        var hash = options.hash;
        var idxFlags = this.idxFlags;
        var hashIdx = hash >>> this.shift & MASK_HAMT;
        var flag = 1 << hashIdx;
        var idx = hammingWeight(idxFlags & flag - 1);
        var bucket;

        if (idxFlags & flag) {
          bucket = this.buckets[idx];

          if (this.depth && bucket.hashConflicts(hash)) {
            bucket = new HamtBuckets(this.map, this.depth - 1, this.shift + SHIFT_HAMT).replacing(bucket);
            this.buckets[idx] = bucket;
          }
        } else {
          bucket = this.map.__createContainer(hash);
          bucket.createEntry(key, value);
          this.buckets.splice(idx, 0, bucket);
          this.idxFlags |= flag;
          this.size += 1;
          return true;
        }

        if (bucket.set(key, value, options)) {
          this.size += 1;
          return true;
        }

        return false;
      } // emplace(key, handler, options) {
      //     const idx = (options.hash >>> this.shift) & this.map.mask;
      //     let bucket = this.buckets[idx];
      //     if (!bucket) {
      //         bucket = this.depth ? new HamtBuckets(this.options, this.depth - 1) : new Container(this.options);
      //         this.buckets[idx] = bucket;
      //     }
      //     options.hash >>>= this.options.widthAs2sExponent;
      //     const response = bucket.emplace(key, handler, options);
      //     if (response.resized) {
      //         this.size += 1;
      //     }
      //     return response;
      // }

    }, {
      key: "delete",
      value: function _delete(key, options) {
        var hash = options.hash;
        var idxFlags = this.idxFlags;
        var hashIdx = hash >>> this.shift & MASK_HAMT;
        var flag = 1 << hashIdx;

        if (idxFlags & flag) {
          var idx = hammingWeight(idxFlags & flag - 1);
          var bucket = this.buckets[idx];
          var deleted = bucket.delete(key, options);

          if (deleted) {
            this.size -= 1;

            if (bucket.size === 0) {
              if (idx === 0) {
                this.buckets.shift();
              } else if (this.buckets.size === idx) {
                this.buckets.pop();
              } else {
                this.buckets.splice(idx, 1);
              }

              this.idxFlags ^= flag;
            }

            return true;
          }
        }

        return false;
      }
    }, {
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator8, _step8, bucket, _iterator9, _step9, entry;

        return regeneratorRuntime.wrap(function value$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _iterator8 = _createForOfIteratorHelper(this.buckets);
                _context5.prev = 1;

                _iterator8.s();

              case 3:
                if ((_step8 = _iterator8.n()).done) {
                  _context5.next = 24;
                  break;
                }

                bucket = _step8.value;
                _iterator9 = _createForOfIteratorHelper(bucket);
                _context5.prev = 6;

                _iterator9.s();

              case 8:
                if ((_step9 = _iterator9.n()).done) {
                  _context5.next = 14;
                  break;
                }

                entry = _step9.value;
                _context5.next = 12;
                return entry;

              case 12:
                _context5.next = 8;
                break;

              case 14:
                _context5.next = 19;
                break;

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](6);

                _iterator9.e(_context5.t0);

              case 19:
                _context5.prev = 19;

                _iterator9.f();

                return _context5.finish(19);

              case 22:
                _context5.next = 3;
                break;

              case 24:
                _context5.next = 29;
                break;

              case 26:
                _context5.prev = 26;
                _context5.t1 = _context5["catch"](1);

                _iterator8.e(_context5.t1);

              case 29:
                _context5.prev = 29;

                _iterator8.f();

                return _context5.finish(29);

              case 32:
              case "end":
                return _context5.stop();
            }
          }
        }, value, this, [[1, 26, 29, 32], [6, 16, 19, 22]]);
      })
    }, {
      key: "reverse",
      value: /*#__PURE__*/regeneratorRuntime.mark(function reverse() {
        var idx, bucket, _iterator10, _step10, entry;

        return regeneratorRuntime.wrap(function reverse$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                idx = this.buckets.length - 1;

              case 1:
                if (!(idx >= 0)) {
                  _context6.next = 23;
                  break;
                }

                bucket = this.buckets[idx];
                _iterator10 = _createForOfIteratorHelper(bucket.reverse());
                _context6.prev = 4;

                _iterator10.s();

              case 6:
                if ((_step10 = _iterator10.n()).done) {
                  _context6.next = 12;
                  break;
                }

                entry = _step10.value;
                _context6.next = 10;
                return entry;

              case 10:
                _context6.next = 6;
                break;

              case 12:
                _context6.next = 17;
                break;

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6["catch"](4);

                _iterator10.e(_context6.t0);

              case 17:
                _context6.prev = 17;

                _iterator10.f();

                return _context6.finish(17);

              case 20:
                idx--;
                _context6.next = 1;
                break;

              case 23:
              case "end":
                return _context6.stop();
            }
          }
        }, reverse, this, [[4, 14, 17, 20]]);
      })
    }]);

    return HamtBuckets;
  }(HashBuckets);
  /**
   * Holds multiple entries, but shrinks to a single container if reduced to a size of one.
   */

  var Container = /*#__PURE__*/function () {
    function Container(map, hash) {
      _classCallCheck(this, Container);

      this.size = 0;
      this.contents = [];
      this.map = map;
      this.hash = hash;
    }

    _createClass(Container, [{
      key: "hashConflicts",
      value: function hashConflicts(hash) {
        return hash !== this.hash;
      }
    }, {
      key: "get",
      value: function get(key, options) {
        if (this.size !== 0) {
          var equals = options.equals;

          var _iterator11 = _createForOfIteratorHelper(this.contents),
              _step11;

          try {
            for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
              var entry = _step11.value;

              if (entry && equals(key, entry[0])) {
                return entry[1];
              }
            }
          } catch (err) {
            _iterator11.e(err);
          } finally {
            _iterator11.f();
          }
        }

        return undefined;
      }
    }, {
      key: "optionalGet",
      value: function optionalGet(key, options) {
        if (this.size !== 0) {
          var equals = options.equals;
          var entry = this.contents.find(function (entry) {
            return equals(key, entry[0]);
          });

          if (entry) {
            return _some(entry[1]);
          }
        }

        return none;
      }
    }, {
      key: "set",
      value: function set(key, value, options) {
        var equals = options.equals;

        var _iterator12 = _createForOfIteratorHelper(this.contents),
            _step12;

        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var entry = _step12.value;

            if (equals(key, entry[0])) {
              entry[1] = value;
              return false;
            }
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }

        this.createEntry(key, value);
        return true;
      }
    }, {
      key: "createEntry",
      value: function createEntry(key, value) {
        var entry = [key, value];
        this.contents.push(entry);
        this.size += 1;
        return entry;
      }
    }, {
      key: "deleteEntry",
      value: function deleteEntry(idx) {
        this.size -= 1;

        if (idx === 0) {
          return this.contents.shift();
        } else if (idx === this.size) {
          return this.contents.pop();
        } else {
          return this.contents.splice(idx, 1)[0];
        }
      }
    }, {
      key: "emplace",
      value: function emplace(key, handler, options) {
        var equals = options.equals;

        var _iterator13 = _createForOfIteratorHelper(this.contents),
            _step13;

        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var entry = _step13.value;

            if (equals(key, entry[0])) {
              var _value2 = handler.update(entry[1], key, this.map);

              entry[1] = _value2;
              return {
                value: _value2,
                resized: false
              };
            }
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }

        var value = handler.insert(key, this.map);
        this.createEntry(key, value);
        return {
          value: value,
          resized: true
        };
      }
    }, {
      key: "has",
      value: function has(key, options) {
        if (this.size !== 0) {
          var equals = options.equals;
          return this.contents.some(function (entry) {
            return equals(key, entry[0]);
          });
        }

        return false;
      }
    }, {
      key: "delete",
      value: function _delete(key, options) {
        var equals = options.equals;
        var idx = this.contents.findIndex(function (entry) {
          return equals(key, entry[0]);
        });

        if (idx === -1) {
          return false;
        }

        this.deleteEntry(idx);
        return true;
      }
    }, {
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator14, _step14, entry;

        return regeneratorRuntime.wrap(function value$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _iterator14 = _createForOfIteratorHelper(this.contents);
                _context7.prev = 1;

                _iterator14.s();

              case 3:
                if ((_step14 = _iterator14.n()).done) {
                  _context7.next = 9;
                  break;
                }

                entry = _step14.value;
                _context7.next = 7;
                return entry.slice();

              case 7:
                _context7.next = 3;
                break;

              case 9:
                _context7.next = 14;
                break;

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7["catch"](1);

                _iterator14.e(_context7.t0);

              case 14:
                _context7.prev = 14;

                _iterator14.f();

                return _context7.finish(14);

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, value, this, [[1, 11, 14, 17]]);
      })
    }, {
      key: "reverse",
      value: /*#__PURE__*/regeneratorRuntime.mark(function reverse() {
        var idx, entry;
        return regeneratorRuntime.wrap(function reverse$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                idx = this.contents.length - 1;

              case 1:
                if (!(idx >= 0)) {
                  _context8.next = 8;
                  break;
                }

                entry = this.contents[idx];
                _context8.next = 5;
                return entry.slice();

              case 5:
                idx--;
                _context8.next = 1;
                break;

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, reverse, this);
      })
    }]);

    return Container;
  }();
  /**
   * Counts the number of ones in a 32 bit integer.
   *
   * @param {number} flags 32 bit integet
   * @return {number} amount of ones.
   */

  var hammingWeight = function hammingWeight(flags) {
    flags -= flags >> 1 & 0x55555555;
    flags = (flags & 0x33333333) + (flags >> 2 & 0x33333333);
    return (flags + (flags >> 4) & 0xF0F0F0F) * 0x1010101 >> 24;
  };

  /**
   * HashMap - LinkedHashMap Implementation for JavaScript
   * @namespace Mootable
   * @author Jack Moxley <https://github.com/jackmoxley>
   * @version 0.15.0
   * Homepage: https://github.com/mootable/hashmap
   */

  /**
   * This LinkedHashMap is is an extension of {@link HashMap} however LinkedHashMap also maintains insertion order of keys, and guarantees to iterate over them in that order.
   * @extends HashMap
   */

  var LinkedHashMap = /*#__PURE__*/function (_HashMap) {
    _inherits(LinkedHashMap, _HashMap);

    var _super = _createSuper(LinkedHashMap);

    /**
     * This LinkedHashMap is is an extension of {@link HashMap} however LinkedHashMap also maintains insertion order of keys, and guarantees to iterate over them in that order.
     * - `new LinkedHashMap()` creates an empty linked hashmap
     * - `new LinkedHashMap(copy:Iterable)` creates a linked hashmap which is a copy of the provided iterable.
     *   1) `copy` either
     *      - an object that provides a forEach function with the same signature as `Map.forEach`, such as `Map` or this `HashMap` and `LinkedHashMap`
     *      - or a 2 dimensional key-value array, e.g. `[['key1','val1'], ['key2','val2']]`.
     * @param {(Map|HashMap|LinkedHashMap|Iterable.<Array.<key,value>>)} [copy]
     */
    function LinkedHashMap(copy) {
      var _this;

      _classCallCheck(this, LinkedHashMap);

      _this = _super.call(this, copy);
      _this.start = undefined;
      _this.end = undefined;
      return _this;
    }

    _createClass(LinkedHashMap, [{
      key: "__createContainer",
      value: function __createContainer(hash) {
        return new LinkedContainer(this, hash);
      }
      /**
       * Makes a copy of this LinkedHashMap
       * @return {LinkedHashMap}
       */

    }, {
      key: "clone",
      value: function clone() {
        return new LinkedHashMap(this);
      }
    }, {
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var entry;
        return regeneratorRuntime.wrap(function value$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                entry = this.start;

              case 1:
                if (!entry) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return entry.slice();

              case 4:
                entry = entry.next;
                _context.next = 1;
                break;

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, value, this);
      })
    }, {
      key: "reverse",
      value: /*#__PURE__*/regeneratorRuntime.mark(function reverse() {
        var entry;
        return regeneratorRuntime.wrap(function reverse$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                entry = this.end;

              case 1:
                if (!entry) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return entry.slice();

              case 4:
                entry = entry.previous;
                _context2.next = 1;
                break;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, reverse, this);
      })
    }]);

    return LinkedHashMap;
  }(HashMap);
  /**
   * Holds multiple entries, but shrinks to a single container if reduced to a size of one.
   */

  var LinkedContainer = /*#__PURE__*/function (_Container) {
    _inherits(LinkedContainer, _Container);

    var _super2 = _createSuper(LinkedContainer);

    function LinkedContainer(map, hash) {
      _classCallCheck(this, LinkedContainer);

      return _super2.call(this, map, hash);
    }

    _createClass(LinkedContainer, [{
      key: "createEntry",
      value: function createEntry(key, value) {
        var entry = _get(_getPrototypeOf(LinkedContainer.prototype), "createEntry", this).call(this, key, value);

        var map = this.map;

        if (map.end) {
          map.end.next = entry;
          entry.previous = map.end;
          map.end = entry;
        } else {
          map.end = map.start = entry;
        }

        return entry;
      }
    }, {
      key: "deleteEntry",
      value: function deleteEntry(idx) {
        var oldEntry = _get(_getPrototypeOf(LinkedContainer.prototype), "deleteEntry", this).call(this, idx);

        var map = this.map;

        if (oldEntry.previous) {
          oldEntry.previous.next = oldEntry.next;
        } else if (map.start === oldEntry) {
          map.start = oldEntry.next;
        }

        if (oldEntry.next) {
          oldEntry.next.previous = oldEntry.previous;
        } else if (map.end === oldEntry) {
          map.end = oldEntry.previous;
        }
      }
    }]);

    return LinkedContainer;
  }(Container);

  var Mootable = {
    HashMap: HashMap,
    LinkedHashMap: LinkedHashMap,
    MapIterable: MapIterable,
    SetIterable: SetIterable,
    Utils: {
      hash: hash,
      isFunction: isFunction,
      isIterable: isIterable,
      isString: isString,
      equalsAndHash: equalsAndHash,
      hashCodeFor: hashCodeFor,
      equalsFor: equalsFor,
      some: _some,
      none: none,
      Option: Option
    }
  };

  exports.HashMap = HashMap;
  exports.LinkedHashMap = LinkedHashMap;
  exports.Mootable = Mootable;
  exports.default = HashMap;

})));
