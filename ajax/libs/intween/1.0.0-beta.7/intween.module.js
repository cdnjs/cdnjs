/**
 * InTween 1.0.0-beta.7
 * @license MIT
 * Copyright 2021-present Jasper Palfree
 */
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

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
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

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
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

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var identity = function identity(a) {
  return a;
};
var objectCtorString = Function.prototype.toString.call(Object);
var toString$1 = Object.prototype.toString;
var typeName = function typeName(v) {
  return toString$1.call(v).slice(8, -1);
}; // From js - https://github.com/tweenjs/tween.js/blob/master/src/Tween.js
// Include a performance.now polyfill.
// In node.js, use process.hrtime.

var now = function () {
  if (typeof window === 'undefined' && typeof process !== 'undefined') {
    return function now() {
      var time = process.hrtime(); // Convert [seconds, nanoseconds] to milliseconds.

      return time[0] * 1000 + time[1] / 1000000;
    };
  } else if (typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined) {
    // In a browser, use window.performance.now if it is available.
    // This must be bound, because directly assigning this function
    // leads to an invocation exception in Chrome.
    return window.performance.now.bind(window.performance);
  } else if (Date.now !== undefined) {
    // Use Date.now if it is available.
    return Date.now;
  } else {
    // Otherwise, use 'new Date().getTime()'.
    return function now() {
      return new Date().getTime();
    };
  }
}();
var castArray = function castArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
};
var lerp = function lerp(from, to, t) {
  return from * (1 - t) + to * t;
};
var invLerp = function invLerp(from, to, x) {
  var diff = to - from;
  return diff ? (x - from) / diff : 1;
};
var clamp = function clamp(min, max, v) {
  return Math.min(Math.max(v, min), max);
};
var lerpClamped = function lerpClamped(from, to, t) {
  return lerp(from, to, clamp(0, 1, t));
};
var invLerpClamped = function invLerpClamped(from, to, x) {
  return clamp(0, 1, invLerp(from, to, x));
};
var cloneDeep = function cloneDeep(obj) {
  if (typeof obj === 'function') {
    return obj;
  }

  var out = Array.isArray(obj) ? [] : {};

  for (var key in obj) {
    var value = obj[key];
    var type = typeName(value);

    if (type === 'Array' || type === 'Object') {
      out[key] = cloneDeep(value);
    } else if (type === 'Date') {
      out[key] = new Date(value.getTime());
    } else {
      out[key] = value;
    }
  }

  return out;
};
var isObjectLike = function isObjectLike(v) {
  return v !== null && typeof v === 'object';
};
var isPlainObject = function isPlainObject(value) {
  if (!isObjectLike(value)) {
    return false;
  }

  var proto = Object.getPrototypeOf(value);

  if (proto === null) {
    return true;
  }

  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor === 'function' && Ctor instanceof Ctor && Function.prototype.toString.call(Ctor) === objectCtorString;
};
var filterObjectValues = function filterObjectValues(obj, fn) {
  var out = {};

  for (var key in obj) {
    var value = obj[key];

    if (fn(value, key)) {
      out[key] = value;
    }
  }

  return out;
};
var sanitizedObject = function sanitizedObject(obj) {
  return filterObjectValues(obj, function (v) {
    return v !== undefined;
  });
};
var mapProperties = function mapProperties(obj, fn) {
  var out = {};

  for (var key in obj) {
    out[key] = fn(obj[key], key);
  }

  return out;
};
var pick = function pick(obj, keys) {
  if (keys === void 0) {
    keys = [];
  }

  if (!keys) {
    // all
    return _extends({}, obj);
  }

  var out = {};

  for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
    var key = _step.value;
    out[key] = obj[key];
  }

  return out;
}; // Only take properties that are present in
// first object
// ---------------------------------------

var mergeIntersecting = function mergeIntersecting(first, second) {
  return _extends({}, first, pick(second, Object.keys(first)));
};
/**
 * util.sortedIndex( array, value[, callback] ) -> Number
 * - array (Array): The array to inspect
 * - value (Mixed): The value to evaluate
 * - callback (Function): Function called per iteration
 * - retHighest (Boolean): Specify returning the highest qualified index
 *
 * Implementation of [lodash.sortedIndex](http://lodash.com/docs#sortedIndex).
 **/

var sortedIndex = function sortedIndex(array, value, callback, retHighest) {
  var low = 0;
  var high = array ? array.length : low; // explicitly reference `identity` for better inlining in Firefox

  callback = callback || identity;
  value = callback(value);

  while (low < high) {
    var mid = low + high >>> 1;
    var computed = callback(array[mid]);

    if (retHighest ? computed <= value : computed < value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
};
var getIntersectingPaths = function getIntersectingPaths(o1, o2) {
  return Object.keys(o1).filter(Object.prototype.hasOwnProperty.bind(o2));
};
var pull = function pull(arr, o) {
  var idx = arr.indexOf(o);
  arr.splice(idx, 1);
  return arr;
};
function shortestModDist(a0, a1, modulo) {
  var da = a1 - a0;
  var frac = da / modulo;
  var cycles = Math.floor(frac);
  var d = frac - cycles;
  var fix = d > 0.5 ? -1 : d < -0.5 ? 1 : 0;
  return (d + fix + cycles) * modulo;
}
var combineEasing = function combineEasing() {
  for (var _len = arguments.length, easings = new Array(_len), _key = 0; _key < _len; _key++) {
    easings[_key] = arguments[_key];
  }

  var num = easings.length;

  if (num === 1) {
    return easings[0];
  }

  var invNum = 1 / num;
  return function (t) {
    var p = t * num;
    var i = clamp(0, num - 1, Math.floor(p));
    return (easings[i](p - i) + i) * invNum;
  };
};

function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input) {
    return fns.reduce(function (prev, fn) {
      return fn(prev);
    }, input);
  };
}
function pipe() {
  for (var _len = arguments.length, ops = new Array(_len), _key = 0; _key < _len; _key++) {
    ops[_key] = arguments[_key];
  }

  return pipeFromArray(ops);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var check$1 = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global_1$1 = // eslint-disable-next-line es/no-global-this -- safe
check$1(typeof globalThis == 'object' && globalThis) || check$1(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check$1(typeof self == 'object' && self) || check$1(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

var path$1 = global_1$1;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$1 = function requireObjectCoercible(it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// https://tc39.es/ecma262/#sec-toobject

var toObject$1 = function toObject(argument) {
  return Object(requireObjectCoercible$1(argument));
};

var hasOwnProperty$2 = {}.hasOwnProperty;

var has$2 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty$2.call(toObject$1(it), key);
};

var setGlobal$1 = function setGlobal(key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global_1$1, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global_1$1[key] = value;
  }

  return value;
};

var SHARED$1 = '__core-js_shared__';
var store$2 = global_1$1[SHARED$1] || setGlobal$1(SHARED$1, {});
var sharedStore$1 = store$2;

var shared$1 = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore$1[key] || (sharedStore$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.17.3',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
});

var id$1 = 0;
var postfix$1 = Math.random();

var uid$1 = function uid(key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix$1).toString(36);
};

var aFunction$2 = function aFunction(variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn$1 = function getBuiltIn(namespace, method) {
  return arguments.length < 2 ? aFunction$2(global_1$1[namespace]) : global_1$1[namespace] && global_1$1[namespace][method];
};

var engineUserAgent$1 = getBuiltIn$1('navigator', 'userAgent') || '';

var process$2 = global_1$1.process;
var Deno$1 = global_1$1.Deno;
var versions$1 = process$2 && process$2.versions || Deno$1 && Deno$1.version;
var v8$1 = versions$1 && versions$1.v8;
var match$1, version$1;

if (v8$1) {
  match$1 = v8$1.split('.');
  version$1 = match$1[0] < 4 ? 1 : match$1[0] + match$1[1];
} else if (engineUserAgent$1) {
  match$1 = engineUserAgent$1.match(/Edge\/(\d+)/);

  if (!match$1 || match$1[1] >= 74) {
    match$1 = engineUserAgent$1.match(/Chrome\/(\d+)/);
    if (match$1) version$1 = match$1[1];
  }
}

var engineV8Version$1 = version$1 && +version$1;

var fails$1 = function fails(exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/* eslint-disable es/no-symbol -- required for testing */
// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol$1 = !!Object.getOwnPropertySymbols && !fails$1(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && engineV8Version$1 && engineV8Version$1 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var useSymbolAsUid$1 = nativeSymbol$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore$1 = shared$1('wks');
var Symbol$2 = global_1$1.Symbol;
var createWellKnownSymbol$1 = useSymbolAsUid$1 ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$1;

var wellKnownSymbol$1 = function wellKnownSymbol(name) {
  if (!has$2(WellKnownSymbolsStore$1, name) || !(nativeSymbol$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
    if (nativeSymbol$1 && has$2(Symbol$2, name)) {
      WellKnownSymbolsStore$1[name] = Symbol$2[name];
    } else {
      WellKnownSymbolsStore$1[name] = createWellKnownSymbol$1('Symbol.' + name);
    }
  }

  return WellKnownSymbolsStore$1[name];
};

var f$5 = wellKnownSymbol$1;
var wellKnownSymbolWrapped$1 = {
  f: f$5
};

var descriptors$1 = !fails$1(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function get() {
      return 7;
    }
  })[1] != 7;
});

var isObject$1 = function isObject(it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var document$2 = global_1$1.document; // typeof document.createElement is 'object' in old IE

var EXISTS$1 = isObject$1(document$2) && isObject$1(document$2.createElement);

var documentCreateElement$1 = function documentCreateElement(it) {
  return EXISTS$1 ? document$2.createElement(it) : {};
};

var ie8DomDefine$1 = !descriptors$1 && !fails$1(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(documentCreateElement$1('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

var anObject$1 = function anObject(it) {
  if (!isObject$1(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

var isSymbol$1 = useSymbolAsUid$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$1('Symbol');
  return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
};

// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function ordinaryToPrimitive(input, pref) {
  var fn, val;
  if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject$1(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject$1(val = fn.call(input))) return val;
  if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject$1(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var TO_PRIMITIVE$1 = wellKnownSymbol$1('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$1 = function toPrimitive(input, pref) {
  if (!isObject$1(input) || isSymbol$1(input)) return input;
  var exoticToPrim = input[TO_PRIMITIVE$1];
  var result;

  if (exoticToPrim !== undefined) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject$1(result) || isSymbol$1(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive$1(input, pref);
};

// https://tc39.es/ecma262/#sec-topropertykey

var toPropertyKey$1 = function toPropertyKey(argument) {
  var key = toPrimitive$1(argument, 'string');
  return isSymbol$1(key) ? key : String(key);
};

var $defineProperty$1 = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

var f$4 = descriptors$1 ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
  anObject$1(O);
  P = toPropertyKey$1(P);
  anObject$1(Attributes);
  if (ie8DomDefine$1) try {
    return $defineProperty$1(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
var objectDefineProperty$1 = {
  f: f$4
};

var defineProperty$3 = objectDefineProperty$1.f;

var defineWellKnownSymbol$1 = function defineWellKnownSymbol(NAME) {
  var Symbol = path$1.Symbol || (path$1.Symbol = {});
  if (!has$2(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
    value: wellKnownSymbolWrapped$1.f(NAME)
  });
};

// https://github.com/tc39/proposal-observable

defineWellKnownSymbol$1('observable');

wellKnownSymbolWrapped$1.f('observable');

var check = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global_1 = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

var fails = function fails(exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var descriptors = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function get() {
      return 7;
    }
  })[1] != 7;
});

var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

var f$3 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;
var objectPropertyIsEnumerable = {
  f: f$3
};

var createPropertyDescriptor = function createPropertyDescriptor(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var classofRaw = function classofRaw(it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function requireObjectCoercible(it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

var toIndexedObject = function toIndexedObject(it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function isObject(it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var path = {};

var aFunction$1 = function aFunction(variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function getBuiltIn(namespace, method) {
  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process$1 = global_1.process;
var Deno = global_1.Deno;
var versions = process$1 && process$1.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

/* eslint-disable es/no-symbol -- required for testing */
// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && engineV8Version && engineV8Version < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var useSymbolAsUid = nativeSymbol && !Symbol.sham && typeof Symbol.iterator == 'symbol';

var isSymbol = useSymbolAsUid ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return typeof $Symbol == 'function' && Object(it) instanceof $Symbol;
};

// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive = function ordinaryToPrimitive(input, pref) {
  var fn, val;
  if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var setGlobal = function setGlobal(key, value) {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(global_1, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global_1[key] = value;
  }

  return value;
};

var SHARED = '__core-js_shared__';
var store$1 = global_1[SHARED] || setGlobal(SHARED, {});
var sharedStore = store$1;

var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.17.3',
    mode: 'pure' ,
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
});

// https://tc39.es/ecma262/#sec-toobject

var toObject = function toObject(argument) {
  return Object(requireObjectCoercible(argument));
};

var hasOwnProperty$1 = {}.hasOwnProperty;

var has$1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty$1.call(toObject(it), key);
};

var id = 0;
var postfix = Math.random();

var uid = function uid(key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function wellKnownSymbol(name) {
  if (!has$1(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (nativeSymbol && has$1(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  }

  return WellKnownSymbolsStore[name];
};

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive = function toPrimitive(input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = input[TO_PRIMITIVE];
  var result;

  if (exoticToPrim !== undefined) {
    if (pref === undefined) pref = 'default';
    result = exoticToPrim.call(input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

// https://tc39.es/ecma262/#sec-topropertykey

var toPropertyKey = function toPropertyKey(argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : String(key);
};

var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function documentCreateElement(it) {
  return EXISTS ? document$1.createElement(it) : {};
};

var ie8DomDefine = !descriptors && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

var f$2 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (ie8DomDefine) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has$1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};
var objectGetOwnPropertyDescriptor = {
  f: f$2
};

var replacement = /#|\.prototype\./;

var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
var isForced_1 = isForced;

var aFunction = function aFunction(it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

var functionBindContext = function functionBindContext(fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function () {
    return fn.apply(that, arguments);
  };
};

var anObject = function anObject(it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

var $defineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

var f$1 = descriptors ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
var objectDefineProperty = {
  f: f$1
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

var wrapConstructor = function wrapConstructor(NativeConstructor) {
  var Wrapper = function Wrapper(a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0:
          return new NativeConstructor();

        case 1:
          return new NativeConstructor(a);

        case 2:
          return new NativeConstructor(a, b);
      }

      return new NativeConstructor(a, b, c);
    }

    return NativeConstructor.apply(this, arguments);
  };

  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};
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
*/


var _export = function _export(options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;
  var nativeSource = GLOBAL ? global_1 : STATIC ? global_1[TARGET] : (global_1[TARGET] || {}).prototype;
  var target = GLOBAL ? path : path[TARGET] || createNonEnumerableProperty(path, TARGET, {})[TARGET];
  var targetPrototype = target.prototype;
  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

    USE_NATIVE = !FORCED && nativeSource && has$1(nativeSource, key);
    targetProperty = target[key];
    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key]; // export native or implementation

    sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue; // bind timers to global for call from export context

    if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global_1); // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty); // make static versions for prototype methods
    else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty); // default case
    else resultProperty = sourceProperty; // add a flag to not completely full polyfills

    if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    createNonEnumerableProperty(target, key, resultProperty);

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

      if (!has$1(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      } // export virtual prototype methods


      createNonEnumerableProperty(path[VIRTUAL_PROTOTYPE], key, sourceProperty); // export real prototype methods

      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};

var SPECIES = wellKnownSymbol('species');

var setSpecies = function setSpecies(CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function get() {
        return this;
      }
    });
  }
};

var anInstance = function anInstance(it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  }

  return it;
};

var redefine = function redefine(target, key, value, options) {
  if (options && options.enumerable) target[key] = value;else createNonEnumerableProperty(target, key, value);
};

var redefineAll = function redefineAll(target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];else redefine(target, key, src[key], options);
  }

  return target;
};

var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG$3] = 'z';
var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var iterators = {};

var ITERATOR$3 = wellKnownSymbol('iterator');

var getIteratorMethod = function getIteratorMethod(it) {
  if (it != undefined) return it[ITERATOR$3] || it['@@iterator'] || iterators[classof(it)];
};

var getIterator = function getIterator(it, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(it) : usingIterator;

  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  }

  return anObject(iteratorMethod.call(it));
};

// https://tc39.es/ecma262/#sec-getmethod

var getMethod = function getMethod(fn) {
  return fn == null ? undefined : aFunction(fn);
};

var ITERATOR$2 = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

var isArrayIteratorMethod = function isArrayIteratorMethod(it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
};

var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger

var toInteger = function toInteger(argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min$1 = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength = function toLength(argument) {
  return argument > 0 ? min$1(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var iteratorClose = function iteratorClose(iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);

  try {
    innerResult = iterator['return'];

    if (innerResult === undefined) {
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

var Result = function Result(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = function iterate(iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function stop(condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function callFn(value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      }

      return new Result(false);
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
  }

  return new Result(false);
};

var hostReportErrors = function hostReportErrors(a, b) {
  var console = global_1.console;

  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var functionToString = Function.toString; // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap$1 = global_1.WeakMap;
var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

var keys = shared('keys');

var sharedKey = function sharedKey(key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global_1.WeakMap;
var set, get, has;

var enforce = function enforce(it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (nativeWeakMap || sharedStore.state) {
  var store = sharedStore.state || (sharedStore.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set = function set(it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function get(it) {
    return wmget.call(store, it) || {};
  };

  has = function has(it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function set(it, metadata) {
    if (has$1(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function get(it) {
    return has$1(it, STATE) ? it[STATE] : {};
  };

  has = function has(it) {
    return has$1(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var defineProperty$2 = objectDefineProperty.f;
var OBSERVABLE = wellKnownSymbol('observable');
var getInternalState$2 = internalState.get;
var setInternalState$2 = internalState.set;

var cleanupSubscription = function cleanupSubscription(subscriptionState) {
  var cleanup = subscriptionState.cleanup;

  if (cleanup) {
    subscriptionState.cleanup = undefined;

    try {
      cleanup();
    } catch (error) {
      hostReportErrors(error);
    }
  }
};

var subscriptionClosed = function subscriptionClosed(subscriptionState) {
  return subscriptionState.observer === undefined;
};

var close = function close(subscriptionState) {
  var subscription = subscriptionState.facade;

  if (!descriptors) {
    subscription.closed = true;
    var subscriptionObserver = subscriptionState.subscriptionObserver;
    if (subscriptionObserver) subscriptionObserver.closed = true;
  }

  subscriptionState.observer = undefined;
};

var Subscription = function Subscription(observer, subscriber) {
  var subscriptionState = setInternalState$2(this, {
    cleanup: undefined,
    observer: anObject(observer),
    subscriptionObserver: undefined
  });
  var start;
  if (!descriptors) this.closed = false;

  try {
    if (start = getMethod(observer.start)) start.call(observer, this);
  } catch (error) {
    hostReportErrors(error);
  }

  if (subscriptionClosed(subscriptionState)) return;
  var subscriptionObserver = subscriptionState.subscriptionObserver = new SubscriptionObserver(this);

  try {
    var cleanup = subscriber(subscriptionObserver);
    var subscription = cleanup;
    if (cleanup != null) subscriptionState.cleanup = typeof cleanup.unsubscribe === 'function' ? function () {
      subscription.unsubscribe();
    } : aFunction(cleanup);
  } catch (error) {
    subscriptionObserver.error(error);
    return;
  }

  if (subscriptionClosed(subscriptionState)) cleanupSubscription(subscriptionState);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() {
    var subscriptionState = getInternalState$2(this);

    if (!subscriptionClosed(subscriptionState)) {
      close(subscriptionState);
      cleanupSubscription(subscriptionState);
    }
  }
});
if (descriptors) defineProperty$2(Subscription.prototype, 'closed', {
  configurable: true,
  get: function get() {
    return subscriptionClosed(getInternalState$2(this));
  }
});

var SubscriptionObserver = function SubscriptionObserver(subscription) {
  setInternalState$2(this, {
    subscription: subscription
  });
  if (!descriptors) this.closed = false;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscriptionState = getInternalState$2(getInternalState$2(this).subscription);

    if (!subscriptionClosed(subscriptionState)) {
      var observer = subscriptionState.observer;

      try {
        var nextMethod = getMethod(observer.next);
        if (nextMethod) nextMethod.call(observer, value);
      } catch (error) {
        hostReportErrors(error);
      }
    }
  },
  error: function error(value) {
    var subscriptionState = getInternalState$2(getInternalState$2(this).subscription);

    if (!subscriptionClosed(subscriptionState)) {
      var observer = subscriptionState.observer;
      close(subscriptionState);

      try {
        var errorMethod = getMethod(observer.error);
        if (errorMethod) errorMethod.call(observer, value);else hostReportErrors(value);
      } catch (err) {
        hostReportErrors(err);
      }

      cleanupSubscription(subscriptionState);
    }
  },
  complete: function complete() {
    var subscriptionState = getInternalState$2(getInternalState$2(this).subscription);

    if (!subscriptionClosed(subscriptionState)) {
      var observer = subscriptionState.observer;
      close(subscriptionState);

      try {
        var completeMethod = getMethod(observer.complete);
        if (completeMethod) completeMethod.call(observer);
      } catch (error) {
        hostReportErrors(error);
      }

      cleanupSubscription(subscriptionState);
    }
  }
});
if (descriptors) defineProperty$2(SubscriptionObserver.prototype, 'closed', {
  configurable: true,
  get: function get() {
    return subscriptionClosed(getInternalState$2(getInternalState$2(this).subscription));
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable');
  setInternalState$2(this, {
    subscriber: aFunction(subscriber)
  });
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    var length = arguments.length;
    return new Subscription(typeof observer === 'function' ? {
      next: observer,
      error: length > 1 ? arguments[1] : undefined,
      complete: length > 2 ? arguments[2] : undefined
    } : isObject(observer) ? observer : {}, getInternalState$2(this).subscriber);
  }
});
redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var observableMethod = getMethod(anObject(x)[OBSERVABLE]);

    if (observableMethod) {
      var observable = anObject(observableMethod.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }

    var iterator = getIterator(x);
    return new C(function (observer) {
      iterate(iterator, function (it, stop) {
        observer.next(it);
        if (observer.closed) return stop();
      }, {
        IS_ITERATOR: true,
        INTERRUPTED: true
      });
      observer.complete();
    });
  },
  of: function of() {
    var C = typeof this === 'function' ? this : $Observable;
    var length = arguments.length;
    var items = new Array(length);
    var index = 0;

    while (index < length) {
      items[index] = arguments[index++];
    }

    return new C(function (observer) {
      for (var i = 0; i < length; i++) {
        observer.next(items[i]);
        if (observer.closed) return;
      }

      observer.complete();
    });
  }
});
createNonEnumerableProperty($Observable.prototype, OBSERVABLE, function () {
  return this;
});
_export({
  global: true
}, {
  Observable: $Observable
});
setSpecies('Observable');

var f = wellKnownSymbol;
var wellKnownSymbolWrapped = {
  f: f
};

var defineProperty$1 = objectDefineProperty.f;

var defineWellKnownSymbol = function defineWellKnownSymbol(NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has$1(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
    value: wellKnownSymbolWrapped.f(NAME)
  });
};

// https://github.com/tc39/proposal-observable

defineWellKnownSymbol('observable');

var toString_1 = function toString_1(argument) {
  if (isSymbol(argument)) throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};

var createMethod$1 = function createMethod(CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString_1(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true)
};

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex = function toAbsoluteIndex(index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;

var objectKeysInternal = function objectKeysInternal(object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    !has$1(hiddenKeys, key) && has$1(O, key) && result.push(key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (has$1(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
  }

  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe

var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) {
    objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  }

  return O;
};

var html = getBuiltIn('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey('IE_PROTO');

var EmptyConstructor = function EmptyConstructor() {
  /* empty */
};

var scriptTag = function scriptTag(content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var _NullProtoObject = function NullProtoObject() {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  _NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
  : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

  var length = enumBugKeys.length;

  while (length--) {
    delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  }

  return _NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

var objectCreate = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO$1] = O;
  } else result = _NullProtoObject();

  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

var correctPrototypeGetter = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe

var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has$1(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype : null;
};

var ITERATOR$1 = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false; // `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object

var IteratorPrototype$1, PrototypeOfArrayIteratorPrototype, arrayIterator;
/* eslint-disable es/no-array-prototype-keys -- safe */

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$1 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$1 == undefined || fails(function () {
  var test = {}; // FF44- legacy iterators case

  return IteratorPrototype$1[ITERATOR$1].call(test) !== test;
});
if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$1 = {};else IteratorPrototype$1 = objectCreate(IteratorPrototype$1); // `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

if (typeof IteratorPrototype$1[ITERATOR$1] !== 'function') {
  createNonEnumerableProperty(IteratorPrototype$1, ITERATOR$1, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$1,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

// https://tc39.es/ecma262/#sec-object.prototype.tostring


var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

var defineProperty = objectDefineProperty.f;
var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');

var setToStringTag = function setToStringTag(it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;

    if (!has$1(target, TO_STRING_TAG$1)) {
      defineProperty(target, TO_STRING_TAG$1, {
        configurable: true,
        value: TAG
      });
    }

    if (SET_METHOD && !toStringTagSupport) {
      createNonEnumerableProperty(target, 'toString', objectToString);
    }
  }
};

var IteratorPrototype = iteratorsCore.IteratorPrototype;

var returnThis$1 = function returnThis() {
  return this;
};

var createIteratorConstructor = function createIteratorConstructor(IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var aPossiblePrototype = function aPossiblePrototype(it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};

/* eslint-disable no-proto -- safe */
// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe

Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function returnThis() {
  return this;
};

var defineIterator = function defineIterator(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function getIterationMethod(KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      iterators[TO_STRING_TAG] = returnThis;
    }
  } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if ((FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }

  iterators[NAME] = defaultIterator; // export additional methods

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
    } else _export({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};

var charAt = stringMultibyte.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState$1(this, {
    type: STRING_ITERATOR,
    string: toString_1(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$1(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
});

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator

defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject

iterators.Arguments = iterators.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
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

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }

  iterators[COLLECTION_NAME] = iterators.Array;
}

var observable = path.Observable;

var Observable = /*#__PURE__*/function (_Obs) {
  _inheritsLoose(Observable, _Obs);

  function Observable(subscriber) {
    return _Obs.call(this, subscriber || identity) || this;
  }

  var _proto = Observable.prototype;

  _proto.pipe = function pipe() {
    for (var _len = arguments.length, ops = new Array(_len), _key = 0; _key < _len; _key++) {
      ops[_key] = arguments[_key];
    }

    return pipeFromArray(ops)(this);
  } // needed to interop with rxjs
  ;

  _proto.lift = function lift(operator) {
    var _this = this;

    return new Observable(function (sink) {
      return operator.call(sink, _this);
    });
  };

  _proto['@@observable'] = function observable() {
    return this;
  };

  return Observable;
}(observable);

var Subject = /*#__PURE__*/function (_Observable) {
  _inheritsLoose(Subject, _Observable);

  function Subject() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Observable.call.apply(_Observable, [this].concat(args)) || this;
    _this.closed = false;
    _this.observers = [];
    return _this;
  }

  var _proto = Subject.prototype;

  _proto.unsubscribe = function unsubscribe() {
    this.isStopped = this.closed = true;
    this.observers = null;
  };

  _proto.next = function next(value) {
    this._throwIfClosed();

    if (!this.isStopped) {
      var copy = this.observers.slice();

      for (var _iterator = _createForOfIteratorHelperLoose(copy), _step; !(_step = _iterator()).done;) {
        var observer = _step.value;
        observer.next(value);
      }
    }
  };

  _proto.error = function error(err) {
    this._throwIfClosed();

    if (!this.isStopped) {
      this.hasError = this.isStopped = true;
      this.thrownError = err;
      var observers = this.observers;

      while (observers.length) {
        observers.shift().error(err);
      }
    }
  };

  _proto.complete = function complete() {
    this._throwIfClosed();

    if (!this.isStopped) {
      this.isStopped = true;
      var observers = this.observers;

      while (observers.length) {
        observers.shift().complete();
      }
    }
  };

  _proto.subscribe = function subscribe(subscriber) {
    var _this2 = this;

    var len = this.observers.push(subscriber);
    return {
      unsubscribe: function unsubscribe() {
        _this2.observers.splice(len - 1, 1);
      }
    };
  };

  _proto._throwIfClosed = function _throwIfClosed() {
    if (this.closed) {
      throw new Error('Subscription closed!');
    }
  };

  return Subject;
}(Observable);

var map = function map(fn) {
  return function (source) {
    return new Observable(function (sink) {
      return source.subscribe({
        next: function next(value) {
          try {
            value = fn(value);
            sink.next(value);
          } catch (e) {
            sink.error(e);
          }
        },
        error: function error(e) {
          sink.error(e);
        },
        complete: function complete() {
          sink.complete();
        }
      });
    });
  };
}; // Emits all values from all inputs in parallel
// Copyright (c) 2018 zenparsing (Kevin Smith)

function merge() {
  for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  return new Observable(function (observer) {
    if (sources.length === 0) {
      return Observable.from([]);
    }

    var count = sources.length;
    var subscriptions = sources.map(function (source) {
      return Observable.from(source).subscribe({
        next: function next(v) {
          observer.next(v);
        },
        error: function error(e) {
          observer.error(e);
        },
        complete: function complete() {
          if (--count === 0) {
            observer.complete();
          }
        }
      });
    });
    return function () {
      return subscriptions.forEach(function (s) {
        return s.unsubscribe();
      });
    };
  });
} // Emits arrays containing the most current values from each input
// Copyright (c) 2018 zenparsing (Kevin Smith)

function combineLatest() {
  for (var _len2 = arguments.length, sources = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    sources[_key2] = arguments[_key2];
  }

  return new Observable(function (observer) {
    if (sources.length === 0) {
      return Observable.from([]);
    }

    var count = sources.length;
    var seen = new Set();
    var seenAll = false;
    var values = sources.map(function () {
      return undefined;
    });
    var subscriptions = sources.map(function (source, index) {
      return Observable.from(source).subscribe({
        next: function next(v) {
          values[index] = v;

          if (!seenAll) {
            seen.add(index);

            if (seen.size !== sources.length) {
              return;
            }

            seen = null;
            seenAll = true;
          }

          observer.next(Array.from(values));
        },
        error: function error(e) {
          observer.error(e);
        },
        complete: function complete() {
          if (--count === 0) {
            observer.complete();
          }
        }
      });
    });
    return function () {
      return subscriptions.forEach(function (s) {
        return s.unsubscribe();
      });
    };
  });
} // Emits arrays containing the matching index values from each input
// Copyright (c) 2018 zenparsing (Kevin Smith)

function zip() {
  for (var _len3 = arguments.length, sources = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    sources[_key3] = arguments[_key3];
  }

  return new Observable(function (observer) {
    if (sources.length === 0) {
      return Observable.from([]);
    }

    var queues = sources.map(function () {
      return [];
    });

    function done() {
      return queues.some(function (q, i) {
        return q.length === 0 && subscriptions[i].closed;
      });
    }

    var subscriptions = sources.map(function (source, index) {
      return Observable.from(source).subscribe({
        next: function next(v) {
          queues[index].push(v);

          if (queues.every(function (q) {
            return q.length > 0;
          })) {
            observer.next(queues.map(function (q) {
              return q.shift();
            }));

            if (done()) {
              observer.complete();
            }
          }
        },
        error: function error(e) {
          observer.error(e);
        },
        complete: function complete() {
          if (done()) {
            observer.complete();
          }
        }
      });
    });
    return function () {
      return subscriptions.forEach(function (s) {
        return s.unsubscribe();
      });
    };
  });
}
var spreadCombineLatest = function spreadCombineLatest() {
  for (var _len4 = arguments.length, operators = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    operators[_key4] = arguments[_key4];
  }

  return function (source) {
    return new Observable(function (sink) {
      var subject = new Subject();
      var observables = operators.map(function (o) {
        return o(subject);
      });
      var sub = combineLatest.apply(void 0, observables).subscribe(sink);
      var sub2 = source.subscribe(subject);
      return function () {
        sub.unsubscribe();
        sub2.unsubscribe();
      };
    });
  };
};
var spreadAssign = function spreadAssign() {
  for (var _len5 = arguments.length, operators = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    operators[_key5] = arguments[_key5];
  }

  return function (source) {
    return pipe(map(function (results) {
      return Object.assign.apply(Object, [{}].concat(results));
    }))(spreadCombineLatest.apply(void 0, operators)(source));
  };
};

var Callable = /*#__PURE__*/function (_Function) {
  _inheritsLoose(Callable, _Function);

  function Callable() {
    var _this;

    _this = _Function.call(this, '...args', 'return this._bound.__call__(...args)') || this;
    _this._bound = _this.bind(_assertThisInitialized(_this));
    return _this._bound || _assertThisInitialized(_this);
  }

  var _proto = Callable.prototype;

  _proto.__call__ = function __call__() {};

  return Callable;
}( /*#__PURE__*/_wrapNativeSuper(Function));

var defaultPriority = 1;

function getPriority(val) {
  return val._priority_;
}

var Emitter = /*#__PURE__*/function (_Observable) {
  _inheritsLoose(Emitter, _Observable);

  function Emitter(subscriber) {
    var _this;

    _this = _Observable.call(this, subscriber) || this; // ensure topics hash is initialized

    _this._topics = _this._topics || (_this._topics = {});
    return _this;
  }

  var _proto = Emitter.prototype;

  _proto.fromEvent = function fromEvent(topic, priority) {
    var _this2 = this;

    return new Observable(function (sink) {
      var callback = function callback(v) {
        return sink.next(v);
      };

      _this2.on(topic, callback, priority);

      return function () {
        _this2.off(topic, callback);
      };
    });
  }
  /**
  * Emitter#on( topic, fn( data, event )[, scope, priority] ) -> this
  * Emitter#on( topicConfig[, scope, priority] ) -> this
  * - topic (String): The topic name
  * - topicConfig (Object): A config with key/value pairs of `{ topic: callbackFn, ... }`
  * - fn (Function): The callback function (if not using Object as previous argument)
  * - data (Mixed): The data sent from the call to `.emit()`
  * - event (Object): Event data, holding `.topic`, the topic, and `.handler`, the `fn` callback.
  * - scope (Object): The scope to bind callback to
  * - priority (Number): The priority of the callback (higher is earlier)
  *
  * Subscribe callback(s) to a topic(s).
  **/
  ;

  _proto.on = function on(topic, fn, scope, priority) {
    // check if we're subscribing to multiple topics
    // with an object
    if (typeof topic === 'object') {
      for (var t in topic) {
        this.on(t, topic[t], fn, scope);
      }

      return this;
    }

    var listeners = this._topics[topic] || (this._topics[topic] = []);
    var orig = fn;

    if (typeof scope === 'object') {
      fn = fn.bind(scope);
      fn._bindfn_ = orig;
      fn._one_ = orig._one_;
      fn._scope_ = scope;
    } else if (priority === undefined) {
      priority = scope;
    }

    fn._priority_ = priority === undefined ? defaultPriority : priority;
    var idx = sortedIndex(listeners, fn, getPriority);
    listeners.splice(idx, 0, fn);
    return this;
  }
  /**
  * Emitter#off( topic, fn[, scope] ) -> this
  * Emitter#off( topicCfg ) -> this
  * - topic (String): topic The topic name. Specify `true` to remove all listeners for all topics
  * - topicCfg (Object): A config with key/value pairs of `{ topic: callbackFn, ... }`
  * - fn (Function): The original callback function. Specify `true` to remove all listeners for specified topic
  * - scope (Object): The scope the callback was bound to. This is important if you are
  *   binding methods that come from object prototypes.
  *
  * Unsubscribe callback(s) from topic(s).
  **/
  ;

  _proto.off = function off(topic, fn, scope) {
    if (topic === true) {
      // purge all listeners
      this._topics = {};
      return this;
    } // check if we're subscribing to multiple topics
    // with an object


    if (typeof topic === 'object') {
      for (var t in topic) {
        this.off(t, topic[t], fn);
      }

      return this;
    }

    var listeners = this._topics[topic];

    if (!listeners) {
      return this;
    }

    if (fn === true) {
      // purge all listeners for topic
      this._topics[topic] = [];
      return this;
    }

    for (var i = 0, l = listeners.length; i < l; i++) {
      var listn = listeners[i];

      if ((listn._bindfn_ === fn || listn === fn) && (!scope || listn._scope_ === scope) // check the scope too if specified
      ) {
        listeners.splice(i, 1);
        break;
      }
    }

    return this;
  }
  /**
  * Emitter#emit( topic[, data] ) -> this
  * - topic (String): The topic name
  * - data (Mixed): The data to send
  *
  * Publish data to a topic.
  **/
  ;

  _proto.emit = function emit(topic, data) {
    var listeners = this._topics[topic];
    var l = listeners && listeners.length;

    if (!l) {
      return this;
    }

    var e = {}; // event data

    e.topic = topic; // reverse iterate so priorities work out correctly

    while (l--) {
      var handler = listeners[l];
      handler(data, e); // if _one_ flag is set, the unsubscribe

      if (handler._one_) {
        listeners.splice(l, 1);
      }
    }

    return this;
  }
  /**
  * Emitter#one( topic, fn( data, event )[, scope, priority] ) -> this
  * Emitter#one( topicConfig[, scope, priority] ) -> this
  * - topic (String): The topic name
  * - topicConfig (Object): A config with key/value pairs of `{ topic: callbackFn, ... }`
  * - fn (Function): The callback function (if not using Object as previous argument)
  * - data (Mixed): The data sent from the call to `.emit()`
  * - event (Object): Event data, holding `.topic`, the topic, and `.handler`, the `fn` callback.
  * - scope (Object): The scope to bind callback to
  * - priority (Number): The priority of the callback (higher is earlier)
  *
  * Subscribe callback(s) to a topic(s), but only ONCE.
  **/
  ;

  _proto.one = function one(topic, fn, scope) {
    // check if we're subscribing to multiple topics
    // with an object
    if (typeof topic === 'object') {
      for (var t in topic) {
        this.one(t, topic[t], fn, scope);
      }

      return this;
    } // set the _one_ flag


    fn._one_ = true;
    this.on(topic, fn, scope);
    return this;
  };

  return Emitter;
}(Observable);

var index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Callable: Callable,
  Emitter: Emitter,
  identity: identity,
  typeName: typeName,
  now: now,
  castArray: castArray,
  lerp: lerp,
  invLerp: invLerp,
  clamp: clamp,
  lerpClamped: lerpClamped,
  invLerpClamped: invLerpClamped,
  cloneDeep: cloneDeep,
  isObjectLike: isObjectLike,
  isPlainObject: isPlainObject,
  filterObjectValues: filterObjectValues,
  sanitizedObject: sanitizedObject,
  mapProperties: mapProperties,
  pick: pick,
  mergeIntersecting: mergeIntersecting,
  sortedIndex: sortedIndex,
  getIntersectingPaths: getIntersectingPaths,
  pull: pull,
  shortestModDist: shortestModDist,
  combineEasing: combineEasing
});

/**
 * Easing adapted from phaser
 * https://github.com/photonstorm/phaser/tree/master/src/math/easing
 * license: https://opensource.org/licenses/MIT
 */
var Pi2$1 = Math.PI * 2;
/*
 * @param {number} [amplitude=0.1] - The amplitude of the elastic ease.
 * @param {number} [period = 0.1] - Sets how tight the sine - wave is,
 * where smaller values are tighter waves, which result in more cycles.
 */

var makeElasticIn = function makeElasticIn(a, p) {
  if (a === void 0) {
    a = 0.1;
  }

  if (p === void 0) {
    p = 0.1;
  }

  var s = p / 4;

  if (a < 1) {
    a = 1;
  } else {
    s = p * Math.asin(1 / a) / Pi2$1;
  }

  var w = Pi2$1 / p;
  return function (t) {
    if (t === 0) return 0;
    if (t === 1) return 1;
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * w));
  };
};
/*
 * @param {number} [amplitude=0.1] - The amplitude of the elastic ease.
 * @param {number} [period = 0.1] - Sets how tight the sine - wave is,
 * where smaller values are tighter waves, which result in more cycles.
 */

var makeElasticOut = function makeElasticOut(a, p) {
  if (a === void 0) {
    a = 0.1;
  }

  if (p === void 0) {
    p = 0.1;
  }

  var s = p / 4;

  if (a < 1) {
    a = 1;
  } else {
    s = p * Math.asin(1 / a) / Pi2$1;
  }

  var w = Pi2$1 / p;
  return function (t) {
    if (t === 0) return 0;
    if (t === 1) return 1;
    return a * Math.pow(2, -10 * t) * Math.sin((t - s) * w) + 1;
  };
};
/*
 * @param {number} [amplitude=0.1] - The amplitude of the elastic ease.
 * @param {number} [period = 0.1] - Sets how tight the sine - wave is,
 * where smaller values are tighter waves, which result in more cycles.
 */

var makeElasticInOut = function makeElasticInOut(a, p) {
  if (a === void 0) {
    a = 0.1;
  }

  if (p === void 0) {
    p = 0.1;
  }

  var s = p / 4;

  if (a < 1) {
    a = 1;
  } else {
    s = p * Math.asin(1 / a) / Pi2$1;
  }

  var w = Pi2$1 / p;
  return function (t) {
    if (t === 0) return 0;
    if (t === 1) return 1;

    if ((t *= 2) < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * w));
    } else {
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * w) * 0.5 + 1;
    }
  };
};
var makeBackIn = function makeBackIn(overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  return function (t) {
    return t * t * ((overshoot + 1) * t - overshoot);
  };
};
var makeBackOut = function makeBackOut(overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  return function (t) {
    return --t * t * ((overshoot + 1) * t + overshoot) + 1;
  };
};
var makeBackInOut = function makeBackInOut(overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  return function (t) {
    var s = overshoot * 1.525;

    if ((t *= 2) < 1) {
      return 0.5 * (t * t * ((s + 1) * t - s));
    } else {
      return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
    }
  };
};
var makeSteps = function makeSteps(steps) {
  if (steps === void 0) {
    steps = 1;
  }

  return function (t) {
    return ((steps * t | 0) + 1) * (1 / steps);
  };
};

/**
 * Easing adapted from phaser
 * https://github.com/photonstorm/phaser/tree/master/src/math/easing
 * license: https://opensource.org/licenses/MIT
 */
var halfPi = Math.PI / 2;
var linear$1 = function linear(t) {
  return t;
};
var quadIn = function quadIn(t) {
  return t * t;
};
var quadOut = function quadOut(t) {
  return t * (2 - t);
};
var quadInOut = function quadInOut(t) {
  return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
};
var cubicIn = function cubicIn(t) {
  return t * t * t;
};
var cubicOut = function cubicOut(t) {
  return --t * t * t + 1;
};
var cubicInOut = function cubicInOut(t) {
  return (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
};
var quartIn = function quartIn(t) {
  return t * t * t * t;
};
var quartOut = function quartOut(t) {
  return 1 - --t * t * t * t;
};
var quartInOut = function quartInOut(t) {
  return (t *= 2) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
};
var quintIn = function quintIn(t) {
  return t * t * t * t * t;
};
var quintOut = function quintOut(t) {
  return --t * t * t * t * t + 1;
};
var quintInOut = function quintInOut(t) {
  return (t *= 2) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2);
};
var sinIn = function sinIn(t) {
  return 1 - Math.cos(t * halfPi);
};
var sinOut = function sinOut(t) {
  return Math.sin(t * halfPi);
};
var sinInOut = function sinInOut(t) {
  return 0.5 * (1 - Math.cos(Math.PI * t));
};
var expIn = function expIn(t) {
  return t === 0 ? 0 : Math.pow(1024, t - 1);
};
var expOut = function expOut(t) {
  return t === 0 ? 0 : 1 - Math.pow(1024, -t);
};
var expInOut = function expInOut(t) {
  if (t === 0) return 0;
  if (t === 1) return 1;
  if ((t *= 2) < 1) return 0.5 * Math.pow(1024, t - 1);
  return 0.5 * (2 - Math.pow(1024, 1 - t));
};
var elasticIn = makeElasticIn();
var elasticOut = makeElasticOut();
var elasticInOut = makeElasticInOut();
var circularIn = function circularIn(t) {
  return 1 - Math.sqrt(1 - t * t);
};
var circularOut = function circularOut(t) {
  return Math.sqrt(1 - --t * t);
};
var circularInOut = function circularInOut(t) {
  return (t *= 2) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
};
var bounceIn = function bounceIn(t) {
  t = 1 - t;
  if (t < 1 / 2.75) return 1 - 7.5625 * t * t;else if (t < 2 / 2.75) return 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75);else if (t < 2.5 / 2.75) return 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375);else return 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
};
var bounceOut = function bounceOut(t) {
  if (t < 1 / 2.75) return 7.5625 * t * t;else if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;else if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;else return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
};
var bounceInOut = function bounceInOut(t) {
  var reverse = false;

  if (t < 0.5) {
    t = 1 - t * 2;
    reverse = true;
  } else {
    t = t * 2 - 1;
  }

  if (t < 1 / 2.75) {
    t = 7.5625 * t * t;
  } else if (t < 2 / 2.75) {
    t = 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
  } else if (t < 2.5 / 2.75) {
    t = 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
  } else {
    t = 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  }

  if (reverse) {
    return (1 - t) * 0.5;
  } else {
    return t * 0.5 + 0.5;
  }
};
var backIn = makeBackIn();
var backOut = makeBackOut();
var backInOut = makeBackInOut();
var step$1 = makeSteps();

var Easing = /*#__PURE__*/Object.freeze({
  __proto__: null,
  linear: linear$1,
  quadIn: quadIn,
  quadOut: quadOut,
  quadInOut: quadInOut,
  cubicIn: cubicIn,
  cubicOut: cubicOut,
  cubicInOut: cubicInOut,
  quartIn: quartIn,
  quartOut: quartOut,
  quartInOut: quartInOut,
  quintIn: quintIn,
  quintOut: quintOut,
  quintInOut: quintInOut,
  sinIn: sinIn,
  sinOut: sinOut,
  sinInOut: sinInOut,
  expIn: expIn,
  expOut: expOut,
  expInOut: expInOut,
  elasticIn: elasticIn,
  elasticOut: elasticOut,
  elasticInOut: elasticInOut,
  circularIn: circularIn,
  circularOut: circularOut,
  circularInOut: circularInOut,
  bounceIn: bounceIn,
  bounceOut: bounceOut,
  bounceInOut: bounceInOut,
  backIn: backIn,
  backOut: backOut,
  backInOut: backInOut,
  step: step$1
});

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  makeElasticIn: makeElasticIn,
  makeElasticOut: makeElasticOut,
  makeElasticInOut: makeElasticInOut,
  makeBackIn: makeBackIn,
  makeBackOut: makeBackOut,
  makeBackInOut: makeBackInOut,
  makeSteps: makeSteps,
  linear: linear$1,
  quadIn: quadIn,
  quadOut: quadOut,
  quadInOut: quadInOut,
  cubicIn: cubicIn,
  cubicOut: cubicOut,
  cubicInOut: cubicInOut,
  quartIn: quartIn,
  quartOut: quartOut,
  quartInOut: quartInOut,
  quintIn: quintIn,
  quintOut: quintOut,
  quintInOut: quintInOut,
  sinIn: sinIn,
  sinOut: sinOut,
  sinInOut: sinInOut,
  expIn: expIn,
  expOut: expOut,
  expInOut: expInOut,
  elasticIn: elasticIn,
  elasticOut: elasticOut,
  elasticInOut: elasticInOut,
  circularIn: circularIn,
  circularOut: circularOut,
  circularInOut: circularInOut,
  bounceIn: bounceIn,
  bounceOut: bounceOut,
  bounceInOut: bounceInOut,
  backIn: backIn,
  backOut: backOut,
  backInOut: backInOut,
  step: step$1
});

var makeToggle = function makeToggle(threshold) {
  return function (from, to, t) {
    return t >= threshold ? to : from;
  };
};
var makeCyclic = function makeCyclic(len) {
  return function (from, to, t) {
    return from + shortestModDist(from, to, len) * t;
  };
};
var makeForArray = function makeForArray(interp) {
  return function (from, to, t) {
    return to.map(function (toVal, idx) {
      return interp(from[idx], toVal, t);
    });
  };
};

var Pi2 = Math.PI * 2;
var linear = function linear(from, to, t) {
  return lerp(from, to, t);
};
var radians = function radians(from, to, t) {
  return from + shortestModDist(from, to, Pi2) * t;
};
var degrees = function degrees(from, to, t) {
  return from + shortestModDist(from, to, 360) * t;
};
var array = makeForArray(lerp);
var object = function object(from, to, t) {
  return mapProperties(from, function (val, key) {
    return lerp(val, to[key], t);
  });
};
var string = function string(from, to, t) {
  if (t <= 0) {
    return from;
  }

  var length = lerp(0, to.length, t) | 0; // to integer

  return to.substr(0, length);
};
var toggle = makeToggle(1);

var Interpolators = /*#__PURE__*/Object.freeze({
  __proto__: null,
  linear: linear,
  radians: radians,
  degrees: degrees,
  array: array,
  object: object,
  string: string,
  toggle: toggle
});

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  makeToggle: makeToggle,
  makeCyclic: makeCyclic,
  makeForArray: makeForArray,
  linear: linear,
  radians: radians,
  degrees: degrees,
  array: array,
  object: object,
  string: string,
  toggle: toggle
});

function parseEasing(easing) {
  if (easing === undefined || easing === null) {
    return undefined;
  }

  if (typeof easing === 'string') {
    var easings = easing.replace(' ', '').split('+');

    if (easings.length === 1) {
      easing = easings[0];

      if (easing in Easing) {
        return Easing[easing];
      }
    } else {
      return combineEasing.apply(void 0, easings.map(parseEasing));
    }
  } else if (easing instanceof Function) {
    return easing;
  }

  throw new Error("Unrecognized easing name \"" + easing + "\"");
}

function parseInterpolator(interp) {
  if (interp === undefined || interp === null) {
    return false;
  }

  if (interp instanceof Function) {
    return interp;
  } else if (typeof interp === 'string') {
    if (interp in Interpolators) {
      return Interpolators[interp];
    }
  }

  throw new Error("Unrecognized interpolator name \"" + interp + "\"");
}

var NATIVE_TYPES = {
  'number': {
    type: 'number',
    default: 0,
    interpolator: linear
  },
  'string': {
    type: 'string',
    default: '',
    interpolator: string
  },
  'boolean': {
    type: 'boolean',
    default: false,
    interpolator: toggle
  },
  'array': {
    type: 'array',
    default: [],
    interpolator: array
  },
  'object': {
    type: 'object',
    default: {},
    interpolator: object
  }
};
var CUSTOM_TYPES = {};

function getCustomTypeByVal(val) {
  return Object.values(CUSTOM_TYPES).find(function (_ref) {
    var constructor = _ref.constructor;
    return val instanceof constructor;
  });
}

function getCustomTypeByConstructor(val) {
  return Object.values(CUSTOM_TYPES).find(function (_ref2) {
    var constructor = _ref2.constructor;
    return val === constructor;
  });
}

function registerType(cfg) {
  var type = cfg.type,
      interpolator = cfg.interpolator;

  if (!type || !interpolator || cfg.default === undefined) {
    throw new Error('Custom types must have "type", "default", and "interpolator" specified');
  }

  if (CUSTOM_TYPES[type]) {
    throw new Error("Custom type \"" + type + "\" is already registered");
  }

  CUSTOM_TYPES[type] = {
    type: type,
    interpolator: interpolator,
    default: cfg.default
  };

  if (cfg.default.constructor) {
    CUSTOM_TYPES[type].constructor = cfg.default.constructor;
  }
}
function inferType(val) {
  if (val === null) {
    throw new Error('Can not determine type of null value');
  }

  var type = typeof val;

  if (type === 'string') {
    if (val in CUSTOM_TYPES) {
      return val;
    }

    return 'string';
  }

  if (type === 'number') {
    return 'number';
  }

  if (type === 'boolean') {
    return 'boolean';
  }

  if (Array.isArray(val)) {
    return 'array';
  } // check custom types


  var custom = getCustomTypeByVal(val);

  if (custom) {
    return custom.type;
  }

  if (type === 'object') {
    return 'object';
  }

  return type;
}
function getType(type) {
  if (type === null) {
    throw new Error('Can not determine type of null value');
  }

  if (typeof type === 'string') {
    if (type in CUSTOM_TYPES) {
      return type;
    }

    return type;
  }

  if (type === Number || type === 'number') {
    return 'number';
  }

  if (type === Boolean || type === 'boolean') {
    return 'boolean';
  }

  if (type === String) {
    return 'string';
  }

  if (type === Array) {
    return 'array';
  } // check custom types


  var custom = getCustomTypeByConstructor(type);

  if (custom) {
    return custom.type;
  }

  if (type === Object || type === 'object') {
    return 'object';
  }

  return type;
}
function getTypeCfg(type) {
  var cfg = NATIVE_TYPES[type] || CUSTOM_TYPES[type];

  if (!cfg) {
    throw new Error("Unrecognized type " + type);
  }

  return cfg;
}

var TYPE_DEF_KEYS = ['value'].concat(Object.keys(getTypeCfg('object')));
var DEFAULT_EASING = 'linear';

function checkExplicitTypeDefinition(def) {
  var extraKeys = Object.keys(def).filter(function (k) {
    return TYPE_DEF_KEYS.indexOf(k) < 0;
  });

  if (extraKeys.length) {
    throw new Error('Type definition contains extra keys. Does your definition use "type" as a property name?');
  }
}

function getInterpolator(type, cfg, defaultVal) {
  if (type === 'array' && defaultVal && defaultVal.length) {
    var subSchema = parseSchemaProp(defaultVal[0]);
    return makeForArray(subSchema.interpolator);
  }

  return parseInterpolator(cfg.interpolator);
}

function parseSchemaProp(def) {
  var easing;
  var interpolator;
  var type;
  var cfg;
  var defaultVal;

  if (isPlainObject(def) && (def.value !== undefined || def.type !== undefined)) {
    checkExplicitTypeDefinition(def);
    type = getType(def.type) || inferType(def.value);
    cfg = getTypeCfg(type);
    defaultVal = def.value || cfg.default;
    easing = parseEasing(def.easing || DEFAULT_EASING);
    interpolator = parseInterpolator(def.interpolator) || getInterpolator(type, cfg, defaultVal);
  } else {
    type = inferType(def);
    cfg = getTypeCfg(type);
    easing = parseEasing(def.easing || DEFAULT_EASING);
    defaultVal = def;
    interpolator = getInterpolator(type, cfg, defaultVal);
  }

  return {
    type: type,
    easing: easing,
    default: defaultVal,
    interpolator: interpolator,
    def: def
  };
}
function createSchema(schemaDef) {
  return mapProperties(schemaDef, parseSchemaProp);
}
function createState(schema) {
  var state = {};
  var props = Object.keys(schema);

  for (var _i = 0, _props = props; _i < _props.length; _i++) {
    var prop = _props[_i];
    state[prop] = schema[prop].default;
  }

  return state;
}

var timeDecReg = /([0-9.]+)(s|m|h)?/;
var timeStdReg = /((\d\d):)?((\d\d):(\d\d))/;
var MINUTES = 60;
var HOURS = 60 * 60;

function getTime(h, m, s) {
  h = parseFloat(h || 0);
  m = parseFloat(m || 0);
  s = parseFloat(s || 0);
  return Math.round((h * HOURS + m * MINUTES + s) * 1000); // integer
} // returns parsed time in ms


function parseTime(strOrNumber) {
  if (typeof strOrNumber !== 'string') {
    return strOrNumber;
  }

  var parsed = strOrNumber.match(timeStdReg);

  if (parsed) {
    return getTime(parsed[2], parsed[4], parsed[5]);
  }

  parsed = strOrNumber.match(timeDecReg);

  if (parsed) {
    var unit = ('' + parsed[2]).toLowerCase();

    if (!parsed[1] || unit === 's') {
      return getTime(0, 0, parsed[1]);
    }

    if (unit === 'm') {
      return getTime(0, parsed[1], 0);
    }

    if (unit === 'h') {
      return getTime(parsed[1], 0, 0);
    }
  }

  return 0;
}

var pctReg = /^((\d{1,3})(\.\d*)?)%$/;
var META_PARSERS = {
  endTime: function endTime(v) {
    if (v === undefined) {
      return undefined;
    }

    return parseTime(v);
  },
  startTime: parseTime,
  duration: function duration(v) {
    if (v === undefined) {
      return undefined;
    }

    if (pctReg.test(v)) {
      return v;
    }

    return parseTime(v);
  },
  easing: parseEasing
}; // parse meta to standardized format

function parseMeta(meta, defaults) {
  var ret = _extends({}, defaults, sanitizedObject(meta)); // clone


  for (var key in META_PARSERS) {
    ret[key] = META_PARSERS[key](ret[key]);
  }

  return ret;
}

function createFrame(state, meta, defaultMetaOptions) {
  if (!state) {
    throw new Error('Can not create frame without state object');
  }

  if (typeof state !== 'object') {
    throw new Error('States must be plain objects');
  }

  state = cloneDeep(state);
  meta = parseMeta(meta || state.$meta, defaultMetaOptions);
  delete state.$meta;
  var percentDuration = pctReg.exec(meta.duration);

  if (percentDuration) {
    meta.implicit = true;
    meta.fractionalDuration = parseFloat(percentDuration[1]) / 100;
  } else if (meta.endTime !== undefined) {
    if (meta.startTime !== undefined) {
      meta.duration = meta.endTime - meta.startTime;
    } else {
      meta.startTime = meta.endTime - meta.duration;
    }
  } else {
    meta.endTime = meta.startTime + meta.duration;
  }

  return {
    state: state,
    meta: meta
  };
}

function createTransitionFromFrame(startTime, endTime, frame, previousState) {
  var endState = frame.state;
  var startState = pick(previousState, Object.keys(endState));
  var easing = frame.meta.easing;
  return {
    startTime: startTime,
    endTime: endTime,
    startState: startState,
    endState: endState,
    easing: easing,
    frame: frame
  };
}
function interpolateProperty(fn, from, to, progress) {
  return fn(from, to, progress);
}
function getInterpolatedState(schema, startState, endState, timeFraction, easing) {
  if (timeFraction <= 0) {
    return cloneDeep(startState);
  }

  if (timeFraction >= 1) {
    return cloneDeep(endState);
  }

  var nextState = cloneDeep(startState);

  for (var prop in endState) {
    var def = schema[prop];
    var val = void 0;

    if (!def) {
      // not specified in schema. just set
      val = endState[prop];
    } else {
      easing = easing || def.easing;
      var progress = easing(timeFraction);
      val = interpolateProperty(def.interpolator, startState[prop], endState[prop], progress);
    }

    nextState[prop] = val;
  }

  return nextState;
}

// ---------------------------------------

function getConflictingFrames(timeline) {
  var markers = [];
  var idx;

  for (var l = timeline.length, i = 0; i < l; i++) {
    var m = timeline[i];

    if (m.type === 'start') {
      markers.push(m);
    } else {
      // stop tracking its partner
      idx = markers.indexOf(m.start);
      markers.splice(idx, 1);
    }

    for (var _l = markers.length, _i = 0; _i < _l; _i++) {
      var _m = markers[_i];

      for (var j = _i + 1; j < _l; j++) {
        var paths = getIntersectingPaths(_m.transition.endState, markers[j].transition.endState);

        if (paths.length) {
          return {
            paths: paths,
            frames: [_m.frame, markers[j].frame]
          };
        }
      }
    }
  }

  return false;
}

function getPrevEndTime(timeline, idx, currTime) {
  for (var i = idx - 1; i >= 0; i--) {
    var ep = timeline[i]; // loop until previous end marker is found.
    // if they have the same end time, ignore

    if (ep.type === 'end' && currTime !== ep.time) {
      return ep.time;
    }
  }

  return 0;
} // Create a timeline array from specified frames
// ---------------------------------------


function createTimeline(schema, frames) {
  if (frames === void 0) {
    frames = [];
  }

  // timeline is an array of
  // marker = {
  //   type: 'start' | 'end'
  //   , time: Number
  //   , frame: {...}
  //   , start|end: <the other transiton>
  // }
  if (!frames.length) {
    return [];
  }

  var getTime = function getTime(v) {
    return v.time;
  };

  var defaultState = createState(schema);
  var timeline = []; // omit frames that are implicitly defined first

  var implicitFrames = frames.filter(function (f) {
    return f.meta.implicit;
  }).sort(function (a, b) {
    return a.meta.endTime - b.meta.endTime;
  });
  frames = frames.filter(function (f) {
    return !f.meta.implicit;
  });
  frames.forEach(function (frame) {
    var idx;
    var start = {
      type: 'start',
      frame: frame,
      time: frame.meta.endTime - frame.meta.duration
    };
    var end = {
      type: 'end',
      frame: frame,
      time: frame.meta.endTime
    };
    start.end = end;
    end.start = start;
    idx = sortedIndex(timeline, end, getTime);
    timeline.splice(idx, 0, end); // "start"s need to be after "end"s of equal time... but not after its own end

    idx = Math.min(idx, sortedIndex(timeline, start, getTime, true));
    timeline.splice(idx, 0, start);
  }); // insert frames with implicit timing

  implicitFrames.forEach(function (frame) {
    var end = {
      type: 'end',
      frame: frame,
      time: frame.meta.endTime
    };
    var idx = sortedIndex(timeline, end, getTime);
    var prevEndTime = getPrevEndTime(timeline, idx, end.time);
    var startTime = lerp(end.time, prevEndTime, frame.meta.fractionalDuration);
    var start = {
      type: 'start',
      frame: frame,
      time: startTime
    };
    start.end = end;
    end.start = start; // add the end

    timeline.splice(idx, 0, end); // "start"s need to be after "end"s of equal time

    idx = Math.min(idx, sortedIndex(timeline, start, getTime, true));
    timeline.splice(idx, 0, start);
  }); // assign inherited states

  var prevState = defaultState;
  timeline.forEach(function (m, idx) {
    // only go through ends
    if (m.type !== 'end') {
      return;
    }

    var transition = createTransitionFromFrame(m.start.time, m.time, m.frame, prevState);
    m.transition = transition;
    m.start.transition = transition;
    prevState = _extends({}, prevState, transition.endState);
  });
  prevState = defaultState; // assign a reduced end state to each marker

  timeline.forEach(function (m) {
    if (m.type !== 'end') {
      return;
    }

    var transitions = getTransitionsAtTime(timeline, m.time);
    prevState = reduceTransitions(schema, transitions, m.time, prevState);
    m.state = prevState;
  });
  var conflicts = getConflictingFrames(timeline);

  if (conflicts) {
    throw new Error('The following overlapping frames modify the same state paths:\n' + ("paths: " + conflicts.paths + "\n") + ("frames: " + JSON.stringify(conflicts.frames, null, 2)));
  }

  return timeline;
} // Get transition information needed
// at specified time from timeline
// ---------------------------------------

function getTransitionsAtTime(timeline, time) {
  var markers = [];
  var idx;

  for (var l = timeline.length, i = 0; i < l; i++) {
    var m = timeline[i];

    if (m.time > time) {
      break;
    }

    if (m.type === 'start') {
      markers.push(m);
    } else if (m.time !== time) {
      // if we're at the exact time of the end, track it
      // stop tracking its partner
      idx = markers.indexOf(m.start);
      markers.splice(idx, 1);
    }
  }

  return markers.map(function (a) {
    return a.transition;
  });
} // Get the cached complete state at the
// last end marker
// ---------------------------------------

function getStartState(timeline, time, defaultState) {
  var state = defaultState;

  for (var l = timeline.length, i = 0; i < l; i++) {
    var m = timeline[i];

    if (m.time > time) {
      return state;
    }

    if (m.type === 'end') {
      state = m.state;
    }
  }

  return state;
} // Get final state from transitions
// ---------------------------------------

function reduceTransitions(schema, transitions, time, initialState) {
  if (transitions === void 0) {
    transitions = [];
  }

  if (time === void 0) {
    time = 0;
  }

  if (initialState === void 0) {
    initialState = {};
  }

  return transitions.reduce(function (state, tr) {
    var progress = invLerpClamped(tr.startTime, tr.endTime, time);
    return Object.assign(state, getInterpolatedState(schema, tr.startState, tr.endState, progress, tr.easing));
  }, cloneDeep(initialState));
}

var TweenOperator = /*#__PURE__*/function (_Callable) {
  _inheritsLoose(TweenOperator, _Callable);

  function TweenOperator() {
    return _Callable.apply(this, arguments) || this;
  }

  var _proto = TweenOperator.prototype;

  _proto.at = function at(t) {
    return t;
  };

  _proto.__call__ = function __call__(source) {
    var _this = this;

    return map(function (t) {
      return _this.at(t);
    })(source);
  };

  return TweenOperator;
}(Callable);

var DEFAULT_OPTIONS$1 = {
  tweenDuration: '100%',
  easing: 'linear'
};
var Tween = /*#__PURE__*/function (_TweenOperator) {
  _inheritsLoose(Tween, _TweenOperator);

  Tween.create = function create(schema, options) {
    return new Tween(schema, options);
  };

  function Tween(schema, options) {
    var _this;

    _this = _TweenOperator.call(this) || this;
    _this.framesById = {};
    _this.frames = [];
    _this.timeline = [];
    _this._schema = createSchema(schema);
    _this._startingState = createState(_this._schema);
    _this._timeLabel = null;
    _this._loop = false;
    _this.options = Object.assign({}, DEFAULT_OPTIONS$1, options);

    _this._refreshTimeline();

    return _this;
  }

  var _proto = Tween.prototype;

  _proto.withTime = function withTime(label) {
    if (label === void 0) {
      label = 'time';
    }

    this._timeLabel = label || null;
    return this;
  };

  _proto.by = function by(endTime, duration, state, easing) {
    var meta = {
      endTime: endTime
    };

    if (typeof duration === 'object') {
      easing = state;
      state = duration;
    } else {
      meta.duration = duration;
    }

    if (easing) {
      meta.easing = easing;
    }

    return this.to(state, meta);
  };

  _proto.in = function _in(dt, duration, state, easing) {
    var meta = {
      endTime: this.duration + parseTime(dt)
    };

    if (typeof duration === 'object') {
      easing = state;
      state = duration;
    } else {
      meta.duration = duration;
    }

    if (easing) {
      meta.easing = easing;
    }

    return this.to(state, meta);
  } // add a frame
  ;

  _proto.to = function to(state, opts) {
    var meta = {};

    if (typeof opts === 'string') {
      meta.easing = opts;
    } else if (opts) {
      Object.assign(meta, opts);
    }

    if (meta.startTime === undefined && meta.endTime === undefined) {
      meta.startTime = this.duration;
    }

    var frame = createFrame(state, meta, {
      duration: this.options.tweenDuration,
      easing: this.options.easing
    });

    if (frame.meta.id && this.framesById[frame.meta.id]) {
      throw new Error("Frame with id \"" + frame.meta.id + "\" already defined");
    } // add to id list


    if (frame.meta.id) {
      this.framesById[frame.meta.id] = frame;
    }

    this.frames.push(frame);

    this._refreshTimeline();

    return this;
  };

  _proto.loop = function loop(toggle) {
    if (toggle === void 0) {
      toggle = true;
    }

    this._loop = toggle;
    return this;
  };

  _proto._refreshTimeline = function _refreshTimeline() {
    this.timeline = createTimeline(this._schema, this.frames);
    return this;
  };

  _proto.getFrame = function getFrame(id) {
    var frame = this.framesById[id];
    return frame;
  };

  _proto.at = function at(time) {
    if (this._loop) {
      time = time % this.duration;
    }

    var state;

    if (time >= this.duration) {
      var m = this.timeline[this.timeline.length - 1];
      state = cloneDeep(m.state);
    } else {
      var transitions = getTransitionsAtTime(this.timeline, time);
      var startState = getStartState(this.timeline, time, this._startingState);
      state = reduceTransitions(this._schema, transitions, time, startState);
    }

    if (this._timeLabel) {
      if (state[this._timeLabel] !== undefined) {
        throw new Error("State already has a property that would be overriden by time variable \"" + this._timeLabel + "\"");
      }

      state[this._timeLabel] = time;
    }

    return state;
  } // getTransitions(time) {
  //   return getTransitionsAtTime(this.timeline, time)
  // }
  ;

  _createClass(Tween, [{
    key: "duration",
    get: function get() {
      var _this$timeline;

      return ((_this$timeline = this.timeline[this.timeline.length - 1]) == null ? void 0 : _this$timeline.time) || 0;
    }
  }]);

  return Tween;
}(TweenOperator);

var DEFAULT_OPTIONS = {
  relaxDuration: 500,
  relaxDelay: 1000,
  easing: 'linear'
};
var Meddle = /*#__PURE__*/function (_TweenOperator) {
  _inheritsLoose(Meddle, _TweenOperator);

  Meddle.create = function create(tween, options) {
    return new Meddle(tween, options);
  };

  function Meddle(tween, options) {
    var _this;

    _this = _TweenOperator.call(this) || this;
    _this._subject = new Subject();
    _this._tween = tween;
    _this.options = options;
    _this.lastTime = 0; // reset

    _this.defaults();

    _this.clear();

    return _this;
  }

  var _proto = Meddle.prototype;

  // toggle freezing of meddle states
  _proto.freeze = function freeze(toggle) {
    if (toggle === void 0) {
      toggle = true;
    }

    this.frozen = toggle;
    return this;
  };

  _proto.relaxDelay = function relaxDelay(time) {
    this._relaxDelay = parseTime(time === undefined ? this.options.relaxDelay : time);
    return this;
  };

  _proto.relaxDuration = function relaxDuration(time) {
    this._relaxDuration = parseTime(time === undefined ? this.options.relaxDuration : time);
    return this;
  };

  _proto.easing = function easing(e) {
    this._easing = parseEasing(e === undefined ? this.options.easing : e);
    return this;
  } // Use the default timing/easing set at construction
  ;

  _proto.defaults = function defaults() {
    this.relaxDelay();
    this.relaxDuration();
    this.easing();
    return this;
  } // toggle user meddling
  ;

  _proto.set = function set(meddleState) {
    this.state = _extends({}, this.state, meddleState);
    this.started = false;
    this.startTime = false;
    this.relaxState = null;
    this.active = true;

    this._subject.next(this.lastTime);

    return this;
  } // force meddling to reset
  ;

  _proto.clear = function clear() {
    this.state = {};
    this.started = false;
    this.active = false;
    this.frozen = false;
    this.startTime = false;
    this.lastTime = 0;
    return this;
  };

  _proto.at = function at(time) {
    this.lastTime = time; // check meddling

    if (!this.active || this.frozen) {
      return Object.assign({}, this.state);
    }

    if (!this.started) {
      this.startTime = time;
      this.started = true;
      this.endTime = this.startTime + this._relaxDelay + this._relaxDuration;
      this.relaxState = pick(this._tween.at(this.endTime), Object.keys(this.state));
    }

    if (this.startTime === time) {
      return Object.assign({}, this.state);
    }

    if (time >= this.endTime || time < this.startTime) {
      // meddling is over
      this.clear();
    }

    if (time > this.totalTime) {
      // this will force a reset when the timeline is re-entered
      this.clear();
    }

    var timeFraction = invLerpClamped(this.startTime + this._relaxDelay, this.endTime, time);
    var meddleTransitionState = getInterpolatedState(this._tween._schema, this.state, this.relaxState, timeFraction, this._easing);
    return meddleTransitionState;
  };

  _proto.__call__ = function __call__(source) {
    var _this2 = this;

    return map(function (t) {
      return _this2.at(t);
    })(merge(this._subject, source));
  };

  _createClass(Meddle, [{
    key: "options",
    get: function get() {
      return this._options;
    },
    set: function set(o) {
      this._options = Object.assign({}, DEFAULT_OPTIONS, o);
      this.defaults();
    }
  }]);

  return Meddle;
}(TweenOperator);

var win;

if (typeof window !== "undefined") {
  win = window;
} else if (typeof commonjsGlobal !== "undefined") {
  win = commonjsGlobal;
} else if (typeof self !== "undefined") {
  win = self;
} else {
  win = {};
}

var window_1 = win;

var requestAnimationFrame = function (window) {
  return window.requestAnimationFrame || function (fn) {
    var t = setTimeout(fn, 16);
    t.unref && t.unref();
    return t;
  };
}(window_1);

var tickStack = [];

function step() {
  var l = tickStack.length;

  if (l === 0) {
    return;
  }

  requestAnimationFrame(step);
  var t = now();

  for (var i = 0; i < l; i++) {
    var fn = tickStack[i];
    fn && fn(t);
  }
}

function add(fn) {
  tickStack.push(fn);

  if (tickStack.length === 1) {
    step();
  }
}

function remove(fn) {
  var i = tickStack.indexOf(fn);
  tickStack.splice(i, 1);
}

function animationFrames() {
  return new Observable(function (observer) {
    var to = now();

    var cb = function cb(t) {
      return observer.next(t - to);
    };

    add(cb);
    return function () {
      remove(cb);
    };
  });
}

var defaultConfig = {
  duration: 1000,
  easing: 'cubicOut'
}; // Helper to smooth state changes
// ---------------------------------------

function smoothen(config, getState, schemaDef) {
  if (schemaDef === void 0) {
    schemaDef = null;
  }

  if (config instanceof Function) {
    getState = config;
    config = defaultConfig;
  }

  config = Object.assign({}, defaultConfig, config);
  return function (source) {
    return new Observable(function (sink) {
      var _targets = [];
      var schema;
      var time = 0;
      var currentState;
      var easing = parseEasing(config.easing);

      if (!getState) {
        getState = function getState() {
          return currentState;
        };
      }

      var update = function update(t) {
        time = t;

        if (!_targets.length) {
          return null;
        }

        var prev = 1;

        var timeFracs = _targets.map(function (_ref) {
          var startTime = _ref.startTime,
              endTime = _ref.endTime;

          if (prev === 0) {
            return 0;
          }

          var tf = invLerpClamped(startTime, endTime, time) / prev;
          prev = easing(tf);
          return tf;
        });

        currentState = timeFracs.reduceRight(function (targetState, tf, i) {
          var startState = _targets[i].startState;
          return getInterpolatedState(schema, startState, targetState, tf, easing);
        }, _targets[_targets.length - 1].targetState); // clean

        while (((_targets$ = _targets[0]) == null ? void 0 : _targets$.endTime) <= time) {
          var _targets$;

          _targets.shift();
        }

        return currentState;
      };

      var set = function set(targetState) {
        if (!schema) {
          schema = createSchema(schemaDef || getState() || targetState);
          currentState = createState(schema);

          if (!schemaDef) {
            return;
          }
        }

        var l = _targets.length;
        var startState = l ? _targets[l - 1].targetState : _extends({}, getState());

        _targets.push({
          startTime: time,
          endTime: time + parseTime(config.duration),
          startState: startState,
          targetState: targetState
        });
      };

      var nextTarget = null;
      var sub = animationFrames().subscribe(function (t) {
        if (nextTarget) {
          set(nextTarget);
          nextTarget = null;
        }

        var state = update(t);

        if (!state) {
          return;
        }

        sink.next(state);
      });
      var sinkSub = source.subscribe({
        next: function next(state) {
          nextTarget = state;
        },
        error: function error(e) {
          return sink.error(e);
        },
        complete: function complete() {
          return sink.complete();
        }
      });

      var unsubscribe = function unsubscribe() {
        sub.unsubscribe();
        sinkSub.unsubscribe();
      };

      return {
        unsubscribe: unsubscribe
      };
    });
  };
}

var Player = /*#__PURE__*/function (_Emitter) {
  _inheritsLoose(Player, _Emitter);

  Player.create = function create(totalTime) {
    return new Player(totalTime);
  };

  function Player(totalTime) {
    var _this;

    _this = _Emitter.call(this, function (sink) {
      var cb = function cb(time) {
        return sink.next(time);
      };

      _this.on('update', cb);

      _this.emit('update', _this._time);

      return function () {
        return _this.off('update', cb);
      };
    }) || this;
    _this.totalTime = parseTime(totalTime);
    _this._clockTime = 0;
    _this._time = 0;
    _this.playbackRate = 1;
    _this._paused = true;
    _this._loop = false;
    _this._sub = animationFrames().subscribe(function (t) {
      return _this.step(t);
    });
    return _this;
  }

  var _proto = Player.prototype;

  _proto.destroy = function destroy() {
    this.off(true);

    this._sub.unsubscribe();

    this.emit('destroy');
  };

  _proto.togglePause = function togglePause(paused) {
    if (paused === undefined) {
      paused = !this._paused;
    }

    this._paused = !!paused;

    if (this._paused) {
      this.emit('pause');
    } else {
      this.emit('play');
    }

    this.emit('togglePause', this._paused);
    return this;
  };

  _proto.pause = function pause() {
    return this.togglePause(true);
  };

  _proto.play = function play() {
    return this.togglePause(false);
  };

  _proto.loop = function loop(toggle) {
    if (toggle === void 0) {
      toggle = true;
    }

    this._loop = toggle;
    return this;
  } // Stops after it reaches time t
  ;

  _proto.playTo = function playTo(time) {
    time = parseTime(time);

    if (this._time === time) {
      return this;
    }

    this._playToTime = time;
    this._oldPlaybackRate = this.playbackRate;
    this.playbackRate = time >= this._time ? 1 : -1;
    return this.play();
  };

  _proto.seek = function seek(time) {
    this._time = time;
    this.emit('update', time);
    this.emit('seek', time);
    return this;
  };

  _proto.step = function step(now) {
    var clockTime = this._clockTime;
    var playbackRate = this.playbackRate;
    var dt = now - clockTime;
    var time = this._time;
    var totalTime = this.totalTime;
    this._clockTime = now; // if it's paused, don't step

    if (this._paused) {
      return this;
    }

    time += dt * playbackRate; // enable stopping at playToTime

    if (this._playToTime !== false && playbackRate * time >= playbackRate * this._playToTime) {
      this.togglePause(true);
      time = this._playToTime;
      this.playbackRate = this._oldPlaybackRate;
      this._playToTime = false;
    }

    this._time = time;

    if (playbackRate > 0 && time >= totalTime) {
      if (this._loop) {
        this._time = time = 0;
        this.emit('update', time);
        this.emit('end');
      } else {
        this._time = time = totalTime;
        this.emit('update', time);
        this.togglePause(true);
        this.emit('end');
      }
    } else if (playbackRate < 0 && time <= 0) {
      if (this._loop) {
        this._time = time = totalTime;
        this.emit('update', time);
        this.emit('end');
      } else {
        this._time = time = 0;
        this.emit('update', time);
        this.togglePause(true);
        this.emit('end');
      }
    } else {
      this.emit('update', time);
    }

    return this;
  };

  _createClass(Player, [{
    key: "progress",
    get: function get() {
      return this.totalTime > 0 ? this._time / this.totalTime * 100 : 0;
    },
    set: function set(p) {
      this.seek(Math.max(0, p) * this.totalTime / 100);
    }
  }, {
    key: "time",
    get: function get() {
      return this._time;
    },
    set: function set(t) {
      this.seek(t);
    }
  }, {
    key: "paused",
    get: function get() {
      return this._paused;
    },
    set: function set(p) {
      this.togglePause(p);
    }
  }]);

  return Player;
}(Emitter);

var regulatedBy = function regulatedBy(regulator, onlyNew) {
  if (onlyNew === void 0) {
    onlyNew = false;
  }

  return function (source) {
    return new Observable(function (sink) {
      var isFresh = false;
      var value = null;
      var isComplete = false;
      var regSub = regulator.subscribe({
        next: function next() {
          if (onlyNew && !isFresh) {
            return;
          }

          sink.next(value);
          isFresh = false;

          if (isComplete) {
            sink.complete();
            regSub.unsubscribe();
          }
        },
        complete: function complete() {
          sink.complete();
        },
        error: function error(e) {
          sink.error(e);
        }
      });
      var sub = source.subscribe({
        next: function next(v) {
          value = v;
          isFresh = true;
        },
        complete: function complete() {
          isComplete = true;
        },
        error: function error(e) {
          sink.error(e);
          isFresh = false;
          value = null;
          regSub.unsubscribe();
        }
      });
      return function () {
        sub.unsubscribe();
        regSub.unsubscribe();
      };
    });
  };
};

var animationThrottle = function animationThrottle() {
  return function (source) {
    return regulatedBy(animationFrames(), true)(source);
  };
};

var defaultThreshold = 5000 / 60; // 5 frames

var animationSync = function animationSync(config) {
  if (config === void 0) {
    config = {};
  }

  return function (timeSource) {
    return new Observable(function (sink) {
      var syncTime = 0;
      var isFresh = false;
      var isComplete = false;
      var lastFrameTime = 0;
      var lastTime = 0;
      var paused = true;
      var timeSub = animationFrames().subscribe(function (frameTime) {
        var playbackRate = Number.isFinite(config.playbackRate) ? config.playbackRate : 1;
        var isPlaying = !paused && playbackRate !== 0;
        var threshold = config.threshold || defaultThreshold;
        var time = frameTime;

        if (!isPlaying) {
          time = isFresh ? syncTime : lastTime;
        } else {
          // extrapolate
          var dt = (frameTime - lastFrameTime) * playbackRate;
          time = lastTime + dt;

          if (Math.abs(time - syncTime) > threshold) {
            if (isFresh) {
              // resync
              time = syncTime;
            } else {
              paused = true;
            }
          }

          isFresh = false;
        }

        lastFrameTime = frameTime;

        if (time !== lastTime) {
          lastTime = time;
          sink.next(time);
        }

        if (isComplete) {
          sink.complete();
          timeSub.unsubscribe();
        }
      });
      var sub = timeSource.subscribe({
        next: function next(time) {
          paused = time === syncTime;
          syncTime = time;
          isFresh = true;
        },
        complete: function complete() {
          isComplete = true;
        },
        error: function error(e) {
          sink.error(e);
          timeSub.unsubscribe();
        }
      });
      return function () {
        sub.unsubscribe();
        timeSub.unsubscribe();
      };
    });
  };
};

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  parseTime: parseTime,
  parseEasing: parseEasing,
  parseInterpolator: parseInterpolator
});

export { index$2 as Easing, index$1 as Interpolators, Meddle, Observable, index as Parsers, Player, Subject, Tween, index$3 as Util, animationFrames, animationSync, animationThrottle, combineLatest, map, merge, pipe, pipeFromArray, registerType, regulatedBy, smoothen, spreadAssign, spreadCombineLatest, zip };
