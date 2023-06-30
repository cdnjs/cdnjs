/*! @vimeo/player v2.20.0 | (c) 2023 Vimeo | MIT License | https://github.com/vimeo/player.js */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.Vimeo = global.Vimeo || {}, global.Vimeo.Player = factory()));
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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
	var runtime = function (exports) {

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
	    define = function (obj, key, value) {
	      return obj[key] = value;
	    };
	  }

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.

	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	    return generator;
	  }

	  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
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

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.

	  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.

	  function Generator() {}

	  function GeneratorFunction() {}

	  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.


	  var IteratorPrototype = {};

	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

	  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.

	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      define(prototype, method, function (arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }

	  exports.isGeneratorFunction = function (genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
	    // do is to check its .name property.
	    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	  };

	  exports.mark = function (genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      define(genFun, toStringTagSymbol, "GeneratorFunction");
	    }

	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  }; // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.


	  exports.awrap = function (arg) {
	    return {
	      __await: arg
	    };
	  };

	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);

	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;

	        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
	          return PromiseImpl.resolve(value.__await).then(function (value) {
	            invoke("next", value, resolve, reject);
	          }, function (err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return PromiseImpl.resolve(value).then(function (unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function (error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new PromiseImpl(function (resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise = // If enqueue has been called before, then we want to wait until
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
	      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
	      // invocations of the iterator.
	      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	    } // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).


	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };

	  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.

	  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    if (PromiseImpl === void 0) PromiseImpl = Promise;
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
	    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	    : iter.next().then(function (result) {
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
	        } // Be forgiving, per 25.3.3.3.3 of the spec:
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
	          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };
	        } else if (record.type === "throw") {
	          state = GenStateCompleted; // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.

	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  } // Call delegate.iterator[context.method](context.arg) and handle the
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
	        context.arg = new TypeError("The iterator does not provide a 'throw' method");
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

	    if (!info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

	      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
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
	    } // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.


	    context.delegate = null;
	    return ContinueSentinel;
	  } // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.


	  defineIteratorMethods(Gp);
	  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.

	  Gp[iteratorSymbol] = function () {
	    return this;
	  };

	  Gp.toString = function () {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = {
	      tryLoc: locs[0]
	    };

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
	    this.tryEntries = [{
	      tryLoc: "root"
	    }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function (object) {
	    var keys = [];

	    for (var key in object) {
	      keys.push(key);
	    }

	    keys.reverse(); // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.

	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();

	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      } // To avoid creating an additional object, we just hang the .value
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
	        var i = -1,
	            next = function next() {
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
	    } // Return an iterator with no values.


	    return {
	      next: doneResult
	    };
	  }

	  exports.values = values;

	  function doneResult() {
	    return {
	      value: undefined$1,
	      done: true
	    };
	  }

	  Context.prototype = {
	    constructor: Context,
	    reset: function (skipTempReset) {
	      this.prev = 0;
	      this.next = 0; // Resetting context._sent for legacy support of Babel's
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
	          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },
	    stop: function () {
	      this.done = true;
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;

	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },
	    dispatchException: function (exception) {
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

	        return !!caught;
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
	    abrupt: function (type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];

	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
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
	    complete: function (record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" || record.type === "continue") {
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
	    finish: function (finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];

	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	    "catch": function (tryLoc) {
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
	      } // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.


	      throw new Error("illegal catch attempt");
	    },
	    delegateYield: function (iterable, resultName, nextLoc) {
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
	  }; // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.

	  return exports;
	}( // If this script is executing as a CommonJS module, use module.exports
	// as the regeneratorRuntime namespace. Otherwise create a new empty
	// object. Either way, the resulting object will be used to initialize
	// the regeneratorRuntime variable at the top of this file.
	 module.exports );

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

	var regenerator = runtime_1;

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

	var asyncToGenerator = _asyncToGenerator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

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

	var createClass = _createClass;

	/**
	 * @module lib/functions
	 */

	/**
	 * Check to see this is a node environment.
	 * @type {Boolean}
	 */

	/* global global */
	var isNode = typeof global !== 'undefined' && {}.toString.call(global) === '[object global]';
	/**
	 * Get the name of the method for a given getter or setter.
	 *
	 * @param {string} prop The name of the property.
	 * @param {string} type Either “get” or “set”.
	 * @return {string}
	 */

	function getMethodName(prop, type) {
	  if (prop.indexOf(type.toLowerCase()) === 0) {
	    return prop;
	  }

	  return "".concat(type.toLowerCase()).concat(prop.substr(0, 1).toUpperCase()).concat(prop.substr(1));
	}
	/**
	 * Check to see if the object is a DOM Element.
	 *
	 * @param {*} element The object to check.
	 * @return {boolean}
	 */

	function isDomElement(element) {
	  return Boolean(element && element.nodeType === 1 && 'nodeName' in element && element.ownerDocument && element.ownerDocument.defaultView);
	}
	/**
	 * Check to see whether the value is a number.
	 *
	 * @see http://dl.dropboxusercontent.com/u/35146/js/tests/isNumber.html
	 * @param {*} value The value to check.
	 * @param {boolean} integer Check if the value is an integer.
	 * @return {boolean}
	 */

	function isInteger(value) {
	  // eslint-disable-next-line eqeqeq
	  return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
	}
	/**
	 * Check to see if the URL is a Vimeo url.
	 *
	 * @param {string} url The url string.
	 * @return {boolean}
	 */

	function isVimeoUrl(url) {
	  return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(url);
	}
	/**
	 * Check to see if the URL is for a Vimeo embed.
	 *
	 * @param {string} url The url string.
	 * @return {boolean}
	 */

	function isVimeoEmbed(url) {
	  var expr = /^https:\/\/player\.vimeo\.com\/video\/\d+/;
	  return expr.test(url);
	}
	/**
	 * Get the Vimeo URL from an element.
	 * The element must have either a data-vimeo-id or data-vimeo-url attribute.
	 *
	 * @param {object} oEmbedParameters The oEmbed parameters.
	 * @return {string}
	 */

	function getVimeoUrl() {
	  var oEmbedParameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var id = oEmbedParameters.id;
	  var url = oEmbedParameters.url;
	  var idOrUrl = id || url;

	  if (!idOrUrl) {
	    throw new Error('An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.');
	  }

	  if (isInteger(idOrUrl)) {
	    return "https://vimeo.com/".concat(idOrUrl);
	  }

	  if (isVimeoUrl(idOrUrl)) {
	    return idOrUrl.replace('http:', 'https:');
	  }

	  if (id) {
	    throw new TypeError("\u201C".concat(id, "\u201D is not a valid video id."));
	  }

	  throw new TypeError("\u201C".concat(idOrUrl, "\u201D is not a vimeo.com url."));
	}
	/* eslint-disable max-params */

	/**
	 * A utility method for attaching and detaching event handlers
	 *
	 * @param {EventTarget} target
	 * @param {string | string[]} eventName
	 * @param {function} callback
	 * @param {'addEventListener' | 'on'} onName
	 * @param {'removeEventListener' | 'off'} offName
	 * @return {{cancel: (function(): void)}}
	 */

	var subscribe = function subscribe(target, eventName, callback) {
	  var onName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'addEventListener';
	  var offName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'removeEventListener';
	  var eventNames = typeof eventName === 'string' ? [eventName] : eventName;
	  eventNames.forEach(function (evName) {
	    target[onName](evName, callback);
	  });
	  return {
	    cancel: function cancel() {
	      return eventNames.forEach(function (evName) {
	        return target[offName](evName, callback);
	      });
	    }
	  };
	};

	var arrayIndexOfSupport = typeof Array.prototype.indexOf !== 'undefined';
	var postMessageSupport = typeof window !== 'undefined' && typeof window.postMessage !== 'undefined';

	if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
	  throw new Error('Sorry, the Vimeo Player API is not available in this browser.');
	}

	/*!
	 * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
	 * https://github.com/polygonplanet/weakmap-polyfill
	 * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
	 * @license MIT
	 */
	(function (self) {

	  if (self.WeakMap) {
	    return;
	  }

	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  var hasDefine = Object.defineProperty && function () {
	    try {
	      // Avoid IE8's broken Object.defineProperty
	      return Object.defineProperty({}, 'x', {
	        value: 1
	      }).x === 1;
	    } catch (e) {}
	  }();

	  var defineProperty = function (object, name, value) {
	    if (hasDefine) {
	      Object.defineProperty(object, name, {
	        configurable: true,
	        writable: true,
	        value: value
	      });
	    } else {
	      object[name] = value;
	    }
	  };

	  self.WeakMap = function () {
	    // ECMA-262 23.3 WeakMap Objects
	    function WeakMap() {
	      if (this === void 0) {
	        throw new TypeError("Constructor WeakMap requires 'new'");
	      }

	      defineProperty(this, '_id', genId('_WeakMap')); // ECMA-262 23.3.1.1 WeakMap([iterable])

	      if (arguments.length > 0) {
	        // Currently, WeakMap `iterable` argument is not supported
	        throw new TypeError('WeakMap iterable is not supported');
	      }
	    } // ECMA-262 23.3.3.2 WeakMap.prototype.delete(key)


	    defineProperty(WeakMap.prototype, 'delete', function (key) {
	      checkInstance(this, 'delete');

	      if (!isObject(key)) {
	        return false;
	      }

	      var entry = key[this._id];

	      if (entry && entry[0] === key) {
	        delete key[this._id];
	        return true;
	      }

	      return false;
	    }); // ECMA-262 23.3.3.3 WeakMap.prototype.get(key)

	    defineProperty(WeakMap.prototype, 'get', function (key) {
	      checkInstance(this, 'get');

	      if (!isObject(key)) {
	        return void 0;
	      }

	      var entry = key[this._id];

	      if (entry && entry[0] === key) {
	        return entry[1];
	      }

	      return void 0;
	    }); // ECMA-262 23.3.3.4 WeakMap.prototype.has(key)

	    defineProperty(WeakMap.prototype, 'has', function (key) {
	      checkInstance(this, 'has');

	      if (!isObject(key)) {
	        return false;
	      }

	      var entry = key[this._id];

	      if (entry && entry[0] === key) {
	        return true;
	      }

	      return false;
	    }); // ECMA-262 23.3.3.5 WeakMap.prototype.set(key, value)

	    defineProperty(WeakMap.prototype, 'set', function (key, value) {
	      checkInstance(this, 'set');

	      if (!isObject(key)) {
	        throw new TypeError('Invalid value used as weak map key');
	      }

	      var entry = key[this._id];

	      if (entry && entry[0] === key) {
	        entry[1] = value;
	        return this;
	      }

	      defineProperty(key, this._id, [key, value]);
	      return this;
	    });

	    function checkInstance(x, methodName) {
	      if (!isObject(x) || !hasOwnProperty.call(x, '_id')) {
	        throw new TypeError(methodName + ' method called on incompatible receiver ' + typeof x);
	      }
	    }

	    function genId(prefix) {
	      return prefix + '_' + rand() + '.' + rand();
	    }

	    function rand() {
	      return Math.random().toString().substring(2);
	    }

	    defineProperty(WeakMap, '_polyfill', true);
	    return WeakMap;
	  }();

	  function isObject(x) {
	    return Object(x) === x;
	  }
	})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : commonjsGlobal);

	var npo_src = createCommonjsModule(function (module) {
	/*! Native Promise Only
	    v0.8.1 (c) Kyle Simpson
	    MIT License: http://getify.mit-license.org
	*/
	(function UMD(name, context, definition) {
	  // special form of UMD for polyfilling across evironments
	  context[name] = context[name] || definition();

	  if ( module.exports) {
	    module.exports = context[name];
	  }
	})("Promise", typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function DEF() {

	  var builtInProp,
	      cycle,
	      scheduling_queue,
	      ToString = Object.prototype.toString,
	      timer = typeof setImmediate != "undefined" ? function timer(fn) {
	    return setImmediate(fn);
	  } : setTimeout; // dammit, IE8.

	  try {
	    Object.defineProperty({}, "x", {});

	    builtInProp = function builtInProp(obj, name, val, config) {
	      return Object.defineProperty(obj, name, {
	        value: val,
	        writable: true,
	        configurable: config !== false
	      });
	    };
	  } catch (err) {
	    builtInProp = function builtInProp(obj, name, val) {
	      obj[name] = val;
	      return obj;
	    };
	  } // Note: using a queue instead of array for efficiency


	  scheduling_queue = function Queue() {
	    var first, last, item;

	    function Item(fn, self) {
	      this.fn = fn;
	      this.self = self;
	      this.next = void 0;
	    }

	    return {
	      add: function add(fn, self) {
	        item = new Item(fn, self);

	        if (last) {
	          last.next = item;
	        } else {
	          first = item;
	        }

	        last = item;
	        item = void 0;
	      },
	      drain: function drain() {
	        var f = first;
	        first = last = cycle = void 0;

	        while (f) {
	          f.fn.call(f.self);
	          f = f.next;
	        }
	      }
	    };
	  }();

	  function schedule(fn, self) {
	    scheduling_queue.add(fn, self);

	    if (!cycle) {
	      cycle = timer(scheduling_queue.drain);
	    }
	  } // promise duck typing


	  function isThenable(o) {
	    var _then,
	        o_type = typeof o;

	    if (o != null && (o_type == "object" || o_type == "function")) {
	      _then = o.then;
	    }

	    return typeof _then == "function" ? _then : false;
	  }

	  function notify() {
	    for (var i = 0; i < this.chain.length; i++) {
	      notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
	    }

	    this.chain.length = 0;
	  } // NOTE: This is a separate function to isolate
	  // the `try..catch` so that other code can be
	  // optimized better


	  function notifyIsolated(self, cb, chain) {
	    var ret, _then;

	    try {
	      if (cb === false) {
	        chain.reject(self.msg);
	      } else {
	        if (cb === true) {
	          ret = self.msg;
	        } else {
	          ret = cb.call(void 0, self.msg);
	        }

	        if (ret === chain.promise) {
	          chain.reject(TypeError("Promise-chain cycle"));
	        } else if (_then = isThenable(ret)) {
	          _then.call(ret, chain.resolve, chain.reject);
	        } else {
	          chain.resolve(ret);
	        }
	      }
	    } catch (err) {
	      chain.reject(err);
	    }
	  }

	  function resolve(msg) {
	    var _then,
	        self = this; // already triggered?


	    if (self.triggered) {
	      return;
	    }

	    self.triggered = true; // unwrap

	    if (self.def) {
	      self = self.def;
	    }

	    try {
	      if (_then = isThenable(msg)) {
	        schedule(function () {
	          var def_wrapper = new MakeDefWrapper(self);

	          try {
	            _then.call(msg, function $resolve$() {
	              resolve.apply(def_wrapper, arguments);
	            }, function $reject$() {
	              reject.apply(def_wrapper, arguments);
	            });
	          } catch (err) {
	            reject.call(def_wrapper, err);
	          }
	        });
	      } else {
	        self.msg = msg;
	        self.state = 1;

	        if (self.chain.length > 0) {
	          schedule(notify, self);
	        }
	      }
	    } catch (err) {
	      reject.call(new MakeDefWrapper(self), err);
	    }
	  }

	  function reject(msg) {
	    var self = this; // already triggered?

	    if (self.triggered) {
	      return;
	    }

	    self.triggered = true; // unwrap

	    if (self.def) {
	      self = self.def;
	    }

	    self.msg = msg;
	    self.state = 2;

	    if (self.chain.length > 0) {
	      schedule(notify, self);
	    }
	  }

	  function iteratePromises(Constructor, arr, resolver, rejecter) {
	    for (var idx = 0; idx < arr.length; idx++) {
	      (function IIFE(idx) {
	        Constructor.resolve(arr[idx]).then(function $resolver$(msg) {
	          resolver(idx, msg);
	        }, rejecter);
	      })(idx);
	    }
	  }

	  function MakeDefWrapper(self) {
	    this.def = self;
	    this.triggered = false;
	  }

	  function MakeDef(self) {
	    this.promise = self;
	    this.state = 0;
	    this.triggered = false;
	    this.chain = [];
	    this.msg = void 0;
	  }

	  function Promise(executor) {
	    if (typeof executor != "function") {
	      throw TypeError("Not a function");
	    }

	    if (this.__NPO__ !== 0) {
	      throw TypeError("Not a promise");
	    } // instance shadowing the inherited "brand"
	    // to signal an already "initialized" promise


	    this.__NPO__ = 1;
	    var def = new MakeDef(this);

	    this["then"] = function then(success, failure) {
	      var o = {
	        success: typeof success == "function" ? success : true,
	        failure: typeof failure == "function" ? failure : false
	      }; // Note: `then(..)` itself can be borrowed to be used against
	      // a different promise constructor for making the chained promise,
	      // by substituting a different `this` binding.

	      o.promise = new this.constructor(function extractChain(resolve, reject) {
	        if (typeof resolve != "function" || typeof reject != "function") {
	          throw TypeError("Not a function");
	        }

	        o.resolve = resolve;
	        o.reject = reject;
	      });
	      def.chain.push(o);

	      if (def.state !== 0) {
	        schedule(notify, def);
	      }

	      return o.promise;
	    };

	    this["catch"] = function $catch$(failure) {
	      return this.then(void 0, failure);
	    };

	    try {
	      executor.call(void 0, function publicResolve(msg) {
	        resolve.call(def, msg);
	      }, function publicReject(msg) {
	        reject.call(def, msg);
	      });
	    } catch (err) {
	      reject.call(def, err);
	    }
	  }

	  var PromisePrototype = builtInProp({}, "constructor", Promise,
	  /*configurable=*/
	  false); // Note: Android 4 cannot use `Object.defineProperty(..)` here

	  Promise.prototype = PromisePrototype; // built-in "brand" to signal an "uninitialized" promise

	  builtInProp(PromisePrototype, "__NPO__", 0,
	  /*configurable=*/
	  false);
	  builtInProp(Promise, "resolve", function Promise$resolve(msg) {
	    var Constructor = this; // spec mandated checks
	    // note: best "isPromise" check that's practical for now

	    if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
	      return msg;
	    }

	    return new Constructor(function executor(resolve, reject) {
	      if (typeof resolve != "function" || typeof reject != "function") {
	        throw TypeError("Not a function");
	      }

	      resolve(msg);
	    });
	  });
	  builtInProp(Promise, "reject", function Promise$reject(msg) {
	    return new this(function executor(resolve, reject) {
	      if (typeof resolve != "function" || typeof reject != "function") {
	        throw TypeError("Not a function");
	      }

	      reject(msg);
	    });
	  });
	  builtInProp(Promise, "all", function Promise$all(arr) {
	    var Constructor = this; // spec mandated checks

	    if (ToString.call(arr) != "[object Array]") {
	      return Constructor.reject(TypeError("Not an array"));
	    }

	    if (arr.length === 0) {
	      return Constructor.resolve([]);
	    }

	    return new Constructor(function executor(resolve, reject) {
	      if (typeof resolve != "function" || typeof reject != "function") {
	        throw TypeError("Not a function");
	      }

	      var len = arr.length,
	          msgs = Array(len),
	          count = 0;
	      iteratePromises(Constructor, arr, function resolver(idx, msg) {
	        msgs[idx] = msg;

	        if (++count === len) {
	          resolve(msgs);
	        }
	      }, reject);
	    });
	  });
	  builtInProp(Promise, "race", function Promise$race(arr) {
	    var Constructor = this; // spec mandated checks

	    if (ToString.call(arr) != "[object Array]") {
	      return Constructor.reject(TypeError("Not an array"));
	    }

	    return new Constructor(function executor(resolve, reject) {
	      if (typeof resolve != "function" || typeof reject != "function") {
	        throw TypeError("Not a function");
	      }

	      iteratePromises(Constructor, arr, function resolver(idx, msg) {
	        resolve(msg);
	      }, reject);
	    });
	  });
	  return Promise;
	});
	});

	/**
	 * @module lib/callbacks
	 */
	var callbackMap = new WeakMap();
	/**
	 * Store a callback for a method or event for a player.
	 *
	 * @param {Player} player The player object.
	 * @param {string} name The method or event name.
	 * @param {(function(this:Player, *): void|{resolve: function, reject: function})} callback
	 *        The callback to call or an object with resolve and reject functions for a promise.
	 * @return {void}
	 */

	function storeCallback(player, name, callback) {
	  var playerCallbacks = callbackMap.get(player.element) || {};

	  if (!(name in playerCallbacks)) {
	    playerCallbacks[name] = [];
	  }

	  playerCallbacks[name].push(callback);
	  callbackMap.set(player.element, playerCallbacks);
	}
	/**
	 * Get the callbacks for a player and event or method.
	 *
	 * @param {Player} player The player object.
	 * @param {string} name The method or event name
	 * @return {function[]}
	 */

	function getCallbacks(player, name) {
	  var playerCallbacks = callbackMap.get(player.element) || {};
	  return playerCallbacks[name] || [];
	}
	/**
	 * Remove a stored callback for a method or event for a player.
	 *
	 * @param {Player} player The player object.
	 * @param {string} name The method or event name
	 * @param {function} [callback] The specific callback to remove.
	 * @return {boolean} Was this the last callback?
	 */

	function removeCallback(player, name, callback) {
	  var playerCallbacks = callbackMap.get(player.element) || {};

	  if (!playerCallbacks[name]) {
	    return true;
	  } // If no callback is passed, remove all callbacks for the event


	  if (!callback) {
	    playerCallbacks[name] = [];
	    callbackMap.set(player.element, playerCallbacks);
	    return true;
	  }

	  var index = playerCallbacks[name].indexOf(callback);

	  if (index !== -1) {
	    playerCallbacks[name].splice(index, 1);
	  }

	  callbackMap.set(player.element, playerCallbacks);
	  return playerCallbacks[name] && playerCallbacks[name].length === 0;
	}
	/**
	 * Return the first stored callback for a player and event or method.
	 *
	 * @param {Player} player The player object.
	 * @param {string} name The method or event name.
	 * @return {function} The callback, or false if there were none
	 */

	function shiftCallbacks(player, name) {
	  var playerCallbacks = getCallbacks(player, name);

	  if (playerCallbacks.length < 1) {
	    return false;
	  }

	  var callback = playerCallbacks.shift();
	  removeCallback(player, name, callback);
	  return callback;
	}
	/**
	 * Move callbacks associated with an element to another element.
	 *
	 * @param {HTMLElement} oldElement The old element.
	 * @param {HTMLElement} newElement The new element.
	 * @return {void}
	 */

	function swapCallbacks(oldElement, newElement) {
	  var playerCallbacks = callbackMap.get(oldElement);
	  callbackMap.set(newElement, playerCallbacks);
	  callbackMap.delete(oldElement);
	}

	/**
	 * @module lib/postmessage
	 */
	/**
	 * Parse a message received from postMessage.
	 *
	 * @param {*} data The data received from postMessage.
	 * @return {object}
	 */

	function parseMessageData(data) {
	  if (typeof data === 'string') {
	    try {
	      data = JSON.parse(data);
	    } catch (error) {
	      // If the message cannot be parsed, throw the error as a warning
	      console.warn(error);
	      return {};
	    }
	  }

	  return data;
	}
	/**
	 * Post a message to the specified target.
	 *
	 * @param {Player} player The player object to use.
	 * @param {string} method The API method to call.
	 * @param {object} params The parameters to send to the player.
	 * @return {void}
	 */

	function postMessage(player, method, params) {
	  if (!player.element.contentWindow || !player.element.contentWindow.postMessage) {
	    return;
	  }

	  var message = {
	    method: method
	  };

	  if (params !== undefined) {
	    message.value = params;
	  } // IE 8 and 9 do not support passing messages, so stringify them


	  var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, '$1'));

	  if (ieVersion >= 8 && ieVersion < 10) {
	    message = JSON.stringify(message);
	  }

	  player.element.contentWindow.postMessage(message, player.origin);
	}
	/**
	 * Parse the data received from a message event.
	 *
	 * @param {Player} player The player that received the message.
	 * @param {(Object|string)} data The message data. Strings will be parsed into JSON.
	 * @return {void}
	 */

	function processData(player, data) {
	  data = parseMessageData(data);
	  var callbacks = [];
	  var param;

	  if (data.event) {
	    if (data.event === 'error') {
	      var promises = getCallbacks(player, data.data.method);
	      promises.forEach(function (promise) {
	        var error = new Error(data.data.message);
	        error.name = data.data.name;
	        promise.reject(error);
	        removeCallback(player, data.data.method, promise);
	      });
	    }

	    callbacks = getCallbacks(player, "event:".concat(data.event));
	    param = data.data;
	  } else if (data.method) {
	    var callback = shiftCallbacks(player, data.method);

	    if (callback) {
	      callbacks.push(callback);
	      param = data.value;
	    }
	  }

	  callbacks.forEach(function (callback) {
	    try {
	      if (typeof callback === 'function') {
	        callback.call(player, param);
	        return;
	      }

	      callback.resolve(param);
	    } catch (e) {// empty
	    }
	  });
	}

	/**
	 * @module lib/embed
	 */
	var oEmbedParameters = ['autopause', 'autoplay', 'background', 'byline', 'color', 'colors', 'controls', 'dnt', 'height', 'id', 'interactive_params', 'keyboard', 'loop', 'maxheight', 'maxwidth', 'muted', 'playsinline', 'portrait', 'responsive', 'speed', 'texttrack', 'title', 'transparent', 'url', 'width'];
	/**
	 * Get the 'data-vimeo'-prefixed attributes from an element as an object.
	 *
	 * @param {HTMLElement} element The element.
	 * @param {Object} [defaults={}] The default values to use.
	 * @return {Object<string, string>}
	 */

	function getOEmbedParameters(element) {
	  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  return oEmbedParameters.reduce(function (params, param) {
	    var value = element.getAttribute("data-vimeo-".concat(param));

	    if (value || value === '') {
	      params[param] = value === '' ? 1 : value;
	    }

	    return params;
	  }, defaults);
	}
	/**
	 * Create an embed from oEmbed data inside an element.
	 *
	 * @param {object} data The oEmbed data.
	 * @param {HTMLElement} element The element to put the iframe in.
	 * @return {HTMLIFrameElement} The iframe embed.
	 */

	function createEmbed(_ref, element) {
	  var html = _ref.html;

	  if (!element) {
	    throw new TypeError('An element must be provided');
	  }

	  if (element.getAttribute('data-vimeo-initialized') !== null) {
	    return element.querySelector('iframe');
	  }

	  var div = document.createElement('div');
	  div.innerHTML = html;
	  element.appendChild(div.firstChild);
	  element.setAttribute('data-vimeo-initialized', 'true');
	  return element.querySelector('iframe');
	}
	/**
	 * Make an oEmbed call for the specified URL.
	 *
	 * @param {string} videoUrl The vimeo.com url for the video.
	 * @param {Object} [params] Parameters to pass to oEmbed.
	 * @param {HTMLElement} element The element.
	 * @return {Promise}
	 */

	function getOEmbedData(videoUrl) {
	  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var element = arguments.length > 2 ? arguments[2] : undefined;
	  return new Promise(function (resolve, reject) {
	    if (!isVimeoUrl(videoUrl)) {
	      throw new TypeError("\u201C".concat(videoUrl, "\u201D is not a vimeo.com url."));
	    }

	    var url = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(videoUrl));

	    for (var param in params) {
	      if (params.hasOwnProperty(param)) {
	        url += "&".concat(param, "=").concat(encodeURIComponent(params[param]));
	      }
	    }

	    var xhr = 'XDomainRequest' in window ? new XDomainRequest() : new XMLHttpRequest();
	    xhr.open('GET', url, true);

	    xhr.onload = function () {
	      if (xhr.status === 404) {
	        reject(new Error("\u201C".concat(videoUrl, "\u201D was not found.")));
	        return;
	      }

	      if (xhr.status === 403) {
	        reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
	        return;
	      }

	      try {
	        var json = JSON.parse(xhr.responseText); // Check api response for 403 on oembed

	        if (json.domain_status_code === 403) {
	          // We still want to create the embed to give users visual feedback
	          createEmbed(json, element);
	          reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
	          return;
	        }

	        resolve(json);
	      } catch (error) {
	        reject(error);
	      }
	    };

	    xhr.onerror = function () {
	      var status = xhr.status ? " (".concat(xhr.status, ")") : '';
	      reject(new Error("There was an error fetching the embed code from Vimeo".concat(status, ".")));
	    };

	    xhr.send();
	  });
	}
	/**
	 * Initialize all embeds within a specific element
	 *
	 * @param {HTMLElement} [parent=document] The parent element.
	 * @return {void}
	 */

	function initializeEmbeds() {
	  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	  var elements = [].slice.call(parent.querySelectorAll('[data-vimeo-id], [data-vimeo-url]'));

	  var handleError = function handleError(error) {
	    if ('console' in window && console.error) {
	      console.error("There was an error creating an embed: ".concat(error));
	    }
	  };

	  elements.forEach(function (element) {
	    try {
	      // Skip any that have data-vimeo-defer
	      if (element.getAttribute('data-vimeo-defer') !== null) {
	        return;
	      }

	      var params = getOEmbedParameters(element);
	      var url = getVimeoUrl(params);
	      getOEmbedData(url, params, element).then(function (data) {
	        return createEmbed(data, element);
	      }).catch(handleError);
	    } catch (error) {
	      handleError(error);
	    }
	  });
	}
	/**
	 * Resize embeds when messaged by the player.
	 *
	 * @param {HTMLElement} [parent=document] The parent element.
	 * @return {void}
	 */

	function resizeEmbeds() {
	  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

	  // Prevent execution if users include the player.js script multiple times.
	  if (window.VimeoPlayerResizeEmbeds_) {
	    return;
	  }

	  window.VimeoPlayerResizeEmbeds_ = true;

	  var onMessage = function onMessage(event) {
	    if (!isVimeoUrl(event.origin)) {
	      return;
	    } // 'spacechange' is fired only on embeds with cards


	    if (!event.data || event.data.event !== 'spacechange') {
	      return;
	    }

	    var iframes = parent.querySelectorAll('iframe');

	    for (var i = 0; i < iframes.length; i++) {
	      if (iframes[i].contentWindow !== event.source) {
	        continue;
	      } // Change padding-bottom of the enclosing div to accommodate
	      // card carousel without distorting aspect ratio


	      var space = iframes[i].parentElement;
	      space.style.paddingBottom = "".concat(event.data.data[0].bottom, "px");
	      break;
	    }
	  };

	  window.addEventListener('message', onMessage);
	}
	/**
	 * Add chapters to existing metadata for Google SEO
	 *
	 * @param {HTMLElement} [parent=document] The parent element.
	 * @return {void}
	 */

	function initAppendVideoMetadata() {
	  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

	  //  Prevent execution if users include the player.js script multiple times.
	  if (window.VimeoSeoMetadataAppended) {
	    return;
	  }

	  window.VimeoSeoMetadataAppended = true;

	  var onMessage = function onMessage(event) {
	    if (!isVimeoUrl(event.origin)) {
	      return;
	    }

	    var data = parseMessageData(event.data);

	    if (!data || data.event !== 'ready') {
	      return;
	    }

	    var iframes = parent.querySelectorAll('iframe');

	    for (var i = 0; i < iframes.length; i++) {
	      var iframe = iframes[i]; // Initiate appendVideoMetadata if iframe is a Vimeo embed

	      var isValidMessageSource = iframe.contentWindow === event.source;

	      if (isVimeoEmbed(iframe.src) && isValidMessageSource) {
	        var player = new Player(iframe);
	        player.callMethod('appendVideoMetadata', window.location.href);
	      }
	    }
	  };

	  window.addEventListener('message', onMessage);
	}
	/**
	 * Seek to time indicated by vimeo_t query parameter if present in URL
	 *
	 * @param {HTMLElement} [parent=document] The parent element.
	 * @return {void}
	 */

	function checkUrlTimeParam() {
	  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

	  //  Prevent execution if users include the player.js script multiple times.
	  if (window.VimeoCheckedUrlTimeParam) {
	    return;
	  }

	  window.VimeoCheckedUrlTimeParam = true;

	  var handleError = function handleError(error) {
	    if ('console' in window && console.error) {
	      console.error("There was an error getting video Id: ".concat(error));
	    }
	  };

	  var onMessage = function onMessage(event) {
	    if (!isVimeoUrl(event.origin)) {
	      return;
	    }

	    var data = parseMessageData(event.data);

	    if (!data || data.event !== 'ready') {
	      return;
	    }

	    var iframes = parent.querySelectorAll('iframe');

	    for (var i = 0; i < iframes.length; i++) {
	      var iframe = iframes[i];
	      var isValidMessageSource = iframe.contentWindow === event.source;

	      if (isVimeoEmbed(iframe.src) && isValidMessageSource) {
	        (function () {
	          var player = new Player(iframe);
	          player.getVideoId().then(function (videoId) {
	            var matches = new RegExp("[?&]vimeo_t_".concat(videoId, "=([^&#]*)")).exec(window.location.href);

	            if (matches && matches[1]) {
	              var sec = decodeURI(matches[1]);
	              player.setCurrentTime(sec);
	            }

	            return;
	          }).catch(handleError);
	        })();
	      }
	    }
	  };

	  window.addEventListener('message', onMessage);
	}

	/* MIT License

	Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	Terms */
	function initializeScreenfull() {
	  var fn = function () {
	    var val;
	    var fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'], // New WebKit
	    ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'], // Old WebKit
	    ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
	    var i = 0;
	    var l = fnMap.length;
	    var ret = {};

	    for (; i < l; i++) {
	      val = fnMap[i];

	      if (val && val[1] in document) {
	        for (i = 0; i < val.length; i++) {
	          ret[fnMap[0][i]] = val[i];
	        }

	        return ret;
	      }
	    }

	    return false;
	  }();

	  var eventNameMap = {
	    fullscreenchange: fn.fullscreenchange,
	    fullscreenerror: fn.fullscreenerror
	  };
	  var screenfull = {
	    request: function request(element) {
	      return new Promise(function (resolve, reject) {
	        var onFullScreenEntered = function onFullScreenEntered() {
	          screenfull.off('fullscreenchange', onFullScreenEntered);
	          resolve();
	        };

	        screenfull.on('fullscreenchange', onFullScreenEntered);
	        element = element || document.documentElement;
	        var returnPromise = element[fn.requestFullscreen]();

	        if (returnPromise instanceof Promise) {
	          returnPromise.then(onFullScreenEntered).catch(reject);
	        }
	      });
	    },
	    exit: function exit() {
	      return new Promise(function (resolve, reject) {
	        if (!screenfull.isFullscreen) {
	          resolve();
	          return;
	        }

	        var onFullScreenExit = function onFullScreenExit() {
	          screenfull.off('fullscreenchange', onFullScreenExit);
	          resolve();
	        };

	        screenfull.on('fullscreenchange', onFullScreenExit);
	        var returnPromise = document[fn.exitFullscreen]();

	        if (returnPromise instanceof Promise) {
	          returnPromise.then(onFullScreenExit).catch(reject);
	        }
	      });
	    },
	    on: function on(event, callback) {
	      var eventName = eventNameMap[event];

	      if (eventName) {
	        document.addEventListener(eventName, callback);
	      }
	    },
	    off: function off(event, callback) {
	      var eventName = eventNameMap[event];

	      if (eventName) {
	        document.removeEventListener(eventName, callback);
	      }
	    }
	  };
	  Object.defineProperties(screenfull, {
	    isFullscreen: {
	      get: function get() {
	        return Boolean(document[fn.fullscreenElement]);
	      }
	    },
	    element: {
	      enumerable: true,
	      get: function get() {
	        return document[fn.fullscreenElement];
	      }
	    },
	    isEnabled: {
	      enumerable: true,
	      get: function get() {
	        // Coerce to boolean in case of old WebKit
	        return Boolean(document[fn.fullscreenEnabled]);
	      }
	    }
	  });
	  return screenfull;
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	var setPrototypeOf = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

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
	  if (superClass) setPrototypeOf(subClass, superClass);
	}

	var inherits = _inherits;

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var getPrototypeOf = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	var isNativeFunction = _isNativeFunction;

	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	var isNativeReflectConstruct = _isNativeReflectConstruct;

	var construct = createCommonjsModule(function (module) {
	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct()) {
	    module.exports = _construct = Reflect.construct;
	  } else {
	    module.exports = _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) setPrototypeOf(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	module.exports = _construct;
	});

	var wrapNativeSuper = createCommonjsModule(function (module) {
	function _wrapNativeSuper(Class) {
	  var _cache = typeof Map === "function" ? new Map() : undefined;

	  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !isNativeFunction(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return construct(Class, arguments, getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return setPrototypeOf(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	module.exports = _wrapNativeSuper;
	});

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

	var defineProperty = _defineProperty;

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
	/** @typedef {import('./timing-src-connector.types').PlayerControls} PlayerControls */

	/** @typedef {import('./timing-object.types').TimingObject} TimingObject */

	/** @typedef {import('./timing-src-connector.types').TimingSrcConnectorOptions} TimingSrcConnectorOptions */

	/** @typedef {(msg: string) => any} Logger */

	/** @typedef {import('timing-object.types').TConnectionState} TConnectionState */

	/**
	 * @type {TimingSrcConnectorOptions}
	 *
	 * For details on these properties and their effects, see the typescript definition referenced above.
	 */

	var defaultOptions = {
	  role: 'viewer',
	  autoPlayMuted: true,
	  allowedDrift: 0.3,
	  maxAllowedDrift: 1,
	  minCheckInterval: 0.1,
	  maxRateAdjustment: 0.2,
	  maxTimeToCatchUp: 1
	};
	/**
	 * There's a proposed W3C spec for the Timing Object which would introduce a new set of APIs that would simplify time-synchronization tasks for browser applications.
	 *
	 * Proposed spec: https://webtiming.github.io/timingobject/
	 * V3 Spec: https://timingsrc.readthedocs.io/en/latest/
	 * Demuxed talk: https://www.youtube.com/watch?v=cZSjDaGDmX8
	 *
	 * This class makes it easy to connect Vimeo.Player to a provided TimingObject via Vimeo.Player.setTimingSrc(myTimingObject, options) and the synchronization will be handled automatically.
	 *
	 * There are 5 general responsibilities in TimingSrcConnector:
	 *
	 * 1. `updatePlayer()` which sets the player's currentTime, playbackRate and pause/play state based on current state of the TimingObject.
	 * 2. `updateTimingObject()` which sets the TimingObject's position and velocity from the player's state.
	 * 3. `playerUpdater` which listens for change events on the TimingObject and will respond by calling updatePlayer.
	 * 4. `timingObjectUpdater` which listens to the player events of seeked, play and pause and will respond by calling `updateTimingObject()`.
	 * 5. `maintainPlaybackPosition` this is code that constantly monitors the player to make sure it's always in sync with the TimingObject. This is needed because videos will generally not play with precise time accuracy and there will be some drift which becomes more noticeable over longer periods (as noted in the timing-object spec). More details on this method below.
	 */

	var TimingSrcConnector = /*#__PURE__*/function (_EventTarget) {
	  inherits(TimingSrcConnector, _EventTarget);

	  var _super = _createSuper(TimingSrcConnector);

	  /**
	   * @param {PlayerControls} player
	   * @param {TimingObject} timingObject
	   * @param {TimingSrcConnectorOptions} options
	   * @param {Logger} logger
	   */
	  function TimingSrcConnector(_player, timingObject) {
	    var _this;

	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var logger = arguments.length > 3 ? arguments[3] : undefined;

	    classCallCheck(this, TimingSrcConnector);

	    _this = _super.call(this);

	    defineProperty(assertThisInitialized(_this), "logger", void 0);

	    defineProperty(assertThisInitialized(_this), "speedAdjustment", 0);

	    defineProperty(assertThisInitialized(_this), "adjustSpeed", /*#__PURE__*/function () {
	      var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(player, newAdjustment) {
	        var newPlaybackRate;
	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (!(_this.speedAdjustment === newAdjustment)) {
	                  _context.next = 2;
	                  break;
	                }

	                return _context.abrupt("return");

	              case 2:
	                _context.next = 4;
	                return player.getPlaybackRate();

	              case 4:
	                _context.t0 = _context.sent;
	                _context.t1 = _this.speedAdjustment;
	                _context.t2 = _context.t0 - _context.t1;
	                _context.t3 = newAdjustment;
	                newPlaybackRate = _context.t2 + _context.t3;

	                _this.log("New playbackRate:  ".concat(newPlaybackRate));

	                _context.next = 12;
	                return player.setPlaybackRate(newPlaybackRate);

	              case 12:
	                _this.speedAdjustment = newAdjustment;

	              case 13:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee);
	      }));

	      return function (_x, _x2) {
	        return _ref.apply(this, arguments);
	      };
	    }());

	    _this.logger = logger;

	    _this.init(timingObject, _player, _objectSpread(_objectSpread({}, defaultOptions), options));

	    return _this;
	  }

	  createClass(TimingSrcConnector, [{
	    key: "disconnect",
	    value: function disconnect() {
	      this.dispatchEvent(new Event('disconnect'));
	    }
	    /**
	     * @param {TimingObject} timingObject
	     * @param {PlayerControls} player
	     * @param {TimingSrcConnectorOptions} options
	     * @return {Promise<void>}
	     */

	  }, {
	    key: "init",
	    value: function () {
	      var _init = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(timingObject, player, options) {
	        var _this2 = this;

	        var playerUpdater, positionSync, timingObjectUpdater;
	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.next = 2;
	                return this.waitForTOReadyState(timingObject, 'open');

	              case 2:
	                if (!(options.role === 'viewer')) {
	                  _context2.next = 10;
	                  break;
	                }

	                _context2.next = 5;
	                return this.updatePlayer(timingObject, player, options);

	              case 5:
	                playerUpdater = subscribe(timingObject, 'change', function () {
	                  return _this2.updatePlayer(timingObject, player, options);
	                });
	                positionSync = this.maintainPlaybackPosition(timingObject, player, options);
	                this.addEventListener('disconnect', function () {
	                  positionSync.cancel();
	                  playerUpdater.cancel();
	                });
	                _context2.next = 14;
	                break;

	              case 10:
	                _context2.next = 12;
	                return this.updateTimingObject(timingObject, player);

	              case 12:
	                timingObjectUpdater = subscribe(player, ['seeked', 'play', 'pause', 'ratechange'], function () {
	                  return _this2.updateTimingObject(timingObject, player);
	                }, 'on', 'off');
	                this.addEventListener('disconnect', function () {
	                  return timingObjectUpdater.cancel();
	                });

	              case 14:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function init(_x3, _x4, _x5) {
	        return _init.apply(this, arguments);
	      }

	      return init;
	    }()
	    /**
	     * Sets the TimingObject's state to reflect that of the player
	     *
	     * @param {TimingObject} timingObject
	     * @param {PlayerControls} player
	     * @return {Promise<void>}
	     */

	  }, {
	    key: "updateTimingObject",
	    value: function () {
	      var _updateTimingObject = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(timingObject, player) {
	        return regenerator.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                _context3.t0 = timingObject;
	                _context3.next = 3;
	                return player.getCurrentTime();

	              case 3:
	                _context3.t1 = _context3.sent;
	                _context3.next = 6;
	                return player.getPaused();

	              case 6:
	                if (!_context3.sent) {
	                  _context3.next = 10;
	                  break;
	                }

	                _context3.t2 = 0;
	                _context3.next = 13;
	                break;

	              case 10:
	                _context3.next = 12;
	                return player.getPlaybackRate();

	              case 12:
	                _context3.t2 = _context3.sent;

	              case 13:
	                _context3.t3 = _context3.t2;
	                _context3.t4 = {
	                  position: _context3.t1,
	                  velocity: _context3.t3
	                };

	                _context3.t0.update.call(_context3.t0, _context3.t4);

	              case 16:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3);
	      }));

	      function updateTimingObject(_x6, _x7) {
	        return _updateTimingObject.apply(this, arguments);
	      }

	      return updateTimingObject;
	    }()
	    /**
	     * Sets the player's timing state to reflect that of the TimingObject
	     *
	     * @param {TimingObject} timingObject
	     * @param {PlayerControls} player
	     * @param {TimingSrcConnectorOptions} options
	     * @return {Promise<void>}
	     */

	  }, {
	    key: "updatePlayer",
	    value: function () {
	      var _updatePlayer = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(timingObject, player, options) {
	        var _timingObject$query, position, velocity;

	        return regenerator.wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	                _timingObject$query = timingObject.query(), position = _timingObject$query.position, velocity = _timingObject$query.velocity;

	                if (typeof position === 'number') {
	                  player.setCurrentTime(position);
	                }

	                if (!(typeof velocity === 'number')) {
	                  _context5.next = 25;
	                  break;
	                }

	                if (!(velocity === 0)) {
	                  _context5.next = 11;
	                  break;
	                }

	                _context5.next = 6;
	                return player.getPaused();

	              case 6:
	                _context5.t0 = _context5.sent;

	                if (!(_context5.t0 === false)) {
	                  _context5.next = 9;
	                  break;
	                }

	                player.pause();

	              case 9:
	                _context5.next = 25;
	                break;

	              case 11:
	                if (!(velocity > 0)) {
	                  _context5.next = 25;
	                  break;
	                }

	                _context5.next = 14;
	                return player.getPaused();

	              case 14:
	                _context5.t1 = _context5.sent;

	                if (!(_context5.t1 === true)) {
	                  _context5.next = 19;
	                  break;
	                }

	                _context5.next = 18;
	                return player.play().catch( /*#__PURE__*/function () {
	                  var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(err) {
	                    return regenerator.wrap(function _callee4$(_context4) {
	                      while (1) {
	                        switch (_context4.prev = _context4.next) {
	                          case 0:
	                            if (!(err.name === 'NotAllowedError' && options.autoPlayMuted)) {
	                              _context4.next = 5;
	                              break;
	                            }

	                            _context4.next = 3;
	                            return player.setMuted(true);

	                          case 3:
	                            _context4.next = 5;
	                            return player.play().catch(function (err2) {
	                              return console.error('Couldn\'t play the video from TimingSrcConnector. Error:', err2);
	                            });

	                          case 5:
	                          case "end":
	                            return _context4.stop();
	                        }
	                      }
	                    }, _callee4);
	                  }));

	                  return function (_x11) {
	                    return _ref2.apply(this, arguments);
	                  };
	                }());

	              case 18:
	                this.updatePlayer(timingObject, player, options);

	              case 19:
	                _context5.next = 21;
	                return player.getPlaybackRate();

	              case 21:
	                _context5.t2 = _context5.sent;
	                _context5.t3 = velocity;

	                if (!(_context5.t2 !== _context5.t3)) {
	                  _context5.next = 25;
	                  break;
	                }

	                player.setPlaybackRate(velocity);

	              case 25:
	              case "end":
	                return _context5.stop();
	            }
	          }
	        }, _callee5, this);
	      }));

	      function updatePlayer(_x8, _x9, _x10) {
	        return _updatePlayer.apply(this, arguments);
	      }

	      return updatePlayer;
	    }()
	    /**
	     * Since video players do not play with 100% time precision, we need to closely monitor
	     * our player to be sure it remains in sync with the TimingObject.
	     *
	     * If out of sync, we use the current conditions and the options provided to determine
	     * whether to re-sync via setting currentTime or adjusting the playbackRate
	     *
	     * @param {TimingObject} timingObject
	     * @param {PlayerControls} player
	     * @param {TimingSrcConnectorOptions} options
	     * @return {{cancel: (function(): void)}}
	     */

	  }, {
	    key: "maintainPlaybackPosition",
	    value: function maintainPlaybackPosition(timingObject, player, options) {
	      var _this3 = this;

	      var allowedDrift = options.allowedDrift,
	          maxAllowedDrift = options.maxAllowedDrift,
	          minCheckInterval = options.minCheckInterval,
	          maxRateAdjustment = options.maxRateAdjustment,
	          maxTimeToCatchUp = options.maxTimeToCatchUp;
	      var syncInterval = Math.min(maxTimeToCatchUp, Math.max(minCheckInterval, maxAllowedDrift)) * 1000;

	      var check = /*#__PURE__*/function () {
	        var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
	          var diff, diffAbs, min, max, adjustment;
	          return regenerator.wrap(function _callee6$(_context6) {
	            while (1) {
	              switch (_context6.prev = _context6.next) {
	                case 0:
	                  _context6.t0 = timingObject.query().velocity === 0;

	                  if (_context6.t0) {
	                    _context6.next = 6;
	                    break;
	                  }

	                  _context6.next = 4;
	                  return player.getPaused();

	                case 4:
	                  _context6.t1 = _context6.sent;
	                  _context6.t0 = _context6.t1 === true;

	                case 6:
	                  if (!_context6.t0) {
	                    _context6.next = 8;
	                    break;
	                  }

	                  return _context6.abrupt("return");

	                case 8:
	                  _context6.t2 = timingObject.query().position;
	                  _context6.next = 11;
	                  return player.getCurrentTime();

	                case 11:
	                  _context6.t3 = _context6.sent;
	                  diff = _context6.t2 - _context6.t3;
	                  diffAbs = Math.abs(diff);

	                  _this3.log("Drift: ".concat(diff));

	                  if (!(diffAbs > maxAllowedDrift)) {
	                    _context6.next = 22;
	                    break;
	                  }

	                  _context6.next = 18;
	                  return _this3.adjustSpeed(player, 0);

	                case 18:
	                  player.setCurrentTime(timingObject.query().position);

	                  _this3.log('Resync by currentTime');

	                  _context6.next = 29;
	                  break;

	                case 22:
	                  if (!(diffAbs > allowedDrift)) {
	                    _context6.next = 29;
	                    break;
	                  }

	                  min = diffAbs / maxTimeToCatchUp;
	                  max = maxRateAdjustment;
	                  adjustment = min < max ? (max - min) / 2 : max;
	                  _context6.next = 28;
	                  return _this3.adjustSpeed(player, adjustment * Math.sign(diff));

	                case 28:
	                  _this3.log('Resync by playbackRate');

	                case 29:
	                case "end":
	                  return _context6.stop();
	              }
	            }
	          }, _callee6);
	        }));

	        return function check() {
	          return _ref3.apply(this, arguments);
	        };
	      }();

	      var interval = setInterval(function () {
	        return check();
	      }, syncInterval);
	      return {
	        cancel: function cancel() {
	          return clearInterval(interval);
	        }
	      };
	    }
	    /**
	     * @param {string} msg
	     */

	  }, {
	    key: "log",
	    value: function log(msg) {
	      var _this$logger;

	      (_this$logger = this.logger) === null || _this$logger === void 0 ? void 0 : _this$logger.call(this, "TimingSrcConnector: ".concat(msg));
	    }
	  }, {
	    key: "waitForTOReadyState",

	    /**
	     * @param {TimingObject} timingObject
	     * @param {TConnectionState} state
	     * @return {Promise<void>}
	     */
	    value: function waitForTOReadyState(timingObject, state) {
	      return new Promise(function (resolve) {
	        var check = function check() {
	          if (timingObject.readyState === state) {
	            resolve();
	          } else {
	            timingObject.addEventListener('readystatechange', check, {
	              once: true
	            });
	          }
	        };

	        check();
	      });
	    }
	  }]);

	  return TimingSrcConnector;
	}( /*#__PURE__*/wrapNativeSuper(EventTarget));

	var playerMap = new WeakMap();
	var readyMap = new WeakMap();
	var screenfull = {};

	var Player = /*#__PURE__*/function () {
	  /**
	   * Create a Player.
	   *
	   * @param {(HTMLIFrameElement|HTMLElement|string|jQuery)} element A reference to the Vimeo
	   *        player iframe, and id, or a jQuery object.
	   * @param {object} [options] oEmbed parameters to use when creating an embed in the element.
	   * @return {Player}
	   */
	  function Player(element) {
	    var _this = this;

	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    classCallCheck(this, Player);

	    /* global jQuery */
	    if (window.jQuery && element instanceof jQuery) {
	      if (element.length > 1 && window.console && console.warn) {
	        console.warn('A jQuery object with multiple elements was passed, using the first element.');
	      }

	      element = element[0];
	    } // Find an element by ID


	    if (typeof document !== 'undefined' && typeof element === 'string') {
	      element = document.getElementById(element);
	    } // Not an element!


	    if (!isDomElement(element)) {
	      throw new TypeError('You must pass either a valid element or a valid id.');
	    } // Already initialized an embed in this div, so grab the iframe


	    if (element.nodeName !== 'IFRAME') {
	      var iframe = element.querySelector('iframe');

	      if (iframe) {
	        element = iframe;
	      }
	    } // iframe url is not a Vimeo url


	    if (element.nodeName === 'IFRAME' && !isVimeoUrl(element.getAttribute('src') || '')) {
	      throw new Error('The player element passed isn’t a Vimeo embed.');
	    } // If there is already a player object in the map, return that


	    if (playerMap.has(element)) {
	      return playerMap.get(element);
	    }

	    this._window = element.ownerDocument.defaultView;
	    this.element = element;
	    this.origin = '*';
	    var readyPromise = new npo_src(function (resolve, reject) {
	      _this._onMessage = function (event) {
	        if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
	          return;
	        }

	        if (_this.origin === '*') {
	          _this.origin = event.origin;
	        }

	        var data = parseMessageData(event.data);
	        var isError = data && data.event === 'error';
	        var isReadyError = isError && data.data && data.data.method === 'ready';

	        if (isReadyError) {
	          var error = new Error(data.data.message);
	          error.name = data.data.name;
	          reject(error);
	          return;
	        }

	        var isReadyEvent = data && data.event === 'ready';
	        var isPingResponse = data && data.method === 'ping';

	        if (isReadyEvent || isPingResponse) {
	          _this.element.setAttribute('data-ready', 'true');

	          resolve();
	          return;
	        }

	        processData(_this, data);
	      };

	      _this._window.addEventListener('message', _this._onMessage);

	      if (_this.element.nodeName !== 'IFRAME') {
	        var params = getOEmbedParameters(element, options);
	        var url = getVimeoUrl(params);
	        getOEmbedData(url, params, element).then(function (data) {
	          var iframe = createEmbed(data, element); // Overwrite element with the new iframe,
	          // but store reference to the original element

	          _this.element = iframe;
	          _this._originalElement = element;
	          swapCallbacks(element, iframe);
	          playerMap.set(_this.element, _this);
	          return data;
	        }).catch(reject);
	      }
	    }); // Store a copy of this Player in the map

	    readyMap.set(this, readyPromise);
	    playerMap.set(this.element, this); // Send a ping to the iframe so the ready promise will be resolved if
	    // the player is already ready.

	    if (this.element.nodeName === 'IFRAME') {
	      postMessage(this, 'ping');
	    }

	    if (screenfull.isEnabled) {
	      var exitFullscreen = function exitFullscreen() {
	        return screenfull.exit();
	      };

	      this.fullscreenchangeHandler = function () {
	        if (screenfull.isFullscreen) {
	          storeCallback(_this, 'event:exitFullscreen', exitFullscreen);
	        } else {
	          removeCallback(_this, 'event:exitFullscreen', exitFullscreen);
	        } // eslint-disable-next-line


	        _this.ready().then(function () {
	          postMessage(_this, 'fullscreenchange', screenfull.isFullscreen);
	        });
	      };

	      screenfull.on('fullscreenchange', this.fullscreenchangeHandler);
	    }

	    return this;
	  }
	  /**
	   * Get a promise for a method.
	   *
	   * @param {string} name The API method to call.
	   * @param {Object} [args={}] Arguments to send via postMessage.
	   * @return {Promise}
	   */


	  createClass(Player, [{
	    key: "callMethod",
	    value: function callMethod(name) {
	      var _this2 = this;

	      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      return new npo_src(function (resolve, reject) {
	        // We are storing the resolve/reject handlers to call later, so we
	        // can’t return here.
	        // eslint-disable-next-line promise/always-return
	        return _this2.ready().then(function () {
	          storeCallback(_this2, name, {
	            resolve: resolve,
	            reject: reject
	          });
	          postMessage(_this2, name, args);
	        }).catch(reject);
	      });
	    }
	    /**
	     * Get a promise for the value of a player property.
	     *
	     * @param {string} name The property name
	     * @return {Promise}
	     */

	  }, {
	    key: "get",
	    value: function get(name) {
	      var _this3 = this;

	      return new npo_src(function (resolve, reject) {
	        name = getMethodName(name, 'get'); // We are storing the resolve/reject handlers to call later, so we
	        // can’t return here.
	        // eslint-disable-next-line promise/always-return

	        return _this3.ready().then(function () {
	          storeCallback(_this3, name, {
	            resolve: resolve,
	            reject: reject
	          });
	          postMessage(_this3, name);
	        }).catch(reject);
	      });
	    }
	    /**
	     * Get a promise for setting the value of a player property.
	     *
	     * @param {string} name The API method to call.
	     * @param {mixed} value The value to set.
	     * @return {Promise}
	     */

	  }, {
	    key: "set",
	    value: function set(name, value) {
	      var _this4 = this;

	      return new npo_src(function (resolve, reject) {
	        name = getMethodName(name, 'set');

	        if (value === undefined || value === null) {
	          throw new TypeError('There must be a value to set.');
	        } // We are storing the resolve/reject handlers to call later, so we
	        // can’t return here.
	        // eslint-disable-next-line promise/always-return


	        return _this4.ready().then(function () {
	          storeCallback(_this4, name, {
	            resolve: resolve,
	            reject: reject
	          });
	          postMessage(_this4, name, value);
	        }).catch(reject);
	      });
	    }
	    /**
	     * Add an event listener for the specified event. Will call the
	     * callback with a single parameter, `data`, that contains the data for
	     * that event.
	     *
	     * @param {string} eventName The name of the event.
	     * @param {function(*)} callback The function to call when the event fires.
	     * @return {void}
	     */

	  }, {
	    key: "on",
	    value: function on(eventName, callback) {
	      if (!eventName) {
	        throw new TypeError('You must pass an event name.');
	      }

	      if (!callback) {
	        throw new TypeError('You must pass a callback function.');
	      }

	      if (typeof callback !== 'function') {
	        throw new TypeError('The callback must be a function.');
	      }

	      var callbacks = getCallbacks(this, "event:".concat(eventName));

	      if (callbacks.length === 0) {
	        this.callMethod('addEventListener', eventName).catch(function () {// Ignore the error. There will be an error event fired that
	          // will trigger the error callback if they are listening.
	        });
	      }

	      storeCallback(this, "event:".concat(eventName), callback);
	    }
	    /**
	     * Remove an event listener for the specified event. Will remove all
	     * listeners for that event if a `callback` isn’t passed, or only that
	     * specific callback if it is passed.
	     *
	     * @param {string} eventName The name of the event.
	     * @param {function} [callback] The specific callback to remove.
	     * @return {void}
	     */

	  }, {
	    key: "off",
	    value: function off(eventName, callback) {
	      if (!eventName) {
	        throw new TypeError('You must pass an event name.');
	      }

	      if (callback && typeof callback !== 'function') {
	        throw new TypeError('The callback must be a function.');
	      }

	      var lastCallback = removeCallback(this, "event:".concat(eventName), callback); // If there are no callbacks left, remove the listener

	      if (lastCallback) {
	        this.callMethod('removeEventListener', eventName).catch(function (e) {// Ignore the error. There will be an error event fired that
	          // will trigger the error callback if they are listening.
	        });
	      }
	    }
	    /**
	     * A promise to load a new video.
	     *
	     * @promise LoadVideoPromise
	     * @fulfill {number} The video with this id or url successfully loaded.
	     * @reject {TypeError} The id was not a number.
	     */

	    /**
	     * Load a new video into this embed. The promise will be resolved if
	     * the video is successfully loaded, or it will be rejected if it could
	     * not be loaded.
	     *
	     * @param {number|string|object} options The id of the video, the url of the video, or an object with embed options.
	     * @return {LoadVideoPromise}
	     */

	  }, {
	    key: "loadVideo",
	    value: function loadVideo(options) {
	      return this.callMethod('loadVideo', options);
	    }
	    /**
	     * A promise to perform an action when the Player is ready.
	     *
	     * @todo document errors
	     * @promise LoadVideoPromise
	     * @fulfill {void}
	     */

	    /**
	     * Trigger a function when the player iframe has initialized. You do not
	     * need to wait for `ready` to trigger to begin adding event listeners
	     * or calling other methods.
	     *
	     * @return {ReadyPromise}
	     */

	  }, {
	    key: "ready",
	    value: function ready() {
	      var readyPromise = readyMap.get(this) || new npo_src(function (resolve, reject) {
	        reject(new Error('Unknown player. Probably unloaded.'));
	      });
	      return npo_src.resolve(readyPromise);
	    }
	    /**
	     * A promise to add a cue point to the player.
	     *
	     * @promise AddCuePointPromise
	     * @fulfill {string} The id of the cue point to use for removeCuePoint.
	     * @reject {RangeError} the time was less than 0 or greater than the
	     *         video’s duration.
	     * @reject {UnsupportedError} Cue points are not supported with the current
	     *         player or browser.
	     */

	    /**
	     * Add a cue point to the player.
	     *
	     * @param {number} time The time for the cue point.
	     * @param {object} [data] Arbitrary data to be returned with the cue point.
	     * @return {AddCuePointPromise}
	     */

	  }, {
	    key: "addCuePoint",
	    value: function addCuePoint(time) {
	      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      return this.callMethod('addCuePoint', {
	        time: time,
	        data: data
	      });
	    }
	    /**
	     * A promise to remove a cue point from the player.
	     *
	     * @promise AddCuePointPromise
	     * @fulfill {string} The id of the cue point that was removed.
	     * @reject {InvalidCuePoint} The cue point with the specified id was not
	     *         found.
	     * @reject {UnsupportedError} Cue points are not supported with the current
	     *         player or browser.
	     */

	    /**
	     * Remove a cue point from the video.
	     *
	     * @param {string} id The id of the cue point to remove.
	     * @return {RemoveCuePointPromise}
	     */

	  }, {
	    key: "removeCuePoint",
	    value: function removeCuePoint(id) {
	      return this.callMethod('removeCuePoint', id);
	    }
	    /**
	     * A representation of a text track on a video.
	     *
	     * @typedef {Object} VimeoTextTrack
	     * @property {string} language The ISO language code.
	     * @property {string} kind The kind of track it is (captions or subtitles).
	     * @property {string} label The human‐readable label for the track.
	     */

	    /**
	     * A promise to enable a text track.
	     *
	     * @promise EnableTextTrackPromise
	     * @fulfill {VimeoTextTrack} The text track that was enabled.
	     * @reject {InvalidTrackLanguageError} No track was available with the
	     *         specified language.
	     * @reject {InvalidTrackError} No track was available with the specified
	     *         language and kind.
	     */

	    /**
	     * Enable the text track with the specified language, and optionally the
	     * specified kind (captions or subtitles).
	     *
	     * When set via the API, the track language will not change the viewer’s
	     * stored preference.
	     *
	     * @param {string} language The two‐letter language code.
	     * @param {string} [kind] The kind of track to enable (captions or subtitles).
	     * @return {EnableTextTrackPromise}
	     */

	  }, {
	    key: "enableTextTrack",
	    value: function enableTextTrack(language, kind) {
	      if (!language) {
	        throw new TypeError('You must pass a language.');
	      }

	      return this.callMethod('enableTextTrack', {
	        language: language,
	        kind: kind
	      });
	    }
	    /**
	     * A promise to disable the active text track.
	     *
	     * @promise DisableTextTrackPromise
	     * @fulfill {void} The track was disabled.
	     */

	    /**
	     * Disable the currently-active text track.
	     *
	     * @return {DisableTextTrackPromise}
	     */

	  }, {
	    key: "disableTextTrack",
	    value: function disableTextTrack() {
	      return this.callMethod('disableTextTrack');
	    }
	    /**
	     * A promise to pause the video.
	     *
	     * @promise PausePromise
	     * @fulfill {void} The video was paused.
	     */

	    /**
	     * Pause the video if it’s playing.
	     *
	     * @return {PausePromise}
	     */

	  }, {
	    key: "pause",
	    value: function pause() {
	      return this.callMethod('pause');
	    }
	    /**
	     * A promise to play the video.
	     *
	     * @promise PlayPromise
	     * @fulfill {void} The video was played.
	     */

	    /**
	     * Play the video if it’s paused. **Note:** on iOS and some other
	     * mobile devices, you cannot programmatically trigger play. Once the
	     * viewer has tapped on the play button in the player, however, you
	     * will be able to use this function.
	     *
	     * @return {PlayPromise}
	     */

	  }, {
	    key: "play",
	    value: function play() {
	      return this.callMethod('play');
	    }
	    /**
	     * Request that the player enters fullscreen.
	     * @return {Promise}
	     */

	  }, {
	    key: "requestFullscreen",
	    value: function requestFullscreen() {
	      if (screenfull.isEnabled) {
	        return screenfull.request(this.element);
	      }

	      return this.callMethod('requestFullscreen');
	    }
	    /**
	     * Request that the player exits fullscreen.
	     * @return {Promise}
	     */

	  }, {
	    key: "exitFullscreen",
	    value: function exitFullscreen() {
	      if (screenfull.isEnabled) {
	        return screenfull.exit();
	      }

	      return this.callMethod('exitFullscreen');
	    }
	    /**
	     * Returns true if the player is currently fullscreen.
	     * @return {Promise}
	     */

	  }, {
	    key: "getFullscreen",
	    value: function getFullscreen() {
	      if (screenfull.isEnabled) {
	        return npo_src.resolve(screenfull.isFullscreen);
	      }

	      return this.get('fullscreen');
	    }
	    /**
	     * Request that the player enters picture-in-picture.
	     * @return {Promise}
	     */

	  }, {
	    key: "requestPictureInPicture",
	    value: function requestPictureInPicture() {
	      return this.callMethod('requestPictureInPicture');
	    }
	    /**
	     * Request that the player exits picture-in-picture.
	     * @return {Promise}
	     */

	  }, {
	    key: "exitPictureInPicture",
	    value: function exitPictureInPicture() {
	      return this.callMethod('exitPictureInPicture');
	    }
	    /**
	     * Returns true if the player is currently picture-in-picture.
	     * @return {Promise}
	     */

	  }, {
	    key: "getPictureInPicture",
	    value: function getPictureInPicture() {
	      return this.get('pictureInPicture');
	    }
	    /**
	     * A promise to prompt the viewer to initiate remote playback.
	     *
	     * @promise RemotePlaybackPromptPromise
	     * @fulfill {void}
	     * @reject {NotFoundError} No remote playback device is available.
	     */

	    /**
	     * Request to prompt the user to initiate remote playback.
	     *
	     * @return {RemotePlaybackPromptPromise}
	     */

	  }, {
	    key: "remotePlaybackPrompt",
	    value: function remotePlaybackPrompt() {
	      return this.callMethod('remotePlaybackPrompt');
	    }
	    /**
	     * A promise to unload the video.
	     *
	     * @promise UnloadPromise
	     * @fulfill {void} The video was unloaded.
	     */

	    /**
	     * Return the player to its initial state.
	     *
	     * @return {UnloadPromise}
	     */

	  }, {
	    key: "unload",
	    value: function unload() {
	      return this.callMethod('unload');
	    }
	    /**
	     * Cleanup the player and remove it from the DOM
	     *
	     * It won't be usable and a new one should be constructed
	     *  in order to do any operations.
	     *
	     * @return {Promise}
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      var _this5 = this;

	      return new npo_src(function (resolve) {
	        readyMap.delete(_this5);
	        playerMap.delete(_this5.element);

	        if (_this5._originalElement) {
	          playerMap.delete(_this5._originalElement);

	          _this5._originalElement.removeAttribute('data-vimeo-initialized');
	        }

	        if (_this5.element && _this5.element.nodeName === 'IFRAME' && _this5.element.parentNode) {
	          // If we've added an additional wrapper div, remove that from the DOM.
	          // If not, just remove the iframe element.
	          if (_this5.element.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== _this5.element.parentNode) {
	            _this5.element.parentNode.parentNode.removeChild(_this5.element.parentNode);
	          } else {
	            _this5.element.parentNode.removeChild(_this5.element);
	          }
	        } // If the clip is private there is a case where the element stays the
	        // div element. Destroy should reset the div and remove the iframe child.


	        if (_this5.element && _this5.element.nodeName === 'DIV' && _this5.element.parentNode) {
	          _this5.element.removeAttribute('data-vimeo-initialized');

	          var iframe = _this5.element.querySelector('iframe');

	          if (iframe && iframe.parentNode) {
	            // If we've added an additional wrapper div, remove that from the DOM.
	            // If not, just remove the iframe element.
	            if (iframe.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== iframe.parentNode) {
	              iframe.parentNode.parentNode.removeChild(iframe.parentNode);
	            } else {
	              iframe.parentNode.removeChild(iframe);
	            }
	          }
	        }

	        _this5._window.removeEventListener('message', _this5._onMessage);

	        if (screenfull.isEnabled) {
	          screenfull.off('fullscreenchange', _this5.fullscreenchangeHandler);
	        }

	        resolve();
	      });
	    }
	    /**
	     * A promise to get the autopause behavior of the video.
	     *
	     * @promise GetAutopausePromise
	     * @fulfill {boolean} Whether autopause is turned on or off.
	     * @reject {UnsupportedError} Autopause is not supported with the current
	     *         player or browser.
	     */

	    /**
	     * Get the autopause behavior for this player.
	     *
	     * @return {GetAutopausePromise}
	     */

	  }, {
	    key: "getAutopause",
	    value: function getAutopause() {
	      return this.get('autopause');
	    }
	    /**
	     * A promise to set the autopause behavior of the video.
	     *
	     * @promise SetAutopausePromise
	     * @fulfill {boolean} Whether autopause is turned on or off.
	     * @reject {UnsupportedError} Autopause is not supported with the current
	     *         player or browser.
	     */

	    /**
	     * Enable or disable the autopause behavior of this player.
	     *
	     * By default, when another video is played in the same browser, this
	     * player will automatically pause. Unless you have a specific reason
	     * for doing so, we recommend that you leave autopause set to the
	     * default (`true`).
	     *
	     * @param {boolean} autopause
	     * @return {SetAutopausePromise}
	     */

	  }, {
	    key: "setAutopause",
	    value: function setAutopause(autopause) {
	      return this.set('autopause', autopause);
	    }
	    /**
	     * A promise to get the buffered property of the video.
	     *
	     * @promise GetBufferedPromise
	     * @fulfill {Array} Buffered Timeranges converted to an Array.
	     */

	    /**
	     * Get the buffered property of the video.
	     *
	     * @return {GetBufferedPromise}
	     */

	  }, {
	    key: "getBuffered",
	    value: function getBuffered() {
	      return this.get('buffered');
	    }
	    /**
	     * @typedef {Object} CameraProperties
	     * @prop {number} props.yaw - Number between 0 and 360.
	     * @prop {number} props.pitch - Number between -90 and 90.
	     * @prop {number} props.roll - Number between -180 and 180.
	     * @prop {number} props.fov - The field of view in degrees.
	     */

	    /**
	     * A promise to get the camera properties of the player.
	     *
	     * @promise GetCameraPromise
	     * @fulfill {CameraProperties} The camera properties.
	     */

	    /**
	     * For 360° videos get the camera properties for this player.
	     *
	     * @return {GetCameraPromise}
	     */

	  }, {
	    key: "getCameraProps",
	    value: function getCameraProps() {
	      return this.get('cameraProps');
	    }
	    /**
	     * A promise to set the camera properties of the player.
	     *
	     * @promise SetCameraPromise
	     * @fulfill {Object} The camera was successfully set.
	     * @reject {RangeError} The range was out of bounds.
	     */

	    /**
	     * For 360° videos set the camera properties for this player.
	     *
	     * @param {CameraProperties} camera The camera properties
	     * @return {SetCameraPromise}
	     */

	  }, {
	    key: "setCameraProps",
	    value: function setCameraProps(camera) {
	      return this.set('cameraProps', camera);
	    }
	    /**
	     * A representation of a chapter.
	     *
	     * @typedef {Object} VimeoChapter
	     * @property {number} startTime The start time of the chapter.
	     * @property {object} title The title of the chapter.
	     * @property {number} index The place in the order of Chapters. Starts at 1.
	     */

	    /**
	     * A promise to get chapters for the video.
	     *
	     * @promise GetChaptersPromise
	     * @fulfill {VimeoChapter[]} The chapters for the video.
	     */

	    /**
	     * Get an array of all the chapters for the video.
	     *
	     * @return {GetChaptersPromise}
	     */

	  }, {
	    key: "getChapters",
	    value: function getChapters() {
	      return this.get('chapters');
	    }
	    /**
	     * A promise to get the currently active chapter.
	     *
	     * @promise GetCurrentChaptersPromise
	     * @fulfill {VimeoChapter|undefined} The current chapter for the video.
	     */

	    /**
	     * Get the currently active chapter for the video.
	     *
	     * @return {GetCurrentChaptersPromise}
	     */

	  }, {
	    key: "getCurrentChapter",
	    value: function getCurrentChapter() {
	      return this.get('currentChapter');
	    }
	    /**
	     * A promise to get the accent color of the player.
	     *
	     * @promise GetColorPromise
	     * @fulfill {string} The hex color of the player.
	     */

	    /**
	     * Get the accent color for this player. Note this is deprecated in place of `getColorTwo`.
	     *
	     * @return {GetColorPromise}
	     */

	  }, {
	    key: "getColor",
	    value: function getColor() {
	      return this.get('color');
	    }
	    /**
	     * A promise to get all colors for the player in an array.
	     *
	     * @promise GetColorsPromise
	     * @fulfill {string[]} The hex colors of the player.
	     */

	    /**
	     * Get all the colors for this player in an array: [colorOne, colorTwo, colorThree, colorFour]
	     *
	     * @return {GetColorPromise}
	     */

	  }, {
	    key: "getColors",
	    value: function getColors() {
	      return npo_src.all([this.get('colorOne'), this.get('colorTwo'), this.get('colorThree'), this.get('colorFour')]);
	    }
	    /**
	     * A promise to set the accent color of the player.
	     *
	     * @promise SetColorPromise
	     * @fulfill {string} The color was successfully set.
	     * @reject {TypeError} The string was not a valid hex or rgb color.
	     * @reject {ContrastError} The color was set, but the contrast is
	     *         outside of the acceptable range.
	     * @reject {EmbedSettingsError} The owner of the player has chosen to
	     *         use a specific color.
	     */

	    /**
	     * Set the accent color of this player to a hex or rgb string. Setting the
	     * color may fail if the owner of the video has set their embed
	     * preferences to force a specific color.
	     * Note this is deprecated in place of `setColorTwo`.
	     *
	     * @param {string} color The hex or rgb color string to set.
	     * @return {SetColorPromise}
	     */

	  }, {
	    key: "setColor",
	    value: function setColor(color) {
	      return this.set('color', color);
	    }
	    /**
	     * A promise to set all colors for the player.
	     *
	     * @promise SetColorsPromise
	     * @fulfill {string[]} The colors were successfully set.
	     * @reject {TypeError} The string was not a valid hex or rgb color.
	     * @reject {ContrastError} The color was set, but the contrast is
	     *         outside of the acceptable range.
	     * @reject {EmbedSettingsError} The owner of the player has chosen to
	     *         use a specific color.
	     */

	    /**
	     * Set the colors of this player to a hex or rgb string. Setting the
	     * color may fail if the owner of the video has set their embed
	     * preferences to force a specific color.
	     * The colors should be passed in as an array: [colorOne, colorTwo, colorThree, colorFour].
	     * If a color should not be set, the index in the array can be left as null.
	     *
	     * @param {string[]} colors Array of the hex or rgb color strings to set.
	     * @return {SetColorsPromise}
	     */

	  }, {
	    key: "setColors",
	    value: function setColors(colors) {
	      if (!Array.isArray(colors)) {
	        return new npo_src(function (resolve, reject) {
	          return reject(new TypeError('Argument must be an array.'));
	        });
	      }

	      var nullPromise = new npo_src(function (resolve) {
	        return resolve(null);
	      });
	      var colorPromises = [colors[0] ? this.set('colorOne', colors[0]) : nullPromise, colors[1] ? this.set('colorTwo', colors[1]) : nullPromise, colors[2] ? this.set('colorThree', colors[2]) : nullPromise, colors[3] ? this.set('colorFour', colors[3]) : nullPromise];
	      return npo_src.all(colorPromises);
	    }
	    /**
	     * A representation of a cue point.
	     *
	     * @typedef {Object} VimeoCuePoint
	     * @property {number} time The time of the cue point.
	     * @property {object} data The data passed when adding the cue point.
	     * @property {string} id The unique id for use with removeCuePoint.
	     */

	    /**
	     * A promise to get the cue points of a video.
	     *
	     * @promise GetCuePointsPromise
	     * @fulfill {VimeoCuePoint[]} The cue points added to the video.
	     * @reject {UnsupportedError} Cue points are not supported with the current
	     *         player or browser.
	     */

	    /**
	     * Get an array of the cue points added to the video.
	     *
	     * @return {GetCuePointsPromise}
	     */

	  }, {
	    key: "getCuePoints",
	    value: function getCuePoints() {
	      return this.get('cuePoints');
	    }
	    /**
	     * A promise to get the current time of the video.
	     *
	     * @promise GetCurrentTimePromise
	     * @fulfill {number} The current time in seconds.
	     */

	    /**
	     * Get the current playback position in seconds.
	     *
	     * @return {GetCurrentTimePromise}
	     */

	  }, {
	    key: "getCurrentTime",
	    value: function getCurrentTime() {
	      return this.get('currentTime');
	    }
	    /**
	     * A promise to set the current time of the video.
	     *
	     * @promise SetCurrentTimePromise
	     * @fulfill {number} The actual current time that was set.
	     * @reject {RangeError} the time was less than 0 or greater than the
	     *         video’s duration.
	     */

	    /**
	     * Set the current playback position in seconds. If the player was
	     * paused, it will remain paused. Likewise, if the player was playing,
	     * it will resume playing once the video has buffered.
	     *
	     * You can provide an accurate time and the player will attempt to seek
	     * to as close to that time as possible. The exact time will be the
	     * fulfilled value of the promise.
	     *
	     * @param {number} currentTime
	     * @return {SetCurrentTimePromise}
	     */

	  }, {
	    key: "setCurrentTime",
	    value: function setCurrentTime(currentTime) {
	      return this.set('currentTime', currentTime);
	    }
	    /**
	     * A promise to get the duration of the video.
	     *
	     * @promise GetDurationPromise
	     * @fulfill {number} The duration in seconds.
	     */

	    /**
	     * Get the duration of the video in seconds. It will be rounded to the
	     * nearest second before playback begins, and to the nearest thousandth
	     * of a second after playback begins.
	     *
	     * @return {GetDurationPromise}
	     */

	  }, {
	    key: "getDuration",
	    value: function getDuration() {
	      return this.get('duration');
	    }
	    /**
	     * A promise to get the ended state of the video.
	     *
	     * @promise GetEndedPromise
	     * @fulfill {boolean} Whether or not the video has ended.
	     */

	    /**
	     * Get the ended state of the video. The video has ended if
	     * `currentTime === duration`.
	     *
	     * @return {GetEndedPromise}
	     */

	  }, {
	    key: "getEnded",
	    value: function getEnded() {
	      return this.get('ended');
	    }
	    /**
	     * A promise to get the loop state of the player.
	     *
	     * @promise GetLoopPromise
	     * @fulfill {boolean} Whether or not the player is set to loop.
	     */

	    /**
	     * Get the loop state of the player.
	     *
	     * @return {GetLoopPromise}
	     */

	  }, {
	    key: "getLoop",
	    value: function getLoop() {
	      return this.get('loop');
	    }
	    /**
	     * A promise to set the loop state of the player.
	     *
	     * @promise SetLoopPromise
	     * @fulfill {boolean} The loop state that was set.
	     */

	    /**
	     * Set the loop state of the player. When set to `true`, the player
	     * will start over immediately once playback ends.
	     *
	     * @param {boolean} loop
	     * @return {SetLoopPromise}
	     */

	  }, {
	    key: "setLoop",
	    value: function setLoop(loop) {
	      return this.set('loop', loop);
	    }
	    /**
	     * A promise to set the muted state of the player.
	     *
	     * @promise SetMutedPromise
	     * @fulfill {boolean} The muted state that was set.
	     */

	    /**
	     * Set the muted state of the player. When set to `true`, the player
	     * volume will be muted.
	     *
	     * @param {boolean} muted
	     * @return {SetMutedPromise}
	     */

	  }, {
	    key: "setMuted",
	    value: function setMuted(muted) {
	      return this.set('muted', muted);
	    }
	    /**
	     * A promise to get the muted state of the player.
	     *
	     * @promise GetMutedPromise
	     * @fulfill {boolean} Whether or not the player is muted.
	     */

	    /**
	     * Get the muted state of the player.
	     *
	     * @return {GetMutedPromise}
	     */

	  }, {
	    key: "getMuted",
	    value: function getMuted() {
	      return this.get('muted');
	    }
	    /**
	     * A promise to get the paused state of the player.
	     *
	     * @promise GetLoopPromise
	     * @fulfill {boolean} Whether or not the video is paused.
	     */

	    /**
	     * Get the paused state of the player.
	     *
	     * @return {GetLoopPromise}
	     */

	  }, {
	    key: "getPaused",
	    value: function getPaused() {
	      return this.get('paused');
	    }
	    /**
	     * A promise to get the playback rate of the player.
	     *
	     * @promise GetPlaybackRatePromise
	     * @fulfill {number} The playback rate of the player on a scale from 0 to 2.
	     */

	    /**
	     * Get the playback rate of the player on a scale from `0` to `2`.
	     *
	     * @return {GetPlaybackRatePromise}
	     */

	  }, {
	    key: "getPlaybackRate",
	    value: function getPlaybackRate() {
	      return this.get('playbackRate');
	    }
	    /**
	     * A promise to set the playbackrate of the player.
	     *
	     * @promise SetPlaybackRatePromise
	     * @fulfill {number} The playback rate was set.
	     * @reject {RangeError} The playback rate was less than 0 or greater than 2.
	     */

	    /**
	     * Set the playback rate of the player on a scale from `0` to `2`. When set
	     * via the API, the playback rate will not be synchronized to other
	     * players or stored as the viewer's preference.
	     *
	     * @param {number} playbackRate
	     * @return {SetPlaybackRatePromise}
	     */

	  }, {
	    key: "setPlaybackRate",
	    value: function setPlaybackRate(playbackRate) {
	      return this.set('playbackRate', playbackRate);
	    }
	    /**
	     * A promise to get the played property of the video.
	     *
	     * @promise GetPlayedPromise
	     * @fulfill {Array} Played Timeranges converted to an Array.
	     */

	    /**
	     * Get the played property of the video.
	     *
	     * @return {GetPlayedPromise}
	     */

	  }, {
	    key: "getPlayed",
	    value: function getPlayed() {
	      return this.get('played');
	    }
	    /**
	     * A promise to get the qualities available of the current video.
	     *
	     * @promise GetQualitiesPromise
	     * @fulfill {Array} The qualities of the video.
	     */

	    /**
	     * Get the qualities of the current video.
	     *
	     * @return {GetQualitiesPromise}
	     */

	  }, {
	    key: "getQualities",
	    value: function getQualities() {
	      return this.get('qualities');
	    }
	    /**
	     * A promise to get the current set quality of the video.
	     *
	     * @promise GetQualityPromise
	     * @fulfill {string} The current set quality.
	     */

	    /**
	     * Get the current set quality of the video.
	     *
	     * @return {GetQualityPromise}
	     */

	  }, {
	    key: "getQuality",
	    value: function getQuality() {
	      return this.get('quality');
	    }
	    /**
	     * A promise to set the video quality.
	     *
	     * @promise SetQualityPromise
	     * @fulfill {number} The quality was set.
	     * @reject {RangeError} The quality is not available.
	     */

	    /**
	     * Set a video quality.
	     *
	     * @param {string} quality
	     * @return {SetQualityPromise}
	     */

	  }, {
	    key: "setQuality",
	    value: function setQuality(quality) {
	      return this.set('quality', quality);
	    }
	    /**
	     * A promise to get the remote playback availability.
	     *
	     * @promise RemotePlaybackAvailabilityPromise
	     * @fulfill {boolean} Whether remote playback is available.
	     */

	    /**
	     * Get the availability of remote playback.
	     *
	     * @return {RemotePlaybackAvailabilityPromise}
	     */

	  }, {
	    key: "getRemotePlaybackAvailability",
	    value: function getRemotePlaybackAvailability() {
	      return this.get('remotePlaybackAvailability');
	    }
	    /**
	     * A promise to get the current remote playback state.
	     *
	     * @promise RemotePlaybackStatePromise
	     * @fulfill {string} The state of the remote playback: connecting, connected, or disconnected.
	     */

	    /**
	     * Get the current remote playback state.
	     *
	     * @return {RemotePlaybackStatePromise}
	     */

	  }, {
	    key: "getRemotePlaybackState",
	    value: function getRemotePlaybackState() {
	      return this.get('remotePlaybackState');
	    }
	    /**
	     * A promise to get the seekable property of the video.
	     *
	     * @promise GetSeekablePromise
	     * @fulfill {Array} Seekable Timeranges converted to an Array.
	     */

	    /**
	     * Get the seekable property of the video.
	     *
	     * @return {GetSeekablePromise}
	     */

	  }, {
	    key: "getSeekable",
	    value: function getSeekable() {
	      return this.get('seekable');
	    }
	    /**
	     * A promise to get the seeking property of the player.
	     *
	     * @promise GetSeekingPromise
	     * @fulfill {boolean} Whether or not the player is currently seeking.
	     */

	    /**
	     * Get if the player is currently seeking.
	     *
	     * @return {GetSeekingPromise}
	     */

	  }, {
	    key: "getSeeking",
	    value: function getSeeking() {
	      return this.get('seeking');
	    }
	    /**
	     * A promise to get the text tracks of a video.
	     *
	     * @promise GetTextTracksPromise
	     * @fulfill {VimeoTextTrack[]} The text tracks associated with the video.
	     */

	    /**
	     * Get an array of the text tracks that exist for the video.
	     *
	     * @return {GetTextTracksPromise}
	     */

	  }, {
	    key: "getTextTracks",
	    value: function getTextTracks() {
	      return this.get('textTracks');
	    }
	    /**
	     * A promise to get the embed code for the video.
	     *
	     * @promise GetVideoEmbedCodePromise
	     * @fulfill {string} The `<iframe>` embed code for the video.
	     */

	    /**
	     * Get the `<iframe>` embed code for the video.
	     *
	     * @return {GetVideoEmbedCodePromise}
	     */

	  }, {
	    key: "getVideoEmbedCode",
	    value: function getVideoEmbedCode() {
	      return this.get('videoEmbedCode');
	    }
	    /**
	     * A promise to get the id of the video.
	     *
	     * @promise GetVideoIdPromise
	     * @fulfill {number} The id of the video.
	     */

	    /**
	     * Get the id of the video.
	     *
	     * @return {GetVideoIdPromise}
	     */

	  }, {
	    key: "getVideoId",
	    value: function getVideoId() {
	      return this.get('videoId');
	    }
	    /**
	     * A promise to get the title of the video.
	     *
	     * @promise GetVideoTitlePromise
	     * @fulfill {number} The title of the video.
	     */

	    /**
	     * Get the title of the video.
	     *
	     * @return {GetVideoTitlePromise}
	     */

	  }, {
	    key: "getVideoTitle",
	    value: function getVideoTitle() {
	      return this.get('videoTitle');
	    }
	    /**
	     * A promise to get the native width of the video.
	     *
	     * @promise GetVideoWidthPromise
	     * @fulfill {number} The native width of the video.
	     */

	    /**
	     * Get the native width of the currently‐playing video. The width of
	     * the highest‐resolution available will be used before playback begins.
	     *
	     * @return {GetVideoWidthPromise}
	     */

	  }, {
	    key: "getVideoWidth",
	    value: function getVideoWidth() {
	      return this.get('videoWidth');
	    }
	    /**
	     * A promise to get the native height of the video.
	     *
	     * @promise GetVideoHeightPromise
	     * @fulfill {number} The native height of the video.
	     */

	    /**
	     * Get the native height of the currently‐playing video. The height of
	     * the highest‐resolution available will be used before playback begins.
	     *
	     * @return {GetVideoHeightPromise}
	     */

	  }, {
	    key: "getVideoHeight",
	    value: function getVideoHeight() {
	      return this.get('videoHeight');
	    }
	    /**
	     * A promise to get the vimeo.com url for the video.
	     *
	     * @promise GetVideoUrlPromise
	     * @fulfill {number} The vimeo.com url for the video.
	     * @reject {PrivacyError} The url isn’t available because of the video’s privacy setting.
	     */

	    /**
	     * Get the vimeo.com url for the video.
	     *
	     * @return {GetVideoUrlPromise}
	     */

	  }, {
	    key: "getVideoUrl",
	    value: function getVideoUrl() {
	      return this.get('videoUrl');
	    }
	    /**
	     * A promise to get the volume level of the player.
	     *
	     * @promise GetVolumePromise
	     * @fulfill {number} The volume level of the player on a scale from 0 to 1.
	     */

	    /**
	     * Get the current volume level of the player on a scale from `0` to `1`.
	     *
	     * Most mobile devices do not support an independent volume from the
	     * system volume. In those cases, this method will always return `1`.
	     *
	     * @return {GetVolumePromise}
	     */

	  }, {
	    key: "getVolume",
	    value: function getVolume() {
	      return this.get('volume');
	    }
	    /**
	     * A promise to set the volume level of the player.
	     *
	     * @promise SetVolumePromise
	     * @fulfill {number} The volume was set.
	     * @reject {RangeError} The volume was less than 0 or greater than 1.
	     */

	    /**
	     * Set the volume of the player on a scale from `0` to `1`. When set
	     * via the API, the volume level will not be synchronized to other
	     * players or stored as the viewer’s preference.
	     *
	     * Most mobile devices do not support setting the volume. An error will
	     * *not* be triggered in that situation.
	     *
	     * @param {number} volume
	     * @return {SetVolumePromise}
	     */

	  }, {
	    key: "setVolume",
	    value: function setVolume(volume) {
	      return this.set('volume', volume);
	    }
	    /** @typedef {import('./lib/timing-object.types').TimingObject} TimingObject */

	    /** @typedef {import('./lib/timing-src-connector.types').TimingSrcConnectorOptions} TimingSrcConnectorOptions */

	    /** @typedef {import('./lib/timing-src-connector').TimingSrcConnector} TimingSrcConnector */

	    /**
	     * Connects a TimingObject to the video player (https://webtiming.github.io/timingobject/)
	     *
	     * @param {TimingObject} timingObject
	     * @param {TimingSrcConnectorOptions} options
	     *
	     * @return {Promise<TimingSrcConnector>}
	     */

	  }, {
	    key: "setTimingSrc",
	    value: function () {
	      var _setTimingSrc = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(timingObject, options) {
	        var _this6 = this;

	        var connector;
	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (timingObject) {
	                  _context.next = 2;
	                  break;
	                }

	                throw new TypeError('A Timing Object must be provided.');

	              case 2:
	                _context.next = 4;
	                return this.ready();

	              case 4:
	                connector = new TimingSrcConnector(this, timingObject, options);
	                postMessage(this, 'notifyTimingObjectConnect');
	                connector.addEventListener('disconnect', function () {
	                  return postMessage(_this6, 'notifyTimingObjectDisconnect');
	                });
	                return _context.abrupt("return", connector);

	              case 8:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function setTimingSrc(_x, _x2) {
	        return _setTimingSrc.apply(this, arguments);
	      }

	      return setTimingSrc;
	    }()
	  }]);

	  return Player;
	}(); // Setup embed only if this is not a node environment


	if (!isNode) {
	  screenfull = initializeScreenfull();
	  initializeEmbeds();
	  resizeEmbeds();
	  initAppendVideoMetadata();
	  checkUrlTimeParam();
	}

	return Player;

})));

//# sourceMappingURL=player.js.map