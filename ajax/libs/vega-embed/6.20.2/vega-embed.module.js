import { applyPatch } from 'fast-json-patch';
import stringify from 'json-stringify-pretty-compact';
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

var yallist = Yallist$1;
Yallist$1.Node = Node;
Yallist$1.create = Yallist$1;

function Yallist$1(list) {
  var self = this;

  if (!(self instanceof Yallist$1)) {
    self = new Yallist$1();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self;
}

Yallist$1.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list');
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }

  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
  return next;
};

Yallist$1.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;

  if (head) {
    head.prev = node;
  }

  this.head = node;

  if (!this.tail) {
    this.tail = node;
  }

  this.length++;
};

Yallist$1.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;

  if (tail) {
    tail.next = node;
  }

  this.tail = node;

  if (!this.head) {
    this.head = node;
  }

  this.length++;
};

Yallist$1.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }

  return this.length;
};

Yallist$1.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }

  return this.length;
};

Yallist$1.prototype.pop = function () {
  if (!this.tail) {
    return undefined;
  }

  var res = this.tail.value;
  this.tail = this.tail.prev;

  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }

  this.length--;
  return res;
};

Yallist$1.prototype.shift = function () {
  if (!this.head) {
    return undefined;
  }

  var res = this.head.value;
  this.head = this.head.next;

  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }

  this.length--;
  return res;
};

Yallist$1.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist$1.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist$1.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist$1.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist$1.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();

  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }

  return res;
};

Yallist$1.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();

  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }

  return res;
};

Yallist$1.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc;
};

Yallist$1.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc;
};

Yallist$1.prototype.toArray = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }

  return arr;
};

Yallist$1.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }

  return arr;
};

Yallist$1.prototype.slice = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist$1();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }

  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist$1.prototype.sliceReverse = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist$1();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }

  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist$1.prototype.splice = function (start, deleteCount) {
  if (start > this.length) {
    start = this.length - 1;
  }

  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }

  var ret = [];

  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }

  if (walker === null) {
    walker = this.tail;
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }

  for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i++) {
    walker = insert(this, walker, i + 2 < 2 || arguments.length <= i + 2 ? undefined : arguments[i + 2]);
  }

  return ret;
};

Yallist$1.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;

  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }

  this.head = tail;
  this.tail = head;
  return this;
};

function insert(self, node, value) {
  var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);

  if (inserted.next === null) {
    self.tail = inserted;
  }

  if (inserted.prev === null) {
    self.head = inserted;
  }

  self.length++;
  return inserted;
}

function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);

  if (!self.head) {
    self.head = self.tail;
  }

  self.length++;
}

function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);

  if (!self.tail) {
    self.tail = self.head;
  }

  self.length++;
}

function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

try {
  // add if support for Symbol.iterator is present
  require('./iterator.js')(Yallist$1);
} catch (er) {}

var Yallist = yallist;
var MAX = Symbol('max');
var LENGTH = Symbol('length');
var LENGTH_CALCULATOR = Symbol('lengthCalculator');
var ALLOW_STALE = Symbol('allowStale');
var MAX_AGE = Symbol('maxAge');
var DISPOSE = Symbol('dispose');
var NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
var LRU_LIST = Symbol('lruList');
var CACHE = Symbol('cache');
var UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

var naiveLength = () => 1; // lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.


class LRUCache {
  constructor(options) {
    if (typeof options === 'number') options = {
      max: options
    };
    if (!options) options = {};
    if (options.max && (typeof options.max !== 'number' || options.max < 0)) throw new TypeError('max must be a non-negative number'); // Kind of weird to have a default max of Infinity, but oh well.

    this[MAX] = options.max || Infinity;
    var lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== 'function' ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== 'number') throw new TypeError('maxAge must be a number');
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  } // resize the cache when the max changes.


  set max(mL) {
    if (typeof mL !== 'number' || mL < 0) throw new TypeError('max must be a non-negative number');
    this[MAX] = mL || Infinity;
    trim(this);
  }

  get max() {
    return this[MAX];
  }

  set allowStale(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }

  get allowStale() {
    return this[ALLOW_STALE];
  }

  set maxAge(mA) {
    if (typeof mA !== 'number') throw new TypeError('maxAge must be a non-negative number');
    this[MAX_AGE] = mA;
    trim(this);
  }

  get maxAge() {
    return this[MAX_AGE];
  } // resize the cache when the lengthCalculator changes.


  set lengthCalculator(lC) {
    if (typeof lC !== 'function') lC = naiveLength;

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }

    trim(this);
  }

  get lengthCalculator() {
    return this[LENGTH_CALCULATOR];
  }

  get length() {
    return this[LENGTH];
  }

  get itemCount() {
    return this[LRU_LIST].length;
  }

  rforEach(fn, thisp) {
    thisp = thisp || this;

    for (var walker = this[LRU_LIST].tail; walker !== null;) {
      var prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }

  forEach(fn, thisp) {
    thisp = thisp || this;

    for (var walker = this[LRU_LIST].head; walker !== null;) {
      var next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }

  keys() {
    return this[LRU_LIST].toArray().map(k => k.key);
  }

  values() {
    return this[LRU_LIST].toArray().map(k => k.value);
  }

  reset() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
    }

    this[CACHE] = new Map(); // hash of items by key

    this[LRU_LIST] = new Yallist(); // list of items in order of use recency

    this[LENGTH] = 0; // length of items in the list
  }

  dump() {
    return this[LRU_LIST].map(hit => isStale(this, hit) ? false : {
      k: hit.key,
      v: hit.value,
      e: hit.now + (hit.maxAge || 0)
    }).toArray().filter(h => h);
  }

  dumpLru() {
    return this[LRU_LIST];
  }

  set(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];
    if (maxAge && typeof maxAge !== 'number') throw new TypeError('maxAge must be a number');
    var now = maxAge ? Date.now() : 0;
    var len = this[LENGTH_CALCULATOR](value, key);

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }

      var node = this[CACHE].get(key);
      var item = node.value; // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking

      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value);
      }

      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true;
    }

    var hit = new Entry(key, value, len, now, maxAge); // oversized objects fall out of cache automatically.

    if (hit.length > this[MAX]) {
      if (this[DISPOSE]) this[DISPOSE](key, value);
      return false;
    }

    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  }

  has(key) {
    if (!this[CACHE].has(key)) return false;
    var hit = this[CACHE].get(key).value;
    return !isStale(this, hit);
  }

  get(key) {
    return get(this, key, true);
  }

  peek(key) {
    return get(this, key, false);
  }

  pop() {
    var node = this[LRU_LIST].tail;
    if (!node) return null;
    del(this, node);
    return node.value;
  }

  del(key) {
    del(this, this[CACHE].get(key));
  }

  load(arr) {
    // reset the cache
    this.reset();
    var now = Date.now(); // A previous serialized cache has the most recent items first

    for (var l = arr.length - 1; l >= 0; l--) {
      var hit = arr[l];
      var expiresAt = hit.e || 0;
      if (expiresAt === 0) // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v);else {
        var maxAge = expiresAt - now; // dont add already expired items

        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }

  prune() {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }

}

var get = (self, key, doUse) => {
  var node = self[CACHE].get(key);

  if (node) {
    var hit = node.value;

    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE]) return undefined;
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET]) node.value.now = Date.now();
        self[LRU_LIST].unshiftNode(node);
      }
    }

    return hit.value;
  }
};

var isStale = (self, hit) => {
  if (!hit || !hit.maxAge && !self[MAX_AGE]) return false;
  var diff = Date.now() - hit.now;
  return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
};

var trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (var walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      var prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
};

var del = (self, node) => {
  if (node) {
    var hit = node.value;
    if (self[DISPOSE]) self[DISPOSE](hit.key, hit.value);
    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
};

class Entry {
  constructor(key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }

}

var forEachStep = (self, fn, node, thisp) => {
  var hit = node.value;

  if (isStale(self, hit)) {
    del(self, node);
    if (!self[ALLOW_STALE]) hit = undefined;
  }

  if (hit) fn.call(thisp, hit.value, hit.key, self);
};

var lruCache = LRUCache;

// obj with keys in a consistent order.

var opts = ['includePrerelease', 'loose', 'rtl'];

var parseOptions$3 = options => !options ? {} : typeof options !== 'object' ? {
  loose: true
} : opts.filter(k => options[k]).reduce((options, k) => {
  options[k] = true;
  return options;
}, {});

var parseOptions_1 = parseOptions$3;

var re$3 = {exports: {}};

// Not necessarily the package version of this code.

var SEMVER_SPEC_VERSION = '2.0.0';
var MAX_LENGTH$1 = 256;
var MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER ||
/* istanbul ignore next */
9007199254740991; // Max safe segment length for coercion.

var MAX_SAFE_COMPONENT_LENGTH = 16;
var constants = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH: MAX_LENGTH$1,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  MAX_SAFE_COMPONENT_LENGTH
};

var debug$3 = typeof process === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return console.error('SEMVER', ...args);
} : () => {};
var debug_1 = debug$3;

(function (module, exports) {
  var MAX_SAFE_COMPONENT_LENGTH = constants.MAX_SAFE_COMPONENT_LENGTH;
  var debug = debug_1;
  exports = module.exports = {}; // The actual regexps go on exports.re

  var re = exports.re = [];
  var src = exports.src = [];
  var t = exports.t = {};
  var R = 0;

  var createToken = (name, value, isGlobal) => {
    var index = R++;
    debug(index, value);
    t[name] = index;
    src[index] = value;
    re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
  }; // The following Regular Expressions can be used for tokenizing,
  // validating, and parsing SemVer version strings.
  // ## Numeric Identifier
  // A single `0`, or a non-zero digit followed by zero or more digits.


  createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
  createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+'); // ## Non-numeric Identifier
  // Zero or more digits, followed by a letter or hyphen, and then zero or
  // more letters, digits, or hyphens.

  createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*'); // ## Main Version
  // Three dot-separated numeric identifiers.

  createToken('MAINVERSION', "(".concat(src[t.NUMERICIDENTIFIER], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIER], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIER], ")"));
  createToken('MAINVERSIONLOOSE', "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")\\.") + "(".concat(src[t.NUMERICIDENTIFIERLOOSE], ")")); // ## Pre-release Version Identifier
  // A numeric identifier, or a non-numeric identifier.

  createToken('PRERELEASEIDENTIFIER', "(?:".concat(src[t.NUMERICIDENTIFIER], "|").concat(src[t.NONNUMERICIDENTIFIER], ")"));
  createToken('PRERELEASEIDENTIFIERLOOSE', "(?:".concat(src[t.NUMERICIDENTIFIERLOOSE], "|").concat(src[t.NONNUMERICIDENTIFIER], ")")); // ## Pre-release Version
  // Hyphen, followed by one or more dot-separated pre-release version
  // identifiers.

  createToken('PRERELEASE', "(?:-(".concat(src[t.PRERELEASEIDENTIFIER], "(?:\\.").concat(src[t.PRERELEASEIDENTIFIER], ")*))"));
  createToken('PRERELEASELOOSE', "(?:-?(".concat(src[t.PRERELEASEIDENTIFIERLOOSE], "(?:\\.").concat(src[t.PRERELEASEIDENTIFIERLOOSE], ")*))")); // ## Build Metadata Identifier
  // Any combination of digits, letters, or hyphens.

  createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+'); // ## Build Metadata
  // Plus sign, followed by one or more period-separated build metadata
  // identifiers.

  createToken('BUILD', "(?:\\+(".concat(src[t.BUILDIDENTIFIER], "(?:\\.").concat(src[t.BUILDIDENTIFIER], ")*))")); // ## Full Version String
  // A main version, followed optionally by a pre-release version and
  // build metadata.
  // Note that the only major, minor, patch, and pre-release sections of
  // the version string are capturing groups.  The build metadata is not a
  // capturing group, because it should not ever be used in version
  // comparison.

  createToken('FULLPLAIN', "v?".concat(src[t.MAINVERSION]).concat(src[t.PRERELEASE], "?").concat(src[t.BUILD], "?"));
  createToken('FULL', "^".concat(src[t.FULLPLAIN], "$")); // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
  // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
  // common in the npm registry.

  createToken('LOOSEPLAIN', "[v=\\s]*".concat(src[t.MAINVERSIONLOOSE]).concat(src[t.PRERELEASELOOSE], "?").concat(src[t.BUILD], "?"));
  createToken('LOOSE', "^".concat(src[t.LOOSEPLAIN], "$"));
  createToken('GTLT', '((?:<|>)?=?)'); // Something like "2.*" or "1.2.x".
  // Note that "x.x" is a valid xRange identifer, meaning "any version"
  // Only the first item is strictly required.

  createToken('XRANGEIDENTIFIERLOOSE', "".concat(src[t.NUMERICIDENTIFIERLOOSE], "|x|X|\\*"));
  createToken('XRANGEIDENTIFIER', "".concat(src[t.NUMERICIDENTIFIER], "|x|X|\\*"));
  createToken('XRANGEPLAIN', "[v=\\s]*(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIER], ")") + "(?:".concat(src[t.PRERELEASE], ")?").concat(src[t.BUILD], "?") + ")?)?");
  createToken('XRANGEPLAINLOOSE', "[v=\\s]*(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:\\.(".concat(src[t.XRANGEIDENTIFIERLOOSE], ")") + "(?:".concat(src[t.PRERELEASELOOSE], ")?").concat(src[t.BUILD], "?") + ")?)?");
  createToken('XRANGE', "^".concat(src[t.GTLT], "\\s*").concat(src[t.XRANGEPLAIN], "$"));
  createToken('XRANGELOOSE', "^".concat(src[t.GTLT], "\\s*").concat(src[t.XRANGEPLAINLOOSE], "$")); // Coercion.
  // Extract anything that could conceivably be a part of a valid semver

  createToken('COERCE', "".concat('(^|[^\\d])' + '(\\d{1,').concat(MAX_SAFE_COMPONENT_LENGTH, "})") + "(?:\\.(\\d{1,".concat(MAX_SAFE_COMPONENT_LENGTH, "}))?") + "(?:\\.(\\d{1,".concat(MAX_SAFE_COMPONENT_LENGTH, "}))?") + "(?:$|[^\\d])");
  createToken('COERCERTL', src[t.COERCE], true); // Tilde ranges.
  // Meaning is "reasonably at or greater than"

  createToken('LONETILDE', '(?:~>?)');
  createToken('TILDETRIM', "(\\s*)".concat(src[t.LONETILDE], "\\s+"), true);
  exports.tildeTrimReplace = '$1~';
  createToken('TILDE', "^".concat(src[t.LONETILDE]).concat(src[t.XRANGEPLAIN], "$"));
  createToken('TILDELOOSE', "^".concat(src[t.LONETILDE]).concat(src[t.XRANGEPLAINLOOSE], "$")); // Caret ranges.
  // Meaning is "at least and backwards compatible with"

  createToken('LONECARET', '(?:\\^)');
  createToken('CARETTRIM', "(\\s*)".concat(src[t.LONECARET], "\\s+"), true);
  exports.caretTrimReplace = '$1^';
  createToken('CARET', "^".concat(src[t.LONECARET]).concat(src[t.XRANGEPLAIN], "$"));
  createToken('CARETLOOSE', "^".concat(src[t.LONECARET]).concat(src[t.XRANGEPLAINLOOSE], "$")); // A simple gt/lt/eq thing, or just "" to indicate "any version"

  createToken('COMPARATORLOOSE', "^".concat(src[t.GTLT], "\\s*(").concat(src[t.LOOSEPLAIN], ")$|^$"));
  createToken('COMPARATOR', "^".concat(src[t.GTLT], "\\s*(").concat(src[t.FULLPLAIN], ")$|^$")); // An expression to strip any whitespace between the gtlt and the thing
  // it modifies, so that `> 1.2.3` ==> `>1.2.3`

  createToken('COMPARATORTRIM', "(\\s*)".concat(src[t.GTLT], "\\s*(").concat(src[t.LOOSEPLAIN], "|").concat(src[t.XRANGEPLAIN], ")"), true);
  exports.comparatorTrimReplace = '$1$2$3'; // Something like `1.2.3 - 1.2.4`
  // Note that these all use the loose form, because they'll be
  // checked against either the strict or loose comparator form
  // later.

  createToken('HYPHENRANGE', "^\\s*(".concat(src[t.XRANGEPLAIN], ")") + "\\s+-\\s+" + "(".concat(src[t.XRANGEPLAIN], ")") + "\\s*$");
  createToken('HYPHENRANGELOOSE', "^\\s*(".concat(src[t.XRANGEPLAINLOOSE], ")") + "\\s+-\\s+" + "(".concat(src[t.XRANGEPLAINLOOSE], ")") + "\\s*$"); // Star ranges basically just allow anything at all.

  createToken('STAR', '(<|>)?=?\\s*\\*'); // >=0.0.0 is like a star

  createToken('GTE0', '^\\s*>=\\s*0\.0\.0\\s*$');
  createToken('GTE0PRE', '^\\s*>=\\s*0\.0\.0-0\\s*$');
})(re$3, re$3.exports);

var numeric = /^[0-9]+$/;

var compareIdentifiers$1 = (a, b) => {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};

var rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);

var identifiers = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};

var debug$2 = debug_1;
var MAX_LENGTH = constants.MAX_LENGTH,
    MAX_SAFE_INTEGER = constants.MAX_SAFE_INTEGER;
var re$2 = re$3.exports.re,
    t$2 = re$3.exports.t;
var parseOptions$2 = parseOptions_1;
var compareIdentifiers = identifiers.compareIdentifiers;

class SemVer$3 {
  constructor(version, options) {
    options = parseOptions$2(options);

    if (version instanceof SemVer$3) {
      if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== 'string') {
      throw new TypeError("Invalid Version: ".concat(version));
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError("version is longer than ".concat(MAX_LENGTH, " characters"));
    }

    debug$2('SemVer', version, options);
    this.options = options;
    this.loose = !!options.loose; // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.

    this.includePrerelease = !!options.includePrerelease;
    var m = version.trim().match(options.loose ? re$2[t$2.LOOSE] : re$2[t$2.FULL]);

    if (!m) {
      throw new TypeError("Invalid Version: ".concat(version));
    }

    this.raw = version; // these are actually numbers

    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version');
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version');
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version');
    } // numberify any prerelease numeric ids


    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split('.').map(id => {
        if (/^[0-9]+$/.test(id)) {
          var num = +id;

          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }

        return id;
      });
    }

    this.build = m[5] ? m[5].split('.') : [];
    this.format();
  }

  format() {
    this.version = "".concat(this.major, ".").concat(this.minor, ".").concat(this.patch);

    if (this.prerelease.length) {
      this.version += "-".concat(this.prerelease.join('.'));
    }

    return this.version;
  }

  toString() {
    return this.version;
  }

  compare(other) {
    debug$2('SemVer.compare', this.version, this.options, other);

    if (!(other instanceof SemVer$3)) {
      if (typeof other === 'string' && other === this.version) {
        return 0;
      }

      other = new SemVer$3(other, this.options);
    }

    if (other.version === this.version) {
      return 0;
    }

    return this.compareMain(other) || this.comparePre(other);
  }

  compareMain(other) {
    if (!(other instanceof SemVer$3)) {
      other = new SemVer$3(other, this.options);
    }

    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }

  comparePre(other) {
    if (!(other instanceof SemVer$3)) {
      other = new SemVer$3(other, this.options);
    } // NOT having a prerelease is > having one


    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }

    var i = 0;

    do {
      var a = this.prerelease[i];
      var b = other.prerelease[i];
      debug$2('prerelease compare', i, a, b);

      if (a === undefined && b === undefined) {
        return 0;
      } else if (b === undefined) {
        return 1;
      } else if (a === undefined) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }

  compareBuild(other) {
    if (!(other instanceof SemVer$3)) {
      other = new SemVer$3(other, this.options);
    }

    var i = 0;

    do {
      var a = this.build[i];
      var b = other.build[i];
      debug$2('prerelease compare', i, a, b);

      if (a === undefined && b === undefined) {
        return 0;
      } else if (b === undefined) {
        return 1;
      } else if (a === undefined) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  } // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.


  inc(release, identifier) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc('pre', identifier);
        break;

      case 'preminor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc('pre', identifier);
        break;

      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0;
        this.inc('patch', identifier);
        this.inc('pre', identifier);
        break;
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.

      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier);
        }

        this.inc('pre', identifier);
        break;

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }

        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;

      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }

        this.patch = 0;
        this.prerelease = [];
        break;

      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++;
        }

        this.prerelease = [];
        break;
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.

      case 'pre':
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          var i = this.prerelease.length;

          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++;
              i = -2;
            }
          }

          if (i === -1) {
            // didn't increment anything
            this.prerelease.push(0);
          }
        }

        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }

        break;

      default:
        throw new Error("invalid increment argument: ".concat(release));
    }

    this.format();
    this.raw = this.version;
    return this;
  }

}

var semver = SemVer$3;

var SemVer$2 = semver;

var compare$6 = (a, b, loose) => new SemVer$2(a, loose).compare(new SemVer$2(b, loose));

var compare_1 = compare$6;

var compare$5 = compare_1;

var eq$1 = (a, b, loose) => compare$5(a, b, loose) === 0;

var eq_1 = eq$1;

var compare$4 = compare_1;

var neq$1 = (a, b, loose) => compare$4(a, b, loose) !== 0;

var neq_1 = neq$1;

var compare$3 = compare_1;

var gt$1 = (a, b, loose) => compare$3(a, b, loose) > 0;

var gt_1 = gt$1;

var compare$2 = compare_1;

var gte$1 = (a, b, loose) => compare$2(a, b, loose) >= 0;

var gte_1 = gte$1;

var compare$1 = compare_1;

var lt$1 = (a, b, loose) => compare$1(a, b, loose) < 0;

var lt_1 = lt$1;

var compare = compare_1;

var lte$1 = (a, b, loose) => compare(a, b, loose) <= 0;

var lte_1 = lte$1;

var eq = eq_1;
var neq = neq_1;
var gt = gt_1;
var gte = gte_1;
var lt = lt_1;
var lte = lte_1;

var cmp$1 = (a, op, b, loose) => {
  switch (op) {
    case '===':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      return a === b;

    case '!==':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      return a !== b;

    case '':
    case '=':
    case '==':
      return eq(a, b, loose);

    case '!=':
      return neq(a, b, loose);

    case '>':
      return gt(a, b, loose);

    case '>=':
      return gte(a, b, loose);

    case '<':
      return lt(a, b, loose);

    case '<=':
      return lte(a, b, loose);

    default:
      throw new TypeError("Invalid operator: ".concat(op));
  }
};

var cmp_1 = cmp$1;

var ANY = Symbol('SemVer ANY'); // hoisted class for cyclic dependency

class Comparator$1 {
  static get ANY() {
    return ANY;
  }

  constructor(comp, options) {
    options = parseOptions$1(options);

    if (comp instanceof Comparator$1) {
      if (comp.loose === !!options.loose) {
        return comp;
      } else {
        comp = comp.value;
      }
    }

    debug$1('comparator', comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);

    if (this.semver === ANY) {
      this.value = '';
    } else {
      this.value = this.operator + this.semver.version;
    }

    debug$1('comp', this);
  }

  parse(comp) {
    var r = this.options.loose ? re$1[t$1.COMPARATORLOOSE] : re$1[t$1.COMPARATOR];
    var m = comp.match(r);

    if (!m) {
      throw new TypeError("Invalid comparator: ".concat(comp));
    }

    this.operator = m[1] !== undefined ? m[1] : '';

    if (this.operator === '=') {
      this.operator = '';
    } // if it literally is just '>' or '' then allow anything.


    if (!m[2]) {
      this.semver = ANY;
    } else {
      this.semver = new SemVer$1(m[2], this.options.loose);
    }
  }

  toString() {
    return this.value;
  }

  test(version) {
    debug$1('Comparator.test', version, this.options.loose);

    if (this.semver === ANY || version === ANY) {
      return true;
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer$1(version, this.options);
      } catch (er) {
        return false;
      }
    }

    return cmp(version, this.operator, this.semver, this.options);
  }

  intersects(comp, options) {
    if (!(comp instanceof Comparator$1)) {
      throw new TypeError('a Comparator is required');
    }

    if (!options || typeof options !== 'object') {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }

    if (this.operator === '') {
      if (this.value === '') {
        return true;
      }

      return new Range$2(comp.value, options).test(this.value);
    } else if (comp.operator === '') {
      if (comp.value === '') {
        return true;
      }

      return new Range$2(this.value, options).test(comp.semver);
    }

    var sameDirectionIncreasing = (this.operator === '>=' || this.operator === '>') && (comp.operator === '>=' || comp.operator === '>');
    var sameDirectionDecreasing = (this.operator === '<=' || this.operator === '<') && (comp.operator === '<=' || comp.operator === '<');
    var sameSemVer = this.semver.version === comp.semver.version;
    var differentDirectionsInclusive = (this.operator === '>=' || this.operator === '<=') && (comp.operator === '>=' || comp.operator === '<=');
    var oppositeDirectionsLessThan = cmp(this.semver, '<', comp.semver, options) && (this.operator === '>=' || this.operator === '>') && (comp.operator === '<=' || comp.operator === '<');
    var oppositeDirectionsGreaterThan = cmp(this.semver, '>', comp.semver, options) && (this.operator === '<=' || this.operator === '<') && (comp.operator === '>=' || comp.operator === '>');
    return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
  }

}

var comparator = Comparator$1;
var parseOptions$1 = parseOptions_1;
var re$1 = re$3.exports.re,
    t$1 = re$3.exports.t;
var cmp = cmp_1;
var debug$1 = debug_1;
var SemVer$1 = semver;
var Range$2 = range;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

class Range$1 {
  constructor(range, options) {
    options = parseOptions(options);

    if (range instanceof Range$1) {
      if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
        return range;
      } else {
        return new Range$1(range.raw, options);
      }
    }

    if (range instanceof Comparator) {
      // just put it in the set and return
      this.raw = range.value;
      this.set = [[range]];
      this.format();
      return this;
    }

    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease; // First, split based on boolean or ||

    this.raw = range;
    this.set = range.split(/\s*\|\|\s*/) // map the range to a 2d array of comparators
    .map(range => this.parseRange(range.trim())) // throw out any comparator lists that are empty
    // this generally means that it was not a valid range, which is allowed
    // in loose mode, but will still throw if the WHOLE range is invalid.
    .filter(c => c.length);

    if (!this.set.length) {
      throw new TypeError("Invalid SemVer Range: ".concat(range));
    } // if we have any that are not the null set, throw out null sets.


    if (this.set.length > 1) {
      // keep the first one, in case they're all null sets
      var first = this.set[0];
      this.set = this.set.filter(c => !isNullSet(c[0]));
      if (this.set.length === 0) this.set = [first];else if (this.set.length > 1) {
        // if we have any that are *, then the range is just *
        var _iterator = _createForOfIteratorHelper(this.set),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var c = _step.value;

            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }

    this.format();
  }

  format() {
    this.range = this.set.map(comps => {
      return comps.join(' ').trim();
    }).join('||').trim();
    return this.range;
  }

  toString() {
    return this.range;
  }

  parseRange(range) {
    range = range.trim(); // memoize range parsing for performance.
    // this is a very hot path, and fully deterministic.

    var memoOpts = Object.keys(this.options).join(',');
    var memoKey = "parseRange:".concat(memoOpts, ":").concat(range);
    var cached = cache.get(memoKey);
    if (cached) return cached;
    var loose = this.options.loose; // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`

    var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
    range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
    debug('hyphen replace', range); // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`

    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
    debug('comparator trim', range, re[t.COMPARATORTRIM]); // `~ 1.2.3` => `~1.2.3`

    range = range.replace(re[t.TILDETRIM], tildeTrimReplace); // `^ 1.2.3` => `^1.2.3`

    range = range.replace(re[t.CARETTRIM], caretTrimReplace); // normalize spaces

    range = range.split(/\s+/).join(' '); // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    var rangeList = range.split(' ').map(comp => parseComparator(comp, this.options)).join(' ').split(/\s+/) // >=0.0.0 is equivalent to *
    .map(comp => replaceGTE0(comp, this.options)) // in loose mode, throw out any that are not valid comparators
    .filter(this.options.loose ? comp => !!comp.match(compRe) : () => true).map(comp => new Comparator(comp, this.options)); // if any comparators are the null set, then replace with JUST null set
    // if more than one comparator, remove any * comparators
    // also, don't include the same comparator more than once

    rangeList.length;
    var rangeMap = new Map();

    var _iterator2 = _createForOfIteratorHelper(rangeList),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var comp = _step2.value;
        if (isNullSet(comp)) return [comp];
        rangeMap.set(comp.value, comp);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    if (rangeMap.size > 1 && rangeMap.has('')) rangeMap.delete('');
    var result = [...rangeMap.values()];
    cache.set(memoKey, result);
    return result;
  }

  intersects(range, options) {
    if (!(range instanceof Range$1)) {
      throw new TypeError('a Range is required');
    }

    return this.set.some(thisComparators => {
      return isSatisfiable(thisComparators, options) && range.set.some(rangeComparators => {
        return isSatisfiable(rangeComparators, options) && thisComparators.every(thisComparator => {
          return rangeComparators.every(rangeComparator => {
            return thisComparator.intersects(rangeComparator, options);
          });
        });
      });
    });
  } // if ANY of the sets match ALL of its comparators, then pass


  test(version) {
    if (!version) {
      return false;
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options);
      } catch (er) {
        return false;
      }
    }

    for (var i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true;
      }
    }

    return false;
  }

}

var range = Range$1;
var LRU = lruCache;
var cache = new LRU({
  max: 1000
});
var parseOptions = parseOptions_1;
var Comparator = comparator;
var debug = debug_1;
var SemVer = semver;
var re = re$3.exports.re,
    t = re$3.exports.t,
    comparatorTrimReplace = re$3.exports.comparatorTrimReplace,
    tildeTrimReplace = re$3.exports.tildeTrimReplace,
    caretTrimReplace = re$3.exports.caretTrimReplace;

var isNullSet = c => c.value === '<0.0.0-0';

var isAny = c => c.value === ''; // take a set of comparators and determine whether there
// exists a version which can satisfy it


var isSatisfiable = (comparators, options) => {
  var result = true;
  var remainingComparators = comparators.slice();
  var testComparator = remainingComparators.pop();

  while (result && remainingComparators.length) {
    result = remainingComparators.every(otherComparator => {
      return testComparator.intersects(otherComparator, options);
    });
    testComparator = remainingComparators.pop();
  }

  return result;
}; // comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.


var parseComparator = (comp, options) => {
  debug('comp', comp, options);
  comp = replaceCarets(comp, options);
  debug('caret', comp);
  comp = replaceTildes(comp, options);
  debug('tildes', comp);
  comp = replaceXRanges(comp, options);
  debug('xrange', comp);
  comp = replaceStars(comp, options);
  debug('stars', comp);
  return comp;
};

var isX = id => !id || id.toLowerCase() === 'x' || id === '*'; // ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0


var replaceTildes = (comp, options) => comp.trim().split(/\s+/).map(comp => {
  return replaceTilde(comp, options);
}).join(' ');

var replaceTilde = (comp, options) => {
  var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('tilde', comp, _, M, m, p, pr);
    var ret;

    if (isX(M)) {
      ret = '';
    } else if (isX(m)) {
      ret = ">=".concat(M, ".0.0 <").concat(+M + 1, ".0.0-0");
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0-0
      ret = ">=".concat(M, ".").concat(m, ".0 <").concat(M, ".").concat(+m + 1, ".0-0");
    } else if (pr) {
      debug('replaceTilde pr', pr);
      ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0-0
      ret = ">=".concat(M, ".").concat(m, ".").concat(p, " <").concat(M, ".").concat(+m + 1, ".0-0");
    }

    debug('tilde return', ret);
    return ret;
  });
}; // ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0


var replaceCarets = (comp, options) => comp.trim().split(/\s+/).map(comp => {
  return replaceCaret(comp, options);
}).join(' ');

var replaceCaret = (comp, options) => {
  debug('caret', comp, options);
  var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
  var z = options.includePrerelease ? '-0' : '';
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('caret', comp, _, M, m, p, pr);
    var ret;

    if (isX(M)) {
      ret = '';
    } else if (isX(m)) {
      ret = ">=".concat(M, ".0.0").concat(z, " <").concat(+M + 1, ".0.0-0");
    } else if (isX(p)) {
      if (M === '0') {
        ret = ">=".concat(M, ".").concat(m, ".0").concat(z, " <").concat(M, ".").concat(+m + 1, ".0-0");
      } else {
        ret = ">=".concat(M, ".").concat(m, ".0").concat(z, " <").concat(+M + 1, ".0.0-0");
      }
    } else if (pr) {
      debug('replaceCaret pr', pr);

      if (M === '0') {
        if (m === '0') {
          ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(m, ".").concat(+p + 1, "-0");
        } else {
          ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
        }
      } else {
        ret = ">=".concat(M, ".").concat(m, ".").concat(p, "-").concat(pr, " <").concat(+M + 1, ".0.0-0");
      }
    } else {
      debug('no pr');

      if (M === '0') {
        if (m === '0') {
          ret = ">=".concat(M, ".").concat(m, ".").concat(p).concat(z, " <").concat(M, ".").concat(m, ".").concat(+p + 1, "-0");
        } else {
          ret = ">=".concat(M, ".").concat(m, ".").concat(p).concat(z, " <").concat(M, ".").concat(+m + 1, ".0-0");
        }
      } else {
        ret = ">=".concat(M, ".").concat(m, ".").concat(p, " <").concat(+M + 1, ".0.0-0");
      }
    }

    debug('caret return', ret);
    return ret;
  });
};

var replaceXRanges = (comp, options) => {
  debug('replaceXRanges', comp, options);
  return comp.split(/\s+/).map(comp => {
    return replaceXRange(comp, options);
  }).join(' ');
};

var replaceXRange = (comp, options) => {
  comp = comp.trim();
  var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX) {
      gtlt = '';
    } // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value


    pr = options.includePrerelease ? '-0' : '';

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0';
      } else {
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0;
      }

      p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        gtlt = '>=';

        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';

        if (xm) {
          M = +M + 1;
        } else {
          m = +m + 1;
        }
      }

      if (gtlt === '<') pr = '-0';
      ret = "".concat(gtlt + M, ".").concat(m, ".").concat(p).concat(pr);
    } else if (xm) {
      ret = ">=".concat(M, ".0.0").concat(pr, " <").concat(+M + 1, ".0.0-0");
    } else if (xp) {
      ret = ">=".concat(M, ".").concat(m, ".0").concat(pr, " <").concat(M, ".").concat(+m + 1, ".0-0");
    }

    debug('xRange return', ret);
    return ret;
  });
}; // Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.


var replaceStars = (comp, options) => {
  debug('replaceStars', comp, options); // Looseness is ignored here.  star is always as loose as it gets!

  return comp.trim().replace(re[t.STAR], '');
};

var replaceGTE0 = (comp, options) => {
  debug('replaceGTE0', comp, options);
  return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
}; // This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0


var hyphenReplace = incPr => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
  if (isX(fM)) {
    from = '';
  } else if (isX(fm)) {
    from = ">=".concat(fM, ".0.0").concat(incPr ? '-0' : '');
  } else if (isX(fp)) {
    from = ">=".concat(fM, ".").concat(fm, ".0").concat(incPr ? '-0' : '');
  } else if (fpr) {
    from = ">=".concat(from);
  } else {
    from = ">=".concat(from).concat(incPr ? '-0' : '');
  }

  if (isX(tM)) {
    to = '';
  } else if (isX(tm)) {
    to = "<".concat(+tM + 1, ".0.0-0");
  } else if (isX(tp)) {
    to = "<".concat(tM, ".").concat(+tm + 1, ".0-0");
  } else if (tpr) {
    to = "<=".concat(tM, ".").concat(tm, ".").concat(tp, "-").concat(tpr);
  } else if (incPr) {
    to = "<".concat(tM, ".").concat(tm, ".").concat(+tp + 1, "-0");
  } else {
    to = "<=".concat(to);
  }

  return "".concat(from, " ").concat(to).trim();
};

var testSet = (set, version, options) => {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false;
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (var _i = 0; _i < set.length; _i++) {
      debug(set[_i].semver);

      if (set[_i].semver === Comparator.ANY) {
        continue;
      }

      if (set[_i].semver.prerelease.length > 0) {
        var allowed = set[_i].semver;

        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
          return true;
        }
      }
    } // Version has a -pre, but it's not one of the ones we like.


    return false;
  }

  return true;
};

var Range = range;

var satisfies = (version, range, options) => {
  try {
    range = new Range(range, options);
  } catch (er) {
    return false;
  }

  return range.test(version);
};

var satisfies_1 = satisfies;

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
var embedStyle = ".vega-embed {\n  position: relative;\n  display: inline-block;\n  box-sizing: border-box;\n}\n.vega-embed.has-actions {\n  padding-right: 38px;\n}\n.vega-embed details:not([open]) > :not(summary) {\n  display: none !important;\n}\n.vega-embed summary {\n  list-style: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 6px;\n  z-index: 1000;\n  background: white;\n  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);\n  color: #1b1e23;\n  border: 1px solid #aaa;\n  border-radius: 999px;\n  opacity: 0.2;\n  transition: opacity 0.4s ease-in;\n  outline: none;\n  cursor: pointer;\n  line-height: 0px;\n}\n.vega-embed summary::-webkit-details-marker {\n  display: none;\n}\n.vega-embed summary:active {\n  box-shadow: #aaa 0px 0px 0px 1px inset;\n}\n.vega-embed summary svg {\n  width: 14px;\n  height: 14px;\n}\n.vega-embed details[open] summary {\n  opacity: 0.7;\n}\n.vega-embed:hover summary, .vega-embed:focus summary {\n  opacity: 1 !important;\n  transition: opacity 0.2s ease;\n}\n.vega-embed .vega-actions {\n  position: absolute;\n  z-index: 1001;\n  top: 35px;\n  right: -9px;\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 8px;\n  padding-top: 8px;\n  border-radius: 4px;\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);\n  border: 1px solid #d9d9d9;\n  background: white;\n  animation-duration: 0.15s;\n  animation-name: scale-in;\n  animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);\n  text-align: left;\n}\n.vega-embed .vega-actions a {\n  padding: 8px 16px;\n  font-family: sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  white-space: nowrap;\n  color: #434a56;\n  text-decoration: none;\n}\n.vega-embed .vega-actions a:hover {\n  background-color: #f7f7f9;\n  color: black;\n}\n.vega-embed .vega-actions::before, .vega-embed .vega-actions::after {\n  content: \"\";\n  display: inline-block;\n  position: absolute;\n}\n.vega-embed .vega-actions::before {\n  left: auto;\n  right: 14px;\n  top: -16px;\n  border: 8px solid #0000;\n  border-bottom-color: #d9d9d9;\n}\n.vega-embed .vega-actions::after {\n  left: auto;\n  right: 15px;\n  top: -14px;\n  border: 7px solid #0000;\n  border-bottom-color: #fff;\n}\n.vega-embed .chart-wrapper.fit-x {\n  width: 100%;\n}\n.vega-embed .chart-wrapper.fit-y {\n  height: 100%;\n}\n\n.vega-embed-wrapper {\n  max-width: 100%;\n  overflow: auto;\n  padding-right: 14px;\n}\n\n@keyframes scale-in {\n  from {\n    opacity: 0;\n    transform: scale(0.6);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n";

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

var name = "vega-embed";
var version$1 = "6.20.2";
var description = "Publish Vega visualizations as embedded web components.";
var keywords = ["vega", "data", "visualization", "component", "embed"];
var repository = {
  type: "git",
  url: "http://github.com/vega/vega-embed.git"
};
var author = {
  name: "UW Interactive Data Lab",
  url: "http://idl.cs.washington.edu"
};
var contributors = [{
  name: "Dominik Moritz",
  url: "https://www.domoritz.de"
}];
var bugs = {
  url: "https://github.com/vega/vega-embed/issues"
};
var homepage = "https://github.com/vega/vega-embed#readme";
var license = "BSD-3-Clause";
var main = "build/vega-embed.js";
var module = "build/vega-embed.module.js";
var unpkg = "build/vega-embed.min.js";
var jsdelivr = "build/vega-embed.min.js";
var types = "build/vega-embed.module.d.ts";
var files = ["src", "build", "build-es5"];
var devDependencies = {
  "@auto-it/conventional-commits": "^10.32.2",
  "@auto-it/first-time-contributor": "^10.32.2",
  "@rollup/plugin-commonjs": "21.0.1",
  "@rollup/plugin-json": "^4.1.0",
  "@rollup/plugin-node-resolve": "^13.0.6",
  "@types/semver": "^7.3.9",
  "rollup-plugin-ts": "^1.4.7",
  auto: "^10.32.2",
  "browser-sync": "^2.27.7",
  concurrently: "^6.4.0",
  "del-cli": "^4.0.1",
  "jest-canvas-mock": "^2.3.1",
  sass: "^1.43.4",
  "rollup-plugin-bundle-size": "^1.0.3",
  "rollup-plugin-terser": "^7.0.2",
  rollup: "2.60.0",
  typescript: "^4.4.4",
  "vega-lite-dev-config": "^0.20.0",
  "vega-lite": "^5.0.0",
  vega: "^5.21.0"
};
var peerDependencies = {
  vega: "^5.20.2",
  "vega-lite": "*"
};
var dependencies = {
  "fast-json-patch": "^3.1.0",
  "json-stringify-pretty-compact": "^3.0.0",
  semver: "^7.3.5",
  tslib: "^2.3.1",
  "vega-interpreter": "^1.0.4",
  "vega-schema-url-parser": "^2.2.0",
  "vega-themes": "^2.10.0",
  "vega-tooltip": "^0.27.0"
};
var scripts = {
  prebuild: "yarn clean && yarn build:style",
  build: "rollup -c",
  "build:style": "./build-style.sh",
  clean: "del-cli build build-es5 src/style.ts",
  prepublishOnly: "yarn clean && yarn build",
  preversion: "yarn lint && yarn test",
  serve: "browser-sync start --directory -s -f build *.html",
  start: "yarn build && concurrently --kill-others -n Server,Rollup 'yarn serve' 'rollup -c -w'",
  pretest: "yarn build:style",
  test: "beemo jest --stdio stream",
  "test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand",
  prepare: "beemo create-config",
  prettierbase: "beemo prettier '*.{css,scss,html}'",
  eslintbase: "beemo eslint .",
  format: "yarn eslintbase --fix && yarn prettierbase --write",
  lint: "yarn eslintbase && yarn prettierbase --check",
  release: "auto shipit"
};
var pkg = {
  name: name,
  version: version$1,
  description: description,
  keywords: keywords,
  repository: repository,
  author: author,
  contributors: contributors,
  bugs: bugs,
  homepage: homepage,
  license: license,
  main: main,
  module: module,
  unpkg: unpkg,
  jsdelivr: jsdelivr,
  types: types,
  files: files,
  devDependencies: devDependencies,
  peerDependencies: peerDependencies,
  dependencies: dependencies,
  scripts: scripts
};

var _w$vl;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var version = pkg.version;
var vega = vegaImport;
var _vegaLite = vegaLiteImport; // For backwards compatibility with Vega-Lite before v4.
var w = typeof window !== 'undefined' ? window : undefined;

if (_vegaLite === undefined && w !== null && w !== void 0 && (_w$vl = w.vl) !== null && _w$vl !== void 0 && _w$vl.compile) {
  _vegaLite = w.vl;
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

    if (!satisfies_1(VERSION[mode], "^".concat(parsed.version.slice(1)))) {
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

  return (_ref = parsedSpec.usermeta && parsedSpec.usermeta.embedOptions) !== null && _ref !== void 0 ? _ref : {};
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
  var _document$head;

  var possibleRoot = el.getRootNode ? el.getRootNode() : document;
  return possibleRoot instanceof ShadowRoot ? {
    root: possibleRoot,
    rootContainer: possibleRoot
  } : {
    root: document,
    rootContainer: (_document$head = document.head) !== null && _document$head !== void 0 ? _document$head : document.body
  };
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

                if (!satisfies_1(VERSION.vega, "^".concat(parsed.version.slice(1)))) {
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
              vgSpec = patch instanceof Function ? patch(vgSpec) : applyPatch(vgSpec, patch, true, false).newDocument;
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
              handler = isTooltipHandler(opts.tooltip) ? opts.tooltip : // user provided boolean true or tooltip options
              new Handler(opts.tooltip === true ? {} : opts.tooltip).call;
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

export { DEFAULT_ACTIONS, embed as default, guessMode, vega, _vegaLite as vegaLite, version };
//# sourceMappingURL=vega-embed.module.js.map
