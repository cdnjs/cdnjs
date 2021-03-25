/*!
 * Intro.js v3.4.0
 * https://introjs.com
 *
 * Copyright (C) 2012-2021 Afshin Mehrabani (@afshinmeh).
 * https://raw.githubusercontent.com/usablica/intro.js/master/license.md
 *
 * Date: Thu, 25 Mar 2021 09:48:49 GMT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.introJs = factory());
}(this, (function () { 'use strict';

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

  /**
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   * via: http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
   *
   * @param obj1
   * @param obj2
   * @returns obj3 a new object based on obj1 and obj2
   */
  function mergeOptions(obj1, obj2) {
    var obj3 = {};
    var attrname;

    for (attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }

    for (attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }

    return obj3;
  }

  /**
   * Mark any object with an incrementing number
   * used for keeping track of objects
   *
   * @param Object obj   Any object or DOM Element
   * @param String key
   * @return Object
   */
  var stamp = function () {
    var keys = {};
    return function stamp(obj) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "introjs-stamp";
      // each group increments from 0
      keys[key] = keys[key] || 0; // stamp only once per object

      if (obj[key] === undefined) {
        // increment key for each new object
        obj[key] = keys[key]++;
      }

      return obj[key];
    };
  }();

  /**
   * Iterates arrays
   *
   * @param {Array} arr
   * @param {Function} forEachFnc
   * @param {Function} completeFnc
   * @return {Null}
   */
  function forEach(arr, forEachFnc, completeFnc) {
    // in case arr is an empty query selector node list
    if (arr) {
      for (var i = 0, len = arr.length; i < len; i++) {
        forEachFnc(arr[i], i);
      }
    }

    if (typeof completeFnc === "function") {
      completeFnc();
    }
  }

  /**
   * DOMEvent Handles all DOM events
   *
   * methods:
   *
   * on - add event handler
   * off - remove event
   */

  var DOMEvent = function () {
    function DOMEvent() {
      var events_key = "introjs_event";
      /**
       * Gets a unique ID for an event listener
       *
       * @param obj Object
       * @param type event type
       * @param listener Function
       * @param context Object
       * @return String
       */

      this._id = function (obj, type, listener, context) {
        return type + stamp(listener) + (context ? "_".concat(stamp(context)) : "");
      };
      /**
       * Adds event listener
       *
       * @param obj Object obj
       * @param type String
       * @param listener Function
       * @param context Object
       * @param useCapture Boolean
       * @return null
       */


      this.on = function (obj, type, listener, context, useCapture) {
        var id = this._id.apply(this, arguments);

        var handler = function handler(e) {
          return listener.call(context || obj, e || window.event);
        };

        if ("addEventListener" in obj) {
          obj.addEventListener(type, handler, useCapture);
        } else if ("attachEvent" in obj) {
          obj.attachEvent("on".concat(type), handler);
        }

        obj[events_key] = obj[events_key] || {};
        obj[events_key][id] = handler;
      };
      /**
       * Removes event listener
       *
       * @param obj Object
       * @param type String
       * @param listener Function
       * @param context Object
       * @param useCapture Boolean
       * @return null
       */


      this.off = function (obj, type, listener, context, useCapture) {
        var id = this._id.apply(this, arguments);

        var handler = obj[events_key] && obj[events_key][id];

        if (!handler) {
          return;
        }

        if ("removeEventListener" in obj) {
          obj.removeEventListener(type, handler, useCapture);
        } else if ("detachEvent" in obj) {
          obj.detachEvent("on".concat(type), handler);
        }

        obj[events_key][id] = null;
      };
    }

    return new DOMEvent();
  }();

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    /* global globalThis -- safe */
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f
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

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$1
  };

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$2
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store;

  var functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap = global_1.WeakMap;

  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.9.1',
    mode:  'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;
    set = function (it, metadata) {
      metadata.facade = it;
      wmset.call(store$1, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store$1, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(String).split('String');

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) {
        createNonEnumerableProperty(value, 'name', key);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
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
    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
  });
  });

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
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

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
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

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
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

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
  // so we use an intermediate function.
  function RE(s, f) {
    return RegExp(s, f);
  }

  var UNSUPPORTED_Y = fails(function () {
    // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
    var re = RE('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  var BROKEN_CARET = fails(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = RE('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var regexpStickyHelpers = {
  	UNSUPPORTED_Y: UNSUPPORTED_Y,
  	BROKEN_CARET: BROKEN_CARET
  };

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;
      var sticky = UNSUPPORTED_Y$1 && re.sticky;
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
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
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
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
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

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  _export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
    exec: regexpExec
  });

  var engineIsNode = classofRaw(global_1.process) == 'process';

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global_1.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] + match[1];
  } else if (engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    /* global Symbol -- required for testing */
    return !Symbol.sham &&
      // Chrome 38 Symbol has incorrect toString conversion
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      (engineIsNode ? engineV8Version === 38 : engineV8Version > 37 && engineV8Version < 41);
  });

  var useSymbolAsUid = nativeSymbol
    /* global Symbol -- safe */
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!has(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
      if (nativeSymbol && has(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
      }
    } return WellKnownSymbolsStore[name];
  };

  // TODO: Remove from `core-js@4` since it's moved to entry points







  var SPECIES = wellKnownSymbol('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    return 'a'.replace(/./, '$0') === '$0';
  })();

  var REPLACE = wellKnownSymbol('replace');
  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
    var SYMBOL = wellKnownSymbol(KEY);

    var DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' && !(
        REPLACE_SUPPORTS_NAMED_GROUPS &&
        REPLACE_KEEPS_$0 &&
        !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      )) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }, {
        REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
        REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      });
      var stringMethod = methods[0];
      var regexMethod = methods[1];

      redefine(String.prototype, KEY, stringMethod);
      redefine(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) { return regexMethod.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) { return regexMethod.call(string, this); }
      );
    }

    if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
  };

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$1 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
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
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
  };

  var charAt = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt(S, index).length : 1);
  };

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }

    if (classofRaw(R) !== 'RegExp') {
      throw TypeError('RegExp#exec called on incompatible receiver');
    }

    return regexpExec.call(R, S);
  };

  // @@match logic
  fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = regexp == undefined ? undefined : regexp[MATCH];
        return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (regexp) {
        var res = maybeCallNative(nativeMatch, regexp, this);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        if (!rx.global) return regexpExecAbstract(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regexpExecAbstract(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var SPECIES$1 = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES$1];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var SPECIES$2 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$2] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export({ target: 'Array', proto: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
  }

  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING];

  var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  var SPECIES$3 = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$1(S);
  };

  var arrayPush = [].push;
  var min$2 = Math.min;
  var MAX_UINT32 = 0xFFFFFFFF;

  // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
  var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

  // @@split logic
  fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      // eslint-disable-next-line regexp/no-empty-group -- required for testing
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(requireObjectCoercible(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegexp(separator)) {
          return nativeSplit.call(string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output.length > lim ? output.slice(0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this);
        var splitter = separator == undefined ? undefined : separator[SPLIT];
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (regexp, limit) {
        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);
        var C = speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (SUPPORTS_Y ? 'y' : 'g');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = SUPPORTS_Y ? q : 0;
          var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
          var e;
          if (
            z === null ||
            (e = min$2(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  }, !SUPPORTS_Y);

  /**
   * Append a class to an element
   *
   * @api private
   * @method _addClass
   * @param {Object} element
   * @param {String} className
   * @returns null
   */

  function addClass(element, className) {
    if (element instanceof SVGElement) {
      // svg
      var pre = element.getAttribute("class") || "";

      if (!pre.match(className)) {
        // check if element doesn't already have className
        element.setAttribute("class", "".concat(pre, " ").concat(className));
      }
    } else {
      if (element.classList !== undefined) {
        // check for modern classList property
        var classes = className.split(" ");
        forEach(classes, function (cls) {
          element.classList.add(cls);
        });
      } else if (!element.className.match(className)) {
        // check if element doesn't already have className
        element.className += " ".concat(className);
      }
    }
  }

  /**
   * Get an element CSS property on the page
   * Thanks to JavaScript Kit: http://www.javascriptkit.com/dhtmltutors/dhtmlcascade4.shtml
   *
   * @api private
   * @method _getPropValue
   * @param {Object} element
   * @param {String} propName
   * @returns string property value
   */
  function getPropValue(element, propName) {
    var propValue = "";

    if (element.currentStyle) {
      //IE
      propValue = element.currentStyle[propName];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
      //Others
      propValue = document.defaultView.getComputedStyle(element, null).getPropertyValue(propName);
    } //Prevent exception in IE


    if (propValue && propValue.toLowerCase) {
      return propValue.toLowerCase();
    } else {
      return propValue;
    }
  }

  /**
   * To set the show element
   * This function set a relative (in most cases) position and changes the z-index
   *
   * @api private
   * @method _setShowElement
   * @param {Object} targetElement
   */

  function setShowElement(_ref) {
    var element = _ref.element;
    addClass(element, "introjs-showElement");
    var currentElementPosition = getPropValue(element, "position");

    if (currentElementPosition !== "absolute" && currentElementPosition !== "relative" && currentElementPosition !== "sticky" && currentElementPosition !== "fixed") {
      //change to new intro item
      addClass(element, "introjs-relativePosition");
    }
  }

  /**
   * Find the nearest scrollable parent
   * copied from https://stackoverflow.com/questions/35939886/find-first-scrollable-parent
   *
   * @param Element element
   * @return Element
   */
  function getScrollParent(element) {
    var style = window.getComputedStyle(element);
    var excludeStaticParent = style.position === "absolute";
    var overflowRegex = /(auto|scroll)/;
    if (style.position === "fixed") return document.body;

    for (var parent = element; parent = parent.parentElement;) {
      style = window.getComputedStyle(parent);

      if (excludeStaticParent && style.position === "static") {
        continue;
      }

      if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) return parent;
    }

    return document.body;
  }

  /**
   * scroll a scrollable element to a child element
   *
   * @param {Object} targetElement
   */

  function scrollParentToElement(targetElement) {
    var element = targetElement.element;
    if (!this._options.scrollToElement) return;
    var parent = getScrollParent(element);
    if (parent === document.body) return;
    parent.scrollTop = element.offsetTop - parent.offsetTop;
  }

  /**
   * Provides a cross-browser way to get the screen dimensions
   * via: http://stackoverflow.com/questions/5864467/internet-explorer-innerheight
   *
   * @api private
   * @method _getWinSize
   * @returns {Object} width and height attributes
   */
  function getWinSize() {
    if (window.innerWidth !== undefined) {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    } else {
      var D = document.documentElement;
      return {
        width: D.clientWidth,
        height: D.clientHeight
      };
    }
  }

  /**
   * Check to see if the element is in the viewport or not
   * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
   *
   * @api private
   * @method _elementInViewport
   * @param {Object} el
   */
  function elementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom + 80 <= window.innerHeight && // add 80 to get the text right
    rect.right <= window.innerWidth;
  }

  /**
   * To change the scroll of `window` after highlighting an element
   *
   * @api private
   * @param {String} scrollTo
   * @param {Object} targetElement
   * @param {Object} tooltipLayer
   */

  function scrollTo(scrollTo, _ref, tooltipLayer) {
    var element = _ref.element;
    if (scrollTo === "off") return;
    var rect;
    if (!this._options.scrollToElement) return;

    if (scrollTo === "tooltip") {
      rect = tooltipLayer.getBoundingClientRect();
    } else {
      rect = element.getBoundingClientRect();
    }

    if (!elementInViewport(element)) {
      var winHeight = getWinSize().height;
      var top = rect.bottom - (rect.bottom - rect.top); // TODO (afshinm): do we need scroll padding now?
      // I have changed the scroll option and now it scrolls the window to
      // the center of the target element or tooltip.

      if (top < 0 || element.clientHeight > winHeight) {
        window.scrollBy(0, rect.top - (winHeight / 2 - rect.height / 2) - this._options.scrollPadding); // 30px padding from edge to look nice
        //Scroll down
      } else {
        window.scrollBy(0, rect.top - (winHeight / 2 - rect.height / 2) + this._options.scrollPadding); // 30px padding from edge to look nice
      }
    }
  }

  /**
   * Setting anchors to behave like buttons
   *
   * @api private
   * @method _setAnchorAsButton
   */
  function setAnchorAsButton(anchor) {
    anchor.setAttribute("role", "button");
    anchor.tabIndex = 0;
  }

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  var nativeAssign = Object.assign;
  var defineProperty = Object.defineProperty;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign = !nativeAssign || fails(function () {
    // should have correct order of operations (Edge bug)
    if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
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
    /* global Symbol -- required for testing */
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable.f;
    while (argumentsLength > index) {
      var S = indexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    } return T;
  } : nativeAssign;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  _export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
    assign: objectAssign
  });

  /**
   * Get an element position on the page relative to another element (or body)
   * Thanks to `meouw`: http://stackoverflow.com/a/442474/375966
   *
   * @api private
   * @method getOffset
   * @param {Object} element
   * @param {Object} relativeEl
   * @returns Element's position info
   */

  function getOffset(element, relativeEl) {
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    relativeEl = relativeEl || body;
    var x = element.getBoundingClientRect();
    var xr = relativeEl.getBoundingClientRect();
    var relativeElPosition = getPropValue(relativeEl, "position");
    var obj = {
      width: x.width,
      height: x.height
    };

    if (relativeEl.tagName.toLowerCase() !== "body" && relativeElPosition === "relative" || relativeElPosition === "sticky") {
      // when the container of our target element is _not_ body and has either "relative" or "sticky" position, we should not
      // consider the scroll position but we need to include the relative x/y of the container element
      return Object.assign(obj, {
        top: x.top - xr.top,
        left: x.left - xr.left
      });
    } else {
      return Object.assign(obj, {
        top: x.top + scrollTop,
        left: x.left + scrollLeft
      });
    }
  }

  /**
   * Checks to see if target element (or parents) position is fixed or not
   *
   * @api private
   * @method _isFixed
   * @param {Object} element
   * @returns Boolean
   */

  function isFixed(element) {
    var p = element.parentNode;

    if (!p || p.nodeName === "HTML") {
      return false;
    }

    if (getPropValue(element, "position") === "fixed") {
      return true;
    }

    return isFixed(p);
  }

  var floor$1 = Math.floor;
  var replace = ''.replace;
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var max$1 = Math.max;
  var min$3 = Math.min;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
    var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        if (
          (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
          (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
        ) {
          var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
          if (res.done) return res.value;
        }

        var rx = anObject(regexp);
        var S = String(this);

        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regexpExecAbstract(rx, S);
          if (result === null) break;

          results.push(result);
          if (!global) break;

          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = String(result[0]);
          var position = max$1(min$3(toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];
  });

  /**
   * Remove a class from an element
   *
   * @api private
   * @method _removeClass
   * @param {Object} element
   * @param {RegExp|String} classNameRegex can be regex or string
   * @returns null
   */
  function removeClass(element, classNameRegex) {
    if (element instanceof SVGElement) {
      var pre = element.getAttribute("class") || "";
      element.setAttribute("class", pre.replace(classNameRegex, "").replace(/^\s+|\s+$/g, ""));
    } else {
      element.className = element.className.replace(classNameRegex, "").replace(/^\s+|\s+$/g, "");
    }
  }

  /**
   * Sets the style of an DOM element
   *
   * @param {Object} element
   * @param {Object|string} style
   * @return null
   */
  function setStyle(element, style) {
    var cssText = "";

    if (element.style.cssText) {
      cssText += element.style.cssText;
    }

    if (typeof style === "string") {
      cssText += style;
    } else {
      for (var rule in style) {
        cssText += "".concat(rule, ":").concat(style[rule], ";");
      }
    }

    element.style.cssText = cssText;
  }

  /**
   * Update the position of the helper layer on the screen
   *
   * @api private
   * @method _setHelperLayerPosition
   * @param {Object} helperLayer
   */

  function setHelperLayerPosition(helperLayer) {
    if (helperLayer) {
      //prevent error when `this._currentStep` in undefined
      if (!this._introItems[this._currentStep]) return;
      var currentElement = this._introItems[this._currentStep];
      var elementPosition = getOffset(currentElement.element, this._targetElement);
      var widthHeightPadding = this._options.helperElementPadding; // If the target element is fixed, the tooltip should be fixed as well.
      // Otherwise, remove a fixed class that may be left over from the previous
      // step.

      if (isFixed(currentElement.element)) {
        addClass(helperLayer, "introjs-fixedTooltip");
      } else {
        removeClass(helperLayer, "introjs-fixedTooltip");
      }

      if (currentElement.position === "floating") {
        widthHeightPadding = 0;
      } //set new position to helper layer


      setStyle(helperLayer, {
        width: "".concat(elementPosition.width + widthHeightPadding, "px"),
        height: "".concat(elementPosition.height + widthHeightPadding, "px"),
        top: "".concat(elementPosition.top - widthHeightPadding / 2, "px"),
        left: "".concat(elementPosition.left - widthHeightPadding / 2, "px")
      });
    }
  }

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
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
      /* global ActiveXObject -- old IE */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
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

  var $includes = arrayIncludes.includes;


  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  _export({ target: 'Array', proto: true }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('includes');

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

  var SPECIES$4 = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max$2 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$4];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max$2(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var notARegexp = function (it) {
    if (isRegexp(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    } return it;
  };

  var MATCH$1 = wellKnownSymbol('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) { /* empty */ }
    } return false;
  };

  // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes
  _export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~String(requireObjectCoercible(this))
        .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var nativeJoin = [].join;

  var ES3_STRINGS = indexedObject != Object;
  var STRICT_METHOD = arrayMethodIsStrict('join', ',');

  // `Array.prototype.join` method
  // https://tc39.es/ecma262/#sec-array.prototype.join
  _export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
    join: function join(separator) {
      return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
    }
  });

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$1(fn);
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

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
  var createMethod$2 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
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
            case 7: push.call(target, value); // filterOut
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$2(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$2(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$2(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$2(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$2(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$2(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$2(6),
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod$2(7)
  };

  var $filter = arrayIteration.filter;


  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  /**
   * Set tooltip left so it doesn't go off the right side of the window
   *
   * @return boolean true, if tooltipLayerStyleLeft is ok.  false, otherwise.
   */
  function checkRight(targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer) {
    if (targetOffset.left + tooltipLayerStyleLeft + tooltipOffset.width > windowSize.width) {
      // off the right side of the window
      tooltipLayer.style.left = "".concat(windowSize.width - tooltipOffset.width - targetOffset.left, "px");
      return false;
    }

    tooltipLayer.style.left = "".concat(tooltipLayerStyleLeft, "px");
    return true;
  }

  /**
   * Set tooltip right so it doesn't go off the left side of the window
   *
   * @return boolean true, if tooltipLayerStyleRight is ok.  false, otherwise.
   */
  function checkLeft(targetOffset, tooltipLayerStyleRight, tooltipOffset, tooltipLayer) {
    if (targetOffset.left + targetOffset.width - tooltipLayerStyleRight - tooltipOffset.width < 0) {
      // off the left side of the window
      tooltipLayer.style.left = "".concat(-targetOffset.left, "px");
      return false;
    }

    tooltipLayer.style.right = "".concat(tooltipLayerStyleRight, "px");
    return true;
  }

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('splice');

  var max$3 = Math.max;
  var min$4 = Math.min;
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject(this);
      var len = toLength(O.length);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min$4(max$3(toInteger(deleteCount), 0), len - actualStart);
      }
      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
        throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
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

  /**
   * Remove an entry from a string array if it's there, does nothing if it isn't there.
   *
   * @param {Array} stringArray
   * @param {String} stringToRemove
   */
  function removeEntry(stringArray, stringToRemove) {
    if (stringArray.includes(stringToRemove)) {
      stringArray.splice(stringArray.indexOf(stringToRemove), 1);
    }
  }

  /**
   * auto-determine alignment
   * @param {Integer}  offsetLeft
   * @param {Integer}  tooltipWidth
   * @param {Object}   windowSize
   * @param {String}   desiredAlignment
   * @return {String}  calculatedAlignment
   */

  function _determineAutoAlignment(offsetLeft, tooltipWidth, _ref, desiredAlignment) {
    var width = _ref.width;
    var halfTooltipWidth = tooltipWidth / 2;
    var winWidth = Math.min(width, window.screen.width);
    var possibleAlignments = ["-left-aligned", "-middle-aligned", "-right-aligned"];
    var calculatedAlignment = ""; // valid left must be at least a tooltipWidth
    // away from right side

    if (winWidth - offsetLeft < tooltipWidth) {
      removeEntry(possibleAlignments, "-left-aligned");
    } // valid middle must be at least half
    // width away from both sides


    if (offsetLeft < halfTooltipWidth || winWidth - offsetLeft < halfTooltipWidth) {
      removeEntry(possibleAlignments, "-middle-aligned");
    } // valid right must be at least a tooltipWidth
    // width away from left side


    if (offsetLeft < tooltipWidth) {
      removeEntry(possibleAlignments, "-right-aligned");
    }

    if (possibleAlignments.length) {
      if (possibleAlignments.includes(desiredAlignment)) {
        // the desired alignment is valid
        calculatedAlignment = desiredAlignment;
      } else {
        // pick the first valid position, in order
        calculatedAlignment = possibleAlignments[0];
      }
    } else {
      // if screen width is too small
      // for ANY alignment, middle is
      // probably the best for visibility
      calculatedAlignment = "-middle-aligned";
    }

    return calculatedAlignment;
  }
  /**
   * Determines the position of the tooltip based on the position precedence and availability
   * of screen space.
   *
   * @param {Object}    targetElement
   * @param {Object}    tooltipLayer
   * @param {String}    desiredTooltipPosition
   * @return {String}   calculatedPosition
   */


  function _determineAutoPosition(targetElement, tooltipLayer, desiredTooltipPosition) {
    // Take a clone of position precedence. These will be the available
    var possiblePositions = this._options.positionPrecedence.slice();

    var windowSize = getWinSize();
    var tooltipHeight = getOffset(tooltipLayer).height + 10;
    var tooltipWidth = getOffset(tooltipLayer).width + 20;
    var targetElementRect = targetElement.getBoundingClientRect(); // If we check all the possible areas, and there are no valid places for the tooltip, the element
    // must take up most of the screen real estate. Show the tooltip floating in the middle of the screen.

    var calculatedPosition = "floating";
    /*
     * auto determine position
     */
    // Check for space below

    if (targetElementRect.bottom + tooltipHeight > windowSize.height) {
      removeEntry(possiblePositions, "bottom");
    } // Check for space above


    if (targetElementRect.top - tooltipHeight < 0) {
      removeEntry(possiblePositions, "top");
    } // Check for space to the right


    if (targetElementRect.right + tooltipWidth > windowSize.width) {
      removeEntry(possiblePositions, "right");
    } // Check for space to the left


    if (targetElementRect.left - tooltipWidth < 0) {
      removeEntry(possiblePositions, "left");
    } // @var {String}  ex: 'right-aligned'


    var desiredAlignment = function (pos) {
      var hyphenIndex = pos.indexOf("-");

      if (hyphenIndex !== -1) {
        // has alignment
        return pos.substr(hyphenIndex);
      }

      return "";
    }(desiredTooltipPosition || ""); // strip alignment from position


    if (desiredTooltipPosition) {
      // ex: "bottom-right-aligned"
      // should return 'bottom'
      desiredTooltipPosition = desiredTooltipPosition.split("-")[0];
    }

    if (possiblePositions.length) {
      if (possiblePositions.includes(desiredTooltipPosition)) {
        // If the requested position is in the list, choose that
        calculatedPosition = desiredTooltipPosition;
      } else {
        // Pick the first valid position, in order
        calculatedPosition = possiblePositions[0];
      }
    } // only top and bottom positions have optional alignments


    if (["top", "bottom"].includes(calculatedPosition)) {
      calculatedPosition += _determineAutoAlignment(targetElementRect.left, tooltipWidth, windowSize, desiredAlignment);
    }

    return calculatedPosition;
  }
  /**
   * Render tooltip box in the page
   *
   * @api private
   * @method placeTooltip
   * @param {HTMLElement} targetElement
   * @param {HTMLElement} tooltipLayer
   * @param {HTMLElement} arrowLayer
   * @param {Boolean} hintMode
   */


  function placeTooltip(targetElement, tooltipLayer, arrowLayer, hintMode) {
    var tooltipCssClass = "";
    var currentStepObj;
    var tooltipOffset;
    var targetOffset;
    var windowSize;
    var currentTooltipPosition;
    hintMode = hintMode || false; //reset the old style

    tooltipLayer.style.top = null;
    tooltipLayer.style.right = null;
    tooltipLayer.style.bottom = null;
    tooltipLayer.style.left = null;
    tooltipLayer.style.marginLeft = null;
    tooltipLayer.style.marginTop = null;
    arrowLayer.style.display = "inherit"; //prevent error when `this._currentStep` is undefined

    if (!this._introItems[this._currentStep]) return; //if we have a custom css class for each step

    currentStepObj = this._introItems[this._currentStep];

    if (typeof currentStepObj.tooltipClass === "string") {
      tooltipCssClass = currentStepObj.tooltipClass;
    } else {
      tooltipCssClass = this._options.tooltipClass;
    }

    tooltipLayer.className = ["introjs-tooltip", tooltipCssClass].filter(Boolean).join(" ");
    tooltipLayer.setAttribute("role", "dialog");
    currentTooltipPosition = this._introItems[this._currentStep].position; // Floating is always valid, no point in calculating

    if (currentTooltipPosition !== "floating" && this._options.autoPosition) {
      currentTooltipPosition = _determineAutoPosition.call(this, targetElement, tooltipLayer, currentTooltipPosition);
    }

    var tooltipLayerStyleLeft;
    targetOffset = getOffset(targetElement);
    tooltipOffset = getOffset(tooltipLayer);
    windowSize = getWinSize();
    addClass(tooltipLayer, "introjs-".concat(currentTooltipPosition));

    switch (currentTooltipPosition) {
      case "top-right-aligned":
        arrowLayer.className = "introjs-arrow bottom-right";
        var tooltipLayerStyleRight = 0;
        checkLeft(targetOffset, tooltipLayerStyleRight, tooltipOffset, tooltipLayer);
        tooltipLayer.style.bottom = "".concat(targetOffset.height + 20, "px");
        break;

      case "top-middle-aligned":
        arrowLayer.className = "introjs-arrow bottom-middle";
        var tooltipLayerStyleLeftRight = targetOffset.width / 2 - tooltipOffset.width / 2; // a fix for middle aligned hints

        if (hintMode) {
          tooltipLayerStyleLeftRight += 5;
        }

        if (checkLeft(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, tooltipLayer)) {
          tooltipLayer.style.right = null;
          checkRight(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, windowSize, tooltipLayer);
        }

        tooltipLayer.style.bottom = "".concat(targetOffset.height + 20, "px");
        break;

      case "top-left-aligned": // top-left-aligned is the same as the default top

      case "top":
        arrowLayer.className = "introjs-arrow bottom";
        tooltipLayerStyleLeft = hintMode ? 0 : 15;
        checkRight(targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer);
        tooltipLayer.style.bottom = "".concat(targetOffset.height + 20, "px");
        break;

      case "right":
        tooltipLayer.style.left = "".concat(targetOffset.width + 20, "px");

        if (targetOffset.top + tooltipOffset.height > windowSize.height) {
          // In this case, right would have fallen below the bottom of the screen.
          // Modify so that the bottom of the tooltip connects with the target
          arrowLayer.className = "introjs-arrow left-bottom";
          tooltipLayer.style.top = "-".concat(tooltipOffset.height - targetOffset.height - 20, "px");
        } else {
          arrowLayer.className = "introjs-arrow left";
        }

        break;

      case "left":
        if (!hintMode && this._options.showStepNumbers === true) {
          tooltipLayer.style.top = "15px";
        }

        if (targetOffset.top + tooltipOffset.height > windowSize.height) {
          // In this case, left would have fallen below the bottom of the screen.
          // Modify so that the bottom of the tooltip connects with the target
          tooltipLayer.style.top = "-".concat(tooltipOffset.height - targetOffset.height - 20, "px");
          arrowLayer.className = "introjs-arrow right-bottom";
        } else {
          arrowLayer.className = "introjs-arrow right";
        }

        tooltipLayer.style.right = "".concat(targetOffset.width + 20, "px");
        break;

      case "floating":
        arrowLayer.style.display = "none"; //we have to adjust the top and left of layer manually for intro items without element

        tooltipLayer.style.left = "50%";
        tooltipLayer.style.top = "50%";
        tooltipLayer.style.marginLeft = "-".concat(tooltipOffset.width / 2, "px");
        tooltipLayer.style.marginTop = "-".concat(tooltipOffset.height / 2, "px");
        break;

      case "bottom-right-aligned":
        arrowLayer.className = "introjs-arrow top-right";
        tooltipLayerStyleRight = 0;
        checkLeft(targetOffset, tooltipLayerStyleRight, tooltipOffset, tooltipLayer);
        tooltipLayer.style.top = "".concat(targetOffset.height + 20, "px");
        break;

      case "bottom-middle-aligned":
        arrowLayer.className = "introjs-arrow top-middle";
        tooltipLayerStyleLeftRight = targetOffset.width / 2 - tooltipOffset.width / 2; // a fix for middle aligned hints

        if (hintMode) {
          tooltipLayerStyleLeftRight += 5;
        }

        if (checkLeft(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, tooltipLayer)) {
          tooltipLayer.style.right = null;
          checkRight(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, windowSize, tooltipLayer);
        }

        tooltipLayer.style.top = "".concat(targetOffset.height + 20, "px");
        break;
      // case 'bottom-left-aligned':
      // Bottom-left-aligned is the same as the default bottom
      // case 'bottom':
      // Bottom going to follow the default behavior

      default:
        arrowLayer.className = "introjs-arrow top";
        tooltipLayerStyleLeft = 0;
        checkRight(targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer);
        tooltipLayer.style.top = "".concat(targetOffset.height + 20, "px");
    }
  }

  /**
   * To remove all show element(s)
   *
   * @api private
   * @method _removeShowElement
   */

  function removeShowElement() {
    var elms = document.querySelectorAll(".introjs-showElement");
    forEach(elms, function (elm) {
      removeClass(elm, /introjs-[a-zA-Z]+/g);
    });
  }

  function _createElement(tagname, attrs) {
    var element = document.createElement(tagname);
    attrs = attrs || {}; // regex for matching attributes that need to be set with setAttribute

    var setAttRegex = /^(?:role|data-|aria-)/;

    for (var k in attrs) {
      var v = attrs[k];

      if (k === "style") {
        setStyle(element, v);
      } else if (k.match(setAttRegex)) {
        element.setAttribute(k, v);
      } else {
        element[k] = v;
      }
    }

    return element;
  }

  /**
   * Appends `element` to `parentElement`
   *
   * @param {Element} parentElement
   * @param {Element} element
   * @param {Boolean} [animate=false]
   */

  function appendChild(parentElement, element, animate) {
    if (animate) {
      var existingOpacity = element.style.opacity || "1";
      setStyle(element, {
        opacity: "0"
      });
      window.setTimeout(function () {
        setStyle(element, {
          opacity: existingOpacity
        });
      }, 10);
    }

    parentElement.appendChild(element);
  }

  /**
   * Gets the current progress percentage
   *
   * @api private
   * @method _getProgress
   * @returns current progress percentage
   */

  function _getProgress() {
    // Steps are 0 indexed
    var currentStep = parseInt(this._currentStep + 1, 10);
    return currentStep / this._introItems.length * 100;
  }
  /**
   * Add disableinteraction layer and adjust the size and position of the layer
   *
   * @api private
   * @method _disableInteraction
   */


  function _disableInteraction() {
    var disableInteractionLayer = document.querySelector(".introjs-disableInteraction");

    if (disableInteractionLayer === null) {
      disableInteractionLayer = _createElement("div", {
        className: "introjs-disableInteraction"
      });

      this._targetElement.appendChild(disableInteractionLayer);
    }

    setHelperLayerPosition.call(this, disableInteractionLayer);
  }
  /**
   * Show an element on the page
   *
   * @api private
   * @method _showElement
   * @param {Object} targetElement
   */


  function _showElement(targetElement) {
    var _this = this;

    if (typeof this._introChangeCallback !== "undefined") {
      this._introChangeCallback.call(this, targetElement.element);
    }

    var self = this;
    var oldHelperLayer = document.querySelector(".introjs-helperLayer");
    var oldReferenceLayer = document.querySelector(".introjs-tooltipReferenceLayer");
    var highlightClass = "introjs-helperLayer";
    var nextTooltipButton;
    var prevTooltipButton;
    var skipTooltipButton;

    if (typeof targetElement.highlightClass === "string") {
      highlightClass += " ".concat(targetElement.highlightClass);
    } //check for options highlight class


    if (typeof this._options.highlightClass === "string") {
      highlightClass += " ".concat(this._options.highlightClass);
    }

    if (oldHelperLayer !== null) {
      var oldHelperNumberLayer = oldReferenceLayer.querySelector(".introjs-helperNumberLayer");
      var oldtooltipLayer = oldReferenceLayer.querySelector(".introjs-tooltiptext");
      var oldTooltipTitleLayer = oldReferenceLayer.querySelector(".introjs-tooltip-title");
      var oldArrowLayer = oldReferenceLayer.querySelector(".introjs-arrow");
      var oldtooltipContainer = oldReferenceLayer.querySelector(".introjs-tooltip");
      skipTooltipButton = oldReferenceLayer.querySelector(".introjs-skipbutton");
      prevTooltipButton = oldReferenceLayer.querySelector(".introjs-prevbutton");
      nextTooltipButton = oldReferenceLayer.querySelector(".introjs-nextbutton"); //update or reset the helper highlight class

      oldHelperLayer.className = highlightClass; //hide the tooltip

      oldtooltipContainer.style.opacity = 0;
      oldtooltipContainer.style.display = "none"; // if the target element is within a scrollable element

      scrollParentToElement.call(self, targetElement); // set new position to helper layer

      setHelperLayerPosition.call(self, oldHelperLayer);
      setHelperLayerPosition.call(self, oldReferenceLayer); //remove old classes if the element still exist

      removeShowElement(); //we should wait until the CSS3 transition is competed (it's 0.3 sec) to prevent incorrect `height` and `width` calculation

      if (self._lastShowElementTimer) {
        window.clearTimeout(self._lastShowElementTimer);
      }

      self._lastShowElementTimer = window.setTimeout(function () {
        // set current step to the label
        if (oldHelperNumberLayer !== null) {
          oldHelperNumberLayer.innerHTML = "".concat(targetElement.step, " of ").concat(_this._introItems.length);
        } // set current tooltip text


        oldtooltipLayer.innerHTML = targetElement.intro; // set current tooltip title

        oldTooltipTitleLayer.innerHTML = targetElement.title; //set the tooltip position

        oldtooltipContainer.style.display = "block";
        placeTooltip.call(self, targetElement.element, oldtooltipContainer, oldArrowLayer); //change active bullet

        if (self._options.showBullets) {
          oldReferenceLayer.querySelector(".introjs-bullets li > a.active").className = "";
          oldReferenceLayer.querySelector(".introjs-bullets li > a[data-stepnumber=\"".concat(targetElement.step, "\"]")).className = "active";
        }

        oldReferenceLayer.querySelector(".introjs-progress .introjs-progressbar").style.cssText = "width:".concat(_getProgress.call(self), "%;");
        oldReferenceLayer.querySelector(".introjs-progress .introjs-progressbar").setAttribute("aria-valuenow", _getProgress.call(self)); //show the tooltip

        oldtooltipContainer.style.opacity = 1; //reset button focus

        if (typeof nextTooltipButton !== "undefined" && nextTooltipButton !== null && /introjs-donebutton/gi.test(nextTooltipButton.className)) {
          // skip button is now "done" button
          nextTooltipButton.focus();
        } else if (typeof nextTooltipButton !== "undefined" && nextTooltipButton !== null) {
          //still in the tour, focus on next
          nextTooltipButton.focus();
        } // change the scroll of the window, if needed


        scrollTo.call(self, targetElement.scrollTo, targetElement, oldtooltipLayer);
      }, 350); // end of old element if-else condition
    } else {
      var helperLayer = _createElement("div", {
        className: highlightClass
      });
      var referenceLayer = _createElement("div", {
        className: "introjs-tooltipReferenceLayer"
      });
      var arrowLayer = _createElement("div", {
        className: "introjs-arrow"
      });
      var tooltipLayer = _createElement("div", {
        className: "introjs-tooltip"
      });
      var tooltipTextLayer = _createElement("div", {
        className: "introjs-tooltiptext"
      });
      var tooltipHeaderLayer = _createElement("div", {
        className: "introjs-tooltip-header"
      });
      var tooltipTitleLayer = _createElement("h1", {
        className: "introjs-tooltip-title"
      });
      var bulletsLayer = _createElement("div", {
        className: "introjs-bullets"
      });
      var progressLayer = _createElement("div");
      var buttonsLayer = _createElement("div");
      setStyle(helperLayer, {
        "box-shadow": "0 0 1px 2px rgba(33, 33, 33, 0.8), rgba(33, 33, 33, ".concat(self._options.overlayOpacity.toString(), ") 0 0 0 5000px")
      }); // target is within a scrollable element

      scrollParentToElement.call(self, targetElement); //set new position to helper layer

      setHelperLayerPosition.call(self, helperLayer);
      setHelperLayerPosition.call(self, referenceLayer); //add helper layer to target element

      appendChild(this._targetElement, helperLayer, true);
      appendChild(this._targetElement, referenceLayer);
      tooltipTextLayer.innerHTML = targetElement.intro;
      tooltipTitleLayer.innerHTML = targetElement.title;

      if (this._options.showBullets === false) {
        bulletsLayer.style.display = "none";
      }

      var ulContainer = _createElement("ul");
      ulContainer.setAttribute("role", "tablist");

      var anchorClick = function anchorClick() {
        self.goToStep(this.getAttribute("data-stepnumber"));
      };

      forEach(this._introItems, function (_ref, i) {
        var step = _ref.step;
        var innerLi = _createElement("li");
        var anchorLink = _createElement("a");
        innerLi.setAttribute("role", "presentation");
        anchorLink.setAttribute("role", "tab");
        anchorLink.onclick = anchorClick;

        if (i === targetElement.step - 1) {
          anchorLink.className = "active";
        }

        setAnchorAsButton(anchorLink);
        anchorLink.innerHTML = "&nbsp;";
        anchorLink.setAttribute("data-stepnumber", step);
        innerLi.appendChild(anchorLink);
        ulContainer.appendChild(innerLi);
      });
      bulletsLayer.appendChild(ulContainer);
      progressLayer.className = "introjs-progress";

      if (this._options.showProgress === false) {
        progressLayer.style.display = "none";
      }

      var progressBar = _createElement("div", {
        className: "introjs-progressbar"
      });

      if (this._options.progressBarAdditionalClass) {
        progressBar.className += " " + this._options.progressBarAdditionalClass;
      }

      progressBar.setAttribute("role", "progress");
      progressBar.setAttribute("aria-valuemin", 0);
      progressBar.setAttribute("aria-valuemax", 100);
      progressBar.setAttribute("aria-valuenow", _getProgress.call(this));
      progressBar.style.cssText = "width:".concat(_getProgress.call(this), "%;");
      progressLayer.appendChild(progressBar);
      buttonsLayer.className = "introjs-tooltipbuttons";

      if (this._options.showButtons === false) {
        buttonsLayer.style.display = "none";
      }

      tooltipHeaderLayer.appendChild(tooltipTitleLayer);
      tooltipLayer.appendChild(tooltipHeaderLayer);
      tooltipLayer.appendChild(tooltipTextLayer);
      tooltipLayer.appendChild(bulletsLayer);
      tooltipLayer.appendChild(progressLayer); // add helper layer number

      var helperNumberLayer = _createElement("div");

      if (this._options.showStepNumbers === true) {
        helperNumberLayer.className = "introjs-helperNumberLayer";
        helperNumberLayer.innerHTML = "".concat(targetElement.step, " of ").concat(this._introItems.length);
        tooltipLayer.appendChild(helperNumberLayer);
      }

      tooltipLayer.appendChild(arrowLayer);
      referenceLayer.appendChild(tooltipLayer); //next button

      nextTooltipButton = _createElement("a");

      nextTooltipButton.onclick = function () {
        if (self._introItems.length - 1 !== self._currentStep) {
          nextStep.call(self);
        } else if (/introjs-donebutton/gi.test(nextTooltipButton.className)) {
          if (typeof self._introCompleteCallback === "function") {
            self._introCompleteCallback.call(self);
          }

          exitIntro.call(self, self._targetElement);
        }
      };

      setAnchorAsButton(nextTooltipButton);
      nextTooltipButton.innerHTML = this._options.nextLabel; //previous button

      prevTooltipButton = _createElement("a");

      prevTooltipButton.onclick = function () {
        if (self._currentStep !== 0) {
          previousStep.call(self);
        }
      };

      setAnchorAsButton(prevTooltipButton);
      prevTooltipButton.innerHTML = this._options.prevLabel; //skip button

      skipTooltipButton = _createElement("a", {
        className: "introjs-skipbutton"
      });
      setAnchorAsButton(skipTooltipButton);
      skipTooltipButton.innerHTML = this._options.skipLabel;

      skipTooltipButton.onclick = function () {
        if (self._introItems.length - 1 === self._currentStep && typeof self._introCompleteCallback === "function") {
          self._introCompleteCallback.call(self);
        }

        if (typeof self._introSkipCallback === "function") {
          self._introSkipCallback.call(self);
        }

        exitIntro.call(self, self._targetElement);
      };

      tooltipHeaderLayer.appendChild(skipTooltipButton); //in order to prevent displaying previous button always

      if (this._introItems.length > 1) {
        buttonsLayer.appendChild(prevTooltipButton);
      } // we always need the next button because this
      // button changes to "Done" in the last step of the tour


      buttonsLayer.appendChild(nextTooltipButton);
      tooltipLayer.appendChild(buttonsLayer); //set proper position

      placeTooltip.call(self, targetElement.element, tooltipLayer, arrowLayer); // change the scroll of the window, if needed

      scrollTo.call(this, targetElement.scrollTo, targetElement, tooltipLayer); //end of new element if-else condition
    } // removing previous disable interaction layer


    var disableInteractionLayer = self._targetElement.querySelector(".introjs-disableInteraction");

    if (disableInteractionLayer) {
      disableInteractionLayer.parentNode.removeChild(disableInteractionLayer);
    } //disable interaction


    if (targetElement.disableInteraction) {
      _disableInteraction.call(self);
    } // when it's the first step of tour


    if (this._currentStep === 0 && this._introItems.length > 1) {
      if (typeof nextTooltipButton !== "undefined" && nextTooltipButton !== null) {
        nextTooltipButton.className = "".concat(this._options.buttonClass, " introjs-nextbutton");
        nextTooltipButton.innerHTML = this._options.nextLabel;
      }

      if (this._options.hidePrev === true) {
        if (typeof prevTooltipButton !== "undefined" && prevTooltipButton !== null) {
          prevTooltipButton.className = "".concat(this._options.buttonClass, " introjs-prevbutton introjs-hidden");
        }

        if (typeof nextTooltipButton !== "undefined" && nextTooltipButton !== null) {
          addClass(nextTooltipButton, "introjs-fullbutton");
        }
      } else {
        if (typeof prevTooltipButton !== "undefined" && prevTooltipButton !== null) {
          prevTooltipButton.className = "".concat(this._options.buttonClass, " introjs-prevbutton introjs-disabled");
        }
      }
    } else if (this._introItems.length - 1 === this._currentStep || this._introItems.length === 1) {
      // last step of tour
      if (typeof prevTooltipButton !== "undefined" && prevTooltipButton !== null) {
        prevTooltipButton.className = "".concat(this._options.buttonClass, " introjs-prevbutton");
      }

      if (this._options.hideNext === true) {
        if (typeof nextTooltipButton !== "undefined" && nextTooltipButton !== null) {
          nextTooltipButton.className = "".concat(this._options.buttonClass, " introjs-nextbutton introjs-hidden");
        }

        if (typeof prevTooltipButton !== "undefined" && prevTooltipButton !== null) {
          addClass(prevTooltipButton, "introjs-fullbutton");
        }
      } else {
        if (typeof nextTooltipButton !== "undefined" && nextTooltipButton !== null) {
          if (this._options.nextToDone === true) {
            nextTooltipButton.innerHTML = this._options.doneLabel;
            addClass(nextTooltipButton, "".concat(this._options.buttonClass, " introjs-nextbutton introjs-donebutton"));
          } else {
            nextTooltipButton.className = "".concat(this._options.buttonClass, " introjs-nextbutton introjs-disabled");
          }
        }
      }
    } else {
      // steps between start and end
      if (typeof prevTooltipButton !== "undefined" && prevTooltipButton !== null) {
        prevTooltipButton.className = "".concat(this._options.buttonClass, " introjs-prevbutton");
      }

      if (typeof nextTooltipButton !== "undefined" && nextTooltipButton !== null) {
        nextTooltipButton.className = "".concat(this._options.buttonClass, " introjs-nextbutton");
        nextTooltipButton.innerHTML = this._options.nextLabel;
      }
    }

    if (typeof prevTooltipButton !== "undefined" && prevTooltipButton !== null) {
      prevTooltipButton.setAttribute("role", "button");
    }

    if (typeof nextTooltipButton !== "undefined" && nextTooltipButton !== null) {
      nextTooltipButton.setAttribute("role", "button");
    }

    if (typeof skipTooltipButton !== "undefined" && skipTooltipButton !== null) {
      skipTooltipButton.setAttribute("role", "button");
    } //Set focus on "next" button, so that hitting Enter always moves you onto the next step


    if (typeof nextTooltipButton !== "undefined" && nextTooltipButton !== null) {
      nextTooltipButton.focus();
    }

    setShowElement(targetElement);

    if (typeof this._introAfterChangeCallback !== "undefined") {
      this._introAfterChangeCallback.call(this, targetElement.element);
    }
  }

  /**
   * Go to specific step of introduction
   *
   * @api private
   * @method _goToStep
   */

  function goToStep(step) {
    //because steps starts with zero
    this._currentStep = step - 2;

    if (typeof this._introItems !== "undefined") {
      nextStep.call(this);
    }
  }
  /**
   * Go to the specific step of introduction with the explicit [data-step] number
   *
   * @api private
   * @method _goToStepNumber
   */

  function goToStepNumber(step) {
    this._currentStepNumber = step;

    if (typeof this._introItems !== "undefined") {
      nextStep.call(this);
    }
  }
  /**
   * Go to next step on intro
   *
   * @api private
   * @method _nextStep
   */

  function nextStep() {
    var _this = this;

    this._direction = "forward";

    if (typeof this._currentStepNumber !== "undefined") {
      forEach(this._introItems, function (_ref, i) {
        var step = _ref.step;

        if (step === _this._currentStepNumber) {
          _this._currentStep = i - 1;
          _this._currentStepNumber = undefined;
        }
      });
    }

    if (typeof this._currentStep === "undefined") {
      this._currentStep = 0;
    } else {
      ++this._currentStep;
    }

    var nextStep = this._introItems[this._currentStep];
    var continueStep = true;

    if (typeof this._introBeforeChangeCallback !== "undefined") {
      continueStep = this._introBeforeChangeCallback.call(this, nextStep && nextStep.element);
    } // if `onbeforechange` returned `false`, stop displaying the element


    if (continueStep === false) {
      --this._currentStep;
      return false;
    }

    if (this._introItems.length <= this._currentStep) {
      //end of the intro
      //check if any callback is defined
      if (typeof this._introCompleteCallback === "function") {
        this._introCompleteCallback.call(this);
      }

      exitIntro.call(this, this._targetElement);
      return;
    }

    _showElement.call(this, nextStep);
  }
  /**
   * Go to previous step on intro
   *
   * @api private
   * @method _previousStep
   */

  function previousStep() {
    this._direction = "backward";

    if (this._currentStep === 0) {
      return false;
    }

    --this._currentStep;
    var nextStep = this._introItems[this._currentStep];
    var continueStep = true;

    if (typeof this._introBeforeChangeCallback !== "undefined") {
      continueStep = this._introBeforeChangeCallback.call(this, nextStep && nextStep.element);
    } // if `onbeforechange` returned `false`, stop displaying the element


    if (continueStep === false) {
      ++this._currentStep;
      return false;
    }

    _showElement.call(this, nextStep);
  }
  /**
   * Returns the current step of the intro
   *
   * @returns {number | boolean}
   */

  function currentStep() {
    return this._currentStep;
  }

  /**
   * on keyCode:
   * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
   * This feature has been removed from the Web standards.
   * Though some browsers may still support it, it is in
   * the process of being dropped.
   * Instead, you should use KeyboardEvent.code,
   * if it's implemented.
   *
   * jQuery's approach is to test for
   *   (1) e.which, then
   *   (2) e.charCode, then
   *   (3) e.keyCode
   * https://github.com/jquery/jquery/blob/a6b0705294d336ae2f63f7276de0da1195495363/src/event.js#L638
   *
   * @param type var
   * @return type
   */

  function onKeyDown(e) {
    var code = e.code === undefined ? e.which : e.code; // if e.which is null

    if (code === null) {
      code = e.charCode === null ? e.keyCode : e.charCode;
    }

    if ((code === "Escape" || code === 27) && this._options.exitOnEsc === true) {
      //escape key pressed, exit the intro
      //check if exit callback is defined
      exitIntro.call(this, this._targetElement);
    } else if (code === "ArrowLeft" || code === 37) {
      //left arrow
      previousStep.call(this);
    } else if (code === "ArrowRight" || code === 39) {
      //right arrow
      nextStep.call(this);
    } else if (code === "Enter" || code === "NumpadEnter" || code === 13) {
      //srcElement === ie
      var target = e.target || e.srcElement;

      if (target && target.className.match("introjs-prevbutton")) {
        //user hit enter while focusing on previous button
        previousStep.call(this);
      } else if (target && target.className.match("introjs-skipbutton")) {
        //user hit enter while focusing on skip button
        if (this._introItems.length - 1 === this._currentStep && typeof this._introCompleteCallback === "function") {
          this._introCompleteCallback.call(this);
        }

        exitIntro.call(this, this._targetElement);
      } else if (target && target.getAttribute("data-stepnumber")) {
        // user hit enter while focusing on step bullet
        target.click();
      } else {
        //default behavior for responding to enter
        nextStep.call(this);
      } //prevent default behaviour on hitting Enter, to prevent steps being skipped in some browsers


      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    }
  }

  /*
   * makes a copy of the object
   * @api private
   * @method _cloneObject
   */
  function cloneObject(object) {
    if (object === null || _typeof(object) !== "object" || typeof object.nodeType !== "undefined") {
      return object;
    }

    var temp = {};

    for (var key in object) {
      if (typeof window.jQuery !== "undefined" && object[key] instanceof window.jQuery) {
        temp[key] = object[key];
      } else {
        temp[key] = cloneObject(object[key]);
      }
    }

    return temp;
  }

  /**
   * Get a queryselector within the hint wrapper
   *
   * @param {String} selector
   * @return {NodeList|Array}
   */

  function hintQuerySelectorAll(selector) {
    var hintsWrapper = document.querySelector(".introjs-hints");
    return hintsWrapper ? hintsWrapper.querySelectorAll(selector) : [];
  }
  /**
   * Hide a hint
   *
   * @api private
   * @method hideHint
   */

  function hideHint(stepId) {
    var hint = hintQuerySelectorAll(".introjs-hint[data-step=\"".concat(stepId, "\"]"))[0];
    removeHintTooltip.call(this);

    if (hint) {
      addClass(hint, "introjs-hidehint");
    } // call the callback function (if any)


    if (typeof this._hintCloseCallback !== "undefined") {
      this._hintCloseCallback.call(this, stepId);
    }
  }
  /**
   * Hide all hints
   *
   * @api private
   * @method hideHints
   */

  function hideHints() {
    var _this = this;

    var hints = hintQuerySelectorAll(".introjs-hint");
    forEach(hints, function (hint) {
      hideHint.call(_this, hint.getAttribute("data-step"));
    });
  }
  /**
   * Show all hints
   *
   * @api private
   * @method _showHints
   */

  function showHints() {
    var _this2 = this;

    var hints = hintQuerySelectorAll(".introjs-hint");

    if (hints && hints.length) {
      forEach(hints, function (hint) {
        showHint.call(_this2, hint.getAttribute("data-step"));
      });
    } else {
      populateHints.call(this, this._targetElement);
    }
  }
  /**
   * Show a hint
   *
   * @api private
   * @method showHint
   */

  function showHint(stepId) {
    var hint = hintQuerySelectorAll(".introjs-hint[data-step=\"".concat(stepId, "\"]"))[0];

    if (hint) {
      removeClass(hint, /introjs-hidehint/g);
    }
  }
  /**
   * Removes all hint elements on the page
   * Useful when you want to destroy the elements and add them again (e.g. a modal or popup)
   *
   * @api private
   * @method removeHints
   */

  function removeHints() {
    var _this3 = this;

    var hints = hintQuerySelectorAll(".introjs-hint");
    forEach(hints, function (hint) {
      removeHint.call(_this3, hint.getAttribute("data-step"));
    });
  }
  /**
   * Remove one single hint element from the page
   * Useful when you want to destroy the element and add them again (e.g. a modal or popup)
   * Use removeHints if you want to remove all elements.
   *
   * @api private
   * @method removeHint
   */

  function removeHint(stepId) {
    var hint = hintQuerySelectorAll(".introjs-hint[data-step=\"".concat(stepId, "\"]"))[0];

    if (hint) {
      hint.parentNode.removeChild(hint);
    }
  }
  /**
   * Add all available hints to the page
   *
   * @api private
   * @method addHints
   */

  function addHints() {
    var _this4 = this;

    var self = this;
    var hintsWrapper = document.querySelector(".introjs-hints");

    if (hintsWrapper === null) {
      hintsWrapper = _createElement("div", {
        className: "introjs-hints"
      });
    }
    /**
     * Returns an event handler unique to the hint iteration
     *
     * @param {Integer} i
     * @return {Function}
     */


    var getHintClick = function getHintClick(i) {
      return function (e) {
        var evt = e ? e : window.event;

        if (evt.stopPropagation) {
          evt.stopPropagation();
        }

        if (evt.cancelBubble !== null) {
          evt.cancelBubble = true;
        }

        showHintDialog.call(self, i);
      };
    };

    forEach(this._introItems, function (item, i) {
      // avoid append a hint twice
      if (document.querySelector(".introjs-hint[data-step=\"".concat(i, "\"]"))) {
        return;
      }

      var hint = _createElement("a", {
        className: "introjs-hint"
      });
      setAnchorAsButton(hint);
      hint.onclick = getHintClick(i);

      if (!item.hintAnimation) {
        addClass(hint, "introjs-hint-no-anim");
      } // hint's position should be fixed if the target element's position is fixed


      if (isFixed(item.element)) {
        addClass(hint, "introjs-fixedhint");
      }

      var hintDot = _createElement("div", {
        className: "introjs-hint-dot"
      });
      var hintPulse = _createElement("div", {
        className: "introjs-hint-pulse"
      });
      hint.appendChild(hintDot);
      hint.appendChild(hintPulse);
      hint.setAttribute("data-step", i); // we swap the hint element with target element
      // because _setHelperLayerPosition uses `element` property

      item.targetElement = item.element;
      item.element = hint; // align the hint position

      alignHintPosition.call(_this4, item.hintPosition, hint, item.targetElement);
      hintsWrapper.appendChild(hint);
    }); // adding the hints wrapper

    document.body.appendChild(hintsWrapper); // call the callback function (if any)

    if (typeof this._hintsAddedCallback !== "undefined") {
      this._hintsAddedCallback.call(this);
    }
  }
  /**
   * Aligns hint position
   *
   * @api private
   * @method alignHintPosition
   * @param {String} position
   * @param {Object} hint
   * @param {Object} element
   */

  function alignHintPosition(position, _ref, element) {
    var style = _ref.style;
    // get/calculate offset of target element
    var offset = getOffset.call(this, element);
    var iconWidth = 20;
    var iconHeight = 20; // align the hint element

    switch (position) {
      default:
      case "top-left":
        style.left = "".concat(offset.left, "px");
        style.top = "".concat(offset.top, "px");
        break;

      case "top-right":
        style.left = "".concat(offset.left + offset.width - iconWidth, "px");
        style.top = "".concat(offset.top, "px");
        break;

      case "bottom-left":
        style.left = "".concat(offset.left, "px");
        style.top = "".concat(offset.top + offset.height - iconHeight, "px");
        break;

      case "bottom-right":
        style.left = "".concat(offset.left + offset.width - iconWidth, "px");
        style.top = "".concat(offset.top + offset.height - iconHeight, "px");
        break;

      case "middle-left":
        style.left = "".concat(offset.left, "px");
        style.top = "".concat(offset.top + (offset.height - iconHeight) / 2, "px");
        break;

      case "middle-right":
        style.left = "".concat(offset.left + offset.width - iconWidth, "px");
        style.top = "".concat(offset.top + (offset.height - iconHeight) / 2, "px");
        break;

      case "middle-middle":
        style.left = "".concat(offset.left + (offset.width - iconWidth) / 2, "px");
        style.top = "".concat(offset.top + (offset.height - iconHeight) / 2, "px");
        break;

      case "bottom-middle":
        style.left = "".concat(offset.left + (offset.width - iconWidth) / 2, "px");
        style.top = "".concat(offset.top + offset.height - iconHeight, "px");
        break;

      case "top-middle":
        style.left = "".concat(offset.left + (offset.width - iconWidth) / 2, "px");
        style.top = "".concat(offset.top, "px");
        break;
    }
  }
  /**
   * Triggers when user clicks on the hint element
   *
   * @api private
   * @method _showHintDialog
   * @param {Number} stepId
   */

  function showHintDialog(stepId) {
    var hintElement = document.querySelector(".introjs-hint[data-step=\"".concat(stepId, "\"]"));
    var item = this._introItems[stepId]; // call the callback function (if any)

    if (typeof this._hintClickCallback !== "undefined") {
      this._hintClickCallback.call(this, hintElement, item, stepId);
    } // remove all open tooltips


    var removedStep = removeHintTooltip.call(this); // to toggle the tooltip

    if (parseInt(removedStep, 10) === stepId) {
      return;
    }

    var tooltipLayer = _createElement("div", {
      className: "introjs-tooltip"
    });
    var tooltipTextLayer = _createElement("div");
    var arrowLayer = _createElement("div");
    var referenceLayer = _createElement("div");

    tooltipLayer.onclick = function (e) {
      //IE9 & Other Browsers
      if (e.stopPropagation) {
        e.stopPropagation();
      } //IE8 and Lower
      else {
          e.cancelBubble = true;
        }
    };

    tooltipTextLayer.className = "introjs-tooltiptext";
    var tooltipWrapper = _createElement("p");
    tooltipWrapper.innerHTML = item.hint;
    var closeButton = _createElement("a");
    closeButton.className = this._options.buttonClass;
    closeButton.setAttribute("role", "button");
    closeButton.innerHTML = this._options.hintButtonLabel;
    closeButton.onclick = hideHint.bind(this, stepId);
    tooltipTextLayer.appendChild(tooltipWrapper);
    tooltipTextLayer.appendChild(closeButton);
    arrowLayer.className = "introjs-arrow";
    tooltipLayer.appendChild(arrowLayer);
    tooltipLayer.appendChild(tooltipTextLayer); // set current step for _placeTooltip function

    this._currentStep = hintElement.getAttribute("data-step"); // align reference layer position

    referenceLayer.className = "introjs-tooltipReferenceLayer introjs-hintReference";
    referenceLayer.setAttribute("data-step", hintElement.getAttribute("data-step"));
    setHelperLayerPosition.call(this, referenceLayer);
    referenceLayer.appendChild(tooltipLayer);
    document.body.appendChild(referenceLayer); //set proper position

    placeTooltip.call(this, hintElement, tooltipLayer, arrowLayer, true);
  }
  /**
   * Removes open hint (tooltip hint)
   *
   * @api private
   * @method _removeHintTooltip
   */

  function removeHintTooltip() {
    var tooltip = document.querySelector(".introjs-hintReference");

    if (tooltip) {
      var step = tooltip.getAttribute("data-step");
      tooltip.parentNode.removeChild(tooltip);
      return step;
    }
  }
  /**
   * Start parsing hint items
   *
   * @api private
   * @param {Object} targetElm
   * @method _startHint
   */

  function populateHints(targetElm) {
    var _this5 = this;

    this._introItems = [];

    if (this._options.hints) {
      forEach(this._options.hints, function (hint) {
        var currentItem = cloneObject(hint);

        if (typeof currentItem.element === "string") {
          //grab the element with given selector from the page
          currentItem.element = document.querySelector(currentItem.element);
        }

        currentItem.hintPosition = currentItem.hintPosition || _this5._options.hintPosition;
        currentItem.hintAnimation = currentItem.hintAnimation || _this5._options.hintAnimation;

        if (currentItem.element !== null) {
          _this5._introItems.push(currentItem);
        }
      });
    } else {
      var hints = targetElm.querySelectorAll("*[data-hint]");

      if (!hints || !hints.length) {
        return false;
      } //first add intro items with data-step


      forEach(hints, function (currentElement) {
        // hint animation
        var hintAnimation = currentElement.getAttribute("data-hintanimation");

        if (hintAnimation) {
          hintAnimation = hintAnimation === "true";
        } else {
          hintAnimation = _this5._options.hintAnimation;
        }

        _this5._introItems.push({
          element: currentElement,
          hint: currentElement.getAttribute("data-hint"),
          hintPosition: currentElement.getAttribute("data-hintposition") || _this5._options.hintPosition,
          hintAnimation: hintAnimation,
          tooltipClass: currentElement.getAttribute("data-tooltipclass"),
          position: currentElement.getAttribute("data-position") || _this5._options.tooltipPosition
        });
      });
    }

    addHints.call(this);
    /*
    todo:
    these events should be removed at some point
    */

    DOMEvent.on(document, "click", removeHintTooltip, this, false);
    DOMEvent.on(window, "resize", reAlignHints, this, true);
  }
  /**
   * Re-aligns all hint elements
   *
   * @api private
   * @method _reAlignHints
   */

  function reAlignHints() {
    var _this6 = this;

    forEach(this._introItems, function (_ref2) {
      var targetElement = _ref2.targetElement,
          hintPosition = _ref2.hintPosition,
          element = _ref2.element;

      if (typeof targetElement === "undefined") {
        return;
      }

      alignHintPosition.call(_this6, hintPosition, element, targetElement);
    });
  }

  /**
   * Update placement of the intro objects on the screen
   * @api private
   */

  function refresh() {
    // re-align intros
    setHelperLayerPosition.call(this, document.querySelector(".introjs-helperLayer"));
    setHelperLayerPosition.call(this, document.querySelector(".introjs-tooltipReferenceLayer"));
    setHelperLayerPosition.call(this, document.querySelector(".introjs-disableInteraction")); // re-align tooltip

    if (this._currentStep !== undefined && this._currentStep !== null) {
      var oldArrowLayer = document.querySelector(".introjs-arrow");
      var oldtooltipContainer = document.querySelector(".introjs-tooltip");
      placeTooltip.call(this, this._introItems[this._currentStep].element, oldtooltipContainer, oldArrowLayer);
    } //re-align hints


    reAlignHints.call(this);
    return this;
  }

  function onResize() {
    refresh.call(this);
  }

  /**
   * Removes `element` from `parentElement`
   *
   * @param {Element} element
   * @param {Boolean} [animate=false]
   */

  function removeChild(element, animate) {
    if (!element || !element.parentElement) return;
    var parentElement = element.parentElement;

    if (animate) {
      setStyle(element, {
        opacity: "0"
      });
      window.setTimeout(function () {
        parentElement.removeChild(element);
      }, 500);
    } else {
      parentElement.removeChild(element);
    }
  }

  /**
   * Exit from intro
   *
   * @api private
   * @method _exitIntro
   * @param {Object} targetElement
   * @param {Boolean} force - Setting to `true` will skip the result of beforeExit callback
   */

  function exitIntro(targetElement, force) {
    var continueExit = true; // calling onbeforeexit callback
    //
    // If this callback return `false`, it would halt the process

    if (this._introBeforeExitCallback !== undefined) {
      continueExit = this._introBeforeExitCallback.call(this);
    } // skip this check if `force` parameter is `true`
    // otherwise, if `onbeforeexit` returned `false`, don't exit the intro


    if (!force && continueExit === false) return; // remove overlay layers from the page

    var overlayLayers = targetElement.querySelectorAll(".introjs-overlay");

    if (overlayLayers && overlayLayers.length) {
      forEach(overlayLayers, function (overlayLayer) {
        return removeChild(overlayLayer);
      });
    } //remove all helper layers


    var helperLayer = targetElement.querySelector(".introjs-helperLayer");
    removeChild(helperLayer, true);
    var referenceLayer = targetElement.querySelector(".introjs-tooltipReferenceLayer");
    removeChild(referenceLayer); //remove disableInteractionLayer

    var disableInteractionLayer = targetElement.querySelector(".introjs-disableInteraction");
    removeChild(disableInteractionLayer); //remove intro floating element

    var floatingElement = document.querySelector(".introjsFloatingElement");
    removeChild(floatingElement);
    removeShowElement(); //clean listeners

    DOMEvent.off(window, "keydown", onKeyDown, this, true);
    DOMEvent.off(window, "resize", onResize, this, true); //check if any callback is defined

    if (this._introExitCallback !== undefined) {
      this._introExitCallback.call(this);
    } //set the step to zero


    this._currentStep = undefined;
  }

  /**
   * Add overlay layer to the page
   *
   * @api private
   * @method _addOverlayLayer
   * @param {Object} targetElm
   */

  function addOverlayLayer(targetElm) {
    var _this = this;

    var overlayLayer = _createElement("div", {
      className: "introjs-overlay"
    });
    setStyle(overlayLayer, {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: "fixed"
    });
    targetElm.appendChild(overlayLayer);

    if (this._options.exitOnOverlayClick === true) {
      setStyle(overlayLayer, {
        cursor: "pointer"
      });

      overlayLayer.onclick = function () {
        exitIntro.call(_this, targetElm);
      };
    }

    return true;
  }

  /**
   * Initiate a new introduction/guide from an element in the page
   *
   * @api private
   * @method _introForElement
   * @param {Object} targetElm
   * @param {String} group
   * @returns {Boolean} Success or not?
   */

  function introForElement(targetElm, group) {
    var _this = this;

    var allIntroSteps = targetElm.querySelectorAll("*[data-intro]");
    var introItems = [];

    if (this._options.steps) {
      //use steps passed programmatically
      forEach(this._options.steps, function (step) {
        var currentItem = cloneObject(step); //set the step

        currentItem.step = introItems.length + 1;
        currentItem.title = currentItem.title || ""; //use querySelector function only when developer used CSS selector

        if (typeof currentItem.element === "string") {
          //grab the element with given selector from the page
          currentItem.element = document.querySelector(currentItem.element);
        } //intro without element


        if (typeof currentItem.element === "undefined" || currentItem.element === null) {
          var floatingElementQuery = document.querySelector(".introjsFloatingElement");

          if (floatingElementQuery === null) {
            floatingElementQuery = _createElement("div", {
              className: "introjsFloatingElement"
            });
            document.body.appendChild(floatingElementQuery);
          }

          currentItem.element = floatingElementQuery;
          currentItem.position = "floating";
        }

        currentItem.scrollTo = currentItem.scrollTo || _this._options.scrollTo;

        if (typeof currentItem.disableInteraction === "undefined") {
          currentItem.disableInteraction = _this._options.disableInteraction;
        }

        if (currentItem.element !== null) {
          introItems.push(currentItem);
        }
      });
    } else {
      //use steps from data-* annotations
      var elmsLength = allIntroSteps.length;
      var disableInteraction; //if there's no element to intro

      if (elmsLength < 1) {
        return false;
      }

      forEach(allIntroSteps, function (currentElement) {
        // PR #80
        // start intro for groups of elements
        if (group && currentElement.getAttribute("data-intro-group") !== group) {
          return;
        } // skip hidden elements


        if (currentElement.style.display === "none") {
          return;
        }

        var step = parseInt(currentElement.getAttribute("data-step"), 10);

        if (currentElement.hasAttribute("data-disable-interaction")) {
          disableInteraction = !!currentElement.getAttribute("data-disable-interaction");
        } else {
          disableInteraction = _this._options.disableInteraction;
        }

        if (step > 0) {
          introItems[step - 1] = {
            element: currentElement,
            title: currentElement.getAttribute("data-title") || "",
            intro: currentElement.getAttribute("data-intro"),
            step: parseInt(currentElement.getAttribute("data-step"), 10),
            tooltipClass: currentElement.getAttribute("data-tooltipclass"),
            highlightClass: currentElement.getAttribute("data-highlightclass"),
            position: currentElement.getAttribute("data-position") || _this._options.tooltipPosition,
            scrollTo: currentElement.getAttribute("data-scrollto") || _this._options.scrollTo,
            disableInteraction: disableInteraction
          };
        }
      }); //next add intro items without data-step
      //todo: we need a cleanup here, two loops are redundant

      var _nextStep = 0;
      forEach(allIntroSteps, function (currentElement) {
        // PR #80
        // start intro for groups of elements
        if (group && currentElement.getAttribute("data-intro-group") !== group) {
          return;
        }

        if (currentElement.getAttribute("data-step") === null) {
          while (true) {
            if (typeof introItems[_nextStep] === "undefined") {
              break;
            } else {
              _nextStep++;
            }
          }

          if (currentElement.hasAttribute("data-disable-interaction")) {
            disableInteraction = !!currentElement.getAttribute("data-disable-interaction");
          } else {
            disableInteraction = _this._options.disableInteraction;
          }

          introItems[_nextStep] = {
            element: currentElement,
            title: currentElement.getAttribute("data-title") || "",
            intro: currentElement.getAttribute("data-intro"),
            step: _nextStep + 1,
            tooltipClass: currentElement.getAttribute("data-tooltipclass"),
            highlightClass: currentElement.getAttribute("data-highlightclass"),
            position: currentElement.getAttribute("data-position") || _this._options.tooltipPosition,
            scrollTo: currentElement.getAttribute("data-scrollto") || _this._options.scrollTo,
            disableInteraction: disableInteraction
          };
        }
      });
    } //removing undefined/null elements


    var tempIntroItems = [];

    for (var z = 0; z < introItems.length; z++) {
      if (introItems[z]) {
        // copy non-falsy values to the end of the array
        tempIntroItems.push(introItems[z]);
      }
    }

    introItems = tempIntroItems; //Ok, sort all items with given steps

    introItems.sort(function (a, b) {
      return a.step - b.step;
    }); //set it to the introJs object

    this._introItems = introItems; //add overlay layer to the page

    if (addOverlayLayer.call(this, targetElm)) {
      //then, start the show
      nextStep.call(this);

      if (this._options.keyboardNavigation) {
        DOMEvent.on(window, "keydown", onKeyDown, this, true);
      } //for window resize


      DOMEvent.on(window, "resize", onResize, this, true);
    }

    return false;
  }

  var version$1 = "3.4.0";

  /**
   * IntroJs main class
   *
   * @class IntroJs
   */

  function IntroJs(obj) {
    this._targetElement = obj;
    this._introItems = [];
    this._options = {
      /* Next button label in tooltip box */
      nextLabel: "Next",

      /* Previous button label in tooltip box */
      prevLabel: "Back",

      /* Skip button label in tooltip box */
      skipLabel: "×",

      /* Done button label in tooltip box */
      doneLabel: "Done",

      /* Hide previous button in the first step? Otherwise, it will be disabled button. */
      hidePrev: false,

      /* Hide next button in the last step? Otherwise, it will be disabled button (note: this will also hide the "Done" button) */
      hideNext: false,

      /* Change the Next button to Done in the last step of the intro? otherwise, it will render a disabled button */
      nextToDone: true,

      /* Default tooltip box position */
      tooltipPosition: "bottom",

      /* Next CSS class for tooltip boxes */
      tooltipClass: "",

      /* CSS class that is added to the helperLayer */
      highlightClass: "",

      /* Close introduction when pressing Escape button? */
      exitOnEsc: true,

      /* Close introduction when clicking on overlay layer? */
      exitOnOverlayClick: true,

      /* Show step numbers in introduction? */
      showStepNumbers: false,

      /* Let user use keyboard to navigate the tour? */
      keyboardNavigation: true,

      /* Show tour control buttons? */
      showButtons: true,

      /* Show tour bullets? */
      showBullets: true,

      /* Show tour progress? */
      showProgress: false,

      /* Scroll to highlighted element? */
      scrollToElement: true,

      /*
       * Should we scroll the tooltip or target element?
       *
       * Options are: 'element' or 'tooltip'
       */
      scrollTo: "element",

      /* Padding to add after scrolling when element is not in the viewport (in pixels) */
      scrollPadding: 30,

      /* Set the overlay opacity */
      overlayOpacity: 0.5,

      /* To determine the tooltip position automatically based on the window.width/height */
      autoPosition: true,

      /* Precedence of positions, when auto is enabled */
      positionPrecedence: ["bottom", "top", "right", "left"],

      /* Disable an interaction with element? */
      disableInteraction: false,

      /* Set how much padding to be used around helper element */
      helperElementPadding: 10,

      /* Default hint position */
      hintPosition: "top-middle",

      /* Hint button label */
      hintButtonLabel: "Got it",

      /* Adding animation to hints? */
      hintAnimation: true,

      /* additional classes to put on the buttons */
      buttonClass: "introjs-button",

      /* additional classes to put on progress bar */
      progressBarAdditionalClass: false
    };
  }

  var introJs = function introJs(targetElm) {
    var instance;

    if (_typeof(targetElm) === "object") {
      //Ok, create a new instance
      instance = new IntroJs(targetElm);
    } else if (typeof targetElm === "string") {
      //select the target element with query selector
      var targetElement = document.querySelector(targetElm);

      if (targetElement) {
        instance = new IntroJs(targetElement);
      } else {
        throw new Error("There is no element with given selector.");
      }
    } else {
      instance = new IntroJs(document.body);
    } // add instance to list of _instances
    // passing group to stamp to increment
    // from 0 onward somewhat reliably


    introJs.instances[stamp(instance, "introjs-instance")] = instance;
    return instance;
  };
  /**
   * Current IntroJs version
   *
   * @property version
   * @type String
   */


  introJs.version = version$1;
  /**
   * key-val object helper for introJs instances
   *
   * @property instances
   * @type Object
   */

  introJs.instances = {}; //Prototype

  introJs.fn = IntroJs.prototype = {
    clone: function clone() {
      return new IntroJs(this);
    },
    setOption: function setOption(option, value) {
      this._options[option] = value;
      return this;
    },
    setOptions: function setOptions(options) {
      this._options = mergeOptions(this._options, options);
      return this;
    },
    start: function start(group) {
      introForElement.call(this, this._targetElement, group);
      return this;
    },
    goToStep: function goToStep$1(step) {
      goToStep.call(this, step);

      return this;
    },
    addStep: function addStep(options) {
      if (!this._options.steps) {
        this._options.steps = [];
      }

      this._options.steps.push(options);

      return this;
    },
    addSteps: function addSteps(steps) {
      if (!steps.length) return;

      for (var index = 0; index < steps.length; index++) {
        this.addStep(steps[index]);
      }

      return this;
    },
    goToStepNumber: function goToStepNumber$1(step) {
      goToStepNumber.call(this, step);

      return this;
    },
    nextStep: function nextStep$1() {
      nextStep.call(this);

      return this;
    },
    previousStep: function previousStep$1() {
      previousStep.call(this);

      return this;
    },
    currentStep: function currentStep$1() {
      return currentStep.call(this);
    },
    exit: function exit(force) {
      exitIntro.call(this, this._targetElement, force);
      return this;
    },
    refresh: function refresh$1() {
      refresh.call(this);

      return this;
    },
    onbeforechange: function onbeforechange(providedCallback) {
      if (typeof providedCallback === "function") {
        this._introBeforeChangeCallback = providedCallback;
      } else {
        throw new Error("Provided callback for onbeforechange was not a function");
      }

      return this;
    },
    onchange: function onchange(providedCallback) {
      if (typeof providedCallback === "function") {
        this._introChangeCallback = providedCallback;
      } else {
        throw new Error("Provided callback for onchange was not a function.");
      }

      return this;
    },
    onafterchange: function onafterchange(providedCallback) {
      if (typeof providedCallback === "function") {
        this._introAfterChangeCallback = providedCallback;
      } else {
        throw new Error("Provided callback for onafterchange was not a function");
      }

      return this;
    },
    oncomplete: function oncomplete(providedCallback) {
      if (typeof providedCallback === "function") {
        this._introCompleteCallback = providedCallback;
      } else {
        throw new Error("Provided callback for oncomplete was not a function.");
      }

      return this;
    },
    onhintsadded: function onhintsadded(providedCallback) {
      if (typeof providedCallback === "function") {
        this._hintsAddedCallback = providedCallback;
      } else {
        throw new Error("Provided callback for onhintsadded was not a function.");
      }

      return this;
    },
    onhintclick: function onhintclick(providedCallback) {
      if (typeof providedCallback === "function") {
        this._hintClickCallback = providedCallback;
      } else {
        throw new Error("Provided callback for onhintclick was not a function.");
      }

      return this;
    },
    onhintclose: function onhintclose(providedCallback) {
      if (typeof providedCallback === "function") {
        this._hintCloseCallback = providedCallback;
      } else {
        throw new Error("Provided callback for onhintclose was not a function.");
      }

      return this;
    },
    onexit: function onexit(providedCallback) {
      if (typeof providedCallback === "function") {
        this._introExitCallback = providedCallback;
      } else {
        throw new Error("Provided callback for onexit was not a function.");
      }

      return this;
    },
    onskip: function onskip(providedCallback) {
      if (typeof providedCallback === "function") {
        this._introSkipCallback = providedCallback;
      } else {
        throw new Error("Provided callback for onskip was not a function.");
      }

      return this;
    },
    onbeforeexit: function onbeforeexit(providedCallback) {
      if (typeof providedCallback === "function") {
        this._introBeforeExitCallback = providedCallback;
      } else {
        throw new Error("Provided callback for onbeforeexit was not a function.");
      }

      return this;
    },
    addHints: function addHints() {
      populateHints.call(this, this._targetElement);
      return this;
    },
    hideHint: function hideHint$1(stepId) {
      hideHint.call(this, stepId);

      return this;
    },
    hideHints: function hideHints$1() {
      hideHints.call(this);

      return this;
    },
    showHint: function showHint$1(stepId) {
      showHint.call(this, stepId);

      return this;
    },
    showHints: function showHints$1() {
      showHints.call(this);

      return this;
    },
    removeHints: function removeHints$1() {
      removeHints.call(this);

      return this;
    },
    removeHint: function removeHint$1(stepId) {
      removeHint().call(this, stepId);

      return this;
    },
    showHintDialog: function showHintDialog$1(stepId) {
      showHintDialog.call(this, stepId);

      return this;
    }
  };

  return introJs;

})));
