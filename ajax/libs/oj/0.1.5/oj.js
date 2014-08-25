//
// oj.js v0.1.5
// ojjs.org
//
// Copyright 2013, Evan Moran
// Released under the MIT License
//
(function() {
  var ArrayP, FuncP, ObjP, concat, dhp, exports, jqName, jqueryEvents, key, ojName, pass, plugins, root, slice, strict4, strict5, t, typeName, unshift, w3, _argsStack, _attributeCMeansClassAndAllowsArrays, _attributeOmitFalsyValues, _attributeStyleAllowsObject, _attributesBindEventsToDOM, _attributesFilterOutEvents, _attributesFromObject, _attributesProcessedForOJ, _boundOrThrow, _breaker, _chars, _clone, _compileAny, _compileDeeper, _compileTag, _construct, _contains, _createQuietType, _cssFromMediaObject, _cssFromPluginObject, _dasherize, _decamelize, _defaults, _doctypes, _each, _extend, _flatten, _flattenCSSMap, _flattenCSSMap_, _fn, _fn1, _getInstanceOnElement, _getQuietTagName, _getTagName, _has, _i, _identity, _indexOf, _inherit, _insertStyles, _isCapitalLetter, _isEmpty, _j, _jqGetValue, _jqueryExtend, _keys, _len, _len1, _map, _omit, _onLoadQueue, _pathNormalizeArray, _pathSplit, _pathSplitRe, _randomInteger, _reduce, _ref, _ref1, _ref2, _setInstanceOnElement, _setObject, _setTagName, _some, _sortedIndex, _splitAndTrim, _styleClassFromPlugin, _styleFromObject, _toArray, _triggerTypes, _uniqueSort, _uniqueSortedUnion, _values,
    __slice = [].slice;

  root = this;

  function oj(){
      return oj.tag.apply(this, ['oj'].concat([].slice.call(arguments)).concat([{__quiet__:1}]));
    };

  oj.version = '0.1.5';

  oj.isClient = !(typeof process !== "undefined" && process !== null ? (_ref = process.versions) != null ? _ref.node : void 0 : void 0);

  if (typeof $ !== 'undefined') {
    oj.$ = $;
  } else if (typeof require !== 'undefined') {
    try {
      oj.$ = require('jquery');
    } catch (_error) {}
  }

  if (typeof module !== 'undefined') {
    exports = module.exports = oj;
  } else {
    root['oj'] = oj;
  }

  oj.oj = oj;

  oj.load = function(page) {
    return oj.$(function() {
      oj.$.ojBody(require(page));
      return oj.onload();
    });
  };

  _onLoadQueue = {
    queue: [],
    loaded: false
  };

  oj.onload = function(f) {
    if (oj.isUndefined(f)) {
      _onLoadQueue.loaded = true;
      while ((f = _onLoadQueue.queue.shift())) {
        f();
      }
    } else if (_onLoadQueue.loaded) {
      f();
    } else {
      _onLoadQueue.queue.push(f);
    }
  };

  oj.emit = function() {
    var ojml;

    return ojml = oj.tag.apply(oj, ['oj'].concat(__slice.call(arguments)));
  };

  oj.id = function(len, chars) {
    return 'oj' + oj.guid(len, chars);
  };

  _randomInteger = function(min, max) {
    var diff, rnd;

    if (min === null || max === null || min > max) {
      return null;
    }
    diff = max - min;
    rnd = Math.floor(Math.random() * (diff + 1));
    return rnd + min;
  };

  _chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('');

  oj.guid = function(len, chars) {
    var base, charNext, charsPerRand, i, output, rand, randMax, randMin, _i;

    if (len == null) {
      len = 8;
    }
    if (chars == null) {
      chars = _chars;
    }
    base = chars.length;
    charsPerRand = Math.floor(Math.log(Math.pow(2, 31) - 1) / Math.log(base));
    randMin = 0;
    randMax = Math.pow(base, charsPerRand) - 1;
    output = "";
    for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
      if (i % charsPerRand === 0) {
        rand = _randomInteger(randMin, randMax);
      }
      charNext = chars[rand % base];
      output += charNext;
      rand = Math.floor(rand / base);
    }
    return output;
  };

  ArrayP = Array.prototype;

  FuncP = Function.prototype;

  ObjP = Object.prototype;

  slice = ArrayP.slice;

  unshift = ArrayP.unshift;

  concat = ArrayP.concat;

  oj.isOJ = function(obj) {
    return !!(obj != null ? obj.isOJ : void 0);
  };

  oj.isOJType = function(obj) {
    return oj.isOJ(obj) && obj.type === obj;
  };

  oj.isOJInstance = function(obj) {
    return oj.isOJ(obj) && !oj.isOJType(obj);
  };

  oj.isEvent = function(obj) {
    return !!(obj && obj.on && obj.off && obj.trigger);
  };

  oj.isDOM = function(obj) {
    return !!(obj && (obj.nodeType != null));
  };

  oj.isDOMElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  oj.isDOMAttribute = function(obj) {
    return !!(obj && obj.nodeType === 2);
  };

  oj.isDOMText = function(obj) {
    return !!(obj && obj.nodeType === 3);
  };

  oj.isjQuery = function(obj) {
    return !!(obj && obj.jquery);
  };

  oj.isUndefined = function(obj) {
    return obj === void 0;
  };

  oj.isBoolean = function(obj) {
    return obj === true || obj === false || ObjP.toString.call(obj) === '[object Boolean]';
  };

  oj.isNumber = function(obj) {
    return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
  };

  oj.isString = function(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
  };

  oj.isDate = function(obj) {
    return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
  };

  oj.isFunction = function(obj) {
    return typeof obj === 'function';
  };

  oj.isArray = Array.isArray || function(obj) {
    return ObjP.toString.call(obj) === '[object Array]';
  };

  oj.isRegEx = function(obj) {
    return ObjP.toString.call(obj) === '[object RegExp]';
  };

  oj.isArguments = function(obj) {
    return ObjP.toString.call(obj) === '[object Arguments]';
  };

  oj.isDefined = function(obj) {
    return !(typeof obj === 'undefined');
  };

  oj.typeOf = function(any) {
    var t;

    if (any === null) {
      return 'null';
    }
    t = typeof any;
    if (t === 'object') {
      if (oj.isArray(any)) {
        t = 'array';
      } else if (oj.isOJ(any)) {
        t = any.typeName;
      } else if (oj.isRegEx(any)) {
        t = 'regexp';
      } else if (oj.isDate(any)) {
        t = 'date';
      } else if (oj.isDOMElement(any)) {
        t = 'dom-element';
      } else if (oj.isDOMText(any)) {
        t = 'dom-text';
      } else if (oj.isDOMAttribute(any)) {
        t = 'dom-attribute';
      } else if (oj.isjQuery(any)) {
        t = 'jquery';
      } else {
        t = 'object';
      }
    }
    return t;
  };

  oj.parse = function(str) {
    var number;

    if (str === 'undefined') {
      return void 0;
    } else if (str === 'null') {
      return null;
    } else if (str === 'true') {
      return true;
    } else if (str === 'false') {
      return false;
    } else if (!(isNaN(number = parseFloat(str)))) {
      return number;
    } else {
      return str;
    }
  };

  oj.isObject = function(obj) {
    return (oj.typeOf(obj)) === 'object';
  };

  _isCapitalLetter = function(c) {
    return !!(c.match(/[A-Z]/));
  };

  _identity = function(v) {
    return v;
  };

  _has = function(obj, key) {
    return ObjP.hasOwnProperty.call(obj, key);
  };

  _keys = Object.keys || function(obj) {
    var key, keys;

    if (obj !== Object(obj)) {
      throw 'Invalid object';
    }
    keys = [];
    for (key in obj) {
      if (_has(obj, key)) {
        keys[keys.length] = key;
      }
    }
    return keys;
  };

  _values = function(obj) {
    var out;

    if (obj !== Object(obj)) {
      throw 'Invalid object';
    }
    out = [];
    _each(obj, function(v) {
      return out.push(v);
    });
    return out;
  };

  _flatten = function(array, shallow) {
    return _reduce(array, (function(memo, value) {
      if (oj.isArray(value)) {
        return memo.concat(shallow ? value : _flatten(value));
      }
      memo[memo.length] = value;
      return memo;
    }), []);
  };

  _reduce = function(obj, iterator, memo, context) {
    var ctor, initial, _bind;

    if (obj == null) {
      obj = [];
    }
    initial = arguments.length > 2;
    if (ArrayP.reduce && obj.reduce === ArrayP.reduce) {
      if (context) {
        iterator = _bind(iterator, context);
      }
      if (initial) {
        return obj.reduce(iterator, memo);
      } else {
        return obj.reduce(iterator);
      }
    }
    _each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        return initial = true;
      } else {
        return memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    memo;
    ctor = function() {};
    return _bind = function(func, context) {
      var args, bound;

      if (func.bind === FuncP.bind && FuncP.bind) {
        return FuncP.bind.apply(func, slice.call(arguments, 1));
      }
      args = slice.call(arguments, 2);
      return bound = function() {
        var result, self;

        if (!(this instanceof bound)) {
          return func.apply(context, args.concat(slice.call(arguments)));
        }
        ctor.prototype = func.prototype;
        self = new ctor;
        result = func.apply(self, args.concat(slice.call(arguments)));
        if (Object(result) === result) {
          return result;
        }
        return self;
      };
    };
  };

  _sortedIndex = function(array, obj, iterator) {
    var high, low, mid;

    if (iterator == null) {
      iterator = _identity;
    }
    low = 0;
    high = array.length;
    while (low < high) {
      mid = (low + high) >> 1;
      if (iterator(array[mid]) < iterator(obj)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  };

  _indexOf = function(array, item, isSorted) {
    var i;

    if (array == null) {
      return -1;
    }
    if (isSorted) {
      i = _sortedIndex(array, item);
      if (array[i] === item) {
        return i;
      } else {
        return -1;
      }
    }
    if (ArrayP.indexOf && array.indexOf === ArrayP.indexOf) {
      return array.indexOf(item);
    }
    return -1;
  };

  _toArray = function(obj) {
    if (!obj) {
      return [];
    }
    if (oj.isArray(obj)) {
      return slice.call(obj);
    }
    if (oj.isArguments(obj)) {
      return slice.call(obj);
    }
    if (obj.toArray && oj.isFunction(obj.toArray)) {
      return obj.toArray();
    }
    return _values(obj);
  };

  _isEmpty = function(obj) {
    var k;

    if (oj.isArray(obj)) {
      return obj.length === 0;
    }
    for (k in obj) {
      if (_has(obj, k)) {
        return false;
      }
    }
    return true;
  };

  _clone = function(obj) {
    if (!((oj.isArray(obj)) || (oj.isObject(obj)))) {
      return obj;
    }
    if (oj.isArray(obj)) {
      return obj.slice();
    } else {
      return _extend({}, obj);
    }
  };

  _contains = function(obj, target) {
    if (obj == null) {
      return false;
    }
    if (ArrayP.indexOf && obj.indexOf === ArrayP.indexOf) {
      return obj.indexOf(target) !== -1;
    }
    return _some(obj, function(value) {
      return value === target;
    });
  };

  _some = function(obj, iterator, context) {
    var result;

    if (iterator == null) {
      iterator = _identity;
    }
    result = false;
    if (obj == null) {
      return result;
    }
    if (ArrayP.some && obj.some === ArrayP.some) {
      return obj.some(iterator, context);
    }
    _each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) {
        return breaker;
      }
    });
    return !!result;
  };

  _setObject = function() {
    var ix, k, keys, o, obj, value, _i, _j, _len;

    obj = arguments[0], keys = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), value = arguments[_i++];
    o = obj;
    for (ix = _j = 0, _len = keys.length; _j < _len; ix = ++_j) {
      k = keys[ix];
      if (typeof o[k] !== 'object') {
        if (!(typeof o[k] === 'object')) {
          o[k] = {};
        }
      }
      if (ix === keys.length - 1) {
        o[k] = value;
        break;
      }
      o = o[k];
    }
    return obj;
  };

  _breaker = {};

  _each = function(col, iterator, context) {
    var i, k, v, _i, _len;

    if (col === null) {
      return;
    }
    if (ArrayP.forEach && col.forEach === ArrayP.forEach) {
      return col.forEach(iterator, context);
    } else if (oj.isArray(col)) {
      for (i = _i = 0, _len = col.length; _i < _len; i = ++_i) {
        v = col[i];
        if (iterator.call(context, v, i, col) === _breaker) {
          return _breaker;
        }
      }
    } else {
      for (k in col) {
        v = col[k];
        if (_has(col, k)) {
          if (iterator.call(context, v, k, col) === _breaker) {
            return _breaker;
          }
        }
      }
    }
  };

  _map = function(obj, iterator, options) {
    var context, evaluate, iterator_, k, out, r, recurse, v;

    if (options == null) {
      options = {};
    }
    context = options.context;
    recurse = options.recurse;
    evaluate = options.evaluate;
    iterator_ = iterator;
    if (recurse) {
      (function(options) {
        return iterator_ = function(v, k, o) {
          var options_;

          options_ = _extend(_clone(options), {
            key: k,
            object: v
          });
          return _map(v, iterator, options_);
        };
      })(options);
    }
    if (oj.isFunction(obj)) {
      if (!evaluate) {
        return obj;
      }
      while (evaluate && oj.isFunction(obj)) {
        obj = obj();
      }
    }
    out = obj;
    if (oj.isArray(obj)) {
      out = [];
      if (!obj) {
        return out;
      }
      if (ArrayP.map && obj.map === ArrayP.map) {
        return obj.map(iterator_, context);
      }
      _each(obj, (function(v, ix, list) {
        return out[out.length] = iterator_.call(context, v, ix, list);
      }));
      if (obj.length === +obj.length) {
        out.length = obj.length;
      }
    } else if (oj.isObject(obj)) {
      out = {};
      if (!obj) {
        return out;
      }
      for (k in obj) {
        v = obj[k];
        if ((r = iterator_.call(context, v, k, obj)) !== void 0) {
          out[k] = r;
        }
      }
    } else {
      return iterator.call(context, obj, options.key, options.object);
    }
    return out;
  };

  _extend = function(obj) {
    _each(slice.call(arguments, 1), (function(source) {
      var key, value, _results;

      _results = [];
      for (key in source) {
        value = source[key];
        _results.push(obj[key] = value);
      }
      return _results;
    }));
    return obj;
  };

  _defaults = function(obj) {
    _each(slice.call(arguments, 1), (function(source) {
      var prop, _results;

      _results = [];
      for (prop in source) {
        if (obj[prop] == null) {
          _results.push(obj[prop] = source[prop]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }));
    return obj;
  };

  _omit = function(obj) {
    var copy, key, keys;

    copy = {};
    keys = concat.apply(ArrayP, slice.call(arguments, 1));
    for (key in obj) {
      if (!_contains(keys, key)) {
        copy[key] = obj[key];
      }
    }
    return copy;
  };

  _uniqueSort = function(array, isSorted) {
    var item, ix, out, _i, _len;

    if (isSorted == null) {
      isSorted = false;
    }
    if (!isSorted) {
      array.sort();
    }
    out = [];
    for (ix = _i = 0, _len = array.length; _i < _len; ix = ++_i) {
      item = array[ix];
      if (ix > 0 && array[ix - 1] === array[ix]) {
        continue;
      }
      out.push(item);
    }
    return out;
  };

  _uniqueSortedUnion = function(arr, arr2) {
    return _uniqueSort(arr.concat(arr2));
  };

  _boundOrThrow = function(ix, count, message, method) {
    var ixNew;

    ixNew = ix < 0 ? ix + count : ix;
    if (!(0 <= ixNew && ixNew < count)) {
      throw new Error("oj." + method + message + " is out of bounds (" + ix + " in [0," + (count - 1) + "])");
    }
    return ixNew;
  };

  _splitAndTrim = function(str, seperator, limit) {
    var r;

    r = str.split(seperator, limit);
    return _map(r, function(v) {
      return v.trim();
    });
  };

  _dasherize = function(str) {
    return _decamelize(str).replace(/[ _]/g, '-');
  };

  _decamelize = function(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  };

  _pathSplitRe = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/;

  _pathSplit = function(filename) {
    var result;

    result = _pathSplitRe.exec(filename);
    return [result[1] || '', result[2] || '', result[3] || '', result[4] || ''];
  };

  _pathNormalizeArray = function(parts, allowAboveRoot) {
    var i, last, up;

    up = 0;
    i = parts.length - 1;
    while (i >= 0) {
      last = parts[i];
      if (last === '.') {
        parts.splice(i, 1);
      } else if (last === '..') {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
      i--;
    }
    if (allowAboveRoot) {
      while (up--) {
        parts.unshift('..');
      }
    }
    return parts;
  };

  oj._pathResolve = function() {
    var i, path, resolvedAbsolute, resolvedPath;

    resolvedPath = '';
    resolvedAbsolute = false;
    i = arguments.length - 1;
    while (i >= -1 && !resolvedAbsolute) {
      path = i >= 0 ? arguments[i] : process.cwd();
      if ((typeof path !== 'string') || !path) {
        continue;
      }
      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
      i--;
    }
    resolvedPath = _pathNormalizeArray(resolvedPath.split('/').filter(function(p) {
      return !!p;
    }), !resolvedAbsolute).join('/');
    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
  };

  oj._pathNormalize = function(path) {
    var isAbsolute, trailingSlash;

    isAbsolute = path.charAt(0) === '/';
    trailingSlash = path.substr(-1) === '/';
    path = _pathNormalizeArray(path.split('/').filter(function(p) {
      return !!p;
    }), !isAbsolute).join('/');
    if (!path && !isAbsolute) {
      path = '.';
    }
    if (path && trailingSlash) {
      path += '/';
    }
    return (isAbsolute ? '/' : '') + path;
  };

  oj._pathJoin = function() {
    var paths;

    paths = slice.call(arguments, 0);
    return oj._pathNormalize(paths.filter(function(p, index) {
      return p && typeof p === 'string';
    }).join('/'));
  };

  oj._pathDirname = function(path) {
    var dir, result;

    result = _pathSplit(path);
    root = result[0];
    dir = result[1];
    if (!root && !dir) {
      return '.';
    }
    if (dir) {
      dir = dir.substr(0, dir.length - 1);
    }
    return root + dir;
  };

  oj.dependency = function(name, check) {
    if (check == null) {
      check = function() {
        if (oj.isClient) {
          return oj.isDefined(window[name]);
        } else {
          return oj.isDefined(global[name]);
        }
      };
    }
    if (!check()) {
      throw new Error("oj: " + name + " dependency is missing");
    }
  };

  oj.addMethods = function(obj, mapNameToMethod) {
    var method, methodName;

    for (methodName in mapNameToMethod) {
      method = mapNameToMethod[methodName];
      oj.addMethod(obj, methodName, method);
    }
  };

  oj.addMethod = function(obj, methodName, method) {
    if (!oj.isString(methodName)) {
      throw 'oj.addMethod: string expected for second argument';
    }
    if (!oj.isFunction(method)) {
      throw 'oj.addMethod: function expected for thrid argument';
    }
    Object.defineProperty(obj, methodName, {
      value: method,
      enumerable: false,
      writable: false,
      configurable: true
    });
  };

  oj.removeMethod = function(obj, methodName) {
    if (!oj.isString(methodName)) {
      throw 'oj.removeMethod: string expected for second argument';
    }
  };

  oj.addProperties = function(obj, mapNameToInfo) {
    var propInfo, propName;

    for (propName in mapNameToInfo) {
      propInfo = mapNameToInfo[propName];
      if (((propInfo != null ? propInfo.get : void 0) == null) && ((propInfo != null ? propInfo.value : void 0) == null)) {
        propInfo = {
          value: propInfo,
          writable: true
        };
      }
      oj.addProperty(obj, propName, propInfo);
    }
  };

  oj.addProperty = function(obj, propName, propInfo) {
    if (!oj.isString(propName)) {
      throw new Error('oj.addProperty: string expected for second argument');
    }
    if (!oj.isObject(propInfo)) {
      throw new Error('oj.addProperty: object expected for third argument');
    }
    _defaults(propInfo, {
      enumerable: true,
      configurable: true
    });
    if (Object.getOwnPropertyDescriptor(obj, propName) != null) {
      oj.removeProperty(obj, propName);
    }
    Object.defineProperty(obj, propName, propInfo);
  };

  oj.removeProperty = function(obj, propName) {
    if (!oj.isString(propName)) {
      throw new Error('oj.addProperty: string expected for second argument');
    }
    return delete obj[propName];
  };

  oj.isProperty = function(obj, propName) {
    if (!oj.isString(propName)) {
      throw new Error('oj.isProperty: string expected for second argument');
    }
    return Object.getOwnPropertyDescriptor(obj, propName).get != null;
  };

  oj.copyProperty = function(dest, source, propName) {
    var info;

    info = Object.getOwnPropertyDescriptor(source, propName);
    if (info.value != null) {
      info.value = _clone(info.value);
    }
    return Object.defineProperty(dest, propName, info);
  };

  _argsStack = [];

  oj._argsTop = function() {
    if (_argsStack.length) {
      return _argsStack[_argsStack.length - 1];
    } else {
      return null;
    }
  };

  oj._argsPush = function(args) {
    if (args == null) {
      args = [];
    }
    _argsStack.push(args);
  };

  oj._argsPop = function() {
    if (_argsStack.length) {
      return _argsStack.pop();
    }
    return null;
  };

  oj._argsAppend = function(arg) {
    var top;

    top = oj._argsTop();
    if (top != null) {
      top.push(arg);
    }
  };

  oj.tag = function() {
    var arg, args, attributes, isQuiet, len, name, ojml, r, rest, _i, _len, _ref1;

    name = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (!oj.isString(name)) {
      throw 'oj.tag error: argument 1 is not a string (expected tag name)';
    }
    ojml = [name];
    _ref1 = oj.unionArguments(rest), args = _ref1.args, attributes = _ref1.options;
    if (isQuiet = attributes.__quiet__) {
      delete attributes.__quiet__;
    }
    if (!_isEmpty(attributes)) {
      ojml.push(attributes);
    }
    oj._argsPush(ojml);
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      arg = args[_i];
      if (oj.isObject(arg)) {
        continue;
      } else if (oj.isFunction(arg)) {
        len = oj._argsTop().length;
        r = arg();
        if (len === oj._argsTop().length && (r != null)) {
          oj._argsAppend(r);
        }
      } else {
        oj._argsAppend(arg);
      }
    }
    oj._argsPop();
    if (!isQuiet) {
      oj._argsAppend(ojml);
    }
    return ojml;
  };

  oj.tag.elements = {
    closed: 'a abbr acronym address applet article aside audio b bdo big blockquote body button canvas caption center cite code colgroup command datalist dd del details dfn dir div dl dt em embed fieldset figcaption figure font footer form frameset h1 h2 h3 h4 h5 h6 head header hgroup html i iframe ins keygen kbd label legend li map mark menu meter nav noframes noscript object ol optgroup option output p pre progress q rp rt ruby s samp script section select small source span strike strong style sub summary sup table tbody td textarea tfoot th thead time title tr tt u ul var video wbr xmp'.split(' '),
    open: 'area base br col command css !DOCTYPE embed hr img input keygen link meta param source track wbr'.split(' ')
  };

  oj.tag.elements.all = (oj.tag.elements.closed.concat(oj.tag.elements.open)).sort();

  oj.tag.isClosed = function(tag) {
    return (_indexOf(oj.tag.elements.open, tag, true)) === -1;
  };

  _setTagName = function(tag, name) {
    if (tag != null) {
      tag.tagName = name;
    }
  };

  _getTagName = function(tag) {
    return tag.tagName;
  };

  _getQuietTagName = function(tag) {
    return '_' + tag;
  };

  _setInstanceOnElement = function(el, inst) {
    if (el != null) {
      el.oj = inst;
    }
  };

  _getInstanceOnElement = function(el) {
    if ((el != null ? el.oj : void 0) != null) {
      return el.oj;
    } else {
      return null;
    }
  };

  _ref1 = oj.tag.elements.all;
  _fn = function(t) {
    var qt;

    oj[t] = function() {
      return oj.tag.apply(oj, [t].concat(__slice.call(arguments)));
    };
    qt = _getQuietTagName(t);
    oj[qt] = function() {
      return oj.tag.apply(oj, [t, {
        __quiet__: 1
      }].concat(__slice.call(arguments)));
    };
    _setTagName(oj[t], t);
    return _setTagName(oj[qt], t);
  };
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    t = _ref1[_i];
    _fn(t);
  }

  dhp = 'HTML PUBLIC "-//W3C//DTD HTML 4.01';

  w3 = '"http://www.w3.org/TR/html4/';

  strict5 = 'html';

  strict4 = dhp + '//EN" ' + w3 + 'strict.dtd"';

  _doctypes = {
    '5': strict5,
    'HTML 5': strict5,
    '4': strict4,
    'HTML 4.01 Strict': strict4,
    'HTML 4.01 Frameset': dhp + ' Frameset//EN" ' + w3 + 'frameset.dtd"',
    'HTML 4.01 Transitional': dhp + ' Transitional//EN" ' + w3 + 'loose.dtd"'
  };

  oj.doctype = function(typeOrValue) {
    var value, _ref2;

    if (typeOrValue == null) {
      typeOrValue = '5';
    }
    value = (_ref2 = _doctypes[typeOrValue]) != null ? _ref2 : typeOrValue;
    return oj['!DOCTYPE'](value);
  };

  oj.useGlobally = oj.extendInto = function(context) {
    var k, o, qn, v;

    if (context == null) {
      context = root;
    }
    o = {};
    for (k in oj) {
      v = oj[k];
      if (k[0] !== '_' && k !== 'extendInto' && k !== 'useGlobally') {
        o[k] = v;
        qn = _getQuietTagName(k);
        if (oj[qn]) {
          o[qn] = oj[qn];
        }
      }
    }
    return _extend(context, o);
  };

  oj.compile = function(options, ojml) {
    var acc, css, cssMap, dom, html, out, pluginCSSMap;

    if (ojml == null) {
      ojml = options;
      options = {};
    }
    options = _defaults({}, options, {
      html: true,
      dom: false,
      css: false,
      cssMap: false,
      minify: false,
      ignore: {}
    });
    _extend(options.ignore, {
      oj: 1,
      css: 1
    });
    acc = _clone(options);
    acc.html = options.html ? [] : null;
    acc.dom = options.dom && (typeof document !== "undefined" && document !== null) ? document.createElement('OJ') : null;
    acc.css = options.css || options.cssMap ? {} : null;
    acc.indent = '';
    if (options.dom) {
      acc.types = [];
    }
    acc.tags = {};
    _compileAny(ojml, acc);
    if (acc.css != null) {
      pluginCSSMap = _flattenCSSMap(acc.css);
    }
    if (options.cssMap) {
      cssMap = pluginCSSMap;
    }
    if (options.css) {
      css = _cssFromPluginObject(pluginCSSMap, {
        minify: options.minify,
        tags: 0
      });
    }
    if (options.html) {
      html = acc.html.join('');
    }
    if (options.dom) {
      dom = acc.dom.childNodes;
      if (dom.length != null) {
        dom = _toArray(dom);
        dom = dom.filter(function(v) {
          return oj.isDOM(v);
        });
      }
      if (dom.length === 0) {
        dom = null;
      } else if (dom.length === 1) {
        dom = dom[0];
      }
    }
    out = {
      html: html,
      dom: dom,
      css: css,
      cssMap: cssMap,
      types: acc.types,
      tags: acc.tags
    };
    return out;
  };

  _styleFromObject = function(obj, options) {
    var indent, ix, k, kFancy, keys, newline, out, semi, _j, _len1, _ref2;

    if (options == null) {
      options = {};
    }
    _defaults(options, {
      inline: true,
      indent: ''
    });
    options.semi = !options.inline;
    out = "";
    keys = _keys(obj).sort();
    indent = (_ref2 = options.indent) != null ? _ref2 : '';
    newline = options.inline ? '' : '\n';
    for (ix = _j = 0, _len1 = keys.length; _j < _len1; ix = ++_j) {
      kFancy = keys[ix];
      semi = options.semi || ix !== keys.length - 1 ? ";" : '';
      k = _dasherize(kFancy);
      out += "" + indent + k + ":" + obj[kFancy] + semi + newline;
    }
    return out;
  };

  _attributesFromObject = function(obj) {
    var k, out, space, v, _j, _len1, _ref2;

    if (!oj.isObject(obj)) {
      return obj;
    }
    out = '';
    space = '';
    _ref2 = _keys(obj).sort();
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      k = _ref2[_j];
      v = obj[k];
      if (v === true) {
        out += "" + space + k;
      } else {
        out += "" + space + k + "=\"" + v + "\"";
      }
      space = ' ';
    }
    return out;
  };

  _flattenCSSMap = function(cssMap) {
    var cssMap_, flatMap, plugin;

    flatMap = {};
    for (plugin in cssMap) {
      cssMap_ = cssMap[plugin];
      _flattenCSSMap_(cssMap_, flatMap, [''], [''], plugin);
    }
    return flatMap;
  };

  _flattenCSSMap_ = function(cssMap, flatMapAcc, selectorsAcc, mediasAcc, plugin) {
    var mediaCur, mediaInner, mediaOuter, mediaParts, mediaWithAnds, medias, mediasNext, rules, selCur, selInner, selOuter, selector, selectorParts, selectorWithCommas, selectorsNext, _j, _k, _l, _len1, _len2, _len3, _len4, _m;

    medias = {
      'widescreen': 'only screen and (min-width: 1200px)',
      'monitor': '',
      'tablet': 'only screen and (min-width: 768px) and (max-width: 959px)',
      'phone': 'only screen and (max-width: 767px)'
    };
    for (selector in cssMap) {
      rules = cssMap[selector];
      if (typeof rules === 'object') {
        if (selector.indexOf('@media') === 0) {
          selectorsNext = selectorsAcc;
          selector = (selector.slice('@media'.length)).trim();
          mediaParts = _splitAndTrim(selector, ',');
          mediaParts = _map(mediaParts, function(v) {
            if (medias[v] != null) {
              return medias[v];
            } else {
              return v;
            }
          });
          mediasNext = [];
          for (_j = 0, _len1 = mediasAcc.length; _j < _len1; _j++) {
            mediaOuter = mediasAcc[_j];
            for (_k = 0, _len2 = mediaParts.length; _k < _len2; _k++) {
              mediaInner = mediaParts[_k];
              mediaCur = mediaInner;
              if ((mediaInner.indexOf('&')) === -1 && mediaOuter !== '') {
                mediaCur = "& and " + mediaInner;
              }
              mediasNext.push(mediaCur.replace(/&/g, mediaOuter));
            }
          }
        } else {
          mediasNext = mediasAcc;
          selectorParts = _splitAndTrim(selector, ',');
          selectorsNext = [];
          for (_l = 0, _len3 = selectorsAcc.length; _l < _len3; _l++) {
            selOuter = selectorsAcc[_l];
            for (_m = 0, _len4 = selectorParts.length; _m < _len4; _m++) {
              selInner = selectorParts[_m];
              selCur = selInner;
              if ((selInner.indexOf('&')) === -1 && selOuter !== '') {
                selCur = "& " + selInner;
              }
              selectorsNext.push(selCur.replace(/&/g, selOuter));
            }
          }
        }
        _flattenCSSMap_(rules, flatMapAcc, selectorsNext, mediasNext, plugin);
      } else {
        selectorWithCommas = selectorsAcc.sort().join(',');
        mediaWithAnds = mediasAcc.sort().join(',');
        if (mediaWithAnds !== '') {
          mediaWithAnds = "@media " + mediaWithAnds;
        }
        _setObject(flatMapAcc, plugin, mediaWithAnds, selectorWithCommas, selector, rules);
      }
    }
  };

  _styleClassFromPlugin = function(plugin) {
    return "" + plugin + "-style";
  };

  oj._styleTagFromMediaObject = function(plugin, mediaMap, options) {
    var css, newline;

    newline = (options != null ? options.minify : void 0) ? '' : '\n';
    css = _cssFromMediaObject(mediaMap, options);
    return "<style class=\"" + (_styleClassFromPlugin(plugin)) + "\">" + newline + css + "</style>";
  };

  oj._minifyJS = function(js, options) {
    return js;
  };

  oj._minifyCSS = function(css, options) {
    return css;
  };

  _cssFromMediaObject = function(mediaMap, options) {
    var css, eCSS, indent, indentRule, inline, media, minify, newline, rules, selector, selectorMap, space, styles, tags, _ref2, _ref3;

    if (options == null) {
      options = {};
    }
    minify = (_ref2 = options.minify) != null ? _ref2 : 0;
    tags = (_ref3 = options.tags) != null ? _ref3 : 0;
    newline = minify ? '' : '\n';
    space = minify ? '' : ' ';
    inline = minify;
    css = '';
    for (media in mediaMap) {
      selectorMap = mediaMap[media];
      if (media) {
        media = media.replace(/,/g, "," + space);
        css += "" + media + space + "{" + newline;
      }
      for (selector in selectorMap) {
        styles = selectorMap[selector];
        indent = (!minify) && media ? '\t' : '';
        selector = selector.replace(/,/g, "," + newline);
        css += "" + indent + selector + space + "{" + newline;
        indentRule = !minify ? indent + '\t' : indent;
        rules = _styleFromObject(styles, {
          inline: inline,
          indent: indentRule
        });
        css += rules + indent + '}' + newline;
      }
      if (media !== '') {
        css += '}' + newline;
      }
    }
    try {
      css = oj._minifyCSS(css, options);
    } catch (_error) {
      eCSS = _error;
      throw new Error("css minification error: " + eCSS.message + "\nCould not minify:\n" + css);
    }
    return css;
  };

  _cssFromPluginObject = function(flatCSSMap, options) {
    var css, inline, mediaMap, minify, newline, plugin, space, tags, _ref2, _ref3;

    if (options == null) {
      options = {};
    }
    minify = (_ref2 = options.minify) != null ? _ref2 : 0;
    tags = (_ref3 = options.tags) != null ? _ref3 : 0;
    newline = minify ? '' : '\n';
    space = minify ? '' : ' ';
    inline = minify;
    css = '';
    for (plugin in flatCSSMap) {
      mediaMap = flatCSSMap[plugin];
      if (tags) {
        css += "<style class=\"" + plugin + "-style\">" + newline;
      }
      css += _cssFromMediaObject(mediaMap, options);
      if (tags) {
        css += "" + newline + "</style>" + newline;
      }
    }
    return css;
  };

  _compileDeeper = function(method, ojml, options) {
    var i;

    i = options.indent;
    options.indent += '\t';
    method(ojml, options);
    return options.indent = i;
  };

  pass = function() {};

  _compileAny = function(ojml, options) {
    var els, _ref10, _ref11, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;

    switch (oj.typeOf(ojml)) {
      case 'array':
        _compileTag(ojml, options);
        break;
      case 'string':
        if ((_ref2 = options.html) != null) {
          _ref2.push(ojml);
        }
        if (ojml.length > 0 && ojml[0] === '<') {
          root = document.createElement('div');
          root.innerHTML = ojml;
          els = root.childNodes;
          if ((_ref3 = options.dom) != null) {
            _ref3.appendChild(root);
          }
        } else {
          if ((_ref4 = options.dom) != null) {
            _ref4.appendChild(document.createTextNode(ojml));
          }
        }
        break;
      case 'boolean':
      case 'number':
        if ((_ref5 = options.html) != null) {
          _ref5.push("" + ojml);
        }
        if ((_ref6 = options.dom) != null) {
          _ref6.appendChild(document.createTextNode("" + ojml));
        }
        break;
      case 'function':
        _compileAny(oj(ojml), options);
        break;
      case 'date':
        if ((_ref7 = options.html) != null) {
          _ref7.push("" + (ojml.toLocaleString()));
        }
        if ((_ref8 = options.dom) != null) {
          _ref8.appendChild(document.createTextNode("" + (ojml.toLocaleString())));
        }
        break;
      case 'null':
        break;
      case 'undefined':
        break;
      case 'object':
        break;
      default:
        if (oj.isOJ(ojml)) {
          if ((_ref9 = options.types) != null) {
            _ref9.push(ojml);
          }
          if ((_ref10 = options.html) != null) {
            _ref10.push(ojml.toHTML(options));
          }
          if ((_ref11 = options.dom) != null) {
            _ref11.appendChild(ojml.toDOM(options));
          }
          if (options.css != null) {
            _extend(options.css, ojml.toCSSMap(options));
          }
        }
    }
  };

  _compileTag = function(ojml, options) {
    var att, attr, attrName, attrValue, attributes, child, children, el, events, selector, space, styles, tag, tagType, _base, _base1, _j, _k, _len1, _len2, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;

    if (ojml.length === 0) {
      return;
    }
    tag = ojml[0];
    tagType = typeof tag;
    tag = (tagType === 'function' || tagType === 'object') && (_getTagName(tag) != null) ? _getTagName(tag) : tag;
    if (!(oj.isString(tag) && tag.length > 0)) {
      throw new Error('oj.compile: tag name is missing');
    }
    options.tags[tag] = true;
    if (_isCapitalLetter(tag[0])) {
      return _compileDeeper(_compileAny, new oj[tag](ojml.slice(1)), options);
    }
    attributes = null;
    if (oj.isObject(ojml[1])) {
      attributes = ojml[1];
    }
    children = attributes ? ojml.slice(2) : ojml.slice(1);
    if (options.css && tag === 'css') {
      for (selector in attributes) {
        styles = attributes[selector];
        if ((_ref2 = (_base = options.css)['oj']) == null) {
          _base['oj'] = {};
        }
        if ((_ref3 = (_base1 = options.css['oj'])[selector]) == null) {
          _base1[selector] = {};
        }
        _extend(options.css['oj'][selector], styles);
      }
    }
    if (tag === '!DOCTYPE') {
      if (!oj.isString(ojml[1])) {
        throw new Error('oj.compile: doctype expects string as first argument');
      }
      if (!options.ignore[tag]) {
        if (options.html) {
          options.html.push("<" + tag + " " + ojml[1] + ">");
        }
      }
      return;
    }
    if (!options.ignore[tag]) {
      events = _attributesProcessedForOJ(attributes);
      if (options.dom && (typeof document !== "undefined" && document !== null)) {
        el = document.createElement(tag);
        if (oj.isDOMElement(options.dom)) {
          options.dom.appendChild(el);
        }
        options.dom = el;
        if (oj.isObject(attributes)) {
          _ref4 = _keys(attributes).sort();
          for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
            attrName = _ref4[_j];
            attrValue = attributes[attrName];
            if (attrValue === true) {
              att = document.createAttribute(attrName);
              el.setAttributeNode(att);
            } else {
              el.setAttribute(attrName, attrValue);
            }
          }
        }
        _attributesBindEventsToDOM(events, el);
      }
      if (options.html) {
        attr = (_ref5 = _attributesFromObject(attributes)) != null ? _ref5 : '';
        space = attr === '' ? '' : ' ';
        options.html.push("<" + tag + space + attr + ">");
      }
    }
    if (options.ignore[tag] !== 'deep') {
      for (_k = 0, _len2 = children.length; _k < _len2; _k++) {
        child = children[_k];
        if (!options.minify && children.length > 1) {
          if ((_ref6 = options.html) != null) {
            _ref6.push("\n\t" + options.indent);
          }
        }
        _compileDeeper(_compileAny, child, options);
      }
    }
    if ((!options.minify) && children.length > 1) {
      if ((_ref7 = options.html) != null) {
        _ref7.push("\n" + options.indent);
      }
    }
    if (!options.ignore[tag]) {
      if (options.html && (children.length > 0 || oj.tag.isClosed(tag))) {
        if ((_ref8 = options.html) != null) {
          _ref8.push("</" + tag + ">");
        }
      }
      if (options.dom) {
        options.dom = options.dom.parentNode;
      }
    }
  };

  _attributeStyleAllowsObject = function(attr) {
    if (oj.isObject(attr != null ? attr.style : void 0)) {
      attr.style = _styleFromObject(attr.style, {
        inline: true
      });
    }
  };

  _attributeCMeansClassAndAllowsArrays = function(attr) {
    if (oj.isArray(attr != null ? attr.c : void 0)) {
      attr.c = attr.c.join(' ');
    }
    if (oj.isArray(attr != null ? attr["class"] : void 0)) {
      attr["class"] = attr["class"].join(' ');
    }
    if ((attr != null ? attr.c : void 0) != null) {
      if ((attr != null ? attr["class"] : void 0) != null) {
        attr["class"] += ' ' + attr.c;
      } else {
        attr["class"] = attr.c;
      }
      delete attr.c;
    }
  };

  _attributeOmitFalsyValues = function(attr) {
    var k, v, _results;

    if (oj.isObject(attr)) {
      _results = [];
      for (k in attr) {
        v = attr[k];
        if (v === null || v === void 0 || v === false) {
          _results.push(delete attr[k]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  jqueryEvents = {
    bind: 1,
    on: 1,
    off: 1,
    live: 1,
    blur: 1,
    change: 1,
    click: 1,
    dblclick: 1,
    focus: 1,
    focusin: 1,
    focusout: 1,
    hover: 1,
    keydown: 1,
    keypress: 1,
    keyup: 1,
    mousedown: 1,
    mouseenter: 1,
    mouseleave: 1,
    mousemove: 1,
    mouseout: 1,
    mouseup: 1,
    ready: 1,
    resize: 1,
    scroll: 1,
    select: 1
  };

  _attributesFilterOutEvents = function(attr) {
    var k, out, v;

    out = {};
    if (oj.isObject(attr)) {
      for (k in attr) {
        v = attr[k];
        if (jqueryEvents[k] != null) {
          out[k] = v;
          delete attr[k];
        }
      }
    }
    return out;
  };

  _attributesProcessedForOJ = function(attr) {
    var events;

    _attributeCMeansClassAndAllowsArrays(attr);
    _attributeStyleAllowsObject(attr);
    _attributeOmitFalsyValues(attr);
    events = _attributesFilterOutEvents(attr);
    return events;
  };

  _attributesBindEventsToDOM = function(events, el) {
    var ek, ev, _results;

    _results = [];
    for (ek in events) {
      ev = events[ek];
      if (oj.$ != null) {
        if (oj.isArray(ev)) {
          _results.push(oj.$(el)[ek].apply(this, ev));
        } else {
          _results.push(oj.$(el)[ek](ev));
        }
      } else {
        _results.push(console.error("oj: jquery is missing when binding a '" + ek + "' event"));
      }
    }
    return _results;
  };

  oj.toHTML = function(options, ojml) {
    if (!oj.isObject(options)) {
      ojml = options;
      options = {};
    }
    _extend(options, {
      dom: 0,
      js: 0,
      html: 1,
      css: 0
    });
    return (oj.compile(options, ojml)).html;
  };

  oj.toCSS = function(options, ojml) {
    if (!oj.isObject(options)) {
      ojml = options;
      options = {};
    }
    _extend(options, {
      dom: 0,
      js: 0,
      html: 0,
      css: 1
    });
    return (oj.compile(options, ojml)).css;
  };

  _inherit = function(child, parent) {
    var ctor, key;

    for (key in parent) {
      oj.copyProperty(child, parent, key);
    }
    ctor = function() {};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.base = parent.prototype;
  };

  oj._construct = _construct = function(Type) {
    return new (FuncP.bind.apply(Type, arguments));
  };

  oj.argumentShift = function(args, key) {
    var value;

    if ((oj.isObject(args)) && (key != null) && (args[key] != null)) {
      value = args[key];
      delete args[key];
    }
    return value;
  };

  oj.createType = function(name, args) {
    var Out, delay, methodKeys, methods, propKeys, properties, typeProps, _ref2, _ref3;

    if (args == null) {
      args = {};
    }
    if (!oj.isString(name)) {
      throw 'oj.createType: string expected for first argument';
    }
    if (!oj.isObject(args)) {
      throw 'oj.createType: object expected for second argument';
    }
    if ((_ref2 = args.methods) == null) {
      args.methods = {};
    }
    if ((_ref3 = args.properties) == null) {
      args.properties = {};
    }
    delay = '__DELAYED__';
    Out = new Function("return function " + name + "(){\n  var _this = this;\n  if ( !(this instanceof " + name + ") ) {\n    _this = new " + name + "('" + delay + "');\n    _this.__autonew__ = true;\n  }\n\n  if (arguments && arguments[0] != '" + delay + "')\n    " + name + ".prototype.constructor.apply(_this, arguments);\n\n  return _this;\n}")();
    if ((args.base != null) && ((args.constructor == null) || (!args.hasOwnProperty('constructor')))) {
      args.constructor = function() {
        var _ref4;

        return (_ref4 = Out.base) != null ? _ref4.constructor.apply(this, arguments) : void 0;
      };
    }
    if (args.base != null) {
      _inherit(Out, args.base);
    }
    oj.addMethod(Out.prototype, 'constructor', args.constructor);
    typeProps = {
      type: {
        value: Out,
        writable: false,
        enumerable: false
      },
      typeName: {
        value: name,
        writable: false,
        enumerable: false
      },
      isOJ: {
        value: true,
        writable: false,
        enumerable: false
      }
    };
    oj.addProperties(Out, typeProps);
    oj.addProperties(Out.prototype, typeProps);
    propKeys = (_keys(args.properties)).sort();
    if (Out.prototype.properties != null) {
      propKeys = _uniqueSortedUnion(Out.prototype.properties, propKeys);
    }
    properties = {
      value: propKeys,
      writable: false,
      enumerable: false
    };
    oj.addProperty(Out.prototype, 'properties', properties);
    methodKeys = (_keys(args.methods)).sort();
    if (Out.prototype.methods != null) {
      methodKeys = _uniqueSortedUnion(Out.prototype.methods, methodKeys);
    }
    methods = {
      value: methodKeys,
      writable: false,
      enumerable: false
    };
    oj.addProperty(Out.prototype, 'methods', methods);
    _extend(args.methods, {
      get: function(k) {
        var out, p, _j, _len1, _ref4;

        if (oj.isString(k)) {
          if (this.has(k)) {
            return this[k];
          } else {
            return void 0;
          }
        } else {
          out = {};
          _ref4 = this.properties;
          for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
            p = _ref4[_j];
            out[p] = this[p];
          }
          return out;
        }
      },
      set: function(k, v) {
        var key, obj, value;

        obj = k;
        if (!oj.isObject(k)) {
          obj = {};
          obj[k] = v;
        }
        for (key in obj) {
          value = obj[key];
          if (this.has(key)) {
            this[key] = value;
          }
        }
      },
      has: function(k) {
        return _some(this.properties, function(v) {
          return v === k;
        });
      },
      can: function(k) {
        return _some(this.methods, function(v) {
          return v === k;
        });
      },
      toJSON: function() {
        var json, prop, _j, _len1, _ref4;

        json = {};
        _ref4 = this.properties;
        for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
          prop = _ref4[_j];
          json[prop] = this[prop];
        }
        return json;
      }
    });
    oj.addMethods(Out.prototype, args.methods);
    oj.addProperties(Out.prototype, args.properties);
    return Out;
  };

  oj.unionArguments = function(argList) {
    var args, options, v, _j, _len1;

    options = {};
    args = [];
    for (_j = 0, _len1 = argList.length; _j < _len1; _j++) {
      v = argList[_j];
      if (oj.isObject(v)) {
        options = _extend(options, v);
      } else {
        args.push(v);
      }
    }
    return {
      options: options,
      args: args
    };
  };

  _createQuietType = function(typeName) {
    var qt;

    qt = _getQuietTagName(typeName);
    return oj[qt] = function() {
      return _construct.apply(null, [oj[typeName]].concat(__slice.call(arguments), [{
        __quiet__: 1
      }]));
    };
  };

  oj["enum"] = function(name, args) {
    throw new Error('oj.enum: NYI');
  };

  oj.View = oj.createType('View', {
    constructor: function() {
      var args, options, _ref2, _ref3;

      if (!oj.isDOM(this.el)) {
        throw new Error("oj." + this.typeName + ": constructor failed to set this.el");
      }
      _setInstanceOnElement(this.el, this);
      _ref2 = oj.unionArguments(arguments), options = _ref2.options, args = _ref2.args;
      if (this.__autonew__ && !options.__quiet__) {
        this.emit();
      }
      if (options.__quiet__ != null) {
        delete options.__quiet__;
      }
      if ((_ref3 = options.id) == null) {
        options.id = oj.id();
      }
      this.$el.addClass("oj-" + this.typeName);
      this.set(options);
      options = _omit.apply(null, [options].concat(__slice.call(this.properties)));
      this.addAttributes(options);
      return this._isConstructed = true;
    },
    properties: {
      el: {
        get: function() {
          return this._el;
        },
        set: function(v) {
          if (oj.isDOMElement(v)) {
            this._el = v;
            this._$el = null;
          } else {
            this._el = oj.compile({
              css: 0,
              cssMap: 0,
              dom: 1,
              html: 0
            }, v).dom;
          }
        }
      },
      $el: {
        get: function() {
          var _ref2;

          return (_ref2 = this._$el) != null ? _ref2 : (this._$el = oj.$(this.el));
        }
      },
      id: {
        get: function() {
          return this.$el.attr('id');
        },
        set: function(v) {
          return this.$el.attr('id', v);
        }
      },
      attributes: {
        get: function() {
          var out;

          out = {};
          oj.$.each(this.el.attributes, function(index, attr) {
            return out[attr.name] = attr.value;
          });
          return out;
        }
      },
      classes: {
        get: function() {
          return this.$el.attr('class').split(/\s+/);
        },
        set: function(v) {
          this.$el.attr('class', v.join(' '));
        }
      },
      themes: {
        get: function() {
          var cls, prefix, thms, _j, _len1, _ref2;

          thms = [];
          prefix = 'theme-';
          _ref2 = this.classes;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            cls = _ref2[_j];
            if (cls.indexOf(prefix) === 0) {
              thms.push(cls.slice(prefix.length));
            }
          }
          return thms;
        },
        set: function(v) {
          var theme, _j, _len1;

          if (!oj.isArray(v)) {
            v = [v];
          }
          this.clearThemes();
          for (_j = 0, _len1 = v.length; _j < _len1; _j++) {
            theme = v[_j];
            this.addTheme(theme);
          }
        }
      },
      theme: {
        get: function() {
          return this.themes;
        },
        set: function(v) {
          this.themes = v;
        }
      },
      isConstructed: {
        get: function() {
          var _ref2;

          return (_ref2 = this._isConstructed) != null ? _ref2 : false;
        }
      },
      isInserted: {
        get: function() {
          var _ref2;

          return (_ref2 = this._isInserted) != null ? _ref2 : false;
        }
      }
    },
    methods: {
      $: function() {
        var _ref2;

        return (_ref2 = this.$el).find.apply(_ref2, arguments);
      },
      addAttribute: function(name, value) {
        var attr;

        attr = {};
        attr[name] = value;
        this.addAttributes(attr);
      },
      addAttributes: function(attributes) {
        var att, attr, events, k, v;

        attr = _clone(attributes);
        events = _attributesProcessedForOJ(attr);
        if (oj.isObject(attr)) {
          for (k in attr) {
            v = attr[k];
            if (k === 'class') {
              this.addClass(v);
            } else if (v === true) {
              att = document.createAttribute(k);
              this.el.setAttributeNode(att);
            } else {
              this.$el.attr(k, v);
            }
          }
        }
        if (events != null) {
          _attributesBindEventsToDOM(events, this.el);
        }
      },
      removeAttribute: function(name) {
        this.$el.removeAttr(name);
      },
      removeAttributes: function(list) {
        var k, _j, _len1;

        for (_j = 0, _len1 = list.length; _j < _len1; _j++) {
          k = list[_j];
          this.removeAttribute(k);
        }
      },
      addClass: function(name) {
        this.$el.addClass(name);
      },
      removeClass: function(name) {
        this.$el.removeClass(name);
      },
      hasClass: function(name) {
        return this.$el.hasClass(name);
      },
      addTheme: function(name) {
        this.addClass("theme-" + name);
      },
      removeTheme: function(name) {
        this.removeClass("theme-" + name);
      },
      hasTheme: function(name) {
        return this.hasClass("theme-" + name);
      },
      clearThemes: function() {
        var theme, _j, _len1, _ref2;

        _ref2 = this.themes;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          theme = _ref2[_j];
          this.removeTheme(theme);
        }
      },
      emit: function() {
        oj._argsAppend(this);
      },
      toHTML: function(options) {
        return this.el.outerHTML + ((options != null ? options.minify : void 0) ? '' : '\n');
      },
      toDOM: function() {
        return this.el;
      },
      toCSS: function(options) {
        return _cssFromPluginObject(_flattenCSSMap(this.cssMap), _extend({}, {
          minify: options.minify,
          tags: 0
        }));
      },
      toCSSMap: function() {
        return this.type.cssMap;
      },
      toString: function() {
        return this.toHTML();
      },
      inserted: function() {
        return this._isInserted = true;
      }
    }
  });

  oj.View.css = function(css) {
    var cssMap, _base, _base1, _name, _name1, _ref2, _ref3;

    if (!(oj.isString(css) || oj.isObject(css))) {
      throw new Error("oj." + this.typeName + ".css: object or string expected for first argument");
    }
    if (oj.isString(css)) {
      if ((_ref2 = (_base = this.cssMap)[_name = "oj-" + this.typeName]) == null) {
        _base[_name] = "";
      }
      this.cssMap["oj-" + this.typeName] += css;
    } else {
      if ((_ref3 = (_base1 = this.cssMap)[_name1 = "oj-" + this.typeName]) == null) {
        _base1[_name1] = {};
      }
      cssMap = _setObject({}, ".oj-" + this.typeName, css);
      _extend(this.cssMap["oj-" + this.typeName], cssMap);
    }
  };

  oj.View.theme = function(name, css) {
    var cssMap, dashName, _base, _name, _ref2;

    if (!oj.isString(name)) {
      throw new Error("oj." + this.typeName + ".theme: string expected for first argument (theme name)");
    }
    if (!oj.isObject(css)) {
      throw new Error("oj." + this.typeName + ".css: object expected for second argument");
    }
    if ((_ref2 = (_base = this.cssMap)[_name = "oj-" + this.typeName]) == null) {
      _base[_name] = {};
    }
    dashName = _dasherize(name);
    cssMap = _setObject({}, ".oj-" + this.typeName + ".theme-" + dashName, css);
    _extend(this.cssMap["oj-" + this.typeName], cssMap);
    this.themes.push(dashName);
    this.themes = _uniqueSort(this.themes);
  };

  oj.View.cssMap = {};

  oj.View.themes = [];

  oj.CollectionView = oj.createType('CollectionView', {
    base: oj.View,
    constructor: function(options) {
      if ((options != null ? options.each : void 0) != null) {
        this.each = oj.argumentShift(options, 'each');
      }
      if ((options != null ? options.models : void 0) != null) {
        this.models = oj.argumentShift(options, 'models');
      }
      oj.CollectionView.base.constructor.apply(this, arguments);
      return this.make();
    },
    properties: {
      each: {
        get: function() {
          return this._each;
        },
        set: function(v) {
          this._each = v;
          if (this.isConstructed) {
            this.make();
          }
        }
      },
      collection: {
        get: function() {
          return this.models;
        },
        set: function(v) {
          return this.models = v;
        }
      },
      models: {
        get: function() {
          return this._models;
        },
        set: function(v) {
          var _ref2, _ref3;

          if (oj.isFunction((_ref2 = this._models) != null ? _ref2.off : void 0)) {
            this._models.off('add remove change reset destroy', null, this);
          }
          this._models = v;
          if (oj.isFunction((_ref3 = this._models) != null ? _ref3.on : void 0)) {
            this._models.on('add', this.collectionModelAdded, this);
            this._models.on('remove', this.collectionModelRemoved, this);
            this._models.on('change', this.collectionModelChanged, this);
            this._models.on('destroy', this.collectionModelDestroyed, this);
            this._models.on('reset', this.collectionReset, this);
          }
          if (this.isConstructed) {
            this.make();
          }
        }
      }
    },
    methods: {
      make: function() {
        throw new Error("oj." + this.typeName + ": `make` method not implemented by custom view");
      },
      collectionModelAdded: function(model, collection) {
        return this.make();
      },
      collectionModelRemoved: function(model, collection, options) {
        return this.make();
      },
      collectionModelChanged: function(model, collection, options) {},
      collectionModelDestroyed: function(collection, options) {
        return this.make();
      },
      collectionReset: function(collection, options) {
        return this.make();
      }
    }
  });

  oj.ModelView = oj.createType('ModelView', {
    base: oj.View,
    constructor: function(options) {
      if ((options != null ? options.value : void 0) != null) {
        this.value = oj.argumentShift(options, 'value');
      }
      if ((options != null ? options.model : void 0) != null) {
        this.model = oj.argumentShift(options, 'model');
      }
      return oj.ModelView.base.constructor.apply(this, arguments);
    },
    properties: {
      model: {
        get: function() {
          return this._model;
        },
        set: function(v) {
          if (oj.isEvent(this._model)) {
            this._model.off('change', null, this);
          }
          this._model = v;
          if (oj.isEvent(this._model)) {
            this._model.on('change', this.modelChanged, this);
          }
          this.modelChanged();
        }
      }
    },
    methods: {
      modelChanged: function() {
        var _this = this;

        return this.$el.oj(function() {
          return _this.make(_this.mode);
        });
      },
      make: function(model) {
        throw "oj." + this.typeName + ": `make` method not implemented on custom view";
      }
    }
  });

  oj.ModelKeyView = oj.createType('ModelKeyView', {
    base: oj.ModelView,
    constructor: function(options) {
      if ((options != null ? options.key : void 0) != null) {
        this.key = oj.argumentShift(options, 'key');
      }
      return oj.ModelKeyView.base.constructor.apply(this, arguments);
    },
    properties: {
      key: null,
      value: {
        get: function() {
          throw "" + this.typeName + " value getter not implemented";
        },
        set: function(v) {
          throw "" + this.typeName + " value setter not implemented";
        }
      }
    },
    methods: {
      modelChanged: function() {
        if ((this.model != null) && (this.key != null)) {
          if (!this._viewUpdatedModel) {
            this.value = this.model.get(this.key);
          }
        }
      },
      viewChanged: function() {
        var _this = this;

        setTimeout((function() {
          if ((_this.model != null) && (_this.key != null)) {
            _this._viewUpdatedModel = true;
            _this.model.set(_this.key, _this.value);
            _this._viewUpdatedModel = false;
          }
        }), 10);
      }
    }
  });

  oj.TextBox = oj.createType('TextBox', {
    base: oj.ModelKeyView,
    constructor: function() {
      var args, options, _ref2,
        _this = this;

      _ref2 = oj.unionArguments(arguments), options = _ref2.options, args = _ref2.args;
      this.el = oj(function() {
        return oj.input({
          type: 'text'
        }, {
          keydown: function() {
            if (_this.live) {
              setTimeout((function() {
                return _this.$el.change();
              }), 10);
            }
          },
          keyup: function() {
            if (_this.live) {
              setTimeout((function() {
                return _this.$el.change();
              }), 10);
            }
          },
          change: function() {
            _this.viewChanged();
          }
        });
      });
      if (args.length > 0) {
        this.value = args[0];
      }
      if ((options != null ? options.live : void 0) != null) {
        this.live = oj.argumentShift(options, 'live');
      }
      return oj.TextBox.base.constructor.apply(this, [options]);
    },
    properties: {
      value: {
        get: function() {
          var v;

          v = this.el.value;
          if ((v == null) || v === 'undefined') {
            v = '';
          }
          return v;
        },
        set: function(v) {
          this.el.value = v;
        }
      },
      live: true
    }
  });

  oj.CheckBox = oj.createType('CheckBox', {
    base: oj.ModelKeyView,
    constructor: function() {
      var args, options, _ref2,
        _this = this;

      _ref2 = oj.unionArguments(arguments), options = _ref2.options, args = _ref2.args;
      this.el = oj(function() {
        return oj.input({
          type: 'checkbox'
        }, {
          change: function() {
            _this.viewChanged();
          }
        });
      });
      if (args.length > 0) {
        this.value = args[0];
      }
      return oj.CheckBox.base.constructor.call(this, options);
    },
    properties: {
      value: {
        get: function() {
          return this.el.checked;
        },
        set: function(v) {
          v = !!v;
          this.el.checked = v;
          if (v) {
            this.$el.attr('checked', 'checked');
          } else {
            this.$el.removeAttr('checked');
          }
        }
      }
    }
  });

  oj.Text = oj.createType('Text', {
    base: oj.ModelKeyView,
    constructor: function() {
      var args, options, _ref2,
        _this = this;

      _ref2 = oj.unionArguments(arguments), options = _ref2.options, args = _ref2.args;
      this._tagName = oj.argumentShift(options, 'tagName');
      this.el = oj(function() {
        return oj[_this.tagName]();
      });
      if (args.length > 0) {
        this.value = args[0];
      }
      return oj.Text.base.constructor.call(this, options);
    },
    properties: {
      value: {
        get: function() {
          return this.$el.ojValue();
        },
        set: function(v) {
          this.$el.oj(v);
        }
      },
      tagName: {
        get: function() {
          var _ref2;

          return (_ref2 = this._tagName) != null ? _ref2 : 'div';
        }
      }
    }
  });

  oj.TextArea = oj.createType('TextArea', {
    base: oj.ModelKeyView,
    constructor: function() {
      var args, options, _ref2,
        _this = this;

      _ref2 = oj.unionArguments(arguments), options = _ref2.options, args = _ref2.args;
      this.el = oj(function() {
        return oj.textarea({
          keydown: function() {
            if (_this.live) {
              setTimeout((function() {
                return _this.$el.change();
              }), 10);
            }
          },
          keyup: function() {
            if (_this.live) {
              setTimeout((function() {
                return _this.$el.change();
              }), 10);
            }
          },
          change: function() {
            _this.viewChanged();
          }
        });
      });
      this.value = oj.argumentShift(options, 'value') || args.join('\n');
      return oj.TextArea.base.constructor.call(this, options);
    },
    properties: {
      value: {
        get: function() {
          return this.el.value;
        },
        set: function(v) {
          this.el.value = v;
        }
      },
      live: true
    }
  });

  oj.ListBox = oj.createType('ListBox', {
    base: oj.ModelKeyView,
    constructor: function() {
      var args, options, _ref2,
        _this = this;

      _ref2 = oj.unionArguments(arguments), options = _ref2.options, args = _ref2.args;
      this.el = oj(function() {
        return oj.select({
          change: function() {
            _this.viewChanged();
          }
        });
      });
      this.options = oj.argumentShift(options, 'options');
      if (args.length > 0) {
        this.value = args[0];
      }
      return oj.ListBox.base.constructor.apply(this, [options]);
    },
    properties: {
      value: {
        get: function() {
          return this.$el.val();
        },
        set: function(v) {
          this.$el.val(v);
        }
      },
      options: {
        get: function() {
          return this._options;
        },
        set: function(v) {
          if (!oj.isArray(v)) {
            throw new Error("oj." + this.typeName + ".options array is missing");
          }
          this._options = v;
          this.$el.oj(function() {
            var op, _j, _len1;

            for (_j = 0, _len1 = v.length; _j < _len1; _j++) {
              op = v[_j];
              oj.option(op);
            }
          });
        }
      }
    }
  });

  oj.Button = oj.createType('Button', {
    base: oj.View,
    constructor: function() {
      var args, options, title, _ref2,
        _this = this;

      _ref2 = oj.unionArguments(arguments), options = _ref2.options, args = _ref2.args;
      title = '';
      if (args.length > 0) {
        title = args[0];
      }
      if (options.title != null) {
        title = oj.argumentShift(options, 'title');
      }
      this.el = oj(function() {
        return oj.button(title);
      });
      oj.Button.base.constructor.apply(this, [options]);
      return this.title = title;
    },
    properties: {
      title: {
        get: function() {
          var _ref2;

          return (_ref2 = this._title) != null ? _ref2 : '';
        },
        set: function(v) {
          this.$el.oj((this._title = v));
        }
      }
    },
    methods: {
      click: function() {
        var _ref2;

        if (arguments.length > 0) {
          return (_ref2 = this.$el).click.apply(_ref2, arguments);
        } else {
          return this.$el.click();
        }
      }
    }
  });

  oj.List = oj.createType('List', {
    base: oj.CollectionView,
    constructor: function() {
      var args, items, options, _ref2, _ref3,
        _this = this;

      _ref2 = oj.unionArguments(arguments), options = _ref2.options, args = _ref2.args;
      this._tagName = oj.argumentShift(options, 'tagName');
      this.itemTagName = oj.argumentShift(options, 'itemTagName');
      this.el = oj(function() {
        return oj[_this.tagName]();
      });
      if (options.el != null) {
        this.el = oj.argumentShift(options, 'el');
      }
      if ((_ref3 = options.each) == null) {
        options.each = function(model) {
          if ((oj.isString(model)) || (oj.isNumber(model)) || (oj.isBoolean(model))) {
            return model;
          } else {
            return JSON.stringify(model);
          }
        };
      }
      oj.List.base.constructor.apply(this, [options]);
      items = args.length > 0 ? args : null;
      return this.items = options.items != null ? oj.argumentShift(options, 'items') : items;
    },
    properties: {
      items: {
        get: function() {
          var v;

          if (this._items != null) {
            return this._items;
          }
          return v = this.$items.ojValues();
        },
        set: function(v) {
          this._items = v;
          this.make();
        }
      },
      count: {
        get: function() {
          return this.$items.length;
        }
      },
      tagName: {
        get: function() {
          var _ref2;

          return (_ref2 = this._tagName) != null ? _ref2 : 'div';
        }
      },
      itemTagName: {
        get: function() {
          var _ref2;

          return (_ref2 = this._itemTagName) != null ? _ref2 : 'div';
        },
        set: function(v) {
          this._itemTagName = v;
          this.make();
        }
      },
      $items: {
        get: function() {
          var _ref2;

          return (_ref2 = this._$items) != null ? _ref2 : (this._$items = this.$("> " + this.itemTagName));
        }
      }
    },
    methods: {
      item: function(ix, ojml) {
        ix = this._bound(ix, this.count, ".item: index");
        if (ojml != null) {
          this.$item(ix).oj(ojml);
        } else {
          return this.$item(ix).ojValue();
        }
      },
      $item: function(ix) {
        ix = this._bound(ix, this.count, ".$item: index");
        return this.$items.eq(ix);
      },
      make: function() {
        var model, models, views, _j, _len1,
          _this = this;

        if (!this.isConstructed) {
          return;
        }
        views = [];
        if ((this.models != null) && (this.each != null)) {
          models = oj.isEvent(this.models) ? this.models.models : this.models;
          for (_j = 0, _len1 = models.length; _j < _len1; _j++) {
            model = models[_j];
            views.push(this._itemFromModel(model));
          }
        } else if (this.items != null) {
          views = this.items;
        }
        this.$el.oj(function() {
          var view, _k, _len2, _results;

          _results = [];
          for (_k = 0, _len2 = views.length; _k < _len2; _k++) {
            view = views[_k];
            _results.push(_this._itemElFromItem(view));
          }
          return _results;
        });
        this.itemsChanged();
      },
      collectionModelAdded: function(m, c) {
        var item, ix;

        ix = c.indexOf(m);
        item = this._itemFromModel(m);
        this.add(ix, item);
      },
      collectionModelRemoved: function(m, c, o) {
        this.remove(o.index);
      },
      collectionReset: function() {
        this.make();
      },
      _itemFromModel: function(model) {
        var _this = this;

        return oj(function() {
          return _this.each(model);
        });
      },
      _itemElFromItem: function(item) {
        return oj[this.itemTagName](item);
      },
      _bound: function(ix, count, message) {
        return _boundOrThrow(ix, count, message, this.typeName);
      },
      itemsChanged: function() {
        this._items = null;
        this._$items = null;
      },
      add: function(ix, ojml) {
        var tag;

        if (ojml == null) {
          ojml = ix;
          ix = -1;
        }
        ix = this._bound(ix, this.count + 1, ".add: index");
        tag = this.itemTagName;
        if (this.count === 0) {
          this.$el.oj(function() {
            return oj[tag](ojml);
          });
        } else if (ix === this.count) {
          this.$item(ix - 1).ojAfter(function() {
            return oj[tag](ojml);
          });
        } else {
          this.$item(ix).ojBefore(function() {
            return oj[tag](ojml);
          });
        }
        this.itemsChanged();
      },
      remove: function(ix) {
        var out;

        if (ix == null) {
          ix = -1;
        }
        ix = this._bound(ix, this.count, ".remove: index");
        out = this.item(ix);
        this.$item(ix).remove();
        this.itemsChanged();
        return out;
      },
      move: function(ixFrom, ixTo) {
        if (ixTo == null) {
          ixTo = -1;
        }
        if (ixFrom === ixTo) {
          return;
        }
        ixFrom = this._bound(ixFrom, this.count, ".move: fromIndex");
        ixTo = this._bound(ixTo, this.count, ".move: toIndex");
        if (ixTo > ixFrom) {
          this.$item(ixFrom).insertAfter(this.$item(ixTo));
        } else {
          this.$item(ixFrom).insertBefore(this.$item(ixTo));
        }
        this.itemsChanged();
      },
      swap: function(ix1, ix2) {
        var ixMax, ixMin;

        if (ix1 === ix2) {
          return;
        }
        ix1 = this._bound(ix1, this.count, ".swap: firstIndex");
        ix2 = this._bound(ix2, this.count, ".swap: secondIndex");
        if (Math.abs(ix1 - ix2) === 1) {
          this.move(ix1, ix2);
        } else {
          ixMin = Math.min(ix1, ix2);
          ixMax = Math.max(ix1, ix2);
          this.move(ixMax, ixMin);
          this.move(ixMin + 1, ixMax);
        }
        this.itemsChanged();
      },
      unshift: function(v) {
        this.add(0, v);
      },
      shift: function() {
        return this.remove(0);
      },
      push: function(v) {
        this.add(this.count, v);
      },
      pop: function() {
        return this.remove(-1);
      },
      clear: function() {
        this.$items.remove();
        this.itemsChanged();
      }
    }
  });

  oj.NumberList = oj.createType('NumberList', {
    base: oj.List,
    constructor: function() {
      var args;

      args = [{
          tagName: 'ol',
          itemTagName: 'li'
        }].concat(__slice.call(arguments));
      return oj.NumberList.base.constructor.apply(this, args);
    }
  });

  oj.BulletList = oj.createType('BulletList', {
    base: oj.List,
    constructor: function() {
      var args;

      args = [{
          tagName: 'ul',
          itemTagName: 'li'
        }].concat(__slice.call(arguments));
      return oj.BulletList.base.constructor.apply(this, args);
    }
  });

  oj.Table = oj.createType('Table', {
    base: oj.CollectionView,
    constructor: function() {
      var arg, args, options, rows, _j, _len1, _ref2, _ref3, _ref4,
        _this = this;

      _ref2 = oj.unionArguments(arguments), options = _ref2.options, args = _ref2.args;
      this.el = oj(function() {
        return oj.table();
      });
      if (options.el != null) {
        this.el = oj.argumentShift(options, 'el');
      }
      if ((_ref3 = options.each) == null) {
        options.each = function(model, cell) {
          var v, values, _j, _len1, _results;

          values = (oj.isString(model)) || (oj.isNumber(model)) || (oj.isBoolean(model)) ? [model] : (oj.isEvent(model)) && typeof model.attributes === 'object' ? _values(model.attributes) : _values(model);
          _results = [];
          for (_j = 0, _len1 = values.length; _j < _len1; _j++) {
            v = values[_j];
            _results.push(cell(v));
          }
          return _results;
        };
      }
      oj.Table.base.constructor.apply(this, [options]);
      for (_j = 0, _len1 = args.length; _j < _len1; _j++) {
        arg = args[_j];
        if (!oj.isArray(arg)) {
          throw new Error('oj.Table: array expected for row arguments');
        }
      }
      rows = (_ref4 = oj.argumentShift(options, 'rows')) != null ? _ref4 : args;
      if (rows.length > 0) {
        return this.rows = rows;
      }
    },
    properties: {
      rowCount: {
        get: function() {
          return this.$trs.length;
        }
      },
      columnCount: {
        get: function() {
          var tflen, thlen, trlen;

          if ((trlen = this.$tr(0).find('> td').length) > 0) {
            return trlen;
          } else if ((thlen = this.$theadTR.find('> th').length) > 0) {
            return thlen;
          } else if ((tflen = this.$tfootTR.find('> td').length) > 0) {
            return tflen;
          } else {
            return 0;
          }
        }
      },
      rows: {
        get: function() {
          var r, rx, _j, _ref2;

          if (this._rows != null) {
            return this._rows;
          }
          this._rows = [];
          for (rx = _j = 0, _ref2 = this.rowCount; _j < _ref2; rx = _j += 1) {
            r = _map(this.$tdsRow(rx), function($td) {
              return $td.ojValues();
            });
            this._rows.push(r);
          }
          return this._rows;
        },
        set: function(list) {
          if (!((list != null) && list.length > 0)) {
            return this.clearBody();
          }
          this._rows = list;
          this.make();
        }
      },
      header: {
        get: function() {
          return this.$theadTR.find('> th').ojValues();
        },
        set: function(list) {
          var _this = this;

          if (!oj.isArray(list)) {
            throw new Error('oj.Table.header: array expected for first argument');
          }
          if (!((list != null) && list.length > 0)) {
            return this.clearHeader();
          }
          return this.$theadTRMake.oj(function() {
            var ojml, _j, _len1, _results;

            _results = [];
            for (_j = 0, _len1 = list.length; _j < _len1; _j++) {
              ojml = list[_j];
              _results.push(oj.th(ojml));
            }
            return _results;
          });
        }
      },
      footer: {
        get: function() {
          return this.$tfootTR.find('> td').ojValues();
        },
        set: function(list) {
          var _this = this;

          if (!oj.isArray(list)) {
            throw new Error('oj.Table.footer: array expected for first argument');
          }
          if (!((list != null) && list.length > 0)) {
            return this.clearFooter();
          }
          return this.$tfootTRMake.oj(function() {
            var ojml, _j, _len1, _results;

            _results = [];
            for (_j = 0, _len1 = list.length; _j < _len1; _j++) {
              ojml = list[_j];
              _results.push(oj.td(ojml));
            }
            return _results;
          });
        }
      },
      caption: {
        get: function() {
          return this.$caption.ojValue();
        },
        set: function(v) {
          this.$captionMake.oj(v);
        }
      },
      $table: {
        get: function() {
          return this.$el;
        }
      },
      $caption: {
        get: function() {
          return this.$('> caption');
        }
      },
      $colgroup: {
        get: function() {
          return this.$('> colgroup');
        }
      },
      $thead: {
        get: function() {
          return this.$('> thead');
        }
      },
      $tfoot: {
        get: function() {
          return this.$('> tfoot');
        }
      },
      $tbody: {
        get: function() {
          return this.$('> tbody');
        }
      },
      $theadTR: {
        get: function() {
          return this.$thead.find('> tr');
        }
      },
      $tfootTR: {
        get: function() {
          return this.$tfoot.find('> tr');
        }
      },
      $ths: {
        get: function() {
          return this.$theadTR.find('> th');
        }
      },
      $trs: {
        get: function() {
          var _ref2;

          return (_ref2 = this._$trs) != null ? _ref2 : (this._$trs = this.$("> tbody > tr"));
        }
      },
      $colgroupMake: {
        get: function() {
          if (this.$colgroup.length > 0) {
            return this.$colgroup;
          }
          t = '<colgroup></colgroup>';
          if (this.$caption.length > 0) {
            this.$caption.insertAfter(t);
          } else {
            this.$table.append(t);
          }
          return this.$tbody;
        }
      },
      $captionMake: {
        get: function() {
          if (this.$caption.length > 0) {
            return this.$caption;
          }
          this.$table.prepend('<caption></caption>');
          return this.$caption;
        }
      },
      $tfootMake: {
        get: function() {
          if (this.$tfoot.length > 0) {
            return this.$tfoot;
          }
          t = '<tfoot></tfoot>';
          if (this.$tfoot.length > 0) {
            this.$tfoot.insertBefore(t);
          } else {
            this.$table.append(t);
          }
          return this.$tfoot;
        }
      },
      $theadMake: {
        get: function() {
          if (this.$thead.length > 0) {
            return this.$thead;
          }
          t = '<thead></thead>';
          if (this.$colgroup.length > 0) {
            this.$colgroup.insertAfter(t);
          } else if (this.$caption.length > 0) {
            this.$caption.insertAfter(t);
          } else {
            this.$table.prepend(t);
          }
          return this.$thead;
        }
      },
      $tbodyMake: {
        get: function() {
          if (this.$tbody.length > 0) {
            return this.$tbody;
          }
          this.$table.append('<tbody></tbody>');
          return this.$tbody;
        }
      },
      $theadTRMake: {
        get: function() {
          if (this.$theadTR.length > 0) {
            return this.$theadTR;
          }
          this.$theadMake.html('<tr></tr>');
          return this.$theadTR;
        }
      },
      $tfootTRMake: {
        get: function() {
          if (this.$tfootTR.length > 0) {
            return this.$tfootTR;
          }
          this.$tfootMake.html('<tr></tr>');
          return this.$tfootTR;
        }
      }
    },
    methods: {
      make: function() {
        var model, models, row, rowViews, _j, _k, _len1, _len2, _ref2,
          _this = this;

        if (!this.isConstructed) {
          return;
        }
        rowViews = [];
        if ((this.models != null) && (this.each != null)) {
          models = oj.isEvent(this.models) ? this.models.models : this._models;
          for (_j = 0, _len1 = models.length; _j < _len1; _j++) {
            model = models[_j];
            rowViews.push(this._rowFromModel(model));
          }
        } else if (this.rows != null) {
          _ref2 = this.rows;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            row = _ref2[_k];
            rowViews.push(oj(function() {
              var c, _l, _len3, _results;

              _results = [];
              for (_l = 0, _len3 = row.length; _l < _len3; _l++) {
                c = row[_l];
                _results.push(oj.td(c));
              }
              return _results;
            }));
          }
        }
        if (rowViews.length > 0) {
          this.$tbodyMake.oj(function() {
            var r, _l, _len3, _results;

            _results = [];
            for (_l = 0, _len3 = rowViews.length; _l < _len3; _l++) {
              r = rowViews[_l];
              _results.push(oj.tr(r));
            }
            return _results;
          });
        }
        this.bodyChanged();
      },
      collectionModelAdded: function(m, c) {
        var row, rx;

        rx = c.indexOf(m);
        row = this._rowFromModel(m);
        this._addRowTR(rx, oj(function() {
          return oj.tr(row);
        }));
      },
      collectionModelRemoved: function(m, c, o) {
        this.removeRow(o.index);
      },
      collectionReset: function() {
        this.make();
      },
      $tr: function(rx) {
        rx = rx < 0 ? rx + count : rx;
        return this.$trs.eq(rx);
      },
      $tdsRow: function(rx) {
        rx = rx < 0 ? rx + count : rx;
        return this.$tr(rx).find('> td');
      },
      $td: function(rx, cx) {
        rx = rx < 0 ? rx + this.rowCount : rx;
        cx = cx < 0 ? cx + this.columnCount : cx;
        return this.$tdsRow(rx).eq(cx);
      },
      row: function(rx, listOJML) {
        var cx, ojml, _j, _len1;

        rx = this._bound(rx, this.rowCount, ".row: rx");
        if (listOJML != null) {
          if (listOJML.length !== cellCount(rx)) {
            throw new Error("oj." + this.typeName + ": array expected for second argument with length length cellCount(" + rx + ")");
          }
          for (cx = _j = 0, _len1 = listOJML.length; _j < _len1; cx = ++_j) {
            ojml = listOJML[cx];
            this.$td(rx, cx).oj(ojml);
          }
        } else {
          return this.$tdsRow(rx).ojValues();
        }
      },
      cell: function(rx, cx, ojml) {
        if (ojml != null) {
          return this.$td(rx, cx).oj(ojml);
        } else {
          return this.$td(rx, cx).ojValue();
        }
      },
      addRow: function(rx, listOJML) {
        var tr;

        if (listOJML == null) {
          listOJML = rx;
          rx = -1;
        }
        rx = this._bound(rx, this.rowCount + 1, ".addRow: rx");
        if (!oj.isArray(listOJML)) {
          throw new Error('oj.addRow: expected array for row content');
        }
        tr = function() {
          return oj.tr(function() {
            var o, _j, _len1, _results;

            _results = [];
            for (_j = 0, _len1 = listOJML.length; _j < _len1; _j++) {
              o = listOJML[_j];
              _results.push(oj.td(o));
            }
            return _results;
          });
        };
        this._addRowTR(rx, tr);
      },
      _addRowTR: function(rx, tr) {
        if (this.rowCount === 0) {
          this.$el.oj(tr);
        } else if (rx === this.rowCount) {
          this.$tr(rx - 1).ojAfter(tr);
        } else {
          this.$tr(rx).ojBefore(tr);
        }
        this.bodyChanged();
      },
      removeRow: function(rx) {
        var out;

        if (rx == null) {
          rx = -1;
        }
        rx = this._bound(rx, this.rowCount, ".removeRow: index");
        out = this.row(rx);
        this.$tr(rx).remove();
        this.bodyChanged();
        return out;
      },
      moveRow: function(rxFrom, rxTo) {
        var insert;

        if (rxFrom === rxTo) {
          return;
        }
        rxFrom = this._bound(rxFrom, this.rowCount, ".moveRow: fromIndex");
        rxTo = this._bound(rxTo, this.rowCount, ".moveRow: toIndex");
        insert = rxTo > rxFrom ? 'insertAfter' : 'insertBefore';
        this.$tr(rxFrom)[insert](this.$tr(rxTo));
        this.bodyChanged();
      },
      swapRow: function(rx1, rx2) {
        var rxMax, rxMin;

        if (rx1 === rx2) {
          return;
        }
        rx1 = this._bound(rx1, this.rowCount, ".swap: firstIndex");
        rx2 = this._bound(rx2, this.rowCount, ".swap: secondIndex");
        if (Math.abs(rx1 - rx2) === 1) {
          this.moveRow(rx1, rx2);
        } else {
          rxMin = Math.min(rx1, rx2);
          rxMax = Math.max(rx1, rx2);
          this.moveRow(rxMax, rxMin);
          this.moveRow(rxMin + 1, rxMax);
        }
        this.bodyChanged();
      },
      unshiftRow: function(v) {
        this.addRow(0, v);
      },
      shiftRow: function() {
        return this.removeRow(0);
      },
      pushRow: function(v) {
        this.addRow(this.rowCount, v);
      },
      popRow: function() {
        return this.removeRow(-1);
      },
      clearColgroup: function() {
        this.$colgroup.remove();
      },
      clearBody: function() {
        this.$tbody.remove();
        this.bodyChanged();
      },
      clearHeader: function() {
        this.$thead.remove();
        this.headerChanged();
      },
      clearFooter: function() {
        this.$tfoot.remove();
        this.footerChanged();
      },
      clearCaption: function() {
        this.$capation.remove();
      },
      clear: function() {
        this.clearBody();
        this.clearHeader();
        this.clearFooter();
        return this.$caption.remove();
      },
      bodyChanged: function() {
        this._rows = null;
        this._columns = null;
        this._$trs = null;
      },
      headerChanged: function() {
        this._header = null;
      },
      footerChanged: function() {
        this._footer = null;
      },
      _rowFromModel: function(model) {
        var _this = this;

        return oj(function() {
          return _this.each(model, oj.td);
        });
      },
      _rowElFromItem: function(row) {
        return oj[this.rowTagName](row);
      },
      _bound: function(ix, count, message) {
        return _boundOrThrow(ix, count, message, this.typeName);
      }
    }
  });

  for (typeName in oj) {
    if (_isCapitalLetter(typeName[0]) && typeName.slice(typeName.length - 4) !== 'View') {
      oj[_getQuietTagName(typeName)] = _createQuietType(typeName);
    }
  }

  oj.sandbox = {};

  _ref2 = _keys(oj);
  for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
    key = _ref2[_j];
    if ((key.length > 0 && key[0] !== '_') || (key.length > 0 && key[0] === '_' && (oj[key.slice(1)] != null))) {
      oj.addProperty(oj.sandbox, key, {
        value: oj[key],
        writable: false
      });
    }
  }

  oj.use = function(plugin, settings) {
    var name, pluginMap, pluginResult, value, _results;

    if (settings == null) {
      settings = {};
    }
    if (!oj.isFunction(plugin)) {
      throw new Error('oj.use: function expected for first argument');
    }
    if (!oj.isObject(settings)) {
      throw new Error('oj.use: object expected for second argument');
    }
    pluginResult = plugin(oj, settings);
    pluginMap = _clone(pluginResult);
    for (name in pluginResult) {
      value = pluginResult[name];
      if (oj.isOJType(value)) {
        pluginMap[_getQuietTagName(name)] = _createQuietType(value.typeName);
      }
    }
    _results = [];
    for (name in pluginMap) {
      value = pluginMap[name];
      oj[name] = value;
      _results.push(oj.addProperty(oj.sandbox, name, {
        value: value,
        writable: false
      }));
    }
    return _results;
  };

  _jqueryExtend = function(options) {
    if (options == null) {
      options = {};
    }
    _defaults(options, {
      get: _identity,
      set: _identity,
      first: false
    });
    return function() {
      var $els, args, el, out, r, _k, _l, _len2, _len3;

      args = _toArray(arguments);
      $els = jQuery(this);
      if ((oj.isFunction(options.get)) && args.length === 0) {
        out = [];
        for (_k = 0, _len2 = $els.length; _k < _len2; _k++) {
          el = $els[_k];
          out.push(options.get(oj.$(el)));
          if (options.first) {
            return out[0];
          }
        }
        return out;
      } else if (oj.isFunction(options.set)) {
        out = $els;
        for (_l = 0, _len3 = $els.length; _l < _len3; _l++) {
          el = $els[_l];
          r = options.set(oj.$(el), args);
          if (r != null) {
            return r;
          }
        }
        return $els;
      }
    };
  };

  _triggerTypes = function(types) {
    var type, _k, _len2;

    for (_k = 0, _len2 = types.length; _k < _len2; _k++) {
      type = types[_k];
      type.inserted();
    }
  };

  _insertStyles = function(pluginMap, options) {
    var mediaMap, plugin;

    for (plugin in pluginMap) {
      mediaMap = pluginMap[plugin];
      if (plugin === 'oj-style' && !(options != null ? options.global : void 0)) {
        continue;
      }
      if (oj.$('.' + _styleClassFromPlugin(plugin)).length === 0) {
        oj.$('head').append(oj._styleTagFromMediaObject(plugin, mediaMap));
      }
    }
  };

  oj.$.fn.oj = _jqueryExtend({
    set: function($el, args) {
      var cssMap, d, dom, types, _k, _len2, _ref3;

      if (args.length === 0) {
        return $el[0].oj;
      }
      _ref3 = oj.compile.apply(oj, [{
        dom: 1,
        html: 0,
        cssMap: 1
      }].concat(__slice.call(args))), dom = _ref3.dom, types = _ref3.types, cssMap = _ref3.cssMap;
      _insertStyles(cssMap, {
        global: 0
      });
      $el.html('');
      if (!oj.isArray(dom)) {
        dom = [dom];
      }
      for (_k = 0, _len2 = dom.length; _k < _len2; _k++) {
        d = dom[_k];
        $el.append(d);
      }
      _triggerTypes(types);
    },
    get: function($el) {
      return $el[0].oj;
    }
  });

  oj.$.ojBody = function(ojml) {
    var bodyOnly, cssMap, dom, eCompile, types, _ref3;

    bodyOnly = {
      html: 1,
      '!DOCTYPE': 1,
      body: 1,
      head: 'deep',
      meta: 1,
      title: 'deep',
      link: 'deep',
      script: 'deep'
    };
    try {
      _ref3 = oj.compile({
        dom: 1,
        html: 0,
        css: 0,
        cssMap: 1,
        ignore: bodyOnly
      }, ojml), dom = _ref3.dom, types = _ref3.types, cssMap = _ref3.cssMap;
    } catch (_error) {
      eCompile = _error;
      throw new Error("oj.compile: " + eCompile.message);
    }
    if (dom != null) {
      oj.$('body').html(dom);
    }
    _insertStyles(cssMap, {
      global: 1
    });
    return _triggerTypes(types);
  };

  _jqGetValue = function($el, args) {
    var child, el, inst, text;

    el = $el[0];
    child = el.firstChild;
    switch (oj.typeOf(child)) {
      case 'dom-text':
        return text = oj.parse(child.nodeValue);
      case 'dom-element':
        if ((inst = _getInstanceOnElement(child)) != null) {
          return inst;
        } else {
          return child;
        }
    }
  };

  oj.$.fn.ojValue = _jqueryExtend({
    first: true,
    set: null,
    get: _jqGetValue
  });

  oj.$.fn.ojValues = _jqueryExtend({
    first: false,
    set: null,
    get: _jqGetValue
  });

  plugins = {
    ojAfter: 'after',
    ojBefore: 'before',
    ojAppend: 'append',
    ojPrepend: 'prepend',
    ojReplaceWith: 'replaceWith',
    ojWrap: 'wrap',
    ojWrapInner: 'wrapInner'
  };

  _fn1 = function(ojName, jqName) {
    return oj.$.fn[ojName] = _jqueryExtend({
      set: function($el, args) {
        var cssMap, dom, types, _ref3;

        _ref3 = oj.compile.apply(oj, [{
          dom: 1,
          html: 0,
          css: 0,
          cssMap: 1
        }].concat(__slice.call(args))), dom = _ref3.dom, types = _ref3.types, cssMap = _ref3.cssMap;
        _insertStyles(cssMap, {
          global: 0
        });
        $el[jqName](dom);
        _triggerTypes(types);
      },
      get: null
    });
  };
  for (ojName in plugins) {
    jqName = plugins[ojName];
    _fn1(ojName, jqName);
  }

}).call(this);
