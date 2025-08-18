define("rollbar", [], function() { return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 738:
/***/ (function() {

// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(global) {
  'use strict';
  if (!global.console) {
    global.console = {};
  }
  var con = global.console;
  var prop, method;
  var dummy = function() {};
  var properties = ['memory'];
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) if (!con[prop]) con[prop] = {};
  while (method = methods.pop()) if (!con[method]) con[method] = dummy;
  // Using `this` for web workers & supports Browserify / Webpack.
})(typeof window === 'undefined' ? this : window);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ bundles_rollbar; }
});

// NAMESPACE OBJECT: ./src/browser/url.js
var url_namespaceObject = {};
__webpack_require__.r(url_namespaceObject);
__webpack_require__.d(url_namespaceObject, {
  parse: function() { return parse; }
});

;// ./src/merge.js
var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var isPlainObject = function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== '[object Object]') {
    return false;
  }
  var hasOwnConstructor = hasOwn.call(obj, 'constructor');
  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
  // Not own constructor property must be Object
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  var key;
  for (key in obj) {
    /**/
  }
  return typeof key === 'undefined' || hasOwn.call(obj, key);
};
function merge() {
  var i,
    src,
    copy,
    clone,
    name,
    result = {},
    current = null,
    length = arguments.length;
  for (i = 0; i < length; i++) {
    current = arguments[i];
    if (current == null) {
      continue;
    }
    for (name in current) {
      src = result[name];
      copy = current[name];
      if (result !== copy) {
        if (copy && isPlainObject(copy)) {
          clone = src && isPlainObject(src) ? src : {};
          result[name] = merge(clone, copy);
        } else if (typeof copy !== 'undefined') {
          result[name] = copy;
        }
      }
    }
  }
  return result;
}
/* harmony default export */ var src_merge = (merge);
;// ./src/utility.js
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


/*
 * isType - Given a Javascript value and a string, returns true if the type of the value matches the
 * given string.
 *
 * @param x - any value
 * @param t - a lowercase string containing one of the following type names:
 *    - undefined
 *    - null
 *    - error
 *    - number
 *    - boolean
 *    - string
 *    - symbol
 *    - function
 *    - object
 *    - array
 * @returns true if x is of type t, otherwise false
 */
function isType(x, t) {
  return t === typeName(x);
}

/*
 * typeName - Given a Javascript value, returns the type of the object as a string
 */
function typeName(x) {
  var name = _typeof(x);
  if (name !== 'object') {
    return name;
  }
  if (!x) {
    return 'null';
  }
  if (x instanceof Error) {
    return 'error';
  }
  return {}.toString.call(x).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

/* isFunction - a convenience function for checking if a value is a function
 *
 * @param f - any value
 * @returns true if f is a function, otherwise false
 */
function isFunction(f) {
  return isType(f, 'function');
}

/* isNativeFunction - a convenience function for checking if a value is a native JS function
 *
 * @param f - any value
 * @returns true if f is a native JS function, otherwise false
 */
function isNativeFunction(f) {
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var funcMatchString = Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?');
  var reIsNative = RegExp('^' + funcMatchString + '$');
  return isObject(f) && reIsNative.test(f);
}

/* isObject - Checks if the argument is an object
 *
 * @param value - any value
 * @returns true is value is an object function is an object)
 */
function isObject(value) {
  var type = _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}

/* isString - Checks if the argument is a string
 *
 * @param value - any value
 * @returns true if value is a string
 */
function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

/**
 * isFiniteNumber - determines whether the passed value is a finite number
 *
 * @param {*} n - any value
 * @returns true if value is a finite number
 */
function isFiniteNumber(n) {
  return Number.isFinite(n);
}

/*
 * isDefined - a convenience function for checking if a value is not equal to undefined
 *
 * @param u - any value
 * @returns true if u is anything other than undefined
 */
function isDefined(u) {
  return !isType(u, 'undefined');
}

/*
 * isIterable - convenience function for checking if a value can be iterated, essentially
 * whether it is an object or an array.
 *
 * @param i - any value
 * @returns true if i is an object or an array as determined by `typeName`
 */
function isIterable(i) {
  var type = typeName(i);
  return type === 'object' || type === 'array';
}

/*
 * isError - convenience function for checking if a value is of an error type
 *
 * @param e - any value
 * @returns true if e is an error
 */
function isError(e) {
  // Detect both Error and Firefox Exception type
  return isType(e, 'error') || isType(e, 'exception');
}

/* isPromise - a convenience function for checking if a value is a promise
 *
 * @param p - any value
 * @returns true if f is a function, otherwise false
 */
function isPromise(p) {
  return isObject(p) && isType(p.then, 'function');
}

/**
 * isBrowser - a convenience function for checking if the code is running in a browser
 *
 * @returns true if the code is running in a browser environment
 */
function isBrowser() {
  return typeof window !== 'undefined';
}
function redact() {
  return '********';
}

// from http://stackoverflow.com/a/8809472/1138191
function uuid4() {
  var d = utility_now();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x7 | 0x8).toString(16);
  });
  return uuid;
}
var LEVELS = {
  debug: 0,
  info: 1,
  warning: 2,
  error: 3,
  critical: 4
};
function sanitizeUrl(url) {
  var baseUrlParts = parseUri(url);
  if (!baseUrlParts) {
    return '(unknown)';
  }

  // remove a trailing # if there is no anchor
  if (baseUrlParts.anchor === '') {
    baseUrlParts.source = baseUrlParts.source.replace('#', '');
  }
  url = baseUrlParts.source.replace('?' + baseUrlParts.query, '');
  return url;
}
var parseUriOptions = {
  strictMode: false,
  key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
  q: {
    name: 'queryKey',
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};
function parseUri(str) {
  if (!isType(str, 'string')) {
    return undefined;
  }
  var o = parseUriOptions;
  var m = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str);
  var uri = {};
  for (var i = 0, l = o.key.length; i < l; ++i) {
    uri[o.key[i]] = m[i] || '';
  }
  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) {
      uri[o.q.name][$1] = $2;
    }
  });
  return uri;
}
function addParamsAndAccessTokenToPath(accessToken, options, params) {
  params = params || {};
  params.access_token = accessToken;
  var paramsArray = [];
  var k;
  for (k in params) {
    if (Object.prototype.hasOwnProperty.call(params, k)) {
      paramsArray.push([k, params[k]].join('='));
    }
  }
  var query = '?' + paramsArray.sort().join('&');
  options = options || {};
  options.path = options.path || '';
  var qs = options.path.indexOf('?');
  var h = options.path.indexOf('#');
  var p;
  if (qs !== -1 && (h === -1 || h > qs)) {
    p = options.path;
    options.path = p.substring(0, qs) + query + '&' + p.substring(qs + 1);
  } else {
    if (h !== -1) {
      p = options.path;
      options.path = p.substring(0, h) + query + p.substring(h);
    } else {
      options.path = options.path + query;
    }
  }
}
function formatUrl(u, protocol) {
  protocol = protocol || u.protocol;
  if (!protocol && u.port) {
    if (u.port === 80) {
      protocol = 'http:';
    } else if (u.port === 443) {
      protocol = 'https:';
    }
  }
  protocol = protocol || 'https:';
  if (!u.hostname) {
    return null;
  }
  var result = protocol + '//' + u.hostname;
  if (u.port) {
    result = result + ':' + u.port;
  }
  if (u.path) {
    result = result + u.path;
  }
  return result;
}
function stringify(obj, backup) {
  var value, error;
  try {
    value = JSON.stringify(obj);
  } catch (jsonError) {
    if (backup && isFunction(backup)) {
      try {
        value = backup(obj);
      } catch (backupError) {
        error = backupError;
      }
    } else {
      error = jsonError;
    }
  }
  return {
    error: error,
    value: value
  };
}
function maxByteSize(string) {
  // The transport will use utf-8, so assume utf-8 encoding.
  //
  // This minimal implementation will accurately count bytes for all UCS-2 and
  // single code point UTF-16. If presented with multi code point UTF-16,
  // which should be rare, it will safely overcount, not undercount.
  //
  // While robust utf-8 encoders exist, this is far smaller and far more performant.
  // For quickly counting payload size for truncation, smaller is better.

  var count = 0;
  var length = string.length;
  for (var i = 0; i < length; i++) {
    var code = string.charCodeAt(i);
    if (code < 128) {
      // up to 7 bits
      count = count + 1;
    } else if (code < 2048) {
      // up to 11 bits
      count = count + 2;
    } else if (code < 65536) {
      // up to 16 bits
      count = count + 3;
    }
  }
  return count;
}
function jsonParse(s) {
  var value, error;
  try {
    value = JSON.parse(s);
  } catch (e) {
    error = e;
  }
  return {
    error: error,
    value: value
  };
}
function makeUnhandledStackInfo(message, url, lineno, colno, error, mode, backupMessage, errorParser) {
  var location = {
    url: url || '',
    line: lineno,
    column: colno
  };
  location.func = errorParser.guessFunctionName(location.url, location.line);
  location.context = errorParser.gatherContext(location.url, location.line);
  var href = typeof document !== 'undefined' && document && document.location && document.location.href;
  var useragent = typeof window !== 'undefined' && window && window.navigator && window.navigator.userAgent;
  return {
    mode: mode,
    message: error ? String(error) : message || backupMessage,
    url: href,
    stack: [location],
    useragent: useragent
  };
}
function wrapCallback(logger, f) {
  return function (err, resp) {
    try {
      f(err, resp);
    } catch (e) {
      logger.error(e);
    }
  };
}
function nonCircularClone(obj) {
  var seen = [obj];
  function clone(obj, seen) {
    var value,
      name,
      newSeen,
      result = {};
    try {
      for (name in obj) {
        value = obj[name];
        if (value && (isType(value, 'object') || isType(value, 'array'))) {
          if (seen.includes(value)) {
            result[name] = 'Removed circular reference: ' + typeName(value);
          } else {
            newSeen = seen.slice();
            newSeen.push(value);
            result[name] = clone(value, newSeen);
          }
          continue;
        }
        result[name] = value;
      }
    } catch (e) {
      result = 'Failed cloning custom data: ' + e.message;
    }
    return result;
  }
  return clone(obj, seen);
}
function createItem(args, logger, notifier, requestKeys, lambdaContext) {
  var message, err, custom, callback, request;
  var arg;
  var extraArgs = [];
  var diagnostic = {};
  var argTypes = [];
  for (var i = 0, l = args.length; i < l; ++i) {
    arg = args[i];
    var typ = typeName(arg);
    argTypes.push(typ);
    switch (typ) {
      case 'undefined':
        break;
      case 'string':
        message ? extraArgs.push(arg) : message = arg;
        break;
      case 'function':
        callback = wrapCallback(logger, arg);
        break;
      case 'date':
        extraArgs.push(arg);
        break;
      case 'error':
      case 'domexception':
      case 'exception':
        // Firefox Exception type
        err ? extraArgs.push(arg) : err = arg;
        break;
      case 'object':
      case 'array':
        if (arg instanceof Error || typeof DOMException !== 'undefined' && arg instanceof DOMException) {
          err ? extraArgs.push(arg) : err = arg;
          break;
        }
        if (requestKeys && typ === 'object' && !request) {
          for (var j = 0, len = requestKeys.length; j < len; ++j) {
            if (arg[requestKeys[j]] !== undefined) {
              request = arg;
              break;
            }
          }
          if (request) {
            break;
          }
        }
        custom ? extraArgs.push(arg) : custom = arg;
        break;
      default:
        if (arg instanceof Error || typeof DOMException !== 'undefined' && arg instanceof DOMException) {
          err ? extraArgs.push(arg) : err = arg;
          break;
        }
        extraArgs.push(arg);
    }
  }

  // if custom is an array this turns it into an object with integer keys
  if (custom) custom = nonCircularClone(custom);
  if (extraArgs.length > 0) {
    if (!custom) custom = nonCircularClone({});
    custom.extraArgs = nonCircularClone(extraArgs);
  }
  var item = {
    message: message,
    err: err,
    custom: custom,
    timestamp: utility_now(),
    callback: callback,
    notifier: notifier,
    diagnostic: diagnostic,
    uuid: uuid4()
  };
  item.data = item.data || {};
  setCustomItemKeys(item, custom);
  if (requestKeys && request) {
    item.request = request;
  }
  if (lambdaContext) {
    item.lambdaContext = lambdaContext;
  }
  item._originalArgs = args;
  item.diagnostic.original_arg_types = argTypes;
  return item;
}
function setCustomItemKeys(item, custom) {
  if (custom && custom.level !== undefined) {
    item.level = custom.level;
    delete custom.level;
  }
  if (custom && custom.skipFrames !== undefined) {
    item.skipFrames = custom.skipFrames;
    delete custom.skipFrames;
  }
}
function addErrorContext(item, errors) {
  var custom = item.data.custom || {};
  var contextAdded = false;
  try {
    for (var i = 0; i < errors.length; ++i) {
      if (errors[i].hasOwnProperty('rollbarContext')) {
        custom = src_merge(custom, nonCircularClone(errors[i].rollbarContext));
        contextAdded = true;
      }
    }

    // Avoid adding an empty object to the data.
    if (contextAdded) {
      item.data.custom = custom;
    }
  } catch (e) {
    item.diagnostic.error_context = 'Failed: ' + e.message;
  }
}
var TELEMETRY_TYPES = ['log', 'network', 'dom', 'navigation', 'error', 'manual'];
var TELEMETRY_LEVELS = ['critical', 'error', 'warning', 'info', 'debug'];
function arrayIncludes(arr, val) {
  for (var k = 0; k < arr.length; ++k) {
    if (arr[k] === val) {
      return true;
    }
  }
  return false;
}
function createTelemetryEvent(args) {
  var type, metadata, level;
  var arg;
  for (var i = 0, l = args.length; i < l; ++i) {
    arg = args[i];
    var typ = typeName(arg);
    switch (typ) {
      case 'string':
        if (!type && arrayIncludes(TELEMETRY_TYPES, arg)) {
          type = arg;
        } else if (!level && arrayIncludes(TELEMETRY_LEVELS, arg)) {
          level = arg;
        }
        break;
      case 'object':
        metadata = arg;
        break;
      default:
        break;
    }
  }
  var event = {
    type: type || 'manual',
    metadata: metadata || {},
    level: level
  };
  return event;
}
function addItemAttributes(itemData, attributes) {
  itemData.attributes = itemData.attributes || [];
  var _iterator = _createForOfIteratorHelper(attributes),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var a = _step.value;
      if (a.value === undefined) {
        continue;
      }
      itemData.attributes.push(a);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function getItemAttribute(itemData, key) {
  var attributes = itemData.attributes || [];
  for (var i = 0; i < attributes.length; ++i) {
    if (attributes[i].key === key) {
      return attributes[i].value;
    }
  }
  return undefined;
}

/*
 * get - given an obj/array and a keypath, return the value at that keypath or
 *       undefined if not possible.
 *
 * @param obj - an object or array
 * @param path - a string of keys separated by '.' such as 'plugin.jquery.0.message'
 *    which would correspond to 42 in `{plugin: {jquery: [{message: 42}]}}`
 */
function get(obj, path) {
  if (!obj) {
    return undefined;
  }
  var keys = path.split('.');
  var result = obj;
  try {
    for (var i = 0, len = keys.length; i < len; ++i) {
      result = result[keys[i]];
    }
  } catch (e) {
    result = undefined;
  }
  return result;
}
function set(obj, path, value) {
  if (!obj) {
    return;
  }
  var keys = path.split('.');
  var len = keys.length;
  if (len < 1) {
    return;
  }
  if (len === 1) {
    obj[keys[0]] = value;
    return;
  }
  try {
    var temp = obj[keys[0]] || {};
    var replacement = temp;
    for (var i = 1; i < len - 1; ++i) {
      temp[keys[i]] = temp[keys[i]] || {};
      temp = temp[keys[i]];
    }
    temp[keys[len - 1]] = value;
    obj[keys[0]] = replacement;
  } catch (e) {
    return;
  }
}
function formatArgsAsString(args) {
  var i, len, arg;
  var result = [];
  for (i = 0, len = args.length; i < len; ++i) {
    arg = args[i];
    switch (typeName(arg)) {
      case 'object':
        arg = stringify(arg);
        arg = arg.error || arg.value;
        if (arg.length > 500) {
          arg = arg.substr(0, 497) + '...';
        }
        break;
      case 'null':
        arg = 'null';
        break;
      case 'undefined':
        arg = 'undefined';
        break;
      case 'symbol':
        arg = arg.toString();
        break;
    }
    result.push(arg);
  }
  return result.join(' ');
}
function utility_now() {
  if (Date.now) {
    return +Date.now();
  }
  return +new Date();
}
function filterIp(requestData, captureIp) {
  if (!requestData || !requestData['user_ip'] || captureIp === true) {
    return;
  }
  var newIp = requestData['user_ip'];
  if (!captureIp) {
    newIp = null;
  } else {
    try {
      var parts;
      if (newIp.indexOf('.') !== -1) {
        parts = newIp.split('.');
        parts.pop();
        parts.push('0');
        newIp = parts.join('.');
      } else if (newIp.indexOf(':') !== -1) {
        parts = newIp.split(':');
        if (parts.length > 2) {
          var beginning = parts.slice(0, 3);
          var slashIdx = beginning[2].indexOf('/');
          if (slashIdx !== -1) {
            beginning[2] = beginning[2].substring(0, slashIdx);
          }
          var terminal = '0000:0000:0000:0000:0000';
          newIp = beginning.concat(terminal).join(':');
        }
      } else {
        newIp = null;
      }
    } catch (e) {
      newIp = null;
    }
  }
  requestData['user_ip'] = newIp;
}
function handleOptions(current, input, payload, logger) {
  var result = src_merge(current, input, payload);
  result = updateDeprecatedOptions(result, logger);
  if (!input || input.overwriteScrubFields) {
    return result;
  }
  if (input.scrubFields) {
    result.scrubFields = (current.scrubFields || []).concat(input.scrubFields);
  }
  return result;
}
function updateDeprecatedOptions(options, logger) {
  if (options.hostWhiteList && !options.hostSafeList) {
    options.hostSafeList = options.hostWhiteList;
    options.hostWhiteList = undefined;
    logger && logger.log('hostWhiteList is deprecated. Use hostSafeList.');
  }
  if (options.hostBlackList && !options.hostBlockList) {
    options.hostBlockList = options.hostBlackList;
    options.hostBlackList = undefined;
    logger && logger.log('hostBlackList is deprecated. Use hostBlockList.');
  }
  return options;
}

;// ./src/rateLimiter.js


/*
 * RateLimiter - an object that encapsulates the logic for counting items sent to Rollbar
 *
 * @param options - the same options that are accepted by configureGlobal offered as a convenience
 */
function RateLimiter(options) {
  this.startTime = utility_now();
  this.counter = 0;
  this.perMinCounter = 0;
  this.platform = null;
  this.platformOptions = {};
  this.configureGlobal(options);
}
RateLimiter.globalSettings = {
  startTime: utility_now(),
  maxItems: undefined,
  itemsPerMinute: undefined
};

/*
 * configureGlobal - set the global rate limiter options
 *
 * @param options - Only the following values are recognized:
 *    startTime: a timestamp of the form returned by (new Date()).getTime()
 *    maxItems: the maximum items
 *    itemsPerMinute: the max number of items to send in a given minute
 */
RateLimiter.prototype.configureGlobal = function (options) {
  if (options.startTime !== undefined) {
    RateLimiter.globalSettings.startTime = options.startTime;
  }
  if (options.maxItems !== undefined) {
    RateLimiter.globalSettings.maxItems = options.maxItems;
  }
  if (options.itemsPerMinute !== undefined) {
    RateLimiter.globalSettings.itemsPerMinute = options.itemsPerMinute;
  }
};

/*
 * shouldSend - determine if we should send a given item based on rate limit settings
 *
 * @param item - the item we are about to send
 * @returns An object with the following structure:
 *  error: (Error|null)
 *  shouldSend: bool
 *  payload: (Object|null)
 *  If shouldSend is false, the item passed as a parameter should not be sent to Rollbar, and
 *  exactly one of error or payload will be non-null. If error is non-null, the returned Error will
 *  describe the situation, but it means that we were already over a rate limit (either globally or
 *  per minute) when this item was checked. If error is null, and therefore payload is non-null, it
 *  means this item put us over the global rate limit and the payload should be sent to Rollbar in
 *  place of the passed in item.
 */
RateLimiter.prototype.shouldSend = function (item, now) {
  now = now || utility_now();
  var elapsedTime = now - this.startTime;
  if (elapsedTime < 0 || elapsedTime >= 60000) {
    this.startTime = now;
    this.perMinCounter = 0;
  }
  var globalRateLimit = RateLimiter.globalSettings.maxItems;
  var globalRateLimitPerMin = RateLimiter.globalSettings.itemsPerMinute;
  if (checkRate(item, globalRateLimit, this.counter)) {
    return shouldSendValue(this.platform, this.platformOptions, globalRateLimit + ' max items reached', false);
  } else if (checkRate(item, globalRateLimitPerMin, this.perMinCounter)) {
    return shouldSendValue(this.platform, this.platformOptions, globalRateLimitPerMin + ' items per minute reached', false);
  }
  this.counter++;
  this.perMinCounter++;
  var shouldSend = !checkRate(item, globalRateLimit, this.counter);
  var perMinute = shouldSend;
  shouldSend = shouldSend && !checkRate(item, globalRateLimitPerMin, this.perMinCounter);
  return shouldSendValue(this.platform, this.platformOptions, null, shouldSend, globalRateLimit, globalRateLimitPerMin, perMinute);
};
RateLimiter.prototype.setPlatformOptions = function (platform, options) {
  this.platform = platform;
  this.platformOptions = options;
};

/* Helpers */

function checkRate(item, limit, counter) {
  return !item.ignoreRateLimit && limit >= 1 && counter > limit;
}
function shouldSendValue(platform, options, error, shouldSend, globalRateLimit, limitPerMin, perMinute) {
  var payload = null;
  if (error) {
    error = new Error(error);
  }
  if (!error && !shouldSend) {
    payload = rateLimitPayload(platform, options, globalRateLimit, limitPerMin, perMinute);
  }
  return {
    error: error,
    shouldSend: shouldSend,
    payload: payload
  };
}
function rateLimitPayload(platform, options, globalRateLimit, limitPerMin, perMinute) {
  var environment = options.environment || options.payload && options.payload.environment;
  var msg;
  if (perMinute) {
    msg = 'item per minute limit reached, ignoring errors until timeout';
  } else {
    msg = 'maxItems has been hit, ignoring errors until reset.';
  }
  var item = {
    body: {
      message: {
        body: msg,
        extra: {
          maxItems: globalRateLimit,
          itemsPerMinute: limitPerMin
        }
      }
    },
    language: 'javascript',
    environment: environment,
    notifier: {
      version: options.notifier && options.notifier.version || options.version
    }
  };
  if (platform === 'browser') {
    item.platform = 'browser';
    item.framework = 'browser-js';
    item.notifier.name = 'rollbar-browser-js';
  } else if (platform === 'server') {
    item.framework = options.framework || 'node-js';
    item.notifier.name = options.notifier.name;
  } else if (platform === 'react-native') {
    item.framework = options.framework || 'react-native';
    item.notifier.name = options.notifier.name;
  }
  return item;
}
/* harmony default export */ var rateLimiter = (RateLimiter);
;// ./src/queue.js
function queue_typeof(o) { "@babel/helpers - typeof"; return queue_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, queue_typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == queue_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(queue_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


/*
 * Queue - an object which handles which handles a queue of items to be sent to Rollbar.
 *   This object handles rate limiting via a passed in rate limiter, retries based on connection
 *   errors, and filtering of items based on a set of configurable predicates. The communication to
 *   the backend is performed via a given API object.
 *
 * @param rateLimiter - An object which conforms to the interface
 *    rateLimiter.shouldSend(item) -> bool
 * @param api - An object which conforms to the interface
 *    api.postItem(payload, function(err, response))
 * @param logger - An object used to log verbose messages if desired
 * @param options - see Queue.prototype.configure
 * @param replayMap - Optional ReplayMap for coordinating session replay with error occurrences
 */
function Queue(rateLimiter, api, logger, options, replayMap) {
  this.rateLimiter = rateLimiter;
  this.api = api;
  this.logger = logger;
  this.options = options;
  this.replayMap = replayMap;
  this.predicates = [];
  this.pendingItems = [];
  this.pendingRequests = [];
  this.retryQueue = [];
  this.retryHandle = null;
  this.waitCallback = null;
  this.waitIntervalID = null;
}

/*
 * configure - updates the options this queue uses
 *
 * @param options
 */
Queue.prototype.configure = function (options) {
  this.api && this.api.configure(options);
  var oldOptions = this.options;
  this.options = src_merge(oldOptions, options);
  return this;
};

/*
 * addPredicate - adds a predicate to the end of the list of predicates for this queue
 *
 * @param predicate - function(item, options) -> (bool|{err: Error})
 *  Returning true means that this predicate passes and the item is okay to go on the queue
 *  Returning false means do not add the item to the queue, but it is not an error
 *  Returning {err: Error} means do not add the item to the queue, and the given error explains why
 *  Returning {err: undefined} is equivalent to returning true but don't do that
 */
Queue.prototype.addPredicate = function (predicate) {
  if (isFunction(predicate)) {
    this.predicates.push(predicate);
  }
  return this;
};
Queue.prototype.addPendingItem = function (item) {
  this.pendingItems.push(item);
};
Queue.prototype.removePendingItem = function (item) {
  var idx = this.pendingItems.indexOf(item);
  if (idx !== -1) {
    this.pendingItems.splice(idx, 1);
  }
};

/*
 * addItem - Send an item to the Rollbar API if all of the predicates are satisfied
 *
 * @param item - Item instance with the payload to send to the backend
 * @param callback - function(error, repsonse) which will be called with the response from the API
 *  in the case of a success, otherwise response will be null and error will have a value. If both
 *  error and response are null then the item was stopped by a predicate which did not consider this
 *  to be an error condition, but nonetheless did not send the item to the API.
 * @param originalError - The original error before any transformations that is to be logged if any
 * @param originalItem - The original item before transforms, used in pendingItems queue
 */
Queue.prototype.addItem = function (item, callback, originalError, originalItem) {
  if (!callback || !isFunction(callback)) {
    callback = function callback() {
      return;
    };
  }
  var data = item.data;
  var predicateResult = this._applyPredicates(data);
  if (predicateResult.stop) {
    this.removePendingItem(originalItem);
    callback(predicateResult.err);
    return;
  }
  this._maybeLog(data, originalError);
  this.removePendingItem(originalItem);
  if (!this.options.transmit) {
    callback(new Error('Transmit disabled'));
    return;
  }
  if (this.replayMap && data.body) {
    var replayId = getItemAttribute(data, 'replay_id');
    if (replayId) {
      item.replayId = this.replayMap.add(replayId, data.uuid);
    }
  }
  this.pendingRequests.push(data);
  try {
    this._makeApiRequest(data, function (err, resp, headers) {
      this._dequeuePendingRequest(data);
      if (!err && resp && item.replayId) {
        this._handleReplayResponse(item.replayId, resp, headers);
      }
      callback(err, resp);
    }.bind(this));
  } catch (e) {
    this._dequeuePendingRequest(data);
    callback(e);
  }
};

/*
 * wait - Stop any further errors from being added to the queue, and get called back when all items
 *   currently processing have finished sending to the backend.
 *
 * @param callback - function() called when all pending items have been sent
 */
Queue.prototype.wait = function (callback) {
  if (!isFunction(callback)) {
    return;
  }
  this.waitCallback = callback;
  if (this._maybeCallWait()) {
    return;
  }
  if (this.waitIntervalID) {
    this.waitIntervalID = clearInterval(this.waitIntervalID);
  }
  this.waitIntervalID = setInterval(function () {
    this._maybeCallWait();
  }.bind(this), 500);
};

/* _applyPredicates - Sequentially applies the predicates that have been added to the queue to the
 *   given item with the currently configured options.
 *
 * @param item - An item in the queue
 * @returns {stop: bool, err: (Error|null)} - stop being true means do not add item to the queue,
 *   the error value should be passed up to a callbak if we are stopping.
 */
Queue.prototype._applyPredicates = function (item) {
  var p = null;
  for (var i = 0, len = this.predicates.length; i < len; i++) {
    p = this.predicates[i](item, this.options);
    if (!p || p.err !== undefined) {
      return {
        stop: true,
        err: p.err
      };
    }
  }
  return {
    stop: false,
    err: null
  };
};

/*
 * _makeApiRequest - Send an item to Rollbar, callback when done, if there is an error make an
 *   effort to retry if we are configured to do so.
 *
 * @param item - an item ready to send to the backend
 * @param callback - function(err, response)
 */
Queue.prototype._makeApiRequest = function (item, callback) {
  var rateLimitResponse = this.rateLimiter.shouldSend(item);
  if (rateLimitResponse.shouldSend) {
    this.api.postItem(item, function (err, resp, headers) {
      if (err) {
        this._maybeRetry(err, item, callback);
      } else {
        callback(err, resp, headers);
      }
    }.bind(this));
  } else if (rateLimitResponse.error) {
    callback(rateLimitResponse.error);
  } else {
    this.api.postItem(rateLimitResponse.payload, callback);
  }
};

// These are errors basically mean there is no internet connection
var RETRIABLE_ERRORS = ['ECONNRESET', 'ENOTFOUND', 'ESOCKETTIMEDOUT', 'ETIMEDOUT', 'ECONNREFUSED', 'EHOSTUNREACH', 'EPIPE', 'EAI_AGAIN'];

/*
 * _maybeRetry - Given the error returned by the API, decide if we should retry or just callback
 *   with the error.
 *
 * @param err - an error returned by the API transport
 * @param item - the item that was trying to be sent when this error occured
 * @param callback - function(err, response)
 */
Queue.prototype._maybeRetry = function (err, item, callback) {
  var shouldRetry = false;
  if (this.options.retryInterval) {
    for (var i = 0, len = RETRIABLE_ERRORS.length; i < len; i++) {
      if (err.code === RETRIABLE_ERRORS[i]) {
        shouldRetry = true;
        break;
      }
    }
    if (shouldRetry && isFiniteNumber(this.options.maxRetries)) {
      item.retries = item.retries ? item.retries + 1 : 1;
      if (item.retries > this.options.maxRetries) {
        shouldRetry = false;
      }
    }
  }
  if (shouldRetry) {
    this._retryApiRequest(item, callback);
  } else {
    callback(err);
  }
};

/*
 * _retryApiRequest - Add an item and a callback to a queue and possibly start a timer to process
 *   that queue based on the retryInterval in the options for this queue.
 *
 * @param item - an item that failed to send due to an error we deem retriable
 * @param callback - function(err, response)
 */
Queue.prototype._retryApiRequest = function (item, callback) {
  this.retryQueue.push({
    item: item,
    callback: callback
  });
  if (!this.retryHandle) {
    this.retryHandle = setInterval(function () {
      while (this.retryQueue.length) {
        var retryObject = this.retryQueue.shift();
        this._makeApiRequest(retryObject.item, retryObject.callback);
      }
    }.bind(this), this.options.retryInterval);
  }
};

/*
 * _dequeuePendingRequest - Removes the item from the pending request queue, this queue is used to
 *   enable to functionality of providing a callback that clients can pass to `wait` to be notified
 *   when the pending request queue has been emptied. This must be called when the API finishes
 *   processing this item. If a `wait` callback is configured, it is called by this function.
 *
 * @param item - the item previously added to the pending request queue
 */
Queue.prototype._dequeuePendingRequest = function (item) {
  var idx = this.pendingRequests.indexOf(item);
  if (idx !== -1) {
    this.pendingRequests.splice(idx, 1);
    this._maybeCallWait();
  }
};
Queue.prototype._maybeLog = function (data, originalError) {
  if (this.logger && this.options.verbose) {
    var message = originalError;
    message = message || get(data, 'body.trace.exception.message');
    message = message || get(data, 'body.trace_chain.0.exception.message');
    if (message) {
      this.logger.error(message);
      return;
    }
    message = get(data, 'body.message.body');
    if (message) {
      this.logger.log(message);
    }
  }
};
Queue.prototype._maybeCallWait = function () {
  if (isFunction(this.waitCallback) && this.pendingItems.length === 0 && this.pendingRequests.length === 0) {
    if (this.waitIntervalID) {
      this.waitIntervalID = clearInterval(this.waitIntervalID);
    }
    this.waitCallback();
    return true;
  }
  return false;
};

/**
 * Handles the API response for an item with a replay ID.
 * Based on the success or failure status of the response,
 * it either sends or discards the associated session replay.
 *
 * @param {string} replayId - The ID of the replay to handle
 * @param {Object} response - The API response
 * @returns {Promise<boolean>} A promise that resolves to true if replay was sent successfully,
 *                             false if replay was discarded or an error occurred
 * @private
 */
Queue.prototype._handleReplayResponse = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(replayId, response, headers) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (this.replayMap) {
            _context.next = 3;
            break;
          }
          console.warn('Queue._handleReplayResponse: ReplayMap not available');
          return _context.abrupt("return", false);
        case 3:
          if (replayId) {
            _context.next = 6;
            break;
          }
          console.warn('Queue._handleReplayResponse: No replayId provided');
          return _context.abrupt("return", false);
        case 6:
          _context.prev = 6;
          if (!this._shouldSendReplay(response, headers)) {
            _context.next = 13;
            break;
          }
          _context.next = 10;
          return this.replayMap.send(replayId);
        case 10:
          return _context.abrupt("return", _context.sent);
        case 13:
          this.replayMap.discard(replayId);
          return _context.abrupt("return", false);
        case 15:
          _context.next = 21;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](6);
          console.error('Error handling replay response:', _context.t0);
          return _context.abrupt("return", false);
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, this, [[6, 17]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
Queue.prototype._shouldSendReplay = function (response, headers) {
  if ((response === null || response === void 0 ? void 0 : response.err) !== 0 || !headers || headers['Rollbar-Replay-Enabled'] !== 'true' || headers['Rollbar-Replay-RateLimit-Remaining'] === '0') {
    return false;
  }
  return true;
};
/* harmony default export */ var queue = (Queue);
;// ./src/notifier.js


/*
 * Notifier - the internal object responsible for delegating between the client exposed API, the
 * chain of transforms necessary to turn an item into something that can be sent to Rollbar, and the
 * queue which handles the communcation with the Rollbar API servers.
 *
 * @param queue - an object that conforms to the interface: addItem(item, callback)
 * @param options - an object representing the options to be set for this notifier, this should have
 * any defaults already set by the caller
 */
function Notifier(queue, options) {
  this.queue = queue;
  this.options = options;
  this.transforms = [];
  this.diagnostic = {};
}

/*
 * configure - updates the options for this notifier with the passed in object
 *
 * @param options - an object which gets merged with the current options set on this notifier
 * @returns this
 */
Notifier.prototype.configure = function (options) {
  this.queue && this.queue.configure(options);
  var oldOptions = this.options;
  this.options = src_merge(oldOptions, options);
  return this;
};

/*
 * addTransform - adds a transform onto the end of the queue of transforms for this notifier
 *
 * @param transform - a function which takes three arguments:
 *    * item: An Object representing the data to eventually be sent to Rollbar
 *    * options: The current value of the options for this notifier
 *    * callback: function(err: (Null|Error), item: (Null|Object)) the transform must call this
 *    callback with a null value for error if it wants the processing chain to continue, otherwise
 *    with an error to terminate the processing. The item should be the updated item after this
 *    transform is finished modifying it.
 */
Notifier.prototype.addTransform = function (transform) {
  if (isFunction(transform)) {
    this.transforms.push(transform);
  }
  return this;
};

/*
 * log - the internal log function which applies the configured transforms and then pushes onto the
 * queue to be sent to the backend.
 *
 * @param item - An object with the following structure:
 *    message [String] - An optional string to be sent to rollbar
 *    error [Error] - An optional error
 *
 * @param callback - A function of type function(err, resp) which will be called with exactly one
 * null argument and one non-null argument. The callback will be called once, either during the
 * transform stage if an error occurs inside a transform, or in response to the communication with
 * the backend. The second argument will be the response from the backend in case of success.
 */
Notifier.prototype.log = function (item, callback) {
  if (!callback || !isFunction(callback)) {
    callback = function callback() {};
  }
  if (!this.options.enabled) {
    return callback(new Error('Rollbar is not enabled'));
  }
  this.queue.addPendingItem(item);
  var originalError = item.err;
  this._applyTransforms(item, function (err, i) {
    if (err) {
      this.queue.removePendingItem(item);
      return callback(err, null);
    }
    this.queue.addItem(i, callback, originalError, item);
  }.bind(this));
};

/* Internal */

/*
 * _applyTransforms - Applies the transforms that have been added to this notifier sequentially. See
 * `addTransform` for more information.
 *
 * @param item - An item to be transformed
 * @param callback - A function of type function(err, item) which will be called with a non-null
 * error and a null item in the case of a transform failure, or a null error and non-null item after
 * all transforms have been applied.
 */
Notifier.prototype._applyTransforms = function (item, callback) {
  var transformIndex = -1;
  var transformsLength = this.transforms.length;
  var transforms = this.transforms;
  var options = this.options;
  var _cb = function cb(err, i) {
    if (err) {
      callback(err, null);
      return;
    }
    transformIndex++;
    if (transformIndex === transformsLength) {
      callback(null, i);
      return;
    }
    transforms[transformIndex](i, options, _cb);
  };
  _cb(null, item);
};
/* harmony default export */ var notifier = (Notifier);
;// ./src/browser/replay/replayPredicates.js
function replayPredicates_typeof(o) { "@babel/helpers - typeof"; return replayPredicates_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, replayPredicates_typeof(o); }
function replayPredicates_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = replayPredicates_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function replayPredicates_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return replayPredicates_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? replayPredicates_arrayLikeToArray(r, a) : void 0; } }
function replayPredicates_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == replayPredicates_typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != replayPredicates_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != replayPredicates_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * ReplayPredicates - Determine if replay is enabled for a given trigger type.
 *
 */
var ReplayPredicates = /*#__PURE__*/function () {
  /*
   * Constructor for ReplayPredicates.
   *
   * @param {Object} config - Configuration object containing replay settings.
   * @param {Object} context - Context object containing state used by predicates.
   */
  function ReplayPredicates(config, context) {
    _classCallCheck(this, ReplayPredicates);
    _defineProperty(this, "maxAdjustedCount", Math.pow(2, 56));
    this.config = config || {};
    this.triggers = (config === null || config === void 0 ? void 0 : config.triggers) || [];
    this.context = context || {};
    this.predicates = {
      occurrence: [this.isLevelMatching.bind(this), this.isSampled.bind(this)]
    };
  }

  /**
   * isEnabledForTriggerType - Checks if replay is enabled for a given trigger type.
   * Applies all predicates for that trigger type and returns true if all predicates pass
   * for any matching trigger.
   *
   * @param {string} triggerType - The type of the trigger to check.
   * @returns {boolean} - True if replay is enabled for the trigger type, false otherwise.
   */
  return _createClass(ReplayPredicates, [{
    key: "isEnabledForTriggerType",
    value: function isEnabledForTriggerType(triggerType) {
      var predicates = this.predicates[triggerType];
      var _iterator = replayPredicates_createForOfIteratorHelper(this.triggers),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var t = _step.value;
          if (t.type === triggerType && this.isEnabledForTrigger(t, predicates)) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return false;
    }
  }, {
    key: "isEnabledForTrigger",
    value: function isEnabledForTrigger(trigger, predicates) {
      if (predicates.find(function (p) {
        return !p(trigger);
      })) {
        return false;
      }
      return true;
    }

    /**
     * isLevelMatching - Checks if the trigger's level matches the context item's level.
     * If no level is specified in the trigger, it defaults to matching all levels.
     * @param {Object} trigger - The trigger object containing the level.
     * @return {boolean} - True if the trigger's level matches the context item's level, false otherwise.
     */
  }, {
    key: "isLevelMatching",
    value: function isLevelMatching(trigger) {
      var _trigger$level, _this$context;
      if (!trigger.level || (_trigger$level = trigger.level) !== null && _trigger$level !== void 0 && _trigger$level.includes((_this$context = this.context) === null || _this$context === void 0 || (_this$context = _this$context.item) === null || _this$context === void 0 ? void 0 : _this$context.level)) {
        return true;
      }
      return false;
    }

    /**
     * isSampled - Determines if the trigger should be sampled based on its sampling ratio.
     * If no ratio is specified, defaults to 1 (always sampled).
     *
     * Sampling algorithm is based on OTel probability sampling as described in
     * * https://opentelemetry.io/docs/specs/otel/trace/tracestate-probability-sampling/
     * * https://opentelemetry.io/docs/specs/otel/trace/tracestate-handling/
     *
     * Note: String compare is more performant than conversion to float,
     * assuming the `th` calculation will be moved to the trigger configuration.
     * This allows `toString` to be called once, rather than `parseInt` to be called on
     * each replay.
     *
     * @param {Object} trigger - The trigger object containing the sampling ratio.
     * @returns {boolean} - True if the trigger is sampled, false otherwise.
     */
  }, {
    key: "isSampled",
    value: function isSampled(trigger) {
      var ratio = trigger.samplingRatio || this.config.baseSamplingRatio || 1;
      if (ratio == 1) {
        return true;
      }
      var rv = this.context.replayId.slice(-14);
      var th = (this.maxAdjustedCount * (1 - ratio)).toString(16).padStart(14, '0');
      return rv >= th;
    }
  }]);
}();

;// ./src/rollbar.js






/*
 * Rollbar - the interface to Rollbar
 *
 * @param options
 * @param api
 * @param logger
 */
function Rollbar(options, api, logger, telemeter, tracing, replayMap, platform) {
  this.options = src_merge(options);
  this.logger = logger;
  Rollbar.rateLimiter.configureGlobal(this.options);
  Rollbar.rateLimiter.setPlatformOptions(platform, this.options);
  this.api = api;
  this.queue = new queue(Rollbar.rateLimiter, api, logger, this.options, replayMap);
  this.tracing = tracing;

  // Legacy OpenTracing support
  // This must happen before the Notifier is created
  var tracer = this.options.tracer || null;
  if (validateTracer(tracer)) {
    this.tracer = tracer;
    // set to a string for api response serialization
    this.options.tracer = 'opentracing-tracer-enabled';
    this.options._configuredOptions.tracer = 'opentracing-tracer-enabled';
  } else {
    this.tracer = null;
  }
  this.notifier = new notifier(this.queue, this.options);
  this.telemeter = telemeter;
  setStackTraceLimit(options);
  this.lastError = null;
  this.lastErrorHash = 'none';
}
var defaultOptions = {
  maxItems: 0,
  itemsPerMinute: 60
};
Rollbar.rateLimiter = new rateLimiter(defaultOptions);
Rollbar.prototype.global = function (options) {
  Rollbar.rateLimiter.configureGlobal(options);
  return this;
};
Rollbar.prototype.configure = function (options, payloadData) {
  var oldOptions = this.options;
  var payload = {};
  if (payloadData) {
    payload = {
      payload: payloadData
    };
  }
  this.options = src_merge(oldOptions, options, payload);

  // Legacy OpenTracing support
  // This must happen before the Notifier is configured
  var tracer = this.options.tracer || null;
  if (validateTracer(tracer)) {
    this.tracer = tracer;
    // set to a string for api response serialization
    this.options.tracer = 'opentracing-tracer-enabled';
    this.options._configuredOptions.tracer = 'opentracing-tracer-enabled';
  } else {
    this.tracer = null;
  }
  this.notifier && this.notifier.configure(this.options);
  this.telemeter && this.telemeter.configure(this.options);
  setStackTraceLimit(options);
  this.global(this.options);
  if (validateTracer(options.tracer)) {
    this.tracer = options.tracer;
  }
  return this;
};
Rollbar.prototype.log = function (item) {
  var level = this._defaultLogLevel();
  return this._log(level, item);
};
Rollbar.prototype.debug = function (item) {
  this._log('debug', item);
};
Rollbar.prototype.info = function (item) {
  this._log('info', item);
};
Rollbar.prototype.warn = function (item) {
  this._log('warning', item);
};
Rollbar.prototype.warning = function (item) {
  this._log('warning', item);
};
Rollbar.prototype.error = function (item) {
  this._log('error', item);
};
Rollbar.prototype.critical = function (item) {
  this._log('critical', item);
};
Rollbar.prototype.wait = function (callback) {
  this.queue.wait(callback);
};
Rollbar.prototype.captureEvent = function (type, metadata, level) {
  return this.telemeter && this.telemeter.captureEvent(type, metadata, level);
};
Rollbar.prototype.captureDomContentLoaded = function (ts) {
  return this.telemeter && this.telemeter.captureDomContentLoaded(ts);
};
Rollbar.prototype.captureLoad = function (ts) {
  return this.telemeter && this.telemeter.captureLoad(ts);
};
Rollbar.prototype.buildJsonPayload = function (item) {
  return this.api.buildJsonPayload(item);
};
Rollbar.prototype.sendJsonPayload = function (jsonPayload) {
  this.api.postJsonPayload(jsonPayload);
};

/* Internal */

Rollbar.prototype._log = function (defaultLevel, item) {
  var callback;
  if (item.callback) {
    callback = item.callback;
    delete item.callback;
  }
  if (this.options.ignoreDuplicateErrors && this._sameAsLastError(item)) {
    if (callback) {
      var error = new Error('ignored identical item');
      error.item = item;
      callback(error);
    }
    return;
  }
  try {
    item.level = item.level || defaultLevel;
    var replayId = this._replayIdIfTriggered(item);
    this._addTracingAttributes(item, replayId);

    // Legacy OpenTracing support
    this._addTracingInfo(item);
    var telemeter = this.telemeter;
    if (telemeter) {
      telemeter._captureRollbarItem(item);
      item.telemetryEvents = telemeter.copyEvents() || [];
      if (telemeter.telemetrySpan) {
        telemeter.telemetrySpan.end({
          'rollbar.replay.id': replayId
        });
        telemeter.telemetrySpan = telemeter.tracing.startSpan('rollbar-telemetry', {});
      }
    }
    this.notifier.log(item, callback);
  } catch (e) {
    if (callback) {
      callback(e);
    }
    this.logger.error(e);
  }
};
Rollbar.prototype._addTracingAttributes = function (item, replayId) {
  var _this$tracing, _this$tracing2;
  var span = (_this$tracing = this.tracing) === null || _this$tracing === void 0 ? void 0 : _this$tracing.getSpan();
  var attributes = [{
    key: 'replay_id',
    value: replayId
  }, {
    key: 'session_id',
    value: (_this$tracing2 = this.tracing) === null || _this$tracing2 === void 0 ? void 0 : _this$tracing2.sessionId
  }, {
    key: 'span_id',
    value: span === null || span === void 0 ? void 0 : span.spanId
  }, {
    key: 'trace_id',
    value: span === null || span === void 0 ? void 0 : span.traceId
  }];
  addItemAttributes(item.data, attributes);
  span === null || span === void 0 || span.addEvent('rollbar.occurrence', [{
    key: 'rollbar.occurrence.uuid',
    value: item.uuid
  }]);
};
Rollbar.prototype._replayIdIfTriggered = function (item) {
  var _this$tracing3;
  var replayId = (_this$tracing3 = this.tracing) === null || _this$tracing3 === void 0 ? void 0 : _this$tracing3.idGen(8);
  var enabled = new ReplayPredicates(this.options.recorder, {
    item: item,
    replayId: replayId
  }).isEnabledForTriggerType('occurrence');
  if (enabled) {
    return replayId;
  }
};
Rollbar.prototype._defaultLogLevel = function () {
  return this.options.logLevel || 'debug';
};
Rollbar.prototype._sameAsLastError = function (item) {
  if (!item._isUncaught) {
    return false;
  }
  var itemHash = generateItemHash(item);
  if (this.lastErrorHash === itemHash) {
    return true;
  }
  this.lastError = item.err;
  this.lastErrorHash = itemHash;
  return false;
};
Rollbar.prototype._addTracingInfo = function (item) {
  // Tracer validation occurs in the constructor
  // or in the Rollbar.prototype.configure methods
  if (this.tracer) {
    // add rollbar occurrence uuid to span
    var span = this.tracer.scope().active();
    if (validateSpan(span)) {
      span.setTag('rollbar.error_uuid', item.uuid);
      span.setTag('rollbar.has_error', true);
      span.setTag('error', true);
      span.setTag('rollbar.item_url', "https://rollbar.com/item/uuid/?uuid=".concat(item.uuid));
      span.setTag('rollbar.occurrence_url', "https://rollbar.com/occurrence/uuid/?uuid=".concat(item.uuid));

      // add span ID & trace ID to occurrence
      var opentracingSpanId = span.context().toSpanId();
      var opentracingTraceId = span.context().toTraceId();
      if (item.custom) {
        item.custom.opentracing_span_id = opentracingSpanId;
        item.custom.opentracing_trace_id = opentracingTraceId;
      } else {
        item.custom = {
          opentracing_span_id: opentracingSpanId,
          opentracing_trace_id: opentracingTraceId
        };
      }
    }
  }
};
function generateItemHash(item) {
  var message = item.message || '';
  var stack = (item.err || {}).stack || String(item.err);
  return message + '::' + stack;
}

// Node.js, Chrome, Safari, and some other browsers support this property
// which globally sets the number of stack frames returned in an Error object.
// If a browser can't use it, no harm done.
function setStackTraceLimit(options) {
  if (options.stackTraceLimit) {
    Error.stackTraceLimit = options.stackTraceLimit;
  }
}

/**
 * Validate the Tracer object provided to the Client
 * is valid for our Opentracing use case.
 * @param {opentracer.Tracer} tracer
 */
function validateTracer(tracer) {
  if (!tracer) {
    return false;
  }
  if (!tracer.scope || typeof tracer.scope !== 'function') {
    return false;
  }
  var scope = tracer.scope();
  if (!scope || !scope.active || typeof scope.active !== 'function') {
    return false;
  }
  return true;
}

/**
 * Validate the Span object provided
 * @param {opentracer.Span} span
 */
function validateSpan(span) {
  if (!span || !span.context || typeof span.context !== 'function') {
    return false;
  }
  var spanContext = span.context();
  if (!spanContext || !spanContext.toSpanId || !spanContext.toTraceId || typeof spanContext.toSpanId !== 'function' || typeof spanContext.toTraceId !== 'function') {
    return false;
  }
  return true;
}
/* harmony default export */ var rollbar = (Rollbar);
;// ./src/apiUtility.js

function buildPayload(data) {
  if (!isType(data.context, 'string')) {
    var contextResult = stringify(data.context);
    if (contextResult.error) {
      data.context = "Error: could not serialize 'context'";
    } else {
      data.context = contextResult.value || '';
    }
    if (data.context.length > 255) {
      data.context = data.context.substr(0, 255);
    }
  }
  return {
    data: data
  };
}
function getTransportFromOptions(options, defaults, url) {
  var hostname = defaults.hostname;
  var protocol = defaults.protocol;
  var port = defaults.port;
  var path = defaults.path;
  var search = defaults.search;
  var timeout = options.timeout;
  var transport = detectTransport(options);
  var proxy = options.proxy;
  if (options.endpoint) {
    var opts = url.parse(options.endpoint);
    hostname = opts.hostname;
    protocol = opts.protocol;
    port = opts.port;
    path = opts.pathname;
    search = opts.search;
  }
  return {
    timeout: timeout,
    hostname: hostname,
    protocol: protocol,
    port: port,
    path: path,
    search: search,
    proxy: proxy,
    transport: transport
  };
}
function detectTransport(options) {
  var gWindow = typeof window != 'undefined' && window || typeof self != 'undefined' && self;
  var transport = options.defaultTransport || 'xhr';
  if (typeof gWindow.fetch === 'undefined') transport = 'xhr';
  if (typeof gWindow.XMLHttpRequest === 'undefined') transport = 'fetch';
  return transport;
}
function apiUtility_transportOptions(transport, method) {
  var protocol = transport.protocol || 'https:';
  var port = transport.port || (protocol === 'http:' ? 80 : protocol === 'https:' ? 443 : undefined);
  var hostname = transport.hostname;
  var path = transport.path;
  var timeout = transport.timeout;
  var transportAPI = transport.transport;
  if (transport.search) {
    path = path + transport.search;
  }
  if (transport.proxy) {
    path = protocol + '//' + hostname + path;
    hostname = transport.proxy.host || transport.proxy.hostname;
    port = transport.proxy.port;
    protocol = transport.proxy.protocol || protocol;
  }
  return {
    timeout: timeout,
    protocol: protocol,
    hostname: hostname,
    path: path,
    port: port,
    method: method,
    transport: transportAPI
  };
}
function appendPathToPath(base, path) {
  var baseTrailingSlash = /\/$/.test(base);
  var pathBeginningSlash = /^\//.test(path);
  if (baseTrailingSlash && pathBeginningSlash) {
    path = path.substring(1);
  } else if (!baseTrailingSlash && !pathBeginningSlash) {
    path = '/' + path;
  }
  return base + path;
}

;// ./src/api.js
function api_typeof(o) { "@babel/helpers - typeof"; return api_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, api_typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { api_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function api_defineProperty(e, r, t) { return (r = api_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function api_toPropertyKey(t) { var i = api_toPrimitive(t, "string"); return "symbol" == api_typeof(i) ? i : i + ""; }
function api_toPrimitive(t, r) { if ("object" != api_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != api_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function api_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ api_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == api_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(api_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function api_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function api_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { api_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { api_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


var api_defaultOptions = {
  hostname: 'api.rollbar.com',
  path: '/api/1/item/',
  search: null,
  version: '1',
  protocol: 'https:',
  port: 443
};
var OTLPDefaultOptions = {
  hostname: 'api.rollbar.com',
  path: '/api/1/session/',
  search: null,
  version: '1',
  protocol: 'https:',
  port: 443
};

/**
 * Api is an object that encapsulates methods of communicating with
 * the Rollbar API.  It is a standard interface with some parts implemented
 * differently for server or browser contexts.  It is an object that should
 * be instantiated when used so it can contain non-global options that may
 * be different for another instance of RollbarApi.
 *
 * @param options {
 *    accessToken: the accessToken to use for posting items to rollbar
 *    endpoint: an alternative endpoint to send errors to
 *        must be a valid, fully qualified URL.
 *        The default is: https://api.rollbar.com/api/1/item
 *    proxy: if you wish to proxy requests provide an object
 *        with the following keys:
 *          host or hostname (required): foo.example.com
 *          port (optional): 123
 *          protocol (optional): https
 * }
 */
function Api(options, transport, urllib, truncation) {
  this.options = options;
  this.transport = transport;
  this.url = urllib;
  this.truncation = truncation;
  this.accessToken = options.accessToken;
  this.transportOptions = _getTransport(options, urllib);
  this.OTLPTransportOptions = _getOTLPTransport(options, urllib);
}

/**
 * Wraps transport.post in a Promise to support async/await
 *
 * @param {Object} options - Options for the API request
 * @param {string} options.accessToken - The access token for authentication
 * @param {Object} options.transportOptions - Options for the transport
 * @param {Object} options.payload - The data payload to send
 * @returns {Promise} A promise that resolves with the response or rejects with an error
 * @private
 */
Api.prototype._postPromise = function (_ref) {
  var accessToken = _ref.accessToken,
    transportOptions = _ref.transportOptions,
    payload = _ref.payload;
  var self = this;
  return new Promise(function (resolve, reject) {
    self.transport.post(accessToken, transportOptions, payload, function (err, resp) {
      return err ? reject(err) : resolve(resp);
    });
  });
};

/**
 *
 * @param data
 * @param callback
 */
Api.prototype.postItem = function (data, callback) {
  var transportOptions = apiUtility_transportOptions(this.transportOptions, 'POST');
  var payload = buildPayload(data);
  var self = this;

  // ensure the network request is scheduled after the current tick.
  setTimeout(function () {
    self.transport.post(self.accessToken, transportOptions, payload, callback);
  }, 0);
};

/**
 * Posts spans to the Rollbar API using the session endpoint
 *
 * @param {Array} payload - The spans to send
 * @returns {Promise<Object>} A promise that resolves with the API response
 */
Api.prototype.postSpans = /*#__PURE__*/function () {
  var _ref2 = api_asyncToGenerator(/*#__PURE__*/api_regeneratorRuntime().mark(function _callee(payload) {
    var transportOptions;
    return api_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          transportOptions = apiUtility_transportOptions(this.OTLPTransportOptions, 'POST');
          _context.next = 3;
          return this._postPromise({
            accessToken: this.accessToken,
            transportOptions: transportOptions,
            payload: payload
          });
        case 3:
          return _context.abrupt("return", _context.sent);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 *
 * @param data
 * @param callback
 */
Api.prototype.buildJsonPayload = function (data, callback) {
  var payload = buildPayload(data);
  var stringifyResult;
  if (this.truncation) {
    stringifyResult = this.truncation.truncate(payload);
  } else {
    stringifyResult = stringify(payload);
  }
  if (stringifyResult.error) {
    if (callback) {
      callback(stringifyResult.error);
    }
    return null;
  }
  return stringifyResult.value;
};

/**
 *
 * @param jsonPayload
 * @param callback
 */
Api.prototype.postJsonPayload = function (jsonPayload, callback) {
  var transportOptions = apiUtility_transportOptions(this.transportOptions, 'POST');
  this.transport.postJsonPayload(this.accessToken, transportOptions, jsonPayload, callback);
};
Api.prototype.configure = function (options) {
  var oldOptions = this.oldOptions;
  this.options = src_merge(oldOptions, options);
  this.transportOptions = _getTransport(this.options, this.url);
  this.OTLPTransportOptions = _getOTLPTransport(this.options, this.url);
  if (this.options.accessToken !== undefined) {
    this.accessToken = this.options.accessToken;
  }
  return this;
};
function _getTransport(options, url) {
  return getTransportFromOptions(options, api_defaultOptions, url);
}
function _getOTLPTransport(options, url) {
  var _options$tracing;
  options = _objectSpread(_objectSpread({}, options), {}, {
    endpoint: (_options$tracing = options.tracing) === null || _options$tracing === void 0 ? void 0 : _options$tracing.endpoint
  });
  return getTransportFromOptions(options, OTLPDefaultOptions, url);
}
/* harmony default export */ var src_api = (Api);
// EXTERNAL MODULE: ./node_modules/console-polyfill/index.js
var console_polyfill = __webpack_require__(738);
;// ./src/browser/detection.js
// This detection.js module is used to encapsulate any ugly browser/feature
// detection we may need to do.

// Figure out which version of IE we're using, if any.
// This is gleaned from http://stackoverflow.com/questions/5574842/best-way-to-check-for-ie-less-than-9-in-javascript-without-library
// Will return an integer on IE (i.e. 8)
// Will return undefined otherwise
function getIEVersion() {
  var undef;
  if (typeof document === 'undefined') {
    return undef;
  }
  var v = 3,
    div = document.createElement('div'),
    all = div.getElementsByTagName('i');
  while (div.innerHTML = '<!--[if gt IE ' + ++v + ']><i></i><![endif]-->', all[0]);
  return v > 4 ? v : undef;
}
var Detection = {
  ieVersion: getIEVersion
};
/* harmony default export */ var detection = (Detection);
;// ./src/browser/logger.js



function error() {
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift('Rollbar:');
  if (detection.ieVersion() <= 8) {
    console.error(formatArgsAsString(args));
  } else {
    console.error.apply(console, args);
  }
}
function info() {
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift('Rollbar:');
  if (detection.ieVersion() <= 8) {
    console.info(formatArgsAsString(args));
  } else {
    console.info.apply(console, args);
  }
}
function log() {
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift('Rollbar:');
  if (detection.ieVersion() <= 8) {
    console.log(formatArgsAsString(args));
  } else {
    console.log.apply(console, args);
  }
}
/* harmony default export */ var logger = ({
  error: error,
  info: info,
  log: log
});
;// ./src/browser/globalSetup.js
function captureUncaughtExceptions(window, handler, shim) {
  if (!window) {
    return;
  }
  var oldOnError;
  if (typeof handler._rollbarOldOnError === 'function') {
    oldOnError = handler._rollbarOldOnError;
  } else if (window.onerror) {
    oldOnError = window.onerror;
    while (oldOnError._rollbarOldOnError) {
      oldOnError = oldOnError._rollbarOldOnError;
    }
    handler._rollbarOldOnError = oldOnError;
  }
  handler.handleAnonymousErrors();
  var fn = function fn() {
    var args = Array.prototype.slice.call(arguments, 0);
    _rollbarWindowOnError(window, handler, oldOnError, args);
  };
  if (shim) {
    fn._rollbarOldOnError = oldOnError;
  }
  window.onerror = fn;
}
function _rollbarWindowOnError(window, r, old, args) {
  if (window._rollbarWrappedError) {
    if (!args[4]) {
      args[4] = window._rollbarWrappedError;
    }
    if (!args[5]) {
      args[5] = window._rollbarWrappedError._rollbarContext;
    }
    window._rollbarWrappedError = null;
  }
  var ret = r.handleUncaughtException.apply(r, args);
  if (old) {
    old.apply(window, args);
  }

  // Let other chained onerror handlers above run before setting this.
  // If an error is thrown and caught within a chained onerror handler,
  // Error.prepareStackTrace() will see that one before the one we want.
  if (ret === 'anonymous') {
    r.anonymousErrorsPending += 1; // See Rollbar.prototype.handleAnonymousErrors()
  }
}
function captureUnhandledRejections(window, handler, shim) {
  if (!window) {
    return;
  }
  if (typeof window._rollbarURH === 'function' && window._rollbarURH.belongsToShim) {
    window.removeEventListener('unhandledrejection', window._rollbarURH);
  }
  var rejectionHandler = function rejectionHandler(evt) {
    var reason, promise, detail;
    try {
      reason = evt.reason;
    } catch (e) {
      reason = undefined;
    }
    try {
      promise = evt.promise;
    } catch (e) {
      promise = '[unhandledrejection] error getting `promise` from event';
    }
    try {
      detail = evt.detail;
      if (!reason && detail) {
        reason = detail.reason;
        promise = detail.promise;
      }
    } catch (e) {
      // Ignore
    }
    if (!reason) {
      reason = '[unhandledrejection] error getting `reason` from event';
    }
    if (handler && handler.handleUnhandledRejection) {
      handler.handleUnhandledRejection(reason, promise);
    }
  };
  rejectionHandler.belongsToShim = shim;
  window._rollbarURH = rejectionHandler;
  window.addEventListener('unhandledrejection', rejectionHandler);
}

;// ./src/browser/transport/fetch.js


function makeFetchRequest(accessToken, url, method, data, callback, timeout) {
  var controller;
  var timeoutId;
  if (isFiniteNumber(timeout)) {
    controller = new AbortController();
    timeoutId = setTimeout(function () {
      controller.abort();
    }, timeout);
  }
  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'X-Rollbar-Access-Token': accessToken,
      signal: controller && controller.signal
    },
    body: data
  }).then(function (response) {
    if (timeoutId) clearTimeout(timeoutId);
    var respHeaders = response.headers;
    var isItemRoute = url.endsWith('/api/1/item/');
    var headers = isItemRoute ? {
      'Rollbar-Replay-Enabled': respHeaders.get('Rollbar-Replay-Enabled'),
      'Rollbar-Replay-RateLimit-Remaining': respHeaders.get('Rollbar-Replay-RateLimit-Remaining'),
      'Rollbar-Replay-RateLimit-Reset': respHeaders.get('Rollbar-Replay-RateLimit-Reset')
    } : {};
    var json = response.json();
    callback(null, json, headers);
  }).catch(function (error) {
    logger.error(error.message);
    callback(error);
  });
}
/* harmony default export */ var transport_fetch = (makeFetchRequest);
;// ./src/browser/transport/xhr.js
/*global XDomainRequest*/



function makeXhrRequest(accessToken, url, method, data, callback, requestFactory, timeout) {
  var request;
  if (requestFactory) {
    request = requestFactory();
  } else {
    request = _createXMLHTTPObject();
  }
  if (!request) {
    // Give up, no way to send requests
    return callback(new Error('No way to send a request'));
  }
  try {
    try {
      var _onreadystatechange = function onreadystatechange() {
        try {
          if (_onreadystatechange && request.readyState === 4) {
            _onreadystatechange = undefined;
            var parseResponse = jsonParse(request.responseText);
            if (_isSuccess(request)) {
              var isItemRoute = url.endsWith('/api/1/item/');
              var headers = isItemRoute ? {
                'Rollbar-Replay-Enabled': request.getResponseHeader('Rollbar-Replay-Enabled'),
                'Rollbar-Replay-RateLimit-Remaining': request.getResponseHeader('Rollbar-Replay-RateLimit-Remaining'),
                'Rollbar-Replay-RateLimit-Reset': request.getResponseHeader('Rollbar-Replay-RateLimit-Reset')
              } : {};
              callback(parseResponse.error, parseResponse.value, headers);
              return;
            } else if (_isNormalFailure(request)) {
              if (request.status === 403) {
                // likely caused by using a server access token
                var message = parseResponse.value && parseResponse.value.message;
                logger.error(message);
              }
              // return valid http status codes
              callback(new Error(String(request.status)));
            } else {
              // IE will return a status 12000+ on some sort of connection failure,
              // so we return a blank error
              // http://msdn.microsoft.com/en-us/library/aa383770%28VS.85%29.aspx
              var msg = 'XHR response had no status code (likely connection failure)';
              callback(_newRetriableError(msg));
            }
          }
        } catch (ex) {
          //jquery source mentions firefox may error out while accessing the
          //request members if there is a network error
          //https://github.com/jquery/jquery/blob/a938d7b1282fc0e5c52502c225ae8f0cef219f0a/src/ajax/xhr.js#L111
          var exc;
          if (ex && ex.stack) {
            exc = ex;
          } else {
            exc = new Error(ex);
          }
          callback(exc);
        }
      };
      request.open(method, url, true);
      if (request.setRequestHeader) {
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('X-Rollbar-Access-Token', accessToken);
      }
      if (isFiniteNumber(timeout)) {
        request.timeout = timeout;
      }
      request.onreadystatechange = _onreadystatechange;
      request.send(data);
    } catch (e1) {
      // Sending using the normal xmlhttprequest object didn't work, try XDomainRequest
      if (typeof XDomainRequest !== 'undefined') {
        // Assume we are in a really old browser which has a bunch of limitations:
        // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx

        // Extreme paranoia: if we have XDomainRequest then we have a window, but just in case
        if (!window || !window.location) {
          return callback(new Error('No window available during request, unknown environment'));
        }

        // If the current page is http, try and send over http
        if (window.location.href.substring(0, 5) === 'http:' && url.substring(0, 5) === 'https') {
          url = 'http' + url.substring(5);
        }
        var xdomainrequest = new XDomainRequest();
        xdomainrequest.onprogress = function () {};
        xdomainrequest.ontimeout = function () {
          var msg = 'Request timed out';
          var code = 'ETIMEDOUT';
          callback(_newRetriableError(msg, code));
        };
        xdomainrequest.onerror = function () {
          callback(new Error('Error during request'));
        };
        xdomainrequest.onload = function () {
          var parseResponse = jsonParse(xdomainrequest.responseText);
          callback(parseResponse.error, parseResponse.value);
        };
        xdomainrequest.open(method, url, true);
        xdomainrequest.send(data);
      } else {
        callback(new Error('Cannot find a method to transport a request'));
      }
    }
  } catch (e2) {
    callback(e2);
  }
}
function _createXMLHTTPObject() {
  /* global ActiveXObject:false */

  var factories = [function () {
    return new XMLHttpRequest();
  }, function () {
    return new ActiveXObject('Msxml2.XMLHTTP');
  }, function () {
    return new ActiveXObject('Msxml3.XMLHTTP');
  }, function () {
    return new ActiveXObject('Microsoft.XMLHTTP');
  }];
  var xmlhttp;
  var i;
  var numFactories = factories.length;
  for (i = 0; i < numFactories; i++) {
    /* eslint-disable no-empty */
    try {
      xmlhttp = factories[i]();
      break;
    } catch (e) {
      // pass
    }
    /* eslint-enable no-empty */
  }
  return xmlhttp;
}
function _isSuccess(r) {
  return r && r.status && r.status === 200;
}
function _isNormalFailure(r) {
  return r && isType(r.status, 'number') && r.status >= 400 && r.status < 600;
}
function _newRetriableError(message, code) {
  var err = new Error(message);
  err.code = code || 'ENOTFOUND';
  return err;
}
/* harmony default export */ var xhr = (makeXhrRequest);
;// ./src/browser/transport.js




/*
 * accessToken may be embedded in payload but that should not
 *   be assumed
 *
 * options: {
 *   hostname
 *   protocol
 *   path
 *   port
 *   method
 *   transport ('xhr' | 'fetch')
 * }
 *
 *  params is an object containing key/value pairs. These
 *    will be appended to the path as 'key=value&key=value'
 *
 * payload is an unserialized object
 */
function Transport(truncation) {
  this.truncation = truncation;
}
Transport.prototype.get = function (accessToken, options, params, callback, requestFactory) {
  if (!callback || !isFunction(callback)) {
    callback = function callback() {};
  }
  addParamsAndAccessTokenToPath(accessToken, options, params);
  var method = 'GET';
  var url = formatUrl(options);
  this._makeZoneRequest(accessToken, url, method, null, callback, requestFactory, options.timeout, options.transport);
};
Transport.prototype.post = function (accessToken, options, payload, callback, requestFactory) {
  if (!callback || !isFunction(callback)) {
    callback = function callback() {};
  }
  if (!payload) {
    return callback(new Error('Cannot send empty request'));
  }
  var stringifyResult;
  // Check payload.body to ensure only items are truncated.
  if (this.truncation && payload.body) {
    stringifyResult = this.truncation.truncate(payload);
  } else {
    stringifyResult = stringify(payload);
  }
  if (stringifyResult.error) {
    return callback(stringifyResult.error);
  }
  var writeData = stringifyResult.value;
  var method = 'POST';
  var url = formatUrl(options);
  this._makeZoneRequest(accessToken, url, method, writeData, callback, requestFactory, options.timeout, options.transport);
};
Transport.prototype.postJsonPayload = function (accessToken, options, jsonPayload, callback, requestFactory) {
  if (!callback || !isFunction(callback)) {
    callback = function callback() {};
  }
  var method = 'POST';
  var url = formatUrl(options);
  this._makeZoneRequest(accessToken, url, method, jsonPayload, callback, requestFactory, options.timeout, options.transport);
};

// Wraps `_makeRequest` if zone.js is being used, ensuring that Rollbar
// API calls are not intercepted by any child forked zones.
// This is equivalent to `NgZone.runOutsideAngular` in Angular.
Transport.prototype._makeZoneRequest = function () {
  var gWindow = typeof window != 'undefined' && window || typeof self != 'undefined' && self;
  // Whenever zone.js is loaded and `Zone` is exposed globally, access
  // the root zone to ensure that requests are always made within it.
  // This approach is framework-agnostic, regardless of which
  // framework zone.js is used with.
  var rootZone = gWindow && gWindow.Zone && gWindow.Zone.root;
  var args = Array.prototype.slice.call(arguments);
  if (rootZone) {
    var self = this;
    rootZone.run(function () {
      self._makeRequest.apply(undefined, args);
    });
  } else {
    this._makeRequest.apply(undefined, args);
  }
};
Transport.prototype._makeRequest = function (accessToken, url, method, data, callback, requestFactory, timeout, transport) {
  if (typeof RollbarProxy !== 'undefined') {
    return _proxyRequest(data, callback);
  }
  if (transport === 'fetch') {
    transport_fetch(accessToken, url, method, data, callback, timeout);
  } else {
    xhr(accessToken, url, method, data, callback, requestFactory, timeout);
  }
};

/* global RollbarProxy */
function _proxyRequest(json, callback) {
  var rollbarProxy = new RollbarProxy();
  rollbarProxy.sendJsonPayload(json, function (_msg) {
    /* do nothing */
  },
  // eslint-disable-line no-unused-vars
  function (err) {
    callback(new Error(err));
  });
}
/* harmony default export */ var browser_transport = (Transport);
;// ./src/browser/url.js
// See https://nodejs.org/docs/latest/api/url.html
function parse(url) {
  var result = {
    protocol: null,
    auth: null,
    host: null,
    path: null,
    hash: null,
    href: url,
    hostname: null,
    port: null,
    pathname: null,
    search: null,
    query: null
  };
  var i, last;
  i = url.indexOf('//');
  if (i !== -1) {
    result.protocol = url.substring(0, i);
    last = i + 2;
  } else {
    last = 0;
  }
  i = url.indexOf('@', last);
  if (i !== -1) {
    result.auth = url.substring(last, i);
    last = i + 1;
  }
  i = url.indexOf('/', last);
  if (i === -1) {
    i = url.indexOf('?', last);
    if (i === -1) {
      i = url.indexOf('#', last);
      if (i === -1) {
        result.host = url.substring(last);
      } else {
        result.host = url.substring(last, i);
        result.hash = url.substring(i);
      }
      result.hostname = result.host.split(':')[0];
      result.port = result.host.split(':')[1];
      if (result.port) {
        result.port = parseInt(result.port, 10);
      }
      return result;
    } else {
      result.host = url.substring(last, i);
      result.hostname = result.host.split(':')[0];
      result.port = result.host.split(':')[1];
      if (result.port) {
        result.port = parseInt(result.port, 10);
      }
      last = i;
    }
  } else {
    result.host = url.substring(last, i);
    result.hostname = result.host.split(':')[0];
    result.port = result.host.split(':')[1];
    if (result.port) {
      result.port = parseInt(result.port, 10);
    }
    last = i;
  }
  i = url.indexOf('#', last);
  if (i === -1) {
    result.path = url.substring(last);
  } else {
    result.path = url.substring(last, i);
    result.hash = url.substring(i);
  }
  if (result.path) {
    var pathParts = result.path.split('?');
    result.pathname = pathParts[0];
    result.query = pathParts[1];
    result.search = result.query ? '?' + result.query : null;
  }
  return result;
}

;// ./node_modules/error-stack-parser-es/dist/lite.mjs
var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;
function lite_parse(error, options) {
  if (typeof error.stacktrace !== "undefined" || typeof error["opera#sourceloc"] !== "undefined") return parseOpera(error, options);else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) return parseV8OrIE(error, options);else if (error.stack) return parseFFOrSafari(error, options);else if (options !== null && options !== void 0 && options.allowEmpty) return [];else throw new Error("Cannot parse given Error object");
}
function parseStack(stackString, options) {
  if (stackString.match(CHROME_IE_STACK_REGEXP)) return parseV8OrIeString(stackString, options);else return parseFFOrSafariString(stackString, options);
}
function extractLocation(urlLike) {
  if (!urlLike.includes(":")) return [urlLike, undefined, undefined];
  var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
  var parts = regExp.exec(urlLike.replace(/[()]/g, ""));
  return [parts[1], parts[2] || undefined, parts[3] || undefined];
}
function applySlice(lines, options) {
  if (options && options.slice != null) {
    if (Array.isArray(options.slice)) return lines.slice(options.slice[0], options.slice[1]);
    return lines.slice(0, options.slice);
  }
  return lines;
}
function parseV8OrIE(error, options) {
  return parseV8OrIeString(error.stack, options);
}
function parseV8OrIeString(stack, options) {
  var filtered = applySlice(stack.split("\n").filter(function (line) {
    return !!line.match(CHROME_IE_STACK_REGEXP);
  }), options);
  return filtered.map(function (line) {
    if (line.includes("(eval ")) {
      line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, "");
    }
    var sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, "");
    var location = sanitizedLine.match(/ (\(.+\)$)/);
    sanitizedLine = location ? sanitizedLine.replace(location[0], "") : sanitizedLine;
    var locationParts = extractLocation(location ? location[1] : sanitizedLine);
    var functionName = location && sanitizedLine || undefined;
    var fileName = ["eval", "<anonymous>"].includes(locationParts[0]) ? undefined : locationParts[0];
    return {
      function: functionName,
      file: fileName,
      line: locationParts[1] ? +locationParts[1] : undefined,
      col: locationParts[2] ? +locationParts[2] : undefined,
      raw: line
    };
  });
}
function parseFFOrSafari(error, options) {
  return parseFFOrSafariString(error.stack, options);
}
function parseFFOrSafariString(stack, options) {
  var filtered = applySlice(stack.split("\n").filter(function (line) {
    return !line.match(SAFARI_NATIVE_CODE_REGEXP);
  }), options);
  return filtered.map(function (line) {
    if (line.includes(" > eval")) line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1");
    if (!line.includes("@") && !line.includes(":")) {
      return {
        function: line
      };
    } else {
      var functionNameRegex = /(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/;
      var matches = line.match(functionNameRegex);
      var functionName = matches && matches[1] ? matches[1] : undefined;
      var locationParts = extractLocation(line.replace(functionNameRegex, ""));
      return {
        function: functionName,
        file: locationParts[0],
        line: locationParts[1] ? +locationParts[1] : undefined,
        col: locationParts[2] ? +locationParts[2] : undefined,
        raw: line
      };
    }
  });
}
function parseOpera(e, options) {
  if (!e.stacktrace || e.message.includes("\n") && e.message.split("\n").length > e.stacktrace.split("\n").length) return parseOpera9(e);else if (!e.stack) return parseOpera10(e);else return parseOpera11(e, options);
}
function parseOpera9(e, options) {
  var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
  var lines = e.message.split("\n");
  var result = [];
  for (var i = 2, len = lines.length; i < len; i += 2) {
    var match = lineRE.exec(lines[i]);
    if (match) {
      result.push({
        file: match[2],
        line: +match[1],
        raw: lines[i]
      });
    }
  }
  return applySlice(result, options);
}
function parseOpera10(e, options) {
  var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
  var lines = e.stacktrace.split("\n");
  var result = [];
  for (var i = 0, len = lines.length; i < len; i += 2) {
    var match = lineRE.exec(lines[i]);
    if (match) {
      result.push({
        function: match[3] || undefined,
        file: match[2],
        line: match[1] ? +match[1] : undefined,
        raw: lines[i]
      });
    }
  }
  return applySlice(result, options);
}
function parseOpera11(error, options) {
  var filtered = applySlice(
  // @ts-expect-error missing stack property
  error.stack.split("\n").filter(function (line) {
    return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
  }), options);
  return filtered.map(function (line) {
    var tokens = line.split("@");
    var locationParts = extractLocation(tokens.pop());
    var functionCall = tokens.shift() || "";
    var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || undefined;
    var argsRaw;
    if (functionCall.match(/\(([^)]*)\)/)) argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, "$1");
    var args = argsRaw === undefined || argsRaw === "[arguments not available]" ? undefined : argsRaw.split(",");
    return {
      function: functionName,
      args: args,
      file: locationParts[0],
      line: locationParts[1] ? +locationParts[1] : undefined,
      col: locationParts[2] ? +locationParts[2] : undefined,
      raw: line
    };
  });
}

;// ./node_modules/error-stack-parser-es/dist/index.mjs


function stackframesLiteToStackframes(liteStackframes) {
  return liteStackframes.map(function (liteStackframe) {
    return {
      functionName: liteStackframe.function,
      args: liteStackframe.args,
      fileName: liteStackframe.file,
      lineNumber: liteStackframe.line,
      columnNumber: liteStackframe.col,
      source: liteStackframe.raw
    };
  });
}
function dist_parse(error, options) {
  return stackframesLiteToStackframes(lite_parse(error, options));
}
function dist_parseV8OrIE(error) {
  return stackframesLiteToStackframes(parseV8OrIE$1(error));
}
function dist_parseFFOrSafari(error) {
  return stackframesLiteToStackframes(parseFFOrSafari$1(error));
}
function dist_parseOpera(e) {
  return stackframesLiteToStackframes(parseOpera$1(e));
}
function dist_parseOpera9(e) {
  return stackframesLiteToStackframes(parseOpera9$1(e));
}
function dist_parseOpera10(e) {
  return stackframesLiteToStackframes(parseOpera10$1(e));
}
function dist_parseOpera11(error) {
  return stackframesLiteToStackframes(parseOpera11$1(error));
}

;// ./src/errorParser.js

var UNKNOWN_FUNCTION = '?';
var ERR_CLASS_REGEXP = new RegExp('^(([a-zA-Z0-9-_$ ]*): *)?(Uncaught )?([a-zA-Z0-9-_$ ]*): ');
function guessFunctionName() {
  return UNKNOWN_FUNCTION;
}
function gatherContext() {
  return null;
}
function Frame(stackFrame) {
  var data = {};
  data._stackFrame = stackFrame;
  data.url = stackFrame.fileName;
  data.line = stackFrame.lineNumber;
  data.func = stackFrame.functionName;
  data.column = stackFrame.columnNumber;
  data.args = stackFrame.args;
  data.context = gatherContext();
  return data;
}
function Stack(exception, skip) {
  function getStack() {
    var parserStack = [];
    skip = skip || 0;
    try {
      parserStack = dist_parse(exception);
    } catch (e) {
      parserStack = [];
    }
    var stack = [];
    for (var i = skip; i < parserStack.length; i++) {
      stack.push(new Frame(parserStack[i]));
    }
    return stack;
  }
  return {
    stack: getStack(),
    message: exception.message,
    name: _mostSpecificErrorName(exception),
    rawStack: exception.stack,
    rawException: exception
  };
}
function errorParser_parse(e, skip) {
  var err = e;
  if (err.nested || err.cause) {
    var traceChain = [];
    while (err) {
      traceChain.push(new Stack(err, skip));
      err = err.nested || err.cause;
      skip = 0; // Only apply skip value to primary error
    }

    // Return primary error with full trace chain attached.
    traceChain[0].traceChain = traceChain;
    return traceChain[0];
  } else {
    return new Stack(err, skip);
  }
}
function guessErrorClass(errMsg) {
  if (!errMsg || !errMsg.match) {
    return ['Unknown error. There was no error message to display.', ''];
  }
  var errClassMatch = errMsg.match(ERR_CLASS_REGEXP);
  var errClass = '(unknown)';
  if (errClassMatch) {
    errClass = errClassMatch[errClassMatch.length - 1];
    errMsg = errMsg.replace((errClassMatch[errClassMatch.length - 2] || '') + errClass + ':', '');
    errMsg = errMsg.replace(/(^[\s]+|[\s]+$)/g, '');
  }
  return [errClass, errMsg];
}

// * Prefers any value over an empty string
// * Prefers any value over 'Error' where possible
// * Prefers name over constructor.name when both are more specific than 'Error'
function _mostSpecificErrorName(error) {
  var name = error.name && error.name.length && error.name;
  var constructorName = error.constructor.name && error.constructor.name.length && error.constructor.name;
  if (!name || !constructorName) {
    return name || constructorName;
  }
  if (name === 'Error') {
    return constructorName;
  }
  return name;
}
/* harmony default export */ var errorParser = ({
  guessFunctionName: guessFunctionName,
  guessErrorClass: guessErrorClass,
  gatherContext: gatherContext,
  parse: errorParser_parse,
  Stack: Stack,
  Frame: Frame
});
;// ./src/browser/transforms.js



function handleDomException(item, options, callback) {
  if (item.err && errorParser.Stack(item.err).name === 'DOMException') {
    var originalError = new Error();
    originalError.name = item.err.name;
    originalError.message = item.err.message;
    originalError.stack = item.err.stack;
    originalError.nested = item.err;
    item.err = originalError;
  }
  callback(null, item);
}
function handleItemWithError(item, options, callback) {
  item.data = item.data || {};
  if (item.err) {
    try {
      item.stackInfo = item.err._savedStackTrace || errorParser.parse(item.err, item.skipFrames);
      if (options.addErrorContext) {
        transforms_addErrorContext(item);
      }
    } catch (e) {
      logger.error('Error while parsing the error object.', e);
      try {
        item.message = item.err.message || item.err.description || item.message || String(item.err);
      } catch (e2) {
        item.message = String(item.err) || String(e2);
      }
      delete item.err;
    }
  }
  callback(null, item);
}
function transforms_addErrorContext(item) {
  var chain = [];
  var err = item.err;
  chain.push(err);
  while (err.nested || err.cause) {
    err = err.nested || err.cause;
    chain.push(err);
  }
  addErrorContext(item, chain);
}
function ensureItemHasSomethingToSay(item, options, callback) {
  if (!item.message && !item.stackInfo && !item.custom) {
    callback(new Error('No message, stack info, or custom data'), null);
  }
  callback(null, item);
}
function addBaseInfo(item, options, callback) {
  var environment = options.payload && options.payload.environment || options.environment;
  item.data = src_merge(item.data, {
    environment: environment,
    level: item.level,
    endpoint: options.endpoint,
    platform: 'browser',
    framework: 'browser-js',
    language: 'javascript',
    server: {},
    uuid: item.uuid,
    notifier: {
      name: 'rollbar-browser-js',
      version: options.version
    },
    custom: item.custom
  });
  callback(null, item);
}
function addRequestInfo(window) {
  return function (item, options, callback) {
    var requestInfo = {};
    if (window && window.location) {
      requestInfo.url = window.location.href;
      requestInfo.query_string = window.location.search;
    }
    var remoteString = '$remote_ip';
    if (!options.captureIp) {
      remoteString = null;
    } else if (options.captureIp !== true) {
      remoteString += '_anonymize';
    }
    if (remoteString) requestInfo.user_ip = remoteString;
    if (Object.keys(requestInfo).length > 0) {
      set(item, 'data.request', requestInfo);
    }
    callback(null, item);
  };
}
function addClientInfo(window) {
  return function (item, options, callback) {
    if (!window) {
      return callback(null, item);
    }
    var nav = window.navigator || {};
    var scr = window.screen || {};
    set(item, 'data.client', {
      runtime_ms: item.timestamp - window._rollbarStartTime,
      timestamp: Math.round(item.timestamp / 1000),
      javascript: {
        browser: nav.userAgent,
        language: nav.language,
        cookie_enabled: nav.cookieEnabled,
        screen: {
          width: scr.width,
          height: scr.height
        }
      }
    });
    callback(null, item);
  };
}
function addPluginInfo(window) {
  return function (item, options, callback) {
    if (!window || !window.navigator) {
      return callback(null, item);
    }
    var plugins = [];
    var navPlugins = window.navigator.plugins || [];
    var cur;
    for (var i = 0, l = navPlugins.length; i < l; ++i) {
      cur = navPlugins[i];
      plugins.push({
        name: cur.name,
        description: cur.description
      });
    }
    set(item, 'data.client.javascript.plugins', plugins);
    callback(null, item);
  };
}
function addBody(item, options, callback) {
  if (item.stackInfo) {
    if (item.stackInfo.traceChain) {
      addBodyTraceChain(item, options, callback);
    } else {
      addBodyTrace(item, options, callback);
    }
  } else {
    addBodyMessage(item, options, callback);
  }
}
function addBodyMessage(item, options, callback) {
  var message = item.message;
  var custom = item.custom;
  if (!message) {
    message = 'Item sent with null or missing arguments.';
  }
  var result = {
    body: message
  };
  if (custom) {
    result.extra = src_merge(custom);
  }
  set(item, 'data.body', {
    message: result
  });
  callback(null, item);
}
function stackFromItem(item) {
  // Transform a TraceKit stackInfo object into a Rollbar trace
  var stack = item.stackInfo.stack;
  if (stack && stack.length === 0 && item._unhandledStackInfo && item._unhandledStackInfo.stack) {
    stack = item._unhandledStackInfo.stack;
  }
  return stack;
}
function addBodyTraceChain(item, options, callback) {
  var traceChain = item.stackInfo.traceChain;
  var traces = [];
  var traceChainLength = traceChain.length;
  for (var i = 0; i < traceChainLength; i++) {
    var trace = buildTrace(item, traceChain[i], options);
    traces.push(trace);
  }
  set(item, 'data.body', {
    trace_chain: traces
  });
  callback(null, item);
}
function addBodyTrace(item, options, callback) {
  var stack = stackFromItem(item);
  if (stack) {
    var trace = buildTrace(item, item.stackInfo, options);
    set(item, 'data.body', {
      trace: trace
    });
    callback(null, item);
  } else {
    var stackInfo = item.stackInfo;
    var guess = errorParser.guessErrorClass(stackInfo.message);
    var className = errorClass(stackInfo, guess[0], options);
    var message = guess[1];
    item.message = className + ': ' + message;
    addBodyMessage(item, options, callback);
  }
}
function buildTrace(item, stackInfo, options) {
  var description = item && item.data.description;
  var custom = item && item.custom;
  var stack = stackFromItem(item);
  var guess = errorParser.guessErrorClass(stackInfo.message);
  var className = errorClass(stackInfo, guess[0], options);
  var message = guess[1];
  var trace = {
    exception: {
      class: className,
      message: message
    }
  };
  if (description) {
    trace.exception.description = description;
  }
  if (stack) {
    if (stack.length === 0) {
      trace.exception.stack = stackInfo.rawStack;
      trace.exception.raw = String(stackInfo.rawException);
    }
    var stackFrame;
    var frame;
    var code;
    var pre;
    var post;
    var contextLength;
    var i, mid;
    trace.frames = [];
    for (i = 0; i < stack.length; ++i) {
      stackFrame = stack[i];
      frame = {
        filename: stackFrame.url ? sanitizeUrl(stackFrame.url) : '(unknown)',
        lineno: stackFrame.line || null,
        method: !stackFrame.func || stackFrame.func === '?' ? '[anonymous]' : stackFrame.func,
        colno: stackFrame.column
      };
      if (options.sendFrameUrl) {
        frame.url = stackFrame.url;
      }
      if (frame.method && frame.method.endsWith && frame.method.endsWith('_rollbar_wrapped')) {
        continue;
      }
      code = pre = post = null;
      contextLength = stackFrame.context ? stackFrame.context.length : 0;
      if (contextLength) {
        mid = Math.floor(contextLength / 2);
        pre = stackFrame.context.slice(0, mid);
        code = stackFrame.context[mid];
        post = stackFrame.context.slice(mid);
      }
      if (code) {
        frame.code = code;
      }
      if (pre || post) {
        frame.context = {};
        if (pre && pre.length) {
          frame.context.pre = pre;
        }
        if (post && post.length) {
          frame.context.post = post;
        }
      }
      if (stackFrame.args) {
        frame.args = stackFrame.args;
      }
      trace.frames.push(frame);
    }

    // NOTE(cory): reverse the frames since rollbar.com expects the most recent call last
    trace.frames.reverse();
    if (custom) {
      trace.extra = src_merge(custom);
    }
  }
  return trace;
}
function errorClass(stackInfo, guess, options) {
  if (stackInfo.name) {
    return stackInfo.name;
  } else if (options.guessErrorClass) {
    return guess;
  } else {
    return '(unknown)';
  }
}
function addScrubber(scrubFn) {
  return function (item, options, callback) {
    if (scrubFn) {
      var scrubFields = options.scrubFields || [];
      var scrubPaths = options.scrubPaths || [];
      item.data = scrubFn(item.data, scrubFields, scrubPaths);
    }
    callback(null, item);
  };
}

;// ./src/transforms.js

function itemToPayload(item, options, callback) {
  if (item._isUncaught) {
    item.data._isUncaught = true;
  }
  if (item._originalArgs) {
    item.data._originalArgs = item._originalArgs;
  }
  callback(null, item);
}
function addPayloadOptions(item, options, callback) {
  var payloadOptions = options.payload || {};
  if (payloadOptions.body) {
    delete payloadOptions.body;
  }
  item.data = src_merge(item.data, payloadOptions);
  callback(null, item);
}
function addTelemetryData(item, options, callback) {
  if (item.telemetryEvents) {
    set(item, 'data.body.telemetry', item.telemetryEvents);
  }
  callback(null, item);
}
function addMessageWithError(item, options, callback) {
  if (!item.message) {
    callback(null, item);
    return;
  }
  var tracePath = 'data.body.trace_chain.0';
  var trace = get(item, tracePath);
  if (!trace) {
    tracePath = 'data.body.trace';
    trace = get(item, tracePath);
  }
  if (trace) {
    if (!(trace.exception && trace.exception.description)) {
      set(item, tracePath + '.exception.description', item.message);
      callback(null, item);
      return;
    }
    var extra = get(item, tracePath + '.extra') || {};
    var newExtra = src_merge(extra, {
      message: item.message
    });
    set(item, tracePath + '.extra', newExtra);
  }
  callback(null, item);
}
function userTransform(logger) {
  return function (item, options, callback) {
    var newItem = src_merge(item);
    var response = null;
    try {
      if (isFunction(options.transform)) {
        response = options.transform(newItem.data, item);
      }
    } catch (e) {
      options.transform = null;
      logger.error('Error while calling custom transform() function. Removing custom transform().', e);
      callback(null, item);
      return;
    }
    if (isPromise(response)) {
      response.then(function (promisedItem) {
        if (promisedItem) {
          newItem.data = promisedItem;
        }
        callback(null, newItem);
      }, function (error) {
        callback(error, item);
      });
    } else {
      callback(null, newItem);
    }
  };
}
function addConfigToPayload(item, options, callback) {
  if (!options.sendConfig) {
    return callback(null, item);
  }
  var configKey = '_rollbarConfig';
  var custom = get(item, 'data.custom') || {};
  custom[configKey] = options;
  item.data.custom = custom;
  callback(null, item);
}
function addFunctionOption(options, name) {
  if (isFunction(options[name])) {
    options[name] = options[name].toString();
  }
}
function addConfiguredOptions(item, options, callback) {
  var configuredOptions = options._configuredOptions;

  // These must be stringified or they'll get dropped during serialization.
  addFunctionOption(configuredOptions, 'transform');
  addFunctionOption(configuredOptions, 'checkIgnore');
  addFunctionOption(configuredOptions, 'onSendCallback');
  delete configuredOptions.accessToken;
  item.data.notifier.configured_options = configuredOptions;
  callback(null, item);
}
function addDiagnosticKeys(item, options, callback) {
  var diagnostic = src_merge(item.notifier.client.notifier.diagnostic, item.diagnostic);
  if (get(item, 'err._isAnonymous')) {
    diagnostic.is_anonymous = true;
  }
  if (item._isUncaught) {
    diagnostic.is_uncaught = item._isUncaught;
  }
  if (item.err) {
    try {
      diagnostic.raw_error = {
        message: item.err.message,
        name: item.err.name,
        constructor_name: item.err.constructor && item.err.constructor.name,
        filename: item.err.fileName,
        line: item.err.lineNumber,
        column: item.err.columnNumber,
        stack: item.err.stack
      };
    } catch (e) {
      diagnostic.raw_error = {
        failed: String(e)
      };
    }
  }
  item.data.notifier.diagnostic = src_merge(item.data.notifier.diagnostic, diagnostic);
  callback(null, item);
}

;// ./src/browser/predicates.js

function checkIgnore(item, settings) {
  if (get(settings, 'plugins.jquery.ignoreAjaxErrors')) {
    return !get(item, 'body.message.extra.isAjax');
  }
  return true;
}

;// ./src/predicates.js

function checkLevel(item, settings) {
  var level = item.level;
  var levelVal = LEVELS[level] || 0;
  var reportLevel = settings.reportLevel;
  var reportLevelVal = LEVELS[reportLevel] || 0;
  if (levelVal < reportLevelVal) {
    return false;
  }
  return true;
}
function userCheckIgnore(logger) {
  return function (item, settings) {
    var isUncaught = !!item._isUncaught;
    delete item._isUncaught;
    var args = item._originalArgs;
    delete item._originalArgs;
    try {
      if (isFunction(settings.onSendCallback)) {
        settings.onSendCallback(isUncaught, args, item);
      }
    } catch (e) {
      settings.onSendCallback = null;
      logger.error('Error while calling onSendCallback, removing', e);
    }
    try {
      if (isFunction(settings.checkIgnore) && settings.checkIgnore(isUncaught, args, item)) {
        return false;
      }
    } catch (e) {
      settings.checkIgnore = null;
      logger.error('Error while calling custom checkIgnore(), removing', e);
    }
    return true;
  };
}
function urlIsNotBlockListed(logger) {
  return function (item, settings) {
    return !urlIsOnAList(item, settings, 'blocklist', logger);
  };
}
function urlIsSafeListed(logger) {
  return function (item, settings) {
    return urlIsOnAList(item, settings, 'safelist', logger);
  };
}
function matchFrames(trace, list, block) {
  if (!trace) {
    return !block;
  }
  var frames = trace.frames;
  if (!frames || frames.length === 0) {
    return !block;
  }
  var frame, filename, url, urlRegex;
  var listLength = list.length;
  var frameLength = frames.length;
  for (var i = 0; i < frameLength; i++) {
    frame = frames[i];
    filename = frame.filename;
    if (!isType(filename, 'string')) {
      return !block;
    }
    for (var j = 0; j < listLength; j++) {
      url = list[j];
      urlRegex = new RegExp(url);
      if (urlRegex.test(filename)) {
        return true;
      }
    }
  }
  return false;
}
function urlIsOnAList(item, settings, safeOrBlock, logger) {
  // safelist is the default
  var block = false;
  if (safeOrBlock === 'blocklist') {
    block = true;
  }
  var list, traces;
  try {
    list = block ? settings.hostBlockList : settings.hostSafeList;
    traces = get(item, 'body.trace_chain') || [get(item, 'body.trace')];

    // These two checks are important to come first as they are defaults
    // in case the list is missing or the trace is missing or not well-formed
    if (!list || list.length === 0) {
      return !block;
    }
    if (traces.length === 0 || !traces[0]) {
      return !block;
    }
    var tracesLength = traces.length;
    for (var i = 0; i < tracesLength; i++) {
      if (matchFrames(traces[i], list, block)) {
        return true;
      }
    }
  } catch (e
  /* istanbul ignore next */) {
    if (block) {
      settings.hostBlockList = null;
    } else {
      settings.hostSafeList = null;
    }
    var listName = block ? 'hostBlockList' : 'hostSafeList';
    logger.error("Error while reading your configuration's " + listName + ' option. Removing custom ' + listName + '.', e);
    return !block;
  }
  return false;
}
function messageIsIgnored(logger) {
  return function (item, settings) {
    var i, j, ignoredMessages, len, messageIsIgnored, rIgnoredMessage, messages;
    try {
      messageIsIgnored = false;
      ignoredMessages = settings.ignoredMessages;
      if (!ignoredMessages || ignoredMessages.length === 0) {
        return true;
      }
      messages = messagesFromItem(item);
      if (messages.length === 0) {
        return true;
      }
      len = ignoredMessages.length;
      for (i = 0; i < len; i++) {
        rIgnoredMessage = new RegExp(ignoredMessages[i], 'gi');
        for (j = 0; j < messages.length; j++) {
          messageIsIgnored = rIgnoredMessage.test(messages[j]);
          if (messageIsIgnored) {
            return false;
          }
        }
      }
    } catch (e
    /* istanbul ignore next */) {
      settings.ignoredMessages = null;
      logger.error("Error while reading your configuration's ignoredMessages option. Removing custom ignoredMessages.");
    }
    return true;
  };
}
function messagesFromItem(item) {
  var body = item.body;
  var messages = [];

  // The payload schema only allows one of trace_chain, message, or trace.
  // However, existing test cases are based on having both trace and message present.
  // So here we preserve the ability to collect strings from any combination of these keys.
  if (body.trace_chain) {
    var traceChain = body.trace_chain;
    for (var i = 0; i < traceChain.length; i++) {
      var trace = traceChain[i];
      messages.push(get(trace, 'exception.message'));
    }
  }
  if (body.trace) {
    messages.push(get(body, 'trace.exception.message'));
  }
  if (body.message) {
    messages.push(get(body, 'message.body'));
  }
  return messages;
}

;// ./src/browser/replay/defaults.js
/**
 * Default session replay recording options
 * See https://github.com/rrweb-io/rrweb/blob/master/guide.md#options for details
 */
/* harmony default export */ var defaults = ({
  enabled: false,
  // Whether recording is enabled
  autoStart: true,
  // Start recording automatically when Rollbar initializes
  maxSeconds: 300,
  // Maximum recording duration in seconds

  baseSamplingRatio: 1.0,
  // Used by triggers that don't specify a sampling ratio
  triggers: [{
    type: 'occurrence',
    level: ['error', 'critical']
  }],
  debug: {
    logErrors: true,
    // Whether to log errors emitted by rrweb.
    logEmits: false // Whether to log emitted events
  },
  // Recording options
  inlineStylesheet: true,
  // Whether to inline stylesheets to improve replay accuracy
  inlineImages: false,
  // Whether to record the image content
  collectFonts: true,
  // Whether to collect fonts in the website

  // Privacy options
  // Fine-grained control over which input types to mask
  // By default only password inputs are masked if maskInputs is true
  maskInputOptions: {
    password: true,
    email: false,
    tel: false,
    text: false,
    color: false,
    date: false,
    'datetime-local': false,
    month: false,
    number: false,
    range: false,
    search: false,
    time: false,
    url: false,
    week: false
  },
  // Override default class names.
  blockClass: 'rb-block',
  maskTextClass: 'rb-mask',
  ignoreClass: 'rb-ignore',
  // Remove unnecessary parts of the DOM
  // By default all removable elements are removed
  slimDOMOptions: {
    script: true,
    // Remove script elements
    comment: true,
    // Remove comments
    headFavicon: true,
    // Remove favicons in the head
    headWhitespace: true,
    // Remove whitespace in head
    headMetaDescKeywords: true,
    // Remove meta description and keywords
    headMetaSocial: true,
    // Remove social media meta tags
    headMetaRobots: true,
    // Remove robots meta directives
    headMetaHttpEquiv: true,
    // Remove http-equiv meta directives
    headMetaAuthorship: true,
    // Remove authorship meta directives
    headMetaVerification: true // Remove verification meta directives
  }

  // Custom callbacks for advanced use cases
  // These are undefined by default and can be set programmatically
  // maskInputFn: undefined,      // Custom function to mask input values
  // maskTextFn: undefined,       // Custom function to mask text content
  // errorHandler: undefined,     // Custom error handler for recording errors

  // Plugin system
  // plugins: []                  // List of plugins to use (must be set programmatically)
});
;// ./src/tracing/defaults.js
/**
 * Default tracing options
 */
/* harmony default export */ var tracing_defaults = ({
  enabled: false,
  endpoint: 'api.rollbar.com/api/1/session/'
});
;// ./src/tracing/id.js
/**
 * Generate a random hexadecimal ID of specified byte length
 *
 * @param {number} bytes - Number of bytes for the ID (default: 16)
 * @returns {string} - Hexadecimal string representation
 */
function gen() {
  var bytes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
  var randomBytes = new Uint8Array(bytes);
  crypto.getRandomValues(randomBytes);
  var randHex = Array.from(randomBytes, function (byte) {
    return byte.toString(16).padStart(2, '0');
  }).join('');
  return randHex;
}

/**
 * Tracing id generation utils
 *
 * @example
 * import id from './id.js';
 *
 * const spanId = id.gen(8); // => "a1b2c3d4e5f6..."
 */
/* harmony default export */ var id = ({
  gen: gen
});
;// ./src/browser/replay/replayMap.js
function replayMap_typeof(o) { "@babel/helpers - typeof"; return replayMap_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, replayMap_typeof(o); }
function replayMap_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ replayMap_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == replayMap_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(replayMap_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function replayMap_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function replayMap_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { replayMap_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { replayMap_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function replayMap_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function replayMap_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, replayMap_toPropertyKey(o.key), o); } }
function replayMap_createClass(e, r, t) { return r && replayMap_defineProperties(e.prototype, r), t && replayMap_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function replayMap_toPropertyKey(t) { var i = replayMap_toPrimitive(t, "string"); return "symbol" == replayMap_typeof(i) ? i : i + ""; }
function replayMap_toPrimitive(t, r) { if ("object" != replayMap_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != replayMap_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }



/**
 * ReplayMap - Manages the mapping between error occurrences and their associated
 * session recordings. This class handles the coordination between when recordings
 * are dumped and when they are eventually sent to the backend.
 */
var _map = /*#__PURE__*/new WeakMap();
var _recorder = /*#__PURE__*/new WeakMap();
var _api = /*#__PURE__*/new WeakMap();
var _tracing = /*#__PURE__*/new WeakMap();
var ReplayMap = /*#__PURE__*/function () {
  /**
   * Creates a new ReplayMap instance
   *
   * @param {Object} props - Configuration props
   * @param {Object} props.recorder - The recorder instance that dumps replay data into spans
   * @param {Object} props.api - The API instance used to send replay payloads to the backend
   * @param {Object} props.tracing - The tracing instance used to create spans and manage context
   */
  function ReplayMap(_ref) {
    var recorder = _ref.recorder,
      api = _ref.api,
      tracing = _ref.tracing;
    replayMap_classCallCheck(this, ReplayMap);
    _classPrivateFieldInitSpec(this, _map, void 0);
    _classPrivateFieldInitSpec(this, _recorder, void 0);
    _classPrivateFieldInitSpec(this, _api, void 0);
    _classPrivateFieldInitSpec(this, _tracing, void 0);
    if (!recorder) {
      throw new TypeError("Expected 'recorder' to be provided");
    }
    if (!api) {
      throw new TypeError("Expected 'api' to be provided");
    }
    if (!tracing) {
      throw new TypeError("Expected 'tracing' to be provided");
    }
    _classPrivateFieldSet(_map, this, new Map());
    _classPrivateFieldSet(_recorder, this, recorder);
    _classPrivateFieldSet(_api, this, api);
    _classPrivateFieldSet(_tracing, this, tracing);
  }

  /**
   * Processes a replay by converting recorder events into a transport-ready payload.
   *
   * Calls recorder.dump() to capture events as spans, formats them into a proper payload,
   * and stores the result in the map using replayId as the key.
   *
   * @param {string} replayId - The unique ID for this replay
   * @returns {Promise<string>} A promise resolving to the processed replayId
   * @private
   */
  return replayMap_createClass(ReplayMap, [{
    key: "_processReplay",
    value: (function () {
      var _processReplay2 = replayMap_asyncToGenerator(/*#__PURE__*/replayMap_regeneratorRuntime().mark(function _callee(replayId, occurrenceUuid) {
        var payload;
        return replayMap_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              try {
                payload = _classPrivateFieldGet(_recorder, this).dump(_classPrivateFieldGet(_tracing, this), replayId, occurrenceUuid);
                _classPrivateFieldGet(_map, this).set(replayId, payload);
              } catch (transformError) {
                logger.error('Error transforming spans:', transformError);
                _classPrivateFieldGet(_map, this).set(replayId, null); // TODO(matux): Error span?
              }
              return _context.abrupt("return", replayId);
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function _processReplay(_x, _x2) {
        return _processReplay2.apply(this, arguments);
      }
      return _processReplay;
    }()
    /**
     * Adds a replay to the map and returns a uniquely generated replay ID.
     *
     * This method immediately returns the replayId and asynchronously processes
     * the replay data in the background. The processing involves converting
     * recorder events into a payload format and storing it in the map.
     *
     * @returns {string} A unique identifier for this replay
     */
    )
  }, {
    key: "add",
    value: function add(replayId, occurrenceUuid) {
      replayId = replayId || id.gen(8);
      this._processReplay(replayId, occurrenceUuid).catch(function (error) {
        logger.error('Failed to process replay:', error);
      });
      return replayId;
    }

    /**
     * Sends the replay payload associated with the given replayId to the backend
     * and removes it from the map.
     *
     * Retrieves the payload from the map, checks if it's valid, then sends it
     * to the API endpoint for processing. The payload can be either a spans array
     * or a formatted OTLP payload object.
     *
     * @param {string} replayId - The ID of the replay to send
     * @returns {Promise<boolean>} A promise that resolves to true if the payload was found and sent, false otherwise
     */
  }, {
    key: "send",
    value: (function () {
      var _send = replayMap_asyncToGenerator(/*#__PURE__*/replayMap_regeneratorRuntime().mark(function _callee2(replayId) {
        var payload, isEmpty;
        return replayMap_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (replayId) {
                _context2.next = 3;
                break;
              }
              logger.error('ReplayMap.send: No replayId provided');
              return _context2.abrupt("return", false);
            case 3:
              if (_classPrivateFieldGet(_map, this).has(replayId)) {
                _context2.next = 6;
                break;
              }
              logger.error("ReplayMap.send: No replay found for replayId: ".concat(replayId));
              return _context2.abrupt("return", false);
            case 6:
              payload = _classPrivateFieldGet(_map, this).get(replayId);
              _classPrivateFieldGet(_map, this).delete(replayId);

              // Check if payload is empty (could be raw spans array or OTLP payload)
              isEmpty = !payload || Array.isArray(payload) && payload.length === 0 || payload.resourceSpans && payload.resourceSpans.length === 0;
              if (!isEmpty) {
                _context2.next = 12;
                break;
              }
              logger.error("ReplayMap.send: No payload found for replayId: ".concat(replayId));
              return _context2.abrupt("return", false);
            case 12:
              _context2.prev = 12;
              _context2.next = 15;
              return _classPrivateFieldGet(_api, this).postSpans(payload);
            case 15:
              return _context2.abrupt("return", true);
            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](12);
              logger.error('Error sending replay:', _context2.t0);
              return _context2.abrupt("return", false);
            case 22:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[12, 18]]);
      }));
      function send(_x3) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
    /**
     * Discards the replay associated with the given replay ID by removing
     * it from the map without sending it.
     *
     * @param {string} replayId - The ID of the replay to discard
     * @returns {boolean} True if a replay was found and discarded, false otherwise
     */
    )
  }, {
    key: "discard",
    value: function discard(replayId) {
      if (!replayId) {
        logger.error('ReplayMap.discard: No replayId provided');
        return false;
      }
      if (!_classPrivateFieldGet(_map, this).has(replayId)) {
        logger.error("ReplayMap.discard: No replay found for replayId: ".concat(replayId));
        return false;
      }
      _classPrivateFieldGet(_map, this).delete(replayId);
      return true;
    }

    /**
     * Gets spans for the given replay ID
     *
     * @param {string} replayId - The ID to retrieve spans for
     * @returns {Array|null} The spans array or null if not found
     */
  }, {
    key: "getSpans",
    value: function getSpans(replayId) {
      var _classPrivateFieldGet2;
      return (_classPrivateFieldGet2 = _classPrivateFieldGet(_map, this).get(replayId)) !== null && _classPrivateFieldGet2 !== void 0 ? _classPrivateFieldGet2 : null;
    }

    /**
     * Sets spans for a given replay ID
     *
     * @param {string} replayId - The ID to set spans for
     * @param {Array} spans - The spans to set
     */
  }, {
    key: "setSpans",
    value: function setSpans(replayId, spans) {
      _classPrivateFieldGet(_map, this).set(replayId, spans);
    }

    /**
     * Returns the size of the map (number of stored replays)
     *
     * @returns {number} The number of replays currently stored
     */
  }, {
    key: "size",
    get: function get() {
      return _classPrivateFieldGet(_map, this).size;
    }

    /**
     * Clears all stored replays without sending them
     */
  }, {
    key: "clear",
    value: function clear() {
      _classPrivateFieldGet(_map, this).clear();
    }
  }]);
}();

;// ./src/defaults.js
/**
 * Default options shared across platforms
 */
var version = '3.0.0-beta.1';
var endpoint = 'api.rollbar.com/api/1/item/';
var logLevel = 'debug';
var reportLevel = 'debug';
var uncaughtErrorLevel = 'error';
var maxItems = 0;
var itemsPerMin = 60;
var commonScrubFields = ['pw', 'pass', 'passwd', 'password', 'secret', 'confirm_password', 'confirmPassword', 'password_confirmation', 'passwordConfirmation', 'access_token', 'accessToken', 'X-Rollbar-Access-Token', 'secret_key', 'secretKey', 'secretToken'];
var apiScrubFields = (/* unused pure expression or super */ null && (['api_key', 'authenticity_token', 'oauth_token', 'token', 'user_session_secret']));
var requestScrubFields = (/* unused pure expression or super */ null && (['request.session.csrf', 'request.session._csrf', 'request.params._csrf', 'request.cookie', 'request.cookies']));
var commonScrubHeaders = (/* unused pure expression or super */ null && (['authorization', 'www-authorization', 'http_authorization', 'omniauth.auth', 'cookie', 'oauth-access-token', 'x-access-token', 'x_csrf_token', 'http_x_csrf_token', 'x-csrf-token']));

// For backward compatibility with default export
/* harmony default export */ var src_defaults = ({
  version: version,
  endpoint: endpoint,
  logLevel: logLevel,
  reportLevel: reportLevel,
  uncaughtErrorLevel: uncaughtErrorLevel,
  maxItems: maxItems,
  itemsPerMin: itemsPerMin
});
;// ./src/browser/defaults.js
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || defaults_unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function defaults_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return defaults_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? defaults_arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return defaults_arrayLikeToArray(r); }
function defaults_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Default browser options
 */

var scrubFields = [].concat(_toConsumableArray(commonScrubFields), ['cc-number', 'card number', 'cardnumber', 'cardnum', 'ccnum', 'ccnumber', 'cc num', 'creditcardnumber', 'credit card number', 'newcreditcardnumber', 'new credit card', 'creditcardno', 'credit card no', 'card#', 'card #', 'cc-csc', 'cvc', 'cvc2', 'cvv2', 'ccv2', 'security code', 'card verification', 'name on credit card', 'name on card', 'nameoncard', 'cardholder', 'card holder', 'name des karteninhabers', 'ccname', 'card type', 'cardtype', 'cc type', 'cctype', 'payment type', 'expiration date', 'expirationdate', 'expdate', 'cc-exp', 'ccmonth', 'ccyear']);

// For compatibility with existing code that expects default export with scrubFields property
/* harmony default export */ var browser_defaults = ({
  scrubFields: scrubFields
});
;// ./src/browser/core.js















function core_Rollbar(options, client) {
  this.options = handleOptions(core_defaultOptions, options, null, logger);
  this.options._configuredOptions = options;
  var Telemeter = this.components.telemeter;
  var Instrumenter = this.components.instrumenter;
  this.wrapGlobals = this.components.wrapGlobals;
  this.scrub = this.components.scrub;
  var truncation = this.components.truncation;
  var Tracing = this.components.tracing;
  var Recorder = this.components.recorder;
  var transport = new browser_transport(truncation);
  var api = new src_api(this.options, transport, url_namespaceObject, truncation);
  if (Tracing) {
    this.tracing = new Tracing(_gWindow(), this.options);
    this.tracing.initSession();
  }
  if (Recorder && isBrowser()) {
    var recorderOptions = this.options.recorder;
    this.recorder = new Recorder(recorderOptions);
    this.replayMap = new ReplayMap({
      recorder: this.recorder,
      api: api,
      tracing: this.tracing
    });
    if (recorderOptions.enabled && recorderOptions.autoStart) {
      this.recorder.start();
    }
  }
  if (Telemeter) {
    this.telemeter = new Telemeter(this.options, this.tracing);
  }
  this.client = client || new rollbar(this.options, api, logger, this.telemeter, this.tracing, this.replayMap, 'browser');
  var gWindow = _gWindow();
  var gDocument = typeof document != 'undefined' && document;
  this.isChrome = gWindow.chrome && gWindow.chrome.runtime; // check .runtime to avoid Edge browsers
  this.anonymousErrorsPending = 0;
  addTransformsToNotifier(this.client.notifier, this, gWindow);
  addPredicatesToQueue(this.client.queue);
  this.setupUnhandledCapture();
  if (Instrumenter) {
    this.instrumenter = new Instrumenter(this.options, this.client.telemeter, this, gWindow, gDocument);
    this.instrumenter.instrument();
  }

  // Used with rollbar-react for rollbar-react-native compatibility.
  this.rollbar = this;
}
var _instance = null;
core_Rollbar.init = function (options, client) {
  if (_instance) {
    return _instance.global(options).configure(options);
  }
  _instance = new core_Rollbar(options, client);
  return _instance;
};
core_Rollbar.prototype.components = {};
core_Rollbar.setComponents = function (components) {
  core_Rollbar.prototype.components = components;
};
function handleUninitialized(maybeCallback) {
  var message = 'Rollbar is not initialized';
  logger.error(message);
  if (maybeCallback) {
    maybeCallback(new Error(message));
  }
}
core_Rollbar.prototype.global = function (options) {
  this.client.global(options);
  return this;
};
core_Rollbar.global = function (options) {
  if (_instance) {
    return _instance.global(options);
  } else {
    handleUninitialized();
  }
};
core_Rollbar.prototype.configure = function (options, payloadData) {
  var _this$recorder;
  var oldOptions = this.options;
  var payload = {};
  if (payloadData) {
    payload = {
      payload: payloadData
    };
  }
  this.options = handleOptions(oldOptions, options, payload, logger);
  this.options._configuredOptions = handleOptions(oldOptions._configuredOptions, options, payload);
  (_this$recorder = this.recorder) === null || _this$recorder === void 0 || _this$recorder.configure(this.options);
  this.client.configure(this.options, payloadData);
  this.instrumenter && this.instrumenter.configure(this.options);
  this.setupUnhandledCapture();
  return this;
};
core_Rollbar.configure = function (options, payloadData) {
  if (_instance) {
    return _instance.configure(options, payloadData);
  } else {
    handleUninitialized();
  }
};
core_Rollbar.prototype.lastError = function () {
  return this.client.lastError;
};
core_Rollbar.lastError = function () {
  if (_instance) {
    return _instance.lastError();
  } else {
    handleUninitialized();
  }
};
core_Rollbar.prototype.log = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.log(item);
  return {
    uuid: uuid
  };
};
core_Rollbar.log = function () {
  if (_instance) {
    return _instance.log.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
core_Rollbar.prototype.debug = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.debug(item);
  return {
    uuid: uuid
  };
};
core_Rollbar.debug = function () {
  if (_instance) {
    return _instance.debug.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
core_Rollbar.prototype.info = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.info(item);
  return {
    uuid: uuid
  };
};
core_Rollbar.info = function () {
  if (_instance) {
    return _instance.info.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
core_Rollbar.prototype.warn = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.warn(item);
  return {
    uuid: uuid
  };
};
core_Rollbar.warn = function () {
  if (_instance) {
    return _instance.warn.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
core_Rollbar.prototype.warning = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.warning(item);
  return {
    uuid: uuid
  };
};
core_Rollbar.warning = function () {
  if (_instance) {
    return _instance.warning.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
core_Rollbar.prototype.error = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.error(item);
  return {
    uuid: uuid
  };
};
core_Rollbar.error = function () {
  if (_instance) {
    return _instance.error.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
core_Rollbar.prototype.critical = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.critical(item);
  return {
    uuid: uuid
  };
};
core_Rollbar.critical = function () {
  if (_instance) {
    return _instance.critical.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
core_Rollbar.prototype.buildJsonPayload = function (item) {
  return this.client.buildJsonPayload(item);
};
core_Rollbar.buildJsonPayload = function () {
  if (_instance) {
    return _instance.buildJsonPayload.apply(_instance, arguments);
  } else {
    handleUninitialized();
  }
};
core_Rollbar.prototype.sendJsonPayload = function (jsonPayload) {
  return this.client.sendJsonPayload(jsonPayload);
};
core_Rollbar.sendJsonPayload = function () {
  if (_instance) {
    return _instance.sendJsonPayload.apply(_instance, arguments);
  } else {
    handleUninitialized();
  }
};
core_Rollbar.prototype.setupUnhandledCapture = function () {
  var gWindow = _gWindow();
  if (!this.unhandledExceptionsInitialized) {
    if (this.options.captureUncaught || this.options.handleUncaughtExceptions) {
      captureUncaughtExceptions(gWindow, this);
      if (this.wrapGlobals && this.options.wrapGlobalEventHandlers) {
        this.wrapGlobals(gWindow, this);
      }
      this.unhandledExceptionsInitialized = true;
    }
  }
  if (!this.unhandledRejectionsInitialized) {
    if (this.options.captureUnhandledRejections || this.options.handleUnhandledRejections) {
      captureUnhandledRejections(gWindow, this);
      this.unhandledRejectionsInitialized = true;
    }
  }
};
core_Rollbar.prototype.handleUncaughtException = function (message, url, lineno, colno, error, context) {
  if (!this.options.captureUncaught && !this.options.handleUncaughtExceptions) {
    return;
  }

  // Chrome will always send 5+ arguments and error will be valid or null, not undefined.
  // If error is undefined, we have a different caller.
  // Chrome also sends errors from web workers with null error, but does not invoke
  // prepareStackTrace() for these. Test for empty url to skip them.
  if (this.options.inspectAnonymousErrors && this.isChrome && error === null && url === '') {
    return 'anonymous';
  }
  var item;
  var stackInfo = makeUnhandledStackInfo(message, url, lineno, colno, error, 'onerror', 'uncaught exception', errorParser);
  if (isError(error)) {
    item = this._createItem([message, error, context]);
    item._unhandledStackInfo = stackInfo;
  } else if (isError(url)) {
    item = this._createItem([message, url, context]);
    item._unhandledStackInfo = stackInfo;
  } else {
    item = this._createItem([message, context]);
    item.stackInfo = stackInfo;
  }
  item.level = this.options.uncaughtErrorLevel;
  item._isUncaught = true;
  this.client.log(item);
};

/**
 * Chrome only. Other browsers will ignore.
 *
 * Use Error.prepareStackTrace to extract information about errors that
 * do not have a valid error object in onerror().
 *
 * In tested version of Chrome, onerror is called first but has no way
 * to communicate with prepareStackTrace. Use a counter to let this
 * handler know which errors to send to Rollbar.
 *
 * In config options, set inspectAnonymousErrors to enable.
 */
core_Rollbar.prototype.handleAnonymousErrors = function () {
  if (!this.options.inspectAnonymousErrors || !this.isChrome) {
    return;
  }
  var r = this;
  function prepareStackTrace(error, _stack) {
    if (r.options.inspectAnonymousErrors) {
      if (r.anonymousErrorsPending) {
        // This is the only known way to detect that onerror saw an anonymous error.
        // It depends on onerror reliably being called before Error.prepareStackTrace,
        // which so far holds true on tested versions of Chrome. If versions of Chrome
        // are tested that behave differently, this logic will need to be updated
        // accordingly.
        r.anonymousErrorsPending -= 1;
        if (!error) {
          // Not likely to get here, but calling handleUncaughtException from here
          // without an error object would throw off the anonymousErrorsPending counter,
          // so return now.
          return;
        }

        // Allow this to be tracked later.
        error._isAnonymous = true;

        // url, lineno, colno shouldn't be needed for these errors.
        // If that changes, update this accordingly, using the unused
        // _stack param as needed (rather than parse error.toString()).
        r.handleUncaughtException(error.message, null, null, null, error);
      }
    }

    // Workaround to ensure stack is preserved for normal errors.
    return error.stack;
  }

  // https://v8.dev/docs/stack-trace-api
  try {
    Error.prepareStackTrace = prepareStackTrace;
  } catch (e) {
    this.options.inspectAnonymousErrors = false;
    this.error('anonymous error handler failed', e);
  }
};
core_Rollbar.prototype.handleUnhandledRejection = function (reason, promise) {
  if (!this.options.captureUnhandledRejections && !this.options.handleUnhandledRejections) {
    return;
  }
  var message = 'unhandled rejection was null or undefined!';
  if (reason) {
    if (reason.message) {
      message = reason.message;
    } else {
      var reasonResult = stringify(reason);
      if (reasonResult.value) {
        message = reasonResult.value;
      }
    }
  }
  var context = reason && reason._rollbarContext || promise && promise._rollbarContext;
  var item;
  if (isError(reason)) {
    item = this._createItem([message, reason, context]);
  } else {
    item = this._createItem([message, reason, context]);
    item.stackInfo = makeUnhandledStackInfo(message, '', 0, 0, null, 'unhandledrejection', '', errorParser);
  }
  item.level = this.options.uncaughtErrorLevel;
  item._isUncaught = true;
  item._originalArgs = item._originalArgs || [];
  item._originalArgs.push(promise);
  this.client.log(item);
};
core_Rollbar.prototype.wrap = function (f, context, _before) {
  try {
    var ctxFn;
    if (isFunction(context)) {
      ctxFn = context;
    } else {
      ctxFn = function ctxFn() {
        return context || {};
      };
    }
    if (!isFunction(f)) {
      return f;
    }
    if (f._isWrap) {
      return f;
    }
    if (!f._rollbar_wrapped) {
      f._rollbar_wrapped = function () {
        if (_before && isFunction(_before)) {
          _before.apply(this, arguments);
        }
        try {
          return f.apply(this, arguments);
        } catch (exc) {
          var e = exc;
          if (e && window._rollbarWrappedError !== e) {
            if (isType(e, 'string')) {
              e = new String(e);
            }
            e._rollbarContext = ctxFn() || {};
            e._rollbarContext._wrappedSource = f.toString();
            window._rollbarWrappedError = e;
          }
          throw e;
        }
      };
      f._rollbar_wrapped._isWrap = true;
      if (f.hasOwnProperty) {
        for (var prop in f) {
          if (f.hasOwnProperty(prop) && prop !== '_rollbar_wrapped') {
            f._rollbar_wrapped[prop] = f[prop];
          }
        }
      }
    }
    return f._rollbar_wrapped;
  } catch (e) {
    // Return the original function if the wrap fails.
    return f;
  }
};
core_Rollbar.wrap = function (f, context) {
  if (_instance) {
    return _instance.wrap(f, context);
  } else {
    handleUninitialized();
  }
};
core_Rollbar.prototype.captureEvent = function () {
  var event = createTelemetryEvent(arguments);
  return this.client.captureEvent(event.type, event.metadata, event.level);
};
core_Rollbar.captureEvent = function () {
  if (_instance) {
    return _instance.captureEvent.apply(_instance, arguments);
  } else {
    handleUninitialized();
  }
};

// The following two methods are used internally and are not meant for public use
core_Rollbar.prototype.captureDomContentLoaded = function (e, ts) {
  if (!ts) {
    ts = new Date();
  }
  return this.client.captureDomContentLoaded(ts);
};
core_Rollbar.prototype.captureLoad = function (e, ts) {
  if (!ts) {
    ts = new Date();
  }
  return this.client.captureLoad(ts);
};

/* Internal */

function addTransformsToNotifier(notifier, rollbar, gWindow) {
  notifier.addTransform(handleDomException).addTransform(handleItemWithError).addTransform(ensureItemHasSomethingToSay).addTransform(addBaseInfo).addTransform(addRequestInfo(gWindow)).addTransform(addClientInfo(gWindow)).addTransform(addPluginInfo(gWindow)).addTransform(addBody).addTransform(addMessageWithError).addTransform(addTelemetryData).addTransform(addConfigToPayload).addTransform(addScrubber(rollbar.scrub)).addTransform(addPayloadOptions).addTransform(userTransform(logger)).addTransform(addConfiguredOptions).addTransform(addDiagnosticKeys).addTransform(itemToPayload);
}
function addPredicatesToQueue(queue) {
  queue.addPredicate(checkLevel).addPredicate(checkIgnore).addPredicate(userCheckIgnore(logger)).addPredicate(urlIsNotBlockListed(logger)).addPredicate(urlIsSafeListed(logger)).addPredicate(messageIsIgnored(logger));
}
core_Rollbar.prototype.loadFull = function () {
  logger.info('Unexpected Rollbar.loadFull() called on a Notifier instance. This can happen when Rollbar is loaded multiple times.');
};
core_Rollbar.prototype._createItem = function (args) {
  return createItem(args, logger, this);
};
function _getFirstFunction(args) {
  for (var i = 0, len = args.length; i < len; ++i) {
    if (isFunction(args[i])) {
      return args[i];
    }
  }
  return undefined;
}
function _gWindow() {
  return typeof window != 'undefined' && window || typeof self != 'undefined' && self;
}


var core_defaultOptions = {
  version: version,
  scrubFields: browser_defaults.scrubFields,
  logLevel: logLevel,
  reportLevel: reportLevel,
  uncaughtErrorLevel: uncaughtErrorLevel,
  endpoint: endpoint,
  verbose: false,
  enabled: true,
  transmit: true,
  sendConfig: false,
  includeItemsInTelemetry: true,
  captureIp: true,
  inspectAnonymousErrors: true,
  ignoreDuplicateErrors: true,
  wrapGlobalEventHandlers: false,
  recorder: defaults,
  tracing: tracing_defaults
};
/* harmony default export */ var core = (core_Rollbar);
;// ./src/telemetry.js
var _excluded = ["otelAttributes"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }

var MAX_EVENTS = 100;

// Temporary workaround while solving commonjs -> esm issues in Node 18 - 20.
function fromMillis(millis) {
  return [Math.trunc(millis / 1000), Math.round(millis % 1000 * 1e6)];
}
function Telemeter(options, tracing) {
  var _this$tracing;
  this.queue = [];
  this.options = src_merge(options);
  var maxTelemetryEvents = this.options.maxTelemetryEvents || MAX_EVENTS;
  this.maxQueueSize = Math.max(0, Math.min(maxTelemetryEvents, MAX_EVENTS));
  this.tracing = tracing;
  this.telemetrySpan = (_this$tracing = this.tracing) === null || _this$tracing === void 0 ? void 0 : _this$tracing.startSpan('rollbar-telemetry', {});
}
Telemeter.prototype.configure = function (options) {
  var oldOptions = this.options;
  this.options = src_merge(oldOptions, options);
  var maxTelemetryEvents = this.options.maxTelemetryEvents || MAX_EVENTS;
  var newMaxEvents = Math.max(0, Math.min(maxTelemetryEvents, MAX_EVENTS));
  var deleteCount = 0;
  if (this.queue.length > newMaxEvents) {
    deleteCount = this.queue.length - newMaxEvents;
  }
  this.maxQueueSize = newMaxEvents;
  this.queue.splice(0, deleteCount);
};
Telemeter.prototype.copyEvents = function () {
  var events = Array.prototype.slice.call(this.queue, 0);
  if (isFunction(this.options.filterTelemetry)) {
    try {
      var i = events.length;
      while (i--) {
        if (this.options.filterTelemetry(events[i])) {
          events.splice(i, 1);
        }
      }
    } catch (e) {
      this.options.filterTelemetry = null;
    }
  }

  // Remove internal keys from output
  events = events.map(function (_ref) {
    var otelAttributes = _ref.otelAttributes,
      event = _objectWithoutProperties(_ref, _excluded);
    return event;
  });
  return events;
};
Telemeter.prototype.capture = function (type, metadata, level, rollbarUUID) {
  var timestamp = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var otelAttributes = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var e = {
    level: getLevel(type, level),
    type: type,
    timestamp_ms: timestamp || utility_now(),
    body: metadata,
    source: 'client'
  };
  if (rollbarUUID) {
    e.uuid = rollbarUUID;
  }
  if (otelAttributes) {
    e.otelAttributes = otelAttributes;
  }
  try {
    if (isFunction(this.options.filterTelemetry) && this.options.filterTelemetry(e)) {
      return false;
    }
  } catch (exc) {
    this.options.filterTelemetry = null;
  }
  this.push(e);
  return e;
};
Telemeter.prototype.captureEvent = function (type, metadata, level, rollbarUUID) {
  return this.capture(type, metadata, level, rollbarUUID);
};
Telemeter.prototype.captureError = function (err, level, rollbarUUID, timestamp) {
  var _this$telemetrySpan;
  var message = err.message || String(err);
  var metadata = {
    message: message
  };
  if (err.stack) {
    metadata.stack = err.stack;
  }
  var otelAttributes = {
    message: message,
    level: level,
    type: 'error',
    uuid: rollbarUUID
  };
  (_this$telemetrySpan = this.telemetrySpan) === null || _this$telemetrySpan === void 0 || _this$telemetrySpan.addEvent('rollbar-occurrence-event', otelAttributes, fromMillis(timestamp));
  return this.capture('error', metadata, level, rollbarUUID, timestamp, otelAttributes);
};
Telemeter.prototype.captureLog = function (message, level, rollbarUUID, timestamp) {
  var otelAttributes = null;

  // If the uuid is present, this is a message occurrence.
  if (rollbarUUID) {
    var _this$telemetrySpan2;
    otelAttributes = {
      message: message,
      level: level,
      type: 'message',
      uuid: rollbarUUID
    }, (_this$telemetrySpan2 = this.telemetrySpan) === null || _this$telemetrySpan2 === void 0 ? void 0 : _this$telemetrySpan2.addEvent('rollbar-occurrence-event', otelAttributes, fromMillis(timestamp));
  } else {
    var _this$telemetrySpan3;
    otelAttributes = {
      message: message,
      level: level
    };
    (_this$telemetrySpan3 = this.telemetrySpan) === null || _this$telemetrySpan3 === void 0 || _this$telemetrySpan3.addEvent('rollbar-log-event', otelAttributes, fromMillis(timestamp));
  }
  return this.capture('log', {
    message: message
  }, level, rollbarUUID, timestamp, otelAttributes);
};
Telemeter.prototype.captureNetwork = function (metadata, subtype, rollbarUUID, requestData) {
  var _metadata$response, _this$telemetrySpan4;
  subtype = subtype || 'xhr';
  metadata.subtype = metadata.subtype || subtype;
  if (requestData) {
    metadata.request = requestData;
  }
  var level = this.levelFromStatus(metadata.status_code);
  var endTimeNano = (metadata.end_time_ms || 0) * 1e6;
  var otelAttributes = {
    type: metadata.subtype,
    method: metadata.method,
    url: metadata.url,
    statusCode: metadata.status_code,
    'request.headers': JSON.stringify(metadata.request_headers || {}),
    'response.headers': JSON.stringify(((_metadata$response = metadata.response) === null || _metadata$response === void 0 ? void 0 : _metadata$response.headers) || {}),
    'response.timeUnixNano': endTimeNano.toString()
  };
  (_this$telemetrySpan4 = this.telemetrySpan) === null || _this$telemetrySpan4 === void 0 || _this$telemetrySpan4.addEvent('rollbar-network-event', otelAttributes, fromMillis(metadata.start_time_ms));
  return this.capture('network', metadata, level, rollbarUUID, metadata.start_time_ms, otelAttributes);
};
Telemeter.prototype.levelFromStatus = function (statusCode) {
  if (statusCode >= 200 && statusCode < 400) {
    return 'info';
  }
  if (statusCode === 0 || statusCode >= 400) {
    return 'error';
  }
  return 'info';
};
Telemeter.prototype.captureDom = function (subtype, element, value, checked, rollbarUUID) {
  var metadata = {
    subtype: subtype,
    element: element
  };
  if (value !== undefined) {
    metadata.value = value;
  }
  if (checked !== undefined) {
    metadata.checked = checked;
  }
  return this.capture('dom', metadata, 'info', rollbarUUID);
};
Telemeter.prototype.captureNavigation = function (from, to, rollbarUUID, timestamp) {
  var _this$telemetrySpan5;
  (_this$telemetrySpan5 = this.telemetrySpan) === null || _this$telemetrySpan5 === void 0 || _this$telemetrySpan5.addEvent('rollbar-navigation-event', {
    'previous.url.full': from,
    'url.full': to
  }, fromMillis(timestamp));
  return this.capture('navigation', {
    from: from,
    to: to
  }, 'info', rollbarUUID, timestamp);
};
Telemeter.prototype.captureDomContentLoaded = function (ts) {
  return this.capture('navigation', {
    subtype: 'DOMContentLoaded'
  }, 'info', undefined, ts && ts.getTime());
  /**
   * If we decide to make this a dom event instead, then use the line below:
  return this.capture('dom', {subtype: 'DOMContentLoaded'}, 'info', undefined, ts && ts.getTime());
  */
};
Telemeter.prototype.captureLoad = function (ts) {
  return this.capture('navigation', {
    subtype: 'load'
  }, 'info', undefined, ts && ts.getTime());
  /**
   * If we decide to make this a dom event instead, then use the line below:
  return this.capture('dom', {subtype: 'load'}, 'info', undefined, ts && ts.getTime());
  */
};
Telemeter.prototype.captureConnectivityChange = function (type, rollbarUUID) {
  return this.captureNetwork({
    change: type
  }, 'connectivity', rollbarUUID);
};

// Only intended to be used internally by the notifier
Telemeter.prototype._captureRollbarItem = function (item) {
  if (!this.options.includeItemsInTelemetry) {
    return;
  }
  if (item.err) {
    return this.captureError(item.err, item.level, item.uuid, item.timestamp);
  }
  if (item.message) {
    return this.captureLog(item.message, item.level, item.uuid, item.timestamp);
  }
  if (item.custom) {
    return this.capture('log', item.custom, item.level, item.uuid, item.timestamp);
  }
};
Telemeter.prototype.push = function (e) {
  this.queue.push(e);
  if (this.queue.length > this.maxQueueSize) {
    this.queue.shift();
  }
};
function getLevel(type, level) {
  if (level) {
    return level;
  }
  var defaultLevel = {
    error: 'error',
    manual: 'info'
  };
  return defaultLevel[type] || 'info';
}
/* harmony default export */ var telemetry = (Telemeter);
;// ./src/utility/headers.js
/*
 * headers - Detect when fetch Headers are undefined and use a partial polyfill.
 *
 * A full polyfill is not used in order to keep package size as small as possible.
 * Since this is only used internally and is not added to the window object,
 * the full interface doesn't need to be supported.
 *
 * This implementation is modified from whatwg-fetch:
 * https://github.com/github/fetch
 */
function headers(headers) {
  if (typeof Headers === 'undefined') {
    return new FetchHeaders(headers);
  }
  return new Headers(headers);
}
function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name);
  }
  return name.toLowerCase();
}
function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value);
  }
  return value;
}
function iteratorFor(items) {
  var iterator = {
    next: function next() {
      var value = items.shift();
      return {
        done: value === undefined,
        value: value
      };
    }
  };
  return iterator;
}
function FetchHeaders(headers) {
  this.map = {};
  if (headers instanceof FetchHeaders) {
    headers.forEach(function (value, name) {
      this.append(name, value);
    }, this);
  } else if (Array.isArray(headers)) {
    headers.forEach(function (header) {
      this.append(header[0], header[1]);
    }, this);
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function (name) {
      this.append(name, headers[name]);
    }, this);
  }
}
FetchHeaders.prototype.append = function (name, value) {
  name = normalizeName(name);
  value = normalizeValue(value);
  var oldValue = this.map[name];
  this.map[name] = oldValue ? oldValue + ', ' + value : value;
};
FetchHeaders.prototype.get = function (name) {
  name = normalizeName(name);
  return this.has(name) ? this.map[name] : null;
};
FetchHeaders.prototype.has = function (name) {
  return this.map.hasOwnProperty(normalizeName(name));
};
FetchHeaders.prototype.forEach = function (callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this);
    }
  }
};
FetchHeaders.prototype.entries = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push([name, value]);
  });
  return iteratorFor(items);
};
/* harmony default export */ var utility_headers = (headers);
;// ./src/utility/replace.js
function replace(obj, name, replacement, replacements, type) {
  var orig = obj[name];
  obj[name] = replacement(orig);
  if (replacements) {
    replacements[type].push([obj, name, orig]);
  }
}
/* harmony default export */ var utility_replace = (replace);
;// ./src/utility/traverse.js

function traverse(obj, func, seen) {
  var k, v, i;
  var isObj = isType(obj, 'object');
  var isArray = isType(obj, 'array');
  var keys = [];
  var seenIndex;

  // Best might be to use Map here with `obj` as the keys, but we want to support IE < 11.
  seen = seen || {
    obj: [],
    mapped: []
  };
  if (isObj) {
    seenIndex = seen.obj.indexOf(obj);
    if (isObj && seenIndex !== -1) {
      // Prefer the mapped object if there is one.
      return seen.mapped[seenIndex] || seen.obj[seenIndex];
    }
    seen.obj.push(obj);
    seenIndex = seen.obj.length - 1;
  }
  if (isObj) {
    for (k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        keys.push(k);
      }
    }
  } else if (isArray) {
    for (i = 0; i < obj.length; ++i) {
      keys.push(i);
    }
  }
  var result = isObj ? {} : [];
  var same = true;
  for (i = 0; i < keys.length; ++i) {
    k = keys[i];
    v = obj[k];
    result[k] = func(k, v, seen);
    same = same && result[k] === obj[k];
  }
  if (isObj && !same) {
    seen.mapped[seenIndex] = result;
  }
  return !same ? result : obj;
}
/* harmony default export */ var utility_traverse = (traverse);
;// ./src/scrub.js


function scrub(data, scrubFields, scrubPaths) {
  scrubFields = scrubFields || [];
  if (scrubPaths) {
    for (var i = 0; i < scrubPaths.length; ++i) {
      scrubPath(data, scrubPaths[i]);
    }
  }
  var paramRes = _getScrubFieldRegexs(scrubFields);
  var queryRes = _getScrubQueryParamRegexs(scrubFields);
  function redactQueryParam(dummy0, paramPart) {
    return paramPart + redact();
  }
  function paramScrubber(v) {
    var i;
    if (isType(v, 'string')) {
      for (i = 0; i < queryRes.length; ++i) {
        v = v.replace(queryRes[i], redactQueryParam);
      }
    }
    return v;
  }
  function valScrubber(k, v) {
    var i;
    for (i = 0; i < paramRes.length; ++i) {
      if (paramRes[i].test(k)) {
        v = redact();
        break;
      }
    }
    return v;
  }
  function scrubber(k, v, seen) {
    var tmpV = valScrubber(k, v);
    if (tmpV === v) {
      if (isType(v, 'object') || isType(v, 'array')) {
        return utility_traverse(v, scrubber, seen);
      }
      return paramScrubber(tmpV);
    } else {
      return tmpV;
    }
  }
  return utility_traverse(data, scrubber);
}
function scrubPath(obj, path) {
  var keys = path.split('.');
  var last = keys.length - 1;
  try {
    for (var i = 0; i <= last; ++i) {
      if (i < last) {
        obj = obj[keys[i]];
      } else {
        obj[keys[i]] = redact();
      }
    }
  } catch (e) {
    // Missing key is OK;
  }
}
function _getScrubFieldRegexs(scrubFields) {
  var ret = [];
  var pat;
  for (var i = 0; i < scrubFields.length; ++i) {
    pat = '^\\[?(%5[bB])?' + scrubFields[i] + '\\[?(%5[bB])?\\]?(%5[dD])?$';
    ret.push(new RegExp(pat, 'i'));
  }
  return ret;
}
function _getScrubQueryParamRegexs(scrubFields) {
  var ret = [];
  var pat;
  for (var i = 0; i < scrubFields.length; ++i) {
    pat = '\\[?(%5[bB])?' + scrubFields[i] + '\\[?(%5[bB])?\\]?(%5[dD])?';
    ret.push(new RegExp('(' + pat + '=)([^&\\n]+)', 'igm'));
  }
  return ret;
}
/* harmony default export */ var src_scrub = (scrub);
;// ./src/browser/domUtility.js
function getElementType(e) {
  return (e.getAttribute('type') || '').toLowerCase();
}
function isDescribedElement(element, type, subtypes) {
  if (element.tagName.toLowerCase() !== type.toLowerCase()) {
    return false;
  }
  if (!subtypes) {
    return true;
  }
  element = getElementType(element);
  for (var i = 0; i < subtypes.length; i++) {
    if (subtypes[i] === element) {
      return true;
    }
  }
  return false;
}
function getElementFromEvent(evt, doc) {
  if (evt.target) {
    return evt.target;
  }
  if (doc && doc.elementFromPoint) {
    return doc.elementFromPoint(evt.clientX, evt.clientY);
  }
  return undefined;
}
function treeToArray(elem) {
  var MAX_HEIGHT = 5;
  var out = [];
  var nextDescription;
  for (var height = 0; elem && height < MAX_HEIGHT; height++) {
    nextDescription = describeElement(elem);
    if (nextDescription.tagName === 'html') {
      break;
    }
    out.unshift(nextDescription);
    elem = elem.parentNode;
  }
  return out;
}
function elementArrayToString(a) {
  var MAX_LENGTH = 80;
  var separator = ' > ',
    separatorLength = separator.length;
  var out = [],
    len = 0,
    nextStr,
    totalLength;
  for (var i = a.length - 1; i >= 0; i--) {
    nextStr = descriptionToString(a[i]);
    totalLength = len + out.length * separatorLength + nextStr.length;
    if (i < a.length - 1 && totalLength >= MAX_LENGTH + 3) {
      out.unshift('...');
      break;
    }
    out.unshift(nextStr);
    len += nextStr.length;
  }
  return out.join(separator);
}
function descriptionToString(desc) {
  if (!desc || !desc.tagName) {
    return '';
  }
  var out = [desc.tagName];
  if (desc.id) {
    out.push('#' + desc.id);
  }
  if (desc.classes) {
    out.push('.' + desc.classes.join('.'));
  }
  for (var i = 0; i < desc.attributes.length; i++) {
    out.push('[' + desc.attributes[i].key + '="' + desc.attributes[i].value + '"]');
  }
  return out.join('');
}

/**
 * Input: a dom element
 * Output: null if tagName is falsey or input is falsey, else
 *  {
 *    tagName: String,
 *    id: String | undefined,
 *    classes: [String] | undefined,
 *    attributes: [
 *      {
 *        key: OneOf(type, name, title, alt),
 *        value: String
 *      }
 *    ]
 *  }
 */
function describeElement(elem) {
  if (!elem || !elem.tagName) {
    return null;
  }
  var out = {},
    className,
    key,
    attr,
    i;
  out.tagName = elem.tagName.toLowerCase();
  if (elem.id) {
    out.id = elem.id;
  }
  className = elem.className;
  if (className && typeof className === 'string') {
    out.classes = className.split(/\s+/);
  }
  var attributes = ['type', 'name', 'title', 'alt'];
  out.attributes = [];
  for (i = 0; i < attributes.length; i++) {
    key = attributes[i];
    attr = elem.getAttribute(key);
    if (attr) {
      out.attributes.push({
        key: key,
        value: attr
      });
    }
  }
  return out;
}

;// ./src/browser/telemetry.js






var telemetry_defaults = {
  network: true,
  networkResponseHeaders: false,
  networkResponseBody: false,
  networkRequestHeaders: false,
  networkRequestBody: false,
  networkErrorOnHttp5xx: false,
  networkErrorOnHttp4xx: false,
  networkErrorOnHttp0: false,
  log: true,
  dom: true,
  navigation: true,
  connectivity: true,
  contentSecurityPolicy: true,
  errorOnContentSecurityPolicy: false
};
function restore(replacements, type) {
  var b;
  while (replacements[type].length) {
    b = replacements[type].shift();
    b[0][b[1]] = b[2];
  }
}
function nameFromDescription(description) {
  if (!description || !description.attributes) {
    return null;
  }
  var attrs = description.attributes;
  for (var a = 0; a < attrs.length; ++a) {
    if (attrs[a].key === 'name') {
      return attrs[a].value;
    }
  }
  return null;
}
function defaultValueScrubber(scrubFields) {
  var patterns = [];
  for (var i = 0; i < scrubFields.length; ++i) {
    patterns.push(new RegExp(scrubFields[i], 'i'));
  }
  return function (description) {
    var name = nameFromDescription(description);
    if (!name) {
      return false;
    }
    for (var i = 0; i < patterns.length; ++i) {
      if (patterns[i].test(name)) {
        return true;
      }
    }
    return false;
  };
}
function Instrumenter(options, telemeter, rollbar, _window, _document) {
  this.options = options;
  var autoInstrument = options.autoInstrument;
  if (options.enabled === false || autoInstrument === false) {
    this.autoInstrument = {};
  } else {
    if (!isType(autoInstrument, 'object')) {
      autoInstrument = telemetry_defaults;
    }
    this.autoInstrument = src_merge(telemetry_defaults, autoInstrument);
  }
  this.scrubTelemetryInputs = !!options.scrubTelemetryInputs;
  this.telemetryScrubber = options.telemetryScrubber;
  this.defaultValueScrubber = defaultValueScrubber(options.scrubFields);
  this.telemeter = telemeter;
  this.rollbar = rollbar;
  this.diagnostic = rollbar.client.notifier.diagnostic;
  this._window = _window || {};
  this._document = _document || {};
  this.replacements = {
    network: [],
    log: [],
    navigation: [],
    connectivity: []
  };
  this.eventRemovers = {
    dom: [],
    connectivity: [],
    contentsecuritypolicy: []
  };
  this._location = this._window.location;
  this._lastHref = this._location && this._location.href;
}
Instrumenter.prototype.configure = function (options) {
  this.options = src_merge(this.options, options);
  var autoInstrument = options.autoInstrument;
  var oldSettings = src_merge(this.autoInstrument);
  if (options.enabled === false || autoInstrument === false) {
    this.autoInstrument = {};
  } else {
    if (!isType(autoInstrument, 'object')) {
      autoInstrument = telemetry_defaults;
    }
    this.autoInstrument = src_merge(telemetry_defaults, autoInstrument);
  }
  this.instrument(oldSettings);
  if (options.scrubTelemetryInputs !== undefined) {
    this.scrubTelemetryInputs = !!options.scrubTelemetryInputs;
  }
  if (options.telemetryScrubber !== undefined) {
    this.telemetryScrubber = options.telemetryScrubber;
  }
};

// eslint-disable-next-line complexity
Instrumenter.prototype.instrument = function (oldSettings) {
  if (this.autoInstrument.network && !(oldSettings && oldSettings.network)) {
    this.instrumentNetwork();
  } else if (!this.autoInstrument.network && oldSettings && oldSettings.network) {
    this.deinstrumentNetwork();
  }
  if (this.autoInstrument.log && !(oldSettings && oldSettings.log)) {
    this.instrumentConsole();
  } else if (!this.autoInstrument.log && oldSettings && oldSettings.log) {
    this.deinstrumentConsole();
  }
  if (this.autoInstrument.dom && !(oldSettings && oldSettings.dom)) {
    this.instrumentDom();
  } else if (!this.autoInstrument.dom && oldSettings && oldSettings.dom) {
    this.deinstrumentDom();
  }
  if (this.autoInstrument.navigation && !(oldSettings && oldSettings.navigation)) {
    this.instrumentNavigation();
  } else if (!this.autoInstrument.navigation && oldSettings && oldSettings.navigation) {
    this.deinstrumentNavigation();
  }
  if (this.autoInstrument.connectivity && !(oldSettings && oldSettings.connectivity)) {
    this.instrumentConnectivity();
  } else if (!this.autoInstrument.connectivity && oldSettings && oldSettings.connectivity) {
    this.deinstrumentConnectivity();
  }
  if (this.autoInstrument.contentSecurityPolicy && !(oldSettings && oldSettings.contentSecurityPolicy)) {
    this.instrumentContentSecurityPolicy();
  } else if (!this.autoInstrument.contentSecurityPolicy && oldSettings && oldSettings.contentSecurityPolicy) {
    this.deinstrumentContentSecurityPolicy();
  }
};
Instrumenter.prototype.deinstrumentNetwork = function () {
  restore(this.replacements, 'network');
};
Instrumenter.prototype.instrumentNetwork = function () {
  var self = this;
  function wrapProp(prop, xhr) {
    if (prop in xhr && isFunction(xhr[prop])) {
      utility_replace(xhr, prop, function (orig) {
        return self.rollbar.wrap(orig);
      });
    }
  }
  if ('XMLHttpRequest' in this._window) {
    var xhrp = this._window.XMLHttpRequest.prototype;
    utility_replace(xhrp, 'open', function (orig) {
      return function (method, url) {
        var isUrlObject = _isUrlObject(url);
        if (isType(url, 'string') || isUrlObject) {
          url = isUrlObject ? url.toString() : url;
          if (this.__rollbar_xhr) {
            this.__rollbar_xhr.method = method;
            this.__rollbar_xhr.url = url;
            this.__rollbar_xhr.status_code = null;
            this.__rollbar_xhr.start_time_ms = utility_now();
            this.__rollbar_xhr.end_time_ms = null;
          } else {
            this.__rollbar_xhr = {
              method: method,
              url: url,
              status_code: null,
              start_time_ms: utility_now(),
              end_time_ms: null
            };
          }
        }
        return orig.apply(this, arguments);
      };
    }, this.replacements, 'network');
    utility_replace(xhrp, 'setRequestHeader', function (orig) {
      return function (header, value) {
        // If xhr.open is async, __rollbar_xhr may not be initialized yet.
        if (!this.__rollbar_xhr) {
          this.__rollbar_xhr = {};
        }
        if (isType(header, 'string') && isType(value, 'string')) {
          if (self.autoInstrument.networkRequestHeaders) {
            if (!this.__rollbar_xhr.request_headers) {
              this.__rollbar_xhr.request_headers = {};
            }
            this.__rollbar_xhr.request_headers[header] = value;
          }
          // We want the content type even if request header telemetry is off.
          if (header.toLowerCase() === 'content-type') {
            this.__rollbar_xhr.request_content_type = value;
          }
        }
        return orig.apply(this, arguments);
      };
    }, this.replacements, 'network');
    utility_replace(xhrp, 'send', function (orig) {
      /* eslint-disable no-unused-vars */
      return function (data) {
        /* eslint-enable no-unused-vars */
        var xhr = this;
        function onreadystatechangeHandler() {
          if (xhr.__rollbar_xhr) {
            if (xhr.__rollbar_xhr.status_code === null) {
              xhr.__rollbar_xhr.status_code = 0;
              if (self.autoInstrument.networkRequestBody) {
                xhr.__rollbar_xhr.request = data;
              }
              xhr.__rollbar_event = self.captureNetwork(xhr.__rollbar_xhr, 'xhr', undefined);
            }
            if (xhr.readyState < 2) {
              xhr.__rollbar_xhr.start_time_ms = utility_now();
            }
            if (xhr.readyState > 3) {
              var end_time_ms = utility_now();
              xhr.__rollbar_xhr.end_time_ms = end_time_ms;
              var headers = null;
              xhr.__rollbar_xhr.response_content_type = xhr.getResponseHeader('Content-Type');
              if (self.autoInstrument.networkResponseHeaders) {
                var headersConfig = self.autoInstrument.networkResponseHeaders;
                headers = {};
                try {
                  var header, i;
                  if (headersConfig === true) {
                    var allHeaders = xhr.getAllResponseHeaders();
                    if (allHeaders) {
                      var arr = allHeaders.trim().split(/[\r\n]+/);
                      var parts, value;
                      for (i = 0; i < arr.length; i++) {
                        parts = arr[i].split(': ');
                        header = parts.shift();
                        value = parts.join(': ');
                        headers[header] = value;
                      }
                    }
                  } else {
                    for (i = 0; i < headersConfig.length; i++) {
                      header = headersConfig[i];
                      headers[header] = xhr.getResponseHeader(header);
                    }
                  }
                } catch (e) {
                  /* we ignore the errors here that could come from different
                   * browser issues with the xhr methods */
                }
              }
              var body = null;
              if (self.autoInstrument.networkResponseBody) {
                try {
                  body = xhr.responseText;
                } catch (e) {
                  /* ignore errors from reading responseText */
                }
              }
              var response = null;
              if (body || headers) {
                response = {};
                if (body) {
                  if (self.isJsonContentType(xhr.__rollbar_xhr.response_content_type)) {
                    response.body = self.scrubJson(body);
                  } else {
                    response.body = body;
                  }
                }
                if (headers) {
                  response.headers = headers;
                }
              }
              if (response) {
                xhr.__rollbar_xhr.response = response;
              }
              try {
                var code = xhr.status;
                code = code === 1223 ? 204 : code;
                xhr.__rollbar_xhr.status_code = code;
                self.addOtelNetworkResponse(xhr.__rollbar_event, end_time_ms, code);
                xhr.__rollbar_event.level = self.telemeter.levelFromStatus(code);
                self.errorOnHttpStatus(xhr.__rollbar_xhr);
              } catch (e) {
                /* ignore possible exception from xhr.status */
              }
            }
          }
        }
        wrapProp('onload', xhr);
        wrapProp('onerror', xhr);
        wrapProp('onprogress', xhr);
        if ('onreadystatechange' in xhr && isFunction(xhr.onreadystatechange)) {
          utility_replace(xhr, 'onreadystatechange', function (orig) {
            return self.rollbar.wrap(orig, undefined, onreadystatechangeHandler);
          });
        } else {
          xhr.onreadystatechange = onreadystatechangeHandler;
        }
        if (xhr.__rollbar_xhr && self.trackHttpErrors()) {
          xhr.__rollbar_xhr.stack = new Error().stack;
        }
        return orig.apply(this, arguments);
      };
    }, this.replacements, 'network');
  }
  if ('fetch' in this._window) {
    utility_replace(this._window, 'fetch', function (orig) {
      /* eslint-disable no-unused-vars */
      return function (fn, t) {
        /* eslint-enable no-unused-vars */
        var args = new Array(arguments.length);
        for (var i = 0, len = args.length; i < len; i++) {
          args[i] = arguments[i];
        }
        var input = args[0];
        var method = 'GET';
        var url;
        var isUrlObject = _isUrlObject(input);
        if (isType(input, 'string') || isUrlObject) {
          url = isUrlObject ? input.toString() : input;
        } else if (input) {
          url = input.url;
          if (input.method) {
            method = input.method;
          }
        }
        if (args[1] && args[1].method) {
          method = args[1].method;
        }
        var metadata = {
          method: method,
          url: url,
          status_code: null,
          start_time_ms: utility_now(),
          end_time_ms: null
        };
        if (args[1] && args[1].headers) {
          // Argument may be a Headers object, or plain object. Ensure here that
          // we are working with a Headers object with case-insensitive keys.
          var reqHeaders = utility_headers(args[1].headers);
          metadata.request_content_type = reqHeaders.get('Content-Type');
          if (self.autoInstrument.networkRequestHeaders) {
            metadata.request_headers = self.fetchHeaders(reqHeaders, self.autoInstrument.networkRequestHeaders);
          }
        }
        if (self.autoInstrument.networkRequestBody) {
          if (args[1] && args[1].body) {
            metadata.request = args[1].body;
          } else if (args[0] && !isType(args[0], 'string') && args[0].body) {
            metadata.request = args[0].body;
          }
        }
        var telemetryEvent = self.captureNetwork(metadata, 'fetch', undefined);
        if (self.trackHttpErrors()) {
          metadata.stack = new Error().stack;
        }

        // Start our handler before returning the promise. This allows resp.clone()
        // to execute before other handlers touch the response.
        return orig.apply(this, args).then(function (resp) {
          var end_time_ms = utility_now();
          metadata.end_time_ms = end_time_ms;
          metadata.status_code = resp.status;
          self.addOtelNetworkResponse(telemetryEvent, end_time_ms, resp.status);
          metadata.response_content_type = resp.headers.get('Content-Type');
          var headers = null;
          if (self.autoInstrument.networkResponseHeaders) {
            headers = self.fetchHeaders(resp.headers, self.autoInstrument.networkResponseHeaders);
          }
          var body = null;
          if (self.autoInstrument.networkResponseBody) {
            if (typeof resp.text === 'function') {
              // Response.text() is not implemented on some platforms
              // The response must be cloned to prevent reading (and locking) the original stream.
              // This must be done before other handlers touch the response.
              body = resp.clone().text(); //returns a Promise
            }
          }
          if (headers || body) {
            metadata.response = {};
            if (body) {
              // Test to ensure body is a Promise, which it should always be.
              if (typeof body.then === 'function') {
                body.then(function (text) {
                  if (text && self.isJsonContentType(metadata.response_content_type)) {
                    metadata.response.body = self.scrubJson(text);
                  } else {
                    metadata.response.body = text;
                  }
                });
              } else {
                metadata.response.body = body;
              }
            }
            if (headers) {
              metadata.response.headers = headers;
            }
          }
          self.errorOnHttpStatus(metadata);
          return resp;
        });
      };
    }, this.replacements, 'network');
  }
};
Instrumenter.prototype.captureNetwork = function (metadata, subtype, rollbarUUID) {
  if (metadata.request && this.isJsonContentType(metadata.request_content_type)) {
    metadata.request = this.scrubJson(metadata.request);
  }
  return this.telemeter.captureNetwork(metadata, subtype, rollbarUUID);
};
Instrumenter.prototype.isJsonContentType = function (contentType) {
  return contentType && isType(contentType, 'string') && contentType.toLowerCase().includes('json') ? true : false;
};
Instrumenter.prototype.addOtelNetworkResponse = function (event, endTimeMs, statusCode) {
  if (event.otelAttributes) {
    event.otelAttributes['response.timeUnixNano'] = (endTimeMs * 1e6).toString();
    event.otelAttributes.statusCode = statusCode;
  }
};
Instrumenter.prototype.scrubJson = function (json) {
  return JSON.stringify(src_scrub(JSON.parse(json), this.options.scrubFields));
};
Instrumenter.prototype.fetchHeaders = function (inHeaders, headersConfig) {
  var outHeaders = {};
  try {
    var i;
    if (headersConfig === true) {
      if (typeof inHeaders.entries === 'function') {
        // Headers.entries() is not implemented in IE
        var allHeaders = inHeaders.entries();
        var currentHeader = allHeaders.next();
        while (!currentHeader.done) {
          outHeaders[currentHeader.value[0]] = currentHeader.value[1];
          currentHeader = allHeaders.next();
        }
      }
    } else {
      for (i = 0; i < headersConfig.length; i++) {
        var header = headersConfig[i];
        outHeaders[header] = inHeaders.get(header);
      }
    }
  } catch (e) {
    /* ignore probable IE errors */
  }
  return outHeaders;
};
Instrumenter.prototype.trackHttpErrors = function () {
  return this.autoInstrument.networkErrorOnHttp5xx || this.autoInstrument.networkErrorOnHttp4xx || this.autoInstrument.networkErrorOnHttp0;
};
Instrumenter.prototype.errorOnHttpStatus = function (metadata) {
  var status = metadata.status_code;
  if (status >= 500 && this.autoInstrument.networkErrorOnHttp5xx || status >= 400 && this.autoInstrument.networkErrorOnHttp4xx || status === 0 && this.autoInstrument.networkErrorOnHttp0) {
    var error = new Error('HTTP request failed with Status ' + status);
    error.stack = metadata.stack;
    this.rollbar.error(error, {
      skipFrames: 1
    });
  }
};
Instrumenter.prototype.deinstrumentConsole = function () {
  if (!('console' in this._window && this._window.console.log)) {
    return;
  }
  var b;
  while (this.replacements['log'].length) {
    b = this.replacements['log'].shift();
    this._window.console[b[0]] = b[1];
  }
};
Instrumenter.prototype.instrumentConsole = function () {
  if (!('console' in this._window && this._window.console.log)) {
    return;
  }
  var self = this;
  var c = this._window.console;
  function wrapConsole(method) {
    'use strict';

    // See https://github.com/rollbar/rollbar.js/pull/778
    var orig = c[method];
    var origConsole = c;
    var level = method === 'warn' ? 'warning' : method;
    c[method] = function () {
      var args = Array.prototype.slice.call(arguments);
      var message = formatArgsAsString(args);
      self.telemeter.captureLog(message, level, null, utility_now());
      if (orig) {
        Function.prototype.apply.call(orig, origConsole, args);
      }
    };
    self.replacements['log'].push([method, orig]);
  }
  var methods = ['debug', 'info', 'warn', 'error', 'log'];
  try {
    for (var i = 0, len = methods.length; i < len; i++) {
      wrapConsole(methods[i]);
    }
  } catch (e) {
    this.diagnostic.instrumentConsole = {
      error: e.message
    };
  }
};
Instrumenter.prototype.deinstrumentDom = function () {
  if (!('addEventListener' in this._window || 'attachEvent' in this._window)) {
    return;
  }
  this.removeListeners('dom');
};
Instrumenter.prototype.instrumentDom = function () {
  if (!('addEventListener' in this._window || 'attachEvent' in this._window)) {
    return;
  }
  var clickHandler = this.handleClick.bind(this);
  var blurHandler = this.handleBlur.bind(this);
  this.addListener('dom', this._window, 'click', 'onclick', clickHandler, true);
  this.addListener('dom', this._window, 'blur', 'onfocusout', blurHandler, true);
};
Instrumenter.prototype.handleClick = function (evt) {
  try {
    var e = getElementFromEvent(evt, this._document);
    var hasTag = e && e.tagName;
    var anchorOrButton = isDescribedElement(e, 'a') || isDescribedElement(e, 'button');
    if (hasTag && (anchorOrButton || isDescribedElement(e, 'input', ['button', 'submit']))) {
      this.captureDomEvent('click', e);
    } else if (isDescribedElement(e, 'input', ['checkbox', 'radio'])) {
      this.captureDomEvent('input', e, e.value, e.checked);
    }
  } catch (exc) {
    // TODO: Not sure what to do here
  }
};
Instrumenter.prototype.handleBlur = function (evt) {
  try {
    var e = getElementFromEvent(evt, this._document);
    if (e && e.tagName) {
      if (isDescribedElement(e, 'textarea')) {
        this.captureDomEvent('input', e, e.value);
      } else if (isDescribedElement(e, 'select') && e.options && e.options.length) {
        this.handleSelectInputChanged(e);
      } else if (isDescribedElement(e, 'input') && !isDescribedElement(e, 'input', ['button', 'submit', 'hidden', 'checkbox', 'radio'])) {
        this.captureDomEvent('input', e, e.value);
      }
    }
  } catch (exc) {
    // TODO: Not sure what to do here
  }
};
Instrumenter.prototype.handleSelectInputChanged = function (elem) {
  if (elem.multiple) {
    for (var i = 0; i < elem.options.length; i++) {
      if (elem.options[i].selected) {
        this.captureDomEvent('input', elem, elem.options[i].value);
      }
    }
  } else if (elem.selectedIndex >= 0 && elem.options[elem.selectedIndex]) {
    this.captureDomEvent('input', elem, elem.options[elem.selectedIndex].value);
  }
};
Instrumenter.prototype.captureDomEvent = function (subtype, element, value, isChecked) {
  if (value !== undefined) {
    if (this.scrubTelemetryInputs || getElementType(element) === 'password') {
      value = '[scrubbed]';
    } else {
      var description = describeElement(element);
      if (this.telemetryScrubber) {
        if (this.telemetryScrubber(description)) {
          value = '[scrubbed]';
        }
      } else if (this.defaultValueScrubber(description)) {
        value = '[scrubbed]';
      }
    }
  }
  var elementString = elementArrayToString(treeToArray(element));
  this.telemeter.captureDom(subtype, elementString, value, isChecked);
};
Instrumenter.prototype.deinstrumentNavigation = function () {
  var chrome = this._window.chrome;
  var chromePackagedApp = chrome && chrome.app && chrome.app.runtime;
  // See https://github.com/angular/angular.js/pull/13945/files
  var hasPushState = !chromePackagedApp && this._window.history && this._window.history.pushState;
  if (!hasPushState) {
    return;
  }
  restore(this.replacements, 'navigation');
};
Instrumenter.prototype.instrumentNavigation = function () {
  var chrome = this._window.chrome;
  var chromePackagedApp = chrome && chrome.app && chrome.app.runtime;
  // See https://github.com/angular/angular.js/pull/13945/files
  var hasPushState = !chromePackagedApp && this._window.history && this._window.history.pushState;
  if (!hasPushState) {
    return;
  }
  var self = this;
  utility_replace(this._window, 'onpopstate', function (orig) {
    return function () {
      var current = self._location.href;
      self.handleUrlChange(self._lastHref, current);
      if (orig) {
        orig.apply(this, arguments);
      }
    };
  }, this.replacements, 'navigation');
  utility_replace(this._window.history, 'pushState', function (orig) {
    return function () {
      var url = arguments.length > 2 ? arguments[2] : undefined;
      if (url) {
        self.handleUrlChange(self._lastHref, url + '');
      }
      return orig.apply(this, arguments);
    };
  }, this.replacements, 'navigation');
};
Instrumenter.prototype.handleUrlChange = function (from, to) {
  var parsedHref = parse(this._location.href);
  var parsedTo = parse(to);
  var parsedFrom = parse(from);
  this._lastHref = to;
  if (parsedHref.protocol === parsedTo.protocol && parsedHref.host === parsedTo.host) {
    to = parsedTo.path + (parsedTo.hash || '');
  }
  if (parsedHref.protocol === parsedFrom.protocol && parsedHref.host === parsedFrom.host) {
    from = parsedFrom.path + (parsedFrom.hash || '');
  }
  this.telemeter.captureNavigation(from, to, null, utility_now());
};
Instrumenter.prototype.deinstrumentConnectivity = function () {
  if (!('addEventListener' in this._window || 'body' in this._document)) {
    return;
  }
  if (this._window.addEventListener) {
    this.removeListeners('connectivity');
  } else {
    restore(this.replacements, 'connectivity');
  }
};
Instrumenter.prototype.instrumentConnectivity = function () {
  if (!('addEventListener' in this._window || 'body' in this._document)) {
    return;
  }
  if (this._window.addEventListener) {
    this.addListener('connectivity', this._window, 'online', undefined, function () {
      this.telemeter.captureConnectivityChange('online');
    }.bind(this), true);
    this.addListener('connectivity', this._window, 'offline', undefined, function () {
      this.telemeter.captureConnectivityChange('offline');
    }.bind(this), true);
  } else {
    var self = this;
    utility_replace(this._document.body, 'ononline', function (orig) {
      return function () {
        self.telemeter.captureConnectivityChange('online');
        if (orig) {
          orig.apply(this, arguments);
        }
      };
    }, this.replacements, 'connectivity');
    utility_replace(this._document.body, 'onoffline', function (orig) {
      return function () {
        self.telemeter.captureConnectivityChange('offline');
        if (orig) {
          orig.apply(this, arguments);
        }
      };
    }, this.replacements, 'connectivity');
  }
};
Instrumenter.prototype.handleCspEvent = function (cspEvent) {
  var message = 'Security Policy Violation: ' + 'blockedURI: ' + cspEvent.blockedURI + ', ' + 'violatedDirective: ' + cspEvent.violatedDirective + ', ' + 'effectiveDirective: ' + cspEvent.effectiveDirective + ', ';
  if (cspEvent.sourceFile) {
    message += 'location: ' + cspEvent.sourceFile + ', ' + 'line: ' + cspEvent.lineNumber + ', ' + 'col: ' + cspEvent.columnNumber + ', ';
  }
  message += 'originalPolicy: ' + cspEvent.originalPolicy;
  this.telemeter.captureLog(message, 'error', null, utility_now());
  this.handleCspError(message);
};
Instrumenter.prototype.handleCspError = function (message) {
  if (this.autoInstrument.errorOnContentSecurityPolicy) {
    this.rollbar.error(message);
  }
};
Instrumenter.prototype.deinstrumentContentSecurityPolicy = function () {
  if (!('addEventListener' in this._document)) {
    return;
  }
  this.removeListeners('contentsecuritypolicy');
};
Instrumenter.prototype.instrumentContentSecurityPolicy = function () {
  if (!('addEventListener' in this._document)) {
    return;
  }
  var cspHandler = this.handleCspEvent.bind(this);
  this.addListener('contentsecuritypolicy', this._document, 'securitypolicyviolation', null, cspHandler, false);
};
Instrumenter.prototype.addListener = function (section, obj, type, altType, handler, capture) {
  if (obj.addEventListener) {
    obj.addEventListener(type, handler, capture);
    this.eventRemovers[section].push(function () {
      obj.removeEventListener(type, handler, capture);
    });
  } else if (altType) {
    obj.attachEvent(altType, handler);
    this.eventRemovers[section].push(function () {
      obj.detachEvent(altType, handler);
    });
  }
};
Instrumenter.prototype.removeListeners = function (section) {
  var r;
  while (this.eventRemovers[section].length) {
    r = this.eventRemovers[section].shift();
    r();
  }
};
function _isUrlObject(input) {
  return typeof URL !== 'undefined' && input instanceof URL;
}
/* harmony default export */ var browser_telemetry = (Instrumenter);
;// ./src/browser/wrapGlobals.js
function wrapGlobals(window, handler, shim) {
  if (!window) {
    return;
  }
  // Adapted from https://github.com/bugsnag/bugsnag-js
  var globals = 'EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload'.split(',');
  var i, global;
  for (i = 0; i < globals.length; ++i) {
    global = globals[i];
    if (window[global] && window[global].prototype) {
      _extendListenerPrototype(handler, window[global].prototype, shim);
    }
  }
}
function _extendListenerPrototype(handler, prototype, shim) {
  if (prototype.hasOwnProperty && prototype.hasOwnProperty('addEventListener')) {
    var oldAddEventListener = prototype.addEventListener;
    while (oldAddEventListener._rollbarOldAdd && oldAddEventListener.belongsToShim) {
      oldAddEventListener = oldAddEventListener._rollbarOldAdd;
    }
    var addFn = function addFn(event, callback, bubble) {
      oldAddEventListener.call(this, event, handler.wrap(callback), bubble);
    };
    addFn._rollbarOldAdd = oldAddEventListener;
    addFn.belongsToShim = shim;
    prototype.addEventListener = addFn;
    var oldRemoveEventListener = prototype.removeEventListener;
    while (oldRemoveEventListener._rollbarOldRemove && oldRemoveEventListener.belongsToShim) {
      oldRemoveEventListener = oldRemoveEventListener._rollbarOldRemove;
    }
    var removeFn = function removeFn(event, callback, bubble) {
      oldRemoveEventListener.call(this, event, callback && callback._rollbar_wrapped || callback, bubble);
    };
    removeFn._rollbarOldRemove = oldRemoveEventListener;
    removeFn.belongsToShim = shim;
    prototype.removeEventListener = removeFn;
  }
}
/* harmony default export */ var browser_wrapGlobals = (wrapGlobals);
;// ./src/truncation.js


function raw(payload, jsonBackup) {
  return [payload, stringify(payload, jsonBackup)];
}
function selectFrames(frames, range) {
  var len = frames.length;
  if (len > range * 2) {
    return frames.slice(0, range).concat(frames.slice(len - range));
  }
  return frames;
}
function truncateFrames(payload, jsonBackup, range) {
  range = typeof range === 'undefined' ? 30 : range;
  var body = payload.data.body;
  var frames;
  if (body.trace_chain) {
    var chain = body.trace_chain;
    for (var i = 0; i < chain.length; i++) {
      frames = chain[i].frames;
      frames = selectFrames(frames, range);
      chain[i].frames = frames;
    }
  } else if (body.trace) {
    frames = body.trace.frames;
    frames = selectFrames(frames, range);
    body.trace.frames = frames;
  }
  return [payload, stringify(payload, jsonBackup)];
}
function maybeTruncateValue(len, val) {
  if (!val) {
    return val;
  }
  if (val.length > len) {
    return val.slice(0, len - 3).concat('...');
  }
  return val;
}
function truncateStrings(len, payload, jsonBackup) {
  function truncator(k, v, seen) {
    switch (typeName(v)) {
      case 'string':
        return maybeTruncateValue(len, v);
      case 'object':
      case 'array':
        return utility_traverse(v, truncator, seen);
      default:
        return v;
    }
  }
  payload = utility_traverse(payload, truncator);
  return [payload, stringify(payload, jsonBackup)];
}
function truncateTraceData(traceData) {
  if (traceData.exception) {
    delete traceData.exception.description;
    traceData.exception.message = maybeTruncateValue(255, traceData.exception.message);
  }
  traceData.frames = selectFrames(traceData.frames, 1);
  return traceData;
}
function minBody(payload, jsonBackup) {
  var body = payload.data.body;
  if (body.trace_chain) {
    var chain = body.trace_chain;
    for (var i = 0; i < chain.length; i++) {
      chain[i] = truncateTraceData(chain[i]);
    }
  } else if (body.trace) {
    body.trace = truncateTraceData(body.trace);
  }
  return [payload, stringify(payload, jsonBackup)];
}
function needsTruncation(payload, maxSize) {
  return maxByteSize(payload) > maxSize;
}
function truncate(payload, jsonBackup, maxSize) {
  maxSize = typeof maxSize === 'undefined' ? 512 * 1024 : maxSize;
  var strategies = [raw, truncateFrames, truncateStrings.bind(null, 1024), truncateStrings.bind(null, 512), truncateStrings.bind(null, 256), minBody];
  var strategy, results, result;
  while (strategy = strategies.shift()) {
    results = strategy(payload, jsonBackup);
    payload = results[0];
    result = results[1];
    if (result.error || !needsTruncation(result.value, maxSize)) {
      return result;
    }
  }
  return result;
}
/* harmony default export */ var truncation = ({
  truncate: truncate,
  /* for testing */
  raw: raw,
  truncateFrames: truncateFrames,
  truncateStrings: truncateStrings,
  maybeTruncateValue: maybeTruncateValue
});
;// ./src/tracing/context.js
function context_typeof(o) { "@babel/helpers - typeof"; return context_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, context_typeof(o); }
function context_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function context_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, context_toPropertyKey(o.key), o); } }
function context_createClass(e, r, t) { return r && context_defineProperties(e.prototype, r), t && context_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function context_toPropertyKey(t) { var i = context_toPrimitive(t, "string"); return "symbol" == context_typeof(i) ? i : i + ""; }
function context_toPrimitive(t, r) { if ("object" != context_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != context_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Context = /*#__PURE__*/function () {
  function Context(parentContext) {
    context_classCallCheck(this, Context);
    this._currentContext = parentContext ? new Map(parentContext) : new Map();
  }
  return context_createClass(Context, [{
    key: "getValue",
    value: function getValue(key) {
      return this._currentContext.get(key);
    }
  }, {
    key: "setValue",
    value: function setValue(key, value) {
      var context = new Context(this._currentContext);
      context._currentContext.set(key, value);
      return context;
    }
  }, {
    key: "deleteValue",
    value: function deleteValue(key) {
      var context = new Context(self._currentContext);
      context._currentContext.delete(key);
      return context;
    }
  }]);
}();
var ROOT_CONTEXT = new Context();
;// ./src/tracing/contextManager.js
function contextManager_typeof(o) { "@babel/helpers - typeof"; return contextManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, contextManager_typeof(o); }
function contextManager_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function contextManager_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, contextManager_toPropertyKey(o.key), o); } }
function contextManager_createClass(e, r, t) { return r && contextManager_defineProperties(e.prototype, r), t && contextManager_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function contextManager_toPropertyKey(t) { var i = contextManager_toPrimitive(t, "string"); return "symbol" == contextManager_typeof(i) ? i : i + ""; }
function contextManager_toPrimitive(t, r) { if ("object" != contextManager_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != contextManager_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var ContextManager = /*#__PURE__*/function () {
  function ContextManager() {
    contextManager_classCallCheck(this, ContextManager);
    this.currentContext = ROOT_CONTEXT;
  }
  return contextManager_createClass(ContextManager, [{
    key: "active",
    value: function active() {
      return this.currentContext;
    }
  }, {
    key: "enterContext",
    value: function enterContext(context) {
      var previousContext = this.currentContext;
      this.currentContext = context || ROOT_CONTEXT;
      return previousContext;
    }
  }, {
    key: "exitContext",
    value: function exitContext(context) {
      this.currentContext = context;
      return this.currentContext;
    }
  }, {
    key: "with",
    value: function _with(context, fn, thisArg) {
      var previousContext = this.enterContext(context);
      try {
        for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
          args[_key - 3] = arguments[_key];
        }
        return fn.call.apply(fn, [thisArg].concat(args));
      } finally {
        this.exitContext(previousContext);
      }
    }
  }]);
}();
function createContextKey(key) {
  // Use Symbol for OpenTelemetry compatibility.
  return Symbol.for(key);
}
;// ./src/tracing/session.js
function session_typeof(o) { "@babel/helpers - typeof"; return session_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, session_typeof(o); }
function session_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function session_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, session_toPropertyKey(o.key), o); } }
function session_createClass(e, r, t) { return r && session_defineProperties(e.prototype, r), t && session_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function session_toPropertyKey(t) { var i = session_toPrimitive(t, "string"); return "symbol" == session_typeof(i) ? i : i + ""; }
function session_toPrimitive(t, r) { if ("object" != session_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != session_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var SESSION_KEY = 'RollbarSession';
var Session = /*#__PURE__*/function () {
  function Session(tracing, options) {
    session_classCallCheck(this, Session);
    this.options = options;
    this.tracing = tracing;
    this.window = tracing.window;
    this.session = null;
  }
  return session_createClass(Session, [{
    key: "init",
    value: function init() {
      if (this.session) {
        return this;
      }
      return this.getSession() || this.createSession();
    }
  }, {
    key: "getSession",
    value: function getSession() {
      try {
        var serializedSession = this.window.sessionStorage.getItem(SESSION_KEY);
        if (!serializedSession) {
          return null;
        }
        this.session = JSON.parse(serializedSession);
      } catch (_unused) {
        return null;
      }
      return this;
    }
  }, {
    key: "createSession",
    value: function createSession() {
      this.session = {
        id: id.gen(),
        createdAt: Date.now()
      };
      return this.setSession(this.session);
    }
  }, {
    key: "setSession",
    value: function setSession(session) {
      var sessionString = JSON.stringify(session);
      try {
        this.window.sessionStorage.setItem(SESSION_KEY, sessionString);
      } catch (_unused2) {
        return null;
      }
      return this;
    }
  }]);
}();
;// ./src/tracing/hrtime.js
/**
 * @module hrtime
 *
 * @description Methods for handling OpenTelemetry hrtime.
 */

/**
 * Convert a duration in milliseconds to an OpenTelemetry hrtime tuple.
 *
 * @param {number} millis - The duration in milliseconds.
 * @returns {[number, number]} An array where the first element is seconds
 *   and the second is nanoseconds.
 */
function hrtime_fromMillis(millis) {
  return [Math.trunc(millis / 1000), Math.round(millis % 1000 * 1e6)];
}

/**
 * Convert an OpenTelemetry hrtime tuple back to a duration in milliseconds.
 *
 * @param {[number, number]} hrtime - The hrtime tuple [seconds, nanoseconds].
 * @returns {number} The total duration in milliseconds.
 */
function toMillis(hrtime) {
  return hrtime[0] * 1e3 + Math.round(hrtime[1] / 1e6);
}

/**
 * Convert an OpenTelemetry hrtime tuple back to a duration in nanoseconds.
 *
 * @param {[number, number]} hrtime - The hrtime tuple [seconds, nanoseconds].
 * @returns {number} The total duration in nanoseconds.
 */
function toNanos(hrtime) {
  return hrtime[0] * 1e9 + hrtime[1];
}

/**
 * Adds two OpenTelemetry hrtime tuples.
 *
 * @param {[number, number]} a - The first hrtime tuple [s, ns].
 * @param {[number, number]} b - The second hrtime tuple [s, ns].
 * @returns {[number, number]} Summed hrtime tuple, normalized.
 *
 */
function add(a, b) {
  return [a[0] + b[0] + Math.trunc((a[1] + b[1]) / 1e9), (a[1] + b[1]) % 1e9];
}

/**
 * Get the current high-resolution time as an OpenTelemetry hrtime tuple.
 *
 * Uses the Performance API (timeOrigin + now()).
 *
 * @returns {[number, number]} The current hrtime tuple [s, ns].
 */
function now() {
  return add(hrtime_fromMillis(performance.timeOrigin), hrtime_fromMillis(performance.now()));
}

/**
 * Check if a value is a valid OpenTelemetry hrtime tuple.
 *
 * An hrtime tuple is an Array of exactly two numbers:
 *   [seconds, nanoseconds]
 *
 * @param {*} value – anything to test
 * @returns {boolean} true if `value` is a [number, number] array of length 2
 *
 * @example
 * isHrTime([ 1, 500 ]);         // true
 * isHrTime([ 0, 1e9 ]);         // true
 * isHrTime([ '1', 500 ]);       // false
 * isHrTime({ 0: 1, 1: 500 });   // false
 */
function isHrTime(value) {
  return Array.isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number';
}

/**
 * Methods for handling hrtime. OpenTelemetry uses the [seconds, nanoseconds]
 * format for hrtime in the `ReadableSpan` interface.
 *
 * @example
 * import hrtime from '@tracing/hrtime.js';
 *
 * hrtime.fromMillis(1000);
 * hrtime.toMillis([0, 1000]);
 * hrtime.add([0, 0], [0, 1000]);
 * hrtime.now();
 * hrtime.isHrTime([0, 1000]);
 */
/* harmony default export */ var hrtime = ({
  fromMillis: hrtime_fromMillis,
  toMillis: toMillis,
  toNanos: toNanos,
  add: add,
  now: now,
  isHrTime: isHrTime
});
;// ./src/tracing/exporter.js
function exporter_typeof(o) { "@babel/helpers - typeof"; return exporter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, exporter_typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || exporter_unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function exporter_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = exporter_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function exporter_toConsumableArray(r) { return exporter_arrayWithoutHoles(r) || exporter_iterableToArray(r) || exporter_unsupportedIterableToArray(r) || exporter_nonIterableSpread(); }
function exporter_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function exporter_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return exporter_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? exporter_arrayLikeToArray(r, a) : void 0; } }
function exporter_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function exporter_arrayWithoutHoles(r) { if (Array.isArray(r)) return exporter_arrayLikeToArray(r); }
function exporter_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function exporter_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function exporter_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, exporter_toPropertyKey(o.key), o); } }
function exporter_createClass(e, r, t) { return r && exporter_defineProperties(e.prototype, r), t && exporter_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function exporter_toPropertyKey(t) { var i = exporter_toPrimitive(t, "string"); return "symbol" == exporter_typeof(i) ? i : i + ""; }
function exporter_toPrimitive(t, r) { if ("object" != exporter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != exporter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/**
 * SpanExporter is responsible for exporting ReadableSpan objects
 * and transforming them into the OTLP-compatible format.
 */
var SpanExporter = /*#__PURE__*/function () {
  function SpanExporter() {
    exporter_classCallCheck(this, SpanExporter);
  }
  return exporter_createClass(SpanExporter, [{
    key: "export",
    value:
    /**
     * Export spans to the span export queue
     *
     * @param {Array} spans - Array of ReadableSpan objects to export
     * @param {Function} _resultCallback - Optional callback (not used)
     */
    function _export(spans, _resultCallback) {
      console.log(spans); // console exporter, TODO: make optional
      spanExportQueue.push.apply(spanExportQueue, exporter_toConsumableArray(spans));
    }

    /**
     * Transforms an array of ReadableSpan objects into the OTLP format payload
     * compatible with the Rollbar API. This follows the OpenTelemetry protocol
     * specification for traces.
     *
     * @returns {Object} OTLP format payload for API transmission
     */
  }, {
    key: "toPayload",
    value: function toPayload() {
      var _this = this;
      var spans = spanExportQueue.slice();
      spanExportQueue.length = 0;
      if (!spans || !spans.length) {
        return {
          resourceSpans: []
        };
      }
      var resource = spans[0] && spans[0].resource || {};
      var scopeMap = new Map();
      var _iterator = exporter_createForOfIteratorHelper(spans),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var span = _step.value;
          var scopeKey = span.instrumentationScope ? "".concat(span.instrumentationScope.name, ":").concat(span.instrumentationScope.version) : 'default:1.0.0';
          if (!scopeMap.has(scopeKey)) {
            scopeMap.set(scopeKey, {
              scope: span.instrumentationScope || {
                name: 'default',
                version: '1.0.0',
                attributes: []
              },
              spans: []
            });
          }
          scopeMap.get(scopeKey).spans.push(this._transformSpan(span));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return {
        resourceSpans: [{
          resource: this._transformResource(resource),
          scopeSpans: Array.from(scopeMap.values()).map(function (scopeData) {
            return {
              scope: _this._transformInstrumentationScope(scopeData.scope),
              spans: scopeData.spans
            };
          })
        }]
      };
    }

    /**
     * Transforms a ReadableSpan into the OTLP Span format
     *
     * @private
     * @param {Object} span - ReadableSpan object to transform
     * @returns {Object} OTLP Span format
     */
  }, {
    key: "_transformSpan",
    value: function _transformSpan(span) {
      var _this2 = this;
      var transformAttributes = function transformAttributes(attributes) {
        return Object.entries(attributes || {}).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];
          return {
            key: key,
            value: _this2._transformAnyValue(value)
          };
        });
      };
      var transformEvents = function transformEvents(events) {
        return (events || []).map(function (event) {
          return {
            timeUnixNano: hrtime.toNanos(event.time),
            name: event.name,
            attributes: transformAttributes(event.attributes)
          };
        });
      };
      return {
        traceId: span.spanContext.traceId,
        spanId: span.spanContext.spanId,
        parentSpanId: span.parentSpanId || '',
        name: span.name,
        kind: span.kind || 1,
        // INTERNAL by default
        startTimeUnixNano: hrtime.toNanos(span.startTime),
        endTimeUnixNano: hrtime.toNanos(span.endTime),
        attributes: transformAttributes(span.attributes),
        events: transformEvents(span.events)
      };
    }

    /**
     * Transforms a resource object into OTLP Resource format
     *
     * @private
     * @param {Object} resource - Resource information
     * @returns {Object} OTLP Resource format
     */
  }, {
    key: "_transformResource",
    value: function _transformResource(resource) {
      var _this3 = this;
      var attributes = resource.attributes || {};
      var keyValues = Object.entries(attributes).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        return {
          key: key,
          value: _this3._transformAnyValue(value)
        };
      });
      return {
        attributes: keyValues
      };
    }

    /**
     * Transforms an instrumentation scope into OTLP InstrumentationScope format
     *
     * @private
     * @param {Object} scope - Instrumentation scope information
     * @returns {Object} OTLP InstrumentationScope format
     */
  }, {
    key: "_transformInstrumentationScope",
    value: function _transformInstrumentationScope(scope) {
      var _this4 = this;
      return {
        name: scope.name || '',
        version: scope.version || '',
        attributes: (scope.attributes || []).map(function (attr) {
          return {
            key: attr.key,
            value: _this4._transformAnyValue(attr.value)
          };
        })
      };
    }

    /**
     * Transforms a JavaScript value into an OTLP AnyValue
     *
     * @private
     * @param {any} value - Value to transform
     * @returns {Object} OTLP AnyValue format
     */
  }, {
    key: "_transformAnyValue",
    value: function _transformAnyValue(value) {
      var _this5 = this;
      if (value === null || value === undefined) {
        return {
          stringValue: ''
        };
      }
      var type = exporter_typeof(value);
      if (type === 'string') {
        return {
          stringValue: value
        };
      } else if (type === 'number') {
        if (Number.isInteger(value)) {
          return {
            intValue: value.toString()
          };
        } else {
          return {
            doubleValue: value
          };
        }
      } else if (type === 'boolean') {
        return {
          boolValue: value
        };
      } else if (Array.isArray(value)) {
        return {
          arrayValue: {
            values: value.map(function (v) {
              return _this5._transformAnyValue(v);
            })
          }
        };
      } else if (type === 'object') {
        return {
          kvlistValue: {
            values: Object.entries(value).map(function (_ref5) {
              var _ref6 = _slicedToArray(_ref5, 2),
                k = _ref6[0],
                v = _ref6[1];
              return {
                key: k,
                value: _this5._transformAnyValue(v)
              };
            })
          }
        };
      }
      return {
        stringValue: String(value)
      };
    }
  }]);
}();
var spanExportQueue = [];
;// ./src/tracing/spanProcessor.js
function spanProcessor_typeof(o) { "@babel/helpers - typeof"; return spanProcessor_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, spanProcessor_typeof(o); }
function spanProcessor_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function spanProcessor_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, spanProcessor_toPropertyKey(o.key), o); } }
function spanProcessor_createClass(e, r, t) { return r && spanProcessor_defineProperties(e.prototype, r), t && spanProcessor_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function spanProcessor_toPropertyKey(t) { var i = spanProcessor_toPrimitive(t, "string"); return "symbol" == spanProcessor_typeof(i) ? i : i + ""; }
function spanProcessor_toPrimitive(t, r) { if ("object" != spanProcessor_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != spanProcessor_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SpanProcessor = /*#__PURE__*/function () {
  function SpanProcessor(exporter) {
    spanProcessor_classCallCheck(this, SpanProcessor);
    this.exporter = exporter;
    this.pendingSpans = new Map();
  }
  return spanProcessor_createClass(SpanProcessor, [{
    key: "onStart",
    value: function onStart(span, _parentContext) {
      this.pendingSpans.set(span.span.spanContext.spanId, span);
    }
  }, {
    key: "onEnd",
    value: function onEnd(span) {
      this.exporter.export([span.export()]);
      this.pendingSpans.delete(span.span.spanContext.spanId);
    }
  }]);
}();
;// ./src/tracing/span.js
function span_typeof(o) { "@babel/helpers - typeof"; return span_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, span_typeof(o); }
function span_slicedToArray(r, e) { return span_arrayWithHoles(r) || span_iterableToArrayLimit(r, e) || span_unsupportedIterableToArray(r, e) || span_nonIterableRest(); }
function span_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function span_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return span_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? span_arrayLikeToArray(r, a) : void 0; } }
function span_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function span_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function span_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function span_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function span_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, span_toPropertyKey(o.key), o); } }
function span_createClass(e, r, t) { return r && span_defineProperties(e.prototype, r), t && span_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function span_toPropertyKey(t) { var i = span_toPrimitive(t, "string"); return "symbol" == span_typeof(i) ? i : i + ""; }
function span_toPrimitive(t, r) { if ("object" != span_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != span_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Span = /*#__PURE__*/function () {
  function Span(options) {
    span_classCallCheck(this, Span);
    this.initReadableSpan(options);
    this.spanProcessor = options.spanProcessor;
    this.spanProcessor.onStart(this, options.context);
    if (options.attributes) {
      this.setAttributes(options.attributes);
    }
    return this;
  }
  return span_createClass(Span, [{
    key: "initReadableSpan",
    value: function initReadableSpan(options) {
      this.span = {
        name: options.name,
        kind: options.kind,
        spanContext: options.spanContext,
        parentSpanId: options.parentSpanId,
        startTime: options.startTime || hrtime.now(),
        endTime: [0, 0],
        status: {
          code: 0,
          message: ''
        },
        attributes: {
          'session.id': options.session.id
        },
        links: [],
        events: [],
        duration: 0,
        ended: false,
        resource: options.resource,
        instrumentationScope: options.scope,
        droppedAttributesCount: 0,
        droppedEventsCount: 0,
        droppedLinksCount: 0
      };
    }
  }, {
    key: "spanContext",
    value: function spanContext() {
      return this.span.spanContext;
    }
  }, {
    key: "spanId",
    get: function get() {
      return this.span.spanContext.spanId;
    }
  }, {
    key: "traceId",
    get: function get() {
      return this.span.spanContext.traceId;
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(key, value) {
      if (value == null || this.span.ended) return this;
      if (key.length === 0) return this;
      this.span.attributes[key] = value;
      return this;
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(attributes) {
      for (var _i = 0, _Object$entries = Object.entries(attributes); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = span_slicedToArray(_Object$entries[_i], 2),
          k = _Object$entries$_i[0],
          v = _Object$entries$_i[1];
        this.setAttribute(k, v);
      }
      return this;
    }
  }, {
    key: "addEvent",
    value: function addEvent(name) {
      var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var time = arguments.length > 2 ? arguments[2] : undefined;
      if (this.span.ended) return this;
      this.span.events.push({
        name: name,
        attributes: attributes,
        time: time || hrtime.now(),
        droppedAttributesCount: 0
      });
      return this;
    }
  }, {
    key: "isRecording",
    value: function isRecording() {
      return this.span.ended === false;
    }
  }, {
    key: "end",
    value: function end(attributes, time) {
      if (attributes) this.setAttributes(attributes);
      this.span.endTime = time || hrtime.now();
      this.span.ended = true;
      this.spanProcessor.onEnd(this);
    }
  }, {
    key: "export",
    value: function _export() {
      return this.span;
    }
  }]);
}();
;// ./src/tracing/tracer.js
function tracer_typeof(o) { "@babel/helpers - typeof"; return tracer_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, tracer_typeof(o); }
function tracer_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function tracer_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, tracer_toPropertyKey(o.key), o); } }
function tracer_createClass(e, r, t) { return r && tracer_defineProperties(e.prototype, r), t && tracer_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function tracer_toPropertyKey(t) { var i = tracer_toPrimitive(t, "string"); return "symbol" == tracer_typeof(i) ? i : i + ""; }
function tracer_toPrimitive(t, r) { if ("object" != tracer_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != tracer_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var Tracer = /*#__PURE__*/function () {
  function Tracer(tracing, spanProcessor) {
    tracer_classCallCheck(this, Tracer);
    this.spanProcessor = spanProcessor;
    this.tracing = tracing;
  }
  return tracer_createClass(Tracer, [{
    key: "startSpan",
    value: function startSpan(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.tracing.contextManager.active();
      var parentSpan = this.tracing.getSpan(context);
      var parentSpanContext = parentSpan === null || parentSpan === void 0 ? void 0 : parentSpan.spanContext();
      var spanId = id.gen(8);
      var traceId;
      var traceFlags = 0;
      var traceState = null;
      var parentSpanId;
      if (parentSpanContext) {
        traceId = parentSpanContext.traceId;
        traceState = parentSpanContext.traceState;
        parentSpanId = parentSpanContext.spanId;
      } else {
        traceId = id.gen(16);
      }
      var kind = 0;
      var spanContext = {
        traceId: traceId,
        spanId: spanId,
        traceFlags: traceFlags,
        traceState: traceState
      };
      var span = new Span({
        resource: this.tracing.resource,
        scope: this.tracing.scope,
        session: this.tracing.session.session,
        context: context,
        spanContext: spanContext,
        name: name,
        kind: kind,
        parentSpanId: parentSpanId,
        spanProcessor: this.spanProcessor,
        startTime: options.startTime
      });
      return span;
    }
  }]);
}();
;// ./src/tracing/tracing.js
function tracing_typeof(o) { "@babel/helpers - typeof"; return tracing_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, tracing_typeof(o); }
function tracing_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function tracing_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? tracing_ownKeys(Object(t), !0).forEach(function (r) { tracing_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : tracing_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function tracing_defineProperty(e, r, t) { return (r = tracing_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function tracing_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function tracing_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, tracing_toPropertyKey(o.key), o); } }
function tracing_createClass(e, r, t) { return r && tracing_defineProperties(e.prototype, r), t && tracing_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function tracing_toPropertyKey(t) { var i = tracing_toPrimitive(t, "string"); return "symbol" == tracing_typeof(i) ? i : i + ""; }
function tracing_toPrimitive(t, r) { if ("object" != tracing_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != tracing_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var SPAN_KEY = createContextKey('Rollbar Context Key SPAN');
var Tracing = /*#__PURE__*/function () {
  function Tracing(gWindow, options) {
    tracing_classCallCheck(this, Tracing);
    this.options = options;
    this.window = gWindow;
    this.session = new Session(this, options);
    this.createTracer();
  }
  return tracing_createClass(Tracing, [{
    key: "initSession",
    value: function initSession() {
      if (this.session) {
        this.session.init();
      }
    }
  }, {
    key: "sessionId",
    get: function get() {
      if (this.session) {
        return this.session.session.id;
      }
      return null;
    }
  }, {
    key: "resource",
    get: function get() {
      var _this$options$payload, _this$options$payload2;
      return {
        attributes: tracing_objectSpread(tracing_objectSpread({}, this.options.resource || {}), {}, {
          'rollbar.environment': (_this$options$payload = (_this$options$payload2 = this.options.payload) === null || _this$options$payload2 === void 0 ? void 0 : _this$options$payload2.environment) !== null && _this$options$payload !== void 0 ? _this$options$payload : this.options.environment
        })
      };
    }
  }, {
    key: "scope",
    get: function get() {
      return {
        name: 'rollbar-browser-js',
        version: this.options.version
      };
    }
  }, {
    key: "idGen",
    value: function idGen() {
      var bytes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
      return id.gen(bytes);
    }
  }, {
    key: "createTracer",
    value: function createTracer() {
      this.contextManager = new ContextManager();
      this.exporter = new SpanExporter();
      this.spanProcessor = new SpanProcessor(this.exporter);
      this.tracer = new Tracer(this, this.spanProcessor);
    }
  }, {
    key: "getTracer",
    value: function getTracer() {
      return this.tracer;
    }
  }, {
    key: "getSpan",
    value: function getSpan() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.contextManager.active();
      return context.getValue(SPAN_KEY);
    }
  }, {
    key: "setSpan",
    value: function setSpan() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.contextManager.active();
      var span = arguments.length > 1 ? arguments[1] : undefined;
      return context.setValue(SPAN_KEY, span);
    }
  }, {
    key: "startSpan",
    value: function startSpan(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.contextManager.active();
      return this.tracer.startSpan(name, options, context);
    }
  }, {
    key: "with",
    value: function _with(context, fn, thisArg) {
      var _this$contextManager;
      for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
      }
      return (_this$contextManager = this.contextManager).with.apply(_this$contextManager, [context, fn, thisArg].concat(args));
    }
  }, {
    key: "withSpan",
    value: function withSpan(name, options, fn, thisArg) {
      var span = this.startSpan(name, options);
      return this.with(this.setSpan(this.contextManager.active(), span), fn, thisArg, span);
    }
  }]);
}();

;// ./node_modules/@rrweb/record/dist/record.js
var record_excluded = ["inputs"],
  _excluded2 = ["inputId"],
  _excluded3 = ["inputs"],
  _excluded4 = ["inputId"],
  _excluded5 = ["type"];
function record_objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = record_objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function record_objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function record_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ record_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == record_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(record_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function record_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function record_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { record_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { record_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function record_slicedToArray(r, e) { return record_arrayWithHoles(r) || record_iterableToArrayLimit(r, e) || record_unsupportedIterableToArray(r, e) || record_nonIterableRest(); }
function record_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function record_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function record_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function record_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function record_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? record_ownKeys(Object(t), !0).forEach(function (r) { record_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : record_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function record_defineProperty(e, r, t) { return (r = record_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function record_toConsumableArray(r) { return record_arrayWithoutHoles(r) || record_iterableToArray(r) || record_unsupportedIterableToArray(r) || record_nonIterableSpread(); }
function record_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function record_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function record_arrayWithoutHoles(r) { if (Array.isArray(r)) return record_arrayLikeToArray(r); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == record_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function record_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = record_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n2 = 0, F = function F() {}; return { s: F, n: function n() { return _n2 >= r.length ? { done: !0 } : { done: !1, value: r[_n2++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function record_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return record_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? record_arrayLikeToArray(r, a) : void 0; } }
function record_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function record_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function record_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, record_toPropertyKey(o.key), o); } }
function record_createClass(e, r, t) { return r && record_defineProperties(e.prototype, r), t && record_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function record_toPropertyKey(t) { var i = record_toPrimitive(t, "string"); return "symbol" == record_typeof(i) ? i : i + ""; }
function record_toPrimitive(t, r) { if ("object" != record_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != record_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function record_typeof(o) { "@babel/helpers - typeof"; return record_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, record_typeof(o); }
var __defProp = Object.defineProperty;
var __defNormalProp = function __defNormalProp(obj, key, value) {
  return key in obj ? __defProp(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: value
  }) : obj[key] = value;
};
var __publicField = function __publicField(obj, key, value) {
  return __defNormalProp(obj, record_typeof(key) !== "symbol" ? key + "" : key, value);
};
var _a;
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = function __defNormalProp$1(obj, key, value) {
  return key in obj ? __defProp$1(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: value
  }) : obj[key] = value;
};
var __publicField$1 = function __publicField$1(obj, key, value) {
  return __defNormalProp$1(obj, record_typeof(key) !== "symbol" ? key + "" : key, value);
};
var NodeType$3 = /* @__PURE__ */function (NodeType2) {
  NodeType2[NodeType2["Document"] = 0] = "Document";
  NodeType2[NodeType2["DocumentType"] = 1] = "DocumentType";
  NodeType2[NodeType2["Element"] = 2] = "Element";
  NodeType2[NodeType2["Text"] = 3] = "Text";
  NodeType2[NodeType2["CDATA"] = 4] = "CDATA";
  NodeType2[NodeType2["Comment"] = 5] = "Comment";
  return NodeType2;
}(NodeType$3 || {});
var testableAccessors$1 = {
  Node: ["childNodes", "parentNode", "parentElement", "textContent"],
  ShadowRoot: ["host", "styleSheets"],
  Element: ["shadowRoot", "querySelector", "querySelectorAll"],
  MutationObserver: []
};
var testableMethods$1 = {
  Node: ["contains", "getRootNode"],
  ShadowRoot: ["getSelection"],
  Element: [],
  MutationObserver: ["constructor"]
};
var untaintedBasePrototype$1 = {};
var isAngularZonePresent$1 = function isAngularZonePresent$1() {
  return !!globalThis.Zone;
};
function getUntaintedPrototype$1(key) {
  if (untaintedBasePrototype$1[key]) return untaintedBasePrototype$1[key];
  var defaultObj = globalThis[key];
  var defaultPrototype = defaultObj.prototype;
  var accessorNames = key in testableAccessors$1 ? testableAccessors$1[key] : void 0;
  var isUntaintedAccessors = Boolean(accessorNames &&
  // @ts-expect-error 2345
  accessorNames.every(function (accessor) {
    var _a2, _b;
    return Boolean((_b = (_a2 = Object.getOwnPropertyDescriptor(defaultPrototype, accessor)) == null ? void 0 : _a2.get) == null ? void 0 : _b.toString().includes("[native code]"));
  }));
  var methodNames = key in testableMethods$1 ? testableMethods$1[key] : void 0;
  var isUntaintedMethods = Boolean(methodNames && methodNames.every(
  // @ts-expect-error 2345
  function (method) {
    var _a2;
    return typeof defaultPrototype[method] === "function" && ((_a2 = defaultPrototype[method]) == null ? void 0 : _a2.toString().includes("[native code]"));
  }));
  if (isUntaintedAccessors && isUntaintedMethods && !isAngularZonePresent$1()) {
    untaintedBasePrototype$1[key] = defaultObj.prototype;
    return defaultObj.prototype;
  }
  try {
    var iframeEl = document.createElement("iframe");
    document.body.appendChild(iframeEl);
    var win = iframeEl.contentWindow;
    if (!win) return defaultObj.prototype;
    var untaintedObject = win[key].prototype;
    document.body.removeChild(iframeEl);
    if (!untaintedObject) return defaultPrototype;
    return untaintedBasePrototype$1[key] = untaintedObject;
  } catch (_unused) {
    return defaultPrototype;
  }
}
var untaintedAccessorCache$1 = {};
function getUntaintedAccessor$1(key, instance, accessor) {
  var _a2;
  var cacheKey = "".concat(key, ".").concat(String(accessor));
  if (untaintedAccessorCache$1[cacheKey]) return untaintedAccessorCache$1[cacheKey].call(instance);
  var untaintedPrototype = getUntaintedPrototype$1(key);
  var untaintedAccessor = (_a2 = Object.getOwnPropertyDescriptor(untaintedPrototype, accessor)) == null ? void 0 : _a2.get;
  if (!untaintedAccessor) return instance[accessor];
  untaintedAccessorCache$1[cacheKey] = untaintedAccessor;
  return untaintedAccessor.call(instance);
}
var untaintedMethodCache$1 = {};
function getUntaintedMethod$1(key, instance, method) {
  var cacheKey = "".concat(key, ".").concat(String(method));
  if (untaintedMethodCache$1[cacheKey]) return untaintedMethodCache$1[cacheKey].bind(instance);
  var untaintedPrototype = getUntaintedPrototype$1(key);
  var untaintedMethod = untaintedPrototype[method];
  if (typeof untaintedMethod !== "function") return instance[method];
  untaintedMethodCache$1[cacheKey] = untaintedMethod;
  return untaintedMethod.bind(instance);
}
function childNodes$1(n2) {
  return getUntaintedAccessor$1("Node", n2, "childNodes");
}
function parentNode$1(n2) {
  return getUntaintedAccessor$1("Node", n2, "parentNode");
}
function parentElement$1(n2) {
  return getUntaintedAccessor$1("Node", n2, "parentElement");
}
function textContent$1(n2) {
  return getUntaintedAccessor$1("Node", n2, "textContent");
}
function contains$1(n2, other) {
  return getUntaintedMethod$1("Node", n2, "contains")(other);
}
function getRootNode$1(n2) {
  return getUntaintedMethod$1("Node", n2, "getRootNode")();
}
function host$1(n2) {
  if (!n2 || !("host" in n2)) return null;
  return getUntaintedAccessor$1("ShadowRoot", n2, "host");
}
function styleSheets$1(n2) {
  return n2.styleSheets;
}
function shadowRoot$1(n2) {
  if (!n2 || !("shadowRoot" in n2)) return null;
  return getUntaintedAccessor$1("Element", n2, "shadowRoot");
}
function querySelector$1(n2, selectors) {
  return getUntaintedAccessor$1("Element", n2, "querySelector")(selectors);
}
function querySelectorAll$1(n2, selectors) {
  return getUntaintedAccessor$1("Element", n2, "querySelectorAll")(selectors);
}
function mutationObserverCtor$1() {
  return getUntaintedPrototype$1("MutationObserver").constructor;
}
var index$1 = {
  childNodes: childNodes$1,
  parentNode: parentNode$1,
  parentElement: parentElement$1,
  textContent: textContent$1,
  contains: contains$1,
  getRootNode: getRootNode$1,
  host: host$1,
  styleSheets: styleSheets$1,
  shadowRoot: shadowRoot$1,
  querySelector: querySelector$1,
  querySelectorAll: querySelectorAll$1,
  mutationObserver: mutationObserverCtor$1
};
function isElement(n2) {
  return n2.nodeType === n2.ELEMENT_NODE;
}
function isShadowRoot(n2) {
  var hostEl =
  // anchor and textarea elements also have a `host` property
  // but only shadow roots have a `mode` property
  n2 && "host" in n2 && "mode" in n2 && index$1.host(n2) || null;
  return Boolean(hostEl && "shadowRoot" in hostEl && index$1.shadowRoot(hostEl) === n2);
}
function isNativeShadowDom(shadowRoot2) {
  return Object.prototype.toString.call(shadowRoot2) === "[object ShadowRoot]";
}
function fixBrowserCompatibilityIssuesInCSS(cssText) {
  if (cssText.includes(" background-clip: text;") && !cssText.includes(" -webkit-background-clip: text;")) {
    cssText = cssText.replace(/\sbackground-clip:\s*text;/g, " -webkit-background-clip: text; background-clip: text;");
  }
  return cssText;
}
function escapeImportStatement(rule2) {
  var cssText = rule2.cssText;
  if (cssText.split('"').length < 3) return cssText;
  var statement = ["@import", "url(".concat(JSON.stringify(rule2.href), ")")];
  if (rule2.layerName === "") {
    statement.push("layer");
  } else if (rule2.layerName) {
    statement.push("layer(".concat(rule2.layerName, ")"));
  }
  if (rule2.supportsText) {
    statement.push("supports(".concat(rule2.supportsText, ")"));
  }
  if (rule2.media.length) {
    statement.push(rule2.media.mediaText);
  }
  return statement.join(" ") + ";";
}
function stringifyStylesheet(s2) {
  try {
    var rules2 = s2.rules || s2.cssRules;
    if (!rules2) {
      return null;
    }
    var sheetHref = s2.href;
    if (!sheetHref && s2.ownerNode && s2.ownerNode.ownerDocument) {
      sheetHref = s2.ownerNode.ownerDocument.location.href;
    }
    var stringifiedRules = Array.from(rules2, function (rule2) {
      return stringifyRule(rule2, sheetHref);
    }).join("");
    return fixBrowserCompatibilityIssuesInCSS(stringifiedRules);
  } catch (error) {
    return null;
  }
}
function stringifyRule(rule2, sheetHref) {
  if (isCSSImportRule(rule2)) {
    var importStringified;
    try {
      importStringified =
      // for same-origin stylesheets,
      // we can access the imported stylesheet rules directly
      stringifyStylesheet(rule2.styleSheet) ||
      // work around browser issues with the raw string `@import url(...)` statement
      escapeImportStatement(rule2);
    } catch (error) {
      importStringified = rule2.cssText;
    }
    if (rule2.styleSheet.href) {
      return absolutifyURLs(importStringified, rule2.styleSheet.href);
    }
    return importStringified;
  } else {
    var ruleStringified = rule2.cssText;
    if (isCSSStyleRule(rule2) && rule2.selectorText.includes(":")) {
      ruleStringified = fixSafariColons(ruleStringified);
    }
    if (sheetHref) {
      return absolutifyURLs(ruleStringified, sheetHref);
    }
    return ruleStringified;
  }
}
function fixSafariColons(cssStringified) {
  var regex = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm;
  return cssStringified.replace(regex, "$1\\$2");
}
function isCSSImportRule(rule2) {
  return "styleSheet" in rule2;
}
function isCSSStyleRule(rule2) {
  return "selectorText" in rule2;
}
var Mirror = /*#__PURE__*/function () {
  function Mirror() {
    record_classCallCheck(this, Mirror);
    __publicField$1(this, "idNodeMap", /* @__PURE__ */new Map());
    __publicField$1(this, "nodeMetaMap", /* @__PURE__ */new WeakMap());
  }
  return record_createClass(Mirror, [{
    key: "getId",
    value: function getId(n2) {
      var _a2;
      if (!n2) return -1;
      var id = (_a2 = this.getMeta(n2)) == null ? void 0 : _a2.id;
      return id !== null && id !== void 0 ? id : -1;
    }
  }, {
    key: "getNode",
    value: function getNode(id) {
      return this.idNodeMap.get(id) || null;
    }
  }, {
    key: "getIds",
    value: function getIds() {
      return Array.from(this.idNodeMap.keys());
    }
  }, {
    key: "getMeta",
    value: function getMeta(n2) {
      return this.nodeMetaMap.get(n2) || null;
    }
    // removes the node from idNodeMap
    // doesn't remove the node from nodeMetaMap
  }, {
    key: "removeNodeFromMap",
    value: function removeNodeFromMap(n2) {
      var _this = this;
      var id = this.getId(n2);
      this.idNodeMap.delete(id);
      if (n2.childNodes) {
        n2.childNodes.forEach(function (childNode) {
          return _this.removeNodeFromMap(childNode);
        });
      }
    }
  }, {
    key: "has",
    value: function has(id) {
      return this.idNodeMap.has(id);
    }
  }, {
    key: "hasNode",
    value: function hasNode(node2) {
      return this.nodeMetaMap.has(node2);
    }
  }, {
    key: "add",
    value: function add(n2, meta) {
      var id = meta.id;
      this.idNodeMap.set(id, n2);
      this.nodeMetaMap.set(n2, meta);
    }
  }, {
    key: "replace",
    value: function replace(id, n2) {
      var oldNode = this.getNode(id);
      if (oldNode) {
        var meta = this.nodeMetaMap.get(oldNode);
        if (meta) this.nodeMetaMap.set(n2, meta);
      }
      this.idNodeMap.set(id, n2);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.idNodeMap = /* @__PURE__ */new Map();
      this.nodeMetaMap = /* @__PURE__ */new WeakMap();
    }
  }]);
}();
function createMirror$2() {
  return new Mirror();
}
function maskInputValue(_ref) {
  var element = _ref.element,
    maskInputOptions = _ref.maskInputOptions,
    tagName = _ref.tagName,
    type = _ref.type,
    value = _ref.value,
    maskInputFn = _ref.maskInputFn;
  var text = value || "";
  var actualType = type && toLowerCase(type);
  if (maskInputOptions[tagName.toLowerCase()] || actualType && maskInputOptions[actualType]) {
    if (maskInputFn) {
      text = maskInputFn(text, element);
    } else {
      text = "*".repeat(text.length);
    }
  }
  return text;
}
function toLowerCase(str) {
  return str.toLowerCase();
}
var ORIGINAL_ATTRIBUTE_NAME = "__rrweb_original__";
function is2DCanvasBlank(canvas) {
  var ctx = canvas.getContext("2d");
  if (!ctx) return true;
  var chunkSize = 50;
  for (var x2 = 0; x2 < canvas.width; x2 += chunkSize) {
    for (var y = 0; y < canvas.height; y += chunkSize) {
      var getImageData = ctx.getImageData;
      var originalGetImageData = ORIGINAL_ATTRIBUTE_NAME in getImageData ? getImageData[ORIGINAL_ATTRIBUTE_NAME] : getImageData;
      var pixelBuffer = new Uint32Array(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      originalGetImageData.call(ctx, x2, y, Math.min(chunkSize, canvas.width - x2), Math.min(chunkSize, canvas.height - y)).data.buffer);
      if (pixelBuffer.some(function (pixel) {
        return pixel !== 0;
      })) return false;
    }
  }
  return true;
}
function getInputType(element) {
  var type = element.type;
  return element.hasAttribute("data-rr-is-password") ? "password" : type ?
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  toLowerCase(type) : null;
}
function extractFileExtension(path, baseURL) {
  var _ref2;
  var url;
  try {
    url = new URL(path, baseURL !== null && baseURL !== void 0 ? baseURL : window.location.href);
  } catch (err) {
    return null;
  }
  var regex = /\.([0-9a-z]+)(?:$)/i;
  var match = url.pathname.match(regex);
  return (_ref2 = match == null ? void 0 : match[1]) !== null && _ref2 !== void 0 ? _ref2 : null;
}
function extractOrigin(url) {
  var origin = "";
  if (url.indexOf("//") > -1) {
    origin = url.split("/").slice(0, 3).join("/");
  } else {
    origin = url.split("/")[0];
  }
  origin = origin.split("?")[0];
  return origin;
}
var URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm;
var URL_PROTOCOL_MATCH = /^(?:[a-z+]+:)?\/\//i;
var URL_WWW_MATCH = /^www\..*/i;
var DATA_URI = /^(data:)([^,]*),(.*)/i;
function absolutifyURLs(cssText, href) {
  return (cssText || "").replace(URL_IN_CSS_REF, function (origin, quote1, path1, quote2, path2, path3) {
    var filePath = path1 || path2 || path3;
    var maybeQuote = quote1 || quote2 || "";
    if (!filePath) {
      return origin;
    }
    if (URL_PROTOCOL_MATCH.test(filePath) || URL_WWW_MATCH.test(filePath)) {
      return "url(".concat(maybeQuote).concat(filePath).concat(maybeQuote, ")");
    }
    if (DATA_URI.test(filePath)) {
      return "url(".concat(maybeQuote).concat(filePath).concat(maybeQuote, ")");
    }
    if (filePath[0] === "/") {
      return "url(".concat(maybeQuote).concat(extractOrigin(href) + filePath).concat(maybeQuote, ")");
    }
    var stack = href.split("/");
    var parts = filePath.split("/");
    stack.pop();
    var _iterator = record_createForOfIteratorHelper(parts),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var part = _step.value;
        if (part === ".") {
          continue;
        } else if (part === "..") {
          stack.pop();
        } else {
          stack.push(part);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return "url(".concat(maybeQuote).concat(stack.join("/")).concat(maybeQuote, ")");
  });
}
function normalizeCssString(cssText) {
  return cssText.replace(/(\/\*[^*]*\*\/)|[\s;]/g, "");
}
function splitCssText(cssText, style) {
  var childNodes2 = Array.from(style.childNodes);
  var splits = [];
  if (childNodes2.length > 1 && cssText && typeof cssText === "string") {
    var cssTextNorm = normalizeCssString(cssText);
    for (var i2 = 1; i2 < childNodes2.length; i2++) {
      if (childNodes2[i2].textContent && typeof childNodes2[i2].textContent === "string") {
        var textContentNorm = normalizeCssString(childNodes2[i2].textContent);
        for (var j = 3; j < textContentNorm.length; j++) {
          var bit = textContentNorm.substring(0, j);
          if (cssTextNorm.split(bit).length === 2) {
            var splitNorm = cssTextNorm.indexOf(bit);
            for (var k = splitNorm; k < cssText.length; k++) {
              if (normalizeCssString(cssText.substring(0, k)).length === splitNorm) {
                splits.push(cssText.substring(0, k));
                cssText = cssText.substring(k);
                break;
              }
            }
            break;
          }
        }
      }
    }
  }
  splits.push(cssText);
  return splits;
}
function markCssSplits(cssText, style) {
  return splitCssText(cssText, style).join("/* rr_split */");
}
var _id = 1;
var tagNameRegex = new RegExp("[^a-z0-9-_:]");
var IGNORED_NODE = -2;
function genId() {
  return _id++;
}
function getValidTagName$1(element) {
  if (element instanceof HTMLFormElement) {
    return "form";
  }
  var processedTagName = toLowerCase(element.tagName);
  if (tagNameRegex.test(processedTagName)) {
    return "div";
  }
  return processedTagName;
}
var canvasService;
var canvasCtx;
var SRCSET_NOT_SPACES = /^[^ \t\n\r\u000c]+/;
var SRCSET_COMMAS_OR_SPACES = /^[, \t\n\r\u000c]+/;
function getAbsoluteSrcsetString(doc, attributeValue) {
  if (attributeValue.trim() === "") {
    return attributeValue;
  }
  var pos = 0;
  function collectCharacters(regEx) {
    var chars2;
    var match = regEx.exec(attributeValue.substring(pos));
    if (match) {
      chars2 = match[0];
      pos += chars2.length;
      return chars2;
    }
    return "";
  }
  var output = [];
  while (true) {
    collectCharacters(SRCSET_COMMAS_OR_SPACES);
    if (pos >= attributeValue.length) {
      break;
    }
    var url = collectCharacters(SRCSET_NOT_SPACES);
    if (url.slice(-1) === ",") {
      url = absoluteToDoc(doc, url.substring(0, url.length - 1));
      output.push(url);
    } else {
      var descriptorsStr = "";
      url = absoluteToDoc(doc, url);
      var inParens = false;
      while (true) {
        var c2 = attributeValue.charAt(pos);
        if (c2 === "") {
          output.push((url + descriptorsStr).trim());
          break;
        } else if (!inParens) {
          if (c2 === ",") {
            pos += 1;
            output.push((url + descriptorsStr).trim());
            break;
          } else if (c2 === "(") {
            inParens = true;
          }
        } else {
          if (c2 === ")") {
            inParens = false;
          }
        }
        descriptorsStr += c2;
        pos += 1;
      }
    }
  }
  return output.join(", ");
}
var cachedDocument = /* @__PURE__ */new WeakMap();
function absoluteToDoc(doc, attributeValue) {
  if (!attributeValue || attributeValue.trim() === "") {
    return attributeValue;
  }
  return getHref(doc, attributeValue);
}
function isSVGElement(el) {
  return Boolean(el.tagName === "svg" || el.ownerSVGElement);
}
function getHref(doc, customHref) {
  var a2 = cachedDocument.get(doc);
  if (!a2) {
    a2 = doc.createElement("a");
    cachedDocument.set(doc, a2);
  }
  if (!customHref) {
    customHref = "";
  } else if (customHref.startsWith("blob:") || customHref.startsWith("data:")) {
    return customHref;
  }
  a2.setAttribute("href", customHref);
  return a2.href;
}
function transformAttribute(doc, tagName, name, value) {
  if (!value) {
    return value;
  }
  if (name === "src" || name === "href" && !(tagName === "use" && value[0] === "#")) {
    return absoluteToDoc(doc, value);
  } else if (name === "xlink:href" && value[0] !== "#") {
    return absoluteToDoc(doc, value);
  } else if (name === "background" && (tagName === "table" || tagName === "td" || tagName === "th")) {
    return absoluteToDoc(doc, value);
  } else if (name === "srcset") {
    return getAbsoluteSrcsetString(doc, value);
  } else if (name === "style") {
    return absolutifyURLs(value, getHref(doc));
  } else if (tagName === "object" && name === "data") {
    return absoluteToDoc(doc, value);
  }
  return value;
}
function ignoreAttribute(tagName, name, _value) {
  return (tagName === "video" || tagName === "audio") && name === "autoplay";
}
function _isBlockedElement(element, blockClass, blockSelector) {
  try {
    if (typeof blockClass === "string") {
      if (element.classList.contains(blockClass)) {
        return true;
      }
    } else {
      for (var eIndex = element.classList.length; eIndex--;) {
        var className = element.classList[eIndex];
        if (blockClass.test(className)) {
          return true;
        }
      }
    }
    if (blockSelector) {
      return element.matches(blockSelector);
    }
  } catch (e2) {}
  return false;
}
function classMatchesRegex(node2, regex, checkAncestors) {
  if (!node2) return false;
  if (node2.nodeType !== node2.ELEMENT_NODE) {
    if (!checkAncestors) return false;
    return classMatchesRegex(index$1.parentNode(node2), regex, checkAncestors);
  }
  for (var eIndex = node2.classList.length; eIndex--;) {
    var className = node2.classList[eIndex];
    if (regex.test(className)) {
      return true;
    }
  }
  if (!checkAncestors) return false;
  return classMatchesRegex(index$1.parentNode(node2), regex, checkAncestors);
}
function needMaskingText(node2, maskTextClass, maskTextSelector, checkAncestors) {
  var el;
  if (isElement(node2)) {
    el = node2;
    if (!index$1.childNodes(el).length) {
      return false;
    }
  } else if (index$1.parentElement(node2) === null) {
    return false;
  } else {
    el = index$1.parentElement(node2);
  }
  try {
    if (typeof maskTextClass === "string") {
      if (checkAncestors) {
        if (el.closest(".".concat(maskTextClass))) return true;
      } else {
        if (el.classList.contains(maskTextClass)) return true;
      }
    } else {
      if (classMatchesRegex(el, maskTextClass, checkAncestors)) return true;
    }
    if (maskTextSelector) {
      if (checkAncestors) {
        if (el.closest(maskTextSelector)) return true;
      } else {
        if (el.matches(maskTextSelector)) return true;
      }
    }
  } catch (e2) {}
  return false;
}
function onceIframeLoaded(iframeEl, listener, iframeLoadTimeout) {
  var win = iframeEl.contentWindow;
  if (!win) {
    return;
  }
  var fired = false;
  var readyState;
  try {
    readyState = win.document.readyState;
  } catch (error) {
    return;
  }
  if (readyState !== "complete") {
    var timer = setTimeout(function () {
      if (!fired) {
        listener();
        fired = true;
      }
    }, iframeLoadTimeout);
    iframeEl.addEventListener("load", function () {
      clearTimeout(timer);
      fired = true;
      listener();
    });
    return;
  }
  var blankUrl = "about:blank";
  if (win.location.href !== blankUrl || iframeEl.src === blankUrl || iframeEl.src === "") {
    setTimeout(listener, 0);
    return iframeEl.addEventListener("load", listener);
  }
  iframeEl.addEventListener("load", listener);
}
function onceStylesheetLoaded(link, listener, styleSheetLoadTimeout) {
  var fired = false;
  var styleSheetLoaded;
  try {
    styleSheetLoaded = link.sheet;
  } catch (error) {
    return;
  }
  if (styleSheetLoaded) return;
  var timer = setTimeout(function () {
    if (!fired) {
      listener();
      fired = true;
    }
  }, styleSheetLoadTimeout);
  link.addEventListener("load", function () {
    clearTimeout(timer);
    fired = true;
    listener();
  });
}
function serializeNode(n2, options) {
  var doc = options.doc,
    mirror2 = options.mirror,
    blockClass = options.blockClass,
    blockSelector = options.blockSelector,
    needsMask = options.needsMask,
    inlineStylesheet = options.inlineStylesheet,
    _options$maskInputOpt = options.maskInputOptions,
    maskInputOptions = _options$maskInputOpt === void 0 ? {} : _options$maskInputOpt,
    maskTextFn = options.maskTextFn,
    maskInputFn = options.maskInputFn,
    _options$dataURLOptio = options.dataURLOptions,
    dataURLOptions = _options$dataURLOptio === void 0 ? {} : _options$dataURLOptio,
    inlineImages = options.inlineImages,
    recordCanvas = options.recordCanvas,
    keepIframeSrcFn = options.keepIframeSrcFn,
    _options$newlyAddedEl = options.newlyAddedElement,
    newlyAddedElement = _options$newlyAddedEl === void 0 ? false : _options$newlyAddedEl,
    _options$cssCaptured = options.cssCaptured,
    cssCaptured = _options$cssCaptured === void 0 ? false : _options$cssCaptured;
  var rootId = getRootId(doc, mirror2);
  switch (n2.nodeType) {
    case n2.DOCUMENT_NODE:
      if (n2.compatMode !== "CSS1Compat") {
        return {
          type: NodeType$3.Document,
          childNodes: [],
          compatMode: n2.compatMode
          // probably "BackCompat"
        };
      } else {
        return {
          type: NodeType$3.Document,
          childNodes: []
        };
      }
    case n2.DOCUMENT_TYPE_NODE:
      return {
        type: NodeType$3.DocumentType,
        name: n2.name,
        publicId: n2.publicId,
        systemId: n2.systemId,
        rootId: rootId
      };
    case n2.ELEMENT_NODE:
      return serializeElementNode(n2, {
        doc: doc,
        blockClass: blockClass,
        blockSelector: blockSelector,
        inlineStylesheet: inlineStylesheet,
        maskInputOptions: maskInputOptions,
        maskInputFn: maskInputFn,
        dataURLOptions: dataURLOptions,
        inlineImages: inlineImages,
        recordCanvas: recordCanvas,
        keepIframeSrcFn: keepIframeSrcFn,
        newlyAddedElement: newlyAddedElement,
        rootId: rootId
      });
    case n2.TEXT_NODE:
      return serializeTextNode(n2, {
        doc: doc,
        needsMask: needsMask,
        maskTextFn: maskTextFn,
        rootId: rootId,
        cssCaptured: cssCaptured
      });
    case n2.CDATA_SECTION_NODE:
      return {
        type: NodeType$3.CDATA,
        textContent: "",
        rootId: rootId
      };
    case n2.COMMENT_NODE:
      return {
        type: NodeType$3.Comment,
        textContent: index$1.textContent(n2) || "",
        rootId: rootId
      };
    default:
      return false;
  }
}
function getRootId(doc, mirror2) {
  if (!mirror2.hasNode(doc)) return void 0;
  var docId = mirror2.getId(doc);
  return docId === 1 ? void 0 : docId;
}
function serializeTextNode(n2, options) {
  var needsMask = options.needsMask,
    maskTextFn = options.maskTextFn,
    rootId = options.rootId,
    cssCaptured = options.cssCaptured;
  var parent = index$1.parentNode(n2);
  var parentTagName = parent && parent.tagName;
  var textContent2 = "";
  var isStyle = parentTagName === "STYLE" ? true : void 0;
  var isScript = parentTagName === "SCRIPT" ? true : void 0;
  if (isScript) {
    textContent2 = "SCRIPT_PLACEHOLDER";
  } else if (!cssCaptured) {
    textContent2 = index$1.textContent(n2);
    if (isStyle && textContent2) {
      textContent2 = absolutifyURLs(textContent2, getHref(options.doc));
    }
  }
  if (!isStyle && !isScript && textContent2 && needsMask) {
    textContent2 = maskTextFn ? maskTextFn(textContent2, index$1.parentElement(n2)) : textContent2.replace(/[\S]/g, "*");
  }
  return {
    type: NodeType$3.Text,
    textContent: textContent2 || "",
    rootId: rootId
  };
}
function serializeElementNode(n2, options) {
  var doc = options.doc,
    blockClass = options.blockClass,
    blockSelector = options.blockSelector,
    inlineStylesheet = options.inlineStylesheet,
    _options$maskInputOpt2 = options.maskInputOptions,
    maskInputOptions = _options$maskInputOpt2 === void 0 ? {} : _options$maskInputOpt2,
    maskInputFn = options.maskInputFn,
    _options$dataURLOptio2 = options.dataURLOptions,
    dataURLOptions = _options$dataURLOptio2 === void 0 ? {} : _options$dataURLOptio2,
    inlineImages = options.inlineImages,
    recordCanvas = options.recordCanvas,
    keepIframeSrcFn = options.keepIframeSrcFn,
    _options$newlyAddedEl2 = options.newlyAddedElement,
    newlyAddedElement = _options$newlyAddedEl2 === void 0 ? false : _options$newlyAddedEl2,
    rootId = options.rootId;
  var needBlock = _isBlockedElement(n2, blockClass, blockSelector);
  var tagName = getValidTagName$1(n2);
  var attributes = {};
  var len = n2.attributes.length;
  for (var i2 = 0; i2 < len; i2++) {
    var attr = n2.attributes[i2];
    if (!ignoreAttribute(tagName, attr.name, attr.value)) {
      attributes[attr.name] = transformAttribute(doc, tagName, toLowerCase(attr.name), attr.value);
    }
  }
  if (tagName === "link" && inlineStylesheet) {
    var stylesheet = Array.from(doc.styleSheets).find(function (s2) {
      return s2.href === n2.href;
    });
    var cssText = null;
    if (stylesheet) {
      cssText = stringifyStylesheet(stylesheet);
    }
    if (cssText) {
      delete attributes.rel;
      delete attributes.href;
      attributes._cssText = cssText;
    }
  }
  if (tagName === "style" && n2.sheet) {
    var _cssText = stringifyStylesheet(n2.sheet);
    if (_cssText) {
      if (n2.childNodes.length > 1) {
        _cssText = markCssSplits(_cssText, n2);
      }
      attributes._cssText = _cssText;
    }
  }
  if (tagName === "input" || tagName === "textarea" || tagName === "select") {
    var value = n2.value;
    var checked = n2.checked;
    if (attributes.type !== "radio" && attributes.type !== "checkbox" && attributes.type !== "submit" && attributes.type !== "button" && value) {
      attributes.value = maskInputValue({
        element: n2,
        type: getInputType(n2),
        tagName: tagName,
        value: value,
        maskInputOptions: maskInputOptions,
        maskInputFn: maskInputFn
      });
    } else if (checked) {
      attributes.checked = checked;
    }
  }
  if (tagName === "option") {
    if (n2.selected && !maskInputOptions["select"]) {
      attributes.selected = true;
    } else {
      delete attributes.selected;
    }
  }
  if (tagName === "dialog" && n2.open) {
    attributes.rr_open_mode = n2.matches("dialog:modal") ? "modal" : "non-modal";
  }
  if (tagName === "canvas" && recordCanvas) {
    if (n2.__context === "2d") {
      if (!is2DCanvasBlank(n2)) {
        attributes.rr_dataURL = n2.toDataURL(dataURLOptions.type, dataURLOptions.quality);
      }
    } else if (!("__context" in n2)) {
      var canvasDataURL = n2.toDataURL(dataURLOptions.type, dataURLOptions.quality);
      var blankCanvas = doc.createElement("canvas");
      blankCanvas.width = n2.width;
      blankCanvas.height = n2.height;
      var blankCanvasDataURL = blankCanvas.toDataURL(dataURLOptions.type, dataURLOptions.quality);
      if (canvasDataURL !== blankCanvasDataURL) {
        attributes.rr_dataURL = canvasDataURL;
      }
    }
  }
  if (tagName === "img" && inlineImages) {
    if (!canvasService) {
      canvasService = doc.createElement("canvas");
      canvasCtx = canvasService.getContext("2d");
    }
    var image = n2;
    var imageSrc = image.currentSrc || image.getAttribute("src") || "<unknown-src>";
    var priorCrossOrigin = image.crossOrigin;
    var _recordInlineImage = function recordInlineImage() {
      image.removeEventListener("load", _recordInlineImage);
      try {
        canvasService.width = image.naturalWidth;
        canvasService.height = image.naturalHeight;
        canvasCtx.drawImage(image, 0, 0);
        attributes.rr_dataURL = canvasService.toDataURL(dataURLOptions.type, dataURLOptions.quality);
      } catch (err) {
        if (image.crossOrigin !== "anonymous") {
          image.crossOrigin = "anonymous";
          if (image.complete && image.naturalWidth !== 0) _recordInlineImage();else image.addEventListener("load", _recordInlineImage);
          return;
        } else {
          console.warn("Cannot inline img src=".concat(imageSrc, "! Error: ").concat(err));
        }
      }
      if (image.crossOrigin === "anonymous") {
        priorCrossOrigin ? attributes.crossOrigin = priorCrossOrigin : image.removeAttribute("crossorigin");
      }
    };
    if (image.complete && image.naturalWidth !== 0) _recordInlineImage();else image.addEventListener("load", _recordInlineImage);
  }
  if (tagName === "audio" || tagName === "video") {
    var mediaAttributes = attributes;
    mediaAttributes.rr_mediaState = n2.paused ? "paused" : "played";
    mediaAttributes.rr_mediaCurrentTime = n2.currentTime;
    mediaAttributes.rr_mediaPlaybackRate = n2.playbackRate;
    mediaAttributes.rr_mediaMuted = n2.muted;
    mediaAttributes.rr_mediaLoop = n2.loop;
    mediaAttributes.rr_mediaVolume = n2.volume;
  }
  if (!newlyAddedElement) {
    if (n2.scrollLeft) {
      attributes.rr_scrollLeft = n2.scrollLeft;
    }
    if (n2.scrollTop) {
      attributes.rr_scrollTop = n2.scrollTop;
    }
  }
  if (needBlock) {
    var _n2$getBoundingClient = n2.getBoundingClientRect(),
      width = _n2$getBoundingClient.width,
      height = _n2$getBoundingClient.height;
    attributes = {
      class: attributes.class,
      rr_width: "".concat(width, "px"),
      rr_height: "".concat(height, "px")
    };
  }
  if (tagName === "iframe" && !keepIframeSrcFn(attributes.src)) {
    if (!n2.contentDocument) {
      attributes.rr_src = attributes.src;
    }
    delete attributes.src;
  }
  var isCustomElement;
  try {
    if (customElements.get(tagName)) isCustomElement = true;
  } catch (e2) {}
  return {
    type: NodeType$3.Element,
    tagName: tagName,
    attributes: attributes,
    childNodes: [],
    isSVG: isSVGElement(n2) || void 0,
    needBlock: needBlock,
    rootId: rootId,
    isCustom: isCustomElement
  };
}
function lowerIfExists(maybeAttr) {
  if (maybeAttr === void 0 || maybeAttr === null) {
    return "";
  } else {
    return maybeAttr.toLowerCase();
  }
}
function slimDOMExcluded(sn, slimDOMOptions) {
  if (slimDOMOptions.comment && sn.type === NodeType$3.Comment) {
    return true;
  } else if (sn.type === NodeType$3.Element) {
    if (slimDOMOptions.script && (
    // script tag
    sn.tagName === "script" ||
    // (module)preload link
    sn.tagName === "link" && (sn.attributes.rel === "preload" || sn.attributes.rel === "modulepreload") && sn.attributes.as === "script" ||
    // prefetch link
    sn.tagName === "link" && sn.attributes.rel === "prefetch" && typeof sn.attributes.href === "string" && extractFileExtension(sn.attributes.href) === "js")) {
      return true;
    } else if (slimDOMOptions.headFavicon && (sn.tagName === "link" && sn.attributes.rel === "shortcut icon" || sn.tagName === "meta" && (lowerIfExists(sn.attributes.name).match(/^msapplication-tile(image|color)$/) || lowerIfExists(sn.attributes.name) === "application-name" || lowerIfExists(sn.attributes.rel) === "icon" || lowerIfExists(sn.attributes.rel) === "apple-touch-icon" || lowerIfExists(sn.attributes.rel) === "shortcut icon"))) {
      return true;
    } else if (sn.tagName === "meta") {
      if (slimDOMOptions.headMetaDescKeywords && lowerIfExists(sn.attributes.name).match(/^description|keywords$/)) {
        return true;
      } else if (slimDOMOptions.headMetaSocial && (lowerIfExists(sn.attributes.property).match(/^(og|twitter|fb):/) ||
      // og = opengraph (facebook)
      lowerIfExists(sn.attributes.name).match(/^(og|twitter):/) || lowerIfExists(sn.attributes.name) === "pinterest")) {
        return true;
      } else if (slimDOMOptions.headMetaRobots && (lowerIfExists(sn.attributes.name) === "robots" || lowerIfExists(sn.attributes.name) === "googlebot" || lowerIfExists(sn.attributes.name) === "bingbot")) {
        return true;
      } else if (slimDOMOptions.headMetaHttpEquiv && sn.attributes["http-equiv"] !== void 0) {
        return true;
      } else if (slimDOMOptions.headMetaAuthorship && (lowerIfExists(sn.attributes.name) === "author" || lowerIfExists(sn.attributes.name) === "generator" || lowerIfExists(sn.attributes.name) === "framework" || lowerIfExists(sn.attributes.name) === "publisher" || lowerIfExists(sn.attributes.name) === "progid" || lowerIfExists(sn.attributes.property).match(/^article:/) || lowerIfExists(sn.attributes.property).match(/^product:/))) {
        return true;
      } else if (slimDOMOptions.headMetaVerification && (lowerIfExists(sn.attributes.name) === "google-site-verification" || lowerIfExists(sn.attributes.name) === "yandex-verification" || lowerIfExists(sn.attributes.name) === "csrf-token" || lowerIfExists(sn.attributes.name) === "p:domain_verify" || lowerIfExists(sn.attributes.name) === "verify-v1" || lowerIfExists(sn.attributes.name) === "verification" || lowerIfExists(sn.attributes.name) === "shopify-checkout-api-token")) {
        return true;
      }
    }
  }
  return false;
}
function serializeNodeWithId(n2, options) {
  var doc = options.doc,
    mirror2 = options.mirror,
    blockClass = options.blockClass,
    blockSelector = options.blockSelector,
    maskTextClass = options.maskTextClass,
    maskTextSelector = options.maskTextSelector,
    _options$skipChild = options.skipChild,
    skipChild = _options$skipChild === void 0 ? false : _options$skipChild,
    _options$inlineStyles = options.inlineStylesheet,
    inlineStylesheet = _options$inlineStyles === void 0 ? true : _options$inlineStyles,
    _options$maskInputOpt3 = options.maskInputOptions,
    maskInputOptions = _options$maskInputOpt3 === void 0 ? {} : _options$maskInputOpt3,
    maskTextFn = options.maskTextFn,
    maskInputFn = options.maskInputFn,
    slimDOMOptions = options.slimDOMOptions,
    _options$dataURLOptio3 = options.dataURLOptions,
    dataURLOptions = _options$dataURLOptio3 === void 0 ? {} : _options$dataURLOptio3,
    _options$inlineImages = options.inlineImages,
    inlineImages = _options$inlineImages === void 0 ? false : _options$inlineImages,
    _options$recordCanvas = options.recordCanvas,
    recordCanvas = _options$recordCanvas === void 0 ? false : _options$recordCanvas,
    onSerialize = options.onSerialize,
    onIframeLoad = options.onIframeLoad,
    _options$iframeLoadTi = options.iframeLoadTimeout,
    iframeLoadTimeout = _options$iframeLoadTi === void 0 ? 5e3 : _options$iframeLoadTi,
    onStylesheetLoad = options.onStylesheetLoad,
    _options$stylesheetLo = options.stylesheetLoadTimeout,
    stylesheetLoadTimeout = _options$stylesheetLo === void 0 ? 5e3 : _options$stylesheetLo,
    _options$keepIframeSr = options.keepIframeSrcFn,
    keepIframeSrcFn = _options$keepIframeSr === void 0 ? function () {
      return false;
    } : _options$keepIframeSr,
    _options$newlyAddedEl3 = options.newlyAddedElement,
    newlyAddedElement = _options$newlyAddedEl3 === void 0 ? false : _options$newlyAddedEl3,
    _options$cssCaptured2 = options.cssCaptured,
    cssCaptured = _options$cssCaptured2 === void 0 ? false : _options$cssCaptured2;
  var needsMask = options.needsMask;
  var _options$preserveWhit = options.preserveWhiteSpace,
    preserveWhiteSpace = _options$preserveWhit === void 0 ? true : _options$preserveWhit;
  if (!needsMask) {
    var checkAncestors = needsMask === void 0;
    needsMask = needMaskingText(n2, maskTextClass, maskTextSelector, checkAncestors);
  }
  var _serializedNode = serializeNode(n2, {
    doc: doc,
    mirror: mirror2,
    blockClass: blockClass,
    blockSelector: blockSelector,
    needsMask: needsMask,
    inlineStylesheet: inlineStylesheet,
    maskInputOptions: maskInputOptions,
    maskTextFn: maskTextFn,
    maskInputFn: maskInputFn,
    dataURLOptions: dataURLOptions,
    inlineImages: inlineImages,
    recordCanvas: recordCanvas,
    keepIframeSrcFn: keepIframeSrcFn,
    newlyAddedElement: newlyAddedElement,
    cssCaptured: cssCaptured
  });
  if (!_serializedNode) {
    console.warn(n2, "not serialized");
    return null;
  }
  var id;
  if (mirror2.hasNode(n2)) {
    id = mirror2.getId(n2);
  } else if (slimDOMExcluded(_serializedNode, slimDOMOptions) || !preserveWhiteSpace && _serializedNode.type === NodeType$3.Text && !_serializedNode.textContent.replace(/^\s+|\s+$/gm, "").length) {
    id = IGNORED_NODE;
  } else {
    id = genId();
  }
  var serializedNode = Object.assign(_serializedNode, {
    id: id
  });
  mirror2.add(n2, serializedNode);
  if (id === IGNORED_NODE) {
    return null;
  }
  if (onSerialize) {
    onSerialize(n2);
  }
  var recordChild = !skipChild;
  if (serializedNode.type === NodeType$3.Element) {
    recordChild = recordChild && !serializedNode.needBlock;
    delete serializedNode.needBlock;
    var shadowRootEl = index$1.shadowRoot(n2);
    if (shadowRootEl && isNativeShadowDom(shadowRootEl)) serializedNode.isShadowHost = true;
  }
  if ((serializedNode.type === NodeType$3.Document || serializedNode.type === NodeType$3.Element) && recordChild) {
    if (slimDOMOptions.headWhitespace && serializedNode.type === NodeType$3.Element && serializedNode.tagName === "head") {
      preserveWhiteSpace = false;
    }
    var bypassOptions = {
      doc: doc,
      mirror: mirror2,
      blockClass: blockClass,
      blockSelector: blockSelector,
      needsMask: needsMask,
      maskTextClass: maskTextClass,
      maskTextSelector: maskTextSelector,
      skipChild: skipChild,
      inlineStylesheet: inlineStylesheet,
      maskInputOptions: maskInputOptions,
      maskTextFn: maskTextFn,
      maskInputFn: maskInputFn,
      slimDOMOptions: slimDOMOptions,
      dataURLOptions: dataURLOptions,
      inlineImages: inlineImages,
      recordCanvas: recordCanvas,
      preserveWhiteSpace: preserveWhiteSpace,
      onSerialize: onSerialize,
      onIframeLoad: onIframeLoad,
      iframeLoadTimeout: iframeLoadTimeout,
      onStylesheetLoad: onStylesheetLoad,
      stylesheetLoadTimeout: stylesheetLoadTimeout,
      keepIframeSrcFn: keepIframeSrcFn,
      cssCaptured: false
    };
    if (serializedNode.type === NodeType$3.Element && serializedNode.tagName === "textarea" && serializedNode.attributes.value !== void 0) ;else {
      if (serializedNode.type === NodeType$3.Element && serializedNode.attributes._cssText !== void 0 && typeof serializedNode.attributes._cssText === "string") {
        bypassOptions.cssCaptured = true;
      }
      for (var _i = 0, _Array$from = Array.from(index$1.childNodes(n2)); _i < _Array$from.length; _i++) {
        var childN = _Array$from[_i];
        var serializedChildNode = serializeNodeWithId(childN, bypassOptions);
        if (serializedChildNode) {
          serializedNode.childNodes.push(serializedChildNode);
        }
      }
    }
    var _shadowRootEl = null;
    if (isElement(n2) && (_shadowRootEl = index$1.shadowRoot(n2))) {
      for (var _i2 = 0, _Array$from2 = Array.from(index$1.childNodes(_shadowRootEl)); _i2 < _Array$from2.length; _i2++) {
        var _childN = _Array$from2[_i2];
        var _serializedChildNode = serializeNodeWithId(_childN, bypassOptions);
        if (_serializedChildNode) {
          isNativeShadowDom(_shadowRootEl) && (_serializedChildNode.isShadow = true);
          serializedNode.childNodes.push(_serializedChildNode);
        }
      }
    }
  }
  var parent = index$1.parentNode(n2);
  if (parent && isShadowRoot(parent) && isNativeShadowDom(parent)) {
    serializedNode.isShadow = true;
  }
  if (serializedNode.type === NodeType$3.Element && serializedNode.tagName === "iframe") {
    onceIframeLoaded(n2, function () {
      var iframeDoc = n2.contentDocument;
      if (iframeDoc && onIframeLoad) {
        var serializedIframeNode = serializeNodeWithId(iframeDoc, {
          doc: iframeDoc,
          mirror: mirror2,
          blockClass: blockClass,
          blockSelector: blockSelector,
          needsMask: needsMask,
          maskTextClass: maskTextClass,
          maskTextSelector: maskTextSelector,
          skipChild: false,
          inlineStylesheet: inlineStylesheet,
          maskInputOptions: maskInputOptions,
          maskTextFn: maskTextFn,
          maskInputFn: maskInputFn,
          slimDOMOptions: slimDOMOptions,
          dataURLOptions: dataURLOptions,
          inlineImages: inlineImages,
          recordCanvas: recordCanvas,
          preserveWhiteSpace: preserveWhiteSpace,
          onSerialize: onSerialize,
          onIframeLoad: onIframeLoad,
          iframeLoadTimeout: iframeLoadTimeout,
          onStylesheetLoad: onStylesheetLoad,
          stylesheetLoadTimeout: stylesheetLoadTimeout,
          keepIframeSrcFn: keepIframeSrcFn
        });
        if (serializedIframeNode) {
          onIframeLoad(n2, serializedIframeNode);
        }
      }
    }, iframeLoadTimeout);
  }
  if (serializedNode.type === NodeType$3.Element && serializedNode.tagName === "link" && typeof serializedNode.attributes.rel === "string" && (serializedNode.attributes.rel === "stylesheet" || serializedNode.attributes.rel === "preload" && typeof serializedNode.attributes.href === "string" && extractFileExtension(serializedNode.attributes.href) === "css")) {
    onceStylesheetLoaded(n2, function () {
      if (onStylesheetLoad) {
        var serializedLinkNode = serializeNodeWithId(n2, {
          doc: doc,
          mirror: mirror2,
          blockClass: blockClass,
          blockSelector: blockSelector,
          needsMask: needsMask,
          maskTextClass: maskTextClass,
          maskTextSelector: maskTextSelector,
          skipChild: false,
          inlineStylesheet: inlineStylesheet,
          maskInputOptions: maskInputOptions,
          maskTextFn: maskTextFn,
          maskInputFn: maskInputFn,
          slimDOMOptions: slimDOMOptions,
          dataURLOptions: dataURLOptions,
          inlineImages: inlineImages,
          recordCanvas: recordCanvas,
          preserveWhiteSpace: preserveWhiteSpace,
          onSerialize: onSerialize,
          onIframeLoad: onIframeLoad,
          iframeLoadTimeout: iframeLoadTimeout,
          onStylesheetLoad: onStylesheetLoad,
          stylesheetLoadTimeout: stylesheetLoadTimeout,
          keepIframeSrcFn: keepIframeSrcFn
        });
        if (serializedLinkNode) {
          onStylesheetLoad(n2, serializedLinkNode);
        }
      }
    }, stylesheetLoadTimeout);
  }
  return serializedNode;
}
function snapshot(n2, options) {
  var _ref3 = options || {},
    _ref3$mirror = _ref3.mirror,
    mirror2 = _ref3$mirror === void 0 ? new Mirror() : _ref3$mirror,
    _ref3$blockClass = _ref3.blockClass,
    blockClass = _ref3$blockClass === void 0 ? "rr-block" : _ref3$blockClass,
    _ref3$blockSelector = _ref3.blockSelector,
    blockSelector = _ref3$blockSelector === void 0 ? null : _ref3$blockSelector,
    _ref3$maskTextClass = _ref3.maskTextClass,
    maskTextClass = _ref3$maskTextClass === void 0 ? "rr-mask" : _ref3$maskTextClass,
    _ref3$maskTextSelecto = _ref3.maskTextSelector,
    maskTextSelector = _ref3$maskTextSelecto === void 0 ? null : _ref3$maskTextSelecto,
    _ref3$inlineStyleshee = _ref3.inlineStylesheet,
    inlineStylesheet = _ref3$inlineStyleshee === void 0 ? true : _ref3$inlineStyleshee,
    _ref3$inlineImages = _ref3.inlineImages,
    inlineImages = _ref3$inlineImages === void 0 ? false : _ref3$inlineImages,
    _ref3$recordCanvas = _ref3.recordCanvas,
    recordCanvas = _ref3$recordCanvas === void 0 ? false : _ref3$recordCanvas,
    _ref3$maskAllInputs = _ref3.maskAllInputs,
    maskAllInputs = _ref3$maskAllInputs === void 0 ? false : _ref3$maskAllInputs,
    maskTextFn = _ref3.maskTextFn,
    maskInputFn = _ref3.maskInputFn,
    _ref3$slimDOM = _ref3.slimDOM,
    slimDOM = _ref3$slimDOM === void 0 ? false : _ref3$slimDOM,
    dataURLOptions = _ref3.dataURLOptions,
    preserveWhiteSpace = _ref3.preserveWhiteSpace,
    onSerialize = _ref3.onSerialize,
    onIframeLoad = _ref3.onIframeLoad,
    iframeLoadTimeout = _ref3.iframeLoadTimeout,
    onStylesheetLoad = _ref3.onStylesheetLoad,
    stylesheetLoadTimeout = _ref3.stylesheetLoadTimeout,
    _ref3$keepIframeSrcFn = _ref3.keepIframeSrcFn,
    keepIframeSrcFn = _ref3$keepIframeSrcFn === void 0 ? function () {
      return false;
    } : _ref3$keepIframeSrcFn;
  var maskInputOptions = maskAllInputs === true ? {
    color: true,
    date: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true,
    textarea: true,
    select: true,
    password: true
  } : maskAllInputs === false ? {
    password: true
  } : maskAllInputs;
  var slimDOMOptions = slimDOM === true || slimDOM === "all" ?
  // if true: set of sensible options that should not throw away any information
  {
    script: true,
    comment: true,
    headFavicon: true,
    headWhitespace: true,
    headMetaDescKeywords: slimDOM === "all",
    // destructive
    headMetaSocial: true,
    headMetaRobots: true,
    headMetaHttpEquiv: true,
    headMetaAuthorship: true,
    headMetaVerification: true
  } : slimDOM === false ? {} : slimDOM;
  return serializeNodeWithId(n2, {
    doc: n2,
    mirror: mirror2,
    blockClass: blockClass,
    blockSelector: blockSelector,
    maskTextClass: maskTextClass,
    maskTextSelector: maskTextSelector,
    skipChild: false,
    inlineStylesheet: inlineStylesheet,
    maskInputOptions: maskInputOptions,
    maskTextFn: maskTextFn,
    maskInputFn: maskInputFn,
    slimDOMOptions: slimDOMOptions,
    dataURLOptions: dataURLOptions,
    inlineImages: inlineImages,
    recordCanvas: recordCanvas,
    preserveWhiteSpace: preserveWhiteSpace,
    onSerialize: onSerialize,
    onIframeLoad: onIframeLoad,
    iframeLoadTimeout: iframeLoadTimeout,
    onStylesheetLoad: onStylesheetLoad,
    stylesheetLoadTimeout: stylesheetLoadTimeout,
    keepIframeSrcFn: keepIframeSrcFn,
    newlyAddedElement: false
  });
}
function getDefaultExportFromCjs$1(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
function getAugmentedNamespace$1(n2) {
  if (n2.__esModule) return n2;
  var f2 = n2.default;
  if (typeof f2 == "function") {
    var a2 = function a22() {
      if (this instanceof a22) {
        return Reflect.construct(f2, arguments, this.constructor);
      }
      return f2.apply(this, arguments);
    };
    a2.prototype = f2.prototype;
  } else a2 = {};
  Object.defineProperty(a2, "__esModule", {
    value: true
  });
  Object.keys(n2).forEach(function (k) {
    var d = Object.getOwnPropertyDescriptor(n2, k);
    Object.defineProperty(a2, k, d.get ? d : {
      enumerable: true,
      get: function get() {
        return n2[k];
      }
    });
  });
  return a2;
}
var picocolors_browser$1 = {
  exports: {}
};
var x$1 = String;
var create$1 = function create$1() {
  return {
    isColorSupported: false,
    reset: x$1,
    bold: x$1,
    dim: x$1,
    italic: x$1,
    underline: x$1,
    inverse: x$1,
    hidden: x$1,
    strikethrough: x$1,
    black: x$1,
    red: x$1,
    green: x$1,
    yellow: x$1,
    blue: x$1,
    magenta: x$1,
    cyan: x$1,
    white: x$1,
    gray: x$1,
    bgBlack: x$1,
    bgRed: x$1,
    bgGreen: x$1,
    bgYellow: x$1,
    bgBlue: x$1,
    bgMagenta: x$1,
    bgCyan: x$1,
    bgWhite: x$1
  };
};
picocolors_browser$1.exports = create$1();
picocolors_browser$1.exports.createColors = create$1;
var picocolors_browserExports$1 = picocolors_browser$1.exports;
var __viteBrowserExternal$2 = {};
var __viteBrowserExternal$1$1 = /* @__PURE__ */Object.freeze(/* @__PURE__ */Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal$2
}, Symbol.toStringTag, {
  value: "Module"
}));
var require$$2$1 = /* @__PURE__ */getAugmentedNamespace$1(__viteBrowserExternal$1$1);
var pico$1 = picocolors_browserExports$1;
var terminalHighlight$1$1 = require$$2$1;
var CssSyntaxError$3$1 = /*#__PURE__*/function (_Error) {
  function CssSyntaxError(message, line, column, source, file, plugin22) {
    var _this2;
    record_classCallCheck(this, CssSyntaxError);
    _this2 = _callSuper(this, CssSyntaxError, [message]);
    _this2.name = "CssSyntaxError";
    _this2.reason = message;
    if (file) {
      _this2.file = file;
    }
    if (source) {
      _this2.source = source;
    }
    if (plugin22) {
      _this2.plugin = plugin22;
    }
    if (typeof line !== "undefined" && typeof column !== "undefined") {
      if (typeof line === "number") {
        _this2.line = line;
        _this2.column = column;
      } else {
        _this2.line = line.line;
        _this2.column = line.column;
        _this2.endLine = column.line;
        _this2.endColumn = column.column;
      }
    }
    _this2.setMessage();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this2, CssSyntaxError);
    }
    return _this2;
  }
  _inherits(CssSyntaxError, _Error);
  return record_createClass(CssSyntaxError, [{
    key: "setMessage",
    value: function setMessage() {
      this.message = this.plugin ? this.plugin + ": " : "";
      this.message += this.file ? this.file : "<css input>";
      if (typeof this.line !== "undefined") {
        this.message += ":" + this.line + ":" + this.column;
      }
      this.message += ": " + this.reason;
    }
  }, {
    key: "showSourceCode",
    value: function showSourceCode(color) {
      var _this3 = this;
      if (!this.source) return "";
      var css = this.source;
      if (color == null) color = pico$1.isColorSupported;
      if (terminalHighlight$1$1) {
        if (color) css = terminalHighlight$1$1(css);
      }
      var lines = css.split(/\r?\n/);
      var start = Math.max(this.line - 3, 0);
      var end = Math.min(this.line + 2, lines.length);
      var maxWidth = String(end).length;
      var mark, aside;
      if (color) {
        var _pico$1$createColors = pico$1.createColors(true),
          bold = _pico$1$createColors.bold,
          gray = _pico$1$createColors.gray,
          red = _pico$1$createColors.red;
        mark = function mark(text) {
          return bold(red(text));
        };
        aside = function aside(text) {
          return gray(text);
        };
      } else {
        mark = aside = function aside(str) {
          return str;
        };
      }
      return lines.slice(start, end).map(function (line, index2) {
        var number = start + 1 + index2;
        var gutter = " " + (" " + number).slice(-maxWidth) + " | ";
        if (number === _this3.line) {
          var spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, _this3.column - 1).replace(/[^\t]/g, " ");
          return mark(">") + aside(gutter) + line + "\n " + spacing + mark("^");
        }
        return " " + aside(gutter) + line;
      }).join("\n");
    }
  }, {
    key: "toString",
    value: function toString() {
      var code = this.showSourceCode();
      if (code) {
        code = "\n\n" + code + "\n";
      }
      return this.name + ": " + this.message + code;
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(Error));
var cssSyntaxError$1 = CssSyntaxError$3$1;
CssSyntaxError$3$1.default = CssSyntaxError$3$1;
var symbols$1 = {};
symbols$1.isClean = Symbol("isClean");
symbols$1.my = Symbol("my");
var DEFAULT_RAW$1 = {
  after: "\n",
  beforeClose: "\n",
  beforeComment: "\n",
  beforeDecl: "\n",
  beforeOpen: " ",
  beforeRule: "\n",
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: false
};
function capitalize$1(str) {
  return str[0].toUpperCase() + str.slice(1);
}
var Stringifier$2$1 = /*#__PURE__*/function () {
  function Stringifier(builder) {
    record_classCallCheck(this, Stringifier);
    this.builder = builder;
  }
  return record_createClass(Stringifier, [{
    key: "atrule",
    value: function atrule(node2, semicolon) {
      var name = "@" + node2.name;
      var params = node2.params ? this.rawValue(node2, "params") : "";
      if (typeof node2.raws.afterName !== "undefined") {
        name += node2.raws.afterName;
      } else if (params) {
        name += " ";
      }
      if (node2.nodes) {
        this.block(node2, name + params);
      } else {
        var end = (node2.raws.between || "") + (semicolon ? ";" : "");
        this.builder(name + params + end, node2);
      }
    }
  }, {
    key: "beforeAfter",
    value: function beforeAfter(node2, detect) {
      var value;
      if (node2.type === "decl") {
        value = this.raw(node2, null, "beforeDecl");
      } else if (node2.type === "comment") {
        value = this.raw(node2, null, "beforeComment");
      } else if (detect === "before") {
        value = this.raw(node2, null, "beforeRule");
      } else {
        value = this.raw(node2, null, "beforeClose");
      }
      var buf = node2.parent;
      var depth = 0;
      while (buf && buf.type !== "root") {
        depth += 1;
        buf = buf.parent;
      }
      if (value.includes("\n")) {
        var indent = this.raw(node2, null, "indent");
        if (indent.length) {
          for (var step = 0; step < depth; step++) value += indent;
        }
      }
      return value;
    }
  }, {
    key: "block",
    value: function block(node2, start) {
      var between = this.raw(node2, "between", "beforeOpen");
      this.builder(start + between + "{", node2, "start");
      var after;
      if (node2.nodes && node2.nodes.length) {
        this.body(node2);
        after = this.raw(node2, "after");
      } else {
        after = this.raw(node2, "after", "emptyBody");
      }
      if (after) this.builder(after);
      this.builder("}", node2, "end");
    }
  }, {
    key: "body",
    value: function body(node2) {
      var last = node2.nodes.length - 1;
      while (last > 0) {
        if (node2.nodes[last].type !== "comment") break;
        last -= 1;
      }
      var semicolon = this.raw(node2, "semicolon");
      for (var i2 = 0; i2 < node2.nodes.length; i2++) {
        var child = node2.nodes[i2];
        var before = this.raw(child, "before");
        if (before) this.builder(before);
        this.stringify(child, last !== i2 || semicolon);
      }
    }
  }, {
    key: "comment",
    value: function comment(node2) {
      var left = this.raw(node2, "left", "commentLeft");
      var right = this.raw(node2, "right", "commentRight");
      this.builder("/*" + left + node2.text + right + "*/", node2);
    }
  }, {
    key: "decl",
    value: function decl(node2, semicolon) {
      var between = this.raw(node2, "between", "colon");
      var string = node2.prop + between + this.rawValue(node2, "value");
      if (node2.important) {
        string += node2.raws.important || " !important";
      }
      if (semicolon) string += ";";
      this.builder(string, node2);
    }
  }, {
    key: "document",
    value: function document(node2) {
      this.body(node2);
    }
  }, {
    key: "raw",
    value: function raw(node2, own, detect) {
      var value;
      if (!detect) detect = own;
      if (own) {
        value = node2.raws[own];
        if (typeof value !== "undefined") return value;
      }
      var parent = node2.parent;
      if (detect === "before") {
        if (!parent || parent.type === "root" && parent.first === node2) {
          return "";
        }
        if (parent && parent.type === "document") {
          return "";
        }
      }
      if (!parent) return DEFAULT_RAW$1[detect];
      var root2 = node2.root();
      if (!root2.rawCache) root2.rawCache = {};
      if (typeof root2.rawCache[detect] !== "undefined") {
        return root2.rawCache[detect];
      }
      if (detect === "before" || detect === "after") {
        return this.beforeAfter(node2, detect);
      } else {
        var method = "raw" + capitalize$1(detect);
        if (this[method]) {
          value = this[method](root2, node2);
        } else {
          root2.walk(function (i2) {
            value = i2.raws[own];
            if (typeof value !== "undefined") return false;
          });
        }
      }
      if (typeof value === "undefined") value = DEFAULT_RAW$1[detect];
      root2.rawCache[detect] = value;
      return value;
    }
  }, {
    key: "rawBeforeClose",
    value: function rawBeforeClose(root2) {
      var value;
      root2.walk(function (i2) {
        if (i2.nodes && i2.nodes.length > 0) {
          if (typeof i2.raws.after !== "undefined") {
            value = i2.raws.after;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        }
      });
      if (value) value = value.replace(/\S/g, "");
      return value;
    }
  }, {
    key: "rawBeforeComment",
    value: function rawBeforeComment(root2, node2) {
      var value;
      root2.walkComments(function (i2) {
        if (typeof i2.raws.before !== "undefined") {
          value = i2.raws.before;
          if (value.includes("\n")) {
            value = value.replace(/[^\n]+$/, "");
          }
          return false;
        }
      });
      if (typeof value === "undefined") {
        value = this.raw(node2, null, "beforeDecl");
      } else if (value) {
        value = value.replace(/\S/g, "");
      }
      return value;
    }
  }, {
    key: "rawBeforeDecl",
    value: function rawBeforeDecl(root2, node2) {
      var value;
      root2.walkDecls(function (i2) {
        if (typeof i2.raws.before !== "undefined") {
          value = i2.raws.before;
          if (value.includes("\n")) {
            value = value.replace(/[^\n]+$/, "");
          }
          return false;
        }
      });
      if (typeof value === "undefined") {
        value = this.raw(node2, null, "beforeRule");
      } else if (value) {
        value = value.replace(/\S/g, "");
      }
      return value;
    }
  }, {
    key: "rawBeforeOpen",
    value: function rawBeforeOpen(root2) {
      var value;
      root2.walk(function (i2) {
        if (i2.type !== "decl") {
          value = i2.raws.between;
          if (typeof value !== "undefined") return false;
        }
      });
      return value;
    }
  }, {
    key: "rawBeforeRule",
    value: function rawBeforeRule(root2) {
      var value;
      root2.walk(function (i2) {
        if (i2.nodes && (i2.parent !== root2 || root2.first !== i2)) {
          if (typeof i2.raws.before !== "undefined") {
            value = i2.raws.before;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        }
      });
      if (value) value = value.replace(/\S/g, "");
      return value;
    }
  }, {
    key: "rawColon",
    value: function rawColon(root2) {
      var value;
      root2.walkDecls(function (i2) {
        if (typeof i2.raws.between !== "undefined") {
          value = i2.raws.between.replace(/[^\s:]/g, "");
          return false;
        }
      });
      return value;
    }
  }, {
    key: "rawEmptyBody",
    value: function rawEmptyBody(root2) {
      var value;
      root2.walk(function (i2) {
        if (i2.nodes && i2.nodes.length === 0) {
          value = i2.raws.after;
          if (typeof value !== "undefined") return false;
        }
      });
      return value;
    }
  }, {
    key: "rawIndent",
    value: function rawIndent(root2) {
      if (root2.raws.indent) return root2.raws.indent;
      var value;
      root2.walk(function (i2) {
        var p = i2.parent;
        if (p && p !== root2 && p.parent && p.parent === root2) {
          if (typeof i2.raws.before !== "undefined") {
            var parts = i2.raws.before.split("\n");
            value = parts[parts.length - 1];
            value = value.replace(/\S/g, "");
            return false;
          }
        }
      });
      return value;
    }
  }, {
    key: "rawSemicolon",
    value: function rawSemicolon(root2) {
      var value;
      root2.walk(function (i2) {
        if (i2.nodes && i2.nodes.length && i2.last.type === "decl") {
          value = i2.raws.semicolon;
          if (typeof value !== "undefined") return false;
        }
      });
      return value;
    }
  }, {
    key: "rawValue",
    value: function rawValue(node2, prop) {
      var value = node2[prop];
      var raw = node2.raws[prop];
      if (raw && raw.value === value) {
        return raw.raw;
      }
      return value;
    }
  }, {
    key: "root",
    value: function root(node2) {
      this.body(node2);
      if (node2.raws.after) this.builder(node2.raws.after);
    }
  }, {
    key: "rule",
    value: function rule(node2) {
      this.block(node2, this.rawValue(node2, "selector"));
      if (node2.raws.ownSemicolon) {
        this.builder(node2.raws.ownSemicolon, node2, "end");
      }
    }
  }, {
    key: "stringify",
    value: function stringify(node2, semicolon) {
      if (!this[node2.type]) {
        throw new Error("Unknown AST node type " + node2.type + ". Maybe you need to change PostCSS stringifier.");
      }
      this[node2.type](node2, semicolon);
    }
  }]);
}();
var stringifier$1 = Stringifier$2$1;
Stringifier$2$1.default = Stringifier$2$1;
var Stringifier$1$1 = stringifier$1;
function stringify$4$1(node2, builder) {
  var str = new Stringifier$1$1(builder);
  str.stringify(node2);
}
var stringify_1$1 = stringify$4$1;
stringify$4$1.default = stringify$4$1;
var isClean$2$1 = symbols$1.isClean,
  my$2$1 = symbols$1.my;
var CssSyntaxError$2$1 = cssSyntaxError$1;
var Stringifier2$1 = stringifier$1;
var stringify$3$1 = stringify_1$1;
function cloneNode$1(obj, parent) {
  var cloned = new obj.constructor();
  for (var i2 in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, i2)) {
      continue;
    }
    if (i2 === "proxyCache") continue;
    var value = obj[i2];
    var type = record_typeof(value);
    if (i2 === "parent" && type === "object") {
      if (parent) cloned[i2] = parent;
    } else if (i2 === "source") {
      cloned[i2] = value;
    } else if (Array.isArray(value)) {
      cloned[i2] = value.map(function (j) {
        return cloneNode$1(j, cloned);
      });
    } else {
      if (type === "object" && value !== null) value = cloneNode$1(value);
      cloned[i2] = value;
    }
  }
  return cloned;
}
var Node$4$1 = /*#__PURE__*/function () {
  function Node2() {
    var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    record_classCallCheck(this, Node2);
    this.raws = {};
    this[isClean$2$1] = false;
    this[my$2$1] = true;
    for (var name in defaults) {
      if (name === "nodes") {
        this.nodes = [];
        var _iterator2 = record_createForOfIteratorHelper(defaults[name]),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var node2 = _step2.value;
            if (typeof node2.clone === "function") {
              this.append(node2.clone());
            } else {
              this.append(node2);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else {
        this[name] = defaults[name];
      }
    }
  }
  return record_createClass(Node2, [{
    key: "addToError",
    value: function addToError(error) {
      error.postcssNode = this;
      if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
        var s2 = this.source;
        error.stack = error.stack.replace(/\n\s{4}at /, "$&".concat(s2.input.from, ":").concat(s2.start.line, ":").concat(s2.start.column, "$&"));
      }
      return error;
    }
  }, {
    key: "after",
    value: function after(add) {
      this.parent.insertAfter(this, add);
      return this;
    }
  }, {
    key: "assign",
    value: function assign() {
      var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      for (var name in overrides) {
        this[name] = overrides[name];
      }
      return this;
    }
  }, {
    key: "before",
    value: function before(add) {
      this.parent.insertBefore(this, add);
      return this;
    }
  }, {
    key: "cleanRaws",
    value: function cleanRaws(keepBetween) {
      delete this.raws.before;
      delete this.raws.after;
      if (!keepBetween) delete this.raws.between;
    }
  }, {
    key: "clone",
    value: function clone() {
      var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cloned = cloneNode$1(this);
      for (var name in overrides) {
        cloned[name] = overrides[name];
      }
      return cloned;
    }
  }, {
    key: "cloneAfter",
    value: function cloneAfter() {
      var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cloned = this.clone(overrides);
      this.parent.insertAfter(this, cloned);
      return cloned;
    }
  }, {
    key: "cloneBefore",
    value: function cloneBefore() {
      var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cloned = this.clone(overrides);
      this.parent.insertBefore(this, cloned);
      return cloned;
    }
  }, {
    key: "error",
    value: function error(message) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this.source) {
        var _this$rangeBy = this.rangeBy(opts),
          end = _this$rangeBy.end,
          start = _this$rangeBy.start;
        return this.source.input.error(message, {
          column: start.column,
          line: start.line
        }, {
          column: end.column,
          line: end.line
        }, opts);
      }
      return new CssSyntaxError$2$1(message);
    }
  }, {
    key: "getProxyProcessor",
    value: function getProxyProcessor() {
      return {
        get: function get(node2, prop) {
          if (prop === "proxyOf") {
            return node2;
          } else if (prop === "root") {
            return function () {
              return node2.root().toProxy();
            };
          } else {
            return node2[prop];
          }
        },
        set: function set(node2, prop, value) {
          if (node2[prop] === value) return true;
          node2[prop] = value;
          if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || /* c8 ignore next */
          prop === "text") {
            node2.markDirty();
          }
          return true;
        }
      };
    }
  }, {
    key: "markDirty",
    value: function markDirty() {
      if (this[isClean$2$1]) {
        this[isClean$2$1] = false;
        var next = this;
        while (next = next.parent) {
          next[isClean$2$1] = false;
        }
      }
    }
  }, {
    key: "next",
    value: function next() {
      if (!this.parent) return void 0;
      var index2 = this.parent.index(this);
      return this.parent.nodes[index2 + 1];
    }
  }, {
    key: "positionBy",
    value: function positionBy(opts, stringRepresentation) {
      var pos = this.source.start;
      if (opts.index) {
        pos = this.positionInside(opts.index, stringRepresentation);
      } else if (opts.word) {
        stringRepresentation = this.toString();
        var index2 = stringRepresentation.indexOf(opts.word);
        if (index2 !== -1) pos = this.positionInside(index2, stringRepresentation);
      }
      return pos;
    }
  }, {
    key: "positionInside",
    value: function positionInside(index2, stringRepresentation) {
      var string = stringRepresentation || this.toString();
      var column = this.source.start.column;
      var line = this.source.start.line;
      for (var i2 = 0; i2 < index2; i2++) {
        if (string[i2] === "\n") {
          column = 1;
          line += 1;
        } else {
          column += 1;
        }
      }
      return {
        column: column,
        line: line
      };
    }
  }, {
    key: "prev",
    value: function prev() {
      if (!this.parent) return void 0;
      var index2 = this.parent.index(this);
      return this.parent.nodes[index2 - 1];
    }
  }, {
    key: "rangeBy",
    value: function rangeBy(opts) {
      var start = {
        column: this.source.start.column,
        line: this.source.start.line
      };
      var end = this.source.end ? {
        column: this.source.end.column + 1,
        line: this.source.end.line
      } : {
        column: start.column + 1,
        line: start.line
      };
      if (opts.word) {
        var stringRepresentation = this.toString();
        var index2 = stringRepresentation.indexOf(opts.word);
        if (index2 !== -1) {
          start = this.positionInside(index2, stringRepresentation);
          end = this.positionInside(index2 + opts.word.length, stringRepresentation);
        }
      } else {
        if (opts.start) {
          start = {
            column: opts.start.column,
            line: opts.start.line
          };
        } else if (opts.index) {
          start = this.positionInside(opts.index);
        }
        if (opts.end) {
          end = {
            column: opts.end.column,
            line: opts.end.line
          };
        } else if (typeof opts.endIndex === "number") {
          end = this.positionInside(opts.endIndex);
        } else if (opts.index) {
          end = this.positionInside(opts.index + 1);
        }
      }
      if (end.line < start.line || end.line === start.line && end.column <= start.column) {
        end = {
          column: start.column + 1,
          line: start.line
        };
      }
      return {
        end: end,
        start: start
      };
    }
  }, {
    key: "raw",
    value: function raw(prop, defaultType) {
      var str = new Stringifier2$1();
      return str.raw(this, prop, defaultType);
    }
  }, {
    key: "remove",
    value: function remove() {
      if (this.parent) {
        this.parent.removeChild(this);
      }
      this.parent = void 0;
      return this;
    }
  }, {
    key: "replaceWith",
    value: function replaceWith() {
      if (this.parent) {
        var bookmark = this;
        var foundSelf = false;
        for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
          nodes[_key] = arguments[_key];
        }
        for (var _i3 = 0, _nodes = nodes; _i3 < _nodes.length; _i3++) {
          var node2 = _nodes[_i3];
          if (node2 === this) {
            foundSelf = true;
          } else if (foundSelf) {
            this.parent.insertAfter(bookmark, node2);
            bookmark = node2;
          } else {
            this.parent.insertBefore(bookmark, node2);
          }
        }
        if (!foundSelf) {
          this.remove();
        }
      }
      return this;
    }
  }, {
    key: "root",
    value: function root() {
      var result2 = this;
      while (result2.parent && result2.parent.type !== "document") {
        result2 = result2.parent;
      }
      return result2;
    }
  }, {
    key: "toJSON",
    value: function toJSON(_, inputs) {
      var fixed = {};
      var emitInputs = inputs == null;
      inputs = inputs || /* @__PURE__ */new Map();
      var inputsNextIndex = 0;
      for (var name in this) {
        if (!Object.prototype.hasOwnProperty.call(this, name)) {
          continue;
        }
        if (name === "parent" || name === "proxyCache") continue;
        var value = this[name];
        if (Array.isArray(value)) {
          fixed[name] = value.map(function (i2) {
            if (record_typeof(i2) === "object" && i2.toJSON) {
              return i2.toJSON(null, inputs);
            } else {
              return i2;
            }
          });
        } else if (record_typeof(value) === "object" && value.toJSON) {
          fixed[name] = value.toJSON(null, inputs);
        } else if (name === "source") {
          var inputId = inputs.get(value.input);
          if (inputId == null) {
            inputId = inputsNextIndex;
            inputs.set(value.input, inputsNextIndex);
            inputsNextIndex++;
          }
          fixed[name] = {
            end: value.end,
            inputId: inputId,
            start: value.start
          };
        } else {
          fixed[name] = value;
        }
      }
      if (emitInputs) {
        fixed.inputs = record_toConsumableArray(inputs.keys()).map(function (input2) {
          return input2.toJSON();
        });
      }
      return fixed;
    }
  }, {
    key: "toProxy",
    value: function toProxy() {
      if (!this.proxyCache) {
        this.proxyCache = new Proxy(this, this.getProxyProcessor());
      }
      return this.proxyCache;
    }
  }, {
    key: "toString",
    value: function toString() {
      var stringifier2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : stringify$3$1;
      if (stringifier2.stringify) stringifier2 = stringifier2.stringify;
      var result2 = "";
      stringifier2(this, function (i2) {
        result2 += i2;
      });
      return result2;
    }
  }, {
    key: "warn",
    value: function warn(result2, text, opts) {
      var data = {
        node: this
      };
      for (var i2 in opts) data[i2] = opts[i2];
      return result2.warn(text, data);
    }
  }, {
    key: "proxyOf",
    get: function get() {
      return this;
    }
  }]);
}();
var node$1 = Node$4$1;
Node$4$1.default = Node$4$1;
var Node$3$1 = node$1;
var Declaration$4$1 = /*#__PURE__*/function (_Node$3$) {
  function Declaration(defaults) {
    var _this4;
    record_classCallCheck(this, Declaration);
    if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") {
      defaults = record_objectSpread(record_objectSpread({}, defaults), {}, {
        value: String(defaults.value)
      });
    }
    _this4 = _callSuper(this, Declaration, [defaults]);
    _this4.type = "decl";
    return _this4;
  }
  _inherits(Declaration, _Node$3$);
  return record_createClass(Declaration, [{
    key: "variable",
    get: function get() {
      return this.prop.startsWith("--") || this.prop[0] === "$";
    }
  }]);
}(Node$3$1);
var declaration$1 = Declaration$4$1;
Declaration$4$1.default = Declaration$4$1;
var urlAlphabet$1 = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
var customAlphabet$1 = function customAlphabet$1(alphabet) {
  var defaultSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 21;
  return function () {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSize;
    var id = "";
    var i2 = size;
    while (i2--) {
      id += alphabet[Math.random() * alphabet.length | 0];
    }
    return id;
  };
};
var nanoid$1$1 = function nanoid$1$1() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
  var id = "";
  var i2 = size;
  while (i2--) {
    id += urlAlphabet$1[Math.random() * 64 | 0];
  }
  return id;
};
var nonSecure$1 = {
  nanoid: nanoid$1$1,
  customAlphabet: customAlphabet$1
};
var SourceMapConsumer$2$1 = require$$2$1.SourceMapConsumer,
  SourceMapGenerator$2$1 = require$$2$1.SourceMapGenerator;
var existsSync$1 = require$$2$1.existsSync,
  readFileSync$1 = require$$2$1.readFileSync;
var dirname$1$1 = require$$2$1.dirname,
  join$1 = require$$2$1.join;
function fromBase64$1(str) {
  if (Buffer) {
    return Buffer.from(str, "base64").toString();
  } else {
    return window.atob(str);
  }
}
var PreviousMap$2$1 = /*#__PURE__*/function () {
  function PreviousMap(css, opts) {
    record_classCallCheck(this, PreviousMap);
    if (opts.map === false) return;
    this.loadAnnotation(css);
    this.inline = this.startWith(this.annotation, "data:");
    var prev = opts.map ? opts.map.prev : void 0;
    var text = this.loadMap(opts.from, prev);
    if (!this.mapFile && opts.from) {
      this.mapFile = opts.from;
    }
    if (this.mapFile) this.root = dirname$1$1(this.mapFile);
    if (text) this.text = text;
  }
  return record_createClass(PreviousMap, [{
    key: "consumer",
    value: function consumer() {
      if (!this.consumerCache) {
        this.consumerCache = new SourceMapConsumer$2$1(this.text);
      }
      return this.consumerCache;
    }
  }, {
    key: "decodeInline",
    value: function decodeInline(text) {
      var baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
      var baseUri = /^data:application\/json;base64,/;
      var charsetUri = /^data:application\/json;charset=utf-?8,/;
      var uri = /^data:application\/json,/;
      if (charsetUri.test(text) || uri.test(text)) {
        return decodeURIComponent(text.substr(RegExp.lastMatch.length));
      }
      if (baseCharsetUri.test(text) || baseUri.test(text)) {
        return fromBase64$1(text.substr(RegExp.lastMatch.length));
      }
      var encoding = text.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + encoding);
    }
  }, {
    key: "getAnnotationURL",
    value: function getAnnotationURL(sourceMapString) {
      return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
  }, {
    key: "isMap",
    value: function isMap(map) {
      if (record_typeof(map) !== "object") return false;
      return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
    }
  }, {
    key: "loadAnnotation",
    value: function loadAnnotation(css) {
      var comments = css.match(/\/\*\s*# sourceMappingURL=/gm);
      if (!comments) return;
      var start = css.lastIndexOf(comments.pop());
      var end = css.indexOf("*/", start);
      if (start > -1 && end > -1) {
        this.annotation = this.getAnnotationURL(css.substring(start, end));
      }
    }
  }, {
    key: "loadFile",
    value: function loadFile(path) {
      this.root = dirname$1$1(path);
      if (existsSync$1(path)) {
        this.mapFile = path;
        return readFileSync$1(path, "utf-8").toString().trim();
      }
    }
  }, {
    key: "loadMap",
    value: function loadMap(file, prev) {
      if (prev === false) return false;
      if (prev) {
        if (typeof prev === "string") {
          return prev;
        } else if (typeof prev === "function") {
          var prevPath = prev(file);
          if (prevPath) {
            var map = this.loadFile(prevPath);
            if (!map) {
              throw new Error("Unable to load previous source map: " + prevPath.toString());
            }
            return map;
          }
        } else if (prev instanceof SourceMapConsumer$2$1) {
          return SourceMapGenerator$2$1.fromSourceMap(prev).toString();
        } else if (prev instanceof SourceMapGenerator$2$1) {
          return prev.toString();
        } else if (this.isMap(prev)) {
          return JSON.stringify(prev);
        } else {
          throw new Error("Unsupported previous source map format: " + prev.toString());
        }
      } else if (this.inline) {
        return this.decodeInline(this.annotation);
      } else if (this.annotation) {
        var _map = this.annotation;
        if (file) _map = join$1(dirname$1$1(file), _map);
        return this.loadFile(_map);
      }
    }
  }, {
    key: "startWith",
    value: function startWith(string, start) {
      if (!string) return false;
      return string.substr(0, start.length) === start;
    }
  }, {
    key: "withContent",
    value: function withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
  }]);
}();
var previousMap$1 = PreviousMap$2$1;
PreviousMap$2$1.default = PreviousMap$2$1;
var SourceMapConsumer$1$1 = require$$2$1.SourceMapConsumer,
  SourceMapGenerator$1$1 = require$$2$1.SourceMapGenerator;
var fileURLToPath$1 = require$$2$1.fileURLToPath,
  pathToFileURL$1$1 = require$$2$1.pathToFileURL;
var isAbsolute$1 = require$$2$1.isAbsolute,
  resolve$1$1 = require$$2$1.resolve;
var nanoid$2 = nonSecure$1.nanoid;
var terminalHighlight$2 = require$$2$1;
var CssSyntaxError$1$1 = cssSyntaxError$1;
var PreviousMap$1$1 = previousMap$1;
var fromOffsetCache$1 = Symbol("fromOffsetCache");
var sourceMapAvailable$1$1 = Boolean(SourceMapConsumer$1$1 && SourceMapGenerator$1$1);
var pathAvailable$1$1 = Boolean(resolve$1$1 && isAbsolute$1);
var Input$4$1 = /*#__PURE__*/function () {
  function Input(css) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    record_classCallCheck(this, Input);
    if (css === null || typeof css === "undefined" || record_typeof(css) === "object" && !css.toString) {
      throw new Error("PostCSS received ".concat(css, " instead of CSS string"));
    }
    this.css = css.toString();
    if (this.css[0] === "\uFEFF" || this.css[0] === "￾") {
      this.hasBOM = true;
      this.css = this.css.slice(1);
    } else {
      this.hasBOM = false;
    }
    if (opts.from) {
      if (!pathAvailable$1$1 || /^\w+:\/\//.test(opts.from) || isAbsolute$1(opts.from)) {
        this.file = opts.from;
      } else {
        this.file = resolve$1$1(opts.from);
      }
    }
    if (pathAvailable$1$1 && sourceMapAvailable$1$1) {
      var map = new PreviousMap$1$1(this.css, opts);
      if (map.text) {
        this.map = map;
        var file = map.consumer().file;
        if (!this.file && file) this.file = this.mapResolve(file);
      }
    }
    if (!this.file) {
      this.id = "<input css " + nanoid$2(6) + ">";
    }
    if (this.map) this.map.file = this.from;
  }
  return record_createClass(Input, [{
    key: "error",
    value: function error(message, line, column) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var result2, endLine, endColumn;
      if (line && record_typeof(line) === "object") {
        var start = line;
        var end = column;
        if (typeof start.offset === "number") {
          var pos = this.fromOffset(start.offset);
          line = pos.line;
          column = pos.col;
        } else {
          line = start.line;
          column = start.column;
        }
        if (typeof end.offset === "number") {
          var _pos = this.fromOffset(end.offset);
          endLine = _pos.line;
          endColumn = _pos.col;
        } else {
          endLine = end.line;
          endColumn = end.column;
        }
      } else if (!column) {
        var _pos2 = this.fromOffset(line);
        line = _pos2.line;
        column = _pos2.col;
      }
      var origin = this.origin(line, column, endLine, endColumn);
      if (origin) {
        result2 = new CssSyntaxError$1$1(message, origin.endLine === void 0 ? origin.line : {
          column: origin.column,
          line: origin.line
        }, origin.endLine === void 0 ? origin.column : {
          column: origin.endColumn,
          line: origin.endLine
        }, origin.source, origin.file, opts.plugin);
      } else {
        result2 = new CssSyntaxError$1$1(message, endLine === void 0 ? line : {
          column: column,
          line: line
        }, endLine === void 0 ? column : {
          column: endColumn,
          line: endLine
        }, this.css, this.file, opts.plugin);
      }
      result2.input = {
        column: column,
        endColumn: endColumn,
        endLine: endLine,
        line: line,
        source: this.css
      };
      if (this.file) {
        if (pathToFileURL$1$1) {
          result2.input.url = pathToFileURL$1$1(this.file).toString();
        }
        result2.input.file = this.file;
      }
      return result2;
    }
  }, {
    key: "fromOffset",
    value: function fromOffset(offset) {
      var lastLine, lineToIndex;
      if (!this[fromOffsetCache$1]) {
        var lines = this.css.split("\n");
        lineToIndex = new Array(lines.length);
        var prevIndex = 0;
        for (var i2 = 0, l2 = lines.length; i2 < l2; i2++) {
          lineToIndex[i2] = prevIndex;
          prevIndex += lines[i2].length + 1;
        }
        this[fromOffsetCache$1] = lineToIndex;
      } else {
        lineToIndex = this[fromOffsetCache$1];
      }
      lastLine = lineToIndex[lineToIndex.length - 1];
      var min = 0;
      if (offset >= lastLine) {
        min = lineToIndex.length - 1;
      } else {
        var max = lineToIndex.length - 2;
        var mid;
        while (min < max) {
          mid = min + (max - min >> 1);
          if (offset < lineToIndex[mid]) {
            max = mid - 1;
          } else if (offset >= lineToIndex[mid + 1]) {
            min = mid + 1;
          } else {
            min = mid;
            break;
          }
        }
      }
      return {
        col: offset - lineToIndex[min] + 1,
        line: min + 1
      };
    }
  }, {
    key: "mapResolve",
    value: function mapResolve(file) {
      if (/^\w+:\/\//.test(file)) {
        return file;
      }
      return resolve$1$1(this.map.consumer().sourceRoot || this.map.root || ".", file);
    }
  }, {
    key: "origin",
    value: function origin(line, column, endLine, endColumn) {
      if (!this.map) return false;
      var consumer = this.map.consumer();
      var from = consumer.originalPositionFor({
        column: column,
        line: line
      });
      if (!from.source) return false;
      var to;
      if (typeof endLine === "number") {
        to = consumer.originalPositionFor({
          column: endColumn,
          line: endLine
        });
      }
      var fromUrl;
      if (isAbsolute$1(from.source)) {
        fromUrl = pathToFileURL$1$1(from.source);
      } else {
        fromUrl = new URL(from.source, this.map.consumer().sourceRoot || pathToFileURL$1$1(this.map.mapFile));
      }
      var result2 = {
        column: from.column,
        endColumn: to && to.column,
        endLine: to && to.line,
        line: from.line,
        url: fromUrl.toString()
      };
      if (fromUrl.protocol === "file:") {
        if (fileURLToPath$1) {
          result2.file = fileURLToPath$1(fromUrl);
        } else {
          throw new Error("file: protocol is not available in this PostCSS build");
        }
      }
      var source = consumer.sourceContentFor(from.source);
      if (source) result2.source = source;
      return result2;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {};
      for (var _i4 = 0, _arr = ["hasBOM", "css", "file", "id"]; _i4 < _arr.length; _i4++) {
        var name = _arr[_i4];
        if (this[name] != null) {
          json[name] = this[name];
        }
      }
      if (this.map) {
        json.map = record_objectSpread({}, this.map);
        if (json.map.consumerCache) {
          json.map.consumerCache = void 0;
        }
      }
      return json;
    }
  }, {
    key: "from",
    get: function get() {
      return this.file || this.id;
    }
  }]);
}();
var input$1 = Input$4$1;
Input$4$1.default = Input$4$1;
if (terminalHighlight$2 && terminalHighlight$2.registerInput) {
  terminalHighlight$2.registerInput(Input$4$1);
}
var SourceMapConsumer$3 = require$$2$1.SourceMapConsumer,
  SourceMapGenerator$3 = require$$2$1.SourceMapGenerator;
var dirname$2 = require$$2$1.dirname,
  relative$1 = require$$2$1.relative,
  resolve$2 = require$$2$1.resolve,
  sep$1 = require$$2$1.sep;
var pathToFileURL$2 = require$$2$1.pathToFileURL;
var Input$3$1 = input$1;
var sourceMapAvailable$2 = Boolean(SourceMapConsumer$3 && SourceMapGenerator$3);
var pathAvailable$2 = Boolean(dirname$2 && resolve$2 && relative$1 && sep$1);
var MapGenerator$2$1 = /*#__PURE__*/function () {
  function MapGenerator(stringify2, root2, opts, cssString) {
    record_classCallCheck(this, MapGenerator);
    this.stringify = stringify2;
    this.mapOpts = opts.map || {};
    this.root = root2;
    this.opts = opts;
    this.css = cssString;
    this.originalCSS = cssString;
    this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
    this.memoizedFileURLs = /* @__PURE__ */new Map();
    this.memoizedPaths = /* @__PURE__ */new Map();
    this.memoizedURLs = /* @__PURE__ */new Map();
  }
  return record_createClass(MapGenerator, [{
    key: "addAnnotation",
    value: function addAnnotation() {
      var content;
      if (this.isInline()) {
        content = "data:application/json;base64," + this.toBase64(this.map.toString());
      } else if (typeof this.mapOpts.annotation === "string") {
        content = this.mapOpts.annotation;
      } else if (typeof this.mapOpts.annotation === "function") {
        content = this.mapOpts.annotation(this.opts.to, this.root);
      } else {
        content = this.outputFile() + ".map";
      }
      var eol = "\n";
      if (this.css.includes("\r\n")) eol = "\r\n";
      this.css += eol + "/*# sourceMappingURL=" + content + " */";
    }
  }, {
    key: "applyPrevMaps",
    value: function applyPrevMaps() {
      var _iterator3 = record_createForOfIteratorHelper(this.previous()),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var prev = _step3.value;
          var from = this.toUrl(this.path(prev.file));
          var root2 = prev.root || dirname$2(prev.file);
          var map = void 0;
          if (this.mapOpts.sourcesContent === false) {
            map = new SourceMapConsumer$3(prev.text);
            if (map.sourcesContent) {
              map.sourcesContent = null;
            }
          } else {
            map = prev.consumer();
          }
          this.map.applySourceMap(map, from, this.toUrl(this.path(root2)));
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "clearAnnotation",
    value: function clearAnnotation() {
      if (this.mapOpts.annotation === false) return;
      if (this.root) {
        var node2;
        for (var i2 = this.root.nodes.length - 1; i2 >= 0; i2--) {
          node2 = this.root.nodes[i2];
          if (node2.type !== "comment") continue;
          if (node2.text.indexOf("# sourceMappingURL=") === 0) {
            this.root.removeChild(i2);
          }
        }
      } else if (this.css) {
        this.css = this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, "");
      }
    }
  }, {
    key: "generate",
    value: function generate() {
      this.clearAnnotation();
      if (pathAvailable$2 && sourceMapAvailable$2 && this.isMap()) {
        return this.generateMap();
      } else {
        var result2 = "";
        this.stringify(this.root, function (i2) {
          result2 += i2;
        });
        return [result2];
      }
    }
  }, {
    key: "generateMap",
    value: function generateMap() {
      if (this.root) {
        this.generateString();
      } else if (this.previous().length === 1) {
        var prev = this.previous()[0].consumer();
        prev.file = this.outputFile();
        this.map = SourceMapGenerator$3.fromSourceMap(prev, {
          ignoreInvalidMapping: true
        });
      } else {
        this.map = new SourceMapGenerator$3({
          file: this.outputFile(),
          ignoreInvalidMapping: true
        });
        this.map.addMapping({
          generated: {
            column: 0,
            line: 1
          },
          original: {
            column: 0,
            line: 1
          },
          source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
        });
      }
      if (this.isSourcesContent()) this.setSourcesContent();
      if (this.root && this.previous().length > 0) this.applyPrevMaps();
      if (this.isAnnotation()) this.addAnnotation();
      if (this.isInline()) {
        return [this.css];
      } else {
        return [this.css, this.map];
      }
    }
  }, {
    key: "generateString",
    value: function generateString() {
      var _this5 = this;
      this.css = "";
      this.map = new SourceMapGenerator$3({
        file: this.outputFile(),
        ignoreInvalidMapping: true
      });
      var line = 1;
      var column = 1;
      var noSource = "<no source>";
      var mapping = {
        generated: {
          column: 0,
          line: 0
        },
        original: {
          column: 0,
          line: 0
        },
        source: ""
      };
      var lines, last;
      this.stringify(this.root, function (str, node2, type) {
        _this5.css += str;
        if (node2 && type !== "end") {
          mapping.generated.line = line;
          mapping.generated.column = column - 1;
          if (node2.source && node2.source.start) {
            mapping.source = _this5.sourcePath(node2);
            mapping.original.line = node2.source.start.line;
            mapping.original.column = node2.source.start.column - 1;
            _this5.map.addMapping(mapping);
          } else {
            mapping.source = noSource;
            mapping.original.line = 1;
            mapping.original.column = 0;
            _this5.map.addMapping(mapping);
          }
        }
        lines = str.match(/\n/g);
        if (lines) {
          line += lines.length;
          last = str.lastIndexOf("\n");
          column = str.length - last;
        } else {
          column += str.length;
        }
        if (node2 && type !== "start") {
          var p = node2.parent || {
            raws: {}
          };
          var childless = node2.type === "decl" || node2.type === "atrule" && !node2.nodes;
          if (!childless || node2 !== p.last || p.raws.semicolon) {
            if (node2.source && node2.source.end) {
              mapping.source = _this5.sourcePath(node2);
              mapping.original.line = node2.source.end.line;
              mapping.original.column = node2.source.end.column - 1;
              mapping.generated.line = line;
              mapping.generated.column = column - 2;
              _this5.map.addMapping(mapping);
            } else {
              mapping.source = noSource;
              mapping.original.line = 1;
              mapping.original.column = 0;
              mapping.generated.line = line;
              mapping.generated.column = column - 1;
              _this5.map.addMapping(mapping);
            }
          }
        }
      });
    }
  }, {
    key: "isAnnotation",
    value: function isAnnotation() {
      if (this.isInline()) {
        return true;
      }
      if (typeof this.mapOpts.annotation !== "undefined") {
        return this.mapOpts.annotation;
      }
      if (this.previous().length) {
        return this.previous().some(function (i2) {
          return i2.annotation;
        });
      }
      return true;
    }
  }, {
    key: "isInline",
    value: function isInline() {
      if (typeof this.mapOpts.inline !== "undefined") {
        return this.mapOpts.inline;
      }
      var annotation = this.mapOpts.annotation;
      if (typeof annotation !== "undefined" && annotation !== true) {
        return false;
      }
      if (this.previous().length) {
        return this.previous().some(function (i2) {
          return i2.inline;
        });
      }
      return true;
    }
  }, {
    key: "isMap",
    value: function isMap() {
      if (typeof this.opts.map !== "undefined") {
        return !!this.opts.map;
      }
      return this.previous().length > 0;
    }
  }, {
    key: "isSourcesContent",
    value: function isSourcesContent() {
      if (typeof this.mapOpts.sourcesContent !== "undefined") {
        return this.mapOpts.sourcesContent;
      }
      if (this.previous().length) {
        return this.previous().some(function (i2) {
          return i2.withContent();
        });
      }
      return true;
    }
  }, {
    key: "outputFile",
    value: function outputFile() {
      if (this.opts.to) {
        return this.path(this.opts.to);
      } else if (this.opts.from) {
        return this.path(this.opts.from);
      } else {
        return "to.css";
      }
    }
  }, {
    key: "path",
    value: function path(file) {
      if (this.mapOpts.absolute) return file;
      if (file.charCodeAt(0) === 60) return file;
      if (/^\w+:\/\//.test(file)) return file;
      var cached = this.memoizedPaths.get(file);
      if (cached) return cached;
      var from = this.opts.to ? dirname$2(this.opts.to) : ".";
      if (typeof this.mapOpts.annotation === "string") {
        from = dirname$2(resolve$2(from, this.mapOpts.annotation));
      }
      var path = relative$1(from, file);
      this.memoizedPaths.set(file, path);
      return path;
    }
  }, {
    key: "previous",
    value: function previous() {
      var _this6 = this;
      if (!this.previousMaps) {
        this.previousMaps = [];
        if (this.root) {
          this.root.walk(function (node2) {
            if (node2.source && node2.source.input.map) {
              var map = node2.source.input.map;
              if (!_this6.previousMaps.includes(map)) {
                _this6.previousMaps.push(map);
              }
            }
          });
        } else {
          var input2 = new Input$3$1(this.originalCSS, this.opts);
          if (input2.map) this.previousMaps.push(input2.map);
        }
      }
      return this.previousMaps;
    }
  }, {
    key: "setSourcesContent",
    value: function setSourcesContent() {
      var _this7 = this;
      var already = {};
      if (this.root) {
        this.root.walk(function (node2) {
          if (node2.source) {
            var from = node2.source.input.from;
            if (from && !already[from]) {
              already[from] = true;
              var fromUrl = _this7.usesFileUrls ? _this7.toFileUrl(from) : _this7.toUrl(_this7.path(from));
              _this7.map.setSourceContent(fromUrl, node2.source.input.css);
            }
          }
        });
      } else if (this.css) {
        var from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
        this.map.setSourceContent(from, this.css);
      }
    }
  }, {
    key: "sourcePath",
    value: function sourcePath(node2) {
      if (this.mapOpts.from) {
        return this.toUrl(this.mapOpts.from);
      } else if (this.usesFileUrls) {
        return this.toFileUrl(node2.source.input.from);
      } else {
        return this.toUrl(this.path(node2.source.input.from));
      }
    }
  }, {
    key: "toBase64",
    value: function toBase64(str) {
      if (Buffer) {
        return Buffer.from(str).toString("base64");
      } else {
        return window.btoa(unescape(encodeURIComponent(str)));
      }
    }
  }, {
    key: "toFileUrl",
    value: function toFileUrl(path) {
      var cached = this.memoizedFileURLs.get(path);
      if (cached) return cached;
      if (pathToFileURL$2) {
        var fileURL = pathToFileURL$2(path).toString();
        this.memoizedFileURLs.set(path, fileURL);
        return fileURL;
      } else {
        throw new Error("`map.absolute` option is not available in this PostCSS build");
      }
    }
  }, {
    key: "toUrl",
    value: function toUrl(path) {
      var cached = this.memoizedURLs.get(path);
      if (cached) return cached;
      if (sep$1 === "\\") {
        path = path.replace(/\\/g, "/");
      }
      var url = encodeURI(path).replace(/[#?]/g, encodeURIComponent);
      this.memoizedURLs.set(path, url);
      return url;
    }
  }]);
}();
var mapGenerator$1 = MapGenerator$2$1;
var Node$2$1 = node$1;
var Comment$4$1 = /*#__PURE__*/function (_Node$2$) {
  function Comment(defaults) {
    var _this8;
    record_classCallCheck(this, Comment);
    _this8 = _callSuper(this, Comment, [defaults]);
    _this8.type = "comment";
    return _this8;
  }
  _inherits(Comment, _Node$2$);
  return record_createClass(Comment);
}(Node$2$1);
var comment$1 = Comment$4$1;
Comment$4$1.default = Comment$4$1;
var isClean$1$1 = symbols$1.isClean,
  my$1$1 = symbols$1.my;
var Declaration$3$1 = declaration$1;
var Comment$3$1 = comment$1;
var Node$1$1 = node$1;
var parse$4$1, Rule$4$1, AtRule$4$1, Root$6$1;
function cleanSource$1(nodes) {
  return nodes.map(function (i2) {
    if (i2.nodes) i2.nodes = cleanSource$1(i2.nodes);
    delete i2.source;
    return i2;
  });
}
function markDirtyUp$1(node2) {
  node2[isClean$1$1] = false;
  if (node2.proxyOf.nodes) {
    var _iterator4 = record_createForOfIteratorHelper(node2.proxyOf.nodes),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var i2 = _step4.value;
        markDirtyUp$1(i2);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }
}
var Container$7$1 = /*#__PURE__*/function (_Node$1$) {
  function Container() {
    record_classCallCheck(this, Container);
    return _callSuper(this, Container, arguments);
  }
  _inherits(Container, _Node$1$);
  return record_createClass(Container, [{
    key: "append",
    value: function append() {
      for (var _len2 = arguments.length, children = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        children[_key2] = arguments[_key2];
      }
      for (var _i5 = 0, _children = children; _i5 < _children.length; _i5++) {
        var child = _children[_i5];
        var nodes = this.normalize(child, this.last);
        var _iterator5 = record_createForOfIteratorHelper(nodes),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var node2 = _step5.value;
            this.proxyOf.nodes.push(node2);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
      this.markDirty();
      return this;
    }
  }, {
    key: "cleanRaws",
    value: function cleanRaws(keepBetween) {
      _superPropGet(Container, "cleanRaws", this, 3)([keepBetween]);
      if (this.nodes) {
        var _iterator6 = record_createForOfIteratorHelper(this.nodes),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var node2 = _step6.value;
            node2.cleanRaws(keepBetween);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    }
  }, {
    key: "each",
    value: function each(callback) {
      if (!this.proxyOf.nodes) return void 0;
      var iterator = this.getIterator();
      var index2, result2;
      while (this.indexes[iterator] < this.proxyOf.nodes.length) {
        index2 = this.indexes[iterator];
        result2 = callback(this.proxyOf.nodes[index2], index2);
        if (result2 === false) break;
        this.indexes[iterator] += 1;
      }
      delete this.indexes[iterator];
      return result2;
    }
  }, {
    key: "every",
    value: function every(condition) {
      return this.nodes.every(condition);
    }
  }, {
    key: "getIterator",
    value: function getIterator() {
      if (!this.lastEach) this.lastEach = 0;
      if (!this.indexes) this.indexes = {};
      this.lastEach += 1;
      var iterator = this.lastEach;
      this.indexes[iterator] = 0;
      return iterator;
    }
  }, {
    key: "getProxyProcessor",
    value: function getProxyProcessor() {
      return {
        get: function get(node2, prop) {
          if (prop === "proxyOf") {
            return node2;
          } else if (!node2[prop]) {
            return node2[prop];
          } else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) {
            return function () {
              for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
              }
              return node2[prop].apply(node2, record_toConsumableArray(args.map(function (i2) {
                if (typeof i2 === "function") {
                  return function (child, index2) {
                    return i2(child.toProxy(), index2);
                  };
                } else {
                  return i2;
                }
              })));
            };
          } else if (prop === "every" || prop === "some") {
            return function (cb) {
              return node2[prop](function (child) {
                for (var _len4 = arguments.length, other = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                  other[_key4 - 1] = arguments[_key4];
                }
                return cb.apply(void 0, [child.toProxy()].concat(other));
              });
            };
          } else if (prop === "root") {
            return function () {
              return node2.root().toProxy();
            };
          } else if (prop === "nodes") {
            return node2.nodes.map(function (i2) {
              return i2.toProxy();
            });
          } else if (prop === "first" || prop === "last") {
            return node2[prop].toProxy();
          } else {
            return node2[prop];
          }
        },
        set: function set(node2, prop, value) {
          if (node2[prop] === value) return true;
          node2[prop] = value;
          if (prop === "name" || prop === "params" || prop === "selector") {
            node2.markDirty();
          }
          return true;
        }
      };
    }
  }, {
    key: "index",
    value: function index(child) {
      if (typeof child === "number") return child;
      if (child.proxyOf) child = child.proxyOf;
      return this.proxyOf.nodes.indexOf(child);
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(exist, add) {
      var existIndex = this.index(exist);
      var nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
      existIndex = this.index(exist);
      var _iterator7 = record_createForOfIteratorHelper(nodes),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var node2 = _step7.value;
          this.proxyOf.nodes.splice(existIndex + 1, 0, node2);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      var index2;
      for (var id in this.indexes) {
        index2 = this.indexes[id];
        if (existIndex < index2) {
          this.indexes[id] = index2 + nodes.length;
        }
      }
      this.markDirty();
      return this;
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(exist, add) {
      var existIndex = this.index(exist);
      var type = existIndex === 0 ? "prepend" : false;
      var nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse();
      existIndex = this.index(exist);
      var _iterator8 = record_createForOfIteratorHelper(nodes),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var node2 = _step8.value;
          this.proxyOf.nodes.splice(existIndex, 0, node2);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      var index2;
      for (var id in this.indexes) {
        index2 = this.indexes[id];
        if (existIndex <= index2) {
          this.indexes[id] = index2 + nodes.length;
        }
      }
      this.markDirty();
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize(nodes, sample) {
      var _this9 = this;
      if (typeof nodes === "string") {
        nodes = cleanSource$1(parse$4$1(nodes).nodes);
      } else if (typeof nodes === "undefined") {
        nodes = [];
      } else if (Array.isArray(nodes)) {
        nodes = nodes.slice(0);
        var _iterator9 = record_createForOfIteratorHelper(nodes),
          _step9;
        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var i2 = _step9.value;
            if (i2.parent) i2.parent.removeChild(i2, "ignore");
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      } else if (nodes.type === "root" && this.type !== "document") {
        nodes = nodes.nodes.slice(0);
        var _iterator10 = record_createForOfIteratorHelper(nodes),
          _step10;
        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var _i6 = _step10.value;
            if (_i6.parent) _i6.parent.removeChild(_i6, "ignore");
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      } else if (nodes.type) {
        nodes = [nodes];
      } else if (nodes.prop) {
        if (typeof nodes.value === "undefined") {
          throw new Error("Value field is missed in node creation");
        } else if (typeof nodes.value !== "string") {
          nodes.value = String(nodes.value);
        }
        nodes = [new Declaration$3$1(nodes)];
      } else if (nodes.selector) {
        nodes = [new Rule$4$1(nodes)];
      } else if (nodes.name) {
        nodes = [new AtRule$4$1(nodes)];
      } else if (nodes.text) {
        nodes = [new Comment$3$1(nodes)];
      } else {
        throw new Error("Unknown node type in node creation");
      }
      var processed = nodes.map(function (i2) {
        if (!i2[my$1$1]) Container.rebuild(i2);
        i2 = i2.proxyOf;
        if (i2.parent) i2.parent.removeChild(i2);
        if (i2[isClean$1$1]) markDirtyUp$1(i2);
        if (typeof i2.raws.before === "undefined") {
          if (sample && typeof sample.raws.before !== "undefined") {
            i2.raws.before = sample.raws.before.replace(/\S/g, "");
          }
        }
        i2.parent = _this9.proxyOf;
        return i2;
      });
      return processed;
    }
  }, {
    key: "prepend",
    value: function prepend() {
      for (var _len5 = arguments.length, children = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        children[_key5] = arguments[_key5];
      }
      children = children.reverse();
      var _iterator11 = record_createForOfIteratorHelper(children),
        _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var child = _step11.value;
          var nodes = this.normalize(child, this.first, "prepend").reverse();
          var _iterator12 = record_createForOfIteratorHelper(nodes),
            _step12;
          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var node2 = _step12.value;
              this.proxyOf.nodes.unshift(node2);
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }
          for (var id in this.indexes) {
            this.indexes[id] = this.indexes[id] + nodes.length;
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
      this.markDirty();
      return this;
    }
  }, {
    key: "push",
    value: function push(child) {
      child.parent = this;
      this.proxyOf.nodes.push(child);
      return this;
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      var _iterator13 = record_createForOfIteratorHelper(this.proxyOf.nodes),
        _step13;
      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var node2 = _step13.value;
          node2.parent = void 0;
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
      this.proxyOf.nodes = [];
      this.markDirty();
      return this;
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      child = this.index(child);
      this.proxyOf.nodes[child].parent = void 0;
      this.proxyOf.nodes.splice(child, 1);
      var index2;
      for (var id in this.indexes) {
        index2 = this.indexes[id];
        if (index2 >= child) {
          this.indexes[id] = index2 - 1;
        }
      }
      this.markDirty();
      return this;
    }
  }, {
    key: "replaceValues",
    value: function replaceValues(pattern, opts, callback) {
      if (!callback) {
        callback = opts;
        opts = {};
      }
      this.walkDecls(function (decl) {
        if (opts.props && !opts.props.includes(decl.prop)) return;
        if (opts.fast && !decl.value.includes(opts.fast)) return;
        decl.value = decl.value.replace(pattern, callback);
      });
      this.markDirty();
      return this;
    }
  }, {
    key: "some",
    value: function some(condition) {
      return this.nodes.some(condition);
    }
  }, {
    key: "walk",
    value: function walk(callback) {
      return this.each(function (child, i2) {
        var result2;
        try {
          result2 = callback(child, i2);
        } catch (e2) {
          throw child.addToError(e2);
        }
        if (result2 !== false && child.walk) {
          result2 = child.walk(callback);
        }
        return result2;
      });
    }
  }, {
    key: "walkAtRules",
    value: function walkAtRules(name, callback) {
      if (!callback) {
        callback = name;
        return this.walk(function (child, i2) {
          if (child.type === "atrule") {
            return callback(child, i2);
          }
        });
      }
      if (name instanceof RegExp) {
        return this.walk(function (child, i2) {
          if (child.type === "atrule" && name.test(child.name)) {
            return callback(child, i2);
          }
        });
      }
      return this.walk(function (child, i2) {
        if (child.type === "atrule" && child.name === name) {
          return callback(child, i2);
        }
      });
    }
  }, {
    key: "walkComments",
    value: function walkComments(callback) {
      return this.walk(function (child, i2) {
        if (child.type === "comment") {
          return callback(child, i2);
        }
      });
    }
  }, {
    key: "walkDecls",
    value: function walkDecls(prop, callback) {
      if (!callback) {
        callback = prop;
        return this.walk(function (child, i2) {
          if (child.type === "decl") {
            return callback(child, i2);
          }
        });
      }
      if (prop instanceof RegExp) {
        return this.walk(function (child, i2) {
          if (child.type === "decl" && prop.test(child.prop)) {
            return callback(child, i2);
          }
        });
      }
      return this.walk(function (child, i2) {
        if (child.type === "decl" && child.prop === prop) {
          return callback(child, i2);
        }
      });
    }
  }, {
    key: "walkRules",
    value: function walkRules(selector, callback) {
      if (!callback) {
        callback = selector;
        return this.walk(function (child, i2) {
          if (child.type === "rule") {
            return callback(child, i2);
          }
        });
      }
      if (selector instanceof RegExp) {
        return this.walk(function (child, i2) {
          if (child.type === "rule" && selector.test(child.selector)) {
            return callback(child, i2);
          }
        });
      }
      return this.walk(function (child, i2) {
        if (child.type === "rule" && child.selector === selector) {
          return callback(child, i2);
        }
      });
    }
  }, {
    key: "first",
    get: function get() {
      if (!this.proxyOf.nodes) return void 0;
      return this.proxyOf.nodes[0];
    }
  }, {
    key: "last",
    get: function get() {
      if (!this.proxyOf.nodes) return void 0;
      return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
    }
  }]);
}(Node$1$1);
Container$7$1.registerParse = function (dependant) {
  parse$4$1 = dependant;
};
Container$7$1.registerRule = function (dependant) {
  Rule$4$1 = dependant;
};
Container$7$1.registerAtRule = function (dependant) {
  AtRule$4$1 = dependant;
};
Container$7$1.registerRoot = function (dependant) {
  Root$6$1 = dependant;
};
var container$1 = Container$7$1;
Container$7$1.default = Container$7$1;
Container$7$1.rebuild = function (node2) {
  if (node2.type === "atrule") {
    Object.setPrototypeOf(node2, AtRule$4$1.prototype);
  } else if (node2.type === "rule") {
    Object.setPrototypeOf(node2, Rule$4$1.prototype);
  } else if (node2.type === "decl") {
    Object.setPrototypeOf(node2, Declaration$3$1.prototype);
  } else if (node2.type === "comment") {
    Object.setPrototypeOf(node2, Comment$3$1.prototype);
  } else if (node2.type === "root") {
    Object.setPrototypeOf(node2, Root$6$1.prototype);
  }
  node2[my$1$1] = true;
  if (node2.nodes) {
    node2.nodes.forEach(function (child) {
      Container$7$1.rebuild(child);
    });
  }
};
var Container$6$1 = container$1;
var LazyResult$4$1, Processor$3$1;
var Document$3$1 = /*#__PURE__*/function (_Container$6$) {
  function Document2(defaults) {
    var _this10;
    record_classCallCheck(this, Document2);
    _this10 = _callSuper(this, Document2, [record_objectSpread({
      type: "document"
    }, defaults)]);
    if (!_this10.nodes) {
      _this10.nodes = [];
    }
    return _this10;
  }
  _inherits(Document2, _Container$6$);
  return record_createClass(Document2, [{
    key: "toResult",
    value: function toResult() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var lazy = new LazyResult$4$1(new Processor$3$1(), this, opts);
      return lazy.stringify();
    }
  }]);
}(Container$6$1);
Document$3$1.registerLazyResult = function (dependant) {
  LazyResult$4$1 = dependant;
};
Document$3$1.registerProcessor = function (dependant) {
  Processor$3$1 = dependant;
};
var document$1$1 = Document$3$1;
Document$3$1.default = Document$3$1;
var printed$1 = {};
var warnOnce$2$1 = function warnOnce(message) {
  if (printed$1[message]) return;
  printed$1[message] = true;
  if (typeof console !== "undefined" && console.warn) {
    console.warn(message);
  }
};
var Warning$2$1 = /*#__PURE__*/function () {
  function Warning(text) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    record_classCallCheck(this, Warning);
    this.type = "warning";
    this.text = text;
    if (opts.node && opts.node.source) {
      var range = opts.node.rangeBy(opts);
      this.line = range.start.line;
      this.column = range.start.column;
      this.endLine = range.end.line;
      this.endColumn = range.end.column;
    }
    for (var opt in opts) this[opt] = opts[opt];
  }
  return record_createClass(Warning, [{
    key: "toString",
    value: function toString() {
      if (this.node) {
        return this.node.error(this.text, {
          index: this.index,
          plugin: this.plugin,
          word: this.word
        }).message;
      }
      if (this.plugin) {
        return this.plugin + ": " + this.text;
      }
      return this.text;
    }
  }]);
}();
var warning$1 = Warning$2$1;
Warning$2$1.default = Warning$2$1;
var Warning$1$1 = warning$1;
var Result$3$1 = /*#__PURE__*/function () {
  function Result(processor2, root2, opts) {
    record_classCallCheck(this, Result);
    this.processor = processor2;
    this.messages = [];
    this.root = root2;
    this.opts = opts;
    this.css = void 0;
    this.map = void 0;
  }
  return record_createClass(Result, [{
    key: "toString",
    value: function toString() {
      return this.css;
    }
  }, {
    key: "warn",
    value: function warn(text) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!opts.plugin) {
        if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
          opts.plugin = this.lastPlugin.postcssPlugin;
        }
      }
      var warning2 = new Warning$1$1(text, opts);
      this.messages.push(warning2);
      return warning2;
    }
  }, {
    key: "warnings",
    value: function warnings() {
      return this.messages.filter(function (i2) {
        return i2.type === "warning";
      });
    }
  }, {
    key: "content",
    get: function get() {
      return this.css;
    }
  }]);
}();
var result$1 = Result$3$1;
Result$3$1.default = Result$3$1;
var SINGLE_QUOTE$1 = "'".charCodeAt(0);
var DOUBLE_QUOTE$1 = '"'.charCodeAt(0);
var BACKSLASH$1 = "\\".charCodeAt(0);
var SLASH$1 = "/".charCodeAt(0);
var NEWLINE$1 = "\n".charCodeAt(0);
var SPACE$1 = " ".charCodeAt(0);
var FEED$1 = "\f".charCodeAt(0);
var TAB$1 = "	".charCodeAt(0);
var CR$1 = "\r".charCodeAt(0);
var OPEN_SQUARE$1 = "[".charCodeAt(0);
var CLOSE_SQUARE$1 = "]".charCodeAt(0);
var OPEN_PARENTHESES$1 = "(".charCodeAt(0);
var CLOSE_PARENTHESES$1 = ")".charCodeAt(0);
var OPEN_CURLY$1 = "{".charCodeAt(0);
var CLOSE_CURLY$1 = "}".charCodeAt(0);
var SEMICOLON$1 = ";".charCodeAt(0);
var ASTERISK$1 = "*".charCodeAt(0);
var COLON$1 = ":".charCodeAt(0);
var AT$1 = "@".charCodeAt(0);
var RE_AT_END$1 = /[\t\n\f\r "#'()/;[\\\]{}]/g;
var RE_WORD_END$1 = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
var RE_BAD_BRACKET$1 = /.[\r\n"'(/\\]/;
var RE_HEX_ESCAPE$1 = /[\da-f]/i;
var tokenize$1 = function tokenizer(input2) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var css = input2.css.valueOf();
  var ignore = options.ignoreErrors;
  var code, next, quote, content, escape;
  var escaped, escapePos, prev, n2, currentToken;
  var length = css.length;
  var pos = 0;
  var buffer = [];
  var returned = [];
  function position() {
    return pos;
  }
  function unclosed(what) {
    throw input2.error("Unclosed " + what, pos);
  }
  function endOfFile() {
    return returned.length === 0 && pos >= length;
  }
  function nextToken(opts) {
    if (returned.length) return returned.pop();
    if (pos >= length) return;
    var ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
    code = css.charCodeAt(pos);
    switch (code) {
      case NEWLINE$1:
      case SPACE$1:
      case TAB$1:
      case CR$1:
      case FEED$1:
        {
          next = pos;
          do {
            next += 1;
            code = css.charCodeAt(next);
          } while (code === SPACE$1 || code === NEWLINE$1 || code === TAB$1 || code === CR$1 || code === FEED$1);
          currentToken = ["space", css.slice(pos, next)];
          pos = next - 1;
          break;
        }
      case OPEN_SQUARE$1:
      case CLOSE_SQUARE$1:
      case OPEN_CURLY$1:
      case CLOSE_CURLY$1:
      case COLON$1:
      case SEMICOLON$1:
      case CLOSE_PARENTHESES$1:
        {
          var controlChar = String.fromCharCode(code);
          currentToken = [controlChar, controlChar, pos];
          break;
        }
      case OPEN_PARENTHESES$1:
        {
          prev = buffer.length ? buffer.pop()[1] : "";
          n2 = css.charCodeAt(pos + 1);
          if (prev === "url" && n2 !== SINGLE_QUOTE$1 && n2 !== DOUBLE_QUOTE$1 && n2 !== SPACE$1 && n2 !== NEWLINE$1 && n2 !== TAB$1 && n2 !== FEED$1 && n2 !== CR$1) {
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(")", next + 1);
              if (next === -1) {
                if (ignore || ignoreUnclosed) {
                  next = pos;
                  break;
                } else {
                  unclosed("bracket");
                }
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === BACKSLASH$1) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            currentToken = ["brackets", css.slice(pos, next + 1), pos, next];
            pos = next;
          } else {
            next = css.indexOf(")", pos + 1);
            content = css.slice(pos, next + 1);
            if (next === -1 || RE_BAD_BRACKET$1.test(content)) {
              currentToken = ["(", "(", pos];
            } else {
              currentToken = ["brackets", content, pos, next];
              pos = next;
            }
          }
          break;
        }
      case SINGLE_QUOTE$1:
      case DOUBLE_QUOTE$1:
        {
          quote = code === SINGLE_QUOTE$1 ? "'" : '"';
          next = pos;
          do {
            escaped = false;
            next = css.indexOf(quote, next + 1);
            if (next === -1) {
              if (ignore || ignoreUnclosed) {
                next = pos + 1;
                break;
              } else {
                unclosed("string");
              }
            }
            escapePos = next;
            while (css.charCodeAt(escapePos - 1) === BACKSLASH$1) {
              escapePos -= 1;
              escaped = !escaped;
            }
          } while (escaped);
          currentToken = ["string", css.slice(pos, next + 1), pos, next];
          pos = next;
          break;
        }
      case AT$1:
        {
          RE_AT_END$1.lastIndex = pos + 1;
          RE_AT_END$1.test(css);
          if (RE_AT_END$1.lastIndex === 0) {
            next = css.length - 1;
          } else {
            next = RE_AT_END$1.lastIndex - 2;
          }
          currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
          pos = next;
          break;
        }
      case BACKSLASH$1:
        {
          next = pos;
          escape = true;
          while (css.charCodeAt(next + 1) === BACKSLASH$1) {
            next += 1;
            escape = !escape;
          }
          code = css.charCodeAt(next + 1);
          if (escape && code !== SLASH$1 && code !== SPACE$1 && code !== NEWLINE$1 && code !== TAB$1 && code !== CR$1 && code !== FEED$1) {
            next += 1;
            if (RE_HEX_ESCAPE$1.test(css.charAt(next))) {
              while (RE_HEX_ESCAPE$1.test(css.charAt(next + 1))) {
                next += 1;
              }
              if (css.charCodeAt(next + 1) === SPACE$1) {
                next += 1;
              }
            }
          }
          currentToken = ["word", css.slice(pos, next + 1), pos, next];
          pos = next;
          break;
        }
      default:
        {
          if (code === SLASH$1 && css.charCodeAt(pos + 1) === ASTERISK$1) {
            next = css.indexOf("*/", pos + 2) + 1;
            if (next === 0) {
              if (ignore || ignoreUnclosed) {
                next = css.length;
              } else {
                unclosed("comment");
              }
            }
            currentToken = ["comment", css.slice(pos, next + 1), pos, next];
            pos = next;
          } else {
            RE_WORD_END$1.lastIndex = pos + 1;
            RE_WORD_END$1.test(css);
            if (RE_WORD_END$1.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_WORD_END$1.lastIndex - 2;
            }
            currentToken = ["word", css.slice(pos, next + 1), pos, next];
            buffer.push(currentToken);
            pos = next;
          }
          break;
        }
    }
    pos++;
    return currentToken;
  }
  function back(token) {
    returned.push(token);
  }
  return {
    back: back,
    endOfFile: endOfFile,
    nextToken: nextToken,
    position: position
  };
};
var Container$5$1 = container$1;
var AtRule$3$1 = /*#__PURE__*/function (_Container$5$) {
  function AtRule(defaults) {
    var _this11;
    record_classCallCheck(this, AtRule);
    _this11 = _callSuper(this, AtRule, [defaults]);
    _this11.type = "atrule";
    return _this11;
  }
  _inherits(AtRule, _Container$5$);
  return record_createClass(AtRule, [{
    key: "append",
    value: function append() {
      if (!this.proxyOf.nodes) this.nodes = [];
      for (var _len6 = arguments.length, children = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        children[_key6] = arguments[_key6];
      }
      return _superPropGet(AtRule, "append", this, 3)(children);
    }
  }, {
    key: "prepend",
    value: function prepend() {
      if (!this.proxyOf.nodes) this.nodes = [];
      for (var _len7 = arguments.length, children = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        children[_key7] = arguments[_key7];
      }
      return _superPropGet(AtRule, "prepend", this, 3)(children);
    }
  }]);
}(Container$5$1);
var atRule$1 = AtRule$3$1;
AtRule$3$1.default = AtRule$3$1;
Container$5$1.registerAtRule(AtRule$3$1);
var Container$4$1 = container$1;
var LazyResult$3$1, Processor$2$1;
var Root$5$1 = /*#__PURE__*/function (_Container$4$) {
  function Root(defaults) {
    var _this12;
    record_classCallCheck(this, Root);
    _this12 = _callSuper(this, Root, [defaults]);
    _this12.type = "root";
    if (!_this12.nodes) _this12.nodes = [];
    return _this12;
  }
  _inherits(Root, _Container$4$);
  return record_createClass(Root, [{
    key: "normalize",
    value: function normalize(child, sample, type) {
      var nodes = _superPropGet(Root, "normalize", this, 3)([child]);
      if (sample) {
        if (type === "prepend") {
          if (this.nodes.length > 1) {
            sample.raws.before = this.nodes[1].raws.before;
          } else {
            delete sample.raws.before;
          }
        } else if (this.first !== sample) {
          var _iterator14 = record_createForOfIteratorHelper(nodes),
            _step14;
          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var node2 = _step14.value;
              node2.raws.before = sample.raws.before;
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }
        }
      }
      return nodes;
    }
  }, {
    key: "removeChild",
    value: function removeChild(child, ignore) {
      var index2 = this.index(child);
      if (!ignore && index2 === 0 && this.nodes.length > 1) {
        this.nodes[1].raws.before = this.nodes[index2].raws.before;
      }
      return _superPropGet(Root, "removeChild", this, 3)([child]);
    }
  }, {
    key: "toResult",
    value: function toResult() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var lazy = new LazyResult$3$1(new Processor$2$1(), this, opts);
      return lazy.stringify();
    }
  }]);
}(Container$4$1);
Root$5$1.registerLazyResult = function (dependant) {
  LazyResult$3$1 = dependant;
};
Root$5$1.registerProcessor = function (dependant) {
  Processor$2$1 = dependant;
};
var root$1 = Root$5$1;
Root$5$1.default = Root$5$1;
Container$4$1.registerRoot(Root$5$1);
var list$2$1 = {
  comma: function comma(string) {
    return list$2$1.split(string, [","], true);
  },
  space: function space(string) {
    var spaces = [" ", "\n", "	"];
    return list$2$1.split(string, spaces);
  },
  split: function split(string, separators, last) {
    var array = [];
    var current = "";
    var split = false;
    var func = 0;
    var inQuote = false;
    var prevQuote = "";
    var escape = false;
    var _iterator15 = record_createForOfIteratorHelper(string),
      _step15;
    try {
      for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
        var letter = _step15.value;
        if (escape) {
          escape = false;
        } else if (letter === "\\") {
          escape = true;
        } else if (inQuote) {
          if (letter === prevQuote) {
            inQuote = false;
          }
        } else if (letter === '"' || letter === "'") {
          inQuote = true;
          prevQuote = letter;
        } else if (letter === "(") {
          func += 1;
        } else if (letter === ")") {
          if (func > 0) func -= 1;
        } else if (func === 0) {
          if (separators.includes(letter)) split = true;
        }
        if (split) {
          if (current !== "") array.push(current.trim());
          current = "";
          split = false;
        } else {
          current += letter;
        }
      }
    } catch (err) {
      _iterator15.e(err);
    } finally {
      _iterator15.f();
    }
    if (last || current !== "") array.push(current.trim());
    return array;
  }
};
var list_1$1 = list$2$1;
list$2$1.default = list$2$1;
var Container$3$1 = container$1;
var list$1$1 = list_1$1;
var Rule$3$1 = /*#__PURE__*/function (_Container$3$) {
  function Rule(defaults) {
    var _this13;
    record_classCallCheck(this, Rule);
    _this13 = _callSuper(this, Rule, [defaults]);
    _this13.type = "rule";
    if (!_this13.nodes) _this13.nodes = [];
    return _this13;
  }
  _inherits(Rule, _Container$3$);
  return record_createClass(Rule, [{
    key: "selectors",
    get: function get() {
      return list$1$1.comma(this.selector);
    },
    set: function set(values) {
      var match = this.selector ? this.selector.match(/,\s*/) : null;
      var sep2 = match ? match[0] : "," + this.raw("between", "beforeOpen");
      this.selector = values.join(sep2);
    }
  }]);
}(Container$3$1);
var rule$1 = Rule$3$1;
Rule$3$1.default = Rule$3$1;
Container$3$1.registerRule(Rule$3$1);
var Declaration$2$1 = declaration$1;
var tokenizer2$1 = tokenize$1;
var Comment$2$1 = comment$1;
var AtRule$2$1 = atRule$1;
var Root$4$1 = root$1;
var Rule$2$1 = rule$1;
var SAFE_COMMENT_NEIGHBOR$1 = {
  empty: true,
  space: true
};
function findLastWithPosition$1(tokens) {
  for (var i2 = tokens.length - 1; i2 >= 0; i2--) {
    var token = tokens[i2];
    var pos = token[3] || token[2];
    if (pos) return pos;
  }
}
var Parser$1$1 = /*#__PURE__*/function () {
  function Parser(input2) {
    record_classCallCheck(this, Parser);
    this.input = input2;
    this.root = new Root$4$1();
    this.current = this.root;
    this.spaces = "";
    this.semicolon = false;
    this.createTokenizer();
    this.root.source = {
      input: input2,
      start: {
        column: 1,
        line: 1,
        offset: 0
      }
    };
  }
  return record_createClass(Parser, [{
    key: "atrule",
    value: function atrule(token) {
      var node2 = new AtRule$2$1();
      node2.name = token[1].slice(1);
      if (node2.name === "") {
        this.unnamedAtrule(node2, token);
      }
      this.init(node2, token[2]);
      var type;
      var prev;
      var shift;
      var last = false;
      var open = false;
      var params = [];
      var brackets = [];
      while (!this.tokenizer.endOfFile()) {
        token = this.tokenizer.nextToken();
        type = token[0];
        if (type === "(" || type === "[") {
          brackets.push(type === "(" ? ")" : "]");
        } else if (type === "{" && brackets.length > 0) {
          brackets.push("}");
        } else if (type === brackets[brackets.length - 1]) {
          brackets.pop();
        }
        if (brackets.length === 0) {
          if (type === ";") {
            node2.source.end = this.getPosition(token[2]);
            node2.source.end.offset++;
            this.semicolon = true;
            break;
          } else if (type === "{") {
            open = true;
            break;
          } else if (type === "}") {
            if (params.length > 0) {
              shift = params.length - 1;
              prev = params[shift];
              while (prev && prev[0] === "space") {
                prev = params[--shift];
              }
              if (prev) {
                node2.source.end = this.getPosition(prev[3] || prev[2]);
                node2.source.end.offset++;
              }
            }
            this.end(token);
            break;
          } else {
            params.push(token);
          }
        } else {
          params.push(token);
        }
        if (this.tokenizer.endOfFile()) {
          last = true;
          break;
        }
      }
      node2.raws.between = this.spacesAndCommentsFromEnd(params);
      if (params.length) {
        node2.raws.afterName = this.spacesAndCommentsFromStart(params);
        this.raw(node2, "params", params);
        if (last) {
          token = params[params.length - 1];
          node2.source.end = this.getPosition(token[3] || token[2]);
          node2.source.end.offset++;
          this.spaces = node2.raws.between;
          node2.raws.between = "";
        }
      } else {
        node2.raws.afterName = "";
        node2.params = "";
      }
      if (open) {
        node2.nodes = [];
        this.current = node2;
      }
    }
  }, {
    key: "checkMissedSemicolon",
    value: function checkMissedSemicolon(tokens) {
      var colon = this.colon(tokens);
      if (colon === false) return;
      var founded = 0;
      var token;
      for (var j = colon - 1; j >= 0; j--) {
        token = tokens[j];
        if (token[0] !== "space") {
          founded += 1;
          if (founded === 2) break;
        }
      }
      throw this.input.error("Missed semicolon", token[0] === "word" ? token[3] + 1 : token[2]);
    }
  }, {
    key: "colon",
    value: function colon(tokens) {
      var brackets = 0;
      var token, type, prev;
      var _iterator16 = record_createForOfIteratorHelper(tokens.entries()),
        _step16;
      try {
        for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
          var _step16$value = record_slicedToArray(_step16.value, 2),
            i2 = _step16$value[0],
            element = _step16$value[1];
          token = element;
          type = token[0];
          if (type === "(") {
            brackets += 1;
          }
          if (type === ")") {
            brackets -= 1;
          }
          if (brackets === 0 && type === ":") {
            if (!prev) {
              this.doubleColon(token);
            } else if (prev[0] === "word" && prev[1] === "progid") {
              continue;
            } else {
              return i2;
            }
          }
          prev = token;
        }
      } catch (err) {
        _iterator16.e(err);
      } finally {
        _iterator16.f();
      }
      return false;
    }
  }, {
    key: "comment",
    value: function comment(token) {
      var node2 = new Comment$2$1();
      this.init(node2, token[2]);
      node2.source.end = this.getPosition(token[3] || token[2]);
      node2.source.end.offset++;
      var text = token[1].slice(2, -2);
      if (/^\s*$/.test(text)) {
        node2.text = "";
        node2.raws.left = text;
        node2.raws.right = "";
      } else {
        var match = text.match(/^(\s*)([^]*\S)(\s*)$/);
        node2.text = match[2];
        node2.raws.left = match[1];
        node2.raws.right = match[3];
      }
    }
  }, {
    key: "createTokenizer",
    value: function createTokenizer() {
      this.tokenizer = tokenizer2$1(this.input);
    }
  }, {
    key: "decl",
    value: function decl(tokens, customProperty) {
      var node2 = new Declaration$2$1();
      this.init(node2, tokens[0][2]);
      var last = tokens[tokens.length - 1];
      if (last[0] === ";") {
        this.semicolon = true;
        tokens.pop();
      }
      node2.source.end = this.getPosition(last[3] || last[2] || findLastWithPosition$1(tokens));
      node2.source.end.offset++;
      while (tokens[0][0] !== "word") {
        if (tokens.length === 1) this.unknownWord(tokens);
        node2.raws.before += tokens.shift()[1];
      }
      node2.source.start = this.getPosition(tokens[0][2]);
      node2.prop = "";
      while (tokens.length) {
        var type = tokens[0][0];
        if (type === ":" || type === "space" || type === "comment") {
          break;
        }
        node2.prop += tokens.shift()[1];
      }
      node2.raws.between = "";
      var token;
      while (tokens.length) {
        token = tokens.shift();
        if (token[0] === ":") {
          node2.raws.between += token[1];
          break;
        } else {
          if (token[0] === "word" && /\w/.test(token[1])) {
            this.unknownWord([token]);
          }
          node2.raws.between += token[1];
        }
      }
      if (node2.prop[0] === "_" || node2.prop[0] === "*") {
        node2.raws.before += node2.prop[0];
        node2.prop = node2.prop.slice(1);
      }
      var firstSpaces = [];
      var next;
      while (tokens.length) {
        next = tokens[0][0];
        if (next !== "space" && next !== "comment") break;
        firstSpaces.push(tokens.shift());
      }
      this.precheckMissedSemicolon(tokens);
      for (var i2 = tokens.length - 1; i2 >= 0; i2--) {
        token = tokens[i2];
        if (token[1].toLowerCase() === "!important") {
          node2.important = true;
          var string = this.stringFrom(tokens, i2);
          string = this.spacesFromEnd(tokens) + string;
          if (string !== " !important") node2.raws.important = string;
          break;
        } else if (token[1].toLowerCase() === "important") {
          var cache = tokens.slice(0);
          var str = "";
          for (var j = i2; j > 0; j--) {
            var _type = cache[j][0];
            if (str.trim().indexOf("!") === 0 && _type !== "space") {
              break;
            }
            str = cache.pop()[1] + str;
          }
          if (str.trim().indexOf("!") === 0) {
            node2.important = true;
            node2.raws.important = str;
            tokens = cache;
          }
        }
        if (token[0] !== "space" && token[0] !== "comment") {
          break;
        }
      }
      var hasWord = tokens.some(function (i2) {
        return i2[0] !== "space" && i2[0] !== "comment";
      });
      if (hasWord) {
        node2.raws.between += firstSpaces.map(function (i2) {
          return i2[1];
        }).join("");
        firstSpaces = [];
      }
      this.raw(node2, "value", firstSpaces.concat(tokens), customProperty);
      if (node2.value.includes(":") && !customProperty) {
        this.checkMissedSemicolon(tokens);
      }
    }
  }, {
    key: "doubleColon",
    value: function doubleColon(token) {
      throw this.input.error("Double colon", {
        offset: token[2]
      }, {
        offset: token[2] + token[1].length
      });
    }
  }, {
    key: "emptyRule",
    value: function emptyRule(token) {
      var node2 = new Rule$2$1();
      this.init(node2, token[2]);
      node2.selector = "";
      node2.raws.between = "";
      this.current = node2;
    }
  }, {
    key: "end",
    value: function end(token) {
      if (this.current.nodes && this.current.nodes.length) {
        this.current.raws.semicolon = this.semicolon;
      }
      this.semicolon = false;
      this.current.raws.after = (this.current.raws.after || "") + this.spaces;
      this.spaces = "";
      if (this.current.parent) {
        this.current.source.end = this.getPosition(token[2]);
        this.current.source.end.offset++;
        this.current = this.current.parent;
      } else {
        this.unexpectedClose(token);
      }
    }
  }, {
    key: "endFile",
    value: function endFile() {
      if (this.current.parent) this.unclosedBlock();
      if (this.current.nodes && this.current.nodes.length) {
        this.current.raws.semicolon = this.semicolon;
      }
      this.current.raws.after = (this.current.raws.after || "") + this.spaces;
      this.root.source.end = this.getPosition(this.tokenizer.position());
    }
  }, {
    key: "freeSemicolon",
    value: function freeSemicolon(token) {
      this.spaces += token[1];
      if (this.current.nodes) {
        var prev = this.current.nodes[this.current.nodes.length - 1];
        if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
          prev.raws.ownSemicolon = this.spaces;
          this.spaces = "";
        }
      }
    }
    // Helpers
  }, {
    key: "getPosition",
    value: function getPosition(offset) {
      var pos = this.input.fromOffset(offset);
      return {
        column: pos.col,
        line: pos.line,
        offset: offset
      };
    }
  }, {
    key: "init",
    value: function init(node2, offset) {
      this.current.push(node2);
      node2.source = {
        input: this.input,
        start: this.getPosition(offset)
      };
      node2.raws.before = this.spaces;
      this.spaces = "";
      if (node2.type !== "comment") this.semicolon = false;
    }
  }, {
    key: "other",
    value: function other(start) {
      var end = false;
      var type = null;
      var colon = false;
      var bracket = null;
      var brackets = [];
      var customProperty = start[1].startsWith("--");
      var tokens = [];
      var token = start;
      while (token) {
        type = token[0];
        tokens.push(token);
        if (type === "(" || type === "[") {
          if (!bracket) bracket = token;
          brackets.push(type === "(" ? ")" : "]");
        } else if (customProperty && colon && type === "{") {
          if (!bracket) bracket = token;
          brackets.push("}");
        } else if (brackets.length === 0) {
          if (type === ";") {
            if (colon) {
              this.decl(tokens, customProperty);
              return;
            } else {
              break;
            }
          } else if (type === "{") {
            this.rule(tokens);
            return;
          } else if (type === "}") {
            this.tokenizer.back(tokens.pop());
            end = true;
            break;
          } else if (type === ":") {
            colon = true;
          }
        } else if (type === brackets[brackets.length - 1]) {
          brackets.pop();
          if (brackets.length === 0) bracket = null;
        }
        token = this.tokenizer.nextToken();
      }
      if (this.tokenizer.endOfFile()) end = true;
      if (brackets.length > 0) this.unclosedBracket(bracket);
      if (end && colon) {
        if (!customProperty) {
          while (tokens.length) {
            token = tokens[tokens.length - 1][0];
            if (token !== "space" && token !== "comment") break;
            this.tokenizer.back(tokens.pop());
          }
        }
        this.decl(tokens, customProperty);
      } else {
        this.unknownWord(tokens);
      }
    }
  }, {
    key: "parse",
    value: function parse() {
      var token;
      while (!this.tokenizer.endOfFile()) {
        token = this.tokenizer.nextToken();
        switch (token[0]) {
          case "space":
            this.spaces += token[1];
            break;
          case ";":
            this.freeSemicolon(token);
            break;
          case "}":
            this.end(token);
            break;
          case "comment":
            this.comment(token);
            break;
          case "at-word":
            this.atrule(token);
            break;
          case "{":
            this.emptyRule(token);
            break;
          default:
            this.other(token);
            break;
        }
      }
      this.endFile();
    }
  }, {
    key: "precheckMissedSemicolon",
    value: function precheckMissedSemicolon() {}
  }, {
    key: "raw",
    value: function raw(node2, prop, tokens, customProperty) {
      var token, type;
      var length = tokens.length;
      var value = "";
      var clean = true;
      var next, prev;
      for (var i2 = 0; i2 < length; i2 += 1) {
        token = tokens[i2];
        type = token[0];
        if (type === "space" && i2 === length - 1 && !customProperty) {
          clean = false;
        } else if (type === "comment") {
          prev = tokens[i2 - 1] ? tokens[i2 - 1][0] : "empty";
          next = tokens[i2 + 1] ? tokens[i2 + 1][0] : "empty";
          if (!SAFE_COMMENT_NEIGHBOR$1[prev] && !SAFE_COMMENT_NEIGHBOR$1[next]) {
            if (value.slice(-1) === ",") {
              clean = false;
            } else {
              value += token[1];
            }
          } else {
            clean = false;
          }
        } else {
          value += token[1];
        }
      }
      if (!clean) {
        var _raw = tokens.reduce(function (all, i2) {
          return all + i2[1];
        }, "");
        node2.raws[prop] = {
          raw: _raw,
          value: value
        };
      }
      node2[prop] = value;
    }
  }, {
    key: "rule",
    value: function rule(tokens) {
      tokens.pop();
      var node2 = new Rule$2$1();
      this.init(node2, tokens[0][2]);
      node2.raws.between = this.spacesAndCommentsFromEnd(tokens);
      this.raw(node2, "selector", tokens);
      this.current = node2;
    }
  }, {
    key: "spacesAndCommentsFromEnd",
    value: function spacesAndCommentsFromEnd(tokens) {
      var lastTokenType;
      var spaces = "";
      while (tokens.length) {
        lastTokenType = tokens[tokens.length - 1][0];
        if (lastTokenType !== "space" && lastTokenType !== "comment") break;
        spaces = tokens.pop()[1] + spaces;
      }
      return spaces;
    }
    // Errors
  }, {
    key: "spacesAndCommentsFromStart",
    value: function spacesAndCommentsFromStart(tokens) {
      var next;
      var spaces = "";
      while (tokens.length) {
        next = tokens[0][0];
        if (next !== "space" && next !== "comment") break;
        spaces += tokens.shift()[1];
      }
      return spaces;
    }
  }, {
    key: "spacesFromEnd",
    value: function spacesFromEnd(tokens) {
      var lastTokenType;
      var spaces = "";
      while (tokens.length) {
        lastTokenType = tokens[tokens.length - 1][0];
        if (lastTokenType !== "space") break;
        spaces = tokens.pop()[1] + spaces;
      }
      return spaces;
    }
  }, {
    key: "stringFrom",
    value: function stringFrom(tokens, from) {
      var result2 = "";
      for (var i2 = from; i2 < tokens.length; i2++) {
        result2 += tokens[i2][1];
      }
      tokens.splice(from, tokens.length - from);
      return result2;
    }
  }, {
    key: "unclosedBlock",
    value: function unclosedBlock() {
      var pos = this.current.source.start;
      throw this.input.error("Unclosed block", pos.line, pos.column);
    }
  }, {
    key: "unclosedBracket",
    value: function unclosedBracket(bracket) {
      throw this.input.error("Unclosed bracket", {
        offset: bracket[2]
      }, {
        offset: bracket[2] + 1
      });
    }
  }, {
    key: "unexpectedClose",
    value: function unexpectedClose(token) {
      throw this.input.error("Unexpected }", {
        offset: token[2]
      }, {
        offset: token[2] + 1
      });
    }
  }, {
    key: "unknownWord",
    value: function unknownWord(tokens) {
      throw this.input.error("Unknown word", {
        offset: tokens[0][2]
      }, {
        offset: tokens[0][2] + tokens[0][1].length
      });
    }
  }, {
    key: "unnamedAtrule",
    value: function unnamedAtrule(node2, token) {
      throw this.input.error("At-rule without name", {
        offset: token[2]
      }, {
        offset: token[2] + token[1].length
      });
    }
  }]);
}();
var parser$1 = Parser$1$1;
var Container$2$1 = container$1;
var Parser2$1 = parser$1;
var Input$2$1 = input$1;
function parse$3$1(css, opts) {
  var input2 = new Input$2$1(css, opts);
  var parser2 = new Parser2$1(input2);
  try {
    parser2.parse();
  } catch (e2) {
    if (false) {}
    throw e2;
  }
  return parser2.root;
}
var parse_1$1 = parse$3$1;
parse$3$1.default = parse$3$1;
Container$2$1.registerParse(parse$3$1);
var isClean$3 = symbols$1.isClean,
  my$3 = symbols$1.my;
var MapGenerator$1$1 = mapGenerator$1;
var stringify$2$1 = stringify_1$1;
var Container$1$1 = container$1;
var Document$2$1 = document$1$1;
var warnOnce$1$1 = (/* unused pure expression or super */ null && (warnOnce$2$1));
var Result$2$1 = result$1;
var parse$2$1 = parse_1$1;
var Root$3$1 = root$1;
var TYPE_TO_CLASS_NAME$1 = {
  atrule: "AtRule",
  comment: "Comment",
  decl: "Declaration",
  document: "Document",
  root: "Root",
  rule: "Rule"
};
var PLUGIN_PROPS$1 = {
  AtRule: true,
  AtRuleExit: true,
  Comment: true,
  CommentExit: true,
  Declaration: true,
  DeclarationExit: true,
  Document: true,
  DocumentExit: true,
  Once: true,
  OnceExit: true,
  postcssPlugin: true,
  prepare: true,
  Root: true,
  RootExit: true,
  Rule: true,
  RuleExit: true
};
var NOT_VISITORS$1 = {
  Once: true,
  postcssPlugin: true,
  prepare: true
};
var CHILDREN$1 = 0;
function isPromise$1(obj) {
  return record_typeof(obj) === "object" && typeof obj.then === "function";
}
function getEvents$1(node2) {
  var key = false;
  var type = TYPE_TO_CLASS_NAME$1[node2.type];
  if (node2.type === "decl") {
    key = node2.prop.toLowerCase();
  } else if (node2.type === "atrule") {
    key = node2.name.toLowerCase();
  }
  if (key && node2.append) {
    return [type, type + "-" + key, CHILDREN$1, type + "Exit", type + "Exit-" + key];
  } else if (key) {
    return [type, type + "-" + key, type + "Exit", type + "Exit-" + key];
  } else if (node2.append) {
    return [type, CHILDREN$1, type + "Exit"];
  } else {
    return [type, type + "Exit"];
  }
}
function toStack$1(node2) {
  var events;
  if (node2.type === "document") {
    events = ["Document", CHILDREN$1, "DocumentExit"];
  } else if (node2.type === "root") {
    events = ["Root", CHILDREN$1, "RootExit"];
  } else {
    events = getEvents$1(node2);
  }
  return {
    eventIndex: 0,
    events: events,
    iterator: 0,
    node: node2,
    visitorIndex: 0,
    visitors: []
  };
}
function cleanMarks$1(node2) {
  node2[isClean$3] = false;
  if (node2.nodes) node2.nodes.forEach(function (i2) {
    return cleanMarks$1(i2);
  });
  return node2;
}
var postcss$2$1 = {};
var LazyResult$2$1 = /*#__PURE__*/function () {
  function LazyResult(processor2, css, opts) {
    var _this14 = this;
    record_classCallCheck(this, LazyResult);
    this.stringified = false;
    this.processed = false;
    var root2;
    if (record_typeof(css) === "object" && css !== null && (css.type === "root" || css.type === "document")) {
      root2 = cleanMarks$1(css);
    } else if (css instanceof LazyResult || css instanceof Result$2$1) {
      root2 = cleanMarks$1(css.root);
      if (css.map) {
        if (typeof opts.map === "undefined") opts.map = {};
        if (!opts.map.inline) opts.map.inline = false;
        opts.map.prev = css.map;
      }
    } else {
      var parser2 = parse$2$1;
      if (opts.syntax) parser2 = opts.syntax.parse;
      if (opts.parser) parser2 = opts.parser;
      if (parser2.parse) parser2 = parser2.parse;
      try {
        root2 = parser2(css, opts);
      } catch (error) {
        this.processed = true;
        this.error = error;
      }
      if (root2 && !root2[my$3]) {
        Container$1$1.rebuild(root2);
      }
    }
    this.result = new Result$2$1(processor2, root2, opts);
    this.helpers = record_objectSpread(record_objectSpread({}, postcss$2$1), {}, {
      postcss: postcss$2$1,
      result: this.result
    });
    this.plugins = this.processor.plugins.map(function (plugin22) {
      if (record_typeof(plugin22) === "object" && plugin22.prepare) {
        return record_objectSpread(record_objectSpread({}, plugin22), plugin22.prepare(_this14.result));
      } else {
        return plugin22;
      }
    });
  }
  return record_createClass(LazyResult, [{
    key: "async",
    value: function async() {
      if (this.error) return Promise.reject(this.error);
      if (this.processed) return Promise.resolve(this.result);
      if (!this.processing) {
        this.processing = this.runAsync();
      }
      return this.processing;
    }
  }, {
    key: "catch",
    value: function _catch(onRejected) {
      return this.async().catch(onRejected);
    }
  }, {
    key: "finally",
    value: function _finally(onFinally) {
      return this.async().then(onFinally, onFinally);
    }
  }, {
    key: "getAsyncError",
    value: function getAsyncError() {
      throw new Error("Use process(css).then(cb) to work with async plugins");
    }
  }, {
    key: "handleError",
    value: function handleError(error, node2) {
      var plugin22 = this.result.lastPlugin;
      try {
        if (node2) node2.addToError(error);
        this.error = error;
        if (error.name === "CssSyntaxError" && !error.plugin) {
          error.plugin = plugin22.postcssPlugin;
          error.setMessage();
        } else if (plugin22.postcssVersion) {
          if (false) { var b, a2, runtimeVer, pluginVer, pluginName; }
        }
      } catch (err) {
        if (console && console.error) console.error(err);
      }
      return error;
    }
  }, {
    key: "prepareVisitors",
    value: function prepareVisitors() {
      var _this15 = this;
      this.listeners = {};
      var add = function add(plugin22, type, cb) {
        if (!_this15.listeners[type]) _this15.listeners[type] = [];
        _this15.listeners[type].push([plugin22, cb]);
      };
      var _iterator17 = record_createForOfIteratorHelper(this.plugins),
        _step17;
      try {
        for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
          var plugin22 = _step17.value;
          if (record_typeof(plugin22) === "object") {
            for (var event in plugin22) {
              if (!PLUGIN_PROPS$1[event] && /^[A-Z]/.test(event)) {
                throw new Error("Unknown event ".concat(event, " in ").concat(plugin22.postcssPlugin, ". Try to update PostCSS (").concat(this.processor.version, " now)."));
              }
              if (!NOT_VISITORS$1[event]) {
                if (record_typeof(plugin22[event]) === "object") {
                  for (var filter in plugin22[event]) {
                    if (filter === "*") {
                      add(plugin22, event, plugin22[event][filter]);
                    } else {
                      add(plugin22, event + "-" + filter.toLowerCase(), plugin22[event][filter]);
                    }
                  }
                } else if (typeof plugin22[event] === "function") {
                  add(plugin22, event, plugin22[event]);
                }
              }
            }
          }
        }
      } catch (err) {
        _iterator17.e(err);
      } finally {
        _iterator17.f();
      }
      this.hasListener = Object.keys(this.listeners).length > 0;
    }
  }, {
    key: "runAsync",
    value: function () {
      var _runAsync = record_asyncToGenerator(/*#__PURE__*/record_regeneratorRuntime().mark(function _callee() {
        var _this16 = this;
        var i2, plugin22, promise, root2, stack, _promise, node2, _iterator18, _step18, _loop;
        return record_regeneratorRuntime().wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              this.plugin = 0;
              i2 = 0;
            case 2:
              if (!(i2 < this.plugins.length)) {
                _context2.next = 17;
                break;
              }
              plugin22 = this.plugins[i2];
              promise = this.runOnRoot(plugin22);
              if (!isPromise$1(promise)) {
                _context2.next = 14;
                break;
              }
              _context2.prev = 6;
              _context2.next = 9;
              return promise;
            case 9:
              _context2.next = 14;
              break;
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](6);
              throw this.handleError(_context2.t0);
            case 14:
              i2++;
              _context2.next = 2;
              break;
            case 17:
              this.prepareVisitors();
              if (!this.hasListener) {
                _context2.next = 56;
                break;
              }
              root2 = this.result.root;
            case 20:
              if (root2[isClean$3]) {
                _context2.next = 39;
                break;
              }
              root2[isClean$3] = true;
              stack = [toStack$1(root2)];
            case 23:
              if (!(stack.length > 0)) {
                _context2.next = 37;
                break;
              }
              _promise = this.visitTick(stack);
              if (!isPromise$1(_promise)) {
                _context2.next = 35;
                break;
              }
              _context2.prev = 26;
              _context2.next = 29;
              return _promise;
            case 29:
              _context2.next = 35;
              break;
            case 31:
              _context2.prev = 31;
              _context2.t1 = _context2["catch"](26);
              node2 = stack[stack.length - 1].node;
              throw this.handleError(_context2.t1, node2);
            case 35:
              _context2.next = 23;
              break;
            case 37:
              _context2.next = 20;
              break;
            case 39:
              if (!this.listeners.OnceExit) {
                _context2.next = 56;
                break;
              }
              _iterator18 = record_createForOfIteratorHelper(this.listeners.OnceExit);
              _context2.prev = 41;
              _loop = /*#__PURE__*/record_regeneratorRuntime().mark(function _loop() {
                var _step18$value, plugin22, visitor, roots;
                return record_regeneratorRuntime().wrap(function _loop$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _step18$value = record_slicedToArray(_step18.value, 2), plugin22 = _step18$value[0], visitor = _step18$value[1];
                      _this16.result.lastPlugin = plugin22;
                      _context.prev = 2;
                      if (!(root2.type === "document")) {
                        _context.next = 9;
                        break;
                      }
                      roots = root2.nodes.map(function (subRoot) {
                        return visitor(subRoot, _this16.helpers);
                      });
                      _context.next = 7;
                      return Promise.all(roots);
                    case 7:
                      _context.next = 11;
                      break;
                    case 9:
                      _context.next = 11;
                      return visitor(root2, _this16.helpers);
                    case 11:
                      _context.next = 16;
                      break;
                    case 13:
                      _context.prev = 13;
                      _context.t0 = _context["catch"](2);
                      throw _this16.handleError(_context.t0);
                    case 16:
                    case "end":
                      return _context.stop();
                  }
                }, _loop, null, [[2, 13]]);
              });
              _iterator18.s();
            case 44:
              if ((_step18 = _iterator18.n()).done) {
                _context2.next = 48;
                break;
              }
              return _context2.delegateYield(_loop(), "t2", 46);
            case 46:
              _context2.next = 44;
              break;
            case 48:
              _context2.next = 53;
              break;
            case 50:
              _context2.prev = 50;
              _context2.t3 = _context2["catch"](41);
              _iterator18.e(_context2.t3);
            case 53:
              _context2.prev = 53;
              _iterator18.f();
              return _context2.finish(53);
            case 56:
              this.processed = true;
              return _context2.abrupt("return", this.stringify());
            case 58:
            case "end":
              return _context2.stop();
          }
        }, _callee, this, [[6, 11], [26, 31], [41, 50, 53, 56]]);
      }));
      function runAsync() {
        return _runAsync.apply(this, arguments);
      }
      return runAsync;
    }()
  }, {
    key: "runOnRoot",
    value: function runOnRoot(plugin22) {
      var _this17 = this;
      this.result.lastPlugin = plugin22;
      try {
        if (record_typeof(plugin22) === "object" && plugin22.Once) {
          if (this.result.root.type === "document") {
            var roots = this.result.root.nodes.map(function (root2) {
              return plugin22.Once(root2, _this17.helpers);
            });
            if (isPromise$1(roots[0])) {
              return Promise.all(roots);
            }
            return roots;
          }
          return plugin22.Once(this.result.root, this.helpers);
        } else if (typeof plugin22 === "function") {
          return plugin22(this.result.root, this.result);
        }
      } catch (error) {
        throw this.handleError(error);
      }
    }
  }, {
    key: "stringify",
    value: function stringify() {
      if (this.error) throw this.error;
      if (this.stringified) return this.result;
      this.stringified = true;
      this.sync();
      var opts = this.result.opts;
      var str = stringify$2$1;
      if (opts.syntax) str = opts.syntax.stringify;
      if (opts.stringifier) str = opts.stringifier;
      if (str.stringify) str = str.stringify;
      var map = new MapGenerator$1$1(str, this.result.root, this.result.opts);
      var data = map.generate();
      this.result.css = data[0];
      this.result.map = data[1];
      return this.result;
    }
  }, {
    key: "sync",
    value: function sync() {
      if (this.error) throw this.error;
      if (this.processed) return this.result;
      this.processed = true;
      if (this.processing) {
        throw this.getAsyncError();
      }
      var _iterator19 = record_createForOfIteratorHelper(this.plugins),
        _step19;
      try {
        for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
          var plugin22 = _step19.value;
          var promise = this.runOnRoot(plugin22);
          if (isPromise$1(promise)) {
            throw this.getAsyncError();
          }
        }
      } catch (err) {
        _iterator19.e(err);
      } finally {
        _iterator19.f();
      }
      this.prepareVisitors();
      if (this.hasListener) {
        var root2 = this.result.root;
        while (!root2[isClean$3]) {
          root2[isClean$3] = true;
          this.walkSync(root2);
        }
        if (this.listeners.OnceExit) {
          if (root2.type === "document") {
            var _iterator20 = record_createForOfIteratorHelper(root2.nodes),
              _step20;
            try {
              for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
                var subRoot = _step20.value;
                this.visitSync(this.listeners.OnceExit, subRoot);
              }
            } catch (err) {
              _iterator20.e(err);
            } finally {
              _iterator20.f();
            }
          } else {
            this.visitSync(this.listeners.OnceExit, root2);
          }
        }
      }
      return this.result;
    }
  }, {
    key: "then",
    value: function then(onFulfilled, onRejected) {
      if (false) {}
      return this.async().then(onFulfilled, onRejected);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.css;
    }
  }, {
    key: "visitSync",
    value: function visitSync(visitors, node2) {
      var _iterator21 = record_createForOfIteratorHelper(visitors),
        _step21;
      try {
        for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
          var _step21$value = record_slicedToArray(_step21.value, 2),
            plugin22 = _step21$value[0],
            visitor = _step21$value[1];
          this.result.lastPlugin = plugin22;
          var promise = void 0;
          try {
            promise = visitor(node2, this.helpers);
          } catch (e2) {
            throw this.handleError(e2, node2.proxyOf);
          }
          if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
            return true;
          }
          if (isPromise$1(promise)) {
            throw this.getAsyncError();
          }
        }
      } catch (err) {
        _iterator21.e(err);
      } finally {
        _iterator21.f();
      }
    }
  }, {
    key: "visitTick",
    value: function visitTick(stack) {
      var visit2 = stack[stack.length - 1];
      var node2 = visit2.node,
        visitors = visit2.visitors;
      if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
        stack.pop();
        return;
      }
      if (visitors.length > 0 && visit2.visitorIndex < visitors.length) {
        var _visitors$visit2$visi = record_slicedToArray(visitors[visit2.visitorIndex], 2),
          plugin22 = _visitors$visit2$visi[0],
          visitor = _visitors$visit2$visi[1];
        visit2.visitorIndex += 1;
        if (visit2.visitorIndex === visitors.length) {
          visit2.visitors = [];
          visit2.visitorIndex = 0;
        }
        this.result.lastPlugin = plugin22;
        try {
          return visitor(node2.toProxy(), this.helpers);
        } catch (e2) {
          throw this.handleError(e2, node2);
        }
      }
      if (visit2.iterator !== 0) {
        var iterator = visit2.iterator;
        var child;
        while (child = node2.nodes[node2.indexes[iterator]]) {
          node2.indexes[iterator] += 1;
          if (!child[isClean$3]) {
            child[isClean$3] = true;
            stack.push(toStack$1(child));
            return;
          }
        }
        visit2.iterator = 0;
        delete node2.indexes[iterator];
      }
      var events = visit2.events;
      while (visit2.eventIndex < events.length) {
        var event = events[visit2.eventIndex];
        visit2.eventIndex += 1;
        if (event === CHILDREN$1) {
          if (node2.nodes && node2.nodes.length) {
            node2[isClean$3] = true;
            visit2.iterator = node2.getIterator();
          }
          return;
        } else if (this.listeners[event]) {
          visit2.visitors = this.listeners[event];
          return;
        }
      }
      stack.pop();
    }
  }, {
    key: "walkSync",
    value: function walkSync(node2) {
      var _this18 = this;
      node2[isClean$3] = true;
      var events = getEvents$1(node2);
      var _iterator22 = record_createForOfIteratorHelper(events),
        _step22;
      try {
        for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
          var event = _step22.value;
          if (event === CHILDREN$1) {
            if (node2.nodes) {
              node2.each(function (child) {
                if (!child[isClean$3]) _this18.walkSync(child);
              });
            }
          } else {
            var visitors = this.listeners[event];
            if (visitors) {
              if (this.visitSync(visitors, node2.toProxy())) return;
            }
          }
        }
      } catch (err) {
        _iterator22.e(err);
      } finally {
        _iterator22.f();
      }
    }
  }, {
    key: "warnings",
    value: function warnings() {
      return this.sync().warnings();
    }
  }, {
    key: "content",
    get: function get() {
      return this.stringify().content;
    }
  }, {
    key: "css",
    get: function get() {
      return this.stringify().css;
    }
  }, {
    key: "map",
    get: function get() {
      return this.stringify().map;
    }
  }, {
    key: "messages",
    get: function get() {
      return this.sync().messages;
    }
  }, {
    key: "opts",
    get: function get() {
      return this.result.opts;
    }
  }, {
    key: "processor",
    get: function get() {
      return this.result.processor;
    }
  }, {
    key: "root",
    get: function get() {
      return this.sync().root;
    }
  }, {
    key: Symbol.toStringTag,
    get: function get() {
      return "LazyResult";
    }
  }]);
}();
LazyResult$2$1.registerPostcss = function (dependant) {
  postcss$2$1 = dependant;
};
var lazyResult$1 = LazyResult$2$1;
LazyResult$2$1.default = LazyResult$2$1;
Root$3$1.registerLazyResult(LazyResult$2$1);
Document$2$1.registerLazyResult(LazyResult$2$1);
var MapGenerator2$1 = mapGenerator$1;
var stringify$1$1 = stringify_1$1;
var warnOnce2$1 = (/* unused pure expression or super */ null && (warnOnce$2$1));
var parse$1$1 = parse_1$1;
var Result$1$1 = result$1;
var NoWorkResult$1$1 = /*#__PURE__*/function () {
  function NoWorkResult(processor2, css, opts) {
    record_classCallCheck(this, NoWorkResult);
    css = css.toString();
    this.stringified = false;
    this._processor = processor2;
    this._css = css;
    this._opts = opts;
    this._map = void 0;
    var root2;
    var str = stringify$1$1;
    this.result = new Result$1$1(this._processor, root2, this._opts);
    this.result.css = css;
    var self = this;
    Object.defineProperty(this.result, "root", {
      get: function get() {
        return self.root;
      }
    });
    var map = new MapGenerator2$1(str, root2, this._opts, css);
    if (map.isMap()) {
      var _map$generate = map.generate(),
        _map$generate2 = record_slicedToArray(_map$generate, 2),
        generatedCSS = _map$generate2[0],
        generatedMap = _map$generate2[1];
      if (generatedCSS) {
        this.result.css = generatedCSS;
      }
      if (generatedMap) {
        this.result.map = generatedMap;
      }
    } else {
      map.clearAnnotation();
      this.result.css = map.css;
    }
  }
  return record_createClass(NoWorkResult, [{
    key: "async",
    value: function async() {
      if (this.error) return Promise.reject(this.error);
      return Promise.resolve(this.result);
    }
  }, {
    key: "catch",
    value: function _catch(onRejected) {
      return this.async().catch(onRejected);
    }
  }, {
    key: "finally",
    value: function _finally(onFinally) {
      return this.async().then(onFinally, onFinally);
    }
  }, {
    key: "sync",
    value: function sync() {
      if (this.error) throw this.error;
      return this.result;
    }
  }, {
    key: "then",
    value: function then(onFulfilled, onRejected) {
      if (false) {}
      return this.async().then(onFulfilled, onRejected);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this._css;
    }
  }, {
    key: "warnings",
    value: function warnings() {
      return [];
    }
  }, {
    key: "content",
    get: function get() {
      return this.result.css;
    }
  }, {
    key: "css",
    get: function get() {
      return this.result.css;
    }
  }, {
    key: "map",
    get: function get() {
      return this.result.map;
    }
  }, {
    key: "messages",
    get: function get() {
      return [];
    }
  }, {
    key: "opts",
    get: function get() {
      return this.result.opts;
    }
  }, {
    key: "processor",
    get: function get() {
      return this.result.processor;
    }
  }, {
    key: "root",
    get: function get() {
      if (this._root) {
        return this._root;
      }
      var root2;
      var parser2 = parse$1$1;
      try {
        root2 = parser2(this._css, this._opts);
      } catch (error) {
        this.error = error;
      }
      if (this.error) {
        throw this.error;
      } else {
        this._root = root2;
        return root2;
      }
    }
  }, {
    key: Symbol.toStringTag,
    get: function get() {
      return "NoWorkResult";
    }
  }]);
}();
var noWorkResult$1 = NoWorkResult$1$1;
NoWorkResult$1$1.default = NoWorkResult$1$1;
var NoWorkResult2$1 = noWorkResult$1;
var LazyResult$1$1 = lazyResult$1;
var Document$1$1 = document$1$1;
var Root$2$1 = root$1;
var Processor$1$1 = /*#__PURE__*/function () {
  function Processor() {
    var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    record_classCallCheck(this, Processor);
    this.version = "8.4.38";
    this.plugins = this.normalize(plugins);
  }
  return record_createClass(Processor, [{
    key: "normalize",
    value: function normalize(plugins) {
      var normalized = [];
      var _iterator23 = record_createForOfIteratorHelper(plugins),
        _step23;
      try {
        for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
          var i2 = _step23.value;
          if (i2.postcss === true) {
            i2 = i2();
          } else if (i2.postcss) {
            i2 = i2.postcss;
          }
          if (record_typeof(i2) === "object" && Array.isArray(i2.plugins)) {
            normalized = normalized.concat(i2.plugins);
          } else if (record_typeof(i2) === "object" && i2.postcssPlugin) {
            normalized.push(i2);
          } else if (typeof i2 === "function") {
            normalized.push(i2);
          } else if (record_typeof(i2) === "object" && (i2.parse || i2.stringify)) {
            if (false) {}
          } else {
            throw new Error(i2 + " is not a PostCSS plugin");
          }
        }
      } catch (err) {
        _iterator23.e(err);
      } finally {
        _iterator23.f();
      }
      return normalized;
    }
  }, {
    key: "process",
    value: function process(css) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.plugins.length && !opts.parser && !opts.stringifier && !opts.syntax) {
        return new NoWorkResult2$1(this, css, opts);
      } else {
        return new LazyResult$1$1(this, css, opts);
      }
    }
  }, {
    key: "use",
    value: function use(plugin22) {
      this.plugins = this.plugins.concat(this.normalize([plugin22]));
      return this;
    }
  }]);
}();
var processor$1 = Processor$1$1;
Processor$1$1.default = Processor$1$1;
Root$2$1.registerProcessor(Processor$1$1);
Document$1$1.registerProcessor(Processor$1$1);
var Declaration$1$1 = declaration$1;
var PreviousMap2$1 = previousMap$1;
var Comment$1$1 = comment$1;
var AtRule$1$1 = atRule$1;
var Input$1$1 = input$1;
var Root$1$1 = root$1;
var Rule$1$1 = rule$1;
function fromJSON$1$1(json, inputs) {
  if (Array.isArray(json)) return json.map(function (n2) {
    return fromJSON$1$1(n2);
  });
  var ownInputs = json.inputs,
    defaults = record_objectWithoutProperties(json, record_excluded);
  if (ownInputs) {
    inputs = [];
    var _iterator24 = record_createForOfIteratorHelper(ownInputs),
      _step24;
    try {
      for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
        var input2 = _step24.value;
        var inputHydrated = record_objectSpread(record_objectSpread({}, input2), {}, {
          __proto__: Input$1$1.prototype
        });
        if (inputHydrated.map) {
          inputHydrated.map = record_objectSpread(record_objectSpread({}, inputHydrated.map), {}, {
            __proto__: PreviousMap2$1.prototype
          });
        }
        inputs.push(inputHydrated);
      }
    } catch (err) {
      _iterator24.e(err);
    } finally {
      _iterator24.f();
    }
  }
  if (defaults.nodes) {
    defaults.nodes = json.nodes.map(function (n2) {
      return fromJSON$1$1(n2, inputs);
    });
  }
  if (defaults.source) {
    var _defaults$source = defaults.source,
      inputId = _defaults$source.inputId,
      source = record_objectWithoutProperties(_defaults$source, _excluded2);
    defaults.source = source;
    if (inputId != null) {
      defaults.source.input = inputs[inputId];
    }
  }
  if (defaults.type === "root") {
    return new Root$1$1(defaults);
  } else if (defaults.type === "decl") {
    return new Declaration$1$1(defaults);
  } else if (defaults.type === "rule") {
    return new Rule$1$1(defaults);
  } else if (defaults.type === "comment") {
    return new Comment$1$1(defaults);
  } else if (defaults.type === "atrule") {
    return new AtRule$1$1(defaults);
  } else {
    throw new Error("Unknown node type: " + json.type);
  }
}
var fromJSON_1$1 = fromJSON$1$1;
fromJSON$1$1.default = fromJSON$1$1;
var CssSyntaxError2$1 = cssSyntaxError$1;
var Declaration2$1 = declaration$1;
var LazyResult2$1 = lazyResult$1;
var Container2$1 = container$1;
var Processor2$1 = processor$1;
var stringify$5 = stringify_1$1;
var fromJSON$2 = fromJSON_1$1;
var Document22 = document$1$1;
var Warning2$1 = warning$1;
var Comment2$1 = comment$1;
var AtRule2$1 = atRule$1;
var Result2$1 = result$1;
var Input2$1 = input$1;
var parse$5 = parse_1$1;
var list$3 = list_1$1;
var Rule2$1 = rule$1;
var Root2$1 = root$1;
var Node2$1 = node$1;
function postcss$3() {
  for (var _len8 = arguments.length, plugins = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    plugins[_key8] = arguments[_key8];
  }
  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0];
  }
  return new Processor2$1(plugins);
}
postcss$3.plugin = function plugin(name, initializer) {
  var warningPrinted = false;
  function creator() {
    if (console && console.warn && !warningPrinted) {
      warningPrinted = true;
      console.warn(name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration");
      if (process.env.LANG && process.env.LANG.startsWith("cn")) {
        console.warn(name + ": 里面 postcss.plugin 被弃用. 迁移指南:\nhttps://www.w3ctech.com/topic/2226");
      }
    }
    var transformer = initializer.apply(void 0, arguments);
    transformer.postcssPlugin = name;
    transformer.postcssVersion = new Processor2$1().version;
    return transformer;
  }
  var cache;
  Object.defineProperty(creator, "postcss", {
    get: function get() {
      if (!cache) cache = creator();
      return cache;
    }
  });
  creator.process = function (css, processOpts, pluginOpts) {
    return postcss$3([creator(pluginOpts)]).process(css, processOpts);
  };
  return creator;
};
postcss$3.stringify = stringify$5;
postcss$3.parse = parse$5;
postcss$3.fromJSON = fromJSON$2;
postcss$3.list = list$3;
postcss$3.comment = function (defaults) {
  return new Comment2$1(defaults);
};
postcss$3.atRule = function (defaults) {
  return new AtRule2$1(defaults);
};
postcss$3.decl = function (defaults) {
  return new Declaration2$1(defaults);
};
postcss$3.rule = function (defaults) {
  return new Rule2$1(defaults);
};
postcss$3.root = function (defaults) {
  return new Root2$1(defaults);
};
postcss$3.document = function (defaults) {
  return new Document22(defaults);
};
postcss$3.CssSyntaxError = CssSyntaxError2$1;
postcss$3.Declaration = Declaration2$1;
postcss$3.Container = Container2$1;
postcss$3.Processor = Processor2$1;
postcss$3.Document = Document22;
postcss$3.Comment = Comment2$1;
postcss$3.Warning = Warning2$1;
postcss$3.AtRule = AtRule2$1;
postcss$3.Result = Result2$1;
postcss$3.Input = Input2$1;
postcss$3.Rule = Rule2$1;
postcss$3.Root = Root2$1;
postcss$3.Node = Node2$1;
LazyResult2$1.registerPostcss(postcss$3);
var postcss_1$1 = postcss$3;
postcss$3.default = postcss$3;
var postcss$1$1 = /* @__PURE__ */getDefaultExportFromCjs$1(postcss_1$1);
postcss$1$1.stringify;
postcss$1$1.fromJSON;
postcss$1$1.plugin;
postcss$1$1.parse;
postcss$1$1.list;
postcss$1$1.document;
postcss$1$1.comment;
postcss$1$1.atRule;
postcss$1$1.rule;
postcss$1$1.decl;
postcss$1$1.root;
postcss$1$1.CssSyntaxError;
postcss$1$1.Declaration;
postcss$1$1.Container;
postcss$1$1.Processor;
postcss$1$1.Document;
postcss$1$1.Comment;
postcss$1$1.Warning;
postcss$1$1.AtRule;
postcss$1$1.Result;
postcss$1$1.Input;
postcss$1$1.Rule;
postcss$1$1.Root;
postcss$1$1.Node;
var __defProp2 = Object.defineProperty;
var __defNormalProp2 = function __defNormalProp2(obj, key, value) {
  return key in obj ? __defProp2(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: value
  }) : obj[key] = value;
};
var __publicField2 = function __publicField2(obj, key, value) {
  return __defNormalProp2(obj, record_typeof(key) !== "symbol" ? key + "" : key, value);
};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
function getAugmentedNamespace(n2) {
  if (n2.__esModule) return n2;
  var f2 = n2.default;
  if (typeof f2 == "function") {
    var a2 = function a22() {
      if (this instanceof a22) {
        return Reflect.construct(f2, arguments, this.constructor);
      }
      return f2.apply(this, arguments);
    };
    a2.prototype = f2.prototype;
  } else a2 = {};
  Object.defineProperty(a2, "__esModule", {
    value: true
  });
  Object.keys(n2).forEach(function (k) {
    var d = Object.getOwnPropertyDescriptor(n2, k);
    Object.defineProperty(a2, k, d.get ? d : {
      enumerable: true,
      get: function get() {
        return n2[k];
      }
    });
  });
  return a2;
}
var picocolors_browser = {
  exports: {}
};
var x = String;
var create = function create() {
  return {
    isColorSupported: false,
    reset: x,
    bold: x,
    dim: x,
    italic: x,
    underline: x,
    inverse: x,
    hidden: x,
    strikethrough: x,
    black: x,
    red: x,
    green: x,
    yellow: x,
    blue: x,
    magenta: x,
    cyan: x,
    white: x,
    gray: x,
    bgBlack: x,
    bgRed: x,
    bgGreen: x,
    bgYellow: x,
    bgBlue: x,
    bgMagenta: x,
    bgCyan: x,
    bgWhite: x
  };
};
picocolors_browser.exports = create();
picocolors_browser.exports.createColors = create;
var picocolors_browserExports = picocolors_browser.exports;
var __viteBrowserExternal = {};
var __viteBrowserExternal$1 = /* @__PURE__ */Object.freeze(/* @__PURE__ */Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, {
  value: "Module"
}));
var require$$2 = /* @__PURE__ */getAugmentedNamespace(__viteBrowserExternal$1);
var pico = picocolors_browserExports;
var terminalHighlight$1 = require$$2;
var CssSyntaxError$3 = /*#__PURE__*/function (_Error2) {
  function CssSyntaxError2(message, line, column, source, file, plugin22) {
    var _this19;
    record_classCallCheck(this, CssSyntaxError2);
    _this19 = _callSuper(this, CssSyntaxError2, [message]);
    _this19.name = "CssSyntaxError";
    _this19.reason = message;
    if (file) {
      _this19.file = file;
    }
    if (source) {
      _this19.source = source;
    }
    if (plugin22) {
      _this19.plugin = plugin22;
    }
    if (typeof line !== "undefined" && typeof column !== "undefined") {
      if (typeof line === "number") {
        _this19.line = line;
        _this19.column = column;
      } else {
        _this19.line = line.line;
        _this19.column = line.column;
        _this19.endLine = column.line;
        _this19.endColumn = column.column;
      }
    }
    _this19.setMessage();
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this19, CssSyntaxError2);
    }
    return _this19;
  }
  _inherits(CssSyntaxError2, _Error2);
  return record_createClass(CssSyntaxError2, [{
    key: "setMessage",
    value: function setMessage() {
      this.message = this.plugin ? this.plugin + ": " : "";
      this.message += this.file ? this.file : "<css input>";
      if (typeof this.line !== "undefined") {
        this.message += ":" + this.line + ":" + this.column;
      }
      this.message += ": " + this.reason;
    }
  }, {
    key: "showSourceCode",
    value: function showSourceCode(color) {
      var _this20 = this;
      if (!this.source) return "";
      var css = this.source;
      if (color == null) color = pico.isColorSupported;
      if (terminalHighlight$1) {
        if (color) css = terminalHighlight$1(css);
      }
      var lines = css.split(/\r?\n/);
      var start = Math.max(this.line - 3, 0);
      var end = Math.min(this.line + 2, lines.length);
      var maxWidth = String(end).length;
      var mark, aside;
      if (color) {
        var _pico$createColors = pico.createColors(true),
          bold = _pico$createColors.bold,
          gray = _pico$createColors.gray,
          red = _pico$createColors.red;
        mark = function mark(text) {
          return bold(red(text));
        };
        aside = function aside(text) {
          return gray(text);
        };
      } else {
        mark = aside = function aside(str) {
          return str;
        };
      }
      return lines.slice(start, end).map(function (line, index2) {
        var number = start + 1 + index2;
        var gutter = " " + (" " + number).slice(-maxWidth) + " | ";
        if (number === _this20.line) {
          var spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, _this20.column - 1).replace(/[^\t]/g, " ");
          return mark(">") + aside(gutter) + line + "\n " + spacing + mark("^");
        }
        return " " + aside(gutter) + line;
      }).join("\n");
    }
  }, {
    key: "toString",
    value: function toString() {
      var code = this.showSourceCode();
      if (code) {
        code = "\n\n" + code + "\n";
      }
      return this.name + ": " + this.message + code;
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(Error));
var cssSyntaxError = CssSyntaxError$3;
CssSyntaxError$3.default = CssSyntaxError$3;
var symbols = {};
symbols.isClean = Symbol("isClean");
symbols.my = Symbol("my");
var DEFAULT_RAW = {
  after: "\n",
  beforeClose: "\n",
  beforeComment: "\n",
  beforeDecl: "\n",
  beforeOpen: " ",
  beforeRule: "\n",
  colon: ": ",
  commentLeft: " ",
  commentRight: " ",
  emptyBody: "",
  indent: "    ",
  semicolon: false
};
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
var Stringifier$2 = /*#__PURE__*/function () {
  function Stringifier2(builder) {
    record_classCallCheck(this, Stringifier2);
    this.builder = builder;
  }
  return record_createClass(Stringifier2, [{
    key: "atrule",
    value: function atrule(node2, semicolon) {
      var name = "@" + node2.name;
      var params = node2.params ? this.rawValue(node2, "params") : "";
      if (typeof node2.raws.afterName !== "undefined") {
        name += node2.raws.afterName;
      } else if (params) {
        name += " ";
      }
      if (node2.nodes) {
        this.block(node2, name + params);
      } else {
        var end = (node2.raws.between || "") + (semicolon ? ";" : "");
        this.builder(name + params + end, node2);
      }
    }
  }, {
    key: "beforeAfter",
    value: function beforeAfter(node2, detect) {
      var value;
      if (node2.type === "decl") {
        value = this.raw(node2, null, "beforeDecl");
      } else if (node2.type === "comment") {
        value = this.raw(node2, null, "beforeComment");
      } else if (detect === "before") {
        value = this.raw(node2, null, "beforeRule");
      } else {
        value = this.raw(node2, null, "beforeClose");
      }
      var buf = node2.parent;
      var depth = 0;
      while (buf && buf.type !== "root") {
        depth += 1;
        buf = buf.parent;
      }
      if (value.includes("\n")) {
        var indent = this.raw(node2, null, "indent");
        if (indent.length) {
          for (var step = 0; step < depth; step++) value += indent;
        }
      }
      return value;
    }
  }, {
    key: "block",
    value: function block(node2, start) {
      var between = this.raw(node2, "between", "beforeOpen");
      this.builder(start + between + "{", node2, "start");
      var after;
      if (node2.nodes && node2.nodes.length) {
        this.body(node2);
        after = this.raw(node2, "after");
      } else {
        after = this.raw(node2, "after", "emptyBody");
      }
      if (after) this.builder(after);
      this.builder("}", node2, "end");
    }
  }, {
    key: "body",
    value: function body(node2) {
      var last = node2.nodes.length - 1;
      while (last > 0) {
        if (node2.nodes[last].type !== "comment") break;
        last -= 1;
      }
      var semicolon = this.raw(node2, "semicolon");
      for (var i2 = 0; i2 < node2.nodes.length; i2++) {
        var child = node2.nodes[i2];
        var before = this.raw(child, "before");
        if (before) this.builder(before);
        this.stringify(child, last !== i2 || semicolon);
      }
    }
  }, {
    key: "comment",
    value: function comment(node2) {
      var left = this.raw(node2, "left", "commentLeft");
      var right = this.raw(node2, "right", "commentRight");
      this.builder("/*" + left + node2.text + right + "*/", node2);
    }
  }, {
    key: "decl",
    value: function decl(node2, semicolon) {
      var between = this.raw(node2, "between", "colon");
      var string = node2.prop + between + this.rawValue(node2, "value");
      if (node2.important) {
        string += node2.raws.important || " !important";
      }
      if (semicolon) string += ";";
      this.builder(string, node2);
    }
  }, {
    key: "document",
    value: function document(node2) {
      this.body(node2);
    }
  }, {
    key: "raw",
    value: function raw(node2, own, detect) {
      var value;
      if (!detect) detect = own;
      if (own) {
        value = node2.raws[own];
        if (typeof value !== "undefined") return value;
      }
      var parent = node2.parent;
      if (detect === "before") {
        if (!parent || parent.type === "root" && parent.first === node2) {
          return "";
        }
        if (parent && parent.type === "document") {
          return "";
        }
      }
      if (!parent) return DEFAULT_RAW[detect];
      var root2 = node2.root();
      if (!root2.rawCache) root2.rawCache = {};
      if (typeof root2.rawCache[detect] !== "undefined") {
        return root2.rawCache[detect];
      }
      if (detect === "before" || detect === "after") {
        return this.beforeAfter(node2, detect);
      } else {
        var method = "raw" + capitalize(detect);
        if (this[method]) {
          value = this[method](root2, node2);
        } else {
          root2.walk(function (i2) {
            value = i2.raws[own];
            if (typeof value !== "undefined") return false;
          });
        }
      }
      if (typeof value === "undefined") value = DEFAULT_RAW[detect];
      root2.rawCache[detect] = value;
      return value;
    }
  }, {
    key: "rawBeforeClose",
    value: function rawBeforeClose(root2) {
      var value;
      root2.walk(function (i2) {
        if (i2.nodes && i2.nodes.length > 0) {
          if (typeof i2.raws.after !== "undefined") {
            value = i2.raws.after;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        }
      });
      if (value) value = value.replace(/\S/g, "");
      return value;
    }
  }, {
    key: "rawBeforeComment",
    value: function rawBeforeComment(root2, node2) {
      var value;
      root2.walkComments(function (i2) {
        if (typeof i2.raws.before !== "undefined") {
          value = i2.raws.before;
          if (value.includes("\n")) {
            value = value.replace(/[^\n]+$/, "");
          }
          return false;
        }
      });
      if (typeof value === "undefined") {
        value = this.raw(node2, null, "beforeDecl");
      } else if (value) {
        value = value.replace(/\S/g, "");
      }
      return value;
    }
  }, {
    key: "rawBeforeDecl",
    value: function rawBeforeDecl(root2, node2) {
      var value;
      root2.walkDecls(function (i2) {
        if (typeof i2.raws.before !== "undefined") {
          value = i2.raws.before;
          if (value.includes("\n")) {
            value = value.replace(/[^\n]+$/, "");
          }
          return false;
        }
      });
      if (typeof value === "undefined") {
        value = this.raw(node2, null, "beforeRule");
      } else if (value) {
        value = value.replace(/\S/g, "");
      }
      return value;
    }
  }, {
    key: "rawBeforeOpen",
    value: function rawBeforeOpen(root2) {
      var value;
      root2.walk(function (i2) {
        if (i2.type !== "decl") {
          value = i2.raws.between;
          if (typeof value !== "undefined") return false;
        }
      });
      return value;
    }
  }, {
    key: "rawBeforeRule",
    value: function rawBeforeRule(root2) {
      var value;
      root2.walk(function (i2) {
        if (i2.nodes && (i2.parent !== root2 || root2.first !== i2)) {
          if (typeof i2.raws.before !== "undefined") {
            value = i2.raws.before;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        }
      });
      if (value) value = value.replace(/\S/g, "");
      return value;
    }
  }, {
    key: "rawColon",
    value: function rawColon(root2) {
      var value;
      root2.walkDecls(function (i2) {
        if (typeof i2.raws.between !== "undefined") {
          value = i2.raws.between.replace(/[^\s:]/g, "");
          return false;
        }
      });
      return value;
    }
  }, {
    key: "rawEmptyBody",
    value: function rawEmptyBody(root2) {
      var value;
      root2.walk(function (i2) {
        if (i2.nodes && i2.nodes.length === 0) {
          value = i2.raws.after;
          if (typeof value !== "undefined") return false;
        }
      });
      return value;
    }
  }, {
    key: "rawIndent",
    value: function rawIndent(root2) {
      if (root2.raws.indent) return root2.raws.indent;
      var value;
      root2.walk(function (i2) {
        var p = i2.parent;
        if (p && p !== root2 && p.parent && p.parent === root2) {
          if (typeof i2.raws.before !== "undefined") {
            var parts = i2.raws.before.split("\n");
            value = parts[parts.length - 1];
            value = value.replace(/\S/g, "");
            return false;
          }
        }
      });
      return value;
    }
  }, {
    key: "rawSemicolon",
    value: function rawSemicolon(root2) {
      var value;
      root2.walk(function (i2) {
        if (i2.nodes && i2.nodes.length && i2.last.type === "decl") {
          value = i2.raws.semicolon;
          if (typeof value !== "undefined") return false;
        }
      });
      return value;
    }
  }, {
    key: "rawValue",
    value: function rawValue(node2, prop) {
      var value = node2[prop];
      var raw = node2.raws[prop];
      if (raw && raw.value === value) {
        return raw.raw;
      }
      return value;
    }
  }, {
    key: "root",
    value: function root(node2) {
      this.body(node2);
      if (node2.raws.after) this.builder(node2.raws.after);
    }
  }, {
    key: "rule",
    value: function rule(node2) {
      this.block(node2, this.rawValue(node2, "selector"));
      if (node2.raws.ownSemicolon) {
        this.builder(node2.raws.ownSemicolon, node2, "end");
      }
    }
  }, {
    key: "stringify",
    value: function stringify(node2, semicolon) {
      if (!this[node2.type]) {
        throw new Error("Unknown AST node type " + node2.type + ". Maybe you need to change PostCSS stringifier.");
      }
      this[node2.type](node2, semicolon);
    }
  }]);
}();
var stringifier = Stringifier$2;
Stringifier$2.default = Stringifier$2;
var Stringifier$1 = stringifier;
function stringify$4(node2, builder) {
  var str = new Stringifier$1(builder);
  str.stringify(node2);
}
var stringify_1 = stringify$4;
stringify$4.default = stringify$4;
var isClean$2 = symbols.isClean,
  my$2 = symbols.my;
var CssSyntaxError$2 = cssSyntaxError;
var Stringifier22 = stringifier;
var stringify$3 = stringify_1;
function cloneNode(obj, parent) {
  var cloned = new obj.constructor();
  for (var i2 in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, i2)) {
      continue;
    }
    if (i2 === "proxyCache") continue;
    var value = obj[i2];
    var type = record_typeof(value);
    if (i2 === "parent" && type === "object") {
      if (parent) cloned[i2] = parent;
    } else if (i2 === "source") {
      cloned[i2] = value;
    } else if (Array.isArray(value)) {
      cloned[i2] = value.map(function (j) {
        return cloneNode(j, cloned);
      });
    } else {
      if (type === "object" && value !== null) value = cloneNode(value);
      cloned[i2] = value;
    }
  }
  return cloned;
}
var Node$4 = /*#__PURE__*/function () {
  function Node3() {
    var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    record_classCallCheck(this, Node3);
    this.raws = {};
    this[isClean$2] = false;
    this[my$2] = true;
    for (var name in defaults) {
      if (name === "nodes") {
        this.nodes = [];
        var _iterator25 = record_createForOfIteratorHelper(defaults[name]),
          _step25;
        try {
          for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
            var node2 = _step25.value;
            if (typeof node2.clone === "function") {
              this.append(node2.clone());
            } else {
              this.append(node2);
            }
          }
        } catch (err) {
          _iterator25.e(err);
        } finally {
          _iterator25.f();
        }
      } else {
        this[name] = defaults[name];
      }
    }
  }
  return record_createClass(Node3, [{
    key: "addToError",
    value: function addToError(error) {
      error.postcssNode = this;
      if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
        var s2 = this.source;
        error.stack = error.stack.replace(/\n\s{4}at /, "$&".concat(s2.input.from, ":").concat(s2.start.line, ":").concat(s2.start.column, "$&"));
      }
      return error;
    }
  }, {
    key: "after",
    value: function after(add) {
      this.parent.insertAfter(this, add);
      return this;
    }
  }, {
    key: "assign",
    value: function assign() {
      var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      for (var name in overrides) {
        this[name] = overrides[name];
      }
      return this;
    }
  }, {
    key: "before",
    value: function before(add) {
      this.parent.insertBefore(this, add);
      return this;
    }
  }, {
    key: "cleanRaws",
    value: function cleanRaws(keepBetween) {
      delete this.raws.before;
      delete this.raws.after;
      if (!keepBetween) delete this.raws.between;
    }
  }, {
    key: "clone",
    value: function clone() {
      var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cloned = cloneNode(this);
      for (var name in overrides) {
        cloned[name] = overrides[name];
      }
      return cloned;
    }
  }, {
    key: "cloneAfter",
    value: function cloneAfter() {
      var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cloned = this.clone(overrides);
      this.parent.insertAfter(this, cloned);
      return cloned;
    }
  }, {
    key: "cloneBefore",
    value: function cloneBefore() {
      var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cloned = this.clone(overrides);
      this.parent.insertBefore(this, cloned);
      return cloned;
    }
  }, {
    key: "error",
    value: function error(message) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this.source) {
        var _this$rangeBy2 = this.rangeBy(opts),
          end = _this$rangeBy2.end,
          start = _this$rangeBy2.start;
        return this.source.input.error(message, {
          column: start.column,
          line: start.line
        }, {
          column: end.column,
          line: end.line
        }, opts);
      }
      return new CssSyntaxError$2(message);
    }
  }, {
    key: "getProxyProcessor",
    value: function getProxyProcessor() {
      return {
        get: function get(node2, prop) {
          if (prop === "proxyOf") {
            return node2;
          } else if (prop === "root") {
            return function () {
              return node2.root().toProxy();
            };
          } else {
            return node2[prop];
          }
        },
        set: function set(node2, prop, value) {
          if (node2[prop] === value) return true;
          node2[prop] = value;
          if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || /* c8 ignore next */
          prop === "text") {
            node2.markDirty();
          }
          return true;
        }
      };
    }
  }, {
    key: "markDirty",
    value: function markDirty() {
      if (this[isClean$2]) {
        this[isClean$2] = false;
        var next = this;
        while (next = next.parent) {
          next[isClean$2] = false;
        }
      }
    }
  }, {
    key: "next",
    value: function next() {
      if (!this.parent) return void 0;
      var index2 = this.parent.index(this);
      return this.parent.nodes[index2 + 1];
    }
  }, {
    key: "positionBy",
    value: function positionBy(opts, stringRepresentation) {
      var pos = this.source.start;
      if (opts.index) {
        pos = this.positionInside(opts.index, stringRepresentation);
      } else if (opts.word) {
        stringRepresentation = this.toString();
        var index2 = stringRepresentation.indexOf(opts.word);
        if (index2 !== -1) pos = this.positionInside(index2, stringRepresentation);
      }
      return pos;
    }
  }, {
    key: "positionInside",
    value: function positionInside(index2, stringRepresentation) {
      var string = stringRepresentation || this.toString();
      var column = this.source.start.column;
      var line = this.source.start.line;
      for (var i2 = 0; i2 < index2; i2++) {
        if (string[i2] === "\n") {
          column = 1;
          line += 1;
        } else {
          column += 1;
        }
      }
      return {
        column: column,
        line: line
      };
    }
  }, {
    key: "prev",
    value: function prev() {
      if (!this.parent) return void 0;
      var index2 = this.parent.index(this);
      return this.parent.nodes[index2 - 1];
    }
  }, {
    key: "rangeBy",
    value: function rangeBy(opts) {
      var start = {
        column: this.source.start.column,
        line: this.source.start.line
      };
      var end = this.source.end ? {
        column: this.source.end.column + 1,
        line: this.source.end.line
      } : {
        column: start.column + 1,
        line: start.line
      };
      if (opts.word) {
        var stringRepresentation = this.toString();
        var index2 = stringRepresentation.indexOf(opts.word);
        if (index2 !== -1) {
          start = this.positionInside(index2, stringRepresentation);
          end = this.positionInside(index2 + opts.word.length, stringRepresentation);
        }
      } else {
        if (opts.start) {
          start = {
            column: opts.start.column,
            line: opts.start.line
          };
        } else if (opts.index) {
          start = this.positionInside(opts.index);
        }
        if (opts.end) {
          end = {
            column: opts.end.column,
            line: opts.end.line
          };
        } else if (typeof opts.endIndex === "number") {
          end = this.positionInside(opts.endIndex);
        } else if (opts.index) {
          end = this.positionInside(opts.index + 1);
        }
      }
      if (end.line < start.line || end.line === start.line && end.column <= start.column) {
        end = {
          column: start.column + 1,
          line: start.line
        };
      }
      return {
        end: end,
        start: start
      };
    }
  }, {
    key: "raw",
    value: function raw(prop, defaultType) {
      var str = new Stringifier22();
      return str.raw(this, prop, defaultType);
    }
  }, {
    key: "remove",
    value: function remove() {
      if (this.parent) {
        this.parent.removeChild(this);
      }
      this.parent = void 0;
      return this;
    }
  }, {
    key: "replaceWith",
    value: function replaceWith() {
      if (this.parent) {
        var bookmark = this;
        var foundSelf = false;
        for (var _len9 = arguments.length, nodes = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          nodes[_key9] = arguments[_key9];
        }
        for (var _i7 = 0, _nodes2 = nodes; _i7 < _nodes2.length; _i7++) {
          var node2 = _nodes2[_i7];
          if (node2 === this) {
            foundSelf = true;
          } else if (foundSelf) {
            this.parent.insertAfter(bookmark, node2);
            bookmark = node2;
          } else {
            this.parent.insertBefore(bookmark, node2);
          }
        }
        if (!foundSelf) {
          this.remove();
        }
      }
      return this;
    }
  }, {
    key: "root",
    value: function root() {
      var result2 = this;
      while (result2.parent && result2.parent.type !== "document") {
        result2 = result2.parent;
      }
      return result2;
    }
  }, {
    key: "toJSON",
    value: function toJSON(_, inputs) {
      var fixed = {};
      var emitInputs = inputs == null;
      inputs = inputs || /* @__PURE__ */new Map();
      var inputsNextIndex = 0;
      for (var name in this) {
        if (!Object.prototype.hasOwnProperty.call(this, name)) {
          continue;
        }
        if (name === "parent" || name === "proxyCache") continue;
        var value = this[name];
        if (Array.isArray(value)) {
          fixed[name] = value.map(function (i2) {
            if (record_typeof(i2) === "object" && i2.toJSON) {
              return i2.toJSON(null, inputs);
            } else {
              return i2;
            }
          });
        } else if (record_typeof(value) === "object" && value.toJSON) {
          fixed[name] = value.toJSON(null, inputs);
        } else if (name === "source") {
          var inputId = inputs.get(value.input);
          if (inputId == null) {
            inputId = inputsNextIndex;
            inputs.set(value.input, inputsNextIndex);
            inputsNextIndex++;
          }
          fixed[name] = {
            end: value.end,
            inputId: inputId,
            start: value.start
          };
        } else {
          fixed[name] = value;
        }
      }
      if (emitInputs) {
        fixed.inputs = record_toConsumableArray(inputs.keys()).map(function (input2) {
          return input2.toJSON();
        });
      }
      return fixed;
    }
  }, {
    key: "toProxy",
    value: function toProxy() {
      if (!this.proxyCache) {
        this.proxyCache = new Proxy(this, this.getProxyProcessor());
      }
      return this.proxyCache;
    }
  }, {
    key: "toString",
    value: function toString() {
      var stringifier2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : stringify$3;
      if (stringifier2.stringify) stringifier2 = stringifier2.stringify;
      var result2 = "";
      stringifier2(this, function (i2) {
        result2 += i2;
      });
      return result2;
    }
  }, {
    key: "warn",
    value: function warn(result2, text, opts) {
      var data = {
        node: this
      };
      for (var i2 in opts) data[i2] = opts[i2];
      return result2.warn(text, data);
    }
  }, {
    key: "proxyOf",
    get: function get() {
      return this;
    }
  }]);
}();
var node = Node$4;
Node$4.default = Node$4;
var Node$3 = node;
var Declaration$4 = /*#__PURE__*/function (_Node$) {
  function Declaration2(defaults) {
    var _this21;
    record_classCallCheck(this, Declaration2);
    if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") {
      defaults = record_objectSpread(record_objectSpread({}, defaults), {}, {
        value: String(defaults.value)
      });
    }
    _this21 = _callSuper(this, Declaration2, [defaults]);
    _this21.type = "decl";
    return _this21;
  }
  _inherits(Declaration2, _Node$);
  return record_createClass(Declaration2, [{
    key: "variable",
    get: function get() {
      return this.prop.startsWith("--") || this.prop[0] === "$";
    }
  }]);
}(Node$3);
var declaration = Declaration$4;
Declaration$4.default = Declaration$4;
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
var customAlphabet = function customAlphabet(alphabet) {
  var defaultSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 21;
  return function () {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSize;
    var id = "";
    var i2 = size;
    while (i2--) {
      id += alphabet[Math.random() * alphabet.length | 0];
    }
    return id;
  };
};
var nanoid$1 = function nanoid$1() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
  var id = "";
  var i2 = size;
  while (i2--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
var nonSecure = {
  nanoid: nanoid$1,
  customAlphabet: customAlphabet
};
var SourceMapConsumer$2 = require$$2.SourceMapConsumer,
  SourceMapGenerator$2 = require$$2.SourceMapGenerator;
var existsSync = require$$2.existsSync,
  readFileSync = require$$2.readFileSync;
var dirname$1 = require$$2.dirname,
  join = require$$2.join;
function fromBase64(str) {
  if (Buffer) {
    return Buffer.from(str, "base64").toString();
  } else {
    return window.atob(str);
  }
}
var PreviousMap$2 = /*#__PURE__*/function () {
  function PreviousMap2(css, opts) {
    record_classCallCheck(this, PreviousMap2);
    if (opts.map === false) return;
    this.loadAnnotation(css);
    this.inline = this.startWith(this.annotation, "data:");
    var prev = opts.map ? opts.map.prev : void 0;
    var text = this.loadMap(opts.from, prev);
    if (!this.mapFile && opts.from) {
      this.mapFile = opts.from;
    }
    if (this.mapFile) this.root = dirname$1(this.mapFile);
    if (text) this.text = text;
  }
  return record_createClass(PreviousMap2, [{
    key: "consumer",
    value: function consumer() {
      if (!this.consumerCache) {
        this.consumerCache = new SourceMapConsumer$2(this.text);
      }
      return this.consumerCache;
    }
  }, {
    key: "decodeInline",
    value: function decodeInline(text) {
      var baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
      var baseUri = /^data:application\/json;base64,/;
      var charsetUri = /^data:application\/json;charset=utf-?8,/;
      var uri = /^data:application\/json,/;
      if (charsetUri.test(text) || uri.test(text)) {
        return decodeURIComponent(text.substr(RegExp.lastMatch.length));
      }
      if (baseCharsetUri.test(text) || baseUri.test(text)) {
        return fromBase64(text.substr(RegExp.lastMatch.length));
      }
      var encoding = text.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + encoding);
    }
  }, {
    key: "getAnnotationURL",
    value: function getAnnotationURL(sourceMapString) {
      return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
  }, {
    key: "isMap",
    value: function isMap(map) {
      if (record_typeof(map) !== "object") return false;
      return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
    }
  }, {
    key: "loadAnnotation",
    value: function loadAnnotation(css) {
      var comments = css.match(/\/\*\s*# sourceMappingURL=/gm);
      if (!comments) return;
      var start = css.lastIndexOf(comments.pop());
      var end = css.indexOf("*/", start);
      if (start > -1 && end > -1) {
        this.annotation = this.getAnnotationURL(css.substring(start, end));
      }
    }
  }, {
    key: "loadFile",
    value: function loadFile(path) {
      this.root = dirname$1(path);
      if (existsSync(path)) {
        this.mapFile = path;
        return readFileSync(path, "utf-8").toString().trim();
      }
    }
  }, {
    key: "loadMap",
    value: function loadMap(file, prev) {
      if (prev === false) return false;
      if (prev) {
        if (typeof prev === "string") {
          return prev;
        } else if (typeof prev === "function") {
          var prevPath = prev(file);
          if (prevPath) {
            var map = this.loadFile(prevPath);
            if (!map) {
              throw new Error("Unable to load previous source map: " + prevPath.toString());
            }
            return map;
          }
        } else if (prev instanceof SourceMapConsumer$2) {
          return SourceMapGenerator$2.fromSourceMap(prev).toString();
        } else if (prev instanceof SourceMapGenerator$2) {
          return prev.toString();
        } else if (this.isMap(prev)) {
          return JSON.stringify(prev);
        } else {
          throw new Error("Unsupported previous source map format: " + prev.toString());
        }
      } else if (this.inline) {
        return this.decodeInline(this.annotation);
      } else if (this.annotation) {
        var _map2 = this.annotation;
        if (file) _map2 = join(dirname$1(file), _map2);
        return this.loadFile(_map2);
      }
    }
  }, {
    key: "startWith",
    value: function startWith(string, start) {
      if (!string) return false;
      return string.substr(0, start.length) === start;
    }
  }, {
    key: "withContent",
    value: function withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
  }]);
}();
var previousMap = PreviousMap$2;
PreviousMap$2.default = PreviousMap$2;
var SourceMapConsumer$1 = require$$2.SourceMapConsumer,
  SourceMapGenerator$1 = require$$2.SourceMapGenerator;
var fileURLToPath = require$$2.fileURLToPath,
  pathToFileURL$1 = require$$2.pathToFileURL;
var isAbsolute = require$$2.isAbsolute,
  resolve$1 = require$$2.resolve;
var nanoid = nonSecure.nanoid;
var terminalHighlight = require$$2;
var CssSyntaxError$1 = cssSyntaxError;
var PreviousMap$1 = previousMap;
var fromOffsetCache = Symbol("fromOffsetCache");
var sourceMapAvailable$1 = Boolean(SourceMapConsumer$1 && SourceMapGenerator$1);
var pathAvailable$1 = Boolean(resolve$1 && isAbsolute);
var Input$4 = /*#__PURE__*/function () {
  function Input2(css) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    record_classCallCheck(this, Input2);
    if (css === null || typeof css === "undefined" || record_typeof(css) === "object" && !css.toString) {
      throw new Error("PostCSS received ".concat(css, " instead of CSS string"));
    }
    this.css = css.toString();
    if (this.css[0] === "\uFEFF" || this.css[0] === "￾") {
      this.hasBOM = true;
      this.css = this.css.slice(1);
    } else {
      this.hasBOM = false;
    }
    if (opts.from) {
      if (!pathAvailable$1 || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from)) {
        this.file = opts.from;
      } else {
        this.file = resolve$1(opts.from);
      }
    }
    if (pathAvailable$1 && sourceMapAvailable$1) {
      var map = new PreviousMap$1(this.css, opts);
      if (map.text) {
        this.map = map;
        var file = map.consumer().file;
        if (!this.file && file) this.file = this.mapResolve(file);
      }
    }
    if (!this.file) {
      this.id = "<input css " + nanoid(6) + ">";
    }
    if (this.map) this.map.file = this.from;
  }
  return record_createClass(Input2, [{
    key: "error",
    value: function error(message, line, column) {
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var result2, endLine, endColumn;
      if (line && record_typeof(line) === "object") {
        var start = line;
        var end = column;
        if (typeof start.offset === "number") {
          var pos = this.fromOffset(start.offset);
          line = pos.line;
          column = pos.col;
        } else {
          line = start.line;
          column = start.column;
        }
        if (typeof end.offset === "number") {
          var _pos3 = this.fromOffset(end.offset);
          endLine = _pos3.line;
          endColumn = _pos3.col;
        } else {
          endLine = end.line;
          endColumn = end.column;
        }
      } else if (!column) {
        var _pos4 = this.fromOffset(line);
        line = _pos4.line;
        column = _pos4.col;
      }
      var origin = this.origin(line, column, endLine, endColumn);
      if (origin) {
        result2 = new CssSyntaxError$1(message, origin.endLine === void 0 ? origin.line : {
          column: origin.column,
          line: origin.line
        }, origin.endLine === void 0 ? origin.column : {
          column: origin.endColumn,
          line: origin.endLine
        }, origin.source, origin.file, opts.plugin);
      } else {
        result2 = new CssSyntaxError$1(message, endLine === void 0 ? line : {
          column: column,
          line: line
        }, endLine === void 0 ? column : {
          column: endColumn,
          line: endLine
        }, this.css, this.file, opts.plugin);
      }
      result2.input = {
        column: column,
        endColumn: endColumn,
        endLine: endLine,
        line: line,
        source: this.css
      };
      if (this.file) {
        if (pathToFileURL$1) {
          result2.input.url = pathToFileURL$1(this.file).toString();
        }
        result2.input.file = this.file;
      }
      return result2;
    }
  }, {
    key: "fromOffset",
    value: function fromOffset(offset) {
      var lastLine, lineToIndex;
      if (!this[fromOffsetCache]) {
        var lines = this.css.split("\n");
        lineToIndex = new Array(lines.length);
        var prevIndex = 0;
        for (var i2 = 0, l2 = lines.length; i2 < l2; i2++) {
          lineToIndex[i2] = prevIndex;
          prevIndex += lines[i2].length + 1;
        }
        this[fromOffsetCache] = lineToIndex;
      } else {
        lineToIndex = this[fromOffsetCache];
      }
      lastLine = lineToIndex[lineToIndex.length - 1];
      var min = 0;
      if (offset >= lastLine) {
        min = lineToIndex.length - 1;
      } else {
        var max = lineToIndex.length - 2;
        var mid;
        while (min < max) {
          mid = min + (max - min >> 1);
          if (offset < lineToIndex[mid]) {
            max = mid - 1;
          } else if (offset >= lineToIndex[mid + 1]) {
            min = mid + 1;
          } else {
            min = mid;
            break;
          }
        }
      }
      return {
        col: offset - lineToIndex[min] + 1,
        line: min + 1
      };
    }
  }, {
    key: "mapResolve",
    value: function mapResolve(file) {
      if (/^\w+:\/\//.test(file)) {
        return file;
      }
      return resolve$1(this.map.consumer().sourceRoot || this.map.root || ".", file);
    }
  }, {
    key: "origin",
    value: function origin(line, column, endLine, endColumn) {
      if (!this.map) return false;
      var consumer = this.map.consumer();
      var from = consumer.originalPositionFor({
        column: column,
        line: line
      });
      if (!from.source) return false;
      var to;
      if (typeof endLine === "number") {
        to = consumer.originalPositionFor({
          column: endColumn,
          line: endLine
        });
      }
      var fromUrl;
      if (isAbsolute(from.source)) {
        fromUrl = pathToFileURL$1(from.source);
      } else {
        fromUrl = new URL(from.source, this.map.consumer().sourceRoot || pathToFileURL$1(this.map.mapFile));
      }
      var result2 = {
        column: from.column,
        endColumn: to && to.column,
        endLine: to && to.line,
        line: from.line,
        url: fromUrl.toString()
      };
      if (fromUrl.protocol === "file:") {
        if (fileURLToPath) {
          result2.file = fileURLToPath(fromUrl);
        } else {
          throw new Error("file: protocol is not available in this PostCSS build");
        }
      }
      var source = consumer.sourceContentFor(from.source);
      if (source) result2.source = source;
      return result2;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {};
      for (var _i8 = 0, _arr2 = ["hasBOM", "css", "file", "id"]; _i8 < _arr2.length; _i8++) {
        var name = _arr2[_i8];
        if (this[name] != null) {
          json[name] = this[name];
        }
      }
      if (this.map) {
        json.map = record_objectSpread({}, this.map);
        if (json.map.consumerCache) {
          json.map.consumerCache = void 0;
        }
      }
      return json;
    }
  }, {
    key: "from",
    get: function get() {
      return this.file || this.id;
    }
  }]);
}();
var input = Input$4;
Input$4.default = Input$4;
if (terminalHighlight && terminalHighlight.registerInput) {
  terminalHighlight.registerInput(Input$4);
}
var SourceMapConsumer = require$$2.SourceMapConsumer,
  SourceMapGenerator = require$$2.SourceMapGenerator;
var dirname = require$$2.dirname,
  relative = require$$2.relative,
  resolve = require$$2.resolve,
  sep = require$$2.sep;
var pathToFileURL = require$$2.pathToFileURL;
var Input$3 = input;
var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
var pathAvailable = Boolean(dirname && resolve && relative && sep);
var MapGenerator$2 = /*#__PURE__*/function () {
  function MapGenerator2(stringify2, root2, opts, cssString) {
    record_classCallCheck(this, MapGenerator2);
    this.stringify = stringify2;
    this.mapOpts = opts.map || {};
    this.root = root2;
    this.opts = opts;
    this.css = cssString;
    this.originalCSS = cssString;
    this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
    this.memoizedFileURLs = /* @__PURE__ */new Map();
    this.memoizedPaths = /* @__PURE__ */new Map();
    this.memoizedURLs = /* @__PURE__ */new Map();
  }
  return record_createClass(MapGenerator2, [{
    key: "addAnnotation",
    value: function addAnnotation() {
      var content;
      if (this.isInline()) {
        content = "data:application/json;base64," + this.toBase64(this.map.toString());
      } else if (typeof this.mapOpts.annotation === "string") {
        content = this.mapOpts.annotation;
      } else if (typeof this.mapOpts.annotation === "function") {
        content = this.mapOpts.annotation(this.opts.to, this.root);
      } else {
        content = this.outputFile() + ".map";
      }
      var eol = "\n";
      if (this.css.includes("\r\n")) eol = "\r\n";
      this.css += eol + "/*# sourceMappingURL=" + content + " */";
    }
  }, {
    key: "applyPrevMaps",
    value: function applyPrevMaps() {
      var _iterator26 = record_createForOfIteratorHelper(this.previous()),
        _step26;
      try {
        for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
          var prev = _step26.value;
          var from = this.toUrl(this.path(prev.file));
          var root2 = prev.root || dirname(prev.file);
          var map = void 0;
          if (this.mapOpts.sourcesContent === false) {
            map = new SourceMapConsumer(prev.text);
            if (map.sourcesContent) {
              map.sourcesContent = null;
            }
          } else {
            map = prev.consumer();
          }
          this.map.applySourceMap(map, from, this.toUrl(this.path(root2)));
        }
      } catch (err) {
        _iterator26.e(err);
      } finally {
        _iterator26.f();
      }
    }
  }, {
    key: "clearAnnotation",
    value: function clearAnnotation() {
      if (this.mapOpts.annotation === false) return;
      if (this.root) {
        var node2;
        for (var i2 = this.root.nodes.length - 1; i2 >= 0; i2--) {
          node2 = this.root.nodes[i2];
          if (node2.type !== "comment") continue;
          if (node2.text.indexOf("# sourceMappingURL=") === 0) {
            this.root.removeChild(i2);
          }
        }
      } else if (this.css) {
        this.css = this.css.replace(/\n*?\/\*#[\S\s]*?\*\/$/gm, "");
      }
    }
  }, {
    key: "generate",
    value: function generate() {
      this.clearAnnotation();
      if (pathAvailable && sourceMapAvailable && this.isMap()) {
        return this.generateMap();
      } else {
        var result2 = "";
        this.stringify(this.root, function (i2) {
          result2 += i2;
        });
        return [result2];
      }
    }
  }, {
    key: "generateMap",
    value: function generateMap() {
      if (this.root) {
        this.generateString();
      } else if (this.previous().length === 1) {
        var prev = this.previous()[0].consumer();
        prev.file = this.outputFile();
        this.map = SourceMapGenerator.fromSourceMap(prev, {
          ignoreInvalidMapping: true
        });
      } else {
        this.map = new SourceMapGenerator({
          file: this.outputFile(),
          ignoreInvalidMapping: true
        });
        this.map.addMapping({
          generated: {
            column: 0,
            line: 1
          },
          original: {
            column: 0,
            line: 1
          },
          source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
        });
      }
      if (this.isSourcesContent()) this.setSourcesContent();
      if (this.root && this.previous().length > 0) this.applyPrevMaps();
      if (this.isAnnotation()) this.addAnnotation();
      if (this.isInline()) {
        return [this.css];
      } else {
        return [this.css, this.map];
      }
    }
  }, {
    key: "generateString",
    value: function generateString() {
      var _this22 = this;
      this.css = "";
      this.map = new SourceMapGenerator({
        file: this.outputFile(),
        ignoreInvalidMapping: true
      });
      var line = 1;
      var column = 1;
      var noSource = "<no source>";
      var mapping = {
        generated: {
          column: 0,
          line: 0
        },
        original: {
          column: 0,
          line: 0
        },
        source: ""
      };
      var lines, last;
      this.stringify(this.root, function (str, node2, type) {
        _this22.css += str;
        if (node2 && type !== "end") {
          mapping.generated.line = line;
          mapping.generated.column = column - 1;
          if (node2.source && node2.source.start) {
            mapping.source = _this22.sourcePath(node2);
            mapping.original.line = node2.source.start.line;
            mapping.original.column = node2.source.start.column - 1;
            _this22.map.addMapping(mapping);
          } else {
            mapping.source = noSource;
            mapping.original.line = 1;
            mapping.original.column = 0;
            _this22.map.addMapping(mapping);
          }
        }
        lines = str.match(/\n/g);
        if (lines) {
          line += lines.length;
          last = str.lastIndexOf("\n");
          column = str.length - last;
        } else {
          column += str.length;
        }
        if (node2 && type !== "start") {
          var p = node2.parent || {
            raws: {}
          };
          var childless = node2.type === "decl" || node2.type === "atrule" && !node2.nodes;
          if (!childless || node2 !== p.last || p.raws.semicolon) {
            if (node2.source && node2.source.end) {
              mapping.source = _this22.sourcePath(node2);
              mapping.original.line = node2.source.end.line;
              mapping.original.column = node2.source.end.column - 1;
              mapping.generated.line = line;
              mapping.generated.column = column - 2;
              _this22.map.addMapping(mapping);
            } else {
              mapping.source = noSource;
              mapping.original.line = 1;
              mapping.original.column = 0;
              mapping.generated.line = line;
              mapping.generated.column = column - 1;
              _this22.map.addMapping(mapping);
            }
          }
        }
      });
    }
  }, {
    key: "isAnnotation",
    value: function isAnnotation() {
      if (this.isInline()) {
        return true;
      }
      if (typeof this.mapOpts.annotation !== "undefined") {
        return this.mapOpts.annotation;
      }
      if (this.previous().length) {
        return this.previous().some(function (i2) {
          return i2.annotation;
        });
      }
      return true;
    }
  }, {
    key: "isInline",
    value: function isInline() {
      if (typeof this.mapOpts.inline !== "undefined") {
        return this.mapOpts.inline;
      }
      var annotation = this.mapOpts.annotation;
      if (typeof annotation !== "undefined" && annotation !== true) {
        return false;
      }
      if (this.previous().length) {
        return this.previous().some(function (i2) {
          return i2.inline;
        });
      }
      return true;
    }
  }, {
    key: "isMap",
    value: function isMap() {
      if (typeof this.opts.map !== "undefined") {
        return !!this.opts.map;
      }
      return this.previous().length > 0;
    }
  }, {
    key: "isSourcesContent",
    value: function isSourcesContent() {
      if (typeof this.mapOpts.sourcesContent !== "undefined") {
        return this.mapOpts.sourcesContent;
      }
      if (this.previous().length) {
        return this.previous().some(function (i2) {
          return i2.withContent();
        });
      }
      return true;
    }
  }, {
    key: "outputFile",
    value: function outputFile() {
      if (this.opts.to) {
        return this.path(this.opts.to);
      } else if (this.opts.from) {
        return this.path(this.opts.from);
      } else {
        return "to.css";
      }
    }
  }, {
    key: "path",
    value: function path(file) {
      if (this.mapOpts.absolute) return file;
      if (file.charCodeAt(0) === 60) return file;
      if (/^\w+:\/\//.test(file)) return file;
      var cached = this.memoizedPaths.get(file);
      if (cached) return cached;
      var from = this.opts.to ? dirname(this.opts.to) : ".";
      if (typeof this.mapOpts.annotation === "string") {
        from = dirname(resolve(from, this.mapOpts.annotation));
      }
      var path = relative(from, file);
      this.memoizedPaths.set(file, path);
      return path;
    }
  }, {
    key: "previous",
    value: function previous() {
      var _this23 = this;
      if (!this.previousMaps) {
        this.previousMaps = [];
        if (this.root) {
          this.root.walk(function (node2) {
            if (node2.source && node2.source.input.map) {
              var map = node2.source.input.map;
              if (!_this23.previousMaps.includes(map)) {
                _this23.previousMaps.push(map);
              }
            }
          });
        } else {
          var input2 = new Input$3(this.originalCSS, this.opts);
          if (input2.map) this.previousMaps.push(input2.map);
        }
      }
      return this.previousMaps;
    }
  }, {
    key: "setSourcesContent",
    value: function setSourcesContent() {
      var _this24 = this;
      var already = {};
      if (this.root) {
        this.root.walk(function (node2) {
          if (node2.source) {
            var from = node2.source.input.from;
            if (from && !already[from]) {
              already[from] = true;
              var fromUrl = _this24.usesFileUrls ? _this24.toFileUrl(from) : _this24.toUrl(_this24.path(from));
              _this24.map.setSourceContent(fromUrl, node2.source.input.css);
            }
          }
        });
      } else if (this.css) {
        var from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
        this.map.setSourceContent(from, this.css);
      }
    }
  }, {
    key: "sourcePath",
    value: function sourcePath(node2) {
      if (this.mapOpts.from) {
        return this.toUrl(this.mapOpts.from);
      } else if (this.usesFileUrls) {
        return this.toFileUrl(node2.source.input.from);
      } else {
        return this.toUrl(this.path(node2.source.input.from));
      }
    }
  }, {
    key: "toBase64",
    value: function toBase64(str) {
      if (Buffer) {
        return Buffer.from(str).toString("base64");
      } else {
        return window.btoa(unescape(encodeURIComponent(str)));
      }
    }
  }, {
    key: "toFileUrl",
    value: function toFileUrl(path) {
      var cached = this.memoizedFileURLs.get(path);
      if (cached) return cached;
      if (pathToFileURL) {
        var fileURL = pathToFileURL(path).toString();
        this.memoizedFileURLs.set(path, fileURL);
        return fileURL;
      } else {
        throw new Error("`map.absolute` option is not available in this PostCSS build");
      }
    }
  }, {
    key: "toUrl",
    value: function toUrl(path) {
      var cached = this.memoizedURLs.get(path);
      if (cached) return cached;
      if (sep === "\\") {
        path = path.replace(/\\/g, "/");
      }
      var url = encodeURI(path).replace(/[#?]/g, encodeURIComponent);
      this.memoizedURLs.set(path, url);
      return url;
    }
  }]);
}();
var mapGenerator = MapGenerator$2;
var Node$2 = node;
var Comment$4 = /*#__PURE__*/function (_Node$2) {
  function Comment2(defaults) {
    var _this25;
    record_classCallCheck(this, Comment2);
    _this25 = _callSuper(this, Comment2, [defaults]);
    _this25.type = "comment";
    return _this25;
  }
  _inherits(Comment2, _Node$2);
  return record_createClass(Comment2);
}(Node$2);
var comment = Comment$4;
Comment$4.default = Comment$4;
var isClean$1 = symbols.isClean,
  my$1 = symbols.my;
var Declaration$3 = declaration;
var Comment$3 = comment;
var Node$1 = node;
var parse$4, Rule$4, AtRule$4, Root$6;
function cleanSource(nodes) {
  return nodes.map(function (i2) {
    if (i2.nodes) i2.nodes = cleanSource(i2.nodes);
    delete i2.source;
    return i2;
  });
}
function markDirtyUp(node2) {
  node2[isClean$1] = false;
  if (node2.proxyOf.nodes) {
    var _iterator27 = record_createForOfIteratorHelper(node2.proxyOf.nodes),
      _step27;
    try {
      for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
        var i2 = _step27.value;
        markDirtyUp(i2);
      }
    } catch (err) {
      _iterator27.e(err);
    } finally {
      _iterator27.f();
    }
  }
}
var Container$7 = /*#__PURE__*/function (_Node$3) {
  function Container2() {
    record_classCallCheck(this, Container2);
    return _callSuper(this, Container2, arguments);
  }
  _inherits(Container2, _Node$3);
  return record_createClass(Container2, [{
    key: "append",
    value: function append() {
      for (var _len10 = arguments.length, children = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        children[_key10] = arguments[_key10];
      }
      for (var _i9 = 0, _children2 = children; _i9 < _children2.length; _i9++) {
        var child = _children2[_i9];
        var nodes = this.normalize(child, this.last);
        var _iterator28 = record_createForOfIteratorHelper(nodes),
          _step28;
        try {
          for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
            var node2 = _step28.value;
            this.proxyOf.nodes.push(node2);
          }
        } catch (err) {
          _iterator28.e(err);
        } finally {
          _iterator28.f();
        }
      }
      this.markDirty();
      return this;
    }
  }, {
    key: "cleanRaws",
    value: function cleanRaws(keepBetween) {
      _superPropGet(Container2, "cleanRaws", this, 3)([keepBetween]);
      if (this.nodes) {
        var _iterator29 = record_createForOfIteratorHelper(this.nodes),
          _step29;
        try {
          for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
            var node2 = _step29.value;
            node2.cleanRaws(keepBetween);
          }
        } catch (err) {
          _iterator29.e(err);
        } finally {
          _iterator29.f();
        }
      }
    }
  }, {
    key: "each",
    value: function each(callback) {
      if (!this.proxyOf.nodes) return void 0;
      var iterator = this.getIterator();
      var index2, result2;
      while (this.indexes[iterator] < this.proxyOf.nodes.length) {
        index2 = this.indexes[iterator];
        result2 = callback(this.proxyOf.nodes[index2], index2);
        if (result2 === false) break;
        this.indexes[iterator] += 1;
      }
      delete this.indexes[iterator];
      return result2;
    }
  }, {
    key: "every",
    value: function every(condition) {
      return this.nodes.every(condition);
    }
  }, {
    key: "getIterator",
    value: function getIterator() {
      if (!this.lastEach) this.lastEach = 0;
      if (!this.indexes) this.indexes = {};
      this.lastEach += 1;
      var iterator = this.lastEach;
      this.indexes[iterator] = 0;
      return iterator;
    }
  }, {
    key: "getProxyProcessor",
    value: function getProxyProcessor() {
      return {
        get: function get(node2, prop) {
          if (prop === "proxyOf") {
            return node2;
          } else if (!node2[prop]) {
            return node2[prop];
          } else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) {
            return function () {
              for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                args[_key11] = arguments[_key11];
              }
              return node2[prop].apply(node2, record_toConsumableArray(args.map(function (i2) {
                if (typeof i2 === "function") {
                  return function (child, index2) {
                    return i2(child.toProxy(), index2);
                  };
                } else {
                  return i2;
                }
              })));
            };
          } else if (prop === "every" || prop === "some") {
            return function (cb) {
              return node2[prop](function (child) {
                for (var _len12 = arguments.length, other = new Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
                  other[_key12 - 1] = arguments[_key12];
                }
                return cb.apply(void 0, [child.toProxy()].concat(other));
              });
            };
          } else if (prop === "root") {
            return function () {
              return node2.root().toProxy();
            };
          } else if (prop === "nodes") {
            return node2.nodes.map(function (i2) {
              return i2.toProxy();
            });
          } else if (prop === "first" || prop === "last") {
            return node2[prop].toProxy();
          } else {
            return node2[prop];
          }
        },
        set: function set(node2, prop, value) {
          if (node2[prop] === value) return true;
          node2[prop] = value;
          if (prop === "name" || prop === "params" || prop === "selector") {
            node2.markDirty();
          }
          return true;
        }
      };
    }
  }, {
    key: "index",
    value: function index(child) {
      if (typeof child === "number") return child;
      if (child.proxyOf) child = child.proxyOf;
      return this.proxyOf.nodes.indexOf(child);
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(exist, add) {
      var existIndex = this.index(exist);
      var nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
      existIndex = this.index(exist);
      var _iterator30 = record_createForOfIteratorHelper(nodes),
        _step30;
      try {
        for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
          var node2 = _step30.value;
          this.proxyOf.nodes.splice(existIndex + 1, 0, node2);
        }
      } catch (err) {
        _iterator30.e(err);
      } finally {
        _iterator30.f();
      }
      var index2;
      for (var id in this.indexes) {
        index2 = this.indexes[id];
        if (existIndex < index2) {
          this.indexes[id] = index2 + nodes.length;
        }
      }
      this.markDirty();
      return this;
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(exist, add) {
      var existIndex = this.index(exist);
      var type = existIndex === 0 ? "prepend" : false;
      var nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse();
      existIndex = this.index(exist);
      var _iterator31 = record_createForOfIteratorHelper(nodes),
        _step31;
      try {
        for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
          var node2 = _step31.value;
          this.proxyOf.nodes.splice(existIndex, 0, node2);
        }
      } catch (err) {
        _iterator31.e(err);
      } finally {
        _iterator31.f();
      }
      var index2;
      for (var id in this.indexes) {
        index2 = this.indexes[id];
        if (existIndex <= index2) {
          this.indexes[id] = index2 + nodes.length;
        }
      }
      this.markDirty();
      return this;
    }
  }, {
    key: "normalize",
    value: function normalize(nodes, sample) {
      var _this26 = this;
      if (typeof nodes === "string") {
        nodes = cleanSource(parse$4(nodes).nodes);
      } else if (typeof nodes === "undefined") {
        nodes = [];
      } else if (Array.isArray(nodes)) {
        nodes = nodes.slice(0);
        var _iterator32 = record_createForOfIteratorHelper(nodes),
          _step32;
        try {
          for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
            var i2 = _step32.value;
            if (i2.parent) i2.parent.removeChild(i2, "ignore");
          }
        } catch (err) {
          _iterator32.e(err);
        } finally {
          _iterator32.f();
        }
      } else if (nodes.type === "root" && this.type !== "document") {
        nodes = nodes.nodes.slice(0);
        var _iterator33 = record_createForOfIteratorHelper(nodes),
          _step33;
        try {
          for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
            var _i10 = _step33.value;
            if (_i10.parent) _i10.parent.removeChild(_i10, "ignore");
          }
        } catch (err) {
          _iterator33.e(err);
        } finally {
          _iterator33.f();
        }
      } else if (nodes.type) {
        nodes = [nodes];
      } else if (nodes.prop) {
        if (typeof nodes.value === "undefined") {
          throw new Error("Value field is missed in node creation");
        } else if (typeof nodes.value !== "string") {
          nodes.value = String(nodes.value);
        }
        nodes = [new Declaration$3(nodes)];
      } else if (nodes.selector) {
        nodes = [new Rule$4(nodes)];
      } else if (nodes.name) {
        nodes = [new AtRule$4(nodes)];
      } else if (nodes.text) {
        nodes = [new Comment$3(nodes)];
      } else {
        throw new Error("Unknown node type in node creation");
      }
      var processed = nodes.map(function (i2) {
        if (!i2[my$1]) Container2.rebuild(i2);
        i2 = i2.proxyOf;
        if (i2.parent) i2.parent.removeChild(i2);
        if (i2[isClean$1]) markDirtyUp(i2);
        if (typeof i2.raws.before === "undefined") {
          if (sample && typeof sample.raws.before !== "undefined") {
            i2.raws.before = sample.raws.before.replace(/\S/g, "");
          }
        }
        i2.parent = _this26.proxyOf;
        return i2;
      });
      return processed;
    }
  }, {
    key: "prepend",
    value: function prepend() {
      for (var _len13 = arguments.length, children = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        children[_key13] = arguments[_key13];
      }
      children = children.reverse();
      var _iterator34 = record_createForOfIteratorHelper(children),
        _step34;
      try {
        for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
          var child = _step34.value;
          var nodes = this.normalize(child, this.first, "prepend").reverse();
          var _iterator35 = record_createForOfIteratorHelper(nodes),
            _step35;
          try {
            for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
              var node2 = _step35.value;
              this.proxyOf.nodes.unshift(node2);
            }
          } catch (err) {
            _iterator35.e(err);
          } finally {
            _iterator35.f();
          }
          for (var id in this.indexes) {
            this.indexes[id] = this.indexes[id] + nodes.length;
          }
        }
      } catch (err) {
        _iterator34.e(err);
      } finally {
        _iterator34.f();
      }
      this.markDirty();
      return this;
    }
  }, {
    key: "push",
    value: function push(child) {
      child.parent = this;
      this.proxyOf.nodes.push(child);
      return this;
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      var _iterator36 = record_createForOfIteratorHelper(this.proxyOf.nodes),
        _step36;
      try {
        for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
          var node2 = _step36.value;
          node2.parent = void 0;
        }
      } catch (err) {
        _iterator36.e(err);
      } finally {
        _iterator36.f();
      }
      this.proxyOf.nodes = [];
      this.markDirty();
      return this;
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      child = this.index(child);
      this.proxyOf.nodes[child].parent = void 0;
      this.proxyOf.nodes.splice(child, 1);
      var index2;
      for (var id in this.indexes) {
        index2 = this.indexes[id];
        if (index2 >= child) {
          this.indexes[id] = index2 - 1;
        }
      }
      this.markDirty();
      return this;
    }
  }, {
    key: "replaceValues",
    value: function replaceValues(pattern, opts, callback) {
      if (!callback) {
        callback = opts;
        opts = {};
      }
      this.walkDecls(function (decl) {
        if (opts.props && !opts.props.includes(decl.prop)) return;
        if (opts.fast && !decl.value.includes(opts.fast)) return;
        decl.value = decl.value.replace(pattern, callback);
      });
      this.markDirty();
      return this;
    }
  }, {
    key: "some",
    value: function some(condition) {
      return this.nodes.some(condition);
    }
  }, {
    key: "walk",
    value: function walk(callback) {
      return this.each(function (child, i2) {
        var result2;
        try {
          result2 = callback(child, i2);
        } catch (e2) {
          throw child.addToError(e2);
        }
        if (result2 !== false && child.walk) {
          result2 = child.walk(callback);
        }
        return result2;
      });
    }
  }, {
    key: "walkAtRules",
    value: function walkAtRules(name, callback) {
      if (!callback) {
        callback = name;
        return this.walk(function (child, i2) {
          if (child.type === "atrule") {
            return callback(child, i2);
          }
        });
      }
      if (name instanceof RegExp) {
        return this.walk(function (child, i2) {
          if (child.type === "atrule" && name.test(child.name)) {
            return callback(child, i2);
          }
        });
      }
      return this.walk(function (child, i2) {
        if (child.type === "atrule" && child.name === name) {
          return callback(child, i2);
        }
      });
    }
  }, {
    key: "walkComments",
    value: function walkComments(callback) {
      return this.walk(function (child, i2) {
        if (child.type === "comment") {
          return callback(child, i2);
        }
      });
    }
  }, {
    key: "walkDecls",
    value: function walkDecls(prop, callback) {
      if (!callback) {
        callback = prop;
        return this.walk(function (child, i2) {
          if (child.type === "decl") {
            return callback(child, i2);
          }
        });
      }
      if (prop instanceof RegExp) {
        return this.walk(function (child, i2) {
          if (child.type === "decl" && prop.test(child.prop)) {
            return callback(child, i2);
          }
        });
      }
      return this.walk(function (child, i2) {
        if (child.type === "decl" && child.prop === prop) {
          return callback(child, i2);
        }
      });
    }
  }, {
    key: "walkRules",
    value: function walkRules(selector, callback) {
      if (!callback) {
        callback = selector;
        return this.walk(function (child, i2) {
          if (child.type === "rule") {
            return callback(child, i2);
          }
        });
      }
      if (selector instanceof RegExp) {
        return this.walk(function (child, i2) {
          if (child.type === "rule" && selector.test(child.selector)) {
            return callback(child, i2);
          }
        });
      }
      return this.walk(function (child, i2) {
        if (child.type === "rule" && child.selector === selector) {
          return callback(child, i2);
        }
      });
    }
  }, {
    key: "first",
    get: function get() {
      if (!this.proxyOf.nodes) return void 0;
      return this.proxyOf.nodes[0];
    }
  }, {
    key: "last",
    get: function get() {
      if (!this.proxyOf.nodes) return void 0;
      return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
    }
  }]);
}(Node$1);
Container$7.registerParse = function (dependant) {
  parse$4 = dependant;
};
Container$7.registerRule = function (dependant) {
  Rule$4 = dependant;
};
Container$7.registerAtRule = function (dependant) {
  AtRule$4 = dependant;
};
Container$7.registerRoot = function (dependant) {
  Root$6 = dependant;
};
var container = Container$7;
Container$7.default = Container$7;
Container$7.rebuild = function (node2) {
  if (node2.type === "atrule") {
    Object.setPrototypeOf(node2, AtRule$4.prototype);
  } else if (node2.type === "rule") {
    Object.setPrototypeOf(node2, Rule$4.prototype);
  } else if (node2.type === "decl") {
    Object.setPrototypeOf(node2, Declaration$3.prototype);
  } else if (node2.type === "comment") {
    Object.setPrototypeOf(node2, Comment$3.prototype);
  } else if (node2.type === "root") {
    Object.setPrototypeOf(node2, Root$6.prototype);
  }
  node2[my$1] = true;
  if (node2.nodes) {
    node2.nodes.forEach(function (child) {
      Container$7.rebuild(child);
    });
  }
};
var Container$6 = container;
var LazyResult$4, Processor$3;
var Document$3 = /*#__PURE__*/function (_Container$) {
  function Document23(defaults) {
    var _this27;
    record_classCallCheck(this, Document23);
    _this27 = _callSuper(this, Document23, [record_objectSpread({
      type: "document"
    }, defaults)]);
    if (!_this27.nodes) {
      _this27.nodes = [];
    }
    return _this27;
  }
  _inherits(Document23, _Container$);
  return record_createClass(Document23, [{
    key: "toResult",
    value: function toResult() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var lazy = new LazyResult$4(new Processor$3(), this, opts);
      return lazy.stringify();
    }
  }]);
}(Container$6);
Document$3.registerLazyResult = function (dependant) {
  LazyResult$4 = dependant;
};
Document$3.registerProcessor = function (dependant) {
  Processor$3 = dependant;
};
var document$1 = Document$3;
Document$3.default = Document$3;
var printed = {};
var warnOnce$2 = function warnOnce2(message) {
  if (printed[message]) return;
  printed[message] = true;
  if (typeof console !== "undefined" && console.warn) {
    console.warn(message);
  }
};
var Warning$2 = /*#__PURE__*/function () {
  function Warning2(text) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    record_classCallCheck(this, Warning2);
    this.type = "warning";
    this.text = text;
    if (opts.node && opts.node.source) {
      var range = opts.node.rangeBy(opts);
      this.line = range.start.line;
      this.column = range.start.column;
      this.endLine = range.end.line;
      this.endColumn = range.end.column;
    }
    for (var opt in opts) this[opt] = opts[opt];
  }
  return record_createClass(Warning2, [{
    key: "toString",
    value: function toString() {
      if (this.node) {
        return this.node.error(this.text, {
          index: this.index,
          plugin: this.plugin,
          word: this.word
        }).message;
      }
      if (this.plugin) {
        return this.plugin + ": " + this.text;
      }
      return this.text;
    }
  }]);
}();
var warning = Warning$2;
Warning$2.default = Warning$2;
var Warning$1 = warning;
var Result$3 = /*#__PURE__*/function () {
  function Result2(processor2, root2, opts) {
    record_classCallCheck(this, Result2);
    this.processor = processor2;
    this.messages = [];
    this.root = root2;
    this.opts = opts;
    this.css = void 0;
    this.map = void 0;
  }
  return record_createClass(Result2, [{
    key: "toString",
    value: function toString() {
      return this.css;
    }
  }, {
    key: "warn",
    value: function warn(text) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!opts.plugin) {
        if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
          opts.plugin = this.lastPlugin.postcssPlugin;
        }
      }
      var warning2 = new Warning$1(text, opts);
      this.messages.push(warning2);
      return warning2;
    }
  }, {
    key: "warnings",
    value: function warnings() {
      return this.messages.filter(function (i2) {
        return i2.type === "warning";
      });
    }
  }, {
    key: "content",
    get: function get() {
      return this.css;
    }
  }]);
}();
var result = Result$3;
Result$3.default = Result$3;
var SINGLE_QUOTE = "'".charCodeAt(0);
var DOUBLE_QUOTE = '"'.charCodeAt(0);
var BACKSLASH = "\\".charCodeAt(0);
var SLASH = "/".charCodeAt(0);
var NEWLINE = "\n".charCodeAt(0);
var SPACE = " ".charCodeAt(0);
var FEED = "\f".charCodeAt(0);
var TAB = "	".charCodeAt(0);
var CR = "\r".charCodeAt(0);
var OPEN_SQUARE = "[".charCodeAt(0);
var CLOSE_SQUARE = "]".charCodeAt(0);
var OPEN_PARENTHESES = "(".charCodeAt(0);
var CLOSE_PARENTHESES = ")".charCodeAt(0);
var OPEN_CURLY = "{".charCodeAt(0);
var CLOSE_CURLY = "}".charCodeAt(0);
var SEMICOLON = ";".charCodeAt(0);
var ASTERISK = "*".charCodeAt(0);
var COLON = ":".charCodeAt(0);
var AT = "@".charCodeAt(0);
var RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
var RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
var RE_BAD_BRACKET = /.[\r\n"'(/\\]/;
var RE_HEX_ESCAPE = /[\da-f]/i;
var tokenize = function tokenizer2(input2) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var css = input2.css.valueOf();
  var ignore = options.ignoreErrors;
  var code, next, quote, content, escape;
  var escaped, escapePos, prev, n2, currentToken;
  var length = css.length;
  var pos = 0;
  var buffer = [];
  var returned = [];
  function position() {
    return pos;
  }
  function unclosed(what) {
    throw input2.error("Unclosed " + what, pos);
  }
  function endOfFile() {
    return returned.length === 0 && pos >= length;
  }
  function nextToken(opts) {
    if (returned.length) return returned.pop();
    if (pos >= length) return;
    var ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
    code = css.charCodeAt(pos);
    switch (code) {
      case NEWLINE:
      case SPACE:
      case TAB:
      case CR:
      case FEED:
        {
          next = pos;
          do {
            next += 1;
            code = css.charCodeAt(next);
          } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
          currentToken = ["space", css.slice(pos, next)];
          pos = next - 1;
          break;
        }
      case OPEN_SQUARE:
      case CLOSE_SQUARE:
      case OPEN_CURLY:
      case CLOSE_CURLY:
      case COLON:
      case SEMICOLON:
      case CLOSE_PARENTHESES:
        {
          var controlChar = String.fromCharCode(code);
          currentToken = [controlChar, controlChar, pos];
          break;
        }
      case OPEN_PARENTHESES:
        {
          prev = buffer.length ? buffer.pop()[1] : "";
          n2 = css.charCodeAt(pos + 1);
          if (prev === "url" && n2 !== SINGLE_QUOTE && n2 !== DOUBLE_QUOTE && n2 !== SPACE && n2 !== NEWLINE && n2 !== TAB && n2 !== FEED && n2 !== CR) {
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(")", next + 1);
              if (next === -1) {
                if (ignore || ignoreUnclosed) {
                  next = pos;
                  break;
                } else {
                  unclosed("bracket");
                }
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            currentToken = ["brackets", css.slice(pos, next + 1), pos, next];
            pos = next;
          } else {
            next = css.indexOf(")", pos + 1);
            content = css.slice(pos, next + 1);
            if (next === -1 || RE_BAD_BRACKET.test(content)) {
              currentToken = ["(", "(", pos];
            } else {
              currentToken = ["brackets", content, pos, next];
              pos = next;
            }
          }
          break;
        }
      case SINGLE_QUOTE:
      case DOUBLE_QUOTE:
        {
          quote = code === SINGLE_QUOTE ? "'" : '"';
          next = pos;
          do {
            escaped = false;
            next = css.indexOf(quote, next + 1);
            if (next === -1) {
              if (ignore || ignoreUnclosed) {
                next = pos + 1;
                break;
              } else {
                unclosed("string");
              }
            }
            escapePos = next;
            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
              escapePos -= 1;
              escaped = !escaped;
            }
          } while (escaped);
          currentToken = ["string", css.slice(pos, next + 1), pos, next];
          pos = next;
          break;
        }
      case AT:
        {
          RE_AT_END.lastIndex = pos + 1;
          RE_AT_END.test(css);
          if (RE_AT_END.lastIndex === 0) {
            next = css.length - 1;
          } else {
            next = RE_AT_END.lastIndex - 2;
          }
          currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
          pos = next;
          break;
        }
      case BACKSLASH:
        {
          next = pos;
          escape = true;
          while (css.charCodeAt(next + 1) === BACKSLASH) {
            next += 1;
            escape = !escape;
          }
          code = css.charCodeAt(next + 1);
          if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
            next += 1;
            if (RE_HEX_ESCAPE.test(css.charAt(next))) {
              while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                next += 1;
              }
              if (css.charCodeAt(next + 1) === SPACE) {
                next += 1;
              }
            }
          }
          currentToken = ["word", css.slice(pos, next + 1), pos, next];
          pos = next;
          break;
        }
      default:
        {
          if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
            next = css.indexOf("*/", pos + 2) + 1;
            if (next === 0) {
              if (ignore || ignoreUnclosed) {
                next = css.length;
              } else {
                unclosed("comment");
              }
            }
            currentToken = ["comment", css.slice(pos, next + 1), pos, next];
            pos = next;
          } else {
            RE_WORD_END.lastIndex = pos + 1;
            RE_WORD_END.test(css);
            if (RE_WORD_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_WORD_END.lastIndex - 2;
            }
            currentToken = ["word", css.slice(pos, next + 1), pos, next];
            buffer.push(currentToken);
            pos = next;
          }
          break;
        }
    }
    pos++;
    return currentToken;
  }
  function back(token) {
    returned.push(token);
  }
  return {
    back: back,
    endOfFile: endOfFile,
    nextToken: nextToken,
    position: position
  };
};
var Container$5 = container;
var AtRule$3 = /*#__PURE__*/function (_Container$2) {
  function AtRule2(defaults) {
    var _this28;
    record_classCallCheck(this, AtRule2);
    _this28 = _callSuper(this, AtRule2, [defaults]);
    _this28.type = "atrule";
    return _this28;
  }
  _inherits(AtRule2, _Container$2);
  return record_createClass(AtRule2, [{
    key: "append",
    value: function append() {
      if (!this.proxyOf.nodes) this.nodes = [];
      for (var _len14 = arguments.length, children = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        children[_key14] = arguments[_key14];
      }
      return _superPropGet(AtRule2, "append", this, 3)(children);
    }
  }, {
    key: "prepend",
    value: function prepend() {
      if (!this.proxyOf.nodes) this.nodes = [];
      for (var _len15 = arguments.length, children = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        children[_key15] = arguments[_key15];
      }
      return _superPropGet(AtRule2, "prepend", this, 3)(children);
    }
  }]);
}(Container$5);
var atRule = AtRule$3;
AtRule$3.default = AtRule$3;
Container$5.registerAtRule(AtRule$3);
var Container$4 = container;
var LazyResult$3, Processor$2;
var Root$5 = /*#__PURE__*/function (_Container$3) {
  function Root2(defaults) {
    var _this29;
    record_classCallCheck(this, Root2);
    _this29 = _callSuper(this, Root2, [defaults]);
    _this29.type = "root";
    if (!_this29.nodes) _this29.nodes = [];
    return _this29;
  }
  _inherits(Root2, _Container$3);
  return record_createClass(Root2, [{
    key: "normalize",
    value: function normalize(child, sample, type) {
      var nodes = _superPropGet(Root2, "normalize", this, 3)([child]);
      if (sample) {
        if (type === "prepend") {
          if (this.nodes.length > 1) {
            sample.raws.before = this.nodes[1].raws.before;
          } else {
            delete sample.raws.before;
          }
        } else if (this.first !== sample) {
          var _iterator37 = record_createForOfIteratorHelper(nodes),
            _step37;
          try {
            for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
              var node2 = _step37.value;
              node2.raws.before = sample.raws.before;
            }
          } catch (err) {
            _iterator37.e(err);
          } finally {
            _iterator37.f();
          }
        }
      }
      return nodes;
    }
  }, {
    key: "removeChild",
    value: function removeChild(child, ignore) {
      var index2 = this.index(child);
      if (!ignore && index2 === 0 && this.nodes.length > 1) {
        this.nodes[1].raws.before = this.nodes[index2].raws.before;
      }
      return _superPropGet(Root2, "removeChild", this, 3)([child]);
    }
  }, {
    key: "toResult",
    value: function toResult() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var lazy = new LazyResult$3(new Processor$2(), this, opts);
      return lazy.stringify();
    }
  }]);
}(Container$4);
Root$5.registerLazyResult = function (dependant) {
  LazyResult$3 = dependant;
};
Root$5.registerProcessor = function (dependant) {
  Processor$2 = dependant;
};
var root = Root$5;
Root$5.default = Root$5;
Container$4.registerRoot(Root$5);
var list$2 = {
  comma: function comma(string) {
    return list$2.split(string, [","], true);
  },
  space: function space(string) {
    var spaces = [" ", "\n", "	"];
    return list$2.split(string, spaces);
  },
  split: function split(string, separators, last) {
    var array = [];
    var current = "";
    var split = false;
    var func = 0;
    var inQuote = false;
    var prevQuote = "";
    var escape = false;
    var _iterator38 = record_createForOfIteratorHelper(string),
      _step38;
    try {
      for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
        var letter = _step38.value;
        if (escape) {
          escape = false;
        } else if (letter === "\\") {
          escape = true;
        } else if (inQuote) {
          if (letter === prevQuote) {
            inQuote = false;
          }
        } else if (letter === '"' || letter === "'") {
          inQuote = true;
          prevQuote = letter;
        } else if (letter === "(") {
          func += 1;
        } else if (letter === ")") {
          if (func > 0) func -= 1;
        } else if (func === 0) {
          if (separators.includes(letter)) split = true;
        }
        if (split) {
          if (current !== "") array.push(current.trim());
          current = "";
          split = false;
        } else {
          current += letter;
        }
      }
    } catch (err) {
      _iterator38.e(err);
    } finally {
      _iterator38.f();
    }
    if (last || current !== "") array.push(current.trim());
    return array;
  }
};
var list_1 = list$2;
list$2.default = list$2;
var Container$3 = container;
var list$1 = list_1;
var Rule$3 = /*#__PURE__*/function (_Container$4) {
  function Rule2(defaults) {
    var _this30;
    record_classCallCheck(this, Rule2);
    _this30 = _callSuper(this, Rule2, [defaults]);
    _this30.type = "rule";
    if (!_this30.nodes) _this30.nodes = [];
    return _this30;
  }
  _inherits(Rule2, _Container$4);
  return record_createClass(Rule2, [{
    key: "selectors",
    get: function get() {
      return list$1.comma(this.selector);
    },
    set: function set(values) {
      var match = this.selector ? this.selector.match(/,\s*/) : null;
      var sep2 = match ? match[0] : "," + this.raw("between", "beforeOpen");
      this.selector = values.join(sep2);
    }
  }]);
}(Container$3);
var rule = Rule$3;
Rule$3.default = Rule$3;
Container$3.registerRule(Rule$3);
var Declaration$2 = declaration;
var tokenizer22 = tokenize;
var Comment$2 = comment;
var AtRule$2 = atRule;
var Root$4 = root;
var Rule$2 = rule;
var SAFE_COMMENT_NEIGHBOR = {
  empty: true,
  space: true
};
function findLastWithPosition(tokens) {
  for (var i2 = tokens.length - 1; i2 >= 0; i2--) {
    var token = tokens[i2];
    var pos = token[3] || token[2];
    if (pos) return pos;
  }
}
var Parser$1 = /*#__PURE__*/function () {
  function Parser2(input2) {
    record_classCallCheck(this, Parser2);
    this.input = input2;
    this.root = new Root$4();
    this.current = this.root;
    this.spaces = "";
    this.semicolon = false;
    this.createTokenizer();
    this.root.source = {
      input: input2,
      start: {
        column: 1,
        line: 1,
        offset: 0
      }
    };
  }
  return record_createClass(Parser2, [{
    key: "atrule",
    value: function atrule(token) {
      var node2 = new AtRule$2();
      node2.name = token[1].slice(1);
      if (node2.name === "") {
        this.unnamedAtrule(node2, token);
      }
      this.init(node2, token[2]);
      var type;
      var prev;
      var shift;
      var last = false;
      var open = false;
      var params = [];
      var brackets = [];
      while (!this.tokenizer.endOfFile()) {
        token = this.tokenizer.nextToken();
        type = token[0];
        if (type === "(" || type === "[") {
          brackets.push(type === "(" ? ")" : "]");
        } else if (type === "{" && brackets.length > 0) {
          brackets.push("}");
        } else if (type === brackets[brackets.length - 1]) {
          brackets.pop();
        }
        if (brackets.length === 0) {
          if (type === ";") {
            node2.source.end = this.getPosition(token[2]);
            node2.source.end.offset++;
            this.semicolon = true;
            break;
          } else if (type === "{") {
            open = true;
            break;
          } else if (type === "}") {
            if (params.length > 0) {
              shift = params.length - 1;
              prev = params[shift];
              while (prev && prev[0] === "space") {
                prev = params[--shift];
              }
              if (prev) {
                node2.source.end = this.getPosition(prev[3] || prev[2]);
                node2.source.end.offset++;
              }
            }
            this.end(token);
            break;
          } else {
            params.push(token);
          }
        } else {
          params.push(token);
        }
        if (this.tokenizer.endOfFile()) {
          last = true;
          break;
        }
      }
      node2.raws.between = this.spacesAndCommentsFromEnd(params);
      if (params.length) {
        node2.raws.afterName = this.spacesAndCommentsFromStart(params);
        this.raw(node2, "params", params);
        if (last) {
          token = params[params.length - 1];
          node2.source.end = this.getPosition(token[3] || token[2]);
          node2.source.end.offset++;
          this.spaces = node2.raws.between;
          node2.raws.between = "";
        }
      } else {
        node2.raws.afterName = "";
        node2.params = "";
      }
      if (open) {
        node2.nodes = [];
        this.current = node2;
      }
    }
  }, {
    key: "checkMissedSemicolon",
    value: function checkMissedSemicolon(tokens) {
      var colon = this.colon(tokens);
      if (colon === false) return;
      var founded = 0;
      var token;
      for (var j = colon - 1; j >= 0; j--) {
        token = tokens[j];
        if (token[0] !== "space") {
          founded += 1;
          if (founded === 2) break;
        }
      }
      throw this.input.error("Missed semicolon", token[0] === "word" ? token[3] + 1 : token[2]);
    }
  }, {
    key: "colon",
    value: function colon(tokens) {
      var brackets = 0;
      var token, type, prev;
      var _iterator39 = record_createForOfIteratorHelper(tokens.entries()),
        _step39;
      try {
        for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
          var _step39$value = record_slicedToArray(_step39.value, 2),
            i2 = _step39$value[0],
            element = _step39$value[1];
          token = element;
          type = token[0];
          if (type === "(") {
            brackets += 1;
          }
          if (type === ")") {
            brackets -= 1;
          }
          if (brackets === 0 && type === ":") {
            if (!prev) {
              this.doubleColon(token);
            } else if (prev[0] === "word" && prev[1] === "progid") {
              continue;
            } else {
              return i2;
            }
          }
          prev = token;
        }
      } catch (err) {
        _iterator39.e(err);
      } finally {
        _iterator39.f();
      }
      return false;
    }
  }, {
    key: "comment",
    value: function comment(token) {
      var node2 = new Comment$2();
      this.init(node2, token[2]);
      node2.source.end = this.getPosition(token[3] || token[2]);
      node2.source.end.offset++;
      var text = token[1].slice(2, -2);
      if (/^\s*$/.test(text)) {
        node2.text = "";
        node2.raws.left = text;
        node2.raws.right = "";
      } else {
        var match = text.match(/^(\s*)([^]*\S)(\s*)$/);
        node2.text = match[2];
        node2.raws.left = match[1];
        node2.raws.right = match[3];
      }
    }
  }, {
    key: "createTokenizer",
    value: function createTokenizer() {
      this.tokenizer = tokenizer22(this.input);
    }
  }, {
    key: "decl",
    value: function decl(tokens, customProperty) {
      var node2 = new Declaration$2();
      this.init(node2, tokens[0][2]);
      var last = tokens[tokens.length - 1];
      if (last[0] === ";") {
        this.semicolon = true;
        tokens.pop();
      }
      node2.source.end = this.getPosition(last[3] || last[2] || findLastWithPosition(tokens));
      node2.source.end.offset++;
      while (tokens[0][0] !== "word") {
        if (tokens.length === 1) this.unknownWord(tokens);
        node2.raws.before += tokens.shift()[1];
      }
      node2.source.start = this.getPosition(tokens[0][2]);
      node2.prop = "";
      while (tokens.length) {
        var type = tokens[0][0];
        if (type === ":" || type === "space" || type === "comment") {
          break;
        }
        node2.prop += tokens.shift()[1];
      }
      node2.raws.between = "";
      var token;
      while (tokens.length) {
        token = tokens.shift();
        if (token[0] === ":") {
          node2.raws.between += token[1];
          break;
        } else {
          if (token[0] === "word" && /\w/.test(token[1])) {
            this.unknownWord([token]);
          }
          node2.raws.between += token[1];
        }
      }
      if (node2.prop[0] === "_" || node2.prop[0] === "*") {
        node2.raws.before += node2.prop[0];
        node2.prop = node2.prop.slice(1);
      }
      var firstSpaces = [];
      var next;
      while (tokens.length) {
        next = tokens[0][0];
        if (next !== "space" && next !== "comment") break;
        firstSpaces.push(tokens.shift());
      }
      this.precheckMissedSemicolon(tokens);
      for (var i2 = tokens.length - 1; i2 >= 0; i2--) {
        token = tokens[i2];
        if (token[1].toLowerCase() === "!important") {
          node2.important = true;
          var string = this.stringFrom(tokens, i2);
          string = this.spacesFromEnd(tokens) + string;
          if (string !== " !important") node2.raws.important = string;
          break;
        } else if (token[1].toLowerCase() === "important") {
          var cache = tokens.slice(0);
          var str = "";
          for (var j = i2; j > 0; j--) {
            var _type2 = cache[j][0];
            if (str.trim().indexOf("!") === 0 && _type2 !== "space") {
              break;
            }
            str = cache.pop()[1] + str;
          }
          if (str.trim().indexOf("!") === 0) {
            node2.important = true;
            node2.raws.important = str;
            tokens = cache;
          }
        }
        if (token[0] !== "space" && token[0] !== "comment") {
          break;
        }
      }
      var hasWord = tokens.some(function (i2) {
        return i2[0] !== "space" && i2[0] !== "comment";
      });
      if (hasWord) {
        node2.raws.between += firstSpaces.map(function (i2) {
          return i2[1];
        }).join("");
        firstSpaces = [];
      }
      this.raw(node2, "value", firstSpaces.concat(tokens), customProperty);
      if (node2.value.includes(":") && !customProperty) {
        this.checkMissedSemicolon(tokens);
      }
    }
  }, {
    key: "doubleColon",
    value: function doubleColon(token) {
      throw this.input.error("Double colon", {
        offset: token[2]
      }, {
        offset: token[2] + token[1].length
      });
    }
  }, {
    key: "emptyRule",
    value: function emptyRule(token) {
      var node2 = new Rule$2();
      this.init(node2, token[2]);
      node2.selector = "";
      node2.raws.between = "";
      this.current = node2;
    }
  }, {
    key: "end",
    value: function end(token) {
      if (this.current.nodes && this.current.nodes.length) {
        this.current.raws.semicolon = this.semicolon;
      }
      this.semicolon = false;
      this.current.raws.after = (this.current.raws.after || "") + this.spaces;
      this.spaces = "";
      if (this.current.parent) {
        this.current.source.end = this.getPosition(token[2]);
        this.current.source.end.offset++;
        this.current = this.current.parent;
      } else {
        this.unexpectedClose(token);
      }
    }
  }, {
    key: "endFile",
    value: function endFile() {
      if (this.current.parent) this.unclosedBlock();
      if (this.current.nodes && this.current.nodes.length) {
        this.current.raws.semicolon = this.semicolon;
      }
      this.current.raws.after = (this.current.raws.after || "") + this.spaces;
      this.root.source.end = this.getPosition(this.tokenizer.position());
    }
  }, {
    key: "freeSemicolon",
    value: function freeSemicolon(token) {
      this.spaces += token[1];
      if (this.current.nodes) {
        var prev = this.current.nodes[this.current.nodes.length - 1];
        if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
          prev.raws.ownSemicolon = this.spaces;
          this.spaces = "";
        }
      }
    }
    // Helpers
  }, {
    key: "getPosition",
    value: function getPosition(offset) {
      var pos = this.input.fromOffset(offset);
      return {
        column: pos.col,
        line: pos.line,
        offset: offset
      };
    }
  }, {
    key: "init",
    value: function init(node2, offset) {
      this.current.push(node2);
      node2.source = {
        input: this.input,
        start: this.getPosition(offset)
      };
      node2.raws.before = this.spaces;
      this.spaces = "";
      if (node2.type !== "comment") this.semicolon = false;
    }
  }, {
    key: "other",
    value: function other(start) {
      var end = false;
      var type = null;
      var colon = false;
      var bracket = null;
      var brackets = [];
      var customProperty = start[1].startsWith("--");
      var tokens = [];
      var token = start;
      while (token) {
        type = token[0];
        tokens.push(token);
        if (type === "(" || type === "[") {
          if (!bracket) bracket = token;
          brackets.push(type === "(" ? ")" : "]");
        } else if (customProperty && colon && type === "{") {
          if (!bracket) bracket = token;
          brackets.push("}");
        } else if (brackets.length === 0) {
          if (type === ";") {
            if (colon) {
              this.decl(tokens, customProperty);
              return;
            } else {
              break;
            }
          } else if (type === "{") {
            this.rule(tokens);
            return;
          } else if (type === "}") {
            this.tokenizer.back(tokens.pop());
            end = true;
            break;
          } else if (type === ":") {
            colon = true;
          }
        } else if (type === brackets[brackets.length - 1]) {
          brackets.pop();
          if (brackets.length === 0) bracket = null;
        }
        token = this.tokenizer.nextToken();
      }
      if (this.tokenizer.endOfFile()) end = true;
      if (brackets.length > 0) this.unclosedBracket(bracket);
      if (end && colon) {
        if (!customProperty) {
          while (tokens.length) {
            token = tokens[tokens.length - 1][0];
            if (token !== "space" && token !== "comment") break;
            this.tokenizer.back(tokens.pop());
          }
        }
        this.decl(tokens, customProperty);
      } else {
        this.unknownWord(tokens);
      }
    }
  }, {
    key: "parse",
    value: function parse() {
      var token;
      while (!this.tokenizer.endOfFile()) {
        token = this.tokenizer.nextToken();
        switch (token[0]) {
          case "space":
            this.spaces += token[1];
            break;
          case ";":
            this.freeSemicolon(token);
            break;
          case "}":
            this.end(token);
            break;
          case "comment":
            this.comment(token);
            break;
          case "at-word":
            this.atrule(token);
            break;
          case "{":
            this.emptyRule(token);
            break;
          default:
            this.other(token);
            break;
        }
      }
      this.endFile();
    }
  }, {
    key: "precheckMissedSemicolon",
    value: function precheckMissedSemicolon() {}
  }, {
    key: "raw",
    value: function raw(node2, prop, tokens, customProperty) {
      var token, type;
      var length = tokens.length;
      var value = "";
      var clean = true;
      var next, prev;
      for (var i2 = 0; i2 < length; i2 += 1) {
        token = tokens[i2];
        type = token[0];
        if (type === "space" && i2 === length - 1 && !customProperty) {
          clean = false;
        } else if (type === "comment") {
          prev = tokens[i2 - 1] ? tokens[i2 - 1][0] : "empty";
          next = tokens[i2 + 1] ? tokens[i2 + 1][0] : "empty";
          if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
            if (value.slice(-1) === ",") {
              clean = false;
            } else {
              value += token[1];
            }
          } else {
            clean = false;
          }
        } else {
          value += token[1];
        }
      }
      if (!clean) {
        var _raw2 = tokens.reduce(function (all, i2) {
          return all + i2[1];
        }, "");
        node2.raws[prop] = {
          raw: _raw2,
          value: value
        };
      }
      node2[prop] = value;
    }
  }, {
    key: "rule",
    value: function rule(tokens) {
      tokens.pop();
      var node2 = new Rule$2();
      this.init(node2, tokens[0][2]);
      node2.raws.between = this.spacesAndCommentsFromEnd(tokens);
      this.raw(node2, "selector", tokens);
      this.current = node2;
    }
  }, {
    key: "spacesAndCommentsFromEnd",
    value: function spacesAndCommentsFromEnd(tokens) {
      var lastTokenType;
      var spaces = "";
      while (tokens.length) {
        lastTokenType = tokens[tokens.length - 1][0];
        if (lastTokenType !== "space" && lastTokenType !== "comment") break;
        spaces = tokens.pop()[1] + spaces;
      }
      return spaces;
    }
    // Errors
  }, {
    key: "spacesAndCommentsFromStart",
    value: function spacesAndCommentsFromStart(tokens) {
      var next;
      var spaces = "";
      while (tokens.length) {
        next = tokens[0][0];
        if (next !== "space" && next !== "comment") break;
        spaces += tokens.shift()[1];
      }
      return spaces;
    }
  }, {
    key: "spacesFromEnd",
    value: function spacesFromEnd(tokens) {
      var lastTokenType;
      var spaces = "";
      while (tokens.length) {
        lastTokenType = tokens[tokens.length - 1][0];
        if (lastTokenType !== "space") break;
        spaces = tokens.pop()[1] + spaces;
      }
      return spaces;
    }
  }, {
    key: "stringFrom",
    value: function stringFrom(tokens, from) {
      var result2 = "";
      for (var i2 = from; i2 < tokens.length; i2++) {
        result2 += tokens[i2][1];
      }
      tokens.splice(from, tokens.length - from);
      return result2;
    }
  }, {
    key: "unclosedBlock",
    value: function unclosedBlock() {
      var pos = this.current.source.start;
      throw this.input.error("Unclosed block", pos.line, pos.column);
    }
  }, {
    key: "unclosedBracket",
    value: function unclosedBracket(bracket) {
      throw this.input.error("Unclosed bracket", {
        offset: bracket[2]
      }, {
        offset: bracket[2] + 1
      });
    }
  }, {
    key: "unexpectedClose",
    value: function unexpectedClose(token) {
      throw this.input.error("Unexpected }", {
        offset: token[2]
      }, {
        offset: token[2] + 1
      });
    }
  }, {
    key: "unknownWord",
    value: function unknownWord(tokens) {
      throw this.input.error("Unknown word", {
        offset: tokens[0][2]
      }, {
        offset: tokens[0][2] + tokens[0][1].length
      });
    }
  }, {
    key: "unnamedAtrule",
    value: function unnamedAtrule(node2, token) {
      throw this.input.error("At-rule without name", {
        offset: token[2]
      }, {
        offset: token[2] + token[1].length
      });
    }
  }]);
}();
var parser = Parser$1;
var Container$2 = container;
var Parser22 = parser;
var Input$2 = input;
function parse$3(css, opts) {
  var input2 = new Input$2(css, opts);
  var parser2 = new Parser22(input2);
  try {
    parser2.parse();
  } catch (e2) {
    if (false) {}
    throw e2;
  }
  return parser2.root;
}
var parse_1 = parse$3;
parse$3.default = parse$3;
Container$2.registerParse(parse$3);
var isClean = symbols.isClean,
  my = symbols.my;
var MapGenerator$1 = mapGenerator;
var stringify$2 = stringify_1;
var Container$1 = container;
var Document$2 = document$1;
var warnOnce$1 = (/* unused pure expression or super */ null && (warnOnce$2));
var Result$2 = result;
var parse$2 = parse_1;
var Root$3 = root;
var TYPE_TO_CLASS_NAME = {
  atrule: "AtRule",
  comment: "Comment",
  decl: "Declaration",
  document: "Document",
  root: "Root",
  rule: "Rule"
};
var PLUGIN_PROPS = {
  AtRule: true,
  AtRuleExit: true,
  Comment: true,
  CommentExit: true,
  Declaration: true,
  DeclarationExit: true,
  Document: true,
  DocumentExit: true,
  Once: true,
  OnceExit: true,
  postcssPlugin: true,
  prepare: true,
  Root: true,
  RootExit: true,
  Rule: true,
  RuleExit: true
};
var NOT_VISITORS = {
  Once: true,
  postcssPlugin: true,
  prepare: true
};
var CHILDREN = 0;
function record_isPromise(obj) {
  return record_typeof(obj) === "object" && typeof obj.then === "function";
}
function getEvents(node2) {
  var key = false;
  var type = TYPE_TO_CLASS_NAME[node2.type];
  if (node2.type === "decl") {
    key = node2.prop.toLowerCase();
  } else if (node2.type === "atrule") {
    key = node2.name.toLowerCase();
  }
  if (key && node2.append) {
    return [type, type + "-" + key, CHILDREN, type + "Exit", type + "Exit-" + key];
  } else if (key) {
    return [type, type + "-" + key, type + "Exit", type + "Exit-" + key];
  } else if (node2.append) {
    return [type, CHILDREN, type + "Exit"];
  } else {
    return [type, type + "Exit"];
  }
}
function toStack(node2) {
  var events;
  if (node2.type === "document") {
    events = ["Document", CHILDREN, "DocumentExit"];
  } else if (node2.type === "root") {
    events = ["Root", CHILDREN, "RootExit"];
  } else {
    events = getEvents(node2);
  }
  return {
    eventIndex: 0,
    events: events,
    iterator: 0,
    node: node2,
    visitorIndex: 0,
    visitors: []
  };
}
function cleanMarks(node2) {
  node2[isClean] = false;
  if (node2.nodes) node2.nodes.forEach(function (i2) {
    return cleanMarks(i2);
  });
  return node2;
}
var postcss$2 = {};
var LazyResult$2 = /*#__PURE__*/function () {
  function LazyResult2(processor2, css, opts) {
    var _this31 = this;
    record_classCallCheck(this, LazyResult2);
    this.stringified = false;
    this.processed = false;
    var root2;
    if (record_typeof(css) === "object" && css !== null && (css.type === "root" || css.type === "document")) {
      root2 = cleanMarks(css);
    } else if (css instanceof LazyResult2 || css instanceof Result$2) {
      root2 = cleanMarks(css.root);
      if (css.map) {
        if (typeof opts.map === "undefined") opts.map = {};
        if (!opts.map.inline) opts.map.inline = false;
        opts.map.prev = css.map;
      }
    } else {
      var parser2 = parse$2;
      if (opts.syntax) parser2 = opts.syntax.parse;
      if (opts.parser) parser2 = opts.parser;
      if (parser2.parse) parser2 = parser2.parse;
      try {
        root2 = parser2(css, opts);
      } catch (error) {
        this.processed = true;
        this.error = error;
      }
      if (root2 && !root2[my]) {
        Container$1.rebuild(root2);
      }
    }
    this.result = new Result$2(processor2, root2, opts);
    this.helpers = record_objectSpread(record_objectSpread({}, postcss$2), {}, {
      postcss: postcss$2,
      result: this.result
    });
    this.plugins = this.processor.plugins.map(function (plugin22) {
      if (record_typeof(plugin22) === "object" && plugin22.prepare) {
        return record_objectSpread(record_objectSpread({}, plugin22), plugin22.prepare(_this31.result));
      } else {
        return plugin22;
      }
    });
  }
  return record_createClass(LazyResult2, [{
    key: "async",
    value: function async() {
      if (this.error) return Promise.reject(this.error);
      if (this.processed) return Promise.resolve(this.result);
      if (!this.processing) {
        this.processing = this.runAsync();
      }
      return this.processing;
    }
  }, {
    key: "catch",
    value: function _catch(onRejected) {
      return this.async().catch(onRejected);
    }
  }, {
    key: "finally",
    value: function _finally(onFinally) {
      return this.async().then(onFinally, onFinally);
    }
  }, {
    key: "getAsyncError",
    value: function getAsyncError() {
      throw new Error("Use process(css).then(cb) to work with async plugins");
    }
  }, {
    key: "handleError",
    value: function handleError(error, node2) {
      var plugin22 = this.result.lastPlugin;
      try {
        if (node2) node2.addToError(error);
        this.error = error;
        if (error.name === "CssSyntaxError" && !error.plugin) {
          error.plugin = plugin22.postcssPlugin;
          error.setMessage();
        } else if (plugin22.postcssVersion) {
          if (false) { var b, a2, runtimeVer, pluginVer, pluginName; }
        }
      } catch (err) {
        if (console && console.error) console.error(err);
      }
      return error;
    }
  }, {
    key: "prepareVisitors",
    value: function prepareVisitors() {
      var _this32 = this;
      this.listeners = {};
      var add = function add(plugin22, type, cb) {
        if (!_this32.listeners[type]) _this32.listeners[type] = [];
        _this32.listeners[type].push([plugin22, cb]);
      };
      var _iterator40 = record_createForOfIteratorHelper(this.plugins),
        _step40;
      try {
        for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
          var plugin22 = _step40.value;
          if (record_typeof(plugin22) === "object") {
            for (var event in plugin22) {
              if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
                throw new Error("Unknown event ".concat(event, " in ").concat(plugin22.postcssPlugin, ". Try to update PostCSS (").concat(this.processor.version, " now)."));
              }
              if (!NOT_VISITORS[event]) {
                if (record_typeof(plugin22[event]) === "object") {
                  for (var filter in plugin22[event]) {
                    if (filter === "*") {
                      add(plugin22, event, plugin22[event][filter]);
                    } else {
                      add(plugin22, event + "-" + filter.toLowerCase(), plugin22[event][filter]);
                    }
                  }
                } else if (typeof plugin22[event] === "function") {
                  add(plugin22, event, plugin22[event]);
                }
              }
            }
          }
        }
      } catch (err) {
        _iterator40.e(err);
      } finally {
        _iterator40.f();
      }
      this.hasListener = Object.keys(this.listeners).length > 0;
    }
  }, {
    key: "runAsync",
    value: function () {
      var _runAsync2 = record_asyncToGenerator(/*#__PURE__*/record_regeneratorRuntime().mark(function _callee2() {
        var _this33 = this;
        var i2, plugin22, promise, root2, stack, _promise2, node2, _iterator41, _step41, _loop2;
        return record_regeneratorRuntime().wrap(function _callee2$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              this.plugin = 0;
              i2 = 0;
            case 2:
              if (!(i2 < this.plugins.length)) {
                _context4.next = 17;
                break;
              }
              plugin22 = this.plugins[i2];
              promise = this.runOnRoot(plugin22);
              if (!record_isPromise(promise)) {
                _context4.next = 14;
                break;
              }
              _context4.prev = 6;
              _context4.next = 9;
              return promise;
            case 9:
              _context4.next = 14;
              break;
            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](6);
              throw this.handleError(_context4.t0);
            case 14:
              i2++;
              _context4.next = 2;
              break;
            case 17:
              this.prepareVisitors();
              if (!this.hasListener) {
                _context4.next = 56;
                break;
              }
              root2 = this.result.root;
            case 20:
              if (root2[isClean]) {
                _context4.next = 39;
                break;
              }
              root2[isClean] = true;
              stack = [toStack(root2)];
            case 23:
              if (!(stack.length > 0)) {
                _context4.next = 37;
                break;
              }
              _promise2 = this.visitTick(stack);
              if (!record_isPromise(_promise2)) {
                _context4.next = 35;
                break;
              }
              _context4.prev = 26;
              _context4.next = 29;
              return _promise2;
            case 29:
              _context4.next = 35;
              break;
            case 31:
              _context4.prev = 31;
              _context4.t1 = _context4["catch"](26);
              node2 = stack[stack.length - 1].node;
              throw this.handleError(_context4.t1, node2);
            case 35:
              _context4.next = 23;
              break;
            case 37:
              _context4.next = 20;
              break;
            case 39:
              if (!this.listeners.OnceExit) {
                _context4.next = 56;
                break;
              }
              _iterator41 = record_createForOfIteratorHelper(this.listeners.OnceExit);
              _context4.prev = 41;
              _loop2 = /*#__PURE__*/record_regeneratorRuntime().mark(function _loop2() {
                var _step41$value, plugin22, visitor, roots;
                return record_regeneratorRuntime().wrap(function _loop2$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      _step41$value = record_slicedToArray(_step41.value, 2), plugin22 = _step41$value[0], visitor = _step41$value[1];
                      _this33.result.lastPlugin = plugin22;
                      _context3.prev = 2;
                      if (!(root2.type === "document")) {
                        _context3.next = 9;
                        break;
                      }
                      roots = root2.nodes.map(function (subRoot) {
                        return visitor(subRoot, _this33.helpers);
                      });
                      _context3.next = 7;
                      return Promise.all(roots);
                    case 7:
                      _context3.next = 11;
                      break;
                    case 9:
                      _context3.next = 11;
                      return visitor(root2, _this33.helpers);
                    case 11:
                      _context3.next = 16;
                      break;
                    case 13:
                      _context3.prev = 13;
                      _context3.t0 = _context3["catch"](2);
                      throw _this33.handleError(_context3.t0);
                    case 16:
                    case "end":
                      return _context3.stop();
                  }
                }, _loop2, null, [[2, 13]]);
              });
              _iterator41.s();
            case 44:
              if ((_step41 = _iterator41.n()).done) {
                _context4.next = 48;
                break;
              }
              return _context4.delegateYield(_loop2(), "t2", 46);
            case 46:
              _context4.next = 44;
              break;
            case 48:
              _context4.next = 53;
              break;
            case 50:
              _context4.prev = 50;
              _context4.t3 = _context4["catch"](41);
              _iterator41.e(_context4.t3);
            case 53:
              _context4.prev = 53;
              _iterator41.f();
              return _context4.finish(53);
            case 56:
              this.processed = true;
              return _context4.abrupt("return", this.stringify());
            case 58:
            case "end":
              return _context4.stop();
          }
        }, _callee2, this, [[6, 11], [26, 31], [41, 50, 53, 56]]);
      }));
      function runAsync() {
        return _runAsync2.apply(this, arguments);
      }
      return runAsync;
    }()
  }, {
    key: "runOnRoot",
    value: function runOnRoot(plugin22) {
      var _this34 = this;
      this.result.lastPlugin = plugin22;
      try {
        if (record_typeof(plugin22) === "object" && plugin22.Once) {
          if (this.result.root.type === "document") {
            var roots = this.result.root.nodes.map(function (root2) {
              return plugin22.Once(root2, _this34.helpers);
            });
            if (record_isPromise(roots[0])) {
              return Promise.all(roots);
            }
            return roots;
          }
          return plugin22.Once(this.result.root, this.helpers);
        } else if (typeof plugin22 === "function") {
          return plugin22(this.result.root, this.result);
        }
      } catch (error) {
        throw this.handleError(error);
      }
    }
  }, {
    key: "stringify",
    value: function stringify() {
      if (this.error) throw this.error;
      if (this.stringified) return this.result;
      this.stringified = true;
      this.sync();
      var opts = this.result.opts;
      var str = stringify$2;
      if (opts.syntax) str = opts.syntax.stringify;
      if (opts.stringifier) str = opts.stringifier;
      if (str.stringify) str = str.stringify;
      var map = new MapGenerator$1(str, this.result.root, this.result.opts);
      var data = map.generate();
      this.result.css = data[0];
      this.result.map = data[1];
      return this.result;
    }
  }, {
    key: "sync",
    value: function sync() {
      if (this.error) throw this.error;
      if (this.processed) return this.result;
      this.processed = true;
      if (this.processing) {
        throw this.getAsyncError();
      }
      var _iterator42 = record_createForOfIteratorHelper(this.plugins),
        _step42;
      try {
        for (_iterator42.s(); !(_step42 = _iterator42.n()).done;) {
          var plugin22 = _step42.value;
          var promise = this.runOnRoot(plugin22);
          if (record_isPromise(promise)) {
            throw this.getAsyncError();
          }
        }
      } catch (err) {
        _iterator42.e(err);
      } finally {
        _iterator42.f();
      }
      this.prepareVisitors();
      if (this.hasListener) {
        var root2 = this.result.root;
        while (!root2[isClean]) {
          root2[isClean] = true;
          this.walkSync(root2);
        }
        if (this.listeners.OnceExit) {
          if (root2.type === "document") {
            var _iterator43 = record_createForOfIteratorHelper(root2.nodes),
              _step43;
            try {
              for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
                var subRoot = _step43.value;
                this.visitSync(this.listeners.OnceExit, subRoot);
              }
            } catch (err) {
              _iterator43.e(err);
            } finally {
              _iterator43.f();
            }
          } else {
            this.visitSync(this.listeners.OnceExit, root2);
          }
        }
      }
      return this.result;
    }
  }, {
    key: "then",
    value: function then(onFulfilled, onRejected) {
      if (false) {}
      return this.async().then(onFulfilled, onRejected);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.css;
    }
  }, {
    key: "visitSync",
    value: function visitSync(visitors, node2) {
      var _iterator44 = record_createForOfIteratorHelper(visitors),
        _step44;
      try {
        for (_iterator44.s(); !(_step44 = _iterator44.n()).done;) {
          var _step44$value = record_slicedToArray(_step44.value, 2),
            plugin22 = _step44$value[0],
            visitor = _step44$value[1];
          this.result.lastPlugin = plugin22;
          var promise = void 0;
          try {
            promise = visitor(node2, this.helpers);
          } catch (e2) {
            throw this.handleError(e2, node2.proxyOf);
          }
          if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
            return true;
          }
          if (record_isPromise(promise)) {
            throw this.getAsyncError();
          }
        }
      } catch (err) {
        _iterator44.e(err);
      } finally {
        _iterator44.f();
      }
    }
  }, {
    key: "visitTick",
    value: function visitTick(stack) {
      var visit2 = stack[stack.length - 1];
      var node2 = visit2.node,
        visitors = visit2.visitors;
      if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
        stack.pop();
        return;
      }
      if (visitors.length > 0 && visit2.visitorIndex < visitors.length) {
        var _visitors$visit2$visi2 = record_slicedToArray(visitors[visit2.visitorIndex], 2),
          plugin22 = _visitors$visit2$visi2[0],
          visitor = _visitors$visit2$visi2[1];
        visit2.visitorIndex += 1;
        if (visit2.visitorIndex === visitors.length) {
          visit2.visitors = [];
          visit2.visitorIndex = 0;
        }
        this.result.lastPlugin = plugin22;
        try {
          return visitor(node2.toProxy(), this.helpers);
        } catch (e2) {
          throw this.handleError(e2, node2);
        }
      }
      if (visit2.iterator !== 0) {
        var iterator = visit2.iterator;
        var child;
        while (child = node2.nodes[node2.indexes[iterator]]) {
          node2.indexes[iterator] += 1;
          if (!child[isClean]) {
            child[isClean] = true;
            stack.push(toStack(child));
            return;
          }
        }
        visit2.iterator = 0;
        delete node2.indexes[iterator];
      }
      var events = visit2.events;
      while (visit2.eventIndex < events.length) {
        var event = events[visit2.eventIndex];
        visit2.eventIndex += 1;
        if (event === CHILDREN) {
          if (node2.nodes && node2.nodes.length) {
            node2[isClean] = true;
            visit2.iterator = node2.getIterator();
          }
          return;
        } else if (this.listeners[event]) {
          visit2.visitors = this.listeners[event];
          return;
        }
      }
      stack.pop();
    }
  }, {
    key: "walkSync",
    value: function walkSync(node2) {
      var _this35 = this;
      node2[isClean] = true;
      var events = getEvents(node2);
      var _iterator45 = record_createForOfIteratorHelper(events),
        _step45;
      try {
        for (_iterator45.s(); !(_step45 = _iterator45.n()).done;) {
          var event = _step45.value;
          if (event === CHILDREN) {
            if (node2.nodes) {
              node2.each(function (child) {
                if (!child[isClean]) _this35.walkSync(child);
              });
            }
          } else {
            var visitors = this.listeners[event];
            if (visitors) {
              if (this.visitSync(visitors, node2.toProxy())) return;
            }
          }
        }
      } catch (err) {
        _iterator45.e(err);
      } finally {
        _iterator45.f();
      }
    }
  }, {
    key: "warnings",
    value: function warnings() {
      return this.sync().warnings();
    }
  }, {
    key: "content",
    get: function get() {
      return this.stringify().content;
    }
  }, {
    key: "css",
    get: function get() {
      return this.stringify().css;
    }
  }, {
    key: "map",
    get: function get() {
      return this.stringify().map;
    }
  }, {
    key: "messages",
    get: function get() {
      return this.sync().messages;
    }
  }, {
    key: "opts",
    get: function get() {
      return this.result.opts;
    }
  }, {
    key: "processor",
    get: function get() {
      return this.result.processor;
    }
  }, {
    key: "root",
    get: function get() {
      return this.sync().root;
    }
  }, {
    key: Symbol.toStringTag,
    get: function get() {
      return "LazyResult";
    }
  }]);
}();
LazyResult$2.registerPostcss = function (dependant) {
  postcss$2 = dependant;
};
var lazyResult = LazyResult$2;
LazyResult$2.default = LazyResult$2;
Root$3.registerLazyResult(LazyResult$2);
Document$2.registerLazyResult(LazyResult$2);
var MapGenerator22 = mapGenerator;
var stringify$1 = stringify_1;
var warnOnce22 = (/* unused pure expression or super */ null && (warnOnce$2));
var parse$1 = parse_1;
var Result$1 = result;
var NoWorkResult$1 = /*#__PURE__*/function () {
  function NoWorkResult2(processor2, css, opts) {
    record_classCallCheck(this, NoWorkResult2);
    css = css.toString();
    this.stringified = false;
    this._processor = processor2;
    this._css = css;
    this._opts = opts;
    this._map = void 0;
    var root2;
    var str = stringify$1;
    this.result = new Result$1(this._processor, root2, this._opts);
    this.result.css = css;
    var self = this;
    Object.defineProperty(this.result, "root", {
      get: function get() {
        return self.root;
      }
    });
    var map = new MapGenerator22(str, root2, this._opts, css);
    if (map.isMap()) {
      var _map$generate3 = map.generate(),
        _map$generate4 = record_slicedToArray(_map$generate3, 2),
        generatedCSS = _map$generate4[0],
        generatedMap = _map$generate4[1];
      if (generatedCSS) {
        this.result.css = generatedCSS;
      }
      if (generatedMap) {
        this.result.map = generatedMap;
      }
    } else {
      map.clearAnnotation();
      this.result.css = map.css;
    }
  }
  return record_createClass(NoWorkResult2, [{
    key: "async",
    value: function async() {
      if (this.error) return Promise.reject(this.error);
      return Promise.resolve(this.result);
    }
  }, {
    key: "catch",
    value: function _catch(onRejected) {
      return this.async().catch(onRejected);
    }
  }, {
    key: "finally",
    value: function _finally(onFinally) {
      return this.async().then(onFinally, onFinally);
    }
  }, {
    key: "sync",
    value: function sync() {
      if (this.error) throw this.error;
      return this.result;
    }
  }, {
    key: "then",
    value: function then(onFulfilled, onRejected) {
      if (false) {}
      return this.async().then(onFulfilled, onRejected);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this._css;
    }
  }, {
    key: "warnings",
    value: function warnings() {
      return [];
    }
  }, {
    key: "content",
    get: function get() {
      return this.result.css;
    }
  }, {
    key: "css",
    get: function get() {
      return this.result.css;
    }
  }, {
    key: "map",
    get: function get() {
      return this.result.map;
    }
  }, {
    key: "messages",
    get: function get() {
      return [];
    }
  }, {
    key: "opts",
    get: function get() {
      return this.result.opts;
    }
  }, {
    key: "processor",
    get: function get() {
      return this.result.processor;
    }
  }, {
    key: "root",
    get: function get() {
      if (this._root) {
        return this._root;
      }
      var root2;
      var parser2 = parse$1;
      try {
        root2 = parser2(this._css, this._opts);
      } catch (error) {
        this.error = error;
      }
      if (this.error) {
        throw this.error;
      } else {
        this._root = root2;
        return root2;
      }
    }
  }, {
    key: Symbol.toStringTag,
    get: function get() {
      return "NoWorkResult";
    }
  }]);
}();
var noWorkResult = NoWorkResult$1;
NoWorkResult$1.default = NoWorkResult$1;
var NoWorkResult22 = noWorkResult;
var LazyResult$1 = lazyResult;
var Document$1 = document$1;
var Root$2 = root;
var Processor$1 = /*#__PURE__*/function () {
  function Processor2() {
    var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    record_classCallCheck(this, Processor2);
    this.version = "8.4.38";
    this.plugins = this.normalize(plugins);
  }
  return record_createClass(Processor2, [{
    key: "normalize",
    value: function normalize(plugins) {
      var normalized = [];
      var _iterator46 = record_createForOfIteratorHelper(plugins),
        _step46;
      try {
        for (_iterator46.s(); !(_step46 = _iterator46.n()).done;) {
          var i2 = _step46.value;
          if (i2.postcss === true) {
            i2 = i2();
          } else if (i2.postcss) {
            i2 = i2.postcss;
          }
          if (record_typeof(i2) === "object" && Array.isArray(i2.plugins)) {
            normalized = normalized.concat(i2.plugins);
          } else if (record_typeof(i2) === "object" && i2.postcssPlugin) {
            normalized.push(i2);
          } else if (typeof i2 === "function") {
            normalized.push(i2);
          } else if (record_typeof(i2) === "object" && (i2.parse || i2.stringify)) {
            if (false) {}
          } else {
            throw new Error(i2 + " is not a PostCSS plugin");
          }
        }
      } catch (err) {
        _iterator46.e(err);
      } finally {
        _iterator46.f();
      }
      return normalized;
    }
  }, {
    key: "process",
    value: function process(css) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.plugins.length && !opts.parser && !opts.stringifier && !opts.syntax) {
        return new NoWorkResult22(this, css, opts);
      } else {
        return new LazyResult$1(this, css, opts);
      }
    }
  }, {
    key: "use",
    value: function use(plugin22) {
      this.plugins = this.plugins.concat(this.normalize([plugin22]));
      return this;
    }
  }]);
}();
var processor = Processor$1;
Processor$1.default = Processor$1;
Root$2.registerProcessor(Processor$1);
Document$1.registerProcessor(Processor$1);
var Declaration$1 = declaration;
var PreviousMap22 = previousMap;
var Comment$1 = comment;
var AtRule$1 = atRule;
var Input$1 = input;
var Root$1 = root;
var Rule$1 = rule;
function fromJSON$1(json, inputs) {
  if (Array.isArray(json)) return json.map(function (n2) {
    return fromJSON$1(n2);
  });
  var ownInputs = json.inputs,
    defaults = record_objectWithoutProperties(json, _excluded3);
  if (ownInputs) {
    inputs = [];
    var _iterator47 = record_createForOfIteratorHelper(ownInputs),
      _step47;
    try {
      for (_iterator47.s(); !(_step47 = _iterator47.n()).done;) {
        var input2 = _step47.value;
        var inputHydrated = record_objectSpread(record_objectSpread({}, input2), {}, {
          __proto__: Input$1.prototype
        });
        if (inputHydrated.map) {
          inputHydrated.map = record_objectSpread(record_objectSpread({}, inputHydrated.map), {}, {
            __proto__: PreviousMap22.prototype
          });
        }
        inputs.push(inputHydrated);
      }
    } catch (err) {
      _iterator47.e(err);
    } finally {
      _iterator47.f();
    }
  }
  if (defaults.nodes) {
    defaults.nodes = json.nodes.map(function (n2) {
      return fromJSON$1(n2, inputs);
    });
  }
  if (defaults.source) {
    var _defaults$source2 = defaults.source,
      inputId = _defaults$source2.inputId,
      source = record_objectWithoutProperties(_defaults$source2, _excluded4);
    defaults.source = source;
    if (inputId != null) {
      defaults.source.input = inputs[inputId];
    }
  }
  if (defaults.type === "root") {
    return new Root$1(defaults);
  } else if (defaults.type === "decl") {
    return new Declaration$1(defaults);
  } else if (defaults.type === "rule") {
    return new Rule$1(defaults);
  } else if (defaults.type === "comment") {
    return new Comment$1(defaults);
  } else if (defaults.type === "atrule") {
    return new AtRule$1(defaults);
  } else {
    throw new Error("Unknown node type: " + json.type);
  }
}
var fromJSON_1 = fromJSON$1;
fromJSON$1.default = fromJSON$1;
var CssSyntaxError22 = cssSyntaxError;
var Declaration22 = declaration;
var LazyResult22 = lazyResult;
var Container22 = container;
var Processor22 = processor;
var record_stringify = stringify_1;
var fromJSON = fromJSON_1;
var Document222 = document$1;
var Warning22 = warning;
var Comment22 = comment;
var AtRule22 = atRule;
var Result22 = result;
var Input22 = input;
var record_parse = parse_1;
var list = list_1;
var Rule22 = rule;
var Root22 = root;
var Node22 = node;
function postcss() {
  for (var _len16 = arguments.length, plugins = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
    plugins[_key16] = arguments[_key16];
  }
  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0];
  }
  return new Processor22(plugins);
}
postcss.plugin = function plugin2(name, initializer) {
  var warningPrinted = false;
  function creator() {
    if (console && console.warn && !warningPrinted) {
      warningPrinted = true;
      console.warn(name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration");
      if (process.env.LANG && process.env.LANG.startsWith("cn")) {
        console.warn(name + ": 里面 postcss.plugin 被弃用. 迁移指南:\nhttps://www.w3ctech.com/topic/2226");
      }
    }
    var transformer = initializer.apply(void 0, arguments);
    transformer.postcssPlugin = name;
    transformer.postcssVersion = new Processor22().version;
    return transformer;
  }
  var cache;
  Object.defineProperty(creator, "postcss", {
    get: function get() {
      if (!cache) cache = creator();
      return cache;
    }
  });
  creator.process = function (css, processOpts, pluginOpts) {
    return postcss([creator(pluginOpts)]).process(css, processOpts);
  };
  return creator;
};
postcss.stringify = record_stringify;
postcss.parse = record_parse;
postcss.fromJSON = fromJSON;
postcss.list = list;
postcss.comment = function (defaults) {
  return new Comment22(defaults);
};
postcss.atRule = function (defaults) {
  return new AtRule22(defaults);
};
postcss.decl = function (defaults) {
  return new Declaration22(defaults);
};
postcss.rule = function (defaults) {
  return new Rule22(defaults);
};
postcss.root = function (defaults) {
  return new Root22(defaults);
};
postcss.document = function (defaults) {
  return new Document222(defaults);
};
postcss.CssSyntaxError = CssSyntaxError22;
postcss.Declaration = Declaration22;
postcss.Container = Container22;
postcss.Processor = Processor22;
postcss.Document = Document222;
postcss.Comment = Comment22;
postcss.Warning = Warning22;
postcss.AtRule = AtRule22;
postcss.Result = Result22;
postcss.Input = Input22;
postcss.Rule = Rule22;
postcss.Root = Root22;
postcss.Node = Node22;
LazyResult22.registerPostcss(postcss);
var postcss_1 = postcss;
postcss.default = postcss;
var postcss$1 = /* @__PURE__ */getDefaultExportFromCjs(postcss_1);
postcss$1.stringify;
postcss$1.fromJSON;
postcss$1.plugin;
postcss$1.parse;
postcss$1.list;
postcss$1.document;
postcss$1.comment;
postcss$1.atRule;
postcss$1.rule;
postcss$1.decl;
postcss$1.root;
postcss$1.CssSyntaxError;
postcss$1.Declaration;
postcss$1.Container;
postcss$1.Processor;
postcss$1.Document;
postcss$1.Comment;
postcss$1.Warning;
postcss$1.AtRule;
postcss$1.Result;
postcss$1.Input;
postcss$1.Rule;
postcss$1.Root;
postcss$1.Node;
var BaseRRNode = /*#__PURE__*/function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  function BaseRRNode() {
    record_classCallCheck(this, BaseRRNode);
    __publicField2(this, "parentElement", null);
    __publicField2(this, "parentNode", null);
    __publicField2(this, "ownerDocument");
    __publicField2(this, "firstChild", null);
    __publicField2(this, "lastChild", null);
    __publicField2(this, "previousSibling", null);
    __publicField2(this, "nextSibling", null);
    __publicField2(this, "ELEMENT_NODE", 1);
    __publicField2(this, "TEXT_NODE", 3);
    __publicField2(this, "nodeType");
    __publicField2(this, "nodeName");
    __publicField2(this, "RRNodeType");
  }
  return record_createClass(BaseRRNode, [{
    key: "childNodes",
    get: function get() {
      var childNodes2 = [];
      var childIterator = this.firstChild;
      while (childIterator) {
        childNodes2.push(childIterator);
        childIterator = childIterator.nextSibling;
      }
      return childNodes2;
    }
  }, {
    key: "contains",
    value: function contains(node2) {
      if (!(node2 instanceof BaseRRNode)) return false;else if (node2.ownerDocument !== this.ownerDocument) return false;else if (node2 === this) return true;
      while (node2.parentNode) {
        if (node2.parentNode === this) return true;
        node2 = node2.parentNode;
      }
      return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }, {
    key: "appendChild",
    value: function appendChild(_newChild) {
      throw new Error("RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }, {
    key: "insertBefore",
    value: function insertBefore(_newChild, _refChild) {
      throw new Error("RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }, {
    key: "removeChild",
    value: function removeChild(_node) {
      throw new Error("RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method.");
    }
  }, {
    key: "toString",
    value: function toString() {
      return "RRNode";
    }
  }]);
}();
var testableAccessors = {
  Node: ["childNodes", "parentNode", "parentElement", "textContent"],
  ShadowRoot: ["host", "styleSheets"],
  Element: ["shadowRoot", "querySelector", "querySelectorAll"],
  MutationObserver: []
};
var testableMethods = {
  Node: ["contains", "getRootNode"],
  ShadowRoot: ["getSelection"],
  Element: [],
  MutationObserver: ["constructor"]
};
var untaintedBasePrototype = {};
var isAngularZonePresent = function isAngularZonePresent() {
  return !!globalThis.Zone;
};
function getUntaintedPrototype(key) {
  if (untaintedBasePrototype[key]) return untaintedBasePrototype[key];
  var defaultObj = globalThis[key];
  var defaultPrototype = defaultObj.prototype;
  var accessorNames = key in testableAccessors ? testableAccessors[key] : void 0;
  var isUntaintedAccessors = Boolean(accessorNames &&
  // @ts-expect-error 2345
  accessorNames.every(function (accessor) {
    var _a2, _b;
    return Boolean((_b = (_a2 = Object.getOwnPropertyDescriptor(defaultPrototype, accessor)) == null ? void 0 : _a2.get) == null ? void 0 : _b.toString().includes("[native code]"));
  }));
  var methodNames = key in testableMethods ? testableMethods[key] : void 0;
  var isUntaintedMethods = Boolean(methodNames && methodNames.every(
  // @ts-expect-error 2345
  function (method) {
    var _a2;
    return typeof defaultPrototype[method] === "function" && ((_a2 = defaultPrototype[method]) == null ? void 0 : _a2.toString().includes("[native code]"));
  }));
  if (isUntaintedAccessors && isUntaintedMethods && !isAngularZonePresent()) {
    untaintedBasePrototype[key] = defaultObj.prototype;
    return defaultObj.prototype;
  }
  try {
    var iframeEl = document.createElement("iframe");
    document.body.appendChild(iframeEl);
    var win = iframeEl.contentWindow;
    if (!win) return defaultObj.prototype;
    var untaintedObject = win[key].prototype;
    document.body.removeChild(iframeEl);
    if (!untaintedObject) return defaultPrototype;
    return untaintedBasePrototype[key] = untaintedObject;
  } catch (_unused2) {
    return defaultPrototype;
  }
}
var untaintedAccessorCache = {};
function getUntaintedAccessor(key, instance, accessor) {
  var _a2;
  var cacheKey = "".concat(key, ".").concat(String(accessor));
  if (untaintedAccessorCache[cacheKey]) return untaintedAccessorCache[cacheKey].call(instance);
  var untaintedPrototype = getUntaintedPrototype(key);
  var untaintedAccessor = (_a2 = Object.getOwnPropertyDescriptor(untaintedPrototype, accessor)) == null ? void 0 : _a2.get;
  if (!untaintedAccessor) return instance[accessor];
  untaintedAccessorCache[cacheKey] = untaintedAccessor;
  return untaintedAccessor.call(instance);
}
var untaintedMethodCache = {};
function getUntaintedMethod(key, instance, method) {
  var cacheKey = "".concat(key, ".").concat(String(method));
  if (untaintedMethodCache[cacheKey]) return untaintedMethodCache[cacheKey].bind(instance);
  var untaintedPrototype = getUntaintedPrototype(key);
  var untaintedMethod = untaintedPrototype[method];
  if (typeof untaintedMethod !== "function") return instance[method];
  untaintedMethodCache[cacheKey] = untaintedMethod;
  return untaintedMethod.bind(instance);
}
function childNodes(n2) {
  return getUntaintedAccessor("Node", n2, "childNodes");
}
function parentNode(n2) {
  return getUntaintedAccessor("Node", n2, "parentNode");
}
function parentElement(n2) {
  return getUntaintedAccessor("Node", n2, "parentElement");
}
function textContent(n2) {
  return getUntaintedAccessor("Node", n2, "textContent");
}
function contains(n2, other) {
  return getUntaintedMethod("Node", n2, "contains")(other);
}
function getRootNode(n2) {
  return getUntaintedMethod("Node", n2, "getRootNode")();
}
function host(n2) {
  if (!n2 || !("host" in n2)) return null;
  return getUntaintedAccessor("ShadowRoot", n2, "host");
}
function styleSheets(n2) {
  return n2.styleSheets;
}
function shadowRoot(n2) {
  if (!n2 || !("shadowRoot" in n2)) return null;
  return getUntaintedAccessor("Element", n2, "shadowRoot");
}
function querySelector(n2, selectors) {
  return getUntaintedAccessor("Element", n2, "querySelector")(selectors);
}
function querySelectorAll(n2, selectors) {
  return getUntaintedAccessor("Element", n2, "querySelectorAll")(selectors);
}
function mutationObserverCtor() {
  return getUntaintedPrototype("MutationObserver").constructor;
}
var index = {
  childNodes: childNodes,
  parentNode: parentNode,
  parentElement: parentElement,
  textContent: textContent,
  contains: contains,
  getRootNode: getRootNode,
  host: host,
  styleSheets: styleSheets,
  shadowRoot: shadowRoot,
  querySelector: querySelector,
  querySelectorAll: querySelectorAll,
  mutationObserver: mutationObserverCtor
};
function on(type, fn) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
  var options = {
    capture: true,
    passive: true
  };
  target.addEventListener(type, fn, options);
  return function () {
    return target.removeEventListener(type, fn, options);
  };
}
var DEPARTED_MIRROR_ACCESS_WARNING = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";
var _mirror = {
  map: {},
  getId: function getId() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    return -1;
  },
  getNode: function getNode() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    return null;
  },
  removeNodeFromMap: function removeNodeFromMap() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
  },
  has: function has() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    return false;
  },
  reset: function reset() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
  }
};
if (typeof window !== "undefined" && window.Proxy && window.Reflect) {
  _mirror = new Proxy(_mirror, {
    get: function get(target, prop, receiver) {
      if (prop === "map") {
        console.error(DEPARTED_MIRROR_ACCESS_WARNING);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function throttle(func, wait) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var timeout = null;
  var previous = 0;
  return function () {
    for (var _len17 = arguments.length, args = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
      args[_key17] = arguments[_key17];
    }
    var now = Date.now();
    if (!previous && options.leading === false) {
      previous = now;
    }
    var remaining = wait - (now - previous);
    var context = this;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}
function hookSetter(target, key, d, isRevoked) {
  var win = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : window;
  var original = win.Object.getOwnPropertyDescriptor(target, key);
  win.Object.defineProperty(target, key, isRevoked ? d : {
    set: function set(value) {
      var _this36 = this;
      setTimeout(function () {
        d.set.call(_this36, value);
      }, 0);
      if (original && original.set) {
        original.set.call(this, value);
      }
    }
  });
  return function () {
    return hookSetter(target, key, original || {}, true);
  };
}
function patch(source, name, replacement) {
  try {
    if (!(name in source)) {
      return function () {};
    }
    var original = source[name];
    var wrapped = replacement(original);
    if (typeof wrapped === "function") {
      wrapped.prototype = wrapped.prototype || {};
      Object.defineProperties(wrapped, {
        __rrweb_original__: {
          enumerable: false,
          value: original
        }
      });
    }
    source[name] = wrapped;
    return function () {
      source[name] = original;
    };
  } catch (_unused3) {
    return function () {};
  }
}
var nowTimestamp = Date.now;
if (! /* @__PURE__ *//[1-9][0-9]{12}/.test(Date.now().toString())) {
  nowTimestamp = function nowTimestamp() {
    return (/* @__PURE__ */new Date()).getTime();
  };
}
function getWindowScroll(win) {
  var _a2, _b, _c, _d;
  var doc = win.document;
  return {
    left: doc.scrollingElement ? doc.scrollingElement.scrollLeft : win.pageXOffset !== void 0 ? win.pageXOffset : doc.documentElement.scrollLeft || (doc == null ? void 0 : doc.body) && ((_a2 = index.parentElement(doc.body)) == null ? void 0 : _a2.scrollLeft) || ((_b = doc == null ? void 0 : doc.body) == null ? void 0 : _b.scrollLeft) || 0,
    top: doc.scrollingElement ? doc.scrollingElement.scrollTop : win.pageYOffset !== void 0 ? win.pageYOffset : (doc == null ? void 0 : doc.documentElement.scrollTop) || (doc == null ? void 0 : doc.body) && ((_c = index.parentElement(doc.body)) == null ? void 0 : _c.scrollTop) || ((_d = doc == null ? void 0 : doc.body) == null ? void 0 : _d.scrollTop) || 0
  };
}
function getWindowHeight() {
  return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight;
}
function getWindowWidth() {
  return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
}
function closestElementOfNode(node2) {
  if (!node2) {
    return null;
  }
  var el = node2.nodeType === node2.ELEMENT_NODE ? node2 : index.parentElement(node2);
  return el;
}
function isBlocked(node2, blockClass, blockSelector, checkAncestors) {
  if (!node2) {
    return false;
  }
  var el = closestElementOfNode(node2);
  if (!el) {
    return false;
  }
  try {
    if (typeof blockClass === "string") {
      if (el.classList.contains(blockClass)) return true;
      if (checkAncestors && el.closest("." + blockClass) !== null) return true;
    } else {
      if (classMatchesRegex(el, blockClass, checkAncestors)) return true;
    }
  } catch (e2) {}
  if (blockSelector) {
    if (el.matches(blockSelector)) return true;
    if (checkAncestors && el.closest(blockSelector) !== null) return true;
  }
  return false;
}
function isSerialized(n2, mirror2) {
  return mirror2.getId(n2) !== -1;
}
function isIgnored(n2, mirror2, slimDOMOptions) {
  if (n2.tagName === "TITLE" && slimDOMOptions.headTitleMutations) {
    return true;
  }
  return mirror2.getId(n2) === IGNORED_NODE;
}
function isAncestorRemoved(target, mirror2) {
  if (isShadowRoot(target)) {
    return false;
  }
  var id = mirror2.getId(target);
  if (!mirror2.has(id)) {
    return true;
  }
  var parent = index.parentNode(target);
  if (parent && parent.nodeType === target.DOCUMENT_NODE) {
    return false;
  }
  if (!parent) {
    return true;
  }
  return isAncestorRemoved(parent, mirror2);
}
function legacy_isTouchEvent(event) {
  return Boolean(event.changedTouches);
}
function polyfill$1() {
  var win = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  if ("NodeList" in win && !win.NodeList.prototype.forEach) {
    win.NodeList.prototype.forEach = Array.prototype.forEach;
  }
  if ("DOMTokenList" in win && !win.DOMTokenList.prototype.forEach) {
    win.DOMTokenList.prototype.forEach = Array.prototype.forEach;
  }
}
function isSerializedIframe(n2, mirror2) {
  return Boolean(n2.nodeName === "IFRAME" && mirror2.getMeta(n2));
}
function isSerializedStylesheet(n2, mirror2) {
  return Boolean(n2.nodeName === "LINK" && n2.nodeType === n2.ELEMENT_NODE && n2.getAttribute && n2.getAttribute("rel") === "stylesheet" && mirror2.getMeta(n2));
}
function hasShadowRoot(n2) {
  if (!n2) return false;
  if (n2 instanceof BaseRRNode && "shadowRoot" in n2) {
    return Boolean(n2.shadowRoot);
  }
  return Boolean(index.shadowRoot(n2));
}
var StyleSheetMirror = /*#__PURE__*/function () {
  function StyleSheetMirror() {
    record_classCallCheck(this, StyleSheetMirror);
    __publicField(this, "id", 1);
    __publicField(this, "styleIDMap", /* @__PURE__ */new WeakMap());
    __publicField(this, "idStyleMap", /* @__PURE__ */new Map());
  }
  return record_createClass(StyleSheetMirror, [{
    key: "getId",
    value: function getId(stylesheet) {
      var _this$styleIDMap$get;
      return (_this$styleIDMap$get = this.styleIDMap.get(stylesheet)) !== null && _this$styleIDMap$get !== void 0 ? _this$styleIDMap$get : -1;
    }
  }, {
    key: "has",
    value: function has(stylesheet) {
      return this.styleIDMap.has(stylesheet);
    }
    /**
     * @returns If the stylesheet is in the mirror, returns the id of the stylesheet. If not, return the new assigned id.
     */
  }, {
    key: "add",
    value: function add(stylesheet, id) {
      if (this.has(stylesheet)) return this.getId(stylesheet);
      var newId;
      if (id === void 0) {
        newId = this.id++;
      } else newId = id;
      this.styleIDMap.set(stylesheet, newId);
      this.idStyleMap.set(newId, stylesheet);
      return newId;
    }
  }, {
    key: "getStyle",
    value: function getStyle(id) {
      return this.idStyleMap.get(id) || null;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.styleIDMap = /* @__PURE__ */new WeakMap();
      this.idStyleMap = /* @__PURE__ */new Map();
      this.id = 1;
    }
  }, {
    key: "generateId",
    value: function generateId() {
      return this.id++;
    }
  }]);
}();
function getShadowHost(n2) {
  var _a2;
  var shadowHost = null;
  if ("getRootNode" in n2 && ((_a2 = index.getRootNode(n2)) == null ? void 0 : _a2.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && index.host(index.getRootNode(n2))) shadowHost = index.host(index.getRootNode(n2));
  return shadowHost;
}
function getRootShadowHost(n2) {
  var rootShadowHost = n2;
  var shadowHost;
  while (shadowHost = getShadowHost(rootShadowHost)) rootShadowHost = shadowHost;
  return rootShadowHost;
}
function shadowHostInDom(n2) {
  var doc = n2.ownerDocument;
  if (!doc) return false;
  var shadowHost = getRootShadowHost(n2);
  return index.contains(doc, shadowHost);
}
function inDom(n2) {
  var doc = n2.ownerDocument;
  if (!doc) return false;
  return index.contains(doc, n2) || shadowHostInDom(n2);
}
var EventType = /* @__PURE__ */function (EventType2) {
  EventType2[EventType2["DomContentLoaded"] = 0] = "DomContentLoaded";
  EventType2[EventType2["Load"] = 1] = "Load";
  EventType2[EventType2["FullSnapshot"] = 2] = "FullSnapshot";
  EventType2[EventType2["IncrementalSnapshot"] = 3] = "IncrementalSnapshot";
  EventType2[EventType2["Meta"] = 4] = "Meta";
  EventType2[EventType2["Custom"] = 5] = "Custom";
  EventType2[EventType2["Plugin"] = 6] = "Plugin";
  return EventType2;
}(EventType || {});
var IncrementalSource = /* @__PURE__ */function (IncrementalSource2) {
  IncrementalSource2[IncrementalSource2["Mutation"] = 0] = "Mutation";
  IncrementalSource2[IncrementalSource2["MouseMove"] = 1] = "MouseMove";
  IncrementalSource2[IncrementalSource2["MouseInteraction"] = 2] = "MouseInteraction";
  IncrementalSource2[IncrementalSource2["Scroll"] = 3] = "Scroll";
  IncrementalSource2[IncrementalSource2["ViewportResize"] = 4] = "ViewportResize";
  IncrementalSource2[IncrementalSource2["Input"] = 5] = "Input";
  IncrementalSource2[IncrementalSource2["TouchMove"] = 6] = "TouchMove";
  IncrementalSource2[IncrementalSource2["MediaInteraction"] = 7] = "MediaInteraction";
  IncrementalSource2[IncrementalSource2["StyleSheetRule"] = 8] = "StyleSheetRule";
  IncrementalSource2[IncrementalSource2["CanvasMutation"] = 9] = "CanvasMutation";
  IncrementalSource2[IncrementalSource2["Font"] = 10] = "Font";
  IncrementalSource2[IncrementalSource2["Log"] = 11] = "Log";
  IncrementalSource2[IncrementalSource2["Drag"] = 12] = "Drag";
  IncrementalSource2[IncrementalSource2["StyleDeclaration"] = 13] = "StyleDeclaration";
  IncrementalSource2[IncrementalSource2["Selection"] = 14] = "Selection";
  IncrementalSource2[IncrementalSource2["AdoptedStyleSheet"] = 15] = "AdoptedStyleSheet";
  IncrementalSource2[IncrementalSource2["CustomElement"] = 16] = "CustomElement";
  return IncrementalSource2;
}(IncrementalSource || {});
var MouseInteractions = /* @__PURE__ */function (MouseInteractions2) {
  MouseInteractions2[MouseInteractions2["MouseUp"] = 0] = "MouseUp";
  MouseInteractions2[MouseInteractions2["MouseDown"] = 1] = "MouseDown";
  MouseInteractions2[MouseInteractions2["Click"] = 2] = "Click";
  MouseInteractions2[MouseInteractions2["ContextMenu"] = 3] = "ContextMenu";
  MouseInteractions2[MouseInteractions2["DblClick"] = 4] = "DblClick";
  MouseInteractions2[MouseInteractions2["Focus"] = 5] = "Focus";
  MouseInteractions2[MouseInteractions2["Blur"] = 6] = "Blur";
  MouseInteractions2[MouseInteractions2["TouchStart"] = 7] = "TouchStart";
  MouseInteractions2[MouseInteractions2["TouchMove_Departed"] = 8] = "TouchMove_Departed";
  MouseInteractions2[MouseInteractions2["TouchEnd"] = 9] = "TouchEnd";
  MouseInteractions2[MouseInteractions2["TouchCancel"] = 10] = "TouchCancel";
  return MouseInteractions2;
}(MouseInteractions || {});
var PointerTypes = /* @__PURE__ */function (PointerTypes2) {
  PointerTypes2[PointerTypes2["Mouse"] = 0] = "Mouse";
  PointerTypes2[PointerTypes2["Pen"] = 1] = "Pen";
  PointerTypes2[PointerTypes2["Touch"] = 2] = "Touch";
  return PointerTypes2;
}(PointerTypes || {});
var CanvasContext = /* @__PURE__ */function (CanvasContext2) {
  CanvasContext2[CanvasContext2["2D"] = 0] = "2D";
  CanvasContext2[CanvasContext2["WebGL"] = 1] = "WebGL";
  CanvasContext2[CanvasContext2["WebGL2"] = 2] = "WebGL2";
  return CanvasContext2;
}(CanvasContext || {});
var MediaInteractions = /* @__PURE__ */function (MediaInteractions2) {
  MediaInteractions2[MediaInteractions2["Play"] = 0] = "Play";
  MediaInteractions2[MediaInteractions2["Pause"] = 1] = "Pause";
  MediaInteractions2[MediaInteractions2["Seeked"] = 2] = "Seeked";
  MediaInteractions2[MediaInteractions2["VolumeChange"] = 3] = "VolumeChange";
  MediaInteractions2[MediaInteractions2["RateChange"] = 4] = "RateChange";
  return MediaInteractions2;
}(MediaInteractions || {});
var NodeType = /* @__PURE__ */function (NodeType2) {
  NodeType2[NodeType2["Document"] = 0] = "Document";
  NodeType2[NodeType2["DocumentType"] = 1] = "DocumentType";
  NodeType2[NodeType2["Element"] = 2] = "Element";
  NodeType2[NodeType2["Text"] = 3] = "Text";
  NodeType2[NodeType2["CDATA"] = 4] = "CDATA";
  NodeType2[NodeType2["Comment"] = 5] = "Comment";
  return NodeType2;
}(NodeType || {});
function isNodeInLinkedList(n2) {
  return "__ln" in n2;
}
var DoubleLinkedList = /*#__PURE__*/function () {
  function DoubleLinkedList() {
    record_classCallCheck(this, DoubleLinkedList);
    __publicField(this, "length", 0);
    __publicField(this, "head", null);
    __publicField(this, "tail", null);
  }
  return record_createClass(DoubleLinkedList, [{
    key: "get",
    value: function get(position) {
      if (position >= this.length) {
        throw new Error("Position outside of list range");
      }
      var current = this.head;
      for (var index2 = 0; index2 < position; index2++) {
        current = (current == null ? void 0 : current.next) || null;
      }
      return current;
    }
  }, {
    key: "addNode",
    value: function addNode(n2) {
      var node2 = {
        value: n2,
        previous: null,
        next: null
      };
      n2.__ln = node2;
      if (n2.previousSibling && isNodeInLinkedList(n2.previousSibling)) {
        var current = n2.previousSibling.__ln.next;
        node2.next = current;
        node2.previous = n2.previousSibling.__ln;
        n2.previousSibling.__ln.next = node2;
        if (current) {
          current.previous = node2;
        }
      } else if (n2.nextSibling && isNodeInLinkedList(n2.nextSibling) && n2.nextSibling.__ln.previous) {
        var _current = n2.nextSibling.__ln.previous;
        node2.previous = _current;
        node2.next = n2.nextSibling.__ln;
        n2.nextSibling.__ln.previous = node2;
        if (_current) {
          _current.next = node2;
        }
      } else {
        if (this.head) {
          this.head.previous = node2;
        }
        node2.next = this.head;
        this.head = node2;
      }
      if (node2.next === null) {
        this.tail = node2;
      }
      this.length++;
    }
  }, {
    key: "removeNode",
    value: function removeNode(n2) {
      var current = n2.__ln;
      if (!this.head) {
        return;
      }
      if (!current.previous) {
        this.head = current.next;
        if (this.head) {
          this.head.previous = null;
        } else {
          this.tail = null;
        }
      } else {
        current.previous.next = current.next;
        if (current.next) {
          current.next.previous = current.previous;
        } else {
          this.tail = current.previous;
        }
      }
      if (n2.__ln) {
        delete n2.__ln;
      }
      this.length--;
    }
  }]);
}();
var moveKey = function moveKey(id, parentId) {
  return "".concat(id, "@").concat(parentId);
};
var MutationBuffer = /*#__PURE__*/function () {
  function MutationBuffer() {
    var _this37 = this;
    record_classCallCheck(this, MutationBuffer);
    __publicField(this, "frozen", false);
    __publicField(this, "locked", false);
    __publicField(this, "texts", []);
    __publicField(this, "attributes", []);
    __publicField(this, "attributeMap", /* @__PURE__ */new WeakMap());
    __publicField(this, "removes", []);
    __publicField(this, "mapRemoves", []);
    __publicField(this, "movedMap", {});
    __publicField(this, "addedSet", /* @__PURE__ */new Set());
    __publicField(this, "movedSet", /* @__PURE__ */new Set());
    __publicField(this, "droppedSet", /* @__PURE__ */new Set());
    __publicField(this, "removesSubTreeCache", /* @__PURE__ */new Set());
    __publicField(this, "mutationCb");
    __publicField(this, "blockClass");
    __publicField(this, "blockSelector");
    __publicField(this, "maskTextClass");
    __publicField(this, "maskTextSelector");
    __publicField(this, "inlineStylesheet");
    __publicField(this, "maskInputOptions");
    __publicField(this, "maskTextFn");
    __publicField(this, "maskInputFn");
    __publicField(this, "keepIframeSrcFn");
    __publicField(this, "recordCanvas");
    __publicField(this, "inlineImages");
    __publicField(this, "slimDOMOptions");
    __publicField(this, "dataURLOptions");
    __publicField(this, "doc");
    __publicField(this, "mirror");
    __publicField(this, "iframeManager");
    __publicField(this, "stylesheetManager");
    __publicField(this, "shadowDomManager");
    __publicField(this, "canvasManager");
    __publicField(this, "processedNodeManager");
    __publicField(this, "unattachedDoc");
    __publicField(this, "processMutations", function (mutations) {
      mutations.forEach(_this37.processMutation);
      _this37.emit();
    });
    __publicField(this, "emit", function () {
      if (_this37.frozen || _this37.locked) {
        return;
      }
      var adds = [];
      var addedIds = /* @__PURE__ */new Set();
      var addList = new DoubleLinkedList();
      var getNextId = function getNextId(n2) {
        var ns = n2;
        var nextId = IGNORED_NODE;
        while (nextId === IGNORED_NODE) {
          ns = ns && ns.nextSibling;
          nextId = ns && _this37.mirror.getId(ns);
        }
        return nextId;
      };
      var pushAdd = function pushAdd(n2) {
        var parent = index.parentNode(n2);
        if (!parent || !inDom(n2)) {
          return;
        }
        var cssCaptured = false;
        if (n2.nodeType === Node.TEXT_NODE) {
          var parentTag = parent.tagName;
          if (parentTag === "TEXTAREA") {
            return;
          } else if (parentTag === "STYLE" && _this37.addedSet.has(parent)) {
            cssCaptured = true;
          }
        }
        var parentId = isShadowRoot(parent) ? _this37.mirror.getId(getShadowHost(n2)) : _this37.mirror.getId(parent);
        var nextId = getNextId(n2);
        if (parentId === -1 || nextId === -1) {
          return addList.addNode(n2);
        }
        var sn = serializeNodeWithId(n2, {
          doc: _this37.doc,
          mirror: _this37.mirror,
          blockClass: _this37.blockClass,
          blockSelector: _this37.blockSelector,
          maskTextClass: _this37.maskTextClass,
          maskTextSelector: _this37.maskTextSelector,
          skipChild: true,
          newlyAddedElement: true,
          inlineStylesheet: _this37.inlineStylesheet,
          maskInputOptions: _this37.maskInputOptions,
          maskTextFn: _this37.maskTextFn,
          maskInputFn: _this37.maskInputFn,
          slimDOMOptions: _this37.slimDOMOptions,
          dataURLOptions: _this37.dataURLOptions,
          recordCanvas: _this37.recordCanvas,
          inlineImages: _this37.inlineImages,
          onSerialize: function onSerialize(currentN) {
            if (isSerializedIframe(currentN, _this37.mirror)) {
              _this37.iframeManager.addIframe(currentN);
            }
            if (isSerializedStylesheet(currentN, _this37.mirror)) {
              _this37.stylesheetManager.trackLinkElement(currentN);
            }
            if (hasShadowRoot(n2)) {
              _this37.shadowDomManager.addShadowRoot(index.shadowRoot(n2), _this37.doc);
            }
          },
          onIframeLoad: function onIframeLoad(iframe, childSn) {
            _this37.iframeManager.attachIframe(iframe, childSn);
            _this37.shadowDomManager.observeAttachShadow(iframe);
          },
          onStylesheetLoad: function onStylesheetLoad(link, childSn) {
            _this37.stylesheetManager.attachLinkElement(link, childSn);
          },
          cssCaptured: cssCaptured
        });
        if (sn) {
          adds.push({
            parentId: parentId,
            nextId: nextId,
            node: sn
          });
          addedIds.add(sn.id);
        }
      };
      while (_this37.mapRemoves.length) {
        _this37.mirror.removeNodeFromMap(_this37.mapRemoves.shift());
      }
      var _iterator48 = record_createForOfIteratorHelper(_this37.movedSet),
        _step48;
      try {
        for (_iterator48.s(); !(_step48 = _iterator48.n()).done;) {
          var n2 = _step48.value;
          if (isParentRemoved(_this37.removesSubTreeCache, n2, _this37.mirror) && !_this37.movedSet.has(index.parentNode(n2))) {
            continue;
          }
          pushAdd(n2);
        }
      } catch (err) {
        _iterator48.e(err);
      } finally {
        _iterator48.f();
      }
      var _iterator49 = record_createForOfIteratorHelper(_this37.addedSet),
        _step49;
      try {
        for (_iterator49.s(); !(_step49 = _iterator49.n()).done;) {
          var _n = _step49.value;
          if (!isAncestorInSet(_this37.droppedSet, _n) && !isParentRemoved(_this37.removesSubTreeCache, _n, _this37.mirror)) {
            pushAdd(_n);
          } else if (isAncestorInSet(_this37.movedSet, _n)) {
            pushAdd(_n);
          } else {
            _this37.droppedSet.add(_n);
          }
        }
      } catch (err) {
        _iterator49.e(err);
      } finally {
        _iterator49.f();
      }
      var candidate = null;
      while (addList.length) {
        var node2 = null;
        if (candidate) {
          var parentId = _this37.mirror.getId(index.parentNode(candidate.value));
          var nextId = getNextId(candidate.value);
          if (parentId !== -1 && nextId !== -1) {
            node2 = candidate;
          }
        }
        if (!node2) {
          var tailNode = addList.tail;
          while (tailNode) {
            var _node = tailNode;
            tailNode = tailNode.previous;
            if (_node) {
              var _parentId = _this37.mirror.getId(index.parentNode(_node.value));
              var _nextId = getNextId(_node.value);
              if (_nextId === -1) continue;else if (_parentId !== -1) {
                node2 = _node;
                break;
              } else {
                var unhandledNode = _node.value;
                var parent = index.parentNode(unhandledNode);
                if (parent && parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                  var shadowHost = index.host(parent);
                  var parentId2 = _this37.mirror.getId(shadowHost);
                  if (parentId2 !== -1) {
                    node2 = _node;
                    break;
                  }
                }
              }
            }
          }
        }
        if (!node2) {
          while (addList.head) {
            addList.removeNode(addList.head.value);
          }
          break;
        }
        candidate = node2.previous;
        addList.removeNode(node2.value);
        pushAdd(node2.value);
      }
      var payload = {
        texts: _this37.texts.map(function (text) {
          var n2 = text.node;
          var parent = index.parentNode(n2);
          if (parent && parent.tagName === "TEXTAREA") {
            _this37.genTextAreaValueMutation(parent);
          }
          return {
            id: _this37.mirror.getId(n2),
            value: text.value
          };
        }).filter(function (text) {
          return !addedIds.has(text.id);
        }).filter(function (text) {
          return _this37.mirror.has(text.id);
        }),
        attributes: _this37.attributes.map(function (attribute) {
          var attributes = attribute.attributes;
          if (typeof attributes.style === "string") {
            var diffAsStr = JSON.stringify(attribute.styleDiff);
            var unchangedAsStr = JSON.stringify(attribute._unchangedStyles);
            if (diffAsStr.length < attributes.style.length) {
              if ((diffAsStr + unchangedAsStr).split("var(").length === attributes.style.split("var(").length) {
                attributes.style = attribute.styleDiff;
              }
            }
          }
          return {
            id: _this37.mirror.getId(attribute.node),
            attributes: attributes
          };
        }).filter(function (attribute) {
          return !addedIds.has(attribute.id);
        }).filter(function (attribute) {
          return _this37.mirror.has(attribute.id);
        }),
        removes: _this37.removes,
        adds: adds
      };
      if (!payload.texts.length && !payload.attributes.length && !payload.removes.length && !payload.adds.length) {
        return;
      }
      _this37.texts = [];
      _this37.attributes = [];
      _this37.attributeMap = /* @__PURE__ */new WeakMap();
      _this37.removes = [];
      _this37.addedSet = /* @__PURE__ */new Set();
      _this37.movedSet = /* @__PURE__ */new Set();
      _this37.droppedSet = /* @__PURE__ */new Set();
      _this37.removesSubTreeCache = /* @__PURE__ */new Set();
      _this37.movedMap = {};
      _this37.mutationCb(payload);
    });
    __publicField(this, "genTextAreaValueMutation", function (textarea) {
      var item = _this37.attributeMap.get(textarea);
      if (!item) {
        item = {
          node: textarea,
          attributes: {},
          styleDiff: {},
          _unchangedStyles: {}
        };
        _this37.attributes.push(item);
        _this37.attributeMap.set(textarea, item);
      }
      item.attributes.value = Array.from(index.childNodes(textarea), function (cn) {
        return index.textContent(cn) || "";
      }).join("");
    });
    __publicField(this, "processMutation", function (m) {
      if (isIgnored(m.target, _this37.mirror, _this37.slimDOMOptions)) {
        return;
      }
      switch (m.type) {
        case "characterData":
          {
            var value = index.textContent(m.target);
            if (!isBlocked(m.target, _this37.blockClass, _this37.blockSelector, false) && value !== m.oldValue) {
              _this37.texts.push({
                value: needMaskingText(m.target, _this37.maskTextClass, _this37.maskTextSelector, true
                // checkAncestors
                ) && value ? _this37.maskTextFn ? _this37.maskTextFn(value, closestElementOfNode(m.target)) : value.replace(/[\S]/g, "*") : value,
                node: m.target
              });
            }
            break;
          }
        case "attributes":
          {
            var target = m.target;
            var attributeName = m.attributeName;
            var _value2 = m.target.getAttribute(attributeName);
            if (attributeName === "value") {
              var type = getInputType(target);
              _value2 = maskInputValue({
                element: target,
                maskInputOptions: _this37.maskInputOptions,
                tagName: target.tagName,
                type: type,
                value: _value2,
                maskInputFn: _this37.maskInputFn
              });
            }
            if (isBlocked(m.target, _this37.blockClass, _this37.blockSelector, false) || _value2 === m.oldValue) {
              return;
            }
            var item = _this37.attributeMap.get(m.target);
            if (target.tagName === "IFRAME" && attributeName === "src" && !_this37.keepIframeSrcFn(_value2)) {
              if (!target.contentDocument) {
                attributeName = "rr_src";
              } else {
                return;
              }
            }
            if (!item) {
              item = {
                node: m.target,
                attributes: {},
                styleDiff: {},
                _unchangedStyles: {}
              };
              _this37.attributes.push(item);
              _this37.attributeMap.set(m.target, item);
            }
            if (attributeName === "type" && target.tagName === "INPUT" && (m.oldValue || "").toLowerCase() === "password") {
              target.setAttribute("data-rr-is-password", "true");
            }
            if (!ignoreAttribute(target.tagName, attributeName)) {
              item.attributes[attributeName] = transformAttribute(_this37.doc, toLowerCase(target.tagName), toLowerCase(attributeName), _value2);
              if (attributeName === "style") {
                if (!_this37.unattachedDoc) {
                  try {
                    _this37.unattachedDoc = document.implementation.createHTMLDocument();
                  } catch (e2) {
                    _this37.unattachedDoc = _this37.doc;
                  }
                }
                var old = _this37.unattachedDoc.createElement("span");
                if (m.oldValue) {
                  old.setAttribute("style", m.oldValue);
                }
                for (var _i11 = 0, _Array$from3 = Array.from(target.style); _i11 < _Array$from3.length; _i11++) {
                  var pname = _Array$from3[_i11];
                  var newValue = target.style.getPropertyValue(pname);
                  var newPriority = target.style.getPropertyPriority(pname);
                  if (newValue !== old.style.getPropertyValue(pname) || newPriority !== old.style.getPropertyPriority(pname)) {
                    if (newPriority === "") {
                      item.styleDiff[pname] = newValue;
                    } else {
                      item.styleDiff[pname] = [newValue, newPriority];
                    }
                  } else {
                    item._unchangedStyles[pname] = [newValue, newPriority];
                  }
                }
                for (var _i12 = 0, _Array$from4 = Array.from(old.style); _i12 < _Array$from4.length; _i12++) {
                  var _pname = _Array$from4[_i12];
                  if (target.style.getPropertyValue(_pname) === "") {
                    item.styleDiff[_pname] = false;
                  }
                }
              } else if (attributeName === "open" && target.tagName === "DIALOG") {
                if (target.matches("dialog:modal")) {
                  item.attributes["rr_open_mode"] = "modal";
                } else {
                  item.attributes["rr_open_mode"] = "non-modal";
                }
              }
            }
            break;
          }
        case "childList":
          {
            if (isBlocked(m.target, _this37.blockClass, _this37.blockSelector, true)) return;
            if (m.target.tagName === "TEXTAREA") {
              _this37.genTextAreaValueMutation(m.target);
              return;
            }
            m.addedNodes.forEach(function (n2) {
              return _this37.genAdds(n2, m.target);
            });
            m.removedNodes.forEach(function (n2) {
              var nodeId = _this37.mirror.getId(n2);
              var parentId = isShadowRoot(m.target) ? _this37.mirror.getId(index.host(m.target)) : _this37.mirror.getId(m.target);
              if (isBlocked(m.target, _this37.blockClass, _this37.blockSelector, false) || isIgnored(n2, _this37.mirror, _this37.slimDOMOptions) || !isSerialized(n2, _this37.mirror)) {
                return;
              }
              if (_this37.addedSet.has(n2)) {
                deepDelete(_this37.addedSet, n2);
                _this37.droppedSet.add(n2);
              } else if (_this37.addedSet.has(m.target) && nodeId === -1) ;else if (isAncestorRemoved(m.target, _this37.mirror)) ;else if (_this37.movedSet.has(n2) && _this37.movedMap[moveKey(nodeId, parentId)]) {
                deepDelete(_this37.movedSet, n2);
              } else {
                _this37.removes.push({
                  parentId: parentId,
                  id: nodeId,
                  isShadow: isShadowRoot(m.target) && isNativeShadowDom(m.target) ? true : void 0
                });
                processRemoves(n2, _this37.removesSubTreeCache);
              }
              _this37.mapRemoves.push(n2);
            });
            break;
          }
      }
    });
    __publicField(this, "genAdds", function (n2, target) {
      if (_this37.processedNodeManager.inOtherBuffer(n2, _this37)) return;
      if (_this37.addedSet.has(n2) || _this37.movedSet.has(n2)) return;
      if (_this37.mirror.hasNode(n2)) {
        if (isIgnored(n2, _this37.mirror, _this37.slimDOMOptions)) {
          return;
        }
        _this37.movedSet.add(n2);
        var targetId = null;
        if (target && _this37.mirror.hasNode(target)) {
          targetId = _this37.mirror.getId(target);
        }
        if (targetId && targetId !== -1) {
          _this37.movedMap[moveKey(_this37.mirror.getId(n2), targetId)] = true;
        }
      } else {
        _this37.addedSet.add(n2);
        _this37.droppedSet.delete(n2);
      }
      if (!isBlocked(n2, _this37.blockClass, _this37.blockSelector, false)) {
        index.childNodes(n2).forEach(function (childN) {
          return _this37.genAdds(childN);
        });
        if (hasShadowRoot(n2)) {
          index.childNodes(index.shadowRoot(n2)).forEach(function (childN) {
            _this37.processedNodeManager.add(childN, _this37);
            _this37.genAdds(childN, n2);
          });
        }
      }
    });
  }
  return record_createClass(MutationBuffer, [{
    key: "init",
    value: function init(options) {
      var _this38 = this;
      ["mutationCb", "blockClass", "blockSelector", "maskTextClass", "maskTextSelector", "inlineStylesheet", "maskInputOptions", "maskTextFn", "maskInputFn", "keepIframeSrcFn", "recordCanvas", "inlineImages", "slimDOMOptions", "dataURLOptions", "doc", "mirror", "iframeManager", "stylesheetManager", "shadowDomManager", "canvasManager", "processedNodeManager"].forEach(function (key) {
        _this38[key] = options[key];
      });
    }
  }, {
    key: "freeze",
    value: function freeze() {
      this.frozen = true;
      this.canvasManager.freeze();
    }
  }, {
    key: "unfreeze",
    value: function unfreeze() {
      this.frozen = false;
      this.canvasManager.unfreeze();
      this.emit();
    }
  }, {
    key: "isFrozen",
    value: function isFrozen() {
      return this.frozen;
    }
  }, {
    key: "lock",
    value: function lock() {
      this.locked = true;
      this.canvasManager.lock();
    }
  }, {
    key: "unlock",
    value: function unlock() {
      this.locked = false;
      this.canvasManager.unlock();
      this.emit();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.shadowDomManager.reset();
      this.canvasManager.reset();
    }
  }]);
}();
function deepDelete(addsSet, n2) {
  addsSet.delete(n2);
  index.childNodes(n2).forEach(function (childN) {
    return deepDelete(addsSet, childN);
  });
}
function processRemoves(n2, cache) {
  var queue = [n2];
  while (queue.length) {
    var next = queue.pop();
    if (cache.has(next)) continue;
    cache.add(next);
    index.childNodes(next).forEach(function (n22) {
      return queue.push(n22);
    });
  }
  return;
}
function isParentRemoved(removes, n2, mirror2) {
  if (removes.size === 0) return false;
  return _isParentRemoved(removes, n2);
}
function _isParentRemoved(removes, n2, _mirror2) {
  var node2 = index.parentNode(n2);
  if (!node2) return false;
  return removes.has(node2);
}
function isAncestorInSet(set, n2) {
  if (set.size === 0) return false;
  return _isAncestorInSet(set, n2);
}
function _isAncestorInSet(set, n2) {
  var parent = index.parentNode(n2);
  if (!parent) {
    return false;
  }
  if (set.has(parent)) {
    return true;
  }
  return _isAncestorInSet(set, parent);
}
var errorHandler;
function registerErrorHandler(handler) {
  errorHandler = handler;
}
function unregisterErrorHandler() {
  errorHandler = void 0;
}
var callbackWrapper = function callbackWrapper(cb) {
  if (!errorHandler) {
    return cb;
  }
  var rrwebWrapped = function rrwebWrapped() {
    try {
      return cb.apply(void 0, arguments);
    } catch (error) {
      if (errorHandler && errorHandler(error) === true) {
        return;
      }
      throw error;
    }
  };
  return rrwebWrapped;
};
var mutationBuffers = [];
function getEventTarget(event) {
  try {
    if ("composedPath" in event) {
      var path = event.composedPath();
      if (path.length) {
        return path[0];
      }
    } else if ("path" in event && event.path.length) {
      return event.path[0];
    }
  } catch (_unused4) {}
  return event && event.target;
}
function initMutationObserver(options, rootEl) {
  var mutationBuffer = new MutationBuffer();
  mutationBuffers.push(mutationBuffer);
  mutationBuffer.init(options);
  var observer = new (mutationObserverCtor())(callbackWrapper(mutationBuffer.processMutations.bind(mutationBuffer)));
  observer.observe(rootEl, {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true
  });
  return observer;
}
function initMoveObserver(_ref4) {
  var mousemoveCb = _ref4.mousemoveCb,
    sampling = _ref4.sampling,
    doc = _ref4.doc,
    mirror2 = _ref4.mirror;
  if (sampling.mousemove === false) {
    return function () {};
  }
  var threshold = typeof sampling.mousemove === "number" ? sampling.mousemove : 50;
  var callbackThreshold = typeof sampling.mousemoveCallback === "number" ? sampling.mousemoveCallback : 500;
  var positions = [];
  var timeBaseline;
  var wrappedCb = throttle(callbackWrapper(function (source) {
    var totalOffset = Date.now() - timeBaseline;
    mousemoveCb(positions.map(function (p) {
      p.timeOffset -= totalOffset;
      return p;
    }), source);
    positions = [];
    timeBaseline = null;
  }), callbackThreshold);
  var updatePosition = callbackWrapper(throttle(callbackWrapper(function (evt) {
    var target = getEventTarget(evt);
    var _ref5 = legacy_isTouchEvent(evt) ? evt.changedTouches[0] : evt,
      clientX = _ref5.clientX,
      clientY = _ref5.clientY;
    if (!timeBaseline) {
      timeBaseline = nowTimestamp();
    }
    positions.push({
      x: clientX,
      y: clientY,
      id: mirror2.getId(target),
      timeOffset: nowTimestamp() - timeBaseline
    });
    wrappedCb(typeof DragEvent !== "undefined" && evt instanceof DragEvent ? IncrementalSource.Drag : evt instanceof MouseEvent ? IncrementalSource.MouseMove : IncrementalSource.TouchMove);
  }), threshold, {
    trailing: false
  }));
  var handlers = [on("mousemove", updatePosition, doc), on("touchmove", updatePosition, doc), on("drag", updatePosition, doc)];
  return callbackWrapper(function () {
    handlers.forEach(function (h) {
      return h();
    });
  });
}
function initMouseInteractionObserver(_ref6) {
  var mouseInteractionCb = _ref6.mouseInteractionCb,
    doc = _ref6.doc,
    mirror2 = _ref6.mirror,
    blockClass = _ref6.blockClass,
    blockSelector = _ref6.blockSelector,
    sampling = _ref6.sampling;
  if (sampling.mouseInteraction === false) {
    return function () {};
  }
  var disableMap = sampling.mouseInteraction === true || sampling.mouseInteraction === void 0 ? {} : sampling.mouseInteraction;
  var handlers = [];
  var currentPointerType = null;
  var getHandler = function getHandler(eventKey) {
    return function (event) {
      var target = getEventTarget(event);
      if (isBlocked(target, blockClass, blockSelector, true)) {
        return;
      }
      var pointerType = null;
      var thisEventKey = eventKey;
      if ("pointerType" in event) {
        switch (event.pointerType) {
          case "mouse":
            pointerType = PointerTypes.Mouse;
            break;
          case "touch":
            pointerType = PointerTypes.Touch;
            break;
          case "pen":
            pointerType = PointerTypes.Pen;
            break;
        }
        if (pointerType === PointerTypes.Touch) {
          if (MouseInteractions[eventKey] === MouseInteractions.MouseDown) {
            thisEventKey = "TouchStart";
          } else if (MouseInteractions[eventKey] === MouseInteractions.MouseUp) {
            thisEventKey = "TouchEnd";
          }
        } else if (pointerType === PointerTypes.Pen) ;
      } else if (legacy_isTouchEvent(event)) {
        pointerType = PointerTypes.Touch;
      }
      if (pointerType !== null) {
        currentPointerType = pointerType;
        if (thisEventKey.startsWith("Touch") && pointerType === PointerTypes.Touch || thisEventKey.startsWith("Mouse") && pointerType === PointerTypes.Mouse) {
          pointerType = null;
        }
      } else if (MouseInteractions[eventKey] === MouseInteractions.Click) {
        pointerType = currentPointerType;
        currentPointerType = null;
      }
      var e2 = legacy_isTouchEvent(event) ? event.changedTouches[0] : event;
      if (!e2) {
        return;
      }
      var id = mirror2.getId(target);
      var clientX = e2.clientX,
        clientY = e2.clientY;
      callbackWrapper(mouseInteractionCb)(record_objectSpread({
        type: MouseInteractions[thisEventKey],
        id: id,
        x: clientX,
        y: clientY
      }, pointerType !== null && {
        pointerType: pointerType
      }));
    };
  };
  Object.keys(MouseInteractions).filter(function (key) {
    return Number.isNaN(Number(key)) && !key.endsWith("_Departed") && disableMap[key] !== false;
  }).forEach(function (eventKey) {
    var eventName = toLowerCase(eventKey);
    var handler = getHandler(eventKey);
    if (window.PointerEvent) {
      switch (MouseInteractions[eventKey]) {
        case MouseInteractions.MouseDown:
        case MouseInteractions.MouseUp:
          eventName = eventName.replace("mouse", "pointer");
          break;
        case MouseInteractions.TouchStart:
        case MouseInteractions.TouchEnd:
          return;
      }
    }
    handlers.push(on(eventName, handler, doc));
  });
  return callbackWrapper(function () {
    handlers.forEach(function (h) {
      return h();
    });
  });
}
function initScrollObserver(_ref7) {
  var scrollCb = _ref7.scrollCb,
    doc = _ref7.doc,
    mirror2 = _ref7.mirror,
    blockClass = _ref7.blockClass,
    blockSelector = _ref7.blockSelector,
    sampling = _ref7.sampling;
  var updatePosition = callbackWrapper(throttle(callbackWrapper(function (evt) {
    var target = getEventTarget(evt);
    if (!target || isBlocked(target, blockClass, blockSelector, true)) {
      return;
    }
    var id = mirror2.getId(target);
    if (target === doc && doc.defaultView) {
      var scrollLeftTop = getWindowScroll(doc.defaultView);
      scrollCb({
        id: id,
        x: scrollLeftTop.left,
        y: scrollLeftTop.top
      });
    } else {
      scrollCb({
        id: id,
        x: target.scrollLeft,
        y: target.scrollTop
      });
    }
  }), sampling.scroll || 100));
  return on("scroll", updatePosition, doc);
}
function initViewportResizeObserver(_ref8, _ref9) {
  var viewportResizeCb = _ref8.viewportResizeCb;
  var win = _ref9.win;
  var lastH = -1;
  var lastW = -1;
  var updateDimension = callbackWrapper(throttle(callbackWrapper(function () {
    var height = getWindowHeight();
    var width = getWindowWidth();
    if (lastH !== height || lastW !== width) {
      viewportResizeCb({
        width: Number(width),
        height: Number(height)
      });
      lastH = height;
      lastW = width;
    }
  }), 200));
  return on("resize", updateDimension, win);
}
var INPUT_TAGS = ["INPUT", "TEXTAREA", "SELECT"];
var lastInputValueMap = /* @__PURE__ */new WeakMap();
function initInputObserver(_ref10) {
  var inputCb = _ref10.inputCb,
    doc = _ref10.doc,
    mirror2 = _ref10.mirror,
    blockClass = _ref10.blockClass,
    blockSelector = _ref10.blockSelector,
    ignoreClass = _ref10.ignoreClass,
    ignoreSelector = _ref10.ignoreSelector,
    maskInputOptions = _ref10.maskInputOptions,
    maskInputFn = _ref10.maskInputFn,
    sampling = _ref10.sampling,
    userTriggeredOnInput = _ref10.userTriggeredOnInput;
  function eventHandler(event) {
    var target = getEventTarget(event);
    var userTriggered = event.isTrusted;
    var tagName = target && target.tagName;
    if (target && tagName === "OPTION") {
      target = index.parentElement(target);
    }
    if (!target || !tagName || INPUT_TAGS.indexOf(tagName) < 0 || isBlocked(target, blockClass, blockSelector, true)) {
      return;
    }
    if (target.classList.contains(ignoreClass) || ignoreSelector && target.matches(ignoreSelector)) {
      return;
    }
    var text = target.value;
    var isChecked = false;
    var type = getInputType(target) || "";
    if (type === "radio" || type === "checkbox") {
      isChecked = target.checked;
    } else if (maskInputOptions[tagName.toLowerCase()] || maskInputOptions[type]) {
      text = maskInputValue({
        element: target,
        maskInputOptions: maskInputOptions,
        tagName: tagName,
        type: type,
        value: text,
        maskInputFn: maskInputFn
      });
    }
    cbWithDedup(target, userTriggeredOnInput ? {
      text: text,
      isChecked: isChecked,
      userTriggered: userTriggered
    } : {
      text: text,
      isChecked: isChecked
    });
    var name = target.name;
    if (type === "radio" && name && isChecked) {
      doc.querySelectorAll("input[type=\"radio\"][name=\"".concat(name, "\"]")).forEach(function (el) {
        if (el !== target) {
          var text2 = el.value;
          cbWithDedup(el, userTriggeredOnInput ? {
            text: text2,
            isChecked: !isChecked,
            userTriggered: false
          } : {
            text: text2,
            isChecked: !isChecked
          });
        }
      });
    }
  }
  function cbWithDedup(target, v2) {
    var lastInputValue = lastInputValueMap.get(target);
    if (!lastInputValue || lastInputValue.text !== v2.text || lastInputValue.isChecked !== v2.isChecked) {
      lastInputValueMap.set(target, v2);
      var id = mirror2.getId(target);
      callbackWrapper(inputCb)(record_objectSpread(record_objectSpread({}, v2), {}, {
        id: id
      }));
    }
  }
  var events = sampling.input === "last" ? ["change"] : ["input", "change"];
  var handlers = events.map(function (eventName) {
    return on(eventName, callbackWrapper(eventHandler), doc);
  });
  var currentWindow = doc.defaultView;
  if (!currentWindow) {
    return function () {
      handlers.forEach(function (h) {
        return h();
      });
    };
  }
  var propertyDescriptor = currentWindow.Object.getOwnPropertyDescriptor(currentWindow.HTMLInputElement.prototype, "value");
  var hookProperties = [[currentWindow.HTMLInputElement.prototype, "value"], [currentWindow.HTMLInputElement.prototype, "checked"], [currentWindow.HTMLSelectElement.prototype, "value"], [currentWindow.HTMLTextAreaElement.prototype, "value"],
  // Some UI library use selectedIndex to set select value
  [currentWindow.HTMLSelectElement.prototype, "selectedIndex"], [currentWindow.HTMLOptionElement.prototype, "selected"]];
  if (propertyDescriptor && propertyDescriptor.set) {
    handlers.push.apply(handlers, record_toConsumableArray(hookProperties.map(function (p) {
      return hookSetter(p[0], p[1], {
        set: function set() {
          callbackWrapper(eventHandler)({
            target: this,
            isTrusted: false
            // userTriggered to false as this could well be programmatic
          });
        }
      }, false, currentWindow);
    })));
  }
  return callbackWrapper(function () {
    handlers.forEach(function (h) {
      return h();
    });
  });
}
function getNestedCSSRulePositions(rule2) {
  var positions = [];
  function recurse(childRule, pos) {
    if (hasNestedCSSRule("CSSGroupingRule") && childRule.parentRule instanceof CSSGroupingRule || hasNestedCSSRule("CSSMediaRule") && childRule.parentRule instanceof CSSMediaRule || hasNestedCSSRule("CSSSupportsRule") && childRule.parentRule instanceof CSSSupportsRule || hasNestedCSSRule("CSSConditionRule") && childRule.parentRule instanceof CSSConditionRule) {
      var rules2 = Array.from(childRule.parentRule.cssRules);
      var index2 = rules2.indexOf(childRule);
      pos.unshift(index2);
    } else if (childRule.parentStyleSheet) {
      var _rules = Array.from(childRule.parentStyleSheet.cssRules);
      var _index = _rules.indexOf(childRule);
      pos.unshift(_index);
    }
    return pos;
  }
  return recurse(rule2, positions);
}
function getIdAndStyleId(sheet, mirror2, styleMirror) {
  var id, styleId;
  if (!sheet) return {};
  if (sheet.ownerNode) id = mirror2.getId(sheet.ownerNode);else styleId = styleMirror.getId(sheet);
  return {
    styleId: styleId,
    id: id
  };
}
function initStyleSheetObserver(_ref11, _ref12) {
  var styleSheetRuleCb = _ref11.styleSheetRuleCb,
    mirror2 = _ref11.mirror,
    stylesheetManager = _ref11.stylesheetManager;
  var win = _ref12.win;
  if (!win.CSSStyleSheet || !win.CSSStyleSheet.prototype) {
    return function () {};
  }
  var insertRule = win.CSSStyleSheet.prototype.insertRule;
  win.CSSStyleSheet.prototype.insertRule = new Proxy(insertRule, {
    apply: callbackWrapper(function (target, thisArg, argumentsList) {
      var _argumentsList = record_slicedToArray(argumentsList, 2),
        rule2 = _argumentsList[0],
        index2 = _argumentsList[1];
      var _getIdAndStyleId = getIdAndStyleId(thisArg, mirror2, stylesheetManager.styleMirror),
        id = _getIdAndStyleId.id,
        styleId = _getIdAndStyleId.styleId;
      if (id && id !== -1 || styleId && styleId !== -1) {
        styleSheetRuleCb({
          id: id,
          styleId: styleId,
          adds: [{
            rule: rule2,
            index: index2
          }]
        });
      }
      return target.apply(thisArg, argumentsList);
    })
  });
  win.CSSStyleSheet.prototype.addRule = function (selector, styleBlock) {
    var index2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.cssRules.length;
    var rule2 = "".concat(selector, " { ").concat(styleBlock, " }");
    return win.CSSStyleSheet.prototype.insertRule.apply(this, [rule2, index2]);
  };
  var deleteRule = win.CSSStyleSheet.prototype.deleteRule;
  win.CSSStyleSheet.prototype.deleteRule = new Proxy(deleteRule, {
    apply: callbackWrapper(function (target, thisArg, argumentsList) {
      var _argumentsList2 = record_slicedToArray(argumentsList, 1),
        index2 = _argumentsList2[0];
      var _getIdAndStyleId2 = getIdAndStyleId(thisArg, mirror2, stylesheetManager.styleMirror),
        id = _getIdAndStyleId2.id,
        styleId = _getIdAndStyleId2.styleId;
      if (id && id !== -1 || styleId && styleId !== -1) {
        styleSheetRuleCb({
          id: id,
          styleId: styleId,
          removes: [{
            index: index2
          }]
        });
      }
      return target.apply(thisArg, argumentsList);
    })
  });
  win.CSSStyleSheet.prototype.removeRule = function (index2) {
    return win.CSSStyleSheet.prototype.deleteRule.apply(this, [index2]);
  };
  var replace;
  if (win.CSSStyleSheet.prototype.replace) {
    replace = win.CSSStyleSheet.prototype.replace;
    win.CSSStyleSheet.prototype.replace = new Proxy(replace, {
      apply: callbackWrapper(function (target, thisArg, argumentsList) {
        var _argumentsList3 = record_slicedToArray(argumentsList, 1),
          text = _argumentsList3[0];
        var _getIdAndStyleId3 = getIdAndStyleId(thisArg, mirror2, stylesheetManager.styleMirror),
          id = _getIdAndStyleId3.id,
          styleId = _getIdAndStyleId3.styleId;
        if (id && id !== -1 || styleId && styleId !== -1) {
          styleSheetRuleCb({
            id: id,
            styleId: styleId,
            replace: text
          });
        }
        return target.apply(thisArg, argumentsList);
      })
    });
  }
  var replaceSync;
  if (win.CSSStyleSheet.prototype.replaceSync) {
    replaceSync = win.CSSStyleSheet.prototype.replaceSync;
    win.CSSStyleSheet.prototype.replaceSync = new Proxy(replaceSync, {
      apply: callbackWrapper(function (target, thisArg, argumentsList) {
        var _argumentsList4 = record_slicedToArray(argumentsList, 1),
          text = _argumentsList4[0];
        var _getIdAndStyleId4 = getIdAndStyleId(thisArg, mirror2, stylesheetManager.styleMirror),
          id = _getIdAndStyleId4.id,
          styleId = _getIdAndStyleId4.styleId;
        if (id && id !== -1 || styleId && styleId !== -1) {
          styleSheetRuleCb({
            id: id,
            styleId: styleId,
            replaceSync: text
          });
        }
        return target.apply(thisArg, argumentsList);
      })
    });
  }
  var supportedNestedCSSRuleTypes = {};
  if (canMonkeyPatchNestedCSSRule("CSSGroupingRule")) {
    supportedNestedCSSRuleTypes.CSSGroupingRule = win.CSSGroupingRule;
  } else {
    if (canMonkeyPatchNestedCSSRule("CSSMediaRule")) {
      supportedNestedCSSRuleTypes.CSSMediaRule = win.CSSMediaRule;
    }
    if (canMonkeyPatchNestedCSSRule("CSSConditionRule")) {
      supportedNestedCSSRuleTypes.CSSConditionRule = win.CSSConditionRule;
    }
    if (canMonkeyPatchNestedCSSRule("CSSSupportsRule")) {
      supportedNestedCSSRuleTypes.CSSSupportsRule = win.CSSSupportsRule;
    }
  }
  var unmodifiedFunctions = {};
  Object.entries(supportedNestedCSSRuleTypes).forEach(function (_ref13) {
    var _ref14 = record_slicedToArray(_ref13, 2),
      typeKey = _ref14[0],
      type = _ref14[1];
    unmodifiedFunctions[typeKey] = {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      insertRule: type.prototype.insertRule,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deleteRule: type.prototype.deleteRule
    };
    type.prototype.insertRule = new Proxy(unmodifiedFunctions[typeKey].insertRule, {
      apply: callbackWrapper(function (target, thisArg, argumentsList) {
        var _argumentsList5 = record_slicedToArray(argumentsList, 2),
          rule2 = _argumentsList5[0],
          index2 = _argumentsList5[1];
        var _getIdAndStyleId5 = getIdAndStyleId(thisArg.parentStyleSheet, mirror2, stylesheetManager.styleMirror),
          id = _getIdAndStyleId5.id,
          styleId = _getIdAndStyleId5.styleId;
        if (id && id !== -1 || styleId && styleId !== -1) {
          styleSheetRuleCb({
            id: id,
            styleId: styleId,
            adds: [{
              rule: rule2,
              index: [].concat(record_toConsumableArray(getNestedCSSRulePositions(thisArg)), [index2 || 0
              // defaults to 0
              ])
            }]
          });
        }
        return target.apply(thisArg, argumentsList);
      })
    });
    type.prototype.deleteRule = new Proxy(unmodifiedFunctions[typeKey].deleteRule, {
      apply: callbackWrapper(function (target, thisArg, argumentsList) {
        var _argumentsList6 = record_slicedToArray(argumentsList, 1),
          index2 = _argumentsList6[0];
        var _getIdAndStyleId6 = getIdAndStyleId(thisArg.parentStyleSheet, mirror2, stylesheetManager.styleMirror),
          id = _getIdAndStyleId6.id,
          styleId = _getIdAndStyleId6.styleId;
        if (id && id !== -1 || styleId && styleId !== -1) {
          styleSheetRuleCb({
            id: id,
            styleId: styleId,
            removes: [{
              index: [].concat(record_toConsumableArray(getNestedCSSRulePositions(thisArg)), [index2])
            }]
          });
        }
        return target.apply(thisArg, argumentsList);
      })
    });
  });
  return callbackWrapper(function () {
    win.CSSStyleSheet.prototype.insertRule = insertRule;
    win.CSSStyleSheet.prototype.deleteRule = deleteRule;
    replace && (win.CSSStyleSheet.prototype.replace = replace);
    replaceSync && (win.CSSStyleSheet.prototype.replaceSync = replaceSync);
    Object.entries(supportedNestedCSSRuleTypes).forEach(function (_ref15) {
      var _ref16 = record_slicedToArray(_ref15, 2),
        typeKey = _ref16[0],
        type = _ref16[1];
      type.prototype.insertRule = unmodifiedFunctions[typeKey].insertRule;
      type.prototype.deleteRule = unmodifiedFunctions[typeKey].deleteRule;
    });
  });
}
function initAdoptedStyleSheetObserver(_ref17, host2) {
  var mirror2 = _ref17.mirror,
    stylesheetManager = _ref17.stylesheetManager;
  var _a2, _b, _c;
  var hostId = null;
  if (host2.nodeName === "#document") hostId = mirror2.getId(host2);else hostId = mirror2.getId(index.host(host2));
  var patchTarget = host2.nodeName === "#document" ? (_a2 = host2.defaultView) == null ? void 0 : _a2.Document : (_c = (_b = host2.ownerDocument) == null ? void 0 : _b.defaultView) == null ? void 0 : _c.ShadowRoot;
  var originalPropertyDescriptor = (patchTarget == null ? void 0 : patchTarget.prototype) ? Object.getOwnPropertyDescriptor(patchTarget == null ? void 0 : patchTarget.prototype, "adoptedStyleSheets") : void 0;
  if (hostId === null || hostId === -1 || !patchTarget || !originalPropertyDescriptor) return function () {};
  Object.defineProperty(host2, "adoptedStyleSheets", {
    configurable: originalPropertyDescriptor.configurable,
    enumerable: originalPropertyDescriptor.enumerable,
    get: function get() {
      var _a3;
      return (_a3 = originalPropertyDescriptor.get) == null ? void 0 : _a3.call(this);
    },
    set: function set(sheets) {
      var _a3;
      var result2 = (_a3 = originalPropertyDescriptor.set) == null ? void 0 : _a3.call(this, sheets);
      if (hostId !== null && hostId !== -1) {
        try {
          stylesheetManager.adoptStyleSheets(sheets, hostId);
        } catch (e2) {}
      }
      return result2;
    }
  });
  return callbackWrapper(function () {
    Object.defineProperty(host2, "adoptedStyleSheets", {
      configurable: originalPropertyDescriptor.configurable,
      enumerable: originalPropertyDescriptor.enumerable,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      get: originalPropertyDescriptor.get,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      set: originalPropertyDescriptor.set
    });
  });
}
function initStyleDeclarationObserver(_ref18, _ref19) {
  var styleDeclarationCb = _ref18.styleDeclarationCb,
    mirror2 = _ref18.mirror,
    ignoreCSSAttributes = _ref18.ignoreCSSAttributes,
    stylesheetManager = _ref18.stylesheetManager;
  var win = _ref19.win;
  var setProperty = win.CSSStyleDeclaration.prototype.setProperty;
  win.CSSStyleDeclaration.prototype.setProperty = new Proxy(setProperty, {
    apply: callbackWrapper(function (target, thisArg, argumentsList) {
      var _a2;
      var _argumentsList7 = record_slicedToArray(argumentsList, 3),
        property = _argumentsList7[0],
        value = _argumentsList7[1],
        priority = _argumentsList7[2];
      if (ignoreCSSAttributes.has(property)) {
        return setProperty.apply(thisArg, [property, value, priority]);
      }
      var _getIdAndStyleId7 = getIdAndStyleId((_a2 = thisArg.parentRule) == null ? void 0 : _a2.parentStyleSheet, mirror2, stylesheetManager.styleMirror),
        id = _getIdAndStyleId7.id,
        styleId = _getIdAndStyleId7.styleId;
      if (id && id !== -1 || styleId && styleId !== -1) {
        styleDeclarationCb({
          id: id,
          styleId: styleId,
          set: {
            property: property,
            value: value,
            priority: priority
          },
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          index: getNestedCSSRulePositions(thisArg.parentRule)
        });
      }
      return target.apply(thisArg, argumentsList);
    })
  });
  var removeProperty = win.CSSStyleDeclaration.prototype.removeProperty;
  win.CSSStyleDeclaration.prototype.removeProperty = new Proxy(removeProperty, {
    apply: callbackWrapper(function (target, thisArg, argumentsList) {
      var _a2;
      var _argumentsList8 = record_slicedToArray(argumentsList, 1),
        property = _argumentsList8[0];
      if (ignoreCSSAttributes.has(property)) {
        return removeProperty.apply(thisArg, [property]);
      }
      var _getIdAndStyleId8 = getIdAndStyleId((_a2 = thisArg.parentRule) == null ? void 0 : _a2.parentStyleSheet, mirror2, stylesheetManager.styleMirror),
        id = _getIdAndStyleId8.id,
        styleId = _getIdAndStyleId8.styleId;
      if (id && id !== -1 || styleId && styleId !== -1) {
        styleDeclarationCb({
          id: id,
          styleId: styleId,
          remove: {
            property: property
          },
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          index: getNestedCSSRulePositions(thisArg.parentRule)
        });
      }
      return target.apply(thisArg, argumentsList);
    })
  });
  return callbackWrapper(function () {
    win.CSSStyleDeclaration.prototype.setProperty = setProperty;
    win.CSSStyleDeclaration.prototype.removeProperty = removeProperty;
  });
}
function initMediaInteractionObserver(_ref20) {
  var mediaInteractionCb = _ref20.mediaInteractionCb,
    blockClass = _ref20.blockClass,
    blockSelector = _ref20.blockSelector,
    mirror2 = _ref20.mirror,
    sampling = _ref20.sampling,
    doc = _ref20.doc;
  var handler = callbackWrapper(function (type) {
    return throttle(callbackWrapper(function (event) {
      var target = getEventTarget(event);
      if (!target || isBlocked(target, blockClass, blockSelector, true)) {
        return;
      }
      var currentTime = target.currentTime,
        volume = target.volume,
        muted = target.muted,
        playbackRate = target.playbackRate,
        loop = target.loop;
      mediaInteractionCb({
        type: type,
        id: mirror2.getId(target),
        currentTime: currentTime,
        volume: volume,
        muted: muted,
        playbackRate: playbackRate,
        loop: loop
      });
    }), sampling.media || 500);
  });
  var handlers = [on("play", handler(MediaInteractions.Play), doc), on("pause", handler(MediaInteractions.Pause), doc), on("seeked", handler(MediaInteractions.Seeked), doc), on("volumechange", handler(MediaInteractions.VolumeChange), doc), on("ratechange", handler(MediaInteractions.RateChange), doc)];
  return callbackWrapper(function () {
    handlers.forEach(function (h) {
      return h();
    });
  });
}
function initFontObserver(_ref21) {
  var fontCb = _ref21.fontCb,
    doc = _ref21.doc;
  var win = doc.defaultView;
  if (!win) {
    return function () {};
  }
  var handlers = [];
  var fontMap = /* @__PURE__ */new WeakMap();
  var originalFontFace = win.FontFace;
  win.FontFace = function FontFace2(family, source, descriptors) {
    var fontFace = new originalFontFace(family, source, descriptors);
    fontMap.set(fontFace, {
      family: family,
      buffer: typeof source !== "string",
      descriptors: descriptors,
      fontSource: typeof source === "string" ? source : JSON.stringify(Array.from(new Uint8Array(source)))
    });
    return fontFace;
  };
  var restoreHandler = patch(doc.fonts, "add", function (original) {
    return function (fontFace) {
      setTimeout(callbackWrapper(function () {
        var p = fontMap.get(fontFace);
        if (p) {
          fontCb(p);
          fontMap.delete(fontFace);
        }
      }), 0);
      return original.apply(this, [fontFace]);
    };
  });
  handlers.push(function () {
    win.FontFace = originalFontFace;
  });
  handlers.push(restoreHandler);
  return callbackWrapper(function () {
    handlers.forEach(function (h) {
      return h();
    });
  });
}
function initSelectionObserver(param) {
  var doc = param.doc,
    mirror2 = param.mirror,
    blockClass = param.blockClass,
    blockSelector = param.blockSelector,
    selectionCb = param.selectionCb;
  var collapsed = true;
  var updateSelection = callbackWrapper(function () {
    var selection = doc.getSelection();
    if (!selection || collapsed && (selection == null ? void 0 : selection.isCollapsed)) return;
    collapsed = selection.isCollapsed || false;
    var ranges = [];
    var count = selection.rangeCount || 0;
    for (var i2 = 0; i2 < count; i2++) {
      var range = selection.getRangeAt(i2);
      var startContainer = range.startContainer,
        startOffset = range.startOffset,
        endContainer = range.endContainer,
        endOffset = range.endOffset;
      var blocked = isBlocked(startContainer, blockClass, blockSelector, true) || isBlocked(endContainer, blockClass, blockSelector, true);
      if (blocked) continue;
      ranges.push({
        start: mirror2.getId(startContainer),
        startOffset: startOffset,
        end: mirror2.getId(endContainer),
        endOffset: endOffset
      });
    }
    selectionCb({
      ranges: ranges
    });
  });
  updateSelection();
  return on("selectionchange", updateSelection);
}
function initCustomElementObserver(_ref22) {
  var doc = _ref22.doc,
    customElementCb = _ref22.customElementCb;
  var win = doc.defaultView;
  if (!win || !win.customElements) return function () {};
  var restoreHandler = patch(win.customElements, "define", function (original) {
    return function (name, constructor, options) {
      try {
        customElementCb({
          define: {
            name: name
          }
        });
      } catch (e2) {
        console.warn("Custom element callback failed for ".concat(name));
      }
      return original.apply(this, [name, constructor, options]);
    };
  });
  return restoreHandler;
}
function mergeHooks(o2, hooks) {
  var mutationCb = o2.mutationCb,
    mousemoveCb = o2.mousemoveCb,
    mouseInteractionCb = o2.mouseInteractionCb,
    scrollCb = o2.scrollCb,
    viewportResizeCb = o2.viewportResizeCb,
    inputCb = o2.inputCb,
    mediaInteractionCb = o2.mediaInteractionCb,
    styleSheetRuleCb = o2.styleSheetRuleCb,
    styleDeclarationCb = o2.styleDeclarationCb,
    canvasMutationCb = o2.canvasMutationCb,
    fontCb = o2.fontCb,
    selectionCb = o2.selectionCb,
    customElementCb = o2.customElementCb;
  o2.mutationCb = function () {
    if (hooks.mutation) {
      hooks.mutation.apply(hooks, arguments);
    }
    mutationCb.apply(void 0, arguments);
  };
  o2.mousemoveCb = function () {
    if (hooks.mousemove) {
      hooks.mousemove.apply(hooks, arguments);
    }
    mousemoveCb.apply(void 0, arguments);
  };
  o2.mouseInteractionCb = function () {
    if (hooks.mouseInteraction) {
      hooks.mouseInteraction.apply(hooks, arguments);
    }
    mouseInteractionCb.apply(void 0, arguments);
  };
  o2.scrollCb = function () {
    if (hooks.scroll) {
      hooks.scroll.apply(hooks, arguments);
    }
    scrollCb.apply(void 0, arguments);
  };
  o2.viewportResizeCb = function () {
    if (hooks.viewportResize) {
      hooks.viewportResize.apply(hooks, arguments);
    }
    viewportResizeCb.apply(void 0, arguments);
  };
  o2.inputCb = function () {
    if (hooks.input) {
      hooks.input.apply(hooks, arguments);
    }
    inputCb.apply(void 0, arguments);
  };
  o2.mediaInteractionCb = function () {
    if (hooks.mediaInteaction) {
      hooks.mediaInteaction.apply(hooks, arguments);
    }
    mediaInteractionCb.apply(void 0, arguments);
  };
  o2.styleSheetRuleCb = function () {
    if (hooks.styleSheetRule) {
      hooks.styleSheetRule.apply(hooks, arguments);
    }
    styleSheetRuleCb.apply(void 0, arguments);
  };
  o2.styleDeclarationCb = function () {
    if (hooks.styleDeclaration) {
      hooks.styleDeclaration.apply(hooks, arguments);
    }
    styleDeclarationCb.apply(void 0, arguments);
  };
  o2.canvasMutationCb = function () {
    if (hooks.canvasMutation) {
      hooks.canvasMutation.apply(hooks, arguments);
    }
    canvasMutationCb.apply(void 0, arguments);
  };
  o2.fontCb = function () {
    if (hooks.font) {
      hooks.font.apply(hooks, arguments);
    }
    fontCb.apply(void 0, arguments);
  };
  o2.selectionCb = function () {
    if (hooks.selection) {
      hooks.selection.apply(hooks, arguments);
    }
    selectionCb.apply(void 0, arguments);
  };
  o2.customElementCb = function () {
    if (hooks.customElement) {
      hooks.customElement.apply(hooks, arguments);
    }
    customElementCb.apply(void 0, arguments);
  };
}
function initObservers(o2) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var currentWindow = o2.doc.defaultView;
  if (!currentWindow) {
    return function () {};
  }
  mergeHooks(o2, hooks);
  var mutationObserver;
  if (o2.recordDOM) {
    mutationObserver = initMutationObserver(o2, o2.doc);
  }
  var mousemoveHandler = initMoveObserver(o2);
  var mouseInteractionHandler = initMouseInteractionObserver(o2);
  var scrollHandler = initScrollObserver(o2);
  var viewportResizeHandler = initViewportResizeObserver(o2, {
    win: currentWindow
  });
  var inputHandler = initInputObserver(o2);
  var mediaInteractionHandler = initMediaInteractionObserver(o2);
  var styleSheetObserver = function styleSheetObserver() {};
  var adoptedStyleSheetObserver = function adoptedStyleSheetObserver() {};
  var styleDeclarationObserver = function styleDeclarationObserver() {};
  var fontObserver = function fontObserver() {};
  if (o2.recordDOM) {
    styleSheetObserver = initStyleSheetObserver(o2, {
      win: currentWindow
    });
    adoptedStyleSheetObserver = initAdoptedStyleSheetObserver(o2, o2.doc);
    styleDeclarationObserver = initStyleDeclarationObserver(o2, {
      win: currentWindow
    });
    if (o2.collectFonts) {
      fontObserver = initFontObserver(o2);
    }
  }
  var selectionObserver = initSelectionObserver(o2);
  var customElementObserver = initCustomElementObserver(o2);
  var pluginHandlers = [];
  var _iterator50 = record_createForOfIteratorHelper(o2.plugins),
    _step50;
  try {
    for (_iterator50.s(); !(_step50 = _iterator50.n()).done;) {
      var plugin3 = _step50.value;
      pluginHandlers.push(plugin3.observer(plugin3.callback, currentWindow, plugin3.options));
    }
  } catch (err) {
    _iterator50.e(err);
  } finally {
    _iterator50.f();
  }
  return callbackWrapper(function () {
    mutationBuffers.forEach(function (b) {
      return b.reset();
    });
    mutationObserver == null ? void 0 : mutationObserver.disconnect();
    mousemoveHandler();
    mouseInteractionHandler();
    scrollHandler();
    viewportResizeHandler();
    inputHandler();
    mediaInteractionHandler();
    styleSheetObserver();
    adoptedStyleSheetObserver();
    styleDeclarationObserver();
    fontObserver();
    selectionObserver();
    customElementObserver();
    pluginHandlers.forEach(function (h) {
      return h();
    });
  });
}
function hasNestedCSSRule(prop) {
  return typeof window[prop] !== "undefined";
}
function canMonkeyPatchNestedCSSRule(prop) {
  return Boolean(typeof window[prop] !== "undefined" &&
  // Note: Generally, this check _shouldn't_ be necessary
  // However, in some scenarios (e.g. jsdom) this can sometimes fail, so we check for it here
  window[prop].prototype && "insertRule" in window[prop].prototype && "deleteRule" in window[prop].prototype);
}
var CrossOriginIframeMirror = /*#__PURE__*/function () {
  function CrossOriginIframeMirror(generateIdFn) {
    record_classCallCheck(this, CrossOriginIframeMirror);
    __publicField(this, "iframeIdToRemoteIdMap", /* @__PURE__ */new WeakMap());
    __publicField(this, "iframeRemoteIdToIdMap", /* @__PURE__ */new WeakMap());
    this.generateIdFn = generateIdFn;
  }
  return record_createClass(CrossOriginIframeMirror, [{
    key: "getId",
    value: function getId(iframe, remoteId, idToRemoteMap, remoteToIdMap) {
      var idToRemoteIdMap = idToRemoteMap || this.getIdToRemoteIdMap(iframe);
      var remoteIdToIdMap = remoteToIdMap || this.getRemoteIdToIdMap(iframe);
      var id = idToRemoteIdMap.get(remoteId);
      if (!id) {
        id = this.generateIdFn();
        idToRemoteIdMap.set(remoteId, id);
        remoteIdToIdMap.set(id, remoteId);
      }
      return id;
    }
  }, {
    key: "getIds",
    value: function getIds(iframe, remoteId) {
      var _this39 = this;
      var idToRemoteIdMap = this.getIdToRemoteIdMap(iframe);
      var remoteIdToIdMap = this.getRemoteIdToIdMap(iframe);
      return remoteId.map(function (id) {
        return _this39.getId(iframe, id, idToRemoteIdMap, remoteIdToIdMap);
      });
    }
  }, {
    key: "getRemoteId",
    value: function getRemoteId(iframe, id, map) {
      var remoteIdToIdMap = map || this.getRemoteIdToIdMap(iframe);
      if (typeof id !== "number") return id;
      var remoteId = remoteIdToIdMap.get(id);
      if (!remoteId) return -1;
      return remoteId;
    }
  }, {
    key: "getRemoteIds",
    value: function getRemoteIds(iframe, ids) {
      var _this40 = this;
      var remoteIdToIdMap = this.getRemoteIdToIdMap(iframe);
      return ids.map(function (id) {
        return _this40.getRemoteId(iframe, id, remoteIdToIdMap);
      });
    }
  }, {
    key: "reset",
    value: function reset(iframe) {
      if (!iframe) {
        this.iframeIdToRemoteIdMap = /* @__PURE__ */new WeakMap();
        this.iframeRemoteIdToIdMap = /* @__PURE__ */new WeakMap();
        return;
      }
      this.iframeIdToRemoteIdMap.delete(iframe);
      this.iframeRemoteIdToIdMap.delete(iframe);
    }
  }, {
    key: "getIdToRemoteIdMap",
    value: function getIdToRemoteIdMap(iframe) {
      var idToRemoteIdMap = this.iframeIdToRemoteIdMap.get(iframe);
      if (!idToRemoteIdMap) {
        idToRemoteIdMap = /* @__PURE__ */new Map();
        this.iframeIdToRemoteIdMap.set(iframe, idToRemoteIdMap);
      }
      return idToRemoteIdMap;
    }
  }, {
    key: "getRemoteIdToIdMap",
    value: function getRemoteIdToIdMap(iframe) {
      var remoteIdToIdMap = this.iframeRemoteIdToIdMap.get(iframe);
      if (!remoteIdToIdMap) {
        remoteIdToIdMap = /* @__PURE__ */new Map();
        this.iframeRemoteIdToIdMap.set(iframe, remoteIdToIdMap);
      }
      return remoteIdToIdMap;
    }
  }]);
}();
var IframeManager = /*#__PURE__*/function () {
  function IframeManager(options) {
    record_classCallCheck(this, IframeManager);
    __publicField(this, "iframes", /* @__PURE__ */new WeakMap());
    __publicField(this, "crossOriginIframeMap", /* @__PURE__ */new WeakMap());
    __publicField(this, "crossOriginIframeMirror", new CrossOriginIframeMirror(genId));
    __publicField(this, "crossOriginIframeStyleMirror");
    __publicField(this, "crossOriginIframeRootIdMap", /* @__PURE__ */new WeakMap());
    __publicField(this, "mirror");
    __publicField(this, "mutationCb");
    __publicField(this, "wrappedEmit");
    __publicField(this, "loadListener");
    __publicField(this, "stylesheetManager");
    __publicField(this, "recordCrossOriginIframes");
    this.mutationCb = options.mutationCb;
    this.wrappedEmit = options.wrappedEmit;
    this.stylesheetManager = options.stylesheetManager;
    this.recordCrossOriginIframes = options.recordCrossOriginIframes;
    this.crossOriginIframeStyleMirror = new CrossOriginIframeMirror(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror));
    this.mirror = options.mirror;
    if (this.recordCrossOriginIframes) {
      window.addEventListener("message", this.handleMessage.bind(this));
    }
  }
  return record_createClass(IframeManager, [{
    key: "addIframe",
    value: function addIframe(iframeEl) {
      this.iframes.set(iframeEl, true);
      if (iframeEl.contentWindow) this.crossOriginIframeMap.set(iframeEl.contentWindow, iframeEl);
    }
  }, {
    key: "addLoadListener",
    value: function addLoadListener(cb) {
      this.loadListener = cb;
    }
  }, {
    key: "attachIframe",
    value: function attachIframe(iframeEl, childSn) {
      var _a2, _b;
      this.mutationCb({
        adds: [{
          parentId: this.mirror.getId(iframeEl),
          nextId: null,
          node: childSn
        }],
        removes: [],
        texts: [],
        attributes: [],
        isAttachIframe: true
      });
      if (this.recordCrossOriginIframes) (_a2 = iframeEl.contentWindow) == null ? void 0 : _a2.addEventListener("message", this.handleMessage.bind(this));
      (_b = this.loadListener) == null ? void 0 : _b.call(this, iframeEl);
      if (iframeEl.contentDocument && iframeEl.contentDocument.adoptedStyleSheets && iframeEl.contentDocument.adoptedStyleSheets.length > 0) this.stylesheetManager.adoptStyleSheets(iframeEl.contentDocument.adoptedStyleSheets, this.mirror.getId(iframeEl.contentDocument));
    }
  }, {
    key: "handleMessage",
    value: function handleMessage(message) {
      var crossOriginMessageEvent = message;
      if (crossOriginMessageEvent.data.type !== "rrweb" ||
      // To filter out the rrweb messages which are forwarded by some sites.
      crossOriginMessageEvent.origin !== crossOriginMessageEvent.data.origin) return;
      var iframeSourceWindow = message.source;
      if (!iframeSourceWindow) return;
      var iframeEl = this.crossOriginIframeMap.get(message.source);
      if (!iframeEl) return;
      var transformedEvent = this.transformCrossOriginEvent(iframeEl, crossOriginMessageEvent.data.event);
      if (transformedEvent) this.wrappedEmit(transformedEvent, crossOriginMessageEvent.data.isCheckout);
    }
  }, {
    key: "transformCrossOriginEvent",
    value: function transformCrossOriginEvent(iframeEl, e2) {
      var _this41 = this;
      var _a2;
      switch (e2.type) {
        case EventType.FullSnapshot:
          {
            this.crossOriginIframeMirror.reset(iframeEl);
            this.crossOriginIframeStyleMirror.reset(iframeEl);
            this.replaceIdOnNode(e2.data.node, iframeEl);
            var rootId = e2.data.node.id;
            this.crossOriginIframeRootIdMap.set(iframeEl, rootId);
            this.patchRootIdOnNode(e2.data.node, rootId);
            return {
              timestamp: e2.timestamp,
              type: EventType.IncrementalSnapshot,
              data: {
                source: IncrementalSource.Mutation,
                adds: [{
                  parentId: this.mirror.getId(iframeEl),
                  nextId: null,
                  node: e2.data.node
                }],
                removes: [],
                texts: [],
                attributes: [],
                isAttachIframe: true
              }
            };
          }
        case EventType.Meta:
        case EventType.Load:
        case EventType.DomContentLoaded:
          {
            return false;
          }
        case EventType.Plugin:
          {
            return e2;
          }
        case EventType.Custom:
          {
            this.replaceIds(e2.data.payload, iframeEl, ["id", "parentId", "previousId", "nextId"]);
            return e2;
          }
        case EventType.IncrementalSnapshot:
          {
            switch (e2.data.source) {
              case IncrementalSource.Mutation:
                {
                  e2.data.adds.forEach(function (n2) {
                    _this41.replaceIds(n2, iframeEl, ["parentId", "nextId", "previousId"]);
                    _this41.replaceIdOnNode(n2.node, iframeEl);
                    var rootId = _this41.crossOriginIframeRootIdMap.get(iframeEl);
                    rootId && _this41.patchRootIdOnNode(n2.node, rootId);
                  });
                  e2.data.removes.forEach(function (n2) {
                    _this41.replaceIds(n2, iframeEl, ["parentId", "id"]);
                  });
                  e2.data.attributes.forEach(function (n2) {
                    _this41.replaceIds(n2, iframeEl, ["id"]);
                  });
                  e2.data.texts.forEach(function (n2) {
                    _this41.replaceIds(n2, iframeEl, ["id"]);
                  });
                  return e2;
                }
              case IncrementalSource.Drag:
              case IncrementalSource.TouchMove:
              case IncrementalSource.MouseMove:
                {
                  e2.data.positions.forEach(function (p) {
                    _this41.replaceIds(p, iframeEl, ["id"]);
                  });
                  return e2;
                }
              case IncrementalSource.ViewportResize:
                {
                  return false;
                }
              case IncrementalSource.MediaInteraction:
              case IncrementalSource.MouseInteraction:
              case IncrementalSource.Scroll:
              case IncrementalSource.CanvasMutation:
              case IncrementalSource.Input:
                {
                  this.replaceIds(e2.data, iframeEl, ["id"]);
                  return e2;
                }
              case IncrementalSource.StyleSheetRule:
              case IncrementalSource.StyleDeclaration:
                {
                  this.replaceIds(e2.data, iframeEl, ["id"]);
                  this.replaceStyleIds(e2.data, iframeEl, ["styleId"]);
                  return e2;
                }
              case IncrementalSource.Font:
                {
                  return e2;
                }
              case IncrementalSource.Selection:
                {
                  e2.data.ranges.forEach(function (range) {
                    _this41.replaceIds(range, iframeEl, ["start", "end"]);
                  });
                  return e2;
                }
              case IncrementalSource.AdoptedStyleSheet:
                {
                  this.replaceIds(e2.data, iframeEl, ["id"]);
                  this.replaceStyleIds(e2.data, iframeEl, ["styleIds"]);
                  (_a2 = e2.data.styles) == null ? void 0 : _a2.forEach(function (style) {
                    _this41.replaceStyleIds(style, iframeEl, ["styleId"]);
                  });
                  return e2;
                }
            }
          }
      }
      return false;
    }
  }, {
    key: "replace",
    value: function replace(iframeMirror, obj, iframeEl, keys) {
      var _iterator51 = record_createForOfIteratorHelper(keys),
        _step51;
      try {
        for (_iterator51.s(); !(_step51 = _iterator51.n()).done;) {
          var key = _step51.value;
          if (!Array.isArray(obj[key]) && typeof obj[key] !== "number") continue;
          if (Array.isArray(obj[key])) {
            obj[key] = iframeMirror.getIds(iframeEl, obj[key]);
          } else {
            obj[key] = iframeMirror.getId(iframeEl, obj[key]);
          }
        }
      } catch (err) {
        _iterator51.e(err);
      } finally {
        _iterator51.f();
      }
      return obj;
    }
  }, {
    key: "replaceIds",
    value: function replaceIds(obj, iframeEl, keys) {
      return this.replace(this.crossOriginIframeMirror, obj, iframeEl, keys);
    }
  }, {
    key: "replaceStyleIds",
    value: function replaceStyleIds(obj, iframeEl, keys) {
      return this.replace(this.crossOriginIframeStyleMirror, obj, iframeEl, keys);
    }
  }, {
    key: "replaceIdOnNode",
    value: function replaceIdOnNode(node2, iframeEl) {
      var _this42 = this;
      this.replaceIds(node2, iframeEl, ["id", "rootId"]);
      if ("childNodes" in node2) {
        node2.childNodes.forEach(function (child) {
          _this42.replaceIdOnNode(child, iframeEl);
        });
      }
    }
  }, {
    key: "patchRootIdOnNode",
    value: function patchRootIdOnNode(node2, rootId) {
      var _this43 = this;
      if (node2.type !== NodeType.Document && !node2.rootId) node2.rootId = rootId;
      if ("childNodes" in node2) {
        node2.childNodes.forEach(function (child) {
          _this43.patchRootIdOnNode(child, rootId);
        });
      }
    }
  }]);
}();
var ShadowDomManager = /*#__PURE__*/function () {
  function ShadowDomManager(options) {
    record_classCallCheck(this, ShadowDomManager);
    __publicField(this, "shadowDoms", /* @__PURE__ */new WeakSet());
    __publicField(this, "mutationCb");
    __publicField(this, "scrollCb");
    __publicField(this, "bypassOptions");
    __publicField(this, "mirror");
    __publicField(this, "restoreHandlers", []);
    this.mutationCb = options.mutationCb;
    this.scrollCb = options.scrollCb;
    this.bypassOptions = options.bypassOptions;
    this.mirror = options.mirror;
    this.init();
  }
  return record_createClass(ShadowDomManager, [{
    key: "init",
    value: function init() {
      this.reset();
      this.patchAttachShadow(Element, document);
    }
  }, {
    key: "addShadowRoot",
    value: function addShadowRoot(shadowRoot2, doc) {
      var _this44 = this;
      if (!isNativeShadowDom(shadowRoot2)) return;
      if (this.shadowDoms.has(shadowRoot2)) return;
      this.shadowDoms.add(shadowRoot2);
      var observer = initMutationObserver(record_objectSpread(record_objectSpread({}, this.bypassOptions), {}, {
        doc: doc,
        mutationCb: this.mutationCb,
        mirror: this.mirror,
        shadowDomManager: this
      }), shadowRoot2);
      this.restoreHandlers.push(function () {
        return observer.disconnect();
      });
      this.restoreHandlers.push(initScrollObserver(record_objectSpread(record_objectSpread({}, this.bypassOptions), {}, {
        scrollCb: this.scrollCb,
        // https://gist.github.com/praveenpuglia/0832da687ed5a5d7a0907046c9ef1813
        // scroll is not allowed to pass the boundary, so we need to listen the shadow document
        doc: shadowRoot2,
        mirror: this.mirror
      })));
      setTimeout(function () {
        if (shadowRoot2.adoptedStyleSheets && shadowRoot2.adoptedStyleSheets.length > 0) _this44.bypassOptions.stylesheetManager.adoptStyleSheets(shadowRoot2.adoptedStyleSheets, _this44.mirror.getId(index.host(shadowRoot2)));
        _this44.restoreHandlers.push(initAdoptedStyleSheetObserver({
          mirror: _this44.mirror,
          stylesheetManager: _this44.bypassOptions.stylesheetManager
        }, shadowRoot2));
      }, 0);
    }
    /**
     * Monkey patch 'attachShadow' of an IFrameElement to observe newly added shadow doms.
     */
  }, {
    key: "observeAttachShadow",
    value: function observeAttachShadow(iframeElement) {
      if (!iframeElement.contentWindow || !iframeElement.contentDocument) return;
      this.patchAttachShadow(iframeElement.contentWindow.Element, iframeElement.contentDocument);
    }
    /**
     * Patch 'attachShadow' to observe newly added shadow doms.
     */
  }, {
    key: "patchAttachShadow",
    value: function patchAttachShadow(element, doc) {
      var manager = this;
      this.restoreHandlers.push(patch(element.prototype, "attachShadow", function (original) {
        return function (option) {
          var sRoot = original.call(this, option);
          var shadowRootEl = index.shadowRoot(this);
          if (shadowRootEl && inDom(this)) manager.addShadowRoot(shadowRootEl, doc);
          return sRoot;
        };
      }));
    }
  }, {
    key: "reset",
    value: function reset() {
      this.restoreHandlers.forEach(function (handler) {
        try {
          handler();
        } catch (e2) {}
      });
      this.restoreHandlers = [];
      this.shadowDoms = /* @__PURE__ */new WeakSet();
    }
  }]);
}();
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (var i$1 = 0; i$1 < chars.length; i$1++) {
  lookup[chars.charCodeAt(i$1)] = i$1;
}
var encode = function encode(arraybuffer) {
  var bytes = new Uint8Array(arraybuffer),
    i2,
    len = bytes.length,
    base64 = "";
  for (i2 = 0; i2 < len; i2 += 3) {
    base64 += chars[bytes[i2] >> 2];
    base64 += chars[(bytes[i2] & 3) << 4 | bytes[i2 + 1] >> 4];
    base64 += chars[(bytes[i2 + 1] & 15) << 2 | bytes[i2 + 2] >> 6];
    base64 += chars[bytes[i2 + 2] & 63];
  }
  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "==";
  }
  return base64;
};
var canvasVarMap = /* @__PURE__ */new Map();
function variableListFor$1(ctx, ctor) {
  var contextMap = canvasVarMap.get(ctx);
  if (!contextMap) {
    contextMap = /* @__PURE__ */new Map();
    canvasVarMap.set(ctx, contextMap);
  }
  if (!contextMap.has(ctor)) {
    contextMap.set(ctor, []);
  }
  return contextMap.get(ctor);
}
var saveWebGLVar = function saveWebGLVar(value, win, ctx) {
  if (!value || !(isInstanceOfWebGLObject(value, win) || record_typeof(value) === "object")) return;
  var name = value.constructor.name;
  var list2 = variableListFor$1(ctx, name);
  var index2 = list2.indexOf(value);
  if (index2 === -1) {
    index2 = list2.length;
    list2.push(value);
  }
  return index2;
};
function serializeArg(value, win, ctx) {
  if (value instanceof Array) {
    return value.map(function (arg) {
      return serializeArg(arg, win, ctx);
    });
  } else if (value === null) {
    return value;
  } else if (value instanceof Float32Array || value instanceof Float64Array || value instanceof Int32Array || value instanceof Uint32Array || value instanceof Uint8Array || value instanceof Uint16Array || value instanceof Int16Array || value instanceof Int8Array || value instanceof Uint8ClampedArray) {
    var name = value.constructor.name;
    return {
      rr_type: name,
      args: [Object.values(value)]
    };
  } else if (
  // SharedArrayBuffer disabled on most browsers due to spectre.
  // More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/SharedArrayBuffer
  // value instanceof SharedArrayBuffer ||
  value instanceof ArrayBuffer) {
    var _name = value.constructor.name;
    var base64 = encode(value);
    return {
      rr_type: _name,
      base64: base64
    };
  } else if (value instanceof DataView) {
    var _name2 = value.constructor.name;
    return {
      rr_type: _name2,
      args: [serializeArg(value.buffer, win, ctx), value.byteOffset, value.byteLength]
    };
  } else if (value instanceof HTMLImageElement) {
    var _name3 = value.constructor.name;
    var src = value.src;
    return {
      rr_type: _name3,
      src: src
    };
  } else if (value instanceof HTMLCanvasElement) {
    var _name4 = "HTMLImageElement";
    var _src = value.toDataURL();
    return {
      rr_type: _name4,
      src: _src
    };
  } else if (value instanceof ImageData) {
    var _name5 = value.constructor.name;
    return {
      rr_type: _name5,
      args: [serializeArg(value.data, win, ctx), value.width, value.height]
    };
  } else if (isInstanceOfWebGLObject(value, win) || record_typeof(value) === "object") {
    var _name6 = value.constructor.name;
    var index2 = saveWebGLVar(value, win, ctx);
    return {
      rr_type: _name6,
      index: index2
    };
  }
  return value;
}
var serializeArgs = function serializeArgs(args, win, ctx) {
  return args.map(function (arg) {
    return serializeArg(arg, win, ctx);
  });
};
var isInstanceOfWebGLObject = function isInstanceOfWebGLObject(value, win) {
  var webGLConstructorNames = ["WebGLActiveInfo", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLTexture", "WebGLUniformLocation", "WebGLVertexArrayObject",
  // In old Chrome versions, value won't be an instanceof WebGLVertexArrayObject.
  "WebGLVertexArrayObjectOES"];
  var supportedWebGLConstructorNames = webGLConstructorNames.filter(function (name) {
    return typeof win[name] === "function";
  });
  return Boolean(supportedWebGLConstructorNames.find(function (name) {
    return value instanceof win[name];
  }));
};
function initCanvas2DMutationObserver(cb, win, blockClass, blockSelector) {
  var handlers = [];
  var props2D = Object.getOwnPropertyNames(win.CanvasRenderingContext2D.prototype);
  var _iterator52 = record_createForOfIteratorHelper(props2D),
    _step52;
  try {
    var _loop3 = function _loop3() {
      var prop = _step52.value;
      try {
        if (typeof win.CanvasRenderingContext2D.prototype[prop] !== "function") {
          return 1; // continue
        }
        var restoreHandler = patch(win.CanvasRenderingContext2D.prototype, prop, function (original) {
          return function () {
            var _this45 = this;
            for (var _len18 = arguments.length, args = new Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
              args[_key18] = arguments[_key18];
            }
            if (!isBlocked(this.canvas, blockClass, blockSelector, true)) {
              setTimeout(function () {
                var recordArgs = serializeArgs(args, win, _this45);
                cb(_this45.canvas, {
                  type: CanvasContext["2D"],
                  property: prop,
                  args: recordArgs
                });
              }, 0);
            }
            return original.apply(this, args);
          };
        });
        handlers.push(restoreHandler);
      } catch (_unused5) {
        var hookHandler = hookSetter(win.CanvasRenderingContext2D.prototype, prop, {
          set: function set(v2) {
            cb(this.canvas, {
              type: CanvasContext["2D"],
              property: prop,
              args: [v2],
              setter: true
            });
          }
        });
        handlers.push(hookHandler);
      }
    };
    for (_iterator52.s(); !(_step52 = _iterator52.n()).done;) {
      if (_loop3()) continue;
    }
  } catch (err) {
    _iterator52.e(err);
  } finally {
    _iterator52.f();
  }
  return function () {
    handlers.forEach(function (h) {
      return h();
    });
  };
}
function getNormalizedContextName(contextType) {
  return contextType === "experimental-webgl" ? "webgl" : contextType;
}
function initCanvasContextObserver(win, blockClass, blockSelector, setPreserveDrawingBufferToTrue) {
  var handlers = [];
  try {
    var restoreHandler = patch(win.HTMLCanvasElement.prototype, "getContext", function (original) {
      return function (contextType) {
        for (var _len19 = arguments.length, args = new Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
          args[_key19 - 1] = arguments[_key19];
        }
        if (!isBlocked(this, blockClass, blockSelector, true)) {
          var ctxName = getNormalizedContextName(contextType);
          if (!("__context" in this)) this.__context = ctxName;
          if (setPreserveDrawingBufferToTrue && ["webgl", "webgl2"].includes(ctxName)) {
            if (args[0] && record_typeof(args[0]) === "object") {
              var contextAttributes = args[0];
              if (!contextAttributes.preserveDrawingBuffer) {
                contextAttributes.preserveDrawingBuffer = true;
              }
            } else {
              args.splice(0, 1, {
                preserveDrawingBuffer: true
              });
            }
          }
        }
        return original.apply(this, [contextType].concat(args));
      };
    });
    handlers.push(restoreHandler);
  } catch (_unused6) {
    console.error("failed to patch HTMLCanvasElement.prototype.getContext");
  }
  return function () {
    handlers.forEach(function (h) {
      return h();
    });
  };
}
function patchGLPrototype(prototype, type, cb, blockClass, blockSelector, win) {
  var handlers = [];
  var props = Object.getOwnPropertyNames(prototype);
  var _iterator53 = record_createForOfIteratorHelper(props),
    _step53;
  try {
    var _loop4 = function _loop4() {
        var prop = _step53.value;
        if (
        //prop.startsWith('get') ||  // e.g. getProgramParameter, but too risky
        ["isContextLost", "canvas", "drawingBufferWidth", "drawingBufferHeight"].includes(prop)) {
          return 0; // continue
        }
        try {
          if (typeof prototype[prop] !== "function") {
            return 0; // continue
          }
          var restoreHandler = patch(prototype, prop, function (original) {
            return function () {
              for (var _len20 = arguments.length, args = new Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
                args[_key20] = arguments[_key20];
              }
              var result2 = original.apply(this, args);
              saveWebGLVar(result2, win, this);
              if ("tagName" in this.canvas && !isBlocked(this.canvas, blockClass, blockSelector, true)) {
                var recordArgs = serializeArgs(args, win, this);
                var mutation = {
                  type: type,
                  property: prop,
                  args: recordArgs
                };
                cb(this.canvas, mutation);
              }
              return result2;
            };
          });
          handlers.push(restoreHandler);
        } catch (_unused7) {
          var hookHandler = hookSetter(prototype, prop, {
            set: function set(v2) {
              cb(this.canvas, {
                type: type,
                property: prop,
                args: [v2],
                setter: true
              });
            }
          });
          handlers.push(hookHandler);
        }
      },
      _ret;
    for (_iterator53.s(); !(_step53 = _iterator53.n()).done;) {
      _ret = _loop4();
      if (_ret === 0) continue;
    }
  } catch (err) {
    _iterator53.e(err);
  } finally {
    _iterator53.f();
  }
  return handlers;
}
function initCanvasWebGLMutationObserver(cb, win, blockClass, blockSelector) {
  var handlers = [];
  handlers.push.apply(handlers, record_toConsumableArray(patchGLPrototype(win.WebGLRenderingContext.prototype, CanvasContext.WebGL, cb, blockClass, blockSelector, win)));
  if (typeof win.WebGL2RenderingContext !== "undefined") {
    handlers.push.apply(handlers, record_toConsumableArray(patchGLPrototype(win.WebGL2RenderingContext.prototype, CanvasContext.WebGL2, cb, blockClass, blockSelector, win)));
  }
  return function () {
    handlers.forEach(function (h) {
      return h();
    });
  };
}
var encodedJs = "KGZ1bmN0aW9uKCkgewogICJ1c2Ugc3RyaWN0IjsKICB2YXIgY2hhcnMgPSAiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyI7CiAgdmFyIGxvb2t1cCA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAidW5kZWZpbmVkIiA/IFtdIDogbmV3IFVpbnQ4QXJyYXkoMjU2KTsKICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7CiAgICBsb29rdXBbY2hhcnMuY2hhckNvZGVBdChpKV0gPSBpOwogIH0KICB2YXIgZW5jb2RlID0gZnVuY3Rpb24oYXJyYXlidWZmZXIpIHsKICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKSwgaTIsIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gIiI7CiAgICBmb3IgKGkyID0gMDsgaTIgPCBsZW47IGkyICs9IDMpIHsKICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kyXSA+PiAyXTsKICAgICAgYmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpMl0gJiAzKSA8PCA0IHwgYnl0ZXNbaTIgKyAxXSA+PiA0XTsKICAgICAgYmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpMiArIDFdICYgMTUpIDw8IDIgfCBieXRlc1tpMiArIDJdID4+IDZdOwogICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaTIgKyAyXSAmIDYzXTsKICAgIH0KICAgIGlmIChsZW4gJSAzID09PSAyKSB7CiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgIj0iOwogICAgfSBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7CiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgIj09IjsKICAgIH0KICAgIHJldHVybiBiYXNlNjQ7CiAgfTsKICBjb25zdCBsYXN0QmxvYk1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7CiAgY29uc3QgdHJhbnNwYXJlbnRCbG9iTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTsKICBhc3luYyBmdW5jdGlvbiBnZXRUcmFuc3BhcmVudEJsb2JGb3Iod2lkdGgsIGhlaWdodCwgZGF0YVVSTE9wdGlvbnMpIHsKICAgIGNvbnN0IGlkID0gYCR7d2lkdGh9LSR7aGVpZ2h0fWA7CiAgICBpZiAoIk9mZnNjcmVlbkNhbnZhcyIgaW4gZ2xvYmFsVGhpcykgewogICAgICBpZiAodHJhbnNwYXJlbnRCbG9iTWFwLmhhcyhpZCkpIHJldHVybiB0cmFuc3BhcmVudEJsb2JNYXAuZ2V0KGlkKTsKICAgICAgY29uc3Qgb2Zmc2NyZWVuID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh3aWR0aCwgaGVpZ2h0KTsKICAgICAgb2Zmc2NyZWVuLmdldENvbnRleHQoIjJkIik7CiAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBvZmZzY3JlZW4uY29udmVydFRvQmxvYihkYXRhVVJMT3B0aW9ucyk7CiAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgYmxvYi5hcnJheUJ1ZmZlcigpOwogICAgICBjb25zdCBiYXNlNjQgPSBlbmNvZGUoYXJyYXlCdWZmZXIpOwogICAgICB0cmFuc3BhcmVudEJsb2JNYXAuc2V0KGlkLCBiYXNlNjQpOwogICAgICByZXR1cm4gYmFzZTY0OwogICAgfSBlbHNlIHsKICAgICAgcmV0dXJuICIiOwogICAgfQogIH0KICBjb25zdCB3b3JrZXIgPSBzZWxmOwogIHdvcmtlci5vbm1lc3NhZ2UgPSBhc3luYyBmdW5jdGlvbihlKSB7CiAgICBpZiAoIk9mZnNjcmVlbkNhbnZhcyIgaW4gZ2xvYmFsVGhpcykgewogICAgICBjb25zdCB7IGlkLCBiaXRtYXAsIHdpZHRoLCBoZWlnaHQsIGRhdGFVUkxPcHRpb25zIH0gPSBlLmRhdGE7CiAgICAgIGNvbnN0IHRyYW5zcGFyZW50QmFzZTY0ID0gZ2V0VHJhbnNwYXJlbnRCbG9iRm9yKAogICAgICAgIHdpZHRoLAogICAgICAgIGhlaWdodCwKICAgICAgICBkYXRhVVJMT3B0aW9ucwogICAgICApOwogICAgICBjb25zdCBvZmZzY3JlZW4gPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHdpZHRoLCBoZWlnaHQpOwogICAgICBjb25zdCBjdHggPSBvZmZzY3JlZW4uZ2V0Q29udGV4dCgiMmQiKTsKICAgICAgY3R4LmRyYXdJbWFnZShiaXRtYXAsIDAsIDApOwogICAgICBiaXRtYXAuY2xvc2UoKTsKICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IG9mZnNjcmVlbi5jb252ZXJ0VG9CbG9iKGRhdGFVUkxPcHRpb25zKTsKICAgICAgY29uc3QgdHlwZSA9IGJsb2IudHlwZTsKICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSBhd2FpdCBibG9iLmFycmF5QnVmZmVyKCk7CiAgICAgIGNvbnN0IGJhc2U2NCA9IGVuY29kZShhcnJheUJ1ZmZlcik7CiAgICAgIGlmICghbGFzdEJsb2JNYXAuaGFzKGlkKSAmJiBhd2FpdCB0cmFuc3BhcmVudEJhc2U2NCA9PT0gYmFzZTY0KSB7CiAgICAgICAgbGFzdEJsb2JNYXAuc2V0KGlkLCBiYXNlNjQpOwogICAgICAgIHJldHVybiB3b3JrZXIucG9zdE1lc3NhZ2UoeyBpZCB9KTsKICAgICAgfQogICAgICBpZiAobGFzdEJsb2JNYXAuZ2V0KGlkKSA9PT0gYmFzZTY0KSByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQgfSk7CiAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7CiAgICAgICAgaWQsCiAgICAgICAgdHlwZSwKICAgICAgICBiYXNlNjQsCiAgICAgICAgd2lkdGgsCiAgICAgICAgaGVpZ2h0CiAgICAgIH0pOwogICAgICBsYXN0QmxvYk1hcC5zZXQoaWQsIGJhc2U2NCk7CiAgICB9IGVsc2UgewogICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IGUuZGF0YS5pZCB9KTsKICAgIH0KICB9Owp9KSgpOwovLyMgc291cmNlTWFwcGluZ1VSTD1pbWFnZS1iaXRtYXAtZGF0YS11cmwtd29ya2VyLUlKcEM3Z19iLmpzLm1hcAo=";
var decodeBase64 = function decodeBase64(base64) {
  return Uint8Array.from(atob(base64), function (c2) {
    return c2.charCodeAt(0);
  });
};
var blob = typeof window !== "undefined" && window.Blob && new Blob([decodeBase64(encodedJs)], {
  type: "text/javascript;charset=utf-8"
});
function WorkerWrapper(options) {
  var objURL;
  try {
    objURL = blob && (window.URL || window.webkitURL).createObjectURL(blob);
    if (!objURL) throw "";
    var worker = new Worker(objURL, {
      name: options == null ? void 0 : options.name
    });
    worker.addEventListener("error", function () {
      (window.URL || window.webkitURL).revokeObjectURL(objURL);
    });
    return worker;
  } catch (e2) {
    return new Worker("data:text/javascript;base64," + encodedJs, {
      name: options == null ? void 0 : options.name
    });
  } finally {
    objURL && (window.URL || window.webkitURL).revokeObjectURL(objURL);
  }
}
var CanvasManager = /*#__PURE__*/function () {
  function CanvasManager(options) {
    var _this46 = this;
    record_classCallCheck(this, CanvasManager);
    __publicField(this, "pendingCanvasMutations", /* @__PURE__ */new Map());
    __publicField(this, "rafStamps", {
      latestId: 0,
      invokeId: null
    });
    __publicField(this, "mirror");
    __publicField(this, "mutationCb");
    __publicField(this, "resetObservers");
    __publicField(this, "frozen", false);
    __publicField(this, "locked", false);
    __publicField(this, "processMutation", function (target, mutation) {
      var newFrame = _this46.rafStamps.invokeId && _this46.rafStamps.latestId !== _this46.rafStamps.invokeId;
      if (newFrame || !_this46.rafStamps.invokeId) _this46.rafStamps.invokeId = _this46.rafStamps.latestId;
      if (!_this46.pendingCanvasMutations.has(target)) {
        _this46.pendingCanvasMutations.set(target, []);
      }
      _this46.pendingCanvasMutations.get(target).push(mutation);
    });
    var _options$sampling = options.sampling,
      sampling = _options$sampling === void 0 ? "all" : _options$sampling,
      win = options.win,
      blockClass = options.blockClass,
      blockSelector = options.blockSelector,
      recordCanvas = options.recordCanvas,
      dataURLOptions = options.dataURLOptions;
    this.mutationCb = options.mutationCb;
    this.mirror = options.mirror;
    if (recordCanvas && sampling === "all") this.initCanvasMutationObserver(win, blockClass, blockSelector);
    if (recordCanvas && typeof sampling === "number") this.initCanvasFPSObserver(sampling, win, blockClass, blockSelector, {
      dataURLOptions: dataURLOptions
    });
  }
  return record_createClass(CanvasManager, [{
    key: "reset",
    value: function reset() {
      this.pendingCanvasMutations.clear();
      this.resetObservers && this.resetObservers();
    }
  }, {
    key: "freeze",
    value: function freeze() {
      this.frozen = true;
    }
  }, {
    key: "unfreeze",
    value: function unfreeze() {
      this.frozen = false;
    }
  }, {
    key: "lock",
    value: function lock() {
      this.locked = true;
    }
  }, {
    key: "unlock",
    value: function unlock() {
      this.locked = false;
    }
  }, {
    key: "initCanvasFPSObserver",
    value: function initCanvasFPSObserver(fps, win, blockClass, blockSelector, options) {
      var _this47 = this;
      var canvasContextReset = initCanvasContextObserver(win, blockClass, blockSelector, true);
      var snapshotInProgressMap = /* @__PURE__ */new Map();
      var worker = new WorkerWrapper();
      worker.onmessage = function (e2) {
        var id = e2.data.id;
        snapshotInProgressMap.set(id, false);
        if (!("base64" in e2.data)) return;
        var _e2$data = e2.data,
          base64 = _e2$data.base64,
          type = _e2$data.type,
          width = _e2$data.width,
          height = _e2$data.height;
        _this47.mutationCb({
          id: id,
          type: CanvasContext["2D"],
          commands: [{
            property: "clearRect",
            // wipe canvas
            args: [0, 0, width, height]
          }, {
            property: "drawImage",
            // draws (semi-transparent) image
            args: [{
              rr_type: "ImageBitmap",
              args: [{
                rr_type: "Blob",
                data: [{
                  rr_type: "ArrayBuffer",
                  base64: base64
                }],
                type: type
              }]
            }, 0, 0]
          }]
        });
      };
      var timeBetweenSnapshots = 1e3 / fps;
      var lastSnapshotTime = 0;
      var rafId;
      var getCanvas = function getCanvas() {
        var matchedCanvas = [];
        win.document.querySelectorAll("canvas").forEach(function (canvas) {
          if (!isBlocked(canvas, blockClass, blockSelector, true)) {
            matchedCanvas.push(canvas);
          }
        });
        return matchedCanvas;
      };
      var _takeCanvasSnapshots = function takeCanvasSnapshots(timestamp) {
        if (lastSnapshotTime && timestamp - lastSnapshotTime < timeBetweenSnapshots) {
          rafId = requestAnimationFrame(_takeCanvasSnapshots);
          return;
        }
        lastSnapshotTime = timestamp;
        getCanvas().forEach(/*#__PURE__*/function () {
          var _ref23 = record_asyncToGenerator(/*#__PURE__*/record_regeneratorRuntime().mark(function _callee3(canvas) {
            var _a2, id, context, bitmap;
            return record_regeneratorRuntime().wrap(function _callee3$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  id = _this47.mirror.getId(canvas);
                  if (!snapshotInProgressMap.get(id)) {
                    _context5.next = 3;
                    break;
                  }
                  return _context5.abrupt("return");
                case 3:
                  if (!(canvas.width === 0 || canvas.height === 0)) {
                    _context5.next = 5;
                    break;
                  }
                  return _context5.abrupt("return");
                case 5:
                  snapshotInProgressMap.set(id, true);
                  if (["webgl", "webgl2"].includes(canvas.__context)) {
                    context = canvas.getContext(canvas.__context);
                    if (((_a2 = context == null ? void 0 : context.getContextAttributes()) == null ? void 0 : _a2.preserveDrawingBuffer) === false) {
                      context.clear(context.COLOR_BUFFER_BIT);
                    }
                  }
                  _context5.next = 9;
                  return createImageBitmap(canvas);
                case 9:
                  bitmap = _context5.sent;
                  worker.postMessage({
                    id: id,
                    bitmap: bitmap,
                    width: canvas.width,
                    height: canvas.height,
                    dataURLOptions: options.dataURLOptions
                  }, [bitmap]);
                case 11:
                case "end":
                  return _context5.stop();
              }
            }, _callee3);
          }));
          return function (_x) {
            return _ref23.apply(this, arguments);
          };
        }());
        rafId = requestAnimationFrame(_takeCanvasSnapshots);
      };
      rafId = requestAnimationFrame(_takeCanvasSnapshots);
      this.resetObservers = function () {
        canvasContextReset();
        cancelAnimationFrame(rafId);
      };
    }
  }, {
    key: "initCanvasMutationObserver",
    value: function initCanvasMutationObserver(win, blockClass, blockSelector) {
      this.startRAFTimestamping();
      this.startPendingCanvasMutationFlusher();
      var canvasContextReset = initCanvasContextObserver(win, blockClass, blockSelector, false);
      var canvas2DReset = initCanvas2DMutationObserver(this.processMutation.bind(this), win, blockClass, blockSelector);
      var canvasWebGL1and2Reset = initCanvasWebGLMutationObserver(this.processMutation.bind(this), win, blockClass, blockSelector);
      this.resetObservers = function () {
        canvasContextReset();
        canvas2DReset();
        canvasWebGL1and2Reset();
      };
    }
  }, {
    key: "startPendingCanvasMutationFlusher",
    value: function startPendingCanvasMutationFlusher() {
      var _this48 = this;
      requestAnimationFrame(function () {
        return _this48.flushPendingCanvasMutations();
      });
    }
  }, {
    key: "startRAFTimestamping",
    value: function startRAFTimestamping() {
      var _this49 = this;
      var _setLatestRAFTimestamp = function setLatestRAFTimestamp(timestamp) {
        _this49.rafStamps.latestId = timestamp;
        requestAnimationFrame(_setLatestRAFTimestamp);
      };
      requestAnimationFrame(_setLatestRAFTimestamp);
    }
  }, {
    key: "flushPendingCanvasMutations",
    value: function flushPendingCanvasMutations() {
      var _this50 = this;
      this.pendingCanvasMutations.forEach(function (_values, canvas) {
        var id = _this50.mirror.getId(canvas);
        _this50.flushPendingCanvasMutationFor(canvas, id);
      });
      requestAnimationFrame(function () {
        return _this50.flushPendingCanvasMutations();
      });
    }
  }, {
    key: "flushPendingCanvasMutationFor",
    value: function flushPendingCanvasMutationFor(canvas, id) {
      if (this.frozen || this.locked) {
        return;
      }
      var valuesWithType = this.pendingCanvasMutations.get(canvas);
      if (!valuesWithType || id === -1) return;
      var values = valuesWithType.map(function (value) {
        var type2 = value.type,
          rest = record_objectWithoutProperties(value, _excluded5);
        return rest;
      });
      var type = valuesWithType[0].type;
      this.mutationCb({
        id: id,
        type: type,
        commands: values
      });
      this.pendingCanvasMutations.delete(canvas);
    }
  }]);
}();
var StylesheetManager = /*#__PURE__*/function () {
  function StylesheetManager(options) {
    record_classCallCheck(this, StylesheetManager);
    __publicField(this, "trackedLinkElements", /* @__PURE__ */new WeakSet());
    __publicField(this, "mutationCb");
    __publicField(this, "adoptedStyleSheetCb");
    __publicField(this, "styleMirror", new StyleSheetMirror());
    this.mutationCb = options.mutationCb;
    this.adoptedStyleSheetCb = options.adoptedStyleSheetCb;
  }
  return record_createClass(StylesheetManager, [{
    key: "attachLinkElement",
    value: function attachLinkElement(linkEl, childSn) {
      if ("_cssText" in childSn.attributes) this.mutationCb({
        adds: [],
        removes: [],
        texts: [],
        attributes: [{
          id: childSn.id,
          attributes: childSn.attributes
        }]
      });
      this.trackLinkElement(linkEl);
    }
  }, {
    key: "trackLinkElement",
    value: function trackLinkElement(linkEl) {
      if (this.trackedLinkElements.has(linkEl)) return;
      this.trackedLinkElements.add(linkEl);
      this.trackStylesheetInLinkElement(linkEl);
    }
  }, {
    key: "adoptStyleSheets",
    value: function adoptStyleSheets(sheets, hostId) {
      var _this51 = this;
      if (sheets.length === 0) return;
      var adoptedStyleSheetData = {
        id: hostId,
        styleIds: []
      };
      var styles = [];
      var _iterator54 = record_createForOfIteratorHelper(sheets),
        _step54;
      try {
        var _loop5 = function _loop5() {
          var sheet = _step54.value;
          var styleId;
          if (!_this51.styleMirror.has(sheet)) {
            styleId = _this51.styleMirror.add(sheet);
            styles.push({
              styleId: styleId,
              rules: Array.from(sheet.rules || CSSRule, function (r2, index2) {
                return {
                  rule: stringifyRule(r2, sheet.href),
                  index: index2
                };
              })
            });
          } else styleId = _this51.styleMirror.getId(sheet);
          adoptedStyleSheetData.styleIds.push(styleId);
        };
        for (_iterator54.s(); !(_step54 = _iterator54.n()).done;) {
          _loop5();
        }
      } catch (err) {
        _iterator54.e(err);
      } finally {
        _iterator54.f();
      }
      if (styles.length > 0) adoptedStyleSheetData.styles = styles;
      this.adoptedStyleSheetCb(adoptedStyleSheetData);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.styleMirror.reset();
      this.trackedLinkElements = /* @__PURE__ */new WeakSet();
    }
    // TODO: take snapshot on stylesheet reload by applying event listener
  }, {
    key: "trackStylesheetInLinkElement",
    value: function trackStylesheetInLinkElement(_linkEl) {}
  }]);
}();
var ProcessedNodeManager = /*#__PURE__*/function () {
  function ProcessedNodeManager() {
    record_classCallCheck(this, ProcessedNodeManager);
    __publicField(this, "nodeMap", /* @__PURE__ */new WeakMap());
    __publicField(this, "active", false);
  }
  return record_createClass(ProcessedNodeManager, [{
    key: "inOtherBuffer",
    value: function inOtherBuffer(node2, thisBuffer) {
      var buffers = this.nodeMap.get(node2);
      return buffers && Array.from(buffers).some(function (buffer) {
        return buffer !== thisBuffer;
      });
    }
  }, {
    key: "add",
    value: function add(node2, buffer) {
      var _this52 = this;
      if (!this.active) {
        this.active = true;
        requestAnimationFrame(function () {
          _this52.nodeMap = /* @__PURE__ */new WeakMap();
          _this52.active = false;
        });
      }
      this.nodeMap.set(node2, (this.nodeMap.get(node2) || /* @__PURE__ */new Set()).add(buffer));
    }
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);
}();
var wrappedEmit;
var takeFullSnapshot$1;
var canvasManager;
var recording = false;
try {
  if (Array.from([1], function (x2) {
    return x2 * 2;
  })[0] !== 2) {
    var cleanFrame = document.createElement("iframe");
    document.body.appendChild(cleanFrame);
    Array.from = ((_a = cleanFrame.contentWindow) == null ? void 0 : _a.Array.from) || Array.from;
    document.body.removeChild(cleanFrame);
  }
} catch (err) {
  console.debug("Unable to override Array.from", err);
}
var mirror = createMirror$2();
function record() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var emit = options.emit,
    checkoutEveryNms = options.checkoutEveryNms,
    checkoutEveryNth = options.checkoutEveryNth,
    _options$blockClass = options.blockClass,
    blockClass = _options$blockClass === void 0 ? "rr-block" : _options$blockClass,
    _options$blockSelecto = options.blockSelector,
    blockSelector = _options$blockSelecto === void 0 ? null : _options$blockSelecto,
    _options$ignoreClass = options.ignoreClass,
    ignoreClass = _options$ignoreClass === void 0 ? "rr-ignore" : _options$ignoreClass,
    _options$ignoreSelect = options.ignoreSelector,
    ignoreSelector = _options$ignoreSelect === void 0 ? null : _options$ignoreSelect,
    _options$maskTextClas = options.maskTextClass,
    maskTextClass = _options$maskTextClas === void 0 ? "rr-mask" : _options$maskTextClas,
    _options$maskTextSele = options.maskTextSelector,
    maskTextSelector = _options$maskTextSele === void 0 ? null : _options$maskTextSele,
    _options$inlineStyles2 = options.inlineStylesheet,
    inlineStylesheet = _options$inlineStyles2 === void 0 ? true : _options$inlineStyles2,
    maskAllInputs = options.maskAllInputs,
    _maskInputOptions = options.maskInputOptions,
    _slimDOMOptions = options.slimDOMOptions,
    maskInputFn = options.maskInputFn,
    maskTextFn = options.maskTextFn,
    hooks = options.hooks,
    packFn = options.packFn,
    _options$sampling2 = options.sampling,
    sampling = _options$sampling2 === void 0 ? {} : _options$sampling2,
    _options$dataURLOptio4 = options.dataURLOptions,
    dataURLOptions = _options$dataURLOptio4 === void 0 ? {} : _options$dataURLOptio4,
    mousemoveWait = options.mousemoveWait,
    _options$recordDOM = options.recordDOM,
    recordDOM = _options$recordDOM === void 0 ? true : _options$recordDOM,
    _options$recordCanvas2 = options.recordCanvas,
    recordCanvas = _options$recordCanvas2 === void 0 ? false : _options$recordCanvas2,
    _options$recordCrossO = options.recordCrossOriginIframes,
    recordCrossOriginIframes = _options$recordCrossO === void 0 ? false : _options$recordCrossO,
    _options$recordAfter = options.recordAfter,
    recordAfter = _options$recordAfter === void 0 ? options.recordAfter === "DOMContentLoaded" ? options.recordAfter : "load" : _options$recordAfter,
    _options$userTriggere = options.userTriggeredOnInput,
    userTriggeredOnInput = _options$userTriggere === void 0 ? false : _options$userTriggere,
    _options$collectFonts = options.collectFonts,
    collectFonts = _options$collectFonts === void 0 ? false : _options$collectFonts,
    _options$inlineImages2 = options.inlineImages,
    inlineImages = _options$inlineImages2 === void 0 ? false : _options$inlineImages2,
    plugins = options.plugins,
    _options$keepIframeSr2 = options.keepIframeSrcFn,
    keepIframeSrcFn = _options$keepIframeSr2 === void 0 ? function () {
      return false;
    } : _options$keepIframeSr2,
    _options$ignoreCSSAtt = options.ignoreCSSAttributes,
    ignoreCSSAttributes = _options$ignoreCSSAtt === void 0 ? /* @__PURE__ */new Set([]) : _options$ignoreCSSAtt,
    errorHandler2 = options.errorHandler;
  registerErrorHandler(errorHandler2);
  var inEmittingFrame = recordCrossOriginIframes ? window.parent === window : true;
  var passEmitsToParent = false;
  if (!inEmittingFrame) {
    try {
      if (window.parent.document) {
        passEmitsToParent = false;
      }
    } catch (e2) {
      passEmitsToParent = true;
    }
  }
  if (inEmittingFrame && !emit) {
    throw new Error("emit function is required");
  }
  if (!inEmittingFrame && !passEmitsToParent) {
    return function () {};
  }
  if (mousemoveWait !== void 0 && sampling.mousemove === void 0) {
    sampling.mousemove = mousemoveWait;
  }
  mirror.reset();
  var maskInputOptions = maskAllInputs === true ? {
    color: true,
    date: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true,
    textarea: true,
    select: true,
    password: true
  } : _maskInputOptions !== void 0 ? _maskInputOptions : {
    password: true
  };
  var slimDOMOptions = _slimDOMOptions === true || _slimDOMOptions === "all" ? {
    script: true,
    comment: true,
    headFavicon: true,
    headWhitespace: true,
    headMetaSocial: true,
    headMetaRobots: true,
    headMetaHttpEquiv: true,
    headMetaVerification: true,
    // the following are off for slimDOMOptions === true,
    // as they destroy some (hidden) info:
    headMetaAuthorship: _slimDOMOptions === "all",
    headMetaDescKeywords: _slimDOMOptions === "all",
    headTitleMutations: _slimDOMOptions === "all"
  } : _slimDOMOptions ? _slimDOMOptions : {};
  polyfill$1();
  var lastFullSnapshotEvent;
  var incrementalSnapshotCount = 0;
  var eventProcessor = function eventProcessor(e2) {
    var _iterator55 = record_createForOfIteratorHelper(plugins || []),
      _step55;
    try {
      for (_iterator55.s(); !(_step55 = _iterator55.n()).done;) {
        var plugin3 = _step55.value;
        if (plugin3.eventProcessor) {
          e2 = plugin3.eventProcessor(e2);
        }
      }
    } catch (err) {
      _iterator55.e(err);
    } finally {
      _iterator55.f();
    }
    if (packFn &&
    // Disable packing events which will be emitted to parent frames.
    !passEmitsToParent) {
      e2 = packFn(e2);
    }
    return e2;
  };
  wrappedEmit = function wrappedEmit(r2, isCheckout) {
    var _a2;
    var e2 = r2;
    e2.timestamp = nowTimestamp();
    if (((_a2 = mutationBuffers[0]) == null ? void 0 : _a2.isFrozen()) && e2.type !== EventType.FullSnapshot && !(e2.type === EventType.IncrementalSnapshot && e2.data.source === IncrementalSource.Mutation)) {
      mutationBuffers.forEach(function (buf) {
        return buf.unfreeze();
      });
    }
    if (inEmittingFrame) {
      emit == null ? void 0 : emit(eventProcessor(e2), isCheckout);
    } else if (passEmitsToParent) {
      var message = {
        type: "rrweb",
        event: eventProcessor(e2),
        origin: window.location.origin,
        isCheckout: isCheckout
      };
      window.parent.postMessage(message, "*");
    }
    if (e2.type === EventType.FullSnapshot) {
      lastFullSnapshotEvent = e2;
      incrementalSnapshotCount = 0;
    } else if (e2.type === EventType.IncrementalSnapshot) {
      if (e2.data.source === IncrementalSource.Mutation && e2.data.isAttachIframe) {
        return;
      }
      incrementalSnapshotCount++;
      var exceedCount = checkoutEveryNth && incrementalSnapshotCount >= checkoutEveryNth;
      var exceedTime = checkoutEveryNms && e2.timestamp - lastFullSnapshotEvent.timestamp > checkoutEveryNms;
      if (exceedCount || exceedTime) {
        takeFullSnapshot$1(true);
      }
    }
  };
  var wrappedMutationEmit = function wrappedMutationEmit(m) {
    wrappedEmit({
      type: EventType.IncrementalSnapshot,
      data: record_objectSpread({
        source: IncrementalSource.Mutation
      }, m)
    });
  };
  var wrappedScrollEmit = function wrappedScrollEmit(p) {
    return wrappedEmit({
      type: EventType.IncrementalSnapshot,
      data: record_objectSpread({
        source: IncrementalSource.Scroll
      }, p)
    });
  };
  var wrappedCanvasMutationEmit = function wrappedCanvasMutationEmit(p) {
    return wrappedEmit({
      type: EventType.IncrementalSnapshot,
      data: record_objectSpread({
        source: IncrementalSource.CanvasMutation
      }, p)
    });
  };
  var wrappedAdoptedStyleSheetEmit = function wrappedAdoptedStyleSheetEmit(a2) {
    return wrappedEmit({
      type: EventType.IncrementalSnapshot,
      data: record_objectSpread({
        source: IncrementalSource.AdoptedStyleSheet
      }, a2)
    });
  };
  var stylesheetManager = new StylesheetManager({
    mutationCb: wrappedMutationEmit,
    adoptedStyleSheetCb: wrappedAdoptedStyleSheetEmit
  });
  var iframeManager = new IframeManager({
    mirror: mirror,
    mutationCb: wrappedMutationEmit,
    stylesheetManager: stylesheetManager,
    recordCrossOriginIframes: recordCrossOriginIframes,
    wrappedEmit: wrappedEmit
  });
  var _iterator56 = record_createForOfIteratorHelper(plugins || []),
    _step56;
  try {
    for (_iterator56.s(); !(_step56 = _iterator56.n()).done;) {
      var plugin3 = _step56.value;
      if (plugin3.getMirror) plugin3.getMirror({
        nodeMirror: mirror,
        crossOriginIframeMirror: iframeManager.crossOriginIframeMirror,
        crossOriginIframeStyleMirror: iframeManager.crossOriginIframeStyleMirror
      });
    }
  } catch (err) {
    _iterator56.e(err);
  } finally {
    _iterator56.f();
  }
  var processedNodeManager = new ProcessedNodeManager();
  canvasManager = new CanvasManager({
    recordCanvas: recordCanvas,
    mutationCb: wrappedCanvasMutationEmit,
    win: window,
    blockClass: blockClass,
    blockSelector: blockSelector,
    mirror: mirror,
    sampling: sampling.canvas,
    dataURLOptions: dataURLOptions
  });
  var shadowDomManager = new ShadowDomManager({
    mutationCb: wrappedMutationEmit,
    scrollCb: wrappedScrollEmit,
    bypassOptions: {
      blockClass: blockClass,
      blockSelector: blockSelector,
      maskTextClass: maskTextClass,
      maskTextSelector: maskTextSelector,
      inlineStylesheet: inlineStylesheet,
      maskInputOptions: maskInputOptions,
      dataURLOptions: dataURLOptions,
      maskTextFn: maskTextFn,
      maskInputFn: maskInputFn,
      recordCanvas: recordCanvas,
      inlineImages: inlineImages,
      sampling: sampling,
      slimDOMOptions: slimDOMOptions,
      iframeManager: iframeManager,
      stylesheetManager: stylesheetManager,
      canvasManager: canvasManager,
      keepIframeSrcFn: keepIframeSrcFn,
      processedNodeManager: processedNodeManager
    },
    mirror: mirror
  });
  takeFullSnapshot$1 = function takeFullSnapshot$1() {
    var isCheckout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!recordDOM) {
      return;
    }
    wrappedEmit({
      type: EventType.Meta,
      data: {
        href: window.location.href,
        width: getWindowWidth(),
        height: getWindowHeight()
      }
    }, isCheckout);
    stylesheetManager.reset();
    shadowDomManager.init();
    mutationBuffers.forEach(function (buf) {
      return buf.lock();
    });
    var node2 = snapshot(document, {
      mirror: mirror,
      blockClass: blockClass,
      blockSelector: blockSelector,
      maskTextClass: maskTextClass,
      maskTextSelector: maskTextSelector,
      inlineStylesheet: inlineStylesheet,
      maskAllInputs: maskInputOptions,
      maskTextFn: maskTextFn,
      maskInputFn: maskInputFn,
      slimDOM: slimDOMOptions,
      dataURLOptions: dataURLOptions,
      recordCanvas: recordCanvas,
      inlineImages: inlineImages,
      onSerialize: function onSerialize(n2) {
        if (isSerializedIframe(n2, mirror)) {
          iframeManager.addIframe(n2);
        }
        if (isSerializedStylesheet(n2, mirror)) {
          stylesheetManager.trackLinkElement(n2);
        }
        if (hasShadowRoot(n2)) {
          shadowDomManager.addShadowRoot(index.shadowRoot(n2), document);
        }
      },
      onIframeLoad: function onIframeLoad(iframe, childSn) {
        iframeManager.attachIframe(iframe, childSn);
        shadowDomManager.observeAttachShadow(iframe);
      },
      onStylesheetLoad: function onStylesheetLoad(linkEl, childSn) {
        stylesheetManager.attachLinkElement(linkEl, childSn);
      },
      keepIframeSrcFn: keepIframeSrcFn
    });
    if (!node2) {
      return console.warn("Failed to snapshot the document");
    }
    wrappedEmit({
      type: EventType.FullSnapshot,
      data: {
        node: node2,
        initialOffset: getWindowScroll(window)
      }
    }, isCheckout);
    mutationBuffers.forEach(function (buf) {
      return buf.unlock();
    });
    if (document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0) stylesheetManager.adoptStyleSheets(document.adoptedStyleSheets, mirror.getId(document));
  };
  try {
    var handlers = [];
    var observe = function observe(doc) {
      var _a2;
      return callbackWrapper(initObservers)({
        mutationCb: wrappedMutationEmit,
        mousemoveCb: function mousemoveCb(positions, source) {
          return wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: {
              source: source,
              positions: positions
            }
          });
        },
        mouseInteractionCb: function mouseInteractionCb(d) {
          return wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: record_objectSpread({
              source: IncrementalSource.MouseInteraction
            }, d)
          });
        },
        scrollCb: wrappedScrollEmit,
        viewportResizeCb: function viewportResizeCb(d) {
          return wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: record_objectSpread({
              source: IncrementalSource.ViewportResize
            }, d)
          });
        },
        inputCb: function inputCb(v2) {
          return wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: record_objectSpread({
              source: IncrementalSource.Input
            }, v2)
          });
        },
        mediaInteractionCb: function mediaInteractionCb(p) {
          return wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: record_objectSpread({
              source: IncrementalSource.MediaInteraction
            }, p)
          });
        },
        styleSheetRuleCb: function styleSheetRuleCb(r2) {
          return wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: record_objectSpread({
              source: IncrementalSource.StyleSheetRule
            }, r2)
          });
        },
        styleDeclarationCb: function styleDeclarationCb(r2) {
          return wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: record_objectSpread({
              source: IncrementalSource.StyleDeclaration
            }, r2)
          });
        },
        canvasMutationCb: wrappedCanvasMutationEmit,
        fontCb: function fontCb(p) {
          return wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: record_objectSpread({
              source: IncrementalSource.Font
            }, p)
          });
        },
        selectionCb: function selectionCb(p) {
          wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: record_objectSpread({
              source: IncrementalSource.Selection
            }, p)
          });
        },
        customElementCb: function customElementCb(c2) {
          wrappedEmit({
            type: EventType.IncrementalSnapshot,
            data: record_objectSpread({
              source: IncrementalSource.CustomElement
            }, c2)
          });
        },
        blockClass: blockClass,
        ignoreClass: ignoreClass,
        ignoreSelector: ignoreSelector,
        maskTextClass: maskTextClass,
        maskTextSelector: maskTextSelector,
        maskInputOptions: maskInputOptions,
        inlineStylesheet: inlineStylesheet,
        sampling: sampling,
        recordDOM: recordDOM,
        recordCanvas: recordCanvas,
        inlineImages: inlineImages,
        userTriggeredOnInput: userTriggeredOnInput,
        collectFonts: collectFonts,
        doc: doc,
        maskInputFn: maskInputFn,
        maskTextFn: maskTextFn,
        keepIframeSrcFn: keepIframeSrcFn,
        blockSelector: blockSelector,
        slimDOMOptions: slimDOMOptions,
        dataURLOptions: dataURLOptions,
        mirror: mirror,
        iframeManager: iframeManager,
        stylesheetManager: stylesheetManager,
        shadowDomManager: shadowDomManager,
        processedNodeManager: processedNodeManager,
        canvasManager: canvasManager,
        ignoreCSSAttributes: ignoreCSSAttributes,
        plugins: ((_a2 = plugins == null ? void 0 : plugins.filter(function (p) {
          return p.observer;
        })) == null ? void 0 : _a2.map(function (p) {
          return {
            observer: p.observer,
            options: p.options,
            callback: function callback(payload) {
              return wrappedEmit({
                type: EventType.Plugin,
                data: {
                  plugin: p.name,
                  payload: payload
                }
              });
            }
          };
        })) || []
      }, hooks);
    };
    iframeManager.addLoadListener(function (iframeEl) {
      try {
        handlers.push(observe(iframeEl.contentDocument));
      } catch (error) {
        console.warn(error);
      }
    });
    var init = function init() {
      takeFullSnapshot$1();
      handlers.push(observe(document));
      recording = true;
    };
    if (document.readyState === "interactive" || document.readyState === "complete") {
      init();
    } else {
      handlers.push(on("DOMContentLoaded", function () {
        wrappedEmit({
          type: EventType.DomContentLoaded,
          data: {}
        });
        if (recordAfter === "DOMContentLoaded") init();
      }));
      handlers.push(on("load", function () {
        wrappedEmit({
          type: EventType.Load,
          data: {}
        });
        if (recordAfter === "load") init();
      }, window));
    }
    return function () {
      handlers.forEach(function (h) {
        return h();
      });
      processedNodeManager.destroy();
      recording = false;
      unregisterErrorHandler();
    };
  } catch (error) {
    console.warn(error);
  }
}
record.addCustomEvent = function (tag, payload) {
  if (!recording) {
    throw new Error("please add custom event after start recording");
  }
  wrappedEmit({
    type: EventType.Custom,
    data: {
      tag: tag,
      payload: payload
    }
  });
};
record.freezePage = function () {
  mutationBuffers.forEach(function (buf) {
    return buf.freeze();
  });
};
record.takeFullSnapshot = function (isCheckout) {
  if (!recording) {
    throw new Error("please take full snapshot after start recording");
  }
  takeFullSnapshot$1(isCheckout);
};
record.mirror = mirror;
var n;
!function (t2) {
  t2[t2.NotStarted = 0] = "NotStarted", t2[t2.Running = 1] = "Running", t2[t2.Stopped = 2] = "Stopped";
}(n || (n = {}));

;// ./node_modules/@rrweb/types/dist/types.js
var types_EventType = /* @__PURE__ */function (EventType2) {
  EventType2[EventType2["DomContentLoaded"] = 0] = "DomContentLoaded";
  EventType2[EventType2["Load"] = 1] = "Load";
  EventType2[EventType2["FullSnapshot"] = 2] = "FullSnapshot";
  EventType2[EventType2["IncrementalSnapshot"] = 3] = "IncrementalSnapshot";
  EventType2[EventType2["Meta"] = 4] = "Meta";
  EventType2[EventType2["Custom"] = 5] = "Custom";
  EventType2[EventType2["Plugin"] = 6] = "Plugin";
  return EventType2;
}(types_EventType || {});
var types_IncrementalSource = /* @__PURE__ */function (IncrementalSource2) {
  IncrementalSource2[IncrementalSource2["Mutation"] = 0] = "Mutation";
  IncrementalSource2[IncrementalSource2["MouseMove"] = 1] = "MouseMove";
  IncrementalSource2[IncrementalSource2["MouseInteraction"] = 2] = "MouseInteraction";
  IncrementalSource2[IncrementalSource2["Scroll"] = 3] = "Scroll";
  IncrementalSource2[IncrementalSource2["ViewportResize"] = 4] = "ViewportResize";
  IncrementalSource2[IncrementalSource2["Input"] = 5] = "Input";
  IncrementalSource2[IncrementalSource2["TouchMove"] = 6] = "TouchMove";
  IncrementalSource2[IncrementalSource2["MediaInteraction"] = 7] = "MediaInteraction";
  IncrementalSource2[IncrementalSource2["StyleSheetRule"] = 8] = "StyleSheetRule";
  IncrementalSource2[IncrementalSource2["CanvasMutation"] = 9] = "CanvasMutation";
  IncrementalSource2[IncrementalSource2["Font"] = 10] = "Font";
  IncrementalSource2[IncrementalSource2["Log"] = 11] = "Log";
  IncrementalSource2[IncrementalSource2["Drag"] = 12] = "Drag";
  IncrementalSource2[IncrementalSource2["StyleDeclaration"] = 13] = "StyleDeclaration";
  IncrementalSource2[IncrementalSource2["Selection"] = 14] = "Selection";
  IncrementalSource2[IncrementalSource2["AdoptedStyleSheet"] = 15] = "AdoptedStyleSheet";
  IncrementalSource2[IncrementalSource2["CustomElement"] = 16] = "CustomElement";
  return IncrementalSource2;
}(types_IncrementalSource || {});
var types_MouseInteractions = /* @__PURE__ */function (MouseInteractions2) {
  MouseInteractions2[MouseInteractions2["MouseUp"] = 0] = "MouseUp";
  MouseInteractions2[MouseInteractions2["MouseDown"] = 1] = "MouseDown";
  MouseInteractions2[MouseInteractions2["Click"] = 2] = "Click";
  MouseInteractions2[MouseInteractions2["ContextMenu"] = 3] = "ContextMenu";
  MouseInteractions2[MouseInteractions2["DblClick"] = 4] = "DblClick";
  MouseInteractions2[MouseInteractions2["Focus"] = 5] = "Focus";
  MouseInteractions2[MouseInteractions2["Blur"] = 6] = "Blur";
  MouseInteractions2[MouseInteractions2["TouchStart"] = 7] = "TouchStart";
  MouseInteractions2[MouseInteractions2["TouchMove_Departed"] = 8] = "TouchMove_Departed";
  MouseInteractions2[MouseInteractions2["TouchEnd"] = 9] = "TouchEnd";
  MouseInteractions2[MouseInteractions2["TouchCancel"] = 10] = "TouchCancel";
  return MouseInteractions2;
}(types_MouseInteractions || {});
var types_PointerTypes = /* @__PURE__ */function (PointerTypes2) {
  PointerTypes2[PointerTypes2["Mouse"] = 0] = "Mouse";
  PointerTypes2[PointerTypes2["Pen"] = 1] = "Pen";
  PointerTypes2[PointerTypes2["Touch"] = 2] = "Touch";
  return PointerTypes2;
}(types_PointerTypes || {});
var types_CanvasContext = /* @__PURE__ */function (CanvasContext2) {
  CanvasContext2[CanvasContext2["2D"] = 0] = "2D";
  CanvasContext2[CanvasContext2["WebGL"] = 1] = "WebGL";
  CanvasContext2[CanvasContext2["WebGL2"] = 2] = "WebGL2";
  return CanvasContext2;
}(types_CanvasContext || {});
var types_MediaInteractions = /* @__PURE__ */function (MediaInteractions2) {
  MediaInteractions2[MediaInteractions2["Play"] = 0] = "Play";
  MediaInteractions2[MediaInteractions2["Pause"] = 1] = "Pause";
  MediaInteractions2[MediaInteractions2["Seeked"] = 2] = "Seeked";
  MediaInteractions2[MediaInteractions2["VolumeChange"] = 3] = "VolumeChange";
  MediaInteractions2[MediaInteractions2["RateChange"] = 4] = "RateChange";
  return MediaInteractions2;
}(types_MediaInteractions || {});
var ReplayerEvents = /* @__PURE__ */function (ReplayerEvents2) {
  ReplayerEvents2["Start"] = "start";
  ReplayerEvents2["Pause"] = "pause";
  ReplayerEvents2["Resume"] = "resume";
  ReplayerEvents2["Resize"] = "resize";
  ReplayerEvents2["Finish"] = "finish";
  ReplayerEvents2["FullsnapshotRebuilded"] = "fullsnapshot-rebuilded";
  ReplayerEvents2["LoadStylesheetStart"] = "load-stylesheet-start";
  ReplayerEvents2["LoadStylesheetEnd"] = "load-stylesheet-end";
  ReplayerEvents2["SkipStart"] = "skip-start";
  ReplayerEvents2["SkipEnd"] = "skip-end";
  ReplayerEvents2["MouseInteraction"] = "mouse-interaction";
  ReplayerEvents2["EventCast"] = "event-cast";
  ReplayerEvents2["CustomEvent"] = "custom-event";
  ReplayerEvents2["Flush"] = "flush";
  ReplayerEvents2["StateChange"] = "state-change";
  ReplayerEvents2["PlayBack"] = "play-back";
  ReplayerEvents2["Destroy"] = "destroy";
  return ReplayerEvents2;
}(ReplayerEvents || {});
var types_NodeType = /* @__PURE__ */function (NodeType2) {
  NodeType2[NodeType2["Document"] = 0] = "Document";
  NodeType2[NodeType2["DocumentType"] = 1] = "DocumentType";
  NodeType2[NodeType2["Element"] = 2] = "Element";
  NodeType2[NodeType2["Text"] = 3] = "Text";
  NodeType2[NodeType2["CDATA"] = 4] = "CDATA";
  NodeType2[NodeType2["Comment"] = 5] = "Comment";
  return NodeType2;
}(types_NodeType || {});

;// ./src/browser/replay/recorder.js
var recorder_excluded = ["enabled", "autoStart", "maxSeconds", "triggers", "debug", "emit", "checkoutEveryNms"];
function recorder_typeof(o) { "@babel/helpers - typeof"; return recorder_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, recorder_typeof(o); }
function recorder_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function recorder_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? recorder_ownKeys(Object(t), !0).forEach(function (r) { recorder_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : recorder_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function recorder_defineProperty(e, r, t) { return (r = recorder_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function recorder_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = recorder_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function recorder_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return recorder_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? recorder_arrayLikeToArray(r, a) : void 0; } }
function recorder_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function recorder_objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = recorder_objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function recorder_objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function recorder_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function recorder_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, recorder_toPropertyKey(o.key), o); } }
function recorder_createClass(e, r, t) { return r && recorder_defineProperties(e.prototype, r), t && recorder_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function recorder_toPropertyKey(t) { var i = recorder_toPrimitive(t, "string"); return "symbol" == recorder_typeof(i) ? i : i + ""; }
function recorder_toPrimitive(t, r) { if ("object" != recorder_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != recorder_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function recorder_classPrivateFieldInitSpec(e, t, a) { recorder_checkPrivateRedeclaration(e, t), t.set(e, a); }
function recorder_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function recorder_classPrivateFieldGet(s, a) { return s.get(recorder_assertClassBrand(s, a)); }
function recorder_classPrivateFieldSet(s, a, r) { return s.set(recorder_assertClassBrand(s, a), r), r; }
function recorder_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }




var _options = /*#__PURE__*/new WeakMap();
var _rrwebOptions = /*#__PURE__*/new WeakMap();
var _stopFn = /*#__PURE__*/new WeakMap();
var _recordFn = /*#__PURE__*/new WeakMap();
var _events = /*#__PURE__*/new WeakMap();
var Recorder = /*#__PURE__*/function () {
  /**
   * Creates a new Recorder instance for capturing DOM events
   *
   * @param {Object} options - Configuration options for the recorder
   * @param {Function} [recordFn=rrwebRecordFn] - The recording function to use
   */
  function Recorder(options) {
    var recordFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : record;
    recorder_classCallCheck(this, Recorder);
    recorder_classPrivateFieldInitSpec(this, _options, void 0);
    recorder_classPrivateFieldInitSpec(this, _rrwebOptions, void 0);
    recorder_classPrivateFieldInitSpec(this, _stopFn, null);
    recorder_classPrivateFieldInitSpec(this, _recordFn, void 0);
    recorder_classPrivateFieldInitSpec(this, _events, {
      previous: [],
      current: []
    });
    if (!recordFn) {
      throw new TypeError("Expected 'recordFn' to be provided");
    }
    this.options = options;
    recorder_classPrivateFieldSet(_recordFn, this, recordFn);
  }
  return recorder_createClass(Recorder, [{
    key: "isRecording",
    get: function get() {
      return recorder_classPrivateFieldGet(_stopFn, this) !== null;
    }
  }, {
    key: "options",
    get: function get() {
      return recorder_classPrivateFieldGet(_options, this);
    },
    set: function set(newOptions) {
      this.configure(newOptions);
    }
  }, {
    key: "configure",
    value: function configure(newOptions) {
      var enabled = newOptions.enabled,
        autoStart = newOptions.autoStart,
        maxSeconds = newOptions.maxSeconds,
        triggers = newOptions.triggers,
        debug = newOptions.debug,
        emit = newOptions.emit,
        checkoutEveryNms = newOptions.checkoutEveryNms,
        rrwebOptions = recorder_objectWithoutProperties(newOptions, recorder_excluded);
      recorder_classPrivateFieldSet(_options, this, {
        enabled: enabled,
        autoStart: autoStart,
        maxSeconds: maxSeconds,
        triggers: triggers,
        debug: debug
      });
      recorder_classPrivateFieldSet(_rrwebOptions, this, rrwebOptions);
      if (this.isRecording && newOptions.enabled === false) {
        this.stop();
      }
    }
  }, {
    key: "checkoutEveryNms",
    value: function checkoutEveryNms() {
      // Recording may be up to two checkout intervals, therefore the checkout
      // interval is set to half of the maxSeconds.
      return (this.options.maxSeconds || 10) * 1000 / 2;
    }

    /**
     * Converts recorded events into a formatted payload ready for transport.
     *
     * This method takes the recorder's stored events, creates a new span with the
     * provided tracing context, attaches all events with their timestamps as span
     * events, and then returns a payload ready for transport to the server.
     *
     * @param {Object} tracing - The tracing system instance to create spans
     * @param {string} replayId - Unique identifier to associate with this replay recording
     * @returns {Object|null} A formatted payload containing spans data in OTLP format, or null if no events exist
     */
  }, {
    key: "dump",
    value: function dump(tracing, replayId, occurrenceUuid) {
      var events = recorder_classPrivateFieldGet(_events, this).previous.concat(recorder_classPrivateFieldGet(_events, this).current);
      if (events.length < 2) {
        logger.error('Replay recording cannot have less than 2 events');
        return null;
      }
      var recordingSpan = tracing.startSpan('rrweb-replay-recording', {});
      recordingSpan.setAttribute('rollbar.replay.id', replayId);
      if (occurrenceUuid) {
        recordingSpan.setAttribute('rollbar.occurrence.uuid', occurrenceUuid);
      }
      var earliestEvent = events.reduce(function (earliestEvent, event) {
        return event.timestamp < earliestEvent.timestamp ? event : earliestEvent;
      });
      recordingSpan.span.startTime = hrtime.fromMillis(earliestEvent.timestamp);
      var _iterator = recorder_createForOfIteratorHelper(events),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var event = _step.value;
          recordingSpan.addEvent('rrweb-replay-events', {
            eventType: event.type,
            json: JSON.stringify(event.data)
          }, hrtime.fromMillis(event.timestamp));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this._addEndEvent(recordingSpan, replayId);
      recordingSpan.end();
      return tracing.exporter.toPayload();
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;
      if (this.isRecording || this.options.enabled === false) {
        return;
      }
      this.clear();
      recorder_classPrivateFieldSet(_stopFn, this, recorder_classPrivateFieldGet(_recordFn, this).call(this, recorder_objectSpread({
        emit: function emit(event, isCheckout) {
          var _this$options$debug;
          if ((_this$options$debug = _this.options.debug) !== null && _this$options$debug !== void 0 && _this$options$debug.logEmits) {
            _this._logEvent(event, isCheckout);
          }
          if (isCheckout && event.type === types_EventType.Meta) {
            recorder_classPrivateFieldGet(_events, _this).previous = recorder_classPrivateFieldGet(_events, _this).current;
            recorder_classPrivateFieldGet(_events, _this).current = [];
          }
          recorder_classPrivateFieldGet(_events, _this).current.push(event);
        },
        checkoutEveryNms: this.checkoutEveryNms(),
        errorHandler: function errorHandler(error) {
          var _this$options$debug2;
          if ((_this$options$debug2 = _this.options.debug) !== null && _this$options$debug2 !== void 0 && _this$options$debug2.logErrors) {
            logger.error('Error during replay recording', error);
          }
          return true; // swallow the error instead of throwing it to the window
        }
      }, recorder_classPrivateFieldGet(_rrwebOptions, this))));
      return this;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.isRecording) {
        return;
      }
      recorder_classPrivateFieldGet(_stopFn, this).call(this);
      recorder_classPrivateFieldSet(_stopFn, this, null);
      return this;
    }
  }, {
    key: "clear",
    value: function clear() {
      recorder_classPrivateFieldSet(_events, this, {
        previous: [],
        current: []
      });
    }
  }, {
    key: "_logEvent",
    value: function _logEvent(event, isCheckout) {
      logger.log("Recorder: ".concat(isCheckout ? 'checkout' : '', " event\n"), function (e) {
        var seen = new WeakSet();
        return JSON.stringify(e, function (_, v) {
          if (recorder_typeof(v) === 'object' && v !== null) {
            if (seen.has(v)) return '[Circular]';
            seen.add(v);
          }
          return v;
        }, 2);
      }(event));
    }

    /**
     * Helps the application correctly align playback by adding a noop event
     * to the end of the recording.
     **/
  }, {
    key: "_addEndEvent",
    value: function _addEndEvent(recordingSpan, replayId) {
      recordingSpan.addEvent('rrweb-replay-events', {
        eventType: 5,
        json: JSON.stringify({
          tag: "replay.end",
          payload: {}
        })
      }, hrtime.fromMillis(Date.now()));
    }
  }]);
}();

;// ./src/browser/rollbar.js








core.setComponents({
  telemeter: telemetry,
  instrumenter: browser_telemetry,
  wrapGlobals: browser_wrapGlobals,
  scrub: src_scrub,
  truncation: truncation,
  tracing: Tracing,
  recorder: Recorder
});
/* harmony default export */ var browser_rollbar = (core);
;// ./src/browser/bundles/rollbar.js

var options = typeof window !== 'undefined' && window._rollbarConfig;
var alias = options && options.globalAlias || 'Rollbar';
var shimRunning = typeof window !== 'undefined' && window[alias] && typeof window[alias].shimId === 'function' && window[alias].shimId() !== undefined;
if (typeof window !== 'undefined' && !window._rollbarStartTime) {
  window._rollbarStartTime = new Date().getTime();
}
if (!shimRunning && options) {
  var rollbar_Rollbar = new browser_rollbar(options);
  window[alias] = rollbar_Rollbar;
} else if (typeof window !== 'undefined') {
  window.rollbar = browser_rollbar;
  window._rollbarDidLoad = true;
} else if (typeof self !== 'undefined') {
  self.rollbar = browser_rollbar;
  self._rollbarDidLoad = true;
}
/* harmony default export */ var bundles_rollbar = (browser_rollbar);
}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=rollbar.named-amd.js.map