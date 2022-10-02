this.google = this.google || {};
this.google.maps = this.google.maps || {};
this.google.maps.plugins = this.google.maps.plugins || {};
this.google.maps.plugins.loader = (function (exports) {
  'use strict';

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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var check = function (it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global$D = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  function () {
    return this;
  }() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$d = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$c = fails$d; // Detect IE8's incomplete defineProperty implementation

  var descriptors = !fails$c(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1] != 7;
  });

  var fails$b = fails$d;
  var functionBindNative = !fails$b(function () {
    var test = function () {
      /* empty */
    }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$3 = functionBindNative;
  var call$9 = Function.prototype.call;
  var functionCall = NATIVE_BIND$3 ? call$9.bind(call$9) : function () {
    return call$9.apply(call$9, arguments);
  };

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({
    1: 2
  }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var createPropertyDescriptor$3 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var NATIVE_BIND$2 = functionBindNative;
  var FunctionPrototype$2 = Function.prototype;
  var bind$6 = FunctionPrototype$2.bind;
  var call$8 = FunctionPrototype$2.call;
  var uncurryThis$g = NATIVE_BIND$2 && bind$6.bind(call$8, call$8);
  var functionUncurryThis = NATIVE_BIND$2 ? function (fn) {
    return fn && uncurryThis$g(fn);
  } : function (fn) {
    return fn && function () {
      return call$8.apply(fn, arguments);
    };
  };

  var uncurryThis$f = functionUncurryThis;
  var toString$2 = uncurryThis$f({}.toString);
  var stringSlice = uncurryThis$f(''.slice);

  var classofRaw$1 = function (it) {
    return stringSlice(toString$2(it), 8, -1);
  };

  var global$C = global$D;
  var uncurryThis$e = functionUncurryThis;
  var fails$a = fails$d;
  var classof$6 = classofRaw$1;
  var Object$4 = global$C.Object;
  var split = uncurryThis$e(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails$a(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$4('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$6(it) == 'String' ? split(it, '') : Object$4(it);
  } : Object$4;

  var global$B = global$D;
  var TypeError$f = global$B.TypeError; // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible$2 = function (it) {
    if (it == undefined) throw TypeError$f("Can't call method on " + it);
    return it;
  };

  var IndexedObject$2 = indexedObject;
  var requireObjectCoercible$1 = requireObjectCoercible$2;

  var toIndexedObject$4 = function (it) {
    return IndexedObject$2(requireObjectCoercible$1(it));
  };

  // https://tc39.es/ecma262/#sec-iscallable

  var isCallable$e = function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$d = isCallable$e;

  var isObject$9 = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$d(it);
  };

  var global$A = global$D;
  var isCallable$c = isCallable$e;

  var aFunction = function (argument) {
    return isCallable$c(argument) ? argument : undefined;
  };

  var getBuiltIn$8 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$A[namespace]) : global$A[namespace] && global$A[namespace][method];
  };

  var uncurryThis$d = functionUncurryThis;
  var objectIsPrototypeOf = uncurryThis$d({}.isPrototypeOf);

  var getBuiltIn$7 = getBuiltIn$8;
  var engineUserAgent = getBuiltIn$7('navigator', 'userAgent') || '';

  var global$z = global$D;
  var userAgent$3 = engineUserAgent;
  var process$3 = global$z.process;
  var Deno = global$z.Deno;
  var versions = process$3 && process$3.versions || Deno && Deno.version;
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
  var V8_VERSION$3 = engineV8Version;
  var fails$9 = fails$d; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$9(function () {
    var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

  var global$y = global$D;
  var getBuiltIn$6 = getBuiltIn$8;
  var isCallable$b = isCallable$e;
  var isPrototypeOf$2 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
  var Object$3 = global$y.Object;
  var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$6('Symbol');
    return isCallable$b($Symbol) && isPrototypeOf$2($Symbol.prototype, Object$3(it));
  };

  var global$x = global$D;
  var String$4 = global$x.String;

  var tryToString$4 = function (argument) {
    try {
      return String$4(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var global$w = global$D;
  var isCallable$a = isCallable$e;
  var tryToString$3 = tryToString$4;
  var TypeError$e = global$w.TypeError; // `Assert: IsCallable(argument) is true`

  var aCallable$5 = function (argument) {
    if (isCallable$a(argument)) return argument;
    throw TypeError$e(tryToString$3(argument) + ' is not a function');
  };

  var aCallable$4 = aCallable$5; // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod

  var getMethod$3 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable$4(func);
  };

  var global$v = global$D;
  var call$7 = functionCall;
  var isCallable$9 = isCallable$e;
  var isObject$8 = isObject$9;
  var TypeError$d = global$v.TypeError; // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive

  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$9(fn = input.toString) && !isObject$8(val = call$7(fn, input))) return val;
    if (isCallable$9(fn = input.valueOf) && !isObject$8(val = call$7(fn, input))) return val;
    if (pref !== 'string' && isCallable$9(fn = input.toString) && !isObject$8(val = call$7(fn, input))) return val;
    throw TypeError$d("Can't convert object to primitive value");
  };

  var shared$3 = {exports: {}};

  var global$u = global$D; // eslint-disable-next-line es/no-object-defineproperty -- safe

  var defineProperty$1 = Object.defineProperty;

  var setGlobal$3 = function (key, value) {
    try {
      defineProperty$1(global$u, key, {
        value: value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global$u[key] = value;
    }

    return value;
  };

  var global$t = global$D;
  var setGlobal$2 = setGlobal$3;
  var SHARED = '__core-js_shared__';
  var store$3 = global$t[SHARED] || setGlobal$2(SHARED, {});
  var sharedStore = store$3;

  var store$2 = sharedStore;
  (shared$3.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.21.1',
    mode: 'global',
    copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var global$s = global$D;
  var requireObjectCoercible = requireObjectCoercible$2;
  var Object$2 = global$s.Object; // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject

  var toObject$3 = function (argument) {
    return Object$2(requireObjectCoercible(argument));
  };

  var uncurryThis$c = functionUncurryThis;
  var toObject$2 = toObject$3;
  var hasOwnProperty = uncurryThis$c({}.hasOwnProperty); // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty

  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$2(it), key);
  };

  var uncurryThis$b = functionUncurryThis;
  var id = 0;
  var postfix = Math.random();
  var toString$1 = uncurryThis$b(1.0.toString);

  var uid$2 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$1(++id + postfix, 36);
  };

  var global$r = global$D;
  var shared$2 = shared$3.exports;
  var hasOwn$8 = hasOwnProperty_1;
  var uid$1 = uid$2;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var WellKnownSymbolsStore = shared$2('wks');
  var Symbol$1 = global$r.Symbol;
  var symbolFor = Symbol$1 && Symbol$1['for'];
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

  var wellKnownSymbol$d = function (name) {
    if (!hasOwn$8(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      var description = 'Symbol.' + name;

      if (NATIVE_SYMBOL && hasOwn$8(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else if (USE_SYMBOL_AS_UID && symbolFor) {
        WellKnownSymbolsStore[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
    }

    return WellKnownSymbolsStore[name];
  };

  var global$q = global$D;
  var call$6 = functionCall;
  var isObject$7 = isObject$9;
  var isSymbol$1 = isSymbol$2;
  var getMethod$2 = getMethod$3;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$c = wellKnownSymbol$d;
  var TypeError$c = global$q.TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$c('toPrimitive'); // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive

  var toPrimitive$1 = function (input, pref) {
    if (!isObject$7(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
    var result;

    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$6(exoticToPrim, input, pref);
      if (!isObject$7(result) || isSymbol$1(result)) return result;
      throw TypeError$c("Can't convert object to primitive value");
    }

    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2; // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey

  var toPropertyKey$3 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var global$p = global$D;
  var isObject$6 = isObject$9;
  var document$3 = global$p.document; // typeof document.createElement is 'object' in old IE

  var EXISTS$1 = isObject$6(document$3) && isObject$6(document$3.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS$1 ? document$3.createElement(it) : {};
  };

  var DESCRIPTORS$6 = descriptors;
  var fails$8 = fails$d;
  var createElement$1 = documentCreateElement$1; // Thanks to IE8 for its funny defineProperty

  var ie8DomDefine = !DESCRIPTORS$6 && !fails$8(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement$1('div'), 'a', {
      get: function () {
        return 7;
      }
    }).a != 7;
  });

  var DESCRIPTORS$5 = descriptors;
  var call$5 = functionCall;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$2 = createPropertyDescriptor$3;
  var toIndexedObject$3 = toIndexedObject$4;
  var toPropertyKey$2 = toPropertyKey$3;
  var hasOwn$7 = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$5 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$3(O);
    P = toPropertyKey$2(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) {
      /* empty */
    }
    if (hasOwn$7(O, P)) return createPropertyDescriptor$2(!call$5(propertyIsEnumerableModule.f, O, P), O[P]);
  };

  var objectDefineProperty = {};

  var DESCRIPTORS$4 = descriptors;
  var fails$7 = fails$d; // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334

  var v8PrototypeDefineBug = DESCRIPTORS$4 && fails$7(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () {
      /* empty */
    }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var global$o = global$D;
  var isObject$5 = isObject$9;
  var String$3 = global$o.String;
  var TypeError$b = global$o.TypeError; // `Assert: Type(argument) is Object`

  var anObject$8 = function (argument) {
    if (isObject$5(argument)) return argument;
    throw TypeError$b(String$3(argument) + ' is not an object');
  };

  var global$n = global$D;
  var DESCRIPTORS$3 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var anObject$7 = anObject$8;
  var toPropertyKey$1 = toPropertyKey$3;
  var TypeError$a = global$n.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

  var $defineProperty = Object.defineProperty; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable'; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  objectDefineProperty.f = DESCRIPTORS$3 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
    anObject$7(O);
    P = toPropertyKey$1(P);
    anObject$7(Attributes);

    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor(O, P);

      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    }

    return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$7(O);
    P = toPropertyKey$1(P);
    anObject$7(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$a('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$2 = descriptors;
  var definePropertyModule$3 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$3;
  var createNonEnumerableProperty$4 = DESCRIPTORS$2 ? function (object, key, value) {
    return definePropertyModule$3.f(object, key, createPropertyDescriptor$1(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$4 = {exports: {}};

  var uncurryThis$a = functionUncurryThis;
  var isCallable$8 = isCallable$e;
  var store$1 = sharedStore;
  var functionToString = uncurryThis$a(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

  if (!isCallable$8(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource$4 = store$1.inspectSource;

  var global$m = global$D;
  var isCallable$7 = isCallable$e;
  var inspectSource$3 = inspectSource$4;
  var WeakMap$1 = global$m.WeakMap;
  var nativeWeakMap = isCallable$7(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1));

  var shared$1 = shared$3.exports;
  var uid = uid$2;
  var keys = shared$1('keys');

  var sharedKey$1 = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys$3 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$l = global$D;
  var uncurryThis$9 = functionUncurryThis;
  var isObject$4 = isObject$9;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$4;
  var hasOwn$6 = hasOwnProperty_1;
  var shared = sharedStore;
  var sharedKey = sharedKey$1;
  var hiddenKeys$2 = hiddenKeys$3;
  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$9 = global$l.TypeError;
  var WeakMap = global$l.WeakMap;
  var set$1, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;

      if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$9('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    var wmget = uncurryThis$9(store.get);
    var wmhas = uncurryThis$9(store.has);
    var wmset = uncurryThis$9(store.set);

    set$1 = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$9(OBJECT_ALREADY_INITIALIZED);
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
    var STATE = sharedKey('state');
    hiddenKeys$2[STATE] = true;

    set$1 = function (it, metadata) {
      if (hasOwn$6(it, STATE)) throw new TypeError$9(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$3(it, STATE, metadata);
      return metadata;
    };

    get = function (it) {
      return hasOwn$6(it, STATE) ? it[STATE] : {};
    };

    has = function (it) {
      return hasOwn$6(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var DESCRIPTORS$1 = descriptors;
  var hasOwn$5 = hasOwnProperty_1;
  var FunctionPrototype$1 = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor;
  var EXISTS = hasOwn$5(FunctionPrototype$1, 'name'); // additional protection from minified / mangled / dropped function names

  var PROPER = EXISTS && function something() {
    /* empty */
  }.name === 'something';

  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$1 || DESCRIPTORS$1 && getDescriptor(FunctionPrototype$1, 'name').configurable);
  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var global$k = global$D;
  var isCallable$6 = isCallable$e;
  var hasOwn$4 = hasOwnProperty_1;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$4;
  var setGlobal$1 = setGlobal$3;
  var inspectSource$2 = inspectSource$4;
  var InternalStateModule$1 = internalState;
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
  var getInternalState$1 = InternalStateModule$1.get;
  var enforceInternalState = InternalStateModule$1.enforce;
  var TEMPLATE = String(String).split('String');
  (redefine$4.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;

    if (isCallable$6(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }

      if (!hasOwn$4(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        createNonEnumerableProperty$2(value, 'name', name);
      }

      state = enforceInternalState(value);

      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }

    if (O === global$k) {
      if (simple) O[key] = value;else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }

    if (simple) O[key] = value;else createNonEnumerableProperty$2(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable$6(this) && getInternalState$1(this).source || inspectSource$2(this);
  });

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor = Math.floor; // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity

  var toIntegerOrInfinity$2 = function (argument) {
    var number = +argument; // eslint-disable-next-line no-self-compare -- safe

    return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
  };

  var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;
  var max = Math.max;
  var min$1 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex$1 = function (index, length) {
    var integer = toIntegerOrInfinity$1(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  var toIntegerOrInfinity = toIntegerOrInfinity$2;
  var min = Math.min; // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength

  var toLength$1 = function (argument) {
    return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength = toLength$1; // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike

  var lengthOfArrayLike$4 = function (obj) {
    return toLength(obj.length);
  };

  var toIndexedObject$2 = toIndexedObject$4;
  var toAbsoluteIndex = toAbsoluteIndex$1;
  var lengthOfArrayLike$3 = lengthOfArrayLike$4; // `Array.prototype.{ indexOf, includes }` methods implementation

  var createMethod$1 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$2($this);
      var length = lengthOfArrayLike$3(O);
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
    includes: createMethod$1(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$1(false)
  };

  var uncurryThis$8 = functionUncurryThis;
  var hasOwn$3 = hasOwnProperty_1;
  var toIndexedObject$1 = toIndexedObject$4;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$1 = hiddenKeys$3;
  var push$1 = uncurryThis$8([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$1(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) !hasOwn$3(hiddenKeys$1, key) && hasOwn$3(O, key) && push$1(result, key); // Don't enum bug & hidden keys


    while (names.length > i) if (hasOwn$3(O, key = names[i++])) {
      ~indexOf(result, key) || push$1(result, key);
    }

    return result;
  };

  var enumBugKeys$1 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys = enumBugKeys$1;
  var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe

  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
  };

  var objectGetOwnPropertySymbols = {};

  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$5 = getBuiltIn$8;
  var uncurryThis$7 = functionUncurryThis;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$6 = anObject$8;
  var concat = uncurryThis$7([].concat); // all object keys, includes non-enumerable and symbols

  var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$6(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$2 = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$2 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$2.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (!hasOwn$2(target, key) && !(exceptions && hasOwn$2(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var fails$6 = fails$d;
  var isCallable$5 = isCallable$e;
  var replacement = /#|\.prototype\./;

  var isForced$2 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : isCallable$5(detection) ? fails$6(detection) : !!detection;
  };

  var normalize = isForced$2.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$2.data = {};
  var NATIVE = isForced$2.NATIVE = 'N';
  var POLYFILL = isForced$2.POLYFILL = 'P';
  var isForced_1 = isForced$2;

  var global$j = global$D;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$4;
  var redefine$3 = redefine$4.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced$1 = isForced_1;
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
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;

    if (GLOBAL) {
      target = global$j;
    } else if (STATIC) {
      target = global$j[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$j[TARGET] || {}).prototype;
    }

    if (target) for (key in source) {
      sourceProperty = source[key];

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];

      FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      } // add a flag to not completely full polyfills


      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$1(sourceProperty, 'sham', true);
      } // extend global


      redefine$3(target, key, sourceProperty, options);
    }
  };

  var classof$5 = classofRaw$1; // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe

  var isArray$2 = Array.isArray || function isArray(argument) {
    return classof$5(argument) == 'Array';
  };

  var toPropertyKey = toPropertyKey$3;
  var definePropertyModule$1 = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$3;

  var createProperty$1 = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
  };

  var wellKnownSymbol$b = wellKnownSymbol$d;
  var TO_STRING_TAG$2 = wellKnownSymbol$b('toStringTag');
  var test = {};
  test[TO_STRING_TAG$2] = 'z';
  var toStringTagSupport = String(test) === '[object z]';

  var global$i = global$D;
  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$4 = isCallable$e;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$a = wellKnownSymbol$d;
  var TO_STRING_TAG$1 = wellKnownSymbol$a('toStringTag');
  var Object$1 = global$i.Object; // ES3 wrong here

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


  var classof$4 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$4(O.callee) ? 'Arguments' : result;
  };

  var uncurryThis$6 = functionUncurryThis;
  var fails$5 = fails$d;
  var isCallable$3 = isCallable$e;
  var classof$3 = classof$4;
  var getBuiltIn$4 = getBuiltIn$8;
  var inspectSource$1 = inspectSource$4;

  var noop = function () {
    /* empty */
  };

  var empty = [];
  var construct = getBuiltIn$4('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$1 = uncurryThis$6(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable$3(argument)) return false;

    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable$3(argument)) return false;

    switch (classof$3(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction':
        return false;
    }

    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource$1(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor

  var isConstructor$2 = !construct || fails$5(function () {
    var called;
    return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
      called = true;
    }) || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var global$h = global$D;
  var isArray$1 = isArray$2;
  var isConstructor$1 = isConstructor$2;
  var isObject$3 = isObject$9;
  var wellKnownSymbol$9 = wellKnownSymbol$d;
  var SPECIES$4 = wellKnownSymbol$9('species');
  var Array$2 = global$h.Array; // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;

    if (isArray$1(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (isConstructor$1(C) && (C === Array$2 || isArray$1(C.prototype))) C = undefined;else if (isObject$3(C)) {
        C = C[SPECIES$4];
        if (C === null) C = undefined;
      }
    }

    return C === undefined ? Array$2 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1; // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesCreate$2 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var fails$4 = fails$d;
  var wellKnownSymbol$8 = wellKnownSymbol$d;
  var V8_VERSION$2 = engineV8Version;
  var SPECIES$3 = wellKnownSymbol$8('species');

  var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$2 >= 51 || !fails$4(function () {
      var array = [];
      var constructor = array.constructor = {};

      constructor[SPECIES$3] = function () {
        return {
          foo: 1
        };
      };

      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$3 = _export;
  var global$g = global$D;
  var fails$3 = fails$d;
  var isArray = isArray$2;
  var isObject$2 = isObject$9;
  var toObject$1 = toObject$3;
  var lengthOfArrayLike$2 = lengthOfArrayLike$4;
  var createProperty = createProperty$1;
  var arraySpeciesCreate$1 = arraySpeciesCreate$2;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;
  var wellKnownSymbol$7 = wellKnownSymbol$d;
  var V8_VERSION$1 = engineV8Version;
  var IS_CONCAT_SPREADABLE = wellKnownSymbol$7('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
  var TypeError$8 = global$g.TypeError; // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679

  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$1 >= 51 || !fails$3(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject$2(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species

  $$3({
    target: 'Array',
    proto: true,
    forced: FORCED$2
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$1(this);
      var A = arraySpeciesCreate$1(O, 0);
      var n = 0;
      var i, k, length, len, E;

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];

        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike$2(E);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError$8(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError$8(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }

      A.length = n;
      return A;
    }
  });

  var NATIVE_BIND$1 = functionBindNative;
  var FunctionPrototype = Function.prototype;
  var apply$2 = FunctionPrototype.apply;
  var call$4 = FunctionPrototype.call; // eslint-disable-next-line es/no-reflect -- safe

  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$4.bind(apply$2) : function () {
    return call$4.apply(apply$2, arguments);
  });

  var $$2 = _export;
  var global$f = global$D;
  var getBuiltIn$3 = getBuiltIn$8;
  var apply$1 = functionApply;
  var uncurryThis$5 = functionUncurryThis;
  var fails$2 = fails$d;
  var Array$1 = global$f.Array;
  var $stringify = getBuiltIn$3('JSON', 'stringify');
  var exec = uncurryThis$5(/./.exec);
  var charAt = uncurryThis$5(''.charAt);
  var charCodeAt = uncurryThis$5(''.charCodeAt);
  var replace = uncurryThis$5(''.replace);
  var numberToString = uncurryThis$5(1.0.toString);
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

  var FORCED$1 = fails$2(function () {
    return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"' || $stringify('\uDEAD') !== '"\\udead"';
  });

  if ($stringify) {
    // `JSON.stringify` method
    // https://tc39.es/ecma262/#sec-json.stringify
    // https://github.com/tc39/proposal-well-formed-stringify
    $$2({
      target: 'JSON',
      stat: true,
      forced: FORCED$1
    }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        for (var i = 0, l = arguments.length, args = Array$1(l); i < l; i++) args[i] = arguments[i];

        var result = apply$1($stringify, null, args);
        return typeof result == 'string' ? replace(result, tester, fix) : result;
      }
    });
  }

  var fails$1 = fails$d;

  var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$1(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () {
        return 1;
      }, 1);
    });
  };

  var $$1 = _export;
  var uncurryThis$4 = functionUncurryThis;
  var IndexedObject$1 = indexedObject;
  var toIndexedObject = toIndexedObject$4;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;
  var un$Join = uncurryThis$4([].join);
  var ES3_STRINGS = IndexedObject$1 != Object;
  var STRICT_METHOD$1 = arrayMethodIsStrict$1('join', ','); // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join

  $$1({
    target: 'Array',
    proto: true,
    forced: ES3_STRINGS || !STRICT_METHOD$1
  }, {
    join: function join(separator) {
      return un$Join(toIndexedObject(this), separator === undefined ? ',' : separator);
    }
  });

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$2 = classof$4; // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$2(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$2 = redefine$4.exports;
  var toString = objectToString; // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  if (!TO_STRING_TAG_SUPPORT) {
    redefine$2(Object.prototype, 'toString', toString, {
      unsafe: true
    });
  }

  var global$e = global$D;
  var nativePromiseConstructor = global$e.Promise;

  var redefine$1 = redefine$4.exports;

  var redefineAll$1 = function (target, src, options) {
    for (var key in src) redefine$1(target, key, src[key], options);

    return target;
  };

  var global$d = global$D;
  var isCallable$2 = isCallable$e;
  var String$2 = global$d.String;
  var TypeError$7 = global$d.TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$2(argument)) return argument;
    throw TypeError$7("Can't set " + String$2(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */
  var uncurryThis$3 = functionUncurryThis;
  var anObject$5 = anObject$8;
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
      setter = uncurryThis$3(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) {
      /* empty */
    }

    return function setPrototypeOf(O, proto) {
      anObject$5(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var defineProperty = objectDefineProperty.f;
  var hasOwn$1 = hasOwnProperty_1;
  var wellKnownSymbol$6 = wellKnownSymbol$d;
  var TO_STRING_TAG = wellKnownSymbol$6('toStringTag');

  var setToStringTag$1 = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;

    if (target && !hasOwn$1(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, {
        configurable: true,
        value: TAG
      });
    }
  };

  var getBuiltIn$2 = getBuiltIn$8;
  var definePropertyModule = objectDefineProperty;
  var wellKnownSymbol$5 = wellKnownSymbol$d;
  var DESCRIPTORS = descriptors;
  var SPECIES$2 = wellKnownSymbol$5('species');

  var setSpecies$1 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$2(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule.f;

    if (DESCRIPTORS && Constructor && !Constructor[SPECIES$2]) {
      defineProperty(Constructor, SPECIES$2, {
        configurable: true,
        get: function () {
          return this;
        }
      });
    }
  };

  var global$c = global$D;
  var isPrototypeOf$1 = objectIsPrototypeOf;
  var TypeError$6 = global$c.TypeError;

  var anInstance$1 = function (it, Prototype) {
    if (isPrototypeOf$1(Prototype, it)) return it;
    throw TypeError$6('Incorrect invocation');
  };

  var uncurryThis$2 = functionUncurryThis;
  var aCallable$3 = aCallable$5;
  var NATIVE_BIND = functionBindNative;
  var bind$5 = uncurryThis$2(uncurryThis$2.bind); // optional / simple context binding

  var functionBindContext = function (fn, that) {
    aCallable$3(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind$5(fn, that) : function ()
    /* ...args */
    {
      return fn.apply(that, arguments);
    };
  };

  var iterators = {};

  var wellKnownSymbol$4 = wellKnownSymbol$d;
  var Iterators$1 = iterators;
  var ITERATOR$2 = wellKnownSymbol$4('iterator');
  var ArrayPrototype = Array.prototype; // check on default Array iterator

  var isArrayIteratorMethod$1 = function (it) {
    return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
  };

  var classof$1 = classof$4;
  var getMethod$1 = getMethod$3;
  var Iterators = iterators;
  var wellKnownSymbol$3 = wellKnownSymbol$d;
  var ITERATOR$1 = wellKnownSymbol$3('iterator');

  var getIteratorMethod$2 = function (it) {
    if (it != undefined) return getMethod$1(it, ITERATOR$1) || getMethod$1(it, '@@iterator') || Iterators[classof$1(it)];
  };

  var global$b = global$D;
  var call$3 = functionCall;
  var aCallable$2 = aCallable$5;
  var anObject$4 = anObject$8;
  var tryToString$2 = tryToString$4;
  var getIteratorMethod$1 = getIteratorMethod$2;
  var TypeError$5 = global$b.TypeError;

  var getIterator$1 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
    if (aCallable$2(iteratorMethod)) return anObject$4(call$3(iteratorMethod, argument));
    throw TypeError$5(tryToString$2(argument) + ' is not iterable');
  };

  var call$2 = functionCall;
  var anObject$3 = anObject$8;
  var getMethod = getMethod$3;

  var iteratorClose$1 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$3(iterator);

    try {
      innerResult = getMethod(iterator, 'return');

      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }

      innerResult = call$2(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }

    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$3(innerResult);
    return value;
  };

  var global$a = global$D;
  var bind$4 = functionBindContext;
  var call$1 = functionCall;
  var anObject$2 = anObject$8;
  var tryToString$1 = tryToString$4;
  var isArrayIteratorMethod = isArrayIteratorMethod$1;
  var lengthOfArrayLike$1 = lengthOfArrayLike$4;
  var isPrototypeOf = objectIsPrototypeOf;
  var getIterator = getIterator$1;
  var getIteratorMethod = getIteratorMethod$2;
  var iteratorClose = iteratorClose$1;
  var TypeError$4 = global$a.TypeError;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  var iterate$1 = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$4(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$2(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      }

      return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (!iterFn) throw TypeError$4(tryToString$1(iterable) + ' is not iterable'); // optimisation for array iterators

      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = lengthOfArrayLike$1(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf(ResultPrototype, result)) return result;
        }

        return new Result(false);
      }

      iterator = getIterator(iterable, iterFn);
    }

    next = iterator.next;

    while (!(step = call$1(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator, 'throw', error);
      }

      if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
    }

    return new Result(false);
  };

  var wellKnownSymbol$2 = wellKnownSymbol$d;
  var ITERATOR = wellKnownSymbol$2('iterator');
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

    iteratorWithReturn[ITERATOR] = function () {
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

      object[ITERATOR] = function () {
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

  var global$9 = global$D;
  var isConstructor = isConstructor$2;
  var tryToString = tryToString$4;
  var TypeError$3 = global$9.TypeError; // `Assert: IsConstructor(argument) is true`

  var aConstructor$1 = function (argument) {
    if (isConstructor(argument)) return argument;
    throw TypeError$3(tryToString(argument) + ' is not a constructor');
  };

  var anObject$1 = anObject$8;
  var aConstructor = aConstructor$1;
  var wellKnownSymbol$1 = wellKnownSymbol$d;
  var SPECIES$1 = wellKnownSymbol$1('species'); // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor

  var speciesConstructor$1 = function (O, defaultConstructor) {
    var C = anObject$1(O).constructor;
    var S;
    return C === undefined || (S = anObject$1(C)[SPECIES$1]) == undefined ? defaultConstructor : aConstructor(S);
  };

  var getBuiltIn$1 = getBuiltIn$8;
  var html$1 = getBuiltIn$1('document', 'documentElement');

  var uncurryThis$1 = functionUncurryThis;
  var arraySlice$1 = uncurryThis$1([].slice);

  var global$8 = global$D;
  var TypeError$2 = global$8.TypeError;

  var validateArgumentsLength$1 = function (passed, required) {
    if (passed < required) throw TypeError$2('Not enough arguments');
    return passed;
  };

  var userAgent$2 = engineUserAgent;
  var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

  var classof = classofRaw$1;
  var global$7 = global$D;
  var engineIsNode = classof(global$7.process) == 'process';

  var global$6 = global$D;
  var apply = functionApply;
  var bind$3 = functionBindContext;
  var isCallable$1 = isCallable$e;
  var hasOwn = hasOwnProperty_1;
  var fails = fails$d;
  var html = html$1;
  var arraySlice = arraySlice$1;
  var createElement = documentCreateElement$1;
  var validateArgumentsLength = validateArgumentsLength$1;
  var IS_IOS$1 = engineIsIos;
  var IS_NODE$2 = engineIsNode;
  var set = global$6.setImmediate;
  var clear = global$6.clearImmediate;
  var process$2 = global$6.process;
  var Dispatch = global$6.Dispatch;
  var Function$1 = global$6.Function;
  var MessageChannel = global$6.MessageChannel;
  var String$1 = global$6.String;
  var counter = 0;
  var queue$1 = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var location, defer, channel, port;

  try {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    location = global$6.location;
  } catch (error) {
    /* empty */
  }

  var run = function (id) {
    if (hasOwn(queue$1, id)) {
      var fn = queue$1[id];
      delete queue$1[id];
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
    global$6.postMessage(String$1(id), location.protocol + '//' + location.host);
  }; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


  if (!set || !clear) {
    set = function setImmediate(handler) {
      validateArgumentsLength(arguments.length, 1);
      var fn = isCallable$1(handler) ? handler : Function$1(handler);
      var args = arraySlice(arguments, 1);

      queue$1[++counter] = function () {
        apply(fn, undefined, args);
      };

      defer(counter);
      return counter;
    };

    clear = function clearImmediate(id) {
      delete queue$1[id];
    }; // Node.js 0.8-


    if (IS_NODE$2) {
      defer = function (id) {
        process$2.nextTick(runner(id));
      }; // Sphere (JS game engine) Dispatch API

    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      }; // Browsers with MessageChannel, includes WebWorkers
      // except iOS - https://github.com/zloirock/core-js/issues/624

    } else if (MessageChannel && !IS_IOS$1) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = bind$3(port.postMessage, port); // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (global$6.addEventListener && isCallable$1(global$6.postMessage) && !global$6.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
      defer = post;
      global$6.addEventListener('message', listener, false); // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) {
      defer = function (id) {
        html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
          html.removeChild(this);
          run(id);
        };
      }; // Rest old browsers

    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task$1 = {
    set: set,
    clear: clear
  };

  var userAgent$1 = engineUserAgent;
  var global$5 = global$D;
  var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && global$5.Pebble !== undefined;

  var userAgent = engineUserAgent;
  var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

  var global$4 = global$D;
  var bind$2 = functionBindContext;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var macrotask = task$1.set;
  var IS_IOS = engineIsIos;
  var IS_IOS_PEBBLE = engineIsIosPebble;
  var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
  var IS_NODE$1 = engineIsNode;
  var MutationObserver = global$4.MutationObserver || global$4.WebKitMutationObserver;
  var document$2 = global$4.document;
  var process$1 = global$4.process;
  var Promise$1 = global$4.Promise; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

  var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$4, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
  var flush, head, last, notify$1, toggle, node, promise, then; // modern engines have queueMicrotask method

  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();

      while (head) {
        fn = head.fn;
        head = head.next;

        try {
          fn();
        } catch (error) {
          if (head) notify$1();else last = undefined;
          throw error;
        }
      }

      last = undefined;
      if (parent) parent.enter();
    }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898


    if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, {
        characterData: true
      });

      notify$1 = function () {
        node.data = toggle = !toggle;
      }; // environments with maybe non-completely correct, but existent Promise

    } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined); // workaround of WebKit ~ iOS Safari 10.1 bug

      promise.constructor = Promise$1;
      then = bind$2(promise.then, promise);

      notify$1 = function () {
        then(flush);
      }; // Node.js without promises

    } else if (IS_NODE$1) {
      notify$1 = function () {
        process$1.nextTick(flush);
      }; // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout

    } else {
      // strange IE + webpack dev server bug - use .bind(global)
      macrotask = bind$2(macrotask, global$4);

      notify$1 = function () {
        macrotask(flush);
      };
    }
  }

  var microtask$1 = queueMicrotask || function (fn) {
    var task = {
      fn: fn,
      next: undefined
    };
    if (last) last.next = task;

    if (!head) {
      head = task;
      notify$1();
    }

    last = task;
  };

  var newPromiseCapability$2 = {};

  var aCallable$1 = aCallable$5;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aCallable$1(resolve);
    this.reject = aCallable$1(reject);
  }; // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability


  newPromiseCapability$2.f = function (C) {
    return new PromiseCapability(C);
  };

  var anObject = anObject$8;
  var isObject$1 = isObject$9;
  var newPromiseCapability$1 = newPromiseCapability$2;

  var promiseResolve$1 = function (C, x) {
    anObject(C);
    if (isObject$1(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability$1.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var global$3 = global$D;

  var hostReportErrors$1 = function (a, b) {
    var console = global$3.console;

    if (console && console.error) {
      arguments.length == 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform$1 = function (exec) {
    try {
      return {
        error: false,
        value: exec()
      };
    } catch (error) {
      return {
        error: true,
        value: error
      };
    }
  };

  var Queue$1 = function () {
    this.head = null;
    this.tail = null;
  };

  Queue$1.prototype = {
    add: function (item) {
      var entry = {
        item: item,
        next: null
      };
      if (this.head) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
    },
    get: function () {
      var entry = this.head;

      if (entry) {
        this.head = entry.next;
        if (this.tail === entry) this.tail = null;
        return entry.item;
      }
    }
  };
  var queue = Queue$1;

  var engineIsBrowser = typeof window == 'object';

  var $ = _export;
  var global$2 = global$D;
  var getBuiltIn = getBuiltIn$8;
  var call = functionCall;
  var NativePromise = nativePromiseConstructor;
  var redefine = redefine$4.exports;
  var redefineAll = redefineAll$1;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag = setToStringTag$1;
  var setSpecies = setSpecies$1;
  var aCallable = aCallable$5;
  var isCallable = isCallable$e;
  var isObject = isObject$9;
  var anInstance = anInstance$1;
  var inspectSource = inspectSource$4;
  var iterate = iterate$1;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
  var speciesConstructor = speciesConstructor$1;
  var task = task$1.set;
  var microtask = microtask$1;
  var promiseResolve = promiseResolve$1;
  var hostReportErrors = hostReportErrors$1;
  var newPromiseCapabilityModule = newPromiseCapability$2;
  var perform = perform$1;
  var Queue = queue;
  var InternalStateModule = internalState;
  var isForced = isForced_1;
  var wellKnownSymbol = wellKnownSymbol$d;
  var IS_BROWSER = engineIsBrowser;
  var IS_NODE = engineIsNode;
  var V8_VERSION = engineV8Version;
  var SPECIES = wellKnownSymbol('species');
  var PROMISE = 'Promise';
  var getInternalState = InternalStateModule.getterFor(PROMISE);
  var setInternalState = InternalStateModule.set;
  var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
  var NativePromisePrototype = NativePromise && NativePromise.prototype;
  var PromiseConstructor = NativePromise;
  var PromisePrototype = NativePromisePrototype;
  var TypeError$1 = global$2.TypeError;
  var document$1 = global$2.document;
  var process = global$2.process;
  var newPromiseCapability = newPromiseCapabilityModule.f;
  var newGenericPromiseCapability = newPromiseCapability;
  var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$2.dispatchEvent);
  var NATIVE_REJECTION_EVENT = isCallable(global$2.PromiseRejectionEvent);
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
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor); // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions

    if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true; // We need Promise#finally in the pure version for preventing prototype pollution
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679

    if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false; // Detect correctness of subclassing with @@species support

    var promise = new PromiseConstructor(function (resolve) {
      resolve(1);
    });

    var FakePromise = function (exec) {
      exec(function () {
        /* empty */
      }, function () {
        /* empty */
      });
    };

    var constructor = promise.constructor = {};
    constructor[SPECIES] = FakePromise;
    SUBCLASSING = promise.then(function () {
      /* empty */
    }) instanceof FakePromise;
    if (!SUBCLASSING) return true; // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

    return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
  });
  var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
    PromiseConstructor.all(iterable)['catch'](function () {
      /* empty */
    });
  }); // helpers

  var isThenable = function (it) {
    var then;
    return isObject(it) && isCallable(then = it.then) ? then : false;
  };

  var callReaction = function (reaction, state) {
    var value = state.value;
    var ok = state.state == FULFILLED;
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

        if (handler === true) result = value;else {
          if (domain) domain.enter();
          result = handler(value); // can throw

          if (domain) {
            domain.exit();
            exited = true;
          }
        }

        if (result === reaction.promise) {
          reject(TypeError$1('Promise-chain cycle'));
        } else if (then = isThenable(result)) {
          call(then, result, resolve, reject);
        } else resolve(result);
      } else reject(value);
    } catch (error) {
      if (domain && !exited) domain.exit();
      reject(error);
    }
  };

  var notify = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    microtask(function () {
      var reactions = state.reactions;
      var reaction;

      while (reaction = reactions.get()) {
        callReaction(reaction, state);
      }

      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;

    if (DISPATCH_EVENT) {
      event = document$1.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global$2.dispatchEvent(event);
    } else event = {
      promise: promise,
      reason: reason
    };

    if (!NATIVE_REJECTION_EVENT && (handler = global$2['on' + name])) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    call(task, global$2, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;

      if (IS_UNHANDLED) {
        result = perform(function () {
          if (IS_NODE) {
            process.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

        state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    call(task, global$2, function () {
      var promise = state.facade;

      if (IS_NODE) {
        process.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind$1 = function (fn, state, unwrap) {
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
      if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
      var then = isThenable(value);

      if (then) {
        microtask(function () {
          var wrapper = {
            done: false
          };

          try {
            call(then, value, bind$1(internalResolve, wrapper, state), bind$1(internalReject, wrapper, state));
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
      internalReject({
        done: false
      }, error, state);
    }
  }; // constructor polyfill


  if (FORCED) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromisePrototype);
      aCallable(executor);
      call(Internal, this);
      var state = getInternalState(this);

      try {
        executor(bind$1(internalResolve, state), bind$1(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };

    PromisePrototype = PromiseConstructor.prototype; // eslint-disable-next-line no-unused-vars -- required for `.length`

    Internal = function Promise(executor) {
      setInternalState(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: new Queue(),
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };

    Internal.prototype = redefineAll(PromisePrototype, {
      // `Promise.prototype.then` method
      // https://tc39.es/ecma262/#sec-promise.prototype.then
      // eslint-disable-next-line unicorn/no-thenable -- safe
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
        state.parent = true;
        reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
        reaction.fail = isCallable(onRejected) && onRejected;
        reaction.domain = IS_NODE ? process.domain : undefined;
        if (state.state == PENDING) state.reactions.add(reaction);else microtask(function () {
          callReaction(reaction, state);
        });
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
      this.resolve = bind$1(internalResolve, state);
      this.reject = bind$1(internalReject, state);
    };

    newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
    };

    if (isCallable(NativePromise) && NativePromisePrototype !== Object.prototype) {
      nativeThen = NativePromisePrototype.then;

      if (!SUBCLASSING) {
        // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
        redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            call(nativeThen, that, resolve, reject);
          }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
        }, {
          unsafe: true
        }); // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`

        redefine(NativePromisePrototype, 'catch', PromisePrototype['catch'], {
          unsafe: true
        });
      } // make `.constructor === Promise` work for native promise-based APIs


      try {
        delete NativePromisePrototype.constructor;
      } catch (error) {
        /* empty */
      } // make `instanceof Promise` work for native promise-based APIs


      if (setPrototypeOf) {
        setPrototypeOf(NativePromisePrototype, PromisePrototype);
      }
    }
  }

  $({
    global: true,
    wrap: true,
    forced: FORCED
  }, {
    Promise: PromiseConstructor
  });
  setToStringTag(PromiseConstructor, PROMISE, false);
  setSpecies(PROMISE);
  PromiseWrapper = getBuiltIn(PROMISE); // statics

  $({
    target: PROMISE,
    stat: true,
    forced: FORCED
  }, {
    // `Promise.reject` method
    // https://tc39.es/ecma262/#sec-promise.reject
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      call(capability.reject, undefined, r);
      return capability.promise;
    }
  });
  $({
    target: PROMISE,
    stat: true,
    forced: FORCED
  }, {
    // `Promise.resolve` method
    // https://tc39.es/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    }
  });
  $({
    target: PROMISE,
    stat: true,
    forced: INCORRECT_ITERATION
  }, {
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
          remaining++;
          call($promiseResolve, C, promise).then(function (value) {
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
          call($promiseResolve, C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

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

  var documentCreateElement = documentCreateElement$1;
  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;
  var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

  var bind = functionBindContext;
  var uncurryThis = functionUncurryThis;
  var IndexedObject = indexedObject;
  var toObject = toObject$3;
  var lengthOfArrayLike = lengthOfArrayLike$4;
  var arraySpeciesCreate = arraySpeciesCreate$2;
  var push = uncurryThis([].push); // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

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
      var boundFunction = bind(callbackfn, that);
      var length = lengthOfArrayLike(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
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
                push(target, value);
              // filter
            } else switch (TYPE) {
              case 4:
                return false;
              // every

              case 7:
                push(target, value);
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

  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict = arrayMethodIsStrict$2;
  var STRICT_METHOD = arrayMethodIsStrict('forEach'); // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach

  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn
  /* , thisArg */
  ) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var global$1 = global$D;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty = createNonEnumerableProperty$4;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    if (DOMIterables[COLLECTION_NAME]) {
      handlePrototype(global$1[COLLECTION_NAME] && global$1[COLLECTION_NAME].prototype);
    }
  }

  handlePrototype(DOMTokenListPrototype);

  var fastDeepEqual = function equal(a, b) {
    if (a === b) return true;

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      if (a.constructor !== b.constructor) return false;
      var length, i, keys;

      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) return false;

        for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;

        return true;
      }

      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;

      for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

      for (i = length; i-- !== 0;) {
        var key = keys[i];
        if (!equal(a[key], b[key])) return false;
      }

      return true;
    } // true if both NaN, false otherwise


    return a !== a && b !== b;
  };

  var DEFAULT_ID = "__googleMapsScriptId";
  /**
   * The status of the [[Loader]].
   */

  exports.LoaderStatus = void 0;

  (function (LoaderStatus) {
    LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
    LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
    LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
    LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
  })(exports.LoaderStatus || (exports.LoaderStatus = {}));
  /**
   * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
   * dynamically using
   * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
   * It works by dynamically creating and appending a script node to the the
   * document head and wrapping the callback function so as to return a promise.
   *
   * ```
   * const loader = new Loader({
   *   apiKey: "",
   *   version: "weekly",
   *   libraries: ["places"]
   * });
   *
   * loader.load().then((google) => {
   *   const map = new google.maps.Map(...)
   * })
   * ```
   */


  var Loader = /*#__PURE__*/function () {
    /**
     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
     * using this library, instead the defaults are set by the Google Maps
     * JavaScript API server.
     *
     * ```
     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
     * ```
     */
    function Loader(_ref) {
      var apiKey = _ref.apiKey,
          authReferrerPolicy = _ref.authReferrerPolicy,
          channel = _ref.channel,
          client = _ref.client,
          _ref$id = _ref.id,
          id = _ref$id === void 0 ? DEFAULT_ID : _ref$id,
          language = _ref.language,
          _ref$libraries = _ref.libraries,
          libraries = _ref$libraries === void 0 ? [] : _ref$libraries,
          mapIds = _ref.mapIds,
          nonce = _ref.nonce,
          region = _ref.region,
          _ref$retries = _ref.retries,
          retries = _ref$retries === void 0 ? 3 : _ref$retries,
          _ref$url = _ref.url,
          url = _ref$url === void 0 ? "https://maps.googleapis.com/maps/api/js" : _ref$url,
          version = _ref.version;

      _classCallCheck(this, Loader);

      this.CALLBACK = "__googleMapsCallback";
      this.callbacks = [];
      this.done = false;
      this.loading = false;
      this.errors = [];
      this.apiKey = apiKey;
      this.authReferrerPolicy = authReferrerPolicy;
      this.channel = channel;
      this.client = client;
      this.id = id || DEFAULT_ID; // Do not allow empty string

      this.language = language;
      this.libraries = libraries;
      this.mapIds = mapIds;
      this.nonce = nonce;
      this.region = region;
      this.retries = retries;
      this.url = url;
      this.version = version;

      if (Loader.instance) {
        if (!fastDeepEqual(this.options, Loader.instance.options)) {
          throw new Error("Loader must not be called again with different options. ".concat(JSON.stringify(this.options), " !== ").concat(JSON.stringify(Loader.instance.options)));
        }

        return Loader.instance;
      }

      Loader.instance = this;
    }

    _createClass(Loader, [{
      key: "options",
      get: function get() {
        return {
          version: this.version,
          apiKey: this.apiKey,
          channel: this.channel,
          client: this.client,
          id: this.id,
          libraries: this.libraries,
          language: this.language,
          region: this.region,
          mapIds: this.mapIds,
          nonce: this.nonce,
          url: this.url,
          authReferrerPolicy: this.authReferrerPolicy
        };
      }
    }, {
      key: "status",
      get: function get() {
        if (this.errors.length) {
          return exports.LoaderStatus.FAILURE;
        }

        if (this.done) {
          return exports.LoaderStatus.SUCCESS;
        }

        if (this.loading) {
          return exports.LoaderStatus.LOADING;
        }

        return exports.LoaderStatus.INITIALIZED;
      }
    }, {
      key: "failed",
      get: function get() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
      }
      /**
       * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
       *
       * @ignore
       */

    }, {
      key: "createUrl",
      value: function createUrl() {
        var url = this.url;
        url += "?callback=".concat(this.CALLBACK);

        if (this.apiKey) {
          url += "&key=".concat(this.apiKey);
        }

        if (this.channel) {
          url += "&channel=".concat(this.channel);
        }

        if (this.client) {
          url += "&client=".concat(this.client);
        }

        if (this.libraries.length > 0) {
          url += "&libraries=".concat(this.libraries.join(","));
        }

        if (this.language) {
          url += "&language=".concat(this.language);
        }

        if (this.region) {
          url += "&region=".concat(this.region);
        }

        if (this.version) {
          url += "&v=".concat(this.version);
        }

        if (this.mapIds) {
          url += "&map_ids=".concat(this.mapIds.join(","));
        }

        if (this.authReferrerPolicy) {
          url += "&auth_referrer_policy=".concat(this.authReferrerPolicy);
        }

        return url;
      }
    }, {
      key: "deleteScript",
      value: function deleteScript() {
        var script = document.getElementById(this.id);

        if (script) {
          script.remove();
        }
      }
      /**
       * Load the Google Maps JavaScript API script and return a Promise.
       */

    }, {
      key: "load",
      value: function load() {
        return this.loadPromise();
      }
      /**
       * Load the Google Maps JavaScript API script and return a Promise.
       *
       * @ignore
       */

    }, {
      key: "loadPromise",
      value: function loadPromise() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          _this.loadCallback(function (err) {
            if (!err) {
              resolve(window.google);
            } else {
              reject(err.error);
            }
          });
        });
      }
      /**
       * Load the Google Maps JavaScript API script with a callback.
       */

    }, {
      key: "loadCallback",
      value: function loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
      }
      /**
       * Set the script on document.
       */

    }, {
      key: "setScript",
      value: function setScript() {
        if (document.getElementById(this.id)) {
          // TODO wrap onerror callback for cases where the script was loaded elsewhere
          this.callback();
          return;
        }

        var url = this.createUrl();
        var script = document.createElement("script");
        script.id = this.id;
        script.type = "text/javascript";
        script.src = url;
        script.onerror = this.loadErrorCallback.bind(this);
        script.defer = true;
        script.async = true;

        if (this.nonce) {
          script.nonce = this.nonce;
        }

        document.head.appendChild(script);
      }
      /**
       * Reset the loader state.
       */

    }, {
      key: "reset",
      value: function reset() {
        this.deleteScript();
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.onerrorEvent = null;
      }
    }, {
      key: "resetIfRetryingFailed",
      value: function resetIfRetryingFailed() {
        if (this.failed) {
          this.reset();
        }
      }
    }, {
      key: "loadErrorCallback",
      value: function loadErrorCallback(e) {
        var _this2 = this;

        this.errors.push(e);

        if (this.errors.length <= this.retries) {
          var delay = this.errors.length * Math.pow(2, this.errors.length);
          console.log("Failed to load Google Maps script, retrying in ".concat(delay, " ms."));
          setTimeout(function () {
            _this2.deleteScript();

            _this2.setScript();
          }, delay);
        } else {
          this.onerrorEvent = e;
          this.callback();
        }
      }
    }, {
      key: "setCallback",
      value: function setCallback() {
        window.__googleMapsCallback = this.callback.bind(this);
      }
    }, {
      key: "callback",
      value: function callback() {
        var _this3 = this;

        this.done = true;
        this.loading = false;
        this.callbacks.forEach(function (cb) {
          cb(_this3.onerrorEvent);
        });
        this.callbacks = [];
      }
    }, {
      key: "execute",
      value: function execute() {
        this.resetIfRetryingFailed();

        if (this.done) {
          this.callback();
        } else {
          // short circuit and warn if google.maps is already loaded
          if (window.google && window.google.maps && window.google.maps.version) {
            console.warn("Google Maps already loaded outside @googlemaps/js-api-loader." + "This may result in undesirable behavior as options and script parameters may not match.");
            this.callback();
            return;
          }

          if (this.loading) ; else {
            this.loading = true;
            this.setCallback();
            this.setScript();
          }
        }
      }
    }]);

    return Loader;
  }();

  exports.DEFAULT_ID = DEFAULT_ID;
  exports.Loader = Loader;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
