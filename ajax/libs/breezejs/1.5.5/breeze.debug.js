/*
 * Copyright 2014 IdeaBlade, Inc.  All Rights Reserved.  
 * Use, reproduction, distribution, and modification of this code is subject to the terms and 
 * conditions of the IdeaBlade Breeze license, available at http://www.breezejs.com/license
 *
 * Author: Jay Traband
 */

(function (global, definition) {
    var def = function(){ return definition(global); };

    // CommonJS
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = def();
        // RequireJS
    } else if (typeof define === "function" && define["amd"]) {
        define(def);
        // <script>
    } else {
        breeze = def();
    }

})(this, function (global) {
    "use strict"; 
    var breeze = {
        version: "1.5.4",
        metadataVersion: "1.0.5"
    };
    ;/**
 @module core
 **/

var __hasOwnProperty = uncurry(Object.prototype.hasOwnProperty);
var __arraySlice = uncurry(Array.prototype.slice);
var __isES5Supported = function () {
  try {
    return !!(Object.getPrototypeOf && Object.defineProperty({}, 'x', {}));
  } catch (e) {
    return false;
  }
}();

// iterate over object
function __objectForEach(obj, kvFn) {
  for (var key in obj) {
    if (__hasOwnProperty(obj, key)) {
      kvFn(key, obj[key]);
    }
  }
}

function __objectMap(obj, kvFn) {
  var results = [];
  for (var key in obj) {
    if (__hasOwnProperty(obj, key)) {
      var result = kvFn ? kvFn(key, obj[key]) : obj[key];
      if (result !== undefined) {
        results.push(result);
      }
    }
  }
  return results;
}

function __objectFirst(obj, kvPredicate) {
  for (var key in obj) {
    if (__hasOwnProperty(obj, key)) {
      var value = obj[key];
      if (kvPredicate(key, value)) {
        return { key: key, value: value };
      }
    }
  }
  return null;
}

function __isSettable(entity, propertyName) {
  var pd = __getPropDescriptor(entity, propertyName);
  if (pd == null) return true;
  return !!(pd.writable || pd.set);
}

function __getPropDescriptor(obj, propertyName) {
  if (!__isES5Supported) return null;

  if (obj.hasOwnProperty(propertyName)) {
    return Object.getOwnPropertyDescriptor(obj, propertyName);
  } else {
    var nextObj = Object.getPrototypeOf(obj);
    if (nextObj == null) return null;
    return __getPropDescriptor(nextObj, propertyName);
  }
}

// Functional extensions

// can be used like: persons.filter(propEq("firstName", "John"))
function __propEq(propertyName, value) {
  return function (obj) {
    return obj[propertyName] === value;
  };
}

// can be used like persons.map(pluck("firstName"))
function __pluck(propertyName) {
  return function (obj) {
    return obj[propertyName];
  };
}

// end functional extensions


function __getOwnPropertyValues(source) {
  var result = [];
  for (var name in source) {
    if (__hasOwnProperty(source, name)) {
      result.push(source[name]);
    }
  }
  return result;
}

function __extend(target, source, propNames) {
  if (!source) return target;
  if (propNames) {
    propNames.forEach(function (propName) {
      target[propName] = source[propName];
    });
  } else {
    for (var propName in source) {
      if (__hasOwnProperty(source, propName)) {
        target[propName] = source[propName];
      }
    }
  }
  return target;
}


function __updateWithDefaults(target, defaults) {
  for (var name in defaults) {
    if (target[name] === undefined) {
      target[name] = defaults[name];
    }
  }
  return target;
}


function __setAsDefault(target, ctor) {
  // we want to insure that the object returned by ctor.defaultInstance is always immutable
  // Use 'target' as the primary template for the ctor.defaultInstance;
  // Use current 'ctor.defaultInstance' as the template for any missing properties
  // creates a new instance for ctor.defaultInstance
  // returns target unchanged
  ctor.defaultInstance = __updateWithDefaults(new ctor(target), ctor.defaultInstance);
  return target;
}

// 'source' is an object that will be transformed into another
// 'template' is a map where the
//    keys: are the keys to return
//      if a key contains ','s then the key is treated as a delimited string with first of the
//      keys being the key to return and the others all valid aliases for this key
//    'values' are either
//        1) the 'default' value of the key
//        2) a function that takes in the source value and should return the value to set
//      The value from the source is then set on the target,
//      after first passing thru the fn, if provided, UNLESS:
//        1) it is the default value
//        2) it is undefined ( nulls WILL be set)
// 'target' is optional
//    - if it exists then properties of the target will be set ( overwritten if the exist)
//    - if it does not exist then a new object will be created as filled.
// 'target is returned.
function __toJson(source, template, target) {
  target = target || {};

  for (var key in template) {
    var aliases = key.split(",");
    var defaultValue = template[key];
    // using some as a forEach with a 'break'
    aliases.some(function(propName) {
      if (!(propName in source)) return false;
      var value = source[propName];
      // there is a functional property defined with this alias ( not what we want to replace).
      if (typeof value == 'function') return false;
      // '==' is deliberate here - idea is that null or undefined values will never get serialized
      // if default value is set to null.
      if (value == defaultValue) return true;
      if (Array.isArray(value) && value.length === 0) return true;
      if (typeof(defaultValue) === "function") {
        value = defaultValue(value);
      } else if (typeof (value) === "object") {
        if (value && value.parentEnum) {
          value = value.name;
        }
      }
      if (value === undefined) return true;
      target[aliases[0]] = value;
      return true;
    });
  }
  return target;
}

// safely perform toJSON logic on objects with cycles.
function __toJSONSafe(obj, replacer) {
  if (obj !== Object(obj)) return obj; // primitive value
  if (obj._$visited) return undefined;
  if (obj.toJSON) {
    var newObj = obj.toJSON();
    if (newObj !== Object(newObj)) return newObj; // primitive value
    if (newObj !== obj) return __toJSONSafe(newObj);
    // toJSON returned the object unchanged.
    obj = newObj;
  }
  obj._$visited = true;
  var result;
  if (obj instanceof Array) {
    result = obj.map(function (o) {
      return __toJSONSafe(o, replacer);
    });
  } else if (typeof (obj) === "function") {
    result = undefined;
  } else {
    result = {};
    for (var prop in obj) {
      if (prop === "_$visited") continue;
      var val = obj[prop];
      if (replacer) {
        val = replacer(prop, val);
        if (val === undefined) continue;
      }
      val = __toJSONSafe(val);
      if (val === undefined) continue;
      result[prop] = val;
    }
  }
  delete obj._$visited;
  return result;
}

// resolves the values of a list of properties by checking each property in multiple sources until a value is found.
function __resolveProperties(sources, propertyNames) {
  var r = {};
  var length = sources.length;
  propertyNames.forEach(function (pn) {
    for (var i = 0; i < length; i++) {
      var src = sources[i];
      if (src) {
        var val = src[pn];
        if (val !== undefined) {
          r[pn] = val;
          break;
        }
      }
    }
  });
  return r;
}


// array functions

function __toArray(item) {
  if (item == null) {
    return [];
  } else if (Array.isArray(item)) {
    return item;
  } else {
    return [item];
  }
}

// a version of Array.map that doesn't require an array, i.e. works on arrays and scalars.
function __map(items, fn, includeNull) {
  // whether to return nulls in array of results; default = true;
  includeNull = includeNull == null ? true : includeNull;
  if (items == null) return items;
  var result;
  if (Array.isArray(items)) {
    result = [];
    items.forEach(function (v, ix) {
      var r = fn(v, ix);
      if (r != null || includeNull) {
        result[ix] = r;
      }
    });
  } else {
    result = fn(items);
  }
  return result;
}


function __arrayFirst(array, predicate) {
  for (var i = 0, j = array.length; i < j; i++) {
    if (predicate(array[i])) {
      return array[i];
    }
  }
  return null;
}

function __arrayIndexOf(array, predicate) {
  for (var i = 0, j = array.length; i < j; i++) {
    if (predicate(array[i])) return i;
  }
  return -1;
}

function __arrayAddItemUnique(array, item) {
  var ix = array.indexOf(item);
  if (ix === -1) array.push(item);
}

function __arrayRemoveItem(array, predicateOrItem, shouldRemoveMultiple) {
  var predicate = __isFunction(predicateOrItem) ? predicateOrItem : undefined;
  var lastIx = array.length - 1;
  var removed = false;
  for (var i = lastIx; i >= 0; i--) {
    if (predicate ? predicate(array[i]) : (array[i] === predicateOrItem)) {
      array.splice(i, 1);
      removed = true;
      if (!shouldRemoveMultiple) {
        return true;
      }
    }
  }
  return removed;
}

function __arrayZip(a1, a2, callback) {
  var result = [];
  var n = Math.min(a1.length, a2.length);
  for (var i = 0; i < n; ++i) {
    result.push(callback(a1[i], a2[i]));
  }
  return result;
}

//function __arrayDistinct(array) {
//    array = array || [];
//    var result = [];
//    for (var i = 0, j = array.length; i < j; i++) {
//        if (result.indexOf(array[i]) < 0)
//            result.push(array[i]);
//    }
//    return result;
//}

// Not yet needed
//// much faster but only works on array items with a toString method that
//// returns distinct string for distinct objects.  So this is safe for arrays with primitive
//// types but not for arrays with object types, unless toString() has been implemented.
//function arrayDistinctUnsafe(array) {
//    var o = {}, i, l = array.length, r = [];
//    for (i = 0; i < l; i += 1) {
//        var v = array[i];
//        o[v] = v;
//    }
//    for (i in o) r.push(o[i]);
//    return r;
//}

function __arrayEquals(a1, a2, equalsFn) {
  //Check if the arrays are undefined/null
  if (!a1 || !a2) return false;

  if (a1.length !== a2.length) return false;

  //go thru all the vars
  for (var i = 0; i < a1.length; i++) {
    //if the var is an array, we need to make a recursive check
    //otherwise we'll just compare the values
    if (Array.isArray(a1[i])) {
      if (!__arrayEquals(a1[i], a2[i])) return false;
    } else {
      if (equalsFn) {
        if (!equalsFn(a1[i], a2[i])) return false;
      } else {
        if (a1[i] !== a2[i]) return false;
      }
    }
  }
  return true;
}

// end of array functions

// returns and array for a source and a prop, and creates the prop if needed.
function __getArray(source, propName) {
  var arr = source[propName];
  if (!arr) {
    arr = [];
    source[propName] = arr;
  }
  return arr;
}

function __requireLib(libNames, errMessage) {
  var arrNames = libNames.split(";");
  for (var i = 0, j = arrNames.length; i < j; i++) {
    var lib = __requireLibCore(arrNames[i]);
    if (lib) return lib;
  }
  if (errMessage) {
    throw new Error("Unable to initialize " + libNames + ".  " + errMessage);
  }
}

// Returns the 'libName' module if loaded or else returns undefined
function __requireLibCore(libName) {
  var window = global.window;
  if (!window) return; // Must run in a browser. Todo: add commonjs support

  // get library from browser globals if we can
  var lib = window[libName];
  if (lib) return lib;

  // if require exists, maybe require can get it.
  // This method is synchronous so it can't load modules with AMD.
  // It can only obtain modules from require that have already been loaded.
  // Developer should bootstrap such that the breeze module
  // loads after all other libraries that breeze should find with this method
  // See documentation
  var r = window.require;
  if (r) { // if require exists
    if (r.defined) { // require.defined is not standard and may not exist
      // require.defined returns true if module has been loaded
      return r.defined(libName) ? r(libName) : undefined;
    } else {
      // require.defined does not exist so we have to call require('libName') directly.
      // The require('libName') overload is synchronous and does not load modules.
      // It throws an exception if the module isn't already loaded.
      try {
        return r(libName);
      } catch (e) {
        // require('libName') threw because module not loaded
        return;
      }
    }
  }
}

function __using(obj, property, tempValue, fn) {
  var originalValue = obj[property];
  if (tempValue === originalValue) {
    return fn();
  }
  obj[property] = tempValue;
  try {
    return fn();
  } finally {
    if (originalValue === undefined) {
      delete obj[property];
    } else {
      obj[property] = originalValue;
    }
  }
}

function __wrapExecution(startFn, endFn, fn) {
  var state;
  try {
    state = startFn();
    return fn();
  } catch (e) {
    if (typeof(state) === 'object') {
      state.error = e;
    }
    throw e;
  } finally {
    endFn(state);
  }
}

function __memoize(fn) {
  return function () {
    var args = __arraySlice(arguments),
        hash = "",
        i = args.length,
        currentArg = null;
    while (i--) {
      currentArg = args[i];
      hash += (currentArg === Object(currentArg)) ? JSON.stringify(currentArg) : currentArg;
      fn.memoize || (fn.memoize = {});
    }
    return (hash in fn.memoize) ?
           fn.memoize[hash] :
           fn.memoize[hash] = fn.apply(this, args);
  };
}

function __getUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //noinspection NonShortCircuitBooleanExpressionJS
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function __durationToSeconds(duration) {
  // basic algorithm from https://github.com/nezasa/iso8601-js-period
  if (typeof duration !== "string") throw new Error("Invalid ISO8601 duration '" + duration + "'");

  // regex splits as follows - grp0, grp1, y, m, d, grp2, h, m, s
  //                           0     1     2  3  4  5     6  7  8
  var struct = /^P((\d+Y)?(\d+M)?(\d+D)?)?(T(\d+H)?(\d+M)?(\d+S)?)?$/.exec(duration);
  if (!struct) throw new Error("Invalid ISO8601 duration '" + duration + "'");

  var ymdhmsIndexes = [2, 3, 4, 6, 7, 8]; // -> grp1,y,m,d,grp2,h,m,s
  var factors = [31104000, // year (360*24*60*60)
                 2592000,             // month (30*24*60*60)
                 86400,               // day (24*60*60)
                 3600,                // hour (60*60)
                 60,                  // minute (60)
                 1];                  // second (1)

  var seconds = 0;
  for (var i = 0; i < 6; i++) {
    var digit = struct[ymdhmsIndexes[i]];
    // remove letters, replace by 0 if not defined
    digit = digit ? +digit.replace(/[A-Za-z]+/g, '') : 0;
    seconds += digit * factors[i];
  }
  return seconds;

}

// is functions

function __noop() {
  // does nothing
}

function __identity(x) {
  return x;
}

function __classof(o) {
  if (o === null) {
    return "null";
  }
  if (o === undefined) {
    return "undefined";
  }
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}

function __isDate(o) {
  return __classof(o) === "date" && !isNaN(o.getTime());
}

function __isDateString(s) {
  // var rx = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
  var rx = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/;
  return (typeof s === "string") && rx.test(s);
}

function __isFunction(o) {
  return __classof(o) === "function";
}

function __isString(o) {
  return (typeof o === "string");
}

function __isObject(o) {
  return (typeof o === "object");
}

function __isGuid(value) {
  return (typeof value === "string") && /[a-fA-F\d]{8}-(?:[a-fA-F\d]{4}-){3}[a-fA-F\d]{12}/.test(value);
}

function __isDuration(value) {
  return (typeof value === "string") && /^(-|)?P[T]?[\d\.,\-]+[YMDTHS]/.test(value);
}

function __isEmpty(obj) {
  if (obj === null || obj === undefined) {
    return true;
  }
  for (var key in obj) {
    if (__hasOwnProperty(obj, key)) {
      return false;
    }
  }
  return true;
}

function __isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// returns true for booleans, numbers, strings and dates
// false for null, and non-date objects, functions, and arrays
function __isPrimitive(obj) {
  if (obj == null) return false;
  // true for numbers, strings, booleans and null, false for objects
  if (obj != Object(obj)) return true;
  return _isDate(obj);
}

// end of is Functions

// string functions

function __stringStartsWith(str, prefix) {
  // returns true for empty string or null prefix
  if ((!str)) return false;
  if (prefix == "" || prefix == null) return true;
  return str.indexOf(prefix, 0) === 0;
}

function __stringEndsWith(str, suffix) {
  // returns true for empty string or null suffix
  if ((!str)) return false;
  if (suffix == "" || suffix == null) return true;
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

// Based on fragment from Dean Edwards' Base 2 library
// format("a %1 and a %2", "cat", "dog") -> "a cat and a dog"
function __formatString(string) {
  var args = arguments;
  var pattern = RegExp("%([1-" + (arguments.length - 1) + "])", "g");
  return string.replace(pattern, function (match, index) {
    return args[index];
  });
}

// end of string functions

// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
function uncurry(f) {
  var call = Function.call;
  return function () {
    return call.apply(f, arguments);
  };
}

// shims

if (!Object.create) {
  Object.create = function (parent) {
    var F = function () {
    };
    F.prototype = parent;
    return new F();
  };
}

var core = {};

// not all methods above are exported
core.__isES5Supported = __isES5Supported;

core.objectForEach = __objectForEach;

core.extend = __extend;
core.propEq = __propEq;
core.pluck = __pluck;

core.arrayEquals = __arrayEquals;
core.arrayFirst = __arrayFirst;
core.arrayIndexOf = __arrayIndexOf;
core.arrayRemoveItem = __arrayRemoveItem;
core.arrayZip = __arrayZip;

core.requireLib = __requireLib;
core.using = __using;

core.memoize = __memoize;
core.getUuid = __getUuid;
core.durationToSeconds = __durationToSeconds;

core.isDate = __isDate;
core.isGuid = __isGuid;
core.isDuration = __isDuration;
core.isFunction = __isFunction;
core.isEmpty = __isEmpty;
core.isNumeric = __isNumeric;

core.stringStartsWith = __stringStartsWith;
core.stringEndsWith = __stringEndsWith;
core.formatString = __formatString;

core.getPropertyDescriptor = __getPropDescriptor;

core.toJSONSafe = __toJSONSafe;

core.parent = breeze;
breeze.core = core;


;/**
 @module core
 **/

var Param = (function () {
  // The %1 parameter
  // is required
  // must be a %2
  // must be an instance of %2
  // must be an instance of the %2 enumeration
  // must have a %2 property
  // must be an array where each element
  // is optional or

  var ctor = function (v, name) {
    this.v = v;
    this.name = name;
    this._contexts = [null];

  };
  var proto = ctor.prototype;

  proto.isObject = function () {
    return this.isTypeOf("object");
  };

  proto.isBoolean = function () {
    return this.isTypeOf('boolean');
  };

  proto.isString = function () {
    return this.isTypeOf('string');
  };

  proto.isNonEmptyString = function () {
    return addContext(this, {
      fn: isNonEmptyString,
      msg: "must be a nonEmpty string"
    });
  };

  function isNonEmptyString(context, v) {
    if (v == null) return false;
    return (typeof(v) === 'string') && v.length > 0;
  }

  proto.isNumber = function () {
    return this.isTypeOf('number');
  };

  proto.isFunction = function () {
    return this.isTypeOf('function');
  };


  proto.isTypeOf = function (typeName) {
    return addContext(this, {
      fn: isTypeOf,
      typeName: typeName,
       msg: "must be a '" + typeName + "'"
    });
  };

  function isTypeOf(context, v) {
    if (v == null) return false;
    if (typeof(v) === context.typeName) return true;
    return false;
  }

  proto.isInstanceOf = function (type, typeName) {
    typeName = typeName || type.prototype._$typeName;
    return addContext(this, {
      fn: isInstanceOf,
      type: type,
      typeName: typeName,
      msg: "must be an instance of '" + typeName + "'"
    });
  };

  function isInstanceOf(context, v) {
    if (v == null) return false;
    return (v instanceof context.type);
  }

  proto.hasProperty = function (propertyName) {
    return addContext(this, {
      fn: hasProperty,
      propertyName: propertyName,
      msg: "must have a '" + propertyName + "' property"
    });
  };

  function hasProperty(context, v) {
    if (v == null) return false;
    return (v[context.propertyName] !== undefined);
  }

  proto.isEnumOf = function (enumType) {
    return addContext(this, {
      fn: isEnumOf,
      enumType: enumType,
      msg: "must be an instance of the '" + enumType.name + "' enumeration"
    });
  };

  function isEnumOf(context, v) {
    if (v == null) return false;
    return context.enumType.contains(v);
  }

  proto.isRequired = function (allowNull) {
    return addContext(this, {
      fn: isRequired,
      allowNull: allowNull,
      msg: "is required"
    });
  };

  function isRequired(context, v) {
    if (context.allowNull) {
      return v !== undefined;
    } else {
      return v != null;
    }
  }

  // combinable methods.

  proto.isOptional = function () {
    var context = {
      fn: isOptional,
      prevContext: null,
      msg: isOptionalMessage
    };
    return addContext(this, context);
  };

  function isOptional(context, v) {
    if (v == null) return true;
    var prevContext = context.prevContext;
    if (prevContext) {
      return prevContext.fn(prevContext, v);
    } else {
      return true;
    }
  }

  function isOptionalMessage(context, v) {
    var prevContext = context.prevContext;
    var element = prevContext ? " or it " + getMessage(prevContext, v) : "";
    return "is optional" + element;
  }

  proto.isNonEmptyArray = function () {
    return this.isArray(true);
  };

  proto.isArray = function (mustNotBeEmpty) {
    var context = {
      fn: isArray,
      mustNotBeEmpty: mustNotBeEmpty,
      prevContext: null,
      msg: isArrayMessage
    };
    return addContext(this, context);
  };


  function isArray(context, v) {
    if (!Array.isArray(v)) {
      return false;
    }
    if (context.mustNotBeEmpty) {
      if (v.length === 0) return false;
    }
    // allow standalone is array call.
    var prevContext = context.prevContext;
    if (!prevContext) return true;

    return v.every(function (v1) {
      return prevContext.fn(prevContext, v1);
    });
  }

  function isArrayMessage(context, v) {
    var arrayDescr = context.mustNotBeEmpty ? "a nonEmpty array" : "an array";
    var prevContext = context.prevContext;
    var element = prevContext ? " where each element " + getMessage(prevContext, v) : "";
    return " must be " + arrayDescr + element;
  }

  function getMessage(context, v) {
    var msg = context.msg;
    if (typeof(msg) === "function") {
      msg = msg(context, v);
    }
    return msg;
  }

  proto.or = function () {
    this._contexts.push(null);
    this._context = null;
    return this;
  };

  proto.check = function (defaultValue) {
    var ok = exec(this);
    if (ok === undefined) return;
    if (!ok) {
      throw new Error(this.getMessage());
    }

    if (this.v !== undefined) {
      return this.v;
    } else {
      return defaultValue;
    }
  };

  // called from outside this file.
  proto._addContext = function (context) {
    return addContext(this, context);
  };

  function addContext(that, context) {
    if (that._context) {
      var curContext = that._context;

      while (curContext.prevContext != null) {
        curContext = curContext.prevContext;
      }

      if (curContext.prevContext === null) {
        curContext.prevContext = context;
        // just update the prevContext but don't change the curContext.
        return that;
      } else if (context.prevContext == null) {
        context.prevContext = that._context;
      } else {
        throw new Error("Illegal construction - use 'or' to combine checks");
      }
    }
    return setContext(that, context);
  }

  function setContext(that, context) {
    that._contexts[that._contexts.length - 1] = context;
    that._context = context;
    return that;
  }


  function exec(self) {
    // clear off last one if null
    var contexts = self._contexts;
    if (contexts[contexts.length - 1] == null) {
      contexts.pop();
    }
    if (contexts.length === 0) {
      return undefined;
    }
    return contexts.some(function (context) {
      return context.fn(context, self.v);
    });
  }


  proto.getMessage = function () {
    var that = this;
    var message = this._contexts.map(function (context) {
      return getMessage(context, that.v);
    }).join(", or it ");
    return __formatString(this.MESSAGE_PREFIX, this.name) + " " + message;
  };

  proto.withDefault = function (defaultValue) {
    this.defaultValue = defaultValue;
    return this;
  };

  proto.whereParam = function (propName) {
    return this.parent.whereParam(propName);
  };


  proto.applyAll = function (instance, checkOnly) {
    var parentTypeName = instance._$typeName;
    var allowUnknownProperty = (parentTypeName && this.parent.config._$typeName === parentTypeName);

    var clone = __extend({}, this.parent.config);
    this.parent.params.forEach(function (p) {
      if (!allowUnknownProperty) delete clone[p.name];
      try {
        p.check();
      } catch (e) {
        throwConfigError(instance, e.message);
      }
      (!checkOnly) && p._applyOne(instance);
    });
    // should be no properties left in the clone
    if (!allowUnknownProperty) {
      for (var key in clone) {
        // allow props with an undefined value
        if (clone[key] !== undefined) {
          throwConfigError(instance, __formatString("Unknown property: '%1'.", key));
        }
      }
    }
  };

  function throwConfigError(instance, message) {
    throw new Error(__formatString("Error configuring an instance of '%1'. %2", (instance && instance._$typeName) || "object", message));
  }

  proto._applyOne = function (instance) {
    if (this.v !== undefined) {
      instance[this.name] = this.v;
    } else {
      if (this.defaultValue !== undefined) {
        instance[this.name] = this.defaultValue;
      }
    }
  };

  proto.MESSAGE_PREFIX = "The '%1' parameter ";
  return ctor;
})();

var assertParam = function (v, name) {
  return new Param(v, name);
};

var ConfigParam = (function () {
  var ctor = function (config) {
    if (typeof(config) !== "object") {
      throw new Error("Configuration parameter should be an object, instead it is a: " + typeof(config));
    }
    this.config = config;
    this.params = [];
  };
  var proto = ctor.prototype;

  proto.whereParam = function (propName) {
    var param = new Param(this.config[propName], propName);
    param.parent = this;
    this.params.push(param);
    return param;
  };
  return ctor;
})();

var assertConfig = function (config) {
  return new ConfigParam(config);
};

// Param is exposed so that additional 'is' methods can be added to the prototype.
core.Param = Param;
core.assertParam = assertParam;
core.assertConfig = assertConfig;



;/**
@module core
**/

var Enum = (function () {

  // TODO: think about CompositeEnum (flags impl).

  /**
  Base class for all Breeze enumerations, such as EntityState, DataType, FetchStrategy, MergeStrategy etc.
  A Breeze Enum is a namespaced set of constant values.  Each Enum consists of a group of related constants, called 'symbols'.
  Unlike enums in some other environments, each 'symbol' can have both methods and properties.

  @example
      // Example of creating a new Enum
      var prototype = {
          nextDay: function () {
              var nextIndex = (this.dayIndex+1) % 7;
              return DayOfWeek.getSymbols()[nextIndex];
          }
      };

      var DayOfWeek = new Enum("DayOfWeek", prototype);
      DayOfWeek.Monday    = DayOfWeek.addSymbol( { dayIndex: 0 });
      DayOfWeek.Tuesday   = DayOfWeek.addSymbol( { dayIndex: 1 });
      DayOfWeek.Wednesday = DayOfWeek.addSymbol( { dayIndex: 2 });
      DayOfWeek.Thursday  = DayOfWeek.addSymbol( { dayIndex: 3 });
      DayOfWeek.Friday    = DayOfWeek.addSymbol( { dayIndex: 4 });
      DayOfWeek.Saturday  = DayOfWeek.addSymbol( { dayIndex: 5, isWeekend: true });
      DayOfWeek.Sunday    = DayOfWeek.addSymbol( { dayIndex: 6, isWeekend: true });
      DayOfWeek.resolveSymbols();

      // custom methods
      ok(DayOfWeek.Monday.nextDay() === DayOfWeek.Tuesday);
      ok(DayOfWeek.Sunday.nextDay() === DayOfWeek.Monday);
      // custom properties
      ok(DayOfWeek.Tuesday.isWeekend === undefined);
      ok(DayOfWeek.Saturday.isWeekend == true);
      // Standard enum capabilities
      ok(DayOfWeek instanceof Enum);
      ok(Enum.isSymbol(DayOfWeek.Wednesday));
      ok(DayOfWeek.contains(DayOfWeek.Thursday));
      ok(DayOfWeek.Tuesday.parentEnum == DayOfWeek);
      ok(DayOfWeek.getSymbols().length === 7);
      ok(DayOfWeek.Friday.toString() === "Friday");


  @class Enum
  **/

  /**
  Enum constructor - may be used to create new Enums.
  @example
      var prototype = {
          nextDay: function () {
              var nextIndex = (this.dayIndex+1) % 7;
              return DayOfWeek.getSymbols()[nextIndex];
          }
      };

      var DayOfWeek = new Enum("DayOfWeek", prototype);
  @method <ctor> Enum
  @param name {String}
  @param [methodObj] {Object}
  **/

  var ctor = function Enum(name, methodObj) {
    this.name = name;
    var prototype = new EnumSymbol(methodObj);
    prototype.parentEnum = this;
    this._symbolPrototype = prototype;
    if (methodObj) {
      Object.keys(methodObj).forEach(function (key) {
        prototype[key] = methodObj[key];
      });
    }
  };
  var proto = ctor.prototype;

  /**
  Checks if an object is an Enum 'symbol'.
  @example
      if (Enum.isSymbol(DayOfWeek.Wednesday)) {
        // do something ...
      };
  @method isSymbol
  @return {Boolean}
  @static
  **/
  ctor.isSymbol = function (obj) {
    return obj instanceof EnumSymbol;
  };

  /**
  Returns an Enum symbol given its name.
  @example
      var dayOfWeek = DayOfWeek.from("Thursday");
      // nowdayOfWeek === DayOfWeek.Thursday
  @method fromName
  @param name {String} Name for which an enum symbol should be returned.
  @return {EnumSymbol} The symbol that matches the name or 'undefined' if not found.
  **/
  proto.fromName = function (name) {
    return this[name];
  };

  /**
  Adds a new symbol to an Enum.
  @example
      var DayOfWeek = new Enum("DayOfWeek", prototype);
      DayOfWeek.Monday    = DayOfWeek.addSymbol( { dayIndex: 0 });
  @method addSymbol
  @param [propertiesObj] {Object} A collection of properties that should be added to the new symbol.
  In other words, the 'propertiesObj' is any state that should be held by the symbol.
  @return {EnumSymbol} The new symbol
  **/
  proto.addSymbol = function (propertiesObj) {
    // TODO: check if sealed.
    var newSymbol = Object.create(this._symbolPrototype);
    if (propertiesObj) {
      Object.keys(propertiesObj).forEach(function (key) {
        newSymbol[key] = propertiesObj[key];
      });
    }
    setTimeout(function () {
      newSymbol.getName();
    }, 0);
    return newSymbol;
  };

  /**
  Seals this enum so that no more symbols may be added to it. This should only be called after all symbols
  have already been added to the Enum.
  @example
      DayOfWeek.resolveSymbols();
  @method resolveSymbols
  **/
  proto.resolveSymbols = function () {
    this.getSymbols().forEach(function (sym) {
      return sym.getName();
    });
  };

  //// TODO: remove or rethink this.
  //Enum.prototype.combineSymbols = function () {
  //    var proto = this._symbolPrototype;
  //    var newSymbol = Object.create(proto);
  //    newSymbol._symbols = __arraySlice(arguments);

  //    Object.keys(proto).forEach(function (key) {
  //        var result;
  //        var oldMethod = proto[key];
  //        if (__isFunction(oldMethod)) {
  //            var newMethod = function () {

  //                if (this._symbols) {
  //                    result = this._symbols.map(function (sym) {
  //                        return oldMethod.apply(sym);
  //                    });
  //                } else {
  //                    result = oldMethod.apply(this);
  //                }
  //                return result;
  //            };
  //            proto[key] = newMethod;
  //        }
  //    });
  //    return newSymbol;
  //};

  /**
  Returns all of the symbols contained within this Enum.
  @example
      var symbols = DayOfWeek.getSymbols();
  @method getSymbols
  @return {Array of EnumSymbol} All of the symbols contained within this Enum.
  **/
  proto.getSymbols = function () {
    return this.getNames().map(function (key) {
      return this[key];
    }, this);
  };

  /**
  Returns the names of all of the symbols contained within this Enum.
  @example
      var symbols = DayOfWeek.getNames();
  @method getNames
  @return {Array of String} All of the names of the symbols contained within this Enum.
  **/
  proto.getNames = function () {
    var result = [];
    for (var key in this) {
      if (this.hasOwnProperty(key)) {
        if (key !== "name" && key.substr(0, 1) !== "_" && !__isFunction(this[key])) {
          result.push(key);
        }
      }
    }
    return result;
  };

  /**
  Returns whether an Enum contains a specified symbol.
  @example
      var symbol = DayOfWeek.Friday;
      if (DayOfWeek.contains(symbol)) {
          // do something
      }
  @method contains
  @param {Object} Object or symbol to test.
  @return {Boolean} Whether this Enum contains the specified symbol.
  **/
  proto.contains = function (sym) {
    if (!(sym instanceof EnumSymbol)) {
      return false;
    }
    return this[sym.getName()] === sym;
  };

  /**
  One of the constant values that is generated by the {{#crossLink "Enum"}}{{/crossLink}} "addSymbol" method.  EnumSymbols should ONLY be created via
  the Enum.addSymbol method.
  @example
      var DayOfWeek = new Enum("DayOfWeek");
      DayOfWeek.Monday    = DayOfWeek.addSymbol();
  @class EnumSymbol
  **/

  function EnumSymbol() {
  }

  /**
  The {{#crossLink "Enum"}}{{/crossLink}} to which this symbol belongs.
  __readOnly__
  @property parentEnum {Enum}
  **/

  /**
  Returns the name of this symbol.
  @example
      var name = DayOfWeek.Monday.getName();
      // name === "Monday"
  @method getName
  **/
  EnumSymbol.prototype.getName = function () {
    if (!this.name) {
      var that = this;
      this.name = __arrayFirst(this.parentEnum.getNames(), function (name) {
        return that.parentEnum[name] === that;
      });
    }
    return this.name;
  };

  /**
  Same as the getName method. Returns the name of this symbol.
  @example
      var name = DayOfWeek.Monday.toString();
      // name === "Monday"
  @method toString
  **/
  EnumSymbol.prototype.toString = function () {
    return this.getName();
  };

  EnumSymbol.prototype.toJSON = function () {
    return {
      _$typeName: this.parentEnum.name,
      name: this.name
    };
  };

  return ctor;
})();
core.Enum = Enum;


;/**
@module core
**/

var Event = (function () {

  var __eventNameMap = {};
  var __nextUnsubKey = 1;

  /**
  Class to support basic event publication and subscription semantics.
  @class Event
  **/

  /**
  Constructor for an Event
  @example
      salaryEvent = new Event("salaryEvent", person);
  @method <ctor> Event
  @param name {String}
  @param publisher {Object} The object that will be doing the publication. i.e. the object to which this event is attached.
  @param [defaultErrorCallback] {Function} If omitted then subscriber notification failures will be ignored.

  errorCallback([e])
  @param [defaultErrorCallback.e] {Error} Any error encountered during subscription execution.
  **/

  var ctor = function Event(name, publisher, defaultErrorCallback) {
    assertParam(name, "eventName").isNonEmptyString().check();
    assertParam(publisher, "publisher").isObject().check();

    this.name = name;
    // register the name
    __eventNameMap[name] = true;
    this.publisher = publisher;
    if (defaultErrorCallback) {
      this._defaultErrorCallback = defaultErrorCallback;
    }
  };
  var proto = ctor.prototype;

  /**
  Publish data for this event.
  @example
      // Assume 'salaryEvent' is previously constructed Event
      salaryEvent.publish( { eventType: "payRaise", amount: 100 });
  This event can also be published asychronously
  @example
      salaryEvent.publish( { eventType: "payRaise", amount: 100 }, true);
  And we can add a handler in case the subscriber 'mishandles' the event.
  @example
      salaryEvent.publish( { eventType: "payRaise", amount: 100 }, true, function(error) {
          // do something with the 'error' object
      });
  @method publish
  @param data {Object} Data to publish
  @param [publishAsync=false] {Boolean} Whether to publish asynchonously or not.
  @param [errorCallback] {Function} Will be called for any errors that occur during publication. If omitted,
  errors will be eaten.

  errorCallback([e])
  @param [errorCallback.e] {Error} Any error encountered during publication execution.
  @return {Boolean} false if event is disabled; true otherwise.
  **/
  proto.publish = function (data, publishAsync, errorCallback) {

    if (!ctor._isEnabled(this.name, this.publisher)) return false;

    if (publishAsync === true) {
      setTimeout(publishCore, 0, this, data, errorCallback);
    } else {
      publishCore(this, data, errorCallback);
    }
    return true;
  };

  function publishCore(that, data, errorCallback) {
    var subscribers = that._subscribers;
    if (!subscribers) return true;
    // subscribers from outer scope.
    subscribers.forEach(function (s) {
      try {
        s.callback(data);
      } catch (e) {
        e.context = "unable to publish on topic: " + that.name;
        if (errorCallback) {
          errorCallback(e);
        } else if (that._defaultErrorCallback) {
          that._defaultErrorCallback(e);
        } else {
          fallbackErrorHandler(e);
        }
      }
    });
  }

  /**
  Publish data for this event asynchronously.
  @example
      // Assume 'salaryEvent' is previously constructed Event
      salaryEvent.publishAsync( { eventType: "payRaise", amount: 100 });
  And we can add a handler in case the subscriber 'mishandles' the event.
  @example
      salaryEvent.publishAsync( { eventType: "payRaise", amount: 100 }, function(error) {
          // do something with the 'error' object
      });
  @method publishAsync
  @param data {Object} Data to publish
  @param [errorCallback] {Function} Will be called for any errors that occur during publication. If omitted,
  errors will be eaten.

  errorCallback([e])
  @param [errorCallback.e] {Error} Any error encountered during publication execution.
  **/
  proto.publishAsync = function (data, errorCallback) {
    this.publish(data, true, errorCallback);
  };

  /**
  Subscribe to this event.
  @example
      // Assume 'salaryEvent' is previously constructed Event
      salaryEvent.subscribe(function (eventArgs) {
          if (eventArgs.eventType === "payRaise") {
              // do something
          }
      });
  There are several built in Breeze events, such as EntityAspect.propertyChanged, EntityAspect.validationErrorsChanged as well.
  @example
      // Assume order is a preexisting 'order' entity
      order.entityAspect.propertyChanged.subscribe(function (pcEvent) {
          if ( pcEvent.propertyName === "OrderDate") {
              // do something
          }
      });
  @method subscribe
  @param [callback] {Function} Will be called whenever 'data' is published for this event.

  callback([data])
  @param [callback.data] {Object} Whatever 'data' was published.  This should be documented on the specific event.
  @return {Number} This is a key for 'unsubscription'.  It can be passed to the 'unsubscribe' method.
  **/
  proto.subscribe = function (callback) {
    if (!this._subscribers) {
      this._subscribers = [];
    }

    var unsubKey = __nextUnsubKey;
    this._subscribers.push({ unsubKey: unsubKey, callback: callback });
    ++__nextUnsubKey;
    return unsubKey;
  };

  /**
  Unsubscribe from this event.
  @example
      // Assume order is a preexisting 'order' entity
      var token = order.entityAspect.propertyChanged.subscribe(function (pcEvent) {
              // do something
      });
      // sometime later
      order.entityAspect.propertyChanged.unsubscribe(token);
  @method unsubscribe
  @param unsubKey {Number} The value returned from the 'subscribe' method may be used to unsubscribe here.
  @return {Boolean} Whether unsubscription occured. This will return false if already unsubscribed or if the key simply
  cannot be found.
  **/
  proto.unsubscribe = function (unsubKey) {
    if (!this._subscribers) return false;
    var subs = this._subscribers;
    var ix = __arrayIndexOf(subs, function (s) {
      return s.unsubKey === unsubKey;
    });
    if (ix !== -1) {
      subs.splice(ix, 1);
      if (subs.length === 0) {
        this._subscribers = null;
      }
      return true;
    } else {
      return false;
    }
  };

  proto.clear = function () {
    this._subscribers = null;
  };

  // event bubbling - document later.
  ctor.bubbleEvent = function (target, getParentFn) {
    target._getEventParent = getParentFn;
  };

  /**
  Enables or disables the named event for an object and all of its children.
  @example
      Event.enable(“propertyChanged”, myEntityManager, false)
  will disable all EntityAspect.propertyChanged events within a EntityManager.
  @example
      Event.enable(“propertyChanged”, myEntityManager, true)
  will enable all EntityAspect.propertyChanged events within a EntityManager.
  @example
      Event.enable(“propertyChanged”, myEntity.entityAspect, false)
  will disable EntityAspect.propertyChanged events for a specific entity.
  @example
      Event.enable(“propertyChanged”, myEntity.entityAspect, null)
  will removes any enabling / disabling at the entity aspect level so now any 'Event.enable' calls at the EntityManager level,
  made either previously or in the future, will control notification.
  @example
      Event.enable(“validationErrorsChanged”, myEntityManager, function(em) {
          return em.customTag === “blue”;
      })
  will either enable or disable myEntityManager based on the current value of a ‘customTag’ property on myEntityManager.
  Note that this is dynamic, changing the customTag value will cause events to be enabled or disabled immediately.
  @method enable
  @static
  @param eventName {String} The name of the event.
  @param target {Object} The object at which enabling or disabling will occur.  All event notifications that occur to this object or
  children of this object will be enabled or disabled.
  @param isEnabled {Boolean|null|Function} A boolean, a null or a function that returns either a boolean or a null.
  **/
  ctor.enable = function (eventName, obj, isEnabled) {
    assertParam(eventName, "eventName").isNonEmptyString().check();
    assertParam(obj, "obj").isObject().check();
    assertParam(isEnabled, "isEnabled").isBoolean().isOptional().or().isFunction().check();
    if (!obj._$eventMap) {
      obj._$eventMap = {};
    }
    obj._$eventMap[eventName] = isEnabled;
  };


  /**
  Returns whether for a specific event and a specific object and its children, notification is enabled or disabled or not set.
  @example
      Event.isEnabled(“propertyChanged”, myEntityManager)

  @method isEnabled
  @static
  @param eventName {String} The name of the event.
  @param target {Object} The object for which we want to know if notifications are enabled.
  @return {Boolean|null} A null is returned if this value has not been set.
  **/
  ctor.isEnabled = function (eventName, obj) {
    assertParam(eventName, "eventName").isNonEmptyString().check();
    assertParam(obj, "obj").isObject().check();
    // null is ok - it just means that the object is at the top level.
    if (obj._getEventParent === undefined) {
      throw new Error("This object does not support event enabling/disabling");
    }
    // return ctor._isEnabled(getFullEventName(eventName), obj);
    return ctor._isEnabled(eventName, obj);
  };

  ctor._isEnabled = function (eventName, obj) {
    var isEnabled = null;
    var eventMap = obj._$eventMap;
    if (eventMap) {
      isEnabled = eventMap[eventName];
    }
    if (isEnabled != null) {
      if (typeof isEnabled === 'function') {
        return isEnabled(obj);
      } else {
        return !!isEnabled;
      }
    } else {
      var parent = obj._getEventParent && obj._getEventParent();
      if (parent) {
        return ctor._isEnabled(eventName, parent);
      } else {
        // default if not explicitly disabled.
        return true;
      }
    }
  };

  function fallbackErrorHandler(e) {
    // TODO: maybe log this
    // for now do nothing;
  }

  return ctor;

})();

core.Event = Event;;/**
@module breeze
**/

var __config = (function () {

  // alias for within fns with a config param
  var __config = {};

  __config.functionRegistry = {};
  __config.typeRegistry = {};
  __config.objectRegistry = {};
  __config.interfaceInitialized = new Event("interfaceInitialized", __config);

  var InterfaceDef = function (name) {
    this.name = name;
    this.defaultInstance = null;
    this._implMap = {};
  };

  InterfaceDef.prototype.registerCtor = function (adapterName, ctor) {
    this._implMap[adapterName.toLowerCase()] = { ctor: ctor, defaultInstance: null };
  };
  InterfaceDef.prototype.getImpl = function (adapterName) {
    return this._implMap[adapterName.toLowerCase()];
  };
  InterfaceDef.prototype.getFirstImpl = function () {
    var kv = __objectFirst(this._implMap, function () {
      return true;
    });
    return kv ? kv.value : null;
  };

  __config.interfaceRegistry = {
    ajax: new InterfaceDef("ajax"),
    modelLibrary: new InterfaceDef("modelLibrary"),
    dataService: new InterfaceDef("dataService"),
    uriBuilder: new InterfaceDef("uriBuilder")
  };

  __config.interfaceRegistry.modelLibrary.getDefaultInstance = function () {
    if (!this.defaultInstance) {
      throw new Error("Unable to locate the default implementation of the '" + this.name +
          "' interface.  Possible options are 'ko', 'backingStore' or 'backbone'. See the breeze.config.initializeAdapterInstances method.");
    }
    return this.defaultInstance;
  };

  /**
  A singleton object that is the repository of all configuration options.
  @example
      config.initializeAdapterInstance( {
          modelLibrary: "ko",
          dataService: "webApi"
      });

  @class config
  **/

  /**
  This method is now OBSOLETE.  Use the "initializeAdapterInstances" to accomplish the same result.
  @method setProperties
  @deprecated
  @param config {Object}
  @param [config.remoteAccessImplementation] { implementation of remoteAccess-interface }
  @param [config.trackingImplementation] { implementation of entityTracking-interface }
  @param [config.ajaxImplementation] {implementation of ajax-interface }
  **/
  __config.setProperties = function (config) {
    assertConfig(config)
        .whereParam("remoteAccessImplementation").isOptional()
        .whereParam("trackingImplementation").isOptional()
        .whereParam("ajaxImplementation").isOptional()
        .applyAll(config);
    if (config.remoteAccessImplementation) {
      __config.initializeAdapterInstance("dataService", config.remoteAccessImplementation);
    }
    if (config.trackingImplementation) {
      // note the name change
      __config.initializeAdapterInstance("modelLibrary", config.trackingImplementation);
    }
    if (config.ajaxImplementation) {
      __config.initializeAdapterInstance("ajax", config.ajaxImplementation);
    }
  };

  /**
  Method use to register implementations of standard breeze interfaces.  Calls to this method are usually
  made as the last step within an adapter implementation.
  @method registerAdapter
  @param interfaceName {String} - one of the following interface names "ajax", "dataService" or "modelLibrary"
  @param adapterCtor {Function} - an ctor function that returns an instance of the specified interface.
  **/
  __config.registerAdapter = function (interfaceName, adapterCtor) {
    assertParam(interfaceName, "interfaceName").isNonEmptyString().check();
    assertParam(adapterCtor, "adapterCtor").isFunction().check();
    // this impl will be thrown away after the name is retrieved.
    var impl = new adapterCtor();
    var implName = impl.name;
    if (!implName) {
      throw new Error("Unable to locate a 'name' property on the constructor passed into the 'registerAdapter' call.");
    }
    var idef = getInterfaceDef(interfaceName);
    idef.registerCtor(implName, adapterCtor);

  };

  /**
  Returns the ctor function used to implement a specific interface with a specific adapter name.
  @method getAdapter
  @param interfaceName {String} One of the following interface names "ajax", "dataService" or "modelLibrary"
  @param [adapterName] {String} The name of any previously registered adapter. If this parameter is omitted then
  this method returns the "default" adapter for this interface. If there is no default adapter, then a null is returned.
  @return {Function|null} Returns either a ctor function or null.
  **/
  __config.getAdapter = function (interfaceName, adapterName) {
    var idef = getInterfaceDef(interfaceName);
    if (adapterName) {
      var impl = idef.getImpl(adapterName);
      return impl ? impl.ctor : null;
    } else {
      return idef.defaultInstance ? idef.defaultInstance._$impl.ctor : null;
    }
  };

  /**
  Initializes a collection of adapter implementations and makes each one the default for its corresponding interface.
  @method initializeAdapterInstances
  @param config {Object}
  @param [config.ajax] {String} - the name of a previously registered "ajax" adapter
  @param [config.dataService] {String} - the name of a previously registered "dataService" adapter
  @param [config.modelLibrary] {String} - the name of a previously registered "modelLibrary" adapter
  @param [config.uriBuilder] {String} - the name of a previously registered "uriBuilder" adapter
  @return [array of instances]
  **/
  __config.initializeAdapterInstances = function (config) {
    assertConfig(config)
        .whereParam("dataService").isOptional()
        .whereParam("modelLibrary").isOptional()
        .whereParam("ajax").isOptional()
        .whereParam("uriBuilder").isOptional()
        .applyAll(this, false);
    return __objectMap(config, __config.initializeAdapterInstance);

  };

  /**
  Initializes a single adapter implementation. Initialization means either newing a instance of the
  specified interface and then calling "initialize" on it or simply calling "initialize" on the instance
  if it already exists.
  @method initializeAdapterInstance
  @param interfaceName {String} The name of the interface to which the adapter to initialize belongs.
  @param adapterName {String} - The name of a previously registered adapter to initialize.
  @param [isDefault=true] {Boolean} - Whether to make this the default "adapter" for this interface.
  @return {an instance of the specified adapter}
  **/
  __config.initializeAdapterInstance = function (interfaceName, adapterName, isDefault) {
    isDefault = isDefault === undefined ? true : isDefault;
    assertParam(interfaceName, "interfaceName").isNonEmptyString().check();
    assertParam(adapterName, "adapterName").isNonEmptyString().check();
    assertParam(isDefault, "isDefault").isBoolean().check();

    var idef = getInterfaceDef(interfaceName);
    var impl = idef.getImpl(adapterName);
    if (!impl) {
      throw new Error("Unregistered adapter.  Interface: " + interfaceName + " AdapterName: " + adapterName);
    }

    return initializeAdapterInstanceCore(idef, impl, isDefault);
  };

  /**
  Returns the adapter instance corresponding to the specified interface and adapter names.
  @method getAdapterInstance
  @param interfaceName {String} The name of the interface.
  @param [adapterName] {String} - The name of a previously registered adapter.  If this parameter is
  omitted then the default implementation of the specified interface is returned. If there is
  no defaultInstance of this interface, then the first registered instance of this interface is returned.
  @return {an instance of the specified adapter}
  **/
  __config.getAdapterInstance = function (interfaceName, adapterName) {
    var idef = getInterfaceDef(interfaceName);
    var impl;

    var isDefault = adapterName == null || adapterName == "";
    if (isDefault) {
      if (idef.defaultInstance) return idef.defaultInstance;
      impl = idef.getFirstImpl();
    } else {
      impl = idef.getImpl(adapterName);
    }
    if (!impl) return null;
    if (impl.defaultInstance) {
      return impl.defaultInstance;
    } else {
      return initializeAdapterInstanceCore(idef, impl, isDefault);
    }
  };

  // this is needed for reflection purposes when deserializing an object that needs a fn or ctor
  // used to register validators.
  __config.registerFunction = function (fn, fnName) {
    assertParam(fn, "fn").isFunction().check();
    assertParam(fnName, "fnName").isString().check();
    fn.prototype._$fnName = fnName;
    __config.functionRegistry[fnName] = fn;
  };

  __config.getRegisteredFunction = function (fnName) {
    return __config.functionRegistry[fnName];
  };

  __config._storeObject = function (obj, type, name) {
    // uncomment this if we make this public.
    //assertParam(obj, "obj").isObject().check();
    //assertParam(name, "objName").isString().check();
    var key = (typeof(type) === "string" ? type : type.prototype._$typeName) + "." + name;
    __config.objectRegistry[key] = obj;
  };

  __config._fetchObject = function (type, name) {
    if (!name) return undefined;
    var key = (typeof(type) === "string" ? type : type.prototype._$typeName) + "." + name;
    var result = __config.objectRegistry[key];
    if (!result) {
      throw new Error("Unable to locate a registered object by the name: " + key);
    }
    return result;
  };

  __config.registerType = function (ctor, typeName) {
    assertParam(ctor, "ctor").isFunction().check();
    assertParam(typeName, "typeName").isString().check();
    ctor.prototype._$typeName = typeName;
    __config.typeRegistry[typeName] = ctor;
  };

  __config.stringifyPad = '';

  function initializeAdapterInstanceCore(interfaceDef, impl, isDefault) {
    var instance = impl.defaultInstance;
    if (!instance) {
      instance = new (impl.ctor)();
      impl.defaultInstance = instance;
      instance._$impl = impl;
    }

    instance.initialize();

    if (isDefault) {
      // next line needs to occur before any recomposition
      interfaceDef.defaultInstance = instance;
    }

    // recomposition of other impls will occur here.
    __config.interfaceInitialized.publish({ interfaceName: interfaceDef.name, instance: instance, isDefault: true });

    if (instance.checkForRecomposition) {
      // now register for own dependencies.
      __config.interfaceInitialized.subscribe(function (interfaceInitializedArgs) {
        instance.checkForRecomposition(interfaceInitializedArgs);
      });
    }

    return instance;
  }

  function getInterfaceDef(interfaceName) {
    var lcName = interfaceName.toLowerCase();
    // source may be null
    var kv = __objectFirst(__config.interfaceRegistry || {}, function (k, v) {
      return k.toLowerCase() === lcName;
    });
    if (!kv) {
      throw new Error("Unknown interface name: " + interfaceName);
    }
    return kv.value;
  }

  return __config;
})();

var __modelLibraryDef = __config.interfaceRegistry.modelLibrary;

// legacy
core.config = __config;

breeze.config = __config;;var observableArray = (function () {

  var mixin = {};
  mixin.push = function () {
    if (this._inProgress) {
      return -1;
    }

    var goodAdds = this._getGoodAdds(__arraySlice(arguments));
    if (!goodAdds.length) {
      return this.length;
    }
    this._beforeChange();
    var result = Array.prototype.push.apply(this, goodAdds);
    processAdds(this, goodAdds);
    return result;
  };

  mixin._push = function () {
    if (this._inProgress) {
      return -1;
    }
    var goodAdds = __arraySlice(arguments);
    this._beforeChange();
    var result = Array.prototype.push.apply(this, goodAdds);
    processAdds(this, goodAdds);
    return result;
  };

  mixin.unshift = function () {
    var goodAdds = this._getGoodAdds(__arraySlice(arguments));
    if (!goodAdds.length) {
      return this.length;
    }
    this._beforeChange();
    var result = Array.prototype.unshift.apply(this, goodAdds);
    processAdds(this, __arraySlice(goodAdds));
    return result;
  };

  mixin.pop = function () {
    this._beforeChange();
    var result = Array.prototype.pop.apply(this);
    processRemoves(this, [result]);
    return result;
  };

  mixin.shift = function () {
    this._beforeChange();
    var result = Array.prototype.shift.apply(this);
    processRemoves(this, [result]);
    return result;
  };

  mixin.splice = function () {
    var goodAdds = this._getGoodAdds(__arraySlice(arguments, 2));
    var newArgs = __arraySlice(arguments, 0, 2).concat(goodAdds);
    this._beforeChange();
    var result = Array.prototype.splice.apply(this, newArgs);
    processRemoves(this, result);

    if (goodAdds.length) {
      processAdds(this, goodAdds);
    }
    return result;
  };

  mixin.getEntityAspect = function () {
    return this.parent.entityAspect || this.parent.complexAspect.getEntityAspect();
  }

  mixin._getEventParent = function () {
    return this.getEntityAspect();
  };

  mixin._getPendingPubs = function () {
    var em = this.getEntityAspect().entityManager;
    return em && em._pendingPubs;
  };

  mixin._beforeChange = function () {
    // default is to do nothing
  };

  function updateEntityState(obsArray) {
    var entityAspect = obsArray.getEntityAspect();
    if (entityAspect.entityState.isUnchanged()) {
      entityAspect.setModified();
    }
    if (entityAspect.entityState.isModified() && !obsArray._origValues) {
      obsArray._origValues = obsArray.slice(0);
    }
  }

  function processAdds(obsArray, adds) {
    obsArray._processAdds(adds);
    // this is referencing the name of the method on the complexArray not the name of the event
    //var args = { added: adds };
    //args[obsArray._typeName] = obsArray;
    publish(obsArray, "arrayChanged", { array: obsArray, added: adds });
  }

  function processRemoves(obsArray, removes) {
    obsArray._processRemoves(removes);
    // this is referencing the name of the method on the array not the name of the event
    publish(obsArray, "arrayChanged", { array: obsArray, removed: removes });
  }

  function publish(publisher, eventName, eventArgs) {
    var pendingPubs = publisher._getPendingPubs();
    if (pendingPubs) {
      if (!publisher._pendingArgs) {
        publisher._pendingArgs = eventArgs;
        pendingPubs.push(function () {
          publisher[eventName].publish(publisher._pendingArgs);
          publisher._pendingArgs = null;
        });
      } else {
        combineArgs(publisher._pendingArgs, eventArgs);
      }
    } else {
      publisher[eventName].publish(eventArgs);
    }
  }

  function combineArgs(target, source) {
    for (var key in source) {
      if (key !== "array" && target.hasOwnProperty(key)) {
        var sourceValue = source[key];
        var targetValue = target[key];
        if (targetValue) {
          if (!Array.isArray(targetValue)) {
            throw new Error("Cannot combine non array args");
          }
          Array.prototype.push.apply(targetValue, sourceValue);
        } else {
          target[key] = sourceValue;
        }
      }
    }
  }

  function initializeParent(obsArray, parent, parentProperty) {
    obsArray.parent = parent;
    obsArray.parentProperty = parentProperty;
  }


  return {
    mixin: mixin,
    publish: publish,
    updateEntityState: updateEntityState,
    initializeParent: initializeParent
  };


})();;/**
@module breeze
**/

var Validator = (function () {

  var INT16_MIN = -32768;
  var INT16_MAX = 32767;

  var INT32_MIN = -2147483648;
  var INT32_MAX = 2147483647;

  var BYTE_MIN = 0;
  var BYTE_MAX = 255;

  // add common props and methods for every validator 'context' here.
  var rootContext = {
    displayName: function (context) {
      if (context.property) {
        return context.property.resolveProperty("displayName") || context.propertyName || context.property.name;
      } else {
        return "Value";
      }
    }
  };

  /**
  Instances of the Validator class provide the logic to validate another object and provide a description of any errors
  encountered during the validation process.  They are typically associated with a 'validators' property on the following types: {{#crossLink "EntityType"}}{{/crossLink}},
  {{#crossLink "DataProperty"}}{{/crossLink}} or {{#crossLink "NavigationProperty"}}{{/crossLink}}.

  A number of property level validators are registered automatically, i.e added to each DataProperty.validators property
  based on {{#crossLink "DataProperty"}}{{/crossLink}} metadata.  For example,

  - DataProperty.dataType -> one of the 'dataType' validator methods such as Validator.int64, Validator.date, Validator.bool etc.
  - DataProperty.maxLength -> Validator.maxLength
  - DataProperty.isNullable -> Validator.required (if not nullable)

  @class Validator
  **/

  /**
  Validator constructor - This method is used to create create custom validations.  Several
  basic "Validator" construction methods are also provided as static methods to this class. These methods
  provide a simpler syntax for creating basic validations.

  Many of these stock validators are inspired by and implemented to conform to the validators defined at
  http://msdn.microsoft.com/en-us/library/system.componentmodel.dataannotations.aspx

  Sometimes a custom validator will be required.
  @example
  Most validators will be 'property' level validators, like this.
  @example
      // v is this function is the value to be validated, in this case a "country" string.
      var valFn = function (v) {
          if (v == null) return true;
          return (core.stringStartsWith(v, "US"));
      };
      var countryValidator = new Validator("countryIsUS", valFn, {
          displayName: "Country", 
          messageTemplate: "'%displayName%' must start with 'US'" 
      });

      // Now plug it into Breeze.
      // Assume em1 is a preexisting EntityManager.
      var custType = metadataStore.getEntityType("Customer");
      var countryProp = custType.getProperty("Country");
      // Note that validator is added to a 'DataProperty' validators collection.
      prop.validators.push(countryValidator);
  Entity level validators are also possible
  @example
      function isValidZipCode(value) {
          var re = /^\d{5}([\-]\d{4})?$/;
          return (re.test(value));
      }

      // v in this case will be a Customer entity
      var valFn = function (v) {
          // This validator only validates US Zip Codes.
          if ( v.getProperty("Country") === "USA") {
              var postalCode = v.getProperty("PostalCode");
              return isValidZipCode(postalCode);
          }
          return true;
      };
      var zipCodeValidator = new Validator("zipCodeValidator", valFn,
          { messageTemplate: "For the US, this is not a valid PostalCode" });

      // Now plug it into Breeze.
      // Assume em1 is a preexisting EntityManager.
      var custType = em1.metadataStore.getEntityType("Customer");
      // Note that validator is added to an 'EntityType' validators collection.
      custType.validators.push(zipCodeValidator);
  What is commonly needed is a way of creating a parameterized function that will itself
  return a new Validator.  This requires the use of a 'context' object.
  @example
      // create a function that will take in a config object
      // and will return a validator
      var numericRangeValidator = function(context) {
          var valFn = function(v, ctx) {
              if (v == null) return true;
              if (typeof(v) !== "number") return false;
              if (ctx.min != null && v < ctx.min) return false;
              if (ctx.max != null && v > ctx.max) return false;
              return true;
          };
          // The last parameter below is the 'context' object that will be passed into the 'ctx' parameter above
          // when this validator executes. Several other properties, such as displayName will get added to this object as well.
          return new Validator("numericRange", valFn, {
              messageTemplate: "'%displayName%' must be a number between the values of %min% and %max%",
              min: context.min,
              max: context.max
          });
      };
      // Assume that freightProperty is a DataEntityProperty that describes numeric values.
      // register the validator
      freightProperty.validators.push(numericRangeValidator({ min: 100, max: 500 }));

  Breeze substitutes context values and functions for the tokens in the messageTemplate when preparing the runtime error message;
  'displayName' is a pre-defined context function that is always available.

  Please note that Breeze substitutes the empty string for falsey parameters. That usually works in your favor.
  Sometimes it doesn't as when the 'min' value is zero in which case the message text would have a hole
  where the 'min' value goes, saying: "... an integer between the values of and ...". That is not what you want.

  To avoid this effect, you may can bake certain of the context values into the 'messageTemplate' itself
  as shown in this revision to the pertinent part of the previous example:
  @example
      // ... as before
      // ... but bake the min/max values into the message template.
      var template = breeze.core.formatString(
          "'%displayName%' must be a number between the values of %1 and %2",
          context.min, context.max);
      return new Validator("numericRange", valFn, {
          messageTemplate: template,
          min: context.min,
          max: context.max
      });

  @method <ctor> Validator
  @param name {String} The name of this validator.
  @param validatorFn {Function} A function to perform validation.

  validatorFn(value, context)
  @param validatorFn.value {Object} Value to be validated
  @param validatorFn.context {Object} The same context object passed into the constructor with the following additional properties if not
  otherwise specified.
  @param validatorFn.context.value {Object} The value being validated.
  @param validatorFn.context.name {String} The name of the validator being executed.
  @param validatorFn.context.displayName {String} This will be either the value of the property's 'displayName' property or
  the value of its 'name' property or the string 'Value'
  @param validatorFn.context.messageTemplate {String} This will either be the value of Validator.messageTemplates[ {this validators name}] or null. Validator.messageTemplates
  is an object that is keyed by validator name and that can be added to in order to 'register' your own message for a given validator.
  The following property can also be specified for any validator to force a specific errorMessage string
  @param [validatorFn.context.message] {String} If this property is set it will be used instead of the 'messageTemplate' property when an
  error message is generated.

  @param [context] {Object} A free form object whose properties will made available during the validation and error message creation process.
  This object will be passed into the Validator's validation function whenever 'validate' is called. See above for a description
  of additional properties that will be automatically added to this object if not otherwise specified.
  **/
  var ctor = function Validator(name, valFn, context) {
    // _baseContext is what will get serialized
    this._baseContext = context || {};
    this._baseContext.name = name;
    context = __extend(Object.create(rootContext), this._baseContext);
    context.messageTemplate = context.messageTemplate || ctor.messageTemplates[name];
    this.name = name;
    this.valFn = valFn;
    this.context = context;
  };
  var proto = ctor.prototype;
  proto._$typeName = "Validator";

  /**
  The name of this validator.

  __readOnly__
  @property name {String}
  **/

  /**
  The context for this validator.

  This object will typically contain at a minimum the following properties. "name", "displayName", and "message" or "messageTemplate".
  __readOnly__
  @property context {Object}
  **/


  /**
  Run this validator against the specified value.  This method will usually be called internally either
  automatically by an property change, entity attach, query or save operation, or manually as a result of
  a validateEntity call on the EntityAspect. The resulting ValidationResults are available via the
  EntityAspect.getValidationErrors method.

  However, you can also call a validator directly either for testing purposes or some other reason if needed.
  @example
      // using one of the predefined validators
      var validator = Validator.maxLength({ maxLength: 5, displayName: "City" });
      // should be ok because "asdf".length < 5
      var result = validator.validate("asdf");
      ok(result === null);
      result = validator.validate("adasdfasdf");
      // extract all of the properties of the 'result'
      var errMsg = result.errorMessage;
      var context = result.context;
      var sameValidator = result.validator;
  @method validate
  @param value {Object} Value to validate
  @param additionalContext {Object} Any additional contextual information that the Validator
  can make use of.
  @return {ValidationError|null} A ValidationError if validation fails, null otherwise
  **/
  proto.validate = function (value, additionalContext) {
    var currentContext;
    if (additionalContext) {
      currentContext = __extend(Object.create(this.context), additionalContext);
    } else {
      currentContext = this.context;
    }
    this.currentContext = currentContext;

    try {
      if (this.valFn(value, currentContext)) {
        return null;
      } else {
        currentContext.value = value;
        return new ValidationError(this, currentContext, this.getMessage());
      }
    } catch (e) {
      return new ValidationError(this, currentContext, "Exception occured while executing this validator: " + this.name);
    }
  };


  // context.value is not avail unless validate was called first.

  /**
  Returns the message generated by the most recent execution of this Validator.
  @example
      var v0 = Validator.maxLength({ maxLength: 5, displayName: "City" });
      v0.validate("adasdfasdf");
      var errMessage = v0.getMessage());
  @method getMessage
  @return {String}
  **/
  proto.getMessage = function () {
    try {
      var context = this.currentContext;
      var message = context.message;
      if (message) {
        if (typeof (message) === "function") {
          return message(context);
        } else {
          return message;
        }
      } else if (context.messageTemplate) {
        return formatTemplate(context.messageTemplate, context);
      } else {
        return "invalid value: " + (this.name || "{unnamed validator}");
      }
    } catch (e) {
      return "Unable to format error message" + e.toString();
    }
  };

  proto.toJSON = function () {
    return this._baseContext;
  };

  /**
  Creates a validator instance from a JSON object or an array of instances from an array of JSON objects.
  @method fromJSON
  @static
  @param json {Object} JSON object that represents the serialized version of a validator.
  **/
  ctor.fromJSON = function (json) {
    if (Array.isArray(json)) {
      return json.map(function (js) {
        return ctor.fromJSON(js);
      });
    }
    ;
    var validatorName = "Validator." + json.name;
    var fn = __config.getRegisteredFunction(validatorName);
    if (!fn) {
      throw new Error("Unable to locate a validator named:" + json.name);
    }
    return fn(json);
  };

  /**
  Register a validator instance so that any deserialized metadata can reference it.
  @method register
  @static
  @param validator {Validator} Validator to register.
  **/
  ctor.register = function (validator) {
    __config.registerFunction(function () {
      return validator;
    }, "Validator." + validator.name);
  };

  /**
  Register a validator factory so that any deserialized metadata can reference it.
  @method registerFactory
  @static
  @param validatorFactory {Function} A function that optionally takes a context property and returns a Validator instance.
  @param name {String} The name of the validator.
  **/
  ctor.registerFactory = function (validatorFn, name) {
    __config.registerFunction(validatorFn, "Validator." + name);
  };

  /**
  Map of standard error message templates keyed by validator name.
  You can add to or modify this object to customize the template used for any validation error message.
  @example
      // v is this function is the value to be validated, in this case a "country" string.
      var valFn = function (v) {
          if (v == null) return true;
          return (core.stringStartsWith(v, "US"));
      };
      var countryValidator = new Validator("countryIsUS", valFn, { displayName: "Country" });
      Validator.messageTemplates.countryIsUS = "'%displayName%' must start with 'US'";
      // This will have a similar effect to this
      var countryValidator = new Validator("countryIsUS", valFn, {
          displayName: "Country", 
          messageTemplate: "'%displayName%' must start with 'US'" 
      });
  @property messageTemplates {Object}
  @static
  **/
  ctor.messageTemplates = {
    bool: "'%displayName%' must be a 'true' or 'false' value",
    creditCard: "The %displayName% is not a valid credit card number",
    date: "'%displayName%' must be a date",
    duration: "'%displayName%' must be a ISO8601 duration string, such as 'P3H24M60S'",
    emailAddress: "The %displayName% '%value%' is not a valid email address",
    guid: "'%displayName%' must be a GUID",
    integer: "'%displayName%' must be an integer",
    integerRange: "'%displayName%' must be an integer between the values of %minValue% and %maxValue%",
    maxLength: "'%displayName%' must be a string with %maxLength% characters or less",
    number: "'%displayName%' must be a number",
    phone: "The %displayName% '%value%' is not a valid phone number",
    regularExpression: "The %displayName% '%value%' does not match '%expression%'",
    required: "'%displayName%' is required",
    string: "'%displayName%' must be a string",
    stringLength: "'%displayName%' must be a string with between %minLength% and %maxLength% characters",
    url: "The %displayName% '%value%' is not a valid url"
  };

  /**
  Returns a standard 'required value' Validator
  @example
      // Assume em1 is a preexisting EntityManager.
      var custType = em1.metadataStore.getEntityType("Customer");
      var regionProperty - custType.getProperty("Region");
      // Makes "Region" on Customer a required property.
      regionProperty.validators.push(Validator.required());
      // or to allow empty strings
      regionProperty.validators.push(Validator.required({ allowEmptyStrings: true }););
  @method required
  @static
  @param context {Object}
  @param [context.allowEmptyStrings] {Boolean} If this parameter is omitted or false then empty strings do NOT pass validation.
  @return {Validator} A new Validator
  **/
  ctor.required = function (context) {
    var valFn = function (v, ctx) {
      if (typeof v === "string") {
        if (ctx && ctx.allowEmptyStrings) return true;
        return v.length > 0;
      } else {
        return v != null;
      }
    };
    return new ctor("required", valFn, context);
  };

  /**
  Returns a standard maximum string length Validator; the maximum length must be specified
  @example
      // Assume em1 is a preexisting EntityManager.
      var custType = em1.metadataStore.getEntityType("Customer");
      var regionProperty - custType.getProperty("Region");
      // Validates that the value of the Region property on Customer will be less than or equal to 5 characters.
      regionProperty.validators.push(Validator.maxLength( {maxLength: 5}));
  @method maxLength
  @static
  @param context {Object}
  @param context.maxLength {Integer}
  @return {Validator} A new Validator
  **/
  ctor.maxLength = function (context) {
    var valFn = function (v, ctx) {
      if (v == null) return true;
      if (typeof (v) !== "string") return false;
      return v.length <= ctx.maxLength;
    };
    return new ctor("maxLength", valFn, context);
  };

  /**
  Returns a standard string length Validator; both minimum and maximum lengths must be specified.
  @example
      // Assume em1 is a preexisting EntityManager.
      var custType = em1.metadataStore.getEntityType("Customer");
      var regionProperty - custType.getProperty("Region");
      // Validates that the value of the Region property on Customer will be
      // between 2 and 5 characters
      regionProperty.validators.push(Validator.stringLength( {minLength: 2, maxLength: 5});
  @method stringLength
  @static
  @param context {Object}
  @param context.maxLength {Integer}
  @param context.minLength {Integer}
  @return {Validator} A new Validator
  **/
  ctor.stringLength = function (context) {
    var valFn = function (v, ctx) {
      if (v == null) return true;
      if (typeof (v) !== "string") return false;
      if (ctx.minLength != null && v.length < ctx.minLength) return false;
      if (ctx.maxLength != null && v.length > ctx.maxLength) return false;
      return true;
    };
    return new ctor("stringLength", valFn, context);
  };

  /**
  Returns a standard string dataType Validator.
  @example
      // Assume em1 is a preexisting EntityManager.
      var custType = em1.metadataStore.getEntityType("Customer");
      var regionProperty - custType.getProperty("Region");
      // Validates that the value of the Region property on Customer is a string.
      regionProperty.validators.push(Validator.string());
  @method string
  @static
  @return {Validator} A new Validator
  **/
  ctor.string = function () {
    var valFn = function (v) {
      if (v == null) return true;
      return (typeof v === "string");
    };
    return new ctor("string", valFn);
  };

  /**
  Returns a Guid data type Validator.
  @example
      // Assume em1 is a preexisting EntityManager.
      var custType = em1.metadataStore.getEntityType("Customer");
      var customerIdProperty - custType.getProperty("CustomerID");
      // Validates that the value of the CustomerID property on Customer is a Guid.
      customerIdProperty.validators.push(Validator.guid());
  @method guid
  @static
  @return {Validator} A new Validator
  **/
  ctor.guid = function () {
    var valFn = function (v) {
      if (v == null) return true;
      return __isGuid(v);
    };
    return new ctor("guid", valFn);
  };

  /**
  Returns a ISO 8601 duration string  Validator.
  @example
      // Assume em1 is a preexisting EntityManager.
      var eventType = em1.metadataStore.getEntityType("Event");
      var elapsedTimeProperty - eventType.getProperty("ElapsedTime");
      // Validates that the value of the ElapsedTime property on Customer is a duration.
      elapsedTimeProperty.validators.push(Validator.duration());
  @method duration
  @static
  @return {Validator} A new Validator
  **/
  ctor.duration = function () {
    var valFn = function (v) {
      if (v == null) return true;
      return __isDuration(v);
    };
    return new ctor("duration", valFn);
  };

  /**
  Returns a standard numeric data type Validator.
  @example
      // Assume em1 is a preexisting EntityManager.
      var orderType = em1.metadataStore.getEntityType("Order");
      var freightProperty - orderType.getProperty("Freight");
      // Validates that the value of the Freight property on Order is a number.
      freightProperty.validators.push(Validator.number());
  @method number
  @static
  @return {Validator} A new Validator
  **/

    // TODO: may need to have seperate logic for single.
  ctor.number = ctor.double = ctor.single = function (context) {
    var valFn = function (v, ctx) {
      if (v == null) return true;
      if (typeof v === "string" && ctx && ctx.allowString) {
        v = parseFloat(v, 10);
      }
      return (typeof v === "number" && !isNaN(v));
    };
    return new ctor("number", valFn, context);
  };

  /**
  Returns a standard large integer data type - 64 bit - Validator.
  @example
      // Assume em1 is a preexisting EntityManager.
      var orderType = em1.metadataStore.getEntityType("Order");
      var freightProperty - orderType.getProperty("Freight");
      // Validates that the value of the Freight property on Order is within the range of a 64 bit integer.
      freightProperty.validators.push(Validator.int64());
  @method int64
  @static
  @return {Validator} A new Validator
  **/
  ctor.integer = ctor.int64 = function (context) {
    var valFn = function (v, ctx) {
      if (v == null) return true;
      if (typeof v === "string" && ctx && ctx.allowString) {
        v = parseInt(v, 10);
      }
      return (typeof v === "number") && (!isNaN(v)) && Math.floor(v) === v;
    };
    return new ctor("integer", valFn, context);
  };

  /**
  Returns a standard 32 bit integer data type Validator.
  @example
      // Assume em1 is a preexisting EntityManager.
      var orderType = em1.metadataStore.getEntityType("Order");
      var freightProperty - orderType.getProperty("Freight");
      freightProperty.validators.push(Validator.int32());
  @method int32
  @static
  @return {Validator} A new Validator
  **/
  ctor.int32 = function (context) {
    return intRangeValidatorCtor("int32", INT32_MIN, INT32_MAX, context)();
  };

  /**
  Returns a standard 16 bit integer data type Validator.
  @example
      // Assume em1 is a preexisting EntityManager.
      var orderType = em1.metadataStore.getEntityType("Order");
      var freightProperty - orderType.getProperty("Freight");
      // Validates that the value of the Freight property on Order is within the range of a 16 bit integer.
      freightProperty.validators.push(Validator.int16());
  @method int16
  @static
  @return {Validator} A new Validator
  **/
  ctor.int16 = function (context) {
    return intRangeValidatorCtor("int16", INT16_MIN, INT16_MAX, context)();
  };

  /**
  Returns a standard byte data type Validator. (This is a integer between 0 and 255 inclusive for js purposes).
  @example
      // Assume em1 is a preexisting EntityManager.
      var orderType = em1.metadataStore.getEntityType("Order");
      var freightProperty - orderType.getProperty("Freight");
      // Validates that the value of the Freight property on Order is within the range of a 16 bit integer.
      // Probably not a very good validation to place on the Freight property.
      regionProperty.validators.push(Validator.byte());
  @method byte
  @static
  @return {Validator} A new Validator
  **/
  ctor.byte = function (context) {
    return intRangeValidatorCtor("byte", BYTE_MIN, BYTE_MAX, context)();
  };

  /**
  Returns a standard boolean data type Validator.
  @example
      // Assume em1 is a preexisting EntityManager.
      var productType = em1.metadataStore.getEntityType("Product");
      var discontinuedProperty - productType.getProperty("Discontinued");
      // Validates that the value of the Discontinued property on Product is a boolean
      discontinuedProperty.validators.push(Validator.bool());
  @method bool
  @static
  @return {Validator} A new Validator
  **/
  ctor.bool = function () {
    var valFn = function (v) {
      if (v == null) return true;
      return (v === true) || (v === false);
    };
    return new ctor("bool", valFn);
  };

  ctor.none = function () {
    var valFn = function (v) {
      return true;
    };
    return new ctor("none", valFn);
  };

  /**
  Returns a standard date data type Validator.
  @example
      // Assume em1 is a preexisting EntityManager.
      var orderType = em1.metadataStore.getEntityType("Order");
      var orderDateProperty - orderType.getProperty("OrderDate");
      // Validates that the value of the OrderDate property on Order is a date
      // Probably not a very good validation to place on the Freight property.
      orderDateProperty.validators.push(Validator.date());
  @method date
  @static
  @return {Validator} A new Validator
  **/
  ctor.date = function () {
    var valFn = function (v) {
      if (v == null) return true;
      if (typeof v === "string") {
        try {
          return !isNaN(Date.parse(v));
          // old code
          // return __isDate(new Date(v));
        } catch (e) {
          return false;
        }
      } else {
        return __isDate(v);
      }
    };
    return new ctor("date", valFn);
  };

  /**
  Returns a credit card number validator
  Performs a luhn algorithm checksum test for plausability
  catches simple mistakes; only service knows for sure
  @example
      // Assume em is a preexisting EntityManager.
      var personType = em.metadataStore.getEntityType("Person");
      var creditCardProperty = personType.getProperty("creditCard");
      // Validates that the value of the Person.creditCard property is credit card.
      creditCardProperty.validators.push(Validator.creditCard());
  @method creditCard
  @static
  @param [context] {Object} optional parameters to pass through to validation constructor
  @return {Validator} A new Validator
  **/
  ctor.creditCard = function (context) {
    function valFn(v) {
      if (v == null || v === '') return true;
      if (typeof (v) !== 'string') return false;
      v = v.replace(/(\-|\s)/g, ""); // remove dashes and spaces
      if (!v || /\D/.test(v)) return false; // all digits, not empty
      return luhn(v);
    };
    return new ctor('creditCard', valFn, context);
  };

  // http://rosettacode.org/wiki/Luhn_test_of_credit_card_numbers#JavaScript
  function luhn(a, b, c, d, e) {
    for (d = +a[b = a.length - 1], e = 0; b--;)
      c = +a[b], d += ++e % 2 ? 2 * c % 10 + (c > 4) : c;
    return !(d % 10);
  };

  /**
  Returns a regular expression validator; the expression must be specified
  @example
      // Add validator to a property. Assume em is a preexisting EntityManager.
      var customerType = em.metadataStore.getEntityType("Customer");
      var regionProperty = customerType.getProperty("Region");
      // Validates that the value of Customer.Region is 2 char uppercase alpha.
      regionProperty.validators.push(Validator.regularExpression( {expression: '^[A-Z]{2}$'} );
  @method regularExpression
  @static
  @param context {Object}
  @param context.expression {String} String form of the regular expression to apply
  @return {Validator} A new Validator
  **/
  ctor.regularExpression = function (context) {
    function valFn(v, ctx) {
      // do not invalidate if empty; use a separate required test
      if (v == null || v === '') return true;
      if (typeof (v) !== 'string') return false;
      try {
        var re = new RegExp(ctx.expression);
      } catch (e) {
        throw new Error('Missing or invalid expression parameter to regExp validator');
      }
      return re.test(v);
    };
    return new ctor('regularExpression', valFn, context);
  };

  /**
  Returns the email address validator
  @example
      // Assume em is a preexisting EntityManager.
      var personType = em.metadataStore.getEntityType("Person");
      var emailProperty = personType.getProperty("email");
      // Validates that the value of the Person.email property is an email address.
      emailProperty.validators.push(Validator.emailAddress());
  @method emailAddress
  @static
  @param [context] {Object} optional parameters to pass through to validation constructor
  @return {Validator} A new Validator
  **/
  ctor.emailAddress = function (context) {
    // See https://github.com/srkirkland/DataAnnotationsExtensions/blob/master/DataAnnotationsExtensions/EmailAttribute.cs
    var reEmailAddress = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
    return makeRegExpValidator('emailAddress', reEmailAddress, null, context);
  };

  /**
  Returns the phone validator
  Provides basic assertions on the format and will help to eliminate most nonsense input
  Matches:
  International dialing prefix: {{}, +, 0, 0000} (with or without a trailing break character, if not '+': [-/. ])
  > ((\+)|(0(\d+)?[-/.\s]))
  Country code: {{}, 1, ..., 999} (with or without a trailing break character: [-/. ])
  > [1-9]\d{,2}[-/.\s]?
  Area code: {(0), ..., (000000), 0, ..., 000000} (with or without a trailing break character: [-/. ])
  > ((\(\d{1,6}\)|\d{1,6})[-/.\s]?)?
  Local: {0, ...}+ (with or without a trailing break character: [-/. ])
  > (\d+[-/.\s]?)+\d+
  @example
      // Assume em is a preexisting EntityManager.
      var customerType = em.metadataStore.getEntityType("Customer");
      var phoneProperty = customerType.getProperty("phone");
      // Validates that the value of the Customer.phone property is phone.
      phoneProperty.validators.push(Validator.phone());
  @method phone
  @static
  @param [context] {Object} optional parameters to pass through to validation constructor
  @return {Validator} A new Validator
  **/
  ctor.phone = function (context) {
    // See https://github.com/srkirkland/DataAnnotationsExtensions/blob/master/DataAnnotationsExtensions/Expressions.cs
    var rePhone = /^((\+|(0(\d+)?[-/.\s]?))[1-9]\d{0,2}[-/.\s]?)?((\(\d{1,6}\)|\d{1,6})[-/.\s]?)?(\d+[-/.\s]?)+\d+$/;
    return makeRegExpValidator('phone', rePhone, null, context);
  };

  /**
  Returns the URL (protocol required) validator
  @example
      // Assume em is a preexisting EntityManager.
      var personType = em.metadataStore.getEntityType("Person");
      var websiteProperty = personType.getProperty("website");
      // Validates that the value of the Person.website property is a URL.
      websiteProperty.validators.push(Validator.url());
  @method url
  @static
  @param [context] {Object} optional parameters to pass through to validation constructor
  @return {Validator} A new Validator
  **/
  ctor.url = function (context) {
    //See https://github.com/srkirkland/DataAnnotationsExtensions/blob/master/DataAnnotationsExtensions/UrlAttribute.cs
    var reUrlProtocolRequired = /^(https?|ftp):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-fA-F]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|([a-zA-Z][\-a-zA-Z0-9]*)|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-fA-F]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-fA-F]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-fA-F]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-fA-F]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/;
    return makeRegExpValidator('url', reUrlProtocolRequired, null, context);
  };

  /**
  Creates a regular expression validator with a fixed expression.
  Many of the stock validators are built with this factory method.
  Their expressions are often derived from
  https://github.com/srkirkland/DataAnnotationsExtensions/blob/master/DataAnnotationsExtensions
  You can try many of them at http://dataannotationsextensions.org/
  @example
      // Make a zipcode validator
      function zipValidator = Validator.makeRegExpValidator(
      "zipVal,
      /^\d{5}([\-]\d{4})?$/,
      "The %displayName% '%value%' is not a valid U.S. zipcode");
      // Register it.
      Validator.register(zipValidator);
      // Add it to a data property. Assume em is a preexisting EntityManager.
      var custType = em.metadataStore.getEntityType("Customer");
      var zipProperty = custType.getProperty("PostalCode");
      zipProperty.validators.push(zipValidator);
  @method makeRegExpValidator
  @static
  @param validatorName {String} name of this validator
  @param expression {String | RegExp} regular expression to apply
  @param [defaultMessage] {String} default message for failed validations
  @param [context] {Object} optional parameters to pass through to validation constructor
  @return {Validator} A new Validator
  **/
  ctor.makeRegExpValidator = makeRegExpValidator;

  function makeRegExpValidator(validatorName, expression, defaultMessage, context) {
    if (defaultMessage) {
      ctor.messageTemplates[validatorName] = defaultMessage;
    }
    var re = (typeof (expression) === 'string') ? new RegExp(expression) : expression;
    var valFn = function (v) {
      // do not invalidate if empty; use a separate required test
      if (v == null || v === '') return true;
      if (typeof (v) !== 'string') return false;
      return re.test(v);
    };
    return new ctor(validatorName, valFn, context);
  };

  // register all validators
  __objectForEach(ctor, function (key, value) {
    if (typeof (value) !== "function") {
      return;
    }
    if (key === "fromJSON" || key === "register" ||
        key === "registerFactory" || key === "makeRegExpValidator") {
      return;
    }

    __config.registerFunction(value, "Validator." + key);
  });


  // private funcs

  function formatTemplate(template, vars, ownPropertiesOnly) {
    if (!vars) return template;
    return template.replace(/%([^%]+)%/g, function (_, key) {
      var valOrFn;
      if (ownPropertiesOnly) {
        valOrFn = vars.hasOwnProperty(key) ? vars[key] : '';
      } else {
        valOrFn = vars[key];
      }
      if (valOrFn != null) {
        if (__isFunction(valOrFn)) {
          return valOrFn(vars);
        } else {
          return valOrFn;
        }
      } else {
        return "";
      }
    });
  }

  function intRangeValidatorCtor(validatorName, minValue, maxValue, context) {
    context = context || {};
    if (minValue !== undefined) { context.min = minValue; }
    if (maxValue !== undefined) { context.max = maxValue; }
    var templateExists = context.messageTemplate || ctor.messageTemplates[validatorName];
    if (!templateExists) {
      ctor.messageTemplates[validatorName] = __formatString("'%displayName%' must be an integer between the values of %1 and %2",
          minValue, maxValue);
    }
    return function () {
      var valFn = function (v, ctx) {
        if (v == null) return true;
        if (typeof v === "string" && ctx && ctx.allowString) {
          v = parseInt(v, 0);
        }
        if ((typeof v === "number") && (!isNaN(v)) && Math.floor(v) === v) {
          if (minValue != null && v < minValue) {
            return false;
          }
          if (maxValue != null && v > maxValue) {
            return false;
          }
          return true;
        } else {
          return false;
        }
      };
      return new ctor(validatorName, valFn, context);
    };
  }


  return ctor;
})();

var ValidationError = (function () {
  /**
  A ValidationError is used to describe a failed validation.

  @class ValidationError
  **/

  /**
  Constructs a new ValidationError
  @method <ctor> ValidationError

  @param validator {Validator || null} The Validator used to create this error, if any.
  @param context { ContextObject || null} The Context object used in conjunction with the Validator to create this error.
  @param errorMessage { String} The actual error message
  @param [key] {String} An optional key used to define a key for this error. One will be created automatically if not provided here.
  **/
  var ctor = function ValidationError(validator, context, errorMessage, key) {
    assertParam(validator, "validator").isOptional().isInstanceOf(Validator).check();
    assertParam(errorMessage, "errorMessage").isNonEmptyString().check();
    assertParam(key, "key").isOptional().isNonEmptyString().check();
    this.validator = validator;
    context = context || {};
    this.context = context;
    this.errorMessage = errorMessage;

    this.property = context.property;
    this.propertyName = context.propertyName || (context.property && context.property.name);

    if (key) {
      this.key = key;
    } else {
      this.key = ValidationError.getKey(validator || errorMessage, this.propertyName);
    }
    this.isServerError = false;
  };


  /**
  The Validator associated with this ValidationError.

  __readOnly__
  @property validator {Validator}
  **/

  /**
  A 'context' object associated with this ValidationError.

  __readOnly__
  @property context {Object}
  **/

  /**
  The DataProperty or NavigationProperty associated with this ValidationError.

  __readOnly__
  @property property {DataProperty|NavigationProperty}
  **/

  /**
  The property name associated with this ValidationError. This will be a "property path" for any properties of a complex object.

  __readOnly__
  @property propertyName {String}
  **/

  /**
  The error message associated with the ValidationError.

  __readOnly__
  @property errorMessage {string}
  **/

  /**
  The key by which this validation error may be removed from a collection of ValidationErrors.

  __readOnly__
  @property key {string}
  **/

  /**
  Whether this is a server error.

  __readOnly__
  @property isServerError {bool}
  **/


  /**
  Composes a ValidationError 'key' given a validator or an errorName and an optional propertyName
  @method getKey
  @static
  @param validator {ValidatorOrErrorKey} A Validator or an "error name" if no validator is available.
  @param [propertyName] A property name
  @return {String} A ValidationError 'key'
  **/
  ctor.getKey = function (validatorOrErrorName, propertyName) {
    return (validatorOrErrorName.name || validatorOrErrorName) + (propertyName ? ":" + propertyName : "");
  };


  return ctor;
})();

breeze.Validator = Validator;
breeze.ValidationError = ValidationError;
 
;/**
@module breeze
**/

var ValidationOptions = (function () {

  /**
  A ValidationOptions instance is used to specify the conditions under which validation will be executed.

  @class ValidationOptions
  **/

  /**
  ValidationOptions constructor
  @example
      var newVo = new ValidationOptions( { validateOnSave: false, validateOnAttach: false });
      // assume em1 is a preexisting EntityManager
      em1.setProperties( { validationOptions: newVo });
  @method <ctor> ValidationOptions
  @param [config] {Object}
  @param [config.validateOnAttach=true] {Boolean}
  @param [config.validateOnSave=true] {Boolean}
  @param [config.validateOnQuery=false] {Boolean}
  @param [config.validateOnPropertyChange=true] {Boolean}
  **/
  var ctor = function ValidationOptions(config) {
    updateWithConfig(this, config);
  };
  var proto = ctor.prototype;

  /**
  Whether entity and property level validation should occur when entities are attached to the EntityManager other than via a query.

  __readOnly__
  @property validateOnAttach {Boolean}
  **/

  /**
  Whether entity and property level validation should occur before entities are saved. A failed validation will force the save to fail early.

  __readOnly__
  @property validateOnSave {Boolean}
  **/

  /**
  Whether entity and property level validation should occur after entities are queried from a remote server.

  __readOnly__
  @property validateOnQuery {Boolean}
  **/

  /**
  Whether property level validation should occur after entities are modified.

  __readOnly__
  @property validateOnPropertyChange {Boolean}
  **/

  proto._$typeName = "ValidationOptions";

  /**
  Returns a copy of this ValidationOptions with changes to the specified config properties.
  @example
      var validationOptions = new ValidationOptions();
      var newOptions = validationOptions.using( { validateOnQuery: true, validateOnSave: false} );
  @method using
  @param config {Object} The object to apply to create a new QueryOptions.
  @param [config.validateOnAttach] {Boolean}
  @param [config.validateOnSave] {Boolean}
  @param [config.validateOnQuery] {Boolean}
  @param [config.validateOnPropertyChange] {Boolean}
  @return {ValidationOptions}
  @chainable
  **/
  proto.using = function (config) {
    if (!config) return this;
    var result = new ValidationOptions(this);
    updateWithConfig(result, config);
    return result;
  };

  /**
  Sets the 'defaultInstance' by creating a copy of the current 'defaultInstance' and then applying all of the properties of the current instance.
  The current instance is returned unchanged.
  @example
      var validationOptions = new ValidationOptions()
      var newOptions = validationOptions.using( { validateOnQuery: true, validateOnSave: false} );
      var newOptions.setAsDefault();
  @method setAsDefault
  @chainable
  **/
  proto.setAsDefault = function () {
    return __setAsDefault(this, ctor);
  };

  /**
  The default value whenever ValidationOptions are not specified.
  @property defaultInstance {ValidationOptions}
  @static
  **/
  ctor.defaultInstance = new ctor({
    validateOnAttach: true,
    validateOnSave: true,
    validateOnQuery: false,
    validateOnPropertyChange: true
  });

  function updateWithConfig(obj, config) {
    if (config) {
      assertConfig(config)
          .whereParam("validateOnAttach").isBoolean().isOptional()
          .whereParam("validateOnSave").isBoolean().isOptional()
          .whereParam("validateOnQuery").isBoolean().isOptional()
          .whereParam("validateOnPropertyChange").isBoolean().isOptional()
          .applyAll(obj);
    }
    return obj;
  }

  return ctor;
})();

// expose

breeze.ValidationOptions = ValidationOptions;



;breeze.makeComplexArray = (function () {
  var complexArrayMixin = {};

  // complexArray will have the following props
  //    parent
  //    propertyPath
  //    parentProperty
  //    addedItems  - only if modified
  //    removedItems  - only if modified
  //  each complexAspect of any entity within a complexArray
  //  will have its own _complexState = "A/M";

  /**
   Complex arrays are not actually classes, they are objects that mimic arrays. A complex array is collection of
   complexTypes associated with a data property on a single entity or other complex object. i.e. customer.orders or order.orderDetails.
   This collection looks like an array in that the basic methods on arrays such as 'push', 'pop', 'shift', 'unshift', 'splice'
   are all provided as well as several special purpose methods.
   @class ↈ_complexArray_
   **/

  /**
  An {{#crossLink "Event"}}{{/crossLink}} that fires whenever the contents of this array changed.  This event
  is fired any time a new entity is attached or added to the EntityManager and happens to belong to this collection.
  Adds that occur as a result of query or import operations are batched so that all of the adds or removes to any individual
  collections are collected into a single notification event for each relation array.
  @example
      // assume order is an order entity attached to an EntityManager.
      orders.arrayChanged.subscribe(
      function (arrayChangedArgs) {
          var addedEntities = arrayChangedArgs.added;
          var removedEntities = arrayChanged.removed;
      });
  @event arrayChanged
  @param added {Array of Entity} An array of all of the entities added to this collection.
  @param removed {Array of Entity} An array of all of the removed from this collection.
  @readOnly
  **/

    // virtual impls 
  complexArrayMixin._getGoodAdds = function (adds) {
    return getGoodAdds(this, adds);
  };

  complexArrayMixin._beforeChange = function () {
    observableArray.updateEntityState(this);
  };

  complexArrayMixin._processAdds = function (adds) {
    processAdds(this, adds);
  };

  complexArrayMixin._processRemoves = function (removes) {
    processRemoves(this, removes);
  };
  //

  complexArrayMixin._rejectChanges = function() {
    if (!this._origValues) return;
    var that = this;
    this.forEach(function (co) {
      clearAspect(co, that);
    });
    this.length = 0;
    this._origValues.forEach(function (co) {
      that.push(co);
    });
  };

  complexArrayMixin._acceptChanges = function () {
    this._origValues = null;
  };

  // local functions


  function getGoodAdds(complexArray, adds) {
    // remove any that are already added here
    return adds.filter(function (a) {
      return a.parent !== complexArray.parent;
    });
  }

  function processAdds(complexArray, adds) {
    adds.forEach(function (a) {
      if (a.parent != null) {
        throw new Error("The complexObject is already attached. Either clone it or remove it from its current owner");
      }
      setAspect(a, complexArray);
    });
  }

  function processRemoves(complexArray, removes) {
    removes.forEach(function (a) {
      clearAspect(a, complexArray);
    });
  }

  function clearAspect(co, arr) {
    var coAspect = co.complexAspect;
    // if not already attached - exit
    if (coAspect.parent !== arr.parent) return null;

    coAspect.parent = null;
    coAspect.parentProperty = null;
    return coAspect;
  }

  function setAspect(co, arr) {
    var coAspect = co.complexAspect;
    // if already attached - exit
    if (coAspect.parent === arr.parent) return null;
    coAspect.parent = arr.parent;
    coAspect.parentProperty = arr.parentProperty;

    return coAspect;
  }

  function makeComplexArray(arr, parent, parentProperty) {

    observableArray.initializeParent(arr, parent, parentProperty);
    arr.arrayChanged = new Event("arrayChanged", arr);
    __extend(arr, observableArray.mixin);
    return __extend(arr, complexArrayMixin);
  }

  return makeComplexArray;
})();;/**
@module breeze
**/


var EntityAction = (function () {
  /**
  EntityAction is an 'Enum' containing all of the valid actions that can occur to an 'Entity'.

  @class EntityAction
  @static
  **/
  var entityActionMethods = {
    isAttach: function () {
      return !!this.isAttach;
    },
    isDetach: function () {
      return !!this.isDetach;
    },
    isModification: function () {
      return !!this.isModification;
    }
  };

  var EntityAction = new Enum("EntityAction", entityActionMethods);

  /**
  Attach - Entity was attached via an AttachEntity call.

  @property Attach {EntityAction}
  @final
  @static
  **/
  EntityAction.Attach = EntityAction.addSymbol({ isAttach: true});

  /**
  AttachOnQuery - Entity was attached as a result of a query.

  @property AttachOnQuery {EntityAction}
  @final
  @static
  **/
  EntityAction.AttachOnQuery = EntityAction.addSymbol({ isAttach: true});

  /**
  AttachOnImport - Entity was attached as a result of an import.

  @property AttachOnImport {EntityAction}
  @final
  @static
  **/
  EntityAction.AttachOnImport = EntityAction.addSymbol({ isAttach: true});


  /**
  Detach - Entity was detached.

  @property Detach {EntityAction}
  @final
  @static
  **/
  EntityAction.Detach = EntityAction.addSymbol({ isDetach: true });

  /**
  MergeOnQuery - Properties on the entity were merged as a result of a query.

  @property MergeOnQuery {EntityAction}
  @final
  @static
  **/
  EntityAction.MergeOnQuery = EntityAction.addSymbol({ isModification: true });

  /**
  MergeOnImport - Properties on the entity were merged as a result of an import.

  @property MergeOnImport {EntityAction}
  @final
  @static
  **/
  EntityAction.MergeOnImport = EntityAction.addSymbol({ isModification: true });

  /**
  MergeOnSave - Properties on the entity were merged as a result of a save

  @property MergeOnSave {EntityAction}
  @final
  @static
  **/
  EntityAction.MergeOnSave = EntityAction.addSymbol({ isModification: true });

  /**
  PropertyChange - A property on the entity was changed.

  @property PropertyChange {EntityAction}
  @final
  @static
  **/
  EntityAction.PropertyChange = EntityAction.addSymbol({ isModification: true});

  /**
  EntityStateChange - The EntityState of the entity was changed.

  @property EntityStateChange {EntityAction}
  @final
  @static
  **/
  EntityAction.EntityStateChange = EntityAction.addSymbol();


  /**
  AcceptChanges - AcceptChanges was called on the entity, or its entityState was set to Unmodified.

  @property AcceptChanges {EntityAction}
  @final
  @static
  **/
  EntityAction.AcceptChanges = EntityAction.addSymbol();

  /**
  RejectChanges - RejectChanges was called on the entity.

  @property RejectChanges {EntityAction}
  @final
  @static
  **/
  EntityAction.RejectChanges = EntityAction.addSymbol({ isModification: true});

  /**
  Clear - The EntityManager was cleared.  All entities detached.

  @property Clear {EntityAction}
  @final
  @static
  **/
  EntityAction.Clear = EntityAction.addSymbol({ isDetach: true});

  EntityAction.resolveSymbols();
  return EntityAction;
})();

breeze.EntityAction = EntityAction;

;/**
@module breeze
**/

var EntityAspect = (function () {
  /**
  An EntityAspect instance is associated with every attached entity and is accessed via the entity's 'entityAspect' property.

  The EntityAspect itself provides properties to determine and modify the EntityState of the entity and has methods
  that provide a variety of services including validation and change tracking.

  An EntityAspect will almost never need to be constructed directly. You will usually get an EntityAspect by accessing
  an entities 'entityAspect' property.  This property will be automatically attached when an entity is created via either
  a query, import or EntityManager.createEntity call.
  @example
      // assume order is an order entity attached to an EntityManager.
      var aspect = order.entityAspect;
      var currentState = aspect.entityState;
  @class EntityAspect
  **/
  var ctor = function EntityAspect(entity) {
    if (entity === null) {
      var nullInstance = EntityAspect._nullInstance;
      if (nullInstance) return nullInstance;
      EntityAspect._nullInstance = this;
    } else if (entity === undefined) {
      throw new Error("The EntityAspect ctor requires an entity as its only argument.");
    } else if (entity.entityAspect) {
      return entity.entityAspect;
    }

    // if called without new
    if (!(this instanceof EntityAspect)) {
      return new EntityAspect(entity);
    }

    this.entity = entity;
    // TODO: keep public or not?
    this.entityGroup = null;
    this.entityManager = null;
    this.entityState = EntityState.Detached;
    this.isBeingSaved = false;
    this.originalValues = {};
    this.hasValidationErrors = false;
    this._validationErrors = {};

    // Uncomment when we implement entityAspect.isNavigationPropertyLoaded method
    // this._loadedNavPropMap = {};

    this.validationErrorsChanged = new Event("validationErrorsChanged", this);
    this.propertyChanged = new Event("propertyChanged", this);
    // in case this is the NULL entityAspect. - used with ComplexAspects that have no parent.

    if (entity != null) {
      entity.entityAspect = this;
      // entityType should already be on the entity from 'watch'
      var entityType = entity.entityType || entity._$entityType;
      if (!entityType) {
        var typeName = entity.prototype._$typeName;
        if (!typeName) {
          throw new Error("This entity is not registered as a valid EntityType");
        } else {
          throw new Error("Metadata for this entityType has not yet been resolved: " + typeName);
        }
      }
      var entityCtor = entityType.getEntityCtor();
      __modelLibraryDef.getDefaultInstance().startTracking(entity, entityCtor.prototype);
    }
  };
  var proto = ctor.prototype;


  Event.bubbleEvent(proto, function () {
    return this.entityManager;
  });

  /**
  The Entity that this aspect is associated with.

  __readOnly__
  @property entity {Entity}
  **/

  /**
  The {{#crossLink "EntityManager"}}{{/crossLink}} that contains this entity.

  __readOnly__
  @property entityManager {EntityManager}
  **/

  /**
  The {{#crossLink "EntityState"}}{{/crossLink}} of this entity.

  __readOnly__
  @property entityState {EntityState}
  **/

  /**
  Extra metadata about this entity such as the entity's etag.
  You may extend this object with your own metadata information.
  Breeze (de)serializes this object when importing/exporting the entity.

  @property extraMetadata {Object}
  **/

  /**
  Whether this entity is in the process of being saved.

  __readOnly__
  @property isBeingSaved {Boolean}
  **/

  /**
  Whether this entity has any validation errors.

  __readOnly__
  @property hasValidationErrors {Boolean}
  **/

  /**
  The 'original values' of this entity where they are different from the 'current values'.
  This is a map where the key is a property name and the value is the 'original value' of the property.

  __readOnly__
  @property originalValues {Object}
  **/

  /**
  An {{#crossLink "Event"}}{{/crossLink}} that fires whenever a value of one of this entity's properties change.
  @example
      // assume order is an order entity attached to an EntityManager.
      order.entityAspect.propertyChanged.subscribe(
      function (propertyChangedArgs) {
          // this code will be executed anytime a property value changes on the 'order' entity.
          var entity = propertyChangedArgs.entity; // Note: entity === order
          var propertyNameChanged = propertyChangedArgs.propertyName;
          var oldValue = propertyChangedArgs.oldValue;
          var newValue = propertyChangedArgs.newValue;
      });
  @event propertyChanged
  @param entity {Entity} The entity whose property has changed.
  @param property {DataProperty} The DataProperty that changed.
  @param propertyName {String} The name of the property that changed. This value will be 'null' for operations that replace the entire entity.  This includes
  queries, imports and saves that require a merge. The remaining parameters will not exist in this case either. This will actually be a "property path"
  for any properties of a complex type.
  @param oldValue {Object} The old value of this property before the change.
  @param newValue {Object} The new value of this property after the change.
  @param parent {Object} The immediate parent object for the changed property.  This will be different from the 'entity' for any complex type or nested complex type properties.
  @readOnly
  **/

  /**
  An {{#crossLink "Event"}}{{/crossLink}} that fires whenever any of the validation errors on this entity change.
  Note that this might be the removal of an error when some data on the entity is fixed.
  @example
      // assume order is an order entity attached to an EntityManager.
      order.entityAspect.validationErrorsChanged.subscribe(
      function (validationChangeArgs) {
          // this code will be executed anytime a property value changes on the 'order' entity.
          var entity == validationChangeArgs.entity; // Note: entity === order
          var errorsAdded = validationChangeArgs.added;
          var errorsCleared = validationChangeArgs.removed;
      });
  @event validationErrorsChanged
  @param entity {Entity} The entity on which the validation errors are being added or removed.
  @param added {Array of ValidationError} An array containing any newly added {{#crossLink "ValidationError"}}{{/crossLink}}s
  @param removed {Array of ValidationError} An array containing any newly removed {{#crossLink "ValidationError"}}{{/crossLink}}s. This is those
  errors that have been 'fixed'
  @readOnly
  **/

  /**
  Returns the {{#crossLink "EntityKey"}}{{/crossLink}} for this Entity.
  @example
      // assume order is an order entity attached to an EntityManager.
      var entityKey = order.entityAspect.getKey();
  @method getKey
  @param [forceRefresh=false] {Boolean} Forces the recalculation of the key.  This should normally be unnecessary.
  @return {EntityKey} The {{#crossLink "EntityKey"}}{{/crossLink}} associated with this Entity.
  **/
  proto.getKey = function (forceRefresh) {
    forceRefresh = assertParam(forceRefresh, "forceRefresh").isBoolean().isOptional().check(false);
    if (forceRefresh || !this._entityKey) {
      var entityType = this.entity.entityType;
      var keyProps = entityType.keyProperties;
      var values = keyProps.map(function (p) {
        return this.entity.getProperty(p.name);
      }, this);
      this._entityKey = new EntityKey(entityType, values);
    }
    return this._entityKey;
  };

  /**
  Returns the entity to an {{#crossLink "EntityState"}}{{/crossLink}} of 'Unchanged' by committing all changes made since the entity was last queried
  had 'acceptChanges' called on it.
  @example
      // assume order is an order entity attached to an EntityManager.
      order.entityAspect.acceptChanges();
      // The 'order' entity will now be in an 'Unchanged' state with any changes committed.
  @method acceptChanges
  **/
  proto.acceptChanges = function () {
    this._checkOperation("acceptChanges");
    var em = this.entityManager;
    if (this.entityState.isDeleted()) {
      em.detachEntity(this.entity);
    } else {
      this.setUnchanged();
    }
    em.entityChanged.publish({ entityAction: EntityAction.AcceptChanges, entity: this.entity });
  };

  /**
  Returns the entity to an EntityState of 'Unchanged' by rejecting all changes made to it since the entity was last queried
  had 'rejectChanges' called on it.
  @example
      // assume order is an order entity attached to an EntityManager.
      order.entityAspect.rejectChanges();
      // The 'order' entity will now be in an 'Unchanged' state with any changes rejected.
  @method rejectChanges
  **/
  proto.rejectChanges = function () {
    this._checkOperation("rejectChanges");
    var entity = this.entity;
    var entityManager = this.entityManager;
    // we do not want PropertyChange or EntityChange events to occur here
    __using(entityManager, "isRejectingChanges", true, function () {
      rejectChangesCore(entity);
    });
    if (this.entityState.isAdded()) {
      // next line is needed because the following line will cause this.entityManager -> null;
      entityManager.detachEntity(entity);
      // need to tell em that an entity that needed to be saved no longer does.
      entityManager._notifyStateChange(entity, false);
    } else {
      if (this.entityState.isDeleted()) {
        this.entityManager._linkRelatedEntities(entity);
      }
      this.setUnchanged();
      // propertyChanged propertyName is null because more than one property may have changed.
      this.propertyChanged.publish({ entity: entity, propertyName: null });
      this.entityManager.entityChanged.publish({ entityAction: EntityAction.RejectChanges, entity: entity });
    }
  };

  function rejectChangesCore(target) {
    var aspect = target.entityAspect || target.complexAspect;
    var stype = target.entityType || target.complexType;
    var originalValues = aspect.originalValues;
    for (var propName in originalValues) {
      target.setProperty(propName, originalValues[propName]);
    }
    stype.complexProperties.forEach(function (cp) {
      var cos = target.getProperty(cp.name);
      if (cp.isScalar) {
        rejectChangesCore(cos);
      } else {
        cos._rejectChanges();
        cos.forEach(rejectChangesCore);
      }
    });
  }

  proto.getPropertyPath = function (propName) {
    return propName;
  }


  /**
  Sets the entity to an EntityState of 'Added'.  This is NOT the equivalent of calling {{#crossLink "EntityManager/addEntity"}}{{/crossLink}}
  because no key generation will occur for autogenerated keys as a result of this operation. As a result this operation can be problematic
  unless you are certain that the entity being marked 'Added' does not already exist in the database and does not have an autogenerated key.
  The same operation can be performed by calling  {{#crossLink "EntityAspect/setEntityState"}}{{/crossLink}}.
  @example
      // assume order is an order entity attached to an EntityManager.
      order.entityAspect.setAdded();
      // The 'order' entity will now be in an 'Added' state.
  @method setAdded
  **/
  proto.setAdded = function () {
    return this.setEntityState(EntityState.Added);
  }

  /**
  Sets the entity to an EntityState of 'Unchanged'.  This is also the equivalent of calling {{#crossLink "EntityAspect/acceptChanges"}}{{/crossLink}}.
  The same operation can be performed by calling  {{#crossLink "EntityAspect/setEntityState"}}{{/crossLink}}.
  @example
      // assume order is an order entity attached to an EntityManager.
      order.entityAspect.setUnchanged();
      // The 'order' entity will now be in an 'Unchanged' state with any changes committed.
  @method setUnchanged
  **/
  proto.setUnchanged = function () {
    return this.setEntityState(EntityState.Unchanged);
  };


  /**
  Sets the entity to an EntityState of 'Modified'.  This can also be achieved by changing the value of any property on an 'Unchanged' entity.
  The same operation can be performed by calling  {{#crossLink "EntityAspect/setEntityState"}}{{/crossLink}}.
  @example
      // assume order is an order entity attached to an EntityManager.
      order.entityAspect.setModified();
      // The 'order' entity will now be in a 'Modified' state.
  @method setModified
  **/
  proto.setModified = function () {
    return this.setEntityState(EntityState.Modified);
  };

  /**
  Sets the entity to an EntityState of 'Deleted'.  This both marks the entity as being scheduled for deletion during the next 'Save' call
  but also removes the entity from all of its related entities.
  The same operation can be performed by calling  {{#crossLink "EntityAspect/setEntityState"}}{{/crossLink}}.
  @example
      // assume order is an order entity attached to an EntityManager.
      order.entityAspect.setDeleted();
      // The 'order' entity will now be in a 'Deleted' state and it will no longer have any 'related' entities.
  @method setDeleted
  **/
  proto.setDeleted = function () {
    return this.setEntityState(EntityState.Deleted);
  };

  /**
  Sets the entity to an EntityState of 'Detached'.  This removes the entity from all of its related entities, but does NOT change the EntityState of any existing entities.
  The same operation can be performed by calling  {{#crossLink "EntityAspect/setEntityState"}}{{/crossLink}}.
  @example
      // assume order is an order entity attached to an EntityManager.
      order.entityAspect.setDetached();
      // The 'order' entity will now be in a 'Detached' state and it will no longer have any 'related' entities.
  @method setDetached
  **/
  proto.setDetached = function () {
    return this.setEntityState(EntityState.Detached);
  }

  /**
  Sets the entity to the specified EntityState. See also 'setUnchanged', 'setModified', 'setDetached', etc.
  @example
      // assume order is an order entity attached to an EntityManager.
      order.entityAspect.setEntityState(EntityState.Unchanged);
      // The 'order' entity will now be in a 'Unchanged' state.
  @method setEntityState
  **/
  proto.setEntityState = function (entityState) {
    if (this.entityState === entityState) return false;
    this._checkOperation("setEntityState");
    if (this.entityState.isDetached()) {
      throw new Error("You cannot set the 'entityState' of an entity when it is detached - except by first attaching it to an EntityManager");
    }
    var entity = this.entity;
    var em = this.entityManager;
    var needsSave = true;
    if (entityState === EntityState.Unchanged) {
      clearOriginalValues(entity);
      delete this.hasTempKey;
      needsSave = false;
    } else if (entityState === EntityState.Added) {
      clearOriginalValues(entity);
      // TODO: more to do here... like regenerating key ???
    } else if (entityState === EntityState.Deleted) {
      if (this.entityState.isAdded()) {
        // turn it into a detach and exit early
        this.setEntityState(EntityState.Detached);
        return true;
      } else {
        // TODO: think about cascade deletes
        // entityState needs to be set it early in this one case to insure that fk's are not cleared.
        this.entityState = EntityState.Deleted;
        removeFromRelations(entity, EntityState.Deleted);
      }
    } else if (entityState === EntityState.Modified) {
      // nothing extra needed
    } else if (entityState === EntityState.Detached) {
      var group = this.entityGroup;
      // no group === already detached.
      if (!group) return false;
      group.detachEntity(entity);
      // needs to occur early here - so this IS deliberately redundent with the same code later in this method.
      this.entityState = entityState;
      removeFromRelations(entity, EntityState.Detached);
      this._detach();
      em.entityChanged.publish({ entityAction: EntityAction.Detach, entity: entity });
      needsSave = false;
    }
    this.entityState = entityState;
    em._notifyStateChange(entity, needsSave);
    return true;
  }

  function clearOriginalValues(target) {
    var aspect = target.entityAspect || target.complexAspect;
    aspect.originalValues = {};
    var stype = target.entityType || target.complexType;
    stype.complexProperties.forEach(function (cp) {
      var cos = target.getProperty(cp.name);
      if (cp.isScalar) {
        clearOriginalValues(cos);
      } else {
        cos._acceptChanges();
        cos.forEach(clearOriginalValues);
      }
    });
  }

  /**
  Performs a query for the value of a specified {{#crossLink "NavigationProperty"}}{{/crossLink}}.
  @example
      emp.entityAspect.loadNavigationProperty("Orders").then(function (data) {
          var orders = data.results;
      }).fail(function (exception) {
          // handle exception here;
      });
  @method loadNavigationProperty
  @async
  @param navigationProperty {NavigationProperty|String} The NavigationProperty or the name of the NavigationProperty to 'load'.
  @param [callback] {Function} Function to call on success.
  @param [errorCallback] {Function} Function to call on failure.
  @return {Promise}
    - properties of success promise
      - results {Array of Entity}
      - query {EntityQuery} The original query
      - httpResponse {httpResponse} The HttpResponse returned from the server.
  **/
  proto.loadNavigationProperty = function (navigationProperty, callback, errorCallback) {
    var entity = this.entity;
    var navProperty = entity.entityType._checkNavProperty(navigationProperty);
    var query = EntityQuery.fromEntityNavigation(entity, navProperty);
    // return entity.entityAspect.entityManager.executeQuery(query, callback, errorCallback);
    var promise = entity.entityAspect.entityManager.executeQuery(query);
    var that = this;
    return promise.then(function (data) {
      that._markAsLoaded(navProperty.name);
      if (callback) callback(data);
      return Q.resolve(data);
    }, function (error) {
      if (errorCallback) errorCallback(error);
      return Q.reject(error);
    });

  };

  /**
  Marks this navigationProperty on this entity as already having been loaded.
  @example
      emp.entityAspect.markNavigationPropertyAsLoaded("Orders");

  @method markAsLoaded
  @async
  @param navigationProperty {NavigationProperty|String} The NavigationProperty or name of NavigationProperty to 'load'.
  **/
  proto.markNavigationPropertyAsLoaded = function (navigationProperty) {
    var navProperty = this.entity.entityType._checkNavProperty(navigationProperty);
    this._markAsLoaded(navProperty.name);
  }

  /**
  Determines whether a navigationProperty on this entity has already been loaded.

  @example
      A navigation property is considered loaded when any of the following three conditions applies:

      1) It was fetched from the backend server.
      a) This can be the result of an expand query or a call to the EntityAspect.loadNavigationProperty method.
      b) Note that even if the fetch returns nothing the property is still marked as loaded in this case.
      2) The property is scalar and has been set to a nonnull value.
      3) The EntityAspect.markNavigationPropertyAsLoaded was called.

  @example
      var wasLoaded = emp.entityAspect.isNavigationPropertyLoaded("Orders");

  @method isNavigationPropertyLoaded
  @param navigationProperty {NavigationProperty|String} The NavigationProperty or name of NavigationProperty to 'load'.
  **/
  proto.isNavigationPropertyLoaded = function (navigationProperty) {
    var navProperty = this.entity.entityType._checkNavProperty(navigationProperty);
    if (navProperty.isScalar && this.entity.getProperty(navProperty.name) != null) {
      return true;
    }
    return this._loadedNps && this._loadedNps.indexOf(navProperty.name) >= 0;
  }

  proto._markAsLoaded = function (navPropName) {
    this._loadedNps = this._loadedNps || [];
    __arrayAddItemUnique(this._loadedNps, navPropName);
  }


  /**
  Performs validation on the entity, any errors encountered during the validation are available via the
  {{#crossLink "EntityAspect.getValidationErrors"}}{{/crossLink}} method. Validating an entity means executing
  all of the validators on both the entity itself as well as those on each of its properties.
  @example
      // assume order is an order entity attached to an EntityManager.
      var isOk = order.entityAspect.validateEntity();
      // isOk will be 'true' if there are no errors on the entity.
      if (!isOk) {
          var errors = order.entityAspect.getValidationErrors();
      }
  @method validateEntity
  @return {Boolean} Whether the entity passed validation.
  **/
  proto.validateEntity = function () {
    var ok = true;
    this._processValidationOpAndPublish(function (that) {
      ok = validateTarget(that.entity);
    });
    return ok;
  };

  // coIndex is only used where target is a complex object that is part of an array of complex objects
  // in which case ctIndex is the index of the target within the array.
  function validateTarget(target, coIndex) {
    var ok = true;
    var stype = target.entityType || target.complexType;
    var aspect = target.entityAspect || target.complexAspect;
    var entityAspect = target.entityAspect || target.complexAspect.getEntityAspect();
    var context = { entity: entityAspect.entity  };
    if (coIndex !== undefined) {
      context.index = coIndex;
    }

    stype.getProperties().forEach(function (p) {
      var value = target.getProperty(p.name);
      var validators = p.getAllValidators();
      if (validators.length > 0) {
        context.property = p;
        context.propertyName = aspect.getPropertyPath(p.name);
        ok = entityAspect._validateProperty(value, context) && ok;
      }
      if (p.isComplexProperty) {
        if (p.isScalar) {
          ok = validateTarget(value) && ok;
        } else {
          ok = value.reduce(function (pv, cv, ix) {
            return validateTarget(cv, ix) && pv;
          }, ok);
        }
      }
    });


    // then target level
    stype.getAllValidators().forEach(function (validator) {
      ok = validate(entityAspect, validator, target) && ok;
    });
    return ok;
  }


  /**
  Performs validation on a specific property of this entity, any errors encountered during the validation are available via the
  {{#crossLink "EntityAspect.getValidationErrors"}}{{/crossLink}} method. Validating a property means executing
  all of the validators on the specified property.  This call is also made automatically anytime a property
  of an entity is changed.
  @example
      // assume order is an order entity attached to an EntityManager.
      var isOk = order.entityAspect.validateProperty("Order");
  or
  @example
      var orderDateProperty = order.entityType.getProperty("OrderDate");
      var isOk = order.entityAspect.validateProperty(OrderDateProperty);
  @method validateProperty
  @param property {DataProperty|NavigationProperty|String} The {{#crossLink "DataProperty"}}{{/crossLink}} or
  {{#crossLink "NavigationProperty"}}{{/crossLink}} to validate or a string with the name of the property or a property path with
  the path to a property of a complex object.
  @param [context] {Object} A context object used to pass additional information to each  {{#crossLink "Validator"}}{{/crossLink}}
  @return {Boolean} Whether the entity passed validation.
  **/
  proto.validateProperty = function (property, context) {
    var value = this.getPropertyValue(property); // performs validations
    if (value && value.complexAspect) {
      return validateTarget(value);
    }
    context = context || {};
    context.entity = this.entity;
    if (typeof(property) === 'string') {
      context.property = this.entity.entityType.getProperty(property, true);
      context.propertyName = property;
    } else {
      context.property = property;
      context.propertyName = property.name;
    }

    return this._validateProperty(value, context);
  };

  /**
  Returns the validation errors associated with either the entire entity or any specified property.
  @example
  This method can return all of the errors for an Entity
  @example
      // assume order is an order entity attached to an EntityManager.
      var valErrors = order.entityAspect.getValidationErrors();
  as well as those for just a specific property.
  @example
      // assume order is an order entity attached to an EntityManager.
      var orderDateErrors = order.entityAspect.getValidationErrors("OrderDate");
  which can also be expressed as
  @example
      // assume order is an order entity attached to an EntityManager.
      var orderDateProperty = order.entityType.getProperty("OrderDate");
      var orderDateErrors = order.entityAspect.getValidationErrors(orderDateProperty);
  @method getValidationErrors
  @param [property] {DataProperty|NavigationProperty} The property for which validation errors should be retrieved.
  If omitted, all of the validation errors for this entity will be returned.
  @return {Array of ValidationError}
  **/
  proto.getValidationErrors = function (property) {
    assertParam(property, "property").isOptional().isEntityProperty().or().isString().check();
    var result = __getOwnPropertyValues(this._validationErrors);
    if (property) {
      var propertyName = typeof (property) === 'string' ? property : property.name;
      result = result.filter(function (ve) {
        return ve.property && (ve.property.name === propertyName || (propertyName.indexOf(".") != -1 && ve.propertyName == propertyName));
      });
    }
    return result;
  };

  /**
  Adds a validation error.
  @method addValidationError
  @param validationError {ValidationError}
  **/
  proto.addValidationError = function (validationError) {
    assertParam(validationError, "validationError").isInstanceOf(ValidationError).check();
    this._processValidationOpAndPublish(function (that) {
      that._addValidationError(validationError);
    });
  };

  /**
  Removes a validation error.
  @method removeValidationError
  @param validationErrorOrKey {ValidationError|String} Either a ValidationError or a ValidationError 'key' value
  **/
  proto.removeValidationError = function (validationErrorOrKey) {
    assertParam(validationErrorOrKey, "validationErrorOrKey").isString().or().isInstanceOf(ValidationError).or().isInstanceOf(Validator).check();

    var key = (typeof (validationErrorOrKey) === "string") ? validationErrorOrKey : validationErrorOrKey.key;
    this._processValidationOpAndPublish(function (that) {
      that._removeValidationError(key);
    });
  };

  /**
  Removes all of the validation errors for a specified entity
  @method clearValidationErrors
  **/
  proto.clearValidationErrors = function () {
    this._processValidationOpAndPublish(function (that) {
      __objectForEach(that._validationErrors, function (key, valError) {
        if (valError) {
          delete that._validationErrors[key];
          that._pendingValidationResult.removed.push(valError);
        }
      });
      that.hasValidationErrors = !__isEmpty(that._validationErrors);
    });
  };


  // returns null for np's that do not have a parentKey
  proto.getParentKey = function (navigationProperty) {
    // NavigationProperty doesn't yet exist
    // assertParam(navigationProperty, "navigationProperty").isInstanceOf(NavigationProperty).check();
    var fkNames = navigationProperty.foreignKeyNames;
    if (fkNames.length === 0) return null;
    var that = this;
    var fkValues = fkNames.map(function (fkn) {
      return that.entity.getProperty(fkn);
    });
    return new EntityKey(navigationProperty.entityType, fkValues);
  };

  proto.getPropertyValue = function (property) {
    assertParam(property, "property").isString().or().isEntityProperty().check();
    var value;
    if (typeof (property) === 'string') {
      var propNames = property.trim().split(".");
      var propName = propNames.shift();
      value = this.entity;
      value = value.getProperty(propName);
      while (propNames.length > 0) {
        propName = propNames.shift();
        value = value.getProperty(propName);
      }
    } else {
      if (!(property.parentType instanceof EntityType)) {
        throw new Error("The validateProperty method does not accept a 'property' parameter whose parentType is a ComplexType; " +
            "Pass a 'property path' string as the 'property' parameter instead ");
      }
      value = this.entity.getProperty(property.name);
    }
    return value;
  };

  // internal methods

  proto._checkOperation = function(operationName) {
    if (this.isBeingSaved) {
      throw new Error("Cannot perform a '" + operationName + "' on an entity that is in the process of being saved");
    }
    // allows chaining
    return this;
  }

  proto._detach = function () {
    this.entityGroup = null;
    this.entityManager = null;
    this.entityState = EntityState.Detached;
    this.originalValues = {};
    this._validationErrors = {};
    this.hasValidationErrors = false;
    this.validationErrorsChanged.clear();
    this.propertyChanged.clear();
  };


  // called from defaultInterceptor.
  proto._validateProperty = function (value, context) {
    var ok = true;
    this._processValidationOpAndPublish(function (that) {
      context.property.getAllValidators().forEach(function (validator) {
        ok = validate(that, validator, value, context) && ok;
      });
    });
    return ok;
  };

  proto._processValidationOpAndPublish = function (validationFn) {
    if (this._pendingValidationResult) {
      // only top level processValidations call publishes
      validationFn(this);
    } else {
      try {
        this._pendingValidationResult = { entity: this.entity, added: [], removed: [] };
        validationFn(this);
        if (this._pendingValidationResult.added.length > 0 || this._pendingValidationResult.removed.length > 0) {
          this.validationErrorsChanged.publish(this._pendingValidationResult);
          // this might be a detached entity hence the guard below.
          this.entityManager && this.entityManager.validationErrorsChanged.publish(this._pendingValidationResult);

        }
      } finally {
        this._pendingValidationResult = undefined;
      }
    }
  };

  proto._addValidationError = function (validationError) {
    this._validationErrors[validationError.key] = validationError;
    this.hasValidationErrors = true;
    this._pendingValidationResult.added.push(validationError);
  };

  proto._removeValidationError = function (key) {
    var valError = this._validationErrors[key];
    if (valError) {
      delete this._validationErrors[key];
      this.hasValidationErrors = !__isEmpty(this._validationErrors);
      this._pendingValidationResult.removed.push(valError);
    }
  };

  function removeFromRelations(entity, entityState) {
    // remove this entity from any collections.
    // mark the entity deleted or detached

    var isDeleted = entityState.isDeleted();
    if (isDeleted) {
      removeFromRelationsCore(entity);
    } else {
      __using(entity.entityAspect.entityManager, "isLoading", true, function () {
        removeFromRelationsCore(entity);
      });
    }
  }

  function removeFromRelationsCore(entity) {
    entity.entityType.navigationProperties.forEach(function (np) {
      var inverseNp = np.inverse;
      var npValue = entity.getProperty(np.name);
      if (np.isScalar) {
        if (npValue) {
          if (inverseNp) {
            if (inverseNp.isScalar) {
              npValue.setProperty(inverseNp.name, null);
            } else {
              var collection = npValue.getProperty(inverseNp.name);
              if (collection.length) {
                __arrayRemoveItem(collection, entity);
              }
            }
          }
          entity.setProperty(np.name, null);
        }
      } else {
        if (inverseNp) {
          // npValue is a live list so we need to copy it first.
          npValue.slice(0).forEach(function (v) {
            if (inverseNp.isScalar) {
              v.setProperty(inverseNp.name, null);
            } else {
              // TODO: many to many - not yet handled.
            }
          });
        }
        // now clear it.
        npValue.length = 0;
      }
    });

  };

  // note entityAspect only - ( no complex aspect allowed on the call).
  function validate(entityAspect, validator, value, context) {
    var ve = validator.validate(value, context);
    if (ve) {
      entityAspect._addValidationError(ve);
      return false;
    } else {
      var key = ValidationError.getKey(validator, context ? context.propertyName : null);
      entityAspect._removeValidationError(key);
      return true;
    }
  }



  return ctor;

})();

var ComplexAspect = (function () {

  /**
  An ComplexAspect instance is associated with every complex object instance and is accessed via the complex object's 'complexAspect' property.

  The ComplexAspect itself provides properties to determine the parent object, parent property and original values for the complex object.

  A ComplexAspect will almost never need to be constructed directly. You will usually get an ComplexAspect by accessing
  an entities 'complexAspect' property.  This property will be automatically attached when an complex object is created as part of an
  entity via either a query, import or EntityManager.createEntity call.
  @example
      // assume address is a complex property on the 'Customer' type
      var aspect = aCustomer.address.complexAspect;
      // aCustomer === aspect.parent;
  @class ComplexAspect
  **/
  var ctor = function ComplexAspect(complexObject, parent, parentProperty) {
    if (!complexObject) {
      throw new Error("The  ComplexAspect ctor requires an entity as its only argument.");
    }
    if (complexObject.complexAspect) {
      return complexObject.complexAspect;
    }
    // if called without new
    if (!(this instanceof ComplexAspect)) {
      return new ComplexAspect(complexObject, parent, parentProperty);
    }

    // entityType should already be on the entity from 'watch'
    this.complexObject = complexObject;
    complexObject.complexAspect = this;

    // TODO: keep public or not?
    this.originalValues = {};

    // if a standalone complexObject
    if (parent != null) {
      this.parent = parent;
      this.parentProperty = parentProperty;
    }

    var complexType = complexObject.complexType;
    if (!complexType) {
      var typeName = complexObject.prototype._$typeName;
      if (!typeName) {
        throw new Error("This entity is not registered as a valid ComplexType");
      } else {
        throw new Error("Metadata for this complexType has not yet been resolved: " + typeName);
      }
    }
    var complexCtor = complexType.getCtor();
    __modelLibraryDef.getDefaultInstance().startTracking(complexObject, complexCtor.prototype);

  };
  var proto = ctor.prototype;


  /**
  The complex object that this aspect is associated with.

  __readOnly__
  @property complexObject {Entity}
  **/

  /**
  The parent object that to which this aspect belongs; this will either be an entity or another complex object.

  __readOnly__
  @property parent {Entity|ComplexObject}
  **/

  /**
  The {{#crossLink "DataProperty"}}{{/crossLink}} on the 'parent' that contains this complex object.

  __readOnly__
  @property parentProperty {DataProperty}
  **/

  /**
  The 'original values' of this complex object where they are different from the 'current values'.
  This is a map where the key is a property name and the value is the 'original value' of the property.

  __readOnly__
  @property originalValues {Object}
  **/

  /**
  Returns the EntityAspect for the top level entity tht contains this complex object.

  @method getEntityAspect
  @return  {String}
  **/
  proto.getEntityAspect = function () {
    var parent = this.parent;
    if (!parent) return new EntityAspect(null);
    var entityAspect = parent.entityAspect;
    while (parent && !entityAspect) {
      parent = parent.complexAspect && parent.complexAspect.parent;
      entityAspect = parent && parent.entityAspect;
    }
    return entityAspect || new EntityAspect(null);
  }

  /**
  Executes the specified query against this EntityManager's local cache.

  @method getPropertyPath
  @param propName {String}  The property name of a property on this complex aspect for which we want the full path.
  @return  {String}    The 'property path' from the top level entity that contains this complex object to this object.
  **/
  proto.getPropertyPath = function (propName) {
    var parent = this.parent;
    if (!parent) return null;
    var aspect = parent.complexAspect || parent.entityAspect;
    return aspect.getPropertyPath(this.parentProperty.name + "." + propName);
  }

  return ctor;

})();


breeze.EntityAspect = EntityAspect;
breeze.ComplexAspect = ComplexAspect;
;/**
@module breeze
**/

var EntityKey = (function () {

  var ENTITY_KEY_DELIMITER = ":::";

  /**
  An EntityKey is an object that represents the unique identity of an entity.  EntityKey's are immutable.

  @class EntityKey
  **/

  /**
  Constructs a new EntityKey.  Each entity within an EntityManager will have a unique EntityKey.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var empType = em1.metadataStore.getEntityType("Employee");
      var entityKey = new EntityKey(empType, 1);
  EntityKey's may also be found by calling EntityAspect.getKey()
  @example
      // assume employee1 is an existing Employee entity
      var empKey = employee1.entityAspect.getKey();
  Multipart keys are created by passing an array as the 'keyValues' parameter
  @example
      var empTerrType = em1.metadataStore.getEntityType("EmployeeTerritory");
      var empTerrKey = new EntityKey(empTerrType, [ 1, 77]);
      // The order of the properties in the 'keyValues' array must be the same as that
      // returned by empTerrType.keyProperties
  @method <ctor> EntityKey
  @param entityType {EntityType} The {{#crossLink "EntityType"}}{{/crossLink}} of the entity.
  @param keyValues {value|Array of values} A single value or an array of values.
  **/
  var ctor = function EntityKey(entityType, keyValues) {
    assertParam(entityType, "entityType").isInstanceOf(EntityType).check();
    var subtypes = entityType.getSelfAndSubtypes();
    if (subtypes.length > 1) {
      this._subtypes = subtypes.filter(function (st) {
        return st.isAbstract === false;
      });
    }

    if (!Array.isArray(keyValues)) {
      keyValues = __arraySlice(arguments, 1);
    }

    this.entityType = entityType;
    entityType.keyProperties.forEach(function (kp, i) {
      // insure that guid keys are comparable.
      if (kp.dataType === DataType.Guid) {
        keyValues[i] = keyValues[i] && keyValues[i].toLowerCase();
      }
    });

    this.values = keyValues;
    this._keyInGroup = createKeyString(keyValues);

  };

  ctor._$typeName = "EntityKey";
  var proto = ctor.prototype;

  /**
  The 'EntityType' that this is a key for.

  __readOnly__
  @property entityType {EntityType}
  **/

  /**
  An array of the values for this key. This will usually only have a single element, unless the entity type has a multipart key.

  __readOnly__
  @property values {Array}
  **/

  proto.toJSON = function () {
    return {
      entityType: this.entityType.name,
      values: this.values
    };
  };

  ctor.fromJSON = function (json, metadataStore) {
    var et = metadataStore._getEntityType(json.entityType, true);
    return new EntityKey(et, json.values);
  };

  /**
  Used to compare EntityKeys are determine if they refer to the same Entity.
  There is also an static version of 'equals' with the same functionality.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var empType = em1.metadataStore.getEntityType("Employee");
      var empKey1 = new EntityKey(empType, 1);
      // assume employee1 is an existing Employee entity
      var empKey2 = employee1.entityAspect.getKey();
      if (empKey1.equals(empKey2)) {
          // do something  ...
      }
  @method equals
  @param entityKey {EntityKey}
  **/
  proto.equals = function (entityKey) {
    if (!(entityKey instanceof EntityKey)) return false;
    return (this.entityType === entityKey.entityType) &&
        __arrayEquals(this.values, entityKey.values);
  };

  /*
  Returns a human readable representation of this EntityKey.
  @method toString
  */
  proto.toString = function (altEntityType) {
    return (altEntityType || this.entityType).name + '-' + this._keyInGroup;
  };

  /**
  Used to compare EntityKeys are determine if they refer to the same Entity.
  There is also an instance version of 'equals' with the same functionality.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var empType = em1.metadataStore.getEntityType("Employee");
      var empKey1 = new EntityKey(empType, 1);
      // assume employee1 is an existing Employee entity
      var empKey2 = employee1.entityAspect.getKey();
      if (EntityKey.equals(empKey1, empKey2)) {
          // do something  ...
      }
  @method equals
  @static
  @param k1 {EntityKey}
  @param k2 {EntityKey}
  **/
  ctor.equals = function (k1, k2) {
    if (!(k1 instanceof EntityKey)) return false;
    return k1.equals(k2);
  };

  // TODO: we may want to compare to default values later.
  proto._isEmpty = function () {
    return this.values.join("").length === 0;
  };

  ctor.createKeyString = createKeyString;

  function createKeyString(keyValues) {
    return keyValues.join(ENTITY_KEY_DELIMITER);
  }

  return ctor;
})();

breeze.EntityKey = EntityKey;
;/**
@module breeze
**/

var EntityState = (function () {
  /**
  EntityState is an 'Enum' containing all of the valid states for an 'Entity'.

  @class EntityState
  @static
  **/
  var entityStateMethods = {
    /**
    @example
        var es = anEntity.entityAspect.entityState;
        return es.isUnchanged();
    is the same as
    @example
        return es === EntityState.Unchanged;
    @method isUnchanged
    @return {Boolean} Whether an entityState instance is EntityState.Unchanged.
    **/
    isUnchanged: function () {
      return this === EntityState.Unchanged;
    },
    /**
    @example
        var es = anEntity.entityAspect.entityState;
        return es.isAdded();
    is the same as
    @example
        return es === EntityState.Added;
    @method isAdded
    @return {Boolean} Whether an entityState instance is EntityState.Added.
    **/
    isAdded: function () {
      return this === EntityState.Added;
    },
    /**
    @example
        var es = anEntity.entityAspect.entityState;
        return es.isModified();
    is the same as
    @example
        return es === EntityState.Modified;
    @method isModified
    @return {Boolean} Whether an entityState instance is EntityState.Modified.
    **/
    isModified: function () {
      return this === EntityState.Modified;
    },
    /**
    @example
        var es = anEntity.entityAspect.entityState;
        return es.isDeleted();
    is the same as
    @example
        return es === EntityState.Deleted;
    @method isDeleted
    @return  {Boolean} Whether an entityState instance is EntityState.Deleted.
    **/
    isDeleted: function () {
      return this === EntityState.Deleted;
    },
    /**
    @example
        var es = anEntity.entityAspect.entityState;
        return es.isDetached();
    is the same as
    @example
        return es === EntityState.Detached;
    @method isDetached
    @return  {Boolean} Whether an entityState instance is EntityState.Detached.
    **/
    isDetached: function () {
      return this === EntityState.Detached;
    },
    /**
    @example
        var es = anEntity.entityAspect.entityState;
        return es.isUnchangedOrModified();
    is the same as
    @example
        return es === EntityState.Unchanged || es === EntityState.Modified
    @method isUnchangedOrModified
    @return {Boolean} Whether an entityState instance is EntityState.Unchanged or EntityState.Modified.
    **/
    isUnchangedOrModified: function () {
      return this === EntityState.Unchanged || this === EntityState.Modified;
    },
    /**
    @example
        var es = anEntity.entityAspect.entityState;
        return es.isAddedModifiedOrDeleted();
    is the same as
    @example
        return es === EntityState.Added || es === EntityState.Modified || es === EntityState.Deleted
    @method isAddedModifiedOrDeleted
    @return {Boolean} Whether an entityState instance is EntityState.Unchanged or EntityState.Modified or EntityState.Deleted.
    **/
    isAddedModifiedOrDeleted: function () {
      return this === EntityState.Added ||
          this === EntityState.Modified ||
          this === EntityState.Deleted;
    }
  };

  var EntityState = new Enum("EntityState", entityStateMethods);
  /**
  The 'Unchanged' state.

  @property Unchanged {EntityState}
  @final
  @static
  **/
  EntityState.Unchanged = EntityState.addSymbol();
  /**
  The 'Added' state.

  @property Added {EntityState}
  @final
  @static
  **/
  EntityState.Added = EntityState.addSymbol();
  /**
  The 'Modified' state.

  @property Modified {EntityState}
  @final
  @static
  **/
  EntityState.Modified = EntityState.addSymbol();
  /**
  The 'Deleted' state.

  @property Deleted {EntityState}
  @final
  @static
  **/
  EntityState.Deleted = EntityState.addSymbol();
  /**
  The 'Detached' state.

  @property Detached {EntityState}
  @final
  @static
  **/
  EntityState.Detached = EntityState.addSymbol();
  EntityState.resolveSymbols();
  return EntityState;
})();

breeze.EntityState = EntityState;
;breeze.makePrimitiveArray = (function () {
  var primitiveArrayMixin = {};

  // complexArray will have the following props
  //    parent
  //    propertyPath
  //    parentProperty
  //    addedItems  - only if modified
  //    removedItems  - only if modified
  //  each complexAspect of any entity within a complexArray
  //  will have its own _complexState = "A/M";

  /**
  Primitive arrays are not actually classes, they are objects that mimic arrays. A primitive array is collection of
  primitive types associated with a data property on a single entity or complex object. i.e. customer.invoiceNumbers.
  This collection looks like an array in that the basic methods on arrays such as 'push', 'pop', 'shift', 'unshift', 'splice'
  are all provided as well as several special purpose methods.
  @class ↈ_primitiveArray_
  **/

  /**
  An {{#crossLink "Event"}}{{/crossLink}} that fires whenever the contents of this array changed.  This event
  is fired any time a new entity is attached or added to the EntityManager and happens to belong to this collection.
  Adds that occur as a result of query or import operations are batched so that all of the adds or removes to any individual
  collections are collected into a single notification event for each relation array.
  @example
      // assume order is an order entity attached to an EntityManager.
      orders.arrayChanged.subscribe(
      function (arrayChangedArgs) {
          var addedEntities = arrayChangedArgs.added;
          var removedEntities = arrayChanged.removed;
      });
  @event arrayChanged
  @param added {Array of Primitives} An array of all of the items added to this collection.
  @param removed {Array of Primitives} An array of all of the items removed from this collection.
  @readOnly
  **/

    // virtual impls 
  primitiveArrayMixin._getGoodAdds = function (adds) {
    return adds;
  };

  primitiveArrayMixin._beforeChange = function () {
    var entityAspect = this.getEntityAspect();
    if (entityAspect.entityState.isUnchanged()) {
      entityAspect.setModified();
    }
    if (entityAspect.entityState.isModified() && !this._origValues) {
      this._origValues = this.slice(0);
    }
  };

  primitiveArrayMixin._processAdds = function (adds) {
    // nothing needed
  };

  primitiveArrayMixin._processRemoves = function (removes) {
    // nothing needed;
  };
  //

  primitiveArrayMixin._rejectChanges = function () {
    if (!this._origValues) return;
    this.length = 0;
    Array.prototype.push.apply(this, this._origValues);
  };

  primitiveArrayMixin._acceptChanges = function () {
    this._origValues = null;
  };

  // local functions

  function makePrimitiveArray(arr, parent, parentProperty) {

    observableArray.initializeParent(arr, parent, parentProperty);
    arr.arrayChanged = new Event("arrayChanged", arr);
    __extend(arr, observableArray.mixin);
    return __extend(arr, primitiveArrayMixin);
  }

  return makePrimitiveArray;
})();;breeze.makeRelationArray = (function () {

  var relationArrayMixin = {};

  /**
  Relation arrays are not actually classes, they are objects that mimic arrays. A relation array is collection of
  entities associated with a navigation property on a single entity. i.e. customer.orders or order.orderDetails.
  This collection looks like an array in that the basic methods on arrays such as 'push', 'pop', 'shift', 'unshift', 'splice'
  are all provided as well as several special purpose methods.
  @class ↈ_relationArray_
  **/

  /**
  An {{#crossLink "Event"}}{{/crossLink}} that fires whenever the contents of this array changed.  This event
  is fired any time a new entity is attached or added to the EntityManager and happens to belong to this collection.
  Adds that occur as a result of query or import operations are batched so that all of the adds or removes to any individual
  collections are collected into a single notification event for each relation array.
  @example
      // assume order is an order entity attached to an EntityManager.
      orders.arrayChanged.subscribe(
      function (arrayChangedArgs) {
          var addedEntities = arrayChangedArgs.added;
          var removedEntities = arrayChanged.removed;
      });
  @event arrayChanged
  @param added {Array of Entity} An array of all of the entities added to this collection.
  @param removed {Array of Entity} An array of all of the removed from this collection.
  @readOnly
  **/


  /**
  Performs an asynchronous load of all other the entities associated with this relationArray.
  @example
      // assume orders is an empty, as yet unpopulated, relation array of orders
      // associated with a specific customer.
      orders.load().then(...)
  @method load
  @param [callback] {Function}
  @param [errorCallback] {Function}
  @return {Promise}
  **/
  relationArrayMixin.load = function (callback, errorCallback) {
    var parent = this.parentEntity;
    var query = EntityQuery.fromEntityNavigation(this.parentEntity, this.navigationProperty);
    var em = parent.entityAspect.entityManager;
    return em.executeQuery(query, callback, errorCallback);
  };

  relationArrayMixin._getEventParent = function () {
    return this.parentEntity.entityAspect;
  };

  relationArrayMixin._getPendingPubs = function () {
    var em = this.parentEntity.entityAspect.entityManager;
    return em && em._pendingPubs;
  };

  // virtual impls
  relationArrayMixin._getGoodAdds = function (adds) {
    return getGoodAdds(this, adds);
  };

  relationArrayMixin._processAdds = function (adds) {
    processAdds(this, adds);
  };

  relationArrayMixin._processRemoves = function (removes) {
    processRemoves(this, removes);
  };
  //

  function getGoodAdds(relationArray, adds) {
    var goodAdds = checkForDups(relationArray, adds);
    if (!goodAdds.length) {
      return goodAdds;
    }
    var parentEntity = relationArray.parentEntity;
    var entityManager = parentEntity.entityAspect.entityManager;
    // we do not want to attach an entity during loading
    // because these will all be 'attached' at a later step.
    if (entityManager && !entityManager.isLoading) {
      goodAdds.forEach(function (add) {
        if (add.entityAspect.entityState.isDetached()) {
          relationArray._inProgress = true;
          try {
            entityManager.attachEntity(add, EntityState.Added);
          } finally {
            relationArray._inProgress = false;
          }
        }
      });
    }
    return goodAdds;
  }

  function processAdds(relationArray, adds) {
    var parentEntity = relationArray.parentEntity;
    var np = relationArray.navigationProperty;
    var addsInProcess = relationArray._addsInProcess;

    var invNp = np.inverse;
    var startIx = addsInProcess.length;
    try {
      adds.forEach(function (childEntity) {
        addsInProcess.push(childEntity);
        if (invNp) {
          childEntity.setProperty(invNp.name, parentEntity);
        } else {
          // This occurs with a unidirectional 1-n navigation - in this case
          // we need to update the fks instead of the navProp
          var pks = parentEntity.entityType.keyProperties;
          np.invForeignKeyNames.forEach(function (fk, i) {
            childEntity.setProperty(fk, parentEntity.getProperty(pks[i].name));
          });
        }
      });
    } finally {
      addsInProcess.splice(startIx, adds.length);
    }

  }

  function processRemoves(relationArray, removes) {
    var inp = relationArray.navigationProperty.inverse;
    if (inp) {
      removes.forEach(function (childEntity) {
        childEntity.setProperty(inp.name, null);
      });
    }
  }

  function checkForDups(relationArray, adds) {
    // don't allow dups in this array. - also prevents recursion
    var parentEntity = relationArray.parentEntity;
    var navProp = relationArray.navigationProperty;
    var inverseProp = navProp.inverse;
    var goodAdds;
    if (inverseProp) {
      goodAdds = adds.filter(function (a) {
        if (relationArray._addsInProcess.indexOf(a) >= 0) {
          return false;
        }
        var inverseValue = a.getProperty(inverseProp.name);
        return inverseValue !== parentEntity;
      });
    } else {
      // This occurs with a unidirectional 1->N relation ( where there is no n -> 1)
      // in this case we compare fks.
      var fkPropNames = navProp.invForeignKeyNames;
      var keyProps = parentEntity.entityType.keyProperties;
      goodAdds = adds.filter(function (a) {
        if (relationArray._addsInProcess.indexOf(a) >= 0) {
          return false;
        }
        return fkPropNames.some(function (fk, i) {
          var keyProp = keyProps[i].name;
          var keyVal = parentEntity.getProperty(keyProp);
          var fkVal = a.getProperty(fk);
          return keyVal !== fkVal;
        });
      });
    }
    return goodAdds;
  }

  function makeRelationArray(arr, parentEntity, navigationProperty) {
    arr.parentEntity = parentEntity;
    arr.navigationProperty = navigationProperty;
    arr.arrayChanged = new Event("arrayChanged", arr);
    // array of pushes currently in process on this relation array - used to prevent recursion.
    arr._addsInProcess = [];
    // need to use mixins here instead of inheritance because we are starting from an existing array object.
    __extend(arr, observableArray.mixin);
    return __extend(arr, relationArrayMixin);
  }

  return makeRelationArray;
})();;function defaultPropertyInterceptor(property, newValue, rawAccessorFn) {
  // 'this' is the entity itself in this context.

  if (newValue === undefined) newValue = null;
  var oldValue = rawAccessorFn();

  var dataType = property.dataType;
  if (dataType && dataType.parse) {
    // attempts to coerce a value to the correct type - if this fails return the value unchanged
    if (Array.isArray(newValue) && !property.isScalar) {
      newValue = newValue.map(function (nv) {
        return dataType.parse(nv, typeof nv);
      });
    } else {
      newValue = dataType.parse(newValue, typeof newValue);
    }
  }

  // exit if no change - extra cruft is because dateTimes don't compare cleanly.
  if (newValue === oldValue || (dataType && dataType.isDate && newValue && oldValue && newValue.valueOf() === oldValue.valueOf())) {
    return;
  }

  // CANNOT DO NEXT LINE because it has the possibility of creating a new property
  // 'entityAspect' on 'this'.  - Not permitted by IE inside of a defined property on a prototype.
  // var entityAspect = new EntityAspect(this);

  var propertyName;
  var entityAspect = this.entityAspect;
  if (entityAspect) {
    propertyName = property.name;
  } else {
    var localAspect = this.complexAspect;
    if (localAspect) {
      entityAspect = localAspect.getEntityAspect();
      propertyName = localAspect.getPropertyPath(property.name);
    } else {
      // does not yet have an EntityAspect so just set the prop
      rawAccessorFn(newValue);
      return;
    }
  }

  // Note that we need to handle multiple properties in process, not just one in order to avoid recursion.
  // ( except in the case of null propagation with fks where null -> 0 in some cases.)
  // (this may not be needed because of the newValue === oldValue test above)
  var inProcess = entityAspect._inProcess = entityAspect._inProcess || [];
  // check for recursion
  if (inProcess.indexOf(property) >= 0) return;
  inProcess.push(property);

  try {

    var context = {
      parent: this,
      property: property,
      newValue: newValue,
      oldValue: oldValue,
      propertyName: propertyName,
      entityAspect: entityAspect
    }

    if (property.isComplexProperty) {
      setDpValueComplex(context, rawAccessorFn);
    } else if (property.isDataProperty) {
      setDpValueSimple(context, rawAccessorFn);
    } else {
      setNpValue(context, rawAccessorFn);
    }

    postChangeEvents(context);

  } finally {
    inProcess.pop();
  }
}

function setDpValueSimple(context, rawAccessorFn) {
  var parent = context.parent;
  var property = context.property;
  var entityAspect = context.entityAspect;
  var oldValue = context.oldValue;
  var newValue = context.newValue;

  var entityManager = entityAspect.entityManager;
  // 'entityType' on the next line be null for complex properties but it will only be ref'd within this
  // fn when the property is part of the key
  var entityType = parent.entityType;

  if (!property.isScalar) {
    throw new Error("Nonscalar data properties are readonly - items may be added or removed but the collection may not be changed.");
  }

  // store an original value for this property if not already set
  if (entityAspect.entityState.isUnchangedOrModified()) {
    var propName = property.name;
    // localAspect is not the same as entityAspect for complex props
    var localAspect = parent.entityAspect || parent.complexAspect;
    if (localAspect.originalValues[propName] === undefined) {
      // otherwise this entry will be skipped during serialization
      localAspect.originalValues[propName] = oldValue !== undefined ? oldValue : property.defaultValue;
    }
  }

  // if we are changing the key update our internal entityGroup indexes.
  if (property.isPartOfKey && entityManager && !entityManager.isLoading) {
    var keyProps = entityType.keyProperties;
    var values = keyProps.map(function (p) {
      if (p === property) {
        return newValue;
      } else {
        return parent.getProperty(p.name);
      }
    });
    var newKey = new EntityKey(entityType, values);
    if (entityManager.findEntityByKey(newKey)) {
      throw new Error("An entity with this key is already in the cache: " + newKey.toString());
    }
    var oldKey = parent.entityAspect.getKey();
    var eg = entityManager._findEntityGroup(entityType);
    eg._replaceKey(oldKey, newKey);
  }

  // process related updates ( the inverse relationship) first so that collection dups check works properly.
  // update inverse relationship

  var relatedNavProp = property.relatedNavigationProperty;
  if (relatedNavProp && entityManager) {
    // Example: bidirectional fkDataProperty: 1->n: order -> orderDetails
    // orderDetail.orderId <- newOrderId || null
    //    ==> orderDetail.order = lookupOrder(newOrderId)
    //    ==> (see set navProp above)
    //       and
    // Example: bidirectional fkDataProperty: 1->1: order -> internationalOrder
    // internationalOrder.orderId <- newOrderId || null
    //    ==> internationalOrder.order = lookupOrder(newOrderId)
    //    ==> (see set navProp above)

    if (newValue != null) {
      var key = new EntityKey(relatedNavProp.entityType, [newValue]);
      var relatedEntity = entityManager.findEntityByKey(key);

      if (relatedEntity) {
        parent.setProperty(relatedNavProp.name, relatedEntity);
      } else {
        // it may not have been fetched yet in which case we want to add it as an unattachedChild.
        entityManager._unattachedChildrenMap.addChild(key, relatedNavProp, parent);
        parent.setProperty(relatedNavProp.name, null);
      }
    } else {
      parent.setProperty(relatedNavProp.name, null);
    }
  } else if (property.inverseNavigationProperty && entityManager && !entityManager._inKeyFixup) {
    // Example: unidirectional fkDataProperty: 1->n: region -> territories
    // territory.regionId <- newRegionId
    //    ==> lookupRegion(newRegionId).territories.push(territory)
    //                and
    // Example: unidirectional fkDataProperty: 1->1: order -> internationalOrder
    // internationalOrder.orderId <- newOrderId
    //    ==> lookupOrder(newOrderId).internationalOrder = internationalOrder
    //                and
    // Example: unidirectional fkDataProperty: 1->n: region -> territories
    // territory.regionId <- null
    //    ==> lookupRegion(territory.oldRegionId).territories.remove(oldTerritory);
    //                and
    // Example: unidirectional fkDataProperty: 1->1: order -> internationalOrder
    // internationalOrder.orderId <- null
    //    ==> lookupOrder(internationalOrder.oldOrderId).internationalOrder = null;

    var invNavProp = property.inverseNavigationProperty;

    if (oldValue != null) {
      key = new EntityKey(invNavProp.parentType, [oldValue]);
      relatedEntity = entityManager.findEntityByKey(key);
      if (relatedEntity) {
        if (invNavProp.isScalar) {
          relatedEntity.setProperty(invNavProp.name, null);
        } else {
          // remove 'this' from old related nav prop
          var relatedArray = relatedEntity.getProperty(invNavProp.name);
          // arr.splice(arr.indexOf(value_to_remove), 1);
          relatedArray.splice(relatedArray.indexOf(parent), 1);
        }
      }
    }

    if (newValue != null) {
      key = new EntityKey(invNavProp.parentType, [newValue]);
      relatedEntity = entityManager.findEntityByKey(key);

      if (relatedEntity) {
        if (invNavProp.isScalar) {
          relatedEntity.setProperty(invNavProp.name, parent);
        } else {
          relatedEntity.getProperty(invNavProp.name).push(parent);
        }
      } else {
        // it may not have been fetched yet in which case we want to add it as an unattachedChild.
        entityManager._unattachedChildrenMap.addChild(key, invNavProp, parent);
      }
    }

  }

  rawAccessorFn(newValue);

  updateStateAndValidate(context);

  // if (property.isPartOfKey && (!this.complexAspect)) {
  if (property.isPartOfKey) {
    // propogate pk change to all related entities;

    var propertyIx = entityType.keyProperties.indexOf(property);
    // this part handles order.orderId => orderDetail.orderId
    // but won't handle product.productId => orderDetail.productId because product
    // doesn't have an orderDetails property.
    entityType.navigationProperties.forEach(function (np) {
      var inverseNp = np.inverse;
      var fkNames = inverseNp ? inverseNp.foreignKeyNames : np.invForeignKeyNames;

      if (fkNames.length === 0) return;
      var npValue = parent.getProperty(np.name);
      if (!npValue) return;
      var fkName = fkNames[propertyIx];
      if (np.isScalar) {
        npValue.setProperty(fkName, newValue);
      } else {
        npValue.forEach(function (iv) {
          iv.setProperty(fkName, newValue);
        });
      }
    });
    // this handles unidirectional problems not covered above.
    if (entityManager) {
      entityType.inverseForeignKeyProperties.forEach(function (invFkProp) {
        if (invFkProp.relatedNavigationProperty.inverse == null) {
          // this next step may be slow - it iterates over all of the entities in a group;
          // hopefully it doesn't happen often.
          entityManager._updateFkVal(invFkProp, oldValue, newValue);
        }
        ;
      });
    }

    // insure that cached key is updated.
    entityAspect.getKey(true);
  }
}

function setDpValueComplex(context, rawAccessorFn) {
  var property = context.property;
  var oldValue = context.oldValue;
  var newValue = context.newValue;

  var dataType = property.dataType;
  if (property.isScalar) {
    if (!newValue) {
      throw new Error(__formatString("You cannot set the '%1' property to null because it's datatype is the ComplexType: '%2'", property.name, property.dataType.name));
    }
    // To get here it must be a ComplexProperty
    // 'dataType' will be a complexType
    if (!oldValue) {
      var ctor = dataType.getCtor();
      oldValue = new ctor();
      rawAccessorFn(oldValue);
    }
    dataType.dataProperties.forEach(function (dp) {
      var pn = dp.name;
      var nv = newValue.getProperty(pn);
      oldValue.setProperty(pn, nv);
    });
  } else {
    throw new Error(__formatString("You cannot set the non-scalar complex property: '%1' on the type: '%2'." +
            "Instead get the property and use array functions like 'push' or 'splice' to change its contents.",
        property.name, property.parentType.name));
  }
}

function setNpValue(context, rawAccessorFn) {

  var parent = context.parent;
  var property = context.property;
  var entityAspect = context.entityAspect;
  var oldValue = context.oldValue;
  var newValue = context.newValue;

  if (!property.isScalar) {
    throw new Error("Nonscalar navigation properties are readonly - entities can be added or removed but the collection may not be changed.");
  }

  var entityManager = entityAspect.entityManager;
  var inverseProp = property.inverse;

  // manage attachment -
  if (newValue != null) {
    var newAspect = newValue.entityAspect;
    if (entityManager) {
      if (newAspect.entityState.isDetached()) {
        if (!entityManager.isLoading) {
          entityManager.attachEntity(newValue, EntityState.Added);
        }
      } else {
        if (newAspect.entityManager !== entityManager) {
          throw new Error("An Entity cannot be attached to an entity in another EntityManager. One of the two entities must be detached first.");
        }
      }
    } else {
      if (newAspect && newAspect.entityManager) {
        entityManager = newAspect.entityManager;
        if (!entityManager.isLoading) {
          entityManager.attachEntity(entityAspect.entity, EntityState.Added);
        }
      }
    }
  }

  // process related updates ( the inverse relationship) first so that collection dups check works properly.
  // update inverse relationship
  if (inverseProp) {
    ///
    if (inverseProp.isScalar) {
      // Example: bidirectional navProperty: 1->1: order -> internationalOrder
      // order.internationalOrder <- internationalOrder || null
      //    ==> (oldInternationalOrder.order = null)
      //    ==> internationalOrder.order = order
      if (oldValue != null) {
        // TODO: null -> NullEntity later
        oldValue.setProperty(inverseProp.name, null);
      }
      if (newValue != null) {
        newValue.setProperty(inverseProp.name, parent);
      }
    } else {
      // Example: bidirectional navProperty: 1->n: order -> orderDetails
      // orderDetail.order <- newOrder || null
      //    ==> (oldOrder).orderDetails.remove(orderDetail)
      //    ==> order.orderDetails.push(newOrder)
      if (oldValue != null) {
        var oldSiblings = oldValue.getProperty(inverseProp.name);
        var ix = oldSiblings.indexOf(parent);
        if (ix !== -1) {
          oldSiblings.splice(ix, 1);
        }
      }
      if (newValue != null) {
        var siblings = newValue.getProperty(inverseProp.name);
        // recursion check if already in the collection is performed by the relationArray
        siblings.push(parent);
      }
    }
  } else if (property.invForeignKeyNames && entityManager && !entityManager._inKeyFixup) {
    var invForeignKeyNames = property.invForeignKeyNames;
    if (newValue != null) {
      // Example: unidirectional navProperty: 1->1: order -> internationalOrder
      // order.InternationalOrder <- internationalOrder
      //    ==> internationalOrder.orderId = orderId
      //      and
      // Example: unidirectional navProperty: 1->n: order -> orderDetails
      // orderDetail.order <-xxx newOrder
      //    ==> CAN'T HAPPEN because if unidirectional because orderDetail will not have an order prop
      var pkValues = parent.entityAspect.getKey().values;
      invForeignKeyNames.forEach(function (fkName, i) {
        newValue.setProperty(fkName, pkValues[i]);
      });
    } else {
      // Example: unidirectional navProperty: 1->1: order -> internationalOrder
      // order.internationalOrder <- null
      //    ==> (old internationalOrder).orderId = null
      //        and
      // Example: unidirectional navProperty: 1->n: order -> orderDetails
      // orderDetail.order <-xxx newOrder
      //    ==> CAN'T HAPPEN because if unidirectional because orderDetail will not have an order prop
      if (oldValue != null) {
        invForeignKeyNames.forEach(function (fkName) {
          var fkProp = oldValue.entityType.getProperty(fkName);
          if (!fkProp.isPartOfKey) {
            // don't update with null if fk is part of the key
            oldValue.setProperty(fkName, null);
          }
        });
      }
    }
  }

  rawAccessorFn(newValue);

  updateStateAndValidate(context);

  // update fk data property - this can only occur if this navProperty has
  // a corresponding fk on this entity.
  if (property.relatedDataProperties) {
    var entityState = entityAspect.entityState;
    // if either side of nav prop is detached don't clear fks. Note: oldValue in next line cannot be null so no check is needed.
    if (newValue == null && (entityState.isDetached() || oldValue.entityAspect.entityState.isDetached())) return;
    if (entityState.isDeleted()) return;
    var inverseKeyProps = property.entityType.keyProperties;
    inverseKeyProps.forEach(function (keyProp, i) {
      var relatedDataProp = property.relatedDataProperties[i];
      // Do not trash related property if it is part of that entity's key
      if (newValue || !relatedDataProp.isPartOfKey) {
        var relatedValue = newValue ? newValue.getProperty(keyProp.name) : relatedDataProp.defaultValue;
        parent.setProperty(relatedDataProp.name, relatedValue);
      }
    });
  }
}

function postChangeEvents(context) {
  var entityAspect = context.entityAspect;

  var entityManager = entityAspect.entityManager;
  var entity = entityAspect.entity;

  var propChangedArgs = { entity: entity, parent: context.parent, property: context.property, propertyName: context.propertyName, oldValue: context.oldValue, newValue: context.newValue };
  if (entityManager) {
    // propertyChanged will be fired during loading but we only want to fire it once per entity, not once per property.
    // so propertyChanged is fired in the entityManager mergeEntity method if not fired here.
    if ((!entityManager.isLoading) && (!entityManager.isRejectingChanges)) {
      entityAspect.propertyChanged.publish(propChangedArgs);
      // don't fire entityChanged event if propertyChanged is suppressed.
      entityManager.entityChanged.publish({ entityAction: EntityAction.PropertyChange, entity: entity, args: propChangedArgs });
    }
  } else {
    entityAspect.propertyChanged.publish(propChangedArgs);
  }
}

function updateStateAndValidate(context) {
  var entityAspect = context.entityAspect;
  var entityManager = entityAspect.entityManager;
  if (entityManager == null || entityManager.isLoading) return;
  var property = context.property;

  if (entityAspect.entityState.isUnchanged() && !property.isUnmapped) {
    entityAspect.setModified();
  }

  if (entityManager.validationOptions.validateOnPropertyChange) {
    // entityAspect.entity is NOT the same as parent in the code below. It's use is deliberate.
    entityAspect._validateProperty(context.newValue,
        { entity: entityAspect.entity, property: property, propertyName: context.propertyName, oldValue: context.oldValue });
  }
}
;/**
@module breeze
**/

var DataType = (function () {

  /**
  DataType is an 'Enum' containing all of the supported data types.

  @class DataType
  @static
  **/

  /**
  The default value of this DataType.
  @property defaultValue {any}
  **/

  /**
  Whether this is a 'numeric' DataType.
  @property isNumeric {Boolean}
  **/

  var dataTypeMethods = {
    // default
  };

  var constants;
  var resetConstants = function () {
    constants = {
      stringPrefix: "K_",
      nextNumber: -1,
      nextNumberIncrement: -1
    };
  };

  resetConstants();

  var getNextString = function () {
    return constants.stringPrefix + getNextNumber().toString();
  };

  var getNextNumber = function () {
    var result = constants.nextNumber;
    constants.nextNumber += constants.nextNumberIncrement;
    return result;
  };

  var getNextGuid = function () {
    return __getUuid();
  };

  var getNextDateTime = function () {
    return new Date();
  };

  var coerceToString = function (source, sourceTypeName) {
    return (source == null) ? source : source.toString();
  };

  var coerceToGuid = function (source, sourceTypeName) {
    if (sourceTypeName === "string") {
      return source.trim().toLowerCase();
    }
    return source;
  };

  var coerceToInt = function (source, sourceTypeName) {
    if (sourceTypeName === "string") {
      var src = source.trim();
      if (src === "") return null;
      var val = parseInt(src, 10);
      return isNaN(val) ? source : val;
    } else if (sourceTypeName === "number") {
      return Math.round(source);
    }
    // do we want to coerce floats -> ints
    return source;
  };

  var coerceToFloat = function (source, sourceTypeName) {
    if (sourceTypeName === "string") {
      var src = source.trim();
      if (src === "") return null;
      var val = parseFloat(src);
      return isNaN(val) ? source : val;
    }
    return source;
  };

  var coerceToDate = function (source, sourceTypeName) {
    var val;
    if (sourceTypeName === "string") {
      var src = source.trim();
      if (src === "") return null;
      val = new Date(Date.parse(src));
      return __isDate(val) ? val : source;
    } else if (sourceTypeName === "number") {
      val = new Date(source);
      return __isDate(val) ? val : source;
    }
    return source;
  };

  var coerceToBool = function (source, sourceTypeName) {
    if (sourceTypeName === "string") {
      var src = source.trim().toLowerCase();
      if (src === "false" || src === "") {
        return false;
      } else if (src === "true") {
        return true;
      } else {
        return source;
      }
    }
    return source;
  };

  var fmtString = function (val) {
    return val == null ? null : "'" + val.replace(/'/g, "''") + "'";
  };

  var fmtInt = function (val) {
    return val == null ? null : ((typeof val === "string") ? parseInt(val, 10) : val);
  };

  var makeFloatFmt = function (fmtSuffix) {
    return function (val) {
      if (val == null) return null;
      if (typeof val === "string") {
        val = parseFloat(val);
      }
      return val + fmtSuffix;
    };
  };

  var fmtDateTime = function (val) {
    if (val == null) return null;
    try {
      return "datetime'" + val.toISOString() + "'";
    } catch (e) {
      throwError("'%1' is not a valid dateTime", val);
    }
  };

  var fmtDateTimeOffset = function (val) {
    if (val == null) return null;
    try {
      return "datetimeoffset'" + val.toISOString() + "'";
    } catch (e) {
      throwError("'%1' is not a valid dateTime", val);
    }
  };

  var fmtTime = function (val) {
    if (val == null) return null;
    if (!__isDuration(val)) {
      throwError("'%1' is not a valid ISO 8601 duration", val);
    }
    return "time'" + val + "'";
  };

  var fmtGuid = function (val) {
    if (val == null) return null;
    if (!__isGuid(val)) {
      throwError("'%1' is not a valid guid", val);
    }
    return "guid'" + val + "'";
  };

  var fmtBoolean = function (val) {
    if (val == null) return null;
    if (typeof val === "string") {
      return val.trim().toLowerCase() === "true";
    } else {
      return !!val;
    }
  };

  var fmtBinary = function (val) {
    if (val == null) return val;
    return "binary'" + val + "'";
  };

  // TODO: __identity;
  var fmtUndefined = function (val) {
    return val;
  };

  function throwError(msg, val) {
    msg = __formatString(msg, val);
    throw new Error(msg);
  }

  var DataType = new Enum("DataType", dataTypeMethods);


  /**
  @property String {DataType}
  @final
  @static
  **/
  DataType.String = DataType.addSymbol({
  defaultValue: "",
  parse: coerceToString,
  fmtOData: fmtString,
  getNext: getNextString
  });
  /**
  @property Int64 {DataType}
  @final
  @static
  **/
  DataType.Int64 = DataType.addSymbol({
  defaultValue: 0, isNumeric: true, isInteger: true, quoteJsonOData: true,
  parse: coerceToInt,
  fmtOData: makeFloatFmt("L"),
  getNext: getNextNumber
  });
  /**
  @property Int32 {DataType}
  @final
  @static
  **/
  DataType.Int32 = DataType.addSymbol({
  defaultValue: 0, isNumeric: true, isInteger: true,
  parse: coerceToInt,
  fmtOData: fmtInt,
  getNext: getNextNumber
  });
  /**
  @property Int16 {DataType}
  @final
  @static
  **/
  DataType.Int16 = DataType.addSymbol({
  defaultValue: 0, isNumeric: true, isInteger: true,
  parse: coerceToInt,
  fmtOData: fmtInt,
  getNext: getNextNumber
  });
  /**
  @property Byte {DataType}
  @final
  @static
  **/
  DataType.Byte = DataType.addSymbol({ defaultValue: 0, isNumeric: true, isInteger: true, parse: coerceToInt, fmtOData: fmtInt });
  /**
  @property Decimal {DataType}
  @final
  @static
  **/
  DataType.Decimal = DataType.addSymbol({
  defaultValue: 0, isNumeric: true, quoteJsonOData: true, isFloat: true,
  parse: coerceToFloat,
  fmtOData: makeFloatFmt("m"),
  getNext: getNextNumber
  });
  /**
  @property Double {DataType}
  @final
  @static
  **/
  DataType.Double = DataType.addSymbol({
  defaultValue: 0, isNumeric: true, isFloat: true,
  parse: coerceToFloat,
  fmtOData: makeFloatFmt("d"),
  getNext: getNextNumber
  });
  /**
  @property Single {DataType}
  @final
  @static
  **/
  DataType.Single = DataType.addSymbol({
  defaultValue: 0, isNumeric: true, isFloat: true,
  parse: coerceToFloat,
  fmtOData: makeFloatFmt("f"),
  getNext: getNextNumber
  });
  /**
  @property DateTime {DataType}
  @final
  @static
  **/
  DataType.DateTime = DataType.addSymbol({
  defaultValue: new Date(1900, 0, 1), isDate: true,
  parse: coerceToDate,
  fmtOData: fmtDateTime,
  getNext: getNextDateTime
  });

  /**
  @property DateTimeOffset {DataType}
  @final
  @static
  **/
  DataType.DateTimeOffset = DataType.addSymbol({
  defaultValue: new Date(1900, 0, 1), isDate: true,
  parse: coerceToDate,
  fmtOData: fmtDateTimeOffset,
  getNext: getNextDateTime
  });
  /**
  @property Time {DataType}
  @final
  @static
  **/
  DataType.Time = DataType.addSymbol({ defaultValue: "PT0S", fmtOData: fmtTime });
  /**
  @property Boolean {DataType}
  @final
  @static
  **/
  DataType.Boolean = DataType.addSymbol({ defaultValue: false, parse: coerceToBool, fmtOData: fmtBoolean });
  /**
  @property Guid {DataType}
  @final
  @static
  **/
  DataType.Guid = DataType.addSymbol({
  defaultValue: "00000000-0000-0000-0000-000000000000",
  parse: coerceToGuid,
  fmtOData: fmtGuid,
  getNext: getNextGuid
  });

  /**
  @property Binary {DataType}
  @final
  @static
  **/
  DataType.Binary = DataType.addSymbol({ defaultValue: null, fmtOData: fmtBinary });
  /**
  @property Undefined {DataType}
  @final
  @static
  **/
  DataType.Undefined = DataType.addSymbol({ defaultValue: undefined, fmtOData: fmtUndefined});
  DataType.resolveSymbols();

  DataType.getComparableFn = function (dataType) {
    if (dataType && dataType.isDate) {
      // dates don't perform equality comparisons properly
      return function (value) {
        return value && value.getTime();
      };
    } else if (dataType === DataType.Time) {
      // durations must be converted to compare them
      return function (value) {
        return value && __durationToSeconds(value);
      };
    } else {
      // TODO: __identity
      return function (value) {
        return value;
      };
    }
  };

  /**
  Returns the DataType for a specified EDM type name.
  @method fromEdmDataType
  @static
  @param typeName {String}
  @return {DataType} A DataType.
  **/
  DataType.fromEdmDataType = function (typeName) {
    var dt = null;
    var parts = typeName.split(".");
    if (parts.length > 1) {
      var simpleName = parts[1];
      if (simpleName === "image") {
        // hack
        dt = DataType.Byte;
      } else if (parts.length === 2) {
        dt = DataType.fromName(simpleName) || DataType.Undefined;
      } else {
        // enum
        // dt = DataType.Int32;
        dt = DataType.String;
      }
    }

    return dt;
  };

  DataType.fromValue = function (val) {
    if (__isDate(val)) return DataType.DateTime;
    switch (typeof val) {
      case "string":
        if (__isGuid(val)) return DataType.Guid;
        // the >3 below is a hack to insure that if we are inferring datatypes that
        // very short strings that are valid but unlikely ISO encoded Time's are treated as strings instead.
        else if (__isDuration(val) && val.length > 3) return DataType.Time;
        else if (__isDateString(val)) return DataType.DateTime;
        return DataType.String;
      case "boolean":
        return DataType.Boolean;
      case "number":
        return DataType.Double;
    }
    return DataType.Undefined;
  };

  var _localTimeRegex = /.\d{3}$/;

  DataType.parseTimeFromServer = function (source) {
    if (typeof source === 'string') {
      return source;
    }
    // ODATA v3 format
    if (source && source.__edmType === 'Edm.Time') {
      var seconds = Math.floor(source.ms / 1000);
      return 'PT' + seconds + 'S';
    }
    return source;
  }

  DataType.parseDateAsUTC = function (source) {
    if (typeof source === 'string') {
      // convert to UTC string if no time zone specifier.
      var isLocalTime = _localTimeRegex.test(source);
      // var isLocalTime = !hasTimeZone(source);
      source = isLocalTime ? source + 'Z' : source;
    }
    source = new Date(Date.parse(source));
    return source;
  };

  //function hasTimeZone(source) {
  //  var ix = source.indexOf("T");
  //  var timePart = source.substring(ix+1);
  //  return  timePart.indexOf("-") >= 0 || timePart.indexOf("+") >= 0 || timePart.indexOf("Z");
  //}

  // NOT YET NEEDED --------------------------------------------------
  // var _utcOffsetMs = (new Date()).getTimezoneOffset() * 60000;

  //DataType.parseDateAsLocal = function (source) {
  //    var dt = DataType.parseDatesAsUTC(source);
  //    if (__isDate(dt)) {
  //        dt = new Date(dt.getTime() + _utcOffsetMs);
  //    }
  //    return dt;
  //};
  // -----------------------------------------------------------------

  DataType.parseDateFromServer = DataType.parseDateAsUTC;

  DataType.parseRawValue = function (val, dataType) {
    // undefined values will be the default for most unmapped properties EXCEPT when they are set
    // in a jsonResultsAdapter ( an unusual use case).
    if (val === undefined) return undefined;
    if (dataType.isDate && val) {
      if (!__isDate(val)) {
        val = DataType.parseDateFromServer(val);
      }
    } else if (dataType === DataType.Binary) {
      if (val && val.$value !== undefined) {
        val = val.$value; // this will be a byte[] encoded as a string
      }
    } else if (dataType === DataType.Time) {
      val = DataType.parseTimeFromServer(val);
    } else if (val && dataType === DataType.Guid) {
      val = val.toLowerCase();
    }
    return val;
  }

  DataType.constants = constants;
  // for internal testing only
  DataType._resetConstants = resetConstants;

  DataType.getSymbols().forEach(function (sym) {
    sym.validatorCtor = getValidatorCtor(sym);
  });

  function getValidatorCtor(symbol) {
    switch (symbol) {
      case DataType.String:
        return Validator.string;
      case DataType.Int64:
        return Validator.int64;
      case DataType.Int32:
        return Validator.int32;
      case DataType.Int16:
        return Validator.int16;
      case DataType.Decimal:
        return Validator.number;
      case DataType.Double:
        return Validator.number;
      case DataType.Single:
        return Validator.number;
      case DataType.DateTime:
        return Validator.date;
      case DataType.DateTimeOffset:
        return Validator.date;
      case DataType.Boolean:
        return Validator.bool;
      case DataType.Guid:
        return Validator.guid;
      case DataType.Byte:
        return Validator.byte;
      case DataType.Binary:
        // TODO: don't quite know how to validate this yet.
        return Validator.none;
      case DataType.Time:
        return Validator.duration;
      case DataType.Undefined:
        return Validator.none;
    }
  }

  return DataType;

})();

breeze.DataType = DataType;

;/**
@module breeze
**/

var DataService = (function () {
  
  /**
  A DataService instance is used to encapsulate the details of a single 'service'; this includes a serviceName, a dataService adapterInstance,
  and whether the service has server side metadata.

  You can construct an EntityManager with either a serviceName or a DataService instance, if you use a serviceName then a DataService
  is constructed for you.  (It can also be set via the EntityManager.setProperties method).

  The same applies to the MetadataStore.fetchMetadata method, i.e. it takes either a serviceName or a DataService instance.

  Each metadataStore contains a list of DataServices, each accessible via its ‘serviceName’.
  ( see MetadataStore.getDataService and MetadataStore.addDataService).  The ‘addDataService’ method is called internally
  anytime a MetadataStore.fetchMetadata call occurs with a new dataService ( or service name).
  @class DataService
  **/

  /**
  DataService constructor

  @example
      var dataService = new DataService({
          serviceName: altServiceName,
          hasServerMetadata: false
      });

      var metadataStore = new MetadataStore({
          namingConvention: NamingConvention.camelCase
      });

      return new EntityManager({
          dataService: dataService,
          metadataStore: metadataStore
      });

  @method <ctor> DataService
  @param config {Object}
  @param config.serviceName {String} The name of the service.
  @param [config.adapterName] {String} The name of the dataServiceAdapter to be used with this service.
  @param [config.uriBuilderName] {String} The name of the uriBuilder to be used with this service.
  @param [config.hasServerMetadata] {bool} Whether the server can provide metadata for this service.
  @param [config.jsonResultsAdapter] {JsonResultsAdapter}  The JsonResultsAdapter used to process the results of any query against this service.
  @param [config.useJsonp] {Boolean}  Whether to use JSONP when making a 'get' request against this service.
  **/
  var ctor = function DataService(config) {
    // this.uriBuilder = uriBuilderForOData;
    updateWithConfig(this, config);
  };
  var proto = ctor.prototype;
  proto._$typeName = "DataService";
  
  /**
  The serviceName for this DataService.

  __readOnly__
  @property serviceName {String}
  **/

  /**
  The adapter name for the dataServiceAdapter to be used with this service.

  __readOnly__
  @property adapterName {String}
  **/

  /**
  The "dataService" adapter implementation instance associated with this EntityManager.

  __readOnly__
  @property adapterInstance {an instance of the "dataService" adapter interface}
  **/

  /**
  Whether the server can provide metadata for this service.

  __readOnly__
  @property hasServerMetadata {Boolean}
  **/

  /**
  The JsonResultsAdapter used to process the results of any query against this DataService.

  __readOnly__
  @property jsonResultsAdapter {JsonResultsAdapter}
  **/

  /**
  Whether to use JSONP when performing a 'GET' request against this service.

  __readOnly__
  @property useJsonP {Boolean}
  **/

  /**
  Returns a copy of this DataService with the specified properties applied.
  @method using
  @param config {Configuration Object} The object to apply to create a new DataService.
  @return {DataService}
  @chainable
  **/
  proto.using = function (config) {
    if (!config) return this;
    var result = new DataService(this);
    return updateWithConfig(result, config);
  };
  
  ctor.resolve = function (dataServices) {
    // final defaults
    dataServices.push({
      hasServerMetadata: true,
      useJsonp: false
    });
    var ds = new DataService(__resolveProperties(dataServices,
        ["serviceName", "adapterName", "uriBuilderName", "hasServerMetadata", "jsonResultsAdapter", "useJsonp"]));
    
    if (!ds.serviceName) {
      throw new Error("Unable to resolve a 'serviceName' for this dataService");
    }
    ds.adapterInstance = ds.adapterInstance || __config.getAdapterInstance("dataService", ds.adapterName);
    ds.jsonResultsAdapter = ds.jsonResultsAdapter || ds.adapterInstance.jsonResultsAdapter;
    ds.uriBuilder = ds.uriBuilder || __config.getAdapterInstance("uriBuilder", ds.uriBuilderName);
    return ds;
  };
  
  function updateWithConfig(obj, config) {
    if (config) {
      assertConfig(config)
          .whereParam("serviceName").isOptional()
          .whereParam("adapterName").isString().isOptional()
          .whereParam("uriBuilderName").isString().isOptional()
          .whereParam("hasServerMetadata").isBoolean().isOptional()
          .whereParam("jsonResultsAdapter").isInstanceOf(JsonResultsAdapter).isOptional()
          .whereParam("useJsonp").isBoolean().isOptional()
          .applyAll(obj);
      obj.serviceName = obj.serviceName && DataService._normalizeServiceName(obj.serviceName);
      obj.adapterInstance = obj.adapterName && __config.getAdapterInstance("dataService", obj.adapterName);
      obj.uriBuilder = obj.uriBuilderName && __config.getAdapterInstance("uriBuilder", obj.uriBuilderName);
    }
    return obj;
  }
  
  ctor._normalizeServiceName = function (serviceName) {
    serviceName = serviceName.trim();
    if (serviceName.substr(-1) !== "/") {
      return serviceName + '/';
    } else {
      return serviceName;
    }
  };
  
  proto.toJSON = function () {
    // don't use default value here - because we want to be able to distinguish undefined props for inheritence purposes.
    return __toJson(this, {
      serviceName: null,
      adapterName: null,
      uriBuilderName: null,
      hasServerMetadata: null,
      jsonResultsAdapter: function (v) {
        return v && v.name;
      },
      useJsonp: null
    });
  };
  
  ctor.fromJSON = function (json) {
    json.jsonResultsAdapter = __config._fetchObject(JsonResultsAdapter, json.jsonResultsAdapter);
    return new DataService(json);
  };

  /**
   Returns a url for this dataService with the specified suffix. This method handles dataService names either
   with or without trailing '/'s.
   @method qualifyUrl
   @param suffix {String} The resulting url.
   @return {a Url string}
   **/
  proto.qualifyUrl = function (suffix) {
    var url = this.serviceName;
    // remove any trailing "/"
    if (core.stringEndsWith(url, "/")) {
      url = url.substr(0, url.length - 1);
    }
    // ensure that it ends with "/" + suffix
    suffix = "/" + suffix;
    if (!core.stringEndsWith(url, suffix)) {
      url = url + suffix;
    }
    return url;
  };
  
  return ctor;
})();

var JsonResultsAdapter = (function () {
  /**
  A JsonResultsAdapter instance is used to provide custom extraction and parsing logic on the json results returned by any web service.
  This facility makes it possible for breeze to talk to virtually any web service and return objects that will be first class 'breeze' citizens.

  @class JsonResultsAdapter
  **/

  /**
  JsonResultsAdapter constructor

  @example
      //
      var jsonResultsAdapter = new JsonResultsAdapter({
          name: "test1e",
          extractResults: function(json) {
              return json.results;
          },
          visitNode: function(node, mappingContext, nodeContext) {
              var entityType = normalizeTypeName(node.$type);
              var propertyName = nodeContext.propertyName;
              var ignore = propertyName && propertyName.substr(0, 1) === "$";

              return {
                  entityType: entityType,
                  nodeId: node.$id,
                  nodeRefId: node.$ref,
                  ignore: ignore
              };
          }
      });

      var dataService = new DataService( {
              serviceName: "breeze/foo",
              jsonResultsAdapter: jsonResultsAdapter
      });

      var entityManager = new EntityManager( {
          dataService: dataService
      });

  @method <ctor> JsonResultsAdapter
  @param config {Object}
  @param config.name {String} The name of this adapter.  This name is used to uniquely identify and locate this instance when an 'exported' JsonResultsAdapter is later imported.
  @param [config.extractResults] {Function} Called once per service operation to extract the 'payload' from any json received over the wire.
  This method has a default implementation which to simply return the "results" property from any json returned as a result of executing the query.
  @param config.visitNode {Function} A visitor method that will be called on each node of the returned payload.
  **/
  var ctor = function JsonResultsAdapter(config) {
    if (arguments.length !== 1) {
      throw new Error("The JsonResultsAdapter ctor should be called with a single argument that is a configuration object.");
    }
    
    assertConfig(config)
        .whereParam("name").isNonEmptyString()
        .whereParam("extractResults").isFunction().isOptional().withDefault(extractResultsDefault)
        .whereParam("visitNode").isFunction()
        .applyAll(this);
    __config._storeObject(this, proto._$typeName, this.name);
  };
  
  var proto = ctor.prototype;
  proto._$typeName = "JsonResultsAdapter";
  
  function extractResultsDefault(data) {
    return data.results;
  }
  
  return ctor;
})();

breeze.DataService = DataService;
breeze.JsonResultsAdapter = JsonResultsAdapter;


;/**
@module breeze
**/

// Get the promises library called Q
// define a quick failing version if not found.
var Q = __requireLibCore("Q");

if (!Q) {
  // No Q.js! Substitute a placeholder Q which always fails
  // Should be replaced by the app via breeze.config.setQ
  // For example, see Breeze Labs "breeze.angular"
  Q = function () {
    var eMsg = 'Q is undefined. Are you missing Q.js? See https://github.com/kriskowal/q';
    throw new Error(eMsg);
  }

  // all Q methods called by Breeze should fail
  Q.defer = Q.resolve = Q.reject = Q;
}

/**
 (Re)set Q with a promises implementation suitable for Breeze internal use.  Note: This API is likely to change.
 @method setQ
 @param q {Object} - a  "thenable" promises implementation like Q.js with the API that Breeze requires internally.
 @param [q.defer] {Function} A function returning a deferred.
 @param [q.resolve] {Function} A function returning a resolved promise.
 @param [q.reject] {Function} A function returning a rejected promise.
 **/
breeze.config.setQ = function (q) {
  breeze.Q = Q = q;
}
breeze.Q = Q; // Todo: consider a "safer" way for apps to get breeze's Q. 


var MetadataStore = (function () {

  /**
  An instance of the MetadataStore contains all of the metadata about a collection of {{#crossLink "EntityType"}}{{/crossLink}}'s.
  MetadataStores may be shared across {{#crossLink "EntityManager"}}{{/crossLink}}'s.  If an EntityManager is created without an
  explicit MetadataStore, the MetadataStore from the MetadataStore.defaultInstance property will be used.
  @class MetadataStore
  **/

  var __id = 0;

  /**
  Constructs a new MetadataStore.
  @example
      var ms = new MetadataStore();
  The store can then be associated with an EntityManager
  @example
      var entityManager = new EntityManager( {
          serviceName: "breeze/NorthwindIBModel", 
          metadataStore: ms 
      });
  or for an existing EntityManager
  @example
      // Assume em1 is an existing EntityManager
      em1.setProperties( { metadataStore: ms });
  @method <ctor> MetadataStore
  @param [config] {Object} Configuration settings .
  @param [config.namingConvention=NamingConvention.defaultInstance] {NamingConvention} NamingConvention to be used in mapping property names
  between client and server. Uses the NamingConvention.defaultInstance if not specified.
  @param [config.localQueryComparisonOptions=LocalQueryComparisonOptions.defaultInstance] {LocalQueryComparisonOptions} The LocalQueryComparisonOptions to be
  used when performing "local queries" in order to match the semantics of queries against a remote service.
  @param [config.serializerFn] A function that is used to mediate the serialization of instances of this type.
  **/
  var ctor = function MetadataStore(config) {
    config = config || { };
    assertConfig(config)
        .whereParam("namingConvention").isOptional().isInstanceOf(NamingConvention).withDefault(NamingConvention.defaultInstance)
        .whereParam("localQueryComparisonOptions").isOptional().isInstanceOf(LocalQueryComparisonOptions).withDefault(LocalQueryComparisonOptions.defaultInstance)
        .whereParam("serializerFn").isOptional().isFunction()
        .applyAll(this);
    this.dataServices = []; // array of dataServices;
    this._resourceEntityTypeMap = {}; // key is resource name - value is qualified entityType name
    this._structuralTypeMap = {}; // key is qualified structuraltype name - value is structuralType. ( structural = entityType or complexType).
    this._shortNameMap = {}; // key is shortName, value is qualified name - does not need to be serialized.
    this._ctorRegistry = {}; // key is either short or qual type name - value is ctor;
    this._incompleteTypeMap = {}; // key is entityTypeName; value is array of nav props
    this._incompleteComplexTypeMap = {}; // key is complexTypeName; value is array of complexType props
    this._id = __id++;
    this.metadataFetched = new Event("metadataFetched", this);

  };
  var proto = ctor.prototype;
  proto._$typeName = "MetadataStore";
  Event.bubbleEvent(proto, null);
  ctor.ANONTYPE_PREFIX = "_IB_";


  // needs to be made avail to breeze.dataService.xxx files
  ctor.normalizeTypeName = __memoize(function (rawTypeName) {
    return rawTypeName && parseTypeName(rawTypeName).typeName;
  });
  // for debugging use the line below instead.
  //ctor.normalizeTypeName = function (rawTypeName) { return parseTypeName(rawTypeName).typeName; };

  /**
  An {{#crossLink "Event"}}{{/crossLink}} that fires after a MetadataStore has completed fetching metadata from a remote service.

  @example
      var ms = myEntityManager.metadataStore;
      ms.metadataFetched.subscribe(function(args) {
              var metadataStore = args.metadataStore;
              var dataService = args.dataService;
          });
      });

  @event metadataFetched
  @param metadataStore {MetadataStore} The MetadataStore into which the metadata was fetched.
  @param dataService {DataService} The DataService that metadata was fetched from.
  @param rawMetadata {Object} The raw metadata returned from the service. (It will have already been processed by this point).
  @readOnly
  **/

  /**
  General purpose property set method
  @example
      // assume em1 is an EntityManager containing a number of existing entities.

      em1.metadataStore.setProperties( {
          version: "6.1.3",
          serializerFn: function(prop, value) {
          return (prop.isUnmapped) ? undefined : value;
          }
      )};
  @method setProperties
  @param config [object]
  @param [config.name] {String} A name for the collection of metadata in this store.
  @param [config.serializerFn] A function that is used to mediate the serialization of instances of this type.
  **/
  proto.setProperties = function (config) {
    assertConfig(config)
        .whereParam("name").isString().isOptional()
        .whereParam("serializerFn").isFunction().isOptional()
        .applyAll(this);
  };

  /**
  Adds a DataService to this MetadataStore. If a DataService with the same serviceName is already
  in the MetadataStore an exception will be thrown.
  @method addDataService
  @param dataService {DataService} The DataService to add
  @param [shouldOverwrite=false] {Boolean} Permit overwrite of existing DataService rather than throw exception
  **/
  proto.addDataService = function (dataService, shouldOverwrite) {
    assertParam(dataService, "dataService").isInstanceOf(DataService).check();
    assertParam(shouldOverwrite, "shouldOverwrite").isBoolean().isOptional().check();
    var ix = this._getDataServiceIndex(dataService.serviceName);
    if (ix >= 0) {
      if (!!shouldOverwrite) {
        this.dataServices[ix] = dataService;
      } else {
        throw new Error("A dataService with this name '" + dataService.serviceName + "' already exists in this MetadataStore");
      }
    } else {
      this.dataServices.push(dataService);
    }
  };

  proto._getDataServiceIndex = function (serviceName) {
    return __arrayIndexOf(this.dataServices, function (ds) {
      return ds.serviceName === serviceName;
    });
  };

  /**
  Adds an EntityType to this MetadataStore.  No additional properties may be added to the EntityType after its has
  been added to the MetadataStore.
  @method addEntityType
  @param structuralType {EntityType|ComplexType} The EntityType or ComplexType to add
  **/
  proto.addEntityType = function (structuralType) {
    if (!(structuralType instanceof EntityType || structuralType instanceof ComplexType)) {
      structuralType = structuralType.isComplexType ? new ComplexType(structuralType) : new EntityType(structuralType);
    }

    if (!structuralType.isComplexType) {
      if (structuralType.baseTypeName && !structuralType.baseEntityType) {
        var baseEntityType = this._getEntityType(structuralType.baseTypeName, true);
        structuralType._updateFromBase(baseEntityType);
      }
      if (structuralType.keyProperties.length === 0 && !structuralType.isAbstract) {
        throw new Error("Unable to add " + structuralType.name +
            " to this MetadataStore.  An EntityType must have at least one property designated as a key property - See the 'DataProperty.isPartOfKey' property.");
      }
    }

    structuralType.metadataStore = this;
    // don't register anon types
    if (!structuralType.isAnonymous) {
      if (this._structuralTypeMap[structuralType.name]) {
        throw new Error("Type " + structuralType.name + " already exists in this MetadataStore.");
      }

      this._structuralTypeMap[structuralType.name] = structuralType;
      this._shortNameMap[structuralType.shortName] = structuralType.name;
    }

    structuralType.getProperties().forEach(function (property) {
      structuralType._updateNames(property);
      if (!property.isUnmapped) {
        structuralType._mappedPropertiesCount++;
      }
    });

    structuralType._updateCps();

    if (!structuralType.isComplexType) {
      structuralType._updateNps();
      // give the type it's base's resource name if it doesn't have its own.
      var defResourceName = structuralType.defaultResourceName || (structuralType.baseEntityType && structuralType.baseEntityType.defaultResourceName);
      if (defResourceName && !this.getEntityTypeNameForResourceName(defResourceName)) {
        this.setEntityTypeForResourceName(defResourceName, structuralType.name);
      }
      structuralType.defaultResourceName = defResourceName;
      // check if this structural type's name, short version or qualified version has a registered ctor.
      structuralType.getEntityCtor();
    }

  };

  /**
  The  {{#crossLink "NamingConvention"}}{{/crossLink}} associated with this MetadataStore.

  __readOnly__
  @property namingConvention {NamingConvention}
  **/

  /**
  Exports this MetadataStore to a serialized string appropriate for local storage.   This operation is also called
  internally when exporting an EntityManager.
  @example
      // assume ms is a previously created MetadataStore
      var metadataAsString = ms.exportMetadata();
      window.localStorage.setItem("metadata", metadataAsString);
      // and later, usually in a different session imported
      var metadataFromStorage = window.localStorage.getItem("metadata");
      var newMetadataStore = new MetadataStore();
      newMetadataStore.importMetadata(metadataFromStorage);
  @method exportMetadata
  @return {String} A serialized version of this MetadataStore that may be stored locally and later restored.
  **/
  proto.exportMetadata = function () {
    var result = JSON.stringify({
      "metadataVersion": breeze.metadataVersion,
      "name": this.name,
      "namingConvention": this.namingConvention.name,
      "localQueryComparisonOptions": this.localQueryComparisonOptions.name,
      "dataServices": this.dataServices,
      "structuralTypes": __objectMap(this._structuralTypeMap),
      "resourceEntityTypeMap": this._resourceEntityTypeMap
    }, null, __config.stringifyPad);
    return result;
  };

  /**
  Imports a previously exported serialized MetadataStore into this MetadataStore.
  @example
      // assume ms is a previously created MetadataStore
      var metadataAsString = ms.exportMetadata();
      window.localStorage.setItem("metadata", metadataAsString);
      // and later, usually in a different session
      var metadataFromStorage = window.localStorage.getItem("metadata");
      var newMetadataStore = new MetadataStore();
      newMetadataStore.importMetadata(metadataFromStorage);
  @method importMetadata
  @param exportedMetadata {String|JSON Object} A previously exported MetadataStore.
  @param [allowMerge] {Boolean} Allows custom metadata to be merged into existing metadata types.
  @return {MetadataStore} This MetadataStore.
  @chainable
  **/
  proto.importMetadata = function (exportedMetadata, allowMerge) {
    assertParam(allowMerge, "allowMerge").isOptional().isBoolean().check();
    this._deferredTypes = {};
    var json = (typeof (exportedMetadata) === "string") ? JSON.parse(exportedMetadata) : exportedMetadata;

    if (json.schema) {
      return CsdlMetadataParser.parse(this, json.schema, json.altMetadata);
    }

    if (json.metadataVersion && json.metadataVersion !== breeze.metadataVersion) {
      var msg = __formatString("Cannot import metadata with a different 'metadataVersion' (%1) than the current 'breeze.metadataVersion' (%2) ",
          json.metadataVersion, breeze.metadataVersion);
      throw new Error(msg);
    }

    var ncName = json.namingConvention;
    var lqcoName = json.localQueryComparisonOptions;
    if (this.isEmpty()) {
      this.namingConvention = __config._fetchObject(NamingConvention, ncName) || this.namingConvention;
      this.localQueryComparisonOptions = __config._fetchObject(LocalQueryComparisonOptions, lqcoName) || this.localQueryComparisonOptions;
    } else {
      if (ncName && this.namingConvention.name !== ncName) {
        throw new Error("Cannot import metadata with a different 'namingConvention' from the current MetadataStore");
      }
      if (lqcoName && this.localQueryComparisonOptions.name !== lqcoName) {
        throw new Error("Cannot import metadata with different 'localQueryComparisonOptions' from the current MetadataStore");
      }
    }

    var that = this;

    //noinspection JSHint
    json.dataServices && json.dataServices.forEach(function (ds) {
      ds = DataService.fromJSON(ds);
      that.addDataService(ds, true);
    });
    var structuralTypeMap = this._structuralTypeMap;

    json.structuralTypes && json.structuralTypes.forEach(function (stype) {
      structuralTypeFromJson(that, stype, allowMerge);
    });
    __extend(this._resourceEntityTypeMap, json.resourceEntityTypeMap);
    __extend(this._incompleteTypeMap, json.incompleteTypeMap);

    return this;
  };

  /**
  Creates a new MetadataStore from a previously exported serialized MetadataStore
  @example
      // assume ms is a previously created MetadataStore
      var metadataAsString = ms.exportMetadata();
      window.localStorage.setItem("metadata", metadataAsString);
      // and later, usually in a different session
      var metadataFromStorage = window.localStorage.getItem("metadata");
      var newMetadataStore = MetadataStore.importMetadata(metadataFromStorage);
  @method importMetadata
  @static
  @param exportedString {String} A previously exported MetadataStore.
  @return {MetadataStore} A new MetadataStore.

  **/
  ctor.importMetadata = function (exportedString) {
    var ms = new MetadataStore();
    ms.importMetadata(exportedString);
    return ms;
  };

  /**
  Returns whether Metadata has been retrieved for a specified service name.
  @example
      // Assume em1 is an existing EntityManager.
      if (!em1.metadataStore.hasMetadataFor("breeze/NorthwindIBModel"))) {
          // do something interesting
      }
  @method hasMetadataFor
  @param serviceName {String} The service name.
  @return {Boolean}
  **/
  proto.hasMetadataFor = function (serviceName) {
    return !!this.getDataService(serviceName);
  };

  /**
  Returns the DataService for a specified service name
  @example
      // Assume em1 is an existing EntityManager.
      var ds = em1.metadataStore.getDataService("breeze/NorthwindIBModel");
      var adapterName = ds.adapterName; // may be null

  @method getDataService
  @param serviceName {String} The service name.
  @return {DataService}
  **/
  proto.getDataService = function (serviceName) {
    assertParam(serviceName, "serviceName").isString().check();

    serviceName = DataService._normalizeServiceName(serviceName);
    return __arrayFirst(this.dataServices, function (ds) {
      return ds.serviceName === serviceName;
    });
  };

  /**
  Fetches the metadata for a specified 'service'. This method is automatically called
  internally by an EntityManager before its first query against a new service.

  @example
  Usually you will not actually process the results of a fetchMetadata call directly, but will instead
  ask for the metadata from the EntityManager after the fetchMetadata call returns.
  @example
      var ms = new MetadataStore();
      // or more commonly
      // var ms = anEntityManager.metadataStore;
      ms.fetchMetadata("breeze/NorthwindIBModel").then(function(rawMetadata) {
            // do something with the metadata
      }).fail(function(exception) {
          // handle exception here
      });
  @method fetchMetadata
  @async
  @param dataService {DataService|String}  Either a DataService or just the name of the DataService to fetch metadata for.

  @param [callback] {Function} Function called on success.

  successFunction([data])
  @param [callback.data] {rawMetadata}

  @param [errorCallback] {Function} Function called on failure.

  failureFunction([error])
  @param [errorCallback.error] {Error} Any error that occured wrapped into an Error object.

  @return {Promise} Promise
  **/
  proto.fetchMetadata = function (dataService, callback, errorCallback) {
    try {
      assertParam(dataService, "dataService").isString().or().isInstanceOf(DataService).check();
      assertParam(callback, "callback").isFunction().isOptional().check();
      assertParam(errorCallback, "errorCallback").isFunction().isOptional().check();

      if (typeof dataService === "string") {
        // use the dataService with a matching name or create a new one.
        dataService = this.getDataService(dataService) || new DataService({ serviceName: dataService });
      }

      dataService = DataService.resolve([dataService]);


      if (this.hasMetadataFor(dataService.serviceName)) {
        throw new Error("Metadata for a specific serviceName may only be fetched once per MetadataStore. ServiceName: " + dataService.serviceName);
      }
      var that = this;
      return dataService.adapterInstance.fetchMetadata(this, dataService).then(function (rawMetadata) {
        that.metadataFetched.publish({ metadataStore: that, dataService: dataService, rawMetadata: rawMetadata });
        if (callback) callback(rawMetadata);
        return Q.resolve(rawMetadata);
      }, function (error) {
        if (errorCallback) errorCallback(error);
        return Q.reject(error);
      });
    } catch (e) {
      return Q.reject(e);
    }
  };


  /**
  Used to register a constructor for an EntityType that is not known via standard Metadata discovery;
  i.e. an unmapped type.

  @method trackUnmappedType
  @param entityCtor {Function} The constructor for the 'unmapped' type.
  @param [interceptor] {Function} A function
  **/
  proto.trackUnmappedType = function (entityCtor, interceptor) {
    assertParam(entityCtor, "entityCtor").isFunction().check();
    assertParam(interceptor, "interceptor").isFunction().isOptional().check();
    // TODO: think about adding this to the MetadataStore.
    var entityType = new EntityType(this);
    entityType._setCtor(entityCtor, interceptor);
  };

  /**
  Provides a mechanism to register a 'custom' constructor to be used when creating new instances
  of the specified entity type.  If this call is not made, a default constructor is created for
  the entity as needed.
  This call may be made before or after the corresponding EntityType has been discovered via
  Metadata discovery.
  @example
      var Customer = function () {
              this.miscData = "asdf";
          };
      Customer.prototype.doFoo() {
              ...
          }
      // assume em1 is a preexisting EntityManager;
      em1.metadataStore.registerEntityTypeCtor("Customer", Customer);
      // any queries or EntityType.create calls from this point on will call the Customer constructor
      // registered above.
  @method registerEntityTypeCtor
  @param structuralTypeName {String} The name of the EntityType o0r ComplexType.
  @param aCtor {Function}  The constructor for this EntityType or ComplexType; may be null if all you want to do is set the next parameter.
  @param [initFn] {Function} A function or the name of a function on the entity that is to be executed immediately after the entity has been created
  and populated with any initial values.
  initFn(entity)
  @param initFn.entity {Entity} The entity being created or materialized.
  @param [noTrackingFn} {Function} A function that is executed immediately after a noTracking entity has been created and whose return
  value will be used in place of the noTracking entity.
  @param noTrackingFn.entity {Object}
  @param noTrackingFn.entityType {EntityType} The entityType that the 'entity' parameter would be if we were tracking
  **/
  proto.registerEntityTypeCtor = function (structuralTypeName, aCtor, initFn, noTrackingFn) {
    assertParam(structuralTypeName, "structuralTypeName").isString().check();
    assertParam(aCtor, "aCtor").isFunction().isOptional().check();
    assertParam(initFn, "initFn").isOptional().isFunction().or().isString().check();
    assertParam(noTrackingFn, "noTrackingFn").isOptional().isFunction().check();

    var qualifiedTypeName = getQualifiedTypeName(this, structuralTypeName, false);
    var typeName = qualifiedTypeName || structuralTypeName;

    this._ctorRegistry[typeName] = { ctor: aCtor, initFn: initFn, noTrackingFn: noTrackingFn };
    if (qualifiedTypeName) {
      var stype = this._structuralTypeMap[qualifiedTypeName];
      stype && stype.getCtor(true); // this will complete the registration if avail now.
    }

  };

  /**
  Returns whether this MetadataStore contains any metadata yet.
  @example
      // assume em1 is a preexisting EntityManager;
      if (em1.metadataStore.isEmpty()) {
          // do something interesting
      }
  @method isEmpty
  @return {Boolean}
  **/
  proto.isEmpty = function () {
    return __isEmpty(this._structuralTypeMap);
  };

  /**
  Returns an  {{#crossLink "EntityType"}}{{/crossLink}} or a {{#crossLink "ComplexType"}}{{/crossLink}} given its name.
  @example
      // assume em1 is a preexisting EntityManager
      var odType = em1.metadataStore.getEntityType("OrderDetail");
  or to throw an error if the type is not found
  @example
      var badType = em1.metadataStore.getEntityType("Foo", false);
      // badType will not get set and an exception will be thrown.
  @method getEntityType
  @param structuralTypeName {String}  Either the fully qualified name or a short name may be used. If a short name is specified and multiple types share
  that same short name an exception will be thrown.
  @param [okIfNotFound=false] {Boolean} Whether to throw an error if the specified EntityType is not found.
  @return {EntityType|ComplexType} The EntityType. ComplexType or 'undefined' if not not found.
  **/
  proto.getEntityType = function (structuralTypeName, okIfNotFound) {
    assertParam(structuralTypeName, "structuralTypeName").isString().check();
    assertParam(okIfNotFound, "okIfNotFound").isBoolean().isOptional().check(false);
    return this._getEntityType(structuralTypeName, okIfNotFound);
  };

  proto._getEntityType = function (typeName, okIfNotFound) {
    var qualTypeName = getQualifiedTypeName(this, typeName, false);
    var type = this._structuralTypeMap[qualTypeName];
    if (!type) {
      if (okIfNotFound) return null;
      var msg = __formatString("Unable to locate a 'Type' by the name: '%1'. Be sure to execute a query or call fetchMetadata first.", typeName);
      throw new Error(msg);

    }
    if (type.length) {
      var typeNames = type.join(",");
      throw new Error("There are multiple types with this 'shortName': " + typeNames);
    }
    return type;
  };

  /**
  Returns an array containing all of the  {{#crossLink "EntityType"}}{{/crossLink}}s or {{#crossLink "ComplexType"}}{{/crossLink}}s in this MetadataStore.
  @example
      // assume em1 is a preexisting EntityManager
      var allTypes = em1.metadataStore.getEntityTypes();
  @method getEntityTypes
  @return {Array of EntityType|ComplexType}
  **/
  proto.getEntityTypes = function () {
    return getTypesFromMap(this._structuralTypeMap);
  };

  proto.getIncompleteNavigationProperties = function () {
    return __objectMap(this._incompleteTypeMap, function (key, value) {
      return value;
    });
  };

  /**
  Returns a fully qualified entityTypeName for a specified resource name.  The reverse of this operation
  can be obtained via the  {{#crossLink "EntityType"}}{{/crossLink}} 'defaultResourceName' property
  @method getEntityTypeNameForResourceName
  @param resourceName {String}
  **/
  proto.getEntityTypeNameForResourceName = function (resourceName) {
    assertParam(resourceName, "resourceName").isString().check();
    return this._resourceEntityTypeMap[resourceName];
  };

  /**
  Associates a resourceName with an entityType.

  This method is only needed in those cases where multiple resources return the same
  entityType.  In this case Metadata discovery will only determine a single resource name for
  each entityType.
  @method setEntityTypeForResourceName
  @param resourceName {String}
  @param entityTypeOrName {EntityType|String} If passing a string either the fully qualified name or a short name may be used. If a short name is specified and multiple types share
  that same short name an exception will be thrown. If the entityType has not yet been discovered then a fully qualified name must be used.
  **/
  proto.setEntityTypeForResourceName = function (resourceName, entityTypeOrName) {
    assertParam(resourceName, "resourceName").isString().check();
    assertParam(entityTypeOrName, "entityTypeOrName").isInstanceOf(EntityType).or().isString().check();

    var entityTypeName;
    if (entityTypeOrName instanceof EntityType) {
      entityTypeName = entityTypeOrName.name;
    } else {
      entityTypeName = getQualifiedTypeName(this, entityTypeOrName, true);
    }

    this._resourceEntityTypeMap[resourceName] = entityTypeName;
    var entityType = this._getEntityType(entityTypeName, true);
    if (entityType && !entityType.defaultResourceName) {
      entityType.defaultResourceName = resourceName;
    }
  };


  // protected methods

  proto._checkEntityType = function (entity) {
    if (entity.entityType) return;
    var typeName = entity.prototype._$typeName;
    if (!typeName) {
      throw new Error("This entity has not been registered. See the MetadataStore.registerEntityTypeCtor method");
    }
    var entityType = this._getEntityType(typeName);
    if (entityType) {
      entity.entityType = entityType;
    }
  };

  function getTypesFromMap(typeMap) {
    var types = [];
    for (var key in typeMap) {
      var value = typeMap[key];
      // skip 'shortName' entries
      if (key === value.name) {
        types.push(typeMap[key]);
      }
    }
    return types;
  }

  function structuralTypeFromJson(metadataStore, json, allowMerge) {
    var typeName = qualifyTypeName(json.shortName, json.namespace);
    var stype = metadataStore._getEntityType(typeName, true);
    if (stype) {
      if (allowMerge) {
        return mergeStructuralType(stype, json);
      } else {
        // allow it but don't replace anything.
        return stype;
      }
    }
    var config = {
      shortName: json.shortName,
      namespace: json.namespace,
      isAbstract: json.isAbstract,
      autoGeneratedKeyType: AutoGeneratedKeyType.fromName(json.autoGeneratedKeyType),
      defaultResourceName: json.defaultResourceName,
      custom: json.custom
    };

    stype = json.isComplexType ? new ComplexType(config) : new EntityType(config);

    // baseType may not have been imported yet so we need to defer handling this type until later.
    if (json.baseTypeName) {
      stype.baseTypeName = json.baseTypeName;
      var baseEntityType = metadataStore._getEntityType(json.baseTypeName, true);
      if (baseEntityType) {
        completeStructuralTypeFromJson(metadataStore, json, stype, baseEntityType);
      } else {
        __getArray(metadataStore._deferredTypes, json.baseTypeName).push({ json: json, stype: stype });

      }
    } else {
      completeStructuralTypeFromJson(metadataStore, json, stype);
    }

    // stype may or may not have been added to the metadataStore at this point.
    return stype;
  }

  function mergeStructuralType(stype, json) {
    if (json.custom) {
      stype.custom = json.custom;
    }

    mergeProps(stype, json.dataProperties);
    mergeProps(stype, json.navigationProperties);
    return stype;
  }

  function mergeProps(stype, jsonProps) {
    if (!jsonProps) return;
    jsonProps.forEach(function (jsonProp) {
      var propName = jsonProp.name;
      if (!propName) {
        if (jsonProp.nameOnServer) {
          propName = stype.metadataStore.namingConvention.serverPropertyNameToClient(jsonProp.nameOnServer, {});
        } else {
          throw new Error("Unable to complete 'importMetadata' - cannot locate a 'name' or 'nameOnServer' for one of the imported property nodes");
        }
      }
      if (jsonProp.custom) {
        var prop = stype.getProperty(propName, true);
        prop.custom = jsonProp.custom;
      }
    });
  }

  function completeStructuralTypeFromJson(metadataStore, json, stype) {

    // validators from baseType work because validation walks thru base types
    // so no need to copy down.
    if (json.validators) {
      stype.validators = json.validators.map(Validator.fromJSON);
    }


    json.dataProperties.forEach(function (dp) {
      stype._addPropertyCore(DataProperty.fromJSON(dp));
    });


    var isEntityType = !json.isComplexType;
    if (isEntityType) {
      //noinspection JSHint
      json.navigationProperties && json.navigationProperties.forEach(function (np) {
        stype._addPropertyCore(NavigationProperty.fromJSON(np));
      });
    }

    metadataStore.addEntityType(stype);

    var deferredTypes = metadataStore._deferredTypes;
    var deferrals = deferredTypes[stype.name];
    if (deferrals) {
      deferrals.forEach(function (d) {
        completeStructuralTypeFromJson(metadataStore, d.json, d.stype);
      });
      delete deferredTypes[stype.name];
    }
  }

  function getQualifiedTypeName(metadataStore, structTypeName, throwIfNotFound) {
    if (isQualifiedTypeName(structTypeName)) return structTypeName;
    var result = metadataStore._shortNameMap[structTypeName];
    if (!result && throwIfNotFound) {
      throw new Error("Unable to locate 'entityTypeName' of: " + structTypeName);
    }
    return result;
  }

  return ctor;
})();

var CsdlMetadataParser = (function () {

  function parse(metadataStore, schemas, altMetadata) {

    metadataStore._entityTypeResourceMap = {};
    __toArray(schemas).forEach(function (schema) {
      if (schema.cSpaceOSpaceMapping) {
        // Web api only - not avail in OData.
        var mappings = JSON.parse(schema.cSpaceOSpaceMapping);
        var newMap = {};
        mappings.forEach(function (mapping) {
          newMap[mapping[0]] = mapping[1];
        });
        schema.cSpaceOSpaceMapping = newMap;
      }

      if (schema.entityContainer) {
        __toArray(schema.entityContainer).forEach(function (container) {
          __toArray(container.entitySet).forEach(function (entitySet) {
            var entityTypeName = parseTypeNameWithSchema(entitySet.entityType, schema).typeName;
            metadataStore.setEntityTypeForResourceName(entitySet.name, entityTypeName);
            metadataStore._entityTypeResourceMap[entityTypeName] = entitySet.name;
          });
        });
      }

      // process complextypes before entity types.
      if (schema.complexType) {
        __toArray(schema.complexType).forEach(function (ct) {
          var complexType = parseCsdlComplexType(ct, schema, metadataStore);
        });
      }
      if (schema.entityType) {
        __toArray(schema.entityType).forEach(function (et) {
          var entityType = parseCsdlEntityType(et, schema, metadataStore);

        });
      }

    });
    var badNavProps = metadataStore.getIncompleteNavigationProperties();
    if (badNavProps.length > 0) {
      var msg = badNavProps.map(function (np) {
        return np.parentType.name + ":" + np.name;
      }).join(', ');
      throw new Error("Incomplete navigation properties: " + msg);
    }
    if (altMetadata) {
      metadataStore.importMetadata(altMetadata, true);
    }
    return metadataStore;
  }

  function parseCsdlEntityType(csdlEntityType, schema, metadataStore) {
    var shortName = csdlEntityType.name;
    var ns = getNamespaceFor(shortName, schema);
    var entityType = new EntityType({
      shortName: shortName,
      namespace: ns,
      isAbstract: csdlEntityType.abstract && csdlEntityType.abstract === 'true'
    });
    if (csdlEntityType.baseType) {
      var baseTypeName = parseTypeNameWithSchema(csdlEntityType.baseType, schema).typeName;
      entityType.baseTypeName = baseTypeName;
      var baseEntityType = metadataStore._getEntityType(baseTypeName, true);
      if (baseEntityType) {
        completeParseCsdlEntityType(entityType, csdlEntityType, schema, metadataStore);
      } else {
        var deferrals = metadataStore._deferredTypes[baseTypeName];
        if (!deferrals) {
          deferrals = [];
          metadataStore._deferredTypes[baseTypeName] = deferrals;
        }
        deferrals.push({ entityType: entityType, csdlEntityType: csdlEntityType });
      }
    } else {
      completeParseCsdlEntityType(entityType, csdlEntityType, schema, metadataStore);
    }
    // entityType may or may not have been added to the metadataStore at this point.
    return entityType;

  }

  function completeParseCsdlEntityType(entityType, csdlEntityType, schema, metadataStore) {
    var keyNamesOnServer = csdlEntityType.key ? __toArray(csdlEntityType.key.propertyRef).map(__pluck("name")) : [];

    __toArray(csdlEntityType.property).forEach(function (prop) {
      parseCsdlDataProperty(entityType, prop, schema, keyNamesOnServer);
    });

    __toArray(csdlEntityType.navigationProperty).forEach(function (prop) {
      parseCsdlNavProperty(entityType, prop, schema);
    });

    metadataStore.addEntityType(entityType);
    entityType.defaultResourceName = metadataStore._entityTypeResourceMap[entityType.name];

    var deferredTypes = metadataStore._deferredTypes;
    var deferrals = deferredTypes[entityType.name];
    if (deferrals) {
      deferrals.forEach(function (d) {
        completeParseCsdlEntityType(d.entityType, d.csdlEntityType, schema, metadataStore);
      });
      delete deferredTypes[entityType.name];
    }

  }

  function parseCsdlComplexType(csdlComplexType, schema, metadataStore) {
    var shortName = csdlComplexType.name;
    var ns = getNamespaceFor(shortName, schema);
    var complexType = new ComplexType({
      shortName: shortName,
      namespace: ns
    });

    __toArray(csdlComplexType.property).forEach(function (prop) {
      parseCsdlDataProperty(complexType, prop, schema);
    });

    metadataStore.addEntityType(complexType);
    return complexType;
  }

  function parseCsdlDataProperty(parentType, csdlProperty, schema, keyNamesOnServer) {
    var dp;
    var typeParts = csdlProperty.type.split(".");
    // Both tests on typeParts are necessary because of differing metadata conventions for OData and Edmx feeds.
    if (typeParts[0] === "Edm" && typeParts.length === 2) {
      dp = parseCsdlSimpleProperty(parentType, csdlProperty, keyNamesOnServer);
    } else {
      if (isEnumType(csdlProperty, schema)) {
        dp = parseCsdlSimpleProperty(parentType, csdlProperty, keyNamesOnServer);
        if (dp) {
          dp.enumType = csdlProperty.type;
        }
      } else {
        dp = parseCsdlComplexProperty(parentType, csdlProperty, schema);
      }
    }
    if (dp) {
      parentType._addPropertyCore(dp);
      addValidators(dp);
    }
    return dp;
  }

  function parseCsdlSimpleProperty(parentType, csdlProperty, keyNamesOnServer) {
    var dataType = DataType.fromEdmDataType(csdlProperty.type);
    if (dataType == null) {
      parentType.warnings.push("Unable to recognize DataType for property: " + csdlProperty.name + " DateType: " + csdlProperty.type);
      return null;
    }
    var isNullable = csdlProperty.nullable === 'true' || csdlProperty.nullable == null;
    // var fixedLength = csdlProperty.fixedLength ? csdlProperty.fixedLength === true : undefined;
    var isPartOfKey = keyNamesOnServer != null && keyNamesOnServer.indexOf(csdlProperty.name) >= 0;
    if (isPartOfKey && parentType.autoGeneratedKeyType === AutoGeneratedKeyType.None) {
      if (isIdentityProperty(csdlProperty)) {
        parentType.autoGeneratedKeyType = AutoGeneratedKeyType.Identity;
      }
    }
    // TODO: nit - don't set maxLength if null;
    var maxLength = csdlProperty.maxLength;
    maxLength = (maxLength == null || maxLength === "Max") ? null : parseInt(maxLength, 10);
    // can't set the name until we go thru namingConventions and these need the dp.


    var dp = new DataProperty({
      nameOnServer: csdlProperty.name,
      dataType: dataType,
      isNullable: isNullable,
      isPartOfKey: isPartOfKey,
      maxLength: maxLength,
      defaultValue: csdlProperty.defaultValue,
      // fixedLength: fixedLength,
      concurrencyMode: csdlProperty.concurrencyMode
    });

    if (dataType === DataType.Undefined) {
      dp.rawTypeName = csdlProperty.type;
    }
    return dp;
  }

  function parseCsdlComplexProperty(parentType, csdlProperty, schema) {

    // Complex properties are never nullable ( per EF specs)
    // var isNullable = csdlProperty.nullable === 'true' || csdlProperty.nullable == null;
    // var complexTypeName = csdlProperty.type.split("Edm.")[1];
    var complexTypeName = parseTypeNameWithSchema(csdlProperty.type, schema).typeName;
    // can't set the name until we go thru namingConventions and these need the dp.
    var dp = new DataProperty({
      nameOnServer: csdlProperty.name,
      complexTypeName: complexTypeName,
      isNullable: false
    });

    return dp;
  }

  function parseCsdlNavProperty(entityType, csdlProperty, schema) {
    var association = getAssociation(csdlProperty, schema);
    var toEnd = __arrayFirst(association.end, function (assocEnd) {
      return assocEnd.role === csdlProperty.toRole;
    });

    var isScalar = toEnd.multiplicity !== "*";
    var dataType = parseTypeNameWithSchema(toEnd.type, schema).typeName;

    var constraint = association.referentialConstraint;
    if (!constraint) {
      // TODO: Revisit this later - right now we just ignore many-many and assocs with missing constraints.

      // Think about adding this back later.
      if (association.end[0].multiplicity == "*" && association.end[1].multiplicity == "*") {
        // ignore many to many relations for now
        return;
      } else {
        // For now assume it will be set later directly on the client.
        // other alternative is to throw an error:
        // throw new Error("Foreign Key Associations must be turned on for this model");
      }
    }

    var cfg = {
      nameOnServer: csdlProperty.name,
      entityTypeName: dataType,
      isScalar: isScalar,
      associationName: association.name
    };

    if (constraint) {
      var principal = constraint.principal;
      var dependent = constraint.dependent;

      var propRefs = __toArray(dependent.propertyRef);
      var fkNames = propRefs.map(__pluck("name"));
      if (csdlProperty.fromRole === principal.role) {
        cfg.invForeignKeyNamesOnServer = fkNames;
      } else {
        // will be used later by np._update
        cfg.foreignKeyNamesOnServer = fkNames;
      }
    }

    var np = new NavigationProperty(cfg);
    entityType._addPropertyCore(np);
    return np;
  }

  function isEnumType(csdlProperty, schema) {
    if (schema.enumType) return isEdmxEnumType(csdlProperty, schema);
    else if (schema.extensions) return isODataEnumType(csdlProperty, schema);
    else return false;
  }

  function isEdmxEnumType(csdlProperty, schema) {
    var enumTypes = __toArray(schema.enumType);
    var typeParts = csdlProperty.type.split(".");
    var baseTypeName = typeParts[typeParts.length - 1];
    return enumTypes.some(function (enumType) {
      return enumType.name === baseTypeName;
    });
  }

  function isODataEnumType(csdlProperty, schema) {
    var enumTypes = schema.extensions.filter(function (ext) {
      return ext.name === "EnumType";
    });
    var typeParts = csdlProperty.type.split(".");
    var baseTypeName = typeParts[typeParts.length - 1];
    return enumTypes.some(function (enumType) {
      return enumType.attributes.some(function (attr) {
        return attr.name === "Name" && attr.value === baseTypeName;
      });
    });
  }

  function addValidators(dataProperty) {
    var typeValidator;
    if (!dataProperty.isNullable) {
      dataProperty.validators.push(Validator.required());
    }

    if (dataProperty.isComplexProperty) return;

    if (dataProperty.dataType === DataType.String) {
      if (dataProperty.maxLength) {
        var validatorArgs = { maxLength: dataProperty.maxLength };
        typeValidator = Validator.maxLength(validatorArgs);
      } else {
        typeValidator = Validator.string();
      }
    } else {
      typeValidator = dataProperty.dataType.validatorCtor();
    }

    dataProperty.validators.push(typeValidator);

  }

  function isIdentityProperty(csdlProperty) {
    // see if web api feed
    var propName = __arrayFirst(Object.keys(csdlProperty), function (pn) {
      return pn.indexOf("StoreGeneratedPattern") >= 0;
    });
    if (propName) {
      return (csdlProperty[propName] === "Identity");
    } else {
      // see if Odata feed
      var extensions = csdlProperty.extensions;
      if (!extensions) {
        return false;
      }
      var identityExtn = __arrayFirst(extensions, function (extension) {
        return extension.name === "StoreGeneratedPattern" && extension.value === "Identity";
      });
      return !!identityExtn;
    }
  }

  // Fast version
  // np: schema.entityType[].navigationProperty.relationship -> schema.association
  //   match( shortName(np.relationship) == schema.association[].name
  //      --> association__

  // Correct version
  // np: schema.entityType[].navigationProperty.relationship -> schema.association
  //   match( np.relationship == schema.entityContainer[0].associationSet[].association )
  //      -> associationSet.name
  //   match ( associationSet.name == schema.association[].name )
  //      -> association

  function getAssociation(csdlNavProperty, schema) {
    var assocName = parseTypeNameWithSchema(csdlNavProperty.relationship, schema).shortTypeName;
    var assocs = schema.association;
    if (!assocs) return null;
    if (!Array.isArray(assocs)) {
      assocs = [assocs];
    }
    var association = __arrayFirst(assocs, function (assoc) {
      return assoc.name === assocName;
    });
    return association;
  }

  // schema is only needed for navProperty type name
  function parseTypeNameWithSchema(entityTypeName, schema) {
    var result = parseTypeName(entityTypeName);
    if (schema) {
      var ns = getNamespaceFor(result.shortTypeName, schema);
      if (ns) {
        result = makeTypeHash(result.shortTypeName, ns);
      }
    }
    return result;
  }

  function getNamespaceFor(shortName, schema) {
    var ns;
    var mapping = schema.cSpaceOSpaceMapping;
    if (mapping) {
      var fullName = mapping[schema.namespace + "." + shortName];
      ns = fullName && fullName.substr(0, fullName.length - (shortName.length + 1));
      if (ns) return ns;
    }
    // if schema does not also have an entityType node then
    // this is an WebApi2 OData schema which is usually equal to 'Default'; which is useless.
    if (schema.entityType || schema.namespace != 'Default') {
      return schema.namespace;
    }
    return null;
  }

  return {
    parse: parse
  };

})();

var EntityType = (function () {
  /**
  Container for all of the metadata about a specific type of Entity.
  @class EntityType
  **/
  var __nextAnonIx = 0;


  /**
  @example
      var entityType = new EntityType( {
          shortName: "person",
          namespace: "myAppNamespace"
      });
  @method <ctor> EntityType
  @param config {Object|MetadataStore} Configuration settings or a MetadataStore.  If this parameter is just a MetadataStore
  then what will be created is an 'anonymous' type that will never be communicated to or from the server. It is purely for
  client side use and will be given an automatically generated name. Normally, however, you will use a configuration object.
  @param config.shortName {String}
  @param [config.namespace=""] {String}
  @param [config.baseTypeName] {String}
  @param [config.isAbstract=false] {Boolean}
  @param [config.autoGeneratedKeyType] {AutoGeneratedKeyType}
  @param [config.defaultResourceName] {String}
  @param [config.dataProperties] {Array of DataProperties}
  @param [config.navigationProperties] {Array of NavigationProperties}
  @param [config.serializerFn] A function that is used to mediate the serialization of instances of this type.
  @param [config.custom] {Object}
  **/
  var ctor = function EntityType(config) {
    if (arguments.length > 1) {
      throw new Error("The EntityType ctor has a single argument that is either a 'MetadataStore' or a configuration object.");
    }
    if (config._$typeName === "MetadataStore") {
      this.metadataStore = config;
      this.shortName = "Anon_" + (++__nextAnonIx);
      this.namespace = "";
      this.isAnonymous = true;
    } else {
      assertConfig(config)
          .whereParam("shortName").isNonEmptyString()
          .whereParam("namespace").isString().isOptional().withDefault("")
          .whereParam("baseTypeName").isString().isOptional()
          .whereParam("isAbstract").isBoolean().isOptional().withDefault(false)
          .whereParam("autoGeneratedKeyType").isEnumOf(AutoGeneratedKeyType).isOptional().withDefault(AutoGeneratedKeyType.None)
          .whereParam("defaultResourceName").isNonEmptyString().isOptional().withDefault(null)
          .whereParam("dataProperties").isOptional()
          .whereParam("navigationProperties").isOptional()
          .whereParam("serializerFn").isOptional().isFunction()
          .whereParam("custom").isOptional()
          .applyAll(this);
    }

    this.name = qualifyTypeName(this.shortName, this.namespace);

    // the defaultResourceName may also be set up either via metadata lookup or first query or via the 'setProperties' method
    this.dataProperties = [];
    this.navigationProperties = [];
    this.complexProperties = [];
    this.keyProperties = [];
    this.foreignKeyProperties = [];
    this.inverseForeignKeyProperties = [];
    this.concurrencyProperties = [];
    this.unmappedProperties = []; // will be updated later.
    this.validators = [];
    this.warnings = [];
    this._mappedPropertiesCount = 0;
    this.subtypes = [];
    // now process any data/nav props
    addProperties(this, config.dataProperties, DataProperty);
    addProperties(this, config.navigationProperties, NavigationProperty);
  };
  var proto = ctor.prototype;
  var parseRawValue = DataType.parseRawValue;
  proto._$typeName = "EntityType";
  ctor.qualifyTypeName = qualifyTypeName;

  /**
  The {{#crossLink "MetadataStore"}}{{/crossLink}} that contains this EntityType

  __readOnly__
  @property metadataStore {MetadataStore}
  **/

  /**
  The DataProperties (see {{#crossLink "DataProperty"}}{{/crossLink}}) associated with this EntityType.

  __readOnly__
  @property dataProperties {Array of DataProperty}
  **/

  /**
  The NavigationProperties  (see {{#crossLink "NavigationProperty"}}{{/crossLink}}) associated with this EntityType.

  __readOnly__
  @property navigationProperties {Array of NavigationProperty}
  **/

  /**
  The DataProperties for this EntityType that contain instances of a ComplexType (see {{#crossLink "ComplexType"}}{{/crossLink}}).

  __readOnly__
  @property complexProperties {Array of DataProperty}
  **/

  /**
  The DataProperties associated with this EntityType that make up it's {{#crossLink "EntityKey"}}{{/crossLink}}.

  __readOnly__
  @property keyProperties {Array of DataProperty}
  **/

  /**
  The DataProperties associated with this EntityType that are foreign key properties.

  __readOnly__
  @property foreignKeyProperties {Array of DataProperty}
  **/

  /**
  The DataProperties associated with this EntityType that are concurrency properties.

  __readOnly__
  @property concurrencyProperties {Array of DataProperty}
  **/

  /**
  The DataProperties associated with this EntityType that are not mapped to any backend datastore. These are effectively free standing
  properties.

  __readOnly__
  @property unmappedProperties {Array of DataProperty}
  **/

  /**
  The default resource name associated with this EntityType.  An EntityType may be queried via a variety of 'resource names' but this one
  is used as the default when no resource name is provided.  This will occur when calling {{#crossLink "EntityAspect/loadNavigationProperty"}}{{/crossLink}}
  or when executing any {{#crossLink "EntityQuery"}}{{/crossLink}} that was created via an {{#crossLink "EntityKey"}}{{/crossLink}}.

  __readOnly__
  @property defaultResourceName {String}
  **/

  /**
  The fully qualified name of this EntityType.

  __readOnly__
  @property name {String}
  **/

  /**
  The short, unqualified, name for this EntityType.

  __readOnly__
  @property shortName {String}
  **/

  /**
  The namespace for this EntityType.

  __readOnly__
  @property namespace {String}
  **/

  /**
  The base EntityType (if any) for this EntityType.

  __readOnly__
  @property baseEntityType {EntityType}
  **/

  /**
  Whether this EntityType is abstract.

  __readOnly__
  @property isAbstract {boolean}
  **/

  /**
  The {{#crossLink "AutoGeneratedKeyType"}}{{/crossLink}} for this EntityType.

  __readOnly__
  @property autoGeneratedKeyType {AutoGeneratedKeyType}
  @default AutoGeneratedKeyType.None
  **/

  /**
  The entity level validators associated with this EntityType. Validators can be added and
  removed from this collection.

  __readOnly__
  @property validators {Array of Validator}
  **/

  /**
  A free form object that can be used to define any custom metadata for this EntityType.

  __readOnly__
  @property custom {Object}
  **/

  /**
  General purpose property set method
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      custType.setProperties( {
          autoGeneratedKeyType: AutoGeneratedKeyType.Identity;
          defaultResourceName: "CustomersAndIncludedOrders"
      )};
  @method setProperties
  @param config [object]
  @param [config.autogeneratedKeyType] {AutoGeneratedKeyType}
  @param [config.defaultResourceName] {String}
  @param [config.serializerFn] A function that is used to mediate the serialization of instances of this type.
  @param [config.custom] {Object}
  **/
  proto.setProperties = function (config) {
    assertConfig(config)
        .whereParam("autoGeneratedKeyType").isEnumOf(AutoGeneratedKeyType).isOptional()
        .whereParam("defaultResourceName").isString().isOptional()
        .whereParam("serializerFn").isFunction().isOptional()
        .whereParam("custom").isOptional()
        .applyAll(this);
    if (config.defaultResourceName) {
      this.defaultResourceName = config.defaultResourceName;
    }
  };

  /**
  Returns whether this type is a subtype of a specified type.

  @method isSubtypeOf
  @param entityType [EntityType]
  **/
  proto.isSubtypeOf = function (entityType) {
    assertParam(entityType, "entityType").isInstanceOf(EntityType).check();
    var baseType = this;
    do {
      if (baseType === entityType) return true;
      baseType = baseType.baseEntityType;
    } while (baseType);
    return false;
  };

  /**
  Returns an array containing this type and any/all subtypes of this type down thru the hierarchy.

  @method getSelfAndSubtypes
  **/
  proto.getSelfAndSubtypes = function () {
    var result = [this];
    this.subtypes.forEach(function (st) {
      var subtypes = st.getSelfAndSubtypes();
      result.push.apply(result, subtypes);
    });
    return result;
  };

  proto.getAllValidators = function () {
    var result = this.validators.slice(0);
    var bt = this.baseEntityType;
    while (bt) {
      result.push.apply(result, bt.validators);
      bt = bt.baseEntityType;
    }
    ;
    return result;
  }

  /**
  Adds a  {{#crossLink "DataProperty"}}{{/crossLink}} or a {{#crossLink "NavigationProperty"}}{{/crossLink}} to this EntityType.
  @example
      // assume myEntityType is a newly constructed EntityType.
      myEntityType.addProperty(dataProperty1);
      myEntityType.addProperty(dataProperty2);
      myEntityType.addProperty(navigationProperty1);
  @method addProperty
  @param property {DataProperty|NavigationProperty}
  **/
  proto.addProperty = function (property) {
    assertParam(property, "property").isInstanceOf(DataProperty).or().isInstanceOf(NavigationProperty).check();

    // true is 2nd arg to force resolve of any navigation properties.
    return this._addPropertyCore(property, true);
  };

  proto._updateFromBase = function (baseEntityType) {
    this.baseEntityType = baseEntityType;
    if (this.autoGeneratedKeyType === AutoGeneratedKeyType.None) {
      this.autoGeneratedKeyType = baseEntityType.autoGeneratedKeyType;
    }

    baseEntityType.dataProperties.forEach(function (dp) {
      var newDp = new DataProperty(dp);
      // don't need to copy validators becaue we will walk the hierarchy to find them
      newDp.validators = [];
      newDp.baseProperty = dp;
      this._addPropertyCore(newDp);
    }, this);
    baseEntityType.navigationProperties.forEach(function (np) {
      var newNp = new NavigationProperty(np);
      // don't need to copy validators becaue we will walk the hierarchy to find them
      newNp.validators = [];
      newNp.baseProperty = np;
      this._addPropertyCore(newNp);
    }, this);
    baseEntityType.subtypes.push(this);
  }

  proto._addPropertyCore = function (property, shouldResolve) {
    if (this.isFrozen) {
      throw new Error("The '" + this.name + "' EntityType/ComplexType has been frozen. You can only add properties to an EntityType/ComplexType before any instances of that type have been created and attached to an entityManager.");
    }
    var parentType = property.parentType;
    if (parentType) {
      if (parentType !== this) {
        throw new Error("This property: " + property.name + " has already been added to " + property.parentType.name);
      } else {
        // adding the same property more than once to the same entityType is just ignored.
        return this;
      }
    }
    property.parentType = this;
    var ms = this.metadataStore;
    if (property.isDataProperty) {
      this._addDataProperty(property);
    } else {
      this._addNavigationProperty(property);
      // metadataStore can be undefined if this entityType has not yet been added to a MetadataStore.
      if (shouldResolve && ms) {
        tryResolveNp(property, ms);
      }
    }
    // unmapped properties can be added AFTER entityType has already resolved all property names.
    if (ms && !(property.name && property.nameOnServer)) {
      updateClientServerNames(ms.namingConvention, property, "name");
    }
    // props can be added after entity prototype has already been wrapped.
    if (ms && this._extra) {
      if (this._extra.alreadyWrappedProps) {
        var proto = this._ctor.prototype;
        __modelLibraryDef.getDefaultInstance().initializeEntityPrototype(proto);
      }
    }
    return this;
  };

  /**
  Create a new entity of this type.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var cust1 = custType.createEntity();
      em1.addEntity(cust1);
  @method createEntity
  @param [initialValues] {Config object} - Configuration object of the properties to set immediately after creation.
  @return {Entity} The new entity.
  **/
  proto.createEntity = function (initialValues) {
    // ignore the _$eref once the entity is attached to an entityManager.
    if (initialValues && initialValues._$eref && !initialValues._$eref.entityAspect.entityManager) return initialValues._$eref;

    var instance = this._createInstanceCore();

    if (initialValues) {
      // only assign an _eref if the object is fully "keyed"
      if (this.keyProperties.every(function (kp) {
        return initialValues[kp.name] != null;
      })) {
        initialValues._$eref = instance;
      }
      ;

      this._updateTargetFromRaw(instance, initialValues, getRawValueFromConfig);

      this.navigationProperties.forEach(function (np) {
        var relatedEntity;
        var val = initialValues[np.name];
        if (val != undefined) {
          var navEntityType = np.entityType;
          if (np.isScalar) {
            relatedEntity = val.entityAspect ? val : navEntityType.createEntity(val);
            instance.setProperty(np.name, relatedEntity);
          } else {
            var relatedEntities = instance.getProperty(np.name);
            val.forEach(function (v) {
              relatedEntity = v.entityAspect ? v : navEntityType.createEntity(v);
              relatedEntities.push(relatedEntity);
            });
          }
        }
      });
    }

    this._initializeInstance(instance);
    return instance;
  };

  function getRawValueFromConfig(rawEntity, dp) {
    // 'true' fork can happen if an initializer contains an actaul instance of an already created complex object.
    return (rawEntity.entityAspect || rawEntity.complexAspect) ? rawEntity.getProperty(dp.name) : rawEntity[dp.name];
  }

  proto._createInstanceCore = function () {
    var aCtor = this.getEntityCtor();
    var instance = new aCtor();
    new EntityAspect(instance);
    return instance;
  };

  proto._initializeInstance = function (instance) {
    if (this.baseEntityType) {
      this.baseEntityType._initializeInstance(instance);
    }
    var initFn = this.initFn;
    if (initFn) {
      if (typeof initFn === "string") {
        initFn = instance[initFn];
      }
      initFn(instance);
    }
    this.complexProperties && this.complexProperties.forEach(function (cp) {
      var ctInstance = instance.getProperty(cp.name);
      if (Array.isArray(ctInstance)) {
        ctInstance.forEach(function (ctInst) {
          cp.dataType._initializeInstance(ctInst);
        });
      } else {
        cp.dataType._initializeInstance(ctInstance);
      }
    });
    // not needed for complexObjects
    if (instance.entityAspect) {
      instance.entityAspect._initialized = true;
    }
  };

  /**
  Returns the constructor for this EntityType.
  @method getCtor ( or obsolete getEntityCtor)
  @return {Function} The constructor for this EntityType.
  **/
  proto.getCtor = proto.getEntityCtor = function (forceRefresh) {
    if (this._ctor && !forceRefresh) return this._ctor;

    var ctorRegistry = this.metadataStore._ctorRegistry;
    var r = ctorRegistry[this.name] || ctorRegistry[this.shortName] || {};
    var aCtor = r.ctor || this._ctor;

    var ctorType = aCtor && aCtor.prototype && (aCtor.prototype.entityType || aCtor.prototype.complexType);
    if (ctorType && ctorType.metadataStore !== this.metadataStore) {
      // We can't risk a mismatch between the ctor and the type info in a specific metadatastore
      // because modelLibraries rely on type info to intercept ctor properties
      throw new Error("Cannot register the same constructor for " + this.name + " in different metadata stores.  Please define a separate constructor for each metadata store.");
    }


    if (r.ctor && forceRefresh) {
      this._extra = undefined;
    }

    if (!aCtor) {
      var createCtor = __modelLibraryDef.getDefaultInstance().createCtor;
      aCtor = createCtor ? createCtor(this) : createEmptyCtor(this);
    }

    this.initFn = r.initFn;
    this.noTrackingFn = r.noTrackingFn;

    aCtor.prototype._$typeName = this.name;
    this._setCtor(aCtor);
    return aCtor;
  };

  function createEmptyCtor(type) {
    var name = type.name.replace(/\W/g, '_');
    return Function('return function '+name+'(){}')();
  }

  // May make public later.
  proto._setCtor = function (aCtor, interceptor) {

    var instanceProto = aCtor.prototype;

    // place for extra breeze related data
    this._extra = this._extra || {};

    var instance = new aCtor();
    calcUnmappedProperties(this, instance);

    if (this._$typeName === "EntityType") {
      // insure that all of the properties are on the 'template' instance before watching the class.
      instanceProto.entityType = this;
    } else {
      instanceProto.complexType = this;
    }

    // defaultPropertyInterceptor is a 'global' (but internal to breeze) function;
    instanceProto._$interceptor = interceptor || defaultPropertyInterceptor;
    __modelLibraryDef.getDefaultInstance().initializeEntityPrototype(instanceProto);
    this._ctor = aCtor;
  };

  /**
  Adds either an entity or property level validator to this EntityType.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var countryProp = custType.getProperty("Country");
      var valFn = function (v) {
              if (v == null) return true;
              return (core.stringStartsWith(v, "US"));
          };
      var countryValidator = new Validator("countryIsUS", valFn,
      { displayName: "Country", messageTemplate: "'%displayName%' must start with 'US'" });
      custType.addValidator(countryValidator, countryProp);
  This is the same as adding an entity level validator via the 'validators' property of DataProperty or NavigationProperty
  @example
      countryProp.validators.push(countryValidator);
  Entity level validators can also be added by omitting the 'property' parameter.
  @example
      custType.addValidator(someEntityLevelValidator);
  or
  @example
      custType.validators.push(someEntityLevelValidator);
  @method addValidator
  @param validator {Validator} Validator to add.
  @param [property] Property to add this validator to.  If omitted, the validator is assumed to be an
  entity level validator and is added to the EntityType's 'validators'.
  **/
  proto.addValidator = function (validator, property) {
    assertParam(validator, "validator").isInstanceOf(Validator).check();
    assertParam(property, "property").isOptional().isString().or().isEntityProperty().check();
    if (property) {
      if (typeof (property) === 'string') {
        property = this.getProperty(property, true);
      }
      property.validators.push(validator);
    } else {
      this.validators.push(validator);
    }
  };

  /**
  Returns all of the properties ( dataProperties and navigationProperties) for this EntityType.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var arrayOfProps = custType.getProperties();
  @method getProperties
  @return {Array of DataProperty|NavigationProperty} Array of Data and Navigation properties.
  **/
  proto.getProperties = function () {
    return this.dataProperties.concat(this.navigationProperties);
  };

  /**
  Returns all of the property names ( for both dataProperties and navigationProperties) for this EntityType.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var arrayOfPropNames = custType.getPropertyNames();
  @method getPropertyNames
  @return {Array of String}
  **/
  proto.getPropertyNames = function () {
    return this.getProperties().map(__pluck('name'));
  };

  /**
  Returns a data property with the specified name or null.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var customerNameDataProp = custType.getDataProperty("CustomerName");
  @method getDataProperty
  @param propertyName {String}
  @return {DataProperty} Will be null if not found.
  **/
  proto.getDataProperty = function (propertyName) {
    return __arrayFirst(this.dataProperties, __propEq('name', propertyName));
  };

  /**
  Returns a navigation property with the specified name or null.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var customerOrdersNavProp = custType.getDataProperty("Orders");
  @method getNavigationProperty
  @param propertyName {String}
  @return {NavigationProperty} Will be null if not found.
  **/
  proto.getNavigationProperty = function (propertyName) {
    return __arrayFirst(this.navigationProperties, __propEq('name', propertyName));
  };

  /**
  Returns either a DataProperty or a NavigationProperty with the specified name or null.

  This method also accepts a '.' delimited property path and will return the 'property' at the
  end of the path.
  @example
      var custType = em1.metadataStore.getEntityType("Customer");
      var companyNameProp = custType.getProperty("CompanyName");
  This method can also walk a property path to return a property
  @example
      var orderDetailType = em1.metadataStore.getEntityType("OrderDetail");
      var companyNameProp2 = orderDetailType.getProperty("Order.Customer.CompanyName");
      // companyNameProp === companyNameProp2
  @method getProperty
  @param propertyPath {String}
  @param [throwIfNotFound=false] {Boolean} Whether to throw an exception if not found.
  @return {DataProperty|NavigationProperty} Will be null if not found.
  **/
  proto.getProperty = function (propertyPath, throwIfNotFound) {
    var props = this.getPropertiesOnPath(propertyPath, false, throwIfNotFound);
    return props ? props[props.length - 1] : null;
  };

  proto.getPropertiesOnPath = function(propertyPath, useServerName, throwIfNotFound) {
    throwIfNotFound = throwIfNotFound || false;
    var propertyNames = (Array.isArray(propertyPath)) ? propertyPath : propertyPath.trim().split('.');

    var ok = true;
    var parentType = this;
    var key = useServerName ? "nameOnServer" : "name";
    var props = propertyNames.map(function (propName) {
      var prop = __arrayFirst(parentType.getProperties(), __propEq(key, propName));
      if (prop) {
        parentType = prop.isNavigationProperty ? prop.entityType : prop.dataType;
      } else if (throwIfNotFound) {
        throw new Error("unable to locate property: " + propName + " on entityType: " + parentType.name);
      } else {
        ok = false;
      }
      return prop;
    });
    return ok ? props : null;
  }

  proto.clientPropertyPathToServer = function(propertyPath, delimiter) {
    var delimiter = delimiter || '.';
    var propNames;
    if (this.isAnonymous) {
      var fn = this.metadataStore.namingConvention.clientPropertyNameToServer;
      propNames = propertyPath.split(".").map(function (propName) {
        return fn(propName);
      });
    } else {
      propNames = this.getPropertiesOnPath(propertyPath, false, true).map(function(prop) {
        return prop.nameOnServer;
      });
    }
    return propNames.join(delimiter);
  }

  proto.getEntityKeyFromRawEntity = function (rawEntity, rawValueFn) {
    var keyValues = this.keyProperties.map(function (dp) {
      var val = rawValueFn(rawEntity, dp);
      return parseRawValue(val, dp.dataType);
    });
    return new EntityKey(this, keyValues);
  };

  proto._updateTargetFromRaw = function (target, raw, rawValueFn) {
    // called recursively for complex properties
    this.dataProperties.forEach(function (dp) {
      if (!dp.isSettable) return;
      var rawVal = rawValueFn(raw, dp);
      if (rawVal === undefined) return;
      var dataType = dp.dataType; // this will be a complexType when dp is a complexProperty
      var oldVal;
      if (dp.isComplexProperty) {
        if (rawVal === null) return; // rawVal may be null in nosql dbs where it was never defined for the given row.
        oldVal = target.getProperty(dp.name);
        if (dp.isScalar) {
          dataType._updateTargetFromRaw(oldVal, rawVal, rawValueFn);
        } else {
          if (Array.isArray(rawVal)) {
            var newVal = rawVal.map(function (rawCo) {
              var newCo = dataType._createInstanceCore(target, dp);
              dataType._updateTargetFromRaw(newCo, rawCo, rawValueFn);
              dataType._initializeInstance(newCo);
              return newCo;
            });
            if (!__arrayEquals(oldVal, newVal, coEquals)) {
              // clear the old array and push new objects into it.
              oldVal.length = 0;
              newVal.forEach(function (nv) {
                oldVal.push(nv);
              });
            }
          } else {
            oldVal.length = 0;
          }
        }
      } else {
        var val;
        if (dp.isScalar) {
          var newVal = parseRawValue(rawVal, dataType);
          target.setProperty(dp.name, newVal);
        } else {
          oldVal = target.getProperty(dp.name);
          if (Array.isArray(rawVal)) {
            // need to compare values
            var newVal = rawVal.map(function (rv) {
              return parseRawValue(rv, dataType);
            });
            if (!__arrayEquals(oldVal, newVal)) {
              // clear the old array and push new objects into it.
              oldVal.length = 0;
              newVal.forEach(function (nv) {
                oldVal.push(nv);
              });
            }
          } else {
            oldVal.length = 0;
          }

        }
      }
    });

    // if merging from an import then raw will have an entityAspect or a complexAspect
    var rawAspect = raw.entityAspect || raw.complexAspect;
    if (rawAspect) {
      var targetAspect = target.entityAspect || target.complexAspect;
      if (rawAspect.originalValuesMap) {
        targetAspect.originalValues = rawAspect.originalValuesMap;
      }
      if (rawAspect.extraMetadata) {
        targetAspect.extraMetadata = rawAspect.extraMetadata;
      }
    }
  }

  function coEquals(co1, co2) {
    var dataProps = co1.complexAspect.parentProperty.dataType.dataProperties;
    var areEqual = dataProps.every(function (dp) {
      if (!dp.isSettable) return true;
      var v1 = co1.getProperty(dp.name);
      var v2 = co2.getProperty(dp.name);
      if (dp.isComplexProperty) {
        return coEquals(v1, v2);
      } else {
        var dataType = dp.dataType; // this will be a complexType when dp is a complexProperty
        return (v1 === v2 || (dataType && dataType.isDate && v1 && v2 && v1.valueOf() === v2.valueOf()));
      }
    });
    return areEqual;
  }

  /**
  Returns a string representation of this EntityType.
  @method toString
  @return {String}
  **/
  proto.toString = function () {
    return this.name;
  };

  proto.toJSON = function () {
    return __toJson(this, {
      shortName: null,
      namespace: null,
      baseTypeName: null,
      isAbstract: false,
      autoGeneratedKeyType: null, // do not suppress default value
      defaultResourceName: null,
      dataProperties: localPropsOnly,
      navigationProperties: localPropsOnly,
      validators: null,
      custom: null
    });
  };

  function localPropsOnly(props) {
    return props.filter(function (prop) {
      return prop.baseProperty == null;
    });
  }



  proto._updateNames = function (property) {
    var nc = this.metadataStore.namingConvention;
    updateClientServerNames(nc, property, "name");

    if (property.isNavigationProperty) {
      updateClientServerNames(nc, property, "foreignKeyNames");
      updateClientServerNames(nc, property, "invForeignKeyNames");

      // these will get set later via _updateNps
      // this.inverse
      // this.entityType
      // this.relatedDataProperties
      //    dataProperty.relatedNavigationProperty
      //    dataProperty.inverseNavigationProperty
    }
  };



  function updateClientServerNames(nc, parent, clientPropName) {
    var serverPropName = clientPropName + "OnServer";
    var clientName = parent[clientPropName];
    if (clientName && clientName.length) {
      // if (parent.isUnmapped) return;
      var serverNames = __toArray(clientName).map(function (cName) {
        var sName = nc.clientPropertyNameToServer(cName, parent);
        var testName = nc.serverPropertyNameToClient(sName, parent);
        if (cName !== testName) {
          throw new Error("NamingConvention for this client property name does not roundtrip properly:" + cName + "-->" + testName);
        }
        return sName;
      });
      parent[serverPropName] = Array.isArray(clientName) ? serverNames : serverNames[0];
    } else {
      var serverName = parent[serverPropName];
      if ((!serverName) || serverName.length === 0) return;
      var clientNames = __toArray(serverName).map(function (sName) {
        var cName = nc.serverPropertyNameToClient(sName, parent);
        var testName = nc.clientPropertyNameToServer(cName, parent);
        if (sName !== testName) {
          throw new Error("NamingConvention for this server property name does not roundtrip properly:" + sName + "-->" + testName);
        }
        return cName;
      });
      parent[clientPropName] = Array.isArray(serverName) ? clientNames : clientNames[0];
    }
  }

  proto._checkNavProperty = function (navigationProperty) {
    if (navigationProperty.isNavigationProperty) {
      if (navigationProperty.parentType !== this) {
        throw new Error(__formatString("The navigationProperty '%1' is not a property of entity type '%2'",
            navigationProperty.name, this.name));
      }
      return navigationProperty;
    }

    if (typeof (navigationProperty) === 'string') {
      var np = this.getProperty(navigationProperty);
      if (np && np.isNavigationProperty) return np;
    }
    throw new Error("The 'navigationProperty' parameter must either be a NavigationProperty or the name of a NavigationProperty");
  };

  proto._addDataProperty = function (dp) {

    this.dataProperties.push(dp);

    if (dp.isPartOfKey) {
      this.keyProperties.push(dp);
    }

    if (dp.isComplexProperty) {
      this.complexProperties.push(dp);
    }

    if (dp.concurrencyMode && dp.concurrencyMode !== "None") {
      this.concurrencyProperties.push(dp);
    }

    if (dp.isUnmapped) {
      this.unmappedProperties.push(dp);
    }

  };

  proto._addNavigationProperty = function (np) {

    this.navigationProperties.push(np);

    if (!isQualifiedTypeName(np.entityTypeName)) {
      np.entityTypeName = qualifyTypeName(np.entityTypeName, this.namespace);
    }
  };

  proto._updateCps = function () {
    var metadataStore = this.metadataStore;
    var incompleteTypeMap = metadataStore._incompleteComplexTypeMap;
    this.complexProperties.forEach(function (cp) {
      if (cp.complexType) return;
      if (!resolveCp(cp, metadataStore)) {
        __getArray(incompleteTypeMap, cp.complexTypeName).push(cp);
      }
    });

    if (this.isComplexType) {
      (incompleteTypeMap[this.name] || []).forEach(function (cp) {
        resolveCp(cp, metadataStore);
      });
      delete incompleteTypeMap[this.name];
    }
  };

  function resolveCp(cp, metadataStore) {
    var complexType = metadataStore._getEntityType(cp.complexTypeName, true);
    if (!complexType) return false;
    if (!(complexType instanceof ComplexType)) {
      throw new Error("Unable to resolve ComplexType with the name: " + cp.complexTypeName + " for the property: " + property.name);
    }
    cp.dataType = complexType;
    cp.defaultValue = null;
    return true;
  }

  proto._updateNps = function () {
    var metadataStore = this.metadataStore;

    // resolve all navProps for this entityType
    this.navigationProperties.forEach(function (np) {
      tryResolveNp(np, metadataStore);
    });
    var incompleteTypeMap = metadataStore._incompleteTypeMap;
    // next resolve all navProp that point to this entityType.
    (incompleteTypeMap[this.name] || []).forEach(function (np) {
      tryResolveNp(np, metadataStore);
    });
    // every navProp that pointed to this type should now be resolved
    delete incompleteTypeMap[this.name];
  };

  function tryResolveNp(np, metadataStore) {
    if (np.entityType) return true;

    var entityType = metadataStore._getEntityType(np.entityTypeName, true);
    if (entityType) {
      np.entityType = entityType;
      np._resolveNp();
      // don't bother removing - _updateNps will do it later.
      // __arrayRemoveItem(incompleteNps, np, false);
    } else {
      var incompleteNps = __getArray(metadataStore._incompleteTypeMap, np.entityTypeName);
      __arrayAddItemUnique(incompleteNps, np);
    }
    return !!entityType;
  }

  function calcUnmappedProperties(stype, instance) {
    var metadataPropNames = stype.getPropertyNames();
    var modelLib = __modelLibraryDef.getDefaultInstance();
    var trackablePropNames = modelLib.getTrackablePropertyNames(instance);
    trackablePropNames.forEach(function (pn) {
      if (metadataPropNames.indexOf(pn) === -1) {
        var val = instance[pn];
        try {
          if (typeof val == "function") val = val();
        } catch (e) {
        }
        var dt = DataType.fromValue(val);
        var newProp = new DataProperty({
          name: pn,
          dataType: dt,
          isNullable: true,
          isUnmapped: true
        });
        newProp.isSettable = __isSettable(instance, pn);
        if (stype.subtypes) {
          stype.getSelfAndSubtypes().forEach(function (st) {
            st._addPropertyCore(new DataProperty(newProp));
          });
        } else {
          stype._addPropertyCore(newProp);
        }
      }
    });
  }

  return ctor;
})();

var ComplexType = (function () {
  /**
  Container for all of the metadata about a specific type of Complex object.
  @class ComplexType
  **/

  /**
  @example
      var complexType = new ComplexType( {
          shortName: "address",
          namespace: "myAppNamespace"
      });
  @method <ctor> ComplexType
  @param config {Object} Configuration settings
  @param config.shortName {String}
  @param [config.namespace=""] {String}
  @param [config.dataProperties] {Array of DataProperties}
  @param [config.custom] {Object}
  **/
  var ctor = function ComplexType(config) {
    if (arguments.length > 1) {
      throw new Error("The ComplexType ctor has a single argument that is a configuration object.");
    }

    assertConfig(config)
        .whereParam("shortName").isNonEmptyString()
        .whereParam("namespace").isString().isOptional().withDefault("")
        .whereParam("dataProperties").isOptional()
        .whereParam("isComplexType").isOptional().isBoolean()   // needed because this ctor can get called from the addEntityType method which needs the isComplexType prop
        .whereParam("custom").isOptional()
        .applyAll(this);

    this.name = qualifyTypeName(this.shortName, this.namespace);
    this.isComplexType = true;
    this.dataProperties = [];
    this.complexProperties = [];
    this.validators = [];
    this.concurrencyProperties = [];
    this.unmappedProperties = [];
    this.navigationProperties = []; // not yet supported
    this.keyProperties = []; // may be used later to enforce uniqueness on arrays of complextypes.

    addProperties(this, config.dataProperties, DataProperty);
  };
  var proto = ctor.prototype;
  /**
  The DataProperties (see {{#crossLink "DataProperty"}}{{/crossLink}}) associated with this ComplexType.

  __readOnly__
  @property dataProperties {Array of DataProperty}
  **/

  /**
  The DataProperties for this ComplexType that contain instances of a ComplexType (see {{#crossLink "ComplexType"}}{{/crossLink}}).

  __readOnly__
  @property complexProperties {Array of DataProperty}
  **/

  /**
  The DataProperties associated with this ComplexType that are not mapped to any backend datastore. These are effectively free standing
  properties.

  __readOnly__
  @property unmappedProperties {Array of DataProperty}
  **/

  /**
  The fully qualifed name of this ComplexType.

  __readOnly__
  @property name {String}
  **/

  /**
  The short, unqualified, name for this ComplexType.

  __readOnly__
  @property shortName {String}
  **/

  /**
  The namespace for this ComplexType.

  __readOnly__
  @property namespace {String}
  **/

  /**
  The entity level validators associated with this ComplexType. Validators can be added and
  removed from this collection.

  __readOnly__
  @property validators {Array of Validator}
  **/

  /**
  A free form object that can be used to define any custom metadata for this ComplexType.

  __readOnly__
  @property custom {Object}
  **/

  /**
  General purpose property set method
  @example
      // assume em1 is an EntityManager
      var addresstType = em1.metadataStore.getEntityType("Address");
      addressType.setProperties( {
          custom: { foo: 7, bar: "test" }
      });
  @method setProperties
  @param config [object]
  @param [config.custom] {Object}
  **/
  proto.setProperties = function (config) {
    assertConfig(config)
        .whereParam("custom").isOptional()
        .applyAll(this);
  };

  proto.getAllValidators = function () {
    // ComplexType inheritance is not YET supported.
    return this.validators;
  }

  /**
  Creates a new non-attached instance of this ComplexType.
  @method createInstance
  @param initialValues {Object} Configuration object containing initial values for the instance.
  **/
  // This method is actually the EntityType.createEntity method renamed 
  proto._createInstanceCore = function (parent, parentProperty) {
    var aCtor = this.getCtor();
    var instance = new aCtor();
    new ComplexAspect(instance, parent, parentProperty);
    // initialization occurs during either attach or in createInstance call.
    return instance;
  };


  proto.addProperty = function (dataProperty) {
    assertParam(dataProperty, "dataProperty").isInstanceOf(DataProperty).check();
    return this._addPropertyCore(dataProperty);
  };

  proto.getProperties = function () {
    return this.dataProperties;
  };

  /**
  See  {{#crossLink "EntityType.addValidator"}}{{/crossLink}}
  @method addValidator
  @param validator {Validator} Validator to add.
  @param [property] Property to add this validator to.  If omitted, the validator is assumed to be an
  entity level validator and is added to the EntityType's 'validators'.
  **/

  /**
  See  {{#crossLink "EntityType.getProperty"}}{{/crossLink}}
  @method getProperty
  **/

  /**
  See  {{#crossLink "EntityType.getPropertyNames"}}{{/crossLink}}
  @method getPropertyNames
  **/

  /**
  See  {{#crossLink "EntityType.getEntityCtor"}}{{/crossLink}}
  @method getCtor
  **/

  // copy entityType methods onto complexType
  proto = __extend(proto, EntityType.prototype, [
    "addValidator",
    "getProperty",
    "getPropertiesOnPath",
    "getPropertyNames",
    "_addPropertyCore",
    "_addDataProperty",
    "_updateNames",
    "_updateCps",
    "_initializeInstance",
    "_updateTargetFromRaw",
    "_setCtor"
  ]);

  // note the name change.
  proto.createInstance = EntityType.prototype.createEntity;  // name change
  proto.getCtor = EntityType.prototype.getEntityCtor;


  proto.toJSON = function () {
    return __toJson(this, {
      shortName: null,
      namespace: null,
      isComplexType: null,
      dataProperties: null,
      validators: null,
      custom: null
    });
  };


  proto._$typeName = "ComplexType";

  return ctor;
})();

var DataProperty = (function () {

  /**
  A DataProperty describes the metadata for a single property of an  {{#crossLink "EntityType"}}{{/crossLink}} that contains simple data.

  Instances of the DataProperty class are constructed automatically during Metadata retrieval. However it is also possible to construct them
  directly via the constructor.
  @class DataProperty
  **/

  /**
  @example
      var lastNameProp = new DataProperty( {
          name: "lastName",
          dataType: DataType.String,
          isNullable: true,
          maxLength: 20
      });
      // assuming personEntityType is a newly constructed EntityType
      personEntityType.addProperty(lastNameProperty);
  @method <ctor> DataProperty
  @param config {configuration Object}
  @param [config.name] {String}  The name of this property.
  @param [config.nameOnServer] {String} Same as above but the name is that defined on the server.
  Either this or the 'name' above must be specified. Whichever one is specified the other will be computed using
  the NamingConvention on the MetadataStore associated with the EntityType to which this will be added.
  @param [config.dataType=DataType.String] {DataType}
  @param [config.complexTypeName] {String}
  @param [config.isNullable=true] {Boolean}
  @param [config.isScalar=true] {Boolean}
  @param [config.defaultValue] {Any}
  @param [config.isPartOfKey=false] {Boolean}
  @param [config.isUnmapped=false] {Boolean}
  @param [config.concurrencyMode] {String}
  @param [config.maxLength] {Integer} Only meaningfull for DataType.String
  @param [config.validators] {Array of Validator}
  @param [config.custom] {Object}
  **/
  var ctor = function DataProperty(config) {
    assertConfig(config)
        .whereParam("name").isString().isOptional()
        .whereParam("nameOnServer").isString().isOptional()
        .whereParam("dataType").isEnumOf(DataType).isOptional().or().isString().or().isInstanceOf(ComplexType)
        .whereParam("complexTypeName").isOptional()
        .whereParam("isNullable").isBoolean().isOptional().withDefault(true)
        .whereParam("isScalar").isOptional().withDefault(true)// will be false for some NoSQL databases.
        .whereParam("defaultValue").isOptional()
        .whereParam("isPartOfKey").isBoolean().isOptional()
        .whereParam("isUnmapped").isBoolean().isOptional()
        .whereParam("isSettable").isBoolean().isOptional().withDefault(true)
        .whereParam("concurrencyMode").isString().isOptional()
        .whereParam("maxLength").isNumber().isOptional()
        .whereParam("validators").isInstanceOf(Validator).isArray().isOptional().withDefault([])
        .whereParam("displayName").isOptional()
        .whereParam("enumType").isOptional()
        .whereParam("rawTypeName").isOptional() // occurs with undefined datatypes
        .whereParam("custom").isOptional()
        .applyAll(this);
    var hasName = !!(this.name || this.nameOnServer);
    if (!hasName) {
      throw new Error("A DataProperty must be instantiated with either a 'name' or a 'nameOnServer' property");
    }
    // name/nameOnServer is resolved later when a metadataStore is available.

    if (this.complexTypeName) {
      this.isComplexProperty = true;
      this.dataType = null;
    } else if (typeof(this.dataType) === "string") {
      var dt = DataType.fromName(this.dataType);
      if (!dt) {
        throw new Error("Unable to find a DataType enumeration by the name of: " + this.dataType);
      }
      this.dataType = dt;
    } else if (!this.dataType) {
      this.dataType = DataType.String;
    }

    // == as opposed to === is deliberate here.
    if (this.defaultValue == null) {
      if (this.isNullable) {
        this.defaultValue = null;
      } else {
        if (this.isComplexProperty) {
          // what to do? - shouldn't happen from EF - but otherwise ???
        } else if (this.dataType === DataType.Binary) {
          this.defaultValue = "AAAAAAAAJ3U="; // hack for all binary fields but value is specifically valid for timestamp fields - arbitrary valid 8 byte base64 value.
        } else {
          this.defaultValue = this.dataType.defaultValue;
          if (this.defaultValue == null) {
            throw new Error("A nonnullable DataProperty cannot have a null defaultValue. Name: " + (this.name || this.nameOnServer));
          }
        }
      }
    } else if (this.dataType.isNumeric) {
      // in case the defaultValue comes in as a string ( which it does in EF6).
      if (typeof (this.defaultValue) === "string") {
        this.defaultValue = parseFloat(this.defaultValue);
      }
    }

    if (this.isComplexProperty) {
      this.isScalar = this.isScalar == null || this.isScalar === true;
    }

  };
  var proto = ctor.prototype;
  proto._$typeName = "DataProperty";

  ctor.getRawValueFromServer = function (rawEntity, dp) {
    if (dp.isUnmapped) {
      return rawEntity[dp.nameOnServer || dp.name];
    } else {
      var val = rawEntity[dp.nameOnServer];
      return val !== undefined ? val : dp.defaultValue;
    }
  }

  ctor.getRawValueFromClient = function (rawEntity, dp) {
    var val = rawEntity[dp.name];
    return val !== undefined ? val : dp.defaultValue;
  }


  /**
  The name of this property

  __readOnly__
  @property name {String}
  **/

  /**
  The parent type that this property belongs to - will be either a {{#crossLink "EntityType"}}{{/crossLink}} or a {{#crossLink "ComplexType"}}{{/crossLink}}.

  __readOnly__
  @property parentType {EntityType|ComplexType}
  **/

  /**
  The {{#crossLink "DataType"}}{{/crossLink}} of this property.

  __readOnly__
  @property dataType {DataType}
  **/

  /**
  The name of the {{#crossLink "ComplexType"}}{{/crossLink}} associated with this property; may be null.

  __readOnly__
  @property complexTypeName {String}
  **/

  /**
  Whether the contents of this property is an instance of a {{#crossLink "ComplexType"}}{{/crossLink}}.

  __readOnly__
  @property isComplexProperty {bool}
  **/

  /**
  Whether this property is nullable.

  __readOnly__
  @property isNullable {Boolean}
  **/

  /**
  Whether this property is scalar (i.e., returns a single value).

  __readOnly__
  @property isScalar {Boolean}
  **/

  /**
  Property on the base type that this property is inherited from. Will be null if the property is not on the base type.

  __readOnly__
  @property baseProperty {DataProperty}
  **/

  /**
  Whether this property is a 'key' property.

  __readOnly__
  @property isPartOfKey {Boolean}
  **/

  /**
  Whether this property is an 'unmapped' property.

  __readOnly__
  @property isUnmapped {Boolean}
  **/

  /**
  __Describe this__

  __readOnly__
  @property concurrencyMode {String}
  **/

  /**
  The maximum length for the value of this property.

  __readOnly__
  @property maxLength {Number}
  **/

  /**
  The {{#crossLink "Validator"}}{{/crossLink}}s that are associated with this property. Validators can be added and
  removed from this collection.

  __readOnly__
  @property validators {Array of Validator}
  **/

  /**
  The default value for this property.

  __readOnly__
  @property defaultValue {any}
  **/

  /**
  The navigation property related to this property.  Will only be set if this is a foreign key property.

  __readOnly__
  @property relatedNavigationProperty {NavigationProperty}
  **/

  /**
  A free form object that can be used to define any custom metadata for this DataProperty.

  __readOnly__
  @property custom {Object}
  **/

  /**
  Is this a DataProperty? - always true here
  Allows polymorphic treatment of DataProperties and NavigationProperties.

  __readOnly__
  @property isDataProperty {Boolean}
  **/

  /**
  Is this a NavigationProperty? - always false here
  Allows polymorphic treatment of DataProperties and NavigationProperties.

  __readOnly__
  @property isNavigationProperty {Boolean}
  **/

  proto.isDataProperty = true;
  proto.isNavigationProperty = false;

  proto.resolveProperty = function (propName) {
    var result = this[propName];
    var baseProp = this.baseProperty;
    while (result == undefined && baseProp != null) {
      result = baseProp[propName];
      baseProp = baseProp.baseProperty;
    }
    return result;
  }

  proto.formatName = function () {
    return this.parentType.name + "--" + this.name;
  }


  /**
  General purpose property set method
  @example
      // assume em1 is an EntityManager
      var prop = myEntityType.getProperty("myProperty");
      prop.setProperties( {
          custom: { foo: 7, bar: "test" }
      });
  @method setProperties
  @param config [object]
  @param [config.custom] {Object}
  **/
  proto.setProperties = function (config) {
    assertConfig(config)
        .whereParam("displayName").isOptional()
        .whereParam("custom").isOptional()
        .applyAll(this);
  };

  proto.getAllValidators = function () {
    var validators = this.validators.slice(0);
    var baseProp = this.baseProperty;
    while (baseProp) {
      validators.push.apply(validators, baseProp.validators);
      baseProp = baseProp.baseProperty;
    }
    return validators;
  }

  proto.toJSON = function () {
    // do not serialize dataTypes that are complexTypes
    return __toJson(this, {
      name: null,
      dataType: function (v) {
        return (v && v.parentEnum) ? v.name : undefined;
      }, // do not serialize dataTypes that are complexTypes
      complexTypeName: null,
      isNullable: true,
      defaultValue: null,
      isPartOfKey: false,
      isUnmapped: false,
      isSettable: true,
      concurrencyMode: null,
      maxLength: null,
      validators: null,
      displayName: null,
      enumType: null,
      rawTypeName: null,
      isScalar: true,
      custom: null
    });
  };

  ctor.fromJSON = function (json) {
    json.dataType = DataType.fromName(json.dataType);
    // dateTime instances require 'extra' work to deserialize properly.
    if (json.defaultValue && json.dataType && json.dataType.isDate) {
      json.defaultValue = new Date(Date.parse(json.defaultValue));
    }

    if (json.validators) {
      json.validators = json.validators.map(Validator.fromJSON);
    }

    return new DataProperty(json);
  };

  return ctor;
})();

var NavigationProperty = (function () {

  /**
  A NavigationProperty describes the metadata for a single property of an  {{#crossLink "EntityType"}}{{/crossLink}} that return instances of other EntityTypes.

  Instances of the NavigationProperty class are constructed automatically during Metadata retrieval.   However it is also possible to construct them
  directly via the constructor.
  @class NavigationProperty
  **/

  /**
  @example
      var homeAddressProp = new NavigationProperty( {
          name: "homeAddress",
          entityTypeName: "Address:#myNamespace",
          isScalar: true,
          associationName: "address_person",
          foreignKeyNames: ["homeAddressId"]
      });
      var homeAddressIdProp = new DataProperty( {
          name: "homeAddressId"
          dataType: DataType.Integer
      });
      // assuming personEntityType is a newly constructed EntityType
      personEntityType.addProperty(homeAddressProp);
      personEntityType.addProperty(homeAddressIdProp);
  @method <ctor> NavigationProperty
  @param config {configuration Object}
  @param [config.name] {String}  The name of this property.
  @param [config.nameOnServer] {String} Same as above but the name is that defined on the server.
  Either this or the 'name' above must be specified. Whichever one is specified the other will be computed using
  the NamingConvention on the MetadataStore associated with the EntityType to which this will be added.
  @param config.entityTypeName {String} The fully qualified name of the type of entity that this property will return.  This type
  need not yet have been created, but it will need to get added to the relevant MetadataStore before this EntityType will be 'complete'.
  The entityType name is constructed as: {shortName} + ":#" + {namespace}
  @param [config.isScalar=true] {Boolean}
  @param [config.associationName] {String} A name that will be used to connect the two sides of a navigation. May be omitted for unidirectional navigations.
  @param [config.foreignKeyNames] {Array of String} An array of foreign key names. The array is needed to support the possibility of multipart foreign keys.
  Most of the time this will be a single foreignKeyName in an array.
  @param [config.foreignKeyNamesOnServer] {Array of String} Same as above but the names are those defined on the server. Either this or 'foreignKeyNames' must
  be specified, if there are foreignKeys. Whichever one is specified the other will be computed using
  the NamingConvention on the MetadataStore associated with the EntityType to which this will be added.
  @param [config.validators] {Array of Validator}
  **/
  var ctor = function NavigationProperty(config) {
    assertConfig(config)
        .whereParam("name").isString().isOptional()
        .whereParam("nameOnServer").isString().isOptional()
        .whereParam("entityTypeName").isString()
        .whereParam("isScalar").isBoolean().isOptional().withDefault(true)
        .whereParam("associationName").isString().isOptional()
        .whereParam("foreignKeyNames").isArray().isString().isOptional().withDefault([])
        .whereParam("foreignKeyNamesOnServer").isArray().isString().isOptional().withDefault([])
        .whereParam("invForeignKeyNames").isArray().isString().isOptional().withDefault([])
        .whereParam("invForeignKeyNamesOnServer").isArray().isString().isOptional().withDefault([])
        .whereParam("validators").isInstanceOf(Validator).isArray().isOptional().withDefault([])
        .whereParam("displayName").isOptional()
        .whereParam("custom").isOptional()
        .applyAll(this);
    var hasName = !!(this.name || this.nameOnServer);

    if (!hasName) {
      throw new Error("A Navigation property must be instantiated with either a 'name' or a 'nameOnServer' property");
    }
  };
  var proto = ctor.prototype;
  proto._$typeName = "NavigationProperty";

  /**
  The {{#crossLink "EntityType"}}{{/crossLink}} that this property belongs to. ( same as parentEntityType).
  __readOnly__
  @property parentType {EntityType}
  **/

  /**
  The {{#crossLink "EntityType"}}{{/crossLink}} that this property belongs to.
  __readOnly__
  @property parentEntityType {EntityType}
  **/

  /**
  The name of this property

  __readOnly__
  @property name {String}
  **/

  /**
  The {{#crossLink "EntityType"}}{{/crossLink}} returned by this property.

  __readOnly__
  @property entityType {EntityType}
  **/

  /**
  Whether this property returns a single entity or an array of entities.

  __readOnly__
  @property isScalar {Boolean}
  **/

  /**
  Property on the base type that this property is inherited from. Will be null if the property is not on the base type.

  __readOnly__
  @property baseProperty {NavigationProperty}
  **/

  /**
  The name of the association to which that this property belongs.  This associationName will be shared with this
  properties 'inverse'.

  __readOnly__
  @property associationName {String}
  **/

  /**
  The names of the foreign key DataProperties associated with this NavigationProperty. There will usually only be a single DataProperty associated
  with a Navigation property except in the case of entities with multipart keys.

  __readOnly__
  @property foreignKeyNames {Array of String}
  **/

  /**
  The 'foreign key' DataProperties associated with this NavigationProperty. There will usually only be a single DataProperty associated
  with a Navigation property except in the case of entities with multipart keys.

  __readOnly__
  @property relatedDataProperties {Array of DataProperty}
  **/

  /**
  The inverse of this NavigationProperty.  The NavigationProperty that represents a navigation in the opposite direction
  to this NavigationProperty.

  __readOnly__
  @property inverse {NavigationProperty}
  **/

  /**
  The {{#crossLink "Validator"}}{{/crossLink}}s that are associated with this property. Validators can be added and
  removed from this collection.

  __readOnly__
  @property validators {Array of Validator}
  **/

  /**
  A free form object that can be used to define any custom metadata for this NavigationProperty.

  __readOnly__
  @property custom {Object}
  **/

  /**
  Is this a DataProperty? - always false here
  Allows polymorphic treatment of DataProperties and NavigationProperties.

  __readOnly__
  @property isDataProperty {Boolean}
  **/

  /**
  Is this a NavigationProperty? - always true here
  Allows polymorphic treatment of DataProperties and NavigationProperties.

  __readOnly__
  @property isNavigationProperty {Boolean}
  **/

  proto.isDataProperty = false;
  proto.isNavigationProperty = true;

  __extend(proto, DataProperty.prototype, [
    "formatName", "getAllValidators", "resolveProperty"
  ]);

  /**
  General purpose property set method
  @example
      // assume myEntityType is an EntityType
      var prop = myEntityType.getProperty("myProperty");
      prop.setProperties( {
          custom: { foo: 7, bar: "test" }
      });
  @method setProperties
  @param config [object]
  @param [config.inverse] {String}
  @param [config.custom] {Object}
  **/
  proto.setProperties = function (config) {
    if (!this.parentType) {
      throw new Error("Cannot call NavigationProperty.setProperties until the parent EntityType of the NavigationProperty has been set.");
    }
    var inverse = config.inverse;
    if (inverse) delete config.inverse;
    assertConfig(config)
        .whereParam("displayName").isOptional()
        .whereParam("foreignKeyNames").isArray().isString().isOptional().withDefault([])
        .whereParam("invForeignKeyNames").isArray().isString().isOptional().withDefault([])
        .whereParam("custom").isOptional()
        .applyAll(this);
    this.parentType._updateNames(this);

    this._resolveNp();
    if (inverse) {
      this.setInverse(inverse);
    }

  };

  proto.setInverse = function (inverseNp) {
    var invNp;
    if (typeof (inverseNp) === "string") {
      invNp = this.entityType.getNavigationProperty(inverseNp);
    } else {
      invNp = inverseNp;
    }

    if (!invNp) {
      throw throwSetInverseError(this, "Unable to find inverse property: " + invNpName);
    }
    if (this.inverse || invNp.inverse) {
      throwSetInverseError(this, "It has already been set on one side or the other.");
    }
    if (invNp.entityType != this.parentType) {
      throwSetInverseError(this, invNp.formatName + " is not a valid inverse property for this.");
    }
    if (this.associationName) {
      invNp.associationName = this.associationName;
    } else {
      if (!invNp.associationName) {
        invNp.associationName = this.formatName() + "_" + invNp.formatName();
      }
      this.associationName = invNp.associationName;
    }
    this._resolveNp();
    invNp._resolveNp();
  };

  // In progress - will be used for manual metadata config
  proto.createInverse = function (config) {

    if (!this.entityType) {
      throwCreateInverseError(this, "has not yet been defined.");
    }
    if (this.entityType.isFrozen) {
      throwCreateInverseError(this, "is frozen.");
    }
    var metadataStore = this.entityType.metadataStore;
    if (metadataStore == null) {
      throwCreateInverseError(this, "has not yet been added to the metadataStore.");
    }

    config.entityTypeName = this.parentEntityType.name;
    config.associationName = this.associationName;
    var invNp = new NavigationProperty(config);
    this.parentEntityType.addNavigationProperty(invNp);
    return invNp;
  };

  function throwSetInverseError(np, message) {
    throw new Error("Cannot set the inverse property for: " + np.formatName() + ". " + message);
  }

  function throwCreateInverseError(np, message) {
    throw new Error("Cannot create inverse for: " + np.formatName() + ". The entityType for this navigation property " + message);
  }

  proto.toJSON = function () {
    return __toJson(this, {
      name: null,
      entityTypeName: null,
      isScalar: null,
      associationName: null,
      validators: null,
      displayName: null,
      foreignKeyNames: null,
      invForeignKeyNames: null,
      custom: null
    });
  };

  ctor.fromJSON = function (json) {
    if (json.validators) {
      json.validators = json.validators.map(Validator.fromJSON);
    }
    return new NavigationProperty(json);
  };

  proto._resolveNp = function () {
    var np = this;
    var entityType = np.entityType;
    var invNp = __arrayFirst(entityType.navigationProperties, function (altNp) {
      // Can't do this because of possibility of comparing a base class np with a subclass altNp.
      // return altNp.associationName === np.associationName
      //    && altNp !== np;
      // So use this instead.
      return altNp.associationName === np.associationName &&
          (altNp.name !== np.name || altNp.entityTypeName !== np.entityTypeName);
    });
    np.inverse = invNp;
    //if (invNp && invNp.inverse == null) {
    //    invNp._resolveNp();
    //}
    if (!invNp) {
      // unidirectional 1-n relationship
      np.invForeignKeyNames.forEach(function (invFkName) {
        var fkProp = entityType.getDataProperty(invFkName);
        if (!fkProp) {
          throw new Error("EntityType '" + np.entityTypeName + "' has no foreign key matching '" + invFkName + "'");
        }
        var invEntityType = np.parentType;
        fkProp.inverseNavigationProperty = __arrayFirst(invEntityType.navigationProperties, function (np2) {
          return np2.invForeignKeyNames && np2.invForeignKeyNames.indexOf(fkProp.name) >= 0 && np2.entityType === fkProp.parentType;
        });
        __arrayAddItemUnique(entityType.foreignKeyProperties, fkProp);
      });
    }

    resolveRelated(np);
  }

  // sets navigation property: relatedDataProperties and dataProperty: relatedNavigationProperty
  function resolveRelated(np) {

    var fkNames = np.foreignKeyNames;
    if (fkNames.length === 0) return;

    var parentEntityType = np.parentType;
    var fkProps = fkNames.map(function (fkName) {
      return parentEntityType.getDataProperty(fkName);
    });
    var fkPropCollection = parentEntityType.foreignKeyProperties;

    fkProps.forEach(function (dp) {
      __arrayAddItemUnique(fkPropCollection, dp);
      dp.relatedNavigationProperty = np;
      // now update the inverse
      __arrayAddItemUnique(np.entityType.inverseForeignKeyProperties, dp);
      if (np.relatedDataProperties) {
        __arrayAddItemUnique(np.relatedDataProperties, dp);
      } else {
        np.relatedDataProperties = [dp];
      }
    });
  }

  return ctor;
})();

var AutoGeneratedKeyType = (function () {
  /**
  AutoGeneratedKeyType is an 'Enum' containing all of the valid states for an automatically generated key.
  @class AutoGeneratedKeyType
  @static
  @final
  **/
  var ctor = new Enum("AutoGeneratedKeyType");
  /**
  This entity does not have an autogenerated key.
  The client must set the key before adding the entity to the EntityManager
  @property None {AutoGeneratedKeyType}
  @final
  @static
  **/
  ctor.None = ctor.addSymbol();
  /**
  This entity's key is an Identity column and is set by the backend database.
  Keys for new entities will be temporary until the entities are saved at which point the keys will
  be converted to their 'real' versions.
  @property Identity {AutoGeneratedKeyType}
  @final
  @static
  **/
  ctor.Identity = ctor.addSymbol();
  /**
  This entity's key is generated by a KeyGenerator and is set by the backend database.
  Keys for new entities will be temporary until the entities are saved at which point the keys will
  be converted to their 'real' versions.
  @property KeyGenerator {AutoGeneratedKeyType}
  @final
  @static
  **/
  ctor.KeyGenerator = ctor.addSymbol();
  ctor.resolveSymbols();

  return ctor;
})();

// mixin methods
(function () {

  var proto = Param.prototype;

  proto.isEntity = function () {
    return this._addContext({
      fn: isEntity,
      msg: " must be an entity"
    });
  };

  function isEntity(context, v) {
    if (v == null) return false;
    return (v.entityType !== undefined);
  }

  proto.isEntityProperty = function () {
    return this._addContext({
      fn: isEntityProperty,
      msg: " must be either a DataProperty or a NavigationProperty"
    });
  };

  function isEntityProperty(context, v) {
    if (v == null) return false;
    return (v.isDataProperty || v.isNavigationProperty);
  }
})();

// functions shared between classes related to Metadata

function parseTypeName(entityTypeName) {
  if (!entityTypeName) {
    return null;
  }

  var typeParts = entityTypeName.split(":#");
  if (typeParts.length > 1) {
    return makeTypeHash(typeParts[0], typeParts[1]);
  }

  if (__stringStartsWith(entityTypeName, MetadataStore.ANONTYPE_PREFIX)) {
    var typeHash = makeTypeHash(entityTypeName);
    typeHash.isAnonymous = true
    return typeHash;
  }
  var entityTypeNameNoAssembly = entityTypeName.split(",")[0];
  var typeParts = entityTypeNameNoAssembly.split(".");
  if (typeParts.length > 1) {
    var shortName = typeParts[typeParts.length - 1];
    var namespaceParts = typeParts.slice(0, typeParts.length - 1);
    var ns = namespaceParts.join(".");
    return makeTypeHash(shortName, ns);
  } else {
    return makeTypeHash(entityTypeName);
  }
}

function makeTypeHash(shortName, namespace) {
  return {
    shortTypeName: shortName,
    namespace: namespace,
    typeName: qualifyTypeName(shortName, namespace)
  };
}

function isQualifiedTypeName(entityTypeName) {
  return entityTypeName.indexOf(":#") >= 0;
}

function qualifyTypeName(shortName, namespace) {
  if (namespace && namespace.length > 0) {
    return shortName + ":#" + namespace;
  } else {
    return shortName;
  }
}

// Used by both ComplexType and EntityType
function addProperties(entityType, propObj, ctor) {

  if (!propObj) return;
  if (Array.isArray(propObj)) {
    propObj.forEach(entityType._addPropertyCore.bind(entityType));
  } else if (typeof (propObj) === 'object') {
    for (var key in propObj) {
      if (__hasOwnProperty(propObj, key)) {
        var value = propObj[key];
        value.name = key;
        var prop = new ctor(value);
        entityType._addPropertyCore(prop);
      }
    }
  } else {
    throw new Error("The 'dataProperties' or 'navigationProperties' values must be either an array of data/nav properties or an object where each property defines a data/nav property");
  }
}

breeze.MetadataStore = MetadataStore;
breeze.EntityType = EntityType;
breeze.ComplexType = ComplexType;
breeze.DataProperty = DataProperty;
breeze.NavigationProperty = NavigationProperty;
breeze.AutoGeneratedKeyType = AutoGeneratedKeyType;



;/**
@module breeze
**/

var KeyGenerator = (function () {

  /*
  @class KeyGenerator
  */
  var ctor = function KeyGenerator() {
    // key is dataProperty.name + || + entityType.name, value is propEntry
    // propEntry = { entityType, propertyName, keyMap }
    // keyMap has key of the actual value ( as a string) and a value of null or the real id.
    this._tempIdMap = {};
  };
  var proto = ctor.prototype;

  /*
  Returns a unique 'temporary' id for the specified {{#crossLink "EntityType"}}{{/crossLink}}.
  Uniqueness is defined for this purpose as being unique within each instance of a KeyGenerator. This is sufficient
  because each EntityManager will have its own instance of a KeyGenerator and any entities imported into
  the EntityManager with temporary keys will have them regenerated and remapped on import.

  The return value of this method must be of the correct type as determined by the keyProperties of the
  specified EntityType
  @example
      // Assume em1 is a preexisting EntityManager
      var custType = em1.metadataStore.getEntityType("Customer");
      var cust1 = custType.createEntity();
      // next line both sets cust1's 'CustomerId' property but also returns the value
      var cid1 = em1.generateTempKeyValue(cust1);
      em1.saveChanges().then( function( data) {
        var sameCust1 = data.results[0];
        // cust1 === sameCust1;
        // but cust1.getProperty("CustomerId") != cid1
        // because the server will have generated a new id
        // and the client will have been updated with this
        // new id.
      });
  @method generateTempKeyValue
  @param entityType {EntityType}
  */
  proto.generateTempKeyValue = function (entityType, valueIfAvail) {
    var keyProps = entityType.keyProperties;
    if (keyProps.length > 1) {
      throw new Error("Ids can not be autogenerated for entities with multipart keys");
    }
    var keyProp = keyProps[0];
    var propEntry = getPropEntry(this, keyProp, true);
    var nextId;
    if (valueIfAvail != null) {
      if (!propEntry.keyMap[valueIfAvail.toString()]) {
        nextId = valueIfAvail;
      }
    }

    if (nextId === undefined) {
      var dataType = keyProp.dataType;
      if (dataType.getNext) {
        nextId = dataType.getNext(this);
        // need to watch out for collision with previously imported ids that might also get generated.
        while (propEntry.keyMap[nextId.toString()] != null) {
          nextId = dataType.getNext(this);
        }
      } else {
        throw new Error("Cannot use a property with a dataType of: " + dataType.toString() + " for id generation");
      }
    }

    propEntry.keyMap[nextId.toString()] = true;
    return nextId;
  };

  proto.getTempKeys = function () {
    var results = [];
    //noinspection JSHint
    for (var key in this._tempIdMap) {
      var propEntry = this._tempIdMap[key];
      var entityType = propEntry.entityType;
      // var propName = propEntry.propertyName;
      //noinspection JSHint
      for (var keyValue in propEntry.keyMap) {
        results.push(new EntityKey(entityType, [keyValue]));
      }
    }
    return results;
  };


  // proto methods below are not part of the KeyGenerator interface.

  proto.isTempKey = function (entityKey) {
    var keyProps = entityKey.entityType.keyProperties;
    if (keyProps.length > 1) return false;
    var keyProp = keyProps[0];
    var propEntry = getPropEntry(this, keyProp);
    if (!propEntry) {
      return false;
    }
    return (propEntry.keyMap[entityKey.values[0].toString()] !== undefined);
  };

  function getPropEntry(that, keyProp, createIfMissing) {
    var key = keyProp.name + ".." + keyProp.parentType.name;
    var propEntry = that._tempIdMap[key];
    if (!propEntry) {
      if (createIfMissing) {
        propEntry = { entityType: keyProp.parentType, propertyName: keyProp.name, keyMap: {} };
        that._tempIdMap[key] = propEntry;
      }
    }
    return propEntry;
  }

  __config.registerType(ctor, "KeyGenerator");

  return ctor;
})();

breeze.KeyGenerator = KeyGenerator;;/**
@module breeze
**/

var LocalQueryComparisonOptions = (function () {

  /**
  A LocalQueryComparisonOptions instance is used to specify the "comparison rules" used when performing "local queries" in order
  to match the semantics of these same queries when executed against a remote service.  These options should be set based on the
  manner in which your remote service interprets certain comparison operations.

  The default LocalQueryComparisonOptions stipulates 'caseInsensitive" queries with ANSI SQL rules regarding comparisons of unequal
  length strings.

  @class LocalQueryComparisonOptions
  **/

  /**
  LocalQueryComparisonOptions constructor
  @example
      // create a 'caseSensitive - non SQL' instance.
      var lqco = new LocalQueryComparisonOptions({
              name: "caseSensitive-nonSQL"
              isCaseSensitive: true;
              usesSql92CompliantStringComparison: false;
          });
      // either apply it globally
      lqco.setAsDefault();
      // or to a specific MetadataStore
      var ms = new MetadataStore({ localQueryComparisonOptions: lqco });
      var em = new EntityManager( { metadataStore: ms });

  @method <ctor> LocalQueryComparisonOptions
  @param config {Object}
  @param [config.name] {String}
  @param [config.isCaseSensitive] {Boolean} Whether predicates that involve strings will be interpreted in a "caseSensitive" manner. Default is 'false'
  @param [config.usesSql92CompliantStringComparison] {Boolean} Whether of not to enforce the ANSI SQL standard
  of padding strings of unequal lengths before comparison with spaces. Note that per the standard, padding only occurs with equality and
  inequality predicates, and not with operations like 'startsWith', 'endsWith' or 'contains'.  Default is true.
  **/

  var ctor = function LocalQueryComparisonOptions(config) {
    assertConfig(config || {})
        .whereParam("name").isOptional().isString()
        .whereParam("isCaseSensitive").isOptional().isBoolean()
        .whereParam("usesSql92CompliantStringComparison").isBoolean()
        .applyAll(this);
    if (!this.name) {
      this.name = __getUuid();
    }
    __config._storeObject(this, proto._$typeName, this.name);
  };
  var proto = ctor.prototype;
  proto._$typeName = "LocalQueryComparisonOptions";

  
  /**
  Case insensitive SQL compliant options - this is also the default unless otherwise changed.
  @property caseInsensitiveSQL {LocalQueryComparisonOptions}
  @static
  **/
  ctor.caseInsensitiveSQL = new ctor({
  name: "caseInsensitiveSQL",
  isCaseSensitive: false,
  usesSql92CompliantStringComparison: true
  });

  /**
  The default value whenever LocalQueryComparisonOptions are not specified. By default this is 'caseInsensitiveSQL'.
  @property defaultInstance {LocalQueryComparisonOptions}
  @static
  **/
  ctor.defaultInstance = new ctor(ctor.caseInsensitiveSQL);

  /**
  Sets the 'defaultInstance' by creating a copy of the current 'defaultInstance' and then applying all of the properties of the current instance.
  The current instance is returned unchanged.
  @method setAsDefault
  @example
      var lqco = new LocalQueryComparisonOptions({
          isCaseSensitive: false;
          usesSql92CompliantStringComparison: true;
      });
  lqco.setAsDefault();
  @chainable
  **/
  proto.setAsDefault = function () {
  return __setAsDefault(this, ctor);
  };


  return ctor;
})();

breeze.LocalQueryComparisonOptions = LocalQueryComparisonOptions;


;/**
@module breeze
**/

var NamingConvention = (function () {
  /**
  A NamingConvention instance is used to specify the naming conventions under which a MetadataStore
  will translate property names between the server and the javascript client.

  The default NamingConvention does not perform any translation, it simply passes property names thru unchanged.

  @class NamingConvention
  **/

  /**
  NamingConvention constructor

  @example
      // A naming convention that converts the first character of every property name to uppercase on the server
      // and lowercase on the client.
      var namingConv = new NamingConvention({
          serverPropertyNameToClient: function(serverPropertyName) {
              return serverPropertyName.substr(0, 1).toLowerCase() + serverPropertyName.substr(1);
          },
          clientPropertyNameToServer: function(clientPropertyName) {
              return clientPropertyName.substr(0, 1).toUpperCase() + clientPropertyName.substr(1);
          }            
      });
      var ms = new MetadataStore({ namingConvention: namingConv });
      var em = new EntityManager( { metadataStore: ms });
  @method <ctor> NamingConvention
  @param config {Object}
  @param config.serverPropertyNameToClient {Function} Function that takes a server property name add converts it into a client side property name.
  @param config.clientPropertyNameToServer {Function} Function that takes a client property name add converts it into a server side property name.
  **/
  var ctor = function NamingConvention(config) {
    assertConfig(config || {})
        .whereParam("name").isOptional().isString()
        .whereParam("serverPropertyNameToClient").isFunction()
        .whereParam("clientPropertyNameToServer").isFunction()
        .applyAll(this);
    if (!this.name) {
      this.name = __getUuid();
    }
    __config._storeObject(this, proto._$typeName, this.name);
  };
  var proto = ctor.prototype;
  proto._$typeName = "NamingConvention";

  /**
  The function used to convert server side property names to client side property names.

  @method serverPropertyNameToClient
  @param serverPropertyName {String}
  @param [property] {DataProperty|NavigationProperty} The actual DataProperty or NavigationProperty corresponding to the property name.
  @return {String} The client side property name.
  **/

  /**
  The function used to convert client side property names to server side property names.

  @method clientPropertyNameToServer
  @param clientPropertyName {String}
  @param [property] {DataProperty|NavigationProperty} The actual DataProperty or NavigationProperty corresponding to the property name.
  @return {String} The server side property name.
  **/

  /**
  A noop naming convention - This is the default unless another is specified.
  @property none {NamingConvention}
  @static
  **/
  ctor.none = new ctor({
    name: "noChange",
    serverPropertyNameToClient: function (serverPropertyName) {
      return serverPropertyName;
    },
    clientPropertyNameToServer: function (clientPropertyName) {
      return clientPropertyName;
    }
  });

  /**
  The "camelCase" naming convention - This implementation only lowercases the first character of the server property name
  but leaves the rest of the property name intact.  If a more complicated version is needed then one should be created via the ctor.
  @property camelCase {NamingConvention}
  @static
  **/
  ctor.camelCase = new ctor({
    name: "camelCase",
    serverPropertyNameToClient: function (serverPropertyName) {
      return serverPropertyName.substr(0, 1).toLowerCase() + serverPropertyName.substr(1);
    },
    clientPropertyNameToServer: function (clientPropertyName) {
      return clientPropertyName.substr(0, 1).toUpperCase() + clientPropertyName.substr(1);
    }
  });

  /**
  The default value whenever NamingConventions are not specified.
  @property defaultInstance {NamingConvention}
  @static
  **/
  ctor.defaultInstance = new ctor(ctor.none);

  /**
  Sets the 'defaultInstance' by creating a copy of the current 'defaultInstance' and then applying all of the properties of the current instance.
  The current instance is returned unchanged.
  @method setAsDefault
  @example
      var namingConv = new NamingConvention({
          serverPropertyNameToClient: function(serverPropertyName) {
              return serverPropertyName.substr(0, 1).toLowerCase() + serverPropertyName.substr(1);
          },
          clientPropertyNameToServer: function(clientPropertyName) {
              return clientPropertyName.substr(0, 1).toUpperCase() + clientPropertyName.substr(1);
          }            
      });
      namingConv.setAsDefault();
  @chainable
  **/
  proto.setAsDefault = function () {
    return __setAsDefault(this, ctor);
  };

  return ctor;
})();

breeze.NamingConvention = NamingConvention;


;var Predicate = (function () {
  
  var Predicate = (function () {
    /**
    Used to define a 'where' predicate for an EntityQuery.  Predicates are immutable, which means that any
    method that would modify a Predicate actually returns a new Predicate.
    @class Predicate
    **/

    /**
    Predicate constructor
    @example
        var p1 = new Predicate("CompanyName", "StartsWith", "B");
        var query = new EntityQuery("Customers").where(p1); 
    or
    @example
        var p2 = new Predicate("Region", FilterQueryOp.Equals, null);
        var query = new EntityQuery("Customers").where(p2);
    @method <ctor> Predicate
    @param property {String} A property name, a nested property name or an expression involving a property name.
    @param operator {FilterQueryOp|String}
    @param value {Object} - This will be treated as either a property expression or a literal depending on context.  In general,
    if the value can be interpreted as a property expression it will be, otherwise it will be treated as a literal.
    In most cases this works well, but you can also force the interpretation by making the value argument itself an object with a 'value'
    property and an 'isLiteral' property set to either true or false.  Breeze also tries to infer the dataType of any
    literal based on context, if this fails you can force this inference by making the value argument an object with a
    'value' property and a 'dataType' property set to one of the breeze.DataType enumeration instances.
    **/

    var ctor = function () {
      // empty ctor is used by all subclasses.
      if (arguments.length === 0) return;
      if (arguments.length === 1) {
        // 3 possibilities:
        //      Predicate(aPredicate)
        //      Predicate([ aPredicate ])
        //      Predicate(["freight", ">", 100"])
        //      Predicate( "freight gt 100" }  // passthru ( i.e. maybe an odata string)
        //      Predicate( { freight: { ">": 100 } })
        var arg = arguments[0];
        if (Array.isArray(arg)) {
          if (arg.length === 1) {
            // recurse
            return Predicate(arg[0]);
          } else {
            return createPredicateFromArray(arg);
          }
        } else if (arg instanceof Predicate) {
          return arg;
        } else if (typeof arg == 'string') {
          return new PassthruPredicate(arg);
        } else {
          return createPredicateFromObject(arg);
        }
      } else {
        // 2 possibilities
        //      Predicate("freight", ">", 100");
        //      Predicate("orders", "any", "freight",  ">", 950);
        return createPredicateFromArray(Array.prototype.slice.call(arguments, 0));
      }
    };
    var proto = ctor.prototype;
    
    /**
    Same as using the ctor.
    @example
        // so 
        var p = Predicate.create(a, b, c);
        // is the same as 
        var p = new Predicate(a, b, c); 
    
    @method create
    @param property {String} A property name, a nested property name or an expression involving a property name.
    @param operator {FilterQueryOp|String}
    @param value {Object} - This will be treated as either a property expression or a literal depending on context.  In general,
    if the value can be interpreted as a property expression it will be, otherwise it will be treated as a literal.
    In most cases this works well, but you can also force the interpretation by making the value argument itself an object with a 'value'
    property and an 'isLiteral' property set to either true or false.  Breeze also tries to infer the dataType of any
    literal based on context, if this fails you can force this inference by making the value argument an object with a
    'value' property and a 'dataType' property set to one of the breeze.DataType enumeration instances.

    @static
    **/
    ctor.create = ctor;
    
    /**
    Creates a 'composite' Predicate by 'and'ing a set of specified Predicates together.
    @example
        var dt = new Date(88, 9, 12);
        var p1 = Predicate.create("OrderDate", "ne", dt);
        var p2 = Predicate.create("ShipCity", "startsWith", "C");
        var p3 = Predicate.create("Freight", ">", 100);
        var newPred = Predicate.and(p1, p2, p3);
    or
    @example
        var preds = [p1, p2, p3];
        var newPred = Predicate.and(preds);
    @method and
    @param predicates* {multiple Predicates|Array of Predicate} Any null or undefined values passed in will be automatically filtered out before constructing the composite predicate.
    @static
    **/
    ctor.and = function () {
      var pred = new AndOrPredicate("and", __arraySlice(arguments));
      // return undefined if empty
      return pred.op && pred;
    };
    
    /**
    Creates a 'composite' Predicate by 'or'ing a set of specified Predicates together.
    @example
        var dt = new Date(88, 9, 12);
        var p1 = Predicate.create("OrderDate", "ne", dt);
        var p2 = Predicate.create("ShipCity", "startsWith", "C");
        var p3 = Predicate.create("Freight", ">", 100);
        var newPred = Predicate.or(p1, p2, p3);
    or
    @example
        var preds = [p1, p2, p3];
        var newPred = Predicate.or(preds);
    @method or
    @param predicates* {multiple Predicates|Array of Predicate} Any null or undefined values passed in will be automatically filtered out before constructing the composite predicate.
    @static
    **/
    ctor.or = function () {
      var pred = new AndOrPredicate("or", __arraySlice(arguments));
      return pred.op && pred;
    };
    
    /**
    Creates a 'composite' Predicate by 'negating' a specified predicate.
    @example
        var p1 = Predicate.create("Freight", "gt", 100);
        var not_p1 = Predicate.not(p1);
    This can also be accomplished using the 'instance' version of the 'not' method
    @example
        var not_p1 = p1.not();
    Both of which would be the same as
    @example
        var not_p1 = Predicate.create("Freight", "le", 100);
    @method not
    @param predicate {Predicate}
    @static
    **/
    ctor.not = function (pred) {
      return pred.not();
    };

    ctor.extendBinaryPredicateFn = function(opMap, visitorFn ) {
      var baseVisitorFn = toFunctionVisitor.binaryPredicate;
      for (var op in (opMap || {})) {
        var config = opMap[op];
        config.visitorFn = visitorFn;
        updateAliasMap(BinaryPredicate.prototype.aliasMap, op, opMap[op])
      }
      if (!toFunctionVisitor.isExtended) {
        toFunctionVisitor.binaryPredicate = function (context, expr1Val, expr2Val) {
          var visitorFn = this.aliasMap[this.op.key].visitorFn;
          if (visitorFn) {
            return visitorFn(context, expr1Val, expr2Val);
          } else {
            return baseVisitorFn(context, expr1Val, expr2Val);
          }
        }
        toFunctionVisitor.isExtended = true;
      }
    };


    /**
    'And's this Predicate with one or more other Predicates and returns a new 'composite' Predicate
    @example
        var dt = new Date(88, 9, 12);
        var p1 = Predicate.create("OrderDate", "ne", dt);
        var p2 = Predicate.create("ShipCity", "startsWith", "C");
        var p3 = Predicate.create("Freight", ">", 100);
        var newPred = p1.and(p2, p3);
    or
    @example
        var preds = [p2, p3];
        var newPred = p1.and(preds);
    The 'and' method is also used to write "fluent" expressions
    @example
        var p4 = Predicate.create("ShipCity", "startswith", "F")
          .and("Size", "gt", 2000);
    @method and
    @param predicates* {multiple Predicates|Array of Predicate} Any null or undefined values passed in will be automatically filtered out before constructing the composite predicate.
    **/
    proto.and = function () {
      return new AndOrPredicate("and", argsForAndOrPredicates(this, arguments));
    };
    
    /**
    'Or's this Predicate with one or more other Predicates and returns a new 'composite' Predicate
    @example
        var dt = new Date(88, 9, 12);
        var p1 = Predicate.create("OrderDate", "ne", dt);
        var p2 = Predicate.create("ShipCity", "startsWith", "C");
        var p3 = Predicate.create("Freight", ">", 100);
        var newPred = p1.or(p2, p3);
    or
    @example
        var preds = [p2, p3];
        var newPred = p1.or(preds);
    The 'or' method is also used to write "fluent" expressions
    @example
        var p4 = Predicate.create("ShipCity", "startswith", "F")
          .or("Size", "gt", 2000);
    @method or
    @param predicates* {multiple Predicates|Array of Predicate} Any null or undefined values passed in will be automatically filtered out before constructing the composite predicate.
    **/
    proto.or = function () {
      return new AndOrPredicate("or", argsForAndOrPredicates(this, arguments));
    };
    
    /**
    Returns the 'negated' version of this Predicate
    @example
        var p1 = Predicate.create("Freight", "gt", 100);
        var not_p1 = p1.not();
    This can also be accomplished using the 'static' version of the 'not' method
    @example
        var p1 = Predicate.create("Freight", "gt", 100);
        var not_p1 = Predicate.not(p1);
    which would be the same as
    @example
        var not_p1 = Predicate.create("Freight", "le", 100);
    @method not
    **/
    proto.not = function () {
      return new UnaryPredicate("not", this);
    };
    
    //
    proto.toJSON = function () {
      // toJSON ( part of js standard - takes a single parameter
      // that is either "" or the name of the property being serialized.
      return this.toJSONExt({ entityType: this._entityType });
    }

    proto.toJSONExt = function(context) {
      return this.visit(context, toJSONVisitor);
    }

    proto.toFunction = function(context) {
      return this.visit(context, toFunctionVisitor);
    }

    proto.toString = function () {
      return JSON.stringify(this);
    };

    proto.visit = function(context, visitor) {
      if (__isEmpty(context)) {
        context = { entityType: null };
      } else if (context instanceof EntityType) {
        context = { entityType: context };
      } else if (!__hasOwnProperty(context, "entityType")) {
        throw new Error("All visitor methods must be called with a context object containing at least an 'entityType' property");
      }

      if (visitor) {
        context.visitor = visitor;
      } else {
        visitor = context.visitor;
      }
      var fn = visitor[this.visitorMethodName];
      if (fn == null) {
        throw new Error("Unable to locate method: " + this.visitorMethodName + " on visitor");
      }


      var entityType = context.entityType;
      // don't both validating if already done so ( or if no _validate method
      if (this._validate && entityType == null || this._entityType !== entityType) {
        // don't need to capture return value because validation fn doesn't have one.
        this._validate(entityType, context.usesNameOnServer);
        this._entityType = entityType;
      }

      // args = context, arg1, args2, ...
      var args = Array.prototype.slice.call(arguments, 1);
      return fn.call(this, context);
    }

    proto._initialize = function (visitorMethodName,  opMap) {
      this.visitorMethodName = visitorMethodName;
      var aliasMap = this.aliasMap = {};
      for (var op in (opMap || {})) {
        updateAliasMap(aliasMap, op, opMap[op])
      }
    };

    function argsForAndOrPredicates(obj, args) {
      var preds = args[0];
      if (preds instanceof Predicate) {
        preds = __arraySlice(args);
      } else if (!Array.isArray(preds)) {
        preds = [Predicate(__arraySlice(args))];
      }
      return [obj].concat(preds);
    }
    
    function updateAliasMap(aliasMap, op, config) {
      var key = op.toLowerCase();
      config.key = key;
      aliasMap[key] = config;

      config.aliases && config.aliases.forEach(function (alias) {
        aliasMap[alias.toLowerCase()] = config;
      });
    }
    
    proto._resolveOp = function (op, okIfNotFound) {
      op = op.operator || op;
      var result = this.aliasMap[op.toLowerCase()];
      if (!result && !okIfNotFound) {
        throw new Error("Unable to resolve operator: " + op);
      }
      return result;
    };
    
    function createPredicateFromArray(arr) {
      // TODO: assert that length of the array should be > 3
      // Needs to handle:
      //      [ "freight", ">", 100"];
      //      [ "orders", "any", "freight",  ">", 950 ]
      //      [ "orders", "and", anotherPred ]
      //      [ "orders", "and", [ "freight, ">", 950 ]
      var json = {};
      var value = {};
      json[arr[0]] = value;
      var op = arr[1];
      op = op.operator || op;  // incoming op will be either a string or a FilterQueryOp
      if (arr.length == 3) {
        value[op] = arr[2];
      } else {
        value[op] = createPredicateFromArray(arr.splice(2));
      }
      return createPredicateFromObject(json);
    };
    
    function createPredicateFromObject(obj) {
      if (obj instanceof Predicate) return obj;
      
      if (typeof obj != 'object') {
        throw new Error("Unable to convert to a Predicate: " + obj);
      }
      var keys = Object.keys(obj);
      var preds = keys.map(function (key) {
        return createPredicateFromKeyValue(key, obj[key]);
      });
      return (preds.length === 1) ? preds[0] : new AndOrPredicate("and", preds);
    }
    
    function createPredicateFromKeyValue(key, value) {
      // { and: [a,b] } key='and', value = [a,b]
      if (AndOrPredicate.prototype._resolveOp(key, true)) {
        return new AndOrPredicate(key, value);
      }
      
      // { not: a }  key= 'not', value = a
      if (UnaryPredicate.prototype._resolveOp(key, true)) {
        return new UnaryPredicate(key, value);
      }

      if ((typeof value !== 'object') || value == null || __isDate(value)) {
        // { foo: bar } key='foo', value = bar ( where bar is a literal i.e. a string, a number, a boolean or a date.
        return new BinaryPredicate("eq", key, value);
      } else if (__hasOwnProperty(value, 'value')) {
        // { foo: { value: bar, dataType: xxx} } key='foo', value = bar ( where bar is an object representing a literal
        return new BinaryPredicate("eq", key, value);
      }
      
      if (Array.isArray(value)) {
        throw new Error("Unable to resolve predicate after the phrase: " + key);
      }
      
      var expr = key;
      var keys = Object.keys(value);
      var preds = keys.map(function (op) {
        
        // { a: { any: b } op = 'any', expr=a, value[op] = b
        if (AnyAllPredicate.prototype._resolveOp(op, true)) {
          return new AnyAllPredicate(op, expr, value[op]);
        }
        
        if (BinaryPredicate.prototype._resolveOp(op, true)) {
          // { a: { ">": b }} op = ">", expr=a, value[op] = b
          return new BinaryPredicate(op, expr, value[op]);
        } else if (__hasOwnProperty(value[op], 'value')) {
          // { a: { ">": { value: b, dataType: 'Int32' }} expr = a value[op] = { value: b, dataType: 'Int32' }
          return new BinaryPredicate("eq", expr, value[op]);
        }
        
        var msg = __formatString("Unable to resolve predicate after the phrase: '%1' for operator: '%2'  and value: '%3'", expr, op, value[op]);
        throw new Error(msg);

      });
      
      return (preds.length === 1) ? preds[0] : new AndOrPredicate("and", preds);
    }

    return ctor;
  })();
  
  var PassthruPredicate = (function () {
    var ctor = function PassthruPredicate(value) {
      this.value = value;
    };
    var proto = ctor.prototype = new Predicate();
    proto._initialize('passthruPredicate');

    proto._validate = __noop;

    return ctor;
  })();
  
  var UnaryPredicate = (function () {
    var ctor = function UnaryPredicate(op, pred) {
      this.op = this._resolveOp(op);
      this.pred = Predicate(pred);
    };
    
    var proto = ctor.prototype = new Predicate();
    proto._initialize('unaryPredicate', {
      'not': { aliases: [ '!', '~' ] }
    });

    proto._validate = function(entityType, usesNameOnServer) {
      this.pred._validate(entityType, usesNameOnServer);
    };

    return ctor;
  })();
  
  var BinaryPredicate = (function () {
    var ctor = function BinaryPredicate(op, expr1, expr2) {
      // 5 public props op, expr1Source, expr2Source, expr1, expr2
      this.op = this._resolveOp(op);
      this.expr1Source = expr1;
      this.expr2Source = expr2;
      // this.expr1 and this.expr2 won't be
      // determined until validate is run
    };
    
    var proto = ctor.prototype = new Predicate();
    proto._initialize('binaryPredicate', {
      'eq': {
        aliases: ["==", "equals" ]
      },
      'ne': {
        aliases: ["!=", "~=", "notequals" ]
      },
      'lt': {
        aliases: ["<", "lessthan" ]
      },
      'le': {
        aliases: ["<=", "lessthanorequal" ]
      },
      'gt': {
        aliases: [">", "greaterthan"]
      },
      'ge': {
        aliases: [">=", "greaterthanorequal" ]
      },
      'startswith': {
        isFunction: true
      },
      'endswith': {
        isFunction: true
      },
      'contains': {
        aliases: ["substringof"],
        isFunction: true
      },
      'in': {

      }
    });


    proto._validate = function(entityType, usesNameOnServer) {
      var expr1Context = { entityType: entityType, usesNameOnServer: usesNameOnServer };
      this.expr1 = createExpr(this.expr1Source, expr1Context);
      if (this.expr1 == null) {
        throw new Error("Unable to validate 1st expression: " + this.expr1Source);
      }
      if (this.expr1 instanceof LitExpr) {
        // lhs must be either a property or a function.
        throw new Error("The left hand side of a binary predicate cannot be a literal expression, it must be a valid property or functional predicate expression: " + this.expr1Source);
      }

      if (this.op.key == 'in' && !Array.isArray(this.expr2Source)) {
        throw new Error("The 'in' operator requires that its right hand argument be an array");
      }
      var expr2Context = __extend(expr1Context, { isRHS: true, dataType: this.expr1.dataType });
      this.expr2 = createExpr(this.expr2Source, expr2Context );
      if (this.expr2 == null) {
        throw new Error("Unable to validate 2nd expression: " + this.expr2Source);
      }

      if (this.expr1.dataType == null) {
        this.expr1.dataType = this.expr2.dataType;
      }
    }

    return ctor;
  })();
  
  var AndOrPredicate = (function () {
    // two public props: op, preds
    var ctor = function AndOrPredicate(op, preds) {
      this.op = this._resolveOp(op);
      if (preds.length == 1 && Array.isArray(preds[0])) {
        preds = preds[0];
      }
      this.preds = preds.filter(function (pred) {
        return pred != null;
      }).map(function (pred) {
        return Predicate(pred);
      });
      if (this.preds.length == 0) {
        // marker for an empty predicate
        this.op = null;
      }
      if (this.preds.length == 1) {
        return this.preds[0];
      }
    };
    
    var proto = ctor.prototype = new Predicate();
    proto._initialize("andOrPredicate", {
      'and': { aliases: [ '&&' ] },
      'or': { aliases: [ '||' ] }
    });

    proto._validate = function(entityType, usesNameOnServer) {
      this.preds.every(function (pred) {
        pred._validate(entityType, usesNameOnServer);
      });
    }

    return ctor;
  })();
  
  var AnyAllPredicate = (function () {
    // 4 public props: op, exprSource, expr, pred
    var ctor = function AnyAllPredicate(op, expr, pred) {
      this.op = this._resolveOp(op);
      this.exprSource = expr;
      // this.expr will not be resolved until validate is called
      this.pred = Predicate(pred);
    };
    
    var proto = ctor.prototype = new Predicate();
    proto._initialize("anyAllPredicate", {
      'any': { aliases: ['some'] },
      'all': { aliases: ["every"] }
    });

    proto._validate = function(entityType, usesNameOnServer) {
      this.expr = createExpr(this.exprSource, { entityType: entityType, usesNameOnServer: usesNameOnServer });
      // can't really know the predicateEntityType unless the original entity type was known.
      if (entityType == null || entityType.isAnonymous) {
        this.expr.dataType = null;
      }
      this.pred._validate(this.expr.dataType, usesNameOnServer);
    }

    return ctor;
  })();

  var PredicateExpression = function (visitorMethodName) {
    this.visitorMethodName = visitorMethodName;
    // give expressions the Predicate prototype method
    this.visit = Predicate.prototype.visit;
    // default impls - may be overridden
    this._validate = __noop;
  }

  var LitExpr = (function () {
    // 2 public props: value, dataType
    var ctor = function LitExpr(value, dataType, hasExplicitDataType) {
      // dataType may come is an a string
      dataType = resolveDataType(dataType);
      // if the DataType comes in as Undefined this means
      // that we should NOT attempt to parse it but just leave it alone
      // for now - this is usually because it is part of a Func expr.
      dataType = dataType || DataType.fromValue(value);

      if (dataType && dataType.parse) {
        if (Array.isArray(value)) {
          this.value = value.map(function(v) { return dataType.parse(v, typeof v) });
        } else {
          this.value = dataType.parse(value, typeof value);
        }
      } else {
        this.value = value;
      }
      this.dataType = dataType;
      this.hasExplicitDataType = hasExplicitDataType;
    };
    var proto = ctor.prototype = new PredicateExpression('litExpr');
    proto.toString = function() {
      return " LitExpr - value: " + this.value.toString() + " dataType: " + this.dataType.toString();
    };

    function resolveDataType(dataType) {
      if (dataType == null) return dataType;
      if (DataType.contains(dataType)) {
        return dataType;
      }
      if (__isString(dataType)) {
        var dt = DataType.fromName(dataType);
        if (dt) return dt;
        throw new Error("Unable to resolve a dataType named: " + dataType);
      }
      
      throw new Error("The dataType parameter passed into this literal expression is not a 'DataType'" + dataType);
    }
    
    return ctor;
  })();
  
  var PropExpr = (function () {
    // two public props: propertyPath, dateType
    var ctor = function PropExpr(propertyPath) {
      this.propertyPath = propertyPath;
      //this.dataType = DataType.Undefined;
      // this.dataType resolved after validate ( if not on an anon type }
    };
    var proto = ctor.prototype = new PredicateExpression('propExpr');
    proto.toString = function() {
      return " PropExpr - " + this.propertyPath;
    };

    proto._validate = function(entityType, usesNameOnServer) {

      if (entityType == null || entityType.isAnonymous) return;
      var props = entityType.getPropertiesOnPath(this.propertyPath, usesNameOnServer, false);

      if (!props) {
        var msg = __formatString("Unable to resolve propertyPath.  EntityType: '%1'   PropertyPath: '%2'", entityType.name, this.propertyPath);
        throw new Error(msg);
      }
      // get the last property
      var prop = props[props.length - 1];
      if (prop.isDataProperty) {
        this.dataType = prop.dataType;
      } else {
        this.dataType = prop.entityType;
      }
    }

    return ctor;
  })();
  
  var FnExpr = (function () {
    
    var ctor = function FnExpr(fnName, exprs) {
      // 4 public props: fnName, exprs, localFn, dataType
      this.fnName = fnName;
      this.exprs = exprs;
      var qf = _funcMap[fnName];
      if (qf == null) {
        throw new Error("Unknown function: " + fnName);
      }
      this.localFn = qf.fn;
      this.dataType = qf.dataType;
    };
    var proto = ctor.prototype = new PredicateExpression('fnExpr');

    proto.toString = function() {
      var exprStr = this.exprs.map(function(expr) {
        expr.toString();
      }).toString();
      return "FnExpr - " + this.fnName + "(" + exprStr + ")";
    };

    proto._validate = function(entityType, usesNameOnServer) {
      this.exprs.forEach(function (expr) {
        expr._validate(entityType, usesNameOnServer);
      });
    };

    // TODO: add dataTypes for the args next - will help to infer other dataTypes.
    var _funcMap = ctor.funcMap = {
      toupper: {
        fn: function (source) {
          return source.toUpperCase();
        }, dataType: DataType.String
      },
      tolower: {
        fn: function (source) {
          return source.toLowerCase();
        }, dataType: DataType.String
      },
      substring: {
        fn: function (source, pos, length) {
          return source.substring(pos, length);
        }, dataType: DataType.String
      },
      substringof: {
        fn: function (find, source) {
          return source.indexOf(find) >= 0;
        }, dataType: DataType.Boolean
      },
      length: {
        fn: function (source) {
          return source.length;
        }, dataType: DataType.Int32
      },
      trim: {
        fn: function (source) {
          return source.trim();
        }, dataType: DataType.String
      },
      concat: {
        fn: function (s1, s2) {
          return s1.concat(s2);
        }, dataType: DataType.String
      },
      replace: {
        fn: function (source, find, replace) {
          return source.replace(find, replace);
        }, dataType: DataType.String
      },
      startswith: {
        fn: function (source, find) {
          return __stringStartsWith(source, find);
        }, dataType: DataType.Boolean
      },
      endswith: {
        fn: function (source, find) {
          return __stringEndsWith(source, find);
        }, dataType: DataType.Boolean
      },
      indexof: {
        fn: function (source, find) {
          return source.indexOf(find);
        }, dataType: DataType.Int32
      },
      round: {
        fn: function (source) {
          return Math.round(source);
        }, dataType: DataType.Int32
      },
      ceiling: {
        fn: function (source) {
          return Math.ceil(source);
        }, dataType: DataType.Int32
      },
      floor: {
        fn: function (source) {
          return Math.floor(source);
        }, dataType: DataType.Int32
      },
      second: {
        fn: function (source) {
          return source.getSeconds();
        }, dataType: DataType.Int32
      },
      minute: {
        fn: function (source) {
          return source.getMinutes();
        }, dataType: DataType.Int32
      },
      day: {
        fn: function (source) {
          return source.getDate();
        }, dataType: DataType.Int32
      },
      month: {
        fn: function (source) {
          return source.getMonth() + 1;
        }, dataType: DataType.Int32
      },
      year: {
        fn: function (source) {
          return source.getFullYear();
        }, dataType: DataType.Int32
      }
    };
    
    return ctor;
  })();

  var RX_IDENTIFIER = /^[a-z_][\w.$]*$/i;
  // comma delimited expressions ignoring commas inside of both single and double quotes.
  var RX_COMMA_DELIM1 = /('[^']*'|[^,]+)/g;
  var RX_COMMA_DELIM2 = /("[^"]*"|[^,]+)/g;
  var DELIM = String.fromCharCode(191);

  function createExpr(source, exprContext) {
    var entityType = exprContext.entityType;

    // the right hand side of an 'in' clause
    if (Array.isArray(source)) {
      if (!exprContext.isRHS) {
        throw new Error("Array expressions are only permitted on the right hand side of a BinaryPredicate");
      }
      return new LitExpr(source, exprContext.dataType);
    }

    if (!__isString(source)) {
      if (source != null && __isObject(source) && !source.toISOString) { 
        // source is an object but not a Date-like thing such as a JS or MomentJS Date
        if (source.value === undefined) {
          throw new Error("Unable to resolve an expression for: " + source + " on entityType: " + entityType.name);
        }
        if (source.isProperty) {
          return new PropExpr(source.value);
        } else {
          // we want to insure that any LitExpr created this way is tagged with 'hasExplicitDataType: true'
          // because we want to insure that if we roundtrip thru toJSON that we don't
          // accidentally reinterpret this node as a PropExpr.
          // return new LitExpr(source.value, source.dataType || context.dataType, !!source.dataType);
          return new LitExpr(source.value, source.dataType || exprContext.dataType, true);
        }
      } else {
        return new LitExpr(source, exprContext.dataType);
      }
    }

    if (exprContext.isRHS) {
      if (entityType == null || entityType.isAnonymous) {
        // if entityType is unknown then assume that the rhs is a literal
        return new LitExpr(source, exprContext.dataType);
      } else {
        return parseLitOrPropExpr(source, exprContext);
      }
    } else {
      var regex = /\([^()]*\)/;
      var m;
      var tokens = [];
      var i = 0;
      while (m = regex.exec(source)) {
        var token = m[0];
        tokens.push(token);
        var repl = DELIM + i++;
        source = source.replace(token, repl);
      }

      var expr = parseExpr(source, tokens, exprContext);
      expr._validate(entityType, exprContext.usesNameOnServer);
      return expr;
    }
  }

  function parseExpr(source, tokens, exprContext) {
    var parts = source.split(DELIM);
    if (parts.length === 1) {
      return parseLitOrPropExpr(parts[0], exprContext);
    } else {
      return parseFnExpr(source, parts, tokens, exprContext);
    }
  }

  function parseLitOrPropExpr(value, exprContext) {
    value = value.trim();
    // value is either a string, a quoted string, a number, a bool value, or a date
    // if a string ( not a quoted string) then this represents a property name ( 1st ) or a lit string ( 2nd)
    var firstChar = value.substr(0, 1);
    var isQuoted = (firstChar === "'" || firstChar === '"') && value.length > 1 && value.substr(value.length - 1) === firstChar;
    if (isQuoted) {
      var unquotedValue = value.substr(1, value.length - 2);
      return new LitExpr(unquotedValue, exprContext.dataType || DataType.String);
    } else {
      var entityType = exprContext.entityType;
      // TODO: get rid of isAnonymous below when we get the chance.
      if (entityType == null || entityType.isAnonymous) {
        // this fork will only be reached on the LHS of an BinaryPredicate -
        // a RHS expr cannot get here with an anon type
        return new PropExpr(value);
      } else {
        var mayBeIdentifier = RX_IDENTIFIER.test(value);
        if (mayBeIdentifier) {
          // if (entityType.getProperty(value, false) != null) {
          if (entityType.getPropertiesOnPath(value, exprContext.usesNameOnServer, false) != null) {
            return new PropExpr(value);
          }
        }
      }
      // we don't really know the datatype here because even though it comes in as a string
      // its usually a string BUT it might be a number  i.e. the "1" or the "2" from an expr
      // like "toUpper(substring(companyName, 1, 2))"
      return new LitExpr(value, exprContext.dataType);
    }
  }

  function parseFnExpr(source, parts, tokens, exprContext) {
    try {
      var fnName = parts[0].trim().toLowerCase();

      var argSource = tokens[parts[1]].trim();
      if (argSource.substr(0, 1) === "(") {
        argSource = argSource.substr(1, argSource.length - 2);
      }
      var commaMatchStr = source.indexOf("'") >= 0 ? RX_COMMA_DELIM1 : RX_COMMA_DELIM2;
      var args = argSource.match(commaMatchStr);
      var newContext = __extend({}, exprContext);
      // a dataType of Undefined on a context basically means not to try parsing
      // the value if the expr is a literal
      newContext.dataType = DataType.Undefined;
      newContext.isFnArg = true;
      var exprs = args.map(function (a) {
        return parseExpr(a, tokens, newContext);
      });
      return new FnExpr(fnName, exprs);
    } catch (e) {
      return null;
    }
  }

  var toFunctionVisitor =  (function () {
    var visitor = {

      passthruPredicate: function () {
        throw new Error("Cannot execute an PassthruPredicate expression against the local cache: " + this.value);
      },
      
      unaryPredicate: function (context) {
        var predFn = this.pred.visit(context);
        switch (this.op.key) {
          case "not":
            return function (entity) {
              return !predFn(entity);
            };
          default:
            throw new Error("Invalid unary operator:" + this.op.key);
        }
      },
      
      binaryPredicate: function (context) {
        var expr1Fn = this.expr1.visit(context);
        var expr2Fn = this.expr2.visit(context);
        var dataType = this.expr1.dataType || this.expr2.dataType;
        var lqco = context.entityType.metadataStore.localQueryComparisonOptions;
        var predFn = getBinaryPredicateFn(this, dataType, lqco);
        if (predFn == null) {
          throw new Error("Invalid binaryPredicate operator:" + this.op.key);
        }
        return function (entity) {
          return predFn(expr1Fn(entity), expr2Fn(entity));
        };
      },
      
      andOrPredicate: function (context) {
        var predFns = this.preds.map(function(pred) {
          return pred.visit(context);
        });
        switch (this.op.key) {
          case "and":
            return function (entity) {
              var result = predFns.reduce(function (prev, cur) {
                return prev && cur(entity);
              }, true);
              return result;
            };
          case "or":
            return function (entity) {
              var result = predFns.reduce(function (prev, cur) {
                return prev || cur(entity);
              }, false);
              return result;
            };
          default:
            throw new Error("Invalid boolean operator:" + op.key);
        }
      },
      
      anyAllPredicate: function (context) {
        var exprFn = this.expr.visit(context);
        var newContext = __extend({}, context);
        newContext.entityType = this.expr.dataType;
        var predFn = this.pred.visit(newContext);
        var anyAllPredFn = getAnyAllPredicateFn(this.op);
        return function (entity) {
          return anyAllPredFn(exprFn(entity), predFn);
        };
      },
      
      litExpr: function () {
        var value = this.value;
        return function (entity) {
          return value;
        };
      },
      
      propExpr: function () {
        var propertyPath = this.propertyPath;
        var properties = propertyPath.split('.');
        if (properties.length === 1) {
          return function (entity) {
            return entity.getProperty(propertyPath);
          };
        } else {
          return function (entity) {
            return getPropertyPathValue(entity, properties);
          };
        }
      },
      
      fnExpr: function (context) {
        var exprFns = this.exprs.map(function(expr) {
          return expr.visit(context);
        });
        var that = this;
        return function (entity) {
          var values = exprFns.map(function (exprFn) {
            var value = exprFn(entity);
            return value;
          });
          var result = that.localFn.apply(null, values);
          return result;
        }
      }

    };

    function getAnyAllPredicateFn(op) {
      switch (op.key) {
        case "any":
          return function (v1, v2) {
            return v1.some(function (v) {
              return v2(v);
            });
          };
        case "all":
          return function (v1, v2) {
            return v1.every(function (v) {
              return v2(v);
            });
          };
        default:
          throw new Error("Unknown operator: " + op.key);
      }
    }

    function getBinaryPredicateFn(binaryPredicate, dataType, lqco) {
      var op = binaryPredicate.op;
      var mc = DataType.getComparableFn(dataType);
      var predFn;
      switch (op.key) {
        case 'eq':
          predFn = function (v1, v2) {
            if (v1 && typeof v1 === 'string') {
              return stringEquals(v1, v2, lqco);
            } else {
              return mc(v1) == mc(v2);
            }
          };
          break;
        case 'ne':
          predFn = function (v1, v2) {
            if (v1 && typeof v1 === 'string') {
              return !stringEquals(v1, v2, lqco);
            } else {
              return mc(v1) != mc(v2);
            }
          };
          break;
        case 'gt':
          predFn = function (v1, v2) {
            return mc(v1) > mc(v2);
          };
          break;
        case 'ge':
          predFn = function (v1, v2) {
            return mc(v1) >= mc(v2);
          };
          break;
        case 'lt':
          predFn = function (v1, v2) {
            return mc(v1) < mc(v2);
          };
          break;
        case 'le':
          predFn = function (v1, v2) {
            return mc(v1) <= mc(v2);
          };
          break;
        case 'startswith':
          predFn = function (v1, v2) {
            return stringStartsWith(v1, v2, lqco);
          };
          break;
        case 'endswith':
          predFn = function (v1, v2) {
            return stringEndsWith(v1, v2, lqco);
          };
          break;
        case 'contains':
          predFn = function (v1, v2) {
            return stringContains(v1, v2, lqco);
          };
          break;
        case 'in':
          predFn = function (v1, v2) {
            v1 = mc(v1);
            v2 = v2.map(function(v) { return mc(v) });
            return v2.indexOf(v1) >= 0;
          };
          break;
        default:
          return null;
      }
      return predFn;
    }

    function stringEquals(a, b, lqco) {
      if (b == null) return false;
      if (typeof b !== 'string') {
        b = b.toString();
      }
      if (lqco.usesSql92CompliantStringComparison) {
        a = (a || "").trim();
        b = (b || "").trim();
      }
      if (!lqco.isCaseSensitive) {
        a = (a || "").toLowerCase();
        b = (b || "").toLowerCase();
      }
      return a === b;
    }
    
    function stringStartsWith(a, b, lqco) {
      if (!lqco.isCaseSensitive) {
        a = (a || "").toLowerCase();
        b = (b || "").toLowerCase();
      }
      return __stringStartsWith(a, b);
    }
    
    function stringEndsWith(a, b, lqco) {
      if (!lqco.isCaseSensitive) {
        a = (a || "").toLowerCase();
        b = (b || "").toLowerCase();
      }
      return __stringEndsWith(a, b);
    }
    
    function stringContains(a, b, lqco) {
      if (!lqco.isCaseSensitive) {
        a = (a || "").toLowerCase();
        b = (b || "").toLowerCase();
      }
      return a.indexOf(b) >= 0;
    }
    
    return visitor;
  }());

  var toJSONVisitor = (function () {
    var visitor = {

      passthruPredicate: function () {
        return this.value;
      },
      
      unaryPredicate: function (context) {
        var predVal = this.pred.visit(context);
        var json = {};
        json[this.op.key] = predVal;
        return json;
      },
      
      binaryPredicate: function (context) {
        var expr1Val = this.expr1.visit(context);
        var expr2Val = this.expr2.visit(context);
        var json = {};
        if (this.expr2 instanceof PropExpr) {
          expr2Val = { value: expr2Val, isProperty: true };
        }
        if (this.op.key === "eq") {
          json[expr1Val] = expr2Val;
        } else {
          var value = {};
          json[expr1Val] = value;
          value[this.op.key] = expr2Val;
        }
        return json;
      },
      
      andOrPredicate: function (context) {
        var predVals = this.preds.map(function(pred) {
          return pred.visit(context);
        });
        var json;
        // normalizeAnd clauses if possible.
        // passthru predicate will appear as string and their 'ands' can't be 'normalized'
        if (this.op.key === 'and' && predVals.length === 2 && !predVals.some(__isString)) {
          // normalize 'and' clauses - will return null if can't be combined.
          json = predVals.reduce(combine);
        }
        if (json == null) {
          json = {};
          json[this.op.key] = predVals;
        }
        return json;
      },
      
      anyAllPredicate: function (context) {
        var exprVal = this.expr.visit(context);
        var newContext = __extend({}, context);
        newContext.entityType = this.expr.dataType;
        var predVal = this.pred.visit(newContext);
        var json = {};
        var value = {};
        value[this.op.key] = predVal;
        json[exprVal] = value;
        return json;
      },
      
      litExpr: function (context) {
        if (this.hasExplicitDataType || context.useExplicitDataType) {
          return { value: this.value, dataType: this.dataType.name }
        } else {
          return this.value;
        }
      },
      
      propExpr: function (context) {
        if (context.toNameOnServer) {
          return context.entityType.clientPropertyPathToServer(this.propertyPath);
        } else {
          return this.propertyPath;
        }
      },
      
      fnExpr: function (context) {
        var exprVals = this.exprs.map(function(expr) {
          return expr.visit(context);
        });
        return this.fnName + "(" + exprVals.join(",") + ")";
      }
    };
    
    function combine(j1, j2) {
      var ok = Object.keys(j2).every(function (key) {
        if (j1.hasOwnProperty(key)) {
          if (typeof (j2[key]) != 'object') {
            // exit and indicate that we can't combine
            return false;
          }
          if (combine(j1[key], j2[key]) == null) {
            return false;
          }
        } else {
          j1[key] = j2[key];
        }
        return true;
      });
      return ok ? j1 : null;
    }
    
    return visitor;
  }());

  
  return Predicate;

})();

breeze.Predicate = Predicate;

;var EntityQuery = (function () {
  /**
  An EntityQuery instance is used to query entities either from a remote datasource or from a local {{#crossLink "EntityManager"}}{{/crossLink}}.

  EntityQueries are immutable - this means that all EntityQuery methods that return an EntityQuery actually create a new EntityQuery.  This means that
  EntityQueries can be 'modified' without affecting any current instances.

  @class EntityQuery
  **/

  /**
  @example
      var query = new EntityQuery("Customers")

  Usually this constructor will be followed by calls to filtering, ordering or selection methods
  @example
      var query = new EntityQuery("Customers")
          .where("CompanyName", "startsWith", "C")
          .orderBy("Region");

  @method <ctor> EntityQuery
  @param [resourceName] {String}
  **/
  var ctor = function EntityQuery(resourceName) {
    if (resourceName != null && !__isString(resourceName)) {
      return fromJSON(this, resourceName);
    }
    
    this.resourceName = resourceName;
    this.fromEntityType = null;
    this.wherePredicate = null;
    this.orderByClause = null;
    this.selectClause = null;
    this.skipCount = null;
    this.takeCount = null;
    this.expandClause = null;
    this.parameters = {};
    this.inlineCountEnabled = false;
    this.noTrackingEnabled = false;
    // default is to get queryOptions and dataService from the entityManager.
    // this.queryOptions = new QueryOptions();
    // this.dataService = new DataService();
    this.entityManager = null;

  };
  var proto = ctor.prototype;
  proto._$typeName = "EntityQuery";
  
  
  /**
  The resource name used by this query.

  __readOnly__
  @property resourceName {String}
  **/

  /**
  The entityType that is associated with the 'from' clause ( resourceName) of the query.  This is only guaranteed to be be set AFTER the query
  has been executed because it depends on the MetadataStore associated with the EntityManager that the query was executed against.
  This value may be null if the entityType cannot be associated with a resourceName.

  __readOnly__
  @property fromEntityType {EntityType}
  **/

  /**
  The entityType that will be returned by this query. This property will only be set if the 'toType' method was called.

  __readOnly__
  @property resultEntityType {EntityType}
  **/

  /**
  The 'where' predicate used by this query.

  __readOnly__
  @property wherePredicate {Predicate}
  **/

  /**
  The {{#crossLink "OrderByClause"}}{{/crossLink}} used by this query.

  __readOnly__
  @property orderByClause {OrderByClause}
  **/

  /**
  The number of entities to 'skip' for this query.

  __readOnly__
  @property skipCount {Integer}
  **/

  /**
  The number of entities to 'take' for this query.

  __readOnly__
  @property takeCount {Integer}
  **/

  /**
  Any additional parameters that were added to the query via the 'withParameters' method.

  __readOnly__
  @property parameters {Object}
  **/

  /**
  The {{#crossLink "QueryOptions"}}{{/crossLink}} for this query.

  __readOnly__
  @property queryOptions {QueryOptions}
  **/

  /**
  The {{#crossLink "EntityManager"}}{{/crossLink}} for this query. This may be null and can be set via the 'using' method.

  __readOnly__
  @property entityManager {EntityManager}
  **/

  /**
  Specifies the resource to query for this EntityQuery.
  @example
      var query = new EntityQuery()
          .from("Customers");
  is the same as
  @example
      var query = new EntityQuery("Customers");
  @method from
  @param resourceName {String} The resource to query.
  @return {EntityQuery}
  @chainable
  **/
  proto.from = function (resourceName) {
    // TODO: think about allowing entityType as well
    assertParam(resourceName, "resourceName").isString().check();
    return clone(this, "resourceName", resourceName);
  };
  
  /**
  This is a static version of the "from" method and it creates a 'base' entityQuery for the specified resource name.
  @example
      var query = EntityQuery.from("Customers");
  is the same as
  @example
      var query = new EntityQuery("Customers");
  @method from
  @static
  @param resourceName {String} The resource to query.
  @return {EntityQuery}
  @chainable
  **/
  ctor.from = function (resourceName) {
    assertParam(resourceName, "resourceName").isString().check();
    return new EntityQuery(resourceName);
  };
  
  /**
  Specifies the top level EntityType that this query will return.  Only needed when a query returns a json result that does not include type information.
  @example
      var query = new EntityQuery()
        .from("MyCustomMethod")
        .toType("Customer")

  @method toType
  @param entityType {String|EntityType} The top level entityType that this query will return.  This method is only needed when a query returns a json result that
  does not include type information.  If the json result consists of more than a simple entity or array of entities, consider using a JsonResultsAdapter instead.
  @return {EntityQuery}
  @chainable
  **/
  proto.toType = function (entityType) {
    assertParam(entityType, "entityType").isString().or().isInstanceOf(EntityType).check();
    return clone(this, "resultEntityType", entityType);
  };
  
  
  /**
  Returns a new query with an added filter criteria; Can be called multiple times which means to 'and' with any existing
  Predicate or can be called with null to clear all predicates.
  @example
      var query = new EntityQuery("Customers")
                .where("CompanyName", "startsWith", "C");
  This can also be expressed using an explicit {{#crossLink "FilterQueryOp"}}{{/crossLink}} as
  @example
      var query = new EntityQuery("Customers")
          .where("CompanyName", FilterQueryOp.StartsWith, "C");
  or a preconstructed {{#crossLink "Predicate"}}{{/crossLink}} may be used
  @example
      var pred = new Predicate("CompanyName", FilterQueryOp.StartsWith, "C");
      var query = new EntityQuery("Customers").where(pred);
  Predicates are often useful when you want to combine multiple conditions in a single filter, such as
  @example
      var pred = Predicate.create("CompanyName", "startswith", "C").and("Region", FilterQueryOp.Equals, null);
      var query = new EntityQuery("Customers")
        .where(pred);
  @example
  More complicated queries can make use of nested property paths
  @example
      var query = new EntityQuery("Products")
        .where("Category.CategoryName", "startswith", "S");
  or OData functions - A list of valid OData functions can be found within the {{#crossLink "Predicate"}}{{/crossLink}} documentation.
  @example
      var query = new EntityQuery("Customers")
        .where("toLower(CompanyName)", "startsWith", "c");
  or to be even more baroque
  @example
      var query = new EntityQuery("Customers")
        .where("toUpper(substring(CompanyName, 1, 2))", FilterQueryOp.Equals, "OM");
  @method where
  @param predicate {Predicate|property|property path, operator, value} Can be either

    - a single {{#crossLink "Predicate"}}{{/crossLink}}

    - or the parameters to create a 'simple' Predicate

    - a property name, a property path with '.' as path seperators or a property expression {String}
    - an operator {FilterQueryOp|String} Either a  {{#crossLink "FilterQueryOp"}}{{/crossLink}} or it's string representation. Case is ignored
    when if a string is provided and any string that matches one of the FilterQueryOp aliases will be accepted.
    - a value {Object} - This will be treated as either a property expression or a literal depending on context.  In general,
    if the value can be interpreted as a property expression it will be, otherwise it will be treated as a literal.
    In most cases this works well, but you can also force the interpretation by making the value argument itself an object with a 'value' property and an 'isLiteral' property set to either true or false.
    Breeze also tries to infer the dataType of any literal based on context, if this fails you can force this inference by making the value argument an object with a 'value' property and a 'dataType'property set
    to one of the breeze.DataType enumeration instances.
    - or a null or undefined ( this causes any existing where clause to be removed)

  @return {EntityQuery}
  @chainable
  **/
  proto.where = function (wherePredicate) {
    if (wherePredicate != null) {
      wherePredicate = Predicate.create(__arraySlice(arguments));
      if (this.fromEntityType) wherePredicate._validate(this.fromEntityType);
      if (this.wherePredicate) {
        wherePredicate = this.wherePredicate.and(wherePredicate);
      }
    }
    return clone(this, "wherePredicate", wherePredicate);
  };

  /**
  Returns a new query that orders the results of the query by property name.  By default sorting occurs is ascending order, but sorting in descending order is supported as well.
  OrderBy clauses may be chained.
  @example
      var query = new EntityQuery("Customers")
        .orderBy("CompanyName");

  or to sort across multiple properties
  @example
      var query = new EntityQuery("Customers")
        .orderBy("Region, CompanyName");

  Nested property paths are also supported
  @example
      var query = new EntityQuery("Products")
        .orderBy("Category.CategoryName");

  Sorting in descending order is supported via the addition of ' desc' to the end of any property path.
  @example
      var query = new EntityQuery("Customers")
        .orderBy("CompanyName desc");

  or
  @example
      var query = new EntityQuery("Customers")
        .orderBy("Region desc, CompanyName desc");
  @method orderBy
  @param propertyPaths {String|Array of String} A comma-separated (',') string of property paths or an array of property paths.
  Each property path can optionally end with " desc" to force a descending sort order. If 'propertyPaths' is either null or omitted then all ordering is removed.
  @param isDescending {Boolean} - If specified, overrides all of the embedded 'desc' tags in the previously specified property paths.
  @return {EntityQuery}
  @chainable
  **/
  proto.orderBy = function (propertyPaths, isDescending) {
    // propertyPaths: can pass in create("A.X,B") or create("A.X desc, B") or create("A.X desc,B", true])
    // isDesc parameter trumps isDesc in propertyName.

    var orderByClause = propertyPaths == null ? null : new OrderByClause(normalizePropertyPaths(propertyPaths), isDescending);
    if (this.orderByClause && orderByClause) {
      orderByClause = new OrderByClause([this.orderByClause, orderByClause]);
    }
    return clone(this, "orderByClause", orderByClause);
  }
  
  /**
  Returns a new query that orders the results of the query by property name in descending order.
  @example
      var query = new EntityQuery("Customers")
        .orderByDesc("CompanyName");

  or to sort across multiple properties
  @example
      var query = new EntityQuery("Customers")
        .orderByDesc("Region, CompanyName");

  Nested property paths are also supported
  @example
      var query = new EntityQuery("Products")
        .orderByDesc("Category.CategoryName");

  @method orderByDesc
  @param propertyPaths {String|Array of String} A comma-separated (',') string of property paths or an array of property paths.
  If 'propertyPaths' is either null or omitted then all ordering is removed.
  @return {EntityQuery}
  @chainable
  **/
  proto.orderByDesc = function (propertyPaths) {
    return this.orderBy(propertyPaths, true);
  };
  
  /**
  Returns a new query that selects a list of properties from the results of the original query and returns the values of just these properties. This
  will be referred to as a projection.
  If the result of this selection "projection" contains entities, these entities will automatically be added to EntityManager's cache and will
  be made 'observable'.
  Any simple properties, i.e. strings, numbers or dates within a projection will not be cached are will NOT be made 'observable'.

  @example
  Simple data properties can be projected
  @example
      var query = new EntityQuery("Customers")
        .where("CompanyName", "startsWith", "C")
        .select("CompanyName");
  This will return an array of objects each with a single "CompanyName" property of type string.
  A similar query could return a navigation property instead
  @example
      var query = new EntityQuery("Customers")
        .where("CompanyName", "startsWith", "C")
        .select("Orders");
  where the result would be an array of objects each with a single "Orders" property that would itself be an array of "Order" entities.
  Composite projections are also possible:
  @example
      var query = new EntityQuery("Customers")
        .where("CompanyName", "startsWith", "C")
        .select("CompanyName, Orders");
  As well as projections involving nested property paths
  @example
      var query = EntityQuery("Orders")
        .where("Customer.CompanyName", "startsWith", "C")
        .select("Customer.CompanyName, Customer, OrderDate");
  @method select
  @param propertyPaths {String|Array of String} A comma-separated (',') string of property paths or an array of property paths.
  If 'propertyPaths' is either null or omitted then any existing projection on the query is removed.
  @return {EntityQuery}
  @chainable
  **/
  proto.select = function (propertyPaths) {
    var selectClause = propertyPaths == null ? null : new SelectClause(normalizePropertyPaths(propertyPaths));
    return clone(this, "selectClause", selectClause);
  };
  
  /**
  Returns a new query that skips the specified number of entities when returning results.
  Any existing 'skip' can be cleared by calling 'skip' with no arguments.
  @example
      var query = new EntityQuery("Customers")
        .where("CompanyName", "startsWith", "C")
        .skip(5);
  @method skip
  @param count {Number} The number of entities to return. If omitted or null any existing skip count on the query is removed.
  @return {EntityQuery}
  @chainable
  **/
  proto.skip = function (count) {
    assertParam(count, "count").isOptional().isNumber().check();
    return clone(this, "skipCount", (count == null) ? null : count);
  };
  
  /**
  Returns a new query that returns only the specified number of entities when returning results. - Same as 'take'.
  Any existing 'top' can be cleared by calling 'top' with no arguments.
  @example
      var query = new EntityQuery("Customers")
        .top(5);
  @method top
  @param count {Number} The number of entities to return.
  If 'count' is either null or omitted then any existing 'top' count on the query is removed.
  @return {EntityQuery}
  @chainable
  **/
  proto.top = function (count) {
    return this.take(count);
  };
  
  /**
  Returns a new query that returns only the specified number of entities when returning results - Same as 'top'.
  Any existing take can be cleared by calling take with no arguments.
  @example
      var query = new EntityQuery("Customers")
        .take(5);
  @method take
  @param count {Number} The number of entities to return.
  If 'count' is either null or omitted then any existing 'take' count on the query is removed.
  @return {EntityQuery}
  @chainable
  **/
  proto.take = function (count) {
    assertParam(count, "count").isOptional().isNumber().check();
    return clone(this, "takeCount", (count == null) ? null : count);
  };
  
  /**
  Returns a new query that will return related entities nested within its results. The expand method allows you to identify related entities, via navigation property
  names such that a graph of entities may be retrieved with a single request. Any filtering occurs before the results are 'expanded'.
  @example
      var query = new EntityQuery("Customers")
        .where("CompanyName", "startsWith", "C")
        .expand("Orders");
  will return the filtered customers each with its "Orders" properties fully resolved.
  Multiple paths may be specified by separating the paths by a ','
  @example
      var query = new EntityQuery("Orders")
        .expand("Customer, Employee")
  and nested property paths my be specified as well
  @example
      var query = new EntityQuery("Orders")
        .expand("Customer, OrderDetails, OrderDetails.Product")
  @method expand
  @param propertyPaths {String|Array of String} A comma-separated list of navigation property names or an array of navigation property names. Each Navigation Property name can be followed
  by a '.' and another navigation property name to enable identifying a multi-level relationship.
  If 'propertyPaths' is either null or omitted then any existing 'expand' clause on the query is removed.
  @return {EntityQuery}
  @chainable
  **/
  proto.expand = function (propertyPaths) {
    var expandClause = propertyPaths == null ? null : new ExpandClause(normalizePropertyPaths(propertyPaths));
    return clone(this, "expandClause", expandClause);
  };
  
  /**
  Returns a new query that includes a collection of parameters to pass to the server.
  @example
      var query = EntityQuery.from("EmployeesFilteredByCountryAndBirthdate")
        .withParameters({ BirthDate: "1/1/1960", Country: "USA" });
   
  will call the 'EmployeesFilteredByCountryAndBirthdate' method on the server and pass in 2 parameters. This
  query will be uri encoded as
  @example
      {serviceApi}/EmployeesFilteredByCountryAndBirthdate?birthDate=1%2F1%2F1960&country=USA

  Parameters may also be mixed in with other query criteria.
  @example
      var query = EntityQuery.from("EmployeesFilteredByCountryAndBirthdate")
        .withParameters({ BirthDate: "1/1/1960", Country: "USA" })
        .where("LastName", "startsWith", "S")
        .orderBy("BirthDate");

  @method withParameters
  @param parameters {Object} A parameters object where the keys are the parameter names and the values are the parameter values.
  @return {EntityQuery}
  @chainable
  **/
  proto.withParameters = function (parameters) {
    assertParam(parameters, "parameters").isObject().check();
    return clone(this, "parameters", parameters);
  };
  
  /**
  Returns a query with the 'inlineCount' capability either enabled or disabled.  With 'inlineCount' enabled, an additional 'inlineCount' property
  will be returned with the query results that will contain the number of entities that would have been returned by this
  query with only the 'where'/'filter' clauses applied, i.e. without any 'skip'/'take' operators applied. For local queries this clause is ignored.

  @example
      var query = new EntityQuery("Customers")
        .take(20)
        .orderBy("CompanyName")
        .inlineCount(true);
  will return the first 20 customers as well as a count of all of the customers in the remote store.

  @method inlineCount
  @param enabled {Boolean=true} Whether or not inlineCount capability should be enabled. If this parameter is omitted, true is assumed.
  @return {EntityQuery}
  @chainable
  **/
  proto.inlineCount = function (enabled) {
    assertParam(enabled, "enabled").isBoolean().isOptional().check();
    enabled = (enabled === undefined) ? true : !!enabled;
    return clone(this, "inlineCountEnabled", enabled);
  };

  proto.useNameOnServer = function(usesNameOnServer) {
    assertParam(usesNameOnServer, "usesNameOnServer").isBoolean().isOptional().check();
    usesNameOnServer = (usesNameOnServer === undefined) ? true : !!usesNameOnServer;
    return clone(this, "usesNameOnServer", usesNameOnServer);
  }
  
  /**
  Returns a query with the 'noTracking' capability either enabled or disabled.  With 'noTracking' enabled, the results of this query
  will not be coerced into entities but will instead look like raw javascript projections. i.e. simple javascript objects.

  @example
      var query = new EntityQuery("Customers")
        .take(20)
        .orderBy("CompanyName")
        .noTracking(true);

  @method noTracking
  @param enabled {Boolean=true} Whether or not the noTracking capability should be enabled. If this parameter is omitted, true is assumed.
  @return {EntityQuery}
  @chainable
  **/
  proto.noTracking = function (enabled) {
    assertParam(enabled, "enabled").isBoolean().isOptional().check();
    enabled = (enabled === undefined) ? true : !!enabled;
    return clone(this, "noTrackingEnabled", enabled);
  };
  
  /**
  Returns a copy of this EntityQuery with the specified {{#crossLink "EntityManager"}}{{/crossLink}}, {{#crossLink "DataService"}}{{/crossLink}},
  {{#crossLink "JsonResultsAdapter"}}{{/crossLink}}, {{#crossLink "MergeStrategy"}}{{/crossLink}} or {{#crossLink "FetchStrategy"}}{{/crossLink}} applied.
  @example
      // 'using' can be used to return a new query with a specified EntityManager.
      var em = new EntityManager(serviceName);
      var query = new EntityQuery("Orders")
        .using(em);
  or with a specified {{#crossLink "MergeStrategy"}}{{/crossLink}}
  @example
      var em = new EntityManager(serviceName);
      var query = new EntityQuery("Orders")
        .using(MergeStrategy.PreserveChanges);
  or with a specified {{#crossLink "FetchStrategy"}}{{/crossLink}}
  @example
      var em = new EntityManager(serviceName);
      var query = new EntityQuery("Orders")
        .using(FetchStrategy.FromLocalCache);
  
  @method using
  @param obj {EntityManager|QueryOptions|DataService|MergeStrategy|FetchStrategy|JsonResultsAdapter|config object} The object to update in creating a new EntityQuery from an existing one.
  @return {EntityQuery}
  @chainable
  **/
  proto.using = function (obj) {
    if (!obj) return this;
    var eq = clone(this);
    processUsing(eq, {
      entityManager: null,
      dataService: null,
      queryOptions: null,
      fetchStrategy: function (eq, val) {
        eq.queryOptions = (eq.queryOptions || new QueryOptions()).using(val)
      },
      mergeStrategy: function (eq, val) {
        eq.queryOptions = (eq.queryOptions || new QueryOptions()).using(val)
      },
      jsonResultsAdapter: function (eq, val) {
        eq.dataService = (eq.dataService || new DataService()).using({ jsonResultsAdapter: val })
      }
    }, obj);
    return eq;
  };
  
  /**
  Executes this query.  This method requires that an EntityManager has been previously specified via the "using" method.
  @example
  This method can be called using a 'promises' syntax ( recommended)
  @example
      var em = new EntityManager(serviceName);
      var query = new EntityQuery("Orders").using(em);
      query.execute().then( function(data) {
          ... query results processed here
      }).fail( function(err) {
          ... query failure processed here
      });
  or with callbacks
  @example
      var em = new EntityManager(serviceName);
      var query = new EntityQuery("Orders").using(em);
      query.execute(
        function(data) {
                    var orders = data.results;
                    ... query results processed here
                },
        function(err) {
                    ... query failure processed here
                });
  Either way this method is the same as calling the EntityManager 'execute' method.
  @example
      var em = new EntityManager(serviceName);
      var query = new EntityQuery("Orders");
      em.executeQuery(query).then( function(data) {
         var orders = data.results;
          ... query results processed here
      }).fail( function(err) {
         ... query failure processed here
      });

  @method execute
  @async

  @param callback {Function} Function called on success.

  successFunction([data])
  @param [callback.data] {Object}
  @param callback.data.results {Array of Entity}
  @param callback.data.query {EntityQuery} The original query
  @param callback.data.httpResponse {HttpResponse} The HttpResponse returned from the server.
  @param callback.data.inlineCount {Integer} Only available if 'inlineCount(true)' was applied to the query.  Returns the count of
  items that would have been returned by the query before applying any skip or take operators, but after any filter/where predicates
  would have been applied.
  @param callback.data.retrievedEntities {Array of Entity} All entities returned by the query.  Differs from results when .expand() is used.

  @param errorCallback {Function} Function called on failure.

  failureFunction([error])
  @param [errorCallback.error] {Error} Any error that occured wrapped into an Error object.
  @param [errorCallback.error.query] The query that caused the error.
  @param [errorCallback.error.httpResponse] {HttpResponse} The raw XMLHttpRequest returned from the server.

  @return {Promise}
  **/
  proto.execute = function (callback, errorCallback) {
    if (!this.entityManager) {
      throw new Error("An EntityQuery must have its EntityManager property set before calling 'execute'");
    }
    return this.entityManager.executeQuery(this, callback, errorCallback);
  };
  
  /**
  Executes this query against the local cache.  This method requires that an EntityManager have been previously specified via the "using" method.
  @example
      // assume em is an entityManager already filled with order entities;
      var query = new EntityQuery("Orders").using(em);
      var orders = query.executeLocally();

  Note that calling this method is the same as calling {{#crossLink "EntityManager/executeQueryLocally"}}{{/crossLink}}.

  @method executeLocally
  **/
  proto.executeLocally = function () {
    if (!this.entityManager) {
      throw new Error("An EntityQuery must have its EntityManager property set before calling 'executeLocally'");
    }
    return this.entityManager.executeQueryLocally(this);
  };
  
  proto.toJSON = function () {
    return this.toJSONExt();
  }
  
  proto.toJSONExt = function (context) {
    context = context || {};
    context.entityType = context.entityType || this.fromEntityType;
    context.propertyPathFn = context.toNameOnServer ? context.entityType.clientPropertyPathToServer.bind(context.entityType) : __identity;
    
    var that = this;
    
    var toJSONExtFn = function (v) {
      return v ? v.toJSONExt(context) : undefined;
    };
    return __toJson(this, {
      "from,resourceName": null,
      "toType,resultEntityType": function (v) {
        // resultEntityType can be either a string or an entityType
        return v ? (__isString(v) ? v : v.name) : undefined;
      },
      "where,wherePredicate": toJSONExtFn,
      "orderBy,orderByClause": toJSONExtFn,
      "select,selectClause": toJSONExtFn,
      "expand,expandClause": toJSONExtFn,
      "skip,skipCount": null,
      "take,takeCount": null,
      parameters: function (v) {
        return __isEmpty(v) ? undefined : v;
      },
      "inlineCount,inlineCountEnabled": false,
      "noTracking,noTrackingEnabled": false,
      queryOptions: null
    });

  }
  
  function fromJSON(eq, json) {
    __toJson(json, {
      "resourceName,from": null,
      // just the name comes back and will be resolved later
      "resultEntityType,toType": null,
      "wherePredicate,where": function (v) {
        return v ? new Predicate(v) : undefined;
      },
      "orderByClause,orderBy": function (v) {
        return v ? new OrderByClause(v) : undefined;
      },
      "selectClause,select": function (v) {
        return v ? new SelectClause(v) : undefined;
      },
      "expandClause,expand": function (v) {
        return v ? new ExpandClause(v) : undefined;
      },
      "skipCount,skip": null,
      "takeCount,take": null,
      parameters: function (v) {
        return __isEmpty(v) ? undefined : v;
      },
      "inlineCountEnabled,inlineCount": false,
      "noTrackingEnabled,noTracking": false,
      queryOptions: function (v) {
        return v ? QueryOptions.fromJSON(v) : undefined;
      }
    }, eq);
    return eq;
  }
  
  /**
  Static method that creates an EntityQuery that will allow 'requerying' an entity or a collection of entities by primary key. This can be useful
  to force a requery of selected entities, or to restrict an existing collection of entities according to some filter.

  Works for a single entity or an array of entities of the SAME type.
  Does not work for an array of entities of different types.

  @example
      // assuming 'customers' is an array of 'Customer' entities retrieved earlier.
      var customersQuery = EntityQuery.fromEntities(customers);
  The resulting query can, of course, be extended
  @example
      // assuming 'customers' is an array of 'Customer' entities retrieved earlier.
      var customersQuery = EntityQuery.fromEntities(customers)
        .where("Region", FilterQueryOp.NotEquals, null);
  Single entities can requeried as well.
  @example
      // assuming 'customer' is a 'Customer' entity retrieved earlier.
      var customerQuery = EntityQuery.fromEntities(customer);
  will create a query that will return an array containing a single customer entity.
  @method fromEntities
  @static
  @param entities {Entity|Array of Entity} The entities for which we want to create an EntityQuery.
  @return {EntityQuery}
  @chainable
  **/
  ctor.fromEntities = function (entities) {
    assertParam(entities, "entities").isEntity().or().isNonEmptyArray().isEntity().check();
    if (!Array.isArray(entities)) {
      entities = __arraySlice(arguments);
    }
    var firstEntity = entities[0];
    var type = firstEntity.entityType;
    if (entities.some(function(e){
      return e.entityType !== type;
    })) {
      throw new Error("All 'fromEntities' must be the same type; at least one is not of type " +
        type.name);
    }
    var q = new EntityQuery(type.defaultResourceName);
    var preds = entities.map(function (entity) {
      return buildPredicate(entity);
    });
    var pred = Predicate.or(preds);
    q = q.where(pred);
    var em = firstEntity.entityAspect.entityManager;
    if (em) {
      q = q.using(em);
    }
    return q;
  };
  
  /**
  Creates an EntityQuery for the specified {{#crossLink "EntityKey"}}{{/crossLink}}.
  @example
      var empType = metadataStore.getEntityType("Employee");
      var entityKey = new EntityKey(empType, 1);
      var query = EntityQuery.fromEntityKey(entityKey);
  or
  @example
      // 'employee' is a previously queried employee
      var entityKey = employee.entityAspect.getKey();
      var query = EntityQuery.fromEntityKey(entityKey);
  @method fromEntityKey
  @static
  @param entityKey {EntityKey} The {{#crossLink "EntityKey"}}{{/crossLink}} for which a query will be created.
  @return {EntityQuery}
  @chainable
  **/
  ctor.fromEntityKey = function (entityKey) {
    assertParam(entityKey, "entityKey").isInstanceOf(EntityKey).check();
    var q = new EntityQuery(entityKey.entityType.defaultResourceName);
    var pred = buildKeyPredicate(entityKey);
    q = q.where(pred).toType(entityKey.entityType);
    return q;
  };
  
  /**
  Creates an EntityQuery for the specified entity and {{#crossLink "NavigationProperty"}}{{/crossLink}}.
  @example
      // 'employee' is a previously queried employee
      var ordersNavProp = employee.entityType.getProperty("Orders");
      var query = EntityQuery.fromEntityNavigation(employee, ordersNavProp);
  will return a query for the "Orders" of the specified 'employee'.
  @method fromEntityNavigation
  @static
  @param entity {Entity} The Entity whose navigation property will be queried.
  @param navigationProperty {NavigationProperty|String} The {{#crossLink "NavigationProperty"}}{{/crossLink}} or name of the NavigationProperty to be queried.
  @return {EntityQuery}
  @chainable
  **/
  ctor.fromEntityNavigation = function (entity, navigationProperty) {
    assertParam(entity, "entity").isEntity().check();
    var navProperty = entity.entityType._checkNavProperty(navigationProperty);
    var q = new EntityQuery(navProperty.entityType.defaultResourceName);
    var pred = buildNavigationPredicate(entity, navProperty);
    q = q.where(pred);
    var em = entity.entityAspect.entityManager;
    return em ? q.using(em) : q;
  };
  
  // protected methods
  
  proto._getFromEntityType = function (metadataStore, throwErrorIfNotFound) {
    // Uncomment next two lines if we make this method public.
    // assertParam(metadataStore, "metadataStore").isInstanceOf(MetadataStore).check();
    // assertParam(throwErrorIfNotFound, "throwErrorIfNotFound").isBoolean().isOptional().check();
    var entityType = this.fromEntityType;
    if (entityType) return entityType;
    
    var resourceName = this.resourceName;
    if (!resourceName) {
      throw new Error("There is no resourceName for this query");
    }
    
    if (metadataStore.isEmpty()) {
      if (throwErrorIfNotFound) {
        throw new Error("There is no metadata available for this query. " +
            "Are you querying the local cache before you've fetched metadata?");
      } else {
        return null;
      }
    }
    
    var entityTypeName = metadataStore.getEntityTypeNameForResourceName(resourceName);
    if (entityTypeName) {
      entityType = metadataStore._getEntityType(entityTypeName);
    } else {
      entityType = this._getToEntityType(metadataStore, true);
    }
    
    if (!entityType) {
      if (throwErrorIfNotFound) {
        throw new Error(__formatString("Cannot find an entityType for resourceName: '%1'. " 
            + " Consider adding an 'EntityQuery.toType' call to your query or " 
            + "calling the MetadataStore.setEntityTypeForResourceName method to register an entityType for this resourceName.", resourceName));
      } else {
        return null;
      }
    }
    
    this.fromEntityType = entityType;
    return entityType;

  };
  
  proto._getToEntityType = function (metadataStore, skipFromCheck) {
    // skipFromCheck is to avoid recursion if called from _getFromEntityType;
    if (this.resultEntityType instanceof EntityType) {
      return this.resultEntityType;
    } else if (this.resultEntityType) {
      // resultEntityType is a string
      this.resultEntityType = metadataStore._getEntityType(this.resultEntityType, false);
      return this.resultEntityType;
    } else {
      // resolve it, if possible, via the resourceName
      // do not cache this value in this case
      // cannot determine the resultEntityType if a selectClause is present.
      return skipFromCheck ? null : (!this.selectClause) && this._getFromEntityType(metadataStore, false);
    }
  };
  
  // for testing
  proto._toUri = function (em) {
    var ds = DataService.resolve([em.dataService]);
    return ds.uriBuilder.buildUri(this, em.metadataStore);
  }
  
  // private functions
  
  function clone(that, propName, value) {
    // immutable queries mean that we don't need to clone if no change in value.
    if (propName) {
      if (that[propName] === value) return that;
    }
    // copying QueryOptions is safe because they are are immutable;
    var copy = __extend(new EntityQuery(), that, [
      "resourceName",
      "fromEntityType",
      "wherePredicate",
      "orderByClause",
      "selectClause",
      "skipCount",
      "takeCount",
      "expandClause",
      "inlineCountEnabled",
      "noTrackingEnabled",
      "usesNameOnServer",
      "queryOptions",
      "entityManager",
      "dataService",
      "resultEntityType"
    ]);
    copy.parameters = __extend({}, that.parameters);
    if (propName) {
      copy[propName] = value;
    }
    return copy;
  }
  
  function processUsing(eq, map, value, propertyName) {
    var typeName = value._$typeName || (value.parentEnum && value.parentEnum.name);
    var key = typeName && typeName.substr(0, 1).toLowerCase() + typeName.substr(1);
    if (propertyName && key != propertyName) {
      throw new Error("Invalid value for property: " + propertyName);
    }
    if (key) {
      var fn = map[key];
      if (fn === undefined) {
        throw new Error("Invalid config property: " + key);
      } else if (fn === null) {
        eq[key] = value;
      } else {
        fn(eq, value);
      }
    } else {
      __objectForEach(value, function (propName, val) {
        processUsing(eq, map, val, propName)
      });
    }
  }
  
  function normalizePropertyPaths(propertyPaths) {
    assertParam(propertyPaths, "propertyPaths").isOptional().isString().or().isArray().isString().check();
    if (typeof propertyPaths === 'string') {
      propertyPaths = propertyPaths.split(",");
    }
    
    propertyPaths = propertyPaths.map(function (pp) {
      return pp.trim();
    });
    return propertyPaths;
  }
  
  function buildPredicate(entity) {
    var entityType = entity.entityType;
    var predParts = entityType.keyProperties.map(function (kp) {
      return Predicate.create(kp.name, FilterQueryOp.Equals, entity.getProperty(kp.name));
    });
    var pred = Predicate.and(predParts);
    return pred;
  }
  
  function buildKeyPredicate(entityKey) {
    var keyProps = entityKey.entityType.keyProperties;
    var preds = __arrayZip(keyProps, entityKey.values, function (kp, v) {
      return Predicate.create(kp.name, FilterQueryOp.Equals, v);
    });
    var pred = Predicate.and(preds);
    return pred;
  }
  
  function buildNavigationPredicate(entity, navigationProperty) {
    if (navigationProperty.isScalar) {
      if (navigationProperty.foreignKeyNames.length === 0) return null;
      var relatedKeyValues = navigationProperty.foreignKeyNames.map(function (fkName) {
        return entity.getProperty(fkName);
      });
      var entityKey = new EntityKey(navigationProperty.entityType, relatedKeyValues);
      return buildKeyPredicate(entityKey);
    } else {
      var inverseNp = navigationProperty.inverse;
      var foreignKeyNames = inverseNp ? inverseNp.foreignKeyNames : navigationProperty.invForeignKeyNames;
      if (foreignKeyNames.length === 0) return null;
      var keyValues = entity.entityAspect.getKey().values;
      var predParts = __arrayZip(foreignKeyNames, keyValues, function (fkName, kv) {
        return Predicate.create(fkName, FilterQueryOp.Equals, kv);
      });
      return Predicate.and(predParts);
    }
  }
  
  return ctor;
})();

var FilterQueryOp = (function () {
  /**
   FilterQueryOp is an 'Enum' containing all of the valid  {{#crossLink "Predicate"}}{{/crossLink}}
   filter operators for an {{#crossLink "EntityQuery"}}{{/crossLink}}.

   @class FilterQueryOp
   @static
   **/
  var aEnum = new Enum("FilterQueryOp");
  /**
   Aliases: "eq", "=="
   @property Equals {FilterQueryOp}
   @final
   @static
   **/
  aEnum.Equals = aEnum.addSymbol({ operator: "eq" });
  /**
   Aliases: "ne", "!="
   @property NotEquals {FilterQueryOp}
   @final
   @static
   **/
  aEnum.NotEquals = aEnum.addSymbol({ operator: "ne" });
  /**
   Aliases: "gt", ">"
   @property GreaterThan {FilterQueryOp}
   @final
   @static
   **/
  aEnum.GreaterThan = aEnum.addSymbol({ operator: "gt" });
  /**
   Aliases: "lt", "<"
   @property LessThan {FilterQueryOp}
   @final
   @static
   **/
  aEnum.LessThan = aEnum.addSymbol({ operator: "lt" });
  /**
   Aliases: "ge", ">="
   @property GreaterThanOrEqual {FilterQueryOp}
   @final
   @static
   **/
  aEnum.GreaterThanOrEqual = aEnum.addSymbol({ operator: "ge" });
  /**
   Aliases: "le", "<="
   @property LessThanOrEqual {FilterQueryOp}
   @final
   @static
   **/
  aEnum.LessThanOrEqual = aEnum.addSymbol({ operator: "le" });
  /**
   String operation: Is a string a substring of another string.
   Aliases: "substringof"
   @property Contains {FilterQueryOp}
   @final
   @static
   **/
  aEnum.Contains = aEnum.addSymbol({ operator: "contains" });
  /**
   @property StartsWith {FilterQueryOp}
   @final
   @static
   **/
  aEnum.StartsWith = aEnum.addSymbol({ operator: "startswith" });
  /**
   @property EndsWith {FilterQueryOp}
   @final
   @static
   **/
  aEnum.EndsWith = aEnum.addSymbol({ operator: "endswith" });
  
  /**
   Aliases: "some"
   @property Any {FilterQueryOp}
   @final
   @static
   **/
  aEnum.Any = aEnum.addSymbol({ operator: "any" });
  
  /**
   Aliases: "every"
   @property All {FilterQueryOp}
   @final
   @static
   **/
  aEnum.All = aEnum.addSymbol({ operator: "all" });
  
  aEnum.IsTypeOf = aEnum.addSymbol({ operator: "isof" });
  
  aEnum.resolveSymbols();

  return aEnum;
})();

var BooleanQueryOp = (function () {
  var aEnum = new Enum("BooleanQueryOp");
  aEnum.And = aEnum.addSymbol({ operator: "and" });
  aEnum.Or = aEnum.addSymbol({ operator: "or" });
  aEnum.Not = aEnum.addSymbol({ operator: "not" });
  
  aEnum.resolveSymbols();

  return aEnum;
})();

/*
 An OrderByClause is a description of the properties and direction that the result
 of a query should be sorted in.  OrderByClauses are immutable, which means that any
 method that would modify an OrderByClause actually returns a new OrderByClause.

 For example for an Employee object with properties of 'Company' and 'LastName' the following would be valid expressions:

 var obc = new OrderByClause("Company.CompanyName, LastName")
 or
 var obc = new OrderByClause("Company.CompanyName desc, LastName")
 or
 var obc = new OrderByClause("Company.CompanyName, LastName", true);
 @class OrderByClause
 */
var OrderByClause = (function () {
  
  var ctor = function (propertyPaths, isDesc) {

    if (propertyPaths.length > 1) {
      // you can also pass in an array of orderByClauses
      if (propertyPaths[0] instanceof OrderByClause) {
        this.items = Array.prototype.concat.apply(propertyPaths[0].items, propertyPaths.slice(1).map(__pluck("items")) );
        return;
      }
      var items = propertyPaths.map(function (pp) {
        return new OrderByItem(pp, isDesc);
      });
    } else {
      var items = [new OrderByItem(propertyPaths[0], isDesc)];
    }
    this.items = items;
  };
  var proto = ctor.prototype;
  
  proto.validate = function (entityType) {
    if (entityType == null || entityType.isAnonymous) return;
    this.items.forEach(function (item) {
      item.validate(entityType)
    });
  };


  
  proto.getComparer = function (entityType) {
    var orderByFuncs = this.items.map(function (obc) {
      return obc.getComparer(entityType);
    });
    return function (entity1, entity2) {
      for (var i = 0; i < orderByFuncs.length; i++) {
        var result = orderByFuncs[i](entity1, entity2);
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    };
  };
  
  proto.toJSONExt = function (context) {
    return this.items.map(function (item) {
      return context.propertyPathFn(item.propertyPath) + (item.isDesc ? " desc" : "");
    });
  };
  
  var OrderByItem = function (propertyPath, isDesc) {
    if (!(typeof propertyPath === 'string')) {
      throw new Error("propertyPath is not a string");
    }
    propertyPath = propertyPath.trim();
    
    var parts = propertyPath.split(' ');
    // parts[0] is the propertyPath; [1] would be whether descending or not.
    if (parts.length > 1 && isDesc !== true && isDesc !== false) {
      isDesc = __stringStartsWith(parts[1].toLowerCase(), "desc");
      if (!isDesc) {
        // isDesc is false but check to make sure its intended.
        var isAsc = __stringStartsWith(parts[1].toLowerCase(), "asc");
        if (!isAsc) {
          throw new Error("the second word in the propertyPath must begin with 'desc' or 'asc'");
        }

      }
    }
    this.propertyPath = parts[0];
    this.isDesc = isDesc;
  };
  
  var itemProto = OrderByItem.prototype;
  
  itemProto.validate = function (entityType) {
    if (entityType == null || entityType.isAnonymous) return;
    // will throw an exception on bad propertyPath
    this.lastProperty = entityType.getProperty(this.propertyPath, true);
  };
  
  itemProto.getComparer = function (entityType) {
    if (!this.lastProperty) this.validate(entityType);
    if (this.lastProperty) {
      var propDataType = this.lastProperty.dataType;
      var isCaseSensitive = this.lastProperty.parentType.metadataStore.localQueryComparisonOptions.isCaseSensitive;
    }
    var propertyPath = this.propertyPath;
    var isDesc = this.isDesc;
    
    return function (entity1, entity2) {
      var value1 = getPropertyPathValue(entity1, propertyPath);
      var value2 = getPropertyPathValue(entity2, propertyPath);
      var dataType = propDataType || (value1 && DataType.fromValue(value1)) || DataType.fromValue(value2);
      if (dataType === DataType.String) {
        if (isCaseSensitive) {
          value1 = value1 || "";
          value2 = value2 || "";
        } else {
          value1 = (value1 || "").toLowerCase();
          value2 = (value2 || "").toLowerCase();
        }
      } else {
        var normalize = DataType.getComparableFn(dataType);
        value1 = normalize(value1);
        value2 = normalize(value2);
      }
      if (value1 === value2) {
        return 0;
      } else if (value1 > value2 || value2 === undefined) {
        return isDesc ? -1 : 1;
      } else {
        return isDesc ? 1 : -1;
      }
    };
  };
  
  return ctor;
})();

// Not exposed
var SelectClause = (function () {
  
  var ctor = function (propertyPaths) {
    this.propertyPaths = propertyPaths;
    this._pathNames = propertyPaths.map(function (pp) {
      return pp.replace(".", "_");
    });
  };
  var proto = ctor.prototype;
  
  proto.validate = function (entityType) {
    if (entityType == null || entityType.isAnonymous) return; // can't validate yet
    // will throw an exception on bad propertyPath
    this.propertyPaths.forEach(function (path) {
      entityType.getProperty(path, true);
    });
  };
  
  proto.toFunction = function (/* config */) {
    var that = this;
    return function (entity) {
      var result = {};
      that.propertyPaths.forEach(function (path, i) {
        result[that._pathNames[i]] = getPropertyPathValue(entity, path);
      });
      return result;
    };
  };
  
  proto.toJSONExt = function (context) {
    return this.propertyPaths.map(function (pp) {
      return context.propertyPathFn(pp);
    })
  };
  
  return ctor;
})();

// Not exposed
var ExpandClause = (function () {
  
  // propertyPaths is an array of strings.
  var ctor = function (propertyPaths) {
    this.propertyPaths = propertyPaths;
  };
  var proto = ctor.prototype;
  
  proto.toJSONExt = function (context) {
    return this.propertyPaths.map(function (pp) {
      return context.propertyPathFn(pp);
    })
  };
  
  return ctor;
})();

// used by EntityQuery and Predicate
function getPropertyPathValue(obj, propertyPath) {
  var properties = Array.isArray(propertyPath) ? propertyPath : propertyPath.split(".");
  if (properties.length === 1) {
    return obj.getProperty(propertyPath);
  } else {
    var nextValue = obj;
    // hack use of some to perform mapFirst operation.
    properties.some(function (prop) {
      nextValue = nextValue.getProperty(prop);
      return nextValue == null;
    });
    return nextValue;
  }
}

// expose
breeze.FilterQueryOp = FilterQueryOp;
breeze.EntityQuery = EntityQuery;

// Not documented - only exposed for testing purposes
breeze.OrderByClause = OrderByClause;

;/**
@module breeze
**/

var MergeStrategy = (function () {
  /**
  MergeStrategy is an 'Enum' that determines how entities are merged into an EntityManager.

  @class MergeStrategy
  @static
  **/
  var MergeStrategy = new Enum("MergeStrategy");
  /**
  MergeStrategy.PreserveChanges updates the cached entity with the incoming values unless the cached entity is in a changed
  state (added, modified, deleted) in which case the incoming values are ignored. The updated cached entity’s EntityState will
  remain {{#crossLink "EntityState/Unchanged"}}{{/crossLink}} unless you’re importing entities in which case the new EntityState will
  be that of the imported entities.

  @property PreserveChanges {MergeStrategy}
  @final
  @static
  **/
  MergeStrategy.PreserveChanges = MergeStrategy.addSymbol();
  /**
  MergeStrategy.OverwriteChanges always updates the cached entity with incoming values even if the entity is in
  a changed state (added, modified, deleted). After the merge, the pending changes are lost.
  The new EntityState will be  {{#crossLink "EntityState/Unchanged"}}{{/crossLink}} unless you’re importing entities
  in which case the new EntityState will be that of the imported entities.

  @property OverwriteChanges {MergeStrategy}
  @final
  @static
  **/
  MergeStrategy.OverwriteChanges = MergeStrategy.addSymbol();

  /**
  SkipMerge is used to ignore incoming values. Adds the incoming entity to the cache only if there is no cached entity with the same key.
  This is the fastest merge strategy but your existing cached data will remain “stale”.

  @property SkipMerge {MergeStrategy}
  @final
  @static
  **/
  MergeStrategy.SkipMerge = MergeStrategy.addSymbol();

  /**
  Disallowed is used to throw an exception if there is an incoming entity with the same key as an entity already in the cache.
  Use this strategy when you want to be sure that the incoming entity is not already in cache.
  This is the default strategy for EntityManager.attachEntity.

  @property Disallowed {MergeStrategy}
  @final
  @static
  **/
  MergeStrategy.Disallowed = MergeStrategy.addSymbol();
  MergeStrategy.resolveSymbols();
  return MergeStrategy;
})();

var FetchStrategy = (function () {
  /**
  FetchStrategy is an 'Enum' that determines how and where entities are retrieved from as a result of a query.

  @class FetchStrategy
  @static
  **/
  var FetchStrategy = new Enum("FetchStrategy");
  /**
  FromServer is used to tell the query to execute the query against a remote data source on the server.
  @property FromServer {MergeStrategy}
  @final
  @static
  **/
  FetchStrategy.FromServer = FetchStrategy.addSymbol();
  /**
  FromLocalCache is used to tell the query to execute the query against a local EntityManager instead of going to a remote server.
  @property FromLocalCache {MergeStrategy}
  @final
  @static
  **/
  FetchStrategy.FromLocalCache = FetchStrategy.addSymbol();
  FetchStrategy.resolveSymbols();
  return FetchStrategy;
})();

var QueryOptions = (function () {
  /**
  A QueryOptions instance is used to specify the 'options' under which a query will occur.

  @class QueryOptions
  **/

  /**
  QueryOptions constructor
  @example
      var newQo = new QueryOptions( { mergeStrategy: MergeStrategy.OverwriteChanges });
      // assume em1 is a preexisting EntityManager
      em1.setProperties( { queryOptions: newQo });

  Any QueryOptions property that is not defined will be defaulted from any QueryOptions defined at a higher level in the breeze hierarchy, i.e.
  -  from query.queryOptions
  -  to   entityManager.queryOptions
  -  to   QueryOptions.defaultInstance;

  @method <ctor> QueryOptions
  @param [config] {Object}
  @param [config.fetchStrategy] {FetchStrategy}
  @param [config.mergeStrategy] {MergeStrategy}
  @param [config.includeDeleted] {Boolean} Whether query should return cached deleted entities (false by default)
  **/
  var ctor = function QueryOptions(config) {
    updateWithConfig(this, config);
  };
  var proto = ctor.prototype;
  proto._$typeName = "QueryOptions";

  /**
  A {{#crossLink "FetchStrategy"}}{{/crossLink}}
  __readOnly__
  @property fetchStrategy {FetchStrategy}
  **/

  /**
  A {{#crossLink "MergeStrategy"}}{{/crossLink}}
  __readOnly__
  @property mergeStrategy {MergeStrategy}
  **/

  /**
  Whether to include cached deleted entities in a query result (false by default).

  __readOnly__
  @property includeDeleted {Boolean}
  **/

  ctor.resolve = function (queryOptionsArray) {
    return new QueryOptions(__resolveProperties(queryOptionsArray, ["fetchStrategy", "mergeStrategy", "includeDeleted"]));
  };

  /**
  The default value whenever QueryOptions are not specified.
  @property defaultInstance {QueryOptions}
  @static
  **/
  ctor.defaultInstance = new ctor({
    fetchStrategy: FetchStrategy.FromServer,
    mergeStrategy: MergeStrategy.PreserveChanges,
    includeDeleted: false
  });

  /**
  Returns a copy of this QueryOptions with the specified {{#crossLink "MergeStrategy"}}{{/crossLink}},
  {{#crossLink "FetchStrategy"}}{{/crossLink}}, or 'includeDeleted' option applied.
  @example
      // Given an EntityManager instance, em
      var queryOptions = em.queryOptions.using(MergeStrategy.PreserveChanges);
  or
  @example
      var queryOptions = em.queryOptions.using(FetchStrategy.FromLocalCache);
  or
  @example
      var queryOptions = em.queryOptions.using({ mergeStrategy: MergeStrategy.OverwriteChanges });
  or
  @example
      var queryOptions = em.queryOptions.using({
          includeDeleted: true,
          fetchStrategy:  FetchStrategy.FromLocalCache 
      });
  @method using
  @param config {Configuration Object|MergeStrategy|FetchStrategy} The object to apply to create a new QueryOptions.
  @return {QueryOptions}
  @chainable
  **/
  proto.using = function (config) {
    if (!config) return this;
    var result = new QueryOptions(this);
    if (MergeStrategy.contains(config)) {
      config = { mergeStrategy: config };
    } else if (FetchStrategy.contains(config)) {
      config = { fetchStrategy: config };
    }
    return updateWithConfig(result, config);
  };

  /**
  Sets the 'defaultInstance' by creating a copy of the current 'defaultInstance' and then applying all of the properties of the current instance.
  The current instance is returned unchanged.
  @method setAsDefault
  @example
      var newQo = new QueryOptions( { mergeStrategy: MergeStrategy.OverwriteChanges });
      newQo.setAsDefault();
  @chainable
  **/
  proto.setAsDefault = function () {
    return __setAsDefault(this, ctor);
  };

  proto.toJSON = function () {
    return __toJson(this, {
      fetchStrategy: null,
      mergeStrategy: null,
      includeDeleted: false
    });
  };

  ctor.fromJSON = function (json) {
    return new QueryOptions({
      fetchStrategy: FetchStrategy.fromName(json.fetchStrategy),
      mergeStrategy: MergeStrategy.fromName(json.mergeStrategy),
      includeDeleted: json.includeDeleted === true
    });
  };

  function updateWithConfig(obj, config) {
    if (config) {
      assertConfig(config)
          .whereParam("fetchStrategy").isEnumOf(FetchStrategy).isOptional()
          .whereParam("mergeStrategy").isEnumOf(MergeStrategy).isOptional()
          .whereParam("includeDeleted").isBoolean().isOptional()
          .applyAll(obj);
    }
    return obj;
  }

  return ctor;
})();

breeze.QueryOptions = QueryOptions;
breeze.FetchStrategy = FetchStrategy;
breeze.MergeStrategy = MergeStrategy;


;/**
 @module breeze
 **/

var EntityGroup = (function () {

  var ctor = function EntityGroup(entityManager, entityType) {
    this.entityManager = entityManager;
    this.entityType = entityType;
    // freeze the entityType after the first instance of this type is either created or queried.
    this.entityType.isFrozen = true;
    this._indexMap = {};
    this._entities = [];
    this._emptyIndexes = [];
  };
  var proto = ctor.prototype;

  proto.attachEntity = function (entity, entityState, mergeStrategy) {
    // entity should already have an aspect.
    var aspect = entity.entityAspect;

    if (!aspect._initialized) {
      this.entityType._initializeInstance(entity);
    }
    delete aspect._initialized;

    var keyInGroup = aspect.getKey()._keyInGroup;
    var ix = this._indexMap[keyInGroup];
    if (ix >= 0) {
      var targetEntity = this._entities[ix];
      var targetEntityState = targetEntity.entityAspect.entityState;
      var wasUnchanged = targetEntityState.isUnchanged();
      if (targetEntity === entity) {
        aspect.entityState = entityState;
      } else if (mergeStrategy === MergeStrategy.Disallowed) {
        throw new Error("A MergeStrategy of 'Disallowed' does not allow you to attach an entity when an entity with the same key is already attached: " + aspect.getKey());
      } else if (mergeStrategy === MergeStrategy.OverwriteChanges || (mergeStrategy === MergeStrategy.PreserveChanges && wasUnchanged)) {
        // unwrapInstance returns an entity with server side property names - so we need to use DataProperty.getRawValueFromServer these when we apply
        // the property values back to the target.
        var rawServerEntity = this.entityManager.helper.unwrapInstance(entity);
        this.entityType._updateTargetFromRaw(targetEntity, rawServerEntity, DataProperty.getRawValueFromServer);
        targetEntity.entityAspect.setEntityState(entityState);
      }
      return targetEntity;
    } else {
      if (this._emptyIndexes.length === 0) {
        ix = this._entities.push(entity) - 1;
      } else {
        ix = this._emptyIndexes.pop();
        this._entities[ix] = entity;
      }
      this._indexMap[keyInGroup] = ix;
      aspect.entityState = entityState;
      aspect.entityGroup = this;
      aspect.entityManager = this.entityManager;
      return entity;
    }
  };

  proto.detachEntity = function (entity) {
    // by this point we have already determined that this entity
    // belongs to this group.
    var aspect = entity.entityAspect;
    var keyInGroup = aspect.getKey()._keyInGroup;
    var ix = this._indexMap[keyInGroup];
    if (ix === undefined) {
      // shouldn't happen.
      throw new Error("internal error - entity cannot be found in group");
    }
    delete this._indexMap[keyInGroup];
    this._emptyIndexes.push(ix);
    this._entities[ix] = null;
    return entity;
  };


  // returns entity based on an entity key defined either as an array of key values or an EntityKey
  proto.findEntityByKey = function (entityKey) {
    var keyInGroup;
    if (entityKey instanceof EntityKey) {
      keyInGroup = entityKey._keyInGroup;
    } else {
      keyInGroup = EntityKey.createKeyString(entityKey);
    }
    var ix = this._indexMap[keyInGroup];
    // can't use just (ix) below because 0 is valid
    return (ix !== undefined) ? this._entities[ix] : null;
  };

  proto.hasChanges = function () {
    var entities = this._entities;
    var unchanged = EntityState.Unchanged;
    for (var i = 0, len = entities.length; i < len; i++){
      var e = entities[i];
      if (e && e.entityAspect.entityState !== unchanged){
        return true;
      }
    }
    return false;
  };

  proto.getChanges = function () {
    var entities = this._entities;
    var unchanged = EntityState.Unchanged;
    var changes = [];
    for (var i = 0, len = entities.length; i < len; i++){
      var e = entities[i];
      if (e && e.entityAspect.entityState !== unchanged){
        changes.push(e);
      }
    }
    return changes;
  };

  proto.getEntities = function (entityStates) {
    var filter = getFilter(entityStates);
    return this._entities.filter(filter);
  };

  proto._checkOperation = function(operationName) {
    this._entities.forEach(function (entity) {
      entity && entity.entityAspect._checkOperation(operationName);
    });
    // for chaining;
    return this;
  };

  // do not expose this method. It is doing a special purpose INCOMPLETE fast detach operation
  // just for the entityManager clear method - the entityGroup will be in an inconsistent state
  // after this op, which is ok because it will be thrown away.
  proto._clear = function () {
    this._entities.forEach(function (entity) {
      if (entity != null) {
        entity.entityAspect._detach();
      }
    });
    this._entities = null;
    this._indexMap = null;
    this._emptyIndexes = null;
  };

  proto._updateFkVal = function (fkProp, oldValue, newValue) {
    var fkPropName = fkProp.name;
    this._entities.forEach(function (entity) {
      if (entity != null) {
        if (entity.getProperty(fkPropName) == oldValue) {
          entity.setProperty(fkPropName, newValue);
        }
      }
    });
  }

  proto._fixupKey = function (tempValue, realValue) {
    // single part keys appear directly in map
    var ix = this._indexMap[tempValue];
    if (ix === undefined) {
      throw new Error("Internal Error in key fixup - unable to locate entity");
    }
    var entity = this._entities[ix];
    var keyPropName = entity.entityType.keyProperties[0].name;
    // fks on related entities will automatically get updated by this as well
    entity.setProperty(keyPropName, realValue);
    delete entity.entityAspect.hasTempKey;
    delete this._indexMap[tempValue];
    this._indexMap[realValue] = ix;
  };

  proto._replaceKey = function (oldKey, newKey) {
    var ix = this._indexMap[oldKey._keyInGroup];
    delete this._indexMap[oldKey._keyInGroup];
    this._indexMap[newKey._keyInGroup] = ix;
  };

  function getFilter(entityStates) {
    if (!entityStates) {
      return function (e) {
        return !!e;
      };
    } else if (entityStates.length === 1) {
      var entityState = entityStates[0];
      return function (e) {
        return !!e && e.entityAspect.entityState === entityState;
      };
    } else {
      return function (e) {
        return !!e && -1 !== entityStates.indexOf(e.entityAspect.entityState);
      };
    }
  }

  return ctor;

})();

// do not expose EntityGroup - internal only


;/**
@module breeze
**/

var EntityManager = (function () {
  /**
  Instances of the EntityManager contain and manage collections of entities, either retrieved from a backend datastore or created on the client.
  @class EntityManager
  **/

  /**
  At its most basic an EntityManager can be constructed with just a service name
  @example
      var entityManager = new EntityManager( "breeze/NorthwindIBModel");
  This is the same as calling it with the following configuration object
  @example
      var entityManager = new EntityManager( {serviceName: "breeze/NorthwindIBModel" });
  Usually however, configuration objects will contain more than just the 'serviceName';
  @example
      var metadataStore = new MetadataStore();
      var entityManager = new EntityManager( {
          serviceName: "breeze/NorthwindIBModel",
          metadataStore: metadataStore
      });
  or
  @example
      return new QueryOptions({
          mergeStrategy: obj,
          fetchStrategy: this.fetchStrategy
      });
      var queryOptions = new QueryOptions({
          mergeStrategy: MergeStrategy.OverwriteChanges,
          fetchStrategy: FetchStrategy.FromServer
      });
      var validationOptions = new ValidationOptions({
          validateOnAttach: true,
          validateOnSave: true,
          validateOnQuery: false
      });
      var entityManager = new EntityManager({
          serviceName: "breeze/NorthwindIBModel",
          queryOptions: queryOptions,
          validationOptions: validationOptions
      });
  @method <ctor> EntityManager
  @param [config] {Object|String} Configuration settings or a service name.
  @param [config.serviceName] {String}
  @param [config.dataService] {DataService} An entire DataService (instead of just the serviceName above).
  @param [config.metadataStore=MetadataStore.defaultInstance] {MetadataStore}
  @param [config.queryOptions] {QueryOptions}
  @param [config.saveOptions] {SaveOptions}
  @param [config.validationOptions=ValidationOptions.defaultInstance] {ValidationOptions}
  @param [config.keyGeneratorCtor] {Function}
  **/
  var ctor = function EntityManager(config) {

    if (arguments.length > 1) {
      throw new Error("The EntityManager ctor has a single optional argument that is either a 'serviceName' or a configuration object.");
    }
    if (arguments.length === 0) {
      config = { serviceName: "" };
    } else if (typeof config === 'string') {
      config = { serviceName: config };
    }

    updateWithConfig(this, config, true);

    this.entityChanged = new Event("entityChanged", this);
    this.validationErrorsChanged = new Event("validationErrorsChanged", this);
    this.hasChangesChanged = new Event("hasChangesChanged", this);

    this.clear();

  };

  var proto = ctor.prototype;
  proto._$typeName = "EntityManager";
  Event.bubbleEvent(proto, null);

  /**
  General purpose property set method.  Any of the properties documented below
  may be set.
  @example
      // assume em1 is a previously created EntityManager
      // where we want to change some of its settings.
      em1.setProperties( {
          serviceName: "breeze/foo"
      });
  @method setProperties
  @param config {Object}
  @param [config.serviceName] {String}
  @param [config.dataService] {DataService}
  @param [config.queryOptions] {QueryOptions}
  @param [config.saveOptions] {SaveOptions}
  @param [config.validationOptions] {ValidationOptions}
  @param [config.keyGeneratorCtor] {Function}
  **/
  proto.setProperties = function (config) {
    updateWithConfig(this, config, false);
  };

  function updateWithConfig(em, config, isCtor) {
    var defaultQueryOptions = isCtor ? QueryOptions.defaultInstance : em.queryOptions;
    var defaultSaveOptions = isCtor ? SaveOptions.defaultInstance : em.saveOptions;
    var defaultValidationOptions = isCtor ? ValidationOptions.defaultInstance : em.validationOptions;


    var configParam = assertConfig(config)
        .whereParam("serviceName").isOptional().isString()
        .whereParam("dataService").isOptional().isInstanceOf(DataService)
        .whereParam("queryOptions").isInstanceOf(QueryOptions).isOptional().withDefault(defaultQueryOptions)
        .whereParam("saveOptions").isInstanceOf(SaveOptions).isOptional().withDefault(defaultSaveOptions)
        .whereParam("validationOptions").isInstanceOf(ValidationOptions).isOptional().withDefault(defaultValidationOptions)
        .whereParam("keyGeneratorCtor").isFunction().isOptional();
    if (isCtor) {
      configParam = configParam
          .whereParam("metadataStore").isInstanceOf(MetadataStore).isOptional().withDefault(new MetadataStore());
    }
    configParam.applyAll(em);

    // insure that entityManager's options versions are completely populated
    __updateWithDefaults(em.queryOptions, defaultQueryOptions);
    __updateWithDefaults(em.saveOptions, defaultSaveOptions);
    __updateWithDefaults(em.validationOptions, defaultValidationOptions);

    if (config.serviceName) {
      em.dataService = new DataService({
        serviceName: em.serviceName
      });
    }
    em.serviceName = em.dataService && em.dataService.serviceName;

    em.keyGeneratorCtor = em.keyGeneratorCtor || KeyGenerator;
    if (isCtor || config.keyGeneratorCtor) {
      em.keyGenerator = new em.keyGeneratorCtor();
    }
  }

  /**
  The service name associated with this EntityManager.

  __readOnly__
  @property serviceName {String}
  **/

  /**
  The DataService name associated with this EntityManager.

  __readOnly__
  @property dataService {DataService}
  **/

  /**
  The {{#crossLink "MetadataStore"}}{{/crossLink}} associated with this EntityManager.

  __readOnly__
  @property metadataStore {MetadataStore}
  **/

  /**
  The {{#crossLink "QueryOptions"}}{{/crossLink}} associated with this EntityManager.

  __readOnly__
  @property queryOptions {QueryOptions}
  **/

  /**
  The {{#crossLink "SaveOptions"}}{{/crossLink}} associated with this EntityManager.

  __readOnly__
  @property saveOptions {SaveOptions}
  **/

  /**
  The {{#crossLink "ValidationOptions"}}{{/crossLink}} associated with this EntityManager.

  __readOnly__
  @property validationOptions {ValidationOptions}
  **/

  /**
  The {{#crossLink "KeyGenerator"}}{{/crossLink}} constructor associated with this EntityManager.

  __readOnly__
  @property keyGeneratorCtor {KeyGenerator constructor}
  **/


  // events
  /**
  An {{#crossLink "Event"}}{{/crossLink}} that fires whenever a change to any entity in this EntityManager occurs.
  @example
      var em = new EntityManager( {serviceName: "breeze/NorthwindIBModel" });
      em.entityChanged.subscribe(function(changeArgs) {
          // This code will be executed any time any entity within the entityManager is added, modified, deleted or detached for any reason.
          var action = changeArgs.entityAction;
          var entity = changeArgs.entity;
          // .. do something to this entity when it is changed.
      });
  });

  @event entityChanged
  @param entityAction {EntityAction} The {{#crossLink "EntityAction"}}{{/crossLink}} that occured.
  @param entity {Object} The entity that changed.  If this is null, then all entities in the entityManager were affected.
  @param args {Object} Additional information about this event. This will differ based on the entityAction.
  @readOnly
  **/

  /**
  An {{#crossLink "Event"}}{{/crossLink}} that fires whenever validationErrors change for any entity in this EntityManager.
  @example
      var em = new EntityManager( {serviceName: "breeze/NorthwindIBModel" });
      em.validationErrorsChanged.subscribe(function(changeArgs) {
              // This code will be executed any time any entity within the entityManager experiences a change to its validationErrors collection.
              function (validationChangeArgs) {
                  var entity == validationChangeArgs.entity;
                  var errorsAdded = validationChangeArgs.added;
                  var errorsCleared = validationChangeArgs.removed;
                  // ... do something interesting with the order.
              });
          });
      });
  @event validationErrorsChanged
  @param entity {Entity} The entity on which the validation errors have been added or removed.
  @param added {Array of ValidationError} An array containing any newly added {{#crossLink "ValidationError"}}{{/crossLink}}s
  @param removed {Array of ValidationError} An array containing any newly removed {{#crossLink "ValidationError"}}{{/crossLink}}s. This is those
  errors that have been 'fixed'
  @readOnly
  **/

  // class methods

  /**
  Creates a new entity of a specified type and optionally initializes it. By default the new entity is created with an EntityState of Added
  but you can also optionally specify an EntityState.  An EntityState of 'Detached' will insure that the entity is created but not yet added
  to the EntityManager.
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      // create and add an entity;
      var emp1 = em1.createEntity("Employee");
      // create and add an initialized entity;
      var emp2 = em1.createEntity("Employee", { lastName: Smith", firstName: "John" });
      // create and attach (not add) an initialized entity
      var emp3 = em1.createEntity("Employee", { id: 435, lastName: Smith", firstName: "John" }, EntityState.Unchanged);
      // create but don't attach an entity;
      var emp4 = em1.createEntity("Employee", { id: 435, lastName: Smith", firstName: "John" }, EntityState.Detached);

  @method createEntity
  @param entityType {String|EntityType} The EntityType or the name of the type for which an instance should be created.
  @param [initialValues=null] {Config object} - Configuration object of the properties to set immediately after creation.
  @param [entityState=EntityState.Added] {EntityState} - The EntityState of the entity after being created and added to this EntityManager.
  @param [mergeStrategy=MergeStrategy.Disallowed] {MergeStrategy} - How to handle conflicts if an entity with the same key already exists within this EntityManager.
  @return {Entity} A new Entity of the specified type.
  **/
  proto.createEntity = function (entityType, initialValues, entityState, mergeStrategy) {
    assertParam(entityType, "entityType").isString().or().isInstanceOf(EntityType).check();
    assertParam(entityState, "entityState").isEnumOf(EntityState).isOptional().check();
    assertParam(mergeStrategy, "mergeStrategy").isEnumOf(MergeStrategy).isOptional().check();
    if (typeof entityType === "string") {
      entityType = this.metadataStore._getEntityType(entityType);
    }
    entityState = entityState || EntityState.Added;
    var entity;
    __using(this, "isLoading", true, function () {
      entity = entityType.createEntity(initialValues);
    });
    if (entityState !== EntityState.Detached) {
      entity = this.attachEntity(entity, entityState, mergeStrategy);
    }
    return entity;
  };


  /**
  Creates a new EntityManager and imports a previously exported result into it.
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var bundle = em1.exportEntities();
      // can be stored via the web storage api
      window.localStorage.setItem("myEntityManager", bundle);
      // assume the code below occurs in a different session.
      var bundleFromStorage = window.localStorage.getItem("myEntityManager");
      // and imported
      var em2 = EntityManager.importEntities(bundleFromStorage);
      // em2 will now have a complete copy of what was in em1
  @method importEntities
  @static
  @param exportedString {String} The result of a previous 'exportEntities' call.
  @param [config] {Object} A configuration object.
  @param [config.mergeStrategy] {MergeStrategy} A  {{#crossLink "MergeStrategy"}}{{/crossLink}} to use when
  merging into an existing EntityManager.
  @param [config.metadataVersionFn} {Function} A function that takes two arguments ( the current metadataVersion and the imported store's 'name'}
  and may be used to perform version checking.
  @return {EntityManager} A new EntityManager.  Note that the return value of this method call is different from that
  provided by the same named method on an EntityManager instance. Use that method if you need additional information
  regarding the imported entities.
  **/
  ctor.importEntities = function (exportedString, config) {
    var em = new EntityManager();
    em.importEntities(exportedString, config);
    return em;
  };

  // instance methods

  /**
  Calls EntityAspect.acceptChanges on every changed entity in this EntityManager.
  @method acceptChanges
  **/
  proto.acceptChanges = function () {
    this.getChanges().map(function(entity) {
      return entity.entityAspect._checkOperation("acceptChanges");
    }).forEach(function (aspect) {
      aspect.acceptChanges();
    });
  };

  /**
  Exports selected entities, all entities of selected types, or an entire EntityManager cache.
  @example
  This method takes a snapshot of an EntityManager that can be stored offline or held in memory.
  Use the `EntityManager.importEntities` method to restore or merge the snapshot
  into another EntityManager at some later time.
  @example
      // let em1 be an EntityManager containing a number of existing entities.
      // export every entity in em1.
      var bundle = em1.exportEntities();
      // save to the browser's local storage
      window.localStorage.setItem("myEntityManager", bundle);
      // later retrieve the export
      var bundleFromStorage = window.localStorage.getItem("myEntityManager");
      // import the retrieved export bundle into another manager
      var em2 = em1.createEmptyCopy();
      em2.importEntities(bundleFromStorage);
      // em2 now has a complete, faithful copy of the entities that were in em1
  You can also control exactly which entities are exported.
  @example
      // get em1's unsaved changes (an array) and export them.
      var changes = em1.getChanges();
      var bundle = em1.exportEntities(changes);
      // merge these entities into em2 which may contains some of the same entities.
      // do NOT overwrite the entities in em2 if they themselves have unsaved changes.
      em2.importEntities(bundle, { mergeStrategy: MergeStrategy.PreserveChanges} );
  Metadata are included in an export by default. You may want to exclude the metadata
  especially if you're exporting just a few entities for local storage.
  @example
      var bundle = em1.exportEntities(arrayOfSelectedEntities, {includeMetadata: false});
      window.localStorage.setItem("goodStuff", bundle);
  You may still express this option as a boolean value although this older syntax is deprecated.
  @example
      // Exclude the metadata (deprecated syntax)
      var bundle = em1.exportEntities(arrayOfSelectedEntities, false);
  You can export all entities of one or more specified EntityTypes.
  @example
      // Export all Customer and Employee entities (and also exclude metadata)
      var bundle = em1.exportEntities(['Customer', 'Employee'], {includeMetadata: false});
  All of the above examples return an export bundle as a string which is the default format.
  You can export the bundle as JSON if you prefer by setting the `asString` option to false.
  @example
      // Export all Customer and Employee entities as JSON and exclude the metadata
      var bundle = em1.exportEntities(['Customer', 'Employee'],
                                      {asString: false, includeMetadata: false});
      // store JSON bundle somewhere ... perhaps indexDb ... and later import as we do here.
      em2.importEntities(bundle);
  @method exportEntities
  @param [entities] {Array of Entity | Array of EntityType | Array of String}
    The entities to export or the EntityType(s) of the entities to export;
    all entities are exported if this parameter is omitted or null.
  @param [config] {Object | Boolean} Export configuration options
  @param [config.asString=true] {Boolean} If true (default), return export bundle as a string.
  @param [config.includeMetadata=true] {Boolean} If true (default), include metadata in the export bundle.
  @return {String | Object} The export bundle either serialized (default) or as a JSON object.
  The bundle contains the metadata (unless excluded) and the entity data grouped by type.
  The entity data include property values, change-state, and temporary key mappings (if any).

  The export bundle is an undocumented, Breeze-internal representation of entity data
  suitable for export, storage, and import. The schema and contents of the bundle may change in future versions of Breeze.
  Manipulate it at your own risk with appropriate caution.
  **/
  proto.exportEntities = function (entities, config) {
    assertParam(entities, "entities").isArray().isEntity()
    .or().isNonEmptyArray().isInstanceOf(EntityType)
    .or().isNonEmptyArray().isString()
    .or().isOptional().check();

    assertParam(config, "config").isObject()
    .or().isBoolean()
    .or().isOptional().check();

    if (config == null) {
      config = { includeMetadata: true, asString: true };
    } else if (typeof config === 'boolean') { // deprecated
      config = { includeMetadata: config, asString: true };
    }

    assertConfig(config)
        .whereParam("asString").isBoolean().isOptional().withDefault(true)
        .whereParam("includeMetadata").isBoolean().isOptional().withDefault(true)
        .applyAll(config);

    var exportBundle = exportEntityGroups(this, entities);
    var json = __extend({}, exportBundle, ["tempKeys", "entityGroupMap"]);

    if (config.includeMetadata) {
      json = __extend(json, this, ["dataService", "saveOptions", "queryOptions", "validationOptions"]);
      json.metadataStore = this.metadataStore.exportMetadata();
    } else {
      json.metadataVersion = breeze.metadataVersion;
      json.metadataStoreName = this.metadataStore.name;
    }

    var result = config.asString ? JSON.stringify(json, null, __config.stringifyPad) : json;
    return result;
  };

  /**
  Imports a previously exported result into this EntityManager.
  @example
  This method can be used to make a complete copy of any previously created entityManager, even if created
  in a previous session and stored in localStorage. The static version of this method performs a
  very similar process.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var bundle = em1.exportEntities();
      // bundle can be stored in window.localStorage or just held in memory.
      var em2 = new EntityManager({
          serviceName: em1.serviceName,
          metadataStore: em1.metadataStore
      });
      em2.importEntities(bundle);
      // em2 will now have a complete copy of what was in em1
  It can also be used to merge the contents of a previously created EntityManager with an
  existing EntityManager with control over how the two are merged.
  @example
      var bundle = em1.exportEntities();
      // assume em2 is another entityManager containing some of the same entities possibly with modifications.
      em2.importEntities(bundle, { mergeStrategy: MergeStrategy.PreserveChanges} );
      // em2 will now contain all of the entities from both em1 and em2.  Any em2 entities with previously
      // made modifications will not have been touched, but all other entities from em1 will have been imported.
  @method importEntities
  @param exportedString {String|Json} The result of a previous 'export' call.
  @param [config] {Object} A configuration object.
  @param [config.mergeStrategy] {MergeStrategy} A  {{#crossLink "MergeStrategy"}}{{/crossLink}} to use when
  merging into an existing EntityManager.
  @param [config.metadataVersionFn} {Function} A function that takes two arguments ( the current metadataVersion and the imported store's 'name'}
  and may be used to perform version checking.
  @return result {Object}

  result.entities {Array of Entities} The entities that were imported.
  result.tempKeyMap {Object} Mapping from original EntityKey in the import bundle to its corresponding EntityKey in this EntityManager.
  **/
  proto.importEntities = function (exportedString, config) {
    config = config || {};
    assertConfig(config)
        .whereParam("mergeStrategy").isEnumOf(MergeStrategy).isOptional().withDefault(this.queryOptions.mergeStrategy)
        .whereParam("metadataVersionFn").isFunction().isOptional()
        .applyAll(config);
    var that = this;

    var json = (typeof exportedString === "string") ? JSON.parse(exportedString) : exportedString;
    if (json.metadataStore) {
      this.metadataStore.importMetadata(json.metadataStore);
      // the || clause is for backwards compat with an earlier serialization format.
      this.dataService = (json.dataService && DataService.fromJSON(json.dataService)) || new DataService({ serviceName: json.serviceName });

      this.saveOptions = new SaveOptions(json.saveOptions);
      this.queryOptions = QueryOptions.fromJSON(json.queryOptions);
      this.validationOptions = new ValidationOptions(json.validationOptions);
    } else {
      config.metadataVersionFn && config.metadataVersionFn({
        metadataVersion: json.metadataVersion,
        metadataStoreName: json.metadataStoreName
      });
    }

    var tempKeyMap = {};
    json.tempKeys.forEach(function (k) {
      var oldKey = EntityKey.fromJSON(k, that.metadataStore);
      // try to use oldKey if not already used in this keyGenerator.
      tempKeyMap[oldKey.toString()] = new EntityKey(oldKey.entityType, that.keyGenerator.generateTempKeyValue(oldKey.entityType, oldKey.values[0]));
    });
    var entitiesToLink = [];
    config.tempKeyMap = tempKeyMap;
    __wrapExecution(function () {
      that._pendingPubs = [];
    }, function (state) {
      that._pendingPubs.forEach(function (fn) {
        fn();
      });
      that._pendingPubs = null;
      that._hasChangesAction && that._hasChangesAction();
    }, function () {
      __objectForEach(json.entityGroupMap, function (entityTypeName, jsonGroup) {
        var entityType = that.metadataStore._getEntityType(entityTypeName, true);
        var targetEntityGroup = findOrCreateEntityGroup(that, entityType);
        var entities = importEntityGroup(targetEntityGroup, jsonGroup, config);
        Array.prototype.push.apply(entitiesToLink, entities);
      });
      entitiesToLink.forEach(function (entity) {
        if (!entity.entityAspect.entityState.isDeleted()) {
          that._linkRelatedEntities(entity);
        }
      });
    });
    return {
      entities: entitiesToLink,
      tempKeyMapping: tempKeyMap
    };
  };


  /**
  Clears this EntityManager's cache but keeps all other settings. Note that this
  method is not as fast as creating a new EntityManager via 'new EntityManager'.
  This is because clear actually detaches all of the entities from the EntityManager.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      em1.clear();
      // em1 is will now contain no entities, but all other setting will be maintained.
  @method clear
  **/
  proto.clear = function () {
    __objectMap(this._entityGroupMap, function (key, entityGroup) {
      return entityGroup._checkOperation();
    }).forEach(function(entityGroup) {
      entityGroup._clear();
    });

    this._entityGroupMap = {};
    this._unattachedChildrenMap = new UnattachedChildrenMap();
    this.keyGenerator = new this.keyGeneratorCtor();
    this.entityChanged.publish({ entityAction: EntityAction.Clear });
    this._setHasChanges(false);
  };


  /**
  Creates an empty copy of this EntityManager
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var em2 = em1.createEmptyCopy();
      // em2 is a new EntityManager with all of em1's settings
      // but no entities.
  @method createEmptyCopy
  @return {EntityManager} A new EntityManager.
  **/
  proto.createEmptyCopy = function () {
    var copy = new ctor(__extend({}, this,
        ["dataService", "metadataStore", "queryOptions", "saveOptions", "validationOptions", "keyGeneratorCtor"]));
    return copy;
  };

  /**
  Attaches an entity to this EntityManager with an  {{#crossLink "EntityState"}}{{/crossLink}} of 'Added'.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var cust1 = custType.createEntity();
      em1.addEntity(cust1);
  Note that this is the same as using 'attachEntity' with an {{#crossLink "EntityState"}}{{/crossLink}} of 'Added'.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var cust1 = custType.createEntity();
      em1.attachEntity(cust1, EntityState.Added);
  @method addEntity
  @param entity {Entity} The entity to add.
  @return {Entity} The added entity.
  **/
  proto.addEntity = function (entity) {
    return this.attachEntity(entity, EntityState.Added);
  };

  /**
  Attaches an entity to this EntityManager with a specified {{#crossLink "EntityState"}}{{/crossLink}}.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var cust1 = custType.createEntity();
      em1.attachEntity(cust1, EntityState.Added);
  @method attachEntity
  @param entity {Entity} The entity to add.
  @param [entityState=EntityState.Unchanged] {EntityState} The EntityState of the newly attached entity. If omitted this defaults to EntityState.Unchanged.
  @param [mergeStrategy=MergeStrategy.Disallowed] {MergeStrategy} How the specified entity should be merged into the EntityManager if this EntityManager already contains an entity with the same key.
  @return {Entity} The attached entity.
  **/
  proto.attachEntity = function (entity, entityState, mergeStrategy) {
    assertParam(entity, "entity").isRequired().check();
    this.metadataStore._checkEntityType(entity);
    entityState = assertParam(entityState, "entityState").isEnumOf(EntityState).isOptional().check(EntityState.Unchanged);
    mergeStrategy = assertParam(mergeStrategy, "mergeStrategy").isEnumOf(MergeStrategy).isOptional().check(MergeStrategy.Disallowed);

    if (entity.entityType.metadataStore !== this.metadataStore) {
      throw new Error("Cannot attach this entity because the EntityType (" + entity.entityType.name +
          ") and MetadataStore associated with this entity does not match this EntityManager's MetadataStore.");
    }
    var aspect = entity.entityAspect;
    if (aspect) {
      // to avoid reattaching an entity in progress
      if (aspect._inProcessEntity) return aspect._inProcessEntity;
    } else {
      // this occur's when attaching an entity created via new instead of via createEntity.
      aspect = new EntityAspect(entity);
    }
    var manager = aspect.entityManager;
    if (manager) {
      if (manager === this) {
        return entity;
      } else {
        throw new Error("This entity already belongs to another EntityManager");
      }
    }

    var that = this;
    var attachedEntity;
    __using(this, "isLoading", true, function () {
      if (entityState.isAdded()) {
        checkEntityKey(that, entity);
      }
      // attachedEntity === entity EXCEPT in the case of a merge.
      attachedEntity = that._attachEntityCore(entity, entityState, mergeStrategy);
      aspect._inProcessEntity = attachedEntity;
      try {
        // entity ( not attachedEntity) is deliberate here.
        attachRelatedEntities(that, entity, entityState, mergeStrategy);
      } finally {
        // insure that _inProcessEntity is cleared.
        aspect._inProcessEntity = null;
      }
    });
    if (this.validationOptions.validateOnAttach) {
      attachedEntity.entityAspect.validateEntity();
    }
    if (!entityState.isUnchanged()) {
      this._notifyStateChange(attachedEntity, true);
    }
    this.entityChanged.publish({ entityAction: EntityAction.Attach, entity: attachedEntity });

    return attachedEntity;
  };


  /**
  Detaches an entity from this EntityManager.
  @example
      // assume em1 is an EntityManager containing a number of existing entities.
      // assume cust1 is a customer Entity previously attached to em1
      em1.detachEntity(cust1);
      // em1 will now no longer contain cust1 and cust1 will have an
      // entityAspect.entityState of EntityState.Detached
  @method detachEntity
  @param entity {Entity} The entity to detach.
  @return {Boolean} Whether the entity could be detached. This will return false if the entity is already detached or was never attached.
  **/
  proto.detachEntity = function (entity) {
    assertParam(entity, "entity").isEntity().check();
    var aspect = entity.entityAspect;
    if (!aspect) {
      // no aspect means in couldn't appear in any group
      return false;
    }

    if (aspect.entityManager !== this) {
      throw new Error("This entity does not belong to this EntityManager.");
    }
    return aspect.setDetached();
  };

  /**
  Fetches the metadata associated with the EntityManager's current 'serviceName'.  This call
  occurs internally before the first query to any service if the metadata hasn't already been
  loaded.
  @example
  Usually you will not actually process the results of a fetchMetadata call directly, but will instead
  ask for the metadata from the EntityManager after the fetchMetadata call returns.
  @example
      var em1 = new EntityManager( "breeze/NorthwindIBModel");
      em1.fetchMetadata()
        .then(function() {
            var metadataStore = em1.metadataStore;
            // do something with the metadata
        }).fail(function(exception) {
            // handle exception here
        });
  @method fetchMetadata
  @async
  @param [callback] {Function} Function called on success.

  successFunction([schema])
  @param [callback.schema] {Object} The raw Schema object from metadata provider - Because this schema will differ depending on the metadata provider
  it is usually better to access metadata via the 'metadataStore' property of the EntityManager after this method's Promise or callback completes.
  @param [errorCallback] {Function} Function called on failure.

  failureFunction([error])
  @param [errorCallback.error] {Error} Any error that occured wrapped into an Error object.
  @return {Promise}
    - Properties on the promise success result
      - schema {Object} The raw Schema object from metadata provider - Because this schema will differ depending on the metadata provider
        it is usually better to access metadata via the 'metadataStore' property of the EntityManager instead of using this 'raw' data.
  **/
  proto.fetchMetadata = function (dataService, callback, errorCallback) {
    if (typeof (dataService) === "function") {
      // legacy support for when dataService was not an arg. i.e. first arg was callback
      errorCallback = callback;
      callback = dataService;
      dataService = null;
    } else {
      assertParam(dataService, "dataService").isInstanceOf(DataService).isOptional().check();
      assertParam(callback, "callback").isFunction().isOptional().check();
      assertParam(errorCallback, "errorCallback").isFunction().isOptional().check();
    }

    var promise = this.metadataStore.fetchMetadata(dataService || this.dataService);
    return promiseWithCallbacks(promise, callback, errorCallback);
  };

  /**
  Executes the specified query.
  @example
  This method can be called using a 'promises' syntax ( recommended)
  @example
      var em = new EntityManager(serviceName);
      var query = new EntityQuery("Orders");
      em.executeQuery(query).then( function(data) {
          var orders = data.results;
          ... query results processed here
      }).fail( function(err) {
          ... query failure processed here
      });
  or with callbacks
  @example
      var em = new EntityManager(serviceName);
      var query = new EntityQuery("Orders");
      em.executeQuery(query,
          function(data) {
              var orders = data.results;
              ... query results processed here
          },
          function(err) {
              ... query failure processed here
          });
  Either way this method is the same as calling the The {{#crossLink "EntityQuery"}}{{/crossLink}} 'execute' method.
  @example
      var em = new EntityManager(serviceName);
      var query = new EntityQuery("Orders").using(em);
      query.execute().then( function(data) {
          var orders = data.results;
          ... query results processed here
      }).fail( function(err) {
          ... query failure processed here
      });

  @method executeQuery
  @async
  @param query {EntityQuery|String}  The {{#crossLink "EntityQuery"}}{{/crossLink}} or OData query string to execute.
  @param [callback] {Function} Function called on success.

  successFunction([data])
  @param callback.data {Object}
  @param callback.data.results {Array of Entity}
  @param callback.data.query {EntityQuery} The original query
  @param callback.data.entityManager {EntityManager} The EntityManager.
  @param callback.data.httpResponse {HttpResponse} The HttpResponse returned from the server.
  @param callback.data.inlineCount {Integer} Only available if 'inlineCount(true)' was applied to the query.  Returns the count of
  items that would have been returned by the query before applying any skip or take operators, but after any filter/where predicates
  would have been applied.
  @param callback.data.retrievedEntities {Array of Entity} All entities returned by the query.  Differs from results when .expand() is used.

  @param [errorCallback] {Function} Function called on failure.

  failureFunction([error])
  @param [errorCallback.error] {Error} Any error that occured wrapped into an Error object.
  @param [errorCallback.error.query] The query that caused the error.
  @param [errorCallback.error.entityManager] The query that caused the error.
  @param [errorCallback.error.httpResponse] {HttpResponse} The HttpResponse returned from the server.


  @return {Promise}
    - Properties on the promise success result
      - results {Array of Entity}
      - query {EntityQuery} The original query
      - entityManager {EntityManager} The EntityManager.
      - httpResponse {HttpResponse} The  HttpResponse returned from the server.
      - [inlineCount] {Integer} Only available if 'inlineCount(true)' was applied to the query.  Returns the count of
    items that would have been returned by the query before applying any skip or take operators, but after any filter/where predicates
    would have been applied.
  **/
  proto.executeQuery = function (query, callback, errorCallback) {
    assertParam(query, "query").isInstanceOf(EntityQuery).or().isString().check();
    assertParam(callback, "callback").isFunction().isOptional().check();
    assertParam(errorCallback, "errorCallback").isFunction().isOptional().check();
    var promise;
    // 'resolve' methods create a new typed object with all of its properties fully resolved against a list of sources.
    // Thought about creating a 'normalized' query with these 'resolved' objects
    // but decided not to because the 'query' may not be an EntityQuery (it can be a string) and hence might not have a queryOptions or dataServices property on it.
    var queryOptions = QueryOptions.resolve([ query.queryOptions, this.queryOptions, QueryOptions.defaultInstance]);
    var dataService = DataService.resolve([ query.dataService, this.dataService]);

    if ((!dataService.hasServerMetadata ) || this.metadataStore.hasMetadataFor(dataService.serviceName)) {
      promise = executeQueryCore(this, query, queryOptions, dataService);
    } else {
      var that = this;
      promise = this.fetchMetadata(dataService).then(function () {
        return executeQueryCore(that, query, queryOptions, dataService);
      });
    }

    return promiseWithCallbacks(promise, callback, errorCallback);
  };

  /**
  Executes the specified query against this EntityManager's local cache.

  @example
  Because this method is executed immediately there is no need for a promise or a callback
  @example
      var em = new EntityManager(serviceName);
      var query = new EntityQuery("Orders");
      var orders = em.executeQueryLocally(query);

  Note that this can also be accomplished using the 'executeQuery' method with
  a FetchStrategy of FromLocalCache and making use of the Promise or callback
  @example
      var em = new EntityManager(serviceName);
      var query = new EntityQuery("Orders").using(FetchStrategy.FromLocalCache);
      em.executeQuery(query).then( function(data) {
          var orders = data.results;
          ... query results processed here
      }).fail( function(err) {
          ... query failure processed here
      });
  @method executeQueryLocally
  @param query {EntityQuery}  The {{#crossLink "EntityQuery"}}{{/crossLink}} to execute.
  @return  {Array of Entity}  Array of entities from cache that satisfy the query
  **/
  proto.executeQueryLocally = function (query) {
    return executeQueryLocallyCore(this, query).results;
  }

  function executeQueryLocallyCore(em, query) {
    assertParam(query, "query").isInstanceOf(EntityQuery).check();

    var metadataStore = em.metadataStore;
    var entityType = query._getFromEntityType(metadataStore, true);
    // there may be multiple groups is this is a base entity type.
    var groups = findOrCreateEntityGroups(em, entityType);
    // filter then order then skip then take
    var filterFunc = query.wherePredicate && query.wherePredicate.toFunction({ entityType: entityType});

    var queryOptions = QueryOptions.resolve([ query.queryOptions, em.queryOptions, QueryOptions.defaultInstance]);
    var includeDeleted = queryOptions.includeDeleted === true;

    var newFilterFunc = function (entity) {
      return entity && (includeDeleted || !entity.entityAspect.entityState.isDeleted()) && (filterFunc ? filterFunc(entity) : true);
    };

    var result = [];
    // TODO: mapMany
    groups.forEach(function (group) {
      result.push.apply(result, group._entities.filter(newFilterFunc));
    });

    var orderByComparer = query.orderByClause && query.orderByClause.getComparer(entityType);
    if (orderByComparer) {
      result.sort(orderByComparer);
    }

    if (query.inlineCountEnabled) {
      var inlineCount = result.length;
    }

    var skipCount = query.skipCount;
    if (skipCount) {
      result = result.slice(skipCount);
    }
    var takeCount = query.takeCount;
    if (takeCount) {
      result = result.slice(0, takeCount);
    }

    var selectClause = query.selectClause;
    if (selectClause) {
      var selectFn = selectClause.toFunction();
      result = result.map(selectFn);
    }
    return {results: result, inlineCount: inlineCount};
  };

  /**
  Saves either a list of specified entities or all changed entities within this EntityManager. If there are no changes to any of the entities
  specified then there will be no server side call made but a valid 'empty' saveResult will still be returned.
  @example
  Often we will be saving all of the entities within an EntityManager that are either added, modified or deleted
  and we will let the 'saveChanges' call determine which entities these are.
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      // This could include added, modified and deleted entities.
      em.saveChanges().then(function(saveResult) {
          var savedEntities = saveResult.entities;
          var keyMappings = saveResult.keyMappings;
      }).fail(function (e) {
          // e is any exception that was thrown.
      });
  But we can also control exactly which entities to save and can specify specific SaveOptions
  @example
      // assume entitiesToSave is an array of entities to save.
      var saveOptions = new SaveOptions({ allowConcurrentSaves: true });
      em.saveChanges(entitiesToSave, saveOptions).then(function(saveResult) {
          var savedEntities = saveResult.entities;
          var keyMappings = saveResult.keyMappings;
      }).fail(function (e) {
          // e is any exception that was thrown.
      });
  Callback methods can also be used
  @example
      em.saveChanges(entitiesToSave, null,
      function(saveResult) {
                  var savedEntities = saveResult.entities;
                  var keyMappings = saveResult.keyMappings;
              }, function (e) {
                  // e is any exception that was thrown.
              }
      );
  @method saveChanges
  @async
  @param [entities] {Array of Entity} The list of entities to save.
  Every entity in that list will be sent to the server, whether changed or unchanged,
  as long as it is attached to this EntityManager.
  If this parameter is omitted, null or empty (the usual case),
  every entity with pending changes in this EntityManager will be saved.
  @param [saveOptions] {SaveOptions} {{#crossLink "SaveOptions"}}{{/crossLink}} for the save - will default to
  {{#crossLink "EntityManager/saveOptions"}}{{/crossLink}} if null.
  @param [callback] {Function} Function called on success.

  successFunction([saveResult])
  @param [callback.saveResult] {Object}
  @param [callback.saveResult.entities] {Array of Entity} The saved entities - with any temporary keys converted into 'real' keys.
  These entities are actually references to entities in the EntityManager cache that have been updated as a result of the
  save.
  @param [callback.saveResult.keyMappings] {Array of keyMappings} Each keyMapping has the following properties: 'entityTypeName', 'tempValue' and 'realValue'
  @param [callback.saveResult.httpResponse] {HttpResponse} The raw HttpResponse returned from the server.

  @param [errorCallback] {Function} Function called on failure.

  failureFunction([error])
  @param [errorCallback.error] {Error} Any error that occured wrapped into an Error object.
  @param [errorCallback.error.entityErrors] { Array of server side errors }  These are typically validation errors but are generally any error that can be easily isolated to a single entity.
  @param [errorCallback.error.httpResponse] {HttpResponse} The raw HttpResponse returned from the server.
  @param [errorCallback.error.saveResult] {Object} Some dataservice adapters return a 'saveResult' object
  when the failing save operation is non-transactional meaning some entities could be saved while others were not.
  The 'saveResult' object identifies both that entities that were saved (with their keyMapping)
  and that entities that were not saved (with their errors).

  @return {Promise} Promise
  **/
  proto.saveChanges = function (entities, saveOptions, callback, errorCallback) {
    assertParam(entities, "entities").isOptional().isArray().isEntity().check();
    assertParam(saveOptions, "saveOptions").isInstanceOf(SaveOptions).isOptional().check();
    assertParam(callback, "callback").isFunction().isOptional().check();
    assertParam(errorCallback, "errorCallback").isFunction().isOptional().check();

    saveOptions = saveOptions || this.saveOptions || SaveOptions.defaultInstance;
    var isFullSave = entities == null;
    var entitiesToSave = getEntitiesToSave(this, entities);

    if (entitiesToSave.length === 0) {
      var result = { entities: [], keyMappings: [] };
      if (callback) callback(result);
      return Q.resolve(result);
    }

    if (!saveOptions.allowConcurrentSaves) {
      var anyPendingSaves = entitiesToSave.some(function (entity) {
        return entity.entityAspect.isBeingSaved;
      });
      if (anyPendingSaves) {
        var err = new Error("Concurrent saves not allowed - SaveOptions.allowConcurrentSaves is false");
        if (errorCallback) errorCallback(err);
        return Q.reject(err);
      }
    }

    clearServerErrors(entitiesToSave);

    var valError = this.saveChangesValidateOnClient(entitiesToSave);
    if (valError) {
      if (errorCallback) errorCallback(valError);
      return Q.reject(valError);
    }

    var dataService = DataService.resolve([saveOptions.dataService, this.dataService]);
    var saveContext = {
      entityManager: this,
      dataService: dataService,
      processSavedEntities: processSavedEntities,
      resourceName: saveOptions.resourceName || this.saveOptions.resourceName || "SaveChanges"
    };

    // TODO: need to check that if we are doing a partial save that all entities whose temp keys
    // are referenced are also in the partial save group

    var saveBundle = { entities: entitiesToSave, saveOptions: saveOptions };


    try { // Guard against exception thrown in dataservice adapter before it goes async
      updateConcurrencyProperties(entitiesToSave);
      return dataService.adapterInstance.saveChanges(saveContext, saveBundle)
          .then(saveSuccess).then(null, saveFail);
    } catch (err) {
      // undo the marking by updateConcurrencyProperties
      markIsBeingSaved(entitiesToSave, false);
      if (errorCallback) errorCallback(err);
      return Q.reject(err);
    }

    function saveSuccess(saveResult) {
      var em = saveContext.entityManager;
      markIsBeingSaved(entitiesToSave, false);
      var savedEntities = saveResult.entities = saveContext.processSavedEntities(saveResult);

      // update _hasChanges after save.
      em._setHasChanges(null);

      // can't do this anymore because other changes might have been made while saved entities in flight.
//      var hasChanges = (isFullSave && haveSameContents(entitiesToSave, savedEntities)) ? false : null;
//      em._setHasChanges(hasChanges);

      if (callback) callback(saveResult);
      return Q.resolve(saveResult);
    }

    function processSavedEntities(saveResult) {

      var savedEntities = saveResult.entities;

      if (savedEntities.length === 0) {
        return [];
      }
      var keyMappings = saveResult.keyMappings;
      var em = saveContext.entityManager;

      // must occur outside of isLoading block
      fixupKeys(em, keyMappings);

      __using(em, "isLoading", true, function () {

        var mappingContext = new MappingContext({
          query: null, // tells visitAndMerge this is a save instead of a query
          entityManager: em,
          mergeOptions: { mergeStrategy: MergeStrategy.OverwriteChanges },
          dataService: dataService
        });

        // The visitAndMerge operation has been optimized so that we do not actually perform a merge if the
        // the save operation did not actually return the entity - i.e. during OData and Mongo updates and deletes.
        savedEntities = mappingContext.visitAndMerge(savedEntities, { nodeType: "root" });
      });

      return savedEntities;
    }

    function saveFail(error) {
      markIsBeingSaved(entitiesToSave, false);
      processServerErrors(saveContext, error);
      if (errorCallback) errorCallback(error);
      return Q.reject(error);
    }
  };

  /**
  Run the "saveChanges" pre-save client validation logic.

  This is NOT a general purpose validation method.
  It is intended for utilities that must know if saveChanges
  would reject the save due to client validation errors.

  It only validates entities if the EntityManager's
  {{#crossLink "ValidationOptions"}}{{/crossLink}}.validateOnSave is true.

  @method saveChangesValidateOnClient
  @param entitiesToSave {Array of Entity} The list of entities to save (to validate).
  @return {Error} Validation error or null if no error
  **/
  proto.saveChangesValidateOnClient = function(entitiesToSave) {

    if (this.validationOptions.validateOnSave) {
      var failedEntities = entitiesToSave.filter(function (entity) {
        var aspect = entity.entityAspect;
        var isValid = aspect.entityState.isDeleted() || aspect.validateEntity();
        return !isValid;
      });
      if (failedEntities.length > 0) {
        var valError = new Error("Client side validation errors encountered - see the entityErrors collection on this object for more detail");
        valError.entityErrors = createEntityErrors(failedEntities);
        return valError;
      }
    }
    return null;
  }

  function clearServerErrors(entities) {
    entities.forEach(function (entity) {
      var serverKeys = [];
      var aspect = entity.entityAspect;
      __objectForEach(aspect._validationErrors, function (key, ve) {
        if (ve.isServerError) serverKeys.push(key);
      });
      if (serverKeys.length === 0) return;
      aspect._processValidationOpAndPublish(function () {
        serverKeys.forEach(function (key) {
          aspect._removeValidationError(key);
        });
      });
    });
  }

  function createEntityErrors(entities) {
    var entityErrors = [];
    entities.forEach(function (entity) {
      __objectForEach(entity.entityAspect._validationErrors, function (key, ve) {
        var cfg = __extend({
          entity: entity,
          errorName: ve.validator.name
        }, ve, ["errorMessage", "propertyName", "isServerError"]);
        entityErrors.push(cfg);
      });
    });
    return entityErrors;
  }


  function processServerErrors(saveContext, error) {
    var serverErrors = error.entityErrors;
    if (!serverErrors) return;
    var entityManager = saveContext.entityManager;
    var metadataStore = entityManager.metadataStore;
    error.entityErrors = serverErrors.map(function (serr) {
      var entity = null;
      if (serr.keyValues) {
        var entityType = metadataStore._getEntityType(serr.entityTypeName);
        var ekey = new EntityKey(entityType, serr.keyValues);
        entity = entityManager.findEntityByKey(ekey);
      }

      if (entity) {
        var context = serr.propertyName ?
                      {
                        propertyName: serr.propertyName,
                        property: entityType.getProperty(serr.propertyName)
                      } : {
                      };
        var key = ValidationError.getKey(serr.errorName || serr.errorMessage, serr.propertyName);

        var ve = new ValidationError(null, context, serr.errorMessage, key);
        ve.isServerError = true;
        entity.entityAspect.addValidationError(ve);
      }

      var entityError = __extend({
        entity: entity,
        isServerError: true
      }, serr, ["errorName", "errorMessage", "propertyName"]);
      return entityError;
    });
  }

  // No longer used
//  function haveSameContents(arr1, arr2) {
//    if (arr1.length !== arr2.length) {
//      return false;
//    }
//    for (var i = 0, c = arr1.length; i < c; i++) {
//      if (arr1[i] !== arr2[i]) return false;
//    }
//    return true;
//  }


  proto._findEntityGroup = function (entityType) {
    return this._entityGroupMap[entityType.name];
  };


  /**
  Attempts to locate an entity within this EntityManager by its key.
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var employee = em1.getEntityByKey("Employee", 1);
      // employee will either be an entity or null.
  @method getEntityByKey
  @param typeName {EntityType | String} The EntityType or EntityType name for this key.
  @param keyValues {Object|Array of Object} The values for this key - will usually just be a single value; an array is only needed for multipart keys.
  @return {Entity} An Entity or null;
  **/

  /**
  Attempts to locate an entity within this EntityManager by its  {{#crossLink "EntityKey"}}{{/crossLink}}.
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var employeeType = em1.metadataStore.getEntityType("Employee");
      var employeeKey = new EntityKey(employeeType, 1);
      var employee = em1.getEntityByKey(employeeKey);
      // employee will either be an entity or null.
  @method getEntityByKey - overload
  @param entityKey {EntityKey} The  {{#crossLink "EntityKey"}}{{/crossLink}} of the Entity to be located.
  @return {Entity} An Entity or null;
  **/
  proto.getEntityByKey = function () {
    var entityKey = createEntityKey(this, arguments).entityKey;
    var entityTypes = entityKey._subtypes || [entityKey.entityType];
    var ek = null;
    // hack use of some to simulate mapFirst logic.
    entityTypes.some(function (et) {
      var group = this._findEntityGroup(et);
      // group version of findEntityByKey doesn't care about entityType
      ek = group && group.findEntityByKey(entityKey);
      return ek;
    }, this);
    return ek;
  };

  /**
  Attempts to fetch an entity from the server by its key with
  an option to check the local cache first. Note the this EntityManager's queryOptions.mergeStrategy
  will be used to merge any server side entity returned by this method.
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      em1.fetchEntityByKey("Employee", 1).then(function(result) {
          var employee = result.entity;
          var entityKey = result.entityKey;
          var fromCache = result.fromCache;
      });
  @method fetchEntityByKey
  @async
  @param typeName {EntityType | String} The EntityType or EntityType name for this key.
  @param keyValues {Object|Array of Object} The values for this key - will usually just be a single value; an array is only needed for multipart keys.
  @param checkLocalCacheFirst {Boolean=false} Whether to check this EntityManager first before going to the server. By default, the query will NOT do this.
  @return {Promise}
    - Properties on the promise success result
      - entity {Object} The entity returned or null
      - entityKey {EntityKey} The entityKey of the entity to fetch.
      - fromCache {Boolean} Whether this entity was fetched from the server or was found in the local cache.

  **/

  /**
  Attempts to fetch an entity from the server by its {{#crossLink "EntityKey"}}{{/crossLink}} with
  an option to check the local cache first.
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var employeeType = em1.metadataStore.getEntityType("Employee");
      var employeeKey = new EntityKey(employeeType, 1);
      em1.fetchEntityByKey(employeeKey).then(function(result) {
          var employee = result.entity;
          var entityKey = result.entityKey;
          var fromCache = result.fromCache;
      });
  @method fetchEntityByKey - overload
  @async
  @param entityKey {EntityKey} The  {{#crossLink "EntityKey"}}{{/crossLink}} of the Entity to be located.
  @param checkLocalCacheFirst {Boolean=false} Whether to check this EntityManager first before going to the server. By default, the query will NOT do this.
  @return {Promise}
    - Properties on the promise success result
      - entity {Object} The entity returned or null
      - entityKey {EntityKey} The entityKey of the entity to fetch.
      - fromCache {Boolean} Whether this entity was fetched from the server or was found in the local cache.
  **/
  proto.fetchEntityByKey = function () {
    var dataService = DataService.resolve([this.dataService]);
    if ((!dataService.hasServerMetadata) || this.metadataStore.hasMetadataFor(dataService.serviceName)) {
      return fetchEntityByKeyCore(this, arguments);
    } else {
      var that = this;
      var args = arguments;
      return this.fetchMetadata(dataService).then(function () {
        return fetchEntityByKeyCore(that, args);
      });
    }
  };

  function fetchEntityByKeyCore(em, args) {
    var tpl = createEntityKey(em, args);
    var entityKey = tpl.entityKey;
    var checkLocalCacheFirst = tpl.remainingArgs.length === 0 ? false : !!tpl.remainingArgs[0];
    var entity;
    var foundIt = false;
    if (checkLocalCacheFirst) {
      entity = em.getEntityByKey(entityKey);
      foundIt = !!entity;
      if (foundIt &&
        // null the entity if it is deleted and we should exclude deleted entities
          !em.queryOptions.includeDeleted && entity.entityAspect.entityState.isDeleted()) {
        entity = null;
        // but resume looking if we'd overwrite deleted entity with a remote entity
        // note: em.queryOptions is always fully resolved by now
        foundIt = em.queryOptions.mergeStrategy !== MergeStrategy.OverwriteChanges;
      }
    }
    if (foundIt) {
      return Q.resolve({ entity: entity, entityKey: entityKey, fromCache: true });
    } else {
      return EntityQuery.fromEntityKey(entityKey).using(em).execute().then(function (data) {
        entity = (data.results.length === 0) ? null : data.results[0];
        return Q.resolve({ entity: entity, entityKey: entityKey, fromCache: false });
      });
    }
  };

  /**
  [Deprecated] - Attempts to locate an entity within this EntityManager by its  {{#crossLink "EntityKey"}}{{/crossLink}}.
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var employeeType = em1.metadataStore.getEntityType("Employee");
      var employeeKey = new EntityKey(employeeType, 1);
      var employee = em1.findEntityByKey(employeeKey);
      // employee will either be an entity or null.
  @method findEntityByKey
  @deprecated - use getEntityByKey instead
  @param entityKey {EntityKey} The  {{#crossLink "EntityKey"}}{{/crossLink}} of the Entity to be located.
  @return {Entity} An Entity or null;
  **/
  proto.findEntityByKey = function (entityKey) {
    return this.getEntityByKey(entityKey);
  };

  /**
  Generates a temporary key for the specified entity.  This is used to insure that newly
  created entities have unique keys and to register that these keys are temporary and
  need to be automatically replaced with 'real' key values once these entities are saved.

  The EntityManager.keyGeneratorCtor property is used internally by this method to actually generate
  the keys - See the  {{#crossLink "_keyGenerator_interface"}}{{/crossLink}} interface description to see
  how a custom key generator can be plugged in.
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var customer = custType.createEntity();
      var customerId = em.generateTempKeyValue(customer);
      // The 'customer' entity 'CustomerID' property is now set to a newly generated unique id value
      // This property will change again after a successful save of the 'customer' entity.

      em1.saveChanges().then( function( data) {
          var sameCust1 = data.results[0];
          // cust1 === sameCust1;
          // but cust1.getProperty("CustomerId") != customerId
          // because the server will have generated a new id
          // and the client will have been updated with this
          // new id.
      })

  @method generateTempKeyValue
  @param entity {Entity} The Entity to generate a key for.
  @return {Object} The new key value
  **/
  proto.generateTempKeyValue = function (entity) {
    // TODO - check if this entity is attached to this EntityManager.
    assertParam(entity, "entity").isEntity().check();
    var entityType = entity.entityType;
    var nextKeyValue = this.keyGenerator.generateTempKeyValue(entityType);
    var keyProp = entityType.keyProperties[0];
    entity.setProperty(keyProp.name, nextKeyValue);
    entity.entityAspect.hasTempKey = true;
    return nextKeyValue;
  };

  /**
  Returns whether there are any changed entities of the specified {{#crossLink "EntityType"}}{{/crossLink}}s. A 'changed' Entity has
  has an {{#crossLink "EntityState"}}{{/crossLink}} of either Added, Modified or Deleted.
  @example
  This method can be used to determine if an EntityManager has any changes
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      if ( em1.hasChanges() {
          // do something interesting
      }
  or if it has any changes on to a specific {{#crossLink "EntityType"}}{{/crossLink}}
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      if ( em1.hasChanges(custType) {
          // do something interesting
      }
  or to a collection of {{#crossLink "EntityType"}}{{/crossLink}}s
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var orderType = em1.metadataStore.getEntityType("Order");
      if ( em1.hasChanges( [custType, orderType]) {
          // do something interesting
      }
  @method hasChanges
  @param [entityTypes] {String|Array of String|EntityType|Array of EntityType} The {{#crossLink "EntityType"}}{{/crossLink}}s for which 'changed' entities will be found.
  If this parameter is omitted, all EntityTypes are searched. String parameters are treated as EntityType names.
  @return {Boolean} Whether there were any changed entities.
  **/
  proto.hasChanges = function (entityTypes) {
    if (!this._hasChanges) return false;
    if (entityTypes === undefined) return this._hasChanges;
    return this._hasChangesCore(entityTypes);
  };

  /**
  An {{#crossLink "Event"}}{{/crossLink}} that fires whenever an EntityManager transitions to or from having changes.
  @example
      var em = new EntityManager( {serviceName: "breeze/NorthwindIBModel" });
      em.hasChangesChanged.subscribe(function(args) {
              var hasChangesChanged = args.hasChanges;
              var entityManager = args.entityManager;
          });
      });

  @event hasChangesChanged
  @param entityManager {EntityManager} The EntityManager whose 'hasChanges' status has changed.
  @param hasChanges {Boolean} Whether or not this EntityManager has changes.
  @readOnly
  **/


  // backdoor to "really" check for changes.
  proto._hasChangesCore = function (entityTypes) {
    entityTypes = checkEntityTypes(this, entityTypes);
    var entityGroups = getEntityGroups(this, entityTypes);
    return entityGroups.some(function (eg) {
      return eg && eg.hasChanges();
    });
  };

  /**
  Returns a array of all changed entities of the specified {{#crossLink "EntityType"}}{{/crossLink}}s. A 'changed' Entity has
  has an {{#crossLink "EntityState"}}{{/crossLink}} of either Added, Modified or Deleted.
  @example
  This method can be used to get all of the changed entities within an EntityManager
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var changedEntities = em1.getChanges();
  or you can specify that you only want the changes on a specific {{#crossLink "EntityType"}}{{/crossLink}}
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var changedCustomers = em1.getChanges(custType);
  or to a collection of {{#crossLink "EntityType"}}{{/crossLink}}s
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var orderType = em1.metadataStore.getEntityType("Order");
      var changedCustomersAndOrders = em1.getChanges([custType, orderType]);
  @method getChanges
  @param [entityTypes] {String|Array of String|EntityType|Array of EntityType} The {{#crossLink "EntityType"}}{{/crossLink}}s for which 'changed' entities will be found.
  If this parameter is omitted, all EntityTypes are searched. String parameters are treated as EntityType names.
  @return {Array of Entity} Array of Entities
  **/
  proto.getChanges = function (entityTypes) {
    entityTypes = checkEntityTypes(this, entityTypes);
    return getChangesCore(this, entityTypes);
  };

  /**
  Rejects (reverses the effects) all of the additions, modifications and deletes from this EntityManager.
  Calls EntityAspect.rejectChanges on every changed entity in this EntityManager.
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var entities = em1.rejectChanges();

  @method rejectChanges
  @return {Array of Entity} The entities whose changes were rejected. These entities will all have EntityStates of
  either 'Unchanged' or 'Detached'
  **/
  proto.rejectChanges = function () {
    if (!this._hasChanges) return [];
    var changes = getChangesCore(this, null);
    // next line stops individual reject changes from each calling _hasChangesCore
    var aspects = changes.map(function(e) {
      return e.entityAspect._checkOperation("rejectChanges");
    });
    this._hasChanges = false;
    aspects.forEach(function (aspect) {
      aspect.rejectChanges();
    });
    this.hasChangesChanged.publish({ entityManager: this, hasChanges: false });
    return changes;
  };

  /**
  Returns a array of all entities of the specified {{#crossLink "EntityType"}}{{/crossLink}}s with the specified {{#crossLink "EntityState"}}{{/crossLink}}s.
  @example
  This method can be used to get all of the entities within an EntityManager
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var entities = em1.getEntities();
  or you can specify that you only want the changes on a specific {{#crossLink "EntityType"}}{{/crossLink}}
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var customers = em1.getEntities(custType);
  or to a collection of {{#crossLink "EntityType"}}{{/crossLink}}s
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var orderType = em1.metadataStore.getEntityType("Order");
      var customersAndOrders = em1.getChanges([custType, orderType]);
  You can also ask for entities with a particular {{#crossLink "EntityState"}}{{/crossLink}} or EntityStates.
  @example
      // assume em1 is an EntityManager containing a number of preexisting entities.
      var custType = em1.metadataStore.getEntityType("Customer");
      var orderType = em1.metadataStore.getEntityType("Order");
      var addedCustomersAndOrders = em1.getEntities([custType, orderType], EntityState.Added);
  @method getEntities
  @param [entityTypes] {String|Array of String|EntityType|Array of EntityType} The {{#crossLink "EntityType"}}{{/crossLink}}s for which entities will be found.
  If this parameter is omitted, all EntityTypes are searched. String parameters are treated as EntityType names.
  @param [entityState] {EntityState|Array of EntityState} The {{#crossLink "EntityState"}}{{/crossLink}}s for which entities will be found.
  If this parameter is omitted, entities of all EntityStates are returned.
  @return {Array of Entity} Array of Entities
  **/
  proto.getEntities = function (entityTypes, entityStates) {
    entityTypes = checkEntityTypes(this, entityTypes);
    assertParam(entityStates, "entityStates").isOptional().isEnumOf(EntityState).or().isNonEmptyArray().isEnumOf(EntityState).check();

    entityStates = entityStates && validateEntityStates(this, entityStates);
    return getEntitiesCore(this, entityTypes, entityStates);
  };


  // protected methods

  proto._notifyStateChange = function (entity, needsSave) {
    var ecArgs = { entityAction: EntityAction.EntityStateChange, entity: entity };

    if (needsSave) {
      if (!this._hasChanges) this._setHasChanges(true);
    } else {
      // called when rejecting a change or merging an unchanged record.
      // NOTE: this can be slow with lots of entities in the cache.
      // so defer it during a query/import or save and call it once when complete ( if needed).
      if (this._hasChanges) {
        if (this.isLoading) {
          this._hasChangesAction = this._hasChangesAction || function () {
            this._setHasChanges(null);
            this.entityChanged.publish(ecArgs);
          }.bind(this);
          return;
        } else {
          this._setHasChanges(null);
        }
      }
    }
    this.entityChanged.publish(ecArgs);
  };

  proto._setHasChanges = function (hasChanges) {
    if (hasChanges == null) hasChanges = this._hasChangesCore();
    var hadChanges = this._hasChanges;
    this._hasChanges = hasChanges;
    if (hasChanges != hadChanges) {
      this.hasChangesChanged.publish({ entityManager: this, hasChanges: hasChanges });
    }
    this._hasChangesAction = null;
  }

  proto._linkRelatedEntities = function (entity) {
    var em = this;
    var entityAspect = entity.entityAspect;
    // we do not want entityState to change as a result of linkage.
    __using(em, "isLoading", true, function () {

      var unattachedMap = em._unattachedChildrenMap;
      var entityKey = entityAspect.getKey();

      // attach any unattachedChildren
      var tuples = unattachedMap.getTuples(entityKey);
      if (tuples) {
        tuples.slice(0).forEach(function (tpl) {

          var unattachedChildren = tpl.children.filter(function (e) {
            return e.entityAspect.entityState !== EntityState.Detached;
          });

          var childToParentNp, parentToChildNp;

          // np is usually childToParentNp
          // except with unidirectional 1-n where it is parentToChildNp;
          var np = tpl.navigationProperty;

          if (np.inverse) {
            // bidirectional
            childToParentNp = np;
            parentToChildNp = np.inverse;

            if (parentToChildNp.isScalar) {
              var onlyChild = unattachedChildren[0];
              entity.setProperty(parentToChildNp.name, onlyChild);
              onlyChild.setProperty(childToParentNp.name, entity);
            } else {
              var currentChildren = entity.getProperty(parentToChildNp.name);
              unattachedChildren.forEach(function (child) {
                currentChildren.push(child);
                child.setProperty(childToParentNp.name, entity);
              });
            }
          } else {
            // unidirectional
            // if (np.isScalar || np.parentType !== entity.entityType) {
            if (np.isScalar) {
              // n -> 1  eg: child: OrderDetail parent: Product
              // 1 -> 1 eg child: Employee parent: Employee ( only Manager, no DirectReports property)
              childToParentNp = np;
              unattachedChildren.forEach(function (child) {
                child.setProperty(childToParentNp.name, entity);
              });
            } else {
              // 1 -> n  eg: parent: Region child: Terr
              // TODO: need to remove unattached children from the map after this; only a perf issue.
              parentToChildNp = np;
              var currentChildren = entity.getProperty(parentToChildNp.name);
              unattachedChildren.forEach(function (child) {
                // we know if can't already be there.
                currentChildren._push(child);
              });
            }
          }
          unattachedMap.removeChildren(entityKey, childToParentNp);
        });
      }


      // now add to unattachedMap if needed.
      entity.entityType.navigationProperties.forEach(function (np) {
        if (np.isScalar) {
          var value = entity.getProperty(np.name);
          // property is already linked up
          if (value) return;
        }

        // first determine if np contains a parent or child
        // having a parentKey means that this is a child
        // if a parent then no need for more work because children will attach to it.
        var parentKey = entityAspect.getParentKey(np);
        if (parentKey) {
          // check for empty keys - meaning that parent id's are not yet set.
          if (parentKey._isEmpty()) return;
          // if a child - look for parent in the em cache
          var parent = em.findEntityByKey(parentKey);
          if (parent) {
            // if found hook it up
            entity.setProperty(np.name, parent);
          } else {
            // else add parent to unresolvedParentMap;
            unattachedMap.addChild(parentKey, np, entity);
          }
        }
      });

      // handle unidirectional 1-x where we set x.fk
      entity.entityType.foreignKeyProperties.forEach(function (fkProp) {
        var invNp = fkProp.inverseNavigationProperty;
        if (!invNp) return;
        // unidirectional fk props only
        var fkValue = entity.getProperty(fkProp.name);
        var parentKey = new EntityKey(invNp.parentType, [fkValue]);
        var parent = em.findEntityByKey(parentKey);

        if (parent) {
          if (invNp.isScalar) {
            parent.setProperty(invNp.name, entity);
          } else {
            if (em.isLoading) {
              parent.getProperty(invNp.name)._push(entity);
            } else {
              parent.getProperty(invNp.name).push(entity);
            }
          }
        } else {
          // else add parent to unresolvedParentMap;
          unattachedMap.addChild(parentKey, invNp, entity);
        }
      });
    });
  };

  // private fns

  // takes in entityTypes as either strings or entityTypes or arrays of either
  // and returns either an entityType or an array of entityTypes or throws an error
  function checkEntityTypes(em, entityTypes) {
    assertParam(entityTypes, "entityTypes").isString().isOptional().or().isNonEmptyArray().isString()
        .or().isInstanceOf(EntityType).or().isNonEmptyArray().isInstanceOf(EntityType).check();
    if (typeof entityTypes === "string") {
      entityTypes = em.metadataStore._getEntityType(entityTypes, false);
    } else if (Array.isArray(entityTypes) && typeof entityTypes[0] === "string") {
      entityTypes = entityTypes.map(function (etName) {
        return em.metadataStore._getEntityType(etName, false);
      });
    }
    return entityTypes;
  }

  function getChangesCore(em, entityTypes) {
    var entityGroups = getEntityGroups(em, entityTypes);

    // TODO: think about writing a core.mapMany method if we see more of these.
    var selected;
    entityGroups.forEach(function (eg) {
      // eg may be undefined or null
      if (!eg) return;
      var entities = eg.getChanges();
      if (selected) {
        selected.push.apply(selected, entities);
      } else {
        selected = entities;
      }
    });
    return selected || [];
  }

  function getEntitiesCore(em, entityTypes, entityStates) {
    var entityGroups = getEntityGroups(em, entityTypes);

    // TODO: think about writing a core.mapMany method if we see more of these.
    var selected;
    entityGroups.forEach(function (eg) {
      // eg may be undefined or null
      if (!eg) return;
      var entities = eg.getEntities(entityStates);
      if (selected) {
        selected.push.apply(selected, entities);
      } else {
        selected = entities;
      }
    });
    return selected || [];
  }

  function createEntityKey(em, args) {
    try {
      if (args[0] instanceof EntityKey) {
        return { entityKey: args[0], remainingArgs: __arraySlice(args, 1) };
      } else if (args.length >= 2) {
        var entityType = (typeof args[0] === 'string') ? em.metadataStore._getEntityType(args[0], false) : args[0];
        return { entityKey: new EntityKey(entityType, args[1]), remainingArgs: __arraySlice(args, 2) };
      }
    } catch (e) {/* throw below */
    }
    throw new Error("Must supply an EntityKey OR an EntityType name or EntityType followed by a key value or an array of key values.");
  }

  function markIsBeingSaved(entities, flag) {
    entities.forEach(function (entity) {
      entity.entityAspect.isBeingSaved = flag;
    });
  }

  function exportEntityGroups(em, entities) {
    var entityGroupMap;
    var first = entities && entities[0];
    if (first) {
      // group entities by entityType and
      // create 'groups' that look like entityGroups.
      entityGroupMap = {};
      if (first.entityType) {
        // assume "entities" is an array of entities;
        entities.forEach(function (e) {
          if (e.entityAspect.entityState == EntityState.Detached) {
            throw new Error("Unable to export an entity with an EntityState of 'Detached'");
          }
          var group = entityGroupMap[e.entityType.name];
          if (!group) {
            group = {};
            group.entityType = e.entityType;
            group._entities = [];
            entityGroupMap[e.entityType.name] = group;
          }
          group._entities.push(e);
        });
      } else {
        // assume "entities" is an array of EntityTypes (or names)
        var entityTypes = checkEntityTypes(em, entities)
        entityTypes.forEach(function(et){
          var group = em._entityGroupMap[et.name];
          if (group && group._entities.length) {
            entityGroupMap[et.name] = group;
          }
        })
      }
    } else {
      entityGroupMap = em._entityGroupMap;
    }

    var tempKeys = [];
    var newGroupMap = {};
    __objectForEach(entityGroupMap, function (entityTypeName, entityGroup) {
      newGroupMap[entityTypeName] = exportEntityGroup(entityGroup, tempKeys);
    });

    return { entityGroupMap: newGroupMap, tempKeys: tempKeys };
  }

  function exportEntityGroup(entityGroup, tempKeys) {
    var resultGroup = {};
    var entityType = entityGroup.entityType;
    var dps = entityType.dataProperties;
    var serializerFn = getSerializerFn(entityType);
    var rawEntities = [];
    entityGroup._entities.forEach(function (entity) {
      if (entity) {
        var rawEntity = structuralObjectToJson(entity, dps, serializerFn, tempKeys);
        rawEntities.push(rawEntity);
      }
    });
    resultGroup.entities = rawEntities;
    return resultGroup;
  }

  function structuralObjectToJson(so, dps, serializerFn, tempKeys) {

    var result = {};
    dps.forEach(function (dp) {
      var dpName = dp.name;
      var value = so.getProperty(dpName);
      if (value == null && dp.defaultValue == null) return;

      if (value && dp.isComplexProperty) {
        var coDps = dp.dataType.dataProperties;
        value = __map(value, function (v) {
          return structuralObjectToJson(v, coDps, serializerFn);
        });
      } else {
        value = serializerFn ? serializerFn(dp, value) : value;
        if (dp.isUnmapped) {
          value = __toJSONSafe(value);
        }
      }
      if (value === undefined) return;
      result[dpName] = value;
    });
    var aspect, newAspect;
    if (so.entityAspect) {
      aspect = so.entityAspect;
      var entityState = aspect.entityState;
      newAspect = {
        tempNavPropNames: exportTempKeyInfo(aspect, tempKeys),
        entityState: entityState.name
      };
      if (aspect.extraMetadata) {
        newAspect.extraMetadata = aspect.extraMetadata;
      }
      if (entityState.isModified() || entityState.isDeleted()) {
        newAspect.originalValuesMap = aspect.originalValues;
      }
      result.entityAspect = newAspect;
    } else {
      aspect = so.complexAspect;
      newAspect = {};
      if (aspect.originalValues && !__isEmpty(aspect.originalValues)) {
        newAspect.originalValuesMap = aspect.originalValues;
      }

      result.complexAspect = newAspect;
    }

    return result;
  }

  function exportTempKeyInfo(entityAspect, tempKeys) {
    var entity = entityAspect.entity;
    if (entityAspect.hasTempKey) {
      tempKeys.push(entityAspect.getKey().toJSON());
    }
    // create map for this entity with foreignKeys that are 'temporary'
    // map -> key: tempKey, value: fkPropName
    var tempNavPropNames;
    entity.entityType.navigationProperties.forEach(function (np) {
      if (np.relatedDataProperties) {
        var relatedValue = entity.getProperty(np.name);
        if (relatedValue && relatedValue.entityAspect.hasTempKey) {
          tempNavPropNames = tempNavPropNames || [];
          tempNavPropNames.push(np.name);
        }
      }
    });
    return tempNavPropNames;
  }

  function importEntityGroup(entityGroup, jsonGroup, config) {

    var tempKeyMap = config.tempKeyMap;

    var entityType = entityGroup.entityType;
    var mergeStrategy = config.mergeStrategy;

    var targetEntity = null;

    var em = entityGroup.entityManager;
    var entityChanged = em.entityChanged;
    var entitiesToLink = [];
    var rawValueFn = DataProperty.getRawValueFromClient;
    jsonGroup.entities.forEach(function (rawEntity) {
      var newAspect = rawEntity.entityAspect;

      var entityKey = entityType.getEntityKeyFromRawEntity(rawEntity, rawValueFn);
      var entityState = EntityState.fromName(newAspect.entityState);
      if (!entityState || entityState == EntityState.Detached ) {
        throw new Error("Only entities with a non detached entity state may be imported.");
      }

      // Merge if raw entity is in cache
      // UNLESS this is a new entity w/ a temp key
      // Cannot safely merge such entities even
      // if could match temp key to an entity in cache.
      var newTempKey = entityState.isAdded() && getMappedKey(tempKeyMap, entityKey);
      targetEntity = newTempKey ? null : entityGroup.findEntityByKey(entityKey);

      if (targetEntity) {
        if (mergeStrategy === MergeStrategy.SkipMerge) {
          // deliberate fall thru
        } else if (mergeStrategy === MergeStrategy.Disallowed) {
          throw new Error("A MergeStrategy of 'Disallowed' prevents " + entityKey.toString() + " from being merged");
        } else {
          var targetEntityState = targetEntity.entityAspect.entityState;
          var wasUnchanged = targetEntityState.isUnchanged();
          if (mergeStrategy === MergeStrategy.OverwriteChanges || wasUnchanged) {
            entityType._updateTargetFromRaw(targetEntity, rawEntity, rawValueFn);
            targetEntity.entityAspect.setEntityState(entityState);
            entityChanged.publish({ entityAction: EntityAction.MergeOnImport, entity: targetEntity });
          }
        }
      } else {
        targetEntity = entityType._createInstanceCore();
        entityType._updateTargetFromRaw(targetEntity, rawEntity, rawValueFn);
        if (newTempKey) {
          targetEntity.entityAspect.hasTempKey = true;
          // fixup pk
          targetEntity.setProperty(entityType.keyProperties[0].name, newTempKey.values[0]);

          // fixup foreign keys
          // This is safe because the entity is detached here and therefore originalValues will not be updated.
          if (newAspect.tempNavPropNames) {
            newAspect.tempNavPropNames.forEach(function (npName) {
              var np = entityType.getNavigationProperty(npName);
              var fkPropName = np.relatedDataProperties[0].name;
              var oldFkValue = targetEntity.getProperty(fkPropName);
              var fk = new EntityKey(np.entityType, [oldFkValue]);
              var newFk = getMappedKey(tempKeyMap, fk);
              targetEntity.setProperty(fkPropName, newFk.values[0]);
            });
          }
        }
        // Now performed in attachEntity
        targetEntity = entityGroup.attachEntity(targetEntity, entityState);
        entityChanged.publish({ entityAction: EntityAction.AttachOnImport, entity: targetEntity });
        if (!entityState.isUnchanged()) {
          em._notifyStateChange(targetEntity, true);
        }

      }

      entitiesToLink.push(targetEntity);
    });
    return entitiesToLink;
  }

  function getMappedKey(tempKeyMap, entityKey) {
    var newKey = tempKeyMap[entityKey.toString()];
    if (newKey) return newKey;
    var subtypes = entityKey._subtypes;
    if (!subtypes) return null;
    for (var i = 0, j = subtypes.length; i < j; i++) {
      newKey = tempKeyMap[entityKey.toString(subtypes[i])];
      if (newKey) return newKey;
    }
    return null;
  }

  function promiseWithCallbacks(promise, callback, errorCallback) {
    promise = promise.then(function (data) {
      if (callback) callback(data);
      return Q.resolve(data);
    }, function (error) {
      if (errorCallback) errorCallback(error);
      return Q.reject(error);
    });
    return promise;
  }

  function getEntitiesToSave(em, entities) {
    var entitiesToSave;
    if (entities) {
      entitiesToSave = entities.filter(function (e) {
        if (e.entityAspect.entityManager !== em) {
          throw new Error("Only entities in this entityManager may be saved");
        }
        return !e.entityAspect.entityState.isDetached();
      });
    } else {
      entitiesToSave = em.getChanges();
    }
    return entitiesToSave;
  }

  function fixupKeys(em, keyMappings) {
    em._inKeyFixup = true;
    keyMappings.forEach(function (km) {
      var group = em._entityGroupMap[km.entityTypeName];
      if (!group) {
        throw new Error("Unable to locate the following fully qualified EntityType name: " + km.entityTypeName);
      }
      group._fixupKey(km.tempValue, km.realValue);
    });
    em._inKeyFixup = false;
  }

  function getEntityGroups(em, entityTypes) {
    var groupMap = em._entityGroupMap;
    if (entityTypes) {
      return __toArray(entityTypes).map(function (et) {
        if (et instanceof EntityType) {
          return groupMap[et.name];
        } else {
          throw new Error("The EntityManager.getChanges() 'entityTypes' parameter must be either an entityType or an array of entityTypes or null");
        }
      });
    } else {
      return __getOwnPropertyValues(groupMap);
    }
  }

  function checkEntityKey(em, entity) {
    var ek = entity.entityAspect.getKey();
    // return properties that are = to defaultValues
    var keyPropsWithDefaultValues = __arrayZip(entity.entityType.keyProperties, ek.values, function (kp, kv) {
      return (kp.defaultValue === kv) ? kp : null;
    }).filter(function (kp) {
      return kp !== null;
    });
    if (keyPropsWithDefaultValues.length) {
      if (entity.entityType.autoGeneratedKeyType !== AutoGeneratedKeyType.None) {
        em.generateTempKeyValue(entity);
      } else {
        // we will allow attaches of entities where only part of the key is set.
        if (keyPropsWithDefaultValues.length === ek.values.length) {
          throw new Error("Cannot attach an object of type  (" + entity.entityType.name + ") to an EntityManager without first setting its key or setting its entityType 'AutoGeneratedKeyType' property to something other than 'None'");
        }
      }
    }
  }

  function validateEntityStates(em, entityStates) {
    if (!entityStates) return null;
    entityStates = __toArray(entityStates);
    entityStates.forEach(function (es) {
      if (!EntityState.contains(es)) {
        throw new Error("The EntityManager.getChanges() 'entityStates' parameter must either be null, an entityState or an array of entityStates");
      }
    });
    return entityStates;
  }

  proto._attachEntityCore = function (entity, entityState, mergeStrategy) {
    var group = findOrCreateEntityGroup(this, entity.entityType);
    var attachedEntity = group.attachEntity(entity, entityState, mergeStrategy);
    this._linkRelatedEntities(attachedEntity);
    return attachedEntity;
  }

  proto._updateFkVal = function (fkProp, oldValue, newValue) {
    var group = this._entityGroupMap[fkProp.parentType.name];
    if (!group) return;
    group._updateFkVal(fkProp, oldValue, newValue);
  }

  function attachRelatedEntities(em, entity, entityState, mergeStrategy) {
    var navProps = entity.entityType.navigationProperties;
    navProps.forEach(function (np) {
      var related = entity.getProperty(np.name);
      if (np.isScalar) {
        if (!related) return;
        em.attachEntity(related, entityState, mergeStrategy);
      } else {
        related.forEach(function (e) {
          em.attachEntity(e, entityState, mergeStrategy);
        });
      }
    });
  }

  // returns a promise
  function executeQueryCore(em, query, queryOptions, dataService) {
    try {
      var results;
      var metadataStore = em.metadataStore;

      if (metadataStore.isEmpty() && dataService.hasServerMetadata) {
        throw new Error("cannot execute _executeQueryCore until metadataStore is populated.");
      }

      if (queryOptions.fetchStrategy === FetchStrategy.FromLocalCache) {
        try {
          var qr = executeQueryLocallyCore(em, query);
          return Q.resolve({ results: qr.results, entityManager: em, inlineCount: qr.inlineCount, query: query });
        } catch (e) {
          return Q.reject(e);
        }
      }

      var mappingContext = new MappingContext({
        query: query,
        entityManager: em,
        dataService: dataService,
        mergeOptions: {
          mergeStrategy: queryOptions.mergeStrategy,
          noTracking: !!query.noTrackingEnabled,
          includeDeleted: queryOptions.includeDeleted
        }
      });

      var validateOnQuery = em.validationOptions.validateOnQuery;

      return dataService.adapterInstance.executeQuery(mappingContext).then(function (data) {
        var result = __wrapExecution(function () {
          var state = { isLoading: em.isLoading };
          em.isLoading = true;
          em._pendingPubs = [];
          return state;
        }, function (state) {
          // cleanup
          em.isLoading = state.isLoading;
          em._pendingPubs.forEach(function (fn) {
            fn();
          });
          em._pendingPubs = null;
          em._hasChangesAction && em._hasChangesAction();
          // HACK for GC
          query = null;
          mappingContext = null;
          // HACK: some errors thrown in next function do not propogate properly - this catches them.

          if (state.error) {
            Q.reject(state.error);
          }

        }, function () {
          var nodes = dataService.jsonResultsAdapter.extractResults(data);
          nodes = __toArray(nodes);

          results = mappingContext.visitAndMerge(nodes, { nodeType: "root" });
          if (validateOnQuery) {
            results.forEach(function (r) {
              // anon types and simple types will not have an entityAspect.
              r.entityAspect && r.entityAspect.validateEntity();
            });
          }
          mappingContext.processDeferred();
          // if query has expand clauses walk each of the 'results' and mark the expanded props as loaded.
          markLoadedNavProps(results, query);
          var retrievedEntities = __objectMap(mappingContext.refMap);
          return { results: results, query: query, entityManager: em, httpResponse: data.httpResponse, inlineCount: data.inlineCount, retrievedEntities: retrievedEntities };
        });
        return Q.resolve(result);
      }, function (e) {
        if (e) {
          e.query = query;
          e.entityManager = em;
        }
        return Q.reject(e);
      });

    } catch (e) {
      if (e) {
        e.query = query;
      }
      return Q.reject(e);
    }
  }

  function markLoadedNavProps(entities, query) {
    if (query.noTrackingEnabled) return;
    var expandClause = query.expandClause;
    if (expandClause == null) return;
    expandClause.propertyPaths.forEach(function (propertyPath) {
      var propNames = propertyPath.split('.');
      markLoadedNavPath(entities, propNames);
    });
  }

  function markLoadedNavPath(entities, propNames) {
    var propName = propNames[0];
    entities.forEach(function (entity) {
      var ea = entity.entityAspect;
      if (!ea) return; // entity may not be a 'real' entity in the case of a projection.
      ea._markAsLoaded(propName);
      if (propNames.length === 1) return;
      var next = entity.getProperty(propName);
      if (!next) return; // no children to process.
      // strange logic because nonscalar nav values are NOT really arrays
      // otherwise we could use Array.isArray
      if (!next.arrayChanged) next = [next];
      markLoadedNavPath(next, propNames.slice(1));
    });
  }

  function updateConcurrencyProperties(entities) {
    var candidates = entities.filter(function (e) {
      e.entityAspect.isBeingSaved = true;
      return e.entityAspect.entityState.isModified()
          && e.entityType.concurrencyProperties.length > 0;

    });
    if (candidates.length === 0) return;
    candidates.forEach(function (c) {
      c.entityType.concurrencyProperties.forEach(function (cp) {
        updateConcurrencyProperty(c, cp);
      });
    });
  }

  function updateConcurrencyProperty(entity, property) {
    // check if property has already been updated
    if (entity.entityAspect.originalValues[property.name]) return;
    var value = entity.getProperty(property.name);
    if (!value) value = property.dataType.defaultValue;
    if (property.dataType.isNumeric) {
      entity.setProperty(property.name, value + 1);
    } else if (property.dataType.isDate) {
      // use the current datetime but insure that it
      // is different from previous call.
      var dt = new Date();
      var dt2 = new Date();
      while (dt.getTime() === dt2.getTime()) {
        dt2 = new Date();
      }
      entity.setProperty(property.name, dt2);
    } else if (property.dataType === DataType.Guid) {
      entity.setProperty(property.name, __getUuid());
    } else if (property.dataType === DataType.Binary) {
      // best guess - that this is a timestamp column and is computed on the server during save
      // - so no need to set it here.
      return;
    } else {
      // this just leaves DataTypes of Boolean, String and Byte - none of which should be the
      // type for a concurrency column.
      // NOTE: thought about just returning here but would rather be safe for now.
      throw new Error("Unable to update the value of concurrency property before saving: " + property.name);
    }
  }


  function findOrCreateEntityGroup(em, entityType) {
    var group = em._entityGroupMap[entityType.name];
    if (!group) {
      group = new EntityGroup(em, entityType);
      em._entityGroupMap[entityType.name] = group;
    }
    return group;
  }

  function findOrCreateEntityGroups(em, entityType) {
    var entityTypes = entityType.getSelfAndSubtypes();
    return entityTypes.map(function (et) {
      return findOrCreateEntityGroup(em, et);
    });
  }


  proto.helper = {
    unwrapInstance: unwrapInstance,
    unwrapOriginalValues: unwrapOriginalValues,
    unwrapChangedValues: unwrapChangedValues
  };


  function unwrapInstance(structObj, transformFn) {

    var rawObject = {};
    var stype = structObj.entityType || structObj.complexType;
    var serializerFn = getSerializerFn(stype);
    var unmapped = {};
    stype.dataProperties.forEach(function (dp) {
      if (dp.isComplexProperty) {
        rawObject[dp.nameOnServer] = __map(structObj.getProperty(dp.name), function (co) {
          return unwrapInstance(co, transformFn);
        });
      } else {
        var val = structObj.getProperty(dp.name);
        val = transformFn ? transformFn(dp, val) : val;
        if (val === undefined) return;
        val = serializerFn ? serializerFn(dp, val) : val;
        if (val !== undefined) {
          if (dp.isUnmapped) {
            unmapped[dp.nameOnServer] = __toJSONSafe(val);
          } else {
            rawObject[dp.nameOnServer] = val;
          }
        }
      }
    });

    if (!__isEmpty(unmapped)) {
      rawObject.__unmapped = unmapped;
    }
    return rawObject;
  }

  function unwrapOriginalValues(target, metadataStore, transformFn) {
    var stype = target.entityType || target.complexType;
    var aspect = target.entityAspect || target.complexAspect;
    var fn = metadataStore.namingConvention.clientPropertyNameToServer;
    var result = {};
    __objectForEach(aspect.originalValues, function (propName, val) {
      var prop = stype.getProperty(propName);
      val = transformFn ? transformFn(prop, val) : val;
      if (val !== undefined) {
        result[fn(propName, prop)] = val;
      }
    });
    stype.complexProperties.forEach(function (cp) {
      var nextTarget = target.getProperty(cp.name);
      if (cp.isScalar) {
        var unwrappedCo = unwrapOriginalValues(nextTarget, metadataStore, transformFn);
        if (!__isEmpty(unwrappedCo)) {
          result[fn(cp.name, cp)] = unwrappedCo;
        }
      } else {
        var unwrappedCos = nextTarget.map(function (item) {
          return unwrapOriginalValues(item, metadataStore, transformFn);
        });
        result[fn(cp.name, cp)] = unwrappedCos;
      }
    });
    return result;
  }

  function unwrapChangedValues(entity, metadataStore, transformFn) {
    var stype = entity.entityType;
    var serializerFn = getSerializerFn(stype);
    var fn = metadataStore.namingConvention.clientPropertyNameToServer;
    var result = {};
    __objectForEach(entity.entityAspect.originalValues, function (propName, value) {
      var prop = stype.getProperty(propName);
      var val = entity.getProperty(propName);
      val = transformFn ? transformFn(prop, val) : val;
      if (val === undefined) return;
      val = serializerFn ? serializerFn(prop, val) : val;
      if (val !== undefined) {
        result[fn(propName, prop)] = val;
      }
    });
    // any change to any complex object or array of complex objects returns the ENTIRE
    // current complex object or complex object array.  This is by design. Complex Objects
    // are atomic.
    stype.complexProperties.forEach(function (cp) {
      if (cpHasOriginalValues(entity, cp)) {
        var coOrCos = entity.getProperty(cp.name);
        result[fn(cp.name, cp)] = __map(coOrCos, function (co) {
          return unwrapInstance(co, transformFn);
        });
      }
    });
    return result;
  }

  function cpHasOriginalValues(structuralObject, cp) {
    var coOrCos = structuralObject.getProperty(cp.name);
    if (cp.isScalar) {
      return coHasOriginalValues(coOrCos);
    } else {
      // this occurs when a nonscalar co array has had cos added or removed.
      if (coOrCos._origValues) return true;
      return coOrCos.some(function (co) {
        return coHasOriginalValues(co);
      });
    }
  }

  function coHasOriginalValues(co) {
    // next line checks all non complex properties of the co.
    if (!__isEmpty(co.complexAspect.originalValues)) return true;
    // now need to recursively check each of the cps
    return co.complexType.complexProperties.some(function (cp) {
      return cpHasOriginalValues(co, cp);
    });
  }

  function getSerializerFn(stype) {
    return stype.serializerFn || (stype.metadataStore && stype.metadataStore.serializerFn);
  }


  function UnattachedChildrenMap() {
    // key is EntityKey.toString(), value is array of { navigationProperty, children }
    this.map = {};
  }

  UnattachedChildrenMap.prototype.addChild = function (parentEntityKey, navigationProperty, child) {
    var tuple = this.getTuple(parentEntityKey, navigationProperty);
    if (!tuple) {
      tuple = { navigationProperty: navigationProperty, children: [] };
      __getArray(this.map, parentEntityKey.toString()).push(tuple);
    }
    tuple.children.push(child);
  };

  UnattachedChildrenMap.prototype.removeChildren = function (parentEntityKey, navigationProperty) {
    var tuples = this.getTuples(parentEntityKey);
    if (!tuples) return;
    __arrayRemoveItem(tuples, function (t) {
      return t.navigationProperty === navigationProperty;
    });
    if (!tuples.length) {
      delete this.map[parentEntityKey.toString()];
    }
  };

  UnattachedChildrenMap.prototype.getChildren = function (parentEntityKey, navigationProperty) {
    var tuple = this.getTuple(parentEntityKey, navigationProperty);
    if (tuple) {
      return tuple.children.filter(function (child) {
        // it may have later been detached.
        return !child.entityAspect.entityState.isDetached();
      });
    } else {
      return null;
    }
  };

  UnattachedChildrenMap.prototype.getTuple = function (parentEntityKey, navigationProperty) {
    var tuples = this.getTuples(parentEntityKey);
    if (!tuples) return null;
    var tuple = __arrayFirst(tuples, function (t) {
      return t.navigationProperty === navigationProperty;
    });
    return tuple;
  };


  UnattachedChildrenMap.prototype.getTuples = function (parentEntityKey) {
    var tuples = this.map[parentEntityKey.toString()];
    var entityType = parentEntityKey.entityType;
    while (!tuples && entityType.baseEntityType) {
      entityType = entityType.baseEntityType;
      var baseKey = parentEntityKey.toString(entityType);
      tuples = this.map[baseKey];
    }
    return tuples;
  };

  return ctor;
})();


// expose
breeze.EntityManager = EntityManager;

;/**
 @module breeze
 **/

// Internal helper class

var MappingContext = (function () {

  var ctor = function MappingContext(config) {

    __extend(this, config, [
      "query", "entityManager", "dataService", "mergeOptions"
    ]);

    // calc'd props
    this.refMap = {};
    this.deferredFns = [];
    this.jsonResultsAdapter = this.dataService.jsonResultsAdapter;
    this.metadataStore = this.entityManager.metadataStore;
    this.rawValueFn = DataProperty.getRawValueFromServer; // think about passing this in later.
  };

  var proto = ctor.prototype;
  var parseRawValue = DataType.parseRawValue;
  proto._$typeName = "MappingContext";

  proto.getUrl = function () {
    var query = this.query;
    if (!query) {
      throw new Error("query cannot be empty");
    }
    var uriString;
    if (typeof query === 'string') {
      uriString = query;
    } else if (query instanceof EntityQuery) {
      uriString = this.dataService.uriBuilder.buildUri(query, this.metadataStore);
    } else {
      throw new Error("unable to recognize query parameter as either a string or an EntityQuery");
    }
    return  this.dataService.qualifyUrl(uriString);
  }

  proto.visitAndMerge = function (nodes, nodeContext) {
    var query = this.query;
    var jra = this.jsonResultsAdapter;
    nodeContext = nodeContext || {};
    var that = this;
    return __map(nodes, function (node) {
      if (query == null && node.entityAspect) {
        // don't bother merging a result from a save that was not returned from the server.
        if (node.entityAspect.entityState.isDeleted()) {
          that.entityManager.detachEntity(node);
        } else {
          node.entityAspect.acceptChanges();
        }
        return node;
      }

      var meta = jra.visitNode(node, that, nodeContext) || {};
      node = meta.node || node;
      if (query && nodeContext.nodeType === "root" && !meta.entityType) {
        meta.entityType = query._getToEntityType && query._getToEntityType(that.metadataStore);
      }
      return processMeta(that, node, meta);
    }, this.mergeOptions.includeDeleted);
  };

  proto.processDeferred = function () {
    if (this.deferredFns.length > 0) {
      this.deferredFns.forEach(function (fn) {
        fn();
      });
    }
  }

  function processMeta(mc, node, meta, assignFn) {
    // == is deliberate here instead of ===
    if (meta.ignore || node == null) {
      return null;
    } else if (meta.nodeRefId) {
      var refValue = resolveEntityRef(mc, meta.nodeRefId);
      if (typeof refValue === "function" && assignFn != null) {
        mc.deferredFns.push(function () {
          assignFn(refValue);
        });
        return undefined; // deferred and will be set later;
      }
      return refValue;
    } else if (meta.entityType) {
      var entityType = meta.entityType;
      if (mc.mergeOptions.noTracking) {
        node = processNoMerge(mc, entityType, node);
        if (entityType.noTrackingFn) {
          node = entityType.noTrackingFn(node, entityType);
        }
        if (meta.nodeId) {
          mc.refMap[meta.nodeId] = node;
        }
        return node;
      } else {
        if (entityType.isComplexType) {
          // because we still need to do serverName to client name processing
          return processNoMerge(mc, entityType, node);
        } else {
          return mergeEntity(mc, node, meta);
        }
      }
    } else {

      if ((!meta.passThru) && typeof node === 'object' && !__isDate(node)) {
        node = processAnonType(mc, node);
      }

      // updating the refMap for entities is handled by updateEntityRef for entities.
      if (meta.nodeId) {
        mc.refMap[meta.nodeId] = node;
      }
      return node;
    }
  }

  function processNoMerge(mc, stype, node) {
    var result = {};

    stype.dataProperties.forEach(function (dp) {
      if (dp.isComplexProperty) {
        result[dp.name] = __map(node[dp.nameOnServer], function (v) {
          return processNoMerge(mc, dp.dataType, v);
        });
      } else {
        result[dp.name] = parseRawValue(node[dp.nameOnServer], dp.dataType);
      }
    });

    stype.navigationProperties && stype.navigationProperties.forEach(function (np) {
      var nodeContext = { nodeType: "navProp", navigationProperty: np };
      visitNode(node[np.nameOnServer], mc, nodeContext, result, np.name);
    });

    return result;
  }

  function processAnonType(mc, node) {
    // node is guaranteed to be an object by this point, i.e. not a scalar
    var keyFn = mc.metadataStore.namingConvention.serverPropertyNameToClient;
    var result = {};

    __objectForEach(node, function (key, value) {
      var newKey = keyFn(key);
      var nodeContext = { nodeType: "anonProp", propertyName: newKey };
      visitNode(value, mc, nodeContext, result, newKey);
    });
    return result;
  }

  function visitNode(node, mc, nodeContext, result, key) {
    var jra = mc.jsonResultsAdapter;
    var meta = jra.visitNode(node, mc, nodeContext) || {};
    // allows visitNode to change the value;
    node = meta.node || node;

    if (meta.ignore) return;
    if (meta.passThru) return node;
    if (Array.isArray(node)) {
      nodeContext.nodeType = nodeContext.nodeType + "Item";
      result[key] = node.map(function (v, ix) {
        meta = jra.visitNode(v, mc, nodeContext) || {};
        v = meta.node || v;
        return processMeta(mc, v, meta, function (refValue) {
          result[key][ix] = refValue();
        });
      });
    } else {
      result[key] = processMeta(mc, node, meta, function (refValue) {
        result[key] = refValue();
      });
    }
  }

  function resolveEntityRef(mc, nodeRefId) {
    var entity = mc.refMap[nodeRefId];
    if (entity === undefined) {
      return function () {
        return mc.refMap[nodeRefId];
      };
    } else {
      return entity;
    }
  }

  function updateEntityRef(mc, targetEntity, node) {
    var nodeId = node._$meta.nodeId;
    if (nodeId != null) {
      mc.refMap[nodeId] = targetEntity;
    }
  }

  // can return null for a deleted entity if includeDeleted == false
  function mergeEntity(mc, node, meta) {
    node._$meta = meta;
    var em = mc.entityManager;

    var entityType = meta.entityType;
    if (typeof (entityType) === 'string') {
      entityType = mc.metadataStore._getEntityType(entityType, false);
    }
    node.entityType = entityType;

    var mergeStrategy = mc.mergeOptions.mergeStrategy;
    var isSaving = mc.query == null;

    var entityKey = entityType.getEntityKeyFromRawEntity(node, mc.rawValueFn);
    var targetEntity = em.findEntityByKey(entityKey);
    if (targetEntity) {
      if (isSaving && targetEntity.entityAspect.entityState.isDeleted()) {
        em.detachEntity(targetEntity);
        return targetEntity;
      }
      var targetEntityState = targetEntity.entityAspect.entityState;
      if (mergeStrategy === MergeStrategy.Disallowed) {
        throw new Error("A MergeStrategy of 'Disallowed' prevents " + entityKey.toString() + " from being merged");
      } else if (mergeStrategy === MergeStrategy.SkipMerge) {
        updateEntityNoMerge(mc, targetEntity, node);
      } else {
        if (mergeStrategy === MergeStrategy.OverwriteChanges
            || targetEntityState.isUnchanged()) {
          updateEntity(mc, targetEntity, node);
          targetEntity.entityAspect.wasLoaded = true;
          if (meta.extraMetadata) {
            targetEntity.entityAspect.extraMetadata = meta.extraMetadata;
          }
          targetEntity.entityAspect.entityState = EntityState.Unchanged;
          targetEntity.entityAspect.originalValues = {};
          targetEntity.entityAspect.propertyChanged.publish({ entity: targetEntity, propertyName: null });
          var action = isSaving ? EntityAction.MergeOnSave : EntityAction.MergeOnQuery;
          em.entityChanged.publish({ entityAction: action, entity: targetEntity });
          // this is needed to handle an overwrite of a modified entity with an unchanged entity
          // which might in turn cause _hasChanges to change.
          if (!targetEntityState.isUnchanged()) {
            em._notifyStateChange(targetEntity, false);
          }
        } else {
          if (targetEntityState == EntityState.Deleted && !mc.mergeOptions.includeDeleted) {
            return null;
          }
          updateEntityNoMerge(mc, targetEntity, node);
        }
      }
    } else {
      targetEntity = entityType._createInstanceCore();

      updateEntity(mc, targetEntity, node);

      if (meta.extraMetadata) {
        targetEntity.entityAspect.extraMetadata = meta.extraMetadata;
      }
      // em._attachEntityCore(targetEntity, EntityState.Unchanged, MergeStrategy.Disallowed);
      em._attachEntityCore(targetEntity, EntityState.Unchanged, mergeStrategy);
      targetEntity.entityAspect.wasLoaded = true;
      em.entityChanged.publish({ entityAction: EntityAction.AttachOnQuery, entity: targetEntity });
    }
    return targetEntity;
  }

  function updateEntityNoMerge(mc, targetEntity, node) {
    updateEntityRef(mc, targetEntity, node);
    // we still need to merge related entities even if top level entity wasn't modified.
    node.entityType.navigationProperties.forEach(function (np) {
      if (np.isScalar) {
        mergeRelatedEntityCore(mc, node, np);
      } else {
        mergeRelatedEntitiesCore(mc, node, np);
      }
    });
  }

  function updateEntity(mc, targetEntity, node) {
    updateEntityRef(mc, targetEntity, node);
    var entityType = targetEntity.entityType;
    entityType._updateTargetFromRaw(targetEntity, node, mc.rawValueFn);

    entityType.navigationProperties.forEach(function (np) {
      if (np.isScalar) {
        mergeRelatedEntity(mc, np, targetEntity, node);
      } else {
        mergeRelatedEntities(mc, np, targetEntity, node);
      }
    });
  }

  function mergeRelatedEntity(mc, navigationProperty, targetEntity, rawEntity) {

    var relatedEntity = mergeRelatedEntityCore(mc, rawEntity, navigationProperty);
    if (relatedEntity == null) return;
    if (typeof relatedEntity === 'function') {
      mc.deferredFns.push(function () {
        relatedEntity = relatedEntity();
        updateRelatedEntity(relatedEntity, targetEntity, navigationProperty);
      });
    } else {
      updateRelatedEntity(relatedEntity, targetEntity, navigationProperty);
    }
  }

  function mergeRelatedEntities(mc, navigationProperty, targetEntity, rawEntity) {
    var relatedEntities = mergeRelatedEntitiesCore(mc, rawEntity, navigationProperty);
    if (relatedEntities == null) return;

    var inverseProperty = navigationProperty.inverse;
    if (!inverseProperty) return;

    var originalRelatedEntities = targetEntity.getProperty(navigationProperty.name);
    originalRelatedEntities.wasLoaded = true;

    relatedEntities.forEach(function (relatedEntity) {
      if (typeof relatedEntity === 'function') {
        mc.deferredFns.push(function () {
          relatedEntity = relatedEntity();
          updateRelatedEntityInCollection(relatedEntity, originalRelatedEntities, targetEntity, inverseProperty);
        });
      } else {
        updateRelatedEntityInCollection(relatedEntity, originalRelatedEntities, targetEntity, inverseProperty);
      }
    });
  }

  function mergeRelatedEntityCore(mc, rawEntity, navigationProperty) {
    var relatedRawEntity = rawEntity[navigationProperty.nameOnServer];
    if (!relatedRawEntity) return null;

    var relatedEntity = mc.visitAndMerge(relatedRawEntity, { nodeType: "navProp", navigationProperty: navigationProperty });
    return relatedEntity;
  }

  function mergeRelatedEntitiesCore(mc, rawEntity, navigationProperty) {
    var relatedRawEntities = rawEntity[navigationProperty.nameOnServer];
    if (!relatedRawEntities) return null;

    // needed if what is returned is not an array and we expect one - this happens with __deferred in OData.
    if (!Array.isArray(relatedRawEntities)) {
      // return null;
      relatedRawEntities = relatedRawEntities.results; // OData v3 will look like this with an expand
      if (!relatedRawEntities) {
        return null;
      }
    }

    var relatedEntities = mc.visitAndMerge(relatedRawEntities, { nodeType: "navPropItem", navigationProperty: navigationProperty });
    return relatedEntities;
  }

  function updateRelatedEntity(relatedEntity, targetEntity, navigationProperty) {
    if (!relatedEntity) return;
    var propName = navigationProperty.name;
    var currentRelatedEntity = targetEntity.getProperty(propName);

    // check if the related entity is already hooked up
    if (currentRelatedEntity !== relatedEntity) {
      // if not hook up both directions.
      targetEntity.setProperty(propName, relatedEntity);
      var inverseProperty = navigationProperty.inverse;
      if (!inverseProperty) return;
      if (inverseProperty.isScalar) {
        relatedEntity.setProperty(inverseProperty.name, targetEntity);
      } else {
        var collection = relatedEntity.getProperty(inverseProperty.name);
        collection.push(targetEntity);

      }
    }
  }

  function updateRelatedEntityInCollection(relatedEntity, relatedEntities, targetEntity, inverseProperty) {
    if (!relatedEntity) return;

    // check if the related entity is already hooked up
    var thisEntity = relatedEntity.getProperty(inverseProperty.name);
    if (thisEntity !== targetEntity) {
      // if not - hook it up.
      relatedEntities.push(relatedEntity);
      relatedEntity.setProperty(inverseProperty.name, targetEntity);
    }
  }


  return ctor;
})();
   


;/**
@module breeze
**/

var SaveOptions = (function () {
  /**
  A SaveOptions instance is used to specify the 'options' under which a save will occur.

  @class SaveOptions
  **/

  /**
  @method <ctor> SaveOptions
  @param config {Object}
  @param [config.allowConcurrentSaves] {Boolean} Whether multiple saves can be in-flight at the same time. The default is false.
  @param [config.resourceName] {String} Resource name to be used during the save - this defaults to "SaveChanges"
  @param [config.dataService] {DataService} The DataService to be used for this save.
  @param [config.tag] {Object} Free form value that will be sent to the server during the save.
  **/
  var ctor = function SaveOptions(config) {
    updateWithConfig(this, config);
  };

  var proto = ctor.prototype;
  proto._$typeName = "SaveOptions";

  /**
  Sets the 'defaultInstance' by creating a copy of the current 'defaultInstance' and then applying all of the properties of the current instance.
  The current instance is returned unchanged.
  @method setAsDefault
  @chainable
  **/
  proto.setAsDefault = function () {
    return __setAsDefault(this, ctor);
  };

  /**
  Whether another save can be occuring at the same time as this one - default is false.

  __readOnly__
  @property allowConcurrentSaves {Boolean}
  **/

  /**
  A {{#crossLink "DataService"}}{{/crossLink}}.
  __readOnly__
  @property dataService {DataService}
  **/

  /**
  The resource name to call to perform the save.
  __readOnly__
  @property resourceName {String}
  **/

  /**
  A free form value that will be sent to the server.

  __readOnly__
  @property tag {Object}
  **/

  /**
  The default value whenever SaveOptions are not specified.
  @property defaultInstance {SaveOptions}
  @static
  **/

  /**
  Returns a copy of this SaveOptions with the specified config options applied.
  @example
      var saveOptions = em1.saveOptions.using( {resourceName: "anotherResource" });

  @method using
  @param config {Configuration Object|} The object to apply to create a new SaveOptions.
  @param [config.allowConcurrentSaves] {Boolean} Whether multiple saves can be in-flight at the same time. The default is false.
  @param [config.resourceName] {String} Resource name to be used during the save - this defaults to "SaveChanges"
  @param [config.dataService] {DataService} The DataService to be used for this save.
  @param [config.tag] {Object} Free form value that will be sent to the server during the save.
  @chainable
  **/
  proto.using = function (config) {
    return updateWithConfig(this, config);
  };

  function updateWithConfig(obj, config) {
    if (config) {
      assertConfig(config)
          .whereParam("resourceName").isOptional().isString()
          .whereParam("dataService").isOptional().isInstanceOf(DataService)
          .whereParam("allowConcurrentSaves").isBoolean().isOptional()
          .whereParam("tag").isOptional()
          .applyAll(obj);
    }
    return obj;
  }

  ctor.defaultInstance = new ctor({ allowConcurrentSaves: false});
  return ctor;
})();

breeze.SaveOptions = SaveOptions;


;breeze.AbstractDataServiceAdapter = (function () {

  var ajaxImpl;

  var ctor = function () {
  };

  var proto = ctor.prototype; // minifies better (as seen in jQuery)

  proto.checkForRecomposition = function (interfaceInitializedArgs) {
    if (interfaceInitializedArgs.interfaceName === "ajax" && interfaceInitializedArgs.isDefault) {
      this.initialize();
    }
  };

  proto.initialize = function () {
    ajaxImpl = breeze.config.getAdapterInstance("ajax");

    // don't cache 'ajax' because then we would need to ".bind" it, and don't want to because of brower support issues.
    if (ajaxImpl && ajaxImpl.ajax) {
      return;
    }
    throw new Error("Unable to find ajax adapter for dataservice adapter '" + (this.name || '') + "'.");
  };

  proto.fetchMetadata = function (metadataStore, dataService) {
    var serviceName = dataService.serviceName;
    var url = dataService.qualifyUrl("Metadata");

    var deferred = Q.defer();

    ajaxImpl.ajax({
      type: "GET",
      url: url,
      dataType: 'json',
      success: function (httpResponse) {

        // might have been fetched by another query
        if (metadataStore.hasMetadataFor(serviceName)) {
          return deferred.resolve("already fetched");
        }
        var data = httpResponse.data;
        try {
          var metadata = typeof (data) === "string" ? JSON.parse(data) : data;
          metadataStore.importMetadata(metadata);
        } catch (e) {
          var errMsg = "Unable to either parse or import metadata: " + e.message;
          return handleHttpError(deferred, httpResponse, "Metadata query failed for: " + url + ". " + errMsg);
        }

        // import may have brought in the service.
        if (!metadataStore.hasMetadataFor(serviceName)) {
          metadataStore.addDataService(dataService);
        }

        return deferred.resolve(metadata);

      },
      error: function (httpResponse) {
        handleHttpError(deferred, httpResponse, "Metadata query failed for: " + url);
      }
    });
    return deferred.promise;
  };

  proto.executeQuery = function (mappingContext) {
    var adapter = mappingContext.adapter = this;
    var deferred = Q.defer();
    var url = mappingContext.getUrl();

    var params = {
      type: "GET",
      url: url,
      params: mappingContext.query.parameters,
      dataType: 'json',
      success: function (httpResponse) {
        var data = httpResponse.data;
        try {
          var rData;
          var results = data && (data.results || data.Results);
          if (results) {
            rData = { results: results, inlineCount: data.inlineCount || data.InlineCount, httpResponse: httpResponse };
          } else {
            rData = { results: data, httpResponse: httpResponse };
          }

          deferred.resolve(rData);
        } catch (e) {
          if (e instanceof Error) {
            deferred.reject(e);
          } else {
            handleHttpError(deferred, httpResponse);
          }
        }

      },
      error: function (httpResponse) {
        handleHttpError(deferred, httpResponse);
      }
    };
    if (mappingContext.dataService.useJsonp) {
      params.dataType = 'jsonp';
      params.crossDomain = true;
    }
    ajaxImpl.ajax(params);
    return deferred.promise;
  };

  proto.saveChanges = function (saveContext, saveBundle) {
    var adapter = saveContext.adapter = this;
    var deferred = Q.defer();
    saveBundle = adapter._prepareSaveBundle(saveContext, saveBundle);
    var bundle = JSON.stringify(saveBundle);

    var url = saveContext.dataService.qualifyUrl(saveContext.resourceName);

    ajaxImpl.ajax({
      type: "POST",
      url: url,
      dataType: 'json',
      contentType: "application/json",
      data: bundle,
      success: function (httpResponse) {
        httpResponse.saveContext = saveContext;
        var data = httpResponse.data;
        if (data.Errors || data.errors) {
          handleHttpError(deferred, httpResponse);
        } else {
          var saveResult = adapter._prepareSaveResult(saveContext, data);
          saveResult.httpResponse = httpResponse;
          deferred.resolve(saveResult);
        }
      },
      error: function (httpResponse) {
        httpResponse.saveContext = saveContext;
        handleHttpError(deferred, httpResponse);
      }
    });

    return deferred.promise;
  };

  proto._prepareSaveBundle = function (/*saveContext, saveBundle*/) {
    // The implementor should call _createChangeRequestInterceptor
    throw new Error("Need a concrete implementation of _prepareSaveBundle");
  };

  /**
   Returns a constructor function for a "ChangeRequestInterceptor"
   that can tweak the saveBundle both as it is built and when it is completed
   by a concrete DataServiceAdapater.

   Initialized with a default, no-op implementation that developers can replace with a
   substantive implementation that changes the individual entity change requests
   or aspects of the entire 'saveBundle' without having to write their own DataService adapters.

   @example
   var adapter = breeze.config.getAdapterInstance('dataService');
   adapter.changeRequestInterceptor = function (saveContext, saveBundle) {
        this.getRequest = function (request, entity, index) {
            // alter the request that the adapter prepared for this entity
            // based on the entity, saveContext, and saveBundle
            // e.g., add a custom header or prune the originalValuesMap
            return request;
        };
        this.done = function (requests) {
            // alter the array of requests representing the entire change-set
            // based on the saveContext and saveBundle
        };
    }
   @method changeRequestInterceptor
   @param saveContext {Object} The BreezeJS "context" for the save operation.
   @param saveBundle {Object} Contains the array of entities-to-be-saved (AKA, the entity change-set).
   @return {Function} Constructor for a "ChangeRequestInterceptor".
   **/
  proto.changeRequestInterceptor = DefaultChangeRequestInterceptor;

  //This is a default, no-op implementation that developers can replace.
  function DefaultChangeRequestInterceptor(saveContext, saveBundle) {
    /**
     Prepare and return the save data for an entity change-set.

     The adapter calls this method for each entity in the change-set,
     after it has prepared a "change request" for that object.

     The method can do anything to the request but it must return a valid, non-null request.
     @example
     this.getRequest = function (request, entity, index) {
            // alter the request that the adapter prepared for this entity
            // based on the entity, saveContext, and saveBundle
            // e.g., add a custom header or prune the originalValuesMap
            return request;
        };
     @method getRequest
     @param request {Object} The object representing the adapter's request to save this entity.
     @param entity {Entity} The entity-to-be-save as it is in cache
     @param index {Integer} The zero-based index of this entity in the change-set array
     @return {Function} The potentially revised request.
     **/
    this.getRequest = function (request, entity, index) {
      return request;
    };

    /**
     Last chance to change anything about the 'requests' array
     after it has been built with requests for all of the entities-to-be-saved.

     The 'requests' array is the same as 'saveBundle.entities' in many implementations

     This method can do anything to the array including add and remove requests.
     It's up to you to ensure that server will accept the requests array data as valid.

     Returned value is ignored.
     @example
     this.done = function (requests) {
            // alter the array of requests representing the entire change-set
            // based on the saveContext and saveBundle
        };
     @method done
     @param requests {Array of Object} The adapter's array of request for this changeset.
     **/
    this.done = function (requests) {
    };
  }

  proto._createChangeRequestInterceptor = function (saveContext, saveBundle) {
    var adapter = saveContext.adapter;
    var cri = adapter.changeRequestInterceptor;
    var isFn = __isFunction;

    if (isFn(cri)) {
      var pre = adapter.name + " DataServiceAdapter's ChangeRequestInterceptor";
      var post = " is missing or not a function.";
      var interceptor = new cri(saveContext, saveBundle);
      if (!isFn(interceptor.getRequest)) {
        throw new Error(pre + '.getRequest' + post);
      }
      if (!isFn(interceptor.done)) {
        throw new Error(pre + '.done' + post);
      }
      return interceptor;
    } else {
      return new DefaultChangeRequestInterceptor(saveContext, saveBundle);
    }
  }

  proto._prepareSaveResult = function (/* saveContext, data */) {
    throw new Error("Need a concrete implementation of _prepareSaveResult");
  };

  proto.jsonResultsAdapter = new JsonResultsAdapter({
    name: "noop",

    visitNode: function (/* node, mappingContext, nodeContext */) {
      return {};
    }

  });

  function handleHttpError(deferred, httpResponse, messagePrefix) {
    var err = createError(httpResponse);
    proto._catchNoConnectionError(err);
    if (messagePrefix) {
      err.message = messagePrefix + "; " + err.message;
    }
    return deferred.reject(err);
  }


  function createError(httpResponse) {
    var err = new Error();
    err.httpResponse = httpResponse;
    err.status = httpResponse.status;

    var errObj = httpResponse.data;

    if (!errObj) {
      err.message = httpResponse.error && httpResponse.error.toString();
      return err;
    }

    // some ajax providers will convert errant result into an object ( angular), others will not (jQuery)
    // if not do it here.
    if (typeof errObj === "string") {
      try {
        errObj = JSON.parse(errObj);
      } catch (e) {
        // sometimes httpResponse.data is just the error message itself
        err.message = errObj;
        return err;
      }
    }

    var saveContext = httpResponse.saveContext;

    // if any of the follow properties exist the source is .NET
    var tmp = errObj.Message || errObj.ExceptionMessage || errObj.EntityErrors || errObj.Errors;
    var isDotNet = !!tmp;
    var message, entityErrors;
    if (!isDotNet) {
      message = errObj.message;
      entityErrors = errObj.errors || errObj.entityErrors;
    } else {
      var tmp = errObj;
      do {
        // .NET exceptions can provide both ExceptionMessage and Message but ExceptionMethod if it
        // exists has a more detailed message.
        message = tmp.ExceptionMessage || tmp.Message;
        tmp = tmp.InnerException;
      } while (tmp);
      // .EntityErrors will only occur as a result of an EntityErrorsException being deliberately thrown on the server
      entityErrors = errObj.Errors || errObj.EntityErrors;
      entityErrors = entityErrors && entityErrors.map(function (e) {
        return {
          errorName: e.ErrorName,
          entityTypeName: MetadataStore.normalizeTypeName(e.EntityTypeName),
          keyValues: e.KeyValues,
          propertyName: e.PropertyName,
          errorMessage: e.ErrorMessage
        };
      });
    }

    if (saveContext && entityErrors) {
      var propNameFn = saveContext.entityManager.metadataStore.namingConvention.serverPropertyNameToClient;
      entityErrors.forEach(function (e) {
        e.propertyName = e.propertyName && propNameFn(e.propertyName);
      });
      err.entityErrors = entityErrors
    }

    err.message = message || "Server side errors encountered - see the entityErrors collection on this object for more detail";
    return err;
  }

  // Put this at the bottom of your http error analysis
  proto._catchNoConnectionError = function (err) {
    if (err.status == 0 && err.message == null) {
      err.message = "HTTP response status 0 and no message.  " +
          "Likely did not or could not reach server. Is the server running?";
    }
  }

  return ctor;

})();
;// Angular ajax adapter
// See https://docs.angularjs.org/api/ng/service/$http
(function (factory) {
  // Module systems magic dance.
  if (typeof breeze === "object") {
    factory(breeze);
  } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS or Node: hard-coded dependency on "breeze"
    factory(require("breeze"));
  } else if (typeof define === "function" && define["amd"]) {
    // AMD anonymous module with hard-coded dependency on "breeze"
    define(["breeze"], factory);
  }
}(function (breeze) {
  "use strict";
  var core = breeze.core;

  var ctor = function AjaxAngularAdapter() {
    this.name = "angular";
    this.defaultSettings = { };
    this.requestInterceptor = null;
    // Will set:
    //   this.$http;
    //   this.$rootScope;
  };
  var proto = ctor.prototype;

  proto.initialize = function () {

    var ng = core.requireLib("angular");
    if (ng) {
      var $injector = ng.injector(['ng']);
      var http, rootScope;
      $injector.invoke(['$http', '$rootScope', function ($http, $rootScope) {
        http = $http;
        rootScope = $rootScope;
      }]);
      this.$http = http;
      this.$rootScope = rootScope;
    }

  };

  proto.setHttp = function (http) {
    this.$http = http;
    this.$rootScope = null; // to suppress $rootScope.digest
  };


  proto.ajax = function (config) {
    if (!this.$http) {
      throw new Error("Unable to locate angular for ajax adapter");
    }
    var ngConfig = {
      method: config.type,
      url: config.url,
      dataType: config.dataType,
      contentType: config.contentType,
      crossDomain: config.crossDomain,
      headers: config.headers || {}
    }

    if (config.params) {
      // Hack: because of the way that Angular handles writing parameters out to the url.
      // so this approach takes over the url param writing completely.
      // See: http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
      var delim = (ngConfig.url.indexOf("?") >= 0) ? "&" : "?";
      ngConfig.url = ngConfig.url + delim + encodeParams(config.params);
    }

    if (config.data) {
      ngConfig.data = config.data;
    }

    if (!core.isEmpty(this.defaultSettings)) {
      var compositeConfig = core.extend({}, this.defaultSettings);
      ngConfig = core.extend(compositeConfig, ngConfig);
      // extend is shallow; extend headers separately
      var headers =core.extend({}, this.defaultSettings.headers); // copy default headers 1st
      ngConfig.headers = core.extend(headers, ngConfig.headers);
    }

    var requestInfo = {
      adapter: this,      // this adapter
      config: ngConfig,   // angular's $http configuration object
      dsaConfig: config,  // the config arg from the calling Breeze DataServiceAdapter
      success: successFn, // adapter's success callback
      error: errorFn      // adapter's error callback
    }

    if (core.isFunction(this.requestInterceptor)) {
      this.requestInterceptor(requestInfo);
      if (this.requestInterceptor.oneTime) {
        this.requestInterceptor = null;
      }
    }

    if (requestInfo.config) { // exists unless requestInterceptor killed it.
      this.$http(requestInfo.config)
          .success(requestInfo.success)
          .error(requestInfo.error);
      this.$rootScope && this.$rootScope.$digest();
    }

    function successFn(data, status, headers, xconfig, statusText) {
      // HACK: because $http returns a server side null as a string containing "null" - this is WRONG.
      if (data === "null") data = null;
      var httpResponse = {
        config: config,
        data: data,
        getHeaders: headers,
        status: status,
        statusText: statusText
      };
      config.success(httpResponse);
    }

    function errorFn(data, status, headers, xconfig, statusText) {
      // Timeout appears as an error with status===0 and no data.
      // Make it better
      if (status === 0 && data == null) {
        data = 'timeout';
      }
      var httpResponse = {
        config: config,
        data: data,
        getHeaders: headers,
        status: status,
        statusText: statusText
      };
      config.error(httpResponse);
    }
  };

  function encodeParams(obj) {
    var query = '';
    var subValue, innerObj, fullSubName;

    for (var name in obj) {
      var value = obj[name];

      if (value instanceof Array) {
        for (var i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += encodeParams(innerObj) + '&';
        }
      } else if (value && value.toISOString) { // a feature of Date-like things
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value.toISOString()) + '&';
      } else if (value instanceof Object) {
        for (var subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += encodeParams(innerObj) + '&';
        }
      } else if (value === null) {
        query += encodeURIComponent(name) + '=&';
      } else if (value !== undefined) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  }

  breeze.config.registerAdapter("ajax", ctor);

}));
;// jQuery ajax adapter ( JQuery v.>=1.5 )
// see https://api.jquery.com/jQuery.ajax/
(function (factory) {
  // Module systems magic dance.
  if (typeof breeze === "object") {
    factory(breeze);
  } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS or Node: hard-coded dependency on "breeze"
    factory(require("breeze"));
  } else if (typeof define === "function" && define["amd"]) {
    // AMD anonymous module with hard-coded dependency on "breeze"
    define(["breeze"], factory);
  }
}(function (breeze) {
  "use strict";
  var core = breeze.core;

  var jQuery;

  var ctor = function AjaxJQueryAdapter() {
    this.name = "jQuery";
    this.defaultSettings = { };
    this.requestInterceptor = null;
  };
  var proto = ctor.prototype;

  proto.initialize = function () {
    // look for the jQuery lib but don't fail immediately if not found
    jQuery = core.requireLib("jQuery");
  };

  proto.ajax = function (config) {
    if (!jQuery) {
      throw new Error("Unable to locate jQuery");
    }
    var jqConfig = {
      type: config.type,
      url: config.url,
      data: config.params || config.data,
      dataType: config.dataType,
      contentType: config.contentType,
      crossDomain: config.crossDomain,
      headers: config.headers || {}
    }

    if (!core.isEmpty(this.defaultSettings)) {
      var compositeConfig = core.extend({}, this.defaultSettings);
      jqConfig = core.extend(compositeConfig, jqConfig);
      // extend is shallow; extend headers separately
      var headers =core.extend({}, this.defaultSettings.headers); // copy default headers 1st
      jqConfig.headers = core.extend(headers, jqConfig.headers);
    }

    var requestInfo = {
      adapter: this,      // this adapter
      config: jqConfig,   // jQuery's ajax 'settings' object
      dsaConfig: config,  // the config arg from the calling Breeze DataServiceAdapter
      success: successFn, // adapter's success callback
      error: errorFn      // adapter's error callback
    }

    if (core.isFunction(this.requestInterceptor)) {
      this.requestInterceptor(requestInfo);
      if (this.requestInterceptor.oneTime) {
        this.requestInterceptor = null;
      }
    }

    if (requestInfo.config) { // exists unless requestInterceptor killed it.
      requestInfo.jqXHR = jQuery.ajax(requestInfo.config)
          .done(requestInfo.success)
          .fail(requestInfo.error);
    }

    function successFn(data, statusText, jqXHR) {
      var httpResponse = {
        config: config,
        data: data,
        getHeaders: getHeadersFn(jqXHR),
        status: jqXHR.status,
        statusText: statusText
      };
      config.success(httpResponse);
      jqXHR.onreadystatechange = null;
      jqXHR.abort = null;
    }

    function errorFn(jqXHR, statusText, errorThrown) {
      var httpResponse = {
        config: config,
        data: jqXHR.responseText,
        error: errorThrown,
        getHeaders: getHeadersFn(jqXHR),
        status: jqXHR.status,
        statusText: statusText
      };
      config.error(httpResponse);
      jqXHR.onreadystatechange = null;
      jqXHR.abort = null;
    }
  };

  function getHeadersFn(jqXHR) {
    if (jqXHR.status === 0) { // timeout or abort; no headers
      return function (headerName) {
        return (headerName && headerName.length > 0) ? "" : {};
      };
    } else { // jqXHR should have header functions
      return function (headerName) {
        return (headerName && headerName.length > 0) ?
               jqXHR.getResponseHeader(headerName) :
               jqXHR.getAllResponseHeaders();
      };
    }
  }

  breeze.config.registerAdapter("ajax", ctor);

}));
;(function (factory) {
  if (typeof breeze === "object") {
    factory(breeze);
  } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS or Node: hard-coded dependency on "breeze"
    factory(require("breeze"));
  } else if (typeof define === "function" && define["amd"]) {
    // AMD anonymous module with hard-coded dependency on "breeze"
    define(["breeze"], factory);
  }
}(function (breeze) {
  "use strict";
  var core = breeze.core;

  var MetadataStore = breeze.MetadataStore;
  var JsonResultsAdapter = breeze.JsonResultsAdapter;
  var DataProperty = breeze.DataProperty;

  var OData;

  var ctor = function DataServiceODataAdapter() {
    this.name = "OData";
  };

  var proto = ctor.prototype; // minifies better (as seen in jQuery)

  proto.initialize = function () {
    OData = core.requireLib("OData", "Needed to support remote OData services");
    OData.jsonHandler.recognizeDates = true;
  };
  // borrow from AbstractDataServiceAdapter
  var abstractDsaProto = breeze.AbstractDataServiceAdapter.prototype;
  proto._catchNoConnectionError = abstractDsaProto._catchNoConnectionError;
  proto.changeRequestInterceptor = abstractDsaProto.changeRequestInterceptor;
  proto._createChangeRequestInterceptor = abstractDsaProto._createChangeRequestInterceptor;
  proto.headers = { "DataServiceVersion": "2.0" };
  proto.executeQuery = function (mappingContext) {

    var deferred = Q.defer();
    var url = mappingContext.getUrl();

    OData.read({
          requestUri: url,
          headers: this.headers
        },
        function (data, response) {
          var inlineCount;
          if (data.__count) {
            // OData can return data.__count as a string
            inlineCount = parseInt(data.__count, 10);
          }
          return deferred.resolve({ results: data.results, inlineCount: inlineCount, httpResponse: response });
        },
        function (error) {
          return deferred.reject(createError(error, url));
        }
    );
    return deferred.promise;
  };


  proto.fetchMetadata = function (metadataStore, dataService) {

    var deferred = Q.defer();

    var serviceName = dataService.serviceName;
    var url = dataService.qualifyUrl('$metadata');
    // OData.read(url,
    OData.read({
          requestUri: url,
          // headers: { "Accept": "application/json"}
          headers: { Accept: 'application/json;odata.metadata=full' }
        },
        function (data) {
          // data.dataServices.schema is an array of schemas. with properties of
          // entityContainer[], association[], entityType[], and namespace.
          if (!data || !data.dataServices) {
            var error = new Error("Metadata query failed for: " + url);
            return deferred.reject(error);
          }
          var csdlMetadata = data.dataServices;

          // might have been fetched by another query
          if (!metadataStore.hasMetadataFor(serviceName)) {
            try {
              metadataStore.importMetadata(csdlMetadata);
            } catch (e) {
              return deferred.reject(new Error("Metadata query failed for " + url + "; Unable to process returned metadata: " + e.message));
            }

            metadataStore.addDataService(dataService);
          }

          return deferred.resolve(csdlMetadata);

        }, function (error) {
          var err = createError(error, url);
          err.message = "Metadata query failed for: " + url + "; " + (err.message || "");
          return deferred.reject(err);
        },
        OData.metadataHandler
    );

    return deferred.promise;

  };

  proto.getRoutePrefix = function (/*dataService*/) {
    return '';
  } // see webApiODataCtor

  proto.saveChanges = function (saveContext, saveBundle) {
    var adapter = saveContext.adapter = this;
    var deferred = Q.defer();
    saveContext.routePrefix = adapter.getRoutePrefix(saveContext.dataService);
    var url = saveContext.dataService.qualifyUrl("$batch");

    var requestData = createChangeRequests(saveContext, saveBundle);
    var tempKeys = saveContext.tempKeys;
    var contentKeys = saveContext.contentKeys;

    OData.request({
      headers: { "DataServiceVersion": "2.0" },
      requestUri: url,
      method: "POST",
      data: requestData
    }, function (data, response) {
      var entities = [];
      var keyMappings = [];
      var saveResult = { entities: entities, keyMappings: keyMappings };
      data.__batchResponses.forEach(function (br) {
        br.__changeResponses.forEach(function (cr) {
          var response = cr.response || cr;
          var statusCode = response.statusCode;
          if ((!statusCode) || statusCode >= 400) {
            deferred.reject(createError(cr, url));
            return;
          }

          var contentId = cr.headers["Content-ID"];

          var rawEntity = cr.data;
          if (rawEntity) {
            var tempKey = tempKeys[contentId];
            if (tempKey) {
              var entityType = tempKey.entityType;
              if (entityType.autoGeneratedKeyType !== AutoGeneratedKeyType.None) {
                var tempValue = tempKey.values[0];
                var realKey = entityType.getEntityKeyFromRawEntity(rawEntity, DataProperty.getRawValueFromServer);
                var keyMapping = { entityTypeName: entityType.name, tempValue: tempValue, realValue: realKey.values[0] };
                keyMappings.push(keyMapping);
              }
            }
            entities.push(rawEntity);
          } else {
            var origEntity = contentKeys[contentId];
            entities.push(origEntity);
          }
        });
      });
      return deferred.resolve(saveResult);
    }, function (err) {
      return deferred.reject(createError(err, url));
    }, OData.batchHandler);

    return deferred.promise;

  };

  proto.jsonResultsAdapter = new JsonResultsAdapter({
    name: "OData_default",

    visitNode: function (node, mappingContext, nodeContext) {
      var result = {};
      if (node == null) return result;
      var metadata = node.__metadata;
      if (metadata != null) {
        // TODO: may be able to make this more efficient by caching of the previous value.
        var entityTypeName = MetadataStore.normalizeTypeName(metadata.type);
        var et = entityTypeName && mappingContext.entityManager.metadataStore.getEntityType(entityTypeName, true);
        // OData response doesn't distinguish a projection from a whole entity.
        // We'll assume that whole-entity data would have at least as many properties  (<=)
        // as the EntityType has mapped properties on the basis that
        // most projections remove properties rather than add them.
        // If not, assume it's a projection and do NOT treat as an entity
        if (et && et._mappedPropertiesCount <= Object.keys(node).length - 1) {
          // if (et && et._mappedPropertiesCount === Object.keys(node).length - 1) { // OLD
          result.entityType = et;
          var uriKey = metadata.uri || metadata.id;
          if (uriKey) {
            // Strip baseUri to make uriKey a relative uri
            // Todo: why is this necessary when absolute works for every OData source tested?
            var re = new RegExp('^' + mappingContext.dataService.serviceName, 'i');
            uriKey = uriKey.replace(re, '');
          }
          result.extraMetadata = {
            uriKey: uriKey,
            etag: metadata.etag
          }
        }
      }
      // OData v3 - projection arrays will be enclosed in a results array
      if (node.results) {
        result.node = node.results;
      }

      var propertyName = nodeContext.propertyName;
      result.ignore = node.__deferred != null || propertyName === "__metadata" ||
        // EntityKey properties can be produced by EDMX models
          (propertyName === "EntityKey" && node.$type && core.stringStartsWith(node.$type, "System.Data"));
      return result;
    }

  });

  function transformValue(prop, val) {
    if (prop.isUnmapped) return undefined;
    if (prop.dataType === DataType.DateTimeOffset) {
      // The datajs lib tries to treat client dateTimes that are defined as DateTimeOffset on the server differently
      // from other dateTimes. This fix compensates before the save.
      val = val && new Date(val.getTime() - (val.getTimezoneOffset() * 60000));
    } else if (prop.dataType.quoteJsonOData) {
      val = val != null ? val.toString() : val;
    }
    return val;
  }

  function createChangeRequests(saveContext, saveBundle) {
    var changeRequestInterceptor = saveContext.adapter._createChangeRequestInterceptor(saveContext, saveBundle);
    var changeRequests = [];
    var tempKeys = [];
    var contentKeys = [];
    var entityManager = saveContext.entityManager;
    var helper = entityManager.helper;
    var id = 0;
    var routePrefix = saveContext.routePrefix;

    saveBundle.entities.forEach(function (entity, index) {
      var aspect = entity.entityAspect;
      id = id + 1; // we are deliberately skipping id=0 because Content-ID = 0 seems to be ignored.
      var request = { headers: { "Content-ID": id, "DataServiceVersion": "2.0" } };
      contentKeys[id] = entity;
      if (aspect.entityState.isAdded()) {
        request.requestUri = routePrefix + entity.entityType.defaultResourceName;
        request.method = "POST";
        request.data = helper.unwrapInstance(entity, transformValue);
        tempKeys[id] = aspect.getKey();
      } else if (aspect.entityState.isModified()) {
        updateDeleteMergeRequest(request, aspect, routePrefix);
        request.method = "MERGE";
        request.data = helper.unwrapChangedValues(entity, entityManager.metadataStore, transformValue);
        // should be a PATCH/MERGE
      } else if (aspect.entityState.isDeleted()) {
        updateDeleteMergeRequest(request, aspect, routePrefix);
        request.method = "DELETE";
      } else {
        return;
      }
      request = changeRequestInterceptor.getRequest(request, entity, index);
      changeRequests.push(request);
    });
    saveContext.contentKeys = contentKeys;
    saveContext.tempKeys = tempKeys;
    changeRequestInterceptor.done(changeRequests);
    return {
      __batchRequests: [
        {
          __changeRequests: changeRequests
        }
      ]
    };

  }

  function updateDeleteMergeRequest(request, aspect, routePrefix) {
    var uriKey;
    var extraMetadata = aspect.extraMetadata;
    if (extraMetadata == null) {
      uriKey = getUriKey(aspect);
      aspect.extraMetadata = {
        uriKey: uriKey
      }
    } else {
      uriKey = extraMetadata.uriKey;
      if (extraMetadata.etag) {
        request.headers["If-Match"] = extraMetadata.etag;
      }
    }
    request.requestUri =
      // use routePrefix if uriKey lacks protocol (i.e., relative uri)
            uriKey.indexOf('//') > 0 ? uriKey : routePrefix + uriKey;
  }

  function getUriKey(aspect) {
    var entityType = aspect.entity.entityType;
    var resourceName = entityType.defaultResourceName;
    var kps = entityType.keyProperties;
    var uriKey = resourceName + "(";
    if (kps.length === 1) {
      uriKey = uriKey + fmtProperty(kps[0], aspect) + ")";
    } else {
      var delim = "";
      kps.forEach(function (kp) {
        uriKey = uriKey + delim + kp.nameOnServer + "=" + fmtProperty(kp, aspect);
        delim = ",";
      });
      uriKey = uriKey + ")";
    }
    return uriKey;
  }

  function fmtProperty(prop, aspect) {
    return prop.dataType.fmtOData(aspect.getPropertyValue(prop.name));
  }

  function createError(error, url) {
    // OData errors can have the message buried very deeply - and nonobviously
    // this code is tricky so be careful changing the response.body parsing.
    var result = new Error();
    var response = error && error.response;
    if (!response) {
      // in case DataJS returns "No handler for this data"
      result.message = error;
      result.statusText = error;
      return result;
    }
    result.message = response.statusText;
    result.statusText = response.statusText;
    result.status = response.statusCode;
    // non std
    if (url) result.url = url;
    result.body = response.body;
    if (response.body) {
      var nextErr;
      try {
        var body = JSON.parse(response.body);
        result.body = body;
        // OData v3 logic
        if (body['odata.error']) {
          body = body['odata.error'];
        }
        var msg = "";
        do {
          nextErr = body.error || body.innererror;
          if (!nextErr) msg = msg + getMessage(body);
          nextErr = nextErr || body.internalexception;
          body = nextErr || body;
        } while (nextErr);
        if (msg.length > 0) {
          result.message = msg;
        }
      } catch (e) {

      }
    }
    proto._catchNoConnectionError(result);
    return result;
  }

  function getMessage(body) {
    var msg = body.message || "";
    return ((typeof (msg) === "string") ? msg : msg.value) + "; ";
  }

  breeze.config.registerAdapter("dataService", ctor);


  var webApiODataCtor = function () {
    this.name = "webApiOData";
  }

  breeze.core.extend(webApiODataCtor.prototype, proto);

  webApiODataCtor.prototype.getRoutePrefix = function (dataService) {
    // Get the routePrefix from a Web API OData service name.
    // The routePrefix is presumed to be the pathname within the dataService.serviceName
    // Examples of servicename -> routePrefix:
    //   'http://localhost:55802/odata/' -> 'odata/'
    //   'http://198.154.121.75/service/odata/' -> 'service/odata/'
    var parser;
    if (typeof document === 'object') { // browser
      parser = document.createElement('a');
      parser.href = dataService.serviceName;
    } else { // node
      parser = url.parse(dataService.serviceName);
    }
    var prefix = parser.pathname;
    if (prefix[0] === '/') {
      prefix = prefix.substr(1);
    } // drop leading '/'  (all but IE)
    if (prefix.substr(-1) !== '/') {
      prefix += '/';
    }      // ensure trailing '/'
    return prefix;
  };

  breeze.config.registerAdapter("dataService", webApiODataCtor);
  // OData 4 adapter
  var webApiOData4Ctor = function () {
    this.name = "webApiOData4";
  }
  breeze.core.extend(webApiOData4Ctor.prototype, webApiODataCtor.prototype);
  webApiOData4Ctor.prototype.initialize = function () {
    // Aargh... they moved the cheese.
    var datajs = core.requireLib("datajs", "Needed to support remote OData v4 services");
    OData = datajs.V4.oData;
    OData.json.jsonHandler.recognizeDates = true;
  };
  webApiOData4Ctor.prototype.headers = { "OData-Version": "4.0" };
  breeze.config.registerAdapter("dataService", webApiOData4Ctor);


}));;(function (factory) {
  if (typeof breeze === "object") {
    factory(breeze);
  } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS or Node: hard-coded dependency on "breeze"
    factory(require("breeze"));
  } else if (typeof define === "function" && define["amd"]) {
    // AMD anonymous module with hard-coded dependency on "breeze"
    define(["breeze"], factory);
  }
}(function (breeze) {
  "use strict";

  var MetadataStore = breeze.MetadataStore;
  var JsonResultsAdapter = breeze.JsonResultsAdapter;
  var AbstractDataServiceAdapter = breeze.AbstractDataServiceAdapter;

  var ctor = function DataServiceWebApiAdapter() {
    this.name = "webApi";
  };
  var proto = ctor.prototype = new AbstractDataServiceAdapter();

  proto._prepareSaveBundle = function (saveContext, saveBundle) {
    var changeRequestInterceptor = this._createChangeRequestInterceptor(saveContext, saveBundle);
    var em = saveContext.entityManager;
    var metadataStore = em.metadataStore;
    var helper = em.helper;

    saveBundle.entities = saveBundle.entities.map(function (e, ix) {
      var rawEntity = helper.unwrapInstance(e);

      var autoGeneratedKey = null;
      if (e.entityType.autoGeneratedKeyType !== breeze.AutoGeneratedKeyType.None) {
        autoGeneratedKey = {
          propertyName: e.entityType.keyProperties[0].nameOnServer,
          autoGeneratedKeyType: e.entityType.autoGeneratedKeyType.name
        };
      }

      var originalValuesOnServer = helper.unwrapOriginalValues(e, metadataStore);
      rawEntity.entityAspect = {
        entityTypeName: e.entityType.name,
        defaultResourceName: e.entityType.defaultResourceName,
        entityState: e.entityAspect.entityState.name,
        originalValuesMap: originalValuesOnServer,
        autoGeneratedKey: autoGeneratedKey
      };
      rawEntity = changeRequestInterceptor.getRequest(rawEntity, e, ix);
      return rawEntity;
    });

    saveBundle.saveOptions = { tag: saveBundle.saveOptions.tag };
    changeRequestInterceptor.done(saveBundle.entities);
    return saveBundle;
  };

  proto._prepareSaveResult = function (saveContext, data) {
    // if lower case then all properties are already in there 'correct' case
    // and the entityType name is already a client side name.
    if (data.entities) {
      // data: { entities: array of entities, keyMappings array of keyMappings
      //   where: keyMapping: { entityTypeName: ..., tempValue: ..., realValue ... }
      return data;
    } else {
      // else if coming from .NET
      // HACK: need to change the 'case' of properties in the saveResult
      // but KeyMapping properties internally are still ucase. ugh...
      var keyMappings = data.KeyMappings.map(function (km) {
        var entityTypeName = MetadataStore.normalizeTypeName(km.EntityTypeName);
        return { entityTypeName: entityTypeName, tempValue: km.TempValue, realValue: km.RealValue };
      });
      return { entities: data.Entities, keyMappings: keyMappings };
    }
  };

  proto.jsonResultsAdapter = new JsonResultsAdapter({

    name: "webApi_default",

    visitNode: function (node, mappingContext, nodeContext) {
      if (node == null) return {};
      var entityTypeName = MetadataStore.normalizeTypeName(node.$type);
      var entityType = entityTypeName && mappingContext.entityManager.metadataStore._getEntityType(entityTypeName, true);
      var propertyName = nodeContext.propertyName;
      var ignore = propertyName && propertyName.substr(0, 1) === "$";

      return {
        entityType: entityType,
        nodeId: node.$id,
        nodeRefId: node.$ref,
        ignore: ignore
      };
    }

  });


  breeze.config.registerAdapter("dataService", ctor);

}));;(function (factory) {
  if (typeof breeze === "object") {
    factory(breeze);
  } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS or Node: hard-coded dependency on "breeze"
    factory(require("breeze"));
  } else if (typeof define === "function" && define["amd"]) {
    // AMD anonymous module with hard-coded dependency on "breeze"
    define(["breeze"], factory);
  }
}(function (breeze) {
  "use strict";
  var core = breeze.core;

  var ctor = function ModelLibraryBackingStoreAdapter() {
    this.name = "backingStore";
  };
  // protoFn used instead of proto here to avoid naming collision with function params.
  var protoFn = ctor.prototype;

  protoFn.initialize = function () {

  };

  protoFn.getTrackablePropertyNames = function (entity) {
    var names = [];
    for (var p in entity) {
      if (p === "entityType") continue;
      if (p === "_$typeName") continue;
      if (p === "_pendingSets") continue;
      if (p === "_backingStore") continue;
      var val = entity[p];
      if (!core.isFunction(val)) {
        names.push(p);
      }
    }
    return names;
  };

  // This method is called during Metadata initialization
  protoFn.initializeEntityPrototype = function (proto) {

    proto.getProperty = function (propertyName) {
      return this[propertyName];
    };

    proto.setProperty = function (propertyName, value) {
      //if (!this._backingStore.hasOwnProperty(propertyName)) {
      //    throw new Error("Unknown property name:" + propertyName);
      //}
      this[propertyName] = value;
      // allow setProperty chaining.
      return this;
    };

    movePropDefsToProto(proto);
  };

  // This method is called when an EntityAspect is first created - this will occur as part of the entityType.createEntity call.
  // which can be called either directly or via standard query materialization

  // entity is either an entity or a complexObject
  protoFn.startTracking = function (entity, proto) {
    // can't touch the normal property sets within this method - access the backingStore directly instead.
    var bs = movePropsToBackingStore(entity);

    // assign default values to the entity
    var stype = entity.entityType || entity.complexType;
    stype.getProperties().forEach(function (prop) {

      var propName = prop.name;
      var val = entity[propName];

      if (prop.isDataProperty) {
        if (prop.isComplexProperty) {
          if (prop.isScalar) {
            val = prop.dataType._createInstanceCore(entity, prop);
          } else {
            val = breeze.makeComplexArray([], entity, prop);
          }
        } else if (!prop.isScalar) {
          val = breeze.makePrimitiveArray([], entity, prop);
        } else if (val === undefined) {
          val = prop.defaultValue;
        }

      } else if (prop.isNavigationProperty) {
        if (val !== undefined) {
          throw new Error("Cannot assign a navigation property in an entity ctor.: " + prop.Name);
        }
        if (prop.isScalar) {
          // TODO: change this to nullstob later.
          val = null;
        } else {
          val = breeze.makeRelationArray([], entity, prop);
        }
      } else {
        throw new Error("unknown property: " + propName);
      }
      // can't touch the normal property sets within this method (IE9 Bug) - so we access the backingStore directly instead.
      // otherwise we could just do
      // entity[propName] = val
      // after all of the interception logic had been injected.
      if (prop.isSettable || prop.isNavigationProperty) {
        bs[propName] = val;
      }
    });
  };


  // private methods

  // This method is called during Metadata initialization to correctly "wrap" properties.
  function movePropDefsToProto(proto) {
    var stype = proto.entityType || proto.complexType;
    var extra = stype._extra;

    var alreadyWrapped = extra.alreadyWrappedProps || {};

    stype.getProperties().forEach(function (prop) {
      var propName = prop.name;
      // we only want to wrap props that haven't already been wrapped
      if (alreadyWrapped[propName]) return;

      // If property is already defined on the prototype then wrap it in another propertyDescriptor.
      // otherwise create a propDescriptor for it.
      var descr;
      if (propName in proto) {
        descr = wrapPropDescription(proto, prop);
      } else {
        descr = makePropDescription(proto, prop);
      }
      // descr will be null for a wrapped descr that is not configurable
      if (descr != null) {
        Object.defineProperty(proto, propName, descr);
      }
      alreadyWrapped[propName] = true;
    });
    extra.alreadyWrappedProps = alreadyWrapped;
  }

  // This method is called when an instance is first created via materialization or createEntity.
  // this method cannot be called while a 'defineProperty' accessor is executing
  // because of IE bug mentioned above.

  function movePropsToBackingStore(instance) {

    var bs = getBackingStore(instance);
    var proto = Object.getPrototypeOf(instance);
    var stype = proto.entityType || proto.complexType;
    stype.getProperties().forEach(function (prop) {
      var propName = prop.name;
      if (prop.isUnmapped) {
        // insure that any unmapped properties that were added after entityType
        // was first created are wrapped with a property descriptor.
        if (!core.getPropertyDescriptor(proto, propName)) {
          var descr = makePropDescription(proto, prop);
          Object.defineProperty(proto, propName, descr);
        }
      }
      if (!instance.hasOwnProperty(propName)) return;
      // pulls off the value, removes the instance property and then rewrites it via ES5 accessor
      var value = instance[propName];
      delete instance[propName];
      instance[propName] = value;
    });
    return bs;
  }



  function makePropDescription(proto, property) {
    var propName = property.name;
    var pendingStores = proto._pendingBackingStores;
    if (!pendingStores) {
      pendingStores = [];
      proto._pendingBackingStores = pendingStores;
    }
    var descr = {
      get: function () {
        var bs = this._backingStore || getBackingStore(this);
        return bs[propName];
      },
      set: function (value) {
        // IE9 cannot touch instance._backingStore here
        var bs = this._backingStore || getPendingBackingStore(this);
        var accessorFn = getAccessorFn(bs, propName);
        this._$interceptor(property, value, accessorFn);
      },
      enumerable: true,
      configurable: true
    };

    descr.set.rawSet = function (value) {
      var bs = this._backingStore || getPendingBackingStore(this);
      var accessorFn = getAccessorFn(bs, propName);
      accessorFn(value);
    };
    return descr;

  }

  function getAccessorFn(bs, propName) {
    return function() {
      if (arguments.length === 0) {
        return bs[propName];
      } else {
        bs[propName] = arguments[0];
        return undefined;
      }
    };
  }


  function wrapPropDescription(proto, property) {
    if (!proto.hasOwnProperty(property.name)) {
      var nextProto = Object.getPrototypeOf(proto);
      return wrapPropDescription(nextProto, property);
    }

    var propDescr = Object.getOwnPropertyDescriptor(proto, property.name);
    // if not configurable; we can't touch it - so leave.
    if (!propDescr.configurable) return undefined;
    // if a data descriptor - don't change it - this is basically a static property - i.e. defined on every instance of the type with the same value.
    if (propDescr.value) return undefined;
    // if a read only property descriptor - no need to change it.
    if (!propDescr.set) return undefined;

    var localAccessorFn = function (entity) {
      return function () {
        if (arguments.length === 0) {
          return propDescr.get.bind(entity)();
        } else {
          var set = propDescr.set;
          var rawSet = set.rawSet || set;
          rawSet.bind(entity)(arguments[0]);
          return undefined;
        }
      };
    };

    var newDescr = {
      get: function () {
        return propDescr.get.bind(this)();
      },
      set: function (value) {
        this._$interceptor(property, value, localAccessorFn(this));
      },
      enumerable: propDescr.enumerable,
      configurable: true
    };
    newDescr.set.rawSet = propDescr.set;
    return newDescr;
  };


  function getBackingStore(instance) {
    var proto = Object.getPrototypeOf(instance);
    processPendingStores(proto);
    var bs = instance._backingStore;
    if (!bs) {
      bs = {};
      instance._backingStore = bs;
    }
    return bs;
  }

  // workaround for IE9 bug where instance properties cannot be changed when executing a property 'set' method.
  function getPendingBackingStore(instance) {
    var proto = Object.getPrototypeOf(instance);
    var pendingStores = proto._pendingBackingStores;
    var pending = core.arrayFirst(pendingStores, function (pending) {
      return pending.entity === instance;
    });
    if (pending) return pending.backingStore;
    var bs = {};
    pendingStores.push({ entity: instance, backingStore: bs });
    return bs;
  }

  function processPendingStores(proto) {
    var pendingStores = proto._pendingBackingStores;
    if (pendingStores) {
      pendingStores.forEach(function (pending) {
        pending.entity._backingStore = pending.backingStore;
      });
      pendingStores.length = 0;
    }
  }


  breeze.config.registerAdapter("modelLibrary", ctor);

}));
;(function (factory) {
  if (typeof breeze === "object") {
    factory(breeze);
  } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS or Node: hard-coded dependency on "breeze"
    factory(require("breeze"));
  } else if (typeof define === "function" && define["amd"]) {
    // AMD anonymous module with hard-coded dependency on "breeze"
    define(["breeze"], factory);
  }
}(function (breeze) {
  "use strict";
  var core = breeze.core;
  var canIsolateES5Props = core.__isES5Supported;

  var ko;

  var ctor = function ModelLibraryKnockoutAdapter() {
    this.name = "ko";
  };
  // protoFn used instead of proto here to avoid naming collision with function params.
  var protoFn = ctor.prototype;

  protoFn.initialize = function () {
    ko = core.requireLib("ko", "The Knockout library");
    ko.extenders.intercept = function (target, interceptorOptions) {
      var instance = interceptorOptions.instance;
      var property = interceptorOptions.property;

      // create a computed observable to intercept writes to our observable
      var result;
      if (target.splice) {
        result = ko.computed({
          read: target  //always return the original observables value
        });
      } else {
        result = ko.computed({
          read: target,  //always return the original observables value
          write: function (newValue) {
            instance._$interceptor(property, newValue, target);
            return instance;
          }
        });
      }
      //return the new computed observable
      return result;
    };

  };

  protoFn.getTrackablePropertyNames = function (entity) {
    var names = [];
    for (var p in entity) {
      if (p === "entityType") continue;
      if (p === "_$typeName") continue;

      var propDescr = getES5PropDescriptor(entity, p);
      if (propDescr && propDescr.get) {
        names.push(p);
      } else {
        var val = entity[p];
        if (ko.isObservable(val)) {
          names.push(p);
        } else if (!core.isFunction(val)) {
          names.push(p);
        }
      }
    }
    return names;
  };

  protoFn.initializeEntityPrototype = function (proto) {

    proto.getProperty = function (propertyName) {
      return this[propertyName]();
    };

    proto.setProperty = function (propertyName, value) {
      this[propertyName](value);
      // allow set property chaining.
      return this;
    };

    if (canIsolateES5Props) {
      isolateES5Props(proto);
    }

  };

  function isolateES5Props(proto) {

    var stype = proto.entityType || proto.complexType;
    var es5Descriptors = {};
    stype.getProperties().forEach(function (prop) {
      var propDescr = getES5PropDescriptor(proto, prop.name);
      if (propDescr) {
        es5Descriptors[prop.name] = propDescr;
      }
    });
    if (!core.isEmpty(es5Descriptors)) {
      var extra = stype._extra;
      extra.es5Descriptors = es5Descriptors;
      stype._koDummy = ko.observable(null);
    }

  }

  function getES5PropDescriptor(proto, propName) {
    if (!canIsolateES5Props) {
      return null;
    }
    if (proto.hasOwnProperty(propName)) {
      return Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(proto, propName);
    } else {
      var nextProto = Object.getPrototypeOf(proto);
      return nextProto ? getES5PropDescriptor(nextProto, propName) : null;
    }
  }

  protoFn.startTracking = function (entity, proto) {
    // create ko's for each property and assign defaultValues

    var stype = entity.entityType || entity.complexType;
    var es5Descriptors = stype._extra.es5Descriptors || {};

    // sort unmapped properties to the end
    stype.getProperties().sort(function (p1, p2) {
      var v1 = p1.isUnmapped ? 1 : 0;
      var v2 = p2.isUnmapped ? 1 : 0;
      return v1 - v2;
    }).forEach(function (prop) {
      var propName = prop.name;
      var val = entity[propName];
      var propDescr = es5Descriptors[propName];
      var koObj;

      // check if property is an ES5 property
      if (propDescr) {
        var getFn = propDescr.get.bind(entity);
        if (propDescr.set) {
          var setFn = propDescr.set.bind(entity);
          var rawAccessorFn = function (newValue) {
            if (arguments.length === 0) {
              getFn();
              return;
            } else {
              setFn(newValue);
            }
          }
          koObj = ko.computed({
            read: function () {
              stype._koDummy();
              return getFn();
            },
            write: function (newValue) {
              entity._$interceptor(prop, newValue, rawAccessorFn);
              stype._koDummy.valueHasMutated();
              return entity;
            }
          });
        } else {
          koObj = ko.computed({
            read: getFn,
            write: function () {
            }

          });
        }
        // check if property is already exposed as a ko object
      } else if (ko.isObservable(val)) {
        if (prop.isNavigationProperty) {
          throw new Error("Cannot assign a navigation property in an entity ctor.: " + propName);
        }
        koObj = val;
        // otherwise
      } else {
        val = initializeValueForProp(entity, prop, val);
        koObj = prop.isScalar ? ko.observable(val) : ko.observableArray(val);
      }


      if (prop.isScalar) {
        if (propDescr) {
          Object.defineProperty(entity, propName, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: koObj
          });
        } else {
          var koExt = koObj.extend({ intercept: { instance: entity, property: prop } });
          entity[propName] = koExt;
        }
      } else {
        val._koObj = koObj;
        // code to suppress extra breeze notification when
        // ko's array methods are called.
        koObj.subscribe(onBeforeChange, null, "beforeChange");
        // code to insure that any direct breeze changes notify ko
        val.arrayChanged.subscribe(onArrayChanged);

        koObj.equalityComparer = function () {
          throw new Error("Collection navigation properties may NOT be set.");
        };
        entity[propName] = koObj;
      }

    });

  };

  function initializeValueForProp(entity, prop, val) {
    if (prop.isDataProperty) {
      if (prop.isComplexProperty) {
        // TODO: right now we create Empty complexObjects here - these should actually come from the entity
        if (prop.isScalar) {
          val = prop.dataType._createInstanceCore(entity, prop);
        } else {
          val = breeze.makeComplexArray([], entity, prop);
        }
      } else if (!prop.isScalar) {
        val = breeze.makePrimitiveArray([], entity, prop);
      } else if (val === undefined) {
        val = prop.defaultValue;
      }

    } else if (prop.isNavigationProperty) {
      if (val !== undefined) {
        throw new Error("Cannot assign a navigation property in an entity ctor.: " + prop.name);
      }
      if (prop.isScalar) {
        // TODO: change this to nullEntity later.
        val = null;
      } else {
        val = breeze.makeRelationArray([], entity, prop);
      }
    } else {
      throw new Error("unknown property: " + prop.name);
    }
    return val;
  }


  function onBeforeChange(args) {
    args._koObj._suppressBreeze = true;
  }

  function onArrayChanged(args) {
    var koObj = args.array._koObj;
    if (koObj._suppressBreeze) {
      koObj._suppressBreeze = false;
    } else {
      koObj.valueHasMutated();
    }
  }

  breeze.config.registerAdapter("modelLibrary", ctor);

}));
;(function (factory) {
  if (typeof breeze === "object") {
    factory(breeze);
  } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS or Node: hard-coded dependency on "breeze"
    factory(require("breeze"));
  } else if (typeof define === "function" && define["amd"]) {
    // AMD anonymous module with hard-coded dependency on "breeze"
    define(["breeze"], factory);
  }
}(function (breeze) {
  "use strict";

  var ctor = function UriBuilderJsonAdapter() {
    this.name = "json";
  };
  var proto = ctor.prototype;

  proto.initialize = function() {};

  proto.buildUri = function (entityQuery, metadataStore) {
    // force entityType validation;
    var entityType = entityQuery._getFromEntityType(metadataStore, false);
    if (!entityType) entityType = new EntityType(metadataStore);
    var json = entityQuery.toJSONExt( { entityType: entityType, toNameOnServer: true});
    json.from = undefined;
    json.queryOptions = undefined;

    var jsonString = JSON.stringify(json);
    var urlBody = encodeURIComponent(jsonString);
    return entityQuery.resourceName + "?" + urlBody;

  };

  breeze.config.registerAdapter("uriBuilder", ctor);

}));



;(function (factory) {
  if (typeof breeze === "object") {
    factory(breeze);
  } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS or Node: hard-coded dependency on "breeze"
    factory(require("breeze"));
  } else if (typeof define === "function" && define["amd"]) {
    // AMD anonymous module with hard-coded dependency on "breeze"
    define(["breeze"], factory);
  }
}(function (breeze) {
  "use strict";
  var EntityType = breeze.EntityType;
  var toODataFragmentVisitor;

  var ctor = function UriBuilderODataAdapter() {
    this.name = "odata";
  };
  var proto = ctor.prototype;

  proto.initialize = function() {};

  proto.buildUri = function (entityQuery, metadataStore) {
    // force entityType validation;
    var entityType = entityQuery._getFromEntityType(metadataStore, false);
    if (!entityType) {
      // anonymous type but still has naming convention info avail
      entityType = new EntityType(metadataStore);
    }

    var queryOptions = {};
    queryOptions["$filter"] = toWhereODataFragment(entityQuery.wherePredicate);
    queryOptions["$orderby"] = toOrderByODataFragment(entityQuery.orderByClause);

    if (entityQuery.skipCount) {
      queryOptions["$skip"] = entityQuery.skipCount;
    }

    if (entityQuery.takeCount != null) {
      queryOptions["$top"] = entityQuery.takeCount;
    }

    queryOptions["$expand"] = toExpandODataFragment(entityQuery.expandClause);
    queryOptions["$select"] = toSelectODataFragment(entityQuery.selectClause);

    if (entityQuery.inlineCountEnabled) {
      queryOptions["$inlinecount"] = "allpages";
    }

    var qoText = toQueryOptionsString(queryOptions);
    return entityQuery.resourceName + qoText;

    // private methods to this func.

    function toWhereODataFragment(wherePredicate) {
      if (!wherePredicate) return undefined;
      // validation occurs inside of the toODataFragment call here.
      return wherePredicate.visit({ entityType: entityType}, toODataFragmentVisitor );
    }

    function toOrderByODataFragment(orderByClause) {
      if (!orderByClause) return undefined;
      orderByClause.validate(entityType);
      var strings = orderByClause.items.map(function (item) {
        return entityType.clientPropertyPathToServer(item.propertyPath, "/") + (item.isDesc ? " desc" : "");
      });
      // should return something like CompanyName,Address/City desc
      return strings.join(',');
    }

    function toSelectODataFragment(selectClause) {
      if (!selectClause) return undefined;
      selectClause.validate(entityType);
      var frag = selectClause.propertyPaths.map(function (pp) {
        return  entityType.clientPropertyPathToServer(pp, "/");
      }).join(",");
      return frag;
    }

    function toExpandODataFragment(expandClause) {
      if (!expandClause) return undefined;
      // no validate on expand clauses currently.
      // expandClause.validate(entityType);
      var frag = expandClause.propertyPaths.map(function (pp) {
        return entityType.clientPropertyPathToServer(pp, "/");
      }).join(",");
      return frag;
    }

    function toQueryOptionsString(queryOptions) {
      var qoStrings = [];
      for (var qoName in queryOptions) {
        var qoValue = queryOptions[qoName];
        if (qoValue !== undefined) {
          if (qoValue instanceof Array) {
            qoValue.forEach(function (qov) {
              qoStrings.push(qoName + "=" + encodeURIComponent(qov));
            });
          } else {
            qoStrings.push(qoName + "=" + encodeURIComponent(qoValue));
          }
        }
      }

      if (qoStrings.length > 0) {
        return "?" + qoStrings.join("&");
      } else {
        return "";
      }
    }
  };

  breeze.Predicate.prototype.toODataFragment = function(context) {
    return this.visit( context, toODataFragmentVisitor);
  }

  toODataFragmentVisitor = (function () {
    var visitor = {

      passthruPredicate: function () {
        return this.value;
      },

      unaryPredicate: function (context) {
        var predVal = this.pred.visit(context);
        return odataOpFrom(this) + " " + "(" + predVal + ")";
      },

      binaryPredicate: function (context) {
        var expr1Val = this.expr1.visit(context);
        var expr2Val = this.expr2.visit(context);
        var prefix = context.prefix;
        if (prefix) {
          expr1Val = prefix + "/" + expr1Val;
        }

        var odataOp = odataOpFrom(this);

        if (this.op.key === 'in') {
          var result = expr2Val.map(function (v) {
            return "(" + expr1Val + " eq " + v + ")";
          }).join(" or ");
          return result;
        } else if (this.op.isFunction) {
          if (odataOp === "substringof") {
            return odataOp + "(" + expr2Val + "," + expr1Val + ") eq true";
          } else {
            return odataOp + "(" + expr1Val + "," + expr2Val + ") eq true";
          }
        } else {
          return expr1Val + " " + odataOp + " " + expr2Val;
        }
      },

      andOrPredicate: function (context) {
        var result = this.preds.map(function (pred) {
          var predVal = pred.visit(context);
          return "(" + predVal + ")";
        }).join(" " + odataOpFrom(this) + " ");
        return result;
      },

      anyAllPredicate: function (context) {
        var exprVal = this.expr.visit(context);
        var prefix = context.prefix;
        if (prefix) {
          exprVal = prefix + "/" + exprVal;
          prefix = "x" + (parseInt(prefix.substring(1)) + 1);
        } else {
          prefix = "x1";
        }
        // need to create a new context because of 'prefix'
        var newContext = breeze.core.extend({}, context);
        newContext.entityType = this.expr.dataType;
        newContext.prefix = prefix;
        var newPredVal = this.pred.visit(newContext);
        return exprVal + "/" + odataOpFrom(this) + "(" + prefix + ": " + newPredVal + ")";
      },

      litExpr: function () {
        if (Array.isArray(this.value)) {
          return this.value.map(function(v) { return this.dataType.fmtOData(v)}, this);
        } else {
          return this.dataType.fmtOData(this.value);
        }
      },

      propExpr: function (context) {
        var entityType = context.entityType;
        // '/' is the OData path delimiter
        return entityType ? entityType.clientPropertyPathToServer(this.propertyPath, "/") : this.propertyPath;
      },

      fnExpr: function (context) {
        var exprVals = this.exprs.map(function(expr) {
          return expr.visit(context);
        });
        return this.fnName + "(" + exprVals.join(",") + ")";
      }
    };

    var _operatorMap = {
      'contains': 'substringof'
    };

    function odataOpFrom(node) {
      var op = node.op.key;
      var odataOp = _operatorMap[op];
      return odataOp || op;
    }

    return visitor;
  }());

  breeze.config.registerAdapter("uriBuilder", ctor);

}));





;
// set defaults
// will no longer fail at initialization time if jQuery is not found.
breeze.config.initializeAdapterInstances( { dataService: "webApi", ajax: "jQuery", uriBuilder: "odata" });

var ko = __requireLibCore("ko");

if (ko) {
    breeze.config.initializeAdapterInstance("modelLibrary", "ko");
} else {
    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore");
}

return breeze;
});
