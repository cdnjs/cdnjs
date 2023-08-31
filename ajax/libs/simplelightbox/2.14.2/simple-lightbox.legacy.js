/*!
	By André Rinas, www.andrerinas.de
	Documentation, www.simplelightbox.com
	Available for use under the MIT License
	Version 2.14.2
*/
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var isCallable = require('../internals/is-callable');
var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};

},{"../internals/is-callable":69,"../internals/try-to-string":140}],2:[function(require,module,exports){
var isConstructor = require('../internals/is-constructor');
var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a constructor');
};

},{"../internals/is-constructor":70,"../internals/try-to-string":140}],3:[function(require,module,exports){
var isCallable = require('../internals/is-callable');

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};

},{"../internals/is-callable":69}],4:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');
var create = require('../internals/object-create');
var defineProperty = require('../internals/object-define-property').f;

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

},{"../internals/object-create":89,"../internals/object-define-property":91,"../internals/well-known-symbol":148}],5:[function(require,module,exports){
'use strict';
var charAt = require('../internals/string-multibyte').charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

},{"../internals/string-multibyte":123}],6:[function(require,module,exports){
var isObject = require('../internals/is-object');

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};

},{"../internals/is-object":73}],7:[function(require,module,exports){
'use strict';
var $forEach = require('../internals/array-iteration').forEach;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

},{"../internals/array-iteration":10,"../internals/array-method-is-strict":12}],8:[function(require,module,exports){
'use strict';
var bind = require('../internals/function-bind-context');
var call = require('../internals/function-call');
var toObject = require('../internals/to-object');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var isConstructor = require('../internals/is-constructor');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var createProperty = require('../internals/create-property');
var getIterator = require('../internals/get-iterator');
var getIteratorMethod = require('../internals/get-iterator-method');

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

},{"../internals/call-with-safe-iteration-closing":18,"../internals/create-property":28,"../internals/function-bind-context":46,"../internals/function-call":49,"../internals/get-iterator":55,"../internals/get-iterator-method":54,"../internals/is-array-iterator-method":67,"../internals/is-constructor":70,"../internals/length-of-array-like":82,"../internals/to-object":135}],9:[function(require,module,exports){
var toIndexedObject = require('../internals/to-indexed-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');

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

},{"../internals/length-of-array-like":82,"../internals/to-absolute-index":131,"../internals/to-indexed-object":132}],10:[function(require,module,exports){
var bind = require('../internals/function-bind-context');
var uncurryThis = require('../internals/function-uncurry-this');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var arraySpeciesCreate = require('../internals/array-species-create');

var push = uncurryThis([].push);

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
    var boundFunction = bind(callbackfn, that);
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
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
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

},{"../internals/array-species-create":17,"../internals/function-bind-context":46,"../internals/function-uncurry-this":52,"../internals/indexed-object":63,"../internals/length-of-array-like":82,"../internals/to-object":135}],11:[function(require,module,exports){
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

},{"../internals/engine-v8-version":40,"../internals/fails":43,"../internals/well-known-symbol":148}],12:[function(require,module,exports){
'use strict';
var fails = require('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};

},{"../internals/fails":43}],13:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var isArray = require('../internals/is-array');

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};

},{"../internals/descriptors":33,"../internals/is-array":68}],14:[function(require,module,exports){
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var createProperty = require('../internals/create-property');

var $Array = Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = $Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};

},{"../internals/create-property":28,"../internals/length-of-array-like":82,"../internals/to-absolute-index":131}],15:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis([].slice);

},{"../internals/function-uncurry-this":52}],16:[function(require,module,exports){
var isArray = require('../internals/is-array');
var isConstructor = require('../internals/is-constructor');
var isObject = require('../internals/is-object');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};

},{"../internals/is-array":68,"../internals/is-constructor":70,"../internals/is-object":73,"../internals/well-known-symbol":148}],17:[function(require,module,exports){
var arraySpeciesConstructor = require('../internals/array-species-constructor');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

},{"../internals/array-species-constructor":16}],18:[function(require,module,exports){
var anObject = require('../internals/an-object');
var iteratorClose = require('../internals/iterator-close');

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};

},{"../internals/an-object":6,"../internals/iterator-close":77}],19:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

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

},{"../internals/well-known-symbol":148}],20:[function(require,module,exports){
var uncurryThisRaw = require('../internals/function-uncurry-this-raw');

var toString = uncurryThisRaw({}.toString);
var stringSlice = uncurryThisRaw(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

},{"../internals/function-uncurry-this-raw":51}],21:[function(require,module,exports){
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var isCallable = require('../internals/is-callable');
var classofRaw = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

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
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

},{"../internals/classof-raw":20,"../internals/is-callable":69,"../internals/to-string-tag-support":138,"../internals/well-known-symbol":148}],22:[function(require,module,exports){
var hasOwn = require('../internals/has-own-property');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

},{"../internals/has-own-property":59,"../internals/object-define-property":91,"../internals/object-get-own-property-descriptor":92,"../internals/own-keys":104}],23:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};

},{"../internals/well-known-symbol":148}],24:[function(require,module,exports){
var fails = require('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":43}],25:[function(require,module,exports){
// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};

},{}],26:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/create-property-descriptor":27,"../internals/descriptors":33,"../internals/object-define-property":91}],27:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],28:[function(require,module,exports){
'use strict';
var toPropertyKey = require('../internals/to-property-key');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

},{"../internals/create-property-descriptor":27,"../internals/object-define-property":91,"../internals/to-property-key":137}],29:[function(require,module,exports){
var makeBuiltIn = require('../internals/make-built-in');
var defineProperty = require('../internals/object-define-property');

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};

},{"../internals/make-built-in":83,"../internals/object-define-property":91}],30:[function(require,module,exports){
var isCallable = require('../internals/is-callable');
var definePropertyModule = require('../internals/object-define-property');
var makeBuiltIn = require('../internals/make-built-in');
var defineGlobalProperty = require('../internals/define-global-property');

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

},{"../internals/define-global-property":31,"../internals/is-callable":69,"../internals/make-built-in":83,"../internals/object-define-property":91}],31:[function(require,module,exports){
var global = require('../internals/global');

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};

},{"../internals/global":58}],32:[function(require,module,exports){
'use strict';
var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

module.exports = function (O, P) {
  if (!delete O[P]) throw $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};

},{"../internals/try-to-string":140}],33:[function(require,module,exports){
var fails = require('../internals/fails');

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":43}],34:[function(require,module,exports){
var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};

},{}],35:[function(require,module,exports){
var global = require('../internals/global');
var isObject = require('../internals/is-object');

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global":58,"../internals/is-object":73}],36:[function(require,module,exports){
var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = require('../internals/document-create-element');

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

},{"../internals/document-create-element":35}],39:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":53}],40:[function(require,module,exports){
var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

},{"../internals/engine-user-agent":39,"../internals/global":58}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var defineBuiltIn = require('../internals/define-built-in');
var defineGlobalProperty = require('../internals/define-global-property');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var isForced = require('../internals/is-forced');

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};

},{"../internals/copy-constructor-properties":22,"../internals/create-non-enumerable-property":26,"../internals/define-built-in":30,"../internals/define-global-property":31,"../internals/global":58,"../internals/is-forced":71,"../internals/object-get-own-property-descriptor":92}],43:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],44:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4` since it's moved to entry points
require('../modules/es.regexp.exec');
var uncurryThis = require('../internals/function-uncurry-this');
var defineBuiltIn = require('../internals/define-built-in');
var regexpExec = require('../internals/regexp-exec');
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
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
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};

},{"../internals/create-non-enumerable-property":26,"../internals/define-built-in":30,"../internals/fails":43,"../internals/function-uncurry-this":52,"../internals/regexp-exec":108,"../internals/well-known-symbol":148,"../modules/es.regexp.exec":172}],45:[function(require,module,exports){
var NATIVE_BIND = require('../internals/function-bind-native');

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});

},{"../internals/function-bind-native":47}],46:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var NATIVE_BIND = require('../internals/function-bind-native');

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-callable":1,"../internals/function-bind-native":47,"../internals/function-uncurry-this":52}],47:[function(require,module,exports){
var fails = require('../internals/fails');

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

},{"../internals/fails":43}],48:[function(require,module,exports){
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var isObject = require('../internals/is-object');
var hasOwn = require('../internals/has-own-property');
var arraySlice = require('../internals/array-slice');
var NATIVE_BIND = require('../internals/function-bind-native');

var $Function = Function;
var concat = uncurryThis([].concat);
var join = uncurryThis([].join);
var factories = {};

var construct = function (C, argsLength, args) {
  if (!hasOwn(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
module.exports = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
  var F = aCallable(this);
  var Prototype = F.prototype;
  var partArgs = arraySlice(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = concat(partArgs, arraySlice(arguments));
    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
  };
  if (isObject(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};

},{"../internals/a-callable":1,"../internals/array-slice":15,"../internals/function-bind-native":47,"../internals/function-uncurry-this":52,"../internals/has-own-property":59,"../internals/is-object":73}],49:[function(require,module,exports){
var NATIVE_BIND = require('../internals/function-bind-native');

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

},{"../internals/function-bind-native":47}],50:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var hasOwn = require('../internals/has-own-property');

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

},{"../internals/descriptors":33,"../internals/has-own-property":59}],51:[function(require,module,exports){
var NATIVE_BIND = require('../internals/function-bind-native');

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = function (fn) {
  return NATIVE_BIND ? uncurryThisWithBind(fn) : function () {
    return call.apply(fn, arguments);
  };
};

},{"../internals/function-bind-native":47}],52:[function(require,module,exports){
var classofRaw = require('../internals/classof-raw');
var uncurryThisRaw = require('../internals/function-uncurry-this-raw');

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThisRaw(fn);
};

},{"../internals/classof-raw":20,"../internals/function-uncurry-this-raw":51}],53:[function(require,module,exports){
var global = require('../internals/global');
var isCallable = require('../internals/is-callable');

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

},{"../internals/global":58,"../internals/is-callable":69}],54:[function(require,module,exports){
var classof = require('../internals/classof');
var getMethod = require('../internals/get-method');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};

},{"../internals/classof":21,"../internals/get-method":56,"../internals/is-null-or-undefined":72,"../internals/iterators":81,"../internals/well-known-symbol":148}],55:[function(require,module,exports){
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var tryToString = require('../internals/try-to-string');
var getIteratorMethod = require('../internals/get-iterator-method');

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};

},{"../internals/a-callable":1,"../internals/an-object":6,"../internals/function-call":49,"../internals/get-iterator-method":54,"../internals/try-to-string":140}],56:[function(require,module,exports){
var aCallable = require('../internals/a-callable');
var isNullOrUndefined = require('../internals/is-null-or-undefined');

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};

},{"../internals/a-callable":1,"../internals/is-null-or-undefined":72}],57:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

},{"../internals/function-uncurry-this":52,"../internals/to-object":135}],58:[function(require,module,exports){
(function (global){(function (){
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

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],59:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

},{"../internals/function-uncurry-this":52,"../internals/to-object":135}],60:[function(require,module,exports){
module.exports = {};

},{}],61:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":53}],62:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":33,"../internals/document-create-element":35,"../internals/fails":43}],63:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;

},{"../internals/classof-raw":20,"../internals/fails":43,"../internals/function-uncurry-this":52}],64:[function(require,module,exports){
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var setPrototypeOf = require('../internals/object-set-prototype-of');

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

},{"../internals/is-callable":69,"../internals/is-object":73,"../internals/object-set-prototype-of":101}],65:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var isCallable = require('../internals/is-callable');
var store = require('../internals/shared-store');

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/function-uncurry-this":52,"../internals/is-callable":69,"../internals/shared-store":120}],66:[function(require,module,exports){
var NATIVE_WEAK_MAP = require('../internals/weak-map-basic-detection');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var hasOwn = require('../internals/has-own-property');
var shared = require('../internals/shared-store');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
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
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
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

},{"../internals/create-non-enumerable-property":26,"../internals/global":58,"../internals/has-own-property":59,"../internals/hidden-keys":60,"../internals/is-object":73,"../internals/shared-key":119,"../internals/shared-store":120,"../internals/weak-map-basic-detection":145}],67:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/iterators":81,"../internals/well-known-symbol":148}],68:[function(require,module,exports){
var classof = require('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};

},{"../internals/classof-raw":20}],69:[function(require,module,exports){
var $documentAll = require('../internals/document-all');

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};

},{"../internals/document-all":34}],70:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var classof = require('../internals/classof');
var getBuiltIn = require('../internals/get-built-in');
var inspectSource = require('../internals/inspect-source');

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

},{"../internals/classof":21,"../internals/fails":43,"../internals/function-uncurry-this":52,"../internals/get-built-in":53,"../internals/inspect-source":65,"../internals/is-callable":69}],71:[function(require,module,exports){
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');

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

},{"../internals/fails":43,"../internals/is-callable":69}],72:[function(require,module,exports){
// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};

},{}],73:[function(require,module,exports){
var isCallable = require('../internals/is-callable');
var $documentAll = require('../internals/document-all');

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

},{"../internals/document-all":34,"../internals/is-callable":69}],74:[function(require,module,exports){
module.exports = false;

},{}],75:[function(require,module,exports){
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

},{"../internals/classof-raw":20,"../internals/is-object":73,"../internals/well-known-symbol":148}],76:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

},{"../internals/get-built-in":53,"../internals/is-callable":69,"../internals/object-is-prototype-of":97,"../internals/use-symbol-as-uid":142}],77:[function(require,module,exports){
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var getMethod = require('../internals/get-method');

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

},{"../internals/an-object":6,"../internals/function-call":49,"../internals/get-method":56}],78:[function(require,module,exports){
'use strict';
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var setToStringTag = require('../internals/set-to-string-tag');
var Iterators = require('../internals/iterators');

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

},{"../internals/create-property-descriptor":27,"../internals/iterators":81,"../internals/iterators-core":80,"../internals/object-create":89,"../internals/set-to-string-tag":118}],79:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var IS_PURE = require('../internals/is-pure');
var FunctionName = require('../internals/function-name');
var isCallable = require('../internals/is-callable');
var createIteratorConstructor = require('../internals/iterator-create-constructor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var defineBuiltIn = require('../internals/define-built-in');
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');
var IteratorsCore = require('../internals/iterators-core');

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
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
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
      defaultIterator = function values() { return call(nativeIterator, this); };
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
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};

},{"../internals/create-non-enumerable-property":26,"../internals/define-built-in":30,"../internals/export":42,"../internals/function-call":49,"../internals/function-name":50,"../internals/is-callable":69,"../internals/is-pure":74,"../internals/iterator-create-constructor":78,"../internals/iterators":81,"../internals/iterators-core":80,"../internals/object-get-prototype-of":96,"../internals/object-set-prototype-of":101,"../internals/set-to-string-tag":118,"../internals/well-known-symbol":148}],80:[function(require,module,exports){
'use strict';
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var defineBuiltIn = require('../internals/define-built-in');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

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

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/define-built-in":30,"../internals/fails":43,"../internals/is-callable":69,"../internals/is-object":73,"../internals/is-pure":74,"../internals/object-create":89,"../internals/object-get-prototype-of":96,"../internals/well-known-symbol":148}],81:[function(require,module,exports){
arguments[4][60][0].apply(exports,arguments)
},{"dup":60}],82:[function(require,module,exports){
var toLength = require('../internals/to-length');

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};

},{"../internals/to-length":134}],83:[function(require,module,exports){
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var hasOwn = require('../internals/has-own-property');
var DESCRIPTORS = require('../internals/descriptors');
var CONFIGURABLE_FUNCTION_NAME = require('../internals/function-name').CONFIGURABLE;
var inspectSource = require('../internals/inspect-source');
var InternalStateModule = require('../internals/internal-state');

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

},{"../internals/descriptors":33,"../internals/fails":43,"../internals/function-name":50,"../internals/has-own-property":59,"../internals/inspect-source":65,"../internals/internal-state":66,"../internals/is-callable":69}],84:[function(require,module,exports){
var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

},{}],85:[function(require,module,exports){
var isRegExp = require('../internals/is-regexp');

var $TypeError = TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw $TypeError("The method doesn't accept regular expressions");
  } return it;
};

},{"../internals/is-regexp":75}],86:[function(require,module,exports){
var global = require('../internals/global');
var fails = require('../internals/fails');
var uncurryThis = require('../internals/function-uncurry-this');
var toString = require('../internals/to-string');
var trim = require('../internals/string-trim').trim;
var whitespaces = require('../internals/whitespaces');

var charAt = uncurryThis(''.charAt);
var $parseFloat = global.parseFloat;
var Symbol = global.Symbol;
var ITERATOR = Symbol && Symbol.iterator;
var FORCED = 1 / $parseFloat(whitespaces + '-0') !== -Infinity
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR && !fails(function () { $parseFloat(Object(ITERATOR)); }));

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(toString(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && charAt(trimmedString, 0) == '-' ? -0 : result;
} : $parseFloat;

},{"../internals/fails":43,"../internals/function-uncurry-this":52,"../internals/global":58,"../internals/string-trim":126,"../internals/to-string":139,"../internals/whitespaces":149}],87:[function(require,module,exports){
var global = require('../internals/global');
var fails = require('../internals/fails');
var uncurryThis = require('../internals/function-uncurry-this');
var toString = require('../internals/to-string');
var trim = require('../internals/string-trim').trim;
var whitespaces = require('../internals/whitespaces');

var $parseInt = global.parseInt;
var Symbol = global.Symbol;
var ITERATOR = Symbol && Symbol.iterator;
var hex = /^[+-]?0x/i;
var exec = uncurryThis(hex.exec);
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR && !fails(function () { $parseInt(Object(ITERATOR)); }));

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(toString(string));
  return $parseInt(S, (radix >>> 0) || (exec(hex, S) ? 16 : 10));
} : $parseInt;

},{"../internals/fails":43,"../internals/function-uncurry-this":52,"../internals/global":58,"../internals/string-trim":126,"../internals/to-string":139,"../internals/whitespaces":149}],88:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var uncurryThis = require('../internals/function-uncurry-this');
var call = require('../internals/function-call');
var fails = require('../internals/fails');
var objectKeys = require('../internals/object-keys');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

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
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"../internals/descriptors":33,"../internals/fails":43,"../internals/function-call":49,"../internals/function-uncurry-this":52,"../internals/indexed-object":63,"../internals/object-get-own-property-symbols":95,"../internals/object-keys":99,"../internals/object-property-is-enumerable":100,"../internals/to-object":135}],89:[function(require,module,exports){
/* global ActiveXObject -- old IE, WSH */
var anObject = require('../internals/an-object');
var definePropertiesModule = require('../internals/object-define-properties');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = require('../internals/hidden-keys');
var html = require('../internals/html');
var documentCreateElement = require('../internals/document-create-element');
var sharedKey = require('../internals/shared-key');

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
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

},{"../internals/an-object":6,"../internals/document-create-element":35,"../internals/enum-bug-keys":41,"../internals/hidden-keys":60,"../internals/html":61,"../internals/object-define-properties":90,"../internals/shared-key":119}],90:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug');
var definePropertyModule = require('../internals/object-define-property');
var anObject = require('../internals/an-object');
var toIndexedObject = require('../internals/to-indexed-object');
var objectKeys = require('../internals/object-keys');

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};

},{"../internals/an-object":6,"../internals/descriptors":33,"../internals/object-define-property":91,"../internals/object-keys":99,"../internals/to-indexed-object":132,"../internals/v8-prototype-define-bug":143}],91:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug');
var anObject = require('../internals/an-object');
var toPropertyKey = require('../internals/to-property-key');

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/an-object":6,"../internals/descriptors":33,"../internals/ie8-dom-define":62,"../internals/to-property-key":137,"../internals/v8-prototype-define-bug":143}],92:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var call = require('../internals/function-call');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPropertyKey = require('../internals/to-property-key');
var hasOwn = require('../internals/has-own-property');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

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
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

},{"../internals/create-property-descriptor":27,"../internals/descriptors":33,"../internals/function-call":49,"../internals/has-own-property":59,"../internals/ie8-dom-define":62,"../internals/object-property-is-enumerable":100,"../internals/to-indexed-object":132,"../internals/to-property-key":137}],93:[function(require,module,exports){
/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof = require('../internals/classof-raw');
var toIndexedObject = require('../internals/to-indexed-object');
var $getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var arraySlice = require('../internals/array-slice-simple');

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};

},{"../internals/array-slice-simple":14,"../internals/classof-raw":20,"../internals/object-get-own-property-names":94,"../internals/to-indexed-object":132}],94:[function(require,module,exports){
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/enum-bug-keys":41,"../internals/object-keys-internal":98}],95:[function(require,module,exports){
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],96:[function(require,module,exports){
var hasOwn = require('../internals/has-own-property');
var isCallable = require('../internals/is-callable');
var toObject = require('../internals/to-object');
var sharedKey = require('../internals/shared-key');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};

},{"../internals/correct-prototype-getter":24,"../internals/has-own-property":59,"../internals/is-callable":69,"../internals/shared-key":119,"../internals/to-object":135}],97:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis({}.isPrototypeOf);

},{"../internals/function-uncurry-this":52}],98:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var hasOwn = require('../internals/has-own-property');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};

},{"../internals/array-includes":9,"../internals/function-uncurry-this":52,"../internals/has-own-property":59,"../internals/hidden-keys":60,"../internals/to-indexed-object":132}],99:[function(require,module,exports){
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/enum-bug-keys":41,"../internals/object-keys-internal":98}],100:[function(require,module,exports){
'use strict';
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

},{}],101:[function(require,module,exports){
/* eslint-disable no-proto -- safe */
var uncurryThis = require('../internals/function-uncurry-this');
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');

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
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

},{"../internals/a-possible-prototype":3,"../internals/an-object":6,"../internals/function-uncurry-this":52}],102:[function(require,module,exports){
'use strict';
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classof = require('../internals/classof');

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

},{"../internals/classof":21,"../internals/to-string-tag-support":138}],103:[function(require,module,exports){
var call = require('../internals/function-call');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};

},{"../internals/function-call":49,"../internals/is-callable":69,"../internals/is-object":73}],104:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

},{"../internals/an-object":6,"../internals/function-uncurry-this":52,"../internals/get-built-in":53,"../internals/object-get-own-property-names":94,"../internals/object-get-own-property-symbols":95}],105:[function(require,module,exports){
var global = require('../internals/global');

module.exports = global;

},{"../internals/global":58}],106:[function(require,module,exports){
var defineProperty = require('../internals/object-define-property').f;

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};

},{"../internals/object-define-property":91}],107:[function(require,module,exports){
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var isCallable = require('../internals/is-callable');
var classof = require('../internals/classof-raw');
var regexpExec = require('../internals/regexp-exec');

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw $TypeError('RegExp#exec called on incompatible receiver');
};

},{"../internals/an-object":6,"../internals/classof-raw":20,"../internals/function-call":49,"../internals/is-callable":69,"../internals/regexp-exec":108}],108:[function(require,module,exports){
'use strict';
/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var toString = require('../internals/to-string');
var regexpFlags = require('../internals/regexp-flags');
var stickyHelpers = require('../internals/regexp-sticky-helpers');
var shared = require('../internals/shared');
var create = require('../internals/object-create');
var getInternalState = require('../internals/internal-state').get;
var UNSUPPORTED_DOT_ALL = require('../internals/regexp-unsupported-dot-all');
var UNSUPPORTED_NCG = require('../internals/regexp-unsupported-ncg');

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
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

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;

},{"../internals/function-call":49,"../internals/function-uncurry-this":52,"../internals/internal-state":66,"../internals/object-create":89,"../internals/regexp-flags":109,"../internals/regexp-sticky-helpers":111,"../internals/regexp-unsupported-dot-all":112,"../internals/regexp-unsupported-ncg":113,"../internals/shared":121,"../internals/to-string":139}],109:[function(require,module,exports){
'use strict';
var anObject = require('../internals/an-object');

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

},{"../internals/an-object":6}],110:[function(require,module,exports){
var call = require('../internals/function-call');
var hasOwn = require('../internals/has-own-property');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var regExpFlags = require('../internals/regexp-flags');

var RegExpPrototype = RegExp.prototype;

module.exports = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R)
    ? call(regExpFlags, R) : flags;
};

},{"../internals/function-call":49,"../internals/has-own-property":59,"../internals/object-is-prototype-of":97,"../internals/regexp-flags":109}],111:[function(require,module,exports){
var fails = require('../internals/fails');
var global = require('../internals/global');

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};

},{"../internals/fails":43,"../internals/global":58}],112:[function(require,module,exports){
var fails = require('../internals/fails');
var global = require('../internals/global');

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

},{"../internals/fails":43,"../internals/global":58}],113:[function(require,module,exports){
var fails = require('../internals/fails');
var global = require('../internals/global');

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

},{"../internals/fails":43,"../internals/global":58}],114:[function(require,module,exports){
var isNullOrUndefined = require('../internals/is-null-or-undefined');

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};

},{"../internals/is-null-or-undefined":72}],115:[function(require,module,exports){
// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],116:[function(require,module,exports){
var global = require('../internals/global');
var apply = require('../internals/function-apply');
var isCallable = require('../internals/is-callable');
var userAgent = require('../internals/engine-user-agent');
var arraySlice = require('../internals/array-slice');
var validateArgumentsLength = require('../internals/validate-arguments-length');

var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var Function = global.Function;

var wrap = function (scheduler) {
  return MSIE ? function (handler, timeout /* , ...arguments */) {
    var boundArgs = validateArgumentsLength(arguments.length, 1) > 2;
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = boundArgs ? arraySlice(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      apply(fn, this, args);
    } : fn, timeout);
  } : scheduler;
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
module.exports = {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
};

},{"../internals/array-slice":15,"../internals/engine-user-agent":39,"../internals/function-apply":45,"../internals/global":58,"../internals/is-callable":69,"../internals/validate-arguments-length":144}],117:[function(require,module,exports){
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var definePropertyModule = require('../internals/object-define-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var DESCRIPTORS = require('../internals/descriptors');

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

},{"../internals/descriptors":33,"../internals/get-built-in":53,"../internals/object-define-property":91,"../internals/well-known-symbol":148}],118:[function(require,module,exports){
var defineProperty = require('../internals/object-define-property').f;
var hasOwn = require('../internals/has-own-property');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

},{"../internals/has-own-property":59,"../internals/object-define-property":91,"../internals/well-known-symbol":148}],119:[function(require,module,exports){
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":121,"../internals/uid":141}],120:[function(require,module,exports){
var global = require('../internals/global');
var defineGlobalProperty = require('../internals/define-global-property');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;

},{"../internals/define-global-property":31,"../internals/global":58}],121:[function(require,module,exports){
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.25.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.25.5/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

},{"../internals/is-pure":74,"../internals/shared-store":120}],122:[function(require,module,exports){
var anObject = require('../internals/an-object');
var aConstructor = require('../internals/a-constructor');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES]) ? defaultConstructor : aConstructor(S);
};

},{"../internals/a-constructor":2,"../internals/an-object":6,"../internals/is-null-or-undefined":72,"../internals/well-known-symbol":148}],123:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toString = require('../internals/to-string');
var requireObjectCoercible = require('../internals/require-object-coercible');

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
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

},{"../internals/function-uncurry-this":52,"../internals/require-object-coercible":114,"../internals/to-integer-or-infinity":133,"../internals/to-string":139}],124:[function(require,module,exports){
var PROPER_FUNCTION_NAME = require('../internals/function-name').PROPER;
var fails = require('../internals/fails');
var whitespaces = require('../internals/whitespaces');

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  });
};

},{"../internals/fails":43,"../internals/function-name":50,"../internals/whitespaces":149}],125:[function(require,module,exports){
'use strict';
var $trimStart = require('../internals/string-trim').start;
var forcedStringTrimMethod = require('../internals/string-trim-forced');

// `String.prototype.{ trimStart, trimLeft }` method
// https://tc39.es/ecma262/#sec-string.prototype.trimstart
// https://tc39.es/ecma262/#String.prototype.trimleft
module.exports = forcedStringTrimMethod('trimStart') ? function trimStart() {
  return $trimStart(this);
// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
} : ''.trimStart;

},{"../internals/string-trim":126,"../internals/string-trim-forced":124}],126:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');
var whitespaces = require('../internals/whitespaces');

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
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

},{"../internals/function-uncurry-this":52,"../internals/require-object-coercible":114,"../internals/to-string":139,"../internals/whitespaces":149}],127:[function(require,module,exports){
/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = require('../internals/engine-v8-version');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

},{"../internals/engine-v8-version":40,"../internals/fails":43}],128:[function(require,module,exports){
var call = require('../internals/function-call');
var getBuiltIn = require('../internals/get-built-in');
var wellKnownSymbol = require('../internals/well-known-symbol');
var defineBuiltIn = require('../internals/define-built-in');

module.exports = function () {
  var Symbol = getBuiltIn('Symbol');
  var SymbolPrototype = Symbol && Symbol.prototype;
  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
    // eslint-disable-next-line no-unused-vars -- required for .length
    defineBuiltIn(SymbolPrototype, TO_PRIMITIVE, function (hint) {
      return call(valueOf, this);
    }, { arity: 1 });
  }
};

},{"../internals/define-built-in":30,"../internals/function-call":49,"../internals/get-built-in":53,"../internals/well-known-symbol":148}],129:[function(require,module,exports){
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');

/* eslint-disable es/no-symbol -- safe */
module.exports = NATIVE_SYMBOL && !!Symbol['for'] && !!Symbol.keyFor;

},{"../internals/symbol-constructor-detection":127}],130:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);

},{"../internals/function-uncurry-this":52}],131:[function(require,module,exports){
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer-or-infinity":133}],132:[function(require,module,exports){
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":63,"../internals/require-object-coercible":114}],133:[function(require,module,exports){
var trunc = require('../internals/math-trunc');

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

},{"../internals/math-trunc":84}],134:[function(require,module,exports){
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer-or-infinity":133}],135:[function(require,module,exports){
var requireObjectCoercible = require('../internals/require-object-coercible');

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":114}],136:[function(require,module,exports){
var call = require('../internals/function-call');
var isObject = require('../internals/is-object');
var isSymbol = require('../internals/is-symbol');
var getMethod = require('../internals/get-method');
var ordinaryToPrimitive = require('../internals/ordinary-to-primitive');
var wellKnownSymbol = require('../internals/well-known-symbol');

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

},{"../internals/function-call":49,"../internals/get-method":56,"../internals/is-object":73,"../internals/is-symbol":76,"../internals/ordinary-to-primitive":103,"../internals/well-known-symbol":148}],137:[function(require,module,exports){
var toPrimitive = require('../internals/to-primitive');
var isSymbol = require('../internals/is-symbol');

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

},{"../internals/is-symbol":76,"../internals/to-primitive":136}],138:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":148}],139:[function(require,module,exports){
var classof = require('../internals/classof');

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

},{"../internals/classof":21}],140:[function(require,module,exports){
var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};

},{}],141:[function(require,module,exports){
var uncurryThis = require('../internals/function-uncurry-this');

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

},{"../internals/function-uncurry-this":52}],142:[function(require,module,exports){
/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

},{"../internals/symbol-constructor-detection":127}],143:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

},{"../internals/descriptors":33,"../internals/fails":43}],144:[function(require,module,exports){
var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw $TypeError('Not enough arguments');
  return passed;
};

},{}],145:[function(require,module,exports){
var global = require('../internals/global');
var isCallable = require('../internals/is-callable');

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

},{"../internals/global":58,"../internals/is-callable":69}],146:[function(require,module,exports){
var path = require('../internals/path');
var hasOwn = require('../internals/has-own-property');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineProperty = require('../internals/object-define-property').f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

},{"../internals/has-own-property":59,"../internals/object-define-property":91,"../internals/path":105,"../internals/well-known-symbol-wrapped":147}],147:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

exports.f = wellKnownSymbol;

},{"../internals/well-known-symbol":148}],148:[function(require,module,exports){
var global = require('../internals/global');
var shared = require('../internals/shared');
var hasOwn = require('../internals/has-own-property');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

},{"../internals/global":58,"../internals/has-own-property":59,"../internals/shared":121,"../internals/symbol-constructor-detection":127,"../internals/uid":141,"../internals/use-symbol-as-uid":142}],149:[function(require,module,exports){
// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],150:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer');
var createProperty = require('../internals/create-property');
var arraySpeciesCreate = require('../internals/array-species-create');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
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
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

},{"../internals/array-method-has-species-support":11,"../internals/array-species-create":17,"../internals/create-property":28,"../internals/does-not-exceed-safe-integer":36,"../internals/engine-v8-version":40,"../internals/export":42,"../internals/fails":43,"../internals/is-array":68,"../internals/is-object":73,"../internals/length-of-array-like":82,"../internals/to-object":135,"../internals/well-known-symbol":148}],151:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var $filter = require('../internals/array-iteration').filter;
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/array-iteration":10,"../internals/array-method-has-species-support":11,"../internals/export":42}],152:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var forEach = require('../internals/array-for-each');

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});

},{"../internals/array-for-each":7,"../internals/export":42}],153:[function(require,module,exports){
var $ = require('../internals/export');
var from = require('../internals/array-from');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

},{"../internals/array-from":8,"../internals/check-correctness-of-iteration":19,"../internals/export":42}],154:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var $includes = require('../internals/array-includes').includes;
var fails = require('../internals/fails');
var addToUnscopables = require('../internals/add-to-unscopables');

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

},{"../internals/add-to-unscopables":4,"../internals/array-includes":9,"../internals/export":42,"../internals/fails":43}],155:[function(require,module,exports){
'use strict';
/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var $indexOf = require('../internals/array-includes').indexOf;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var nativeIndexOf = uncurryThis([].indexOf);

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf(this, searchElement, fromIndex) || 0
      : $indexOf(this, searchElement, fromIndex);
  }
});

},{"../internals/array-includes":9,"../internals/array-method-is-strict":12,"../internals/export":42,"../internals/function-uncurry-this":52}],156:[function(require,module,exports){
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});

},{"../internals/export":42,"../internals/is-array":68}],157:[function(require,module,exports){
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var addToUnscopables = require('../internals/add-to-unscopables');
var Iterators = require('../internals/iterators');
var InternalStateModule = require('../internals/internal-state');
var defineProperty = require('../internals/object-define-property').f;
var defineIterator = require('../internals/iterator-define');
var createIterResultObject = require('../internals/create-iter-result-object');
var IS_PURE = require('../internals/is-pure');
var DESCRIPTORS = require('../internals/descriptors');

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
    return createIterResultObject(undefined, true);
  }
  if (kind == 'keys') return createIterResultObject(index, false);
  if (kind == 'values') return createIterResultObject(target[index], false);
  return createIterResultObject([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

},{"../internals/add-to-unscopables":4,"../internals/create-iter-result-object":25,"../internals/descriptors":33,"../internals/internal-state":66,"../internals/is-pure":74,"../internals/iterator-define":79,"../internals/iterators":81,"../internals/object-define-property":91,"../internals/to-indexed-object":132}],158:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var isArray = require('../internals/is-array');
var isConstructor = require('../internals/is-constructor');
var isObject = require('../internals/is-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toIndexedObject = require('../internals/to-indexed-object');
var createProperty = require('../internals/create-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var nativeSlice = require('../internals/array-slice');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var $Array = Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === $Array || Constructor === undefined) {
        return nativeSlice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

},{"../internals/array-method-has-species-support":11,"../internals/array-slice":15,"../internals/create-property":28,"../internals/export":42,"../internals/is-array":68,"../internals/is-constructor":70,"../internals/is-object":73,"../internals/length-of-array-like":82,"../internals/to-absolute-index":131,"../internals/to-indexed-object":132,"../internals/well-known-symbol":148}],159:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var toObject = require('../internals/to-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var setArrayLength = require('../internals/array-set-length');
var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer');
var arraySpeciesCreate = require('../internals/array-species-create');
var createProperty = require('../internals/create-property');
var deletePropertyOrThrow = require('../internals/delete-property-or-throw');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max = Math.max;
var min = Math.min;

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
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
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
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
        else deletePropertyOrThrow(O, to);
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    setArrayLength(O, len - actualDeleteCount + insertCount);
    return A;
  }
});

},{"../internals/array-method-has-species-support":11,"../internals/array-set-length":13,"../internals/array-species-create":17,"../internals/create-property":28,"../internals/delete-property-or-throw":32,"../internals/does-not-exceed-safe-integer":36,"../internals/export":42,"../internals/length-of-array-like":82,"../internals/to-absolute-index":131,"../internals/to-integer-or-infinity":133,"../internals/to-object":135}],160:[function(require,module,exports){
// TODO: Remove from `core-js@4`
var uncurryThis = require('../internals/function-uncurry-this');
var defineBuiltIn = require('../internals/define-built-in');

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = uncurryThis(DatePrototype[TO_STRING]);
var thisTimeValue = uncurryThis(DatePrototype.getTime);

// `Date.prototype.toString` method
// https://tc39.es/ecma262/#sec-date.prototype.tostring
if (String(new Date(NaN)) != INVALID_DATE) {
  defineBuiltIn(DatePrototype, TO_STRING, function toString() {
    var value = thisTimeValue(this);
    // eslint-disable-next-line no-self-compare -- NaN check
    return value === value ? nativeDateToString(this) : INVALID_DATE;
  });
}

},{"../internals/define-built-in":30,"../internals/function-uncurry-this":52}],161:[function(require,module,exports){
// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var bind = require('../internals/function-bind');

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true, forced: Function.bind !== bind }, {
  bind: bind
});

},{"../internals/export":42,"../internals/function-bind":48}],162:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var FUNCTION_NAME_EXISTS = require('../internals/function-name').EXISTS;
var uncurryThis = require('../internals/function-uncurry-this');
var defineProperty = require('../internals/object-define-property').f;

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}

},{"../internals/descriptors":33,"../internals/function-name":50,"../internals/function-uncurry-this":52,"../internals/object-define-property":91}],163:[function(require,module,exports){
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var apply = require('../internals/function-apply');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var isArray = require('../internals/is-array');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var isSymbol = require('../internals/is-symbol');
var arraySlice = require('../internals/array-slice');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');

var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var numberToString = uncurryThis(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
  var symbol = getBuiltIn('Symbol')();
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) != '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) != '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithSymbolsFix = function (it, replacer) {
  var args = arraySlice(arguments);
  var $replacer = replacer;
  if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
  if (!isArray(replacer)) replacer = function (key, value) {
    if (isCallable($replacer)) value = call($replacer, this, key, value);
    if (!isSymbol(value)) return value;
  };
  args[1] = replacer;
  return apply($stringify, null, args);
};

var fixIllFormed = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
    }
  });
}

},{"../internals/array-slice":15,"../internals/export":42,"../internals/fails":43,"../internals/function-apply":45,"../internals/function-call":49,"../internals/function-uncurry-this":52,"../internals/get-built-in":53,"../internals/is-array":68,"../internals/is-callable":69,"../internals/is-object":73,"../internals/is-symbol":76,"../internals/symbol-constructor-detection":127}],164:[function(require,module,exports){
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var uncurryThis = require('../internals/function-uncurry-this');
var isForced = require('../internals/is-forced');
var defineBuiltIn = require('../internals/define-built-in');
var hasOwn = require('../internals/has-own-property');
var inheritIfRequired = require('../internals/inherit-if-required');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var isSymbol = require('../internals/is-symbol');
var toPrimitive = require('../internals/to-primitive');
var fails = require('../internals/fails');
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var defineProperty = require('../internals/object-define-property').f;
var thisNumberValue = require('../internals/this-number-value');
var trim = require('../internals/string-trim').trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = global.TypeError;
var arraySlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = arraySlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this;
    // check on 1..constructor(foo) case
    return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  defineBuiltIn(global, NUMBER, NumberWrapper, { constructor: true });
}

},{"../internals/define-built-in":30,"../internals/descriptors":33,"../internals/fails":43,"../internals/function-uncurry-this":52,"../internals/global":58,"../internals/has-own-property":59,"../internals/inherit-if-required":64,"../internals/is-forced":71,"../internals/is-symbol":76,"../internals/object-define-property":91,"../internals/object-get-own-property-descriptor":92,"../internals/object-get-own-property-names":94,"../internals/object-is-prototype-of":97,"../internals/string-trim":126,"../internals/this-number-value":130,"../internals/to-primitive":136}],165:[function(require,module,exports){
var $ = require('../internals/export');
var assign = require('../internals/object-assign');

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
  assign: assign
});

},{"../internals/export":42,"../internals/object-assign":88}],166:[function(require,module,exports){
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var defineProperty = require('../internals/object-define-property').f;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
// eslint-disable-next-line es/no-object-defineproperty -- safe
$({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty, sham: !DESCRIPTORS }, {
  defineProperty: defineProperty
});

},{"../internals/descriptors":33,"../internals/export":42,"../internals/object-define-property":91}],167:[function(require,module,exports){
var $ = require('../internals/export');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');
var fails = require('../internals/fails');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var toObject = require('../internals/to-object');

// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FORCED = !NATIVE_SYMBOL || fails(function () { getOwnPropertySymbolsModule.f(1); });

// `Object.getOwnPropertySymbols` method
// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
$({ target: 'Object', stat: true, forced: FORCED }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject(it)) : [];
  }
});

},{"../internals/export":42,"../internals/fails":43,"../internals/object-get-own-property-symbols":95,"../internals/symbol-constructor-detection":127,"../internals/to-object":135}],168:[function(require,module,exports){
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var defineBuiltIn = require('../internals/define-built-in');
var toString = require('../internals/object-to-string');

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
}

},{"../internals/define-built-in":30,"../internals/object-to-string":102,"../internals/to-string-tag-support":138}],169:[function(require,module,exports){
var $ = require('../internals/export');
var $parseFloat = require('../internals/number-parse-float');

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
$({ global: true, forced: parseFloat != $parseFloat }, {
  parseFloat: $parseFloat
});

},{"../internals/export":42,"../internals/number-parse-float":86}],170:[function(require,module,exports){
var $ = require('../internals/export');
var $parseInt = require('../internals/number-parse-int');

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != $parseInt }, {
  parseInt: $parseInt
});

},{"../internals/export":42,"../internals/number-parse-int":87}],171:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var uncurryThis = require('../internals/function-uncurry-this');
var isForced = require('../internals/is-forced');
var inheritIfRequired = require('../internals/inherit-if-required');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var isPrototypeOf = require('../internals/object-is-prototype-of');
var isRegExp = require('../internals/is-regexp');
var toString = require('../internals/to-string');
var getRegExpFlags = require('../internals/regexp-get-flags');
var stickyHelpers = require('../internals/regexp-sticky-helpers');
var proxyAccessor = require('../internals/proxy-accessor');
var defineBuiltIn = require('../internals/define-built-in');
var fails = require('../internals/fails');
var hasOwn = require('../internals/has-own-property');
var enforceInternalState = require('../internals/internal-state').enforce;
var setSpecies = require('../internals/set-species');
var wellKnownSymbol = require('../internals/well-known-symbol');
var UNSUPPORTED_DOT_ALL = require('../internals/regexp-unsupported-dot-all');
var UNSUPPORTED_NCG = require('../internals/regexp-unsupported-ncg');

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var SyntaxError = global.SyntaxError;
var exec = uncurryThis(RegExpPrototype.exec);
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);
// TODO: Use only proper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS &&
  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
    re2[MATCH] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = charAt(string, index);
    if (chr === '\\') {
      result += chr + charAt(string, ++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = charAt(string, index);
    if (chr === '\\') {
      chr = chr + charAt(string, ++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        if (exec(IS_NCG, stringSlice(string, index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || hasOwn(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }
        names[groupname] = true;
        named[named.length] = [groupname, groupid];
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = isPrototypeOf(RegExpPrototype, this);
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || isPrototypeOf(RegExpPrototype, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = getRegExpFlags(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString(pattern);
    flags = flags === undefined ? '' : toString(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
      if (dotAll) flags = replace(flags, /s/g, '');
    }

    rawFlags = flags;

    if (MISSED_STICKY && 'sticky' in re1) {
      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
      if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
  }

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  defineBuiltIn(global, 'RegExp', RegExpWrapper, { constructor: true });
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');

},{"../internals/create-non-enumerable-property":26,"../internals/define-built-in":30,"../internals/descriptors":33,"../internals/fails":43,"../internals/function-uncurry-this":52,"../internals/global":58,"../internals/has-own-property":59,"../internals/inherit-if-required":64,"../internals/internal-state":66,"../internals/is-forced":71,"../internals/is-regexp":75,"../internals/object-get-own-property-names":94,"../internals/object-is-prototype-of":97,"../internals/proxy-accessor":106,"../internals/regexp-get-flags":110,"../internals/regexp-sticky-helpers":111,"../internals/regexp-unsupported-dot-all":112,"../internals/regexp-unsupported-ncg":113,"../internals/set-species":117,"../internals/to-string":139,"../internals/well-known-symbol":148}],172:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var exec = require('../internals/regexp-exec');

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

},{"../internals/export":42,"../internals/regexp-exec":108}],173:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var MISSED_STICKY = require('../internals/regexp-sticky-helpers').MISSED_STICKY;
var classof = require('../internals/classof-raw');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var getInternalState = require('../internals/internal-state').get;

var RegExpPrototype = RegExp.prototype;
var $TypeError = TypeError;

// `RegExp.prototype.sticky` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
if (DESCRIPTORS && MISSED_STICKY) {
  defineBuiltInAccessor(RegExpPrototype, 'sticky', {
    configurable: true,
    get: function sticky() {
      if (this === RegExpPrototype) return undefined;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (classof(this) === 'RegExp') {
        return !!getInternalState(this).sticky;
      }
      throw $TypeError('Incompatible receiver, RegExp required');
    }
  });
}

},{"../internals/classof-raw":20,"../internals/define-built-in-accessor":29,"../internals/descriptors":33,"../internals/internal-state":66,"../internals/regexp-sticky-helpers":111}],174:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4` since it's moved to entry points
require('../modules/es.regexp.exec');
var $ = require('../internals/export');
var call = require('../internals/function-call');
var isCallable = require('../internals/is-callable');
var anObject = require('../internals/an-object');
var toString = require('../internals/to-string');

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var nativeTest = /./.test;

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (S) {
    var R = anObject(this);
    var string = toString(S);
    var exec = R.exec;
    if (!isCallable(exec)) return call(nativeTest, R, string);
    var result = call(exec, R, string);
    if (result === null) return false;
    anObject(result);
    return true;
  }
});

},{"../internals/an-object":6,"../internals/export":42,"../internals/function-call":49,"../internals/is-callable":69,"../internals/to-string":139,"../modules/es.regexp.exec":172}],175:[function(require,module,exports){
'use strict';
var PROPER_FUNCTION_NAME = require('../internals/function-name').PROPER;
var defineBuiltIn = require('../internals/define-built-in');
var anObject = require('../internals/an-object');
var $toString = require('../internals/to-string');
var fails = require('../internals/fails');
var getRegExpFlags = require('../internals/regexp-get-flags');

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var pattern = $toString(R.source);
    var flags = $toString(getRegExpFlags(R));
    return '/' + pattern + '/' + flags;
  }, { unsafe: true });
}

},{"../internals/an-object":6,"../internals/define-built-in":30,"../internals/fails":43,"../internals/function-name":50,"../internals/regexp-get-flags":110,"../internals/to-string":139}],176:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});

},{"../internals/correct-is-regexp-logic":23,"../internals/export":42,"../internals/function-uncurry-this":52,"../internals/not-a-regexp":85,"../internals/require-object-coercible":114,"../internals/to-string":139}],177:[function(require,module,exports){
'use strict';
var charAt = require('../internals/string-multibyte').charAt;
var toString = require('../internals/to-string');
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/iterator-define');
var createIterResultObject = require('../internals/create-iter-result-object');

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
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt(string, index);
  state.index += point.length;
  return createIterResultObject(point, false);
});

},{"../internals/create-iter-result-object":25,"../internals/internal-state":66,"../internals/iterator-define":79,"../internals/string-multibyte":123,"../internals/to-string":139}],178:[function(require,module,exports){
'use strict';
var call = require('../internals/function-call');
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var requireObjectCoercible = require('../internals/require-object-coercible');
var getMethod = require('../internals/get-method');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');

// @@match logic
fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = isNullOrUndefined(regexp) ? undefined : getMethod(regexp, MATCH);
      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"../internals/advance-string-index":5,"../internals/an-object":6,"../internals/fix-regexp-well-known-symbol-logic":44,"../internals/function-call":49,"../internals/get-method":56,"../internals/is-null-or-undefined":72,"../internals/regexp-exec-abstract":107,"../internals/require-object-coercible":114,"../internals/to-length":134,"../internals/to-string":139}],179:[function(require,module,exports){
'use strict';
var apply = require('../internals/function-apply');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var fails = require('../internals/fails');
var anObject = require('../internals/an-object');
var isCallable = require('../internals/is-callable');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var getMethod = require('../internals/get-method');
var getSubstitution = require('../internals/get-substitution');
var regExpExec = require('../internals/regexp-exec-abstract');
var wellKnownSymbol = require('../internals/well-known-symbol');

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

},{"../internals/advance-string-index":5,"../internals/an-object":6,"../internals/fails":43,"../internals/fix-regexp-well-known-symbol-logic":44,"../internals/function-apply":45,"../internals/function-call":49,"../internals/function-uncurry-this":52,"../internals/get-method":56,"../internals/get-substitution":57,"../internals/is-callable":69,"../internals/is-null-or-undefined":72,"../internals/regexp-exec-abstract":107,"../internals/require-object-coercible":114,"../internals/to-integer-or-infinity":133,"../internals/to-length":134,"../internals/to-string":139,"../internals/well-known-symbol":148}],180:[function(require,module,exports){
'use strict';
var call = require('../internals/function-call');
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var requireObjectCoercible = require('../internals/require-object-coercible');
var sameValue = require('../internals/same-value');
var toString = require('../internals/to-string');
var getMethod = require('../internals/get-method');
var regExpExec = require('../internals/regexp-exec-abstract');

// @@search logic
fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = isNullOrUndefined(regexp) ? undefined : getMethod(regexp, SEARCH);
      return searcher ? call(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeSearch, rx, S);

      if (res.done) return res.value;

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"../internals/an-object":6,"../internals/fix-regexp-well-known-symbol-logic":44,"../internals/function-call":49,"../internals/get-method":56,"../internals/is-null-or-undefined":72,"../internals/regexp-exec-abstract":107,"../internals/require-object-coercible":114,"../internals/same-value":115,"../internals/to-string":139}],181:[function(require,module,exports){
'use strict';
var apply = require('../internals/function-apply');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var isRegExp = require('../internals/is-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var speciesConstructor = require('../internals/species-constructor');
var advanceStringIndex = require('../internals/advance-string-index');
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var getMethod = require('../internals/get-method');
var arraySlice = require('../internals/array-slice-simple');
var callRegExpExec = require('../internals/regexp-exec-abstract');
var regexpExec = require('../internals/regexp-exec');
var stickyHelpers = require('../internals/regexp-sticky-helpers');
var fails = require('../internals/fails');

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis(/./.exec);
var push = uncurryThis($push);
var stringSlice = uncurryThis(''.slice);

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

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return call(nativeSplit, string, separator, lim);
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
      while (match = call(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push(output, stringSlice(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, '')) push(output, '');
      } else push(output, stringSlice(string, lastLastIndex));
      return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = isNullOrUndefined(separator) ? undefined : getMethod(separator, SPLIT);
      return splitter
        ? call(splitter, separator, O, limit)
        : call(internalSplit, toString(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push(A, stringSlice(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push(A, stringSlice(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

},{"../internals/advance-string-index":5,"../internals/an-object":6,"../internals/array-slice-simple":14,"../internals/fails":43,"../internals/fix-regexp-well-known-symbol-logic":44,"../internals/function-apply":45,"../internals/function-call":49,"../internals/function-uncurry-this":52,"../internals/get-method":56,"../internals/is-null-or-undefined":72,"../internals/is-regexp":75,"../internals/regexp-exec":108,"../internals/regexp-exec-abstract":107,"../internals/regexp-sticky-helpers":111,"../internals/require-object-coercible":114,"../internals/species-constructor":122,"../internals/to-length":134,"../internals/to-string":139}],182:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');

// eslint-disable-next-line es/no-string-prototype-startswith -- safe
var nativeStartsWith = uncurryThis(''.startsWith);
var stringSlice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = toString(searchString);
    return nativeStartsWith
      ? nativeStartsWith(that, search, index)
      : stringSlice(that, index, index + search.length) === search;
  }
});

},{"../internals/correct-is-regexp-logic":23,"../internals/export":42,"../internals/function-uncurry-this":52,"../internals/is-pure":74,"../internals/not-a-regexp":85,"../internals/object-get-own-property-descriptor":92,"../internals/require-object-coercible":114,"../internals/to-length":134,"../internals/to-string":139}],183:[function(require,module,exports){
var $ = require('../internals/export');
var trimStart = require('../internals/string-trim-start');

// `String.prototype.trimLeft` method
// https://tc39.es/ecma262/#sec-string.prototype.trimleft
// eslint-disable-next-line es/no-string-prototype-trimleft-trimright -- safe
$({ target: 'String', proto: true, name: 'trimStart', forced: ''.trimLeft !== trimStart }, {
  trimLeft: trimStart
});

},{"../internals/export":42,"../internals/string-trim-start":125}],184:[function(require,module,exports){
// TODO: Remove this line from `core-js@4`
require('../modules/es.string.trim-left');
var $ = require('../internals/export');
var trimStart = require('../internals/string-trim-start');

// `String.prototype.trimStart` method
// https://tc39.es/ecma262/#sec-string.prototype.trimstart
// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
$({ target: 'String', proto: true, name: 'trimStart', forced: ''.trimStart !== trimStart }, {
  trimStart: trimStart
});

},{"../internals/export":42,"../internals/string-trim-start":125,"../modules/es.string.trim-left":183}],185:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var $trim = require('../internals/string-trim').trim;
var forcedStringTrimMethod = require('../internals/string-trim-forced');

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

},{"../internals/export":42,"../internals/string-trim":126,"../internals/string-trim-forced":124}],186:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var IS_PURE = require('../internals/is-pure');
var DESCRIPTORS = require('../internals/descriptors');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');
var fails = require('../internals/fails');
var hasOwn = require('../internals/has-own-property');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var anObject = require('../internals/an-object');
var toIndexedObject = require('../internals/to-indexed-object');
var toPropertyKey = require('../internals/to-property-key');
var $toString = require('../internals/to-string');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var nativeObjectCreate = require('../internals/object-create');
var objectKeys = require('../internals/object-keys');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertyNamesExternal = require('../internals/object-get-own-property-names-external');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');
var definePropertiesModule = require('../internals/object-define-properties');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var defineBuiltIn = require('../internals/define-built-in');
var shared = require('../internals/shared');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');
var uid = require('../internals/uid');
var wellKnownSymbol = require('../internals/well-known-symbol');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineWellKnownSymbol = require('../internals/well-known-symbol-define');
var defineSymbolToPrimitive = require('../internals/symbol-define-to-primitive');
var setToStringTag = require('../internals/set-to-string-tag');
var InternalStateModule = require('../internals/internal-state');
var $forEach = require('../internals/array-iteration').forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);

var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var TypeError = global.TypeError;
var QObject = global.QObject;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var WellKnownSymbolsStore = shared('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
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
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function (O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  defineBuiltIn(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });

  defineBuiltIn($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  definePropertiesModule.f = $defineProperties;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      defineBuiltIn(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
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

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames
});

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive();

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

},{"../internals/an-object":6,"../internals/array-iteration":10,"../internals/create-property-descriptor":27,"../internals/define-built-in":30,"../internals/descriptors":33,"../internals/export":42,"../internals/fails":43,"../internals/function-call":49,"../internals/function-uncurry-this":52,"../internals/global":58,"../internals/has-own-property":59,"../internals/hidden-keys":60,"../internals/internal-state":66,"../internals/is-pure":74,"../internals/object-create":89,"../internals/object-define-properties":90,"../internals/object-define-property":91,"../internals/object-get-own-property-descriptor":92,"../internals/object-get-own-property-names":94,"../internals/object-get-own-property-names-external":93,"../internals/object-get-own-property-symbols":95,"../internals/object-is-prototype-of":97,"../internals/object-keys":99,"../internals/object-property-is-enumerable":100,"../internals/set-to-string-tag":118,"../internals/shared":121,"../internals/shared-key":119,"../internals/symbol-constructor-detection":127,"../internals/symbol-define-to-primitive":128,"../internals/to-indexed-object":132,"../internals/to-property-key":137,"../internals/to-string":139,"../internals/uid":141,"../internals/well-known-symbol":148,"../internals/well-known-symbol-define":146,"../internals/well-known-symbol-wrapped":147}],187:[function(require,module,exports){
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var global = require('../internals/global');
var uncurryThis = require('../internals/function-uncurry-this');
var hasOwn = require('../internals/has-own-property');
var isCallable = require('../internals/is-callable');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var toString = require('../internals/to-string');
var defineProperty = require('../internals/object-define-property').f;
var copyConstructorProperties = require('../internals/copy-constructor-properties');

var NativeSymbol = global.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
    var result = isPrototypeOf(SymbolPrototype, this)
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;

  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
  var thisSymbolValue = uncurryThis(SymbolPrototype.valueOf);
  var symbolDescriptiveString = uncurryThis(SymbolPrototype.toString);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);

  defineProperty(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = thisSymbolValue(this);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var string = symbolDescriptiveString(symbol);
      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, constructor: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

},{"../internals/copy-constructor-properties":22,"../internals/descriptors":33,"../internals/export":42,"../internals/function-uncurry-this":52,"../internals/global":58,"../internals/has-own-property":59,"../internals/is-callable":69,"../internals/object-define-property":91,"../internals/object-is-prototype-of":97,"../internals/to-string":139}],188:[function(require,module,exports){
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var hasOwn = require('../internals/has-own-property');
var toString = require('../internals/to-string');
var shared = require('../internals/shared');
var NATIVE_SYMBOL_REGISTRY = require('../internals/symbol-registry-detection');

var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.for` method
// https://tc39.es/ecma262/#sec-symbol.for
$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  'for': function (key) {
    var string = toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = getBuiltIn('Symbol')(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  }
});

},{"../internals/export":42,"../internals/get-built-in":53,"../internals/has-own-property":59,"../internals/shared":121,"../internals/symbol-registry-detection":129,"../internals/to-string":139}],189:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

},{"../internals/well-known-symbol-define":146}],190:[function(require,module,exports){
// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require('../modules/es.symbol.constructor');
require('../modules/es.symbol.for');
require('../modules/es.symbol.key-for');
require('../modules/es.json.stringify');
require('../modules/es.object.get-own-property-symbols');

},{"../modules/es.json.stringify":163,"../modules/es.object.get-own-property-symbols":167,"../modules/es.symbol.constructor":186,"../modules/es.symbol.for":188,"../modules/es.symbol.key-for":191}],191:[function(require,module,exports){
var $ = require('../internals/export');
var hasOwn = require('../internals/has-own-property');
var isSymbol = require('../internals/is-symbol');
var tryToString = require('../internals/try-to-string');
var shared = require('../internals/shared');
var NATIVE_SYMBOL_REGISTRY = require('../internals/symbol-registry-detection');

var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.keyFor` method
// https://tc39.es/ecma262/#sec-symbol.keyfor
$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(tryToString(sym) + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  }
});

},{"../internals/export":42,"../internals/has-own-property":59,"../internals/is-symbol":76,"../internals/shared":121,"../internals/symbol-registry-detection":129,"../internals/try-to-string":140}],192:[function(require,module,exports){
var global = require('../internals/global');
var DOMIterables = require('../internals/dom-iterables');
var DOMTokenListPrototype = require('../internals/dom-token-list-prototype');
var forEach = require('../internals/array-for-each');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

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
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);

},{"../internals/array-for-each":7,"../internals/create-non-enumerable-property":26,"../internals/dom-iterables":37,"../internals/dom-token-list-prototype":38,"../internals/global":58}],193:[function(require,module,exports){
var global = require('../internals/global');
var DOMIterables = require('../internals/dom-iterables');
var DOMTokenListPrototype = require('../internals/dom-token-list-prototype');
var ArrayIteratorMethods = require('../modules/es.array.iterator');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var wellKnownSymbol = require('../internals/well-known-symbol');

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

},{"../internals/create-non-enumerable-property":26,"../internals/dom-iterables":37,"../internals/dom-token-list-prototype":38,"../internals/global":58,"../internals/well-known-symbol":148,"../modules/es.array.iterator":157}],194:[function(require,module,exports){
var $ = require('../internals/export');
var global = require('../internals/global');
var setInterval = require('../internals/schedulers-fix').setInterval;

// ie9- setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
$({ global: true, bind: true, forced: global.setInterval !== setInterval }, {
  setInterval: setInterval
});

},{"../internals/export":42,"../internals/global":58,"../internals/schedulers-fix":116}],195:[function(require,module,exports){
var $ = require('../internals/export');
var global = require('../internals/global');
var setTimeout = require('../internals/schedulers-fix').setTimeout;

// ie9- setTimeout additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
$({ global: true, bind: true, forced: global.setTimeout !== setTimeout }, {
  setTimeout: setTimeout
});

},{"../internals/export":42,"../internals/global":58,"../internals/schedulers-fix":116}],196:[function(require,module,exports){
// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require('../modules/web.set-interval');
require('../modules/web.set-timeout');

},{"../modules/web.set-interval":194,"../modules/web.set-timeout":195}],197:[function(require,module,exports){
(function (global){(function (){
"use strict";

require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.splice.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (self, undefined) {
  function Call(t, l) {
    var n = arguments.length > 2 ? arguments[2] : [];
    if (!1 === IsCallable(t)) throw new TypeError(Object.prototype.toString.call(t) + "is not a function.");
    return t.apply(l, n);
  }
  function CreateMethodProperty(e, r, t) {
    var a = {
      value: t,
      writable: !0,
      enumerable: !1,
      configurable: !0
    };
    Object.defineProperty(e, r, a);
  }
  function Get(n, t) {
    return n[t];
  }
  function IsCallable(n) {
    return "function" == typeof n;
  }
  function SameValueNonNumber(e, n) {
    return e === n;
  }
  function ToInteger(n) {
    var i = Number(n);
    return isNaN(i) ? 0 : 1 / i === Infinity || 1 / i == -Infinity || i === Infinity || i === -Infinity ? i : (i < 0 ? -1 : 1) * Math.floor(Math.abs(i));
  }
  function ToLength(n) {
    var t = ToInteger(n);
    return t <= 0 ? 0 : Math.min(t, Math.pow(2, 53) - 1);
  }
  function ToObject(e) {
    if (null === e || e === undefined) throw TypeError();
    return Object(e);
  }
  function GetV(t, e) {
    return ToObject(t)[e];
  }
  function GetMethod(e, n) {
    var r = GetV(e, n);
    if (null === r || r === undefined) return undefined;
    if (!1 === IsCallable(r)) throw new TypeError("Method not callable: " + n);
    return r;
  }
  function Type(e) {
    switch (_typeof(e)) {
      case "undefined":
        return "undefined";
      case "boolean":
        return "boolean";
      case "number":
        return "number";
      case "string":
        return "string";
      case "symbol":
        return "symbol";
      default:
        return null === e ? "null" : "Symbol" in self && (e instanceof self.Symbol || e.constructor === self.Symbol) ? "symbol" : "object";
    }
  }
  function OrdinaryToPrimitive(r, t) {
    if ("string" === t) var e = ["toString", "valueOf"];else e = ["valueOf", "toString"];
    for (var i = 0; i < e.length; ++i) {
      var n = e[i],
        a = Get(r, n);
      if (IsCallable(a)) {
        var o = Call(a, r);
        if ("object" !== Type(o)) return o;
      }
    }
    throw new TypeError("Cannot convert to primitive.");
  }
  function SameValueZero(n, e) {
    return Type(n) === Type(e) && ("number" === Type(n) ? !(!isNaN(n) || !isNaN(e)) || 1 / n === Infinity && 1 / e == -Infinity || 1 / n == -Infinity && 1 / e === Infinity || n === e : SameValueNonNumber(n, e));
  }
  function ToPrimitive(e) {
    var t = arguments.length > 1 ? arguments[1] : undefined;
    if ("object" === Type(e)) {
      if (arguments.length < 2) var i = "default";else t === String ? i = "string" : t === Number && (i = "number");
      var r = "function" == typeof self.Symbol && "symbol" == _typeof(self.Symbol.toPrimitive) ? GetMethod(e, self.Symbol.toPrimitive) : undefined;
      if (r !== undefined) {
        var n = Call(r, e, [i]);
        if ("object" !== Type(n)) return n;
        throw new TypeError("Cannot convert exotic object to primitive.");
      }
      return "default" === i && (i = "number"), OrdinaryToPrimitive(e, i);
    }
    return e;
  }
  function ToString(t) {
    switch (Type(t)) {
      case "symbol":
        throw new TypeError("Cannot convert a Symbol value to a string");
      case "object":
        return ToString(ToPrimitive(t, String));
      default:
        return String(t);
    }
  }
  CreateMethodProperty(Array.prototype, "includes", function e(r) {
    "use strict";

    var t = ToObject(this),
      o = ToLength(Get(t, "length"));
    if (0 === o) return !1;
    var n = ToInteger(arguments[1]);
    if (n >= 0) var a = n;else (a = o + n) < 0 && (a = 0);
    for (; a < o;) {
      var i = Get(t, ToString(a));
      if (SameValueZero(r, i)) return !0;
      a += 1;
    }
    return !1;
  });
  !function () {
    function e(e, t) {
      if (!e) throw new Error("Not enough arguments");
      var n;
      if ("createEvent" in document) {
        n = document.createEvent("Event");
        var o = !(!t || t.bubbles === undefined) && t.bubbles,
          i = !(!t || t.cancelable === undefined) && t.cancelable;
        return n.initEvent(e, o, i), n;
      }
      return n = document.createEventObject(), n.type = e, n.bubbles = !(!t || t.bubbles === undefined) && t.bubbles, n.cancelable = !(!t || t.cancelable === undefined) && t.cancelable, n;
    }
    var t = {
      click: 1,
      dblclick: 1,
      keyup: 1,
      keypress: 1,
      keydown: 1,
      mousedown: 1,
      mouseup: 1,
      mousemove: 1,
      mouseover: 1,
      mouseenter: 1,
      mouseleave: 1,
      mouseout: 1,
      storage: 1,
      storagecommit: 1,
      textinput: 1
    };
    if ("undefined" != typeof document && "undefined" != typeof window) {
      var n = window.Event && window.Event.prototype || null;
      e.NONE = 0, e.CAPTURING_PHASE = 1, e.AT_TARGET = 2, e.BUBBLING_PHASE = 3, window.Event = Window.prototype.Event = e, n && Object.defineProperty(window.Event, "prototype", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: n
      }), "createEvent" in document || (window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function o() {
        var e = this,
          n = arguments[0],
          o = arguments[1];
        if (e === window && n in t) throw new Error("In IE8 the event: " + n + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
        e._events || (e._events = {}), e._events[n] || (e._events[n] = function (t) {
          var n,
            o = e._events[t.type].list,
            i = o.slice(),
            r = -1,
            c = i.length;
          for (t.preventDefault = function a() {
            !1 !== t.cancelable && (t.returnValue = !1);
          }, t.stopPropagation = function l() {
            t.cancelBubble = !0;
          }, t.stopImmediatePropagation = function s() {
            t.cancelBubble = !0, t.cancelImmediate = !0;
          }, t.currentTarget = e, t.relatedTarget = t.fromElement || null, t.target = t.target || t.srcElement || e, t.timeStamp = new Date().getTime(), t.clientX && (t.pageX = t.clientX + document.documentElement.scrollLeft, t.pageY = t.clientY + document.documentElement.scrollTop); ++r < c && !t.cancelImmediate;) {
            r in i && (n = i[r], o.includes(n) && "function" == typeof n && n.call(e, t));
          }
        }, e._events[n].list = [], e.attachEvent && e.attachEvent("on" + n, e._events[n])), e._events[n].list.push(o);
      }, window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function i() {
        var e,
          t = this,
          n = arguments[0],
          o = arguments[1];
        t._events && t._events[n] && t._events[n].list && -1 !== (e = t._events[n].list.indexOf(o)) && (t._events[n].list.splice(e, 1), t._events[n].list.length || (t.detachEvent && t.detachEvent("on" + n, t._events[n]), delete t._events[n]));
      }, window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function r(e) {
        if (!arguments.length) throw new Error("Not enough arguments");
        if (!e || "string" != typeof e.type) throw new Error("DOM Events Exception 0");
        var t = this,
          n = e.type;
        try {
          if (!e.bubbles) {
            e.cancelBubble = !0;
            var o = function o(e) {
              e.cancelBubble = !0, (t || window).detachEvent("on" + n, o);
            };
            this.attachEvent("on" + n, o);
          }
          this.fireEvent("on" + n, e);
        } catch (i) {
          e.target = t;
          do {
            e.currentTarget = t, "_events" in t && "function" == typeof t._events[n] && t._events[n].call(t, e), "function" == typeof t["on" + n] && t["on" + n].call(t, e), t = 9 === t.nodeType ? t.parentWindow : t.parentNode;
          } while (t && !e.cancelBubble);
        }
        return !0;
      }, document.attachEvent("onreadystatechange", function () {
        "complete" === document.readyState && document.dispatchEvent(new e("DOMContentLoaded", {
          bubbles: !0
        }));
      }));
    }
  }();
  self.CustomEvent = function e(t, n) {
    if (!t) throw Error('TypeError: Failed to construct "CustomEvent": An event name must be provided.');
    var l;
    if (n = n || {
      bubbles: !1,
      cancelable: !1,
      detail: null
    }, "createEvent" in document) try {
      l = document.createEvent("CustomEvent"), l.initCustomEvent(t, n.bubbles, n.cancelable, n.detail);
    } catch (a) {
      l = document.createEvent("Event"), l.initEvent(t, n.bubbles, n.cancelable), l.detail = n.detail;
    } else l = new Event(t, n), l.detail = n && n.detail || null;
    return l;
  }, CustomEvent.prototype = Event.prototype;
})('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
require('./simple-lightbox');

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./simple-lightbox":198,"core-js/modules/es.array.includes.js":154,"core-js/modules/es.array.index-of.js":155,"core-js/modules/es.array.iterator.js":157,"core-js/modules/es.array.slice.js":158,"core-js/modules/es.array.splice.js":159,"core-js/modules/es.date.to-string.js":160,"core-js/modules/es.number.constructor.js":164,"core-js/modules/es.object.define-property.js":166,"core-js/modules/es.object.to-string.js":168,"core-js/modules/es.string.includes.js":176,"core-js/modules/es.string.iterator.js":177,"core-js/modules/es.symbol.description.js":187,"core-js/modules/es.symbol.iterator.js":189,"core-js/modules/es.symbol.js":190,"core-js/modules/web.dom-collections.iterator.js":193}],198:[function(require,module,exports){
(function (global){(function (){
"use strict";

require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.function.name.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.test.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/es.string.trim-start.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/web.timers.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.sticky.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.parse-float.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var SimpleLightbox = /*#__PURE__*/function () {
  function SimpleLightbox(elements, options) {
    var _this = this;
    _classCallCheck(this, SimpleLightbox);
    _defineProperty(this, "defaultOptions", {
      sourceAttr: 'href',
      overlay: true,
      overlayOpacity: 0.7,
      spinner: true,
      nav: true,
      navText: ['&lsaquo;', '&rsaquo;'],
      captions: true,
      captionDelay: 0,
      captionSelector: 'img',
      captionType: 'attr',
      captionsData: 'title',
      captionPosition: 'bottom',
      captionClass: '',
      captionHTML: true,
      close: true,
      closeText: '&times;',
      swipeClose: true,
      showCounter: true,
      fileExt: 'png|jpg|jpeg|gif|webp',
      animationSlide: true,
      animationSpeed: 250,
      preloading: true,
      enableKeyboard: true,
      loop: true,
      rel: false,
      docClose: true,
      swipeTolerance: 50,
      className: 'simple-lightbox',
      widthRatio: 0.8,
      heightRatio: 0.9,
      scaleImageToRatio: false,
      disableRightClick: false,
      disableScroll: true,
      alertError: true,
      alertErrorMessage: 'Image not found, next image will be loaded',
      additionalHtml: false,
      history: true,
      throttleInterval: 0,
      doubleTapZoom: 2,
      maxZoom: 10,
      htmlClass: 'has-lightbox',
      rtl: false,
      fixedClass: 'sl-fixed',
      fadeSpeed: 300,
      uniqueImages: true,
      focus: true,
      scrollZoom: true,
      scrollZoomFactor: 0.5,
      download: false
    });
    _defineProperty(this, "transitionPrefix", void 0);
    _defineProperty(this, "isPassiveEventsSupported", void 0);
    _defineProperty(this, "transitionCapable", false);
    _defineProperty(this, "isTouchDevice", 'ontouchstart' in window);
    _defineProperty(this, "isAppleDevice", /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
    _defineProperty(this, "initialLocationHash", void 0);
    _defineProperty(this, "pushStateSupport", 'pushState' in history);
    _defineProperty(this, "isOpen", false);
    _defineProperty(this, "isAnimating", false);
    _defineProperty(this, "isClosing", false);
    _defineProperty(this, "isFadeIn", false);
    _defineProperty(this, "urlChangedOnce", false);
    _defineProperty(this, "hashReseted", false);
    _defineProperty(this, "historyHasChanges", false);
    _defineProperty(this, "historyUpdateTimeout", null);
    _defineProperty(this, "currentImage", void 0);
    _defineProperty(this, "eventNamespace", 'simplelightbox');
    _defineProperty(this, "domNodes", {});
    _defineProperty(this, "loadedImages", []);
    _defineProperty(this, "initialImageIndex", 0);
    _defineProperty(this, "currentImageIndex", 0);
    _defineProperty(this, "initialSelector", null);
    _defineProperty(this, "globalScrollbarWidth", 0);
    _defineProperty(this, "controlCoordinates", {
      swipeDiff: 0,
      swipeYDiff: 0,
      swipeStart: 0,
      swipeEnd: 0,
      swipeYStart: 0,
      swipeYEnd: 0,
      mousedown: false,
      imageLeft: 0,
      zoomed: false,
      containerHeight: 0,
      containerWidth: 0,
      containerOffsetX: 0,
      containerOffsetY: 0,
      imgHeight: 0,
      imgWidth: 0,
      capture: false,
      initialOffsetX: 0,
      initialOffsetY: 0,
      initialPointerOffsetX: 0,
      initialPointerOffsetY: 0,
      initialPointerOffsetX2: 0,
      initialPointerOffsetY2: 0,
      initialScale: 1,
      initialPinchDistance: 0,
      pointerOffsetX: 0,
      pointerOffsetY: 0,
      pointerOffsetX2: 0,
      pointerOffsetY2: 0,
      targetOffsetX: 0,
      targetOffsetY: 0,
      targetScale: 0,
      pinchOffsetX: 0,
      pinchOffsetY: 0,
      limitOffsetX: 0,
      limitOffsetY: 0,
      scaleDifference: 0,
      targetPinchDistance: 0,
      touchCount: 0,
      doubleTapped: false,
      touchmoveCount: 0
    });
    this.options = Object.assign(this.defaultOptions, options);
    this.isPassiveEventsSupported = this.checkPassiveEventsSupport();
    if (typeof elements === 'string') {
      this.initialSelector = elements;
      this.elements = Array.from(document.querySelectorAll(elements));
    } else {
      this.elements = typeof elements.length !== 'undefined' && elements.length > 0 ? Array.from(elements) : [elements];
    }
    this.relatedElements = [];
    this.transitionPrefix = this.calculateTransitionPrefix();
    this.transitionCapable = this.transitionPrefix !== false;
    this.initialLocationHash = this.hash;

    // this should be handled by attribute selector IMHO! => 'a[rel=bla]'...
    if (this.options.rel) {
      this.elements = this.getRelated(this.options.rel);
    }
    if (this.options.uniqueImages) {
      var imgArr = [];
      this.elements = Array.from(this.elements).filter(function (element) {
        var src = element.getAttribute(_this.options.sourceAttr);
        if (imgArr.indexOf(src) === -1) {
          imgArr.push(src);
          return true;
        }
        return false;
      });
    }
    this.createDomNodes();
    if (this.options.close) {
      this.domNodes.wrapper.appendChild(this.domNodes.closeButton);
    }
    if (this.options.nav) {
      this.domNodes.wrapper.appendChild(this.domNodes.navigation);
    }
    if (this.options.spinner) {
      this.domNodes.wrapper.appendChild(this.domNodes.spinner);
    }
    this.addEventListener(this.elements, 'click.' + this.eventNamespace, function (event) {
      if (_this.isValidLink(event.currentTarget)) {
        event.preventDefault();
        if (_this.isAnimating) {
          return false;
        }
        _this.initialImageIndex = _this.elements.indexOf(event.currentTarget);
        _this.openImage(event.currentTarget);
      }
    });

    // close addEventListener click addEventListener doc
    if (this.options.docClose) {
      this.addEventListener(this.domNodes.wrapper, ['click.' + this.eventNamespace, 'touchstart.' + this.eventNamespace], function (event) {
        if (_this.isOpen && event.target === event.currentTarget) {
          _this.close();
        }
      });
    }

    // disable rightclick
    if (this.options.disableRightClick) {
      this.addEventListener(document.body, 'contextmenu.' + this.eventNamespace, function (event) {
        if (event.target.parentElement.classList.contains("sl-image")) {
          event.preventDefault();
        }
      });
    }

    // keyboard-control
    if (this.options.enableKeyboard) {
      this.addEventListener(document.body, 'keyup.' + this.eventNamespace, this.throttle(function (event) {
        _this.controlCoordinates.swipeDiff = 0;
        // keyboard control only if lightbox is open

        if (_this.isAnimating && event.key === 'Escape') {
          _this.currentImage.setAttribute('src', '');
          _this.isAnimating = false;
          _this.close();
          return;
        }
        if (_this.isOpen) {
          event.preventDefault();
          if (event.key === 'Escape') {
            _this.close();
          }
          if (!_this.isAnimating && ['ArrowLeft', 'ArrowRight'].indexOf(event.key) > -1) {
            _this.loadImage(event.key === 'ArrowRight' ? 1 : -1);
          }
        }
      }, this.options.throttleInterval));
    }
    this.addEvents();
  }
  _createClass(SimpleLightbox, [{
    key: "checkPassiveEventsSupport",
    value: function checkPassiveEventsSupport() {
      // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
      // Test via a getter in the options object to see if the passive property is accessed
      var supportsPassive = false;
      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function get() {
            supportsPassive = true;
          }
        });
        window.addEventListener("testPassive", null, opts);
        window.removeEventListener("testPassive", null, opts);
      } catch (e) {}
      return supportsPassive;
    }
  }, {
    key: "getCaptionElement",
    value: function getCaptionElement(elem) {
      // look at sibling selector
      if (this.options.captionSelector.startsWith('+')) {
        var selector = this.options.captionSelector.replace(/^\+/, '').trimStart();
        var sibling = elem.nextElementSibling;
        if (sibling && sibling.matches(selector)) {
          return sibling;
        }
        return false;
      } else if (this.options.captionSelector.startsWith('>')) {
        var _selector = this.options.captionSelector.replace(/^>/, '').trimStart();
        return elem.querySelector(_selector);
      } else {
        return elem.querySelector(this.options.captionSelector);
      }
    }
  }, {
    key: "generateQuerySelector",
    value: function generateQuerySelector(elem) {
      var tagName = elem.tagName,
        id = elem.id,
        className = elem.className,
        parentNode = elem.parentNode;
      if (tagName === 'HTML') return 'HTML';
      var str = tagName;
      str += id !== '' ? "#".concat(id) : '';
      if (className) {
        var classes = className.trim().split(/\s/);
        for (var i = 0; i < classes.length; i++) {
          str += ".".concat(classes[i]);
        }
      }
      var childIndex = 1;
      for (var e = elem; e.previousElementSibling; e = e.previousElementSibling) {
        childIndex += 1;
      }
      str += ":nth-child(".concat(childIndex, ")");
      return "".concat(this.generateQuerySelector(parentNode), " > ").concat(str);
    }
  }, {
    key: "createDomNodes",
    value: function createDomNodes() {
      this.domNodes.overlay = document.createElement('div');
      this.domNodes.overlay.classList.add('sl-overlay');
      this.domNodes.overlay.dataset.opacityTarget = this.options.overlayOpacity;
      this.domNodes.closeButton = document.createElement('button');
      this.domNodes.closeButton.classList.add('sl-close');
      this.domNodes.closeButton.innerHTML = this.options.closeText;
      this.domNodes.spinner = document.createElement('div');
      this.domNodes.spinner.classList.add('sl-spinner');
      this.domNodes.spinner.innerHTML = '<div></div>';
      this.domNodes.navigation = document.createElement('div');
      this.domNodes.navigation.classList.add('sl-navigation');
      this.domNodes.navigation.innerHTML = "<button class=\"sl-prev\">".concat(this.options.navText[0], "</button><button class=\"sl-next\">").concat(this.options.navText[1], "</button>");
      this.domNodes.counter = document.createElement('div');
      this.domNodes.counter.classList.add('sl-counter');
      this.domNodes.counter.innerHTML = '<span class="sl-current"></span>/<span class="sl-total"></span>';
      this.domNodes.download = document.createElement('div');
      this.domNodes.download.classList.add('sl-download');
      this.domNodes.downloadLink = document.createElement('a');
      this.domNodes.downloadLink.setAttribute('download', '');
      this.domNodes.downloadLink.textContent = this.options.download;
      this.domNodes.download.appendChild(this.domNodes.downloadLink);
      this.domNodes.caption = document.createElement('div');
      this.domNodes.caption.classList.add('sl-caption', 'pos-' + this.options.captionPosition);
      if (this.options.captionClass) {
        var _this$domNodes$captio;
        var captionClasses = this.options.captionClass.split(/[\s,]+/);
        (_this$domNodes$captio = this.domNodes.caption.classList).add.apply(_this$domNodes$captio, _toConsumableArray(captionClasses));
      }
      this.domNodes.image = document.createElement('div');
      this.domNodes.image.classList.add('sl-image');
      this.domNodes.wrapper = document.createElement('div');
      this.domNodes.wrapper.classList.add('sl-wrapper');
      this.domNodes.wrapper.setAttribute('tabindex', -1);
      this.domNodes.wrapper.setAttribute('role', 'dialog');
      this.domNodes.wrapper.setAttribute('aria-hidden', false);
      if (this.options.className) {
        this.domNodes.wrapper.classList.add(this.options.className);
      }
      if (this.options.rtl) {
        this.domNodes.wrapper.classList.add('sl-dir-rtl');
      }
    }
  }, {
    key: "throttle",
    value: function throttle(func, limit) {
      var inThrottle;
      return function () {
        if (!inThrottle) {
          func.apply(this, arguments);
          inThrottle = true;
          setTimeout(function () {
            return inThrottle = false;
          }, limit);
        }
      };
    }
  }, {
    key: "isValidLink",
    value: function isValidLink(element) {
      return !this.options.fileExt || element.getAttribute(this.options.sourceAttr) && new RegExp('(' + this.options.fileExt + ')($|\\?.*$)', 'i').test(element.getAttribute(this.options.sourceAttr));
    }
  }, {
    key: "calculateTransitionPrefix",
    value: function calculateTransitionPrefix() {
      var s = (document.body || document.documentElement).style;
      return 'transition' in s ? '' : 'WebkitTransition' in s ? '-webkit-' : 'MozTransition' in s ? '-moz-' : 'OTransition' in s ? '-o' : false;
    }
  }, {
    key: "getScrollbarWidth",
    value: function getScrollbarWidth() {
      var scrollbarWidth = 0;
      var scrollDiv = document.createElement('div');
      scrollDiv.classList.add('sl-scrollbar-measure');
      document.body.appendChild(scrollDiv);
      scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    }
  }, {
    key: "toggleScrollbar",
    value: function toggleScrollbar(type) {
      var scrollbarWidth = 0;
      var fixedElements = [].slice.call(document.querySelectorAll('.' + this.options.fixedClass));
      if (type === 'hide') {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
          var documentElementRect = document.documentElement.getBoundingClientRect();
          fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        if (document.body.clientWidth < fullWindowWidth || this.isAppleDevice) {
          var paddingRight = parseInt(window.getComputedStyle(document.body).paddingRight || 0, 10);
          scrollbarWidth = this.getScrollbarWidth();
          document.body.dataset.originalPaddingRight = paddingRight;
          if (scrollbarWidth > 0 || scrollbarWidth == 0 && this.isAppleDevice) {
            document.body.classList.add('hidden-scroll');
            document.body.style.paddingRight = paddingRight + scrollbarWidth + 'px';
            fixedElements.forEach(function (element) {
              var actualPadding = element.style.paddingRight;
              var calculatedPadding = window.getComputedStyle(element)['padding-right'];
              element.dataset.originalPaddingRight = actualPadding;
              element.style.paddingRight = "".concat(parseFloat(calculatedPadding) + scrollbarWidth, "px");
            });
          }
        }
      } else {
        document.body.classList.remove('hidden-scroll');
        document.body.style.paddingRight = document.body.dataset.originalPaddingRight + 'px';
        fixedElements.forEach(function (element) {
          var padding = element.dataset.originalPaddingRight;
          if (typeof padding !== 'undefined') {
            element.style.paddingRight = padding;
          }
        });
      }
      return scrollbarWidth;
    }
  }, {
    key: "close",
    value: function close() {
      var _this2 = this;
      if (!this.isOpen || this.isAnimating || this.isClosing) {
        return false;
      }
      this.isClosing = true;
      var element = this.relatedElements[this.currentImageIndex];
      element.dispatchEvent(new Event('close.simplelightbox'));
      if (this.options.history) {
        this.historyHasChanges = false;
        if (!this.hashReseted) {
          this.resetHash();
        }
      }
      this.removeEventListener(document, 'focusin.' + this.eventNamespace);
      this.fadeOut(this.domNodes.overlay, this.options.fadeSpeed);
      this.fadeOut(document.querySelectorAll('.sl-image img,  .sl-close, .sl-navigation, .sl-image .sl-caption, .sl-counter'), this.options.fadeSpeed, function () {
        if (_this2.options.disableScroll) {
          _this2.toggleScrollbar('show');
        }
        if (_this2.options.htmlClass && _this2.options.htmlClass !== '') {
          document.querySelector('html').classList.remove(_this2.options.htmlClass);
        }
        document.body.removeChild(_this2.domNodes.wrapper);
        if (_this2.options.overlay) {
          document.body.removeChild(_this2.domNodes.overlay);
        }
        _this2.domNodes.additionalHtml = null;
        _this2.domNodes.download = null;
        element.dispatchEvent(new Event('closed.simplelightbox'));
        _this2.isClosing = false;
      });
      this.currentImage = null;
      this.isOpen = false;
      this.isAnimating = false;

      // reset touchcontrol coordinates
      for (var key in this.controlCoordinates) {
        this.controlCoordinates[key] = 0;
      }
      this.controlCoordinates.mousedown = false;
      this.controlCoordinates.zoomed = false;
      this.controlCoordinates.capture = false;
      this.controlCoordinates.initialScale = this.minMax(1, 1, this.options.maxZoom);
      this.controlCoordinates.doubleTapped = false;
    }
  }, {
    key: "hash",
    get: function get() {
      return window.location.hash.substring(1);
    }
  }, {
    key: "preload",
    value: function preload() {
      var _this3 = this;
      var index = this.currentImageIndex,
        length = this.relatedElements.length,
        next = index + 1 < 0 ? length - 1 : index + 1 >= length - 1 ? 0 : index + 1,
        prev = index - 1 < 0 ? length - 1 : index - 1 >= length - 1 ? 0 : index - 1,
        nextImage = new Image(),
        prevImage = new Image();
      nextImage.addEventListener('load', function (event) {
        var src = event.target.getAttribute('src');
        if (_this3.loadedImages.indexOf(src) === -1) {
          //is this condition even required... setting multiple times will not change usage...
          _this3.loadedImages.push(src);
        }
        _this3.relatedElements[index].dispatchEvent(new Event('nextImageLoaded.' + _this3.eventNamespace));
      });
      nextImage.setAttribute('src', this.relatedElements[next].getAttribute(this.options.sourceAttr));
      prevImage.addEventListener('load', function (event) {
        var src = event.target.getAttribute('src');
        if (_this3.loadedImages.indexOf(src) === -1) {
          _this3.loadedImages.push(src);
        }
        _this3.relatedElements[index].dispatchEvent(new Event('prevImageLoaded.' + _this3.eventNamespace));
      });
      prevImage.setAttribute('src', this.relatedElements[prev].getAttribute(this.options.sourceAttr));
    }
  }, {
    key: "loadImage",
    value: function loadImage(direction) {
      var _this4 = this;
      var slideDirection = direction;
      if (this.options.rtl) {
        direction = -direction;
      }
      this.relatedElements[this.currentImageIndex].dispatchEvent(new Event('change.' + this.eventNamespace));
      this.relatedElements[this.currentImageIndex].dispatchEvent(new Event((direction === 1 ? 'next' : 'prev') + '.' + this.eventNamespace));
      var newIndex = this.currentImageIndex + direction;
      if (this.isAnimating || (newIndex < 0 || newIndex >= this.relatedElements.length) && this.options.loop === false) {
        return false;
      }
      this.currentImageIndex = newIndex < 0 ? this.relatedElements.length - 1 : newIndex > this.relatedElements.length - 1 ? 0 : newIndex;
      this.domNodes.counter.querySelector('.sl-current').innerHTML = this.currentImageIndex + 1;
      if (this.options.animationSlide) {
        this.slide(this.options.animationSpeed / 1000, -100 * slideDirection - this.controlCoordinates.swipeDiff + 'px');
      }
      this.fadeOut(this.domNodes.image, this.options.fadeSpeed, function () {
        _this4.isAnimating = true;
        if (!_this4.isClosing) {
          setTimeout(function () {
            var element = _this4.relatedElements[_this4.currentImageIndex];
            if (!_this4.currentImage) return;
            _this4.currentImage.setAttribute('src', element.getAttribute(_this4.options.sourceAttr));
            if (_this4.loadedImages.indexOf(element.getAttribute(_this4.options.sourceAttr)) === -1) {
              _this4.show(_this4.domNodes.spinner);
            }
            if (_this4.domNodes.image.contains(_this4.domNodes.caption)) {
              _this4.domNodes.image.removeChild(_this4.domNodes.caption);
            }
            _this4.adjustImage(slideDirection);
            if (_this4.options.preloading) _this4.preload();
          }, 100);
        } else {
          _this4.isAnimating = false;
        }
      });
    }
  }, {
    key: "adjustImage",
    value: function adjustImage(direction) {
      var _this5 = this;
      if (!this.currentImage) {
        return false;
      }
      var tmpImage = new Image(),
        windowWidth = window.innerWidth * this.options.widthRatio,
        windowHeight = window.innerHeight * this.options.heightRatio;
      tmpImage.setAttribute('src', this.currentImage.getAttribute('src'));
      this.currentImage.dataset.scale = 1;
      this.currentImage.dataset.translateX = 0;
      this.currentImage.dataset.translateY = 0;
      this.zoomPanElement(0, 0, 1);
      tmpImage.addEventListener('error', function (event) {
        _this5.relatedElements[_this5.currentImageIndex].dispatchEvent(new Event('error.' + _this5.eventNamespace));
        _this5.isAnimating = false;
        _this5.isOpen = true;
        _this5.domNodes.spinner.style.display = 'none';
        var dirIsDefined = direction === 1 || direction === -1;
        if (_this5.initialImageIndex === _this5.currentImageIndex && dirIsDefined) {
          return _this5.close();
        }
        if (_this5.options.alertError) {
          alert(_this5.options.alertErrorMessage);
        }
        _this5.loadImage(dirIsDefined ? direction : 1);
      });
      tmpImage.addEventListener('load', function (event) {
        if (typeof direction !== 'undefined') {
          _this5.relatedElements[_this5.currentImageIndex].dispatchEvent(new Event('changed.' + _this5.eventNamespace));
          _this5.relatedElements[_this5.currentImageIndex].dispatchEvent(new Event((direction === 1 ? 'nextDone' : 'prevDone') + '.' + _this5.eventNamespace));
        }

        // history
        if (_this5.options.history) {
          _this5.updateURL();
        }
        if (_this5.loadedImages.indexOf(_this5.currentImage.getAttribute('src')) === -1) {
          _this5.loadedImages.push(_this5.currentImage.getAttribute('src'));
        }
        var imageWidth = event.target.width,
          imageHeight = event.target.height;
        if (_this5.options.scaleImageToRatio || imageWidth > windowWidth || imageHeight > windowHeight) {
          var ratio = imageWidth / imageHeight > windowWidth / windowHeight ? imageWidth / windowWidth : imageHeight / windowHeight;
          imageWidth /= ratio;
          imageHeight /= ratio;
        }
        _this5.domNodes.image.style.top = (window.innerHeight - imageHeight) / 2 + 'px';
        _this5.domNodes.image.style.left = (window.innerWidth - imageWidth - _this5.globalScrollbarWidth) / 2 + 'px';
        _this5.domNodes.image.style.width = imageWidth + 'px';
        _this5.domNodes.image.style.height = imageHeight + 'px';
        _this5.domNodes.spinner.style.display = 'none';
        if (_this5.options.focus) {
          _this5.forceFocus();
        }
        _this5.fadeIn(_this5.currentImage, _this5.options.fadeSpeed, function () {
          if (_this5.options.focus) {
            _this5.domNodes.wrapper.focus();
          }
        });
        _this5.isOpen = true;
        var captionContainer, captionText;
        if (typeof _this5.options.captionSelector === 'string') {
          captionContainer = _this5.options.captionSelector === 'self' ? _this5.relatedElements[_this5.currentImageIndex] : _this5.getCaptionElement(_this5.relatedElements[_this5.currentImageIndex]);
        } else if (typeof _this5.options.captionSelector === 'function') {
          captionContainer = _this5.options.captionSelector(_this5.relatedElements[_this5.currentImageIndex]);
        }
        if (_this5.options.captions && captionContainer) {
          if (_this5.options.captionType === 'data') {
            captionText = captionContainer.dataset[_this5.options.captionsData];
          } else if (_this5.options.captionType === 'text') {
            captionText = captionContainer.innerHTML;
          } else {
            captionText = captionContainer.getAttribute(_this5.options.captionsData);
          }
        }
        if (!_this5.options.loop) {
          if (_this5.currentImageIndex === 0) {
            _this5.hide(_this5.domNodes.navigation.querySelector('.sl-prev'));
          }
          if (_this5.currentImageIndex >= _this5.relatedElements.length - 1) {
            _this5.hide(_this5.domNodes.navigation.querySelector('.sl-next'));
          }
          if (_this5.currentImageIndex > 0) {
            _this5.show(_this5.domNodes.navigation.querySelector('.sl-prev'));
          }
          if (_this5.currentImageIndex < _this5.relatedElements.length - 1) {
            _this5.show(_this5.domNodes.navigation.querySelector('.sl-next'));
          }
        } else {
          if (_this5.relatedElements.length === 1) {
            _this5.hide(_this5.domNodes.navigation.querySelectorAll('.sl-prev, .sl-next'));
          } else {
            _this5.show(_this5.domNodes.navigation.querySelectorAll('.sl-prev, .sl-next'));
          }
        }
        if (direction === 1 || direction === -1) {
          if (_this5.options.animationSlide) {
            _this5.slide(0, 100 * direction + 'px');
            setTimeout(function () {
              _this5.slide(_this5.options.animationSpeed / 1000, 0 + 'px');
            }, 50);
          }
          _this5.fadeIn(_this5.domNodes.image, _this5.options.fadeSpeed, function () {
            _this5.isAnimating = false;
            _this5.setCaption(captionText, imageWidth);
          });
        } else {
          _this5.isAnimating = false;
          _this5.setCaption(captionText, imageWidth);
        }
        if (_this5.options.additionalHtml && !_this5.domNodes.additionalHtml) {
          _this5.domNodes.additionalHtml = document.createElement('div');
          _this5.domNodes.additionalHtml.classList.add('sl-additional-html');
          _this5.domNodes.additionalHtml.innerHTML = _this5.options.additionalHtml;
          _this5.domNodes.image.appendChild(_this5.domNodes.additionalHtml);
        }
        if (_this5.options.download) {
          _this5.domNodes.downloadLink.setAttribute('href', _this5.currentImage.getAttribute('src'));
        }
      });
    }
  }, {
    key: "zoomPanElement",
    value: function zoomPanElement(targetOffsetX, targetOffsetY, targetScale) {
      this.currentImage.style[this.transitionPrefix + 'transform'] = 'translate(' + targetOffsetX + ',' + targetOffsetY + ') scale(' + targetScale + ')';
    }
  }, {
    key: "minMax",
    value: function minMax(value, min, max) {
      return value < min ? min : value > max ? max : value;
    }
  }, {
    key: "setZoomData",
    value: function setZoomData(initialScale, targetOffsetX, targetOffsetY) {
      this.currentImage.dataset.scale = initialScale;
      this.currentImage.dataset.translateX = targetOffsetX;
      this.currentImage.dataset.translateY = targetOffsetY;
    }
  }, {
    key: "hashchangeHandler",
    value: function hashchangeHandler() {
      if (this.isOpen && this.hash === this.initialLocationHash) {
        this.hashReseted = true;
        this.close();
      }
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this6 = this;
      // resize/responsive
      this.addEventListener(window, 'resize.' + this.eventNamespace, function (event) {
        //this.adjustImage.bind(this)
        if (_this6.isOpen) {
          _this6.adjustImage();
        }
      });
      this.addEventListener(this.domNodes.closeButton, ['click.' + this.eventNamespace, 'touchstart.' + this.eventNamespace], this.close.bind(this));
      if (this.options.history) {
        setTimeout(function () {
          _this6.addEventListener(window, 'hashchange.' + _this6.eventNamespace, function (event) {
            if (_this6.isOpen) {
              _this6.hashchangeHandler();
            }
          });
        }, 40);
      }
      this.addEventListener(this.domNodes.navigation.getElementsByTagName('button'), 'click.' + this.eventNamespace, function (event) {
        if (!event.currentTarget.tagName.match(/button/i)) {
          return true;
        }
        event.preventDefault();
        _this6.controlCoordinates.swipeDiff = 0;
        _this6.loadImage(event.currentTarget.classList.contains('sl-next') ? 1 : -1);
      });
      if (this.options.scrollZoom) {
        var scale = 1;
        this.addEventListener(this.domNodes.image, ['mousewheel', 'DOMMouseScroll'], function (event) {
          if (_this6.controlCoordinates.mousedown || _this6.isAnimating || _this6.isClosing || !_this6.isOpen) {
            return true;
          }
          if (_this6.controlCoordinates.containerHeight == 0) {
            _this6.controlCoordinates.containerHeight = _this6.getDimensions(_this6.domNodes.image).height;
            _this6.controlCoordinates.containerWidth = _this6.getDimensions(_this6.domNodes.image).width;
            _this6.controlCoordinates.imgHeight = _this6.getDimensions(_this6.currentImage).height;
            _this6.controlCoordinates.imgWidth = _this6.getDimensions(_this6.currentImage).width;
            _this6.controlCoordinates.containerOffsetX = _this6.domNodes.image.offsetLeft;
            _this6.controlCoordinates.containerOffsetY = _this6.domNodes.image.offsetTop;
            _this6.controlCoordinates.initialOffsetX = parseFloat(_this6.currentImage.dataset.translateX);
            _this6.controlCoordinates.initialOffsetY = parseFloat(_this6.currentImage.dataset.translateY);
          }
          // event.preventDefault();

          var delta = event.delta || event.wheelDelta;
          if (delta === undefined) {
            //we are on firefox
            delta = event.detail;
          }
          delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency

          // apply zoom
          scale += delta * _this6.options.scrollZoomFactor * scale;
          scale = Math.max(1, Math.min(_this6.options.maxZoom, scale));
          _this6.controlCoordinates.targetScale = scale;
          var scrollTopPos = document.documentElement.scrollTop || document.body.scrollTop;
          _this6.controlCoordinates.pinchOffsetX = event.pageX;
          _this6.controlCoordinates.pinchOffsetY = event.pageY - scrollTopPos || 0; // need to substract the scroll position

          _this6.controlCoordinates.limitOffsetX = (_this6.controlCoordinates.imgWidth * _this6.controlCoordinates.targetScale - _this6.controlCoordinates.containerWidth) / 2;
          _this6.controlCoordinates.limitOffsetY = (_this6.controlCoordinates.imgHeight * _this6.controlCoordinates.targetScale - _this6.controlCoordinates.containerHeight) / 2;
          _this6.controlCoordinates.scaleDifference = _this6.controlCoordinates.targetScale - _this6.controlCoordinates.initialScale;
          _this6.controlCoordinates.targetOffsetX = _this6.controlCoordinates.imgWidth * _this6.controlCoordinates.targetScale <= _this6.controlCoordinates.containerWidth ? 0 : _this6.minMax(_this6.controlCoordinates.initialOffsetX - (_this6.controlCoordinates.pinchOffsetX - _this6.controlCoordinates.containerOffsetX - _this6.controlCoordinates.containerWidth / 2 - _this6.controlCoordinates.initialOffsetX) / (_this6.controlCoordinates.targetScale - _this6.controlCoordinates.scaleDifference) * _this6.controlCoordinates.scaleDifference, _this6.controlCoordinates.limitOffsetX * -1, _this6.controlCoordinates.limitOffsetX);
          _this6.controlCoordinates.targetOffsetY = _this6.controlCoordinates.imgHeight * _this6.controlCoordinates.targetScale <= _this6.controlCoordinates.containerHeight ? 0 : _this6.minMax(_this6.controlCoordinates.initialOffsetY - (_this6.controlCoordinates.pinchOffsetY - _this6.controlCoordinates.containerOffsetY - _this6.controlCoordinates.containerHeight / 2 - _this6.controlCoordinates.initialOffsetY) / (_this6.controlCoordinates.targetScale - _this6.controlCoordinates.scaleDifference) * _this6.controlCoordinates.scaleDifference, _this6.controlCoordinates.limitOffsetY * -1, _this6.controlCoordinates.limitOffsetY);
          _this6.zoomPanElement(_this6.controlCoordinates.targetOffsetX + "px", _this6.controlCoordinates.targetOffsetY + "px", _this6.controlCoordinates.targetScale);
          if (_this6.controlCoordinates.targetScale > 1) {
            _this6.controlCoordinates.zoomed = true;
            if ((!_this6.domNodes.caption.style.opacity || _this6.domNodes.caption.style.opacity > 0) && _this6.domNodes.caption.style.display !== 'none') {
              _this6.fadeOut(_this6.domNodes.caption, _this6.options.fadeSpeed);
            }
          } else {
            if (_this6.controlCoordinates.initialScale === 1) {
              _this6.controlCoordinates.zoomed = false;
              if (_this6.domNodes.caption.style.display === 'none') {
                _this6.fadeIn(_this6.domNodes.caption, _this6.options.fadeSpeed);
              }
            }
            _this6.controlCoordinates.initialPinchDistance = null;
            _this6.controlCoordinates.capture = false;
          }
          _this6.controlCoordinates.initialPinchDistance = _this6.controlCoordinates.targetPinchDistance;
          _this6.controlCoordinates.initialScale = _this6.controlCoordinates.targetScale;
          _this6.controlCoordinates.initialOffsetX = _this6.controlCoordinates.targetOffsetX;
          _this6.controlCoordinates.initialOffsetY = _this6.controlCoordinates.targetOffsetY;
          _this6.setZoomData(_this6.controlCoordinates.targetScale, _this6.controlCoordinates.targetOffsetX, _this6.controlCoordinates.targetOffsetY);
          _this6.zoomPanElement(_this6.controlCoordinates.targetOffsetX + "px", _this6.controlCoordinates.targetOffsetY + "px", _this6.controlCoordinates.targetScale);
        });
      }
      this.addEventListener(this.domNodes.image, ['touchstart.' + this.eventNamespace, 'mousedown.' + this.eventNamespace], function (event) {
        if (event.target.tagName === 'A' && event.type === 'touchstart') {
          return true;
        }
        if (event.type === 'mousedown') {
          event.preventDefault();
          _this6.controlCoordinates.initialPointerOffsetX = event.clientX;
          _this6.controlCoordinates.initialPointerOffsetY = event.clientY;
          _this6.controlCoordinates.containerHeight = _this6.getDimensions(_this6.domNodes.image).height;
          _this6.controlCoordinates.containerWidth = _this6.getDimensions(_this6.domNodes.image).width;
          _this6.controlCoordinates.imgHeight = _this6.getDimensions(_this6.currentImage).height;
          _this6.controlCoordinates.imgWidth = _this6.getDimensions(_this6.currentImage).width;
          _this6.controlCoordinates.containerOffsetX = _this6.domNodes.image.offsetLeft;
          _this6.controlCoordinates.containerOffsetY = _this6.domNodes.image.offsetTop;
          _this6.controlCoordinates.initialOffsetX = parseFloat(_this6.currentImage.dataset.translateX);
          _this6.controlCoordinates.initialOffsetY = parseFloat(_this6.currentImage.dataset.translateY);
          _this6.controlCoordinates.capture = true;
        } else {
          _this6.controlCoordinates.touchCount = event.touches.length;
          _this6.controlCoordinates.initialPointerOffsetX = event.touches[0].clientX;
          _this6.controlCoordinates.initialPointerOffsetY = event.touches[0].clientY;
          _this6.controlCoordinates.containerHeight = _this6.getDimensions(_this6.domNodes.image).height;
          _this6.controlCoordinates.containerWidth = _this6.getDimensions(_this6.domNodes.image).width;
          _this6.controlCoordinates.imgHeight = _this6.getDimensions(_this6.currentImage).height;
          _this6.controlCoordinates.imgWidth = _this6.getDimensions(_this6.currentImage).width;
          _this6.controlCoordinates.containerOffsetX = _this6.domNodes.image.offsetLeft;
          _this6.controlCoordinates.containerOffsetY = _this6.domNodes.image.offsetTop;
          if (_this6.controlCoordinates.touchCount === 1) /* Single touch */{
              if (!_this6.controlCoordinates.doubleTapped) {
                _this6.controlCoordinates.doubleTapped = true;
                setTimeout(function () {
                  _this6.controlCoordinates.doubleTapped = false;
                }, 300);
              } else {
                _this6.currentImage.classList.add('sl-transition');
                if (!_this6.controlCoordinates.zoomed) {
                  _this6.controlCoordinates.initialScale = _this6.options.doubleTapZoom;
                  _this6.setZoomData(_this6.controlCoordinates.initialScale, 0, 0);
                  _this6.zoomPanElement(0 + "px", 0 + "px", _this6.controlCoordinates.initialScale);
                  if ((!_this6.domNodes.caption.style.opacity || _this6.domNodes.caption.style.opacity > 0) && _this6.domNodes.caption.style.display !== 'none') {
                    _this6.fadeOut(_this6.domNodes.caption, _this6.options.fadeSpeed);
                  }
                  _this6.controlCoordinates.zoomed = true;
                } else {
                  _this6.controlCoordinates.initialScale = 1;
                  _this6.setZoomData(_this6.controlCoordinates.initialScale, 0, 0);
                  _this6.zoomPanElement(0 + "px", 0 + "px", _this6.controlCoordinates.initialScale);
                  _this6.controlCoordinates.zoomed = false;
                }
                setTimeout(function () {
                  if (_this6.currentImage) {
                    _this6.currentImage.classList.remove('sl-transition');
                  }
                }, 200);
                return false;
              }
              _this6.controlCoordinates.initialOffsetX = parseFloat(_this6.currentImage.dataset.translateX);
              _this6.controlCoordinates.initialOffsetY = parseFloat(_this6.currentImage.dataset.translateY);
            } else if (_this6.controlCoordinates.touchCount === 2) /* Pinch */{
              _this6.controlCoordinates.initialPointerOffsetX2 = event.touches[1].clientX;
              _this6.controlCoordinates.initialPointerOffsetY2 = event.touches[1].clientY;
              _this6.controlCoordinates.initialOffsetX = parseFloat(_this6.currentImage.dataset.translateX);
              _this6.controlCoordinates.initialOffsetY = parseFloat(_this6.currentImage.dataset.translateY);
              _this6.controlCoordinates.pinchOffsetX = (_this6.controlCoordinates.initialPointerOffsetX + _this6.controlCoordinates.initialPointerOffsetX2) / 2;
              _this6.controlCoordinates.pinchOffsetY = (_this6.controlCoordinates.initialPointerOffsetY + _this6.controlCoordinates.initialPointerOffsetY2) / 2;
              _this6.controlCoordinates.initialPinchDistance = Math.sqrt((_this6.controlCoordinates.initialPointerOffsetX - _this6.controlCoordinates.initialPointerOffsetX2) * (_this6.controlCoordinates.initialPointerOffsetX - _this6.controlCoordinates.initialPointerOffsetX2) + (_this6.controlCoordinates.initialPointerOffsetY - _this6.controlCoordinates.initialPointerOffsetY2) * (_this6.controlCoordinates.initialPointerOffsetY - _this6.controlCoordinates.initialPointerOffsetY2));
            }
          _this6.controlCoordinates.capture = true;
        }
        if (_this6.controlCoordinates.mousedown) return true;
        if (_this6.transitionCapable) {
          _this6.controlCoordinates.imageLeft = parseInt(_this6.domNodes.image.style.left, 10);
        }
        _this6.controlCoordinates.mousedown = true;
        _this6.controlCoordinates.swipeDiff = 0;
        _this6.controlCoordinates.swipeYDiff = 0;
        _this6.controlCoordinates.swipeStart = event.pageX || event.touches[0].pageX;
        _this6.controlCoordinates.swipeYStart = event.pageY || event.touches[0].pageY;
        return false;
      });
      this.addEventListener(this.domNodes.image, ['touchmove.' + this.eventNamespace, 'mousemove.' + this.eventNamespace, 'MSPointerMove'], function (event) {
        if (!_this6.controlCoordinates.mousedown) {
          return true;
        }
        if (event.type === 'touchmove') {
          if (_this6.controlCoordinates.capture === false) {
            return false;
          }
          _this6.controlCoordinates.pointerOffsetX = event.touches[0].clientX;
          _this6.controlCoordinates.pointerOffsetY = event.touches[0].clientY;
          _this6.controlCoordinates.touchCount = event.touches.length;
          _this6.controlCoordinates.touchmoveCount++;
          if (_this6.controlCoordinates.touchCount > 1) /* Pinch */{
              _this6.controlCoordinates.pointerOffsetX2 = event.touches[1].clientX;
              _this6.controlCoordinates.pointerOffsetY2 = event.touches[1].clientY;
              _this6.controlCoordinates.targetPinchDistance = Math.sqrt((_this6.controlCoordinates.pointerOffsetX - _this6.controlCoordinates.pointerOffsetX2) * (_this6.controlCoordinates.pointerOffsetX - _this6.controlCoordinates.pointerOffsetX2) + (_this6.controlCoordinates.pointerOffsetY - _this6.controlCoordinates.pointerOffsetY2) * (_this6.controlCoordinates.pointerOffsetY - _this6.controlCoordinates.pointerOffsetY2));
              if (_this6.controlCoordinates.initialPinchDistance === null) {
                _this6.controlCoordinates.initialPinchDistance = _this6.controlCoordinates.targetPinchDistance;
              }
              if (Math.abs(_this6.controlCoordinates.initialPinchDistance - _this6.controlCoordinates.targetPinchDistance) >= 1) {
                /* Initialize helpers */
                _this6.controlCoordinates.targetScale = _this6.minMax(_this6.controlCoordinates.targetPinchDistance / _this6.controlCoordinates.initialPinchDistance * _this6.controlCoordinates.initialScale, 1, _this6.options.maxZoom);
                _this6.controlCoordinates.limitOffsetX = (_this6.controlCoordinates.imgWidth * _this6.controlCoordinates.targetScale - _this6.controlCoordinates.containerWidth) / 2;
                _this6.controlCoordinates.limitOffsetY = (_this6.controlCoordinates.imgHeight * _this6.controlCoordinates.targetScale - _this6.controlCoordinates.containerHeight) / 2;
                _this6.controlCoordinates.scaleDifference = _this6.controlCoordinates.targetScale - _this6.controlCoordinates.initialScale;
                _this6.controlCoordinates.targetOffsetX = _this6.controlCoordinates.imgWidth * _this6.controlCoordinates.targetScale <= _this6.controlCoordinates.containerWidth ? 0 : _this6.minMax(_this6.controlCoordinates.initialOffsetX - (_this6.controlCoordinates.pinchOffsetX - _this6.controlCoordinates.containerOffsetX - _this6.controlCoordinates.containerWidth / 2 - _this6.controlCoordinates.initialOffsetX) / (_this6.controlCoordinates.targetScale - _this6.controlCoordinates.scaleDifference) * _this6.controlCoordinates.scaleDifference, _this6.controlCoordinates.limitOffsetX * -1, _this6.controlCoordinates.limitOffsetX);
                _this6.controlCoordinates.targetOffsetY = _this6.controlCoordinates.imgHeight * _this6.controlCoordinates.targetScale <= _this6.controlCoordinates.containerHeight ? 0 : _this6.minMax(_this6.controlCoordinates.initialOffsetY - (_this6.controlCoordinates.pinchOffsetY - _this6.controlCoordinates.containerOffsetY - _this6.controlCoordinates.containerHeight / 2 - _this6.controlCoordinates.initialOffsetY) / (_this6.controlCoordinates.targetScale - _this6.controlCoordinates.scaleDifference) * _this6.controlCoordinates.scaleDifference, _this6.controlCoordinates.limitOffsetY * -1, _this6.controlCoordinates.limitOffsetY);
                _this6.zoomPanElement(_this6.controlCoordinates.targetOffsetX + "px", _this6.controlCoordinates.targetOffsetY + "px", _this6.controlCoordinates.targetScale);
                if (_this6.controlCoordinates.targetScale > 1) {
                  _this6.controlCoordinates.zoomed = true;
                  if ((!_this6.domNodes.caption.style.opacity || _this6.domNodes.caption.style.opacity > 0) && _this6.domNodes.caption.style.display !== 'none') {
                    _this6.fadeOut(_this6.domNodes.caption, _this6.options.fadeSpeed);
                  }
                }
                _this6.controlCoordinates.initialPinchDistance = _this6.controlCoordinates.targetPinchDistance;
                _this6.controlCoordinates.initialScale = _this6.controlCoordinates.targetScale;
                _this6.controlCoordinates.initialOffsetX = _this6.controlCoordinates.targetOffsetX;
                _this6.controlCoordinates.initialOffsetY = _this6.controlCoordinates.targetOffsetY;
              }
            } else {
            _this6.controlCoordinates.targetScale = _this6.controlCoordinates.initialScale;
            _this6.controlCoordinates.limitOffsetX = (_this6.controlCoordinates.imgWidth * _this6.controlCoordinates.targetScale - _this6.controlCoordinates.containerWidth) / 2;
            _this6.controlCoordinates.limitOffsetY = (_this6.controlCoordinates.imgHeight * _this6.controlCoordinates.targetScale - _this6.controlCoordinates.containerHeight) / 2;
            _this6.controlCoordinates.targetOffsetX = _this6.controlCoordinates.imgWidth * _this6.controlCoordinates.targetScale <= _this6.controlCoordinates.containerWidth ? 0 : _this6.minMax(_this6.controlCoordinates.pointerOffsetX - (_this6.controlCoordinates.initialPointerOffsetX - _this6.controlCoordinates.initialOffsetX), _this6.controlCoordinates.limitOffsetX * -1, _this6.controlCoordinates.limitOffsetX);
            _this6.controlCoordinates.targetOffsetY = _this6.controlCoordinates.imgHeight * _this6.controlCoordinates.targetScale <= _this6.controlCoordinates.containerHeight ? 0 : _this6.minMax(_this6.controlCoordinates.pointerOffsetY - (_this6.controlCoordinates.initialPointerOffsetY - _this6.controlCoordinates.initialOffsetY), _this6.controlCoordinates.limitOffsetY * -1, _this6.controlCoordinates.limitOffsetY);
            if (Math.abs(_this6.controlCoordinates.targetOffsetX) === Math.abs(_this6.controlCoordinates.limitOffsetX)) {
              _this6.controlCoordinates.initialOffsetX = _this6.controlCoordinates.targetOffsetX;
              _this6.controlCoordinates.initialPointerOffsetX = _this6.controlCoordinates.pointerOffsetX;
            }
            if (Math.abs(_this6.controlCoordinates.targetOffsetY) === Math.abs(_this6.controlCoordinates.limitOffsetY)) {
              _this6.controlCoordinates.initialOffsetY = _this6.controlCoordinates.targetOffsetY;
              _this6.controlCoordinates.initialPointerOffsetY = _this6.controlCoordinates.pointerOffsetY;
            }
            _this6.setZoomData(_this6.controlCoordinates.initialScale, _this6.controlCoordinates.targetOffsetX, _this6.controlCoordinates.targetOffsetY);
            _this6.zoomPanElement(_this6.controlCoordinates.targetOffsetX + "px", _this6.controlCoordinates.targetOffsetY + "px", _this6.controlCoordinates.targetScale);
          }
        }

        /* Mouse Move implementation */
        if (event.type === 'mousemove' && _this6.controlCoordinates.mousedown) {
          if (event.type == 'touchmove') return true;
          event.preventDefault();
          if (_this6.controlCoordinates.capture === false) return false;
          _this6.controlCoordinates.pointerOffsetX = event.clientX;
          _this6.controlCoordinates.pointerOffsetY = event.clientY;
          _this6.controlCoordinates.targetScale = _this6.controlCoordinates.initialScale;
          _this6.controlCoordinates.limitOffsetX = (_this6.controlCoordinates.imgWidth * _this6.controlCoordinates.targetScale - _this6.controlCoordinates.containerWidth) / 2;
          _this6.controlCoordinates.limitOffsetY = (_this6.controlCoordinates.imgHeight * _this6.controlCoordinates.targetScale - _this6.controlCoordinates.containerHeight) / 2;
          _this6.controlCoordinates.targetOffsetX = _this6.controlCoordinates.imgWidth * _this6.controlCoordinates.targetScale <= _this6.controlCoordinates.containerWidth ? 0 : _this6.minMax(_this6.controlCoordinates.pointerOffsetX - (_this6.controlCoordinates.initialPointerOffsetX - _this6.controlCoordinates.initialOffsetX), _this6.controlCoordinates.limitOffsetX * -1, _this6.controlCoordinates.limitOffsetX);
          _this6.controlCoordinates.targetOffsetY = _this6.controlCoordinates.imgHeight * _this6.controlCoordinates.targetScale <= _this6.controlCoordinates.containerHeight ? 0 : _this6.minMax(_this6.controlCoordinates.pointerOffsetY - (_this6.controlCoordinates.initialPointerOffsetY - _this6.controlCoordinates.initialOffsetY), _this6.controlCoordinates.limitOffsetY * -1, _this6.controlCoordinates.limitOffsetY);
          if (Math.abs(_this6.controlCoordinates.targetOffsetX) === Math.abs(_this6.controlCoordinates.limitOffsetX)) {
            _this6.controlCoordinates.initialOffsetX = _this6.controlCoordinates.targetOffsetX;
            _this6.controlCoordinates.initialPointerOffsetX = _this6.controlCoordinates.pointerOffsetX;
          }
          if (Math.abs(_this6.controlCoordinates.targetOffsetY) === Math.abs(_this6.controlCoordinates.limitOffsetY)) {
            _this6.controlCoordinates.initialOffsetY = _this6.controlCoordinates.targetOffsetY;
            _this6.controlCoordinates.initialPointerOffsetY = _this6.controlCoordinates.pointerOffsetY;
          }
          _this6.setZoomData(_this6.controlCoordinates.initialScale, _this6.controlCoordinates.targetOffsetX, _this6.controlCoordinates.targetOffsetY);
          _this6.zoomPanElement(_this6.controlCoordinates.targetOffsetX + "px", _this6.controlCoordinates.targetOffsetY + "px", _this6.controlCoordinates.targetScale);
        }
        if (!_this6.controlCoordinates.zoomed) {
          _this6.controlCoordinates.swipeEnd = event.pageX || event.touches[0].pageX;
          _this6.controlCoordinates.swipeYEnd = event.pageY || event.touches[0].pageY;
          _this6.controlCoordinates.swipeDiff = _this6.controlCoordinates.swipeStart - _this6.controlCoordinates.swipeEnd;
          _this6.controlCoordinates.swipeYDiff = _this6.controlCoordinates.swipeYStart - _this6.controlCoordinates.swipeYEnd;
          if (_this6.options.animationSlide) {
            _this6.slide(0, -_this6.controlCoordinates.swipeDiff + 'px');
          }
        }
      });
      this.addEventListener(this.domNodes.image, ['touchend.' + this.eventNamespace, 'mouseup.' + this.eventNamespace, 'touchcancel.' + this.eventNamespace, 'mouseleave.' + this.eventNamespace, 'pointerup', 'pointercancel', 'MSPointerUp', 'MSPointerCancel'], function (event) {
        if (_this6.isTouchDevice && event.type === 'touchend') {
          _this6.controlCoordinates.touchCount = event.touches.length;
          if (_this6.controlCoordinates.touchCount === 0) /* No touch */{
              /* Set attributes */
              if (_this6.currentImage) {
                _this6.setZoomData(_this6.controlCoordinates.initialScale, _this6.controlCoordinates.targetOffsetX, _this6.controlCoordinates.targetOffsetY);
              }
              if (_this6.controlCoordinates.initialScale === 1) {
                _this6.controlCoordinates.zoomed = false;
                if (_this6.domNodes.caption.style.display === 'none') {
                  _this6.fadeIn(_this6.domNodes.caption, _this6.options.fadeSpeed);
                }
              }
              _this6.controlCoordinates.initialPinchDistance = null;
              _this6.controlCoordinates.capture = false;
            } else if (_this6.controlCoordinates.touchCount === 1) /* Single touch */{
              _this6.controlCoordinates.initialPointerOffsetX = event.touches[0].clientX;
              _this6.controlCoordinates.initialPointerOffsetY = event.touches[0].clientY;
            } else if (_this6.controlCoordinates.touchCount > 1) /* Pinch */{
              _this6.controlCoordinates.initialPinchDistance = null;
            }
        }
        if (_this6.controlCoordinates.mousedown) {
          _this6.controlCoordinates.mousedown = false;
          var possibleDir = true;
          if (!_this6.options.loop) {
            if (_this6.currentImageIndex === 0 && _this6.controlCoordinates.swipeDiff < 0) {
              possibleDir = false;
            }
            if (_this6.currentImageIndex >= _this6.relatedElements.length - 1 && _this6.controlCoordinates.swipeDiff > 0) {
              possibleDir = false;
            }
          }
          if (Math.abs(_this6.controlCoordinates.swipeDiff) > _this6.options.swipeTolerance && possibleDir) {
            _this6.loadImage(_this6.controlCoordinates.swipeDiff > 0 ? 1 : -1);
          } else if (_this6.options.animationSlide) {
            _this6.slide(_this6.options.animationSpeed / 1000, 0 + 'px');
          }
          if (_this6.options.swipeClose && Math.abs(_this6.controlCoordinates.swipeYDiff) > 50 && Math.abs(_this6.controlCoordinates.swipeDiff) < _this6.options.swipeTolerance) {
            _this6.close();
          }
        }
      });
      this.addEventListener(this.domNodes.image, ['dblclick'], function (event) {
        if (_this6.isTouchDevice) return;
        _this6.controlCoordinates.initialPointerOffsetX = event.clientX;
        _this6.controlCoordinates.initialPointerOffsetY = event.clientY;
        _this6.controlCoordinates.containerHeight = _this6.getDimensions(_this6.domNodes.image).height;
        _this6.controlCoordinates.containerWidth = _this6.getDimensions(_this6.domNodes.image).width;
        _this6.controlCoordinates.imgHeight = _this6.getDimensions(_this6.currentImage).height;
        _this6.controlCoordinates.imgWidth = _this6.getDimensions(_this6.currentImage).width;
        _this6.controlCoordinates.containerOffsetX = _this6.domNodes.image.offsetLeft;
        _this6.controlCoordinates.containerOffsetY = _this6.domNodes.image.offsetTop;
        _this6.currentImage.classList.add('sl-transition');
        if (!_this6.controlCoordinates.zoomed) {
          _this6.controlCoordinates.initialScale = _this6.options.doubleTapZoom;
          _this6.setZoomData(_this6.controlCoordinates.initialScale, 0, 0);
          _this6.zoomPanElement(0 + "px", 0 + "px", _this6.controlCoordinates.initialScale);
          if ((!_this6.domNodes.caption.style.opacity || _this6.domNodes.caption.style.opacity > 0) && _this6.domNodes.caption.style.display !== 'none') {
            _this6.fadeOut(_this6.domNodes.caption, _this6.options.fadeSpeed);
          }
          _this6.controlCoordinates.zoomed = true;
        } else {
          _this6.controlCoordinates.initialScale = 1;
          _this6.setZoomData(_this6.controlCoordinates.initialScale, 0, 0);
          _this6.zoomPanElement(0 + "px", 0 + "px", _this6.controlCoordinates.initialScale);
          _this6.controlCoordinates.zoomed = false;
          if (_this6.domNodes.caption.style.display === 'none') {
            _this6.fadeIn(_this6.domNodes.caption, _this6.options.fadeSpeed);
          }
        }
        setTimeout(function () {
          if (_this6.currentImage) {
            _this6.currentImage.classList.remove('sl-transition');
            _this6.currentImage.style[_this6.transitionPrefix + 'transform-origin'] = null;
          }
        }, 200);
        _this6.controlCoordinates.capture = true;
        return false;
      });
    }
  }, {
    key: "getDimensions",
    value: function getDimensions(element) {
      var styles = window.getComputedStyle(element),
        height = element.offsetHeight,
        width = element.offsetWidth,
        borderTopWidth = parseFloat(styles.borderTopWidth),
        borderBottomWidth = parseFloat(styles.borderBottomWidth),
        paddingTop = parseFloat(styles.paddingTop),
        paddingBottom = parseFloat(styles.paddingBottom),
        borderLeftWidth = parseFloat(styles.borderLeftWidth),
        borderRightWidth = parseFloat(styles.borderRightWidth),
        paddingLeft = parseFloat(styles.paddingLeft),
        paddingRight = parseFloat(styles.paddingRight);
      return {
        height: height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom,
        width: width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight
      };
    }
  }, {
    key: "updateHash",
    value: function updateHash() {
      var newHash = 'pid=' + (this.currentImageIndex + 1),
        newURL = window.location.href.split('#')[0] + '#' + newHash;
      this.hashReseted = false;
      if (this.pushStateSupport) {
        window.history[this.historyHasChanges ? 'replaceState' : 'pushState']('', document.title, newURL);
      } else {
        // what is the browser target of this?
        if (this.historyHasChanges) {
          window.location.replace(newURL);
        } else {
          window.location.hash = newHash;
        }
      }
      if (!this.historyHasChanges) {
        this.urlChangedOnce = true;
      }
      this.historyHasChanges = true;
    }
  }, {
    key: "resetHash",
    value: function resetHash() {
      this.hashReseted = true;
      if (this.urlChangedOnce) {
        history.back();
      } else {
        if (this.pushStateSupport) {
          history.pushState('', document.title, window.location.pathname + window.location.search);
        } else {
          window.location.hash = '';
        }
      }
      //
      //in case an history operation is still pending
      clearTimeout(this.historyUpdateTimeout);
    }
  }, {
    key: "updateURL",
    value: function updateURL() {
      clearTimeout(this.historyUpdateTimeout);
      if (!this.historyHasChanges) {
        this.updateHash(); // first time
      } else {
        this.historyUpdateTimeout = setTimeout(this.updateHash.bind(this), 800);
      }
    }
  }, {
    key: "setCaption",
    value: function setCaption(captionText, imageWidth, allowHTML) {
      var _this7 = this;
      if (this.options.captions && captionText && captionText !== '' && typeof captionText !== "undefined") {
        var _ref;
        var property = ((_ref = allowHTML !== null && allowHTML !== void 0 ? allowHTML : this.options.captionHTML) !== null && _ref !== void 0 ? _ref : true) ? 'innerHTML' : 'innerText';
        this.hide(this.domNodes.caption);
        this.domNodes.caption.style.width = imageWidth + 'px';
        this.domNodes.caption[property] = captionText;
        this.domNodes.image.appendChild(this.domNodes.caption);
        setTimeout(function () {
          _this7.fadeIn(_this7.domNodes.caption, _this7.options.fadeSpeed);
        }, this.options.captionDelay);
      }
    }
  }, {
    key: "slide",
    value: function slide(speed, pos) {
      if (!this.transitionCapable) {
        return this.domNodes.image.style.left = pos;
      }
      this.domNodes.image.style[this.transitionPrefix + 'transform'] = 'translateX(' + pos + ')';
      this.domNodes.image.style[this.transitionPrefix + 'transition'] = this.transitionPrefix + 'transform ' + speed + 's linear';
    }
  }, {
    key: "getRelated",
    value: function getRelated(rel) {
      var elems;
      if (rel && rel !== false && rel !== 'nofollow') {
        elems = Array.from(this.elements).filter(function (element) {
          return element.getAttribute('rel') === rel;
        });
      } else {
        elems = this.elements;
      }
      return elems;
    }
  }, {
    key: "openImage",
    value: function openImage(element) {
      var _this8 = this;
      element.dispatchEvent(new Event('show.' + this.eventNamespace));
      this.globalScrollbarWidth = this.getScrollbarWidth();
      if (this.options.disableScroll) {
        this.toggleScrollbar('hide');
        this.globalScrollbarWidth = 0;
      }
      if (this.options.htmlClass && this.options.htmlClass !== '') {
        document.querySelector('html').classList.add(this.options.htmlClass);
      }
      document.body.appendChild(this.domNodes.wrapper);
      this.domNodes.wrapper.appendChild(this.domNodes.image);
      if (this.options.overlay) {
        document.body.appendChild(this.domNodes.overlay);
      }
      this.relatedElements = this.getRelated(element.rel);
      if (this.options.showCounter) {
        if (this.relatedElements.length == 1 && this.domNodes.wrapper.contains(this.domNodes.counter)) {
          this.domNodes.wrapper.removeChild(this.domNodes.counter);
        } else if (this.relatedElements.length > 1 && !this.domNodes.wrapper.contains(this.domNodes.counter)) {
          this.domNodes.wrapper.appendChild(this.domNodes.counter);
        }
      }
      if (this.options.download && this.domNodes.download) {
        this.domNodes.wrapper.appendChild(this.domNodes.download);
      }
      this.isAnimating = true;
      this.currentImageIndex = this.relatedElements.indexOf(element);
      var targetURL = element.getAttribute(this.options.sourceAttr);
      this.currentImage = document.createElement('img');
      this.currentImage.style.display = 'none';
      this.currentImage.setAttribute('src', targetURL);
      this.currentImage.dataset.scale = 1;
      this.currentImage.dataset.translateX = 0;
      this.currentImage.dataset.translateY = 0;
      if (this.loadedImages.indexOf(targetURL) === -1) {
        this.loadedImages.push(targetURL);
      }
      this.domNodes.image.innerHTML = '';
      this.domNodes.image.setAttribute('style', '');
      this.domNodes.image.appendChild(this.currentImage);
      this.fadeIn(this.domNodes.overlay, this.options.fadeSpeed);
      this.fadeIn([this.domNodes.counter, this.domNodes.navigation, this.domNodes.closeButton, this.domNodes.download], this.options.fadeSpeed);
      this.show(this.domNodes.spinner);
      this.domNodes.counter.querySelector('.sl-current').innerHTML = this.currentImageIndex + 1;
      this.domNodes.counter.querySelector('.sl-total').innerHTML = this.relatedElements.length;
      this.adjustImage();
      if (this.options.preloading) {
        this.preload();
      }
      setTimeout(function () {
        element.dispatchEvent(new Event('shown.' + _this8.eventNamespace));
      }, this.options.animationSpeed);
    }
  }, {
    key: "forceFocus",
    value: function forceFocus() {
      var _this9 = this;
      this.removeEventListener(document, 'focusin.' + this.eventNamespace);
      this.addEventListener(document, 'focusin.' + this.eventNamespace, function (event) {
        if (document !== event.target && _this9.domNodes.wrapper !== event.target && !_this9.domNodes.wrapper.contains(event.target)) {
          _this9.domNodes.wrapper.focus();
        }
      });
    }

    // utility
  }, {
    key: "addEventListener",
    value: function addEventListener(elements, events, callback, opts) {
      elements = this.wrap(elements);
      events = this.wrap(events);
      var _iterator = _createForOfIteratorHelper(elements),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var element = _step.value;
          if (!element.namespaces) {
            element.namespaces = {};
          } // save the namespaces addEventListener the DOM element itself
          var _iterator2 = _createForOfIteratorHelper(events),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var event = _step2.value;
              var options = opts || false;
              var needsPassiveFix = ['touchstart', 'touchmove', 'mousewheel', 'DOMMouseScroll'].indexOf(event.split('.')[0]) >= 0;
              if (needsPassiveFix && this.isPassiveEventsSupported) {
                if (_typeof(options) === 'object') {
                  options.passive = true;
                } else {
                  options = {
                    passive: true
                  };
                }
              }
              element.namespaces[event] = callback;
              element.addEventListener(event.split('.')[0], callback, options);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(elements, events) {
      elements = this.wrap(elements);
      events = this.wrap(events);
      var _iterator3 = _createForOfIteratorHelper(elements),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var element = _step3.value;
          var _iterator4 = _createForOfIteratorHelper(events),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var event = _step4.value;
              if (element.namespaces && element.namespaces[event]) {
                element.removeEventListener(event.split('.')[0], element.namespaces[event]);
                delete element.namespaces[event];
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "fadeOut",
    value: function fadeOut(elements, duration, callback) {
      var _this10 = this;
      elements = this.wrap(elements);
      var _iterator5 = _createForOfIteratorHelper(elements),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var element = _step5.value;
          element.style.opacity = parseFloat(element) || window.getComputedStyle(element).getPropertyValue("opacity");
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      this.isFadeIn = false;
      var step = 16.66666 / (duration || this.options.fadeSpeed),
        fade = function fade() {
          var currentOpacity = parseFloat(elements[0].style.opacity);
          if ((currentOpacity -= step) < 0) {
            var _iterator6 = _createForOfIteratorHelper(elements),
              _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var element = _step6.value;
                element.style.display = "none";
                // element.style.opacity = '';
                element.style.opacity = 1;
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
            callback && callback.call(_this10, elements);
          } else {
            var _iterator7 = _createForOfIteratorHelper(elements),
              _step7;
            try {
              for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                var _element = _step7.value;
                _element.style.opacity = currentOpacity;
              }
            } catch (err) {
              _iterator7.e(err);
            } finally {
              _iterator7.f();
            }
            requestAnimationFrame(fade);
          }
        };
      fade();
    }
  }, {
    key: "fadeIn",
    value: function fadeIn(elements, duration, callback, display) {
      var _this11 = this;
      elements = this.wrap(elements);
      var _iterator8 = _createForOfIteratorHelper(elements),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var element = _step8.value;
          if (element) {
            element.style.opacity = 0;
            element.style.display = display || "block";
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      this.isFadeIn = true;
      var opacityTarget = parseFloat(elements[0].dataset.opacityTarget || 1),
        step = 16.66666 * opacityTarget / (duration || this.options.fadeSpeed),
        fade = function fade() {
          var currentOpacity = parseFloat(elements[0].style.opacity);
          if (!((currentOpacity += step) > opacityTarget)) {
            var _iterator9 = _createForOfIteratorHelper(elements),
              _step9;
            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                var element = _step9.value;
                if (element) {
                  element.style.opacity = currentOpacity;
                }
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }
            if (!_this11.isFadeIn) return;
            requestAnimationFrame(fade);
          } else {
            var _iterator10 = _createForOfIteratorHelper(elements),
              _step10;
            try {
              for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                var _element2 = _step10.value;
                if (_element2) {
                  _element2.style.opacity = opacityTarget;
                }
              }
            } catch (err) {
              _iterator10.e(err);
            } finally {
              _iterator10.f();
            }
            callback && callback.call(_this11, elements);
          }
        };
      fade();
    }
  }, {
    key: "hide",
    value: function hide(elements) {
      elements = this.wrap(elements);
      var _iterator11 = _createForOfIteratorHelper(elements),
        _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var element = _step11.value;
          if (element.style.display != 'none') {
            element.dataset.initialDisplay = element.style.display;
          }
          element.style.display = 'none';
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    }
  }, {
    key: "show",
    value: function show(elements, display) {
      elements = this.wrap(elements);
      var _iterator12 = _createForOfIteratorHelper(elements),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var element = _step12.value;
          element.style.display = element.dataset.initialDisplay || display || 'block';
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
    }
  }, {
    key: "wrap",
    value: function wrap(input) {
      return typeof input[Symbol.iterator] === 'function' && typeof input !== 'string' ? input : [input];
    }
  }, {
    key: "on",
    value: function on(events, callback) {
      events = this.wrap(events);
      var _iterator13 = _createForOfIteratorHelper(this.elements),
        _step13;
      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var element = _step13.value;
          if (!element.fullyNamespacedEvents) {
            element.fullyNamespacedEvents = {};
          }
          var _iterator14 = _createForOfIteratorHelper(events),
            _step14;
          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var event = _step14.value;
              element.fullyNamespacedEvents[event] = callback;
              element.addEventListener(event, callback);
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
      return this;
    }
  }, {
    key: "off",
    value: function off(events) {
      events = this.wrap(events);
      var _iterator15 = _createForOfIteratorHelper(this.elements),
        _step15;
      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var element = _step15.value;
          var _iterator16 = _createForOfIteratorHelper(events),
            _step16;
          try {
            for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
              var event = _step16.value;
              if (typeof element.fullyNamespacedEvents !== 'undefined' && event in element.fullyNamespacedEvents) {
                element.removeEventListener(event, element.fullyNamespacedEvents[event]);
              }
            }
          } catch (err) {
            _iterator16.e(err);
          } finally {
            _iterator16.f();
          }
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
      }
      return this;
    }

    // api
  }, {
    key: "open",
    value: function open(elem) {
      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      elem = elem || this.elements[0];
      if (typeof jQuery !== "undefined" && elem instanceof jQuery) {
        elem = elem.get(0);
      }
      if (position > 0) {
        elem = this.elements[position];
      }
      this.initialImageIndex = this.elements.indexOf(elem);
      if (this.initialImageIndex > -1) {
        this.openImage(elem);
      }
    }
  }, {
    key: "openPosition",
    value: function openPosition(position) {
      var elem = this.elements[position];
      this.open(elem, position);
    }
  }, {
    key: "next",
    value: function next() {
      this.loadImage(1);
    }
  }, {
    key: "prev",
    value: function prev() {
      this.loadImage(-1);
    }

    // get some useful data
  }, {
    key: "getLighboxData",
    value: function getLighboxData() {
      return {
        currentImageIndex: this.currentImageIndex,
        currentImage: this.currentImage,
        globalScrollbarWidth: this.globalScrollbarWidth
      };
    }

    //close is exposed anyways..
  }, {
    key: "destroy",
    value: function destroy() {
      //remove all custom event listeners from elements
      this.off(['close.' + this.eventNamespace, 'closed.' + this.eventNamespace, 'nextImageLoaded.' + this.eventNamespace, 'prevImageLoaded.' + this.eventNamespace, 'change.' + this.eventNamespace, 'nextDone.' + this.eventNamespace, 'prevDone.' + this.eventNamespace, 'error.' + this.eventNamespace, 'changed.' + this.eventNamespace, 'next.' + this.eventNamespace, 'prev.' + this.eventNamespace, 'show.' + this.eventNamespace, 'shown.' + this.eventNamespace]);
      this.removeEventListener(this.elements, 'click.' + this.eventNamespace);
      this.removeEventListener(document, 'focusin.' + this.eventNamespace);
      this.removeEventListener(document.body, 'contextmenu.' + this.eventNamespace);
      this.removeEventListener(document.body, 'keyup.' + this.eventNamespace);
      this.removeEventListener(this.domNodes.navigation.getElementsByTagName('button'), 'click.' + this.eventNamespace);
      this.removeEventListener(this.domNodes.closeButton, 'click.' + this.eventNamespace);
      this.removeEventListener(window, 'resize.' + this.eventNamespace);
      this.removeEventListener(window, 'hashchange.' + this.eventNamespace);
      this.close();
      if (this.isOpen) {
        document.body.removeChild(this.domNodes.wrapper);
        document.body.removeChild(this.domNodes.overlay);
      }
      this.elements = null;
    }
  }, {
    key: "refresh",
    value: function refresh() {
      if (!this.initialSelector) {
        throw 'refreshing only works when you initialize using a selector!';
      }
      var options = this.options,
        selector = this.initialSelector;
      this.destroy();
      this.constructor(selector, options);
      return this;
    }
  }]);
  return SimpleLightbox;
}();
var _default = SimpleLightbox;
exports["default"] = _default;
global.SimpleLightbox = SimpleLightbox;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"core-js/modules/es.array.concat.js":150,"core-js/modules/es.array.filter.js":151,"core-js/modules/es.array.for-each.js":152,"core-js/modules/es.array.from.js":153,"core-js/modules/es.array.index-of.js":155,"core-js/modules/es.array.is-array.js":156,"core-js/modules/es.array.iterator.js":157,"core-js/modules/es.array.slice.js":158,"core-js/modules/es.function.bind.js":161,"core-js/modules/es.function.name.js":162,"core-js/modules/es.object.assign.js":165,"core-js/modules/es.object.define-property.js":166,"core-js/modules/es.object.to-string.js":168,"core-js/modules/es.parse-float.js":169,"core-js/modules/es.parse-int.js":170,"core-js/modules/es.regexp.constructor.js":171,"core-js/modules/es.regexp.exec.js":172,"core-js/modules/es.regexp.sticky.js":173,"core-js/modules/es.regexp.test.js":174,"core-js/modules/es.regexp.to-string.js":175,"core-js/modules/es.string.iterator.js":177,"core-js/modules/es.string.match.js":178,"core-js/modules/es.string.replace.js":179,"core-js/modules/es.string.search.js":180,"core-js/modules/es.string.split.js":181,"core-js/modules/es.string.starts-with.js":182,"core-js/modules/es.string.trim-start.js":184,"core-js/modules/es.string.trim.js":185,"core-js/modules/es.symbol.description.js":187,"core-js/modules/es.symbol.iterator.js":189,"core-js/modules/es.symbol.js":190,"core-js/modules/web.dom-collections.for-each.js":192,"core-js/modules/web.dom-collections.iterator.js":193,"core-js/modules/web.timers.js":196}]},{},[197]);
