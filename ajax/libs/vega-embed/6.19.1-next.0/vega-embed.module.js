import { applyPatch } from 'fast-json-patch';
import stringify from 'json-stringify-pretty-compact';
import { satisfies } from 'semver';
import * as vegaImport from 'vega';
import { writeConfig, mergeConfig, isString, isBoolean } from 'vega';
import { expressionInterpreter } from 'vega-interpreter';
import * as vegaLiteImport from 'vega-lite';
import schemaParser from 'vega-schema-url-parser';
import * as themes from 'vega-themes';
import { Handler } from 'vega-tooltip';

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

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var Op = Object.prototype;
var hasOwn = Op.hasOwnProperty;
var undefined$1; // More compressible than void 0.

var $Symbol = typeof Symbol === "function" ? Symbol : {};
var iteratorSymbol = $Symbol.iterator || "@@iterator";
var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

function wrap(innerFn, outerFn, self, tryLocsList) {
  // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
  var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
  var generator = Object.create(protoGenerator.prototype);
  var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
  // .throw, and .return methods.

  generator._invoke = makeInvokeMethod(innerFn, self, context);
  return generator;
} // Try/catch helper to minimize deoptimizations. Returns a completion
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
GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
// Iterator interface in terms of a single ._invoke method.

function defineIteratorMethods(prototype) {
  ["next", "throw", "return"].forEach(function (method) {
    prototype[method] = function (arg) {
      return this._invoke(method, arg);
    };
  });
}

function isGeneratorFunction(genFun) {
  var ctor = typeof genFun === "function" && genFun.constructor;
  return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
  // do is to check its .name property.
  (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
}

function mark(genFun) {
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
}
// `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
// `hasOwn.call(value, "__await")` to determine if the yielded value is
// meant to be awaited.

function awrap(arg) {
  return {
    __await: arg
  };
}

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
}; // Note that simple async functions are implemented on top of
// AsyncIterator objects; they just return a Promise for the value of
// the final result produced by the iterator.


function async(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
  if (PromiseImpl === void 0) PromiseImpl = Promise;
  var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
  return isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
  : iter.next().then(function (result) {
    return result.done ? result.value : iter.next();
  });
}

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
Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
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

function keys(object) {
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
}

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

function doneResult() {
  return {
    value: undefined$1,
    done: true
  };
}

Context.prototype = {
  constructor: Context,
  reset: function reset(skipTempReset) {
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
  stop: function stop() {
    this.done = true;
    var rootEntry = this.tryEntries[0];
    var rootRecord = rootEntry.completion;

    if (rootRecord.type === "throw") {
      throw rootRecord.arg;
    }

    return this.rval;
  },
  dispatchException: function dispatchException(exception) {
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
  abrupt: function abrupt(type, arg) {
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
  complete: function complete(record, afterLoc) {
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
  finish: function finish(finallyLoc) {
    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
      var entry = this.tryEntries[i];

      if (entry.finallyLoc === finallyLoc) {
        this.complete(entry.completion, entry.afterLoc);
        resetTryEntry(entry);
        return ContinueSentinel;
      }
    }
  },
  "catch": function _catch(tryLoc) {
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
  delegateYield: function delegateYield(iterable, resultName, nextLoc) {
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
}; // Export a default namespace that plays well with Rollup

var _regeneratorRuntime = {
  wrap,
  isGeneratorFunction,
  AsyncIterator,
  mark,
  awrap,
  async,
  keys,
  values
};

/**
 * Open editor url in a new window, and pass a message.
 */
function post (window, url, data) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  var editor = window.open(url);
  var wait = 10000;
  var step = 250;

  var _URL = new URL(url),
      origin = _URL.origin; // eslint-disable-next-line no-bitwise


  var count = ~~(wait / step);

  function listen(evt) {
    if (evt.source === editor) {
      count = 0;
      window.removeEventListener('message', listen, false);
    }
  }

  window.addEventListener('message', listen, false); // send message
  // periodically resend until ack received or timeout

  function send() {
    if (count <= 0) {
      return;
    }

    editor.postMessage(data, origin);
    setTimeout(send, step);
    count -= 1;
  }

  setTimeout(send, step);
}

// generated with build-style.sh
var embedStyle = ".vega-embed {\n  position: relative;\n  display: inline-block;\n  box-sizing: border-box; }\n  .vega-embed.has-actions {\n    padding-right: 38px; }\n  .vega-embed details:not([open]) > :not(summary) {\n    display: none !important; }\n  .vega-embed summary {\n    list-style: none;\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 6px;\n    z-index: 1000;\n    background: white;\n    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);\n    color: #1b1e23;\n    border: 1px solid #aaa;\n    border-radius: 999px;\n    opacity: 0.2;\n    transition: opacity 0.4s ease-in;\n    outline: none;\n    cursor: pointer;\n    line-height: 0px; }\n    .vega-embed summary::-webkit-details-marker {\n      display: none; }\n    .vega-embed summary:active {\n      box-shadow: #aaa 0px 0px 0px 1px inset; }\n    .vega-embed summary svg {\n      width: 14px;\n      height: 14px; }\n  .vega-embed details[open] summary {\n    opacity: 0.7; }\n  .vega-embed:hover summary,\n  .vega-embed:focus summary {\n    opacity: 1 !important;\n    transition: opacity 0.2s ease; }\n  .vega-embed .vega-actions {\n    position: absolute;\n    z-index: 1001;\n    top: 35px;\n    right: -9px;\n    display: flex;\n    flex-direction: column;\n    padding-bottom: 8px;\n    padding-top: 8px;\n    border-radius: 4px;\n    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);\n    border: 1px solid #d9d9d9;\n    background: white;\n    animation-duration: 0.15s;\n    animation-name: scale-in;\n    animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);\n    text-align: left; }\n    .vega-embed .vega-actions a {\n      padding: 8px 16px;\n      font-family: sans-serif;\n      font-size: 14px;\n      font-weight: 600;\n      white-space: nowrap;\n      color: #434a56;\n      text-decoration: none; }\n      .vega-embed .vega-actions a:hover {\n        background-color: #f7f7f9;\n        color: black; }\n    .vega-embed .vega-actions::before, .vega-embed .vega-actions::after {\n      content: \"\";\n      display: inline-block;\n      position: absolute; }\n    .vega-embed .vega-actions::before {\n      left: auto;\n      right: 14px;\n      top: -16px;\n      border: 8px solid #0000;\n      border-bottom-color: #d9d9d9; }\n    .vega-embed .vega-actions::after {\n      left: auto;\n      right: 15px;\n      top: -14px;\n      border: 7px solid #0000;\n      border-bottom-color: #fff; }\n  .vega-embed .chart-wrapper.fit-x {\n    width: 100%; }\n  .vega-embed .chart-wrapper.fit-y {\n    height: 100%; }\n\n.vega-embed-wrapper {\n  max-width: 100%;\n  overflow: auto;\n  padding-right: 14px; }\n\n@keyframes scale-in {\n  from {\n    opacity: 0;\n    transform: scale(0.6); }\n  to {\n    opacity: 1;\n    transform: scale(1); } }\n";

if (!String.prototype.startsWith) {
  // eslint-disable-next-line no-extend-native,func-names
  String.prototype.startsWith = function (search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  };
}
function mergeDeep(dest) {
  for (var _len = arguments.length, src = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    src[_key - 1] = arguments[_key];
  }

  for (var _i = 0, _src = src; _i < _src.length; _i++) {
    var s = _src[_i];
    deepMerge_(dest, s);
  }

  return dest;
}

function deepMerge_(dest, src) {
  for (var _i2 = 0, _Object$keys = Object.keys(src); _i2 < _Object$keys.length; _i2++) {
    var property = _Object$keys[_i2];
    writeConfig(dest, property, src[property], true);
  }
}

var _w$vl;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var vega = vegaImport;
var _vegaLite = vegaLiteImport; // For backwards compatibility with Vega-Lite before v4.
var w = typeof window !== 'undefined' ? window : undefined;

if (_vegaLite === undefined && w !== null && w !== void 0 && (_w$vl = w['vl']) !== null && _w$vl !== void 0 && _w$vl.compile) {
  _vegaLite = w['vl'];
}

var DEFAULT_ACTIONS = {
  export: {
    svg: true,
    png: true
  },
  source: true,
  compiled: true,
  editor: true
};
var I18N = {
  CLICK_TO_VIEW_ACTIONS: 'Click to view actions',
  COMPILED_ACTION: 'View Compiled Vega',
  EDITOR_ACTION: 'Open in Vega Editor',
  PNG_ACTION: 'Save as PNG',
  SOURCE_ACTION: 'View Source',
  SVG_ACTION: 'Save as SVG'
};
var NAMES = {
  vega: 'Vega',
  'vega-lite': 'Vega-Lite'
};
var VERSION = {
  vega: vega.version,
  'vega-lite': _vegaLite ? _vegaLite.version : 'not available'
};
var PREPROCESSOR = {
  vega: vgSpec => vgSpec,
  'vega-lite': (vlSpec, config) => _vegaLite.compile(vlSpec, {
    config: config
  }).spec
};
var SVG_CIRCLES = "\n<svg viewBox=\"0 0 16 16\" fill=\"currentColor\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle r=\"2\" cy=\"8\" cx=\"2\"></circle>\n  <circle r=\"2\" cy=\"8\" cx=\"8\"></circle>\n  <circle r=\"2\" cy=\"8\" cx=\"14\"></circle>\n</svg>";
var CHART_WRAPPER_CLASS = 'chart-wrapper';

function isTooltipHandler(h) {
  return typeof h === 'function';
}

function viewSource(source, sourceHeader, sourceFooter, mode) {
  var header = "<html><head>".concat(sourceHeader, "</head><body><pre><code class=\"json\">");
  var footer = "</code></pre>".concat(sourceFooter, "</body></html>"); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

  var win = window.open('');
  win.document.write(header + source + footer);
  win.document.title = "".concat(NAMES[mode], " JSON Source");
}
/**
 * Try to guess the type of spec.
 *
 * @param spec Vega or Vega-Lite spec.
 */


function guessMode(spec, providedMode) {
  // Decide mode
  if (spec.$schema) {
    var parsed = schemaParser(spec.$schema);

    if (providedMode && providedMode !== parsed.library) {
      var _NAMES$providedMode;

      console.warn("The given visualization spec is written in ".concat(NAMES[parsed.library], ", but mode argument sets ").concat((_NAMES$providedMode = NAMES[providedMode]) !== null && _NAMES$providedMode !== void 0 ? _NAMES$providedMode : providedMode, "."));
    }

    var mode = parsed.library;

    if (!satisfies(VERSION[mode], "^".concat(parsed.version.slice(1)))) {
      console.warn("The input spec uses ".concat(NAMES[mode], " ").concat(parsed.version, ", but the current version of ").concat(NAMES[mode], " is v").concat(VERSION[mode], "."));
    }

    return mode;
  } // try to guess from the provided spec


  if ('mark' in spec || 'encoding' in spec || 'layer' in spec || 'hconcat' in spec || 'vconcat' in spec || 'facet' in spec || 'repeat' in spec) {
    return 'vega-lite';
  }

  if ('marks' in spec || 'signals' in spec || 'scales' in spec || 'axes' in spec) {
    return 'vega';
  }

  return providedMode !== null && providedMode !== void 0 ? providedMode : 'vega';
}

function isLoader(o) {
  return !!(o && 'load' in o);
}

function createLoader(opts) {
  return isLoader(opts) ? opts : vega.loader(opts);
}

function embedOptionsFromUsermeta(parsedSpec) {
  var _ref;

  return (_ref = parsedSpec.usermeta && parsedSpec.usermeta['embedOptions']) !== null && _ref !== void 0 ? _ref : {};
}
/**
 * Embed a Vega visualization component in a web page. This function returns a promise.
 *
 * @param el        DOM element in which to place component (DOM node or CSS selector).
 * @param spec      String : A URL string from which to load the Vega specification.
 *                  Object : The Vega/Vega-Lite specification as a parsed JSON object.
 * @param opts       A JavaScript object containing options for embedding.
 */


function embed(_x, _x2) {
  return _embed2.apply(this, arguments);
}

function _embed2() {
  _embed2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(el, spec) {
    var _parsedOpts$config, _usermetaOpts$config;

    var opts,
        parsedSpec,
        loader,
        usermetaLoader,
        _opts$loader,
        usermetaOpts,
        parsedOpts,
        mergedOpts,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            opts = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};

            if (!isString(spec)) {
              _context.next = 10;
              break;
            }

            loader = createLoader(opts.loader);
            _context.t0 = JSON;
            _context.next = 6;
            return loader.load(spec);

          case 6:
            _context.t1 = _context.sent;
            parsedSpec = _context.t0.parse.call(_context.t0, _context.t1);
            _context.next = 11;
            break;

          case 10:
            parsedSpec = spec;

          case 11:
            usermetaLoader = embedOptionsFromUsermeta(parsedSpec).loader; // either create the loader for the first time or create a new loader if the spec has new loader options

            if (!loader || usermetaLoader) {
              loader = createLoader((_opts$loader = opts.loader) !== null && _opts$loader !== void 0 ? _opts$loader : usermetaLoader);
            }

            _context.next = 15;
            return loadOpts(embedOptionsFromUsermeta(parsedSpec), loader);

          case 15:
            usermetaOpts = _context.sent;
            _context.next = 18;
            return loadOpts(opts, loader);

          case 18:
            parsedOpts = _context.sent;
            mergedOpts = _objectSpread(_objectSpread({}, mergeDeep(parsedOpts, usermetaOpts)), {}, {
              config: mergeConfig((_parsedOpts$config = parsedOpts.config) !== null && _parsedOpts$config !== void 0 ? _parsedOpts$config : {}, (_usermetaOpts$config = usermetaOpts.config) !== null && _usermetaOpts$config !== void 0 ? _usermetaOpts$config : {})
            });
            _context.next = 22;
            return _embed(el, parsedSpec, mergedOpts, loader);

          case 22:
            return _context.abrupt("return", _context.sent);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _embed2.apply(this, arguments);
}

function loadOpts(_x3, _x4) {
  return _loadOpts.apply(this, arguments);
}

function _loadOpts() {
  _loadOpts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(opt, loader) {
    var _opt$config;

    var config, patch;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!isString(opt.config)) {
              _context2.next = 8;
              break;
            }

            _context2.t1 = JSON;
            _context2.next = 4;
            return loader.load(opt.config);

          case 4:
            _context2.t2 = _context2.sent;
            _context2.t0 = _context2.t1.parse.call(_context2.t1, _context2.t2);
            _context2.next = 9;
            break;

          case 8:
            _context2.t0 = (_opt$config = opt.config) !== null && _opt$config !== void 0 ? _opt$config : {};

          case 9:
            config = _context2.t0;

            if (!isString(opt.patch)) {
              _context2.next = 18;
              break;
            }

            _context2.t4 = JSON;
            _context2.next = 14;
            return loader.load(opt.patch);

          case 14:
            _context2.t5 = _context2.sent;
            _context2.t3 = _context2.t4.parse.call(_context2.t4, _context2.t5);
            _context2.next = 19;
            break;

          case 18:
            _context2.t3 = opt.patch;

          case 19:
            patch = _context2.t3;
            return _context2.abrupt("return", _objectSpread(_objectSpread(_objectSpread({}, opt), patch ? {
              patch
            } : {}), config ? {
              config
            } : {}));

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadOpts.apply(this, arguments);
}

function getRoot(el) {
  var possibleRoot = el.getRootNode ? el.getRootNode() : document;

  if (possibleRoot instanceof ShadowRoot) {
    return {
      root: possibleRoot,
      rootContainer: possibleRoot
    };
  } else {
    var _document$head;

    return {
      root: document,
      rootContainer: (_document$head = document.head) !== null && _document$head !== void 0 ? _document$head : document.body
    };
  }
}

function _embed(_x5, _x6) {
  return _embed3.apply(this, arguments);
}

function _embed3() {
  _embed3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(el, spec) {
    var _opts$config, _opts$actions, _opts$renderer, _opts$logLevel, _opts$downloadFileNam, _ref2, _vega$expressionInter;

    var opts,
        loader,
        config,
        actions,
        i18n,
        renderer,
        logLevel,
        downloadFileName,
        element,
        ID,
        _getRoot,
        root,
        rootContainer,
        style,
        mode,
        vgSpec,
        parsed,
        container,
        chartWrapper,
        patch,
        ast,
        runtime,
        view,
        handler,
        hover,
        _ref3,
        hoverSet,
        updateSet,
        documentClickHandler,
        wrapper,
        details,
        summary,
        ctrl,
        _loop,
        _i,
        _arr,
        viewSourceLink,
        compileLink,
        _opts$editorUrl,
        editorUrl,
        editorLink,
        finalize,
        _args4 = arguments;

    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            finalize = function _finalize() {
              if (documentClickHandler) {
                document.removeEventListener('click', documentClickHandler);
              }

              view.finalize();
            };

            opts = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
            loader = _args4.length > 3 ? _args4[3] : undefined;
            config = opts.theme ? mergeConfig(themes[opts.theme], (_opts$config = opts.config) !== null && _opts$config !== void 0 ? _opts$config : {}) : opts.config;
            actions = isBoolean(opts.actions) ? opts.actions : mergeDeep({}, DEFAULT_ACTIONS, (_opts$actions = opts.actions) !== null && _opts$actions !== void 0 ? _opts$actions : {});
            i18n = _objectSpread(_objectSpread({}, I18N), opts.i18n);
            renderer = (_opts$renderer = opts.renderer) !== null && _opts$renderer !== void 0 ? _opts$renderer : 'canvas';
            logLevel = (_opts$logLevel = opts.logLevel) !== null && _opts$logLevel !== void 0 ? _opts$logLevel : vega.Warn;
            downloadFileName = (_opts$downloadFileNam = opts.downloadFileName) !== null && _opts$downloadFileNam !== void 0 ? _opts$downloadFileNam : 'visualization';
            element = typeof el === 'string' ? document.querySelector(el) : el;

            if (element) {
              _context4.next = 12;
              break;
            }

            throw new Error("".concat(el, " does not exist"));

          case 12:
            if (opts.defaultStyle !== false) {
              // Add a default stylesheet to the head of the document.
              ID = 'vega-embed-style';
              _getRoot = getRoot(element), root = _getRoot.root, rootContainer = _getRoot.rootContainer;

              if (!root.getElementById(ID)) {
                style = document.createElement('style');
                style.id = ID;
                style.innerText = opts.defaultStyle === undefined || opts.defaultStyle === true ? (embedStyle ).toString() : opts.defaultStyle;
                rootContainer.appendChild(style);
              }
            }

            mode = guessMode(spec, opts.mode);
            vgSpec = PREPROCESSOR[mode](spec, config);

            if (mode === 'vega-lite') {
              if (vgSpec.$schema) {
                parsed = schemaParser(vgSpec.$schema);

                if (!satisfies(VERSION.vega, "^".concat(parsed.version.slice(1)))) {
                  console.warn("The compiled spec uses Vega ".concat(parsed.version, ", but current version is v").concat(VERSION.vega, "."));
                }
              }
            }

            element.classList.add('vega-embed');

            if (actions) {
              element.classList.add('has-actions');
            }

            element.innerHTML = ''; // clear container

            container = element;

            if (actions) {
              chartWrapper = document.createElement('div');
              chartWrapper.classList.add(CHART_WRAPPER_CLASS);
              element.appendChild(chartWrapper);
              container = chartWrapper;
            }

            patch = opts.patch;

            if (patch) {
              if (patch instanceof Function) {
                vgSpec = patch(vgSpec);
              } else {
                vgSpec = applyPatch(vgSpec, patch, true, false).newDocument;
              }
            } // Set locale. Note that this is a global setting.


            if (opts.formatLocale) {
              vega.formatLocale(opts.formatLocale);
            }

            if (opts.timeFormatLocale) {
              vega.timeFormatLocale(opts.timeFormatLocale);
            }

            ast = opts.ast; // Do not apply the config to Vega when we have already applied it to Vega-Lite.
            // This call may throw an Error if parsing fails.

            runtime = vega.parse(vgSpec, mode === 'vega-lite' ? {} : config, {
              ast
            });
            view = new (opts.viewClass || vega.View)(runtime, _objectSpread({
              loader,
              logLevel,
              renderer
            }, ast ? {
              expr: (_ref2 = (_vega$expressionInter = vega.expressionInterpreter) !== null && _vega$expressionInter !== void 0 ? _vega$expressionInter : opts.expr) !== null && _ref2 !== void 0 ? _ref2 : expressionInterpreter
            } : {}));
            view.addSignalListener('autosize', (_, autosize) => {
              var type = autosize.type;

              if (type == 'fit-x') {
                container.classList.add('fit-x');
                container.classList.remove('fit-y');
              } else if (type == 'fit-y') {
                container.classList.remove('fit-x');
                container.classList.add('fit-y');
              } else if (type == 'fit') {
                container.classList.add('fit-x', 'fit-y');
              } else {
                container.classList.remove('fit-x', 'fit-y');
              }
            });

            if (opts.tooltip !== false) {
              if (isTooltipHandler(opts.tooltip)) {
                handler = opts.tooltip;
              } else {
                // user provided boolean true or tooltip options
                handler = new Handler(opts.tooltip === true ? {} : opts.tooltip).call;
              }

              view.tooltip(handler);
            }

            hover = opts.hover;

            if (hover === undefined) {
              hover = mode === 'vega';
            }

            if (hover) {
              _ref3 = typeof hover === 'boolean' ? {} : hover, hoverSet = _ref3.hoverSet, updateSet = _ref3.updateSet;
              view.hover(hoverSet, updateSet);
            }

            if (opts) {
              if (opts.width != null) {
                view.width(opts.width);
              }

              if (opts.height != null) {
                view.height(opts.height);
              }

              if (opts.padding != null) {
                view.padding(opts.padding);
              }
            }

            _context4.next = 36;
            return view.initialize(container, opts.bind).runAsync();

          case 36:
            if (actions !== false) {
              wrapper = element;

              if (opts.defaultStyle !== false) {
                details = document.createElement('details');
                details.title = i18n.CLICK_TO_VIEW_ACTIONS;
                element.append(details);
                wrapper = details;
                summary = document.createElement('summary');
                summary.innerHTML = SVG_CIRCLES;
                details.append(summary);

                documentClickHandler = ev => {
                  if (!details.contains(ev.target)) {
                    details.removeAttribute('open');
                  }
                };

                document.addEventListener('click', documentClickHandler);
              }

              ctrl = document.createElement('div');
              wrapper.append(ctrl);
              ctrl.classList.add('vega-actions'); // add 'Export' action

              if (actions === true || actions.export !== false) {
                _loop = function _loop() {
                  var ext = _arr[_i];

                  if (actions === true || actions.export === true || actions.export[ext]) {
                    var i18nExportAction = i18n["".concat(ext.toUpperCase(), "_ACTION")];
                    var exportLink = document.createElement('a');
                    exportLink.text = i18nExportAction;
                    exportLink.href = '#';
                    exportLink.target = '_blank';
                    exportLink.download = "".concat(downloadFileName, ".").concat(ext); // add link on mousedown so that it's correct when the click happens

                    exportLink.addEventListener('mousedown', /*#__PURE__*/function () {
                      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(e) {
                        var url;
                        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                e.preventDefault();
                                _context3.next = 3;
                                return view.toImageURL(ext, opts.scaleFactor);

                              case 3:
                                url = _context3.sent;
                                this.href = url;

                              case 5:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, _callee3, this);
                      }));

                      return function (_x7) {
                        return _ref4.apply(this, arguments);
                      };
                    }());
                    ctrl.append(exportLink);
                  }
                };

                for (_i = 0, _arr = ['svg', 'png']; _i < _arr.length; _i++) {
                  _loop();
                }
              } // add 'View Source' action


              if (actions === true || actions.source !== false) {
                viewSourceLink = document.createElement('a');
                viewSourceLink.text = i18n.SOURCE_ACTION;
                viewSourceLink.href = '#';
                viewSourceLink.addEventListener('click', function (e) {
                  var _opts$sourceHeader, _opts$sourceFooter;

                  viewSource(stringify(spec), (_opts$sourceHeader = opts.sourceHeader) !== null && _opts$sourceHeader !== void 0 ? _opts$sourceHeader : '', (_opts$sourceFooter = opts.sourceFooter) !== null && _opts$sourceFooter !== void 0 ? _opts$sourceFooter : '', mode);
                  e.preventDefault();
                });
                ctrl.append(viewSourceLink);
              } // add 'View Compiled' action


              if (mode === 'vega-lite' && (actions === true || actions.compiled !== false)) {
                compileLink = document.createElement('a');
                compileLink.text = i18n.COMPILED_ACTION;
                compileLink.href = '#';
                compileLink.addEventListener('click', function (e) {
                  var _opts$sourceHeader2, _opts$sourceFooter2;

                  viewSource(stringify(vgSpec), (_opts$sourceHeader2 = opts.sourceHeader) !== null && _opts$sourceHeader2 !== void 0 ? _opts$sourceHeader2 : '', (_opts$sourceFooter2 = opts.sourceFooter) !== null && _opts$sourceFooter2 !== void 0 ? _opts$sourceFooter2 : '', 'vega');
                  e.preventDefault();
                });
                ctrl.append(compileLink);
              } // add 'Open in Vega Editor' action


              if (actions === true || actions.editor !== false) {
                editorUrl = (_opts$editorUrl = opts.editorUrl) !== null && _opts$editorUrl !== void 0 ? _opts$editorUrl : 'https://vega.github.io/editor/';
                editorLink = document.createElement('a');
                editorLink.text = i18n.EDITOR_ACTION;
                editorLink.href = '#';
                editorLink.addEventListener('click', function (e) {
                  post(window, editorUrl, {
                    config: config,
                    mode,
                    renderer,
                    spec: stringify(spec)
                  });
                  e.preventDefault();
                });
                ctrl.append(editorLink);
              }
            }

            return _context4.abrupt("return", {
              view,
              spec,
              vgSpec,
              finalize
            });

          case 38:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _embed3.apply(this, arguments);
}

export { DEFAULT_ACTIONS, embed as default, guessMode, vega, _vegaLite as vegaLite };
//# sourceMappingURL=vega-embed.module.js.map
