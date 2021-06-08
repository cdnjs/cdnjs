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
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var runtime = {exports: {}};

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (module) {
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
  }(runtime));

  var fails$g = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var toString$2 = {}.toString;

  var classofRaw$1 = function (it) {
    return toString$2.call(it).slice(8, -1);
  };

  var fails$f = fails$g;
  var classof$5 = classofRaw$1;

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$f(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$5(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$4 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$1 = indexedObject;
  var requireObjectCoercible$3 = requireObjectCoercible$4;

  var toIndexedObject$7 = function (it) {
    return IndexedObject$1(requireObjectCoercible$3(it));
  };

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$j =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var shared$5 = {exports: {}};

  var fails$e = fails$g;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$e(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var objectDefineProperty = {};

  var isObject$e = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var global$i = global$j;
  var isObject$d = isObject$e;

  var document$1 = global$i.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$d(document$1) && isObject$d(document$1.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$9 = descriptors;
  var fails$d = fails$g;
  var createElement = documentCreateElement$1;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$9 && !fails$d(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var isObject$c = isObject$e;

  var anObject$8 = function (it) {
    if (!isObject$c(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var isObject$b = isObject$e;

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive$5 = function (input, PREFERRED_STRING) {
    if (!isObject$b(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$b(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject$b(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$b(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var DESCRIPTORS$8 = descriptors;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;
  var anObject$7 = anObject$8;
  var toPrimitive$4 = toPrimitive$5;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty$1 = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$8 ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$7(O);
    P = toPrimitive$4(P, true);
    anObject$7(Attributes);
    if (IE8_DOM_DEFINE$1) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var createPropertyDescriptor$5 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var DESCRIPTORS$7 = descriptors;
  var definePropertyModule$6 = objectDefineProperty;
  var createPropertyDescriptor$4 = createPropertyDescriptor$5;

  var createNonEnumerableProperty$9 = DESCRIPTORS$7 ? function (object, key, value) {
    return definePropertyModule$6.f(object, key, createPropertyDescriptor$4(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var global$h = global$j;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$9;

  var setGlobal$3 = function (key, value) {
    try {
      createNonEnumerableProperty$8(global$h, key, value);
    } catch (error) {
      global$h[key] = value;
    } return value;
  };

  var global$g = global$j;
  var setGlobal$2 = setGlobal$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$g[SHARED] || setGlobal$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  (shared$5.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.12.1',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var requireObjectCoercible$2 = requireObjectCoercible$4;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$5 = function (argument) {
    return Object(requireObjectCoercible$2(argument));
  };

  var toObject$4 = toObject$5;

  var hasOwnProperty = {}.hasOwnProperty;

  var has$e = function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$4(it), key);
  };

  var id$1 = 0;
  var postfix = Math.random();

  var uid$4 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix).toString(36);
  };

  var global$f = global$j;

  var path$2 = global$f;

  var path$1 = path$2;
  var global$e = global$j;

  var aFunction$2 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$5 = function (namespace, method) {
    return arguments.length < 2 ? aFunction$2(path$1[namespace]) || aFunction$2(global$e[namespace])
      : path$1[namespace] && path$1[namespace][method] || global$e[namespace] && global$e[namespace][method];
  };

  var getBuiltIn$4 = getBuiltIn$5;

  var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || '';

  var global$d = global$j;
  var userAgent = engineUserAgent;

  var process = global$d.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] < 4 ? 1 : match[0] + match[1];
  } else if (userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  /* eslint-disable es/no-symbol -- required for testing */

  var V8_VERSION$1 = engineV8Version;
  var fails$c = fails$g;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$c(function () {
    return !String(Symbol()) ||
      // Chrome 38 Symbol has incorrect toString conversion
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$2 = nativeSymbol;

  var useSymbolAsUid = NATIVE_SYMBOL$2
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var global$c = global$j;
  var shared$4 = shared$5.exports;
  var has$d = has$e;
  var uid$3 = uid$4;
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var WellKnownSymbolsStore$1 = shared$4('wks');
  var Symbol$1 = global$c.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$3;

  var wellKnownSymbol$f = function (name) {
    if (!has$d(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      if (NATIVE_SYMBOL$1 && has$d(Symbol$1, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
      }
    } return WellKnownSymbolsStore$1[name];
  };

  var ceil = Math.ceil;
  var floor$1 = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger$4 = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
  };

  var toInteger$3 = toInteger$4;

  var min$2 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$4 = function (argument) {
    return argument > 0 ? min$2(toInteger$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toInteger$2 = toInteger$4;

  var max$2 = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$3 = function (index, length) {
    var integer = toInteger$2(index);
    return integer < 0 ? max$2(integer + length, 0) : min$1(integer, length);
  };

  var toIndexedObject$6 = toIndexedObject$7;
  var toLength$3 = toLength$4;
  var toAbsoluteIndex$2 = toAbsoluteIndex$3;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$3 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$6($this);
      var length = toLength$3(O.length);
      var index = toAbsoluteIndex$2(fromIndex, length);
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

  var hiddenKeys$6 = {};

  var has$c = has$e;
  var toIndexedObject$5 = toIndexedObject$7;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$5 = hiddenKeys$6;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$5(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has$c(hiddenKeys$5, key) && has$c(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has$c(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$2 = Object.keys || function keys(O) {
    return internalObjectKeys$1(O, enumBugKeys$2);
  };

  var DESCRIPTORS$6 = descriptors;
  var definePropertyModule$5 = objectDefineProperty;
  var anObject$6 = anObject$8;
  var objectKeys$1 = objectKeys$2;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = DESCRIPTORS$6 ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$6(O);
    var keys = objectKeys$1(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$5.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var getBuiltIn$3 = getBuiltIn$5;

  var html$1 = getBuiltIn$3('document', 'documentElement');

  var shared$3 = shared$5.exports;
  var uid$2 = uid$4;

  var keys$2 = shared$3('keys');

  var sharedKey$4 = function (key) {
    return keys$2[key] || (keys$2[key] = uid$2(key));
  };

  var anObject$5 = anObject$8;
  var defineProperties = objectDefineProperties;
  var enumBugKeys$1 = enumBugKeys$3;
  var hiddenKeys$4 = hiddenKeys$6;
  var html = html$1;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey$3 = sharedKey$4;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$3('IE_PROTO');

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
    var length = enumBugKeys$1.length;
    while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$1[length]];
    return NullProtoObject();
  };

  hiddenKeys$4[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject$5(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : defineProperties(result, Properties);
  };

  var wellKnownSymbol$e = wellKnownSymbol$f;
  var create$2 = objectCreate;
  var definePropertyModule$4 = objectDefineProperty;

  var UNSCOPABLES = wellKnownSymbol$e('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    definePropertyModule$4.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create$2(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$3 = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var store$1 = sharedStore;

  var functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof store$1.inspectSource != 'function') {
    store$1.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$2 = store$1.inspectSource;

  var global$b = global$j;
  var inspectSource$1 = inspectSource$2;

  var WeakMap$1 = global$b.WeakMap;

  var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$1(WeakMap$1));

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$a = global$j;
  var isObject$a = isObject$e;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$9;
  var objectHas = has$e;
  var shared$2 = sharedStore;
  var sharedKey$2 = sharedKey$4;
  var hiddenKeys$3 = hiddenKeys$6;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap = global$a.WeakMap;
  var set, get, has$b;

  var enforce = function (it) {
    return has$b(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$a(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$2.state) {
    var store = shared$2.state || (shared$2.state = new WeakMap());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has$b = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$3[STATE] = true;
    set = function (it, metadata) {
      if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$7(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return objectHas(it, STATE) ? it[STATE] : {};
    };
    has$b = function (it) {
      return objectHas(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$b,
    enforce: enforce,
    getterFor: getterFor
  };

  var objectGetOwnPropertyDescriptor = {};

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$1;

  var DESCRIPTORS$5 = descriptors;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$3 = createPropertyDescriptor$5;
  var toIndexedObject$4 = toIndexedObject$7;
  var toPrimitive$3 = toPrimitive$5;
  var has$a = has$e;
  var IE8_DOM_DEFINE = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$5 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$4(O);
    P = toPrimitive$3(P, true);
    if (IE8_DOM_DEFINE) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (has$a(O, P)) return createPropertyDescriptor$3(!propertyIsEnumerableModule$1.f.call(O, P), O[P]);
  };

  var redefine$7 = {exports: {}};

  var global$9 = global$j;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$9;
  var has$9 = has$e;
  var setGlobal$1 = setGlobal$3;
  var inspectSource = inspectSource$2;
  var InternalStateModule$3 = internalState;

  var getInternalState$3 = InternalStateModule$3.get;
  var enforceInternalState$1 = InternalStateModule$3.enforce;
  var TEMPLATE = String(String).split('String');

  (redefine$7.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$9(value, 'name')) {
        createNonEnumerableProperty$6(value, 'name', key);
      }
      state = enforceInternalState$1(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }
    if (O === global$9) {
      if (simple) O[key] = value;
      else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$6(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState$3(this).source || inspectSource(this);
  });

  var objectGetOwnPropertyNames = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys = enumBugKeys$3;

  var hiddenKeys$2 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys$2);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$2 = getBuiltIn$5;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var anObject$4 = anObject$8;

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$1.f(anObject$4(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var has$8 = has$e;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
  var definePropertyModule$3 = objectDefineProperty;

  var copyConstructorProperties$2 = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$3.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has$8(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$b = fails$g;

  var replacement = /#|\.prototype\./;

  var isForced$3 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails$b(detection)
      : !!detection;
  };

  var normalize = isForced$3.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$3.data = {};
  var NATIVE = isForced$3.NATIVE = 'N';
  var POLYFILL = isForced$3.POLYFILL = 'P';

  var isForced_1 = isForced$3;

  var global$8 = global$j;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$9;
  var redefine$6 = redefine$7.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties$1 = copyConstructorProperties$2;
  var isForced$2 = isForced_1;

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
      target = global$8;
    } else if (STATIC) {
      target = global$8[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$8[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$2(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties$1(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$5(sourceProperty, 'sham', true);
      }
      // extend global
      redefine$6(target, key, sourceProperty, options);
    }
  };

  var fails$a = fails$g;

  var correctPrototypeGetter = !fails$a(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var has$7 = has$e;
  var toObject$3 = toObject$5;
  var sharedKey$1 = sharedKey$4;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey$1('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
    O = toObject$3(O);
    if (has$7(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype$1 : null;
  };

  var fails$9 = fails$g;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$9;
  var has$6 = has$e;
  var wellKnownSymbol$d = wellKnownSymbol$f;

  var ITERATOR$2 = wellKnownSymbol$d('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  var returnThis$1 = function () { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$9(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if (!has$6(IteratorPrototype$2, ITERATOR$2)) {
    createNonEnumerableProperty$4(IteratorPrototype$2, ITERATOR$2, returnThis$1);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$5 = objectDefineProperty.f;
  var has$5 = has$e;
  var wellKnownSymbol$c = wellKnownSymbol$f;

  var TO_STRING_TAG$3 = wellKnownSymbol$c('toStringTag');

  var setToStringTag$3 = function (it, TAG, STATIC) {
    if (it && !has$5(it = STATIC ? it : it.prototype, TO_STRING_TAG$3)) {
      defineProperty$5(it, TO_STRING_TAG$3, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$1 = objectCreate;
  var createPropertyDescriptor$2 = createPropertyDescriptor$5;
  var setToStringTag$2 = setToStringTag$3;

  var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor$2(1, next) });
    setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
    return IteratorConstructor;
  };

  var isObject$9 = isObject$e;

  var aPossiblePrototype$1 = function (it) {
    if (!isObject$9(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  /* eslint-disable no-proto -- safe */

  var anObject$3 = anObject$8;
  var aPossiblePrototype = aPossiblePrototype$1;

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
      anObject$3(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$d = _export;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf$1 = objectSetPrototypeOf;
  var setToStringTag$1 = setToStringTag$3;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$9;
  var redefine$5 = redefine$7.exports;
  var wellKnownSymbol$b = wellKnownSymbol$f;
  var IteratorsCore = iteratorsCore;

  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol$b('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var defineIterator$2 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
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
    var nativeIterator = IterablePrototype[ITERATOR$1]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf$1) {
            setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
            createNonEnumerableProperty$3(CurrentIteratorPrototype, ITERATOR$1, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
      createNonEnumerableProperty$3(IterablePrototype, ITERATOR$1, defaultIterator);
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$5(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$d({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var toIndexedObject$3 = toIndexedObject$7;
  var addToUnscopables$2 = addToUnscopables$3;
  var InternalStateModule$2 = internalState;
  var defineIterator$1 = defineIterator$2;

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$2 = InternalStateModule$2.set;
  var getInternalState$2 = InternalStateModule$2.getterFor(ARRAY_ITERATOR);

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
  var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
    setInternalState$2(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$3(iterated), // target
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

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$2('keys');
  addToUnscopables$2('values');
  addToUnscopables$2('entries');

  var wellKnownSymbol$a = wellKnownSymbol$f;

  var TO_STRING_TAG$2 = wellKnownSymbol$a('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$9 = wellKnownSymbol$f;

  var TO_STRING_TAG$1 = wellKnownSymbol$9('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$4 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$3 = classof$4;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$3(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$4 = redefine$7.exports;
  var toString$1 = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    redefine$4(Object.prototype, 'toString', toString$1, { unsafe: true });
  }

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

  var global$7 = global$j;
  var DOMIterables$1 = domIterables;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$9;
  var wellKnownSymbol$8 = wellKnownSymbol$f;

  var ITERATOR = wellKnownSymbol$8('iterator');
  var TO_STRING_TAG = wellKnownSymbol$8('toStringTag');
  var ArrayValues = ArrayIteratorMethods.values;

  for (var COLLECTION_NAME$1 in DOMIterables$1) {
    var Collection$1 = global$7[COLLECTION_NAME$1];
    var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
    if (CollectionPrototype$1) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1[ITERATOR] !== ArrayValues) try {
        createNonEnumerableProperty$2(CollectionPrototype$1, ITERATOR, ArrayValues);
      } catch (error) {
        CollectionPrototype$1[ITERATOR] = ArrayValues;
      }
      if (!CollectionPrototype$1[TO_STRING_TAG]) {
        createNonEnumerableProperty$2(CollectionPrototype$1, TO_STRING_TAG, COLLECTION_NAME$1);
      }
      if (DOMIterables$1[COLLECTION_NAME$1]) for (var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype$1[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
          createNonEnumerableProperty$2(CollectionPrototype$1, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype$1[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
        }
      }
    }
  }

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  var aFunction = aFunction$1;

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

  var classof$2 = classofRaw$1;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$3 = Array.isArray || function isArray(arg) {
    return classof$2(arg) == 'Array';
  };

  var isObject$8 = isObject$e;
  var isArray$2 = isArray$3;
  var wellKnownSymbol$7 = wellKnownSymbol$f;

  var SPECIES$3 = wellKnownSymbol$7('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$2 = function (originalArray, length) {
    var C;
    if (isArray$2(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray$2(C.prototype))) C = undefined;
      else if (isObject$8(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var bind = functionBindContext;
  var IndexedObject = indexedObject;
  var toObject$2 = toObject$5;
  var toLength$2 = toLength$4;
  var arraySpeciesCreate$1 = arraySpeciesCreate$2;

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
  var createMethod$2 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$2($this);
      var self = IndexedObject(O);
      var boundFunction = bind(callbackfn, that, 3);
      var length = toLength$2(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$1;
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
    forEach: createMethod$2(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$2(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$2(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$2(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$2(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$2(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$2(6),
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod$2(7)
  };

  var fails$8 = fails$g;

  var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$8(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var $forEach$1 = arrayIteration.forEach;
  var arrayMethodIsStrict = arrayMethodIsStrict$1;

  var STRICT_METHOD = arrayMethodIsStrict('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
    return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var global$6 = global$j;
  var DOMIterables = domIterables;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$9;

  for (var COLLECTION_NAME in DOMIterables) {
    var Collection = global$6[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  }

  var wellKnownSymbolWrapped = {};

  var wellKnownSymbol$6 = wellKnownSymbol$f;

  wellKnownSymbolWrapped.f = wellKnownSymbol$6;

  var path = path$2;
  var has$4 = has$e;
  var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
  var defineProperty$4 = objectDefineProperty.f;

  var defineWellKnownSymbol$2 = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!has$4(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule$1.f(NAME)
    });
  };

  var defineWellKnownSymbol$1 = defineWellKnownSymbol$2;

  // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator
  defineWellKnownSymbol$1('iterator');

  var toInteger$1 = toInteger$4;
  var requireObjectCoercible$1 = requireObjectCoercible$4;

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$1 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible$1($this));
      var position = toInteger$1(pos);
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
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
  };

  var charAt = stringMultibyte.charAt;
  var InternalStateModule$1 = internalState;
  var defineIterator = defineIterator$2;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalState$1 = InternalStateModule$1.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState$1(this, {
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

  var objectGetOwnPropertyNamesExternal = {};

  /* eslint-disable es/no-object-getownpropertynames -- safe */

  var toIndexedObject$2 = toIndexedObject$7;
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
  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && toString.call(it) == '[object Window]'
      ? getWindowNames(it)
      : $getOwnPropertyNames$1(toIndexedObject$2(it));
  };

  var $$c = _export;
  var global$5 = global$j;
  var getBuiltIn$1 = getBuiltIn$5;
  var DESCRIPTORS$4 = descriptors;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var fails$7 = fails$g;
  var has$3 = has$e;
  var isArray$1 = isArray$3;
  var isObject$7 = isObject$e;
  var anObject$2 = anObject$8;
  var toObject$1 = toObject$5;
  var toIndexedObject$1 = toIndexedObject$7;
  var toPrimitive$2 = toPrimitive$5;
  var createPropertyDescriptor$1 = createPropertyDescriptor$5;
  var nativeObjectCreate = objectCreate;
  var objectKeys = objectKeys$2;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$2 = objectDefineProperty;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createNonEnumerableProperty = createNonEnumerableProperty$9;
  var redefine$3 = redefine$7.exports;
  var shared$1 = shared$5.exports;
  var sharedKey = sharedKey$4;
  var hiddenKeys$1 = hiddenKeys$6;
  var uid$1 = uid$4;
  var wellKnownSymbol$5 = wellKnownSymbol$f;
  var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var defineWellKnownSymbol = defineWellKnownSymbol$2;
  var setToStringTag = setToStringTag$3;
  var InternalStateModule = internalState;
  var $forEach = arrayIteration.forEach;

  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$5.Symbol;
  var $stringify = getBuiltIn$1('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  var nativeDefineProperty = definePropertyModule$2.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
  var AllSymbols = shared$1('symbols');
  var ObjectPrototypeSymbols = shared$1('op-symbols');
  var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
  var SymbolToStringRegistry = shared$1('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared$1('wks');
  var QObject = global$5.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = DESCRIPTORS$4 && fails$7(function () {
    return nativeObjectCreate(nativeDefineProperty({}, 'a', {
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
    var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
    setInternalState(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!DESCRIPTORS$4) symbol.description = description;
    return symbol;
  };

  var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return Object(it) instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject$2(O);
    var key = toPrimitive$2(P, true);
    anObject$2(Attributes);
    if (has$3(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has$3(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$1(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has$3(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject$2(O);
    var properties = toIndexedObject$1(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys, function (key) {
      if (!DESCRIPTORS$4 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPrimitive$2(V, true);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (this === ObjectPrototype && has$3(AllSymbols, P) && !has$3(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has$3(this, P) || !has$3(AllSymbols, P) || has$3(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject$1(O);
    var key = toPrimitive$2(P, true);
    if (it === ObjectPrototype && has$3(AllSymbols, key) && !has$3(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);
    if (descriptor && has$3(AllSymbols, key) && !(has$3(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject$1(O));
    var result = [];
    $forEach(names, function (key) {
      if (!has$3(AllSymbols, key) && !has$3(hiddenKeys$1, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$1(O));
    var result = [];
    $forEach(names, function (key) {
      if (has$3(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$3(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if (!NATIVE_SYMBOL) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
      var tag = uid$1(description);
      var setter = function (value) {
        if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
        if (has$3(this, HIDDEN) && has$3(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
      };
      if (DESCRIPTORS$4 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };

    redefine$3($Symbol[PROTOTYPE], 'toString', function toString() {
      return getInternalState(this).tag;
    });

    redefine$3($Symbol, 'withoutSetter', function (description) {
      return wrap(uid$1(description), description);
    });

    propertyIsEnumerableModule.f = $propertyIsEnumerable;
    definePropertyModule$2.f = $defineProperty;
    getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
    getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

    wrappedWellKnownSymbolModule.f = function (name) {
      return wrap(wellKnownSymbol$5(name), name);
    };

    if (DESCRIPTORS$4) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
      {
        redefine$3(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
      }
    }
  }

  $$c({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
    Symbol: $Symbol
  });

  $forEach(objectKeys(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol(name);
  });

  $$c({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function (key) {
      var string = String(key);
      if (has$3(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
      if (has$3(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });

  $$c({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$4 }, {
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

  $$c({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  $$c({ target: 'Object', stat: true, forced: fails$7(function () { getOwnPropertySymbolsModule.f(1); }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return getOwnPropertySymbolsModule.f(toObject$1(it));
    }
  });

  // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify
  if ($stringify) {
    var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$7(function () {
      var symbol = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      return $stringify([symbol]) != '[null]'
        // WebKit converts symbol values to JSON as null
        || $stringify({ a: symbol }) != '{}'
        // V8 throws on boxed symbols
        || $stringify(Object(symbol)) != '{}';
    });

    $$c({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;
        while (arguments.length > index) args.push(arguments[index++]);
        $replacer = replacer;
        if (!isObject$7(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
        if (!isArray$1(replacer)) replacer = function (key, value) {
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

  var $$b = _export;
  var DESCRIPTORS$3 = descriptors;
  var global$4 = global$j;
  var has$2 = has$e;
  var isObject$6 = isObject$e;
  var defineProperty$3 = objectDefineProperty.f;
  var copyConstructorProperties = copyConstructorProperties$2;

  var NativeSymbol = global$4.Symbol;

  if (DESCRIPTORS$3 && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
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
        var symbol = isObject$6(this) ? this.valueOf() : this;
        var string = symbolToString.call(symbol);
        if (has$2(EmptyStringDescriptionStore, symbol)) return '';
        var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });

    $$b({ global: true, forced: true }, {
      Symbol: SymbolWrapper
    });
  }

  // `SameValue` abstract operation
  // https://tc39.es/ecma262/#sec-samevalue
  // eslint-disable-next-line es/no-object-is -- safe
  var sameValue$1 = Object.is || function is(x, y) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };

  var $$a = _export;
  var is = sameValue$1;

  // `Object.is` method
  // https://tc39.es/ecma262/#sec-object.is
  $$a({ target: 'Object', stat: true }, {
    is: is
  });

  var $$9 = _export;

  // `Number.isNaN` method
  // https://tc39.es/ecma262/#sec-number.isnan
  $$9({ target: 'Number', stat: true }, {
    isNaN: function isNaN(number) {
      // eslint-disable-next-line no-self-compare -- NaN check
      return number != number;
    }
  });

  var isObject$5 = isObject$e;
  var setPrototypeOf = objectSetPrototypeOf;

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      setPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) == 'function' &&
      NewTarget !== Wrapper &&
      isObject$5(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) setPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  // a string of all valid unicode whitespaces
  var whitespaces$1 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var requireObjectCoercible = requireObjectCoercible$4;
  var whitespaces = whitespaces$1;

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

  var DESCRIPTORS$2 = descriptors;
  var global$3 = global$j;
  var isForced$1 = isForced_1;
  var redefine$2 = redefine$7.exports;
  var has$1 = has$e;
  var classof$1 = classofRaw$1;
  var inheritIfRequired$1 = inheritIfRequired$2;
  var toPrimitive$1 = toPrimitive$5;
  var fails$6 = fails$g;
  var create = objectCreate;
  var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var defineProperty$2 = objectDefineProperty.f;
  var trim = stringTrim.trim;

  var NUMBER = 'Number';
  var NativeNumber = global$3[NUMBER];
  var NumberPrototype = NativeNumber.prototype;

  // Opera ~12 has broken Object#toString
  var BROKEN_CLASSOF = classof$1(create(NumberPrototype)) == NUMBER;

  // `ToNumber` abstract operation
  // https://tc39.es/ecma262/#sec-tonumber
  var toNumber = function (argument) {
    var it = toPrimitive$1(argument, false);
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
  if (isForced$1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
    var NumberWrapper = function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var dummy = this;
      return dummy instanceof NumberWrapper
        // check on 1..constructor(foo) case
        && (BROKEN_CLASSOF ? fails$6(function () { NumberPrototype.valueOf.call(dummy); }) : classof$1(dummy) != NUMBER)
          ? inheritIfRequired$1(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
    };
    for (var keys$1 = DESCRIPTORS$2 ? getOwnPropertyNames$1(NativeNumber) : (
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
    redefine$2(global$3, NUMBER, NumberWrapper);
  }

  /*
   * Utils - Utility functions
   * @author Jack Moxley
   * @copyright Jack Moxley <https://github.com/jackmoxley>
   * @licence MIT
   */

  /**
   * Is the passed value not null and a function
   * @example <caption> test if its a function</caption>
   * const myFunc = () => 1 + 1;
   * Mootable.isFunction(myFunc) === true;
   * @example <caption> test if its not a function</caption>
   * const notAFunction = {};
   * Mootable.isFunction(notAFunction) === false;
   * @example <caption> test if its null</caption>
   * const notAFunction = null;
   * Mootable.isFunction(notAFunction) === false;
   * @param {function|*} func - the function/object to test
   * @returns {boolean} true if this is function and not null.
   */
  function isFunction(func) {
    return !!(func && func.constructor && func.call && func.apply);
  }
  /**
   * Is the passed object iterable and not null, i.e. it has a function that has a type of
   * [Symbol.iterator]
   * @example <caption> test if its iterable</caption>
   * class MyIterable {
   *     * [Symbol.iterator]() {
   *         yield 1;
   *     }
   * }
   * Mootable.isIterable(new MyIterable()) === true;
   * @example <caption> test if its not an iterable</caption>
   * const notAnIterable = {};
   * Mootable.isIterable(notAnIterable) === false;
   * @example <caption> test if its null</caption>
   * const notAnIterable = null;
   * Mootable.isIterable(notAnIterable) === false;
   * @param {Iterable|*} iterable - the object to test
   * @return {boolean} true if this has a Symbol.iterator function
   */

  function isIterable(iterable) {
    return !!(iterable && isFunction(iterable[Symbol.iterator]));
  }
  /**
   * Is the passed value is not null and is a string
   * @example <caption> test if its iterable</caption>
   * const myString = "hello world";
   * Mootable.isString(myString) === true;
   * @example <caption> test if its not an iterable</caption>
   * const notAString = {};
   * Mootable.isString(notAString) === false;
   * @example <caption> test if its null</caption>
   * const notAString = null;
   * Mootable.isString(notAString) === false;
   * @param {string|*} str - the string/object to test
   * @returns {boolean} true if this is a string
   */

  function isString(str) {
    // jshint ignore:line
    return !!(str && (typeof str === 'string' || str instanceof String));
  }
  /**
   * sameValue is the result of Object.is.
   * The only difference between sameValue and sameValueZero is that +0 and -0 are considered different with sameValue.
   * @see {@link https://262.ecma-international.org/6.0/#sec-samevalue sameValue}
   * @function
   * @param x - the first object to compare
   * @param y - the second object to compare
   * @returns {boolean} - if they are equals according to {@link https://262.ecma-international.org/6.0/#sec-samevalue ECMA Spec for Same Value}
   */

  var sameValue = Object.is;
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
   * The abstract Equals method <code>==</code>.
   * Simply does an abstract equality comparison <code>==</code> against 2 values
   * @see {@link https://262.ecma-international.org/6.0/#sec-abstract-equality-comparison abstractEquals}
   * @param x - the first object to compare
   * @param y - the second object to compare
   * @returns {boolean} - if they are equals according to {@link https://262.ecma-international.org/6.0/#sec-abstract-equality-comparison ECMA Spec for Abstract Equality}
   */

  function abstractEquals(x, y) {
    return x == y; // jshint ignore:line
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
  /**
   * Counts the number of ones in a binary representation of a 32 bit integer.
   * @example <caption> count the number of bits set to one for the value 22</caption>
   * const myNumber = 22; // 10110 in binary
   * Mootable.hammingWeight(myNumber) === 3;
   * @example <caption> count the number of bits set to one for the value 12947</caption>
   * const myNumber = 12947; // 11001010010011 in binary
   * Mootable.hammingWeight(myNumber) === 7;
   * @see {@link https://en.wikipedia.org/wiki/Hamming_weight hammingWeight}
   * @param {number} flags 32 bit integer
   * @return {number} amount of ones.
   */

  function hammingWeight(flags) {
    flags -= flags >>> 1 & 0x55555555;
    flags = (flags & 0x33333333) + (flags >>> 2 & 0x33333333);
    return (flags + (flags >> 4) & 0xF0F0F0F) * 0x1010101 >>> 24;
  }

  var fails$5 = fails$g;
  var wellKnownSymbol$4 = wellKnownSymbol$f;
  var V8_VERSION = engineV8Version;

  var SPECIES$2 = wellKnownSymbol$4('species');

  var arrayMethodHasSpeciesSupport$3 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION >= 51 || !fails$5(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$2] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$8 = _export;
  var $map = arrayIteration.map;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$3;

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  $$8({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $$7 = _export;
  var $find = arrayIteration.find;
  var addToUnscopables$1 = addToUnscopables$3;

  var FIND = 'find';
  var SKIPS_HOLES$1 = true;

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  $$7({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$1(FIND);

  var toPrimitive = toPrimitive$5;
  var definePropertyModule$1 = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$5;

  var createProperty$2 = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var $$6 = _export;
  var toAbsoluteIndex$1 = toAbsoluteIndex$3;
  var toInteger = toInteger$4;
  var toLength$1 = toLength$4;
  var toObject = toObject$5;
  var arraySpeciesCreate = arraySpeciesCreate$2;
  var createProperty$1 = createProperty$2;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$3;

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('splice');

  var max$1 = Math.max;
  var min = Math.min;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  $$6({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject(this);
      var len = toLength$1(O.length);
      var actualStart = toAbsoluteIndex$1(start, len);
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
      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
        throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty$1(A, k, O[from]);
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

  var $$5 = _export;
  var $findIndex = arrayIteration.findIndex;
  var addToUnscopables = addToUnscopables$3;

  var FIND_INDEX = 'findIndex';
  var SKIPS_HOLES = true;

  // Shouldn't skip holes
  if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findindex
  $$5({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND_INDEX);

  var $$4 = _export;
  var isObject$4 = isObject$e;
  var isArray = isArray$3;
  var toAbsoluteIndex = toAbsoluteIndex$3;
  var toLength = toLength$4;
  var toIndexedObject = toIndexedObject$7;
  var createProperty = createProperty$2;
  var wellKnownSymbol$3 = wellKnownSymbol$f;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$3;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

  var SPECIES$1 = wellKnownSymbol$3('species');
  var nativeSlice = [].slice;
  var max = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$4({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
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
        } else if (isObject$4(Constructor)) {
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

  var fails$4 = fails$g;

  var freezing = !fails$4(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var internalMetadata = {exports: {}};

  var hiddenKeys = hiddenKeys$6;
  var isObject$3 = isObject$e;
  var has = has$e;
  var defineProperty$1 = objectDefineProperty.f;
  var uid = uid$4;
  var FREEZING$1 = freezing;

  var METADATA = uid('meta');
  var id = 0;

  // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty$1(it, METADATA, { value: {
      objectID: 'O' + ++id, // object ID
      weakData: {}          // weak collections IDs
    } });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject$3(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!has(it, METADATA)) {
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
    if (!has(it, METADATA)) {
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
  var onFreeze$1 = function (it) {
    if (FREEZING$1 && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = internalMetadata.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze$1
  };

  hiddenKeys[METADATA] = true;

  var $$3 = _export;
  var FREEZING = freezing;
  var fails$3 = fails$g;
  var isObject$2 = isObject$e;
  var onFreeze = internalMetadata.exports.onFreeze;

  // eslint-disable-next-line es/no-object-freeze -- safe
  var $freeze = Object.freeze;
  var FAILS_ON_PRIMITIVES = fails$3(function () { $freeze(1); });

  // `Object.freeze` method
  // https://tc39.es/ecma262/#sec-object.freeze
  $$3({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
    freeze: function freeze(it) {
      return $freeze && isObject$2(it) ? $freeze(onFreeze(it)) : it;
    }
  });

  /**
   * Option - a class to get round nullable fields.
   * @author Jack Moxley
   * @copyright Jack Moxley <https://github.com/jackmoxley>
   * @licence MIT
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
   * we are effectively saying that null and undefined count as valid values.
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
   * HashMap Container Implementation for JavaScript
   * @author Jack Moxley
   * @copyright Jack Moxley <https://github.com/jackmoxley>
   * @licence MIT
   * Using an array this container stores key value pairs for our map.
   * This collection of entries is a leaf node of our Hash Array Trie.
   * As such all entries in the container will have the same hash. In most cases this will be single entry.
   * @private
   */

  var Container = /*#__PURE__*/function () {
    /**
     * Constructs an empty container.
     *
     * @param [HashMap] map - the map this container belongs too.
     * @param hash - the hash code for the keys in this container.
     */
    function Container(map, parent, hash) {
      _classCallCheck(this, Container);

      this.size = 0;
      this.contents = [];
      this.map = map;
      this.parent = parent;
      this.hash = hash;
    }
    /**
     * Does the provided hash conflict with this one, i.e. is it different.
     * This is used for ensuring only the correct keys are added.
     *
     * @param hash
     * @return {boolean}
     */


    _createClass(Container, [{
      key: "hashConflicts",
      value: function hashConflicts(hash) {
        return hash !== this.hash;
      }
      /**
       * Used to fetch the key and value.
       *
       * @param {*} key the key we use to retrieve the value.
       * @param options must contain the equals function for this key.
       * @return {*|undefined} the value for the key, or undefined if none available.
       */

    }, {
      key: "get",
      value: function get(key, options) {
        if (this.size !== 0) {
          var equals = options.equals;

          var _iterator = _createForOfIteratorHelper(this.contents),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var entry = _step.value;

              if (entry && equals(key, entry[0])) {
                return entry[1];
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
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

        var _iterator2 = _createForOfIteratorHelper(this.contents),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var entry = _step2.value;

            if (equals(key, entry[0])) {
              this.updateEntry(entry, value, options);
              return;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        this.createEntry(key, value, options);
      }
    }, {
      key: "emplace",
      value: function emplace(key, handler, options) {
        var equals = options.equals;

        var _iterator3 = _createForOfIteratorHelper(this.contents),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var entry = _step3.value;

            if (equals(key, entry[0])) {
              if ('update' in handler) {
                var _value = handler.update(entry[1], key, this.map);

                this.updateEntry(entry, _value, options);
                return _value;
              }

              return entry[1];
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        var value = handler.insert(key, this.map);
        this.createEntry(key, value, options);
        return value;
      }
    }, {
      key: "createEntry",
      value: function createEntry(key, value) {
        var entry = [key, value];
        entry.parent = this;
        this.contents.push(entry);
        this.size += 1;
        return entry;
      }
    }, {
      key: "updateEntry",
      value: function updateEntry(entry, newValue) {
        entry[1] = newValue;
      }
    }, {
      key: "deleteEntry",
      value: function deleteEntry(entry) {
        var idx = this.contents.indexOf(entry);

        if (idx !== -1) {
          this.deleteIndex(idx);
          var parent = this.parent;

          while (parent) {
            parent.size -= 1;
            parent = parent.parent;
          }
        }
      }
    }, {
      key: "deleteIndex",
      value: function deleteIndex(idx) {
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

        this.deleteIndex(idx);
        return true;
      }
    }, {
      key: Symbol.iterator,
      value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
        var _iterator4, _step4, entry;

        return regeneratorRuntime.wrap(function value$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iterator4 = _createForOfIteratorHelper(this.contents);
                _context.prev = 1;

                _iterator4.s();

              case 3:
                if ((_step4 = _iterator4.n()).done) {
                  _context.next = 9;
                  break;
                }

                entry = _step4.value;
                _context.next = 7;
                return entry.slice();

              case 7:
                _context.next = 3;
                break;

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);

                _iterator4.e(_context.t0);

              case 14:
                _context.prev = 14;

                _iterator4.f();

                return _context.finish(14);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, value, this, [[1, 11, 14, 17]]);
      })
    }, {
      key: "entriesRight",
      value: /*#__PURE__*/regeneratorRuntime.mark(function entriesRight() {
        var idx;
        return regeneratorRuntime.wrap(function entriesRight$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                idx = this.contents.length - 1;

              case 1:
                if (!(idx >= 0)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return this.contents[idx].slice();

              case 4:
                idx--;
                _context2.next = 1;
                break;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, entriesRight, this);
      })
    }, {
      key: "keys",
      value: /*#__PURE__*/regeneratorRuntime.mark(function keys() {
        var _iterator5, _step5, entry;

        return regeneratorRuntime.wrap(function keys$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _iterator5 = _createForOfIteratorHelper(this.contents);
                _context3.prev = 1;

                _iterator5.s();

              case 3:
                if ((_step5 = _iterator5.n()).done) {
                  _context3.next = 9;
                  break;
                }

                entry = _step5.value;
                _context3.next = 7;
                return entry[0];

              case 7:
                _context3.next = 3;
                break;

              case 9:
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](1);

                _iterator5.e(_context3.t0);

              case 14:
                _context3.prev = 14;

                _iterator5.f();

                return _context3.finish(14);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, keys, this, [[1, 11, 14, 17]]);
      })
    }, {
      key: "values",
      value: /*#__PURE__*/regeneratorRuntime.mark(function values() {
        var _iterator6, _step6, entry;

        return regeneratorRuntime.wrap(function values$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _iterator6 = _createForOfIteratorHelper(this.contents);
                _context4.prev = 1;

                _iterator6.s();

              case 3:
                if ((_step6 = _iterator6.n()).done) {
                  _context4.next = 9;
                  break;
                }

                entry = _step6.value;
                _context4.next = 7;
                return entry[1];

              case 7:
                _context4.next = 3;
                break;

              case 9:
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](1);

                _iterator6.e(_context4.t0);

              case 14:
                _context4.prev = 14;

                _iterator6.f();

                return _context4.finish(14);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, values, this, [[1, 11, 14, 17]]);
      })
    }, {
      key: "keysRight",
      value: /*#__PURE__*/regeneratorRuntime.mark(function keysRight() {
        var idx;
        return regeneratorRuntime.wrap(function keysRight$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                idx = this.contents.length - 1;

              case 1:
                if (!(idx >= 0)) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 4;
                return this.contents[idx][0];

              case 4:
                idx--;
                _context5.next = 1;
                break;

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, keysRight, this);
      })
    }, {
      key: "valuesRight",
      value: /*#__PURE__*/regeneratorRuntime.mark(function valuesRight() {
        var idx;
        return regeneratorRuntime.wrap(function valuesRight$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                idx = this.contents.length - 1;

              case 1:
                if (!(idx >= 0)) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 4;
                return this.contents[idx][1];

              case 4:
                idx--;
                _context6.next = 1;
                break;

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, valuesRight, this);
      })
    }]);

    return Container;
  }();

  var SHIFT = 7;
  var WIDTH = 1 << SHIFT;
  var MASK = WIDTH - 1;
  var DEPTH = 5;
  var SHIFT_HAMT = 5;
  var WIDTH_HAMT = 1 << SHIFT_HAMT;
  var MASK_HAMT = WIDTH_HAMT - 1;
  var DEPTH_HAMT = DEPTH - 1;
  /**
   * @private
   * @author Jack Moxley
   * @copyright Jack Moxley <https://github.com/jackmoxley>
   * @licence MIT
   */

  var HashBuckets = /*#__PURE__*/function () {
    function HashBuckets(map) {
      _classCallCheck(this, HashBuckets);

      this.map = map;
      this.buckets = [];
      this.size = 0;
    }

    _createClass(HashBuckets, [{
      key: "clear",
      value: function clear() {
        this.buckets = [];
        this.size = 0;
      }
    }, {
      key: "bucketFor",
      value: function bucketFor(hash) {
        var idx = hash & MASK;

        if (idx < this.buckets.length) {
          return this.buckets[idx];
        }

        return undefined;
      }
    }, {
      key: "set",
      value: function set(key, value, options) {
        var hash = options.hash;
        var idx = hash & MASK;
        var bucket = this.buckets[idx];

        if (!bucket) {
          bucket = this.map.createContainer(this, hash);
          bucket.createEntry(key, value, options);
          this.buckets[idx] = bucket;
          this.size += 1;
          return;
        } else if (bucket.hashConflicts(hash)) {
          bucket = new HamtBuckets(this.map, this, DEPTH_HAMT, SHIFT).replacing(bucket);
          this.buckets[idx] = bucket;
        }

        this.size -= bucket.size;
        bucket.set(key, value, options);
        this.size += bucket.size;
      }
    }, {
      key: "emplace",
      value: function emplace(key, handler, options) {
        var hash = options.hash;
        var idx = hash & MASK;
        var bucket = this.buckets[idx];

        if (!bucket) {
          bucket = this.map.createContainer(this, hash);
          this.buckets[idx] = bucket;
        } else if (bucket.hashConflicts(hash)) {
          bucket = new HamtBuckets(this.map, this, DEPTH_HAMT, SHIFT).replacing(bucket);
          this.buckets[idx] = bucket;
        }

        this.size -= bucket.size;
        var value = bucket.emplace(key, handler, options);
        this.size += bucket.size;
        return value;
      }
    }, {
      key: "delete",
      value: function _delete(key, options) {
        var hash = options.hash;
        var idx = hash & MASK;
        var bucket = this.buckets[idx];

        if (bucket) {
          var deleted = bucket.delete(key, options);

          if (deleted) {
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
        var _iterator, _step, bucket;

        return regeneratorRuntime.wrap(function value$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iterator = _createForOfIteratorHelper(this.buckets);
                _context.prev = 1;

                _iterator.s();

              case 3:
                if ((_step = _iterator.n()).done) {
                  _context.next = 9;
                  break;
                }

                bucket = _step.value;

                if (!bucket) {
                  _context.next = 7;
                  break;
                }

                return _context.delegateYield(bucket, "t0", 7);

              case 7:
                _context.next = 3;
                break;

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t1 = _context["catch"](1);

                _iterator.e(_context.t1);

              case 14:
                _context.prev = 14;

                _iterator.f();

                return _context.finish(14);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, value, this, [[1, 11, 14, 17]]);
      })
    }, {
      key: "entriesRight",
      value: /*#__PURE__*/regeneratorRuntime.mark(function entriesRight() {
        var idx, bucket;
        return regeneratorRuntime.wrap(function entriesRight$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                idx = this.buckets.length - 1;

              case 1:
                if (!(idx >= 0)) {
                  _context2.next = 8;
                  break;
                }

                bucket = this.buckets[idx];

                if (!bucket) {
                  _context2.next = 5;
                  break;
                }

                return _context2.delegateYield(bucket.entriesRight(), "t0", 5);

              case 5:
                idx--;
                _context2.next = 1;
                break;

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, entriesRight, this);
      })
    }, {
      key: "keys",
      value: /*#__PURE__*/regeneratorRuntime.mark(function keys() {
        var _iterator2, _step2, bucket;

        return regeneratorRuntime.wrap(function keys$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _iterator2 = _createForOfIteratorHelper(this.buckets);
                _context3.prev = 1;

                _iterator2.s();

              case 3:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.next = 9;
                  break;
                }

                bucket = _step2.value;

                if (!bucket) {
                  _context3.next = 7;
                  break;
                }

                return _context3.delegateYield(bucket.keys(), "t0", 7);

              case 7:
                _context3.next = 3;
                break;

              case 9:
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t1 = _context3["catch"](1);

                _iterator2.e(_context3.t1);

              case 14:
                _context3.prev = 14;

                _iterator2.f();

                return _context3.finish(14);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, keys, this, [[1, 11, 14, 17]]);
      })
    }, {
      key: "values",
      value: /*#__PURE__*/regeneratorRuntime.mark(function values() {
        var _iterator3, _step3, bucket;

        return regeneratorRuntime.wrap(function values$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _iterator3 = _createForOfIteratorHelper(this.buckets);
                _context4.prev = 1;

                _iterator3.s();

              case 3:
                if ((_step3 = _iterator3.n()).done) {
                  _context4.next = 9;
                  break;
                }

                bucket = _step3.value;

                if (!bucket) {
                  _context4.next = 7;
                  break;
                }

                return _context4.delegateYield(bucket.values(), "t0", 7);

              case 7:
                _context4.next = 3;
                break;

              case 9:
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t1 = _context4["catch"](1);

                _iterator3.e(_context4.t1);

              case 14:
                _context4.prev = 14;

                _iterator3.f();

                return _context4.finish(14);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, values, this, [[1, 11, 14, 17]]);
      })
    }, {
      key: "keysRight",
      value: /*#__PURE__*/regeneratorRuntime.mark(function keysRight() {
        var idx, bucket;
        return regeneratorRuntime.wrap(function keysRight$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                idx = this.buckets.length - 1;

              case 1:
                if (!(idx >= 0)) {
                  _context5.next = 8;
                  break;
                }

                bucket = this.buckets[idx];

                if (!bucket) {
                  _context5.next = 5;
                  break;
                }

                return _context5.delegateYield(bucket.keysRight(), "t0", 5);

              case 5:
                idx--;
                _context5.next = 1;
                break;

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, keysRight, this);
      })
    }, {
      key: "valuesRight",
      value: /*#__PURE__*/regeneratorRuntime.mark(function valuesRight() {
        var idx, bucket;
        return regeneratorRuntime.wrap(function valuesRight$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                idx = this.buckets.length - 1;

              case 1:
                if (!(idx >= 0)) {
                  _context6.next = 8;
                  break;
                }

                bucket = this.buckets[idx];

                if (!bucket) {
                  _context6.next = 5;
                  break;
                }

                return _context6.delegateYield(bucket.valuesRight(), "t0", 5);

              case 5:
                idx--;
                _context6.next = 1;
                break;

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, valuesRight, this);
      })
    }]);

    return HashBuckets;
  }();
  /**
   * @private
   */

  var HamtBuckets = /*#__PURE__*/function () {
    function HamtBuckets(map, parent, depth, shift) {
      _classCallCheck(this, HamtBuckets);

      this.map = map;
      this.parent = parent;
      this.buckets = [];
      this.size = 0;
      this.idxFlags = 0;
      this.depth = depth;
      this.shift = shift;
    }

    _createClass(HamtBuckets, [{
      key: "hashConflicts",
      value: function hashConflicts() {
        return false;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.size = 0;
        this.buckets = [];
        this.idxFlags = 0;
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
        oldBucket.parent = this;
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
            bucket = new HamtBuckets(this.map, this, this.depth - 1, this.shift + SHIFT_HAMT).replacing(bucket);
            this.buckets[idx] = bucket;
          }

          this.size -= bucket.size;
          bucket.set(key, value, options);
          this.size += bucket.size;
        } else {
          bucket = this.map.createContainer(this, hash);
          bucket.createEntry(key, value, options);
          this.buckets.splice(idx, 0, bucket);
          this.idxFlags |= flag;
          this.size += 1;
        }
      }
    }, {
      key: "emplace",
      value: function emplace(key, handler, options) {
        var hash = options.hash;
        var idxFlags = this.idxFlags;
        var hashIdx = hash >>> this.shift & MASK_HAMT;
        var flag = 1 << hashIdx;
        var idx = hammingWeight(idxFlags & flag - 1);
        var bucket;

        if (idxFlags & flag) {
          bucket = this.buckets[idx];

          if (this.depth && bucket.hashConflicts(hash)) {
            bucket = new HamtBuckets(this.map, this, this.depth - 1, this.shift + SHIFT_HAMT).replacing(bucket);
            this.buckets[idx] = bucket;
          }
        } else {
          bucket = this.map.createContainer(this, hash);
          this.buckets.splice(idx, 0, bucket);
          this.idxFlags |= flag;
        }

        this.size -= bucket.size;
        var value = bucket.emplace(key, handler, options);
        this.size += bucket.size;
        return value;
      }
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
              } else if (this.buckets.length === idx + 1) {
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
        var _iterator4, _step4, bucket;

        return regeneratorRuntime.wrap(function value$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _iterator4 = _createForOfIteratorHelper(this.buckets);
                _context7.prev = 1;

                _iterator4.s();

              case 3:
                if ((_step4 = _iterator4.n()).done) {
                  _context7.next = 8;
                  break;
                }

                bucket = _step4.value;
                return _context7.delegateYield(bucket, "t0", 6);

              case 6:
                _context7.next = 3;
                break;

              case 8:
                _context7.next = 13;
                break;

              case 10:
                _context7.prev = 10;
                _context7.t1 = _context7["catch"](1);

                _iterator4.e(_context7.t1);

              case 13:
                _context7.prev = 13;

                _iterator4.f();

                return _context7.finish(13);

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, value, this, [[1, 10, 13, 16]]);
      })
    }, {
      key: "entriesRight",
      value: /*#__PURE__*/regeneratorRuntime.mark(function entriesRight() {
        var idx;
        return regeneratorRuntime.wrap(function entriesRight$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                idx = this.buckets.length - 1;

              case 1:
                if (!(idx >= 0)) {
                  _context8.next = 6;
                  break;
                }

                return _context8.delegateYield(this.buckets[idx].entriesRight(), "t0", 3);

              case 3:
                idx--;
                _context8.next = 1;
                break;

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, entriesRight, this);
      })
    }, {
      key: "keys",
      value: /*#__PURE__*/regeneratorRuntime.mark(function keys() {
        var _iterator5, _step5, bucket;

        return regeneratorRuntime.wrap(function keys$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _iterator5 = _createForOfIteratorHelper(this.buckets);
                _context9.prev = 1;

                _iterator5.s();

              case 3:
                if ((_step5 = _iterator5.n()).done) {
                  _context9.next = 8;
                  break;
                }

                bucket = _step5.value;
                return _context9.delegateYield(bucket.keys(), "t0", 6);

              case 6:
                _context9.next = 3;
                break;

              case 8:
                _context9.next = 13;
                break;

              case 10:
                _context9.prev = 10;
                _context9.t1 = _context9["catch"](1);

                _iterator5.e(_context9.t1);

              case 13:
                _context9.prev = 13;

                _iterator5.f();

                return _context9.finish(13);

              case 16:
              case "end":
                return _context9.stop();
            }
          }
        }, keys, this, [[1, 10, 13, 16]]);
      })
    }, {
      key: "values",
      value: /*#__PURE__*/regeneratorRuntime.mark(function values() {
        var _iterator6, _step6, bucket;

        return regeneratorRuntime.wrap(function values$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _iterator6 = _createForOfIteratorHelper(this.buckets);
                _context10.prev = 1;

                _iterator6.s();

              case 3:
                if ((_step6 = _iterator6.n()).done) {
                  _context10.next = 8;
                  break;
                }

                bucket = _step6.value;
                return _context10.delegateYield(bucket.values(), "t0", 6);

              case 6:
                _context10.next = 3;
                break;

              case 8:
                _context10.next = 13;
                break;

              case 10:
                _context10.prev = 10;
                _context10.t1 = _context10["catch"](1);

                _iterator6.e(_context10.t1);

              case 13:
                _context10.prev = 13;

                _iterator6.f();

                return _context10.finish(13);

              case 16:
              case "end":
                return _context10.stop();
            }
          }
        }, values, this, [[1, 10, 13, 16]]);
      })
    }, {
      key: "keysRight",
      value: /*#__PURE__*/regeneratorRuntime.mark(function keysRight() {
        var idx;
        return regeneratorRuntime.wrap(function keysRight$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                idx = this.buckets.length - 1;

              case 1:
                if (!(idx >= 0)) {
                  _context11.next = 6;
                  break;
                }

                return _context11.delegateYield(this.buckets[idx].keysRight(), "t0", 3);

              case 3:
                idx--;
                _context11.next = 1;
                break;

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, keysRight, this);
      })
    }, {
      key: "valuesRight",
      value: /*#__PURE__*/regeneratorRuntime.mark(function valuesRight() {
        var idx;
        return regeneratorRuntime.wrap(function valuesRight$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                idx = this.buckets.length - 1;

              case 1:
                if (!(idx >= 0)) {
                  _context12.next = 6;
                  break;
                }

                return _context12.delegateYield(this.buckets[idx].valuesRight(), "t0", 3);

              case 3:
                idx--;
                _context12.next = 1;
                break;

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, valuesRight, this);
      })
    }]);

    return HamtBuckets;
  }();

  var global$2 = global$j;

  var globalIsFinite = global$2.isFinite;

  // `Number.isFinite` method
  // https://tc39.es/ecma262/#sec-number.isfinite
  // eslint-disable-next-line es/no-number-isfinite -- safe
  var numberIsFinite$1 = Number.isFinite || function isFinite(it) {
    return typeof it == 'number' && globalIsFinite(it);
  };

  var $$2 = _export;
  var numberIsFinite = numberIsFinite$1;

  // `Number.isFinite` method
  // https://tc39.es/ecma262/#sec-number.isfinite
  $$2({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

  var isObject$1 = isObject$e;

  var floor = Math.floor;

  // `Number.isInteger` method implementation
  // https://tc39.es/ecma262/#sec-number.isinteger
  var isInteger$1 = function isInteger(it) {
    return !isObject$1(it) && isFinite(it) && floor(it) === it;
  };

  var $$1 = _export;
  var isInteger = isInteger$1;

  var abs = Math.abs;

  // `Number.isSafeInteger` method
  // https://tc39.es/ecma262/#sec-number.issafeinteger
  $$1({ target: 'Number', stat: true }, {
    isSafeInteger: function isSafeInteger(number) {
      return isInteger(number) && abs(number) <= 0x1FFFFFFFFFFFFF;
    }
  });

  var anObject$1 = anObject$8;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$1(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var redefine$1 = redefine$7.exports;
  var anObject = anObject$8;
  var fails$2 = fails$g;
  var flags = regexpFlags$1;

  var TO_STRING = 'toString';
  var RegExpPrototype$1 = RegExp.prototype;
  var nativeToString = RegExpPrototype$1[TO_STRING];

  var NOT_GENERIC = fails$2(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine$1(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? flags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  var isObject = isObject$e;
  var classof = classofRaw$1;
  var wellKnownSymbol$2 = wellKnownSymbol$f;

  var MATCH$1 = wellKnownSymbol$2('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
  };

  var regexpStickyHelpers = {};

  var fails$1 = fails$g;

  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
  // so we use an intermediate function.
  function RE(s, f) {
    return RegExp(s, f);
  }

  regexpStickyHelpers.UNSUPPORTED_Y = fails$1(function () {
    // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
    var re = RE('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  regexpStickyHelpers.BROKEN_CARET = fails$1(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = RE('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var getBuiltIn = getBuiltIn$5;
  var definePropertyModule = objectDefineProperty;
  var wellKnownSymbol$1 = wellKnownSymbol$f;
  var DESCRIPTORS$1 = descriptors;

  var SPECIES = wellKnownSymbol$1('species');

  var setSpecies$1 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule.f;

    if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES]) {
      defineProperty(Constructor, SPECIES, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var DESCRIPTORS = descriptors;
  var global$1 = global$j;
  var isForced = isForced_1;
  var inheritIfRequired = inheritIfRequired$2;
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var isRegExp = isRegexp;
  var getFlags = regexpFlags$1;
  var stickyHelpers$1 = regexpStickyHelpers;
  var redefine = redefine$7.exports;
  var fails = fails$g;
  var enforceInternalState = internalState.enforce;
  var setSpecies = setSpecies$1;
  var wellKnownSymbol = wellKnownSymbol$f;

  var MATCH = wellKnownSymbol('match');
  var NativeRegExp = global$1.RegExp;
  var RegExpPrototype = NativeRegExp.prototype;
  var re1 = /a/g;
  var re2 = /a/g;

  // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;

  var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;

  var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y$1 || fails(function () {
    re2[MATCH] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  })));

  // `RegExp` constructor
  // https://tc39.es/ecma262/#sec-regexp-constructor
  if (FORCED) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = this instanceof RegExpWrapper;
      var patternIsRegExp = isRegExp(pattern);
      var flagsAreUndefined = flags === undefined;
      var sticky;

      if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
        return pattern;
      }

      if (CORRECT_NEW) {
        if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
      } else if (pattern instanceof RegExpWrapper) {
        if (flagsAreUndefined) flags = getFlags.call(pattern);
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

      if (UNSUPPORTED_Y$1 && sticky) {
        var state = enforceInternalState(result);
        state.sticky = true;
      }

      return result;
    };
    var proxy = function (key) {
      key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
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

  /* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var regexpFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var shared = shared$5.exports;

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

  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
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

  var $ = _export;
  var exec = regexpExec;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
    exec: exec
  });

  /*
   * Hash - Hash functions
   * @author Jack Moxley
   * @copyright Jack Moxley <https://github.com/jackmoxley>
   * @licence MIT
   * @copyright Jack Moxley <https://github.com/jackmoxley>
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


          if (Object.prototype.hasOwnProperty.call(key, '_mootable_hashCode')) {
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

  function equalsAndHash(key, options) {
    if (options) {
      var _hash = options.hash;
      var equals = options.equals;

      if (isFunction(_hash)) {
        _hash = _hash(key);
      }

      if (!Number.isSafeInteger(_hash)) {
        _hash = hashCodeFor(key);
      }

      if (!isFunction(equals)) {
        equals = equalsFor(key);
      }

      return {
        hash: _hash,
        equals: equals
      };
    }

    var toSetOn = {};

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


          if (Object.prototype.hasOwnProperty.call(key, '_mootable_hashCode')) {
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

  /**
   * This HashMap is backed by a Hash array mapped trie.
   * @author Jack Moxley
   * @copyright Jack Moxley <https://github.com/jackmoxley>
   * @licence MIT
   */

  var HashMap = /*#__PURE__*/function () {
    /**
     * This HashMap is backed by a Hash array mapped trie.
     * - `new HashMap()` creates an empty hashmap
     * - `new HashMap(copy:Iterable)` creates a hashmap which is a copy of the provided iterable.
     *   - One of
     *      - an object that provides a [Symbol.Iterator] function with the same signature as `Map.[Symbol.Iterator]`, such as `Map` or this `HashMap` and `LinkedHashMap`
     *          - or a 2 dimensional key-value array, e.g. `[['key1','val1'], ['key2','val2']]`.
     *      - an object that provides a entries function with the same signature as `Map.entries`, such as `Map` or this `HashMap` and `LinkedHashMap`
     *      - an object that provides a forEach function with the same signature as `Map.forEach`, such as `Map` or this `HashMap` and `LinkedHashMap`
     *
     * Although this hashmap has no fixed guarantee on how it orders its elements, it does
     * maintain an order, undecipherable as it maybe, first by hashcode, and then by by order of
     * insertion. As such methods that iterate forwards and the equivalent backwards (Right)
     * methods are correct in the order of which values returned, and are in reverse to one another.
     *
     * However these reverse methods are more valuable when used on an ordered map such as the
     * {@link LinkedHashMap}, which maintains and provides control for the order of insertion.
     *
     * @example <caption>Create an empty HashMap</caption>
     * const hashmap = new HashMap();
     * // hashmap.size === 0;
     * @example <caption>Create HashMap from an array of key value pairs</caption>
     * const arr = [[1,'value1'],[2,'value2'],[3,'value3']];
     * const hashmap = new HashMap(arr);
     * // hashmap.size === 3;
     * @example <caption>Create HashMap from another map</caption>
     * const map = new Map([[1,'value1'],[2,'value2'],[3,'value3']])
     * const hashmap = new HashMap(map);
     * // hashmap.size === 3;
     * @example <caption>Create HashMap from another HashMap</caption>
     * const first = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']])
     * const hashmap = new HashMap(first);
     * // hashmap.size === 3;
     * @example <caption>Create HashMap from a class with symbol iterator</caption>
     * class MyIterable = {
     *     *[Symbol.iterator] () {
     *         yield ["key1", "value1"];
     *         yield ["key2", "value2"];
     *         yield ["key3", "value3"];
     *         yield ["key4", "value4"];
     *     }
     * }
     * const iterable = new MyIterable();
     * const hashmap = new HashMap(iterable);
     * // hashmap.size === 4;
     * // it doesn't have to be a generator, an iterator works too.
     * @example <caption>Create HashMap from an object with an entries generator function</caption>
     * const entriesObj = {
     *     entries: function* () {
     *         yield ["key1", "value1"];
     *         yield ["key2", "value2"];
     *         yield ["key3", "value3"];
     *         yield ["key4", "value4"];
     *     }
     * }
     * const hashmap = new HashMap(entriesObj);
     * // hashmap.size === 4;
     * // it doesn't have to be a generator, an iterator works too.
     * @example <caption>Create HashMap from an object with a forEach function</caption>
     * const forEachObj = {
     *      forEach: (callback, ctx) => {
     *              for (let i = 1; i <= 4; i++) {
     *                  callback.call(ctx, 'value' + i, 'key' + i);
     *              }
     *      }
     * };
     * const hashmap = new HashMap(forEachObj);
     * // hashmap.size === 4;
     * @param {(Map|HashMap|LinkedHashMap|Iterable.<Array.<key,value>>|Object)} [copy]
     */
    function HashMap(copy) {
      _classCallCheck(this, HashMap);

      this.buckets = new HashBuckets(this);

      if (copy) {
        this.copy(copy);
      }
    }
    /**
     * User Defined Equals Method
     * A user defined function to define an equals method against 2 keys.
     * @callback HashMap#overrideEquals
     * @param {*} firstKey - the first key.
     * @param {*} secondKey - the second key
     * @returns {boolean} is it equal or not
     */

    /**
     * User Defined Hash Method
     * A user defined function to describe how to hash a key.
     * @callback HashMap#overrideHash
     * @param {*} key - the first key.
     * @returns {number} a 32 bit integer as a hash.
     */

    /**
     * User defined hashing and equals methods
     * HashMap will find the best fit for your objects, and if your keys themselves have the appropriate methods,
     * then it will use them. However if you want to override that functionality this object allows you to do it.
     * Not all functions and properties are used in every function, please refer to that function for details.
     * If a function in future chooses to use one of the other properties or functions, it will NOT be marked as a breaking change.
     * So be explicit.
     * @typedef {Object} HashMap#overrides
     * @property {number|HashMap#overrideHash} [hash] - The overriding hash value, or method to use.
     * @property {HashMap#overrideEquals} [equals] - The overriding equals method to use
     * @property {boolean} [reverse] - whether to search in reverse.
     */

    /**
     * Emplace Update Method
     * A user defined method to describe how to update our map.
     * @callback HashMap#emplaceUpdate
     * @param {*} oldValue - the oldValue to update.
     * @param {*} key - the key to the entry.
     * @param {HashMap} map - the hashmap.
     * @returns {*} the new value to update the map with.
     */

    /**
     * Emplace Insert Method
     * A user defined method to describe how to insert into our map.
     * @callback HashMap#emplaceInsert
     * @param {*} key - the key to the entry.
     * @param {HashMap} map - the hashmap.
     * @returns {*} the new value we want to insert.
     */

    /**
     * Emplace handler methods
     * - Let M be this hashmap.
     * - For each Record { [[Key]], [[Value]] } e that is an element of entries, do
     *  - If Equal(e.[[Key]], key) is true, then
     *   - If HasProperty(handler, "update") is true, then
     *     - Let updateFn be ? Get(handler, "update").
     *     - Let updated be ? Call(updateFn, handler, « e.[[Value]], key, M »).
     *     - Set e.[[Value]] to updated.
     *   - Return e.[[Value]].
     * - Let insertFn be ? Get(handler, "insert").
     * - Let inserted be ? Call(insertFn, handler, « e.[[Value]], key, M »).
     * - Set e.[[Value]] to inserted.
     * - Return e.[[Value]].
     * @typedef {Object} HashMap#emplaceHandler
     * @property {HashMap#emplaceUpdate} [update] - The update method to use.
     * @property {HashMap#emplaceInsert} [insert] - The insert method to use
     */

    /**
     * For Each Function
     * A callback to execute on every <code>[key,value]</code> pair of this map iterable.
     * @example <caption>log the keys and values</caption>
     * const forEachFunction = (value, key) => console.log(key,value)
     * @callback HashMap#ForEachCallback
     * @param {*} [value] - the entry value.
     * @param {*} [key] - the entry key
     * @param {HashMap} [map] - the calling Map Iterable.
     */

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
     * @callback HashMap#MatchesPredicate
     * @param {*} [value] - the entry value.
     * @param {*} [key] - the entry key
     * @param {HashMap} [iterable] - the HashMap.
     * @return {boolean} a value that coerces to true if it matches, or to false otherwise.
     */

    /**
     * Reduce Function
     * A callback to accumulate values from the HashMap <code>[key,value]</code> into a single value.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce|Array.reduce}
     * @example <caption>add all the keys</caption>
     * const reduceFunction = (accumulator, value, key) => accumulator+key
     * @callback HashMap#ReduceFunction
     * @param {*} [accumulator] - the value from the last execution of this function.
     * @param {*} [value] - the entry value.
     * @param {*} [key] - the entry key
     * @param {HashMap} [hashmap] - the calling HashMap.
     * @return {*} [accumulator] - the value to pass to the next time this function is called or the final return value.
     */

    /**
     * Returns the number of elements in this hashmap.
     *
     * @example
     * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
     * const size = hashmap.size;
     * console.log(size);
     * // logs: 3
     * @return {number} the number of elements in the array
     */


    _createClass(HashMap, [{
      key: "size",
      get: function get() {
        return this.buckets.size;
      }
      /**
       * Returns the number of elements in this hashmap.
       *
       * @example
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const length = hashmap.length;
       * console.log(length);
       * // logs: 3
       * @return {number} the number of elements in the array
       */

    }, {
      key: "length",
      get: function get() {
        return this.buckets.size;
      }
      /**
       * Does the map have this key.
       * - return true if the <code>key</code> is in the map.
       * - if no elements match, it returns false.
       * - it is legitimate for keys to be null or undefined.
       *
       * Maps typically index keys, and so is generally a fast operation.
       * @example <caption>Does this contain a key that is there</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const hasResult = hashmap.has(1);
       * // hasResult === true
       * @example <caption>Does this contain a key that isn't there</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const hasResult = hashmap.has(4);
       * // hasResult === false
       * @example <caption>Advanced: using a predefined hashCode and equals on the key</caption>
       * class NameKey {
       *     constructor(firstName, secondName) {
       *         this.firstName = firstName;
       *         this.secondName = secondName;
       *     }
       *     hashCode() {
       *          return (Mootable.hash(firstName) * 31) +Mootable.hash(secondName);
       *     }
       *     equals(other) {
       *          return other && other instanceof NameKey && other.firstName === this.firstName && other.secondName === this.secondName;
       *     }
       * }
       * const hashmap = new HashMap([[new NameKey('John','Smith'),'Librarian'],[new NameKey('Orlando','Keleshian'),'Engineer']]);
       * const key = new NameKey('John','Smith');
       * const hasResult = hashmap.has(key);
       * // hasResult === true
       * @example <caption>Advanced: using a custom hash and equals, to determine if there are entries for a specific hash</caption>
       * const myHash = 3;
       * const hashEquals = {hash: myHash, equals: () => true}
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const hasResult = hashmap.has(0, hashEquals);
       * // hasResult === true
       * // the hash of the number 3 is actually also 3. all 32 bit integers have the same hash.
       * // 0 doesn't exist in the hashMap, but we are circumventing using the key entirely.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has|Map.has}
       * @param {*} key - the matching key we use to identify if we have a match.
       * @param {HashMap#overrides<equals, hash>} [overrides] - a set of optional overrides to allow a user to define the hash and equals methods, rather than them being looked up.
       * @returns {boolean} - if it holds the key or not.
       */

    }, {
      key: "has",
      value: function has(key, overrides) {
        var op = this.equalsAndHash(key, overrides);
        return this.buckets.has(key, op);
      }
      /**
       * Get a value from the map using this key.
       * - return the first <code>value</code> from the <code>[key,value]</code> pair that matches the key.
       * - if no elements match, it returns undefined.
       * - it is legitimate for keys to be null or undefined, and if set, will find a value.
       * - it is also legitimate for values to be null or undefined, as such get should never be used as an existence check. {@see HashMap#optionalGet}
       * Also provides a way to override both the equals and the hash
       * Performance:
       *  - will be O(1) approaching O(log n)
       * @example <caption>What is the value for a key</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const getResult = hashmap.get(1);
       * // getResult === 'value1'
       * @example <caption>What is the value for a key that isn't there</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const getResult = hashmap.get(4);
       * // getResult === undefined
       * @example <caption>Advanced: using a predefined hashCode and equals on the key</caption>
       * class NameKey {
       *     constructor(firstName, secondName) {
       *         this.firstName = firstName;
       *         this.secondName = secondName;
       *     }
       *     hashCode() {
       *          return (Mootable.hash(firstName) * 31) +Mootable.hash(secondName);
       *     }
       *     equals(other) {
       *          return other && other instanceof NameKey && other.firstName === this.firstName && other.secondName === this.secondName;
       *     }
       * }
       * const hashmap = new HashMap([[new NameKey('John','Smith'),'Librarian'],[new NameKey('Orlando','Keleshian'),'Engineer']]);
       * const key = new NameKey('John','Smith');
       * const getResult = hashmap.get(key);
       * // getResult === 'Librarian'
       * @example <caption>Advanced: using a custom hash and equals, to get the first entry for a specific hash</caption>
       * const myHash = 3;
       * const hashEquals = {hash: myHash, equals: () => true}
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const getResult = hashmap.get(0, hashEquals);
       * // getResult === 'value3'
       * // the hash of the number 3 is actually also 3. all 32 bit integers have the same hash.
       * // 0 doesn't exist in the hashMap, but we are circumventing using the key entirely.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get|Map.get}
       * @param {*} key - the matching key we use to identify if we have a match.
       * @param {HashMap#overrides<equals, hash>} [overrides] - a set of optional overrides to allow a user to define the hashcode and equals methods, rather than them being looked up.
       * @returns {*} - the value of the element that matches.
       */

    }, {
      key: "get",
      value: function get(key, overrides) {
        var op = this.equalsAndHash(key, overrides);
        return this.buckets.get(key, op);
      }
      /**
       * Get the key from the map using the provided value. Since values are not hashed, this has to check each value in the map until a value matches, or the whole map, if none match. As such this is a slow operation.
       * Performance O(n) as we have to iterate over the whole map, to find each value and perform
       * an equality against it.
       * @example <caption>What is the key for a value</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const keyOfResult = hashmap.keyOf('value2');
       * // keyOfResult === 2
       * @example <caption>What is the value for a key that isn't there</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const keyOfResult = hashmap.keyOf('value4');
       * // keyOfResult === undefined
       * @example <caption>Advanced: using a predefined hashCode and equals on the key</caption>
       * class NameKey {
       *     constructor(firstName, secondName) {
       *         this.firstName = firstName;
       *         this.secondName = secondName;
       *     }
       *     hashCode() {
       *          return (Mootable.hash(firstName) * 31) +Mootable.hash(secondName);
       *     }
       *     equals(other) {
       *          return other && other instanceof NameKey && other.firstName === this.firstName && other.secondName === this.secondName;
       *     }
       * }
       * const hashmap = new HashMap([[new NameKey('John','Smith'),'Librarian'],[new NameKey('Orlando','Keleshian'),'Engineer']]);
       * const keyOfResult = hashmap.keyOf('Engineer');
       * // getResult ~ NameKey('Orlando','Keleshian')
       * @example <caption>Advanced: using a custom equals, to get the first key in the
       * hashmap</caption>
       * const myEquals = {equals: () => true}
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const keyOfResult = hashmap.keyOf(0, myEquals);
       * // keyOfResult === 1
       * // 0 doesn't exist in the hashMap, but we are circumventing using the key entirely.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf Array.indexOf}
       * @param {*} value - The value we are searching the map for
       * @param {HashMap#overrides<equals>} [overrides] - an optional override to allow a user to
       * define the equals methods, rather than it being looked up on the value.
       * @return {*|undefined} the first key for this value or undefined
       */

    }, {
      key: "keyOf",
      value: function keyOf(value, overrides) {
        var equals = overrides && isFunction(overrides.equals) ? overrides.equals : this.equalsFor(value);

        var _iterator = _createForOfIteratorHelper(this.entries()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;

            if (equals(value, entry[1])) {
              return entry[0];
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return undefined;
      }
      /**
       * Get the key from the map using the provided value, searching the map in reverse. Since values
       * are not hashed, this has to check each value in the map until a value matches, or the
       * whole map, if none match. As such this is a slow operation.
       * Performance O(n) as we have to iterate over the whole map, to find each value and perform
       * an equality against it.
       * @example <caption>What is the key for a value</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const lastKeyOfResult = hashmap.lastKeyOf('value2');
       * // lastKeyOfResult === 2
       * @example <caption>What is the value for a key that isn't there</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const lastKeyOfResult = hashmap.lastKeyOf('value4');
       * // lastKeyOfResult === undefined
       * @example <caption>Advanced: using a predefined hashCode and equals on the key</caption>
       * class NameKey {
       *     constructor(firstName, secondName) {
       *         this.firstName = firstName;
       *         this.secondName = secondName;
       *     }
       *     hashCode() {
       *          return (Mootable.hash(firstName) * 31) +Mootable.hash(secondName);
       *     }
       *     equals(other) {
       *          return other && other instanceof NameKey && other.firstName === this.firstName && other.secondName === this.secondName;
       *     }
       * }
       * const hashmap = new HashMap([[new NameKey('John','Smith'),'Librarian'],[new NameKey('Orlando','Keleshian'),'Engineer']]);
       * const lastKeyOfResult = hashmap.lastKeyOf('Engineer');
       * // getResult ~ NameKey('Orlando','Keleshian')
       * @example <caption>Advanced: using a custom equals, to get the last key in the
       * hashmap</caption>
       * const myEquals = {equals: () => true}
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const lastKeyOfResult = hashmap.lastKeyOf(0, myEquals);
       * // lastKeyOfResult === 3
       * // 0 doesn't exist in the hashMap, but we are circumventing using the key entirely.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf Array.lastIndexOf}
       * @param {*} value - The value we are searching the map for, (in reverse)
       * @param {HashMap#overrides<equals>} [overrides] - an optional override to allow a user to
       * define the equals methods, rather than it being looked up on the value.
       * @return {*|undefined} the last key for this value or undefined
       */

    }, {
      key: "lastKeyOf",
      value: function lastKeyOf(value, overrides) {
        var equals = overrides && isFunction(overrides.equals) ? overrides.equals : this.equalsFor(value);

        var _iterator2 = _createForOfIteratorHelper(this.entriesRight()),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var entry = _step2.value;

            if (equals(value, entry[1])) {
              return entry[0];
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return undefined;
      }
      /**
       * Get the key from the map using the provided value, and wrap it in an {@link Option}.
       * Since values are not hashed, this has to check each value in the map until a value
       * matches, or the whole map, if none match. As such this is a slow operation.
       * Performance O(n) as we have to iterate over the whole map, to find each value and perform
       * an equality against it.
       * @example <caption>What is the key for a value</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalKeyOfResult = hashmap.optionalKeyOf('value2');
       * // optionalKeyOfResult === Option.some(2)
       * @example <caption>What is the value for a key that isn't there</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalKeyOfResult = hashmap.optionalKeyOf('value4');
       * // optionalKeyOfResult === Option.none
       * @example <caption>Advanced: using a predefined hashCode and equals on the key</caption>
       * class NameKey {
       *     constructor(firstName, secondName) {
       *         this.firstName = firstName;
       *         this.secondName = secondName;
       *     }
       *     hashCode() {
       *          return (Mootable.hash(firstName) * 31) +Mootable.hash(secondName);
       *     }
       *     equals(other) {
       *          return other && other instanceof NameKey && other.firstName === this.firstName && other.secondName === this.secondName;
       *     }
       * }
       * const hashmap = new HashMap([[new NameKey('John','Smith'),'Librarian'],[new NameKey('Orlando','Keleshian'),'Engineer']]);
       * const optionalKeyOfResult = hashmap.optionalKeyOf('Engineer');
       * // getResult ~ Option.some(NameKey('Orlando','Keleshian'))
       * @example <caption>Advanced: using a custom equals, to get the first key in the
       * hashmap</caption>
       * const myEquals = {equals: () => true}
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalKeyOfResult = hashmap.optionalKeyOf(0, myEquals);
       * // optionalKeyOfResult === Option.some(1)
       * // 0 doesn't exist in the hashMap, but we are circumventing using the key entirely.
       * @see {@link Option.some}
       * @see {@link Option.none}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf Array.indexOf}
       * @param {*} value - The value we are searching the map for
       * @param {HashMap#overrides<equals>} [overrides] - an optional overrides to allow a user to
       * define the equals methods, rather than it being looked up on the value.
       * @return {Option} the first key for this value or none
       */

    }, {
      key: "optionalKeyOf",
      value: function optionalKeyOf(value, overrides) {
        var equals = overrides && isFunction(overrides.equals) ? overrides.equals : this.equalsFor(value);

        var _iterator3 = _createForOfIteratorHelper(this.entries()),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var entry = _step3.value;

            if (equals(value, entry[1])) {
              return _some(entry[0]);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return none;
      }
      /**
       * Get the key from the map using the provided value, searching the map in reverse. Since values
       * are not hashed, this has to check each value in the map until a value matches, or the
       * whole map, if none match. As such this is a slow operation.
       * Performance O(n) as we have to iterate over the whole map, to find each value and perform
       * an equality against it.
       * @example <caption>What is the key for a value</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalLastKeyOfResult = hashmap.optionalLastKeyOf('value2');
       * // optionalLastKeyOfResult === Option.some(2)
       * @example <caption>What is the value for a key that isn't there</caption>
       * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalLastKeyOfResult = hashmap.optionalLastKeyOf('value4');
       * // optionalLastKeyOfResult === Option.none
       * @example <caption>Advanced: using a predefined hashCode and equals on the key</caption>
       * class NameKey {
       *     constructor(firstName, secondName) {
       *         this.firstName = firstName;
       *         this.secondName = secondName;
       *     }
       *     hashCode() {
       *          return (Mootable.hash(firstName) * 31) +Mootable.hash(secondName);
       *     }
       *     equals(other) {
       *          return other && other instanceof NameKey && other.firstName === this.firstName && other.secondName === this.secondName;
       *     }
       * }
       * const hashmap = new HashMap([[new NameKey('John','Smith'),'Librarian'],[new NameKey('Orlando','Keleshian'),'Engineer']]);
       * const optionalLastKeyOfResult = hashmap.optionalLastKeyOf('Engineer');
       * // getResult ~ Option.some(NameKey('Orlando','Keleshian'))
       * @example <caption>Advanced: using a custom equals, to get the last key in the
       * hashmap</caption>
       * const myEquals = {equals: () => true}
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalLastKeyOfResult = hashmap.optionalLastKeyOf(0, myEquals);
       * // optionalLastKeyOfResult === Option.some(3)
       * // 0 doesn't exist in the hashMap, but we are circumventing using the key entirely.
       * @see {@link Option.some}
       * @see {@link Option.none}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf Array.lastIndexOf}
       * @param {*} value - The value we are searching the map for, (in reverse)
       * @param {HashMap#overrides<equals>} [overrides] - an optional overrides to allow a user to
       * define the equals methods, rather than it being looked up on the value.
       * @return {Option} the last key for this value or none
       */

    }, {
      key: "optionalLastKeyOf",
      value: function optionalLastKeyOf(value, overrides) {
        var equals = overrides && isFunction(overrides.equals) ? overrides.equals : this.equalsFor(value);

        var _iterator4 = _createForOfIteratorHelper(this.entriesRight()),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var entry = _step4.value;

            if (equals(value, entry[1])) {
              return _some(entry[0]);
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        return none;
      }
      /**
       * Get an optional value from the map. This is effectively a more efficent combination of calling has and get at the same time.
       * - return the first <code>some(value)</code> from the <code>[key,value]</code> pair that matches
       * - if no elements match, it returns <code>none()</code>.
       * - it is legitimate for keys to be null or undefined, and if set, will still acknowledge it exists, against the key.
       *
       * Maps typically index keys, and so is generally a fast operation.
       * @example <caption>What is the value for a key</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const getResult = hashmap.optionalGet(1);
       * // getResult === Option.some('value1') {value:'value1',has:true}
       * @example <caption>What is the value for a key that isn't there</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const getResult = hashmap.optionalGet(4);
       * // getResult === Option.none {has:false}
       * @example <caption>What is the value for a key with an undefined value</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,undefined],[3,'value3']]);
       * const getResult = hashmap.optionalGet(2);
       * // getResult === Option.some(undefined) {value:undefined,has:true}
       * @example <caption>Advanced: using a predefined hashCode and equals on the key</caption>
       * class NameKey {
       *     constructor(firstName, secondName) {
       *         this.firstName = firstName;
       *         this.secondName = secondName;
       *     }
       *     hashCode() {
       *          return (Mootable.hash(firstName) * 31) +Mootable.hash(secondName);
       *     }
       *     equals(other) {
       *          return other && other instanceof NameKey && other.firstName === this.firstName && other.secondName === this.secondName;
       *     }
       * }
       * const hashmap = new HashMap([[new NameKey('John','Smith'),'Librarian'],[new NameKey('Orlando','Keleshian'),'Engineer']]);
       * const key = new NameKey('John','Smith');
       * const getResult = hashmap.optionalGet(key);
       * // getResult === Option.some('Librarian') {value:'Librarian',has:true}
       * @example <caption>Advanced: using a custom hash and equals, to get the first entry for a specific hash</caption>
       * const myHash = 3;
       * const hashEquals = {hash: myHash, equals: () => true}
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const getResult = hashmap.optionalGet(0, hashEquals);
       * // getResult === Option.some('value3')  {value:'value3',has:true}
       * // the hash of the number 3 is actually also 3. all 32 bit integers have the same hash.
       * // 0 doesn't exist in the hashMap, but we are circumventing using the key entirely.
       * @see {@link Option.some}
       * @see {@link Option.none}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get|Map.get}
       * @param {*} key - the key we use to identify if we have a match.
       * @param {HashMap#overrides<equals, hash>} [overrides] - a set of optional overrides to allow a user to define the hashcode and equals methods, rather than them being looked up.
       * @returns {Option} - an optional result.
       */

    }, {
      key: "optionalGet",
      value: function optionalGet(key, overrides) {
        var op = this.equalsAndHash(key, overrides);
        return this.buckets.optionalGet(key, op);
      }
      /**
       * Find the first value in the map which passes the provided <code>MatchesPredicate</code>.
       * - return the first <code>value</code> from the <code>[key,value]</code> pair that matches
       * - if no elements match, it returns undefined.
       * - if no predicate is defined, will return the first value it finds.
       * @example <caption>Find a value</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const findResult = hashmap.find((value) => value.startsWith('val'));
       * // findResult === 'value1'
       * @example <caption>Can't find a value</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const findResult = hashmap.find((value) => value.startsWith('something'));
       * // findResult === undefined
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find|Array.find}
       * @param {HashMap#MatchesPredicate} [findPredicate=(value, key, iterable) => value] - the predicate to identify if we have a match.
       * @param {*} [thisArg] - Value to use as <code>this</code> when executing <code>findPredicate</code>
       * @returns {*} - the value of the element that matches.
       */

    }, {
      key: "find",
      value: function find() {
        var findPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        var _iterator5 = _createForOfIteratorHelper(this.entries()),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _step5$value = _slicedToArray(_step5.value, 2),
                key = _step5$value[0],
                value = _step5$value[1];

            if (findPredicate.call(thisArg, value, key, this)) {
              return value;
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        return undefined;
      }
      /**
       * Find the last value in the map which passes the provided <code>MatchesPredicate</code>.
       * - return the last <code>value</code> from the <code>[key,value]</code> pair that matches
       * - if no elements match, it returns undefined.
       * - if no predicate is defined, will return the last value it finds. (It does this by iterating over the hashmap in reverse, and returning the first
       * item that matches)
       * @example <caption>Find the last value</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const findLastResult = hashmap.findLast((value) => value.startsWith('val'));
       * // findLastResult === 'value3'
       * @example <caption>Can't find a value</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const findLastResult = hashmap.findLast((value) => value.startsWith('something'));
       * // findLastResult === undefined
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find|Array.find}
       * @param {HashMap#MatchesPredicate} [findPredicate=(value, key, iterable) => value] - the predicate to identify if we have a match.
       * @param {*} [thisArg] - Value to use as <code>this</code> when executing <code>findPredicate</code>
       * @returns {*} - the value of the element that matches.
       */

    }, {
      key: "findLast",
      value: function findLast() {
        var findPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        var _iterator6 = _createForOfIteratorHelper(this.entriesRight()),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _step6$value = _slicedToArray(_step6.value, 2),
                key = _step6$value[0],
                value = _step6$value[1];

            if (findPredicate.call(thisArg, value, key, this)) {
              return value;
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        return undefined;
      }
      /**
       * Find the first value in the map which passes the provided <code>MatchesPredicate</code>.
       * - return the first <code>value</code> from the <code>[key,value]</code> pair that matches, wrapped in an Option
       * - if no elements match, it returns none.
       * - if no predicate is defined, will return the first value it finds.
       * @example <caption>Find a value</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalFindResult = hashmap.optionalFind((value) => value.startsWith('val'));
       * // optionalFindResult.value === 'value1'
       * // optionalFindResult.has === true
       * @example <caption>Can't find a value</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalFindResult = hashmap.optionalFind((value) => value.startsWith('something'));
       * // optionalFindResult.has === false
       * @see {@link Option.some}
       * @see {@link Option.none}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find|Array.find}
       * @param {HashMap#MatchesPredicate} [findPredicate=(value, key, iterable) => value] - the predicate to identify if we have a match.
       * @param {*} [thisArg] - Value to use as <code>this</code> when executing <code>findPredicate</code>
       * @returns {Option.<*>|Option.none} the value of the element that matches.
       */

    }, {
      key: "optionalFind",
      value: function optionalFind() {
        var findPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        var _iterator7 = _createForOfIteratorHelper(this.entries()),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _step7$value = _slicedToArray(_step7.value, 2),
                key = _step7$value[0],
                value = _step7$value[1];

            if (findPredicate.call(thisArg, value, key, this)) {
              return _some(value);
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }

        return none;
      }
      /**
       * Find the last value in the map which passes the provided <code>MatchesPredicate</code>.
       * - return the last <code>value</code> from the <code>[key,value]</code> pair that matches, wrapped in an Option
       * - if no elements match, it returns none.
       * - if no predicate is defined, will return the last value it finds. (It does this by iterating over the hashmap in reverse, and returning the first
       * item that matches)
       * @example <caption>Find a value</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalFindLastResult = hashmap.optionalFindLast((value) => value.startsWith('val'));
       * // optionalFindLastResult.value === 'value3'
       * // optionalFindLastResult.has === true
       * @example <caption>Can't find a value</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalFindLastResult = hashmap.optionalFindLast((value) => value.startsWith('something'));
       * // optionalFindLastResult.has === false
       * @see {@link Option.some}
       * @see {@link Option.none}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find|Array.find}
       * @param {HashMap#MatchesPredicate} [findPredicate=(value, key, iterable) => value] - the predicate to identify if we have a match.
       * @param {*} [thisArg] - Value to use as <code>this</code> when executing <code>findPredicate</code>
       * @returns {Option.<*>|Option.none} the value of the element that matches.
       */

    }, {
      key: "optionalFindLast",
      value: function optionalFindLast() {
        var findPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        var _iterator8 = _createForOfIteratorHelper(this.entriesRight()),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var _step8$value = _slicedToArray(_step8.value, 2),
                key = _step8$value[0],
                value = _step8$value[1];

            if (findPredicate.call(thisArg, value, key, this)) {
              return _some(value);
            }
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }

        return none;
      }
      /**
       * Find the first key in the map which passes the provided  <code>MatchesPredicate</code>.
       * - return the first <code>key</code> from the <code>[key,value]</code> pair that matches
       * - if no elements match, it returns undefined.
       * - if no predicate is defined, will return the first key it finds.
       *
       * @example <caption>Find a key</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const findKeyResult = hashmap.findKey((value) => value.startsWith('val'));
       * // findKeyResult === 1
       * @example <caption>Can't find a key</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const findKeyResult = hashmap.findKey((value) => value.startsWith('something'));
       * // findKeyResult === undefined
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex|Array.findIndex}
       * @param {HashMap#MatchesPredicate} [findKeyPredicate=(value, key, iterable) => key] - the predicate to identify if we have a match.
       * @param {*} [thisArg] - Value to use as <code>this</code> when executing <code>findKeyPredicate</code>
       * @returns {*} - the key of the element that matches..
       */

    }, {
      key: "findKey",
      value: function findKey() {
        var findKeyPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (value, key) {
          return key;
        };
        var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        var _iterator9 = _createForOfIteratorHelper(this.entries()),
            _step9;

        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var _step9$value = _slicedToArray(_step9.value, 2),
                key = _step9$value[0],
                value = _step9$value[1];

            if (findKeyPredicate.call(thisArg, value, key, this)) {
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
       * Find the last key in the map which passes the provided <code>MatchesPredicate</code>.
       * - return the last <code>key</code> from the <code>[key,value]</code> pair that matches
       * - if no elements match, it returns undefined.
       * - if no predicate is defined, will return the last key it finds. (It does this by iterating over the hashmap in reverse, and returning the first
       * item that matches)
       *
       * @example <caption>Find a key</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const findLastKeyResult = hashmap.findLastKey((value) => value.startsWith('val'));
       * // findLastKeyResult === 3
       * @example <caption>Can't find a key</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const findLastKeyResult = hashmap.findLastKey((value) => value.startsWith('something'));
       * // findLastKeyResult === undefined
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex|Array.prototype.findIndex}
       * @param {HashMap#MatchesPredicate} [findKeyPredicate=(value, key, iterable) => key] - the predicate to identify if we have a match.
       * @param {*} [thisArg] - Value to use as <code>this</code> when executing <code>findKeyPredicate</code>
       * @returns {*} - the key of the element that matches..
       */

    }, {
      key: "findLastKey",
      value: function findLastKey() {
        var findKeyPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (value, key) {
          return key;
        };
        var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        var _iterator10 = _createForOfIteratorHelper(this.entriesRight()),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var _step10$value = _slicedToArray(_step10.value, 2),
                key = _step10$value[0],
                value = _step10$value[1];

            if (findKeyPredicate.call(thisArg, value, key, this)) {
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
       * Find the first key in the map which passes the provided <code>MatchesPredicate</code>.
       * - return the first <code>key</code> from the <code>[key,value]</code> pair that matches, wrapped in an Option
       * - if no elements match, it returns none.
       * - if no predicate is defined, will return the first key it finds.
       *
       * @example <caption>Find a key</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalFindKeyResult = hashmap.optionalFindKey((value) => value.startsWith('val'));
       * // optionalFindKeyResult.value === 1
       * // optionalFindKeyResult.has === true
       * @example <caption>Can't find a key</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalFindKeyResult = hashmap.optionalFindKey((value) => value.startsWith('something'));
       * // optionalFindKeyResult.has === false
       * @see {@link Option.some}
       * @see {@link Option.none}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex|Array.prototype.findIndex}
       * @param {HashMap#MatchesPredicate} [findKeyPredicate=(value, key, iterable) => key] - the predicate to identify if we have a match.
       * @param {*} [thisArg] - Value to use as <code>this</code> when executing <code>findKeyPredicate</code>
       * @returns {Option.<*>|Option.none} the key of the element that matches.
       */

    }, {
      key: "optionalFindKey",
      value: function optionalFindKey() {
        var findKeyPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (value, key) {
          return key;
        };
        var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        var _iterator11 = _createForOfIteratorHelper(this.entries()),
            _step11;

        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var _step11$value = _slicedToArray(_step11.value, 2),
                key = _step11$value[0],
                value = _step11$value[1];

            if (findKeyPredicate.call(thisArg, value, key, this)) {
              return _some(key);
            }
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }

        return none;
      }
      /**
       * Find the last key in the map which passes the provided <code>MatchesPredicate</code>.
       * - return the last <code>key</code> from the <code>[key,value]</code> pair that matches, wrapped in an Option
       * - if no elements match, it returns none.
       * - if no predicate is defined, will return the last key it finds. (It does this by iterating over the hashmap in reverse, and returning the first
       * item that matches)
       * @example <caption>Find a key</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalFindLastKeyResult = hashmap.optionalFindLastKey(value) => value.startsWith('val'));
       * // optionalFindLastKeyResult.value === 3
       * // optionalFindLastKeyResult.has === true
       * @example <caption>Can't find a key</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const optionalFindLastKeyResult = hashmap.optionalFindLastKey((value) => value.startsWith('something'));
       * // optionalFindLastKeyResult.has === false
       * @see {@link Option.some}
       * @see {@link Option.none}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex|Array.prototype.findIndex}
       * @param {HashMap#MatchesPredicate} [findKeyPredicate=(value, key, iterable) => key] - the predicate to identify if we have a match.
       * @param {*} [thisArg] - Value to use as <code>this</code> when executing <code>findKeyPredicate</code>
       * @returns {Option.<*>|Option.none} the key of the element that matches.
       */

    }, {
      key: "optionalFindLastKey",
      value: function optionalFindLastKey() {
        var findKeyPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (value, key) {
          return key;
        };
        var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        var _iterator12 = _createForOfIteratorHelper(this.entriesRight()),
            _step12;

        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var _step12$value = _slicedToArray(_step12.value, 2),
                key = _step12$value[0],
                value = _step12$value[1];

            if (findKeyPredicate.call(thisArg, value, key, this)) {
              return _some(key);
            }
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }

        return none;
      }
      /**
       * Sets a value onto this map, using the key as its reference.
       *  - If the key already exists, this will overwrite the value with the new value.
       *  - If it doesn't exist it adds the new key value pair to the map.
       *  - NB: Ordering in a HashMap is not defined by insertion order (much), but by hash value (mostly).
       *
       * @example <caption>set a value</caption>
       * const hashmap = new HashMap();
       * hashmap.set(1,'value1');
       * const hasResult = hashmap.has(1);
       * // hasResult === true
       * @example <caption>>overwrite a value</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2']]);
       * hashmap.set(2,'other');
       * const getResult = hashmap.get(2);
       * // getResult === 'other'
       * @example <caption>Advanced: using a predefined hashCode and equals on the key</caption>
       * class NameKey {
       *     constructor(firstName, secondName) {
       *         this.firstName = firstName;
       *         this.secondName = secondName;
       *     }
       *     hashCode() {
       *          return (Mootable.hash(firstName) * 31) +Mootable.hash(secondName);
       *     }
       *     equals(other) {
       *          return other && other instanceof NameKey && other.firstName === this.firstName && other.secondName === this.secondName;
       *     }
       * }
       * const hashmap = new HashMap();
       * hashmap.set(new NameKey('John','Smith'),'Librarian');
       * const hasResult = hashmap.has(new NameKey('John','Smith'));
       * // hasResult === true
       * @example <caption>Advanced: using a custom hash and equals, to set a value to a specific
       * hash</caption>
       * const hashmap = new HashMap();
       * hashmap.set(1,'value1', {hash: 3});
       * const hasResult = hashmap.has(3, {equals: () => true} );
       * // hasResult === true
       * // the hash of the number 3 is actually also 3. all 32 bit integers have the same hash.
       * // 0 doesn't exist in the hashMap, but we are circumventing using the key entirely.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set|Map.prototype.set}
       * @param {*} key - the key we want to key our value to
       * @param {*} value - the value we are setting
       * @param {HashMap#overrides<equals, hash>} [overrides] - a set of optional overrides to allow a user to define the hashcode and equals methods, rather than them being looked up.
       * @return {HashMap} this hashmap
       */

    }, {
      key: "set",
      value: function set(key, value, overrides) {
        var op = this.equalsAndHash(key, overrides);
        this.buckets.set(key, value, op);
        return this;
      }
      /**
       * Given a key and a handler object, the emplace method will either remap an existing entry,
       * insert a new entry from a mapping function, or both. emplace will return the updated or
       * inserted value.
       * @example <caption>insert into the map</caption>
       * const hashmap = new HashMap();
       * const handler = {
       *     update: () => {
       *         return 'update';
       *     },
       *     insert: (key, map) => {
       *         return 'insert';
       *     }
       * };
       * const ret = hashmap.emplace('key', handler)
       * // hashmap = [['key', 'insert']]
       * // ret === 'insert'
       * @example <caption>update the map</caption>
       * const hashmap = new HashMap([['key','value']]);
       * const handler = {
       *     update: () => {
       *         return 'update';
       *     },
       *     insert: (key, map) => {
       *         return 'insert';
       *     }
       * };
       * const ret = hashmap.emplace('key', handler)
       * // hashmap = [['key', 'update']]
       * // ret === 'update'
       * @example <caption>insert into the map if the key already exists without an update</caption>
       * const hashmap = new HashMap([['key','value']]);
       * const handler = {
       *     insert: (key, map) => {
       *         return 'insert';
       *     }
       * };
       * const ret = hashmap.emplace('key', handler)
       * // hashmap = [['key', 'value']]
       * // ret === 'value'
       * @example <caption>update into the map without an insert method (throws an error)</caption>
       * const hashmap = new HashMap([['key','value']]);
       * const handler = {
       *     update: (oldValue, key, map) => {
       *         return 'update';
       *     }
       * };
       * hashmap.emplace('key', handler)
       * // throws an Error as insert doesn't exist
       * // hashmap = [['key', 'value']]
       *
       * @example <caption>Advanced: using a predefined hashCode and equals on the key</caption>
       * class NameKey {
       *     constructor(firstName, secondName) {
       *         this.firstName = firstName;
       *         this.secondName = secondName;
       *     }
       *     hashCode() {
       *          return (Mootable.hash(firstName) * 31) +Mootable.hash(secondName);
       *     }
       *     equals(other) {
       *          return other && other instanceof NameKey && other.firstName === this.firstName && other.secondName === this.secondName;
       *     }
       * }
       * const handler = {
       *     insert: (key, map) => {
       *         return 'Librarian';
       *     }
       * };
       * const hashmap = new HashMap();
       * const ret = hashmap.emplace(new NameKey('John','Smith'),handler);
       * // ret === 'Librarian'
       * @example <caption>Advanced: using a custom hash and equals, to emplace a value to a specific
       * hash</caption>
       * const handler = {
       *     insert: (key, map) => {
       *         return 'value1';
       *     }
       * };
       * const hashmap = new HashMap();
       * const ret = hashmap.emplace(1,handler, {hash: 3});
       * // ret === 'value1'
       * // the hash of the number 3 is actually also 3. all 32 bit integers have the same hash.
       * // 0 doesn't exist in the hashMap, but we are circumventing using the key entirely.
       * @see {@link https://tc39.es/proposal-upsert/ upsert proposal}
       * @see {@link https://github.com/tc39/proposal-upsert|Map.prototype.emplace}
       * @param {*} key - the key we want to key our value to
       * @param {HashMap#emplaceHandler<insert,update>} handler - the insert and update methods we
       * want to use.
       * @param {HashMap#overrides<equals, hash>} [overrides] - a set of optional overrides to allow a user to define the hashcode and equals methods, rather than them being looked up.
       * @return {*} the new value that was set, or overwrote.
       * @throws {Error} if the insert method does not exist, and it can't find the key.
       */

    }, {
      key: "emplace",
      value: function emplace(key, handler, overrides) {
        var op = this.equalsAndHash(key, overrides);
        return this.buckets.emplace(key, handler, op);
      }
      /**
       * Copies all the entries from the map, array or iterable, into this hashmap.
       *
       * @example <caption>copy into the HashMap from an array of key value pairs</caption>
       * const hashmap = new HashMap([['key0','value0']]);
       * const arr = [[1,'value1'],[2,'value2'],[3,'value3']];
       * hashmap.copy(arr);
       * // hashmap.size === 4;
       * @example <caption>copy into the HashMap from another map</caption>
       * const hashmap = new HashMap([['key0','value0']]);
       * const map = new Map([[1,'value1'],[2,'value2'],[3,'value3']])
       * hashmap.copy(map);
       * // hashmap.size === 4;
       * @example <caption>copy into the HashMap from another HashMap</caption>
       * const first = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']])
       * const hashmap = new HashMap(first);
       * // hashmap.size === 3;
       * @example <caption>copy into the HashMap from a class with symbol iterator</caption>
       * const hashmap = new HashMap([['key0','value0']]);
       * class MyIterable = {
       *     *[Symbol.iterator] () {
       *         yield ["key1", "value1"];
       *         yield ["key2", "value2"];
       *         yield ["key3", "value3"];
       *         yield ["key4", "value4"];
       *     }
       * }
       * const iterable = new MyIterable();
       * hashmap.copy(iterable);
       * // hashmap.size === 5;
       * // it doesn't have to be a generator, an iterator works too.
       * @example <caption>copy into the HashMap from an object with an entries generator function</caption>
       * const hashmap = new HashMap([['key0','value0']]);
       * const entriesObj = {
       *     entries: function* () {
       *         yield ["key1", "value1"];
       *         yield ["key2", "value2"];
       *         yield ["key3", "value3"];
       *         yield ["key4", "value4"];
       *     }
       * }
       * hashmap.copy(entriesObj);
       * // hashmap.size === 5;
       * // it doesn't have to be a generator, an iterator works too.
       * @example <caption>copy into the HashMap from an object with a forEach function</caption>
       * const hashmap = new HashMap([['key0','value0']]);
       * const forEachObj = {
       *      forEach: (callback, ctx) => {
       *              for (let i = 1; i <= 4; i++) {
       *                  callback.call(ctx, 'value' + i, 'key' + i);
       *              }
       *      }
       * };
       * hashmap.copy(forEachObj);
       * // hashmap.size === 5;
       * @param {(Map|HashMap|LinkedHashMap|Iterable.<Array.<key,value>>|Object)} other - the
       * iterable to copy
       * @return {HashMap} this hashmap, with the values copied to it.
       * @throws {TypeError} if the provided object other is null or not iterable.
       */

    }, {
      key: "copy",
      value: function copy(other) {
        var map = this;

        if (isIterable(other)) {
          var _iterator13 = _createForOfIteratorHelper(other),
              _step13;

          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var _step13$value = _slicedToArray(_step13.value, 2),
                  key = _step13$value[0],
                  value = _step13$value[1];

              map.set(key, value);
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }

          return this;
        } else if (isFunction(other.entries)) {
          var _iterator14 = _createForOfIteratorHelper(other.entries()),
              _step14;

          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var _step14$value = _slicedToArray(_step14.value, 2),
                  _key = _step14$value[0],
                  _value = _step14$value[1];

              map.set(_key, _value);
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }

          return this;
        } else if (isFunction(other.forEach)) {
          other.forEach(function (value, key) {
            map.set(key, value);
          });
          return this;
        }

        throw new TypeError('HashMap.copy expects an object which is iterable, has an entries iterable function, or has a forEach function on it');
      }
      /**
       * Makes a full copy of this hashmap and returns the clone.
       *
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
       * @param {HashMap#overrides<equals, hash>} [overrides] - a set of optional overrides to allow a user to define the hashcode and equals methods, rather than them being looked up.     * @return {HashMap}
       */

    }, {
      key: "delete",
      value: function _delete(key, overrides) {
        var op = this.equalsAndHash(key, overrides);
        this.buckets.delete(key, op);
        return this;
      }
      /**
       * Clears the data from this hashmap. All data is orphaned, and will be Garbage Collected.
       * @return {HashMap} this hashmap
       */

    }, {
      key: "clear",
      value: function clear() {
        this.buckets.clear();
        return this;
      }
      /**
       * Execute the provided callback on every <code>[key,value]</code> pair of this map iterable.
       * @example <caption>Log all the keys and values.</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * mapIterable.forEach((value) => console.log(key, value));
       * // will log to the console:
       * // 1 value1
       * // 2 value2
       * // 3 value3
       * // Ordering is deterministic on paper, but from a usability point of view effectively random
       * // as it is ordered by a mix of the hash of the key, and order of insertion.
       * @param {HashMap#ForEachCallback} [callback=(value, key, map) => {}]
       * @param {*} [thisArg] Value to use as <code>this</code> when executing <code>forEachCallback</code>
       * @returns {HashMap} the hashmap you are foreaching on..
       */

    }, {
      key: "forEach",
      value: function forEach(callback, thisArg) {
        var _iterator15 = _createForOfIteratorHelper(this.entries()),
            _step15;

        try {
          for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
            var entry = _step15.value;
            callback.call(thisArg, entry[1], entry[0], this);
          }
        } catch (err) {
          _iterator15.e(err);
        } finally {
          _iterator15.f();
        }

        return this;
      }
      /**
       * Execute the provided callback on every <code>[key,value]</code> pair of this map iterable in reverse.
       * @example <caption>Log all the keys and values.</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * mapIterable.forEachRight((value) => console.log(key, value));
       * // will log to the console:
       * // 3 value3
       * // 2 value2
       * // 1 value1
       * // Ordering is deterministic on paper, but from a usability point of view effectively random
       * // as it is ordered by a mix of the hash of the key, and order of insertion.
       * @param {HashMap#ForEachCallback} [callback=(value, key, map) => {}]
       * @param {*} [thisArg] Value to use as <code>this</code> when executing <code>forEachCallback</code>
       * @returns {HashMap} the hashmap you are foreaching on..
       */

    }, {
      key: "forEachRight",
      value: function forEachRight(callback, thisArg) {
        var _iterator16 = _createForOfIteratorHelper(this.entriesRight()),
            _step16;

        try {
          for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
            var entry = _step16.value;
            callback.call(thisArg, entry[1], entry[0], this);
          }
        } catch (err) {
          _iterator16.e(err);
        } finally {
          _iterator16.f();
        }

        return this;
      }
      /**
       * Test to see if ALL elements pass the test implemented by the passed <code>MatchesPredicate</code>.
       * - if any element does not match, returns false
       * - if all elements match, returns true.
       * - if no elements match, returns false.
       * - if the iterable is empty, returns true. (irrespective of the predicate)
       * - if no predicate is provided, returns true.
       *
       * @example <caption>Do all values start with 'value'. (yes)</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const everyResult = hashmap.every((value) => value.startsWith('value'));
       * // everyResult === true
       * @example <caption>Do all values start with value. (no)</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'doesntStart'],[3,'value3']]);
       * const everyResult = hashmap.every((value) => value.startsWith('value'));
       * // everyResult === false
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every|Array.every}
       * @param {HashMap#MatchesPredicate} [everyPredicate=(value, key, iterable) => true] - if the provided function returns <code>false</code>, at any point the <code>every()</code> function returns false.
       * @param {*} [thisArg] - Value to use as <code>this</code> when executing <code>everyPredicate</code>
       * @param {HashMap#overrides<reverse>} [overrides] - a set of optional overrides to allow a user to define whether to search in reverse
       * @returns {boolean} true if all elements match, false if one or more elements fails to match.
       */

    }, {
      key: "every",
      value: function every() {
        var everyPredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var overrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var iterator = overrides && overrides.reverse ? this.entriesRight() : this.entries();

        var _iterator17 = _createForOfIteratorHelper(iterator),
            _step17;

        try {
          for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
            var _step17$value = _slicedToArray(_step17.value, 2),
                key = _step17$value[0],
                value = _step17$value[1];

            if (!everyPredicate.call(thisArg, value, key, this)) {
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
       * Test to see if ANY element pass the test implemented by the passed <code>MatchesPredicate</code>.
       * - if any element matches, returns true.
       * - if all elements match returns true.
       * - if no elements match returns false.
       * - if the iterable is empty, returns true.
       * - if no predicate is provided, returns true.
       *
       * @example <caption>Do any values start with value. (yes all of them)</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const someResult = hashmap.some((value) => value.startsWith('value'));
       * // someResult === true
       * @example <caption>Do any values start with value. (yes 2 of them)</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'doesntStart'],[3,'value3']]);
       * const someResult = hashmap.some((value) => value.startsWith('value'));
       * // someResult === true
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some|Array.some}
       * @param {HashMap#MatchesPredicate} [somePredicate=(value, key, iterable) => true] - the predicate to identify if we have a match.
       * @param {*} [thisArg] - Value to use as <code>this</code> when executing <code>somePredicate</code>
       * @param {HashMap#overrides<reverse>} [overrides] - a set of optional overrides to allow a user to define whether to search in reverse
       * @returns {boolean} - true if all elements match, false if one or more elements fails to match.
       */

    }, {
      key: "some",
      value: function some() {
        var somePredicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
          return true;
        };
        var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var overrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var iterator = overrides && overrides.reverse ? this.entriesRight() : this.entries();

        var _iterator18 = _createForOfIteratorHelper(iterator),
            _step18;

        try {
          for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
            var _step18$value = _slicedToArray(_step18.value, 2),
                key = _step18$value[0],
                value = _step18$value[1];

            if (somePredicate.call(thisArg, value, key, this)) {
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
       * Iterate through the map reducing it to a single value.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce|Array.reduce}
       * if initial value is <code>undefined</code> or <code>null</code>, unlike Array.reduce,
       * no error occurs, and it is simply passed as the accumulator value
       * @example <caption>add all the keys</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const reduceResult = hashmap.reduce((accumulator, value, key) => accumulator+key, 0);
       * // reduceResult === 6
       * @example <caption>add all the values into one string in reverse order</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const reduceResult = hashmap.reduce((accumulator, value) => value+accumulator, '');
       * // reduceResult === 'value3value2value1'
       * @param {HashMap#ReduceFunction} reduceFunction - the predicate to identify if we have a match.
       * @param {*} [initialValue] the initial value to start on the reduce.
       * @param {*} [thisArg] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
       * @returns {*} - the final accumulated value.
       */

    }, {
      key: "reduce",
      value: function reduce(reduceFunction, initialValue, thisArg) {
        var accumulator = initialValue;

        if (initialValue === undefined) {
          var first = true;

          var _iterator19 = _createForOfIteratorHelper(this.entries()),
              _step19;

          try {
            for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
              var _step19$value = _slicedToArray(_step19.value, 2),
                  key = _step19$value[0],
                  value = _step19$value[1];

              if (first) {
                first = false;
                accumulator = value;
              } else {
                accumulator = reduceFunction.call(thisArg, accumulator, value, key, this);
              }
            }
          } catch (err) {
            _iterator19.e(err);
          } finally {
            _iterator19.f();
          }
        } else {
          var _iterator20 = _createForOfIteratorHelper(this.entries()),
              _step20;

          try {
            for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
              var _step20$value = _slicedToArray(_step20.value, 2),
                  _key2 = _step20$value[0],
                  _value2 = _step20$value[1];

              accumulator = reduceFunction.call(thisArg, accumulator, _value2, _key2, this);
            }
          } catch (err) {
            _iterator20.e(err);
          } finally {
            _iterator20.f();
          }
        }

        return accumulator;
      }
      /**
       * Iterate backwards through the map reducing it to a single value.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight|Array.reduceRight}
       * if initial value is <code>undefined</code> or <code>null</code>, unlike Array.reduceRight,
       * no error occurs, and it is simply passed as the accumulator value
       * @example <caption>add all the keys</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const reduceResult = hashmap.reduceRight((accumulator, value, key) => accumulator+key, 0);
       * // reduceResult === 6
       * @example <caption>add all the values into one string in reverse order</caption>
       * const hashmap = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
       * const reduceResult = hashmap.reduceRight((accumulator, value) => value+accumulator, '');
       * // reduceResult === 'value1value2value3'
       * @param {HashMap#ReduceFunction} reduceFunction - the predicate to identify if we have a match.
       * @param {*} [initialValue] the initial value to start on the reduce.
       * @param {*} [thisArg] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
       * @returns {*} - the final accumulated value.
       */

    }, {
      key: "reduceRight",
      value: function reduceRight(reduceFunction, initialValue, thisArg) {
        var accumulator = initialValue;

        if (initialValue === undefined) {
          var first = true;

          var _iterator21 = _createForOfIteratorHelper(this.entriesRight()),
              _step21;

          try {
            for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
              var _step21$value = _slicedToArray(_step21.value, 2),
                  key = _step21$value[0],
                  value = _step21$value[1];

              if (first) {
                first = false;
                accumulator = value;
              } else {
                accumulator = reduceFunction.call(thisArg, accumulator, value, key, this);
              }
            }
          } catch (err) {
            _iterator21.e(err);
          } finally {
            _iterator21.f();
          }
        } else {
          var _iterator22 = _createForOfIteratorHelper(this.entriesRight()),
              _step22;

          try {
            for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
              var _step22$value = _slicedToArray(_step22.value, 2),
                  _key3 = _step22$value[0],
                  _value3 = _step22$value[1];

              accumulator = reduceFunction.call(thisArg, accumulator, _value3, _key3, this);
            }
          } catch (err) {
            _iterator22.e(err);
          } finally {
            _iterator22.f();
          }
        }

        return accumulator;
      }
      /**
       * Iterates over all the entries in the map.
       *
       * @yields {entries:Array.<key,value>} each entry in the map
       */

    }, {
      key: Symbol.iterator,
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function value() {
        return regeneratorRuntime.wrap(function value$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.delegateYield(this.entries(), "t0", 1);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, value, this);
      })
      /**
       * Iterates over all the entries in the map.
       *
       * @yields {entries:Array.<key,value>} each entry in the map
       */

    }, {
      key: "entries",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function entries() {
        return regeneratorRuntime.wrap(function entries$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.delegateYield(this.buckets, "t0", 1);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, entries, this);
      })
      /**
       * Iterates over all the entries in the map.
       *
       * @yields {entries:Array.<key,value>} each entry in the map in reverse order
       */

    }, {
      key: "entriesRight",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function entriesRight() {
        return regeneratorRuntime.wrap(function entriesRight$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.delegateYield(this.buckets.entriesRight(), "t0", 1);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, entriesRight, this);
      })
      /**
       * Iterates over all the keys in the map.
       *
       * @yields {key:any} each key in the map
       */

    }, {
      key: "keys",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function keys() {
        return regeneratorRuntime.wrap(function keys$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.delegateYield(this.buckets.keys(), "t0", 1);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, keys, this);
      })
      /**
       * Iterates over all the values in the map.
       *
       * @yields {value:any} each value in the map.
       */

    }, {
      key: "values",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function values() {
        return regeneratorRuntime.wrap(function values$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.delegateYield(this.buckets.values(), "t0", 1);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, values, this);
      })
      /**
       * Iterates over all the keys in the map in reverse.
       *
       * @yields {key:any} each key in the map in reverse order
       */

    }, {
      key: "keysRight",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function keysRight() {
        return regeneratorRuntime.wrap(function keysRight$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.delegateYield(this.buckets.keysRight(), "t0", 1);

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, keysRight, this);
      })
      /**
       * Iterates over all the values in the map in reverse.
       *
       * @yields {value:any} each value in the map in reverse order
       */

    }, {
      key: "valuesRight",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function valuesRight() {
        return regeneratorRuntime.wrap(function valuesRight$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.delegateYield(this.buckets.valuesRight(), "t0", 1);

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, valuesRight, this);
      }) // Private

      /**
       * Create a container for this hashmap, overridden by {@link LinkedHashMap}
       * This is an internal method, used for extension of hashmaps.
       * It allows for control of the leaves without having to mess with the hashbuckets and hamtpbuckets.
       * @private
       * @param {*} parent the parent of the container.
       * @param {number} hash the hash we want to assign to the container
       * @return {Container} the created container.
       */

    }, {
      key: "createContainer",
      value: function createContainer(parent, hash) {
        return new Container(this, parent, hash);
      }
    }]);

    return HashMap;
  }();
  /*
   * Method parsing
   */

  Object.defineProperty(HashMap.prototype, 'equalsFor', {
    value: equalsFor,
    configurable: true
  });
  Object.defineProperty(HashMap.prototype, 'equalsAndHash', {
    value: equalsAndHash,
    configurable: true
  });

  /**
   * HashMap - LinkedHashMap Implementation for JavaScript
   * @author Jack Moxley
   * @copyright Jack Moxley <https://github.com/jackmoxley>
   * @licence MIT
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
     *   - One of
     *      - an object that provides a [Symbol.Iterator] function with the same signature as `Map.[Symbol.Iterator]`, such as `Map` or this `HashMap` and `LinkedHashMap`
     *          - or a 2 dimensional key-value array, e.g. `[['key1','val1'], ['key2','val2']]`.
     *      - an object that provides a entries function with the same signature as `Map.entries`, such as `Map` or this `HashMap` and `LinkedHashMap`
     *      - an object that provides a forEach function with the same signature as `Map.forEach`, such as `Map` or this `HashMap` and `LinkedHashMap`
     *
     * @example <caption>Create an empty LinkedHashMap</caption>
     * const linkedhashmap = new LinkedHashMap();
     * // linkedhashmap.size === 0;
     * @example <caption>Create LinkedHashMap from an array of key value pairs</caption>
     * const arr = [[1,'value1'],[2,'value2'],[3,'value3']];
     * const linkedhashmap = new LinkedHashMap(arr);
     * // linkedhashmap.size === 3;
     * @example <caption>Create LinkedHashMap from another map</caption>
     * const map = new Map([[1,'value1'],[2,'value2'],[3,'value3']])
     * const linkedhashmap = new LinkedHashMap(map);
     * // linkedhashmap.size === 3;
     * @example <caption>Create LinkedHashMap from another HashMap</caption>
     * const first = new HashMap([[1,'value1'],[2,'value2'],[3,'value3']])
     * const linkedhashmap = new LinkedHashMap(first);
     * // linkedhashmap.size === 3;
     * // will accept LinkedHashMap as well
     * @example <caption>Create LinkedHashMap from a class with symbol iterator</caption>
     * class MyIterable = {
     *     *[Symbol.iterator] () {
     *         yield ["key1", "value1"];
     *         yield ["key2", "value2"];
     *         yield ["key3", "value3"];
     *         yield ["key4", "value4"];
     *     }
     * }
     * const iterable = new MyIterable();
     * const linkedhashmap = new LinkedHashMap(iterable);
     * // linkedhashmap.size === 4;
     * // it doesn't have to be a generator, an iterator works too.
     * @example <caption>Create LinkedHashMap from an object with an entries generator function</caption>
     * const entriesObj = {
     *     entries: function* () {
     *         yield ["key1", "value1"];
     *         yield ["key2", "value2"];
     *         yield ["key3", "value3"];
     *         yield ["key4", "value4"];
     *     }
     * }
     * const linkedhashmap = new LinkedHashMap(entriesObj);
     * // linkedhashmap.size === 4;
     * // it doesn't have to be a generator, an iterator works too.
     * @example <caption>Create LinkedHashMap from an object with a forEach function</caption>
     * const forEachObj = {
     *      forEach: (callback, ctx) => {
     *              for (let i = 1; i <= 4; i++) {
     *                  callback.call(ctx, 'value' + i, 'key' + i);
     *              }
     *      }
     * };
     * const linkedhashmap = new LinkedHashMap(forEachObj);
     * // linkedhashmap.size === 4;
     * @param {(Map|HashMap|LinkedHashMap|Iterable.<Array.<key,value>>|Object)} [copy]
     */
    function LinkedHashMap(copy) {
      var _this;

      _classCallCheck(this, LinkedHashMap);

      _this = _super.call(this, copy);

      if (_this.size === 0) {
        _this.start = undefined;
        _this.end = undefined;
      }

      return _this;
    }
    /**
     * @inheritDoc
     * @return {HashMap}
     */


    _createClass(LinkedHashMap, [{
      key: "clear",
      value: function clear() {
        this.start = undefined;
        this.end = undefined;
        return _get(_getPrototypeOf(LinkedHashMap.prototype), "clear", this).call(this);
      }
      /**
       *
       * @param key
       * @param value
       * @param {HashMap#overrides<equals, hash>} [overrides] - a set of optional overrides to allow a user to define the hashcode and equals methods, rather than them being looked up.     * @return {HashMap}
       * @return {LinkedHashMap}
       */

    }, {
      key: "setLeft",
      value: function setLeft(key, value, overrides) {
        var op = this.equalsAndHash(key, overrides);
        op.addToStart = true;
        this.buckets.set(key, value, op);
        return this;
      }
      /**
       *
       * @param key
       * @param handler
       * @param {HashMap#overrides<equals, hash>} [overrides] - a set of optional overrides to allow a user to define the hashcode and equals methods, rather than them being looked up.     * @return {HashMap}
       * @return {*}
       */

    }, {
      key: "emplaceLeft",
      value: function emplaceLeft(key, handler, overrides) {
        var op = this.equalsAndHash(key, overrides);
        op.addToStart = true;
        return this.buckets.emplace(key, handler, op);
      }
      /**
       *
       * @param key
       * @param value
       * @param {HashMap#overrides<equals, hash>} [overrides] - a set of optional overrides to allow a user to define the hashcode and equals methods, rather than them being looked up.     * @return {HashMap}
       * @return {LinkedHashMap}
       */

    }, {
      key: "push",
      value: function push(key, value, overrides) {
        var op = this.equalsAndHash(key, overrides);
        op.moveOnUpdate = true;
        this.buckets.set(key, value, op);
        return this;
      }
      /**
       *
       * @param key
       * @param handler
       * @param {HashMap#overrides<equals, hash>} [overrides] - a set of optional overrides to allow a user to define the hashcode and equals methods, rather than them being looked up.     * @return {HashMap}
       * @return {*}
       */

    }, {
      key: "pushEmplace",
      value: function pushEmplace(key, handler, overrides) {
        var op = this.equalsAndHash(key, overrides);
        op.moveOnUpdate = true;
        return this.buckets.emplace(key, handler, op);
      }
      /**
       *
       * @param key
       * @param value
       * @param {HashMap#overrides<equals, hash>} [overrides] - a set of optional overrides to allow a user to define the hashcode and equals methods, rather than them being looked up.     * @return {HashMap}
       * @return {LinkedHashMap}
       */

    }, {
      key: "unshift",
      value: function unshift(key, value, overrides) {
        var op = this.equalsAndHash(key, overrides);
        op.moveOnUpdate = true;
        op.addToStart = true;
        this.buckets.set(key, value, op);
        return this;
      }
      /**
       *
       * @param key
       * @param handler
       * @param {HashMap#overrides<equals, hash>} [overrides] - a set of optional overrides to allow a user to define the hashcode and equals methods, rather than them being looked up.     * @return {HashMap}
       * @return {*}
       */

    }, {
      key: "unshiftEmplace",
      value: function unshiftEmplace(key, handler, overrides) {
        var op = this.equalsAndHash(key, overrides);
        op.moveOnUpdate = true;
        op.addToStart = true;
        return this.buckets.emplace(key, handler, op);
      }
      /**
       *
       * @return {undefined|*}
       */

    }, {
      key: "shift",
      value: function shift() {
        var entry = this.start;

        if (entry) {
          entry.parent.deleteEntry(entry);
          return entry.slice();
        }

        return undefined;
      }
      /**
       *
       * @return {undefined|*}
       */

    }, {
      key: "pop",
      value: function pop() {
        var entry = this.end;

        if (entry) {
          entry.parent.deleteEntry(entry);
          return entry.slice();
        }

        return undefined;
      }
      /**
       *
       * @return {undefined|*}
       */

    }, {
      key: "head",
      value: function head() {
        var entry = this.start;

        if (entry) {
          return entry[1];
        }

        return undefined;
      }
      /**
       *
       * @return {undefined|*}
       */

    }, {
      key: "tail",
      value: function tail() {
        var entry = this.end;

        if (entry) {
          return entry[1];
        }

        return undefined;
      }
      /**
       *
       * @return {Option}
       */

    }, {
      key: "optionalHead",
      value: function optionalHead() {
        var entry = this.start;

        if (entry) {
          return _some(entry[1]);
        }

        return none;
      }
      /**
       *
       * @return {Option}
       */

    }, {
      key: "optionalTail",
      value: function optionalTail() {
        var entry = this.end;

        if (entry) {
          return _some(entry[1]);
        }

        return none;
      }
      /**
       *
       * @return {undefined|*}
       */

    }, {
      key: "headKey",
      value: function headKey() {
        var entry = this.start;

        if (entry) {
          return entry[0];
        }

        return undefined;
      }
      /**
       *
       * @return {undefined|*}
       */

    }, {
      key: "tailKey",
      value: function tailKey() {
        var entry = this.end;

        if (entry) {
          return entry[0];
        }

        return undefined;
      }
      /**
       *
       * @return {Option}
       */

    }, {
      key: "optionalHeadKey",
      value: function optionalHeadKey() {
        var entry = this.start;

        if (entry) {
          return _some(entry[0]);
        }

        return none;
      }
      /**
       *
       * @return {Option}
       */

    }, {
      key: "optionalTailKey",
      value: function optionalTailKey() {
        var entry = this.end;

        if (entry) {
          return _some(entry[0]);
        }

        return none;
      }
      /**
       * @inheritDoc
       * @return {LinkedHashMap}
       */

    }, {
      key: "reverse",
      value: function reverse() {
        if (this.size > 1) {
          var entry = this.start;

          do {
            var previous = entry.previous;
            var next = entry.next;
            entry.previous = next;
            entry.next = previous;
            entry = next;
          } while (entry);

          var start = this.start;
          this.start = this.end;
          this.end = start;
        }

        return this;
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
      /**
       * Iterates over all the entries in the map.
       *
       * @yields {entries:Array.<key,value>} each entry in the map
       */

    }, {
      key: Symbol.iterator,
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function value() {
        return regeneratorRuntime.wrap(function value$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.delegateYield(this.entries(), "t0", 1);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, value, this);
      })
      /**
       * Iterates over all the entries in the map.
       *
       * @yields {entries:Array.<key,value>} each entry in the map
       */

    }, {
      key: "entries",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function entries() {
        var entry;
        return regeneratorRuntime.wrap(function entries$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                entry = this.start;

              case 1:
                if (!entry) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return entry.slice();

              case 4:
                entry = entry.next;
                _context2.next = 1;
                break;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, entries, this);
      })
      /**
       * Iterates over all the entries in the map in reverse order.
       *
       * @yields {entries:Array.<key,value>} each entry in the map in reverse order
       */

    }, {
      key: "entriesRight",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function entriesRight() {
        var entry;
        return regeneratorRuntime.wrap(function entriesRight$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                entry = this.end;

              case 1:
                if (!entry) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 4;
                return entry.slice();

              case 4:
                entry = entry.previous;
                _context3.next = 1;
                break;

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, entriesRight, this);
      })
      /**
       * Iterates over all the keys in the map.
       *
       * @yields {key:any} each key in the map
       */

    }, {
      key: "keys",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function keys() {
        var entry;
        return regeneratorRuntime.wrap(function keys$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                entry = this.start;

              case 1:
                if (!entry) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 4;
                return entry[0];

              case 4:
                entry = entry.next;
                _context4.next = 1;
                break;

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, keys, this);
      })
      /**
       * Iterates over all the values in the map.
       *
       * @yields {value:any} each value in the map
       */

    }, {
      key: "values",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function values() {
        var entry;
        return regeneratorRuntime.wrap(function values$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                entry = this.start;

              case 1:
                if (!entry) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 4;
                return entry[1];

              case 4:
                entry = entry.next;
                _context5.next = 1;
                break;

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, values, this);
      })
      /**
       * Iterates over all the keys in the map in reverse.
       * @yields {key:any} each key in the map in reverse order
       */

    }, {
      key: "keysRight",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function keysRight() {
        var entry;
        return regeneratorRuntime.wrap(function keysRight$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                entry = this.end;

              case 1:
                if (!entry) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 4;
                return entry[0];

              case 4:
                entry = entry.previous;
                _context6.next = 1;
                break;

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, keysRight, this);
      })
      /**
       * Iterates over all the values in the map in reverse.
       * @yields {value:any} each value in the map in reverse order
       */

    }, {
      key: "valuesRight",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function valuesRight() {
        var entry;
        return regeneratorRuntime.wrap(function valuesRight$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                entry = this.end;

              case 1:
                if (!entry) {
                  _context7.next = 7;
                  break;
                }

                _context7.next = 4;
                return entry[1];

              case 4:
                entry = entry.previous;
                _context7.next = 1;
                break;

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, valuesRight, this);
      }) // private

      /**
       * @private
       * @param parent
       * @param hash
       * @return {LinkedContainer}
       */

    }, {
      key: "createContainer",
      value: function createContainer(parent, hash) {
        return new LinkedContainer(this, parent, hash);
      }
    }]);

    return LinkedHashMap;
  }(HashMap);
  /**
   * Holds multiple entries, but shrinks to a single container if reduced to a size of one.
   * @private
   */

  var LinkedContainer = /*#__PURE__*/function (_Container) {
    _inherits(LinkedContainer, _Container);

    var _super2 = _createSuper(LinkedContainer);

    function LinkedContainer(map, parent, hash) {
      _classCallCheck(this, LinkedContainer);

      return _super2.call(this, map, parent, hash);
    }

    _createClass(LinkedContainer, [{
      key: "createEntry",
      value: function createEntry(key, value, overrides) {
        var entry = _get(_getPrototypeOf(LinkedContainer.prototype), "createEntry", this).call(this, key, value, overrides);

        var map = this.map;

        if (map.start === undefined) {
          map.end = map.start = entry;
        } else if (overrides.addToStart) {
          map.start.previous = entry;
          entry.next = map.start;
          map.start = entry;
        } else {
          map.end.next = entry;
          entry.previous = map.end;
          map.end = entry;
        }

        return entry;
      }
    }, {
      key: "updateEntry",
      value: function updateEntry(entry, newValue, overrides) {
        _get(_getPrototypeOf(LinkedContainer.prototype), "updateEntry", this).call(this, entry, newValue, overrides);

        if (overrides.moveOnUpdate) {
          if (overrides.addToStart) {
            if (entry.previous) {
              if (entry.next) {
                entry.next.previous = entry.previous;
              }

              entry.previous.next = entry.next;

              if (entry === this.map.end) {
                this.map.end = entry.previous;
              }

              entry.previous = undefined;
              this.map.start.previous = entry;
              entry.next = this.map.start;
              this.map.start = entry;
            }
          } else if (entry.next) {
            if (entry.previous) {
              entry.previous.next = entry.next;
            }

            entry.next.previous = entry.previous;

            if (entry === this.map.start) {
              this.map.start = entry.next;
            }

            entry.next = undefined;
            this.map.end.next = entry;
            entry.previous = this.map.end;
            this.map.end = entry;
          }
        }
      }
    }, {
      key: "deleteIndex",
      value: function deleteIndex(idx) {
        var oldEntry = _get(_getPrototypeOf(LinkedContainer.prototype), "deleteIndex", this).call(this, idx);

        var map = this.map;

        if (oldEntry.previous) {
          oldEntry.previous.next = oldEntry.next;
        } else {
          map.start = oldEntry.next;
        }

        if (oldEntry.next) {
          oldEntry.next.previous = oldEntry.previous;
        } else {
          map.end = oldEntry.previous;
        }
      }
    }]);

    return LinkedContainer;
  }(Container);

  /*
   * @author Jack Moxley
   * @copyright Jack Moxley <https://github.com/jackmoxley>
   * @licence MIT
   */
  var Mootable = {
    HashMap: HashMap,
    LinkedHashMap: LinkedHashMap,
    hash: hash,
    isFunction: isFunction,
    isIterable: isIterable,
    isString: isString,
    equalsAndHash: equalsAndHash,
    hashCodeFor: hashCodeFor,
    equalsFor: equalsFor,
    some: _some,
    none: none,
    Option: Option,
    sameValueZero: sameValueZero,
    strictEquals: strictEquals,
    abstractEquals: abstractEquals,
    sameValue: sameValue,
    hammingWeight: hammingWeight
  };

  exports.HashMap = HashMap;
  exports.LinkedHashMap = LinkedHashMap;
  exports.Mootable = Mootable;
  exports.default = LinkedHashMap;

})));
