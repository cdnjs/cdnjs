/**
 * InTween 1.0.0-beta.6
 * @license MIT
 * Copyright 2021-present Jasper Palfree
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.InTween = {}));
}(this, (function (exports) { 'use strict';

  const identity = a => a;
  const objectCtorString = Function.prototype.toString.call(Object);
  const toString$1 = Object.prototype.toString;
  const typeName = v => toString$1.call(v).slice(8, -1); // From js - https://github.com/tweenjs/tween.js/blob/master/src/Tween.js
  // Include a performance.now polyfill.
  // In node.js, use process.hrtime.

  const now = (() => {
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
  })();
  const castArray = function (thing) {
    return Array.isArray(thing) ? thing : [thing];
  };
  const lerp = function (from, to, t) {
    return from * (1 - t) + to * t;
  };
  const invLerp = function (from, to, x) {
    const diff = to - from;
    return diff ? (x - from) / diff : 1;
  };
  const clamp = function (min, max, v) {
    return Math.min(Math.max(v, min), max);
  };
  const lerpClamped = function (from, to, t) {
    return lerp(from, to, clamp(0, 1, t));
  };
  const invLerpClamped = function (from, to, x) {
    return clamp(0, 1, invLerp(from, to, x));
  };
  const cloneDeep = obj => {
    if (typeof obj === 'function') {
      return obj;
    }

    const out = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
      const value = obj[key];
      const type = typeName(value);

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
  const isObjectLike = v => v !== null && typeof v === 'object';
  const isPlainObject = value => {
    if (!isObjectLike(value)) {
      return false;
    }

    const proto = Object.getPrototypeOf(value);

    if (proto === null) {
      return true;
    }

    const Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor === 'function' && Ctor instanceof Ctor && Function.prototype.toString.call(Ctor) === objectCtorString;
  };
  const filterObjectValues = function (obj, fn) {
    const out = {};

    for (const key in obj) {
      const value = obj[key];

      if (fn(value, key)) {
        out[key] = value;
      }
    }

    return out;
  };
  const sanitizedObject = function (obj) {
    return filterObjectValues(obj, v => v !== undefined);
  };
  const mapProperties = function (obj, fn) {
    const out = {};

    for (const key in obj) {
      out[key] = fn(obj[key], key);
    }

    return out;
  };
  const pick = function (obj, keys = []) {
    if (!keys) {
      // all
      return { ...obj
      };
    }

    const out = {};

    for (const key of keys) {
      out[key] = obj[key];
    }

    return out;
  }; // Only take properties that are present in
  // first object
  // ---------------------------------------

  const mergeIntersecting = function (first, second) {
    return { ...first,
      ...pick(second, Object.keys(first))
    };
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

  const sortedIndex = function (array, value, callback, retHighest) {
    let low = 0;
    let high = array ? array.length : low; // explicitly reference `identity` for better inlining in Firefox

    callback = callback || identity;
    value = callback(value);

    while (low < high) {
      const mid = low + high >>> 1;
      const computed = callback(array[mid]);

      if (retHighest ? computed <= value : computed < value) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return low;
  };
  const getIntersectingPaths = function (o1, o2) {
    return Object.keys(o1).filter(Object.prototype.hasOwnProperty.bind(o2));
  };
  const pull = function (arr, o) {
    const idx = arr.indexOf(o);
    arr.splice(idx, 1);
    return arr;
  };
  function shortestModDist(a0, a1, modulo) {
    const da = a1 - a0;
    const frac = da / modulo;
    const cycles = Math.floor(frac);
    const d = frac - cycles;
    const fix = d > 0.5 ? -1 : d < -0.5 ? 1 : 0;
    return (d + fix + cycles) * modulo;
  }
  const combineEasing = (...easings) => {
    const num = easings.length;

    if (num === 1) {
      return easings[0];
    }

    const invNum = 1 / num;
    return t => {
      const p = t * num;
      const i = clamp(0, num - 1, Math.floor(p));
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
      return fns.reduce((prev, fn) => fn(prev), input);
    };
  }
  function pipe(...ops) {
    return pipeFromArray(ops);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var check$1 = function (it) {
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
  var requireObjectCoercible$1 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // https://tc39.es/ecma262/#sec-toobject

  var toObject$1 = function (argument) {
    return Object(requireObjectCoercible$1(argument));
  };

  var hasOwnProperty$2 = {}.hasOwnProperty;

  var has$2 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty$2.call(toObject$1(it), key);
  };

  var setGlobal$1 = function (key, value) {
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

  var uid$1 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix$1).toString(36);
  };

  var aFunction$2 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$1 = function (namespace, method) {
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

  var fails$1 = function (exec) {
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

  var wellKnownSymbol$1 = function (name) {
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
      get: function () {
        return 7;
      }
    })[1] != 7;
  });

  var isObject$1 = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var document$2 = global_1$1.document; // typeof document.createElement is 'object' in old IE

  var EXISTS$1 = isObject$1(document$2) && isObject$1(document$2.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS$1 ? document$2.createElement(it) : {};
  };

  var ie8DomDefine$1 = !descriptors$1 && !fails$1(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(documentCreateElement$1('div'), 'a', {
      get: function () {
        return 7;
      }
    }).a != 7;
  });

  var anObject$1 = function (it) {
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

  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject$1(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject$1(val = fn.call(input))) return val;
    if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject$1(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var TO_PRIMITIVE$1 = wellKnownSymbol$1('toPrimitive'); // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive

  var toPrimitive$1 = function (input, pref) {
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

  var toPropertyKey$1 = function (argument) {
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

  var defineWellKnownSymbol$1 = function (NAME) {
    var Symbol = path$1.Symbol || (path$1.Symbol = {});
    if (!has$2(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
      value: wellKnownSymbolWrapped$1.f(NAME)
    });
  };

  // https://github.com/tc39/proposal-observable

  defineWellKnownSymbol$1('observable');

  wellKnownSymbolWrapped$1.f('observable');

  var check = function (it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global_1 = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  function () {
    return this;
  }() || Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var descriptors = !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
      get: function () {
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

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
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
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var path = {};

  var aFunction$1 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
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

  var ordinaryToPrimitive = function (input, pref) {
    var fn, val;
    if (pref === 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (pref !== 'string' && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var setGlobal = function (key, value) {
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

  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var hasOwnProperty$1 = {}.hasOwnProperty;

  var has$1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty$1.call(toObject(it), key);
  };

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
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

  var toPrimitive = function (input, pref) {
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

  var toPropertyKey = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : String(key);
  };

  var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  var ie8DomDefine = !descriptors && !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () {
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

  var isForced = function (feature, detection) {
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

  var aFunction = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    }

    return it;
  };

  var functionBindContext = function (fn, that, length) {
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

  var anObject = function (it) {
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

  var wrapConstructor = function (NativeConstructor) {
    var Wrapper = function (a, b, c) {
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


  var _export = function (options, source) {
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

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES]) {
      defineProperty(Constructor, SPECIES, {
        configurable: true,
        get: function () {
          return this;
        }
      });
    }
  };

  var anInstance = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    }

    return it;
  };

  var redefine = function (target, key, value, options) {
    if (options && options.enumerable) target[key] = value;else createNonEnumerableProperty(target, key, value);
  };

  var redefineAll = function (target, src, options) {
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

  var tryGet = function (it, key) {
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

  var getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$3] || it['@@iterator'] || iterators[classof(it)];
  };

  var getIterator = function (it, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(it) : usingIterator;

    if (typeof iteratorMethod != 'function') {
      throw TypeError(String(it) + ' is not iterable');
    }

    return anObject(iteratorMethod.call(it));
  };

  // https://tc39.es/ecma262/#sec-getmethod

  var getMethod = function (fn) {
    return fn == null ? undefined : aFunction(fn);
  };

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype; // check on default Array iterator

  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
  };

  var ceil = Math.ceil;
  var floor = Math.floor; // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger

  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min$1 = Math.min; // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength

  var toLength = function (argument) {
    return argument > 0 ? min$1(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var iteratorClose = function (iterator, kind, value) {
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

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
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

  var hostReportErrors = function (a, b) {
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

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap = global_1.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
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
      if (has$1(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };

    get = function (it) {
      return has$1(it, STATE) ? it[STATE] : {};
    };

    has = function (it) {
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

  var cleanupSubscription = function (subscriptionState) {
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

  var subscriptionClosed = function (subscriptionState) {
    return subscriptionState.observer === undefined;
  };

  var close = function (subscriptionState) {
    var subscription = subscriptionState.facade;

    if (!descriptors) {
      subscription.closed = true;
      var subscriptionObserver = subscriptionState.subscriptionObserver;
      if (subscriptionObserver) subscriptionObserver.closed = true;
    }

    subscriptionState.observer = undefined;
  };

  var Subscription = function (observer, subscriber) {
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
    get: function () {
      return subscriptionClosed(getInternalState$2(this));
    }
  });

  var SubscriptionObserver = function (subscription) {
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
    get: function () {
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

      while (index < length) items[index] = arguments[index++];

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

  var defineWellKnownSymbol = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!has$1(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
      value: wellKnownSymbolWrapped.f(NAME)
    });
  };

  // https://github.com/tc39/proposal-observable

  defineWellKnownSymbol('observable');

  // empty

  var es_object_toString = /*#__PURE__*/Object.freeze({
    __proto__: null
  });

  var toString_1 = function (argument) {
    if (isSymbol(argument)) throw TypeError('Cannot convert a Symbol value to a string');
    return String(argument);
  };

  var createMethod$1 = function (CONVERT_TO_STRING) {
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

  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min(integer, length);
  };

  var createMethod = function (IS_INCLUDES) {
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

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) !has$1(hiddenKeys, key) && has$1(O, key) && result.push(key); // Don't enum bug & hidden keys


    while (names.length > i) if (has$1(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
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

    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey('IE_PROTO');

  var EmptyConstructor = function () {
    /* empty */
  };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak

    return temp;
  }; // Create object with fake `null` prototype: use iframe Object with cleared prototype


  var NullProtoObjectViaIFrame = function () {
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

  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }

    NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
    : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

    var length = enumBugKeys.length;

    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

    return NullProtoObject();
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
    } else result = NullProtoObject();

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

  var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
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

  var returnThis$1 = function () {
    return this;
  };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype, {
      next: createPropertyDescriptor(1, next)
    });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var aPossiblePrototype = function (it) {
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

  var returnThis = function () {
    return this;
  };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
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

  getCjsExportFromNamespace(es_object_toString);

  var observable = path.Observable;

  class Observable extends observable {
    constructor(subscriber) {
      super(subscriber || identity);
    }

    pipe(...ops) {
      return pipeFromArray(ops)(this);
    } // needed to interop with rxjs


    lift(operator) {
      return new Observable(sink => {
        return operator.call(sink, this);
      });
    }

    ['@@observable']() {
      return this;
    }

  }

  class Subject extends Observable {
    constructor(...args) {
      super(...args);
      this.closed = false;
      this.observers = [];
    }

    unsubscribe() {
      this.isStopped = this.closed = true;
      this.observers = null;
    }

    next(value) {
      this._throwIfClosed();

      if (!this.isStopped) {
        const copy = this.observers.slice();

        for (const observer of copy) {
          observer.next(value);
        }
      }
    }

    error(err) {
      this._throwIfClosed();

      if (!this.isStopped) {
        this.hasError = this.isStopped = true;
        this.thrownError = err;
        const {
          observers
        } = this;

        while (observers.length) {
          observers.shift().error(err);
        }
      }
    }

    complete() {
      this._throwIfClosed();

      if (!this.isStopped) {
        this.isStopped = true;
        const {
          observers
        } = this;

        while (observers.length) {
          observers.shift().complete();
        }
      }
    }

    subscribe(subscriber) {
      const len = this.observers.push(subscriber);
      return {
        unsubscribe: () => {
          this.observers.splice(len - 1, 1);
        }
      };
    }

    _throwIfClosed() {
      if (this.closed) {
        throw new Error('Subscription closed!');
      }
    }

  }

  const map = fn => source => new Observable(sink => source.subscribe({
    next(value) {
      try {
        value = fn(value);
        sink.next(value);
      } catch (e) {
        sink.error(e);
      }
    },

    error(e) {
      sink.error(e);
    },

    complete() {
      sink.complete();
    }

  })); // Emits all values from all inputs in parallel
  // Copyright (c) 2018 zenparsing (Kevin Smith)

  function merge(...sources) {
    return new Observable(observer => {
      if (sources.length === 0) {
        return Observable.from([]);
      }

      let count = sources.length;
      const subscriptions = sources.map(source => Observable.from(source).subscribe({
        next(v) {
          observer.next(v);
        },

        error(e) {
          observer.error(e);
        },

        complete() {
          if (--count === 0) {
            observer.complete();
          }
        }

      }));
      return () => subscriptions.forEach(s => s.unsubscribe());
    });
  } // Emits arrays containing the most current values from each input
  // Copyright (c) 2018 zenparsing (Kevin Smith)

  function combineLatest(...sources) {
    return new Observable(observer => {
      if (sources.length === 0) {
        return Observable.from([]);
      }

      let count = sources.length;
      let seen = new Set();
      let seenAll = false;
      const values = sources.map(() => undefined);
      const subscriptions = sources.map((source, index) => Observable.from(source).subscribe({
        next(v) {
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

        error(e) {
          observer.error(e);
        },

        complete() {
          if (--count === 0) {
            observer.complete();
          }
        }

      }));
      return () => subscriptions.forEach(s => s.unsubscribe());
    });
  } // Emits arrays containing the matching index values from each input
  // Copyright (c) 2018 zenparsing (Kevin Smith)

  function zip(...sources) {
    return new Observable(observer => {
      if (sources.length === 0) {
        return Observable.from([]);
      }

      const queues = sources.map(() => []);

      function done() {
        return queues.some((q, i) => q.length === 0 && subscriptions[i].closed);
      }

      const subscriptions = sources.map((source, index) => Observable.from(source).subscribe({
        next(v) {
          queues[index].push(v);

          if (queues.every(q => q.length > 0)) {
            observer.next(queues.map(q => q.shift()));

            if (done()) {
              observer.complete();
            }
          }
        },

        error(e) {
          observer.error(e);
        },

        complete() {
          if (done()) {
            observer.complete();
          }
        }

      }));
      return () => subscriptions.forEach(s => s.unsubscribe());
    });
  }
  const spreadCombineLatest = (...operators) => source => new Observable(sink => {
    const subject = new Subject();
    const observables = operators.map(o => o(subject));
    const sub = combineLatest(...observables).subscribe(sink);
    const sub2 = source.subscribe(subject);
    return () => {
      sub.unsubscribe();
      sub2.unsubscribe();
    };
  });
  const spreadAssign = (...operators) => source => pipe(map(results => Object.assign({}, ...results)))(spreadCombineLatest(...operators)(source));

  class Callable extends Function {
    constructor() {
      super('...args', 'return this._bound.__call__(...args)');
      this._bound = this.bind(this);
      return this._bound;
    }

    __call__() {}

  }

  const defaultPriority = 1;

  function getPriority(val) {
    return val._priority_;
  }

  class Emitter extends Observable {
    constructor(subscriber) {
      super(subscriber); // ensure topics hash is initialized

      this._topics = this._topics || (this._topics = {});
    }

    fromEvent(topic, priority) {
      return new Observable(sink => {
        const callback = v => sink.next(v);

        this.on(topic, callback, priority);
        return () => {
          this.off(topic, callback);
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


    on(topic, fn, scope, priority) {
      // check if we're subscribing to multiple topics
      // with an object
      if (typeof topic === 'object') {
        for (const t in topic) {
          this.on(t, topic[t], fn, scope);
        }

        return this;
      }

      const listeners = this._topics[topic] || (this._topics[topic] = []);
      const orig = fn;

      if (typeof scope === 'object') {
        fn = fn.bind(scope);
        fn._bindfn_ = orig;
        fn._one_ = orig._one_;
        fn._scope_ = scope;
      } else if (priority === undefined) {
        priority = scope;
      }

      fn._priority_ = priority === undefined ? defaultPriority : priority;
      const idx = sortedIndex(listeners, fn, getPriority);
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


    off(topic, fn, scope) {
      if (topic === true) {
        // purge all listeners
        this._topics = {};
        return this;
      } // check if we're subscribing to multiple topics
      // with an object


      if (typeof topic === 'object') {
        for (const t in topic) {
          this.off(t, topic[t], fn);
        }

        return this;
      }

      const listeners = this._topics[topic];

      if (!listeners) {
        return this;
      }

      if (fn === true) {
        // purge all listeners for topic
        this._topics[topic] = [];
        return this;
      }

      for (let i = 0, l = listeners.length; i < l; i++) {
        const listn = listeners[i];

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


    emit(topic, data) {
      const listeners = this._topics[topic];
      let l = listeners && listeners.length;

      if (!l) {
        return this;
      }

      const e = {}; // event data

      e.topic = topic; // reverse iterate so priorities work out correctly

      while (l--) {
        const handler = listeners[l];
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


    one(topic, fn, scope) {
      // check if we're subscribing to multiple topics
      // with an object
      if (typeof topic === 'object') {
        for (const t in topic) {
          this.one(t, topic[t], fn, scope);
        }

        return this;
      } // set the _one_ flag


      fn._one_ = true;
      this.on(topic, fn, scope);
      return this;
    }

  }

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
  const Pi2$1 = Math.PI * 2;
  /*
   * @param {number} [amplitude=0.1] - The amplitude of the elastic ease.
   * @param {number} [period = 0.1] - Sets how tight the sine - wave is,
   * where smaller values are tighter waves, which result in more cycles.
   */

  const makeElasticIn = (a = 0.1, p = 0.1) => {
    let s = p / 4;

    if (a < 1) {
      a = 1;
    } else {
      s = p * Math.asin(1 / a) / Pi2$1;
    }

    const w = Pi2$1 / p;
    return t => {
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

  const makeElasticOut = (a = 0.1, p = 0.1) => {
    let s = p / 4;

    if (a < 1) {
      a = 1;
    } else {
      s = p * Math.asin(1 / a) / Pi2$1;
    }

    const w = Pi2$1 / p;
    return t => {
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

  const makeElasticInOut = (a = 0.1, p = 0.1) => {
    let s = p / 4;

    if (a < 1) {
      a = 1;
    } else {
      s = p * Math.asin(1 / a) / Pi2$1;
    }

    const w = Pi2$1 / p;
    return t => {
      if (t === 0) return 0;
      if (t === 1) return 1;

      if ((t *= 2) < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * w));
      } else {
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * w) * 0.5 + 1;
      }
    };
  };
  const makeBackIn = (overshoot = 1.70158) => t => t * t * ((overshoot + 1) * t - overshoot);
  const makeBackOut = (overshoot = 1.70158) => t => --t * t * ((overshoot + 1) * t + overshoot) + 1;
  const makeBackInOut = (overshoot = 1.70158) => t => {
    const s = overshoot * 1.525;

    if ((t *= 2) < 1) {
      return 0.5 * (t * t * ((s + 1) * t - s));
    } else {
      return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
    }
  };
  const makeSteps = (steps = 1) => t => ((steps * t | 0) + 1) * (1 / steps);

  /**
   * Easing adapted from phaser
   * https://github.com/photonstorm/phaser/tree/master/src/math/easing
   * license: https://opensource.org/licenses/MIT
   */
  const halfPi = Math.PI / 2;
  const linear$1 = t => t;
  const quadIn = t => t * t;
  const quadOut = t => t * (2 - t);
  const quadInOut = t => (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
  const cubicIn = t => t * t * t;
  const cubicOut = t => --t * t * t + 1;
  const cubicInOut = t => (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
  const quartIn = t => t * t * t * t;
  const quartOut = t => 1 - --t * t * t * t;
  const quartInOut = t => (t *= 2) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
  const quintIn = t => t * t * t * t * t;
  const quintOut = t => --t * t * t * t * t + 1;
  const quintInOut = t => (t *= 2) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2);
  const sinIn = t => 1 - Math.cos(t * halfPi);
  const sinOut = t => Math.sin(t * halfPi);
  const sinInOut = t => 0.5 * (1 - Math.cos(Math.PI * t));
  const expIn = t => t === 0 ? 0 : Math.pow(1024, t - 1);
  const expOut = t => t === 0 ? 0 : 1 - Math.pow(1024, -t);
  const expInOut = t => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t *= 2) < 1) return 0.5 * Math.pow(1024, t - 1);
    return 0.5 * (2 - Math.pow(1024, 1 - t));
  };
  const elasticIn = makeElasticIn();
  const elasticOut = makeElasticOut();
  const elasticInOut = makeElasticInOut();
  const circularIn = t => 1 - Math.sqrt(1 - t * t);
  const circularOut = t => Math.sqrt(1 - --t * t);
  const circularInOut = t => (t *= 2) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
  const bounceIn = t => {
    t = 1 - t;
    if (t < 1 / 2.75) return 1 - 7.5625 * t * t;else if (t < 2 / 2.75) return 1 - (7.5625 * (t -= 1.5 / 2.75) * t + 0.75);else if (t < 2.5 / 2.75) return 1 - (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375);else return 1 - (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
  };
  const bounceOut = t => {
    if (t < 1 / 2.75) return 7.5625 * t * t;else if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;else if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;else return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  };
  const bounceInOut = t => {
    let reverse = false;

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
  const backIn = makeBackIn();
  const backOut = makeBackOut();
  const backInOut = makeBackInOut();
  const step$1 = makeSteps();

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

  const makeToggle = threshold => (from, to, t) => t >= threshold ? to : from;
  const makeCyclic = len => (from, to, t) => from + shortestModDist(from, to, len) * t;
  const makeForArray = interp => (from, to, t) => to.map((toVal, idx) => interp(from[idx], toVal, t));

  const Pi2 = Math.PI * 2;
  const linear = (from, to, t) => lerp(from, to, t);
  const radians = (from, to, t) => from + shortestModDist(from, to, Pi2) * t;
  const degrees = (from, to, t) => from + shortestModDist(from, to, 360) * t;
  const array = makeForArray(lerp);
  const object = (from, to, t) => mapProperties(from, (val, key) => lerp(val, to[key], t));
  const string = (from, to, t) => {
    if (t <= 0) {
      return from;
    }

    const length = lerp(0, to.length, t) | 0; // to integer

    return to.substr(0, length);
  };
  const toggle = makeToggle(1);

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
      const easings = easing.replace(' ', '').split('+');

      if (easings.length === 1) {
        easing = easings[0];

        if (easing in Easing) {
          return Easing[easing];
        }
      } else {
        return combineEasing(...easings.map(parseEasing));
      }
    } else if (easing instanceof Function) {
      return easing;
    }

    throw new Error(`Unrecognized easing name "${easing}"`);
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

    throw new Error(`Unrecognized interpolator name "${interp}"`);
  }

  const NATIVE_TYPES = {
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
  const CUSTOM_TYPES = {};

  function getCustomTypeByVal(val) {
    return Object.values(CUSTOM_TYPES).find(({
      constructor
    }) => val instanceof constructor);
  }

  function getCustomTypeByConstructor(val) {
    return Object.values(CUSTOM_TYPES).find(({
      constructor
    }) => val === constructor);
  }

  function registerType(cfg) {
    const {
      type,
      interpolator
    } = cfg;

    if (!type || !interpolator || cfg.default === undefined) {
      throw new Error('Custom types must have "type", "default", and "interpolator" specified');
    }

    if (CUSTOM_TYPES[type]) {
      throw new Error(`Custom type "${type}" is already registered`);
    }

    CUSTOM_TYPES[type] = {
      type,
      interpolator,
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

    const type = typeof val;

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


    const custom = getCustomTypeByVal(val);

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


    const custom = getCustomTypeByConstructor(type);

    if (custom) {
      return custom.type;
    }

    if (type === Object || type === 'object') {
      return 'object';
    }

    return type;
  }
  function getTypeCfg(type) {
    const cfg = NATIVE_TYPES[type] || CUSTOM_TYPES[type];

    if (!cfg) {
      throw new Error(`Unrecognized type ${type}`);
    }

    return cfg;
  }

  const TYPE_DEF_KEYS = ['value', ...Object.keys(getTypeCfg('object'))];
  const DEFAULT_EASING = 'linear';

  function checkExplicitTypeDefinition(def) {
    const extraKeys = Object.keys(def).filter(k => TYPE_DEF_KEYS.indexOf(k) < 0);

    if (extraKeys.length) {
      throw new Error('Type definition contains extra keys. Does your definition use "type" as a property name?');
    }
  }

  function getInterpolator(type, cfg, defaultVal) {
    if (type === 'array' && defaultVal && defaultVal.length) {
      const subSchema = parseSchemaProp(defaultVal[0]);
      return makeForArray(subSchema.interpolator);
    }

    return parseInterpolator(cfg.interpolator);
  }

  function parseSchemaProp(def) {
    let easing;
    let interpolator;
    let type;
    let cfg;
    let defaultVal;

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
      type,
      easing,
      default: defaultVal,
      interpolator,
      def
    };
  }
  function createSchema(schemaDef) {
    return mapProperties(schemaDef, parseSchemaProp);
  }
  function createState(schema) {
    const state = {};
    const props = Object.keys(schema);

    for (const prop of props) {
      state[prop] = schema[prop].default;
    }

    return state;
  }

  const timeDecReg = /([0-9.]+)(s|m|h)?/;
  const timeStdReg = /((\d\d):)?((\d\d):(\d\d))/;
  const MINUTES = 60;
  const HOURS = 60 * 60;

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

    let parsed = strOrNumber.match(timeStdReg);

    if (parsed) {
      return getTime(parsed[2], parsed[4], parsed[5]);
    }

    parsed = strOrNumber.match(timeDecReg);

    if (parsed) {
      const unit = ('' + parsed[2]).toLowerCase();

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

  const pctReg = /^((\d{1,3})(\.\d*)?)%$/;
  const META_PARSERS = {
    endTime(v) {
      if (v === undefined) {
        return undefined;
      }

      return parseTime(v);
    },

    startTime: parseTime,

    duration(v) {
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
    const ret = { ...defaults,
      ...sanitizedObject(meta)
    }; // clone

    for (const key in META_PARSERS) {
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
    const percentDuration = pctReg.exec(meta.duration);

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
      state,
      meta
    };
  }

  function createTransitionFromFrame(startTime, endTime, frame, previousState) {
    const endState = frame.state;
    const startState = pick(previousState, Object.keys(endState));
    const easing = frame.meta.easing;
    return {
      startTime,
      endTime,
      startState,
      endState,
      easing,
      frame
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

    const nextState = cloneDeep(startState);

    for (const prop in endState) {
      const def = schema[prop];
      let val;

      if (!def) {
        // not specified in schema. just set
        val = endState[prop];
      } else {
        easing = easing || def.easing;
        const progress = easing(timeFraction);
        val = interpolateProperty(def.interpolator, startState[prop], endState[prop], progress);
      }

      nextState[prop] = val;
    }

    return nextState;
  }

  // ---------------------------------------

  function getConflictingFrames(timeline) {
    const markers = [];
    let idx;

    for (let l = timeline.length, i = 0; i < l; i++) {
      const m = timeline[i];

      if (m.type === 'start') {
        markers.push(m);
      } else {
        // stop tracking its partner
        idx = markers.indexOf(m.start);
        markers.splice(idx, 1);
      }

      for (let l = markers.length, i = 0; i < l; i++) {
        const m = markers[i];

        for (let j = i + 1; j < l; j++) {
          const paths = getIntersectingPaths(m.transition.endState, markers[j].transition.endState);

          if (paths.length) {
            return {
              paths,
              frames: [m.frame, markers[j].frame]
            };
          }
        }
      }
    }

    return false;
  }

  function getPrevEndTime(timeline, idx, currTime) {
    for (let i = idx - 1; i >= 0; i--) {
      const ep = timeline[i]; // loop until previous end marker is found.
      // if they have the same end time, ignore

      if (ep.type === 'end' && currTime !== ep.time) {
        return ep.time;
      }
    }

    return 0;
  } // Create a timeline array from specified frames
  // ---------------------------------------


  function createTimeline(schema, frames = []) {
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

    const getTime = v => v.time;

    const defaultState = createState(schema);
    const timeline = []; // omit frames that are implicitly defined first

    const implicitFrames = frames.filter(f => f.meta.implicit).sort((a, b) => a.meta.endTime - b.meta.endTime);
    frames = frames.filter(f => !f.meta.implicit);
    frames.forEach(frame => {
      let idx;
      const start = {
        type: 'start',
        frame,
        time: frame.meta.endTime - frame.meta.duration
      };
      const end = {
        type: 'end',
        frame,
        time: frame.meta.endTime
      };
      start.end = end;
      end.start = start;
      idx = sortedIndex(timeline, end, getTime);
      timeline.splice(idx, 0, end); // "start"s need to be after "end"s of equal time... but not after its own end

      idx = Math.min(idx, sortedIndex(timeline, start, getTime, true));
      timeline.splice(idx, 0, start);
    }); // insert frames with implicit timing

    implicitFrames.forEach(frame => {
      const end = {
        type: 'end',
        frame,
        time: frame.meta.endTime
      };
      let idx = sortedIndex(timeline, end, getTime);
      const prevEndTime = getPrevEndTime(timeline, idx, end.time);
      const startTime = lerp(end.time, prevEndTime, frame.meta.fractionalDuration);
      const start = {
        type: 'start',
        frame,
        time: startTime
      };
      start.end = end;
      end.start = start; // add the end

      timeline.splice(idx, 0, end); // "start"s need to be after "end"s of equal time

      idx = Math.min(idx, sortedIndex(timeline, start, getTime, true));
      timeline.splice(idx, 0, start);
    }); // assign inherited states

    let prevState = defaultState;
    timeline.forEach((m, idx) => {
      // only go through ends
      if (m.type !== 'end') {
        return;
      }

      const transition = createTransitionFromFrame(m.start.time, m.time, m.frame, prevState);
      m.transition = transition;
      m.start.transition = transition;
      prevState = { ...prevState,
        ...transition.endState
      };
    });
    prevState = defaultState; // assign a reduced end state to each marker

    timeline.forEach(m => {
      if (m.type !== 'end') {
        return;
      }

      const transitions = getTransitionsAtTime(timeline, m.time);
      prevState = reduceTransitions(schema, transitions, m.time, prevState);
      m.state = prevState;
    });
    const conflicts = getConflictingFrames(timeline);

    if (conflicts) {
      throw new Error('The following overlapping frames modify the same state paths:\n' + `paths: ${conflicts.paths}\n` + `frames: ${JSON.stringify(conflicts.frames, null, 2)}`);
    }

    return timeline;
  } // Get transition information needed
  // at specified time from timeline
  // ---------------------------------------

  function getTransitionsAtTime(timeline, time) {
    const markers = [];
    let idx;

    for (let l = timeline.length, i = 0; i < l; i++) {
      const m = timeline[i];

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

    return markers.map(a => a.transition);
  } // Get the cached complete state at the
  // last end marker
  // ---------------------------------------

  function getStartState(timeline, time, defaultState) {
    let state = defaultState;

    for (let l = timeline.length, i = 0; i < l; i++) {
      const m = timeline[i];

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

  function reduceTransitions(schema, transitions = [], time = 0, initialState = {}) {
    return transitions.reduce((state, tr) => {
      const progress = invLerpClamped(tr.startTime, tr.endTime, time);
      return Object.assign(state, getInterpolatedState(schema, tr.startState, tr.endState, progress, tr.easing));
    }, cloneDeep(initialState));
  }

  class TweenOperator extends Callable {
    at(t) {
      return t;
    }

    __call__(source) {
      return map(t => this.at(t))(source);
    }

  }

  const DEFAULT_OPTIONS$1 = {
    tweenDuration: '100%',
    easing: 'linear'
  };
  class Tween extends TweenOperator {
    static create(schema, options) {
      return new Tween(schema, options);
    }

    constructor(schema, options) {
      super();
      this.framesById = {};
      this.frames = [];
      this.timeline = [];
      this._schema = createSchema(schema);
      this._startingState = createState(this._schema);
      this._timeLabel = false;
      this._loop = false;
      this.options = Object.assign({}, DEFAULT_OPTIONS$1, options);

      this._refreshTimeline();
    }

    get duration() {
      return this.timeline[this.timeline.length - 1]?.time || 0;
    }

    withTime(label = 'time') {
      this._timeLabel = label || false;
      return this;
    }

    by(endTime, duration, state, easing) {
      const meta = {
        endTime
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
    }

    in(dt, duration, state, easing) {
      const meta = {
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


    to(state, opts) {
      const meta = {};

      if (typeof opts === 'string') {
        meta.easing = opts;
      } else if (opts) {
        Object.assign(meta, opts);
      }

      if (meta.startTime === undefined && meta.endTime === undefined) {
        meta.startTime = this.duration;
      }

      const frame = createFrame(state, meta, {
        duration: this.options.tweenDuration,
        easing: this.options.easing
      });

      if (frame.meta.id && this.framesById[frame.meta.id]) {
        throw new Error(`Frame with id "${frame.meta.id}" already defined`);
      } // add to id list


      if (frame.meta.id) {
        this.framesById[frame.meta.id] = frame;
      }

      this.frames.push(frame);

      this._refreshTimeline();

      return this;
    }

    loop(toggle = true) {
      this._loop = toggle;
      return this;
    }

    _refreshTimeline() {
      this.timeline = createTimeline(this._schema, this.frames);
      return this;
    }

    getFrame(id) {
      const frame = this.framesById[id];
      return frame;
    }

    at(time) {
      if (this._loop) {
        time = time % this.duration;
      }

      let state;

      if (time >= this.duration) {
        const m = this.timeline[this.timeline.length - 1];
        state = cloneDeep(m.state);
      } else {
        const transitions = getTransitionsAtTime(this.timeline, time);
        const startState = getStartState(this.timeline, time, this._startingState);
        state = reduceTransitions(this._schema, transitions, time, startState);
      }

      if (this._timeLabel) {
        if (state[this._timeLabel] !== undefined) {
          throw new Error(`State already has a property that would be overriden by time variable "${this._timeLabel}"`);
        }

        state[this._timeLabel] = time;
      }

      return state;
    }

    getTransitions(time) {
      time = time || this.time;
      return getTransitionsAtTime(this.timeline, time);
    }

  }

  const DEFAULT_OPTIONS = {
    relaxDuration: 500,
    relaxDelay: 1000,
    easing: 'linear'
  };
  class Meddle extends TweenOperator {
    static create(tween, options) {
      return new Meddle(tween, options);
    }

    constructor(tween, options) {
      super();
      this._subject = new Subject();
      this._tween = tween;
      this.options = options;
      this.lastTime = 0; // reset

      this.defaults();
      this.clear();
    }

    get options() {
      return this._options;
    }

    set options(o) {
      this._options = Object.assign({}, DEFAULT_OPTIONS, o);
      this.defaults();
    } // toggle freezing of meddle states


    freeze(toggle = true) {
      this.frozen = toggle;
      return this;
    }

    relaxDelay(time) {
      this._relaxDelay = parseTime(time === undefined ? this.options.relaxDelay : time);
      return this;
    }

    relaxDuration(time) {
      this._relaxDuration = parseTime(time === undefined ? this.options.relaxDuration : time);
      return this;
    }

    easing(e) {
      this._easing = parseEasing(e === undefined ? this.options.easing : e);
      return this;
    } // Use the default timing/easing set at construction


    defaults() {
      this.relaxDelay();
      this.relaxDuration();
      this.easing();
      return this;
    } // toggle user meddling


    set(meddleState) {
      this.state = { ...this.state,
        ...meddleState
      };
      this.started = false;
      this.startTime = false;
      this.relaxState = null;
      this.active = true;

      this._subject.next(this.lastTime);

      return this;
    } // force meddling to reset


    clear() {
      this.state = {};
      this.started = false;
      this.active = false;
      this.frozen = false;
      this.startTime = false;
      this.lastTime = 0;
      return this;
    }

    at(time) {
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

      const timeFraction = invLerpClamped(this.startTime + this._relaxDelay, this.endTime, time);
      const meddleTransitionState = getInterpolatedState(this._tween._schema, this.state, this.relaxState, timeFraction, this._easing);
      return meddleTransitionState;
    }

    __call__(source) {
      return map(t => this.at(t))(merge(this._subject, source));
    }

  }

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

  const requestAnimationFrame = (window => {
    return window.requestAnimationFrame || (fn => {
      const t = setTimeout(fn, 16);
      t.unref && t.unref();
      return t;
    });
  })(window_1);

  const tickStack = [];

  function step() {
    const l = tickStack.length;

    if (l === 0) {
      return;
    }

    requestAnimationFrame(step);
    const t = now();

    for (let i = 0; i < l; i++) {
      const fn = tickStack[i];
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
    const i = tickStack.indexOf(fn);
    tickStack.splice(i, 1);
  }

  function animationFrames() {
    return new Observable(observer => {
      const to = now();

      const cb = t => observer.next(t - to);

      add(cb);
      return () => {
        remove(cb);
      };
    });
  }

  // import { linear } from '@/easing'
  const defaultConfig = {
    duration: 1000,
    easing: 'cubicOut'
  }; // Helper to smooth state changes
  // ---------------------------------------

  function smoothen(config, getState, schemaDef = null) {
    if (config instanceof Function) {
      getState = config;
      config = defaultConfig;
    }

    config = Object.assign({}, defaultConfig, config);
    return source => new Observable(sink => {
      const _targets = [];
      let schema;
      let time = 0;
      let currentState;
      const easing = parseEasing(config.easing);

      if (!getState) {
        getState = () => currentState;
      }

      const update = t => {
        time = t;

        if (!_targets.length) {
          return null;
        }

        let prev = 1;

        const timeFracs = _targets.map(({
          startTime,
          endTime
        }) => {
          if (prev === 0) {
            return 0;
          }

          const tf = invLerpClamped(startTime, endTime, time) / prev;
          prev = easing(tf);
          return tf;
        });

        currentState = timeFracs.reduceRight((targetState, tf, i) => {
          const {
            startState
          } = _targets[i];
          return getInterpolatedState(schema, startState, targetState, tf, easing);
        }, _targets[_targets.length - 1].targetState); // clean

        while (_targets[0]?.endTime <= time) {
          _targets.shift();
        }

        return currentState;
      };

      const set = targetState => {
        if (!schema) {
          schema = createSchema(schemaDef || getState() || targetState);
          currentState = createState(schema);

          if (!schemaDef) {
            return;
          }
        }

        const l = _targets.length;
        const startState = l ? _targets[l - 1].targetState : { ...getState()
        };

        _targets.push({
          startTime: time,
          endTime: time + parseTime(config.duration),
          startState,
          targetState
        });
      };

      let nextTarget = null;
      const sub = animationFrames().subscribe(t => {
        if (nextTarget) {
          set(nextTarget);
          nextTarget = null;
        }

        const state = update(t);

        if (!state) {
          return;
        }

        sink.next(state);
      });
      const sinkSub = source.subscribe({
        next: state => {
          nextTarget = state;
        },
        error: e => sink.error(e),
        complete: () => sink.complete()
      });

      const unsubscribe = () => {
        sub.unsubscribe();
        sinkSub.unsubscribe();
      };

      return {
        unsubscribe
      };
    });
  }

  // Helper for managing play state
  class Player extends Emitter {
    static create(totalTime) {
      return new Player(totalTime);
    }

    constructor(totalTime) {
      super(sink => {
        const cb = time => sink.next(time);

        this.on('update', cb);
        this.emit('update', this._time);
        return () => this.off('update', cb);
      });
      this.totalTime = parseTime(totalTime);
      this._clockTime = 0;
      this._time = 0;
      this.playbackRate = 1;
      this._paused = true;
      this._loop = false;
      this._sub = animationFrames().subscribe(t => this.step(t));
    }

    get progress() {
      return this.totalTime > 0 ? this._time / this.totalTime * 100 : 0;
    }

    set progress(p) {
      this.seek(Math.max(0, p) * this.totalTime / 100);
    }

    get time() {
      return this._time;
    }

    set time(t) {
      this.seek(t);
    }

    get paused() {
      return this._paused;
    }

    set paused(p) {
      this.togglePause(p);
    }

    destroy() {
      this.off(true);

      this._sub.unsubscribe();

      this.emit('destroy');
    }

    togglePause(paused) {
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
    }

    pause() {
      return this.togglePause(true);
    }

    play() {
      return this.togglePause(false);
    }

    loop(toggle = true) {
      this._loop = toggle;
      return this;
    } // Stops after it reaches time t


    playTo(time) {
      time = parseTime(time);

      if (this._time === time) {
        return this;
      }

      this._playToTime = time;
      this._oldPlaybackRate = this.playbackRate;
      this.playbackRate = time >= this._time ? 1 : -1;
      return this.play();
    }

    seek(time) {
      this._time = time;
      this.emit('update', time);
      this.emit('seek', time);
      return this;
    }

    step(now) {
      const clockTime = this._clockTime;
      const playbackRate = this.playbackRate;
      const dt = now - clockTime;
      let time = this._time;
      const totalTime = this.totalTime;
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
    }

  }

  const regulatedBy = (regulator, onlyNew = false) => source => new Observable(sink => {
    let isFresh = false;
    let value = null;
    let isComplete = false;
    const regSub = regulator.subscribe({
      next: () => {
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
      complete: () => {
        sink.complete();
      },
      error: e => {
        sink.error(e);
      }
    });
    const sub = source.subscribe({
      next: v => {
        value = v;
        isFresh = true;
      },
      complete: () => {
        isComplete = true;
      },
      error: e => {
        sink.error(e);
        isFresh = false;
        value = null;
        regSub.unsubscribe();
      }
    });
    return () => {
      sub.unsubscribe();
      regSub.unsubscribe();
    };
  });

  const animationThrottle = () => source => {
    return regulatedBy(animationFrames(), true)(source);
  };

  const defaultThreshold = 5000 / 60; // 5 frames

  const animationSync = (config = {}) => timeSource => new Observable(sink => {
    let syncTime = 0;
    let isFresh = false;
    let isComplete = false;
    let lastFrameTime = 0;
    let lastTime = 0;
    let paused = true;
    const timeSub = animationFrames().subscribe(frameTime => {
      const playbackRate = Number.isFinite(config.playbackRate) ? config.playbackRate : 1;
      const isPlaying = !paused && playbackRate !== 0;
      const threshold = config.threshold || defaultThreshold;
      let time = frameTime;

      if (!isPlaying) {
        time = isFresh ? syncTime : lastTime;
      } else {
        // extrapolate
        const dt = (frameTime - lastFrameTime) * playbackRate;
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
    const sub = timeSource.subscribe({
      next: time => {
        paused = time === syncTime;
        syncTime = time;
        isFresh = true;
      },
      complete: () => {
        isComplete = true;
      },
      error: e => {
        sink.error(e);
        timeSub.unsubscribe();
      }
    });
    return () => {
      sub.unsubscribe();
      timeSub.unsubscribe();
    };
  });

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    parseTime: parseTime,
    parseEasing: parseEasing,
    parseInterpolator: parseInterpolator
  });

  exports.Easing = index$2;
  exports.Interpolators = index$1;
  exports.Meddle = Meddle;
  exports.Observable = Observable;
  exports.Parsers = index;
  exports.Player = Player;
  exports.Subject = Subject;
  exports.Tween = Tween;
  exports.Util = index$3;
  exports.animationFrames = animationFrames;
  exports.animationSync = animationSync;
  exports.animationThrottle = animationThrottle;
  exports.combineLatest = combineLatest;
  exports.map = map;
  exports.merge = merge;
  exports.pipe = pipe;
  exports.pipeFromArray = pipeFromArray;
  exports.registerType = registerType;
  exports.regulatedBy = regulatedBy;
  exports.smoothen = smoothen;
  exports.spreadAssign = spreadAssign;
  exports.spreadCombineLatest = spreadCombineLatest;
  exports.zip = zip;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
