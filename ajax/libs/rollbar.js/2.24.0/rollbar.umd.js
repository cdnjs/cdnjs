(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rollbar"] = factory();
	else
		root["rollbar"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var merge = __webpack_require__(12);

var RollbarJSON = {};
function setupJSON(polyfillJSON) {
  if (isFunction(RollbarJSON.stringify) && isFunction(RollbarJSON.parse)) {
    return;
  }

  if (isDefined(JSON)) {
    // If polyfill is provided, prefer it over existing non-native shims.
    if(polyfillJSON) {
      if (isNativeFunction(JSON.stringify)) {
        RollbarJSON.stringify = JSON.stringify;
      }
      if (isNativeFunction(JSON.parse)) {
        RollbarJSON.parse = JSON.parse;
      }
    } else { // else accept any interface that is present.
      if (isFunction(JSON.stringify)) {
        RollbarJSON.stringify = JSON.stringify;
      }
      if (isFunction(JSON.parse)) {
        RollbarJSON.parse = JSON.parse;
      }
    }
  }
  if (!isFunction(RollbarJSON.stringify) || !isFunction(RollbarJSON.parse)) {
    polyfillJSON && polyfillJSON(RollbarJSON);
  }
}

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
  var name = typeof x;
  if (name !== 'object') {
    return name;
  }
  if (!x) {
    return 'null';
  }
  if (x instanceof Error) {
    return 'error';
  }
  return ({}).toString.call(x).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
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
  var funcMatchString = Function.prototype.toString.call(Object.prototype.hasOwnProperty)
    .replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?');
  var reIsNative = RegExp('^' + funcMatchString + '$');
  return isObject(f) && reIsNative.test(f);
}

/* isObject - Checks if the argument is an object
 *
 * @param value - any value
 * @returns true is value is an object function is an object)
*/
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/* isString - Checks if the argument is a string
 *
 * @param value - any value
 * @returns true if value is a string
*/
function isString(value) {
  return typeof value === 'string' || value instanceof String
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
  return (type === 'object' || type === 'array');
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

function redact() {
  return '********';
}

// from http://stackoverflow.com/a/8809472/1138191
function uuid4() {
  var d = now();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
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
  key: [
    'source',
    'protocol',
    'authority',
    'userInfo',
    'user',
    'password',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'anchor'
  ],
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
    options.path = p.substring(0,qs) + query + '&' + p.substring(qs+1);
  } else {
    if (h !== -1) {
      p = options.path;
      options.path = p.substring(0,h) + query + p.substring(h);
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
    value = RollbarJSON.stringify(obj);
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
  return {error: error, value: value};
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
    if (code < 128) { // up to 7 bits
      count = count + 1;
    } else if (code < 2048) { // up to 11 bits
      count = count + 2;
    } else if (code < 65536) { // up to 16 bits
      count = count + 3;
    }
  }

  return count;
}

function jsonParse(s) {
  var value, error;
  try {
    value = RollbarJSON.parse(s);
  } catch (e) {
    error = e;
  }
  return {error: error, value: value};
}

function makeUnhandledStackInfo(
  message,
  url,
  lineno,
  colno,
  error,
  mode,
  backupMessage,
  errorParser
) {
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
    'mode': mode,
    'message': error ? String(error) : (message || backupMessage),
    'url': href,
    'stack': [location],
    'useragent': useragent
  };
}

function wrapCallback(logger, f) {
  return function(err, resp) {
    try {
      f(err, resp);
    } catch (e) {
      logger.error(e);
    }
  };
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
      case 'exception': // Firefox Exception type
        err ? extraArgs.push(arg) : err = arg;
        break;
      case 'object':
      case 'array':
        if (arg instanceof Error || (typeof DOMException !== 'undefined' && arg instanceof DOMException)) {
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
        if (arg instanceof Error || (typeof DOMException !== 'undefined' && arg instanceof DOMException)) {
          err ? extraArgs.push(arg) : err = arg;
          break;
        }
        extraArgs.push(arg);
    }
  }

  if (extraArgs.length > 0) {
    // if custom is an array this turns it into an object with integer keys
    custom = merge(custom);
    custom.extraArgs = extraArgs;
  }

  var item = {
    message: message,
    err: err,
    custom: custom,
    timestamp: now(),
    callback: callback,
    notifier: notifier,
    diagnostic: diagnostic,
    uuid: uuid4()
  };

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
        custom = merge(custom, errors[i].rollbarContext);
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
    temp[keys[len-1]] = value;
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

function now() {
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
  var result = merge(current, input, payload);
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
  if(options.hostWhiteList && !options.hostSafeList) {
    options.hostSafeList = options.hostWhiteList;
    options.hostWhiteList = undefined;
    logger && logger.log('hostWhiteList is deprecated. Use hostSafeList.');
  }
  if(options.hostBlackList && !options.hostBlockList) {
    options.hostBlockList = options.hostBlackList;
    options.hostBlackList = undefined;
    logger && logger.log('hostBlackList is deprecated. Use hostBlockList.');
  }
  return options;
}

module.exports = {
  addParamsAndAccessTokenToPath: addParamsAndAccessTokenToPath,
  createItem: createItem,
  addErrorContext: addErrorContext,
  createTelemetryEvent: createTelemetryEvent,
  filterIp: filterIp,
  formatArgsAsString: formatArgsAsString,
  formatUrl: formatUrl,
  get: get,
  handleOptions: handleOptions,
  isError: isError,
  isFiniteNumber: isFiniteNumber,
  isFunction: isFunction,
  isIterable: isIterable,
  isNativeFunction: isNativeFunction,
  isObject: isObject,
  isString: isString,
  isType: isType,
  isPromise: isPromise,
  jsonParse: jsonParse,
  LEVELS: LEVELS,
  makeUnhandledStackInfo: makeUnhandledStackInfo,
  merge: merge,
  now: now,
  redact: redact,
  RollbarJSON: RollbarJSON,
  sanitizeUrl: sanitizeUrl,
  set: set,
  setupJSON: setupJSON,
  stringify: stringify,
  maxByteSize: maxByteSize,
  typeName: typeName,
  uuid4: uuid4
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-console */
__webpack_require__(17);
var detection = __webpack_require__(18);
var _ = __webpack_require__(0);

function error() {
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift('Rollbar:');
  if (detection.ieVersion() <= 8) {
    console.error(_.formatArgsAsString(args));
  } else {
    console.error.apply(console, args);
  }
}

function info() {
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift('Rollbar:');
  if (detection.ieVersion() <= 8) {
    console.info(_.formatArgsAsString(args));
  } else {
    console.info.apply(console, args);
  }
}

function log() {
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift('Rollbar:');
  if (detection.ieVersion() <= 8) {
    console.log(_.formatArgsAsString(args));
  } else {
    console.log.apply(console, args);
  }
}

/* eslint-enable no-console */

module.exports = {
  error: error,
  info: info,
  log: log
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// See https://nodejs.org/docs/latest/api/url.html
function parse(url) {
  var result = {
    protocol: null, auth: null, host: null, path: null,
    hash: null, href: url, hostname: null, port: null,
    pathname: null, search: null, query: null
  };

  var i, last;
  i = url.indexOf('//');
  if (i !== -1) {
    result.protocol = url.substring(0,i);
    last = i+2;
  } else {
    last = 0;
  }
  
  i = url.indexOf('@', last);
  if (i !== -1) {
    result.auth = url.substring(last, i);
    last = i+1;
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

module.exports = {
  parse: parse
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ErrorStackParser = __webpack_require__(22);

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
      parserStack = ErrorStackParser.parse(exception);
    } catch(e) {
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


function parse(e, skip) {
  var err = e;

  if (err.nested) {
    var traceChain = [];
    while (err) {
      traceChain.push(new Stack(err, skip));
      err = err.nested;

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

module.exports = {
  guessFunctionName: guessFunctionName,
  guessErrorClass: guessErrorClass,
  gatherContext: gatherContext,
  parse: parse,
  Stack: Stack,
  Frame: Frame
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var traverse = __webpack_require__(5);

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
    return paramPart + _.redact();
  }

  function paramScrubber(v) {
    var i;
    if (_.isType(v, 'string')) {
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
        v = _.redact();
        break;
      }
    }
    return v;
  }

  function scrubber(k, v, seen) {
    var tmpV = valScrubber(k, v);
    if (tmpV === v) {
      if (_.isType(v, 'object') || _.isType(v, 'array')) {
        return traverse(v, scrubber, seen);
      }
      return paramScrubber(tmpV);
    } else {
      return tmpV;
    }
  }

  return traverse(data, scrubber);
}

function scrubPath(obj, path) {
  var keys = path.split('.');
  var last = keys.length - 1;
  try {
    for (var i = 0; i <= last; ++i) {
      if (i < last) {
        obj = obj[keys[i]];
      } else {
        obj[keys[i]] = _.redact();
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

module.exports = scrub;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

function traverse(obj, func, seen) {
  var k, v, i;
  var isObj = _.isType(obj, 'object');
  var isArray = _.isType(obj, 'array');
  var keys = [];
  var seenIndex;

  // Best might be to use Map here with `obj` as the keys, but we want to support IE < 11.
  seen = seen || { obj: [], mapped: []};

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

module.exports = traverse;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rollbar = __webpack_require__(8);

var options = (typeof window !== 'undefined') && window._rollbarConfig;
var alias = options && options.globalAlias || 'Rollbar';
var shimRunning = (typeof window !== 'undefined') && window[alias] && typeof window[alias].shimId === 'function' && window[alias].shimId() !== undefined;

if ((typeof window !== 'undefined') && !window._rollbarStartTime) {
  window._rollbarStartTime = (new Date()).getTime();
}

if (!shimRunning && options) {
  var Rollbar = new rollbar(options);
  window[alias] = Rollbar;
} else if (typeof window !== 'undefined') {
  window.rollbar = rollbar;
  window._rollbarDidLoad = true;
} else if (typeof self !== 'undefined') {
  self.rollbar = rollbar;
  self._rollbarDidLoad = true;
}

module.exports = rollbar;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Rollbar = __webpack_require__(9);
var telemeter = __webpack_require__(29);
var instrumenter = __webpack_require__(30);
var polyfillJSON = __webpack_require__(32);
var wrapGlobals = __webpack_require__(34);
var scrub = __webpack_require__(4);
var truncation = __webpack_require__(35);

Rollbar.setComponents({
  telemeter: telemeter,
  instrumenter: instrumenter,
  polyfillJSON: polyfillJSON,
  wrapGlobals: wrapGlobals,
  scrub: scrub,
  truncation: truncation
});

module.exports = Rollbar;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Client = __webpack_require__(10);
var _ = __webpack_require__(0);
var API = __webpack_require__(15);
var logger = __webpack_require__(1);
var globals = __webpack_require__(19);

var Transport = __webpack_require__(20);
var urllib = __webpack_require__(2);

var transforms = __webpack_require__(21);
var sharedTransforms = __webpack_require__(24);
var predicates = __webpack_require__(25);
var sharedPredicates = __webpack_require__(26);
var errorParser = __webpack_require__(3);

function Rollbar(options, client) {
  this.options = _.handleOptions(defaultOptions, options, null, logger);
  this.options._configuredOptions = options;
  var Telemeter = this.components.telemeter;
  var Instrumenter = this.components.instrumenter;
  var polyfillJSON = this.components.polyfillJSON;
  this.wrapGlobals = this.components.wrapGlobals;
  this.scrub = this.components.scrub;
  var truncation = this.components.truncation;

  var transport = new Transport(truncation);
  var api = new API(this.options, transport, urllib, truncation);
  if (Telemeter) {
    this.telemeter = new Telemeter(this.options);
  }
  this.client = client || new Client(this.options, api, logger, this.telemeter, 'browser');
  var gWindow = _gWindow();
  var gDocument = (typeof document != 'undefined') && document;
  this.isChrome = gWindow.chrome && gWindow.chrome.runtime; // check .runtime to avoid Edge browsers
  this.anonymousErrorsPending = 0;
  addTransformsToNotifier(this.client.notifier, this, gWindow);
  addPredicatesToQueue(this.client.queue);
  this.setupUnhandledCapture();
  if (Instrumenter) {
    this.instrumenter = new Instrumenter(this.options, this.client.telemeter, this, gWindow, gDocument);
    this.instrumenter.instrument();
  }
  _.setupJSON(polyfillJSON);
}

var _instance = null;
Rollbar.init = function(options, client) {
  if (_instance) {
    return _instance.global(options).configure(options);
  }
  _instance = new Rollbar(options, client);
  return _instance;
};

Rollbar.prototype.components = {};

Rollbar.setComponents = function(components) {
  Rollbar.prototype.components = components;
}

function handleUninitialized(maybeCallback) {
  var message = 'Rollbar is not initialized';
  logger.error(message);
  if (maybeCallback) {
    maybeCallback(new Error(message));
  }
}

Rollbar.prototype.global = function(options) {
  this.client.global(options);
  return this;
};
Rollbar.global = function(options) {
  if (_instance) {
    return _instance.global(options);
  } else {
    handleUninitialized();
  }
};

Rollbar.prototype.configure = function(options, payloadData) {
  var oldOptions = this.options;
  var payload = {};
  if (payloadData) {
    payload = {payload: payloadData};
  }
  this.options = _.handleOptions(oldOptions, options, payload, logger);
  this.options._configuredOptions = _.handleOptions(oldOptions._configuredOptions, options, payload);
  this.client.configure(this.options, payloadData);
  this.instrumenter && this.instrumenter.configure(this.options);
  this.setupUnhandledCapture();
  return this;
};
Rollbar.configure = function(options, payloadData) {
  if (_instance) {
    return _instance.configure(options, payloadData);
  } else {
    handleUninitialized();
  }
};

Rollbar.prototype.lastError = function() {
  return this.client.lastError;
};
Rollbar.lastError = function() {
  if (_instance) {
    return _instance.lastError();
  } else {
    handleUninitialized();
  }
};

Rollbar.prototype.log = function() {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.log(item);
  return {uuid: uuid};
};
Rollbar.log = function() {
  if (_instance) {
    return _instance.log.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};

Rollbar.prototype.debug = function() {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.debug(item);
  return {uuid: uuid};
};
Rollbar.debug = function() {
  if (_instance) {
    return _instance.debug.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};

Rollbar.prototype.info = function() {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.info(item);
  return {uuid: uuid};
};
Rollbar.info = function() {
  if (_instance) {
    return _instance.info.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};

Rollbar.prototype.warn = function() {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.warn(item);
  return {uuid: uuid};
};
Rollbar.warn = function() {
  if (_instance) {
    return _instance.warn.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};

Rollbar.prototype.warning = function() {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.warning(item);
  return {uuid: uuid};
};
Rollbar.warning = function() {
  if (_instance) {
    return _instance.warning.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};

Rollbar.prototype.error = function() {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.error(item);
  return {uuid: uuid};
};
Rollbar.error = function() {
  if (_instance) {
    return _instance.error.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};

Rollbar.prototype.critical = function() {
  var item = this._createItem(arguments);
  var uuid = item.uuid;
  this.client.critical(item);
  return {uuid: uuid};
};
Rollbar.critical = function() {
  if (_instance) {
    return _instance.critical.apply(_instance, arguments);
  } else {
    var maybeCallback = _getFirstFunction(arguments);
    handleUninitialized(maybeCallback);
  }
};

Rollbar.prototype.buildJsonPayload = function(item) {
  return this.client.buildJsonPayload(item);
};
Rollbar.buildJsonPayload = function() {
  if (_instance) {
    return _instance.buildJsonPayload.apply(_instance, arguments);
  } else {
    handleUninitialized();
  }
};

Rollbar.prototype.sendJsonPayload = function(jsonPayload) {
  return this.client.sendJsonPayload(jsonPayload);
};
Rollbar.sendJsonPayload = function() {
  if (_instance) {
    return _instance.sendJsonPayload.apply(_instance, arguments);
  } else {
    handleUninitialized();
  }
};

Rollbar.prototype.setupUnhandledCapture = function() {
  var gWindow = _gWindow();

  if (!this.unhandledExceptionsInitialized) {
    if (this.options.captureUncaught || this.options.handleUncaughtExceptions) {
      globals.captureUncaughtExceptions(gWindow, this);
      if (this.wrapGlobals && this.options.wrapGlobalEventHandlers) {
        this.wrapGlobals(gWindow, this);
      }
      this.unhandledExceptionsInitialized = true;
    }
  }
  if (!this.unhandledRejectionsInitialized) {
    if (this.options.captureUnhandledRejections || this.options.handleUnhandledRejections) {
      globals.captureUnhandledRejections(gWindow, this);
      this.unhandledRejectionsInitialized = true;
    }
  }
};

Rollbar.prototype.handleUncaughtException = function(message, url, lineno, colno, error, context) {
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
  var stackInfo = _.makeUnhandledStackInfo(
    message,
    url,
    lineno,
    colno,
    error,
    'onerror',
    'uncaught exception',
    errorParser
  );
  if (_.isError(error)) {
    item = this._createItem([message, error, context]);
    item._unhandledStackInfo = stackInfo;
  } else if (_.isError(url)) {
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
Rollbar.prototype.handleAnonymousErrors = function() {
  if (!this.options.inspectAnonymousErrors || !this.isChrome) {
    return;
  }

  var r = this;
  function prepareStackTrace(error, _stack) { // eslint-disable-line no-unused-vars
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
}

Rollbar.prototype.handleUnhandledRejection = function(reason, promise) {
  if (!this.options.captureUnhandledRejections && !this.options.handleUnhandledRejections) {
    return;
  }

  var message = 'unhandled rejection was null or undefined!';
  if (reason) {
    if (reason.message) {
      message = reason.message;
    } else {
      var reasonResult = _.stringify(reason);
      if (reasonResult.value) {
        message = reasonResult.value;
      }
    }
  }
  var context = (reason && reason._rollbarContext) || (promise && promise._rollbarContext);

  var item;
  if (_.isError(reason)) {
    item = this._createItem([message, reason, context]);
  } else {
    item = this._createItem([message, reason, context]);
    item.stackInfo = _.makeUnhandledStackInfo(
      message,
      '',
      0,
      0,
      null,
      'unhandledrejection',
      '',
      errorParser
    );
  }
  item.level = this.options.uncaughtErrorLevel;
  item._isUncaught = true;
  item._originalArgs = item._originalArgs || [];
  item._originalArgs.push(promise);
  this.client.log(item);
};

Rollbar.prototype.wrap = function(f, context, _before) {
  try {
    var ctxFn;
    if(_.isFunction(context)) {
      ctxFn = context;
    } else {
      ctxFn = function() { return context || {}; };
    }

    if (!_.isFunction(f)) {
      return f;
    }

    if (f._isWrap) {
      return f;
    }

    if (!f._rollbar_wrapped) {
      f._rollbar_wrapped = function () {
        if (_before && _.isFunction(_before)) {
          _before.apply(this, arguments);
        }
        try {
          return f.apply(this, arguments);
        } catch(exc) {
          var e = exc;
          if (e && window._rollbarWrappedError !== e) {
            if (_.isType(e, 'string')) {
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
Rollbar.wrap = function(f, context) {
  if (_instance) {
    return _instance.wrap(f, context);
  } else {
    handleUninitialized();
  }
};

Rollbar.prototype.captureEvent = function() {
  var event = _.createTelemetryEvent(arguments);
  return this.client.captureEvent(event.type, event.metadata, event.level);
};
Rollbar.captureEvent = function() {
  if (_instance) {
    return _instance.captureEvent.apply(_instance, arguments);
  } else {
    handleUninitialized();
  }
};

// The following two methods are used internally and are not meant for public use
Rollbar.prototype.captureDomContentLoaded = function(e, ts) {
  if (!ts) {
    ts = new Date();
  }
  return this.client.captureDomContentLoaded(ts);
};

Rollbar.prototype.captureLoad = function(e, ts) {
  if (!ts) {
    ts = new Date();
  }
  return this.client.captureLoad(ts);
};

/* Internal */

function addTransformsToNotifier(notifier, rollbar, gWindow) {
  notifier
    .addTransform(transforms.handleDomException)
    .addTransform(transforms.handleItemWithError)
    .addTransform(transforms.ensureItemHasSomethingToSay)
    .addTransform(transforms.addBaseInfo)
    .addTransform(transforms.addRequestInfo(gWindow))
    .addTransform(transforms.addClientInfo(gWindow))
    .addTransform(transforms.addPluginInfo(gWindow))
    .addTransform(transforms.addBody)
    .addTransform(sharedTransforms.addMessageWithError)
    .addTransform(sharedTransforms.addTelemetryData)
    .addTransform(sharedTransforms.addConfigToPayload)
    .addTransform(transforms.addScrubber(rollbar.scrub))
    .addTransform(sharedTransforms.userTransform(logger))
    .addTransform(sharedTransforms.addConfiguredOptions)
    .addTransform(sharedTransforms.addDiagnosticKeys)
    .addTransform(sharedTransforms.itemToPayload);
}

function addPredicatesToQueue(queue) {
  queue
    .addPredicate(sharedPredicates.checkLevel)
    .addPredicate(predicates.checkIgnore)
    .addPredicate(sharedPredicates.userCheckIgnore(logger))
    .addPredicate(sharedPredicates.urlIsNotBlockListed(logger))
    .addPredicate(sharedPredicates.urlIsSafeListed(logger))
    .addPredicate(sharedPredicates.messageIsIgnored(logger));
}

Rollbar.prototype.loadFull = function() {
  logger.info('Unexpected Rollbar.loadFull() called on a Notifier instance. This can happen when Rollbar is loaded multiple times.');
};

Rollbar.prototype._createItem = function(args) {
  return _.createItem(args, logger, this);
};

function _getFirstFunction(args) {
  for (var i = 0, len = args.length; i < len; ++i) {
    if (_.isFunction(args[i])) {
      return args[i];
    }
  }
  return undefined;
}

function _gWindow() {
  return ((typeof window != 'undefined') && window) || ((typeof self != 'undefined') && self);
}

var defaults = __webpack_require__(27);
var scrubFields = __webpack_require__(28);

var defaultOptions = {
  version: defaults.version,
  scrubFields: scrubFields.scrubFields,
  logLevel: defaults.logLevel,
  reportLevel: defaults.reportLevel,
  uncaughtErrorLevel: defaults.uncaughtErrorLevel,
  endpoint: defaults.endpoint,
  verbose: false,
  enabled: true,
  transmit: true,
  sendConfig: false,
  includeItemsInTelemetry: true,
  captureIp: true,
  inspectAnonymousErrors: true,
  ignoreDuplicateErrors: true,
  wrapGlobalEventHandlers: false
};

module.exports = Rollbar;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RateLimiter = __webpack_require__(11);
var Queue = __webpack_require__(13);
var Notifier = __webpack_require__(14);
var _ = __webpack_require__(0);

/*
 * Rollbar - the interface to Rollbar
 *
 * @param options
 * @param api
 * @param logger
 */
function Rollbar(options, api, logger, telemeter, platform) {
  this.options = _.merge(options);
  this.logger = logger;
  Rollbar.rateLimiter.configureGlobal(this.options);
  Rollbar.rateLimiter.setPlatformOptions(platform, this.options);
  this.api = api;
  this.queue = new Queue(Rollbar.rateLimiter, api, logger, this.options);

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

  this.notifier = new Notifier(this.queue, this.options);
  this.telemeter = telemeter;
  setStackTraceLimit(options);
  this.lastError = null;
  this.lastErrorHash = 'none';
}

var defaultOptions = {
  maxItems: 0,
  itemsPerMinute: 60
};

Rollbar.rateLimiter = new RateLimiter(defaultOptions);

Rollbar.prototype.global = function (options) {
  Rollbar.rateLimiter.configureGlobal(options);
  return this;
};

Rollbar.prototype.configure = function (options, payloadData) {
  var oldOptions = this.options;
  var payload = {};
  if (payloadData) {
    payload = { payload: payloadData };
  }

  this.options = _.merge(oldOptions, options, payload);

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
    this.tracer = options.tracer
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
    this._addTracingInfo(item);
    item.level = item.level || defaultLevel;
    this.telemeter && this.telemeter._captureRollbarItem(item);
    item.telemetryEvents = (this.telemeter && this.telemeter.copyEvents()) || [];
    this.notifier.log(item, callback);
  } catch (e) {
    if (callback) {
      callback(e);
    }
    this.logger.error(e);
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
      span.setTag('rollbar.item_url', `https://rollbar.com/item/uuid/?uuid=${item.uuid}`);
      span.setTag('rollbar.occurrence_url', `https://rollbar.com/occurrence/uuid/?uuid=${item.uuid}`);

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
}

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

  if (!spanContext
    || !spanContext.toSpanId
    || !spanContext.toTraceId
    || typeof spanContext.toSpanId !== 'function'
    || typeof spanContext.toTraceId !== 'function') {
    return false
  }

  return true;
}

module.exports = Rollbar;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

/*
 * RateLimiter - an object that encapsulates the logic for counting items sent to Rollbar
 *
 * @param options - the same options that are accepted by configureGlobal offered as a convenience
 */
function RateLimiter(options) {
  this.startTime = _.now();
  this.counter = 0;
  this.perMinCounter = 0;
  this.platform = null;
  this.platformOptions = {};
  this.configureGlobal(options);
}

RateLimiter.globalSettings = {
  startTime: _.now(),
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
RateLimiter.prototype.configureGlobal = function(options) {
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
RateLimiter.prototype.shouldSend = function(item, now) {
  now = now || _.now();
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

RateLimiter.prototype.setPlatformOptions = function(platform, options) {
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
  return {error: error, shouldSend: shouldSend, payload: payload};
}

function rateLimitPayload(platform, options, globalRateLimit, limitPerMin, perMinute) {
  var environment = options.environment || (options.payload && options.payload.environment);
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
      version: (options.notifier && options.notifier.version) || options.version
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

module.exports = RateLimiter;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


'use strict';

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
	for (key in obj) {/**/}

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

function merge() {
  var i, src, copy, clone, name,
      result = {},
     current = null,
      length = arguments.length;

  for (i=0; i < length; i++) {
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

module.exports = merge;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

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
 */
function Queue(rateLimiter, api, logger, options) {
  this.rateLimiter = rateLimiter;
  this.api = api;
  this.logger = logger;
  this.options = options;
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
Queue.prototype.configure = function(options) {
  this.api && this.api.configure(options);
  var oldOptions = this.options;
  this.options = _.merge(oldOptions, options);
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
Queue.prototype.addPredicate = function(predicate) {
  if (_.isFunction(predicate)) {
    this.predicates.push(predicate);
  }
  return this;
};

Queue.prototype.addPendingItem = function(item) {
  this.pendingItems.push(item);
};

Queue.prototype.removePendingItem = function(item) {
  var idx = this.pendingItems.indexOf(item);
  if (idx !== -1) {
    this.pendingItems.splice(idx, 1);
  }
};

/*
 * addItem - Send an item to the Rollbar API if all of the predicates are satisfied
 *
 * @param item - The payload to send to the backend
 * @param callback - function(error, repsonse) which will be called with the response from the API
 *  in the case of a success, otherwise response will be null and error will have a value. If both
 *  error and response are null then the item was stopped by a predicate which did not consider this
 *  to be an error condition, but nonetheless did not send the item to the API.
 *  @param originalError - The original error before any transformations that is to be logged if any
 */
Queue.prototype.addItem = function(item, callback, originalError, originalItem) {
  if (!callback || !_.isFunction(callback)) {
    callback = function() { return; };
  }
  var predicateResult = this._applyPredicates(item);
  if (predicateResult.stop) {
    this.removePendingItem(originalItem);
    callback(predicateResult.err);
    return;
  }
  this._maybeLog(item, originalError);
  this.removePendingItem(originalItem);
  if (!this.options.transmit) {
    callback(new Error('Transmit disabled'));
    return;
  }
  this.pendingRequests.push(item);
  try {
    this._makeApiRequest(item, function(err, resp) {
      this._dequeuePendingRequest(item);
      callback(err, resp);
    }.bind(this));
  } catch (e) {
    this._dequeuePendingRequest(item);
    callback(e);
  }
};

/*
 * wait - Stop any further errors from being added to the queue, and get called back when all items
 *   currently processing have finished sending to the backend.
 *
 * @param callback - function() called when all pending items have been sent
 */
Queue.prototype.wait = function(callback) {
  if (!_.isFunction(callback)) {
    return;
  }
  this.waitCallback = callback;
  if (this._maybeCallWait()) {
    return;
  }
  if (this.waitIntervalID) {
    this.waitIntervalID = clearInterval(this.waitIntervalID);
  }
  this.waitIntervalID = setInterval(function() {
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
Queue.prototype._applyPredicates = function(item) {
  var p = null;
  for (var i = 0, len = this.predicates.length; i < len; i++) {
    p = this.predicates[i](item, this.options);
    if (!p || p.err !== undefined) {
      return {stop: true, err: p.err};
    }
  }
  return {stop: false, err: null};
};

/*
 * _makeApiRequest - Send an item to Rollbar, callback when done, if there is an error make an
 *   effort to retry if we are configured to do so.
 *
 * @param item - an item ready to send to the backend
 * @param callback - function(err, response)
 */
Queue.prototype._makeApiRequest = function(item, callback) {
  var rateLimitResponse = this.rateLimiter.shouldSend(item);
  if (rateLimitResponse.shouldSend) {
    this.api.postItem(item, function(err, resp) {
      if (err) {
        this._maybeRetry(err, item, callback);
      } else {
        callback(err, resp);
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
Queue.prototype._maybeRetry = function(err, item, callback) {
  var shouldRetry = false;
  if (this.options.retryInterval) {
    for (var i = 0, len = RETRIABLE_ERRORS.length; i < len; i++) {
      if (err.code === RETRIABLE_ERRORS[i]) {
        shouldRetry = true;
        break;
      }
    }
    if (shouldRetry && _.isFiniteNumber(this.options.maxRetries)) {
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
Queue.prototype._retryApiRequest = function(item, callback) {
  this.retryQueue.push({item: item, callback: callback});

  if (!this.retryHandle) {
    this.retryHandle = setInterval(function() {
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
Queue.prototype._dequeuePendingRequest = function(item) {
  var idx = this.pendingRequests.indexOf(item);
  if (idx !== -1) {
    this.pendingRequests.splice(idx, 1);
    this._maybeCallWait();
  }
};

Queue.prototype._maybeLog = function(data, originalError) {
  if (this.logger && this.options.verbose) {
    var message = originalError;
    message = message || _.get(data, 'body.trace.exception.message');
    message = message || _.get(data, 'body.trace_chain.0.exception.message');
    if (message) {
      this.logger.error(message);
      return;
    }
    message = _.get(data, 'body.message.body');
    if (message) {
      this.logger.log(message);
    }
  }
};

Queue.prototype._maybeCallWait = function() {
  if (_.isFunction(this.waitCallback) && this.pendingItems.length === 0 && this.pendingRequests.length === 0) {
    if (this.waitIntervalID) {
      this.waitIntervalID = clearInterval(this.waitIntervalID);
    }
    this.waitCallback();
    return true;
  }
  return false;
};

module.exports = Queue;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

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
Notifier.prototype.configure = function(options) {
  this.queue && this.queue.configure(options);
  var oldOptions = this.options;
  this.options = _.merge(oldOptions, options);
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
Notifier.prototype.addTransform = function(transform) {
  if (_.isFunction(transform)) {
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
Notifier.prototype.log = function(item, callback) {
  if (!callback || !_.isFunction(callback)) {
    callback = function() {};
  }

  if (!this.options.enabled) {
    return callback(new Error('Rollbar is not enabled'));
  }

  this.queue.addPendingItem(item);
  var originalError = item.err;
  this._applyTransforms(item, function(err, i) {
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
Notifier.prototype._applyTransforms = function(item, callback) {
  var transformIndex = -1;
  var transformsLength = this.transforms.length;
  var transforms = this.transforms;
  var options = this.options;

  var cb = function(err, i) {
    if (err) {
      callback(err, null);
      return;
    }

    transformIndex++;

    if (transformIndex === transformsLength) {
      callback(null, i);
      return;
    }

    transforms[transformIndex](i, options, cb);
  };

  cb(null, item);
};

module.exports = Notifier;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var helpers = __webpack_require__(16);

var defaultOptions = {
  hostname: 'api.rollbar.com',
  path: '/api/1/item/',
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
function Api(options, transport, urllib, truncation, jsonBackup) {
  this.options = options;
  this.transport = transport;
  this.url = urllib;
  this.truncation = truncation;
  this.jsonBackup = jsonBackup;
  this.accessToken = options.accessToken;
  this.transportOptions = _getTransport(options, urllib);
}

/**
 *
 * @param data
 * @param callback
 */
Api.prototype.postItem = function(data, callback) {
  var transportOptions = helpers.transportOptions(this.transportOptions, 'POST');
  var payload = helpers.buildPayload(this.accessToken, data, this.jsonBackup);
  this.transport.post(this.accessToken, transportOptions, payload, callback);
};

/**
 *
 * @param data
 * @param callback
 */
Api.prototype.buildJsonPayload = function(data, callback) {
  var payload = helpers.buildPayload(this.accessToken, data, this.jsonBackup);

  var stringifyResult;
  if (this.truncation) {
    stringifyResult = this.truncation.truncate(payload);
  } else {
    stringifyResult = _.stringify(payload)
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
Api.prototype.postJsonPayload = function(jsonPayload, callback) {
  var transportOptions = helpers.transportOptions(this.transportOptions, 'POST');
  this.transport.postJsonPayload(this.accessToken, transportOptions, jsonPayload, callback);
};

Api.prototype.configure = function(options) {
  var oldOptions = this.oldOptions;
  this.options = _.merge(oldOptions, options);
  this.transportOptions = _getTransport(this.options, this.url);
  if (this.options.accessToken !== undefined) {
    this.accessToken = this.options.accessToken;
  }
  return this;
};

function _getTransport(options, url) {
  return helpers.getTransportFromOptions(options, defaultOptions, url);
}

module.exports = Api;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

function buildPayload(accessToken, data, jsonBackup) {
  if (!_.isType(data.context, 'string')) {
    var contextResult = _.stringify(data.context, jsonBackup);
    if (contextResult.error) {
      data.context = 'Error: could not serialize \'context\'';
    } else {
      data.context = contextResult.value || '';
    }
    if (data.context.length > 255) {
      data.context = data.context.substr(0, 255);
    }
  }
  return {
    access_token: accessToken,
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
    proxy: proxy
  };
}

function transportOptions(transport, method) {
  var protocol = transport.protocol || 'https:';
  var port = transport.port || (protocol === 'http:' ? 80 : protocol === 'https:' ? 443 : undefined);
  var hostname = transport.hostname;
  var path = transport.path;
  var timeout = transport.timeout;
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
    method: method
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

module.exports = {
  buildPayload: buildPayload,
  getTransportFromOptions: getTransportFromOptions,
  transportOptions: transportOptions,
  appendPathToPath: appendPathToPath
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

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


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

  while (
    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
      all[0]
    );

  return v > 4 ? v : undef;
}

var Detection = {
  ieVersion: getIEVersion
};

module.exports = Detection;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function captureUncaughtExceptions(window, handler, shim) {
  if (!window) { return; }
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

  var fn = function() {
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
  if (!window) { return; }

  if (typeof window._rollbarURH === 'function' && window._rollbarURH.belongsToShim) {
    window.removeEventListener('unhandledrejection', window._rollbarURH);
  }

  var rejectionHandler = function (evt) {
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


module.exports = {
  captureUncaughtExceptions: captureUncaughtExceptions,
  captureUnhandledRejections: captureUnhandledRejections
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*global XDomainRequest*/

var _ = __webpack_require__(0);
var logger = __webpack_require__(1);

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

Transport.prototype.get = function(accessToken, options, params, callback, requestFactory) {
  if (!callback || !_.isFunction(callback)) {
    callback = function() {};
  }
  _.addParamsAndAccessTokenToPath(accessToken, options, params);

  var method = 'GET';
  var url = _.formatUrl(options);
  _makeZoneRequest(accessToken, url, method, null, callback, requestFactory, options.timeout);
}

Transport.prototype.post = function(accessToken, options, payload, callback, requestFactory) {
  if (!callback || !_.isFunction(callback)) {
    callback = function() {};
  }

  if (!payload) {
    return callback(new Error('Cannot send empty request'));
  }

  var stringifyResult;
  if (this.truncation) {
    stringifyResult = this.truncation.truncate(payload);
  } else {
    stringifyResult = _.stringify(payload)
  }
  if (stringifyResult.error) {
    return callback(stringifyResult.error);
  }

  var writeData = stringifyResult.value;
  var method = 'POST';
  var url = _.formatUrl(options);
  _makeZoneRequest(accessToken, url, method, writeData, callback, requestFactory, options.timeout);
}

Transport.prototype.postJsonPayload = function (accessToken, options, jsonPayload, callback, requestFactory) {
  if (!callback || !_.isFunction(callback)) {
    callback = function() {};
  }

  var method = 'POST';
  var url = _.formatUrl(options);
  _makeZoneRequest(accessToken, url, method, jsonPayload, callback, requestFactory, options.timeout);
}


// Wraps _makeRequest and if Angular 2+ Zone.js is detected, changes scope
// so Angular change detection isn't triggered on each API call.
// This is the equivalent of runOutsideAngular().
//
function _makeZoneRequest() {
  var gWindow = ((typeof window != 'undefined') && window) || ((typeof self != 'undefined') && self);
  var currentZone = gWindow && gWindow.Zone && gWindow.Zone.current;
  var args = Array.prototype.slice.call(arguments);

  if (currentZone && currentZone._name === 'angular') {
    var rootZone = currentZone._parent;
    rootZone.run(function () {
      _makeRequest.apply(undefined, args);
    });
  } else {
    _makeRequest.apply(undefined, args);
  }
}

/* global RollbarProxy */
function _proxyRequest(json, callback) {
  var rollbarProxy = new RollbarProxy();
  rollbarProxy.sendJsonPayload(
    json,
    function(_msg) { /* do nothing */ }, // eslint-disable-line no-unused-vars
    function(err) {
      callback(new Error(err));
    }
  );
}

function _makeRequest(accessToken, url, method, data, callback, requestFactory, timeout) {
  if (typeof RollbarProxy !== 'undefined') {
    return _proxyRequest(data, callback);
  }

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
      var onreadystatechange = function() {
        try {
          if (onreadystatechange && request.readyState === 4) {
            onreadystatechange = undefined;

            var parseResponse = _.jsonParse(request.responseText);
            if (_isSuccess(request)) {
              callback(parseResponse.error, parseResponse.value);
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

      if(_.isFiniteNumber(timeout)) {
        request.timeout = timeout;
      }

      request.onreadystatechange = onreadystatechange;
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
        xdomainrequest.onprogress = function() {};
        xdomainrequest.ontimeout = function() {
          var msg = 'Request timed out';
          var code = 'ETIMEDOUT';
          callback(_newRetriableError(msg, code));
        };
        xdomainrequest.onerror = function() {
          callback(new Error('Error during request'));
        };
        xdomainrequest.onload = function() {
          var parseResponse = _.jsonParse(xdomainrequest.responseText);
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

  var factories = [
    function () {
      return new XMLHttpRequest();
    },
    function () {
      return new ActiveXObject('Msxml2.XMLHTTP');
    },
    function () {
      return new ActiveXObject('Msxml3.XMLHTTP');
    },
    function () {
      return new ActiveXObject('Microsoft.XMLHTTP');
    }
  ];
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
  return r && _.isType(r.status, 'number') && r.status >= 400 && r.status < 600;
}

function _newRetriableError(message, code) {
  var err = new Error(message);
  err.code = code || 'ENOTFOUND';
  return err;
}

module.exports = Transport;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var errorParser = __webpack_require__(3);
var logger = __webpack_require__(1);

function handleDomException(item, options, callback) {
  if(item.err && errorParser.Stack(item.err).name === 'DOMException') {
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
        addErrorContext(item);
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

function addErrorContext(item) {
  var chain = [];
  var err = item.err;

  chain.push(err);

  while (err.nested) {
    err = err.nested;
    chain.push(err);
  }

  _.addErrorContext(item, chain);
}

function ensureItemHasSomethingToSay(item, options, callback) {
  if (!item.message && !item.stackInfo && !item.custom) {
    callback(new Error('No message, stack info, or custom data'), null);
  }
  callback(null, item);
}

function addBaseInfo(item, options, callback) {
  var environment = (options.payload && options.payload.environment) || options.environment;
  item.data = _.merge(item.data, {
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
  return function(item, options, callback) {
    if (!window || !window.location) {
      return callback(null, item);
    }
    var remoteString = '$remote_ip';
    if (!options.captureIp) {
      remoteString = null;
    } else if (options.captureIp !== true) {
      remoteString += '_anonymize';
    }
    _.set(item, 'data.request', {
      url: window.location.href,
      query_string: window.location.search,
      user_ip: remoteString
    });
    callback(null, item);
  };
}

function addClientInfo(window) {
  return function(item, options, callback) {
    if (!window) {
      return callback(null, item);
    }
    var nav = window.navigator || {};
    var scr = window.screen || {};
    _.set(item, 'data.client', {
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
  return function(item, options, callback) {
    if (!window || !window.navigator) {
      return callback(null, item);
    }
    var plugins = [];
    var navPlugins = window.navigator.plugins || [];
    var cur;
    for (var i=0, l=navPlugins.length; i < l; ++i) {
      cur = navPlugins[i];
      plugins.push({name: cur.name, description: cur.description});
    }
    _.set(item, 'data.client.javascript.plugins', plugins);
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
    result.extra = _.merge(custom);
  }

  _.set(item, 'data.body', {message: result});
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

  _.set(item, 'data.body', {trace_chain: traces});
  callback(null, item);
}

function addBodyTrace(item, options, callback) {
  var stack = stackFromItem(item);

  if (stack) {
    var trace = buildTrace(item, item.stackInfo, options);
    _.set(item, 'data.body', {trace: trace});
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
      'class': className,
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
        filename: stackFrame.url ? _.sanitizeUrl(stackFrame.url) : '(unknown)',
        lineno: stackFrame.line || null,
        method: (!stackFrame.func || stackFrame.func === '?') ? '[anonymous]' : stackFrame.func,
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
      trace.extra = _.merge(custom);
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
  }
}

module.exports = {
  handleDomException: handleDomException,
  handleItemWithError: handleItemWithError,
  ensureItemHasSomethingToSay: ensureItemHasSomethingToSay,
  addBaseInfo: addBaseInfo,
  addRequestInfo: addRequestInfo,
  addClientInfo: addClientInfo,
  addPluginInfo: addPluginInfo,
  addBody: addBody,
  addScrubber: addScrubber
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(23)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[()]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return filtered.map(function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(\),.*$)/g, '');
                }
                var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(');

                // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
                // case it has spaces in it, as the string is split on \s+ later on
                var location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/);

                // remove the parenthesized location from the line, if it was matched
                sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;

                var tokens = sanitizedLine.split(/\s+/).slice(1);
                // if a location was matched, pass it to extractLocation() otherwise pop the last token
                var locationParts = this.extractLocation(location ? location[1] : tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame({
                    functionName: functionName,
                    fileName: fileName,
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return filtered.map(function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame({
                        functionName: line
                    });
                } else {
                    var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
                    var matches = line.match(functionNameRegex);
                    var functionName = matches && matches[1] ? matches[1] : undefined;
                    var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));

                    return new StackFrame({
                        functionName: functionName,
                        fileName: locationParts[0],
                        lineNumber: locationParts[1],
                        columnNumber: locationParts[2],
                        source: line
                    });
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame({
                        fileName: match[2],
                        lineNumber: match[1],
                        source: lines[i]
                    }));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame({
                            functionName: match[3] || undefined,
                            fileName: match[2],
                            lineNumber: match[1],
                            source: lines[i]
                        })
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return filtered.map(function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                    .replace(/<anonymous function(: (\w+))?>/, '$2')
                    .replace(/\([^)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');

                return new StackFrame({
                    functionName: functionName,
                    args: args,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        }
    };
}));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function() {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    function _getter(p) {
        return function() {
            return this[p];
        };
    }

    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    var numericProps = ['columnNumber', 'lineNumber'];
    var stringProps = ['fileName', 'functionName', 'source'];
    var arrayProps = ['args'];
    var objectProps = ['evalOrigin'];

    var props = booleanProps.concat(numericProps, stringProps, arrayProps, objectProps);

    function StackFrame(obj) {
        if (!obj) return;
        for (var i = 0; i < props.length; i++) {
            if (obj[props[i]] !== undefined) {
                this['set' + _capitalize(props[i])](obj[props[i]]);
            }
        }
    }

    StackFrame.prototype = {
        getArgs: function() {
            return this.args;
        },
        setArgs: function(v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        getEvalOrigin: function() {
            return this.evalOrigin;
        },
        setEvalOrigin: function(v) {
            if (v instanceof StackFrame) {
                this.evalOrigin = v;
            } else if (v instanceof Object) {
                this.evalOrigin = new StackFrame(v);
            } else {
                throw new TypeError('Eval Origin must be an Object or StackFrame');
            }
        },

        toString: function() {
            var fileName = this.getFileName() || '';
            var lineNumber = this.getLineNumber() || '';
            var columnNumber = this.getColumnNumber() || '';
            var functionName = this.getFunctionName() || '';
            if (this.getIsEval()) {
                if (fileName) {
                    return '[eval] (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
                }
                return '[eval]:' + lineNumber + ':' + columnNumber;
            }
            if (functionName) {
                return functionName + ' (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
            }
            return fileName + ':' + lineNumber + ':' + columnNumber;
        }
    };

    StackFrame.fromString = function StackFrame$$fromString(str) {
        var argsStartIndex = str.indexOf('(');
        var argsEndIndex = str.lastIndexOf(')');

        var functionName = str.substring(0, argsStartIndex);
        var args = str.substring(argsStartIndex + 1, argsEndIndex).split(',');
        var locationString = str.substring(argsEndIndex + 1);

        if (locationString.indexOf('@') === 0) {
            var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString, '');
            var fileName = parts[1];
            var lineNumber = parts[2];
            var columnNumber = parts[3];
        }

        return new StackFrame({
            functionName: functionName,
            args: args || undefined,
            fileName: fileName,
            lineNumber: lineNumber || undefined,
            columnNumber: columnNumber || undefined
        });
    };

    for (var i = 0; i < booleanProps.length; i++) {
        StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function(p) {
            return function(v) {
                this[p] = Boolean(v);
            };
        })(booleanProps[i]);
    }

    for (var j = 0; j < numericProps.length; j++) {
        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
        StackFrame.prototype['set' + _capitalize(numericProps[j])] = (function(p) {
            return function(v) {
                if (!_isNumber(v)) {
                    throw new TypeError(p + ' must be a Number');
                }
                this[p] = Number(v);
            };
        })(numericProps[j]);
    }

    for (var k = 0; k < stringProps.length; k++) {
        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
        StackFrame.prototype['set' + _capitalize(stringProps[k])] = (function(p) {
            return function(v) {
                this[p] = String(v);
            };
        })(stringProps[k]);
    }

    return StackFrame;
}));


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

function itemToPayload(item, options, callback) {
  var payloadOptions = options.payload || {};
  if (payloadOptions.body) {
    delete payloadOptions.body;
  }

  var data = _.merge(item.data, payloadOptions);
  if (item._isUncaught) {
    data._isUncaught = true;
  }
  if (item._originalArgs) {
    data._originalArgs = item._originalArgs;
  }
  callback(null, data);
}

function addTelemetryData(item, options, callback) {
  if (item.telemetryEvents) {
    _.set(item, 'data.body.telemetry', item.telemetryEvents);
  }
  callback(null, item);
}

function addMessageWithError(item, options, callback) {
  if (!item.message) {
    callback(null, item);
    return;
  }
  var tracePath = 'data.body.trace_chain.0';
  var trace = _.get(item, tracePath);
  if (!trace) {
    tracePath = 'data.body.trace';
    trace = _.get(item, tracePath);
  }
  if (trace) {
    if (!(trace.exception && trace.exception.description)) {
      _.set(item, tracePath+'.exception.description', item.message);
      callback(null, item);
      return;
    }
    var extra = _.get(item, tracePath+'.extra') || {};
    var newExtra =  _.merge(extra, {message: item.message});
    _.set(item, tracePath+'.extra', newExtra);
  }
  callback(null, item);
}

function userTransform(logger) {
  return function(item, options, callback) {
    var newItem = _.merge(item);
    var response = null;
    try {
      if (_.isFunction(options.transform)) {
        response = options.transform(newItem.data, item);
      }
    } catch (e) {
      options.transform = null;
      logger.error('Error while calling custom transform() function. Removing custom transform().', e);
      callback(null, item);
      return;
    }
    if(_.isPromise(response)) {
      response.then(function (promisedItem) {
        if(promisedItem) {
          newItem.data = promisedItem;
        }
        callback(null, newItem);
      }, function (error) {
        callback(error, item);
      });
    } else {
      callback(null, newItem);
    }
  }
}

function addConfigToPayload(item, options, callback) {
  if (!options.sendConfig) {
    return callback(null, item);
  }
  var configKey = '_rollbarConfig';
  var custom = _.get(item, 'data.custom') || {};
  custom[configKey] = options;
  item.data.custom = custom;
  callback(null, item);
}

function addFunctionOption(options, name) {
  if(_.isFunction(options[name])) {
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
  var diagnostic = _.merge(item.notifier.client.notifier.diagnostic, item.diagnostic);

  if (_.get(item, 'err._isAnonymous')) {
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
      diagnostic.raw_error = { failed: String(e) };
    }
  }

  item.data.notifier.diagnostic = _.merge(item.data.notifier.diagnostic, diagnostic);
  callback(null, item);
}

module.exports = {
  itemToPayload: itemToPayload,
  addTelemetryData: addTelemetryData,
  addMessageWithError: addMessageWithError,
  userTransform: userTransform,
  addConfigToPayload: addConfigToPayload,
  addConfiguredOptions: addConfiguredOptions,
  addDiagnosticKeys: addDiagnosticKeys
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

function checkIgnore(item, settings) {
  if (_.get(settings, 'plugins.jquery.ignoreAjaxErrors')) {
    return !_.get(item, 'body.message.extra.isAjax');
  }
  return true;
}

module.exports = {
  checkIgnore: checkIgnore
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

function checkLevel(item, settings) {
  var level = item.level;
  var levelVal = _.LEVELS[level] || 0;
  var reportLevel = settings.reportLevel;
  var reportLevelVal = _.LEVELS[reportLevel] || 0;

  if (levelVal < reportLevelVal) {
    return false;
  }
  return true;
}

function userCheckIgnore(logger) {
  return function(item, settings) {
    var isUncaught = !!item._isUncaught;
    delete item._isUncaught;
    var args = item._originalArgs;
    delete item._originalArgs;
    try {
      if (_.isFunction(settings.onSendCallback)) {
        settings.onSendCallback(isUncaught, args, item);
      }
    } catch (e) {
      settings.onSendCallback = null;
      logger.error('Error while calling onSendCallback, removing', e);
    }
    try {
      if (_.isFunction(settings.checkIgnore) && settings.checkIgnore(isUncaught, args, item)) {
        return false;
      }
    } catch (e) {
      settings.checkIgnore = null;
      logger.error('Error while calling custom checkIgnore(), removing', e);
    }
    return true;
  }
}

function urlIsNotBlockListed(logger) {
  return function(item, settings) {
    return !urlIsOnAList(item, settings, 'blocklist', logger);
  }
}

function urlIsSafeListed(logger) {
  return function(item, settings) {
    return urlIsOnAList(item, settings, 'safelist', logger);
  }
}

function matchFrames(trace, list, block) {
  if (!trace) { return !block }

  var frames = trace.frames;

  if (!frames || frames.length === 0) { return !block; }

  var frame, filename, url, urlRegex;
  var listLength = list.length;
  var frameLength = frames.length;
  for (var i = 0; i < frameLength; i++) {
    frame = frames[i];
    filename = frame.filename;

    if (!_.isType(filename, 'string')) { return !block; }

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
    traces = _.get(item, 'body.trace_chain') || [_.get(item, 'body.trace')];

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
      if(matchFrames(traces[i], list, block)) {
        return true;
      }
    }
  } catch (e)
  /* istanbul ignore next */
  {
    if (block) {
      settings.hostBlockList = null;
    } else {
      settings.hostSafeList = null;
    }
    var listName = block ? 'hostBlockList' : 'hostSafeList';
    logger.error('Error while reading your configuration\'s ' + listName + ' option. Removing custom ' + listName + '.', e);
    return !block;
  }
  return false;
}

function messageIsIgnored(logger) {
  return function(item, settings) {
    var i, j, ignoredMessages, len, messageIsIgnored, rIgnoredMessage, messages;

    try {
      messageIsIgnored = false;
      ignoredMessages = settings.ignoredMessages;

      if (!ignoredMessages || ignoredMessages.length === 0) {
        return true;
      }

      messages = messagesFromItem(item);

      if (messages.length === 0){
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
    } catch(e)
    /* istanbul ignore next */
    {
      settings.ignoredMessages = null;
      logger.error('Error while reading your configuration\'s ignoredMessages option. Removing custom ignoredMessages.');
    }

    return true;
  }
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
      messages.push(_.get(trace, 'exception.message'));
    }
  }
  if (body.trace) {
    messages.push(_.get(body, 'trace.exception.message'));
  }
  if (body.message) {
    messages.push(_.get(body, 'message.body'));
  }
  return messages;
}

module.exports = {
  checkLevel: checkLevel,
  userCheckIgnore: userCheckIgnore,
  urlIsNotBlockListed: urlIsNotBlockListed,
  urlIsSafeListed: urlIsSafeListed,
  messageIsIgnored: messageIsIgnored
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  version: '2.24.0',
  endpoint: 'api.rollbar.com/api/1/item/',
  logLevel: 'debug',
  reportLevel: 'debug',
  uncaughtErrorLevel: 'error',
  maxItems: 0,
  itemsPerMin: 60
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  scrubFields: [
    'pw',
    'pass',
    'passwd',
    'password',
    'secret',
    'confirm_password',
    'confirmPassword',
    'password_confirmation',
    'passwordConfirmation',
    'access_token',
    'accessToken',
    'X-Rollbar-Access-Token',
    'secret_key',
    'secretKey',
    'secretToken',
    'cc-number',
    'card number',
    'cardnumber',
    'cardnum',
    'ccnum',
    'ccnumber',
    'cc num',
    'creditcardnumber',
    'credit card number',
    'newcreditcardnumber',
    'new credit card',
    'creditcardno',
    'credit card no',
    'card#',
    'card #',
    'cc-csc',
    'cvc',
    'cvc2',
    'cvv2',
    'ccv2',
    'security code',
    'card verification',
    'name on credit card',
    'name on card',
    'nameoncard',
    'cardholder',
    'card holder',
    'name des karteninhabers',
    'ccname',
    'card type',
    'cardtype',
    'cc type',
    'cctype',
    'payment type',
    'expiration date',
    'expirationdate',
    'expdate',
    'cc-exp',
    'ccmonth',
    'ccyear'
  ]
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

var MAX_EVENTS = 100;

function Telemeter(options) {
  this.queue = [];
  this.options = _.merge(options);
  var maxTelemetryEvents = this.options.maxTelemetryEvents || MAX_EVENTS;
  this.maxQueueSize = Math.max(0, Math.min(maxTelemetryEvents, MAX_EVENTS));
}

Telemeter.prototype.configure = function(options) {
  var oldOptions = this.options;
  this.options = _.merge(oldOptions, options);
  var maxTelemetryEvents = this.options.maxTelemetryEvents || MAX_EVENTS;
  var newMaxEvents = Math.max(0, Math.min(maxTelemetryEvents, MAX_EVENTS));
  var deleteCount = 0;
  if (this.maxQueueSize > newMaxEvents) {
    deleteCount = this.maxQueueSize - newMaxEvents;
  }
  this.maxQueueSize = newMaxEvents;
  this.queue.splice(0, deleteCount);
};

Telemeter.prototype.copyEvents = function() {
  var events = Array.prototype.slice.call(this.queue, 0);
  if (_.isFunction(this.options.filterTelemetry)) {
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
  return events;
};

Telemeter.prototype.capture = function(type, metadata, level, rollbarUUID, timestamp) {
  var e = {
    level: getLevel(type, level),
    type: type,
    timestamp_ms: timestamp || _.now(),
    body: metadata,
    source: 'client'
  };
  if (rollbarUUID) {
    e.uuid = rollbarUUID;
  }

  try {
    if (_.isFunction(this.options.filterTelemetry) && this.options.filterTelemetry(e)) {
      return false;
    }
  } catch (exc) {
    this.options.filterTelemetry = null;
  }

  this.push(e);
  return e;
};

Telemeter.prototype.captureEvent = function(type, metadata, level, rollbarUUID) {
  return this.capture(type, metadata, level, rollbarUUID);
};

Telemeter.prototype.captureError = function(err, level, rollbarUUID, timestamp) {
  var metadata = {
    message: err.message || String(err)
  };
  if (err.stack) {
    metadata.stack = err.stack;
  }
  return this.capture('error', metadata, level, rollbarUUID, timestamp);
};

Telemeter.prototype.captureLog = function(message, level, rollbarUUID, timestamp) {
  return this.capture('log', {
    message: message
  }, level, rollbarUUID, timestamp);
};

Telemeter.prototype.captureNetwork = function(metadata, subtype, rollbarUUID, requestData) {
  subtype = subtype || 'xhr';
  metadata.subtype = metadata.subtype || subtype;
  if (requestData) {
    metadata.request = requestData;
  }
  var level = this.levelFromStatus(metadata.status_code);
  return this.capture('network', metadata, level, rollbarUUID);
};

Telemeter.prototype.levelFromStatus = function(statusCode) {
  if (statusCode >= 200 && statusCode < 400) {
    return 'info';
  }
  if (statusCode === 0 || statusCode >= 400) {
    return 'error';
  }
  return 'info';
};

Telemeter.prototype.captureDom = function(subtype, element, value, checked, rollbarUUID) {
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

Telemeter.prototype.captureNavigation = function(from, to, rollbarUUID) {
  return this.capture('navigation', {from: from, to: to}, 'info', rollbarUUID);
};

Telemeter.prototype.captureDomContentLoaded = function(ts) {
  return this.capture('navigation', {subtype: 'DOMContentLoaded'}, 'info', undefined, ts && ts.getTime());
  /**
   * If we decide to make this a dom event instead, then use the line below:
  return this.capture('dom', {subtype: 'DOMContentLoaded'}, 'info', undefined, ts && ts.getTime());
  */
};
Telemeter.prototype.captureLoad = function(ts) {
  return this.capture('navigation', {subtype: 'load'}, 'info', undefined, ts && ts.getTime());
  /**
   * If we decide to make this a dom event instead, then use the line below:
  return this.capture('dom', {subtype: 'load'}, 'info', undefined, ts && ts.getTime());
  */
};

Telemeter.prototype.captureConnectivityChange = function(type, rollbarUUID) {
  return this.captureNetwork({change: type}, 'connectivity', rollbarUUID);
};

// Only intended to be used internally by the notifier
Telemeter.prototype._captureRollbarItem = function(item) {
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

Telemeter.prototype.push = function(e) {
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

module.exports = Telemeter;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var scrub = __webpack_require__(4);
var urlparser = __webpack_require__(2);
var domUtil = __webpack_require__(31);

var defaults = {
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

function replace(obj, name, replacement, replacements, type) {
  var orig = obj[name];
  obj[name] = replacement(orig);
  if (replacements) {
    replacements[type].push([obj, name, orig]);
  }
}

function restore(replacements, type) {
  var b;
  while (replacements[type].length) {
    b = replacements[type].shift();
    b[0][b[1]] = b[2];
  }
}

function nameFromDescription(description) {
  if (!description || !description.attributes) { return null; }
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
  return function(description) {
    var name = nameFromDescription(description);
    if (!name) { return false; }
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
    if (!_.isType(autoInstrument, 'object')) {
      autoInstrument = defaults;
    }
    this.autoInstrument = _.merge(defaults, autoInstrument);
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

Instrumenter.prototype.configure = function(options) {
  this.options = _.merge(this.options, options);
  var autoInstrument = options.autoInstrument;
  var oldSettings = _.merge(this.autoInstrument);
  if (options.enabled === false || autoInstrument === false) {
    this.autoInstrument = {};
  } else {
    if (!_.isType(autoInstrument, 'object')) {
      autoInstrument = defaults;
    }
    this.autoInstrument = _.merge(defaults, autoInstrument);
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
Instrumenter.prototype.instrument = function(oldSettings) {
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

Instrumenter.prototype.deinstrumentNetwork = function() {
  restore(this.replacements, 'network');
};

Instrumenter.prototype.instrumentNetwork = function() {
  var self = this;

  function wrapProp(prop, xhr) {
    if (prop in xhr && _.isFunction(xhr[prop])) {
      replace(xhr, prop, function(orig) {
        return self.rollbar.wrap(orig);
      });
    }
  }

  if ('XMLHttpRequest' in this._window) {
    var xhrp = this._window.XMLHttpRequest.prototype;
    replace(xhrp, 'open', function(orig) {
      return function(method, url) {
        if (_.isType(url, 'string')) {
          if (this.__rollbar_xhr) {
            this.__rollbar_xhr.method = method;
            this.__rollbar_xhr.url = url;
            this.__rollbar_xhr.status_code = null;
            this.__rollbar_xhr.start_time_ms = _.now();
            this.__rollbar_xhr.end_time_ms = null;
          } else {
            this.__rollbar_xhr = {
              method: method,
              url: url,
              status_code: null,
              start_time_ms: _.now(),
              end_time_ms: null
            };
          }
        }
        return orig.apply(this, arguments);
      };
    }, this.replacements, 'network');

    replace(xhrp, 'setRequestHeader', function(orig) {
      return function(header, value) {
        // If xhr.open is async, __rollbar_xhr may not be initialized yet.
        if (!this.__rollbar_xhr) {
          this.__rollbar_xhr = {};
        }
        if (_.isType(header, 'string') && _.isType(value, 'string')) {
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

    replace(xhrp, 'send', function(orig) {
      /* eslint-disable no-unused-vars */
      return function(data) {
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
              xhr.__rollbar_xhr.start_time_ms = _.now();
            }
            if (xhr.readyState > 3) {
              xhr.__rollbar_xhr.end_time_ms = _.now();

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
                      for (i=0; i < arr.length; i++) {
                        parts = arr[i].split(': ');
                        header = parts.shift();
                        value = parts.join(': ');
                        headers[header] = value;
                      }
                    }
                  } else {
                    for (i=0; i < headersConfig.length; i++) {
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

        if ('onreadystatechange' in xhr && _.isFunction(xhr.onreadystatechange)) {
          replace(xhr, 'onreadystatechange', function(orig) {
            return self.rollbar.wrap(orig, undefined, onreadystatechangeHandler);
          });
        } else {
          xhr.onreadystatechange = onreadystatechangeHandler;
        }
        if (xhr.__rollbar_xhr && self.trackHttpErrors()) {
          xhr.__rollbar_xhr.stack = (new Error()).stack;
        }
        return orig.apply(this, arguments);
      }
    }, this.replacements, 'network');
  }

  if ('fetch' in this._window) {
    replace(this._window, 'fetch', function(orig) {
      /* eslint-disable no-unused-vars */
      return function(fn, t) {
      /* eslint-enable no-unused-vars */
        var args = new Array(arguments.length);
        for (var i=0, len=args.length; i < len; i++) {
          args[i] = arguments[i];
        }
        var input = args[0];
        var method = 'GET';
        var url;
        if (_.isType(input, 'string')) {
          url = input;
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
          start_time_ms: _.now(),
          end_time_ms: null
        };
        if (args[1] && args[1].headers) {
          // Argument may be a Headers object, or plain object. Ensure here that
          // we are working with a Headers object with case-insensitive keys.
          var reqHeaders = new Headers(args[1].headers);

          metadata.request_content_type = reqHeaders.get('Content-Type');

          if (self.autoInstrument.networkRequestHeaders) {
            metadata.request_headers = self.fetchHeaders(reqHeaders, self.autoInstrument.networkRequestHeaders)
          }
        }

        if (self.autoInstrument.networkRequestBody) {
          if (args[1] && args[1].body) {
            metadata.request = args[1].body;
          } else if (args[0] && !_.isType(args[0], 'string') && args[0].body) {
            metadata.request = args[0].body;
          }
        }
        self.captureNetwork(metadata, 'fetch', undefined);
        if (self.trackHttpErrors()) {
          metadata.stack = (new Error()).stack;
        }
        return orig.apply(this, args).then(function (resp) {
          metadata.end_time_ms = _.now();
          metadata.status_code = resp.status;
          metadata.response_content_type = resp.headers.get('Content-Type');
          var headers = null;
          if (self.autoInstrument.networkResponseHeaders) {
            headers = self.fetchHeaders(resp.headers, self.autoInstrument.networkResponseHeaders);
          }
          var body = null;
          if (self.autoInstrument.networkResponseBody) {
            if (typeof resp.text === 'function') { // Response.text() is not implemented on some platforms
              // The response must be cloned to prevent reading (and locking) the original stream.
              body = resp.clone().text(); //returns a Promise
            }
          }
          if (headers || body) {
            metadata.response = {};
            if (body) {
              // Test to ensure body is a Promise, which it should always be.
              if (typeof body.then === 'function') {
                body.then(function (text) {
                  if (self.isJsonContentType(metadata.response_content_type)) {
                    metadata.response.body = self.scrubJson(text);
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

Instrumenter.prototype.captureNetwork = function(metadata, subtype, rollbarUUID) {
  if (metadata.request && this.isJsonContentType(metadata.request_content_type)) {
    metadata.request = this.scrubJson(metadata.request);
  }
  return this.telemeter.captureNetwork(metadata, subtype, rollbarUUID);
};

Instrumenter.prototype.isJsonContentType = function(contentType) {
  return (contentType && _.isType(contentType, 'string') && contentType.toLowerCase().includes('json')) ? true : false;
}

Instrumenter.prototype.scrubJson = function(json) {
  return JSON.stringify(scrub(JSON.parse(json), this.options.scrubFields));
}

Instrumenter.prototype.fetchHeaders = function(inHeaders, headersConfig) {
  var outHeaders = {};
  try {
    var i;
    if (headersConfig === true) {
      if (typeof inHeaders.entries === 'function') { // Headers.entries() is not implemented in IE
        var allHeaders = inHeaders.entries();
        var currentHeader = allHeaders.next();
        while (!currentHeader.done) {
          outHeaders[currentHeader.value[0]] = currentHeader.value[1];
          currentHeader = allHeaders.next();
        }
      }
    } else {
      for (i=0; i < headersConfig.length; i++) {
        var header = headersConfig[i];
        outHeaders[header] = inHeaders.get(header);
      }
    }
  } catch (e) {
    /* ignore probable IE errors */
  }
  return outHeaders;
}

Instrumenter.prototype.trackHttpErrors = function() {
  return this.autoInstrument.networkErrorOnHttp5xx ||
    this.autoInstrument.networkErrorOnHttp4xx ||
    this.autoInstrument.networkErrorOnHttp0;
}

Instrumenter.prototype.errorOnHttpStatus = function(metadata) {
  var status = metadata.status_code;

  if ((status >= 500 && this.autoInstrument.networkErrorOnHttp5xx) ||
    (status >= 400 && this.autoInstrument.networkErrorOnHttp4xx) ||
    (status === 0 && this.autoInstrument.networkErrorOnHttp0)) {
    var error = new Error('HTTP request failed with Status ' + status);
    error.stack = metadata.stack;
    this.rollbar.error(error, { skipFrames: 1 });
  }
}

Instrumenter.prototype.deinstrumentConsole = function() {
  if (!('console' in this._window && this._window.console.log)) {
    return;
  }
  var b;
  while (this.replacements['log'].length) {
    b = this.replacements['log'].shift();
    this._window.console[b[0]] = b[1];
  }
};

Instrumenter.prototype.instrumentConsole = function() {
  if (!('console' in this._window && this._window.console.log)) {
    return;
  }

  var self = this;
  var c = this._window.console;

  function wrapConsole(method) {
    'use strict'; // See https://github.com/rollbar/rollbar.js/pull/778

    var orig = c[method];
    var origConsole = c;
    var level = method === 'warn' ? 'warning' : method;
    c[method] = function() {
      var args = Array.prototype.slice.call(arguments);
      var message = _.formatArgsAsString(args);
      self.telemeter.captureLog(message, level);
      if (orig) {
        Function.prototype.apply.call(orig, origConsole, args);
      }
    };
    self.replacements['log'].push([method, orig]);
  }
  var methods = ['debug','info','warn','error','log'];
  try {
    for (var i=0, len=methods.length; i < len; i++) {
      wrapConsole(methods[i]);
    }
  } catch (e) {
    this.diagnostic.instrumentConsole = { error: e.message };
  }
};

Instrumenter.prototype.deinstrumentDom = function() {
  if (!('addEventListener' in this._window || 'attachEvent' in this._window)) {
    return;
  }
  this.removeListeners('dom');
};

Instrumenter.prototype.instrumentDom = function() {
  if (!('addEventListener' in this._window || 'attachEvent' in this._window)) {
    return;
  }
  var clickHandler = this.handleClick.bind(this);
  var blurHandler = this.handleBlur.bind(this);
  this.addListener('dom', this._window, 'click', 'onclick', clickHandler, true);
  this.addListener('dom', this._window, 'blur', 'onfocusout', blurHandler, true);
};

Instrumenter.prototype.handleClick = function(evt) {
  try {
    var e = domUtil.getElementFromEvent(evt, this._document);
    var hasTag = e && e.tagName;
    var anchorOrButton = domUtil.isDescribedElement(e, 'a') || domUtil.isDescribedElement(e, 'button');
    if (hasTag && (anchorOrButton || domUtil.isDescribedElement(e, 'input', ['button', 'submit']))) {
        this.captureDomEvent('click', e);
    } else if (domUtil.isDescribedElement(e, 'input', ['checkbox', 'radio'])) {
      this.captureDomEvent('input', e, e.value, e.checked);
    }
  } catch (exc) {
    // TODO: Not sure what to do here
  }
};

Instrumenter.prototype.handleBlur = function(evt) {
  try {
    var e = domUtil.getElementFromEvent(evt, this._document);
    if (e && e.tagName) {
      if (domUtil.isDescribedElement(e, 'textarea')) {
        this.captureDomEvent('input', e, e.value);
      } else if (domUtil.isDescribedElement(e, 'select') && e.options && e.options.length) {
        this.handleSelectInputChanged(e);
      } else if (domUtil.isDescribedElement(e, 'input') && !domUtil.isDescribedElement(e, 'input', ['button', 'submit', 'hidden', 'checkbox', 'radio'])) {
        this.captureDomEvent('input', e, e.value);
      }
    }
  } catch (exc) {
    // TODO: Not sure what to do here
  }
};

Instrumenter.prototype.handleSelectInputChanged = function(elem) {
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

Instrumenter.prototype.captureDomEvent = function(subtype, element, value, isChecked) {
  if (value !== undefined) {
    if (this.scrubTelemetryInputs || (domUtil.getElementType(element) === 'password')) {
      value = '[scrubbed]';
    } else {
      var description = domUtil.describeElement(element);
      if (this.telemetryScrubber) {
        if (this.telemetryScrubber(description)) {
          value = '[scrubbed]';
        }
      } else if (this.defaultValueScrubber(description)) {
        value = '[scrubbed]';
      }
    }
  }
  var elementString = domUtil.elementArrayToString(domUtil.treeToArray(element));
  this.telemeter.captureDom(subtype, elementString, value, isChecked);
};

Instrumenter.prototype.deinstrumentNavigation = function() {
  var chrome = this._window.chrome;
  var chromePackagedApp = chrome && chrome.app && chrome.app.runtime;
  // See https://github.com/angular/angular.js/pull/13945/files
  var hasPushState = !chromePackagedApp && this._window.history && this._window.history.pushState;
  if (!hasPushState) {
    return;
  }
  restore(this.replacements, 'navigation');
};

Instrumenter.prototype.instrumentNavigation = function() {
  var chrome = this._window.chrome;
  var chromePackagedApp = chrome && chrome.app && chrome.app.runtime;
  // See https://github.com/angular/angular.js/pull/13945/files
  var hasPushState = !chromePackagedApp && this._window.history && this._window.history.pushState;
  if (!hasPushState) {
    return;
  }
  var self = this;
  replace(this._window, 'onpopstate', function(orig) {
    return function() {
      var current = self._location.href;
      self.handleUrlChange(self._lastHref, current);
      if (orig) {
        orig.apply(this, arguments);
      }
    };
  }, this.replacements, 'navigation');

  replace(this._window.history, 'pushState', function(orig) {
    return function() {
      var url = arguments.length > 2 ? arguments[2] : undefined;
      if (url) {
        self.handleUrlChange(self._lastHref, url + '');
      }
      return orig.apply(this, arguments);
    };
  }, this.replacements, 'navigation');
};

Instrumenter.prototype.handleUrlChange = function(from, to) {
  var parsedHref = urlparser.parse(this._location.href);
  var parsedTo = urlparser.parse(to);
  var parsedFrom = urlparser.parse(from);
  this._lastHref = to;
  if (parsedHref.protocol === parsedTo.protocol && parsedHref.host === parsedTo.host) {
    to = parsedTo.path + (parsedTo.hash || '');
  }
  if (parsedHref.protocol === parsedFrom.protocol && parsedHref.host === parsedFrom.host) {
    from = parsedFrom.path + (parsedFrom.hash || '');
  }
  this.telemeter.captureNavigation(from, to);
};

Instrumenter.prototype.deinstrumentConnectivity = function() {
  if (!('addEventListener' in this._window || 'body' in this._document)) {
    return;
  }
  if (this._window.addEventListener) {
    this.removeListeners('connectivity');
  } else {
    restore(this.replacements, 'connectivity');
  }
};

Instrumenter.prototype.instrumentConnectivity = function() {
  if (!('addEventListener' in this._window || 'body' in this._document)) {
    return;
  }
  if (this._window.addEventListener) {
    this.addListener('connectivity', this._window, 'online', undefined, function() {
      this.telemeter.captureConnectivityChange('online');
    }.bind(this), true);
    this.addListener('connectivity', this._window, 'offline', undefined, function() {
      this.telemeter.captureConnectivityChange('offline');
    }.bind(this), true);
  } else {
    var self = this;
    replace(this._document.body, 'ononline', function(orig) {
      return function() {
        self.telemeter.captureConnectivityChange('online');
        if (orig) {
          orig.apply(this, arguments);
        }
      }
    }, this.replacements, 'connectivity');
    replace(this._document.body, 'onoffline', function(orig) {
      return function() {
        self.telemeter.captureConnectivityChange('offline');
        if (orig) {
          orig.apply(this, arguments);
        }
      }
    }, this.replacements, 'connectivity');
  }
};

Instrumenter.prototype.handleCspEvent = function(cspEvent) {
  var message = 'Security Policy Violation: ' +
    'blockedURI: ' + cspEvent.blockedURI + ', ' +
    'violatedDirective: ' + cspEvent.violatedDirective + ', ' +
    'effectiveDirective: ' + cspEvent.effectiveDirective + ', ';

  if (cspEvent.sourceFile) {
    message += 'location: ' + cspEvent.sourceFile + ', ' +
      'line: ' + cspEvent.lineNumber + ', ' +
      'col: ' + cspEvent.columnNumber + ', ';
  }

  message += 'originalPolicy: ' + cspEvent.originalPolicy;

  this.telemeter.captureLog(message, 'error');
  this.handleCspError(message);
}

Instrumenter.prototype.handleCspError = function(message) {
  if (this.autoInstrument.errorOnContentSecurityPolicy) {
    this.rollbar.error(message);
  }
}

Instrumenter.prototype.deinstrumentContentSecurityPolicy = function() {
  if (!('addEventListener' in this._window)) { return; }

  this.removeListeners('contentsecuritypolicy');
};

Instrumenter.prototype.instrumentContentSecurityPolicy = function() {
  if (!('addEventListener' in this._window)) { return; }

  var cspHandler = this.handleCspEvent.bind(this);
  this.addListener('contentsecuritypolicy', this._window, 'securitypolicyviolation', null, cspHandler, false);
};

Instrumenter.prototype.addListener = function(section, obj, type, altType, handler, capture) {
  if (obj.addEventListener) {
    obj.addEventListener(type, handler, capture);
    this.eventRemovers[section].push(function() {
      obj.removeEventListener(type, handler, capture);
    });
  } else if (altType) {
    obj.attachEvent(altType, handler);
    this.eventRemovers[section].push(function() {
      obj.detachEvent(altType, handler);
    });
  }
};

Instrumenter.prototype.removeListeners = function(section) {
  var r;
  while (this.eventRemovers[section].length) {
    r = this.eventRemovers[section].shift();
    r();
  }
};

module.exports = Instrumenter;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
  var separator = ' > ', separatorLength = separator.length;
  var out = [], len = 0, nextStr, totalLength;

  for (var i = a.length - 1; i >= 0; i--) {
    nextStr = descriptionToString(a[i]);
    totalLength = len + (out.length * separatorLength) + nextStr.length;
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
  var out = {}, className, key, attr, i;
  out.tagName = elem.tagName.toLowerCase();
  if (elem.id) {
    out.id = elem.id;
  }
  className = elem.className;
  if (className && (typeof className === 'string')) {
    out.classes = className.split(/\s+/);
  }
  var attributes = ['type', 'name', 'title', 'alt'];
  out.attributes = [];
  for (i = 0; i < attributes.length; i++) {
    key = attributes[i];
    attr = elem.getAttribute(key);
    if (attr) {
      out.attributes.push({key: key, value: attr});
    }
  }
  return out;
}

module.exports = {
  describeElement: describeElement,
  descriptionToString: descriptionToString,
  elementArrayToString: elementArrayToString,
  treeToArray: treeToArray,
  getElementFromEvent: getElementFromEvent,
  isDescribedElement: isDescribedElement,
  getElementType: getElementType
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var polyfillJSON = __webpack_require__(33);

module.exports = polyfillJSON;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

//  json3.js
//  2017-02-21
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
//  See http://www.JSON.org/js.html
//  This code should be minified before deployment.
//  See http://javascript.crockford.com/jsmin.html

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.
//          This has been modified to use JSON-js/json_parse_state.js as the
//          parser instead of the one built around eval found in JSON-js/json2.js

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
//                          +a[5], +a[6]));
//                  }
//              }
//              return value;
//          });

//          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
//              var d;
//              if (typeof value === "string" &&
//                      value.slice(0, 5) === "Date(" &&
//                      value.slice(-1) === ")") {
//                  d = new Date(value.slice(5, -1));
//                  if (d) {
//                      return d;
//                  }
//              }
//              return value;
//          });

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
  for, this
  */

/*property
  JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
  getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
  lastIndex, length, parse, prototype, push, replace, slice, stringify,
  test, toJSON, toString, valueOf
  */

var setupCustomJSON = function(JSON) {

  var rx_one = /^[\],:{}\s]*$/;
  var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
  var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

  function f(n) {
    // Format integers to have at least two digits.
    return n < 10
      ? "0" + n
      : n;
  }

  function this_value() {
    return this.valueOf();
  }

  if (typeof Date.prototype.toJSON !== "function") {

    Date.prototype.toJSON = function () {

      return isFinite(this.valueOf())
        ? this.getUTCFullYear() + "-" +
        f(this.getUTCMonth() + 1) + "-" +
        f(this.getUTCDate()) + "T" +
        f(this.getUTCHours()) + ":" +
        f(this.getUTCMinutes()) + ":" +
        f(this.getUTCSeconds()) + "Z"
        : null;
    };

    Boolean.prototype.toJSON = this_value;
    Number.prototype.toJSON = this_value;
    String.prototype.toJSON = this_value;
  }

  var gap;
  var indent;
  var meta;
  var rep;


  function quote(string) {

    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    rx_escapable.lastIndex = 0;
    return rx_escapable.test(string)
      ? "\"" + string.replace(rx_escapable, function (a) {
        var c = meta[a];
        return typeof c === "string"
          ? c
          : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
      }) + "\""
    : "\"" + string + "\"";
  }


  function str(key, holder) {

    // Produce a string from holder[key].

    var i;          // The loop counter.
    var k;          // The member key.
    var v;          // The member value.
    var length;
    var mind = gap;
    var partial;
    var value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.

    if (value && typeof value === "object" &&
        typeof value.toJSON === "function") {
      value = value.toJSON(key);
    }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.

    if (typeof rep === "function") {
      value = rep.call(holder, key, value);
    }

    // What happens next depends on the value's type.

    switch (typeof value) {
      case "string":
        return quote(value);

      case "number":

        // JSON numbers must be finite. Encode non-finite numbers as null.

        return isFinite(value)
          ? String(value)
          : "null";

      case "boolean":
      case "null":

        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce "null". The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

        // If the type is "object", we might be dealing with an object or an array or
        // null.

      case "object":

        // Due to a specification blunder in ECMAScript, typeof null is "object",
        // so watch out for that case.

        if (!value) {
          return "null";
        }

        // Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        partial = [];

        // Is the value an array?

        if (Object.prototype.toString.apply(value) === "[object Array]") {

          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || "null";
          }

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.

          v = partial.length === 0
            ? "[]"
            : gap
            ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
            : "[" + partial.join(",") + "]";
          gap = mind;
          return v;
        }

        // If the replacer is an array, use it to select the members to be stringified.

        if (rep && typeof rep === "object") {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === "string") {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (
                      gap
                      ? ": "
                      : ":"
                      ) + v);
              }
            }
          }
        } else {

          // Otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (
                      gap
                      ? ": "
                      : ":"
                      ) + v);
              }
            }
          }
        }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v = partial.length === 0
          ? "{}"
          : gap
          ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
          : "{" + partial.join(",") + "}";
        gap = mind;
        return v;
    }
  }

  // If the JSON object does not yet have a stringify method, give it one.

  if (typeof JSON.stringify !== "function") {
    meta = {    // table of character substitutions
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      "\"": "\\\"",
      "\\": "\\\\"
    };
    JSON.stringify = function (value, replacer, space) {

      // The stringify method takes a value and an optional replacer, and an optional
      // space parameter, and returns a JSON text. The replacer can be a function
      // that can replace values, or an array of strings that will select the keys.
      // A default replacer method can be provided. Use of the space parameter can
      // produce text that is more easily readable.

      var i;
      gap = "";
      indent = "";

      // If the space parameter is a number, make an indent string containing that
      // many spaces.

      if (typeof space === "number") {
        for (i = 0; i < space; i += 1) {
          indent += " ";
        }

        // If the space parameter is a string, it will be used as the indent string.

      } else if (typeof space === "string") {
        indent = space;
      }

      // If there is a replacer, it must be a function or an array.
      // Otherwise, throw an error.

      rep = replacer;
      if (replacer && typeof replacer !== "function" &&
          (typeof replacer !== "object" ||
           typeof replacer.length !== "number")) {
        throw new Error("JSON.stringify");
      }

      // Make a fake root object containing our value under the key of "".
      // Return the result of stringifying the value.

      return str("", {"": value});
    };
  }


  // If the JSON object does not yet have a parse method, give it one.

  if (typeof JSON.parse !== "function") {
    JSON.parse = (function () {

      // This function creates a JSON parse function that uses a state machine rather
      // than the dangerous eval function to parse a JSON text.

      var state;      // The state of the parser, one of
      // 'go'         The starting state
      // 'ok'         The final, accepting state
      // 'firstokey'  Ready for the first key of the object or
      //              the closing of an empty object
      // 'okey'       Ready for the next key of the object
      // 'colon'      Ready for the colon
      // 'ovalue'     Ready for the value half of a key/value pair
      // 'ocomma'     Ready for a comma or closing }
      // 'firstavalue' Ready for the first value of an array or
      //              an empty array
      // 'avalue'     Ready for the next value of an array
      // 'acomma'     Ready for a comma or closing ]
      var stack;      // The stack, for controlling nesting.
      var container;  // The current container object or array
      var key;        // The current key
      var value;      // The current value
      var escapes = { // Escapement translation table
        "\\": "\\",
        "\"": "\"",
        "/": "/",
        "t": "\t",
        "n": "\n",
        "r": "\r",
        "f": "\f",
        "b": "\b"
      };
      var string = {   // The actions for string tokens
        go: function () {
          state = "ok";
        },
        firstokey: function () {
          key = value;
          state = "colon";
        },
        okey: function () {
          key = value;
          state = "colon";
        },
        ovalue: function () {
          state = "ocomma";
        },
        firstavalue: function () {
          state = "acomma";
        },
        avalue: function () {
          state = "acomma";
        }
      };
      var number = {   // The actions for number tokens
        go: function () {
          state = "ok";
        },
        ovalue: function () {
          state = "ocomma";
        },
        firstavalue: function () {
          state = "acomma";
        },
        avalue: function () {
          state = "acomma";
        }
      };
      var action = {

        // The action table describes the behavior of the machine. It contains an
        // object for each token. Each object contains a method that is called when
        // a token is matched in a state. An object will lack a method for illegal
        // states.

        "{": {
          go: function () {
            stack.push({state: "ok"});
            container = {};
            state = "firstokey";
          },
          ovalue: function () {
            stack.push({container: container, state: "ocomma", key: key});
            container = {};
            state = "firstokey";
          },
          firstavalue: function () {
            stack.push({container: container, state: "acomma"});
            container = {};
            state = "firstokey";
          },
          avalue: function () {
            stack.push({container: container, state: "acomma"});
            container = {};
            state = "firstokey";
          }
        },
        "}": {
          firstokey: function () {
            var pop = stack.pop();
            value = container;
            container = pop.container;
            key = pop.key;
            state = pop.state;
          },
          ocomma: function () {
            var pop = stack.pop();
            container[key] = value;
            value = container;
            container = pop.container;
            key = pop.key;
            state = pop.state;
          }
        },
        "[": {
          go: function () {
            stack.push({state: "ok"});
            container = [];
            state = "firstavalue";
          },
          ovalue: function () {
            stack.push({container: container, state: "ocomma", key: key});
            container = [];
            state = "firstavalue";
          },
          firstavalue: function () {
            stack.push({container: container, state: "acomma"});
            container = [];
            state = "firstavalue";
          },
          avalue: function () {
            stack.push({container: container, state: "acomma"});
            container = [];
            state = "firstavalue";
          }
        },
        "]": {
          firstavalue: function () {
            var pop = stack.pop();
            value = container;
            container = pop.container;
            key = pop.key;
            state = pop.state;
          },
          acomma: function () {
            var pop = stack.pop();
            container.push(value);
            value = container;
            container = pop.container;
            key = pop.key;
            state = pop.state;
          }
        },
        ":": {
          colon: function () {
            if (Object.hasOwnProperty.call(container, key)) {
              throw new SyntaxError("Duplicate key '" + key + "\"");
            }
            state = "ovalue";
          }
        },
        ",": {
          ocomma: function () {
            container[key] = value;
            state = "okey";
          },
          acomma: function () {
            container.push(value);
            state = "avalue";
          }
        },
        "true": {
          go: function () {
            value = true;
            state = "ok";
          },
          ovalue: function () {
            value = true;
            state = "ocomma";
          },
          firstavalue: function () {
            value = true;
            state = "acomma";
          },
          avalue: function () {
            value = true;
            state = "acomma";
          }
        },
        "false": {
          go: function () {
            value = false;
            state = "ok";
          },
          ovalue: function () {
            value = false;
            state = "ocomma";
          },
          firstavalue: function () {
            value = false;
            state = "acomma";
          },
          avalue: function () {
            value = false;
            state = "acomma";
          }
        },
        "null": {
          go: function () {
            value = null;
            state = "ok";
          },
          ovalue: function () {
            value = null;
            state = "ocomma";
          },
          firstavalue: function () {
            value = null;
            state = "acomma";
          },
          avalue: function () {
            value = null;
            state = "acomma";
          }
        }
      };

      function debackslashify(text) {

        // Remove and replace any backslash escapement.

        return text.replace(/\\(?:u(.{4})|([^u]))/g, function (ignore, b, c) {
          return b
            ? String.fromCharCode(parseInt(b, 16))
            : escapes[c];
        });
      }

      return function (source, reviver) {

        // A regular expression is used to extract tokens from the JSON text.
        // The extraction process is cautious.

        var result;
        var tx = /^[\u0020\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;

        // Set the starting state.

        state = "go";

        // The stack records the container, key, and state for each object or array
        // that contains another object or array while processing nested structures.

        stack = [];

        // If any error occurs, we will catch it and ultimately throw a syntax error.

        try {

          // For each token...

          while (true) {
            result = tx.exec(source);
            if (!result) {
              break;
            }

            // result is the result array from matching the tokenizing regular expression.
            //  result[0] contains everything that matched, including any initial whitespace.
            //  result[1] contains any punctuation that was matched, or true, false, or null.
            //  result[2] contains a matched number, still in string form.
            //  result[3] contains a matched string, without quotes but with escapement.

            if (result[1]) {

              // Token: Execute the action for this state and token.

              action[result[1]][state]();

            } else if (result[2]) {

              // Number token: Convert the number string into a number value and execute
              // the action for this state and number.

              value = +result[2];
              number[state]();
            } else {

              // String token: Replace the escapement sequences and execute the action for
              // this state and string.

              value = debackslashify(result[3]);
              string[state]();
            }

            // Remove the token from the string. The loop will continue as long as there
            // are tokens. This is a slow process, but it allows the use of ^ matching,
            // which assures that no illegal tokens slip through.

            source = source.slice(result[0].length);
          }

          // If we find a state/token combination that is illegal, then the action will
          // cause an error. We handle the error by simply changing the state.

        } catch (e) {
          state = e;
        }

        // The parsing is finished. If we are not in the final "ok" state, or if the
        // remaining source contains anything except whitespace, then we did not have
        //a well-formed JSON text.

        if (state !== "ok" || (/[^\u0020\t\n\r]/.test(source))) {
          throw (state instanceof SyntaxError)
            ? state
            : new SyntaxError("JSON");
        }

        // If there is a reviver function, we recursively walk the new structure,
        // passing each name/value pair to the reviver function for possible
        // transformation, starting with a temporary root object that holds the current
        // value in an empty key. If there is not a reviver function, we simply return
        // that value.

        return (typeof reviver === "function")
          ? (function walk(holder, key) {
            var k;
            var v;
            var val = holder[key];
            if (val && typeof val === "object") {
              for (k in value) {
                if (Object.prototype.hasOwnProperty.call(val, k)) {
                  v = walk(val, k);
                  if (v !== undefined) {
                    val[k] = v;
                  } else {
                    delete val[k];
                  }
                }
              }
            }
            return reviver.call(holder, key, val);
          }({"": value}, ""))
        : value;
      };
    }());
  }
}

module.exports = setupCustomJSON;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function wrapGlobals(window, handler, shim) {
  if (!window) { return; }
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
    var addFn = function(event, callback, bubble) {
      oldAddEventListener.call(this, event, handler.wrap(callback), bubble);
    };
    addFn._rollbarOldAdd = oldAddEventListener;
    addFn.belongsToShim = shim;
    prototype.addEventListener = addFn;

    var oldRemoveEventListener = prototype.removeEventListener;
    while (oldRemoveEventListener._rollbarOldRemove && oldRemoveEventListener.belongsToShim) {
      oldRemoveEventListener = oldRemoveEventListener._rollbarOldRemove;
    }
    var removeFn = function(event, callback, bubble) {
      oldRemoveEventListener.call(this, event, callback && callback._rollbar_wrapped || callback, bubble);
    };
    removeFn._rollbarOldRemove = oldRemoveEventListener;
    removeFn.belongsToShim = shim;
    prototype.removeEventListener = removeFn;
  }
}

module.exports = wrapGlobals;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var traverse = __webpack_require__(5);

function raw(payload, jsonBackup) {
  return [payload, _.stringify(payload, jsonBackup)];
}

function selectFrames(frames, range) {
  var len = frames.length;
  if (len > range * 2) {
    return frames.slice(0, range).concat(frames.slice(len - range));
  }
  return frames;
}

function truncateFrames(payload, jsonBackup, range) {
  range = (typeof range === 'undefined') ? 30 : range;
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
  return [payload, _.stringify(payload, jsonBackup)];
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
    switch (_.typeName(v)) {
      case 'string':
        return maybeTruncateValue(len, v);
      case 'object':
      case 'array':
        return traverse(v, truncator, seen);
      default:
        return v;
    }
  }
  payload = traverse(payload, truncator);
  return [payload, _.stringify(payload, jsonBackup)];
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
  return [payload, _.stringify(payload, jsonBackup)];
}

function needsTruncation(payload, maxSize) {
  return _.maxByteSize(payload) > maxSize;
}

function truncate(payload, jsonBackup, maxSize) {
  maxSize = (typeof maxSize === 'undefined') ? (512 * 1024) : maxSize;
  var strategies = [
    raw,
    truncateFrames,
    truncateStrings.bind(null, 1024),
    truncateStrings.bind(null, 512),
    truncateStrings.bind(null, 256),
    minBody
  ];
  var strategy, results, result;

  while ((strategy = strategies.shift())) {
    results = strategy(payload, jsonBackup);
    payload = results[0];
    result = results[1];
    if (result.error || !needsTruncation(result.value, maxSize)) {
      return result;
    }
  }
  return result;
}

module.exports = {
  truncate: truncate,

  /* for testing */
  raw: raw,
  truncateFrames: truncateFrames,
  truncateStrings: truncateStrings,
  maybeTruncateValue: maybeTruncateValue
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=rollbar.umd.js.map