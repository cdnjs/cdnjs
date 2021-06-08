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

  (function (module) {
  var runtime = (function (exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1;
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
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }
    exports.wrap = wrap;
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
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
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
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
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
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }
      this._invoke = enqueue;
    }
    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );
      return exports.isGeneratorFunction(outerFn)
        ? iter
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
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        context.delegate = null;
        if (context.method === "throw") {
          if (delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);
            if (context.method === "throw") {
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
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }
      context.delegate = null;
      return ContinueSentinel;
    }
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
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
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }
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
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);
        if (!skipTempReset) {
          for (var name in this) {
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
            context.method = "next";
            context.arg = undefined$1;
          }
          return !! caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
          if (entry.tryLoc === "root") {
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
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };
        if (this.method === "next") {
          this.arg = undefined$1;
        }
        return ContinueSentinel;
      }
    };
    return exports;
  }(
    module.exports 
  ));
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
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
  var indexedObject = fails$f(function () {
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$5(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  var requireObjectCoercible$4 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  var IndexedObject$1 = indexedObject;
  var requireObjectCoercible$3 = requireObjectCoercible$4;
  var toIndexedObject$7 = function (it) {
    return IndexedObject$1(requireObjectCoercible$3(it));
  };

  var check = function (it) {
    return it && it.Math == Math && it;
  };
  var global$j =
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    (function () { return this; })() || Function('return this')();

  var shared$5 = {exports: {}};

  var fails$e = fails$g;
  var descriptors = !fails$e(function () {
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var objectDefineProperty = {};

  var isObject$e = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var global$i = global$j;
  var isObject$d = isObject$e;
  var document$1 = global$i.document;
  var EXISTS = isObject$d(document$1) && isObject$d(document$1.createElement);
  var documentCreateElement$1 = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$9 = descriptors;
  var fails$d = fails$g;
  var createElement = documentCreateElement$1;
  var ie8DomDefine = !DESCRIPTORS$9 && !fails$d(function () {
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
  var $defineProperty$1 = Object.defineProperty;
  objectDefineProperty.f = DESCRIPTORS$8 ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$7(O);
    P = toPrimitive$4(P, true);
    anObject$7(Attributes);
    if (IE8_DOM_DEFINE$1) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) {  }
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

  var V8_VERSION$1 = engineV8Version;
  var fails$c = fails$g;
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$c(function () {
    return !String(Symbol()) ||
      !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
  });

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
  var toInteger$4 = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
  };

  var toInteger$3 = toInteger$4;
  var min$2 = Math.min;
  var toLength$4 = function (argument) {
    return argument > 0 ? min$2(toInteger$3(argument), 0x1FFFFFFFFFFFFF) : 0;
  };

  var toInteger$2 = toInteger$4;
  var max$2 = Math.max;
  var min$1 = Math.min;
  var toAbsoluteIndex$3 = function (index, length) {
    var integer = toInteger$2(index);
    return integer < 0 ? max$2(integer + length, 0) : min$1(integer, length);
  };

  var toIndexedObject$6 = toIndexedObject$7;
  var toLength$3 = toLength$4;
  var toAbsoluteIndex$2 = toAbsoluteIndex$3;
  var createMethod$3 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$6($this);
      var length = toLength$3(O.length);
      var index = toAbsoluteIndex$2(fromIndex, length);
      var value;
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        if (value != value) return true;
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };
  var arrayIncludes = {
    includes: createMethod$3(true),
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
    while (names.length > i) if (has$c(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

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
  var objectKeys$2 = Object.keys || function keys(O) {
    return internalObjectKeys$1(O, enumBugKeys$2);
  };

  var DESCRIPTORS$6 = descriptors;
  var definePropertyModule$5 = objectDefineProperty;
  var anObject$6 = anObject$8;
  var objectKeys$1 = objectKeys$2;
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
  var EmptyConstructor = function () {  };
  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null;
    return temp;
  };
  var NullProtoObjectViaIFrame = function () {
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) {  }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys$1.length;
    while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$1[length]];
    return NullProtoObject();
  };
  hiddenKeys$4[IE_PROTO$1] = true;
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject$5(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null;
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : defineProperties(result, Properties);
  };

  var wellKnownSymbol$e = wellKnownSymbol$f;
  var create$2 = objectCreate;
  var definePropertyModule$4 = objectDefineProperty;
  var UNSCOPABLES = wellKnownSymbol$e('unscopables');
  var ArrayPrototype = Array.prototype;
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    definePropertyModule$4.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create$2(null)
    });
  }
  var addToUnscopables$3 = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var store$1 = sharedStore;
  var functionToString = Function.toString;
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
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;
  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);
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
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$5 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$4(O);
    P = toPrimitive$3(P, true);
    if (IE8_DOM_DEFINE) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) {  }
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
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState$3(this).source || inspectSource(this);
  });

  var objectGetOwnPropertyNames = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys$2 = enumBugKeys.concat('length', 'prototype');
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys$2);
  };

  var objectGetOwnPropertySymbols = {};

  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$2 = getBuiltIn$5;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var anObject$4 = anObject$8;
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
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties$1(sourceProperty, targetProperty);
      }
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$5(sourceProperty, 'sham', true);
      }
      redefine$6(target, key, sourceProperty, options);
    }
  };

  var fails$a = fails$g;
  var correctPrototypeGetter = !fails$a(function () {
    function F() {  }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var has$7 = has$e;
  var toObject$3 = toObject$5;
  var sharedKey$1 = sharedKey$4;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
  var IE_PROTO = sharedKey$1('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype;
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
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
  if ([].keys) {
    arrayIterator = [].keys();
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }
  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$9(function () {
    var test = {};
    return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
  });
  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};
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

  var anObject$3 = anObject$8;
  var aPossiblePrototype = aPossiblePrototype$1;
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) {  }
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
        setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }
    if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
      createNonEnumerableProperty$3(IterablePrototype, ITERATOR$1, defaultIterator);
    }
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
  var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
    setInternalState$2(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$3(iterated),
      index: 0,
      kind: kind
    });
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
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) {  }
  };
  var classof$4 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      : CORRECT_ARGUMENTS ? classofRaw(O)
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$3 = classof$4;
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$3(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$4 = redefine$7.exports;
  var toString$1 = objectToString;
  if (!TO_STRING_TAG_SUPPORT) {
    redefine$4(Object.prototype, 'toString', toString$1, { unsafe: true });
  }

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
      if (CollectionPrototype$1[ITERATOR] !== ArrayValues) try {
        createNonEnumerableProperty$2(CollectionPrototype$1, ITERATOR, ArrayValues);
      } catch (error) {
        CollectionPrototype$1[ITERATOR] = ArrayValues;
      }
      if (!CollectionPrototype$1[TO_STRING_TAG]) {
        createNonEnumerableProperty$2(CollectionPrototype$1, TO_STRING_TAG, COLLECTION_NAME$1);
      }
      if (DOMIterables$1[COLLECTION_NAME$1]) for (var METHOD_NAME in ArrayIteratorMethods) {
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
    return function () {
      return fn.apply(that, arguments);
    };
  };

  var classof$2 = classofRaw$1;
  var isArray$3 = Array.isArray || function isArray(arg) {
    return classof$2(arg) == 'Array';
  };

  var isObject$8 = isObject$e;
  var isArray$2 = isArray$3;
  var wellKnownSymbol$7 = wellKnownSymbol$f;
  var SPECIES$3 = wellKnownSymbol$7('species');
  var arraySpeciesCreate$2 = function (originalArray, length) {
    var C;
    if (isArray$2(originalArray)) {
      C = originalArray.constructor;
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
          if (IS_MAP) target[index] = result;
          else if (result) switch (TYPE) {
            case 3: return true;
            case 5: return value;
            case 6: return index;
            case 2: push.call(target, value);
          } else switch (TYPE) {
            case 4: return false;
            case 7: push.call(target, value);
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };
  var arrayIteration = {
    forEach: createMethod$2(0),
    map: createMethod$2(1),
    filter: createMethod$2(2),
    some: createMethod$2(3),
    every: createMethod$2(4),
    find: createMethod$2(5),
    findIndex: createMethod$2(6),
    filterOut: createMethod$2(7)
  };

  var fails$8 = fails$g;
  var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$8(function () {
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var $forEach$1 = arrayIteration.forEach;
  var arrayMethodIsStrict = arrayMethodIsStrict$1;
  var STRICT_METHOD = arrayMethodIsStrict('forEach');
  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn ) {
    return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  } : [].forEach;

  var global$6 = global$j;
  var DOMIterables = domIterables;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$9;
  for (var COLLECTION_NAME in DOMIterables) {
    var Collection = global$6[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
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
  defineWellKnownSymbol$1('iterator');

  var toInteger$1 = toInteger$4;
  var requireObjectCoercible$1 = requireObjectCoercible$4;
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
    codeAt: createMethod$1(false),
    charAt: createMethod$1(true)
  };

  var charAt = stringMultibyte.charAt;
  var InternalStateModule$1 = internalState;
  var defineIterator = defineIterator$2;
  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalState$1 = InternalStateModule$1.getterFor(STRING_ITERATOR);
  defineIterator(String, 'String', function (iterated) {
    setInternalState$1(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
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
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
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
    'for': function (key) {
      var string = String(key);
      if (has$3(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
      if (has$3(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () { USE_SETTER = true; },
    useSimple: function () { USE_SETTER = false; }
  });
  $$c({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$4 }, {
    create: $create,
    defineProperty: $defineProperty,
    defineProperties: $defineProperties,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });
  $$c({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
    getOwnPropertyNames: $getOwnPropertyNames,
    getOwnPropertySymbols: $getOwnPropertySymbols
  });
  $$c({ target: 'Object', stat: true, forced: fails$7(function () { getOwnPropertySymbolsModule.f(1); }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return getOwnPropertySymbolsModule.f(toObject$1(it));
    }
  });
  if ($stringify) {
    var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$7(function () {
      var symbol = $Symbol();
      return $stringify([symbol]) != '[null]'
        || $stringify({ a: symbol }) != '{}'
        || $stringify(Object(symbol)) != '{}';
    });
    $$c({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;
        while (arguments.length > index) args.push(arguments[index++]);
        $replacer = replacer;
        if (!isObject$7(replacer) && it === undefined || isSymbol(it)) return;
        if (!isArray$1(replacer)) replacer = function (key, value) {
          if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return $stringify.apply(null, args);
      }
    });
  }
  if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
    createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  }
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
    NativeSymbol().description !== undefined
  )) {
    var EmptyStringDescriptionStore = {};
    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
      var result = this instanceof SymbolWrapper
        ? new NativeSymbol(description)
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

  var sameValue$1 = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };

  var $$a = _export;
  var is = sameValue$1;
  $$a({ target: 'Object', stat: true }, {
    is: is
  });

  var $$9 = _export;
  $$9({ target: 'Number', stat: true }, {
    isNaN: function isNaN(number) {
      return number != number;
    }
  });

  var isObject$5 = isObject$e;
  var setPrototypeOf = objectSetPrototypeOf;
  var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      setPrototypeOf &&
      typeof (NewTarget = dummy.constructor) == 'function' &&
      NewTarget !== Wrapper &&
      isObject$5(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) setPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var whitespaces$1 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var requireObjectCoercible = requireObjectCoercible$4;
  var whitespaces = whitespaces$1;
  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');
  var createMethod = function (TYPE) {
    return function ($this) {
      var string = String(requireObjectCoercible($this));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };
  };
  var stringTrim = {
    start: createMethod(1),
    end: createMethod(2),
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
  var BROKEN_CLASSOF = classof$1(create(NumberPrototype)) == NUMBER;
  var toNumber = function (argument) {
    var it = toPrimitive$1(argument, false);
    var first, third, radix, maxCode, digits, length, index, code;
    if (typeof it == 'string' && it.length > 2) {
      it = trim(it);
      first = it.charCodeAt(0);
      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN;
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66: case 98: radix = 2; maxCode = 49; break;
          case 79: case 111: radix = 8; maxCode = 55; break;
          default: return +it;
        }
        digits = it.slice(2);
        length = digits.length;
        for (index = 0; index < length; index++) {
          code = digits.charCodeAt(index);
          if (code < 48 || code > maxCode) return NaN;
        } return parseInt(digits, radix);
      }
    } return +it;
  };
  if (isForced$1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
    var NumberWrapper = function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var dummy = this;
      return dummy instanceof NumberWrapper
        && (BROKEN_CLASSOF ? fails$6(function () { NumberPrototype.valueOf.call(dummy); }) : classof$1(dummy) != NUMBER)
          ? inheritIfRequired$1(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
    };
    for (var keys$1 = DESCRIPTORS$2 ? getOwnPropertyNames$1(NativeNumber) : (
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' +
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

  function isFunction(func) {
    return !!(func && func.constructor && func.call && func.apply);
  }
  function isIterable(iterable) {
    return !!(iterable && isFunction(iterable[Symbol.iterator]));
  }
  function isString(str) {
    return !!(str && (typeof str === 'string' || str instanceof String));
  }
  var sameValue = Object.is;
  function sameValueZero(x, y) {
    return x === y || Number.isNaN(x) && Number.isNaN(y);
  }
  function abstractEquals(x, y) {
    return x == y;
  }
  function strictEquals(x, y) {
    return x === y;
  }
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
  $$8({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    map: function map(callbackfn ) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $$7 = _export;
  var $find = arrayIteration.find;
  var addToUnscopables$1 = addToUnscopables$3;
  var FIND = 'find';
  var SKIPS_HOLES$1 = true;
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });
  $$7({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
    find: function find(callbackfn ) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
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
  $$6({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    splice: function splice(start, deleteCount ) {
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
  if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });
  $$5({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    findIndex: function findIndex(callbackfn ) {
      return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
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
  $$4({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
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
  var isExtensible = Object.isExtensible || function () {
    return true;
  };
  var setMetadata = function (it) {
    defineProperty$1(it, METADATA, { value: {
      objectID: 'O' + ++id,
      weakData: {}
    } });
  };
  var fastKey = function (it, create) {
    if (!isObject$3(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!has(it, METADATA)) {
      if (!isExtensible(it)) return 'F';
      if (!create) return 'E';
      setMetadata(it);
    } return it[METADATA].objectID;
  };
  var getWeakData = function (it, create) {
    if (!has(it, METADATA)) {
      if (!isExtensible(it)) return true;
      if (!create) return false;
      setMetadata(it);
    } return it[METADATA].weakData;
  };
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
  var $freeze = Object.freeze;
  var FAILS_ON_PRIMITIVES = fails$3(function () { $freeze(1); });
  $$3({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
    freeze: function freeze(it) {
      return $freeze && isObject$2(it) ? $freeze(onFreeze(it)) : it;
    }
  });

  var Option = function () {
    function Option(has, value) {
      _classCallCheck(this, Option);
      this.has = has;
      this.value = value;
      Object.freeze(this);
    }
    _createClass(Option, [{
      key: "size",
      get:
      function get() {
        return this.has ? 1 : 0;
      }
    }, {
      key: Symbol.iterator,
      value:
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
  var _some = function _some(value) {
    return new Option(true, value);
  };
  var none = new Option(false, undefined);

  var Container = function () {
    function Container(map, parent, hash) {
      _classCallCheck(this, Container);
      this.size = 0;
      this.contents = [];
      this.map = map;
      this.parent = parent;
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
      value: regeneratorRuntime.mark(function value() {
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
      value: regeneratorRuntime.mark(function entriesRight() {
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
      value: regeneratorRuntime.mark(function keys() {
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
      value: regeneratorRuntime.mark(function values() {
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
      value: regeneratorRuntime.mark(function keysRight() {
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
      value: regeneratorRuntime.mark(function valuesRight() {
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
  var HashBuckets = function () {
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
      value: regeneratorRuntime.mark(function value() {
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
      value: regeneratorRuntime.mark(function entriesRight() {
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
      value: regeneratorRuntime.mark(function keys() {
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
      value: regeneratorRuntime.mark(function values() {
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
      value: regeneratorRuntime.mark(function keysRight() {
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
      value: regeneratorRuntime.mark(function valuesRight() {
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
  var HamtBuckets = function () {
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
        this.idxFlags |= new_flag;
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
      value: regeneratorRuntime.mark(function value() {
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
      value: regeneratorRuntime.mark(function entriesRight() {
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
      value: regeneratorRuntime.mark(function keys() {
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
      value: regeneratorRuntime.mark(function values() {
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
      value: regeneratorRuntime.mark(function keysRight() {
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
      value: regeneratorRuntime.mark(function valuesRight() {
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
  var numberIsFinite$1 = Number.isFinite || function isFinite(it) {
    return typeof it == 'number' && globalIsFinite(it);
  };

  var $$2 = _export;
  var numberIsFinite = numberIsFinite$1;
  $$2({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

  var isObject$1 = isObject$e;
  var floor = Math.floor;
  var isInteger$1 = function isInteger(it) {
    return !isObject$1(it) && isFinite(it) && floor(it) === it;
  };

  var $$1 = _export;
  var isInteger = isInteger$1;
  var abs = Math.abs;
  $$1({ target: 'Number', stat: true }, {
    isSafeInteger: function isSafeInteger(number) {
      return isInteger(number) && abs(number) <= 0x1FFFFFFFFFFFFF;
    }
  });

  var anObject$1 = anObject$8;
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
  var INCORRECT_NAME = nativeToString.name != TO_STRING;
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
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
  };

  var regexpStickyHelpers = {};

  var fails$1 = fails$g;
  function RE(s, f) {
    return RegExp(s, f);
  }
  regexpStickyHelpers.UNSUPPORTED_Y = fails$1(function () {
    var re = RE('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });
  regexpStickyHelpers.BROKEN_CARET = fails$1(function () {
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
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;
  var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;
  var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y$1 || fails(function () {
    re2[MATCH] = false;
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  })));
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
  setSpecies('RegExp');

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
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
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
  $({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
    exec: exec
  });

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
          }
          if (key instanceof Date) {
            return key.getTime();
          }
          if (key instanceof RegExp) {
            return hash(key.toString());
          }
          if (key instanceof Option) {
            if (key.has) {
              return 31 * hashCodeFor(key.value);
            }
            return 0;
          }
          if (Object.prototype.hasOwnProperty.call(key, '_mootable_hashCode')) {
            return hashCodeFor(key._mootable_hashCode);
          }
          var hashCode = HASH_COUNTER++;
          Object.defineProperty(key, '_mootable_hashCode', {
            value: hashCode
          });
          return hashCode;
        }
    }
  }
  var HASH_COUNTER = 0;
  function equalsFor(key) {
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
          }
          if (key instanceof Date) {
            toSetOn.hash = key.getTime();
            return toSetOn;
          }
          if (key instanceof RegExp) {
            toSetOn.hash = hash(key.toString());
            return toSetOn;
          }
          if (key instanceof Option) {
            if (key.has) {
              toSetOn.hash = 31 * hashCodeFor(key.value);
              return toSetOn;
            }
            toSetOn.hash = 0;
            return toSetOn;
          }
          if (Object.prototype.hasOwnProperty.call(key, '_mootable_hashCode')) {
            toSetOn.hash = hashCodeFor(key._mootable_hashCode);
            return toSetOn;
          }
          var hashCode = HASH_COUNTER++;
          Object.defineProperty(key, '_mootable_hashCode', {
            value: hashCode
          });
          toSetOn.hash = hashCode;
          return toSetOn;
        }
    }
  }

  var HashMap = function () {
    function HashMap(copy) {
      _classCallCheck(this, HashMap);
      this.buckets = new HashBuckets(this);
      if (copy) {
        this.copy(copy);
      }
    }
    _createClass(HashMap, [{
      key: "size",
      get: function get() {
        return this.buckets.size;
      }
    }, {
      key: "length",
      get: function get() {
        return this.buckets.size;
      }
    }, {
      key: "has",
      value: function has(key, overrides) {
        var op = this.equalsAndHash(key, overrides);
        return this.buckets.has(key, op);
      }
    }, {
      key: "get",
      value: function get(key, overrides) {
        var op = this.equalsAndHash(key, overrides);
        return this.buckets.get(key, op);
      }
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
    }, {
      key: "optionalGet",
      value: function optionalGet(key, overrides) {
        var op = this.equalsAndHash(key, overrides);
        return this.buckets.optionalGet(key, op);
      }
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
    }, {
      key: "set",
      value: function set(key, value, overrides) {
        var op = this.equalsAndHash(key, overrides);
        this.buckets.set(key, value, op);
        return this;
      }
    }, {
      key: "emplace",
      value: function emplace(key, handler, overrides) {
        var op = this.equalsAndHash(key, overrides);
        return this.buckets.emplace(key, handler, op);
      }
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
    }, {
      key: "clone",
      value: function clone() {
        return new HashMap(this);
      }
    }, {
      key: "delete",
      value: function _delete(key, overrides) {
        var op = this.equalsAndHash(key, overrides);
        this.buckets.delete(key, op);
        return this;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.buckets.clear();
        return this;
      }
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
    }, {
      key: Symbol.iterator,
      value:
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
    }, {
      key: "entries",
      value:
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
    }, {
      key: "entriesRight",
      value:
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
    }, {
      key: "keys",
      value:
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
    }, {
      key: "values",
      value:
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
    }, {
      key: "keysRight",
      value:
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
    }, {
      key: "valuesRight",
      value:
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
      })
    }]);
    return HashMap;
  }();
  Object.defineProperty(HashMap.prototype, 'equalsFor', {
    value: equalsFor,
    configurable: true
  });
  Object.defineProperty(HashMap.prototype, 'equalsAndHash', {
    value: equalsAndHash,
    configurable: true
  });
  Object.defineProperty(HashMap.prototype, 'createContainer', {
    value: function createContainer(parent, hash) {
      return new Container(this, parent, hash);
    },
    configurable: true
  });

  var LinkedHashMap = function (_HashMap) {
    _inherits(LinkedHashMap, _HashMap);
    var _super = _createSuper(LinkedHashMap);
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
    _createClass(LinkedHashMap, [{
      key: "clear",
      value: function clear() {
        this.start = undefined;
        this.end = undefined;
        return _get(_getPrototypeOf(LinkedHashMap.prototype), "clear", this).call(this);
      }
    }, {
      key: "setLeft",
      value: function setLeft(key, value, overrides) {
        var op = this.equalsAndHash(key, overrides);
        op.addToStart = true;
        this.buckets.set(key, value, op);
        return this;
      }
    }, {
      key: "emplaceLeft",
      value: function emplaceLeft(key, handler, overrides) {
        var op = this.equalsAndHash(key, overrides);
        op.addToStart = true;
        return this.buckets.emplace(key, handler, op);
      }
    }, {
      key: "push",
      value: function push(key, value, overrides) {
        var op = this.equalsAndHash(key, overrides);
        op.moveOnUpdate = true;
        this.buckets.set(key, value, op);
        return this;
      }
    }, {
      key: "pushEmplace",
      value: function pushEmplace(key, handler, overrides) {
        var op = this.equalsAndHash(key, overrides);
        op.moveOnUpdate = true;
        return this.buckets.emplace(key, handler, op);
      }
    }, {
      key: "unshift",
      value: function unshift(key, value, overrides) {
        var op = this.equalsAndHash(key, overrides);
        op.moveOnUpdate = true;
        op.addToStart = true;
        this.buckets.set(key, value, op);
        return this;
      }
    }, {
      key: "unshiftEmplace",
      value: function unshiftEmplace(key, handler, overrides) {
        var op = this.equalsAndHash(key, overrides);
        op.moveOnUpdate = true;
        op.addToStart = true;
        return this.buckets.emplace(key, handler, op);
      }
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
    }, {
      key: "head",
      value: function head() {
        var entry = this.start;
        if (entry) {
          return entry[1];
        }
        return undefined;
      }
    }, {
      key: "tail",
      value: function tail() {
        var entry = this.end;
        if (entry) {
          return entry[1];
        }
        return undefined;
      }
    }, {
      key: "optionalHead",
      value: function optionalHead() {
        var entry = this.start;
        if (entry) {
          return _some(entry[1]);
        }
        return none;
      }
    }, {
      key: "optionalTail",
      value: function optionalTail() {
        var entry = this.end;
        if (entry) {
          return _some(entry[1]);
        }
        return none;
      }
    }, {
      key: "headKey",
      value: function headKey() {
        var entry = this.start;
        if (entry) {
          return entry[0];
        }
        return undefined;
      }
    }, {
      key: "tailKey",
      value: function tailKey() {
        var entry = this.end;
        if (entry) {
          return entry[0];
        }
        return undefined;
      }
    }, {
      key: "optionalHeadKey",
      value: function optionalHeadKey() {
        var entry = this.start;
        if (entry) {
          return _some(entry[0]);
        }
        return none;
      }
    }, {
      key: "optionalTailKey",
      value: function optionalTailKey() {
        var entry = this.end;
        if (entry) {
          return _some(entry[0]);
        }
        return none;
      }
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
    }, {
      key: "clone",
      value: function clone() {
        return new LinkedHashMap(this);
      }
    }, {
      key: Symbol.iterator,
      value:
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
    }, {
      key: "entries",
      value:
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
    }, {
      key: "entriesRight",
      value:
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
    }, {
      key: "keys",
      value:
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
    }, {
      key: "values",
      value:
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
    }, {
      key: "keysRight",
      value:
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
    }, {
      key: "valuesRight",
      value:
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
      })
    }]);
    return LinkedHashMap;
  }(HashMap);
  Object.defineProperty(LinkedHashMap.prototype, 'createContainer', {
    value: function createContainer(parent, hash) {
      return new LinkedContainer(this, parent, hash);
    },
    configurable: true
  });
  var LinkedContainer = function (_Container) {
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
