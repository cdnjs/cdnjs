// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"IxO8":[function(require,module,exports) {
function _defineProperty(obj, key, value) {
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

module.exports = _defineProperty;
},{}],"QVnC":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

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
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
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
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
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
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
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
        context.arg = undefined;
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

  Gp[toStringTagSymbol] = "Generator";

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

          next.value = undefined;
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
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
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
          context.arg = undefined;
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
        this.arg = undefined;
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
  typeof module === "object" ? module.exports : {}
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

},{}],"PMvg":[function(require,module,exports) {
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":"QVnC"}],"agGE":[function(require,module,exports) {
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

module.exports = _asyncToGenerator;
},{}],"bWmH":[function(require,module,exports) {
/**
 * Group of functions to get SharePoint API URI endpoints
 *
 * @const {Object}
 */
var endpoints = {
  site: {},
  users: {},
  lists: {},
  folders: {}
};
/**
 * Return the base API URI
 *
 * @return {String}
 */

endpoints.baseApiUri = function () {
  return '/_api/web';
};
/**
 * Return URI for site metadata
 *
 * @return {String}
 */


endpoints.site.info = function () {
  return endpoints.baseApiUri();
};
/**
 * Return URI for site metadata
 *
 * @return {String}
 */


endpoints.site.resources = function () {
  return endpoints.baseApiUri();
};
/**
 * Return URI for site context information
 *
 * @return {String}
 */


endpoints.site.contextInfo = function () {
  return '/_api/ContextInfo';
};
/**
 * Return URI for site's parent info
 *
 * @return {String}
 */


endpoints.site.parentSite = function () {
  return "".concat(endpoints.baseApiUri(), "/ParentWeb");
};
/**
 * Return URI for site's recycle bin
 *
 * @return {String}
 */


endpoints.site.recycleBin = function () {
  return "".concat(endpoints.baseApiUri(), "/RecycleBin");
};
/**
 * Return URI for site regional settings
 *
 * @return {String}
 */


endpoints.site.regionalSettings = function () {
  return "".concat(endpoints.baseApiUri(), "/RegionalSettings");
};
/**
 * Return URI to get basic information for current user
 *
 * @return {String}
 */


endpoints.users.current = function () {
  return "".concat(endpoints.baseApiUri(), "/CurrentUser");
};
/**
 * Return URI to get users list metadata
 *
 * @return {String}
 */


endpoints.users.listMetadata = function () {
  return "".concat(endpoints.baseApiUri(), "/SiteUserInfoList");
};
/**
 * Return URI to get users list fields
 *
 * @param {String} [query]
 * @return {String}
 */


endpoints.users.listFields = function () {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "".concat(endpoints.users.listMetadata(), "/Fields").concat(query);
};
/**
 * Return URI to get users records
 *
 * @param {String} [query]
 * @return {String}
 */


endpoints.users.listItems = function () {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "".concat(endpoints.users.listMetadata(), "/Items").concat(query);
};
/**
 * Return URI to get a given user information
 *
 * @param {Number} id
 * @return {String}
 */


endpoints.users.byId = function (id) {
  return "".concat(endpoints.users.listMetadata(), "/Items(").concat(id, ")");
};
/**
 * Return URI to get aall lists metadata
 *
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.index = function () {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "".concat(endpoints.baseApiUri(), "/Lists").concat(query);
};
/**
 * Return URI to get a given list metadata
 *
 * @param {String} title
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.byTitle = function (title) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "".concat(endpoints.lists.index(), "/GetByTitle('").concat(title, "')").concat(query);
};
/**
 * Return URI to get a given list fields
 *
 * @param {String} title
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.fields = function (title) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "".concat(endpoints.lists.byTitle(title), "/Fields").concat(query);
};
/**
 * Return URI to get a given list items
 *
 * @param {String} title
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.items = function (title) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "".concat(endpoints.lists.byTitle(title), "/Items").concat(query);
};
/**
 * Return URI to get an specific list item
 *
 * @param {String} title
 * @param {Number} itemId
 * @param {String} [query]
 * @return {String}
 */


endpoints.lists.itemById = function (title, itemId) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return endpoints.lists.items(title, "(".concat(itemId, ")").concat(query));
};
/**
 * Return URI to handle list items attachments
 *
 * @param {String} title
 * @param {Number} itemId
 * @return {String}
 */


endpoints.lists.itemAttachments = function (title, itemId) {
  return "".concat(endpoints.lists.itemById(title, itemId), "/AttachmentFiles");
};
/**
 * Return URI to handle list items attachments
 *
 * @param {String} title
 * @param {Number} itemId
 * @param {String} fileName
 * @return {String}
 */


endpoints.lists.itemAttachmentByName = function (title, itemId, fileName) {
  return "".concat(endpoints.lists.itemById(title, itemId), "/AttachmentFiles/GetByFileName('").concat(fileName, "')");
};
/**
 * Return URI to handle upload of list items attachments
 *
 * @param {String} title
 * @param {Number} itemId
 * @param {String} fileName
 * @return {String}
 */


endpoints.lists.itemAttachmentsUpload = function (title, itemId, fileName) {
  return "".concat(endpoints.lists.itemAttachments(title, itemId), "/Add(filename='").concat(fileName, "')");
};
/**
 * Return URI to handle renaming of list items attachments
 *
 * @param {String} oldFileUrl
 * @param {String} newFileUrl
 * @return {String}
 */


endpoints.lists.itemAttachmentsRename = function (oldFileUrl, newFileUrl) {
  return "".concat(endpoints.folders.fileByUrl(oldFileUrl), "/MoveTo(newurl='").concat(newFileUrl, "',flags=1)");
};
/**
 * Return URI for all the libraries
 *
 * @param {String} [query]
 * @return {String}
 */


endpoints.folders.index = function () {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "".concat(endpoints.baseApiUri(), "/Folders").concat(query);
};
/**
 * Return URI to access folder by relative URL
 *
 * @param {String} relativeUrl
 * @return {String}
 */


endpoints.folders.folderByUrl = function (relativeUrl) {
  return "".concat(endpoints.baseApiUri(), "/GetFolderByServerRelativeUrl('").concat(relativeUrl, "')");
};
/**
 * Return URL to list of folders within a given folder
 *
 * @param {String} relativeUrl
 * @param {String} [query]
 * @return {String}
 */


endpoints.folders.foldersInFolder = function (relativeUrl) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "".concat(endpoints.folders.folderByUrl(relativeUrl), "/Folders").concat(query);
};
/**
 * Return URL to list of files within a given folder
 *
 * @param {String} relativeUrl
 * @param {String} [query]
 * @return {String}
 */


endpoints.folders.filesInFolder = function (relativeUrl) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "".concat(endpoints.folders.folderByUrl(relativeUrl), "/Files").concat(query);
};
/**
 * Return URL to upload a file to a folder
 *
 * @param {String} relativeUrl
 * @param {String} fileName
 * @param {Boolean} [overwrite]
 * @return {String}
 */


endpoints.folders.newFileToFolder = function (relativeUrl, fileName) {
  var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return "".concat(endpoints.folders.filesInFolder(relativeUrl), "/Add(overwrite=").concat(overwrite, ",url='").concat(fileName, "')");
};
/**
 * Return URI to access files by relative URL
 *
 * @param {String} relativeUrl
 * @return {String}
 */


endpoints.folders.fileByUrl = function (relativeUrl) {
  return "".concat(endpoints.baseApiUri(), "/GetFileByServerRelativeUrl('").concat(relativeUrl, "')");
};

module.exports = endpoints;
},{}],"Mtaa":[function(require,module,exports) {
"use strict";

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-disable arrow-body-style */
var endpoints = require('./endpoints');
/**
 * Define all possible requests to the SharePoint API
 *
 * @var {Object<Function>}
 */


var requests = {};
/**
 * Fetch site root API
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */

requests.getSite = function (http) {
  return http.get(endpoints.site.info());
};
/**
 * Fetch site context API for the request digest
 *
 * @param {Axios} http
 * @return {Promise<String>}
 */


requests.getRequestDigest = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(http) {
    var resp;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return http.post(endpoints.site.contextInfo(), null, {
              digest: false
            });

          case 2:
            resp = _context.sent;
            return _context.abrupt("return", resp.FormDigestValue || resp.GetContextWebInformation.FormDigestValue);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Fetch for site parent metadata
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */


requests.getSiteParent = function (http) {
  return http.get(endpoints.site.parentSite());
};
/**
 * Fetch list of content in site Recycle Bin
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */


requests.getSiteRecycleBin = function (http) {
  return http.get(endpoints.site.recycleBin());
};
/**
 * Fetch for site Regional Settings
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */


requests.getSiteRegionalSettings = function (http) {
  return http.get(endpoints.site.regionalSettings());
};
/**
 * Fetch for basic current user information
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */


requests.getSiteCurrentUser = function (http) {
  return http.get(endpoints.users.current());
};
/**
 * Fetch list metadata for site users
 *
 * @param {Axios} http
 * @return {Promise<Object>}
 */


requests.getSiteUsersList = function (http) {
  return http.get(endpoints.users.listMetadata());
};
/**
 * Fetch list fields metadata for site users
 *
 * @param {Axios} http
 * @param {String} [query]
 * @return {Promise<Array>}
 */


requests.getSiteUsersListFields = function (http) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return http.get(endpoints.users.listFields(query));
};
/**
 * Fetch list items for site users
 *
 * @param {Axios} http
 * @param {String} [query]
 * @return {Promise<Array>}
 */


requests.getSiteUsersListItems = function (http) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return http.get(endpoints.users.listItems(query));
};
/**
 * Fetch a single list item with user information
 *
 * @param {Axios} http
 * @param {Number} id
 * @return {Promise<Object>}
 */


requests.getSiteUserById = function (http, id) {
  return http.get(endpoints.users.byId(id));
};
/**
 * Fetch list of all site lists
 *
 * @param {Axios} http
 * @param {String} [query]
 * @return {Promise<Array>}
 */


requests.getLists = function (http) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return http.get(endpoints.lists.index(query));
};
/**
 * Create a new list in the site
 *
 * @param {Axios} http
 * @param {String} title
 * @return {Promise<Object>}
 */


requests.createList = function (http, title) {
  return http.post(endpoints.lists.index(), {
    __metadata: {
      type: 'SP.List'
    },
    BaseTemplate: 100,
    Title: title
  });
};
/**
 * Delete an existing list in the site
 *
 * @param {Axios} http
 * @param {String} title
 * @return {Promise<Object>}
 */


requests.deleteList = function (http, title) {
  return http.delete(endpoints.lists.byTitle(title));
};
/**
 * Fetch list metadata
 *
 * @param {Axios} http
 * @param {String} title
 * @param {String} [query]
 * @return {Promise<Object>}
 */


requests.getListByTitle = function (http, title) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return http.get(endpoints.lists.byTitle(title, query));
};
/**
 * Fetch list metadata
 *
 * @param {Axios} http
 * @param {String} title
 * @return {Promise<String>}
 */


requests.getListItemType = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(http, title) {
    var resp;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return requests.getListByTitle(http, title, '?$select=ListItemEntityTypeFullName');

          case 2:
            resp = _context2.sent;
            return _context2.abrupt("return", resp.ListItemEntityTypeFullName);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Fetch list fields metadata
 *
 * @param {Axios} http
 * @param {String} title
 * @param {String} [query]
 * @return {Promise<Array>}
 */


requests.getListFields = function (http, title) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return http.get(endpoints.lists.fields(title, query));
};
/**
 * Fetch list items
 *
 * @param {Axios} http
 * @param {String} title
 * @param {String} [query]
 * @return {Promise<Array>}
 */


requests.getListItems = function (http, title) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return http.get(endpoints.lists.items(title, query));
};
/**
 * Fetch a single list item
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @param {String} [query]
 * @return {Promise<Object>}
 */


requests.getListItemById = function (http, title, itemId) {
  var query = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  return http.get(endpoints.lists.itemById(title, itemId, query));
};
/**
 * Create a new record to the list
 *
 * @param {Axios} http
 * @param {String} title
 * @param {String} type
 * @param {Object} data
 * @return {Promise<Array>}
 */


requests.postListItem = function (http, title, type, data) {
  return http.post(endpoints.lists.items(title), _objectSpread({
    __metadata: {
      type: type
    }
  }, data));
};
/**
 * Update an existing record in the list
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @param {String} type
 * @param {Object} data
 * @return {Promise<Array>}
 */


requests.patchListItem = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(http, title, itemId, type, data) {
    var patchResp, updatedItem;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return http.patch(endpoints.lists.itemById(title, itemId), _objectSpread({
              __metadata: {
                type: type
              }
            }, data));

          case 2:
            patchResp = _context3.sent;
            _context3.next = 5;
            return requests.getListItemById(http, title, itemId);

          case 5:
            updatedItem = _context3.sent;
            delete patchResp.data;
            updatedItem.__response = patchResp;
            return _context3.abrupt("return", updatedItem);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x4, _x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Update an existing record in the list
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @return {Promise<Array>}
 */


requests.deleteListItem = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(http, title, itemId) {
    var originalItem, deleteResp;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return requests.getListItemById(http, title, itemId);

          case 2:
            originalItem = _context4.sent;
            _context4.next = 5;
            return http.delete(endpoints.lists.itemById(title, itemId));

          case 5:
            deleteResp = _context4.sent;
            delete deleteResp.data;
            originalItem.__response = deleteResp;
            return _context4.abrupt("return", originalItem);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Fetch attachments of a given list item
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @return {Promise<Array>}
 */


requests.getListItemAttachments = function (http, title, itemId) {
  return http.get(endpoints.lists.itemAttachments(title, itemId));
};
/**
 * Upload an attachment to a given list item
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @param {String} fileName
 * @param {ArrayBuffer} fileBuffer
 * @return {Promise<Object>}
 */


requests.uploadListItemAttachment = function (http, title, itemId, fileName, fileBuffer) {
  return http.post(endpoints.lists.itemAttachmentsUpload(title, itemId, fileName), fileBuffer);
};
/**
 * Rename an existing attachment from a given list item
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @param {String} oldFileName
 * @param {String} newFileName
 * @return {Promise<Object>}
 */


requests.renameListItemAttachment = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(http, title, itemId, oldFileName, newFileName) {
    var attachments, oldFileUrl, newFileUrl;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return requests.getListItemAttachments(http, title, itemId);

          case 2:
            attachments = _context5.sent;
            oldFileUrl = attachments.find(function (att) {
              return att.FileName === oldFileName;
            }).ServerRelativeUrl;
            newFileUrl = oldFileUrl.replace(oldFileName, newFileName);
            return _context5.abrupt("return", http.patch(endpoints.lists.itemAttachmentsRename(oldFileUrl, newFileUrl)));

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x12, _x13, _x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Delete an attachment of a given list item
 *
 * @param {Axios} http
 * @param {String} title
 * @param {Number} itemId
 * @param {String} fileName
 * @return {Promise<Object>}
 */


requests.deleteListItemAttachment = function (http, title, itemId, fileName) {
  return http.delete(endpoints.lists.itemAttachmentByName(title, itemId, fileName));
};
/**
 * Fetch list of all site folders/libraries
 *
 * @param {Axios} http
 * @param {String} [query]
 * @return {Promise<Array>}
 */


requests.getFolders = function (http) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return http.get(endpoints.folders.index(query));
};
/**
 * Fetch the content with a given folder/library based on its relative URL
 *
 * @param {Axios} http
 * @param {String} relativeUrl
 * @return {Promise<Object>}
 */


requests.getFolderByUrl = function (http, relativeUrl) {
  return http.get(endpoints.folders.folderByUrl(relativeUrl));
};
/**
 * Fetch the existing folders within a given folder based on its relative URL
 *
 * @param {Axios} http
 * @param {String} relativeUrl
 * @param {String} [query]
 * @return {Promise<Object>}
 */


requests.getFoldersInFolder = function (http, relativeUrl) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return http.get(endpoints.folders.foldersInFolder(relativeUrl, query));
};

requests.createFolder = function (http, relativeUrl, folderName) {
  return http.post(endpoints.folders.index(), {
    ServerRelativeUrl: "".concat(relativeUrl, "/").concat(folderName),
    __metadata: {
      type: 'SP.Folder'
    }
  });
};
/**
 * Fetch the existing folders within a given folder based on its relative URL
 *
 * @param {Axios} http
 * @param {String} relativeUrl
 * @param {String} [query]
 * @return {Promise<Object>}
 */


requests.getFilesInFolder = function (http, relativeUrl) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return http.get(endpoints.folders.filesInFolder(relativeUrl, query));
};
/**
 * Fetch the content with a given file within a library based on its relative URL
 *
 * @param {Axios} http
 * @param {String} relativeUrl
 * @return {Promise<Object>}
 */


requests.getFileByUrl = function (http, relativeUrl) {
  return http.get(endpoints.folders.fileByUrl(relativeUrl));
};
/**
 * Fetch the existing folders within a given folder based on its relative URL
 *
 * @param {Axios} http
 * @param {String} relativeUrl
 * @param {String} fileName
 * @param {ArrayBuffer} fileBuffer
 * @return {Promise<Object>}
 */


requests.uploadFileToFolder = function (http, relativeUrl, fileName, fileBuffer) {
  return http.post(endpoints.folders.newFileToFolder(relativeUrl, fileName), fileBuffer);
};

module.exports = requests;
},{"@babel/runtime/helpers/defineProperty":"IxO8","@babel/runtime/regenerator":"PMvg","@babel/runtime/helpers/asyncToGenerator":"agGE","./endpoints":"bWmH"}],"NVR6":[function(require,module,exports) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
},{}],"XfJI":[function(require,module,exports) {
var arrayLikeToArray = require("./arrayLikeToArray");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
},{"./arrayLikeToArray":"NVR6"}],"OMTj":[function(require,module,exports) {
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;
},{}],"UyFj":[function(require,module,exports) {
var arrayLikeToArray = require("./arrayLikeToArray");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
},{"./arrayLikeToArray":"NVR6"}],"wFNi":[function(require,module,exports) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
},{}],"Fhqp":[function(require,module,exports) {
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var unsupportedIterableToArray = require("./unsupportedIterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":"XfJI","./iterableToArray":"OMTj","./unsupportedIterableToArray":"UyFj","./nonIterableSpread":"wFNi"}],"EDTP":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"S1cf":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":"EDTP"}],"H6Qo":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"S1cf"}],"rj2i":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"S1cf"}],"woEt":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":"S1cf"}],"V30M":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"M8l6":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"S1cf"}],"YdsM":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],"bIiH":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"YdsM"}],"aS8y":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"bIiH"}],"YZjV":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"a2Uu":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"KxkP":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"YZjV","../helpers/combineURLs":"a2Uu"}],"ZeD7":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"S1cf"}],"w7LF":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"S1cf"}],"dn2M":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"S1cf"}],"KRuG":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"S1cf","./../core/settle":"aS8y","./../helpers/buildURL":"H6Qo","../core/buildFullPath":"KxkP","./../helpers/parseHeaders":"ZeD7","./../helpers/isURLSameOrigin":"w7LF","../core/createError":"bIiH","./../helpers/cookies":"dn2M"}],"pBGv":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
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
  } // if setTimeout wasn't available but was latter defined


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
  } // if clearTimeout wasn't available but was latter defined


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
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

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
},{}],"BXyq":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"S1cf","./helpers/normalizeHeaderName":"M8l6","./adapters/xhr":"KRuG","./adapters/http":"KRuG","process":"pBGv"}],"uz6X":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"S1cf","./transformData":"woEt","../cancel/isCancel":"V30M","../defaults":"BXyq"}],"OHvn":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

},{"../utils":"S1cf"}],"OvAf":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../utils":"S1cf","../helpers/buildURL":"H6Qo","./InterceptorManager":"rj2i","./dispatchRequest":"uz6X","./mergeConfig":"OHvn"}],"mIKj":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"tsWd":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"mIKj"}],"X8jb":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"nUiQ":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"S1cf","./helpers/bind":"EDTP","./core/Axios":"OvAf","./core/mergeConfig":"OHvn","./defaults":"BXyq","./cancel/Cancel":"mIKj","./cancel/CancelToken":"tsWd","./cancel/isCancel":"V30M","./helpers/spread":"X8jb"}],"dZBD":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"nUiQ"}],"HUC2":[function(require,module,exports) {
"use strict";

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require('axios').default;
/**
 * Chain of functions to transform request
 *
 * @var {Array<Function>}
 */


module.exports = (0, _toConsumableArray2.default)(axios.defaults.transformRequest);
},{"@babel/runtime/helpers/toConsumableArray":"Fhqp","axios":"dZBD"}],"WJcx":[function(require,module,exports) {
/**
 * Extract data set from subitems of response object
 *
 * @param {*} data
 * @return {*}
 */
module.exports = function (data) {
  if (data && data.d) {
    var _data = data,
        d = _data.d; // eslint-disable-next-line no-param-reassign

    data = d.results || d;
    Object.defineProperty(data, '__next', {
      value: d.__next,
      writable: true
    });
    return data;
  }

  return data;
};
},{}],"kySm":[function(require,module,exports) {
/**
 * Iterate object properties to convert dates
 *
 * @param {Object} obj
 */
var lookForDates = function lookForDates(obj) {
  var DATE_STR_LENGTH = 20;
  Object.keys(obj).forEach(function (key) {
    if (typeof obj[key] === 'string' && obj[key].length === DATE_STR_LENGTH && Date.parse(obj[key])) {
      obj[key] = new Date(obj[key]);
    }
  });
};
/**
 * Sweep the response object(s) and convert dates
 *
 * @param {*} data
 */


module.exports = function (data) {
  if (data) {
    try {
      if (data.constructor === Array) {
        data.forEach(lookForDates);
      } else {
        lookForDates(data);
      }
    } catch (e) {
      /* do nothing */
    }
  }

  return data;
};
},{}],"exFp":[function(require,module,exports) {
"use strict";

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require('axios').default;

var exposeDeepData = require('./expose-deep-data');

var convertDate = require('./convert-date');
/**
 * Chain of functions to transform response
 *
 * @var {Array<Function>}
 */


module.exports = [].concat((0, _toConsumableArray2.default)(axios.defaults.transformResponse), [// custom functions
exposeDeepData, convertDate]);
},{"@babel/runtime/helpers/toConsumableArray":"Fhqp","axios":"dZBD","./expose-deep-data":"WJcx","./convert-date":"kySm"}],"Nbc1":[function(require,module,exports) {
"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Add the header for the request digest token
 *
 * @param {Axios} httpInstance
 * @return {Array<Function>}
 */
module.exports = function (httpInstance) {
  return [
  /*#__PURE__*/
  // on success
  function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(config) {
      var digest, method;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              digest = config.digest, method = config.method;

              if (!(digest !== false && /post/i.test(method))) {
                _context.next = 11;
                break;
              }

              config.method = 'post';
              _context.t0 = _objectSpread;
              _context.t1 = {};
              _context.t2 = config.headers;
              _context.next = 8;
              return httpInstance.defaults.requestDigest;

            case 8:
              _context.t3 = _context.sent;
              _context.t4 = {
                'X-RequestDigest': _context.t3
              };
              config.headers = (0, _context.t0)(_context.t1, _context.t2, _context.t4);

            case 11:
              return _context.abrupt("return", config);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()];
};
},{"@babel/runtime/regenerator":"PMvg","@babel/runtime/helpers/defineProperty":"IxO8","@babel/runtime/helpers/asyncToGenerator":"agGE"}],"MXxe":[function(require,module,exports) {
/**
 * Define default headers
 *
 * @constant {Object}
 */
module.exports = Object.freeze({
  'Accept': 'application/json;odata=verbose',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json;odata=verbose'
});
},{}],"daRU":[function(require,module,exports) {
"use strict";

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var commonHeaders = require('./headers-common');
/**
 * Define headers for DELETE method
 *
 * @constant {Object}
 */


module.exports = Object.freeze(_objectSpread({}, commonHeaders, {
  'X-Http-Method': 'DELETE',
  'If-Match': '*'
}));
},{"@babel/runtime/helpers/defineProperty":"IxO8","./headers-common":"MXxe"}],"YqcP":[function(require,module,exports) {
var headers = require('../../config/headers-delete');
/**
 * Replace the DELETE method by POST and add the required headers
 *
 * @var {Array<Function>}
 */


module.exports = [// on success
function (config) {
  if (/delete/i.test(config.method)) {
    config.method = 'post';
    config.headers = headers;
  }

  return config;
}];
},{"../../config/headers-delete":"daRU"}],"pAqz":[function(require,module,exports) {
"use strict";

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var commonHeaders = require('./headers-common');
/**
 * Define headers for PATCH method
 *
 * @constant {Object}
 */


module.exports = Object.freeze(_objectSpread({}, commonHeaders, {
  'X-Http-Method': 'MERGE',
  'If-Match': '*'
}));
},{"@babel/runtime/helpers/defineProperty":"IxO8","./headers-common":"MXxe"}],"HIh0":[function(require,module,exports) {
var headers = require('../../config/headers-patch');
/**
 * Replace the PATCH method by POST and add the required headers
 *
 * @var {Array<Function>}
 */


module.exports = [// on success
function (config) {
  if (/patch/i.test(config.method)) {
    config.method = 'post';
    config.headers = headers;
  }

  return config;
}];
},{"../../config/headers-patch":"pAqz"}],"QURJ":[function(require,module,exports) {
var headers = require('../../config/headers-common');
/**
 * Add the default headers to all requests
 *
 * @var {Array<Function>}
 */


module.exports = [// on success
function (config) {
  config.withCredentials = true;
  config.headers = headers;
  return config;
}];
},{"../../config/headers-common":"MXxe"}],"rQSW":[function(require,module,exports) {
var requestDigest = require('./request-digest');

var deleteMethod = require('./delete-method');

var patchMethod = require('./patch-method');

var addHeaders = require('./default-headers');
/**
 * Consolidate all functions to be run on request interception
 *
 * @var {Array<Array|Function>}
 */


module.exports = [// custom functions
requestDigest, deleteMethod, patchMethod, addHeaders];
},{"./request-digest":"Nbc1","./delete-method":"YqcP","./patch-method":"HIh0","./default-headers":"QURJ"}],"kjEN":[function(require,module,exports) {
/**
 * Put the data object to higher level and wrap response metadata
 *
 * @var {Array<Function>}
 */
module.exports = [// on success
function (response) {
  var data = response.data;

  if (data) {
    delete response.data;
    Object.defineProperty(data, '__response', {
      value: response,
      writable: true
    });
    return data;
  }

  return response;
}];
},{}],"xSvZ":[function(require,module,exports) {
var rewrap = require('./rewrap');
/**
 * Consolidate all functions to be run on response interception
 *
 * @var {Array<Array|Function>}
 */


module.exports = [// custom functions
rewrap];
},{"./rewrap":"kjEN"}],"f2bC":[function(require,module,exports) {
"use strict";

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require('axios').default;

var reqTransformers = require('./transformers/request');

var respTransformers = require('./transformers/response');

var requestInterceptors = require('./interceptors/request');

var responseInterceptors = require('./interceptors/response');

var _require = require('../facades/requests'),
    getRequestDigest = _require.getRequestDigest;
/**
 * Create and configure the custom instance of axios and provide it
 *
 * @param {String} [siteUrl] If no URL is provided, current site's will be used
 * @return {Axios}
 */


module.exports = function (siteUrl) {
  var http = axios.create();

  http.defaults.baseURL = siteUrl || function () {
    var delimiters = new RegExp(['/lists/', '/folders/', '/_layouts/', '/_api/', '/_vti_bin/', '/sitepages/'].join('|'));
    return window.location.href.toLowerCase().split(delimiters)[0];
  }();

  http.defaults.transformRequest = reqTransformers;
  requestInterceptors.forEach(function (intc) {
    var _http$interceptors$re;

    return (_http$interceptors$re = http.interceptors.request).use.apply(_http$interceptors$re, (0, _toConsumableArray2.default)(intc.constructor === Function ? intc(http) : intc));
  });
  http.defaults.transformResponse = respTransformers;
  responseInterceptors.forEach(function (intc) {
    var _http$interceptors$re2;

    return (_http$interceptors$re2 = http.interceptors.response).use.apply(_http$interceptors$re2, (0, _toConsumableArray2.default)(intc.constructor === Function ? intc(http) : intc));
  });
  http.defaults.requestDigest = getRequestDigest(http);
  return http;
};
},{"@babel/runtime/helpers/toConsumableArray":"Fhqp","axios":"dZBD","./transformers/request":"HUC2","./transformers/response":"exFp","./interceptors/request":"rQSW","./interceptors/response":"xSvZ","../facades/requests":"Mtaa"}],"OUZ9":[function(require,module,exports) {
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
},{}],"vKPt":[function(require,module,exports) {
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

module.exports = _iterableToArrayLimit;
},{}],"Rom6":[function(require,module,exports) {
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
},{}],"HETk":[function(require,module,exports) {
var arrayWithHoles = require("./arrayWithHoles");

var iterableToArrayLimit = require("./iterableToArrayLimit");

var unsupportedIterableToArray = require("./unsupportedIterableToArray");

var nonIterableRest = require("./nonIterableRest");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
},{"./arrayWithHoles":"OUZ9","./iterableToArrayLimit":"vKPt","./unsupportedIterableToArray":"UyFj","./nonIterableRest":"Rom6"}],"PlsG":[function(require,module,exports) {
"use strict";

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generate a byte buffer from a HTML file input
 *
 * @param {String|HTMLElement|FileList|File} baseInput Some reference of the input type 'file':
 *          String - if it is a query selector;
 *          HTMLElement - if it is a direct reference to the input element;
 *          FileList - if it is direct reference to the 'files' attribute of the element; and
 *          File - if it is a direct reference to the file.
 *        For the three first options, as it will result in a array of files (FileList), only
 *        the first File of the collection will be selected. If you want to get the byte buffer
 *        of other files, provide a File instance explicitaly
 * @return {Promise<ArrayBuffer>}
 */
module.exports = function genFileBuffer(baseInput) {
  var input = baseInput;
  var reader = new FileReader();

  var file = function () {
    switch (input.constructor.name) {
      case 'String':
        input = document.querySelector(input);

      /* fall through */

      case 'HTMLInputElement':
        input = input.files;

      /* fall through */

      case 'FileList':
        var _input = input;

        var _input2 = (0, _slicedToArray2.default)(_input, 1);

        input = _input2[0];

      /* fall through */

      case 'File':
        return input;

      default:
        throw new TypeError('Type must be an instance of HTMLInputElement, FileList, File or String (input selector)');
    }
  }();

  return new Promise(function (resolve, reject) {
    reader.onloadend = function (ev) {
      return resolve(ev.target.result);
    };

    reader.onerror = function (ev) {
      return reject(ev.target.error);
    };

    reader.readAsArrayBuffer(file);
  });
};
},{"@babel/runtime/helpers/slicedToArray":"HETk"}],"N2NR":[function(require,module,exports) {
"use strict";

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extract file name based on a given input object
 *
 * @param {String|HTMLElement|FileList|File} baseInput Some reference of the input type 'file':
 *          String - if it is a query selector;
 *          HTMLElement - if it is a direct reference to the input element;
 *          FileList - if it is direct reference to the 'files' attribute of the element; and
 *          File - if it is a direct reference to the file.
 *        For the three first options, as it will result in a array of files (FileList), only
 *        the first File of the collection will be selected
 * @return {String}
 */
module.exports = function genFileName(baseInput) {
  var input = baseInput;

  switch (input.constructor.name) {
    case 'String':
      input = document.querySelector(input);

    /* fall through */

    case 'HTMLInputElement':
      input = input.files;

    /* fall through */

    case 'FileList':
      var _input = input;

      var _input2 = (0, _slicedToArray2.default)(_input, 1);

      input = _input2[0];

    /* fall through */

    case 'File':
      return input.name;

    default:
      return null;
  }
};
},{"@babel/runtime/helpers/slicedToArray":"HETk"}],"p0uT":[function(require,module,exports) {
"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable arrow-body-style */

/* eslint-disable no-underscore-dangle */
var requests = require('../facades/requests');

var genFileBuffer = require('../utils/gen-file-buffer');

var genFileName = require('../utils/gen-file-name');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {String} listTitle List title to connect to
 * @param {Axios} httpInstance Customized Axios instance to perform HTTP requests
 */


module.exports = function XomSharePointList(listTitle, httpInstance) {
  /**
   * Store the SharePoint list title
   *
   * @private
   * @var {String}
   */
  var _title = listTitle;
  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */

  var _http = httpInstance;
  /**
   * Eagerly fetches list metadata to get list items type
   *
   * @private
   * @final
   * @var {Promise<String>}
   */

  var _itemsType = requests.getListItemType(_http, _title);
  /**
   * Define property to get & set 'title' value
   *
   * @property {String} title
   */


  Object.defineProperty(this, 'title', {
    get: function get() {
      return _title;
    },
    set: function set(title) {
      _title = String(title);
    }
  });
  /**
   * Retrun the list fields metadata
   *
   * @param {Boolean} [customOnly]
   * @return {Promise<Object>}
   */

  this.fields = function (customOnly) {
    var query = customOnly ? '?$filter=(CanBeDeleted eq true)' : '';
    return requests.getListFields(_http, _title, query);
  };
  /**
   * Return a list of the items stored in the list. If no additional parameter
   * is provided, all records are returned. For your reference, check out
   * https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * on how to build parameters
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */


  this.get = function (params) {
    return requests.getListItems(_http, _title, params);
  };
  /**
   * Retrun a single list item with the given ID
   *
   * @param {Number} id
   * @param {String} [params]
   * @return {Promise<Object>}
   */


  this.find = function (id, params) {
    return requests.getListItemById(_http, _title, id, params);
  };
  /**
   * Save a new record in the SharePoint list
   *
   * @param {Object} data Use literal objects to send data
   * @return {Promise<Object>}
   */


  this.create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(data) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = requests;
              _context.t1 = _http;
              _context.t2 = _title;
              _context.next = 5;
              return _itemsType;

            case 5:
              _context.t3 = _context.sent;
              _context.t4 = data;
              return _context.abrupt("return", _context.t0.postListItem.call(_context.t0, _context.t1, _context.t2, _context.t3, _context.t4));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * Update data of an existing record in the SharePoint list
   *
   * @param {Number} id
   * @param {Object} data Use literal objects to send data
   * @return {Promise<Object>}
   */


  this.update = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(id, data) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = requests;
              _context2.t1 = _http;
              _context2.t2 = _title;
              _context2.t3 = id;
              _context2.next = 6;
              return _itemsType;

            case 6:
              _context2.t4 = _context2.sent;
              _context2.t5 = data;
              return _context2.abrupt("return", _context2.t0.patchListItem.call(_context2.t0, _context2.t1, _context2.t2, _context2.t3, _context2.t4, _context2.t5));

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Delete an existing record from the SharePoint list
   *
   * @param {Number} id
   * @return {Promise<Object>}
   */


  this.delete = function (id) {
    return requests.deleteListItem(_http, _title, id);
  };
  /**
   * Return a list of the attached files in the list item
   *
   * @param {Number} itemId
   * @return {Promise<Array>}
   */


  this.getAttachmentsFrom = function (itemId) {
    return requests.getListItemAttachments(_http, _title, itemId);
  };
  /**
   * Upload a file attachment to a list item
   *
   * @param {Number} itemId
   * @param {String|HTMLElement|FileList|File} fileInput Some reference of the input type 'file':
   *          String - if it is a query selector;
   *          HTMLElement - if it is a direct reference to the input element;
   *          FileList - if it is direct reference to the 'files' attribute of the element; and
   *          File - if it is a direct reference to the file.
   *        For the three first options, as it will result in a array of files (FileList), only
   *        the first File of the collection will be selected. If you want to get the byte buffer
   *        of other files, provide a File instance explicitaly
   * @param {String} [attchmentName] Define a custom name to the attached file
   * @return {Promise<Object>}
   */


  this.attachTo = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(itemId, fileInput, attchmentName) {
      var fileName, fileBuffer;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              fileName = attchmentName || genFileName(fileInput);
              _context3.next = 3;
              return genFileBuffer(fileInput);

            case 3:
              fileBuffer = _context3.sent;
              return _context3.abrupt("return", requests.uploadListItemAttachment(_http, _title, itemId, fileName, fileBuffer));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x4, _x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();
  /**
   * Rename a given file attachment
   *
   * @param {Number} itemId
   * @param {String} attachmentName
   * @param {String} newName
   * @return {Promise<Object>}
   */


  this.renameAttachment = function (itemId, attachmentName, newName) {
    return requests.renameListItemAttachment(_http, _title, itemId, attachmentName, newName);
  };
  /**
   * Remove a given file attachment from the list item
   *
   * @param {Number} itemId
   * @param {String} attachmentName
   * @return {Promise<Object>}
   */


  this.removeAttachment = function (itemId, attachmentName) {
    return requests.deleteListItemAttachment(_http, _title, itemId, attachmentName);
  };
};
},{"@babel/runtime/regenerator":"PMvg","@babel/runtime/helpers/asyncToGenerator":"agGE","../facades/requests":"Mtaa","../utils/gen-file-buffer":"PlsG","../utils/gen-file-name":"N2NR"}],"tCvt":[function(require,module,exports) {
"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable arrow-body-style */

/* eslint-disable no-underscore-dangle */
var requests = require('../facades/requests');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * list through its REST API
 *
 * @constructor
 * @param {String} surveyTitle Survey title to connect to
 * @param {Axios} httpInstance Customized Axios instance to perform HTTP requests
 */


module.exports = function XomSharePointSurvey(surveyTitle, httpInstance) {
  /**
   * Store the SharePoint list name
   *
   * @private
   * @var {String}
   */
  var _title = surveyTitle;
  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */

  var _http = httpInstance;
  /**
   * Eagerly fetches list metadata to get list items type
   *
   * @private
   * @final
   * @var {Promise<String>}
   */

  var _itemsType = requests.getListItemType(_http, _title);
  /**
   * Define property to get & set 'title' value
   *
   * @property {String} title
   */


  Object.defineProperty(this, 'title', {
    get: function get() {
      return _title;
    },
    set: function set(title) {
      _title = String(title);
    }
  });
  /**
   * Get fields that corresponds to the questions and their choices
   *
   * @return {Promise<Array>}
   */

  this.getQuestions = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var response, questions;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return requests.getListFields(_http, _title, '?$filter=(CanBeDeleted eq true)');

          case 2:
            response = _context.sent;
            questions = response.map(function (field) {
              return {
                Field: field.InternalName,
                Description: field.Description,
                Question: field.Title,
                Type: field.TypeDisplayName,
                Choices: field.Choices && field.Choices.results,
                DefaultValue: field.DefaultValue
              };
            });
            Object.defineProperty(questions, '__response', {
              value: response.__response
            });
            return _context.abrupt("return", questions);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  /**
   * Return a list of the responses stored in the survey list. If no additional
   * parameter is provided, all records are returned. For your reference, check out
   * https://social.technet.microsoft.com/wiki/contents/articles/35796.sharepoint-2013-using-rest-api-for-selecting-filtering-sorting-and-pagination-in-sharepoint-list.aspx
   * on how to build parameters
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */

  this.getResponses = function (params) {
    return requests.getListItems(_http, _title, params);
  };
  /**
   * Retrun a single response by its ID
   *
   * @param {Number} id
   * @param {String} [params]
   * @return {Promise<Object>}
   */


  this.findResponse = function (id, params) {
    return requests.getListItemById(_http, _title, id, params);
  };
  /**
   * Save a new response in the SharePoint survey list
   *
   * @param {Object} data Use literal objects to send data
   * @return {Promise<Object>}
   */


  this.submitResponse = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(data) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = requests;
              _context2.t1 = _http;
              _context2.t2 = _title;
              _context2.next = 5;
              return _itemsType;

            case 5:
              _context2.t3 = _context2.sent;
              _context2.t4 = data;
              return _context2.abrupt("return", _context2.t0.postListItem.call(_context2.t0, _context2.t1, _context2.t2, _context2.t3, _context2.t4));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Update the response of an existing record
   *
   * @param {Number} id
   * @param {Object} data Use literal objects to send data
   * @return {Promise<Object>}
   */


  this.changeResponse = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(id, data) {
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = requests;
              _context3.t1 = _http;
              _context3.t2 = _title;
              _context3.t3 = id;
              _context3.next = 6;
              return _itemsType;

            case 6:
              _context3.t4 = _context3.sent;
              _context3.t5 = data;
              return _context3.abrupt("return", _context3.t0.patchListItem.call(_context3.t0, _context3.t1, _context3.t2, _context3.t3, _context3.t4, _context3.t5));

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }();
  /**
   * Delete an existing response
   *
   * @param {Number} id
   * @return {Promise<Object>}
   */


  this.delete = function (id) {
    return requests.deleteListItem(_http, _title, id);
  };
};
},{"@babel/runtime/regenerator":"PMvg","@babel/runtime/helpers/asyncToGenerator":"agGE","../facades/requests":"Mtaa"}],"aDcs":[function(require,module,exports) {
"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable arrow-body-style */

/* eslint-disable no-underscore-dangle */
var requests = require('../facades/requests');

var genFileName = require('../utils/gen-file-name');

var genFileBuffer = require('../utils/gen-file-buffer');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * file library through its REST API
 *
 * @constructor
 * @param {String} folderAddress Library title to connect to
 * @param {Axios} httpInstance Customized Axios instance to perform HTTP requests
 */


module.exports = function XomSharePointFolder(folderAddress, httpInstance) {
  var _this = this;

  /**
   * Store the SharePoint folder relative URL
   *
   * @private
   * @var {String}
   */
  var _address = folderAddress;
  /**
   * Private instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */

  var _http = httpInstance;
  /**
   * Store files type
   *
   * @private
   * @final
   * @var {String}
   */

  var _filesType;
  /**
   * Define property to get 'relativeUrl' value
   *
   * @property {String} relativeUrl
   */


  Object.defineProperty(this, 'relativeUrl', {
    get: function get() {
      var baseUrl = new URL(_http.defaults.baseURL);
      return "".concat(baseUrl.pathname, "/").concat(_address);
    },
    set: function set(address) {
      _address = String(address);
    }
  });
  /**
   * Return a list of the folders within this folder
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */

  this.getSubfolders = function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return requests.getFoldersInFolder(_http, _this.relativeUrl, params);
  };
  /**
   * Create a folder within this folder
   *
   * @param {String} folderName
   * @return {Promise<Object>}
   */


  this.createFolder = function (folderName) {
    return requests.createFolder(_http, _this.relativeUrl, folderName);
  };
  /**
   * Return a list of the files within this folder
   *
   * @param {String} [params]
   * @return {Promise<Array>}
   */


  this.getFiles = function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return requests.getFilesInFolder(_http, _this.relativeUrl, params);
  };
  /**
   * Upload a file into the folder
   *
   * @param {String|HTMLElement|FileList|File} fileInput Some reference of the input type 'file':
   *          String - if it is a query selector;
   *          HTMLElement - if it is a direct reference to the input element;
   *          FileList - if it is direct reference to the 'files' attribute of the element; and
   *          File - if it is a direct reference to the file.
   *        For the three first options, as it will result in a array of files (FileList), only
   *        the first File of the collection will be selected. If you want to get the byte buffer
   *        of other files, provide a File instance explicitaly
   * @param {String} [customFileName] Define a custom name to the attached file
   * @return {Promise<Object>}
   */


  this.upload = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(fileInput, customFileName) {
      var fileName, fileBuffer, result;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fileName = customFileName || genFileName(fileInput);
              _context.next = 3;
              return genFileBuffer(fileInput);

            case 3:
              fileBuffer = _context.sent;
              _context.next = 6;
              return requests.uploadFileToFolder(_http, _this.relativeUrl, fileName, fileBuffer);

            case 6:
              result = _context.sent;
              _filesType = _filesType || result.__metadata.type;
              return _context.abrupt("return", result);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};
},{"@babel/runtime/regenerator":"PMvg","@babel/runtime/helpers/asyncToGenerator":"agGE","../facades/requests":"Mtaa","../utils/gen-file-name":"N2NR","../utils/gen-file-buffer":"PlsG"}],"DCCh":[function(require,module,exports) {
/* eslint-disable arrow-body-style */

/* eslint-disable no-underscore-dangle */
var requests = require('../facades/requests');

var httpFactory = require('../http/http-factory');

var XomSharePointList = require('./XomSharePointList');

var XomSharePointSurvey = require('./XomSharePointSurvey');

var XomSharePointFolder = require('./XomSharePointFolder');
/**
 * Contain the necessary information to stablish a connection to a SharePoint
 * site through its REST API
 *
 * @constructor
 * @param {String} [baseSiteUrl] Base URL for the SharePoint site to connect to.
 *                               If none URL is provided, the instance will assume
 *                               the current site/subsite
 */


module.exports = function XomSharePointSite(baseSiteUrl) {
  /**
   * Base custom instance of Axios
   *
   * @private
   * @final
   * @var {Axios}
   */
  var _http = httpFactory(baseSiteUrl);
  /**
   * Eagerly store current user data (as Promise)
   *
   * @private
   * @final
   * @var {Promise<Object>}
   */


  var _currUser = requests.getSiteCurrentUser(_http).then(function (_ref) {
    var Id = _ref.Id;
    return requests.getSiteUserById(_http, Id);
  });
  /**
   * Define property to get & set 'baseUrl' value
   *
   * @property {String} baseUrl
   */


  Object.defineProperty(this, 'baseUrl', {
    get: function get() {
      return _http.defaults.baseURL;
    },
    set: function set(baseUrl) {
      _http.defaults.baseURL = baseUrl;
    }
  });
  /**
   * Get the SharePoint site metadata
   *
   * @return {Promise}
   */

  this.getInfo = function () {
    return requests.getSite(_http);
  };
  /**
   * Queries the SharePoint API to get user information. Inform nothing to get
   * current user information or pass an specific user ID
   *
   * @param {Number} [id] ID of the user you want the information for
   * @return {Promise}
   */


  this.getUserInfo = function (id) {
    if (id) {
      return requests.getSiteUserById(_http, id);
    }

    return _currUser;
  };
  /**
   * Queries SharePoint API searching for user name
   *
   * @param {String} search Partial name/userID of the user
   * @return {Promise}
   */


  this.searchUser = function (search) {
    return requests.getSiteUsersListItems(_http, "?$filter=substringof('".concat(search, "',Title) or substringof('").concat(search, "',UserName)"));
  };
  /**
   * Return a reference to connect to a SharePoint list
   *
   * @param {String} listTitle SharePoint list title
   * @return {XomSharePointList}
   */


  this.getList = function (listTitle) {
    return new XomSharePointList(listTitle, _http);
  };
  /**
   * Create a new SharePoint list
   *
   * @param {String} listTitle SharePoint list title
   * @return {Promise}
   */


  this.createList = function (listTitle) {
    return requests.createList(_http, listTitle);
  };
  /**
   * Delete an existing SharePoint list
   *
   * @param {String} listTitle SharePoint list title
   * @return {Promise}
   */


  this.deleteList = function (listTitle) {
    return requests.deleteList(_http, listTitle);
  };
  /**
   * Return a reference to connect to a SharePoint survey
   *
   * @param {String} surveyTitle SharePoint survey title
   * @return {XomSharePointSurvey}
   */


  this.getSurvey = function (surveyTitle) {
    return new XomSharePointSurvey(surveyTitle, _http);
  };
  /**
   * Return a reference to connect to a SharePoint file library
   *
   * @param {String} folderAddress SharePoint library/folder title
   * @return {XomSharePointLibrary}
   */


  this.getFolder = function (folderAddress) {
    return new XomSharePointFolder(folderAddress, _http);
  };
};
},{"../facades/requests":"Mtaa","../http/http-factory":"f2bC","./XomSharePointList":"p0uT","./XomSharePointSurvey":"tCvt","./XomSharePointFolder":"aDcs"}],"XVne":[function(require,module,exports) {
var XomSharePointSite = require('./objects/XomSharePointSite');
/**
 * Instantiate a XomSharePoint object to connect to a SharePoint site and,
 * therefore, exchange data with its contents (lists, libraries, permissions)
 * through SharePoint native REST API
 *
 * @param {string} [baseSiteUrl] Base URL of the SharePoint site to connect to
 * @return {XomSharePoint}
 */


module.exports = function xomFactory(baseSiteUrl) {
  return new XomSharePointSite(baseSiteUrl);
};
},{"./objects/XomSharePointSite":"DCCh"}],"UeJd":[function(require,module,exports) {
/*
 * Entry point for browser version
 */
window.xomSharePoint = require('./sharepoint');
},{"./sharepoint":"XVne"}]},{},["UeJd"], null)
//# sourceMappingURL=/xom-sharepoint.js.map