'use strict';

var React = require('react');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return n;
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

/**
 * Renders a React component while also checking whether the children are a function or not
 * @param props Props of the component to render
 */
var render = function render(props) {
  if (typeof props.children === 'function') {
    return React.createElement(React.Fragment, null, props.children());
  }
  return React.createElement(React.Fragment, null, props.children || null);
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

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return r;
  };
  var t,
    r = {},
    e = Object.prototype,
    n = e.hasOwnProperty,
    o = "function" == typeof Symbol ? Symbol : {},
    i = o.iterator || "@@iterator",
    a = o.asyncIterator || "@@asyncIterator",
    u = o.toStringTag || "@@toStringTag";
  function c(t, r, e, n) {
    return Object.defineProperty(t, r, {
      value: e,
      enumerable: !n,
      configurable: !n,
      writable: !n
    });
  }
  try {
    c({}, "");
  } catch (t) {
    c = function (t, r, e) {
      return t[r] = e;
    };
  }
  function h(r, e, n, o) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype);
    return c(a, "_invoke", function (r, e, n) {
      var o = 1;
      return function (i, a) {
        if (3 === o) throw Error("Generator is already running");
        if (4 === o) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var u = n.delegate;
          if (u) {
            var c = d(u, n);
            if (c) {
              if (c === f) continue;
              return c;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (1 === o) throw o = 4, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = 3;
          var h = s(r, e, n);
          if ("normal" === h.type) {
            if (o = n.done ? 4 : 2, h.arg === f) continue;
            return {
              value: h.arg,
              done: n.done
            };
          }
          "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg);
        }
      };
    }(r, n, new Context(o || [])), !0), a;
  }
  function s(t, r, e) {
    try {
      return {
        type: "normal",
        arg: t.call(r, e)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  r.wrap = h;
  var f = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var l = {};
  c(l, i, function () {
    return this;
  });
  var p = Object.getPrototypeOf,
    y = p && p(p(x([])));
  y && y !== e && n.call(y, i) && (l = y);
  var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l);
  function g(t) {
    ["next", "throw", "return"].forEach(function (r) {
      c(t, r, function (t) {
        return this._invoke(r, t);
      });
    });
  }
  function AsyncIterator(t, r) {
    function e(o, i, a, u) {
      var c = s(t[o], t, i);
      if ("throw" !== c.type) {
        var h = c.arg,
          f = h.value;
        return f && "object" == typeof f && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) {
          e("next", t, a, u);
        }, function (t) {
          e("throw", t, a, u);
        }) : r.resolve(f).then(function (t) {
          h.value = t, a(h);
        }, function (t) {
          return e("throw", t, a, u);
        });
      }
      u(c.arg);
    }
    var o;
    c(this, "_invoke", function (t, n) {
      function i() {
        return new r(function (r, o) {
          e(t, n, r, o);
        });
      }
      return o = o ? o.then(i, i) : i();
    }, !0);
  }
  function d(r, e) {
    var n = e.method,
      o = r.i[n];
    if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f;
    var i = s(o, r.i, e.arg);
    if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f;
    var a = i.arg;
    return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f);
  }
  function w(t) {
    this.tryEntries.push(t);
  }
  function m(r) {
    var e = r[4] || {};
    e.type = "normal", e.arg = t, r[4] = e;
  }
  function Context(t) {
    this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0);
  }
  function x(r) {
    if (null != r) {
      var e = r[i];
      if (e) return e.call(r);
      if ("function" == typeof r.next) return r;
      if (!isNaN(r.length)) {
        var o = -1,
          a = function e() {
            for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e;
            return e.value = t, e.done = !0, e;
          };
        return a.next = a;
      }
    }
    throw new TypeError(typeof r + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) {
    var r = "function" == typeof t && t.constructor;
    return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name));
  }, r.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t;
  }, r.awrap = function (t) {
    return {
      __await: t
    };
  }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () {
    return this;
  }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(h(t, e, n, o), i);
    return r.isGeneratorFunction(e) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, g(v), c(v, u, "Generator"), c(v, i, function () {
    return this;
  }), c(v, "toString", function () {
    return "[object Generator]";
  }), r.keys = function (t) {
    var r = Object(t),
      e = [];
    for (var n in r) e.unshift(n);
    return function t() {
      for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t;
      return t.done = !0, t;
    };
  }, r.values = x, Context.prototype = {
    constructor: Context,
    reset: function (r) {
      if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0][4];
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (r) {
      if (this.done) throw r;
      var e = this;
      function n(t) {
        a.type = "throw", a.arg = r, e.next = t;
      }
      for (var o = e.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i[4],
          u = this.prev,
          c = i[1],
          h = i[2];
        if (-1 === i[0]) return n("end"), !1;
        if (!c && !h) throw Error("try statement without catch or finally");
        if (null != i[0] && i[0] <= u) {
          if (u < c) return this.method = "next", this.arg = t, n(c), !0;
          if (u < h) return n(h), !1;
        }
      }
    },
    abrupt: function (t, r) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var n = this.tryEntries[e];
        if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) {
          var o = n;
          break;
        }
      }
      o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null);
      var i = o ? o[4] : {};
      return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i);
    },
    complete: function (t, r) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f;
    },
    finish: function (t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var e = this.tryEntries[r];
        if (e[2] === t) return this.complete(e[4], e[3]), m(e), f;
      }
    },
    catch: function (t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var e = this.tryEntries[r];
        if (e[0] === t) {
          var n = e[4];
          if ("throw" === n.type) {
            var o = n.arg;
            m(e);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (r, e, n) {
      return this.delegate = {
        i: x(r),
        r: e,
        n: n
      }, "next" === this.method && (this.arg = t), f;
    }
  }, r;
}

/**
 * Must contain only a single child, which it renders as-is.
 * Should not be used outside of an `<If />` block.
 * @param props The props to pass down to the `<Then />` component
 */
var Then = function Then(props) {
  return render(props);
};

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
  var wrappedPromise = new Promise(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(res, rej) {
      var d;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return promise;
          case 3:
            d = _context.sent;
            if (!isCancelled.value) {
              res(d);
            }
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            if (!isCancelled.value) {
              rej(_context.t0);
            }
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
  var hasRan = React.useRef(false);
  var lastDependencies = React.useRef([]);
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
    setReturnValue = _useState2[1];
  // Make promise cancellable
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
  }, [cancellablePromise, cancellablePromise.promise, keepAlive]);
  // Await promise
  useSingleton(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
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
    var hasFallback = React__namespace.Children.toArray(children).find(function (c) {
      return c.type === Fallback;
    });
    return React__namespace.createElement(React.Fragment, null, hasFallback || null);
  }
  if (!isResolved) {
    // Promise is fulfilled and rejected
    var hasElse = React__namespace.Children.toArray(children).find(function (c) {
      return c.type === Else;
    });
    if (!hasElse) return React__namespace.createElement(React.Fragment, null, null);
    // Inject caught error
    var elseElement = hasElse;
    var hasElseProps = hasElse.props;
    if (typeof hasElseProps.children === 'function') {
      elseElement = _extends({}, hasElse, {
        props: _extends({}, hasElseProps, {
          children: function children() {
            return hasElseProps.children(returnValue, history.current, cancellablePromise.promise);
          }
        })
      });
    }
    return React__namespace.createElement(React.Fragment, null, elseElement);
  }
  // Promise is fulfilled and resolved
  var hasThen = React__namespace.Children.toArray(children).find(function (c) {
    return c.type === Then;
  });
  if (!hasThen) return React__namespace.createElement(React.Fragment, null, null);
  // Inject promise return value
  var thenElement = hasThen;
  var hasThenProps = hasThen.props;
  if (typeof hasThenProps.children === 'function') {
    thenElement = _extends({}, hasThen, {
      props: _extends({}, hasThenProps, {
        children: function children() {
          return hasThenProps.children(returnValue, history.current, cancellablePromise.promise);
        }
      })
    });
  }
  return React__namespace.createElement(React.Fragment, null, thenElement);
}

/**
 * Resolves a condition that is {@link BooleanLike} or returns {@link BooleanLike} from a function
 * @param condition The condition to resolve
 */
var getConditionResult = function getConditionResult(condition) {
  var conditionResult = Boolean(typeof condition === 'function' ? condition() : condition);
  return conditionResult;
};

/**
 * Handles errors by throwing them to the console.
 * `__DEV__` is replaced by dts-cli using {@link https://www.npmjs.com/package/babel-plugin-dev-expression babel-plugin-dev-expressions}
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
  return React.createElement(React.Fragment, null, React.Children.toArray(children).find(function (c) {
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
  var _ref2;
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
  React__namespace.Children.forEach(children, function (child) {
    // not a valid react child, don't add it
    /* istanbul ignore next - This is only a safe fail for people writing bad code */
    if (!React__namespace.isValidElement(child)) {
      return;
    }
    if (!matchingCase && child.type === Case) {
      var childProps = child.props;
      var conditionResult = getConditionResult(childProps.condition);
      if (conditionResult) {
        matchingCase = child;
      } // else not matching condition, don't add it
    } else if (!defaultCase && child.type === Default) {
      defaultCase = child;
    } // else unknown type, don't add it
  });
  return (_ref2 = matchingCase != null ? matchingCase : defaultCase) != null ? _ref2 : null;
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
