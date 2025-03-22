(function () {
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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
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

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

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

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable = function (argument) {
    return typeof argument === 'function';
  };

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : isCallable(it);
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`


  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

  var domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
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

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isPure = false;

  var setGlobal = function (key, value) {
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty(global_1, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store;

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.18.3',
    mode: isPure ? 'pure' : 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
  });

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var hasOwnProperty = {}.hasOwnProperty;

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject(it), key);
  };

  var id$1 = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix).toString(36);
  };

  var aFunction = function (argument) {
    return isCallable(argument) ? argument : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global_1[namespace]) : global_1[namespace] && global_1[namespace][method];
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global_1.process;
  var Deno = global_1.Deno;
  var versions = process && process.versions || Deno && Deno.version;
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
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && engineV8Version && engineV8Version < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */


  var useSymbolAsUid = nativeSymbol
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!hasOwnProperty_1(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
      if (nativeSymbol && hasOwnProperty_1(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
      }
    } return WellKnownSymbolsStore[name];
  };

  // `Assert: Type(argument) is Object`
  var anObject = function (argument) {
    if (isObject(argument)) return argument;
    throw TypeError(String(argument) + ' is not an object');
  };

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var isSymbol = useSymbolAsUid ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && Object(it) instanceof $Symbol;
  };

  var tryToString = function (argument) {
    try {
      return String(argument);
    } catch (error) {
      return 'Object';
    }
  };

  // `Assert: IsCallable(argument) is true`
  var aCallable = function (argument) {
    if (isCallable(argument)) return argument;
    throw TypeError(tryToString(argument) + ' is not a function');
  };

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable(func);
  };

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = fn.call(input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = fn.call(input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive = function (input, pref) {
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

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : String(key);
  };

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f = descriptors ? $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
  };

  var max = Math.max;
  var min = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max(integer + length, 0) : min(integer, length);
  };

  var min$1 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min$1(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike = function (obj) {
    return toLength(obj.length);
  };

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

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };

  var hiddenKeys = {};

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwnProperty_1(hiddenKeys, key) && hasOwnProperty_1(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwnProperty_1(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
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

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  /* global ActiveXObject -- old IE, WSH */








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
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var functionToString = Function.toString;

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable(sharedStore.inspectSource)) {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap$1 = global_1.WeakMap;

  var nativeWeakMap = isCallable(WeakMap$1) && /native code/.test(inspectSource(WeakMap$1));

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap$2 = global_1.WeakMap;
  var set$1, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap || sharedStore.state) {
    var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$2());
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;
    set$1 = function (it, metadata) {
      if (wmhas.call(store$1, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store$1, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store$1, it) || {};
    };
    has = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set$1 = function (it, metadata) {
      if (hasOwnProperty_1(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwnProperty_1(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwnProperty_1(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$1
  };

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$2 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey(P);
    if (ie8DomDefine) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (hasOwnProperty_1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$2
  };

  var FunctionPrototype = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = descriptors && Object.getOwnPropertyDescriptor;

  var EXISTS$1 = hasOwnProperty_1(FunctionPrototype, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS$1 && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS$1 && (!descriptors || (descriptors && getDescriptor(FunctionPrototype, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS$1,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var redefine = createCommonjsModule(function (module) {
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;

  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
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
      if (!hasOwnProperty_1(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
        createNonEnumerableProperty(value, 'name', name);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }
    if (O === global_1) {
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
  });

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys$1(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwnProperty_1(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

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

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






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
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
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

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO$1 = sharedKey('IE_PROTO');
  var ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
    var object = toObject(O);
    if (hasOwnProperty_1(object, IE_PROTO$1)) return object[IE_PROTO$1];
    var constructor = object.constructor;
    if (isCallable(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof Object ? ObjectPrototype : null;
  };

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
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype[ITERATOR].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable(IteratorPrototype[ITERATOR])) {
    redefine(IteratorPrototype, ITERATOR, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  };

  var defineProperty = objectDefineProperty.f;



  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !hasOwnProperty_1(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
      defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

  var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
    return IteratorConstructor;
  };

  var aPossiblePrototype = function (argument) {
    if (typeof argument === 'object' || isCallable(argument)) return argument;
    throw TypeError("Can't set " + String(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */



  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
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

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis$1 = function () { return this; };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
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
    var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (!isPure && objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (!isCallable(CurrentIteratorPrototype[ITERATOR$1])) {
            redefine(CurrentIteratorPrototype, ITERATOR$1, returnThis$1);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (!isPure && CONFIGURABLE_FUNCTION_NAME) {
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
        if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if ((!isPure || FORCED) && IterablePrototype[ITERATOR$1] !== defaultIterator) {
      redefine(IterablePrototype, ITERATOR$1, defaultIterator, { name: DEFAULT });
    }

    return methods;
  };

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

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
  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
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

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  var ArrayValues = es_array_iterator.values;

  var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$2] = ArrayValues;
      }
      if (!CollectionPrototype[TO_STRING_TAG$1]) {
        createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$1, COLLECTION_NAME);
      }
      if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
        }
      }
    }
  };

  for (var COLLECTION_NAME in domIterables) {
    handlePrototype(global_1[COLLECTION_NAME] && global_1[COLLECTION_NAME].prototype, COLLECTION_NAME);
  }

  handlePrototype(domTokenListPrototype, 'DOMTokenList');

  var timerDebounce = undefined;
  function debounce(duration, callback) {
    clearTimeout(timerDebounce);
    timerDebounce = setTimeout(function () {
      callback();
    }, duration);
    return timerDebounce;
  }
  function transitionAsPromise(triggeringFunc, el) {
    return new Promise(function (resolve) {
      var handleTransitionEnd = function handleTransitionEnd() {
        el.removeEventListener('transitionend', handleTransitionEnd);
        resolve();
      };

      el.addEventListener('transitionend', handleTransitionEnd);
      var classesBefore = el.getAttribute('class');
      var stylesBefore = el.getAttribute('style');
      triggeringFunc();

      if (classesBefore === el.getAttribute('class') && stylesBefore === el.getAttribute('style')) {
        handleTransitionEnd();
      }

      if (parseFloat(getComputedStyle(el)['transitionDuration']) === 0) {
        handleTransitionEnd();
      }
    });
  }
  function loadImage(_ref) {
    var src = _ref.src,
        srcset = _ref.srcset,
        sizes = _ref.sizes;
    var image = new Image();
    image.src = src;

    if (srcset) {
      image.srcset = srcset;
    }

    if (sizes) {
      image.sizes = sizes;
    }

    if ('decode' in image) {
      return new Promise(function (resolve, reject) {
        image.decode().then(function () {
          resolve(image);
        })["catch"](function () {
          reject(image);
        });
      });
    } else {
      return new Promise(function (resolve, reject) {
        image.onload = resolve(image);
        image.onerror = reject(image);
      });
    }
  }
  function fit(options) {
    var height;
    var width;
    var imgHeight = options.imgHeight,
        imgWidth = options.imgWidth,
        containerHeight = options.containerHeight,
        containerWidth = options.containerWidth,
        canvasWidth = options.canvasWidth,
        canvasHeight = options.canvasHeight,
        imageSize = options.imageSize;
    var canvasRatio = canvasHeight / canvasWidth;
    var containerRatio = containerHeight / containerWidth;
    var imgRatio = imgHeight / imgWidth;

    if (imageSize == 'cover') {
      if (imgRatio < containerRatio) {
        height = containerHeight;
        width = height / imgRatio;
      } else {
        width = containerWidth;
        height = width * imgRatio;
      }
    } else if (imageSize == 'native') {
      height = imgHeight;
      width = imgWidth;
    } else {
      if (imgRatio > canvasRatio) {
        height = canvasHeight;
        width = height / imgRatio;
      } else {
        width = canvasWidth;
        height = width * imgRatio;
      }

      if (imageSize === 'scale-down' && (width >= imgWidth || height >= imgHeight)) {
        width = imgWidth;
        height = imgHeight;
      }
    }

    return {
      height: height,
      width: width
    };
  }
  function openFullScreen(wrapper) {
    if (wrapper.requestFullscreen) {
      return wrapper.requestFullscreen();
    } else if (wrapper.webkitRequestFullscreen) {
      return wrapper.webkitRequestFullscreen();
    } else if (wrapper.msRequestFullscreen) {
      return wrapper.msRequestFullscreen();
    } else {
      return Promise.reject();
    }
  }
  function exitFullScreen() {
    if (document.exitFullscreen) {
      return document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      return document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      return document.msExitFullscreen();
    } else {
      return Promise.reject();
    }
  }

  var defaults = {
    container: document.body,
    // window or element
    className: undefined,
    imageSize: 'scale-down',
    // 'scale-down', 'contain', 'cover' or 'native'
    fullScreen: false,
    loop: false,
    linkImages: true,
    setIndex: 0,
    firstImageIndex: 0,
    lastImageIndex: false,
    currentImageIndex: undefined,
    allowZoom: true,
    closeOnBackgroundClick: true,
    imageSourceAttribute: 'href',
    setTitle: function setTitle() {
      return '';
    },
    description: function description() {
      return this.images[this.settings.currentImageIndex].title;
    },
    pagination: function pagination() {
      var last = this.settings.lastImageIndex + 1;
      var position = this.settings.currentImageIndex + 1;
      return position + '/' + last;
    },
    afterInitialize: function afterInitialize() {},
    afterMarkup: function afterMarkup() {},
    beforeImageLoad: function beforeImageLoad() {},
    afterImageLoad: function afterImageLoad() {},
    afterClose: function afterClose() {},
    zoomedPaddingX: function zoomedPaddingX(canvasWidth, imgWidth) {
      return 0;
    },
    zoomedPaddingY: function zoomedPaddingY(canvasHeight, imgHeight) {
      return 0;
    }
  };
  var Chocolat = /*#__PURE__*/function () {
    function Chocolat(elements, settings) {
      var _this = this;

      _classCallCheck(this, Chocolat);

      this.settings = settings;
      this.elems = {};
      this.images = [];
      this.events = [];
      this.state = {
        fullScreenOpen: false,
        initialZoomState: null,
        initialized: false,
        timer: false,
        visible: false
      };
      this._cssClasses = ['chocolat-open', 'chocolat-in-container', 'chocolat-cover', 'chocolat-zoomable', 'chocolat-zoomed', 'chocolat-zooming-in', 'chocolat-zooming-out'];

      if (NodeList.prototype.isPrototypeOf(elements) || HTMLCollection.prototype.isPrototypeOf(elements)) {
        elements.forEach(function (el, i) {
          _this.images.push({
            title: el.getAttribute('title'),
            src: el.getAttribute(settings.imageSourceAttribute),
            srcset: el.getAttribute('data-srcset'),
            sizes: el.getAttribute('data-sizes')
          });

          _this.off(el, 'click.chocolat');

          _this.on(el, 'click.chocolat', function (e) {
            _this.init(i);

            e.preventDefault();
          });
        });
      } else {
        this.images = elements;
      }

      if (this.settings.container instanceof Element || this.settings.container instanceof HTMLElement) {
        this.elems.container = this.settings.container;
      } else {
        this.elems.container = document.body;
      }

      this.api = {
        open: function open(i) {
          i = parseInt(i) || 0;
          return _this.init(i);
        },
        close: function close() {
          return _this.close();
        },
        next: function next() {
          return _this.change(1);
        },
        prev: function prev() {
          return _this.change(-1);
        },
        "goto": function goto(i) {
          return _this.open(i);
        },
        current: function current() {
          return _this.settings.currentImageIndex;
        },
        position: function position() {
          return _this.position(_this.elems.img);
        },
        destroy: function destroy() {
          return _this.destroy();
        },
        set: function set(property, value) {
          _this.settings[property] = value;
          return value;
        },
        get: function get(property) {
          return _this.settings[property];
        },
        getElem: function getElem(name) {
          return _this.elems[name];
        }
      };
    }

    _createClass(Chocolat, [{
      key: "init",
      value: function init(i) {
        if (!this.state.initialized) {
          this.markup();
          this.attachListeners();
          this.settings.lastImageIndex = this.images.length - 1;
          this.state.initialized = true;
        }

        this.settings.afterInitialize.call(this);
        return this.load(i);
      }
    }, {
      key: "load",
      value: function load(index) {
        var _this2 = this;

        this.settings.beforeImageLoad.call(this);

        if (!this.state.visible) {
          this.state.visible = true;
          setTimeout(function () {
            _this2.elems.overlay.classList.add('chocolat-visible');

            _this2.elems.wrapper.classList.add('chocolat-visible');
          }, 0);
          this.elems.container.classList.add('chocolat-open');
        }

        if (this.settings.fullScreen) {
          openFullScreen(this.elems.wrapper);
        }

        if (this.settings.currentImageIndex === index) {
          return Promise.resolve();
        }

        var loaderTimer = setTimeout(function () {
          _this2.elems.loader.classList.add('chocolat-visible');
        }, 1000);
        var fadeOutPromise;
        var image;
        var fadeOutTimer = setTimeout(function () {
          fadeOutTimer = undefined;
          fadeOutPromise = transitionAsPromise(function () {
            _this2.elems.imageCanvas.classList.remove('chocolat-visible');
          }, _this2.elems.imageCanvas);
        }, 80);
        return loadImage(this.images[index]).then(function (loadedImage) {
          image = loadedImage;

          if (fadeOutTimer) {
            clearTimeout(fadeOutTimer);
            return Promise.resolve();
          } else {
            return fadeOutPromise;
          }
        }).then(function () {
          var nextIndex = index + 1;

          if (_this2.images[nextIndex] != undefined) {
            loadImage(_this2.images[nextIndex]);
          }

          _this2.settings.currentImageIndex = index;
          _this2.elems.description.textContent = _this2.settings.description.call(_this2);
          _this2.elems.pagination.textContent = _this2.settings.pagination.call(_this2);

          _this2.arrows();

          return _this2.position(image).then(function () {
            _this2.elems.loader.classList.remove('chocolat-visible');

            clearTimeout(loaderTimer);
            return _this2.appear(image);
          });
        }).then(function () {
          _this2.elems.container.classList.toggle('chocolat-zoomable', _this2.zoomable(image, _this2.elems.wrapper));

          _this2.settings.afterImageLoad.call(_this2);
        });
      }
    }, {
      key: "position",
      value: function position(_ref) {
        var _this3 = this;

        var naturalHeight = _ref.naturalHeight,
            naturalWidth = _ref.naturalWidth;
        var fitOptions = {
          imgHeight: naturalHeight,
          imgWidth: naturalWidth,
          containerHeight: this.elems.container.clientHeight,
          containerWidth: this.elems.container.clientWidth,
          canvasWidth: this.elems.imageCanvas.clientWidth,
          canvasHeight: this.elems.imageCanvas.clientHeight,
          imageSize: this.settings.imageSize
        };

        var _fit = fit(fitOptions),
            width = _fit.width,
            height = _fit.height;

        return transitionAsPromise(function () {
          Object.assign(_this3.elems.imageWrapper.style, {
            width: width + 'px',
            height: height + 'px'
          });
        }, this.elems.imageWrapper);
      }
    }, {
      key: "appear",
      value: function appear(image) {
        var _this4 = this;

        this.elems.imageWrapper.removeChild(this.elems.img);
        this.elems.img = image;
        this.elems.img.setAttribute('class', 'chocolat-img');
        this.elems.imageWrapper.appendChild(this.elems.img);
        var fadeInPromise = transitionAsPromise(function () {
          _this4.elems.imageCanvas.classList.add('chocolat-visible');
        }, this.elems.imageCanvas);
        return fadeInPromise;
      }
    }, {
      key: "change",
      value: function change(step) {
        if (!this.state.visible) {
          return;
        }

        if (!this.settings.linkImages) {
          return;
        }

        this.zoomOut();
        var requestedImage = this.settings.currentImageIndex + parseInt(step);

        if (requestedImage > this.settings.lastImageIndex) {
          if (this.settings.loop) {
            return this.load(this.settings.firstImageIndex);
          }
        } else if (requestedImage < this.settings.firstImageIndex) {
          if (this.settings.loop) {
            return this.load(this.settings.lastImageIndex);
          }
        } else {
          return this.load(requestedImage);
        }
      }
    }, {
      key: "arrows",
      value: function arrows() {
        if (this.settings.loop) {
          this.elems.left.classList.add('active');
          this.elems.right.classList.add('active');
        } else if (this.settings.linkImages) {
          this.elems.right.classList.toggle('active', this.settings.currentImageIndex !== this.settings.lastImageIndex);
          this.elems.left.classList.toggle('active', this.settings.currentImageIndex !== this.settings.firstImageIndex);
        } else {
          this.elems.left.classList.remove('active');
          this.elems.right.classList.remove('active');
        }
      }
    }, {
      key: "close",
      value: function close() {
        var _this5 = this;

        if (this.state.fullScreenOpen) {
          exitFullScreen();
          return;
        }

        this.state.visible = false;
        var promiseOverlay = transitionAsPromise(function () {
          _this5.elems.overlay.classList.remove('chocolat-visible');
        }, this.elems.overlay);
        var promiseWrapper = transitionAsPromise(function () {
          _this5.elems.wrapper.classList.remove('chocolat-visible');
        }, this.elems.wrapper);
        return Promise.all([promiseOverlay, promiseWrapper]).then(function () {
          _this5.elems.container.classList.remove('chocolat-open');

          _this5.settings.afterClose.call(_this5);
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this$elems$container;

        for (var i = this.events.length - 1; i >= 0; i--) {
          var _this$events$i = this.events[i],
              element = _this$events$i.element,
              eventName = _this$events$i.eventName;
          this.off(element, eventName);
        }

        if (!this.state.initialized) {
          return;
        }

        if (this.state.fullScreenOpen) {
          exitFullScreen();
        }

        this.settings.currentImageIndex = undefined;
        this.state.visible = false;
        this.state.initialized = false;

        (_this$elems$container = this.elems.container.classList).remove.apply(_this$elems$container, _toConsumableArray(this._cssClasses));

        this.elems.wrapper.parentNode.removeChild(this.elems.wrapper);
      }
    }, {
      key: "markup",
      value: function markup() {
        this.elems.container.classList.add('chocolat-open', this.settings.className);

        if (this.settings.imageSize == 'cover') {
          this.elems.container.classList.add('chocolat-cover');
        }

        if (this.elems.container !== document.body) {
          this.elems.container.classList.add('chocolat-in-container');
        }

        this.elems.wrapper = document.createElement('div');
        this.elems.wrapper.setAttribute('id', 'chocolat-content-' + this.settings.setIndex);
        this.elems.wrapper.setAttribute('class', 'chocolat-wrapper');
        this.elems.container.appendChild(this.elems.wrapper);
        this.elems.overlay = document.createElement('div');
        this.elems.overlay.setAttribute('class', 'chocolat-overlay');
        this.elems.wrapper.appendChild(this.elems.overlay);
        this.elems.loader = document.createElement('div');
        this.elems.loader.setAttribute('class', 'chocolat-loader');
        this.elems.wrapper.appendChild(this.elems.loader);
        this.elems.layout = document.createElement('div');
        this.elems.layout.setAttribute('class', 'chocolat-layout');
        this.elems.wrapper.appendChild(this.elems.layout);
        this.elems.top = document.createElement('div');
        this.elems.top.setAttribute('class', 'chocolat-top');
        this.elems.layout.appendChild(this.elems.top);
        this.elems.center = document.createElement('div');
        this.elems.center.setAttribute('class', 'chocolat-center');
        this.elems.layout.appendChild(this.elems.center);
        this.elems.left = document.createElement('div');
        this.elems.left.setAttribute('class', 'chocolat-left');
        this.elems.center.appendChild(this.elems.left);
        this.elems.imageCanvas = document.createElement('div');
        this.elems.imageCanvas.setAttribute('class', 'chocolat-image-canvas');
        this.elems.center.appendChild(this.elems.imageCanvas);
        this.elems.imageWrapper = document.createElement('div');
        this.elems.imageWrapper.setAttribute('class', 'chocolat-image-wrapper');
        this.elems.imageCanvas.appendChild(this.elems.imageWrapper);
        this.elems.img = document.createElement('img');
        this.elems.img.setAttribute('class', 'chocolat-img');
        this.elems.imageWrapper.appendChild(this.elems.img);
        this.elems.right = document.createElement('div');
        this.elems.right.setAttribute('class', 'chocolat-right');
        this.elems.center.appendChild(this.elems.right);
        this.elems.bottom = document.createElement('div');
        this.elems.bottom.setAttribute('class', 'chocolat-bottom');
        this.elems.layout.appendChild(this.elems.bottom);
        this.elems.close = document.createElement('span');
        this.elems.close.setAttribute('class', 'chocolat-close');
        this.elems.top.appendChild(this.elems.close);
        this.elems.description = document.createElement('span');
        this.elems.description.setAttribute('class', 'chocolat-description');
        this.elems.bottom.appendChild(this.elems.description);
        this.elems.pagination = document.createElement('span');
        this.elems.pagination.setAttribute('class', 'chocolat-pagination');
        this.elems.bottom.appendChild(this.elems.pagination);
        this.elems.setTitle = document.createElement('span');
        this.elems.setTitle.setAttribute('class', 'chocolat-set-title');
        this.elems.setTitle.textContent = this.settings.setTitle();
        this.elems.bottom.appendChild(this.elems.setTitle);
        this.elems.fullscreen = document.createElement('span');
        this.elems.fullscreen.setAttribute('class', 'chocolat-fullscreen');
        this.elems.bottom.appendChild(this.elems.fullscreen);
        this.settings.afterMarkup.call(this);
      }
    }, {
      key: "attachListeners",
      value: function attachListeners() {
        var _this6 = this;

        this.off(document, 'keydown.chocolat');
        this.on(document, 'keydown.chocolat', function (e) {
          if (_this6.state.initialized) {
            if (e.keyCode == 37) {
              _this6.change(-1);
            } else if (e.keyCode == 39) {
              _this6.change(1);
            } else if (e.keyCode == 27) {
              _this6.close();
            }
          }
        });
        var right = this.elems.wrapper.querySelector('.chocolat-right');
        this.off(right, 'click.chocolat');
        this.on(right, 'click.chocolat', function () {
          _this6.change(+1);
        });
        var left = this.elems.wrapper.querySelector('.chocolat-left');
        this.off(left, 'click.chocolat');
        this.on(left, 'click.chocolat', function () {
          _this6.change(-1);
        });
        this.off(this.elems.close, 'click.chocolat');
        this.on(this.elems.close, 'click.chocolat', this.close.bind(this));
        this.off(this.elems.fullscreen, 'click.chocolat');
        this.on(this.elems.fullscreen, 'click.chocolat', function () {
          if (_this6.state.fullScreenOpen) {
            exitFullScreen();
            return;
          }

          openFullScreen(_this6.elems.wrapper);
        });
        this.off(document, 'fullscreenchange.chocolat');
        this.on(document, 'fullscreenchange.chocolat', function () {
          if (document.fullscreenElement || document.webkitCurrentFullScreenElement || document.webkitFullscreenElement) {
            _this6.state.fullScreenOpen = true;
          } else {
            _this6.state.fullScreenOpen = false;
          }
        });
        this.off(document, 'webkitfullscreenchange.chocolat');
        this.on(document, 'webkitfullscreenchange.chocolat', function () {
          if (document.fullscreenElement || document.webkitCurrentFullScreenElement || document.webkitFullscreenElement) {
            _this6.state.fullScreenOpen = true;
          } else {
            _this6.state.fullScreenOpen = false;
          }
        });

        if (this.settings.closeOnBackgroundClick) {
          this.off(this.elems.overlay, 'click.chocolat');
          this.on(this.elems.overlay, 'click.chocolat', this.close.bind(this));
        }

        this.off(this.elems.wrapper, 'click.chocolat');
        this.on(this.elems.wrapper, 'click.chocolat', function () {
          if (_this6.state.initialZoomState === null || !_this6.state.visible) {
            return;
          }

          _this6.elems.container.classList.add('chocolat-zooming-out');

          _this6.zoomOut().then(function () {
            _this6.elems.container.classList.remove('chocolat-zoomed');

            _this6.elems.container.classList.remove('chocolat-zooming-out');
          });
        });
        this.off(this.elems.imageWrapper, 'click.chocolat');
        this.on(this.elems.imageWrapper, 'click.chocolat', function (e) {
          if (_this6.state.initialZoomState === null && _this6.elems.container.classList.contains('chocolat-zoomable')) {
            e.stopPropagation();

            _this6.elems.container.classList.add('chocolat-zooming-in');

            _this6.zoomIn(e).then(function () {
              _this6.elems.container.classList.add('chocolat-zoomed');

              _this6.elems.container.classList.remove('chocolat-zooming-in');
            });
          }
        });
        this.on(this.elems.wrapper, 'mousemove.chocolat', function (e) {
          if (_this6.state.initialZoomState === null || !_this6.state.visible) {
            return;
          }

          var rect = _this6.elems.wrapper.getBoundingClientRect();

          var pos = {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
          };
          var height = _this6.elems.wrapper.clientHeight;
          var width = _this6.elems.wrapper.clientWidth;
          var imgWidth = _this6.elems.img.width;
          var imgHeight = _this6.elems.img.height;
          var coord = [e.pageX - width / 2 - pos.left, e.pageY - height / 2 - pos.top];
          var mvtX = 0;

          if (imgWidth > width) {
            var paddingX = _this6.settings.zoomedPaddingX(imgWidth, width);

            mvtX = coord[0] / (width / 2);
            mvtX = ((imgWidth - width) / 2 + paddingX) * mvtX;
          }

          var mvtY = 0;

          if (imgHeight > height) {
            var paddingY = _this6.settings.zoomedPaddingY(imgHeight, height);

            mvtY = coord[1] / (height / 2);
            mvtY = ((imgHeight - height) / 2 + paddingY) * mvtY;
          }

          _this6.elems.img.style.marginLeft = -mvtX + 'px';
          _this6.elems.img.style.marginTop = -mvtY + 'px';
        });
        this.on(window, 'resize.chocolat', function (e) {
          if (!_this6.state.initialized || !_this6.state.visible) {
            return;
          }

          debounce(50, function () {
            var fitOptions = {
              imgHeight: _this6.elems.img.naturalHeight,
              imgWidth: _this6.elems.img.naturalWidth,
              containerHeight: _this6.elems.wrapper.clientHeight,
              containerWidth: _this6.elems.wrapper.clientWidth,
              canvasWidth: _this6.elems.imageCanvas.clientWidth,
              canvasHeight: _this6.elems.imageCanvas.clientHeight,
              imageSize: _this6.settings.imageSize
            };

            var _fit2 = fit(fitOptions);

            _this6.position(_this6.elems.img).then(function () {
              _this6.elems.container.classList.toggle('chocolat-zoomable', _this6.zoomable(_this6.elems.img, _this6.elems.wrapper));
            });
          });
        });
      }
    }, {
      key: "zoomable",
      value: function zoomable(image, wrapper) {
        var wrapperWidth = wrapper.clientWidth;
        var wrapperHeight = wrapper.clientHeight;
        var isImageZoomable = this.settings.allowZoom && (image.naturalWidth > wrapperWidth || image.naturalHeight > wrapperHeight) ? true : false;
        var isImageStretched = image.clientWidth > image.naturalWidth || image.clientHeight > image.naturalHeight;
        return isImageZoomable && !isImageStretched;
      }
    }, {
      key: "zoomIn",
      value: function zoomIn(e) {
        this.state.initialZoomState = this.settings.imageSize;
        this.settings.imageSize = 'native';
        return this.position(this.elems.img);
      }
    }, {
      key: "zoomOut",
      value: function zoomOut(e) {
        this.settings.imageSize = this.state.initialZoomState || this.settings.imageSize;
        this.state.initialZoomState = null;
        this.elems.img.style.margin = 0;
        return this.position(this.elems.img);
      }
    }, {
      key: "on",
      value: function on(element, eventName, cb) {
        // const eventName = this.settings.setIndex + '-' + eventName
        var length = this.events.push({
          element: element,
          eventName: eventName,
          cb: cb
        });
        element.addEventListener(eventName.split('.')[0], this.events[length - 1].cb);
      }
    }, {
      key: "off",
      value: function off(element, eventName) {
        // const eventName = this.settings.setIndex + '-' + eventName
        var index = this.events.findIndex(function (event) {
          return event.element === element && event.eventName === eventName;
        });

        if (this.events[index]) {
          element.removeEventListener(eventName.split('.')[0], this.events[index].cb);
          this.events.splice(index, 1);
        }
      }
    }]);

    return Chocolat;
  }();

  var instances = [];

  window.Chocolat = function (elements, options) {
    var settings = Object.assign({}, defaults, {
      images: []
    }, options, {
      setIndex: instances.length
    });
    var instance = new Chocolat(elements, settings);
    instances.push(instance);
    return instance;
  };

}());
