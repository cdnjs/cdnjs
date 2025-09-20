/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ server_rollbar)
});

;// external "util"
const external_util_namespaceObject = require("util");
;// external "os"
const external_os_namespaceObject = require("os");
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
/* harmony default export */ const src_merge = (merge);
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
/* harmony default export */ const rateLimiter = (RateLimiter);
;// ./src/queue.js
function queue_typeof(o) { "@babel/helpers - typeof"; return queue_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, queue_typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == queue_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(queue_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == queue_typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != queue_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != queue_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/**
 * Queue - an object which handles which handles a queue of items to be sent to Rollbar.
 *   This object handles rate limiting via a passed in rate limiter, retries based on connection
 *   errors, and filtering of items based on a set of configurable predicates. The communication to
 *   the backend is performed via a given API object.
 */
var Queue = /*#__PURE__*/function () {
  /**
   * @param rateLimiter - An object which conforms to the interface
   *    `rateLimiter.shouldSend(item) -> bool`
   * @param api - An object which conforms to the interface
   *    `api.postItem(payload, function(err, response))`
   * @param logger - An object used to log verbose messages if desired
   * @param options - see `Queue.prototype.configure`
   * @param replayManager - Optional `ReplayManager` for coordinating session replay with error occurrences
   */
  function Queue(rateLimiter, api, logger, options, replayManager) {
    _classCallCheck(this, Queue);
    this.rateLimiter = rateLimiter;
    this.api = api;
    this.logger = logger;
    this.options = options;
    this.replayManager = replayManager;
    this.predicates = [];
    this.pendingItems = [];
    this.pendingRequests = [];
    this.retryQueue = [];
    this.retryHandle = null;
    this.waitCallback = null;
    this.waitIntervalID = null;
  }

  /**
   * configure - updates the options this queue uses
   *
   * @param options
   */
  return _createClass(Queue, [{
    key: "configure",
    value: function configure(options) {
      var _this$api;
      (_this$api = this.api) === null || _this$api === void 0 || _this$api.configure(options);
      var oldOptions = this.options;
      this.options = src_merge(oldOptions, options);
      return this;
    }

    /**
     * addPredicate - adds a predicate to the end of the list of predicates for this queue
     *
     * @param predicate - function(item, options) -> (bool|{err: Error})
     *  Returning true means that this predicate passes and the item is okay to go on the queue
     *  Returning false means do not add the item to the queue, but it is not an error
     *  Returning {err: Error} means do not add the item to the queue, and the given error explains why
     *  Returning {err: undefined} is equivalent to returning true but don't do that
     */
  }, {
    key: "addPredicate",
    value: function addPredicate(predicate) {
      if (isFunction(predicate)) {
        this.predicates.push(predicate);
      }
      return this;
    }
  }, {
    key: "addPendingItem",
    value: function addPendingItem(item) {
      this.pendingItems.push(item);
    }
  }, {
    key: "removePendingItem",
    value: function removePendingItem(item) {
      var idx = this.pendingItems.indexOf(item);
      if (idx !== -1) {
        this.pendingItems.splice(idx, 1);
      }
    }

    /**
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
  }, {
    key: "addItem",
    value: function addItem(item, callback, originalError, originalItem) {
      var _this = this;
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
      if (this.replayManager && data.body) {
        var replayId = getItemAttribute(data, 'replay_id');
        if (replayId) {
          item.replayId = this.replayManager.add(replayId, data.uuid);
        }
      }
      this.pendingRequests.push(data);
      try {
        this._makeApiRequest(data, function (err, resp, headers) {
          _this._dequeuePendingRequest(data);
          if (!err && resp && item.replayId) {
            _this._handleReplayResponse(item.replayId, resp, headers);
          }
          callback(err, resp);
        });
      } catch (e) {
        this._dequeuePendingRequest(data);
        callback(e);
      }
    }

    /**
     * wait - Stop any further errors from being added to the queue, and get called back when all items
     *   currently processing have finished sending to the backend.
     *
     * @param callback - function() called when all pending items have been sent
     */
  }, {
    key: "wait",
    value: function wait(callback) {
      var _this2 = this;
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
        _this2._maybeCallWait();
      }, 500);
    }

    /**
     * Sequentially applies the predicates that have been added to the queue to the
     * given item with the currently configured options.
     *
     * @param item - An item in the queue
     * @returns {stop: bool, err: (Error|null)} - stop being true means do not add item to the queue,
     *   the error value should be passed up to a callbak if we are stopping.
     */
  }, {
    key: "_applyPredicates",
    value: function _applyPredicates(item) {
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
    }

    /**
     * Send an item to Rollbar, callback when done, if there is an error make an
     * effort to retry if we are configured to do so.
     *
     * @param item - an item ready to send to the backend
     * @param callback - function(err, response)
     */
  }, {
    key: "_makeApiRequest",
    value: function _makeApiRequest(item, callback) {
      var _this3 = this;
      var rateLimitResponse = this.rateLimiter.shouldSend(item);
      if (rateLimitResponse.shouldSend) {
        this.api.postItem(item, function (err, resp, headers) {
          if (err) {
            _this3._maybeRetry(err, item, callback);
          } else {
            callback(err, resp, headers);
          }
        });
      } else if (rateLimitResponse.error) {
        callback(rateLimitResponse.error);
      } else {
        this.api.postItem(rateLimitResponse.payload, callback);
      }
    }

    // These are errors basically mean there is no internet connection
  }, {
    key: "_maybeRetry",
    value:
    /**
     * Given the error returned by the API, decide if we should retry or just callback
     * with the error.
     *
     * @param err - an error returned by the API transport
     * @param item - the item that was trying to be sent when this error occured
     * @param callback - function(err, response)
     */
    function _maybeRetry(err, item, callback) {
      var shouldRetry = false;
      if (this.options.retryInterval) {
        for (var i = 0, len = Queue.RETRIABLE_ERRORS.length; i < len; i++) {
          if (err.code === Queue.RETRIABLE_ERRORS[i]) {
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
    }

    /**
     * Add an item and a callback to a queue and possibly start a timer to process
     * that queue based on the retryInterval in the options for this queue.
     *
     * @param item - an item that failed to send due to an error we deem retriable
     * @param callback - function(err, response)
     */
  }, {
    key: "_retryApiRequest",
    value: function _retryApiRequest(item, callback) {
      var _this4 = this;
      this.retryQueue.push({
        item: item,
        callback: callback
      });
      if (!this.retryHandle) {
        this.retryHandle = setInterval(function () {
          while (_this4.retryQueue.length) {
            var retryObject = _this4.retryQueue.shift();
            _this4._makeApiRequest(retryObject.item, retryObject.callback);
          }
        }, this.options.retryInterval);
      }
    }

    /**
     * Removes the item from the pending request queue, this queue is used to
     * enable to functionality of providing a callback that clients can pass to `wait` to be notified
     * when the pending request queue has been emptied. This must be called when the API finishes
     * processing this item. If a `wait` callback is configured, it is called by this function.
     *
     * @param item - the item previously added to the pending request queue
     */
  }, {
    key: "_dequeuePendingRequest",
    value: function _dequeuePendingRequest(item) {
      var idx = this.pendingRequests.indexOf(item);
      if (idx !== -1) {
        this.pendingRequests.splice(idx, 1);
        this._maybeCallWait();
      }
    }
  }, {
    key: "_maybeLog",
    value: function _maybeLog(data, originalError) {
      if (this.logger && this.options.verbose) {
        var message = originalError || get(data, 'body.trace.exception.message') || get(data, 'body.trace_chain.0.exception.message');
        if (message) {
          this.logger.error(message);
          return;
        }
        message = get(data, 'body.message.body');
        if (message) {
          this.logger.log(message);
        }
      }
    }
  }, {
    key: "_maybeCallWait",
    value: function _maybeCallWait() {
      if (isFunction(this.waitCallback) && this.pendingItems.length === 0 && this.pendingRequests.length === 0) {
        if (this.waitIntervalID) {
          this.waitIntervalID = clearInterval(this.waitIntervalID);
        }
        this.waitCallback();
        return true;
      }
      return false;
    }

    /**
     * Handles the API response for an item with a replay ID.
     * Based on the success or failure status of the response,
     * it either sends or discards the associated session replay.
     *
     * @param {string} replayId - The ID of the replay to handle
     * @param {Object} response - The API response
     * @param {Object} headers - The response headers
     * @returns {Promise<boolean>} A promise that resolves to true if replay was sent successfully,
     *                             false if replay was discarded or an error occurred
     */
  }, {
    key: "_handleReplayResponse",
    value: (function () {
      var _handleReplayResponse2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(replayId, response, headers) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (this.replayManager) {
                _context.next = 3;
                break;
              }
              console.warn('Queue._handleReplayResponse: ReplayManager not available');
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
              return this.replayManager.send(replayId);
            case 10:
              return _context.abrupt("return", _context.sent);
            case 13:
              this.replayManager.discard(replayId);
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
      function _handleReplayResponse(_x, _x2, _x3) {
        return _handleReplayResponse2.apply(this, arguments);
      }
      return _handleReplayResponse;
    }())
  }, {
    key: "_shouldSendReplay",
    value: function _shouldSendReplay(response, headers) {
      if ((response === null || response === void 0 ? void 0 : response.err) !== 0 || !headers || headers['Rollbar-Replay-Enabled'] !== 'true' || headers['Rollbar-Replay-RateLimit-Remaining'] === '0') {
        return false;
      }
      return true;
    }
  }]);
}();
_defineProperty(Queue, "RETRIABLE_ERRORS", ['ECONNRESET', 'ENOTFOUND', 'ESOCKETTIMEDOUT', 'ETIMEDOUT', 'ECONNREFUSED', 'EHOSTUNREACH', 'EPIPE', 'EAI_AGAIN']);
/* harmony default export */ const queue = (Queue);
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
/* harmony default export */ const notifier = (Notifier);
;// ./src/browser/replay/replayPredicates.js
function replayPredicates_typeof(o) { "@babel/helpers - typeof"; return replayPredicates_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, replayPredicates_typeof(o); }
function replayPredicates_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = replayPredicates_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function replayPredicates_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return replayPredicates_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? replayPredicates_arrayLikeToArray(r, a) : void 0; } }
function replayPredicates_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function replayPredicates_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function replayPredicates_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, replayPredicates_toPropertyKey(o.key), o); } }
function replayPredicates_createClass(e, r, t) { return r && replayPredicates_defineProperties(e.prototype, r), t && replayPredicates_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function replayPredicates_defineProperty(e, r, t) { return (r = replayPredicates_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function replayPredicates_toPropertyKey(t) { var i = replayPredicates_toPrimitive(t, "string"); return "symbol" == replayPredicates_typeof(i) ? i : i + ""; }
function replayPredicates_toPrimitive(t, r) { if ("object" != replayPredicates_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != replayPredicates_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    replayPredicates_classCallCheck(this, ReplayPredicates);
    replayPredicates_defineProperty(this, "maxAdjustedCount", Math.pow(2, 56));
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
  return replayPredicates_createClass(ReplayPredicates, [{
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
function Rollbar(options, api, logger, telemeter, tracing, replayManager, platform) {
  this.options = src_merge(options);
  this.logger = logger;
  Rollbar.rateLimiter.configureGlobal(this.options);
  Rollbar.rateLimiter.setPlatformOptions(platform, this.options);
  this.api = api;
  this.queue = new queue(Rollbar.rateLimiter, api, logger, this.options, replayManager);
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
/* harmony default export */ const rollbar = (Rollbar);
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
    options = _ref.options,
    payload = _ref.payload,
    headers = _ref.headers;
  var self = this;
  return new Promise(function (resolve, reject) {
    self.transport.post({
      accessToken: accessToken,
      options: options,
      payload: payload,
      headers: headers,
      callback: function callback(err, resp) {
        return err ? reject(err) : resolve(resp);
      }
    });
  });
};

/**
 *
 * @param data
 * @param callback
 */
Api.prototype.postItem = function (data, callback) {
  var options = apiUtility_transportOptions(this.transportOptions, 'POST');
  var payload = buildPayload(data);
  var self = this;

  // ensure the network request is scheduled after the current tick.
  setTimeout(function () {
    self.transport.post({
      accessToken: self.accessToken,
      options: options,
      payload: payload,
      callback: callback
    });
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
    var headers,
      options,
      _args = arguments;
    return api_regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          headers = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          options = apiUtility_transportOptions(this.OTLPTransportOptions, 'POST');
          _context.next = 4;
          return this._postPromise({
            accessToken: this.accessToken,
            options: options,
            payload: payload,
            headers: headers
          });
        case 4:
          return _context.abrupt("return", _context.sent);
        case 5:
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
/* harmony default export */ const src_api = (Api);
;// ./src/server/logger.js
var verbose = true;
var logger = {
  /* eslint-disable no-console */
  log: function log() {
    if (verbose) {
      console.log.apply(console, arguments);
    }
  },
  error: function error() {
    if (verbose) {
      console.error.apply(console, arguments);
    }
  },
  /* eslint-enable no-console */
  setVerbose: function setVerbose(val) {
    verbose = val;
  }
};
/* harmony default export */ const server_logger = (logger);
;// ./src/defaults.js
/**
 * Default options shared across platforms
 */
var version = '3.0.0-beta.3';
var endpoint = 'api.rollbar.com/api/1/item/';
var logLevel = 'debug';
var reportLevel = 'debug';
var uncaughtErrorLevel = 'error';
var maxItems = 0;
var itemsPerMin = 60;
var commonScrubFields = ['pw', 'pass', 'passwd', 'password', 'secret', 'confirm_password', 'confirmPassword', 'password_confirmation', 'passwordConfirmation', 'access_token', 'accessToken', 'X-Rollbar-Access-Token', 'secret_key', 'secretKey', 'secretToken'];
var apiScrubFields = ['api_key', 'authenticity_token', 'oauth_token', 'token', 'user_session_secret'];
var requestScrubFields = ['request.session.csrf', 'request.session._csrf', 'request.params._csrf', 'request.cookie', 'request.cookies'];
var commonScrubHeaders = ['authorization', 'www-authorization', 'http_authorization', 'omniauth.auth', 'cookie', 'oauth-access-token', 'x-access-token', 'x_csrf_token', 'http_x_csrf_token', 'x-csrf-token'];

// For backward compatibility with default export
/* harmony default export */ const defaults = ({
  version: version,
  endpoint: endpoint,
  logLevel: logLevel,
  reportLevel: reportLevel,
  uncaughtErrorLevel: uncaughtErrorLevel,
  maxItems: maxItems,
  itemsPerMin: itemsPerMin
});
;// ./src/server/defaults.js
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || defaults_unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function defaults_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return defaults_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? defaults_arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return defaults_arrayLikeToArray(r); }
function defaults_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Default server-side application options
 */

var notifierName = 'node_rollbar';
var scrubHeaders = commonScrubHeaders;
var scrubFields = [].concat(_toConsumableArray(commonScrubFields), _toConsumableArray(apiScrubFields), _toConsumableArray(requestScrubFields));
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
/* harmony default export */ const utility_traverse = (traverse);
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
/* harmony default export */ const truncation = ({
  truncate: truncate,
  /* for testing */
  raw: raw,
  truncateFrames: truncateFrames,
  truncateStrings: truncateStrings,
  maybeTruncateValue: maybeTruncateValue
});
;// external "http"
const external_http_namespaceObject = require("http");
;// external "https"
const external_https_namespaceObject = require("https");
;// external "json-stringify-safe"
const external_json_stringify_safe_namespaceObject = require("json-stringify-safe");
;// ./src/server/transport.js






var MAX_RATE_LIMIT_INTERVAL = 60;

/*
 * accessToken may be embedded in payload but that should not be assumed
 *
 * options: {
 *   hostname
 *   protocol
 *   path
 *   port
 *   method
 * }
 *
 * params is an object containing key/value pairs to be
 *    appended to the path as 'key=value&key=value'
 *
 * payload is an unserialized object
 */
function Transport() {
  this.rateLimitExpires = 0;
}
Transport.prototype.get = function (accessToken, options, params, callback, transportFactory) {
  var t;
  if (!callback || !isFunction(callback)) {
    callback = function callback() {};
  }
  options = options || {};
  addParamsAndAccessTokenToPath(accessToken, options, params);
  options.headers = _headers(accessToken, options);
  if (transportFactory) {
    t = transportFactory(options);
  } else {
    t = _transport(options);
  }
  if (!t) {
    server_logger.error('Unknown transport based on given protocol: ' + options.protocol);
    return callback(new Error('Unknown transport'));
  }
  var req = t.request(options, function (resp) {
    this.handleResponse(resp, callback);
  }.bind(this));
  req.on('error', function (err) {
    callback(err);
  });
  req.end();
};
Transport.prototype.post = function (_ref) {
  var accessToken = _ref.accessToken,
    options = _ref.options,
    payload = _ref.payload,
    callback = _ref.callback,
    transportFactory = _ref.transportFactory;
  var t;
  if (!callback || !isFunction(callback)) {
    callback = function callback() {};
  }
  if (_currentTime() < this.rateLimitExpires) {
    return callback(new Error('Exceeded rate limit'));
  }
  options = options || {};
  if (!payload) {
    return callback(new Error('Cannot send empty request'));
  }
  var stringifyResult = truncation.truncate(payload, external_json_stringify_safe_namespaceObject);
  if (stringifyResult.error) {
    server_logger.error('Problem stringifying payload. Giving up');
    return callback(stringifyResult.error);
  }
  var writeData = stringifyResult.value;
  options.headers = _headers(accessToken, options, writeData);
  if (transportFactory) {
    t = transportFactory(options);
  } else {
    t = _transport(options);
  }
  if (!t) {
    server_logger.error('Unknown transport based on given protocol: ' + options.protocol);
    return callback(new Error('Unknown transport'));
  }
  var req = t.request(options, function (resp) {
    this.handleResponse(resp, _wrapPostCallback(callback));
  }.bind(this));
  req.on('error', function (err) {
    callback(err);
  });
  if (writeData) {
    req.write(writeData);
  }
  req.end();
};
Transport.prototype.updateRateLimit = function (resp) {
  var remaining = parseInt(resp.headers['x-rate-limit-remaining'] || 0);
  var remainingSeconds = Math.min(MAX_RATE_LIMIT_INTERVAL, resp.headers['x-rate-limit-remaining-seconds'] || 0);
  var currentTime = _currentTime();
  if (resp.statusCode === 429 && remaining === 0) {
    this.rateLimitExpires = currentTime + remainingSeconds;
  } else {
    this.rateLimitExpires = currentTime;
  }
};
Transport.prototype.handleResponse = function (resp, callback) {
  this.updateRateLimit(resp);
  var respData = [];
  resp.setEncoding('utf8');
  resp.on('data', function (chunk) {
    respData.push(chunk);
  });
  resp.on('end', function () {
    respData = respData.join('');
    _parseApiResponse(respData, callback);
  });
};

/** Helpers **/

function _headers(accessToken, options, data) {
  var headers = options && options.headers || {};
  headers['Content-Type'] = 'application/json';
  if (data) {
    try {
      headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
    } catch (e) {
      server_logger.error('Could not get the content length of the data');
    }
  }
  headers['X-Rollbar-Access-Token'] = accessToken;
  return headers;
}
function _transport(options) {
  return {
    'http:': external_http_namespaceObject,
    'https:': external_https_namespaceObject
  }[options.protocol];
}
function _parseApiResponse(data, callback) {
  var parsedData = jsonParse(data);
  if (parsedData.error) {
    server_logger.error('Could not parse api response, err: ' + parsedData.error);
    return callback(parsedData.error);
  }
  data = parsedData.value;
  if (data.err) {
    server_logger.error('Received error: ' + data.message);
    return callback(new Error('Api error: ' + (data.message || 'Unknown error')));
  }
  callback(null, data);
}
function _wrapPostCallback(callback) {
  return function (err, data) {
    if (err) {
      return callback(err);
    }
    if (data.result && data.result.uuid) {
      server_logger.log(['Successful api response.', ' Link: https://rollbar.com/occurrence/uuid/?uuid=' + data.result.uuid].join(''));
    } else {
      server_logger.log('Successful api response');
    }
    callback(null, data.result);
  };
}
function _currentTime() {
  return Math.floor(Date.now() / 1000);
}
/* harmony default export */ const server_transport = (Transport);
;// external "url"
const external_url_namespaceObject = require("url");
;// ./src/telemetry.js
var _excluded = ["otelAttributes"];
function telemetry_typeof(o) { "@babel/helpers - typeof"; return telemetry_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, telemetry_typeof(o); }
function telemetry_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function telemetry_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? telemetry_ownKeys(Object(t), !0).forEach(function (r) { telemetry_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : telemetry_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function telemetry_defineProperty(e, r, t) { return (r = telemetry_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function telemetry_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function telemetry_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, telemetry_toPropertyKey(o.key), o); } }
function telemetry_createClass(e, r, t) { return r && telemetry_defineProperties(e.prototype, r), t && telemetry_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function telemetry_toPropertyKey(t) { var i = telemetry_toPrimitive(t, "string"); return "symbol" == telemetry_typeof(i) ? i : i + ""; }
function telemetry_toPrimitive(t, r) { if ("object" != telemetry_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != telemetry_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var MAX_EVENTS = 100;

// Temporary workaround while solving commonjs -> esm issues in Node 18 - 20.
function fromMillis(millis) {
  return [Math.trunc(millis / 1000), Math.round(millis % 1000 * 1e6)];
}
var Telemeter = /*#__PURE__*/function () {
  function Telemeter(options, tracing) {
    var _this$tracing;
    telemetry_classCallCheck(this, Telemeter);
    this.queue = [];
    this.options = src_merge(options);
    var maxTelemetryEvents = this.options.maxTelemetryEvents || MAX_EVENTS;
    this.maxQueueSize = Math.max(0, Math.min(maxTelemetryEvents, MAX_EVENTS));
    this.tracing = tracing;
    this.telemetrySpan = (_this$tracing = this.tracing) === null || _this$tracing === void 0 ? void 0 : _this$tracing.startSpan('rollbar-telemetry', {});
  }
  return telemetry_createClass(Telemeter, [{
    key: "configure",
    value: function configure(options) {
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
    }
  }, {
    key: "copyEvents",
    value: function copyEvents() {
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

      // Filter until supported in legacy telemetry
      events = events.filter(function (e) {
        return e.type !== 'connectivity';
      });

      // Remove internal keys from output
      events = events.map(function (_ref) {
        var otelAttributes = _ref.otelAttributes,
          event = _objectWithoutProperties(_ref, _excluded);
        return event;
      });
      return events;
    }
  }, {
    key: "exportTelemetrySpan",
    value: function exportTelemetrySpan() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (this.telemetrySpan) {
        this.telemetrySpan.end(attributes);
        this.telemetrySpan = this.tracing.startSpan('rollbar-telemetry', {});
      }
    }
  }, {
    key: "capture",
    value: function capture(type, metadata, level, rollbarUUID) {
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
    }
  }, {
    key: "captureEvent",
    value: function captureEvent(type, metadata, level, rollbarUUID) {
      return this.capture(type, metadata, level, rollbarUUID);
    }
  }, {
    key: "captureError",
    value: function captureError(err, level, rollbarUUID, timestamp) {
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
    }
  }, {
    key: "captureLog",
    value: function captureLog(message, level, rollbarUUID, timestamp) {
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
    }
  }, {
    key: "captureNetwork",
    value: function captureNetwork(metadata, subtype, rollbarUUID, requestData) {
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
    }
  }, {
    key: "levelFromStatus",
    value: function levelFromStatus(statusCode) {
      if (statusCode >= 200 && statusCode < 400) {
        return 'info';
      }
      if (statusCode === 0 || statusCode >= 400) {
        return 'error';
      }
      return 'info';
    }
  }, {
    key: "captureDom",
    value: function captureDom(subtype, element, value, checked, rollbarUUID) {
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
    }
  }, {
    key: "captureInput",
    value: function captureInput(_ref2) {
      var _this$telemetrySpan5;
      var type = _ref2.type,
        isSynthetic = _ref2.isSynthetic,
        element = _ref2.element,
        value = _ref2.value,
        timestamp = _ref2.timestamp;
      var name = 'rollbar-input-event';
      var metadata = {
        type: name,
        subtype: type,
        element: element,
        value: value
      };
      var otelAttributes = {
        type: type,
        isSynthetic: isSynthetic,
        element: element,
        value: value,
        endTimeUnixNano: fromMillis(timestamp)
      };
      var event = this._getRepeatedEvent(name, otelAttributes);
      if (event) {
        return this._updateRepeatedEvent(event, otelAttributes, timestamp);
      }
      (_this$telemetrySpan5 = this.telemetrySpan) === null || _this$telemetrySpan5 === void 0 || _this$telemetrySpan5.addEvent(name, otelAttributes, fromMillis(timestamp));
      return this.capture('dom', metadata, 'info', null, timestamp, otelAttributes);
    }
  }, {
    key: "captureClick",
    value: function captureClick(_ref3) {
      var _this$telemetrySpan6;
      var type = _ref3.type,
        isSynthetic = _ref3.isSynthetic,
        element = _ref3.element,
        timestamp = _ref3.timestamp;
      var name = 'rollbar-click-event';
      var metadata = {
        type: name,
        subtype: type,
        element: element
      };
      var otelAttributes = {
        type: type,
        isSynthetic: isSynthetic,
        element: element,
        endTimeUnixNano: fromMillis(timestamp)
      };
      var event = this._getRepeatedEvent(name, otelAttributes);
      if (event) {
        return this._updateRepeatedEvent(event, otelAttributes, timestamp);
      }
      (_this$telemetrySpan6 = this.telemetrySpan) === null || _this$telemetrySpan6 === void 0 || _this$telemetrySpan6.addEvent(name, otelAttributes, fromMillis(timestamp));
      return this.capture('dom', metadata, 'info', null, timestamp, otelAttributes);
    }
  }, {
    key: "_getRepeatedEvent",
    value: function _getRepeatedEvent(name, attributes) {
      var lastEvent = this._lastEvent(this.queue);
      if (lastEvent && lastEvent.body.type === name && lastEvent.otelAttributes.target === attributes.target) {
        return lastEvent;
      }
    }
  }, {
    key: "_updateRepeatedEvent",
    value: function _updateRepeatedEvent(event, attributes, timestamp) {
      var duration = Math.max(timestamp - event.timestamp_ms, 1);
      event.body.value = attributes.value;
      event.otelAttributes.value = attributes.value;
      event.otelAttributes.height = attributes.height;
      event.otelAttributes.width = attributes.width;
      event.otelAttributes.textZoomRatio = attributes.textZoomRatio;
      event.otelAttributes['endTimeUnixNano'] = fromMillis(timestamp);
      event.otelAttributes['durationUnixNano'] = fromMillis(duration);
      event.otelAttributes.count = (event.otelAttributes.count || 1) + 1;
      event.otelAttributes.ratio = event.otelAttributes.count / (duration / 1000);
    }
  }, {
    key: "_lastEvent",
    value: function _lastEvent(list) {
      return list.length > 0 ? list[list.length - 1] : null;
    }
  }, {
    key: "captureFocus",
    value: function captureFocus(_ref4) {
      var _this$telemetrySpan7;
      var type = _ref4.type,
        isSynthetic = _ref4.isSynthetic,
        element = _ref4.element,
        timestamp = _ref4.timestamp;
      var name = 'rollbar-focus-event';
      var metadata = {
        type: name,
        subtype: type,
        element: element
      };
      var otelAttributes = {
        type: type,
        isSynthetic: isSynthetic,
        element: element
      };
      (_this$telemetrySpan7 = this.telemetrySpan) === null || _this$telemetrySpan7 === void 0 || _this$telemetrySpan7.addEvent(name, otelAttributes, fromMillis(timestamp));
      return this.capture('dom', metadata, 'info', null, timestamp, otelAttributes);
    }
  }, {
    key: "captureResize",
    value: function captureResize(_ref5) {
      var _this$telemetrySpan8;
      var type = _ref5.type,
        isSynthetic = _ref5.isSynthetic,
        width = _ref5.width,
        height = _ref5.height,
        textZoomRatio = _ref5.textZoomRatio,
        timestamp = _ref5.timestamp;
      var name = 'rollbar-resize-event';
      var metadata = {
        type: name,
        subtype: type,
        width: width,
        height: height,
        textZoomRatio: textZoomRatio
      };
      var otelAttributes = {
        type: type,
        isSynthetic: isSynthetic,
        width: width,
        height: height,
        textZoomRatio: textZoomRatio
      };
      var event = this._getRepeatedEvent(name, otelAttributes);
      if (event) {
        return this._updateRepeatedEvent(event, otelAttributes, timestamp);
      }
      (_this$telemetrySpan8 = this.telemetrySpan) === null || _this$telemetrySpan8 === void 0 || _this$telemetrySpan8.addEvent(name, otelAttributes, fromMillis(timestamp));
      return this.capture('dom', metadata, 'info', null, timestamp, otelAttributes);
    }
  }, {
    key: "captureDragDrop",
    value: function captureDragDrop(_ref6) {
      var _this$telemetrySpan9;
      var type = _ref6.type,
        isSynthetic = _ref6.isSynthetic,
        element = _ref6.element,
        dropEffect = _ref6.dropEffect,
        effectAllowed = _ref6.effectAllowed,
        kinds = _ref6.kinds,
        mediaTypes = _ref6.mediaTypes,
        timestamp = _ref6.timestamp;
      var name = 'rollbar-dragdrop-event';
      var metadata = {
        type: name,
        subtype: type,
        isSynthetic: isSynthetic
      };
      var otelAttributes = {
        type: type,
        isSynthetic: isSynthetic
      };
      if (type === 'dragstart') {
        metadata = telemetry_objectSpread(telemetry_objectSpread({}, metadata), {}, {
          element: element,
          dropEffect: dropEffect,
          effectAllowed: effectAllowed
        });
        otelAttributes = telemetry_objectSpread(telemetry_objectSpread({}, otelAttributes), {}, {
          element: element,
          dropEffect: dropEffect,
          effectAllowed: effectAllowed
        });
      }
      if (type === 'drop') {
        metadata = telemetry_objectSpread(telemetry_objectSpread({}, metadata), {}, {
          element: element,
          dropEffect: dropEffect,
          effectAllowed: effectAllowed,
          kinds: kinds,
          mediaTypes: mediaTypes
        });
        otelAttributes = telemetry_objectSpread(telemetry_objectSpread({}, otelAttributes), {}, {
          element: element,
          dropEffect: dropEffect,
          effectAllowed: effectAllowed,
          kinds: kinds,
          mediaTypes: mediaTypes
        });
      }
      (_this$telemetrySpan9 = this.telemetrySpan) === null || _this$telemetrySpan9 === void 0 || _this$telemetrySpan9.addEvent(name, otelAttributes, fromMillis(timestamp));
      return this.capture('dom', metadata, 'info', null, timestamp, otelAttributes);
    }
  }, {
    key: "captureNavigation",
    value: function captureNavigation(from, to, rollbarUUID, timestamp) {
      var _this$telemetrySpan10;
      (_this$telemetrySpan10 = this.telemetrySpan) === null || _this$telemetrySpan10 === void 0 || _this$telemetrySpan10.addEvent('rollbar-navigation-event', {
        'previous.url.full': from,
        'url.full': to
      }, fromMillis(timestamp));
      return this.capture('navigation', {
        from: from,
        to: to
      }, 'info', rollbarUUID, timestamp);
    }
  }, {
    key: "captureDomContentLoaded",
    value: function captureDomContentLoaded(ts) {
      return this.capture('navigation', {
        subtype: 'DOMContentLoaded'
      }, 'info', undefined, ts && ts.getTime());
      /**
       * If we decide to make this a dom event instead, then use the line below:
      return this.capture('dom', {subtype: 'DOMContentLoaded'}, 'info', undefined, ts && ts.getTime());
      */
    }
  }, {
    key: "captureLoad",
    value: function captureLoad(ts) {
      return this.capture('navigation', {
        subtype: 'load'
      }, 'info', undefined, ts && ts.getTime());
      /**
       * If we decide to make this a dom event instead, then use the line below:
      return this.capture('dom', {subtype: 'load'}, 'info', undefined, ts && ts.getTime());
      */
    }
  }, {
    key: "captureConnectivityChange",
    value: function captureConnectivityChange(_ref7) {
      var _this$telemetrySpan11;
      var type = _ref7.type,
        isSynthetic = _ref7.isSynthetic,
        timestamp = _ref7.timestamp;
      var name = 'rollbar-connectivity-event';
      var metadata = {
        type: name,
        subtype: type
      };
      var otelAttributes = {
        type: type,
        isSynthetic: isSynthetic
      };
      (_this$telemetrySpan11 = this.telemetrySpan) === null || _this$telemetrySpan11 === void 0 || _this$telemetrySpan11.addEvent(name, otelAttributes, fromMillis(timestamp));
      return this.capture('connectivity', metadata, 'info', null, timestamp, otelAttributes);
    }

    // Only intended to be used internally by the notifier
  }, {
    key: "_captureRollbarItem",
    value: function _captureRollbarItem(item) {
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
    }
  }, {
    key: "push",
    value: function push(e) {
      this.queue.push(e);
      if (this.queue.length > this.maxQueueSize) {
        this.queue.shift();
      }
    }
  }]);
}();
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
/* harmony default export */ const telemetry = (Telemeter);
;// ./src/utility/replace.js
function replace(obj, name, replacement, replacements, type) {
  var orig = obj[name];
  obj[name] = replacement(orig);
  if (replacements) {
    replacements[type].push([obj, name, orig]);
  }
}
/* harmony default export */ const utility_replace = (replace);
;// ./src/server/telemetry/urlHelpers.js



// This function replicates the relevant logic in node/lib/http.js as closely
// as possible in order to produce the same result. Therefore, the code is
// replicated as is, favoring the closest match to the original code without style changes.
//
// The code here is only used to build telemetry metadata and is not used to
// build actual http requests.
function mergeOptions(input, options, cb) {
  if (typeof input === 'string') {
    var urlStr = input;
    input = urlToHttpOptions(new external_url_namespaceObject.URL(urlStr));
  } else if (input && input instanceof external_url_namespaceObject.URL) {
    // url.URL instance
    input = urlToHttpOptions(input);
  } else {
    cb = options;
    options = input;
    input = null;
  }
  if (typeof options === 'function') {
    cb = options;
    options = input || {};
  } else {
    options = src_merge(input || {}, options);
  }
  return {
    options: options,
    cb: cb
  };
}

// This function replicates the relevant logic in node/lib/url.js as closely
// as possible in order to produce the same result. Therefore, the code is
// replicated as is, favoring the closest match to the original code without style changes.
//
// The code here is only used to build telemetry metadata and is not used to
// build actual http requests.
function urlToHttpOptions(url) {
  var options = {
    protocol: url.protocol,
    hostname: typeof url.hostname === 'string' && url.hostname.startsWith('[') ? url.hostname.slice(1, -1) : url.hostname,
    hash: url.hash,
    search: url.search,
    pathname: url.pathname,
    path: "".concat(url.pathname || '').concat(url.search || ''),
    href: url.href
  };
  if (url.port !== '') {
    options.port = Number(url.port);
  }
  if (url.username || url.password) {
    options.auth = "".concat(url.username, ":").concat(url.password);
  }
  return options;
}
function constructUrl(options) {
  var url = options.protocol || 'http:';
  url += '//';
  if (options.auth) {
    url += "".concat(options.auth, "@");
  }
  url += options.hostname || options.host || 'localhost';
  if (options.port) {
    url += ":".concat(options.port);
  }
  url += options.path || '/';
  return url;
}

;// ./src/server/telemetry.js





var telemetry_defaults = {
  network: true,
  networkResponseHeaders: false,
  networkRequestHeaders: false,
  log: true
};
function Instrumenter(options, telemeter, rollbar) {
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
  this.telemeter = telemeter;
  this.rollbar = rollbar;
  this.diagnostic = rollbar.client.notifier.diagnostic;
  this.replacements = {
    network: [],
    log: []
  };
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
};
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
};
Instrumenter.prototype.deinstrumentNetwork = function () {
  restore(this.replacements, 'network');
};
Instrumenter.prototype.instrumentNetwork = function () {
  utility_replace(external_http_namespaceObject, 'request', networkRequestWrapper.bind(this), this.replacements, 'network');
  utility_replace(external_https_namespaceObject, 'request', networkRequestWrapper.bind(this), this.replacements, 'network');
};
function networkRequestWrapper(orig) {
  var telemeter = this.telemeter;
  var self = this;
  return function (url, options, cb) {
    var mergedOptions = mergeOptions(url, options, cb);
    var metadata = {
      method: mergedOptions.options.method || 'GET',
      url: constructUrl(mergedOptions.options),
      status_code: null,
      start_time_ms: utility_now(),
      end_time_ms: null
    };
    if (self.autoInstrument.networkRequestHeaders) {
      metadata.request_headers = mergedOptions.options.headers;
    }
    telemeter.captureNetwork(metadata, 'http');

    // Call the original method with the original arguments and wrapped callback.
    var wrappedArgs = Array.from(arguments);
    var wrappedCallback = responseCallbackWrapper(self.autoInstrument, metadata, mergedOptions.cb);
    if (mergedOptions.cb) {
      wrappedArgs.pop();
    }
    wrappedArgs.push(wrappedCallback);
    var req = orig.apply(external_https_namespaceObject, wrappedArgs);
    req.on('error', function (err) {
      metadata.status_code = 0;
      metadata.error = [err.name, err.message].join(': ');
    });
    return req;
  };
}
function responseCallbackWrapper(options, metadata, callback) {
  return function (res) {
    metadata.end_time_ms = utility_now();
    metadata.status_code = res.statusCode;
    metadata.response = {};
    if (options.networkResponseHeaders) {
      metadata.response.headers = res.headers;
    }
    if (callback) {
      return callback.apply(undefined, arguments);
    }
  };
}
Instrumenter.prototype.captureNetwork = function (metadata, subtype, rollbarUUID) {
  return this.telemeter.captureNetwork(metadata, subtype, rollbarUUID);
};
Instrumenter.prototype.deinstrumentConsole = function () {
  restore(this.replacements, 'log');
};
Instrumenter.prototype.instrumentConsole = function () {
  var telemeter = this.telemeter;
  var stdout = process.stdout;
  utility_replace(stdout, 'write', function (orig) {
    return function (string) {
      telemeter.captureLog(string, 'info');
      return orig.apply(stdout, arguments);
    };
  }, this.replacements, 'log');
  var stderr = process.stderr;
  utility_replace(stderr, 'write', function (orig) {
    return function (string) {
      telemeter.captureLog(string, 'error');
      return orig.apply(stderr, arguments);
    };
  }, this.replacements, 'log');
};
function restore(replacements, type) {
  var b;
  while (replacements[type].length) {
    b = replacements[type].shift();
    b[0][b[1]] = b[2];
  }
}
/* harmony default export */ const server_telemetry = (Instrumenter);
;// external "async"
const external_async_namespaceObject = require("async");
;// external "fs"
const external_fs_namespaceObject = require("fs");
;// external "lru-cache"
const external_lru_cache_namespaceObject = require("lru-cache");
;// external "source-map"
const external_source_map_namespaceObject = require("source-map");
;// external "path"
const external_path_namespaceObject = require("path");
;// ./src/server/sourceMap/stackTrace.js




/**
 * Uses Node source-map to map transpiled JS stack locations to original
 * source file locations.
 *
 * The default behavior uses source map comments in the transpiled files
 * to identify the path of source maps. A later enhancement can allow
 * source map paths to be passed in by the caller.
 *
 * These functions are based on https://github.com/evanw/node-source-map-support/blob/master/source-map-support.js
 * simplified to target Node only, and optimized for Rollbar configuration scenarios.
 */

// Maps a file path to a string containing the file contents
var fileContentsCache = {};

// Maps a file path to a source map for that file
var sourceMapCache = {};

// Maps a file path to sourcesContent string
var sourcesContentCache = {};

// Regex for detecting source maps
var reSourceMap = /^data:application\/json[^,]+base64,/;
function retrieveFile(path) {
  // Trim the path to make sure there is no extra whitespace.
  path = path.trim();
  if (/^file:/.test(path)) {
    // existsSync/readFileSync can't handle file protocol, but once stripped, it works
    path = path.replace(/file:\/\/\/(\w:)?/, function (_protocol, drive) {
      return drive ? '' // file:///C:/dir/file -> C:/dir/file
      : '/'; // file:///root-dir/file -> /root-dir/file
    });
  }
  if (path in fileContentsCache) {
    return fileContentsCache[path];
  }
  var contents = '';
  try {
    if (external_fs_namespaceObject.existsSync(path)) {
      contents = external_fs_namespaceObject.readFileSync(path, 'utf8');
    }
  } catch (er) {
    /* ignore any errors */
  }
  return fileContentsCache[path] = contents;
}

// Support URLs relative to a directory, but be careful about a protocol prefix
// in case we are in the browser (i.e. directories may start with "http://" or "file:///")
function supportRelativeURL(file, url) {
  if (!file) return url;
  var dir = external_path_namespaceObject.dirname(file);
  var match = /^\w+:\/\/[^\/]*/.exec(dir);
  var protocol = match ? match[0] : '';
  var startPath = dir.slice(protocol.length);
  if (protocol && /^\/\w\:/.test(startPath)) {
    // handle file:///C:/ paths
    protocol += '/';
    return protocol + external_path_namespaceObject.resolve(dir.slice(protocol.length), url).replace(/\\/g, '/');
  }
  return protocol + external_path_namespaceObject.resolve(dir.slice(protocol.length), url);
}
function retrieveSourceMapURL(source) {
  var fileData;

  // Get the URL of the source map
  fileData = retrieveFile(source);
  var re = /(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^\*]+?)[ \t]*(?:\*\/)[ \t]*$)/gm;
  // Keep executing the search to find the *last* sourceMappingURL to avoid
  // picking up sourceMappingURLs from comments, strings, etc.
  var lastMatch, match;
  while (match = re.exec(fileData)) lastMatch = match;
  if (!lastMatch) return null;
  return lastMatch[1];
}

// Takes a generated source filename; returns a {map, optional url} object, or null if
// there is no source map.  The map field may be either a string or the parsed
// JSON object (ie, it must be a valid argument to the SourceMapConsumer
// constructor).
function retrieveSourceMap(source) {
  var sourceMappingURL = retrieveSourceMapURL(source);
  if (!sourceMappingURL) return null;

  // Read the contents of the source map
  var sourceMapData;
  if (reSourceMap.test(sourceMappingURL)) {
    // Support source map URL as a data url
    var rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(',') + 1);
    sourceMapData = Buffer.from(rawData, 'base64').toString();
    sourceMappingURL = source;
  } else {
    // Support source map URLs relative to the source URL
    sourceMappingURL = supportRelativeURL(source, sourceMappingURL);
    sourceMapData = retrieveFile(sourceMappingURL);
  }
  if (!sourceMapData) {
    return null;
  }
  return {
    url: sourceMappingURL,
    map: sourceMapData
  };
}
function cacheSourceContent(sourceMap, originalSource, newSource) {
  if (sourcesContentCache[newSource]) {
    return;
  }

  // The sourceContentFor lookup needs the original source url as found in the
  // map file. However the client lookup in sourcesContentCache will use
  // a rewritten form of the url, hence originalSource and newSource.
  sourcesContentCache[newSource] = sourceMap.map.sourceContentFor(originalSource, true);
}
function mapSourcePosition(position, diagnostic) {
  var sourceMap = sourceMapCache[position.source];
  if (!sourceMap) {
    // Call the (overrideable) retrieveSourceMap function to get the source map.
    var urlAndMap = retrieveSourceMap(position.source);
    if (urlAndMap) {
      sourceMap = sourceMapCache[position.source] = {
        url: urlAndMap.url,
        map: new external_source_map_namespaceObject.SourceMapConsumer(urlAndMap.map)
      };
      diagnostic.node_source_maps.source_mapping_urls[position.source] = urlAndMap.url;

      // Load all sources stored inline with the source map into the file cache
      // to pretend like they are already loaded. They may not exist on disk.
      if (sourceMap.map.sourcesContent) {
        sourceMap.map.sources.forEach(function (source, i) {
          var contents = sourceMap.map.sourcesContent[i];
          if (contents) {
            var url = supportRelativeURL(sourceMap.url, source);
            fileContentsCache[url] = contents;
          }
        });
      }
    } else {
      sourceMap = sourceMapCache[position.source] = {
        url: null,
        map: null
      };
      diagnostic.node_source_maps.source_mapping_urls[position.source] = 'not found';
    }
  }

  // Resolve the source URL relative to the URL of the source map
  if (sourceMap && sourceMap.map && typeof sourceMap.map.originalPositionFor === 'function') {
    var originalPosition = sourceMap.map.originalPositionFor(position);

    // Only return the original position if a matching line was found. If no
    // matching line is found then we return position instead, which will cause
    // the stack trace to print the path and line for the compiled file. It is
    // better to give a precise location in the compiled file than a vague
    // location in the original file.
    if (originalPosition.source !== null) {
      var originalSource = originalPosition.source;
      originalPosition.source = supportRelativeURL(sourceMap.url, originalPosition.source);
      cacheSourceContent(sourceMap, originalSource, originalPosition.source);
      return originalPosition;
    }
  }
  return position;
}
;
function stackTrace_sourceContent(source) {
  return sourcesContentCache[source];
}
;
;// ./src/server/parser.js
function parser_typeof(o) { "@babel/helpers - typeof"; return parser_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, parser_typeof(o); }






var linesOfContext = 3;
var tracePattern = /^\s*at (?:([^(]+(?: \[\w\s+\])?(?:.*\)*)) )?\(?(.+?)(?::(\d+):(\d+)(?:, <js>:(\d+):(\d+))?)?\)?$/;
var jadeTracePattern = /^\s*at .+ \(.+ (at[^)]+\))\)$/;
var jadeFramePattern = /^\s*(>?) [0-9]+\|(\s*.+)$/m;
var cache = new external_lru_cache_namespaceObject({
  max: 100
});
var pendingReads = {};


/*
 * Internal
 */

function getMultipleErrors(errors) {
  var errArray, key;
  if (errors === null || errors === undefined) {
    return null;
  }
  if (parser_typeof(errors) !== 'object') {
    return null;
  }
  if (external_util_namespaceObject.isArray(errors)) {
    return errors;
  }
  errArray = [];
  for (key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      errArray.push(errors[key]);
    }
  }
  return errArray;
}
function parseJadeDebugFrame(body) {
  var lines, lineNumSep, filename, lineno, numLines, msg, i, contextLine, preContext, postContext, line, jadeMatch;

  // Given a Jade exception body, return a frame object
  lines = body.split('\n');
  lineNumSep = lines[0].indexOf(':');
  filename = lines[0].slice(0, lineNumSep);
  lineno = parseInt(lines[0].slice(lineNumSep + 1), 10);
  numLines = lines.length;
  msg = lines[numLines - 1];
  lines = lines.slice(1, numLines - 1);
  preContext = [];
  postContext = [];
  for (i = 0; i < numLines - 2; ++i) {
    line = lines[i];
    jadeMatch = line.match(jadeFramePattern);
    if (jadeMatch) {
      if (jadeMatch[1] === '>') {
        contextLine = jadeMatch[2];
      } else {
        if (!contextLine) {
          if (jadeMatch[2]) {
            preContext.push(jadeMatch[2]);
          }
        } else {
          if (jadeMatch[2]) {
            postContext.push(jadeMatch[2]);
          }
        }
      }
    }
  }
  preContext = preContext.slice(0, Math.min(preContext.length, linesOfContext));
  postContext = postContext.slice(0, Math.min(postContext.length, linesOfContext));
  return {
    frame: {
      method: '<jade>',
      filename: filename,
      lineno: lineno,
      code: contextLine,
      context: {
        pre: preContext,
        post: postContext
      }
    },
    message: msg
  };
}
function extractContextLines(frame, fileLines) {
  frame.code = fileLines[frame.lineno - 1];
  frame.context = {
    pre: fileLines.slice(Math.max(0, frame.lineno - (linesOfContext + 1)), frame.lineno - 1),
    post: fileLines.slice(frame.lineno, frame.lineno + linesOfContext)
  };
}
function mapPosition(position, diagnostic) {
  return mapSourcePosition({
    source: position.source,
    line: position.line,
    column: position.column
  }, diagnostic);
}
function parseFrameLine(line, callback) {
  var matched, curLine, data, frame, position;
  curLine = line;
  matched = curLine.match(jadeTracePattern);
  if (matched) {
    curLine = matched[1];
  }
  matched = curLine.match(tracePattern);
  if (!matched) {
    return callback(null, null);
  }
  data = matched.slice(1);
  var runtimePosition = {
    source: data[1],
    line: Math.floor(data[2]),
    column: Math.floor(data[3]) - 1
  };
  if (this.useSourceMaps) {
    position = mapPosition(runtimePosition, this.diagnostic);
  } else {
    position = runtimePosition;
  }
  frame = {
    method: data[0] || '<unknown>',
    filename: position.source,
    lineno: position.line,
    colno: position.column,
    runtimePosition: runtimePosition // Used to match frames for locals
  };

  // For coffeescript, lineno and colno refer to the .coffee positions
  // The .js lineno and colno will be stored in compiled_*
  if (data[4]) {
    frame.compiled_lineno = Math.floor(data[4]);
  }
  if (data[5]) {
    frame.compiled_colno = Math.floor(data[5]);
  }
  callback(null, frame);
}
function shouldReadFrameFile(frameFilename, callback) {
  var isValidFilename, isCached, isPending;
  isValidFilename = frameFilename[0] === '/' || frameFilename[0] === '.';
  isCached = !!cache.get(frameFilename);
  isPending = !!pendingReads[frameFilename];
  callback(null, isValidFilename && !isCached && !isPending);
}
function readFileLines(filename, callback) {
  try {
    external_fs_namespaceObject.readFile(filename, function (err, fileData) {
      var fileLines;
      if (err) {
        return callback(err);
      }
      fileLines = fileData.toString('utf8').split('\n');
      return callback(null, fileLines);
    });
  } catch (e) {
    server_logger.log(e);
  }
}
function checkFileExists(filename, callback) {
  if (stackTrace_sourceContent(filename)) {
    return callback(null, true);
  }
  external_fs_namespaceObject.stat(filename, function (err) {
    callback(null, !err);
  });
}
function gatherContexts(frames, callback) {
  var frameFilenames = [];
  frames.forEach(function (frame) {
    if (frameFilenames.indexOf(frame.filename) === -1) {
      frameFilenames.push(frame.filename);
    }
  });
  external_async_namespaceObject.filter(frameFilenames, shouldReadFrameFile, function (err, results) {
    if (err) return callback(err);
    var tempFileCache;
    tempFileCache = {};
    function cacheLines(filename, lines) {
      // Cache this in a temp cache as well as the LRU cache so that
      // we know we will have all of the necessary file contents for
      // each filename in tempFileCache.
      tempFileCache[filename] = lines;
      cache.set(filename, lines);
    }
    function gatherFileData(filename, callback) {
      var sourceContent = stackTrace_sourceContent(filename);
      if (sourceContent) {
        try {
          var lines = sourceContent.split('\n');
          cacheLines(filename, lines);
          return callback(null);
        } catch (err) {
          return callback(err);
        }
      }
      readFileLines(filename, function (err, lines) {
        if (err) {
          return callback(err);
        }
        cacheLines(filename, lines);
        return callback(null);
      });
    }
    function gatherContextLines(frame, callback) {
      var lines = tempFileCache[frame.filename] || cache.get(frame.filename);
      if (lines) {
        extractContextLines(frame, lines);
      }
      callback(null);
    }
    external_async_namespaceObject.filter(results, checkFileExists, function (err, filenames) {
      if (err) return callback(err);
      external_async_namespaceObject.each(filenames, gatherFileData, function (err) {
        if (err) {
          return callback(err);
        }
        external_async_namespaceObject.eachSeries(frames, gatherContextLines, function (err) {
          if (err) {
            return callback(err);
          }
          callback(null, frames);
        });
      });
    });
  });
}

/*
 * Public API
 */

function parseException(exc, options, item, callback) {
  var multipleErrs = getMultipleErrors(exc.errors);
  return parseStack(exc.stack, options, item, function (err, stack) {
    var message, clss, ret, firstErr, jadeMatch, jadeData;
    if (err) {
      server_logger.error('could not parse exception, err: ' + err);
      return callback(err);
    }
    message = String(exc.message || '<no message>');
    clss = String(exc.name || '<unknown>');
    ret = {
      class: clss,
      message: message,
      frames: stack
    };
    if (multipleErrs && multipleErrs.length) {
      firstErr = multipleErrs[0];
      ret = {
        class: clss,
        message: String(firstErr.message || '<no message>'),
        frames: stack
      };
    }
    jadeMatch = message.match(jadeFramePattern);
    if (jadeMatch) {
      jadeData = parseJadeDebugFrame(message);
      ret.message = jadeData.message;
      ret.frames.push(jadeData.frame);
    }
    if (item.localsMap) {
      item.notifier.locals.mergeLocals(item.localsMap, stack, exc.stack, function (err) {
        if (err) {
          server_logger.error('could not parse locals, err: ' + err);

          // Don't reject the occurrence, record the error instead.
          item.diagnostic['error parsing locals'] = err;
        }
        return callback(null, ret);
      });
    } else {
      return callback(null, ret);
    }
  });
}
;
function parseStack(stack, options, item, callback) {
  var lines,
    _stack = stack;

  // Some JS frameworks (e.g. Meteor) might bury the stack property
  while (parser_typeof(_stack) === 'object') {
    _stack = _stack && _stack.stack;
  }

  // grab all lines except the first
  lines = (_stack || '').split('\n').slice(1);
  if (options.nodeSourceMaps) {
    item.diagnostic.node_source_maps = {};
    item.diagnostic.node_source_maps.source_mapping_urls = {};
  }

  // Parse out all of the frame and filename info
  external_async_namespaceObject.map(lines, parseFrameLine.bind({
    useSourceMaps: options.nodeSourceMaps,
    diagnostic: item.diagnostic
  }), function (err, frames) {
    if (err) {
      return callback(err);
    }
    frames.reverse();
    external_async_namespaceObject.filter(frames, function (frame, callback) {
      callback(null, !!frame);
    }, function (err, results) {
      if (err) return callback(err);
      gatherContexts(results, callback);
    });
  });
}
;
;// external "request-ip"
const external_request_ip_namespaceObject = require("request-ip");
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
/* harmony default export */ const src_scrub = (scrub);
;// ./src/server/transforms.js






function baseData(item, options, callback) {
  var environment = options.payload && options.payload.environment || options.environment;
  var data = {
    timestamp: Math.round(item.timestamp / 1000),
    environment: item.environment || environment,
    level: item.level || 'error',
    language: 'javascript',
    framework: item.framework || options.framework,
    uuid: item.uuid,
    notifier: JSON.parse(JSON.stringify(options.notifier)),
    custom: item.custom
  };
  if (options.codeVersion) {
    data.code_version = options.codeVersion;
  } else if (options.code_version) {
    data.code_version = options.code_version;
  }
  var props = Object.getOwnPropertyNames(item.custom || {});
  props.forEach(function (name) {
    if (!data.hasOwnProperty(name)) {
      data[name] = item.custom[name];
    }
  });
  data.server = {
    host: options.host,
    argv: process.argv.concat(),
    pid: process.pid
  };
  if (options.branch) {
    data.server.branch = options.branch;
  }
  if (options.root) {
    data.server.root = options.root;
  }
  item.data = data;
  callback(null, item);
}
function addMessageData(item, options, callback) {
  item.data = item.data || {};
  item.data.body = item.data.body || {};
  var message = item.message || 'Item sent with null or missing arguments.';
  item.data.body.message = {
    body: message
  };
  callback(null, item);
}
function addErrorData(item, options, callback) {
  if (item.stackInfo) {
    item.data = item.data || {};
    item.data.body = item.data.body || {};
    item.data.body.trace_chain = item.stackInfo;
  }
  callback(null, item);
}
function addBody(item, options, callback) {
  if (item.stackInfo) {
    addErrorData(item, options, callback);
  } else {
    addMessageData(item, options, callback);
  }
}
function handleItemWithError(item, options, callback) {
  if (!item.err) {
    return callback(null, item);
  }
  var err = item.err;
  var errors = [];
  var chain = [];
  do {
    errors.push(err);
    err = err.nested || err.cause;
  } while (err);
  item.stackInfo = chain;
  if (options.addErrorContext) {
    addErrorContext(item, errors);
  }
  var cb = function cb(e) {
    if (e) {
      item.message = item.err.message || item.err.description || item.message || String(item.err);
      item.diagnostic.buildTraceData = e.message;
      delete item.stackInfo;
    }
    callback(null, item);
  };
  external_async_namespaceObject.eachSeries(errors, _buildTraceData(chain, options, item), cb);
}
function addRequestData(item, options, callback) {
  item.data = item.data || {};
  var req = item.request;
  if (!req) {
    callback(null, item);
    return;
  }
  var baseUrl = req.baseUrl || '';
  if (options.addRequestData && isFunction(options.addRequestData)) {
    options.addRequestData(item.data, req);
    callback(null, item);
    return;
  }
  var requestData = _buildRequestData(req);
  filterIp(requestData, options.captureIp);
  item.data.request = requestData;
  var routePath;
  if (req.route) {
    routePath = req.route.path;
    item.data.context = baseUrl && baseUrl.length ? baseUrl + routePath : routePath;
  } else {
    try {
      routePath = req.app._router.matchRequest(req).path;
      item.data.context = baseUrl && baseUrl.length ? baseUrl + routePath : routePath;
    } catch (ignore) {
      // Ignored
    }
  }
  var captureEmail = options.captureEmail;
  var captureUsername = options.captureUsername;
  if (req.rollbar_person) {
    var person = req.rollbar_person;
    if (!captureEmail && person.email) {
      person.email = null;
    }
    if (!captureUsername && person.username) {
      person.username = null;
    }
    item.data.person = person;
  } else if (req.user) {
    item.data.person = {
      id: req.user.id
    };
    if (req.user.username && captureUsername) {
      item.data.person.username = req.user.username;
    }
    if (req.user.email && captureEmail) {
      item.data.person.email = req.user.email;
    }
  } else if (req.user_id || req.userId) {
    var userId = req.user_id || req.userId;
    if (isFunction(userId)) {
      userId = userId();
    }
    item.data.person = {
      id: userId
    };
  }
  callback(null, item);
}
function addLambdaData(item, options, callback) {
  var c = item.lambdaContext;
  if (!c) {
    callback(null, item);
    return;
  }
  var data = {
    remainingTimeInMillis: c.getRemainingTimeInMillis(),
    callbackWaitsForEmptyEventLoop: c.callbackWaitsForEmptyEventLoop,
    functionName: c.functionName,
    functionVersion: c.functionVersion,
    arn: c.invokedFunctionArn,
    requestId: c.awsRequestId
  };
  item.data = item.data || {};
  item.data.custom = item.data.custom || {};
  item.data.custom.lambda = data;
  callback(null, item);
}
function scrubPayload(item, options, callback) {
  var scrubHeaders = options.scrubHeaders || [];
  var scrubFields = options.scrubFields || [];
  var scrubPaths = options.scrubPaths || [];
  scrubFields = scrubHeaders.concat(scrubFields);
  parseRequestBody(item.data.request, options);
  item.data = src_scrub(item.data, scrubFields, scrubPaths);
  serializeRequestBody(item.data.request, options);
  callback(null, item);
}
function parseRequestBody(req, options) {
  if (!req || !options.scrubRequestBody) {
    return;
  }
  try {
    if (isString(req.body) && _isJsonContentType(req)) {
      req.body = JSON.parse(req.body);
    }
  } catch (e) {
    req.body = null;
    req.error = 'request.body parse failed: ' + e.message;
  }
}
function serializeRequestBody(req, options) {
  if (!req || !options.scrubRequestBody) {
    return;
  }
  try {
    if (isObject(req.body) && _isJsonContentType(req)) {
      req.body = JSON.stringify(req.body);
    }
  } catch (e) {
    req.body = null;
    req.error = 'request.body serialization failed: ' + e.message;
  }
}

/** Helpers **/

function _isJsonContentType(req) {
  return req.headers && req.headers['content-type'] && req.headers['content-type'].includes('json');
}
function _buildTraceData(chain, options, item) {
  return function (ex, cb) {
    parseException(ex, options, item, function (err, errData) {
      if (err) {
        return cb(err);
      }
      chain.push({
        frames: errData.frames,
        exception: {
          class: errData['class'],
          message: errData.message
        }
      });
      return cb(null);
    });
  };
}
function _extractIp(req) {
  var ip = req.ip;
  if (!ip) {
    ip = external_request_ip_namespaceObject.getClientIp(req);
  }
  return ip;
}
function _buildRequestData(req) {
  var headers = req.headers || {};
  var host = headers.host || '<no host>';
  var proto = req.protocol || (req.socket && req.socket.encrypted ? 'https' : 'http');
  var parsedUrl;
  var baseUrl = req.baseUrl || '';
  if (isType(req.url, 'string')) {
    var fullUrl = baseUrl && baseUrl.length ? baseUrl + req.url : req.url;
    parsedUrl = external_url_namespaceObject.parse(fullUrl, true);
  } else {
    parsedUrl = req.url || {};
  }
  parsedUrl.protocol = parsedUrl.protocol || proto;
  parsedUrl.host = parsedUrl.host || host;
  var reqUrl = external_url_namespaceObject.format(parsedUrl);
  var data = {
    url: reqUrl,
    user_ip: _extractIp(req),
    headers: headers,
    method: req.method
  };
  if (parsedUrl.search && parsedUrl.search.length > 0) {
    data.GET = parsedUrl.query;
  }
  var body = req.body || req.payload;
  if (body) {
    var bodyParams = {};
    if (isIterable(body)) {
      for (var k in body) {
        if (Object.prototype.hasOwnProperty.call(body, k)) {
          bodyParams[k] = body[k];
        }
      }
      data[req.method] = bodyParams;
    } else {
      data.body = body;
    }
  }
  return data;
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

;// ./src/server/rollbar.js

















function rollbar_Rollbar(options, client) {
  if (isType(options, 'string')) {
    var accessToken = options;
    options = {};
    options.accessToken = accessToken;
  }
  if (options.minimumLevel !== undefined) {
    options.reportLevel = options.minimumLevel;
    delete options.minimumLevel;
  }
  this.options = handleOptions(rollbar_Rollbar.defaultOptions, options, null, server_logger);
  this.options._configuredOptions = options;
  // On the server we want to ignore any maxItems setting
  delete this.options.maxItems;
  this.options.environment = this.options.environment || 'unspecified';
  server_logger.setVerbose(this.options.verbose);
  this.lambdaContext = null;
  this.lambdaTimeoutHandle = null;
  var transport = new server_transport();
  var api = new src_api(this.options, transport, external_url_namespaceObject, truncation, external_json_stringify_safe_namespaceObject);
  var telemeter = new telemetry(this.options);
  this.client = client || new rollbar(this.options, api, server_logger, telemeter, null, null, 'server');
  this.instrumenter = new server_telemetry(this.options, this.client.telemeter, this);
  this.instrumenter.instrument();
  if (this.options.locals) {
    this.locals = initLocals(this.options.locals, server_logger);
  }
  addTransformsToNotifier(this.client.notifier);
  addPredicatesToQueue(this.client.queue);
  this.setupUnhandledCapture();
}
function initLocals(localsOptions, logger) {
  // Capturing stack local variables is only supported in Node 10 and higher.
  var nodeMajorVersion = process.versions.node.split('.')[0];
  if (nodeMajorVersion < 10) {
    return null;
  }
  var Locals;
  if (typeof localsOptions === 'function') {
    Locals = localsOptions;
    localsOptions = null; // use defaults
  } else if (isType(localsOptions, 'object')) {
    Locals = localsOptions.module;
    delete localsOptions.module;
  } else {
    logger.error('options.locals or options.locals.module must be a Locals module');
    return null;
  }
  return new Locals(localsOptions, logger);
}
var _instance = null;
rollbar_Rollbar.init = function (options, client) {
  if (_instance) {
    return _instance.global(options).configure(options);
  }
  _instance = new rollbar_Rollbar(options, client);
  return _instance;
};
function handleUninitialized(maybeCallback) {
  var message = 'Rollbar is not initialized';
  server_logger.error(message);
  if (maybeCallback) {
    maybeCallback(new Error(message));
  }
}
rollbar_Rollbar.prototype.global = function (options) {
  options = handleOptions(options);
  // On the server we want to ignore any maxItems setting
  delete options.maxItems;
  this.client.global(options);
  return this;
};
rollbar_Rollbar.global = function (options) {
  if (_instance) {
    return _instance.global(options);
  } else {
    handleUninitialized();
  }
};
rollbar_Rollbar.prototype.configure = function (options, payloadData) {
  var oldOptions = this.options;
  var payload = {};
  if (payloadData) {
    payload = {
      payload: payloadData
    };
  }
  this.options = handleOptions(oldOptions, options, payload, server_logger);
  this.options._configuredOptions = handleOptions(oldOptions._configuredOptions, options, payload);
  // On the server we want to ignore any maxItems setting
  delete this.options.maxItems;
  server_logger.setVerbose(this.options.verbose);
  this.client.configure(options, payloadData);
  this.setupUnhandledCapture();
  if (this.options.locals) {
    if (this.locals) {
      this.locals.updateOptions(this.options.locals);
    } else {
      this.locals = initLocals(this.options.locals, server_logger);
    }
  }
  return this;
};
rollbar_Rollbar.configure = function (options, payloadData) {
  if (_instance) {
    return _instance.configure(options, payloadData);
  } else {
    handleUninitialized();
  }
};
rollbar_Rollbar.prototype.lastError = function () {
  return this.client.lastError;
};
rollbar_Rollbar.lastError = function () {
  if (_instance) {
    return _instance.lastError();
  } else {
    handleUninitialized();
  }
};
rollbar_Rollbar.prototype.log = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.log(item);
  return {
    uuid: uuid
  };
};
rollbar_Rollbar.log = function () {
  if (_instance) {
    return _instance.log.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
rollbar_Rollbar.prototype.debug = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.debug(item);
  return {
    uuid: uuid
  };
};
rollbar_Rollbar.debug = function () {
  if (_instance) {
    return _instance.debug.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
rollbar_Rollbar.prototype.info = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.info(item);
  return {
    uuid: uuid
  };
};
rollbar_Rollbar.info = function () {
  if (_instance) {
    return _instance.info.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
rollbar_Rollbar.prototype.warn = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.warn(item);
  return {
    uuid: uuid
  };
};
rollbar_Rollbar.warn = function () {
  if (_instance) {
    return _instance.warn.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
rollbar_Rollbar.prototype.warning = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.warning(item);
  return {
    uuid: uuid
  };
};
rollbar_Rollbar.warning = function () {
  if (_instance) {
    return _instance.warning.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
rollbar_Rollbar.prototype.error = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.error(item);
  return {
    uuid: uuid
  };
};
rollbar_Rollbar.error = function () {
  if (_instance) {
    return _instance.error.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
rollbar_Rollbar.prototype._uncaughtError = function () {
  var item = this._createItem(arguments);
  item._isUncaught = true;
  item.level = this.options.uncaughtErrorLevel;
  var uuid = item.uuid;
  this.client.log(item);
  return {
    uuid: uuid
  };
};
rollbar_Rollbar.prototype.critical = function () {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.critical(item);
  return {
    uuid: uuid
  };
};
rollbar_Rollbar.critical = function () {
  if (_instance) {
    return _instance.critical.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
rollbar_Rollbar.prototype.buildJsonPayload = function (item) {
  return this.client.buildJsonPayload(item);
};
rollbar_Rollbar.buildJsonPayload = function () {
  if (_instance) {
    return _instance.buildJsonPayload.apply(_instance, arguments);
  } else {
    handleUninitialized();
  }
};
rollbar_Rollbar.prototype.sendJsonPayload = function (jsonPayload) {
  return this.client.sendJsonPayload(jsonPayload);
};
rollbar_Rollbar.sendJsonPayload = function () {
  if (_instance) {
    return _instance.sendJsonPayload.apply(_instance, arguments);
  } else {
    handleUninitialized();
  }
};
rollbar_Rollbar.prototype.wait = function (callback) {
  this.client.wait(callback);
};
rollbar_Rollbar.wait = function (callback) {
  if (_instance) {
    return _instance.wait(callback);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};
rollbar_Rollbar.prototype.errorHandler = function () {
  return function (err, request, response, next) {
    var cb = function cb(rollbarError) {
      if (rollbarError) {
        server_logger.error('Error reporting to rollbar, ignoring: ' + rollbarError);
      }
      return next(err, request, response);
    };
    if (!err) {
      return next(err, request, response);
    }
    if (err instanceof Error) {
      return this.error(err, request, cb);
    }
    return this.error('Error: ' + err, request, cb);
  }.bind(this);
};
rollbar_Rollbar.errorHandler = function () {
  if (_instance) {
    return _instance.errorHandler();
  } else {
    handleUninitialized();
  }
};
rollbar_Rollbar.prototype.lambdaHandler = function (handler, timeoutHandler) {
  if (handler.length <= 2) {
    return this.asyncLambdaHandler(handler, timeoutHandler);
  }
  return this.syncLambdaHandler(handler, timeoutHandler);
};
rollbar_Rollbar.prototype.asyncLambdaHandler = function (handler, timeoutHandler) {
  var self = this;
  var _timeoutHandler = function _timeoutHandler(event, context) {
    var message = 'Function timed out';
    var custom = {
      originalEvent: event,
      originalRequestId: context.awsRequestId
    };
    self.error(message, custom);
  };
  var shouldReportTimeouts = self.options.captureLambdaTimeouts;
  return function rollbarAsyncLambdaHandler(event, context) {
    return new Promise(function (resolve, reject) {
      self.lambdaContext = context;
      if (shouldReportTimeouts) {
        var timeoutCb = (timeoutHandler || _timeoutHandler).bind(null, event, context);
        self.lambdaTimeoutHandle = setTimeout(timeoutCb, context.getRemainingTimeInMillis() - 1000);
      }
      handler(event, context).then(function (resp) {
        self.wait(function () {
          clearTimeout(self.lambdaTimeoutHandle);
          resolve(resp);
        });
      }).catch(function (err) {
        self.error(err);
        self.wait(function () {
          clearTimeout(self.lambdaTimeoutHandle);
          reject(err);
        });
      });
    });
  };
};
rollbar_Rollbar.prototype.syncLambdaHandler = function (handler, timeoutHandler) {
  var self = this;
  var _timeoutHandler = function _timeoutHandler(event, context, _cb) {
    var message = 'Function timed out';
    var custom = {
      originalEvent: event,
      originalRequestId: context.awsRequestId
    };
    self.error(message, custom);
  };
  var shouldReportTimeouts = self.options.captureLambdaTimeouts;
  return function (event, context, callback) {
    self.lambdaContext = context;
    if (shouldReportTimeouts) {
      var timeoutCb = (timeoutHandler || _timeoutHandler).bind(null, event, context, callback);
      self.lambdaTimeoutHandle = setTimeout(timeoutCb, context.getRemainingTimeInMillis() - 1000);
    }
    try {
      handler(event, context, function (err, resp) {
        if (err) {
          self.error(err);
        }
        self.wait(function () {
          clearTimeout(self.lambdaTimeoutHandle);
          callback(err, resp);
        });
      });
    } catch (err) {
      self.error(err);
      self.wait(function () {
        clearTimeout(self.lambdaTimeoutHandle);
        throw err;
      });
    }
  };
};
rollbar_Rollbar.lambdaHandler = function (handler) {
  if (_instance) {
    return _instance.lambdaHandler(handler);
  } else {
    handleUninitialized();
  }
};
function rollbar_wrapCallback(r, f) {
  return function () {
    var err = arguments[0];
    if (err) {
      r.error(err);
    }
    return f.apply(this, arguments);
  };
}
rollbar_Rollbar.prototype.wrapCallback = function (f) {
  return rollbar_wrapCallback(this, f);
};
rollbar_Rollbar.wrapCallback = function (f) {
  if (_instance) {
    return _instance.wrapCallback(f);
  } else {
    handleUninitialized();
  }
};
rollbar_Rollbar.prototype.captureEvent = function () {
  var event = createTelemetryEvent(arguments);
  return this.client.captureEvent(event.type, event.metadata, event.level);
};
rollbar_Rollbar.captureEvent = function () {
  if (_instance) {
    return _instance.captureEvent.apply(_instance, arguments);
  } else {
    handleUninitialized();
  }
};

/** DEPRECATED **/

rollbar_Rollbar.prototype.reportMessage = function (message, level, request, callback) {
  server_logger.log('reportMessage is deprecated');
  if (isFunction(this[level])) {
    return this[level](message, request, callback);
  } else {
    return this.error(message, request, callback);
  }
};
rollbar_Rollbar.reportMessage = function (message, level, request, callback) {
  if (_instance) {
    return _instance.reportMessage(message, level, request, callback);
  } else {
    handleUninitialized(callback);
  }
};
rollbar_Rollbar.prototype.reportMessageWithPayloadData = function (message, payloadData, request, callback) {
  server_logger.log('reportMessageWithPayloadData is deprecated');
  return this.error(message, request, payloadData, callback);
};
rollbar_Rollbar.reportMessageWithPayloadData = function (message, payloadData, request, callback) {
  if (_instance) {
    return _instance.reportMessageWithPayloadData(message, payloadData, request, callback);
  } else {
    handleUninitialized(callback);
  }
};
rollbar_Rollbar.prototype.handleError = function (err, request, callback) {
  server_logger.log('handleError is deprecated');
  return this.error(err, request, callback);
};
rollbar_Rollbar.handleError = function (err, request, callback) {
  if (_instance) {
    return _instance.handleError(err, request, callback);
  } else {
    handleUninitialized(callback);
  }
};
rollbar_Rollbar.prototype.handleErrorWithPayloadData = function (err, payloadData, request, callback) {
  server_logger.log('handleErrorWithPayloadData is deprecated');
  return this.error(err, request, payloadData, callback);
};
rollbar_Rollbar.handleErrorWithPayloadData = function (err, payloadData, request, callback) {
  if (_instance) {
    return _instance.handleErrorWithPayloadData(err, payloadData, request, callback);
  } else {
    handleUninitialized(callback);
  }
};
rollbar_Rollbar.handleUncaughtExceptions = function (accessToken, options) {
  if (_instance) {
    options = options || {};
    options.accessToken = accessToken;
    return _instance.configure(options);
  } else {
    handleUninitialized();
  }
};
rollbar_Rollbar.handleUnhandledRejections = function (accessToken, options) {
  if (_instance) {
    options = options || {};
    options.accessToken = accessToken;
    return _instance.configure(options);
  } else {
    handleUninitialized();
  }
};
rollbar_Rollbar.handleUncaughtExceptionsAndRejections = function (accessToken, options) {
  if (_instance) {
    options = options || {};
    options.accessToken = accessToken;
    return _instance.configure(options);
  } else {
    handleUninitialized();
  }
};

/** Internal **/

function addTransformsToNotifier(notifier) {
  notifier.addTransform(baseData).addTransform(handleItemWithError).addTransform(addBody).addTransform(addMessageWithError).addTransform(addTelemetryData).addTransform(addRequestData).addTransform(addLambdaData).addTransform(addConfigToPayload).addTransform(scrubPayload).addTransform(addPayloadOptions).addTransform(userTransform(server_logger)).addTransform(addConfiguredOptions).addTransform(addDiagnosticKeys).addTransform(itemToPayload);
}
function addPredicatesToQueue(queue) {
  queue.addPredicate(checkLevel).addPredicate(userCheckIgnore(server_logger)).addPredicate(urlIsNotBlockListed(server_logger)).addPredicate(urlIsSafeListed(server_logger)).addPredicate(messageIsIgnored(server_logger));
}
rollbar_Rollbar.prototype._createItem = function (args) {
  var requestKeys = ['headers', 'protocol', 'url', 'method', 'body', 'route'];
  var item = createItem(args, server_logger, this, requestKeys, this.lambdaContext);
  if (item.err && item.notifier.locals) {
    item.localsMap = item.notifier.locals.currentLocalsMap();
  }
  return item;
};
function _getFirstFunction(args) {
  for (var i = 0, len = args.length; i < len; ++i) {
    if (isFunction(args[i])) {
      return args[i];
    }
  }
  return undefined;
}
rollbar_Rollbar.prototype.setupUnhandledCapture = function () {
  if (this.options.captureUncaught || this.options.handleUncaughtExceptions) {
    this.handleUncaughtExceptions();
  }
  if (this.options.captureUnhandledRejections || this.options.handleUnhandledRejections) {
    this.handleUnhandledRejections();
  }
};
rollbar_Rollbar.prototype.handleUncaughtExceptions = function () {
  var exitOnUncaught = !!this.options.exitOnUncaughtException;
  delete this.options.exitOnUncaughtException;
  addOrReplaceRollbarHandler('uncaughtException', function (err) {
    if (!this.options.captureUncaught && !this.options.handleUncaughtExceptions) {
      return;
    }
    this._uncaughtError(err, function (err) {
      if (err) {
        server_logger.error('Encountered error while handling an uncaught exception.');
        server_logger.error(err);
      }
    });
    if (exitOnUncaught) {
      setImmediate(function () {
        this.wait(function () {
          process.exit(1);
        });
      }.bind(this));
    }
  }.bind(this));
};
rollbar_Rollbar.prototype.handleUnhandledRejections = function () {
  addOrReplaceRollbarHandler('unhandledRejection', function (reason) {
    if (!this.options.captureUnhandledRejections && !this.options.handleUnhandledRejections) {
      return;
    }
    this._uncaughtError(reason, function (err) {
      if (err) {
        server_logger.error('Encountered error while handling an uncaught exception.');
        server_logger.error(err);
      }
    });
  }.bind(this));
};
function addOrReplaceRollbarHandler(event, action) {
  // We only support up to two arguments which is enough for how this is used
  // rather than dealing with `arguments` and `apply`
  var fn = function fn(a, b) {
    action(a, b);
  };
  fn._rollbarHandler = true;
  var listeners = process.listeners(event);
  var len = listeners.length;
  for (var i = 0; i < len; ++i) {
    if (listeners[i]._rollbarHandler) {
      process.removeListener(event, listeners[i]);
    }
  }
  process.on(event, fn);
}
function RollbarError(message, nested) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.message = message;
  this.nested = nested;
  this.name = this.constructor.name;
}
external_util_namespaceObject.inherits(RollbarError, Error);
rollbar_Rollbar.Error = RollbarError;
rollbar_Rollbar.defaultOptions = {
  host: external_os_namespaceObject.hostname(),
  environment: "production" || 0,
  framework: 'node-js',
  showReportedMessageTraces: false,
  notifier: {
    name: notifierName,
    version: version
  },
  scrubHeaders: scrubHeaders,
  scrubFields: scrubFields,
  addRequestData: null,
  reportLevel: reportLevel,
  verbose: false,
  enabled: true,
  transmit: true,
  sendConfig: false,
  includeItemsInTelemetry: false,
  captureEmail: false,
  captureUsername: false,
  captureIp: true,
  captureLambdaTimeouts: true,
  ignoreDuplicateErrors: true,
  scrubRequestBody: true,
  autoInstrument: false
};
/* harmony default export */ const server_rollbar = (rollbar_Rollbar);
module.exports = __webpack_exports__["default"];
/******/ })()
;