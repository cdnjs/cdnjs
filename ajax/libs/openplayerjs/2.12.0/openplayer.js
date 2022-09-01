(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["OpenPlayer"] = factory();
	else
		root["OpenPlayer"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 228:
/***/ ((module) => {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 858:
/***/ ((module) => {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 506:
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 575:
/***/ ((module) => {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 913:
/***/ ((module) => {

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
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 713:
/***/ ((module) => {

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

module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 754:
/***/ ((module) => {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 205:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(489);

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
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 884:
/***/ ((module) => {

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

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

module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 521:
/***/ ((module) => {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 585:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(8)["default"]);

var assertThisInitialized = __webpack_require__(506);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 591:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(8)["default"]);

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
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
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
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
    }(innerFn, self, context), generator;
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
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
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

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

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
          for (; ++i < iterable.length;) {
            if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
          }

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

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
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
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
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
    abrupt: function abrupt(type, arg) {
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
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
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
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 489:
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 38:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithHoles = __webpack_require__(858);

var iterableToArrayLimit = __webpack_require__(884);

var unsupportedIterableToArray = __webpack_require__(379);

var nonIterableRest = __webpack_require__(521);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 8:
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(228);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 757:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(591)();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ player)
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(713);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(8);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(575);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(913);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(757);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(38);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);
;// CONCATENATED MODULE: ./src/js/utils/constants.ts
var NAV = typeof window !== 'undefined' ? window.navigator : null;
var UA = NAV ? NAV.userAgent.toLowerCase() : null;
var IS_IPAD = UA ? /ipad/i.test(UA) && !window.MSStream : false;
var IS_IPHONE = UA ? /iphone/i.test(UA) && !window.MSStream : false;
var IS_IPOD = UA ? /ipod/i.test(UA) && !window.MSStream : false;
var IS_IOS = UA ? /ipad|iphone|ipod/i.test(UA) && !window.MSStream : false;
var IS_ANDROID = UA ? /android/i.test(UA) : false;
var IS_EDGE = NAV ? 'msLaunchUri' in NAV && !('documentMode' in document) : false;
var IS_CHROME = UA ? /chrome/i.test(UA) : false;
var IS_FIREFOX = UA ? /firefox/i.test(UA) : false;
var IS_SAFARI = UA ? /safari/i.test(UA) && !IS_CHROME : false;
var IS_STOCK_ANDROID = UA ? /^mozilla\/\d+\.\d+\s\(linux;\su;/i.test(UA) : false;
var HAS_MSE = typeof window !== 'undefined' ? 'MediaSource' in window : false;
var SUPPORTS_HLS = function SUPPORTS_HLS() {
  if (typeof window === 'undefined') {
    return false;
  }

  var mediaSource = window.MediaSource || window.WebKitMediaSource;
  var sourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer;
  var isTypeSupported = mediaSource && typeof mediaSource.isTypeSupported === 'function' && mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  var sourceBufferValidAPI = !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
  return !!isTypeSupported && !!sourceBufferValidAPI && !IS_SAFARI;
};
var DVR_THRESHOLD = 120;
var EVENT_OPTIONS = {
  passive: false
};
;// CONCATENATED MODULE: ./src/js/utils/general.ts

function getAbsoluteUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.href;
}
function isVideo(element) {
  return element.tagName.toLowerCase() === 'video';
}
function isAudio(element) {
  return element.tagName.toLowerCase() === 'audio';
}
function loadScript(url) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = url;
    script.async = true;

    script.onload = function () {
      script.remove();
      resolve();
    };

    script.onerror = function () {
      script.remove();
      reject(new Error("".concat(url, " could not be loaded")));
    };

    if (document.head) {
      document.head.appendChild(script);
    }
  });
}
function offset(el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft),
    top: rect.top + (window.pageYOffset || document.documentElement.scrollTop)
  };
}
function sanitize(html) {
  var plainText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var parser = new DOMParser();
  var content = parser.parseFromString(html, 'text/html');
  var formattedContent = content.body || document.createElement('body');
  var scripts = formattedContent.querySelectorAll('script');

  for (var i = 0, total = scripts.length; i < total; i++) {
    scripts[i].remove();
  }

  var clean = function clean(element) {
    var nodes = element.children;

    for (var _i = 0, _total = nodes.length; _i < _total; _i++) {
      var node = nodes[_i];
      var attributes = node.attributes;

      for (var j = 0, t = attributes.length; j < t; j++) {
        var _attributes$j = attributes[j],
            name = _attributes$j.name,
            value = _attributes$j.value;
        var val = value.replace(/\s+/g, '').toLowerCase();

        if (['src', 'href', 'xlink:href'].includes(name)) {
          if (val.includes('javascript:') || val.includes('data:')) {
            node.removeAttribute(name);
          }
        }

        if (name.startsWith('on')) {
          node.removeAttribute(name);
        }
      }

      clean(node);
    }
  };

  clean(formattedContent);
  return plainText ? (formattedContent.textContent || '').replace(/\s{2,}/g, '') : formattedContent.innerHTML;
}
function isXml(input) {
  var parsedXml;

  if (typeof DOMParser !== 'undefined') {
    parsedXml = function parsedXml(text) {
      return new DOMParser().parseFromString(text, 'text/xml');
    };
  } else {
    return false;
  }

  try {
    var response = parsedXml(input);

    if (response.getElementsByTagName('parsererror').length > 0) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}
function isJson(item) {
  item = typeof item !== 'string' ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof_default()(item) === 'object' && item !== null) {
    return true;
  }

  return false;
}
function addEvent(event, details) {
  var detail = {};

  if (details && details.detail) {
    detail = {
      detail: details.detail
    };
  }

  return new CustomEvent(event, detail);
}
;// CONCATENATED MODULE: ./src/js/utils/time.ts
function formatTime(seconds, frameRate) {
  var f = Math.floor(seconds % 1 * (frameRate || 0));
  var s = Math.floor(seconds);
  var m = Math.floor(s / 60);
  var h = Math.floor(m / 60);

  var wrap = function wrap(value) {
    var formattedVal = value.toString();

    if (value < 10) {
      if (value <= 0) {
        return '00';
      }

      return "0".concat(formattedVal);
    }

    return formattedVal;
  };

  m %= 60;
  s %= 60;
  return "".concat(h > 0 ? "".concat(wrap(h), ":") : '').concat(wrap(m), ":").concat(wrap(s)).concat(f ? ":".concat(wrap(f)) : '');
}
function timeToSeconds(timeCode) {
  var time = timeCode.replace(/;/g, ':').split(':');
  var seconds = 0;

  if (time.length === 3) {
    seconds += parseFloat(time[0]) * 60 * 60;
    seconds += parseFloat(time[1]) * 60;
    seconds += parseFloat(time[2]);
  } else {
    seconds += parseFloat(time[0]) * 60;
    seconds += parseFloat(time[1]);
  }

  return seconds;
}
;// CONCATENATED MODULE: ./src/js/controls/captions.ts




var __classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var __classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Captions_player, _Captions_button, _Captions_captions, _Captions_menu, _Captions_events, _Captions_langTracks, _Captions_mediaTrackList, _Captions_trackUrlList, _Captions_hasTracks, _Captions_currentTrack, _Captions_default, _Captions_controlPosition, _Captions_controlLayer;





var Captions = function () {
  function Captions(player, position, layer) {
    classCallCheck_default()(this, Captions);

    _Captions_player.set(this, void 0);

    _Captions_button.set(this, void 0);

    _Captions_captions.set(this, void 0);

    _Captions_menu.set(this, void 0);

    _Captions_events.set(this, {
      button: {},
      global: {},
      media: {}
    });

    _Captions_langTracks.set(this, {});

    _Captions_mediaTrackList.set(this, void 0);

    _Captions_trackUrlList.set(this, {});

    _Captions_hasTracks.set(this, void 0);

    _Captions_currentTrack.set(this, void 0);

    _Captions_default.set(this, 'off');

    _Captions_controlPosition.set(this, void 0);

    _Captions_controlLayer.set(this, void 0);

    __classPrivateFieldSet(this, _Captions_player, player, "f");

    __classPrivateFieldSet(this, _Captions_controlPosition, position, "f");

    __classPrivateFieldSet(this, _Captions_controlLayer, layer, "f");

    this._getCuesFromText = this._getCuesFromText.bind(this);
    this._getNativeCues = this._getNativeCues.bind(this);
    this._displayCaptions = this._displayCaptions.bind(this);
    this._hideCaptions = this._hideCaptions.bind(this);
    this._search = this._search.bind(this);
    this._prepareTrack = this._prepareTrack.bind(this);
    this._formatMenuItems = this._formatMenuItems.bind(this);
  }

  createClass_default()(Captions, [{
    key: "create",
    value: function create() {
      var _this = this;

      var trackList = __classPrivateFieldGet(this, _Captions_player, "f").getElement().textTracks;

      var tracks = [];

      for (var i = 0, total = trackList.length; i < total; i++) {
        var selector = ["track[kind=\"subtitles\"][srclang=\"".concat(trackList[i].language, "\"][label=\"").concat(trackList[i].label, "\"]"), "track[kind=\"captions\"][srclang=\"".concat(trackList[i].language, "\"][label=\"").concat(trackList[i].label, "\"]")];

        var tag = __classPrivateFieldGet(this, _Captions_player, "f").getElement().querySelector(selector.join(', '));

        if (tag) {
          tracks.push(trackList[i]);
        }
      }

      if (!tracks.length) {
        for (var _i = 0, _total = trackList.length; _i < _total; _i++) {
          tracks.push(trackList[_i]);
        }
      }

      __classPrivateFieldSet(this, _Captions_mediaTrackList, tracks, "f");

      __classPrivateFieldSet(this, _Captions_hasTracks, !!__classPrivateFieldGet(this, _Captions_mediaTrackList, "f").length, "f");

      if (!__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
        return;
      }

      var _classPrivateFieldGe = __classPrivateFieldGet(this, _Captions_player, "f").getOptions(),
          labels = _classPrivateFieldGe.labels,
          detachMenus = _classPrivateFieldGe.detachMenus;

      __classPrivateFieldSet(this, _Captions_button, document.createElement('button'), "f");

      __classPrivateFieldGet(this, _Captions_button, "f").className = "op-controls__captions op-control__".concat(__classPrivateFieldGet(this, _Captions_controlPosition, "f"));
      __classPrivateFieldGet(this, _Captions_button, "f").tabIndex = 0;
      __classPrivateFieldGet(this, _Captions_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.toggleCaptions) || '';

      __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Captions_player, "f").id);

      __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-pressed', 'false');

      __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.toggleCaptions) || '');

      __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', 'off');

      if (detachMenus) {
        __classPrivateFieldGet(this, _Captions_button, "f").classList.add('op-control--no-hover');

        __classPrivateFieldSet(this, _Captions_menu, document.createElement('div'), "f");

        __classPrivateFieldGet(this, _Captions_menu, "f").className = 'op-settings op-captions__menu';

        __classPrivateFieldGet(this, _Captions_menu, "f").setAttribute('aria-hidden', 'true');

        __classPrivateFieldGet(this, _Captions_menu, "f").innerHTML = "<div class=\"op-settings__menu\" role=\"menu\" id=\"menu-item-captions\">\n                <div class=\"op-settings__submenu-item\" tabindex=\"0\" role=\"menuitemradio\" aria-checked=\"".concat(__classPrivateFieldGet(this, _Captions_default, "f") === 'off' ? 'true' : 'false', "\">\n                    <div class=\"op-settings__submenu-label op-subtitles__option\" data-value=\"captions-off\">").concat(labels === null || labels === void 0 ? void 0 : labels.off, "</div>\n                </div>\n            </div>");
      }

      var _loop = function _loop(i, trackItems, total) {
        var element = trackItems[i];

        if (element.kind === 'subtitles' || element.kind === 'captions') {
          if (element.default) {
            __classPrivateFieldSet(_this, _Captions_default, element.srclang, "f");

            __classPrivateFieldGet(_this, _Captions_button, "f").setAttribute('data-active-captions', element.srclang);
          }

          var trackUrl = getAbsoluteUrl(element.src);

          var currTrack = __classPrivateFieldGet(_this, _Captions_mediaTrackList, "f")[i];

          if (currTrack && currTrack.language === element.srclang) {
            if (currTrack.cues && currTrack.cues.length > 0) {
              __classPrivateFieldGet(_this, _Captions_langTracks, "f")[element.srclang] = _this._getNativeCues(__classPrivateFieldGet(_this, _Captions_mediaTrackList, "f")[i]);

              _this._prepareTrack(i, element.srclang, trackUrl, element.default || false);
            } else {
              fetch(trackUrl).then(function (response) {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }

                return response.text();
              }).then(function (d) {
                __classPrivateFieldGet(_this, _Captions_langTracks, "f")[element.srclang] = _this._getCuesFromText(d);

                _this._prepareTrack(i, element.srclang, trackUrl, element.default || false);

                var selector = ".op-subtitles__option[data-value=\"captions-".concat(__classPrivateFieldGet(_this, _Captions_mediaTrackList, "f")[i].language, "\"]");

                if (__classPrivateFieldGet(_this, _Captions_menu, "f") && !__classPrivateFieldGet(_this, _Captions_menu, "f").querySelector(selector)) {
                  var item = document.createElement('div');
                  var label = (labels === null || labels === void 0 ? void 0 : labels.lang) ? labels.lang[__classPrivateFieldGet(_this, _Captions_mediaTrackList, "f")[i].language] : null;
                  item.className = 'op-settings__submenu-item';
                  item.tabIndex = 0;
                  item.setAttribute('role', 'menuitemradio');
                  item.setAttribute('aria-checked', __classPrivateFieldGet(_this, _Captions_default, "f") === __classPrivateFieldGet(_this, _Captions_mediaTrackList, "f")[i].language ? 'true' : 'false');
                  item.innerHTML = "<div class=\"op-settings__submenu-label op-subtitles__option\"\n                                        data-value=\"captions-".concat(__classPrivateFieldGet(_this, _Captions_mediaTrackList, "f")[i].language, "\">\n                                        ").concat(label || __classPrivateFieldGet(_this, _Captions_mediaTrackList, "f")[i].label, "\n                                    </div>");

                  __classPrivateFieldGet(_this, _Captions_menu, "f").appendChild(item);
                }
              });
            }
          }
        }
      };

      for (var i = 0, trackItems = __classPrivateFieldGet(this, _Captions_player, "f").getElement().querySelectorAll('track'), total = trackItems.length; i < total; i++) {
        _loop(i, trackItems, total);
      }

      __classPrivateFieldSet(this, _Captions_captions, document.createElement('div'), "f");

      __classPrivateFieldGet(this, _Captions_captions, "f").className = 'op-captions';
      __classPrivateFieldGet(this, _Captions_captions, "f").innerHTML = '<span></span>';

      var container = __classPrivateFieldGet(this, _Captions_captions, "f").querySelector('span');

      __classPrivateFieldGet(this, _Captions_events, "f").media.timeupdate = function () {
        if (__classPrivateFieldGet(_this, _Captions_player, "f").isMedia()) {
          if (__classPrivateFieldGet(_this, _Captions_currentTrack, "f")) {
            var currentCues = __classPrivateFieldGet(_this, _Captions_langTracks, "f")[__classPrivateFieldGet(_this, _Captions_currentTrack, "f").language];

            if (container && currentCues !== undefined) {
              var index = _this._search(currentCues, __classPrivateFieldGet(_this, _Captions_player, "f").getMedia().currentTime);

              container.innerHTML = '';

              if (index > -1 && __classPrivateFieldGet(_this, _Captions_button, "f").classList.contains('op-controls__captions--on')) {
                __classPrivateFieldGet(_this, _Captions_captions, "f").classList.add('op-captions--on');

                container.innerHTML = sanitize(currentCues[index].text, false);
              } else {
                _this._hideCaptions();
              }
            }
          } else {
            _this._hideCaptions();
          }
        } else {
          _this._hideCaptions();
        }
      };

      __classPrivateFieldGet(this, _Captions_events, "f").button.click = function (e) {
        var button = e.target;

        if (detachMenus) {
          var menus = __classPrivateFieldGet(_this, _Captions_player, "f").getContainer().querySelectorAll('.op-settings');

          for (var _i2 = 0, _total2 = menus.length; _i2 < _total2; ++_i2) {
            if (menus[_i2] !== __classPrivateFieldGet(_this, _Captions_menu, "f")) {
              menus[_i2].setAttribute('aria-hidden', 'true');
            }
          }

          if (__classPrivateFieldGet(_this, _Captions_menu, "f").getAttribute('aria-hidden') === 'true') {
            __classPrivateFieldGet(_this, _Captions_menu, "f").setAttribute('aria-hidden', 'false');
          } else {
            __classPrivateFieldGet(_this, _Captions_menu, "f").setAttribute('aria-hidden', 'true');
          }
        } else {
          button.setAttribute('aria-pressed', 'true');

          if (button.classList.contains('op-controls__captions--on')) {
            _this._hideCaptions();

            button.classList.remove('op-controls__captions--on');
            button.setAttribute('data-active-captions', 'off');
          } else {
            if (!__classPrivateFieldGet(_this, _Captions_currentTrack, "f")) {
              var _classPrivateFieldGe2 = __classPrivateFieldGet(_this, _Captions_mediaTrackList, "f"),
                  _classPrivateFieldGe3 = slicedToArray_default()(_classPrivateFieldGe2, 1),
                  track = _classPrivateFieldGe3[0];

              __classPrivateFieldSet(_this, _Captions_currentTrack, track, "f");
            }

            _this._displayCaptions();

            button.classList.add('op-controls__captions--on');
            button.setAttribute('data-active-captions', __classPrivateFieldGet(_this, _Captions_currentTrack, "f").language);
          }
        }
      };

      __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover = function () {
        if (!IS_IOS && !IS_ANDROID && detachMenus) {
          var menus = __classPrivateFieldGet(_this, _Captions_player, "f").getContainer().querySelectorAll('.op-settings');

          for (var _i3 = 0, _total3 = menus.length; _i3 < _total3; ++_i3) {
            if (menus[_i3] !== __classPrivateFieldGet(_this, _Captions_menu, "f")) {
              menus[_i3].setAttribute('aria-hidden', 'true');
            }
          }

          if (__classPrivateFieldGet(_this, _Captions_menu, "f").getAttribute('aria-hidden') === 'true') {
            __classPrivateFieldGet(_this, _Captions_menu, "f").setAttribute('aria-hidden', 'false');
          }
        }
      };

      __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout = function () {
        if (!IS_IOS && !IS_ANDROID && detachMenus) {
          var menus = __classPrivateFieldGet(_this, _Captions_player, "f").getContainer().querySelectorAll('.op-settings');

          for (var _i4 = 0, _total4 = menus.length; _i4 < _total4; ++_i4) {
            menus[_i4].setAttribute('aria-hidden', 'true');
          }

          if (__classPrivateFieldGet(_this, _Captions_menu, "f").getAttribute('aria-hidden') === 'false') {
            __classPrivateFieldGet(_this, _Captions_menu, "f").setAttribute('aria-hidden', 'true');
          }
        }
      };

      if (__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
        var target = __classPrivateFieldGet(this, _Captions_player, "f").getContainer();

        target.insertBefore(__classPrivateFieldGet(this, _Captions_captions, "f"), target.firstChild);

        if (detachMenus) {
          var itemContainer = document.createElement('div');
          itemContainer.className = "op-controls__container op-control__".concat(__classPrivateFieldGet(this, _Captions_controlPosition, "f"));
          itemContainer.appendChild(__classPrivateFieldGet(this, _Captions_button, "f"));
          itemContainer.appendChild(__classPrivateFieldGet(this, _Captions_menu, "f"));

          __classPrivateFieldGet(this, _Captions_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Captions_controlLayer, "f")).appendChild(itemContainer);
        } else {
          __classPrivateFieldGet(this, _Captions_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Captions_controlLayer, "f")).appendChild(__classPrivateFieldGet(this, _Captions_button, "f"));
        }

        __classPrivateFieldGet(this, _Captions_button, "f").addEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").button.click, EVENT_OPTIONS);
      }

      if (__classPrivateFieldGet(this, _Captions_mediaTrackList, "f").length <= 1 && !detachMenus || !__classPrivateFieldGet(this, _Captions_mediaTrackList, "f").length && detachMenus) {
        return;
      }

      __classPrivateFieldGet(this, _Captions_events, "f").global.click = function (e) {
        var option = e.target;

        if (option.closest("#".concat(__classPrivateFieldGet(_this, _Captions_player, "f").id)) && option.classList.contains('op-subtitles__option')) {
          var langEl = option.getAttribute('data-value');
          var language = langEl ? langEl.replace('captions-', '') : '';
          var currentLang = Array.from(__classPrivateFieldGet(_this, _Captions_mediaTrackList, "f")).filter(function (item) {
            return item.language === language;
          });

          __classPrivateFieldSet(_this, _Captions_currentTrack, currentLang ? currentLang.pop() : undefined, "f");

          if (detachMenus) {
            if (__classPrivateFieldGet(_this, _Captions_button, "f").classList.contains('op-controls__captions--on')) {
              _this._hideCaptions();

              __classPrivateFieldGet(_this, _Captions_button, "f").classList.remove('op-controls__captions--on');

              __classPrivateFieldGet(_this, _Captions_button, "f").setAttribute('data-active-captions', 'off');
            } else {
              _this._displayCaptions();

              __classPrivateFieldGet(_this, _Captions_button, "f").classList.add('op-controls__captions--on');

              __classPrivateFieldGet(_this, _Captions_button, "f").setAttribute('data-active-captions', language);
            }

            if (option.parentElement && option.parentElement.parentElement) {
              var captions = option.parentElement.parentElement.querySelectorAll('.op-settings__submenu-item');

              for (var _i5 = 0, _total5 = captions.length; _i5 < _total5; ++_i5) {
                captions[_i5].setAttribute('aria-checked', 'false');
              }
            }

            if (option.parentElement) {
              option.parentElement.setAttribute('aria-checked', 'true');
            }

            __classPrivateFieldGet(_this, _Captions_menu, "f").setAttribute('aria-hidden', 'false');
          } else {
            _this._displayCaptions();

            __classPrivateFieldGet(_this, _Captions_button, "f").setAttribute('data-active-captions', language);
          }

          var event = addEvent('captionschanged');

          __classPrivateFieldGet(_this, _Captions_player, "f").getElement().dispatchEvent(event);
        }
      };

      if (detachMenus) {
        __classPrivateFieldGet(this, _Captions_button, "f").addEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover, EVENT_OPTIONS);

        __classPrivateFieldGet(this, _Captions_menu, "f").addEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover, EVENT_OPTIONS);

        __classPrivateFieldGet(this, _Captions_menu, "f").addEventListener('mouseout', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout, EVENT_OPTIONS);

        __classPrivateFieldGet(this, _Captions_player, "f").getElement().addEventListener('controlshidden', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout, EVENT_OPTIONS);
      }

      if (typeof __classPrivateFieldGet(this, _Captions_events, "f").global.click !== 'undefined') {
        document.addEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").global.click, EVENT_OPTIONS);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _classPrivateFieldGe4 = __classPrivateFieldGet(this, _Captions_player, "f").getOptions(),
          detachMenus = _classPrivateFieldGe4.detachMenus;

      if (typeof __classPrivateFieldGet(this, _Captions_events, "f").global.click !== 'undefined') {
        document.removeEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").global.click);
      }

      if (__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
        __classPrivateFieldGet(this, _Captions_button, "f").removeEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").button.click);

        if (detachMenus) {
          __classPrivateFieldGet(this, _Captions_button, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover);

          __classPrivateFieldGet(this, _Captions_menu, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover);

          __classPrivateFieldGet(this, _Captions_menu, "f").removeEventListener('mouseout', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout);

          __classPrivateFieldGet(this, _Captions_player, "f").getElement().removeEventListener('controlshidden', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout);

          __classPrivateFieldGet(this, _Captions_menu, "f").remove();
        }

        __classPrivateFieldGet(this, _Captions_player, "f").getElement().removeEventListener('timeupdate', __classPrivateFieldGet(this, _Captions_events, "f").media.timeupdate);

        __classPrivateFieldGet(this, _Captions_button, "f").remove();

        __classPrivateFieldGet(this, _Captions_captions, "f").remove();
      }
    }
  }, {
    key: "addSettings",
    value: function addSettings() {
      var _classPrivateFieldGe5 = __classPrivateFieldGet(this, _Captions_player, "f").getOptions(),
          detachMenus = _classPrivateFieldGe5.detachMenus,
          labels = _classPrivateFieldGe5.labels;

      if (detachMenus || __classPrivateFieldGet(this, _Captions_mediaTrackList, "f").length <= 1) {
        return {};
      }

      var subitems = this._formatMenuItems();

      return subitems.length > 2 ? {
        className: 'op-subtitles__option',
        default: __classPrivateFieldGet(this, _Captions_default, "f") || 'off',
        key: 'captions',
        name: (labels === null || labels === void 0 ? void 0 : labels.captions) || '',
        subitems: subitems
      } : {};
    }
  }, {
    key: "_getCuesFromText",
    value: function _getCuesFromText(vttText) {
      var lines = vttText.split(/\r?\n/);
      var entries = [];
      var urlRegexp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
      var timePattern = '^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --> ';
      timePattern += '((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*?)$';
      var regexp = new RegExp(timePattern);
      var identifier;

      for (var i = 0, total = lines.length; i < total; i++) {
        var timeCode = regexp.exec(lines[i]);

        if (timeCode && i < lines.length) {
          if (i - 1 >= 0 && lines[i - 1] !== '') {
            identifier = lines[i - 1];
          }

          i++;
          var cue = lines[i];
          i++;

          while (lines[i] !== '' && i < lines.length) {
            cue = "".concat(cue, "\n").concat(lines[i]);
            i++;
          }

          cue = cue.trim().replace(urlRegexp, "<a href='$1' target='_blank'>$1</a>");
          var initTime = timeToSeconds(timeCode[1]);
          entries.push({
            endTime: timeToSeconds(timeCode[3]),
            identifier: identifier || '',
            settings: isJson(timeCode[5]) ? JSON.parse(timeCode[5]) : {},
            startTime: initTime === 0 ? 0.2 : initTime,
            text: cue
          });
        }

        identifier = '';
      }

      return entries;
    }
  }, {
    key: "_getNativeCues",
    value: function _getNativeCues(track) {
      var cues = [];
      var trackCues = track.cues;
      Object.keys(trackCues).forEach(function (index) {
        var j = parseInt(index, 10);
        var current = trackCues[j];
        cues.push({
          endTime: current.endTime,
          identifier: current.id,
          settings: {},
          startTime: current.startTime,
          text: current.text
        });
      });
      return cues;
    }
  }, {
    key: "_displayCaptions",
    value: function _displayCaptions() {
      if (!__classPrivateFieldGet(this, _Captions_captions, "f") || !__classPrivateFieldGet(this, _Captions_currentTrack, "f") || __classPrivateFieldGet(this, _Captions_currentTrack, "f").cues === undefined) {
        return;
      }

      var container = __classPrivateFieldGet(this, _Captions_captions, "f").querySelector('span');

      if (container) {
        container.innerHTML = '';
      }

      __classPrivateFieldGet(this, _Captions_player, "f").getElement().addEventListener('timeupdate', __classPrivateFieldGet(this, _Captions_events, "f").media.timeupdate, EVENT_OPTIONS);
    }
  }, {
    key: "_hideCaptions",
    value: function _hideCaptions() {
      __classPrivateFieldGet(this, _Captions_captions, "f").classList.remove('op-captions--on');

      if (!__classPrivateFieldGet(this, _Captions_currentTrack, "f")) {
        __classPrivateFieldGet(this, _Captions_button, "f").classList.remove('op-controls__captions--on');

        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', 'off');
      }
    }
  }, {
    key: "_search",
    value: function _search(tracks, currentTime) {
      var low = 0;
      var high = tracks.length - 1;

      while (low <= high) {
        var mid = low + high >> 1;
        var start = tracks[mid].startTime;
        var stop = tracks[mid].endTime;

        if (currentTime >= start && currentTime < stop) {
          return mid;
        }

        if (start < currentTime) {
          low = mid + 1;
        } else if (start > currentTime) {
          high = mid - 1;
        }
      }

      return -1;
    }
  }, {
    key: "_prepareTrack",
    value: function _prepareTrack(index, language, trackUrl) {
      var _this2 = this;

      var showTrack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      __classPrivateFieldGet(this, _Captions_trackUrlList, "f")[language] = trackUrl;
      __classPrivateFieldGet(this, _Captions_mediaTrackList, "f")[index].mode = 'disabled';

      if (showTrack) {
        __classPrivateFieldSet(this, _Captions_default, language, "f");

        __classPrivateFieldGet(this, _Captions_button, "f").classList.add('op-controls__captions--on');

        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', language);

        __classPrivateFieldSet(this, _Captions_currentTrack, Array.from(__classPrivateFieldGet(this, _Captions_mediaTrackList, "f")).filter(function (item) {
          return item.language === __classPrivateFieldGet(_this2, _Captions_default, "f");
        }).pop(), "f");

        this._displayCaptions();

        if (!__classPrivateFieldGet(this, _Captions_player, "f").getContainer().classList.contains('op-captions--detected')) {
          __classPrivateFieldGet(this, _Captions_player, "f").getContainer().classList.add('op-captions--detected');
        }
      }
    }
  }, {
    key: "_formatMenuItems",
    value: function _formatMenuItems() {
      var _this3 = this;

      var _classPrivateFieldGe6 = __classPrivateFieldGet(this, _Captions_player, "f").getOptions(),
          labels = _classPrivateFieldGe6.labels;

      var items = [{
        key: 'off',
        label: (labels === null || labels === void 0 ? void 0 : labels.off) || ''
      }];

      var _loop2 = function _loop2(i, total) {
        var track = __classPrivateFieldGet(_this3, _Captions_mediaTrackList, "f")[i];

        var label = (labels === null || labels === void 0 ? void 0 : labels.lang) ? labels.lang[track.language] : null;
        items = items.filter(function (el) {
          return el.key !== track.language;
        });
        items.push({
          key: track.language,
          label: label || __classPrivateFieldGet(_this3, _Captions_mediaTrackList, "f")[i].label
        });
      };

      for (var i = 0, total = __classPrivateFieldGet(this, _Captions_mediaTrackList, "f").length; i < total; i++) {
        _loop2(i, total);
      }

      return items;
    }
  }]);

  return Captions;
}();

_Captions_player = new WeakMap(), _Captions_button = new WeakMap(), _Captions_captions = new WeakMap(), _Captions_menu = new WeakMap(), _Captions_events = new WeakMap(), _Captions_langTracks = new WeakMap(), _Captions_mediaTrackList = new WeakMap(), _Captions_trackUrlList = new WeakMap(), _Captions_hasTracks = new WeakMap(), _Captions_currentTrack = new WeakMap(), _Captions_default = new WeakMap(), _Captions_controlPosition = new WeakMap(), _Captions_controlLayer = new WeakMap();
/* harmony default export */ const captions = (Captions);
;// CONCATENATED MODULE: ./src/js/controls/fullscreen.ts



var fullscreen_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var fullscreen_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Fullscreen_player, _Fullscreen_isFullscreen, _Fullscreen_button, _Fullscreen_fullscreenEvents, _Fullscreen_fullscreenWidth, _Fullscreen_fullscreenHeight, _Fullscreen_clickEvent, _Fullscreen_controlPosition, _Fullscreen_controlLayer;



var Fullscreen = function () {
  function Fullscreen(player, position, layer) {
    var _this = this;

    classCallCheck_default()(this, Fullscreen);

    _Fullscreen_player.set(this, void 0);

    _Fullscreen_isFullscreen.set(this, void 0);

    _Fullscreen_button.set(this, void 0);

    _Fullscreen_fullscreenEvents.set(this, []);

    _Fullscreen_fullscreenWidth.set(this, 0);

    _Fullscreen_fullscreenHeight.set(this, 0);

    _Fullscreen_clickEvent.set(this, void 0);

    _Fullscreen_controlPosition.set(this, void 0);

    _Fullscreen_controlLayer.set(this, void 0);

    fullscreen_classPrivateFieldSet(this, _Fullscreen_player, player, "f");

    fullscreen_classPrivateFieldSet(this, _Fullscreen_controlPosition, position, "f");

    fullscreen_classPrivateFieldSet(this, _Fullscreen_controlLayer, layer, "f");

    fullscreen_classPrivateFieldSet(this, _Fullscreen_isFullscreen, document.body.classList.contains('op-fullscreen__on'), "f");

    var target = document;
    this.fullScreenEnabled = !!(target.fullscreenEnabled || target.mozFullScreenEnabled || target.msFullscreenEnabled || target.webkitSupportsFullscreen || target.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
    this._enterSpaceKeyEvent = this._enterSpaceKeyEvent.bind(this);
    this._resize = this._resize.bind(this);
    this._fullscreenChange = this._fullscreenChange.bind(this);
    this._setFullscreen = this._setFullscreen.bind(this);
    this._unsetFullscreen = this._unsetFullscreen.bind(this);

    fullscreen_classPrivateFieldSet(this, _Fullscreen_fullscreenEvents, ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'], "f");

    fullscreen_classPrivateFieldGet(this, _Fullscreen_fullscreenEvents, "f").forEach(function (event) {
      document.addEventListener(event, _this._fullscreenChange, EVENT_OPTIONS);
    });

    this._setFullscreenData(false);

    fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer().addEventListener('keydown', this._enterSpaceKeyEvent, EVENT_OPTIONS);

    if (IS_IPHONE) {
      fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().addEventListener('webkitbeginfullscreen', this._setFullscreen, EVENT_OPTIONS);

      fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().addEventListener('webkitendfullscreen', this._unsetFullscreen, EVENT_OPTIONS);
    }
  }

  createClass_default()(Fullscreen, [{
    key: "create",
    value: function create() {
      var _this2 = this;

      var _classPrivateFieldGe = fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getOptions(),
          labels = _classPrivateFieldGe.labels;

      fullscreen_classPrivateFieldSet(this, _Fullscreen_button, document.createElement('button'), "f");

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").type = 'button';
      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").className = "op-controls__fullscreen op-control__".concat(fullscreen_classPrivateFieldGet(this, _Fullscreen_controlPosition, "f"));
      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").tabIndex = 0;
      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.fullscreen) || '';

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-controls', fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").id);

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-pressed', 'false');

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.fullscreen) || '');

      fullscreen_classPrivateFieldSet(this, _Fullscreen_clickEvent, function () {
        fullscreen_classPrivateFieldGet(_this2, _Fullscreen_button, "f").setAttribute('aria-pressed', 'true');

        _this2.toggleFullscreen();
      }, "f");

      fullscreen_classPrivateFieldSet(this, _Fullscreen_clickEvent, fullscreen_classPrivateFieldGet(this, _Fullscreen_clickEvent, "f").bind(this), "f");

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").addEventListener('click', fullscreen_classPrivateFieldGet(this, _Fullscreen_clickEvent, "f"), EVENT_OPTIONS);

      fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getControls().getLayer(fullscreen_classPrivateFieldGet(this, _Fullscreen_controlLayer, "f")).appendChild(fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f"));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer().removeEventListener('keydown', this._enterSpaceKeyEvent);

      fullscreen_classPrivateFieldGet(this, _Fullscreen_fullscreenEvents, "f").forEach(function (event) {
        document.removeEventListener(event, _this3._fullscreenChange);
      });

      if (IS_IPHONE) {
        fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().removeEventListener('webkitbeginfullscreen', this._setFullscreen);

        fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().removeEventListener('webkitendfullscreen', this._unsetFullscreen);
      }

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").removeEventListener('click', fullscreen_classPrivateFieldGet(this, _Fullscreen_clickEvent, "f"));

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").remove();
    }
  }, {
    key: "toggleFullscreen",
    value: function toggleFullscreen() {
      if (fullscreen_classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f")) {
        var target = document;

        if (target.exitFullscreen) {
          target.exitFullscreen();
        } else if (target.mozCancelFullScreen) {
          target.mozCancelFullScreen();
        } else if (target.webkitCancelFullScreen) {
          target.webkitCancelFullScreen();
        } else if (target.msExitFullscreen) {
          target.msExitFullscreen();
        } else {
          this._fullscreenChange();
        }

        document.body.classList.remove('op-fullscreen__on');
      } else {
        var video = fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getElement();

        fullscreen_classPrivateFieldSet(this, _Fullscreen_fullscreenWidth, window.screen.width, "f");

        fullscreen_classPrivateFieldSet(this, _Fullscreen_fullscreenHeight, window.screen.height, "f");

        if (video.requestFullscreen) {
          video.parentElement.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.parentElement.mozRequestFullScreen();
        } else if (video.webkitRequestFullScreen) {
          video.parentElement.webkitRequestFullScreen();
        } else if (video.msRequestFullscreen) {
          video.parentElement.msRequestFullscreen();
        } else if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        } else {
          this._fullscreenChange();
        }

        document.body.classList.add('op-fullscreen__on');
      }

      if (typeof window !== 'undefined' && (IS_ANDROID || IS_IPHONE)) {
        var _window = window,
            screen = _window.screen;

        if (screen.orientation && !fullscreen_classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f")) {
          screen.orientation.lock('landscape');
        }
      }
    }
  }, {
    key: "_fullscreenChange",
    value: function _fullscreenChange() {
      var width = fullscreen_classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f") ? undefined : fullscreen_classPrivateFieldGet(this, _Fullscreen_fullscreenWidth, "f");
      var height = fullscreen_classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f") ? undefined : fullscreen_classPrivateFieldGet(this, _Fullscreen_fullscreenHeight, "f");

      this._setFullscreenData(!fullscreen_classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f"));

      if (fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").isAd()) {
        fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getAd().resizeAds(width, height);
      }

      fullscreen_classPrivateFieldSet(this, _Fullscreen_isFullscreen, !fullscreen_classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f"), "f");

      if (fullscreen_classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f")) {
        document.body.classList.add('op-fullscreen__on');
      } else {
        document.body.classList.remove('op-fullscreen__on');
      }

      this._resize(width, height);
    }
  }, {
    key: "_setFullscreenData",
    value: function _setFullscreenData(isFullscreen) {
      fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer().setAttribute('data-fullscreen', (!!isFullscreen).toString());

      if (fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f")) {
        if (isFullscreen) {
          fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").classList.add('op-controls__fullscreen--out');
        } else {
          fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").classList.remove('op-controls__fullscreen--out');
        }
      }
    }
  }, {
    key: "_resize",
    value: function _resize(width, height) {
      var wrapper = fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer();

      var video = fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getElement();

      var options = fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getOptions();

      var styles = '';

      if (width) {
        wrapper.style.width = '100%';
        video.style.width = '100%';
      } else if (options.width) {
        var defaultWidth = typeof options.width === 'number' ? "".concat(options.width, "px") : options.width;
        styles += "width: ".concat(defaultWidth, " !important;");
        video.style.removeProperty('width');
      } else {
        video.style.removeProperty('width');
        wrapper.style.removeProperty('width');
      }

      if (height) {
        video.style.height = '100%';
        wrapper.style.height = '100%';
      } else if (options.height) {
        var defaultHeight = typeof options.height === 'number' ? "".concat(options.height, "px") : options.height;
        styles += "height: ".concat(defaultHeight, " !important;");
        video.style.removeProperty('height');
      } else {
        video.style.removeProperty('height');
        wrapper.style.removeProperty('height');
      }

      if (styles) {
        wrapper.setAttribute('style', styles);
      }
    }
  }, {
    key: "_enterSpaceKeyEvent",
    value: function _enterSpaceKeyEvent(e) {
      var _a;

      var key = e.which || e.keyCode || 0;
      var fullscreenBtnFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-controls__fullscreen');

      if (fullscreenBtnFocused && (key === 13 || key === 32)) {
        this.toggleFullscreen();
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }, {
    key: "_setFullscreen",
    value: function _setFullscreen() {
      fullscreen_classPrivateFieldSet(this, _Fullscreen_isFullscreen, true, "f");

      this._setFullscreenData(true);

      document.body.classList.add('op-fullscreen__on');
    }
  }, {
    key: "_unsetFullscreen",
    value: function _unsetFullscreen() {
      fullscreen_classPrivateFieldSet(this, _Fullscreen_isFullscreen, false, "f");

      this._setFullscreenData(false);

      document.body.classList.remove('op-fullscreen__on');
    }
  }]);

  return Fullscreen;
}();

_Fullscreen_player = new WeakMap(), _Fullscreen_isFullscreen = new WeakMap(), _Fullscreen_button = new WeakMap(), _Fullscreen_fullscreenEvents = new WeakMap(), _Fullscreen_fullscreenWidth = new WeakMap(), _Fullscreen_fullscreenHeight = new WeakMap(), _Fullscreen_clickEvent = new WeakMap(), _Fullscreen_controlPosition = new WeakMap(), _Fullscreen_controlLayer = new WeakMap();
/* harmony default export */ const fullscreen = (Fullscreen);
;// CONCATENATED MODULE: ./src/js/utils/media.ts

function getExtension(url) {
  var baseUrl = url.split('?')[0];
  var baseFrags = (baseUrl || '').split('\\');
  var baseUrlFragment = (baseFrags || []).pop();
  var baseNameFrags = (baseUrlFragment || '').split('/');
  var baseName = (baseNameFrags || []).pop() || '';
  return baseName.includes('.') ? baseName.substring(baseName.lastIndexOf('.') + 1) : '';
}
function isHlsSource(media) {
  return /\.m3u8$/i.test(media.src) || ['application/x-mpegURL', 'application/vnd.apple.mpegurl'].includes(media.type);
}
function isM3USource(media) {
  return /\.m3u$/i.test(media.src);
}
function isDashSource(media) {
  return /\.mpd/i.test(media.src) || media.type === 'application/dash+xml';
}
function isFlvSource(media) {
  return /(^rtmp:\/\/|\.flv$)/i.test(media.src) || ['video/x-flv', 'video/flv'].includes(media.type);
}
function predictMimeType(url, element) {
  var extension = getExtension(url);

  if (!extension) {
    return isAudio(element) ? 'audio/mp3' : 'video/mp4';
  }

  switch (extension) {
    case 'm3u8':
    case 'm3u':
      return 'application/x-mpegURL';

    case 'mpd':
      return 'application/dash+xml';

    case 'mp4':
      return isAudio(element) ? 'audio/mp4' : 'video/mp4';

    case 'mp3':
      return 'audio/mp3';

    case 'webm':
      return isAudio(element) ? 'audio/webm' : 'video/webm';

    case 'ogg':
      return isAudio(element) ? 'audio/ogg' : 'video/ogg';

    case 'ogv':
      return 'video/ogg';

    case 'oga':
      return 'audio/ogg';

    case '3gp':
      return 'audio/3gpp';

    case 'wav':
      return 'audio/wav';

    case 'aac':
      return 'audio/aac';

    case 'flac':
      return 'audio/flac';

    default:
      return isAudio(element) ? 'audio/mp3' : 'video/mp4';
  }
}
function isAutoplaySupported(media, defaultVol, autoplay, muted, callback) {
  var playPromise = media.play();

  if (playPromise !== undefined) {
    playPromise.then(function () {
      media.pause();
      autoplay(true);
      muted(false);
      callback();
    }).catch(function () {
      media.volume = 0;
      media.muted = true;
      media.play().then(function () {
        media.pause();
        autoplay(true);
        muted(true);
        callback();
      }).catch(function () {
        media.volume = defaultVol;
        media.muted = false;
        autoplay(false);
        muted(false);
        callback();
      });
    });
  } else {
    autoplay(!media.paused || 'Promise' in window && playPromise instanceof Promise);
    media.pause();
    muted(false);
    callback();
  }
}
;// CONCATENATED MODULE: ./src/js/controls/levels.ts



var levels_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var levels_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Levels_player, _Levels_button, _Levels_menu, _Levels_events, _Levels_levels, _Levels_defaultLevel, _Levels_controlPosition, _Levels_controlLayer;





var Levels = function () {
  function Levels(player, position, layer) {
    classCallCheck_default()(this, Levels);

    _Levels_player.set(this, void 0);

    _Levels_button.set(this, void 0);

    _Levels_menu.set(this, void 0);

    _Levels_events.set(this, {
      button: {},
      global: {},
      media: {}
    });

    _Levels_levels.set(this, []);

    _Levels_defaultLevel.set(this, '');

    _Levels_controlPosition.set(this, void 0);

    _Levels_controlLayer.set(this, void 0);

    levels_classPrivateFieldSet(this, _Levels_player, player, "f");

    levels_classPrivateFieldSet(this, _Levels_controlPosition, position, "f");

    levels_classPrivateFieldSet(this, _Levels_controlLayer, layer, "f");
  }

  createClass_default()(Levels, [{
    key: "create",
    value: function create() {
      var _this = this;

      var _classPrivateFieldGe = levels_classPrivateFieldGet(this, _Levels_player, "f").getOptions(),
          labels = _classPrivateFieldGe.labels,
          startLevel = _classPrivateFieldGe.defaultLevel,
          detachMenus = _classPrivateFieldGe.detachMenus;

      var initialLevel = startLevel !== null ? parseInt(startLevel || '0', 10) : levels_classPrivateFieldGet(this, _Levels_player, "f").getMedia().level;

      levels_classPrivateFieldSet(this, _Levels_defaultLevel, "".concat(initialLevel), "f");

      var menuItems = this._formatMenuItems();

      var defaultLevel = menuItems.length ? menuItems.find(function (items) {
        return items.key === levels_classPrivateFieldGet(_this, _Levels_defaultLevel, "f");
      }) : null;
      var defaultLabel = defaultLevel ? defaultLevel.label : (labels === null || labels === void 0 ? void 0 : labels.auto) || '';
      var levelSet = false;

      levels_classPrivateFieldSet(this, _Levels_button, document.createElement('button'), "f");

      levels_classPrivateFieldGet(this, _Levels_button, "f").className = "op-controls__levels op-control__".concat(levels_classPrivateFieldGet(this, _Levels_controlPosition, "f"));
      levels_classPrivateFieldGet(this, _Levels_button, "f").tabIndex = 0;
      levels_classPrivateFieldGet(this, _Levels_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.mediaLevels) || '';

      levels_classPrivateFieldGet(this, _Levels_button, "f").setAttribute('aria-controls', levels_classPrivateFieldGet(this, _Levels_player, "f").id);

      levels_classPrivateFieldGet(this, _Levels_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.mediaLevels) || '');

      levels_classPrivateFieldGet(this, _Levels_button, "f").setAttribute('data-active-level', levels_classPrivateFieldGet(this, _Levels_defaultLevel, "f"));

      levels_classPrivateFieldGet(this, _Levels_button, "f").innerHTML = "<span>".concat(defaultLabel, "</span>");

      var loadLevelsEvent = function loadLevelsEvent() {
        if (!levels_classPrivateFieldGet(_this, _Levels_levels, "f").length) {
          _this._gatherLevels();

          setTimeout(function () {
            levels_classPrivateFieldGet(_this, _Levels_player, "f").getMedia().level = initialLevel;
            var e = addEvent('controlschanged');

            levels_classPrivateFieldGet(_this, _Levels_player, "f").getElement().dispatchEvent(e);
          }, 0);
        } else if (!levelSet) {
          levels_classPrivateFieldGet(_this, _Levels_player, "f").getMedia().level = initialLevel;
          levelSet = true;
        }
      };

      levels_classPrivateFieldGet(this, _Levels_events, "f").media.loadedmetadata = loadLevelsEvent.bind(this);
      levels_classPrivateFieldGet(this, _Levels_events, "f").media.manifestLoaded = loadLevelsEvent.bind(this);
      levels_classPrivateFieldGet(this, _Levels_events, "f").media.hlsManifestParsed = loadLevelsEvent.bind(this);

      if (detachMenus) {
        this._buildMenu();

        levels_classPrivateFieldGet(this, _Levels_events, "f").button.click = function () {
          if (detachMenus) {
            var menus = levels_classPrivateFieldGet(_this, _Levels_player, "f").getContainer().querySelectorAll('.op-settings');

            for (var i = 0, total = menus.length; i < total; ++i) {
              if (menus[i] !== levels_classPrivateFieldGet(_this, _Levels_menu, "f")) {
                menus[i].setAttribute('aria-hidden', 'true');
              }
            }

            if (levels_classPrivateFieldGet(_this, _Levels_menu, "f").getAttribute('aria-hidden') === 'true') {
              levels_classPrivateFieldGet(_this, _Levels_menu, "f").setAttribute('aria-hidden', 'false');
            } else {
              levels_classPrivateFieldGet(_this, _Levels_menu, "f").setAttribute('aria-hidden', 'true');
            }
          }
        };

        levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseover = function () {
          if (!IS_IOS && !IS_ANDROID) {
            var menus = levels_classPrivateFieldGet(_this, _Levels_player, "f").getContainer().querySelectorAll('.op-settings');

            for (var i = 0, total = menus.length; i < total; ++i) {
              if (menus[i] !== levels_classPrivateFieldGet(_this, _Levels_menu, "f")) {
                menus[i].setAttribute('aria-hidden', 'true');
              }
            }

            if (levels_classPrivateFieldGet(_this, _Levels_menu, "f").getAttribute('aria-hidden') === 'true') {
              levels_classPrivateFieldGet(_this, _Levels_menu, "f").setAttribute('aria-hidden', 'false');
            }
          }
        };

        levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseout = function () {
          if (!IS_IOS && !IS_ANDROID) {
            var menus = levels_classPrivateFieldGet(_this, _Levels_player, "f").getContainer().querySelectorAll('.op-settings');

            for (var i = 0, total = menus.length; i < total; ++i) {
              menus[i].setAttribute('aria-hidden', 'true');
            }

            if (levels_classPrivateFieldGet(_this, _Levels_menu, "f").getAttribute('aria-hidden') === 'false') {
              levels_classPrivateFieldGet(_this, _Levels_menu, "f").setAttribute('aria-hidden', 'true');
            }
          }
        };

        levels_classPrivateFieldGet(this, _Levels_button, "f").addEventListener('click', levels_classPrivateFieldGet(this, _Levels_events, "f").button.click, EVENT_OPTIONS);

        levels_classPrivateFieldGet(this, _Levels_button, "f").addEventListener('mouseover', levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseover, EVENT_OPTIONS);

        levels_classPrivateFieldGet(this, _Levels_menu, "f").addEventListener('mouseover', levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseover, EVENT_OPTIONS);

        levels_classPrivateFieldGet(this, _Levels_menu, "f").addEventListener('mouseout', levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseout, EVENT_OPTIONS);

        levels_classPrivateFieldGet(this, _Levels_player, "f").getElement().addEventListener('controlshidden', levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseout, EVENT_OPTIONS);
      }

      levels_classPrivateFieldGet(this, _Levels_events, "f").global.click = function (e) {
        var option = e.target;

        var _classPrivateFieldGe2 = levels_classPrivateFieldGet(_this, _Levels_player, "f").getMedia(),
            currentTime = _classPrivateFieldGe2.currentTime;

        var isPaused = levels_classPrivateFieldGet(_this, _Levels_player, "f").getMedia().paused;

        if (option.closest("#".concat(levels_classPrivateFieldGet(_this, _Levels_player, "f").id)) && option.classList.contains('op-levels__option')) {
          var levelVal = option.getAttribute('data-value');
          var level = levelVal ? levelVal.replace('levels-', '') : '-1';

          levels_classPrivateFieldSet(_this, _Levels_defaultLevel, "".concat(level), "f");

          if (detachMenus) {
            levels_classPrivateFieldGet(_this, _Levels_button, "f").setAttribute('data-active-level', "".concat(level));

            levels_classPrivateFieldGet(_this, _Levels_button, "f").innerHTML = "<span>".concat(sanitize(option.innerText, true), "</span>");
            var levels = option.parentElement && option.parentElement.parentElement ? option.parentElement.parentElement.querySelectorAll('.op-settings__submenu-item') : [];

            for (var i = 0, total = levels.length; i < total; ++i) {
              levels[i].setAttribute('aria-checked', 'false');
            }

            if (option.parentElement) {
              option.parentElement.setAttribute('aria-checked', 'true');
            }

            levels_classPrivateFieldGet(_this, _Levels_menu, "f").setAttribute('aria-hidden', 'false');
          }

          levels_classPrivateFieldGet(_this, _Levels_player, "f").getMedia().level = level;
          levels_classPrivateFieldGet(_this, _Levels_player, "f").getMedia().currentTime = currentTime;

          if (!isPaused) {
            levels_classPrivateFieldGet(_this, _Levels_player, "f").play();
          }

          var event = addEvent('levelchanged', {
            detail: {
              label: option.innerText.trim(),
              level: level
            }
          });

          levels_classPrivateFieldGet(_this, _Levels_player, "f").getElement().dispatchEvent(event);

          e.preventDefault();
          e.stopPropagation();
        }
      };

      var connection = (NAV === null || NAV === void 0 ? void 0 : NAV.connection) || (NAV === null || NAV === void 0 ? void 0 : NAV.mozConnection) || (NAV === null || NAV === void 0 ? void 0 : NAV.webkitConnection);

      levels_classPrivateFieldGet(this, _Levels_events, "f").global.connection = function () {
        var media = levels_classPrivateFieldGet(_this, _Levels_player, "f").getMedia().current;

        if (!isDashSource(media) && !isHlsSource(media)) {
          var type = (connection === null || connection === void 0 ? void 0 : connection.effectiveType) || '';

          var levels = levels_classPrivateFieldGet(_this, _Levels_levels, "f").map(function (item) {
            return Object.assign(Object.assign({}, item), {
              resolution: parseInt(item.label.replace('p', ''), 10)
            });
          });

          var level = levels.find(function (item) {
            return item.resolution < 360;
          });

          if (type === '4g') {
            level = levels.find(function (item) {
              return item.resolution >= 720;
            });
          } else if (type === '3g') {
            level = levels.find(function (item) {
              return item.resolution >= 360 && item.resolution < 720;
            });
          }

          if (level) {
            levels_classPrivateFieldGet(_this, _Levels_player, "f").pause();

            levels_classPrivateFieldGet(_this, _Levels_player, "f").getMedia().level = level.id;

            levels_classPrivateFieldGet(_this, _Levels_player, "f").play();
          }
        }
      };

      Object.keys(levels_classPrivateFieldGet(this, _Levels_events, "f").media).forEach(function (event) {
        levels_classPrivateFieldGet(_this, _Levels_player, "f").getElement().addEventListener(event, levels_classPrivateFieldGet(_this, _Levels_events, "f").media[event], EVENT_OPTIONS);
      });
      document.addEventListener('click', levels_classPrivateFieldGet(this, _Levels_events, "f").global.click, EVENT_OPTIONS);

      if (connection) {
        connection.addEventListener('change', levels_classPrivateFieldGet(this, _Levels_events, "f").global.connection, EVENT_OPTIONS);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      var _classPrivateFieldGe3 = levels_classPrivateFieldGet(this, _Levels_player, "f").getOptions(),
          detachMenus = _classPrivateFieldGe3.detachMenus;

      var connection = (NAV === null || NAV === void 0 ? void 0 : NAV.connection) || (NAV === null || NAV === void 0 ? void 0 : NAV.mozConnection) || (NAV === null || NAV === void 0 ? void 0 : NAV.webkitConnection);
      Object.keys(levels_classPrivateFieldGet(this, _Levels_events, "f").media).forEach(function (event) {
        levels_classPrivateFieldGet(_this2, _Levels_player, "f").getElement().removeEventListener(event, levels_classPrivateFieldGet(_this2, _Levels_events, "f").media[event]);
      });
      document.removeEventListener('click', levels_classPrivateFieldGet(this, _Levels_events, "f").global.click);

      if (connection) {
        connection.removeEventListener('change', levels_classPrivateFieldGet(this, _Levels_events, "f").global.connection);
      }

      if (detachMenus) {
        levels_classPrivateFieldGet(this, _Levels_button, "f").removeEventListener('click', levels_classPrivateFieldGet(this, _Levels_events, "f").button.click);

        levels_classPrivateFieldGet(this, _Levels_button, "f").remove();

        levels_classPrivateFieldGet(this, _Levels_button, "f").removeEventListener('mouseover', levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseover);

        levels_classPrivateFieldGet(this, _Levels_menu, "f").removeEventListener('mouseover', levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseover);

        levels_classPrivateFieldGet(this, _Levels_menu, "f").removeEventListener('mouseout', levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseout);

        levels_classPrivateFieldGet(this, _Levels_player, "f").getElement().removeEventListener('controlshidden', levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseout);

        levels_classPrivateFieldGet(this, _Levels_menu, "f").remove();
      }
    }
  }, {
    key: "addSettings",
    value: function addSettings() {
      var _classPrivateFieldGe4 = levels_classPrivateFieldGet(this, _Levels_player, "f").getOptions(),
          labels = _classPrivateFieldGe4.labels,
          detachMenus = _classPrivateFieldGe4.detachMenus;

      if (detachMenus) {
        return {};
      }

      var subitems = this._formatMenuItems();

      return subitems.length > 2 ? {
        className: 'op-levels__option',
        default: levels_classPrivateFieldGet(this, _Levels_defaultLevel, "f") || '-1',
        key: 'levels',
        name: labels === null || labels === void 0 ? void 0 : labels.levels,
        subitems: subitems
      } : {};
    }
  }, {
    key: "_formatMenuItems",
    value: function _formatMenuItems() {
      var _classPrivateFieldGe5 = levels_classPrivateFieldGet(this, _Levels_player, "f").getOptions(),
          labels = _classPrivateFieldGe5.labels;

      var levels = this._gatherLevels();

      var total = levels.length;
      var items = total ? [{
        key: '-1',
        label: labels === null || labels === void 0 ? void 0 : labels.auto
      }] : [];

      var _loop = function _loop(i) {
        var level = levels[i];
        items = items.filter(function (el) {
          return el.key !== level.id;
        });
        items.push({
          key: level.id,
          label: level.label
        });
      };

      for (var i = 0; i < total; i++) {
        _loop(i);
      }

      return items.reduce(function (acc, current) {
        var duplicate = acc.find(function (item) {
          return item.label === current.label;
        });

        if (!duplicate) {
          return acc.concat([current]);
        }

        return acc;
      }, []).sort(function (a, b) {
        return parseInt((a === null || a === void 0 ? void 0 : a.label) || '', 10) > parseInt((b === null || b === void 0 ? void 0 : b.label) || '', 10) ? 1 : -1;
      });
    }
  }, {
    key: "_getResolutionsLabel",
    value: function _getResolutionsLabel(height) {
      var _classPrivateFieldGe6 = levels_classPrivateFieldGet(this, _Levels_player, "f").getOptions(),
          labels = _classPrivateFieldGe6.labels;

      if (height >= 4320) {
        return '8K';
      }

      if (height >= 2160) {
        return '4K';
      }

      if (height >= 1440) {
        return '1440p';
      }

      if (height >= 1080) {
        return '1080p';
      }

      if (height >= 720) {
        return '720p';
      }

      if (height >= 480) {
        return '480p';
      }

      if (height >= 360) {
        return '360p';
      }

      if (height >= 240) {
        return '240p';
      }

      if (height >= 144) {
        return '144p';
      }

      return (labels === null || labels === void 0 ? void 0 : labels.auto) || '';
    }
  }, {
    key: "_gatherLevels",
    value: function _gatherLevels() {
      var _this3 = this;

      if (!levels_classPrivateFieldGet(this, _Levels_levels, "f").length) {
        levels_classPrivateFieldGet(this, _Levels_player, "f").getMedia().levels.forEach(function (level) {
          levels_classPrivateFieldGet(_this3, _Levels_levels, "f").push(Object.assign(Object.assign({}, level), {
            label: level.label || _this3._getResolutionsLabel(level.height)
          }));
        });
      }

      return levels_classPrivateFieldGet(this, _Levels_levels, "f");
    }
  }, {
    key: "_buildMenu",
    value: function _buildMenu() {
      var _this4 = this;

      var _classPrivateFieldGe7 = levels_classPrivateFieldGet(this, _Levels_player, "f").getOptions(),
          detachMenus = _classPrivateFieldGe7.detachMenus;

      if (detachMenus) {
        levels_classPrivateFieldGet(this, _Levels_button, "f").classList.add('op-control--no-hover');

        levels_classPrivateFieldSet(this, _Levels_menu, document.createElement('div'), "f");

        levels_classPrivateFieldGet(this, _Levels_menu, "f").className = 'op-settings op-levels__menu';

        levels_classPrivateFieldGet(this, _Levels_menu, "f").setAttribute('aria-hidden', 'true');

        var className = 'op-levels__option';

        var options = this._formatMenuItems();

        var menu = "<div class=\"op-settings__menu\" role=\"menu\" id=\"menu-item-levels\">\n                ".concat(options.map(function (item) {
          return "\n                <div class=\"op-settings__submenu-item\" tabindex=\"0\" role=\"menuitemradio\"\n                    aria-checked=\"".concat(levels_classPrivateFieldGet(_this4, _Levels_defaultLevel, "f") === item.key ? 'true' : 'false', "\">\n                    <div class=\"op-settings__submenu-label ").concat(className || '', "\" data-value=\"levels-").concat(item.key, "\">").concat(item.label, "</div>\n                </div>");
        }).join(''), "\n            </div>");
        levels_classPrivateFieldGet(this, _Levels_menu, "f").innerHTML = menu;
        var itemContainer = document.createElement('div');
        itemContainer.className = "op-controls__container op-control__".concat(levels_classPrivateFieldGet(this, _Levels_controlPosition, "f"));
        itemContainer.appendChild(levels_classPrivateFieldGet(this, _Levels_button, "f"));
        itemContainer.appendChild(levels_classPrivateFieldGet(this, _Levels_menu, "f"));

        levels_classPrivateFieldGet(this, _Levels_player, "f").getControls().getLayer(levels_classPrivateFieldGet(this, _Levels_controlLayer, "f")).appendChild(itemContainer);
      }
    }
  }]);

  return Levels;
}();

_Levels_player = new WeakMap(), _Levels_button = new WeakMap(), _Levels_menu = new WeakMap(), _Levels_events = new WeakMap(), _Levels_levels = new WeakMap(), _Levels_defaultLevel = new WeakMap(), _Levels_controlPosition = new WeakMap(), _Levels_controlLayer = new WeakMap();
/* harmony default export */ const levels = (Levels);
;// CONCATENATED MODULE: ./src/js/controls/play.ts



var play_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var play_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Play_player, _Play_button, _Play_events, _Play_controlPosition, _Play_controlLayer;





var Play = function () {
  function Play(player, position, layer) {
    classCallCheck_default()(this, Play);

    _Play_player.set(this, void 0);

    _Play_button.set(this, void 0);

    _Play_events.set(this, {
      controls: {},
      media: {}
    });

    _Play_controlPosition.set(this, void 0);

    _Play_controlLayer.set(this, void 0);

    play_classPrivateFieldSet(this, _Play_player, player, "f");

    play_classPrivateFieldSet(this, _Play_controlPosition, position, "f");

    play_classPrivateFieldSet(this, _Play_controlLayer, layer, "f");

    this._enterSpaceKeyEvent = this._enterSpaceKeyEvent.bind(this);
  }

  createClass_default()(Play, [{
    key: "create",
    value: function create() {
      var _this = this;

      var _a;

      var _classPrivateFieldGe = play_classPrivateFieldGet(this, _Play_player, "f").getOptions(),
          labels = _classPrivateFieldGe.labels;

      play_classPrivateFieldSet(this, _Play_button, document.createElement('button'), "f");

      play_classPrivateFieldGet(this, _Play_button, "f").type = 'button';
      play_classPrivateFieldGet(this, _Play_button, "f").className = "op-controls__playpause op-control__".concat(play_classPrivateFieldGet(this, _Play_controlPosition, "f"));
      play_classPrivateFieldGet(this, _Play_button, "f").tabIndex = 0;
      play_classPrivateFieldGet(this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.play) || '';

      play_classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-controls', play_classPrivateFieldGet(this, _Play_player, "f").id);

      play_classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-pressed', 'false');

      play_classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.play) || '');

      play_classPrivateFieldGet(this, _Play_player, "f").getControls().getLayer(play_classPrivateFieldGet(this, _Play_controlLayer, "f")).appendChild(play_classPrivateFieldGet(this, _Play_button, "f"));

      play_classPrivateFieldGet(this, _Play_events, "f").button = function (e) {
        play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-pressed', 'true');

        var el = play_classPrivateFieldGet(_this, _Play_player, "f").activeElement();

        if (el.paused || el.ended) {
          if (play_classPrivateFieldGet(_this, _Play_player, "f").getAd()) {
            play_classPrivateFieldGet(_this, _Play_player, "f").getAd().playRequested = true;
          }

          el.play();

          play_classPrivateFieldGet(_this, _Play_events, "f").media.play();
        } else {
          el.pause();

          play_classPrivateFieldGet(_this, _Play_events, "f").media.pause();
        }

        e.preventDefault();
        e.stopPropagation();
      };

      var isAudioEl = isAudio(play_classPrivateFieldGet(this, _Play_player, "f").getElement());

      play_classPrivateFieldGet(this, _Play_events, "f").media.play = function () {
        var _a;

        if (play_classPrivateFieldGet(_this, _Play_player, "f").activeElement().ended) {
          if (play_classPrivateFieldGet(_this, _Play_player, "f").isMedia()) {
            play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--replay');
          } else {
            play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--pause');
          }

          play_classPrivateFieldGet(_this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.play) || '';

          play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.play) || '');
        } else {
          play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--replay');

          play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--pause');

          play_classPrivateFieldGet(_this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.pause) || '';

          play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.pause) || '');

          if ((_a = play_classPrivateFieldGet(_this, _Play_player, "f").getOptions()) === null || _a === void 0 ? void 0 : _a.pauseOthers) {
            Object.keys(player.instances).forEach(function (key) {
              if (key !== play_classPrivateFieldGet(_this, _Play_player, "f").id) {
                var target = player.instances[key].activeElement();
                target.pause();
              }
            });
          }
        }
      };

      play_classPrivateFieldGet(this, _Play_events, "f").media.loadedmetadata = function () {
        if (play_classPrivateFieldGet(_this, _Play_button, "f").classList.contains('op-controls__playpause--pause')) {
          play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--replay');

          play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--pause');

          play_classPrivateFieldGet(_this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.play) || '';

          play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.play) || '');
        }
      };

      play_classPrivateFieldGet(this, _Play_events, "f").media.playing = function () {
        if (!play_classPrivateFieldGet(_this, _Play_button, "f").classList.contains('op-controls__playpause--pause')) {
          play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--replay');

          play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--pause');

          play_classPrivateFieldGet(_this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.pause) || '';

          play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.pause) || '');
        }
      };

      play_classPrivateFieldGet(this, _Play_events, "f").media.pause = function () {
        play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--pause');

        play_classPrivateFieldGet(_this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.play) || '';

        play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.play) || '');
      };

      play_classPrivateFieldGet(this, _Play_events, "f").media.ended = function () {
        if (play_classPrivateFieldGet(_this, _Play_player, "f").activeElement().ended && play_classPrivateFieldGet(_this, _Play_player, "f").isMedia()) {
          play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--replay');

          play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--pause');
        } else if (play_classPrivateFieldGet(_this, _Play_player, "f").getElement().currentTime >= play_classPrivateFieldGet(_this, _Play_player, "f").getElement().duration || play_classPrivateFieldGet(_this, _Play_player, "f").getElement().currentTime <= 0) {
          play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--replay');

          play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--pause');
        } else {
          play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--replay');

          play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--pause');
        }

        play_classPrivateFieldGet(_this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.play) || '';

        play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.play) || '');
      };

      play_classPrivateFieldGet(this, _Play_events, "f").media.adsmediaended = function () {
        play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--replay');

        play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--pause');

        play_classPrivateFieldGet(_this, _Play_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.pause) || '';

        play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.pause) || '');
      };

      play_classPrivateFieldGet(this, _Play_events, "f").media.playererror = function () {
        if (isAudioEl) {
          var el = play_classPrivateFieldGet(_this, _Play_player, "f").activeElement();

          el.pause();
        }
      };

      var element = play_classPrivateFieldGet(this, _Play_player, "f").getElement();

      play_classPrivateFieldGet(this, _Play_events, "f").controls.controlschanged = function () {
        if (!play_classPrivateFieldGet(_this, _Play_player, "f").activeElement().paused) {
          var event = addEvent('playing');
          element.dispatchEvent(event);
        }
      };

      Object.keys(play_classPrivateFieldGet(this, _Play_events, "f").media).forEach(function (event) {
        element.addEventListener(event, play_classPrivateFieldGet(_this, _Play_events, "f").media[event], EVENT_OPTIONS);
      });

      if ((_a = play_classPrivateFieldGet(this, _Play_player, "f").getOptions().media) === null || _a === void 0 ? void 0 : _a.pauseOnClick) {
        element.addEventListener('click', play_classPrivateFieldGet(this, _Play_events, "f").button, EVENT_OPTIONS);
      }

      play_classPrivateFieldGet(this, _Play_player, "f").getControls().getContainer().addEventListener('controlschanged', play_classPrivateFieldGet(this, _Play_events, "f").controls.controlschanged, EVENT_OPTIONS);

      play_classPrivateFieldGet(this, _Play_player, "f").getContainer().addEventListener('keydown', this._enterSpaceKeyEvent, EVENT_OPTIONS);

      play_classPrivateFieldGet(this, _Play_button, "f").addEventListener('click', play_classPrivateFieldGet(this, _Play_events, "f").button, EVENT_OPTIONS);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      var _a;

      Object.keys(play_classPrivateFieldGet(this, _Play_events, "f").media).forEach(function (event) {
        play_classPrivateFieldGet(_this2, _Play_player, "f").getElement().removeEventListener(event, play_classPrivateFieldGet(_this2, _Play_events, "f").media[event]);
      });

      if ((_a = play_classPrivateFieldGet(this, _Play_player, "f").getOptions().media) === null || _a === void 0 ? void 0 : _a.pauseOnClick) {
        play_classPrivateFieldGet(this, _Play_player, "f").getElement().removeEventListener('click', play_classPrivateFieldGet(this, _Play_events, "f").button);
      }

      play_classPrivateFieldGet(this, _Play_player, "f").getControls().getContainer().removeEventListener('controlschanged', play_classPrivateFieldGet(this, _Play_events, "f").controls.controlschanged);

      play_classPrivateFieldGet(this, _Play_player, "f").getContainer().removeEventListener('keydown', this._enterSpaceKeyEvent);

      play_classPrivateFieldGet(this, _Play_button, "f").removeEventListener('click', play_classPrivateFieldGet(this, _Play_events, "f").button);

      play_classPrivateFieldGet(this, _Play_button, "f").remove();
    }
  }, {
    key: "_enterSpaceKeyEvent",
    value: function _enterSpaceKeyEvent(e) {
      var _a;

      var key = e.which || e.keyCode || 0;
      var playBtnFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-controls__playpause');

      if (playBtnFocused && (key === 13 || key === 32)) {
        play_classPrivateFieldGet(this, _Play_events, "f").button(e);
      }
    }
  }]);

  return Play;
}();

_Play_player = new WeakMap(), _Play_button = new WeakMap(), _Play_events = new WeakMap(), _Play_controlPosition = new WeakMap(), _Play_controlLayer = new WeakMap();
/* harmony default export */ const play = (Play);
;// CONCATENATED MODULE: ./src/js/controls/progress.ts



var progress_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var progress_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Progress_player, _Progress_progress, _Progress_slider, _Progress_buffer, _Progress_played, _Progress_tooltip, _Progress_events, _Progress_forcePause, _Progress_controlPosition, _Progress_controlLayer;





var Progress = function () {
  function Progress(player, position, layer) {
    classCallCheck_default()(this, Progress);

    _Progress_player.set(this, void 0);

    _Progress_progress.set(this, void 0);

    _Progress_slider.set(this, void 0);

    _Progress_buffer.set(this, void 0);

    _Progress_played.set(this, void 0);

    _Progress_tooltip.set(this, void 0);

    _Progress_events.set(this, {
      container: {},
      controls: {},
      global: {},
      media: {},
      slider: {}
    });

    _Progress_forcePause.set(this, false);

    _Progress_controlPosition.set(this, void 0);

    _Progress_controlLayer.set(this, void 0);

    progress_classPrivateFieldSet(this, _Progress_player, player, "f");

    progress_classPrivateFieldSet(this, _Progress_controlPosition, position, "f");

    progress_classPrivateFieldSet(this, _Progress_controlLayer, layer, "f");

    this._enterSpaceKeyEvent = this._enterSpaceKeyEvent.bind(this);
  }

  createClass_default()(Progress, [{
    key: "create",
    value: function create() {
      var _this = this;

      var _a;

      var _classPrivateFieldGe = progress_classPrivateFieldGet(this, _Progress_player, "f").getOptions(),
          labels = _classPrivateFieldGe.labels,
          progress = _classPrivateFieldGe.progress;

      progress_classPrivateFieldSet(this, _Progress_progress, document.createElement('div'), "f");

      progress_classPrivateFieldGet(this, _Progress_progress, "f").className = "op-controls__progress op-control__".concat(progress_classPrivateFieldGet(this, _Progress_controlPosition, "f"));
      progress_classPrivateFieldGet(this, _Progress_progress, "f").tabIndex = 0;

      progress_classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.progressSlider) || '');

      progress_classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-valuemin', '0');

      progress_classPrivateFieldSet(this, _Progress_slider, document.createElement('input'), "f");

      progress_classPrivateFieldGet(this, _Progress_slider, "f").type = 'range';
      progress_classPrivateFieldGet(this, _Progress_slider, "f").className = 'op-controls__progress--seek';
      progress_classPrivateFieldGet(this, _Progress_slider, "f").tabIndex = -1;

      progress_classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('min', '0');

      progress_classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('max', '0');

      progress_classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('step', '0.1');

      progress_classPrivateFieldGet(this, _Progress_slider, "f").value = '0';

      progress_classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.progressRail) || '');

      progress_classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('role', 'slider');

      progress_classPrivateFieldSet(this, _Progress_buffer, document.createElement('progress'), "f");

      progress_classPrivateFieldGet(this, _Progress_buffer, "f").className = 'op-controls__progress--buffer';

      progress_classPrivateFieldGet(this, _Progress_buffer, "f").setAttribute('max', '100');

      progress_classPrivateFieldGet(this, _Progress_buffer, "f").value = 0;

      progress_classPrivateFieldSet(this, _Progress_played, document.createElement('progress'), "f");

      progress_classPrivateFieldGet(this, _Progress_played, "f").className = 'op-controls__progress--played';

      progress_classPrivateFieldGet(this, _Progress_played, "f").setAttribute('max', '100');

      progress_classPrivateFieldGet(this, _Progress_played, "f").setAttribute('role', 'presentation');

      progress_classPrivateFieldGet(this, _Progress_played, "f").value = 0;

      progress_classPrivateFieldGet(this, _Progress_progress, "f").appendChild(progress_classPrivateFieldGet(this, _Progress_slider, "f"));

      progress_classPrivateFieldGet(this, _Progress_progress, "f").appendChild(progress_classPrivateFieldGet(this, _Progress_played, "f"));

      progress_classPrivateFieldGet(this, _Progress_progress, "f").appendChild(progress_classPrivateFieldGet(this, _Progress_buffer, "f"));

      if (!IS_IOS && !IS_ANDROID) {
        progress_classPrivateFieldSet(this, _Progress_tooltip, document.createElement('span'), "f");

        progress_classPrivateFieldGet(this, _Progress_tooltip, "f").className = 'op-controls__tooltip';
        progress_classPrivateFieldGet(this, _Progress_tooltip, "f").tabIndex = -1;
        progress_classPrivateFieldGet(this, _Progress_tooltip, "f").innerHTML = '00:00';

        progress_classPrivateFieldGet(this, _Progress_progress, "f").appendChild(progress_classPrivateFieldGet(this, _Progress_tooltip, "f"));
      }

      var setInitialProgress = function setInitialProgress() {
        var _a;

        if (progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.contains('error')) {
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.remove('error');
        }

        var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

        if (el.duration !== Infinity && !progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-live__enabled') && !progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled')) {
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").setAttribute('max', "".concat(el.duration));

          var current = progress_classPrivateFieldGet(_this, _Progress_player, "f").isMedia() ? el.currentTime : el.duration - el.currentTime;
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").value = current.toString();

          progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-valuemax', el.duration.toString());
        } else if (progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled')) {
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").setAttribute('max', '1');

          progress_classPrivateFieldGet(_this, _Progress_slider, "f").value = '1';
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").style.backgroundSize = '100% 100%';
          progress_classPrivateFieldGet(_this, _Progress_played, "f").value = 1;

          progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-valuemax', '1');

          progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-hidden', 'false');
        } else if (!((_a = progress_classPrivateFieldGet(_this, _Progress_player, "f").getOptions().live) === null || _a === void 0 ? void 0 : _a.showProgress)) {
          progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-hidden', 'true');
        }
      };

      var lastCurrentTime = 0;
      var defaultDuration = ((_a = progress_classPrivateFieldGet(this, _Progress_player, "f").getOptions().progress) === null || _a === void 0 ? void 0 : _a.duration) || 0;
      var isAudioEl = isAudio(progress_classPrivateFieldGet(this, _Progress_player, "f").getElement());
      progress_classPrivateFieldGet(this, _Progress_events, "f").media.loadedmetadata = setInitialProgress.bind(this);
      progress_classPrivateFieldGet(this, _Progress_events, "f").controls.controlschanged = setInitialProgress.bind(this);

      progress_classPrivateFieldGet(this, _Progress_events, "f").media.progress = function (e) {
        var _a;

        var el = e.target;

        if (el.duration !== Infinity && !progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-live__enabled')) {
          if (el.duration > 0) {
            for (var i = 0, total = el.buffered.length; i < total; i++) {
              if (el.buffered.start(el.buffered.length - 1 - i) < el.currentTime) {
                progress_classPrivateFieldGet(_this, _Progress_buffer, "f").value = el.buffered.end(el.buffered.length - 1 - i) / el.duration * 100;
                break;
              }
            }
          }
        } else if (!progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled') && progress_classPrivateFieldGet(_this, _Progress_progress, "f").getAttribute('aria-hidden') === 'false' && !((_a = progress_classPrivateFieldGet(_this, _Progress_player, "f").getOptions().live) === null || _a === void 0 ? void 0 : _a.showProgress)) {
          progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-hidden', 'true');
        }
      };

      progress_classPrivateFieldGet(this, _Progress_events, "f").media.waiting = function () {
        if (isAudioEl && !progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.contains('loading')) {
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.add('loading');
        }

        if (isAudioEl && progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.contains('error')) {
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.remove('error');
        }
      };

      progress_classPrivateFieldGet(this, _Progress_events, "f").media.playererror = function () {
        if (isAudioEl && !progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.contains('error')) {
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.add('error');
        }

        if (isAudioEl && progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.contains('loading')) {
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.remove('loading');
        }
      };

      progress_classPrivateFieldGet(this, _Progress_events, "f").media.pause = function () {
        var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

        if (el.duration !== Infinity && !progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-live__enabled')) {
          var current = el.currentTime;

          progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-valuenow', current.toString());

          progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-valuetext', formatTime(current));
        }
      };

      progress_classPrivateFieldGet(this, _Progress_events, "f").media.play = function () {
        if (isAudioEl && progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.contains('loading')) {
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.remove('loading');
        }

        if (isAudioEl && progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.contains('error')) {
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.remove('error');
        }

        if (progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement().duration !== Infinity && !progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-live__enabled')) {
          progress_classPrivateFieldGet(_this, _Progress_progress, "f").removeAttribute('aria-valuenow');

          progress_classPrivateFieldGet(_this, _Progress_progress, "f").removeAttribute('aria-valuetext');
        }
      };

      progress_classPrivateFieldGet(this, _Progress_events, "f").media.playing = function () {
        if (isAudioEl && progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.contains('loading')) {
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.remove('loading');
        }

        if (isAudioEl && progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.contains('error')) {
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.remove('error');
        }
      };

      progress_classPrivateFieldGet(this, _Progress_events, "f").media.timeupdate = function () {
        var _a;

        var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

        if (el.duration !== Infinity && (!progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-live__enabled') || progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled'))) {
          if (!progress_classPrivateFieldGet(_this, _Progress_slider, "f").getAttribute('max') || progress_classPrivateFieldGet(_this, _Progress_slider, "f").getAttribute('max') === '0' || parseFloat(progress_classPrivateFieldGet(_this, _Progress_slider, "f").getAttribute('max') || '-1') !== el.duration) {
            progress_classPrivateFieldGet(_this, _Progress_slider, "f").setAttribute('max', "".concat(el.duration));

            progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-hidden', 'false');
          }

          var duration = el.duration - el.currentTime + 1 >= 100 ? 100 : el.duration - el.currentTime + 1;
          var current = progress_classPrivateFieldGet(_this, _Progress_player, "f").isMedia() ? el.currentTime : duration;
          var min = parseFloat(progress_classPrivateFieldGet(_this, _Progress_slider, "f").min);
          var max = parseFloat(progress_classPrivateFieldGet(_this, _Progress_slider, "f").max);
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").value = current.toString();
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").style.backgroundSize = "".concat((current - min) * 100 / (max - min), "% 100%");
          progress_classPrivateFieldGet(_this, _Progress_played, "f").value = el.duration <= 0 || Number.isNaN(el.duration) || !Number.isFinite(el.duration) ? defaultDuration : current / el.duration * 100;

          if (progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled') && Math.floor(progress_classPrivateFieldGet(_this, _Progress_played, "f").value) >= 99) {
            lastCurrentTime = el.currentTime;

            progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-hidden', 'false');
          }
        } else if (!progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled') && progress_classPrivateFieldGet(_this, _Progress_progress, "f").getAttribute('aria-hidden') === 'false' && !((_a = progress_classPrivateFieldGet(_this, _Progress_player, "f").getOptions().live) === null || _a === void 0 ? void 0 : _a.showProgress)) {
          progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-hidden', 'true');
        }
      };

      progress_classPrivateFieldGet(this, _Progress_events, "f").media.durationchange = function () {
        var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

        var current = progress_classPrivateFieldGet(_this, _Progress_player, "f").isMedia() ? el.currentTime : el.duration - el.currentTime;

        progress_classPrivateFieldGet(_this, _Progress_slider, "f").setAttribute('max', "".concat(el.duration));

        progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-valuemax', el.duration.toString());

        progress_classPrivateFieldGet(_this, _Progress_played, "f").value = el.duration <= 0 || Number.isNaN(el.duration) || !Number.isFinite(el.duration) ? defaultDuration : current / el.duration * 100;
      };

      progress_classPrivateFieldGet(this, _Progress_events, "f").media.ended = function () {
        progress_classPrivateFieldGet(_this, _Progress_slider, "f").style.backgroundSize = '0% 100%';

        progress_classPrivateFieldGet(_this, _Progress_slider, "f").setAttribute('max', '0');

        progress_classPrivateFieldGet(_this, _Progress_buffer, "f").value = 0;
        progress_classPrivateFieldGet(_this, _Progress_played, "f").value = 0;
      };

      var updateSlider = function updateSlider(e) {
        var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

        var target = e.target;
        var value = parseFloat(target.value);

        if (progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.contains('op-progress--pressed') || value < el.currentTime && !(progress === null || progress === void 0 ? void 0 : progress.allowRewind) || value > el.currentTime && !(progress === null || progress === void 0 ? void 0 : progress.allowSkip)) {
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").value = el.currentTime.toString();
          return;
        }

        progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.add('.op-progress--pressed');

        var min = parseFloat(target.min);
        var max = parseFloat(target.max);
        var val = parseFloat(target.value);
        progress_classPrivateFieldGet(_this, _Progress_slider, "f").style.backgroundSize = "".concat((val - min) * 100 / (max - min), "% 100%");
        progress_classPrivateFieldGet(_this, _Progress_played, "f").value = el.duration <= 0 || Number.isNaN(el.duration) || !Number.isFinite(el.duration) ? defaultDuration : val / el.duration * 100;

        if (progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled')) {
          el.currentTime = Math.round(progress_classPrivateFieldGet(_this, _Progress_played, "f").value) >= 99 ? lastCurrentTime : val;
        } else {
          el.currentTime = val;
        }

        progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.remove('.op-progress--pressed');
      };

      var forcePause = function forcePause(e) {
        var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

        var key = e.which || e.keyCode || 0;

        var target = progress_classPrivateFieldGet(_this, _Progress_slider, "f");

        var value = Math.round(Number(target.value));
        var current = Math.round(el.currentTime);
        var isProgressManipulationAllowed = value < current && (progress === null || progress === void 0 ? void 0 : progress.allowRewind) || value >= current && (progress === null || progress === void 0 ? void 0 : progress.allowSkip);

        if (isProgressManipulationAllowed && (key === 1 || key === 0) && progress_classPrivateFieldGet(_this, _Progress_player, "f").isMedia() && !el.paused) {
          el.pause();

          progress_classPrivateFieldSet(_this, _Progress_forcePause, true, "f");
        }
      };

      var releasePause = function releasePause() {
        var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

        if (progress_classPrivateFieldGet(_this, _Progress_forcePause, "f") === true && progress_classPrivateFieldGet(_this, _Progress_player, "f").isMedia()) {
          if (el.paused) {
            el.play();

            progress_classPrivateFieldSet(_this, _Progress_forcePause, false, "f");
          }
        }
      };

      var mobileForcePause = function mobileForcePause(e) {
        var _a;

        var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

        if (el.duration !== Infinity) {
          var changedTouches = e.changedTouches;
          var x = ((_a = changedTouches[0]) === null || _a === void 0 ? void 0 : _a.pageX) || 0;
          var pos = x - offset(progress_classPrivateFieldGet(_this, _Progress_progress, "f")).left;

          var percentage = pos / progress_classPrivateFieldGet(_this, _Progress_progress, "f").offsetWidth;

          var time = percentage * el.duration;

          if (time < el.currentTime && (progress === null || progress === void 0 ? void 0 : progress.allowRewind) || time > el.currentTime && (progress === null || progress === void 0 ? void 0 : progress.allowSkip)) {
            progress_classPrivateFieldGet(_this, _Progress_slider, "f").value = time.toString();
            updateSlider(e);

            if (!el.paused) {
              el.pause();

              progress_classPrivateFieldSet(_this, _Progress_forcePause, true, "f");
            }
          }
        }
      };

      progress_classPrivateFieldGet(this, _Progress_events, "f").slider.input = updateSlider.bind(this);
      progress_classPrivateFieldGet(this, _Progress_events, "f").slider.change = updateSlider.bind(this);
      progress_classPrivateFieldGet(this, _Progress_events, "f").slider.mousedown = forcePause.bind(this);
      progress_classPrivateFieldGet(this, _Progress_events, "f").slider.mouseup = releasePause.bind(this);
      progress_classPrivateFieldGet(this, _Progress_events, "f").slider.touchstart = mobileForcePause.bind(this);
      progress_classPrivateFieldGet(this, _Progress_events, "f").slider.touchend = releasePause.bind(this);

      if (!IS_IOS && !IS_ANDROID) {
        progress_classPrivateFieldGet(this, _Progress_events, "f").container.mousemove = function (e) {
          var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

          if (el.duration !== Infinity && !progress_classPrivateFieldGet(_this, _Progress_player, "f").isAd()) {
            var x = e.pageX;
            var pos = x - offset(progress_classPrivateFieldGet(_this, _Progress_progress, "f")).left;
            var half = progress_classPrivateFieldGet(_this, _Progress_tooltip, "f").offsetWidth / 2;

            var percentage = pos / progress_classPrivateFieldGet(_this, _Progress_progress, "f").offsetWidth;

            var time = percentage * el.duration;

            var mediaContainer = progress_classPrivateFieldGet(_this, _Progress_player, "f").getContainer();

            var limit = mediaContainer.offsetWidth - progress_classPrivateFieldGet(_this, _Progress_tooltip, "f").offsetWidth;

            if (pos <= 0 || x - offset(mediaContainer).left <= half) {
              pos = 0;
            } else if (x - offset(mediaContainer).left >= limit) {
              pos = limit - offset(progress_classPrivateFieldGet(_this, _Progress_slider, "f")).left - 10;
            } else {
              pos -= half;
            }

            if (percentage >= 0 && percentage <= 1) {
              progress_classPrivateFieldGet(_this, _Progress_tooltip, "f").classList.add('op-controls__tooltip--visible');
            } else {
              progress_classPrivateFieldGet(_this, _Progress_tooltip, "f").classList.remove('op-controls__tooltip--visible');
            }

            progress_classPrivateFieldGet(_this, _Progress_tooltip, "f").style.left = "".concat(pos, "px");
            progress_classPrivateFieldGet(_this, _Progress_tooltip, "f").innerHTML = Number.isNaN(time) ? '00:00' : formatTime(time);
          }
        };

        progress_classPrivateFieldGet(this, _Progress_events, "f").global.mousemove = function (e) {
          if (!e.target.closest('.op-controls__progress') || progress_classPrivateFieldGet(_this, _Progress_player, "f").isAd()) {
            progress_classPrivateFieldGet(_this, _Progress_tooltip, "f").classList.remove('op-controls__tooltip--visible');
          }
        };
      }

      Object.keys(progress_classPrivateFieldGet(this, _Progress_events, "f").media).forEach(function (event) {
        progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().addEventListener(event, progress_classPrivateFieldGet(_this, _Progress_events, "f").media[event], EVENT_OPTIONS);
      });
      Object.keys(progress_classPrivateFieldGet(this, _Progress_events, "f").slider).forEach(function (event) {
        progress_classPrivateFieldGet(_this, _Progress_slider, "f").addEventListener(event, progress_classPrivateFieldGet(_this, _Progress_events, "f").slider[event], EVENT_OPTIONS);
      });

      progress_classPrivateFieldGet(this, _Progress_progress, "f").addEventListener('keydown', progress_classPrivateFieldGet(this, _Progress_player, "f").getEvents().keydown, EVENT_OPTIONS);

      progress_classPrivateFieldGet(this, _Progress_progress, "f").addEventListener('mousemove', progress_classPrivateFieldGet(this, _Progress_events, "f").container.mousemove, EVENT_OPTIONS);

      document.addEventListener('mousemove', progress_classPrivateFieldGet(this, _Progress_events, "f").global.mousemove, EVENT_OPTIONS);

      progress_classPrivateFieldGet(this, _Progress_player, "f").getContainer().addEventListener('keydown', this._enterSpaceKeyEvent, EVENT_OPTIONS);

      progress_classPrivateFieldGet(this, _Progress_player, "f").getControls().getContainer().addEventListener('controlschanged', progress_classPrivateFieldGet(this, _Progress_events, "f").controls.controlschanged, EVENT_OPTIONS);

      progress_classPrivateFieldGet(this, _Progress_player, "f").getControls().getLayer(progress_classPrivateFieldGet(this, _Progress_controlLayer, "f")).appendChild(progress_classPrivateFieldGet(this, _Progress_progress, "f"));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      Object.keys(progress_classPrivateFieldGet(this, _Progress_events, "f")).forEach(function (event) {
        progress_classPrivateFieldGet(_this2, _Progress_player, "f").getElement().removeEventListener(event, progress_classPrivateFieldGet(_this2, _Progress_events, "f")[event]);
      });
      Object.keys(progress_classPrivateFieldGet(this, _Progress_events, "f").slider).forEach(function (event) {
        progress_classPrivateFieldGet(_this2, _Progress_slider, "f").removeEventListener(event, progress_classPrivateFieldGet(_this2, _Progress_events, "f").slider[event]);
      });

      progress_classPrivateFieldGet(this, _Progress_progress, "f").removeEventListener('keydown', progress_classPrivateFieldGet(this, _Progress_player, "f").getEvents().keydown);

      progress_classPrivateFieldGet(this, _Progress_progress, "f").removeEventListener('mousemove', progress_classPrivateFieldGet(this, _Progress_events, "f").container.mousemove);

      document.removeEventListener('mousemove', progress_classPrivateFieldGet(this, _Progress_events, "f").global.mousemove);

      progress_classPrivateFieldGet(this, _Progress_player, "f").getContainer().removeEventListener('keydown', this._enterSpaceKeyEvent);

      progress_classPrivateFieldGet(this, _Progress_player, "f").getControls().getContainer().removeEventListener('controlschanged', progress_classPrivateFieldGet(this, _Progress_events, "f").controls.controlschanged);

      progress_classPrivateFieldGet(this, _Progress_buffer, "f").remove();

      progress_classPrivateFieldGet(this, _Progress_played, "f").remove();

      progress_classPrivateFieldGet(this, _Progress_slider, "f").remove();

      if (!IS_IOS && !IS_ANDROID) {
        progress_classPrivateFieldGet(this, _Progress_tooltip, "f").remove();
      }

      progress_classPrivateFieldGet(this, _Progress_progress, "f").remove();
    }
  }, {
    key: "_enterSpaceKeyEvent",
    value: function _enterSpaceKeyEvent(e) {
      var el = progress_classPrivateFieldGet(this, _Progress_player, "f").activeElement();

      var isAd = progress_classPrivateFieldGet(this, _Progress_player, "f").isAd();

      var key = e.which || e.keyCode || 0;

      if (!isAd && key >= 48 && key <= 57 && el.duration !== Infinity) {
        var step = 0;

        for (var i = 48, limit = 57; i <= limit; i++) {
          if (i < key) {
            step++;
          }
        }

        el.currentTime = el.duration * (0.1 * step);
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }]);

  return Progress;
}();

_Progress_player = new WeakMap(), _Progress_progress = new WeakMap(), _Progress_slider = new WeakMap(), _Progress_buffer = new WeakMap(), _Progress_played = new WeakMap(), _Progress_tooltip = new WeakMap(), _Progress_events = new WeakMap(), _Progress_forcePause = new WeakMap(), _Progress_controlPosition = new WeakMap(), _Progress_controlLayer = new WeakMap();
/* harmony default export */ const progress = (Progress);
;// CONCATENATED MODULE: ./src/js/controls/settings.ts



var settings_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var settings_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Settings_player, _Settings_submenu, _Settings_button, _Settings_menu, _Settings_events, _Settings_originalOutput, _Settings_controlPosition, _Settings_controlLayer;




var Settings = function () {
  function Settings(player, position, layer) {
    classCallCheck_default()(this, Settings);

    _Settings_player.set(this, void 0);

    _Settings_submenu.set(this, {});

    _Settings_button.set(this, void 0);

    _Settings_menu.set(this, void 0);

    _Settings_events.set(this, {
      global: {},
      media: {}
    });

    _Settings_originalOutput.set(this, '');

    _Settings_controlPosition.set(this, void 0);

    _Settings_controlLayer.set(this, void 0);

    settings_classPrivateFieldSet(this, _Settings_player, player, "f");

    settings_classPrivateFieldSet(this, _Settings_controlPosition, position, "f");

    settings_classPrivateFieldSet(this, _Settings_controlLayer, layer, "f");

    this._enterSpaceKeyEvent = this._enterSpaceKeyEvent.bind(this);
  }

  createClass_default()(Settings, [{
    key: "create",
    value: function create() {
      var _this = this;

      var _classPrivateFieldGe = settings_classPrivateFieldGet(this, _Settings_player, "f").getOptions(),
          labels = _classPrivateFieldGe.labels;

      settings_classPrivateFieldSet(this, _Settings_button, document.createElement('button'), "f");

      settings_classPrivateFieldGet(this, _Settings_button, "f").className = "op-controls__settings op-control__".concat(settings_classPrivateFieldGet(this, _Settings_controlPosition, "f"));
      settings_classPrivateFieldGet(this, _Settings_button, "f").tabIndex = 0;
      settings_classPrivateFieldGet(this, _Settings_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.settings) || '';

      settings_classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-controls', settings_classPrivateFieldGet(this, _Settings_player, "f").id);

      settings_classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-pressed', 'false');

      settings_classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.settings) || '');

      settings_classPrivateFieldSet(this, _Settings_menu, document.createElement('div'), "f");

      settings_classPrivateFieldGet(this, _Settings_menu, "f").className = 'op-settings';

      settings_classPrivateFieldGet(this, _Settings_menu, "f").setAttribute('aria-hidden', 'true');

      settings_classPrivateFieldGet(this, _Settings_menu, "f").innerHTML = '<div class="op-settings__menu" role="menu"></div>';

      this.clickEvent = function () {
        settings_classPrivateFieldGet(_this, _Settings_button, "f").setAttribute('aria-pressed', 'true');

        var menus = settings_classPrivateFieldGet(_this, _Settings_player, "f").getContainer().querySelectorAll('.op-settings');

        for (var i = 0, total = menus.length; i < total; ++i) {
          if (menus[i] !== settings_classPrivateFieldGet(_this, _Settings_menu, "f")) {
            menus[i].setAttribute('aria-hidden', 'true');
          }
        }

        settings_classPrivateFieldGet(_this, _Settings_menu, "f").setAttribute('aria-hidden', settings_classPrivateFieldGet(_this, _Settings_menu, "f").getAttribute('aria-hidden') === 'false' ? 'true' : 'false');
      };

      this.hideEvent = function () {
        var timeout;

        if (timeout && typeof window !== 'undefined') {
          window.cancelAnimationFrame(timeout);
        }

        if (typeof window !== 'undefined') {
          timeout = window.requestAnimationFrame(function () {
            settings_classPrivateFieldGet(_this, _Settings_menu, "f").innerHTML = settings_classPrivateFieldGet(_this, _Settings_originalOutput, "f");

            settings_classPrivateFieldGet(_this, _Settings_menu, "f").setAttribute('aria-hidden', 'true');
          });
        }
      };

      this.removeEvent = function (e) {
        var _e$detail = e.detail,
            id = _e$detail.id,
            type = _e$detail.type;

        _this.removeItem(id, type);
      };

      this.clickEvent = this.clickEvent.bind(this);
      this.hideEvent = this.hideEvent.bind(this);
      this.removeEvent = this.removeEvent.bind(this);
      settings_classPrivateFieldGet(this, _Settings_events, "f").media.controlshidden = this.hideEvent.bind(this);
      settings_classPrivateFieldGet(this, _Settings_events, "f").media.settingremoved = this.removeEvent.bind(this);
      settings_classPrivateFieldGet(this, _Settings_events, "f").media.play = this.hideEvent.bind(this);
      settings_classPrivateFieldGet(this, _Settings_events, "f").media.pause = this.hideEvent.bind(this);

      settings_classPrivateFieldGet(this, _Settings_player, "f").getContainer().addEventListener('keydown', this._enterSpaceKeyEvent, EVENT_OPTIONS);

      settings_classPrivateFieldGet(this, _Settings_events, "f").global.click = function (e) {
        var target = e.target;
        var current = target;

        if ((current === null || current === void 0 ? void 0 : current.closest("#".concat(settings_classPrivateFieldGet(_this, _Settings_player, "f").id))) && (current === null || current === void 0 ? void 0 : current.classList.contains('op-speed__option'))) {
          var level = (current === null || current === void 0 ? void 0 : current.getAttribute('data-value')) || '';
          settings_classPrivateFieldGet(_this, _Settings_player, "f").getMedia().playbackRate = parseFloat(level.replace('speed-', ''));
        }
      };

      settings_classPrivateFieldGet(this, _Settings_events, "f").global.resize = this.hideEvent.bind(this);

      settings_classPrivateFieldGet(this, _Settings_button, "f").addEventListener('click', this.clickEvent, EVENT_OPTIONS);

      Object.keys(settings_classPrivateFieldGet(this, _Settings_events, "f")).forEach(function (event) {
        settings_classPrivateFieldGet(_this, _Settings_player, "f").getElement().addEventListener(event, settings_classPrivateFieldGet(_this, _Settings_events, "f").media[event], EVENT_OPTIONS);
      });
      document.addEventListener('click', settings_classPrivateFieldGet(this, _Settings_events, "f").global.click, EVENT_OPTIONS);
      document.addEventListener('keydown', settings_classPrivateFieldGet(this, _Settings_events, "f").global.click, EVENT_OPTIONS);

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', settings_classPrivateFieldGet(this, _Settings_events, "f").global.resize, EVENT_OPTIONS);
      }

      settings_classPrivateFieldGet(this, _Settings_player, "f").getControls().getLayer(settings_classPrivateFieldGet(this, _Settings_controlLayer, "f")).appendChild(settings_classPrivateFieldGet(this, _Settings_button, "f"));

      settings_classPrivateFieldGet(this, _Settings_player, "f").getContainer().appendChild(settings_classPrivateFieldGet(this, _Settings_menu, "f"));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      settings_classPrivateFieldGet(this, _Settings_button, "f").removeEventListener('click', this.clickEvent);

      Object.keys(settings_classPrivateFieldGet(this, _Settings_events, "f")).forEach(function (event) {
        settings_classPrivateFieldGet(_this2, _Settings_player, "f").getElement().removeEventListener(event, settings_classPrivateFieldGet(_this2, _Settings_events, "f").media[event]);
      });
      document.removeEventListener('click', settings_classPrivateFieldGet(this, _Settings_events, "f").global.click);
      document.removeEventListener('keydown', settings_classPrivateFieldGet(this, _Settings_events, "f").global.click);

      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', settings_classPrivateFieldGet(this, _Settings_events, "f").global.resize);
      }

      if (settings_classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu'] !== undefined) {
        document.removeEventListener('click', settings_classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu']);

        settings_classPrivateFieldGet(this, _Settings_player, "f").getElement().removeEventListener('controlshidden', this.hideEvent);
      }

      settings_classPrivateFieldGet(this, _Settings_player, "f").getContainer().removeEventListener('keydown', this._enterSpaceKeyEvent);

      settings_classPrivateFieldGet(this, _Settings_menu, "f").remove();

      settings_classPrivateFieldGet(this, _Settings_button, "f").remove();
    }
  }, {
    key: "addSettings",
    value: function addSettings() {
      var media = settings_classPrivateFieldGet(this, _Settings_player, "f").getMedia();

      var _classPrivateFieldGe2 = settings_classPrivateFieldGet(this, _Settings_player, "f").getOptions(),
          labels = _classPrivateFieldGe2.labels;

      var rate = 1;

      if (settings_classPrivateFieldGet(this, _Settings_player, "f") && media) {
        rate = media.defaultPlaybackRate !== media.playbackRate ? media.playbackRate : media.defaultPlaybackRate;
      }

      return {
        className: 'op-speed__option',
        default: rate.toString(),
        key: 'speed',
        name: (labels === null || labels === void 0 ? void 0 : labels.speed) || '',
        subitems: [{
          key: '0.25',
          label: '0.25'
        }, {
          key: '0.5',
          label: '0.5'
        }, {
          key: '0.75',
          label: '0.75'
        }, {
          key: '1',
          label: (labels === null || labels === void 0 ? void 0 : labels.speedNormal) || ''
        }, {
          key: '1.25',
          label: '1.25'
        }, {
          key: '1.5',
          label: '1.5'
        }, {
          key: '2',
          label: '2'
        }]
      };
    }
  }, {
    key: "addItem",
    value: function addItem(name, key, defaultValue, submenu, className) {
      var _this3 = this;

      var dataValue = "".concat(key, "-").concat(sanitize(defaultValue, true));
      var menuItem = document.createElement('div');
      menuItem.className = 'op-settings__menu-item';
      menuItem.tabIndex = 0;
      menuItem.setAttribute('role', 'menuitemradio');
      menuItem.innerHTML = "<div class=\"op-settings__menu-label\" data-value=\"".concat(dataValue, "\">").concat(name, "</div>");
      var submenuMatch = submenu ? submenu.find(function (x) {
        return x.key === defaultValue;
      }) : null;

      if (submenuMatch) {
        menuItem.innerHTML += "<div class=\"op-settings__menu-content\" tabindex=\"0\">".concat(submenuMatch.label, "</div>");
      }

      var mainMenu = settings_classPrivateFieldGet(this, _Settings_menu, "f").querySelector('.op-settings__menu');

      if (mainMenu) {
        mainMenu.appendChild(menuItem);
      }

      settings_classPrivateFieldSet(this, _Settings_originalOutput, settings_classPrivateFieldGet(this, _Settings_menu, "f").innerHTML, "f");

      if (submenu) {
        var subItems = "\n                <div class=\"op-settings__header\">\n                    <button type=\"button\" class=\"op-settings__back\" tabindex=\"0\">".concat(name, "</button>\n                </div>\n                <div class=\"op-settings__menu\" role=\"menu\" id=\"menu-item-").concat(key, "\">\n                    ").concat(submenu.map(function (item) {
          return "\n                    <div class=\"op-settings__submenu-item\" role=\"menuitemradio\" aria-checked=\"".concat(defaultValue === item.key ? 'true' : 'false', "\">\n                        <div class=\"op-settings__submenu-label ").concat(className || '', "\" tabindex=\"0\" data-value=\"").concat(key, "-").concat(item.key, "\">\n                            ").concat(item.label, "\n                        </div>\n                    </div>");
        }).join(''), "\n                </div>");
        settings_classPrivateFieldGet(this, _Settings_submenu, "f")[key] = subItems;
      }

      settings_classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu'] = function (e) {
        var target = e.target;

        if (target.closest("#".concat(settings_classPrivateFieldGet(_this3, _Settings_player, "f").id))) {
          if (target.classList.contains('op-settings__back')) {
            settings_classPrivateFieldGet(_this3, _Settings_menu, "f").classList.add('op-settings--sliding');

            setTimeout(function () {
              settings_classPrivateFieldGet(_this3, _Settings_menu, "f").innerHTML = settings_classPrivateFieldGet(_this3, _Settings_originalOutput, "f");

              settings_classPrivateFieldGet(_this3, _Settings_menu, "f").classList.remove('op-settings--sliding');
            }, 100);
          } else if (target.classList.contains('op-settings__menu-content')) {
            var labelEl = target.parentElement ? target.parentElement.querySelector('.op-settings__menu-label') : null;
            var label = labelEl ? labelEl.getAttribute('data-value') : null;
            var fragments = label ? label.split('-') : [];

            if (fragments.length > 0) {
              fragments.pop();
              var current = fragments.join('-').replace(/^\-|\-$/, '');

              if (typeof settings_classPrivateFieldGet(_this3, _Settings_submenu, "f")[current] !== 'undefined') {
                settings_classPrivateFieldGet(_this3, _Settings_menu, "f").classList.add('op-settings--sliding');

                setTimeout(function () {
                  settings_classPrivateFieldGet(_this3, _Settings_menu, "f").innerHTML = settings_classPrivateFieldGet(_this3, _Settings_submenu, "f")[current];

                  settings_classPrivateFieldGet(_this3, _Settings_menu, "f").classList.remove('op-settings--sliding');
                }, 100);
              }
            }
          } else if (target.classList.contains('op-settings__submenu-label')) {
            var _current = target.getAttribute('data-value');

            var value = _current ? _current.replace("".concat(key, "-"), '') : '';
            var _label = target.innerText;

            var menuTarget = settings_classPrivateFieldGet(_this3, _Settings_menu, "f").querySelector("#menu-item-".concat(key, " .op-settings__submenu-item[aria-checked=true]"));

            if (menuTarget) {
              menuTarget.setAttribute('aria-checked', 'false');

              if (target.parentElement) {
                target.parentElement.setAttribute('aria-checked', 'true');
              }

              settings_classPrivateFieldGet(_this3, _Settings_submenu, "f")[key] = settings_classPrivateFieldGet(_this3, _Settings_menu, "f").innerHTML;

              settings_classPrivateFieldGet(_this3, _Settings_menu, "f").classList.add('op-settings--sliding');

              setTimeout(function () {
                settings_classPrivateFieldGet(_this3, _Settings_menu, "f").innerHTML = settings_classPrivateFieldGet(_this3, _Settings_originalOutput, "f");

                var prev = settings_classPrivateFieldGet(_this3, _Settings_menu, "f").querySelector(".op-settings__menu-label[data-value=\"".concat(key, "-").concat(defaultValue, "\"]"));

                if (prev) {
                  prev.setAttribute('data-value', "".concat(_current));

                  if (prev.nextElementSibling) {
                    prev.nextElementSibling.textContent = _label;
                  }
                }

                defaultValue = value;

                settings_classPrivateFieldSet(_this3, _Settings_originalOutput, settings_classPrivateFieldGet(_this3, _Settings_menu, "f").innerHTML, "f");

                settings_classPrivateFieldGet(_this3, _Settings_menu, "f").classList.remove('op-settings--sliding');
              }, 100);
            }
          }
        } else {
          _this3.hideEvent();
        }
      };

      document.addEventListener('click', settings_classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu'], EVENT_OPTIONS);

      settings_classPrivateFieldGet(this, _Settings_player, "f").getElement().addEventListener('controlshidden', this.hideEvent, EVENT_OPTIONS);
    }
  }, {
    key: "removeItem",
    value: function removeItem(id, type) {
      var minItems = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

      var target = settings_classPrivateFieldGet(this, _Settings_player, "f").getElement().querySelector(".op-settings__submenu-label[data-value=".concat(type, "-").concat(id, "]"));

      if (target) {
        target.remove();
      }

      if (settings_classPrivateFieldGet(this, _Settings_player, "f").getElement().querySelectorAll(".op-settings__submenu-label[data-value^=".concat(type, "]")).length < minItems) {
        delete settings_classPrivateFieldGet(this, _Settings_submenu, "f")[type];

        var label = settings_classPrivateFieldGet(this, _Settings_player, "f").getElement().querySelector(".op-settings__menu-label[data-value^=".concat(type, "]"));

        var menuItem = label ? label.closest('.op-settings__menu-item') : null;

        if (menuItem) {
          menuItem.remove();
        }
      }
    }
  }, {
    key: "_enterSpaceKeyEvent",
    value: function _enterSpaceKeyEvent(e) {
      var _a, _b, _c, _d;

      var key = e.which || e.keyCode || 0;

      var isAd = settings_classPrivateFieldGet(this, _Settings_player, "f").isAd();

      var settingsBtnFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-controls__settings');
      var menuFocused = ((_b = document === null || document === void 0 ? void 0 : document.activeElement) === null || _b === void 0 ? void 0 : _b.classList.contains('op-settings__menu-content')) || ((_c = document === null || document === void 0 ? void 0 : document.activeElement) === null || _c === void 0 ? void 0 : _c.classList.contains('op-settings__back')) || ((_d = document === null || document === void 0 ? void 0 : document.activeElement) === null || _d === void 0 ? void 0 : _d.classList.contains('op-settings__submenu-label'));

      if (!isAd) {
        if (settingsBtnFocused && (key === 13 || key === 32)) {
          this.clickEvent();
          e.preventDefault();
          e.stopPropagation();
        } else if (menuFocused && (key === 13 || key === 32)) {
          settings_classPrivateFieldGet(this, _Settings_events, "f").global['settings.submenu'](e);

          e.preventDefault();
          e.stopPropagation();
        }
      }
    }
  }]);

  return Settings;
}();

_Settings_player = new WeakMap(), _Settings_submenu = new WeakMap(), _Settings_button = new WeakMap(), _Settings_menu = new WeakMap(), _Settings_events = new WeakMap(), _Settings_originalOutput = new WeakMap(), _Settings_controlPosition = new WeakMap(), _Settings_controlLayer = new WeakMap();
/* harmony default export */ const settings = (Settings);
;// CONCATENATED MODULE: ./src/js/controls/time.ts



var time_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var time_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Time_player, _Time_currentTime, _Time_delimiter, _Time_duration, _Time_container, _Time_events, _Time_controlPosition, _Time_controlLayer;




var Time = function () {
  function Time(player, position, layer) {
    classCallCheck_default()(this, Time);

    _Time_player.set(this, void 0);

    _Time_currentTime.set(this, void 0);

    _Time_delimiter.set(this, void 0);

    _Time_duration.set(this, void 0);

    _Time_container.set(this, void 0);

    _Time_events.set(this, {
      controls: {},
      media: {}
    });

    _Time_controlPosition.set(this, void 0);

    _Time_controlLayer.set(this, void 0);

    time_classPrivateFieldSet(this, _Time_player, player, "f");

    time_classPrivateFieldSet(this, _Time_controlPosition, position, "f");

    time_classPrivateFieldSet(this, _Time_controlLayer, layer, "f");
  }

  createClass_default()(Time, [{
    key: "create",
    value: function create() {
      var _this = this;

      var _classPrivateFieldGe = time_classPrivateFieldGet(this, _Time_player, "f").getOptions(),
          labels = _classPrivateFieldGe.labels,
          progress = _classPrivateFieldGe.progress;

      time_classPrivateFieldSet(this, _Time_currentTime, document.createElement('time'), "f");

      time_classPrivateFieldGet(this, _Time_currentTime, "f").className = 'op-controls__current';

      time_classPrivateFieldGet(this, _Time_currentTime, "f").setAttribute('role', 'timer');

      time_classPrivateFieldGet(this, _Time_currentTime, "f").setAttribute('aria-live', 'off');

      time_classPrivateFieldGet(this, _Time_currentTime, "f").setAttribute('aria-hidden', 'false');

      time_classPrivateFieldGet(this, _Time_currentTime, "f").innerText = '0:00';
      var showOnlyCurrent = (progress === null || progress === void 0 ? void 0 : progress.showCurrentTimeOnly) || false;

      if (!showOnlyCurrent) {
        time_classPrivateFieldSet(this, _Time_delimiter, document.createElement('span'), "f");

        time_classPrivateFieldGet(this, _Time_delimiter, "f").className = 'op-controls__time-delimiter';

        time_classPrivateFieldGet(this, _Time_delimiter, "f").setAttribute('aria-hidden', 'false');

        time_classPrivateFieldGet(this, _Time_delimiter, "f").innerText = '/';

        time_classPrivateFieldSet(this, _Time_duration, document.createElement('time'), "f");

        time_classPrivateFieldGet(this, _Time_duration, "f").className = 'op-controls__duration';

        time_classPrivateFieldGet(this, _Time_duration, "f").setAttribute('aria-hidden', 'false');

        time_classPrivateFieldGet(this, _Time_duration, "f").innerText = formatTime((progress === null || progress === void 0 ? void 0 : progress.duration) || 0);
      }

      var controls = time_classPrivateFieldGet(this, _Time_player, "f").getControls().getLayer(time_classPrivateFieldGet(this, _Time_controlLayer, "f"));

      time_classPrivateFieldSet(this, _Time_container, document.createElement('span'), "f");

      time_classPrivateFieldGet(this, _Time_container, "f").className = "op-controls-time op-control__".concat(time_classPrivateFieldGet(this, _Time_controlPosition, "f"));

      time_classPrivateFieldGet(this, _Time_container, "f").appendChild(time_classPrivateFieldGet(this, _Time_currentTime, "f"));

      if (!showOnlyCurrent) {
        time_classPrivateFieldGet(this, _Time_container, "f").appendChild(time_classPrivateFieldGet(this, _Time_delimiter, "f"));

        time_classPrivateFieldGet(this, _Time_container, "f").appendChild(time_classPrivateFieldGet(this, _Time_duration, "f"));
      }

      controls.appendChild(time_classPrivateFieldGet(this, _Time_container, "f"));

      var setInitialTime = function setInitialTime() {
        var _a;

        var el = time_classPrivateFieldGet(_this, _Time_player, "f").activeElement();

        if (el.duration !== Infinity && !time_classPrivateFieldGet(_this, _Time_player, "f").getElement().getAttribute('op-live__enabled')) {
          if (!showOnlyCurrent) {
            var duration = !Number.isNaN(el.duration) ? el.duration : ((_a = time_classPrivateFieldGet(_this, _Time_player, "f").getOptions().progress) === null || _a === void 0 ? void 0 : _a.duration) || 0;
            time_classPrivateFieldGet(_this, _Time_duration, "f").innerText = formatTime(duration);
          }

          time_classPrivateFieldGet(_this, _Time_currentTime, "f").innerText = formatTime(el.currentTime);
        } else if (!showOnlyCurrent) {
          time_classPrivateFieldGet(_this, _Time_duration, "f").setAttribute('aria-hidden', 'true');

          time_classPrivateFieldGet(_this, _Time_delimiter, "f").setAttribute('aria-hidden', 'true');
        }
      };

      time_classPrivateFieldGet(this, _Time_events, "f").media.loadedmetadata = setInitialTime.bind(this);
      time_classPrivateFieldGet(this, _Time_events, "f").controls.controlschanged = setInitialTime.bind(this);

      var _ref = time_classPrivateFieldGet(this, _Time_player, "f").getOptions().live || {},
          showLiveLabel = _ref.showLabel;

      time_classPrivateFieldGet(this, _Time_events, "f").media.timeupdate = function () {
        var el = time_classPrivateFieldGet(_this, _Time_player, "f").activeElement();

        if (el.duration !== Infinity && !time_classPrivateFieldGet(_this, _Time_player, "f").getElement().getAttribute('op-live__enabled') && !time_classPrivateFieldGet(_this, _Time_player, "f").getElement().getAttribute('op-dvr__enabled')) {
          var duration = formatTime(el.duration);

          if (!showOnlyCurrent && !Number.isNaN(el.duration) && duration !== time_classPrivateFieldGet(_this, _Time_duration, "f").innerText) {
            time_classPrivateFieldGet(_this, _Time_duration, "f").innerText = duration;

            time_classPrivateFieldGet(_this, _Time_duration, "f").setAttribute('aria-hidden', 'false');

            time_classPrivateFieldGet(_this, _Time_delimiter, "f").setAttribute('aria-hidden', 'false');
          } else if (showOnlyCurrent || duration !== time_classPrivateFieldGet(_this, _Time_duration, "f").innerText) {
            time_classPrivateFieldGet(_this, _Time_currentTime, "f").innerText = showLiveLabel ? (labels === null || labels === void 0 ? void 0 : labels.live) || '' : formatTime(el.currentTime);
          }

          time_classPrivateFieldGet(_this, _Time_currentTime, "f").innerText = formatTime(el.currentTime);
        } else if (time_classPrivateFieldGet(_this, _Time_player, "f").getElement().getAttribute('op-dvr__enabled')) {
          if (!showOnlyCurrent) {
            time_classPrivateFieldGet(_this, _Time_duration, "f").setAttribute('aria-hidden', 'true');

            time_classPrivateFieldGet(_this, _Time_delimiter, "f").setAttribute('aria-hidden', 'true');
          }

          time_classPrivateFieldGet(_this, _Time_currentTime, "f").innerText = formatTime(el.currentTime);
        } else if (showOnlyCurrent || !time_classPrivateFieldGet(_this, _Time_player, "f").getElement().getAttribute('op-dvr__enabled') && time_classPrivateFieldGet(_this, _Time_duration, "f").getAttribute('aria-hidden') === 'false') {
          if (!showOnlyCurrent) {
            time_classPrivateFieldGet(_this, _Time_duration, "f").setAttribute('aria-hidden', 'true');

            time_classPrivateFieldGet(_this, _Time_delimiter, "f").setAttribute('aria-hidden', 'true');
          }

          time_classPrivateFieldGet(_this, _Time_currentTime, "f").innerText = showLiveLabel ? (labels === null || labels === void 0 ? void 0 : labels.live) || '' : formatTime(el.currentTime);
        } else {
          time_classPrivateFieldGet(_this, _Time_currentTime, "f").innerText = showLiveLabel ? (labels === null || labels === void 0 ? void 0 : labels.live) || '' : formatTime(el.currentTime);
        }
      };

      time_classPrivateFieldGet(this, _Time_events, "f").media.ended = function () {
        var _a;

        var el = time_classPrivateFieldGet(_this, _Time_player, "f").activeElement();

        var duration = !Number.isNaN(el.duration) ? el.duration : ((_a = time_classPrivateFieldGet(_this, _Time_player, "f").getOptions().progress) === null || _a === void 0 ? void 0 : _a.duration) || 0;

        if (!showOnlyCurrent && time_classPrivateFieldGet(_this, _Time_player, "f").isMedia()) {
          time_classPrivateFieldGet(_this, _Time_duration, "f").innerText = formatTime(duration);
        }
      };

      Object.keys(time_classPrivateFieldGet(this, _Time_events, "f").media).forEach(function (event) {
        time_classPrivateFieldGet(_this, _Time_player, "f").getElement().addEventListener(event, time_classPrivateFieldGet(_this, _Time_events, "f").media[event], EVENT_OPTIONS);
      });

      time_classPrivateFieldGet(this, _Time_player, "f").getControls().getContainer().addEventListener('controlschanged', time_classPrivateFieldGet(this, _Time_events, "f").controls.controlschanged, EVENT_OPTIONS);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      Object.keys(time_classPrivateFieldGet(this, _Time_events, "f").media).forEach(function (event) {
        time_classPrivateFieldGet(_this2, _Time_player, "f").getElement().removeEventListener(event, time_classPrivateFieldGet(_this2, _Time_events, "f").media[event]);
      });

      time_classPrivateFieldGet(this, _Time_player, "f").getControls().getContainer().removeEventListener('controlschanged', time_classPrivateFieldGet(this, _Time_events, "f").controls.controlschanged);

      time_classPrivateFieldGet(this, _Time_currentTime, "f").remove();

      var _ref2 = time_classPrivateFieldGet(this, _Time_player, "f").getOptions().progress || {},
          showCurrentTimeOnly = _ref2.showCurrentTimeOnly;

      if (!showCurrentTimeOnly) {
        time_classPrivateFieldGet(this, _Time_delimiter, "f").remove();

        time_classPrivateFieldGet(this, _Time_duration, "f").remove();
      }

      time_classPrivateFieldGet(this, _Time_container, "f").remove();
    }
  }]);

  return Time;
}();

_Time_player = new WeakMap(), _Time_currentTime = new WeakMap(), _Time_delimiter = new WeakMap(), _Time_duration = new WeakMap(), _Time_container = new WeakMap(), _Time_events = new WeakMap(), _Time_controlPosition = new WeakMap(), _Time_controlLayer = new WeakMap();
/* harmony default export */ const time = (Time);
;// CONCATENATED MODULE: ./src/js/controls/volume.ts



var volume_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var volume_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Volume_player, _Volume_button, _Volume_container, _Volume_display, _Volume_slider, _Volume_events, _Volume_volume, _Volume_controlPosition, _Volume_controlLayer;




var Volume = function () {
  function Volume(player, position, layer) {
    classCallCheck_default()(this, Volume);

    _Volume_player.set(this, void 0);

    _Volume_button.set(this, void 0);

    _Volume_container.set(this, void 0);

    _Volume_display.set(this, void 0);

    _Volume_slider.set(this, void 0);

    _Volume_events.set(this, {
      button: {},
      media: {},
      slider: {}
    });

    _Volume_volume.set(this, void 0);

    _Volume_controlPosition.set(this, void 0);

    _Volume_controlLayer.set(this, void 0);

    volume_classPrivateFieldSet(this, _Volume_player, player, "f");

    volume_classPrivateFieldSet(this, _Volume_volume, volume_classPrivateFieldGet(this, _Volume_player, "f").getMedia().volume, "f");

    volume_classPrivateFieldSet(this, _Volume_controlPosition, position, "f");

    volume_classPrivateFieldSet(this, _Volume_controlLayer, layer, "f");

    this._enterSpaceKeyEvent = this._enterSpaceKeyEvent.bind(this);
  }

  createClass_default()(Volume, [{
    key: "create",
    value: function create() {
      var _this = this;

      var _classPrivateFieldGe = volume_classPrivateFieldGet(this, _Volume_player, "f").getOptions(),
          labels = _classPrivateFieldGe.labels;

      volume_classPrivateFieldSet(this, _Volume_container, document.createElement('div'), "f");

      volume_classPrivateFieldGet(this, _Volume_container, "f").className = "op-controls__volume op-control__".concat(volume_classPrivateFieldGet(this, _Volume_controlPosition, "f"));
      volume_classPrivateFieldGet(this, _Volume_container, "f").tabIndex = 0;

      volume_classPrivateFieldGet(this, _Volume_container, "f").setAttribute('aria-valuemin', '0');

      volume_classPrivateFieldGet(this, _Volume_container, "f").setAttribute('aria-valuemax', '100');

      volume_classPrivateFieldGet(this, _Volume_container, "f").setAttribute('aria-valuenow', "".concat(volume_classPrivateFieldGet(this, _Volume_volume, "f")));

      volume_classPrivateFieldGet(this, _Volume_container, "f").setAttribute('aria-valuetext', "".concat((labels === null || labels === void 0 ? void 0 : labels.volume) || '', ": ").concat(volume_classPrivateFieldGet(this, _Volume_volume, "f")));

      volume_classPrivateFieldGet(this, _Volume_container, "f").setAttribute('aria-orientation', 'vertical');

      volume_classPrivateFieldGet(this, _Volume_container, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.volumeSlider) || '');

      volume_classPrivateFieldSet(this, _Volume_slider, document.createElement('input'), "f");

      volume_classPrivateFieldGet(this, _Volume_slider, "f").type = 'range';
      volume_classPrivateFieldGet(this, _Volume_slider, "f").className = 'op-controls__volume--input';
      volume_classPrivateFieldGet(this, _Volume_slider, "f").tabIndex = -1;
      volume_classPrivateFieldGet(this, _Volume_slider, "f").value = volume_classPrivateFieldGet(this, _Volume_player, "f").getMedia().volume.toString();

      volume_classPrivateFieldGet(this, _Volume_slider, "f").setAttribute('min', '0');

      volume_classPrivateFieldGet(this, _Volume_slider, "f").setAttribute('max', '1');

      volume_classPrivateFieldGet(this, _Volume_slider, "f").setAttribute('step', '0.1');

      volume_classPrivateFieldGet(this, _Volume_slider, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.volumeControl) || '');

      volume_classPrivateFieldSet(this, _Volume_display, document.createElement('progress'), "f");

      volume_classPrivateFieldGet(this, _Volume_display, "f").className = 'op-controls__volume--display';

      volume_classPrivateFieldGet(this, _Volume_display, "f").setAttribute('max', '10');

      volume_classPrivateFieldGet(this, _Volume_display, "f").setAttribute('role', 'presentation');

      volume_classPrivateFieldGet(this, _Volume_display, "f").value = volume_classPrivateFieldGet(this, _Volume_player, "f").getMedia().volume * 10;

      volume_classPrivateFieldGet(this, _Volume_container, "f").appendChild(volume_classPrivateFieldGet(this, _Volume_slider, "f"));

      volume_classPrivateFieldGet(this, _Volume_container, "f").appendChild(volume_classPrivateFieldGet(this, _Volume_display, "f"));

      volume_classPrivateFieldSet(this, _Volume_button, document.createElement('button'), "f");

      volume_classPrivateFieldGet(this, _Volume_button, "f").type = 'button';
      volume_classPrivateFieldGet(this, _Volume_button, "f").className = "op-controls__mute op-control__".concat(volume_classPrivateFieldGet(this, _Volume_controlPosition, "f"));
      volume_classPrivateFieldGet(this, _Volume_button, "f").tabIndex = 0;
      volume_classPrivateFieldGet(this, _Volume_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.mute) || '';

      volume_classPrivateFieldGet(this, _Volume_button, "f").setAttribute('aria-controls', volume_classPrivateFieldGet(this, _Volume_player, "f").id);

      volume_classPrivateFieldGet(this, _Volume_button, "f").setAttribute('aria-pressed', 'false');

      volume_classPrivateFieldGet(this, _Volume_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.mute) || '');

      var updateSlider = function updateSlider(element) {
        var mediaVolume = element.volume * 1;
        var vol = Math.floor(mediaVolume * 100);
        volume_classPrivateFieldGet(_this, _Volume_slider, "f").value = "".concat(element.volume);
        volume_classPrivateFieldGet(_this, _Volume_display, "f").value = mediaVolume * 10;

        volume_classPrivateFieldGet(_this, _Volume_container, "f").setAttribute('aria-valuenow', "".concat(vol));

        volume_classPrivateFieldGet(_this, _Volume_container, "f").setAttribute('aria-valuetext', "".concat(labels === null || labels === void 0 ? void 0 : labels.volume, ": ").concat(vol));
      };

      var updateButton = function updateButton(element) {
        var vol = element.volume;

        if (vol <= 0.5 && vol > 0) {
          volume_classPrivateFieldGet(_this, _Volume_button, "f").classList.remove('op-controls__mute--muted');

          volume_classPrivateFieldGet(_this, _Volume_button, "f").classList.add('op-controls__mute--half');
        } else if (vol === 0) {
          volume_classPrivateFieldGet(_this, _Volume_button, "f").classList.add('op-controls__mute--muted');

          volume_classPrivateFieldGet(_this, _Volume_button, "f").classList.remove('op-controls__mute--half');
        } else {
          volume_classPrivateFieldGet(_this, _Volume_button, "f").classList.remove('op-controls__mute--muted');

          volume_classPrivateFieldGet(_this, _Volume_button, "f").classList.remove('op-controls__mute--half');
        }
      };

      var updateVolume = function updateVolume(event) {
        var el = volume_classPrivateFieldGet(_this, _Volume_player, "f").activeElement();

        var value = parseFloat(event.target.value);
        el.volume = value;
        el.muted = el.volume === 0;

        volume_classPrivateFieldSet(_this, _Volume_volume, value, "f");

        var unmuteEl = volume_classPrivateFieldGet(_this, _Volume_player, "f").getContainer().querySelector('.op-player__unmute');

        if (!el.muted && unmuteEl) {
          unmuteEl.remove();
        }

        var e = addEvent('volumechange');

        volume_classPrivateFieldGet(_this, _Volume_player, "f").getElement().dispatchEvent(e);
      };

      volume_classPrivateFieldGet(this, _Volume_events, "f").media.volumechange = function () {
        var el = volume_classPrivateFieldGet(_this, _Volume_player, "f").activeElement();

        updateSlider(el);
        updateButton(el);
      };

      volume_classPrivateFieldGet(this, _Volume_events, "f").media.loadedmetadata = function () {
        var el = volume_classPrivateFieldGet(_this, _Volume_player, "f").activeElement();

        if (el.muted) {
          el.volume = 0;
        }

        var e = addEvent('volumechange');

        volume_classPrivateFieldGet(_this, _Volume_player, "f").getElement().dispatchEvent(e);
      };

      volume_classPrivateFieldGet(this, _Volume_events, "f").slider.input = updateVolume.bind(this);
      volume_classPrivateFieldGet(this, _Volume_events, "f").slider.change = updateVolume.bind(this);

      volume_classPrivateFieldGet(this, _Volume_events, "f").button.click = function () {
        volume_classPrivateFieldGet(_this, _Volume_button, "f").setAttribute('aria-pressed', 'true');

        var el = volume_classPrivateFieldGet(_this, _Volume_player, "f").activeElement();

        el.muted = !el.muted;

        if (el.muted) {
          el.volume = 0;
          volume_classPrivateFieldGet(_this, _Volume_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.unmute) || '';

          volume_classPrivateFieldGet(_this, _Volume_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.unmute) || '');
        } else {
          el.volume = volume_classPrivateFieldGet(_this, _Volume_volume, "f");
          volume_classPrivateFieldGet(_this, _Volume_button, "f").title = (labels === null || labels === void 0 ? void 0 : labels.mute) || '';

          volume_classPrivateFieldGet(_this, _Volume_button, "f").setAttribute('aria-label', (labels === null || labels === void 0 ? void 0 : labels.mute) || '');
        }

        var event = addEvent('volumechange');

        volume_classPrivateFieldGet(_this, _Volume_player, "f").getElement().dispatchEvent(event);
      };

      volume_classPrivateFieldGet(this, _Volume_button, "f").addEventListener('click', volume_classPrivateFieldGet(this, _Volume_events, "f").button.click, EVENT_OPTIONS);

      Object.keys(volume_classPrivateFieldGet(this, _Volume_events, "f").media).forEach(function (event) {
        volume_classPrivateFieldGet(_this, _Volume_player, "f").getElement().addEventListener(event, volume_classPrivateFieldGet(_this, _Volume_events, "f").media[event], EVENT_OPTIONS);
      });
      Object.keys(volume_classPrivateFieldGet(this, _Volume_events, "f").slider).forEach(function (event) {
        volume_classPrivateFieldGet(_this, _Volume_slider, "f").addEventListener(event, volume_classPrivateFieldGet(_this, _Volume_events, "f").slider[event], EVENT_OPTIONS);
      });

      volume_classPrivateFieldGet(this, _Volume_player, "f").getContainer().addEventListener('keydown', this._enterSpaceKeyEvent, EVENT_OPTIONS);

      if (!IS_ANDROID && !IS_IOS || !volume_classPrivateFieldGet(this, _Volume_player, "f").getOptions().useDeviceVolume) {
        var controls = volume_classPrivateFieldGet(this, _Volume_player, "f").getControls().getLayer(volume_classPrivateFieldGet(this, _Volume_controlLayer, "f"));

        controls.appendChild(volume_classPrivateFieldGet(this, _Volume_button, "f"));
        controls.appendChild(volume_classPrivateFieldGet(this, _Volume_container, "f"));
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      volume_classPrivateFieldGet(this, _Volume_button, "f").removeEventListener('click', volume_classPrivateFieldGet(this, _Volume_events, "f").button.click);

      Object.keys(volume_classPrivateFieldGet(this, _Volume_events, "f").media).forEach(function (event) {
        volume_classPrivateFieldGet(_this2, _Volume_player, "f").getElement().removeEventListener(event, volume_classPrivateFieldGet(_this2, _Volume_events, "f").media[event]);
      });
      Object.keys(volume_classPrivateFieldGet(this, _Volume_events, "f").slider).forEach(function (event) {
        volume_classPrivateFieldGet(_this2, _Volume_slider, "f").removeEventListener(event, volume_classPrivateFieldGet(_this2, _Volume_events, "f").slider[event]);
      });

      volume_classPrivateFieldGet(this, _Volume_player, "f").getContainer().removeEventListener('keydown', this._enterSpaceKeyEvent);

      volume_classPrivateFieldGet(this, _Volume_slider, "f").remove();

      volume_classPrivateFieldGet(this, _Volume_display, "f").remove();

      volume_classPrivateFieldGet(this, _Volume_container, "f").remove();
    }
  }, {
    key: "_enterSpaceKeyEvent",
    value: function _enterSpaceKeyEvent(e) {
      var _a;

      var key = e.which || e.keyCode || 0;

      var el = volume_classPrivateFieldGet(this, _Volume_player, "f").activeElement();

      var playBtnFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-controls__mute');

      if (playBtnFocused && (key === 13 || key === 32)) {
        el.muted = !el.muted;
        el.volume = el.muted ? 0 : volume_classPrivateFieldGet(this, _Volume_volume, "f");

        volume_classPrivateFieldGet(this, _Volume_events, "f").button.click();

        e.preventDefault();
        e.stopPropagation();
      }
    }
  }]);

  return Volume;
}();

_Volume_player = new WeakMap(), _Volume_button = new WeakMap(), _Volume_container = new WeakMap(), _Volume_display = new WeakMap(), _Volume_slider = new WeakMap(), _Volume_events = new WeakMap(), _Volume_volume = new WeakMap(), _Volume_controlPosition = new WeakMap(), _Volume_controlLayer = new WeakMap();
/* harmony default export */ const volume = (Volume);
;// CONCATENATED MODULE: ./src/js/controls.ts




var controls_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var controls_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Controls_settings, _Controls_timer, _Controls_controls, _Controls_player, _Controls_items, _Controls_controlEls;












var Controls = function () {
  function Controls(player) {
    classCallCheck_default()(this, Controls);

    this.events = {
      media: {},
      mouse: {}
    };

    _Controls_settings.set(this, void 0);

    _Controls_timer.set(this, 0);

    _Controls_controls.set(this, void 0);

    _Controls_player.set(this, void 0);

    _Controls_items.set(this, void 0);

    _Controls_controlEls.set(this, {
      Captions: captions,
      Fullscreen: fullscreen,
      Levels: levels,
      Play: play,
      Progress: progress,
      Settings: settings,
      Time: time,
      Volume: volume
    });

    controls_classPrivateFieldSet(this, _Controls_player, player, "f");

    this._setElements();
  }

  createClass_default()(Controls, [{
    key: "create",
    value: function create() {
      var _this = this;

      controls_classPrivateFieldGet(this, _Controls_player, "f").getElement().controls = false;
      var isMediaVideo = isVideo(controls_classPrivateFieldGet(this, _Controls_player, "f").getElement());

      this._createControlsLayer();

      this._buildElements();

      this.events.controlschanged = function () {
        _this.destroy();

        _this._setElements();

        _this.create();
      };

      this.events.ended = function () {
        controls_classPrivateFieldGet(_this, _Controls_player, "f").getContainer().classList.remove('op-controls--hidden');
      };

      controls_classPrivateFieldGet(this, _Controls_player, "f").getElement().addEventListener('controlschanged', this.events.controlschanged, EVENT_OPTIONS);

      controls_classPrivateFieldGet(this, _Controls_player, "f").getElement().addEventListener('ended', this.events.ended, EVENT_OPTIONS);

      var _ref = controls_classPrivateFieldGet(this, _Controls_player, "f").getOptions().controls || {},
          alwaysVisible = _ref.alwaysVisible;

      if (!alwaysVisible) {
        var showControls = function showControls() {
          if (isMediaVideo) {
            controls_classPrivateFieldGet(_this, _Controls_player, "f").getContainer().classList.remove('op-controls--hidden');

            _this._stopControlTimer();
          }
        };

        this.events.mouse.mouseenter = function () {
          if (isMediaVideo && !controls_classPrivateFieldGet(_this, _Controls_player, "f").activeElement().paused) {
            _this._stopControlTimer();

            if (controls_classPrivateFieldGet(_this, _Controls_player, "f").activeElement().currentTime) {
              controls_classPrivateFieldGet(_this, _Controls_player, "f").playBtn.setAttribute('aria-hidden', controls_classPrivateFieldGet(_this, _Controls_player, "f").isMedia() ? 'false' : 'true');

              controls_classPrivateFieldGet(_this, _Controls_player, "f").loader.setAttribute('aria-hidden', 'true');
            } else if (controls_classPrivateFieldGet(_this, _Controls_player, "f").getOptions().showLoaderOnInit) {
              controls_classPrivateFieldGet(_this, _Controls_player, "f").playBtn.setAttribute('aria-hidden', 'true');

              controls_classPrivateFieldGet(_this, _Controls_player, "f").loader.setAttribute('aria-hidden', 'false');
            }

            controls_classPrivateFieldGet(_this, _Controls_player, "f").getContainer().classList.remove('op-controls--hidden');

            _this._startControlTimer(2500);
          }
        };

        this.events.mouse.mousemove = function () {
          if (isMediaVideo && !controls_classPrivateFieldGet(_this, _Controls_player, "f").activeElement().paused) {
            if (controls_classPrivateFieldGet(_this, _Controls_player, "f").activeElement().currentTime) {
              controls_classPrivateFieldGet(_this, _Controls_player, "f").loader.setAttribute('aria-hidden', 'true');

              controls_classPrivateFieldGet(_this, _Controls_player, "f").playBtn.setAttribute('aria-hidden', controls_classPrivateFieldGet(_this, _Controls_player, "f").isMedia() ? 'false' : 'true');
            } else {
              controls_classPrivateFieldGet(_this, _Controls_player, "f").playBtn.setAttribute('aria-hidden', controls_classPrivateFieldGet(_this, _Controls_player, "f").getOptions().showLoaderOnInit ? 'true' : 'false');

              controls_classPrivateFieldGet(_this, _Controls_player, "f").loader.setAttribute('aria-hidden', controls_classPrivateFieldGet(_this, _Controls_player, "f").getOptions().showLoaderOnInit ? 'false' : 'true');
            }

            controls_classPrivateFieldGet(_this, _Controls_player, "f").getContainer().classList.remove('op-controls--hidden');

            _this._startControlTimer(2500);
          }
        };

        this.events.mouse.mouseleave = function () {
          if (isMediaVideo && !controls_classPrivateFieldGet(_this, _Controls_player, "f").activeElement().paused) {
            _this._startControlTimer(1000);
          }
        };

        this.events.media.play = function () {
          if (isMediaVideo) {
            _this._startControlTimer(controls_classPrivateFieldGet(_this, _Controls_player, "f").getOptions().hidePlayBtnTimer || 350);
          }
        };

        this.events.media.loadedmetadata = showControls.bind(this);
        this.events.media.pause = showControls.bind(this);
        this.events.media.waiting = showControls.bind(this);
        this.events.media.stalled = showControls.bind(this);
        this.events.media.playererror = showControls.bind(this);
        Object.keys(this.events.media).forEach(function (event) {
          controls_classPrivateFieldGet(_this, _Controls_player, "f").getElement().addEventListener(event, _this.events.media[event], EVENT_OPTIONS);
        });

        if (IS_ANDROID || IS_IOS) {
          controls_classPrivateFieldGet(this, _Controls_player, "f").getContainer().addEventListener('click', this.events.mouse.mouseenter, EVENT_OPTIONS);
        } else {
          Object.keys(this.events.mouse).forEach(function (event) {
            controls_classPrivateFieldGet(_this, _Controls_player, "f").getContainer().addEventListener(event, _this.events.mouse[event], EVENT_OPTIONS);
          });
        }

        if (isMediaVideo && !controls_classPrivateFieldGet(this, _Controls_player, "f").activeElement().paused) {
          this._startControlTimer(3000);
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      if (!IS_ANDROID && !IS_IOS) {
        Object.keys(this.events.mouse).forEach(function (event) {
          controls_classPrivateFieldGet(_this2, _Controls_player, "f").getContainer().removeEventListener(event, _this2.events.mouse[event]);
        });
        Object.keys(this.events.media).forEach(function (event) {
          controls_classPrivateFieldGet(_this2, _Controls_player, "f").getElement().removeEventListener(event, _this2.events.media[event]);
        });

        this._stopControlTimer();
      }

      controls_classPrivateFieldGet(this, _Controls_player, "f").getElement().removeEventListener('controlschanged', this.events.controlschanged);

      controls_classPrivateFieldGet(this, _Controls_player, "f").getElement().removeEventListener('ended', this.events.ended);

      Object.keys(controls_classPrivateFieldGet(this, _Controls_items, "f")).forEach(function (position) {
        controls_classPrivateFieldGet(_this2, _Controls_items, "f")[position].forEach(function (item) {
          if (item.custom) {
            _this2._destroyCustomElement(item);
          } else if (typeof item.destroy === 'function') {
            item.destroy();
          }
        });
      });

      controls_classPrivateFieldGet(this, _Controls_controls, "f").remove();
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return controls_classPrivateFieldGet(this, _Controls_controls, "f");
    }
  }, {
    key: "getLayer",
    value: function getLayer(layer) {
      return controls_classPrivateFieldGet(this, _Controls_controls, "f").querySelector(".op-controls-layer__".concat(layer)) || controls_classPrivateFieldGet(this, _Controls_controls, "f");
    }
  }, {
    key: "_createControlsLayer",
    value: function _createControlsLayer() {
      if (!controls_classPrivateFieldGet(this, _Controls_controls, "f") || !controls_classPrivateFieldGet(this, _Controls_player, "f").getContainer().querySelector('.op-controls')) {
        controls_classPrivateFieldSet(this, _Controls_controls, document.createElement('div'), "f");

        controls_classPrivateFieldGet(this, _Controls_controls, "f").className = 'op-controls';

        controls_classPrivateFieldGet(this, _Controls_player, "f").getContainer().appendChild(controls_classPrivateFieldGet(this, _Controls_controls, "f"));

        var messageContainer = document.createElement('div');
        messageContainer.className = 'op-status';
        messageContainer.innerHTML = '<span></span>';
        messageContainer.tabIndex = -1;
        messageContainer.setAttribute('aria-hidden', 'true');

        if (isAudio(controls_classPrivateFieldGet(this, _Controls_player, "f").getElement())) {
          controls_classPrivateFieldGet(this, _Controls_controls, "f").appendChild(messageContainer);
        }
      }
    }
  }, {
    key: "_startControlTimer",
    value: function _startControlTimer(time) {
      var _this3 = this;

      var el = controls_classPrivateFieldGet(this, _Controls_player, "f").activeElement();

      this._stopControlTimer();

      if (typeof window !== 'undefined') {
        controls_classPrivateFieldSet(this, _Controls_timer, window.setTimeout(function () {
          if ((!el.paused || !el.ended) && isVideo(controls_classPrivateFieldGet(_this3, _Controls_player, "f").getElement())) {
            controls_classPrivateFieldGet(_this3, _Controls_player, "f").getContainer().classList.add('op-controls--hidden');

            controls_classPrivateFieldGet(_this3, _Controls_player, "f").playBtn.setAttribute('aria-hidden', 'true');

            _this3._stopControlTimer();

            var event = addEvent('controlshidden');

            controls_classPrivateFieldGet(_this3, _Controls_player, "f").getElement().dispatchEvent(event);
          }
        }, time), "f");
      }
    }
  }, {
    key: "_stopControlTimer",
    value: function _stopControlTimer() {
      if (controls_classPrivateFieldGet(this, _Controls_timer, "f") !== 0) {
        clearTimeout(controls_classPrivateFieldGet(this, _Controls_timer, "f"));

        controls_classPrivateFieldSet(this, _Controls_timer, 0, "f");
      }
    }
  }, {
    key: "_setElements",
    value: function _setElements() {
      var _this4 = this;

      var _a;

      var controls = ((_a = controls_classPrivateFieldGet(this, _Controls_player, "f").getOptions().controls) === null || _a === void 0 ? void 0 : _a.layers) || {};

      controls_classPrivateFieldSet(this, _Controls_items, {
        'bottom-left': [],
        'bottom-middle': [],
        'bottom-right': [],
        left: [],
        main: [],
        middle: [],
        right: [],
        'top-left': [],
        'top-middle': [],
        'top-right': []
      }, "f");

      var isVideoEl = isVideo(controls_classPrivateFieldGet(this, _Controls_player, "f").getElement());
      var isAudioEl = isAudio(controls_classPrivateFieldGet(this, _Controls_player, "f").getElement());
      var controlPositions = Object.keys(controls);
      var layersExist = controlPositions.find(function (item) {
        return /^(top|bottom)/.test(item);
      });

      this._createControlsLayer();

      controlPositions.forEach(function (position) {
        var _position$split = position.split('-'),
            _position$split2 = slicedToArray_default()(_position$split, 2),
            layer = _position$split2[0],
            pos = _position$split2[1];

        if (pos) {
          if (!controls_classPrivateFieldGet(_this4, _Controls_controls, "f").classList.contains('op-controls__stacked')) {
            controls_classPrivateFieldGet(_this4, _Controls_controls, "f").classList.add('op-controls__stacked');
          }

          var className = "op-controls-layer__".concat(layer);

          if (!controls_classPrivateFieldGet(_this4, _Controls_controls, "f").querySelector(".".concat(className))) {
            var controlLayer = document.createElement('div');
            controlLayer.className = className;

            controls_classPrivateFieldGet(_this4, _Controls_controls, "f").appendChild(controlLayer);
          }
        } else if (layersExist) {
          var _className = 'op-controls-layer__center';

          if (!controls_classPrivateFieldGet(_this4, _Controls_controls, "f").querySelector(".".concat(_className))) {
            var _controlLayer = document.createElement('div');

            _controlLayer.className = _className;

            controls_classPrivateFieldGet(_this4, _Controls_controls, "f").appendChild(_controlLayer);
          }
        }

        var layers = controls ? controls[position] : null;

        if (layers) {
          layers.filter(function (v, i, a) {
            return a.indexOf(v) === i;
          }).forEach(function (el) {
            var currentLayer = layersExist && !pos ? 'center' : layer;
            var className = "".concat(el.charAt(0).toUpperCase()).concat(el.slice(1));
            var item = new (controls_classPrivateFieldGet(_this4, _Controls_controlEls, "f")[className])(controls_classPrivateFieldGet(_this4, _Controls_player, "f"), pos || layer, currentLayer);

            if (el === 'settings') {
              controls_classPrivateFieldSet(_this4, _Controls_settings, item, "f");
            }

            if (isVideoEl || el !== 'fullscreen' && isAudioEl) {
              controls_classPrivateFieldGet(_this4, _Controls_items, "f")[position].push(item);
            }
          });
        }
      });

      controls_classPrivateFieldGet(this, _Controls_player, "f").getCustomControls().forEach(function (item) {
        var _item$position$split = item.position.split('-'),
            _item$position$split2 = slicedToArray_default()(_item$position$split, 2),
            layer = _item$position$split2[0],
            pos = _item$position$split2[1];

        var currentLayer = layersExist && !pos ? 'center' : layer;
        item.layer = currentLayer;
        item.position = pos || layer;

        if (item.position === 'right') {
          controls_classPrivateFieldGet(_this4, _Controls_items, "f")[item.position].unshift(item);
        } else {
          controls_classPrivateFieldGet(_this4, _Controls_items, "f")[item.position].push(item);
        }
      });
    }
  }, {
    key: "_buildElements",
    value: function _buildElements() {
      var _this5 = this;

      Object.keys(controls_classPrivateFieldGet(this, _Controls_items, "f")).forEach(function (position) {
        controls_classPrivateFieldGet(_this5, _Controls_items, "f")[position].forEach(function (item) {
          if (item.custom) {
            _this5._createCustomElement(item);
          } else {
            item.create();
          }
        });
      });
      Object.keys(controls_classPrivateFieldGet(this, _Controls_items, "f")).forEach(function (position) {
        controls_classPrivateFieldGet(_this5, _Controls_items, "f")[position].forEach(function (item) {
          var allowDefault = !controls_classPrivateFieldGet(_this5, _Controls_player, "f").getOptions().detachMenus || item instanceof settings;
          var current = item;

          if (allowDefault && !current.custom && typeof current.addSettings === 'function') {
            var menuItem = current.addSettings();

            if (controls_classPrivateFieldGet(_this5, _Controls_settings, "f") && Object.keys(menuItem).length) {
              controls_classPrivateFieldGet(_this5, _Controls_settings, "f").addItem(menuItem.name, menuItem.key, menuItem.default, menuItem.subitems, menuItem.className);
            }
          }
        });
      });
      var e = addEvent('controlschanged');

      controls_classPrivateFieldGet(this, _Controls_controls, "f").dispatchEvent(e);
    }
  }, {
    key: "_hideCustomMenu",
    value: function _hideCustomMenu(menu) {
      var timeout;

      if (timeout && typeof window !== 'undefined') {
        window.cancelAnimationFrame(timeout);
      }

      if (typeof window !== 'undefined') {
        timeout = window.requestAnimationFrame(function () {
          menu.setAttribute('aria-hidden', 'true');
        });
      }
    }
  }, {
    key: "_toggleCustomMenu",
    value: function _toggleCustomMenu(event, menu, item) {
      var menus = controls_classPrivateFieldGet(this, _Controls_player, "f").getContainer().querySelectorAll('.op-settings');

      menus.forEach(function (m) {
        if (m.getAttribute('aria-hidden') === 'false' && m.id !== menu.id) {
          m.setAttribute('aria-hidden', 'true');
        }
      });
      menu.setAttribute('aria-hidden', menu.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');

      if (typeof item.click === 'function') {
        item.click(event);
      }
    }
  }, {
    key: "_createCustomElement",
    value: function _createCustomElement(item) {
      var _this6 = this;

      var element = document.createElement(item.type);
      element.tabIndex = 0;
      element.id = item.id;
      element.className = "op-controls__".concat(item.id, " op-control__").concat(item.position, " ").concat(item.showInAds ? '' : 'op-control__hide-in-ad');

      if (item.styles) {
        Object.assign(element.style, item.styles);
      }

      if (item.type === 'button' && item.icon) {
        element.innerHTML = /\.(jpg|png|svg|gif)$/.test(item.icon) ? "<img src=\"".concat(sanitize(item.icon), "\">") : sanitize(item.icon);
      } else if (item.content) {
        element.innerHTML = sanitize(item.content, false);
      }

      if (item.type === 'button' && item.title) {
        element.title = item.title;
      }

      if (item.type !== 'button' && item.click && typeof item.click === 'function') {
        element.setAttribute('aria-role', 'button');
      }

      if (item.type === 'button' && item.subitems && Array.isArray(item.subitems) && item.subitems.length > 0) {
        var menu = document.createElement('div');
        menu.className = 'op-settings op-settings__custom';
        menu.id = "".concat(item.id, "-menu");
        menu.setAttribute('aria-hidden', 'true');
        var items = item.subitems.map(function (s) {
          var itemIcon = '';

          if (s.icon) {
            itemIcon = /\.(jpg|png|svg|gif)$/.test(s.icon) ? "<img src=\"".concat(sanitize(s.icon), "\">") : sanitize(s.icon, false);
          }

          return "<div class=\"op-settings__menu-item\" tabindex=\"0\" ".concat(s.title ? "title=\"".concat(s.title, "\"") : '', " role=\"menuitemradio\">\n                    <div class=\"op-settings__menu-label\" id=\"").concat(s.id, "\" data-value=\"").concat(item.id, "-").concat(s.id, "\">").concat(itemIcon, " ").concat(s.label, "</div>\n                </div>");
        });
        menu.innerHTML = "<div class=\"op-settings__menu\" role=\"menu\">".concat(items.join(''), "</div>");

        controls_classPrivateFieldGet(this, _Controls_player, "f").getContainer().appendChild(menu);

        item.subitems.forEach(function (subitem) {
          var menuItem = menu.querySelector("#".concat(subitem.id));

          if (menuItem && subitem.click && typeof subitem.click === 'function') {
            menuItem.addEventListener('click', subitem.click, EVENT_OPTIONS);
          }
        });
        element.addEventListener('click', function (e) {
          return _this6._toggleCustomMenu(e, menu, item);
        }, EVENT_OPTIONS);

        controls_classPrivateFieldGet(this, _Controls_player, "f").getElement().addEventListener('controlshidden', function () {
          return _this6._hideCustomMenu(menu);
        }, EVENT_OPTIONS);
      } else if (item.click && typeof item.click === 'function') {
        element.addEventListener('click', item.click, EVENT_OPTIONS);
      }

      if (item.mouseenter && typeof item.mouseenter === 'function') {
        element.addEventListener('mouseenter', item.mouseenter, EVENT_OPTIONS);
      }

      if (item.mouseleave && typeof item.mouseleave === 'function') {
        element.addEventListener('mouseleave', item.mouseleave, EVENT_OPTIONS);
      }

      if (item.keydown && typeof item.keydown === 'function') {
        element.addEventListener('keydown', item.keydown, EVENT_OPTIONS);
      }

      if (item.blur && typeof item.blur === 'function') {
        element.addEventListener('blur', item.blur, EVENT_OPTIONS);
      }

      if (item.focus && typeof item.focus === 'function') {
        element.addEventListener('focus', item.focus, EVENT_OPTIONS);
      }

      if (item.layer) {
        if (item.layer === 'main') {
          controls_classPrivateFieldGet(this, _Controls_player, "f").getContainer().appendChild(element);
        } else {
          this.getLayer(item.layer).appendChild(element);
        }
      }

      if (item.init && typeof item.init === 'function') {
        item.init(controls_classPrivateFieldGet(this, _Controls_player, "f"));
      }
    }
  }, {
    key: "_destroyCustomElement",
    value: function _destroyCustomElement(item) {
      var _this7 = this;

      var control = this.getContainer().querySelector(".op-controls__".concat(item.id));

      if (control) {
        if (item.subitems && Array.isArray(item.subitems) && item.subitems.length > 0) {
          var menu = controls_classPrivateFieldGet(this, _Controls_player, "f").getContainer().querySelector("#".concat(item.id, "-menu"));

          if (menu) {
            item.subitems.forEach(function (subitem) {
              var menuItem = menu.querySelector("#".concat(subitem.id));

              if (menuItem && subitem.click && typeof subitem.click === 'function') {
                menuItem.removeEventListener('click', subitem.click);
              }
            });
            control.removeEventListener('click', function (e) {
              return _this7._toggleCustomMenu(e, menu, item);
            });

            controls_classPrivateFieldGet(this, _Controls_player, "f").getElement().removeEventListener('controlshidden', function () {
              return _this7._hideCustomMenu(menu);
            });

            menu.remove();
          }
        }

        if (item.click && typeof item.click === 'function') {
          control.removeEventListener('click', item.click);
        }

        if (item.mouseenter && typeof item.mouseenter === 'function') {
          control.removeEventListener('mouseenter', item.mouseenter);
        }

        if (item.mouseleave && typeof item.mouseleave === 'function') {
          control.removeEventListener('mouseleave', item.mouseleave);
        }

        if (item.keydown && typeof item.keydown === 'function') {
          control.removeEventListener('keydown', item.keydown);
        }

        if (item.blur && typeof item.blur === 'function') {
          control.removeEventListener('blur', item.blur);
        }

        if (item.focus && typeof item.focus === 'function') {
          control.removeEventListener('focus', item.focus);
        }

        control.remove();

        if (item.destroy && typeof item.destroy === 'function') {
          item.destroy(controls_classPrivateFieldGet(this, _Controls_player, "f"));
        }
      }
    }
  }]);

  return Controls;
}();

_Controls_settings = new WeakMap(), _Controls_timer = new WeakMap(), _Controls_controls = new WeakMap(), _Controls_player = new WeakMap(), _Controls_items = new WeakMap(), _Controls_controlEls = new WeakMap();
/* harmony default export */ const controls = (Controls);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(506);
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(205);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(585);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(754);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);
;// CONCATENATED MODULE: ./src/js/media/native.ts



var native_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var native_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Native_customPlayer;

var Native = function () {
  function Native(element, media) {
    classCallCheck_default()(this, Native);

    _Native_customPlayer.set(this, void 0);

    this.element = element;
    this.media = media;
    this.promise = new Promise(function (resolve) {
      resolve();
    });
  }

  createClass_default()(Native, [{
    key: "instance",
    get: function get() {
      return native_classPrivateFieldGet(this, _Native_customPlayer, "f");
    },
    set: function set(customPlayer) {
      native_classPrivateFieldSet(this, _Native_customPlayer, customPlayer, "f");
    }
  }, {
    key: "play",
    value: function play() {
      return this.element.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.element.pause();
    }
  }, {
    key: "volume",
    get: function get() {
      return this.element.volume;
    },
    set: function set(value) {
      this.element.volume = value;
    }
  }, {
    key: "muted",
    get: function get() {
      return this.element.muted;
    },
    set: function set(value) {
      this.element.muted = value;
    }
  }, {
    key: "playbackRate",
    get: function get() {
      return this.element.playbackRate;
    },
    set: function set(value) {
      this.element.playbackRate = value;
    }
  }, {
    key: "defaultPlaybackRate",
    get: function get() {
      return this.element.defaultPlaybackRate;
    },
    set: function set(value) {
      this.element.defaultPlaybackRate = value;
    }
  }, {
    key: "currentTime",
    get: function get() {
      return this.element.currentTime;
    },
    set: function set(value) {
      this.element.currentTime = value;
    }
  }, {
    key: "duration",
    get: function get() {
      return this.element.duration;
    }
  }, {
    key: "paused",
    get: function get() {
      return this.element.paused;
    }
  }, {
    key: "ended",
    get: function get() {
      return this.element.ended;
    }
  }]);

  return Native;
}();

_Native_customPlayer = new WeakMap();
/* harmony default export */ const media_native = (Native);
;// CONCATENATED MODULE: ./src/js/media/dash.ts







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var dash_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var dash_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _DashMedia_player, _DashMedia_events, _DashMedia_options;






var DashMedia = function (_Native) {
  inherits_default()(DashMedia, _Native);

  var _super = _createSuper(DashMedia);

  function DashMedia(element, mediaSource, options) {
    var _this;

    classCallCheck_default()(this, DashMedia);

    _this = _super.call(this, element, mediaSource);

    _DashMedia_player.set(assertThisInitialized_default()(_this), void 0);

    _DashMedia_events.set(assertThisInitialized_default()(_this), {});

    _DashMedia_options.set(assertThisInitialized_default()(_this), {});

    dash_classPrivateFieldSet(assertThisInitialized_default()(_this), _DashMedia_options, options, "f");

    _this._assign = _this._assign.bind(assertThisInitialized_default()(_this));
    _this._preparePlayer = _this._preparePlayer.bind(assertThisInitialized_default()(_this));
    _this.promise = typeof dashjs === 'undefined' ? loadScript('https://cdn.dashjs.org/latest/dash.all.min.js') : new Promise(function (resolve) {
      resolve({});
    });

    _this.promise.then(function () {
      dash_classPrivateFieldSet(assertThisInitialized_default()(_this), _DashMedia_player, dashjs.MediaPlayer().create(), "f");

      _this.instance = dash_classPrivateFieldGet(assertThisInitialized_default()(_this), _DashMedia_player, "f");
    });

    return _this;
  }

  createClass_default()(DashMedia, [{
    key: "canPlayType",
    value: function canPlayType(mimeType) {
      return HAS_MSE && mimeType === 'application/dash+xml';
    }
  }, {
    key: "load",
    value: function load() {
      var _this2 = this;

      this._preparePlayer();

      dash_classPrivateFieldGet(this, _DashMedia_player, "f").attachSource(this.media.src);

      var e = addEvent('loadedmetadata');
      this.element.dispatchEvent(e);

      if (!dash_classPrivateFieldGet(this, _DashMedia_events, "f")) {
        dash_classPrivateFieldSet(this, _DashMedia_events, dashjs.MediaPlayer.events, "f");

        Object.keys(dash_classPrivateFieldGet(this, _DashMedia_events, "f")).forEach(function (event) {
          dash_classPrivateFieldGet(_this2, _DashMedia_player, "f").on(dash_classPrivateFieldGet(_this2, _DashMedia_events, "f")[event], _this2._assign);
        });
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      if (dash_classPrivateFieldGet(this, _DashMedia_events, "f")) {
        Object.keys(dash_classPrivateFieldGet(this, _DashMedia_events, "f")).forEach(function (event) {
          dash_classPrivateFieldGet(_this3, _DashMedia_player, "f").off(dash_classPrivateFieldGet(_this3, _DashMedia_events, "f")[event], _this3._assign);
        });

        dash_classPrivateFieldSet(this, _DashMedia_events, [], "f");
      }

      dash_classPrivateFieldGet(this, _DashMedia_player, "f").reset();
    }
  }, {
    key: "src",
    set: function set(media) {
      var _this4 = this;

      if (isDashSource(media)) {
        this.destroy();

        dash_classPrivateFieldSet(this, _DashMedia_player, dashjs.MediaPlayer().create(), "f");

        this._preparePlayer();

        dash_classPrivateFieldGet(this, _DashMedia_player, "f").attachSource(media.src);

        dash_classPrivateFieldSet(this, _DashMedia_events, dashjs.MediaPlayer.events, "f");

        Object.keys(dash_classPrivateFieldGet(this, _DashMedia_events, "f")).forEach(function (event) {
          dash_classPrivateFieldGet(_this4, _DashMedia_player, "f").on(dash_classPrivateFieldGet(_this4, _DashMedia_events, "f")[event], _this4._assign);
        });
      }
    }
  }, {
    key: "levels",
    get: function get() {
      var levels = [];

      if (dash_classPrivateFieldGet(this, _DashMedia_player, "f")) {
        var bitrates = dash_classPrivateFieldGet(this, _DashMedia_player, "f").getBitrateInfoListFor('video');

        if (bitrates.length) {
          bitrates.forEach(function (item) {
            if (bitrates[item]) {
              var _bitrates$item = bitrates[item],
                  height = _bitrates$item.height,
                  name = _bitrates$item.name;
              var level = {
                height: height,
                id: "".concat(item),
                label: name || null
              };
              levels.push(level);
            }
          });
        }
      }

      return levels;
    }
  }, {
    key: "level",
    get: function get() {
      return dash_classPrivateFieldGet(this, _DashMedia_player, "f") ? dash_classPrivateFieldGet(this, _DashMedia_player, "f").getQualityFor('video') : '-1';
    },
    set: function set(level) {
      if (level === '0') {
        dash_classPrivateFieldGet(this, _DashMedia_player, "f").setAutoSwitchQuality(true);
      } else {
        dash_classPrivateFieldGet(this, _DashMedia_player, "f").setAutoSwitchQuality(false);

        dash_classPrivateFieldGet(this, _DashMedia_player, "f").setQualityFor('video', level);
      }
    }
  }, {
    key: "_assign",
    value: function _assign(event) {
      if (event.type === 'error') {
        var details = {
          detail: {
            message: event,
            type: 'M(PEG)-DASH'
          }
        };
        var errorEvent = addEvent('playererror', details);
        this.element.dispatchEvent(errorEvent);
      } else {
        var e = addEvent(event.type, {
          detail: event
        });
        this.element.dispatchEvent(e);
      }
    }
  }, {
    key: "_preparePlayer",
    value: function _preparePlayer() {
      dash_classPrivateFieldGet(this, _DashMedia_player, "f").updateSettings(Object.assign({
        debug: {
          logLevel: dashjs.Debug.LOG_LEVEL_NONE
        },
        streaming: {
          fastSwitchEnabled: true,
          scheduleWhilePaused: false
        }
      }, dash_classPrivateFieldGet(this, _DashMedia_options, "f") || {}));

      dash_classPrivateFieldGet(this, _DashMedia_player, "f").initialize();

      dash_classPrivateFieldGet(this, _DashMedia_player, "f").attachView(this.element);

      dash_classPrivateFieldGet(this, _DashMedia_player, "f").setAutoPlay(false);
    }
  }]);

  return DashMedia;
}(media_native);

_DashMedia_player = new WeakMap(), _DashMedia_events = new WeakMap(), _DashMedia_options = new WeakMap();
/* harmony default export */ const dash = (DashMedia);
;// CONCATENATED MODULE: ./src/js/media/flv.ts







function flv_createSuper(Derived) { var hasNativeReflectConstruct = flv_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function flv_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var flv_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var flv_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var _FlvMedia_player, _FlvMedia_events, _FlvMedia_options;






var FlvMedia = function (_Native) {
  inherits_default()(FlvMedia, _Native);

  var _super = flv_createSuper(FlvMedia);

  function FlvMedia(element, mediaSource, options) {
    var _this;

    classCallCheck_default()(this, FlvMedia);

    _this = _super.call(this, element, mediaSource);

    _FlvMedia_player.set(assertThisInitialized_default()(_this), void 0);

    _FlvMedia_events.set(assertThisInitialized_default()(_this), {});

    _FlvMedia_options.set(assertThisInitialized_default()(_this), {});

    flv_classPrivateFieldSet(assertThisInitialized_default()(_this), _FlvMedia_options, options, "f");

    _this.element = element;
    _this.media = mediaSource;
    _this._create = _this._create.bind(assertThisInitialized_default()(_this));
    _this._assign = _this._assign.bind(assertThisInitialized_default()(_this));
    _this.promise = typeof flvjs === 'undefined' ? loadScript('https://cdn.jsdelivr.net/npm/flv.js@latest/dist/flv.min.js') : new Promise(function (resolve) {
      resolve({});
    });

    _this.promise.then(_this._create);

    return _this;
  }

  createClass_default()(FlvMedia, [{
    key: "canPlayType",
    value: function canPlayType(mimeType) {
      return HAS_MSE && (mimeType === 'video/x-flv' || mimeType === 'video/flv');
    }
  }, {
    key: "load",
    value: function load() {
      var _this2 = this;

      flv_classPrivateFieldGet(this, _FlvMedia_player, "f").unload();

      flv_classPrivateFieldGet(this, _FlvMedia_player, "f").detachMediaElement();

      flv_classPrivateFieldGet(this, _FlvMedia_player, "f").attachMediaElement(this.element);

      flv_classPrivateFieldGet(this, _FlvMedia_player, "f").load();

      var e = addEvent('loadedmetadata');
      this.element.dispatchEvent(e);

      if (!flv_classPrivateFieldGet(this, _FlvMedia_events, "f")) {
        flv_classPrivateFieldSet(this, _FlvMedia_events, flvjs.Events, "f");

        Object.keys(flv_classPrivateFieldGet(this, _FlvMedia_events, "f")).forEach(function (event) {
          flv_classPrivateFieldGet(_this2, _FlvMedia_player, "f").on(flv_classPrivateFieldGet(_this2, _FlvMedia_events, "f")[event], function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return _this2._assign(flv_classPrivateFieldGet(_this2, _FlvMedia_events, "f")[event], args);
          });
        });
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      flv_classPrivateFieldGet(this, _FlvMedia_player, "f").destroy();

      flv_classPrivateFieldSet(this, _FlvMedia_player, null, "f");
    }
  }, {
    key: "src",
    set: function set(media) {
      if (isFlvSource(media)) {
        this.destroy();

        this._create();
      }
    }
  }, {
    key: "levels",
    get: function get() {
      var _this3 = this;

      var levels = [];

      if (flv_classPrivateFieldGet(this, _FlvMedia_player, "f") && flv_classPrivateFieldGet(this, _FlvMedia_player, "f").levels && flv_classPrivateFieldGet(this, _FlvMedia_player, "f").levels.length) {
        Object.keys(flv_classPrivateFieldGet(this, _FlvMedia_player, "f").levels).forEach(function (item) {
          var _classPrivateFieldGe = flv_classPrivateFieldGet(_this3, _FlvMedia_player, "f").levels[item],
              height = _classPrivateFieldGe.height,
              name = _classPrivateFieldGe.name;

          var level = {
            height: height,
            id: item,
            label: name || null
          };
          levels.push(level);
        });
      }

      return levels;
    }
  }, {
    key: "level",
    get: function get() {
      return flv_classPrivateFieldGet(this, _FlvMedia_player, "f") ? flv_classPrivateFieldGet(this, _FlvMedia_player, "f").currentLevel : '-1';
    },
    set: function set(level) {
      flv_classPrivateFieldGet(this, _FlvMedia_player, "f").currentLevel = level;
    }
  }, {
    key: "_create",
    value: function _create() {
      var _this4 = this;

      var _a = flv_classPrivateFieldGet(this, _FlvMedia_options, "f") || {},
          configs = _a.configs,
          rest = __rest(_a, ["configs"]);

      flvjs.LoggingControl.enableDebug = (rest === null || rest === void 0 ? void 0 : rest.debug) || false;
      flvjs.LoggingControl.enableVerbose = (rest === null || rest === void 0 ? void 0 : rest.debug) || false;
      var options = Object.assign(Object.assign({}, rest), {
        type: 'flv',
        url: this.media.src
      });

      flv_classPrivateFieldSet(this, _FlvMedia_player, flvjs.createPlayer(options, configs || {}), "f");

      this.instance = flv_classPrivateFieldGet(this, _FlvMedia_player, "f");

      if (!flv_classPrivateFieldGet(this, _FlvMedia_events, "f")) {
        flv_classPrivateFieldSet(this, _FlvMedia_events, flvjs.Events, "f");

        Object.keys(flv_classPrivateFieldGet(this, _FlvMedia_events, "f")).forEach(function (event) {
          flv_classPrivateFieldGet(_this4, _FlvMedia_player, "f").on(flv_classPrivateFieldGet(_this4, _FlvMedia_events, "f")[event], function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return _this4._assign(flv_classPrivateFieldGet(_this4, _FlvMedia_events, "f")[event], args);
          });
        });
      }
    }
  }, {
    key: "_assign",
    value: function _assign(event, data) {
      if (event === 'error') {
        var errorDetails = {
          detail: {
            data: data,
            message: "".concat(data[0], ": ").concat(data[1], " ").concat(data[2].msg),
            type: 'FLV'
          }
        };
        var errorEvent = addEvent('playererror', errorDetails);
        this.element.dispatchEvent(errorEvent);
      } else {
        var e = addEvent(event, {
          detail: {
            data: data
          }
        });
        this.element.dispatchEvent(e);
      }
    }
  }]);

  return FlvMedia;
}(media_native);

_FlvMedia_player = new WeakMap(), _FlvMedia_events = new WeakMap(), _FlvMedia_options = new WeakMap();
/* harmony default export */ const flv = (FlvMedia);
;// CONCATENATED MODULE: ./src/js/media/hls.ts







function hls_createSuper(Derived) { var hasNativeReflectConstruct = hls_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function hls_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var hls_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var hls_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _HlsMedia_player, _HlsMedia_events, _HlsMedia_recoverDecodingErrorDate, _HlsMedia_recoverSwapAudioCodecDate, _HlsMedia_options, _HlsMedia_autoplay;






var HlsMedia = function (_Native) {
  inherits_default()(HlsMedia, _Native);

  var _super = hls_createSuper(HlsMedia);

  function HlsMedia(element, mediaSource, autoplay, options) {
    var _this;

    classCallCheck_default()(this, HlsMedia);

    _this = _super.call(this, element, mediaSource);

    _HlsMedia_player.set(assertThisInitialized_default()(_this), void 0);

    _HlsMedia_events.set(assertThisInitialized_default()(_this), {});

    _HlsMedia_recoverDecodingErrorDate.set(assertThisInitialized_default()(_this), 0);

    _HlsMedia_recoverSwapAudioCodecDate.set(assertThisInitialized_default()(_this), 0);

    _HlsMedia_options.set(assertThisInitialized_default()(_this), void 0);

    _HlsMedia_autoplay.set(assertThisInitialized_default()(_this), void 0);

    hls_classPrivateFieldSet(assertThisInitialized_default()(_this), _HlsMedia_options, options || {}, "f");

    _this.element = element;
    _this.media = mediaSource;

    hls_classPrivateFieldSet(assertThisInitialized_default()(_this), _HlsMedia_autoplay, autoplay, "f");

    _this._create = _this._create.bind(assertThisInitialized_default()(_this));
    _this._play = _this._play.bind(assertThisInitialized_default()(_this));
    _this._pause = _this._pause.bind(assertThisInitialized_default()(_this));
    _this._assign = _this._assign.bind(assertThisInitialized_default()(_this));
    _this.promise = typeof Hls === 'undefined' ? loadScript('https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js') : new Promise(function (resolve) {
      resolve({});
    });

    _this.promise.then(_this._create);

    return _this;
  }

  createClass_default()(HlsMedia, [{
    key: "canPlayType",
    value: function canPlayType(mimeType) {
      return SUPPORTS_HLS() && mimeType === 'application/x-mpegURL';
    }
  }, {
    key: "load",
    value: function load() {
      var _this2 = this;

      if (hls_classPrivateFieldGet(this, _HlsMedia_player, "f")) {
        hls_classPrivateFieldGet(this, _HlsMedia_player, "f").detachMedia();

        hls_classPrivateFieldGet(this, _HlsMedia_player, "f").loadSource(this.media.src);

        hls_classPrivateFieldGet(this, _HlsMedia_player, "f").attachMedia(this.element);
      }

      var e = addEvent('loadedmetadata');
      this.element.dispatchEvent(e);

      if (!hls_classPrivateFieldGet(this, _HlsMedia_events, "f")) {
        hls_classPrivateFieldSet(this, _HlsMedia_events, Hls.Events, "f");

        Object.keys(hls_classPrivateFieldGet(this, _HlsMedia_events, "f")).forEach(function (event) {
          hls_classPrivateFieldGet(_this2, _HlsMedia_player, "f").on(hls_classPrivateFieldGet(_this2, _HlsMedia_events, "f")[event], function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return _this2._assign(hls_classPrivateFieldGet(_this2, _HlsMedia_events, "f")[event], args);
          });
        });
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      if (hls_classPrivateFieldGet(this, _HlsMedia_player, "f")) {
        hls_classPrivateFieldGet(this, _HlsMedia_player, "f").stopLoad();
      }

      if (hls_classPrivateFieldGet(this, _HlsMedia_events, "f")) {
        Object.keys(hls_classPrivateFieldGet(this, _HlsMedia_events, "f")).forEach(function (event) {
          hls_classPrivateFieldGet(_this3, _HlsMedia_player, "f").off(hls_classPrivateFieldGet(_this3, _HlsMedia_events, "f")[event], function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return _this3._assign(hls_classPrivateFieldGet(_this3, _HlsMedia_events, "f")[event], args);
          });
        });
      }

      this.element.removeEventListener('play', this._play);
      this.element.removeEventListener('pause', this._pause);

      if (hls_classPrivateFieldGet(this, _HlsMedia_player, "f")) {
        hls_classPrivateFieldGet(this, _HlsMedia_player, "f").destroy();

        hls_classPrivateFieldSet(this, _HlsMedia_player, null, "f");
      }
    }
  }, {
    key: "src",
    set: function set(media) {
      var _this4 = this;

      if (isHlsSource(media)) {
        this.destroy();

        hls_classPrivateFieldSet(this, _HlsMedia_player, new Hls(hls_classPrivateFieldGet(this, _HlsMedia_options, "f")), "f");

        hls_classPrivateFieldGet(this, _HlsMedia_player, "f").loadSource(media.src);

        hls_classPrivateFieldGet(this, _HlsMedia_player, "f").attachMedia(this.element);

        hls_classPrivateFieldSet(this, _HlsMedia_events, Hls.Events, "f");

        Object.keys(hls_classPrivateFieldGet(this, _HlsMedia_events, "f")).forEach(function (event) {
          hls_classPrivateFieldGet(_this4, _HlsMedia_player, "f").on(hls_classPrivateFieldGet(_this4, _HlsMedia_events, "f")[event], function () {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            return _this4._assign(hls_classPrivateFieldGet(_this4, _HlsMedia_events, "f")[event], args);
          });
        });
      }
    }
  }, {
    key: "levels",
    get: function get() {
      var _this5 = this;

      var levels = [];

      if (hls_classPrivateFieldGet(this, _HlsMedia_player, "f") && hls_classPrivateFieldGet(this, _HlsMedia_player, "f").levels && hls_classPrivateFieldGet(this, _HlsMedia_player, "f").levels.length) {
        Object.keys(hls_classPrivateFieldGet(this, _HlsMedia_player, "f").levels).forEach(function (item) {
          var _classPrivateFieldGe = hls_classPrivateFieldGet(_this5, _HlsMedia_player, "f").levels[item],
              height = _classPrivateFieldGe.height,
              name = _classPrivateFieldGe.name;

          var level = {
            height: height,
            id: item,
            label: name || null
          };
          levels.push(level);
        });
      }

      return levels;
    }
  }, {
    key: "level",
    get: function get() {
      return hls_classPrivateFieldGet(this, _HlsMedia_player, "f") ? hls_classPrivateFieldGet(this, _HlsMedia_player, "f").currentLevel : '-1';
    },
    set: function set(level) {
      hls_classPrivateFieldGet(this, _HlsMedia_player, "f").currentLevel = level;
    }
  }, {
    key: "_create",
    value: function _create() {
      var _this6 = this;

      var autoplay = !!(this.element.preload === 'auto' || hls_classPrivateFieldGet(this, _HlsMedia_autoplay, "f"));
      hls_classPrivateFieldGet(this, _HlsMedia_options, "f").autoStartLoad = autoplay;

      hls_classPrivateFieldSet(this, _HlsMedia_player, new Hls(hls_classPrivateFieldGet(this, _HlsMedia_options, "f")), "f");

      this.instance = hls_classPrivateFieldGet(this, _HlsMedia_player, "f");

      hls_classPrivateFieldSet(this, _HlsMedia_events, Hls.Events, "f");

      Object.keys(hls_classPrivateFieldGet(this, _HlsMedia_events, "f")).forEach(function (event) {
        hls_classPrivateFieldGet(_this6, _HlsMedia_player, "f").on(hls_classPrivateFieldGet(_this6, _HlsMedia_events, "f")[event], function () {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return _this6._assign(hls_classPrivateFieldGet(_this6, _HlsMedia_events, "f")[event], args);
        });
      });

      if (!autoplay) {
        this.element.addEventListener('play', this._play, EVENT_OPTIONS);
        this.element.addEventListener('pause', this._pause, EVENT_OPTIONS);
      }
    }
  }, {
    key: "_assign",
    value: function _assign(event, data) {
      if (event === 'hlsError') {
        var errorDetails = {
          detail: {
            data: data,
            message: data[1].details,
            type: 'HLS'
          }
        };
        var errorEvent = addEvent('playererror', errorDetails);
        this.element.dispatchEvent(errorEvent);
        var type = data[1].type;
        var fatal = data[1].fatal;
        var details = data[1];

        if (fatal) {
          switch (type) {
            case 'mediaError':
              var now = new Date().getTime();

              if (!hls_classPrivateFieldGet(this, _HlsMedia_recoverDecodingErrorDate, "f") || now - hls_classPrivateFieldGet(this, _HlsMedia_recoverDecodingErrorDate, "f") > 3000) {
                hls_classPrivateFieldSet(this, _HlsMedia_recoverDecodingErrorDate, new Date().getTime(), "f");

                hls_classPrivateFieldGet(this, _HlsMedia_player, "f").recoverMediaError();
              } else if (!hls_classPrivateFieldGet(this, _HlsMedia_recoverSwapAudioCodecDate, "f") || now - hls_classPrivateFieldGet(this, _HlsMedia_recoverSwapAudioCodecDate, "f") > 3000) {
                hls_classPrivateFieldSet(this, _HlsMedia_recoverSwapAudioCodecDate, new Date().getTime(), "f");

                console.warn('Attempting to swap Audio Codec and recover from media error');

                hls_classPrivateFieldGet(this, _HlsMedia_player, "f").swapAudioCodec();

                hls_classPrivateFieldGet(this, _HlsMedia_player, "f").recoverMediaError();
              } else {
                var msg = 'Cannot recover, last media error recovery failed';
                console.error(msg);
                var mediaEvent = addEvent(type, {
                  detail: {
                    data: details
                  }
                });
                this.element.dispatchEvent(mediaEvent);
              }

              break;

            case 'networkError':
              var message = 'Network error';
              console.error(message);
              var networkEvent = addEvent(type, {
                detail: {
                  data: details
                }
              });
              this.element.dispatchEvent(networkEvent);
              break;

            default:
              hls_classPrivateFieldGet(this, _HlsMedia_player, "f").destroy();

              var fatalEvent = addEvent(type, {
                detail: {
                  data: details
                }
              });
              this.element.dispatchEvent(fatalEvent);
              break;
          }
        } else {
          var err = addEvent(type, {
            detail: {
              data: details
            }
          });
          this.element.dispatchEvent(err);
        }
      } else {
        var _details = data[1];

        if (event === 'hlsLevelLoaded' && _details.live === true) {
          this.element.setAttribute('op-live__enabled', 'true');
          var timeEvent = addEvent('timeupdate');
          this.element.dispatchEvent(timeEvent);
        } else if (event === 'hlsLevelUpdated' && _details.live === true && _details.totalduration > DVR_THRESHOLD) {
          this.element.setAttribute('op-dvr__enabled', 'true');

          var _timeEvent = addEvent('timeupdate');

          this.element.dispatchEvent(_timeEvent);
        } else if (event === 'hlsFragParsingMetadata') {
          var metaEvent = addEvent('metadataready', {
            detail: {
              data: data[1]
            }
          });
          this.element.dispatchEvent(metaEvent);
        }

        var e = addEvent(event, {
          detail: {
            data: data[1]
          }
        });
        this.element.dispatchEvent(e);
      }
    }
  }, {
    key: "_play",
    value: function _play() {
      if (hls_classPrivateFieldGet(this, _HlsMedia_player, "f")) {
        hls_classPrivateFieldGet(this, _HlsMedia_player, "f").startLoad();
      }
    }
  }, {
    key: "_pause",
    value: function _pause() {
      if (hls_classPrivateFieldGet(this, _HlsMedia_player, "f")) {
        hls_classPrivateFieldGet(this, _HlsMedia_player, "f").stopLoad();
      }
    }
  }]);

  return HlsMedia;
}(media_native);

_HlsMedia_player = new WeakMap(), _HlsMedia_events = new WeakMap(), _HlsMedia_recoverDecodingErrorDate = new WeakMap(), _HlsMedia_recoverSwapAudioCodecDate = new WeakMap(), _HlsMedia_options = new WeakMap(), _HlsMedia_autoplay = new WeakMap();
/* harmony default export */ const hls = (HlsMedia);
;// CONCATENATED MODULE: ./src/js/media/html5.ts







function html5_createSuper(Derived) { var hasNativeReflectConstruct = html5_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function html5_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var html5_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var html5_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _HTML5Media_currentLevel, _HTML5Media_levelList, _HTML5Media_isStreaming, _HTML5Media_retryCount, _HTML5Media_started, _HTML5Media_timer;






var HTML5Media = function (_Native) {
  inherits_default()(HTML5Media, _Native);

  var _super = html5_createSuper(HTML5Media);

  function HTML5Media(element, mediaFile) {
    var _this;

    classCallCheck_default()(this, HTML5Media);

    _this = _super.call(this, element, mediaFile);

    _HTML5Media_currentLevel.set(assertThisInitialized_default()(_this), void 0);

    _HTML5Media_levelList.set(assertThisInitialized_default()(_this), []);

    _HTML5Media_isStreaming.set(assertThisInitialized_default()(_this), false);

    _HTML5Media_retryCount.set(assertThisInitialized_default()(_this), 0);

    _HTML5Media_started.set(assertThisInitialized_default()(_this), false);

    _HTML5Media_timer.set(assertThisInitialized_default()(_this), void 0);

    if (!isAudio(element) && !isVideo(element)) {
      throw new TypeError('Native method only supports video/audio tags');
    }

    _this._clearTimeout = _this._clearTimeout.bind(assertThisInitialized_default()(_this));
    _this._setTimeout = _this._setTimeout.bind(assertThisInitialized_default()(_this));
    _this._dispatchError = _this._dispatchError.bind(assertThisInitialized_default()(_this));
    _this._isDvrEnabled = _this._isDvrEnabled.bind(assertThisInitialized_default()(_this));
    _this._readMediadataInfo = _this._readMediadataInfo.bind(assertThisInitialized_default()(_this));

    html5_classPrivateFieldSet(assertThisInitialized_default()(_this), _HTML5Media_isStreaming, isHlsSource(mediaFile), "f");

    _this.element.addEventListener('playing', _this._clearTimeout, EVENT_OPTIONS);

    _this.element.addEventListener('stalled', _this._setTimeout, EVENT_OPTIONS);

    _this.element.addEventListener('error', _this._dispatchError, EVENT_OPTIONS);

    _this.element.addEventListener('loadeddata', _this._isDvrEnabled, EVENT_OPTIONS);

    _this.element.textTracks.addEventListener('addtrack', _this._readMediadataInfo, EVENT_OPTIONS);

    return _this;
  }

  createClass_default()(HTML5Media, [{
    key: "canPlayType",
    value: function canPlayType(mimeType) {
      return !!this.element.canPlayType(mimeType).replace('no', '');
    }
  }, {
    key: "load",
    value: function load() {
      this.element.load();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.element.removeEventListener('playing', this._clearTimeout);
      this.element.removeEventListener('stalled', this._setTimeout);
      this.element.removeEventListener('error', this._dispatchError);
      this.element.removeEventListener('loadeddata', this._isDvrEnabled);
      this.element.textTracks.removeEventListener('addtrack', this._readMediadataInfo);
    }
  }, {
    key: "levels",
    get: function get() {
      if (!html5_classPrivateFieldGet(this, _HTML5Media_levelList, "f").length) {
        var levels = this.element.querySelectorAll('source[title]');

        for (var i = 0, total = levels.length; i < total; ++i) {
          var level = {
            height: 0,
            id: "".concat(i),
            label: levels[i].getAttribute('title') || ''
          };

          html5_classPrivateFieldGet(this, _HTML5Media_levelList, "f").push(level);
        }
      }

      return html5_classPrivateFieldGet(this, _HTML5Media_levelList, "f");
    }
  }, {
    key: "level",
    get: function get() {
      var _a;

      return ((_a = html5_classPrivateFieldGet(this, _HTML5Media_currentLevel, "f")) === null || _a === void 0 ? void 0 : _a.id) || '-1';
    },
    set: function set(level) {
      var idx = html5_classPrivateFieldGet(this, _HTML5Media_levelList, "f").findIndex(function (item) {
        return item.id === level;
      });

      if (idx > -1) {
        html5_classPrivateFieldSet(this, _HTML5Media_currentLevel, this.levels[idx], "f");

        var levels = this.element.querySelectorAll('source[title]');

        for (var i = 0, total = levels.length; i < total; ++i) {
          var source = levels[i].getAttribute('src');

          if (source && parseInt(html5_classPrivateFieldGet(this, _HTML5Media_currentLevel, "f").id, 10) === i) {
            this.element.src = source;
          }
        }
      }
    }
  }, {
    key: "src",
    set: function set(media) {
      this.element.src = media.src;
    }
  }, {
    key: "_isDvrEnabled",
    value: function _isDvrEnabled() {
      var time = this.element.seekable.end(this.element.seekable.length - 1) - this.element.seekable.start(0);

      if (html5_classPrivateFieldGet(this, _HTML5Media_isStreaming, "f") && time > DVR_THRESHOLD && !this.element.getAttribute('op-dvr__enabled')) {
        this.element.setAttribute('op-dvr__enabled', 'true');
        var timeEvent = addEvent('timeupdate');
        this.element.dispatchEvent(timeEvent);
      }
    }
  }, {
    key: "_readMediadataInfo",
    value: function _readMediadataInfo(e) {
      var _this2 = this;

      var _a;

      var target = e;

      if (((_a = target === null || target === void 0 ? void 0 : target.track) === null || _a === void 0 ? void 0 : _a.kind) === 'metadata') {
        target.track.mode = 'hidden';
        target.track.addEventListener('cuechange', function (event) {
          var track = event.target;
          var cue = track.activeCues ? track.activeCues[0] : null;

          if (cue) {
            var metaDataEvent = addEvent('metadataready', {
              detail: cue
            });

            _this2.element.dispatchEvent(metaDataEvent);
          }
        }, EVENT_OPTIONS);
      }
    }
  }, {
    key: "_setTimeout",
    value: function _setTimeout() {
      var _this3 = this;

      if (!html5_classPrivateFieldGet(this, _HTML5Media_started, "f") && window !== undefined) {
        html5_classPrivateFieldSet(this, _HTML5Media_started, true, "f");

        html5_classPrivateFieldSet(this, _HTML5Media_timer, window.setInterval(function () {
          var _a;

          if (html5_classPrivateFieldGet(_this3, _HTML5Media_retryCount, "f") >= 30) {
            clearInterval(html5_classPrivateFieldGet(_this3, _HTML5Media_timer, "f"));
            var message = 'Media download failed part-way due to a network error';
            var details = {
              detail: {
                data: {
                  message: message,
                  error: 2
                },
                message: message,
                type: 'HTML5'
              }
            };
            var errorEvent = addEvent('playererror', details);

            _this3.element.dispatchEvent(errorEvent);

            html5_classPrivateFieldSet(_this3, _HTML5Media_retryCount, 0, "f");

            html5_classPrivateFieldSet(_this3, _HTML5Media_started, false, "f");
          } else {
            html5_classPrivateFieldSet(_this3, _HTML5Media_retryCount, (_a = html5_classPrivateFieldGet(_this3, _HTML5Media_retryCount, "f"), _a++, _a), "f");
          }
        }, 1000), "f");
      }
    }
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      if (html5_classPrivateFieldGet(this, _HTML5Media_timer, "f")) {
        clearInterval(html5_classPrivateFieldGet(this, _HTML5Media_timer, "f"));

        html5_classPrivateFieldSet(this, _HTML5Media_retryCount, 0, "f");

        html5_classPrivateFieldSet(this, _HTML5Media_started, false, "f");
      }
    }
  }, {
    key: "_dispatchError",
    value: function _dispatchError(e) {
      var defaultMessage;
      var target = e.target;
      var error = target === null || target === void 0 ? void 0 : target.error;

      switch (error === null || error === void 0 ? void 0 : error.code) {
        case error === null || error === void 0 ? void 0 : error.MEDIA_ERR_ABORTED:
          defaultMessage = 'Media playback aborted';
          break;

        case error === null || error === void 0 ? void 0 : error.MEDIA_ERR_NETWORK:
          defaultMessage = 'Media download failed part-way due to a network error';
          break;

        case error === null || error === void 0 ? void 0 : error.MEDIA_ERR_DECODE:
          defaultMessage = "Media playback aborted due to a corruption problem or because the\n                    media used features your browser did not support.";
          break;

        case error === null || error === void 0 ? void 0 : error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          defaultMessage = "Media could not be loaded, either because the server or network failed\n                    or because the format is not supported.";
          break;

        default:
          defaultMessage = 'Unknown error occurred.';
          break;
      }

      var details = {
        detail: {
          data: Object.assign(Object.assign({}, e), {
            message: defaultMessage,
            error: error === null || error === void 0 ? void 0 : error.code
          }),
          message: defaultMessage,
          type: 'HTML5'
        }
      };
      var errorEvent = addEvent('playererror', details);
      this.element.dispatchEvent(errorEvent);
    }
  }]);

  return HTML5Media;
}(media_native);

_HTML5Media_currentLevel = new WeakMap(), _HTML5Media_levelList = new WeakMap(), _HTML5Media_isStreaming = new WeakMap(), _HTML5Media_retryCount = new WeakMap(), _HTML5Media_started = new WeakMap(), _HTML5Media_timer = new WeakMap();
/* harmony default export */ const html5 = (HTML5Media);
;// CONCATENATED MODULE: ./src/js/media.ts






var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var media_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var media_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Media_element, _Media_media, _Media_files, _Media_promisePlay, _Media_options, _Media_autoplay, _Media_mediaLoaded, _Media_customMedia, _Media_currentSrc;







var Media = function () {
  function Media(element, options, autoplay, customMedia) {
    classCallCheck_default()(this, Media);

    _Media_element.set(this, void 0);

    _Media_media.set(this, void 0);

    _Media_files.set(this, void 0);

    _Media_promisePlay.set(this, void 0);

    _Media_options.set(this, void 0);

    _Media_autoplay.set(this, void 0);

    _Media_mediaLoaded.set(this, false);

    _Media_customMedia.set(this, {
      media: {},
      optionsKey: {},
      rules: []
    });

    _Media_currentSrc.set(this, void 0);

    media_classPrivateFieldSet(this, _Media_element, element, "f");

    media_classPrivateFieldSet(this, _Media_options, options, "f");

    media_classPrivateFieldSet(this, _Media_files, this._getMediaFiles(), "f");

    media_classPrivateFieldSet(this, _Media_customMedia, customMedia, "f");

    media_classPrivateFieldSet(this, _Media_autoplay, autoplay, "f");
  }

  createClass_default()(Media, [{
    key: "canPlayType",
    value: function canPlayType(mimeType) {
      return media_classPrivateFieldGet(this, _Media_media, "f").canPlayType(mimeType);
    }
  }, {
    key: "load",
    value: function load() {
      return __awaiter(this, void 0, void 0, regenerator_default().mark(function _callee() {
        var _this = this;

        var sameMedia;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!media_classPrivateFieldGet(this, _Media_mediaLoaded, "f")) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                media_classPrivateFieldSet(this, _Media_mediaLoaded, true, "f");

                if (media_classPrivateFieldGet(this, _Media_files, "f").length) {
                  _context.next = 5;
                  break;
                }

                throw new TypeError('Media not set');

              case 5:
                if (media_classPrivateFieldGet(this, _Media_media, "f") && typeof media_classPrivateFieldGet(this, _Media_media, "f").destroy === 'function') {
                  sameMedia = media_classPrivateFieldGet(this, _Media_files, "f").length === 1 && media_classPrivateFieldGet(this, _Media_files, "f")[0].src === media_classPrivateFieldGet(this, _Media_media, "f").media.src;

                  if (!sameMedia) {
                    media_classPrivateFieldGet(this, _Media_media, "f").destroy();
                  }
                }

                media_classPrivateFieldGet(this, _Media_files, "f").some(function (media) {
                  try {
                    media_classPrivateFieldSet(_this, _Media_media, _this._invoke(media), "f");
                  } catch (e) {
                    media_classPrivateFieldSet(_this, _Media_media, new html5(media_classPrivateFieldGet(_this, _Media_element, "f"), media), "f");
                  }

                  return media_classPrivateFieldGet(_this, _Media_media, "f").canPlayType(media.type);
                });

                _context.prev = 7;

                if (!(media_classPrivateFieldGet(this, _Media_media, "f") === null)) {
                  _context.next = 10;
                  break;
                }

                throw new TypeError('Media cannot be played with any valid media type');

              case 10:
                _context.next = 12;
                return media_classPrivateFieldGet(this, _Media_media, "f").promise;

              case 12:
                media_classPrivateFieldGet(this, _Media_media, "f").load();

                _context.next = 19;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](7);

                if (media_classPrivateFieldGet(this, _Media_media, "f")) {
                  media_classPrivateFieldGet(this, _Media_media, "f").destroy();
                }

                throw _context.t0;

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 15]]);
      }));
    }
  }, {
    key: "play",
    value: function play() {
      return __awaiter(this, void 0, void 0, regenerator_default().mark(function _callee2() {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (media_classPrivateFieldGet(this, _Media_mediaLoaded, "f")) {
                  _context2.next = 7;
                  break;
                }

                media_classPrivateFieldSet(this, _Media_mediaLoaded, true, "f");

                _context2.next = 4;
                return this.load();

              case 4:
                media_classPrivateFieldSet(this, _Media_mediaLoaded, false, "f");

                _context2.next = 9;
                break;

              case 7:
                _context2.next = 9;
                return media_classPrivateFieldGet(this, _Media_media, "f").promise;

              case 9:
                media_classPrivateFieldSet(this, _Media_promisePlay, media_classPrivateFieldGet(this, _Media_media, "f").play(), "f");

                return _context2.abrupt("return", media_classPrivateFieldGet(this, _Media_promisePlay, "f"));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "pause",
    value: function pause() {
      return __awaiter(this, void 0, void 0, regenerator_default().mark(function _callee3() {
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(media_classPrivateFieldGet(this, _Media_promisePlay, "f") !== undefined)) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return media_classPrivateFieldGet(this, _Media_promisePlay, "f");

              case 3:
                media_classPrivateFieldGet(this, _Media_media, "f").pause();

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (media_classPrivateFieldGet(this, _Media_media, "f")) {
        media_classPrivateFieldGet(this, _Media_media, "f").destroy();
      }
    }
  }, {
    key: "src",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_files, "f");
    },
    set: function set(media) {
      if (typeof media === 'string') {
        media_classPrivateFieldGet(this, _Media_files, "f").push({
          src: media,
          type: predictMimeType(media, media_classPrivateFieldGet(this, _Media_element, "f"))
        });
      } else if (Array.isArray(media)) {
        media_classPrivateFieldSet(this, _Media_files, media, "f");
      } else if (typeof_default()(media) === 'object') {
        media_classPrivateFieldGet(this, _Media_files, "f").push(media);
      }

      media_classPrivateFieldSet(this, _Media_files, media_classPrivateFieldGet(this, _Media_files, "f").filter(function (file) {
        return file.src;
      }), "f");

      if (media_classPrivateFieldGet(this, _Media_files, "f").length > 0) {
        var _classPrivateFieldGe = media_classPrivateFieldGet(this, _Media_files, "f"),
            _classPrivateFieldGe2 = slicedToArray_default()(_classPrivateFieldGe, 1),
            file = _classPrivateFieldGe2[0];

        if (media_classPrivateFieldGet(this, _Media_element, "f").src) {
          media_classPrivateFieldGet(this, _Media_element, "f").setAttribute('data-op-file', media_classPrivateFieldGet(this, _Media_files, "f")[0].src);
        }

        media_classPrivateFieldGet(this, _Media_element, "f").src = file.src;

        media_classPrivateFieldSet(this, _Media_currentSrc, file, "f");

        if (media_classPrivateFieldGet(this, _Media_media, "f")) {
          media_classPrivateFieldGet(this, _Media_media, "f").src = file;
        }
      } else {
        media_classPrivateFieldGet(this, _Media_element, "f").src = '';
      }
    }
  }, {
    key: "current",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_currentSrc, "f");
    }
  }, {
    key: "mediaFiles",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_files, "f");
    },
    set: function set(sources) {
      media_classPrivateFieldSet(this, _Media_files, sources, "f");
    }
  }, {
    key: "volume",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_media, "f") ? media_classPrivateFieldGet(this, _Media_media, "f").volume : media_classPrivateFieldGet(this, _Media_element, "f").volume;
    },
    set: function set(value) {
      if (media_classPrivateFieldGet(this, _Media_media, "f")) {
        media_classPrivateFieldGet(this, _Media_media, "f").volume = value;
      }
    }
  }, {
    key: "muted",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_media, "f") ? media_classPrivateFieldGet(this, _Media_media, "f").muted : media_classPrivateFieldGet(this, _Media_element, "f").muted;
    },
    set: function set(value) {
      if (media_classPrivateFieldGet(this, _Media_media, "f")) {
        media_classPrivateFieldGet(this, _Media_media, "f").muted = value;
      }
    }
  }, {
    key: "playbackRate",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_media, "f") ? media_classPrivateFieldGet(this, _Media_media, "f").playbackRate : media_classPrivateFieldGet(this, _Media_element, "f").playbackRate;
    },
    set: function set(value) {
      if (media_classPrivateFieldGet(this, _Media_media, "f")) {
        media_classPrivateFieldGet(this, _Media_media, "f").playbackRate = value;
      }
    }
  }, {
    key: "defaultPlaybackRate",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_media, "f") ? media_classPrivateFieldGet(this, _Media_media, "f").defaultPlaybackRate : media_classPrivateFieldGet(this, _Media_element, "f").defaultPlaybackRate;
    },
    set: function set(value) {
      if (media_classPrivateFieldGet(this, _Media_media, "f")) {
        media_classPrivateFieldGet(this, _Media_media, "f").defaultPlaybackRate = value;
      }
    }
  }, {
    key: "currentTime",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_media, "f") ? media_classPrivateFieldGet(this, _Media_media, "f").currentTime : media_classPrivateFieldGet(this, _Media_element, "f").currentTime;
    },
    set: function set(value) {
      if (media_classPrivateFieldGet(this, _Media_media, "f")) {
        media_classPrivateFieldGet(this, _Media_media, "f").currentTime = value;
      }
    }
  }, {
    key: "duration",
    get: function get() {
      var duration = media_classPrivateFieldGet(this, _Media_media, "f") ? media_classPrivateFieldGet(this, _Media_media, "f").duration : media_classPrivateFieldGet(this, _Media_element, "f").duration;

      if (duration === Infinity && media_classPrivateFieldGet(this, _Media_element, "f").seekable && media_classPrivateFieldGet(this, _Media_element, "f").seekable.length) {
        return media_classPrivateFieldGet(this, _Media_element, "f").seekable.end(0);
      }

      return duration;
    }
  }, {
    key: "paused",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_media, "f") ? media_classPrivateFieldGet(this, _Media_media, "f").paused : media_classPrivateFieldGet(this, _Media_element, "f").paused;
    }
  }, {
    key: "ended",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_media, "f") ? media_classPrivateFieldGet(this, _Media_media, "f").ended : media_classPrivateFieldGet(this, _Media_element, "f").ended;
    }
  }, {
    key: "loaded",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_mediaLoaded, "f");
    },
    set: function set(loaded) {
      media_classPrivateFieldSet(this, _Media_mediaLoaded, loaded, "f");
    }
  }, {
    key: "level",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_media, "f") ? media_classPrivateFieldGet(this, _Media_media, "f").level : -1;
    },
    set: function set(value) {
      if (media_classPrivateFieldGet(this, _Media_media, "f")) {
        media_classPrivateFieldGet(this, _Media_media, "f").level = value;
      }
    }
  }, {
    key: "levels",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_media, "f") ? media_classPrivateFieldGet(this, _Media_media, "f").levels : [];
    }
  }, {
    key: "instance",
    get: function get() {
      return media_classPrivateFieldGet(this, _Media_media, "f") ? media_classPrivateFieldGet(this, _Media_media, "f").instance : null;
    }
  }, {
    key: "_getMediaFiles",
    value: function _getMediaFiles() {
      var mediaFiles = [];

      var sourceTags = media_classPrivateFieldGet(this, _Media_element, "f").querySelectorAll('source');

      var nodeSource = media_classPrivateFieldGet(this, _Media_element, "f").src;

      if (nodeSource) {
        mediaFiles.push({
          src: nodeSource,
          type: media_classPrivateFieldGet(this, _Media_element, "f").getAttribute('type') || predictMimeType(nodeSource, media_classPrivateFieldGet(this, _Media_element, "f"))
        });
      }

      for (var i = 0, total = sourceTags.length; i < total; i++) {
        var item = sourceTags[i];
        var src = item.src;
        mediaFiles.push({
          src: src,
          type: item.getAttribute('type') || predictMimeType(src, media_classPrivateFieldGet(this, _Media_element, "f"))
        });

        if (i === 0) {
          var file = mediaFiles[0];

          media_classPrivateFieldSet(this, _Media_currentSrc, file, "f");
        }
      }

      if (!mediaFiles.length) {
        mediaFiles.push({
          src: '',
          type: predictMimeType('', media_classPrivateFieldGet(this, _Media_element, "f"))
        });
      }

      return mediaFiles;
    }
  }, {
    key: "_invoke",
    value: function _invoke(media) {
      var _this2 = this;

      var _a, _b, _c;

      var playHLSNatively = media_classPrivateFieldGet(this, _Media_element, "f").canPlayType('application/vnd.apple.mpegurl') || media_classPrivateFieldGet(this, _Media_element, "f").canPlayType('application/x-mpegURL');

      media_classPrivateFieldSet(this, _Media_currentSrc, media, "f");

      var _ref = media_classPrivateFieldGet(this, _Media_options, "f").controls || {},
          layers = _ref.layers;

      var activeLevels = false;

      if (layers) {
        Object.keys(layers).forEach(function (layer) {
          var current = layers ? layers[layer] : null;

          if (current && current.indexOf('levels') > -1) {
            activeLevels = true;
          }
        });
      }

      if (Object.keys(media_classPrivateFieldGet(this, _Media_customMedia, "f").media).length) {
        var customRef;

        media_classPrivateFieldGet(this, _Media_customMedia, "f").rules.forEach(function (rule) {
          var type = rule(media.src);

          if (type) {
            var customMedia = media_classPrivateFieldGet(_this2, _Media_customMedia, "f").media[type];

            var customOptions = media_classPrivateFieldGet(_this2, _Media_options, "f")[media_classPrivateFieldGet(_this2, _Media_customMedia, "f").optionsKey[type]] || undefined;
            customRef = customMedia(media_classPrivateFieldGet(_this2, _Media_element, "f"), media, media_classPrivateFieldGet(_this2, _Media_autoplay, "f"), customOptions);
          }
        });

        if (customRef) {
          customRef.create();
          return customRef;
        }

        return new html5(media_classPrivateFieldGet(this, _Media_element, "f"), media);
      }

      if (isHlsSource(media)) {
        if (playHLSNatively && media_classPrivateFieldGet(this, _Media_options, "f").forceNative && !activeLevels) {
          return new html5(media_classPrivateFieldGet(this, _Media_element, "f"), media);
        }

        var hlsOptions = ((_a = media_classPrivateFieldGet(this, _Media_options, "f")) === null || _a === void 0 ? void 0 : _a.hls) || undefined;
        return new hls(media_classPrivateFieldGet(this, _Media_element, "f"), media, media_classPrivateFieldGet(this, _Media_autoplay, "f"), hlsOptions);
      }

      if (isDashSource(media)) {
        var dashOptions = ((_b = media_classPrivateFieldGet(this, _Media_options, "f")) === null || _b === void 0 ? void 0 : _b.dash) || undefined;
        return new dash(media_classPrivateFieldGet(this, _Media_element, "f"), media, dashOptions);
      }

      if (isFlvSource(media)) {
        var flvOptions = ((_c = media_classPrivateFieldGet(this, _Media_options, "f")) === null || _c === void 0 ? void 0 : _c.flv) || {
          debug: false,
          type: 'flv',
          url: media.src
        };
        return new flv(media_classPrivateFieldGet(this, _Media_element, "f"), media, flvOptions);
      }

      return new html5(media_classPrivateFieldGet(this, _Media_element, "f"), media);
    }
  }]);

  return Media;
}();

_Media_element = new WeakMap(), _Media_media = new WeakMap(), _Media_files = new WeakMap(), _Media_promisePlay = new WeakMap(), _Media_options = new WeakMap(), _Media_autoplay = new WeakMap(), _Media_mediaLoaded = new WeakMap(), _Media_customMedia = new WeakMap(), _Media_currentSrc = new WeakMap();
/* harmony default export */ const js_media = (Media);
;// CONCATENATED MODULE: ./src/js/media/ads.ts




var ads_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var ads_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var ads_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Ads_ended, _Ads_done, _Ads_active, _Ads_started, _Ads_intervalTimer, _Ads_volume, _Ads_muted, _Ads_duration, _Ads_currentTime, _Ads_manager, _Ads_player, _Ads_media, _Ads_element, _Ads_events, _Ads_ads, _Ads_promise, _Ads_loader, _Ads_container, _Ads_customClickContainer, _Ads_skipElement, _Ads_displayContainer, _Ads_request, _Ads_autostart, _Ads_autostartMuted, _Ads_playTriggered, _Ads_options, _Ads_currentIndex, _Ads_originalVolume, _Ads_preloadContent, _Ads_lastTimePaused, _Ads_mediaSources, _Ads_mediaStarted, _Ads_adEvent;




var Ads = function () {
  function Ads(player, ads, autostart, autostartMuted, options) {
    var _this = this;

    classCallCheck_default()(this, Ads);

    var _a, _b, _c, _d;

    this.loadedAd = false;

    _Ads_ended.set(this, false);

    _Ads_done.set(this, false);

    _Ads_active.set(this, false);

    _Ads_started.set(this, false);

    _Ads_intervalTimer.set(this, 0);

    _Ads_volume.set(this, void 0);

    _Ads_muted.set(this, false);

    _Ads_duration.set(this, 0);

    _Ads_currentTime.set(this, 0);

    _Ads_manager.set(this, null);

    _Ads_player.set(this, void 0);

    _Ads_media.set(this, void 0);

    _Ads_element.set(this, void 0);

    _Ads_events.set(this, []);

    _Ads_ads.set(this, void 0);

    _Ads_promise.set(this, void 0);

    _Ads_loader.set(this, void 0);

    _Ads_container.set(this, void 0);

    _Ads_customClickContainer.set(this, void 0);

    _Ads_skipElement.set(this, void 0);

    _Ads_displayContainer.set(this, void 0);

    _Ads_request.set(this, void 0);

    _Ads_autostart.set(this, false);

    _Ads_autostartMuted.set(this, false);

    _Ads_playTriggered.set(this, false);

    _Ads_options.set(this, void 0);

    _Ads_currentIndex.set(this, 0);

    _Ads_originalVolume.set(this, void 0);

    _Ads_preloadContent.set(this, void 0);

    _Ads_lastTimePaused.set(this, 0);

    _Ads_mediaSources.set(this, []);

    _Ads_mediaStarted.set(this, false);

    _Ads_adEvent.set(this, null);

    var defaultOpts = {
      autoPlayAdBreaks: true,
      customClick: {
        enabled: false,
        label: 'Click here for more info'
      },
      audioSkip: {
        enabled: true,
        label: 'Skip Ad',
        remainingLabel: 'Skip in [[secs]] seconds'
      },
      debug: false,
      enablePreloading: false,
      language: 'en',
      loop: false,
      numRedirects: 4,
      publisherId: undefined,
      sdkPath: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
      sessionId: undefined,
      src: [],
      vpaidMode: 'enabled'
    };

    ads_classPrivateFieldSet(this, _Ads_player, player, "f");

    ads_classPrivateFieldSet(this, _Ads_ads, ads, "f");

    ads_classPrivateFieldSet(this, _Ads_media, player.getMedia(), "f");

    ads_classPrivateFieldSet(this, _Ads_element, player.getElement(), "f");

    ads_classPrivateFieldSet(this, _Ads_autostart, autostart || false, "f");

    ads_classPrivateFieldSet(this, _Ads_muted, player.getElement().muted, "f");

    ads_classPrivateFieldSet(this, _Ads_autostartMuted, autostartMuted || false, "f");

    ads_classPrivateFieldSet(this, _Ads_options, Object.assign(Object.assign({}, defaultOpts), options), "f");

    if ((options === null || options === void 0 ? void 0 : options.customClick) && Object.keys(options.customClick).length) {
      ads_classPrivateFieldGet(this, _Ads_options, "f").customClick = Object.assign(Object.assign({}, defaultOpts.customClick), options.customClick);
    }

    ads_classPrivateFieldSet(this, _Ads_playTriggered, false, "f");

    ads_classPrivateFieldSet(this, _Ads_originalVolume, ads_classPrivateFieldGet(this, _Ads_element, "f").volume, "f");

    ads_classPrivateFieldSet(this, _Ads_volume, ads_classPrivateFieldGet(this, _Ads_originalVolume, "f"), "f");

    var path = ((_a = ads_classPrivateFieldGet(this, _Ads_options, "f")) === null || _a === void 0 ? void 0 : _a.debug) ? (_c = (_b = ads_classPrivateFieldGet(this, _Ads_options, "f")) === null || _b === void 0 ? void 0 : _b.sdkPath) === null || _c === void 0 ? void 0 : _c.replace(/(\.js$)/, '_debug.js') : (_d = ads_classPrivateFieldGet(this, _Ads_options, "f")) === null || _d === void 0 ? void 0 : _d.sdkPath;
    this.load = this.load.bind(this);
    this.resizeAds = this.resizeAds.bind(this);
    this._handleClickInContainer = this._handleClickInContainer.bind(this);
    this._handleSkipAds = this._handleSkipAds.bind(this);
    this._loaded = this._loaded.bind(this);
    this._error = this._error.bind(this);
    this._assign = this._assign.bind(this);
    this._contentLoadedAction = this._contentLoadedAction.bind(this);
    this._loadedMetadataHandler = this._loadedMetadataHandler.bind(this);
    this._contentEndedListener = this._contentEndedListener.bind(this);
    this._handleResizeAds = this._handleResizeAds.bind(this);
    this._onContentPauseRequested = this._onContentPauseRequested.bind(this);
    this._onContentResumeRequested = this._onContentResumeRequested.bind(this);

    ads_classPrivateFieldSet(this, _Ads_promise, path && (typeof google === 'undefined' || typeof google.ima === 'undefined') ? loadScript(path) : new Promise(function (resolve) {
      resolve();
    }), "f");

    ads_classPrivateFieldGet(this, _Ads_promise, "f").then(function () {
      _this.load();
    }).catch(function (error) {
      var message = 'Ad script could not be loaded; please check if you have an AdBlock ';
      message += 'turned on, or if you provided a valid URL is correct';
      console.error("Ad error: ".concat(message, "."));
      var details = {
        detail: {
          data: error,
          message: message,
          type: 'Ads'
        }
      };
      var errorEvent = addEvent('playererror', details);

      ads_classPrivateFieldGet(_this, _Ads_element, "f").dispatchEvent(errorEvent);
    });
  }

  createClass_default()(Ads, [{
    key: "load",
    value: function load() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var _a, _b, _c;

      if (typeof google === 'undefined' || !google.ima || !force && this.loadedAd && ads_classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks) {
        return;
      }

      if (!ads_classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks && !force) {
        return;
      }

      this.loadedAd = true;

      var existingContainer = ads_classPrivateFieldGet(this, _Ads_player, "f").getContainer().querySelector('.op-ads');

      if (existingContainer && existingContainer.parentNode) {
        existingContainer.parentNode.removeChild(existingContainer);
      }

      ads_classPrivateFieldSet(this, _Ads_started, true, "f");

      ads_classPrivateFieldSet(this, _Ads_container, document.createElement('div'), "f");

      ads_classPrivateFieldGet(this, _Ads_container, "f").className = 'op-ads';
      ads_classPrivateFieldGet(this, _Ads_container, "f").tabIndex = -1;

      if (ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
        ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.insertBefore(ads_classPrivateFieldGet(this, _Ads_container, "f"), ads_classPrivateFieldGet(this, _Ads_element, "f").nextSibling);
      }

      ads_classPrivateFieldGet(this, _Ads_container, "f").addEventListener('click', this._handleClickInContainer);

      if ((_a = ads_classPrivateFieldGet(this, _Ads_options, "f").customClick) === null || _a === void 0 ? void 0 : _a.enabled) {
        ads_classPrivateFieldSet(this, _Ads_customClickContainer, document.createElement('div'), "f");

        ads_classPrivateFieldGet(this, _Ads_customClickContainer, "f").className = 'op-ads__click-container';
        ads_classPrivateFieldGet(this, _Ads_customClickContainer, "f").innerHTML = "<div class=\"op-ads__click-label\">".concat(ads_classPrivateFieldGet(this, _Ads_options, "f").customClick.label, "</div>");

        if (ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
          ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.insertBefore(ads_classPrivateFieldGet(this, _Ads_customClickContainer, "f"), ads_classPrivateFieldGet(this, _Ads_element, "f").nextSibling);
        }
      }

      if (isAudio(ads_classPrivateFieldGet(this, _Ads_element, "f")) && ((_b = ads_classPrivateFieldGet(this, _Ads_options, "f").audioSkip) === null || _b === void 0 ? void 0 : _b.enabled)) {
        if ((_c = ads_classPrivateFieldGet(this, _Ads_options, "f").audioSkip) === null || _c === void 0 ? void 0 : _c.element) {
          var _ref = ads_classPrivateFieldGet(this, _Ads_options, "f").audioSkip || {},
              element = _ref.element;

          if (typeof element === 'string') {
            var target = document.getElementById(element);

            if (target) {
              ads_classPrivateFieldSet(this, _Ads_skipElement, target, "f");
            }
          } else if (element instanceof HTMLElement) {
            ads_classPrivateFieldSet(this, _Ads_skipElement, element, "f");
          }
        } else {
          ads_classPrivateFieldSet(this, _Ads_skipElement, document.createElement('button'), "f");

          ads_classPrivateFieldGet(this, _Ads_skipElement, "f").className = 'op-ads__skip hidden';

          ads_classPrivateFieldGet(this, _Ads_player, "f").getControls().getContainer().appendChild(ads_classPrivateFieldGet(this, _Ads_skipElement, "f"));
        }

        if (ads_classPrivateFieldGet(this, _Ads_skipElement, "f")) {
          ads_classPrivateFieldGet(this, _Ads_skipElement, "f").addEventListener('click', this._handleSkipAds, EVENT_OPTIONS);
        }
      }

      ads_classPrivateFieldSet(this, _Ads_mediaSources, ads_classPrivateFieldGet(this, _Ads_media, "f").src, "f");

      var vpaidModeMap = {
        disabled: google.ima.ImaSdkSettings.VpaidMode.DISABLED,
        enabled: google.ima.ImaSdkSettings.VpaidMode.ENABLED,
        insecure: google.ima.ImaSdkSettings.VpaidMode.INSECURE
      };
      google.ima.settings.setVpaidMode(vpaidModeMap[ads_classPrivateFieldGet(this, _Ads_options, "f").vpaidMode || 'enabled']);
      google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
      google.ima.settings.setAutoPlayAdBreaks(ads_classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks);
      google.ima.settings.setNumRedirects(ads_classPrivateFieldGet(this, _Ads_options, "f").numRedirects);
      google.ima.settings.setLocale(ads_classPrivateFieldGet(this, _Ads_options, "f").language);

      if (ads_classPrivateFieldGet(this, _Ads_options, "f").sessionId) {
        google.ima.settings.setSessionId(ads_classPrivateFieldGet(this, _Ads_options, "f").sessionId);
      }

      if (ads_classPrivateFieldGet(this, _Ads_options, "f").publisherId) {
        google.ima.settings.setPpid(ads_classPrivateFieldGet(this, _Ads_options, "f").publisherId);
      }

      google.ima.settings.setPlayerType('openplayerjs');
      google.ima.settings.setPlayerVersion('3.0.0');

      ads_classPrivateFieldSet(this, _Ads_displayContainer, new google.ima.AdDisplayContainer(ads_classPrivateFieldGet(this, _Ads_container, "f"), ads_classPrivateFieldGet(this, _Ads_element, "f"), ads_classPrivateFieldGet(this, _Ads_customClickContainer, "f")), "f");

      ads_classPrivateFieldSet(this, _Ads_loader, new google.ima.AdsLoader(ads_classPrivateFieldGet(this, _Ads_displayContainer, "f")), "f");

      ads_classPrivateFieldGet(this, _Ads_loader, "f").addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded, EVENT_OPTIONS);

      ads_classPrivateFieldGet(this, _Ads_loader, "f").addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error, EVENT_OPTIONS);

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this._handleResizeAds, EVENT_OPTIONS);
      }

      ads_classPrivateFieldGet(this, _Ads_element, "f").addEventListener('loadedmetadata', this._handleResizeAds, EVENT_OPTIONS);

      if (ads_classPrivateFieldGet(this, _Ads_autostart, "f") === true || ads_classPrivateFieldGet(this, _Ads_autostartMuted, "f") === true || force === true || ads_classPrivateFieldGet(this, _Ads_options, "f").enablePreloading === true || ads_classPrivateFieldGet(this, _Ads_playTriggered, "f") === true) {
        if (!ads_classPrivateFieldGet(this, _Ads_done, "f")) {
          ads_classPrivateFieldSet(this, _Ads_done, true, "f");

          ads_classPrivateFieldGet(this, _Ads_displayContainer, "f").initialize();
        }

        this._requestAds();
      }
    }
  }, {
    key: "play",
    value: function play() {
      return ads_awaiter(this, void 0, void 0, regenerator_default().mark(function _callee() {
        var e;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (ads_classPrivateFieldGet(this, _Ads_done, "f")) {
                  _context.next = 4;
                  break;
                }

                ads_classPrivateFieldSet(this, _Ads_playTriggered, true, "f");

                this._initNotDoneAds();

                return _context.abrupt("return");

              case 4:
                if (ads_classPrivateFieldGet(this, _Ads_manager, "f")) {
                  try {
                    if (!ads_classPrivateFieldGet(this, _Ads_intervalTimer, "f") && ads_classPrivateFieldGet(this, _Ads_active, "f") === false) {
                      ads_classPrivateFieldGet(this, _Ads_manager, "f").start();
                    } else {
                      ads_classPrivateFieldGet(this, _Ads_manager, "f").resume();
                    }

                    ads_classPrivateFieldSet(this, _Ads_active, true, "f");

                    e = addEvent('play');

                    ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
                  } catch (err) {
                    this._resumeMedia();
                  }
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "pause",
    value: function pause() {
      if (ads_classPrivateFieldGet(this, _Ads_manager, "f")) {
        ads_classPrivateFieldSet(this, _Ads_active, false, "f");

        ads_classPrivateFieldGet(this, _Ads_manager, "f").pause();

        var e = addEvent('pause');

        ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      var _a, _b;

      if (ads_classPrivateFieldGet(this, _Ads_manager, "f")) {
        ads_classPrivateFieldGet(this, _Ads_manager, "f").removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error);

        if (ads_classPrivateFieldGet(this, _Ads_events, "f")) {
          ads_classPrivateFieldGet(this, _Ads_events, "f").forEach(function (event) {
            ads_classPrivateFieldGet(_this2, _Ads_manager, "f").removeEventListener(event, _this2._assign);
          });
        }
      }

      ads_classPrivateFieldSet(this, _Ads_events, [], "f");

      var controls = ads_classPrivateFieldGet(this, _Ads_player, "f").getControls();

      var mouseEvents = controls ? controls.events.mouse : {};
      Object.keys(mouseEvents).forEach(function (event) {
        if (ads_classPrivateFieldGet(_this2, _Ads_container, "f")) {
          ads_classPrivateFieldGet(_this2, _Ads_container, "f").removeEventListener(event, mouseEvents[event]);
        }
      });

      if (ads_classPrivateFieldGet(this, _Ads_loader, "f")) {
        ads_classPrivateFieldGet(this, _Ads_loader, "f").removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error);

        ads_classPrivateFieldGet(this, _Ads_loader, "f").removeEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded);
      }

      var destroy = !Array.isArray(ads_classPrivateFieldGet(this, _Ads_ads, "f")) || ads_classPrivateFieldGet(this, _Ads_currentIndex, "f") > ads_classPrivateFieldGet(this, _Ads_ads, "f").length;

      if (ads_classPrivateFieldGet(this, _Ads_manager, "f") && destroy) {
        ads_classPrivateFieldGet(this, _Ads_manager, "f").destroy();
      }

      if (((_a = ads_classPrivateFieldGet(this, _Ads_options, "f").customClick) === null || _a === void 0 ? void 0 : _a.enabled) && ads_classPrivateFieldGet(this, _Ads_customClickContainer, "f")) {
        ads_classPrivateFieldGet(this, _Ads_customClickContainer, "f").remove();
      }

      if (((_b = ads_classPrivateFieldGet(this, _Ads_options, "f").audioSkip) === null || _b === void 0 ? void 0 : _b.enabled) && ads_classPrivateFieldGet(this, _Ads_skipElement, "f")) {
        ads_classPrivateFieldGet(this, _Ads_skipElement, "f").removeEventListener('click', this._handleSkipAds);

        ads_classPrivateFieldGet(this, _Ads_skipElement, "f").remove();
      }

      if (IS_IOS || IS_ANDROID) {
        ads_classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('loadedmetadata', this._contentLoadedAction);
      }

      ads_classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('loadedmetadata', this._handleResizeAds);

      ads_classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('loadedmetadata', this._loadedMetadataHandler);

      ads_classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('ended', this._contentEndedListener);

      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this._handleResizeAds);
      }

      if (ads_classPrivateFieldGet(this, _Ads_container, "f")) {
        ads_classPrivateFieldGet(this, _Ads_container, "f").removeEventListener('click', this._handleClickInContainer);

        ads_classPrivateFieldGet(this, _Ads_container, "f").remove();
      }

      this.loadPromise = null;
      this.loadedAd = false;

      ads_classPrivateFieldSet(this, _Ads_done, false, "f");

      ads_classPrivateFieldSet(this, _Ads_playTriggered, false, "f");

      ads_classPrivateFieldSet(this, _Ads_duration, 0, "f");

      ads_classPrivateFieldSet(this, _Ads_currentTime, 0, "f");

      ads_classPrivateFieldSet(this, _Ads_adEvent, null, "f");
    }
  }, {
    key: "resizeAds",
    value: function resizeAds(width, height) {
      var _this3 = this;

      if (ads_classPrivateFieldGet(this, _Ads_manager, "f")) {
        var target = ads_classPrivateFieldGet(this, _Ads_element, "f");

        var mode = target.getAttribute('data-fullscreen') === 'true' ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
        var formattedWidth = width;
        var percentageWidth = width ? width.toString() : '';

        if (width && percentageWidth.indexOf('%') > -1) {
          if (ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
            formattedWidth = ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.offsetWidth * (parseInt(percentageWidth, 10) / 100);
          }
        }

        var formattedHeight = height;
        var percentageHeight = height ? height.toString() : '';

        if (height && percentageHeight.indexOf('%') > -1) {
          if (ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
            formattedHeight = ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.offsetHeight * (parseInt(percentageHeight, 10) / 100);
          }
        }

        var timeout;

        if (timeout && typeof window !== 'undefined') {
          window.cancelAnimationFrame(timeout);
        }

        if (typeof window !== 'undefined') {
          timeout = window.requestAnimationFrame(function () {
            ads_classPrivateFieldGet(_this3, _Ads_manager, "f").resize(formattedWidth || target.offsetWidth, formattedHeight || target.offsetHeight, mode);
          });
        }
      }
    }
  }, {
    key: "getAdsManager",
    value: function getAdsManager() {
      return ads_classPrivateFieldGet(this, _Ads_manager, "f");
    }
  }, {
    key: "getAdsLoader",
    value: function getAdsLoader() {
      return ads_classPrivateFieldGet(this, _Ads_loader, "f");
    }
  }, {
    key: "started",
    value: function started() {
      return ads_classPrivateFieldGet(this, _Ads_started, "f");
    }
  }, {
    key: "src",
    set: function set(source) {
      ads_classPrivateFieldSet(this, _Ads_ads, source, "f");
    }
  }, {
    key: "isDone",
    set: function set(value) {
      ads_classPrivateFieldSet(this, _Ads_done, value, "f");
    }
  }, {
    key: "playRequested",
    set: function set(value) {
      ads_classPrivateFieldSet(this, _Ads_playTriggered, value, "f");
    }
  }, {
    key: "volume",
    get: function get() {
      return ads_classPrivateFieldGet(this, _Ads_manager, "f") ? ads_classPrivateFieldGet(this, _Ads_manager, "f").getVolume() : ads_classPrivateFieldGet(this, _Ads_originalVolume, "f");
    },
    set: function set(value) {
      if (ads_classPrivateFieldGet(this, _Ads_manager, "f")) {
        ads_classPrivateFieldSet(this, _Ads_volume, value, "f");

        ads_classPrivateFieldGet(this, _Ads_manager, "f").setVolume(value);

        this._setMediaVolume(value);

        ads_classPrivateFieldSet(this, _Ads_muted, value === 0, "f");
      }
    }
  }, {
    key: "muted",
    get: function get() {
      return ads_classPrivateFieldGet(this, _Ads_muted, "f");
    },
    set: function set(value) {
      if (ads_classPrivateFieldGet(this, _Ads_manager, "f")) {
        if (value) {
          ads_classPrivateFieldGet(this, _Ads_manager, "f").setVolume(0);

          ads_classPrivateFieldSet(this, _Ads_muted, true, "f");

          this._setMediaVolume(0);
        } else {
          ads_classPrivateFieldGet(this, _Ads_manager, "f").setVolume(ads_classPrivateFieldGet(this, _Ads_volume, "f"));

          ads_classPrivateFieldSet(this, _Ads_muted, false, "f");

          this._setMediaVolume(ads_classPrivateFieldGet(this, _Ads_volume, "f"));
        }
      }
    }
  }, {
    key: "currentTime",
    get: function get() {
      return ads_classPrivateFieldGet(this, _Ads_currentTime, "f");
    },
    set: function set(value) {
      ads_classPrivateFieldSet(this, _Ads_currentTime, value, "f");
    }
  }, {
    key: "duration",
    get: function get() {
      return ads_classPrivateFieldGet(this, _Ads_duration, "f");
    }
  }, {
    key: "paused",
    get: function get() {
      return !ads_classPrivateFieldGet(this, _Ads_active, "f");
    }
  }, {
    key: "ended",
    get: function get() {
      return ads_classPrivateFieldGet(this, _Ads_ended, "f");
    }
  }, {
    key: "_assign",
    value: function _assign(event) {
      var _this4 = this;

      var _a, _b;

      var ad = event.getAd();

      if (ad) {
        ads_classPrivateFieldSet(this, _Ads_adEvent, ad, "f");
      }

      switch (event.type) {
        case google.ima.AdEvent.Type.LOADED:
          if (!ad.isLinear()) {
            this._onContentResumeRequested();
          } else {
            if (IS_IPHONE && isVideo(ads_classPrivateFieldGet(this, _Ads_element, "f"))) {
              ads_classPrivateFieldGet(this, _Ads_element, "f").controls = false;
            }

            ads_classPrivateFieldSet(this, _Ads_duration, ad.getDuration(), "f");

            ads_classPrivateFieldSet(this, _Ads_currentTime, ad.getDuration(), "f");

            if (!ads_classPrivateFieldGet(this, _Ads_mediaStarted, "f") && !IS_IOS && !IS_ANDROID) {
              var waitingEvent = addEvent('waiting');

              ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(waitingEvent);

              var loadedEvent = addEvent('loadedmetadata');

              ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(loadedEvent);

              this.resizeAds();
            }
          }

          break;

        case google.ima.AdEvent.Type.STARTED:
          if (ad.isLinear()) {
            if (ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement && !ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.contains('op-ads--active')) {
              ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.add('op-ads--active');
            }

            if (!ads_classPrivateFieldGet(this, _Ads_media, "f").paused) {
              ads_classPrivateFieldGet(this, _Ads_media, "f").pause();
            }

            ads_classPrivateFieldSet(this, _Ads_active, true, "f");

            var playEvent = addEvent('play');

            ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(playEvent);

            var resized;

            if (!resized) {
              this.resizeAds();
              resized = true;
            }

            if (ads_classPrivateFieldGet(this, _Ads_media, "f").ended) {
              ads_classPrivateFieldSet(this, _Ads_ended, false, "f");

              var endEvent = addEvent('adsmediaended');

              ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(endEvent);
            }

            if (typeof window !== 'undefined') {
              ads_classPrivateFieldSet(this, _Ads_intervalTimer, window.setInterval(function () {
                if (ads_classPrivateFieldGet(_this4, _Ads_active, "f") === true) {
                  ads_classPrivateFieldSet(_this4, _Ads_currentTime, Math.round(ads_classPrivateFieldGet(_this4, _Ads_manager, "f").getRemainingTime()), "f");

                  var timeEvent = addEvent('timeupdate');

                  ads_classPrivateFieldGet(_this4, _Ads_element, "f").dispatchEvent(timeEvent);
                }
              }, 350), "f");
            }
          }

          break;

        case google.ima.AdEvent.Type.COMPLETE:
        case google.ima.AdEvent.Type.SKIPPED:
          if (ad.isLinear()) {
            if (event.type === google.ima.AdEvent.Type.SKIPPED) {
              var skipEvent = addEvent('adsskipped');

              ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(skipEvent);
            }

            if (ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
              ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.remove('op-ads--active');
            }

            ads_classPrivateFieldSet(this, _Ads_active, false, "f");

            clearInterval(ads_classPrivateFieldGet(this, _Ads_intervalTimer, "f"));
          }

          break;

        case google.ima.AdEvent.Type.VOLUME_CHANGED:
          this._setMediaVolume(this.volume);

          break;

        case google.ima.AdEvent.Type.VOLUME_MUTED:
          if (ad.isLinear()) {
            var volumeEvent = addEvent('volumechange');

            ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(volumeEvent);
          }

          break;

        case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
          if (ad.isLinear()) {
            ads_classPrivateFieldSet(this, _Ads_active, false, "f");

            ads_classPrivateFieldSet(this, _Ads_ended, true, "f");

            ads_classPrivateFieldSet(this, _Ads_intervalTimer, 0, "f");

            ads_classPrivateFieldSet(this, _Ads_muted, false, "f");

            ads_classPrivateFieldSet(this, _Ads_started, false, "f");

            ads_classPrivateFieldSet(this, _Ads_adEvent, null, "f");

            if (ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
              ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.remove('op-ads--active');
            }

            this.destroy();

            if (ads_classPrivateFieldGet(this, _Ads_element, "f").currentTime >= ads_classPrivateFieldGet(this, _Ads_element, "f").duration) {
              var endedEvent = addEvent('ended');

              ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(endedEvent);
            }
          }

          break;

        case google.ima.AdEvent.Type.CLICK:
          var pauseEvent = addEvent('pause');

          ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(pauseEvent);

          break;

        case google.ima.AdEvent.Type.AD_BREAK_READY:
          if (!ads_classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks) {
            this.play();
          }

          break;

        case google.ima.AdEvent.Type.AD_PROGRESS:
          var progressData = event.getAdData();
          var offset = ads_classPrivateFieldGet(this, _Ads_adEvent, "f") ? ads_classPrivateFieldGet(this, _Ads_adEvent, "f").getSkipTimeOffset() : -1;

          if (ads_classPrivateFieldGet(this, _Ads_skipElement, "f")) {
            if (offset !== -1) {
              var canSkip = ads_classPrivateFieldGet(this, _Ads_manager, "f").getAdSkippableState();

              var remainingTime = Math.ceil(offset - progressData.currentTime);

              ads_classPrivateFieldGet(this, _Ads_skipElement, "f").classList.remove('hidden');

              if (canSkip) {
                ads_classPrivateFieldGet(this, _Ads_skipElement, "f").textContent = ((_a = ads_classPrivateFieldGet(this, _Ads_options, "f").audioSkip) === null || _a === void 0 ? void 0 : _a.label) || '';

                ads_classPrivateFieldGet(this, _Ads_skipElement, "f").classList.remove('disabled');
              } else {
                ads_classPrivateFieldGet(this, _Ads_skipElement, "f").textContent = ((_b = ads_classPrivateFieldGet(this, _Ads_options, "f").audioSkip) === null || _b === void 0 ? void 0 : _b.remainingLabel.replace('[[secs]]', remainingTime.toString())) || '';

                ads_classPrivateFieldGet(this, _Ads_skipElement, "f").classList.add('disabled');
              }
            } else {
              ads_classPrivateFieldGet(this, _Ads_skipElement, "f").classList.add('hidden');
            }
          }

          break;

        default:
          break;
      }

      if (event.type === google.ima.AdEvent.Type.LOG) {
        var adData = event.getAdData();

        if (adData.adError) {
          var message = adData.adError.getMessage();
          console.warn("Ad warning: Non-fatal error occurred: ".concat(message));
          var details = {
            detail: {
              data: adData.adError,
              message: message,
              type: 'Ads'
            }
          };
          var errorEvent = addEvent('playererror', details);

          ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(errorEvent);
        }
      } else {
        var e = addEvent("ads".concat(event.type));

        ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
      }
    }
  }, {
    key: "_error",
    value: function _error(event) {
      var _a;

      var error = event.getError();
      var details = {
        detail: {
          data: error,
          message: error.toString(),
          type: 'Ads'
        }
      };
      var errorEvent = addEvent('playererror', details);

      ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(errorEvent);

      var fatalErrorCodes = [100, 101, 102, 300, 301, 302, 303, 400, 401, 402, 403, 405, 406, 407, 408, 409, 410, 500, 501, 502, 503, 900, 901, 1005];

      if (Array.isArray(ads_classPrivateFieldGet(this, _Ads_ads, "f")) && ads_classPrivateFieldGet(this, _Ads_ads, "f").length > 1 && ads_classPrivateFieldGet(this, _Ads_currentIndex, "f") < ads_classPrivateFieldGet(this, _Ads_ads, "f").length - 1) {
        ads_classPrivateFieldSet(this, _Ads_currentIndex, (_a = ads_classPrivateFieldGet(this, _Ads_currentIndex, "f"), _a++, _a), "f");

        this.destroy();

        ads_classPrivateFieldSet(this, _Ads_started, true, "f");

        ads_classPrivateFieldSet(this, _Ads_playTriggered, true, "f");

        this.load(true);
        console.warn("Ad warning: ".concat(error.toString()));
      } else {
        if (fatalErrorCodes.indexOf(error.getErrorCode()) > -1) {
          if (ads_classPrivateFieldGet(this, _Ads_manager, "f")) {
            ads_classPrivateFieldGet(this, _Ads_manager, "f").destroy();
          }

          console.error("Ad error: ".concat(error.toString()));
        } else {
          console.warn("Ad warning: ".concat(error.toString()));
        }

        ads_classPrivateFieldSet(this, _Ads_adEvent, null, "f");

        if (ads_classPrivateFieldGet(this, _Ads_autostart, "f") === true || ads_classPrivateFieldGet(this, _Ads_autostartMuted, "f") === true || ads_classPrivateFieldGet(this, _Ads_started, "f") === true) {
          ads_classPrivateFieldSet(this, _Ads_active, false, "f");

          this._resumeMedia();
        }
      }
    }
  }, {
    key: "_loaded",
    value: function _loaded(managerLoadedEvent) {
      var adsRenderingSettings = new google.ima.AdsRenderingSettings();
      adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = false;
      adsRenderingSettings.enablePreloading = ads_classPrivateFieldGet(this, _Ads_options, "f").enablePreloading;

      ads_classPrivateFieldSet(this, _Ads_manager, managerLoadedEvent.getAdsManager(ads_classPrivateFieldGet(this, _Ads_element, "f"), adsRenderingSettings), "f");

      this._start(ads_classPrivateFieldGet(this, _Ads_manager, "f"));

      this.loadPromise = new Promise(function (resolve) {
        resolve();
      });
    }
  }, {
    key: "_start",
    value: function _start(manager) {
      var _this5 = this;

      if (ads_classPrivateFieldGet(this, _Ads_customClickContainer, "f") && manager.isCustomClickTrackingUsed()) {
        ads_classPrivateFieldGet(this, _Ads_customClickContainer, "f").classList.add('op-ads__click-container--visible');
      }

      manager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this._onContentPauseRequested, EVENT_OPTIONS);
      manager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this._onContentResumeRequested, EVENT_OPTIONS);

      ads_classPrivateFieldSet(this, _Ads_events, [google.ima.AdEvent.Type.ALL_ADS_COMPLETED, google.ima.AdEvent.Type.CLICK, google.ima.AdEvent.Type.VIDEO_CLICKED, google.ima.AdEvent.Type.VIDEO_ICON_CLICKED, google.ima.AdEvent.Type.AD_PROGRESS, google.ima.AdEvent.Type.AD_BUFFERING, google.ima.AdEvent.Type.IMPRESSION, google.ima.AdEvent.Type.DURATION_CHANGE, google.ima.AdEvent.Type.USER_CLOSE, google.ima.AdEvent.Type.LINEAR_CHANGED, google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, google.ima.AdEvent.Type.AD_METADATA, google.ima.AdEvent.Type.INTERACTION, google.ima.AdEvent.Type.COMPLETE, google.ima.AdEvent.Type.FIRST_QUARTILE, google.ima.AdEvent.Type.LOADED, google.ima.AdEvent.Type.MIDPOINT, google.ima.AdEvent.Type.PAUSED, google.ima.AdEvent.Type.RESUMED, google.ima.AdEvent.Type.USER_CLOSE, google.ima.AdEvent.Type.STARTED, google.ima.AdEvent.Type.THIRD_QUARTILE, google.ima.AdEvent.Type.SKIPPED, google.ima.AdEvent.Type.VOLUME_CHANGED, google.ima.AdEvent.Type.VOLUME_MUTED, google.ima.AdEvent.Type.LOG], "f");

      if (!ads_classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks) {
        ads_classPrivateFieldGet(this, _Ads_events, "f").push(google.ima.AdEvent.Type.AD_BREAK_READY);
      }

      var controls = ads_classPrivateFieldGet(this, _Ads_player, "f").getControls();

      var mouseEvents = controls ? controls.events.mouse : {};
      Object.keys(mouseEvents).forEach(function (event) {
        if (ads_classPrivateFieldGet(_this5, _Ads_container, "f")) {
          ads_classPrivateFieldGet(_this5, _Ads_container, "f").addEventListener(event, mouseEvents[event], EVENT_OPTIONS);
        }
      });

      ads_classPrivateFieldGet(this, _Ads_events, "f").forEach(function (event) {
        manager.addEventListener(event, _this5._assign, EVENT_OPTIONS);
      });

      if (ads_classPrivateFieldGet(this, _Ads_autostart, "f") === true || ads_classPrivateFieldGet(this, _Ads_autostartMuted, "f") === true || ads_classPrivateFieldGet(this, _Ads_playTriggered, "f") === true) {
        ads_classPrivateFieldSet(this, _Ads_playTriggered, false, "f");

        if (!ads_classPrivateFieldGet(this, _Ads_done, "f")) {
          this._initNotDoneAds();

          return;
        }

        manager.init(ads_classPrivateFieldGet(this, _Ads_element, "f").offsetWidth, ads_classPrivateFieldGet(this, _Ads_element, "f").offsetHeight, ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement && ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.getAttribute('data-fullscreen') === 'true' ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL);
        manager.start();
        var e = addEvent('play');

        ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
      } else if (ads_classPrivateFieldGet(this, _Ads_options, "f").enablePreloading === true) {
        manager.init(ads_classPrivateFieldGet(this, _Ads_element, "f").offsetWidth, ads_classPrivateFieldGet(this, _Ads_element, "f").offsetHeight, ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement && ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.getAttribute('data-fullscreen') === 'true' ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL);
      }
    }
  }, {
    key: "_initNotDoneAds",
    value: function _initNotDoneAds() {
      if (ads_classPrivateFieldGet(this, _Ads_displayContainer, "f")) {
        ads_classPrivateFieldSet(this, _Ads_done, true, "f");

        ads_classPrivateFieldGet(this, _Ads_displayContainer, "f").initialize();

        if (IS_IOS || IS_ANDROID) {
          ads_classPrivateFieldSet(this, _Ads_preloadContent, this._contentLoadedAction, "f");

          ads_classPrivateFieldGet(this, _Ads_element, "f").addEventListener('loadedmetadata', this._contentLoadedAction, EVENT_OPTIONS);

          ads_classPrivateFieldGet(this, _Ads_element, "f").load();
        } else {
          this._contentLoadedAction();
        }
      } else {
        this.load();
        this.loadedAd = false;
      }
    }
  }, {
    key: "_contentEndedListener",
    value: function _contentEndedListener() {
      ads_classPrivateFieldSet(this, _Ads_ended, true, "f");

      ads_classPrivateFieldSet(this, _Ads_active, false, "f");

      ads_classPrivateFieldSet(this, _Ads_started, false, "f");

      ads_classPrivateFieldGet(this, _Ads_loader, "f").contentComplete();
    }
  }, {
    key: "_onContentPauseRequested",
    value: function _onContentPauseRequested() {
      ads_classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('ended', this._contentEndedListener);

      ads_classPrivateFieldSet(this, _Ads_lastTimePaused, ads_classPrivateFieldGet(this, _Ads_media, "f").currentTime, "f");

      if (ads_classPrivateFieldGet(this, _Ads_started, "f")) {
        ads_classPrivateFieldGet(this, _Ads_media, "f").pause();
      } else {
        ads_classPrivateFieldSet(this, _Ads_started, true, "f");
      }

      var e = addEvent('play');

      ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
    }
  }, {
    key: "_onContentResumeRequested",
    value: function _onContentResumeRequested() {
      ads_classPrivateFieldGet(this, _Ads_element, "f").addEventListener('ended', this._contentEndedListener, EVENT_OPTIONS);

      ads_classPrivateFieldGet(this, _Ads_element, "f").addEventListener('loadedmetadata', this._loadedMetadataHandler, EVENT_OPTIONS);

      if (IS_IOS || IS_ANDROID) {
        ads_classPrivateFieldGet(this, _Ads_media, "f").src = ads_classPrivateFieldGet(this, _Ads_mediaSources, "f");

        ads_classPrivateFieldGet(this, _Ads_media, "f").load();

        this._prepareMedia();

        if (ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
          ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.add('op-ads--active');
        }
      } else {
        var event = addEvent('loadedmetadata');

        ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(event);
      }
    }
  }, {
    key: "_loadedMetadataHandler",
    value: function _loadedMetadataHandler() {
      var _a;

      if (Array.isArray(ads_classPrivateFieldGet(this, _Ads_ads, "f"))) {
        ads_classPrivateFieldSet(this, _Ads_currentIndex, (_a = ads_classPrivateFieldGet(this, _Ads_currentIndex, "f"), _a++, _a), "f");

        if (ads_classPrivateFieldGet(this, _Ads_currentIndex, "f") <= ads_classPrivateFieldGet(this, _Ads_ads, "f").length - 1) {
          if (ads_classPrivateFieldGet(this, _Ads_manager, "f")) {
            ads_classPrivateFieldGet(this, _Ads_manager, "f").destroy();
          }

          ads_classPrivateFieldGet(this, _Ads_loader, "f").contentComplete();

          ads_classPrivateFieldSet(this, _Ads_playTriggered, true, "f");

          ads_classPrivateFieldSet(this, _Ads_started, true, "f");

          ads_classPrivateFieldSet(this, _Ads_done, false, "f");

          this.load(true);
        } else {
          if (!ads_classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks) {
            this._resetAdsAfterManualBreak();
          }

          this._prepareMedia();
        }
      } else if (ads_classPrivateFieldGet(this, _Ads_element, "f").seekable.length) {
        if (ads_classPrivateFieldGet(this, _Ads_element, "f").seekable.end(0) > ads_classPrivateFieldGet(this, _Ads_lastTimePaused, "f")) {
          if (!ads_classPrivateFieldGet(this, _Ads_options, "f").autoPlayAdBreaks) {
            this._resetAdsAfterManualBreak();
          }

          this._prepareMedia();
        }
      } else {
        setTimeout(this._loadedMetadataHandler, 100);
      }
    }
  }, {
    key: "_resumeMedia",
    value: function _resumeMedia() {
      var _this6 = this;

      ads_classPrivateFieldSet(this, _Ads_intervalTimer, 0, "f");

      ads_classPrivateFieldSet(this, _Ads_muted, false, "f");

      ads_classPrivateFieldSet(this, _Ads_started, false, "f");

      ads_classPrivateFieldSet(this, _Ads_duration, 0, "f");

      ads_classPrivateFieldSet(this, _Ads_currentTime, 0, "f");

      if (ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
        ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.classList.remove('op-ads--active');
      }

      if (ads_classPrivateFieldGet(this, _Ads_media, "f").ended) {
        var e = addEvent('ended');

        ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
      } else {
        try {
          ads_classPrivateFieldGet(this, _Ads_media, "f").play();

          setTimeout(function () {
            var e = addEvent('play');

            ads_classPrivateFieldGet(_this6, _Ads_element, "f").dispatchEvent(e);
          }, 50);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }, {
    key: "_requestAds",
    value: function _requestAds() {
      ads_classPrivateFieldSet(this, _Ads_request, new google.ima.AdsRequest(), "f");

      var ads = Array.isArray(ads_classPrivateFieldGet(this, _Ads_ads, "f")) ? ads_classPrivateFieldGet(this, _Ads_ads, "f")[ads_classPrivateFieldGet(this, _Ads_currentIndex, "f")] : ads_classPrivateFieldGet(this, _Ads_ads, "f");

      if (isXml(ads)) {
        ads_classPrivateFieldGet(this, _Ads_request, "f").adsResponse = ads;
      } else {
        ads_classPrivateFieldGet(this, _Ads_request, "f").adTagUrl = ads;
      }

      var width = ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement ? ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.offsetWidth : 0;
      var height = ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement ? ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.offsetHeight : 0;
      ads_classPrivateFieldGet(this, _Ads_request, "f").linearAdSlotWidth = width;
      ads_classPrivateFieldGet(this, _Ads_request, "f").linearAdSlotHeight = height;
      ads_classPrivateFieldGet(this, _Ads_request, "f").nonLinearAdSlotWidth = width;
      ads_classPrivateFieldGet(this, _Ads_request, "f").nonLinearAdSlotHeight = height / 3;

      ads_classPrivateFieldGet(this, _Ads_request, "f").setAdWillAutoPlay(ads_classPrivateFieldGet(this, _Ads_autostart, "f"));

      ads_classPrivateFieldGet(this, _Ads_request, "f").setAdWillPlayMuted(ads_classPrivateFieldGet(this, _Ads_autostartMuted, "f"));

      ads_classPrivateFieldGet(this, _Ads_loader, "f").requestAds(ads_classPrivateFieldGet(this, _Ads_request, "f"));
    }
  }, {
    key: "_contentLoadedAction",
    value: function _contentLoadedAction() {
      if (ads_classPrivateFieldGet(this, _Ads_preloadContent, "f")) {
        ads_classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('loadedmetadata', ads_classPrivateFieldGet(this, _Ads_preloadContent, "f"));

        ads_classPrivateFieldSet(this, _Ads_preloadContent, null, "f");
      }

      this._requestAds();
    }
  }, {
    key: "_resetAdsAfterManualBreak",
    value: function _resetAdsAfterManualBreak() {
      if (ads_classPrivateFieldGet(this, _Ads_manager, "f")) {
        ads_classPrivateFieldGet(this, _Ads_manager, "f").destroy();
      }

      ads_classPrivateFieldGet(this, _Ads_loader, "f").contentComplete();

      ads_classPrivateFieldSet(this, _Ads_done, false, "f");

      ads_classPrivateFieldSet(this, _Ads_playTriggered, true, "f");
    }
  }, {
    key: "_prepareMedia",
    value: function _prepareMedia() {
      ads_classPrivateFieldGet(this, _Ads_media, "f").currentTime = ads_classPrivateFieldGet(this, _Ads_lastTimePaused, "f");

      ads_classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('loadedmetadata', this._loadedMetadataHandler);

      this._resumeMedia();
    }
  }, {
    key: "_setMediaVolume",
    value: function _setMediaVolume(volume) {
      ads_classPrivateFieldGet(this, _Ads_media, "f").volume = volume;
      ads_classPrivateFieldGet(this, _Ads_media, "f").muted = volume === 0;
    }
  }, {
    key: "_handleClickInContainer",
    value: function _handleClickInContainer() {
      if (ads_classPrivateFieldGet(this, _Ads_media, "f").paused) {
        var e = addEvent('paused');

        ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);

        this.pause();
      }
    }
  }, {
    key: "_handleResizeAds",
    value: function _handleResizeAds() {
      this.resizeAds();
    }
  }, {
    key: "_handleSkipAds",
    value: function _handleSkipAds() {
      ads_classPrivateFieldGet(this, _Ads_manager, "f").skip();
    }
  }]);

  return Ads;
}();

_Ads_ended = new WeakMap(), _Ads_done = new WeakMap(), _Ads_active = new WeakMap(), _Ads_started = new WeakMap(), _Ads_intervalTimer = new WeakMap(), _Ads_volume = new WeakMap(), _Ads_muted = new WeakMap(), _Ads_duration = new WeakMap(), _Ads_currentTime = new WeakMap(), _Ads_manager = new WeakMap(), _Ads_player = new WeakMap(), _Ads_media = new WeakMap(), _Ads_element = new WeakMap(), _Ads_events = new WeakMap(), _Ads_ads = new WeakMap(), _Ads_promise = new WeakMap(), _Ads_loader = new WeakMap(), _Ads_container = new WeakMap(), _Ads_customClickContainer = new WeakMap(), _Ads_skipElement = new WeakMap(), _Ads_displayContainer = new WeakMap(), _Ads_request = new WeakMap(), _Ads_autostart = new WeakMap(), _Ads_autostartMuted = new WeakMap(), _Ads_playTriggered = new WeakMap(), _Ads_options = new WeakMap(), _Ads_currentIndex = new WeakMap(), _Ads_originalVolume = new WeakMap(), _Ads_preloadContent = new WeakMap(), _Ads_lastTimePaused = new WeakMap(), _Ads_mediaSources = new WeakMap(), _Ads_mediaStarted = new WeakMap(), _Ads_adEvent = new WeakMap();
/* harmony default export */ const ads = (Ads);
;// CONCATENATED MODULE: ./src/js/player.ts






var player_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var player_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var player_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Player_controls, _Player_adsInstance, _Player_uid, _Player_element, _Player_ads, _Player_media, _Player_events, _Player_autoplay, _Player_volume, _Player_canAutoplay, _Player_canAutoplayMuted, _Player_processedAutoplay, _Player_options, _Player_customElements, _Player_fullscreen, _Player_defaultOptions;









var Player = function () {
  function Player(element, options) {
    classCallCheck_default()(this, Player);

    var _a;

    this.proxy = null;

    _Player_controls.set(this, void 0);

    _Player_adsInstance.set(this, void 0);

    _Player_uid.set(this, '');

    _Player_element.set(this, void 0);

    _Player_ads.set(this, void 0);

    _Player_media.set(this, void 0);

    _Player_events.set(this, {});

    _Player_autoplay.set(this, false);

    _Player_volume.set(this, void 0);

    _Player_canAutoplay.set(this, false);

    _Player_canAutoplayMuted.set(this, false);

    _Player_processedAutoplay.set(this, false);

    _Player_options.set(this, void 0);

    _Player_customElements.set(this, []);

    _Player_fullscreen.set(this, void 0);

    _Player_defaultOptions.set(this, {
      controls: {
        alwaysVisible: false,
        layers: {
          left: ['play', 'time', 'volume'],
          middle: ['progress'],
          right: ['captions', 'settings', 'fullscreen']
        }
      },
      defaultLevel: undefined,
      detachMenus: false,
      forceNative: true,
      height: 0,
      hidePlayBtnTimer: 350,
      labels: {
        auto: 'Auto',
        captions: 'CC/Subtitles',
        click: 'Click to unmute',
        fullscreen: 'Fullscreen',
        lang: {
          en: 'English'
        },
        levels: 'Quality Levels',
        live: 'Live Broadcast',
        mediaLevels: 'Change Quality',
        mute: 'Mute',
        off: 'Off',
        pause: 'Pause',
        play: 'Play',
        progressRail: 'Time Rail',
        progressSlider: 'Time Slider',
        settings: 'Player Settings',
        speed: 'Speed',
        speedNormal: 'Normal',
        tap: 'Tap to unmute',
        toggleCaptions: 'Toggle Captions',
        unmute: 'Unmute',
        volume: 'Volume',
        volumeControl: 'Volume Control',
        volumeSlider: 'Volume Slider'
      },
      live: {
        showLabel: true,
        showProgress: false
      },
      media: {
        pauseOnClick: false
      },
      mode: 'responsive',
      onError: function onError(e) {
        return console.error(e);
      },
      pauseOthers: true,
      progress: {
        allowRewind: true,
        allowSkip: true,
        duration: 0,
        showCurrentTimeOnly: false
      },
      showLoaderOnInit: false,
      startTime: 0,
      startVolume: 1,
      step: 0,
      useDeviceVolume: true,
      width: 0
    });

    player_classPrivateFieldSet(this, _Player_element, element instanceof HTMLMediaElement ? element : document.getElementById(element), "f");

    if (player_classPrivateFieldGet(this, _Player_element, "f")) {
      player_classPrivateFieldSet(this, _Player_autoplay, player_classPrivateFieldGet(this, _Player_element, "f").autoplay || false, "f");

      if (typeof options !== 'string' && !Array.isArray(options)) {
        this._mergeOptions(options);
      }

      player_classPrivateFieldGet(this, _Player_element, "f").volume = player_classPrivateFieldGet(this, _Player_options, "f").startVolume || 1;

      if (player_classPrivateFieldGet(this, _Player_options, "f").ads && player_classPrivateFieldGet(this, _Player_options, "f").ads.src) {
        player_classPrivateFieldSet(this, _Player_ads, player_classPrivateFieldGet(this, _Player_options, "f").ads.src, "f");
      }

      if ((((_a = player_classPrivateFieldGet(this, _Player_options, "f")) === null || _a === void 0 ? void 0 : _a.startTime) || 0) > 0) {
        player_classPrivateFieldGet(this, _Player_element, "f").currentTime = player_classPrivateFieldGet(this, _Player_options, "f").startTime || 0;
      }

      player_classPrivateFieldSet(this, _Player_volume, player_classPrivateFieldGet(this, _Player_element, "f").volume, "f");
    }

    this._autoplay = this._autoplay.bind(this);
    this._enableKeyBindings = this._enableKeyBindings.bind(this);
  }

  createClass_default()(Player, [{
    key: "init",
    value: function init() {
      return player_awaiter(this, void 0, void 0, regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._isValid()) {
                  _context.next = 9;
                  break;
                }

                this._wrapInstance();

                _context.next = 4;
                return this._prepareMedia();

              case 4:
                this._createPlayButton();

                this._createUID();

                this._createControls();

                this._setEvents();

                Player.instances[this.id] = this;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "load",
    value: function load() {
      return player_awaiter(this, void 0, void 0, regenerator_default().mark(function _callee2() {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (player_classPrivateFieldGet(this, _Player_media, "f")) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 3;
                return this._prepareMedia();

              case 3:
                return _context2.abrupt("return", player_classPrivateFieldGet(this, _Player_media, "f").load());

              case 4:
                player_classPrivateFieldGet(this, _Player_media, "f").loaded = false;
                return _context2.abrupt("return", this.isMedia() ? player_classPrivateFieldGet(this, _Player_media, "f").load() : undefined);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "play",
    value: function play() {
      return player_awaiter(this, void 0, void 0, regenerator_default().mark(function _callee3() {
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (player_classPrivateFieldGet(this, _Player_media, "f").loaded) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 3;
                return player_classPrivateFieldGet(this, _Player_media, "f").load();

              case 3:
                player_classPrivateFieldGet(this, _Player_media, "f").loaded = true;

              case 4:
                if (!player_classPrivateFieldGet(this, _Player_adsInstance, "f")) {
                  _context3.next = 9;
                  break;
                }

                player_classPrivateFieldGet(this, _Player_adsInstance, "f").playRequested = true;
                _context3.next = 8;
                return player_classPrivateFieldGet(this, _Player_adsInstance, "f").loadPromise;

              case 8:
                return _context3.abrupt("return", player_classPrivateFieldGet(this, _Player_adsInstance, "f").play());

              case 9:
                return _context3.abrupt("return", player_classPrivateFieldGet(this, _Player_media, "f").play());

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    }
  }, {
    key: "pause",
    value: function pause() {
      if (player_classPrivateFieldGet(this, _Player_adsInstance, "f")) {
        player_classPrivateFieldGet(this, _Player_adsInstance, "f").pause();
      } else {
        player_classPrivateFieldGet(this, _Player_media, "f").pause();
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.pause();

      if (player_classPrivateFieldGet(this, _Player_media, "f")) {
        player_classPrivateFieldGet(this, _Player_media, "f").currentTime = 0;
        this.src = [{
          src: '',
          type: 'video/mp4'
        }];
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this = this;

      var _a;

      if (player_classPrivateFieldGet(this, _Player_adsInstance, "f")) {
        player_classPrivateFieldGet(this, _Player_adsInstance, "f").pause();

        player_classPrivateFieldGet(this, _Player_adsInstance, "f").destroy();
      }

      if (player_classPrivateFieldGet(this, _Player_fullscreen, "f")) {
        player_classPrivateFieldGet(this, _Player_fullscreen, "f").destroy();
      }

      var el = player_classPrivateFieldGet(this, _Player_element, "f");

      if (player_classPrivateFieldGet(this, _Player_media, "f")) {
        player_classPrivateFieldGet(this, _Player_media, "f").destroy();
      }

      Object.keys(player_classPrivateFieldGet(this, _Player_events, "f")).forEach(function (event) {
        el.removeEventListener(event, player_classPrivateFieldGet(_this, _Player_events, "f")[event]);
      });
      this.getContainer().removeEventListener('keydown', this._enableKeyBindings);

      if (player_classPrivateFieldGet(this, _Player_autoplay, "f") && !player_classPrivateFieldGet(this, _Player_processedAutoplay, "f") && isVideo(player_classPrivateFieldGet(this, _Player_element, "f"))) {
        el.removeEventListener('canplay', this._autoplay);
      }

      if (player_classPrivateFieldGet(this, _Player_controls, "f")) {
        player_classPrivateFieldGet(this, _Player_controls, "f").destroy();
      }

      if (isVideo(player_classPrivateFieldGet(this, _Player_element, "f"))) {
        if (this.playBtn) {
          this.playBtn.remove();
        }

        if (this.loader) {
          this.loader.remove();
        }
      }

      if ((_a = player_classPrivateFieldGet(this, _Player_options, "f")) === null || _a === void 0 ? void 0 : _a.onError) {
        player_classPrivateFieldGet(this, _Player_element, "f").removeEventListener('playererror', player_classPrivateFieldGet(this, _Player_options, "f").onError);
      }

      el.controls = true;
      el.setAttribute('id', player_classPrivateFieldGet(this, _Player_uid, "f"));
      el.removeAttribute('op-live__enabled');
      el.removeAttribute('op-dvr__enabled');
      var parent = player_classPrivateFieldGet(this, _Player_options, "f").mode === 'fit' && !isAudio(el) ? el.closest('.op-player__fit--wrapper') : el.parentElement;

      if (parent && parent.parentNode) {
        parent.parentNode.replaceChild(el, parent);
      }

      delete Player.instances[player_classPrivateFieldGet(this, _Player_uid, "f")];
      var e = addEvent('playerdestroyed');
      el.dispatchEvent(e);
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return player_classPrivateFieldGet(this, _Player_element, "f").parentElement || player_classPrivateFieldGet(this, _Player_element, "f");
    }
  }, {
    key: "getControls",
    value: function getControls() {
      return player_classPrivateFieldGet(this, _Player_controls, "f");
    }
  }, {
    key: "getCustomControls",
    value: function getCustomControls() {
      return player_classPrivateFieldGet(this, _Player_customElements, "f");
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return player_classPrivateFieldGet(this, _Player_element, "f");
    }
  }, {
    key: "getEvents",
    value: function getEvents() {
      return player_classPrivateFieldGet(this, _Player_events, "f");
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return player_classPrivateFieldGet(this, _Player_options, "f");
    }
  }, {
    key: "activeElement",
    value: function activeElement() {
      return player_classPrivateFieldGet(this, _Player_adsInstance, "f") && player_classPrivateFieldGet(this, _Player_adsInstance, "f").started() ? player_classPrivateFieldGet(this, _Player_adsInstance, "f") : player_classPrivateFieldGet(this, _Player_media, "f");
    }
  }, {
    key: "isMedia",
    value: function isMedia() {
      return this.activeElement() instanceof js_media;
    }
  }, {
    key: "isAd",
    value: function isAd() {
      return this.activeElement() instanceof ads;
    }
  }, {
    key: "getMedia",
    value: function getMedia() {
      return player_classPrivateFieldGet(this, _Player_media, "f");
    }
  }, {
    key: "getAd",
    value: function getAd() {
      return player_classPrivateFieldGet(this, _Player_adsInstance, "f");
    }
  }, {
    key: "addCaptions",
    value: function addCaptions(args) {
      if (args.default) {
        var tracks = player_classPrivateFieldGet(this, _Player_element, "f").querySelectorAll('track');

        for (var i = 0, total = tracks.length; i < total; i++) {
          tracks[i].default = false;
        }
      }

      var el = player_classPrivateFieldGet(this, _Player_element, "f");

      var track = el.querySelector("track[srclang=\"".concat(args.srclang, "\"][kind=\"").concat(args.kind, "\"]"));

      if (track) {
        track.src = args.src;
        track.label = args.label;
        track.default = args.default || false;
      } else {
        track = document.createElement('track');
        track.srclang = args.srclang;
        track.src = args.src;
        track.kind = args.kind;
        track.label = args.label;
        track.default = args.default || false;
        el.appendChild(track);
      }

      var e = addEvent('controlschanged');
      el.dispatchEvent(e);
    }
  }, {
    key: "addControl",
    value: function addControl(args) {
      args.custom = true;
      args.type = 'button';

      player_classPrivateFieldGet(this, _Player_customElements, "f").push(args);

      var e = addEvent('controlschanged');

      player_classPrivateFieldGet(this, _Player_element, "f").dispatchEvent(e);
    }
  }, {
    key: "addElement",
    value: function addElement(args) {
      args.custom = true;

      player_classPrivateFieldGet(this, _Player_customElements, "f").push(args);

      var e = addEvent('controlschanged');

      player_classPrivateFieldGet(this, _Player_element, "f").dispatchEvent(e);
    }
  }, {
    key: "removeControl",
    value: function removeControl(controlName) {
      var _this2 = this;

      player_classPrivateFieldGet(this, _Player_customElements, "f").forEach(function (item, idx) {
        if (item.id === controlName) {
          player_classPrivateFieldGet(_this2, _Player_customElements, "f").splice(idx, 1);
        }
      });

      var e = addEvent('controlschanged');

      player_classPrivateFieldGet(this, _Player_element, "f").dispatchEvent(e);
    }
  }, {
    key: "_prepareMedia",
    value: function _prepareMedia() {
      var _a;

      return player_awaiter(this, void 0, void 0, regenerator_default().mark(function _callee4() {
        var preload, adsOptions;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                if ((_a = player_classPrivateFieldGet(this, _Player_options, "f")) === null || _a === void 0 ? void 0 : _a.onError) {
                  player_classPrivateFieldGet(this, _Player_element, "f").addEventListener('playererror', player_classPrivateFieldGet(this, _Player_options, "f").onError, EVENT_OPTIONS);
                }

                if (player_classPrivateFieldGet(this, _Player_autoplay, "f") && isVideo(player_classPrivateFieldGet(this, _Player_element, "f"))) {
                  player_classPrivateFieldGet(this, _Player_element, "f").addEventListener('canplay', this._autoplay, EVENT_OPTIONS);
                }

                player_classPrivateFieldSet(this, _Player_media, new js_media(player_classPrivateFieldGet(this, _Player_element, "f"), player_classPrivateFieldGet(this, _Player_options, "f"), player_classPrivateFieldGet(this, _Player_autoplay, "f"), Player.customMedia), "f");

                preload = player_classPrivateFieldGet(this, _Player_element, "f").getAttribute('preload');

                if (!(player_classPrivateFieldGet(this, _Player_ads, "f") || !preload || preload !== 'none')) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 8;
                return player_classPrivateFieldGet(this, _Player_media, "f").load();

              case 8:
                player_classPrivateFieldGet(this, _Player_media, "f").loaded = true;

              case 9:
                if (!player_classPrivateFieldGet(this, _Player_autoplay, "f") && player_classPrivateFieldGet(this, _Player_ads, "f")) {
                  adsOptions = player_classPrivateFieldGet(this, _Player_options, "f") && player_classPrivateFieldGet(this, _Player_options, "f").ads ? player_classPrivateFieldGet(this, _Player_options, "f").ads : undefined;

                  player_classPrivateFieldSet(this, _Player_adsInstance, new ads(this, player_classPrivateFieldGet(this, _Player_ads, "f"), false, false, adsOptions), "f");
                }

                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](0);
                console.error(_context4.t0);

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 12]]);
      }));
    }
  }, {
    key: "enableDefaultPlayer",
    value: function enableDefaultPlayer() {
      var _this3 = this;

      var paused = true;
      var currentTime = 0;

      if (this.proxy && !this.proxy.paused) {
        paused = false;
        currentTime = this.proxy.currentTime;
        this.proxy.pause();
      }

      this.proxy = this;
      this.getElement().addEventListener('loadedmetadata', function () {
        _this3.getMedia().currentTime = currentTime;

        if (!paused) {
          _this3.play();
        }
      });
    }
  }, {
    key: "loadAd",
    value: function loadAd(src) {
      return player_awaiter(this, void 0, void 0, regenerator_default().mark(function _callee5() {
        var adsOptions, autoplay;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                try {
                  if (this.isAd()) {
                    this.getAd().destroy();
                    this.getAd().src = src;
                    this.getAd().loadedAd = false;
                    this.getAd().load();
                  } else {
                    adsOptions = player_classPrivateFieldGet(this, _Player_options, "f") && player_classPrivateFieldGet(this, _Player_options, "f").ads ? player_classPrivateFieldGet(this, _Player_options, "f").ads : undefined;
                    autoplay = !this.activeElement().paused || player_classPrivateFieldGet(this, _Player_canAutoplay, "f");

                    player_classPrivateFieldSet(this, _Player_adsInstance, new ads(this, src, autoplay, player_classPrivateFieldGet(this, _Player_canAutoplayMuted, "f"), adsOptions), "f");
                  }
                } catch (err) {
                  console.error(err);
                }

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
    }
  }, {
    key: "src",
    get: function get() {
      return player_classPrivateFieldGet(this, _Player_media, "f").src;
    },
    set: function set(media) {
      var _this4 = this;

      if (player_classPrivateFieldGet(this, _Player_media, "f") instanceof js_media) {
        player_classPrivateFieldGet(this, _Player_media, "f").mediaFiles = [];
        player_classPrivateFieldGet(this, _Player_media, "f").src = media;
      } else if (typeof media === 'string') {
        player_classPrivateFieldGet(this, _Player_element, "f").src = media;
      } else if (Array.isArray(media)) {
        media.forEach(function (m) {
          var source = document.createElement('source');
          source.src = m.src;
          source.type = m.type || predictMimeType(m.src, player_classPrivateFieldGet(_this4, _Player_element, "f"));

          player_classPrivateFieldGet(_this4, _Player_element, "f").appendChild(source);
        });
      } else if (typeof_default()(media) === 'object') {
        player_classPrivateFieldGet(this, _Player_element, "f").src = media.src;
      }
    }
  }, {
    key: "id",
    get: function get() {
      return player_classPrivateFieldGet(this, _Player_uid, "f");
    }
  }, {
    key: "_isValid",
    value: function _isValid() {
      var el = player_classPrivateFieldGet(this, _Player_element, "f");

      if (el instanceof HTMLElement === false) {
        return false;
      }

      if (!isAudio(el) && !isVideo(el)) {
        return false;
      }

      if (!el.classList.contains('op-player__media')) {
        return false;
      }

      return true;
    }
  }, {
    key: "_wrapInstance",
    value: function _wrapInstance() {
      var wrapper = document.createElement('div');
      wrapper.className = 'op-player op-player__keyboard--inactive';
      wrapper.className += isAudio(player_classPrivateFieldGet(this, _Player_element, "f")) ? ' op-player__audio' : ' op-player__video';
      wrapper.tabIndex = 0;

      player_classPrivateFieldGet(this, _Player_element, "f").classList.remove('op-player');

      if (player_classPrivateFieldGet(this, _Player_element, "f").parentElement) {
        player_classPrivateFieldGet(this, _Player_element, "f").parentElement.insertBefore(wrapper, player_classPrivateFieldGet(this, _Player_element, "f"));
      }

      wrapper.appendChild(player_classPrivateFieldGet(this, _Player_element, "f"));
      var messageContainer = document.createElement('div');
      messageContainer.className = 'op-status';
      messageContainer.innerHTML = '<span></span>';
      messageContainer.tabIndex = -1;
      messageContainer.setAttribute('aria-hidden', 'true');

      if (isVideo(player_classPrivateFieldGet(this, _Player_element, "f")) && player_classPrivateFieldGet(this, _Player_element, "f").parentElement) {
        player_classPrivateFieldGet(this, _Player_element, "f").parentElement.insertBefore(messageContainer, player_classPrivateFieldGet(this, _Player_element, "f"));
      }

      wrapper.addEventListener('keydown', function () {
        if (wrapper.classList.contains('op-player__keyboard--inactive')) {
          wrapper.classList.remove('op-player__keyboard--inactive');
        }
      }, EVENT_OPTIONS);
      wrapper.addEventListener('click', function () {
        if (!wrapper.classList.contains('op-player__keyboard--inactive')) {
          wrapper.classList.add('op-player__keyboard--inactive');
        }
      }, EVENT_OPTIONS);

      if (player_classPrivateFieldGet(this, _Player_options, "f").mode === 'fill' && !isAudio(player_classPrivateFieldGet(this, _Player_element, "f")) && !IS_IPHONE) {
        this.getContainer().classList.add('op-player__full');
      } else if (player_classPrivateFieldGet(this, _Player_options, "f").mode === 'fit' && !isAudio(player_classPrivateFieldGet(this, _Player_element, "f"))) {
        var container = this.getContainer();

        if (container.parentElement) {
          var fitWrapper = document.createElement('div');
          fitWrapper.className = 'op-player__fit--wrapper';
          fitWrapper.tabIndex = 0;
          container.parentElement.insertBefore(fitWrapper, container);
          fitWrapper.appendChild(container);
          container.classList.add('op-player__fit');
        }
      } else {
        var style = '';

        if (player_classPrivateFieldGet(this, _Player_options, "f").width) {
          var width = typeof player_classPrivateFieldGet(this, _Player_options, "f").width === 'number' ? "".concat(player_classPrivateFieldGet(this, _Player_options, "f").width, "px") : player_classPrivateFieldGet(this, _Player_options, "f").width;
          style += "width: ".concat(width, " !important;");
        }

        if (player_classPrivateFieldGet(this, _Player_options, "f").height) {
          var height = typeof player_classPrivateFieldGet(this, _Player_options, "f").height === 'number' ? "".concat(player_classPrivateFieldGet(this, _Player_options, "f").height, "px") : player_classPrivateFieldGet(this, _Player_options, "f").height;
          style += "height: ".concat(height, " !important;");
        }

        if (style) {
          wrapper.setAttribute('style', style);
        }
      }
    }
  }, {
    key: "_createControls",
    value: function _createControls() {
      if (IS_IPHONE && isVideo(player_classPrivateFieldGet(this, _Player_element, "f"))) {
        this.getContainer().classList.add('op-player__ios--iphone');
      }

      player_classPrivateFieldSet(this, _Player_controls, new controls(this), "f");

      player_classPrivateFieldGet(this, _Player_controls, "f").create();
    }
  }, {
    key: "_createUID",
    value: function _createUID() {
      if (player_classPrivateFieldGet(this, _Player_element, "f").id) {
        player_classPrivateFieldSet(this, _Player_uid, player_classPrivateFieldGet(this, _Player_element, "f").id, "f");

        player_classPrivateFieldGet(this, _Player_element, "f").removeAttribute('id');
      } else {
        var cryptoLib = crypto;
        var encryption = typeof cryptoLib.getRandomBytes === 'function' ? cryptoLib.getRandomBytes : cryptoLib.getRandomValues;

        player_classPrivateFieldSet(this, _Player_uid, "op_".concat(encryption(new Uint32Array(1))[0].toString(36).substr(2, 9)), "f");
      }

      if (player_classPrivateFieldGet(this, _Player_element, "f").parentElement) {
        player_classPrivateFieldGet(this, _Player_element, "f").parentElement.id = player_classPrivateFieldGet(this, _Player_uid, "f");
      }
    }
  }, {
    key: "_createPlayButton",
    value: function _createPlayButton() {
      var _this5 = this;

      var _a, _b;

      if (isAudio(player_classPrivateFieldGet(this, _Player_element, "f"))) {
        return;
      }

      this.playBtn = document.createElement('button');
      this.playBtn.className = 'op-player__play';
      this.playBtn.tabIndex = 0;
      this.playBtn.title = ((_a = player_classPrivateFieldGet(this, _Player_options, "f").labels) === null || _a === void 0 ? void 0 : _a.play) || '';
      this.playBtn.innerHTML = "<span>".concat(((_b = player_classPrivateFieldGet(this, _Player_options, "f").labels) === null || _b === void 0 ? void 0 : _b.play) || '', "</span>");
      this.playBtn.setAttribute('aria-pressed', 'false');
      this.playBtn.setAttribute('aria-hidden', 'false');
      this.loader = document.createElement('span');
      this.loader.className = 'op-player__loader';
      this.loader.tabIndex = -1;
      this.loader.setAttribute('aria-hidden', 'true');

      if (player_classPrivateFieldGet(this, _Player_element, "f").parentElement) {
        player_classPrivateFieldGet(this, _Player_element, "f").parentElement.insertBefore(this.loader, player_classPrivateFieldGet(this, _Player_element, "f"));

        player_classPrivateFieldGet(this, _Player_element, "f").parentElement.insertBefore(this.playBtn, player_classPrivateFieldGet(this, _Player_element, "f"));
      }

      this.playBtn.addEventListener('click', function () {
        if (player_classPrivateFieldGet(_this5, _Player_adsInstance, "f")) {
          player_classPrivateFieldGet(_this5, _Player_adsInstance, "f").playRequested = _this5.activeElement().paused;
        }

        if (_this5.activeElement().paused) {
          _this5.activeElement().play();
        } else {
          _this5.activeElement().pause();
        }
      }, EVENT_OPTIONS);
    }
  }, {
    key: "_setEvents",
    value: function _setEvents() {
      var _this6 = this;

      if (isVideo(player_classPrivateFieldGet(this, _Player_element, "f"))) {
        player_classPrivateFieldGet(this, _Player_events, "f").loadedmetadata = function () {
          var el = _this6.activeElement();

          if (player_classPrivateFieldGet(_this6, _Player_options, "f").showLoaderOnInit && !IS_IOS && !IS_ANDROID) {
            _this6.loader.setAttribute('aria-hidden', 'false');

            _this6.playBtn.setAttribute('aria-hidden', 'true');
          } else {
            _this6.loader.setAttribute('aria-hidden', 'true');

            _this6.playBtn.setAttribute('aria-hidden', 'false');
          }

          if (el.paused) {
            _this6.playBtn.classList.remove('op-player__play--paused');

            _this6.playBtn.setAttribute('aria-pressed', 'false');
          }
        };

        player_classPrivateFieldGet(this, _Player_events, "f").waiting = function () {
          _this6.playBtn.setAttribute('aria-hidden', 'true');

          _this6.loader.setAttribute('aria-hidden', 'false');
        };

        player_classPrivateFieldGet(this, _Player_events, "f").seeking = function () {
          var el = _this6.activeElement();

          _this6.playBtn.setAttribute('aria-hidden', 'true');

          _this6.loader.setAttribute('aria-hidden', el instanceof js_media ? 'false' : 'true');
        };

        player_classPrivateFieldGet(this, _Player_events, "f").seeked = function () {
          var el = _this6.activeElement();

          if (Math.round(el.currentTime) === 0) {
            _this6.playBtn.setAttribute('aria-hidden', 'true');

            _this6.loader.setAttribute('aria-hidden', 'false');
          } else {
            _this6.playBtn.setAttribute('aria-hidden', el instanceof js_media ? 'false' : 'true');

            _this6.loader.setAttribute('aria-hidden', 'true');
          }
        };

        player_classPrivateFieldGet(this, _Player_events, "f").play = function () {
          var _a;

          _this6.playBtn.classList.add('op-player__play--paused');

          _this6.playBtn.title = ((_a = player_classPrivateFieldGet(_this6, _Player_options, "f").labels) === null || _a === void 0 ? void 0 : _a.pause) || '';

          _this6.loader.setAttribute('aria-hidden', 'true');

          if (player_classPrivateFieldGet(_this6, _Player_options, "f").showLoaderOnInit) {
            _this6.playBtn.setAttribute('aria-hidden', 'true');
          } else {
            setTimeout(function () {
              _this6.playBtn.setAttribute('aria-hidden', 'true');
            }, player_classPrivateFieldGet(_this6, _Player_options, "f").hidePlayBtnTimer);
          }
        };

        player_classPrivateFieldGet(this, _Player_events, "f").playing = function () {
          _this6.loader.setAttribute('aria-hidden', 'true');

          _this6.playBtn.setAttribute('aria-hidden', 'true');
        };

        player_classPrivateFieldGet(this, _Player_events, "f").pause = function () {
          var _a;

          var el = _this6.activeElement();

          _this6.playBtn.classList.remove('op-player__play--paused');

          _this6.playBtn.title = ((_a = player_classPrivateFieldGet(_this6, _Player_options, "f").labels) === null || _a === void 0 ? void 0 : _a.play) || '';

          if (player_classPrivateFieldGet(_this6, _Player_options, "f").showLoaderOnInit && Math.round(el.currentTime) === 0) {
            _this6.playBtn.setAttribute('aria-hidden', 'true');

            _this6.loader.setAttribute('aria-hidden', 'false');
          } else {
            _this6.playBtn.setAttribute('aria-hidden', 'false');

            _this6.loader.setAttribute('aria-hidden', 'true');
          }
        };

        player_classPrivateFieldGet(this, _Player_events, "f").ended = function () {
          _this6.loader.setAttribute('aria-hidden', 'true');

          _this6.playBtn.setAttribute('aria-hidden', 'true');
        };

        var postRollCalled = false;

        player_classPrivateFieldGet(this, _Player_events, "f").timeupdate = function () {
          if (player_classPrivateFieldGet(_this6, _Player_element, "f").loop && _this6.isMedia() && player_classPrivateFieldGet(_this6, _Player_adsInstance, "f")) {
            var el = _this6.getMedia();

            var remainingTime = el.duration - el.currentTime;

            if (remainingTime > 0 && remainingTime <= 0.25 && !postRollCalled) {
              postRollCalled = true;
              var e = addEvent('ended');

              player_classPrivateFieldGet(_this6, _Player_element, "f").dispatchEvent(e);
            } else if (remainingTime === 0) {
              postRollCalled = false;
            }
          }
        };
      }

      Object.keys(player_classPrivateFieldGet(this, _Player_events, "f")).forEach(function (event) {
        player_classPrivateFieldGet(_this6, _Player_element, "f").addEventListener(event, player_classPrivateFieldGet(_this6, _Player_events, "f")[event], EVENT_OPTIONS);
      });
      this.getContainer().addEventListener('keydown', this._enableKeyBindings, EVENT_OPTIONS);
    }
  }, {
    key: "_autoplay",
    value: function _autoplay() {
      var _this7 = this;

      if (!player_classPrivateFieldGet(this, _Player_processedAutoplay, "f")) {
        player_classPrivateFieldSet(this, _Player_processedAutoplay, true, "f");

        player_classPrivateFieldGet(this, _Player_element, "f").removeEventListener('canplay', this._autoplay);

        isAutoplaySupported(player_classPrivateFieldGet(this, _Player_element, "f"), player_classPrivateFieldGet(this, _Player_volume, "f"), function (autoplay) {
          player_classPrivateFieldSet(_this7, _Player_canAutoplay, autoplay, "f");
        }, function (muted) {
          player_classPrivateFieldSet(_this7, _Player_canAutoplayMuted, muted, "f");
        }, function () {
          var _a, _b;

          if (player_classPrivateFieldGet(_this7, _Player_canAutoplayMuted, "f")) {
            _this7.activeElement().muted = true;
            _this7.activeElement().volume = 0;
            var e = addEvent('volumechange');

            player_classPrivateFieldGet(_this7, _Player_element, "f").dispatchEvent(e);

            var volumeEl = document.createElement('div');
            var action = IS_IOS || IS_ANDROID ? (_a = player_classPrivateFieldGet(_this7, _Player_options, "f").labels) === null || _a === void 0 ? void 0 : _a.tap : (_b = player_classPrivateFieldGet(_this7, _Player_options, "f").labels) === null || _b === void 0 ? void 0 : _b.click;
            volumeEl.className = 'op-player__unmute';
            volumeEl.innerHTML = "<span>".concat(action, "</span>");
            volumeEl.tabIndex = 0;
            volumeEl.addEventListener('click', function () {
              _this7.activeElement().muted = false;
              _this7.activeElement().volume = player_classPrivateFieldGet(_this7, _Player_volume, "f");
              var event = addEvent('volumechange');

              player_classPrivateFieldGet(_this7, _Player_element, "f").dispatchEvent(event);

              volumeEl.remove();
            }, EVENT_OPTIONS);

            var target = _this7.getContainer();

            target.insertBefore(volumeEl, target.firstChild);
          } else {
            _this7.activeElement().muted = player_classPrivateFieldGet(_this7, _Player_element, "f").muted;
            _this7.activeElement().volume = player_classPrivateFieldGet(_this7, _Player_volume, "f");
          }

          if (player_classPrivateFieldGet(_this7, _Player_ads, "f")) {
            var adsOptions = player_classPrivateFieldGet(_this7, _Player_options, "f") && player_classPrivateFieldGet(_this7, _Player_options, "f").ads ? player_classPrivateFieldGet(_this7, _Player_options, "f").ads : undefined;

            player_classPrivateFieldSet(_this7, _Player_adsInstance, new ads(_this7, player_classPrivateFieldGet(_this7, _Player_ads, "f"), player_classPrivateFieldGet(_this7, _Player_canAutoplay, "f"), player_classPrivateFieldGet(_this7, _Player_canAutoplayMuted, "f"), adsOptions), "f");
          } else if (player_classPrivateFieldGet(_this7, _Player_canAutoplay, "f") || player_classPrivateFieldGet(_this7, _Player_canAutoplayMuted, "f")) {
            _this7.play();
          }
        });
      }
    }
  }, {
    key: "_mergeOptions",
    value: function _mergeOptions(playerOptions) {
      var _this8 = this;

      var opts = Object.assign({}, playerOptions || {});

      player_classPrivateFieldSet(this, _Player_options, Object.assign(Object.assign({}, player_classPrivateFieldGet(this, _Player_defaultOptions, "f")), opts), "f");

      var complexOptions = Object.keys(player_classPrivateFieldGet(this, _Player_defaultOptions, "f")).filter(function (key) {
        return key !== 'labels' && typeof_default()(player_classPrivateFieldGet(_this8, _Player_defaultOptions, "f")[key]) === 'object';
      });
      complexOptions.forEach(function (key) {
        var currOption = opts[key] || {};

        if (currOption && Object.keys(currOption).length) {
          player_classPrivateFieldGet(_this8, _Player_options, "f")[key] = Object.assign(Object.assign({}, player_classPrivateFieldGet(_this8, _Player_defaultOptions, "f")[key]), currOption);
        }
      });

      if (opts.labels) {
        var keys = opts.labels ? Object.keys(opts.labels) : [];
        var sanitizedLabels = {};
        keys.forEach(function (key) {
          var current = opts.labels ? opts.labels[key] : null;

          if (current && typeof_default()(current) === 'object' && key === 'lang') {
            Object.keys(current).forEach(function (k) {
              var lang = current ? current[k] : null;

              if (lang) {
                sanitizedLabels = Object.assign(Object.assign({}, sanitizedLabels), {
                  lang: Object.assign(Object.assign({}, sanitizedLabels.lang), defineProperty_default()({}, k, sanitize(lang)))
                });
              }
            });
          } else if (current) {
            sanitizedLabels = Object.assign(Object.assign({}, sanitizedLabels), defineProperty_default()({}, key, sanitize(current)));
          }
        });
        player_classPrivateFieldGet(this, _Player_options, "f").labels = Object.assign(Object.assign({}, player_classPrivateFieldGet(this, _Player_defaultOptions, "f").labels), sanitizedLabels);
      }
    }
  }, {
    key: "_enableKeyBindings",
    value: function _enableKeyBindings(e) {
      var _a, _b;

      var key = e.which || e.keyCode || 0;
      var el = this.activeElement();
      var isAd = this.isAd();
      var playerFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-player');

      switch (key) {
        case 13:
        case 32:
        case 75:
          if (playerFocused && (key === 13 || key === 32)) {
            if (el.paused) {
              el.play();
            } else {
              el.pause();
            }
          } else if (key === 75) {
            if (el.paused) {
              el.play();
            } else {
              el.pause();
            }
          }

          e.preventDefault();
          e.stopPropagation();
          break;

        case 35:
          if (!isAd && el.duration !== Infinity) {
            el.currentTime = el.duration;
            e.preventDefault();
            e.stopPropagation();
          }

          break;

        case 36:
          if (!isAd) {
            el.currentTime = 0;
            e.preventDefault();
            e.stopPropagation();
          }

          break;

        case 37:
        case 39:
        case 74:
        case 76:
          if (!isAd && el.duration !== Infinity) {
            var newStep = 5;
            var configStep = this.getOptions().step;

            if (configStep) {
              newStep = key === 74 || key === 76 ? configStep * 2 : configStep;
            } else if (key === 74 || key === 76) {
              newStep = 10;
            }

            var step = el.duration !== Infinity ? newStep : ((_b = this.getOptions().progress) === null || _b === void 0 ? void 0 : _b.duration) || 0;
            el.currentTime += key === 37 || key === 74 ? step * -1 : step;

            if (el.currentTime < 0) {
              el.currentTime = 0;
            } else if (el.currentTime >= el.duration) {
              el.currentTime = el.duration;
            }

            e.preventDefault();
            e.stopPropagation();
          }

          break;

        case 38:
        case 40:
          var newVol = key === 38 ? Math.min(el.volume + 0.1, 1) : Math.max(el.volume - 0.1, 0);
          el.volume = newVol;
          el.muted = !(newVol > 0);
          e.preventDefault();
          e.stopPropagation();
          break;

        case 70:
          if (isVideo(player_classPrivateFieldGet(this, _Player_element, "f")) && !e.ctrlKey) {
            player_classPrivateFieldSet(this, _Player_fullscreen, new fullscreen(this, '', ''), "f");

            if (typeof player_classPrivateFieldGet(this, _Player_fullscreen, "f").fullScreenEnabled !== 'undefined') {
              player_classPrivateFieldGet(this, _Player_fullscreen, "f").toggleFullscreen();

              e.preventDefault();
              e.stopPropagation();
            }
          }

          break;

        case 77:
          el.muted = !el.muted;

          if (el.muted) {
            el.volume = 0;
          } else {
            el.volume = player_classPrivateFieldGet(this, _Player_volume, "f");
          }

          e.preventDefault();
          e.stopPropagation();
          break;

        case 188:
        case 190:
          if (!isAd && e.shiftKey) {
            var elem = el;
            elem.playbackRate = key === 188 ? Math.max(elem.playbackRate - 0.25, 0.25) : Math.min(elem.playbackRate + 0.25, 2);
            var target = this.getContainer().querySelector('.op-status>span');

            if (target) {
              target.textContent = "".concat(elem.playbackRate, "x");

              if (target.parentElement) {
                target.parentElement.setAttribute('aria-hidden', 'false');
              }

              setTimeout(function () {
                if (target.parentElement) {
                  target.parentElement.setAttribute('aria-hidden', 'true');
                }
              }, 500);
            }

            var ev = addEvent('controlschanged');
            dispatchEvent(ev);
            e.preventDefault();
            e.stopPropagation();
          } else if (!isAd && el.paused) {
            el.currentTime += 1 / 25 * (key === 188 ? -1 : 1);
            e.preventDefault();
            e.stopPropagation();
          }

          break;

        default:
          break;
      }
    }
  }], [{
    key: "init",
    value: function init() {
      Player.instances = {};
      var targets = document.querySelectorAll('video.op-player, audio.op-player');

      for (var i = 0, total = targets.length; i < total; i++) {
        var target = targets[i];
        var settings = target.getAttribute('data-op-settings');
        var options = settings ? JSON.parse(settings) : {};
        var player = new Player(target, options);
        player.init();
      }
    }
  }, {
    key: "addMedia",
    value: function addMedia(name, mimeType, valid, media) {
      Player.customMedia.media[mimeType] = media;
      Player.customMedia.optionsKey[mimeType] = name;
      Player.customMedia.rules.push(valid);
    }
  }]);

  return Player;
}();

_Player_controls = new WeakMap(), _Player_adsInstance = new WeakMap(), _Player_uid = new WeakMap(), _Player_element = new WeakMap(), _Player_ads = new WeakMap(), _Player_media = new WeakMap(), _Player_events = new WeakMap(), _Player_autoplay = new WeakMap(), _Player_volume = new WeakMap(), _Player_canAutoplay = new WeakMap(), _Player_canAutoplayMuted = new WeakMap(), _Player_processedAutoplay = new WeakMap(), _Player_options = new WeakMap(), _Player_customElements = new WeakMap(), _Player_fullscreen = new WeakMap(), _Player_defaultOptions = new WeakMap();
Player.instances = {};
Player.customMedia = {
  media: {},
  optionsKey: {},
  rules: []
};
/* harmony default export */ const player = (Player);

if (typeof window !== 'undefined') {
  window.OpenPlayer = Player;
  window.OpenPlayerJS = Player;
  Player.init();
}
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// extracted by mini-css-extract-plugin

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});