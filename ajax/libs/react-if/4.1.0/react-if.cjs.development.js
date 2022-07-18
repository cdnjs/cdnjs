'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

/**
 * Renders a React component while also checking whether the children are a function or not
 * @param props Props of the component to render
 */

var render = function render(props) {
  if (typeof props.children === 'function') {
    return React__default.createElement(React.Fragment, null, props.children());
  }

  return React__default.createElement(React.Fragment, null, props.children || null);
};

/**
 * If the `<Case />` is the first one to have its condition evaluates to true
 * inside the parent `<Switch />` it will be the only rendered.
 * @param props The props to pass down to the `<Case />` component
 */

var Case = function Case(props) {
  return render(props);
};
Case.defaultProps = {
  children: null
};

/**
 * If no `<Case />` have its condition evaluates to true inside the parent `<Switch />`,
 * the first `<Default />` will be the only one rendered.
 * @param props The props to pass down to the `<Default />` component
 */

var Default = function Default(props) {
  return render(props);
};
Default.defaultProps = {
  children: null
};

/**
 * Must only contain a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block.
 * @param props The props to pass down to the `<Else />` component
 */

var Else = function Else(props) {
  return render(props);
};

/**
 * Must contain only a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block whose condition prop is a promise.
 * @param props The props to pass down to the `<Fallback />` component
 */

var Fallback = function Fallback(props) {
  return render(props);
};

/**
 * Resolves a condition that is {@link BooleanLike} or returns {@link BooleanLike} from a function
 * @param condition The condition to resolve
 */
var getConditionResult = function getConditionResult(condition) {
  var conditionResult = Boolean(typeof condition === 'function' ? condition() : condition);
  return conditionResult;
};

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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
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
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

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
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
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
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
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
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

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
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

/**
 * The MIT License (MIT)
 *
 * Copyright © `2020` `The Sapphire Community and its contributors`
 *
 * Source: https://github.com/sapphiredev/utilities/blob/main/packages/utilities/src/lib/isThenable.ts
 * Full license: https://github.com/sapphiredev/utilities/blob/main/LICENSE.md
 */

/**
 * Verify if the input is a function.
 * @param input The function to verify
 */
function isFunction(input) {
  return typeof input === 'function';
}

function hasThen(input) {
  return Reflect.has(input, 'then') && isFunction(input.then);
}

function hasCatch(input) {
  return Reflect.has(input, 'catch') && isFunction(input["catch"]);
}
/**
 * Verify if an object is a promise.
 * @param input The promise to verify
 */


function isThenable(input) {
  if (typeof input !== 'object' || input === null) return false;
  return input instanceof Promise || input !== Promise.prototype && hasThen(input) && hasCatch(input);
}

/**
 * Compare two arrays without checking for possible nested properties
 * @param a Array to compare with b
 * @param b Array to compare with a
 * @returns True if arrays are identical, false if they are different
 */

var shallowArraysEqual = function shallowArraysEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) throw new Error('shallowArraysEqual only accepts arrays as parameters');
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};
/**
 * Create a CancellablePromise from a native Promise
 * @param promise The promise object to wrap
 * @returns Return value is an object of type CancellablePromise, with 2 properties:
 * - promise: a promise that can be left pending
 * - cancel: the function to use for cancelling the returned promise
 */

var createCancellablePromise = function createCancellablePromise(promise) {
  if (!isThenable(promise)) {
    throw new Error('Argument of createCancellablePromise should be a Promise');
  }

  var isCancelled = {
    value: false
  };
  var wrappedPromise = new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(res, rej) {
      var d;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return promise;

            case 3:
              d = _context.sent;
              return _context.abrupt("return", !isCancelled.value && res(d));

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              !isCancelled.value && rej(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()); // Forward potential additional properties

  Object.keys(promise).forEach(function (key) {
    wrappedPromise[key] = promise[key];
  });
  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      isCancelled.value = true;
    }
  };
};

/**
 * Calls a function only once during component lifecycle;
 * When dependency array is provided, will call the function again if at least one of the dependencies changed
 * @param callback The function to execute only once
 * @param dependencies A list of dependencies whose value, if changed since last call,
 * will trigger the execution of the callback
 */

var useSingleton = function useSingleton(callback, dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }

  var hasRan = React.useRef(false);
  var lastDependencies = React.useRef([]); // Parameters type check

  if (typeof callback !== 'function') {
    throw new Error("Incorrect callback parameter for useSingleton hook; expected a function, but got: '" + typeof callback + "'.");
  }

  if (!Array.isArray(dependencies)) {
    throw new Error("Incorrect dependencies parameter for useSingleton; expected an array, but got: '" + typeof dependencies + "'.");
  }

  var hasDependencies = Array.isArray(dependencies) && dependencies.length > 0;

  if (hasDependencies) {
    // Has dependencies
    var hasAnyDependencyChanged = !shallowArraysEqual(lastDependencies.current, dependencies);

    if (hasAnyDependencyChanged) {
      // Any dep has changed => overwrite last dependencies and execute callback
      lastDependencies.current = dependencies;
    } else if (hasRan.current) {
      // No dep has changed => same behaviour as if no dependencies
      return;
    }
  } else if (hasRan.current) {
    // No dependencies
    return;
  }

  callback();
  hasRan.current = true;
};

/**
 * Must contain only a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block.
 * @param props The props to pass down to the `<Then />` component
 */

var Then = function Then(props) {
  return render(props);
};

/**
 * Is included in the `<If />` component, rendered when the condition prop of `<If />` is a Promise;
 * Renders the Fallback component, if contains any, until provided promise is fulfilled;
 * Renders `<Then />` when promise is fulfilled, `<Else />` when rejected
 */

function IfAsync(_ref) {
  var promise = _ref.promise,
      _ref$keepAlive = _ref.keepAlive,
      keepAlive = _ref$keepAlive === void 0 ? false : _ref$keepAlive,
      children = _ref.children;

  var _useState = React.useState(null),
      isResolved = _useState[0],
      setIsResolved = _useState[1];

  var _useState2 = React.useState(null),
      returnValue = _useState2[0],
      setReturnValue = _useState2[1]; // Make promise cancellable


  var cancellablePromise = React.useMemo(function () {
    return createCancellablePromise(promise);
  }, [promise]);
  var history = React.useRef([]); // Keep history of promises
  // Handle unmount

  React.useEffect(function () {
    return function () {
      if (!keepAlive) {
        cancellablePromise.cancel();
      }
    };
  }, [cancellablePromise, cancellablePromise.promise, keepAlive]); // Await promise

  useSingleton( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
    var data;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setIsResolved(null);
            setReturnValue(null);
            _context.prev = 2;
            _context.next = 5;
            return cancellablePromise.promise;

          case 5:
            data = _context.sent;
            setReturnValue(data);
            setIsResolved(true);
            history.current.push(cancellablePromise);
            _context.next = 16;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            setReturnValue(_context.t0);
            setIsResolved(false);
            history.current.push(cancellablePromise);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 11]]);
  })), [cancellablePromise.promise]);

  if (!children || !isThenable(promise)) {
    return null;
  }

  if (isResolved === null) {
    // Promise is pending
    var hasFallback = React__default.Children.toArray(children).find(function (c) {
      return c.type === Fallback;
    });
    return React__default.createElement(React.Fragment, null, hasFallback || null);
  }

  if (!isResolved) {
    // Promise is fulfilled and rejected
    var hasElse = React__default.Children.toArray(children).find(function (c) {
      return c.type === Else;
    });
    if (!hasElse) return React__default.createElement(React.Fragment, null, null); // Inject caught error

    var elseElement = hasElse;

    if (typeof hasElse.props.children === 'function') {
      elseElement = _extends({}, hasElse, {
        props: _extends({}, hasElse.props, {
          children: function children() {
            return hasElse.props.children(returnValue, history.current, cancellablePromise.promise);
          }
        })
      });
    }

    return React__default.createElement(React.Fragment, null, elseElement);
  } // Promise is fulfilled and resolved


  var hasThen = React__default.Children.toArray(children).find(function (c) {
    return c.type === Then;
  });
  if (!hasThen) return React__default.createElement(React.Fragment, null, null); // Inject promise return value

  var thenElement = hasThen;

  if (typeof hasThen.props.children === 'function') {
    thenElement = _extends({}, hasThen, {
      props: _extends({}, hasThen.props, {
        children: function children() {
          return hasThen.props.children(returnValue, history.current, cancellablePromise.promise);
        }
      })
    });
  }

  return React__default.createElement(React.Fragment, null, thenElement);
}

/**
 * Handles errors by throwing them to the console.
 * `__DEV__` is replaced by tsdx using {@link https://www.npmjs.com/package/babel-plugin-dev-expression babel-plugin-dev-expressions}
 * which will ensure this entire throw is not present in production
 * @param condition The condition to check
 * @param message The message to throw if `condition` resolves to `true`
 */
function tinyWarning(condition, message) {
  {
    if (condition) {
      // check console for IE9 support which provides console
      // only with open devtools
      if (typeof console !== 'undefined') {
        console.warn(message);
      } // Throwing an error and catching it immediately to improve debugging
      // Users can utilize 'pause on caught exceptions' to get into this throw


      try {
        throw new Error(message);
      } catch (x) {// noop
      }
    }
  }
}

/**
 * If condition evaluates to true, renders the `<Then />` block will be rendered,
 * otherwise renders the `<Else />` block. Either block may be omitted.
 *
 * This component can contain any number of `<Then />` or `<Else />` blocks,
 * but only the first block of the right type (either Then or Else, depending on the condition) will be rendered.
 * @param __namedParameters The props to pass down to the `<IF />` component, see {@link ComponentWithConditionProps}
 */

var If = function If(_ref) {
  var condition = _ref.condition,
      _ref$keepAlive = _ref.keepAlive,
      keepAlive = _ref$keepAlive === void 0 ? false : _ref$keepAlive,
      children = _ref.children;

  if (!children) {
    return null;
  }

  tinyWarning(!Array.isArray(children) && !(children.type === Else || children.type === Then) || !React__default.Children.toArray(children).every(function (child) {
    return child.type === Else || child.type === Then || child.type === Fallback;
  }), 'The <If> component should contain <Then /> <Else /> or <Fallback /> components as its children');

  if (isThenable(condition)) {
    return React__default.createElement(IfAsync, {
      promise: condition,
      keepAlive: keepAlive
    }, children);
  }

  var conditionResult = getConditionResult(condition);
  return React__default.createElement(React.Fragment, null, React__default.Children.toArray(children).find(function (c) {
    return c.type !== Else !== !conditionResult;
  }) || null);
};

/**
 * It will render the first matching `<Case />`, or the first encountered `<Default />` (or `null`).
 *
 * This component can contain any number of `<Case />` and one `<Default />` blocks
 * @param __namedParameters Children to pass into the `<Switch />` component
 */

var Switch = function Switch(_ref) {
  var _ref2, _matchingCase;

  var children = _ref.children;
  // -- Inspired by react-router --
  // We use React.Children.forEach instead of React.Children.toArray().find()
  // here because toArray adds keys to all child elements and we do not want
  // to trigger an unmount/remount for two children <Case>s or <Default>s
  var matchingCase = undefined;
  var defaultCase = undefined;
  React__default.Children.forEach(children, function (child) {
    // not a valid react child, don't add it

    /* istanbul ignore next - This is only a safe fail for people writing bad code */
    if (!React__default.isValidElement(child)) {
      return;
    }

    if (!matchingCase && child.type === Case) {
      var condition = child.props.condition;
      var conditionResult = getConditionResult(condition);

      if (conditionResult) {
        matchingCase = child;
      } // else not matching condition, don't add it

    } else if (!defaultCase && child.type === Default) {
      defaultCase = child;
    } // else unknown type, don't add it

  });
  return (_ref2 = (_matchingCase = matchingCase) != null ? _matchingCase : defaultCase) != null ? _ref2 : null;
};

/** A shorthand for
 *
 * ```jsx
 * <If condition={...}>
 *     <Else>
 *         { ... }
 *     </Else>
 * </If>
 * ```
 *
 * The same rules apply to the child elements as with using the `<Else />` block.
 *
 * @param __namedParameters The props to pass down to the `<IF />` component, see {@link ComponentWithConditionProps}
 */

var Unless = function Unless(_ref) {
  var condition = _ref.condition,
      children = _ref.children;
  var conditionResult = Boolean(getConditionResult(condition));
  return !conditionResult && children ? render({
    children: children
  }) : null;
};
Unless.defaultProps = {
  children: null
};

/** A shorthand for
 *
 * ```jsx
 * <If condition={...}>
 *     <Then>
 *         { ... }
 *     </Then>
 * </If>
 * ```
 *
 * The same rules apply to the child elements as with using the `<Then /`> block.
 *
 * @param __namedParameters The props to pass down to the `<IF />` component, see {@link ComponentWithConditionProps}
 */

var When = function When(_ref) {
  var condition = _ref.condition,
      children = _ref.children;
  var conditionResult = Boolean(getConditionResult(condition));
  return conditionResult && children ? render({
    children: children
  }) : null;
};
When.defaultProps = {
  children: null
};

exports.Case = Case;
exports.Default = Default;
exports.Else = Else;
exports.Fallback = Fallback;
exports.If = If;
exports.Switch = Switch;
exports.Then = Then;
exports.Unless = Unless;
exports.When = When;
//# sourceMappingURL=react-if.cjs.development.js.map
