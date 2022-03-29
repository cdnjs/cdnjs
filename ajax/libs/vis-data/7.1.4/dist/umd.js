/**
 * vis-data
 * http://visjs.org/
 *
 * Manage unstructured data using DataSet. Add, update, and remove data, and listen for changes in the data.
 *
 * @version 7.1.4
 * @date    2022-03-15T15:26:16.016Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vis = global.vis || {}));
})(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var defineProperty$e = {exports: {}};

  var check = function (it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global$M = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  function () {
    return this;
  }() || Function('return this')();

  var fails$r = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$q = fails$r;
  var functionBindNative = !fails$q(function () {
    var test = function () {
      /* empty */
    }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$4 = functionBindNative;
  var FunctionPrototype$3 = Function.prototype;
  var apply$6 = FunctionPrototype$3.apply;
  var call$c = FunctionPrototype$3.call; // eslint-disable-next-line es/no-reflect -- safe

  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$4 ? call$c.bind(apply$6) : function () {
    return call$c.apply(apply$6, arguments);
  });

  var NATIVE_BIND$3 = functionBindNative;
  var FunctionPrototype$2 = Function.prototype;
  var bind$d = FunctionPrototype$2.bind;
  var call$b = FunctionPrototype$2.call;
  var uncurryThis$t = NATIVE_BIND$3 && bind$d.bind(call$b, call$b);
  var functionUncurryThis = NATIVE_BIND$3 ? function (fn) {
    return fn && uncurryThis$t(fn);
  } : function (fn) {
    return fn && function () {
      return call$b.apply(fn, arguments);
    };
  };

  // https://tc39.es/ecma262/#sec-iscallable

  var isCallable$h = function (argument) {
    return typeof argument == 'function';
  };

  var objectGetOwnPropertyDescriptor = {};

  var fails$p = fails$r; // Detect IE8's incomplete defineProperty implementation

  var descriptors = !fails$p(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1] != 7;
  });

  var NATIVE_BIND$2 = functionBindNative;
  var call$a = Function.prototype.call;
  var functionCall = NATIVE_BIND$2 ? call$a.bind(call$a) : function () {
    return call$a.apply(call$a, arguments);
  };

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable$2 = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var getOwnPropertyDescriptor$5 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

  var NASHORN_BUG = getOwnPropertyDescriptor$5 && !$propertyIsEnumerable$2.call({
    1: 2
  }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$5(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$2;

  var createPropertyDescriptor$5 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var uncurryThis$s = functionUncurryThis;
  var toString$9 = uncurryThis$s({}.toString);
  var stringSlice$1 = uncurryThis$s(''.slice);

  var classofRaw$1 = function (it) {
    return stringSlice$1(toString$9(it), 8, -1);
  };

  var global$L = global$M;
  var uncurryThis$r = functionUncurryThis;
  var fails$o = fails$r;
  var classof$f = classofRaw$1;
  var Object$9 = global$L.Object;
  var split = uncurryThis$r(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails$o(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$9('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$f(it) == 'String' ? split(it, '') : Object$9(it);
  } : Object$9;

  var global$K = global$M;
  var TypeError$j = global$K.TypeError; // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible$5 = function (it) {
    if (it == undefined) throw TypeError$j("Can't call method on " + it);
    return it;
  };

  var IndexedObject$3 = indexedObject;
  var requireObjectCoercible$4 = requireObjectCoercible$5;

  var toIndexedObject$b = function (it) {
    return IndexedObject$3(requireObjectCoercible$4(it));
  };

  var isCallable$g = isCallable$h;

  var isObject$f = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$g(it);
  };

  var path$q = {};

  var path$p = path$q;
  var global$J = global$M;
  var isCallable$f = isCallable$h;

  var aFunction = function (variable) {
    return isCallable$f(variable) ? variable : undefined;
  };

  var getBuiltIn$9 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path$p[namespace]) || aFunction(global$J[namespace]) : path$p[namespace] && path$p[namespace][method] || global$J[namespace] && global$J[namespace][method];
  };

  var uncurryThis$q = functionUncurryThis;
  var objectIsPrototypeOf = uncurryThis$q({}.isPrototypeOf);

  var getBuiltIn$8 = getBuiltIn$9;
  var engineUserAgent = getBuiltIn$8('navigator', 'userAgent') || '';

  var global$I = global$M;
  var userAgent$3 = engineUserAgent;
  var process = global$I.process;
  var Deno = global$I.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us

    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  } // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0


  if (!version && userAgent$3) {
    match = userAgent$3.match(/Edge\/(\d+)/);

    if (!match || match[1] >= 74) {
      match = userAgent$3.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es/no-symbol -- required for testing */
  var V8_VERSION$2 = engineV8Version;
  var fails$n = fails$r; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$n(function () {
    var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$2 = nativeSymbol;
  var useSymbolAsUid = NATIVE_SYMBOL$2 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

  var global$H = global$M;
  var getBuiltIn$7 = getBuiltIn$9;
  var isCallable$e = isCallable$h;
  var isPrototypeOf$i = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
  var Object$8 = global$H.Object;
  var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$7('Symbol');
    return isCallable$e($Symbol) && isPrototypeOf$i($Symbol.prototype, Object$8(it));
  };

  var global$G = global$M;
  var String$4 = global$G.String;

  var tryToString$4 = function (argument) {
    try {
      return String$4(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var global$F = global$M;
  var isCallable$d = isCallable$h;
  var tryToString$3 = tryToString$4;
  var TypeError$i = global$F.TypeError; // `Assert: IsCallable(argument) is true`

  var aCallable$7 = function (argument) {
    if (isCallable$d(argument)) return argument;
    throw TypeError$i(tryToString$3(argument) + ' is not a function');
  };

  var aCallable$6 = aCallable$7; // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod

  var getMethod$3 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable$6(func);
  };

  var global$E = global$M;
  var call$9 = functionCall;
  var isCallable$c = isCallable$h;
  var isObject$e = isObject$f;
  var TypeError$h = global$E.TypeError; // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive

  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$c(fn = input.toString) && !isObject$e(val = call$9(fn, input))) return val;
    if (isCallable$c(fn = input.valueOf) && !isObject$e(val = call$9(fn, input))) return val;
    if (pref !== 'string' && isCallable$c(fn = input.toString) && !isObject$e(val = call$9(fn, input))) return val;
    throw TypeError$h("Can't convert object to primitive value");
  };

  var shared$4 = {exports: {}};

  var global$D = global$M; // eslint-disable-next-line es/no-object-defineproperty -- safe

  var defineProperty$d = Object.defineProperty;

  var setGlobal$1 = function (key, value) {
    try {
      defineProperty$d(global$D, key, {
        value: value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global$D[key] = value;
    }

    return value;
  };

  var global$C = global$M;
  var setGlobal = setGlobal$1;
  var SHARED = '__core-js_shared__';
  var store$3 = global$C[SHARED] || setGlobal(SHARED, {});
  var sharedStore = store$3;

  var store$2 = sharedStore;
  (shared$4.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.21.1',
    mode: 'pure' ,
    copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var global$B = global$M;
  var requireObjectCoercible$3 = requireObjectCoercible$5;
  var Object$7 = global$B.Object; // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject

  var toObject$e = function (argument) {
    return Object$7(requireObjectCoercible$3(argument));
  };

  var uncurryThis$p = functionUncurryThis;
  var toObject$d = toObject$e;
  var hasOwnProperty = uncurryThis$p({}.hasOwnProperty); // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty

  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$d(it), key);
  };

  var uncurryThis$o = functionUncurryThis;
  var id$1 = 0;
  var postfix = Math.random();
  var toString$8 = uncurryThis$o(1.0.toString);

  var uid$4 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$8(++id$1 + postfix, 36);
  };

  var global$A = global$M;
  var shared$3 = shared$4.exports;
  var hasOwn$f = hasOwnProperty_1;
  var uid$3 = uid$4;
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var WellKnownSymbolsStore$1 = shared$3('wks');
  var Symbol$2 = global$A.Symbol;
  var symbolFor = Symbol$2 && Symbol$2['for'];
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$3;

  var wellKnownSymbol$j = function (name) {
    if (!hasOwn$f(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      var description = 'Symbol.' + name;

      if (NATIVE_SYMBOL$1 && hasOwn$f(Symbol$2, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$2[name];
      } else if (USE_SYMBOL_AS_UID && symbolFor) {
        WellKnownSymbolsStore$1[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
      }
    }

    return WellKnownSymbolsStore$1[name];
  };

  var global$z = global$M;
  var call$8 = functionCall;
  var isObject$d = isObject$f;
  var isSymbol$2 = isSymbol$3;
  var getMethod$2 = getMethod$3;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$i = wellKnownSymbol$j;
  var TypeError$g = global$z.TypeError;
  var TO_PRIMITIVE$1 = wellKnownSymbol$i('toPrimitive'); // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive

  var toPrimitive$1 = function (input, pref) {
    if (!isObject$d(input) || isSymbol$2(input)) return input;
    var exoticToPrim = getMethod$2(input, TO_PRIMITIVE$1);
    var result;

    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$8(exoticToPrim, input, pref);
      if (!isObject$d(result) || isSymbol$2(result)) return result;
      throw TypeError$g("Can't convert object to primitive value");
    }

    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol$1 = isSymbol$3; // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey

  var toPropertyKey$4 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol$1(key) ? key : key + '';
  };

  var global$y = global$M;
  var isObject$c = isObject$f;
  var document$1 = global$y.document; // typeof document.createElement is 'object' in old IE

  var EXISTS$1 = isObject$c(document$1) && isObject$c(document$1.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$h = descriptors;
  var fails$m = fails$r;
  var createElement = documentCreateElement$1; // Thanks to IE8 for its funny defineProperty

  var ie8DomDefine = !DESCRIPTORS$h && !fails$m(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () {
        return 7;
      }
    }).a != 7;
  });

  var DESCRIPTORS$g = descriptors;
  var call$7 = functionCall;
  var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$4 = createPropertyDescriptor$5;
  var toIndexedObject$a = toIndexedObject$b;
  var toPropertyKey$3 = toPropertyKey$4;
  var hasOwn$e = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$g ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$a(O);
    P = toPropertyKey$3(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$2(O, P);
    } catch (error) {
      /* empty */
    }
    if (hasOwn$e(O, P)) return createPropertyDescriptor$4(!call$7(propertyIsEnumerableModule$2.f, O, P), O[P]);
  };

  var fails$l = fails$r;
  var isCallable$b = isCallable$h;
  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : isCallable$b(detection) ? fails$l(detection) : !!detection;
  };

  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';
  var isForced_1 = isForced$1;

  var uncurryThis$n = functionUncurryThis;
  var aCallable$5 = aCallable$7;
  var NATIVE_BIND$1 = functionBindNative;
  var bind$c = uncurryThis$n(uncurryThis$n.bind); // optional / simple context binding

  var functionBindContext = function (fn, that) {
    aCallable$5(fn);
    return that === undefined ? fn : NATIVE_BIND$1 ? bind$c(fn, that) : function
      /* ...args */
    () {
      return fn.apply(that, arguments);
    };
  };

  var objectDefineProperty = {};

  var DESCRIPTORS$f = descriptors;
  var fails$k = fails$r; // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334

  var v8PrototypeDefineBug = DESCRIPTORS$f && fails$k(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () {
      /* empty */
    }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var global$x = global$M;
  var isObject$b = isObject$f;
  var String$3 = global$x.String;
  var TypeError$f = global$x.TypeError; // `Assert: Type(argument) is Object`

  var anObject$b = function (argument) {
    if (isObject$b(argument)) return argument;
    throw TypeError$f(String$3(argument) + ' is not an object');
  };

  var global$w = global$M;
  var DESCRIPTORS$e = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$a = anObject$b;
  var toPropertyKey$2 = toPropertyKey$4;
  var TypeError$e = global$w.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

  var $defineProperty$1 = Object.defineProperty; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable'; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  objectDefineProperty.f = DESCRIPTORS$e ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$a(O);
    P = toPropertyKey$2(P);
    anObject$a(Attributes);

    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor$1(O, P);

      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    }

    return $defineProperty$1(O, P, Attributes);
  } : $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$a(O);
    P = toPropertyKey$2(P);
    anObject$a(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$e('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$d = descriptors;
  var definePropertyModule$4 = objectDefineProperty;
  var createPropertyDescriptor$3 = createPropertyDescriptor$5;
  var createNonEnumerableProperty$6 = DESCRIPTORS$d ? function (object, key, value) {
    return definePropertyModule$4.f(object, key, createPropertyDescriptor$3(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var global$v = global$M;
  var apply$5 = functionApply;
  var uncurryThis$m = functionUncurryThis;
  var isCallable$a = isCallable$h;
  var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;
  var isForced = isForced_1;
  var path$o = path$q;
  var bind$b = functionBindContext;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$6;
  var hasOwn$d = hasOwnProperty_1;

  var wrapConstructor = function (NativeConstructor) {
    var Wrapper = function (a, b, c) {
      if (this instanceof Wrapper) {
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

      return apply$5(NativeConstructor, this, arguments);
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
    options.name        - the .name of the function if it does not match the key
  */


  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var PROTO = options.proto;
    var nativeSource = GLOBAL ? global$v : STATIC ? global$v[TARGET] : (global$v[TARGET] || {}).prototype;
    var target = GLOBAL ? path$o : path$o[TARGET] || createNonEnumerableProperty$5(path$o, TARGET, {})[TARGET];
    var targetPrototype = target.prototype;
    var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
    var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

    for (key in source) {
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

      USE_NATIVE = !FORCED && nativeSource && hasOwn$d(nativeSource, key);
      targetProperty = target[key];
      if (USE_NATIVE) if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$4(nativeSource, key);
        nativeProperty = descriptor && descriptor.value;
      } else nativeProperty = nativeSource[key]; // export native or implementation

      sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
      if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue; // bind timers to global for call from export context

      if (options.bind && USE_NATIVE) resultProperty = bind$b(sourceProperty, global$v); // wrap global constructors for prevent changs in this version
      else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty); // make static versions for prototype methods
      else if (PROTO && isCallable$a(sourceProperty)) resultProperty = uncurryThis$m(sourceProperty); // default case
      else resultProperty = sourceProperty; // add a flag to not completely full polyfills

      if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$5(resultProperty, 'sham', true);
      }

      createNonEnumerableProperty$5(target, key, resultProperty);

      if (PROTO) {
        VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

        if (!hasOwn$d(path$o, VIRTUAL_PROTOTYPE)) {
          createNonEnumerableProperty$5(path$o, VIRTUAL_PROTOTYPE, {});
        } // export virtual prototype methods


        createNonEnumerableProperty$5(path$o[VIRTUAL_PROTOTYPE], key, sourceProperty); // export real prototype methods

        if (options.real && targetPrototype && !targetPrototype[key]) {
          createNonEnumerableProperty$5(targetPrototype, key, sourceProperty);
        }
      }
    }
  };

  var $$C = _export;
  var DESCRIPTORS$c = descriptors;
  var defineProperty$c = objectDefineProperty.f; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  // eslint-disable-next-line es/no-object-defineproperty -- safe

  $$C({
    target: 'Object',
    stat: true,
    forced: Object.defineProperty !== defineProperty$c,
    sham: !DESCRIPTORS$c
  }, {
    defineProperty: defineProperty$c
  });

  var path$n = path$q;
  var Object$6 = path$n.Object;

  var defineProperty$b = defineProperty$e.exports = function defineProperty(it, key, desc) {
    return Object$6.defineProperty(it, key, desc);
  };

  if (Object$6.defineProperty.sham) defineProperty$b.sham = true;

  var parent$V = defineProperty$e.exports;
  var defineProperty$a = parent$V;

  var parent$U = defineProperty$a;
  var defineProperty$9 = parent$U;

  var parent$T = defineProperty$9;
  var defineProperty$8 = parent$T;

  var defineProperty$7 = defineProperty$8;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      defineProperty$7(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);

    defineProperty$7(Constructor, "prototype", {
      writable: false
    });

    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      defineProperty$7(obj, key, {
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

  var uncurryThis$l = functionUncurryThis;
  var arraySlice$5 = uncurryThis$l([].slice);

  var global$u = global$M;
  var uncurryThis$k = functionUncurryThis;
  var aCallable$4 = aCallable$7;
  var isObject$a = isObject$f;
  var hasOwn$c = hasOwnProperty_1;
  var arraySlice$4 = arraySlice$5;
  var NATIVE_BIND = functionBindNative;
  var Function$2 = global$u.Function;
  var concat$6 = uncurryThis$k([].concat);
  var join = uncurryThis$k([].join);
  var factories = {};

  var construct$4 = function (C, argsLength, args) {
    if (!hasOwn$c(factories, argsLength)) {
      for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';

      factories[argsLength] = Function$2('C,a', 'return new C(' + join(list, ',') + ')');
    }

    return factories[argsLength](C, args);
  }; // `Function.prototype.bind` method implementation
  // https://tc39.es/ecma262/#sec-function.prototype.bind


  var functionBind = NATIVE_BIND ? Function$2.bind : function bind(that
  /* , ...args */
  ) {
    var F = aCallable$4(this);
    var Prototype = F.prototype;
    var partArgs = arraySlice$4(arguments, 1);

    var boundFunction = function
      /* args... */
    bound() {
      var args = concat$6(partArgs, arraySlice$4(arguments));
      return this instanceof boundFunction ? construct$4(F, args.length, args) : F.apply(that, args);
    };

    if (isObject$a(Prototype)) boundFunction.prototype = Prototype;
    return boundFunction;
  };

  var $$B = _export;
  var bind$a = functionBind; // `Function.prototype.bind` method
  // https://tc39.es/ecma262/#sec-function.prototype.bind

  $$B({
    target: 'Function',
    proto: true,
    forced: Function.bind !== bind$a
  }, {
    bind: bind$a
  });

  var path$m = path$q;

  var entryVirtual$k = function (CONSTRUCTOR) {
    return path$m[CONSTRUCTOR + 'Prototype'];
  };

  var entryVirtual$j = entryVirtual$k;
  var bind$9 = entryVirtual$j('Function').bind;

  var isPrototypeOf$h = objectIsPrototypeOf;
  var method$e = bind$9;
  var FunctionPrototype$1 = Function.prototype;

  var bind$8 = function (it) {
    var own = it.bind;
    return it === FunctionPrototype$1 || isPrototypeOf$h(FunctionPrototype$1, it) && own === FunctionPrototype$1.bind ? method$e : own;
  };

  var parent$S = bind$8;
  var bind$7 = parent$S;

  var bind$6 = bind$7;

  var ceil = Math.ceil;
  var floor$1 = Math.floor; // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity

  var toIntegerOrInfinity$4 = function (argument) {
    var number = +argument; // eslint-disable-next-line no-self-compare -- safe

    return number !== number || number === 0 ? 0 : (number > 0 ? floor$1 : ceil)(number);
  };

  var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;
  var min$2 = Math.min; // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength

  var toLength$1 = function (argument) {
    return argument > 0 ? min$2(toIntegerOrInfinity$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength = toLength$1; // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike

  var lengthOfArrayLike$d = function (obj) {
    return toLength(obj.length);
  };

  var global$t = global$M;
  var aCallable$3 = aCallable$7;
  var toObject$c = toObject$e;
  var IndexedObject$2 = indexedObject;
  var lengthOfArrayLike$c = lengthOfArrayLike$d;
  var TypeError$d = global$t.TypeError; // `Array.prototype.{ reduce, reduceRight }` methods implementation

  var createMethod$5 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aCallable$3(callbackfn);
      var O = toObject$c(that);
      var self = IndexedObject$2(O);
      var length = lengthOfArrayLike$c(O);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2) while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }

        index += i;

        if (IS_RIGHT ? index < 0 : length <= index) {
          throw TypeError$d('Reduce of empty array with no initial value');
        }
      }

      for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }

      return memo;
    };
  };

  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod$5(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$5(true)
  };

  var fails$j = fails$r;

  var arrayMethodIsStrict$5 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$j(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () {
        return 1;
      }, 1);
    });
  };

  var classof$e = classofRaw$1;
  var global$s = global$M;
  var engineIsNode = classof$e(global$s.process) == 'process';

  var $$A = _export;
  var $reduce = arrayReduce.left;
  var arrayMethodIsStrict$4 = arrayMethodIsStrict$5;
  var CHROME_VERSION = engineV8Version;
  var IS_NODE = engineIsNode;
  var STRICT_METHOD$4 = arrayMethodIsStrict$4('reduce'); // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

  var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83; // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce

  $$A({
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD$4 || CHROME_BUG
  }, {
    reduce: function reduce(callbackfn
    /* , initialValue */
    ) {
      var length = arguments.length;
      return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
    }
  });

  var entryVirtual$i = entryVirtual$k;
  var reduce$3 = entryVirtual$i('Array').reduce;

  var isPrototypeOf$g = objectIsPrototypeOf;
  var method$d = reduce$3;
  var ArrayPrototype$e = Array.prototype;

  var reduce$2 = function (it) {
    var own = it.reduce;
    return it === ArrayPrototype$e || isPrototypeOf$g(ArrayPrototype$e, it) && own === ArrayPrototype$e.reduce ? method$d : own;
  };

  var parent$R = reduce$2;
  var reduce$1 = parent$R;

  var reduce = reduce$1;

  var classof$d = classofRaw$1; // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe

  var isArray$d = Array.isArray || function isArray(argument) {
    return classof$d(argument) == 'Array';
  };

  var wellKnownSymbol$h = wellKnownSymbol$j;
  var TO_STRING_TAG$3 = wellKnownSymbol$h('toStringTag');
  var test$2 = {};
  test$2[TO_STRING_TAG$3] = 'z';
  var toStringTagSupport = String(test$2) === '[object z]';

  var global$r = global$M;
  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$9 = isCallable$h;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$g = wellKnownSymbol$j;
  var TO_STRING_TAG$2 = wellKnownSymbol$g('toStringTag');
  var Object$5 = global$r.Object; // ES3 wrong here

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


  var classof$c = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (tag = tryGet(O = Object$5(it), TO_STRING_TAG$2)) == 'string' ? tag // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$9(O.callee) ? 'Arguments' : result;
  };

  var uncurryThis$j = functionUncurryThis;
  var isCallable$8 = isCallable$h;
  var store$1 = sharedStore;
  var functionToString = uncurryThis$j(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

  if (!isCallable$8(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource$2 = store$1.inspectSource;

  var uncurryThis$i = functionUncurryThis;
  var fails$i = fails$r;
  var isCallable$7 = isCallable$h;
  var classof$b = classof$c;
  var getBuiltIn$6 = getBuiltIn$9;
  var inspectSource$1 = inspectSource$2;

  var noop = function () {
    /* empty */
  };

  var empty = [];
  var construct$3 = getBuiltIn$6('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$2 = uncurryThis$i(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable$7(argument)) return false;

    try {
      construct$3(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable$7(argument)) return false;

    switch (classof$b(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction':
        return false;
    }

    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec$2(constructorRegExp, inspectSource$1(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor

  var isConstructor$4 = !construct$3 || fails$i(function () {
    var called;
    return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
      called = true;
    }) || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var global$q = global$M;
  var isArray$c = isArray$d;
  var isConstructor$3 = isConstructor$4;
  var isObject$9 = isObject$f;
  var wellKnownSymbol$f = wellKnownSymbol$j;
  var SPECIES$3 = wellKnownSymbol$f('species');
  var Array$5 = global$q.Array; // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;

    if (isArray$c(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (isConstructor$3(C) && (C === Array$5 || isArray$c(C.prototype))) C = undefined;else if (isObject$9(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    }

    return C === undefined ? Array$5 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1; // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesCreate$4 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind$5 = functionBindContext;
  var uncurryThis$h = functionUncurryThis;
  var IndexedObject$1 = indexedObject;
  var toObject$b = toObject$e;
  var lengthOfArrayLike$b = lengthOfArrayLike$d;
  var arraySpeciesCreate$3 = arraySpeciesCreate$4;
  var push$5 = uncurryThis$h([].push); // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

  var createMethod$4 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$b($this);
      var self = IndexedObject$1(O);
      var boundFunction = bind$5(callbackfn, that);
      var length = lengthOfArrayLike$b(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$3;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;

      for (; length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);

        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3:
              return true;
            // some

            case 5:
              return value;
            // find

            case 6:
              return index;
            // findIndex

            case 2:
              push$5(target, value);
            // filter
          } else switch (TYPE) {
            case 4:
              return false;
            // every

            case 7:
              push$5(target, value);
            // filterReject
          }
        }
      }

      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$4(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$4(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$4(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$4(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$4(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$4(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$4(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$4(7)
  };

  var fails$h = fails$r;
  var wellKnownSymbol$e = wellKnownSymbol$j;
  var V8_VERSION$1 = engineV8Version;
  var SPECIES$2 = wellKnownSymbol$e('species');

  var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$h(function () {
      var array = [];
      var constructor = array.constructor = {};

      constructor[SPECIES$2] = function () {
        return {
          foo: 1
        };
      };

      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$z = _export;
  var $filter = arrayIteration.filter;
  var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;
  var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$4('filter'); // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species

  $$z({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$3
  }, {
    filter: function filter(callbackfn
    /* , thisArg */
    ) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var entryVirtual$h = entryVirtual$k;
  var filter$3 = entryVirtual$h('Array').filter;

  var isPrototypeOf$f = objectIsPrototypeOf;
  var method$c = filter$3;
  var ArrayPrototype$d = Array.prototype;

  var filter$2 = function (it) {
    var own = it.filter;
    return it === ArrayPrototype$d || isPrototypeOf$f(ArrayPrototype$d, it) && own === ArrayPrototype$d.filter ? method$c : own;
  };

  var parent$Q = filter$2;
  var filter$1 = parent$Q;

  var filter = filter$1;

  var $$y = _export;
  var $map = arrayIteration.map;
  var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;
  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('map'); // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species

  $$y({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$2
  }, {
    map: function map(callbackfn
    /* , thisArg */
    ) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var entryVirtual$g = entryVirtual$k;
  var map$6 = entryVirtual$g('Array').map;

  var isPrototypeOf$e = objectIsPrototypeOf;
  var method$b = map$6;
  var ArrayPrototype$c = Array.prototype;

  var map$5 = function (it) {
    var own = it.map;
    return it === ArrayPrototype$c || isPrototypeOf$e(ArrayPrototype$c, it) && own === ArrayPrototype$c.map ? method$b : own;
  };

  var parent$P = map$5;
  var map$4 = parent$P;

  var map$3 = map$4;

  var global$p = global$M;
  var isArray$b = isArray$d;
  var lengthOfArrayLike$a = lengthOfArrayLike$d;
  var bind$4 = functionBindContext;
  var TypeError$c = global$p.TypeError; // `FlattenIntoArray` abstract operation
  // https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray

  var flattenIntoArray$1 = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
    var targetIndex = start;
    var sourceIndex = 0;
    var mapFn = mapper ? bind$4(mapper, thisArg) : false;
    var element, elementLen;

    while (sourceIndex < sourceLen) {
      if (sourceIndex in source) {
        element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

        if (depth > 0 && isArray$b(element)) {
          elementLen = lengthOfArrayLike$a(element);
          targetIndex = flattenIntoArray$1(target, original, element, elementLen, targetIndex, depth - 1) - 1;
        } else {
          if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError$c('Exceed the acceptable array length');
          target[targetIndex] = element;
        }

        targetIndex++;
      }

      sourceIndex++;
    }

    return targetIndex;
  };

  var flattenIntoArray_1 = flattenIntoArray$1;

  var $$x = _export;
  var flattenIntoArray = flattenIntoArray_1;
  var aCallable$2 = aCallable$7;
  var toObject$a = toObject$e;
  var lengthOfArrayLike$9 = lengthOfArrayLike$d;
  var arraySpeciesCreate$2 = arraySpeciesCreate$4; // `Array.prototype.flatMap` method
  // https://tc39.es/ecma262/#sec-array.prototype.flatmap

  $$x({
    target: 'Array',
    proto: true
  }, {
    flatMap: function flatMap(callbackfn
    /* , thisArg */
    ) {
      var O = toObject$a(this);
      var sourceLen = lengthOfArrayLike$9(O);
      var A;
      aCallable$2(callbackfn);
      A = arraySpeciesCreate$2(O, 0);
      A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      return A;
    }
  });

  var entryVirtual$f = entryVirtual$k;
  var flatMap$3 = entryVirtual$f('Array').flatMap;

  var isPrototypeOf$d = objectIsPrototypeOf;
  var method$a = flatMap$3;
  var ArrayPrototype$b = Array.prototype;

  var flatMap$2 = function (it) {
    var own = it.flatMap;
    return it === ArrayPrototype$b || isPrototypeOf$d(ArrayPrototype$b, it) && own === ArrayPrototype$b.flatMap ? method$a : own;
  };

  var parent$O = flatMap$2;
  var flatMap$1 = parent$O;

  var flatMap = flatMap$1;

  /**
   * Create new data pipe.
   *
   * @param from - The source data set or data view.
   * @remarks
   * Example usage:
   * ```typescript
   * interface AppItem {
   *   whoami: string;
   *   appData: unknown;
   *   visData: VisItem;
   * }
   * interface VisItem {
   *   id: number;
   *   label: string;
   *   color: string;
   *   x: number;
   *   y: number;
   * }
   *
   * const ds1 = new DataSet<AppItem, "whoami">([], { fieldId: "whoami" });
   * const ds2 = new DataSet<VisItem, "id">();
   *
   * const pipe = createNewDataPipeFrom(ds1)
   *   .filter((item): boolean => item.enabled === true)
   *   .map<VisItem, "id">((item): VisItem => item.visData)
   *   .to(ds2);
   *
   * pipe.start();
   * ```
   * @returns A factory whose methods can be used to configure the pipe.
   */
  function createNewDataPipeFrom(from) {
    return new DataPipeUnderConstruction(from);
  }
  /**
   * Internal implementation of the pipe. This should be accessible only through
   * `createNewDataPipeFrom` from the outside.
   *
   * @typeParam SI - Source item type.
   * @typeParam SP - Source item type's id property name.
   * @typeParam TI - Target item type.
   * @typeParam TP - Target item type's id property name.
   */

  var SimpleDataPipe = /*#__PURE__*/function () {
    /**
     * Bound listeners for use with `DataInterface['on' | 'off']`.
     */

    /**
     * Create a new data pipe.
     *
     * @param _source - The data set or data view that will be observed.
     * @param _transformers - An array of transforming functions to be used to
     * filter or transform the items in the pipe.
     * @param _target - The data set or data view that will receive the items.
     */
    function SimpleDataPipe(_source, _transformers, _target) {
      var _context, _context2, _context3;

      _classCallCheck(this, SimpleDataPipe);

      _defineProperty(this, "_source", void 0);

      _defineProperty(this, "_transformers", void 0);

      _defineProperty(this, "_target", void 0);

      _defineProperty(this, "_listeners", {
        add: bind$6(_context = this._add).call(_context, this),
        remove: bind$6(_context2 = this._remove).call(_context2, this),
        update: bind$6(_context3 = this._update).call(_context3, this)
      });

      this._source = _source;
      this._transformers = _transformers;
      this._target = _target;
    }
    /** @inheritDoc */


    _createClass(SimpleDataPipe, [{
      key: "all",
      value: function all() {
        this._target.update(this._transformItems(this._source.get()));

        return this;
      }
      /** @inheritDoc */

    }, {
      key: "start",
      value: function start() {
        this._source.on("add", this._listeners.add);

        this._source.on("remove", this._listeners.remove);

        this._source.on("update", this._listeners.update);

        return this;
      }
      /** @inheritDoc */

    }, {
      key: "stop",
      value: function stop() {
        this._source.off("add", this._listeners.add);

        this._source.off("remove", this._listeners.remove);

        this._source.off("update", this._listeners.update);

        return this;
      }
      /**
       * Apply the transformers to the items.
       *
       * @param items - The items to be transformed.
       * @returns The transformed items.
       */

    }, {
      key: "_transformItems",
      value: function _transformItems(items) {
        var _context4;

        return reduce(_context4 = this._transformers).call(_context4, function (items, transform) {
          return transform(items);
        }, items);
      }
      /**
       * Handle an add event.
       *
       * @param _name - Ignored.
       * @param payload - The payload containing the ids of the added items.
       */

    }, {
      key: "_add",
      value: function _add(_name, payload) {
        if (payload == null) {
          return;
        }

        this._target.add(this._transformItems(this._source.get(payload.items)));
      }
      /**
       * Handle an update event.
       *
       * @param _name - Ignored.
       * @param payload - The payload containing the ids of the updated items.
       */

    }, {
      key: "_update",
      value: function _update(_name, payload) {
        if (payload == null) {
          return;
        }

        this._target.update(this._transformItems(this._source.get(payload.items)));
      }
      /**
       * Handle a remove event.
       *
       * @param _name - Ignored.
       * @param payload - The payload containing the data of the removed items.
       */

    }, {
      key: "_remove",
      value: function _remove(_name, payload) {
        if (payload == null) {
          return;
        }

        this._target.remove(this._transformItems(payload.oldData));
      }
    }]);

    return SimpleDataPipe;
  }();
  /**
   * Internal implementation of the pipe factory. This should be accessible
   * only through `createNewDataPipeFrom` from the outside.
   *
   * @typeParam TI - Target item type.
   * @typeParam TP - Target item type's id property name.
   */


  var DataPipeUnderConstruction = /*#__PURE__*/function () {
    /**
     * Array transformers used to transform items within the pipe. This is typed
     * as any for the sake of simplicity.
     */

    /**
     * Create a new data pipe factory. This is an internal constructor that
     * should never be called from outside of this file.
     *
     * @param _source - The source data set or data view for this pipe.
     */
    function DataPipeUnderConstruction(_source) {
      _classCallCheck(this, DataPipeUnderConstruction);

      _defineProperty(this, "_source", void 0);

      _defineProperty(this, "_transformers", []);

      this._source = _source;
    }
    /**
     * Filter the items.
     *
     * @param callback - A filtering function that returns true if given item
     * should be piped and false if not.
     * @returns This factory for further configuration.
     */


    _createClass(DataPipeUnderConstruction, [{
      key: "filter",
      value: function filter$1(callback) {
        this._transformers.push(function (input) {
          return filter(input).call(input, callback);
        });

        return this;
      }
      /**
       * Map each source item to a new type.
       *
       * @param callback - A mapping function that takes a source item and returns
       * corresponding mapped item.
       * @typeParam TI - Target item type.
       * @typeParam TP - Target item type's id property name.
       * @returns This factory for further configuration.
       */

    }, {
      key: "map",
      value: function map(callback) {
        this._transformers.push(function (input) {
          return map$3(input).call(input, callback);
        });

        return this;
      }
      /**
       * Map each source item to zero or more items of a new type.
       *
       * @param callback - A mapping function that takes a source item and returns
       * an array of corresponding mapped items.
       * @typeParam TI - Target item type.
       * @typeParam TP - Target item type's id property name.
       * @returns This factory for further configuration.
       */

    }, {
      key: "flatMap",
      value: function flatMap$1(callback) {
        this._transformers.push(function (input) {
          return flatMap(input).call(input, callback);
        });

        return this;
      }
      /**
       * Connect this pipe to given data set.
       *
       * @param target - The data set that will receive the items from this pipe.
       * @returns The pipe connected between given data sets and performing
       * configured transformation on the processed items.
       */

    }, {
      key: "to",
      value: function to(target) {
        return new SimpleDataPipe(this._source, this._transformers, target);
      }
    }]);

    return DataPipeUnderConstruction;
  }();

  var global$o = global$M;
  var classof$a = classof$c;
  var String$2 = global$o.String;

  var toString$7 = function (argument) {
    if (classof$a(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String$2(argument);
  };

  var uncurryThis$g = functionUncurryThis;
  var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;
  var toString$6 = toString$7;
  var requireObjectCoercible$2 = requireObjectCoercible$5;
  var charAt$2 = uncurryThis$g(''.charAt);
  var charCodeAt$1 = uncurryThis$g(''.charCodeAt);
  var stringSlice = uncurryThis$g(''.slice);

  var createMethod$3 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$6(requireObjectCoercible$2($this));
      var position = toIntegerOrInfinity$2(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt$1(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? charAt$2(S, position) : first : CONVERT_TO_STRING ? stringSlice(S, position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$3(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$3(true)
  };

  var global$n = global$M;
  var isCallable$6 = isCallable$h;
  var inspectSource = inspectSource$2;
  var WeakMap$1 = global$n.WeakMap;
  var nativeWeakMap = isCallable$6(WeakMap$1) && /native code/.test(inspectSource(WeakMap$1));

  var shared$2 = shared$4.exports;
  var uid$2 = uid$4;
  var keys$7 = shared$2('keys');

  var sharedKey$4 = function (key) {
    return keys$7[key] || (keys$7[key] = uid$2(key));
  };

  var hiddenKeys$6 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$m = global$M;
  var uncurryThis$f = functionUncurryThis;
  var isObject$8 = isObject$f;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$6;
  var hasOwn$b = hasOwnProperty_1;
  var shared$1 = sharedStore;
  var sharedKey$3 = sharedKey$4;
  var hiddenKeys$5 = hiddenKeys$6;
  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$b = global$m.TypeError;
  var WeakMap = global$m.WeakMap;
  var set$3, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set$3(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;

      if (!isObject$8(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$b('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$1.state) {
    var store = shared$1.state || (shared$1.state = new WeakMap());
    var wmget = uncurryThis$f(store.get);
    var wmhas = uncurryThis$f(store.has);
    var wmset = uncurryThis$f(store.set);

    set$3 = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$b(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };

    get = function (it) {
      return wmget(store, it) || {};
    };

    has = function (it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey$3('state');
    hiddenKeys$5[STATE] = true;

    set$3 = function (it, metadata) {
      if (hasOwn$b(it, STATE)) throw new TypeError$b(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$4(it, STATE, metadata);
      return metadata;
    };

    get = function (it) {
      return hasOwn$b(it, STATE) ? it[STATE] : {};
    };

    has = function (it) {
      return hasOwn$b(it, STATE);
    };
  }

  var internalState = {
    set: set$3,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var DESCRIPTORS$b = descriptors;
  var hasOwn$a = hasOwnProperty_1;
  var FunctionPrototype = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var getDescriptor = DESCRIPTORS$b && Object.getOwnPropertyDescriptor;
  var EXISTS = hasOwn$a(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

  var PROPER = EXISTS && function something() {
    /* empty */
  }.name === 'something';

  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$b || DESCRIPTORS$b && getDescriptor(FunctionPrototype, 'name').configurable);
  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var objectDefineProperties = {};

  var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
  var max$3 = Math.max;
  var min$1 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex$5 = function (index, length) {
    var integer = toIntegerOrInfinity$1(index);
    return integer < 0 ? max$3(integer + length, 0) : min$1(integer, length);
  };

  var toIndexedObject$9 = toIndexedObject$b;
  var toAbsoluteIndex$4 = toAbsoluteIndex$5;
  var lengthOfArrayLike$8 = lengthOfArrayLike$d; // `Array.prototype.{ indexOf, includes }` methods implementation

  var createMethod$2 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$9($this);
      var length = lengthOfArrayLike$8(O);
      var index = toAbsoluteIndex$4(fromIndex, length);
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
    includes: createMethod$2(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$2(false)
  };

  var uncurryThis$e = functionUncurryThis;
  var hasOwn$9 = hasOwnProperty_1;
  var toIndexedObject$8 = toIndexedObject$b;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$4 = hiddenKeys$6;
  var push$4 = uncurryThis$e([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$8(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) !hasOwn$9(hiddenKeys$4, key) && hasOwn$9(O, key) && push$4(result, key); // Don't enum bug & hidden keys


    while (names.length > i) if (hasOwn$9(O, key = names[i++])) {
      ~indexOf(result, key) || push$4(result, key);
    }

    return result;
  };

  var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3; // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe

  var objectKeys$4 = Object.keys || function keys(O) {
    return internalObjectKeys$1(O, enumBugKeys$2);
  };

  var DESCRIPTORS$a = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule$3 = objectDefineProperty;
  var anObject$9 = anObject$b;
  var toIndexedObject$7 = toIndexedObject$b;
  var objectKeys$3 = objectKeys$4; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe

  objectDefineProperties.f = DESCRIPTORS$a && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$9(O);
    var props = toIndexedObject$7(Properties);
    var keys = objectKeys$3(Properties);
    var length = keys.length;
    var index = 0;
    var key;

    while (length > index) definePropertyModule$3.f(O, key = keys[index++], props[key]);

    return O;
  };

  var getBuiltIn$5 = getBuiltIn$9;
  var html$1 = getBuiltIn$5('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */
  var anObject$8 = anObject$b;
  var definePropertiesModule$1 = objectDefineProperties;
  var enumBugKeys$1 = enumBugKeys$3;
  var hiddenKeys$3 = hiddenKeys$6;
  var html = html$1;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey$2 = sharedKey$4;
  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$2('IE_PROTO');

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

    var length = enumBugKeys$1.length;

    while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$1[length]];

    return NullProtoObject();
  };

  hiddenKeys$3[IE_PROTO$1] = true; // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create

  var objectCreate = Object.create || function create(O, Properties) {
    var result;

    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject$8(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();

    return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
  };

  var fails$g = fails$r;
  var correctPrototypeGetter = !fails$g(function () {
    function F() {
      /* empty */
    }

    F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var global$l = global$M;
  var hasOwn$8 = hasOwnProperty_1;
  var isCallable$5 = isCallable$h;
  var toObject$9 = toObject$e;
  var sharedKey$1 = sharedKey$4;
  var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;
  var IE_PROTO = sharedKey$1('IE_PROTO');
  var Object$4 = global$l.Object;
  var ObjectPrototype$2 = Object$4.prototype; // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof

  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER$1 ? Object$4.getPrototypeOf : function (O) {
    var object = toObject$9(O);
    if (hasOwn$8(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;

    if (isCallable$5(constructor) && object instanceof constructor) {
      return constructor.prototype;
    }

    return object instanceof Object$4 ? ObjectPrototype$2 : null;
  };

  var createNonEnumerableProperty$3 = createNonEnumerableProperty$6;

  var redefine$4 = function (target, key, value, options) {
    if (options && options.enumerable) target[key] = value;else createNonEnumerableProperty$3(target, key, value);
  };

  var fails$f = fails$r;
  var isCallable$4 = isCallable$h;
  var create$a = objectCreate;
  var getPrototypeOf$6 = objectGetPrototypeOf;
  var redefine$3 = redefine$4;
  var wellKnownSymbol$d = wellKnownSymbol$j;
  var ITERATOR$5 = wellKnownSymbol$d('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false; // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object

  var IteratorPrototype$1, PrototypeOfArrayIteratorPrototype, arrayIterator;
  /* eslint-disable es/no-array-prototype-keys -- safe */

  if ([].keys) {
    arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$6(getPrototypeOf$6(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$1 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$1 == undefined || fails$f(function () {
    var test = {}; // FF44- legacy iterators case

    return IteratorPrototype$1[ITERATOR$5].call(test) !== test;
  });
  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$1 = {};else IteratorPrototype$1 = create$a(IteratorPrototype$1); // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

  if (!isCallable$4(IteratorPrototype$1[ITERATOR$5])) {
    redefine$3(IteratorPrototype$1, ITERATOR$5, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$1,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$9 = classof$c; // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$9(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var defineProperty$6 = objectDefineProperty.f;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$6;
  var hasOwn$7 = hasOwnProperty_1;
  var toString$5 = objectToString;
  var wellKnownSymbol$c = wellKnownSymbol$j;
  var TO_STRING_TAG$1 = wellKnownSymbol$c('toStringTag');

  var setToStringTag$5 = function (it, TAG, STATIC, SET_METHOD) {
    if (it) {
      var target = STATIC ? it : it.prototype;

      if (!hasOwn$7(target, TO_STRING_TAG$1)) {
        defineProperty$6(target, TO_STRING_TAG$1, {
          configurable: true,
          value: TAG
        });
      }

      if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
        createNonEnumerableProperty$2(target, 'toString', toString$5);
      }
    }
  };

  var iterators = {};

  var IteratorPrototype = iteratorsCore.IteratorPrototype;
  var create$9 = objectCreate;
  var createPropertyDescriptor$2 = createPropertyDescriptor$5;
  var setToStringTag$4 = setToStringTag$5;
  var Iterators$5 = iterators;

  var returnThis$1 = function () {
    return this;
  };

  var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$9(IteratorPrototype, {
      next: createPropertyDescriptor$2(+!ENUMERABLE_NEXT, next)
    });
    setToStringTag$4(IteratorConstructor, TO_STRING_TAG, false, true);
    Iterators$5[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var global$k = global$M;
  var isCallable$3 = isCallable$h;
  var String$1 = global$k.String;
  var TypeError$a = global$k.TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$3(argument)) return argument;
    throw TypeError$a("Can't set " + String$1(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */
  var uncurryThis$d = functionUncurryThis;
  var anObject$7 = anObject$b;
  var aPossiblePrototype = aPossiblePrototype$1; // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe

  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;

    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = uncurryThis$d(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) {
      /* empty */
    }

    return function setPrototypeOf(O, proto) {
      anObject$7(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$w = _export;
  var call$6 = functionCall;
  var FunctionName = functionName;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf$5 = objectGetPrototypeOf;
  var setToStringTag$3 = setToStringTag$5;
  var redefine$2 = redefine$4;
  var wellKnownSymbol$b = wellKnownSymbol$j;
  var Iterators$4 = iterators;
  var IteratorsCore = iteratorsCore;
  var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$4 = wellKnownSymbol$b('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () {
    return this;
  };

  var defineIterator$3 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
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
    var nativeIterator = IterablePrototype[ITERATOR$4] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY; // fix native

    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf$5(anyNativeIterator.call(new Iterable()));

      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {


        setToStringTag$3(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
        Iterators$4[TO_STRING_TAG] = returnThis;
      }
    } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF


    if (PROPER_FUNCTION_NAME$1 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      {
        INCORRECT_VALUES_NAME = true;

        defaultIterator = function values() {
          return call$6(nativeIterator, this);
        };
      }
    } // export additional methods


    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$2(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$w({
        target: NAME,
        proto: true,
        forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
      }, methods);
    } // define iterator


    if ((FORCED) && IterablePrototype[ITERATOR$4] !== defaultIterator) {
      redefine$2(IterablePrototype, ITERATOR$4, defaultIterator, {
        name: DEFAULT
      });
    }

    Iterators$4[NAME] = defaultIterator;
    return methods;
  };

  var charAt$1 = stringMultibyte.charAt;
  var toString$4 = toString$7;
  var InternalStateModule$4 = internalState;
  var defineIterator$2 = defineIterator$3;
  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$4 = InternalStateModule$4.set;
  var getInternalState$2 = InternalStateModule$4.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator

  defineIterator$2(String, 'String', function (iterated) {
    setInternalState$4(this, {
      type: STRING_ITERATOR,
      string: toString$4(iterated),
      index: 0
    }); // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$2(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return {
      value: undefined,
      done: true
    };
    point = charAt$1(string, index);
    state.index += point.length;
    return {
      value: point,
      done: false
    };
  });

  var call$5 = functionCall;
  var anObject$6 = anObject$b;
  var getMethod$1 = getMethod$3;

  var iteratorClose$2 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$6(iterator);

    try {
      innerResult = getMethod$1(iterator, 'return');

      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }

      innerResult = call$5(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }

    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$6(innerResult);
    return value;
  };

  var anObject$5 = anObject$b;
  var iteratorClose$1 = iteratorClose$2; // call something on iterator step with safe closing on error

  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$5(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose$1(iterator, 'throw', error);
    }
  };

  var wellKnownSymbol$a = wellKnownSymbol$j;
  var Iterators$3 = iterators;
  var ITERATOR$3 = wellKnownSymbol$a('iterator');
  var ArrayPrototype$a = Array.prototype; // check on default Array iterator

  var isArrayIteratorMethod$2 = function (it) {
    return it !== undefined && (Iterators$3.Array === it || ArrayPrototype$a[ITERATOR$3] === it);
  };

  var toPropertyKey$1 = toPropertyKey$4;
  var definePropertyModule$2 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$5;

  var createProperty$6 = function (object, key, value) {
    var propertyKey = toPropertyKey$1(key);
    if (propertyKey in object) definePropertyModule$2.f(object, propertyKey, createPropertyDescriptor$1(0, value));else object[propertyKey] = value;
  };

  var classof$8 = classof$c;
  var getMethod = getMethod$3;
  var Iterators$2 = iterators;
  var wellKnownSymbol$9 = wellKnownSymbol$j;
  var ITERATOR$2 = wellKnownSymbol$9('iterator');

  var getIteratorMethod$8 = function (it) {
    if (it != undefined) return getMethod(it, ITERATOR$2) || getMethod(it, '@@iterator') || Iterators$2[classof$8(it)];
  };

  var global$j = global$M;
  var call$4 = functionCall;
  var aCallable$1 = aCallable$7;
  var anObject$4 = anObject$b;
  var tryToString$2 = tryToString$4;
  var getIteratorMethod$7 = getIteratorMethod$8;
  var TypeError$9 = global$j.TypeError;

  var getIterator$7 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$7(argument) : usingIterator;
    if (aCallable$1(iteratorMethod)) return anObject$4(call$4(iteratorMethod, argument));
    throw TypeError$9(tryToString$2(argument) + ' is not iterable');
  };

  var global$i = global$M;
  var bind$3 = functionBindContext;
  var call$3 = functionCall;
  var toObject$8 = toObject$e;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
  var isConstructor$2 = isConstructor$4;
  var lengthOfArrayLike$7 = lengthOfArrayLike$d;
  var createProperty$5 = createProperty$6;
  var getIterator$6 = getIterator$7;
  var getIteratorMethod$6 = getIteratorMethod$8;
  var Array$4 = global$i.Array; // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from

  var arrayFrom = function from(arrayLike
  /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = toObject$8(arrayLike);
    var IS_CONSTRUCTOR = isConstructor$2(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind$3(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod$6(O);
    var index = 0;
    var length, result, step, iterator, next, value; // if the target is not iterable or it's an array with the default iterator - use a simple case

    if (iteratorMethod && !(this == Array$4 && isArrayIteratorMethod$1(iteratorMethod))) {
      iterator = getIterator$6(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];

      for (; !(step = call$3(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty$5(result, index, value);
      }
    } else {
      length = lengthOfArrayLike$7(O);
      result = IS_CONSTRUCTOR ? new this(length) : Array$4(length);

      for (; length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty$5(result, index, value);
      }
    }

    result.length = index;
    return result;
  };

  var wellKnownSymbol$8 = wellKnownSymbol$j;
  var ITERATOR$1 = wellKnownSymbol$8('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return {
          done: !!called++
        };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };

    iteratorWithReturn[ITERATOR$1] = function () {
      return this;
    }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing


    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {
    /* empty */
  }

  var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;

    try {
      var object = {};

      object[ITERATOR$1] = function () {
        return {
          next: function () {
            return {
              done: ITERATION_SUPPORT = true
            };
          }
        };
      };

      exec(object);
    } catch (error) {
      /* empty */
    }

    return ITERATION_SUPPORT;
  };

  var $$v = _export;
  var from$6 = arrayFrom;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  }); // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from

  $$v({
    target: 'Array',
    stat: true,
    forced: INCORRECT_ITERATION
  }, {
    from: from$6
  });

  var path$l = path$q;
  var from$5 = path$l.Array.from;

  var parent$N = from$5;
  var from$4 = parent$N;

  var from$3 = from$4;

  var toIndexedObject$6 = toIndexedObject$b;
  var Iterators$1 = iterators;
  var InternalStateModule$3 = internalState;
  objectDefineProperty.f;
  var defineIterator$1 = defineIterator$3;
  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$3 = InternalStateModule$3.set;
  var getInternalState$1 = InternalStateModule$3.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator

  defineIterator$1(Array, 'Array', function (iterated, kind) {
    setInternalState$3(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$6(iterated),
      // target
      index: 0,
      // next index
      kind: kind // kind

    }); // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$1(this);
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

  Iterators$1.Arguments = Iterators$1.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  var getIteratorMethod$5 = getIteratorMethod$8;
  var getIteratorMethod_1 = getIteratorMethod$5;

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

  var DOMIterables$4 = domIterables;
  var global$h = global$M;
  var classof$7 = classof$c;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$6;
  var Iterators = iterators;
  var wellKnownSymbol$7 = wellKnownSymbol$j;
  var TO_STRING_TAG = wellKnownSymbol$7('toStringTag');

  for (var COLLECTION_NAME in DOMIterables$4) {
    var Collection = global$h[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;

    if (CollectionPrototype && classof$7(CollectionPrototype) !== TO_STRING_TAG) {
      createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }

    Iterators[COLLECTION_NAME] = Iterators.Array;
  }

  var parent$M = getIteratorMethod_1;
  var getIteratorMethod$4 = parent$M;

  var parent$L = getIteratorMethod$4;
  var getIteratorMethod$3 = parent$L;

  var parent$K = getIteratorMethod$3;
  var getIteratorMethod$2 = parent$K;

  var getIteratorMethod$1 = getIteratorMethod$2;

  var objectGetOwnPropertyNames = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys$2 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe

  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys$2);
  };

  var objectGetOwnPropertyNamesExternal = {};

  var global$g = global$M;
  var toAbsoluteIndex$3 = toAbsoluteIndex$5;
  var lengthOfArrayLike$6 = lengthOfArrayLike$d;
  var createProperty$4 = createProperty$6;
  var Array$3 = global$g.Array;
  var max$2 = Math.max;

  var arraySliceSimple = function (O, start, end) {
    var length = lengthOfArrayLike$6(O);
    var k = toAbsoluteIndex$3(start, length);
    var fin = toAbsoluteIndex$3(end === undefined ? length : end, length);
    var result = Array$3(max$2(fin - k, 0));

    for (var n = 0; k < fin; k++, n++) createProperty$4(result, n, O[k]);

    result.length = n;
    return result;
  };

  /* eslint-disable es/no-object-getownpropertynames -- safe */
  var classof$6 = classofRaw$1;
  var toIndexedObject$5 = toIndexedObject$b;
  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var arraySlice$3 = arraySliceSimple;
  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return arraySlice$3(windowNames);
    }
  }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && classof$6(it) == 'Window' ? getWindowNames(it) : $getOwnPropertyNames$1(toIndexedObject$5(it));
  };

  var objectGetOwnPropertySymbols = {};

  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var wellKnownSymbolWrapped = {};

  var wellKnownSymbol$6 = wellKnownSymbol$j;
  wellKnownSymbolWrapped.f = wellKnownSymbol$6;

  var path$k = path$q;
  var hasOwn$6 = hasOwnProperty_1;
  var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
  var defineProperty$5 = objectDefineProperty.f;

  var defineWellKnownSymbol$l = function (NAME) {
    var Symbol = path$k.Symbol || (path$k.Symbol = {});
    if (!hasOwn$6(Symbol, NAME)) defineProperty$5(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule$1.f(NAME)
    });
  };

  var $$u = _export;
  var global$f = global$M;
  var getBuiltIn$4 = getBuiltIn$9;
  var apply$4 = functionApply;
  var call$2 = functionCall;
  var uncurryThis$c = functionUncurryThis;
  var DESCRIPTORS$9 = descriptors;
  var NATIVE_SYMBOL = nativeSymbol;
  var fails$e = fails$r;
  var hasOwn$5 = hasOwnProperty_1;
  var isArray$a = isArray$d;
  var isCallable$2 = isCallable$h;
  var isObject$7 = isObject$f;
  var isPrototypeOf$c = objectIsPrototypeOf;
  var isSymbol = isSymbol$3;
  var anObject$3 = anObject$b;
  var toObject$7 = toObject$e;
  var toIndexedObject$4 = toIndexedObject$b;
  var toPropertyKey = toPropertyKey$4;
  var $toString = toString$7;
  var createPropertyDescriptor = createPropertyDescriptor$5;
  var nativeObjectCreate = objectCreate;
  var objectKeys$2 = objectKeys$4;
  var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
  var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
  var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
  var definePropertyModule$1 = objectDefineProperty;
  var definePropertiesModule = objectDefineProperties;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var arraySlice$2 = arraySlice$5;
  var redefine$1 = redefine$4;
  var shared = shared$4.exports;
  var sharedKey = sharedKey$4;
  var hiddenKeys$1 = hiddenKeys$6;
  var uid$1 = uid$4;
  var wellKnownSymbol$5 = wellKnownSymbol$j;
  var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var defineWellKnownSymbol$k = defineWellKnownSymbol$l;
  var setToStringTag$2 = setToStringTag$5;
  var InternalStateModule$2 = internalState;
  var $forEach$1 = arrayIteration.forEach;
  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');
  var setInternalState$2 = InternalStateModule$2.set;
  var getInternalState = InternalStateModule$2.getterFor(SYMBOL);
  var ObjectPrototype$1 = Object[PROTOTYPE];
  var $Symbol = global$f.Symbol;
  var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
  var TypeError$8 = global$f.TypeError;
  var QObject = global$f.QObject;
  var $stringify$1 = getBuiltIn$4('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
  var nativeDefineProperty = definePropertyModule$1.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule$1.f;
  var push$3 = uncurryThis$c([].push);
  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared('wks'); // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

  var setSymbolDescriptor = DESCRIPTORS$9 && fails$e(function () {
    return nativeObjectCreate(nativeDefineProperty({}, 'a', {
      get: function () {
        return nativeDefineProperty(this, 'a', {
          value: 7
        }).a;
      }
    })).a != 7;
  }) ? function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
    nativeDefineProperty(O, P, Attributes);

    if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
      nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty;

  var wrap$1 = function (tag, description) {
    var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
    setInternalState$2(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!DESCRIPTORS$9) symbol.description = description;
    return symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject$3(O);
    var key = toPropertyKey(P);
    anObject$3(Attributes);

    if (hasOwn$5(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!hasOwn$5(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (hasOwn$5(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, {
          enumerable: createPropertyDescriptor(0, false)
        });
      }

      return setSymbolDescriptor(O, key, Attributes);
    }

    return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject$3(O);
    var properties = toIndexedObject$4(Properties);
    var keys = objectKeys$2(properties).concat($getOwnPropertySymbols(properties));
    $forEach$1(keys, function (key) {
      if (!DESCRIPTORS$9 || call$2($propertyIsEnumerable$1, properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };

  var $propertyIsEnumerable$1 = function propertyIsEnumerable(V) {
    var P = toPropertyKey(V);
    var enumerable = call$2(nativePropertyIsEnumerable, this, P);
    if (this === ObjectPrototype$1 && hasOwn$5(AllSymbols, P) && !hasOwn$5(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !hasOwn$5(this, P) || !hasOwn$5(AllSymbols, P) || hasOwn$5(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject$4(O);
    var key = toPropertyKey(P);
    if (it === ObjectPrototype$1 && hasOwn$5(AllSymbols, key) && !hasOwn$5(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

    if (descriptor && hasOwn$5(AllSymbols, key) && !(hasOwn$5(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }

    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject$4(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (!hasOwn$5(AllSymbols, key) && !hasOwn$5(hiddenKeys$1, key)) push$3(result, key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$4(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (hasOwn$5(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$5(ObjectPrototype$1, key))) {
        push$3(result, AllSymbols[key]);
      }
    });
    return result;
  }; // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor


  if (!NATIVE_SYMBOL) {
    $Symbol = function Symbol() {
      if (isPrototypeOf$c(SymbolPrototype, this)) throw TypeError$8('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
      var tag = uid$1(description);

      var setter = function (value) {
        if (this === ObjectPrototype$1) call$2(setter, ObjectPrototypeSymbols, value);
        if (hasOwn$5(this, HIDDEN) && hasOwn$5(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };

      if (DESCRIPTORS$9 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, {
        configurable: true,
        set: setter
      });
      return wrap$1(tag, description);
    };

    SymbolPrototype = $Symbol[PROTOTYPE];
    redefine$1(SymbolPrototype, 'toString', function toString() {
      return getInternalState(this).tag;
    });
    redefine$1($Symbol, 'withoutSetter', function (description) {
      return wrap$1(uid$1(description), description);
    });
    propertyIsEnumerableModule$1.f = $propertyIsEnumerable$1;
    definePropertyModule$1.f = $defineProperty;
    definePropertiesModule.f = $defineProperties;
    getOwnPropertyDescriptorModule$1.f = $getOwnPropertyDescriptor;
    getOwnPropertyNamesModule$2.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule$2.f = $getOwnPropertySymbols;

    wrappedWellKnownSymbolModule.f = function (name) {
      return wrap$1(wellKnownSymbol$5(name), name);
    };

    if (DESCRIPTORS$9) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty(SymbolPrototype, 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
    }
  }

  $$u({
    global: true,
    wrap: true,
    forced: !NATIVE_SYMBOL,
    sham: !NATIVE_SYMBOL
  }, {
    Symbol: $Symbol
  });
  $forEach$1(objectKeys$2(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol$k(name);
  });
  $$u({
    target: SYMBOL,
    stat: true,
    forced: !NATIVE_SYMBOL
  }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function (key) {
      var string = $toString(key);
      if (hasOwn$5(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError$8(sym + ' is not a symbol');
      if (hasOwn$5(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () {
      USE_SETTER = true;
    },
    useSimple: function () {
      USE_SETTER = false;
    }
  });
  $$u({
    target: 'Object',
    stat: true,
    forced: !NATIVE_SYMBOL,
    sham: !DESCRIPTORS$9
  }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });
  $$u({
    target: 'Object',
    stat: true,
    forced: !NATIVE_SYMBOL
  }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  }); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443

  $$u({
    target: 'Object',
    stat: true,
    forced: fails$e(function () {
      getOwnPropertySymbolsModule$2.f(1);
    })
  }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return getOwnPropertySymbolsModule$2.f(toObject$7(it));
    }
  }); // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify

  if ($stringify$1) {
    var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$e(function () {
      var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

      return $stringify$1([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
      || $stringify$1({
        a: symbol
      }) != '{}' // V8 throws on boxed symbols
      || $stringify$1(Object(symbol)) != '{}';
    });
    $$u({
      target: 'JSON',
      stat: true,
      forced: FORCED_JSON_STRINGIFY
    }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = arraySlice$2(arguments);
        var $replacer = replacer;
        if (!isObject$7(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

        if (!isArray$a(replacer)) replacer = function (key, value) {
          if (isCallable$2($replacer)) value = call$2($replacer, this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return apply$4($stringify$1, null, args);
      }
    });
  } // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive


  if (!SymbolPrototype[TO_PRIMITIVE]) {
    var valueOf = SymbolPrototype.valueOf; // eslint-disable-next-line no-unused-vars -- required for .length

    redefine$1(SymbolPrototype, TO_PRIMITIVE, function (hint) {
      // TODO: improve hint logic
      return call$2(valueOf, this);
    });
  } // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag


  setToStringTag$2($Symbol, SYMBOL);
  hiddenKeys$1[HIDDEN] = true;

  var path$j = path$q;
  var getOwnPropertySymbols$2 = path$j.Object.getOwnPropertySymbols;

  var parent$J = getOwnPropertySymbols$2;
  var getOwnPropertySymbols$1 = parent$J;

  var getOwnPropertySymbols = getOwnPropertySymbols$1;

  var getOwnPropertyDescriptor$3 = {exports: {}};

  var $$t = _export;
  var fails$d = fails$r;
  var toIndexedObject$3 = toIndexedObject$b;
  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var DESCRIPTORS$8 = descriptors;
  var FAILS_ON_PRIMITIVES$3 = fails$d(function () {
    nativeGetOwnPropertyDescriptor(1);
  });
  var FORCED$5 = !DESCRIPTORS$8 || FAILS_ON_PRIMITIVES$3; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  $$t({
    target: 'Object',
    stat: true,
    forced: FORCED$5,
    sham: !DESCRIPTORS$8
  }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor(toIndexedObject$3(it), key);
    }
  });

  var path$i = path$q;
  var Object$3 = path$i.Object;

  var getOwnPropertyDescriptor$2 = getOwnPropertyDescriptor$3.exports = function getOwnPropertyDescriptor(it, key) {
    return Object$3.getOwnPropertyDescriptor(it, key);
  };

  if (Object$3.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor$2.sham = true;

  var parent$I = getOwnPropertyDescriptor$3.exports;
  var getOwnPropertyDescriptor$1 = parent$I;

  var getOwnPropertyDescriptor = getOwnPropertyDescriptor$1;

  var getBuiltIn$3 = getBuiltIn$9;
  var uncurryThis$b = functionUncurryThis;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var anObject$2 = anObject$b;
  var concat$5 = uncurryThis$b([].concat); // all object keys, includes non-enumerable and symbols

  var ownKeys$6 = getBuiltIn$3('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$1.f(anObject$2(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols ? concat$5(keys, getOwnPropertySymbols(it)) : keys;
  };

  var $$s = _export;
  var DESCRIPTORS$7 = descriptors;
  var ownKeys$5 = ownKeys$6;
  var toIndexedObject$2 = toIndexedObject$b;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var createProperty$3 = createProperty$6; // `Object.getOwnPropertyDescriptors` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors

  $$s({
    target: 'Object',
    stat: true,
    sham: !DESCRIPTORS$7
  }, {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = toIndexedObject$2(object);
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
      var keys = ownKeys$5(O);
      var result = {};
      var index = 0;
      var key, descriptor;

      while (keys.length > index) {
        descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
        if (descriptor !== undefined) createProperty$3(result, key, descriptor);
      }

      return result;
    }
  });

  var path$h = path$q;
  var getOwnPropertyDescriptors$2 = path$h.Object.getOwnPropertyDescriptors;

  var parent$H = getOwnPropertyDescriptors$2;
  var getOwnPropertyDescriptors$1 = parent$H;

  var getOwnPropertyDescriptors = getOwnPropertyDescriptors$1;

  var defineProperties$4 = {exports: {}};

  var $$r = _export;
  var DESCRIPTORS$6 = descriptors;
  var defineProperties$3 = objectDefineProperties.f; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe

  $$r({
    target: 'Object',
    stat: true,
    forced: Object.defineProperties !== defineProperties$3,
    sham: !DESCRIPTORS$6
  }, {
    defineProperties: defineProperties$3
  });

  var path$g = path$q;
  var Object$2 = path$g.Object;

  var defineProperties$2 = defineProperties$4.exports = function defineProperties(T, D) {
    return Object$2.defineProperties(T, D);
  };

  if (Object$2.defineProperties.sham) defineProperties$2.sham = true;

  var parent$G = defineProperties$4.exports;
  var defineProperties$1 = parent$G;

  var defineProperties = defineProperties$1;

  var defineProperty$4 = defineProperty$a;

  var $$q = _export;
  var isArray$9 = isArray$d; // `Array.isArray` method
  // https://tc39.es/ecma262/#sec-array.isarray

  $$q({
    target: 'Array',
    stat: true
  }, {
    isArray: isArray$9
  });

  var path$f = path$q;
  var isArray$8 = path$f.Array.isArray;

  var parent$F = isArray$8;
  var isArray$7 = parent$F;

  var parent$E = isArray$7;
  var isArray$6 = parent$E;

  var parent$D = isArray$6;
  var isArray$5 = parent$D;

  var isArray$4 = isArray$5;

  function _arrayWithHoles(arr) {
    if (isArray$4(arr)) return arr;
  }

  var $$p = _export;
  var global$e = global$M;
  var fails$c = fails$r;
  var isArray$3 = isArray$d;
  var isObject$6 = isObject$f;
  var toObject$6 = toObject$e;
  var lengthOfArrayLike$5 = lengthOfArrayLike$d;
  var createProperty$2 = createProperty$6;
  var arraySpeciesCreate$1 = arraySpeciesCreate$4;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;
  var wellKnownSymbol$4 = wellKnownSymbol$j;
  var V8_VERSION = engineV8Version;
  var IS_CONCAT_SPREADABLE = wellKnownSymbol$4('isConcatSpreadable');
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
  var TypeError$7 = global$e.TypeError; // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679

  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$c(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$2('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject$6(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray$3(O);
  };

  var FORCED$4 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species

  $$p({
    target: 'Array',
    proto: true,
    forced: FORCED$4
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$6(this);
      var A = arraySpeciesCreate$1(O, 0);
      var n = 0;
      var i, k, length, len, E;

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];

        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike$5(E);
          if (n + len > MAX_SAFE_INTEGER$1) throw TypeError$7(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

          for (k = 0; k < len; k++, n++) if (k in E) createProperty$2(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER$1) throw TypeError$7(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty$2(A, n++, E);
        }
      }

      A.length = n;
      return A;
    }
  });

  var defineWellKnownSymbol$j = defineWellKnownSymbol$l; // `Symbol.asyncIterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.asynciterator

  defineWellKnownSymbol$j('asyncIterator');

  var defineWellKnownSymbol$i = defineWellKnownSymbol$l; // `Symbol.hasInstance` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.hasinstance

  defineWellKnownSymbol$i('hasInstance');

  var defineWellKnownSymbol$h = defineWellKnownSymbol$l; // `Symbol.isConcatSpreadable` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.isconcatspreadable

  defineWellKnownSymbol$h('isConcatSpreadable');

  var defineWellKnownSymbol$g = defineWellKnownSymbol$l; // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator

  defineWellKnownSymbol$g('iterator');

  var defineWellKnownSymbol$f = defineWellKnownSymbol$l; // `Symbol.match` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.match

  defineWellKnownSymbol$f('match');

  var defineWellKnownSymbol$e = defineWellKnownSymbol$l; // `Symbol.matchAll` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.matchall

  defineWellKnownSymbol$e('matchAll');

  var defineWellKnownSymbol$d = defineWellKnownSymbol$l; // `Symbol.replace` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.replace

  defineWellKnownSymbol$d('replace');

  var defineWellKnownSymbol$c = defineWellKnownSymbol$l; // `Symbol.search` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.search

  defineWellKnownSymbol$c('search');

  var defineWellKnownSymbol$b = defineWellKnownSymbol$l; // `Symbol.species` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.species

  defineWellKnownSymbol$b('species');

  var defineWellKnownSymbol$a = defineWellKnownSymbol$l; // `Symbol.split` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.split

  defineWellKnownSymbol$a('split');

  var defineWellKnownSymbol$9 = defineWellKnownSymbol$l; // `Symbol.toPrimitive` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.toprimitive

  defineWellKnownSymbol$9('toPrimitive');

  var defineWellKnownSymbol$8 = defineWellKnownSymbol$l; // `Symbol.toStringTag` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.tostringtag

  defineWellKnownSymbol$8('toStringTag');

  var defineWellKnownSymbol$7 = defineWellKnownSymbol$l; // `Symbol.unscopables` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.unscopables

  defineWellKnownSymbol$7('unscopables');

  var global$d = global$M;
  var setToStringTag$1 = setToStringTag$5; // JSON[@@toStringTag] property
  // https://tc39.es/ecma262/#sec-json-@@tostringtag

  setToStringTag$1(global$d.JSON, 'JSON', true);

  var path$e = path$q;
  var symbol$5 = path$e.Symbol;

  var parent$C = symbol$5;
  var symbol$4 = parent$C;

  var parent$B = symbol$4;
  var symbol$3 = parent$B;

  var defineWellKnownSymbol$6 = defineWellKnownSymbol$l; // `Symbol.asyncDispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement

  defineWellKnownSymbol$6('asyncDispose');

  var defineWellKnownSymbol$5 = defineWellKnownSymbol$l; // `Symbol.dispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement

  defineWellKnownSymbol$5('dispose');

  var defineWellKnownSymbol$4 = defineWellKnownSymbol$l; // `Symbol.matcher` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching

  defineWellKnownSymbol$4('matcher');

  var defineWellKnownSymbol$3 = defineWellKnownSymbol$l; // `Symbol.metadata` well-known symbol
  // https://github.com/tc39/proposal-decorators

  defineWellKnownSymbol$3('metadata');

  var defineWellKnownSymbol$2 = defineWellKnownSymbol$l; // `Symbol.observable` well-known symbol
  // https://github.com/tc39/proposal-observable

  defineWellKnownSymbol$2('observable');

  var defineWellKnownSymbol$1 = defineWellKnownSymbol$l; // `Symbol.patternMatch` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching

  defineWellKnownSymbol$1('patternMatch');

  var defineWellKnownSymbol = defineWellKnownSymbol$l;
  defineWellKnownSymbol('replaceAll');

  var parent$A = symbol$3; // TODO: Remove from `core-js@4`
  // TODO: Remove from `core-js@4`

  var symbol$2 = parent$A;

  var symbol$1 = symbol$2;

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof symbol$1 !== "undefined" && getIteratorMethod$1(arr) || arr["@@iterator"];

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

  var $$o = _export;
  var global$c = global$M;
  var isArray$2 = isArray$d;
  var isConstructor$1 = isConstructor$4;
  var isObject$5 = isObject$f;
  var toAbsoluteIndex$2 = toAbsoluteIndex$5;
  var lengthOfArrayLike$4 = lengthOfArrayLike$d;
  var toIndexedObject$1 = toIndexedObject$b;
  var createProperty$1 = createProperty$6;
  var wellKnownSymbol$3 = wellKnownSymbol$j;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;
  var un$Slice = arraySlice$5;
  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('slice');
  var SPECIES$1 = wellKnownSymbol$3('species');
  var Array$2 = global$c.Array;
  var max$1 = Math.max; // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects

  $$o({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$1
  }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$1(this);
      var length = lengthOfArrayLike$4(O);
      var k = toAbsoluteIndex$2(start, length);
      var fin = toAbsoluteIndex$2(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

      var Constructor, result, n;

      if (isArray$2(O)) {
        Constructor = O.constructor; // cross-realm fallback

        if (isConstructor$1(Constructor) && (Constructor === Array$2 || isArray$2(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$5(Constructor)) {
          Constructor = Constructor[SPECIES$1];
          if (Constructor === null) Constructor = undefined;
        }

        if (Constructor === Array$2 || Constructor === undefined) {
          return un$Slice(O, k, fin);
        }
      }

      result = new (Constructor === undefined ? Array$2 : Constructor)(max$1(fin - k, 0));

      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);

      result.length = n;
      return result;
    }
  });

  var entryVirtual$e = entryVirtual$k;
  var slice$6 = entryVirtual$e('Array').slice;

  var isPrototypeOf$b = objectIsPrototypeOf;
  var method$9 = slice$6;
  var ArrayPrototype$9 = Array.prototype;

  var slice$5 = function (it) {
    var own = it.slice;
    return it === ArrayPrototype$9 || isPrototypeOf$b(ArrayPrototype$9, it) && own === ArrayPrototype$9.slice ? method$9 : own;
  };

  var parent$z = slice$5;
  var slice$4 = parent$z;

  var parent$y = slice$4;
  var slice$3 = parent$y;

  var parent$x = slice$3;
  var slice$2 = parent$x;

  var slice$1 = slice$2;

  var parent$w = from$4;
  var from$2 = parent$w;

  var parent$v = from$2;
  var from$1 = parent$v;

  var from = from$1;

  function _arrayLikeToArray$4(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray$4(o, minLen) {
    var _context;

    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$4(o, minLen);

    var n = slice$1(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest();
  }

  var WrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var iterator$5 = WrappedWellKnownSymbolModule.f('iterator');

  var parent$u = iterator$5;
  var iterator$4 = parent$u;

  var parent$t = iterator$4;
  var iterator$3 = parent$t;

  var parent$s = iterator$3;
  var iterator$2 = parent$s;

  var iterator$1 = iterator$2;

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof symbol$1 && "symbol" == typeof iterator$1 ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof symbol$1 && obj.constructor === symbol$1 && obj !== symbol$1.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _arrayWithoutHoles(arr) {
    if (isArray$4(arr)) return _arrayLikeToArray$4(arr);
  }

  function _iterableToArray(iter) {
    if (typeof symbol$1 !== "undefined" && getIteratorMethod$1(iter) != null || iter["@@iterator"] != null) return from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$4(arr) || _nonIterableSpread();
  }

  var symbol = symbol$4;

  var entryVirtual$d = entryVirtual$k;
  var concat$4 = entryVirtual$d('Array').concat;

  var isPrototypeOf$a = objectIsPrototypeOf;
  var method$8 = concat$4;
  var ArrayPrototype$8 = Array.prototype;

  var concat$3 = function (it) {
    var own = it.concat;
    return it === ArrayPrototype$8 || isPrototypeOf$a(ArrayPrototype$8, it) && own === ArrayPrototype$8.concat ? method$8 : own;
  };

  var parent$r = concat$3;
  var concat$2 = parent$r;

  var concat$1 = concat$2;

  var slice = slice$4;

  var $$n = _export;
  var ownKeys$4 = ownKeys$6; // `Reflect.ownKeys` method
  // https://tc39.es/ecma262/#sec-reflect.ownkeys

  $$n({
    target: 'Reflect',
    stat: true
  }, {
    ownKeys: ownKeys$4
  });

  var path$d = path$q;
  var ownKeys$3 = path$d.Reflect.ownKeys;

  var parent$q = ownKeys$3;
  var ownKeys$2 = parent$q;

  var ownKeys$1 = ownKeys$2;

  var isArray$1 = isArray$7;

  var $$m = _export;
  var toObject$5 = toObject$e;
  var nativeKeys = objectKeys$4;
  var fails$b = fails$r;
  var FAILS_ON_PRIMITIVES$2 = fails$b(function () {
    nativeKeys(1);
  }); // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys

  $$m({
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES$2
  }, {
    keys: function keys(it) {
      return nativeKeys(toObject$5(it));
    }
  });

  var path$c = path$q;
  var keys$6 = path$c.Object.keys;

  var parent$p = keys$6;
  var keys$5 = parent$p;

  var keys$4 = keys$5;

  var $$l = _export;
  var global$b = global$M;
  var uncurryThis$a = functionUncurryThis;
  var Date$1 = global$b.Date;
  var getTime = uncurryThis$a(Date$1.prototype.getTime); // `Date.now` method
  // https://tc39.es/ecma262/#sec-date.now

  $$l({
    target: 'Date',
    stat: true
  }, {
    now: function now() {
      return getTime(new Date$1());
    }
  });

  var path$b = path$q;
  path$b.Date.now;

  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict$3 = arrayMethodIsStrict$5;
  var STRICT_METHOD$3 = arrayMethodIsStrict$3('forEach'); // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach

  var arrayForEach = !STRICT_METHOD$3 ? function forEach(callbackfn
  /* , thisArg */
  ) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var $$k = _export;
  var forEach$5 = arrayForEach; // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe

  $$k({
    target: 'Array',
    proto: true,
    forced: [].forEach != forEach$5
  }, {
    forEach: forEach$5
  });

  var entryVirtual$c = entryVirtual$k;
  var forEach$4 = entryVirtual$c('Array').forEach;

  var parent$o = forEach$4;
  var forEach$3 = parent$o;

  var classof$5 = classof$c;
  var hasOwn$4 = hasOwnProperty_1;
  var isPrototypeOf$9 = objectIsPrototypeOf;
  var method$7 = forEach$3;
  var ArrayPrototype$7 = Array.prototype;
  var DOMIterables$3 = {
    DOMTokenList: true,
    NodeList: true
  };

  var forEach$2 = function (it) {
    var own = it.forEach;
    return it === ArrayPrototype$7 || isPrototypeOf$9(ArrayPrototype$7, it) && own === ArrayPrototype$7.forEach || hasOwn$4(DOMIterables$3, classof$5(it)) ? method$7 : own;
  };

  var forEach$1 = forEach$2;

  var $$j = _export;
  var uncurryThis$9 = functionUncurryThis;
  var isArray = isArray$d;
  var un$Reverse = uncurryThis$9([].reverse);
  var test$1 = [1, 2]; // `Array.prototype.reverse` method
  // https://tc39.es/ecma262/#sec-array.prototype.reverse
  // fix for Safari 12.0 bug
  // https://bugs.webkit.org/show_bug.cgi?id=188794

  $$j({
    target: 'Array',
    proto: true,
    forced: String(test$1) === String(test$1.reverse())
  }, {
    reverse: function reverse() {
      // eslint-disable-next-line no-self-assign -- dirty hack
      if (isArray(this)) this.length = this.length;
      return un$Reverse(this);
    }
  });

  var entryVirtual$b = entryVirtual$k;
  var reverse$3 = entryVirtual$b('Array').reverse;

  var isPrototypeOf$8 = objectIsPrototypeOf;
  var method$6 = reverse$3;
  var ArrayPrototype$6 = Array.prototype;

  var reverse$2 = function (it) {
    var own = it.reverse;
    return it === ArrayPrototype$6 || isPrototypeOf$8(ArrayPrototype$6, it) && own === ArrayPrototype$6.reverse ? method$6 : own;
  };

  var parent$n = reverse$2;
  var reverse$1 = parent$n;

  var reverse = reverse$1;

  var $$i = _export;
  var global$a = global$M;
  var toAbsoluteIndex$1 = toAbsoluteIndex$5;
  var toIntegerOrInfinity = toIntegerOrInfinity$4;
  var lengthOfArrayLike$3 = lengthOfArrayLike$d;
  var toObject$4 = toObject$e;
  var arraySpeciesCreate = arraySpeciesCreate$4;
  var createProperty = createProperty$6;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;
  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
  var TypeError$6 = global$a.TypeError;
  var max = Math.max;
  var min = Math.min;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species

  $$i({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT
  }, {
    splice: function splice(start, deleteCount
    /* , ...items */
    ) {
      var O = toObject$4(this);
      var len = lengthOfArrayLike$3(O);
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
        actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
      }

      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
        throw TypeError$6(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }

      A = arraySpeciesCreate(O, actualDeleteCount);

      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty(A, k, O[from]);
      }

      A.length = actualDeleteCount;

      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];else delete O[to];
        }

        for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];else delete O[to];
        }
      }

      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }

      O.length = len - actualDeleteCount + insertCount;
      return A;
    }
  });

  var entryVirtual$a = entryVirtual$k;
  var splice$3 = entryVirtual$a('Array').splice;

  var isPrototypeOf$7 = objectIsPrototypeOf;
  var method$5 = splice$3;
  var ArrayPrototype$5 = Array.prototype;

  var splice$2 = function (it) {
    var own = it.splice;
    return it === ArrayPrototype$5 || isPrototypeOf$7(ArrayPrototype$5, it) && own === ArrayPrototype$5.splice ? method$5 : own;
  };

  var parent$m = splice$2;
  var splice$1 = parent$m;

  var splice = splice$1;

  var DESCRIPTORS$5 = descriptors;
  var uncurryThis$8 = functionUncurryThis;
  var call$1 = functionCall;
  var fails$a = fails$r;
  var objectKeys$1 = objectKeys$4;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var toObject$3 = toObject$e;
  var IndexedObject = indexedObject; // eslint-disable-next-line es/no-object-assign -- safe

  var $assign = Object.assign; // eslint-disable-next-line es/no-object-defineproperty -- required for testing

  var defineProperty$3 = Object.defineProperty;
  var concat = uncurryThis$8([].concat); // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign

  var objectAssign = !$assign || fails$a(function () {
    // should have correct order of operations (Edge bug)
    if (DESCRIPTORS$5 && $assign({
      b: 1
    }, $assign(defineProperty$3({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$3(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), {
      b: 2
    })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

    var A = {};
    var B = {}; // eslint-disable-next-line es/no-symbol -- safe

    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) {
      B[chr] = chr;
    });
    return $assign({}, A)[symbol] != 7 || objectKeys$1($assign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) {
    // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject$3(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    var propertyIsEnumerable = propertyIsEnumerableModule.f;

    while (argumentsLength > index) {
      var S = IndexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? concat(objectKeys$1(S), getOwnPropertySymbols(S)) : objectKeys$1(S);
      var length = keys.length;
      var j = 0;
      var key;

      while (length > j) {
        key = keys[j++];
        if (!DESCRIPTORS$5 || call$1(propertyIsEnumerable, S, key)) T[key] = S[key];
      }
    }

    return T;
  } : $assign;

  var $$h = _export;
  var assign$5 = objectAssign; // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es/no-object-assign -- required for testing

  $$h({
    target: 'Object',
    stat: true,
    forced: Object.assign !== assign$5
  }, {
    assign: assign$5
  });

  var path$a = path$q;
  var assign$4 = path$a.Object.assign;

  var parent$l = assign$4;
  var assign$3 = parent$l;

  var assign$2 = assign$3;

  var $$g = _export;
  var $includes = arrayIncludes.includes;
  // https://tc39.es/ecma262/#sec-array.prototype.includes

  $$g({
    target: 'Array',
    proto: true
  }, {
    includes: function includes(el
    /* , fromIndex = 0 */
    ) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  }); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  var entryVirtual$9 = entryVirtual$k;
  entryVirtual$9('Array').includes;

  var isObject$4 = isObject$f;
  var classof$4 = classofRaw$1;
  var wellKnownSymbol$2 = wellKnownSymbol$j;
  var MATCH$1 = wellKnownSymbol$2('match'); // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp

  var isRegexp = function (it) {
    var isRegExp;
    return isObject$4(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$4(it) == 'RegExp');
  };

  var global$9 = global$M;
  var isRegExp = isRegexp;
  var TypeError$5 = global$9.TypeError;

  var notARegexp = function (it) {
    if (isRegExp(it)) {
      throw TypeError$5("The method doesn't accept regular expressions");
    }

    return it;
  };

  var wellKnownSymbol$1 = wellKnownSymbol$j;
  var MATCH = wellKnownSymbol$1('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;

    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) {
        /* empty */
      }
    }

    return false;
  };

  var $$f = _export;
  var uncurryThis$7 = functionUncurryThis;
  var notARegExp = notARegexp;
  var requireObjectCoercible$1 = requireObjectCoercible$5;
  var toString$3 = toString$7;
  var correctIsRegExpLogic = correctIsRegexpLogic;
  var stringIndexOf = uncurryThis$7(''.indexOf); // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes

  $$f({
    target: 'String',
    proto: true,
    forced: !correctIsRegExpLogic('includes')
  }, {
    includes: function includes(searchString
    /* , position = 0 */
    ) {
      return !!~stringIndexOf(toString$3(requireObjectCoercible$1(this)), toString$3(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var entryVirtual$8 = entryVirtual$k;
  entryVirtual$8('String').includes;

  var $$e = _export;
  var fails$9 = fails$r;
  var toObject$2 = toObject$e;
  var nativeGetPrototypeOf = objectGetPrototypeOf;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
  var FAILS_ON_PRIMITIVES$1 = fails$9(function () {
    nativeGetPrototypeOf(1);
  }); // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof

  $$e({
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES$1,
    sham: !CORRECT_PROTOTYPE_GETTER
  }, {
    getPrototypeOf: function getPrototypeOf(it) {
      return nativeGetPrototypeOf(toObject$2(it));
    }
  });

  var path$9 = path$q;
  var getPrototypeOf$4 = path$9.Object.getPrototypeOf;

  var parent$k = getPrototypeOf$4;
  var getPrototypeOf$3 = parent$k;

  var DESCRIPTORS$4 = descriptors;
  var uncurryThis$6 = functionUncurryThis;
  var objectKeys = objectKeys$4;
  var toIndexedObject = toIndexedObject$b;
  var $propertyIsEnumerable = objectPropertyIsEnumerable.f;
  var propertyIsEnumerable = uncurryThis$6($propertyIsEnumerable);
  var push$2 = uncurryThis$6([].push); // `Object.{ entries, values }` methods implementation

  var createMethod$1 = function (TO_ENTRIES) {
    return function (it) {
      var O = toIndexedObject(it);
      var keys = objectKeys(O);
      var length = keys.length;
      var i = 0;
      var result = [];
      var key;

      while (length > i) {
        key = keys[i++];

        if (!DESCRIPTORS$4 || propertyIsEnumerable(O, key)) {
          push$2(result, TO_ENTRIES ? [key, O[key]] : O[key]);
        }
      }

      return result;
    };
  };

  var objectToArray = {
    // `Object.entries` method
    // https://tc39.es/ecma262/#sec-object.entries
    entries: createMethod$1(true),
    // `Object.values` method
    // https://tc39.es/ecma262/#sec-object.values
    values: createMethod$1(false)
  };

  var $$d = _export;
  var $values = objectToArray.values; // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values

  $$d({
    target: 'Object',
    stat: true
  }, {
    values: function values(O) {
      return $values(O);
    }
  });

  var path$8 = path$q;
  path$8.Object.values;

  var whitespaces$3 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' + '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var uncurryThis$5 = functionUncurryThis;
  var requireObjectCoercible = requireObjectCoercible$5;
  var toString$2 = toString$7;
  var whitespaces$2 = whitespaces$3;
  var replace$1 = uncurryThis$5(''.replace);
  var whitespace = '[' + whitespaces$2 + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

  var createMethod = function (TYPE) {
    return function ($this) {
      var string = toString$2(requireObjectCoercible($this));
      if (TYPE & 1) string = replace$1(string, ltrim, '');
      if (TYPE & 2) string = replace$1(string, rtrim, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod(3)
  };

  var global$8 = global$M;
  var fails$8 = fails$r;
  var uncurryThis$4 = functionUncurryThis;
  var toString$1 = toString$7;
  var trim = stringTrim.trim;
  var whitespaces$1 = whitespaces$3;
  var $parseInt$1 = global$8.parseInt;
  var Symbol$1 = global$8.Symbol;
  var ITERATOR = Symbol$1 && Symbol$1.iterator;
  var hex = /^[+-]?0x/i;
  var exec$1 = uncurryThis$4(hex.exec);
  var FORCED$3 = $parseInt$1(whitespaces$1 + '08') !== 8 || $parseInt$1(whitespaces$1 + '0x16') !== 22 // MS Edge 18- broken with boxed symbols
  || ITERATOR && !fails$8(function () {
    $parseInt$1(Object(ITERATOR));
  }); // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix

  var numberParseInt = FORCED$3 ? function parseInt(string, radix) {
    var S = trim(toString$1(string));
    return $parseInt$1(S, radix >>> 0 || (exec$1(hex, S) ? 16 : 10));
  } : $parseInt$1;

  var $$c = _export;
  var $parseInt = numberParseInt; // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix

  $$c({
    global: true,
    forced: parseInt != $parseInt
  }, {
    parseInt: $parseInt
  });

  var path$7 = path$q;
  path$7.parseInt;

  /* eslint-disable es/no-array-prototype-indexof -- required for testing */


  var $$b = _export;
  var uncurryThis$3 = functionUncurryThis;
  var $IndexOf = arrayIncludes.indexOf;
  var arrayMethodIsStrict$2 = arrayMethodIsStrict$5;
  var un$IndexOf = uncurryThis$3([].indexOf);
  var NEGATIVE_ZERO = !!un$IndexOf && 1 / un$IndexOf([1], 1, -0) < 0;
  var STRICT_METHOD$2 = arrayMethodIsStrict$2('indexOf'); // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof

  $$b({
    target: 'Array',
    proto: true,
    forced: NEGATIVE_ZERO || !STRICT_METHOD$2
  }, {
    indexOf: function indexOf(searchElement
    /* , fromIndex = 0 */
    ) {
      var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
      return NEGATIVE_ZERO // convert -0 to +0
      ? un$IndexOf(this, searchElement, fromIndex) || 0 : $IndexOf(this, searchElement, fromIndex);
    }
  });

  var entryVirtual$7 = entryVirtual$k;
  entryVirtual$7('Array').indexOf;

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var fails$7 = fails$r;
  var whitespaces = whitespaces$3;
  var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
  // of whitespaces and has a correct name

  var stringTrimForced = function (METHOD_NAME) {
    return fails$7(function () {
      return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() !== non || PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME;
    });
  };

  var $$a = _export;
  var $trim = stringTrim.trim;
  var forcedStringTrimMethod = stringTrimForced; // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim

  $$a({
    target: 'String',
    proto: true,
    forced: forcedStringTrimMethod('trim')
  }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  var entryVirtual$6 = entryVirtual$k;
  entryVirtual$6('String').trim;

  var $$9 = _export;
  var DESCRIPTORS$3 = descriptors;
  var create$8 = objectCreate; // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create

  $$9({
    target: 'Object',
    stat: true,
    sham: !DESCRIPTORS$3
  }, {
    create: create$8
  });

  var path$6 = path$q;
  var Object$1 = path$6.Object;

  var create$7 = function create(P, D) {
    return Object$1.create(P, D);
  };

  var parent$j = create$7;
  var create$6 = parent$j;

  var create$5 = create$6;

  var $$8 = _export;
  var global$7 = global$M;
  var getBuiltIn$2 = getBuiltIn$9;
  var apply$3 = functionApply;
  var uncurryThis$2 = functionUncurryThis;
  var fails$6 = fails$r;
  var Array$1 = global$7.Array;
  var $stringify = getBuiltIn$2('JSON', 'stringify');
  var exec = uncurryThis$2(/./.exec);
  var charAt = uncurryThis$2(''.charAt);
  var charCodeAt = uncurryThis$2(''.charCodeAt);
  var replace = uncurryThis$2(''.replace);
  var numberToString = uncurryThis$2(1.0.toString);
  var tester = /[\uD800-\uDFFF]/g;
  var low = /^[\uD800-\uDBFF]$/;
  var hi = /^[\uDC00-\uDFFF]$/;

  var fix = function (match, offset, string) {
    var prev = charAt(string, offset - 1);
    var next = charAt(string, offset + 1);

    if (exec(low, match) && !exec(hi, next) || exec(hi, match) && !exec(low, prev)) {
      return '\\u' + numberToString(charCodeAt(match, 0), 16);
    }

    return match;
  };

  var FORCED$2 = fails$6(function () {
    return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"' || $stringify('\uDEAD') !== '"\\udead"';
  });

  if ($stringify) {
    // `JSON.stringify` method
    // https://tc39.es/ecma262/#sec-json.stringify
    // https://github.com/tc39/proposal-well-formed-stringify
    $$8({
      target: 'JSON',
      stat: true,
      forced: FORCED$2
    }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        for (var i = 0, l = arguments.length, args = Array$1(l); i < l; i++) args[i] = arguments[i];

        var result = apply$3($stringify, null, args);
        return typeof result == 'string' ? replace(result, tester, fix) : result;
      }
    });
  }

  var path$5 = path$q;
  var apply$2 = functionApply; // eslint-disable-next-line es/no-json -- safe

  if (!path$5.JSON) path$5.JSON = {
    stringify: JSON.stringify
  }; // eslint-disable-next-line no-unused-vars -- required for `.length`

  var stringify$3 = function stringify(it, replacer, space) {
    return apply$2(path$5.JSON.stringify, null, arguments);
  };

  var parent$i = stringify$3;
  var stringify$2 = parent$i;

  var stringify$1 = stringify$2;

  var global$6 = global$M;
  var TypeError$4 = global$6.TypeError;

  var validateArgumentsLength$1 = function (passed, required) {
    if (passed < required) throw TypeError$4('Not enough arguments');
    return passed;
  };

  var $$7 = _export;
  var global$5 = global$M;
  var apply$1 = functionApply;
  var isCallable$1 = isCallable$h;
  var userAgent$2 = engineUserAgent;
  var arraySlice$1 = arraySlice$5;
  var validateArgumentsLength = validateArgumentsLength$1;
  var MSIE = /MSIE .\./.test(userAgent$2); // <- dirty ie9- check

  var Function$1 = global$5.Function;

  var wrap = function (scheduler) {
    return function (handler, timeout
    /* , ...arguments */
    ) {
      var boundArgs = validateArgumentsLength(arguments.length, 1) > 2;
      var fn = isCallable$1(handler) ? handler : Function$1(handler);
      var args = boundArgs ? arraySlice$1(arguments, 2) : undefined;
      return scheduler(boundArgs ? function () {
        apply$1(fn, this, args);
      } : fn, timeout);
    };
  }; // ie9- setTimeout & setInterval additional parameters fix
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers


  $$7({
    global: true,
    bind: true,
    forced: MSIE
  }, {
    // `setTimeout` method
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
    setTimeout: wrap(global$5.setTimeout),
    // `setInterval` method
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
    setInterval: wrap(global$5.setInterval)
  });

  var path$4 = path$q;
  var setTimeout$2 = path$4.setTimeout;

  var setTimeout$1 = setTimeout$2;

  var toObject$1 = toObject$e;
  var toAbsoluteIndex = toAbsoluteIndex$5;
  var lengthOfArrayLike$2 = lengthOfArrayLike$d; // `Array.prototype.fill` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.fill

  var arrayFill = function fill(value
  /* , start = 0, end = @length */
  ) {
    var O = toObject$1(this);
    var length = lengthOfArrayLike$2(O);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

    while (endPos > index) O[index++] = value;

    return O;
  };

  var $$6 = _export;
  var fill = arrayFill;
  // https://tc39.es/ecma262/#sec-array.prototype.fill

  $$6({
    target: 'Array',
    proto: true
  }, {
    fill: fill
  }); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  var entryVirtual$5 = entryVirtual$k;
  entryVirtual$5('Array').fill;

  var componentEmitter = {exports: {}};

  (function (module) {
    /**
     * Expose `Emitter`.
     */
    {
      module.exports = Emitter;
    }
    /**
     * Initialize a new `Emitter`.
     *
     * @api public
     */


    function Emitter(obj) {
      if (obj) return mixin(obj);
    }
    /**
     * Mixin the emitter properties.
     *
     * @param {Object} obj
     * @return {Object}
     * @api private
     */

    function mixin(obj) {
      for (var key in Emitter.prototype) {
        obj[key] = Emitter.prototype[key];
      }

      return obj;
    }
    /**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */


    Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
      this._callbacks = this._callbacks || {};
      (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
      return this;
    };
    /**
     * Adds an `event` listener that will be invoked a single
     * time then automatically removed.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */


    Emitter.prototype.once = function (event, fn) {
      function on() {
        this.off(event, on);
        fn.apply(this, arguments);
      }

      on.fn = fn;
      this.on(event, on);
      return this;
    };
    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */


    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
      this._callbacks = this._callbacks || {}; // all

      if (0 == arguments.length) {
        this._callbacks = {};
        return this;
      } // specific event


      var callbacks = this._callbacks['$' + event];
      if (!callbacks) return this; // remove all handlers

      if (1 == arguments.length) {
        delete this._callbacks['$' + event];
        return this;
      } // remove specific handler


      var cb;

      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];

        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      } // Remove event specific arrays for event types that no
      // one is subscribed for to avoid memory leak.


      if (callbacks.length === 0) {
        delete this._callbacks['$' + event];
      }

      return this;
    };
    /**
     * Emit `event` with the given args.
     *
     * @param {String} event
     * @param {Mixed} ...
     * @return {Emitter}
     */


    Emitter.prototype.emit = function (event) {
      this._callbacks = this._callbacks || {};
      var args = new Array(arguments.length - 1),
          callbacks = this._callbacks['$' + event];

      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }

      if (callbacks) {
        callbacks = callbacks.slice(0);

        for (var i = 0, len = callbacks.length; i < len; ++i) {
          callbacks[i].apply(this, args);
        }
      }

      return this;
    };
    /**
     * Return array of callbacks for `event`.
     *
     * @param {String} event
     * @return {Array}
     * @api public
     */


    Emitter.prototype.listeners = function (event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks['$' + event] || [];
    };
    /**
     * Check if this emitter has `event` handlers.
     *
     * @param {String} event
     * @return {Boolean}
     * @api public
     */


    Emitter.prototype.hasListeners = function (event) {
      return !!this.listeners(event).length;
    };
  })(componentEmitter);

  var Emitter = componentEmitter.exports;

  /*! Hammer.JS - v2.0.17-rc - 2019-12-16
   * http://naver.github.io/egjs
   *
   * Forked By Naver egjs
   * Copyright (c) hammerjs
   * Licensed under the MIT license */
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
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }
  /**
   * @private
   * extend object.
   * means that properties in dest will be overwritten by the ones in src.
   * @param {Object} target
   * @param {...Object} objects_to_assign
   * @returns {Object} target
   */


  var assign;

  if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];

        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }

      return output;
    };
  } else {
    assign = Object.assign;
  }

  var assign$1 = assign;
  var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
  var TEST_ELEMENT = typeof document === "undefined" ? {
    style: {}
  } : document.createElement('div');
  var TYPE_FUNCTION = 'function';
  var round = Math.round,
      abs = Math.abs;
  var now = Date.now;
  /**
   * @private
   * get the prefixed property
   * @param {Object} obj
   * @param {String} property
   * @returns {String|Undefined} prefixed
   */

  function prefixed(obj, property) {
    var prefix;
    var prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);
    var i = 0;

    while (i < VENDOR_PREFIXES.length) {
      prefix = VENDOR_PREFIXES[i];
      prop = prefix ? prefix + camelProp : property;

      if (prop in obj) {
        return prop;
      }

      i++;
    }

    return undefined;
  }
  /* eslint-disable no-new-func, no-nested-ternary */


  var win;

  if (typeof window === "undefined") {
    // window is undefined in node.js
    win = {};
  } else {
    win = window;
  }

  var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
  var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

  function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
      return false;
    }

    var touchMap = {};
    var cssSupports = win.CSS && win.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
      // If css.supports is not supported but there is native touch-action assume it supports
      // all values. This is the case for IE 10 and 11.
      return touchMap[val] = cssSupports ? win.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
  }

  var TOUCH_ACTION_COMPUTE = 'compute';
  var TOUCH_ACTION_AUTO = 'auto';
  var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

  var TOUCH_ACTION_NONE = 'none';
  var TOUCH_ACTION_PAN_X = 'pan-x';
  var TOUCH_ACTION_PAN_Y = 'pan-y';
  var TOUCH_ACTION_MAP = getTouchActionProps();
  var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
  var SUPPORT_TOUCH = ('ontouchstart' in win);
  var SUPPORT_POINTER_EVENTS = prefixed(win, 'PointerEvent') !== undefined;
  var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
  var INPUT_TYPE_TOUCH = 'touch';
  var INPUT_TYPE_PEN = 'pen';
  var INPUT_TYPE_MOUSE = 'mouse';
  var INPUT_TYPE_KINECT = 'kinect';
  var COMPUTE_INTERVAL = 25;
  var INPUT_START = 1;
  var INPUT_MOVE = 2;
  var INPUT_END = 4;
  var INPUT_CANCEL = 8;
  var DIRECTION_NONE = 1;
  var DIRECTION_LEFT = 2;
  var DIRECTION_RIGHT = 4;
  var DIRECTION_UP = 8;
  var DIRECTION_DOWN = 16;
  var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
  var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
  var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
  var PROPS_XY = ['x', 'y'];
  var PROPS_CLIENT_XY = ['clientX', 'clientY'];
  /**
   * @private
   * walk objects and arrays
   * @param {Object} obj
   * @param {Function} iterator
   * @param {Object} context
   */

  function each(obj, iterator, context) {
    var i;

    if (!obj) {
      return;
    }

    if (obj.forEach) {
      obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
      i = 0;

      while (i < obj.length) {
        iterator.call(context, obj[i], i, obj);
        i++;
      }
    } else {
      for (i in obj) {
        obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
      }
    }
  }
  /**
   * @private
   * let a boolean value also be a function that must return a boolean
   * this first item in args will be used as the context
   * @param {Boolean|Function} val
   * @param {Array} [args]
   * @returns {Boolean}
   */


  function boolOrFn(val, args) {
    if (typeof val === TYPE_FUNCTION) {
      return val.apply(args ? args[0] || undefined : undefined, args);
    }

    return val;
  }
  /**
   * @private
   * small indexOf wrapper
   * @param {String} str
   * @param {String} find
   * @returns {Boolean} found
   */


  function inStr(str, find) {
    return str.indexOf(find) > -1;
  }
  /**
   * @private
   * when the touchActions are collected they are not a valid value, so we need to clean things up. *
   * @param {String} actions
   * @returns {*}
   */


  function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
      return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning

    if (hasPanX && hasPanY) {
      return TOUCH_ACTION_NONE;
    } // pan-x OR pan-y


    if (hasPanX || hasPanY) {
      return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    } // manipulation


    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
      return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
  }
  /**
   * @private
   * Touch Action
   * sets the touchAction property or uses the js alternative
   * @param {Manager} manager
   * @param {String} value
   * @constructor
   */


  var TouchAction = /*#__PURE__*/function () {
    function TouchAction(manager, value) {
      this.manager = manager;
      this.set(value);
    }
    /**
     * @private
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */


    var _proto = TouchAction.prototype;

    _proto.set = function set(value) {
      // find out the touch-action by the event handlers
      if (value === TOUCH_ACTION_COMPUTE) {
        value = this.compute();
      }

      if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
        this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
      }

      this.actions = value.toLowerCase().trim();
    };
    /**
     * @private
     * just re-set the touchAction value
     */


    _proto.update = function update() {
      this.set(this.manager.options.touchAction);
    };
    /**
     * @private
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */


    _proto.compute = function compute() {
      var actions = [];
      each(this.manager.recognizers, function (recognizer) {
        if (boolOrFn(recognizer.options.enable, [recognizer])) {
          actions = actions.concat(recognizer.getTouchAction());
        }
      });
      return cleanTouchActions(actions.join(' '));
    };
    /**
     * @private
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */


    _proto.preventDefaults = function preventDefaults(input) {
      var srcEvent = input.srcEvent;
      var direction = input.offsetDirection; // if the touch action did prevented once this session

      if (this.manager.session.prevented) {
        srcEvent.preventDefault();
        return;
      }

      var actions = this.actions;
      var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
      var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
      var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

      if (hasNone) {
        // do not prevent defaults if this is a tap gesture
        var isTapPointer = input.pointers.length === 1;
        var isTapMovement = input.distance < 2;
        var isTapTouchTime = input.deltaTime < 250;

        if (isTapPointer && isTapMovement && isTapTouchTime) {
          return;
        }
      }

      if (hasPanX && hasPanY) {
        // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
        return;
      }

      if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
        return this.preventSrc(srcEvent);
      }
    };
    /**
     * @private
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */


    _proto.preventSrc = function preventSrc(srcEvent) {
      this.manager.session.prevented = true;
      srcEvent.preventDefault();
    };

    return TouchAction;
  }();
  /**
   * @private
   * find if a node is in the given parent
   * @method hasParent
   * @param {HTMLElement} node
   * @param {HTMLElement} parent
   * @return {Boolean} found
   */


  function hasParent(node, parent) {
    while (node) {
      if (node === parent) {
        return true;
      }

      node = node.parentNode;
    }

    return false;
  }
  /**
   * @private
   * get the center of all the pointers
   * @param {Array} pointers
   * @return {Object} center contains `x` and `y` properties
   */


  function getCenter(pointers) {
    var pointersLength = pointers.length; // no need to loop when only one touch

    if (pointersLength === 1) {
      return {
        x: round(pointers[0].clientX),
        y: round(pointers[0].clientY)
      };
    }

    var x = 0;
    var y = 0;
    var i = 0;

    while (i < pointersLength) {
      x += pointers[i].clientX;
      y += pointers[i].clientY;
      i++;
    }

    return {
      x: round(x / pointersLength),
      y: round(y / pointersLength)
    };
  }
  /**
   * @private
   * create a simple clone from the input used for storage of firstInput and firstMultiple
   * @param {Object} input
   * @returns {Object} clonedInputData
   */


  function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;

    while (i < input.pointers.length) {
      pointers[i] = {
        clientX: round(input.pointers[i].clientX),
        clientY: round(input.pointers[i].clientY)
      };
      i++;
    }

    return {
      timeStamp: now(),
      pointers: pointers,
      center: getCenter(pointers),
      deltaX: input.deltaX,
      deltaY: input.deltaY
    };
  }
  /**
   * @private
   * calculate the absolute distance between two points
   * @param {Object} p1 {x, y}
   * @param {Object} p2 {x, y}
   * @param {Array} [props] containing x and y keys
   * @return {Number} distance
   */


  function getDistance(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }

    var x = p2[props[0]] - p1[props[0]];
    var y = p2[props[1]] - p1[props[1]];
    return Math.sqrt(x * x + y * y);
  }
  /**
   * @private
   * calculate the angle between two coordinates
   * @param {Object} p1
   * @param {Object} p2
   * @param {Array} [props] containing x and y keys
   * @return {Number} angle
   */


  function getAngle(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }

    var x = p2[props[0]] - p1[props[0]];
    var y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
  }
  /**
   * @private
   * get the direction between two points
   * @param {Number} x
   * @param {Number} y
   * @return {Number} direction
   */


  function getDirection(x, y) {
    if (x === y) {
      return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
      return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }

    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
  }

  function computeDeltaXY(session, input) {
    var center = input.center; // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
    // jscs throwing error on defalut destructured values and without defaults tests fail

    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
      prevDelta = session.prevDelta = {
        x: prevInput.deltaX || 0,
        y: prevInput.deltaY || 0
      };
      offset = session.offsetDelta = {
        x: center.x,
        y: center.y
      };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
  }
  /**
   * @private
   * calculate the velocity between two points. unit is in px per ms.
   * @param {Number} deltaTime
   * @param {Number} x
   * @param {Number} y
   * @return {Object} velocity `x` and `y`
   */


  function getVelocity(deltaTime, x, y) {
    return {
      x: x / deltaTime || 0,
      y: y / deltaTime || 0
    };
  }
  /**
   * @private
   * calculate the scale factor between two pointersets
   * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} scale
   */


  function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
  }
  /**
   * @private
   * calculate the rotation degrees between two pointersets
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} rotation
   */


  function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
  }
  /**
   * @private
   * velocity is calculated every x ms
   * @param {Object} session
   * @param {Object} input
   */


  function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input;
    var deltaTime = input.timeStamp - last.timeStamp;
    var velocity;
    var velocityX;
    var velocityY;
    var direction;

    if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
      var deltaX = input.deltaX - last.deltaX;
      var deltaY = input.deltaY - last.deltaY;
      var v = getVelocity(deltaTime, deltaX, deltaY);
      velocityX = v.x;
      velocityY = v.y;
      velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
      direction = getDirection(deltaX, deltaY);
      session.lastInterval = input;
    } else {
      // use latest velocity info if it doesn't overtake a minimum period
      velocity = last.velocity;
      velocityX = last.velocityX;
      velocityY = last.velocityY;
      direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
  }
  /**
  * @private
   * extend the data with some usable properties like scale, rotate, velocity etc
   * @param {Object} manager
   * @param {Object} input
   */


  function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length; // store the first input to calculate the distance and direction

    if (!session.firstInput) {
      session.firstInput = simpleCloneInputData(input);
    } // to compute scale and rotation we need to store the multiple touches


    if (pointersLength > 1 && !session.firstMultiple) {
      session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
      session.firstMultiple = false;
    }

    var firstInput = session.firstInput,
        firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;
    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);
    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
    input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
    computeIntervalInputData(session, input); // find the correct target

    var target = manager.element;
    var srcEvent = input.srcEvent;
    var srcEventTarget;

    if (srcEvent.composedPath) {
      srcEventTarget = srcEvent.composedPath()[0];
    } else if (srcEvent.path) {
      srcEventTarget = srcEvent.path[0];
    } else {
      srcEventTarget = srcEvent.target;
    }

    if (hasParent(srcEventTarget, target)) {
      target = srcEventTarget;
    }

    input.target = target;
  }
  /**
   * @private
   * handle input events
   * @param {Manager} manager
   * @param {String} eventType
   * @param {Object} input
   */


  function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
    var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
      manager.session = {};
    } // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'


    input.eventType = eventType; // compute scale, rotation etc

    computeInputData(manager, input); // emit secret event

    manager.emit('hammer.input', input);
    manager.recognize(input);
    manager.session.prevInput = input;
  }
  /**
   * @private
   * split string on whitespace
   * @param {String} str
   * @returns {Array} words
   */


  function splitStr(str) {
    return str.trim().split(/\s+/g);
  }
  /**
   * @private
   * addEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */


  function addEventListeners(target, types, handler) {
    each(splitStr(types), function (type) {
      target.addEventListener(type, handler, false);
    });
  }
  /**
   * @private
   * removeEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */


  function removeEventListeners(target, types, handler) {
    each(splitStr(types), function (type) {
      target.removeEventListener(type, handler, false);
    });
  }
  /**
   * @private
   * get the window object of an element
   * @param {HTMLElement} element
   * @returns {DocumentView|Window}
   */


  function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return doc.defaultView || doc.parentWindow || window;
  }
  /**
   * @private
   * create new input type manager
   * @param {Manager} manager
   * @param {Function} callback
   * @returns {Input}
   * @constructor
   */


  var Input = /*#__PURE__*/function () {
    function Input(manager, callback) {
      var self = this;
      this.manager = manager;
      this.callback = callback;
      this.element = manager.element;
      this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
      // so when disabled the input events are completely bypassed.

      this.domHandler = function (ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
          self.handler(ev);
        }
      };

      this.init();
    }
    /**
     * @private
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */


    var _proto = Input.prototype;

    _proto.handler = function handler() {};
    /**
     * @private
     * bind the events
     */


    _proto.init = function init() {
      this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
      this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
      this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    };
    /**
     * @private
     * unbind the events
     */


    _proto.destroy = function destroy() {
      this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
      this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
      this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    };

    return Input;
  }();
  /**
   * @private
   * find if a array contains the object using indexOf or a simple polyFill
   * @param {Array} src
   * @param {String} find
   * @param {String} [findByKey]
   * @return {Boolean|Number} false when not found, or the index
   */


  function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
      return src.indexOf(find);
    } else {
      var i = 0;

      while (i < src.length) {
        if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
          // do not use === here, test fails
          return i;
        }

        i++;
      }

      return -1;
    }
  }

  var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
  }; // in IE10 the pointer types is defined as an enum

  var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

  };
  var POINTER_ELEMENT_EVENTS = 'pointerdown';
  var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

  if (win.MSPointerEvent && !win.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
  }
  /**
   * @private
   * Pointer events input
   * @constructor
   * @extends Input
   */


  var PointerEventInput = /*#__PURE__*/function (_Input) {
    _inheritsLoose(PointerEventInput, _Input);

    function PointerEventInput() {
      var _this;

      var proto = PointerEventInput.prototype;
      proto.evEl = POINTER_ELEMENT_EVENTS;
      proto.evWin = POINTER_WINDOW_EVENTS;
      _this = _Input.apply(this, arguments) || this;
      _this.store = _this.manager.session.pointerEvents = [];
      return _this;
    }
    /**
     * @private
     * handle mouse events
     * @param {Object} ev
     */


    var _proto = PointerEventInput.prototype;

    _proto.handler = function handler(ev) {
      var store = this.store;
      var removePointer = false;
      var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
      var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
      var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
      var isTouch = pointerType === INPUT_TYPE_TOUCH; // get index of the event in the store

      var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

      if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
        if (storeIndex < 0) {
          store.push(ev);
          storeIndex = store.length - 1;
        }
      } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        removePointer = true;
      } // it not found, so the pointer hasn't been down (so it's probably a hover)


      if (storeIndex < 0) {
        return;
      } // update the event in the store


      store[storeIndex] = ev;
      this.callback(this.manager, eventType, {
        pointers: store,
        changedPointers: [ev],
        pointerType: pointerType,
        srcEvent: ev
      });

      if (removePointer) {
        // remove from the store
        store.splice(storeIndex, 1);
      }
    };

    return PointerEventInput;
  }(Input);
  /**
   * @private
   * convert array-like objects to real arrays
   * @param {Object} obj
   * @returns {Array}
   */


  function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
  }
  /**
   * @private
   * unique array with objects based on a key (like 'id') or just by the array's value
   * @param {Array} src [{id:1},{id:2},{id:1}]
   * @param {String} [key]
   * @param {Boolean} [sort=False]
   * @returns {Array} [{id:1},{id:2}]
   */


  function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
      var val = key ? src[i][key] : src[i];

      if (inArray(values, val) < 0) {
        results.push(src[i]);
      }

      values[i] = val;
      i++;
    }

    if (sort) {
      if (!key) {
        results = results.sort();
      } else {
        results = results.sort(function (a, b) {
          return a[key] > b[key];
        });
      }
    }

    return results;
  }

  var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
  };
  var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
  /**
   * @private
   * Multi-user touch events input
   * @constructor
   * @extends Input
   */

  var TouchInput = /*#__PURE__*/function (_Input) {
    _inheritsLoose(TouchInput, _Input);

    function TouchInput() {
      var _this;

      TouchInput.prototype.evTarget = TOUCH_TARGET_EVENTS;
      _this = _Input.apply(this, arguments) || this;
      _this.targetIds = {}; // this.evTarget = TOUCH_TARGET_EVENTS;

      return _this;
    }

    var _proto = TouchInput.prototype;

    _proto.handler = function handler(ev) {
      var type = TOUCH_INPUT_MAP[ev.type];
      var touches = getTouches.call(this, ev, type);

      if (!touches) {
        return;
      }

      this.callback(this.manager, type, {
        pointers: touches[0],
        changedPointers: touches[1],
        pointerType: INPUT_TYPE_TOUCH,
        srcEvent: ev
      });
    };

    return TouchInput;
  }(Input);

  function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
      targetIds[allTouches[0].identifier] = true;
      return [allTouches, allTouches];
    }

    var i;
    var targetTouches;
    var changedTouches = toArray(ev.changedTouches);
    var changedTargetTouches = [];
    var target = this.target; // get target touches from touches

    targetTouches = allTouches.filter(function (touch) {
      return hasParent(touch.target, target);
    }); // collect touches

    if (type === INPUT_START) {
      i = 0;

      while (i < targetTouches.length) {
        targetIds[targetTouches[i].identifier] = true;
        i++;
      }
    } // filter changed touches to only contain touches that exist in the collected target ids


    i = 0;

    while (i < changedTouches.length) {
      if (targetIds[changedTouches[i].identifier]) {
        changedTargetTouches.push(changedTouches[i]);
      } // cleanup removed touches


      if (type & (INPUT_END | INPUT_CANCEL)) {
        delete targetIds[changedTouches[i].identifier];
      }

      i++;
    }

    if (!changedTargetTouches.length) {
      return;
    }

    return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
    uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
  }

  var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
  };
  var MOUSE_ELEMENT_EVENTS = 'mousedown';
  var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
  /**
   * @private
   * Mouse events input
   * @constructor
   * @extends Input
   */

  var MouseInput = /*#__PURE__*/function (_Input) {
    _inheritsLoose(MouseInput, _Input);

    function MouseInput() {
      var _this;

      var proto = MouseInput.prototype;
      proto.evEl = MOUSE_ELEMENT_EVENTS;
      proto.evWin = MOUSE_WINDOW_EVENTS;
      _this = _Input.apply(this, arguments) || this;
      _this.pressed = false; // mousedown state

      return _this;
    }
    /**
     * @private
     * handle mouse events
     * @param {Object} ev
     */


    var _proto = MouseInput.prototype;

    _proto.handler = function handler(ev) {
      var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

      if (eventType & INPUT_START && ev.button === 0) {
        this.pressed = true;
      }

      if (eventType & INPUT_MOVE && ev.which !== 1) {
        eventType = INPUT_END;
      } // mouse must be down


      if (!this.pressed) {
        return;
      }

      if (eventType & INPUT_END) {
        this.pressed = false;
      }

      this.callback(this.manager, eventType, {
        pointers: [ev],
        changedPointers: [ev],
        pointerType: INPUT_TYPE_MOUSE,
        srcEvent: ev
      });
    };

    return MouseInput;
  }(Input);
  /**
   * @private
   * Combined touch and mouse input
   *
   * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
   * This because touch devices also emit mouse events while doing a touch.
   *
   * @constructor
   * @extends Input
   */


  var DEDUP_TIMEOUT = 2500;
  var DEDUP_DISTANCE = 25;

  function setLastTouch(eventData) {
    var _eventData$changedPoi = eventData.changedPointers,
        touch = _eventData$changedPoi[0];

    if (touch.identifier === this.primaryTouch) {
      var lastTouch = {
        x: touch.clientX,
        y: touch.clientY
      };
      var lts = this.lastTouches;
      this.lastTouches.push(lastTouch);

      var removeLastTouch = function removeLastTouch() {
        var i = lts.indexOf(lastTouch);

        if (i > -1) {
          lts.splice(i, 1);
        }
      };

      setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
  }

  function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
      this.primaryTouch = eventData.changedPointers[0].identifier;
      setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
      setLastTouch.call(this, eventData);
    }
  }

  function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX;
    var y = eventData.srcEvent.clientY;

    for (var i = 0; i < this.lastTouches.length; i++) {
      var t = this.lastTouches[i];
      var dx = Math.abs(x - t.x);
      var dy = Math.abs(y - t.y);

      if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
        return true;
      }
    }

    return false;
  }

  var TouchMouseInput = /*#__PURE__*/function () {
    var TouchMouseInput = /*#__PURE__*/function (_Input) {
      _inheritsLoose(TouchMouseInput, _Input);

      function TouchMouseInput(_manager, callback) {
        var _this;

        _this = _Input.call(this, _manager, callback) || this;

        _this.handler = function (manager, inputEvent, inputData) {
          var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
          var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

          if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
          } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


          if (isTouch) {
            recordTouches.call(_assertThisInitialized$1(_assertThisInitialized$1(_this)), inputEvent, inputData);
          } else if (isMouse && isSyntheticEvent.call(_assertThisInitialized$1(_assertThisInitialized$1(_this)), inputData)) {
            return;
          }

          _this.callback(manager, inputEvent, inputData);
        };

        _this.touch = new TouchInput(_this.manager, _this.handler);
        _this.mouse = new MouseInput(_this.manager, _this.handler);
        _this.primaryTouch = null;
        _this.lastTouches = [];
        return _this;
      }
      /**
       * @private
       * handle mouse and touch events
       * @param {Hammer} manager
       * @param {String} inputEvent
       * @param {Object} inputData
       */


      var _proto = TouchMouseInput.prototype;
      /**
       * @private
       * remove the event listeners
       */

      _proto.destroy = function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
      };

      return TouchMouseInput;
    }(Input);

    return TouchMouseInput;
  }();
  /**
   * @private
   * create new input type manager
   * called by the Manager constructor
   * @param {Hammer} manager
   * @returns {Input}
   */


  function createInputInstance(manager) {
    var Type; // let inputClass = manager.options.inputClass;

    var inputClass = manager.options.inputClass;

    if (inputClass) {
      Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
      Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
      Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
      Type = MouseInput;
    } else {
      Type = TouchMouseInput;
    }

    return new Type(manager, inputHandler);
  }
  /**
   * @private
   * if the argument is an array, we want to execute the fn on each entry
   * if it aint an array we don't want to do a thing.
   * this is used by all the methods that accept a single and array argument.
   * @param {*|Array} arg
   * @param {String} fn
   * @param {Object} [context]
   * @returns {Boolean}
   */


  function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
      each(arg, context[fn], context);
      return true;
    }

    return false;
  }

  var STATE_POSSIBLE = 1;
  var STATE_BEGAN = 2;
  var STATE_CHANGED = 4;
  var STATE_ENDED = 8;
  var STATE_RECOGNIZED = STATE_ENDED;
  var STATE_CANCELLED = 16;
  var STATE_FAILED = 32;
  /**
   * @private
   * get a unique id
   * @returns {number} uniqueId
   */

  var _uniqueId = 1;

  function uniqueId() {
    return _uniqueId++;
  }
  /**
   * @private
   * get a recognizer by name if it is bound to a manager
   * @param {Recognizer|String} otherRecognizer
   * @param {Recognizer} recognizer
   * @returns {Recognizer}
   */


  function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;

    if (manager) {
      return manager.get(otherRecognizer);
    }

    return otherRecognizer;
  }
  /**
   * @private
   * get a usable string, used as event postfix
   * @param {constant} state
   * @returns {String} state
   */


  function stateStr(state) {
    if (state & STATE_CANCELLED) {
      return 'cancel';
    } else if (state & STATE_ENDED) {
      return 'end';
    } else if (state & STATE_CHANGED) {
      return 'move';
    } else if (state & STATE_BEGAN) {
      return 'start';
    }

    return '';
  }
  /**
   * @private
   * Recognizer flow explained; *
   * All recognizers have the initial state of POSSIBLE when a input session starts.
   * The definition of a input session is from the first input until the last input, with all it's movement in it. *
   * Example session for mouse-input: mousedown -> mousemove -> mouseup
   *
   * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
   * which determines with state it should be.
   *
   * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
   * POSSIBLE to give it another change on the next cycle.
   *
   *               Possible
   *                  |
   *            +-----+---------------+
   *            |                     |
   *      +-----+-----+               |
   *      |           |               |
   *   Failed      Cancelled          |
   *                          +-------+------+
   *                          |              |
   *                      Recognized       Began
   *                                         |
   *                                      Changed
   *                                         |
   *                                  Ended/Recognized
   */

  /**
   * @private
   * Recognizer
   * Every recognizer needs to extend from this class.
   * @constructor
   * @param {Object} options
   */


  var Recognizer = /*#__PURE__*/function () {
    function Recognizer(options) {
      if (options === void 0) {
        options = {};
      }

      this.options = _extends({
        enable: true
      }, options);
      this.id = uniqueId();
      this.manager = null; // default is enable true

      this.state = STATE_POSSIBLE;
      this.simultaneous = {};
      this.requireFail = [];
    }
    /**
     * @private
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */


    var _proto = Recognizer.prototype;

    _proto.set = function set(options) {
      assign$1(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

      this.manager && this.manager.touchAction.update();
      return this;
    };
    /**
     * @private
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */


    _proto.recognizeWith = function recognizeWith(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
        return this;
      }

      var simultaneous = this.simultaneous;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

      if (!simultaneous[otherRecognizer.id]) {
        simultaneous[otherRecognizer.id] = otherRecognizer;
        otherRecognizer.recognizeWith(this);
      }

      return this;
    };
    /**
     * @private
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */


    _proto.dropRecognizeWith = function dropRecognizeWith(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
        return this;
      }

      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      delete this.simultaneous[otherRecognizer.id];
      return this;
    };
    /**
     * @private
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */


    _proto.requireFailure = function requireFailure(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
        return this;
      }

      var requireFail = this.requireFail;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

      if (inArray(requireFail, otherRecognizer) === -1) {
        requireFail.push(otherRecognizer);
        otherRecognizer.requireFailure(this);
      }

      return this;
    };
    /**
     * @private
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */


    _proto.dropRequireFailure = function dropRequireFailure(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
        return this;
      }

      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      var index = inArray(this.requireFail, otherRecognizer);

      if (index > -1) {
        this.requireFail.splice(index, 1);
      }

      return this;
    };
    /**
     * @private
     * has require failures boolean
     * @returns {boolean}
     */


    _proto.hasRequireFailures = function hasRequireFailures() {
      return this.requireFail.length > 0;
    };
    /**
     * @private
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */


    _proto.canRecognizeWith = function canRecognizeWith(otherRecognizer) {
      return !!this.simultaneous[otherRecognizer.id];
    };
    /**
     * @private
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */


    _proto.emit = function emit(input) {
      var self = this;
      var state = this.state;

      function emit(event) {
        self.manager.emit(event, input);
      } // 'panstart' and 'panmove'


      if (state < STATE_ENDED) {
        emit(self.options.event + stateStr(state));
      }

      emit(self.options.event); // simple 'eventName' events

      if (input.additionalEvent) {
        // additional event(panleft, panright, pinchin, pinchout...)
        emit(input.additionalEvent);
      } // panend and pancancel


      if (state >= STATE_ENDED) {
        emit(self.options.event + stateStr(state));
      }
    };
    /**
     * @private
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */


    _proto.tryEmit = function tryEmit(input) {
      if (this.canEmit()) {
        return this.emit(input);
      } // it's failing anyway


      this.state = STATE_FAILED;
    };
    /**
     * @private
     * can we emit?
     * @returns {boolean}
     */


    _proto.canEmit = function canEmit() {
      var i = 0;

      while (i < this.requireFail.length) {
        if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
          return false;
        }

        i++;
      }

      return true;
    };
    /**
     * @private
     * update the recognizer
     * @param {Object} inputData
     */


    _proto.recognize = function recognize(inputData) {
      // make a new copy of the inputData
      // so we can change the inputData without messing up the other recognizers
      var inputDataClone = assign$1({}, inputData); // is is enabled and allow recognizing?

      if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
        this.reset();
        this.state = STATE_FAILED;
        return;
      } // reset when we've reached the end


      if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
        this.state = STATE_POSSIBLE;
      }

      this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
      // so trigger an event

      if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
        this.tryEmit(inputDataClone);
      }
    };
    /**
     * @private
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {constant} STATE
     */

    /* jshint ignore:start */


    _proto.process = function process(inputData) {};
    /* jshint ignore:end */

    /**
     * @private
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */


    _proto.getTouchAction = function getTouchAction() {};
    /**
     * @private
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */


    _proto.reset = function reset() {};

    return Recognizer;
  }();
  /**
   * @private
   * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
   * between the given interval and position. The delay option can be used to recognize multi-taps without firing
   * a single tap.
   *
   * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
   * multi-taps being recognized.
   * @constructor
   * @extends Recognizer
   */


  var TapRecognizer = /*#__PURE__*/function (_Recognizer) {
    _inheritsLoose(TapRecognizer, _Recognizer);

    function TapRecognizer(options) {
      var _this;

      if (options === void 0) {
        options = {};
      }

      _this = _Recognizer.call(this, _extends({
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300,
        // max time between the multi-tap taps
        time: 250,
        // max time of the pointer to be down (like finger on the screen)
        threshold: 9,
        // a minimal movement is ok, but keep it low
        posThreshold: 10
      }, options)) || this; // previous time and center,
      // used for tap counting

      _this.pTime = false;
      _this.pCenter = false;
      _this._timer = null;
      _this._input = null;
      _this.count = 0;
      return _this;
    }

    var _proto = TapRecognizer.prototype;

    _proto.getTouchAction = function getTouchAction() {
      return [TOUCH_ACTION_MANIPULATION];
    };

    _proto.process = function process(input) {
      var _this2 = this;

      var options = this.options;
      var validPointers = input.pointers.length === options.pointers;
      var validMovement = input.distance < options.threshold;
      var validTouchTime = input.deltaTime < options.time;
      this.reset();

      if (input.eventType & INPUT_START && this.count === 0) {
        return this.failTimeout();
      } // we only allow little movement
      // and we've reached an end event, so a tap is possible


      if (validMovement && validTouchTime && validPointers) {
        if (input.eventType !== INPUT_END) {
          return this.failTimeout();
        }

        var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
        var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
        this.pTime = input.timeStamp;
        this.pCenter = input.center;

        if (!validMultiTap || !validInterval) {
          this.count = 1;
        } else {
          this.count += 1;
        }

        this._input = input; // if tap count matches we have recognized it,
        // else it has began recognizing...

        var tapCount = this.count % options.taps;

        if (tapCount === 0) {
          // no failing requirements, immediately trigger the tap event
          // or wait as long as the multitap interval to trigger
          if (!this.hasRequireFailures()) {
            return STATE_RECOGNIZED;
          } else {
            this._timer = setTimeout(function () {
              _this2.state = STATE_RECOGNIZED;

              _this2.tryEmit();
            }, options.interval);
            return STATE_BEGAN;
          }
        }
      }

      return STATE_FAILED;
    };

    _proto.failTimeout = function failTimeout() {
      var _this3 = this;

      this._timer = setTimeout(function () {
        _this3.state = STATE_FAILED;
      }, this.options.interval);
      return STATE_FAILED;
    };

    _proto.reset = function reset() {
      clearTimeout(this._timer);
    };

    _proto.emit = function emit() {
      if (this.state === STATE_RECOGNIZED) {
        this._input.tapCount = this.count;
        this.manager.emit(this.options.event, this._input);
      }
    };

    return TapRecognizer;
  }(Recognizer);
  /**
   * @private
   * This recognizer is just used as a base for the simple attribute recognizers.
   * @constructor
   * @extends Recognizer
   */


  var AttrRecognizer = /*#__PURE__*/function (_Recognizer) {
    _inheritsLoose(AttrRecognizer, _Recognizer);

    function AttrRecognizer(options) {
      if (options === void 0) {
        options = {};
      }

      return _Recognizer.call(this, _extends({
        pointers: 1
      }, options)) || this;
    }
    /**
     * @private
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */


    var _proto = AttrRecognizer.prototype;

    _proto.attrTest = function attrTest(input) {
      var optionPointers = this.options.pointers;
      return optionPointers === 0 || input.pointers.length === optionPointers;
    };
    /**
     * @private
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */


    _proto.process = function process(input) {
      var state = this.state;
      var eventType = input.eventType;
      var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
      var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

      if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
        return state | STATE_CANCELLED;
      } else if (isRecognized || isValid) {
        if (eventType & INPUT_END) {
          return state | STATE_ENDED;
        } else if (!(state & STATE_BEGAN)) {
          return STATE_BEGAN;
        }

        return state | STATE_CHANGED;
      }

      return STATE_FAILED;
    };

    return AttrRecognizer;
  }(Recognizer);
  /**
   * @private
   * direction cons to string
   * @param {constant} direction
   * @returns {String}
   */


  function directionStr(direction) {
    if (direction === DIRECTION_DOWN) {
      return 'down';
    } else if (direction === DIRECTION_UP) {
      return 'up';
    } else if (direction === DIRECTION_LEFT) {
      return 'left';
    } else if (direction === DIRECTION_RIGHT) {
      return 'right';
    }

    return '';
  }
  /**
   * @private
   * Pan
   * Recognized when the pointer is down and moved in the allowed direction.
   * @constructor
   * @extends AttrRecognizer
   */


  var PanRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
    _inheritsLoose(PanRecognizer, _AttrRecognizer);

    function PanRecognizer(options) {
      var _this;

      if (options === void 0) {
        options = {};
      }

      _this = _AttrRecognizer.call(this, _extends({
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
      }, options)) || this;
      _this.pX = null;
      _this.pY = null;
      return _this;
    }

    var _proto = PanRecognizer.prototype;

    _proto.getTouchAction = function getTouchAction() {
      var direction = this.options.direction;
      var actions = [];

      if (direction & DIRECTION_HORIZONTAL) {
        actions.push(TOUCH_ACTION_PAN_Y);
      }

      if (direction & DIRECTION_VERTICAL) {
        actions.push(TOUCH_ACTION_PAN_X);
      }

      return actions;
    };

    _proto.directionTest = function directionTest(input) {
      var options = this.options;
      var hasMoved = true;
      var distance = input.distance;
      var direction = input.direction;
      var x = input.deltaX;
      var y = input.deltaY; // lock to axis?

      if (!(direction & options.direction)) {
        if (options.direction & DIRECTION_HORIZONTAL) {
          direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
          hasMoved = x !== this.pX;
          distance = Math.abs(input.deltaX);
        } else {
          direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
          hasMoved = y !== this.pY;
          distance = Math.abs(input.deltaY);
        }
      }

      input.direction = direction;
      return hasMoved && distance > options.threshold && direction & options.direction;
    };

    _proto.attrTest = function attrTest(input) {
      return AttrRecognizer.prototype.attrTest.call(this, input) && ( // replace with a super call
      this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
    };

    _proto.emit = function emit(input) {
      this.pX = input.deltaX;
      this.pY = input.deltaY;
      var direction = directionStr(input.direction);

      if (direction) {
        input.additionalEvent = this.options.event + direction;
      }

      _AttrRecognizer.prototype.emit.call(this, input);
    };

    return PanRecognizer;
  }(AttrRecognizer);
  /**
   * @private
   * Swipe
   * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
   * @constructor
   * @extends AttrRecognizer
   */


  var SwipeRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
    _inheritsLoose(SwipeRecognizer, _AttrRecognizer);

    function SwipeRecognizer(options) {
      if (options === void 0) {
        options = {};
      }

      return _AttrRecognizer.call(this, _extends({
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
      }, options)) || this;
    }

    var _proto = SwipeRecognizer.prototype;

    _proto.getTouchAction = function getTouchAction() {
      return PanRecognizer.prototype.getTouchAction.call(this);
    };

    _proto.attrTest = function attrTest(input) {
      var direction = this.options.direction;
      var velocity;

      if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
        velocity = input.overallVelocity;
      } else if (direction & DIRECTION_HORIZONTAL) {
        velocity = input.overallVelocityX;
      } else if (direction & DIRECTION_VERTICAL) {
        velocity = input.overallVelocityY;
      }

      return _AttrRecognizer.prototype.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers === this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    };

    _proto.emit = function emit(input) {
      var direction = directionStr(input.offsetDirection);

      if (direction) {
        this.manager.emit(this.options.event + direction, input);
      }

      this.manager.emit(this.options.event, input);
    };

    return SwipeRecognizer;
  }(AttrRecognizer);
  /**
   * @private
   * Pinch
   * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
   * @constructor
   * @extends AttrRecognizer
   */


  var PinchRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
    _inheritsLoose(PinchRecognizer, _AttrRecognizer);

    function PinchRecognizer(options) {
      if (options === void 0) {
        options = {};
      }

      return _AttrRecognizer.call(this, _extends({
        event: 'pinch',
        threshold: 0,
        pointers: 2
      }, options)) || this;
    }

    var _proto = PinchRecognizer.prototype;

    _proto.getTouchAction = function getTouchAction() {
      return [TOUCH_ACTION_NONE];
    };

    _proto.attrTest = function attrTest(input) {
      return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    };

    _proto.emit = function emit(input) {
      if (input.scale !== 1) {
        var inOut = input.scale < 1 ? 'in' : 'out';
        input.additionalEvent = this.options.event + inOut;
      }

      _AttrRecognizer.prototype.emit.call(this, input);
    };

    return PinchRecognizer;
  }(AttrRecognizer);
  /**
   * @private
   * Rotate
   * Recognized when two or more pointer are moving in a circular motion.
   * @constructor
   * @extends AttrRecognizer
   */


  var RotateRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
    _inheritsLoose(RotateRecognizer, _AttrRecognizer);

    function RotateRecognizer(options) {
      if (options === void 0) {
        options = {};
      }

      return _AttrRecognizer.call(this, _extends({
        event: 'rotate',
        threshold: 0,
        pointers: 2
      }, options)) || this;
    }

    var _proto = RotateRecognizer.prototype;

    _proto.getTouchAction = function getTouchAction() {
      return [TOUCH_ACTION_NONE];
    };

    _proto.attrTest = function attrTest(input) {
      return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    };

    return RotateRecognizer;
  }(AttrRecognizer);
  /**
   * @private
   * Press
   * Recognized when the pointer is down for x ms without any movement.
   * @constructor
   * @extends Recognizer
   */


  var PressRecognizer = /*#__PURE__*/function (_Recognizer) {
    _inheritsLoose(PressRecognizer, _Recognizer);

    function PressRecognizer(options) {
      var _this;

      if (options === void 0) {
        options = {};
      }

      _this = _Recognizer.call(this, _extends({
        event: 'press',
        pointers: 1,
        time: 251,
        // minimal time of the pointer to be pressed
        threshold: 9
      }, options)) || this;
      _this._timer = null;
      _this._input = null;
      return _this;
    }

    var _proto = PressRecognizer.prototype;

    _proto.getTouchAction = function getTouchAction() {
      return [TOUCH_ACTION_AUTO];
    };

    _proto.process = function process(input) {
      var _this2 = this;

      var options = this.options;
      var validPointers = input.pointers.length === options.pointers;
      var validMovement = input.distance < options.threshold;
      var validTime = input.deltaTime > options.time;
      this._input = input; // we only allow little movement
      // and we've reached an end event, so a tap is possible

      if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
        this.reset();
      } else if (input.eventType & INPUT_START) {
        this.reset();
        this._timer = setTimeout(function () {
          _this2.state = STATE_RECOGNIZED;

          _this2.tryEmit();
        }, options.time);
      } else if (input.eventType & INPUT_END) {
        return STATE_RECOGNIZED;
      }

      return STATE_FAILED;
    };

    _proto.reset = function reset() {
      clearTimeout(this._timer);
    };

    _proto.emit = function emit(input) {
      if (this.state !== STATE_RECOGNIZED) {
        return;
      }

      if (input && input.eventType & INPUT_END) {
        this.manager.emit(this.options.event + "up", input);
      } else {
        this._input.timeStamp = now();
        this.manager.emit(this.options.event, this._input);
      }
    };

    return PressRecognizer;
  }(Recognizer);

  var defaults = {
    /**
     * @private
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * @private
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @private
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * @private
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * @private
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * @private
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
      /**
       * @private
       * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
       * @type {String}
       * @default 'none'
       */
      userSelect: "none",

      /**
       * @private
       * Disable the Windows Phone grippers when pressing an element.
       * @type {String}
       * @default 'none'
       */
      touchSelect: "none",

      /**
       * @private
       * Disables the default callout shown when you touch and hold a touch target.
       * On iOS, when you touch and hold a touch target such as a link, Safari displays
       * a callout containing information about the link. This property allows you to disable that callout.
       * @type {String}
       * @default 'none'
       */
      touchCallout: "none",

      /**
       * @private
       * Specifies whether zooming is enabled. Used by IE10>
       * @type {String}
       * @default 'none'
       */
      contentZooming: "none",

      /**
       * @private
       * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
       * @type {String}
       * @default 'none'
       */
      userDrag: "none",

      /**
       * @private
       * Overrides the highlight color shown when the user taps a link or a JavaScript
       * clickable element in iOS. This property obeys the alpha value, if specified.
       * @type {String}
       * @default 'rgba(0,0,0,0)'
       */
      tapHighlightColor: "rgba(0,0,0,0)"
    }
  };
  /**
   * @private
   * Default recognizer setup when calling `Hammer()`
   * When creating a new Manager these will be skipped.
   * This is separated with other defaults because of tree-shaking.
   * @type {Array}
   */

  var preset = [[RotateRecognizer, {
    enable: false
  }], [PinchRecognizer, {
    enable: false
  }, ['rotate']], [SwipeRecognizer, {
    direction: DIRECTION_HORIZONTAL
  }], [PanRecognizer, {
    direction: DIRECTION_HORIZONTAL
  }, ['swipe']], [TapRecognizer], [TapRecognizer, {
    event: 'doubletap',
    taps: 2
  }, ['tap']], [PressRecognizer]];
  var STOP = 1;
  var FORCED_STOP = 2;
  /**
   * @private
   * add/remove the css properties as defined in manager.options.cssProps
   * @param {Manager} manager
   * @param {Boolean} add
   */

  function toggleCssProps(manager, add) {
    var element = manager.element;

    if (!element.style) {
      return;
    }

    var prop;
    each(manager.options.cssProps, function (value, name) {
      prop = prefixed(element.style, name);

      if (add) {
        manager.oldCssProps[prop] = element.style[prop];
        element.style[prop] = value;
      } else {
        element.style[prop] = manager.oldCssProps[prop] || "";
      }
    });

    if (!add) {
      manager.oldCssProps = {};
    }
  }
  /**
   * @private
   * trigger dom event
   * @param {String} event
   * @param {Object} data
   */


  function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent("Event");
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
  }
  /**
  * @private
   * Manager
   * @param {HTMLElement} element
   * @param {Object} [options]
   * @constructor
   */


  var Manager = /*#__PURE__*/function () {
    function Manager(element, options) {
      var _this = this;

      this.options = assign$1({}, defaults, options || {});
      this.options.inputTarget = this.options.inputTarget || element;
      this.handlers = {};
      this.session = {};
      this.recognizers = [];
      this.oldCssProps = {};
      this.element = element;
      this.input = createInputInstance(this);
      this.touchAction = new TouchAction(this, this.options.touchAction);
      toggleCssProps(this, true);
      each(this.options.recognizers, function (item) {
        var recognizer = _this.add(new item[0](item[1]));

        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
      }, this);
    }
    /**
     * @private
     * set options
     * @param {Object} options
     * @returns {Manager}
     */


    var _proto = Manager.prototype;

    _proto.set = function set(options) {
      assign$1(this.options, options); // Options that need a little more setup

      if (options.touchAction) {
        this.touchAction.update();
      }

      if (options.inputTarget) {
        // Clean up existing event listeners and reinitialize
        this.input.destroy();
        this.input.target = options.inputTarget;
        this.input.init();
      }

      return this;
    };
    /**
     * @private
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */


    _proto.stop = function stop(force) {
      this.session.stopped = force ? FORCED_STOP : STOP;
    };
    /**
     * @private
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */


    _proto.recognize = function recognize(inputData) {
      var session = this.session;

      if (session.stopped) {
        return;
      } // run the touch-action polyfill


      this.touchAction.preventDefaults(inputData);
      var recognizer;
      var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
      // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
      // if no recognizer is detecting a thing, it is set to `null`

      var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
      // or when we're in a new session

      if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
        session.curRecognizer = null;
        curRecognizer = null;
      }

      var i = 0;

      while (i < recognizers.length) {
        recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
        // 1.   allow if the session is NOT forced stopped (see the .stop() method)
        // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
        //      that is being recognized.
        // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
        //      this can be setup with the `recognizeWith()` method on the recognizer.

        if (session.stopped !== FORCED_STOP && ( // 1
        !curRecognizer || recognizer === curRecognizer || // 2
        recognizer.canRecognizeWith(curRecognizer))) {
          // 3
          recognizer.recognize(inputData);
        } else {
          recognizer.reset();
        } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
        // current active recognizer. but only if we don't already have an active recognizer


        if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
          session.curRecognizer = recognizer;
          curRecognizer = recognizer;
        }

        i++;
      }
    };
    /**
     * @private
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */


    _proto.get = function get(recognizer) {
      if (recognizer instanceof Recognizer) {
        return recognizer;
      }

      var recognizers = this.recognizers;

      for (var i = 0; i < recognizers.length; i++) {
        if (recognizers[i].options.event === recognizer) {
          return recognizers[i];
        }
      }

      return null;
    };
    /**
     * @private add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */


    _proto.add = function add(recognizer) {
      if (invokeArrayArg(recognizer, "add", this)) {
        return this;
      } // remove existing


      var existing = this.get(recognizer.options.event);

      if (existing) {
        this.remove(existing);
      }

      this.recognizers.push(recognizer);
      recognizer.manager = this;
      this.touchAction.update();
      return recognizer;
    };
    /**
     * @private
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */


    _proto.remove = function remove(recognizer) {
      if (invokeArrayArg(recognizer, "remove", this)) {
        return this;
      }

      var targetRecognizer = this.get(recognizer); // let's make sure this recognizer exists

      if (recognizer) {
        var recognizers = this.recognizers;
        var index = inArray(recognizers, targetRecognizer);

        if (index !== -1) {
          recognizers.splice(index, 1);
          this.touchAction.update();
        }
      }

      return this;
    };
    /**
     * @private
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */


    _proto.on = function on(events, handler) {
      if (events === undefined || handler === undefined) {
        return this;
      }

      var handlers = this.handlers;
      each(splitStr(events), function (event) {
        handlers[event] = handlers[event] || [];
        handlers[event].push(handler);
      });
      return this;
    };
    /**
     * @private unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */


    _proto.off = function off(events, handler) {
      if (events === undefined) {
        return this;
      }

      var handlers = this.handlers;
      each(splitStr(events), function (event) {
        if (!handler) {
          delete handlers[event];
        } else {
          handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
        }
      });
      return this;
    };
    /**
     * @private emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */


    _proto.emit = function emit(event, data) {
      // we also want to trigger dom events
      if (this.options.domEvents) {
        triggerDomEvent(event, data);
      } // no handlers, so skip it all


      var handlers = this.handlers[event] && this.handlers[event].slice();

      if (!handlers || !handlers.length) {
        return;
      }

      data.type = event;

      data.preventDefault = function () {
        data.srcEvent.preventDefault();
      };

      var i = 0;

      while (i < handlers.length) {
        handlers[i](data);
        i++;
      }
    };
    /**
     * @private
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */


    _proto.destroy = function destroy() {
      this.element && toggleCssProps(this, false);
      this.handlers = {};
      this.session = {};
      this.input.destroy();
      this.element = null;
    };

    return Manager;
  }();

  var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
  };
  var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
  var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
  /**
   * @private
   * Touch events input
   * @constructor
   * @extends Input
   */

  var SingleTouchInput = /*#__PURE__*/function (_Input) {
    _inheritsLoose(SingleTouchInput, _Input);

    function SingleTouchInput() {
      var _this;

      var proto = SingleTouchInput.prototype;
      proto.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
      proto.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
      _this = _Input.apply(this, arguments) || this;
      _this.started = false;
      return _this;
    }

    var _proto = SingleTouchInput.prototype;

    _proto.handler = function handler(ev) {
      var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

      if (type === INPUT_START) {
        this.started = true;
      }

      if (!this.started) {
        return;
      }

      var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

      if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
        this.started = false;
      }

      this.callback(this.manager, type, {
        pointers: touches[0],
        changedPointers: touches[1],
        pointerType: INPUT_TYPE_TOUCH,
        srcEvent: ev
      });
    };

    return SingleTouchInput;
  }(Input);

  function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
      all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
  }
  /**
   * @private
   * wrap a method with a deprecation warning and stack trace
   * @param {Function} method
   * @param {String} name
   * @param {String} message
   * @returns {Function} A new function wrapping the supplied method.
   */


  function deprecate(method, name, message) {
    var deprecationMessage = "DEPRECATED METHOD: " + name + "\n" + message + " AT \n";
    return function () {
      var e = new Error('get-stack-trace');
      var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
      var log = window.console && (window.console.warn || window.console.log);

      if (log) {
        log.call(window.console, deprecationMessage, stack);
      }

      return method.apply(this, arguments);
    };
  }
  /**
   * @private
   * extend object.
   * means that properties in dest will be overwritten by the ones in src.
   * @param {Object} dest
   * @param {Object} src
   * @param {Boolean} [merge=false]
   * @returns {Object} dest
   */


  var extend = deprecate(function (dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;

    while (i < keys.length) {
      if (!merge || merge && dest[keys[i]] === undefined) {
        dest[keys[i]] = src[keys[i]];
      }

      i++;
    }

    return dest;
  }, 'extend', 'Use `assign`.');
  /**
   * @private
   * merge the values from src in the dest.
   * means that properties that exist in dest will not be overwritten by src
   * @param {Object} dest
   * @param {Object} src
   * @returns {Object} dest
   */

  var merge$1 = deprecate(function (dest, src) {
    return extend(dest, src, true);
  }, 'merge', 'Use `assign`.');
  /**
   * @private
   * simple class inheritance
   * @param {Function} child
   * @param {Function} base
   * @param {Object} [properties]
   */

  function inherit(child, base, properties) {
    var baseP = base.prototype;
    var childP;
    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
      assign$1(childP, properties);
    }
  }
  /**
   * @private
   * simple function bind
   * @param {Function} fn
   * @param {Object} context
   * @returns {Function}
   */


  function bindFn(fn, context) {
    return function boundFn() {
      return fn.apply(context, arguments);
    };
  }
  /**
   * @private
   * Simple way to create a manager with a default set of recognizers.
   * @param {HTMLElement} element
   * @param {Object} [options]
   * @constructor
   */


  var Hammer = /*#__PURE__*/function () {
    var Hammer =
    /**
      * @private
      * @const {string}
      */
    function Hammer(element, options) {
      if (options === void 0) {
        options = {};
      }

      return new Manager(element, _extends({
        recognizers: preset.concat()
      }, options));
    };

    Hammer.VERSION = "2.0.17-rc";
    Hammer.DIRECTION_ALL = DIRECTION_ALL;
    Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
    Hammer.DIRECTION_LEFT = DIRECTION_LEFT;
    Hammer.DIRECTION_RIGHT = DIRECTION_RIGHT;
    Hammer.DIRECTION_UP = DIRECTION_UP;
    Hammer.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
    Hammer.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
    Hammer.DIRECTION_NONE = DIRECTION_NONE;
    Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
    Hammer.INPUT_START = INPUT_START;
    Hammer.INPUT_MOVE = INPUT_MOVE;
    Hammer.INPUT_END = INPUT_END;
    Hammer.INPUT_CANCEL = INPUT_CANCEL;
    Hammer.STATE_POSSIBLE = STATE_POSSIBLE;
    Hammer.STATE_BEGAN = STATE_BEGAN;
    Hammer.STATE_CHANGED = STATE_CHANGED;
    Hammer.STATE_ENDED = STATE_ENDED;
    Hammer.STATE_RECOGNIZED = STATE_RECOGNIZED;
    Hammer.STATE_CANCELLED = STATE_CANCELLED;
    Hammer.STATE_FAILED = STATE_FAILED;
    Hammer.Manager = Manager;
    Hammer.Input = Input;
    Hammer.TouchAction = TouchAction;
    Hammer.TouchInput = TouchInput;
    Hammer.MouseInput = MouseInput;
    Hammer.PointerEventInput = PointerEventInput;
    Hammer.TouchMouseInput = TouchMouseInput;
    Hammer.SingleTouchInput = SingleTouchInput;
    Hammer.Recognizer = Recognizer;
    Hammer.AttrRecognizer = AttrRecognizer;
    Hammer.Tap = TapRecognizer;
    Hammer.Pan = PanRecognizer;
    Hammer.Swipe = SwipeRecognizer;
    Hammer.Pinch = PinchRecognizer;
    Hammer.Rotate = RotateRecognizer;
    Hammer.Press = PressRecognizer;
    Hammer.on = addEventListeners;
    Hammer.off = removeEventListeners;
    Hammer.each = each;
    Hammer.merge = merge$1;
    Hammer.extend = extend;
    Hammer.bindFn = bindFn;
    Hammer.assign = assign$1;
    Hammer.inherit = inherit;
    Hammer.bindFn = bindFn;
    Hammer.prefixed = prefixed;
    Hammer.toArray = toArray;
    Hammer.inArray = inArray;
    Hammer.uniqueArray = uniqueArray;
    Hammer.splitStr = splitStr;
    Hammer.boolOrFn = boolOrFn;
    Hammer.hasParent = hasParent;
    Hammer.addEventListeners = addEventListeners;
    Hammer.removeEventListeners = removeEventListeners;
    Hammer.defaults = assign$1({}, defaults, {
      preset: preset
    });
    return Hammer;
  }(); //  style loader but by script tag, not by the loader.
  var RealHammer = Hammer;

  function _createForOfIteratorHelper$3(o, allowArrayLike) { var it = typeof symbol !== "undefined" && getIteratorMethod$1(o) || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$3(o, minLen) { var _context21; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = slice(_context21 = Object.prototype.toString.call(o)).call(_context21, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from$3(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

  function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  /**
   * Use this symbol to delete properies in deepObjectAssign.
   */

  var DELETE = symbol("DELETE");
  /**
   * Pure version of deepObjectAssign, it doesn't modify any of it's arguments.
   *
   * @param base - The base object that fullfils the whole interface T.
   * @param updates - Updates that may change or delete props.
   * @returns A brand new instance with all the supplied objects deeply merged.
   */


  function pureDeepObjectAssign(base) {
    var _context;

    for (var _len = arguments.length, updates = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      updates[_key - 1] = arguments[_key];
    }

    return deepObjectAssign.apply(void 0, concat$1(_context = [{}, base]).call(_context, updates));
  }
  /**
   * Deep version of object assign with additional deleting by the DELETE symbol.
   *
   * @param values - Objects to be deeply merged.
   * @returns The first object from values.
   */


  function deepObjectAssign() {
    var merged = deepObjectAssignNonentry.apply(void 0, arguments);
    stripDelete(merged);
    return merged;
  }
  /**
   * Deep version of object assign with additional deleting by the DELETE symbol.
   *
   * @remarks
   * This doesn't strip the DELETE symbols so they may end up in the final object.
   * @param values - Objects to be deeply merged.
   * @returns The first object from values.
   */


  function deepObjectAssignNonentry() {
    for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      values[_key2] = arguments[_key2];
    }

    if (values.length < 2) {
      return values[0];
    } else if (values.length > 2) {
      var _context2;

      return deepObjectAssignNonentry.apply(void 0, concat$1(_context2 = [deepObjectAssign(values[0], values[1])]).call(_context2, _toConsumableArray(slice(values).call(values, 2))));
    }

    var a = values[0];
    var b = values[1];

    var _iterator = _createForOfIteratorHelper$3(ownKeys$1(b)),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var prop = _step.value;
        if (!Object.prototype.propertyIsEnumerable.call(b, prop)) ;else if (b[prop] === DELETE) {
          delete a[prop];
        } else if (a[prop] !== null && b[prop] !== null && _typeof(a[prop]) === "object" && _typeof(b[prop]) === "object" && !isArray$1(a[prop]) && !isArray$1(b[prop])) {
          a[prop] = deepObjectAssignNonentry(a[prop], b[prop]);
        } else {
          a[prop] = clone(b[prop]);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return a;
  }
  /**
   * Deep clone given object or array. In case of primitive simply return.
   *
   * @param a - Anything.
   * @returns Deep cloned object/array or unchanged a.
   */


  function clone(a) {
    if (isArray$1(a)) {
      return map$3(a).call(a, function (value) {
        return clone(value);
      });
    } else if (_typeof(a) === "object" && a !== null) {
      return deepObjectAssignNonentry({}, a);
    } else {
      return a;
    }
  }
  /**
   * Strip DELETE from given object.
   *
   * @param a - Object which may contain DELETE but won't after this is executed.
   */


  function stripDelete(a) {
    for (var _i = 0, _Object$keys = keys$4(a); _i < _Object$keys.length; _i++) {
      var prop = _Object$keys[_i];

      if (a[prop] === DELETE) {
        delete a[prop];
      } else if (_typeof(a[prop]) === "object" && a[prop] !== null) {
        stripDelete(a[prop]);
      }
    }
  }
  /**
   * Setup a mock hammer.js object, for unit testing.
   *
   * Inspiration: https://github.com/uber/deck.gl/pull/658
   *
   * @returns {{on: noop, off: noop, destroy: noop, emit: noop, get: get}}
   */


  function hammerMock() {
    var noop = function noop() {};

    return {
      on: noop,
      off: noop,
      destroy: noop,
      emit: noop,
      get: function get() {
        return {
          set: noop
        };
      }
    };
  }

  var Hammer$1 = typeof window !== "undefined" ? window.Hammer || RealHammer : function () {
    // hammer.js is only available in a browser, not in node.js. Replacing it with a mock object.
    return hammerMock();
  };
  /**
   * Turn an element into an clickToUse element.
   * When not active, the element has a transparent overlay. When the overlay is
   * clicked, the mode is changed to active.
   * When active, the element is displayed with a blue border around it, and
   * the interactive contents of the element can be used. When clicked outside
   * the element, the elements mode is changed to inactive.
   *
   * @param {Element} container
   * @class Activator
   */

  function Activator$1(container) {
    var _this = this,
        _context3;

    this._cleanupQueue = [];
    this.active = false;
    this._dom = {
      container: container,
      overlay: document.createElement("div")
    };

    this._dom.overlay.classList.add("vis-overlay");

    this._dom.container.appendChild(this._dom.overlay);

    this._cleanupQueue.push(function () {
      _this._dom.overlay.parentNode.removeChild(_this._dom.overlay);
    });

    var hammer = Hammer$1(this._dom.overlay);
    hammer.on("tap", bind$6(_context3 = this._onTapOverlay).call(_context3, this));

    this._cleanupQueue.push(function () {
      hammer.destroy(); // FIXME: cleaning up hammer instances doesn't work (Timeline not removed
      // from memory)
    }); // block all touch events (except tap)


    var events = ["tap", "doubletap", "press", "pinch", "pan", "panstart", "panmove", "panend"];

    forEach$1(events).call(events, function (event) {
      hammer.on(event, function (event) {
        event.srcEvent.stopPropagation();
      });
    }); // attach a click event to the window, in order to deactivate when clicking outside the timeline


    if (document && document.body) {
      this._onClick = function (event) {
        if (!_hasParent(event.target, container)) {
          _this.deactivate();
        }
      };

      document.body.addEventListener("click", this._onClick);

      this._cleanupQueue.push(function () {
        document.body.removeEventListener("click", _this._onClick);
      });
    } // prepare escape key listener for deactivating when active


    this._escListener = function (event) {
      if ("key" in event ? event.key === "Escape" : event.keyCode === 27
      /* the keyCode is for IE11 */
      ) {
        _this.deactivate();
      }
    };
  } // turn into an event emitter


  Emitter(Activator$1.prototype); // The currently active activator

  Activator$1.current = null;
  /**
   * Destroy the activator. Cleans up all created DOM and event listeners
   */

  Activator$1.prototype.destroy = function () {
    var _context4, _context5;

    this.deactivate();

    var _iterator2 = _createForOfIteratorHelper$3(reverse(_context4 = splice(_context5 = this._cleanupQueue).call(_context5, 0)).call(_context4)),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var callback = _step2.value;
        callback();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  };
  /**
   * Activate the element
   * Overlay is hidden, element is decorated with a blue shadow border
   */


  Activator$1.prototype.activate = function () {
    // we allow only one active activator at a time
    if (Activator$1.current) {
      Activator$1.current.deactivate();
    }

    Activator$1.current = this;
    this.active = true;
    this._dom.overlay.style.display = "none";

    this._dom.container.classList.add("vis-active");

    this.emit("change");
    this.emit("activate"); // ugly hack: bind ESC after emitting the events, as the Network rebinds all
    // keyboard events on a 'change' event

    document.body.addEventListener("keydown", this._escListener);
  };
  /**
   * Deactivate the element
   * Overlay is displayed on top of the element
   */


  Activator$1.prototype.deactivate = function () {
    this.active = false;
    this._dom.overlay.style.display = "block";

    this._dom.container.classList.remove("vis-active");

    document.body.removeEventListener("keydown", this._escListener);
    this.emit("change");
    this.emit("deactivate");
  };
  /**
   * Handle a tap event: activate the container
   *
   * @param {Event}  event   The event
   * @private
   */


  Activator$1.prototype._onTapOverlay = function (event) {
    // activate the container
    this.activate();
    event.srcEvent.stopPropagation();
  };
  /**
   * Test whether the element has the requested parent element somewhere in
   * its chain of parent nodes.
   *
   * @param {HTMLElement} element
   * @param {HTMLElement} parent
   * @returns {boolean} Returns true when the parent is found somewhere in the
   *                    chain of parent nodes.
   * @private
   */


  function _hasParent(element, parent) {
    while (element) {
      if (element === parent) {
        return true;
      }

      element = element.parentNode;
    }

    return false;
  } // utility functions

  var global$4 = global$M;
  var isConstructor = isConstructor$4;
  var tryToString$1 = tryToString$4;
  var TypeError$3 = global$4.TypeError; // `Assert: IsConstructor(argument) is true`

  var aConstructor$1 = function (argument) {
    if (isConstructor(argument)) return argument;
    throw TypeError$3(tryToString$1(argument) + ' is not a constructor');
  };

  var $$5 = _export;
  var getBuiltIn$1 = getBuiltIn$9;
  var apply = functionApply;
  var bind$2 = functionBind;
  var aConstructor = aConstructor$1;
  var anObject$1 = anObject$b;
  var isObject$3 = isObject$f;
  var create$4 = objectCreate;
  var fails$5 = fails$r;
  var nativeConstruct = getBuiltIn$1('Reflect', 'construct');
  var ObjectPrototype = Object.prototype;
  var push$1 = [].push; // `Reflect.construct` method
  // https://tc39.es/ecma262/#sec-reflect.construct
  // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it

  var NEW_TARGET_BUG = fails$5(function () {
    function F() {
      /* empty */
    }

    return !(nativeConstruct(function () {
      /* empty */
    }, [], F) instanceof F);
  });
  var ARGS_BUG = !fails$5(function () {
    nativeConstruct(function () {
      /* empty */
    });
  });
  var FORCED$1 = NEW_TARGET_BUG || ARGS_BUG;
  $$5({
    target: 'Reflect',
    stat: true,
    forced: FORCED$1,
    sham: FORCED$1
  }, {
    construct: function construct(Target, args
    /* , newTarget */
    ) {
      aConstructor(Target);
      anObject$1(args);
      var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);

      if (Target == newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0:
            return new Target();

          case 1:
            return new Target(args[0]);

          case 2:
            return new Target(args[0], args[1]);

          case 3:
            return new Target(args[0], args[1], args[2]);

          case 4:
            return new Target(args[0], args[1], args[2], args[3]);
        } // w/o altered newTarget, lot of arguments case


        var $args = [null];
        apply(push$1, $args, args);
        return new (apply(bind$2, Target, $args))();
      } // with altered newTarget, not support built-in constructors


      var proto = newTarget.prototype;
      var instance = create$4(isObject$3(proto) ? proto : ObjectPrototype);
      var result = apply(Target, instance, args);
      return isObject$3(result) ? result : instance;
    }
  });

  var path$3 = path$q;
  var construct$2 = path$3.Reflect.construct;

  var parent$h = construct$2;
  var construct$1 = parent$h;

  var construct = construct$1;

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var parent$g = create$6;
  var create$3 = parent$g;

  var parent$f = create$3;
  var create$2 = parent$f;

  var create$1 = create$2;

  var $$4 = _export;
  var setPrototypeOf$5 = objectSetPrototypeOf; // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof

  $$4({
    target: 'Object',
    stat: true
  }, {
    setPrototypeOf: setPrototypeOf$5
  });

  var path$2 = path$q;
  var setPrototypeOf$4 = path$2.Object.setPrototypeOf;

  var parent$e = setPrototypeOf$4;
  var setPrototypeOf$3 = parent$e;

  var parent$d = setPrototypeOf$3;
  var setPrototypeOf$2 = parent$d;

  var parent$c = setPrototypeOf$2;
  var setPrototypeOf$1 = parent$c;

  var setPrototypeOf = setPrototypeOf$1;

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = create$1(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });

    defineProperty$7(subClass, "prototype", {
      writable: false
    });

    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  var parent$b = getPrototypeOf$3;
  var getPrototypeOf$2 = parent$b;

  var parent$a = getPrototypeOf$2;
  var getPrototypeOf$1 = parent$a;

  var getPrototypeOf = getPrototypeOf$1;

  function _getPrototypeOf(o) {
    _getPrototypeOf = setPrototypeOf ? getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  var runtime = {exports: {}};

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (module) {
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
      define(IteratorPrototype, iteratorSymbol, function () {
        return this;
      });
      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = GeneratorFunctionPrototype;
      define(Gp, "constructor", GeneratorFunctionPrototype);
      define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
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
      define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
        return this;
      });
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

      define(Gp, iteratorSymbol, function () {
        return this;
      });
      define(Gp, "toString", function () {
        return "[object Generator]";
      });

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
  })(runtime);

  var regenerator = runtime.exports;

  var internalMetadata = {exports: {}};

  var fails$4 = fails$r;
  var arrayBufferNonExtensible = fails$4(function () {
    if (typeof ArrayBuffer == 'function') {
      var buffer = new ArrayBuffer(8); // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe

      if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', {
        value: 8
      });
    }
  });

  var fails$3 = fails$r;
  var isObject$2 = isObject$f;
  var classof$3 = classofRaw$1;
  var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible; // eslint-disable-next-line es/no-object-isextensible -- safe

  var $isExtensible = Object.isExtensible;
  var FAILS_ON_PRIMITIVES = fails$3(function () {
    $isExtensible(1);
  }); // `Object.isExtensible` method
  // https://tc39.es/ecma262/#sec-object.isextensible

  var objectIsExtensible = FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE ? function isExtensible(it) {
    if (!isObject$2(it)) return false;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof$3(it) == 'ArrayBuffer') return false;
    return $isExtensible ? $isExtensible(it) : true;
  } : $isExtensible;

  var fails$2 = fails$r;
  var freezing = !fails$2(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var $$3 = _export;
  var uncurryThis$1 = functionUncurryThis;
  var hiddenKeys = hiddenKeys$6;
  var isObject$1 = isObject$f;
  var hasOwn$3 = hasOwnProperty_1;
  var defineProperty$2 = objectDefineProperty.f;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
  var isExtensible = objectIsExtensible;
  var uid = uid$4;
  var FREEZING = freezing;
  var REQUIRED = false;
  var METADATA = uid('meta');
  var id = 0;

  var setMetadata = function (it) {
    defineProperty$2(it, METADATA, {
      value: {
        objectID: 'O' + id++,
        // object ID
        weakData: {} // weak collections IDs

      }
    });
  };

  var fastKey$1 = function (it, create) {
    // return a primitive with prefix
    if (!isObject$1(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

    if (!hasOwn$3(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

      if (!create) return 'E'; // add missing metadata

      setMetadata(it); // return object ID
    }

    return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!hasOwn$3(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true; // not necessary to add metadata

      if (!create) return false; // add missing metadata

      setMetadata(it); // return the store of weak collections IDs
    }

    return it[METADATA].weakData;
  }; // add metadata on freeze-family methods calling


  var onFreeze = function (it) {
    if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn$3(it, METADATA)) setMetadata(it);
    return it;
  };

  var enable = function () {
    meta.enable = function () {
      /* empty */
    };

    REQUIRED = true;
    var getOwnPropertyNames = getOwnPropertyNamesModule.f;
    var splice = uncurryThis$1([].splice);
    var test = {};
    test[METADATA] = 1; // prevent exposing of metadata key

    if (getOwnPropertyNames(test).length) {
      getOwnPropertyNamesModule.f = function (it) {
        var result = getOwnPropertyNames(it);

        for (var i = 0, length = result.length; i < length; i++) {
          if (result[i] === METADATA) {
            splice(result, i, 1);
            break;
          }
        }

        return result;
      };

      $$3({
        target: 'Object',
        stat: true,
        forced: true
      }, {
        getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
      });
    }
  };

  var meta = internalMetadata.exports = {
    enable: enable,
    fastKey: fastKey$1,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };
  hiddenKeys[METADATA] = true;

  var global$3 = global$M;
  var bind$1 = functionBindContext;
  var call = functionCall;
  var anObject = anObject$b;
  var tryToString = tryToString$4;
  var isArrayIteratorMethod = isArrayIteratorMethod$2;
  var lengthOfArrayLike$1 = lengthOfArrayLike$d;
  var isPrototypeOf$6 = objectIsPrototypeOf;
  var getIterator$5 = getIterator$7;
  var getIteratorMethod = getIteratorMethod$8;
  var iteratorClose = iteratorClose$2;
  var TypeError$2 = global$3.TypeError;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  var iterate$2 = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$1(unboundFunction, that);
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
      if (!iterFn) throw TypeError$2(tryToString(iterable) + ' is not iterable'); // optimisation for array iterators

      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = lengthOfArrayLike$1(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf$6(ResultPrototype, result)) return result;
        }

        return new Result(false);
      }

      iterator = getIterator$5(iterable, iterFn);
    }

    next = iterator.next;

    while (!(step = call(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator, 'throw', error);
      }

      if (typeof result == 'object' && result && isPrototypeOf$6(ResultPrototype, result)) return result;
    }

    return new Result(false);
  };

  var global$2 = global$M;
  var isPrototypeOf$5 = objectIsPrototypeOf;
  var TypeError$1 = global$2.TypeError;

  var anInstance$2 = function (it, Prototype) {
    if (isPrototypeOf$5(Prototype, it)) return it;
    throw TypeError$1('Incorrect invocation');
  };

  var $$2 = _export;
  var global$1 = global$M;
  var InternalMetadataModule = internalMetadata.exports;
  var fails$1 = fails$r;
  var createNonEnumerableProperty = createNonEnumerableProperty$6;
  var iterate$1 = iterate$2;
  var anInstance$1 = anInstance$2;
  var isCallable = isCallable$h;
  var isObject = isObject$f;
  var setToStringTag = setToStringTag$5;
  var defineProperty$1 = objectDefineProperty.f;
  var forEach = arrayIteration.forEach;
  var DESCRIPTORS$2 = descriptors;
  var InternalStateModule$1 = internalState;
  var setInternalState$1 = InternalStateModule$1.set;
  var internalStateGetterFor$1 = InternalStateModule$1.getterFor;

  var collection$2 = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$1[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var exported = {};
    var Constructor;

    if (!DESCRIPTORS$2 || !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$1(function () {
      new NativeConstructor().entries().next();
    }))) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      InternalMetadataModule.enable();
    } else {
      Constructor = wrapper(function (target, iterable) {
        setInternalState$1(anInstance$1(target, Prototype), {
          type: CONSTRUCTOR_NAME,
          collection: new NativeConstructor()
        });
        if (iterable != undefined) iterate$1(iterable, target[ADDER], {
          that: target,
          AS_ENTRIES: IS_MAP
        });
      });
      var Prototype = Constructor.prototype;
      var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
      forEach(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
        var IS_ADDER = KEY == 'add' || KEY == 'set';

        if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
          createNonEnumerableProperty(Prototype, KEY, function (a, b) {
            var collection = getInternalState(this).collection;
            if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
            var result = collection[KEY](a === 0 ? 0 : a, b);
            return IS_ADDER ? this : result;
          });
        }
      });
      IS_WEAK || defineProperty$1(Prototype, 'size', {
        configurable: true,
        get: function () {
          return getInternalState(this).collection.size;
        }
      });
    }

    setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);
    exported[CONSTRUCTOR_NAME] = Constructor;
    $$2({
      global: true,
      forced: true
    }, exported);
    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
    return Constructor;
  };

  var redefine = redefine$4;

  var redefineAll$1 = function (target, src, options) {
    for (var key in src) {
      if (options && options.unsafe && target[key]) target[key] = src[key];else redefine(target, key, src[key], options);
    }

    return target;
  };

  var getBuiltIn = getBuiltIn$9;
  var definePropertyModule = objectDefineProperty;
  var wellKnownSymbol = wellKnownSymbol$j;
  var DESCRIPTORS$1 = descriptors;
  var SPECIES = wellKnownSymbol('species');

  var setSpecies$1 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule.f;

    if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES]) {
      defineProperty(Constructor, SPECIES, {
        configurable: true,
        get: function () {
          return this;
        }
      });
    }
  };

  var defineProperty = objectDefineProperty.f;
  var create = objectCreate;
  var redefineAll = redefineAll$1;
  var bind = functionBindContext;
  var anInstance = anInstance$2;
  var iterate = iterate$2;
  var defineIterator = defineIterator$3;
  var setSpecies = setSpecies$1;
  var DESCRIPTORS = descriptors;
  var fastKey = internalMetadata.exports.fastKey;
  var InternalStateModule = internalState;
  var setInternalState = InternalStateModule.set;
  var internalStateGetterFor = InternalStateModule.getterFor;
  var collectionStrong$2 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var Constructor = wrapper(function (that, iterable) {
        anInstance(that, Prototype);
        setInternalState(that, {
          type: CONSTRUCTOR_NAME,
          index: create(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!DESCRIPTORS) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], {
          that: that,
          AS_ENTRIES: IS_MAP
        });
      });
      var Prototype = Constructor.prototype;
      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index; // change existing entry

        if (entry) {
          entry.value = value; // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS) state.size++;else that.size++; // add to index

          if (index !== 'F') state.index[index] = entry;
        }

        return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that); // fast case

        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index]; // frozen object case

        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll(Prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;

          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }

          state.first = state.last = undefined;
          if (DESCRIPTORS) state.size = 0;else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);

          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (DESCRIPTORS) state.size--;else that.size--;
          }

          return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn
        /* , that = undefined */
        ) {
          var state = getInternalState(this);
          var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
          var entry;

          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this); // revert to the last existing entry

            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });
      redefineAll(Prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (DESCRIPTORS) defineProperty(Prototype, 'size', {
        get: function () {
          return getInternalState(this).size;
        }
      });
      return Constructor;
    },
    setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME); // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator

      defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last; // revert to the last existing entry

        while (entry && entry.removed) entry = entry.previous; // get next entry


        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return {
            value: undefined,
            done: true
          };
        } // return step by kind


        if (kind == 'keys') return {
          value: entry.key,
          done: false
        };
        if (kind == 'values') return {
          value: entry.value,
          done: false
        };
        return {
          value: [entry.key, entry.value],
          done: false
        };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species

      setSpecies(CONSTRUCTOR_NAME);
    }
  };

  var collection$1 = collection$2;
  var collectionStrong$1 = collectionStrong$2; // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects

  collection$1('Map', function (init) {
    return function Map() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  }, collectionStrong$1);

  var path$1 = path$q;
  var map$2 = path$1.Map;

  var parent$9 = map$2;
  var map$1 = parent$9;

  var map = map$1;

  var $$1 = _export;
  var $some = arrayIteration.some;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$5;
  var STRICT_METHOD$1 = arrayMethodIsStrict$1('some'); // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some

  $$1({
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD$1
  }, {
    some: function some(callbackfn
    /* , thisArg */
    ) {
      return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var entryVirtual$4 = entryVirtual$k;
  var some$3 = entryVirtual$4('Array').some;

  var isPrototypeOf$4 = objectIsPrototypeOf;
  var method$4 = some$3;
  var ArrayPrototype$4 = Array.prototype;

  var some$2 = function (it) {
    var own = it.some;
    return it === ArrayPrototype$4 || isPrototypeOf$4(ArrayPrototype$4, it) && own === ArrayPrototype$4.some ? method$4 : own;
  };

  var parent$8 = some$2;
  var some$1 = parent$8;

  var some = some$1;

  var entryVirtual$3 = entryVirtual$k;
  var keys$3 = entryVirtual$3('Array').keys;

  var parent$7 = keys$3;
  var keys$2 = parent$7;

  var classof$2 = classof$c;
  var hasOwn$2 = hasOwnProperty_1;
  var isPrototypeOf$3 = objectIsPrototypeOf;
  var method$3 = keys$2;
  var ArrayPrototype$3 = Array.prototype;
  var DOMIterables$2 = {
    DOMTokenList: true,
    NodeList: true
  };

  var keys$1 = function (it) {
    var own = it.keys;
    return it === ArrayPrototype$3 || isPrototypeOf$3(ArrayPrototype$3, it) && own === ArrayPrototype$3.keys || hasOwn$2(DOMIterables$2, classof$2(it)) ? method$3 : own;
  };

  var keys = keys$1;

  var arraySlice = arraySliceSimple;
  var floor = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(array, mergeSort(arraySlice(array, 0, middle), comparefn), mergeSort(arraySlice(array, middle), comparefn), comparefn);
  };

  var insertionSort = function (array, comparefn) {
    var length = array.length;
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];

      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }

      if (j !== i++) array[j] = element;
    }

    return array;
  };

  var merge = function (array, left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = lindex < llength && rindex < rlength ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++] : lindex < llength ? left[lindex++] : right[rindex++];
    }

    return array;
  };

  var arraySort = mergeSort;

  var userAgent$1 = engineUserAgent;
  var firefox = userAgent$1.match(/firefox\/(\d+)/i);
  var engineFfVersion = !!firefox && +firefox[1];

  var UA = engineUserAgent;
  var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

  var userAgent = engineUserAgent;
  var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);
  var engineWebkitVersion = !!webkit && +webkit[1];

  var $ = _export;
  var uncurryThis = functionUncurryThis;
  var aCallable = aCallable$7;
  var toObject = toObject$e;
  var lengthOfArrayLike = lengthOfArrayLike$d;
  var toString = toString$7;
  var fails = fails$r;
  var internalSort = arraySort;
  var arrayMethodIsStrict = arrayMethodIsStrict$5;
  var FF = engineFfVersion;
  var IE_OR_EDGE = engineIsIeOrEdge;
  var V8 = engineV8Version;
  var WEBKIT = engineWebkitVersion;
  var test = [];
  var un$Sort = uncurryThis(test.sort);
  var push = uncurryThis(test.push); // IE8-

  var FAILS_ON_UNDEFINED = fails(function () {
    test.sort(undefined);
  }); // V8 bug

  var FAILS_ON_NULL = fails(function () {
    test.sort(null);
  }); // Old WebKit

  var STRICT_METHOD = arrayMethodIsStrict('sort');
  var STABLE_SORT = !fails(function () {
    // feature detection can be too slow, so check engines versions
    if (V8) return V8 < 70;
    if (FF && FF > 3) return;
    if (IE_OR_EDGE) return true;
    if (WEBKIT) return WEBKIT < 603;
    var result = '';
    var code, chr, value, index; // generate an array with more 512 elements (Chakra and old V8 fails only in this case)

    for (code = 65; code < 76; code++) {
      chr = String.fromCharCode(code);

      switch (code) {
        case 66:
        case 69:
        case 70:
        case 72:
          value = 3;
          break;

        case 68:
        case 71:
          value = 4;
          break;

        default:
          value = 2;
      }

      for (index = 0; index < 47; index++) {
        test.push({
          k: chr + index,
          v: value
        });
      }
    }

    test.sort(function (a, b) {
      return b.v - a.v;
    });

    for (index = 0; index < test.length; index++) {
      chr = test[index].k.charAt(0);
      if (result.charAt(result.length - 1) !== chr) result += chr;
    }

    return result !== 'DGBEFHACIJK';
  });
  var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (y === undefined) return -1;
      if (x === undefined) return 1;
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      return toString(x) > toString(y) ? 1 : -1;
    };
  }; // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort


  $({
    target: 'Array',
    proto: true,
    forced: FORCED
  }, {
    sort: function sort(comparefn) {
      if (comparefn !== undefined) aCallable(comparefn);
      var array = toObject(this);
      if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);
      var items = [];
      var arrayLength = lengthOfArrayLike(array);
      var itemsLength, index;

      for (index = 0; index < arrayLength; index++) {
        if (index in array) push(items, array[index]);
      }

      internalSort(items, getSortCompare(comparefn));
      itemsLength = items.length;
      index = 0;

      while (index < itemsLength) array[index] = items[index++];

      while (index < arrayLength) delete array[index++];

      return array;
    }
  });

  var entryVirtual$2 = entryVirtual$k;
  var sort$3 = entryVirtual$2('Array').sort;

  var isPrototypeOf$2 = objectIsPrototypeOf;
  var method$2 = sort$3;
  var ArrayPrototype$2 = Array.prototype;

  var sort$2 = function (it) {
    var own = it.sort;
    return it === ArrayPrototype$2 || isPrototypeOf$2(ArrayPrototype$2, it) && own === ArrayPrototype$2.sort ? method$2 : own;
  };

  var parent$6 = sort$2;
  var sort$1 = parent$6;

  var sort = sort$1;

  var entryVirtual$1 = entryVirtual$k;
  var values$3 = entryVirtual$1('Array').values;

  var parent$5 = values$3;
  var values$2 = parent$5;

  var classof$1 = classof$c;
  var hasOwn$1 = hasOwnProperty_1;
  var isPrototypeOf$1 = objectIsPrototypeOf;
  var method$1 = values$2;
  var ArrayPrototype$1 = Array.prototype;
  var DOMIterables$1 = {
    DOMTokenList: true,
    NodeList: true
  };

  var values$1 = function (it) {
    var own = it.values;
    return it === ArrayPrototype$1 || isPrototypeOf$1(ArrayPrototype$1, it) && own === ArrayPrototype$1.values || hasOwn$1(DOMIterables$1, classof$1(it)) ? method$1 : own;
  };

  var values = values$1;

  var iterator = iterator$4;

  var entryVirtual = entryVirtual$k;
  var entries$3 = entryVirtual('Array').entries;

  var parent$4 = entries$3;
  var entries$2 = parent$4;

  var classof = classof$c;
  var hasOwn = hasOwnProperty_1;
  var isPrototypeOf = objectIsPrototypeOf;
  var method = entries$2;
  var ArrayPrototype = Array.prototype;
  var DOMIterables = {
    DOMTokenList: true,
    NodeList: true
  };

  var entries$1 = function (it) {
    var own = it.entries;
    return it === ArrayPrototype || isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.entries || hasOwn(DOMIterables, classof(it)) ? method : own;
  };

  var entries = entries$1;

  // Unique ID creation requires a high quality random # generator. In the browser we therefore
  // require the crypto API and do not support built-in fallback to lower quality random number
  // generators (like Math.random()).
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
      // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
      // find the complete implementation of crypto (msCrypto) on IE11.
      getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

      if (!getRandomValues) {
        throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
      }
    }

    return getRandomValues(rnds8);
  }

  var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

  function validate(uuid) {
    return typeof uuid === 'string' && REGEX.test(uuid);
  }

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */

  var byteToHex = [];

  for (var i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).substr(1));
  }

  function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields

    if (!validate(uuid)) {
      throw TypeError('Stringified UUID is invalid');
    }

    return uuid;
  }

  function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }

      return buf;
    }

    return stringify(rnds);
  }

  /**
   * Determine whether a value can be used as an id.
   *
   * @param value - Input value of unknown type.
   * @returns True if the value is valid id, false otherwise.
   */
  function isId(value) {
    return typeof value === "string" || typeof value === "number";
  }

  /**
   * A queue.
   *
   * @typeParam T - The type of method names to be replaced by queued versions.
   */
  var Queue = /*#__PURE__*/function () {
    /** Delay in milliseconds. If defined the queue will be periodically flushed. */

    /** Maximum number of entries in the queue before it will be flushed. */

    /**
     * Construct a new Queue.
     *
     * @param options - Queue configuration.
     */
    function Queue(options) {
      _classCallCheck(this, Queue);

      _defineProperty(this, "delay", void 0);

      _defineProperty(this, "max", void 0);

      _defineProperty(this, "_queue", []);

      _defineProperty(this, "_timeout", null);

      _defineProperty(this, "_extended", null);

      // options
      this.delay = null;
      this.max = Infinity;
      this.setOptions(options);
    }
    /**
     * Update the configuration of the queue.
     *
     * @param options - Queue configuration.
     */


    _createClass(Queue, [{
      key: "setOptions",
      value: function setOptions(options) {
        if (options && typeof options.delay !== "undefined") {
          this.delay = options.delay;
        }

        if (options && typeof options.max !== "undefined") {
          this.max = options.max;
        }

        this._flushIfNeeded();
      }
      /**
       * Extend an object with queuing functionality.
       * The object will be extended with a function flush, and the methods provided in options.replace will be replaced with queued ones.
       *
       * @param object - The object to be extended.
       * @param options - Additional options.
       * @returns The created queue.
       */

    }, {
      key: "destroy",
      value:
      /**
       * Destroy the queue. The queue will first flush all queued actions, and in case it has extended an object, will restore the original object.
       */
      function destroy() {
        this.flush();

        if (this._extended) {
          var object = this._extended.object;
          var methods = this._extended.methods;

          for (var i = 0; i < methods.length; i++) {
            var method = methods[i];

            if (method.original) {
              // @TODO: better solution?
              object[method.name] = method.original;
            } else {
              // @TODO: better solution?
              delete object[method.name];
            }
          }

          this._extended = null;
        }
      }
      /**
       * Replace a method on an object with a queued version.
       *
       * @param object - Object having the method.
       * @param method - The method name.
       */

    }, {
      key: "replace",
      value: function replace(object, method) {
        /* eslint-disable-next-line @typescript-eslint/no-this-alias -- Function this is necessary in the function bellow, so class this has to be saved into a variable here. */
        var me = this;
        var original = object[method];

        if (!original) {
          throw new Error("Method " + method + " undefined");
        }

        object[method] = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          // add this call to the queue
          me.queue({
            args: args,
            fn: original,
            context: this
          });
        };
      }
      /**
       * Queue a call.
       *
       * @param entry - The function or entry to be queued.
       */

    }, {
      key: "queue",
      value: function queue(entry) {
        if (typeof entry === "function") {
          this._queue.push({
            fn: entry
          });
        } else {
          this._queue.push(entry);
        }

        this._flushIfNeeded();
      }
      /**
       * Check whether the queue needs to be flushed.
       */

    }, {
      key: "_flushIfNeeded",
      value: function _flushIfNeeded() {
        var _this = this;

        // flush when the maximum is exceeded.
        if (this._queue.length > this.max) {
          this.flush();
        } // flush after a period of inactivity when a delay is configured


        if (this._timeout != null) {
          clearTimeout(this._timeout);
          this._timeout = null;
        }

        if (this.queue.length > 0 && typeof this.delay === "number") {
          this._timeout = setTimeout$1(function () {
            _this.flush();
          }, this.delay);
        }
      }
      /**
       * Flush all queued calls
       */

    }, {
      key: "flush",
      value: function flush() {
        var _context, _context2;

        forEach$1(_context = splice(_context2 = this._queue).call(_context2, 0)).call(_context, function (entry) {
          entry.fn.apply(entry.context || entry.fn, entry.args || []);
        });
      }
    }], [{
      key: "extend",
      value: function extend(object, options) {
        var queue = new Queue(options);

        if (object.flush !== undefined) {
          throw new Error("Target object already has a property flush");
        }

        object.flush = function () {
          queue.flush();
        };

        var methods = [{
          name: "flush",
          original: undefined
        }];

        if (options && options.replace) {
          for (var i = 0; i < options.replace.length; i++) {
            var name = options.replace[i];
            methods.push({
              name: name,
              // @TODO: better solution?
              original: object[name]
            }); // @TODO: better solution?

            queue.replace(object, name);
          }
        }

        queue._extended = {
          object: object,
          methods: methods
        };
        return queue;
      }
    }]);

    return Queue;
  }();

  /**
   * [[DataSet]] code that can be reused in [[DataView]] or other similar implementations of [[DataInterface]].
   *
   * @typeParam Item - Item type that may or may not have an id.
   * @typeParam IdProp - Name of the property that contains the id.
   */
  var DataSetPart = /*#__PURE__*/function () {
    function DataSetPart() {
      _classCallCheck(this, DataSetPart);

      _defineProperty(this, "_subscribers", {
        "*": [],
        add: [],
        remove: [],
        update: []
      });

      _defineProperty(this, "subscribe", DataSetPart.prototype.on);

      _defineProperty(this, "unsubscribe", DataSetPart.prototype.off);
    }

    _createClass(DataSetPart, [{
      key: "_trigger",
      value:
      /**
       * Trigger an event
       *
       * @param event - Event name.
       * @param payload - Event payload.
       * @param senderId - Id of the sender.
       */
      function _trigger(event, payload, senderId) {
        var _context, _context2;

        if (event === "*") {
          throw new Error("Cannot trigger event *");
        }

        forEach$1(_context = concat$1(_context2 = []).call(_context2, _toConsumableArray(this._subscribers[event]), _toConsumableArray(this._subscribers["*"]))).call(_context, function (subscriber) {
          subscriber(event, payload, senderId != null ? senderId : null);
        });
      }
      /**
       * Subscribe to an event, add an event listener.
       *
       * @remarks Non-function callbacks are ignored.
       * @param event - Event name.
       * @param callback - Callback method.
       */

    }, {
      key: "on",
      value: function on(event, callback) {
        if (typeof callback === "function") {
          this._subscribers[event].push(callback);
        } // @TODO: Maybe throw for invalid callbacks?

      }
      /**
       * Unsubscribe from an event, remove an event listener.
       *
       * @remarks If the same callback was subscribed more than once **all** occurences will be removed.
       * @param event - Event name.
       * @param callback - Callback method.
       */

    }, {
      key: "off",
      value: function off(event, callback) {
        var _context3;

        this._subscribers[event] = filter(_context3 = this._subscribers[event]).call(_context3, function (subscriber) {
          return subscriber !== callback;
        });
      }
      /**
       * @deprecated Use on instead (PS: DataView.subscribe === DataView.on).
       */

    }, {
      key: "testLeakSubscribers",
      get:
      /* develblock:start */
      function get() {
        return this._subscribers;
      }
    }]);

    return DataSetPart;
  }();

  var collection = collection$2;
  var collectionStrong = collectionStrong$2; // `Set` constructor
  // https://tc39.es/ecma262/#sec-set-objects

  collection('Set', function (init) {
    return function Set() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  }, collectionStrong);

  var path = path$q;
  var set$2 = path.Set;

  var parent$3 = set$2;
  var set$1 = parent$3;

  var set = set$1;

  var getIterator$4 = getIterator$7;
  var getIterator_1 = getIterator$4;

  var parent$2 = getIterator_1;
  var getIterator$3 = parent$2;

  var parent$1 = getIterator$3;
  var getIterator$2 = parent$1;

  var parent = getIterator$2;
  var getIterator$1 = parent;

  var getIterator = getIterator$1;

  var _Symbol$iterator;

  function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof symbol !== "undefined" && getIteratorMethod$1(o) || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$2(o, minLen) { var _context10; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = slice(_context10 = Object.prototype.toString.call(o)).call(_context10, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from$3(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

  function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  _Symbol$iterator = iterator;

  /**
   * Data stream
   *
   * @remarks
   * [[DataStream]] offers an always up to date stream of items from a [[DataSet]] or [[DataView]].
   * That means that the stream is evaluated at the time of iteration, conversion to another data type or when [[cache]] is called, not when the [[DataStream]] was created.
   * Multiple invocations of for example [[toItemArray]] may yield different results (if the data source like for example [[DataSet]] gets modified).
   * @typeParam Item - The item type this stream is going to work with.
   */
  var DataStream = /*#__PURE__*/function () {
    /**
     * Create a new data stream.
     *
     * @param pairs - The id, item pairs.
     */
    function DataStream(pairs) {
      _classCallCheck(this, DataStream);

      _defineProperty(this, "_pairs", void 0);

      this._pairs = pairs;
    }
    /**
     * Return an iterable of key, value pairs for every entry in the stream.
     */


    _createClass(DataStream, [{
      key: _Symbol$iterator,
      value:
      /*#__PURE__*/
      regenerator.mark(function value() {
        var _iterator, _step, _step$value, id, item;

        return regenerator.wrap(function value$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iterator = _createForOfIteratorHelper$2(this._pairs);
                _context.prev = 1;

                _iterator.s();

              case 3:
                if ((_step = _iterator.n()).done) {
                  _context.next = 9;
                  break;
                }

                _step$value = _slicedToArray(_step.value, 2), id = _step$value[0], item = _step$value[1];
                _context.next = 7;
                return [id, item];

              case 7:
                _context.next = 3;
                break;

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);

                _iterator.e(_context.t0);

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
      /**
       * Return an iterable of key, value pairs for every entry in the stream.
       */

    }, {
      key: "entries",
      value:
      /*#__PURE__*/
      regenerator.mark(function entries() {
        var _iterator2, _step2, _step2$value, id, item;

        return regenerator.wrap(function entries$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _iterator2 = _createForOfIteratorHelper$2(this._pairs);
                _context2.prev = 1;

                _iterator2.s();

              case 3:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 9;
                  break;
                }

                _step2$value = _slicedToArray(_step2.value, 2), id = _step2$value[0], item = _step2$value[1];
                _context2.next = 7;
                return [id, item];

              case 7:
                _context2.next = 3;
                break;

              case 9:
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](1);

                _iterator2.e(_context2.t0);

              case 14:
                _context2.prev = 14;

                _iterator2.f();

                return _context2.finish(14);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, entries, this, [[1, 11, 14, 17]]);
      })
      /**
       * Return an iterable of keys in the stream.
       */

    }, {
      key: "keys",
      value:
      /*#__PURE__*/
      regenerator.mark(function keys() {
        var _iterator3, _step3, _step3$value, id;

        return regenerator.wrap(function keys$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _iterator3 = _createForOfIteratorHelper$2(this._pairs);
                _context3.prev = 1;

                _iterator3.s();

              case 3:
                if ((_step3 = _iterator3.n()).done) {
                  _context3.next = 9;
                  break;
                }

                _step3$value = _slicedToArray(_step3.value, 1), id = _step3$value[0];
                _context3.next = 7;
                return id;

              case 7:
                _context3.next = 3;
                break;

              case 9:
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](1);

                _iterator3.e(_context3.t0);

              case 14:
                _context3.prev = 14;

                _iterator3.f();

                return _context3.finish(14);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, keys, this, [[1, 11, 14, 17]]);
      })
      /**
       * Return an iterable of values in the stream.
       */

    }, {
      key: "values",
      value:
      /*#__PURE__*/
      regenerator.mark(function values() {
        var _iterator4, _step4, _step4$value, item;

        return regenerator.wrap(function values$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _iterator4 = _createForOfIteratorHelper$2(this._pairs);
                _context4.prev = 1;

                _iterator4.s();

              case 3:
                if ((_step4 = _iterator4.n()).done) {
                  _context4.next = 9;
                  break;
                }

                _step4$value = _slicedToArray(_step4.value, 2), item = _step4$value[1];
                _context4.next = 7;
                return item;

              case 7:
                _context4.next = 3;
                break;

              case 9:
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](1);

                _iterator4.e(_context4.t0);

              case 14:
                _context4.prev = 14;

                _iterator4.f();

                return _context4.finish(14);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, values, this, [[1, 11, 14, 17]]);
      })
      /**
       * Return an array containing all the ids in this stream.
       *
       * @remarks
       * The array may contain duplicities.
       * @returns The array with all ids from this stream.
       */

    }, {
      key: "toIdArray",
      value: function toIdArray() {
        var _context5;

        return map$3(_context5 = _toConsumableArray(this._pairs)).call(_context5, function (pair) {
          return pair[0];
        });
      }
      /**
       * Return an array containing all the items in this stream.
       *
       * @remarks
       * The array may contain duplicities.
       * @returns The array with all items from this stream.
       */

    }, {
      key: "toItemArray",
      value: function toItemArray() {
        var _context6;

        return map$3(_context6 = _toConsumableArray(this._pairs)).call(_context6, function (pair) {
          return pair[1];
        });
      }
      /**
       * Return an array containing all the entries in this stream.
       *
       * @remarks
       * The array may contain duplicities.
       * @returns The array with all entries from this stream.
       */

    }, {
      key: "toEntryArray",
      value: function toEntryArray() {
        return _toConsumableArray(this._pairs);
      }
      /**
       * Return an object map containing all the items in this stream accessible by ids.
       *
       * @remarks
       * In case of duplicate ids (coerced to string so `7 == '7'`) the last encoutered appears in the returned object.
       * @returns The object map of all id → item pairs from this stream.
       */

    }, {
      key: "toObjectMap",
      value: function toObjectMap() {
        var map = create$5(null);

        var _iterator5 = _createForOfIteratorHelper$2(this._pairs),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _step5$value = _slicedToArray(_step5.value, 2),
                id = _step5$value[0],
                item = _step5$value[1];

            map[id] = item;
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        return map;
      }
      /**
       * Return a map containing all the items in this stream accessible by ids.
       *
       * @returns The map of all id → item pairs from this stream.
       */

    }, {
      key: "toMap",
      value: function toMap() {
        return new map(this._pairs);
      }
      /**
       * Return a set containing all the (unique) ids in this stream.
       *
       * @returns The set of all ids from this stream.
       */

    }, {
      key: "toIdSet",
      value: function toIdSet() {
        return new set(this.toIdArray());
      }
      /**
       * Return a set containing all the (unique) items in this stream.
       *
       * @returns The set of all items from this stream.
       */

    }, {
      key: "toItemSet",
      value: function toItemSet() {
        return new set(this.toItemArray());
      }
      /**
       * Cache the items from this stream.
       *
       * @remarks
       * This method allows for items to be fetched immediatelly and used (possibly multiple times) later.
       * It can also be used to optimize performance as [[DataStream]] would otherwise reevaluate everything upon each iteration.
       *
       * ## Example
       * ```javascript
       * const ds = new DataSet([…])
       *
       * const cachedStream = ds.stream()
       *   .filter(…)
       *   .sort(…)
       *   .map(…)
       *   .cached(…) // Data are fetched, processed and cached here.
       *
       * ds.clear()
       * chachedStream // Still has all the items.
       * ```
       * @returns A new [[DataStream]] with cached items (detached from the original [[DataSet]]).
       */

    }, {
      key: "cache",
      value: function cache() {
        return new DataStream(_toConsumableArray(this._pairs));
      }
      /**
       * Get the distinct values of given property.
       *
       * @param callback - The function that picks and possibly converts the property.
       * @typeParam T - The type of the distinct value.
       * @returns A set of all distinct properties.
       */

    }, {
      key: "distinct",
      value: function distinct(callback) {
        var set$1 = new set();

        var _iterator6 = _createForOfIteratorHelper$2(this._pairs),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _step6$value = _slicedToArray(_step6.value, 2),
                id = _step6$value[0],
                item = _step6$value[1];

            set$1.add(callback(item, id));
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        return set$1;
      }
      /**
       * Filter the items of the stream.
       *
       * @param callback - The function that decides whether an item will be included.
       * @returns A new data stream with the filtered items.
       */

    }, {
      key: "filter",
      value: function filter(callback) {
        var pairs = this._pairs;
        return new DataStream(_defineProperty({}, iterator, /*#__PURE__*/regenerator.mark(function _callee() {
          var _iterator7, _step7, _step7$value, id, item;

          return regenerator.wrap(function _callee$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _iterator7 = _createForOfIteratorHelper$2(pairs);
                  _context7.prev = 1;

                  _iterator7.s();

                case 3:
                  if ((_step7 = _iterator7.n()).done) {
                    _context7.next = 10;
                    break;
                  }

                  _step7$value = _slicedToArray(_step7.value, 2), id = _step7$value[0], item = _step7$value[1];

                  if (!callback(item, id)) {
                    _context7.next = 8;
                    break;
                  }

                  _context7.next = 8;
                  return [id, item];

                case 8:
                  _context7.next = 3;
                  break;

                case 10:
                  _context7.next = 15;
                  break;

                case 12:
                  _context7.prev = 12;
                  _context7.t0 = _context7["catch"](1);

                  _iterator7.e(_context7.t0);

                case 15:
                  _context7.prev = 15;

                  _iterator7.f();

                  return _context7.finish(15);

                case 18:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee, null, [[1, 12, 15, 18]]);
        })));
      }
      /**
       * Execute a callback for each item of the stream.
       *
       * @param callback - The function that will be invoked for each item.
       */

    }, {
      key: "forEach",
      value: function forEach(callback) {
        var _iterator8 = _createForOfIteratorHelper$2(this._pairs),
            _step8;

        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var _step8$value = _slicedToArray(_step8.value, 2),
                id = _step8$value[0],
                item = _step8$value[1];

            callback(item, id);
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      }
      /**
       * Map the items into a different type.
       *
       * @param callback - The function that does the conversion.
       * @typeParam Mapped - The type of the item after mapping.
       * @returns A new data stream with the mapped items.
       */

    }, {
      key: "map",
      value: function map(callback) {
        var pairs = this._pairs;
        return new DataStream(_defineProperty({}, iterator, /*#__PURE__*/regenerator.mark(function _callee2() {
          var _iterator9, _step9, _step9$value, id, item;

          return regenerator.wrap(function _callee2$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _iterator9 = _createForOfIteratorHelper$2(pairs);
                  _context8.prev = 1;

                  _iterator9.s();

                case 3:
                  if ((_step9 = _iterator9.n()).done) {
                    _context8.next = 9;
                    break;
                  }

                  _step9$value = _slicedToArray(_step9.value, 2), id = _step9$value[0], item = _step9$value[1];
                  _context8.next = 7;
                  return [id, callback(item, id)];

                case 7:
                  _context8.next = 3;
                  break;

                case 9:
                  _context8.next = 14;
                  break;

                case 11:
                  _context8.prev = 11;
                  _context8.t0 = _context8["catch"](1);

                  _iterator9.e(_context8.t0);

                case 14:
                  _context8.prev = 14;

                  _iterator9.f();

                  return _context8.finish(14);

                case 17:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee2, null, [[1, 11, 14, 17]]);
        })));
      }
      /**
       * Get the item with the maximum value of given property.
       *
       * @param callback - The function that picks and possibly converts the property.
       * @returns The item with the maximum if found otherwise null.
       */

    }, {
      key: "max",
      value: function max(callback) {
        var iter = getIterator(this._pairs);

        var curr = iter.next();

        if (curr.done) {
          return null;
        }

        var maxItem = curr.value[1];
        var maxValue = callback(curr.value[1], curr.value[0]);

        while (!(curr = iter.next()).done) {
          var _curr$value = _slicedToArray(curr.value, 2),
              id = _curr$value[0],
              item = _curr$value[1];

          var _value = callback(item, id);

          if (_value > maxValue) {
            maxValue = _value;
            maxItem = item;
          }
        }

        return maxItem;
      }
      /**
       * Get the item with the minimum value of given property.
       *
       * @param callback - The function that picks and possibly converts the property.
       * @returns The item with the minimum if found otherwise null.
       */

    }, {
      key: "min",
      value: function min(callback) {
        var iter = getIterator(this._pairs);

        var curr = iter.next();

        if (curr.done) {
          return null;
        }

        var minItem = curr.value[1];
        var minValue = callback(curr.value[1], curr.value[0]);

        while (!(curr = iter.next()).done) {
          var _curr$value2 = _slicedToArray(curr.value, 2),
              id = _curr$value2[0],
              item = _curr$value2[1];

          var _value2 = callback(item, id);

          if (_value2 < minValue) {
            minValue = _value2;
            minItem = item;
          }
        }

        return minItem;
      }
      /**
       * Reduce the items into a single value.
       *
       * @param callback - The function that does the reduction.
       * @param accumulator - The initial value of the accumulator.
       * @typeParam T - The type of the accumulated value.
       * @returns The reduced value.
       */

    }, {
      key: "reduce",
      value: function reduce(callback, accumulator) {
        var _iterator10 = _createForOfIteratorHelper$2(this._pairs),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var _step10$value = _slicedToArray(_step10.value, 2),
                id = _step10$value[0],
                item = _step10$value[1];

            accumulator = callback(accumulator, item, id);
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }

        return accumulator;
      }
      /**
       * Sort the items.
       *
       * @param callback - Item comparator.
       * @returns A new stream with sorted items.
       */

    }, {
      key: "sort",
      value: function sort$1(callback) {
        var _this = this;

        return new DataStream(_defineProperty({}, iterator, function () {
          var _context9;

          return getIterator(sort(_context9 = _toConsumableArray(_this._pairs)).call(_context9, function (_ref, _ref2) {
            var _ref3 = _slicedToArray(_ref, 2),
                idA = _ref3[0],
                itemA = _ref3[1];

            var _ref4 = _slicedToArray(_ref2, 2),
                idB = _ref4[0],
                itemB = _ref4[1];

            return callback(itemA, itemB, idA, idB);
          }));
        }));
      }
    }]);

    return DataStream;
  }();

  function ownKeys(object, enumerableOnly) { var keys = keys$4(object); if (getOwnPropertySymbols) { var symbols = getOwnPropertySymbols(object); enumerableOnly && (symbols = filter(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context10, _context11; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? forEach$1(_context10 = ownKeys(Object(source), !0)).call(_context10, function (key) { _defineProperty(target, key, source[key]); }) : getOwnPropertyDescriptors ? defineProperties(target, getOwnPropertyDescriptors(source)) : forEach$1(_context11 = ownKeys(Object(source))).call(_context11, function (key) { defineProperty$4(target, key, getOwnPropertyDescriptor(source, key)); }); } return target; }

  function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof symbol !== "undefined" && getIteratorMethod$1(o) || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$1(o, minLen) { var _context9; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = slice(_context9 = Object.prototype.toString.call(o)).call(_context9, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from$3(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  /**
   * Add an id to given item if it doesn't have one already.
   *
   * @remarks
   * The item will be modified.
   * @param item - The item that will have an id after a call to this function.
   * @param idProp - The key of the id property.
   * @typeParam Item - Item type that may or may not have an id.
   * @typeParam IdProp - Name of the property that contains the id.
   * @returns true
   */

  function ensureFullItem(item, idProp) {
    if (item[idProp] == null) {
      // generate an id
      item[idProp] = v4();
    }

    return item;
  }
  /**
   * # DataSet
   *
   * Vis.js comes with a flexible DataSet, which can be used to hold and
   * manipulate unstructured data and listen for changes in the data. The DataSet
   * is key/value based. Data items can be added, updated and removed from the
   * DataSet, and one can subscribe to changes in the DataSet. The data in the
   * DataSet can be filtered and ordered. Data can be normalized when appending it
   * to the DataSet as well.
   *
   * ## Example
   *
   * The following example shows how to use a DataSet.
   *
   * ```javascript
   * // create a DataSet
   * var options = {};
   * var data = new vis.DataSet(options);
   *
   * // add items
   * // note that the data items can contain different properties and data formats
   * data.add([
   *   {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
   *   {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
   *   {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
   *   {id: 4, text: 'item 4'}
   * ]);
   *
   * // subscribe to any change in the DataSet
   * data.on('*', function (event, properties, senderId) {
   *   console.log('event', event, properties);
   * });
   *
   * // update an existing item
   * data.update({id: 2, group: 1});
   *
   * // remove an item
   * data.remove(4);
   *
   * // get all ids
   * var ids = data.getIds();
   * console.log('ids', ids);
   *
   * // get a specific item
   * var item1 = data.get(1);
   * console.log('item1', item1);
   *
   * // retrieve a filtered subset of the data
   * var items = data.get({
   *   filter: function (item) {
   *     return item.group == 1;
   *   }
   * });
   * console.log('filtered items', items);
   * ```
   *
   * @typeParam Item - Item type that may or may not have an id.
   * @typeParam IdProp - Name of the property that contains the id.
   */


  var DataSet = /*#__PURE__*/function (_DataSetPart) {
    _inherits(DataSet, _DataSetPart);

    var _super = _createSuper$1(DataSet);

    /**
     * Construct a new DataSet.
     *
     * @param data - Initial data or options.
     * @param options - Options (type error if data is also options).
     */
    function DataSet(data, options) {
      var _this;

      _classCallCheck(this, DataSet);

      _this = _super.call(this); // correctly read optional arguments

      _defineProperty(_assertThisInitialized(_this), "flush", void 0);

      _defineProperty(_assertThisInitialized(_this), "length", void 0);

      _defineProperty(_assertThisInitialized(_this), "_options", void 0);

      _defineProperty(_assertThisInitialized(_this), "_data", void 0);

      _defineProperty(_assertThisInitialized(_this), "_idProp", void 0);

      _defineProperty(_assertThisInitialized(_this), "_queue", null);

      if (data && !isArray$1(data)) {
        options = data;
        data = [];
      }

      _this._options = options || {};
      _this._data = new map(); // map with data indexed by id

      _this.length = 0; // number of items in the DataSet

      _this._idProp = _this._options.fieldId || "id"; // name of the field containing id
      // add initial data when provided

      if (data && data.length) {
        _this.add(data);
      }

      _this.setOptions(options);

      return _this;
    }
    /**
     * Set new options.
     *
     * @param options - The new options.
     */


    _createClass(DataSet, [{
      key: "idProp",
      get:
      /** Flush all queued calls. */

      /** @inheritDoc */

      /** @inheritDoc */
      function get() {
        return this._idProp;
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        if (options && options.queue !== undefined) {
          if (options.queue === false) {
            // delete queue if loaded
            if (this._queue) {
              this._queue.destroy();

              this._queue = null;
            }
          } else {
            // create queue and update its options
            if (!this._queue) {
              this._queue = Queue.extend(this, {
                replace: ["add", "update", "remove"]
              });
            }

            if (options.queue && _typeof(options.queue) === "object") {
              this._queue.setOptions(options.queue);
            }
          }
        }
      }
      /**
       * Add a data item or an array with items.
       *
       * After the items are added to the DataSet, the DataSet will trigger an event `add`. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
       *
       * ## Example
       *
       * ```javascript
       * // create a DataSet
       * const data = new vis.DataSet()
       *
       * // add items
       * const ids = data.add([
       *   { id: 1, text: 'item 1' },
       *   { id: 2, text: 'item 2' },
       *   { text: 'item without an id' }
       * ])
       *
       * console.log(ids) // [1, 2, '<UUIDv4>']
       * ```
       *
       * @param data - Items to be added (ids will be generated if missing).
       * @param senderId - Sender id.
       * @returns addedIds - Array with the ids (generated if not present) of the added items.
       * @throws When an item with the same id as any of the added items already exists.
       */

    }, {
      key: "add",
      value: function add(data, senderId) {
        var _this2 = this;

        var addedIds = [];
        var id;

        if (isArray$1(data)) {
          // Array
          var idsToAdd = map$3(data).call(data, function (d) {
            return d[_this2._idProp];
          });

          if (some(idsToAdd).call(idsToAdd, function (id) {
            return _this2._data.has(id);
          })) {
            throw new Error("A duplicate id was found in the parameter array.");
          }

          for (var i = 0, len = data.length; i < len; i++) {
            id = this._addItem(data[i]);
            addedIds.push(id);
          }
        } else if (data && _typeof(data) === "object") {
          // Single item
          id = this._addItem(data);
          addedIds.push(id);
        } else {
          throw new Error("Unknown dataType");
        }

        if (addedIds.length) {
          this._trigger("add", {
            items: addedIds
          }, senderId);
        }

        return addedIds;
      }
      /**
       * Update existing items. When an item does not exist, it will be created.
       *
       * @remarks
       * The provided properties will be merged in the existing item. When an item does not exist, it will be created.
       *
       * After the items are updated, the DataSet will trigger an event `add` for the added items, and an event `update`. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
       *
       * ## Example
       *
       * ```javascript
       * // create a DataSet
       * const data = new vis.DataSet([
       *   { id: 1, text: 'item 1' },
       *   { id: 2, text: 'item 2' },
       *   { id: 3, text: 'item 3' }
       * ])
       *
       * // update items
       * const ids = data.update([
       *   { id: 2, text: 'item 2 (updated)' },
       *   { id: 4, text: 'item 4 (new)' }
       * ])
       *
       * console.log(ids) // [2, 4]
       * ```
       *
       * ## Warning for TypeScript users
       * This method may introduce partial items into the data set. Use add or updateOnly instead for better type safety.
       * @param data - Items to be updated (if the id is already present) or added (if the id is missing).
       * @param senderId - Sender id.
       * @returns updatedIds - The ids of the added (these may be newly generated if there was no id in the item from the data) or updated items.
       * @throws When the supplied data is neither an item nor an array of items.
       */

    }, {
      key: "update",
      value: function update(data, senderId) {
        var _this3 = this;

        var addedIds = [];
        var updatedIds = [];
        var oldData = [];
        var updatedData = [];
        var idProp = this._idProp;

        var addOrUpdate = function addOrUpdate(item) {
          var origId = item[idProp];

          if (origId != null && _this3._data.has(origId)) {
            var fullItem = item; // it has an id, therefore it is a fullitem

            var oldItem = assign$2({}, _this3._data.get(origId)); // update item


            var id = _this3._updateItem(fullItem);

            updatedIds.push(id);
            updatedData.push(fullItem);
            oldData.push(oldItem);
          } else {
            // add new item
            var _id = _this3._addItem(item);

            addedIds.push(_id);
          }
        };

        if (isArray$1(data)) {
          // Array
          for (var i = 0, len = data.length; i < len; i++) {
            if (data[i] && _typeof(data[i]) === "object") {
              addOrUpdate(data[i]);
            } else {
              console.warn("Ignoring input item, which is not an object at index " + i);
            }
          }
        } else if (data && _typeof(data) === "object") {
          // Single item
          addOrUpdate(data);
        } else {
          throw new Error("Unknown dataType");
        }

        if (addedIds.length) {
          this._trigger("add", {
            items: addedIds
          }, senderId);
        }

        if (updatedIds.length) {
          var props = {
            items: updatedIds,
            oldData: oldData,
            data: updatedData
          }; // TODO: remove deprecated property 'data' some day
          //Object.defineProperty(props, 'data', {
          //  'get': (function() {
          //    console.warn('Property data is deprecated. Use DataSet.get(ids) to retrieve the new data, use the oldData property on this object to get the old data');
          //    return updatedData;
          //  }).bind(this)
          //});

          this._trigger("update", props, senderId);
        }

        return concat$1(addedIds).call(addedIds, updatedIds);
      }
      /**
       * Update existing items. When an item does not exist, an error will be thrown.
       *
       * @remarks
       * The provided properties will be deeply merged into the existing item.
       * When an item does not exist (id not present in the data set or absent), an error will be thrown and nothing will be changed.
       *
       * After the items are updated, the DataSet will trigger an event `update`.
       * When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
       *
       * ## Example
       *
       * ```javascript
       * // create a DataSet
       * const data = new vis.DataSet([
       *   { id: 1, text: 'item 1' },
       *   { id: 2, text: 'item 2' },
       *   { id: 3, text: 'item 3' },
       * ])
       *
       * // update items
       * const ids = data.update([
       *   { id: 2, text: 'item 2 (updated)' }, // works
       *   // { id: 4, text: 'item 4 (new)' }, // would throw
       *   // { text: 'item 4 (new)' }, // would also throw
       * ])
       *
       * console.log(ids) // [2]
       * ```
       * @param data - Updates (the id and optionally other props) to the items in this data set.
       * @param senderId - Sender id.
       * @returns updatedIds - The ids of the updated items.
       * @throws When the supplied data is neither an item nor an array of items, when the ids are missing.
       */

    }, {
      key: "updateOnly",
      value: function updateOnly(data, senderId) {
        var _context,
            _this4 = this;

        if (!isArray$1(data)) {
          data = [data];
        }

        var updateEventData = map$3(_context = map$3(data).call(data, function (update) {
          var oldData = _this4._data.get(update[_this4._idProp]);

          if (oldData == null) {
            throw new Error("Updating non-existent items is not allowed.");
          }

          return {
            oldData: oldData,
            update: update
          };
        })).call(_context, function (_ref) {
          var oldData = _ref.oldData,
              update = _ref.update;
          var id = oldData[_this4._idProp];
          var updatedData = pureDeepObjectAssign(oldData, update);

          _this4._data.set(id, updatedData);

          return {
            id: id,
            oldData: oldData,
            updatedData: updatedData
          };
        });

        if (updateEventData.length) {
          var props = {
            items: map$3(updateEventData).call(updateEventData, function (value) {
              return value.id;
            }),
            oldData: map$3(updateEventData).call(updateEventData, function (value) {
              return value.oldData;
            }),
            data: map$3(updateEventData).call(updateEventData, function (value) {
              return value.updatedData;
            })
          }; // TODO: remove deprecated property 'data' some day
          //Object.defineProperty(props, 'data', {
          //  'get': (function() {
          //    console.warn('Property data is deprecated. Use DataSet.get(ids) to retrieve the new data, use the oldData property on this object to get the old data');
          //    return updatedData;
          //  }).bind(this)
          //});

          this._trigger("update", props, senderId);

          return props.items;
        } else {
          return [];
        }
      }
      /** @inheritDoc */

    }, {
      key: "get",
      value: function get(first, second) {
        // @TODO: Woudn't it be better to split this into multiple methods?
        // parse the arguments
        var id = undefined;
        var ids = undefined;
        var options = undefined;

        if (isId(first)) {
          // get(id [, options])
          id = first;
          options = second;
        } else if (isArray$1(first)) {
          // get(ids [, options])
          ids = first;
          options = second;
        } else {
          // get([, options])
          options = first;
        } // determine the return type


        var returnType = options && options.returnType === "Object" ? "Object" : "Array"; // @TODO: WTF is this? Or am I missing something?
        // var returnType
        // if (options && options.returnType) {
        //   var allowedValues = ['Array', 'Object']
        //   returnType =
        //     allowedValues.indexOf(options.returnType) == -1
        //       ? 'Array'
        //       : options.returnType
        // } else {
        //   returnType = 'Array'
        // }
        // build options

        var filter$1 = options && filter(options);

        var items = [];
        var item = undefined;
        var itemIds = undefined;
        var itemId = undefined; // convert items

        if (id != null) {
          // return a single item
          item = this._data.get(id);

          if (item && filter$1 && !filter$1(item)) {
            item = undefined;
          }
        } else if (ids != null) {
          // return a subset of items
          for (var i = 0, len = ids.length; i < len; i++) {
            item = this._data.get(ids[i]);

            if (item != null && (!filter$1 || filter$1(item))) {
              items.push(item);
            }
          }
        } else {
          var _context2;

          // return all items
          itemIds = _toConsumableArray(keys(_context2 = this._data).call(_context2));

          for (var _i = 0, _len = itemIds.length; _i < _len; _i++) {
            itemId = itemIds[_i];
            item = this._data.get(itemId);

            if (item != null && (!filter$1 || filter$1(item))) {
              items.push(item);
            }
          }
        } // order the results


        if (options && options.order && id == undefined) {
          this._sort(items, options.order);
        } // filter fields of the items


        if (options && options.fields) {
          var fields = options.fields;

          if (id != undefined && item != null) {
            item = this._filterFields(item, fields);
          } else {
            for (var _i2 = 0, _len2 = items.length; _i2 < _len2; _i2++) {
              items[_i2] = this._filterFields(items[_i2], fields);
            }
          }
        } // return the results


        if (returnType == "Object") {
          var result = {};

          for (var _i3 = 0, _len3 = items.length; _i3 < _len3; _i3++) {
            var resultant = items[_i3]; // @TODO: Shoudn't this be this._fieldId?
            // result[resultant.id] = resultant

            var _id2 = resultant[this._idProp];
            result[_id2] = resultant;
          }

          return result;
        } else {
          if (id != null) {
            var _item;

            // a single item
            return (_item = item) !== null && _item !== void 0 ? _item : null;
          } else {
            // just return our array
            return items;
          }
        }
      }
      /** @inheritDoc */

    }, {
      key: "getIds",
      value: function getIds(options) {
        var data = this._data;

        var filter$1 = options && filter(options);

        var order = options && options.order;

        var itemIds = _toConsumableArray(keys(data).call(data));

        var ids = [];

        if (filter$1) {
          // get filtered items
          if (order) {
            // create ordered list
            var items = [];

            for (var i = 0, len = itemIds.length; i < len; i++) {
              var id = itemIds[i];

              var item = this._data.get(id);

              if (item != null && filter$1(item)) {
                items.push(item);
              }
            }

            this._sort(items, order);

            for (var _i4 = 0, _len4 = items.length; _i4 < _len4; _i4++) {
              ids.push(items[_i4][this._idProp]);
            }
          } else {
            // create unordered list
            for (var _i5 = 0, _len5 = itemIds.length; _i5 < _len5; _i5++) {
              var _id3 = itemIds[_i5];

              var _item2 = this._data.get(_id3);

              if (_item2 != null && filter$1(_item2)) {
                ids.push(_item2[this._idProp]);
              }
            }
          }
        } else {
          // get all items
          if (order) {
            // create an ordered list
            var _items = [];

            for (var _i6 = 0, _len6 = itemIds.length; _i6 < _len6; _i6++) {
              var _id4 = itemIds[_i6];

              _items.push(data.get(_id4));
            }

            this._sort(_items, order);

            for (var _i7 = 0, _len7 = _items.length; _i7 < _len7; _i7++) {
              ids.push(_items[_i7][this._idProp]);
            }
          } else {
            // create unordered list
            for (var _i8 = 0, _len8 = itemIds.length; _i8 < _len8; _i8++) {
              var _id5 = itemIds[_i8];

              var _item3 = data.get(_id5);

              if (_item3 != null) {
                ids.push(_item3[this._idProp]);
              }
            }
          }
        }

        return ids;
      }
      /** @inheritDoc */

    }, {
      key: "getDataSet",
      value: function getDataSet() {
        return this;
      }
      /** @inheritDoc */

    }, {
      key: "forEach",
      value: function forEach(callback, options) {
        var filter$1 = options && filter(options);

        var data = this._data;

        var itemIds = _toConsumableArray(keys(data).call(data));

        if (options && options.order) {
          // execute forEach on ordered list
          var items = this.get(options);

          for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            var id = item[this._idProp];
            callback(item, id);
          }
        } else {
          // unordered
          for (var _i9 = 0, _len9 = itemIds.length; _i9 < _len9; _i9++) {
            var _id6 = itemIds[_i9];

            var _item4 = this._data.get(_id6);

            if (_item4 != null && (!filter$1 || filter$1(_item4))) {
              callback(_item4, _id6);
            }
          }
        }
      }
      /** @inheritDoc */

    }, {
      key: "map",
      value: function map(callback, options) {
        var filter$1 = options && filter(options);

        var mappedItems = [];
        var data = this._data;

        var itemIds = _toConsumableArray(keys(data).call(data)); // convert and filter items


        for (var i = 0, len = itemIds.length; i < len; i++) {
          var id = itemIds[i];

          var item = this._data.get(id);

          if (item != null && (!filter$1 || filter$1(item))) {
            mappedItems.push(callback(item, id));
          }
        } // order items


        if (options && options.order) {
          this._sort(mappedItems, options.order);
        }

        return mappedItems;
      }
      /**
       * Filter the fields of an item.
       *
       * @param item - The item whose fields should be filtered.
       * @param fields - The names of the fields that will be kept.
       * @typeParam K - Field name type.
       * @returns The item without any additional fields.
       */

    }, {
      key: "_filterFields",
      value: function _filterFields(item, fields) {
        var _context3;

        if (!item) {
          // item is null
          return item;
        }

        return reduce(_context3 = isArray$1(fields) ? // Use the supplied array
        fields : // Use the keys of the supplied object
        keys$4(fields)).call(_context3, function (filteredItem, field) {
          filteredItem[field] = item[field];
          return filteredItem;
        }, {});
      }
      /**
       * Sort the provided array with items.
       *
       * @param items - Items to be sorted in place.
       * @param order - A field name or custom sort function.
       * @typeParam T - The type of the items in the items array.
       */

    }, {
      key: "_sort",
      value: function _sort(items, order) {
        if (typeof order === "string") {
          // order by provided field name
          var name = order; // field name

          sort(items).call(items, function (a, b) {
            // @TODO: How to treat missing properties?
            var av = a[name];
            var bv = b[name];
            return av > bv ? 1 : av < bv ? -1 : 0;
          });
        } else if (typeof order === "function") {
          // order by sort function
          sort(items).call(items, order);
        } else {
          // TODO: extend order by an Object {field:string, direction:string}
          //       where direction can be 'asc' or 'desc'
          throw new TypeError("Order must be a function or a string");
        }
      }
      /**
       * Remove an item or multiple items by “reference” (only the id is used) or by id.
       *
       * The method ignores removal of non-existing items, and returns an array containing the ids of the items which are actually removed from the DataSet.
       *
       * After the items are removed, the DataSet will trigger an event `remove` for the removed items. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
       *
       * ## Example
       * ```javascript
       * // create a DataSet
       * const data = new vis.DataSet([
       *   { id: 1, text: 'item 1' },
       *   { id: 2, text: 'item 2' },
       *   { id: 3, text: 'item 3' }
       * ])
       *
       * // remove items
       * const ids = data.remove([2, { id: 3 }, 4])
       *
       * console.log(ids) // [2, 3]
       * ```
       *
       * @param id - One or more items or ids of items to be removed.
       * @param senderId - Sender id.
       * @returns The ids of the removed items.
       */

    }, {
      key: "remove",
      value: function remove(id, senderId) {
        var removedIds = [];
        var removedItems = []; // force everything to be an array for simplicity

        var ids = isArray$1(id) ? id : [id];

        for (var i = 0, len = ids.length; i < len; i++) {
          var item = this._remove(ids[i]);

          if (item) {
            var itemId = item[this._idProp];

            if (itemId != null) {
              removedIds.push(itemId);
              removedItems.push(item);
            }
          }
        }

        if (removedIds.length) {
          this._trigger("remove", {
            items: removedIds,
            oldData: removedItems
          }, senderId);
        }

        return removedIds;
      }
      /**
       * Remove an item by its id or reference.
       *
       * @param id - Id of an item or the item itself.
       * @returns The removed item if removed, null otherwise.
       */

    }, {
      key: "_remove",
      value: function _remove(id) {
        // @TODO: It origianlly returned the item although the docs say id.
        // The code expects the item, so probably an error in the docs.
        var ident; // confirm the id to use based on the args type

        if (isId(id)) {
          ident = id;
        } else if (id && _typeof(id) === "object") {
          ident = id[this._idProp]; // look for the identifier field using ._idProp
        } // do the removing if the item is found


        if (ident != null && this._data.has(ident)) {
          var item = this._data.get(ident) || null;

          this._data.delete(ident);

          --this.length;
          return item;
        }

        return null;
      }
      /**
       * Clear the entire data set.
       *
       * After the items are removed, the [[DataSet]] will trigger an event `remove` for all removed items. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
       *
       * @param senderId - Sender id.
       * @returns removedIds - The ids of all removed items.
       */

    }, {
      key: "clear",
      value: function clear(senderId) {
        var _context4;

        var ids = _toConsumableArray(keys(_context4 = this._data).call(_context4));

        var items = [];

        for (var i = 0, len = ids.length; i < len; i++) {
          items.push(this._data.get(ids[i]));
        }

        this._data.clear();

        this.length = 0;

        this._trigger("remove", {
          items: ids,
          oldData: items
        }, senderId);

        return ids;
      }
      /**
       * Find the item with maximum value of a specified field.
       *
       * @param field - Name of the property that should be searched for max value.
       * @returns Item containing max value, or null if no items.
       */

    }, {
      key: "max",
      value: function max(field) {
        var _context5;

        var max = null;
        var maxField = null;

        var _iterator = _createForOfIteratorHelper$1(values(_context5 = this._data).call(_context5)),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            var itemField = item[field];

            if (typeof itemField === "number" && (maxField == null || itemField > maxField)) {
              max = item;
              maxField = itemField;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return max || null;
      }
      /**
       * Find the item with minimum value of a specified field.
       *
       * @param field - Name of the property that should be searched for min value.
       * @returns Item containing min value, or null if no items.
       */

    }, {
      key: "min",
      value: function min(field) {
        var _context6;

        var min = null;
        var minField = null;

        var _iterator2 = _createForOfIteratorHelper$1(values(_context6 = this._data).call(_context6)),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var item = _step2.value;
            var itemField = item[field];

            if (typeof itemField === "number" && (minField == null || itemField < minField)) {
              min = item;
              minField = itemField;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return min || null;
      }
      /**
       * Find all distinct values of a specified field
       *
       * @param prop - The property name whose distinct values should be returned.
       * @returns Unordered array containing all distinct values. Items without specified property are ignored.
       */

    }, {
      key: "distinct",
      value: function distinct(prop) {
        var data = this._data;

        var itemIds = _toConsumableArray(keys(data).call(data));

        var values = [];
        var count = 0;

        for (var i = 0, len = itemIds.length; i < len; i++) {
          var id = itemIds[i];
          var item = data.get(id);
          var value = item[prop];
          var exists = false;

          for (var j = 0; j < count; j++) {
            if (values[j] == value) {
              exists = true;
              break;
            }
          }

          if (!exists && value !== undefined) {
            values[count] = value;
            count++;
          }
        }

        return values;
      }
      /**
       * Add a single item. Will fail when an item with the same id already exists.
       *
       * @param item - A new item to be added.
       * @returns Added item's id. An id is generated when it is not present in the item.
       */

    }, {
      key: "_addItem",
      value: function _addItem(item) {
        var fullItem = ensureFullItem(item, this._idProp);
        var id = fullItem[this._idProp]; // check whether this id is already taken

        if (this._data.has(id)) {
          // item already exists
          throw new Error("Cannot add item: item with id " + id + " already exists");
        }

        this._data.set(id, fullItem);

        ++this.length;
        return id;
      }
      /**
       * Update a single item: merge with existing item.
       * Will fail when the item has no id, or when there does not exist an item with the same id.
       *
       * @param update - The new item
       * @returns The id of the updated item.
       */

    }, {
      key: "_updateItem",
      value: function _updateItem(update) {
        var id = update[this._idProp];

        if (id == null) {
          throw new Error("Cannot update item: item has no id (item: " + stringify$1(update) + ")");
        }

        var item = this._data.get(id);

        if (!item) {
          // item doesn't exist
          throw new Error("Cannot update item: no item with id " + id + " found");
        }

        this._data.set(id, _objectSpread(_objectSpread({}, item), update));

        return id;
      }
      /** @inheritDoc */

    }, {
      key: "stream",
      value: function stream(ids) {
        if (ids) {
          var data = this._data;
          return new DataStream(_defineProperty({}, iterator, /*#__PURE__*/regenerator.mark(function _callee() {
            var _iterator3, _step3, id, item;

            return regenerator.wrap(function _callee$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _iterator3 = _createForOfIteratorHelper$1(ids);
                    _context7.prev = 1;

                    _iterator3.s();

                  case 3:
                    if ((_step3 = _iterator3.n()).done) {
                      _context7.next = 11;
                      break;
                    }

                    id = _step3.value;
                    item = data.get(id);

                    if (!(item != null)) {
                      _context7.next = 9;
                      break;
                    }

                    _context7.next = 9;
                    return [id, item];

                  case 9:
                    _context7.next = 3;
                    break;

                  case 11:
                    _context7.next = 16;
                    break;

                  case 13:
                    _context7.prev = 13;
                    _context7.t0 = _context7["catch"](1);

                    _iterator3.e(_context7.t0);

                  case 16:
                    _context7.prev = 16;

                    _iterator3.f();

                    return _context7.finish(16);

                  case 19:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee, null, [[1, 13, 16, 19]]);
          })));
        } else {
          var _context8;

          return new DataStream(_defineProperty({}, iterator, bind$6(_context8 = entries(this._data)).call(_context8, this._data)));
        }
      }
      /* develblock:start */

    }, {
      key: "testLeakData",
      get: function get() {
        return this._data;
      }
    }, {
      key: "testLeakIdProp",
      get: function get() {
        return this._idProp;
      }
    }, {
      key: "testLeakOptions",
      get: function get() {
        return this._options;
      }
    }, {
      key: "testLeakQueue",
      get: function get() {
        return this._queue;
      },
      set: function set(v) {
        this._queue = v;
      }
    }]);

    return DataSet;
  }(DataSetPart);

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof symbol !== "undefined" && getIteratorMethod$1(o) || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { var _context5; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = slice(_context5 = Object.prototype.toString.call(o)).call(_context5, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from$3(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  /**
   * DataView
   *
   * A DataView offers a filtered and/or formatted view on a DataSet. One can subscribe to changes in a DataView, and easily get filtered or formatted data without having to specify filters and field types all the time.
   *
   * ## Example
   * ```javascript
   * // create a DataSet
   * var data = new vis.DataSet();
   * data.add([
   *   {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
   *   {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
   *   {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
   *   {id: 4, text: 'item 4'}
   * ]);
   *
   * // create a DataView
   * // the view will only contain items having a property group with value 1,
   * // and will only output fields id, text, and date.
   * var view = new vis.DataView(data, {
   *   filter: function (item) {
   *     return (item.group == 1);
   *   },
   *   fields: ['id', 'text', 'date']
   * });
   *
   * // subscribe to any change in the DataView
   * view.on('*', function (event, properties, senderId) {
   *   console.log('event', event, properties);
   * });
   *
   * // update an item in the data set
   * data.update({id: 2, group: 1});
   *
   * // get all ids in the view
   * var ids = view.getIds();
   * console.log('ids', ids); // will output [1, 2]
   *
   * // get all items in the view
   * var items = view.get();
   * ```
   *
   * @typeParam Item - Item type that may or may not have an id.
   * @typeParam IdProp - Name of the property that contains the id.
   */

  var DataView = /*#__PURE__*/function (_DataSetPart) {
    _inherits(DataView, _DataSetPart);

    var _super = _createSuper(DataView);

    /**
     * Create a DataView.
     *
     * @param data - The instance containing data (directly or indirectly).
     * @param options - Options to configure this data view.
     */
    function DataView(data, options) {
      var _context;

      var _this;

      _classCallCheck(this, DataView);

      _this = _super.call(this);

      _defineProperty(_assertThisInitialized(_this), "length", 0);

      _defineProperty(_assertThisInitialized(_this), "_listener", void 0);

      _defineProperty(_assertThisInitialized(_this), "_data", void 0);

      _defineProperty(_assertThisInitialized(_this), "_ids", new set());

      _defineProperty(_assertThisInitialized(_this), "_options", void 0);

      _this._options = options || {};
      _this._listener = bind$6(_context = _this._onEvent).call(_context, _assertThisInitialized(_this));

      _this.setData(data);

      return _this;
    } // TODO: implement a function .config() to dynamically update things like configured filter
    // and trigger changes accordingly

    /**
     * Set a data source for the view.
     *
     * @param data - The instance containing data (directly or indirectly).
     * @remarks
     * Note that when the data view is bound to a data set it won't be garbage
     * collected unless the data set is too. Use `dataView.setData(null)` or
     * `dataView.dispose()` to enable garbage collection before you lose the last
     * reference.
     */


    _createClass(DataView, [{
      key: "idProp",
      get:
      /** @inheritDoc */

      /** @inheritDoc */
      function get() {
        return this.getDataSet().idProp;
      }
    }, {
      key: "setData",
      value: function setData(data) {
        if (this._data) {
          // unsubscribe from current dataset
          if (this._data.off) {
            this._data.off("*", this._listener);
          } // trigger a remove of all items in memory


          var ids = this._data.getIds({
            filter: filter(this._options)
          });

          var items = this._data.get(ids);

          this._ids.clear();

          this.length = 0;

          this._trigger("remove", {
            items: ids,
            oldData: items
          });
        }

        if (data != null) {
          this._data = data; // trigger an add of all added items

          var _ids = this._data.getIds({
            filter: filter(this._options)
          });

          for (var i = 0, len = _ids.length; i < len; i++) {
            var id = _ids[i];

            this._ids.add(id);
          }

          this.length = _ids.length;

          this._trigger("add", {
            items: _ids
          });
        } else {
          this._data = new DataSet();
        } // subscribe to new dataset


        if (this._data.on) {
          this._data.on("*", this._listener);
        }
      }
      /**
       * Refresh the DataView.
       * Useful when the DataView has a filter function containing a variable parameter.
       */

    }, {
      key: "refresh",
      value: function refresh() {
        var ids = this._data.getIds({
          filter: filter(this._options)
        });

        var oldIds = _toConsumableArray(this._ids);

        var newIds = {};
        var addedIds = [];
        var removedIds = [];
        var removedItems = []; // check for additions

        for (var i = 0, len = ids.length; i < len; i++) {
          var id = ids[i];
          newIds[id] = true;

          if (!this._ids.has(id)) {
            addedIds.push(id);

            this._ids.add(id);
          }
        } // check for removals


        for (var _i = 0, _len = oldIds.length; _i < _len; _i++) {
          var _id = oldIds[_i];

          var item = this._data.get(_id);

          if (item == null) {
            // @TODO: Investigate.
            // Doesn't happen during tests or examples.
            // Is it really impossible or could it eventually happen?
            // How to handle it if it does? The types guarantee non-nullable items.
            console.error("If you see this, report it please.");
          } else if (!newIds[_id]) {
            removedIds.push(_id);
            removedItems.push(item);

            this._ids.delete(_id);
          }
        }

        this.length += addedIds.length - removedIds.length; // trigger events

        if (addedIds.length) {
          this._trigger("add", {
            items: addedIds
          });
        }

        if (removedIds.length) {
          this._trigger("remove", {
            items: removedIds,
            oldData: removedItems
          });
        }
      }
      /** @inheritDoc */

    }, {
      key: "get",
      value: function get(first, second) {
        if (this._data == null) {
          return null;
        } // parse the arguments


        var ids = null;
        var options;

        if (isId(first) || isArray$1(first)) {
          ids = first;
          options = second;
        } else {
          options = first;
        } // extend the options with the default options and provided options


        var viewOptions = assign$2({}, this._options, options); // create a combined filter method when needed


        var thisFilter = filter(this._options);

        var optionsFilter = options && filter(options);

        if (thisFilter && optionsFilter) {
          viewOptions.filter = function (item) {
            return thisFilter(item) && optionsFilter(item);
          };
        }

        if (ids == null) {
          return this._data.get(viewOptions);
        } else {
          return this._data.get(ids, viewOptions);
        }
      }
      /** @inheritDoc */

    }, {
      key: "getIds",
      value: function getIds(options) {
        if (this._data.length) {
          var defaultFilter = filter(this._options);

          var optionsFilter = options != null ? filter(options) : null;
          var filter$1;

          if (optionsFilter) {
            if (defaultFilter) {
              filter$1 = function filter(item) {
                return defaultFilter(item) && optionsFilter(item);
              };
            } else {
              filter$1 = optionsFilter;
            }
          } else {
            filter$1 = defaultFilter;
          }

          return this._data.getIds({
            filter: filter$1,
            order: options && options.order
          });
        } else {
          return [];
        }
      }
      /** @inheritDoc */

    }, {
      key: "forEach",
      value: function forEach(callback, options) {
        if (this._data) {
          var _context2;

          var defaultFilter = filter(this._options);

          var optionsFilter = options && filter(options);

          var filter$1;

          if (optionsFilter) {
            if (defaultFilter) {
              filter$1 = function filter(item) {
                return defaultFilter(item) && optionsFilter(item);
              };
            } else {
              filter$1 = optionsFilter;
            }
          } else {
            filter$1 = defaultFilter;
          }

          forEach$1(_context2 = this._data).call(_context2, callback, {
            filter: filter$1,
            order: options && options.order
          });
        }
      }
      /** @inheritDoc */

    }, {
      key: "map",
      value: function map(callback, options) {
        if (this._data) {
          var _context3;

          var defaultFilter = filter(this._options);

          var optionsFilter = options && filter(options);

          var filter$1;

          if (optionsFilter) {
            if (defaultFilter) {
              filter$1 = function filter(item) {
                return defaultFilter(item) && optionsFilter(item);
              };
            } else {
              filter$1 = optionsFilter;
            }
          } else {
            filter$1 = defaultFilter;
          }

          return map$3(_context3 = this._data).call(_context3, callback, {
            filter: filter$1,
            order: options && options.order
          });
        } else {
          return [];
        }
      }
      /** @inheritDoc */

    }, {
      key: "getDataSet",
      value: function getDataSet() {
        return this._data.getDataSet();
      }
      /** @inheritDoc */

    }, {
      key: "stream",
      value: function stream(ids) {
        var _context4;

        return this._data.stream(ids || _defineProperty({}, iterator, bind$6(_context4 = keys(this._ids)).call(_context4, this._ids)));
      }
      /**
       * Render the instance unusable prior to garbage collection.
       *
       * @remarks
       * The intention of this method is to help discover scenarios where the data
       * view is being used when the programmer thinks it has been garbage collected
       * already. It's stricter version of `dataView.setData(null)`.
       */

    }, {
      key: "dispose",
      value: function dispose() {
        var _this$_data;

        if ((_this$_data = this._data) !== null && _this$_data !== void 0 && _this$_data.off) {
          this._data.off("*", this._listener);
        }

        var message = "This data view has already been disposed of.";
        var replacement = {
          get: function get() {
            throw new Error(message);
          },
          set: function set() {
            throw new Error(message);
          },
          configurable: false
        };

        var _iterator = _createForOfIteratorHelper(ownKeys$1(DataView.prototype)),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var key = _step.value;

            defineProperty$4(this, key, replacement);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      /**
       * Event listener. Will propagate all events from the connected data set to the subscribers of the DataView, but will filter the items and only trigger when there are changes in the filtered data set.
       *
       * @param event - The name of the event.
       * @param params - Parameters of the event.
       * @param senderId - Id supplied by the sender.
       */

    }, {
      key: "_onEvent",
      value: function _onEvent(event, params, senderId) {
        if (!params || !params.items || !this._data) {
          return;
        }

        var ids = params.items;
        var addedIds = [];
        var updatedIds = [];
        var removedIds = [];
        var oldItems = [];
        var updatedItems = [];
        var removedItems = [];

        switch (event) {
          case "add":
            // filter the ids of the added items
            for (var i = 0, len = ids.length; i < len; i++) {
              var id = ids[i];
              var item = this.get(id);

              if (item) {
                this._ids.add(id);

                addedIds.push(id);
              }
            }

            break;

          case "update":
            // determine the event from the views viewpoint: an updated
            // item can be added, updated, or removed from this view.
            for (var _i2 = 0, _len2 = ids.length; _i2 < _len2; _i2++) {
              var _id2 = ids[_i2];

              var _item = this.get(_id2);

              if (_item) {
                if (this._ids.has(_id2)) {
                  updatedIds.push(_id2);
                  updatedItems.push(params.data[_i2]);
                  oldItems.push(params.oldData[_i2]);
                } else {
                  this._ids.add(_id2);

                  addedIds.push(_id2);
                }
              } else {
                if (this._ids.has(_id2)) {
                  this._ids.delete(_id2);

                  removedIds.push(_id2);
                  removedItems.push(params.oldData[_i2]);
                }
              }
            }

            break;

          case "remove":
            // filter the ids of the removed items
            for (var _i3 = 0, _len3 = ids.length; _i3 < _len3; _i3++) {
              var _id3 = ids[_i3];

              if (this._ids.has(_id3)) {
                this._ids.delete(_id3);

                removedIds.push(_id3);
                removedItems.push(params.oldData[_i3]);
              }
            }

            break;
        }

        this.length += addedIds.length - removedIds.length;

        if (addedIds.length) {
          this._trigger("add", {
            items: addedIds
          }, senderId);
        }

        if (updatedIds.length) {
          this._trigger("update", {
            items: updatedIds,
            oldData: oldItems,
            data: updatedItems
          }, senderId);
        }

        if (removedIds.length) {
          this._trigger("remove", {
            items: removedIds,
            oldData: removedItems
          }, senderId);
        }
      }
    }]);

    return DataView;
  }(DataSetPart);

  /**
   * Check that given value is compatible with Vis Data Set interface.
   *
   * @param idProp - The expected property to contain item id.
   * @param v - The value to be tested.
   * @returns True if all expected values and methods match, false otherwise.
   */
  function isDataSetLike(idProp, v) {
    return _typeof(v) === "object" && v !== null && idProp === v.idProp && typeof v.add === "function" && typeof v.clear === "function" && typeof v.distinct === "function" && typeof forEach$1(v) === "function" && typeof v.get === "function" && typeof v.getDataSet === "function" && typeof v.getIds === "function" && typeof v.length === "number" && typeof map$3(v) === "function" && typeof v.max === "function" && typeof v.min === "function" && typeof v.off === "function" && typeof v.on === "function" && typeof v.remove === "function" && typeof v.setOptions === "function" && typeof v.stream === "function" && typeof v.update === "function" && typeof v.updateOnly === "function";
  }

  /**
   * Check that given value is compatible with Vis Data View interface.
   *
   * @param idProp - The expected property to contain item id.
   * @param v - The value to be tested.
   * @returns True if all expected values and methods match, false otherwise.
   */

  function isDataViewLike(idProp, v) {
    return _typeof(v) === "object" && v !== null && idProp === v.idProp && typeof forEach$1(v) === "function" && typeof v.get === "function" && typeof v.getDataSet === "function" && typeof v.getIds === "function" && typeof v.length === "number" && typeof map$3(v) === "function" && typeof v.off === "function" && typeof v.on === "function" && typeof v.stream === "function" && isDataSetLike(idProp, v.getDataSet());
  }

  /* develblock:start */
  console.warn("You're running a development build.");

  // Current API.
  var index = {
    DataSet: DataSet,
    DataView: DataView,
    Queue: Queue
  };

  exports.DELETE = DELETE;
  exports.DataSet = DataSet;
  exports.DataStream = DataStream;
  exports.DataView = DataView;
  exports.Queue = Queue;
  exports.createNewDataPipeFrom = createNewDataPipeFrom;
  exports["default"] = index;
  exports.isDataSetLike = isDataSetLike;
  exports.isDataViewLike = isDataViewLike;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=umd.js.map
