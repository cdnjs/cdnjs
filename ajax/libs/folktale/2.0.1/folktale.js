(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.folktale = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: experimental
 * name: module folktale/adt
 */
module.exports = {
  union: require('./union')
};
},{"./union":7}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]---------------------------------------------------
var _require = require('../union'),
    tagSymbol = _require.tagSymbol,
    typeSymbol = _require.typeSymbol;

// --[ Helpers ]--------------------------------------------------------
/*~
 * type: (Object Any) => String
 */


var objectToKeyValuePairs = function objectToKeyValuePairs(object) {
  return Object.keys(object).map(function (key) {
    return key + ': ' + showValue(object[key]);
  }).join(', ');
};

/*~
 * type: (Object Any).() => String
 */
var plainObjectToString = function plainObjectToString() {
  return '{ ' + objectToKeyValuePairs(this) + ' }';
};

/*~
 * type: (Array Any).() => String
 */
var arrayToString = function arrayToString() {
  return '[' + this.map(showValue).join(', ') + ']';
};

/*~
 * type: (Function) => String
 */
var functionNameToString = function functionNameToString(fn) {
  return fn.name !== '' ? ': ' + fn.name : '';
};

/*~
 * type: (Function) => String
 */
var functionToString = function functionToString(fn) {
  return '[Function' + functionNameToString(fn) + ']';
};

/*~
 * type: () => String
 */
var nullToString = function nullToString() {
  return 'null';
};

/*~
 * type: (Null | Object Any) => String
 */
var objectToString = function objectToString(object) {
  return object === null ? nullToString : Array.isArray(object) ? arrayToString : object.toString() === {}.toString() ? plainObjectToString : /* otherwise */object.toString;
};

/*~
 * type: (Any) => String
 */
var showValue = function showValue(value) {
  return typeof value === 'undefined' ? 'undefined' : typeof value === 'function' ? functionToString(value) : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol' ? value.toString() : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? objectToString(value).call(value) : /* otherwise */JSON.stringify(value);
};

// --[ Implementation ]------------------------------------------------

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   (Variant, Union) => Void
 */
var debugRepresentation = function debugRepresentation(variant, adt) {
  // eslint-disable-line max-statements
  var typeName = adt[typeSymbol];
  var variantName = adt[typeSymbol] + '.' + variant.prototype[tagSymbol];

  // (for Object.prototype.toString)
  adt[Symbol.toStringTag] = typeName;
  variant.prototype[Symbol.toStringTag] = variantName;

  // (regular JavaScript representations)
  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   () => String
   */
  adt.toString = function () {
    return typeName;
  };

  /*~
   * stability: experimental
   * mmodule: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   () => String
   */
  variant.toString = function () {
    return variantName;
  };

  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   (Union).() => String
   */
  variant.prototype.toString = function () {
    return variantName + '(' + plainObjectToString.call(this) + ')';
  };

  // (Node REPL representations)
  adt.inspect = adt.toString;
  variant.inspect = variant.toString;
  variant.prototype.inspect = variant.prototype.toString;

  return variant;
};

// --[ Exports ]-------------------------------------------------------
module.exports = debugRepresentation;
},{"../union":8}],4:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]---------------------------------------------------
var assertType = require('../../../helpers/assert-type');
var flEquals = require('../../../fantasy-land/equals');
var fl = require('../../../helpers/fantasy-land');
var provideAliases = require('../../../helpers/provide-fantasy-land-aliases');
var copyDocs = require('../../../helpers/copy-documentation');

var _require = require('../union'),
    tagSymbol = _require.tagSymbol,
    typeSymbol = _require.typeSymbol;

var toString = Object.prototype.toString;
var prototypeOf = Object.getPrototypeOf;

// --[ Helpers ]--------------------------------------------------------

/*~
 * type: (Any) => Boolean
 */
var isSetoid = function isSetoid(value) {
  return value != null && (typeof value[fl.equals] === 'function' || typeof value.equals === 'function');
};

/*~
 * type: (Variant, Variant) => Boolean
 */
var sameType = function sameType(a, b) {
  return a[typeSymbol] === b[typeSymbol] && a[tagSymbol] === b[tagSymbol];
};

var isPlainObject = function isPlainObject(object) {
  if (Object(object) !== object) return false;

  return !prototypeOf(object) || !object.toString || toString.call(object) === object.toString();
};

var deepEquals = function deepEquals(a, b) {
  if (a === b) return true;

  var leftSetoid = isSetoid(a);
  var rightSetoid = isSetoid(b);
  if (leftSetoid) {
    if (rightSetoid) return flEquals(a, b);else return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every(function (x, i) {
      return deepEquals(x, b[i]);
    });
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    var keysA = Object.keys(a);
    var keysB = Object.keys(b);
    var setB = new Set(keysB);
    return keysA.length === keysB.length && prototypeOf(a) === prototypeOf(b) && keysA.every(function (k) {
      return setB.has(k) && a[k] === b[k];
    });
  }

  return false;
};

// --[ Implementation ]------------------------------------------------
/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   (('a, 'a) => Boolean) => (Variant, Union) => Void
 */
var createDerivation = function createDerivation(valuesEqual) {
  /*~
   * type: ('a, 'a) => Boolean
   */
  var equals = function equals(a, b) {
    // identical objects must be equal
    if (a === b) return true;

    // we require both values to be setoids if one of them is
    var leftSetoid = isSetoid(a);
    var rightSetoid = isSetoid(b);
    if (leftSetoid) {
      if (rightSetoid) return flEquals(a, b);else return false;
    }

    // fall back to the provided equality
    return valuesEqual(a, b);
  };

  /*~
   * type: (Object Any, Object Any, Array String) => Boolean
   */
  var compositesEqual = function compositesEqual(a, b, keys) {
    for (var i = 0; i < keys.length; ++i) {
      var keyA = a[keys[i]];
      var keyB = b[keys[i]];
      if (!equals(keyA, keyB)) {
        return false;
      }
    }
    return true;
  };

  var derivation = function derivation(variant, adt) {
    /*~
     * stability: experimental
     * module: null
     * authors:
     *   - "@boris-marinov"
     *   - Quildreen Motta
     * 
     * type: |
     *   forall S, a:
     *     (S a).(S a) => Boolean
     *   where S is Setoid
     */
    variant.prototype.equals = function (value) {
      assertType(adt)(this[tagSymbol] + '#equals', value);
      return sameType(this, value) && compositesEqual(this, value, Object.keys(this));
    };
    provideAliases(variant.prototype);
    return variant;
  };
  copyDocs(createDerivation, derivation, {
    type: '(Variant, Union) => Void'
  });

  return derivation;
};

// --[ Exports ]-------------------------------------------------------

/*~~inheritsMeta: createDerivation */
module.exports = createDerivation(deepEquals);

module.exports.withCustomComparison = createDerivation;
},{"../../../fantasy-land/equals":54,"../../../helpers/assert-type":60,"../../../helpers/copy-documentation":61,"../../../helpers/fantasy-land":66,"../../../helpers/provide-fantasy-land-aliases":67,"../union":8}],5:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: experimental
 * name: module folktale/adt/union/derivations
 */
module.exports = {
  serialization: require('./serialization'),
  equality: require('./equality'),
  debugRepresentation: require('./debug-representation')
};
},{"./debug-representation":3,"./equality":4,"./serialization":6}],6:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]---------------------------------------------------
var _require = require('../union'),
    tagSymbol = _require.tagSymbol,
    typeSymbol = _require.typeSymbol;

var mapValues = require('../../../core/object/map-values');
var values = require('../../../core/object/values');
var extend = require('../../../helpers/extend');

// --[ Constants ]------------------------------------------------------
var typeJsonKey = '@@type';
var tagJsonKey = '@@tag';
var valueJsonKey = '@@value';

// --[ Helpers ]--------------------------------------------------------

/*~
 * type: ((Object 'a) => 'b) => ([Object 'a]) => Object 'b  
 */
var arrayToObject = function arrayToObject(extractKey) {
  return function (array) {
    return array.reduce(function (object, element) {
      object[extractKey(element)] = element;
      return object;
    }, {});
  };
};

/*~
 * type: (String) => (Object 'a) => 'a | None 
 */
var property = function property(propertyName) {
  return function (object) {
    return object[propertyName];
  };
};

/*~
 * type: ([Object 'a]) => Object 'a 
 */
var indexByType = arrayToObject(property(typeSymbol));

/*~
 * type: (String, String) => Bool
 */
var assertType = function assertType(given, expected) {
  if (expected !== given) {
    throw new TypeError('\n       The JSON structure was generated from ' + expected + '.\n       You are trying to parse it as ' + given + '. \n    ');
  }
};

/*~
 * type: |
 *   type JSONSerialisation = {
 *     "@@type":  String,
 *     "@@tag":   String,
 *     "@@value": Object Any
 *   }
 *   type JSONParser = {
 *     fromJSON: (JSONSerialisation, Array JSONParser) => Variant
 *   }
 * 
 *   (Object JSONParser) => (JSONSerialisation) => Any
 */
var parseValue = function parseValue(parsers) {
  return function (value) {
    if (value !== null && typeof value[typeJsonKey] === 'string') {
      var type = value[typeJsonKey];
      if (parsers[type]) {
        return parsers[type].fromJSON(value, parsers, true);
      } else {
        return value;
      }
    } else {
      return value;
    }
  };
};

/*~
 * type: ('a) => JSON
 */
var serializeValue = function serializeValue(value) {
  return value === undefined ? null : value !== null && typeof value.toJSON === 'function' ? value.toJSON() : /* otherwise */value;
};

// --[ Implementation ]-------------------------------------------------

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   (Variant, ADT) => Void 
 */
var serialization = function serialization(variant, adt) {
  var typeName = adt[typeSymbol];
  var tagName = variant.prototype[tagSymbol];

  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   type JSONSerialisation = {
   *     "@@type":  String,
   *     "@@tag":   String,
   *     "@@value": Object Any
   *   }
   * 
   *   Variant . () => JSONSerialisation
   */
  variant.prototype.toJSON = function () {
    var _ref;

    return _ref = {}, _defineProperty(_ref, typeJsonKey, typeName), _defineProperty(_ref, tagJsonKey, tagName), _defineProperty(_ref, valueJsonKey, mapValues(this, serializeValue)), _ref;
  };

  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   type JSONSerialisation = {
   *     "@@type":  String,
   *     "@@tag":   String,
   *     "@@value": Object Any
   *   }
   *   type JSONParser = {
   *     fromJSON: (JSONSerialisation, Array JSONParser) => Variant
   *   }
   * 
   *   (JSONSerialisation, Array JSONParser) => Variant
   */
  adt.fromJSON = function (value) {
    var parsers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defineProperty({}, typeName, adt);
    var keysIndicateType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var valueTypeName = value[typeJsonKey];
    var valueTagName = value[tagJsonKey];
    var valueContents = value[valueJsonKey];
    assertType(typeName, valueTypeName);
    var parsersByType = keysIndicateType ? parsers : /*otherwise*/indexByType(values(parsers));

    var parsedValue = mapValues(valueContents, parseValue(parsersByType));
    return extend(Object.create(adt[valueTagName].prototype), parsedValue);
  };
};

// --[ Exports ]--------------------------------------------------------
module.exports = serialization;
},{"../../../core/object/map-values":45,"../../../core/object/values":47,"../../../helpers/extend":65,"../union":8}],7:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: experimental
 * name: module folktale/adt/union
 */
module.exports = {
  union: require('./union'),
  derivations: require('./derivations')
};
},{"./derivations":5,"./union":8}],8:[function(require,module,exports){
'use strict';

function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]---------------------------------------------------
var warnDeprecation = require('../../helpers/warn-deprecation');
var extend = require('../../helpers/extend');

// --[ Constants and Aliases ]------------------------------------------
var TYPE = Symbol.for('@@folktale:adt:type');
var TAG = Symbol.for('@@folktale:adt:tag');
var META = Symbol.for('@@meta:magical');

var keys = Object.keys;

// --[ Helpers ]--------------------------------------------------------

//
// Returns an array of own enumerable values in an object.
//
function values(object) {
  return keys(object).map(function (key) {
    return object[key];
  });
}

//
// Transforms own enumerable key/value pairs.
//
function mapObject(object, transform) {
  return keys(object).reduce(function (result, key) {
    result[key] = transform(key, object[key]);
    return result;
  }, {});
}

// --[ Variant implementation ]-----------------------------------------

//
// Defines the variants given a set of patterns and an ADT namespace.
//
function defineVariants(typeId, patterns, adt) {
  return mapObject(patterns, function (name, constructor) {
    var _constructor, _ref, _extend, _mutatorMap, _tag, _type, _constructor2, _extend2, _mutatorMap2;

    // ---[ Variant Internals ]-----------------------------------------
    function InternalConstructor() {}
    InternalConstructor.prototype = Object.create(adt);

    extend(InternalConstructor.prototype, (_extend = {}, _defineProperty(_extend, TAG, name), _constructor = 'constructor', _mutatorMap = {}, _mutatorMap[_constructor] = _mutatorMap[_constructor] || {}, _mutatorMap[_constructor].get = function () {
      return constructor;
    }, _ref = 'is' + name, _mutatorMap[_ref] = _mutatorMap[_ref] || {}, _mutatorMap[_ref].get = function () {
      warnDeprecation('.is' + name + ' is deprecated. Use ' + name + '.hasInstance(value)\ninstead to check if a value belongs to the ADT variant.');
      return true;
    }, _defineProperty(_extend, 'matchWith', function matchWith(pattern) {
      return pattern[name](this);
    }), _defineEnumerableProperties(_extend, _mutatorMap), _extend));

    function makeInstance() {
      var result = new InternalConstructor(); // eslint-disable-line prefer-const
      extend(result, constructor.apply(undefined, arguments) || {});
      return result;
    }

    extend(makeInstance, (_extend2 = {}, _defineProperty(_extend2, META, constructor[META]), _tag = 'tag', _mutatorMap2 = {}, _mutatorMap2[_tag] = _mutatorMap2[_tag] || {}, _mutatorMap2[_tag].get = function () {
      return name;
    }, _type = 'type', _mutatorMap2[_type] = _mutatorMap2[_type] || {}, _mutatorMap2[_type].get = function () {
      return typeId;
    }, _constructor2 = 'constructor', _mutatorMap2[_constructor2] = _mutatorMap2[_constructor2] || {}, _mutatorMap2[_constructor2].get = function () {
      return constructor;
    }, _defineProperty(_extend2, 'prototype', InternalConstructor.prototype), _defineProperty(_extend2, 'hasInstance', function hasInstance(value) {
      return Boolean(value) && adt.hasInstance(value) && value[TAG] === name;
    }), _defineEnumerableProperties(_extend2, _mutatorMap2), _extend2));

    return makeInstance;
  });
}

// --[ ADT Implementation ]--------------------------------------------

/*~
 * authors:
 *   - Quildreen Motta
 * 
 * stability: experimental
 * type: |
 *   (String, Object (Array String)) => Union
 */
var union = function union(typeId, patterns) {
  var _extend3;

  var UnionNamespace = Object.create(Union);
  var variants = defineVariants(typeId, patterns, UnionNamespace);

  extend(UnionNamespace, variants, (_extend3 = {}, _defineProperty(_extend3, TYPE, typeId), _defineProperty(_extend3, 'variants', values(variants)), _defineProperty(_extend3, 'hasInstance', function hasInstance(value) {
    return Boolean(value) && value[TYPE] === this[TYPE];
  }), _extend3));

  return UnionNamespace;
};

/*~ ~belongsTo : union */
var Union = {
  /*~
   * type: |
   *   Union . (...(Variant, Union) => Any) => Union
   */
  derive: function derive() {
    var _this = this;

    for (var _len = arguments.length, derivations = Array(_len), _key = 0; _key < _len; _key++) {
      derivations[_key] = arguments[_key];
    }

    derivations.forEach(function (derivation) {
      _this.variants.forEach(function (variant) {
        return derivation(variant, _this);
      });
    });
    return this;
  }
};

// --[ Exports ]--------------------------------------------------------
union.Union = Union;
union.typeSymbol = TYPE;
union.tagSymbol = TAG;

module.exports = union;
},{"../../helpers/extend":65,"../../helpers/warn-deprecation":71}],9:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]--------------------------------------------------
var define = require('../../helpers/define');
var thunk = require('../../helpers/thunk');

var Future = thunk(function (_) {
  return require('./_future');
});

var _require = require('./_execution-state'),
    Pending = _require.Pending,
    Cancelled = _require.Cancelled,
    Rejected = _require.Rejected,
    Resolved = _require.Resolved;

// --[ Helpers ]-------------------------------------------------------

/*~
 * type: |
 *   ('a: Deferred 'f 's, ExecutionState 'f 's) => Void :: mutates 'a
 */


var moveToState = function moveToState(deferred, newState) {
  if (!Pending.hasInstance(deferred._state)) {
    var description = newState.matchWith({
      Resolved: function Resolved(_) {
        return 'resolved';
      },
      Rejected: function Rejected(_) {
        return 'rejected';
      },
      Cancelled: function Cancelled(_) {
        return 'cancelled';
      }
    });
    throw new Error('Only pending deferreds can be ' + description + ', this deferred is already ' + description + '.');
  }

  deferred._state = newState;

  var listeners = deferred._listeners;

  var _loop = function _loop(i) {
    newState.matchWith({
      Resolved: function Resolved(_ref) {
        var value = _ref.value;
        return listeners[i].onResolved(value);
      },
      Rejected: function Rejected(_ref2) {
        var reason = _ref2.reason;
        return listeners[i].onRejected(reason);
      },
      Cancelled: function Cancelled(_) {
        return listeners[i].onCancelled();
      }
    });
  };

  for (var i = 0; i < listeners.length; ++i) {
    _loop(i);
  }
  deferred._listeners = [];
};

// --[ Implementation ]------------------------------------------------
/*~
 * stability: experimental
 */
function Deferred() {
  define(this, '_state', Pending());
  define(this, '_listeners', []);
}

Deferred.prototype = _defineProperty({
  // ---[ State and configuration ]------------------------------------
  /*~
   * isRequired: true
   * type: |
   *   get (Deferred 'f 's) => ExecutionState 'f 's
   */
  get _state() {
    throw new TypeError('Deferred.prototype is abstract and does not implement ._state.');
  },

  /*~
   * isRequired: true
   * type: |
   *   get (Deferred 'f 's) => Array (DeferredListener 'f 's)
   */
  get _listeners() {
    throw new TypeError('Deferred.prototype is abstract and does not implement ._listeners');
  },

  // ---[ Resolving a deferred ]---------------------------------------
  /*~
   * type: |
   *   ('a: Deferred 'f 's).('s) => 'a :: mutates 'a
   */
  resolve: function resolve(value) {
    moveToState(this, Resolved(value));
    return this;
  },


  /*~
   * type: |
   *   ('a: Deferred 'f 's).('f) => 'a :: mutates 'a
   */
  reject: function reject(reason) {
    moveToState(this, Rejected(reason));
    return this;
  },


  /*~
   * type: |
   *   ('a: Deferred 'f 's).() => 'a :: mutates 'a
   */
  cancel: function cancel() {
    moveToState(this, Cancelled());
    return this;
  },


  /*~
   * type: |
   *   ('a: Deferred 'f 's).() => 'a :: mutates 'a
   */
  maybeCancel: function maybeCancel() {
    if (Pending.hasInstance(this._state)) {
      this.cancel();
    }
    return this;
  },


  // ---[ Reacting to events in a deferred ]---------------------------
  /*~
   * type: |
   *   ('a: Deferred 'f 's).(DeferredListener 'f 's) => Void
   */
  listen: function listen(pattern) {
    var _this = this;

    this._state.matchWith({
      Pending: function Pending(_) {
        return _this._listeners.push(pattern);
      },
      Cancelled: function Cancelled(_) {
        return pattern.onCancelled();
      },
      Resolved: function Resolved(_ref3) {
        var value = _ref3.value;
        return pattern.onResolved(value);
      },
      Rejected: function Rejected(_ref4) {
        var reason = _ref4.reason;
        return pattern.onRejected(reason);
      }
    });
    return this;
  },


  // ---[ Working with deferred values ]-------------------------------
  /*~
   * type: |
   *   (Deferred 'f 's).() => Promise 'f 's
   */
  promise: function promise() {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      _this2.listen({
        onCancelled: function onCancelled(_) {
          return reject(Cancelled());
        },
        onResolved: resolve,
        onRejected: reject
      });
    });
  },


  /*~
   * type: |
   *   (Deferred 'f 's).() => Future 'f 's
   */
  future: function future() {
    var future = new (Future())(); // eslint-disable-line prefer-const
    this.listen({
      onCancelled: function onCancelled(_) {
        return moveToState(future, Cancelled());
      },
      onRejected: function onRejected(reason) {
        return moveToState(future, Rejected(reason));
      },
      onResolved: function onResolved(value) {
        return moveToState(future, Resolved(value));
      }
    });

    return future;
  },


  // ---[ Debugging ]--------------------------------------------------
  /*~
   * type: |
   *   (Deferred 'f 's).() => String
   */
  toString: function toString() {
    var listeners = this._listeners.length;
    var state = this._state;

    return 'folktale:Deferred(' + state + ', ' + listeners + ' listeners)';
  },


  /*~
   * type: |
   *   (Deferred 'f 's).() => String
   */
  inspect: function inspect() {
    return this.toString();
  }
}, Symbol.toStringTag, 'folktale:Deferred');

// --[ Exports ]-------------------------------------------------------
module.exports = Deferred;
},{"../../helpers/define":64,"../../helpers/thunk":68,"./_execution-state":10,"./_future":11}],10:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]--------------------------------------------------
var _require = require('../../adt/union'),
    union = _require.union,
    derivations = _require.derivations;

var equality = derivations.equality,
    debugRepresentation = derivations.debugRepresentation;

// --[ Implementation ]------------------------------------------------

/*~ stability: experimental */

var ExecutionState = union('folktale:ExecutionState', {
  /*~
   */
  Pending: function Pending() {
    return {};
  },


  /*~
   */
  Cancelled: function Cancelled() {
    return {};
  },


  /*~
   */
  Resolved: function Resolved(value) {
    return { value: value };
  },


  /*~
   */
  Rejected: function Rejected(reason) {
    return { reason: reason };
  }
}).derive(equality, debugRepresentation);

// --[ Exports ]-------------------------------------------------------
module.exports = ExecutionState;
},{"../../adt/union":7}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]--------------------------------------------------
var define = require('../../helpers/define');
var provideAliases = require('../../helpers/provide-fantasy-land-aliases');
var Deferred = require('./_deferred');

var _require = require('./_execution-state'),
    Pending = _require.Pending,
    Resolved = _require.Resolved,
    Rejected = _require.Rejected;

var warnDeprecation = require('../../helpers/warn-deprecation');

// --[ Implementation ]------------------------------------------------

/*~
 * stability: experimental
 */

var Future = function () {
  function Future() {
    _classCallCheck(this, Future);

    define(this, '_state', Pending());
    define(this, '_listeners', []);
  }

  // ---[ State and configuration ]------------------------------------
  /*~
   * isRequired: true
   * type: |
   *   get (Future 'f 's) => ExecutionState 'f 's
   */


  _createClass(Future, [{
    key: 'listen',


    // ---[ Reacting to Future events ]----------------------------------
    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(DeferredListener 'f 's) => Future 'f 's
     */
    value: function listen(pattern) {
      var _this = this;

      this._state.matchWith({
        Pending: function Pending() {
          return _this._listeners.push(pattern);
        },
        Cancelled: function Cancelled() {
          return pattern.onCancelled();
        },
        Resolved: function Resolved(_ref) {
          var value = _ref.value;
          return pattern.onResolved(value);
        },
        Rejected: function Rejected(_ref2) {
          var reason = _ref2.reason;
          return pattern.onRejected(reason);
        }
      });
      return this;
    }

    // --[ Transforming Futures ]----------------------------------------
    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(('s) => Future 's2) => Future 'f 's2
     */

  }, {
    key: 'chain',
    value: function chain(transformation) {
      var deferred = new Deferred(); // eslint-disable-line prefer-const
      this.listen({
        onCancelled: function onCancelled() {
          return deferred.cancel();
        },
        onRejected: function onRejected(reason) {
          return deferred.reject(reason);
        },
        onResolved: function onResolved(value) {
          transformation(value).listen({
            onCancelled: function onCancelled() {
              return deferred.cancel();
            },
            onRejected: function onRejected(reason) {
              return deferred.reject(reason);
            },
            onResolved: function onResolved(value2) {
              return deferred.resolve(value2);
            }
          });
        }
      });

      return deferred.future();
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(('s) => 's2) => Future 'f 's2
     */

  }, {
    key: 'map',
    value: function map(transformation) {
      return this.chain(function (value) {
        return Future.of(transformation(value));
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(Future 'f (('s) => 's2)) => Future 'f 's2
     */

  }, {
    key: 'apply',
    value: function apply(future) {
      return this.chain(function (fn) {
        return future.map(fn);
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(('f) => 'f2, ('s) => 's2) => Future 'f2 's2
     */

  }, {
    key: 'bimap',
    value: function bimap(rejectionTransformation, successTransformation) {
      var deferred = new Deferred(); // eslint-disable-line prefer-const
      this.listen({
        onCancelled: function onCancelled() {
          return deferred.cancel();
        },
        onRejected: function onRejected(reason) {
          return deferred.reject(rejectionTransformation(reason));
        },
        onResolved: function onResolved(value) {
          return deferred.resolve(successTransformation(value));
        }
      });

      return deferred.future();
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(('f) => 'f2) => Future 'f2 's
     */

  }, {
    key: 'mapRejected',
    value: function mapRejected(transformation) {
      return this.bimap(transformation, function (x) {
        return x;
      });
    }

    // ---[ Recovering from errors ]-------------------------------------
    /*~
     * deprecated:
     *   since: 2.1.0
     *   replacedBy: .orElse(handler)
     * 
     * type: |
     *   (Future 'f 's).(('f) => Future 'f2 's2) => Future 'f2 's
     */

  }, {
    key: 'recover',
    value: function recover(handler) {
      warnDeprecation('`.recover` was renamed to `.orElse` for consistency, and thus `.recover(handler)` is deprecated. Use `.orElse(handler)` instead.');
      return this.orElse(handler);
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(('f) => Future 'f2 's2) => Future 'f2 's
     */

  }, {
    key: 'orElse',
    value: function orElse(handler) {
      var deferred = new Deferred(); // eslint-disable-line prefer-const
      this.listen({
        onCancelled: function onCancelled() {
          return deferred.cancel();
        },
        onResolved: function onResolved(value) {
          return deferred.resolve(value);
        },
        onRejected: function onRejected(reason) {
          handler(reason).listen({
            onCancelled: function onCancelled() {
              return deferred.cancel();
            },
            onResolved: function onResolved(value) {
              return deferred.resolve(value);
            },
            onRejected: function onRejected(newReason) {
              return deferred.reject(newReason);
            }
          });
        }
      });

      return deferred.future();
    }

    /*~
     * stability: experimental
     * type: |
     *   forall a, b, c, d:
     *     type Pattern = { r |
     *       Cancelled: ()  => Future c d,
     *       Resolved:  (b) => Future c d,
     *       Rejected:  (a) => Future c d
     *     }
     *     
     *     (Future a b).(Pattern) => Future c d 
     */

  }, {
    key: 'willMatchWith',
    value: function willMatchWith(pattern) {
      var deferred = new Deferred(); // eslint-disable-line prefer-const
      var resolve = function resolve(handler) {
        return function (value) {
          return handler(value).listen({
            onCancelled: function onCancelled() {
              return deferred.cancel();
            },
            onResolved: function onResolved(newValue) {
              return deferred.resolve(newValue);
            },
            onRejected: function onRejected(reason) {
              return deferred.reject(reason);
            }
          });
        };
      };
      this.listen({
        onCancelled: resolve(pattern.Cancelled),
        onResolved: resolve(pattern.Resolved),
        onRejected: resolve(pattern.Rejected)
      });

      return deferred.future();
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).() => Future 's 'f
     */

  }, {
    key: 'swap',
    value: function swap() {
      var deferred = new Deferred(); // eslint-disable-line prefer-const
      this.listen({
        onCancelled: function onCancelled() {
          return deferred.cancel();
        },
        onRejected: function onRejected(reason) {
          return deferred.resolve(reason);
        },
        onResolved: function onResolved(value) {
          return deferred.reject(value);
        }
      });

      return deferred.future();
    }

    // ---[ Debugging ]--------------------------------------------------
    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).() => String
     */

  }, {
    key: 'toString',
    value: function toString() {
      var listeners = this._listeners.length;
      var state = this._state;

      return 'folktale:Future(' + state + ', ' + listeners + ' listeners)';
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).() => String
     */

  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v:
     *     (Future e v).() => Promise v e
     */

  }, {
    key: 'toPromise',
    value: function toPromise() {
      return require('../../conversions/future-to-promise')(this);
    }
  }, {
    key: '_state',
    get: function get() {
      throw new TypeError('Future.prototype._state should be implemented in an inherited object.');
    }

    /*~
     * isRequired: true
     * type: |
     *   get (Future 'f 's) => Array (DeferredListener 'f 's)
     */

  }, {
    key: '_listeners',
    get: function get() {
      throw new TypeError('Future.prototype._listeners should be implemented in an inherited object.');
    }
  }]);

  return Future;
}();

// ---[ Constructing futures ]-----------------------------------------


Object.assign(Future, {
  /*~
   * stability: experimental
   * type: |
   *   forall a, b:
   *     (Future).(b) => Future a b
   */
  of: function of(value) {
    var result = new Future(); // eslint-disable-line prefer-const
    result._state = Resolved(value);
    return result;
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Future).(a) => Future a b
   */
  rejected: function rejected(reason) {
    var result = new Future(); // eslint-disable-line prefer-const
    result._state = Rejected(reason);
    return result;
  },


  /*~
   * stability: experimental
   * type: |
   *   forall e, v: (Promise v e) => Future e v
   */
  fromPromise: function fromPromise(aPromise) {
    return require('../../conversions/promise-to-future')(aPromise);
  }
});

provideAliases(Future);
provideAliases(Future.prototype);

// --[ Exports ]-------------------------------------------------------
module.exports = Future;
},{"../../conversions/future-to-promise":21,"../../conversions/promise-to-future":29,"../../helpers/define":64,"../../helpers/provide-fantasy-land-aliases":67,"../../helpers/warn-deprecation":71,"./_deferred":9,"./_execution-state":10}],12:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Future = require('./_future');

/*~
 * stability: experimental
 * name: module folktale/concurrency/future
 */
module.exports = {
  of: Future.of,
  rejected: Future.rejected,
  fromPromise: Future.fromPromise,
  _Deferred: require('./_deferred'),
  _ExecutionState: require('./_execution-state'),
  _Future: Future
};
},{"./_deferred":9,"./_execution-state":10,"./_future":11}],13:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


/*~
 * stability: experimental
 * name: module folktale/concurrency
 */
module.exports = {
  future: require('./future'),
  task: require('./task')
};
},{"./future":12,"./task":17}],14:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~ stability: experimental */
var TaskExecution = function () {
  /*~*/
  function TaskExecution(task, deferred) {
    _classCallCheck(this, TaskExecution);

    this._task = task;
    this._deferred = deferred;
  }

  /*~*/


  _createClass(TaskExecution, [{
    key: "cancel",
    value: function cancel() {
      this._deferred.maybeCancel();
      return this;
    }

    /*~*/

  }, {
    key: "listen",
    value: function listen(pattern) {
      this._deferred.listen(pattern);
      return this;
    }

    /*~*/

  }, {
    key: "promise",
    value: function promise() {
      return this._deferred.promise();
    }

    /*~*/

  }, {
    key: "future",
    value: function future() {
      return this._deferred.future();
    }
  }]);

  return TaskExecution;
}();

module.exports = TaskExecution;
},{}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var provideAliases = require('../../helpers/provide-fantasy-land-aliases');
var defer = require('../../helpers/defer');
var Deferred = require('../future/_deferred');
var TaskExecution = require('./_task-execution');

var noop = function noop() {};

/*~ stability: experimental */

var Task = function () {
  /*~
   * stability: experimental
   * type: |
   *   forall value, reason:
   *     new (
   *       ({
   *          resolve: (value) => Void,
   *          reject: (reason) => Void,
   *          cancel: () => Void,
   *          cleanup: (() => Void) => Void,
   *          onCancelled: (() => Void) => Void,
   *          get isCancelled: Boolean
   *        }) => Void
   *     ) => Task value reason
   */
  function Task(computation) {
    _classCallCheck(this, Task);

    this._computation = computation;
  }

  /*~
   * stability: experimental
   * type: |
   *   forall e, v1, v2:
   *     (Task e v1).((v1) => Task e v2) => Task e v2
   */


  _createClass(Task, [{
    key: 'chain',
    value: function chain(transformation) {
      var _this = this;

      return new Task(function (resolver) {
        var execution = _this.run();
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        execution.listen({
          onCancelled: resolver.cancel,
          onRejected: resolver.reject,
          onResolved: function onResolved(value) {
            transformation(value).run().listen({
              onCancelled: resolver.cancel,
              onRejected: resolver.reject,
              onResolved: resolver.resolve
            });
          }
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v1, v2:
     *     (Task e v1).((v1) => v2) => Task e v2
     */

  }, {
    key: 'map',
    value: function map(transformation) {
      var _this2 = this;

      return new Task(function (resolver) {
        var execution = _this2.run();
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        execution.listen({
          onCancelled: resolver.cancel,
          onRejected: resolver.reject,
          onResolved: function onResolved(value) {
            return resolver.resolve(transformation(value));
          }
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e1, e2, v:
     *     (Task e1 v).((e1) => e2) => Task e2 v
     */

  }, {
    key: 'mapRejected',
    value: function mapRejected(transformation) {
      var _this3 = this;

      return new Task(function (resolver) {
        var execution = _this3.run();
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        execution.listen({
          onCancelled: resolver.cancel,
          onRejected: function onRejected(reason) {
            return resolver.reject(transformation(reason));
          },
          onResolved: resolver.resolve
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v1, v2:
     *     (Task e ((v1) => v2)).(Task e v1) => Task e v2
     */

  }, {
    key: 'apply',
    value: function apply(task) {
      return this.chain(function (f) {
        return task.map(f);
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e1, e2, v1, v2:
     *     (Task e1 v1).((e1) => e2, (v1) => v2) => Task e2 v2
     */

  }, {
    key: 'bimap',
    value: function bimap(rejectionTransformation, successTransformation) {
      var _this4 = this;

      return new Task(function (resolver) {
        var execution = _this4.run();
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        execution.listen({
          onCancelled: resolver.cancel,
          onRejected: function onRejected(reason) {
            return resolver.reject(rejectionTransformation(reason));
          },
          onResolved: function onResolved(value) {
            return resolver.resolve(successTransformation(value));
          }
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e1, e2, v1, v2:
     *     type Pattern = { row |
     *       Cancelled: ()  => Task e2 v2,
     *       Resolved:  (b) => Task e2 v2,
     *       Rejected:  (a) => Task e2 v2
     *     }
     *
     *     (Task e1 v1).(Pattern) => Task e2 v2
     */

  }, {
    key: 'willMatchWith',
    value: function willMatchWith(pattern) {
      var _this5 = this;

      return new Task(function (resolver) {
        var execution = _this5.run();
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        var resolve = function resolve(handler) {
          return function (value) {
            return handler(value).run().listen({
              onCancelled: resolver.cancel,
              onRejected: resolver.reject,
              onResolved: resolver.resolve
            });
          };
        };
        execution.listen({
          onCancelled: resolve(function (_) {
            return pattern.Cancelled();
          }),
          onRejected: resolve(pattern.Rejected),
          onResolved: resolve(pattern.Resolved)
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v: (Task e v).() => Task v e
     */

  }, {
    key: 'swap',
    value: function swap() {
      var _this6 = this;

      return new Task(function (resolver) {
        var execution = _this6.run(); // eslint-disable-line prefer-const
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        execution.listen({
          onCancelled: resolver.cancel,
          onRejected: resolver.resolve,
          onResolved: resolver.reject
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, e2, v:
     *     (Task e v).((e) => Task e2 v) => Task e2 v
     */

  }, {
    key: 'orElse',
    value: function orElse(handler) {
      var _this7 = this;

      return new Task(function (resolver) {
        var execution = _this7.run();
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        execution.listen({
          onCancelled: resolver.cancel,
          onResolved: resolver.resolve,
          onRejected: function onRejected(reason) {
            handler(reason).run().listen({
              onCancelled: resolver.cancel,
              onRejected: resolver.reject,
              onResolved: resolver.resolve
            });
          }
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v:
     *     (Task e v).(Task e v) => Task e v
     */

  }, {
    key: 'or',
    value: function or(that) {
      var _this8 = this;

      return new Task(function (resolver) {
        var thisExecution = _this8.run(); // eslint-disable-line prefer-const
        var thatExecution = that.run(); // eslint-disable-line prefer-const
        var done = false;

        resolver.onCancelled(function () {
          thisExecution.cancel();
          thatExecution.cancel();
        });

        var guard = function guard(fn, execution) {
          return function (value) {
            if (!done) {
              done = true;
              execution.cancel();
              fn(value);
            }
          };
        };

        thisExecution.listen({
          onRejected: guard(resolver.reject, thatExecution),
          onCancelled: guard(resolver.cancel, thatExecution),
          onResolved: guard(resolver.resolve, thatExecution)
        });

        thatExecution.listen({
          onRejected: guard(resolver.reject, thisExecution),
          onCancelled: guard(resolver.cancel, thisExecution),
          onResolved: guard(resolver.resolve, thisExecution)
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v1, v2:
     *     (Task e v1).(Task e v2) => Task e (v1, v2)
     */

  }, {
    key: 'and',
    value: function and(that) {
      var _this9 = this;

      return new Task(function (resolver) {
        // eslint-disable-line max-statements
        var thisExecution = _this9.run(); // eslint-disable-line prefer-const
        var thatExecution = that.run(); // eslint-disable-line prefer-const
        var valueLeft = null;
        var valueRight = null;
        var doneLeft = false;
        var doneRight = false;
        var cancelled = false;

        resolver.onCancelled(function () {
          thisExecution.cancel();
          thatExecution.cancel();
        });

        var guardResolve = function guardResolve(setter) {
          return function (value) {
            if (cancelled) return;

            setter(value);
            if (doneLeft && doneRight) {
              resolver.resolve([valueLeft, valueRight]);
            }
          };
        };

        var guardRejection = function guardRejection(fn, execution) {
          return function (value) {
            if (cancelled) return;

            cancelled = true;
            execution.cancel();
            fn(value);
          };
        };

        thisExecution.listen({
          onRejected: guardRejection(resolver.reject, thatExecution),
          onCancelled: guardRejection(resolver.cancel, thatExecution),
          onResolved: guardResolve(function (x) {
            valueLeft = x;
            doneLeft = true;
          })
        });

        thatExecution.listen({
          onRejected: guardRejection(resolver.reject, thisExecution),
          onCancelled: guardRejection(resolver.cancel, thisExecution),
          onResolved: guardResolve(function (x) {
            valueRight = x;
            doneRight = true;
          })
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v: (Task e v).() => TaskExecution e v
     */

  }, {
    key: 'run',
    value: function run() {
      var deferred = new Deferred(); // eslint-disable-line prefer-const
      var cleanups = [];
      var cancellations = [];
      var isCancelled = false;
      var done = false;

      deferred.listen({
        onCancelled: function onCancelled(_) {
          done = true;
          isCancelled = true;
          cancellations.forEach(function (f) {
            return f();
          });
          cleanups.forEach(function (f) {
            return f();
          });
          cancellations = [];
          cleanups = [];
        },

        onResolved: function onResolved(_value) {
          done = true;
          cleanups.forEach(function (f) {
            return f();
          });
          cleanups = [];
          cancellations = [];
        },

        onRejected: function onRejected(_reason) {
          done = true;
          cleanups.forEach(function (f) {
            return f();
          });
          cleanups = [];
          cancellations = [];
        }
      });

      var resources = this._computation({
        reject: function reject(error) {
          deferred.reject(error);
        },
        resolve: function resolve(value) {
          deferred.resolve(value);
        },
        cancel: function cancel(_) {
          deferred.maybeCancel();
        },

        get isCancelled() {
          return isCancelled;
        },
        cleanup: function cleanup(f) {
          if (done) {
            throw new Error('Can\'t attach a cleanup handler after the task is settled.');
          }
          cleanups.push(f);
        },
        onCancelled: function onCancelled(f) {
          if (done) {
            throw new Error('Can\'t attach a cancellation handler after the task is settled.');
          }
          cancellations.push(f);
        }
      });

      return new TaskExecution(this, deferred);
    }
  }]);

  return Task;
}();

Object.assign(Task, {
  /*~
   * stability: experimental
   * type: |
   *   forall e, v: (v) => Task e v
   */
  of: function of(value) {
    return new Task(function (resolver) {
      return resolver.resolve(value);
    });
  },


  /*~
   * stability: experimental
   * type: |
   *   forall e, v: (e) => Task e v
   */
  rejected: function rejected(reason) {
    return new Task(function (resolver) {
      return resolver.reject(reason);
    });
  }
});

provideAliases(Task);
provideAliases(Task.prototype);

module.exports = Task;
},{"../../helpers/defer":62,"../../helpers/provide-fantasy-land-aliases":67,"../future/_deferred":9,"./_task-execution":14}],16:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Task = require('./_task');

/*~
 * stability: experimental
 * type: |
 *   forall v, e: (GeneratorInstance [Task e v Any]) => Any => Task e [v] Any
 */
var nextGeneratorValue = function nextGeneratorValue(generator) {
  return function (value) {
    var _generator$next = generator.next(value),
        task = _generator$next.value,
        done = _generator$next.done;

    return !done ? task.chain(nextGeneratorValue(generator)
    /* else */) : task;
  };
};

/*~
 * stability: experimental
 * type: |
 *   forall v, e: (Generator [Task e v Any]) => Task e [v] Any
 */
var taskDo = function taskDo(generatorFn) {
  return new Task(function (resolver) {
    return resolver.resolve(generatorFn());
  }).chain(function (generator) {
    return nextGeneratorValue(generator)();
  });
};

module.exports = taskDo;
},{"./_task":15}],17:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Task = require('./_task');

/*~ 
 * stability: experimental 
 * name: module folktale/concurrency/task
 */
module.exports = {
  of: Task.of,
  rejected: Task.rejected,
  task: require('./task'),
  waitAny: require('./wait-any'),
  waitAll: require('./wait-all'),
  do: require('./do'),
  _Task: Task,
  _TaskExecution: require('./_task-execution'),

  /*~
   * stability: experimental
   * type: |
   *    forall s, e:
   *      ((Any..., (e, s) => Void) => Void)
   *      => (Any...)
   *      => Task e s
   */
  fromNodeback: function fromNodeback(aNodeback) {
    return require('../../conversions/nodeback-to-task')(aNodeback);
  },


  /*~
   * stability: experimental
   * type: |
   *   forall e, v:
   *     ((Any...) => Promise v e) => (Any...) => Task e v
   */
  fromPromised: function fromPromised(aPromiseFn) {
    return require('../../conversions/promised-to-task')(aPromiseFn);
  }
};
},{"../../conversions/nodeback-to-task":25,"../../conversions/promised-to-task":30,"./_task":15,"./_task-execution":14,"./do":16,"./task":18,"./wait-all":19,"./wait-any":20}],18:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Task = require('./_task');

var noop = function noop() {};

/*~
 * stability: experimental
 * type: |
 *   forall value, reason:
 *     (
 *       ({
 *          resolve: (value) => Void,
 *          reject: (reason) => Void,
 *          cancel: () => Void,
 *          cleanup: (() => Void) => Void,
 *          onCancelled: (() => Void) => Void,
 *          get isCancelled: Boolean
 *        }) => Void
 *     ) => Task reason value
 */
var task = function task(computation) {
  return new Task(computation);
};

module.exports = task;
},{"./_task":15}],19:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('./_task'),
    of = _require.of;

/*~
 * stability: experimental
 * type: |
 *   forall v, e: ([Task e v Any]) => Task e [v] Any
 */


var waitAll = function waitAll(tasks) {
  return tasks.reduce(function (a, b) {
    return a.and(b).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          xs = _ref2[0],
          x = _ref2[1];

      return [].concat(_toConsumableArray(xs), [x]);
    });
  }, of([]));
};

module.exports = waitAll;
},{"./_task":15}],20:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


/*~
 * stability: experimental
 * type: |
 *   forall v, e: ([Task e v Any]) => Task e v Any
 */
var waitAny = function waitAny(tasks) {
  if (tasks.length === 0) {
    throw new Error('Task.waitAny() requires a non-empty array of tasks.');
  }

  return tasks.reduce(function (a, b) {
    return a.or(b);
  });
};

module.exports = waitAny;
},{}],21:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../concurrency/future/_execution-state'),
    Cancelled = _require.Cancelled;

/*~
 * stability: experimental
 * type: |
 *   forall e, v:
 *     (Future e v) => Promise v e
 */


var futureToPromise = function futureToPromise(aFuture) {
  return new Promise(function (resolve, reject) {
    aFuture.listen({
      onResolved: function onResolved(value) {
        return resolve(value);
      },
      onRejected: function onRejected(error) {
        return reject(error);
      },
      onCancelled: function onCancelled() {
        return reject(Cancelled());
      }
    });
  });
};

module.exports = futureToPromise;
},{"../concurrency/future/_execution-state":10}],22:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: stable
 * name: module folktale/conversions
 */
module.exports = {
  resultToValidation: require('./result-to-validation'),
  resultToMaybe: require('./result-to-maybe'),
  validationToResult: require('./validation-to-result'),
  validationToMaybe: require('./validation-to-maybe'),
  maybeToValidation: require('./maybe-to-validation'),
  maybeToResult: require('./maybe-to-result'),
  nullableToValidation: require('./nullable-to-validation'),
  nullableToResult: require('./nullable-to-result'),
  nullableToMaybe: require('./nullable-to-maybe'),
  nodebackToTask: require('./nodeback-to-task'),
  futureToPromise: require('./future-to-promise'),
  promiseToFuture: require('./promise-to-future'),
  promisedToTask: require('./promised-to-task')
};
},{"./future-to-promise":21,"./maybe-to-result":23,"./maybe-to-validation":24,"./nodeback-to-task":25,"./nullable-to-maybe":26,"./nullable-to-result":27,"./nullable-to-validation":28,"./promise-to-future":29,"./promised-to-task":30,"./result-to-maybe":31,"./result-to-validation":32,"./validation-to-maybe":33,"./validation-to-result":34}],23:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../result/result'),
    Error = _require.Error,
    Ok = _require.Ok;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Maybe a, b) => Result b a
 */


var maybeToResult = function maybeToResult(aMaybe, failureValue) {
  return aMaybe.matchWith({
    Nothing: function Nothing() {
      return Error(failureValue);
    },
    Just: function Just(_ref) {
      var value = _ref.value;
      return Ok(value);
    }
  });
};

module.exports = maybeToResult;
},{"../result/result":76}],24:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../validation/validation'),
    Success = _require.Success,
    Failure = _require.Failure;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Maybe a, b) => Validation b a
 */


var maybeToValidation = function maybeToValidation(aMaybe, failureValue) {
  return aMaybe.matchWith({
    Nothing: function Nothing() {
      return Failure(failureValue);
    },
    Just: function Just(_ref) {
      var value = _ref.value;
      return Success(value);
    }
  });
};

module.exports = maybeToValidation;
},{"../validation/validation":80}],25:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../concurrency/task'),
    task = _require.task;

/*~
 * stability: experimental
 * authors:
 *   - "@rpearce"
 * type: |
 *    forall s, e, r:
 *    ((Any..., (e, s) => Void) => Void)
 *    => (Any...)
 *    => Task e s r
 */

var nodebackToTask = function nodebackToTask(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return task(function (r) {
      return fn.apply(undefined, args.concat([function (err, data) {
        return err ? r.reject(err) : r.resolve(data);
      }]));
    });
  };
};

module.exports = nodebackToTask;
},{"../concurrency/task":17}],26:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../maybe/maybe'),
    Nothing = _require.Nothing,
    Just = _require.Just;

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall a:
 *     (a or None) => Maybe a
 */


var nullableToMaybe = function nullableToMaybe(a) {
  return a != null ? Just(a) : /*else*/Nothing();
};

module.exports = nullableToMaybe;
},{"../maybe/maybe":74}],27:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../result/result'),
    Error = _require.Error,
    Ok = _require.Ok;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a:
 *     (a or None) => Result None a
 */


var nullableToResult = function nullableToResult(a) {
  return a != null ? Ok(a) : /*else*/Error(a);
};

module.exports = nullableToResult;
},{"../result/result":76}],28:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../validation/validation'),
    Success = _require.Success,
    Failure = _require.Failure;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (a or None, b) => Validation b a
 */


var nullableToValidation = function nullableToValidation(a, fallbackValue) {
  return a != null ? Success(a) : /*else*/Failure(fallbackValue);
};

module.exports = nullableToValidation;
},{"../validation/validation":80}],29:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../concurrency/future/_execution-state'),
    Cancelled = _require.Cancelled;

var Deferred = require('../concurrency/future/_deferred');

/*~
 * stability: experimental
 * type: |
 *   forall e, v:
 *     (Promise v e) => Future e v
 */
var promiseToFuture = function promiseToFuture(aPromise) {
  var deferred = new Deferred();
  aPromise.then(function (value) {
    return deferred.resolve(value);
  }, function (error) {
    if (Cancelled.hasInstance(error)) {
      deferred.cancel();
    } else {
      deferred.reject(error);
    }
  });
  return deferred.future();
};

module.exports = promiseToFuture;
},{"../concurrency/future/_deferred":9,"../concurrency/future/_execution-state":10}],30:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../concurrency/task'),
    task = _require.task;

/*~
 * stability: experimental
 * type: |
 *   forall e, v, r:
 *     ((Any...) => Promise v e) => (Any...) => Task e v r
 */


var promisedToTask = function promisedToTask(aPromiseFn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return task(function (resolver) {
      aPromiseFn.apply(undefined, args).then(function (value) {
        return resolver.resolve(value);
      }, function (error) {
        return resolver.reject(error);
      });
    });
  };
};

module.exports = promisedToTask;
},{"../concurrency/task":17}],31:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../maybe/maybe'),
    Just = _require.Just,
    Nothing = _require.Nothing;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 *
 * type: |
 *   forall a, b:
 *     (Result a b) => Maybe b
 */


var resultToMaybe = function resultToMaybe(aResult) {
  return aResult.matchWith({
    Error: function Error(_ref) {
      var _ = _ref.value;
      return Nothing();
    },
    Ok: function Ok(_ref2) {
      var value = _ref2.value;
      return Just(value);
    }
  });
};

module.exports = resultToMaybe;
},{"../maybe/maybe":74}],32:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../validation/validation'),
    Success = _require.Success,
    Failure = _require.Failure;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Result a b) => Validation a b
 */


var resultToValidation = function resultToValidation(aResult) {
  return aResult.matchWith({
    Error: function Error(_ref) {
      var value = _ref.value;
      return Failure(value);
    },
    Ok: function Ok(_ref2) {
      var value = _ref2.value;
      return Success(value);
    }
  });
};

module.exports = resultToValidation;
},{"../validation/validation":80}],33:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../maybe/maybe'),
    Just = _require.Just,
    Nothing = _require.Nothing;

/*~
 * stability: stable
 * authors: 
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Validation a b) => Maybe b
 */


var validationToMaybe = function validationToMaybe(aValidation) {
  return aValidation.matchWith({
    Failure: function Failure() {
      return Nothing();
    },
    Success: function Success(_ref) {
      var value = _ref.value;
      return Just(value);
    }
  });
};

module.exports = validationToMaybe;
},{"../maybe/maybe":74}],34:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../result/result'),
    Error = _require.Error,
    Ok = _require.Ok;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *      (Validation a b) => Result a b
 */


var validationToResult = function validationToResult(aValidation) {
  return aValidation.matchWith({
    Failure: function Failure(_ref) {
      var value = _ref.value;
      return Error(value);
    },
    Success: function Success(_ref2) {
      var value = _ref2.value;
      return Ok(value);
    }
  });
};

module.exports = validationToResult;
},{"../result/result":76}],35:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: stable
 * name: module folktale/core
 */
module.exports = {
  lambda: require('./lambda'),
  object: require('./object')
};
},{"./lambda":40,"./object":43}],36:[function(require,module,exports){
"use strict";

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * signature: compose(f, g)(value)
 * type: |
 *   (('b) => 'c, ('a) => 'b) => (('a) => 'c)
 */
var compose = function compose(f, g) {
  return function (value) {
    return f(g(value));
  };
};

// --[ Convenience ]---------------------------------------------------

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * type: |
 *   (('b) => 'c) . (('a) => 'b) => (('a) => 'c)
 */
compose.infix = function (that) {
  return compose(that, this);
};

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * type: |
 *   (Function...) -> Function
 */
compose.all = function () {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  /* eslint-disable no-magic-numbers */
  if (fns.length < 1) {
    // eslint-disable-next-line prefer-rest-params
    throw new TypeError("compose.all requires at least one argument, " + arguments.length + " given.");
  }
  return fns.reduce(compose);
}; /* eslint-enable no-magic-numbers */

// --[ Exports ]-------------------------------------------------------
module.exports = compose;
},{}],37:[function(require,module,exports){
"use strict";

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * type: |
 *   ('a) => ('b) => 'a
 */
var constant = function constant(value) {
  return function (_) {
    return value;
  };
};

// --[ Exports ]-------------------------------------------------------
module.exports = constant;
},{}],38:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 *
 * type: |
 *   (Number, (Any...) => 'a) => Any... => 'a or ((Any...) => 'a)
 */
var curry = function curry(arity, fn) {
  var curried = function curried(oldArgs) {
    return function () {
      for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) {
        newArgs[_key] = arguments[_key];
      }

      var allArgs = oldArgs.concat(newArgs);
      var argCount = allArgs.length;

      return argCount < arity ? curried(allArgs) : /* otherwise */fn.apply(undefined, _toConsumableArray(allArgs));
    };
  };

  return curried([]);
};

// --[ Exports ]-------------------------------------------------------
module.exports = curry;
},{}],39:[function(require,module,exports){
"use strict";

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * type: |
 *   ('a) => 'a
 */
var identity = function identity(value) {
  return value;
};

// --[ Exports ]-------------------------------------------------------
module.exports = identity;
},{}],40:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: stable
 * name: module folktale/core/lambda
 */
module.exports = {
  identity: require('./identity'),
  constant: require('./constant'),
  curry: require('./curry'),
  compose: require('./compose'),
  partialize: require('./partialize')
};
},{"./compose":36,"./constant":37,"./curry":38,"./identity":39,"./partialize":41}],41:[function(require,module,exports){
"use strict";

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var hole = {};

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 *
 * type: |
 *   (Number, (Any... => Any)) => ((hole | Any)...) => Any :: (throw TypeError)
 */
var partialize = function partialize(arity, fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    //  eslint-disable-line max-statements
    /* eslint-disable no-magic-numbers */
    if (args.length < arity) {
      throw new TypeError("The partial function takes at least " + arity + " arguments, but was given " + args.length + ".");
    }

    // Figure out if we have holes
    var holes = 0;
    for (var i = 0; i < args.length; ++i) {
      if (args[i] === hole) {
        holes += 1;
      }
    }

    if (holes > 0) {
      return partialize(holes, function () {
        // eslint-disable-line max-statements
        var realArgs = []; // eslint-disable-line prefer-const
        var argIndex = 0;

        for (var _i = 0; _i < args.length; ++_i) {
          var arg = args[_i];
          if (arg === hole) {
            realArgs.push(arguments.length <= argIndex ? undefined : arguments[argIndex]);
            argIndex += 1;
          } else {
            realArgs.push(arg);
          }
        }

        return fn.apply(undefined, realArgs);
      });
    } else {
      return fn.apply(undefined, args);
    }
  };
}; /* eslint-enable no-magic-numbers */

// ---[ Special Values ]-----------------------------------------------
/*~ stability: experimental */
partialize.hole = hole;

// --[ Exports ]-------------------------------------------------------
module.exports = partialize;
},{}],42:[function(require,module,exports){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var define = Object.defineProperty;

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * complexity : O(n), n is the length of the array
 * type: |
 *   (Array (String or Symbol, 'a)) => Object 'a
 */
var fromPairs = function fromPairs(pairs) {
  return pairs.reduce(function (r, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return define(r, k, { value: v,
      writable: true,
      enumerable: true,
      configurable: true
    });
  }, {});
};

// --[ Exports ]-------------------------------------------------------
module.exports = fromPairs;
},{}],43:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: stable
 * name: module folktale/core/object
 */
module.exports = {
  mapEntries: require('./map-entries'),
  mapValues: require('./map-values'),
  values: require('./values'),
  toPairs: require('./to-pairs'),
  fromPairs: require('./from-pairs')
};
},{"./from-pairs":42,"./map-entries":44,"./map-values":45,"./to-pairs":46,"./values":47}],44:[function(require,module,exports){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var hasOwnProperty = Object.prototype.hasOwnProperty;

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * complexity : O(n), n is the number of own enumerable properties
 * type: |
 *   (
 *     object    : Object 'a,
 *     transform : ((String, 'a)) => (String, 'b),
 *     define    : (('x : Object 'b), String, 'b) => Object 'b :: mutates 'x
 *   ) => Object 'b
 */
var mapEntries = function mapEntries(object, transform, define) {
  return Object.keys(object).reduce(function (result, key) {
    var _transform = transform([key, object[key]]),
        _transform2 = _slicedToArray(_transform, 2),
        newKey = _transform2[0],
        newValue = _transform2[1];

    return define(result, newKey, newValue);
  }, {});
};

// --[ Convenience ]---------------------------------------------------
/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * complexity : O(n), n is the number of own enumerable properties
 * type: |
 *   (Object 'a, ((String, 'a)) => (String, 'b)) => Object 'b
 */
mapEntries.overwrite = function (object, transform) {
  return mapEntries(object, transform, function (result, key, value) {
    result[key] = value;
    return result;
  });
};

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * throws:
 *   Error: when the transform returns duplicate property names.
 *
 * complexity : O(n), n is the number of own enumerable properties
 * type: |
 *   (Object 'a, ((String, 'a)) => (String, 'b)) => Object 'b :: throws Error
 */
mapEntries.unique = function (object, transform) {
  return mapEntries(object, transform, function (result, key, value) {
    if (hasOwnProperty.call(result, key)) {
      throw new Error("The property " + key + " already exists in the resulting object.");
    }
    result[key] = value;
    return result;
  });
};

// --[ Exports ]-------------------------------------------------------
module.exports = mapEntries;
},{}],45:[function(require,module,exports){
"use strict";

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * complexity: O(n), n is the number of own enumerable properties.
 * type: |
 *   (Object 'a, ('a) => 'b) => Object 'b
 */
var mapValues = function mapValues(object, transformation) {
  var keys = Object.keys(object);
  var result = {};

  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];
    result[key] = transformation(object[key]);
  }

  return result;
};

// --[ Convenience ]---------------------------------------------------

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 * 
 * complexity: O(n), n is the number of own enumerable properties.
 * type: |
 *   (Object 'a) . (('a) => 'b) => Object 'b
 */
mapValues.infix = function (transformation) {
  return mapValues(this, transformation);
};

// --[ Exports ]-------------------------------------------------------
module.exports = mapValues;
},{}],46:[function(require,module,exports){
"use strict";

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


/*~
 * stability : stable
 * authors:
 *   - Quildreen Motta
 *
 * complexity : O(n), n is the number of own enumerable properties
 * type: |
 *   (Object 'a) => Array (String or Symbol, 'a)
 */
var toPairs = function toPairs(object) {
  return Object.keys(object).map(function (k) {
    return [k, object[k]];
  });
};

// --[ Exports ]-------------------------------------------------------
module.exports = toPairs;
},{}],47:[function(require,module,exports){
"use strict";

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability : stable
 * authors:
 *   - Quildreen Motta
 *
 * complexity : O(n), n is the number of own enumerable properties.
 * type: |
 *   (Object 'a) => Array 'a
 */
var values = function values(object) {
  return Object.keys(object).map(function (k) {
    return object[k];
  });
};

// --[ Exports ]-------------------------------------------------------
module.exports = values;
},{}],48:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../helpers/fantasy-land'),
    ap = _require.ap;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('ap');
var unsupported = require('../helpers/unsupported-method')('ap');

var isNew = function isNew(a) {
  return typeof a[ap] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.ap === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F (a) => b, F a) => F b
 *   where F is Apply
 */
var apply = function apply(applicativeFunction, applicativeValue) {
  return isNew(applicativeValue) ? applicativeValue[ap](applicativeFunction) : isOld(applicativeFunction) ? warn(applicativeFunction.ap(applicativeValue)) : /*otherwise*/unsupported(applicativeFunction);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F (a) => b) => (F a) => F b
 *   where F is Apply
 */
apply.curried = curry(2, apply); // eslint-disable-line no-magic-numbers


/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F (a) => b).(F a) => F b
 *   where F is Apply
 */
apply.infix = function (applicativeValue) {
  return apply(this, applicativeValue);
};

module.exports = apply;
},{"../core/lambda/curry":38,"../helpers/fantasy-land":66,"../helpers/unsupported-method":69,"../helpers/warn-deprecated-method":70}],49:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../helpers/fantasy-land'),
    flBimap = _require.bimap;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('bimap');
var unsupported = require('../helpers/unsupported-method')('bimap');

var isNew = function isNew(a) {
  return typeof a[flBimap] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.bimap === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b, c, d:
 *     (F a b, (a) => c, (b) => d) => F c d
 *   where F is Bifunctor
 */
var bimap = function bimap(bifunctor, transformLeft, transformRight) {
  return isNew(bifunctor) ? bifunctor[flBimap](transformLeft, transformRight) : isOld(bifunctor) ? warn(bifunctor.bimap(transformLeft, transformRight)) : /*otherwise*/unsupported(bifunctor);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b, c, d:
 *     ((a) => c) => ((b) => d) => (F a b) => F c d
 *   where F is Bifunctor
 */
bimap.curried = curry(3, function (transformLeft, transformRight, bifunctor) {
  return (// eslint-disable-line no-magic-numbers
    bimap(bifunctor, transformLeft, transformRight)
  );
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b, c, d:
 *     (F a b).((a) => c, (b) => d) => F c d
 *   where F is Bifunctor
 */
bimap.infix = function (transformLeft, transformRight) {
  return bimap(this, transformLeft, transformRight);
};

module.exports = bimap;
},{"../core/lambda/curry":38,"../helpers/fantasy-land":66,"../helpers/unsupported-method":69,"../helpers/warn-deprecated-method":70}],50:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../helpers/fantasy-land'),
    flChain = _require.chain;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('chain');
var unsupported = require('../helpers/unsupported-method')('chain');

var isNew = function isNew(a) {
  return typeof a[flChain] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.chain === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall C, a, b:
 *     (C a, (a) => C b) => C b
 *   where C is Chain
 */
var chain = function chain(monad, transformation) {
  return isNew(monad) ? monad[flChain](transformation) : isOld(monad) ? warn(monad.chain(transformation)) : /*otherwise*/unsupported(monad);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall C, a, b:
 *     ((a) => C b) => (C a) => C b
 *   where C is Chain
 */
chain.curried = curry(2, function (transformation, monad) {
  return (// eslint-disable-line no-magic-numbers
    chain(monad, transformation)
  );
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall C, a, b:
 *     (C a).((a) => C b) => C b
 *   where C is Chain
 */
chain.infix = function (transformation) {
  return chain(this, transformation);
};

module.exports = chain;
},{"../core/lambda/curry":38,"../helpers/fantasy-land":66,"../helpers/unsupported-method":69,"../helpers/warn-deprecated-method":70}],51:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../helpers/fantasy-land'),
    flConcat = _require.concat;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('concat');
var unsupported = require('../helpers/unsupported-method')('concat');

var isNewSemigroup = function isNewSemigroup(a) {
  return typeof a[flConcat] === 'function';
};
var isOldSemigroup = function isOldSemigroup(a) {
  return typeof a.concat === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a, S a) => S a
 *   where S is Semigroup
 */
var concat = function concat(semigroupLeft, semigroupRight) {
  return isNewSemigroup(semigroupLeft) ? semigroupLeft[flConcat](semigroupRight) : isOldSemigroup(semigroupLeft) ? warn(semigroupLeft.concat(semigroupRight)) : /*otherwise*/unsupported(semigroupLeft);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a) => (S a) => S a
 *   where S is Semigroup
 */
concat.curried = curry(2, function (semigroupRight, semigroupLeft) {
  return (// eslint-disable-line no-magic-numbers
    concat(semigroupLeft, semigroupRight)
  );
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a).(S a) => S a
 *   where S is Semigroup
 */
concat.infix = function (aSemigroup) {
  return concat(this, aSemigroup);
};

module.exports = concat;
},{"../core/lambda/curry":38,"../helpers/fantasy-land":66,"../helpers/unsupported-method":69,"../helpers/warn-deprecated-method":70}],52:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


/*~
 * stability: experimental
 * name: module folktale/fantasy-land/curried
 */
module.exports = {
  apply: require('./apply').curried,
  bimap: require('./bimap').curried,
  chain: require('./chain').curried,
  concat: require('./concat').curried,
  empty: require('./empty').curried,
  equals: require('./equals').curried,
  map: require('./map').curried,
  of: require('./of').curried
};
},{"./apply":48,"./bimap":49,"./chain":50,"./concat":51,"./empty":53,"./equals":54,"./map":57,"./of":58}],53:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../helpers/fantasy-land'),
    flEmpty = _require.empty;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('empty');
var unsupported = require('../helpers/unsupported-method')('empty');

var isNew = function isNew(a) {
  return typeof a[flEmpty] === 'function';
};
var isCtorNew = function isCtorNew(a) {
  return typeof a.constructor[flEmpty] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.empty === 'function';
};
var isCtorOld = function isCtorOld(a) {
  return typeof a.constructor.empty === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall M, a:
 *     (M) => M a
 *   where M is Monoid 
 */
var empty = function empty(monoid) {
  return isNew(monoid) ? monoid[flEmpty]() : isCtorNew(monoid) ? monoid.constructor[flEmpty]() : isOld(monoid) ? warn(monoid.empty()) : isCtorOld(monoid) ? warn(monoid.constructor.empty()) : /*otherwise*/unsupported(monoid);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall M, a:
 *     (M) => M a
 *   where M is Monoid 
 */
empty.curried = curry(1, empty); // eslint-disable-line no-magic-numbers


/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall M, a:
 *     (M).() => M a
 *   where M is Monoid 
 */
empty.infix = function () {
  return empty(this);
};

module.exports = empty;
},{"../core/lambda/curry":38,"../helpers/fantasy-land":66,"../helpers/unsupported-method":69,"../helpers/warn-deprecated-method":70}],54:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../helpers/fantasy-land'),
    flEquals = _require.equals;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('equals');
var unsupported = require('../helpers/unsupported-method')('equals');

var isNew = function isNew(a) {
  return typeof a[flEquals] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.equals === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a, S a) => Boolean
 *   where S is Setoid
 */
var equals = function equals(setoidLeft, setoidRight) {
  return isNew(setoidLeft) ? setoidLeft[flEquals](setoidRight) : isOld(setoidLeft) ? warn(setoidLeft.equals(setoidRight)) : /*otherwise*/unsupported(setoidLeft);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a) => (S a) => Boolean
 *   where S is Setoid
 */
equals.curried = curry(2, function (setoidRight, setoidLeft) {
  return (// eslint-disable-line no-magic-numbers
    equals(setoidLeft, setoidRight)
  );
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a).(S a) => Boolean
 *   where S is Setoid
 */
equals.infix = function (aSetoid) {
  return equals(this, aSetoid);
};

module.exports = equals;
},{"../core/lambda/curry":38,"../helpers/fantasy-land":66,"../helpers/unsupported-method":69,"../helpers/warn-deprecated-method":70}],55:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: experimental
 * name: module folktale/fantasy-land
 */
module.exports = {
  apply: require('./apply'),
  concat: require('./concat'),
  chain: require('./chain'),
  empty: require('./empty'),
  map: require('./map'),
  of: require('./of'),
  equals: require('./equals'),
  bimap: require('./bimap'),
  curried: require('./curried'),
  infix: require('./infix')
};
},{"./apply":48,"./bimap":49,"./chain":50,"./concat":51,"./curried":52,"./empty":53,"./equals":54,"./infix":56,"./map":57,"./of":58}],56:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


/*~
 * stability: experimental
 * name: module folktale/fantasy-land/infix
 */
module.exports = {
  apply: require('./apply').infix,
  bimap: require('./bimap').infix,
  chain: require('./chain').infix,
  concat: require('./concat').infix,
  empty: require('./empty').infix,
  equals: require('./equals').infix,
  map: require('./map').infix,
  of: require('./of').infix
};
},{"./apply":48,"./bimap":49,"./chain":50,"./concat":51,"./empty":53,"./equals":54,"./map":57,"./of":58}],57:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../helpers/fantasy-land'),
    flMap = _require.map;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('map');
var unsupported = require('../helpers/unsupported-method')('map');

var isNew = function isNew(a) {
  return typeof a[flMap] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.map === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F a, (a) => b) => F b
 *   where F is Functor
 */
var map = function map(functor, transformation) {
  return isNew(functor) ? functor[flMap](transformation) : isOld(functor) ? warn(functor.map(transformation)) : /*otherwise*/unsupported(functor);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     ((a) => b) => (F a) => F b
 *   where F is Functor
 */
map.curried = curry(2, function (transformation, functor) {
  return (// eslint-disable-line no-magic-numbers
    map(functor, transformation)
  );
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F a).((a) => b) => F b
 *   where F is Functor
 */
map.infix = function (transformation) {
  return map(this, transformation);
};

module.exports = map;
},{"../core/lambda/curry":38,"../helpers/fantasy-land":66,"../helpers/unsupported-method":69,"../helpers/warn-deprecated-method":70}],58:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../helpers/fantasy-land'),
    flOf = _require.of;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('of');
var unsupported = require('../helpers/unsupported-method')('of');

var isNew = function isNew(a) {
  return typeof a[flOf] === 'function';
};
var isCtorNew = function isCtorNew(a) {
  return typeof a.constructor[flOf] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.of === 'function';
};
var isCtorOld = function isCtorOld(a) {
  return typeof a.constructor.of === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a:
 *     (F, a) => F a
 *   where F is Applicative
 */
var of = function of(applicative, value) {
  return isNew(applicative) ? applicative[flOf](value) : isCtorNew(applicative) ? applicative.constructor[flOf](value) : isOld(applicative) ? warn(applicative.of(value)) : isCtorOld(applicative) ? warn(applicative.constructor.of(value)) : /*otherwise*/unsupported(applicative);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a:
 *     (F) => (a) => F a
 *   where F is Applicative
 */
of.curried = curry(2, of); // eslint-disable-line no-magic-numbers


/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a:
 *     (F).(a) => F a
 *   where F is Applicative
 */
of.infix = function (value) {
  return of(this, value);
};

module.exports = of;
},{"../core/lambda/curry":38,"../helpers/fantasy-land":66,"../helpers/unsupported-method":69,"../helpers/warn-deprecated-method":70}],59:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

module.exports = function (method, transformation) {
  if (typeof transformation !== 'function') {
    throw new TypeError(method + ' expects a function, but was given ' + transformation + '.');
  }
};
},{}],60:[function(require,module,exports){
(function (process){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../adt/union/union'),
    typeSymbol = _require.typeSymbol;

module.exports = function (type) {
  return function (method, value) {
    var typeName = type[typeSymbol];
    if (process.env.FOLKTALE_ASSERTIONS !== 'none' && !type.isPrototypeOf(value)) {
      console.warn(typeName + '.' + method + ' expects a value of the same type, but was given ' + value + '.');

      if (process.env.FOLKTALE_ASSERTIONS !== 'minimal') {
        console.warn('\nThis could mean that you\'ve provided the wrong value to the method, in\nwhich case this is a bug in your program, and you should try to track\ndown why the wrong value is getting here.\n\nBut this could also mean that you have more than one ' + typeName + ' library\ninstantiated in your program. This is not **necessarily** a bug, it\ncould happen for several reasons:\n\n 1) You\'re loading the library in Node, and Node\'s cache didn\'t give\n    you back the same instance you had previously requested.\n\n 2) You have more than one Code Realm in your program, and objects\n    created from the same library, in different realms, are interacting.\n\n 3) You have a version conflict of folktale libraries, and objects\n    created from different versions of the library are interacting.\n\nIf your situation fits the cases (1) or (2), you are okay, as long as\nthe objects originate from the same version of the library. Folktale\ndoes not rely on reference checking, only structural checking. However\nyou\'ll want to watch out if you\'re modifying the ' + typeName + '\'s prototype,\nbecause you\'ll have more than one of them, and you\'ll want to make\nsure you do the same change in all of them \u2014 ideally you shouldn\'t\nbe modifying the object, though.\n\nIf your situation fits the case (3), you are *probably* okay if the\nversion difference isn\'t a major one. However, at this point the\nbehaviour of your program using ' + typeName + ' is undefined, and you should\ntry looking into why the version conflict is happening.\n\nParametric modules can help ensuring your program only has a single\ninstance of the folktale library. Check out the Folktale Architecture\ndocumentation for more information.\n      ');
      }
    }
  };
};
}).call(this,require('_process'))
},{"../adt/union/union":8,"_process":1}],61:[function(require,module,exports){
(function (process){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var mm = Symbol.for('@@meta:magical');

var copyDocumentation = function copyDocumentation(source, target) {
  var extensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (process.env.FOLKTALE_DOCS !== 'false') {
    target[mm] = Object.assign({}, source[mm] || {}, extensions);
  }
};

module.exports = copyDocumentation;
}).call(this,require('_process'))
},{"_process":1}],62:[function(require,module,exports){
(function (process){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/* eslint-disable no-magic-numbers, max-statements-per-line */
var defer = typeof setImmediate !== 'undefined' ? function (f) {
            return setImmediate(f);
} : typeof process !== 'undefined' ? function (f) {
            return process.nextTick(f);
} : /* otherwise */function (f) {
            return setTimeout(f, 0);
};
/* eslint-enable no-magic-numbers, max-statements-per-line */

module.exports = defer;
}).call(this,require('_process'))
},{"_process":1}],63:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var copyDocs = require('./copy-documentation');

var defineAdtMethod = function defineAdtMethod(adt, definitions) {
  Object.keys(definitions).forEach(function (name) {
    var methods = definitions[name];
    adt.variants.forEach(function (variant) {
      var method = methods[variant.tag];
      if (!method) {
        throw new TypeError('Method ' + name + ' not defined for ' + variant.tag);
      }
      copyDocs(methods, method);
      variant.prototype[name] = method;
    });
  });
};

module.exports = defineAdtMethod;
},{"./copy-documentation":61}],64:[function(require,module,exports){
"use strict";

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var defineProperty = Object.defineProperty;

function define(object, name, value) {
  defineProperty(object, name, {
    value: value,
    writable: true,
    enumerable: false,
    configurable: true
  });
}

module.exports = define;
},{}],65:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var keys = Object.keys;
var symbols = Object.getOwnPropertySymbols;
var defineProperty = Object.defineProperty;
var property = Object.getOwnPropertyDescriptor;

/*
 * Extends an objects with own enumerable key/value pairs from other sources.
 *
 * This is used to define objects for the ADTs througout this file, and there
 * are some important differences from Object.assign:
 *
 *   - This code is only concerned with own enumerable property *names*.
 *   - Additionally this code copies all own symbols (important for tags).
 *
 * When copying, this function copies **whole property descriptors**, which
 * means getters/setters are not executed during the copying. The only
 * exception is when the property name is `prototype`, which is not
 * configurable in functions by default.
 *
 * This code only special cases `prototype` because any other non-configurable
 * property is considered an error, and should crash the program so it can be
 * fixed.
 */
function extend(target) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    keys(source).forEach(function (key) {
      if (key === 'prototype') {
        target[key] = source[key];
      } else {
        defineProperty(target, key, property(source, key));
      }
    });
    symbols(source).forEach(function (symbol) {
      defineProperty(target, symbol, property(source, symbol));
    });
  });
  return target;
}

module.exports = extend;
},{}],66:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

module.exports = {
  equals: 'fantasy-land/equals',
  concat: 'fantasy-land/concat',
  empty: 'fantasy-land/empty',
  map: 'fantasy-land/map',
  ap: 'fantasy-land/ap',
  of: 'fantasy-land/of',
  reduce: 'fantasy-land/reduce',
  traverse: 'fantasy-land/traverse',
  chain: 'fantasy-land/chain',
  chainRec: 'fantasy-land/chainRec',
  extend: 'fantasy-land/extend',
  extract: 'fantasy-land/extract',
  bimap: 'fantasy-land/bimap',
  promap: 'fantasy-land/promap'
};
},{}],67:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


var aliases = {
  equals: {
    /*~
     * module: null
     * type: |
     *   ('S 'a).('S 'a) => Boolean
     *   where 'S is Setoid
     */
    'fantasy-land/equals': function fantasyLandEquals(that) {
      return this.equals(that);
    }
  },

  concat: {
    /*~
     * module: null
     * type: |
     *   ('S 'a).('S 'a) => 'S 'a
     *   where 'S is Semigroup
     */
    'fantasy-land/concat': function fantasyLandConcat(that) {
      return this.concat(that);
    }
  },

  empty: {
    /*~
     * module: null
     * type: |
     *   ('M).() => 'M a
     *   where 'M is Monoid
     */
    'fantasy-land/empty': function fantasyLandEmpty() {
      return this.empty();
    }
  },

  map: {
    /*~
     * module: null
     * type: |
     *   ('F 'a).(('a) => 'b) => 'F 'b
     *   where 'F is Functor
     */
    'fantasy-land/map': function fantasyLandMap(transformation) {
      return this.map(transformation);
    }
  },

  apply: {
    /*~
     * module: null
     * type: |
     *   ('F ('a) => b).('F 'a) => 'F 'b
     *   where 'F is Apply
     */
    ap: function ap(that) {
      return this.apply(that);
    },


    /*~
     * module: null
     * type: |
     *   ('F 'a).('F ('a) => 'b) => 'F 'b
     *   where 'F is Apply
     */
    'fantasy-land/ap': function fantasyLandAp(that) {
      return that.apply(this);
    }
  },

  of: {
    /*~
     * module: null
     * type: |
     *   forall F, a:
     *     (F).(a) => F a
     *   where F is Applicative 
     */
    'fantasy-land/of': function fantasyLandOf(value) {
      return this.of(value);
    }
  },

  reduce: {
    /*~
     * module: null
     * type: |
     *   forall F, a, b:
     *     (F a).((b, a) => b, b) => b
     *   where F is Foldable  
     */
    'fantasy-land/reduce': function fantasyLandReduce(combinator, initial) {
      return this.reduce(combinator, initial);
    }
  },

  traverse: {
    /*~
     * module: null
     * type: |
     *   forall F, T, a, b:
     *     (T a).((a) => F b, (c) => F c) => F (T b)
     *   where F is Apply, T is Traversable
     */
    'fantasy-land/traverse': function fantasyLandTraverse(transformation, lift) {
      return this.traverse(transformation, lift);
    }
  },

  chain: {
    /*~
     * module: null
     * type: |
     *   forall M, a, b:
     *     (M a).((a) => M b) => M b
     *   where M is Chain
     */
    'fantasy-land/chain': function fantasyLandChain(transformation) {
      return this.chain(transformation);
    }
  },

  chainRecursively: {
    /*~
     * module: null
     * type: |
     *   forall M, a, b, c:
     *     (M).(
     *       Step:    ((a) => c, (b) => c, a) => M c,
     *       Initial: a
     *     ) => M b
     *   where M is ChainRec 
     */
    chainRec: function chainRec(step, initial) {
      return this.chainRecursively(step, initial);
    },


    /*~
     * module: null
     * type: |
     *   forall M, a, b, c:
     *     (M).(
     *       Step:    ((a) => c, (b) => c, a) => M c,
     *       Initial: a
     *     ) => M b
     *   where M is ChainRec 
     */
    'fantasy-land/chainRec': function fantasyLandChainRec(step, initial) {
      return this.chainRecursively(step, initial);
    }
  },

  extend: {
    /*~
     * module: null
     * type: |
     *   forall W, a, b:
     *     (W a).((W a) => b) => W b
     *   where W is Extend
     */
    'fantasy-land/extend': function fantasyLandExtend(transformation) {
      return this.extend(transformation);
    }
  },

  extract: {
    /*~
     * module: null
     * type: |
     *   forall W, a, b:
     *     (W a).() => a
     *   where W is Comonad
     */
    'fantasy-land/extract': function fantasyLandExtract() {
      return this.extract();
    }
  },

  bimap: {
    /*~
     * module: null
     * type: |
     *   forall F, a, b, c, d:
     *     (F a b).((a) => c, (b) => d) => F c d
     *   where F is Bifunctor
     */
    'fantasy-land/bimap': function fantasyLandBimap(f, g) {
      return this.bimap(f, g);
    }
  },

  promap: {
    /*~
     * module: null
     * type: |
     *   forall P, a, b, c, d:
     *     (P a b).((c) => a, (b) => d) => P c d
     */
    'fantasy-land/promap': function fantasyLandPromap(f, g) {
      return this.promap(f, g);
    }
  }
};

var provideAliases = function provideAliases(structure) {
  Object.keys(aliases).forEach(function (method) {
    if (typeof structure[method] === 'function') {
      Object.keys(aliases[method]).forEach(function (alias) {
        structure[alias] = aliases[method][alias];
      });
    }
  });
};

module.exports = provideAliases;
},{}],68:[function(require,module,exports){
"use strict";

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

function thunk(fn) {
  var value = void 0;
  var computed = false;

  return function () {
    if (computed) {
      return value;
    } else {
      computed = true;
      value = fn();
      return value;
    }
  };
}

module.exports = thunk;
},{}],69:[function(require,module,exports){
"use strict";

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

module.exports = function (methodName) {
  return function (object) {
    throw new TypeError(object + " does not have a method '" + methodName + "'.");
  };
};
},{}],70:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var deprecated = require('./warn-deprecation');

module.exports = function (methodName) {
  return function (result) {
    deprecated('Type.' + methodName + '() is being deprecated in favour of Type[\'fantasy-land/' + methodName + '\'](). \n    Your data structure is using the old-style fantasy-land methods,\n    and these won\'t be supported in Folktale 3');
    return result;
  };
};
},{"./warn-deprecation":71}],71:[function(require,module,exports){
(function (process){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var BLAME_FUNCTION_INDEX = 3; // [current, parent, *error*, caller to blame, …]

function warnDeprecation(reason) {
  // eslint-disable-line max-statements
  if (process.env.FOLKTALE_ASSERTIONS !== 'none') {
    var stack = new Error('').stack;
    var offender = void 0;
    if (stack) {
      var lines = stack.split('\n');
      offender = lines[BLAME_FUNCTION_INDEX];
    }

    if (offender) {
      console.warn(reason + '\n    Blame: ' + offender.trim());
    } else {
      console.warn(reason);
    }
  }
}

module.exports = warnDeprecation;
}).call(this,require('_process'))
},{"_process":1}],72:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~ 
 * stability: stable
 * name: module folktale
 */
module.exports = {
  adt: require('./adt'),
  concurrency: require('./concurrency'),
  conversions: require('./conversions'),
  core: require('./core'),
  fantasyLand: require('./fantasy-land'),
  maybe: require('./maybe'),
  result: require('./result'),
  validation: require('./validation')
};
},{"./adt":2,"./concurrency":13,"./conversions":22,"./core":35,"./fantasy-land":55,"./maybe":73,"./result":75,"./validation":79}],73:[function(require,module,exports){
'use strict';

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


var Maybe = require('./maybe');

var _require = require('../adt/union/union'),
    typeSymbol = _require.typeSymbol;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * name: module folktale/maybe
 */


module.exports = (_module$exports = {
  Just: Maybe.Just,
  Nothing: Maybe.Nothing,
  hasInstance: Maybe.hasInstance,
  of: Maybe.of,
  empty: Maybe.empty,
  fromJSON: Maybe.fromJSON
}, _defineProperty(_module$exports, typeSymbol, Maybe[typeSymbol]), _defineProperty(_module$exports, 'fantasy-land/of', Maybe['fantasy-land/of']), _defineProperty(_module$exports, 'fromNullable', function fromNullable(aNullable) {
  return require('../conversions/nullable-to-maybe')(aNullable);
}), _defineProperty(_module$exports, 'fromResult', function fromResult(aResult) {
  return require('../conversions/result-to-maybe')(aResult);
}), _defineProperty(_module$exports, 'fromValidation', function fromValidation(aValidation) {
  return require('../conversions/validation-to-maybe')(aValidation);
}), _module$exports);
},{"../adt/union/union":8,"../conversions/nullable-to-maybe":26,"../conversions/result-to-maybe":31,"../conversions/validation-to-maybe":33,"./maybe":74}],74:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var assertType = require('../helpers/assert-type');
var assertFunction = require('../helpers/assert-function');

var _require = require('../adt/union'),
    union = _require.union,
    derivations = _require.derivations;

var provideAliases = require('../helpers/provide-fantasy-land-aliases');
var warnDeprecation = require('../helpers/warn-deprecation');
var adtMethods = require('../helpers/define-adt-methods');
var extend = require('../helpers/extend');

var equality = derivations.equality,
    debugRepresentation = derivations.debugRepresentation,
    serialization = derivations.serialization;

/*~ stability: stable */

var Maybe = union('folktale:Maybe', {
  /*~
   * type: |
   *   forall a: () => Maybe a
   */
  Nothing: function Nothing() {},


  /*~
   * type: |
   *   forall a: (a) => Maybe a
   */
  Just: function Just(value) {
    return { value: value };
  }
}).derive(equality, debugRepresentation, serialization);

var Nothing = Maybe.Nothing,
    _Just = Maybe.Just;

var assertMaybe = assertType(Maybe);

extend(_Just.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a: get (Maybe a) => a
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Maybe.Just');
  }
});

/*~~belongsTo: Maybe */
adtMethods(Maybe, {
  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe a).((a) => b) => Maybe b
   */
  map: {
    /*~*/
    Nothing: function map(transformation) {
      assertFunction('Maybe.Nothing#map', transformation);
      return this;
    },

    /*~*/
    Just: function map(transformation) {
      assertFunction('Maybe.Just#map', transformation);
      return _Just(transformation(this.value));
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe (a) => b).(Maybe a) => Maybe b
   */
  apply: {
    /*~*/
    Nothing: function apply(aMaybe) {
      assertMaybe('Maybe.Nothing#apply', aMaybe);
      return this;
    },

    /*~*/
    Just: function apply(aMaybe) {
      assertMaybe('Maybe.Just#apply', aMaybe);
      return aMaybe.map(this.value);
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe a).((a) => Maybe b) => Maybe b
   */
  chain: {
    /*~*/
    Nothing: function chain(transformation) {
      assertFunction('Maybe.Nothing#chain', transformation);
      return this;
    },

    /*~*/
    Just: function chain(transformation) {
      assertFunction('Maybe.Just#chain', transformation);
      return transformation(this.value);
    }
  },

  /*~
   * type: |
   *   forall a: (Maybe a).() => a :: (throws TypeError)
   */
  unsafeGet: {
    /*~*/
    Nothing: function unsafeGet() {
      throw new TypeError('Can\'t extract the value of a Nothing.\n\n    Since Nothing holds no values, it\'s not possible to extract one from them.\n    You might consider switching from Maybe#get to Maybe#getOrElse, or some other method\n    that is not partial.\n      ');
    },

    /*~*/
    Just: function unsafeGet() {
      return this.value;
    }
  },

  /*~
   * type: |
   *   forall a: (Maybe a).(a) => a
   */
  getOrElse: {
    /*~*/
    Nothing: function getOrElse(_default) {
      return _default;
    },

    /*~*/
    Just: function getOrElse(_default) {
      return this.value;
    }
  },

  /*~
   * type: |
   *   forall a: (Maybe a).((a) => Maybe a) => Maybe a
   */
  orElse: {
    /*~*/
    Nothing: function orElse(handler) {
      assertFunction('Maybe.Nothing#orElse', handler);
      return handler(this.value);
    },

    /*~*/
    Just: function orElse(handler) {
      assertFunction('Maybe.Nothing#orElse', handler);
      return this;
    }
  },

  /*~
   * authors:
   *   - "@diasbruno"
   * type: |
   *   forall a: (Maybe a).(Maybe a) => Maybe a
   *   where a is Semigroup
   */
  concat: {
    /*~*/
    Nothing: function concat(aMaybe) {
      assertMaybe('Maybe.Nothing#concat', aMaybe);
      return aMaybe;
    },

    /*~*/
    Just: function concat(aMaybe) {
      var _this = this;

      assertMaybe('Maybe.Just#concat', aMaybe);
      return aMaybe.matchWith({
        Nothing: function Nothing() {
          return _Just(_this.value);
        },
        Just: function Just(a) {
          return _Just(_this.value.concat(a.value));
        }
      });
    }
  },

  /*~
   * deprecated:
   *   since: 2.0.0
   *   replacedBy: .matchWith(pattern)
   * 
   * type: |
   *   forall a, b:
   *     (Maybe a).({
   *       Nothing: () => b,
   *       Just: (a) => b
   *     }) => b
   */
  cata: {
    /*~*/
    Nothing: function cata(pattern) {
      warnDeprecation('`.cata(pattern)` is deprecated. Use `.matchWith(pattern)` instead.');
      return pattern.Nothing();
    },

    /*~*/
    Just: function cata(pattern) {
      warnDeprecation('`.cata(pattern)` is deprecated. Use `.matchWith(pattern)` instead.');
      return pattern.Just(this.value);
    }
  },

  /*~
   * type: |
   *   forall a, b: (Maybe a).(() => b, (a) => b) => b
   */
  fold: {
    /*~*/
    Nothing: function Nothing(transformNothing, transformJust) {
      assertFunction('Maybe.Nothing#fold', transformNothing);
      assertFunction('Maybe.Nothing#fold', transformJust);
      return transformNothing();
    },

    /*~*/
    Just: function Just(transformNothing, transformJust) {
      assertFunction('Maybe.Just#fold', transformNothing);
      assertFunction('Maybe.Just#fold', transformJust);
      return transformJust(this.value);
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a: (Maybe a).((a) => Boolean) => Maybe a
   */
  filter: {
    /*~*/
    Nothing: function filter(predicate) {
      assertFunction('Maybe.Nothing#filter', predicate);
      return this;
    },

    /*~*/
    Just: function filter(predicate) {
      assertFunction('Maybe.Just#filter', predicate);
      return predicate(this.value) ? this : Nothing();
    }
  }
});

Object.assign(Maybe, {
  /*~
   * stability: stable
   * type: |
   *   forall a: (a) => Maybe a
   */
  of: function of(value) {
    return _Just(value);
  },


  /*~
   * authors:
   *   - "@diasbruno"
   * type: |
   *   forall a: () => Maybe a
   */
  empty: function empty() {
    return Nothing();
  },


  /*~
   * deprecated:
   *   since: 2.0.0
   *   replacedBy: .unsafeGet()
   * type: |
   *   forall a: (Maybe a).() => a :: (throws TypeError)
   */
  'get': function get() {
    warnDeprecation('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Maybe a).(b) => Result b a
   */
  toResult: function toResult(fallbackValue) {
    return require('../conversions/maybe-to-result')(this, fallbackValue);
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Maybe a).(b) => Result b a
   */
  toValidation: function toValidation(fallbackValue) {
    return require('../conversions/maybe-to-validation')(this, fallbackValue);
  }
});

provideAliases(_Just.prototype);
provideAliases(Nothing.prototype);
provideAliases(Maybe);

module.exports = Maybe;
},{"../adt/union":7,"../conversions/maybe-to-result":23,"../conversions/maybe-to-validation":24,"../helpers/assert-function":59,"../helpers/assert-type":60,"../helpers/define-adt-methods":63,"../helpers/extend":65,"../helpers/provide-fantasy-land-aliases":67,"../helpers/warn-deprecation":71}],75:[function(require,module,exports){
'use strict';

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Result = require('./result');

var _require = require('../adt/union/union'),
    typeSymbol = _require.typeSymbol;

/*~
 * stability: stable
 * name: module folktale/result
 */


module.exports = (_module$exports = {
  Error: Result.Error,
  Ok: Result.Ok,
  hasInstance: Result.hasInstance,
  of: Result.of,
  fromJSON: Result.fromJSON
}, _defineProperty(_module$exports, typeSymbol, Result[typeSymbol]), _defineProperty(_module$exports, 'try', require('./try')), _defineProperty(_module$exports, 'fromNullable', function fromNullable(aNullable) {
  return require('../conversions/nullable-to-result')(aNullable);
}), _defineProperty(_module$exports, 'fromValidation', function fromValidation(aValidation) {
  return require('../conversions/validation-to-result')(aValidation);
}), _defineProperty(_module$exports, 'fromMaybe', function fromMaybe(aMaybe, failureValue) {
  return require('../conversions/maybe-to-result')(aMaybe, failureValue);
}), _module$exports);
},{"../adt/union/union":8,"../conversions/maybe-to-result":23,"../conversions/nullable-to-result":27,"../conversions/validation-to-result":34,"./result":76,"./try":77}],76:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var assertType = require('../helpers/assert-type');
var assertFunction = require('../helpers/assert-function');

var _require = require('../adt/union'),
    union = _require.union,
    derivations = _require.derivations;

var provideAliases = require('../helpers/provide-fantasy-land-aliases');
var adtMethods = require('../helpers/define-adt-methods');
var extend = require('../helpers/extend');
var warnDeprecation = require('../helpers/warn-deprecation');

var equality = derivations.equality,
    debugRepresentation = derivations.debugRepresentation,
    serialization = derivations.serialization;

/*~ stability: experimental */

var Result = union('folktale:Result', {
  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (a) => Result a b
   */
  Error: function Error(value) {
    return { value: value };
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (b) => Result a b
   */
  Ok: function Ok(value) {
    return { value: value };
  }
}).derive(equality, debugRepresentation, serialization);

var Error = Result.Error,
    Ok = Result.Ok;


var assertResult = assertType(Result);

extend(Error.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Result a b) => a
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Result.Error');
  }
});

extend(Ok.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Result a b) => b
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Result.Ok');
  }
});

/*~
 * ~belongsTo: Result
 */
adtMethods(Result, {
  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((b) => c) => Result a c
   */
  map: {
    /*~*/
    Error: function map(f) {
      assertFunction('Result.Error#map', f);
      return this;
    },

    /*~*/
    Ok: function map(f) {
      assertFunction('Result.Ok#map', f);
      return Ok(f(this.value));
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a ((b) => c)).(Result a b) => Result a c
   */
  apply: {
    /*~*/
    Error: function apply(anResult) {
      assertResult('Result.Error#apply', anResult);
      return this;
    },

    /*~*/
    Ok: function apply(anResult) {
      assertResult('Result.Ok#apply', anResult);
      return anResult.map(this.value);
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((b) => Result a c) => Result a c
   */
  chain: {
    /*~*/
    Error: function chain(f) {
      assertFunction('Result.Error#chain', f);
      return this;
    },

    /*~*/
    Ok: function chain(f) {
      assertFunction('Result.Ok#chain', f);
      return f(this.value);
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => b :: throws TypeError
   */
  unsafeGet: {
    /*~*/
    Error: function unsafeGet() {
      throw new TypeError('Can\'t extract the value of an Error.\n\nError does not contain a normal value - it contains an error.\nYou might consider switching from Result#unsafeGet to Result#getOrElse,\nor some other method that is not partial.\n      ');
    },

    /*~*/
    Ok: function unsafeGet() {
      return this.value;
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).(b) => b
   */
  getOrElse: {
    /*~*/
    Error: function getOrElse(_default) {
      return _default;
    },

    /*~*/
    Ok: function getOrElse(_default) {
      return this.value;
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((a) => Result c b) => Result c b
   */
  orElse: {
    /*~*/
    Error: function orElse(handler) {
      assertFunction('Result.Error#orElse', handler);
      return handler(this.value);
    },

    /*~*/
    Ok: function orElse(handler) {
      assertFunction('Result.Ok#orElse', handler);
      return this;
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Result a b).(Result a b) => Result a b
   *   where b is Semigroup
   */
  concat: {
    /*~*/
    Error: function concat(aResult) {
      assertResult('Result.Error#concat', aResult);
      return this;
    },

    /*~*/
    Ok: function concat(aResult) {
      var _this = this;

      assertResult('Result.Ok#concat', aResult);
      return aResult.map(function (xs) {
        return _this.value.concat(xs);
      });
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((a) => c, (b) => c) => c
   */
  fold: {
    /*~*/
    Error: function fold(f, g) {
      assertFunction('Result.Error#fold', f);
      assertFunction('Result.Error#fold', g);
      return f(this.value);
    },

    /*~*/
    Ok: function fold(f, g) {
      assertFunction('Result.Ok#fold', f);
      assertFunction('Result.Ok#fold', g);
      return g(this.value);
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => Result b a
   */
  swap: {
    /*~*/
    Error: function swap() {
      return Ok(this.value);
    },

    /*~*/
    Ok: function swap() {
      return Error(this.value);
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   (Result a b).((a) => c, (b) => d) => Result c d
   */
  bimap: {
    /*~*/
    Error: function bimap(f, g) {
      assertFunction('Result.Error#bimap', f);
      assertFunction('Result.Error#bimap', g);
      return Error(f(this.value));
    },

    /*~*/
    Ok: function bimap(f, g) {
      assertFunction('Result.Ok#bimap', f);
      assertFunction('Result.Ok#bimap', g);
      return Ok(g(this.value));
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((a) => c) => Result c b
   */
  mapError: {
    /*~*/
    Error: function mapError(f) {
      assertFunction('Result.Error#mapError', f);
      return Error(f(this.value));
    },

    /*~*/
    Ok: function mapError(f) {
      assertFunction('Result.Ok#mapError', f);
      return this;
    }
  },

  /*~
   * stability: experimental
   * type: |
   *   forall a: (Maybe a).((a) => Boolean) => Maybe a
   */
  filter: {
    /*~*/
    Error: function filter(predicate) {
      assertFunction('Result.Error#filter', predicate);
      return this;
    },

    /*~*/
    Ok: function filter(predicate) {
      assertFunction('Result.Ok#filter', predicate);
      return predicate(this.value) ? this : Error();
    }
  }
});

Object.assign(Result, {
  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (b) => Result a b
   */
  of: function of(value) {
    return Ok(value);
  },


  /*~
   * deprecated:
   *   since: 2.0.0
   *   replacedBy: .unsafeGet()
   * type: |
   *   forall a, b: (Result a b).() => b :: (throws TypeError)
   */
  'get': function get() {
    warnDeprecation('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => a or b
   */
  merge: function merge() {
    return this.value;
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => Validation a b
   */
  toValidation: function toValidation() {
    return require('../conversions/result-to-validation')(this);
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => Maybe b
   */
  toMaybe: function toMaybe() {
    return require('../conversions/result-to-maybe')(this);
  }
});

provideAliases(Error.prototype);
provideAliases(Ok.prototype);
provideAliases(Result);

module.exports = Result;
},{"../adt/union":7,"../conversions/result-to-maybe":31,"../conversions/result-to-validation":32,"../helpers/assert-function":59,"../helpers/assert-type":60,"../helpers/define-adt-methods":63,"../helpers/extend":65,"../helpers/provide-fantasy-land-aliases":67,"../helpers/warn-deprecation":71}],77:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('./result'),
    Error = _require.Error,
    Ok = _require.Ok;

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b: (() => b :: throws a) => Result a b
 */


var _try = function _try(f) {
  try {
    return Ok(f());
  } catch (e) {
    return Error(e);
  }
};

module.exports = _try;
},{"./result":76}],78:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


var _require = require('./validation'),
    Success = _require.Success;

/*~
 * stability: experimental
 * type: |
 *   forall a, b: (Array (Validation a b)) => Validation a b
 *   where a is Semigroup
 */


var collect = function collect(validations) {
  return validations.reduce(function (a, b) {
    return a.concat(b);
  }, Success());
};

module.exports = collect;
},{"./validation":80}],79:[function(require,module,exports){
'use strict';

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Validation = require('./validation');

var _require = require('../adt/union/union'),
    typeSymbol = _require.typeSymbol;

/*~ 
 * stability: stable
 * name: module folktale/validation
 */


module.exports = (_module$exports = {
  Success: Validation.Success,
  Failure: Validation.Failure,
  hasInstance: Validation.hasInstance,
  of: Validation.of,
  fromJSON: Validation.fromJSON
}, _defineProperty(_module$exports, typeSymbol, Validation[typeSymbol]), _defineProperty(_module$exports, 'collect', require('./collect')), _defineProperty(_module$exports, 'fromNullable', function fromNullable(aNullable, fallbackValue) {
  return require('../conversions/nullable-to-validation')(aNullable, fallbackValue);
}), _defineProperty(_module$exports, 'fromResult', function fromResult(aResult) {
  return require('../conversions/result-to-validation')(aResult);
}), _defineProperty(_module$exports, 'fromMaybe', function fromMaybe(aMaybe, fallbackValue) {
  return require('../conversions/maybe-to-validation')(aMaybe, fallbackValue);
}), _module$exports);
},{"../adt/union/union":8,"../conversions/maybe-to-validation":24,"../conversions/nullable-to-validation":28,"../conversions/result-to-validation":32,"./collect":78,"./validation":80}],80:[function(require,module,exports){
'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var assertType = require('../helpers/assert-type');
var assertFunction = require('../helpers/assert-function');

var _require = require('../adt/union'),
    union = _require.union,
    derivations = _require.derivations;

var provideAliases = require('../helpers/provide-fantasy-land-aliases');
var adtMethods = require('../helpers/define-adt-methods');
var extend = require('../helpers/extend');
var warnDeprecation = require('../helpers/warn-deprecation');

var equality = derivations.equality,
    debugRepresentation = derivations.debugRepresentation,
    serialization = derivations.serialization;

/*~ stability: experimental */

var Validation = union('folktale:Validation', {
  /*~
   * type: |
   *   forall a, b: (a) => Validation a b
   */
  Failure: function Failure(value) {
    return { value: value };
  },


  /*~
   * type: |
   *   forall a, b: (b) => Validation a b
   */
  Success: function Success(value) {
    return { value: value };
  }
}).derive(equality, debugRepresentation, serialization);

var Success = Validation.Success,
    Failure = Validation.Failure;

var assertValidation = assertType(Validation);

extend(Failure.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Validation a b) => a
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Validation.Failure');
  }
});

extend(Success.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Validation a b) => b
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Validation.Success');
  }
});

/*~~belongsTo: Validation */
adtMethods(Validation, {
  /*~
   * type: |
   *   forall a, b, c: (Validation a b).((b) => c) => Validation a c
   */
  map: {
    /*~*/
    Failure: function map(transformation) {
      assertFunction('Validation.Failure#map', transformation);
      return this;
    },

    /*~*/
    Success: function map(transformation) {
      assertFunction('Validation.Success#map', transformation);
      return Success(transformation(this.value));
    }
  },

  /*~
   * type: |
   *   forall a, b, c: (Validation (b) => c).(Validation a b) => Validation a c
   */
  apply: {
    /*~*/
    Failure: function apply(aValidation) {
      assertValidation('Failure#apply', aValidation);
      return Failure.hasInstance(aValidation) ? Failure(this.value.concat(aValidation.value)) : /* otherwise */this;
    },

    /*~*/
    Success: function apply(aValidation) {
      assertValidation('Success#apply', aValidation);
      return Failure.hasInstance(aValidation) ? aValidation : /* otherwise */aValidation.map(this.value);
    }
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => b :: throws TypeError
   */
  unsafeGet: {
    /*~*/
    Failure: function unsafeGet() {
      throw new TypeError('Can\'t extract the value of a Failure.\n\n    Failure does not contain a normal value - it contains an error.\n    You might consider switching from Validation#get to Validation#getOrElse, or some other method\n    that is not partial.\n      ');
    },

    /*~*/
    Success: function unsafeGet() {
      return this.value;
    }
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).(b) => b
   */
  getOrElse: {
    /*~*/
    Failure: function getOrElse(_default) {
      return _default;
    },

    /*~*/
    Success: function getOrElse(_default) {
      return this.value;
    }
  },

  /*~
   * type: |
   *   forall a, b, c:
   *     (Validation a b).((a) => Validation c b) => Validation c b
   */
  orElse: {
    /*~*/
    Failure: function orElse(handler) {
      assertFunction('Validation.Failure#orElse', handler);
      return handler(this.value);
    },

    /*~*/
    Success: function orElse(handler) {
      assertFunction('Validation.Success#orElse', handler);
      return this;
    }
  },

  /*~
   * type: |
   *   forall a, b:
   *     (Validation a b).(Validation a b) => Validation a b
   *   where a is Semigroup
   */
  concat: {
    /*~*/
    Failure: function concat(aValidation) {
      assertValidation('Validation.Failure#concat', aValidation);
      if (Failure.hasInstance(aValidation)) {
        return Failure(this.value.concat(aValidation.value));
      } else {
        return this;
      }
    },

    /*~*/
    Success: function concat(aValidation) {
      assertValidation('Validation.Success#concat', aValidation);
      return aValidation;
    }
  },

  /*~
   * type: |
   *   forall a, b, c:
   *     (Validation a b).((a) => c, (b) => c) => c
   */
  fold: {
    /*~*/
    Failure: function fold(failureTransformation, successTransformation) {
      assertFunction('Validation.Failure#fold', failureTransformation);
      assertFunction('Validation.Failure#fold', successTransformation);
      return failureTransformation(this.value);
    },

    /*~*/
    Success: function fold(failureTransformation, successTransformation) {
      assertFunction('Validation.Success#fold', failureTransformation);
      assertFunction('Validation.Success#fold', successTransformation);
      return successTransformation(this.value);
    }
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => Validation b a
   */
  swap: {
    /*~*/
    Failure: function swap() {
      return Success(this.value);
    },

    /*~*/
    Success: function swap() {
      return Failure(this.value);
    }
  },

  /*~
   * type: |
   *   forall a, b, c, d:
   *     (Validation a b).((a) => c, (b) => d) => Validation c d
   */
  bimap: {
    /*~*/
    Failure: function bimap(failureTransformation, successTransformation) {
      assertFunction('Validation.Failure#fold', failureTransformation);
      assertFunction('Validation.Failure#fold', successTransformation);
      return Failure(failureTransformation(this.value));
    },

    /*~*/
    Success: function bimap(failureTransformation, successTransformation) {
      assertFunction('Validation.Success#fold', failureTransformation);
      assertFunction('Validation.Success#fold', successTransformation);
      return Success(successTransformation(this.value));
    }
  },

  /*~
   * type: |
   *   forall a, b, c:
   *     (Validation a b).((a) => c) Validation c b
   */
  mapFailure: {
    /*~*/
    Failure: function mapFailure(transformation) {
      assertFunction('Validation.Failure#mapFailure', transformation);
      return Failure(transformation(this.value));
    },

    /*~*/
    Success: function mapFailure(transformation) {
      assertFunction('Validation.Failure#mapFailure', transformation);
      return this;
    }
  }
});

Object.assign(Validation, {
  /*~
   * type: |
   *   forall a, b: (b) => Validation a b
   */
  of: function of(value) {
    return Success(value);
  },


  /*~
   * type: |
   *   forall a, b: (Validation a b).() => b :: throws TypeError
   */
  'get': function get() {
    warnDeprecation('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },


  /*~
   * type: |
   *   forall a, b: (Validation a b).() => a or b
   */
  merge: function merge() {
    return this.value;
  },


  /*~
   * type: |
   *   forall a, b: (Validation a b).() => Result a b
   */
  toResult: function toResult() {
    return require('../conversions/validation-to-result')(this);
  },


  /*~
   * type: |
   *   forall a, b: (Validation a b).() => Maybe b
   */
  toMaybe: function toMaybe() {
    return require('../conversions/validation-to-maybe')(this);
  }
});

provideAliases(Success.prototype);
provideAliases(Failure.prototype);
provideAliases(Validation);

module.exports = Validation;
},{"../adt/union":7,"../conversions/validation-to-maybe":33,"../conversions/validation-to-result":34,"../helpers/assert-function":59,"../helpers/assert-type":60,"../helpers/define-adt-methods":63,"../helpers/extend":65,"../helpers/provide-fantasy-land-aliases":67,"../helpers/warn-deprecation":71}]},{},[72])(72)
});