(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["OpenPlayer"] = factory();
	else
		root["OpenPlayer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 163);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(92);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument === 'function';
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var shared = __webpack_require__(67);
var hasOwn = __webpack_require__(15);
var uid = __webpack_require__(68);
var NATIVE_SYMBOL = __webpack_require__(64);
var USE_SYMBOL_AS_UID = __webpack_require__(63);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(12)["default"];

var assertThisInitialized = __webpack_require__(0);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var getOwnPropertyDescriptor = __webpack_require__(40).f;
var createNonEnumerableProperty = __webpack_require__(19);
var redefine = __webpack_require__(21);
var setGlobal = __webpack_require__(46);
var copyConstructorProperties = __webpack_require__(100);
var isForced = __webpack_require__(73);

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
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__(5);

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : isCallable(it);
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var isCallable = __webpack_require__(5);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__(22);

var hasOwnProperty = {}.hasOwnProperty;

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(7);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(162);

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

module.exports = _inherits;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__(5);
var tryToString = __webpack_require__(66);

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(16);
var definePropertyModule = __webpack_require__(20);
var createPropertyDescriptor = __webpack_require__(23);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(16);
var IE8_DOM_DEFINE = __webpack_require__(69);
var anObject = __webpack_require__(11);
var toPropertyKey = __webpack_require__(43);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var isCallable = __webpack_require__(5);
var hasOwn = __webpack_require__(15);
var createNonEnumerableProperty = __webpack_require__(19);
var setGlobal = __webpack_require__(46);
var inspectSource = __webpack_require__(32);
var InternalStateModule = __webpack_require__(33);
var CONFIGURABLE_FUNCTION_NAME = __webpack_require__(70).CONFIGURABLE;

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(42);

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var aCallable = __webpack_require__(18);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aCallable(fn);
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


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__(18);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(41);
var requireObjectCoercible = __webpack_require__(42);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(14);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var isObject = __webpack_require__(13);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__(5);
var store = __webpack_require__(45);

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(99);
var global = __webpack_require__(3);
var isObject = __webpack_require__(13);
var createNonEnumerableProperty = __webpack_require__(19);
var hasOwn = __webpack_require__(15);
var shared = __webpack_require__(45);
var sharedKey = __webpack_require__(47);
var hiddenKeys = __webpack_require__(48);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
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
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var toLength = __webpack_require__(105);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(52);
var isCallable = __webpack_require__(5);
var classofRaw = __webpack_require__(29);
var wellKnownSymbol = __webpack_require__(6);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(11);
var defineProperties = __webpack_require__(110);
var enumBugKeys = __webpack_require__(50);
var hiddenKeys = __webpack_require__(48);
var html = __webpack_require__(75);
var documentCreateElement = __webpack_require__(31);
var sharedKey = __webpack_require__(47);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

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
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);

module.exports = global;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var isArrayIteratorMethod = __webpack_require__(80);
var lengthOfArrayLike = __webpack_require__(34);
var bind = __webpack_require__(25);
var getIterator = __webpack_require__(81);
var getIteratorMethod = __webpack_require__(58);
var iteratorClose = __webpack_require__(79);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(String(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(16);
var propertyIsEnumerableModule = __webpack_require__(61);
var createPropertyDescriptor = __webpack_require__(23);
var toIndexedObject = __webpack_require__(28);
var toPropertyKey = __webpack_require__(43);
var hasOwn = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(69);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(7);
var classof = __webpack_require__(29);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var toPrimitive = __webpack_require__(97);
var isSymbol = __webpack_require__(62);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : String(key);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var aCallable = __webpack_require__(18);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var setGlobal = __webpack_require__(46);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);

module.exports = function (key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(67);
var uid = __webpack_require__(68);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(7);
var isCallable = __webpack_require__(5);
var classof = __webpack_require__(35);
var getBuiltIn = __webpack_require__(14);
var inspectSource = __webpack_require__(32);

var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = constructorRegExp.exec;
var INCORRECT_TO_STRING = !constructorRegExp.exec(function () { /* empty */ });

var isConstructorModern = function (argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(Object, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function (argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  } return INCORRECT_TO_STRING || !!exec.call(constructorRegExp, inspectSource(argument));
};

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(6);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(71);
var enumBugKeys = __webpack_require__(50);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(35);

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var hasOwn = __webpack_require__(15);
var isCallable = __webpack_require__(5);
var toObject = __webpack_require__(22);
var sharedKey = __webpack_require__(47);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(117);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object ? ObjectPrototype : null;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(20).f;
var hasOwn = __webpack_require__(15);
var wellKnownSymbol = __webpack_require__(6);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !hasOwn(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(11);
var aPossiblePrototype = __webpack_require__(118);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
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
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(35);
var getMethod = __webpack_require__(44);
var Iterators = __webpack_require__(26);
var wellKnownSymbol = __webpack_require__(6);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(29);
var global = __webpack_require__(3);

module.exports = classof(global.process) == 'process';


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(157);

var iterableToArrayLimit = __webpack_require__(158);

var unsupportedIterableToArray = __webpack_require__(159);

var nonIterableRest = __webpack_require__(161);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__(5);
var getBuiltIn = __webpack_require__(14);
var USE_SYMBOL_AS_UID = __webpack_require__(63);

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && Object(it) instanceof $Symbol;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(64);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(65);
var fails = __webpack_require__(7);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var userAgent = __webpack_require__(30);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
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

module.exports = version && +version;


/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(24);
var store = __webpack_require__(45);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.18.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 68 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(16);
var fails = __webpack_require__(7);
var createElement = __webpack_require__(31);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(16);
var hasOwn = __webpack_require__(15);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var hasOwn = __webpack_require__(15);
var toIndexedObject = __webpack_require__(28);
var indexOf = __webpack_require__(103).indexOf;
var hiddenKeys = __webpack_require__(48);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(7);
var isCallable = __webpack_require__(5);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(6);
var create = __webpack_require__(36);
var definePropertyModule = __webpack_require__(20);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(14);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(115).charAt;
var toString = __webpack_require__(54);
var InternalStateModule = __webpack_require__(33);
var defineIterator = __webpack_require__(77);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(10);
var IS_PURE = __webpack_require__(24);
var FunctionName = __webpack_require__(70);
var isCallable = __webpack_require__(5);
var createIteratorConstructor = __webpack_require__(116);
var getPrototypeOf = __webpack_require__(55);
var setPrototypeOf = __webpack_require__(57);
var setToStringTag = __webpack_require__(56);
var createNonEnumerableProperty = __webpack_require__(19);
var redefine = __webpack_require__(21);
var wellKnownSymbol = __webpack_require__(6);
var Iterators = __webpack_require__(26);
var IteratorsCore = __webpack_require__(78);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
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
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }
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
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    redefine(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(7);
var isCallable = __webpack_require__(5);
var create = __webpack_require__(36);
var getPrototypeOf = __webpack_require__(55);
var redefine = __webpack_require__(21);
var wellKnownSymbol = __webpack_require__(6);
var IS_PURE = __webpack_require__(24);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  redefine(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var getMethod = __webpack_require__(44);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = innerResult.call(iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(6);
var Iterators = __webpack_require__(26);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var aCallable = __webpack_require__(18);
var anObject = __webpack_require__(11);
var getIteratorMethod = __webpack_require__(58);

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(iteratorMethod.call(argument));
  throw TypeError(String(argument) + ' is not iterable');
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(6);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(10);
var getPrototypeOf = __webpack_require__(55);
var setPrototypeOf = __webpack_require__(57);
var create = __webpack_require__(36);
var createNonEnumerableProperty = __webpack_require__(19);
var createPropertyDescriptor = __webpack_require__(23);
var installErrorCause = __webpack_require__(135);
var iterate = __webpack_require__(38);
var toString = __webpack_require__(54);

var $AggregateError = function AggregateError(errors, message /* , options */) {
  var that = this;
  var options = arguments.length > 2 ? arguments[2] : undefined;
  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message, options);
  if (setPrototypeOf) {
    // eslint-disable-next-line unicorn/error-message -- expected
    that = setPrototypeOf(new Error(undefined), getPrototypeOf(that));
  }
  if (message !== undefined) createNonEnumerableProperty(that, 'message', toString(message));
  installErrorCause(that, options);
  var errorsArray = [];
  iterate(errors, errorsArray.push, { that: errorsArray });
  createNonEnumerableProperty(that, 'errors', errorsArray);
  return that;
};

$AggregateError.prototype = create(Error.prototype, {
  constructor: createPropertyDescriptor(5, $AggregateError),
  message: createPropertyDescriptor(5, ''),
  name: createPropertyDescriptor(5, 'AggregateError')
});

// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
$({ global: true }, {
  AggregateError: $AggregateError
});


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(28);
var addToUnscopables = __webpack_require__(74);
var Iterators = __webpack_require__(26);
var InternalStateModule = __webpack_require__(33);
var defineIterator = __webpack_require__(77);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

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
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
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

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);

module.exports = global.Promise;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var aConstructor = __webpack_require__(142);
var wellKnownSymbol = __webpack_require__(6);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var isCallable = __webpack_require__(5);
var fails = __webpack_require__(7);
var bind = __webpack_require__(25);
var html = __webpack_require__(75);
var createElement = __webpack_require__(31);
var IS_IOS = __webpack_require__(88);
var IS_NODE = __webpack_require__(59);

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) { /* empty */ }

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var argumentsLength = arguments.length;
    var i = 1;
    while (argumentsLength > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (isCallable(fn) ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    isCallable(global.postMessage) &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(30);

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var isObject = __webpack_require__(13);
var newPromiseCapability = __webpack_require__(27);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(10);
var aCallable = __webpack_require__(18);
var newPromiseCapabilityModule = __webpack_require__(27);
var perform = __webpack_require__(39);
var iterate = __webpack_require__(38);

// `Promise.allSettled` method
// https://tc39.es/ecma262/#sec-promise.allsettled
$({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (error) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: error };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(10);
var aCallable = __webpack_require__(18);
var getBuiltIn = __webpack_require__(14);
var newPromiseCapabilityModule = __webpack_require__(27);
var perform = __webpack_require__(39);
var iterate = __webpack_require__(38);

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any
$({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aCallable(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        errors.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

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
   true ? module.exports : undefined
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


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(94);

module.exports = parent;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(95);

module.exports = parent;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(96);
var entryUnbind = __webpack_require__(111);

module.exports = entryUnbind('Array', 'find');


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(10);
var $find = __webpack_require__(106).find;
var addToUnscopables = __webpack_require__(74);

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
var isSymbol = __webpack_require__(62);
var getMethod = __webpack_require__(44);
var ordinaryToPrimitive = __webpack_require__(98);
var wellKnownSymbol = __webpack_require__(6);

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__(5);
var isObject = __webpack_require__(13);

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = fn.call(input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = fn.call(input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var isCallable = __webpack_require__(5);
var inspectSource = __webpack_require__(32);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var hasOwn = __webpack_require__(15);
var ownKeys = __webpack_require__(101);
var getOwnPropertyDescriptorModule = __webpack_require__(40);
var definePropertyModule = __webpack_require__(20);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(14);
var getOwnPropertyNamesModule = __webpack_require__(102);
var getOwnPropertySymbolsModule = __webpack_require__(72);
var anObject = __webpack_require__(11);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(71);
var enumBugKeys = __webpack_require__(50);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(28);
var toAbsoluteIndex = __webpack_require__(104);
var lengthOfArrayLike = __webpack_require__(34);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
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

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(49);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(49);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(25);
var IndexedObject = __webpack_require__(41);
var toObject = __webpack_require__(22);
var lengthOfArrayLike = __webpack_require__(34);
var arraySpeciesCreate = __webpack_require__(107);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
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
          case 7: push.call(target, value); // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__(108);

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(109);
var isConstructor = __webpack_require__(51);
var isObject = __webpack_require__(13);
var wellKnownSymbol = __webpack_require__(6);

var SPECIES = wellKnownSymbol('species');

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(29);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(16);
var definePropertyModule = __webpack_require__(20);
var anObject = __webpack_require__(11);
var objectKeys = __webpack_require__(53);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var bind = __webpack_require__(25);

var call = Function.call;

module.exports = function (CONSTRUCTOR, METHOD, length) {
  return bind(call, global[CONSTRUCTOR].prototype[METHOD], length);
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(113);

module.exports = parent;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(114);

module.exports = parent;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
__webpack_require__(119);
var path = __webpack_require__(37);

module.exports = path.Array.from;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(49);
var toString = __webpack_require__(54);
var requireObjectCoercible = __webpack_require__(42);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
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

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(78).IteratorPrototype;
var create = __webpack_require__(36);
var createPropertyDescriptor = __webpack_require__(23);
var setToStringTag = __webpack_require__(56);
var Iterators = __webpack_require__(26);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(7);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__(5);

module.exports = function (argument) {
  if (typeof argument === 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(10);
var from = __webpack_require__(120);
var checkCorrectnessOfIteration = __webpack_require__(82);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(25);
var toObject = __webpack_require__(22);
var callWithSafeIterationClosing = __webpack_require__(121);
var isArrayIteratorMethod = __webpack_require__(80);
var isConstructor = __webpack_require__(51);
var lengthOfArrayLike = __webpack_require__(34);
var createProperty = __webpack_require__(122);
var getIterator = __webpack_require__(81);
var getIteratorMethod = __webpack_require__(58);

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var iteratorClose = __webpack_require__(79);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__(43);
var definePropertyModule = __webpack_require__(20);
var createPropertyDescriptor = __webpack_require__(23);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(124);

module.exports = parent;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(125);

module.exports = parent;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
var path = __webpack_require__(37);

module.exports = path.Object.assign;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(10);
var assign = __webpack_require__(127);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(16);
var fails = __webpack_require__(7);
var objectKeys = __webpack_require__(53);
var getOwnPropertySymbolsModule = __webpack_require__(72);
var propertyIsEnumerableModule = __webpack_require__(61);
var toObject = __webpack_require__(22);
var IndexedObject = __webpack_require__(41);

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(129);

module.exports = parent;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(130);

module.exports = parent;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131);
var path = __webpack_require__(37);

module.exports = path.Object.keys;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(10);
var toObject = __webpack_require__(22);
var nativeKeys = __webpack_require__(53);
var fails = __webpack_require__(7);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(133);
__webpack_require__(152);
// TODO: Remove from `core-js@4`
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);

module.exports = parent;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(134);
__webpack_require__(149);

module.exports = parent;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
__webpack_require__(84);
__webpack_require__(136);
__webpack_require__(138);
__webpack_require__(90);
__webpack_require__(91);
__webpack_require__(148);
__webpack_require__(76);
var path = __webpack_require__(37);

module.exports = path.Promise;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
var createNonEnumerableProperty = __webpack_require__(19);

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', O.cause);
  }
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(52);
var redefine = __webpack_require__(21);
var toString = __webpack_require__(137);

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(52);
var classof = __webpack_require__(35);

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(10);
var IS_PURE = __webpack_require__(24);
var global = __webpack_require__(3);
var getBuiltIn = __webpack_require__(14);
var NativePromise = __webpack_require__(85);
var redefine = __webpack_require__(21);
var redefineAll = __webpack_require__(139);
var setPrototypeOf = __webpack_require__(57);
var setToStringTag = __webpack_require__(56);
var setSpecies = __webpack_require__(140);
var aCallable = __webpack_require__(18);
var isCallable = __webpack_require__(5);
var isObject = __webpack_require__(13);
var anInstance = __webpack_require__(141);
var inspectSource = __webpack_require__(32);
var iterate = __webpack_require__(38);
var checkCorrectnessOfIteration = __webpack_require__(82);
var speciesConstructor = __webpack_require__(86);
var task = __webpack_require__(87).set;
var microtask = __webpack_require__(143);
var promiseResolve = __webpack_require__(89);
var hostReportErrors = __webpack_require__(146);
var newPromiseCapabilityModule = __webpack_require__(27);
var perform = __webpack_require__(39);
var InternalStateModule = __webpack_require__(33);
var isForced = __webpack_require__(73);
var wellKnownSymbol = __webpack_require__(6);
var IS_BROWSER = __webpack_require__(147);
var IS_NODE = __webpack_require__(59);
var V8_VERSION = __webpack_require__(65);

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructorPrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aCallable(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable(onRejected) && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromise) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(21);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(14);
var definePropertyModule = __webpack_require__(20);
var wellKnownSymbol = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(16);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),
/* 141 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (it instanceof Constructor) return it;
  throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var isConstructor = __webpack_require__(51);
var tryToString = __webpack_require__(66);

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var getOwnPropertyDescriptor = __webpack_require__(40).f;
var macrotask = __webpack_require__(87).set;
var IS_IOS = __webpack_require__(88);
var IS_IOS_PEBBLE = __webpack_require__(144);
var IS_WEBOS_WEBKIT = __webpack_require__(145);
var IS_NODE = __webpack_require__(59);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(30);
var global = __webpack_require__(3);

module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(30);

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),
/* 147 */
/***/ (function(module, exports) {

module.exports = typeof window == 'object';


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(10);
var IS_PURE = __webpack_require__(24);
var NativePromise = __webpack_require__(85);
var fails = __webpack_require__(7);
var getBuiltIn = __webpack_require__(14);
var isCallable = __webpack_require__(5);
var speciesConstructor = __webpack_require__(86);
var promiseResolve = __webpack_require__(89);
var redefine = __webpack_require__(21);

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = isCallable(onFinally);
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
if (!IS_PURE && isCallable(NativePromise)) {
  var method = getBuiltIn('Promise').prototype['finally'];
  if (NativePromise.prototype['finally'] !== method) {
    redefine(NativePromise.prototype, 'finally', method, { unsafe: true });
  }
}


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var DOMIterables = __webpack_require__(150);
var DOMTokenListPrototype = __webpack_require__(151);
var ArrayIteratorMethods = __webpack_require__(84);
var createNonEnumerableProperty = __webpack_require__(19);
var wellKnownSymbol = __webpack_require__(6);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),
/* 150 */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
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


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(31);

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(83);


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(90);


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(10);
var newPromiseCapabilityModule = __webpack_require__(27);
var perform = __webpack_require__(39);

// `Promise.try` method
// https://github.com/tc39/proposal-promise-try
$({ target: 'Promise', stat: true }, {
  'try': function (callbackfn) {
    var promiseCapability = newPromiseCapabilityModule.f(this);
    var result = perform(callbackfn);
    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
    return promiseCapability.promise;
  }
});


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(91);


/***/ }),
/* 156 */
/***/ (function(module, exports) {

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

(function() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    var ce = new window.CustomEvent('test', { cancelable: true });
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
      // IE has problems with .preventDefault() on custom events
      // http://stackoverflow.com/questions/23349191
      throw new Error('Could not prevent default');
    }
  } catch (e) {
    var CustomEvent = function(event, params) {
      var evt, origPrevent;
      params = params || {};
      params.bubbles = !!params.bubbles;
      params.cancelable = !!params.cancelable;

      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );
      origPrevent = evt.preventDefault;
      evt.preventDefault = function() {
        origPrevent.call(this);
        try {
          Object.defineProperty(this, 'defaultPrevented', {
            get: function() {
              return true;
            }
          });
        } catch (e) {
          this.defaultPrevented = true;
        }
      };
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent; // expose definition to window
  }
})();


/***/ }),
/* 157 */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 158 */
/***/ (function(module, exports) {

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

module.exports = _iterableToArrayLimit;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(160);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 160 */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 161 */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 162 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(12);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(1);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(2);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/core-js/features/array/find.js
var find = __webpack_require__(93);

// EXTERNAL MODULE: ./node_modules/core-js/features/array/from.js
var from = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/core-js/features/object/assign.js
var object_assign = __webpack_require__(123);

// EXTERNAL MODULE: ./node_modules/core-js/features/object/keys.js
var keys = __webpack_require__(128);

// EXTERNAL MODULE: ./node_modules/core-js/features/promise/index.js
var promise = __webpack_require__(132);

// EXTERNAL MODULE: ./node_modules/custom-event-polyfill/polyfill.js
var polyfill = __webpack_require__(156);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(60);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// CONCATENATED MODULE: ./src/js/utils/constants.ts
var NAV = typeof window !== 'undefined' ? window.navigator : null;
var UA = NAV ? NAV.userAgent.toLowerCase() : null;
var IS_IPAD = UA ? /ipad/i.test(UA) && !window.MSStream : false;
var IS_IPHONE = UA ? /iphone/i.test(UA) && !window.MSStream : false;
var IS_IPOD = UA ? /ipod/i.test(UA) && !window.MSStream : false;
var IS_IOS = UA ? /ipad|iphone|ipod/i.test(UA) && !window.MSStream : false;
var IS_ANDROID = UA ? /android/i.test(UA) : false;
var IS_IE = UA ? /(trident|microsoft)/i.test(NAV.appName) : false;
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
var EVENT_OPTIONS = IS_IE ? false : {
  passive: false
};
// CONCATENATED MODULE: ./src/js/utils/events.ts
function addEvent(event, details) {
  var detail = {};

  if (details && details.detail) {
    detail = {
      detail: details.detail
    };
  }

  return new CustomEvent(event, detail);
}
var events = ['loadstart', 'durationchange', 'loadedmetadata', 'loadeddata', 'progress', 'canplay', 'canplaythrough', 'suspend', 'abort', 'error', 'emptied', 'stalled', 'play', 'playing', 'pause', 'waiting', 'seeking', 'seeked', 'timeupdate', 'ended', 'ratechange', 'volumechange'];
// CONCATENATED MODULE: ./src/js/utils/general.ts
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
function removeElement(node) {
  if (node) {
    var parentNode = node.parentNode;

    if (parentNode) {
      parentNode.removeChild(node);
    }
  }
}
function loadScript(url) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = url;
    script.async = true;

    script.onload = function () {
      removeElement(script);
      resolve({});
    };

    script.onerror = function () {
      removeElement(script);
      reject({
        src: url
      });
    };

    if (document.head) {
      document.head.appendChild(script);
    }
  });
}
function request(url, dataType, success, error) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  var type;

  switch (dataType) {
    case 'text':
      type = 'text/plain';
      break;

    case 'json':
      type = 'application/json, text/javascript';
      break;

    case 'html':
      type = 'text/html';
      break;

    case 'xml':
      type = 'application/xml, text/xml';
      break;

    default:
      type = 'application/x-www-form-urlencoded; charset=UTF-8';
      break;
  }

  var completed = false;
  var accept = type !== 'application/x-www-form-urlencoded' ? "".concat(type, ", */*; q=0.01") : '*/'.concat('*');

  if (xhr) {
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Accept', accept);

    xhr.onreadystatechange = function () {
      if (completed) {
        return;
      }

      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          completed = true;
          var data;

          switch (dataType) {
            case 'json':
              data = JSON.parse(xhr.responseText);
              break;

            case 'xml':
              data = xhr.responseXML;
              break;

            default:
              data = xhr.responseText;
              break;
          }

          success(data);
        } else if (typeof error === 'function') {
          error(xhr.status);
        }
      }
    };

    xhr.send();
  }
}
function hasClass(target, className) {
  return !!(target.className.split(' ').indexOf(className) > -1);
}
function offset(el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft),
    top: rect.top + (window.pageYOffset || document.documentElement.scrollTop)
  };
}
function isXml(input) {
  var parsedXml;

  if (typeof window.DOMParser !== 'undefined') {
    parsedXml = function parsedXml(text) {
      return new window.DOMParser().parseFromString(text, 'text/xml');
    };
  } else if (typeof window.ActiveXObject !== 'undefined' && new window.ActiveXObject('Microsoft.XMLDOM')) {
    parsedXml = function parsedXml(text) {
      var xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
      xmlDoc.async = false;
      xmlDoc.loadXML(text);
      return xmlDoc;
    };
  } else {
    return false;
  }

  try {
    var response = parsedXml(input);

    if (response.getElementsByTagName('parsererror').length > 0) {
      return false;
    }

    if (response.parseError && response.parseError.errorCode !== 0) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}
// CONCATENATED MODULE: ./src/js/utils/time.ts
function formatTime(seconds, frameRate) {
  var f = Math.floor(seconds % 1 * (frameRate || 0));
  var s = Math.floor(seconds);
  var m = Math.floor(s / 60);
  var h = Math.floor(m / 60);

  var wrap = function wrap(value) {
    return value < 10 ? "0".concat(value) : value;
  };

  m = m % 60;
  s = s % 60;
  return "".concat(h > 0 ? "".concat(wrap(h), ":") : '').concat(wrap(m), ":").concat(wrap(s)).concat(f ? ":".concat(wrap(f)) : '');
}
function timeToSeconds(timecode) {
  var time = timecode.replace(/;/g, ':').split(':');
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
// CONCATENATED MODULE: ./src/js/controls/captions.ts




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

var _Captions_player, _Captions_button, _Captions_captions, _Captions_menu, _Captions_events, _Captions_tracks, _Captions_trackList, _Captions_trackUrlList, _Captions_hasTracks, _Captions_current, _Captions_default, _Captions_detachMenu, _Captions_labels, _Captions_position, _Captions_layer;






var captions_Captions = function () {
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

    _Captions_tracks.set(this, {});

    _Captions_trackList.set(this, void 0);

    _Captions_trackUrlList.set(this, {});

    _Captions_hasTracks.set(this, void 0);

    _Captions_current.set(this, void 0);

    _Captions_default.set(this, 'off');

    _Captions_detachMenu.set(this, void 0);

    _Captions_labels.set(this, void 0);

    _Captions_position.set(this, void 0);

    _Captions_layer.set(this, void 0);

    __classPrivateFieldSet(this, _Captions_player, player, "f");

    __classPrivateFieldSet(this, _Captions_labels, player.getOptions().labels, "f");

    __classPrivateFieldSet(this, _Captions_detachMenu, player.getOptions().detachMenus, "f");

    __classPrivateFieldSet(this, _Captions_position, position, "f");

    __classPrivateFieldSet(this, _Captions_layer, layer, "f");

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

    __classPrivateFieldSet(this, _Captions_trackList, tracks, "f");

    __classPrivateFieldSet(this, _Captions_hasTracks, !!__classPrivateFieldGet(this, _Captions_trackList, "f").length, "f");

    return this;
  }

  createClass_default()(Captions, [{
    key: "create",
    value: function create() {
      var _this = this;

      if (!__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
        return;
      }

      __classPrivateFieldSet(this, _Captions_button, document.createElement('button'), "f");

      __classPrivateFieldGet(this, _Captions_button, "f").className = "op-controls__captions op-control__".concat(__classPrivateFieldGet(this, _Captions_position, "f"));
      __classPrivateFieldGet(this, _Captions_button, "f").tabIndex = 0;
      __classPrivateFieldGet(this, _Captions_button, "f").title = __classPrivateFieldGet(this, _Captions_labels, "f").toggleCaptions;

      __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-controls', __classPrivateFieldGet(this, _Captions_player, "f").id);

      __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-pressed', 'false');

      __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('aria-label', __classPrivateFieldGet(this, _Captions_labels, "f").toggleCaptions);

      __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', 'off');

      __classPrivateFieldGet(this, _Captions_button, "f").innerHTML = "<span class=\"op-sr\">".concat(__classPrivateFieldGet(this, _Captions_labels, "f").toggleCaptions, "</span>");

      if (__classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
        __classPrivateFieldGet(this, _Captions_button, "f").classList.add('op-control--no-hover');

        __classPrivateFieldSet(this, _Captions_menu, document.createElement('div'), "f");

        __classPrivateFieldGet(this, _Captions_menu, "f").className = 'op-settings op-captions__menu';

        __classPrivateFieldGet(this, _Captions_menu, "f").setAttribute('aria-hidden', 'true');

        __classPrivateFieldGet(this, _Captions_menu, "f").innerHTML = "<div class=\"op-settings__menu\" role=\"menu\" id=\"menu-item-captions\">\n                <div class=\"op-settings__submenu-item\" tabindex=\"0\" role=\"menuitemradio\" aria-checked=\"".concat(__classPrivateFieldGet(this, _Captions_default, "f") === 'off' ? 'true' : 'false', "\">\n                    <div class=\"op-settings__submenu-label op-subtitles__option\" data-value=\"captions-off\">").concat(__classPrivateFieldGet(this, _Captions_labels, "f").off, "</div>\n                </div>\n            </div>");
      }

      var _loop = function _loop(i, tracks, total) {
        var element = tracks[i];

        if (element.kind === 'subtitles' || element.kind === 'captions') {
          if (element["default"]) {
            __classPrivateFieldSet(_this, _Captions_default, element.srclang, "f");

            __classPrivateFieldGet(_this, _Captions_button, "f").setAttribute('data-active-captions', element.srclang);
          }

          var trackUrl = getAbsoluteUrl(element.src);

          var currTrack = __classPrivateFieldGet(_this, _Captions_trackList, "f")[i];

          if (currTrack && currTrack.language === element.srclang) {
            if (currTrack.cues && currTrack.cues.length > 0) {
              __classPrivateFieldGet(_this, _Captions_tracks, "f")[element.srclang] = _this._getNativeCues(__classPrivateFieldGet(_this, _Captions_trackList, "f")[i]);

              _this._prepareTrack(i, element.srclang, trackUrl, element["default"] || false);
            } else {
              request(trackUrl, 'text', function (d) {
                __classPrivateFieldGet(_this, _Captions_tracks, "f")[element.srclang] = _this._getCuesFromText(d);

                _this._prepareTrack(i, element.srclang, trackUrl, element["default"] || false);

                var selector = ".op-subtitles__option[data-value=\"captions-".concat(__classPrivateFieldGet(_this, _Captions_trackList, "f")[i].language, "\"]");

                if (__classPrivateFieldGet(_this, _Captions_menu, "f") && !__classPrivateFieldGet(_this, _Captions_menu, "f").querySelector(selector)) {
                  var item = document.createElement('div');
                  item.className = 'op-settings__submenu-item';
                  item.tabIndex = 0;
                  item.setAttribute('role', 'menuitemradio');
                  item.setAttribute('aria-checked', __classPrivateFieldGet(_this, _Captions_default, "f") === __classPrivateFieldGet(_this, _Captions_trackList, "f")[i].language ? 'true' : 'false');
                  item.innerHTML = "<div class=\"op-settings__submenu-label op-subtitles__option\"\n                                        data-value=\"captions-".concat(__classPrivateFieldGet(_this, _Captions_trackList, "f")[i].language, "\">\n                                        ").concat(__classPrivateFieldGet(_this, _Captions_labels, "f").lang[__classPrivateFieldGet(_this, _Captions_trackList, "f")[i].language] || __classPrivateFieldGet(_this, _Captions_trackList, "f")[i].label, "\n                                    </div>");

                  __classPrivateFieldGet(_this, _Captions_menu, "f").appendChild(item);
                }
              });
            }
          }
        }
      };

      for (var i = 0, tracks = __classPrivateFieldGet(this, _Captions_player, "f").getElement().querySelectorAll('track'), total = tracks.length; i < total; i++) {
        _loop(i, tracks, total);
      }

      __classPrivateFieldSet(this, _Captions_captions, document.createElement('div'), "f");

      __classPrivateFieldGet(this, _Captions_captions, "f").className = 'op-captions';
      __classPrivateFieldGet(this, _Captions_captions, "f").innerHTML = '<span></span>';

      var container = __classPrivateFieldGet(this, _Captions_captions, "f").querySelector('span');

      __classPrivateFieldGet(this, _Captions_events, "f").media.timeupdate = function () {
        if (__classPrivateFieldGet(_this, _Captions_player, "f").isMedia()) {
          if (__classPrivateFieldGet(_this, _Captions_current, "f")) {
            var currentCues = __classPrivateFieldGet(_this, _Captions_tracks, "f")[__classPrivateFieldGet(_this, _Captions_current, "f").language];

            if (container && currentCues !== undefined) {
              var index = _this._search(currentCues, __classPrivateFieldGet(_this, _Captions_player, "f").getMedia().currentTime);

              container.innerHTML = '';

              if (index > -1 && hasClass(__classPrivateFieldGet(_this, _Captions_button, "f"), 'op-controls__captions--on')) {
                __classPrivateFieldGet(_this, _Captions_captions, "f").classList.add('op-captions--on');

                container.innerHTML = _this._sanitize(currentCues[index].text);
              } else {
                _this._hide();
              }
            }
          } else {
            _this._hide();
          }
        } else {
          _this._hide();
        }
      };

      __classPrivateFieldGet(this, _Captions_events, "f").button.click = function (e) {
        var button = e.target;

        if (__classPrivateFieldGet(_this, _Captions_detachMenu, "f")) {
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

          if (hasClass(button, 'op-controls__captions--on')) {
            _this._hide();

            button.classList.remove('op-controls__captions--on');
            button.setAttribute('data-active-captions', 'off');
          } else {
            if (!__classPrivateFieldGet(_this, _Captions_current, "f")) {
              __classPrivateFieldSet(_this, _Captions_current, __classPrivateFieldGet(_this, _Captions_trackList, "f")[0], "f");
            }

            _this._show();

            button.classList.add('op-controls__captions--on');
            button.setAttribute('data-active-captions', __classPrivateFieldGet(_this, _Captions_current, "f").language);
          }
        }
      };

      __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover = function () {
        if (!IS_IOS && !IS_ANDROID && __classPrivateFieldGet(_this, _Captions_detachMenu, "f")) {
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
        if (!IS_IOS && !IS_ANDROID && __classPrivateFieldGet(_this, _Captions_detachMenu, "f")) {
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

        if (__classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
          var itemContainer = document.createElement('div');
          itemContainer.className = "op-controls__container op-control__".concat(__classPrivateFieldGet(this, _Captions_position, "f"));
          itemContainer.appendChild(__classPrivateFieldGet(this, _Captions_button, "f"));
          itemContainer.appendChild(__classPrivateFieldGet(this, _Captions_menu, "f"));

          __classPrivateFieldGet(this, _Captions_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Captions_layer, "f")).appendChild(itemContainer);
        } else {
          __classPrivateFieldGet(this, _Captions_player, "f").getControls().getLayer(__classPrivateFieldGet(this, _Captions_layer, "f")).appendChild(__classPrivateFieldGet(this, _Captions_button, "f"));
        }

        __classPrivateFieldGet(this, _Captions_button, "f").addEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").button.click, EVENT_OPTIONS);
      }

      if (__classPrivateFieldGet(this, _Captions_trackList, "f").length <= 1 && !__classPrivateFieldGet(this, _Captions_detachMenu, "f") || !__classPrivateFieldGet(this, _Captions_trackList, "f").length && __classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
        return;
      }

      __classPrivateFieldGet(this, _Captions_events, "f").global.click = function (e) {
        var option = e.target;

        if (option.closest("#".concat(__classPrivateFieldGet(_this, _Captions_player, "f").id)) && hasClass(option, 'op-subtitles__option')) {
          var langEl = option.getAttribute('data-value');
          var language = langEl ? langEl.replace('captions-', '') : '';
          var currentLang = Array.from(__classPrivateFieldGet(_this, _Captions_trackList, "f")).filter(function (item) {
            return item.language === language;
          });

          __classPrivateFieldSet(_this, _Captions_current, currentLang ? currentLang.pop() : undefined, "f");

          if (__classPrivateFieldGet(_this, _Captions_detachMenu, "f")) {
            if (hasClass(__classPrivateFieldGet(_this, _Captions_button, "f"), 'op-controls__captions--on')) {
              _this._hide();

              __classPrivateFieldGet(_this, _Captions_button, "f").classList.remove('op-controls__captions--on');

              __classPrivateFieldGet(_this, _Captions_button, "f").setAttribute('data-active-captions', 'off');
            } else {
              _this._show();

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
            _this._show();

            __classPrivateFieldGet(_this, _Captions_button, "f").setAttribute('data-active-captions', language);
          }

          var event = addEvent('captionschanged');

          __classPrivateFieldGet(_this, _Captions_player, "f").getElement().dispatchEvent(event);
        }
      };

      if (__classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
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
      if (typeof __classPrivateFieldGet(this, _Captions_events, "f").global.click !== 'undefined') {
        document.removeEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").global.click);
      }

      if (__classPrivateFieldGet(this, _Captions_hasTracks, "f")) {
        __classPrivateFieldGet(this, _Captions_button, "f").removeEventListener('click', __classPrivateFieldGet(this, _Captions_events, "f").button.click);

        if (__classPrivateFieldGet(this, _Captions_detachMenu, "f")) {
          __classPrivateFieldGet(this, _Captions_button, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover);

          __classPrivateFieldGet(this, _Captions_menu, "f").removeEventListener('mouseover', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseover);

          __classPrivateFieldGet(this, _Captions_menu, "f").removeEventListener('mouseout', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout);

          __classPrivateFieldGet(this, _Captions_player, "f").getElement().removeEventListener('controlshidden', __classPrivateFieldGet(this, _Captions_events, "f").button.mouseout);

          removeElement(__classPrivateFieldGet(this, _Captions_menu, "f"));
        }

        __classPrivateFieldGet(this, _Captions_player, "f").getElement().removeEventListener('timeupdate', __classPrivateFieldGet(this, _Captions_events, "f").media.timeupdate);

        removeElement(__classPrivateFieldGet(this, _Captions_button, "f"));
        removeElement(__classPrivateFieldGet(this, _Captions_captions, "f"));
      }
    }
  }, {
    key: "addSettings",
    value: function addSettings() {
      if (__classPrivateFieldGet(this, _Captions_detachMenu, "f") || __classPrivateFieldGet(this, _Captions_trackList, "f").length <= 1) {
        return {};
      }

      var subitems = this._formatMenuItems();

      return subitems.length > 2 ? {
        className: 'op-subtitles__option',
        "default": __classPrivateFieldGet(this, _Captions_default, "f") || 'off',
        key: 'captions',
        name: __classPrivateFieldGet(this, _Captions_labels, "f").captions,
        subitems: subitems
      } : {};
    }
  }, {
    key: "_getCuesFromText",
    value: function _getCuesFromText(webvttText) {
      var lines = webvttText.split(/\r?\n/);
      var entries = [];
      var urlRegexp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
      var timePattern = '^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --> ';
      timePattern += '((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*?)$';
      var regexp = new RegExp(timePattern);
      var identifier;

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

      for (var i = 0, total = lines.length; i < total; i++) {
        var timecode = regexp.exec(lines[i]);

        if (timecode && i < lines.length) {
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
          var initTime = timeToSeconds(timecode[1]);
          entries.push({
            endTime: timeToSeconds(timecode[3]),
            identifier: identifier || '',
            settings: isJson(timecode[5]) ? JSON.parse(timecode[5]) : {},
            startTime: initTime === 0 ? 0.200 : initTime,
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
    key: "_show",
    value: function _show() {
      if (!__classPrivateFieldGet(this, _Captions_captions, "f") || !__classPrivateFieldGet(this, _Captions_current, "f") || __classPrivateFieldGet(this, _Captions_current, "f").cues === undefined) {
        return;
      }

      var container = __classPrivateFieldGet(this, _Captions_captions, "f").querySelector('span');

      if (container) {
        container.innerHTML = '';
      }

      __classPrivateFieldGet(this, _Captions_player, "f").getElement().addEventListener('timeupdate', __classPrivateFieldGet(this, _Captions_events, "f").media.timeupdate, EVENT_OPTIONS);
    }
  }, {
    key: "_hide",
    value: function _hide() {
      __classPrivateFieldGet(this, _Captions_captions, "f").classList.remove('op-captions--on');

      if (!__classPrivateFieldGet(this, _Captions_current, "f")) {
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
    key: "_sanitize",
    value: function _sanitize(html) {
      var div = document.createElement('div');
      div.innerHTML = html;
      var scripts = div.getElementsByTagName('script');
      var i = scripts.length;

      while (i--) {
        removeElement(scripts[i]);
      }

      var allElements = div.getElementsByTagName('*');

      for (var index = 0, n = allElements.length; index < n; index++) {
        var attributesObj = allElements[index].attributes;
        var attributes = Array.prototype.slice.call(attributesObj);

        for (var j = 0, total = attributes.length; j < total; j++) {
          if (/^(on|javascript:)/.test(attributes[j].name)) {
            removeElement(allElements[index]);
          } else if (attributes[j].name === 'style') {
            allElements[index].removeAttribute(attributes[j].name);
          }
        }
      }

      return div.innerHTML;
    }
  }, {
    key: "_prepareTrack",
    value: function _prepareTrack(index, language, trackUrl) {
      var _this2 = this;

      var showTrack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      __classPrivateFieldGet(this, _Captions_trackUrlList, "f")[language] = trackUrl;
      __classPrivateFieldGet(this, _Captions_trackList, "f")[index].mode = 'disabled';

      if (showTrack) {
        __classPrivateFieldSet(this, _Captions_default, language, "f");

        __classPrivateFieldGet(this, _Captions_button, "f").classList.add('op-controls__captions--on');

        __classPrivateFieldGet(this, _Captions_button, "f").setAttribute('data-active-captions', language);

        __classPrivateFieldSet(this, _Captions_current, Array.from(__classPrivateFieldGet(this, _Captions_trackList, "f")).filter(function (item) {
          return item.language === __classPrivateFieldGet(_this2, _Captions_default, "f");
        }).pop(), "f");

        this._show();

        if (!__classPrivateFieldGet(this, _Captions_player, "f").getContainer().classList.contains('op-captions--detected')) {
          __classPrivateFieldGet(this, _Captions_player, "f").getContainer().classList.add('op-captions--detected');
        }
      }
    }
  }, {
    key: "_formatMenuItems",
    value: function _formatMenuItems() {
      var _this3 = this;

      var items = [{
        key: 'off',
        label: __classPrivateFieldGet(this, _Captions_labels, "f").off
      }];

      var _loop2 = function _loop2(i, total) {
        var track = __classPrivateFieldGet(_this3, _Captions_trackList, "f")[i];

        items = items.filter(function (el) {
          return el.key !== track.language;
        });
        items.push({
          key: track.language,
          label: __classPrivateFieldGet(_this3, _Captions_labels, "f").lang[track.language] || __classPrivateFieldGet(_this3, _Captions_trackList, "f")[i].label
        });
      };

      for (var i = 0, total = __classPrivateFieldGet(this, _Captions_trackList, "f").length; i < total; i++) {
        _loop2(i, total);
      }

      return items;
    }
  }]);

  return Captions;
}();

_Captions_player = new WeakMap(), _Captions_button = new WeakMap(), _Captions_captions = new WeakMap(), _Captions_menu = new WeakMap(), _Captions_events = new WeakMap(), _Captions_tracks = new WeakMap(), _Captions_trackList = new WeakMap(), _Captions_trackUrlList = new WeakMap(), _Captions_hasTracks = new WeakMap(), _Captions_current = new WeakMap(), _Captions_default = new WeakMap(), _Captions_detachMenu = new WeakMap(), _Captions_labels = new WeakMap(), _Captions_position = new WeakMap(), _Captions_layer = new WeakMap();
/* harmony default export */ var controls_captions = (captions_Captions);
// CONCATENATED MODULE: ./src/js/controls/fullscreen.ts



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

var _Fullscreen_player, _Fullscreen_isFullscreen, _Fullscreen_button, _Fullscreen_fullscreenEvents, _Fullscreen_fullscreenWidth, _Fullscreen_fullscreenHeight, _Fullscreen_clickEvent, _Fullscreen_labels, _Fullscreen_position, _Fullscreen_layer;




var fullscreen_Fullscreen = function () {
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

    _Fullscreen_labels.set(this, void 0);

    _Fullscreen_position.set(this, void 0);

    _Fullscreen_layer.set(this, void 0);

    fullscreen_classPrivateFieldSet(this, _Fullscreen_player, player, "f");

    fullscreen_classPrivateFieldSet(this, _Fullscreen_labels, player.getOptions().labels, "f");

    fullscreen_classPrivateFieldSet(this, _Fullscreen_position, position, "f");

    fullscreen_classPrivateFieldSet(this, _Fullscreen_layer, layer, "f");

    fullscreen_classPrivateFieldSet(this, _Fullscreen_isFullscreen, document.body.classList.contains('op-fullscreen__on'), "f");

    var target = document;
    this.fullScreenEnabled = !!(target.fullscreenEnabled || target.mozFullScreenEnabled || target.msFullscreenEnabled || target.webkitSupportsFullscreen || target.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
    this._keydownEvent = this._keydownEvent.bind(this);
    this._fullscreenChange = this._fullscreenChange.bind(this);

    fullscreen_classPrivateFieldSet(this, _Fullscreen_fullscreenEvents, ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'], "f");

    fullscreen_classPrivateFieldGet(this, _Fullscreen_fullscreenEvents, "f").forEach(function (event) {
      document.addEventListener(event, _this._fullscreenChange, EVENT_OPTIONS);
    });

    this._setFullscreenData(false);

    fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer().addEventListener('keydown', this._keydownEvent, EVENT_OPTIONS);

    if (IS_IPHONE) {
      fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().addEventListener('webkitbeginfullscreen', function () {
        fullscreen_classPrivateFieldSet(_this, _Fullscreen_isFullscreen, true, "f");

        _this._setFullscreenData(true);

        document.body.classList.add('op-fullscreen__on');
      }, EVENT_OPTIONS);

      fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().addEventListener('webkitendfullscreen', function () {
        fullscreen_classPrivateFieldSet(_this, _Fullscreen_isFullscreen, false, "f");

        _this._setFullscreenData(false);

        document.body.classList.remove('op-fullscreen__on');
      }, EVENT_OPTIONS);
    }

    return this;
  }

  createClass_default()(Fullscreen, [{
    key: "create",
    value: function create() {
      var _this2 = this;

      fullscreen_classPrivateFieldSet(this, _Fullscreen_button, document.createElement('button'), "f");

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").type = 'button';
      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").className = "op-controls__fullscreen op-control__".concat(fullscreen_classPrivateFieldGet(this, _Fullscreen_position, "f"));
      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").tabIndex = 0;
      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").title = fullscreen_classPrivateFieldGet(this, _Fullscreen_labels, "f").fullscreen;

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-controls', fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").id);

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-pressed', 'false');

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").setAttribute('aria-label', fullscreen_classPrivateFieldGet(this, _Fullscreen_labels, "f").fullscreen);

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").innerHTML = "<span class=\"op-sr\">".concat(fullscreen_classPrivateFieldGet(this, _Fullscreen_labels, "f").fullscreen, "</span>");

      fullscreen_classPrivateFieldSet(this, _Fullscreen_clickEvent, function () {
        fullscreen_classPrivateFieldGet(_this2, _Fullscreen_button, "f").setAttribute('aria-pressed', 'true');

        _this2.toggleFullscreen();
      }, "f");

      fullscreen_classPrivateFieldSet(this, _Fullscreen_clickEvent, fullscreen_classPrivateFieldGet(this, _Fullscreen_clickEvent, "f").bind(this), "f");

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").addEventListener('click', fullscreen_classPrivateFieldGet(this, _Fullscreen_clickEvent, "f"), EVENT_OPTIONS);

      fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getControls().getLayer(fullscreen_classPrivateFieldGet(this, _Fullscreen_layer, "f")).appendChild(fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f"));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer().removeEventListener('keydown', this._keydownEvent);

      fullscreen_classPrivateFieldGet(this, _Fullscreen_fullscreenEvents, "f").forEach(function (event) {
        document.removeEventListener(event, _this3._fullscreenChange);
      });

      if (IS_IPHONE) {
        fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().removeEventListener('webkitbeginfullscreen', function () {
          fullscreen_classPrivateFieldSet(_this3, _Fullscreen_isFullscreen, true, "f");

          _this3._setFullscreenData(false);

          document.body.classList.add('op-fullscreen__on');
        });

        fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getElement().removeEventListener('webkitendfullscreen', function () {
          fullscreen_classPrivateFieldSet(_this3, _Fullscreen_isFullscreen, false, "f");

          _this3._setFullscreenData(true);

          document.body.classList.remove('op-fullscreen__on');
        });
      }

      fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f").removeEventListener('click', fullscreen_classPrivateFieldGet(this, _Fullscreen_clickEvent, "f"));

      removeElement(fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f"));
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
        } else if (document.webkitCancelFullScreen) {
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
        var screen = window.screen;

        if (screen.orientation) {
          if (!fullscreen_classPrivateFieldGet(this, _Fullscreen_isFullscreen, "f")) {
            screen.orientation.lock('landscape');
          }
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
    value: function _setFullscreenData(state) {
      fullscreen_classPrivateFieldGet(this, _Fullscreen_player, "f").getContainer().setAttribute('data-fullscreen', (!!state).toString());

      if (fullscreen_classPrivateFieldGet(this, _Fullscreen_button, "f")) {
        if (state) {
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
    key: "_keydownEvent",
    value: function _keydownEvent(e) {
      var _a;

      var key = e.which || e.keyCode || 0;
      var fullscreenBtnFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-controls__fullscreen');

      if (fullscreenBtnFocused && (key === 13 || key === 32)) {
        this.toggleFullscreen();
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }]);

  return Fullscreen;
}();

_Fullscreen_player = new WeakMap(), _Fullscreen_isFullscreen = new WeakMap(), _Fullscreen_button = new WeakMap(), _Fullscreen_fullscreenEvents = new WeakMap(), _Fullscreen_fullscreenWidth = new WeakMap(), _Fullscreen_fullscreenHeight = new WeakMap(), _Fullscreen_clickEvent = new WeakMap(), _Fullscreen_labels = new WeakMap(), _Fullscreen_position = new WeakMap(), _Fullscreen_layer = new WeakMap();
/* harmony default export */ var fullscreen = (fullscreen_Fullscreen);
// CONCATENATED MODULE: ./src/js/utils/media.ts

function getExtension(url) {
  var baseUrl = url.split('?')[0];
  var baseFrags = baseUrl ? baseUrl.split('\\') : null;
  var baseUrlFragment = baseFrags ? baseFrags.pop() : null;
  var baseNameFrags = baseUrlFragment ? baseUrlFragment.split('/') : null;
  var baseName = baseNameFrags ? baseNameFrags.pop() : null;
  return baseName && baseName.indexOf('.') > -1 ? baseName.substring(baseName.lastIndexOf('.') + 1) : '';
}
function isHlsSource(media) {
  return /\.m3u8$/i.test(media.src) || ['application/x-mpegURL', 'application/vnd.apple.mpegurl'].indexOf(media.type) > -1;
}
function isM3USource(media) {
  return /\.m3u$/i.test(media.src);
}
function isDashSource(media) {
  return /\.mpd/i.test(media.src) || media.type === 'application/dash+xml';
}
function isFlvSource(media) {
  return /(^rtmp:\/\/|\.flv$)/i.test(media.src) || ['video/x-flv', 'video/flv'].indexOf(media.type) > -1;
}
function predictType(url, element) {
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
      return callback();
    })["catch"](function () {
      media.volume = 0;
      media.muted = true;
      media.play().then(function () {
        media.pause();
        autoplay(true);
        muted(true);
        return callback();
      })["catch"](function () {
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
// CONCATENATED MODULE: ./src/js/controls/levels.ts



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

var _Levels_player, _Levels_button, _Levels_menu, _Levels_events, _Levels_detachMenu, _Levels_labels, _Levels_levels, _Levels_default, _Levels_position, _Levels_layer;






var levels_Levels = function () {
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

    _Levels_detachMenu.set(this, void 0);

    _Levels_labels.set(this, void 0);

    _Levels_levels.set(this, []);

    _Levels_default.set(this, '');

    _Levels_position.set(this, void 0);

    _Levels_layer.set(this, void 0);

    levels_classPrivateFieldSet(this, _Levels_player, player, "f");

    levels_classPrivateFieldSet(this, _Levels_labels, player.getOptions().labels, "f");

    levels_classPrivateFieldSet(this, _Levels_detachMenu, player.getOptions().detachMenus, "f");

    levels_classPrivateFieldSet(this, _Levels_position, position, "f");

    levels_classPrivateFieldSet(this, _Levels_layer, layer, "f");

    return this;
  }

  createClass_default()(Levels, [{
    key: "create",
    value: function create() {
      var _this = this;

      var initialLevel = levels_classPrivateFieldGet(this, _Levels_player, "f").getOptions().defaultLevel !== null ? parseInt(levels_classPrivateFieldGet(this, _Levels_player, "f").getOptions().defaultLevel, 10) : levels_classPrivateFieldGet(this, _Levels_player, "f").getMedia().level;

      levels_classPrivateFieldSet(this, _Levels_default, "".concat(initialLevel), "f");

      var menuItems = this._formatMenuItems();

      var defaultLevel = menuItems.length ? menuItems.find(function (items) {
        return items.key === levels_classPrivateFieldGet(_this, _Levels_default, "f");
      }) : null;
      var defaultLabel = defaultLevel ? defaultLevel.label : levels_classPrivateFieldGet(this, _Levels_labels, "f").auto;
      var levelSet = false;

      levels_classPrivateFieldSet(this, _Levels_button, document.createElement('button'), "f");

      levels_classPrivateFieldGet(this, _Levels_button, "f").className = "op-controls__levels op-control__".concat(levels_classPrivateFieldGet(this, _Levels_position, "f"));
      levels_classPrivateFieldGet(this, _Levels_button, "f").tabIndex = 0;
      levels_classPrivateFieldGet(this, _Levels_button, "f").title = levels_classPrivateFieldGet(this, _Levels_labels, "f").mediaLevels;

      levels_classPrivateFieldGet(this, _Levels_button, "f").setAttribute('aria-controls', levels_classPrivateFieldGet(this, _Levels_player, "f").id);

      levels_classPrivateFieldGet(this, _Levels_button, "f").setAttribute('aria-label', levels_classPrivateFieldGet(this, _Levels_labels, "f").mediaLevels);

      levels_classPrivateFieldGet(this, _Levels_button, "f").setAttribute('data-active-level', levels_classPrivateFieldGet(this, _Levels_default, "f"));

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

      if (levels_classPrivateFieldGet(this, _Levels_detachMenu, "f")) {
        this._buildMenu();

        levels_classPrivateFieldGet(this, _Levels_events, "f").button.click = function () {
          if (levels_classPrivateFieldGet(_this, _Levels_detachMenu, "f")) {
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

        var currentTime = levels_classPrivateFieldGet(_this, _Levels_player, "f").getMedia().currentTime;

        var isPaused = levels_classPrivateFieldGet(_this, _Levels_player, "f").getMedia().paused;

        if (option.closest("#".concat(levels_classPrivateFieldGet(_this, _Levels_player, "f").id)) && hasClass(option, 'op-levels__option')) {
          var levelVal = option.getAttribute('data-value');
          var level = parseInt(levelVal ? levelVal.replace('levels-', '') : '-1', 10);

          levels_classPrivateFieldSet(_this, _Levels_default, "".concat(level), "f");

          if (levels_classPrivateFieldGet(_this, _Levels_detachMenu, "f")) {
            levels_classPrivateFieldGet(_this, _Levels_button, "f").setAttribute('data-active-level', "".concat(level));

            levels_classPrivateFieldGet(_this, _Levels_button, "f").innerHTML = "<span>".concat(option.innerText, "</span>");
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

      var connection = NAV.connection || NAV.mozConnection || NAV.webkitConnection;

      levels_classPrivateFieldGet(this, _Levels_events, "f").global.connection = function () {
        var media = levels_classPrivateFieldGet(_this, _Levels_player, "f").getMedia().current;

        if (!isDashSource(media) && !isHlsSource(media)) {
          var type = connection.effectiveType;

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

          type = connection.effectiveType;
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

      var connection = NAV.connection || NAV.mozConnection || NAV.webkitConnection;
      Object.keys(levels_classPrivateFieldGet(this, _Levels_events, "f").media).forEach(function (event) {
        levels_classPrivateFieldGet(_this2, _Levels_player, "f").getElement().removeEventListener(event, levels_classPrivateFieldGet(_this2, _Levels_events, "f").media[event]);
      });
      document.removeEventListener('click', levels_classPrivateFieldGet(this, _Levels_events, "f").global.click);

      if (connection) {
        connection.removeEventListener('change', levels_classPrivateFieldGet(this, _Levels_events, "f").global.connection);
      }

      if (levels_classPrivateFieldGet(this, _Levels_detachMenu, "f")) {
        levels_classPrivateFieldGet(this, _Levels_button, "f").removeEventListener('click', levels_classPrivateFieldGet(this, _Levels_events, "f").button.click);

        removeElement(levels_classPrivateFieldGet(this, _Levels_button, "f"));

        levels_classPrivateFieldGet(this, _Levels_button, "f").removeEventListener('mouseover', levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseover);

        levels_classPrivateFieldGet(this, _Levels_menu, "f").removeEventListener('mouseover', levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseover);

        levels_classPrivateFieldGet(this, _Levels_menu, "f").removeEventListener('mouseout', levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseout);

        levels_classPrivateFieldGet(this, _Levels_player, "f").getElement().removeEventListener('controlshidden', levels_classPrivateFieldGet(this, _Levels_events, "f").button.mouseout);

        removeElement(levels_classPrivateFieldGet(this, _Levels_menu, "f"));
      }
    }
  }, {
    key: "addSettings",
    value: function addSettings() {
      if (levels_classPrivateFieldGet(this, _Levels_detachMenu, "f")) {
        return {};
      }

      var subitems = this._formatMenuItems();

      return subitems.length > 2 ? {
        className: 'op-levels__option',
        "default": levels_classPrivateFieldGet(this, _Levels_default, "f") || '-1',
        key: 'levels',
        name: levels_classPrivateFieldGet(this, _Levels_labels, "f").levels,
        subitems: subitems
      } : {};
    }
  }, {
    key: "_formatMenuItems",
    value: function _formatMenuItems() {
      var levels = this._gatherLevels();

      var total = levels.length;
      var items = total ? [{
        key: '-1',
        label: levels_classPrivateFieldGet(this, _Levels_labels, "f").auto
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

      items = items.reduce(function (acc, current) {
        var duplicate = acc.find(function (item) {
          return item.label === current.label;
        });

        if (!duplicate) {
          return acc.concat([current]);
        }

        return acc;
      }, []).sort(function (a, b) {
        return parseInt(a.label, 10) > parseInt(b.label, 10) ? 1 : -1;
      });
      return items;
    }
  }, {
    key: "_getResolutionsLabel",
    value: function _getResolutionsLabel(height) {
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

      return levels_classPrivateFieldGet(this, _Levels_labels, "f").auto;
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

      if (levels_classPrivateFieldGet(this, _Levels_detachMenu, "f")) {
        levels_classPrivateFieldGet(this, _Levels_button, "f").classList.add('op-control--no-hover');

        levels_classPrivateFieldSet(this, _Levels_menu, document.createElement('div'), "f");

        levels_classPrivateFieldGet(this, _Levels_menu, "f").className = 'op-settings op-levels__menu';

        levels_classPrivateFieldGet(this, _Levels_menu, "f").setAttribute('aria-hidden', 'true');

        var className = 'op-levels__option';

        var options = this._formatMenuItems();

        var menu = "<div class=\"op-settings__menu\" role=\"menu\" id=\"menu-item-levels\">\n                ".concat(options.map(function (item) {
          return "\n                <div class=\"op-settings__submenu-item\" tabindex=\"0\" role=\"menuitemradio\"\n                    aria-checked=\"".concat(levels_classPrivateFieldGet(_this4, _Levels_default, "f") === item.key ? 'true' : 'false', "\">\n                    <div class=\"op-settings__submenu-label ").concat(className || '', "\" data-value=\"levels-").concat(item.key, "\">").concat(item.label, "</div>\n                </div>");
        }).join(''), "\n            </div>");
        levels_classPrivateFieldGet(this, _Levels_menu, "f").innerHTML = menu;
        var itemContainer = document.createElement('div');
        itemContainer.className = "op-controls__container op-control__".concat(levels_classPrivateFieldGet(this, _Levels_position, "f"));
        itemContainer.appendChild(levels_classPrivateFieldGet(this, _Levels_button, "f"));
        itemContainer.appendChild(levels_classPrivateFieldGet(this, _Levels_menu, "f"));

        levels_classPrivateFieldGet(this, _Levels_player, "f").getControls().getLayer(levels_classPrivateFieldGet(this, _Levels_layer, "f")).appendChild(itemContainer);
      }
    }
  }]);

  return Levels;
}();

_Levels_player = new WeakMap(), _Levels_button = new WeakMap(), _Levels_menu = new WeakMap(), _Levels_events = new WeakMap(), _Levels_detachMenu = new WeakMap(), _Levels_labels = new WeakMap(), _Levels_levels = new WeakMap(), _Levels_default = new WeakMap(), _Levels_position = new WeakMap(), _Levels_layer = new WeakMap();
/* harmony default export */ var controls_levels = (levels_Levels);
// CONCATENATED MODULE: ./src/js/controls/play.ts



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

var _Play_player, _Play_button, _Play_events, _Play_labels, _Play_position, _Play_layer;






var play_Play = function () {
  function Play(player, position, layer) {
    classCallCheck_default()(this, Play);

    _Play_player.set(this, void 0);

    _Play_button.set(this, void 0);

    _Play_events.set(this, {
      controls: {},
      media: {}
    });

    _Play_labels.set(this, void 0);

    _Play_position.set(this, void 0);

    _Play_layer.set(this, void 0);

    play_classPrivateFieldSet(this, _Play_player, player, "f");

    play_classPrivateFieldSet(this, _Play_labels, play_classPrivateFieldGet(this, _Play_player, "f").getOptions().labels, "f");

    play_classPrivateFieldSet(this, _Play_position, position, "f");

    play_classPrivateFieldSet(this, _Play_layer, layer, "f");

    this._keydownEvent = this._keydownEvent.bind(this);
    return this;
  }

  createClass_default()(Play, [{
    key: "create",
    value: function create() {
      var _this = this;

      play_classPrivateFieldSet(this, _Play_button, document.createElement('button'), "f");

      play_classPrivateFieldGet(this, _Play_button, "f").type = 'button';
      play_classPrivateFieldGet(this, _Play_button, "f").className = "op-controls__playpause op-control__".concat(play_classPrivateFieldGet(this, _Play_position, "f"));
      play_classPrivateFieldGet(this, _Play_button, "f").tabIndex = 0;
      play_classPrivateFieldGet(this, _Play_button, "f").title = play_classPrivateFieldGet(this, _Play_labels, "f").play;

      play_classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-controls', play_classPrivateFieldGet(this, _Play_player, "f").id);

      play_classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-pressed', 'false');

      play_classPrivateFieldGet(this, _Play_button, "f").setAttribute('aria-label', play_classPrivateFieldGet(this, _Play_labels, "f").play);

      play_classPrivateFieldGet(this, _Play_button, "f").innerHTML = "<span class=\"op-sr\">".concat(play_classPrivateFieldGet(this, _Play_labels, "f").play, "/").concat(play_classPrivateFieldGet(this, _Play_labels, "f").pause, "</span>");

      play_classPrivateFieldGet(this, _Play_player, "f").getControls().getLayer(play_classPrivateFieldGet(this, _Play_layer, "f")).appendChild(play_classPrivateFieldGet(this, _Play_button, "f"));

      play_classPrivateFieldGet(this, _Play_events, "f").media.click = function (e) {
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
        if (play_classPrivateFieldGet(_this, _Play_player, "f").activeElement().ended) {
          if (play_classPrivateFieldGet(_this, _Play_player, "f").isMedia()) {
            play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--replay');
          } else {
            play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--pause');
          }

          play_classPrivateFieldGet(_this, _Play_button, "f").title = play_classPrivateFieldGet(_this, _Play_labels, "f").play;

          play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', play_classPrivateFieldGet(_this, _Play_labels, "f").play);
        } else {
          play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--replay');

          play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--pause');

          play_classPrivateFieldGet(_this, _Play_button, "f").title = play_classPrivateFieldGet(_this, _Play_labels, "f").pause;

          play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', play_classPrivateFieldGet(_this, _Play_labels, "f").pause);

          if (play_classPrivateFieldGet(_this, _Play_player, "f").getOptions().pauseOthers) {
            Object.keys(js_player.instances).forEach(function (key) {
              if (key !== play_classPrivateFieldGet(_this, _Play_player, "f").id) {
                var target = js_player.instances[key].activeElement();
                target.pause();
              }
            });
          }
        }
      };

      play_classPrivateFieldGet(this, _Play_events, "f").media.loadedmetadata = function () {
        if (hasClass(play_classPrivateFieldGet(_this, _Play_button, "f"), 'op-controls__playpause--pause')) {
          play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--replay');

          play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--pause');

          play_classPrivateFieldGet(_this, _Play_button, "f").title = play_classPrivateFieldGet(_this, _Play_labels, "f").play;

          play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', play_classPrivateFieldGet(_this, _Play_labels, "f").play);
        }
      };

      play_classPrivateFieldGet(this, _Play_events, "f").media.playing = function () {
        if (!hasClass(play_classPrivateFieldGet(_this, _Play_button, "f"), 'op-controls__playpause--pause')) {
          play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--replay');

          play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--pause');

          play_classPrivateFieldGet(_this, _Play_button, "f").title = play_classPrivateFieldGet(_this, _Play_labels, "f").pause;

          play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', play_classPrivateFieldGet(_this, _Play_labels, "f").pause);
        }
      };

      play_classPrivateFieldGet(this, _Play_events, "f").media.pause = function () {
        play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--pause');

        play_classPrivateFieldGet(_this, _Play_button, "f").title = play_classPrivateFieldGet(_this, _Play_labels, "f").play;

        play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', play_classPrivateFieldGet(_this, _Play_labels, "f").play);
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

        play_classPrivateFieldGet(_this, _Play_button, "f").title = play_classPrivateFieldGet(_this, _Play_labels, "f").play;

        play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', play_classPrivateFieldGet(_this, _Play_labels, "f").play);
      };

      play_classPrivateFieldGet(this, _Play_events, "f").media.adsmediaended = function () {
        play_classPrivateFieldGet(_this, _Play_button, "f").classList.remove('op-controls__playpause--replay');

        play_classPrivateFieldGet(_this, _Play_button, "f").classList.add('op-controls__playpause--pause');

        play_classPrivateFieldGet(_this, _Play_button, "f").title = play_classPrivateFieldGet(_this, _Play_labels, "f").pause;

        play_classPrivateFieldGet(_this, _Play_button, "f").setAttribute('aria-label', play_classPrivateFieldGet(_this, _Play_labels, "f").pause);
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

      play_classPrivateFieldGet(this, _Play_player, "f").getControls().getContainer().addEventListener('controlschanged', play_classPrivateFieldGet(this, _Play_events, "f").controls.controlschanged, EVENT_OPTIONS);

      play_classPrivateFieldGet(this, _Play_player, "f").getContainer().addEventListener('keydown', this._keydownEvent, EVENT_OPTIONS);

      play_classPrivateFieldGet(this, _Play_button, "f").addEventListener('click', play_classPrivateFieldGet(this, _Play_events, "f").media.click, EVENT_OPTIONS);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      Object.keys(play_classPrivateFieldGet(this, _Play_events, "f").media).forEach(function (event) {
        play_classPrivateFieldGet(_this2, _Play_player, "f").getElement().removeEventListener(event, play_classPrivateFieldGet(_this2, _Play_events, "f").media[event]);
      });

      play_classPrivateFieldGet(this, _Play_player, "f").getControls().getContainer().removeEventListener('controlschanged', play_classPrivateFieldGet(this, _Play_events, "f").controls.controlschanged);

      play_classPrivateFieldGet(this, _Play_player, "f").getContainer().removeEventListener('keydown', this._keydownEvent);

      play_classPrivateFieldGet(this, _Play_button, "f").removeEventListener('click', play_classPrivateFieldGet(this, _Play_events, "f").media.click);

      removeElement(play_classPrivateFieldGet(this, _Play_button, "f"));
    }
  }, {
    key: "_keydownEvent",
    value: function _keydownEvent(e) {
      var _a;

      var key = e.which || e.keyCode || 0;
      var playBtnFocused = (_a = document === null || document === void 0 ? void 0 : document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('op-controls__playpause');

      if (playBtnFocused && (key === 13 || key === 32)) {
        play_classPrivateFieldGet(this, _Play_events, "f").media.click(e);
      }
    }
  }]);

  return Play;
}();

_Play_player = new WeakMap(), _Play_button = new WeakMap(), _Play_events = new WeakMap(), _Play_labels = new WeakMap(), _Play_position = new WeakMap(), _Play_layer = new WeakMap();
/* harmony default export */ var controls_play = (play_Play);
// CONCATENATED MODULE: ./src/js/controls/progress.ts



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

var _Progress_player, _Progress_progress, _Progress_slider, _Progress_buffer, _Progress_played, _Progress_tooltip, _Progress_events, _Progress_forcePause, _Progress_labels, _Progress_position, _Progress_layer;





var progress_Progress = function () {
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

    _Progress_forcePause.set(this, void 0);

    _Progress_labels.set(this, void 0);

    _Progress_position.set(this, void 0);

    _Progress_layer.set(this, void 0);

    progress_classPrivateFieldSet(this, _Progress_player, player, "f");

    progress_classPrivateFieldSet(this, _Progress_labels, player.getOptions().labels, "f");

    progress_classPrivateFieldSet(this, _Progress_forcePause, false, "f");

    progress_classPrivateFieldSet(this, _Progress_position, position, "f");

    progress_classPrivateFieldSet(this, _Progress_layer, layer, "f");

    this._keydownEvent = this._keydownEvent.bind(this);
    return this;
  }

  createClass_default()(Progress, [{
    key: "create",
    value: function create() {
      var _this = this;

      progress_classPrivateFieldSet(this, _Progress_progress, document.createElement('div'), "f");

      progress_classPrivateFieldGet(this, _Progress_progress, "f").className = "op-controls__progress op-control__".concat(progress_classPrivateFieldGet(this, _Progress_position, "f"));
      progress_classPrivateFieldGet(this, _Progress_progress, "f").tabIndex = 0;

      progress_classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-label', progress_classPrivateFieldGet(this, _Progress_labels, "f").progressSlider);

      progress_classPrivateFieldGet(this, _Progress_progress, "f").setAttribute('aria-valuemin', '0');

      progress_classPrivateFieldSet(this, _Progress_slider, document.createElement('input'), "f");

      progress_classPrivateFieldGet(this, _Progress_slider, "f").type = 'range';
      progress_classPrivateFieldGet(this, _Progress_slider, "f").className = 'op-controls__progress--seek';
      progress_classPrivateFieldGet(this, _Progress_slider, "f").tabIndex = -1;

      progress_classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('min', '0');

      progress_classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('max', '0');

      progress_classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('step', '0.1');

      progress_classPrivateFieldGet(this, _Progress_slider, "f").value = '0';

      progress_classPrivateFieldGet(this, _Progress_slider, "f").setAttribute('aria-label', progress_classPrivateFieldGet(this, _Progress_labels, "f").progressRail);

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
        } else if (!progress_classPrivateFieldGet(_this, _Progress_player, "f").getOptions().live.showProgress) {
          progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-hidden', 'true');
        }
      };

      var lastCurrentTime = 0;
      var defaultDuration = progress_classPrivateFieldGet(this, _Progress_player, "f").getOptions().progress.duration || 0;
      var isAudioEl = isAudio(progress_classPrivateFieldGet(this, _Progress_player, "f").getElement());
      progress_classPrivateFieldGet(this, _Progress_events, "f").media.loadedmetadata = setInitialProgress.bind(this);
      progress_classPrivateFieldGet(this, _Progress_events, "f").controls.controlschanged = setInitialProgress.bind(this);

      progress_classPrivateFieldGet(this, _Progress_events, "f").media.progress = function (e) {
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
        } else if (!progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled') && progress_classPrivateFieldGet(_this, _Progress_progress, "f").getAttribute('aria-hidden') === 'false' && !progress_classPrivateFieldGet(_this, _Progress_player, "f").getOptions().live.showProgress) {
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
          progress_classPrivateFieldGet(_this, _Progress_played, "f").value = el.duration <= 0 || isNaN(el.duration) || !isFinite(el.duration) ? defaultDuration : current / el.duration * 100;

          if (progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled') && Math.floor(progress_classPrivateFieldGet(_this, _Progress_played, "f").value) >= 99) {
            lastCurrentTime = el.currentTime;

            progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-hidden', 'false');
          }
        } else if (!progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled') && progress_classPrivateFieldGet(_this, _Progress_progress, "f").getAttribute('aria-hidden') === 'false' && !progress_classPrivateFieldGet(_this, _Progress_player, "f").getOptions().live.showProgress) {
          progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-hidden', 'true');
        }
      };

      progress_classPrivateFieldGet(this, _Progress_events, "f").media.durationchange = function () {
        var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

        var current = progress_classPrivateFieldGet(_this, _Progress_player, "f").isMedia() ? el.currentTime : el.duration - el.currentTime;

        progress_classPrivateFieldGet(_this, _Progress_slider, "f").setAttribute('max', "".concat(el.duration));

        progress_classPrivateFieldGet(_this, _Progress_progress, "f").setAttribute('aria-valuemax', el.duration.toString());

        progress_classPrivateFieldGet(_this, _Progress_played, "f").value = el.duration <= 0 || isNaN(el.duration) || !isFinite(el.duration) ? defaultDuration : current / el.duration * 100;
      };

      progress_classPrivateFieldGet(this, _Progress_events, "f").media.ended = function () {
        progress_classPrivateFieldGet(_this, _Progress_slider, "f").style.backgroundSize = '0% 100%';

        progress_classPrivateFieldGet(_this, _Progress_slider, "f").setAttribute('max', '0');

        progress_classPrivateFieldGet(_this, _Progress_buffer, "f").value = 0;
        progress_classPrivateFieldGet(_this, _Progress_played, "f").value = 0;
      };

      var updateSlider = function updateSlider(e) {
        if (hasClass(progress_classPrivateFieldGet(_this, _Progress_slider, "f"), 'op-progress--pressed')) {
          return;
        }

        var target = e.target;

        progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.add('.op-progress--pressed');

        var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

        var min = parseFloat(target.min);
        var max = parseFloat(target.max);
        var val = parseFloat(target.value);
        progress_classPrivateFieldGet(_this, _Progress_slider, "f").style.backgroundSize = "".concat((val - min) * 100 / (max - min), "% 100%");
        progress_classPrivateFieldGet(_this, _Progress_played, "f").value = el.duration <= 0 || isNaN(el.duration) || !isFinite(el.duration) ? defaultDuration : val / el.duration * 100;

        if (progress_classPrivateFieldGet(_this, _Progress_player, "f").getElement().getAttribute('op-dvr__enabled')) {
          el.currentTime = Math.round(progress_classPrivateFieldGet(_this, _Progress_played, "f").value) >= 99 ? lastCurrentTime : val;
        } else {
          el.currentTime = val;
        }

        progress_classPrivateFieldGet(_this, _Progress_slider, "f").classList.remove('.op-progress--pressed');
      };

      var forcePause = function forcePause(e) {
        var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

        if ((e.which === 1 || e.which === 0) && progress_classPrivateFieldGet(_this, _Progress_player, "f").isMedia()) {
          if (!el.paused) {
            el.pause();

            progress_classPrivateFieldSet(_this, _Progress_forcePause, true, "f");
          }
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
        var el = progress_classPrivateFieldGet(_this, _Progress_player, "f").activeElement();

        if (el.duration !== Infinity) {
          var changedTouches = e.originalEvent ? e.originalEvent.changedTouches : e.changedTouches;
          var x = changedTouches ? changedTouches[0].pageX : e.pageX;
          var pos = x - offset(progress_classPrivateFieldGet(_this, _Progress_progress, "f")).left;

          var percentage = pos / progress_classPrivateFieldGet(_this, _Progress_progress, "f").offsetWidth;

          var time = percentage * el.duration;
          progress_classPrivateFieldGet(_this, _Progress_slider, "f").value = time.toString();
          updateSlider(e);
          forcePause(e);
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
            var x = e.originalEvent && e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.pageX;
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
            progress_classPrivateFieldGet(_this, _Progress_tooltip, "f").innerHTML = isNaN(time) ? '00:00' : formatTime(time);
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

      progress_classPrivateFieldGet(this, _Progress_player, "f").getContainer().addEventListener('keydown', this._keydownEvent, EVENT_OPTIONS);

      progress_classPrivateFieldGet(this, _Progress_player, "f").getControls().getContainer().addEventListener('controlschanged', progress_classPrivateFieldGet(this, _Progress_events, "f").controls.controlschanged, EVENT_OPTIONS);

      progress_classPrivateFieldGet(this, _Progress_player, "f").getControls().getLayer(progress_classPrivateFieldGet(this, _Progress_layer, "f")).appendChild(progress_classPrivateFieldGet(this, _Progress_progress, "f"));
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

      progress_classPrivateFieldGet(this, _Progress_player, "f").getContainer().removeEventListener('keydown', this._keydownEvent);

      progress_classPrivateFieldGet(this, _Progress_player, "f").getControls().getContainer().removeEventListener('controlschanged', progress_classPrivateFieldGet(this, _Progress_events, "f").controls.controlschanged);

      removeElement(progress_classPrivateFieldGet(this, _Progress_buffer, "f"));
      removeElement(progress_classPrivateFieldGet(this, _Progress_played, "f"));
      removeElement(progress_classPrivateFieldGet(this, _Progress_slider, "f"));

      if (!IS_IOS && !IS_ANDROID) {
        removeElement(progress_classPrivateFieldGet(this, _Progress_tooltip, "f"));
      }

      removeElement(progress_classPrivateFieldGet(this, _Progress_progress, "f"));
    }
  }, {
    key: "_keydownEvent",
    value: function _keydownEvent(e) {
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

_Progress_player = new WeakMap(), _Progress_progress = new WeakMap(), _Progress_slider = new WeakMap(), _Progress_buffer = new WeakMap(), _Progress_played = new WeakMap(), _Progress_tooltip = new WeakMap(), _Progress_events = new WeakMap(), _Progress_forcePause = new WeakMap(), _Progress_labels = new WeakMap(), _Progress_position = new WeakMap(), _Progress_layer = new WeakMap();
/* harmony default export */ var progress = (progress_Progress);
// CONCATENATED MODULE: ./src/js/controls/settings.ts




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

var _Settings_player, _Settings_submenu, _Settings_button, _Settings_menu, _Settings_events, _Settings_originalOutput, _Settings_labels, _Settings_position, _Settings_layer;




var settings_Settings = function () {
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

    _Settings_labels.set(this, void 0);

    _Settings_position.set(this, void 0);

    _Settings_layer.set(this, void 0);

    settings_classPrivateFieldSet(this, _Settings_player, player, "f");

    settings_classPrivateFieldSet(this, _Settings_labels, player.getOptions().labels, "f");

    settings_classPrivateFieldSet(this, _Settings_position, position, "f");

    settings_classPrivateFieldSet(this, _Settings_layer, layer, "f");

    this._keydownEvent = this._keydownEvent.bind(this);
    return this;
  }

  createClass_default()(Settings, [{
    key: "create",
    value: function create() {
      var _this = this;

      settings_classPrivateFieldSet(this, _Settings_button, document.createElement('button'), "f");

      settings_classPrivateFieldGet(this, _Settings_button, "f").className = "op-controls__settings op-control__".concat(settings_classPrivateFieldGet(this, _Settings_position, "f"));
      settings_classPrivateFieldGet(this, _Settings_button, "f").tabIndex = 0;
      settings_classPrivateFieldGet(this, _Settings_button, "f").title = settings_classPrivateFieldGet(this, _Settings_labels, "f").settings;

      settings_classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-controls', settings_classPrivateFieldGet(this, _Settings_player, "f").id);

      settings_classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-pressed', 'false');

      settings_classPrivateFieldGet(this, _Settings_button, "f").setAttribute('aria-label', settings_classPrivateFieldGet(this, _Settings_labels, "f").settings);

      settings_classPrivateFieldGet(this, _Settings_button, "f").innerHTML = "<span class=\"op-sr\">".concat(settings_classPrivateFieldGet(this, _Settings_labels, "f").settings, "</span>");

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

      settings_classPrivateFieldGet(this, _Settings_events, "f").media.controlshidden = this.hideEvent.bind(this);
      settings_classPrivateFieldGet(this, _Settings_events, "f").media.settingremoved = this.removeEvent.bind(this);
      settings_classPrivateFieldGet(this, _Settings_events, "f").media.play = this.hideEvent.bind(this);
      settings_classPrivateFieldGet(this, _Settings_events, "f").media.pause = this.hideEvent.bind(this);

      settings_classPrivateFieldGet(this, _Settings_player, "f").getContainer().addEventListener('keydown', this._keydownEvent, EVENT_OPTIONS);

      this.clickEvent = this.clickEvent.bind(this);
      this.hideEvent = this.hideEvent.bind(this);

      settings_classPrivateFieldGet(this, _Settings_events, "f").global.click = function (e) {
        if (e.target.closest("#".concat(settings_classPrivateFieldGet(_this, _Settings_player, "f").id)) && hasClass(e.target, 'op-speed__option')) {
          settings_classPrivateFieldGet(_this, _Settings_player, "f").getMedia().playbackRate = parseFloat(e.target.getAttribute('data-value').replace('speed-', ''));
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

      settings_classPrivateFieldGet(this, _Settings_player, "f").getControls().getLayer(settings_classPrivateFieldGet(this, _Settings_layer, "f")).appendChild(settings_classPrivateFieldGet(this, _Settings_button, "f"));

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

      settings_classPrivateFieldGet(this, _Settings_player, "f").getContainer().removeEventListener('keydown', this._keydownEvent);

      removeElement(settings_classPrivateFieldGet(this, _Settings_menu, "f"));
      removeElement(settings_classPrivateFieldGet(this, _Settings_button, "f"));
    }
  }, {
    key: "addSettings",
    value: function addSettings() {
      var media = settings_classPrivateFieldGet(this, _Settings_player, "f").getMedia();

      var rate = 1;

      if (settings_classPrivateFieldGet(this, _Settings_player, "f") && media) {
        rate = media.defaultPlaybackRate !== media.playbackRate ? media.playbackRate : media.defaultPlaybackRate;
      }

      return {
        className: 'op-speed__option',
        "default": rate.toString(),
        key: 'speed',
        name: settings_classPrivateFieldGet(this, _Settings_labels, "f").speed,
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
          label: settings_classPrivateFieldGet(this, _Settings_labels, "f").speedNormal
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

      var menuItem = document.createElement('div');
      menuItem.className = 'op-settings__menu-item';
      menuItem.tabIndex = 0;
      menuItem.setAttribute('role', 'menuitemradio');
      menuItem.innerHTML = "<div class=\"op-settings__menu-label\" data-value=\"".concat(key, "-").concat(defaultValue, "\">").concat(name, "</div>");
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
          if (hasClass(target, 'op-settings__back')) {
            settings_classPrivateFieldGet(_this3, _Settings_menu, "f").classList.add('op-settings--sliding');

            setTimeout(function () {
              settings_classPrivateFieldGet(_this3, _Settings_menu, "f").innerHTML = settings_classPrivateFieldGet(_this3, _Settings_originalOutput, "f");

              settings_classPrivateFieldGet(_this3, _Settings_menu, "f").classList.remove('op-settings--sliding');
            }, 100);
          } else if (hasClass(target, 'op-settings__menu-content')) {
            var labelEl = target.parentElement ? target.parentElement.querySelector('.op-settings__menu-label') : null;
            var label = labelEl ? labelEl.getAttribute('data-value') : null;
            var fragments = label ? label.split('-') : [];

            if (fragments.length > 0) {
              fragments.pop();
              var current = fragments.join('-').replace(/^\-|\-$/, '');

              if (typeof_default()(settings_classPrivateFieldGet(_this3, _Settings_submenu, "f")[current]) !== undefined) {
                settings_classPrivateFieldGet(_this3, _Settings_menu, "f").classList.add('op-settings--sliding');

                setTimeout(function () {
                  settings_classPrivateFieldGet(_this3, _Settings_menu, "f").innerHTML = settings_classPrivateFieldGet(_this3, _Settings_submenu, "f")[current];

                  settings_classPrivateFieldGet(_this3, _Settings_menu, "f").classList.remove('op-settings--sliding');
                }, 100);
              }
            }
          } else if (hasClass(target, 'op-settings__submenu-label')) {
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
                    prev.nextElementSibling.innerHTML = _label;
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
        removeElement(target);
      }

      if (settings_classPrivateFieldGet(this, _Settings_player, "f").getElement().querySelectorAll(".op-settings__submenu-label[data-value^=".concat(type, "]")).length < minItems) {
        delete settings_classPrivateFieldGet(this, _Settings_submenu, "f")[type];

        var label = settings_classPrivateFieldGet(this, _Settings_player, "f").getElement().querySelector(".op-settings__menu-label[data-value^=".concat(type, "]"));

        var menuItem = label ? label.closest('.op-settings__menu-item') : null;

        if (menuItem) {
          removeElement(menuItem);
        }
      }
    }
  }, {
    key: "_keydownEvent",
    value: function _keydownEvent(e) {
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

_Settings_player = new WeakMap(), _Settings_submenu = new WeakMap(), _Settings_button = new WeakMap(), _Settings_menu = new WeakMap(), _Settings_events = new WeakMap(), _Settings_originalOutput = new WeakMap(), _Settings_labels = new WeakMap(), _Settings_position = new WeakMap(), _Settings_layer = new WeakMap();
/* harmony default export */ var settings = (settings_Settings);
// CONCATENATED MODULE: ./src/js/controls/time.ts



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

var _Time_player, _Time_current, _Time_delimiter, _Time_duration, _Time_container, _Time_events, _Time_labels, _Time_position, _Time_layer;





var time_Time = function () {
  function Time(player, position, layer) {
    classCallCheck_default()(this, Time);

    _Time_player.set(this, void 0);

    _Time_current.set(this, void 0);

    _Time_delimiter.set(this, void 0);

    _Time_duration.set(this, void 0);

    _Time_container.set(this, void 0);

    _Time_events.set(this, {
      controls: {},
      media: {}
    });

    _Time_labels.set(this, void 0);

    _Time_position.set(this, void 0);

    _Time_layer.set(this, void 0);

    time_classPrivateFieldSet(this, _Time_player, player, "f");

    time_classPrivateFieldSet(this, _Time_labels, player.getOptions().labels, "f");

    time_classPrivateFieldSet(this, _Time_position, position, "f");

    time_classPrivateFieldSet(this, _Time_layer, layer, "f");

    return this;
  }

  createClass_default()(Time, [{
    key: "create",
    value: function create() {
      var _this = this;

      time_classPrivateFieldSet(this, _Time_current, document.createElement('time'), "f");

      time_classPrivateFieldGet(this, _Time_current, "f").className = 'op-controls__current';

      time_classPrivateFieldGet(this, _Time_current, "f").setAttribute('role', 'timer');

      time_classPrivateFieldGet(this, _Time_current, "f").setAttribute('aria-live', 'off');

      time_classPrivateFieldGet(this, _Time_current, "f").setAttribute('aria-hidden', 'false');

      time_classPrivateFieldGet(this, _Time_current, "f").innerText = '0:00';

      var showOnlyCurrent = time_classPrivateFieldGet(this, _Time_player, "f").getOptions().progress.showCurrentTimeOnly;

      if (!showOnlyCurrent) {
        time_classPrivateFieldSet(this, _Time_delimiter, document.createElement('span'), "f");

        time_classPrivateFieldGet(this, _Time_delimiter, "f").className = 'op-controls__time-delimiter';

        time_classPrivateFieldGet(this, _Time_delimiter, "f").setAttribute('aria-hidden', 'false');

        time_classPrivateFieldGet(this, _Time_delimiter, "f").innerText = '/';

        time_classPrivateFieldSet(this, _Time_duration, document.createElement('time'), "f");

        time_classPrivateFieldGet(this, _Time_duration, "f").className = 'op-controls__duration';

        time_classPrivateFieldGet(this, _Time_duration, "f").setAttribute('aria-hidden', 'false');

        time_classPrivateFieldGet(this, _Time_duration, "f").innerText = formatTime(time_classPrivateFieldGet(this, _Time_player, "f").getOptions().progress.duration);
      }

      var controls = time_classPrivateFieldGet(this, _Time_player, "f").getControls().getLayer(time_classPrivateFieldGet(this, _Time_layer, "f"));

      time_classPrivateFieldSet(this, _Time_container, document.createElement('span'), "f");

      time_classPrivateFieldGet(this, _Time_container, "f").className = "op-controls-time op-control__".concat(time_classPrivateFieldGet(this, _Time_position, "f"));

      time_classPrivateFieldGet(this, _Time_container, "f").appendChild(time_classPrivateFieldGet(this, _Time_current, "f"));

      if (!showOnlyCurrent) {
        time_classPrivateFieldGet(this, _Time_container, "f").appendChild(time_classPrivateFieldGet(this, _Time_delimiter, "f"));

        time_classPrivateFieldGet(this, _Time_container, "f").appendChild(time_classPrivateFieldGet(this, _Time_duration, "f"));
      }

      controls.appendChild(time_classPrivateFieldGet(this, _Time_container, "f"));

      var setInitialTime = function setInitialTime() {
        var el = time_classPrivateFieldGet(_this, _Time_player, "f").activeElement();

        if (el.duration !== Infinity && !time_classPrivateFieldGet(_this, _Time_player, "f").getElement().getAttribute('op-live__enabled')) {
          if (!showOnlyCurrent) {
            var duration = !isNaN(el.duration) ? el.duration : time_classPrivateFieldGet(_this, _Time_player, "f").getOptions().progress.duration;
            time_classPrivateFieldGet(_this, _Time_duration, "f").innerText = formatTime(duration);
          }

          time_classPrivateFieldGet(_this, _Time_current, "f").innerText = formatTime(el.currentTime);
        } else if (!showOnlyCurrent) {
          time_classPrivateFieldGet(_this, _Time_duration, "f").setAttribute('aria-hidden', 'true');

          time_classPrivateFieldGet(_this, _Time_delimiter, "f").setAttribute('aria-hidden', 'true');
        }
      };

      time_classPrivateFieldGet(this, _Time_events, "f").media.loadedmetadata = setInitialTime.bind(this);
      time_classPrivateFieldGet(this, _Time_events, "f").controls.controlschanged = setInitialTime.bind(this);

      var showLiveLabel = time_classPrivateFieldGet(this, _Time_player, "f").getOptions().live.showLabel;

      time_classPrivateFieldGet(this, _Time_events, "f").media.timeupdate = function () {
        var el = time_classPrivateFieldGet(_this, _Time_player, "f").activeElement();

        if (el.duration !== Infinity && !time_classPrivateFieldGet(_this, _Time_player, "f").getElement().getAttribute('op-live__enabled') && !time_classPrivateFieldGet(_this, _Time_player, "f").getElement().getAttribute('op-dvr__enabled')) {
          var duration = formatTime(el.duration);

          if (!showOnlyCurrent && !isNaN(el.duration) && duration !== time_classPrivateFieldGet(_this, _Time_duration, "f").innerText) {
            time_classPrivateFieldGet(_this, _Time_duration, "f").innerText = duration;

            time_classPrivateFieldGet(_this, _Time_duration, "f").setAttribute('aria-hidden', 'false');

            time_classPrivateFieldGet(_this, _Time_delimiter, "f").setAttribute('aria-hidden', 'false');
          } else if (showOnlyCurrent || duration !== time_classPrivateFieldGet(_this, _Time_duration, "f").innerText) {
            time_classPrivateFieldGet(_this, _Time_current, "f").innerText = showLiveLabel ? time_classPrivateFieldGet(_this, _Time_labels, "f").live : formatTime(el.currentTime);
          }

          time_classPrivateFieldGet(_this, _Time_current, "f").innerText = formatTime(el.currentTime);
        } else if (time_classPrivateFieldGet(_this, _Time_player, "f").getElement().getAttribute('op-dvr__enabled')) {
          if (!showOnlyCurrent) {
            time_classPrivateFieldGet(_this, _Time_duration, "f").setAttribute('aria-hidden', 'true');

            time_classPrivateFieldGet(_this, _Time_delimiter, "f").setAttribute('aria-hidden', 'true');
          }

          time_classPrivateFieldGet(_this, _Time_current, "f").innerText = formatTime(el.currentTime);
        } else if (showOnlyCurrent || !time_classPrivateFieldGet(_this, _Time_player, "f").getElement().getAttribute('op-dvr__enabled') && time_classPrivateFieldGet(_this, _Time_duration, "f").getAttribute('aria-hidden') === 'false') {
          if (!showOnlyCurrent) {
            time_classPrivateFieldGet(_this, _Time_duration, "f").setAttribute('aria-hidden', 'true');

            time_classPrivateFieldGet(_this, _Time_delimiter, "f").setAttribute('aria-hidden', 'true');
          }

          time_classPrivateFieldGet(_this, _Time_current, "f").innerText = showLiveLabel ? time_classPrivateFieldGet(_this, _Time_labels, "f").live : formatTime(el.currentTime);
        } else {
          time_classPrivateFieldGet(_this, _Time_current, "f").innerText = showLiveLabel ? time_classPrivateFieldGet(_this, _Time_labels, "f").live : formatTime(el.currentTime);
        }
      };

      time_classPrivateFieldGet(this, _Time_events, "f").media.ended = function () {
        var el = time_classPrivateFieldGet(_this, _Time_player, "f").activeElement();

        var duration = !isNaN(el.duration) ? el.duration : time_classPrivateFieldGet(_this, _Time_player, "f").getOptions().progress.duration;

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

      removeElement(time_classPrivateFieldGet(this, _Time_current, "f"));

      if (!time_classPrivateFieldGet(this, _Time_player, "f").getOptions().progress.showCurrentTimeOnly) {
        removeElement(time_classPrivateFieldGet(this, _Time_delimiter, "f"));
        removeElement(time_classPrivateFieldGet(this, _Time_duration, "f"));
      }

      removeElement(time_classPrivateFieldGet(this, _Time_container, "f"));
    }
  }]);

  return Time;
}();

_Time_player = new WeakMap(), _Time_current = new WeakMap(), _Time_delimiter = new WeakMap(), _Time_duration = new WeakMap(), _Time_container = new WeakMap(), _Time_events = new WeakMap(), _Time_labels = new WeakMap(), _Time_position = new WeakMap(), _Time_layer = new WeakMap();
/* harmony default export */ var controls_time = (time_Time);
// CONCATENATED MODULE: ./src/js/controls/volume.ts



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

var _Volume_player, _Volume_button, _Volume_container, _Volume_display, _Volume_slider, _Volume_events, _Volume_volume, _Volume_labels, _Volume_position, _Volume_layer;





var volume_Volume = function () {
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

    _Volume_labels.set(this, void 0);

    _Volume_position.set(this, void 0);

    _Volume_layer.set(this, void 0);

    volume_classPrivateFieldSet(this, _Volume_player, player, "f");

    volume_classPrivateFieldSet(this, _Volume_labels, player.getOptions().labels, "f");

    volume_classPrivateFieldSet(this, _Volume_volume, volume_classPrivateFieldGet(this, _Volume_player, "f").getMedia().volume, "f");

    volume_classPrivateFieldSet(this, _Volume_position, position, "f");

    volume_classPrivateFieldSet(this, _Volume_layer, layer, "f");

    this._keydownEvent = this._keydownEvent.bind(this);
    return this;
  }

  createClass_default()(Volume, [{
    key: "create",
    value: function create() {
      var _this = this;

      volume_classPrivateFieldSet(this, _Volume_container, document.createElement('div'), "f");

      volume_classPrivateFieldGet(this, _Volume_container, "f").className = "op-controls__volume op-control__".concat(volume_classPrivateFieldGet(this, _Volume_position, "f"));
      volume_classPrivateFieldGet(this, _Volume_container, "f").tabIndex = 0;

      volume_classPrivateFieldGet(this, _Volume_container, "f").setAttribute('aria-valuemin', '0');

      volume_classPrivateFieldGet(this, _Volume_container, "f").setAttribute('aria-valuemax', '100');

      volume_classPrivateFieldGet(this, _Volume_container, "f").setAttribute('aria-valuenow', "".concat(volume_classPrivateFieldGet(this, _Volume_volume, "f")));

      volume_classPrivateFieldGet(this, _Volume_container, "f").setAttribute('aria-valuetext', "".concat(volume_classPrivateFieldGet(this, _Volume_labels, "f").volume, ": ").concat(volume_classPrivateFieldGet(this, _Volume_volume, "f")));

      volume_classPrivateFieldGet(this, _Volume_container, "f").setAttribute('aria-orientation', 'vertical');

      volume_classPrivateFieldGet(this, _Volume_container, "f").setAttribute('aria-label', volume_classPrivateFieldGet(this, _Volume_labels, "f").volumeSlider);

      volume_classPrivateFieldSet(this, _Volume_slider, document.createElement('input'), "f");

      volume_classPrivateFieldGet(this, _Volume_slider, "f").type = 'range';
      volume_classPrivateFieldGet(this, _Volume_slider, "f").className = 'op-controls__volume--input';
      volume_classPrivateFieldGet(this, _Volume_slider, "f").tabIndex = -1;
      volume_classPrivateFieldGet(this, _Volume_slider, "f").value = volume_classPrivateFieldGet(this, _Volume_player, "f").getMedia().volume.toString();

      volume_classPrivateFieldGet(this, _Volume_slider, "f").setAttribute('min', '0');

      volume_classPrivateFieldGet(this, _Volume_slider, "f").setAttribute('max', '1');

      volume_classPrivateFieldGet(this, _Volume_slider, "f").setAttribute('step', '0.1');

      volume_classPrivateFieldGet(this, _Volume_slider, "f").setAttribute('aria-label', volume_classPrivateFieldGet(this, _Volume_labels, "f").volumeControl);

      volume_classPrivateFieldSet(this, _Volume_display, document.createElement('progress'), "f");

      volume_classPrivateFieldGet(this, _Volume_display, "f").className = 'op-controls__volume--display';

      volume_classPrivateFieldGet(this, _Volume_display, "f").setAttribute('max', '10');

      volume_classPrivateFieldGet(this, _Volume_display, "f").setAttribute('role', 'presentation');

      volume_classPrivateFieldGet(this, _Volume_display, "f").value = volume_classPrivateFieldGet(this, _Volume_player, "f").getMedia().volume * 10;

      volume_classPrivateFieldGet(this, _Volume_container, "f").appendChild(volume_classPrivateFieldGet(this, _Volume_slider, "f"));

      volume_classPrivateFieldGet(this, _Volume_container, "f").appendChild(volume_classPrivateFieldGet(this, _Volume_display, "f"));

      volume_classPrivateFieldSet(this, _Volume_button, document.createElement('button'), "f");

      volume_classPrivateFieldGet(this, _Volume_button, "f").type = 'button';
      volume_classPrivateFieldGet(this, _Volume_button, "f").className = "op-controls__mute op-control__".concat(volume_classPrivateFieldGet(this, _Volume_position, "f"));
      volume_classPrivateFieldGet(this, _Volume_button, "f").tabIndex = 0;
      volume_classPrivateFieldGet(this, _Volume_button, "f").title = volume_classPrivateFieldGet(this, _Volume_labels, "f").mute;

      volume_classPrivateFieldGet(this, _Volume_button, "f").setAttribute('aria-controls', volume_classPrivateFieldGet(this, _Volume_player, "f").id);

      volume_classPrivateFieldGet(this, _Volume_button, "f").setAttribute('aria-pressed', 'false');

      volume_classPrivateFieldGet(this, _Volume_button, "f").setAttribute('aria-label', volume_classPrivateFieldGet(this, _Volume_labels, "f").mute);

      volume_classPrivateFieldGet(this, _Volume_button, "f").innerHTML = "<span class=\"op-sr\">".concat(volume_classPrivateFieldGet(this, _Volume_labels, "f").mute, "</span>");

      var updateSlider = function updateSlider(element) {
        var mediaVolume = element.volume * 1;
        var vol = Math.floor(mediaVolume * 100);
        volume_classPrivateFieldGet(_this, _Volume_slider, "f").value = "".concat(element.volume);
        volume_classPrivateFieldGet(_this, _Volume_display, "f").value = mediaVolume * 10;

        volume_classPrivateFieldGet(_this, _Volume_container, "f").setAttribute('aria-valuenow', "".concat(vol));

        volume_classPrivateFieldGet(_this, _Volume_container, "f").setAttribute('aria-valuetext', "".concat(volume_classPrivateFieldGet(_this, _Volume_labels, "f").volume, ": ").concat(vol));
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
          removeElement(unmuteEl);
        }

        var e = addEvent('volumechange');

        volume_classPrivateFieldGet(_this, _Volume_player, "f").getElement().dispatchEvent(e);
      };

      volume_classPrivateFieldGet(this, _Volume_events, "f").media.volumechange = function () {
        var el = volume_classPrivateFieldGet(_this, _Volume_player, "f").activeElement();

        updateSlider(el);
        updateButton(el);
      };

      volume_classPrivateFieldGet(this, _Volume_events, "f").media.timeupdate = function () {
        if (isAudio(volume_classPrivateFieldGet(_this, _Volume_player, "f").getElement()) && (volume_classPrivateFieldGet(_this, _Volume_player, "f").activeElement().duration === Infinity || volume_classPrivateFieldGet(_this, _Volume_player, "f").getElement().getAttribute('op-live__enabled'))) {}
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
          volume_classPrivateFieldGet(_this, _Volume_button, "f").title = volume_classPrivateFieldGet(_this, _Volume_labels, "f").unmute;

          volume_classPrivateFieldGet(_this, _Volume_button, "f").setAttribute('aria-label', volume_classPrivateFieldGet(_this, _Volume_labels, "f").unmute);
        } else {
          el.volume = volume_classPrivateFieldGet(_this, _Volume_volume, "f");
          volume_classPrivateFieldGet(_this, _Volume_button, "f").title = volume_classPrivateFieldGet(_this, _Volume_labels, "f").mute;

          volume_classPrivateFieldGet(_this, _Volume_button, "f").setAttribute('aria-label', volume_classPrivateFieldGet(_this, _Volume_labels, "f").mute);
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

      volume_classPrivateFieldGet(this, _Volume_player, "f").getContainer().addEventListener('keydown', this._keydownEvent, EVENT_OPTIONS);

      if (!IS_ANDROID && !IS_IOS) {
        var controls = volume_classPrivateFieldGet(this, _Volume_player, "f").getControls().getLayer(volume_classPrivateFieldGet(this, _Volume_layer, "f"));

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

      volume_classPrivateFieldGet(this, _Volume_player, "f").getContainer().removeEventListener('keydown', this._keydownEvent);

      removeElement(volume_classPrivateFieldGet(this, _Volume_slider, "f"));
      removeElement(volume_classPrivateFieldGet(this, _Volume_display, "f"));
      removeElement(volume_classPrivateFieldGet(this, _Volume_container, "f"));
    }
  }, {
    key: "_keydownEvent",
    value: function _keydownEvent(e) {
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

_Volume_player = new WeakMap(), _Volume_button = new WeakMap(), _Volume_container = new WeakMap(), _Volume_display = new WeakMap(), _Volume_slider = new WeakMap(), _Volume_events = new WeakMap(), _Volume_volume = new WeakMap(), _Volume_labels = new WeakMap(), _Volume_position = new WeakMap(), _Volume_layer = new WeakMap();
/* harmony default export */ var volume = (volume_Volume);
// CONCATENATED MODULE: ./src/js/controls.ts




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













var controls_Controls = function () {
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
      Captions: controls_captions,
      Fullscreen: fullscreen,
      Levels: controls_levels,
      Play: controls_play,
      Progress: progress,
      Settings: settings,
      Time: controls_time,
      Volume: volume
    });

    controls_classPrivateFieldSet(this, _Controls_player, player, "f");

    this._setElements();

    return this;
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

      var alwaysVisible = controls_classPrivateFieldGet(this, _Controls_player, "f").getOptions().controls.alwaysVisible;

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
            _this._startControlTimer(controls_classPrivateFieldGet(_this, _Controls_player, "f").getOptions().hidePlayBtnTimer);
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
            _this2._destroyCustomControl(item);
          } else if (typeof item.destroy === 'function') {
            item.destroy();
          }
        });
      });
      removeElement(controls_classPrivateFieldGet(this, _Controls_controls, "f"));
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

      var controls = controls_classPrivateFieldGet(this, _Controls_player, "f").getOptions().controls.layers;

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

        controls[position].filter(function (v, i, a) {
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
            _this5._createCustomControl(item);
          } else {
            item.create();
          }
        });
      });
      Object.keys(controls_classPrivateFieldGet(this, _Controls_items, "f")).forEach(function (position) {
        controls_classPrivateFieldGet(_this5, _Controls_items, "f")[position].forEach(function (item) {
          var allowDefault = !controls_classPrivateFieldGet(_this5, _Controls_player, "f").getOptions().detachMenus || item instanceof settings;

          if (allowDefault && !item.custom && typeof item.addSettings === 'function') {
            var menuItem = item.addSettings();

            if (controls_classPrivateFieldGet(_this5, _Controls_settings, "f") && Object.keys(menuItem).length) {
              controls_classPrivateFieldGet(_this5, _Controls_settings, "f").addItem(menuItem.name, menuItem.key, menuItem["default"], menuItem.subitems, menuItem.className);
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
    key: "_createCustomControl",
    value: function _createCustomControl(item) {
      var _this6 = this;

      var control = document.createElement('button');
      var icon = /\.(jpg|png|svg|gif)$/.test(item.icon) ? "<img src=\"".concat(item.icon, "\">") : item.icon;
      control.className = "op-controls__".concat(item.id, " op-control__").concat(item.position, " ").concat(item.showInAds ? '' : 'op-control__hide-in-ad');
      control.tabIndex = 0;
      control.id = item.id;
      control.title = item.title;
      control.innerHTML = item.content || "".concat(icon, " <span class=\"op-sr\">").concat(item.title, "</span>");

      if (item.subitems && Array.isArray(item.subitems) && item.subitems.length > 0) {
        var menu = document.createElement('div');
        menu.className = 'op-settings op-settings__custom';
        menu.id = "".concat(item.id, "-menu");
        menu.setAttribute('aria-hidden', 'true');
        var items = item.subitems.map(function (s) {
          var itemIcon = '';

          if (s.icon) {
            itemIcon = /\.(jpg|png|svg|gif)$/.test(s.icon) ? "<img src=\"".concat(s.icon, "\">") : s.icon;
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
        control.addEventListener('click', function (e) {
          return _this6._toggleCustomMenu(e, menu, item);
        }, EVENT_OPTIONS);

        controls_classPrivateFieldGet(this, _Controls_player, "f").getElement().addEventListener('controlshidden', function () {
          return _this6._hideCustomMenu(menu);
        }, EVENT_OPTIONS);
      } else if (item.click && typeof item.click === 'function') {
        control.addEventListener('click', item.click, EVENT_OPTIONS);
      }

      if (item.mouseenter && typeof item.mouseenter === 'function') {
        control.addEventListener('mouseenter', item.mouseenter, EVENT_OPTIONS);
      }

      if (item.mouseleave && typeof item.mouseleave === 'function') {
        control.addEventListener('mouseenter', item.mouseleave, EVENT_OPTIONS);
      }

      if (item.keydown && typeof item.keydown === 'function') {
        control.addEventListener('keydown', item.keydown, EVENT_OPTIONS);
      }

      if (item.blur && typeof item.blur === 'function') {
        control.addEventListener('blur', item.blur, EVENT_OPTIONS);
      }

      if (item.focus && typeof item.focus === 'function') {
        control.addEventListener('focus', item.focus, EVENT_OPTIONS);
      }

      if (item.layer) {
        if (item.layer === 'main') {
          controls_classPrivateFieldGet(this, _Controls_player, "f").getContainer().appendChild(control);
        } else {
          this.getLayer(item.layer).appendChild(control);
        }
      }

      if (item.init && typeof item.init === 'function') {
        item.init(controls_classPrivateFieldGet(this, _Controls_player, "f"));
      }
    }
  }, {
    key: "_destroyCustomControl",
    value: function _destroyCustomControl(item) {
      var _this7 = this;

      var key = item.title.toLowerCase().replace(' ', '-');
      var control = this.getContainer().querySelector(".op-controls__".concat(key));

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

            removeElement(menu);
          }
        }

        if (item.click && typeof item.click === 'function') {
          control.removeEventListener('click', item.click);
        }

        if (item.mouseenter && typeof item.mouseenter === 'function') {
          control.removeEventListener('mouseenter', item.mouseenter);
        }

        if (item.mouseleave && typeof item.mouseleave === 'function') {
          control.removeEventListener('mouseenter', item.mouseleave);
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

        removeElement(control);

        if (item.destroy && typeof item.destroy === 'function') {
          item.destroy(controls_classPrivateFieldGet(this, _Controls_player, "f"));
        }
      }
    }
  }]);

  return Controls;
}();

_Controls_settings = new WeakMap(), _Controls_timer = new WeakMap(), _Controls_controls = new WeakMap(), _Controls_player = new WeakMap(), _Controls_items = new WeakMap(), _Controls_controlEls = new WeakMap();
/* harmony default export */ var js_controls = (controls_Controls);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(0);
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(17);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(8);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(9);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// CONCATENATED MODULE: ./src/js/media/native.ts



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

var native_Native = function () {
  function Native(element, media) {
    classCallCheck_default()(this, Native);

    _Native_customPlayer.set(this, void 0);

    this.element = element;
    this.media = media;
    this.promise = new Promise(function (resolve) {
      resolve({});
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
/* harmony default export */ var media_native = (native_Native);
// CONCATENATED MODULE: ./src/js/media/dash.ts








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







var dash_DashMedia = function (_Native) {
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

    _this.promise = typeof dashjs === 'undefined' ? loadScript('https://cdn.dashjs.org/latest/dash.all.min.js') : new Promise(function (resolve) {
      resolve({});
    });
    _this._assign = _this._assign.bind(assertThisInitialized_default()(_this));

    _this.promise.then(function () {
      dash_classPrivateFieldSet(assertThisInitialized_default()(_this), _DashMedia_player, dashjs.MediaPlayer().create(), "f");

      _this.instance = dash_classPrivateFieldGet(assertThisInitialized_default()(_this), _DashMedia_player, "f");
    });

    return possibleConstructorReturn_default()(_this, assertThisInitialized_default()(_this));
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
      this._revoke();
    }
  }, {
    key: "src",
    set: function set(media) {
      var _this3 = this;

      if (isDashSource(media)) {
        this._revoke();

        dash_classPrivateFieldSet(this, _DashMedia_player, dashjs.MediaPlayer().create(), "f");

        this._preparePlayer();

        dash_classPrivateFieldGet(this, _DashMedia_player, "f").attachSource(media.src);

        dash_classPrivateFieldSet(this, _DashMedia_events, dashjs.MediaPlayer.events, "f");

        Object.keys(dash_classPrivateFieldGet(this, _DashMedia_events, "f")).forEach(function (event) {
          dash_classPrivateFieldGet(_this3, _DashMedia_player, "f").on(dash_classPrivateFieldGet(_this3, _DashMedia_events, "f")[event], _this3._assign);
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
      return dash_classPrivateFieldGet(this, _DashMedia_player, "f") ? dash_classPrivateFieldGet(this, _DashMedia_player, "f").getQualityFor('video') : -1;
    },
    set: function set(level) {
      if (level === 0) {
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
    key: "_revoke",
    value: function _revoke() {
      var _this4 = this;

      if (dash_classPrivateFieldGet(this, _DashMedia_events, "f")) {
        Object.keys(dash_classPrivateFieldGet(this, _DashMedia_events, "f")).forEach(function (event) {
          dash_classPrivateFieldGet(_this4, _DashMedia_player, "f").off(dash_classPrivateFieldGet(_this4, _DashMedia_events, "f")[event], _this4._assign);
        });

        dash_classPrivateFieldSet(this, _DashMedia_events, [], "f");
      }

      dash_classPrivateFieldGet(this, _DashMedia_player, "f").reset();
    }
  }, {
    key: "_preparePlayer",
    value: function _preparePlayer() {
      if (typeof dash_classPrivateFieldGet(this, _DashMedia_player, "f").getDebug().setLogToBrowserConsole === 'undefined') {
        dash_classPrivateFieldGet(this, _DashMedia_player, "f").updateSettings({
          debug: {
            logLevel: dashjs.Debug.LOG_LEVEL_NONE
          },
          streaming: {
            fastSwitchEnabled: true,
            scheduleWhilePaused: false
          }
        });
      } else {
        dash_classPrivateFieldGet(this, _DashMedia_player, "f").getDebug().setLogToBrowserConsole(false);

        dash_classPrivateFieldGet(this, _DashMedia_player, "f").setScheduleWhilePaused(false);

        dash_classPrivateFieldGet(this, _DashMedia_player, "f").setFastSwitchEnabled(true);
      }

      dash_classPrivateFieldGet(this, _DashMedia_player, "f").initialize();

      dash_classPrivateFieldGet(this, _DashMedia_player, "f").attachView(this.element);

      dash_classPrivateFieldGet(this, _DashMedia_player, "f").setAutoPlay(false);

      if (dash_classPrivateFieldGet(this, _DashMedia_options, "f") && typeof_default()(dash_classPrivateFieldGet(this, _DashMedia_options, "f").drm) === 'object' && Object.keys(dash_classPrivateFieldGet(this, _DashMedia_options, "f").drm).length) {
        dash_classPrivateFieldGet(this, _DashMedia_player, "f").setProtectionData(dash_classPrivateFieldGet(this, _DashMedia_options, "f").drm);

        if (dash_classPrivateFieldGet(this, _DashMedia_options, "f").robustnessLevel && dash_classPrivateFieldGet(this, _DashMedia_options, "f").robustnessLevel) {
          dash_classPrivateFieldGet(this, _DashMedia_player, "f").getProtectionController().setRobustnessLevel(dash_classPrivateFieldGet(this, _DashMedia_options, "f").robustnessLevel);
        }
      }
    }
  }]);

  return DashMedia;
}(media_native);

_DashMedia_player = new WeakMap(), _DashMedia_events = new WeakMap(), _DashMedia_options = new WeakMap();
/* harmony default export */ var dash = (dash_DashMedia);
// CONCATENATED MODULE: ./src/js/media/flv.ts







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

var _FlvMedia_player, _FlvMedia_events, _FlvMedia_options;







var flv_FlvMedia = function (_Native) {
  inherits_default()(FlvMedia, _Native);

  var _super = flv_createSuper(FlvMedia);

  function FlvMedia(element, mediaSource, options) {
    var _this;

    classCallCheck_default()(this, FlvMedia);

    _this = _super.call(this, element, mediaSource);

    _FlvMedia_player.set(assertThisInitialized_default()(_this), void 0);

    _FlvMedia_events.set(assertThisInitialized_default()(_this), {});

    _FlvMedia_options.set(assertThisInitialized_default()(_this), void 0);

    flv_classPrivateFieldSet(assertThisInitialized_default()(_this), _FlvMedia_options, options, "f");

    _this.element = element;
    _this.media = mediaSource;
    _this.promise = typeof flvjs === 'undefined' ? loadScript('https://cdn.jsdelivr.net/npm/flv.js@latest/dist/flv.min.js') : new Promise(function (resolve) {
      resolve({});
    });
    _this._create = _this._create.bind(assertThisInitialized_default()(_this));

    _this.promise.then(_this._create);

    return possibleConstructorReturn_default()(_this, assertThisInitialized_default()(_this));
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
      this._revoke();
    }
  }, {
    key: "src",
    set: function set(media) {
      if (isFlvSource(media)) {
        this._revoke();

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
      return flv_classPrivateFieldGet(this, _FlvMedia_player, "f") ? flv_classPrivateFieldGet(this, _FlvMedia_player, "f").currentLevel : -1;
    },
    set: function set(level) {
      flv_classPrivateFieldGet(this, _FlvMedia_player, "f").currentLevel = level;
    }
  }, {
    key: "_create",
    value: function _create() {
      var _this4 = this;

      var _a, _b, _c, _d;

      var configs = (_a = flv_classPrivateFieldGet(this, _FlvMedia_options, "f")) === null || _a === void 0 ? void 0 : _a.configs;
      (_b = flv_classPrivateFieldGet(this, _FlvMedia_options, "f")) === null || _b === void 0 ? true : delete _b.configs;
      flvjs.LoggingControl.enableDebug = ((_c = flv_classPrivateFieldGet(this, _FlvMedia_options, "f")) === null || _c === void 0 ? void 0 : _c.debug) || false;
      flvjs.LoggingControl.enableVerbose = ((_d = flv_classPrivateFieldGet(this, _FlvMedia_options, "f")) === null || _d === void 0 ? void 0 : _d.debug) || false;
      var options = Object.assign(Object.assign({}, flv_classPrivateFieldGet(this, _FlvMedia_options, "f") || {}), {
        type: 'flv',
        url: this.media.src
      });

      flv_classPrivateFieldSet(this, _FlvMedia_player, flvjs.createPlayer(options, configs), "f");

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
  }, {
    key: "_revoke",
    value: function _revoke() {
      flv_classPrivateFieldGet(this, _FlvMedia_player, "f").destroy();

      flv_classPrivateFieldSet(this, _FlvMedia_player, null, "f");
    }
  }]);

  return FlvMedia;
}(media_native);

_FlvMedia_player = new WeakMap(), _FlvMedia_events = new WeakMap(), _FlvMedia_options = new WeakMap();
/* harmony default export */ var flv = (flv_FlvMedia);
// CONCATENATED MODULE: ./src/js/media/hls.ts







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







var hls_HlsMedia = function (_Native) {
  inherits_default()(HlsMedia, _Native);

  var _super = hls_createSuper(HlsMedia);

  function HlsMedia(element, mediaSource) {
    var _this;

    var autoplay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var options = arguments.length > 3 ? arguments[3] : undefined;

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

    _this.promise = typeof Hls === 'undefined' ? loadScript('https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js') : new Promise(function (resolve) {
      resolve({});
    });
    _this._create = _this._create.bind(assertThisInitialized_default()(_this));
    _this._revoke = _this._revoke.bind(assertThisInitialized_default()(_this));
    _this._play = _this._play.bind(assertThisInitialized_default()(_this));
    _this._pause = _this._pause.bind(assertThisInitialized_default()(_this));

    _this.promise.then(_this._create);

    return possibleConstructorReturn_default()(_this, assertThisInitialized_default()(_this));
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
      this._revoke();
    }
  }, {
    key: "src",
    set: function set(media) {
      var _this3 = this;

      if (isHlsSource(media)) {
        this._revoke();

        hls_classPrivateFieldSet(this, _HlsMedia_player, new Hls(hls_classPrivateFieldGet(this, _HlsMedia_options, "f")), "f");

        hls_classPrivateFieldGet(this, _HlsMedia_player, "f").loadSource(media.src);

        hls_classPrivateFieldGet(this, _HlsMedia_player, "f").attachMedia(this.element);

        hls_classPrivateFieldSet(this, _HlsMedia_events, Hls.Events, "f");

        Object.keys(hls_classPrivateFieldGet(this, _HlsMedia_events, "f")).forEach(function (event) {
          hls_classPrivateFieldGet(_this3, _HlsMedia_player, "f").on(hls_classPrivateFieldGet(_this3, _HlsMedia_events, "f")[event], function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return _this3._assign(hls_classPrivateFieldGet(_this3, _HlsMedia_events, "f")[event], args);
          });
        });
      }
    }
  }, {
    key: "levels",
    get: function get() {
      var _this4 = this;

      var levels = [];

      if (hls_classPrivateFieldGet(this, _HlsMedia_player, "f") && hls_classPrivateFieldGet(this, _HlsMedia_player, "f").levels && hls_classPrivateFieldGet(this, _HlsMedia_player, "f").levels.length) {
        Object.keys(hls_classPrivateFieldGet(this, _HlsMedia_player, "f").levels).forEach(function (item) {
          var _classPrivateFieldGe = hls_classPrivateFieldGet(_this4, _HlsMedia_player, "f").levels[item],
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
      return hls_classPrivateFieldGet(this, _HlsMedia_player, "f") ? hls_classPrivateFieldGet(this, _HlsMedia_player, "f").currentLevel : -1;
    },
    set: function set(level) {
      hls_classPrivateFieldGet(this, _HlsMedia_player, "f").currentLevel = level;
    }
  }, {
    key: "_create",
    value: function _create() {
      var _this5 = this;

      var autoplay = !!(this.element.preload === 'auto' || hls_classPrivateFieldGet(this, _HlsMedia_autoplay, "f"));
      hls_classPrivateFieldGet(this, _HlsMedia_options, "f").autoStartLoad = autoplay;

      hls_classPrivateFieldSet(this, _HlsMedia_player, new Hls(hls_classPrivateFieldGet(this, _HlsMedia_options, "f")), "f");

      this.instance = hls_classPrivateFieldGet(this, _HlsMedia_player, "f");

      hls_classPrivateFieldSet(this, _HlsMedia_events, Hls.Events, "f");

      Object.keys(hls_classPrivateFieldGet(this, _HlsMedia_events, "f")).forEach(function (event) {
        hls_classPrivateFieldGet(_this5, _HlsMedia_player, "f").on(hls_classPrivateFieldGet(_this5, _HlsMedia_events, "f")[event], function () {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return _this5._assign(hls_classPrivateFieldGet(_this5, _HlsMedia_events, "f")[event], args);
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
    key: "_revoke",
    value: function _revoke() {
      var _this6 = this;

      if (hls_classPrivateFieldGet(this, _HlsMedia_player, "f")) {
        hls_classPrivateFieldGet(this, _HlsMedia_player, "f").stopLoad();
      }

      if (hls_classPrivateFieldGet(this, _HlsMedia_events, "f")) {
        Object.keys(hls_classPrivateFieldGet(this, _HlsMedia_events, "f")).forEach(function (event) {
          hls_classPrivateFieldGet(_this6, _HlsMedia_player, "f").off(hls_classPrivateFieldGet(_this6, _HlsMedia_events, "f")[event], function () {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            return _this6._assign(hls_classPrivateFieldGet(_this6, _HlsMedia_events, "f")[event], args);
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
/* harmony default export */ var hls = (hls_HlsMedia);
// CONCATENATED MODULE: ./src/js/media/html5.ts







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







var html5_HTML5Media = function (_Native) {
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

    return possibleConstructorReturn_default()(_this, assertThisInitialized_default()(_this));
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
      return this;
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
/* harmony default export */ var html5 = (html5_HTML5Media);
// CONCATENATED MODULE: ./src/js/media.ts





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







var media_Media = function () {
  function Media(element, options) {
    var autoplay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var customMedia = arguments.length > 3 ? arguments[3] : undefined;

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

    return this;
  }

  createClass_default()(Media, [{
    key: "canPlayType",
    value: function canPlayType(mimeType) {
      return media_classPrivateFieldGet(this, _Media_media, "f").canPlayType(mimeType);
    }
  }, {
    key: "load",
    value: function load() {
      return __awaiter(this, void 0, void 0, regenerator_default.a.mark(function _callee() {
        var _this = this;

        var sameMedia;
        return regenerator_default.a.wrap(function _callee$(_context) {
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
      return __awaiter(this, void 0, void 0, regenerator_default.a.mark(function _callee2() {
        return regenerator_default.a.wrap(function _callee2$(_context2) {
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
      return __awaiter(this, void 0, void 0, regenerator_default.a.mark(function _callee3() {
        return regenerator_default.a.wrap(function _callee3$(_context3) {
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
          type: predictType(media, media_classPrivateFieldGet(this, _Media_element, "f"))
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
        if (media_classPrivateFieldGet(this, _Media_element, "f").src) {
          media_classPrivateFieldGet(this, _Media_element, "f").setAttribute('data-op-file', media_classPrivateFieldGet(this, _Media_files, "f")[0].src);
        }

        media_classPrivateFieldGet(this, _Media_element, "f").src = media_classPrivateFieldGet(this, _Media_files, "f")[0].src;

        media_classPrivateFieldSet(this, _Media_currentSrc, media_classPrivateFieldGet(this, _Media_files, "f")[0], "f");

        if (media_classPrivateFieldGet(this, _Media_media, "f")) {
          media_classPrivateFieldGet(this, _Media_media, "f").src = media_classPrivateFieldGet(this, _Media_files, "f")[0];
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
          type: media_classPrivateFieldGet(this, _Media_element, "f").getAttribute('type') || predictType(nodeSource, media_classPrivateFieldGet(this, _Media_element, "f"))
        });
      }

      for (var i = 0, total = sourceTags.length; i < total; i++) {
        var item = sourceTags[i];
        var src = item.src;
        mediaFiles.push({
          src: src,
          type: item.getAttribute('type') || predictType(src, media_classPrivateFieldGet(this, _Media_element, "f"))
        });

        if (i === 0) {
          media_classPrivateFieldSet(this, _Media_currentSrc, mediaFiles[0], "f");
        }
      }

      if (!mediaFiles.length) {
        mediaFiles.push({
          src: '',
          type: predictType('', media_classPrivateFieldGet(this, _Media_element, "f"))
        });
      }

      return mediaFiles;
    }
  }, {
    key: "_invoke",
    value: function _invoke(media) {
      var _this2 = this;

      var playHLSNatively = media_classPrivateFieldGet(this, _Media_element, "f").canPlayType('application/vnd.apple.mpegurl') || media_classPrivateFieldGet(this, _Media_element, "f").canPlayType('application/x-mpegURL');

      media_classPrivateFieldSet(this, _Media_currentSrc, media, "f");

      var activeLevels = false;
      Object.keys(media_classPrivateFieldGet(this, _Media_options, "f").controls.layers).forEach(function (layer) {
        if (media_classPrivateFieldGet(_this2, _Media_options, "f").controls.layers[layer].indexOf('levels') > -1) {
          activeLevels = true;
        }
      });

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

        var hlsOptions = media_classPrivateFieldGet(this, _Media_options, "f") && media_classPrivateFieldGet(this, _Media_options, "f").hls ? media_classPrivateFieldGet(this, _Media_options, "f").hls : undefined;
        return new hls(media_classPrivateFieldGet(this, _Media_element, "f"), media, media_classPrivateFieldGet(this, _Media_autoplay, "f"), hlsOptions);
      }

      if (isDashSource(media)) {
        var dashOptions = media_classPrivateFieldGet(this, _Media_options, "f") && media_classPrivateFieldGet(this, _Media_options, "f").dash ? media_classPrivateFieldGet(this, _Media_options, "f").dash : undefined;
        return new dash(media_classPrivateFieldGet(this, _Media_element, "f"), media, dashOptions);
      }

      if (isFlvSource(media)) {
        var flvOptions = media_classPrivateFieldGet(this, _Media_options, "f") && media_classPrivateFieldGet(this, _Media_options, "f").flv ? media_classPrivateFieldGet(this, _Media_options, "f").flv : {
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
/* harmony default export */ var js_media = (media_Media);
// CONCATENATED MODULE: ./src/js/media/ads.ts




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

var _Ads_adsEnded, _Ads_adsDone, _Ads_adsActive, _Ads_adsStarted, _Ads_intervalTimer, _Ads_adsVolume, _Ads_adsMuted, _Ads_adsDuration, _Ads_adsCurrentTime, _Ads_adsManager, _Ads_player, _Ads_media, _Ads_element, _Ads_events, _Ads_ads, _Ads_promise, _Ads_adsLoader, _Ads_adsContainer, _Ads_adsCustomClickContainer, _Ads_adDisplayContainer, _Ads_adsRequest, _Ads_autoStart, _Ads_autoStartMuted, _Ads_playTriggered, _Ads_adsOptions, _Ads_currentAdsIndex, _Ads_originalVolume, _Ads_preloadContent, _Ads_lastTimePaused, _Ads_mediaSources, _Ads_mediaStarted, _Ads_afterInit;





var ads_Ads = function () {
  function Ads(player, ads, autoStart, autoStartMuted, options, afterInit) {
    var _this = this;

    classCallCheck_default()(this, Ads);

    _Ads_adsEnded.set(this, false);

    _Ads_adsDone.set(this, false);

    _Ads_adsActive.set(this, false);

    _Ads_adsStarted.set(this, false);

    _Ads_intervalTimer.set(this, 0);

    _Ads_adsVolume.set(this, void 0);

    _Ads_adsMuted.set(this, false);

    _Ads_adsDuration.set(this, 0);

    _Ads_adsCurrentTime.set(this, 0);

    _Ads_adsManager.set(this, null);

    _Ads_player.set(this, void 0);

    _Ads_media.set(this, void 0);

    _Ads_element.set(this, void 0);

    _Ads_events.set(this, []);

    _Ads_ads.set(this, void 0);

    _Ads_promise.set(this, void 0);

    _Ads_adsLoader.set(this, void 0);

    _Ads_adsContainer.set(this, void 0);

    _Ads_adsCustomClickContainer.set(this, void 0);

    _Ads_adDisplayContainer.set(this, void 0);

    _Ads_adsRequest.set(this, void 0);

    _Ads_autoStart.set(this, false);

    _Ads_autoStartMuted.set(this, false);

    _Ads_playTriggered.set(this, false);

    _Ads_adsOptions.set(this, void 0);

    _Ads_currentAdsIndex.set(this, 0);

    _Ads_originalVolume.set(this, void 0);

    _Ads_preloadContent.set(this, void 0);

    _Ads_lastTimePaused.set(this, 0);

    _Ads_mediaSources.set(this, []);

    _Ads_mediaStarted.set(this, false);

    this.loadedAd = false;

    _Ads_afterInit.set(this, false);

    var defaultOpts = {
      autoPlayAdBreaks: true,
      customClick: {
        enabled: false,
        label: 'Click here for more info'
      },
      debug: false,
      enablePreloading: false,
      language: 'en',
      loop: false,
      numRedirects: 4,
      publisherId: null,
      sdkPath: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
      sessionId: null,
      src: [],
      vpaidMode: 'enabled'
    };

    ads_classPrivateFieldSet(this, _Ads_player, player, "f");

    ads_classPrivateFieldSet(this, _Ads_ads, ads, "f");

    ads_classPrivateFieldSet(this, _Ads_afterInit, afterInit || false, "f");

    ads_classPrivateFieldSet(this, _Ads_media, player.getMedia(), "f");

    ads_classPrivateFieldSet(this, _Ads_element, player.getElement(), "f");

    ads_classPrivateFieldSet(this, _Ads_autoStart, autoStart || false, "f");

    ads_classPrivateFieldSet(this, _Ads_adsMuted, player.getElement().muted, "f");

    ads_classPrivateFieldSet(this, _Ads_autoStartMuted, autoStartMuted || false, "f");

    ads_classPrivateFieldSet(this, _Ads_adsOptions, Object.assign(Object.assign({}, defaultOpts), options), "f");

    if (options) {
      var objectElements = ['customClick'];
      objectElements.forEach(function (item) {
        ads_classPrivateFieldGet(_this, _Ads_adsOptions, "f")[item] = options[item] && Object.keys(options[item]).length ? Object.assign(Object.assign({}, defaultOpts[item]), options[item]) : defaultOpts[item];
      });
    }

    ads_classPrivateFieldSet(this, _Ads_playTriggered, false, "f");

    ads_classPrivateFieldSet(this, _Ads_originalVolume, ads_classPrivateFieldGet(this, _Ads_element, "f").volume, "f");

    ads_classPrivateFieldSet(this, _Ads_adsVolume, ads_classPrivateFieldGet(this, _Ads_originalVolume, "f"), "f");

    var path = ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").debug && ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").sdkPath ? ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").sdkPath.replace(/(\.js$)/, '_debug.js') : ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").sdkPath;
    this._handleClickInContainer = this._handleClickInContainer.bind(this);
    this.load = this.load.bind(this);
    this._loaded = this._loaded.bind(this);
    this._error = this._error.bind(this);
    this._assign = this._assign.bind(this);
    this._contentLoadedAction = this._contentLoadedAction.bind(this);
    this._loadedMetadataHandler = this._loadedMetadataHandler.bind(this);
    this._contentEndedListener = this._contentEndedListener.bind(this);
    this.resizeAds = this.resizeAds.bind(this);
    this._handleResizeAds = this._handleResizeAds.bind(this);
    this._onContentPauseRequested = this._onContentPauseRequested.bind(this);
    this._onContentResumeRequested = this._onContentResumeRequested.bind(this);

    ads_classPrivateFieldSet(this, _Ads_promise, path && (typeof google === 'undefined' || typeof google.ima === 'undefined') ? loadScript(path) : new Promise(function (resolve) {
      resolve({});
    }), "f");

    ads_classPrivateFieldGet(this, _Ads_promise, "f").then(this.load)["catch"](function (error) {
      var message = 'Ad script could not be loaded; please check if you have an AdBlock';
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

    return this;
  }

  createClass_default()(Ads, [{
    key: "load",
    value: function load() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.loadedAd) {
        return;
      }

      if (typeof google === 'undefined' || !google.ima || !ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").autoPlayAdBreaks && !force) {
        return;
      }

      this.loadedAd = true;

      var existingContainer = ads_classPrivateFieldGet(this, _Ads_player, "f").getContainer().querySelector('.op-ads');

      if (existingContainer && existingContainer.parentNode) {
        existingContainer.parentNode.removeChild(existingContainer);
      }

      ads_classPrivateFieldSet(this, _Ads_adsStarted, true, "f");

      ads_classPrivateFieldSet(this, _Ads_adsContainer, document.createElement('div'), "f");

      ads_classPrivateFieldGet(this, _Ads_adsContainer, "f").className = 'op-ads';
      ads_classPrivateFieldGet(this, _Ads_adsContainer, "f").tabIndex = -1;

      if (ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
        ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.insertBefore(ads_classPrivateFieldGet(this, _Ads_adsContainer, "f"), ads_classPrivateFieldGet(this, _Ads_element, "f").nextSibling);
      }

      ads_classPrivateFieldGet(this, _Ads_adsContainer, "f").addEventListener('click', this._handleClickInContainer);

      if (ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").customClick.enabled) {
        ads_classPrivateFieldSet(this, _Ads_adsCustomClickContainer, document.createElement('div'), "f");

        ads_classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f").className = 'op-ads__click-container';
        ads_classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f").innerHTML = "<div class=\"op-ads__click-label\">".concat(ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").customClick.label, "</div>");

        if (ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement) {
          ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.insertBefore(ads_classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f"), ads_classPrivateFieldGet(this, _Ads_element, "f").nextSibling);
        }
      }

      ads_classPrivateFieldSet(this, _Ads_mediaSources, ads_classPrivateFieldGet(this, _Ads_media, "f").src, "f");

      var vpaidModeMap = {
        disabled: google.ima.ImaSdkSettings.VpaidMode.DISABLED,
        enabled: google.ima.ImaSdkSettings.VpaidMode.ENABLED,
        insecure: google.ima.ImaSdkSettings.VpaidMode.INSECURE
      };
      google.ima.settings.setVpaidMode(vpaidModeMap[ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").vpaidMode]);
      google.ima.settings.setDisableCustomPlaybackForIOS10Plus(true);
      google.ima.settings.setAutoPlayAdBreaks(ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").autoPlayAdBreaks);
      google.ima.settings.setNumRedirects(ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").numRedirects);
      google.ima.settings.setLocale(ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").language);

      if (ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").sessionId) {
        google.ima.settings.setSessionId(ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").sessionId);
      }

      if (ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").publisherId) {
        google.ima.settings.setPpid(ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").publisherId);
      }

      google.ima.settings.setPlayerType('openplayerjs');
      google.ima.settings.setPlayerVersion('2.9.1');

      ads_classPrivateFieldSet(this, _Ads_adDisplayContainer, new google.ima.AdDisplayContainer(ads_classPrivateFieldGet(this, _Ads_adsContainer, "f"), ads_classPrivateFieldGet(this, _Ads_element, "f"), ads_classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f")), "f");

      ads_classPrivateFieldSet(this, _Ads_adsLoader, new google.ima.AdsLoader(ads_classPrivateFieldGet(this, _Ads_adDisplayContainer, "f")), "f");

      ads_classPrivateFieldGet(this, _Ads_adsLoader, "f").addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded, EVENT_OPTIONS);

      ads_classPrivateFieldGet(this, _Ads_adsLoader, "f").addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error, EVENT_OPTIONS);

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this._handleResizeAds, EVENT_OPTIONS);
      }

      ads_classPrivateFieldGet(this, _Ads_element, "f").addEventListener('loadedmetadata', this._handleResizeAds, EVENT_OPTIONS);

      if (ads_classPrivateFieldGet(this, _Ads_autoStart, "f") === true || ads_classPrivateFieldGet(this, _Ads_autoStartMuted, "f") === true || force === true || ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").enablePreloading === true || ads_classPrivateFieldGet(this, _Ads_playTriggered, "f") === true) {
        if (!ads_classPrivateFieldGet(this, _Ads_adsDone, "f")) {
          ads_classPrivateFieldSet(this, _Ads_adsDone, true, "f");

          ads_classPrivateFieldGet(this, _Ads_adDisplayContainer, "f").initialize();
        }

        this._requestAds();
      }
    }
  }, {
    key: "play",
    value: function play() {
      return ads_awaiter(this, void 0, void 0, regenerator_default.a.mark(function _callee() {
        var e;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (ads_classPrivateFieldGet(this, _Ads_adsDone, "f")) {
                  _context.next = 6;
                  break;
                }

                ads_classPrivateFieldSet(this, _Ads_playTriggered, true, "f");

                if (!ads_classPrivateFieldGet(this, _Ads_afterInit, "f")) {
                  this._initNotDoneAds();
                }

                _context.next = 5;
                return this.loadPromise;

              case 5:
                return _context.abrupt("return");

              case 6:
                if (ads_classPrivateFieldGet(this, _Ads_adsManager, "f")) {
                  try {
                    if (!ads_classPrivateFieldGet(this, _Ads_intervalTimer, "f") && ads_classPrivateFieldGet(this, _Ads_adsActive, "f") === false) {
                      ads_classPrivateFieldGet(this, _Ads_adsManager, "f").start();
                    } else {
                      ads_classPrivateFieldGet(this, _Ads_adsManager, "f").resume();
                    }

                    ads_classPrivateFieldSet(this, _Ads_adsActive, true, "f");

                    e = addEvent('play');

                    ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
                  } catch (err) {
                    this._resumeMedia();
                  }
                }

              case 7:
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
      if (ads_classPrivateFieldGet(this, _Ads_adsManager, "f")) {
        ads_classPrivateFieldSet(this, _Ads_adsActive, false, "f");

        ads_classPrivateFieldGet(this, _Ads_adsManager, "f").pause();

        var e = addEvent('pause');

        ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      if (ads_classPrivateFieldGet(this, _Ads_adsManager, "f")) {
        ads_classPrivateFieldGet(this, _Ads_adsManager, "f").removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error);

        if (ads_classPrivateFieldGet(this, _Ads_events, "f")) {
          ads_classPrivateFieldGet(this, _Ads_events, "f").forEach(function (event) {
            ads_classPrivateFieldGet(_this2, _Ads_adsManager, "f").removeEventListener(event, _this2._assign);
          });
        }
      }

      ads_classPrivateFieldSet(this, _Ads_events, [], "f");

      var controls = ads_classPrivateFieldGet(this, _Ads_player, "f").getControls();

      var mouseEvents = controls ? controls.events.mouse : {};
      Object.keys(mouseEvents).forEach(function (event) {
        if (ads_classPrivateFieldGet(_this2, _Ads_adsContainer, "f")) {
          ads_classPrivateFieldGet(_this2, _Ads_adsContainer, "f").removeEventListener(event, mouseEvents[event]);
        }
      });

      if (ads_classPrivateFieldGet(this, _Ads_adsLoader, "f")) {
        ads_classPrivateFieldGet(this, _Ads_adsLoader, "f").removeEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error);

        ads_classPrivateFieldGet(this, _Ads_adsLoader, "f").removeEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._loaded);
      }

      var destroy = !Array.isArray(ads_classPrivateFieldGet(this, _Ads_ads, "f")) || ads_classPrivateFieldGet(this, _Ads_currentAdsIndex, "f") > ads_classPrivateFieldGet(this, _Ads_ads, "f").length;

      if (ads_classPrivateFieldGet(this, _Ads_adsManager, "f") && destroy) {
        ads_classPrivateFieldGet(this, _Ads_adsManager, "f").destroy();
      }

      if (ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").customClick.enabled) {
        removeElement(ads_classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f"));
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

      if (ads_classPrivateFieldGet(this, _Ads_adsContainer, "f")) {
        ads_classPrivateFieldGet(this, _Ads_adsContainer, "f").removeEventListener('click', this._handleClickInContainer);
      }

      removeElement(ads_classPrivateFieldGet(this, _Ads_adsContainer, "f"));
    }
  }, {
    key: "resizeAds",
    value: function resizeAds(width, height) {
      var _this3 = this;

      if (ads_classPrivateFieldGet(this, _Ads_adsManager, "f")) {
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
            ads_classPrivateFieldGet(_this3, _Ads_adsManager, "f").resize(formattedWidth || target.offsetWidth, formattedHeight || target.offsetHeight, mode);
          });
        }
      }
    }
  }, {
    key: "getAdsManager",
    value: function getAdsManager() {
      return ads_classPrivateFieldGet(this, _Ads_adsManager, "f");
    }
  }, {
    key: "started",
    value: function started() {
      return ads_classPrivateFieldGet(this, _Ads_adsStarted, "f");
    }
  }, {
    key: "src",
    set: function set(source) {
      ads_classPrivateFieldSet(this, _Ads_ads, source, "f");
    }
  }, {
    key: "isDone",
    set: function set(value) {
      ads_classPrivateFieldSet(this, _Ads_adsDone, value, "f");
    }
  }, {
    key: "playRequested",
    set: function set(value) {
      ads_classPrivateFieldSet(this, _Ads_playTriggered, value, "f");
    }
  }, {
    key: "volume",
    get: function get() {
      return ads_classPrivateFieldGet(this, _Ads_adsManager, "f") ? ads_classPrivateFieldGet(this, _Ads_adsManager, "f").getVolume() : ads_classPrivateFieldGet(this, _Ads_originalVolume, "f");
    },
    set: function set(value) {
      if (ads_classPrivateFieldGet(this, _Ads_adsManager, "f")) {
        ads_classPrivateFieldSet(this, _Ads_adsVolume, value, "f");

        ads_classPrivateFieldGet(this, _Ads_adsManager, "f").setVolume(value);

        this._setMediaVolume(value);

        ads_classPrivateFieldSet(this, _Ads_adsMuted, value === 0, "f");
      }
    }
  }, {
    key: "muted",
    get: function get() {
      return ads_classPrivateFieldGet(this, _Ads_adsMuted, "f");
    },
    set: function set(value) {
      if (ads_classPrivateFieldGet(this, _Ads_adsManager, "f")) {
        if (value) {
          ads_classPrivateFieldGet(this, _Ads_adsManager, "f").setVolume(0);

          ads_classPrivateFieldSet(this, _Ads_adsMuted, true, "f");

          this._setMediaVolume(0);
        } else {
          ads_classPrivateFieldGet(this, _Ads_adsManager, "f").setVolume(ads_classPrivateFieldGet(this, _Ads_adsVolume, "f"));

          ads_classPrivateFieldSet(this, _Ads_adsMuted, false, "f");

          this._setMediaVolume(ads_classPrivateFieldGet(this, _Ads_adsVolume, "f"));
        }
      }
    }
  }, {
    key: "currentTime",
    get: function get() {
      return ads_classPrivateFieldGet(this, _Ads_adsCurrentTime, "f");
    },
    set: function set(value) {
      ads_classPrivateFieldSet(this, _Ads_adsCurrentTime, value, "f");
    }
  }, {
    key: "duration",
    get: function get() {
      return ads_classPrivateFieldGet(this, _Ads_adsDuration, "f");
    }
  }, {
    key: "paused",
    get: function get() {
      return !ads_classPrivateFieldGet(this, _Ads_adsActive, "f");
    }
  }, {
    key: "ended",
    get: function get() {
      return ads_classPrivateFieldGet(this, _Ads_adsEnded, "f");
    }
  }, {
    key: "_assign",
    value: function _assign(event) {
      var _this4 = this;

      var ad = event.getAd();

      switch (event.type) {
        case google.ima.AdEvent.Type.LOADED:
          if (!ad.isLinear()) {
            this._onContentResumeRequested();
          } else {
            if (IS_IPHONE && isVideo(ads_classPrivateFieldGet(this, _Ads_element, "f"))) {
              ads_classPrivateFieldGet(this, _Ads_element, "f").controls = false;
            }

            ads_classPrivateFieldSet(this, _Ads_adsDuration, ad.getDuration(), "f");

            ads_classPrivateFieldSet(this, _Ads_adsCurrentTime, ad.getDuration(), "f");

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

            ads_classPrivateFieldSet(this, _Ads_adsActive, true, "f");

            var playEvent = addEvent('play');

            ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(playEvent);

            var resized;

            if (!resized) {
              this.resizeAds();
              resized = true;
            }

            if (ads_classPrivateFieldGet(this, _Ads_media, "f").ended) {
              ads_classPrivateFieldSet(this, _Ads_adsEnded, false, "f");

              var endEvent = addEvent('adsmediaended');

              ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(endEvent);
            }

            if (typeof window !== 'undefined') {
              ads_classPrivateFieldSet(this, _Ads_intervalTimer, window.setInterval(function () {
                if (ads_classPrivateFieldGet(_this4, _Ads_adsActive, "f") === true) {
                  ads_classPrivateFieldSet(_this4, _Ads_adsCurrentTime, Math.round(ads_classPrivateFieldGet(_this4, _Ads_adsManager, "f").getRemainingTime()), "f");

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

            ads_classPrivateFieldSet(this, _Ads_adsActive, false, "f");

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
            ads_classPrivateFieldSet(this, _Ads_adsActive, false, "f");

            ads_classPrivateFieldSet(this, _Ads_adsEnded, true, "f");

            ads_classPrivateFieldSet(this, _Ads_intervalTimer, 0, "f");

            ads_classPrivateFieldSet(this, _Ads_adsMuted, false, "f");

            ads_classPrivateFieldSet(this, _Ads_adsStarted, false, "f");

            ads_classPrivateFieldSet(this, _Ads_adsDuration, 0, "f");

            ads_classPrivateFieldSet(this, _Ads_adsCurrentTime, 0, "f");

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
          if (!ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").autoPlayAdBreaks) {
            this.play();
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

      if (Array.isArray(ads_classPrivateFieldGet(this, _Ads_ads, "f")) && ads_classPrivateFieldGet(this, _Ads_ads, "f").length > 1 && ads_classPrivateFieldGet(this, _Ads_currentAdsIndex, "f") < ads_classPrivateFieldGet(this, _Ads_ads, "f").length - 1) {
        ads_classPrivateFieldSet(this, _Ads_currentAdsIndex, (_a = ads_classPrivateFieldGet(this, _Ads_currentAdsIndex, "f"), _a++, _a), "f");

        ads_classPrivateFieldSet(this, _Ads_playTriggered, true, "f");

        ads_classPrivateFieldSet(this, _Ads_adsStarted, true, "f");

        ads_classPrivateFieldSet(this, _Ads_adsDone, false, "f");

        this.destroy();
        this.loadedAd = false;
        this.load(true);
        console.warn("Ad warning: ".concat(error.toString()));
      } else {
        if (fatalErrorCodes.indexOf(error.getErrorCode()) > -1) {
          if (ads_classPrivateFieldGet(this, _Ads_adsManager, "f")) {
            ads_classPrivateFieldGet(this, _Ads_adsManager, "f").destroy();
          }

          console.error("Ad error: ".concat(error.toString()));
        } else {
          console.warn("Ad warning: ".concat(error.toString()));
        }

        if (ads_classPrivateFieldGet(this, _Ads_autoStart, "f") === true || ads_classPrivateFieldGet(this, _Ads_autoStartMuted, "f") === true || ads_classPrivateFieldGet(this, _Ads_adsStarted, "f") === true) {
          ads_classPrivateFieldSet(this, _Ads_adsActive, false, "f");

          this._resumeMedia();
        }
      }
    }
  }, {
    key: "_loaded",
    value: function _loaded(adsManagerLoadedEvent) {
      var adsRenderingSettings = new google.ima.AdsRenderingSettings();
      adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = false;
      adsRenderingSettings.enablePreloading = ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").enablePreloading;

      ads_classPrivateFieldSet(this, _Ads_adsManager, adsManagerLoadedEvent.getAdsManager(ads_classPrivateFieldGet(this, _Ads_element, "f"), adsRenderingSettings), "f");

      this._start(ads_classPrivateFieldGet(this, _Ads_adsManager, "f"));

      this.loadPromise = new Promise(function (resolve) {
        return resolve;
      });
    }
  }, {
    key: "_start",
    value: function _start(manager) {
      var _this5 = this;

      if (ads_classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f") && manager.isCustomClickTrackingUsed()) {
        ads_classPrivateFieldGet(this, _Ads_adsCustomClickContainer, "f").classList.add('op-ads__click-container--visible');
      }

      manager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this._onContentPauseRequested, EVENT_OPTIONS);
      manager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this._onContentResumeRequested, EVENT_OPTIONS);

      ads_classPrivateFieldSet(this, _Ads_events, [google.ima.AdEvent.Type.ALL_ADS_COMPLETED, google.ima.AdEvent.Type.CLICK, google.ima.AdEvent.Type.VIDEO_CLICKED, google.ima.AdEvent.Type.VIDEO_ICON_CLICKED, google.ima.AdEvent.Type.AD_PROGRESS, google.ima.AdEvent.Type.AD_BUFFERING, google.ima.AdEvent.Type.IMPRESSION, google.ima.AdEvent.Type.DURATION_CHANGE, google.ima.AdEvent.Type.USER_CLOSE, google.ima.AdEvent.Type.LINEAR_CHANGED, google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, google.ima.AdEvent.Type.AD_METADATA, google.ima.AdEvent.Type.INTERACTION, google.ima.AdEvent.Type.COMPLETE, google.ima.AdEvent.Type.FIRST_QUARTILE, google.ima.AdEvent.Type.LOADED, google.ima.AdEvent.Type.MIDPOINT, google.ima.AdEvent.Type.PAUSED, google.ima.AdEvent.Type.RESUMED, google.ima.AdEvent.Type.USER_CLOSE, google.ima.AdEvent.Type.STARTED, google.ima.AdEvent.Type.THIRD_QUARTILE, google.ima.AdEvent.Type.SKIPPED, google.ima.AdEvent.Type.VOLUME_CHANGED, google.ima.AdEvent.Type.VOLUME_MUTED, google.ima.AdEvent.Type.LOG], "f");

      if (!ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").autoPlayAdBreaks) {
        ads_classPrivateFieldGet(this, _Ads_events, "f").push(google.ima.AdEvent.Type.AD_BREAK_READY);
      }

      var controls = ads_classPrivateFieldGet(this, _Ads_player, "f").getControls();

      var mouseEvents = controls ? controls.events.mouse : {};
      Object.keys(mouseEvents).forEach(function (event) {
        if (ads_classPrivateFieldGet(_this5, _Ads_adsContainer, "f")) {
          ads_classPrivateFieldGet(_this5, _Ads_adsContainer, "f").addEventListener(event, mouseEvents[event], EVENT_OPTIONS);
        }
      });

      ads_classPrivateFieldGet(this, _Ads_events, "f").forEach(function (event) {
        manager.addEventListener(event, _this5._assign, EVENT_OPTIONS);
      });

      manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this._error, EVENT_OPTIONS);

      if (ads_classPrivateFieldGet(this, _Ads_autoStart, "f") === true || ads_classPrivateFieldGet(this, _Ads_playTriggered, "f") === true) {
        ads_classPrivateFieldSet(this, _Ads_playTriggered, false, "f");

        if (!ads_classPrivateFieldGet(this, _Ads_adsDone, "f")) {
          this._initNotDoneAds();

          return;
        }

        manager.init(ads_classPrivateFieldGet(this, _Ads_element, "f").offsetWidth, ads_classPrivateFieldGet(this, _Ads_element, "f").offsetHeight, ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement && ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.getAttribute('data-fullscreen') === 'true' ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL);
        manager.start();
        var e = addEvent('play');

        ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);

        var event = addEvent('playing');

        ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(event);
      } else if (ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").enablePreloading === true) {
        manager.init(ads_classPrivateFieldGet(this, _Ads_element, "f").offsetWidth, ads_classPrivateFieldGet(this, _Ads_element, "f").offsetHeight, ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement && ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.getAttribute('data-fullscreen') === 'true' ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL);
      }
    }
  }, {
    key: "_initNotDoneAds",
    value: function _initNotDoneAds() {
      ads_classPrivateFieldSet(this, _Ads_adsDone, true, "f");

      if (ads_classPrivateFieldGet(this, _Ads_adDisplayContainer, "f")) {
        ads_classPrivateFieldGet(this, _Ads_adDisplayContainer, "f").initialize();

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
      ads_classPrivateFieldSet(this, _Ads_adsEnded, true, "f");

      ads_classPrivateFieldSet(this, _Ads_adsActive, false, "f");

      ads_classPrivateFieldSet(this, _Ads_adsStarted, false, "f");

      ads_classPrivateFieldGet(this, _Ads_adsLoader, "f").contentComplete();
    }
  }, {
    key: "_onContentPauseRequested",
    value: function _onContentPauseRequested() {
      ads_classPrivateFieldGet(this, _Ads_element, "f").removeEventListener('ended', this._contentEndedListener);

      ads_classPrivateFieldSet(this, _Ads_lastTimePaused, ads_classPrivateFieldGet(this, _Ads_media, "f").currentTime, "f");

      if (ads_classPrivateFieldGet(this, _Ads_adsStarted, "f")) {
        ads_classPrivateFieldGet(this, _Ads_media, "f").pause();
      } else {
        ads_classPrivateFieldSet(this, _Ads_adsStarted, true, "f");
      }

      var e = addEvent('play');

      ads_classPrivateFieldGet(this, _Ads_element, "f").dispatchEvent(e);
    }
  }, {
    key: "_onContentResumeRequested",
    value: function _onContentResumeRequested() {
      var _a;

      if (ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").loop) {
        if (Array.isArray(ads_classPrivateFieldGet(this, _Ads_ads, "f"))) {
          if (ads_classPrivateFieldGet(this, _Ads_currentAdsIndex, "f") === ads_classPrivateFieldGet(this, _Ads_ads, "f").length - 1) {
            ads_classPrivateFieldSet(this, _Ads_currentAdsIndex, 0, "f");
          } else {
            ads_classPrivateFieldSet(this, _Ads_currentAdsIndex, (_a = ads_classPrivateFieldGet(this, _Ads_currentAdsIndex, "f"), _a++, _a), "f");
          }
        }

        this.destroy();

        ads_classPrivateFieldGet(this, _Ads_adsLoader, "f").contentComplete();

        ads_classPrivateFieldSet(this, _Ads_playTriggered, true, "f");

        ads_classPrivateFieldSet(this, _Ads_adsStarted, true, "f");

        ads_classPrivateFieldSet(this, _Ads_adsDone, false, "f");

        this.loadedAd = false;
        this.load(true);
      } else {
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
    }
  }, {
    key: "_loadedMetadataHandler",
    value: function _loadedMetadataHandler() {
      var _a;

      if (Array.isArray(ads_classPrivateFieldGet(this, _Ads_ads, "f"))) {
        ads_classPrivateFieldSet(this, _Ads_currentAdsIndex, (_a = ads_classPrivateFieldGet(this, _Ads_currentAdsIndex, "f"), _a++, _a), "f");

        if (ads_classPrivateFieldGet(this, _Ads_currentAdsIndex, "f") <= ads_classPrivateFieldGet(this, _Ads_ads, "f").length - 1) {
          if (ads_classPrivateFieldGet(this, _Ads_adsManager, "f")) {
            ads_classPrivateFieldGet(this, _Ads_adsManager, "f").destroy();
          }

          ads_classPrivateFieldGet(this, _Ads_adsLoader, "f").contentComplete();

          ads_classPrivateFieldSet(this, _Ads_playTriggered, true, "f");

          ads_classPrivateFieldSet(this, _Ads_adsStarted, true, "f");

          ads_classPrivateFieldSet(this, _Ads_adsDone, false, "f");

          this._requestAds();
        } else {
          if (!ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").autoPlayAdBreaks) {
            this._resetAdsAfterManualBreak();
          }

          this._prepareMedia();
        }
      } else if (ads_classPrivateFieldGet(this, _Ads_element, "f").seekable.length) {
        if (ads_classPrivateFieldGet(this, _Ads_element, "f").seekable.end(0) > ads_classPrivateFieldGet(this, _Ads_lastTimePaused, "f")) {
          if (!ads_classPrivateFieldGet(this, _Ads_adsOptions, "f").autoPlayAdBreaks) {
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

      ads_classPrivateFieldSet(this, _Ads_adsMuted, false, "f");

      ads_classPrivateFieldSet(this, _Ads_adsStarted, false, "f");

      ads_classPrivateFieldSet(this, _Ads_adsDuration, 0, "f");

      ads_classPrivateFieldSet(this, _Ads_adsCurrentTime, 0, "f");

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
        } catch (err) {}
      }
    }
  }, {
    key: "_requestAds",
    value: function _requestAds() {
      ads_classPrivateFieldSet(this, _Ads_adsRequest, new google.ima.AdsRequest(), "f");

      var ads = Array.isArray(ads_classPrivateFieldGet(this, _Ads_ads, "f")) ? ads_classPrivateFieldGet(this, _Ads_ads, "f")[ads_classPrivateFieldGet(this, _Ads_currentAdsIndex, "f")] : ads_classPrivateFieldGet(this, _Ads_ads, "f");

      if (isXml(ads)) {
        ads_classPrivateFieldGet(this, _Ads_adsRequest, "f").adsResponse = ads;
      } else {
        ads_classPrivateFieldGet(this, _Ads_adsRequest, "f").adTagUrl = ads;
      }

      var width = ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement ? ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.offsetWidth : 0;
      var height = ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement ? ads_classPrivateFieldGet(this, _Ads_element, "f").parentElement.offsetHeight : 0;
      ads_classPrivateFieldGet(this, _Ads_adsRequest, "f").linearAdSlotWidth = width;
      ads_classPrivateFieldGet(this, _Ads_adsRequest, "f").linearAdSlotHeight = height;
      ads_classPrivateFieldGet(this, _Ads_adsRequest, "f").nonLinearAdSlotWidth = width;
      ads_classPrivateFieldGet(this, _Ads_adsRequest, "f").nonLinearAdSlotHeight = height / 3;

      ads_classPrivateFieldGet(this, _Ads_adsRequest, "f").setAdWillAutoPlay(ads_classPrivateFieldGet(this, _Ads_autoStart, "f"));

      ads_classPrivateFieldGet(this, _Ads_adsRequest, "f").setAdWillPlayMuted(ads_classPrivateFieldGet(this, _Ads_autoStartMuted, "f"));

      ads_classPrivateFieldGet(this, _Ads_adsLoader, "f").requestAds(ads_classPrivateFieldGet(this, _Ads_adsRequest, "f"));
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
      if (ads_classPrivateFieldGet(this, _Ads_adsManager, "f")) {
        ads_classPrivateFieldGet(this, _Ads_adsManager, "f").destroy();
      }

      ads_classPrivateFieldGet(this, _Ads_adsLoader, "f").contentComplete();

      ads_classPrivateFieldSet(this, _Ads_adsDone, false, "f");

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
  }]);

  return Ads;
}();

_Ads_adsEnded = new WeakMap(), _Ads_adsDone = new WeakMap(), _Ads_adsActive = new WeakMap(), _Ads_adsStarted = new WeakMap(), _Ads_intervalTimer = new WeakMap(), _Ads_adsVolume = new WeakMap(), _Ads_adsMuted = new WeakMap(), _Ads_adsDuration = new WeakMap(), _Ads_adsCurrentTime = new WeakMap(), _Ads_adsManager = new WeakMap(), _Ads_player = new WeakMap(), _Ads_media = new WeakMap(), _Ads_element = new WeakMap(), _Ads_events = new WeakMap(), _Ads_ads = new WeakMap(), _Ads_promise = new WeakMap(), _Ads_adsLoader = new WeakMap(), _Ads_adsContainer = new WeakMap(), _Ads_adsCustomClickContainer = new WeakMap(), _Ads_adDisplayContainer = new WeakMap(), _Ads_adsRequest = new WeakMap(), _Ads_autoStart = new WeakMap(), _Ads_autoStartMuted = new WeakMap(), _Ads_playTriggered = new WeakMap(), _Ads_adsOptions = new WeakMap(), _Ads_currentAdsIndex = new WeakMap(), _Ads_originalVolume = new WeakMap(), _Ads_preloadContent = new WeakMap(), _Ads_lastTimePaused = new WeakMap(), _Ads_mediaSources = new WeakMap(), _Ads_mediaStarted = new WeakMap(), _Ads_afterInit = new WeakMap();
/* harmony default export */ var media_ads = (ads_Ads);
// CONCATENATED MODULE: ./node_modules/element-closest/index.mjs
function element_closest_polyfill(window) {
  var ElementPrototype = window.Element.prototype;

  if (typeof ElementPrototype.matches !== 'function') {
    ElementPrototype.matches = ElementPrototype.msMatchesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.webkitMatchesSelector || function matches(selector) {
      var element = this;
      var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      var index = 0;

      while (elements[index] && elements[index] !== element) {
        ++index;
      }

      return Boolean(elements[index]);
    };
  }

  if (typeof ElementPrototype.closest !== 'function') {
    ElementPrototype.closest = function closest(selector) {
      var element = this;

      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }

        element = element.parentNode;
      }

      return null;
    };
  }
}

/* harmony default export */ var element_closest = (element_closest_polyfill);
//# sourceMappingURL=index.mjs.map

// CONCATENATED MODULE: ./src/js/utils/closest.ts


if (typeof window !== 'undefined') {
  element_closest(window);
}
// CONCATENATED MODULE: ./src/js/player.ts





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

var _Player_controls, _Player_adsInstance, _Player_uid, _Player_element, _Player_ads, _Player_media, _Player_events, _Player_autoplay, _Player_volume, _Player_canAutoplay, _Player_canAutoplayMuted, _Player_processedAutoplay, _Player_options, _Player_customControlItems, _Player_fullscreen, _Player_defaultOptions;

















var player_Player = function () {
  function Player(element, options) {
    classCallCheck_default()(this, Player);

    _Player_controls.set(this, void 0);

    _Player_adsInstance.set(this, void 0);

    this.proxy = null;

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

    _Player_options.set(this, {});

    _Player_customControlItems.set(this, []);

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
      defaultLevel: null,
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
      mode: 'responsive',
      onError: function onError(e) {
        return console.error(e);
      },
      pauseOthers: true,
      progress: {
        duration: 0,
        showCurrentTimeOnly: false
      },
      showLoaderOnInit: false,
      startTime: 0,
      startVolume: 1,
      step: 0,
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

      if (player_classPrivateFieldGet(this, _Player_options, "f").startTime > 0) {
        player_classPrivateFieldGet(this, _Player_element, "f").currentTime = player_classPrivateFieldGet(this, _Player_options, "f").startTime;
      }

      player_classPrivateFieldSet(this, _Player_volume, player_classPrivateFieldGet(this, _Player_element, "f").volume, "f");
    }

    this._autoplay = this._autoplay.bind(this);
    this._enableKeyBindings = this._enableKeyBindings.bind(this);
    return this;
  }

  createClass_default()(Player, [{
    key: "init",
    value: function init() {
      return player_awaiter(this, void 0, void 0, regenerator_default.a.mark(function _callee() {
        return regenerator_default.a.wrap(function _callee$(_context) {
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
      player_classPrivateFieldGet(this, _Player_media, "f").loaded = false;
      return this.isMedia() ? player_classPrivateFieldGet(this, _Player_media, "f").load() : undefined;
    }
  }, {
    key: "play",
    value: function play() {
      return player_awaiter(this, void 0, void 0, regenerator_default.a.mark(function _callee2() {
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(player_classPrivateFieldGet(this, _Player_media, "f") && !player_classPrivateFieldGet(this, _Player_media, "f").loaded)) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 3;
                return player_classPrivateFieldGet(this, _Player_media, "f").load();

              case 3:
                player_classPrivateFieldGet(this, _Player_media, "f").loaded = true;

              case 4:
                if (!player_classPrivateFieldGet(this, _Player_adsInstance, "f")) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 7;
                return player_classPrivateFieldGet(this, _Player_adsInstance, "f").loadPromise;

              case 7:
                return _context2.abrupt("return", player_classPrivateFieldGet(this, _Player_adsInstance, "f").play());

              case 8:
                return _context2.abrupt("return", player_classPrivateFieldGet(this, _Player_media, "f").play());

              case 9:
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
      if (player_classPrivateFieldGet(this, _Player_adsInstance, "f")) {
        player_classPrivateFieldGet(this, _Player_adsInstance, "f").pause();
      } else {
        player_classPrivateFieldGet(this, _Player_media, "f").pause();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this = this;

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
        removeElement(this.playBtn);
        removeElement(this.loader);
      }

      player_classPrivateFieldGet(this, _Player_element, "f").removeEventListener('playererror', player_classPrivateFieldGet(this, _Player_options, "f").onError);

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
      return player_classPrivateFieldGet(this, _Player_customControlItems, "f");
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
      return this.activeElement() instanceof media_ads;
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
      if (args["default"]) {
        var tracks = player_classPrivateFieldGet(this, _Player_element, "f").querySelectorAll('track');

        for (var i = 0, total = tracks.length; i < total; i++) {
          tracks[i]["default"] = false;
        }
      }

      var el = player_classPrivateFieldGet(this, _Player_element, "f");

      var track = el.querySelector("track[srclang=\"".concat(args.srclang, "\"][kind=\"").concat(args.kind, "\"]"));

      if (track) {
        track.src = args.src;
        track.label = args.label;
        track["default"] = args["default"] || false;
      } else {
        track = document.createElement('track');
        track.srclang = args.srclang;
        track.src = args.src;
        track.kind = args.kind;
        track.label = args.label;
        track["default"] = args["default"] || false;
        el.appendChild(track);
      }

      var e = addEvent('controlschanged');
      el.dispatchEvent(e);
    }
  }, {
    key: "addControl",
    value: function addControl(args) {
      args.custom = true;

      player_classPrivateFieldGet(this, _Player_customControlItems, "f").push(args);

      var e = addEvent('controlschanged');

      player_classPrivateFieldGet(this, _Player_element, "f").dispatchEvent(e);
    }
  }, {
    key: "removeControl",
    value: function removeControl(controlName) {
      var _this2 = this;

      var layers = this.getOptions().controls.layers;
      Object.keys(layers).forEach(function (layer) {
        layers[layer].forEach(function (item, idx) {
          if (item === controlName) {
            layers[layer].splice(idx, 1);
          }
        });
      });

      player_classPrivateFieldGet(this, _Player_customControlItems, "f").forEach(function (item, idx) {
        if (item.id === controlName) {
          player_classPrivateFieldGet(_this2, _Player_customControlItems, "f").splice(idx, 1);
        }
      });

      var e = addEvent('controlschanged');

      player_classPrivateFieldGet(this, _Player_element, "f").dispatchEvent(e);
    }
  }, {
    key: "_prepareMedia",
    value: function _prepareMedia() {
      return player_awaiter(this, void 0, void 0, regenerator_default.a.mark(function _callee3() {
        var preload, adsOptions;
        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                player_classPrivateFieldGet(this, _Player_element, "f").addEventListener('playererror', player_classPrivateFieldGet(this, _Player_options, "f").onError, EVENT_OPTIONS);

                if (player_classPrivateFieldGet(this, _Player_autoplay, "f") && isVideo(player_classPrivateFieldGet(this, _Player_element, "f"))) {
                  player_classPrivateFieldGet(this, _Player_element, "f").addEventListener('canplay', this._autoplay, EVENT_OPTIONS);
                }

                player_classPrivateFieldSet(this, _Player_media, new js_media(player_classPrivateFieldGet(this, _Player_element, "f"), player_classPrivateFieldGet(this, _Player_options, "f"), player_classPrivateFieldGet(this, _Player_autoplay, "f"), Player.customMedia), "f");

                preload = player_classPrivateFieldGet(this, _Player_element, "f").getAttribute('preload');

                if (!(player_classPrivateFieldGet(this, _Player_ads, "f") || !preload || preload !== 'none')) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 8;
                return player_classPrivateFieldGet(this, _Player_media, "f").load();

              case 8:
                player_classPrivateFieldGet(this, _Player_media, "f").loaded = true;

              case 9:
                if (!player_classPrivateFieldGet(this, _Player_autoplay, "f") && player_classPrivateFieldGet(this, _Player_ads, "f")) {
                  adsOptions = player_classPrivateFieldGet(this, _Player_options, "f") && player_classPrivateFieldGet(this, _Player_options, "f").ads ? player_classPrivateFieldGet(this, _Player_options, "f").ads : undefined;

                  player_classPrivateFieldSet(this, _Player_adsInstance, new media_ads(this, player_classPrivateFieldGet(this, _Player_ads, "f"), false, false, adsOptions), "f");
                }

                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](0);
                console.error(_context3.t0);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 12]]);
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
      return player_awaiter(this, void 0, void 0, regenerator_default.a.mark(function _callee4() {
        var adsOptions, autoplay;
        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                if (this.isAd()) {
                  this.activeElement().destroy();
                  this.activeElement().src = src;
                  this.getAd().isDone = false;

                  if (!this.activeElement().paused) {
                    this.getAd().playRequested = true;
                  }

                  this.activeElement().load(true);
                } else {
                  adsOptions = player_classPrivateFieldGet(this, _Player_options, "f") && player_classPrivateFieldGet(this, _Player_options, "f").ads ? player_classPrivateFieldGet(this, _Player_options, "f").ads : undefined;
                  autoplay = !this.activeElement().paused || player_classPrivateFieldGet(this, _Player_canAutoplay, "f");

                  player_classPrivateFieldSet(this, _Player_adsInstance, new media_ads(this, src, autoplay, player_classPrivateFieldGet(this, _Player_canAutoplayMuted, "f"), adsOptions, true), "f");
                }

                _context4.next = 4;
                return player_classPrivateFieldGet(this, _Player_adsInstance, "f").loadPromise;

              case 4:
                _context4.next = 9;
                break;

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                console.error(_context4.t0);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 6]]);
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
          source.type = m.type || predictType(m.src, player_classPrivateFieldGet(_this4, _Player_element, "f"));

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

      player_classPrivateFieldSet(this, _Player_controls, new js_controls(this), "f");

      player_classPrivateFieldGet(this, _Player_controls, "f").create();
    }
  }, {
    key: "_createUID",
    value: function _createUID() {
      if (player_classPrivateFieldGet(this, _Player_element, "f").id) {
        player_classPrivateFieldSet(this, _Player_uid, player_classPrivateFieldGet(this, _Player_element, "f").id, "f");

        player_classPrivateFieldGet(this, _Player_element, "f").removeAttribute('id');
      } else {
        var uid;

        do {
          uid = "op_".concat(Math.random().toString(36).substr(2, 9));
        } while (Player.instances[uid] !== undefined);

        player_classPrivateFieldSet(this, _Player_uid, uid, "f");
      }

      if (player_classPrivateFieldGet(this, _Player_element, "f").parentElement) {
        player_classPrivateFieldGet(this, _Player_element, "f").parentElement.id = player_classPrivateFieldGet(this, _Player_uid, "f");
      }
    }
  }, {
    key: "_createPlayButton",
    value: function _createPlayButton() {
      var _this5 = this;

      if (isAudio(player_classPrivateFieldGet(this, _Player_element, "f"))) {
        return;
      }

      this.playBtn = document.createElement('button');
      this.playBtn.className = 'op-player__play';
      this.playBtn.tabIndex = 0;
      this.playBtn.title = player_classPrivateFieldGet(this, _Player_options, "f").labels.play;
      this.playBtn.innerHTML = "<span>".concat(player_classPrivateFieldGet(this, _Player_options, "f").labels.play, "</span>");
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
          _this6.playBtn.classList.add('op-player__play--paused');

          _this6.playBtn.title = player_classPrivateFieldGet(_this6, _Player_options, "f").labels.pause;

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
          var el = _this6.activeElement();

          _this6.playBtn.classList.remove('op-player__play--paused');

          _this6.playBtn.title = player_classPrivateFieldGet(_this6, _Player_options, "f").labels.play;

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
          if (player_classPrivateFieldGet(_this7, _Player_canAutoplayMuted, "f")) {
            _this7.activeElement().muted = true;
            _this7.activeElement().volume = 0;
            var e = addEvent('volumechange');

            player_classPrivateFieldGet(_this7, _Player_element, "f").dispatchEvent(e);

            var volumeEl = document.createElement('div');
            var action = IS_IOS || IS_ANDROID ? player_classPrivateFieldGet(_this7, _Player_options, "f").labels.tap : player_classPrivateFieldGet(_this7, _Player_options, "f").labels.click;
            volumeEl.className = 'op-player__unmute';
            volumeEl.innerHTML = "<span>".concat(action, "</span>");
            volumeEl.tabIndex = 0;
            volumeEl.addEventListener('click', function () {
              _this7.activeElement().muted = false;
              _this7.activeElement().volume = player_classPrivateFieldGet(_this7, _Player_volume, "f");
              var event = addEvent('volumechange');

              player_classPrivateFieldGet(_this7, _Player_element, "f").dispatchEvent(event);

              removeElement(volumeEl);
            }, EVENT_OPTIONS);

            var target = _this7.getContainer();

            target.insertBefore(volumeEl, target.firstChild);
          } else {
            _this7.activeElement().muted = player_classPrivateFieldGet(_this7, _Player_element, "f").muted;
            _this7.activeElement().volume = player_classPrivateFieldGet(_this7, _Player_volume, "f");
          }

          if (player_classPrivateFieldGet(_this7, _Player_ads, "f")) {
            var adsOptions = player_classPrivateFieldGet(_this7, _Player_options, "f") && player_classPrivateFieldGet(_this7, _Player_options, "f").ads ? player_classPrivateFieldGet(_this7, _Player_options, "f").ads : undefined;

            player_classPrivateFieldSet(_this7, _Player_adsInstance, new media_ads(_this7, player_classPrivateFieldGet(_this7, _Player_ads, "f"), player_classPrivateFieldGet(_this7, _Player_canAutoplay, "f"), player_classPrivateFieldGet(_this7, _Player_canAutoplayMuted, "f"), adsOptions), "f");
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

      player_classPrivateFieldSet(this, _Player_options, Object.assign(Object.assign({}, player_classPrivateFieldGet(this, _Player_defaultOptions, "f")), playerOptions), "f");

      if (playerOptions) {
        var objectElements = ['labels', 'controls'];
        objectElements.forEach(function (item) {
          player_classPrivateFieldGet(_this8, _Player_options, "f")[item] = playerOptions[item] && Object.keys(playerOptions[item]).length ? Object.assign(Object.assign({}, player_classPrivateFieldGet(_this8, _Player_defaultOptions, "f")[item]), playerOptions[item]) : player_classPrivateFieldGet(_this8, _Player_defaultOptions, "f")[item];
        });
      }
    }
  }, {
    key: "_enableKeyBindings",
    value: function _enableKeyBindings(e) {
      var _a;

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

            var step = el.duration !== Infinity ? newStep : this.getOptions().progress.duration;
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

_Player_controls = new WeakMap(), _Player_adsInstance = new WeakMap(), _Player_uid = new WeakMap(), _Player_element = new WeakMap(), _Player_ads = new WeakMap(), _Player_media = new WeakMap(), _Player_events = new WeakMap(), _Player_autoplay = new WeakMap(), _Player_volume = new WeakMap(), _Player_canAutoplay = new WeakMap(), _Player_canAutoplayMuted = new WeakMap(), _Player_processedAutoplay = new WeakMap(), _Player_options = new WeakMap(), _Player_customControlItems = new WeakMap(), _Player_fullscreen = new WeakMap(), _Player_defaultOptions = new WeakMap();
player_Player.instances = {};
player_Player.customMedia = {
  media: {},
  optionsKey: {},
  rules: []
};
/* harmony default export */ var js_player = __webpack_exports__["default"] = (player_Player);

if (typeof window !== 'undefined') {
  window.OpenPlayer = player_Player;
  window.OpenPlayerJS = player_Player;
  player_Player.init();
}

/***/ })
/******/ ])["default"];
});