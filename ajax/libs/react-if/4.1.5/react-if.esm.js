import React, { Fragment, useRef, useState, useMemo, useEffect } from 'react';

/**
 * Renders a React component while also checking whether the children are a function or not
 * @param props Props of the component to render
 */
var render = function render(props) {
  if (typeof props.children === 'function') {
    return React.createElement(Fragment, null, props.children());
  }
  return React.createElement(Fragment, null, props.children || null);
};

/**
 * If the `<Case />` is the first one to have its condition evaluates to true
 * inside the parent `<Switch />` it will be the only rendered.
 * @param props The props to pass down to the `<Case />` component
 */
var Case = function Case(_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  return render({
    children: children
  });
};

/**
 * If no `<Case />` have its condition evaluates to true inside the parent `<Switch />`,
 * the first `<Default />` will be the only one rendered.
 * @param props The props to pass down to the `<Default />` component
 */
var Default = function Default(_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  return render({
    children: children
  });
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
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(res, rej) {
      var d;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
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
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  // Forward potential additional properties
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
  var hasRan = useRef(false);
  var lastDependencies = useRef([]);
  // Parameters type check
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
  var _useState = useState(null),
    isResolved = _useState[0],
    setIsResolved = _useState[1];
  var _useState2 = useState(null),
    returnValue = _useState2[0],
    setReturnValue = _useState2[1];
  // Make promise cancellable
  var cancellablePromise = useMemo(function () {
    return createCancellablePromise(promise);
  }, [promise]);
  var history = useRef([]); // Keep history of promises
  // Handle unmount
  useEffect(function () {
    return function () {
      if (!keepAlive) {
        cancellablePromise.cancel();
      }
    };
  }, [cancellablePromise, cancellablePromise.promise, keepAlive]);
  // Await promise
  useSingleton( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
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
    }, _callee, null, [[2, 11]]);
  })), [cancellablePromise.promise]);
  if (!children || !isThenable(promise)) {
    return null;
  }
  if (isResolved === null) {
    // Promise is pending
    var hasFallback = React.Children.toArray(children).find(function (c) {
      return c.type === Fallback;
    });
    return React.createElement(Fragment, null, hasFallback || null);
  }
  if (!isResolved) {
    // Promise is fulfilled and rejected
    var hasElse = React.Children.toArray(children).find(function (c) {
      return c.type === Else;
    });
    if (!hasElse) return React.createElement(Fragment, null, null);
    // Inject caught error
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
    return React.createElement(Fragment, null, elseElement);
  }
  // Promise is fulfilled and resolved
  var hasThen = React.Children.toArray(children).find(function (c) {
    return c.type === Then;
  });
  if (!hasThen) return React.createElement(Fragment, null, null);
  // Inject promise return value
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
  return React.createElement(Fragment, null, thenElement);
}

/**
 * Handles errors by throwing them to the console.
 * `__DEV__` is replaced by dts-cli using {@link https://www.npmjs.com/package/babel-plugin-dev-expression babel-plugin-dev-expressions}
 * which will ensure this entire throw is not present in production
 * @param condition The condition to check
 * @param message The message to throw if `condition` resolves to `true`
 */
function tinyWarning(condition, message) {
  if (process.env.NODE_ENV !== "production") {
    if (condition) {
      // check console for IE9 support which provides console
      // only with open devtools
      if (typeof console !== 'undefined') {
        console.warn(message);
      }
      // Throwing an error and catching it immediately to improve debugging
      // Users can utilize 'pause on caught exceptions' to get into this throw
      try {
        throw new Error(message);
      } catch (x) {
        // noop
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
  tinyWarning(!Array.isArray(children) && !(children.type === Else || children.type === Then) || !React.Children.toArray(children).every(function (child) {
    return child.type === Else || child.type === Then || child.type === Fallback;
  }), 'The <If> component should contain <Then /> <Else /> or <Fallback /> components as its children');
  if (isThenable(condition)) {
    return React.createElement(IfAsync, {
      promise: condition,
      keepAlive: keepAlive
    }, children);
  }
  var conditionResult = getConditionResult(condition);
  return React.createElement(Fragment, null, React.Children.toArray(children).find(function (c) {
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
  // If the children are a function then resolve it first
  if (isFunction(children)) {
    children = children();
  }
  React.Children.forEach(children, function (child) {
    // not a valid react child, don't add it
    /* istanbul ignore next - This is only a safe fail for people writing bad code */
    if (!React.isValidElement(child)) {
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
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var conditionResult = Boolean(getConditionResult(condition));
  return !conditionResult && children ? render({
    children: children
  }) : null;
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
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var conditionResult = Boolean(getConditionResult(condition));
  return conditionResult && children ? render({
    children: children
  }) : null;
};

export { Case, Default, Else, Fallback, If, Switch, Then, Unless, When };
//# sourceMappingURL=react-if.esm.js.map
